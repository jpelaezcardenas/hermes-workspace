# Week 1 Calibration Report

**Date:** Saturday, March 21, 2026
**Rotation:** Week 1 of 4 (started 2026-03-17)
**Exercises completed this week:** 4 scored exercises (8 scored loops)

---

## Score Summary

| Date | Exercise | L1 | L2 | L3 | Delta (best) |
|------|----------|-----|-----|-----|---------------|
| Mar 19 | Content refresh: sections 7-8 | 34 | 39 | — | +5 |
| Mar 20 (AM) | IP stress test | 33 | 40 | — | +7 |
| Mar 20 (PM) | Mock RFI: RE tokenization MR-5 | 39 | 43 | — | +4 |
| Mar 21 (AM) | Asset class: commodities AC-4 | 39 | 46 | — | +7 |

**Note:** Exercises from Mon-Thu of Week 1 (Mar 17-18) were not yet tracked in the scorecard, as the training system was being stood up. The four exercises above represent the scored portion of the week.

---

## Aggregate Statistics

| Metric | Value |
|--------|-------|
| Average Loop 1 score | 36.3 / 50 |
| Average Loop 2 score | 42.0 / 50 |
| Average delta (L1 to best) | +5.8 |
| Highest single score | 46 (AC-4, Loop 2) |
| Lowest single score | 33 (IP stress test, Loop 1) |
| Scores in target band (38-44) | 5 of 8 (62.5%) |
| Scores above target band (>44) | 1 of 8 (12.5%) |
| Scores below target band (<38) | 2 of 8 (25%) |

---

## Category-Level Trends (across 10-category rubric)

Based on the four exercises using the full rubric:

| Category | Avg L1 | Avg L2 | Weakest | Strongest |
|----------|--------|--------|---------|-----------|
| Exec Readability | 4.0 | 4.3 | Content refresh L1 | AC-4 L2 |
| Technical Credibility | 3.3 | 4.3 | Content refresh L1 | Multiple |
| Requirement Coverage | 4.0 | 4.3 | Content refresh L1 | AC-4 L2 |
| Honesty / Boundaries | 4.3 | 4.7 | Content refresh L1 | IP stress test L2, AC-4 both |
| Flow / Transitions | 3.7 | 4.0 | AC-4 L1 | Multiple |
| Writing Quality | 3.7 | 4.3 | Content refresh L1 | AC-4 L2 |
| Client Centricity | 3.0 | 3.7 | Content refresh L1 | IP stress test L2 |
| Visual / Screenshots | 2.3 | 3.3 | IP stress test L1 | AC-4 L2 |
| IP Protection | 4.0 | 4.7 | IP stress test L1 | IP stress test L2, MR-5 |
| Competitive Edge | 3.0 | 4.0 | Content refresh L1, AC-4 L1 | Multiple |

### Bottom 3 categories (by L1 average — where first drafts are weakest):
1. **Visual / Screenshots (2.3)** — First drafts consistently under-reference DALP screenshots
2. **Client Centricity (3.0)** — Initial writing defaults to platform-centric framing
3. **Competitive Edge (3.0)** — Differentiation against competitors weak in first pass

### Top 3 categories (by L2 average — where we finish strongest):
1. **Honesty / Boundaries (4.7)** — Capability boundary honesty is becoming a strength
2. **IP Protection (4.7)** — After one bad L1 (33), IP awareness is now strong
3. **Exec Readability (4.3)** — Prose quality improves well in rewrites

---

## Key Lessons Learned This Week

### 1. Honesty about capability boundaries is a competitive weapon
The AC-4 commodities exercise demonstrated that explicitly stating what DALP does not do — when framed as "institutions should be wary of vendors that claim to handle everything" — turns honest scoping into a trust signal and a competitive argument. This pattern should be replicated in every proposal where DALP scope ends and integration begins.

### 2. Internal component names are the most natural IP leak vector
The IP stress test (scoring 33 on L1, then 40 on L2) revealed that names like DALPAsset, SMARTConfigurable, and UUPS feel descriptive and useful but leak implementation artifacts. The fix is always plain-language description: "unified token contract," "runtime-configurable feature system." Implementation pattern names (UUPS, RPN) are equally leaky.

### 3. First drafts consistently under-invest in screenshots and client framing
Across all exercises, the weakest L1 categories are Visual/Screenshots and Client Centricity. This means the writing defaults to platform-centric, text-heavy explanation. The rewrite loop consistently improves these, but the fix should be structural: build screenshot selection and client-centric framing into the drafting checklist, not the revision checklist.

### 4. Review loops produce consistent +5 to +7 improvement
Every exercise showed meaningful score improvement from L1 to L2, with deltas ranging from +4 to +7. The review loop is working. The question for Week 2 is whether L1 scores can start higher (above 38) by internalizing rewrite patterns into initial drafts.

### 5. The MR-5 rubric used a different scale
The MR-5 review used a 10-point-per-category scale with 5 categories (total 50) rather than the 5-point-per-category scale with 10 categories. Both produce /50 totals but are not directly comparable at the category level. Standardizing on one rubric format for Week 2 would make trend analysis cleaner.

---

## Calibration Decisions for Week 2

### Scoring standards
Current averages (L2: 42.0) are within the target band (38-44). No scoring recalibration needed. If the Week 2 average exceeds 44, tighten standards per the calibration rules in scorecard.md.

### Process improvements
1. **Add screenshot selection as a drafting step, not a revision step.** Before writing any section, identify 1-2 relevant screenshots from the registry. Embed them during initial drafting.
2. **Open every section with a client-value sentence.** The rewrite pattern that consistently improves Client Centricity scores is: state what the client gets before explaining how the platform works. Make this the default, not the revision.
3. **Standardize the review rubric.** Use the 10-category, 5-point rubric for all exercises going forward (including Mock RFIs).
4. **Target L1 score of 38+.** If L1 scores remain in the 33-36 range by mid-Week 2, revisit the drafting checklist.

### Content improvements to carry forward
- The AC-4 commodities deep-dive (L2, scoring 46) is strong enough to serve as reference material for commodity-specific proposals
- The MR-5 real estate response (L2, scoring 43) demonstrates good capability-boundary framing for similar RFIs
- The IP stress test corrections should be integrated into the standard pre-submission IP checklist workflow

---

## Week 2 Preview

Per the schedule, Week 2 rotates to:
- **Mon PM:** Mock RFI: commodity tokenization (MR-4)
- **Tue PM:** Asset class: real estate (AC-3)
- **Wed PM:** Mock RFI: PE fund tokenization (MR-6)
- **Thu PM:** Asset class: fund units (AC-5)
- **Fri PM:** Mock RFI: CSD digital twin (MR-3)
- **Sat AM:** Asset class: structured products (AC-6)

Focus areas for Week 2: higher L1 scores through front-loading screenshots and client framing; consistent rubric format; competitive positioning improvement.
