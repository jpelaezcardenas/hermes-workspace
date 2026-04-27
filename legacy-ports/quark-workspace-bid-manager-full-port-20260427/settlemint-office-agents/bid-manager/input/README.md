# Input Folder

Drop RFP, RFI, RFQ, and other bid-related source documents here.

## Supported Formats

- PDF (preferred for original RFX documents)
- DOCX / DOC (Word documents)
- XLSX / CSV (requirements matrices, questionnaires)
- PPTX (presentation-based briefs)
- TXT / MD (plain text requirements)

## Naming Convention

```
{client-slug}_{document-type}_{YYYY-MM-DD}.{ext}
```

Examples:
- `ngex_rfp_2026-03-06.pdf`
- `enbd_rfi-requirements_2026-03-06.xlsx`
- `moj-qatar_rfp-appendix-a_2026-03-06.pdf`

## What Happens Next

1. Documents placed here are analyzed for requirements extraction
2. Requirements are categorized and assessed against DALP capabilities
3. Gap analysis produces confidence-tagged evaluations (🟢🟡🔴⚪)
4. Responses are generated and placed in `../output/`

## ⭐ Best Practice: Share Plain Text Where Possible

For best extraction quality, **share documents as .txt files** rather than PDF.

If you only have a PDF, use a free online converter before sharing:
- **https://pdf2doc.com**: quick and accurate
- **https://smallpdf.com/pdf-to-word**: reliable for complex layouts
- **Copy-paste method**: open the PDF, select all text, paste into a .txt file

Plain text avoids OCR errors, formatting artifacts, and missed content that can degrade proposal quality.

PDF is still accepted as a fallback. When PDF is received, the system will attempt text extraction automatically and flag any gaps.

## Important

- Keep original documents unmodified in this folder
- Do not delete input documents after processing (they serve as the audit trail)
- For multi-document RFPs, prefix all related files with the same client slug
