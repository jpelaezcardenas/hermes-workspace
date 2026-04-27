# comparison-webmaster

Active runtime surface for the preserved SettleMint comparison-webmaster lane.

What it does
- validates seeded competitor comparison content
- generates local draft payloads only
- runs smoke and golden structural checks
- never publishes to HubSpot from this surface

Canonical wrapper
- /root/hermes-workspace/tools/comparison-webmaster/bin/comparison-webmaster

Commands
- validate
- draft
- smoke
- golden

Legacy upstream
- /root/hermes-workspace/tools/competitor-comparison-publisher

Notes
- This runtime keeps the preserved comparison-webmaster name available without breaking the existing publisher wrapper.
- It is intentionally local-only and safe for unattended verification runs.
