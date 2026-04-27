---
title: "PPTX Review Template"
type: page
source: gbrain-metadata-normalizer
metadata_normalized_at: 2026-04-27T12:36:05.659313Z
---

# PPTX Review Template

## Header Block
- **Deck filename:** [filename.pptx]
- **Review date:** [YYYY-MM-DD]
- **Slide count:** [N]
- **Intended audience:** [if known]
- **Automated inspection summary:**
  - Total slides: [N]
  - Image-heavy slides: [N]
  - Dense text slides: [N]
  - Empty / near-empty slides: [N]
  - Placeholder / leftover slides: [N]
  - Font issues detected: [summary]
  - Brand / template issues detected: [summary]
  - Editability risks detected: [summary]
  - Other key inspection notes: [summary from inspect-pptx.py]

---

## Verdict
**[Approve / Revise / Rebuild]** — [one-line justification]

---

## Score Card
- **Brand Compliance:** [X/5] — [one-line note]
- **Slide Selection:** [X/5] — [one-line note]
- **Text Quality:** [X/5] — [one-line note]
- **Content Accuracy:** [X/5] — [one-line note]
- **Visual Balance:** [X/5] — [one-line note]
- **Narrative Flow:** [X/5] — [one-line note]
- **Audience Fit:** [X/5] — [one-line note]
- **Completeness:** [X/5] — [one-line note]
- **Editability:** [X/5] — [one-line note]
- **Message Hierarchy:** [X/5] — [one-line note]

**Technical/Visual Sub-Score: [X/25]**
**Content/Messaging Sub-Score: [X/25]**
**Total: [X/50]**

---

## Executive Summary
- **Hard failures:** [summary]
- **Highest-risk slides:** [slide numbers]
- **Best quick wins:** [summary]

---

# PPT Output Structure

## Deck-Level Structural Readout
- **Slide size compliance:** [Pass / Fail]
- **Template/layout compliance:** [summary]
- **Agenda integrity:** [summary]
- **Section separator usage:** [summary]
- **Footer/page-number consistency:** [summary]
- **Placeholder fill completeness:** [summary]
- **Image-slot correctness:** [summary]
- **Table fit risk:** [summary]
- **Overflow/density risk:** [summary]
- **Duplicate/repeated structure risk:** [summary]

## Structural Issues to Fix
- **[Critical / Major / Minor]** [issue title] — slides [N] — [specific fix]

## Slide-Level Structure Notes
- **Slide [N]:** [issue] → **Recommendation:** [specific fix]

---

# Content Review

## Messaging and Story Quality
- **Story flow:** [summary]
- **Audience fit:** [summary]
- **Headline quality:** [summary]
- **DALP positioning discipline:** [summary]
- **Repetition/generic filler:** [summary]
- **Evidence/proof quality:** [summary]
- **Screenshot/stock-image relevance:** [summary]

## Content Issues to Fix
- **[Critical / Major / Minor]** [issue title] — slides [N] — [specific fix]

## Actionable Slide Notes
- **Slide [N]:** [issue] → **Recommendation:** [specific fix]

---

## Strengths
- [Strength 1]
- [Strength 2]
- [Strength 3]

---

## Review Metadata
- **Reviewer agent version:** [version]
- **Inspection script version:** [version]
- **DOCX export path:** [path if generated]
- **Files referenced:**
  - `setup/scoring-rubric.md`
  - `setup/review-template.md`
  - `scripts/inspect-pptx.py`
  - `scripts/generate_review.py`
  - `scripts/export_review_docx.py`
