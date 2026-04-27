---
skeleton-type: technical
variant: medium
target-pages: "40-60"
target-words: "12000-18000"
version: "BM-TS-02-v2.0"
last-updated: "2026-03-19"
---

# Technical Proposal Blueprint: Medium

> **Version:** BM-TS-02-v2.0 (FALCON)
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
- [ ] Screenshot minimum: include at least 8 DALP screenshots sourced from `../shared/brand/dalp-screenshots/` or the catalog/registry references below
- [ ] Screenshot distribution: spread screenshots across at least 3 major sections; do not dump them into one section or appendix
- [ ] Screenshot variety: cover at least 3 screenshot categories unless the bid is narrowly focused on one asset class
- [ ] Screenshot captions: every screenshot is followed immediately by a `*Figure X: ...*` caption explaining what the screenshot proves
- [ ] Visual count: include diagrams, tables, and screenshots wherever they reinforce the narrative or help the evaluator understand faster than prose alone. There is no upper limit; use as many as the section content warrants
- [ ] Confidence tags: present on every substantive DALP capability claim
- [ ] No unsupported claims: every capability assertion maps to a source file
- [ ] No roadmap language: "coming soon", "planned", "will support" prohibited unless marked [ROADMAP]
- [ ] Prose quality: no section >50% bullets, rewrite to prose if needed
- [ ] Final sweep: run 7-sweep copy-editing framework (clarity, voice, structure, persuasion, specificity, rhythm, polish)
- [ ] No emoji in output: all emoji characters (confidence dots, status indicators, any Unicode emoji) stripped and replaced with text equivalents before delivery
- [ ] Mermaid diagram count: minimum 20 mermaid code blocks in the markdown output (see mandatory diagrams rule below)
- [ ] Validation script: run `scripts/validate_proposal.py output.md medium` and confirm PASS before DOCX conversion

### MANDATORY DIAGRAMS (Gyan directive, 2026-04-03)

Every technical proposal MUST include mermaid diagram code blocks in the markdown output.
**Minimum count for medium variant: 10 mermaid blocks.**
See `setup/diagram-manifest.md` for the required diagram list per section.
A proposal without mermaid blocks in the markdown is INCOMPLETE and must not proceed to DOCX conversion.
The DOCX conversion script (`scripts/markdown_to_docx.py`) renders mermaid to PNG automatically.
Do NOT replace mermaid blocks with text placeholders or descriptions of what a diagram would show.

**Mandatory validation:** Run `scripts/validate_proposal.py <output.md> medium` before DOCX conversion.
If the script returns FAIL, revise the markdown to add missing diagrams before proceeding.

### Original Skeleton-Specific Rules

- Purpose: condensed technical proposal blueprint only
- No finished prose
- No manual numbering in headings
- Use `[VARIABLE: ...]` placeholders for client- and bid-specific content
- Keep sections tighter than full variant
- Merge detail where it does not improve evaluation value
- Prefer tables and focused visuals over long narrative instructions

## Global Guidance

### Objective

- show credible technical fit
- prove production readiness
- reduce perceived delivery and operational risk
- align directly to bid evaluation criteria

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
- `content/04-deployment/main.md`
- `content/05-security/main.md`
- `content/06-implementation/main.md`
- `content/07-references/main.md`
- `content/07-support-sla/main.md`

**Consistency anchor:** Summary table uses identical column structure. Only approved reference names and outcomes.


### Tone Guidance

- concise
- institutional
- evidence-led
- low-hype
- technically literate without becoming engineering-deep

### What To Avoid

- generic blockchain background
- repeated DALP descriptions across sections
- unsupported quantitative claims
- deep appendices unless specifically requested



### Visual Element Policy

> **Directive (Gyan, 2026-04-05):** Screenshots are mandatory proof assets in every proposal skeleton. They are not optional decoration.

- **Minimum DALP screenshots for this variant:** 8
- **Section spread minimum:** use screenshots in at least 3 distinct major sections
- **Category variety minimum:** use screenshots from at least 3 screenshot categories unless the request is deliberately limited to one asset class or one workflow
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

- Word target: 900-1300
- Source references:
  - `templates/technical-proposal-part1.md`
  - `reusable/about-settlemint.md`
  - `reusable/about-dalp.md`
- Required subsections:

**Consistency anchor:** Always opens with the client's stated challenge before introducing the solution. No bullet lists, prose only.


### Executive Summary > Client Context and Objectives

- Visual elements: Screenshot: Dashboard overview for operational context
- Word target: 180-250
- Include:
  - `[VARIABLE: programme objective]`
  - `[VARIABLE: core challenge]`
  - `[VARIABLE: regulatory/operational drivers]`

### Executive Summary > Proposed Response

- Visual elements: Mermaid diagram: `solution-architecture.mmd`; Screenshot: Dashboard overview
- Word target: 300-420
- Include:
  - `[VARIABLE: selected deployment model]`
  - `[VARIABLE: scope summary]`
  - `[VARIABLE: key integrations]`
  - `[VARIABLE: compliance model]`
  - `[VARIABLE: phased delivery summary]`

### Executive Summary > Why SettleMint and DALP

- Visual elements: Table: Key differentiators summary
- Word target: 260-360
- Combine company/platform rationale
- Focus on:
  - institutional record
  - lifecycle coverage
  - compliance and operations

### Executive Summary > Reference Snapshot

- Word target: 120-180
- Include 2-3 relevant references only

### Executive Summary > Visual Spec

- one compact solution summary diagram or three-column table

> ✅ **Section complete when:** Client name and programme name appear in opening paragraph. At least two named differentiators present. Reference snapshot included. No bullet lists, prose only throughout.

## About SettleMint

- Word target: 900-1300
- Condensed scope: overview, credentials, regulatory readiness only
- Source references:
  - `reusable/about-settlemint.md`
  - `content/01-company-profile/main.md`
- Required subsections:

**Consistency anchor:** Company facts table present in every variant. No claims beyond approved source material.


### About SettleMint > Company Overview

- Visual elements: Table: Company facts summary
- Word target: 180-240

### About SettleMint > Credentials and Delivery Maturity

- Visual elements: Table: Proof-point summary; Screenshot: Dashboard showing operational maturity
- Word target: 300-420
- Use proof-point table

### About SettleMint > Regulatory Readiness

- Visual elements: Table: Jurisdiction/framework mapping; Screenshot: Compliance Policy Templates
- Word target: 220-320
- Use jurisdiction / control summary table

### About SettleMint > Relevance to This Bid

- Word target: 150-220
- Include placeholders:
  - `[VARIABLE: buyer type]`
  - `[VARIABLE: geography]`
  - `[VARIABLE: risk profile]`

### About SettleMint > Visual Spec

- one proof-point table
- optional one three-pillar graphic

### About SettleMint > Avoid

- no long corporate history
- no partner digression unless evaluator values ecosystem depth

> ✅ **Section complete when:** Company facts table present with 6+ approved metrics. Regulatory readiness table included. No unapproved claims.

## About DALP

- Word target: 1400-1900
- Condensed scope: overview, lifecycle pillars, key differentiators only
- Source references:
  - `reusable/about-dalp.md`
  - `content/02-architecture/main.md`
  - `content/03-asset-lifecycle/main.md`
- Required subsections:

**Consistency anchor:** Lifecycle pillar count (5) and names (Create, Comply, Custody, Settle, Service) consistent across all proposals.


### About DALP > Platform Overview

> MANDATORY DIAGRAM: Platform Architecture Overview (4-layer block diagram). Include as ```mermaid code block.

- Visual elements: Mermaid diagram: `platform-architecture-layers.mmd`; Screenshot: Dashboard, Asset Designer
- Word target: 220-300

### About DALP > Lifecycle Pillars

> MANDATORY DIAGRAM: Asset Lifecycle State Machine (state diagram). Include as ```mermaid code block.

- Visual elements: Mermaid diagram: `token-lifecycle-states.mmd`; Screenshot: Asset Operations; Table: Lifecycle capabilities
- Word target: 650-850 total
- Cover briefly:
  - Issuance
  - Compliance
  - Custody
  - Settlement
  - Servicing
- Instruction:
  - 100-150 words per pillar max

### About DALP > Platform Foundations

> MANDATORY DIAGRAM: Integration / Interoperability view. Include as ```mermaid code block.

- Visual elements: Mermaid diagram: `identity-access-model.mmd`; Screenshot: Identity & Verification, Monitoring
- Word target: 250-350
- Combine identity, interoperability, and operations in one compact section

### About DALP > Key Differentiators

- Visual elements: Table: Differentiator comparison
- Word target: 220-320
- Focus on:
  - unified lifecycle
  - ex-ante compliance
  - deployment flexibility
  - operational maturity

### About DALP > Visual Spec

- one lifecycle or layer diagram
- one differentiator table if needed

### About DALP > Avoid

- no full feature inventory
- no competitor naming unless bid requires it

> ✅ **Section complete when:** All five lifecycle pillars named and described. Asset class table or diagram present. Differentiator comparison included.

## Customer References

- Word target: 1000-1400
- Source references:
  - `reusable/reference-projects.md`
  - `content/07-references/main.md`
- Required subsections:

**Consistency anchor:** Summary table uses identical column structure across all proposals. Only approved reference names used.


### Customer References > Summary Table

- Visual elements: Table: Reference summary
- Word target: 150-220
- Include all approved references in a compact summary table

### Customer References > Expanded Reference 1

- Word target: 220-320
- Structure:
  - context
  - challenge
  - solution pattern
  - relevance

### Customer References > Expanded Reference 2

- Word target: 220-320
- Same structure

### Customer References > Fit Note

- Word target: 120-180
- Explain why these examples are most relevant to `[VARIABLE: client/use case]`

### Customer References > Visual Spec

- summary table only; no complex case-study layouts

### Customer References > Avoid

- no unsupported outcomes
- no more than 2 expanded examples in this variant

> ✅ **Section complete when:** Summary table includes all approved references. Expanded references follow context/challenge/solution/outcome structure. Selection rationale stated.

## Understanding of Requirements

- Word target: 900-1300
- Source references:
  - RFP / bid docs `[VARIABLE: source path]`
  - `templates/technical-proposal-part1.md`
- Required subsections:

**Consistency anchor:** Requirement domains map to the same category labels used in the compliance matrix.


### Understanding of Requirements > Requirement Summary

- Visual elements: Table: Client context summary
- Word target: 220-300
- Capture buyer context and core objectives

### Understanding of Requirements > Requirement Domains

- Visual elements: Table: Domain mapping matrix
- Word target: 350-500
- Use condensed table with domains:
  - business scope
  - compliance/control
  - integration
  - operations/deployment
  - support/governance

### Understanding of Requirements > Response Principles

- Word target: 180-260
- Use 4-5 principles only

### Understanding of Requirements > Avoid

- no long narrative restatement of the RFP

> ✅ **Section complete when:** Requirement domains mapped to table. Key challenges identified with implied complexity. Response principles stated.

## Proposed Solution

- Word target: 2200-3000
- Condensed scope with fewer subsections
- Source references:
  - `reusable/about-dalp.md`
  - `content/03-asset-lifecycle/main.md`
  - `content/03-integrations/main.md`
- Required subsections:

**Consistency anchor:** Every capability claim carries a confidence tag (🟢/🟡/🔴/⚪). Solution boundary stated before detail.


### Proposed Solution > Solution Overview

> MANDATORY DIAGRAM: Solution Architecture (end-to-end operating model). Include as ```mermaid code block.

- Visual elements: Mermaid diagram: `solution-architecture.mmd`; Screenshot: Dashboard
- Word target: 250-350
- Include solution boundary and scope assumptions

### Proposed Solution > Functional Capability Areas

- Visual elements: Screenshot: Asset Designer, Compliance Policy Templates, XVP Settlement, Identity & Verification
- Word target: 1200-1600 total
- Use 4 merged subsections:
  - Asset Setup and Lifecycle Management
  - Identity, Compliance, and Access Control
  - Settlement, Custody, and Operational Controls
  - Integration, APIs, and Reporting
- Instruction:
  - each subsection 280-420 words
  - focus on evaluator relevance, not exhaustive depth

### Proposed Solution > Functional Fit Table

- Word target: 220-320
- Table columns:
  - requirement area
  - response status
  - relevant DALP capability
  - notes/assumptions

### Proposed Solution > Visual Spec

- one end-to-end operating model diagram
- one fit table

### Proposed Solution > Avoid

- no separate deep-dive section for every lifecycle pillar

> ✅ **Section complete when:** Solution boundary diagram present. Every functional area has a confidence-tagged response. Fit matrix complete.

## Technical Architecture

- Word target: 1200-1700
- Condensed scope
- Source references:
  - `content/02-architecture/main.md`
  - `templates/technical-proposal-part1.md`
  - `content/04-deployment/main.md`
- Required subsections:

**Consistency anchor:** Four-layer naming convention consistent across all architecture sections and diagrams.


### Technical Architecture > Architecture Overview

> MANDATORY DIAGRAM: Layered Architecture (4-layer diagram). Include as ```mermaid code block.

- Visual elements: Mermaid diagram: `platform-architecture-layers.mmd`; Screenshot: Monitoring
- Word target: 250-350

### Technical Architecture > Core Layers and Components

- Visual elements: Table: Component inventory
- Word target: 450-650
- Merge application, execution, on-chain, data, and operations into one structured section

### Technical Architecture > Environment and Deployment Topology

- Word target: 250-350
- Include placeholders:
  - `[VARIABLE: environment model]`
  - `[VARIABLE: hosting pattern]`

### Technical Architecture > Resilience and Evidence Path

- Word target: 180-260
- Focus on durability, auditability, and read model consistency

### Technical Architecture > Visual Spec

- one layered architecture diagram
- optional environment topology mini-diagram

### Technical Architecture > Avoid

- no code-level implementation detail

> ✅ **Section complete when:** Layered architecture diagram present. All four layers described. Data architecture and environment topology covered.

## Security

- Word target: 1000-1400
- Condensed scope
- Source references:
  - `templates/technical-proposal-part2.md`
  - `content/05-security/main.md`
- Required subsections:

**Consistency anchor:** Security control descriptions match approved source wording. Certification claims cite exact scope.


### Security > Security Overview

> MANDATORY DIAGRAM: Security Architecture (defense-in-depth layers). Include as ```mermaid code block.

- Visual elements: Mermaid diagram: `security-layers.mmd`
- Word target: 180-240

### Security > Access, Authentication, and Segregation of Duties

> MANDATORY DIAGRAM: RBAC / Access Control Model. Include as ```mermaid code block.

- Visual elements: Mermaid diagram: `identity-access-model.mmd`; Table: Access control model
- Word target: 260-360

### Security > Key Management, Data Protection, and Auditability

- Visual elements: Table: Key storage backend comparison; Table: Data protection controls
- Word target: 320-420

### Security > Security Assurance

- Word target: 160-220
- Cover testing and evidence approach only

### Security > Visual Spec

- one control-layer diagram or shared-responsibility table

### Security > Avoid

- no certification list unless sourced and relevant

> ✅ **Section complete when:** Security domain diagram or responsibility matrix present. Authentication, key management, and data protection all addressed. No unsupported certification claims.

## Implementation & Delivery

- Word target: 900-1300
- Phases as table, not full writeup
- Source references:
  - `reusable/implementation-plan.md`
  - `content/06-implementation/main.md`
- Required subsections:

**Consistency anchor:** Phase names and sequence identical across all proposal variants. Gate criteria stated for every phase.


### Implementation & Delivery > Delivery Summary

> MANDATORY DIAGRAM: Implementation Timeline (Gantt-style phases). Include as ```mermaid code block.

- Visual elements: Mermaid diagram: `implementation-timeline.mmd`
- Word target: 120-180

### Implementation & Delivery > Phase Table

- Visual elements: Table: Phase table with gates; Mermaid diagram: `implementation-timeline.mmd`
- Word target: 450-650
- Table columns:
  - phase
  - objective
  - key activities
  - outputs
  - gate
- Required rows:
  - Discovery and Requirements
  - Foundation and Setup
  - Configuration and Compliance
  - Integration and Testing
  - Go-Live
  - Hypercare

### Implementation & Delivery > Governance and Resource Model

- Word target: 180-260
- use compact role table

### Implementation & Delivery > Delivery Risks

- Word target: 150-220
- keep high-level; detailed risk table appears later

### Implementation & Delivery > Visual Spec

- one implementation timeline table or gantt

> ✅ **Section complete when:** Phase table with gate criteria present. Timeline table included. Dependencies and governance addressed.

## Deployment

- Word target: 700-1000
- Recommended model only
- Source references:
  - `reusable/deployment-options.md`
  - `content/04-deployment/main.md`
- Required subsections:

**Consistency anchor:** Deployment model comparison uses identical criteria columns across all variants.


### Deployment > Recommended Model

> MANDATORY DIAGRAM: Deployment Architecture (topology). Include as ```mermaid code block.

- Visual elements: Mermaid diagram: `deployment-topology-saas.mmd` or `deployment-topology-onprem.mmd`; Screenshot: Monitoring, Settings
- Word target: 220-320
- Include placeholders:
  - `[VARIABLE: selected model]`
  - `[VARIABLE: rationale]`
  - `[VARIABLE: residency/security assumptions]`

### Deployment > Logical Topology and Requirements

- Visual elements: Table: Infrastructure requirements
- Word target: 250-350

### Deployment > Availability and Recovery Approach

- Word target: 150-220

### Deployment > Visual Spec

- one deployment topology or one comparison table

### Deployment > Avoid

- no full four-model essay in this variant

> ✅ **Section complete when:** Recommended model stated with rationale. Comparison table present. Infrastructure requirements listed.

## Support & SLA

- Word target: 700-1000
- Condensed: tiers table + severity table
- Source references:
  - `reusable/support-sla.md`
  - `content/07-support-sla/main.md`
- Required subsections:

**Consistency anchor:** SLA figures match approved source exactly. Tier names and coverage hours never modified without approval.


### Support & SLA > Support Model Summary

- Word target: 120-160

### Support & SLA > Support Tiers Table

- Visual elements: Table: SLA tier comparison; Screenshot: Monitoring
- Word target: 220-320

### Support & SLA > Severity / Response / Resolution Table

- Visual elements: Table: Severity matrix
- Word target: 180-260

### Support & SLA > Escalation and Maintenance Note

- Word target: 120-180

### Support & SLA > Avoid

- do not alter SLA figures without approval

> ✅ **Section complete when:** Support tier comparison table present. Severity/response matrix included. Escalation path defined.

## Risk Management

- Word target: 350-550
- Risk table only
- Source references:
  - `reusable/implementation-plan.md`
  - bid-specific risk inputs `[VARIABLE: source]`
- Required content:

**Consistency anchor:** Risk register uses identical column structure. Every risk has an owner and mitigation.


### Risk Management > Risk Table

- Visual elements: Table: Risk register
- Table columns:
  - risk
  - likelihood
  - impact
  - mitigation
  - owner
- Include minimum rows:
  - regulatory change
  - integration delay
  - client dependency delay
  - environment readiness
  - third-party dependency

### Risk Management > Avoid

- no long narrative here

> ✅ **Section complete when:** Risk register table present with all required columns. Minimum risk categories covered. Every risk has owner and mitigation.

## Compliance Matrix

- Word target: 700-1100
- Status codes + example
- Required subsections:

**Consistency anchor:** Status codes consistent with legend. Every row traces to a specific RFP requirement ID.


### Compliance Matrix > Status Legend

- Word target: 0-40
- Suggested codes:
  - Full
  - Partial
  - Configurable
  - Assumption
  - Out of Scope

### Compliance Matrix > Matrix Table

- Word target: 550-900
- Table columns:
  - requirement ID
  - requirement summary
  - status
  - response note
  - source reference
  - assumptions

### Compliance Matrix > Example Row

- Word target: 80-120
- generic only; use placeholders

### Compliance Matrix > Avoid

- no long paragraph cells

> ✅ **Section complete when:** Status legend defined. Matrix table covers all RFP requirements. No contradictory status labels.

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

- Word target: 350-550
- Checklist only

**Consistency anchor:** All checklist items verified before submission. No items skipped.


### Writer's Checklist > Structure

- headings unnumbered
- section order correct
- word targets roughly aligned

### Writer's Checklist > Evidence

- all claims source-backed
- references cross-checked
- no invented metrics

### Writer's Checklist > Consistency

- deployment model consistent
- client placeholders resolved where needed
- references selected for relevance

### Writer's Checklist > Formatting

- tables Word-friendly
- TOC auto-generated
- visuals labeled clearly

> ✅ **Section complete when:** All structural, evidence, customization, tone, and production checks listed.
