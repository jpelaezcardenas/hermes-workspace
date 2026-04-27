---
title: "TOOLS.md - Word Writer Local Notes"
type: page
source: gbrain-metadata-normalizer
metadata_normalized_at: 2026-04-27T12:36:05.910842Z
---

# TOOLS.md - Word Writer Local Notes

## Primary conversion command
```bash
python3 scripts/markdown_to_docx.py input/file.md output/file.docx
```

## Conversion modes
- `--mode simple` -> clean branded document shell, no built-in cover page content
- `--mode full` -> keeps the full template shell for formal title-page style documents
- `--toc` -> include a generated table of contents
- `--no-toc` -> suppress TOC generation
- `--cover-json '{...}'` -> populate full-template cover fields

## Recommended defaults by document type
- report -> `--mode simple --toc`
- executive memo -> `--mode simple --no-toc`
- structured briefing -> `--mode simple --no-toc` unless long/reference-heavy
- Q&A pack -> `--mode simple --toc` only if many questions/sections
- meeting summary -> `--mode simple --no-toc`
- formal external report -> `--mode full --toc --cover-json ...`

## Template source
- Canonical branded Word template: `pandoc-templates/word.docx`
- No shared fallback template path is active for Word Writer.

## Brand rules
- Figtree font throughout
- SettleMint template styles preserved
- same header/footer and page setup baseline as bid-manager/shared
- same table and heading styling pipeline as the office Word engine

## Operational notes
- Keep markdown source beside the DOCX output for traceability.
- Prefer relative image paths from the markdown file.
- Validate long tables and diagrams in desktop Word before delivery.
- If a TOC is suppressed, the script should not inject one.
