# Theme and Word Formatting System

## Brand Colors

| Element | Color Code | Usage |
|---------|-----------|-------|
| Heading font color | `#000099` (dark navy blue) | All H1, H2, H3 headings in Word output |
| Body text | `#000000` (black) | All paragraph text |
| Table header background | `#000099` | Table header rows |
| Table header text | `#FFFFFF` (white) | Text in table headers |
| Table alternating rows | `#F2F2F2` (light grey) | Even rows in tables |
| Mermaid diagram boxes | Light pastel backgrounds | See UML Diagram Library |
| Mermaid diagram background | `#FFFFFF` (white) | All diagram backgrounds |

## Word Heading Structure

### How Word Numbering Works

Word uses **outline numbering** tied to heading styles. The document's heading hierarchy auto-generates section numbers:

- **Heading 1** → `1.`, `2.`, `3.` (auto-incremented)
- **Heading 2** → `1.1`, `1.2`, `2.1` (auto-incremented within parent H1)
- **Heading 3** → `1.1.1`, `1.1.2` (auto-incremented within parent H2)

**CRITICAL: Never manually number headings in markdown.** Write `# Executive Summary` not `# 1. Executive Summary`. The Word template handles numbering. Manual numbers cause double-numbering: "1. 1. Executive Summary".

### Markdown to Word Style Mapping

| Markdown | Word Style | Font | Size | Color |
|----------|-----------|------|------|-------|
| `#` (H1) | Heading 1 | Figtree Bold | 18pt | #000099 |
| `##` (H2) | Heading 2 | Figtree Bold | 14pt | #000099 |
| `###` (H3) | Heading 3 | Figtree SemiBold | 12pt | #000099 |
| Body text | Normal | Figtree Regular | 11pt | #000000 |
| `**bold**` | Strong | Figtree Bold | 11pt | #000000 |
| `*italic*` | Emphasis | Figtree Italic | 11pt | #000000 |
| `> blockquote` | Quote | Figtree Italic | 11pt | #333333 |
| `` `code` `` | Code Char | Courier New | 10pt | #000000 |
| Table | Table Grid | Figtree Regular | 10pt | #000000 |

### Word Template Reference (LibreOffice/Word Compatible)

The Word template (`templates/MASTER_TEMPLATE_LOCKED.docx`) must define:

1. **Page layout**: A4 (210mm × 297mm), margins 25mm all sides
2. **Header**: SettleMint logo (left), document title (center), page number (right)
3. **Footer**: "Confidential" (left), date (center), "Page X of Y" (right)
4. **Heading styles**: As per the table above, with outline numbering enabled
5. **Table of Contents**: Auto-generated from Heading 1-3 styles
6. **Page breaks**: `---` in markdown converts to page break in Word
7. **Table style**: Header row with #000099 background, alternating grey rows

### DOCX Conversion

The canonical converter is `scripts/markdown_to_docx.py` using `templates/MASTER_TEMPLATE_LOCKED.docx`. Pandoc is **not used**.

The converter:
1. Set heading font color to RGB(0, 0, 153), which is #000099
2. Apply outline numbering to all heading levels
3. Use Figtree font family (fallback: Calibri if Figtree not available)
4. Set table header background to RGB(0, 0, 153) with white text

## Brand Color Reference

For the full SettleMint palette, contrast-safe combinations, diagram fill pairings, and UI card styles, see [brand-colors.md](./brand-colors.md).

## Mermaid Diagram Theming

All Mermaid diagrams must use this theme configuration:

```
%%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': '#E8EAF6', 'primaryTextColor': '#000099', 'primaryBorderColor': '#000099', 'lineColor': '#000099', 'secondaryColor': '#FFF3E0', 'tertiaryColor': '#E8F5E9', 'background': '#FFFFFF' }}}%%
```

This produces:
- White background
- Light pastel boxes (indigo-tinted for primary, orange-tinted for secondary, green-tinted for tertiary)
- Navy blue (#000099) text and borders
- Clean, professional appearance

## PlantUML Diagram Theming

All PlantUML diagrams should use the following skinparam block, either directly in the source or via the PlantUML rendering script that auto-injects it:

```plantuml
skinparam BackgroundColor #FFFFFF
skinparam DefaultFontName Figtree
skinparam DefaultFontColor #000099
skinparam HyperlinkColor #0000FF
skinparam Shadowing false
skinparam RoundCorner 15
skinparam Padding 10
skinparam ArrowColor #000099
skinparam ArrowThickness 1.5
skinparam LineColor #000099
skinparam NoteBackgroundColor #F5F0B0
skinparam NoteBorderColor #BCA820
skinparam NoteFontColor #102848
skinparam PackageBorderColor #000099
skinparam PackageFontColor #000099
skinparam PackageBackgroundColor #D8E8F0
skinparam RectangleBackgroundColor #D8E8F0
skinparam RectangleBorderColor #000099
skinparam RectangleFontColor #000099
skinparam CardBackgroundColor #C0E0F0
skinparam CardBorderColor #284878
skinparam CardFontColor #284878
skinparam NodeBackgroundColor #C0F0C0
skinparam NodeBorderColor #187848
skinparam NodeFontColor #187848
skinparam ComponentBackgroundColor #C8A8E8
skinparam ComponentBorderColor #482068
skinparam ComponentFontColor #482068
skinparam InterfaceBackgroundColor #F2B8A0
skinparam InterfaceBorderColor #C05030
skinparam InterfaceFontColor #C05030
skinparam ArtifactBackgroundColor #B8D8E0
skinparam ArtifactBorderColor #1E4868
skinparam ArtifactFontColor #1E4868
skinparam CloudBackgroundColor #C0E0F0
skinparam CloudBorderColor #284878
skinparam CloudFontColor #284878
skinparam DatabaseBackgroundColor #B0C0D8
skinparam DatabaseBorderColor #183060
skinparam DatabaseFontColor #183060
skinparam QueueBackgroundColor #F5F0B0
skinparam QueueBorderColor #BCA820
skinparam QueueFontColor #102848
skinparam UsecaseBackgroundColor #F2B8A0
skinparam UsecaseBorderColor #C05030
skinparam UsecaseFontColor #C05030
skinparam ClassBackgroundColor #D8E8F0
skinparam ClassBorderColor #000099
skinparam ClassFontColor #000099
skinparam ClassAttributeFontColor #000000
skinparam ClassStereotypeFontColor #506878
skinparam ObjectBackgroundColor #C0F0C0
skinparam ObjectBorderColor #187848
skinparam ObjectFontColor #187848
skinparam ActivityBackgroundColor #D8E8F0
skinparam ActivityBorderColor #000099
skinparam ActivityFontColor #000099
skinparam ActivityDiamondBackgroundColor #F5F0B0
skinparam ActivityDiamondBorderColor #BCA820
skinparam ActivityDiamondFontColor #102848
skinparam SequenceLifeLineBorderColor #506878
skinparam SequenceLifeLineBackgroundColor #F2F2F2
skinparam SequenceParticipantBackgroundColor #D8E8F0
skinparam SequenceParticipantBorderColor #000099
skinparam SequenceParticipantFontColor #000099
skinparam SequenceActorBackgroundColor #F2B8A0
skinparam SequenceActorBorderColor #C05030
skinparam SequenceActorFontColor #C05030
skinparam SequenceArrowColor #000099
skinparam SequenceGroupBorderColor #284878
skinparam SequenceGroupBackgroundColor #C0E0F0
skinparam SequenceGroupHeaderFontColor #284878
skinparam SequenceBoxBorderColor #506878
skinparam SequenceBoxBackgroundColor #F2F2F2
skinparam PartitionBackgroundColor #C0E0F0
skinparam PartitionBorderColor #284878
skinparam PartitionFontColor #284878
skinparam LegendBackgroundColor #F2F2F2
skinparam LegendBorderColor #8898A8
skinparam LegendFontColor #000000
skinparam TitleFontName Figtree
skinparam TitleFontColor #000099
skinparam TitleFontSize 18
skinparam TitleBorderThickness 0
skinparam CaptionFontName Figtree
skinparam CaptionFontColor #506878
```
