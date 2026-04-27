---
title: "Scripts"
type: index
source: gbrain-metadata-normalizer
metadata_normalized_at: 2026-04-27T12:36:05.915820Z
---

# Scripts

## markdown_to_docx.py
Generic Word Writer conversion pipeline.

Features:
- Word-compatible markdown to DOCX
- H1-H4 headings
- bullets and numbered lists
- markdown tables with branded header styling
- Mermaid diagram rendering and insertion
- centered image insertion and captions
- optional generated table of contents
- empty-page prevention cleanup
- optional formal full-template mode with cover-page field population

Quick preflight:
```bash
python3 -c "import docx; print('python-docx: OK')"
command -v mmdc >/dev/null && echo "mmdc: OK" || echo "mmdc: missing (only required for Mermaid diagrams)"
```

Examples:
```bash
python3 scripts/markdown_to_docx.py output/sample-report.md output/sample-report.docx --mode simple --toc
python3 scripts/markdown_to_docx.py output/executive-memo.md output/executive-memo.docx --mode simple --no-toc
python3 scripts/markdown_to_docx.py output/formal-report.md output/formal-report.docx --mode full --toc --cover-json '{"company":"SettleMint","title":"Quarterly Research Brief","subtitle":"Q1 2026","valid_until":"15 March 2026","contact_name":"Roderik van der Veer","contact_title":"Founder & CTO","contact_email":"hello@settlemint.com","contact_phone":"+32 ..."}'
```

Notes:
- `--no-toc` should be used for short memos, meeting summaries, compact briefings, and most status updates.
- `--mode full` is for formal title-page documents only.
- If the markdown uses Mermaid, confirm `mmdc` is available before conversion.
- Always open the generated DOCX in Word for QA.
