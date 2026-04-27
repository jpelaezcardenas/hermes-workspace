# blog-writer active runtime

Canonical active runtime surface for SettleMint blog writing work recovered from the preserved office-agent mirror.

This directory wires the preserved legacy office-agent assets into the current Hermes workspace without mutating the preserved mirror in `/root/brain/office-agents`.

## Layout

- `legacy/blog-writer/` - preserved source mirror from `/root/brain/office-agents/blog-writer`.
- `active/runtime-scripts/` - wrapper-side smoke, regression, and QA helpers.
- `bin/blog-writer` - canonical wrapper CLI.
- `verification/` - smoke and regression outputs.

## Exposed commands

- `blog-writer status` - inventory the active surface.
- `blog-writer smoke` - verify the preserved source files and wrapper surface are present.
- `blog-writer golden-regressions` - run curated content-rule regressions against the recovered canon.
- `blog-writer final-qa` - run the final output gate for article-ready content rules.

## Current verification posture

- Preserved legacy mirror linked from `/root/brain/office-agents/blog-writer`.
- Wrapper surface present.
- Smoke validates the source files, canonical name, and core rule set.
- Golden and QA lanes are present as executable regression checks.

## Rule

The active wrapper name for this port is `blog-writer`.
