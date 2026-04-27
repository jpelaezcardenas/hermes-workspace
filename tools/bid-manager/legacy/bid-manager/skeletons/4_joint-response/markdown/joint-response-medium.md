---
skeleton-type: joint-response
variant: medium
target-pages: "40-60"
target-words: "12000-18000"
version: "BM-QS-01-v2.0"
last-updated: "2026-03-19"
---

# Joint Response Blueprint: Medium

> **Version:** BM-QS-01-v2.0 (MATRIX)
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

### Original Skeleton-Specific Rules

- [Target: 180-300 words]
- [Source: reusable/about-settlemint.md; reusable/about-dalp.md; reusable/reference-projects.md; reusable/implementation-plan.md; reusable/support-sla.md]
- [Key messages:
  - Medium variant preserves the joint-response logic in a shorter evaluator-friendly form.
  - Responsibility Matrix remains full-strength; supporting sections are condensed.
  - The document must still show one credible consortium offer with explicit boundaries.
]
- [Visual:
  - Optional section-purpose map table.
]
- [Writer guidance:
  - Condense through tables and merged sections, not by deleting ownership clarity.
  - Use `[PARTNER: ...]` placeholders for all partner-supplied content.
]
- [Do NOT:
  - Write finished proposal prose.
  - Remove the scope split logic.
]
- [Partner input needed: no]


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

- [Target: 900-1300 words]
- [Source: reusable/about-settlemint.md; reusable/about-dalp.md; [PARTNER: executive positioning]; [PARTNER: role summary]]
- [Key messages:
  - Present the joint value proposition quickly.
  - Summarize why the consortium is relevant, how responsibilities split, and how the solutions work together.
]
- [Visual:
  - Executive snapshot table with columns: Buyer objective | SettleMint | Partner | Joint result.
]
- [Writer guidance:
  - Use three compact blocks: joint rationale, responsibility split, delivery confidence.
]
- [Do NOT:
  - Turn this into two company bios.
]
- [Partner input needed: yes]



- Visual elements (use where relevant):
  - Diagram: `solution-architecture.mmd`
  - Table: key metrics summary, decision snapshot
  - Screenshot: Dashboard overview

**Consistency anchor:** Always opens with the client's stated challenge before introducing the solution. No bullet lists, prose only.

> ✅ **Section complete when:** Client name and programme name appear in opening paragraph. At least two named differentiators present. Reference snapshot included. No bullet lists, prose only throughout.

## About the Consortium

- [Target: 700-1000 words]
- [Source: reusable/about-settlemint.md; [PARTNER: consortium rationale]; [PARTNER: company profile summary]]
- [Key messages:
  - Explain who the partners are and why this combination works for the bid.
  - Show complementarity across platform, adjacent systems, and delivery.
]
- [Visual:
  - Capability split table.
]
- [Writer guidance:
  - Keep to essentials: membership, rationale, combined strengths, delivery model summary.
]
- [Do NOT:
  - Drift into a long alliance narrative.
]
- [Partner input needed: yes]



- Visual elements (use where relevant):
  - Table: consortium operating model (capability domain, SettleMint, partner, joint value)

**Consistency anchor:** Partner credentials sourced from partner-provided evidence only. Scope split visible from first paragraph.

> ✅ **Section complete when:** Both partners described. Complementarity demonstrated. Delivery model summarized.

## About SettleMint

- [Target: 500-800 words]
- [Source: reusable/about-settlemint.md]
- [Key messages:
  - Institutional credibility, platform-company positioning, and bid relevance.
]
- [Visual:
  - Proof-point mini-table.
  - Screenshot: Dashboard showing operational platform.
]
- [Writer guidance:
  - Keep to core vendor-selection evidence only.
]
- [Do NOT:
  - Include broad corporate history.
]
- [Partner input needed: no]



- Visual elements (use where relevant):
  - Table: company facts (6-8 approved metrics), certifications
  - Screenshot: Dashboard showing operational platform

**Consistency anchor:** Company facts table present in every variant. No claims beyond approved source material.

> ✅ **Section complete when:** Company facts table present with 6+ approved metrics. Regulatory readiness table included. No unapproved claims.

## About DALP

- [Target: 700-1000 words]
- [Source: reusable/about-dalp.md; content/]
- [Key messages:
  - Summarize DALP capabilities relevant to the joint scope.
  - Make the DALP-to-partner interface visible.
]
- [Visual:
  - Lifecycle summary graphic.
  - Screenshot: Dashboard, Asset Designer showing DALP platform capabilities.
]
- [Writer guidance:
  - Cover lifecycle breadth in compressed form.
]
- [Do NOT:
  - Expand into full technical architecture.
]
- [Partner input needed: no]



- Visual elements (use where relevant):
  - Diagram: `platform-architecture-layers.mmd`
  - Table: lifecycle pillars, capabilities matrix
  - Screenshot: Dashboard, Asset Designer

**Consistency anchor:** Lifecycle pillar count (5) and names (Create, Comply, Custody, Settle, Service) consistent across all proposals.

> ✅ **Section complete when:** All five lifecycle pillars named and described. Asset class table or diagram present. Differentiator comparison included.

## About [Partner]

- [Target: 500-800 words]
- [Source: [PARTNER: company overview]; [PARTNER: role summary]; [PARTNER: proof points]]
- [Key messages:
  - Summarize partner credentials and owned scope.
]
- [Visual:
  - Partner mini-facts table.
]
- [Writer guidance:
  - Use only partner-provided evidence.
]
- [Do NOT:
  - Draft unsupported credentials.
]
- [Partner input needed: yes]



- Visual elements (use where relevant):
  - Table: partner facts, scope matrix

**Consistency anchor:** Only partner-supplied evidence used. No inferred credentials.

> ✅ **Section complete when:** Partner credentials from supplied evidence. Owned scope defined. Out-of-scope items listed.

## References

- [Target: 900-1300 words]
- [Source: reusable/reference-projects.md; [PARTNER: references]; [PARTNER: approvals]]
- [Key messages:
  - Show that both consortium members bring relevant delivery proof.
  - Include a SettleMint summary table, 1-2 expanded SettleMint examples if needed, and a partner placeholder block.
]
- [Visual:
  - Combined references table with owner column.
]
- [Writer guidance:
  - Keep evaluator focus on scope relevance, not long case-study storytelling.
]
- [Do NOT:
  - Mix SettleMint and partner references without labeling ownership.
]
- [Partner input needed: yes]



- Visual elements (use where relevant):
  - Table: joint reference snapshot (client, combined scope, SettleMint role, partner role, outcome)

**Consistency anchor:** Summary table uses identical column structure. Only approved reference names and outcomes.

> ✅ **Section complete when:** Summary table with all approved references present. Expanded cases follow structured format.

## Understanding of Requirements

- [Target: 800-1200 words]
- [Source: content/; [PARTNER: requirement interpretation]]
- [Key messages:
  - Capture the buyer challenge in a compact joint frame.
  - Set up the responsibility split naturally.
]
- [Visual:
  - Requirement theme table.
]
- [Writer guidance:
  - Group requirements into 4-6 domains only.
]
- [Do NOT:
  - Copy the RFP word for word.
]
- [Partner input needed: yes]



- Visual elements (use where relevant):
  - Table: requirement theme summary, challenge-to-response map

**Consistency anchor:** Requirement domains map to the same category labels used in the compliance matrix.

> ✅ **Section complete when:** Requirement domains mapped to table. Key challenges identified with implied complexity. Response principles stated.

## Responsibility Matrix

- [Target: 1500-2200 words]
- [Source: reusable/about-dalp.md; content/; [PARTNER: responsibility inputs]; [PARTNER: exclusions]]
- [Key messages:
  - This remains the centerpiece of the medium variant.
  - Show ownership for every major RFP requirement area.
]
- [Visual:
  - Table with columns: RFP Requirement Area | SettleMint Scope | Partner Scope | Joint/Shared | Notes.
]
- [Writer guidance:
  - Keep full requirement coverage even if other sections are condensed.
  - Mark lead owner wherever “Joint/Shared” appears.
]
- [Do NOT:
  - Reduce this to a vague summary.
]
- [Partner input needed: yes]



- Visual elements (use where relevant):
  - Table: responsibility matrix (requirement area, SettleMint scope, partner scope, joint, notes)

**Consistency anchor:** Every requirement area has a named lead owner. No ambiguous 'shared' without clarification.

> ✅ **Section complete when:** Every RFP requirement area covered. Lead owner identified for all joint items. No ambiguous shared ownership.

## SettleMint Solution Scope

- [Target: 800-1200 words]
- [Source: reusable/about-dalp.md; content/]
- [Key messages:
  - Condensed explanation of DALP scope relevant to the buyer.
  - Show tokenization, compliance, settlement, lifecycle, and interface responsibilities.
]
- [Visual:
  - Scope summary matrix.
]
- [Writer guidance:
  - Focus on what evaluators need to connect DALP to the responsibility matrix.
]
- [Do NOT:
  - Recreate the full capability catalogue.
]
- [Partner input needed: no]

- Visual elements (use where relevant):
  - Diagram: `platform-architecture-layers.mmd`
  - Table: DALP scope matrix mapped to buyer capabilities


## Partner Solution Scope

- [Target: 700-1100 words]
- [Source: [PARTNER: solution scope]; [PARTNER: system ownership]]
- [Key messages:
  - Condensed explanation of partner-owned solution scope.
]
- [Visual:
  - Partner scope table.
]
- [Writer guidance:
  - Require explicit out-of-scope notes and interfaces.
]
- [Do NOT:
  - Infer missing partner scope.
]
- [Partner input needed: yes]



- Visual elements (use where relevant):
  - Table: partner scope matrix mapped to buyer capabilities

**Consistency anchor:** Only partner-supplied evidence used. No inferred credentials.

> ✅ **Section complete when:** Partner credentials from supplied evidence. Owned scope defined. Out-of-scope items listed.

## Joint Solution Architecture

- [Target: 900-1300 words]
- [Source: reusable/about-dalp.md; content/03-integrations/main.md; [PARTNER: architecture inputs]]
- [Key messages:
  - Show the joint operating architecture and key handoff points.
  - Demonstrate that the combined solution is coherent.
]
- [Visual:
  - Integration architecture diagram showing SettleMint DALP ↔ Partner System data flows, API touchpoints, and handoff boundaries.
  - Screenshot: Monitoring showing joint deployment health.
]
- [Writer guidance:
  - Keep the narrative short and let the diagram do the heavy lifting.
]
- [Do NOT:
  - Use an unlabeled generic diagram.
]
- [Partner input needed: yes]



- Visual elements (use where relevant):
  - Diagram: `integration-architecture.mmd`
  - Table: component map with ownership labels
  - Screenshot: Monitoring showing joint deployment

**Consistency anchor:** SettleMint and partner scopes clearly delineated. Integration handoff points explicitly labeled.

> ✅ **Section complete when:** Integration architecture diagram present. Handoff points labeled. Both scopes mapped to buyer requirements.

## Joint Implementation

- [Target: 900-1300 words]
- [Source: reusable/implementation-plan.md; [PARTNER: implementation inputs]; [PARTNER: milestones]]
- [Key messages:
  - One combined timeline with key milestones, ownership, and dependencies.
]
- [Visual:
  - Timeline table with columns: Milestone | SettleMint | Partner | Joint dependency | Output.
]
- [Writer guidance:
  - Keep to major phases and decision gates only.
]
- [Do NOT:
  - Present separate plans for each party.
]
- [Partner input needed: yes]



- Visual elements (use where relevant):
  - Diagram: `implementation-timeline.mmd`
  - Table: joint phase table (phase, objective, SettleMint role, partner role, outputs, dependencies)

**Consistency anchor:** Phase names and sequence identical across all proposal variants. Gate criteria stated for every phase.

> ✅ **Section complete when:** Combined timeline present. Workstream ownership explicit. Dependencies between partners identified.

## Joint Governance

- [Target: 600-900 words]
- [Source: reusable/implementation-plan.md; [PARTNER: governance inputs]]
- [Key messages:
  - Clarify decision rights, escalation, and programme coordination.
]
- [Visual:
  - Governance summary chart.
]
- [Writer guidance:
  - Cover steering, PMO/programme management, escalation, and change control in compressed form.
]
- [Do NOT:
  - Leave cross-partner issue resolution unclear.
]
- [Partner input needed: yes]



- Visual elements (use where relevant):
  - Table: governance structure, RACI summary, decision rights

**Consistency anchor:** Decision rights, escalation thresholds, and reporting cadence all stated explicitly.

> ✅ **Section complete when:** Decision rights defined. Escalation path documented. Reporting cadence stated.

## Support & SLA

- [Target: 700-1000 words]
- [Source: reusable/support-sla.md; [PARTNER: support model]; [PARTNER: SLA inputs]]
- [Key messages:
  - Show the joint support model in a compact operating table.
]
- [Visual:
  - Joint support table with columns: Domain | SettleMint | Partner | Escalation | SLA note.
  - Screenshot: Monitoring showing support dashboard.
]
- [Writer guidance:
  - Focus on usable operating clarity rather than long SLA text.
]
- [Do NOT:
  - Pretend a shared support model exists if not agreed.
]
- [Partner input needed: yes]



- Visual elements (use where relevant):
  - Table: support tier comparison, severity/response matrix, escalation path
  - Screenshot: Monitoring showing support dashboard

**Consistency anchor:** SLA figures match approved source exactly. Tier names and coverage hours never modified without approval.

> ✅ **Section complete when:** Support tier comparison table present. Severity/response matrix included. Escalation path defined.

## Risk Management

- [Target: 600-900 words]
- [Source: reusable/implementation-plan.md; [PARTNER: risk inputs]]
- [Key messages:
  - Highlight major joint delivery and integration risks with ownership and mitigation.
]
- [Visual:
  - Joint risk table.
]
- [Writer guidance:
  - Limit to the highest-value risks; keep ownership explicit.
]
- [Do NOT:
  - Use a generic project-risk list.
]
- [Partner input needed: yes]



- Visual elements (use where relevant):
  - Table: risk register (risk, impact, likelihood, owner, mitigation)

**Consistency anchor:** Risk register uses identical column structure. Every risk has an owner and mitigation.

> ✅ **Section complete when:** Risk register table present with all required columns. Minimum risk categories covered. Every risk has owner and mitigation.

## Customer References


- Visual elements (use where relevant):
  - Table: joint reference snapshot (client, combined scope, SettleMint role, partner role, outcome)

**Consistency anchor:** Summary table uses identical column structure across all proposals. Only approved reference names used.


### Customer References (700-1100 words total; 3-4 case studies)

- Write about: 3-4 references most relevant to the buyer's geography, asset class, regulatory setting, or operating model.
- Include: 1 summary table covering all approved references (`Client | Geography | Use Case | Deployment Scale | Outcome / Relevance`).
- For expanded examples, use a repeatable structure: context, challenge, DALP solution pattern, deployment scale, measurable outcomes, and transferability to this bid.
- Prefer: 3 expanded references in full variants, 2 in medium variants, compact table-only treatment in compact variants unless the skeleton explicitly requires more.
- Tone: evidence-backed, specific, non-promotional.
- Reference: `bid-manager/content/07-references/main.md`, `bid-manager/templates/case-studies.md`.
- Do not: add unapproved customer names, inferred metrics, or NDA-sensitive detail.


- Visual elements (use where relevant):
  - Table: reference summary (Client, Geography, Use Case, Scale, Outcome/Relevance)

> ✅ **Section complete when:** Summary table includes all approved references. Expanded references follow context/challenge/solution/outcome structure. Selection rationale stated.

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

## Deployment


- Visual elements (use where relevant):
  - Diagram: `deployment-topology-saas.mmd` or `deployment-topology-onprem.mmd`
  - Table: deployment option comparison
  - Screenshot: Settings, Monitoring

**Consistency anchor:** Deployment model comparison uses identical criteria columns across all variants.


### Deployment (500-900 words depending on variant)

- Write about: recommended deployment model, deployment alternatives considered, cloud/on-prem/hybrid options, infrastructure requirements, environment model, resilience, and data residency implications.
- Include: 1 comparison table covering Managed SaaS, private/dedicated cloud, on-premises, and hybrid where relevant.
- Include: 1 logical topology or environment summary showing how DALP fits the buyer's hosting model.
- Cover explicitly: infrastructure prerequisites (Kubernetes/OpenShift, PostgreSQL, Redis, object storage, ingress/network), DR/backup approach, and hosting responsibility.
- Tone: infrastructure-literate, non-speculative, requirements-driven.
- Reference: `bid-manager/content/04-deployment/main.md`.
- Do not: imply platform capability changes by deployment model or commit to unsupported residency/security claims.


- Visual elements (use where relevant):
  - Diagram: `deployment-topology-saas.mmd` or `deployment-topology-onprem.mmd`
  - Table: deployment model comparison
  - Screenshot: Monitoring, Settings

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

## Compliance Matrix

- [Target: 1000-1500 words]
- [Source: content/; reusable/about-dalp.md; [PARTNER: compliance ownership and evidence]]
- [Key messages:
  - Present requirement compliance in compact but explicit form.
  - Include status codes and a joint responsibility column.
]
- [Visual:
  - Table with columns: Requirement ID | Summary | SettleMint | Partner | Joint responsibility | Status | Notes.
]
- [Writer guidance:
  - Keep the matrix scannable and traceable back to main sections.
]
- [Do NOT:
  - Hide partial compliance conditions.
]
- [Partner input needed: yes]


- Visual elements (use where relevant):
  - Table: compliance matrix (requirement ID, summary, SettleMint response, status)

**Consistency anchor:** Status codes consistent with legend. Every row traces to a specific RFP requirement ID.

> ✅ **Section complete when:** Status legend defined. Matrix table covers all RFP requirements. No contradictory status labels.
