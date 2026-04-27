---
title: "PPT Review Pipeline"
type: page
source: gbrain-metadata-normalizer
metadata_normalized_at: 2026-04-27T12:36:05.661805Z
---

# PPT Review Pipeline

1. Intake the target `.pptx` into `input/` or reference its absolute path.
2. Run `scripts/inspect-pptx.py --json <deck>` and retain the machine-readable output.
3. Read the setup standards before scoring: brand, content, design, and technical checks.
4. Perform manual slide-by-slide review for narrative, audience fit, and message hierarchy.
5. Produce the written review using `setup/review-template.md`.
6. Preferred automation path: `scripts/generate_review.py <deck> --output-md <file> --output-json <file>`.
7. If DOCX delivery is needed, export via `scripts/export_review_docx.py <review.md> <review.docx>`. This uses the same base DOCX template as bid-manager and then strips the cover/confidentiality front matter for PPT reviews.
6. Save the final review in `output/` with a descriptive filename.
7. Record durable lessons in `feedback/lessons.md` when a repeatable pattern is found.
