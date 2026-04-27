---
title: "Blank Slide Design System"
type: page
source: gbrain-metadata-normalizer
metadata_normalized_at: 2026-04-27T12:36:05.665225Z
---

> **Typography:** For the unified typography system (covering both slide bank and recipe slides), see `setup/typography-system.md`. This file covers recipe-specific layout and styling rules.

# Blank Slide Design System

> Single source of truth for colors, typography, spacing, and content limits on recipe-rendered blank slides.
> All values derived from the Master Template 2026 theme and layout measurements.

## Slide Canvas

| Property | Value | Notes |
|----------|-------|-------|
| Width | 13.333" (33.867cm) | Widescreen 16:9 |
| Height | 7.500" (19.05cm) | |
| Title area | y=0" to ~1.29" | Reserved for slide title placeholder |
| Content area | y=1.35" to ~6.60" | 5.25" usable height |
| Footer area | y=6.93" | Slide number + "SettleMint Confidential" |
| Left margin | 0.50" | Matches template layouts |
| Right margin | 0.48" (to 12.85") | Matches template layouts |
| Usable content width | 12.35" | 0.50" to 12.85" |

## Color Palette

All recipe shapes use theme-derived colors only. White background, no shape fills that break the clean look.

### Primary Colors (from theme clrScheme)

| Role | Hex | Theme Key | Usage |
|------|-----|-----------|-------|
| Title text | `0000FF` | dk2/tx2 | All slide titles, section headers, recipe headings |
| Body text | `000000` | dk1/tx1 | All body text, descriptions, bullet points |
| White | `FFFFFF` | lt1 | Slide background (never override), shape text on dark fills |
| Light gray | `E8E8E8` | lt2 | Subtle backgrounds, divider lines, card backgrounds |

### Accent Colors (for visual elements)

| Name | Hex | Theme Key | Usage |
|------|-----|-----------|-------|
| Deep blue | `000099` | accent1 | Primary accent: stat numbers, header bars, active elements |
| Gold | `DBB70F` | accent2 | Secondary accent: highlights, callout numbers |
| Bright blue | `0000ED` | accent3 | Tertiary accent: connectors, arrows, links |
| Orange | `E47C48` | accent4 | Sparingly: warnings, attention elements |
| Green | `037352` | accent5 | Sparingly: success, positive indicators |
| Purple | `904EFF` | accent6 | Sparingly: differentiation in grids |

### Color Rules

1. **White background always.** Never add colored slide backgrounds.
2. **Title text = 0000FF (dk2).** Matches all other template slides.
3. **Body text = 000000 (dk1).** Black text on white for maximum readability.
4. **Accent shapes use accent1 (000099) as primary.** Deep blue bars, stat numbers.
5. **No more than 2 accent colors per slide.** Keeps visual noise low.
6. **Architecture stack layers:** Alternate between accent1 (000099) and a 15% lighter tint (3333BB). White text on dark fills.
7. **Process flow boxes:** Light gray (E8E8E8) fill with dk1 text. Accent1 (000099) border or header bar.
8. **Stat callouts:** Number in accent1 (000099) at 48pt. Label/body in dk1 (000000).
9. **Connectors/arrows:** accent3 (0000ED).
10. **Never use raw red, bright green, or neon colors.** Stay in the palette.
11. **Transparent fills = `none`, not `FFFFFF00`.** PowerPoint interprets hex with alpha (FFFFFF00) as yellow. Use `fill=none` and `line=none` for text overlay shapes that need true transparency.

### Contrast Rules

| Combination | Min Ratio | Pass? |
|-------------|-----------|-------|
| 000000 on FFFFFF | 21:1 | Yes (AAA) |
| 0000FF on FFFFFF | 8.6:1 | Yes (AAA) |
| 000099 on FFFFFF | 11.8:1 | Yes (AAA) |
| FFFFFF on 000099 | 11.8:1 | Yes (AAA) |
| FFFFFF on 0000FF | 8.6:1 | Yes (AAA) |
| 000000 on E8E8E8 | 14.8:1 | Yes (AAA) |
| 0000FF on E8E8E8 | 6.1:1 | Yes (AA) |

All combinations exceed WCAG AA (4.5:1 for normal text, 3:1 for large text).

## Typography

| Element | Font | Weight | Size | Color | Notes |
|---------|------|--------|------|-------|-------|
| Recipe heading | Figtree | SemiBold | 14pt | 0000FF | Matches subtitle style in other slides |
| Sub-heading | Figtree | SemiBold | 13pt | 000099 | For layer titles, step titles, stat labels |
| Body text | Figtree | Regular | 11pt | 000000 | Main content text |
| Small body | Figtree | Regular | 10pt | 000000 | When space is tight (6-item grids) |
| Large stat number | Figtree | Bold | 48pt | 000099 | Stat callout numbers |
| Medium stat number | Figtree | Bold | 36pt | 000099 | When 4 stats (tighter space) |
| Step number | Figtree | Bold | 20pt | FFFFFF | White on accent background circle |
| Timeline date | Figtree | SemiBold | 10pt | 000099 | Above timeline markers |

### Text Alignment

- Recipe headings: left-aligned
- Body text: left-aligned
- Stat numbers: center-aligned
- Stat labels: center-aligned
- Step numbers in circles: center-aligned
- Timeline dates: center-aligned

## Content Limits

### Character Limits per Recipe

| Recipe | Field | Max Chars | Max Lines | Notes |
|--------|-------|-----------|-----------|-------|
| architecture-stack | layer title | 30 | 1 | Short label |
| architecture-stack | layer body | 90 | 2 | Comma-separated list |
| process-flow | step title | 20 | 1 | Action verb + noun |
| process-flow | step body | 80 | 3 | Short description |
| stat-callouts | number | 8 | 1 | e.g. "7", "$2.1B", "99.9%", "<4wk" |
| stat-callouts | label | 25 | 1 | Short category name |
| stat-callouts | body | 70 | 2 | One-sentence description |
| comparison-columns | title | 25 | 1 | Column header |
| comparison-columns | body | 400 | 10 | Bullet list, one side |
| timeline | date | 15 | 1 | "Q1 2026", "Week 1-2" |
| timeline | title | 20 | 1 | Milestone name |
| timeline | body | 60 | 2 | Short description |
| icon-text-grid | item title | 25 | 1 | Feature/capability name |
| icon-text-grid | item body | 100 | 3 | Short description |

### Overflow Policy

When text exceeds limits:
1. Reduce font size by 1pt (minimum: body 9pt, headings 11pt)
2. If still overflows, truncate with "..." and log a warning in fit report
3. Never break layout geometry to fit more text

## Spacing and Positioning

### Content Area Grid

The usable content area (0.50" to 12.85" horizontal, 1.35" to 6.60" vertical) is divided into a virtual grid:

| Recipe | Columns | Rows | Cell Width | Cell Height | H-Gap | V-Gap |
|--------|---------|------|------------|-------------|-------|-------|
| architecture-stack | 1 | 4-5 | 12.35" | 1.05" | - | 0.10" |
| process-flow (4) | 4 | 1 | 2.60" | 3.20" | 0.47" | - |
| process-flow (3) | 3 | 1 | 3.40" | 3.20" | 0.58" | - |
| stat-callouts (3) | 3 | 1 | 3.78" | 4.50" | 0.20" | - |
| stat-callouts (4) | 4 | 1 | 2.79" | 4.50" | 0.20" | - |
| comparison-columns | 2 | 1 | 5.88" | 5.25" | 0.59" | - |
| timeline | 4-5 | 1 | 2.47" | 3.00" | 0.40" | - |
| icon-text-grid (2x2) | 2 | 2 | 5.88" | 2.30" | 0.59" | 0.40" |
| icon-text-grid (2x3) | 3 | 2 | 3.78" | 2.30" | 0.20" | 0.40" |

### Centering Rules

1. **Horizontal centering:** Calculate total width of all elements + gaps. Offset x_start = 0.50" + (12.35" - total_width) / 2
2. **Vertical centering:** Calculate total height of all elements + gaps. Offset y_start = 1.35" + (5.25" - total_height) / 2
3. **Within-cell centering:** Text is vertically centered (valign=center) in boxes by default. Override to valign=top for multi-line body text.
4. **Connector centering:** Arrows centered vertically on the midpoint of adjacent boxes.

### Shape Styling

| Element | Preset | Corner Radius | Border | Fill |
|---------|--------|---------------|--------|------|
| Architecture layer bar | roundRect | default | none | accent1/accent1+tint |
| Process step box | roundRect | default | E8E8E8 1pt | E8E8E8 |
| Process step number circle | ellipse | - | none | 000099 |
| Stat card background | roundRect | default | E8E8E8 1pt | FFFFFF |
| Comparison header bar | rect | none | none | 000099 |
| Comparison body area | rect | none | E8E8E8 1pt | FFFFFF |
| Timeline line | connector (straight) | - | 0000ED 2pt | - |
| Timeline marker | ellipse | - | none | 000099 |
| Grid item card | roundRect | default | E8E8E8 1pt | FFFFFF |

## Validation Checklist

Before a recipe slide is considered complete:
- [ ] White background (no slide fill override)
- [ ] Title uses theme dk2 color (0000FF)
- [ ] All body text uses theme dk1 color (000000)
- [ ] No more than 2 accent colors used
- [ ] All text within character limits
- [ ] Elements centered in available space
- [ ] Footer/slide number not overlapped
- [ ] Figtree font throughout (no fallback to Calibri/Arial)
- [ ] Minimum 0.50" margin on all sides
