# Technical Colossus Build Contract

This is the canonical build path for maximum-depth technical proposals.

## Contract

- Section contract: `legacy/bid-manager/skeletons/1_technical/markdown/technical-colossus.md`
- Locked skeleton reference: `legacy/bid-manager/skeletons/1_technical/docx/technical-colossus.docx`
- Word formatting contract: `legacy/bid-manager/templates/MASTER_TEMPLATE_LOCKED.docx`
- Runtime entry point: `bin/bid-manager technical-colossus-build`

## Rule

For any request phrased as largest technical proposal, maximum technical proposal, full skeleton technical proposal, COLOSSUS technical proposal, or equivalent, use this path before DOCX assembly:

```bash
/root/hermes-workspace/tools/bid-manager/bin/bid-manager technical-colossus-build --contract
/root/hermes-workspace/tools/bid-manager/bin/bid-manager technical-colossus-build --content-md <draft.md> --out-dir <output-dir>
```

The build fails when the drafted Markdown does not satisfy the required heading contract. This prevents fallback paths from silently producing proposal-looking files that do not follow the skeleton.

## Do not use for this case

- ad hoc `python-docx` assembly
- copied previous proposal DOCX files
- old ENBD-specific patch scripts
- generic proposal structures that only resemble the skeleton
- markdown conversion without the heading contract gate
