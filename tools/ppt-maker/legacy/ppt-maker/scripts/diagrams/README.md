---
title: "Diagramming Engine — Mermaid + PlantUML"
type: index
source: gbrain-metadata-normalizer
metadata_normalized_at: 2026-04-27T12:36:05.699317Z
---

# Diagramming Engine — Mermaid + PlantUML

Generates branded diagrams for PPTX Builder presentations using Mermaid and PlantUML with SettleMint brand styling.

## Architecture

```
scripts/diagrams/
├── __init__.py          # Package exports
├── engine.py            # Core rendering engine (Mermaid + PlantUML)
├── templates.py         # Pre-built DALP diagram templates
├── mermaid-config.json  # SettleMint-branded Mermaid theme config
├── INDEX.json           # Machine-readable template index
├── INDEX.md             # Human-readable template reference
└── README.md            # This file
```

## Relationship to `diagram_renderer.py`

The existing `scripts/diagram_renderer.py` is now a thin compatibility wrapper over this engine. This package provides:

- **Brand theming** — all diagrams use SettleMint colors, Figtree font, rounded corners
- **Reference library** — example DALP diagram patterns for inspiration only; not approved as reusable production diagrams for decks
- **Enhanced PNG generation** — Mermaid uses the bid-manager-proven `mmdc` scale-3 PNG path first, with SVG→PNG fallback via cairosvg → rsvg-convert → Inkscape
- **Reference catalog** — example patterns remain documented for styling reference, but reusable template rendering is disabled for PPT Maker production decks
- **Category system** — diagrams organized by type (architecture, flow, sequence, etc.)

The original `diagram_renderer.py` remains functional for backward compatibility.

## Usage

### From Python
```python
import sys
sys.path.insert(0, 'scripts')

from diagrams.engine import DiagramEngine
# Initialize engine
engine = DiagramEngine()

# Render custom code for this specific presentation
# Production deck diagrams must be newly generated per presentation context.
# Reusable template rendering is intentionally disabled in PPT Maker.

# Render custom code
result = engine.render_mermaid(
    code='graph LR\n  A[Start] --> B[End]',
    filename='my-diagram',
    width=2400,
    bg_color='transparent',
)

# Note: render_template() and render_all_templates() are intentionally disabled for PPT Maker production use.
```

### From the PPTX Builder
The engine integrates with `build-pptx.py` to auto-generate diagrams when slide content includes Mermaid/PlantUML code blocks:

```markdown
## Architecture Overview

```mermaid
graph TB
    A[Platform] --> B[Blockchain]
```​
```

### Custom Output Directory
```python
from pathlib import Path
engine = DiagramEngine(output_dir=Path('/tmp/my-diagrams'))
```

## Prerequisites

### Required
- **Node.js** + **npm/npx**
- **Mermaid CLI**: `npm install -g @mermaid-js/mermaid-cli` (or auto-uses `npx`)

### Optional (for PNG output)
- **cairosvg** (Python): `pip install cairosvg` — best quality SVG→PNG
- **rsvg-convert**: `brew install librsvg` — CLI fallback
- **Inkscape**: last-resort fallback

### Optional (for PlantUML)
- **plantuml**: `brew install plantuml`
- Or: **Java** + plantuml.jar

## Rendering Pipeline (PNG for PPTX slides)

The production rendering pipeline for PPT slides uses **direct mmdc PNG output**, not SVG-to-PNG conversion. This was fixed on 2026-04-03 after diagrams appeared tiny, mispositioned, or with strikethrough text.

### How it works

1. **mmdc renders directly to PNG** via `mmdc --outputFormat png --scale 3 --cssFile <css>`
   - This uses mmdc's internal Puppeteer instance, which handles CSS and sizing correctly
   - The `figtree-embedded.css` from `shared/brand/` works correctly with this path
   - Scale factor 3 produces high-DPI output suitable for presentations
   - This matches the bid-manager's proven approach

2. **`_fit_png_to_slot()` composites onto placeholder-sized canvas**
   - The raw diagram PNG typically has a different aspect ratio than the slide placeholder
   - Example: a sequence diagram might be 1.48:1 but slide-023's placeholder is 2.87:1 (12.33" x 4.30")
   - The function creates a white canvas matching the exact placeholder pixel dimensions (at 192 DPI)
   - The diagram is centered on this canvas using "contain" logic
   - This ensures the PNG fills the placeholder without distortion or tiny rendering

3. **Slot dimensions come from the slide bank**
   - Each slide template's `.info.json` defines placeholder dimensions
   - slide-023 (full-width picture): 12.33" x 4.30", at 192 DPI = 2368 x 826 px

### Why NOT SVG-to-PNG

The previous pipeline (mmdc -> SVG, then Puppeteer SVG -> PNG) had three problems:

- **Strikethrough text**: The shared `figtree-embedded.css` contains `* { font-family: ... !important; }` which interfered with Mermaid's inline SVG styles. For any SVG rendering path, use the local `figtree-mermaid.css` instead (contains only @font-face declarations, no wildcard selector).
- **Size lock**: Mermaid bakes inline `max-width` styles into SVGs that prevent CSS scale-up. The SVG renders at its natural size and resists enlargement.
- **Double conversion overhead**: Two Puppeteer launches (mmdc + svg_to_png) with compounding quality/sizing issues.

### CSS files

- `figtree-embedded.css` (shared/brand/) — Full CSS with `*` wildcard. Works with mmdc's direct PNG path.
- `figtree-mermaid.css` (local) — @font-face declarations only. Use for any SVG rendering path to avoid strikethrough.

### Configuration

- `mermaid-config.json` — Theme config with wider spacing (`actorMargin: 80`, `messageFontSize: 16`), `mirrorActors: false`, `useMaxWidth: false`
- Diagrams use `round_corners=false` (no bitmap pre-composition needed)

## Parallel Pre-Rendering via build_from_config.py

The main build script (`build_from_config.py`) includes a built-in parallel rendering pipeline using Python's `ThreadPoolExecutor`. This is the **preferred** rendering path for production decks.

### Flow

1. Before any slide assembly, `_collect_mermaid_sources_from_config()` scans all slide configs for `.mmd` / `.mermaid` source files.
2. `_prerender_diagrams_parallel()` renders all collected diagrams with up to **4 concurrent workers**, each spawning its own `DiagramEngine` instance and `mmdc` process.
3. Results are cached in `_PARALLEL_RENDER_CACHE` (module-level dict, keyed by variant name like `tokenization-flow-wide`).
4. During slide assembly, `_render_diagram_source()` checks the cache first. Cache hits skip rendering entirely; cache misses fall back to sequential rendering.

### Thread safety

Each worker creates an independent `DiagramEngine` instance. The engine spawns its own `mmdc` subprocess, so there are no shared resources between threads. The only shared state is the output directory (`output/diagrams/`), which is safe because each variant writes to a unique filename.

### Fallback

If parallel rendering fails entirely (e.g. missing `mmdc`, Node.js issues), the builder logs a warning and falls back to sequential per-slide rendering during assembly. Partial failures are also handled: only the failed diagrams render sequentially.

### Performance

Typical 6-diagram appendix: ~2-3 minutes parallel vs ~10 minutes sequential.

## Brand Styling

All diagrams automatically use:
- **Font**: Figtree (SettleMint brand font)
- **Colors**: Brand palette (blue primary, green secondary, purple tertiary)
- **Corners**: Rounded (rx:15, ry:15)
- **Background**: Transparent (clean composition on any slide background)
- **Line style**: Gray (#787878) arrows and connectors

See `INDEX.md` for the full color palette reference.
