# Bid Checker

> **🔴 INTERNAL TERMS STAY INTERNAL (Gyan directive, 2026-03-25):** Never expose skill names, agent names, workflow references, or any internal tool/process names in Slack channels or any user-visible output. Describe WHAT was done, not HOW.

A structured evaluation skill for reviewing bid proposals (RFI/RFP responses) before submission. Evaluates from the perspective of a senior procurement committee member at a regulated financial institution.

## What It Does

Reviews draft proposals across 10 scored dimensions (1–5 each, 50 max) and produces a detailed report with:

- **Dimension scores** with justifications
- **Top strengths** and **critical issues** ranked by impact
- **Section-by-section feedback** with specific rewrite suggestions
- **IP exposure audit**: catches internal tool names, code patterns, and file paths that must never appear in client-facing documents
- **Readability assessment**: sentence length, passive voice, jargon density
- **Shortlist verdict**: Yes / Yes with reservations / No

## Files

| File | Purpose |
|------|---------|
| `SKILL.md` | Core skill definition, identity, framework, process, standards |
| `review-template.md` | Blank template filled out for each review |
| `scoring-rubric.md` | Detailed 1–5 descriptors for all 10 dimensions with examples |
| `ip-checklist.md` | Internal terms that must never appear, with approved replacements |

## How to Invoke

Provide the proposal document (PDF, DOCX, or Markdown) and optionally the original RFI/RFP requirements:

```
Review this proposal: [document]
Original RFI: [requirements document, if available]
```

The reviewer will:
1. Read the full document
2. Run the IP checklist
3. Score all 10 dimensions using the rubric
4. Write section-by-section feedback
5. Deliver the verdict

## Score Interpretation

| Score Range | Meaning |
|-------------|---------|
| 40–50 | Shortlist with confidence |
| 30–39 | Competitive, needs specific fixes |
| 20–29 | Significant rework required |
| 10–19 | Fundamental rethinking needed |
| < 10 | Start over |

## IP Exposure: Automatic Fails

The reviewer runs every proposal against `ip-checklist.md`. Internal framework names (TheGraph, Restate, oRPC, Drizzle, Foundry, etc.), code patterns, and file paths are flagged. Any IP exposure caps the confidentiality score and is marked as a P0 blocker for submission.
