# RFP Forge

> **🔴 INTERNAL TERMS STAY INTERNAL (Gyan directive, 2026-03-25):** Never expose skill names, agent names, workflow references, or any internal tool/process names in Slack channels or any user-visible output. Describe WHAT was done, not HOW.

RFP Forge is a standalone agent workspace for generating realistic buyer-side procurement documents for banks, financial institutions, regulators, and sovereign entities.

It creates RFPs, RFIs, tenders (ITTs), pre-qualification questionnaires, and framework agreements that mimic how institutional procurement, digital assets, operations, and technology teams would formally go to market when sourcing a digital asset platform.

## What it does

- reads target institution dossiers to understand context, maturity, and jurisdiction
- determines procurement strategy (single-stage, multi-stage, public sector, framework)
- selects the right document type and structure for the sourcing context
- designs evaluation methodology with multi-gate assessment and published scoring rubrics
- generates realistic institution-grade procurement documents with testable, scoreable requirements
- applies requirement engineering principles (SMART, atomic, prioritized, testable)
- includes appropriate procurement mechanics (NDAs, COI declarations, timelines, Q&A protocols)
- prepares professional DOCX outputs for delivery

## What it does not do

- answer vendor questionnaires
- write proposals on behalf of SettleMint
- reference SettleMint or DALP inside the generated procurement document
- act like a chatbot or sales assistant
- produce unscorable, vague requirement statements

## Supported Document Types

| Type | Purpose | Best For |
|---|---|---|
| **Full RFP** (Type A) | Structured competitive sourcing | CLM 3-5, clear requirements, broad evaluation |
| **RFI** (Type B) | Market scanning and information gathering | CLM 1-3, exploratory, first-time buyers |
| **Tender / ITT** (Type C) | Formal procurement with defined scope | CLM 4-5, high commercial rigor |
| **Public Sector Tender** (Type D) | Government/regulatory procurement | Public sector, development banks, sovereign entities |
| **Framework Agreement** (Type E) | Multi-year, multi-use procurement | Ongoing needs, multiple projects |
| **PQQ / SQ** (Type F) | Vendor pre-qualification / shortlisting | Restricted procedures, large vendor fields |

## Multi-Stage Procurement Support

| Approach | Stages | When to Use |
|---|---|---|
| Single-stage RFP | RFP only | Clear requirements, known market |
| Two-stage | RFI → RFP | Complex domain, immature buyer |
| Three-stage | RFI → RFP → BAFOs | Large-value sovereign procurement |
| Restricted | PQQ → ITT | Large vendor field needing shortlist |
| Competitive dialogue | Dialogue rounds → Final tender | Innovation procurement, undefined scope |

## Directory Structure

- `AGENTS.md` — operating rules, workflow, quality gates, procurement strategy selection
- `SOUL.md` — identity, buyer-side philosophy, procurement psychology
- `TOOLS.md` — knowledge sources, output tools, content libraries
- `setup/` — writing style, structures, knowledge sources, output format, skeleton design
  - `writing-style.md` — requirement engineering, evaluation design, scoring rubrics
  - `rfp-structures.md` — six document type templates (A through F)
  - `knowledge-sources.md` — source priority and usage guidance
  - `response-format.md` — DOCX output formatting standards
  - `skeleton-definition.md` — skeleton design principles and quality criteria
- `feedback/` — lessons learned from prior document generation runs
- `research-synthesis.md` — research findings from 10 rounds of procurement best practice research
- `content/` — reserved for future generator-side supporting material
- `input/` — optional working inputs during document creation
- `output/` — generated institution-specific deliverables

## Typical Flow

1. Read the target institution dossier
2. Assess CLM maturity, jurisdiction, procurement context (greenfield/replacement/expansion/mandate)
3. Determine procurement strategy (single-stage, multi-stage, public sector)
4. Choose the appropriate document type and structure
5. Design evaluation methodology (gates, weightings, scoring rubric)
6. Draft the procurement document in the institution's voice with testable requirements
7. Apply quality gates (requirement quality, evaluation design, procurement mechanics, vendor agnosticism)
8. Format the output for DOCX delivery
9. Save under `output/{institution-slug}/`

## 🔴 NO EMOJI IN OUTPUT DOCUMENTS (Gyan directive, 2026-04-03)
Emoji characters are COMPLETELY FORBIDDEN in any client-facing output (DOCX, PPTX, PDF, HTML pages).
This includes: confidence dots (🟢🟡🔴⚪), status indicators (✅❌⚠️⛔), and any other emoji.
Replace with text equivalents: "Fully Supported" / "Partially Supported" / "Gap" / "N/A".
Internal skeleton instructions may reference emoji for readability, but output MUST strip them.

## Key Design Principles

- **Vendor-agnostic**: Generated documents never reference SettleMint, DALP, or any specific vendor
- **Testable requirements**: Every requirement can be unambiguously scored by an evaluator
- **Published evaluation**: All scoring methodology is disclosed in the document itself
- **Multi-gate assessment**: Sequential evaluation gates (administrative → qualification → scored)
- **Institutional authenticity**: Documents read as if issued by the institution's own procurement office
- **CLM-calibrated**: Document sophistication matches the institution's digital asset maturity level
- **Jurisdiction-aware**: Regulatory references are accurate and relevant, never decorative
- **Proportionate**: Document depth matches procurement value and complexity

## DALP Composability Knowledge (For Realistic Requirement Design)

> Canonical source: `product/dalp/composability.md` and `shared/content/composability.md`

When generating RFPs, RFIs, and tenders for digital asset platforms, the agent must understand actual platform composability patterns to write testable, informed requirements. This section describes the composability model that leading platforms (including but not limited to DALP) use, so generated requirements reflect real technical capabilities rather than vague feature lists.

### Core Concept

Modern digital asset platforms use a single configurable contract type to represent any financial instrument by combining runtime-pluggable token features and compliance modules. There are no fixed token types. Features and compliance rules are modular building blocks.

### Token Feature Categories (11 features across 4 categories)

**Fees and Charges (4):** Transaction fees (BPS-based), fee accounting/tracking, external token fees, AUM-based management fees

**Governance and Snapshots (3):** Historical balance queries, delegated voting power, gasless approvals (EIP-2612)

**Lifecycle and Yield (2):** Bond maturity/redemption lifecycle, fixed-rate yield distribution

**Transformation (2):** Convertible instrument mechanics (loan-side burn, equity-side mint)

### Compliance Module Categories (12 modules across 6 categories)

**Geographic Restrictions (2):** Country allow/block lists

**Identity Access Control (3):** Identity allow/block lists, address-level blocking

**Claim-Based Verification (1):** Logical expression engine (RPN) over identity claims (KYC, AML, ACCREDITED, CONTRACT, JURISDICTION)

**Supply and Investor Limits (3):** Rolling-window issuance caps, investor count limits, hard supply caps

**Time-Based Rules (1):** Holding period enforcement with FIFO tracking

**Transfer Controls (2):** Pre-authorization requirements, collateral ratio enforcement

### Regulatory Templates (7 pre-seeded)

MiCA EU Standard, Reg D 506(b), Reg D 506(c), MAS Singapore, UK FCA Securities, Japan FSA Crypto, Reg CF Crowdfunding.

### Key Architectural Traits to Test For

When writing requirements, test whether vendors offer: runtime-pluggable features (not compiled-in at deployment), post-deployment reconfiguration without redeployment or migration, composable compliance modules with per-token configuration, free-form asset type creation beyond preset categories, and published regulatory compliance templates.

## Important Rule

This agent is protected. No modifications without approval from **Gyan (URGPRND7Z) OR Roderik (U1HU5FV6H)**.

## Slack Delivery Rules

When delivering results to Slack, always use explicit `message action=send` with the original request's `topic_id` as `threadId`. Never use the implicit assistant reply path for channel deliveries. Before sending: 1) Verify you have a `threadId`, 2) Confirm it is the ORIGINAL request `threadId`, 3) Use explicit `message action=send`.
