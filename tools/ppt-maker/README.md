# ppt-maker active runtime

Canonical active runtime surface for SettleMint PowerPoint/deck work recovered from the legacy office-agent setup.

This directory wires the preserved legacy office-agent assets into the current Hermes workspace without changing the preserved mirror in `/root/brain/office-agents`.

## Layout

- `legacy/ppt-maker/` — recovered PPT Maker operational root.
- `legacy/ppt-checker/` — recovered PPTX review/checking root.
- `bin/ppt-maker` — canonical wrapper CLI.
- `active/runtime-scripts/` — active regression scripts that do not mutate the legacy mirror.
- `verification/` — parity and smoke-test outputs.

## Exposed commands

- `ppt-maker status` — inventory recovered surfaces.
- `ppt-maker smoke` — verify scripts, template, slide bank, and Python syntax.
- `ppt-maker build-config <config.json>` — run the recovered canonical builder.
- `ppt-maker inspect <deck.pptx> --json` — run recovered PPT checker inspection.
- `ppt-maker validate <deck.pptx>` — run recovered deck validation.
- `ppt-maker render-pdf <deck.pptx> [out-dir]` — render a PPTX to PDF through LibreOffice.
- `ppt-maker golden-regressions --json` — build, inspect, validate, render, image-render, and gate a DALP overview deck fixture.

## Current verification posture

- Preserved surfaces copied: `ppt-maker` and `ppt-checker`.
- Legacy inventory: 2,237 PPT Maker files and 50 PPT Checker files.
- Slide bank: 22 PPTX slide templates present.
- Master template: `Master Template 2026.pptx` present.
- Smoke: passed.
- Golden regressions: 6/6 command cases passed and 2/2 artifact gates passed.
- Generated fixture: 10-slide DALP overview deck, valid PPTX, rendered PDF with 10 pages, first slide image render passed.

## Rule

The active wrapper name for this port is `ppt-maker`, matching the preserved office-agent surface the user asked to port. Historical references to `ppt-builder` or `deck-manager` are treated as legacy naming context, not active runtime commands.
