# Bid Manager overnight parity report — 2026-04-27

## Verdict
GREEN. The active bid-manager runtime is operationally at parity with the copied office-agent bid-manager baseline for the tested surfaces. The final verification stack passed end-to-end after repairing the local runtime dependency path for MarkItDown DOCX conversion and installing missing system Python Office libraries.

No external messages were sent.

## Baseline and active inventory
- Legacy/copy baseline checked: /root/brain/office-agents/bid-manager
- Optional copied workspace checked: /tmp/quark-workspace-april-2026/settlemint-office-agents/bid-manager
- Active runtime checked: /root/hermes-workspace/tools/bid-manager
- Canonical wrapper checked: /root/hermes-workspace/tools/bid-manager/bin/bid-manager
- Baseline files: 2545
- Active legacy bid-manager mirror files: 2657
- Missing files from active legacy bid-manager mirror versus /root/brain baseline: 0
- Active full runtime files: 5686

## Commands exposed
- agent-contract-audit
- check-proposal
- csv-to-xlsx
- docx-to-md
- e2e-regression
- final-artifact-qa
- forge-extract
- forge-generate-mea
- forge-write
- full-regression
- golden-regressions
- md-to-docx
- questionnaire-regression
- render-mermaid
- render-plantuml
- skeleton-audit
- validate
- xlsx-to-csv

## Final verification results
- status: exit 0 (2026-04-27T21:16:52Z to 2026-04-27T21:16:52Z)
- smoke: exit 0 (2026-04-27T21:16:52Z to 2026-04-27T21:16:52Z)
- skeleton-audit --json: exit 0 (2026-04-27T21:16:52Z to 2026-04-27T21:16:52Z)
- golden-regressions --json: exit 0 (2026-04-27T21:16:52Z to 2026-04-27T21:17:27Z)
- e2e-regression --json: exit 0 (2026-04-27T21:17:27Z to 2026-04-27T21:17:30Z)
- full-regression --json: exit 0 (2026-04-27T21:17:30Z to 2026-04-27T21:17:50Z)
- questionnaire-regression --json: exit 0 (2026-04-27T21:17:50Z to 2026-04-27T21:17:52Z)
- agent-contract-audit --json: exit 0 (2026-04-27T21:17:52Z to 2026-04-27T21:17:52Z)
- final-artifact-qa --json: exit 0 (2026-04-27T21:17:52Z to 2026-04-27T21:17:55Z)

## Regression and gate highlights
- Smoke: wrapper command map present and Python runtime scripts compile.
- Skeleton audit: 7/7 skeleton families covered; 16 Markdown skeletons, 12 DOCX skeletons, 3 Excel fixtures, 32 diagram skeletons.
- Golden regressions: 15/15 cases passed; failed cases: none.
- E2E regression: passed compact RFP Forge -> Bid Manager -> Bid Checker loop and DOCX conversion.
- Full regression: passed full technical and commercial proposal artifact generation and PDF rendering checks.
- Questionnaire regression: passed official-style XLSX fill, package preservation, openpyxl load, buyer-only remarks preservation, and LibreOffice Calc render. Rows: 3; responses: 3; statuses: ['Met', 'Met', 'Met']; source/final package parts: 9/9.
- Agent contract audit: passed; findings: [].
- Final artifact QA: passed DOCX zip/openability/media/text/TOC/banned-text checks and PDF render/text extraction. DOCX gate: word_count=580, media_count=2, banned_text_hits=[]. PDF gate: pages=5, text_chars=3000.

## Fixes applied
- Installed missing OS packages: python3-docx and python3-openpyxl.
- Reinstalled MarkItDown with DOCX support using uv tool install --reinstall 'markitdown[docx]'.
- Confirmed the bid-manager wrapper already exposes /root/.local/bin to child scripts, so uv-installed tools such as markitdown are visible to wrapper-driven regressions in stripped cron/operator environments.

## Files changed by this mission
- /root/hermes-workspace/operator-reports/bid-manager-overnight-parity/inventory-parity.json
- /root/hermes-workspace/operator-reports/bid-manager-overnight-parity/verification-green/*
- /root/hermes-workspace/operator-reports/bid-manager-overnight-parity/verification-green-summary.json
- /root/hermes-workspace/operator-reports/bid-manager-overnight-parity/summary.md

Regression runs also created timestamped artifacts under /root/hermes-workspace/tools/bid-manager/legacy/bid-manager/output and appended build metadata/log entries there. Those are local verification artifacts, not buyer deliverables.

## Commits
- Local workspace commit created: Add bid-manager overnight parity report.
- /root/brain had no changes to commit.
- Remote push attempted to origin main and blocked by GitHub permissions: quark-growth lacks write access to outsourc-e/hermes-workspace.git.

## Remaining gaps
None blocking parity. The only operational note is environmental: MarkItDown DOCX support now depends on the uv-managed markitdown tool installation in /root/.local/bin and the wrapper now exposes that path to child scripts.

## Next best action
Keep this green stack as the default bid-manager parity gate. If future runtime drift appears, start with golden-regressions --json because it catches wrapper command coverage, DOCX roundtrip, questionnaire rendering, final artifact QA, and naming-contract regressions in one run.
