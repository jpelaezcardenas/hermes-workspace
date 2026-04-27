# Conversion Scripts

File format conversion utilities for the bid-manager pipeline. These handle the input→processing→output conversions so the agent works with markdown internally but delivers professional DOCX/XLSX output.

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| **markitdown** | Microsoft | DOCX/XLSX/PDF/PPTX → Markdown (CLI at `/Users/quark/Library/Python/3.14/bin/markitdown`) |
| **python-docx** | installed | Markdown → DOCX generation |
| **openpyxl** | installed | XLSX read/write, CSV → XLSX conversion |

## Scripts

### `docx_to_markdown.py`: DOCX → Markdown

Uses Microsoft's markitdown for high-fidelity conversion.

```bash
# Basic: writes output.md alongside input
python3 scripts/docx_to_markdown.py input/rfp-document.docx

# Custom output path
python3 scripts/docx_to_markdown.py input/rfp-document.docx input/rfp-document-converted.md
```

### `xlsx_to_csv.py`: XLSX → CSV

Default mode uses openpyxl for clean structured CSV (best for questionnaires). Optional `--markitdown` flag uses markitdown for markdown table output (better for documents with formatting context).

```bash
# Default (openpyxl): clean CSV output
python3 scripts/xlsx_to_csv.py input/questionnaire.xlsx

# Custom output path
python3 scripts/xlsx_to_csv.py input/questionnaire.xlsx input/questionnaire.csv

# Markitdown mode: markdown tables, richer formatting
python3 scripts/xlsx_to_csv.py input/questionnaire.xlsx input/questionnaire.md --markitdown
```

Multi-sheet XLSX files: in openpyxl mode, sheets are separated by a `## Sheet: {name}` header row and a blank line.

### `markdown_to_docx.py`: Markdown → DOCX

Uses python-docx to build a properly formatted Word document. Handles headings (H1-H4), paragraphs, bold, italic, bullet lists, numbered lists, and pipe-delimited markdown tables.

Font: Figtree (if available in system fonts or `~/Public/quark/workspace/assets/fonts/figtree/`), falls back to Calibri.

```bash
# Basic: writes output.docx alongside input
python3 scripts/markdown_to_docx.py output/proposal.md

# Custom output path
python3 scripts/markdown_to_docx.py output/proposal.md output/proposal-final.docx
```

### `csv_to_xlsx.py`: CSV → XLSX

Uses the approved locked questionnaire workbook template. It clones `skeletons/5_questionnaire/excel/settlemint-questionnaire-template.xlsx`, clears the sample rows on the `Response` sheet, writes the CSV data into the approved columns, and fails closed if the workbook contract deviates from the template.

```bash
# Basic: writes output.xlsx alongside input
python3 scripts/csv_to_xlsx.py output/questionnaire-answers.csv

# Custom output path
python3 scripts/csv_to_xlsx.py output/questionnaire-answers.csv output/questionnaire-final.xlsx
```

## Pipeline Flow

```
INPUT                    INTERNAL              OUTPUT
─────                    ────────              ──────
.docx  ─→ markitdown ─→  .md  ─→ python-docx ─→  .docx
.xlsx  ─→ openpyxl   ─→  .csv ─→ locked template clone + validation ─→  .xlsx
.pdf   ─→ markitdown ─→  .md  (read-only, no PDF output)
```

## Canonical runtime outputs

All generated DOCX/XLSX deliverables must be written under `settlemint-office-agents/bid-manager/output/`. The conversion scripts now fail closed if asked to write elsewhere, and they append model/failover build metadata under `bid-manager/output/`.
