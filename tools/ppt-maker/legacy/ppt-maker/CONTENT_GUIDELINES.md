---
title: "PPT Content Generation Guidelines"
type: page
source: gbrain-metadata-normalizer
metadata_normalized_at: 2026-04-27T12:36:05.662504Z
---

# PPT Content Generation Guidelines

**CRITICAL: When creating content for PPT slides, you MUST respect these rules.**

## Text Box Limits

| Slide Type | Element | Max Chars | Notes |
|------------|---------|-----------|-------|
| Title | idx=0 | **60** | **MAX 5 WORDS — single line only, no wrapping** |
| Subtitle | idx=11 | **50-100** | Short subtitle |
| Body Single | idx=11 | **1,400** | Full paragraph content |
| Body Two-Col | idx=11, 14 | **500** each | ~8-10 lines per column |
| Text 2x2 | idx=11-14 | **250** each | ~5 lines per cell |
| Text 2x3 | idx=15-20 | **150** each | ~4 lines per cell |
| Three Column | idx=11-13 | **150** each | ~6 lines per column |
| Screenshot body | idx=11 | **250** | Small box |
| Agenda items | idx=11-17 | **700** each | ~10 items max |

---

## Formatting Rules

### 1. Text Alignment
- **ALWAYS use LEFT ALIGN for bullet points**
- NEVER use justified text
- The Master Template handles alignment - just provide clean content

### 2. Fill All Text Boxes
- If a layout has 4 text boxes (e.g., 2x2 grid) → **FILL ALL 4**
- Never leave any cell empty
- Fill textboxes well; do not leave large avoidable dead space
- If a slide has a textbox above a table (`slide-007`), that textbox must always be filled
- If you don't have 4 items, consolidate to 2x1 or use different layout

### 3. Diagram Aspect Ratio (BINDING — Gyan directive, 2026-03-20)

When generating a Mermaid diagram for a slide, its source shape **must match the aspect ratio of the target image slot**:

| Slot | Ratio | Required shape |
|---|---|---|
| equal (017/018) | ~1.125:1 | `flowchart TD`, 2–3 levels deep, short node labels |
| wide (019/020) | ~1.678:1 | `flowchart LR` or swimlane LR |
| one-third (021/022) | ~0.67:1 portrait | tall `flowchart TD`, single column, minimal width |
| screenshot-browser-frame (015/016) | ~1.955:1 | horizontal process flow LR, 7–10 nodes |
| full-width (023) | ~2.866:1 | very wide horizontal pipeline/timeline LR, 8+ stages |

Do not use a single default direction for all diagrams. Pick direction and depth to fill the slot. Image conversion and placement logic is unchanged — only the Mermaid source shape changes.

### 4. Images
- **Include at least 1 image slide** in every presentation
- Use DALP screenshots from: `templates/dalp-screenshots/`
- Or use stock images from: Check content folder for stock photos
- Image slides: Screenshot Left, Screenshot Right, Picture layouts
- Keep Mermaid diagrams off the main deck; use them in an appendix after the Thank You slide
- Generate Mermaid diagrams new for each presentation; do not reuse generic templates or cached diagrams from prior decks
- **Diagram rendering pipeline (locked):** Author `.mmd` → render SVG via `mmdc` → convert SVG to PNG via `scripts/svg_to_png_puppeteer.js` passing slot dimensions from `PLACEHOLDER_CLASS_PROFILES`. Puppeteer is the only supported converter. cairosvg, rsvg-convert, and Inkscape are not supported.
- Add `image_path` pointing to the `.mmd` source in config; `build_from_config.py` handles the full render pipeline automatically

### 5. Agenda Slides
- **DO NOT add text on top** - edit the existing text boxes
- Maximum **7 agenda points total**
- Each used agenda slot must be **one short phrase on one line only**
- Each used agenda item has TWO parts:
  - Left: Icon from `icon-library/lucide/`
  - Right: Short phrase for that item
- If a slot is unused, leave the item empty in config; the builder now removes both the text placeholder and icon placeholder entirely
- Do **not** put raw file paths like `icon-library/...` into agenda text

---

## Icon Library

Icons available at: `icon-library/lucide/`

Common icons for agenda:
| Topic | Icon |
|-------|------|
| Market/Overview | `bar-chart.svg`, `activity.svg` |
| Benefits | `check-circle.svg`, `award.svg` |
| Technical | `box.svg`, `code.svg`, `settings.svg` |
| Use Cases | `briefcase.svg`, `package.svg` |
| Regulatory | `shield.svg`, `file-text.svg` |
| Next Steps | `arrow-right.svg`, `check.svg` |

---

## Image Sources

### DALP Screenshots
Location: `templates/dalp-screenshots/`

Folders:
- 01 - Login
- 02 - Dashboard
- 03 - Asset Designer
- 04 - Bonds
- 05 - Equity
- 06 - Funds
- 07 - Deposits
- 08 - Stablecoins
- 09 - Precious Metals
- 10 - Real Estate
- 11 - Compliance
- 12 - Identity
- 13 - XVP
- 14 - Settings
- 15 - Monitoring
- 16 - Insights

---

## Title Rules (BINDING)

- **Main slide `title` field: MAX 5 WORDS, single line only, NO wrapping.**
  - The builder auto-truncates to 5 words — but write ≤5 words in the first place.
  - Bad: `"title": "Why Tokenized Deposits Are Transforming Global Settlement"` (7 words)
  - Good: `"title": "Tokenized Deposits Settlement Impact"` (4 words)
- **No em dashes, en dashes, or ellipsis** in any text field. Use commas or periods instead.
- Do not use AI giveaway phrases: "leverage", "utilize", "seamlessly", "holistic", "robust", "paradigm", "in conclusion", "furthermore", "moreover", "it is worth noting".

---

## Generating Content

When asked to create PPT content:

1. **First**: Identify the slide layout type
2. **Then**: Apply the corresponding limit
3. **ALWAYS**: 
   - Left-align bullets (handled by template, but don't break it)
   - Fill ALL cells in multi-box layouts
   - Include at least 1 image slide
   - For agenda: prepare icon + text pairs
   - Keep `title` fields to ≤5 words

### Example: Agenda Item

```json
{
  "bank_file": "slide-002-agenda.pptx",
  "title": "Agenda",
  "item_0": "Market outlook",
  "item_1": "DALP proof points",
  "item_2": "Operating model",
  "icon1": "icon-library/lucide/bar-chart.svg",
  "icon2": "icon-library/lucide/check-circle.svg",
  "icon3": "icon-library/lucide/box.svg"
}
```

### Example: 2x2 Grid

```json
{
  "bank_file": "slide-013-text-2x2.pptx",
  "item1_title": "Use Case 1",
  "item1_body": "Description here",
  "item2_title": "Use Case 2", 
  "item2_body": "Description here",
  "item3_title": "Use Case 3",
  "item3_body": "Description here",
  "item4_title": "Use Case 4",
  "item4_body": "Description here"
}
```
**→ MUST fill all 4 items!**

---

## Quick Reference

- Title = 60 chars max
- Single body = 1,400 chars max
- Two-col body = 500 chars each
- 2x2 cells = 250 chars each
- Section subtitle = 50 chars max
- **ALWAYS fill all cells in grid layouts**
- **Include 1+ image slide per deck**
- **Agenda = max 7 one-line icon + short-phrase pairs**
