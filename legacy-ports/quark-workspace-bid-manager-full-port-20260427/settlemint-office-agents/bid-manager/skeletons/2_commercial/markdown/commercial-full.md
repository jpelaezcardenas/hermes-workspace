---
skeleton-type: commercial
variant: full
target-pages: "60-80"
target-words: "18000-24000"
version: "BM-CS-01-v2.0"
last-updated: "2026-03-19"
---

# Commercial Proposal Blueprint: Full

> **Version:** BM-CS-01-v2.0 (ATLAS)
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

- Purpose: structural blueprint for proposal drafting only.
- Output contains zero client-facing prose.
- Use heading hierarchy only; no manual numbering in headings.
- Every major section must translate source material into client-specific commercial positioning.
- Replace placeholders with deal-specific facts, numbers, assumptions, and approvals.
- Keep terminology consistent: DALP, digital asset lifecycle, regulated institutions, production deployment.
- Convert descriptive source content into concise commercial narrative, tables, and decision-support exhibits.

- Visual elements (use where relevant):
  - Diagram: `compliance-transfer-flow.mmd`
  - Table: regulatory framework mapping
  - Screenshot: Compliance Policy Templates, Identity & Verification


## Global Writer Instructions
- [Target: 400-700 words]
- [Source: templates/commercial-proposal.md; content/07-commercial-proposal/main.md]
- [Key messages:
  - Commercial proposal must justify buy-vs-build and single-platform economics.
  - Pricing structure must feel predictable, institutional, and defensible.
  - Focus the document on pricing, licensing, implementation costs, support costs, timeline, payment terms, value analysis, and ROI.
  - Exclude company-overview and product-overview sections such as "About SettleMint" and "About DALP"; those belong in technical proposals only.
  - All client-specific figures, assumptions, and legal terms must be clearly marked until validated.
  - The document should support procurement, business sponsors, architecture, operations, and legal review.
]
- [Visual:
  - One commercial architecture diagram showing license + deployment + implementation + support + TCO relationship.
  - One document map/table showing sections, purpose, and primary buyer audience.
]
- [Writer guidance:
  - Use this section only to define how the proposal is assembled.
  - State assumptions, placeholders, and evidence requirements.
  - Set a consistent instruction pattern across all sections.
  - Use tables, bullets, and callout boxes instead of narrative filler.
]
- [Do NOT:
  - Draft any actual proposal copy.
  - Leave unmarked commercial assumptions.
  - Introduce capabilities not present in approved sources.
  - Treat this as a legal contract template.
]



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
- [Target: 1200-1600 words]
- [Source: templates/commercial-proposal.md; content/07-commercial-proposal/main.md; reusable/about-settlemint.md; reusable/about-dalp.md]
- [Key messages:
  - Summarize the client situation, urgency, and commercial decision.
  - Frame DALP as the lower-risk, lower-fragmentation path versus internal build or multi-vendor assembly.
  - Preview recommended license tier, deployment model, implementation path, support tier, and TCO outcome.
  - Clarify that detailed figures are scoped and finalized through commercial validation.
]
- [Visual:
  - 1-page decision snapshot with client objective, recommended model, timeline, and commercial headline.
  - Executive comparison table: current approach vs DALP.
  - Optional procurement summary box with contract components and decision gates.
  - Screenshot: Dashboard overview showing DALP platform capabilities relevant to the commercial decision.
]
- [Writer guidance:
  - Write for executive sponsors and procurement first.
  - Lead with business context, then commercial answer, then quantified implication.
  - Keep client-specific urgency explicit: regulatory deadline, go-live target, competitive pressure, pilot-to-production gap, or cost pressure.
  - Make the recommendation unmistakable.
]
- [Do NOT:
  - Open with generic digital transformation language.
  - Overload with technical detail better handled later.
  - Promise fixed pricing unless approved.
  - Sound like a marketing brochure.
]





- Visual elements (use where relevant):
  - Diagram: `solution-architecture.mmd`
  - Table: key metrics summary, decision snapshot
  - Screenshot: Dashboard overview

**Consistency anchor:** Always opens with the client's stated challenge before introducing the solution. No bullet lists, prose only.

> ✅ **Section complete when:** Client name and programme name appear in opening paragraph. At least two named differentiators present. Reference snapshot included. No bullet lists, prose only throughout.

## Investment Rationale
- [Target: 2200-3000 words]
- [Source: templates/commercial-proposal.md; content/07-commercial-proposal/main.md; reusable/about-dalp.md]
- [Key messages:
  - The status quo has hidden cost, coordination, and control burdens.
  - DALP changes the economics by collapsing multiple lifecycle capabilities into one platform.
  - ROI should combine cost avoidance, operational efficiency, revenue enablement, and risk reduction.
  - The buying decision is infrastructure economics, not feature shopping.
]
- [Visual:
  - Cost of current approach comparison table.
  - DALP economics table by cost driver.
  - ROI framework table with baseline, DALP-enabled impact, method, and owner.
  - Optional waterfall chart from current-state cost to projected savings.
  - Screenshot: Dashboard showing operational efficiency metrics and platform breadth.
]
- [Writer guidance:
  - Build the business case in three sub-sections.
  - Use client-specific assumptions and sources wherever available.
  - Explicitly state assumptions that still require workshop validation.
  - Tie every claimed value driver to a DALP mechanism.
]
- [Do NOT:
  - Present generic ROI percentages without context.
  - Conflate avoided future build cost with booked savings unless qualified.
  - Ignore the organizational cost of multi-vendor governance.
]


- Visual elements (use where relevant):
  - Diagram: `solution-architecture.mmd`
  - Table: ROI framework, cost comparison
  - Screenshot: Dashboard showing platform breadth

**Consistency anchor:** ROI claims tied to specific DALP mechanisms. All assumptions explicitly stated.


### Cost of Current Approach
- [Target: 700-1000 words]
- [Source: templates/commercial-proposal.md; content/07-commercial-proposal/main.md]
- [Key messages:
  - Identify whether the client is on a build, multi-vendor, or pilot-that-cannot-scale path.
  - Quantify procurement, integration, maintenance, and operational complexity.
  - Expose hidden costs: timeline delay, duplicated controls, SLA gaps, audit friction, vendor coordination.
]
- [Visual:
  - Current-state operating model map.
  - Hidden-cost checklist or heatmap.
]
- [Writer guidance:
  - Anchor to discovery outputs.
  - Use the client's own language for pain points where possible.
]
- [Do NOT:
  - Attack named competitors without evidence.
  - Assume all three problem patterns apply equally.
]

- Visual elements (use where relevant):
  - Table: current-state cost analysis, hidden-cost heatmap


### Why DALP Changes Economics
- [Target: 700-900 words]
- [Source: templates/commercial-proposal.md; reusable/about-dalp.md]
- [Key messages:
  - One governed platform lowers fragmentation and cost-to-scale.
  - Included capabilities reduce repeated procurement and integration effort.
  - Reuse across asset classes and jurisdictions improves long-term economics.
]
- [Visual:
  - Included capability map against cost drivers.
  - Before/after operating model comparison.
]
- [Writer guidance:
  - Focus on platform economics, not generic product benefits.
  - Show how bundled lifecycle coverage changes spend profile over time.
]
- [Do NOT:
  - Present DALP as a narrow token issuance tool.
]

- Visual elements (use where relevant):
  - Diagram: `platform-architecture-layers.mmd`
  - Table: before/after operating model comparison
  - Screenshot: Dashboard showing included capabilities


### ROI Framework
- [Target: 700-1100 words]
- [Source: templates/commercial-proposal.md; content/07-commercial-proposal/main.md]
- [Key messages:
  - ROI has four buckets: operational efficiency, revenue enablement, cost avoidance, risk reduction.
  - Payback logic should be explicit and calculation-ready.
  - The model should be adjustable by procurement/finance without changing narrative logic.
]
- [Visual:
  - ROI driver table.
  - Sensitivity table: conservative / expected / upside case.
  - Payback-period summary box.
]
- [Writer guidance:
  - Provide formulas, inputs, and ownership of each assumption.
  - Use placeholders for unvalidated numbers.
]
- [Do NOT:
  - Present a fake precision model.
  - Hide assumptions in footnotes.
]


- Visual elements (use where relevant):
  - Table: ROI driver table, sensitivity analysis, payback summary

> ✅ **Section complete when:** Current-approach cost analysis present. DALP economics comparison included. ROI framework with explicit assumptions.

## Licensing Model
- [Target: 1800-2400 words]
- [Source: templates/commercial-proposal.md; content/07-commercial-proposal/main.md]
- [Key messages:
  - DALP licensing is platform-based, not transaction-tax based.
  - The license includes broad lifecycle capabilities, asset classes, APIs, observability, and updates.
  - Engagement-specific scope varies by environment, deployment, network, custody, support, and implementation.
  - Tiering reflects operational complexity and institutional requirement level.
]
- [Visual:
  - Licensing philosophy callout.
  - Included-versus-variable table.
  - Tier comparison table: Foundation / Enterprise / Sovereign.
  - Optional decision tree for tier selection.
  - Screenshot: Asset Designer showing included platform capabilities.
]
- [Writer guidance:
  - Keep this section crisp, structured, and procurement-friendly.
  - Make the economic logic behind annual subscription explicit.
  - Separate fixed platform inclusions from scoped items.
]
- [Do NOT:
  - Introduce per-transaction logic.
  - Blur license scope with implementation scope.
  - Create new tiers or package names.
]


- Visual elements (use where relevant):
  - Table: pricing tiers, included-vs-variable scope
  - Screenshot: Asset Designer showing included capabilities

**Consistency anchor:** Platform-based licensing language consistent. No per-transaction framing.


### Philosophy
- [Target: 250-400 words]
- [Source: templates/commercial-proposal.md; content/07-commercial-proposal/main.md]
- [Key messages:
  - Predictability, scale alignment, and no penalty on growth or compliance usage.
]
- [Visual:
  - Simple comparison box: platform license vs transaction-fee model.
  - Screenshot: Dashboard showing predictable platform scope.
]
- [Writer guidance:
  - Explain why this model fits regulated institutions.
]
- [Do NOT:
  - Sound defensive about pricing.
]

- Visual elements (use where relevant):
  - Table: platform license vs transaction-fee comparison


### What's Included
- [Target: 500-700 words]
- [Source: templates/commercial-proposal.md; reusable/about-dalp.md]
- [Key messages:
  - Lifecycle pillars, asset classes, compliance modules, APIs, add-ons, observability, and updates are included.
]
- [Visual:
  - Inclusion grid.
  - Screenshot: Asset Designer, Compliance Policy Templates showing included lifecycle capabilities.
]
- [Writer guidance:
  - Organize by capability family, not by feature sprawl.
]
- [Do NOT:
  - Leave ambiguity around included platform scope.
]

- Visual elements (use where relevant):
  - Table: inclusion grid by capability family
  - Screenshot: Asset Designer, Compliance Policy Templates


### What Varies
- [Target: 250-400 words]
- [Source: templates/commercial-proposal.md]
- [Key messages:
  - Deployment model, environment count, network setup, custody integration, support tier, and implementation services are engagement-specific.
]
- [Visual:
  - Scoped dimensions table.
]
- [Writer guidance:
  - Mark every variable dimension clearly.
]
- [Do NOT:
  - Present variables as afterthoughts.
]

- Visual elements (use where relevant):
  - Table: scoped dimensions (deployment, environments, custody, support, implementation)


### Platform Tiers
- [Target: 700-900 words]
- [Source: templates/commercial-proposal.md; content/07-commercial-proposal/main.md]
- [Key messages:
  - Foundation fits focused first production use cases.
  - Enterprise fits scaling institutions across more environments and integrations.
  - Sovereign fits strategic or national-scale control requirements.
]
- [Visual:
  - Detailed tier comparison table.
  - Recommended-tier callout.
]
- [Writer guidance:
  - For each tier, specify fit, included profile, and buyer trigger.
]
- [Do NOT:
  - Use usage-volume language as the primary tier differentiator.
]


- Visual elements (use where relevant):
  - Table: tier comparison (Foundation, Enterprise, Sovereign)

> ✅ **Section complete when:** Philosophy stated. Included scope table present. Tier comparison table with recommendation.

## Deployment Options and Pricing
- [Target: 1800-2400 words]
- [Source: reusable/deployment-options.md; templates/commercial-proposal.md]
- [Key messages:
  - All deployment models deliver the same platform capability set.
  - The real choice is operational ownership, data residency, security posture, and time-to-deploy.
  - Pricing must be shown as a structured commercial model with clear cost categories and drivers.
  - Recommend a deployment model and explain why.
]
- [Visual:
  - Deployment model comparison table.
  - Recommended deployment architecture diagram.
  - Cost structure table by model.
  - Cost-driver matrix.
  - Screenshot: Monitoring screenshots showing deployment health.
  - Screenshot: Settings showing environment configuration.
]
- [Writer guidance:
  - Build this as a decision section, not a catalogue.
  - Start with recommended model, then compare alternatives.
  - Tie pricing structure to operational consequences.
]
- [Do NOT:
  - Suggest platform capability differs by deployment model.
  - Leave infrastructure responsibility unclear.
]


- Visual elements (use where relevant):
  - Diagram: `deployment-topology-saas.mmd` or `deployment-topology-onprem.mmd`
  - Table: deployment model comparison, cost structure
  - Screenshot: Monitoring, Settings

**Consistency anchor:** Deployment model comparison uses identical criteria columns across all variants.


### Model Overview
- [Target: 300-450 words]
- [Source: reusable/deployment-options.md]
- [Key messages:
  - Managed SaaS, private cloud, on-premises, and hybrid are all viable under different constraints.
]
- [Visual:
  - 4-model summary table.
]
- [Writer guidance:
  - State selection criteria up front.
]
- [Do NOT:
  - Overexplain technical prerequisites here.
]

- Visual elements (use where relevant):
  - Table: four-model deployment summary


### Comparison
- [Target: 400-600 words]
- [Source: reusable/deployment-options.md]
- [Key messages:
  - Compare management, residency, connectivity, scaling, deployment speed, and overhead.
]
- [Visual:
  - Side-by-side comparison table.
]
- [Writer guidance:
  - Use consistent criteria across all models.
]
- [Do NOT:
  - Mix objective facts with unsupported preference.
]

- Visual elements (use where relevant):
  - Table: side-by-side deployment comparison


### Cost Structure
- [Target: 450-650 words]
- [Source: templates/commercial-proposal.md; reusable/deployment-options.md]
- [Key messages:
  - Show license, environment, infrastructure, implementation, and support cost categories.
  - Clarify pass-through vs SettleMint-managed vs client-borne costs.
]
- [Visual:
  - Cost stack table.
  - Optional stacked-bar exhibit by model.
]
- [Writer guidance:
  - Use pricing placeholders with labels and assumptions.
]
- [Do NOT:
  - Merge recurring and one-time costs without labeling.
]

- Visual elements (use where relevant):
  - Table: cost stack by category (license, infra, support, implementation)


### Cost Drivers
- [Target: 300-450 words]
- [Source: templates/commercial-proposal.md]
- [Key messages:
  - Multi-region, multi-environment, HSM/on-prem, integration complexity, custom support, and phased rollout drive cost upward.
  - Simpler cloud-managed profiles, limited integrations, and multi-year commitments reduce cost.
]
- [Visual:
  - Up/down cost-driver matrix.
]
- [Writer guidance:
  - Make negotiation levers explicit without turning this into discounting guidance.
]
- [Do NOT:
  - Suggest cost can be determined without scope.
]


- Visual elements (use where relevant):
  - Table: up/down cost-driver matrix

> ✅ **Section complete when:** Recommended model stated with rationale. Comparison table present. Infrastructure requirements listed.

## Support and SLA Framework
- [Target: 1500-2100 words]
- [Source: reusable/support-sla.md; templates/commercial-proposal.md]
- [Key messages:
  - Support is tiered to operational criticality.
  - Severity definitions, response times, uptime commitments, maintenance, and escalation are core commercial differentiators.
  - Recommended support tier should match deployment criticality and client internal capability.
]
- [Visual:
  - Support tier table.
  - Severity matrix.
  - Response/resolution SLA table.
  - Escalation ladder graphic.
  - Screenshot: Monitoring screenshots showing operational dashboard.
]
- [Writer guidance:
  - Make this easy for operations, procurement, and risk teams to scan.
  - Keep language precise and operational.
]
- [Do NOT:
  - Introduce informal service promises outside tabled SLA logic.
  - Hide exclusions.
]


- Visual elements (use where relevant):
  - Table: support tier comparison, severity/response matrix
  - Screenshot: Monitoring

**Consistency anchor:** SLA figures match approved source exactly. Tier names and coverage hours never modified without approval.


### Tiers
- [Target: 500-700 words]
- [Source: reusable/support-sla.md]
- [Key messages:
  - Standard, Premium, and Enterprise reflect coverage, channels, named resources, and review cadence.
]
- [Visual:
  - Tier detail table.
]
- [Writer guidance:
  - Add a recommended-tier rationale callout.
]
- [Do NOT:
  - Present all tiers as equally suitable.
]

- Visual elements (use where relevant):
  - Table: tier comparison (Foundation, Enterprise, Sovereign)


### Severity Levels
- [Target: 250-350 words]
- [Source: reusable/support-sla.md]
- [Key messages:
  - P1-P4 definitions must tie to business impact and workarounds.
]
- [Visual:
  - Severity definitions table.
]
- [Writer guidance:
  - Preserve operational precision.
]
- [Do NOT:
  - Rewrite severity logic loosely.
]

- Visual elements (use where relevant):
  - Table: severity definitions (P1-P4 with business impact)


### Uptime SLA
- [Target: 200-300 words]
- [Source: reusable/support-sla.md]
- [Key messages:
  - Monthly uptime targets and maximum downtime should be explicit.
  - Service credit mechanics belong here if included.
]
- [Visual:
  - Uptime target table.
]
- [Writer guidance:
  - Keep contractual mechanics concise.
]
- [Do NOT:
  - Bury measurement basis.
]

- Visual elements (use where relevant):
  - Table: uptime target table with max downtime


### Escalation
- [Target: 200-300 words]
- [Source: reusable/support-sla.md]
- [Key messages:
  - Automatic and client-initiated escalation paths are defined and auditable.
]
- [Visual:
  - Escalation path flow.
]
- [Writer guidance:
  - Use numbered levels in body text if needed, but not in headings.
]
- [Do NOT:
  - Mix escalation with renewal/account governance.
]

- Visual elements (use where relevant):
  - Table: escalation path flow (levels, triggers, owners)


### Maintenance
- [Target: 250-400 words]
- [Source: reusable/support-sla.md]
- [Key messages:
  - Scheduled windows, update cadence, security patches, and rollout model depend on tier.
]
- [Visual:
  - Release cadence table.
]
- [Writer guidance:
  - Distinguish planned maintenance from emergency security action.
]
- [Do NOT:
  - Leave notice periods undefined.
]


- Visual elements (use where relevant):
  - Table: release cadence, maintenance windows

> ✅ **Section complete when:** Support tier comparison table present. Severity/response matrix included. Escalation path defined.

## Implementation Investment
- [Target: 2200-3000 words]
- [Source: reusable/implementation-plan.md; templates/commercial-proposal.md]
- [Key messages:
  - Delivery follows a structured phase-gated model.
  - Timeline, deliverables, and price should feel controllable and procurement-ready.
  - Implementation cost is justified by reduced risk and faster production readiness.
  - Accelerators and risks should be explicit.
]
- [Visual:
  - Full implementation timeline.
  - 6-phase summary table.
  - Pricing summary table.
  - Accelerator/risk matrix.
  - Screenshot: Monitoring, Settings screenshots showing implementation deliverables.
]
- [Writer guidance:
  - Keep each phase commercially interpretable: objective, activities, deliverables, and investment logic.
  - Reflect client responsibilities and assumptions where relevant.
]
- [Do NOT:
  - Present implementation as an open-ended services engagement.
  - Hide client dependencies.
]


- Visual elements (use where relevant):
  - Diagram: `implementation-timeline.mmd`
  - Table: phase table, pricing summary, RACI

**Consistency anchor:** Phase names and sequence identical across all proposal variants. Gate criteria stated for every phase.


### Methodology
- [Target: 250-400 words]
- [Source: reusable/implementation-plan.md]
- [Key messages:
  - Phase gates reduce delivery risk and keep scope governed.
]
- [Visual:
  - Methodology strip or gated timeline.
]
- [Writer guidance:
  - Establish overall timeline and acceptance logic.
]
- [Do NOT:
  - Dive into phase detail here.
]

- Visual elements (use where relevant):
  - Diagram: `implementation-timeline.mmd`
  - Table: gated methodology strip


### Discovery and Requirements
- [Target: 250-350 words]
- [Source: reusable/implementation-plan.md]
- [Key messages:
  - Align objectives, scope, systems landscape, regulatory requirements, and delivery plan.
]
- [Visual:
  - Phase card.
]
- [Writer guidance:
  - Include deliverables and approval gate.
]
- [Do NOT:
  - Treat as optional.
]

- Visual elements (use where relevant):
  - Table: phase card (objective, activities, deliverables, gate)


### Configuration and Setup
- [Target: 250-350 words]
- [Source: reusable/implementation-plan.md]
- [Key messages:
  - Environments, asset config, compliance modules, IAM, and key management are established here.
]
- [Visual:
  - Phase card.
]
- [Writer guidance:
  - Highlight what becomes production-ready versus draft.
]
- [Do NOT:
  - Blur with integration phase.
]

- Visual elements (use where relevant):
  - Table: phase card (configuration scope, readiness status)
  - Screenshot: Asset Designer, Settings


### Integration
- [Target: 250-350 words]
- [Source: reusable/implementation-plan.md]
- [Key messages:
  - Connect custody, identity, core systems, payment rails, reporting, and data feeds.
]
- [Visual:
  - Integration landscape diagram.
  - Screenshot: relevant integration interface if applicable.
]
- [Writer guidance:
  - Emphasize end-to-end workflow outcomes.
]
- [Do NOT:
  - Reduce this to API setup only.
]

- Visual elements (use where relevant):
  - Diagram: `integration-architecture.mmd`
  - Table: integration matrix (system, protocol, direction)
  - Screenshot: relevant integration surfaces


### Testing and User Acceptance
- [Target: 250-350 words]
- [Source: reusable/implementation-plan.md]
- [Key messages:
  - Functional, security, performance, compliance, DR, and UAT all matter.
]
- [Visual:
  - Test coverage matrix.
]
- [Writer guidance:
  - Tie outputs to go-live readiness.
]
- [Do NOT:
  - Overindex on QA jargon.
]

- Visual elements (use where relevant):
  - Table: test coverage matrix (functional, security, performance, compliance, UAT)


### Go-Live
- [Target: 180-260 words]
- [Source: reusable/implementation-plan.md]
- [Key messages:
  - Controlled cutover, smoke test, migration validation, and live support.
]
- [Visual:
  - Go-live checklist or runbook box.
]
- [Writer guidance:
  - Keep focus on risk-managed transition.
]
- [Do NOT:
  - Make go-live sound instantaneous or trivial.
]

- Visual elements (use where relevant):
  - Table: go-live checklist, runbook summary


### Hypercare and Optimization
- [Target: 220-320 words]
- [Source: reusable/implementation-plan.md]
- [Key messages:
  - Intensive monitoring, optimization, issue resolution, and support transition.
]
- [Visual:
  - Hypercare dashboard summary box.
]
- [Writer guidance:
  - Show stabilization and handover logic.
]
- [Do NOT:
  - Treat hypercare as indefinite support.
]

- Visual elements (use where relevant):
  - Table: hypercare dashboard summary, handover checklist
  - Screenshot: Monitoring


### Pricing Summary
- [Target: 180-260 words]
- [Source: reusable/implementation-plan.md; templates/commercial-proposal.md]
- [Key messages:
  - One table should summarize phase, duration, and investment.
]
- [Visual:
  - Pricing summary table.
]
- [Writer guidance:
  - Include total line and note pricing basis.
]
- [Do NOT:
  - Scatter implementation figures across the section without summary.
]

- Visual elements (use where relevant):
  - Table: pricing summary (phase, duration, investment)


### Accelerators and Risks
- [Target: 250-350 words]
- [Source: reusable/implementation-plan.md]
- [Key messages:
  - Prebuilt templates, compliance templates, SDK/CLI, and reference architectures accelerate delivery.
  - On-prem, HSM, heavy integration, and slow governance extend timelines.
]
- [Visual:
  - Two-column accelerators/risks matrix.
]
- [Writer guidance:
  - Present as delivery realism, not caveat dumping.
]
- [Do NOT:
  - Hide risk factors until legal review.
]

- Visual elements (use where relevant):
  - Table: two-column accelerators/risks matrix


### Training
- [Target: 120-220 words]
- [Source: templates/commercial-proposal.md; reusable/implementation-plan.md]
- [Key messages:
  - Training scope should map to platform administration, compliance operations, monitoring, and integration use.
]
- [Visual:
  - Training audience table.
]
- [Writer guidance:
  - Keep optional extra sessions clearly marked.
]
- [Do NOT:
  - Describe training as generic enablement fluff.
]


- Visual elements (use where relevant):
  - Table: training audience matrix (audience, topic, format, timing)

> ✅ **Section complete when:** Phase table with gate criteria present. Timeline table included. Dependencies and governance addressed.

## Commercial Terms
- [Target: 1800-2500 words]
- [Source: templates/commercial-proposal.md]
- [Key messages:
  - Contracting model must be clear, institutional, and balanced.
  - Payment, duration, renewal, termination, IP, liability, confidentiality, and escrow require explicit structure.
  - This section should support legal and procurement review without replacing full legal agreements.
]
- [Visual:
  - Contract structure table.
  - Payment schedule table.
  - Key terms summary box.
]
- [Writer guidance:
  - Use concise plain-language summaries.
  - Flag client-specific negotiables.
  - Keep defined-term style consistent.
]
- [Do NOT:
  - Draft binding legal language unless instructed.
  - Leave commercial remedies or limits ambiguous.
]


- Visual elements (use where relevant):
  - Table: contract structure, payment schedule, key terms

**Consistency anchor:** All negotiable terms clearly marked. No binding legal language unless instructed.


### Contract Structure
- [Target: 180-260 words]
- [Source: templates/commercial-proposal.md]
- [Key messages:
  - Separate license, implementation, support, and any scoped addenda.
]
- [Visual:
  - Agreement stack table.
]
- [Writer guidance:
  - Clarify co-termination logic where relevant.
]
- [Do NOT:
  - Blend all services into one vague agreement.
]

- Visual elements (use where relevant):
  - Table: agreement stack (license, implementation, support, addenda)


### Payment Schedule
- [Target: 200-300 words]
- [Source: templates/commercial-proposal.md]
- [Key messages:
  - License and support recurring; implementation milestone-based.
]
- [Visual:
  - Payment milestone table.
]
- [Writer guidance:
  - Label invoicing cadence and trigger clearly.
]
- [Do NOT:
  - Omit acceptance dependencies.
]

- Visual elements (use where relevant):
  - Table: payment milestone table


### Duration
- [Target: 120-180 words]
- [Source: templates/commercial-proposal.md]
- [Key messages:
  - Initial term, activation/go-live trigger, and multi-year options.
]
- [Visual:
  - Term options table.
]
- [Writer guidance:
  - Keep commercial duration mechanics simple.
]
- [Do NOT:
  - Confuse implementation timeline with license term.
]

- Visual elements (use where relevant):
  - Table: term options


### Renewal
- [Target: 120-180 words]
- [Source: templates/commercial-proposal.md]
- [Key messages:
  - Renewal notice, pricing basis, and early-renewal incentives if approved.
]
- [Visual:
  - Renewal timeline box.
]
- [Writer guidance:
  - Mark all negotiables.
]
- [Do NOT:
  - Promise fixed future pricing without approval.
]

- Visual elements (use where relevant):
  - Table: renewal timeline


### Termination
- [Target: 180-260 words]
- [Source: templates/commercial-proposal.md]
- [Key messages:
  - Material breach, convenience if offered, cure period, and data export support.
]
- [Visual:
  - Termination conditions table.
]
- [Writer guidance:
  - Separate cause-based from convenience-based mechanics.
]
- [Do NOT:
  - Leave post-termination data access undefined.
]

- Visual elements (use where relevant):
  - Table: termination conditions


### Intellectual Property
- [Target: 180-260 words]
- [Source: templates/commercial-proposal.md]
- [Key messages:
  - DALP platform IP remains SettleMint's.
  - Client data remains client-owned.
  - Client-built integrations and scoped custom work need clear ownership statements.
]
- [Visual:
  - IP ownership matrix.
]
- [Writer guidance:
  - Distinguish platform, configuration, integration, and data.
]
- [Do NOT:
  - Suggest transfer of core platform ownership.
]

- Visual elements (use where relevant):
  - Table: IP ownership matrix (platform, config, integration, data)


### Liability
- [Target: 140-220 words]
- [Source: templates/commercial-proposal.md]
- [Key messages:
  - Liability cap and exclusion categories should be summarized cleanly.
]
- [Visual:
  - Liability summary box.
]
- [Writer guidance:
  - Keep it commercial, not litigative.
]
- [Do NOT:
  - Add legal carve-outs not approved in source.
]

- Visual elements (use where relevant):
  - Table: liability summary


### Confidentiality
- [Target: 100-160 words]
- [Source: templates/commercial-proposal.md]
- [Key messages:
  - Mutual confidentiality, duration, and standard exceptions.
]
- [Visual:
  - Confidentiality summary box.
]
- [Writer guidance:
  - Keep concise.
]
- [Do NOT:
  - Overlawyer the section.
]

- Visual elements (use where relevant):
  - Table: confidentiality summary


### Escrow
- [Target: 120-180 words]
- [Source: templates/commercial-proposal.md]
- [Key messages:
  - Escrow can be offered where continuity assurance is required; terms are separately negotiated.
]
- [Visual:
  - Escrow option box.
]
- [Writer guidance:
  - Position as optional assurance mechanism.
]
- [Do NOT:
  - State escrow is automatic.
]


- Visual elements (use where relevant):
  - Table: escrow option summary

> ✅ **Section complete when:** Contract structure, payment, duration, renewal, termination, IP, liability, and confidentiality all addressed.

## Total Cost of Ownership
- [Target: 2200-3000 words]
- [Source: templates/commercial-proposal.md; content/07-commercial-proposal/main.md]
- [Key messages:
  - TCO must compare DALP against realistic alternatives over multi-year horizons.
  - The comparison must include hidden integration and maintenance costs, not just software fees.
  - DALP value compounds as additional programs launch on the same platform.
]
- [Visual:
  - TCO framework graphic.
  - 3-year model table.
  - 5-year model table.
  - Comparative table: DALP vs build vs multi-vendor.
  - Optional cumulative-cost line chart.
]
- [Writer guidance:
  - Use procurement-ready structure: assumptions, categories, model, comparison, interpretation.
  - Make every category traceable to an assumption source.
]
- [Do NOT:
  - Compare DALP only to a single software subscription.
  - Ignore infrastructure and support.
  - Mix one-time and recurring costs without clear labels.
]


- Visual elements (use where relevant):
  - Table: TCO comparison (DALP vs build vs multi-vendor), 3-year and 5-year models

**Consistency anchor:** TCO categories identical across proposals. Every figure traces to an assumption source.


### TCO Framework
- [Target: 300-450 words]
- [Source: templates/commercial-proposal.md]
- [Key messages:
  - Proper comparison is platform economics versus assembled operating model cost.
]
- [Visual:
  - Framework diagram or category map.
]
- [Writer guidance:
  - Define comparison boundary and included categories.
]
- [Do NOT:
  - Jump straight to tables without framing assumptions.
]

- Visual elements (use where relevant):
  - Table: TCO category map, comparison boundary


### 3-Year Model
- [Target: 500-700 words]
- [Source: templates/commercial-proposal.md]
- [Key messages:
  - Show year-by-year DALP cost profile with implementation front-load and recurring run cost.
]
- [Visual:
  - 3-year TCO table.
]
- [Writer guidance:
  - Include notes for license, implementation, support, infra, training, integration.
]
- [Do NOT:
  - Skip note fields for assumptions.
]

- Visual elements (use where relevant):
  - Table: 3-year TCO table (year-by-year cost profile)


### 5-Year Model
- [Target: 450-650 words]
- [Source: templates/commercial-proposal.md]
- [Key messages:
  - Longer horizon shows reuse and lower marginal expansion cost.
]
- [Visual:
  - 5-year TCO table.
]
- [Writer guidance:
  - Reflect likely expansion or tier evolution.
]
- [Do NOT:
  - Treat years 4-5 as copy-paste of year 3 without explanation.
]

- Visual elements (use where relevant):
  - Table: 5-year TCO table with expansion assumptions


### Comparative Analysis
- [Target: 700-1000 words]
- [Source: templates/commercial-proposal.md; content/07-commercial-proposal/main.md]
- [Key messages:
  - Build in-house carries heavy permanent engineering burden.
  - Multi-vendor assembly creates operational and contractual fragmentation.
  - DALP offers lower coordination cost and faster path to institutional scale.
]
- [Visual:
  - DALP vs build table.
  - DALP vs multi-vendor table.
  - Optional radar or scorecard exhibit.
]
- [Writer guidance:
  - Compare on time, teams, maintenance, compliance, audit, incident handling, and scalability.
]
- [Do NOT:
  - Turn comparison into competitor mudslinging.
]


- Visual elements (use where relevant):
  - Table: DALP vs build vs multi-vendor comparison

> ✅ **Section complete when:** TCO framework defined. Multi-year model table present. Comparative analysis against alternatives included.

## Reference Clients
- [Target: 1500-2200 words]
- [Source: reusable/reference-projects.md]
- [Key messages:
  - SettleMint has relevant production and strategic track record across institutions and geographies.
  - The proposal should include all references in a summary table, then expand 2-3 most relevant cases.
  - Reference selection should mirror the prospect's use case, geography, and buying concerns.
]
- [Visual:
  - Full reference table with all 14 references.
  - Relevance-tagged case study summary cards.
  - Optional geography/use-case matrix.
]
- [Writer guidance:
  - Include all named references in summary form.
  - Expand only those that strengthen this deal.
  - Use only approved claims from source file.
]
- [Do NOT:
  - Infer results not stated.
  - Expand irrelevant case studies just to fill space.
]


- Visual elements (use where relevant):
  - Table: reference summary (client, geography, use case, scale, outcome)

**Consistency anchor:** Summary table uses identical column structure. Only approved reference names and outcomes.


### Track Record
- [Target: 500-700 words]
- [Source: reusable/reference-projects.md]
- [Key messages:
  - Breadth across banks, sovereign entities, market infrastructure, and regulated use cases.
]
- [Visual:
  - All-reference summary table.
]
- [Writer guidance:
  - Add filter tags by geography, asset class, and program type.
]
- [Do NOT:
  - Omit required references.
]

- Visual elements (use where relevant):
  - Table: all-reference summary with filter tags


### Case Studies
- [Target: 900-1300 words]
- [Source: reusable/reference-projects.md]
- [Key messages:
  - Use 2-3 expanded examples to reduce perceived execution risk for this buyer.
]
- [Visual:
  - One-page case study cards with challenge / solution / outcome structure.
]
- [Writer guidance:
  - Select by strongest fit to the deal.
  - Keep challenge, solution, and outcome tightly structured.
]
- [Do NOT:
  - Add unnamed projects or confidential anecdotes.
]


- Visual elements (use where relevant):
  - Table: case study cards (challenge, solution, outcome)

> ✅ **Section complete when:** Summary table with all approved references present. Expanded cases follow structured format.

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

## Next Steps
- [Target: 500-800 words]
- [Source: templates/commercial-proposal.md]
- [Key messages:
  - Provide a practical path from proposal to validated commercial agreement.
  - Recommend specific near-term actions: review, scoping workshop, refined commercial offer, optional proof of value, contract execution.
  - Align to the client's procurement rhythm and governance gates.
]
- [Visual:
  - Next-steps timeline.
  - Responsibility table with target dates.
]
- [Writer guidance:
  - Make this section action-oriented and time-bound.
  - Assign owner, purpose, output, and indicative timing for each step.
]
- [Do NOT:
  - End vaguely.
  - Introduce new commercial terms here.
]


- Visual elements (use where relevant):
  - Table: action items with owner, output, and timing

**Consistency anchor:** Action items are time-bound with named owners. No generic closing language.

> ✅ **Section complete when:** Action items listed with owner, output, and timing. Path to contract execution clear.
