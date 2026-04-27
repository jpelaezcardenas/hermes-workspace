---
skeleton-type: joint-response
variant: full
target-pages: "80-120"
target-words: "25000-36000"
version: "BM-RS-04-v2.0"
last-updated: "2026-03-19"
---

# Joint Response Blueprint: Full

> **Version:** BM-RS-04-v2.0 (PRISM)
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
- [ ] Screenshot minimum: include at least 12 DALP screenshots sourced from `../shared/brand/dalp-screenshots/` or the catalog/registry references below
- [ ] Screenshot distribution: spread screenshots across at least 4 major sections; do not dump them into one section or appendix
- [ ] Screenshot variety: cover at least 4 screenshot categories unless the bid is narrowly focused on one asset class
- [ ] Screenshot captions: every screenshot is followed immediately by a `*Figure X: ...*` caption explaining what the screenshot proves
- [ ] Visual count: include diagrams, tables, and screenshots wherever they reinforce the narrative or help the evaluator understand faster than prose alone. There is no upper limit; use as many as the section content warrants
- [ ] Confidence tags: present on every substantive DALP capability claim
- [ ] No unsupported claims: every capability assertion maps to a source file
- [ ] No roadmap language: "coming soon", "planned", "will support" prohibited unless marked [ROADMAP]
- [ ] Prose quality: no section >50% bullets, rewrite to prose if needed
- [ ] Final sweep: run 7-sweep copy-editing framework (clarity, voice, structure, persuasion, specificity, rhythm, polish)

### Original Skeleton-Specific Rules

- [Target: 220-360 words]
- [Source: reusable/about-settlemint.md; reusable/about-dalp.md; reusable/reference-projects.md; reusable/implementation-plan.md; reusable/deployment-options.md; reusable/support-sla.md]
- [Key messages:
  - Full variant is the most complete joint-response structure for large and complex bids.
  - The core job is to make consortium logic obvious: who covers what, how the solutions fit, and how delivery is governed.
  - Every substantive claim must be sourced or clearly marked as partner-supplied input.
  - The response must show one combined offer without blurring accountability boundaries.
]
- [Visual:
  - No decorative visual.
  - Optional one-page blueprint map table listing all sections, owner, and purpose.
]
- [Writer guidance:
  - This document is blueprint-only; include instructions, not finished proposal prose.
  - No manual numbering in headings.
  - Use `[PARTNER: ...]` placeholders for all partner-supplied content.
  - Use DALP terminology only; do not use legacy ATK naming.
  - Make section ownership explicit through `[Partner input needed: yes/no]`.
]
- [Do NOT:
  - Write client-facing prose.
  - Invent joint references if none exist.
  - Blur platform scope and partner scope.
  - Assume the partner can claim SettleMint capabilities or vice versa.
]
- [Partner input needed: no]

- Visual elements (use where relevant):
  - Diagram: `compliance-transfer-flow.mmd`
  - Table: regulatory framework mapping
  - Screenshot: Compliance Policy Templates, Identity & Verification


## Global Writer Guidance

- [Target: 300-500 words]
- [Source: reusable/about-settlemint.md; reusable/about-dalp.md; reusable/reference-projects.md; reusable/implementation-plan.md; reusable/deployment-options.md; reusable/support-sla.md; content/]
- [Key messages:
  - The full joint response should read as a controlled consortium offer with explicit boundaries and integration logic.
  - Responsibility clarity matters more than marketing volume.
  - Integration, governance, support handoffs, and compliance ownership must be visible throughout.
]
- [Visual:
  - Document control matrix with columns: Section | Primary owner | Secondary contributor | Main evidence source | Main visual.
]
- [Writer guidance:
  - Prioritize matrices, tables, phased diagrams, and interface callouts over long narrative blocks.
  - Where SettleMint content is standard, point back to reusable source files rather than rewriting from scratch.
  - Where partner contribution is required, specify exact missing inputs and expected format.
  - Keep a consistent distinction between SettleMint-only, Partner-only, and Joint/Shared responsibilities.
]
- [Do NOT:
  - Repeat the same DALP description in multiple sections.
  - Turn the consortium story into two disconnected mini-proposals.
  - Hide unresolved scope boundaries.
]
- [Partner input needed: no]



### Visual Element Policy

> **Directive (Gyan, 2026-04-05):** Screenshots are mandatory proof assets in every proposal skeleton. They are not optional decoration.

- **Minimum DALP screenshots for this variant:** 12
- **Section spread minimum:** use screenshots in at least 4 distinct major sections
- **Category variety minimum:** use screenshots from at least 4 screenshot categories unless the request is deliberately limited to one asset class or one workflow
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

- [Target: 1800-2600 words]
- [Source: reusable/about-settlemint.md; reusable/about-dalp.md; reusable/reference-projects.md; content/]
- [Key messages:
  - Why this partnership is stronger than either party alone.
  - Combined response addresses the full buyer requirement perimeter.
  - SettleMint leads DALP platform scope; partner leads adjacent scope; both align through one delivery model.
  - Joint value proposition should combine platform control, domain fit, and delivery risk reduction.
]
- [Visual:
  - One-page executive consortium snapshot.
  - Table with columns: Buyer need | SettleMint contribution | Partner contribution | Joint outcome.
]
- [Writer guidance:
  - Structure into buyer challenge, consortium rationale, scope split, joint architecture summary, and delivery confidence.
  - Keep this section joint from the first line; do not write two separate company summaries.
  - Use buyer terminology where known.
]
- [Do NOT:
  - Overload with deep technical detail.
  - Hide responsibility split until later sections.
]
- [Partner input needed: yes]



- Visual elements (use where relevant):
  - Diagram: `solution-architecture.mmd`
  - Table: key metrics summary, decision snapshot
  - Screenshot: Dashboard overview

**Consistency anchor:** Always opens with the client's stated challenge before introducing the solution. No bullet lists, prose only.

> ✅ **Section complete when:** Client name and programme name appear in opening paragraph. At least two named differentiators present. Reference snapshot included. No bullet lists, prose only throughout.

## About the Consortium / Partnership

- [Target: 1400-2000 words]
- [Source: reusable/about-settlemint.md; reusable/about-dalp.md; content/]
- [Key messages:
  - Who the consortium members are.
  - Why this combination is relevant to the bid scope.
  - How the two organizations complement each other across technology, delivery, and governance.
]
- [Visual:
  - Consortium operating model diagram.
  - Table with columns: Capability domain | SettleMint | Partner | Joint value.
]
- [Writer guidance:
  - Cover partner selection rationale, delivery complementarity, commercial interface, and single-team operating principle.
  - Include `[PARTNER: legal entity details, service domains, market relevance, credential summary]`.
]
- [Do NOT:
  - Write generic alliance language without showing actual scope logic.
  - Present the partnership as informal or ad hoc.
]
- [Partner input needed: yes]



- Visual elements (use where relevant):
  - Table: consortium operating model (capability domain, SettleMint, partner, joint value)

**Consistency anchor:** Partner credentials sourced from partner-provided evidence only. Scope split visible from first paragraph.

> ✅ **Section complete when:** Both partners described. Complementarity demonstrated. Delivery model summarized.

## About SettleMint

- [Target: 1200-1800 words]
- [Source: reusable/about-settlemint.md]
- [Key messages:
  - SettleMint is the DALP platform provider for regulated digital asset lifecycle use cases.
  - Emphasize institutional credibility, delivery maturity, and relevance to the current bid.
]
- [Visual:
  - Company proof-point table.
  - Screenshot: Dashboard showing operational platform.
]
- [Writer guidance:
  - Reuse standard SettleMint material and tailor only where needed for bid relevance.
]
- [Do NOT:
  - Expand into generic corporate history.
]
- [Partner input needed: no]



- Visual elements (use where relevant):
  - Table: company facts (6-8 approved metrics), certifications
  - Screenshot: Dashboard showing operational platform

**Consistency anchor:** Company facts table present in every variant. No claims beyond approved source material.

> ✅ **Section complete when:** Company facts table present with 6+ approved metrics. Regulatory readiness table included. No unapproved claims.

## About DALP

- [Target: 1500-2200 words]
- [Source: reusable/about-dalp.md; content/]
- [Key messages:
  - DALP is the platform scope that SettleMint brings into the consortium.
  - Show lifecycle breadth: tokenization, compliance, settlement, lifecycle servicing, identity, integration, and operability.
  - Clarify that DALP is one part of the joint solution, not the whole programme on its own.
]
- [Visual:
  - DALP lifecycle diagram.
  - Capability matrix mapped to bid scope.
  - Screenshot: Dashboard, Asset Designer showing DALP platform capabilities.
]
- [Writer guidance:
  - Focus on platform capabilities relevant to the consortium response.
  - Mark interfaces and dependencies that connect to partner-owned domains.
]
- [Do NOT:
  - Claim responsibility for partner-owned systems or workstreams.
]
- [Partner input needed: no]



- Visual elements (use where relevant):
  - Diagram: `platform-architecture-layers.mmd`
  - Table: lifecycle pillars, capabilities matrix
  - Screenshot: Dashboard, Asset Designer

**Consistency anchor:** Lifecycle pillar count (5) and names (Create, Comply, Custody, Settle, Service) consistent across all proposals.

> ✅ **Section complete when:** All five lifecycle pillars named and described. Asset class table or diagram present. Differentiator comparison included.

## About [Partner Name]

- [Target: 1200-1800 words]
- [Source: [PARTNER: corporate overview]; [PARTNER: service portfolio]; [PARTNER: certifications or credentials]; [PARTNER: relevant bid evidence]]
- [Key messages:
  - Define who the partner is and why they belong in this consortium.
  - Show their owned scope, delivery credibility, and bid relevance.
]
- [Visual:
  - Partner facts table.
]
- [Writer guidance:
  - Use partner-provided content only.
  - Keep structure parallel to About SettleMint where useful for evaluator readability.
]
- [Do NOT:
  - Draft partner credentials without supplied evidence.
  - Repackage SettleMint proof points as partner proof points.
]
- [Partner input needed: yes]



- Visual elements (use where relevant):
  - Table: partner facts, scope matrix

**Consistency anchor:** Only partner-supplied evidence used. No inferred credentials.

> ✅ **Section complete when:** Partner credentials from supplied evidence. Owned scope defined. Out-of-scope items listed.

## Customer References: SettleMint

- [Target: 1200-1800 words]
- [Source: reusable/reference-projects.md]
- [Key messages:
  - Demonstrate reference fit for SettleMint-owned scope.
  - Prioritize relevance by asset class, buyer type, deployment model, regulatory setting, and integration complexity.
]
- [Visual:
  - Reference summary table.
  - Optional relevance map.
]
- [Writer guidance:
  - Select references that strengthen the exact DALP scope in the bid.
  - Distinguish between production, pilot, and programme stages if source material does.
]
- [Do NOT:
  - Include references that are not in approved source material.
]
- [Partner input needed: no]



- Visual elements (use where relevant):
  - Table: reference summary (Client, Geography, Use Case, Scale, Outcome/Relevance)

**Consistency anchor:** Summary table uses identical column structure across all proposals. Only approved reference names used.

> ✅ **Section complete when:** Summary table includes all approved references. Expanded references follow context/challenge/solution/outcome structure. Selection rationale stated.

## Customer References: [Partner]

- [Target: 1000-1600 words]
- [Source: [PARTNER: reference list]; [PARTNER: case studies]; [PARTNER: approvals for use]]
- [Key messages:
  - Demonstrate reference fit for partner-owned scope.
  - Show relevance to industry, delivery scale, and adjacent system domains.
]
- [Visual:
  - Partner reference table.
]
- [Writer guidance:
  - Require partner to provide approval status, customer names or anonymized labels, scope, geography, and role.
]
- [Do NOT:
  - Draft placeholder references as if they are real.
]
- [Partner input needed: yes]



- Visual elements (use where relevant):
  - Table: reference summary (Client, Geography, Use Case, Scale, Outcome/Relevance)

**Consistency anchor:** Summary table uses identical column structure across all proposals. Only approved reference names used.

> ✅ **Section complete when:** Summary table includes all approved references. Expanded references follow context/challenge/solution/outcome structure. Selection rationale stated.

## Joint Customer References

- [Target: 500-900 words]
- [Source: [PARTNER: joint reference details if any]; reusable/reference-projects.md]
- [Key messages:
  - Only include if genuine joint engagements exist.
  - Show proof that the two organizations can deliver together, not just separately.
]
- [Visual:
  - Joint reference snapshot table with columns: Client | Combined scope | SettleMint role | Partner role | Outcome relevance.
]
- [Writer guidance:
  - If no joint references exist, replace with an instruction note to use “No existing joint references available; rely on separate references plus joint governance/implementation proof.”
]
- [Do NOT:
  - Force a joint-reference story where none exists.
]
- [Partner input needed: yes]



- Visual elements (use where relevant):
  - Table: joint reference snapshot (client, combined scope, SettleMint role, partner role, outcome)

**Consistency anchor:** Summary table uses identical column structure across all proposals. Only approved reference names used.

> ✅ **Section complete when:** Summary table includes all approved references. Expanded references follow context/challenge/solution/outcome structure. Selection rationale stated.

## Understanding of Requirements

- [Target: 1600-2400 words]
- [Source: content/; [PARTNER: requirement interpretation notes]; [PARTNER: scope assumptions]]
- [Key messages:
  - Show a joint understanding of the buyer's business, technical, operational, and regulatory challenge.
  - Frame the requirement set in a way that naturally leads to the responsibility split.
]
- [Visual:
  - Requirement theme summary table.
  - Optional challenge-to-response map.
]
- [Writer guidance:
  - Organize around requirement domains rather than internal teams.
  - Mark where a requirement is primarily SettleMint-led, partner-led, or joint.
]
- [Do NOT:
  - Copy the RFP text verbatim.
  - Discuss solution design before showing requirement understanding.
]
- [Partner input needed: yes]



- Visual elements (use where relevant):
  - Table: requirement theme summary, challenge-to-response map

**Consistency anchor:** Requirement domains map to the same category labels used in the compliance matrix.

> ✅ **Section complete when:** Requirement domains mapped to table. Key challenges identified with implied complexity. Response principles stated.

## Responsibility Matrix

- [Target: 1800-2600 words]
- [Source: content/; reusable/about-dalp.md; [PARTNER: owned-scope list]; [PARTNER: scope exclusions]; [PARTNER: assumptions]]
- [Key messages:
  - This is the core control section of a joint response.
  - Every major requirement area must show ownership and shared boundaries.
  - Evaluators should be able to see who is accountable without reading the rest of the document.
]
- [Visual:
  - Table with columns: RFP Requirement Area | SettleMint Scope | Partner Scope | Joint/Shared | Notes.
]
- [Writer guidance:
  - Cover all requirement domains from the RFP, including cross-cutting functions such as security, integration, testing, training, support, governance, and compliance.
  - Add explicit notes for handoff points, dependencies, and exclusions.
  - Use a consistent legend if status codes are added.
]
- [Do NOT:
  - Leave ambiguous “shared” ownership without clarifying who leads.
  - Hide scope exclusions.
]
- [Partner input needed: yes]



- Visual elements (use where relevant):
  - Table: responsibility matrix (requirement area, SettleMint scope, partner scope, joint, notes)

**Consistency anchor:** Every requirement area has a named lead owner. No ambiguous 'shared' without clarification.

> ✅ **Section complete when:** Every RFP requirement area covered. Lead owner identified for all joint items. No ambiguous shared ownership.

## SettleMint Solution Scope

- [Target: 1800-2600 words]
- [Source: reusable/about-dalp.md; content/]
- [Key messages:
  - Define what DALP delivers in this joint response.
  - Cover tokenization, compliance, settlement, lifecycle servicing, identity-related controls, and integration-facing capabilities.
  - Show how SettleMint scope connects to, but does not replace, partner scope.
]
- [Visual:
  - DALP scope matrix mapped to buyer capabilities.
]
- [Writer guidance:
  - Organize by platform capability domain.
  - Add explicit interface notes wherever the partner system becomes the source, destination, or control boundary.
]
- [Do NOT:
  - Present DALP as the solution for non-DALP workstreams.
]
- [Partner input needed: no]

- Visual elements (use where relevant):
  - Diagram: `platform-architecture-layers.mmd`
  - Table: DALP scope matrix mapped to buyer capabilities


## Partner Solution Scope

- [Target: 1600-2400 words]
- [Source: [PARTNER: scope description]; [PARTNER: architecture inputs]; [PARTNER: service model]]
- [Key messages:
  - Define partner-owned solution domains and service responsibilities.
  - Show how partner scope complements SettleMint scope without overlap confusion.
]
- [Visual:
  - Partner scope matrix mapped to buyer capabilities.
]
- [Writer guidance:
  - Require partner to state owned systems, owned outcomes, key interfaces, major assumptions, and out-of-scope items.
]
- [Do NOT:
  - Write technical or delivery claims without partner-supplied evidence.
]
- [Partner input needed: yes]



- Visual elements (use where relevant):
  - Table: partner scope matrix mapped to buyer capabilities

**Consistency anchor:** Only partner-supplied evidence used. No inferred credentials.

> ✅ **Section complete when:** Partner credentials from supplied evidence. Owned scope defined. Out-of-scope items listed.

## Joint Solution Architecture

- [Target: 1800-2600 words]
- [Source: reusable/about-dalp.md; content/03-integrations/main.md; reusable/deployment-options.md; [PARTNER: architecture inputs]; [PARTNER: system landscape]]
- [Key messages:
  - Show how the consortium solution works as one architecture.
  - Clarify major systems, integration boundaries, data movement, operational domains, and control points.
  - Make the evaluator comfortable that the two solution parts actually fit together.
]
- [Visual:
  - Integration architecture diagram showing SettleMint DALP ↔ Partner System data flows, API touchpoints, and handoff boundaries.
  - Supporting component map.
  - Screenshot: Monitoring showing joint deployment health.
]
- [Writer guidance:
  - Start with a high-level operating model, then drill into system interaction layers.
  - Label ownership on the diagram itself where possible.
]
- [Do NOT:
  - Produce a generic block diagram that hides interfaces.
]
- [Partner input needed: yes]



- Visual elements (use where relevant):
  - Diagram: `integration-architecture.mmd`
  - Table: component map with ownership labels
  - Screenshot: Monitoring showing joint deployment

**Consistency anchor:** SettleMint and partner scopes clearly delineated. Integration handoff points explicitly labeled.

> ✅ **Section complete when:** Integration architecture diagram present. Handoff points labeled. Both scopes mapped to buyer requirements.

## Integration Design

- [Target: 1600-2400 words]
- [Source: content/03-integrations/main.md; reusable/about-dalp.md; [PARTNER: integration specifications]; [PARTNER: API and interface notes]]
- [Key messages:
  - Define technical integration points between DALP and partner-owned systems.
  - Clarify APIs, events, files, messaging, orchestration, reconciliation, identity flows, and exception handling.
]
- [Visual:
  - Integration architecture diagram showing SettleMint DALP ↔ Partner System data flows, API touchpoints, and handoff boundaries.
  - Interface catalogue table.
  - Screenshot: relevant integration interface.
]
- [Writer guidance:
  - Cover inbound/outbound interfaces, ownership of each connector, data stewardship, and non-functional considerations.
  - Add notes for testing responsibility and cutover sequencing.
]
- [Do NOT:
  - Collapse architecture and integration into vague prose.
]
- [Partner input needed: yes]



- Visual elements (use where relevant):
  - Diagram: `integration-architecture.mmd`
  - Table: interface catalog (system, direction, protocol, owner)
  - Screenshot: relevant integration interface

**Consistency anchor:** Interface ownership labeled for every connection. Testing responsibility stated.

> ✅ **Section complete when:** Interface catalog present. Ownership labeled for every connector. Testing responsibility stated.

## Security

- [Target: 1400-2200 words]
- [Source: content/05-security/main.md; reusable/about-dalp.md; [PARTNER: security controls]; [PARTNER: certifications]; [PARTNER: shared responsibility model]]
- [Key messages:
  - Present a joint security model covering SettleMint controls, partner controls, and integration-layer controls.
  - Make shared responsibility explicit.
]
- [Visual:
  - Security responsibility matrix.
  - Control-layer diagram.
  - Screenshot: Identity & Verification screenshots.
]
- [Writer guidance:
  - Split into platform security, partner environment security, integration security, operational security processes, and incident coordination.
]
- [Do NOT:
  - Claim partner certifications or controls without evidence.
  - Leave incident ownership ambiguous.
]
- [Partner input needed: yes]



- Visual elements (use where relevant):
  - Diagram: `security-layers.mmd`
  - Table: security control layers, compliance matrix
  - Screenshot: Identity & Verification

**Consistency anchor:** Security control descriptions match approved source wording. Certification claims cite exact scope.

> ✅ **Section complete when:** Security domain diagram or responsibility matrix present. Authentication, key management, and data protection all addressed. No unsupported certification claims.

## Joint Implementation Plan

- [Target: 1800-2600 words]
- [Source: reusable/implementation-plan.md; content/06-implementation/main.md; [PARTNER: implementation plan]; [PARTNER: workstream durations]; [PARTNER: dependency list]]
- [Key messages:
  - Show a single implementation journey across both organizations.
  - Make dependencies, sequencing, and workstream ownership explicit.
  - Reduce buyer fear around coordination risk.
]
- [Visual:
  - Joint delivery timeline.
  - Workstream dependency map.
  - Table with columns: Phase | Objective | SettleMint role | Partner role | Joint outputs | Dependencies.
]
- [Writer guidance:
  - Reconcile SettleMint implementation phases with the partner timeline.
  - Call out design authority, decision gates, test phases, cutover, and hypercare.
]
- [Do NOT:
  - Present two disconnected implementation plans.
]
- [Partner input needed: yes]



- Visual elements (use where relevant):
  - Diagram: `implementation-timeline.mmd`
  - Table: joint phase table (phase, objective, SettleMint role, partner role, outputs, dependencies)

**Consistency anchor:** Phase names and sequence identical across all proposal variants. Gate criteria stated for every phase.

> ✅ **Section complete when:** Combined timeline present. Workstream ownership explicit. Dependencies between partners identified.

## Joint Governance Model

- [Target: 1200-1800 words]
- [Source: reusable/implementation-plan.md; [PARTNER: governance model]; [PARTNER: escalation paths]; [PARTNER: programme roles]]
- [Key messages:
  - Governance is a joint operating mechanism, not a formality.
  - Clarify steering, programme management, decision rights, escalation, change control, and communication cadence.
]
- [Visual:
  - Governance structure chart.
  - RACI-style summary.
]
- [Writer guidance:
  - Identify lead contacts, decision forums, escalation thresholds, reporting cadence, and issue ownership.
]
- [Do NOT:
  - Leave the buyer guessing who resolves cross-partner disputes.
]
- [Partner input needed: yes]



- Visual elements (use where relevant):
  - Table: governance structure, RACI summary, decision rights

**Consistency anchor:** Decision rights, escalation thresholds, and reporting cadence all stated explicitly.

> ✅ **Section complete when:** Decision rights defined. Escalation path documented. Reporting cadence stated.

## Deployment

- [Target: 1000-1600 words]
- [Source: reusable/deployment-options.md; [PARTNER: deployment model]; [PARTNER: hosting responsibilities]]
- [Key messages:
  - Explain how SettleMint deployment options fit into the broader partner-led or shared delivery landscape.
  - Clarify hosting, environments, environment ownership, and operational boundaries.
]
- [Visual:
  - Deployment responsibility table.
  - Environment topology diagram.
  - Screenshot: Monitoring, Settings showing deployment model.
]
- [Writer guidance:
  - Show target deployment model, environment split, operational ownership, and integration placement.
]
- [Do NOT:
  - Describe deployment in DALP-only terms without showing partner fit.
]
- [Partner input needed: yes]



- Visual elements (use where relevant):
  - Diagram: `deployment-topology-saas.mmd` or `deployment-topology-onprem.mmd`
  - Table: deployment option comparison
  - Screenshot: Settings, Monitoring

**Consistency anchor:** Deployment model comparison uses identical criteria columns across all variants.

> ✅ **Section complete when:** Recommended model stated with rationale. Comparison table present. Infrastructure requirements listed.

## Training

- [Target: 800-1400 words]
- [Source: reusable/implementation-plan.md; [PARTNER: training scope]; [PARTNER: training materials or approach]]
- [Key messages:
  - Training should look coordinated to the buyer, even if delivered by different parties.
  - Distinguish product training, process training, admin training, and operational handover.
]
- [Visual:
  - Training programme matrix with columns: Audience | Topic | Owner | Format | Timing.
]
- [Writer guidance:
  - Define which training modules SettleMint delivers, which the partner delivers, and which are joint.
]
- [Do NOT:
  - Present fragmented training streams with no overall owner.
]
- [Partner input needed: yes]



- Visual elements (use where relevant):
  - Table: training audience matrix (audience, topic, format, timing)

**Consistency anchor:** Training audience categories consistent across proposals. No certification promises unless offered.

> ✅ **Section complete when:** Training track table present. All audience types covered. Knowledge transfer method described.

## Support & SLA

- [Target: 1200-1800 words]
- [Source: reusable/support-sla.md; [PARTNER: support model]; [PARTNER: SLA tiers]; [PARTNER: escalation model]]
- [Key messages:
  - Show who supports what after go-live.
  - Make handoff and escalation between partners operationally clear.
  - Joint support must feel usable, not theoretical.
]
- [Visual:
  - Joint support table.
  - Escalation path diagram.
  - Table with columns: Support domain | SettleMint responsibility | Partner responsibility | Joint process | SLA note.
  - Screenshot: Monitoring showing support dashboard.
]
- [Writer guidance:
  - Cover L1/L2/L3 boundaries, incident triage, severity routing, shared war-room rules, and customer communications.
]
- [Do NOT:
  - Pretend one party supports the other's stack without agreement.
]
- [Partner input needed: yes]



- Visual elements (use where relevant):
  - Table: support tier comparison, severity/response matrix, escalation path
  - Screenshot: Monitoring showing support dashboard

**Consistency anchor:** SLA figures match approved source exactly. Tier names and coverage hours never modified without approval.

> ✅ **Section complete when:** Support tier comparison table present. Severity/response matrix included. Escalation path defined.

## Risk Management

- [Target: 1000-1600 words]
- [Source: reusable/implementation-plan.md; [PARTNER: risk register inputs]; [PARTNER: dependency risks]]
- [Key messages:
  - Joint responses carry consortium-specific risks that need explicit control.
  - Scope boundaries, integration readiness, decision latency, data ownership, and support handoffs should be visible as managed risks.
]
- [Visual:
  - Joint risk register table with columns: Risk | Impact | Likelihood | Owner | Mitigation | Trigger.
]
- [Writer guidance:
  - Include partnership-specific and integration-specific risks, not just generic project risks.
]
- [Do NOT:
  - Use a generic risk list that ignores consortium realities.
]
- [Partner input needed: yes]



- Visual elements (use where relevant):
  - Table: risk register (risk, impact, likelihood, owner, mitigation)

**Consistency anchor:** Risk register uses identical column structure. Every risk has an owner and mitigation.

> ✅ **Section complete when:** Risk register table present with all required columns. Minimum risk categories covered. Every risk has owner and mitigation.

## Project Implementation & Delivery


- Visual elements (use where relevant):
  - Diagram: `implementation-timeline.mmd`
  - Table: phase table, RACI matrix

**Consistency anchor:** Phase names and sequence identical across all proposal variants. Gate criteria stated for every phase.


### Project Implementation & Delivery (900-1400 words depending on variant)

- Write about: delivery methodology, implementation phases, indicative timeline, governance, RACI, milestones, gates, client dependencies, and delivery risks.
- Include: 1 phase table or Gantt-style timeline with phases, objectives, outputs, dependencies, and acceptance gates.
- Include: 1 compact RACI or role matrix showing SettleMint, client, and partner roles if relevant.
- Cover explicitly: methodology, phase objectives, milestone logic, hypercare/transition, and the decisions needed to stay on schedule.
- Tone: disciplined, realistic, execution-focused.
- Reference: `bid-manager/content/06-implementation/main.md`, `bid-manager/templates/implementation-plan.md`.
- Do not: present sample timelines as contractual commitments or hide client responsibilities.


- Visual elements (use where relevant):
  - Diagram: `implementation-timeline.mmd`
  - Table: phase table, RACI matrix

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

## Compliance Matrix

- [Target: 1600-2400 words]
- [Source: content/; reusable/about-dalp.md; [PARTNER: compliance ownership matrix]; [PARTNER: evidence list]]
- [Key messages:
  - Close the response with a requirement-by-requirement compliance view.
  - Make ownership and response status obvious.
]
- [Visual:
  - Compliance matrix table with columns: Requirement ID | Requirement summary | SettleMint response | Partner response | Joint responsibility | Status | Notes.
]
- [Writer guidance:
  - Use consistent response codes if the bid expects them.
  - Point to detailed sections where needed.
  - Make all partial-compliance or dependency conditions explicit.
]
- [Do NOT:
  - Hide assumptions or qualify ownership in vague footnotes only.
]
- [Partner input needed: yes]


- Visual elements (use where relevant):
  - Table: compliance matrix (requirement ID, summary, SettleMint response, status)

**Consistency anchor:** Status codes consistent with legend. Every row traces to a specific RFP requirement ID.

> ✅ **Section complete when:** Status legend defined. Matrix table covers all RFP requirements. No contradictory status labels.
