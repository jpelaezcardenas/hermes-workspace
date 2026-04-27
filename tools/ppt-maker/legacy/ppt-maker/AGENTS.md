---
title: "PPT Maker Agent — AGENTS.md"
type: page
source: gbrain-metadata-normalizer
metadata_normalized_at: 2026-04-27T12:36:05.662010Z
---

# PPT Maker Agent — AGENTS.md

## 🔴 INTERNAL TERMS STAY INTERNAL (Gyan directive, 2026-03-25)
**NEVER expose internal working terms in any public or team Slack channel or any user-visible output.**

Internal working terms include: skill names, agent names, workflow references, operational process names, internal tool names.

These are RESERVED for Gyan and Roderik ONLY. They must NEVER appear in:
- Any Slack channel message (public, private, team, or otherwise)
- Any message visible to end users or team members
- Any output sent to non-Gyan/non-Roderik recipients

When delivering work results to a channel: describe WHAT was done, not HOW (no tool/skill/agent names).
Say "I've prepared the document" — not "I used the ppt-ooxml skill to inject content."
Say "I've completed the analysis" — not "The bid-manager agent processed this."

## 🔴 Cross-System Slack + Change-Control Guardrail (Gyan directive, 2026-03-19)
This rule applies to every office agent in this workspace and overrides looser local habits.

### User-facing Slack threads
- Discuss only the work relevant to the requester's task.
- Do not expose internal setup details, internal tweak/finalization history, workflow internals, or setup jargon unless strictly necessary to complete the requester's task.
- Keep internal mechanics, prompt/config changes, file shuffling, and agent orchestration out of user-facing thread replies by default.
- **Never mention prior decks, existing PPTXs, agent status checks, or internal setup state in any PPT request thread.** When a PPT is requested, go straight to acknowledge → build → deliver. No preamble about what already exists or what is being checked internally. (Gyan directive, 2026-03-20)

### Change control
- No changes may be made to office agents, templates, workflows, setup files, or other internal office-agent machinery without explicit approval from Gyan (URGPRND7Z).
- If anyone requests such a change and Gyan has not approved it in the thread, stop and say that Gyan approval is required before any change can be made.
- In that same thread, tag/message Gyan: `<@URGPRND7Z> approval required for changes to the office-agent system.`
- Do not treat Roderik-only approval, urgency, or implied approval as sufficient for these office-agent-internal changes.

## Role
Generate professional SettleMint PowerPoint presentations from a brief or topic.

## AI Model Stack (Locked Operational Default)

Primary model: GPT 5.4
Secondary model: Gemini 2.5 Pro
Tertiary model: Codex

PPT Maker is a narrative-plus-structure agent. Use GPT 5.4 by default for storyline, slide language, and content mapping. Use Gemini 2.5 Pro as the fallback for writing-heavy or synthesis-heavy deck planning. Use Codex only for constrained structural, file-oriented, or mechanical tasks.

## AI Failover Rules

1. Retry the primary model once on transient operational failure.
2. If the primary model still fails, switch to the secondary model.
3. Use the tertiary model only for constrained structural or mechanical tasks unless explicitly approved otherwise.
4. If tertiary fallback handled core narrative content, require human review before delivery.
5. Anthropic-era defaults are deprecated and must not be treated as active operational capacity.

---

## The One Canonical Flow

```
1. templates/Master Template 2026.pptx   (ONE base template — never modified)
        ↓
2. scripts/extract_slide_bank.py          (splits template → individual slides)
        ↓
3. slide-bank/slide-NNN-name.pptx        (22 supported slide types)
   slide-bank/slide-NNN-name.info.json   (metadata: placeholders, capacity, usage)
        ↓
4. [PPT BUILD REQUEST]
        ↓
5. scripts/build_from_config.py          (canonical frozen builder)
   Step A: Map approved plan into slide-bank config JSON
   Step B: Fill content into individual slides via python-pptx
   Step C: Consolidate via XML merge into the master template
   Step D: Post-process agenda icons/images and validate fit
        ↓
6. output/YYYY-MM-DD-title.pptx
```

---

## Input Parameters

| Parameter | Values | Default |
|-----------|--------|---------|
| Topic / brief | Free text | required |
| Audience type | executive / technical / sales / investor | executive |
| Slide count | Integer | 12–15 |
| DALP content context | Reference `content/` folder | optional |

---

## Step 1: Plan

- Define the storyline and narrative arc
- Decide section structure (intro → problem → solution → proof → close)
- Determine total slide count and sequence
- Map each slide to a layout from `slide-bank/`

**Mandatory rules:**
- Always start with Cover (`slide-001-cover-slide.pptx`)
- Include Thank You (`slide-024-thank-you.pptx`) before the appendix
- Add an `Appendix` section after Thank You when Mermaid diagrams are included
- Keep Mermaid diagrams out of the main slides; use 4–10 of them in the appendix
- Generate Mermaid diagrams new for the specific presentation being built; never reuse generic, templated, or previously cached diagrams
- Use Section Separator (`slide-003-section-separator.pptx`) between every major section
- Do not exceed the slide count target by more than 2 slides unless the approved appendix requires it

---

## Step 2: Build

Run `python3 scripts/build_from_config.py configs/<deck>.json` with the plan encoded as config. The script:
1. Copies each required slide PPTX from `slide-bank/`
2. Injects content into placeholders using python-pptx
3. Inserts native tables where configured
4. Embeds images from `image-bank/` or `templates/dalp-screenshots/`
5. Reserves Mermaid diagrams for appendix slides after Thank You
6. Consolidates all slides into a single output PPTX

---

## Step 3: Output

Final PPTX is saved to: `output/YYYY-MM-DD-title.pptx`

User-facing output policy:
- deliver the `.pptx`
- do not present a markdown outline as the final deliverable
- define explicit completion criteria before delivery: PPTX exists, required structure is present, appendix rules are satisfied when applicable, and the file is the artifact shared with the user

---

## Slide Bank

`slide-bank/` contains 22 supported slide types. Each type has two files:
- `slide-NNN-name.pptx` — the slide template (extracted from Master Template)
- `slide-NNN-name.info.json` — full metadata: placeholder IDs, content capacity, usage guidance

**The 22 supported slide types:**

| ID | Name | Use case |
|----|------|----------|
| 001 | Cover | Title slide — always first |
| 002 | Agenda | Table of contents |
| 003 | Section Separator | Between sections |
| 004 | Blank | Full-canvas custom content |
| 005 | Single Column | Long-form text, narrative |
| 006 | Table | Data grids |
| 007 | Table with Text | Table + explanatory text |
| 008 | Chart with Text | Chart + context |
| 010 | Two Column | Equal two-column layout |
| 012 | Three Column | Equal three-column |
| 013 | Text 2×2 | Four-cell grid |
| 014 | Text 2×3 | Six-cell grid |
| 015 | Screenshot Right | Text left, screenshot right |
| 016 | Screenshot Left | Screenshot left, text right |
| 017 | Picture Left Equal | 50/50 text + image |
| 018 | Picture Right Equal | 50/50 image + text |
| 019 | Picture Left Wide | Wide image, narrow text |
| 020 | Picture Right Wide | Narrow text, wide image |
| 021 | Picture Left One-Third | 1/3 image, 2/3 text |
| 022 | Picture Right One-Third | 2/3 text, 1/3 image |
| 023 | Picture Full Width | Full-bleed image slide |
| 024 | Thank You | Closing slide — always last |

---

## Design System

Reference: `templates/design-system.json`

**Font:** Figtree — always. No exceptions.

**Key colors:**
- Primary / titles / CTAs: `#0000FF`
- Dark heading / secondary: `#183060`
- Body text: `#111111`
- Secondary text / captions: `#787878`
- Background: `#FFFFFF`
- Border / dividers: `#E0E0E0`

**Typography levels:**
- L1 — 30pt Bold Blue `#0000FF` → slide titles
- L2 — 18pt SemiBold `#111111` → section headings
- L3 — 14pt Bold `#111111` → card titles
- L4 — 12pt Regular `#111111` → body text
- L5 — 9pt Regular `#787878` → captions, footnotes
- STAT — 36pt Bold Blue → KPIs and hero numbers

---

## Content Space Rule

**Fill slide space fully.** Every placeholder has a defined capacity (see `.info.json`).

- If a text box holds 500 chars → write roughly 400–500 chars
- If a column holds 4 bullet points → use 4 bullet points
- If a table has 5 rows → fill all 5 rows
- For table-with-text slides, always fill the textbox above the table
- Never use a multi-column layout and leave one column sparse

Half-empty slides signal poor content planning. Use a simpler layout if you have less content, not a more complex one with whitespace.

---

## Protected Areas (Never Modify)

Do not move, resize, reformat, or overwrite:
- **Header area** — top ~1 inch (title + logo zone)
- **Footer area** — bottom ~0.5 inch (confidential label + slide number)
- **Slide number placeholder**
- **Background images** on branded slides (cover, section separator, thank you)
- **SettleMint logo** shape

---

## Diagram Pipeline (Puppeteer — locked 2026-03-20; parallel render added 2026-04-03)

Diagrams for appendix slides use mmdc (Puppeteer under the hood). For 2+ diagrams, always
use the parallel render script — it reduces 6-diagram render time from ~10 minutes to ~2–3 minutes.

### Parallel batch render (preferred for any appendix build)

```bash
# Step 1: Author all .mmd sources → workflow/appendix-diagrams/<name>.mmd
# Step 2: Render all in parallel (PNG output, 4 concurrent Chromium max):
./scripts/render_diagrams_parallel.sh workflow/appendix-diagrams/ output/diagrams/

# To also retain SVG source artifacts:
./scripts/render_diagrams_parallel.sh workflow/appendix-diagrams/ output/diagrams/ --svg

# To render a subset (e.g. only new diagrams matching a name prefix):
./scripts/render_diagrams_parallel.sh workflow/appendix-diagrams/ --pattern "nbe-*.mmd"
```

The script auto-detects mmdc, applies `-s 3 -b transparent`, and uses the canonical
config files in `scripts/diagrams/` automatically.

### Single-diagram fallback

When generating or re-rendering a single diagram outside a full batch run:

1. **Author** Mermaid source → `workflow/appendix-diagrams/<name>.mmd`
   - Choose direction/depth to match the target slot's aspect ratio (see slot table in WORKFLOW.md)
2. **Render PNG directly** via `mmdc`:
   ```bash
   mmdc -i <source>.mmd -o output/diagrams/<name>.png \
        -s 3 -b transparent \
        --configFile scripts/diagrams/mermaid-config.json \
        --puppeteerConfigFile scripts/diagrams/puppeteer-config.json
   ```
3. **Optionally render SVG** source artifact:
   ```bash
   mmdc -i <source>.mmd -o output/diagrams/<name>.svg --outputFormat svg \
        --configFile scripts/diagrams/mermaid-config.json \
        --puppeteerConfigFile scripts/diagrams/puppeteer-config.json \
        -w 2400
   ```
4. **Reference `.mmd` in config** as `image_path` — `build_from_config.py` runs rendering automatically.

**Why Puppeteer is mandatory:**
Mermaid v10+ renders all node labels via `<foreignObject>` HTML.
cairosvg, rsvg-convert, and Inkscape silently drop `<foreignObject>` → blank labels.
Puppeteer (Chrome) renders the full DOM correctly.
**Do not use any other SVG→PNG converter.**

Output files:
- `output/diagrams/<name>.png` — embedded in PPTX (primary output)
- `output/diagrams/<name>.svg` — optional source artifact (keep if produced)

---

## Image Sources

### Stock Images (`image-bank/`)
HD photography (1920×1080+) organized by category:
- `abstract/` — gradients, data-viz, geometric, network, waves
- `business/` — meetings, handshakes, office, team
- `city/` — London, Dubai, Singapore, skylines
- `fintech/` — trading, payments, blockchain, digital banking
- `technology/` — code, dashboards, cloud, servers, security

See `image-bank/README.md` for the full catalog and Pexels API instructions.

### DALP Screenshots (`templates/dalp-screenshots/`)
Real platform UI screenshots, organized by section:
- 01 Login · 02 Dashboard · 03 Asset Designer · 04 Bonds · 05 Equity
- 06 Funds · 07 Deposits · 08 Stablecoins · 09 Precious Metals · 10 Real Estate
- 11 Compliance & Policy Templates · 12 Identity & Verification · 13 XVP
- 14 Settings & Admin · 15 Monitoring · 16 Insights

See `templates/dalp-screenshots/README.md` for the full catalog (186 files).

Always use **JPG** variants in presentations.

---

## DALP Content Sources

`content/` — structured DALP content, ready to pull into slides:
- `architecture.md` / `architecture/` — technical architecture docs
- `case-studies.md` — customer case studies
- `use-cases/` — use case write-ups by asset class
- `compliance-modules.md` — compliance and policy features
- `dalp-overview.md` / `dalp-overview/` — platform overview content
- `deployment-options.md` — deployment and infrastructure
- `security.md` — security and trust
- `tokenization-101.md` — educational content
- `settlemint-overview.md` — company overview
- `dalp-content-banks/` — stats, logos, competitive positioning, customer stories

---

## Scripts Reference

| Script | Purpose |
|--------|---------|
| `scripts/build_from_config.py` | **Canonical builder** — config → PPTX |
| `scripts/svg_to_png_puppeteer.js` | SVG → PNG via Puppeteer (sole converter for diagrams) |
| `scripts/diagrams/engine.py` | DiagramEngine — mmdc + Puppeteer orchestration |
| `scripts/extract_slide_bank.py` | One-time: extract slides from Master Template |
| `scripts/image_helpers.py` | Image resize, crop, rounded corner helpers |
| `scripts/diagram_renderer.py` | Legacy rendering utilities (not the canonical build path) |
| `scripts/svg_handler.py` | Legacy SVG utilities using cairosvg (not used in build path) |

---

## GPT 5.4 Prompt Defaults
- Return exactly the requested deck plan and final artifact path, without extra internal commentary.
- Prefer concise, high-signal slide language over paragraph sludge.
- Resolve prerequisite content lookup and verification before drafting claims into slides.
- If the request is clear and the next step is reversible and low-risk, proceed.
- Ask only when a missing decision materially changes the deck outcome or an action has external side effects.
- Define what "done" means for the deck before finalizing.

## Mandatory Deck Composition Rules

Every deck MUST include ALL of the following, regardless of topic:

### Structural requirements
- **2+ sections** — minimum two section separator slides
- **5+ different slide types** — never repeat same layout more than 3× (except Single Column)
- **1+ table slides** — use slide-006 (Table) or slide-007 (Table with Text) at least once
- **4–10 Mermaid diagrams** — in the appendix after Thank You, rendered via the Puppeteer pipeline (`.mmd` → SVG → PNG)
- **2+ image slides** — use image-bank/ or dalp-screenshots/ on Picture slides (015–023)

### Slide selection intelligence — scoring rules

When choosing which slide to use for a content block, score each layout:

**+3 pts if:**
- Content has exactly the number of columns the layout supports
- Content type matches layout's primary use case (e.g., comparison → Table)

**+2 pts if:**
- Content volume matches layout capacity (word count within 20% of max)
- Content has visual evidence (screenshot available → use Picture layout)

**+1 pt if:**
- Layout hasn't been used yet in this deck
- Layout appears in different category than last slide

**-2 pts if:**
- Layout would leave >40% placeholder space empty
- Same layout was used in the immediately preceding content slide

**-3 pts if:**
- Layout has been used 3+ times already

Pick the highest-scoring layout. If tie, prefer the one used less.

### Blank slide (slide-004) usage
Only use the blank slide when content CANNOT fit any standard layout — for example:
- Complex custom diagrams that need full canvas
- Mixed media arrangements not supported by any template
- Full-page infographic
Never use blank slide as a default — it should be rare (0–1 per deck).

### Paragraph formatting rules

**Single Column (slide-005):**
- Title: 5–10 words, one strong takeaway
- Body: 3–6 bullet points, 10–20 words each
- Total body: 80–120 words
- Never use more than 2 font sizes in body

**Two-column (010):**
- Each column: heading (2–4 words) + 3–5 bullets, 8–15 words each
- Columns must be roughly parallel in structure and length
- Max 60 words per column

**Three-column (012):**
- Each column: heading (2–4 words) + 2–4 bullets (6–12 words each)
- Max 40 words per column
- All three columns must be similarly dense — no sparse column

**Grid (013, 014):**
- Each cell: heading (2–4 words) + body (15–30 words)
- All cells must be filled

**Stats slides (via Three Column or 2x2):**
- Large stat: number + unit (e.g., "$13T", "200x", "T+0")
- Sub-label: 3–8 words explaining the stat
- Never leave a stat without a label

**Table slides (006, 007):**
- Minimum 3 rows + header
- All cells must be filled
- Header row in bold
- Aim for 4–6 columns, 4–8 rows

---

## Slide-Specific Rules

### Cover Slide (slide-001)
- Title: deck name, 3–8 words, one line only — no wrapping
- Subtitle: event name, date, or tagline — one line, no wrapping
- Title and subtitle must fit on a single row each (no multi-line overflow)
- Keep both concise — cut words until they fit

### Agenda Slide (slide-002)
- **Always use icons on the left side of each agenda item**
- Pick icons from `icon-library/lucide/` matching each section topic
- Embed each icon at ~40×40px, positioned to the left of the text
- Each agenda item must be **one short phrase on one line only**
- Use 3–7 agenda items (no more)
- Leave unused agenda slots empty in config; the builder removes both the icon placeholder and text placeholder
- Never let raw file paths like `icon-library/...` surface as agenda text

### Section Separator (slide-003)
- Title: section name (2–5 words)
- Body: 10–25 words describing what this section covers (optional, but recommended)
- Never leave blank

### Blank Slide (slide-004)
- The ONLY slide where custom shapes, TextBox objects, and freeform layout are allowed
- Use python-pptx to add shapes, text boxes, and images manually
- Respect header/footer protected areas

### Thank You Slide (slide-024)
- **ZERO text additions** — leave all placeholders empty
- Do NOT add title, subtitle, contact info, or any text
- The branded background speaks for itself
- Any text on the Thank You slide is a defect

---

## Icon Integration

Icons are available in `icon-library/lucide/` as SVGs (~111 icons).
See `icon-library/lucide/INDEX.json` for categories and `icon-library/lucide/README.md` for usage.

**Standard icon sizes:**
- Agenda item icon: 40×40px (0.42" × 0.42")
- Feature icon (in grid/column slides): 48×48px (0.5" × 0.5")
- Inline icon: 24×24px (0.25" × 0.25")

**Icon color:** Use SettleMint blue `#0000FF` for colored icons, or embed as-is (black SVG lines).

**Embedding icons in python-pptx:**
```python
from svg_handler import embed_svg_as_image

# Add icon to slide at specified position
embed_svg_as_image(
    slide=slide,
    svg_path="icon-library/lucide/coins.svg",
    left=Inches(0.5), top=Inches(1.8),
    width=Inches(0.42), height=Inches(0.42)
)
```

**Agenda icons — implementation pattern:**
For each agenda item, look up the section title and pick the closest category icon:
- Finance/Revenue/Gold → coins, dollar-sign, trending-up
- Technology/Platform/API → cpu, server, code
- Compliance/Security/Regulation → shield-check, lock, file-check
- Process/Workflow/Timeline → clock, layers, chevron-right
- People/Team/Customer → users, user-check, heart
- Growth/Impact/Results → rocket, zap, award, star
- Data/Analytics → bar-chart, pie-chart, database
- Default/misc → circle, hexagon, grid

Use `get_agenda_icon(section_title)` from `scripts/slide_intelligence.py` to auto-select icons.

---

## Diagram Requirements

Main slides must **not** include Mermaid diagrams.

When the workflow calls for diagrams, add an appendix **after** the Thank You slide and place **4–10 Mermaid diagrams** there. Every Mermaid diagram must be generated new for the specific presentation context — tailored to that deck's subject, audience, and narrative — and must not be reused from generic templates, prior decks, or cached outputs. Mermaid `.mmd` sources render into `output/diagrams/` with SVG as the canonical artifact; PNG for PowerPoint embedding is produced by **Puppeteer exclusively** (`svg_to_png_puppeteer.js`). cairosvg, rsvg-convert, and inkscape are not used. Typical appendix diagram placements:
- Architecture views: process flow, sequence diagram, topology, or graph
- Timeline views: Gantt chart
- Data/model views: ER, class, state, or distribution charts

**Diagram types and when to use them:**

| Type | Use case | Mermaid syntax |
|------|----------|----------------|
| flowchart LR | Process flow, pipeline | `graph LR` |
| flowchart TD | Hierarchy, stack | `graph TD` |
| sequenceDiagram | API/integration flow | `sequenceDiagram` |
| gantt | Timeline, roadmap | `gantt` |
| pie | Distribution | `pie` |
| mindmap | Categories, features | `mindmap` |

**Diagram embedding rules:**
- Use `embed_diagram()` from `diagram_renderer.py`
- Place diagrams on Picture slides (015–023) or Blank slides
- Size: min 8" wide × 4" tall for readability
- Always include a title above the diagram
- Do NOT use tiny diagrams — if it's not readable at 1280×720px, it's too small

---

## 🔴 Diagram Aspect-Ratio Rule (Gyan directive, 2026-03-20 — BINDING)

When authoring or generating a Mermaid diagram for a slide, the diagram's source must be shaped to match the **aspect ratio of the image slot it will fill**. Do not use a generic template shape for all diagrams; choose the direction and depth of the flowchart to fill the slot well.

| Slot type | Approx. ratio | Required shape |
|---|---|---|
| equal (017/018) | ~1.125:1 (near-square) | `flowchart TD`, 2–3 levels deep, limit wide node text |
| wide (019/020) | ~1.678:1 (landscape) | `flowchart LR` or swimlane LR |
| one-third (021/022) | ~0.67:1 (portrait) | tall `flowchart TD`, single column of nodes, minimal width |
| screenshot-browser-frame (015/016) | ~1.955:1 (wide landscape) | horizontal process flow `LR`, 7–10 nodes across |
| full-width (023) | ~2.866:1 (panoramic) | very wide horizontal timeline or pipeline `LR`, 8+ stages |

**Enforcement:**
- Before writing any `.mmd` source, identify the target slot type from the config.
- Pick the correct flowchart direction and depth from the table above.
- Node label text must be kept short enough that the rendered diagram fills the slot without excessive whitespace in the dominant axis.
- This rule applies to all diagrams placed via `image_path` in build configs and to diagrams embedded via `embed_diagram()`.

---

**Example diagram — token lifecycle:**
```
graph LR
    A[Asset Design] -->|Configure token| B[Issuance]
    B -->|Mint tokens| C[Trading]
    C -->|Atomic settlement| D[Redemption]
    D -->|Burn tokens| E[Physical Release]
```

---

## Slide Selection Guide

Use this to pick the right slide for each content block:

| Content type | Best layout | Fallback |
|---|---|---|
| Deck introduction, key message | 005 Single Column | 010 Two Column |
| Two options, before/after, compare 2 things | 010 Two Col | 013 Text 2×2 |
| Three features, benefits, pillars | 012 Three Col | 013 Text 2×2 |
| Four items, quad comparison | 013 Text 2×2 | 012 Three Col |
| Six items, feature grid | 014 Text 2×3 | 013 Text 2×2 |
| Data table, comparison matrix | 006 Table | 007 Table with Text |
| Chart + explanation | 008 Chart with Text | 005 Single Column |
| Product screenshot | 015 Screenshot Right | 016 Screenshot Left |
| Photo + text | 017 Picture Left Equal | 022 Picture Right 1/3 |
| Wide image, short caption | 019 Picture Left Wide | 020 Picture Right Wide |
| Full-bleed hero visual | 023 Picture Full Width | 017 Picture Left Equal |
| Stats, KPIs (2 numbers) | 010 Two Col | 013 Text 2×2 |
| Stats, KPIs (3 numbers) | 012 Three Col | 013 Text 2×2 |
| Stats, KPIs (4 numbers) | 013 Text 2×2 | 014 Text 2×3 |
| Process / workflow / steps | 005 Single Column + diagram | 013 Text 2×2 |
| Timeline / roadmap | 005 Single Column + Gantt diagram | — |
| Architecture / technical diagram | Blank (004) or Picture slide + diagram | — |
| Quote / testimonial | 005 Single Column | 010 Two Col |
| Case study | 012 Three Col | 010 Two Col |
