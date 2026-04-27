# Training Exercise Summary — 2026-03-20 Morning

- **Date:** Friday, March 20, 2026
- **Exercise:** IP Stress Test (Week 1, Friday)
- **Loops:** 2
- **Loop 1 Score:** 33/50
- **Loop 2 Score:** 40/50
- **Delta:** +7

## Key Lesson Learned

**Internal component names are the most common and most natural-feeling IP leak vector.** Names like DALPAsset, SMARTConfigurable, Asset Factory, and UUPS feel descriptive and useful in proposal text, but they violate IP protection rules by exposing implementation artifacts. The fix is always to describe the capability in plain language ("unified token contract," "runtime-configurable feature system," "controlled factory pipeline," "upgradeable proxy contracts") rather than naming the internal component. A secondary lesson: implementation pattern names (UUPS, RPN) are equally leaky even though they're not "component names" per se — they reveal architectural choices that competitors could use to infer the system's design.

## Artifacts
- `loop1-draft.md` — Initial platform capability claims (8 sections)
- `loop1-review.md` — IP audit, writing review, scoring (33/50, 6 IP violations found)
- `loop2-rewrite.md` — Revised claims with all IP violations fixed
- `loop2-review.md` — Re-audit confirming 0 violations, re-scoring (40/50)
