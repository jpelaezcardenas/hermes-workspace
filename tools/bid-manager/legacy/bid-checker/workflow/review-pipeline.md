# Proposal Review Pipeline

1. Intake the markdown or DOCX proposal to review.
2. Run `scripts/validate_proposal.py <file>` to generate a machine-readable baseline report.
3. Read the canonical setup sequence from `AGENTS.md` before scoring.
4. Perform the four review passes: skim, score, IP audit, section-by-section review.
5. Cross-check against the original client document when available.
6. Write the final review using the configured review template.
7. Save outputs in `output/` and log durable lessons in `feedback/lessons.md`.
