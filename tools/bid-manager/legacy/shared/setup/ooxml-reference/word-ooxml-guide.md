# Word OOXML guide for AI agents

Generated: 2026-03-15

## Purpose

This is the WordprocessingML counterpart to the PPTX OOXML notes in this folder.
It is written for AI agents and script authors who need to build, patch, inspect,
or validate `.docx` packages without guessing.

The practical stance:

- Treat `.docx` as an OPC ZIP package with relationship-driven part discovery.
- Treat `python-docx` as a convenience layer, not as a complete WordprocessingML surface.
- When numbering, fields, tracked revisions, or section behavior matter, inspect or write OOXML directly.
- Never assume Word will "fix it later". Word is forgiving until it absolutely is not.

---

## Quick package map

Typical minimal `.docx` package:

```text
[Content_Types].xml
_rels/.rels
docProps/core.xml
docProps/app.xml
word/document.xml
word/_rels/document.xml.rels
word/styles.xml
word/settings.xml
word/webSettings.xml
word/fontTable.xml
word/theme/theme1.xml
word/numbering.xml
word/header1.xml
word/footer1.xml
```

Not every document has every part, but serious real-world documents usually have most of them.

---

## 1. Word document structure

## OPC view first

A `.docx` file is an Open Packaging Conventions package:

- `[Content_Types].xml` declares content types for each part.
- `/_rels/.rels` points to the package-level main office document.
- `word/document.xml` is the main document part.
- `word/_rels/document.xml.rels` maps local `r:id` references in the main document to targets like images, headers, footers, charts, hyperlinks, etc.
- Secondary parts such as `styles.xml`, `numbering.xml`, and `settings.xml` are discovered by relationship type or conventional package structure.

### Package-level relationship

`/_rels/.rels` usually contains:

```xml
<Relationship
  Id="rId1"
  Type="http://purl.oclc.org/ooxml/officeDocument/relationships/officeDocument"
  Target="word/document.xml"/>
```

If that relationship is wrong, the package is effectively dead.

---

## `word/document.xml` — main body

This is the root narrative of the document.

Root element:

```xml
<w:document>
  <w:body>
    ... paragraphs, tables, section properties ...
  </w:body>
</w:document>
```

Typical children in `w:body`:

- `w:p` — paragraph
- `w:tbl` — table
- trailing `w:sectPr` — section properties for the last section

A paragraph typically looks like:

```xml
<w:p>
  <w:pPr>
    <w:pStyle w:val="Heading1"/>
    <w:numPr>
      <w:ilvl w:val="0"/>
      <w:numId w:val="12"/>
    </w:numPr>
  </w:pPr>
  <w:r>
    <w:t>Heading text</w:t>
  </w:r>
</w:p>
```

Key point:

- Structure lives on `w:p`, `w:tbl`, and section boundaries.
- Formatting lives in a mix of explicit properties and style inheritance.
- Numbering lives in paragraph properties but is defined elsewhere in `word/numbering.xml`.

### Body ordering rules

Word is tolerant, but the schema is not random.

- `w:pPr` must come before runs inside a paragraph.
- `w:tblPr`, `w:tblGrid`, then rows in a table.
- The final section often lives as `w:sectPr` directly under `w:body`.
- Earlier section breaks can appear inside paragraph properties.

If an AI agent splices XML in the wrong place, Word may repair, drop, or silently reinterpret it.

---

## `word/styles.xml` — style definitions

This file defines named styles and their inheritance chains.

Root element:

```xml
<w:styles>
  <w:docDefaults/>
  <w:latentStyles/>
  <w:style w:type="paragraph" w:styleId="Heading1">...</w:style>
  <w:style w:type="character" w:styleId="Strong">...</w:style>
  <w:style w:type="table" w:styleId="TableGrid">...</w:style>
</w:styles>
```

Important style kinds:

- paragraph styles
- character styles
- table styles
- numbering-related style references

Important children on `w:style`:

- `w:name`
- `w:basedOn`
- `w:next`
- `w:link` — links paragraph and character variants
- `w:qFormat` — marks quick style/gallery behavior
- `w:uiPriority`
- `w:pPr`, `w:rPr`, `w:tblPr`, etc.

### Inheritance model

Style resolution usually flows through:

1. document defaults (`w:docDefaults`)
2. base styles via `w:basedOn`
3. direct style properties on the referenced style
4. direct formatting on the paragraph/run/table itself

This means style bugs are often inheritance bugs.

If `Heading2` is based on `Heading1`, and `Heading1` carries numbering or spacing, the child style inherits it unless overridden.

---

## `word/numbering.xml` — numbering definitions

This is the file that causes the most pain.

It defines two layers:

1. **abstract numbering definitions** — reusable multilevel schemes
2. **numbering instances** — concrete `numId` instances used by paragraphs

Root shape:

```xml
<w:numbering>
  <w:abstractNum w:abstractNumId="10">...</w:abstractNum>
  <w:num w:numId="12">
    <w:abstractNumId w:val="10"/>
  </w:num>
</w:numbering>
```

### `w:abstractNum`

Defines the multilevel scheme. It contains one or more `w:lvl` elements.

Example skeleton:

```xml
<w:abstractNum w:abstractNumId="10">
  <w:multiLevelType w:val="multilevel"/>
  <w:lvl w:ilvl="0">
    <w:start w:val="1"/>
    <w:numFmt w:val="decimal"/>
    <w:lvlText w:val="%1."/>
    <w:lvlJc w:val="left"/>
    <w:pPr>...</w:pPr>
    <w:rPr>...</w:rPr>
  </w:lvl>
  <w:lvl w:ilvl="1">
    <w:start w:val="1"/>
    <w:lvlRestart w:val="0"/>
    <w:numFmt w:val="decimal"/>
    <w:lvlText w:val="%1.%2."/>
  </w:lvl>
</w:abstractNum>
```

### `w:num`

A numbering instance binds a `numId` to an abstract definition.

Paragraphs do **not** point directly to `abstractNumId`. They point to `numId`.

### Paragraph numbering binding

In `word/document.xml`, a numbered paragraph typically has:

```xml
<w:pPr>
  <w:numPr>
    <w:ilvl w:val="1"/>
    <w:numId w:val="12"/>
  </w:numPr>
</w:pPr>
```

### Why numbering breaks so often

Because Word numbering is a graph, not a scalar property.

An agent must reason about:

- style-linked numbering vs direct paragraph numbering
- `abstractNumId` vs `numId`
- `ilvl` hierarchy
- `w:lvlText` placeholders like `%1.%2.%3`
- restart rules such as `w:lvlRestart`
- template-specific numbering definitions already present in the document

### `w:lvlRestart` is critical

For heading numbering like:

- 1
- 1.1
- 1.2
- 2
- 2.1

level-2 must restart when level-1 increments.

That behavior is not magic. Make restart intent explicit.

If restart rules are omitted or inherited unexpectedly, you get classic failures:

- `1.1`, `1.2`, `2.3` instead of `2.1`
- lower levels continuing across sibling parents
- numbering looking correct in one template and breaking in another

Practical rule:

- For multilevel heading schemes, define every `w:lvl` explicitly.
- Set `w:start`, `w:numFmt`, `w:lvlText`, indentation, and `w:lvlRestart` intentionally.
- Do not rely on Word defaults for restart behavior.

### Style-linked numbering

A style can embed numbering in `w:pPr/w:numPr`, or a numbering level can refer to a paragraph style using `w:pStyle`.

That means a heading style can be coupled to numbering from either direction:

- paragraph style points to numbering
- numbering level points to paragraph style

If an agent modifies one side but not the other, documents become template-dependent and brittle.

---

## `word/header*.xml` and `word/footer*.xml`

Headers and footers are separate parts.

Examples:

- `word/header1.xml`
- `word/header2.xml`
- `word/footer1.xml`

They are related from section properties via relationship ids, not embedded inline.

Typical section properties:

```xml
<w:sectPr>
  <w:headerReference w:type="default" r:id="rId8"/>
  <w:footerReference w:type="default" r:id="rId9"/>
</w:sectPr>
```

Relevant header/footer types:

- `default`
- `first`
- `even`

Real behavior depends on:

- the section's `w:titlePg` / different first page setting
- the document setting for even/odd headers
- whether later sections link to previous headers/footers

Common trap:

- copying a section break without copying its referenced header/footer parts and relationship entries
- assuming there is exactly one header and one footer for the whole document

---

## `word/settings.xml` — document settings

This file carries cross-document behavior flags.

Useful examples:

- `w:updateFields` — request field update on open
- `w:evenAndOddHeaders`
- `w:trackRevisions`
- compatibility flags
- view and proofing settings

Typical snippet:

```xml
<w:settings>
  <w:updateFields w:val="true"/>
  <w:zoom w:percent="100"/>
</w:settings>
```

Why it matters for AI-generated docs:

- TOCs and cross-references are field-based; `w:updateFields` can help Word refresh them on open.
- revision and compatibility settings can change rendering or repair behavior.
- settings from a reference template can strongly influence output.

---

## `word/_rels/document.xml.rels`

This is the local relationship table for `word/document.xml`.

It maps `r:id` values used inside the main document to other parts or external targets.

Typical targets:

- styles
- numbering
- settings
- header/footer parts
- images in `word/media/*`
- charts
- hyperlinks
- custom XML parts

Example:

```xml
<Relationship Id="rId5"
  Type="http://purl.oclc.org/ooxml/officeDocument/relationships/image"
  Target="media/image1.png"/>
```

If you insert `<a:blip r:embed="rId5"/>` or `<w:headerReference r:id="rId8"/>` but forget the relationship entry, the document is broken.

If you copy XML between packages and keep old `rId` values, the document is also broken.

---

## `[Content_Types].xml`

This file maps part names or file extensions to MIME content types.

It usually contains:

- `Default` entries for `.xml`, `.rels`, image types, etc.
- `Override` entries for specific Word parts like `/word/document.xml`, `/word/styles.xml`, `/word/numbering.xml`, `/word/header1.xml`

Example override:

```xml
<Override PartName="/word/document.xml"
  ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
```

Common failure mode:

- adding a new part such as `header2.xml` or a chart part and forgetting its content type override.

Word may refuse to load the package cleanly or silently drop the feature.

---

## Relationship graph mental model for DOCX

When debugging, think as a graph:

```text
package
  -> /_rels/.rels
    -> word/document.xml
      -> word/styles.xml
      -> word/numbering.xml
      -> word/settings.xml
      -> word/header1.xml
      -> word/footer1.xml
      -> word/media/image1.png
      -> word/charts/chart1.xml
```

The XML trees are only half the truth. The other half is relationships.

---

## 2. `python-docx` patterns and OOXML mapping

## Current library state

Verified in this environment:

- installed `python-docx` version: `1.2.0`
- docs site title: `python-docx 1.2.0 documentation`

Public API highlights observed locally on 1.2.0:

- `Document.add_comment`
- `Document.iter_inner_content`
- `Paragraph.hyperlinks`
- `Paragraph.iter_inner_content`
- `Run.add_picture`
- section header/footer accessors

That means current `python-docx` is a bit richer than old blog posts imply, but it is still not a complete OOXML authoring layer.

---

## Document → paragraphs → runs

The main object graph is:

```text
Document
  -> Paragraph
    -> Run
  -> Table
    -> Row
      -> Cell
```

Typical usage:

```python
from docx import Document

doc = Document()
p = doc.add_paragraph()
r = p.add_run("Hello")
r.bold = True
```

OOXML mapping:

- `Document` roughly wraps the main document part
- `Paragraph` maps to `<w:p>`
- `Run` maps to `<w:r>`
- text maps to `<w:t>`
- paragraph properties map to `<w:pPr>`
- run properties map to `<w:rPr>`

### Important practical rule

`python-docx` objects are proxy wrappers over XML elements.

- `paragraph._p` is the underlying `<w:p>` element
- `run._r` is the underlying `<w:r>` element
- `document.part` exposes the part model
- `document.element` exposes the root XML element

When the public API runs out, agents often need to drop into `.element`, `._p`, `._r`, or lower-level `oxml` helpers.

---

## Styles in `python-docx`

Main entry point:

```python
styles = doc.styles
```

Useful style concepts:

- paragraph styles: applied to `Paragraph.style`
- character styles: applied to `Run.style`
- table styles: applied to `Table.style`
- latent/built-in styles may exist even if not explicitly defined the way you expect

Examples:

```python
p.style = "Heading 1"
run.style = "Strong"
table.style = "Table Grid"
```

OOXML mapping:

- `Paragraph.style` generally writes `w:pPr/w:pStyle`
- `Run.style` generally writes `w:rPr/w:rStyle`
- `Table.style` writes table style references in `w:tblPr`

### Style names vs style IDs

In user-facing Python code, you often use display names like `"Heading 1"`.
In OOXML, Word stores style ids like `Heading1`.

Do not assume a display name equals a style id.
Templates can localize or rename the visible style label while preserving the internal style id.

### Style inheritance gotcha

A paragraph can look wrong even when its direct properties look right because the effective style chain is:

- doc defaults
- base paragraph style
- linked character style
- direct formatting

If an agent blindly creates a new style or mutates an existing one, it can accidentally affect every paragraph based on it.

---

## Numbering and lists in `python-docx`

This is the weak point.

There is no high-level, durable public API that fully models Word multilevel numbering the way Word itself does.

What agents usually do:

1. apply built-in list styles like `List Bullet` or `List Number`
2. rely on a reference template whose numbering definitions already exist
3. patch `numbering.xml` or paragraph XML directly using low-level `oxml`

Example style-based usage:

```python
p = doc.add_paragraph("Item", style="List Number")
```

Why that is not enough for serious heading numbering:

- built-in style names do not define a universal numbering graph
- template numbering IDs differ across documents
- heading restarts and multilevel references need explicit OOXML control

### The numbering model you must understand anyway

Even when using `python-docx`, understand these WordprocessingML entities:

- `w:abstractNum`
- `w:num`
- `w:lvl`
- `w:lvlText`
- `w:start`
- `w:lvlRestart`
- `w:pStyle`
- paragraph `w:numPr`

### Reliable heading strategy

For AI agents generating proposals or long reports:

- start from a reference `.docx` whose heading numbering already works
- keep the relevant style ids and `numbering.xml` entries intact
- bind inserted headings to the existing heading styles
- if you must author numbering from scratch, write `numbering.xml` deliberately rather than style-hacking list paragraphs

### Heading-numbering restart checklist

For each level:

- define `w:lvl w:ilvl="n"`
- set `w:start w:val="1"`
- choose `w:numFmt`
- choose `w:lvlText` placeholder pattern
- choose `w:lvlJc`
- define paragraph indentation/tab stops
- set `w:lvlRestart` intentionally where restart semantics matter
- if using style-linked numbering, ensure `w:pStyle` and actual heading style ids match

If any one of those is implicit, the template can hijack the result.

---

## Tables in `python-docx`

Typical API:

```python
table = doc.add_table(rows=2, cols=3)
cell = table.cell(0, 0)
cell.text = "Hello"
merged = table.cell(0, 0).merge(table.cell(0, 1))
```

OOXML mapping:

- table -> `<w:tbl>`
- properties -> `<w:tblPr>`
- grid -> `<w:tblGrid>`
- row -> `<w:tr>`
- cell -> `<w:tc>`
- cell properties -> `<w:tcPr>`

### Grid matters

Word tables are not just rows of arbitrary cells.

`w:tblGrid` defines the logical column grid. Cell widths, spans, and merged regions are interpreted relative to that grid.

If agents patch cells without keeping the grid coherent, Word may repair the table or produce layout drift.

### Merging

Horizontal merges usually involve grid span semantics.
Vertical merges use `w:vMerge` continuation behavior.

`python-docx` supports cell merging at a user level, but advanced border/layout behavior often still requires XML inspection.

### Borders and shading

Commonly touched OOXML areas:

- `w:tblBorders`
- `w:tcBorders`
- `w:shd`
- margins and width elements

Many formatting requests that look simple in Word's UI are not simple in OOXML.

---

## Images and media parts

High-level API:

```python
from docx.shared import Inches

doc.add_picture("image.png", width=Inches(2))
```

Current `python-docx` 1.2.0 also exposes `Run.add_picture(...)`.

OOXML/package behavior:

- image binary goes to `word/media/*`
- a relationship is created from the consuming part
- drawing markup is inserted in the paragraph/run
- sizing is expressed in EMUs, not pixels

### Image pipeline mental model

```text
word/document.xml
  -> drawing element
    -> r:embed="rIdX"
word/_rels/document.xml.rels
  -> rIdX => media/imageN.png
word/media/imageN.png
```

### DPI and size warning

If you specify width/height, the rendered size is deterministic.
If you omit them, native pixel dimensions and embedded DPI metadata affect the result.

That is why the same PNG can appear enormous in one run and reasonable in another.

Practical rule:

- Always set image size explicitly when generating professional documents.
- Prefer one dimension and let aspect ratio scale, unless distortion is intended.

---

## Headers and footers in `python-docx`

Current section API exposes:

- `section.header`
- `section.footer`
- `section.first_page_header`
- `section.first_page_footer`
- `section.even_page_header`
- `section.even_page_footer`
- `section.different_first_page_header_footer`

OOXML mapping:

- content lives in separate `header*.xml` and `footer*.xml` parts
- section properties reference them via `w:headerReference` and `w:footerReference`

Practical issue:

header/footer linkage is section-specific. A document with multiple sections may share, reuse, or override header/footer parts.

Agents that only mutate the first section often think they updated the whole document, but later sections can still show old content.

---

## Sections and page layout

High-level API:

```python
section = doc.sections[0]
section.page_width
section.page_height
section.left_margin
section.right_margin
section.orientation
section.start_type
```

New sections can be added with `Document.add_section(...)`.

OOXML mapping lives in `w:sectPr`.

Important section-controlled features:

- page size
- page margins
- orientation
- page numbering restart
- header/footer references
- column layout
- title page behavior

### Critical Word behavior

The last section properties often live directly under `w:body`, while earlier section breaks can be stored inside paragraph properties.

If an agent copies content near a section break without understanding that, page layout or headers can change in surprising ways.

---

## Table of contents support

`python-docx` does not provide a polished high-level TOC builder equivalent to clicking "Insert TOC" in Word.

In practice, agents usually choose one of these approaches:

1. start from a template with an existing TOC field and preserve it
2. inject field-code OOXML manually (`fldChar`, `instrText`, `separate`, `end`)
3. rely on Word to update fields on open, often with `w:updateFields`

Typical TOC field code conceptually looks like:

```text
TOC \o "1-3" \h \z \u
```

### Practical recommendation

For generated proposals and reports:

- seed the document from a reference template containing a TOC placeholder
- ensure heading styles map correctly
- set `w:updateFields` in settings
- tell the downstream reviewer to update fields if the environment does not auto-refresh

Do not try to synthesize a static TOC by scraping headings unless you fully control pagination, because page numbers are layout-dependent.

---

## Fields, hyperlinks, comments, and lower-level content

Current public API is decent for basic comments and hyperlinks inspection, but complex fields still require XML work.

Examples of field-driven features:

- TOC
- cross-references
- page numbers
- REF fields
- PAGEREF
- SEQ
- DATE

Field correctness is a WordprocessingML problem, not just a text problem.

---

## 3. Common pitfalls for AI agents building DOCX

## Pitfall: numbering restart across heading levels

This is the big one.

Failure pattern:

- Heading 1 increments correctly.
- Heading 2 continues from a previous parent instead of restarting.
- Heading 3 carries stale values across sections or appended fragments.

Causes:

- missing or wrong `w:lvlRestart`
- reused `numId` when a fresh numbering instance was needed
- level definitions copied from a template with different assumptions
- style-linked numbering only partially updated

Best practice:

- make restart behavior explicit in `numbering.xml`
- test on a realistic template, not just an empty document
- inspect `document.xml`, `styles.xml`, and `numbering.xml` together

---

## Pitfall: style inheritance chains

Agents often change direct formatting when the real problem is style ancestry.

Examples:

- changing paragraph spacing on a single heading while the base style reasserts it later
- applying a run font directly when the paragraph style or theme font overrides perception elsewhere
- cloning a style without preserving `basedOn` or `link` relationships

Best practice:

- map the entire style chain before patching
- prefer stable template styles over creating ad hoc styles
- when creating a new style, define exactly what it inherits and what it overrides

---

## Pitfall: Pandoc `reference.docx` behavior

Pandoc uses a reference document as a style and structural seed, not merely as a cosmetic theme.

Important implications:

- styles from `reference.docx` govern the generated output
- numbering definitions and style links in the reference document matter
- if the reference heading styles are not correctly bound to numbering, Pandoc output will inherit the problem
- changing the markdown alone will not fix a broken reference numbering graph

Practical rule:

- when using Pandoc, debug the reference `.docx` like source code
- inspect its `styles.xml`, `numbering.xml`, and `settings.xml`
- do not assume Pandoc invented the numbering bug; it often faithfully propagated one already in the template

---

## Pitfall: image DPI and sizing

Symptoms:

- logos appear huge
- screenshots shrink unpredictably
- same image renders differently after export pipeline changes

Cause:

- OOXML uses EMU sizes, while source images carry pixel dimensions and sometimes DPI metadata
- if width/height are omitted, libraries infer physical size from metadata

Best practice:

- always set explicit size
- normalize source images when possible
- use consistent aspect-ratio logic

---

## Pitfall: cross-reference fields

A cross-reference in Word is not plain text. It is usually field markup tied to bookmarks, captions, numbering, or headings.

If an agent edits visible text only:

- cross-references go stale
- bookmarks break
- displayed numbers stop matching the underlying heading/caption sequence

Best practice:

- preserve field markup when templating documents
- update fields on open when possible
- if generating references from scratch, create the full field structure, not only the display text

---

## Pitfall: track changes compatibility

Tracked revisions are not just a boolean setting.

Word revision markup introduces additional elements such as insertion/deletion wrappers, move ranges, and revision ids.

If an agent splices content into a tracked-changes document naively:

- Word can show strange redlines
- content may disappear under revision views
- validators may pass while reviewers still see chaos

Best practice:

- prefer generating clean final documents with revisions off unless tracked editing is explicitly required
- if preserving tracked changes, test in Word itself
- avoid mixing direct XML surgery with active revision markup unless absolutely necessary

---

## Extra DOCX traps worth remembering

- copying paragraphs with embedded images requires relationship remapping
- copying sections with headers/footers requires part and rel copying
- bookmarks and comments use ids that must remain coherent
- content controls (`w:sdt`) can wrap real content and change where edits belong
- Word may rewrite your XML on save; do not confuse Word's normalized form with your original authoring intent

---

## 4. OfficeDev and related repos relevant to Word

## `dotnet/Open-XML-SDK`

This is the highest-value reference repo, even for Python work.

Why it matters:

- canonical part names and relationship types
- strongly-typed classes like `WordprocessingDocument`
- real examples of how parts are wired together
- validator behavior and test assets
- generated schema classes exposing valid child structures

What to mine from it:

- `WordprocessingDocument` package/part relationships
- `MainDocumentPart`, `StyleDefinitionsPart`, `NumberingDefinitionsPart`, `HeaderPart`, `FooterPart`, `SettingsPart`
- tests covering numbering, styles, section properties, and part creation

Why Python agents should care:

The SDK often makes the hidden WordprocessingML model more legible than Word itself.

---

## `OfficeDev/open-xml-docs`

Use this for human-readable explanations and examples.

Word-relevant value:

- package structure walkthroughs
- how to open, add, and traverse WordprocessingDocument parts
- examples around styles, paragraphs, tables, bookmarks, and headers

It is especially useful when you need a quick sanity check on which part owns what.

---

## Word add-in samples

Useful examples mentioned in OfficeDev inventory and related Microsoft samples include:

- `Word-Add-in-Get-Set-EditOpen-XML`
- `Word-Add-in-Load-and-write-Open-XML`
- `Word-Add-in-JavaScript-ChangeContentWithXML`
- `Word-Add-in-DocumentAssembly`
- `Word-Add-in-Work-with-custom-XML-parts`

Why they matter:

- they demonstrate real Word client interactions with OOXML payloads
- they show how Word tolerates or rejects markup when loaded back into the app
- they are useful for round-tripping experiments and minimal examples

Caveat:

These are add-in samples, not authoritative schema references. Use them for patterns, not for spec truth.

---

## 5. Key ECMA-376 sections for Word

Use the local ECMA-376 files in this folder as the normative source.

## Must-read parts

### Part 1 — Fundamentals and Markup Language Reference

Top-level Word chapters from the local extracted text:

- `11. WordprocessingML` — package structure and part summary
- `17. WordprocessingML Reference Material` — the deep element reference

High-value areas:

- `11.2 Package Structure`
- `11.3 Part Summary`
- `17.2 Main Document Story`
- `17.3 Paragraphs and Rich Formatting`
- `17.4 Tables`
- `17.6 Sections`
- `17.7 Styles`
- `17.9 Numbering`
- `17.10 Headers and Footers`

The local TOC text shows:

- `17.7 Styles` starts around page `613`
- `17.9 Numbering` starts around page `691`
- `17.10 Headers and Footers` starts around page `733`

Those are the money chapters for proposal/report generation.

### Part 2 — Open Packaging Conventions

Read this for packaging rules, not Word semantics.

Key areas:

- part names and pack URIs
- relationships
- relative target resolution
- ZIP mapping
- media types and `[Content_Types].xml`

If a package opens badly even though the XML looks plausible, Part 2 is where the bug often lives.

### Part 3 — Markup Compatibility and Extensibility

Relevant when you encounter:

- `mc:AlternateContent`
- ignorable namespaces
- compatibility extensions

Not the first thing to read for basic generation, but essential when templated documents contain compatibility wrappers.

### Part 4 — Transitional Migration Features

Mostly useful when dealing with older or Word-normalized documents using transitional features.

---

## Specific Word topics to keep bookmarked in the spec

- main document part definition
- style definitions part
- numbering definitions part
- headers/footers parts
- section properties `w:sectPr`
- paragraph properties `w:pPr`
- run properties `w:rPr`
- numbering: `abstractNum`, `num`, `lvl`, `lvlText`, `lvlRestart`
- fields and simple fields
- drawing and picture embedding in WordprocessingML contexts

---

## Practical build recipes for AI agents

## Recipe: insert a numbered heading safely

1. Start from a template with known-good heading styles.
2. Confirm the style id used for the target heading level.
3. Confirm `styles.xml` and `numbering.xml` agree on numbering linkage.
4. Insert a paragraph using that heading style.
5. If numbering is direct rather than style-bound, set `w:numPr` explicitly.
6. Validate restart behavior by creating at least two sibling parents and children.

---

## Recipe: patch a broken list/heading scheme

1. Unzip the `.docx`.
2. Inspect `word/document.xml` for actual `w:numPr` usage.
3. Inspect `word/styles.xml` for style-bound numbering.
4. Inspect `word/numbering.xml` for `abstractNum`, `num`, `lvlText`, `lvlRestart`.
5. Decide whether the fix belongs in paragraph markup, styles, or numbering definitions.
6. Prefer fixing the template once rather than patching every generated paragraph.

---

## Recipe: add an image without relationship bugs

1. Add binary to `word/media/`.
2. Add relationship entry from the consuming part.
3. Insert drawing markup with the matching `r:embed` id.
4. Add/update content types if required.
5. Set explicit size in EMUs via the library or explicit OOXML.

---

## Recipe: preserve a TOC workflow

1. Keep a template with a real TOC field already in place.
2. Ensure heading styles remain the same ids the TOC expects.
3. Set `w:updateFields` in `settings.xml`.
4. Let Word refresh the field after generation.

---

## Validation and debugging workflow

When a generated `.docx` looks wrong:

1. unzip it
2. inspect `document.xml`, `styles.xml`, `numbering.xml`, and `document.xml.rels`
3. compare against a known-good file
4. check `[Content_Types].xml`
5. open in Word and resave to see what Word normalized
6. if needed, validate against Open XML SDK tooling or schema-aware tools

For numbering bugs specifically, compare three files side by side:

- `word/document.xml`
- `word/styles.xml`
- `word/numbering.xml`

Anything less is guessing.

---

## Bottom line

For DOCX generation, the hardest problems are almost never "how do I make a paragraph".
They are:

- how numbering is defined and restarted
- how styles inherit
- how section properties bind headers/footers
- how fields and references survive round-trips
- how package relationships stay coherent

`python-docx` is excellent for ordinary content assembly.
For complex proposals, reports, and heavily structured templates, you still need to understand WordprocessingML at the part and XML level.

If something feels haunted, check `numbering.xml` first.
