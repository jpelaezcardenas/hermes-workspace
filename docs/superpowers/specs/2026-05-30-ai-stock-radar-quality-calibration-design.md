# AI Stock Radar Quality Calibration Design

Date: 2026-05-30
Status: implementing
Workspace: `/Users/zondrius/hermes-workspace`

## Summary

Phase 4 improves the radar's judgement after Phase 3 live discovery. The radar can now find live Nasdaq/SEC candidates, but live discovery can still surface noisy names that contain `.ai`, `AI`, or `robotics` without enough public evidence. Phase 4 adds a quality gate, better filing-catalyst labels, watchlist aging, and a weekly calibration report that records likely false positives.

The goal is fewer, better candidates. The system remains read-only and does not add broker, paid-provider, or trade-alert behavior.

## Components

- `scripts/ai-stock-radar-quality-rules.mjs`
  - Scores name/noise risk, security-structure risk, filing-risk labels, watchlist aging, and false-positive candidates.
  - Exports reusable rules for daily scoring and weekly calibration.

- `scripts/ai-stock-radar-quality-rules.test.mjs`
  - Covers `.ai`/name-only noise, warrants/units, penny-like warnings, offering/going-concern labels, and stale-candidate aging.

- `scripts/ai-stock-radar-live-discovery.mjs`
  - Applies quality rules to live evidence records.
  - Adds catalyst labels from SEC form metadata and security names.

- `scripts/ai-stock-radar-free-signal-engine.mjs`
  - Penalizes noisy records and marks weak evidence as `Avoid` or `Early Watch`.
  - Carries `age_days`, `status`, and quality notes into watchlist records.

- `scripts/ai-stock-radar-weekly-calibration.mjs`
  - Produces a weekly report that groups candidates into keep, downgrade, archive, and false-positive review buckets.

## Rules

- Name-only AI evidence is weak unless supported by seed themes, hard catalyst labels, or SEC/source breadth.
- Security names containing warrants, units, rights, preferred shares, funds, or ETFs remain excluded.
- Risk labels such as `offering_watch`, `going_concern_watch`, `reverse_split_watch`, `shell_or_spac_watch`, `microcap_like_watch`, and `name_only_ai_watch` reduce score and can force `Avoid`.
- A candidate with score below 55 or data quality `C/D` ages toward `stale`.
- A candidate with repeated name-only evidence and no hard catalyst becomes a false-positive review candidate in the weekly report.

## Acceptance Criteria

- All AI radar tests pass.
- Live report still runs with `Discovery mode: live`.
- No candidate can become `Breakout Watch` from name-only AI evidence.
- Weekly calibration report can be generated without network access.
- Daily and weekly prompts mention quality filters, aging, and false-positive review.
