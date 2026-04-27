---
title: "PPTX Reviewer"
type: index
source: gbrain-metadata-normalizer
metadata_normalized_at: 2026-04-27T12:36:05.654353Z
---

# PPTX Reviewer

> **🔴 INTERNAL TERMS STAY INTERNAL (Gyan directive, 2026-03-25):** Never expose skill names, agent names, workflow references, or any internal tool/process names in Slack channels or any user-visible output. Describe WHAT was done, not HOW.

PPTX Reviewer is SettleMint's deck review agent.

It reviews PowerPoint presentations for:
- brand compliance
- slide design quality
- narrative flow
- content accuracy and DALP terminology discipline
- editability and final-deck readiness

The output is a structured markdown review that tells you whether the deck is ready, needs revision, or should be rebuilt.

## What the agent does

PPTX Reviewer:
- runs an automated PPTX inspection pass
- scores decks across the full 10-dimension review rubric
- flags hard failures early
- names weak slides specifically
- produces actionable review notes, not vague design commentary
- saves the final review in `ppt-checker/output/`

## How to spawn it

Spawn the agent with a path to the PPTX you want reviewed.

Example task framing:
- Review `ppt-checker/input/example-deck.pptx`
- Review `/absolute/path/to/deck.pptx`
- Run `ppt-checker/scripts/inspect-pptx.py --json` first, then produce the markdown review
- Preferred end-to-end path: `python3 ppt-checker/scripts/generate_review.py <deck> --output-md <review.md> --output-json <review.json>`
- DOCX export: `python3 ppt-checker/scripts/export_review_docx.py <review.md> <review.docx>` (uses bid-manager's base template, then strips cover/confidentiality pages)

The review process and startup sequence are defined in `ppt-checker/AGENTS.md`.

## Input requirements

Required:
- a valid path to a `.pptx` file

Expected:
- deck should be a real PowerPoint file, not PDF
- deck should be accessible from the local filesystem
- if the deck claims to use the SettleMint template, it will be reviewed against that template standard

Common input locations:
- `ppt-checker/input/`
- `ppt-maker/output/`

## Output format

The agent writes a markdown review to:
- `ppt-checker/output/`

Typical output includes:
- verdict: Approve / Revise / Rebuild
- score summary across 10 dimensions
- hard failures
- top issues
- slide-level notes
- recommended fix path

Use descriptive filenames such as:
- `customer-deck-review.md`
- `qbr-v2-review.md`
- `dalp-demo-review.md`

## Key dependencies

- `python3`
- Python standard library `zipfile`
- `PIL` / Pillow optional for image inspection helpers

Primary script:
- `ppt-checker/scripts/inspect-pptx.py`

## Folder structure

- `setup/` — rubric, checklist, template, and review standards
- `feedback/` — lessons and calibration references
- `training/` — score tracking
- `input/` — source decks to review
- `output/` — completed markdown reviews
- `scripts/` — inspection tooling

## 🔴 NO EMOJI IN OUTPUT — CHECK ITEM (Gyan directive, 2026-04-03)
Flag any emoji characters found in the deck as a hard failure. This includes confidence dots (🟢🟡🔴⚪), status indicators (✅❌⚠️⛔), and any other emoji. All must be replaced with text equivalents before the deck can be approved.

## Verdicts

- **Approve**
- **Revise**
- **Rebuild**

## DALP Composability Validation Reference

> Canonical source: `product/dalp/composability.md` and `shared/content/composability.md`

When reviewing decks for content accuracy and DALP terminology discipline, validate all composability claims against these verified numbers.

**Verified counts:** 11 token features (4 categories), 12 compliance modules (6 categories), 7 regulatory templates, 7 asset presets.

**Token Features (11):** Transaction Fee, Transaction Fee Accounting, External Transaction Fee, AUM Fee, Historical Balances, Voting Power, Permit, Maturity Redemption, Fixed Treasury Yield, Conversion, Conversion Minter.

**Compliance Modules (12):** Country Allow List, Country Block List, Identity Allow List, Identity Block List, Address Block List, SMART Identity Verification, Token Supply Limit, Investor Count, Capped, Time Lock, Transfer Approval, Collateral.

**Regulatory Templates (7):** MiCA EU Standard, Reg D 506(b), Reg D 506(c), MAS Singapore, UK FCA Securities, Japan FSA Crypto, Reg CF Crowdfunding.

**Asset Presets (7):** Bond, Equity, Fund, StableCoin, Deposit, Real Estate, Precious Metal. These are starting points; any free-form asset type is supported.

**Key differentiator to verify in slides:** Runtime-pluggable features and compliance modules (not compiled-in). Post-deployment reconfiguration under GOVERNANCE_ROLE without redeployment. One configurable contract for any instrument, not fixed specialized contracts.

**Common deck errors to flag:** Wrong feature/module counts, describing the architecture as fixed contract types, implying redeployment for changes, listing asset types as exhaustive rather than preset starting points.

## Protection

No modifications without approval from **Gyan (URGPRND7Z)** or **Roderik (U1HU5FV6H)**.

## Slack Delivery Rules

When delivering results to Slack, always use explicit `message action=send` with the original request's `topic_id` as `threadId`. Never use the implicit assistant reply path for channel deliveries. Before sending: 1) Verify you have a `threadId`, 2) Confirm it is the ORIGINAL request `threadId`, 3) Use explicit `message action=send`.
