---
skeleton-type: generic
variant: medium
target-pages: "25-40"
target-words: "7500-12000"
version: "BM-GS-02-v1.0"
last-updated: "2026-03-19"
---

# Generic Proposal Blueprint: Medium

> **Version:** BM-GS-02-v1.0 (WAVE)
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
- [ ] All `[VARIABLE: ...]` placeholders identified and sourced from RFP/brief/client input

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

### Generic Skeleton Design Notes
- This skeleton is designed for requests that do not fit cleanly into technical, commercial, RFI, joint-response, or questionnaire categories
- Sections are adaptable, adjust emphasis based on the specific client request and evaluation criteria
- Maintains the same rigor and compliance standards as typed skeletons while allowing flexibility
- When in doubt about section emphasis, default to: solution overview > capabilities > implementation > commercial > references

- Visual elements (use where relevant):
  - Diagram: `compliance-transfer-flow.mmd`
  - Table: regulatory framework mapping
  - Screenshot: Compliance Policy Templates, Identity & Verification


## Global Guidance

### Objective
- Present a comprehensive, credible response tailored to the specific client request
- Show deep institutional readiness and platform capability
- Prove controllable implementation and operations
- Balance technical depth with commercial value messaging

### Core Source References

- `templates/technical-proposal-part1.md`
- `templates/technical-proposal-part2.md`
- `templates/commercial-proposal.md`
- `reusable/about-settlemint.md`
- `reusable/about-dalp.md`
- `reusable/reference-projects.md`
- `reusable/implementation-plan.md`
- `reusable/deployment-options.md`
- `reusable/support-sla.md`
- `content/` sections as needed

---

- Visual elements (use where relevant):
  - Table: reference summary (client, geography, use case, scale, outcome)



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



## Section 1: Executive Summary

[Target: 400-600 words | ~2-3 pages]

[Source: `templates/technical-proposal-part1.md`, client brief/RFP]

[Key messages:]
- Why SettleMint and DALP are the right choice for this engagement
- What makes this approach compelling
- Key differentiators relevant to this specific client
- High-level scope, timeline, and value proposition
- Summary of commercial alignment

[Visual: Optional 1-page summary diagram showing scope and key stakeholders
  - Screenshot: Dashboard overview showing DALP operational scope.
]

[Writer guidance:]
- Write this LAST, after all other sections are drafted
- Lead with the client's problem, not with "SettleMint is pleased to..."
- Front-load the value proposition and key differentiators
- Include a brief commercial summary if relevant to the request

[Confidence tag: 🟢 Native]

---

- Visual elements (use where relevant):
  - Diagram: `solution-architecture.mmd`
  - Table: key metrics summary, decision snapshot
  - Screenshot: Dashboard overview


## Section 2: About SettleMint

[Target: 400-550 words | ~2 pages]

[Source: `reusable/about-settlemint.md`, `content/01-company-profile/main.md`]

[Key messages:]
- Company founding, mission, and track record
- Institutional readiness and market position
- Team composition and global footprint
- Relevant certifications and credentials
- Financial stability indicators (if publicly available and approved)

[Visual: Include 1 summary table (Metric | Value) with 6-8 approved company facts]

[Writer guidance:]
- Lead with what matters to THIS client, geography, sector relevance, scale
- Keep it factual and procurement-safe
- Do not invent headcount, revenue, or unapproved details

[Confidence tag: 🟢 Native]

---

- Visual elements (use where relevant):
  - Table: company facts (6-8 approved metrics), certifications
  - Screenshot: Dashboard showing operational platform


## Section 3: About DALP: Digital Asset Lifecycle Platform

[Target: 500-700 words | ~3 pages]

[Source: `reusable/about-dalp.md`, DALP capability documentation]

[Key messages:]
- DALP covers the full digital asset lifecycle (create → custody → transfer → settlement → retire)
- Key platform capabilities relevant to the client's use case
- Deployment flexibility (Managed SaaS, private cloud, on-prem, hybrid)
- Differentiation from point-solution stacks
- Integration capabilities and ecosystem

[Visual: Include 1 capability matrix or layered diagram covering lifecycle pillars and relevant differentiators
  - Screenshot: Dashboard, Asset Designer showing platform capabilities.
]

[Writer guidance:]
- Focus on capabilities that map to the client's specific needs
- Provide moderate depth, enough to establish credibility without overwhelming
- Use confidence tags for each major capability claim

[Confidence tag: 🟢 Native | 🟡 Partial]

---

- Visual elements (use where relevant):
  - Diagram: `platform-architecture-layers.mmd`
  - Table: lifecycle pillars, capabilities matrix
  - Screenshot: Dashboard, Asset Designer


## Section 4: Solution Overview

[Target: 700-1000 words | ~4-5 pages]

[Source: Client brief/RFP requirements, `templates/technical-proposal-part1.md`, `templates/commercial-proposal.md`]

[Key messages:]
- How DALP addresses the client's specific requirements
- Recommended approach and architecture
- Key design decisions and rationale
- Integration points with existing systems
- Data flow and processing model
- Scalability and performance considerations

[Visual: Include 1 solution architecture diagram or logical topology; optional data flow diagram]

[Writer guidance:]
- This section MUST be tailored to the specific client request, there is no generic solution
- Map every capability to a clear client requirement or objective
- Show how the solution scales and adapts to their use case

[Confidence tag: 🟢 Native | 🟡 Partial]

---

- Visual elements (use where relevant):
  - Diagram: `solution-architecture.mmd`
  - Table: solution-to-requirement mapping
  - Screenshot: Dashboard, Asset Designer


## Section 5: Key Capabilities Deep-Dive

[Target: 1000-1500 words | ~5-6 pages]

[Source: DALP capability documentation, client brief/RFP]

[Key messages:]
- Core DALP capabilities most relevant to this engagement
- Detailed capability descriptions with client-specific use cases
- How each capability maps to client needs
- Native strengths vs. configuration-driven vs. integration-dependent
- Edge cases and limitations (where relevant)

[Visual: Include 1 capability-to-requirement mapping table or matrix; optional capability architecture diagram
  - Screenshot: Asset Designer, Compliance Policy Templates, XVP Settlement, Identity & Verification, Monitoring.
]

[Writer guidance:]
- Provide good depth, medium variant allows for more detail than compact
- Use confidence tags rigorously: 🟢 Native (out-of-box), 🟡 Partial (configuration needed), 🔴 Gap (not supported)
- Do not oversell, if a capability is partial or missing, say so

[Confidence tag: 🟢 Native | 🟡 Partial | 🔴 Gap]

---

- Visual elements (use where relevant):
  - Diagram: `platform-architecture-layers.mmd`
  - Table: capability-to-requirement mapping, comparative analysis
  - Screenshot: Dashboard, Asset Designer, Compliance Policy Templates


## Section 6: Security & Compliance

[Target: 500-800 words | ~3-4 pages]

[Source: DALP security documentation, compliance materials, client RFP/security requirements]

[Key messages:]
- Security architecture and approach
- Relevant certifications (SOC 2, ISO 27001, etc.)
- Data protection and privacy measures
- Regulatory compliance alignment (MiCA, etc. if relevant)
- Audit and reporting capabilities

[Visual: Include 1 security architecture diagram or compliance matrix
  - Screenshot: Identity & Verification screenshots.
]

[Writer guidance:]
- This section is critical for regulated clients, ensure adequate depth
- Map security measures to specific client requirements
- Be precise about certification scope, do not overstate

[Confidence tag: 🟢 Native | 🟡 Partial | ⚪ N/A]

---

- Visual elements (use where relevant):
  - Diagram: `security-layers.mmd`
  - Table: security control layers, compliance matrix
  - Screenshot: Identity & Verification


## Section 7: Implementation Approach

[Target: 600-900 words | ~3-4 pages]

[Source: `reusable/implementation-plan.md`, `content/06-implementation/main.md`]

[Key messages:]
- Recommended implementation methodology
- Detailed phases and milestones
- Timeline overview (indicative unless client requests committed timeline)
- Governance, RACI, and escalation path
- Client dependencies and decision gates
- Hypercare and transition to support

[Visual: Include 1 phase table with objectives, outputs, and dependencies; optional Gantt-style timeline
  - Mermaid diagram: Use `implementation-timeline.mmd`.
]

[Writer guidance:]
- Show realistic timeframe based on similar engagements
- Highlight client dependencies prominently
- Include RACI if the scope warrants it

[Confidence tag: 🟢 Native]

---

- Visual elements (use where relevant):
  - Diagram: `implementation-timeline.mmd`
  - Table: phase table, RACI matrix, Gantt timeline


## Section 8: Deployment Options

[Target: 400-600 words | ~2-3 pages]

[Source: `reusable/deployment-options.md`, `content/04-deployment/main.md`]

[Key messages:]
- Available deployment models (Managed SaaS, private cloud, on-prem, hybrid)
- Recommended deployment model for this client
- Infrastructure requirements
- Data residency and sovereignty considerations

[Visual: Include 1 deployment model comparison table
  - Screenshot: Monitoring, Settings showing deployment model.
]

[Writer guidance:]
- Recommend the most appropriate model for the client's requirements
- Be transparent about prerequisites and client responsibilities

[Confidence tag: 🟢 Native]

---

- Visual elements (use where relevant):
  - Diagram: `deployment-topology-saas.mmd` or `deployment-topology-onprem.mmd`
  - Table: deployment model comparison, cost structure
  - Screenshot: Monitoring, Settings


## Section 9: Commercial Framework

[Target: 400-600 words | ~2-3 pages]

[Source: `templates/commercial-proposal.md`, client brief/RFP commercial section]

[Key messages:]
- High-level commercial structure and pricing model
- Commercial model alignment with client needs
- Value drivers and TCO considerations
- Payment terms and commercial milestones
- Scalability pricing (if applicable)

[Visual: Include 1 pricing summary table or value framework]

[Writer guidance:]
- Only include commercial detail if the client request explicitly asks for it
- Focus on value messaging over specific pricing where possible
- If detailed commercial content is required, recommend using a separate commercial skeleton

[Confidence tag: 🟢 Native | ⚪ N/A]

---

- Visual elements (use where relevant):
  - Table: pricing summary, TCO analysis, value framework


## Section 10: Support & Service Levels

[Target: 300-500 words | ~2 pages]

[Source: `reusable/support-sla.md`, `content/07-support-sla/main.md`]

[Key messages:]
- Support tiers and coverage
- SLA commitments relevant to this engagement
- Escalation path and incident management
- Maintenance windows and update policy

[Visual: Include 1 support tier comparison or SLA summary table
  - Screenshot: Monitoring showing support dashboard.
]

[Writer guidance:]
- Tailor to the client's support expectations
- Be clear about what is included vs. additional cost

[Confidence tag: 🟢 Native]

---

- Visual elements (use where relevant):
  - Table: SLA tiers, severity matrix
  - Screenshot: Monitoring


## Section 11: Customer References

[Target: 500-800 words | ~2-3 pages]

[Source: `reusable/reference-projects.md`, `content/07-references/main.md`]

[Key messages:]
- 3-4 reference projects relevant to this client's geography, sector, or use case
- Project context, challenge, solution, and outcomes
- Transferability of lessons learned

[Visual: Include 1 summary table (Client | Geography | Use Case | Scale | Outcome); optional expand 1-2 key references]

[Writer guidance:]
- Select references that directly transfer to THIS client's situation
- Provide moderate detail, enough to establish credibility

[Confidence tag: 🟢 Native]

---

- Visual elements (use where relevant):
  - Table: reference summary (Client, Geography, Use Case, Scale, Outcome/Relevance)


## Section 12: Next Steps

[Target: 200-300 words | ~1 page]

[Source: Client brief/RFP, standard next steps]

[Key messages:]
- Recommended follow-up actions
- Proposed timeline for decision
- Proposed demo or proof-of-concept (if applicable)
- Contact information

[Visual: None required]

[Writer guidance:]
- Keep it brief and action-oriented
- Do not make commitments beyond scope

[Confidence tag: 🟢 Native]

---

- Visual elements (use where relevant):
  - Table: action items with owner, output, and timing


## Section 13: Appendix: As Required

[Target: Variable | As needed]

[Source: Client-specific additional materials]

[Key messages:]
- Any supplementary materials requested by the client
- Detailed technical specifications
- Additional case studies or evidence
- Compliance documentation
- Glossary of terms (if needed for non-technical audiences)

[Visual: As required by client request]

[Writer guidance:]
- Only include appendices that are explicitly requested or add critical value
- Do not pad the document with unnecessary appendices

[Confidence tag: As applicable]

---

## Final Output Checklist

Before marking this proposal complete:

- [ ] All sections present in correct order
- [ ] Word count within target range (7500-12000 words)
- [ ] Every `[VARIABLE: ...]` placeholder resolved
- [ ] Every `[REUSABLE BLOCK: ...]` expanded
- [ ] Confidence tags applied to all capability claims
- [ ] No unsupported claims or roadmap language
- [ ] Visual elements present (minimum 1 per 4 pages)
- [ ] Cover page complete with client name and date
- [ ] TOC generated (not hand-typed)
- [ ] Copy-editing sweep completed
