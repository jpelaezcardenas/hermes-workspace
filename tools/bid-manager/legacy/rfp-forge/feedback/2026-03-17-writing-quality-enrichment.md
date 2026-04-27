# RFP Forge Enrichment Note — 2026-03-17 22:20

## Focus Area
Writing quality

## What changed
Added a new subsection to `setup/writing-style.md` called `Match response type to the claim being evaluated`.

The addition clarifies when the agent should request:
- Comply/Non-comply
- Narrative
- Evidence
- Demonstration
- Pricing

It also adds a concrete pair of examples showing the difference between a binary certification check and a governance/process explanation.

## Why this matters
A recurring procurement failure mode is asking vendors for the wrong response format. That makes evaluation subjective, bloats responses, and weakens comparability across bidders. This small update makes the agent more likely to produce buyer-side requirements that are scorable, defensible, and easier for evaluators to review.

## Guardrails respected
- No scripts modified
- No output formats changed
- No templates touched
- No DOCX/PPTX/XLSX generation code touched

## Path note
The cron request said `rfp-forge`, but the workspace contains `settlemint-office-agents/rfp-forge/` and the provided enrichment prompt also targets `rfp-forge`. I applied the improvement there.
