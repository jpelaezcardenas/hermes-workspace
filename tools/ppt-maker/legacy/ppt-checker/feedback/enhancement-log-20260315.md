---
title: "Enhancement Log — 2026-03-15"
type: page
source: gbrain-metadata-normalizer
metadata_normalized_at: 2026-04-27T12:36:05.655518Z
---

# Enhancement Log — 2026-03-15

> 15 enhancement tracks applied to the PPTX Checker agent.
> Approved by Gyan (co-founder). No output format, scripts, or template files were modified.
> Only setup/, training/, feedback/, and content/ files were enhanced.

---

## Summary of Changes

### Track 1: Text Overlap Detection Criteria
**File:** `setup/technical-visual-checks.md` (new file, §1)
- Defined three categories: text overflowing textboxes, text overlapping other elements, text cut off at slide edges.
- Specified auto-shrink detection: if auto-fit shrinks text below 10pt, flag as functional overflow.
- Defined bounding box comparison methodology for detecting overlaps.
- Set minimum 0.5" margin from slide edges for all text.
- Severity: Hard Fail (visible cut-off/overlap), Major (auto-shrunk below threshold), Minor (close to edge).

### Track 2: Element Overlap Detection
**File:** `setup/technical-visual-checks.md` (§2)
- Defined shape-on-shape, image-on-text, z-order, and grouping collision checks.
- Set 5% bounding box intersection threshold for flagging overlap.
- Carved out exceptions for intentional layering (badges, accent lines, grouped elements).
- Severity: Hard Fail (content obscured), Major (decorative covering content), Minor (edge overlap).

### Track 3: Font Correctness Checks
**File:** `setup/technical-visual-checks.md` (§3), `setup/brand-checklist.md` (§6)
- Stated Figtree as the sole permitted typeface (case-sensitive match).
- Listed acceptable weights: Regular, SemiBold, Bold, ExtraBold.
- Listed common contamination fonts: Arial, Calibri, Aptos, Helvetica, Montserrat, etc.
- Specified check locations: text runs, table cells, chart labels, grouped objects, master slides.
- Documented common contamination sources: copy-paste, chart defaults, imported diagrams.
- Severity: Hard Fail (any non-Figtree in visible content), Major (in hidden/inherited elements).

### Track 4: Font Sizing Validation
**File:** `setup/technical-visual-checks.md` (§4), `setup/brand-checklist.md` (§6)
- Defined min/recommended/max font sizes per element type:
  - Cover Title: 30/36/44pt Bold
  - Slide Title: 20/24/30pt Bold
  - Card Heading: 14/16/20pt Bold
  - Sub-heading: 12/14/16pt Bold
  - Body: 11/12/14pt Regular
  - Caption/Footnote: 8/9/10pt Regular
- Set consistency rule: same-type elements must use same size across slides (title ±2pt, body ±1pt).
- Flag if >4 different font sizes on one slide.
- Severity: Major (below minimums, inconsistent titles, hierarchy broken), Minor (>4 sizes on slide).

### Track 5: Element Spacing Validation
**File:** `setup/technical-visual-checks.md` (§5), `setup/brand-checklist.md` (§6)
- Defined margin requirements at 13.333"×7.5" scale: 0.93" left/right, 1.47" top (below title), 0.50" above footer.
- Defined minimum gaps: card-to-card 0.33", text-to-text 0.20", image-to-text 0.25", title-to-content 0.33".
- Set gutter consistency tolerance: ±0.05".
- Required cards/panels to never touch each other or slide edges.
- Severity: Hard Fail (touching edges), Major (within 0.25" of edge, inconsistent gutters), Minor (slightly off).

### Track 6: Header/Footer Verification
**File:** `setup/technical-visual-checks.md` (§6), `setup/brand-checklist.md` (§6)
- Defined page number requirements: present on content slides (5–28), absent on cover/closing slides.
- Specified footer zone position: Y 6.73"–7.00" at scaled coordinates.
- Specified page number styling: Figtree, 9pt, #A0A0A0.
- Required sequential numbering, correct positioning, no duplicates.
- Defined accent line specs for title zone.
- Severity: Major (missing/wrong page numbers, footer overlapping content), Minor (numbers on cover slides).

### Track 7: Title Placement Check
**File:** `setup/technical-visual-checks.md` (§7), `setup/brand-checklist.md` (§6)
- Defined expected title zone: Y 0.47"–1.13" at 13.333"×7.5" scale.
- Set position consistency tolerance: ±0.05" for normal, flag at ±0.10".
- Required consistent left alignment on content slides (center only for cover/divider).
- Required consistent title width across slides.
- Severity: Hard Fail (title outside zone), Major (>0.10" drift, alignment inconsistency), Minor (0.05"–0.10" drift).

### Track 8: Logo Verification
**File:** `setup/technical-visual-checks.md` (§8), `setup/brand-checklist.md` (§6)
- Required original aspect ratio preservation, no distortion of any kind.
- Required minimum 0.25" clear space on all sides.
- Set minimum resolution: 150 DPI at display size.
- Required consistency in position if logo appears on multiple content slides.
- Severity: Hard Fail (distorted or recolored), Major (overlapping, missing), Minor (inconsistent position, slight pixelation).

### Track 9: Content Density Assessment
**File:** `setup/technical-visual-checks.md` (§9), `setup/slide-design-rules.md` (§9)
- Defined word count thresholds: Green (<60), Yellow (60–100), Red (>100), Hard Fail (>150).
- Set title length: 3–8 words ideal, max 12.
- Set bullet limits: max 6 per group, max 15 words each.
- Defined element count guidelines: max 15 objects per slide, 20+ = over-designed.
- Added under-populated detection: <10 words with no visual = likely placeholder.
- Severity: Hard Fail (>150 words), Major (>100 with poor hierarchy), Minor (>100 with good hierarchy, under-populated).

### Track 10: Color Contrast Verification
**File:** `setup/technical-visual-checks.md` (§10), `setup/slide-design-rules.md` (§10), `setup/brand-checklist.md` (§6)
- Defined WCAG AA minimums: 4.5:1 for body text, 3:1 for large text and non-text elements.
- Listed approved contrast pairs from brand design system (dark-on-light and light-on-dark).
- Documented common failure scenarios: gray on white, text on photos, chart labels on colored segments.
- Provided quick-check heuristic: gray text below #787878 on white fails for small text.
- Severity: Major (body/large text failing AA), Minor (caption with marginal contrast).

### Track 11: Consistency Across Slides
**File:** `setup/technical-visual-checks.md` (§11), `setup/slide-design-rules.md` (§11), `setup/brand-checklist.md` (§6)
- Defined 12-property consistency checklist: title size, title position, body size, body color, card bg, card border, gutter width, content margins, icon style, page number position/font/color, accent line style.
- Set tolerances per property (exact match for colors, ±2pt for title sizes, ±0.05" for positions).
- Defined consistency scoring: 0–2 inconsistencies normal, 3–5 below standard, 6+ serious.
- Severity: Major (font/size/color inconsistency), Minor (spacing/one-off deviation).

### Track 12: Image Quality Checks
**File:** `setup/technical-visual-checks.md` (§12), `setup/slide-design-rules.md` (§12), `setup/brand-checklist.md` (§6)
- Set minimum resolution: 150 DPI at display size, 1920px for full-width, 960px for half-width.
- Set aspect ratio tolerance: max 2% deviation from original.
- Defined cropping quality rules: no cut-off faces, complete UI sections, relevant content visible.
- Required no watermarks, no visible compression artifacts.
- Required consistent image style throughout deck.
- Severity: Hard Fail (watermarks), Major (pixelated, distorted), Minor (awkward crop, style inconsistency).

### Track 13: Improved Content/Messaging Review Criteria
**File:** `setup/content-standards.md` (new section: "DALP Positioning Alignment")
- Defined 5 DALP positioning pillars: lifecycle platform, not tokenization; platform not consulting; institutional-grade; complexity is the value.
- Created 8-point messaging alignment checklist.
- Defined 6 accuracy red lines: no unscoped compliance claims, no "any chain" without EVM scope, no partner credit grabs, no unqualified "fully compliant," no unsourced performance numbers, no "replaces regulation."

### Track 14: Tone and Style Assessment
**File:** `setup/content-standards.md` (new section: "Tone and Style Assessment")
- Defined target tone: professional, institutional, confident-not-arrogant, direct-not-corporate, technically-appropriate.
- Listed tone red flags: crypto jargon (WAGMI, DeFi, trustless), startup hype (disrupting, 10x), consultant mush (leverage synergies), fear-based selling, breathless futurism.
- Defined audience-appropriate checks for C-suite, technical, compliance/legal, and mixed audiences.
- Set style rules: no exclamation marks, no rhetorical question titles, no "We"-leading slides, precise numbers.

### Track 15: Expanded Scoring Rubric
**File:** `setup/scoring-rubric.md`, `setup/review-template.md`, `training/scorecard.md`
- Added Technical/Visual Sub-Score (/25): Brand Compliance + Slide Selection + Visual Balance + Completeness + Editability.
- Added Content/Messaging Sub-Score (/25): Text Quality + Content Accuracy + Narrative Flow + Audience Fit + Message Hierarchy.
- Added sub-score gate: if either sub-score < 12/25, deck cannot be approved regardless of total.
- Updated review template to require both sub-scores in Score Card.
- Updated scorecard training doc with sub-score groupings and interpretation guidance.

---

## Files Modified

| File | Changes |
|---|---|
| `setup/technical-visual-checks.md` | **NEW** — 12 sections covering all technical visual inspection criteria (tracks 1–12) |
| `setup/scoring-rubric.md` | Added sub-score system with /25 visual + /25 content breakdown (track 15) |
| `setup/brand-checklist.md` | Added §6: Technical Visual Integrity with 30+ new pass/fail checks (tracks 1–12) |
| `setup/content-standards.md` | Added DALP Positioning Alignment + Tone and Style Assessment sections (tracks 13–14) |
| `setup/slide-design-rules.md` | Added §9–12: density, contrast, consistency, image quality (tracks 9–12) |
| `setup/review-template.md` | Added Technical Visual Issues section + sub-scores in Score Card (tracks 1–12, 15) |
| `AGENTS.md` | Added technical-visual-checks.md to startup sequence + workflow steps + hard failures + inspection expectations |
| `training/scorecard.md` | Added sub-score groupings and interpretation guidance (track 15) |
| `feedback/lessons.md` | Added Technical Visual Lessons + Tone and Positioning Lessons sections |

## Files NOT Modified (by design)
- `scripts/inspect-pptx.py` — no script changes
- `setup/settlemint-official.pptx` — no template changes
- `output/` — no output changes
- `SOUL.md` — identity unchanged
- `TOOLS.md` — tools unchanged

---

## Key Design Decisions

1. **Single new file for all technical visual checks** (`technical-visual-checks.md`) — keeps the 12 technical criteria in one place rather than scattering them across existing files. Existing files got summary checklists that reference back.

2. **Sub-scores are additive, not separate rubrics.** The same 10 dimensions are used; they're just grouped into two sub-totals. This avoids creating a parallel scoring system.

3. **Brand design system values used as source of truth.** All spacing, sizing, and color values reference the ppt-maker's `brand-design-system.md` to ensure checker and builder are aligned.

4. **Severity levels align with existing anti-patterns.** Hard Fail / Major / Minor match the existing severity scheme in `anti-patterns.md`.

5. **Enhanced AGENTS.md workflow inserts technical visual checks as step 4** (before manual review), so automated/structural findings inform the human judgment pass that follows.
