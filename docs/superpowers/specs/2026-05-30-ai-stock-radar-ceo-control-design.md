# AI Stock Radar CEO Control Design

Date: 2026-05-30
Status: approved for implementation
Workspace: `/Users/zondrius/hermes-workspace`

## Summary

Phase 7 adds a CEO Control layer to `AI_STOCK_RADAR`. The layer does not create trading advice. It makes Hermes more precise by checking every candidate against a conservative risk profile, attaching a source-confidence ledger, learning false-positive patterns, and auditing whether Phase 5 and Phase 6 are fully integrated.

## Design

- Risk Profile Layer: store a default conservative research profile in `projects/ai-stock-radar/risk-profile.json`. It controls which risk flags block focus status, which review actions are allowed, and when a candidate is only monitor/review/archive.
- Source Confidence Ledger: every watchlist candidate gets a compact ledger separating facts, interpretations, missing data, and derived risk judgments. This prevents a score from hiding weak evidence.
- False-Positive Memory: daily and weekly runs summarize recurring reject/caution patterns such as name-only AI, delisting, offerings, dilution, cash runway, and revenue decline. The memory is used for calibration, not automatic trading.
- CEO Lanes: candidates are labeled `focus`, `monitor`, `manual_review`, or `reject`. Current safety rules make `focus` rare and only possible for pass/firewall candidates with strong evidence and no blocking risk.
- Integration Audit: write a small audit report that checks whether the S/A/B/C/X grading, price/volume confirmation, Evidence Firewall, weekly summaries, prompts, skills, and cron prompts are present.

## Recommendation Contract

Hermes may recommend workflow actions only:

- `CEO_VERIFY`
- `CEO_MONITOR`
- `CEO_REVIEW_RISK`
- `CEO_ARCHIVE_REVIEW`

Hermes must not recommend buying, selling, options, leverage, margin, broker activity, or certainty language.

## Acceptance Criteria

- Watchlist candidates include `ceo_control` and `source_confidence`.
- Daily reports include `CEO Control` and `Source Confidence Ledger` sections.
- Weekly reports include `CEO Control Summary` and `False Positive Memory`.
- `projects/ai-stock-radar/false-positive-memory.json` is updated from watchlist patterns.
- `reports/ai-stock-radar/ai-stock-radar-ceo-audit-YYYY-MM-DD.md` checks prior integration.
- Tests cover risk profile fit, source-confidence ledger, false-positive memory, integration audit, daily rendering, and weekly rendering.
