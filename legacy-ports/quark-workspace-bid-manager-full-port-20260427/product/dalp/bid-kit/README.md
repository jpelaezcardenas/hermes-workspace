# DALP Bid Kit (PR #6238 integration)

This folder mirrors the public-safe bid assets introduced in DALP PR #6238 (`.agents/skills/bid/`) so DALP context workflows can use them as source material.

## Contents

- `references/` — public-facing DALP and market narrative docs (RFP-safe)
- `rules/` — bid writing guardrails (IP protection, style, Word-compatible markdown)
- `business/templates/` — proposal, matrix, executive summary, and RFP response templates

## Usage Notes

- Treat these as **external-facing narrative assets**.
- For capability truth, always verify against `~/dalp` source code and existing deep DALP docs under `product/dalp/`.
- If a narrative statement conflicts with code evidence, code evidence wins.
