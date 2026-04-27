---
title: "Templates"
type: index
source: gbrain-metadata-normalizer
metadata_normalized_at: 2026-04-27T12:36:05.701839Z
---

# Templates

## Master Template
`Master Template 2026.pptx` — the single source of truth for all slide layouts.
Never modify this file directly. Use `scripts/extract_slide_bank.py` to extract slides into the slide bank.

## Design System
`design-system.json` — canonical colors, typography, font sizes, spacing, and content zones.
All scripts must reference this file. Font is always Figtree.

## Layouts
`LAYOUT-CATALOG.md` — canonical layout catalog with placeholder specs and usage guides.

## Assets
- `assets/` — logos, palette JSON (`palette.json`)
- `icon-library/` — 70 icons in SVG + 6 color variants (PNG). Standard size: 0.3" × 0.3"
- `dalp-screenshots/` — DALP platform UI screenshots, organized by section (16 sections, 186 files)
- `themes/` — theme variant JSON files (default, dark, data-heavy, minimal)
