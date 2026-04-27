---
title: "Unified Slide Catalog — PPT Maker System"
type: page
source: gbrain-metadata-normalizer
metadata_normalized_at: 2026-04-27T12:36:05.701166Z
---

# Unified Slide Catalog — PPT Maker System

> **Version:** 2.0 | **Updated:** 2026-04-03
> **Template:** Master Template 2026.pptx (13.333" × 7.500", 16:9)
> **Font:** Figtree | **Footer:** "SettleMint Confidential" + slide numbers
>
> Two slide pools: **22 slide-bank templates** (pre-built PPTX) + **110 blank recipes** (programmatic shapes on slide-004-blank)

---

## Table of Contents

1. [How to Use This Catalog](#how-to-use-this-catalog)
2. [Slide Bank Templates (22 slides)](#slide-bank-templates)
3. [Blank Recipes (110 recipes)](#blank-recipes)
4. [Selection Matrix — By Use Case](#selection-matrix)
5. [Design System Quick Reference](#design-system-quick-reference)
6. [Config Format Reference](#config-format-reference)

---

## How to Use This Catalog

### Decision Rule

| Question | Answer |
|----------|--------|
| Does a slide-bank template fit? | Use the template (faster, pixel-perfect from master) |
| Need a visual pattern no template provides? | Use a blank recipe (slide-004-blank.pptx + `recipe` field) |
| Need a DALP screenshot? | Use slide-015 or slide-016 (browser-frame slots) |
| Need stock imagery / diagrams? | Use slide-017 through slide-023 (generic image slots) |

### Config Examples

**Template slide:**
```json
{ "bank_file": "slide-005-single-column.pptx", "title": "Platform Overview", "body": "DALP provides..." }
```

**Recipe slide:**
```json
{ "bank_file": "slide-004-blank.pptx", "title": "Architecture", "recipe": "architecture-stack", "layer1_title": "Infrastructure", "layer1_body": "Kubernetes, HSM, observability stack" }
```

---

## Slide Bank Templates

### Category: Opening (Slides 001–002)

---

#### `slide-001-cover-slide` — Cover Slide

| Property | Value |
|----------|-------|
| **Category** | Opening |
| **Layout** | Branded background (Cover.png) with large title and subtitle area |
| **Content Capacity** | Light |
| **Placeholders** | `title` (TITLE idx 0), `subtitle` (BODY idx 11) |
| **Content Guidelines** | Title: 3–8 words. Subtitle: date, event name, or presenter (5–20 words) |
| **Do Not Modify** | Background image, logo, footer |
| **Best Use Cases** | Always the first slide of every deck. Can also serve as re-opening after a major break |
| **Compatibility** | All deck types: executive, sales, investor, technical, product overview |
| **Example** | Title: "DALP for Central Banks" / Subtitle: "Digital Asset Infrastructure — Q2 2026" |

---

#### `slide-002-agenda` — Agenda / TOC

| Property | Value |
|----------|-------|
| **Category** | Opening |
| **Layout** | Title + 7 agenda item slots (BODY idx 11–17) + 7 icon slots (CLIPART idx 18–24) |
| **Content Capacity** | Medium |
| **Placeholders** | `title`, `item_0` through `item_6`, `icon1` through `icon7` (optional icon paths) |
| **Content Guidelines** | Max 7 agenda points. Each point: one short phrase on one line. Empty points auto-removed with their icons |
| **Do Not Modify** | Footer, slide number |
| **Best Use Cases** | After cover slide to preview deck structure. Can reappear as "where we are" recap |
| **Compatibility** | Executive, sales, product overview |
| **Example** | Title: "Agenda" / Items: "Company Overview", "DALP Platform", "Use Cases", "Architecture", "Next Steps" |
| **Design Notes** | Icon keys are file paths, not text. Never let raw paths appear as agenda copy |

---

### Category: Structure (Slides 003–004)

---

#### `slide-003-section-separator` — Section Divider

| Property | Value |
|----------|-------|
| **Category** | Structure |
| **Layout** | Branded background (Section.png) with title and optional body |
| **Content Capacity** | Light |
| **Placeholders** | `title` (TITLE idx 0), `subtitle` (BODY idx 11) |
| **Content Guidelines** | Title: 3–5 words (section name). Body: optional, max 25 words |
| **Do Not Modify** | Background image, logo, footer |
| **Best Use Cases** | Between major sections (e.g., before "Problem", "Solution", "Pricing"). Chapter divider in long decks |
| **Compatibility** | All deck types |
| **Example** | Title: "Platform Architecture" / Subtitle: "How DALP handles the complete lifecycle" |

---

#### `slide-004-blank` — Blank / Recipe Canvas

| Property | Value |
|----------|-------|
| **Category** | Structure / Canvas |
| **Layout** | Title + footer only. The canvas for all blank recipes |
| **Content Capacity** | Medium (depends on recipe) |
| **Placeholders** | `title` (TITLE idx 0) + programmatic shapes via `recipe` field |
| **Content Guidelines** | When used without recipe: title only, good for full-bleed content. When used with recipe: follow recipe-specific limits |
| **Do Not Modify** | Footer, slide number |
| **Best Use Cases** | Host for all 110 blank recipes. Also works standalone for custom layouts or single-image placements |
| **Compatibility** | All deck types |
| **Config Note** | Add `"recipe": "recipe-name"` to config to activate a recipe pattern |

---

### Category: Content (Slides 005, 010, 012–014)

---

#### `slide-005-single-column` — Single Column

| Property | Value |
|----------|-------|
| **Category** | Content |
| **Layout** | Title + full-width body area |
| **Content Capacity** | Medium |
| **Placeholders** | `title` (TITLE idx 0), `body` (BODY idx 11) |
| **Content Guidelines** | Title: 3–8 words (states the takeaway). Body: 3–6 bullets or 2–3 short paragraphs, max ~80 words |
| **Do Not Modify** | Footer, slide number |
| **Best Use Cases** | Default workhorse slide. Explaining concepts, listing features, presenting narrative |
| **Compatibility** | All deck types |
| **Example** | Title: "Key Platform Capabilities" / Body: bullet list of 5 capabilities |

---

#### `slide-010-two-column` — Two Column

| Property | Value |
|----------|-------|
| **Category** | Content |
| **Layout** | Title + two equal-width body columns (no column headers) |
| **Content Capacity** | Medium |
| **Placeholders** | `title` (TITLE idx 0), `col1` (BODY idx 11), `col2` (BODY idx 12) |
| **Content Guidelines** | Title: 3–8 words. Each column: 3–5 bullets, max 50 words. Columns should be parallel in structure |
| **Do Not Modify** | Footer, slide number |
| **Best Use Cases** | Two parallel topics, split narratives, dual content blocks |
| **Compatibility** | Product overview, sales |
| **Example** | Title: "Issuance vs Servicing" / Col1: issuance features / Col2: servicing features |

---

#### `slide-012-three-column` — Three Column

| Property | Value |
|----------|-------|
| **Category** | Content |
| **Layout** | Title + three equal-width body columns |
| **Content Capacity** | Medium |
| **Placeholders** | `title` (TITLE idx 0), `col1` (BODY idx 11), `col2` (BODY idx 12), `col3` (BODY idx 13) |
| **Content Guidelines** | Title: 3–8 words. Each column: heading + 2–4 bullets, max 40 words per column |
| **Do Not Modify** | Footer, slide number |
| **Best Use Cases** | Three parallel features, three-pillar strategy, three product highlights |
| **Compatibility** | Product overview, technical deep-dive |
| **Example** | Title: "Three Deployment Models" / Cols: Cloud, Hybrid, Self-hosted |

---

#### `slide-013-text-2x2` — 2×2 Grid

| Property | Value |
|----------|-------|
| **Category** | Content |
| **Layout** | Title + four content quadrants in a 2×2 grid |
| **Content Capacity** | Medium |
| **Placeholders** | `title` (TITLE idx 0), `item1`–`item4` (BODY idx 11, 14, 15, 16) |
| **Content Guidelines** | Title: 3–8 words. Each quadrant: heading + description, max 40 words |
| **Do Not Modify** | Footer, slide number |
| **Best Use Cases** | Four key points, four product features, 2×2 matrix (effort/impact, risk/reward) |
| **Compatibility** | Product overview, executive |
| **Example** | Title: "Four Platform Pillars" / Items: Issuance, Custody, Compliance, Servicing |

---

#### `slide-014-text-2x3` — 2×3 Grid

| Property | Value |
|----------|-------|
| **Category** | Content |
| **Layout** | Title + six content cells in a 2×3 grid |
| **Content Capacity** | Medium |
| **Placeholders** | `title` (TITLE idx 0), `item1`–`item6` (BODY idx 15–20) |
| **Content Guidelines** | Title: 3–8 words. Each cell: heading + description, max 35 words |
| **Do Not Modify** | Footer, slide number |
| **Best Use Cases** | Six features, six integration partners, six compliance standards |
| **Compatibility** | Product overview |
| **Example** | Title: "Supported Asset Types" / Items: Bonds, Deposits, Stablecoins, Equity, Funds, Real Estate |

---

### Category: Data (Slides 006–008)

---

#### `slide-006-table` — Table (Simple)

| Property | Value |
|----------|-------|
| **Category** | Data |
| **Layout** | Title + subtitle + full-width table placeholder |
| **Content Capacity** | Heavy |
| **Placeholders** | `title`, `body`, `table_data` (TBL idx 12) |
| **Content Guidelines** | Max 6 rows × 5 columns. Cell text max 15 words. Table is the focus |
| **Do Not Modify** | Footer, slide number |
| **Best Use Cases** | Feature matrices, pricing tiers, specification tables |
| **Compatibility** | Technical deep-dive, product overview |

---

#### `slide-007-table-with-text` — Table + Text

| Property | Value |
|----------|-------|
| **Category** | Data |
| **Layout** | Title + body text area + table placeholder |
| **Content Capacity** | Heavy |
| **Placeholders** | `title`, `body`, `table_data` (TBL idx 12) |
| **Content Guidelines** | Body MUST be filled when table_data is present. Use for callouts, caveats, or key insights |
| **Do Not Modify** | Footer, slide number |
| **Best Use Cases** | Tables that need interpretation: vendor comparison, feature-by-tier with notes |
| **Compatibility** | Technical deep-dive, sales |

---

#### `slide-008-chart-with-text` — Chart + Text

| Property | Value |
|----------|-------|
| **Category** | Data |
| **Layout** | Title + body text area + chart placeholder |
| **Content Capacity** | Medium |
| **Placeholders** | `title`, `body`, image of chart (CHART idx 12) |
| **Content Guidelines** | Title states the insight. Body: 2–4 bullets explaining the data (max 50 words). Always lead with the "so what" |
| **Do Not Modify** | Footer, slide number |
| **Best Use Cases** | Market size charts, growth trends, adoption curves |
| **Compatibility** | Executive, investor, sales |
| **Note** | Requires an image of the chart (not a native PowerPoint chart object) |

---

### Category: Image / Visual (Slides 015–023)

**Routing Policy:**
- **Slides 015–016** = browser-frame screenshot slots. DALP screenshots belong here.
- **Slides 017–023** = generic visual placeholders. Use stock images or Mermaid diagrams. DALP screenshots are rejected on these.

---

#### `slide-015-screenshot-right` — Text Left + Screenshot Right

| Property | Value |
|----------|-------|
| **Category** | Visual (browser-frame) |
| **Layout** | Title + text body left + image placeholder right |
| **Placeholders** | `title`, `body` (BODY idx 11), `image_path` (PICTURE idx 12) |
| **Image Policy** | Preferred: DALP screenshots. Allowed: diagrams, generic images. Fit: cover for screenshots, contain for diagrams |
| **Best Use Cases** | Product feature demos, architecture diagrams with explanation |
| **Example** | Title: "Asset Issuance Dashboard" / Body: 3 bullets about issuance / Image: DALP screenshot |

---

#### `slide-016-screenshot-left` — Screenshot Left + Text Right

| Property | Value |
|----------|-------|
| **Category** | Visual (browser-frame) |
| **Layout** | Image placeholder left + title + text body right |
| **Placeholders** | `title`, `body` (BODY idx 11), `image_path` (PICTURE idx 12) |
| **Image Policy** | Same as slide-015. Image leads, text explains |
| **Best Use Cases** | UI-first presentations, visual-led product stories |

---

#### `slide-017-picture-left-equal` — Image Left + Text Right (50/50)

| Property | Value |
|----------|-------|
| **Category** | Visual (generic image) |
| **Layout** | Equal-width image left + text right |
| **Placeholders** | `title`, `body` (BODY idx 12), `image_path` (CLIPART idx 13) |
| **Image Policy** | Stock images or Mermaid diagrams. NOT DALP screenshots |
| **Best Use Cases** | Team introductions, customer stories with photos |

---

#### `slide-018-picture-right-equal` — Text Left + Image Right (50/50)

| Property | Value |
|----------|-------|
| **Category** | Visual (generic image) |
| **Layout** | Text left + equal-width image right |
| **Placeholders** | `title`, `body` (BODY idx 12), `image_path` (CLIPART idx 13) |
| **Image Policy** | Stock images or Mermaid diagrams. NOT DALP screenshots |
| **Best Use Cases** | Customer case study photos, product lifestyle imagery |

---

#### `slide-019-picture-left-wide` — Wide Image Left + Text Right (70/30)

| Property | Value |
|----------|-------|
| **Category** | Visual (generic image) |
| **Layout** | Wide image left (dominant) + narrow text right |
| **Placeholders** | `title`, `body` (BODY idx 12), `image_path` (CLIPART idx 13) |
| **Image Policy** | Stock images or Mermaid diagrams. NOT DALP screenshots |
| **Best Use Cases** | Visual-dominant slides where the image does the talking |

---

#### `slide-020-picture-right-wide` — Text Left + Wide Image Right (30/70)

| Property | Value |
|----------|-------|
| **Category** | Visual (generic image) |
| **Layout** | Narrow text left + wide image right (dominant) |
| **Placeholders** | `title`, `body` (BODY idx 12), `image_path` (CLIPART idx 13) |
| **Best Use Cases** | Product showcase slides, dramatic visual statements |

---

#### `slide-021-picture-left-one-third` — Small Image Left + Text Right (33/67)

| Property | Value |
|----------|-------|
| **Category** | Visual (generic image) |
| **Layout** | Narrow one-third image left (accent) + wide text right |
| **Placeholders** | `title`, `body` (BODY idx 12), `image_path` (CLIPART idx 13) |
| **Best Use Cases** | Partner/integration logos with descriptions, small illustrative images with long narrative |

---

#### `slide-022-picture-right-one-third` — Text Left + Small Image Right (67/33)

| Property | Value |
|----------|-------|
| **Category** | Visual (generic image) |
| **Layout** | Wide text left + narrow one-third image right (accent) |
| **Placeholders** | `title`, `body` (BODY idx 12), `image_path` (CLIPART idx 13) |
| **Best Use Cases** | Narrative-heavy slides with subtle visual reference |

---

#### `slide-023-picture-full-width` — Full-Width Image

| Property | Value |
|----------|-------|
| **Category** | Visual (generic image) |
| **Layout** | Full-bleed image with title and caption overlay |
| **Content Capacity** | Light |
| **Placeholders** | `title`, `body` (BODY idx 12), `image_path` (CLIPART idx 13) |
| **Best Use Cases** | Hero statements, dramatic section openers, full-product screenshots |
| **Design Notes** | No rounded corners (full bleed). Title max 6 words |

---

### Category: Closing (Slide 024)

---

#### `slide-024-thank-you` — Thank You / CTA

| Property | Value |
|----------|-------|
| **Category** | Closing |
| **Layout** | Branded background (ThankYou.png). No editable placeholders |
| **Content Capacity** | Light |
| **Placeholders** | None (no text required) |
| **Do Not Modify** | Background image, logo, footer |
| **Best Use Cases** | Always the last slide. Can also serve as Q&A invitation |
| **Compatibility** | All deck types |

---

### Removed Layouts (Do Not Use)

| ID | Name | Replacement |
|----|------|-------------|
| slide-009 | Two Column with Column Title | Use `slide-010-two-column` |
| slide-011 | Three Column with Title | Use `slide-012-three-column` |

---

## Blank Recipes

All recipes use `slide-004-blank.pptx` as the base slide. Add `"recipe": "recipe-id"` to the config.

### Recipe Categories at a Glance

| Category | Count | Examples |
|----------|-------|---------|
| **comparison** | 14 | comparison-columns, pros-cons, swot-analysis, vs-split, tier-comparison-3 |
| **data-numbers** | 18 | stat-callouts, kpi-row-4, big-number-hero, metric-dashboard, roi-calculator |
| **grid-cards** | 16 | icon-text-grid, feature-cards-4, profile-cards-3, checklist-2col, raci-grid |
| **process** | 14 | process-flow, chevron-flow-4, circular-process-4, decision-tree-2, swimlane-2 |
| **structure** | 12 | architecture-stack, pyramid-3, hub-spoke-4, concentric-3, system-context |
| **text-narrative** | 12 | key-message, quote-callout, executive-summary, faq-pairs-3, agenda-list-5 |
| **timeline** | 12 | timeline-horizontal, quarterly-roadmap-4, phase-gate-3, gantt-3, journey-5 |
| **visual-emphasis** | 12 | hero-statement, three-pillars, four-quadrants, venn-2, bridge-diagram |

---

### Comparison Recipes (14)

| Recipe ID | Description | Required Fields | Best Use Cases |
|-----------|-------------|-----------------|----------------|
| `comparison-columns` | Two side-by-side columns with accent header bars | `left_title`, `left_body`, `right_title`, `right_body` | Feature comparison, two options side by side |
| `comparison-3col` | Three-column comparison with colored headers | `col1_title`, `col1_body`, `col2_title`, `col2_body`, `col3_title`, `col3_body` | Three-way product/feature comparison |
| `pros-cons` | Green positives vs orange challenges | `left_title`, `left_body`, `right_title`, `right_body` | Advantages vs disadvantages, trade-offs |
| `vs-split` | Full slide split with VS circle divider | `left_title`, `left_body`, `right_title`, `right_body`, `vs_text` | Head-to-head comparison, before/after |
| `two-col-text-text` | Two equal text columns without headers | `left_body`, `right_body` | Simple dual-column text layout |
| `two-col-accent-split` | Dark accent left, light right | `left_title`, `left_body`, `right_title`, `right_body` | Emphasis split with visual contrast |
| `tier-comparison-3` | Three tiers (Basic/Standard/Premium) | `tier{1-3}_name`, `tier{1-3}_price`, `tier{1-3}_features` | Pricing tiers, service levels |
| `feature-matrix-header` | Header row + column with 5 data rows | `col{1-3}_header`, `row{1-5}_label`, `row{1-5}_col{1-3}` | Feature comparison matrix |
| `feature-matrix-4x4` | 4×4 grid of cells | `cell{1-16}_text` | Dense feature comparison |
| `feature-matrix-3x5` | 3 options × 5 feature rows | `cell{1-15}_text` | Feature evaluation grid |
| `swot-analysis` | SWOT 2×2 with colored headers (green/orange/blue/purple) | `s_title`, `s_body`, `w_title`, `w_body`, `o_title`, `o_body`, `t_title`, `t_body` | Strategic analysis |
| `value-proposition-canvas` | Customer pains/gains vs product features/benefits | `customer_header`, `pains_body`, `gains_body`, `product_header`, `features_body`, `benefits_body` | Value proposition mapping |
| `rating-comparison-4` | Four items rated on criteria | `item{1-4}_name`, `item{1-4}_ratings` | Vendor evaluation |
| `competitive-grid-4` | Four competitors in 2×2 grid | `comp{1-4}_name`, `comp{1-4}_body` | Competitive landscape |
| `weighted-criteria-5` | Five criteria with progress bars and scores | `criterion{1-5}_name`, `criterion{1-5}_score` | Weighted evaluation |
| `spectrum-scale-5` | Five-point spectrum with markers | `point{1-5}_label`, `point{1-5}_body` | Maturity assessment, scale positioning |

---

### Data & Numbers Recipes (18)

| Recipe ID | Description | Required Fields | Best Use Cases |
|-----------|-------------|-----------------|----------------|
| `stat-callouts` | 2–4 large numbers with labels | `stat{1}_number`, `stat{1}_label` (+optional body, stats 2–4) | Key metrics, headline numbers |
| `big-number-hero` | Single giant number centered | `stat1_number`, `stat1_label`, `stat1_body` | One hero metric that tells the whole story |
| `kpi-row-4` | Four KPIs in a horizontal row | `kpi{1-4}_number`, `kpi{1-4}_label` (+optional body) | Dashboard-style KPI overview |
| `metric-dashboard` | 2×2 grid of metric cards | `metric{1-4}_number`, `metric{1-4}_label` (+optional body) | Executive metrics dashboard |
| `executive-dashboard` | 3 KPIs top + detail area bottom | `kpi{1-3}_number`, `kpi{1-3}_label`, `detail_body` | C-level summary with drill-down |
| `data-highlight-2` | Two large data points side by side | `data{1-2}_number`, `data{1-2}_label`, `data{1-2}_body` | Two headline metrics |
| `donut-stats-3` | Three circular stat indicators | `stat{1-3}_number`, `stat{1-3}_label` (+optional body) | Visual percentage indicators |
| `before-after-numbers` | Before vs After with arrow | `before_label`, `before_number`, `before_body`, `after_label`, `after_number`, `after_body` | Impact demonstration, before/after metrics |
| `funnel-4` | Four-stage funnel (progressively narrower) | `stage{1-4}_text` | Sales funnel, conversion pipeline |
| `percentage-bar-3` | Three horizontal percentage bars | `bar{1-3}_label`, `bar{1-3}_value` | Survey results, completion rates |
| `growth-indicators-3` | Three metrics with growth arrows | `metric{1-3}_number`, `metric{1-3}_change`, `metric{1-3}_label` | Growth metrics with trends |
| `metric-comparison-3` | Three metrics with variance indicators | `metric{1-3}_number`, `metric{1-3}_variance`, `metric{1-3}_label` | Period-over-period comparison |
| `score-card` | Single score with breakdown details | `score_number`, `score_label`, `detail{1-3}_text` | Assessment score, health check |
| `progress-tracker-5` | Five progress steps with circles on line | `step{1-5}_number`, `step{1-5}_title`, `step{1-5}_body` | Implementation progress, milestone tracking |
| `tco-comparison` | TCO comparison: two options with cost breakdowns | `option{1-2}_title`, `option{1-2}_total`, `option{1-2}_breakdown` | Total cost of ownership analysis |
| `roi-calculator` | Investment vs returns with ROI circle | `invest_title`, `invest_body`, `roi_number`, `roi_label`, `return_title`, `return_body` | Return on investment case |
| `two-col-stat-detail` | Large stat left + detail text right | `stat_number`, `stat_label`, `detail_body` | Hero number with supporting detail |

---

### Grid & Card Recipes (16)

| Recipe ID | Description | Required Fields | Best Use Cases |
|-----------|-------------|-----------------|----------------|
| `icon-text-grid` | 2–6 titled text cards (auto-layout 2×1 to 2×3) | `item{1-2+}_title`, `item{1-2+}_body` | Feature highlights, capability overview |
| `grid-3x1` | Three horizontal cards | `card{1-3}_title`, `card{1-3}_body` | Three parallel topics with detail |
| `grid-4x1` | Four horizontal cards | `card{1-4}_title`, `card{1-4}_body` | Four parallel items |
| `feature-cards-4` | Four cards with accent headers | `feat{1-4}_title`, `feat{1-4}_body` | Product features with colored headers |
| `feature-cards-6` | Six cards 2×3 with accent headers | `feat{1-6}_title`, `feat{1-6}_body` | Comprehensive feature grid |
| `benefit-grid-3` | Three benefit cards with accent top border | `benefit{1-3}_title`, `benefit{1-3}_body` | Customer benefit highlights |
| `profile-cards-3` | Three person/role cards with avatar circles | `person{1-3}_initials`, `person{1-3}_name`, `person{1-3}_role` (+optional body) | Team introductions |
| `profile-cards-4` | Four person/role cards | Same pattern as profile-cards-3 with 4 | Team overview |
| `checklist-2col` | Two-column checklist with green markers | `check{1-10}_mark`, `check{1-10}_text` | Requirements checklist, compliance list |
| `logo-grid-6` | Six logo/partner placeholder slots | `logo{1-6}_name` | Partner logos, integration ecosystem |
| `capability-matrix-3x3` | 3×3 capability grid with titles | `cap{1-9}_title`, `cap{1-9}_body` | Capability overview matrix |
| `risk-matrix-3x3` | 3×3 risk/priority matrix | `cell{1-9}_text` | Risk assessment, priority matrix |
| `priority-quadrant` | 2×2 quadrant with axis labels | `q{1-4}_title`, `q{1-4}_body`, axis labels | Priority/impact mapping |
| `stakeholder-map-4` | Four stakeholder group cards | `group{1-4}_title`, `group{1-4}_body` | Stakeholder analysis |
| `raci-grid` | RACI responsibility matrix (up to 6 tasks) | `task{1-6}_name`, `task{1-6}_r/a/c/i`, header labels | Responsibility assignment |
| `table-simple-5x3` | 5-row 3-column table | `h{1-3}_text`, `row{1-5}_c{1-3}` | Simple data table |
| `table-wide-4x6` | 4-column 6-row table | `h{1-4}_text`, `row{1-6}_c{1-4}` | Wide data table |

---

### Process & Flow Recipes (14)

| Recipe ID | Description | Required Fields | Best Use Cases |
|-----------|-------------|-----------------|----------------|
| `process-flow` | 3–5 step boxes with arrow connectors | `step{1-3+}_title` (+optional number, body) | Sequential process, workflow |
| `process-5` | Five-step horizontal process | `step{1-5}_number`, `step{1-5}_title`, `step{1-5}_body` | Detailed five-step process |
| `vertical-process-4` | Four vertical steps with connectors | `step{1-4}_number`, `step{1-4}_title`, `step{1-4}_body` | Vertical process flow |
| `vertical-process-5` | Five vertical steps | Same pattern with 5 | Detailed vertical process |
| `chevron-flow-4` | Four chevron steps (blue bars) | `step{1-4}_title`, `step{1-4}_body` | Phase progression, linear flow |
| `chevron-flow-5` | Five chevron steps | Same pattern with 5 | Detailed phase progression |
| `circular-process-4` | Four steps in a cycle with arrows | `step{1-4}_text` | Recurring process, feedback loops |
| `decision-tree-2` | Binary decision with yes/no branches | `question_text`, `yes_label`, `yes_body`, `no_label`, `no_body` | Decision logic, go/no-go |
| `input-output` | Input > Process > Output three-box flow | `input_*`, `process_*`, `output_*` (label, title, body each) | Data flow, transformation pipeline |
| `pipeline-4` | Four pipeline stages with headers | `stage{1-4}_title`, `stage{1-4}_body` | Sales pipeline, delivery pipeline |
| `swimlane-2` | Two parallel process lanes | `lane{1-2}_title`, `lane{1-2}_step{1-3}_title/body` | Parallel workstreams |
| `phased-rollout-3` | Three phases with sub-items | `phase{1-3}_title`, `phase{1-3}_body` | Implementation phases |
| `numbered-checklist-6` | Six numbered items in two columns | `item{1-6}_number`, `item{1-6}_title`, `item{1-6}_body` | Step-by-step checklist |
| `numbered-checklist-8` | Eight numbered items in two columns | Same pattern with 8 | Extended checklist |

---

### Structure & Architecture Recipes (12)

| Recipe ID | Description | Required Fields | Best Use Cases |
|-----------|-------------|-----------------|----------------|
| `architecture-stack` | 4–5 horizontal layers stacked vertically | `layer{1-2+}_title` (+optional body, up to 5) | Platform architecture, layered systems |
| `pyramid-3` | Three-level pyramid (wide base, narrow top) | `level{1-3}_text` | Hierarchy, priority stack |
| `pyramid-4` | Four-level pyramid | `level{1-4}_text` | Extended hierarchy |
| `hub-spoke-4` | Central hub with four surrounding nodes | `hub_text`, `spoke{1-4}_text` | Platform with integrations |
| `hub-spoke-6` | Central hub with six surrounding nodes | `hub_text`, `spoke{1-6}_text` | Ecosystem with many connections |
| `concentric-3` | Three concentric circles | `outer_text`, `middle_text`, `inner_text` | Layered security, defense in depth |
| `onion-3` | Three concentric rectangular layers | `outer_title`, `middle_title`, `inner_title`, `inner_body` | Platform layers with detail |
| `system-context` | Central system with 4 external connections | `center_text`, `ext{1-4}_text` | System integration context |
| `integration-map-4` | Hub with four integration points in corners | `hub_text`, `int{1-4}_text` | Integration architecture |
| `modular-blocks-6` | Six capability blocks 2×3 (dark fill) | `block{1-6}_title`, `block{1-6}_body` | Modular platform components |
| `ecosystem-3x2` | 3×2 ecosystem component grid (light cards) | `comp{1-6}_title`, `comp{1-6}_body` | Ecosystem overview |
| `dependency-chain-4` | Four linked dependency blocks | `dep{1-4}_title`, `dep{1-4}_body` | Dependency mapping |

---

### Text & Narrative Recipes (12)

| Recipe ID | Description | Required Fields | Best Use Cases |
|-----------|-------------|-----------------|----------------|
| `key-message` | Single key message in large centered text (28pt) | `message_text` | Impact statement, takeaway slide |
| `hero-statement` | Bold statement (32pt) with subtext | `msg1_text`, `msg1_subtext` | Section opener, bold claim |
| `quote-callout` | Large quote with accent bar and attribution | `quote1_text`, `quote1_attribution` | Customer testimonial, expert quote |
| `pullquote-attribution` | Quote with name, role, and decorative elements | `quote_text`, `author_name`, `author_role` | Formal testimonial |
| `executive-summary` | Three summary paragraphs | `para{1-3}_text` | Executive overview, summary slide |
| `highlight-box` | Highlighted box with accent border | `highlight_title`, `highlight_body` | Key callout, important note |
| `definition-list-4` | Four term:definition pairs | `def{1-4}_term`, `def{1-4}_definition` | Glossary, terminology |
| `faq-pairs-3` | Three Q&A pairs | `faq{1-3}_question`, `faq{1-3}_answer` | FAQ slide |
| `agenda-list-5` | Five numbered agenda items | `agenda{1-5}_number`, `agenda{1-5}_text` | Clean numbered agenda |
| `agenda-list-7` | Seven numbered agenda items | Same pattern with 7 | Extended agenda |
| `two-point-contrast` | Two contrasting statements with divider | `point1_text`, `point2_text` | Contrasting perspectives |
| `mckinsey-situation-complication-resolution` | SCR framework (three panels) | `situation_title/body`, `complication_title/body`, `resolution_title/body` | Consulting-style problem framing |

---

### Timeline & Roadmap Recipes (12)

| Recipe ID | Description | Required Fields | Best Use Cases |
|-----------|-------------|-----------------|----------------|
| `timeline-horizontal` | 4–5 milestones on horizontal line | `milestone{1+}_date`, `milestone{1+}_title` (+optional body) | Project timeline |
| `timeline-h-5` | Horizontal timeline with 5 milestones | Same pattern, optimized for 5 | Extended timeline |
| `timeline-vertical-4` | Vertical timeline with 4 milestones | `milestone{1-4}_date`, `milestone{1-4}_title`, `milestone{1-4}_body` | Vertical project timeline |
| `timeline-vertical-5` | Vertical timeline with 5 milestones | Same pattern with 5 | Extended vertical timeline |
| `quarterly-roadmap-4` | Four quarters with items | `q{1-4}_label`, `q{1-4}_items` | Product roadmap |
| `phase-gate-3` | Three phase gates with deliverables | `phase{1-3}_title`, `phase{1-3}_body` | Gated implementation plan |
| `phase-gate-4` | Four phase gates | Same pattern with 4 | Extended gated plan |
| `gantt-3` | Three-track Gantt chart | `timeline_header`, `track{1-3}_label`, `track{1-3}_text` | Project scheduling |
| `journey-5` | Five-stage journey map | `stage{1-5}_number`, `stage{1-5}_title`, `stage{1-5}_body` | Customer journey |
| `maturity-model-5` | Five ascending steps (staircase) | `level{1-5}_text` | Maturity assessment |
| `past-present-future` | Three panels: past, present, future | `past_title/body`, `present_title/body`, `future_title/body` | Evolution narrative |

---

### Visual & Emphasis Recipes (12)

| Recipe ID | Description | Required Fields | Best Use Cases |
|-----------|-------------|-----------------|----------------|
| `three-pillars` | Three cards with accent top bar | `pillar{1-3}_title`, `pillar{1-3}_body` | Strategic pillars, three key themes |
| `four-quadrants` | 2×2 quadrant with axis lines | `q{1-4}_title`, `q{1-4}_body` | Strategic framework, positioning |
| `four-quadrants-labeled` | 2×2 quadrant with colored fills | `q{1-4}_text` | Impact matrix with color coding |
| `venn-2` | Two overlapping circles | `left_text`, `right_text`, `overlap_text` | Conceptual overlap |
| `venn-3` | Three overlapping circles | `circle{1-3}_text` | Three-way intersection |
| `step-ladder-4` | Four ascending steps (staircase bars) | `step{1-4}_text` | Progressive advancement |
| `bridge-diagram` | Current state > Bridge > Future state | `current_*`, `bridge_text`, `future_*` | Transformation narrative |
| `banner-cta` | Call-to-action banner (white on blue) | `cta_headline`, `cta_subtext` | Call to action, next steps |
| `icon-highlight-3` | Three cards with accent top border | `item{1-3}_title`, `item{1-3}_body` | Three highlights with emphasis |
| `icon-highlight-4` | Four cards with accent top border | `item{1-4}_title`, `item{1-4}_body` | Four highlights with emphasis |
| `title-only-centered` | Large centered title (36pt) | `center_text` | Statement slide, transition |

---

## Selection Matrix

### By Presentation Type

| Deck Type | Recommended Template Slides | Recommended Recipes |
|-----------|---------------------------|---------------------|
| **Product Overview** (10–12) | 001, 002, 003, 005, 010, 012, 015/016, 024 | architecture-stack, stat-callouts, icon-text-grid |
| **Sales Pitch** (8–10) | 001, 005, 015/016, 024 | comparison-columns, stat-callouts, quote-callout, banner-cta |
| **Technical Deep Dive** (12–15) | 001, 002, 003, 005, 006, 012, 015/016, 024 | architecture-stack, process-flow, hub-spoke-4, icon-text-grid |
| **Investor Deck** (10–12) | 001, 005, 008, 024 | stat-callouts, kpi-row-4, timeline-horizontal, funnel-4, quote-callout |
| **Case Study** (6–8) | 001, 005, 015/016, 024 | before-after-numbers, stat-callouts, quote-callout, process-flow |
| **Workshop / Training** (15–20) | 001, 002, 003, 005, 010, 024 | process-flow, numbered-checklist-6, definition-list-4, faq-pairs-3 |
| **Board Deck** (8–10) | 001, 003, 005, 024 | executive-dashboard, quarterly-roadmap-4, kpi-row-4, key-message |
| **RFP Response** (12–18) | 001, 002, 003, 005, 006/007, 015/016, 024 | feature-matrix-header, architecture-stack, tier-comparison-3, timeline-horizontal |

### By Content Need

| I need to show... | Best Choice |
|-------------------|-------------|
| Single topic with bullets | `slide-005` (single column) |
| Two things side by side | `slide-010` or recipe `comparison-columns` |
| Three parallel items | `slide-012` or recipe `three-pillars` |
| Four features/capabilities | `slide-013` or recipe `feature-cards-4` |
| Six features/capabilities | `slide-014` or recipe `icon-text-grid` (6 items) |
| A big impressive number | Recipe `big-number-hero` |
| 2–4 key metrics | Recipe `stat-callouts` or `kpi-row-4` |
| Before vs After | Recipe `before-after-numbers` |
| A process/workflow | Recipe `process-flow` or `chevron-flow-4` |
| Architecture layers | Recipe `architecture-stack` |
| A timeline/roadmap | Recipe `timeline-horizontal` or `quarterly-roadmap-4` |
| A customer quote | Recipe `quote-callout` or `pullquote-attribution` |
| A DALP screenshot | `slide-015` or `slide-016` |
| A comparison table | `slide-006`/`slide-007` or recipe `feature-matrix-header` |
| An org chart / team | Recipe `profile-cards-3` or `profile-cards-4` |
| A SWOT analysis | Recipe `swot-analysis` |
| A decision flow | Recipe `decision-tree-2` |
| A Venn diagram | Recipe `venn-2` or `venn-3` |
| ROI / TCO analysis | Recipe `roi-calculator` or `tco-comparison` |

---

## Design System Quick Reference

### Colors

| Role | Hex | Usage |
|------|-----|-------|
| Title text | `0000FF` | All slide titles |
| Body text | `000000` | All body content |
| Primary accent | `000099` | Stat numbers, header bars, active elements |
| Accent tint | `3333BB` | Alternating layers, secondary accent |
| Bright blue | `0000ED` | Connectors, arrows |
| Light gray | `E8E8E8` | Card backgrounds, dividers |
| White | `FFFFFF` | Slide background, text on dark fills |
| Orange | `E47C48` | Warnings, "before" state, challenges |
| Green | `037352` | Success, "after" state, positives |
| Purple | `904EFF` | Differentiation in grids |

### Typography

| Element | Font | Size | Weight | Color |
|---------|------|------|--------|-------|
| Heading | Figtree | 14pt | SemiBold | 0000FF |
| Sub-heading | Figtree | 13pt | SemiBold | 000099 |
| Body text | Figtree | 11pt | Regular | 000000 |
| Small body | Figtree | 10pt | Regular | 000000 |
| Large stat | Figtree | 48pt | Bold | 000099 |
| Medium stat | Figtree | 36pt | Bold | 000099 |
| Step number | Figtree | 20pt | Bold | FFFFFF |

### Content Area

| Property | Value |
|----------|-------|
| Usable width | 12.35" (0.50" to 12.85") |
| Usable height | 5.25" (1.35" to 6.60") |
| Left/right margin | 0.50" / 0.48" |
| Title area | y = 0" to ~1.29" |
| Footer area | y = 6.93" |

---

## Config Format Reference

### Build Command

```bash
python3 scripts/build_from_config.py configs/<deck>.json
python3 scripts/inject_from_catalog.py output/<deck>.pptx configs/<deck>.json
```

### Template Slide Config Keys

| Slide | Config Keys |
|-------|-------------|
| slide-001 | `title`, `subtitle` |
| slide-002 | `title`, `item_0`–`item_6`, `icon1`–`icon7` |
| slide-003 | `title`, `subtitle` |
| slide-004 | `title`, `body` (or `recipe` + recipe fields) |
| slide-005 | `title`, `body` |
| slide-006 | `title`, `body`, `table_data` |
| slide-007 | `title`, `body`, `table_data` |
| slide-008 | `title`, `body` (chart as image) |
| slide-010 | `title`, `col1`, `col2` |
| slide-012 | `title`, `col1`, `col2`, `col3` |
| slide-013 | `title`, `item1`–`item4` |
| slide-014 | `title`, `item1`–`item6` |
| slide-015–023 | `title`, `body`, `image_path` |
| slide-024 | (no text required) |

### Recipe Config Pattern

```json
{
  "bank_file": "slide-004-blank.pptx",
  "title": "Slide Title",
  "recipe": "recipe-id",
  "field1": "value1",
  "field2": "value2"
}
```

Refer to the recipe entries above for the specific fields each recipe expects.

---

*This catalog is the authoritative reference for all available slide layouts. Source files: `slide-bank/REGISTRY.json`, `blank-recipes/CATALOG.json`, `blank-recipes/RECIPES.json`.*
