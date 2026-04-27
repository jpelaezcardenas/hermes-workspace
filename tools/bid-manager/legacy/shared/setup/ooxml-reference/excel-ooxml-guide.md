# Excel OOXML guide for AI agents

Generated: 2026-03-15

## Purpose

This is the SpreadsheetML counterpart to the PPTX OOXML notes in this folder.
It is for AI agents and script authors generating, patching, or validating `.xlsx`
files where simple cell writes are not enough.

The practical stance:

- Treat `.xlsx` as an OPC package with a workbook-centered relationship graph.
- Treat `openpyxl` as a strong authoring library, but not a perfect abstraction over every SpreadsheetML feature.
- Styles, shared strings, formulas, charts, and print settings are package-level concerns, not just worksheet-local concerns.
- When Excel opens a file "fine" that does not mean the package is correct; it may have repaired it.

---

## Quick package map

Typical `.xlsx` package:

```text
[Content_Types].xml
_rels/.rels
docProps/core.xml
docProps/app.xml
xl/workbook.xml
xl/_rels/workbook.xml.rels
xl/styles.xml
xl/theme/theme1.xml
xl/sharedStrings.xml
xl/worksheets/sheet1.xml
xl/worksheets/sheet2.xml
xl/drawings/drawing1.xml
xl/charts/chart1.xml
```

Many packages also include:

- `xl/calcChain.xml`
- `xl/tables/table1.xml`
- printer settings parts
- comments and threaded comment parts
- pivot cache parts
- external link parts
- VBA parts in `.xlsm`

---

## 1. Excel workbook structure

## OPC view first

A workbook is not "a bunch of sheets". It is a relationship graph rooted at `xl/workbook.xml`.

Core package flow:

- `[Content_Types].xml` defines content types
- `/_rels/.rels` points to `xl/workbook.xml`
- `xl/workbook.xml` lists sheet records and workbook-level settings
- `xl/_rels/workbook.xml.rels` maps workbook relationships to worksheets, styles, theme, shared strings, and more
- each worksheet can have its own relationships part for drawings, comments, hyperlinks, tables, and pivots

---

## `xl/workbook.xml`

This is the workbook-level control file.

Typical shape:

```xml
<workbook>
  <fileVersion/>
  <workbookPr date1904="0"/>
  <bookViews/>
  <sheets>
    <sheet name="Sheet1" sheetId="1" r:id="rId1"/>
    <sheet name="Sheet2" sheetId="2" r:id="rId2"/>
  </sheets>
  <definedNames/>
  <calcPr/>
</workbook>
```

Important workbook-level concepts:

- sheet list and sheet names
- active tab / workbook view state
- date system (`date1904`)
- defined names
- calculation mode and calc properties
- workbook protection

### The sheet record is not the sheet content

`<sheet ... r:id="rId1"/>` only points to the actual worksheet part.
The real grid is in `xl/worksheets/sheet1.xml` via `workbook.xml.rels`.

---

## `xl/worksheets/sheet*.xml`

These parts hold the grid and sheet-scoped features.

Typical skeleton:

```xml
<worksheet>
  <sheetPr/>
  <dimension ref="A1:C10"/>
  <sheetViews/>
  <sheetFormatPr/>
  <cols/>
  <sheetData>
    <row r="1">
      <c r="A1" t="n"><v>42</v></c>
      <c r="B1" t="s"><v>0</v></c>
    </row>
  </sheetData>
  <mergeCells/>
  <conditionalFormatting/>
  <dataValidations/>
  <hyperlinks/>
  <pageMargins/>
  <pageSetup/>
  <drawing r:id="rId5"/>
</worksheet>
```

Important children to recognize:

- `sheetData` — rows and cells
- `cols` — column width / style defaults
- `mergeCells`
- `conditionalFormatting`
- `dataValidations`
- `hyperlinks`
- `printOptions`, `pageMargins`, `pageSetup`, `headerFooter`
- `drawing` — charts/images anchor point to separate drawing parts
- `tableParts`
- `sheetProtection`
- `autoFilter`

### Cell storage basics

Cell element:

```xml
<c r="B2" t="s" s="3">
  <v>12</v>
</c>
```

Meaning:

- `r="B2"` — address
- `t` — data type (`s`, `inlineStr`, `b`, `str`, `n`, etc.)
- `s="3"` — style index into `styles.xml`
- `<v>` — stored value payload

Formula cell example:

```xml
<c r="C5" s="5">
  <f>SUM(C1:C4)</f>
  <v>120</v>
</c>
```

Excel may keep cached results in `<v>`. Libraries differ in how much they recalculate versus preserve.

---

## `xl/styles.xml`

This part centralizes workbook styles.

SpreadsheetML style architecture is indexed and shared, not embedded cell-by-cell in full detail.

Major collections usually include:

- `numFmts`
- `fonts`
- `fills`
- `borders`
- `cellStyleXfs`
- `cellXfs`
- `cellStyles`
- `dxfs` — differential styles for conditional formatting
- `tableStyles`

A cell style index `s="7"` typically points into `cellXfs`, which in turn references font/fill/border/numFmt ids.

### Why style dedup matters

If an agent creates a "new style" for every formatted cell:

- `styles.xml` explodes
- workbook size grows
- Excel performance suffers
- you can hit style-count pain in large files

Excel style authoring is a dedup game.

---

## `xl/sharedStrings.xml`

This is the shared string table part.

Instead of storing the same literal text in every cell, SpreadsheetML can store the unique string once and refer to it by index.

Example:

```xml
<sst count="100" uniqueCount="4">
  <si><t>Hello</t></si>
  <si><t>World</t></si>
</sst>
```

Then cells can use:

```xml
<c r="A1" t="s"><v>0</v></c>
```

which means "index 0 into shared strings".

### Inline string alternative

Cells can also store text inline:

```xml
<c r="A1" t="inlineStr">
  <is><t>Hello</t></is>
</c>
```

Both are legal. Tooling choices vary.

---

## `xl/theme/theme1.xml`

This file defines workbook theme assets:

- theme colors
- major/minor fonts
- formatting scheme pieces

Even when agents set explicit RGB values, theme references still matter for compatibility with templates and native Excel formatting behavior.

If a workbook derives styles from a theme-heavy template, careless style replacement can make colors look wrong even when the raw XML is technically valid.

---

## `xl/_rels/workbook.xml.rels`

This is the workbook-level relationship table.

Typical targets:

- worksheet parts
- `styles.xml`
- `theme/theme1.xml`
- `sharedStrings.xml`
- calc chain
- external links
- pivot caches

Example:

```xml
<Relationship Id="rId3"
  Type="http://purl.oclc.org/ooxml/officeDocument/relationships/styles"
  Target="styles.xml"/>
```

As with DOCX/PPTX, XML without correct relationships is broken.

---

## Relationship graph mental model for XLSX

```text
package
  -> /_rels/.rels
    -> xl/workbook.xml
      -> xl/worksheets/sheet1.xml
      -> xl/worksheets/sheet2.xml
      -> xl/styles.xml
      -> xl/theme/theme1.xml
      -> xl/sharedStrings.xml
sheet1.xml
  -> xl/drawings/drawing1.xml
    -> xl/charts/chart1.xml
    -> xl/media/image1.png
```

When charts or images fail, check relationship layers before blaming the chart XML.

---

## 2. `openpyxl` patterns and OOXML mapping

## Current library state

Verified in this environment:

- installed `openpyxl` version: `3.1.5`
- docs fetched successfully for `openpyxl 3.1.3 documentation`

Public API highlights observed locally on 3.1.5:

- `Workbook`, `Worksheet`, `Cell` remain the core model
- worksheet methods include `add_chart`, `add_image`, `add_data_validation`, `add_pivot`, `add_table`
- workbook exposes `defined_names`, `named_styles`, `epoch`, `excel_base_date`, `shared_strings`, and `write_only`

That matches the long-standing openpyxl model: strong support for mainstream XLSX features, with some advanced Excel features only partially modeled.

---

## Workbook → worksheets → cells

The core authoring model:

```python
from openpyxl import Workbook

wb = Workbook()
ws = wb.active
ws['A1'] = 42
ws.append([1, 2, 3])
wb.save('out.xlsx')
```

OOXML mapping:

- `Workbook` wraps workbook-level package state
- `Worksheet` maps to a `sheet*.xml` part
- `Cell` maps to a `<c>` element in row data
- row/column dimensions map to auxiliary worksheet structures, not just cell objects

### Practical rule

A worksheet object feels local, but many behaviors are global:

- styles are workbook-global
- shared strings are workbook-global
- defined names are workbook-global or sheet-scoped but stored centrally
- theme is workbook-global

So local edits can have workbook-wide side effects.

---

## Styles in `openpyxl`

Common classes:

- `Font`
- `PatternFill` / `GradientFill`
- `Border` / `Side`
- `Alignment`
- `Protection`
- number formats as strings
- `NamedStyle`

Example:

```python
from openpyxl.styles import Font, PatternFill, Border, Side

ws['A1'].font = Font(bold=True)
ws['A1'].fill = PatternFill(fill_type='solid', fgColor='FFFF00')
ws['A1'].border = Border(left=Side(style='thin'))
ws['A1'].number_format = '#,##0.00'
```

### OOXML mapping

`openpyxl` style objects are not written inline as full XML chunks on each cell.
They are compiled into workbook style tables and referenced by style index.

That is exactly what you want.

### Named styles

Useful when many cells share a semantic format.

```python
from openpyxl.styles import NamedStyle

currency = NamedStyle(name='currency')
currency.number_format = '#,##0.00'
wb.add_named_style(currency)
ws['B2'].style = 'currency'
```

This maps better to workbook style reuse and keeps style cardinality under control.

---

## Charts in `openpyxl`

Main families include:

- `BarChart`
- `LineChart`
- `PieChart`
- `AreaChart`
- `ScatterChart`
- `RadarChart`

Typical pattern:

```python
from openpyxl.chart import BarChart, Reference

chart = BarChart()
data = Reference(ws, min_col=2, min_row=1, max_row=5)
cats = Reference(ws, min_col=1, min_row=2, max_row=5)
chart.add_data(data, titles_from_data=True)
chart.set_categories(cats)
ws.add_chart(chart, 'E2')
```

OOXML/package mapping:

- chart definition goes to `xl/charts/chartN.xml`
- chart anchor lives through a drawing part
- worksheet references the drawing via relationship id

### What breaks charts most often

- wrong source range references
- stale row/column extents after data reshaping
- copying chart XML without copying drawing relationships
- misunderstanding that chart anchors are drawing objects, not sheetData children

---

## Conditional formatting

Worksheet exposes `conditional_formatting`.

Common patterns:

- color scales
- icon sets
- data bars
- formula-based rules
- cell value rules

OOXML mapping:

- worksheet stores conditional formatting rules
- differential styles often live in `styles.xml` under `dxfs`

This means conditional formatting is part worksheet logic, part workbook style infrastructure.

---

## Data validation

Current constructor observed locally:

```python
DataValidation(type=None, formula1=None, formula2=None, showErrorMessage=False,
               showInputMessage=False, showDropDown=False, allowBlank=False, ...)
```

Typical pattern:

```python
from openpyxl.worksheet.datavalidation import DataValidation

dv = DataValidation(type='list', formula1='"Yes,No"', allow_blank=True)
ws.add_data_validation(dv)
dv.add('A2:A20')
```

OOXML mapping lives in worksheet `dataValidations`.

Common trap:

- validation formulas are stored in Excel formula syntax, not Python syntax
- range application is separate from rule definition

---

## Images

Typical pattern:

```python
from openpyxl.drawing.image import Image

img = Image('logo.png')
ws.add_image(img, 'A1')
```

Package behavior:

- image binary goes into package media
- a drawing part is created or reused
- worksheet points to the drawing part
- anchor position is stored in drawing XML

If images vanish, inspect worksheet relationships and drawing relationships first.

---

## Pivot tables

Current worksheet API still exposes `add_pivot`, but pivot-table authoring remains limited compared with Excel desktop capabilities.

Practical reality:

- openpyxl is better at preserving existing pivot structures than inventing rich pivot configurations from scratch
- pivot caches, pivot tables, slicers, and related metadata are complex and relationship-heavy

Best practice:

- if pivot tables are required, start from a template workbook containing a valid pivot structure whenever possible

---

## Print setup and page layout

Worksheet exposes:

- `page_setup`
- `page_margins`
- `print_options`
- `print_area`
- `print_title_rows`
- `print_title_cols`
- header/footer objects

These map to worksheet/page layout XML rather than cell content.

Example implications:

- fit-to-page options affect printed output, not workbook calculations
- print titles are often backed by defined names/workbook constructs
- print area is not "just a UI setting"; it becomes workbook metadata that downstream users care about

---

## Formulas and defined names

Formula assignment is straightforward:

```python
ws['C1'] = '=SUM(A1:B1)'
```

Defined names live at workbook level:

```python
wb.defined_names
```

Use cases:

- named ranges
- print areas
- print titles
- formula indirection for charts and validation

### Cached values and recalculation

Excel stores formulas and may store cached results.
`openpyxl` does not evaluate Excel formulas itself like the Excel engine does.

Practical rule:

- generate correct formulas
- do not expect openpyxl to behave like Excel's calculation engine
- if recalculation matters, preserve or request workbook recalculation properties appropriately

---

## 3. Common pitfalls for AI agents building XLSX

## Pitfall: shared strings vs inline strings

Both are legal, but mixing assumptions causes bugs.

Typical failure modes:

- treating `<v>` in a `t="s"` cell as literal text instead of shared-string index
- copying cells from one workbook to another without rebuilding the shared string table correctly
- writing inline strings into a context expecting shared-string indices

Best practice:

- let `openpyxl` manage this unless you are patching XML directly
- if authoring OOXML manually, be explicit and consistent

---

## Pitfall: style deduplication

This is the Excel equivalent of DOCX numbering pain.

Failure pattern:

- every cell gets a unique style object
- `styles.xml` balloons
- files become slow and huge

Best practice:

- reuse style objects
- prefer `NamedStyle` for repeated semantics
- avoid creating fresh `Font/Fill/Border` instances in tight per-cell loops unless necessary

---

## Pitfall: chart data references

Charts depend on range references that are easy to get subtly wrong.

Failure modes:

- title row accidentally included or excluded
- category range length differs from series range length
- copied chart still points to old sheet name
- data moved but chart references not updated

Best practice:

- regenerate chart references after reshaping data
- validate sheet names and bounds explicitly
- inspect resulting chart XML when Excel shows blank or partial charts

---

## Pitfall: large-file performance

Large workbooks can punish naive object-heavy generation.

Important tool:

- workbook `write_only=True` mode for streaming writes

Tradeoff:

- write-only mode is faster and lower-memory for large outputs
- but it constrains random access and some richer editing workflows

Best practice:

- use write-only mode for large append-only exports
- use normal mode for richly formatted, back-and-forth edited templates

---

## Pitfall: date handling (`1900` vs `1904`)

Excel has two date systems.

Workbook-level setting lives in `workbookPr` and is exposed through workbook date/epoch properties.

If an agent ignores this:

- dates can shift by years or days when moved between workbooks
- comparisons against existing templates become confusing

Best practice:

- inspect `wb.epoch` / `excel_base_date`
- do not merge date-bearing content across workbooks blindly
- keep template and output date systems aligned

---

## Pitfall: formula locale issues

Excel formulas in OOXML use invariant function names and separators, not whatever the local UI displays.

Failure examples:

- using semicolons because a regional Excel UI displays them
- using localized function names rather than canonical English/invariant names in stored formulas

Best practice:

- write formulas in standard OOXML/Excel storage syntax
- treat display locale as a UI concern, not a file-format concern

---

## Extra XLSX traps worth remembering

- merged cells preserve only the top-left cell's value/style semantics cleanly
- column widths and row heights are separate structures, not inferred from cells
- copying a worksheet with images/charts/tables requires relationship awareness
- print titles and print area may be stored via defined names, not sheet-local flags only
- external links and pivot caches create extra parts that simple copy logic often misses

---

## 4. OfficeDev and related repos relevant to Excel

## `dotnet/Open-XML-SDK`

This is the single best repo to mine for SpreadsheetML package truth.

Why it matters:

- strongly typed `SpreadsheetDocument`
- part classes for workbook, worksheet, styles, shared strings, charts, comments, tables, pivots
- test assets and validator logic
- generated schema classes showing valid child structures and ordering

What to inspect:

- `SpreadsheetDocument`
- `WorkbookPart`, `WorksheetPart`, `WorkbookStylesPart`, `SharedStringTablePart`, `ThemePart`
- chart and drawing parts
- tests around formula storage, styles, sheet creation, and package validation

For Python agents, this repo is often the clearest explanation of the actual OOXML part graph.

---

## Excel add-in samples

OfficeDev and Microsoft sample inventories include many Excel add-ins such as:

- `Excel-Add-in-Bind-To-Table`
- `Excel-Add-in-JS-RangeHighlighter`
- `Excel-Add-in-JS-ConsolidatedSalesReport`
- `Excel-Add-in-JS-QuarterlySalesReport`
- `Excel-Add-in-WoodGrove-Expense-Trends`
- `PowerPoint-Add-in-Microsoft-Graph-ASPNET-InsertChart` is PPT, not Excel, but useful for chart-related Office object workflows

Why Excel samples matter here:

- they show what real workbooks with tables, ranges, and chart-like interactions look like in the host app
- they help with round-trip sanity checks

Caveat:

Use these as behavior examples, not as normative SpreadsheetML references.

---

## `OfficeDev/open-xml-docs`

Still useful for Excel package walkthroughs and conceptual examples.

Good uses:

- workbook and worksheet part structure
- reading/writing sheets with the Open XML SDK
- shared string handling
- styles and cell references
- package manipulation examples

---

## 5. Key ECMA-376 sections for Excel

Use the local ECMA-376 set in this folder as the normative source.

## Must-read parts

### Part 1 — Fundamentals and Markup Language Reference

From the local extracted TOC:

- `12. SpreadsheetML` — package structure and part summary
- `18. SpreadsheetML Reference Material` — detailed element reference

High-value areas:

- `12.2 Package Structure`
- `12.3 Part Summary`
- `18.2 Workbook`
- `18.3 Worksheets`
- `18.4 Shared String Table`
- `18.5 Tables`
- `18.8 Styles`
- chart-related and drawing-related sections as needed

The local extracted TOC shows:

- `18. SpreadsheetML Reference Material` starts around page `1523`
- `18.2 Workbook` around `1542`
- `18.3 Worksheets` around `1589`
- `18.4 Shared String Table` around `1717`
- `18.8 Styles` around `1752`

Those are the core sections for generated workbooks.

### Part 2 — Open Packaging Conventions

Read this for:

- relationships
- content types
- part naming
- URI resolution
- ZIP package mapping

If a workbook repairs on open, Part 2 often explains why.

### Part 3 — Markup Compatibility and Extensibility

Relevant for compatibility wrappers and ignorable namespaces in modern Excel-generated files.

### Part 4 — Transitional Migration Features

Useful mainly when preserving or understanding older workbook constructs.

---

## Specific Excel topics to keep bookmarked in the spec

- workbook part definition
- worksheet part definition
- cell element and data types
- shared strings
- styles and `xf` records
- differential styles for conditional formatting
- drawing/chart anchoring model
- defined names
- tables and auto filters
- page setup / print metadata

---

## Practical build recipes for AI agents

## Recipe: create a scalable report workbook

1. Create workbook and sheets.
2. Define a small, reusable style vocabulary.
3. Use named styles for repeated semantic formats.
4. Append data in row-oriented batches.
5. Add formulas after data ranges are finalized.
6. Add charts only after final data bounds are known.
7. Set print titles, print area, and page setup last.

---

## Recipe: add a chart safely

1. Finalize source data on the worksheet.
2. Build `Reference` objects with explicit row/column bounds.
3. Add series and categories.
4. Insert chart via `ws.add_chart`.
5. Save and inspect Excel rendering.
6. If blank, inspect chart references and worksheet drawing relationships.

---

## Recipe: avoid style explosion

1. Predeclare shared style objects or named styles.
2. Reuse them instead of constructing new objects in loops.
3. Distinguish semantic styles like `currency`, `percent`, `header`, `warning`.
4. Only create one-off styles when truly unique.

---

## Recipe: generate large exports

1. Use `Workbook(write_only=True)` when the workflow is append-only.
2. Stream rows in order.
3. Keep formulas/charts/advanced features limited or post-process in a second pass if needed.
4. Monitor output size and generation time.

---

## Recipe: debug a repaired workbook

1. unzip the `.xlsx`
2. inspect `[Content_Types].xml`
3. inspect `xl/workbook.xml` and `xl/_rels/workbook.xml.rels`
4. inspect the affected worksheet XML and its relationships part
5. inspect `xl/styles.xml` if formatting looks wrong
6. inspect `xl/sharedStrings.xml` if text looks wrong
7. inspect drawing/chart parts if visual objects disappeared

---

## Validation and debugging workflow

When an `.xlsx` is wrong, check in this order:

1. workbook relationships
2. worksheet XML shape/order
3. style index coherence
4. shared string indexing
5. chart/drawing relationship chains
6. defined names for print areas/titles and other workbook-level references

Excel problems are often reference problems masquerading as content problems.

---

## Bottom line

For XLSX generation, the hard parts are usually not writing cell values.
They are:

- keeping workbook, sheet, and drawing relationships coherent
- managing shared strings correctly
- avoiding style-table explosion
- using correct date-system semantics
- keeping formulas and chart references aligned with reshaped data
- understanding which metadata is sheet-local versus workbook-global

`openpyxl` is very capable for mainstream XLSX generation.
But once charts, pivots, heavy formatting, or large-file performance enter the picture, you need to think in SpreadsheetML parts and relationship graphs, not just Python objects.

If something looks fine in code but wrong in Excel, inspect `styles.xml`, `sharedStrings.xml`, and the relationship chain before anything else.
