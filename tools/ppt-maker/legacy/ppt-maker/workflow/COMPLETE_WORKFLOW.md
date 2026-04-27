---
title: "Complete PPT Maker Workflow"
type: page
source: gbrain-metadata-normalizer
metadata_normalized_at: 2026-04-27T12:36:05.704083Z
---

# Complete PPT Maker Workflow

Frozen on: **2026-03-20** (diagram pipeline locked by Gyan directive)

This document captures the current PPT maker setup exactly as it exists now.

## One canonical flow

```text
1. templates/Master Template 2026.pptx
        → frozen mother template
2. scripts/extract_slide_bank.py
        → extraction step for slide bank refreshes
3. slide-bank/
        → 22 supported layouts in the current registry
        → metadata lives in REGISTRY.json and *.info.json
4. Author diagram source(s) → workflow/appendix-diagrams/<name>.mmd
        → Mermaid (.mmd) source files for the appendix
5. Render SVG: mmdc -i <source>.mmd -o output/diagrams/<name>.svg
        → SVG is the canonical source artifact
6. Convert SVG → PNG via Puppeteer (sole converter):
        node scripts/svg_to_png_puppeteer.js \
          output/diagrams/<name>.svg \
          output/diagrams/<name>.png \
          <render_width> <slot_width_px> <slot_height_px>
        → PNG sized exactly to slot dimensions
7. configs/<deck>.json references the .mmd source file as image_path
        → build_from_config.py handles rendering automatically on build
8. scripts/build_from_config.py
        → text injection + table insertion
        → diagram rendering (calls steps 5-6 internally for .mmd sources)
        → XML-only merge into mother template
        → icon/image post-processing
        → fit validation + main-deck Mermaid guardrails
9. output/<deck>.pptx        → final deck
   output/<deck>-fit-report.json  → fit report
```

## Diagram pipeline — canonical detail

### Why Puppeteer is required

Mermaid v10+ renders **all node labels** via `<foreignObject>` HTML elements inside the SVG.
Static SVG renderers (cairosvg, rsvg-convert, Inkscape) silently drop `<foreignObject>`.
The result: boxes render, all labels are invisible.
Chrome (via Puppeteer) fully renders the HTML DOM including `<foreignObject>`.
**Puppeteer is the only supported SVG→PNG converter. No alternatives.**

### Step 1 — Author the Mermaid source (`.mmd`)

Save each diagram to: `workflow/appendix-diagrams/<descriptive-name>.mmd`

Choose the **diagram type based on the target slot's aspect ratio**:

| Slot class | Ratio | Slot px (W×H) | Mermaid direction |
|---|---|---|---|
| `equal` (slide-017/018) | 1.125:1 | 1129 × 1004 | `flowchart TD`, 2–3 levels, short labels |
| `wide` (slide-019/020) | 1.678:1 | 1684 × 1004 | `flowchart LR` or swimlane LR |
| `one-third` (slide-021/022) | 0.67:1 portrait | 672 × 1004 | tall `flowchart TD`, single-column |
| `screenshot-browser-frame` (slide-015/016) | 1.955:1 | 1661 × 849 | horizontal LR process, 7–10 nodes |
| `full-width` (slide-023) | 2.866:1 | 2368 × 826 | very wide LR timeline/pipeline, 8+ stages |

**Do not pick a default direction and apply it to all diagrams.** Shape the source to fill the slot.

### Step 2 — Render diagrams

#### Option A — Parallel batch render (preferred for 2+ diagrams)

Use `scripts/render_diagrams_parallel.sh` for significantly faster rendering. This goes
directly `.mmd → PNG` in parallel (up to 4 concurrent Chromium/Puppeteer instances),
eliminating the SVG intermediate step and the sequential bottleneck:

```bash
# Render all diagrams in a directory (PNG only, 4-parallel):
./scripts/render_diagrams_parallel.sh workflow/appendix-diagrams/ output/diagrams/

# Also produce SVG source artifacts alongside PNG:
./scripts/render_diagrams_parallel.sh workflow/appendix-diagrams/ output/diagrams/ --svg

# Render only diagrams matching a name pattern:
./scripts/render_diagrams_parallel.sh workflow/appendix-diagrams/ --pattern "nbe-*.mmd"

# Reduce parallelism on memory-constrained machines:
./scripts/render_diagrams_parallel.sh workflow/appendix-diagrams/ --jobs 2
```

Performance: 6 diagrams in ~2–3 minutes (vs ~10 minutes sequential).

The script uses mmdc flags `-s 3 -b transparent` and the canonical config files in
`scripts/diagrams/` automatically. Run `./scripts/render_diagrams_parallel.sh --help`
for full option reference.

#### Option B — Single diagram (manual / one-off)

```bash
mmdc -i workflow/appendix-diagrams/<name>.mmd \
     -o output/diagrams/<name>.svg \
     --outputFormat svg \
     --configFile scripts/diagrams/mermaid-config.json \
     --puppeteerConfigFile scripts/diagrams/puppeteer-config.json \
     -w 2400
```

The SVG is the **canonical source artifact**. Keep it alongside the PNG.

### Step 3 — Convert SVG → PNG via Puppeteer (single-diagram path only)

```bash
node scripts/svg_to_png_puppeteer.js \
  output/diagrams/<name>.svg \
  output/diagrams/<name>.png \
  <render_width> <slot_width_px> <slot_height_px>
```

**Slot dimensions come from `PLACEHOLDER_CLASS_PROFILES` in `scripts/build_from_config.py`:**

```python
PLACEHOLDER_CLASS_PROFILES = {
    'screenshot-browser-frame': { 'slot_px': (1661,  849), 'render_width': 2800 },
    'equal':                     { 'slot_px': (1129, 1004), 'render_width': 1800 },
    'wide':                      { 'slot_px': (1684, 1004), 'render_width': 2400 },
    'one-third':                 { 'slot_px': (672,  1004), 'render_width': 1400 },
    'full-width':                { 'slot_px': (2368,  826), 'render_width': 3200 },
}
```

When slot dimensions are passed to `svg_to_png_puppeteer.js`:
- The output PNG is exactly `slot_width × slot_height` pixels.
- The SVG is scaled (contain) and centered with 20px padding.
- This prevents wide/flat diagrams from producing a thin sliver in portrait/square slots.

When slot dimensions are **not** passed (natural mode):
- The output is scaled to `output_width` preserving the SVG's natural aspect ratio.
- Used for icon conversion and other non-slot rasterizations.

### Step 4 — Reference in config JSON

In the deck's config JSON, reference the `.mmd` source file directly:

```json
{
  "bank_file": "slide-017-picture-left-equal.pptx",
  "title": "Composable Token Model",
  "body": "...",
  "image_path": "workflow/appendix-diagrams/dalp-composable-token-model.mmd"
}
```

`build_from_config.py` detects `.mmd` sources, runs the full render pipeline internally,
then embeds the resulting PNG into the PPTX slot.

Optionally specify the target class explicitly:
```json
  "diagram_target_class": "equal"
```

If `diagram_target_class` is set, it must match the actual placeholder class of the selected
slide or the build fails.

### Step 5 — What `build_from_config.py` does end-to-end

1. Reads config JSON
2. For each slide, copies the matching `.pptx` from `slide-bank/`
3. Injects text into discovered placeholders
4. For slides with `image_path`:
   a. Detects asset kind (diagram source vs PNG vs JPG vs screenshot)
   b. For `.mmd` sources: resolves the placeholder class from slot geometry, selects
      the best matching `.mmd` variant (e.g. `<name>--wide.mmd`), calls `DiagramEngine`
      which runs mmdc + `svg_to_png_puppeteer.js` with correct slot dimensions
   c. For already-rendered `.png`: embeds directly
5. Validates image-slot policy (DALP screenshots only on browser-frame slots, etc.)
6. Guards against main-deck Mermaid use (fails closed if Mermaid appears before Thank You)
7. Validates appendix has 4–10 diagrams
8. Merges all slide XML back into the master template container (not a full package merge)
9. Post-processes agenda icons
10. Runs fit validation → writes `<deck>-fit-report.json`

## Frozen repo facts

- master template: `templates/Master Template 2026.pptx`
- canonical builder: `scripts/build_from_config.py`
- current slide-bank size: `22`
- current slide-bank registry version: `2`
- registry timestamp: `2026-03-19T20:12:26Z`

## Slide bank scope

The current registry covers these slide IDs:
- 001 cover
- 002 agenda
- 003 section separator
- 004 blank
- 005 single column
- 006 table
- 007 table with text
- 008 chart with text
- 010 two column
- 012 three column
- 013 text 2x2
- 014 text 2x3
- 015 screenshot right
- 016 screenshot left
- 017 picture left equal
- 018 picture right equal
- 019 picture left wide
- 020 picture right wide
- 021 picture left one-third
- 022 picture right one-third
- 023 picture full width
- 024 thank you

## Operational invariants

### Mother template
- Never edit the mother template directly as part of normal deck generation.
- Layout changes require a coordinated template + slide-bank + docs update.

### Text rules
- text is injected into discovered placeholders
- title/mini-title rules are enforced before merge
- thank-you slide text is rejected
- agenda rules are enforced before merge: max 7 points, one short phrase per used slot, and empty agenda rows are removed completely
- icon keys stay icon-only; raw `icon-library/...` paths must never surface as agenda text
- fit checks are part of the build path
- textboxes should be well utilized, not left token-empty
- on `slide-007-table-with-text.pptx`, the textbox above the table must be filled when a table is present

### Diagram rules (Puppeteer pipeline — locked 2026-03-20)
- Main slides must not use Mermaid diagrams; they belong in an appendix after the Thank You slide
- Appendix Mermaid count: 4–10 diagrams
- Each diagram must be authored new for the current presentation; never reuse cached renders from prior decks
- **Author** the Mermaid source as a `.mmd` file; choose diagram direction/depth to match the target slot's aspect ratio (see slot table above)
- **Render PNG** via `scripts/render_diagrams_parallel.sh` (preferred for 2+ diagrams; parallel, direct `.mmd → PNG`)
  - Flags used: `-s 3` (scale 3, ~216 DPI effective), `-b transparent`
  - SVG source artifacts are produced with `--svg` flag; always keep SVG alongside PNG
- **Single-diagram fallback**: render SVG via `mmdc`, then convert SVG → PNG via `scripts/svg_to_png_puppeteer.js`
  - Pass `slot_width` and `slot_height` from `PLACEHOLDER_CLASS_PROFILES` so the PNG is sized exactly to the slot
  - cairosvg, rsvg-convert, and Inkscape are not supported and must not be used
  - Mermaid v10+ labels are `<foreignObject>` HTML; only Puppeteer renders them correctly
- Diagrams land in `output/diagrams/<name>.png` (embedded in PPTX) + optionally `output/diagrams/<name>.svg` (source-of-truth)
- Native SVG embedding is not used; generated decks embed the PNG
- The final deliverable is PPTX only

### Image rules
- slide-bank metadata defines what kind of image each visual slot accepts
- DALP screenshots are routed to browser-frame screenshot layouts
- generic visual layouts accept only the asset kinds allowed by policy
- policy violations fail the build

### Merge strategy
- slides are merged back via slide XML into the master template container
- this preserves template resources and avoids the usual full-package merge corruption issues

## Freeze-check observations from 2026-03-19

Two explicit behaviors were re-confirmed while freezing the setup:

1. A config that puts text on `slide-024-thank-you.pptx` fails with unmapped content keys.  
2. A config that puts a DALP screenshot onto `slide-018-picture-right-equal.pptx` fails because the slot only allows `generic_image` or `diagram`.

Those are not bugs in the documentation. They are part of the current frozen contract.

## What this freeze deliberately rejects

The following references appeared in older docs but do not match the current repo state:
- `scripts/build_from_layout_config.py`
- `scripts/build.sh`
- `scripts/validate_production_build.py`
- older baseline references to missing `setup/` docs

They are not part of the frozen current setup.

## Build command

```bash
python3 scripts/build_from_config.py configs/<deck>.json
```

## If the setup changes later

Do not quietly edit one file and call it done.
A new freeze should update:
- `BASELINE.md`
- `README.md`
- `WORKFLOW.md`
- this file
- any changed slide-bank or template artifacts
