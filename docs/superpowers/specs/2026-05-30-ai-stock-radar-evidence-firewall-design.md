# AI Stock Radar Evidence Firewall Design

Date: 2026-05-30
Status: approved for implementation
Workspace: `/Users/zondrius/hermes-workspace`

## Summary

Phase 6 improves `AI_STOCK_RADAR` by reducing false positives before adding any new bullish signal weight. It adds an Evidence Firewall that decodes filing events, checks basic SEC companyfacts fundamentals, creates concrete review actions, and blocks weak or risky candidates from promotion.

## Design

- Filing Event Decoder: classify SEC filing descriptions and item codes into positive catalysts, caution events, and hard blockers. Good events include material agreements, customer/contract evidence, earnings/guidance context, and M&A context. Risk events include offerings, warrants, going concern, reverse splits, delisting/non-compliance, shell/SPAC language, and weak security structures.
- Fundamental Snapshot: use SEC companyfacts when available to estimate revenue trend, cash runway, operating cash burn, and share-count dilution trend. Missing facts stay explicit and cannot create a positive signal.
- Evidence Firewall: combine filing events, fundamental snapshot, existing quality notes, and structure risks into a `firewall.verdict` of `pass`, `caution`, or `reject`. The firewall can add score penalties, cap category, add risk flags, and set a safe `review_action`.
- Recommendation Contract: recommendations are research workflow actions only: `VERIFY_CATALYST`, `CHECK_DILUTION`, `WAIT_FOR_CONFIRMATION`, `DOWNGRADE_REVIEW`, or `ARCHIVE_REVIEW`. No buy/sell/option/leverage language is allowed.
- S-Tier Gate: an `S` grade remains impossible unless the firewall verdict is `pass`, data quality is A/B, catalyst quality is hard, price/volume confirmation is positive, and no severe risk flags exist.

## Data Sources

- SEC EDGAR submissions and companyfacts APIs via `data.sec.gov`, without API keys.
- Nasdaq Symbol Directory for listed common-equity universe hygiene.
- FINRA short interest only as optional risk context, never as a bullish squeeze trigger.

## Acceptance Criteria

- Watchlist candidates include `evidence_firewall`, `fundamental_snapshot`, and `review_action`.
- Daily report includes an `Evidence Firewall` section with verdicts and concrete safe review actions.
- Weekly calibration summarizes firewall verdicts and highlights reject/caution clusters.
- Name-only AI, dilution, reverse split, going concern, delisting, shell/SPAC, and weak cash runway cannot become `A` or `S`.
- Tests cover filing event decoding, companyfacts fundamentals, firewall penalties/caps, report rendering, and safe language.
