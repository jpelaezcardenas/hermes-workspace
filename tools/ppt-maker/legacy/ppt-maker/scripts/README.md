---
title: "PPT Builder Scripts"
type: index
source: gbrain-metadata-normalizer
metadata_normalized_at: 2026-04-27T12:36:05.698715Z
---

# PPT Builder Scripts

## Canonical builder in the current frozen setup

Use:

```bash
python3 scripts/build_from_config.py configs/<deck>.json
```

This is the live builder present in the repo and the only builder documented as canonical in the current freeze.

## Current builder behavior

`build_from_config.py`:
- loads slide-bank-driven configs
- edits unique temp copies of bank slides
- merges slide XML back into `templates/Master Template 2026.pptx`
- post-processes icons and images
- enforces image-slot policy from `slide-bank/REGISTRY.json`
- writes a fit report for successful builds
- fails closed on invalid content, invalid image placement, thank-you-slide text, invalid agenda content, main-deck Mermaid use, and empty table-with-text body usage

## Frozen workflow notes

- Agenda slides allow max 7 points, one short phrase per used slot; empty slots are deleted completely and icon paths never map into agenda text.
- Mermaid diagrams belong in the appendix after the Thank You slide, not on main slides.
- Mermaid diagrams for PPT Maker must be generated new for the current presentation context; do not reuse generic templates, prior deck diagrams, or cached renders.
- Diagram sources may be Mermaid (`.mmd`, `.mermaid`) or PlantUML/UML (`.puml`, `.plantuml`, `.uml`).
- All diagram sources render into `output/diagrams/` with SVG as source-of-truth plus a high-quality PNG sibling for PowerPoint embedding.
- Native SVG embedding is not relied on in the current PPT pipeline; generated decks embed PNG while retaining SVG next to it.
- SVG→PNG conversion uses **Puppeteer exclusively** (`svg_to_png_puppeteer.js`). cairosvg, rsvg-convert, and Inkscape are not used and must not be used. Puppeteer is required because Mermaid v10+ embeds all node labels in `<foreignObject>` HTML elements that static SVG renderers drop silently, producing diagrams with boxes but no text. `svg_to_png_puppeteer.js` accepts optional `slot_width` and `slot_height` arguments (pixels); when provided it renders the PNG sized exactly to those dimensions with the SVG contained and centered. Slot dimensions come from `PLACEHOLDER_CLASS_PROFILES` in `build_from_config.py`.
- Appendix Mermaid diagrams target one of five canonical placeholder classes: `screenshot-browser-frame`, `equal`, `wide`, `one-third`, `full-width`.
- The builder derives the target class from the selected slide-bank placeholder, renders Mermaid at a class-specific width, and looks for slot-specific sibling sources before falling back to the base file (`diagram--wide.mmd`, `diagram.wide.mmd`, `diagram-wide.mmd`, `diagram_wide.mmd`).
- Configs may set optional `diagram_target_class`, but it must match the actual placeholder class for the selected slide or the build fails closed.
- Final deliverable is PPTX only.

## Diagram rendering (canonical Puppeteer pipeline)

The locked pipeline for diagram generation:

```
1. Author  →  workflow/appendix-diagrams/<name>.mmd   (Mermaid source)
2. Render  →  mmdc → output/diagrams/<name>.svg        (canonical source artifact)
3. Convert →  node scripts/svg_to_png_puppeteer.js     (Puppeteer / Chrome headless)
              args: <svg> <png> <render_width> <slot_width_px> <slot_height_px>
              → output/diagrams/<name>.png              (embedded in PPTX)
4. Config  →  "image_path": "workflow/appendix-diagrams/<name>.mmd"
              build_from_config.py handles steps 2–3 automatically
```

**Slot dimensions** (`slot_px`) from `PLACEHOLDER_CLASS_PROFILES` in `build_from_config.py`:

| Class | Slot W×H (px) | Render width |
|---|---|---|
| `screenshot-browser-frame` | 1661 × 849 | 2800 |
| `equal` | 1129 × 1004 | 1800 |
| `wide` | 1684 × 1004 | 2400 |
| `one-third` | 672 × 1004 | 1400 |
| `full-width` | 2368 × 826 | 3200 |

**Key scripts:**
- `svg_to_png_puppeteer.js` — Chrome headless SVG→PNG converter (only correct renderer for Mermaid v10+ `<foreignObject>`)
- `diagrams/engine.py` — `DiagramEngine` class: wraps mmdc + `svg_to_png_puppeteer.js`
- `diagrams/mermaid-config.json` — Mermaid theme/brand config
- `diagrams/puppeteer-config.json` — Puppeteer launch config

## Supporting scripts

- `extract_slide_bank.py` — extracts slide-bank templates from the master template
- `diagram_renderer.py` — legacy diagram rendering utilities (not the canonical build path)
- `image_helpers.py` — image preparation helpers
- `svg_handler.py` — legacy SVG utilities using cairosvg (not used in the build path)
- `slide_intelligence.py` — slide-selection and helper logic

## Important current-state note

Older docs referenced scripts such as `build.sh`, `validate_production_build.py`, and `build_from_layout_config.py`.
Those references are stale for the current repo state and are not part of the frozen setup.

## Retained but non-canonical entrypoints

- `build_pptx.py` exists in the repo but is not the documented canonical builder for the current freeze.
- `build_from_bank.py` exists in the repo state but is not the frozen canonical path either.

The freeze documents only `build_from_config.py` as the supported path.
