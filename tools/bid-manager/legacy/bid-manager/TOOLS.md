# TOOLS.md: Bid Manager Tools

## Document Conversion

The bid-manager uses python-docx and openpyxl for all document conversion. **Pandoc is not used.**

### Canonical Conversion Pipeline

| Script | Direction | Engine | Template |
|--------|-----------|--------|----------|
| `scripts/docx_to_markdown.py` | DOCX → Markdown | markitdown (Microsoft) | - |
| `scripts/markdown_to_docx.py` | Markdown → DOCX | python-docx | `templates/MASTER_TEMPLATE_LOCKED.docx` |
| `scripts/xlsx_to_csv.py` | XLSX → CSV | openpyxl (default) or markitdown (`--markitdown`) | - |
| `scripts/csv_to_xlsx.py` | CSV → XLSX | openpyxl | `skeletons/5_questionnaire/excel/settlemint-questionnaire-template.xlsx` |

### Usage

```bash
# DOCX → Markdown
python3 scripts/docx_to_markdown.py input/rfp.docx

# Markdown → DOCX (with cover page fields)
python3 scripts/markdown_to_docx.py output/proposal.md [output/proposal.docx] \
  [--cover-json '{"company": "...", "title": "...", "subtitle": "...", "valid_until": "...", "contact_name": "...", "contact_title": "...", "contact_email": "...", "contact_phone": "..."}']

# XLSX → CSV
python3 scripts/xlsx_to_csv.py input/questionnaire.xlsx

# CSV → XLSX (locked template clone)
python3 scripts/csv_to_xlsx.py output/answers.csv
```

The `markdown_to_docx.py` converter (python-docx):
- Uses `templates/MASTER_TEMPLATE_LOCKED.docx` as the base template (Figtree font, SettleMint styles)
- Auto-detects and renders Mermaid code blocks to embedded PNG via `mmdc`
- Auto-inserts a native Word TOC after the cover page
- Populates cover page fields via `--cover-json`
- Validates output against the locked template signature before returning success
- Prevents empty pages between sections

See `scripts/README.md` for full documentation.

## Mermaid Rendering

- CLI: `mmdc` (mermaid-cli 11.12.0, globally installed)
- Chrome: Puppeteer with Chrome for Testing (headless)
- Config: `scripts/puppeteer-config.json` (required for macOS, explicit Chrome path + no-sandbox)
- SVG: preferred for Word embedding (vector, scales perfectly)
- PNG: fallback at scale=3 (~216 DPI); scale=4 crashes on macOS arm64
- The `markdown_to_docx.py` converter auto-detects Mermaid blocks and renders them inline as PNG images

## Diagram Rendering (Additional)

- Mermaid → PNG/SVG: `python3 scripts/mermaid_to_images.py input.md [output_dir]`
- Mermaid syntax check: `python3 scripts/mermaid_to_images.py --check input.md`
- PlantUML → PNG/SVG: `python3 scripts/plantuml_to_images.py input.md [output_dir]`
- Unified renderer: `python3 scripts/diagram_renderer.py input.md [output_dir]`

## Validation

- Format validator: `python3 scripts/proposal_format_validator.py output/proposal.md`

## Knowledge Sources

See `AGENTS.md` → "Knowledge Sources" for the full ranked list. Key sources:

- **Content sections**: `content/`: 18 DALP knowledge domains
- **DALP Product Docs**: `~/dalp/kit/dapp/content/docs/`: 199 .mdx files
- **Capability Mapping**: `~/Public/quark/workspace/product/dalp/capability-mapping/`
- **DALP Narrative**: `~/Public/quark/workspace/notion/dalp-narrative.md`
- **Competitor Dossiers**: `~/Public/quark/workspace/product/dalp/competitors/`

## Internal Resources

| Resource | Path | Purpose |
|----------|------|---------|
| Skeletons | `skeletons/` | Structural templates for each output type |
| Reusable Blocks | `reusable/` | Pre-written content blocks for insertion |
| Templates | `templates/` | Document templates, MASTER_TEMPLATE_LOCKED.docx, section content |
| Content Sections | `content/` | DALP deep-dive knowledge (18 domains) |
| Setup/Config | `setup/` | Writing style, formatting, compliance rules, win themes, best practices |
| Feedback | `feedback/` | Lessons learned, feedback log |
| Conversion Scripts | `scripts/` | DOCX↔MD, XLSX↔CSV, diagram renderers |
| Workflow | `workflow/` | Pipeline definitions, detection keywords, naming conventions |

## External Skills (from Quark workspace)

- Sales Enablement: `skills/sales-enablement/SKILL.md`
- Marketing Psychology: `skills/marketing-psychology/SKILL.md`
- Competitor Alternatives: `skills/competitor-alternatives/SKILL.md`
- Pricing Strategy: `skills/pricing-strategy/SKILL.md`
- Copywriting: `skills/copywriting/SKILL.md`

## Notes

- Brand font: Figtree (available in `~/Public/quark/workspace/assets/fonts/figtree/`)
- Always maintain .md and .csv as mother formats
- Derivative formats (DOCX, XLSX) generated on demand via canonical converters, never edited directly
- markitdown CLI: `/Users/quark/Library/Python/3.14/bin/markitdown`


