# ECMA-376 OOXML Reference (staged)

Source: https://ecma-international.org/publications-and-standards/standards/ecma-376/

## Latest edition found
ECMA-376 is split across four parts. On the ECMA page, the latest available 5th-edition parts are:

- Part 1 — **Fundamentals and Markup Language Reference** — 5th edition, December 2016
- Part 2 — **Open Packaging Conventions** — 5th edition, December 2021
- Part 3 — **Markup Compatibility and Extensibility** — 5th edition, December 2015
- Part 4 — **Transitional Migration Features** — 5th edition, December 2016

## Downloaded files
Staged under this directory:

- `ECMA-376-1_5th_edition_december_2016.zip`
- `ECMA-376-2_5th_edition_december_2021.zip`
- `ECMA-376-3_5th_edition_december_2015.zip`
- `ECMA-376-4_5th_edition_december_2016.zip`

Extracted contents include:

### Part 1
Directory: `ECMA-376-1_5th_edition_december_2016/`
- `Ecma Office Open XML Part 1 - Fundamentals And Markup Language Reference.pdf`
- `OfficeOpenXML-XMLSchema-Strict.zip`
- `OfficeOpenXML-RELAXNG-Strict.zip`
- `OfficeOpenXML-DrawingMLGeometries.zip`
- `OfficeOpenXML-SpreadsheetMLStyles.zip`
- `OfficeOpenXML-WordprocessingMLArtBorders.zip`

### Part 2
Directory: `ECMA-376-2_5th_edition_december_2021/`
- `Ecma Office Open XML Part 2 - Open Packaging Conventions.pdf`
- `OpenPackagingConventions-XMLSchema.zip`
- `OpenPackagingConventions-RELAXNG.zip`

### Part 3
Directory: `ECMA-376-3_5th_edition_december_2015/`
- `Ecma Office Open XML Part 3 - Markup Compatibility and Extensibility.pdf`

### Part 4
Directory: `ECMA-376-4_5th_edition_december_2016/`
- `Ecma Office Open XML Part 4 - Transitional Migration Features.pdf`
- `OfficeOpenXML-XMLSchema-Transitional.zip`
- `OfficeOpenXML-RELAXNG-Transitional.zip`

## Most relevant parts for PresentationML XML generation
1. **Part 1** — primary reference for PresentationML + DrawingML element definitions.
2. **Part 2** — mandatory for `.pptx` packaging rules: part names, relationships, content types, ZIP mapping.
3. **Part 3** — useful when dealing with `mc:AlternateContent`, ignorable namespaces, and compatibility markup.
4. **Part 4** — mostly for transitional/legacy compatibility; usually less important for strict PresentationML generation.

## Key references for PPTX / PresentationML work

### Slide layouts and masters
**Part 1**
- §13.3 Part Summary — **p.106**
- `sldLayout` (Slide Layout) — **§19.3.1.39, p.2586**
- `sldMaster` (Slide Master) — **§19.3.1.42, p.2587**
- PresentationML reference starts at **§19, p.2517**
- Presentation section starts at **§19.2, p.2523**
- Slides section starts at **§19.3, p.2560**

### Shape definitions
**Part 1**
- `sp` (Shape) — **§19.3.1.43, p.2588** and DrawingML **§20.1.2.2.33, p.2750**
- `cxnSp` (Connection Shape) — **§19.3.1.19, p.2576** and DrawingML **§20.1.2.2.10, p.2735**
- `grpSp` (Group Shape) — **§19.3.1.22, p.2578** and DrawingML **§20.1.2.2.20, p.2741**
- `pic` (Picture) — **§19.3.1.37, p.2584** and DrawingML **§20.2.2.5, p.3096**
- DrawingML framework reference starts at **§20.1, p.2720**
- DrawingML picture reference starts at **§20.2, p.3090**
- Predefined DrawingML geometries — **Annex H, p.4492**

### Text formatting
**Part 1**
- `bodyPr` (Body Properties) — **§21.1.2.1.1, p.3187** (also **§20.4.2.22, p.3137**)
- `pPr` (Text Paragraph Properties) — **§21.1.2.2.7, p.3215**
- `rPr` (Text Run Properties) — **§21.1.2.3.9, p.3247**
- DrawingML components reference starts at **§21.1, p.3184**

### Charts
**Part 1**
- DrawingML Charts — **§21.2, p.3365**
- Chart Drawings — **§21.3, p.3473**

### Tables
**Part 1**
- DrawingML `tbl` (Table) — **§21.1.3.13, p.3354**
- Table styles are listed earlier in DrawingML part summary around **§14.2**

### Relationships and content types
**Part 2**
- Part names — **§6.2.2, p.10**
- Pack IRIs / addressing — **§6.3, p.13**
- Resolving relative references — **§6.4, p.16**
- Relationships — **§6.5, p.19**
  - Relationships part — **p.20**
  - Relationship markup — **p.21**
- Mapping media types to parts — **§7.2.3, p.27**
- ZIP mapping — **§7.3, p.33**
  - ZIP item names — **p.34**
  - Media Types stream (`[Content_Types].xml`) — **p.35**
- Standard namespaces and media types — **Annex E, p.76**
- Package example — **Annex H, p.83**

### Theme / color references
**Part 1**
- Theme part path examples include `/ppt/theme/theme1.xml` around the PresentationML package summary pages (**around p.115 in extracted text; see §13.3 / package structure**) 
- `clrScheme` (Color Scheme) — **§20.1.6.2, p.2839**
- DrawingML theme/color definitions live in **§20.1** and related schema annexes

### Schemas / XSD annexes
**Part 1 — Annex A (normative) Schemas, starts p.3809**
- A.3 PresentationML — **p.3959**
- A.4 DrawingML Framework — **p.3990**
- A.5 DrawingML Components — **p.4058**
- A.6 Shared MLs — **p.4109**

**Part 2**
- Annex C.2 Media Types stream schema — **p.74**
- Annex E standard namespaces and media types — **p.76**

## Recommended working set for building PPTX XML by hand
If you're constructing PresentationML manually, keep these open first:
1. `Part 1 PDF` — PresentationML (§19) + DrawingML (§20–§21)
2. `Part 2 PDF` — OPC packaging (§6–§7, Annex E)
3. `Part 1 / Annex A` schemas + `OfficeOpenXML-XMLSchema-Strict.zip`
4. `Part 2 / OpenPackagingConventions-XMLSchema.zip`

## Note
These files are currently **staged in `tmp/ecma376/`**. I did not move them into `ppt-maker/reference/ecma-376/` because `ppt-maker/` is a protected path in this workspace and requires explicit approval from Gyan or Roderik before modification.