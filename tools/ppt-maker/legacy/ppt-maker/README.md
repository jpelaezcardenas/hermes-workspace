---
title: "PPT Maker"
type: index
source: gbrain-metadata-normalizer
metadata_normalized_at: 2026-04-27T12:36:05.663419Z
---

# PPT Maker

> **🔴 INTERNAL TERMS STAY INTERNAL (Gyan directive, 2026-03-25):** Never expose skill names, agent names, workflow references, or any internal tool/process names in Slack channels or any user-visible output. Describe WHAT was done, not HOW.

Generates SettleMint PowerPoint decks from the frozen mother template and the current 22-layout slide bank.

## 🔴 NO EMOJI IN OUTPUT DOCUMENTS (Gyan directive, 2026-04-03)
Emoji characters are COMPLETELY FORBIDDEN in any client-facing output (DOCX, PPTX, PDF, HTML pages).
This includes: confidence dots (🟢🟡🔴⚪), status indicators (✅❌⚠️⛔), and any other emoji.
Replace with text equivalents: "Fully Supported" / "Partially Supported" / "Gap" / "N/A".
Internal skeleton instructions may reference emoji for readability, but output MUST strip them.

## Frozen current setup

- Mother template: `templates/Master Template 2026.pptx`
- Slide bank contract: `slide-bank/REGISTRY.json`
- Canonical builder: `scripts/build_from_config.py`
- Frozen baseline note: `BASELINE.md`
- Detailed workflow: `WORKFLOW.md`
- Full operational doc: `workflow/COMPLETE_WORKFLOW.md`
- Typography system: `setup/typography-system.md`

## Actual build flow

```text
Master Template 2026.pptx
  -> scripts/extract_slide_bank.py
  -> slide-bank/*.pptx + *.info.json + REGISTRY.json
  -> scripts/build_from_config.py <config.json>
  -> output/<deck>.pptx
```

## What the current builder enforces

- XML-only slide merge back into the master template
- unique temp copy per slide use
- placeholder-aware text mapping
- fit validation and fit-report output
- image-slot policy enforcement from slide-bank metadata
- fail-closed thank-you slide: no text allowed on `slide-024-thank-you.pptx`
- agenda discipline on `slide-002-agenda.pptx`: max 7 points, one short phrase per slot, and empty slots are removed entirely (icon + text placeholder)
- icon keys are processed as icons only; raw paths like `icon-library/...` must never surface as agenda text
- table-with-text discipline: if `slide-007-table-with-text.pptx` has a table, the textbox above it must be filled
- Mermaid workflow guardrail: Mermaid diagrams are reserved for appendix slides after the Thank You slide

## Frozen output and appendix policy

- Main slides must not use Mermaid diagrams.
- After the Thank You slide, add an `Appendix` section and place **4–10** subject-appropriate Mermaid diagrams there.
- Every Mermaid diagram must be generated new for that specific presentation context. Do **not** reuse generic templates, previously rendered diagrams, or cached appendix diagrams from earlier decks.
- **All appendix diagram slides must include a text explanation below the diagram.** No diagram-only slides in the appendix. Use the `body` field (or `description` as an alias) to provide context for what the diagram shows. The builder validates this and will reject appendix diagram slides without text.
- Diagram sources may now be Mermaid (`.mmd`, `.mermaid`) or PlantUML/UML (`.puml`, `.plantuml`, `.uml`).
- All diagram sources render into `output/diagrams/` as high-quality PNG for PowerPoint embedding. SVG is retained as an optional source artifact (pass `--svg` to the parallel render script).
- In the current builder/runtime, native SVG embedding is **not** relied on for PPT generation. `python-pptx` does not import SVG reliably here, so slide embedding uses the generated PNG.
- Mermaid PNG output uses mmdc scale 3 (~216 DPI effective) with transparent background. PlantUML/UML PNG output uses PlantUML at 300 DPI.
- Appendix Mermaid diagrams target five canonical placeholder classes: `screenshot-browser-frame`, `equal`, `wide`, `one-third`, `full-width`.
- The builder derives the target class from the selected slide-bank placeholder, prefers matching sibling source variants such as `diagram--wide.mmd`, and fails closed if optional `diagram_target_class` disagrees with the chosen slide's placeholder class.
- Final user-facing deliverable is **PPTX only**. Do not treat a markdown outline as the final output.

## Parallel Mermaid rendering pipeline

The builder pre-renders all Mermaid diagrams in parallel before slide assembly, using Python's `concurrent.futures.ThreadPoolExecutor`. This replaces the older shell-based parallel script and runs cross-platform without environment variable issues on macOS.

### How it works

1. **Collection phase** — `_collect_mermaid_sources_from_config()` scans all slides in the config for `.mmd` / `.mermaid` image paths and resolves their target placeholder class (e.g. `wide`, `full-width`, `equal`).
2. **Parallel render phase** — `_prerender_diagrams_parallel()` spawns up to **4 concurrent workers** (configurable via `max_workers`). Each worker creates its own `DiagramEngine` instance and runs an independent `mmdc` process, so rendering is fully thread-safe.
3. **Cache lookup** — Rendered results are stored in `_PARALLEL_RENDER_CACHE` (a module-level dict keyed by variant name). During slide assembly, `_render_diagram_source()` checks this cache first and only falls back to sequential rendering if the cache misses.
4. **Graceful fallback** — If parallel rendering fails entirely (e.g. mmdc not installed), the builder falls back to sequential per-slide rendering. Partial failures are also tolerated: only the failed diagrams render sequentially.

### Performance

- 6 diagrams: ~2–3 minutes (parallel) vs ~10 minutes (sequential)
- Console output shows timing: `Diagram pre-rendering: 2.1s (6 diagrams)`

### Shell script (legacy alternative)

The `scripts/render_diagrams_parallel.sh` shell script is still available for standalone batch rendering but is no longer used by the main build pipeline:

```bash
# Render all diagrams in the appendix-diagrams directory:
./scripts/render_diagrams_parallel.sh workflow/appendix-diagrams/ output/diagrams/

# Also retain SVG source artifacts alongside PNG:
./scripts/render_diagrams_parallel.sh workflow/appendix-diagrams/ output/diagrams/ --svg
```

## What is no longer true

Some older docs mentioned `build.sh`, `validate_production_build.py`, and `build_from_layout_config.py`. Those are **not** the current repo state and should not be treated as canonical.

## Usage

```bash
python3 scripts/build_from_config.py configs/<deck>.json
```

Use only configs that respect the current slide-bank contract and image policies.

## Blank Slide Recipes (Enhanced Canvas)

The blank slide (`slide-004-blank.pptx`) now supports rich layouts via a two-pass pipeline:

```text
Pass 1: build_from_config.py (frozen, placeholder-based)
Pass 2: inject_shapes.py (new, officecli batch shapes for recipe slides)
```

### Available Recipes

| Recipe | Description | Required Fields |
|--------|-------------|-----------------|
| `architecture-stack` | 4-5 horizontal layers stacked vertically | `layer1_title`, `layer1_body`, ... up to `layer5_*` |
| `process-flow` | 3-5 step boxes with arrow connectors | `step1_number`, `step1_title`, `step1_body`, ... up to `step5_*` |
| `stat-callouts` | 2-4 large numbers with descriptions | `stat1_number`, `stat1_label`, `stat1_body`, ... up to `stat4_*` |
| `comparison-columns` | 2 side-by-side columns with headers | `left_title`, `left_body`, `right_title`, `right_body` |
| `timeline-horizontal` | 4-5 milestones on a horizontal line | `milestone1_date`, `milestone1_title`, `milestone1_body`, ... |
| `icon-text-grid` | 2x2 or 2x3 grid of titled text blocks | `item1_title`, `item1_body`, ... up to `item6_*` |

### Config Format

Add `"recipe": "<name>"` to any `slide-004-blank.pptx` entry:

```json
{
  "bank_file": "slide-004-blank.pptx",
  "title": "DALP Architecture",
  "recipe": "architecture-stack",
  "layer1_title": "Operations & UI",
  "layer1_body": "Asset Designer, Compliance Dashboard, Monitoring Console",
  "layer2_title": "Platform Services",
  "layer2_body": "Token Lifecycle Engine, Compliance Rule Engine, OnchainID"
}
```

### Build Command (Two-Pass)

```bash
python3 scripts/build_from_config.py configs/my-deck.json
python3 scripts/inject_shapes.py output/my-deck.pptx configs/my-deck.json
```

### Files

- `blank-recipes/RECIPES.json`: Recipe definitions (layout coordinates, colors, fonts)
- `scripts/inject_shapes.py`: Post-processor (uses officecli batch mode)
- `configs/test-blank-recipes.json`: Test config with all 6 recipes

### Notes

- Recipes use brand theme colors (dk2=0000FF, accent1=000099, accent5=037352, etc.)
- All shapes use Figtree font
- inject_shapes.py uses officecli batch mode for performance (100 shapes in one call)
- Blank slides without a `recipe` field still get the original body textbox behavior
- Requires `officecli` v1.0.23+ installed
- Requires Python 3.10+ (for build_from_config.py); use `/opt/homebrew/bin/python3.13` on this host

## DALP Composability Content Reference

> Canonical source: `../../product/dalp/composability.md` and `../shared/content/composability.md` (relative from ppt-maker/)

When building slides about DALP token capabilities, compliance, or architecture, use these verified facts.

### Core Concept

One contract type (DALPAsset) represents any financial instrument. Token features and compliance modules are runtime-pluggable building blocks, not compiled-in at deployment. Reconfiguration happens without redeployment.

### Token Features (11)

Fees and Charges (4): Transaction Fee, Transaction Fee Accounting, External Transaction Fee, AUM Fee. Governance and Snapshots (3): Historical Balances, Voting Power, Permit. Lifecycle and Yield (2): Maturity Redemption, Fixed Treasury Yield. Transformation (2): Conversion, Conversion Minter.

### Compliance Modules (12)

Geographic Restrictions (2): Country Allow List, Country Block List. Identity Access Control (3): Identity Allow List, Identity Block List, Address Block List. Claim-Based Verification (1): SMART Identity Verification (RPN expressions). Supply and Investor Limits (3): Token Supply Limit, Investor Count, Capped. Time-Based Rules (1): Time Lock. Transfer Controls (2): Transfer Approval, Collateral.

### 7 Regulatory Templates

MiCA EU Standard, Reg D 506(b), Reg D 506(c), MAS Singapore, UK FCA Securities, Japan FSA Crypto, Reg CF Crowdfunding.

### 7 Asset Presets (Starting Points, Not Limits)

Bond, Equity, Fund, StableCoin, Deposit, Real Estate, Precious Metal. Any free-form asset type can be created.

### Slide-Friendly Key Messages

- "One contract, any instrument"
- "Features are building blocks, not fixed packages"
- "Evolve without redeploying"
- "Compliance as code"
- "Starting points, not limits"
- Three-layer architecture: DALPAsset > Token Features (up to 32) > Compliance Modules

## Slack Delivery Rules

When delivering results to Slack, always use explicit `message action=send` with the original request's `topic_id` as `threadId`. Never use the implicit assistant reply path for channel deliveries. Before sending: 1) Verify you have a `threadId`, 2) Confirm it is the ORIGINAL request `threadId`, 3) Use explicit `message action=send`.
