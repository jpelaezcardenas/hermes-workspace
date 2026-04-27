---
skeleton-type: technical
variant: compact
target-pages: "20-30"
target-words: "6000-9000"
version: "BM-TS-03-v2.0"
last-updated: "2026-03-19"
---

# Technical Proposal Blueprint: Compact

> **Version:** BM-TS-03-v2.0 (SENTINEL)
> **Last updated:** 2026-03-19

## Blueprint Rules: MANDATORY COMPLIANCE

> ⛔ **This skeleton MUST be followed exactly.** No section may be skipped, reordered, merged, or shortened below its stated word-count floor. Deviation requires explicit written approval from Gyan (URGPRND7Z) before proceeding.

### Structural Compliance
- Follow every section in the order listed, no reordering
- Every section with a word target MUST hit its stated floor (minimum word count)
- Every `[VARIABLE: ...]` placeholder MUST be resolved before the draft is considered complete
- Every `[REUSABLE BLOCK: slug]` tag MUST be expanded from the referenced reusable file
- Every visual spec MUST produce an actual diagram, table, or matrix, not a placeholder description

### Consistency Anchors
- Heading hierarchy: H1 = document title, H2 = major section, H3 = subsection, H4 = sub-subsection
- No manual numbering in headings, the DOCX template handles numbering
- Table structure: always include a header row; no merged cells; keep columns consistent throughout
- Confidence tags: 🟢 Native | 🟡 Partial | 🔴 Gap | ⚪ N/A, apply at section level AND at claim level
- Voice: third person ("SettleMint provides", "DALP enables"), never first person
- Tense: present tense for capabilities, future tense for delivery phases

### Pre-Write Checklist (complete before drafting any section)
- [ ] `feedback/lessons.md` read and internalized
- [ ] `setup/core-positioning.md` read
- [ ] `setup/writing-style.md` read
- [ ] `setup/ip-protection.md` read
- [ ] `setup/mermaid-diagram-standards.md` read
- [ ] All source files in "Global Source Priority" confirmed accessible
- [ ] All `[VARIABLE: ...]` placeholders identified and sourced from RFP/brief

### Output Quality Gates (validate before delivery)
- [ ] Cover page: all placeholders resolved, no placeholder text remaining
- [ ] TOC: auto-generated, not hand-typed
- [ ] Word count: total output within target range (±10%; below floor = failure)
- [ ] Screenshot minimum: include at least 6 DALP screenshots sourced from `../shared/brand/dalp-screenshots/` or the catalog/registry references below
- [ ] Screenshot distribution: spread screenshots across at least 2 major sections; do not dump them into one section or appendix
- [ ] Screenshot variety: cover at least 2 screenshot categories unless the bid is narrowly focused on one asset class
- [ ] Screenshot captions: every screenshot is followed immediately by a `*Figure X: ...*` caption explaining what the screenshot proves
- [ ] Visual count: include diagrams, tables, and screenshots wherever they reinforce the narrative or help the evaluator understand faster than prose alone. There is no upper limit; use as many as the section content warrants
- [ ] Confidence tags: present on every substantive DALP capability claim
- [ ] No unsupported claims: every capability assertion maps to a source file
- [ ] No roadmap language: "coming soon", "planned", "will support" prohibited unless marked [ROADMAP]
- [ ] Prose quality: no section >50% bullets, rewrite to prose if needed
- [ ] Final sweep: run 7-sweep copy-editing framework (clarity, voice, structure, persuasion, specificity, rhythm, polish)
- [ ] No emoji in output: all emoji characters (confidence dots, status indicators, any Unicode emoji) stripped and replaced with text equivalents before delivery
- [ ] Mermaid diagram count: minimum 10 mermaid code blocks in the markdown output (see mandatory diagrams rule below)
- [ ] Validation script: run `scripts/validate_proposal.py output.md compact` and confirm PASS before DOCX conversion

### MANDATORY DIAGRAMS (Gyan directive, 2026-04-03)

Every technical proposal MUST include mermaid diagram code blocks in the markdown output.
**Minimum count for compact variant: 5 mermaid blocks.**
See `setup/diagram-manifest.md` for the required diagram list per section.
A proposal without mermaid blocks in the markdown is INCOMPLETE and must not proceed to DOCX conversion.
The DOCX conversion script (`scripts/markdown_to_docx.py`) renders mermaid to PNG automatically.
Do NOT replace mermaid blocks with text placeholders or descriptions of what a diagram would show.

**Mandatory validation:** Run `scripts/validate_proposal.py <output.md> compact` before DOCX conversion.
If the script returns FAIL, revise the markdown to add missing diagrams before proceeding.

### Original Skeleton-Specific Rules

- This is a blueprint only
- No finished prose
- No manual numbering in headings
- Use `[VARIABLE: ...]` placeholders throughout
- Prioritize evaluator clarity over completeness
- Focus on differentiation, technical credibility, and delivery confidence

## Global Guidance

### Objective

- communicate fit fast
- show institutional readiness
- prove controllable implementation and operations

### Core Source References

- `templates/technical-proposal-part1.md`
- `templates/technical-proposal-part2.md`
- `reusable/about-settlemint.md`
- `reusable/about-dalp.md`
- `reusable/reference-projects.md`
- `reusable/implementation-plan.md`
- `reusable/deployment-options.md`
- `reusable/support-sla.md`
- `content/01-company-profile/main.md`
- `content/02-architecture/main.md`
- `content/03-asset-lifecycle/main.md`
- `content/05-security/main.md`
- `content/06-implementation/main.md`

**Consistency anchor:** Summary table uses identical column structure. Only approved reference names and outcomes.


### Tone Guidance

- tight
- precise
- evidence-led
- non-promotional

### What To Avoid

- background exposition
- duplicated content
- unsupported claims
- section sprawl



### Visual Element Policy

> **Directive (Gyan, 2026-04-05):** Screenshots are mandatory proof assets in every proposal skeleton. They are not optional decoration.

- **Minimum DALP screenshots for this variant:** 6
- **Section spread minimum:** use screenshots in at least 2 distinct major sections
- **Category variety minimum:** use screenshots from at least 2 screenshot categories unless the request is deliberately limited to one asset class or one workflow
- **Proof plan before prose:** before drafting, assign each planned screenshot to the section where the capability is first introduced
- **Inline placement only:** place each screenshot immediately after the paragraph it proves. Never batch screenshots at the end of a section or in a screenshot gallery
- **Caption rule:** every screenshot must be followed on the next line by a `*Figure X: ...*` caption that states what the evaluator is seeing and why it matters
- **Use the catalog and registry:** select screenshots from `../shared/brand/dalp-screenshots/CATALOG.md` and `setup/screenshot-registry.md`
- **Distribute proof:** after one section receives two screenshots, the next screenshot should usually land in another relevant section unless the section is an asset-class deep dive that genuinely needs more proof
- **No upper limit:** there is no cap on diagrams, tables, or screenshots when they materially improve evaluator understanding
- **Validation:** `scripts/validate_proposal.py` checks screenshot count, caption coverage, section distribution, and screenshot-category variety

#### Section-to-Screenshot Map

| Section Topic | Primary Screenshot Files From Catalog | Use In These Sections | Placement Rule |
|---|---|---|---|
| Executive Summary / Opportunity Framing | `02 - Dashboard/Dashboard 1.png`; `02 - Dashboard/Dashboard - Map and Statistics.png` | Executive summary, opening platform proof, operating-model context | Use one overview screenshot only, directly after the paragraph that introduces the platform and buyer context |
| Platform Overview / About DALP | `04 - Asset Designer/Asset Designer.png`; `21 - Insights/Insights - Asset Overview.png` | Platform overview, DALP breadth, lifecycle coverage | Pair with platform description, not in a later gallery |
| Asset Creation / Issuance | `04 - Asset Designer/Asset Designer.png`; `04 - Asset Designer/Asset Designer - Step 4 - Instrument Details.png`; `04 - Asset Designer/Asset Designer Review and Deploy 1.png` | Issuance workflow, product configuration, deployment controls | Place next to the first asset-creation explanation |
| Compliance / Policy Controls | `04 - Asset Designer/Asset Designer - Step 6 - Compliance Modules.png`; `14 - Compliance and Policy Templates/Compliance Policy Templates.png`; `14 - Compliance and Policy Templates/Policy Template - Expression Builder.png` | Compliance, transfer rules, regulatory controls, policy governance | Use in the compliance section itself, not in a generic appendix |
| Identity / Eligibility / KYC | `15 - Identity and Verification/Onchain Identity.png`; `15 - Identity and Verification/Verification Topics.png`; `04 - Asset Designer/Asset Designer Compliance Identity.png` | Identity, eligibility, investor verification, trusted issuer workflows | Keep beside the identity discussion and caption the control being evidenced |
| Permissions / Governance / Access Control | `04 - Asset Designer/Asset Designer - Step 7 - Asset Permissions Config.png`; `04 - Asset Designer/Asset Designer Permissions.png`; `19 - Settings and Admin/Activity Log.png` | Governance, RBAC, segregation of duties, auditability | Use where governance or access control is described |
| Settlement / DvP / XvP | `16 - XVP Settlement/XVP Setup 1.png`; `16 - XVP Settlement/XVP Details 1.png`; `16 - XVP Settlement/XvP API Light.png` | Settlement, post-trade workflow, atomic exchange, integration-backed settlement | Place inside the settlement section, not clustered with monitoring |
| Operations / Monitoring / Support | `20 - Monitoring/Blockchain Monitoring.png`; `20 - Monitoring/API Monitoring - Overview.png`; `19 - Settings and Admin/Activity.png` | Operations, observability, SLA proof, production supervision | Use in the operations, deployment, or support section that cites runtime control |
| Asset-Class Proof | Bonds: `06 - Bonds/Bonds Detail 2.png`; Equity: `07 - Equity/Equity Detail 1.png`; Funds: `08 - Funds/Fund Detail 1.png`; Deposits: `09 - Deposits/Deposits Listing.png`; Stablecoins: `10 - Stablecoins/Stablecoin Detail 1.png`; Precious Metals: `11 - Precious Metal 1.png`; Real Estate: `12 - Real Estate/Real Estate - Doha Business Towers - Asset Details.png` | Asset-class-specific sections, solution fit, use-case proof | Prefer the asset class requested by the buyer before reusing generic dashboard screenshots |
| Integration / API / Extensibility | `19 - Settings and Admin/API Keys.png`; `16 - XVP Settlement/XvP API Light.png`; `19 - Settings and Admin/Addons.png` | API, integration, extensibility, workflow automation | Use only where APIs or extensibility are discussed |
| Branding / White-Label | `19 - Settings and Admin/Theme 1.png`; `19 - Settings and Admin/Theme 2.png` | White-label, branding, tenant experience | Keep in branding sections only, not as generic filler |



## Executive Summary

- Word target: 600-900
- Source references:
  - `templates/technical-proposal-part1.md`
  - `reusable/about-settlemint.md`
  - `reusable/about-dalp.md`
- Required subsections:

**Consistency anchor:** Always opens with the client's stated challenge before introducing the solution. No bullet lists, prose only.


### Executive Summary > Client Need and Proposed Response

> MANDATORY DIAGRAM: Solution Architecture overview. Include as ```mermaid code block.

- Visual elements: Mermaid: `solution-architecture.mmd`; Screenshot: Dashboard overview
- Word target: 250-360
- Include:
  - `[VARIABLE: programme objective]`
  - `[VARIABLE: buyer challenge]`
  - `[VARIABLE: selected deployment model]`
  - `[VARIABLE: scope summary]`
  - `[VARIABLE: key differentiators]`

### Executive Summary > Why SettleMint / DALP

- Visual elements: Table: Key differentiators
- Word target: 220-320
- Combine company and platform rationale
- Focus on:
  - institutional credibility
  - lifecycle coverage
  - compliance and operational control

### Executive Summary > Visual Spec

- one half-page summary table or 3-column response snapshot

> ✅ **Section complete when:** Client name and programme name appear in opening paragraph. At least two named differentiators present. Reference snapshot included. No bullet lists, prose only throughout.

## About SettleMint

- Word target: 450-700
- One section, key facts only
- Source references:
  - `reusable/about-settlemint.md`
  - `content/01-company-profile/main.md`
- Required content blocks:
  - company overview
  - production credentials
  - regulatory readiness
  - relevance to `[VARIABLE: buyer/programme]`
- Visual spec:
  - one compact proof-point table
- Avoid:
  - long company story


**Consistency anchor:** Company facts table present in every variant. No claims beyond approved source material.

> ✅ **Section complete when:** Company facts table present with 6+ approved metrics. Regulatory readiness table included. No unapproved claims.

## About DALP

- Word target: 650-900
- One section, capabilities overview only
- Source references:
  - `reusable/about-dalp.md`
  - `content/03-asset-lifecycle/main.md`
  - `content/02-architecture/main.md`
- Required content blocks:
  - platform overview
  - core lifecycle capabilities
  - platform foundations
  - key differentiators
- Writer instructions:
  - keep to 4 short sub-blocks max
  - emphasize fit to `[VARIABLE: use case]`
- Visual spec:
  - one lifecycle or layered capability diagram

> MANDATORY DIAGRAM: Platform Architecture or Lifecycle diagram. Include as ```mermaid code block.

- Avoid:
  - exhaustive feature lists


**Consistency anchor:** Lifecycle pillar count (5) and names (Create, Comply, Custody, Settle, Service) consistent across all proposals.

> ✅ **Section complete when:** All five lifecycle pillars named and described. Asset class table or diagram present. Differentiator comparison included.

## Customer References

- Word target: 400-650
- Summary table only
- Source references:
  - `reusable/reference-projects.md`
- Required content:

**Consistency anchor:** Summary table uses identical column structure across all proposals. Only approved reference names used.


### Customer References > Summary Table

- include all approved references in a compact table
- suggested columns:
  - client
  - use case
  - geography
  - relevance note

### Customer References > Relevance Note

- Word target: 80-120
- explain selection emphasis for `[VARIABLE: client context]`

### Customer References > Avoid

- no expanded case-study paragraphs in this variant

> ✅ **Section complete when:** Summary table includes all approved references. Expanded references follow context/challenge/solution/outcome structure. Selection rationale stated.

## Solution Overview

- Word target: 1300-1800
- Merged requirements + solution section
- Source references:
  - RFP / bid docs `[VARIABLE: source path]`
  - `reusable/about-dalp.md`
  - `content/03-asset-lifecycle/main.md`
  - `content/03-integrations/main.md`
- Required subsections:

### Solution Overview > Requirement Themes

- Visual elements: Table: Requirement themes summary
- Word target: 180-260
- capture only the 4-6 most important evaluator concerns

### Solution Overview > Proposed Operating Model

> MANDATORY DIAGRAM: Compliance Evaluation Flow. Include as ```mermaid code block.

- Visual elements: Mermaid: `solution-architecture.mmd`; Screenshot: Dashboard
- Word target: 250-350
- include:
  - actors
  - scope boundary
  - key systems in scope
  - `[VARIABLE: deployment assumption]`

### Solution Overview > Core Capability Response

- Visual elements: Screenshot: Asset Designer, Compliance Policy Templates, XVP Settlement, Identity & Verification
- Word target: 650-900
- Use 4 merged blocks:
  - asset and lifecycle control
  - identity and compliance
  - settlement and custody
  - integration and reporting

### Solution Overview > Fit Table

- Word target: 150-220
- Table columns:
  - requirement area
  - DALP response
  - status/assumption

### Solution Overview > Visual Spec

- one end-to-end solution diagram
- one fit table

### Solution Overview > Avoid

- no deep architecture repetition
- no long RFP restatement

## Architecture Overview

> MANDATORY DIAGRAM: Deployment / Architecture topology. Include as ```mermaid code block.

- Word target: 700-1000
- One section only
- Source references:
  - `content/02-architecture/main.md`
  - `content/04-deployment/main.md`
- Required content blocks:
  - architecture principles
  - core layers/components
  - deployment topology summary
  - resilience/evidence path note
- Visual spec:
  - one layered architecture diagram
- Avoid:
  - code-level detail

## Security Overview

- Word target: 600-850
- One section only
- Source references:
  - `content/05-security/main.md`
  - `templates/technical-proposal-part2.md`
- Required content blocks:
  - authentication and access control
  - custody/key management
  - data protection and auditability
  - testing/assurance note
- Visual spec:
  - one control model or responsibility table
- Avoid:
  - generic cyber filler


**Consistency anchor:** Security control descriptions match approved source wording. Certification claims cite exact scope.

> ✅ **Section complete when:** Security domain diagram or responsibility matrix present. Authentication, key management, and data protection all addressed. No unsupported certification claims.

## Implementation Timeline

- Word target: 300-500
- Table only
- Source references:
  - `reusable/implementation-plan.md`
  - `content/06-implementation/main.md`
- Required table columns:
  - phase
  - objective
  - indicative duration
  - key outputs
- Required rows:
  - Discovery and Requirements
  - Foundation and Setup
  - Configuration and Compliance
  - Integration and Testing
  - Go-Live
  - Hypercare
- Optional visual:
  - mini gantt if space allows


**Consistency anchor:** Phase names and sequence identical across all proposal variants. Gate criteria stated for every phase.

> ✅ **Section complete when:** Phase table with gate criteria present. Timeline table included. Dependencies and governance addressed.

## Support & SLA

- Word target: 300-500
- Summary table only
- Source references:
  - `reusable/support-sla.md`
- Required content:

**Consistency anchor:** SLA figures match approved source exactly. Tier names and coverage hours never modified without approval.


### Support & SLA > Support Summary Table

- columns:
  - tier
  - coverage
  - channels
  - uptime target

### Support & SLA > Severity Table

- columns:
  - severity
  - response target
  - resolution target

### Support & SLA > Avoid

- do not customize numbers without approval

> ✅ **Section complete when:** Support tier comparison table present. Severity/response matrix included. Escalation path defined.

## Risk Register

- Word target: 250-400
- Table only
- Source references:
  - `reusable/implementation-plan.md`
  - bid-specific risk inputs `[VARIABLE: source]`
- Required columns:
  - risk
  - impact
  - mitigation
  - owner
- Minimum rows:
  - integration delay
  - client dependency delay
  - regulatory change
  - environment readiness
  - third-party dependency


**Consistency anchor:** Risk register uses identical column structure. Every risk has an owner and mitigation.

> ✅ **Section complete when:** Risk table present with all required columns. Minimum categories covered. Every risk has owner and mitigation.

## Project Implementation & Delivery

**Consistency anchor:** Phase names and sequence identical across all proposal variants. Gate criteria stated for every phase.


### Project Implementation & Delivery (900-1400 words depending on variant)

- Write about: delivery methodology, implementation phases, indicative timeline, governance, RACI, milestones, gates, client dependencies, and delivery risks.
- Include: 1 phase table or Gantt-style timeline with phases, objectives, outputs, dependencies, and acceptance gates.
- Include: 1 compact RACI or role matrix showing SettleMint, client, and partner roles if relevant.
- Cover explicitly: methodology, phase objectives, milestone logic, hypercare/transition, and the decisions needed to stay on schedule.
- Tone: disciplined, realistic, execution-focused.
- Reference: `bid-manager/content/06-implementation/main.md`, `bid-manager/templates/implementation-plan.md`.
- Do not: present sample timelines as contractual commitments or hide client responsibilities.

> ✅ **Section complete when:** Phase table with gate criteria present. RACI or role matrix included. All six phases covered.

## Deployment

**Consistency anchor:** Deployment model comparison uses identical criteria columns across all variants.


### Deployment (500-900 words depending on variant)

- Write about: recommended deployment model, deployment alternatives considered, cloud/on-prem/hybrid options, infrastructure requirements, environment model, resilience, and data residency implications.
- Include: 1 comparison table covering Managed SaaS, private/dedicated cloud, on-premises, and hybrid where relevant.
- Include: 1 logical topology or environment summary showing how DALP fits the buyer's hosting model.
- Cover explicitly: infrastructure prerequisites (Kubernetes/OpenShift, PostgreSQL, Redis, object storage, ingress/network), DR/backup approach, and hosting responsibility.
- Tone: infrastructure-literate, non-speculative, requirements-driven.
- Reference: `bid-manager/content/04-deployment/main.md`.
- Do not: imply platform capability changes by deployment model or commit to unsupported residency/security claims.

> ✅ **Section complete when:** Recommended model stated with rationale. Comparison table present. Infrastructure requirements listed.

## Support Appendix

**Consistency anchor:** Only included when bid requires it. Source-backed and compact.


### Support Appendix (400-700 words, appendix-style)

- Write about: support tiers, SLA commitments, severity definitions, escalation paths, maintenance/update policy, reporting cadence, and service-credit rules where approved.
- Include: 1 support-tier comparison table and 1 severity/response/resolution table.
- Cover explicitly: named channels, coverage hours, incident escalation path, maintenance windows, and any service credit mechanics approved for proposal use.
- Tone: operational, precise, contract-aware.
- Reference: `bid-manager/content/07-support-sla/main.md`, `bid-manager/templates/sla-framework.md`.
- Do not: change SLA values, uptime targets, or service-credit terms without approval.

> ✅ **Section complete when:** Support tier comparison table present. Severity/response matrix included. Escalation path defined.

## Writer's Checklist

- Word target: 250-400
- Checklist only

**Consistency anchor:** All checklist items verified before submission. No items skipped.


### Writer's Checklist > Must Pass

- headings unnumbered
- placeholders resolved where required
- deployment model consistent throughout
- all claims source-backed
- no unsupported metrics
- tables concise and Word-friendly
- selected references relevant to client context
- visuals limited to essentials
- tone precise and non-promotional

> ✅ **Section complete when:** All structural, evidence, customization, tone, and production checks listed.
