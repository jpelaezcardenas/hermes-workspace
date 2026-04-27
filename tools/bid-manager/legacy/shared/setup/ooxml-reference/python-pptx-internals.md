# python-pptx internals reference

## Clone status
- Cloned repository to `/tmp/python-pptx-src` for analysis.
- Requested target paths are under `ppt-maker/`, which is a protected directory per workspace rules. I did **not** write into that directory without explicit approval from Gyan or Roderik.

## Source layout overview
Repository root highlights:
- `src/pptx/` — library source.
- `src/pptx/oxml/` — custom lxml element classes for PowerPoint OOXML.
- `src/pptx/templates/` — seed XML templates used by `parse_from_template()`.
- `tests/oxml/` — useful behavioral examples for XML construction patterns.

`src/pptx/oxml/` layout:
- `__init__.py` — parser setup and element-class registration.
- `ns.py` — namespace prefix/URI map, QName helpers, namespace declarations.
- `xmlchemy.py` — descriptor/metaclass system that turns declarative class attributes into lxml helpers.
- `simpletypes.py` — XML simple-type coercion/parsing.
- `slide.py` — slide, notes, background, timing structures.
- `text.py` — text body, paragraphs, runs, spacing, autofit, fonts.
- `table.py` — table, rows, cells, merge spans, margins.
- `presentation.py` — presentation root, slide ids, slide size.
- `action.py` — hyperlinks.
- `coreprops.py` — package core properties.
- `theme.py` — Office theme root.
- `dml/` — DrawingML color, fill, line primitives.
- `shapes/` — shapes, pictures, connectors, graphic frames, group shapes, shared transforms.
- `chart/` — chart space, plots, axes, series, data labels, legends, markers, shared chart types.

## The core construction model
python-pptx builds OOXML around three layers:
1. **Namespace helpers** in `ns.py` convert `p:sp` style names into Clark notation.
2. **lxml custom classes** in `oxml/*.py` model concrete XML elements like `CT_Shape`, `CT_TextParagraph`, `CT_TableCell`.
3. **xmlchemy descriptors** generate ergonomic properties and helper methods from declarative child/attribute definitions.

This is the key pattern: python-pptx does not manually string-build every element. It defines a typed class for each important XML element, registers it with lxml, and then uses helper factories plus generated methods like `get_or_add_xfrm()`, `_add_tr(h=...)`, and `get_or_change_to_solidFill()`.

## `register_element_cls` pattern
File: `src/pptx/oxml/__init__.py`

Important pieces:
- `element_class_lookup = etree.ElementNamespaceClassLookup()`
- `oxml_parser = etree.XMLParser(remove_blank_text=True, resolve_entities=False)`
- `oxml_parser.set_element_class_lookup(element_class_lookup)`
- `register_element_cls("p:sp", CT_Shape)` maps a QName to a Python class.

What happens:
- `register_element_cls()` takes a namespace-prefixed tag like `"a:tbl"`.
- `NamespacePrefixedTag` resolves the prefix to a URI.
- The class lookup is populated for that namespace/local-name pair.
- After that, parsing `<a:tbl>` yields an instance of `CT_Table`, not a bare lxml element.

Why this matters for our helper layer:
- We want a similar central registry: tag -> class/handler.
- Parsing and creating should both return rich objects with behavior attached.
- The registry is comprehensive and explicit; one file shows the whole supported OOXML surface.

## `OxmlElement()` and loose element creation
File: `src/pptx/oxml/xmlchemy.py`

`OxmlElement("a:tbl")`:
- resolves the prefixed tag to Clark notation,
- uses the shared `oxml_parser.makeelement(...)`,
- returns an instance of the registered custom class if one exists.

This is how xmlchemy-generated `_new_*()` helpers make correctly typed elements without hand-coding constructors every time.

## `CT_*` classes
Convention:
- Most custom classes are named after schema complex types: `CT_Slide`, `CT_Table`, `CT_TextBody`, `CT_GraphicalObjectFrame`, etc.
- They subclass `BaseOxmlElement` (directly or via a shape-specific base).
- They declare children and attributes using xmlchemy descriptors.
- They optionally add domain methods like `new_tbl()`, `add_pic()`, `append_text()`, `crop_to_fit()`, `get_or_add_childTnLst()`.

Practical takeaway:
- Keep one class per meaningful XML complex type.
- Put factory methods on the class that knows the subtree shape.
- Put domain operations on the owning element, not in random utilities.

## `xmlchemy.py` descriptor system
This is the most reusable pattern in the codebase.

### Metaclass
`MetaOxmlElement` scans class attributes for these descriptor-like objects:
- `OneAndOnlyOne`
- `OneOrMore`
- `ZeroOrMore`
- `ZeroOrOne`
- `ZeroOrOneChoice`
- `OptionalAttribute`
- `RequiredAttribute`

For each, `populate_class_members()` dynamically adds properties/methods to the target class.

### Attribute descriptors
#### `RequiredAttribute(name, simple_type)`
Creates a property that:
- reads an XML attribute,
- type-converts via `simple_type.from_xml()`,
- raises `InvalidXmlError` if missing,
- writes via `simple_type.to_xml()`.

Examples:
- `CT_TableCol.w`
- `CT_TextFont.typeface`
- `CT_SlideLayoutIdListEntry.rId`

#### `OptionalAttribute(name, simple_type, default=...)`
Creates a property that:
- returns the default if the attribute is absent,
- removes the XML attribute when assigned that default,
- otherwise writes a converted XML string.

Examples:
- `CT_TextBodyProperties.anchor`
- `CT_TableCell.gridSpan`
- `CT_Transform2D.rot`
- `CT_TableProperties.firstRow`

This default-removal behavior is extremely useful. It keeps generated XML minimal and spec-aligned.

### Child-element descriptors
These do more than expose children. They generate an API.

#### `OneAndOnlyOne("a:bodyPr")`
- property returns the required child,
- raises `InvalidXmlError` if missing.

#### `ZeroOrOne("a:tcPr", successors=(...))`
Generates:
- `.tcPr` property
- `._new_tcPr()`
- `._insert_tcPr(child)`
- `._add_tcPr(**attrs)`
- `.get_or_add_tcPr()`
- `._remove_tcPr()`

#### `ZeroOrMore("a:tr")`
Generates:
- `.tr_lst`
- `._new_tr()`
- `._insert_tr(child)`
- `._add_tr(**attrs)`

#### `OneOrMore("a:p")`
Like `ZeroOrMore`, plus:
- public `.add_p()` convenience.

#### `ZeroOrOneChoice(...)`
Models a choice group where only one member may appear.
It creates:
- group getter,
- per-choice getters,
- `get_or_change_to_*()` helpers,
- group-removal helper.

Used heavily for fill groups:
- `a:noFill`
- `a:solidFill`
- `a:gradFill`
- `a:blipFill`
- `a:pattFill`
- `a:grpFill`

### Successor ordering
Descriptors take `successors=` tuples to preserve schema order.
Generated inserters call `insert_element_before(child, *successors)`.

This is one of the best ideas in the whole codebase.

Why it matters:
- OOXML child order is often schema-sensitive.
- Instead of hardcoding indexes, python-pptx inserts before the first successor tag that exists.
- The `_tag_seq` tuples document canonical ordering right on the class.

We should copy this. It gives stable, readable, schema-aware insertion without needing a full XSD engine.

## `BaseOxmlElement`
Common behaviors from `xmlchemy.py`:
- `.xpath()` automatically injects the standard namespace map.
- `.xml` returns pretty-printed XML for debugging/tests.
- `insert_element_before()` handles ordered insertion.
- `remove_all()` removes all children of matching tag(s).
- `first_child_found_in()` supports choice-group logic.

This is effectively the runtime base for all OOXML elements.

## Namespace handling
File: `src/pptx/oxml/ns.py`

Important objects/functions:
- `_nsmap` — prefix -> URI
- `pfxmap` — URI -> prefix
- `NamespacePrefixedTag` — parses `p:sp` style names
- `qn("p:sp")` — converts to Clark notation `{uri}sp`
- `nsdecls("a", "p", "r")` — builds XML namespace declaration strings
- `namespaces("a", "p")` / `nsmap(...)` — dict subset for xpath/creation
- `nsuri("p")` — prefix -> URI

Key prefixes in practice:
- `a` — DrawingML main
- `p` — PresentationML main
- `c` — Chart
- `r` — office relationships
- `cp` — core properties
- `pr` — package relationships
- `pic` — picture
- `pd` — presentationDrawing

Why this matters:
- python-pptx consistently authors raw XML with readable `p:...`/`a:...` strings,
  then resolves them centrally.
- That is much saner than scattering raw URIs everywhere.

## Key files by responsibility

### Root-level `oxml/`
- `__init__.py` — parser bootstrap + giant tag registration table.
- `ns.py` — namespace resolution helpers.
- `xmlchemy.py` — descriptor/metaclass system.
- `simpletypes.py` — string<->typed-value conversion layer.
- `slide.py` — slide roots, common slide data, timing, background.
- `text.py` — text bodies, paragraphs, runs, paragraph/run properties.
- `table.py` — table model, row/cell construction, merging helpers.
- `presentation.py` — presentation root and slide/master id collections.
- `action.py` — hyperlink elements.
- `coreprops.py` — document metadata.
- `theme.py` — theme root element.

### `oxml/shapes/`
- `shared.py` — common shape traits: non-visual props, placeholder metadata, transforms, line props, shape props.
- `autoshape.py` — regular shapes, textboxes, placeholders, custom geometry, preset geometry, freeform paths.
- `connector.py` — connectors and connection endpoints.
- `graphfrm.py` — graphic frames for tables, charts, OLE objects.
- `groupshape.py` — shape tree and group-shape container logic.
- `picture.py` — images, cropping, video poster-frame picture shape.

### `oxml/chart/`
- `shared.py` — common chart primitives like boolean/value wrappers, layout, title, numFmt.
- `chart.py` — chartSpace, chart root, plotArea shell, external data link, style.
- `axis.py` — cat/date/value axes, orientation, tick marks, scaling.
- `plot.py` — plot types (bar, line, pie, scatter, bubble, area, radar, doughnut).
- `series.py` — category/number data sources, series composite, points, point overrides.
- `datalabel.py` — data label containers and placement.
- `legend.py` — legend and legend position.
- `marker.py` — marker style/size.

## Shapes: how XML is built

### Shape tree and groups
File: `shapes/groupshape.py`

`CT_GroupShape` represents both:
- slide shape tree `p:spTree`
- nested group shapes `p:grpSp`

Important methods:
- `add_autoshape(...)`
- `add_cxnSp(...)`
- `add_freeform_sp(...)`
- `add_grpSp()`
- `add_pic(...)`
- `add_placeholder(...)`
- `add_table(...)`
- `add_textbox(...)`

Pattern:
- Each method delegates subtree creation to the specific class (`CT_Shape`, `CT_Picture`, `CT_GraphicalObjectFrame`, etc.).
- Then it inserts before `p:extLst` to preserve ordering.

Great pattern to copy:
- Container owns child insertion.
- Child class owns exact subtree template.

### Shape properties and transforms
File: `shapes/shared.py`

`BaseShapeElement` unifies:
- position/size (`x`, `y`, `cx`, `cy`)
- flips and rotation
- placeholder queries
- access to non-visual properties and text bodies

`CT_ShapeProperties` models:
- transform `a:xfrm`
- geometry (`a:custGeom` or `a:prstGeom`)
- fill choice group
- line element
- effects

`CT_Transform2D` wraps:
- `a:off` (x/y)
- `a:ext` (cx/cy)
- `a:chOff`, `a:chExt` for groups
- `rot`, `flipH`, `flipV`

This is the right abstraction boundary. All positioned shapes expose the same geometry API.

### Regular shapes / textboxes / freeforms
File: `shapes/autoshape.py`

`CT_Shape` provides factory methods:
- `new_autoshape_sp(...)`
- `new_freeform_sp(...)`
- `new_placeholder_sp(...)`
- `new_textbox_sp(...)`

These are hand-authored XML templates parsed with `parse_xml()`. That pattern appears often when a subtree has a canonical valid skeleton.

Notable details:
- Textboxes are identified by `p:cNvSpPr txBox="1"`.
- Freeforms use `a:custGeom` plus `a:pathLst`.
- Auto shapes use `a:prstGeom prst="..."` with `a:avLst`.
- Placeholder text frames are added only for placeholder types that need them.

Freeform helpers:
- `CT_Path2DList.add_path(w, h)`
- `CT_Path2D.add_moveTo(x, y)`
- `CT_Path2D.add_lnTo(x, y)`
- `CT_Path2D.add_close()`

This is a nice example of building a mini DSL over OOXML paths.

### Pictures
File: `shapes/picture.py`

`CT_Picture` handles:
- static images (`new_pic()`)
- placeholder pictures (`new_ph_pic()`)
- video poster-frame pictures (`new_video_pic()`)
- crop rectangles via `srcRect_*`
- fit-to-frame cropping logic via `crop_to_fit()`

Key idea:
- Media-specific behavior lives on the media element class itself.

### Graphic frames
File: `shapes/graphfrm.py`

`CT_GraphicalObjectFrame` is the wrapper for tables, charts, and OLE objects.

Factories:
- `new_graphicFrame(...)`
- `new_table_graphicFrame(...)`
- `new_chart_graphicFrame(...)`
- `new_ole_object_graphicFrame(...)`

Pattern:
- Build a generic `p:graphicFrame` shell.
- Set `a:graphicData/@uri`.
- Append the appropriate payload (`a:tbl`, `c:chart`, `p:oleObj`).

That separation is excellent and worth mirroring.

## Text model
File: `text.py`

Important classes:
- `CT_TextBody` — text container (`p:txBody`, `a:txBody`, `c:txPr` use cases)
- `CT_TextBodyProperties` — bodyPr/autofit/insets/wrap/anchor
- `CT_TextParagraph` — paragraphs and content runs
- `CT_TextParagraphProperties` — alignment, level, spacing, default run props
- `CT_RegularTextRun` — `a:r`
- `CT_TextCharacterProperties` — `a:rPr`, `a:defRPr`, `a:endParaRPr`
- `CT_TextLineBreak` — `a:br`
- `CT_TextField` — fields like slide number/date
- `CT_TextFont` — latin/ea/cs/sym font nodes
- `CT_TextSpacing*` — percent/point spacing wrappers

Key behavior:
- `CT_TextBody.new()`, `new_p_txBody()`, `new_a_txBody()`, `new_txPr()` generate context-specific minimal valid text trees.
- `clear_content()` removes paragraphs but preserves other children.
- `unclear_content()` ensures at least one empty paragraph exists after clearing/moves.
- `CT_TextParagraph.append_text()` converts `\n` and vertical-tab into runs + `a:br` line breaks.
- `CT_RegularTextRun.text` escapes control chars to `_xNNNN_` sequences.

What to learn:
- Text requires context-specific minimal XML skeletons.
- Enforce spec conformance after edits (e.g. always at least one paragraph).
- Expose plain-text convenience while preserving exact OOXML nodes underneath.

## Table model
File: `table.py`

Important classes:
- `CT_Table` — table root
- `CT_TableGrid` / `CT_TableCol` — column widths
- `CT_TableRow` — row height + cells
- `CT_TableCell` — cell text, margins, spans/merge flags
- `CT_TableCellProperties` — anchor + fill + margins
- `TcRange` — merge-range helper

Construction flow in `CT_Table.new_tbl(rows, cols, width, height, tableStyleId=None)`:
1. Start from a minimal `<a:tbl>` template.
2. Add `gridCol` children with computed widths.
3. Add rows with computed heights.
4. Add minimal valid cells via `CT_TableCell.new()`.

Cell details:
- text lives in `a:txBody`
- merge metadata uses `gridSpan`, `rowSpan`, `hMerge`, `vMerge`
- anchor/margins live in `a:tcPr`
- `append_ps_from()` moves paragraphs between cells during merge operations

Good reusable patterns:
- Offer a high-level constructor that computes repetitive geometry.
- Keep minimal valid subtree factories on leaf elements.
- Provide merge/content migration helpers instead of making callers shuffle nodes manually.

## Slide model
File: `slide.py`

Important classes:
- `CT_Slide` — slide root
- `CT_CommonSlideData` — `p:cSld`, includes background and `spTree`
- `CT_Background` / `CT_BackgroundProperties`
- `CT_SlideLayout`, `CT_SlideMaster`
- `CT_SlideLayoutIdList`, `CT_SlideLayoutIdListEntry`
- `CT_NotesSlide`, `CT_NotesMaster`
- `CT_SlideTiming`, `CT_TimeNodeList`, `CT_TLMediaNodeVideo`

Important behaviors:
- `CT_Slide.new()` builds a minimal valid slide shell with `p:cSld/p:spTree` and `p:clrMapOvr`.
- `spTree` is reached via `_BaseSlideElement.spTree` -> `cSld.spTree`.
- Background changes use `get_or_add_bgPr()` and may replace existing background choice content.
- Video timing support uses `get_or_add_childTnLst()` and may regenerate the entire `p:timing` subtree for simplicity.

Takeaway:
- For complicated optional structures, python-pptx sometimes chooses "replace with known-good subtree" over fragile in-place surgery.
- That is often the right call for OOXML.

## Chart model

### Shell objects
File: `chart/chart.py`
- `CT_ChartSpace` — chart part root, includes style, chart, txPr, externalData.
- `CT_Chart` — chart body with title, plotArea, legend.
- `CT_PlotArea` — contains plot types and axes.
- `CT_ExternalData` — link to embedded workbook.
- `CT_Style` — chart style id.

Useful patterns:
- `CT_Chart.new_chart(rId)` builds the reference node placed inside a graphic frame.
- `CT_ChartSpace._add_externalData()` automatically creates `c:autoUpdate val="0"`.
- `CT_PlotArea` exposes traversal helpers like `iter_xCharts()`, `iter_sers()`, `next_idx`, `next_order`.

### Plot types
File: `chart/plot.py`
Implements plot-specific element classes:
- area / 3D area
- bar
- bubble
- doughnut
- line
- pie
- radar
- scatter

Common approach:
- shared behavior in `BaseChartElement`
- plot-specific child ordering captured in `_tag_seq`
- xmlchemy descriptors provide series/data-label accessors
- properties like `grouping_val` supply defaults when XML omits optional values

### Series
File: `chart/series.py`
Main class: `CT_SeriesComposite`

Notable point:
- OOXML has multiple schema series types, but python-pptx uses one composite class for all `c:ser` tags.
- That keeps parsing and common operations simple.

Helpers include:
- `get_or_add_dLbl(idx)`
- `get_or_add_dPt_for_point(idx)`
- `cat_ptCount_val`, `xVal_ptCount_val`, `yVal_ptCount_val`, `bubbleSize_ptCount_val`

This composite approach is a pragmatic pattern worth copying when schema variants share one tag and mostly overlapping behavior.

### Axes, legend, markers, data labels
Files:
- `chart/axis.py`
- `chart/legend.py`
- `chart/marker.py`
- `chart/datalabel.py`
- `chart/shared.py`

These mostly use the same xmlchemy formula:
- small `CT_*` wrappers
- optional/defaulted attributes with enum/simple-type conversion
- ordered children via `_tag_seq`
- higher-level defaults implemented in Python properties

## How python-pptx authors XML in practice
There are three recurring authoring styles:

### 1. Parse a literal XML template
Used when a subtree has a stable, known-good skeleton.
Examples:
- `CT_Slide._sld_xml()`
- `CT_Shape.new_autoshape_sp()`
- `CT_Picture._pic_tmpl()`
- `CT_TableCell.new()`
- `CT_TextBody.new_txPr()`

Why it works:
- Easier to read than imperative node assembly for large subtrees.
- Safer when namespace declarations and element order are fussy.

### 2. Create typed loose elements via `OxmlElement()` / xmlchemy
Used for small nodes and generated child helpers.
Examples:
- `_new_off()` and `_new_ext()` in `CT_Transform2D`
- `CT_DPt.new_dPt()`
- most autogenerated `_new_*()` helpers

### 3. Mix both
Start with a parsed template shell, then manipulate typed children through helper methods.
Examples:
- `CT_GraphicalObjectFrame.new_table_graphicFrame()`
- `CT_CommonSlideData.get_or_add_bgPr()`
- `CT_GroupShape.add_*()` methods

This hybrid approach is probably the sweet spot for our own helper layer too.

## Best patterns to copy into our PPTX builder
1. **Central namespace registry**
   - Keep all prefix/URI mapping in one module.
   - Provide `qn()`, `nsdecls()`, and prefixed-tag wrappers.

2. **Central tag -> class registry**
   - Parsing should immediately yield rich element classes.
   - Avoid anonymous XML nodes when behavior matters.

3. **Descriptor-driven child/attribute declarations**
   - Especially `OptionalAttribute`, `RequiredAttribute`, `ZeroOrOne`, `ZeroOrMore`, `ZeroOrOneChoice`.
   - This kills a huge amount of repetitive glue code.

4. **Schema-order insertion via successor lists**
   - Probably the single most practically valuable technique here.
   - Child order bugs are otherwise miserable to debug.

5. **Minimal valid subtree factories**
   - Each major element type should know how to create its own smallest valid XML.
   - Example targets for us: slide, shape, picture, text body, table cell, chart frame.

6. **High-level domain methods on owning elements**
   - `add_pic`, `add_table`, `append_text`, `crop_to_fit`, `get_or_add_bgPr`.
   - The API surface should match document concepts, not raw XML mechanics.

7. **Defaults handled in Python, omitted from XML when possible**
   - Optional attrs remove themselves when assigned default.
   - Produces cleaner, more canonical XML.

8. **Choice groups modeled explicitly**
   - Fill, autofit, geometry variants, etc.
   - Prevent mutually incompatible sibling combinations.

9. **Replace with known-good XML when a structure is messy**
   - For complicated optional/timing/background cases, rebuilding can be safer than incremental mutation.

10. **Keep text/table/chart shape shells context-specific**
   - `p:txBody`, `a:txBody`, and `c:txPr` are similar but not identical.
   - Don’t over-generalize when the surrounding schema differs.

## Suggested design for our own helper layer
A good distilled design would be:
- `namespaces.py`
  - `_nsmap`, `qn()`, `nsdecls()`, `NamespaceTag`
- `registry.py`
  - parser setup, `register_element_cls()`, `element()`
- `base.py`
  - `BaseElement`, ordered insertion, xpath helper, pretty xml
- `descriptors.py`
  - attribute + child descriptors copied/adapted from xmlchemy ideas
- `elements/`
  - `slide.py`, `shape.py`, `text.py`, `table.py`, `chart.py`, `media.py`
- `factories/`
  - higher-level builders for slide/table/chart/image insertion

My recommendation: copy the architecture, not the code line-for-line. The big wins are the registry, descriptors, successor-based ordering, and element-owned subtree factories.

## Most important files to study first
If time is limited, read these in order:
1. `src/pptx/oxml/xmlchemy.py`
2. `src/pptx/oxml/__init__.py`
3. `src/pptx/oxml/ns.py`
4. `src/pptx/oxml/shapes/shared.py`
5. `src/pptx/oxml/shapes/groupshape.py`
6. `src/pptx/oxml/shapes/autoshape.py`
7. `src/pptx/oxml/text.py`
8. `src/pptx/oxml/table.py`
9. `src/pptx/oxml/slide.py`
10. `src/pptx/oxml/chart/chart.py`
11. `src/pptx/oxml/chart/plot.py`
12. `src/pptx/oxml/chart/series.py`

## Recommended next step
Once approval exists to write under `ppt-maker/`, copy:
- `/tmp/python-pptx-src` -> `/Users/quark/Public/quark/workspace/ppt-maker/reference/python-pptx-src/`
- `/tmp/python-pptx-internals.md` -> `/Users/quark/Public/quark/workspace/ppt-maker/reference/python-pptx-internals.md`
