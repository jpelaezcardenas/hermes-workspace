---
skeleton-type: commercial
variant: compact
target-pages: "15-25"
target-words: "4500-7500"
version: "BM-CS-03-v2.0"
last-updated: "2026-03-19"
---

# Commercial Proposal Blueprint: Compact

> **Version:** BM-CS-03-v2.0 (CROWN)
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

- Purpose: essential commercial blueprint only.
- Zero client-facing prose.
- No manual numbering in headings.
- Prefer tables, bullets, and decision boxes over narrative.
- Include only what is required to support a commercial decision.

- Visual elements: `compliance-transfer-flow.mmd`; Compliance Policy Templates, Identity & Verification


## Global Writer Instructions
- [Target: 150-250 words]
- [Source: templates/commercial-proposal.md; content/07-commercial-proposal/main.md]
- [Key messages:
  - Compact version is for fast executive/procurement review.
  - It must preserve recommendation clarity, pricing structure, implementation path, support costs, timeline, payment terms, value analysis, and TCO comparison.
  - Exclude company-overview and product-overview sections such as "About SettleMint" and "About DALP"; those belong in technical proposals only.
]
- [Visual:
  - One-page document structure map.
]
- [Writer guidance:
  - Compress aggressively.
  - Every page must earn its place.
]
- [Do NOT:
  - Add background material unless it changes the buying decision.
]



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
- [Target: 500-700 words]
- [Source: templates/commercial-proposal.md; content/07-commercial-proposal/main.md]
- [Key messages:
  - State client need, recommended commercial answer, and why the recommendation wins.
  - Preview license/pricing, deployment, support, implementation timing, and TCO outcome.
]
- [Visual:
  - Executive decision box.
  - Commercial headline table.
  - Screenshot: Dashboard overview showing DALP platform capabilities relevant to the commercial decision.
]
- [Writer guidance:
  - Use a highly compressed recommendation-led format.
]
- [Do NOT:
  - Retell discovery background at length.
]




- Visual elements: `solution-architecture.mmd`; Dashboard overview

**Consistency anchor:** Always opens with the client's stated challenge before introducing the solution. No bullet lists, prose only.

> ✅ **Section complete when:** Client name and programme name appear in opening paragraph. At least two named differentiators present. Reference snapshot included. No bullet lists, prose only throughout.

## Investment Rationale
- [Target: 500-800 words]
- [Source: templates/commercial-proposal.md; content/07-commercial-proposal/main.md]
- [Key messages:
  - Reduce the business case to one sharp comparison.
  - Show why DALP is economically preferable to build or multi-vendor assembly.
]
- [Visual:
  - Single comparison table: current approach / DALP / implication.
  - Screenshot: Dashboard showing operational efficiency metrics and platform breadth.
]
- [Writer guidance:
  - Let the table do most of the work.
]
- [Do NOT:
  - Build a long ROI narrative.
]



- Visual elements: `solution-architecture.mmd`; Dashboard showing platform breadth

**Consistency anchor:** ROI claims tied to specific DALP mechanisms. All assumptions explicitly stated.

> ✅ **Section complete when:** Current-approach cost analysis present. DALP economics comparison included. ROI framework with explicit assumptions.

## Licensing & Pricing
- [Target: 800-1100 words]
- [Source: templates/commercial-proposal.md; reusable/deployment-options.md]
- [Key messages:
  - Show platform licensing model, tier options, recommended deployment, and structured pricing view.
  - Make the recommended commercial package explicit.
]
- [Visual:
  - Tier comparison table.
  - Recommended deployment box.
  - Pricing structure table.
]
- [Writer guidance:
  - Merge licensing and deployment into one decision section.
  - Use one recommendation row that states proposed tier, deployment model, support level, and environments.
]
- [Do NOT:
  - Split detail across too many tables.
]



- Visual elements: licensing scope, tier comparison

**Consistency anchor:** Platform-based licensing language consistent. No per-transaction framing.

> ✅ **Section complete when:** Philosophy stated. Included scope table present. Tier comparison table with recommendation.

## Support Summary
- [Target: 350-500 words]
- [Source: reusable/support-sla.md]
- [Key messages:
  - Provide only the tier summary and recommended support level.
]
- [Visual:
  - Support tier table.
]
- [Writer guidance:
  - Keep operational and buyer relevance front and center.
]
- [Do NOT:
  - Reproduce full SLA mechanics.
]



- Visual elements: Monitoring; SLA tiers, severity matrix

**Consistency anchor:** SLA figures match approved source exactly. Tier names and coverage hours never modified without approval.

> ✅ **Section complete when:** Support tier comparison table present. Severity/response matrix included. Escalation path defined.

## Implementation Timeline
- [Target: 350-550 words]
- [Source: reusable/implementation-plan.md]
- [Key messages:
  - Show implementation as a table only.
  - Cover the 6 phases at a summary level with timing and outputs.
]
- [Visual:
  - Implementation timeline table.
]
- [Writer guidance:
  - Use rows only; no extended subtext.
]
- [Do NOT:
  - Add phase narratives below the table.
]



- Visual elements: `implementation-timeline.mmd`; phase table, RACI matrix

**Consistency anchor:** Phase names and sequence identical across all proposal variants. Gate criteria stated for every phase.

> ✅ **Section complete when:** Phase table with gate criteria present. Timeline table included. Dependencies and governance addressed.

## Key Commercial Terms
- [Target: 450-650 words]
- [Source: templates/commercial-proposal.md]
- [Key messages:
  - Provide bullet-summary coverage of the essential terms only.
  - Include contract structure, payment cadence, term, renewal, termination, IP, liability, confidentiality, escrow.
]
- [Visual:
  - Key terms table or bullet panel.
]
- [Writer guidance:
  - Use bullets and labels, not paragraphs.
]
- [Do NOT:
  - Attempt full legal summarization.
]



- Visual elements: contract structure, payment schedule, key terms

**Consistency anchor:** All negotiable terms clearly marked. No binding legal language unless instructed.

> ✅ **Section complete when:** Contract structure, payment, duration, renewal, termination, IP, liability, and confidentiality all addressed.

## TCO Comparison
- [Target: 500-800 words]
- [Source: templates/commercial-proposal.md; content/07-commercial-proposal/main.md]
- [Key messages:
  - Use one TCO comparison table only.
  - Show DALP versus build and multi-vendor over an appropriate horizon.
  - Provide a brief interpretation that makes the economic choice obvious.
]
- [Visual:
  - Single TCO comparison table.
]
- [Writer guidance:
  - Use concise table notes for assumptions.
]
- [Do NOT:
  - Add separate 3-year and 5-year exhibits.
]



- Visual elements: side-by-side deployment comparison

**Consistency anchor:** TCO categories identical across proposals. Every figure traces to an assumption source.

> ✅ **Section complete when:** TCO comparison table present. Assumptions documented. Economic conclusion clearly stated.

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

## Next Steps
- [Target: 200-300 words]
- [Source: templates/commercial-proposal.md]
- [Key messages:
  - List the minimum steps needed to convert this blueprint into a finalized commercial proposal and signed agreement.
]
- [Visual:
  - 3-5 step action table.
]
- [Writer guidance:
  - Make it immediate and time-bound.
]
- [Do NOT:
  - End on generic contact language.
]


- Visual elements: action items with owner, output, and timing

**Consistency anchor:** Action items are time-bound with named owners. No generic closing language.

> ✅ **Section complete when:** Action items listed with owner, output, and timing. Path to contract execution clear.
