---
title: "Typography System"
type: page
source: gbrain-metadata-normalizer
metadata_normalized_at: 2026-04-27T12:36:05.699869Z
---

# Typography System

> Unified typography reference for the PPT maker. Covers both slide bank builds (`build_from_config.py`) and recipe slides (`DESIGN_SYSTEM.md`).

**Font:** Figtree throughout. No fallback to Calibri/Arial.

---

## Hard Rules

| Rule | Value | Notes |
|------|-------|-------|
| Body text max | **18pt** | Hard cap, no exceptions. Enforced 2026-04-03 (was 24pt). |
| Grid cell body max (compact) | **16pt** | `grid_cell_compact` profile |
| Grid cell body max (standard) | **18pt** | `grid_cell` profile |
| Cover title max | **54pt** | Scales down with text length |
| Slide title max | **36pt** | Scales down with text length |
| Mini title / grid subtitle max | **18pt** | Fixed |
| Title color | `0000FF` | Theme dk2/tx2 |
| Body color | `000000` | Theme dk1/tx1 |
| Accent color | `000099` | Theme accent1 (stat numbers, header bars) |

---

## Slide Bank Typography (build_from_config.py)

### Title Hierarchy

All titles use **Figtree Bold** (`Figtree-Bold.ttf`).

#### Cover Title (`cover_title`)
Auto-scales max_size based on character count:

| Characters | Max Size |
|-----------|----------|
| ≤ 20 | 54pt |
| ≤ 28 | 48pt |
| ≤ 36 | 44pt |
| > 36 | 38pt |

#### Slide Title (`title`)
Same scaling approach:

| Characters | Max Size |
|-----------|----------|
| ≤ 24 | 36pt |
| ≤ 40 | 30pt |
| > 40 | 26pt |

#### Mini Title (`mini_title`)
- Fixed max: **18pt Bold**

### Body Text Fit Profiles

All body text uses **Figtree SemiBold** (`Figtree-SemiBold.ttf`) for auto-fit rendering. There are 7 profiles, each tuned for a specific layout context.

| Profile | font_pt | max_size | Use Case |
|---------|---------|----------|----------|
| `body_default` | 12.0 | 18 | Standard single-column body text |
| `body_dense` | 11.5 | 18 | Dense text (more content, same space) |
| `three_col` | 11.5 | 18 | Three-column layouts |
| `grid_cell` | 11.5 | 18 | Standard grid cells |
| `grid_cell_compact` | 10.8 | 16 | Compact grid cells (6+ items) |
| `screenshot_text` | 11.3 | 18 | Text alongside screenshots |
| `picture_narrow_text` | 11.2 | 18 | Narrow text next to pictures |

### How fit_text() Works

1. The builder calls `_fit_text_frame(tf, role, max_size_override)` on every text frame.
2. For body text, `_suggest_body_max_size()` adjusts the ceiling based on utilization:
   - Utilization < 0.30 → max_size + 2 (more room, allow slightly larger)
   - Utilization > 0.92 → max_size - 1 (tight fit, shrink ceiling)
   - Final result is always clamped to `max(12, min(18, ...))` — the **18pt hard cap**.
3. `fit_text()` auto-shrinks from the ceiling down until text fits the frame. It only shrinks to fit height, not width — long single-line titles can clip, which is why title max_size scales with character count.

### Table Text

Tables use a separate sizing loop (`font_pt` from 12 down to 7) to fit content into rows. Row heights are calculated as `font_pt × 1.6 EMU` (compact) and `font_pt × 2.4 EMU` (header).

---

## Recipe Slide Typography (DESIGN_SYSTEM.md)

Recipe slides (blank-recipes) use fixed sizes, not auto-fit profiles.

| Element | Font | Weight | Size | Color |
|---------|------|--------|------|-------|
| Recipe heading | Figtree | SemiBold | 14pt | 0000FF |
| Sub-heading | Figtree | SemiBold | 13pt | 000099 |
| Body text | Figtree | Regular | 11pt | 000000 |
| Small body | Figtree | Regular | 10pt | 000000 |
| Large stat number | Figtree | Bold | 48pt | 000099 |
| Medium stat number | Figtree | Bold | 36pt | 000099 |
| Step number | Figtree | Bold | 20pt | FFFFFF |
| Timeline date | Figtree | SemiBold | 10pt | 000099 |

### Recipe Overflow Strategy

When content exceeds character limits:
1. Reduce font size by 1pt (minimum: body 9pt, headings 11pt)
2. Truncate with ellipsis if still overflowing
3. Never break the grid layout

---

## Color Reference

| Token | Hex | Theme Slot | Usage |
|-------|-----|-----------|-------|
| Title text | `0000FF` | dk2/tx2 | All slide titles, section headers, recipe headings |
| Body text | `000000` | dk1/tx1 | All body text, descriptions, bullet points |
| Deep blue | `000099` | accent1 | Stat numbers, header bars, sub-headings |
| White | `FFFFFF` | lt1/bg1 | Backgrounds, step numbers on accent shapes |

---

## Changelog

- **2026-04-03**: Hard-capped body text at 18pt (was 24pt). `_suggest_body_max_size()` now clamps with `min(18, ...)`. All 7 fit profiles updated.
