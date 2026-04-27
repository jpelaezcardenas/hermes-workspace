# bid-manager active runtime

Canonical active runtime surface for SettleMint bid/RFP/proposal work.

This directory wires the preserved legacy office-agent assets into the current Hermes workspace without changing the byte-for-byte mirror in `/root/brain/office-agents`.

## Layout

- `legacy/bid-manager/` — recovered Bid Manager operational root.
- `legacy/bid-checker/` — recovered review/checking root.
- `legacy/rfp-forge/` — recovered RFP/RFI/tender generation root.
- `legacy/shared/` — recovered shared office templates/assets.
- `active/` — stable convenience links, fixtures, and active runtime scripts used by the wrapper CLI.
- `bin/bid-manager` — canonical wrapper CLI.
- `verification/` — parity and smoke-test outputs.

## Exposed checks

The active wrapper now exposes:

- `bid-manager skeleton-audit --json` — checks recovered skeleton-family coverage.
- `bid-manager golden-regressions --json` — runs curated converter/checker/regression cases and classifies known legacy fail baselines.
- `bid-manager e2e-regression --json` — runs a compact RFP Forge → Bid Manager → Bid Checker regression.
- `bid-manager full-regression --json` — converts full technical and commercial proposal skeletons, opens the DOCX packages, renders them to PDF through LibreOffice, and checks PDF openability/page counts.
- `bid-manager questionnaire-regression --json` — fills an official-style XLSX questionnaire fixture, preserves package parts, verifies row counts/statuses/evidence, leaves buyer-only remarks untouched, and renders through LibreOffice.
- `bid-manager agent-contract-audit --json` — verifies active user-facing runtime surfaces do not expose conflicting agent names.
- `bid-manager forge-generate-mea` — regenerates the recovered MEA RFP/RFI bank.

Current regression posture:

- Skeleton coverage: 7/7 families OK.
- Golden regressions: 14/14 cases matched expectation.
- Compact end-to-end regression: 5/5 cases passed.
- Full technical/commercial render regression: 4/4 commands and 4/4 artifact gates passed; rendered PDFs were 40 and 42 pages.
- Official-style questionnaire row-fill regression: passed; 3/3 responses, statuses, and evidence cells filled; buyer-only remarks untouched; package parts preserved; LibreOffice render passed.
- Agent contract audit: passed; no active conflicting user-facing names found.
- Known expected fail baselines: generic compact proposal visual validator failure.

## Rule

The agent name is `bid-manager`. Names like proposal-maker/proposal-factory/proposal-stack are not agent identities.
