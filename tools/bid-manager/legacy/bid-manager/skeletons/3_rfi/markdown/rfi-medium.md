---
skeleton-type: rfi
variant: medium
target-pages: "40-60"
target-words: "12000-18000"
version: "BM-RS-02-v2.0"
last-updated: "2026-03-19"
---

# RFI Response Blueprint: Medium

> **Version:** BM-RS-02-v2.0 (ARROW)
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

- [Target: 250-450 words]
- [Source: templates/rfi-response.md]
- [Key messages:
  - Condensed but still evaluator-friendly
  - Focus on platform fit, delivery credibility, and boundaries
  - Prioritize decision-critical sections over exhaustive technical depth]
- [Visual:
  - 5-7 visuals total
  - Prefer summary tables over dense diagrams]
- [Writer guidance:
  - Keep section count tight
  - Merge related topics where reader value improves
  - Retain explicit source references, writer guidance, visual instructions, key messages, and exclusions in every section]
- [Do NOT:
  - Add actual narrative prose in blueprint
  - Manually number headings
  - Inflate length with repeated capability descriptions]


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



## Cover Letter

- [Target: 300-450 words]
- [Source: templates/rfi-response.md; reusable/about-settlemint.md; reusable/about-dalp.md]
- [Key messages:
  - Immediate relevance to client objective
  - Production-grade maturity
  - Confidence without overclaiming]
- [Visual:
  - No visual]
- [Writer guidance:
  - One page maximum
  - Name initiative, client objective, and primary DALP relevance angle]
- [Do NOT:
  - Repeat the executive positioning from the body verbatim]


**Consistency anchor:** One page maximum. Named recipient and initiative. No generic sales language.

> ✅ **Section complete when:** One page maximum. Named recipient addressed. Initiative and DALP relevance stated. Signatory placeholder present.

## About DALP


- Visual elements (use where relevant):
  - Diagram: `platform-architecture-layers.mmd`
  - Table: lifecycle pillars, capabilities matrix
  - Screenshot: Dashboard, Asset Designer

**Consistency anchor:** Lifecycle pillar count (5) and names (Create, Comply, Custody, Settle, Service) consistent across all proposals.


### About DALP (350-500 words, 3-4 paragraphs or equivalent table-led structure)

- Write about: DALP as the Digital Asset Lifecycle Platform, its lifecycle coverage, key capabilities, deployment flexibility, and operational differentiators.
- Include: 1 capability matrix or layered table covering lifecycle pillars, integration surfaces, and differentiators most relevant to the bid.
- Cover explicitly: platform overview, supported operating scope, core capabilities, and why DALP is different from fragmented point-solution stacks.
- Tone: platform-led, precise, evaluator-friendly.
- Reference: `bid-manager/templates/company-profile.md` (for positioning parallels where needed), `bid-manager/content/01-company-profile/main.md` for company/platform narrative alignment, plus existing DALP sources already listed in each skeleton.
- Do not: drift into feature-spam, roadmap claims, or generic blockchain education.


- Visual elements (use where relevant):
  - Diagram: `platform-architecture-layers.mmd`
  - Table: lifecycle pillars, capabilities matrix
  - Screenshot: Dashboard, Asset Designer

> ✅ **Section complete when:** All five lifecycle pillars named and described. Asset class table or diagram present. Differentiator comparison included.

## Company Overview

- [Target: 1200-1700 words]
- [Source: reusable/about-settlemint.md; templates/rfi-response.md]
- [Key messages:
  - Who SettleMint is
  - Mission and market position
  - Production credentials
  - Regulatory readiness
  - Key facts and vertical relevance]
- [Visual:
  - Company facts table
  - Optional 3-stage evolution timeline]
- [Writer guidance:
  - Condense into 4-5 subsections max
  - Emphasize regulated-market focus and production proof points]
- [Do NOT:
  - Expand team biographies or generic market commentary]


- Visual elements (use where relevant):
  - Table: company facts, credentials, certifications

**Consistency anchor:** Company facts table present. No claims beyond approved source material.


### Who, Mission, and Positioning

- [Target: 350-500 words]
- [Source: reusable/about-settlemint.md]
- [Key messages:
  - Production-grade platform company
  - Focus on regulated financial markets and sovereign use cases
  - Mission centered on compliant, secure, scalable tokenization]
- [Visual:
  - None or key-points sidebar]
- [Writer guidance:
  - Merge identity and mission efficiently]
- [Do NOT:
  - Use vague transformation language]

- Visual elements (use where relevant):
  - Table: mission-to-capability alignment


### Production Credentials and Regulatory Readiness

- [Target: 450-650 words]
- [Source: reusable/about-settlemint.md; reusable/reference-projects.md; content/02-configurable-compliance/main.md]
- [Key messages:
  - Multi-year live deployments
  - Regulated and sovereign credibility
  - Compliance-by-design foundation]
- [Visual:
  - Proof-point table
  - Jurisdiction coverage table]
- [Writer guidance:
  - Lead with evidence, not adjectives]
- [Do NOT:
  - Introduce unsupported metrics]

- Visual elements (use where relevant):
  - Table: proof-point table with evidence categories


### Company Facts and Target Verticals

- [Target: 250-400 words]
- [Source: reusable/about-settlemint.md]
- [Key messages:
  - Evaluator-ready fact scan
  - Primary institutional segments]
- [Visual:
  - Facts/verticals table]
- [Writer guidance:
  - Keep skimmable]
- [Do NOT:
  - Overload with secondary vertical detail]


- Visual elements (use where relevant):
  - Table: company facts table (approved metrics only)

> ✅ **Section complete when:** Company facts table present. Mission and market position stated. Vertical relevance addressed.

## Platform Overview: DALP

- [Target: 2400-3400 words]
- [Source: reusable/about-dalp.md; reusable/deployment-options.md; content/01-configurable-tokens/main.md; content/02-configurable-compliance/main.md; content/03-integrations/main.md; content/05-security/main.md]
- [Key messages:
  - DALP solves the pilot-to-production gap
  - Unified lifecycle platform across creation, compliance, custody, settlement, servicing
  - Asset-class breadth, architecture depth, and deployment flexibility matter together]
- [Visual:
  - Lifecycle diagram
  - High-level architecture diagram
  - Asset class summary table
  - Standards/deployment summary table  - Screenshot: Dashboard, Asset Designer showing platform capabilities.
]
- [Writer guidance:
  - Condense to overview, pillars, asset classes, differentiation, architecture, integration/deployment]
- [Do NOT:
  - Rebuild the full technical manual]


- Visual elements (use where relevant):
  - Diagram: `platform-architecture-layers.mmd`
  - Table: lifecycle pillars, capabilities matrix
  - Screenshot: Dashboard, Asset Designer

**Consistency anchor:** Lifecycle pillars and asset class count consistent with canonical DALP sources.


### Platform Overview and Value Proposition

- [Target: 500-700 words]
- [Source: reusable/about-dalp.md]
- [Key messages:
  - What DALP is
  - Why institutions need it
  - Business outcomes enabled]
- [Visual:
  - Outcome table]
- [Writer guidance:
  - Combine complexity framing and platform definition]
- [Do NOT:
  - Spend too much space on tokenization basics]

- Visual elements (use where relevant):
  - Diagram: `solution-architecture.mmd`
  - Table: key metrics, outcome drivers
  - Screenshot: Dashboard overview


### Lifecycle Pillars and Asset Classes

- [Target: 800-1100 words]
- [Source: reusable/about-dalp.md; content/01-configurable-tokens/main.md]
- [Key messages:
  - Five lifecycle pillars
  - Seven asset classes plus configurable token]
- [Visual:
  - Lifecycle pillars diagram
  - Asset class table]
- [Writer guidance:
  - Give each pillar 100-150 words max
  - Summarize asset classes in compact, comparable form]
- [Do NOT:
  - Duplicate the same benefit under every pillar]

- Visual elements (use where relevant):
  - Diagram: `platform-architecture-layers.mmd`
  - Screenshot: Asset Operations, Bonds detail


### Architecture, Differentiation, Standards, and Deployment

- [Target: 900-1200 words]
- [Source: reusable/about-dalp.md; content/03-integrations/main.md; content/05-security/main.md; reusable/deployment-options.md]
- [Key messages:
  - Architecture layers and integration surfaces
  - EVM-first/open-standards logic
  - Why DALP is differentiated
  - Deployment flexibility]
- [Visual:
  - Architecture diagram
  - Standards/support table
  - Deployment option table]
- [Writer guidance:
  - Use concise subsections: Architecture / Integration / Differentiation / Deployment]
- [Do NOT:
  - Name competitors unless the response explicitly requires it]


- Visual elements (use where relevant):
  - Diagram: `deployment-topology-saas.mmd` or `deployment-topology-onprem.mmd`
  - Table: deployment model comparison
  - Screenshot: Monitoring, Settings

> ✅ **Section complete when:** Lifecycle pillars diagram present. Architecture overview included. Deployment flexibility addressed.

## References

- [Target: 1600-2400 words]
- [Source: reusable/reference-projects.md]
- [Key messages:
  - Breadth of reference portfolio
  - Two strongest analogs merit deeper treatment]
- [Visual:
  - Full summary table of 14 references
  - 2 expanded case-study callout boxes]
- [Writer guidance:
  - Always include summary table
  - Expand 2 references only in medium variant
  - Select by relevance to geography, asset class, or operating model]
- [Do NOT:
  - Add unverified outcomes]


- Visual elements (use where relevant):
  - Table: joint reference snapshot (client, combined scope, SettleMint role, partner role, outcome)

**Consistency anchor:** Summary table uses identical column structure. Only approved reference names and outcomes.


### Reference Summary Table

- [Target: 500-700 words]
- [Source: reusable/reference-projects.md]
- [Key messages:
  - Portfolio breadth across sectors and regions]
- [Visual:
  - 14-row table]
- [Writer guidance:
  - Keep columns tight and scannable]
- [Do NOT:
  - Exclude projects because they are less flashy]

- Visual elements (use where relevant):
  - Table: reference summary (client, geography, use case, scale, outcome)


### Expanded Reference A

- [Target: 350-500 words]
- [Source: reusable/reference-projects.md]
- [Key messages:
  - Context
  - Solution pattern
  - Outcome
  - Why it matters for this RFI]
- [Visual:
  - One case-study panel]
- [Writer guidance:
  - Use structured mini-heads: Use Case / Challenge or Context / Solution / Outcome / Relevance]
- [Do NOT:
  - Turn into storytelling prose]

- Visual elements (use where relevant):
  - Table: reference summary (client, geography, use case, scale, outcome)


### Expanded Reference B

- [Target: 350-500 words]
- [Source: reusable/reference-projects.md]
- [Key messages:
  - Complementary proof point to Reference A]
- [Visual:
  - One case-study panel]
- [Writer guidance:
  - Choose a different angle: geography, asset class, or operating model]
- [Do NOT:
  - Repeat the same project type twice unless strategically necessary]


- Visual elements (use where relevant):
  - Table: reference summary (client, geography, use case, scale, outcome)

> ✅ **Section complete when:** Summary table with all approved references present. Expanded cases follow structured format.

## Solution Positioning

- [Target: 1000-1400 words]
- [Source: templates/rfi-response.md; content/03-integrations/main.md; reusable/deployment-options.md]
- [Key messages:
  - Responsibility clarity
  - DALP in the client environment
  - Boundary conditions matter]
- [Visual:
  - Responsibility matrix
  - Client-specific architecture diagram]
- [Writer guidance:
  - Keep to three blocks: responsibility split, architecture fit, exclusions]
- [Do NOT:
  - Leave the responsibility table generic if the RFI is specific]


- Visual elements (use where relevant):
  - Diagram: `solution-architecture.mmd`
  - Table: three-column responsibility framework

**Consistency anchor:** Responsibility framework uses three-column split (SettleMint/Integrates/Client). Boundaries stated before capabilities.


### Responsibility Framework

- [Target: 350-500 words]
- [Source: templates/rfi-response.md]
- [Key messages:
  - SettleMint provides / integrates / client provides]
- [Visual:
  - 3-column responsibility table]
- [Writer guidance:
  - Adapt rows to the actual engagement]
- [Do NOT:
  - Blur accountability for KYC, custody, legal, or infrastructure]

- Visual elements (use where relevant):
  - Table: responsibility matrix (requirement area, SettleMint scope, partner scope, joint, notes)


### Solution Architecture and Boundaries

- [Target: 500-700 words]
- [Source: content/03-integrations/main.md; reusable/deployment-options.md; templates/rfi-response.md]
- [Key messages:
  - DALP placement in stack
  - Key integrations
  - What SettleMint does not do]
- [Visual:
  - Client-context architecture diagram
  - Boundary callout box]
- [Writer guidance:
  - Use a short “What we do not do” sub-block at the end]
- [Do NOT:
  - Describe DALP as custodian or exchange operator]


- Visual elements (use where relevant):
  - Diagram: `solution-architecture.mmd`
  - Table: component map with integration touchpoints
  - Screenshot: Dashboard, Monitoring

> ✅ **Section complete when:** Responsibility framework table present. Architecture diagram included. Exclusions explicitly stated.

## Tokenization Models

- [Target: 1200-1700 words]
- [Source: templates/rfi-response.md; content/01-configurable-tokens/main.md; reusable/about-dalp.md]
- [Key messages:
  - Digital twin and native issuance models
  - Asset-class coverage
  - Configurable token architecture and feature model]
- [Visual:
  - Model comparison table
  - Asset class table
  - Token feature summary table]
- [Writer guidance:
  - Keep to overview + architecture + configuration logic]
- [Do NOT:
  - Reproduce the entire feature catalog]


- Visual elements (use where relevant):
  - Table: tokenization model comparison, asset class diagram
  - Screenshot: Asset Designer

**Consistency anchor:** Digital twin vs native issuance distinction maintained. Asset class count matches canonical source.


### Tokenization Approach Summary

- [Target: 350-500 words]
- [Source: templates/rfi-response.md]
- [Key messages:
  - Digital twin vs native issuance]
- [Visual:
  - Comparison table]
- [Writer guidance:
  - Map model choice to institutional use cases]
- [Do NOT:
  - Present one model as default for every client]

- Visual elements (use where relevant):
  - Table: tokenization model comparison, asset class diagram
  - Screenshot: Asset Designer


### Asset Classes and Token Architecture Overview

- [Target: 550-800 words]
- [Source: reusable/about-dalp.md; content/01-configurable-tokens/main.md]
- [Key messages:
  - Seven asset classes plus configurable token
  - DALPAsset, SMART Protocol, and runtime features]
- [Visual:
  - Asset class summary
  - Architecture/feature table]
- [Writer guidance:
  - Explain enough to show extensibility without drowning the reader]
- [Do NOT:
  - Mix token features with compliance modules]


- Visual elements (use where relevant):
  - Diagram: `deployment-topology-saas.mmd` or `deployment-topology-onprem.mmd`
  - Table: component inventory, integration points
  - Screenshot: Monitoring

> ✅ **Section complete when:** Digital twin vs native comparison present. Asset class coverage documented. Configuration architecture explained.

## Trade and Settlement

- [Target: 900-1300 words]
- [Source: templates/rfi-response.md; content/03-integrations/main.md; reusable/about-dalp.md]
- [Key messages:
  - Durable transaction pipeline
  - Multiple integration surfaces
  - DvP/XvP settlement and operational diagnostics]
- [Visual:
  - Transaction-state diagram or table
  - Settlement model comparison table]
- [Writer guidance:
  - Merge transaction architecture, API surfaces, and settlement into one concise section]
- [Do NOT:
  - Reduce to a list of acronyms]


- Visual elements (use where relevant):
  - Table: settlement model comparison
  - Screenshot: XVP Settlement

**Consistency anchor:** Transaction pipeline state naming matches source exactly. Settlement model comparison table present.


### Processing and Interfaces

- [Target: 450-650 words]
- [Source: content/03-integrations/main.md; templates/rfi-response.md]
- [Key messages:
  - 11-state pipeline
  - REST API, SDK, CLI, events
  - Idempotency and durable execution]
- [Visual:
  - Pipeline state table]
- [Writer guidance:
  - Focus on operational trustworthiness]
- [Do NOT:
  - Over-detail endpoint taxonomy]

### Settlement and Error Handling

- [Target: 300-450 words]
- [Source: templates/rfi-response.md; reusable/about-dalp.md; content/03-integrations/main.md]
- [Key messages:
  - Local DvP/XvP
  - HTLC cross-chain
  - Structured diagnostics]
- [Visual:
  - Settlement comparison table]
- [Writer guidance:
  - Emphasize counterparty-risk reduction and supportability]
- [Do NOT:
  - Oversell cross-chain breadth]


- Visual elements (use where relevant):
  - Table: error taxonomy

> ✅ **Section complete when:** Transaction state diagram present. API surface documented. Settlement models compared.

## Security and Key Management

- [Target: 1300-1800 words]
- [Source: templates/rfi-response.md; content/05-security/main.md; reusable/deployment-options.md]
- [Key messages:
  - Defense-in-depth security model
  - Authentication/authorization/key management options
  - Certifications and residency support]
- [Visual:
  - Security layers diagram
  - Key management backend table
  - Certification/residency table  - Screenshot: Identity & Verification screenshots.
]
- [Writer guidance:
  - Keep to four blocks: auth, access, keys, data/certs]
- [Do NOT:
  - Repeat detailed wallet-integration content better covered elsewhere]


- Visual elements (use where relevant):
  - Table: backend/use-case table, custody path

**Consistency anchor:** Security control descriptions match approved source wording. Certification claims cite exact scope.


### Authentication and Authorization

- [Target: 450-650 words]
- [Source: content/05-security/main.md; templates/rfi-response.md]
- [Key messages:
  - Session/API key split
  - RBAC and tenant isolation
  - Step-up wallet verification]
- [Visual:
  - Auth/access table]
- [Writer guidance:
  - Highlight dual-layer permission model]
- [Do NOT:
  - Merge sign-in and transaction authorization carelessly]

- Visual elements (use where relevant):
  - Diagram: `security-layers.mmd`
  - Table: authentication method table
  - Screenshot: Identity & Verification


### Key Management, Data Protection, and Certifications

- [Target: 550-800 words]
- [Source: content/05-security/main.md; reusable/deployment-options.md; templates/rfi-response.md]
- [Key messages:
  - Key Guardian and secrets backends
  - Data in transit and at rest
  - ISO 27001 and SOC 2 Type II
  - Data residency depends on deployment]
- [Visual:
  - Backend/use-case table
  - Certification summary table]
- [Writer guidance:
  - Tie security posture to deployment choices]
- [Do NOT:
  - Make unsupported claims about certification coverage or HSM mandates]


- Visual elements (use where relevant):
  - Table: data protection controls (transit, rest, storage)

> ✅ **Section complete when:** Security domain diagram or responsibility matrix present. Authentication, key management, and data protection all addressed. No unsupported certification claims.

## Identity and Compliance

- [Target: 1400-2000 words]
- [Source: templates/rfi-response.md; content/02-configurable-compliance/main.md; reusable/about-dalp.md]
- [Key messages:
  - OnchainID and identity registry underpin compliance
  - Ex-ante compliance architecture matters
  - Module catalog enables policy expression across jurisdictions]
- [Visual:
  - Compliance flow diagram
  - Module catalog table
  - Regulatory mapping table]
- [Writer guidance:
  - Condense into architecture + module catalog + regulatory fit]
- [Do NOT:
  - Turn this into legal advice]


- Visual elements (use where relevant):
  - Diagram: `compliance-transfer-flow.mmd`
  - Table: regulatory framework mapping
  - Screenshot: Compliance Policy Templates, Identity & Verification

**Consistency anchor:** OnchainID terminology consistent. Compliance module count matches source. No legal advice language.


### Identity and Compliance Architecture

- [Target: 550-750 words]
- [Source: content/02-configurable-compliance/main.md; templates/rfi-response.md]
- [Key messages:
  - OnchainID, identity registry, trusted issuers, ex-ante enforcement]
- [Visual:
  - Enforcement flow diagram]
- [Writer guidance:
  - Explain roles of identities, claims, issuers, and modules clearly]
- [Do NOT:
  - Assume the reader already knows ERC-3643]

- Visual elements (use where relevant):
  - Diagram: `compliance-transfer-flow.mmd`
  - Table: enforcement flow, policy model layers
  - Screenshot: Compliance Policy Templates


### Module Catalog and Regulatory Mapping

- [Target: 550-800 words]
- [Source: content/02-configurable-compliance/main.md; reusable/about-settlemint.md; templates/rfi-response.md]
- [Key messages:
  - Key module types by category
  - Example mappings to major regulatory frameworks]
- [Visual:
  - Module table
  - Framework mapping table]
- [Writer guidance:
  - Use examples, not exhaustive commentary]
- [Do NOT:
  - Promise regulatory completeness in every jurisdiction]

> ✅ **Section complete when:** OnchainID architecture explained. Compliance flow diagram present. Module catalog table included.

## Implementation

- [Target: 1100-1600 words]
- [Source: reusable/implementation-plan.md; templates/rfi-response.md; reusable/deployment-options.md]
- [Key messages:
  - Structured phased delivery
  - Client dependencies should be explicit
  - Timeline is indicative and scope-dependent]
- [Visual:
  - Timeline table or Gantt
  - Phase summary table  - Mermaid diagram: Use `implementation-timeline.mmd`.
]
- [Writer guidance:
  - Use 5 phases in concise form
  - Collapse detailed deliverables into one compact table]
- [Do NOT:
  - Overspecify dates or staffing unless known]


- Visual elements (use where relevant):
  - Diagram: `implementation-timeline.mmd`
  - Table: phase table, pricing summary, RACI

**Consistency anchor:** Phase names and sequence identical across all proposal variants. Gate criteria stated for every phase.


### Timeline and Phases

- [Target: 650-950 words]
- [Source: reusable/implementation-plan.md; templates/rfi-response.md]
- [Key messages:
  - Discovery, deployment/configuration, integration/testing, go-live/stabilization, ongoing ops]
- [Visual:
  - Timeline table]
- [Writer guidance:
  - Include objectives, duration, and key outputs per phase]
- [Do NOT:
  - Present sample dates as commitments]

- Visual elements (use where relevant):
  - Diagram: `implementation-timeline.mmd`
  - Table: Gantt-style phased timeline


### Dependencies, Governance, and Risks

- [Target: 300-450 words]
- [Source: reusable/implementation-plan.md; templates/rfi-response.md]
- [Key messages:
  - Client inputs, governance cadence, top risks]
- [Visual:
  - Dependency/risk table]
- [Writer guidance:
  - Stay concrete and compact]
- [Do NOT:
  - Hide client obligations]


- Visual elements (use where relevant):
  - Table: dependency table (infrastructure, credentials, documentation, decisions)

> ✅ **Section complete when:** Phase table with gate criteria present. Timeline table included. Dependencies and governance addressed.

## Commercial Model

- [Target: 700-1000 words]
- [Source: templates/rfi-response.md; reusable/support-sla.md]
- [Key messages:
  - Annual platform subscription logic
  - Support-tier options
  - Professional services handled separately]
- [Visual:
  - Support tier comparison table]
- [Writer guidance:
  - Keep commercial explanation procurement-friendly and non-numeric]
- [Do NOT:
  - Insert actual pricing or discount language]


- Visual elements (use where relevant):
  - Table: commercial scope, support tier comparison

**Consistency anchor:** Pricing kept abstract unless approved annex exists. Support tier names match source exactly.


### Licensing and Support

- [Target: 450-650 words]
- [Source: templates/rfi-response.md; reusable/support-sla.md]
- [Key messages:
  - License structure
  - Support tier differences]
- [Visual:
  - Support tier table]
- [Writer guidance:
  - Clearly separate platform subscription from SLA tier]
- [Do NOT:
  - Contradict published SLA descriptors]

- Visual elements (use where relevant):
  - Table: licensing scope, tier comparison


### Professional Services Scope

- [Target: 150-250 words]
- [Source: reusable/implementation-plan.md; templates/rfi-response.md]
- [Key messages:
  - Implementation scope is discovery-dependent and separately scoped]
- [Visual:
  - Small scope box]
- [Writer guidance:
  - Keep concise]
- [Do NOT:
  - Suggest bespoke product development]


- Visual elements (use where relevant):
  - Table: service-scope summary

> ✅ **Section complete when:** Licensing structure explained. Support tier comparison table present. Professional services scope defined.

## Coverage and Gaps

- [Target: 900-1300 words]
- [Source: templates/rfi-response.md; all relevant product sources]
- [Key messages:
  - Clear split between current coverage, roadmap, exclusions, and dependencies]
- [Visual:
  - Coverage matrix]
- [Writer guidance:
  - Tailor directly to client requirements
  - Keep this section blunt and practical]
- [Do NOT:
  - Leave generic placeholders in final version]

**Consistency anchor:** Available/Roadmap/Gap categories used consistently. Every gap has an alternative or explanation.


### Coverage Summary

- [Target: 400-550 words]
- [Source: all relevant sources]
- [Key messages:
  - Available-now mapping to client requirement areas]
- [Visual:
  - Requirement/capability/notes table]
- [Writer guidance:
  - Use grouped requirement categories if the RFI is long]
- [Do NOT:
  - Mark partial coverage as full coverage]

### Roadmap, Gaps, and Dependencies

- [Target: 300-450 words]
- [Source: verified roadmap only; templates/rfi-response.md]
- [Key messages:
  - What is planned
  - What is out of scope
  - What depends on external providers or client-owned systems]
- [Visual:
  - Roadmap/gap/dependency table]
- [Writer guidance:
  - Include alternatives where credible]
- [Do NOT:
  - Guess roadmap status]


- Visual elements (use where relevant):
  - Table: dependency table (infrastructure, credentials, documentation, decisions)

> ✅ **Section complete when:** Available-now mapping complete. Gaps and dependencies documented. Responsibility split clear.

## About SettleMint


- Visual elements (use where relevant):
  - Table: company facts (6-8 approved metrics), certifications
  - Screenshot: Dashboard showing operational platform

**Consistency anchor:** Company facts table present in every variant. No claims beyond approved source material.


### About SettleMint (300-400 words, 2-3 paragraphs)

- Write about: company founding (2016), mission, regulated-market focus, team composition, global delivery footprint, and institutional readiness.
- Include: 1 table (`Metric | Value`) with 6-8 approved company facts such as founding year, headquarters, operating regions, certifications, production track record, and target buyer segments.
- Include: a short subsection or bullet group covering leadership/team, offices or regional coverage, and certifications/audits where relevant to the bid.
- Tone: credible, factual, low-hype, procurement-safe.
- Reference: `bid-manager/content/01-company-profile/main.md`, `bid-manager/templates/company-profile.md`.
- Do not: invent headcount, revenue, investor details, office locations, or certification scope beyond approved sources.


- Visual elements (use where relevant):
  - Table: company facts (6-8 approved metrics), certifications
  - Screenshot: Dashboard showing operational platform

> ✅ **Section complete when:** Company facts table present with 6+ approved metrics. Regulatory readiness table included. No unapproved claims.

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

## Back-Matter Instructions

- [Target: 80-150 words]
- [Source: templates/rfi-response.md]
- [Key messages:
  - Classification, version, date, contact placeholders]
- [Visual:
  - Metadata footer block]
- [Writer guidance:
  - Keep purely administrative]
- [Do NOT:
  - Add narrative closing copy]

- Visual elements (use where relevant):
  - Table: document metadata footer
