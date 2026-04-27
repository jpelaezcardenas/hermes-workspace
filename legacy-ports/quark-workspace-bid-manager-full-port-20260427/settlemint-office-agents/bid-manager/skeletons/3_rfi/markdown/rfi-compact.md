---
skeleton-type: rfi
variant: compact
target-pages: "20-30"
target-words: "6000-9000"
version: "BM-RS-03-v2.0"
last-updated: "2026-03-19"
---

# RFI Response Blueprint: Compact

> **Version:** BM-RS-03-v2.0 (SHIELD)
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

### Original Skeleton-Specific Rules

- [Target: 180-300 words]
- [Source: templates/rfi-response.md]
- [Key messages:
  - Essential decision-support only
  - Tight, skimmable, executive-friendly structure
  - Focus on capability, credibility, security, delivery, and boundaries]
- [Visual:
  - 4-6 visuals total
  - Prefer summary tables and one architecture diagram]
- [Writer guidance:
  - Keep all sections lean
  - Merge related topics aggressively where reader value improves
  - Every section still needs source references, key messages, visual instructions, writer guidance, and exclusions]
- [Do NOT:
  - Write prose content in this blueprint
  - Manually number headings
  - Expand into deep technical appendix territory]


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



## Cover Letter

- [Target: 250-350 words]
- [Source: templates/rfi-response.md; reusable/about-settlemint.md; reusable/about-dalp.md]
- [Key messages:
  - Why SettleMint is responding
  - Why DALP is relevant
  - Why this response should be taken seriously]
- [Visual:
  - No visual]
- [Writer guidance:
  - One page max
  - Mention initiative, primary use case, and strongest credibility angle]
- [Do NOT:
  - Duplicate the body section structure in paragraph form]


**Consistency anchor:** One page maximum. Named recipient and initiative. No generic sales language.

> ✅ **Section complete when:** One page maximum. Named recipient addressed. Initiative and DALP relevance stated. Signatory placeholder present.

## About DALP


- Visual elements: `platform-architecture-layers.mmd`; Dashboard, Asset Designer

**Consistency anchor:** Lifecycle pillar count (5) and names (Create, Comply, Custody, Settle, Service) consistent across all proposals.


### About DALP (350-500 words, 3-4 paragraphs or equivalent table-led structure)

- Write about: DALP as the Digital Asset Lifecycle Platform, its lifecycle coverage, key capabilities, deployment flexibility, and operational differentiators.
- Include: 1 capability matrix or layered table covering lifecycle pillars, integration surfaces, and differentiators most relevant to the bid.
- Cover explicitly: platform overview, supported operating scope, core capabilities, and why DALP is different from fragmented point-solution stacks.
- Tone: platform-led, precise, evaluator-friendly.
- Reference: `bid-manager/templates/company-profile.md` (for positioning parallels where needed), `bid-manager/content/01-company-profile/main.md` for company/platform narrative alignment, plus existing DALP sources already listed in each skeleton.
- Do not: drift into feature-spam, roadmap claims, or generic blockchain education.


- Visual elements: `platform-architecture-layers.mmd`; Dashboard, Asset Designer

> ✅ **Section complete when:** All five lifecycle pillars named and described. Asset class table or diagram present. Differentiator comparison included.

## Company Overview

- [Target: 700-1000 words]
- [Source: reusable/about-settlemint.md]
- [Key messages:
  - Production-grade platform company for regulated markets
  - Mission and market position
  - Fast proof points and sector relevance]
- [Visual:
  - Company facts/proof-points table]
- [Writer guidance:
  - Keep to three blocks: who we are, proof points, vertical relevance]
- [Do NOT:
  - Expand into full history narrative]


- Visual elements: company facts, credentials, certifications

**Consistency anchor:** Company facts table present. No claims beyond approved source material.


### Who SettleMint Is

- [Target: 220-320 words]
- [Source: reusable/about-settlemint.md]
- [Key messages:
  - Regulated-market focus
  - Platform company, not operator]
- [Visual:
  - None]
- [Writer guidance:
  - Define category clearly in first lines]
- [Do NOT:
  - Use generic blockchain-company framing]

- Visual elements: company facts sidebar


### Proof Points and Relevance

- [Target: 300-450 words]
- [Source: reusable/about-settlemint.md; reusable/reference-projects.md]
- [Key messages:
  - Production deployments
  - Regulatory readiness
  - Institutional and sovereign credibility]
- [Visual:
  - Proof-point table]
- [Writer guidance:
  - Prioritize the 5-7 strongest proof points only]
- [Do NOT:
  - Add unsupported quantitative claims]

> ✅ **Section complete when:** Company facts table present. Mission and market position stated. Vertical relevance addressed.

## Platform Overview

- [Target: 1400-1900 words]
- [Source: reusable/about-dalp.md; content/01-configurable-tokens/main.md; content/02-configurable-compliance/main.md; content/03-integrations/main.md; reusable/deployment-options.md]
- [Key messages:
  - DALP is the unified lifecycle platform
  - Capability summary across lifecycle pillars
  - Asset-class coverage, integration, and deployment flexibility
  - Differentiation is lifecycle + compliance + settlement + operability]
- [Visual:
  - Lifecycle diagram
  - High-level architecture diagram
  - Asset class summary table  - Screenshot: Dashboard, Asset Designer showing platform capabilities.
]
- [Writer guidance:
  - Keep to four compact subsections: what it is, what it covers, how it fits, why it matters]
- [Do NOT:
  - Recreate the full technical architecture chapter]


- Visual elements: `platform-architecture-layers.mmd`; Dashboard, Asset Designer

**Consistency anchor:** Lifecycle pillars and asset class count consistent with canonical DALP sources.


### What DALP Is

- [Target: 250-350 words]
- [Source: reusable/about-dalp.md]
- [Key messages:
  - Digital Asset Lifecycle Platform
  - Solves pilot-to-production gap]
- [Visual:
  - None or tiny positioning graphic]
- [Writer guidance:
  - Crisp definition first]
- [Do NOT:
  - Open with industry jargon]

- Visual elements: `platform-architecture-layers.mmd`; Dashboard showing platform positioning


### Capabilities Summary

- [Target: 550-750 words]
- [Source: reusable/about-dalp.md]
- [Key messages:
  - Create, comply, custody, settle, service
  - Seven asset classes plus configurable token]
- [Visual:
  - Lifecycle pillar diagram
  - Asset class table  - Screenshot: Dashboard, Asset Operations showing capabilities.
]
- [Writer guidance:
  - One short block per pillar]
- [Do NOT:
  - Repeat the same compliance and security wording under each pillar]

### Architecture, Integration, and Deployment Fit

- [Target: 450-650 words]
- [Source: content/03-integrations/main.md; reusable/deployment-options.md; reusable/about-dalp.md]
- [Key messages:
  - APIs, SDK, CLI, eventing
  - Fits with core banking, custody, identity, payment infrastructure
  - On-prem, cloud, hybrid, managed SaaS]
- [Visual:
  - Simple architecture diagram
  - Deployment option mini-table]
- [Writer guidance:
  - Keep practical and evaluator-friendly]
- [Do NOT:
  - Detail every interface namespace]


- Visual elements: `integration-architecture.mmd`; integration matrix (system, protocol, direction)

> ✅ **Section complete when:** Lifecycle pillars diagram present. Architecture overview included. Deployment flexibility addressed.

## References

- [Target: 700-1000 words]
- [Source: reusable/reference-projects.md]
- [Key messages:
  - Breadth of deployment experience
  - At-a-glance fit across regions and use cases]
- [Visual:
  - Full reference summary table]
- [Writer guidance:
  - Summary table only in compact variant
  - Add one short “most relevant examples” note if needed, without full case-study expansion]
- [Do NOT:
  - Omit the reference table]


- Visual elements: joint reference snapshot (client, combined scope, SettleMint role, partner role, outcome)

**Consistency anchor:** Summary table uses identical column structure. Only approved reference names and outcomes.


### Reference Summary Table

- [Target: 500-700 words]
- [Source: reusable/reference-projects.md]
- [Key messages:
  - Coverage across banking, sovereign, capital markets, and real assets]
- [Visual:
  - 14-row table]
- [Writer guidance:
  - Use tight columns: client / use case / geography / status]
- [Do NOT:
  - Add extra outcome detail not in source]


- Visual elements: reference summary (client, geography, use case, scale, outcome)

> ✅ **Section complete when:** Summary table with all approved references present. Expanded cases follow structured format.

## Solution Capabilities

- [Target: 1300-1800 words]
- [Source: content/01-configurable-tokens/main.md; content/02-configurable-compliance/main.md; content/03-integrations/main.md; reusable/about-dalp.md; templates/rfi-response.md]
- [Key messages:
  - Tokenization, settlement, identity, and compliance work as one system
  - Digital twin vs native issuance options
  - Ex-ante compliance and atomic settlement are central differentiators
  - Responsibility boundaries remain explicit]
- [Visual:
  - Capability matrix
  - Compliance flow diagram
  - Responsibility split mini-table]
- [Writer guidance:
  - Merge tokenization + settlement + compliance into one coherent section
  - Use concise sub-blocks: tokenization, compliance, settlement, boundaries]
- [Do NOT:
  - Split into too many subsections or recreate medium-depth chapters]

### Tokenization and Asset Model

- [Target: 350-500 words]
- [Source: content/01-configurable-tokens/main.md; templates/rfi-response.md]
- [Key messages:
  - Digital twin and native issuance models
  - Configurable token architecture
  - Asset classes with lifecycle logic]
- [Visual:
  - Model comparison table  - Screenshot: Asset Designer showing token configuration.
]
- [Writer guidance:
  - Focus on instrument flexibility and governance]
- [Do NOT:
  - Dive into low-level contract internals]

- Visual elements: Asset Designer; tokenization model comparison, asset class diagram


### Compliance and Identity

- [Target: 450-650 words]
- [Source: content/02-configurable-compliance/main.md; reusable/about-dalp.md]
- [Key messages:
  - OnchainID, identity registry, trusted issuers
  - Ex-ante compliance via module framework
  - Regulatory mapping is configurable, not legal advice]
- [Visual:
  - Compliance flow diagram
  - Module category table  - Screenshot: Compliance Policy Templates, Identity & Verification.
]
- [Writer guidance:
  - Explain why non-compliant transfers do not execute]
- [Do NOT:
  - Promise universal regulatory coverage]

- Visual elements: `compliance-transfer-flow.mmd`; Compliance Policy Templates, Identity & Verification


### Settlement, Integration, and Boundaries

- [Target: 350-500 words]
- [Source: content/03-integrations/main.md; templates/rfi-response.md; reusable/about-dalp.md]
- [Key messages:
  - DvP/XvP, durable transaction handling, integration surfaces
  - SettleMint provides platform; clients and partners provide external systems and regulated services]
- [Visual:
  - Capability/responsibility mini-matrix  - Screenshot: XVP Settlement screenshots.
]
- [Writer guidance:
  - Close the section with explicit “what SettleMint does not do” bullets]
- [Do NOT:
  - Describe DALP as custodian, KYC provider, or legal advisor]

- Visual elements: `integration-architecture.mmd`; integration matrix (system, protocol, direction)


## Security Overview

- [Target: 900-1300 words]
- [Source: content/05-security/main.md; templates/rfi-response.md; reusable/deployment-options.md]
- [Key messages:
  - Defense-in-depth security architecture
  - Auth, access, keys, and deployment controls
  - Certifications support institutional trust]
- [Visual:
  - Security layers diagram
  - Key backend table
  - Certification summary table]
- [Writer guidance:
  - Keep to three tight blocks: control layers, key management, certifications/residency]
- [Do NOT:
  - Expand into a full security whitepaper]


- Visual elements: `security-layers.mmd`; Identity & Verification

**Consistency anchor:** Security control descriptions match approved source wording. Certification claims cite exact scope.


### Control Layers

- [Target: 350-500 words]
- [Source: content/05-security/main.md]
- [Key messages:
  - Identity verification
  - Role-based access control
  - Wallet verification
  - On-chain compliance enforcement
  - Custody policy layer]
- [Visual:
  - Security layer stack diagram]
- [Writer guidance:
  - Present security as structural, not bolt-on]
- [Do NOT:
  - Focus only on perimeter controls]

### Key Management, Certifications, and Residency

- [Target: 350-500 words]
- [Source: content/05-security/main.md; reusable/deployment-options.md]
- [Key messages:
  - Key Guardian and external custody options
  - ISO 27001 and SOC 2 Type II
  - Residency depends on deployment model]
- [Visual:
  - Backend/certification table]
- [Writer guidance:
  - Tie security options to institutional deployment choices]
- [Do NOT:
  - Make blanket claims about every deployment using HSM]


- Visual elements: backend/use-case table, custody path

> ✅ **Section complete when:** Security domain diagram or responsibility matrix present. Authentication, key management, and data protection all addressed. No unsupported certification claims.

## Implementation Timeline

- [Target: 650-950 words]
- [Source: reusable/implementation-plan.md; templates/rfi-response.md]
- [Key messages:
  - Structured phased approach
  - Timeline depends on scope and client readiness
  - Governance and dependencies must be explicit]
- [Visual:
  - Timeline table or Gantt  - Mermaid diagram: Use `implementation-timeline.mmd`.
]
- [Writer guidance:
  - Use a compact 5-phase table: phase / duration / key outputs / client inputs]
- [Do NOT:
  - Overload with phase-by-phase detail]


- Visual elements: `implementation-timeline.mmd`; phase table, RACI matrix

**Consistency anchor:** Phase names and sequence identical across all proposal variants. Gate criteria stated for every phase.


### Implementation Plan Table

- [Target: 450-650 words]
- [Source: reusable/implementation-plan.md; templates/rfi-response.md]
- [Key messages:
  - Discovery, configuration, integration/testing, go-live, ongoing ops]
- [Visual:
  - Single implementation table]
- [Writer guidance:
  - Keep it one-page equivalent]
- [Do NOT:
  - Insert hard dates unless required]

- Visual elements: `implementation-timeline.mmd`; phase table with gate criteria, RACI matrix


### Dependencies and Governance Note

- [Target: 120-220 words]
- [Source: reusable/implementation-plan.md]
- [Key messages:
  - Infrastructure, access, approvals, client team availability]
- [Visual:
  - Small assumptions box]
- [Writer guidance:
  - Keep explicit and short]
- [Do NOT:
  - Hide client obligations]


- Visual elements: dependency table (infrastructure, credentials, documentation, decisions)

> ✅ **Section complete when:** Phase table with gate criteria present. Timeline table included. Dependencies and governance addressed.

## Commercial Summary

- [Target: 500-750 words]
- [Source: templates/rfi-response.md; reusable/support-sla.md]
- [Key messages:
  - Annual platform subscription framing
  - Support tiers summarized
  - Services scoped separately]
- [Visual:
  - Support-tier comparison table]
- [Writer guidance:
  - Keep non-numeric and procurement-friendly]
- [Do NOT:
  - Insert pricing or discount detail]

### License and Support Summary

- [Target: 350-500 words]
- [Source: templates/rfi-response.md; reusable/support-sla.md]
- [Key messages:
  - Platform subscription
  - Standard / Premium / Enterprise tier differences]
- [Visual:
  - Tier table]
- [Writer guidance:
  - One compact summary block]
- [Do NOT:
  - Contradict official support descriptors]

- Visual elements: Monitoring; SLA tiers, severity matrix


## Coverage Statement

- [Target: 700-1000 words]
- [Source: templates/rfi-response.md; all relevant product sources]
- [Key messages:
  - Available now
  - Gaps/out-of-scope
  - External dependencies]
- [Visual:
  - Coverage matrix]
- [Writer guidance:
  - Map directly to client requirement categories
  - Keep honest and tight]
- [Do NOT:
  - Leave as generic placeholders in final submission]

**Consistency anchor:** Available/Roadmap/Gap categories used consistently. Every gap has an alternative or explanation.


### Available Now

- [Target: 300-450 words]
- [Source: all relevant sources]
- [Key messages:
  - Requirement-to-capability mapping]
- [Visual:
  - Requirement/capability/notes table]
- [Writer guidance:
  - Group requirements if necessary]
- [Do NOT:
  - Overstate partial coverage]

- Visual elements: requirement/capability/notes mapping


### Gaps and Dependencies

- [Target: 200-300 words]
- [Source: templates/rfi-response.md]
- [Key messages:
  - Non-EVM limitation and other true scope boundaries
  - Dependency on KYC, custody, payment rails, legal counsel, infrastructure]
- [Visual:
  - Gap/dependency table]
- [Writer guidance:
  - Offer alternative approach only where credible]
- [Do NOT:
  - Guess roadmap status or hide exclusions]


- Visual elements: dependency table (infrastructure, credentials, documentation, decisions)

> ✅ **Section complete when:** Available-now mapping complete. Gaps and dependencies documented. Responsibility split clear.

## About SettleMint


- Visual elements: Dashboard showing operational platform; company facts (6-8 approved metrics), certifications

**Consistency anchor:** Company facts table present in every variant. No claims beyond approved source material.


### About SettleMint (300-400 words, 2-3 paragraphs)

- Write about: company founding (2016), mission, regulated-market focus, team composition, global delivery footprint, and institutional readiness.
- Include: 1 table (`Metric | Value`) with 6-8 approved company facts such as founding year, headquarters, operating regions, certifications, production track record, and target buyer segments.
- Include: a short subsection or bullet group covering leadership/team, offices or regional coverage, and certifications/audits where relevant to the bid.
- Tone: credible, factual, low-hype, procurement-safe.
- Reference: `bid-manager/content/01-company-profile/main.md`, `bid-manager/templates/company-profile.md`.
- Do not: invent headcount, revenue, investor details, office locations, or certification scope beyond approved sources.


- Visual elements: Dashboard showing operational platform; company facts (6-8 approved metrics), certifications

> ✅ **Section complete when:** Company facts table present with 6+ approved metrics. Regulatory readiness table included. No unapproved claims.

## Customer References


- Visual elements: joint reference snapshot (client, combined scope, SettleMint role, partner role, outcome)

**Consistency anchor:** Summary table uses identical column structure across all proposals. Only approved reference names used.


### Customer References (700-1100 words total; 3-4 case studies)

- Write about: 3-4 references most relevant to the buyer's geography, asset class, regulatory setting, or operating model.
- Include: 1 summary table covering all approved references (`Client | Geography | Use Case | Deployment Scale | Outcome / Relevance`).
- For expanded examples, use a repeatable structure: context, challenge, DALP solution pattern, deployment scale, measurable outcomes, and transferability to this bid.
- Prefer: 3 expanded references in full variants, 2 in medium variants, compact table-only treatment in compact variants unless the skeleton explicitly requires more.
- Tone: evidence-backed, specific, non-promotional.
- Reference: `bid-manager/content/07-references/main.md`, `bid-manager/templates/case-studies.md`.
- Do not: add unapproved customer names, inferred metrics, or NDA-sensitive detail.


- Visual elements: reference summary (Client, Geography, Use Case, Scale, Outcome/Relevance)

> ✅ **Section complete when:** Summary table includes all approved references. Expanded references follow context/challenge/solution/outcome structure. Selection rationale stated.

## Project Implementation & Delivery


- Visual elements: `implementation-timeline.mmd`; phase table, RACI matrix

**Consistency anchor:** Phase names and sequence identical across all proposal variants. Gate criteria stated for every phase.


### Project Implementation & Delivery (900-1400 words depending on variant)

- Write about: delivery methodology, implementation phases, indicative timeline, governance, RACI, milestones, gates, client dependencies, and delivery risks.
- Include: 1 phase table or Gantt-style timeline with phases, objectives, outputs, dependencies, and acceptance gates.
- Include: 1 compact RACI or role matrix showing SettleMint, client, and partner roles if relevant.
- Cover explicitly: methodology, phase objectives, milestone logic, hypercare/transition, and the decisions needed to stay on schedule.
- Tone: disciplined, realistic, execution-focused.
- Reference: `bid-manager/content/06-implementation/main.md`, `bid-manager/templates/implementation-plan.md`.
- Do not: present sample timelines as contractual commitments or hide client responsibilities.


- Visual elements: `implementation-timeline.mmd`; phase table, RACI matrix

> ✅ **Section complete when:** Phase table with gate criteria present. RACI or role matrix included. All six phases covered.

## Deployment


- Visual elements: `deployment-topology-saas.mmd` or `deployment-topology-onprem.mmd`; Settings, Monitoring

**Consistency anchor:** Deployment model comparison uses identical criteria columns across all variants.


### Deployment (500-900 words depending on variant)

- Write about: recommended deployment model, deployment alternatives considered, cloud/on-prem/hybrid options, infrastructure requirements, environment model, resilience, and data residency implications.
- Include: 1 comparison table covering Managed SaaS, private/dedicated cloud, on-premises, and hybrid where relevant.
- Include: 1 logical topology or environment summary showing how DALP fits the buyer's hosting model.
- Cover explicitly: infrastructure prerequisites (Kubernetes/OpenShift, PostgreSQL, Redis, object storage, ingress/network), DR/backup approach, and hosting responsibility.
- Tone: infrastructure-literate, non-speculative, requirements-driven.
- Reference: `bid-manager/content/04-deployment/main.md`.
- Do not: imply platform capability changes by deployment model or commit to unsupported residency/security claims.


- Visual elements: `deployment-topology-saas.mmd` or `deployment-topology-onprem.mmd`; Monitoring, Settings

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

## Back-Matter Instructions

- [Target: 60-120 words]
- [Source: templates/rfi-response.md]
- [Key messages:
  - Classification, version, date, contact placeholders]
- [Visual:
  - Metadata footer block]
- [Writer guidance:
  - Purely administrative close]
- [Do NOT:
  - Add concluding sales prose]

- Visual elements: document metadata footer
