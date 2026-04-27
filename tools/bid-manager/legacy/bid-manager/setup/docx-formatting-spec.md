# DOCX Formatting Specification

Consolidated formatting rules for all SettleMint bid documents.
All directives from Gyan Sharma, 2026-03-13.

---

## Font

**Figtree everywhere. No exceptions.**

- All headings: Figtree
- All body text: Figtree
- All list items: Figtree
- All table content: Figtree
- Mermaid diagrams: Figtree where possible
- Never use Calibri, Arial, Times New Roman, or any other font
- This directive supersedes any template defaults

## Colors

- Heading text color: #000099 (dark navy) at all levels
- Bullet markers: #000099 (navy filled dot)
- Table header background: #000099 (navy) with white text
- Body text: black
- Never change the font color or heading color

## Heading Styles

| Level | Style Name | Font | Size | Bold | Color | Numbering |
| --- | --- | --- | --- | --- | --- | --- |
| H1 | H1 (based on Heading 1) | Figtree | 16pt | Yes | #000099 | 1. |
| H2 | H2 (based on Heading 2) | Figtree | 14pt | Yes | #000099 | 1.1 |
| H3 | H3 (based on Heading 3) | Figtree | 12pt | Yes | #000099 | 1.1.1 |
| H4 | H4 (based on Heading 4) | Figtree | 11pt | Yes | #000099 | 1.1.1.1 |

- Heading numbering uses Word outline numbering (abstractNumId=0, numId=1)
- **numPr must be explicitly set on every heading paragraph** (style inheritance is unreliable)
  - H1: numId=1, ilvl=0 → renders as "1."
  - H2: numId=1, ilvl=1 → renders as "1.1" (restarts when H1 changes)
  - H3: numId=1, ilvl=2 → renders as "1.1.1" (restarts when H2 changes)
  - H4: numId=1, ilvl=3 → renders as "1.1.1.1" (restarts when H3 changes)
- Headings are left-aligned with zero left indent
- Headings start at the same left position as body text
- No manual heading numbers in markdown; Word generates them
- Maximum 20 H1 sections per document
- Maximum 10 H2 sections per H1

## Body Text

- Font: Figtree, 11pt
- Alignment: **Justified**
- Color: Black
- Line spacing: as per template (1.15 default)

## Bullet Lists

- All levels use **filled circular dot** (U+2022) in **navy (#000099)**
- Level 0: 0.5" indent (720 twips)
- Level 1: 1.0" indent (1440 twips)
- Level 2: 1.5" indent (2160 twips)
- Must be native Word bullets (numPr with numId), not text characters
- Markdown indentation determines nesting level:
  - No indent = level 0
  - 2 spaces = level 1
  - 4 spaces = level 2

## Numbered Lists

Body numbered lists use formats that are **clearly distinct from heading numbers** to avoid confusion:

- Level 0: **(i), (ii), (iii)**: lowercase Roman in parentheses
- Level 1: **(a), (b), (c)**: lowercase letters in parentheses
- Level 2: **1), 2), 3)**: decimal with closing parenthesis
- Each separate numbered list group restarts at (i)
- Level 0: 0.5" indent, Level 1: 1.0" indent, Level 2: 1.5" indent
- Must be native Word numbering, not text prefixes
- Markdown indentation determines nesting level (same as bullets)
- **NEVER use plain "1. 2. 3." for body lists**: that is reserved for heading numbering

## Cover Page

The template includes a cover page with these fillable fields:

| Field | Type | Location |
| --- | --- | --- |
| Company name | Content control (sdt, alias="Company") | Inside table cell |
| Document title | Content control (sdt, alias="Title") | Direct paragraph |
| Document subtitle | Content control (sdt, alias="Subtitle") | Inside table cell |
| Valid until date | Paragraph text replacement | "[DD Month YYYY]" |
| Contact name | Paragraph text replacement | "[Full Name]" |
| Contact title | Paragraph text replacement | "[Job Title]" |
| Contact email | Paragraph text replacement | "[email@example.com]" |
| Contact phone | Paragraph text replacement | "[Country Code - Number]" |
| Company reference in T&C | Paragraph text (cross-run) | "[the Company]" |

All fields must be populated. No bracket placeholders in final output.

## Table of Contents

- Inserted after cover page as a Word TOC field
- Clickable and updatable (right-click, Update Field)
- Uses TC field codes linked to H1-H4 heading styles

## Tables

- Maximum 6-8 rows per table; split larger datasets
- Header row: navy (#000099) background, white text, Figtree bold
- Body rows: Figtree, 11pt
- Column widths auto-fit to content

## Page Breaks

- Markdown `---` between major sections generates a Word page break
- Page breaks before each H1 section (automatic)

## Mermaid Diagrams

- Rendered to PNG at scale=3 (~216 DPI)
- Embedded inline in the DOCX
- SettleMint theme colors: indigo primary (#E8EAF6), orange secondary (#FFF3E0), green tertiary (#E8F5E9), navy text (#000099), white background
- Chrome for Testing with puppeteer-config.json
- Retry logic: up to 3 attempts with 5s/10s delay between renders
- No code blocks in final documents (IP protection)

## Template

- Base template: `templates/MASTER_TEMPLATE_LOCKED.docx`
- 54 styles defined
- Cover page preserved; sample content removed during conversion
- Section properties (page layout, headers, footers) preserved

## What NOT to Do

- Never override heading fonts/sizes/colors at the run level; let template styles handle it
- Never use numId=1 for anything other than heading outline numbering
- Never use text bullet characters (•) instead of native Word bullets
- Never use Calibri or any font other than Figtree
- Never leave bracket placeholders unfilled
- Never use HTML tags, frontmatter, MDX, or JSX in markdown
- Never use `__text__` for bold; use `**text**` only
- Never include code blocks in bid documents (except Mermaid diagrams)

## Converter Usage

```
python3 scripts/markdown_to_docx.py input.md [output.docx] [--cover-json '{"company": "...", "title": "...", "subtitle": "...", "valid_until": "...", "contact_name": "...", "contact_title": "...", "contact_email": "...", "contact_phone": "..."}']
```

## Template Numbering Reference

| numId | abstractNumId | Purpose | Levels |
| --- | --- | --- | --- |
| 1 | 0 | Heading outline (H1-H4) | 1. / 1.1 / 1.1.1 / 1.1.1.1 |
| 2 | 1 | Generic numbered (legacy) | decimal / lowerLetter |
| 3 | 2 | Generic numbered (legacy) | decimal / decimal |
| 4 | 3 | Bullet list | Navy dot at all levels |
| 5+ | 4 | Numbered list (dynamic) | (i)/(a)/1) at levels 0/1/2, restarts per group |
