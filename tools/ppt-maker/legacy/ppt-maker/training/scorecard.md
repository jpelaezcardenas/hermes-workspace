---
title: "PPT Maker Training Scorecard"
type: page
source: gbrain-metadata-normalizer
metadata_normalized_at: 2026-04-27T12:36:05.703535Z
---

# PPT Maker Training Scorecard

## Scoring Rubric — Presentation Quality (10 dimensions, /50 total)

Each dimension scored 1–5:
- **1** = Major deficiency, would need full rework
- **2** = Below standard, multiple issues
- **3** = Acceptable, meets minimum bar
- **4** = Strong, minor improvements possible
- **5** = Excellent, reference quality

| # | Dimension | What to evaluate | 1 (Fail) | 3 (Acceptable) | 5 (Excellent) |
|---|-----------|-----------------|----------|-----------------|----------------|
| 1 | **Narrative Arc** | Does the deck tell a coherent story from problem to proof? | No logical flow, slides feel random | Sections follow a structure but transitions are weak | Clear problem → solution → proof → close arc with smooth transitions |
| 2 | **Slide Type Variety** | Are 5+ different slide types used? No layout repeated 3+ times? | 2–3 types, heavy repetition | 5 types, some repetition but not egregious | 7+ types, each layout chosen for its content, zero gratuitous repetition |
| 3 | **Content Density** | Are placeholders filled to capacity per .info.json specs? | Multiple slides with <50% fill | Most slides filled, 1–2 sparse | Every placeholder filled within 80–100% of stated capacity |
| 4 | **Title Quality** | Are titles assertion-style takeaways (not topic labels)? | Generic labels: "Overview", "Features", "Summary" | Mix of assertions and labels | Every title is a 5–10 word takeaway the audience remembers |
| 5 | **Data & Proof Points** | Are stats sourced from platform-stats.json? Case studies from case-studies.json? | No data, vague claims | Some stats but unsourced or stale | Every claim backed by a specific, sourced number or named reference |
| 6 | **Visual Integration** | Are image slides, screenshots, and diagrams used effectively? | No images, or images don't match content | 2+ image slides, mostly relevant | Images reinforce the narrative, screenshots show real UI, diagrams clarify architecture |
| 7 | **Positioning Language** | Does copy avoid all banned phrases from SOUL.md? | Contains 3+ banned phrases | 1 banned phrase slipped through | Zero banned phrases, copy follows all positioning rules |
| 8 | **Audience Calibration** | Is tone/depth matched to the specified audience type? | Executive deck reads like a developer guide | Mostly appropriate but some sections drift | Perfectly calibrated: executives get outcomes, technical gets architecture, sales gets proof |
| 9 | **Structural Compliance** | Cover first, Thank You before appendix, section separators between sections, 4–10 Mermaid diagrams in appendix? | Missing required structural elements | Structure present but separator or diagram count off | All structural rules met precisely |
| 10 | **Conciseness** | Is every word earning its place? No filler, no padding? | Bloated bullets, redundant slides | Mostly tight, occasional padding | Every bullet is 8–20 words, front-loaded keywords, zero filler phrases |

## Score History

| Date | Deck | Audience | Slides | Overall /50 | Arc | Variety | Density | Titles | Data | Visual | Position | Audience | Structure | Concise | Notes |
|------|------|----------|--------|-------------|-----|---------|---------|--------|------|--------|----------|----------|-----------|---------|-------|
| — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | No decks scored yet |

## Golden Example Patterns

### What a 45+ /50 deck looks like:
1. **Opening sequence**: Cover → Single Column (framing the problem as a 1-sentence assertion title) → Agenda with icons
2. **Problem section**: Section Separator → Two Column (current state vs. desired state, no "fragmented stack" framing) → Table showing specific operational gaps
3. **Solution section**: Section Separator → Three Column (3 capability pillars with front-loaded headings) → Screenshot Right (real DALP UI) → Text 2x2 (4 specific features with stat + label in each cell)
4. **Proof section**: Section Separator → Three Column (3 case studies with named institutions and specific outcomes) → Table with Text (compliance coverage by jurisdiction)
5. **Close**: Single Column (1 clear next-step CTA) → Thank You (zero text added)
6. **Appendix**: 6–8 Mermaid diagrams on Picture slides, each matched to its slot aspect ratio

### Common defect patterns (subtract points for these):
- **The Wall of Text**: Single Column with 200+ words crammed in. Should have been split across 2 slides or used a grid layout.
- **The Empty Grid**: Text 2x3 chosen but only 4 cells have content. Use Text 2x2 instead.
- **The Label Title**: "Platform Overview" tells the audience nothing. "DALP Manages the Full Token Lifecycle" tells them everything.
- **The Orphan Stat**: A number on a slide with no source, no unit, and no "so what" label. Every stat needs: number + unit + context sentence + source.
- **The Screenshot Dump**: 4 consecutive screenshot slides with no narrative connecting them. Screenshots need to prove a specific point made in the preceding text slide.
- **The Banned Phrase Slip**: "From pilot to production" or "enterprise-grade" appearing anywhere in the deck.

## Calibration Notes
- Target steady-state: 38–44/50 for well-built decks
- If average > 44/50 for 5 consecutive scores: tighten rubric (raise the bar on titles and data)
- If average < 32/50 for 5 consecutive scores: review whether content-banks have sufficient material
- Score each deck at two checkpoints: after plan (dimensions 1, 2, 8, 9 only) and after final build (all 10)
