# SettleMint Brand Color Reference

## Core Brand Palette

### Primary Brand Color

| Color Family | Name | Hex | Recommended Use |
|---|---|---:|---|
| Primary | SettleMint Blue | `#0000FF` | Master brand accent, key callouts, hyperlinks, signature highlights |

### Yellows

| Shade | Hex | Recommended Use |
|---|---:|---|
| Yellow 100 | `#F5F0B0` | Soft highlight fills, notes, low-priority alerts |
| Yellow 200 | `#E8E07A` | Accent fills, attention states |
| Yellow 300 | `#C8B830` | Borders, icons, emphasis text on light backgrounds |
| Yellow 400 | `#BCA820` | Dark yellow text, warning borders, contrast-safe labels |

### Oranges

| Shade | Hex | Recommended Use |
|---|---:|---|
| Orange 100 | `#F2B8A0` | Optional diagram fills, decision nodes |
| Orange 200 | `#E89870` | Secondary accents |
| Orange 300 | `#D07848` | Borders, icons, stronger emphasis |
| Orange 400 | `#C05030` | Dark orange text, decision labels, highlighted connectors |

### Greens

| Shade | Hex | Recommended Use |
|---|---:|---|
| Green 100 | `#C0F0C0` | Success fills, completion states |
| Green 200 | `#90E8A0` | Positive accents |
| Green 300 | `#60C8A0` | Borders, callouts |
| Green 400 | `#187848` | Dark green text, success labels, safe contrast border |

### Purples

| Shade | Hex | Recommended Use |
|---|---:|---|
| Purple 100 | `#C8A8E8` | Integration or external-system fills |
| Purple 200 | `#A878D8` | Accent fills |
| Purple 300 | `#8848C8` | Borders and emphasis |
| Purple 400 | `#482068` | Dark purple text, integration labels, premium emphasis |

### Steel Blues

| Shade | Hex | Recommended Use |
|---|---:|---|
| Steel 100 | `#D8E8F0` | Neutral technical fills |
| Steel 200 | `#B8D8E0` | Soft supporting fills |
| Steel 300 | `#506878` | Borders, secondary lines |
| Steel 400 | `#1E4868` | Dark technical text, support labels |

### Bright Blues

| Shade | Hex | Recommended Use |
|---|---:|---|
| Bright Blue 100 | `#58A0E0` | Supporting accents |
| Bright Blue 200 | `#0050D0` | Strong callouts, links, optional icons |
| Bright Blue 300 | `#003898` | Darker brand accents |
| Bright Blue 400 | `#102848` | Deep navy-blue text or borders |

### Light Blues

| Shade | Hex | Recommended Use |
|---|---:|---|
| Light Blue 100 | `#B0C0D8` | Muted support fills |
| Light Blue 200 | `#C0E0F0` | Fresh neutral fills |
| Light Blue 300 | `#80E0F8` | Bright highlight accent fills |
| Light Blue 400 | `#5898E8` | Accent strokes, secondary icons |

### Grey-Blues

| Shade | Hex | Recommended Use |
|---|---:|---|
| Grey-Blue 100 | `#A0A8B0` | Supporting neutrals |
| Grey-Blue 200 | `#8898A8` | Mid-tone rules, dividers |
| Grey-Blue 300 | `#284878` | Dark border or text on pale fills |
| Grey-Blue 400 | `#183060` | Deep dark text or border for technical diagrams |

## Theme Colors for Bid Documents

| Element | Hex | Usage |
|---|---:|---|
| Heading color | `#000099` | H1-H3 headings, dominant diagram text, primary connector lines |
| Body text | `#000000` | Standard paragraph text |
| Alternate table rows | `#F2F2F2` | Even rows in tables and neutral banding |
| White | `#FFFFFF` | Page and diagram background |

## WCAG AA Contrast Pairs

Use dark text on light fills. Do not invert these pairs for diagrams.

| Background | Foreground | Typical Use | WCAG AA Suitability |
|---|---|---|---|
| `#FFFFFF` | `#000099` | Headings, primary labels, diagram text | Pass |
| `#FFFFFF` | `#000000` | Body copy | Pass |
| `#F2F2F2` | `#000000` | Alternate row text | Pass |
| `#F5F0B0` | `#BCA820` | Highlight note labels | Pass |
| `#F2B8A0` | `#C05030` | Decision nodes, warning notes | Pass |
| `#C0F0C0` | `#187848` | Success nodes, positive states | Pass |
| `#C8A8E8` | `#482068` | Integration nodes, external systems | Pass |
| `#D8E8F0` | `#1E4868` | Neutral technical blocks | Pass |
| `#B8D8E0` | `#1E4868` | Secondary support blocks | Pass |
| `#C0E0F0` | `#284878` | Info cards, low-emphasis panels | Pass |
| `#B0C0D8` | `#183060` | Subtle structure panels | Pass |
| `#E8E07A` | `#102848` | Strong highlight with deep text | Pass |

## Diagram Fill Pairings

These are the default safe combinations for Mermaid and PlantUML diagrams.

| Pair | Fill | Text | Border | Recommended Role |
|---|---|---|---|---|
| Diagram Primary | `#D8E8F0` | `#000099` | `#000099` | Main flow steps, platform blocks |
| Diagram Secondary | `#F2B8A0` | `#C05030` | `#C05030` | Decisions, branching logic |
| Diagram Success | `#C0F0C0` | `#187848` | `#187848` | Outcomes, completions, approvals |
| Diagram Integration | `#C8A8E8` | `#482068` | `#482068` | External systems, integrations |
| Diagram Highlight | `#F5F0B0` | `#BCA820` | `#BCA820` | Warnings, watchpoints, focus items |
| Diagram Neutral | `#B8D8E0` | `#1E4868` | `#1E4868` | Supporting data, references |
| Diagram Info | `#C0E0F0` | `#284878` | `#284878` | Notes, enablers, informational steps |
| Diagram Technical | `#B0C0D8` | `#183060` | `#183060` | Infrastructure, technical context |
| Diagram Accent | `#90E8A0` | `#187848` | `#187848` | Positive secondary actions |
| Diagram Premium | `#E8E07A` | `#102848` | `#102848` | Key milestones, standout callouts |

## Recommended Diagram Style System

### Text Rules
- Default diagram text color: `#000099`
- Default diagram line color: `#000099`
- Use `#000000` only for paragraph/body text outside diagrams
- Keep diagram labels concise: ideally under 28 characters per line
- Use dark text on pastel fills only

### Border Rules
- Border should match text color for that node
- Minimum border weight: 1.5px equivalent
- Use `#506878` for non-primary connector lines when visual hierarchy matters

### Background Rules
- Diagram canvas background: `#FFFFFF`
- Do not place diagrams on tinted page backgrounds
- Avoid gradients unless a format absolutely requires them; flat fills are the default

## UI Element Styles

Use these when diagrams represent UI cards, modules, panels, or system blocks.

| Element | Fill | Text | Border | Corner Radius | Notes |
|---|---|---|---|---:|---|
| Primary card | `#D8E8F0` | `#000099` | `#000099` | 15px | Default platform block |
| Secondary card | `#F2B8A0` | `#C05030` | `#C05030` | 15px | Decision or review block |
| Success card | `#C0F0C0` | `#187848` | `#187848` | 15px | Confirmed/approved state |
| Integration card | `#C8A8E8` | `#482068` | `#482068` | 15px | External system or API |
| Technical card | `#B8D8E0` | `#1E4868` | `#1E4868` | 18px | Infrastructure or ops block |
| Highlight card | `#F5F0B0` | `#BCA820` | `#BCA820` | 18px | Note, caveat, attention state |
| Neutral card | `#F2F2F2` | `#000000` | `#8898A8` | 20px | Generic content panel |

### Rounded Card Guidance
- Standard radius: **15px** for diagrams
- Large UI containers: **18-20px**
- Keep radius consistent across one diagram
- Avoid sharp-cornered boxes unless showing legacy or blocked systems deliberately

## Usage Recommendations

### Best Colors by Content Type
- **Architecture / platform layers:** `#D8E8F0` with `#000099`
- **Compliance / decisioning:** `#F2B8A0` with `#C05030`
- **Success / completion / approved:** `#C0F0C0` with `#187848`
- **External integrations:** `#C8A8E8` with `#482068`
- **Operational notes / technical support:** `#B8D8E0` with `#1E4868`
- **Warnings / attention states:** `#F5F0B0` with `#BCA820`

### What Not To Do
- Do not use white text on pastel fills
- Do not use saturated dark fills for large diagram blocks
- Do not mix unrelated border colors inside the same node family
- Do not use more than 4-5 fill families in one diagram unless the legend demands it

## Quick Copy Reference

```text
Primary brand: #0000FF
Heading: #000099
Body: #000000
Alt rows: #F2F2F2
Primary diagram fill: #D8E8F0 / #000099
Decision fill: #F2B8A0 / #C05030
Success fill: #C0F0C0 / #187848
Integration fill: #C8A8E8 / #482068
Neutral technical fill: #B8D8E0 / #1E4868
Highlight fill: #F5F0B0 / #BCA820
Rounded corners: 15-20px
```
