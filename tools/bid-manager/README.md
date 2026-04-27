# bid-manager active runtime

Canonical active runtime surface for SettleMint bid/RFP/proposal work.

This directory wires the preserved legacy office-agent assets into the current Hermes workspace without changing the byte-for-byte mirror in `/root/brain/office-agents`.

## Layout

- `legacy/bid-manager/` — recovered Bid Manager operational root.
- `legacy/bid-checker/` — recovered review/checking root.
- `legacy/rfp-forge/` — recovered RFP/RFI/tender generation root.
- `legacy/shared/` — recovered shared office templates/assets.
- `active/` — stable convenience links used by the wrapper CLI.
- `bin/bid-manager` — canonical wrapper CLI.
- `verification/` — parity and smoke-test outputs.

## Rule

The agent name is `bid-manager`. Names like proposal-maker/proposal-factory/proposal-stack are not agent identities.
