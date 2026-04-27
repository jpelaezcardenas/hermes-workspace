---
title: "Processing Pipeline"
type: page
source: gbrain-metadata-normalizer
metadata_normalized_at: 2026-04-27T12:36:05.923315Z
---

# Processing Pipeline

## End-to-end flow
1. Understand the request and delivery context.
2. Complete the intake check: objective, audience, sensitivity, and delivery need.
3. Identify the document type.
4. Choose the structure, template, mode, and TOC behavior.
5. Draft in Word-compatible markdown.
6. Prepare assets, images, and diagrams only if they materially help.
7. Run a pre-conversion draft check before generating the DOCX.
8. Convert to DOCX using the shared template pipeline.
9. Require a successful converter exit and template-signature validation. If the DOCX is missing or validation fails, the task is not complete and must not be delivered as markdown only.
10. Validate TOC behavior, tables, diagrams, page boundaries, and empty pages.
11. Review the DOCX in Word.
12. Deliver the DOCX and retain the markdown source.

## Additional rules
- If the document is short and decision-led, do not force a TOC.
- If the document is multi-section and reference-heavy, include a TOC.
- If diagrams are not clearly improving comprehension, cut them.
- Always review the DOCX output before final delivery.
- If the document includes sensitive material, confirm the audience actually needs it.

## Request -> draft -> DOCX -> delivery checklist
- Request understood
- Format chosen
- Draft structured
- Evidence and confidentiality checked
- DOCX converted
- DOCX passed template-signature validation
- DOCX visually reviewed
- Files named cleanly
- Final delivered
