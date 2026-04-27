# RFP Forge — Prompt Guide

## What this agent does

RFP Forge generates realistic buyer-side procurement documents — RFPs, RFIs, tenders (ITTs), pre-qualification questionnaires (PQQs), and framework agreements — as if authored by a bank, financial institution, regulator, or sovereign entity going to market for a digital asset platform.

These documents are vendor-agnostic (SettleMint and DALP are never named), use SMART testable requirements, include published scoring rubrics, and read as if issued by the institution's own procurement office. They are used for bid-manager training, internal pitch preparation, and competitive simulation.

**Supported document types:**

| Type | Code | Best for |
|------|------|----------|
| Full RFP | A | Competitive sourcing with defined requirements (CLM 3–5) |
| RFI | B | Market scanning, exploratory procurement (CLM 1–3) |
| Tender / ITT | C | Formal procurement with commercial rigor (CLM 4–5) |
| Public Sector Tender | D | Government, development banks, sovereign entities |
| Framework Agreement | E | Multi-year, multi-project procurement |
| PQQ / SQ | F | Vendor pre-qualification / shortlisting |

CLM = Capability and Lifecycle Maturity (1 = early exploration, 5 = repeat buyer).

## When to use it

- Training the bid-manager pipeline on new procurement patterns or institutions
- Preparing for a real bid by generating a realistic version of what the institution is likely to issue
- Stress-testing SettleMint's response quality against a known procurement structure
- Simulating competitive procurement to sharpen positioning and win themes

Do **not** use RFP Forge to generate SettleMint's own proposal response — that's `bid-manager`.

## Required inputs

| Input | Details |
|-------|---------|
| **Institution dossier or description** | Either a file in `input/` (e.g. `input/ocbc_dossier.md`) or a free-text description in the prompt covering: institution type, geography, size, known digital asset activity, regulatory environment, and procurement maturity (CLM 1–5) |
| **Document type** | One of: A (Full RFP), B (RFI), C (ITT), D (Public Sector Tender), E (Framework Agreement), F (PQQ) |
| **Jurisdiction** | Primary regulatory jurisdiction: e.g. `EU-MiCA`, `MAS-Singapore`, `JFSA-Japan`, `FCA-UK`, `ADGM-UAE`, `BaFin-Germany`, `US-Reg-D`, `GCC-Sharia`, `Saudi-SAMA` |
| **Procurement stage** | Context for the institution: `greenfield` (first-time), `replacement` (switching vendor), `expansion` (adding to existing infra), `mandate` (regulatory-driven) |

## Optional / configurable parameters

| Parameter | Default | Notes |
|-----------|---------|-------|
| **CLM level** | Inferred from dossier | Override with `CLM: 3` if you want explicit maturity calibration |
| **Multi-stage approach** | Single-stage | Options: `rfi-then-rfp`, `rfi-rfp-bafo`, `pqq-then-itt`, `competitive-dialogue` |
| **Focus areas** | Balanced across all digital asset lifecycle areas | Emphasise specific requirement clusters: `compliance`, `custody`, `settlement`, `tokenisation`, `api-integration`, `deployment`, `security`, `identity-kyc` |
| **Document length** | Proportionate to CLM and document type | Options: `compact` (streamlined), `standard` (default), `comprehensive` (multi-section, heavy requirements) |
| **Scoring rubric** | Published within the document | Specify weightings if you want a particular emphasis: e.g. `technical: 40%, commercial: 30%, compliance: 30%` |
| **Output format** | Markdown saved to `output/{institution-slug}/` | Request `docx` if you need a Word file for internal circulation |

## Full example prompt

```
Please generate a realistic RFP for the following institution:

Institution: Monetary Authority of Singapore (MAS)
Description: Central bank and financial regulator of Singapore. Advanced digital asset maturity. 
Has completed Project Guardian pilots. Now moving toward a formal procurement for a digital 
asset platform to support licensed financial institutions building tokenised products under 
MAS guidelines.

Document type: A (Full RFP)
Jurisdiction: MAS-Singapore
Procurement stage: expansion (moving from pilot to formal platform sourcing)
CLM: 4
Focus areas: compliance, identity-kyc, settlement, api-integration
Scoring rubric: technical: 35%, compliance: 30%, commercial: 20%, implementation: 15%
Length: comprehensive
Output: docx

Additional notes:
- Institution should reference MAS Notice SFA 04-N02 and relevant digital token guidelines
- Include a multi-gate evaluation structure: administrative → qualification → full scored evaluation
- Requirements must be SMART and testable by an evaluator without vendor interaction
- Do not reference SettleMint, DALP, or any specific vendor anywhere in the document
```

## ⚠️ Important

- **Send everything in ONE message.** Provide the institution dossier or description, document type, jurisdiction, procurement stage, and all optional parameters together. Do not drip-feed context.
- **Do not send follow-up messages mid-task.** The agent will confirm when the document is ready.
- **The output is buyer-side, not vendor-side.** The generated document is what the institution would issue. It does not contain SettleMint's response. Use `bid-manager` for that.
- **SettleMint and DALP are never named.** The generated procurement document is vendor-agnostic by design. This is not configurable.
- **Requirements must be testable.** The agent will not generate vague or unscored requirements. Every requirement in the output can be objectively evaluated by a procurement panel.
- **Output lives in `output/{institution-slug}/`.** Do not route artifacts elsewhere.

---

## Slack Message Template

Copy this message, fill in the `[placeholders]`, and send it in one go. Do not follow up mid-task.

```
@Quark run rfp-forge

Institution: [institution name and brief description, e.g. "BIS Innovation Hub — central bank research and innovation body, exploring tokenized settlement infrastructure"]
Document type: [RFP / RFI / Tender (ITT) / Public Sector Tender / Framework Agreement / PQQ — or use Type A/B/C/D/E/F]
Jurisdiction: [e.g. EU/MiCA / UAE / Singapore MAS / UK FCA / Switzerland FINMA]
Procurement stage: [single-stage / two-stage (RFI→RFP) / three-stage / restricted (PQQ→ITT) / competitive dialogue]

Optional:
- Institution maturity (CLM 1–5): [e.g. CLM 3 — or describe: "exploratory, first digital asset project"]
- Key focus areas: [e.g. tokenized bonds, DvP settlement, custody, stablecoin issuance]
- Scoring rubric: [include / exclude (default: include)]
- Length/depth: [e.g. "full document, all sections" / "lean version, core requirements only"]
- Output format: [DOCX + markdown (default) / markdown only]
```
