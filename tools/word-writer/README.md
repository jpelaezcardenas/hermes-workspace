---
title: "Word Writer Runtime"
type: index
---

# Word Writer Runtime

This directory is the active runtime surface for the preserved Word Writer office agent.

## What it does
- Converts Word-compatible markdown into DOCX
- Preserves the recovered Word Writer template and validation pipeline
- Exposes a stable executable entrypoint at `bin/word-writer`

## Verified command
- `./bin/word-writer smoke`
- `./bin/word-writer markdown-to-docx test-input.md output/test-input.docx --mode simple --no-toc`

## Notes
- The preserved agent content remains in this tree.
- Shared validation helpers are resolved from the workspace-level shared surface.
- The active runtime is intentionally minimal for now: one wrapper and one documented conversion path.
