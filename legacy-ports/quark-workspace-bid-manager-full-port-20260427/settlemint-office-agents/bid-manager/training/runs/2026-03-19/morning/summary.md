# Training Exercise Summary

**Date**: 2026-03-19 (Thursday)
**Exercise**: Content refresh: sections 7–8
**Week**: 1 of 4-week rotation
**Slot**: 10:00 morning (2 review loops)

## Scores

| Loop | Score |
|------|-------|
| Loop 1 | 34/50 |
| Loop 2 | 39/50 |
| **Delta** | **+5** |

## Key Changes Applied to Canonical Content

### Section 7 (Commercial Proposal)
- Fixed IP leaks: removed oRPC, Grafana, VictoriaMetrics, Loki, Tempo references
- Refreshed exec summary with buyer-first framing
- Added methodology qualifiers to ROI claims
- Removed specific pricing figures (€25K/€10K) that violated IP protection

### Section 8 (RFI Response Bank)
- Fixed 12+ IP leaks: removed oRPC, Restate (×4), Better Auth (×2), Drizzle, Grafana (×3), VictoriaMetrics (×2), Loki (×2), Tempo (×2)
- All observability tool names replaced with capability descriptions
- All workflow engine references genericized
- All authentication library names removed

## Key Lesson

**IP protection leaks compound invisibly in reusable content.** Internal implementation names (ORMs, workflow engines, RPC frameworks, monitoring tools, auth libraries) naturally flow into text when writing with full codebase access. They accumulated to 12+ leaks across 40 RFI answers. The fix is a writing discipline: describe capabilities at the "what it does" level from the first draft, not just as a final-pass cleanup.

## Files Modified

- `content/07-commercial-proposal/main.md` — 2 IP fixes
- `content/08-rfi-response-bank/main.md` — 12 IP fixes
- `training/scorecard.md` — 2 new entries
