# Scripts

This directory contains legacy utilities from the previous RFP Forge model.

## Current Status

The agent has been overhauled from an **RFP responder** into an **RFP generator**. These scripts were designed for the old responder workflow and are retained only to avoid breaking existing dependencies while the new generator-side tooling is designed.

## Files

- `extract-rfp.py` — legacy extraction utility from the old response workflow
- `write-response.py` — tombstoned legacy write-back utility from the old response workflow; canonical generation must write only under `rfp-forge/output/`

## Important Note

Do **not** rely on these scripts as the canonical workflow for the new RFP Forge purpose.

They require a future rewrite to support:
- institution dossier intake
- document structure selection
- buyer-side procurement document assembly
- DOCX-first generation workflow
- institution-specific output packaging

## Interim Rule

Keep the scripts intact for now. Do not remove or refactor them as part of this overhaul unless explicit approval is given for a dedicated tooling rewrite.

## Legacy Usage

These commands reflect the old response-oriented workflow and are documented only for reference:

```bash
python3 scripts/extract-rfp.py input/<file>
# deprecated: no canonical usage; legacy write-back path has been disabled
```