---
title: "TOOLS.md — PPTX Builder Tools"
type: page
source: gbrain-metadata-normalizer
metadata_normalized_at: 2026-04-27T12:36:05.664433Z
---

# TOOLS.md — PPTX Builder Tools

## Template
- **Canonical template:** `ppt-maker/templates/Master Template 2026.pptx` (frozen mother template, Gyan-approved official template)
- **Template format:** Microsoft PowerPoint Open XML Presentation (`.pptx`)
- **Slide size:** 13.333" × 7.500" (16:9 widescreen)
- **Layouts:** 36 (1 slide master)

## Typography
- **Primary font family:** Figtree
- **Embedded weights in template:** Regular, Medium, SemiBold, ExtraBold, Light
- **Rule:** Preserve the template font settings. Do not substitute Arial, Calibri, Aptos, or any other fallback font.

## Color Palette
Single source of truth: `ppt-maker/templates/assets/palette.json`

| Token | Hex |
|---|---|
| Primary | `#0000FF` |
| Secondary | `#1A5BDC` |
| Accent | `#4A90E8` |
| Dark | `#0A1A50` |
| Light | `#D0EAFA` |
| Text Dark | `#0E1E38` |
| Text Light | `#FFFFFF` |
| Background | `#FFFFFF` |

Additional palette groups (yellow, orange, green, purple, light_blue, bright_blue, cyan_blue, steel) with 4-shade ramps are defined in `palette.json` for chart and accent use.

Use the colors from `palette.json`. Do not hardcode different color values in configs.

## Python Dependencies
The presentation builder relies on:
- `python-pptx` (primary composition library)
- `xml.etree.ElementTree`, `zipfile`, `shutil`, `os`, `re`, `pathlib`, `tempfile`

## Build Script
- **Primary builder:** `scripts/build_from_config.py`
- **Diagram engine:** `scripts/diagrams/engine.py`
- **Blank recipe injector:** `scripts/inject_shapes.py`
- **Legacy builder:** `scripts/build_pptx.py` is retired and hard-fails for production use
- **Purpose:** Load the locked mother template, populate native layout placeholders from a validated layout config, and output PPTX

## Practical Notes
- Generated presentations should be written to `output/`
- Prefer editable text and native shapes over flattened image compositions



