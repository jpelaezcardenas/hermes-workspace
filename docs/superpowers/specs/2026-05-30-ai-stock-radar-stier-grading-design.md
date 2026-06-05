# AI Stock Radar S-Tier Grading Design

Date: 2026-05-30
Status: implementing
Workspace: `/Users/zondrius/hermes-workspace`

## Summary

Phase 5 upgrades `AI_STOCK_RADAR` from scored lists to decision-quality research cards. The radar adds an explicit `idea_grade` (`S`, `A`, `B`, `C`, `X`) and an optional free price/volume confirmation layer. The grade is not a trade recommendation; it is a research-quality label that combines evidence, data quality, catalysts, risk flags, and price/volume context.

## Design

- `S`: rare. Requires high score, A/B data quality, hard or high-quality catalyst evidence, no severe quality flags, and positive price/volume confirmation.
- `A`: strong research candidate with A/B data quality and either catalyst strength or price/volume confirmation.
- `B`: plausible watch candidate with useful evidence but meaningful gaps.
- `C`: low-confidence watch or noisy candidate.
- `X`: avoid/reject bucket for `Avoid`, name-only AI evidence, severe filing/security risks, or very weak score.

Price/volume uses an optional free source (`Stooq`) as a confirmation layer only. It may upgrade market-momentum context, but it cannot by itself create `S` or override weak fundamentals, source gaps, or risk flags.

## Acceptance Criteria

- Daily reports show `Idea Grade` beside score and data quality.
- Watchlist records include `idea_grade`, `grade_reasons`, and `price_volume` where available.
- If free price data is unavailable, Hermes reports the gap and continues.
- Weekly calibration groups candidates by grade and still highlights false positives.
- Tests cover grade rules, Stooq CSV parsing, price/volume metrics, and safe fallback.
