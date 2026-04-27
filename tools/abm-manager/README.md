# abm-manager active runtime

Canonical active runtime surface for SettleMint ABM outreach work.

This directory wires the preserved legacy office-agent assets into the current Hermes workspace without mutating the preserved mirror in `/root/brain/office-agents`.

## Layout

- `legacy/abm-manager/` — preserved source mirror from `/root/brain/office-agents/abm-manager`.
- `active/runtime-scripts/` — wrapper-side smoke/golden/QA helpers.
- `bin/abm-manager` — canonical wrapper CLI.
- `verification/` — smoke and regression outputs.

## Exposed commands

- `abm-manager status` — inventory the active surface.
- `abm-manager smoke` — verify the preserved Python entrypoints compile and the wrapper surface is present.
- `abm-manager golden-regressions` — placeholder regression lane until a real recovered baseline is promoted.
- `abm-manager final-qa` — placeholder QA lane until a full render/review baseline is promoted.
- `abm-manager run-pipeline` — run the recovered ABM pipeline orchestrator.
- `abm-manager abm-for-rep` — generate outreach for one rep's accounts.
- `abm-manager research-account` — run account research only.
- `abm-manager generate-sequences` — generate sequences only.

## Current verification posture

- Preserved legacy mirror linked from `/root/brain/office-agents/abm-manager`.
- Wrapper surface present.
- Smoke validates Python syntax for the recovered entrypoints.
- Golden/QA lanes are present as explicit expected-fail placeholders pending promotion of a real regression harness.

## Rule

The agent name is `abm-manager`.
