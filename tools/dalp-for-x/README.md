# dalp-for-x active runtime

Canonical active runtime surface for the DALP for X audience-positioning pages.

This runtime preserves the recovered legacy source under `legacy/dalp-for-x/` and exposes a small verified wrapper for operator checks and regression gates.

## Layout

- `legacy/dalp-for-x/` — preserved legacy source mirror.
- `bin/dalp-for-x` — canonical wrapper CLI.
- `verification/` — local verification outputs.

## Exposed checks

- `dalp-for-x status` — reports recovery and source inventory facts.
- `dalp-for-x smoke` — validates the preserved source tree and sample JSON content.
- `dalp-for-x golden-regressions` — checks the registry and backfill queue for the preserved published/done state.

## Current posture

- Legacy source preserved: yes.
- Active wrapper: yes.
- Smoke check: available.
- Golden regression check: available.

## Notes

The preserved source remains the authoritative content base. This active surface is for verification and operator plumbing around that source.
