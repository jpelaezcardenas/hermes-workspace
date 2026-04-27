---
skeleton-type: commercial
variant: medium
target-pages: "30-45"
target-words: "9000-14000"
version: "BM-CS-02-v2.0"
last-updated: "2026-03-19"
---

# Commercial Proposal Blueprint: Medium

> **Version:** BM-CS-02-v2.0 (SPARK)
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

- Purpose: condensed commercial blueprint for proposal drafting only.
- No client-facing prose.
- No manual numbering in headings.
- Favor high-signal tables, decision summaries, and buyer-oriented structure.
- Merge supporting detail where it does not change the buying decision.

- Visual elements (use where relevant):
  - Diagram: `compliance-transfer-flow.mmd`
  - Table: regulatory framework mapping
  - Screenshot: Compliance Policy Templates, Identity & Verification


## Global Writer Instructions
- [Target: 250-450 words]
- [Source: templates/commercial-proposal.md; content/07-commercial-proposal/main.md]
- [Key messages:
  - Medium version should preserve the full commercial logic in a shorter decision-ready form.
  - Prioritize recommendation clarity, pricing structure, implementation path, support costs, timeline, payment terms, value analysis, and TCO proof.
  - Exclude company-overview and product-overview sections such as "About SettleMint" and "About DALP"; those belong in technical proposals only.
  - Support procurement review without full-detail appendix behavior.
]
- [Visual:
  - Document map table with section purpose and audience.
]
- [Writer guidance:
  - Compress narrative into tables, bullets, and callouts.
  - Carry forward only the evidence needed to support the commercial recommendation.
]
- [Do NOT:
  - Recreate the full variant at smaller font density.
  - Add filler exposition.
]



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
- [Target: 700-1000 words]
- [Source: templates/commercial-proposal.md; content/07-commercial-proposal/main.md; reusable/about-settlemint.md; reusable/about-dalp.md]
- [Key messages:
  - State client need, recommended commercial model, and economic rationale.
  - Preview recommended license tier, deployment option, support tier, implementation path, and TCO result.
]
- [Visual:
  - Executive snapshot table.
  - Recommendation box.
  - Screenshot: Dashboard overview showing DALP platform capabilities relevant to the commercial decision.
]
- [Writer guidance:
  - Keep this section tightly decision-oriented.
  - One screen for context, one for recommendation, one for implications.
]
- [Do NOT:
  - Spend space re-explaining DALP in depth.
]





- Visual elements (use where relevant):
  - Diagram: `solution-architecture.mmd`
  - Table: key metrics summary, decision snapshot
  - Screenshot: Dashboard overview

**Consistency anchor:** Always opens with the client's stated challenge before introducing the solution. No bullet lists, prose only.

> ✅ **Section complete when:** Client name and programme name appear in opening paragraph. At least two named differentiators present. Reference snapshot included. No bullet lists, prose only throughout.

## Investment Rationale
- [Target: 1000-1500 words]
- [Source: templates/commercial-proposal.md; content/07-commercial-proposal/main.md; reusable/about-dalp.md]
- [Key messages:
  - Show why the current approach is economically weak.
  - Provide one sharp comparison table and concise ROI highlights.
  - Establish DALP as the most controllable path to production and scale.
]
- [Visual:
  - Current approach vs DALP comparison table.
  - ROI highlights table.
  - Optional savings/payback summary box.
  - Screenshot: Dashboard showing operational efficiency metrics and platform breadth.
]
- [Writer guidance:
  - Merge current-state critique and DALP economics into one integrated section.
  - End with a concise commercial conclusion.
]
- [Do NOT:
  - Split into too many sub-sections.
  - Overbuild the model with unnecessary narrative.
]



- Visual elements (use where relevant):
  - Diagram: `solution-architecture.mmd`
  - Table: ROI framework, cost comparison
  - Screenshot: Dashboard showing platform breadth

**Consistency anchor:** ROI claims tied to specific DALP mechanisms. All assumptions explicitly stated.

> ✅ **Section complete when:** Current-approach cost analysis present. DALP economics comparison included. ROI framework with explicit assumptions.

## Licensing Model
- [Target: 900-1300 words]
- [Source: templates/commercial-proposal.md; content/07-commercial-proposal/main.md]
- [Key messages:
  - Explain platform-based licensing succinctly.
  - Show included scope and tier differences through tables.
  - Identify recommended tier and why.
]
- [Visual:
  - Licensing philosophy callout.
  - Included scope table.
  - Tier comparison table.
  - Screenshot: Asset Designer showing included platform capabilities.
]
- [Writer guidance:
  - Lead with the model, then the inclusions, then the recommendation.
]
- [Do NOT:
  - Duplicate deployment pricing detail here.
]



- Visual elements (use where relevant):
  - Table: pricing tiers, included-vs-variable scope
  - Screenshot: Asset Designer showing included capabilities

**Consistency anchor:** Platform-based licensing language consistent. No per-transaction framing.

> ✅ **Section complete when:** Philosophy stated. Included scope table present. Tier comparison table with recommendation.

## Deployment & Pricing
- [Target: 900-1300 words]
- [Source: reusable/deployment-options.md; templates/commercial-proposal.md]
- [Key messages:
  - Present the recommended deployment model first.
  - Compare alternatives only on the criteria needed to justify the recommendation.
  - Show pricing as a structured model, not a loose list.
]
- [Visual:
  - Recommended deployment callout.
  - Comparison table.
  - Cost structure table.
  - Screenshot: Monitoring screenshots showing deployment health.
]
- [Writer guidance:
  - Keep model descriptions short.
  - Make cost ownership and assumptions explicit.
]
- [Do NOT:
  - Spend equal space on non-recommended options.
]



- Visual elements (use where relevant):
  - Diagram: `deployment-topology-saas.mmd` or `deployment-topology-onprem.mmd`
  - Table: deployment model comparison
  - Screenshot: Monitoring, Settings

**Consistency anchor:** Deployment model comparison uses identical criteria columns across all variants.

> ✅ **Section complete when:** Recommended model stated with rationale. Comparison table present. Infrastructure requirements listed.

## Support & SLA
- [Target: 700-1000 words]
- [Source: reusable/support-sla.md]
- [Key messages:
  - Match support tier to deployment criticality.
  - Show support tiers and severity levels in two main tables.
]
- [Visual:
  - Support tier table.
  - Severity and response table.
]
- [Writer guidance:
  - Focus on commercial-operational implications.
]
- [Do NOT:
  - Reproduce every SLA paragraph from source.
]



- Visual elements (use where relevant):
  - Table: support tier comparison, severity/response matrix, escalation path
  - Screenshot: Monitoring showing support dashboard

**Consistency anchor:** SLA figures match approved source exactly. Tier names and coverage hours never modified without approval.

> ✅ **Section complete when:** Support tier comparison table present. Severity/response matrix included. Escalation path defined.

## Implementation
- [Target: 900-1300 words]
- [Source: reusable/implementation-plan.md; templates/commercial-proposal.md]
- [Key messages:
  - Explain the implementation path through one concise timeline and one pricing summary.
  - Highlight the 6 phases at summary level only.
  - Note accelerators and risks briefly.
]
- [Visual:
  - Timeline table.
  - Pricing summary table.
  - Small accelerator/risk box.
]
- [Writer guidance:
  - Give each phase one compact row: objective, duration, output.
]
- [Do NOT:
  - Turn each phase into a mini essay.
]



- Visual elements (use where relevant):
  - Diagram: `implementation-timeline.mmd`
  - Table: phase table, pricing summary, RACI

**Consistency anchor:** Phase names and sequence identical across all proposal variants. Gate criteria stated for every phase.

> ✅ **Section complete when:** Phase table with gate criteria present. Timeline table included. Dependencies and governance addressed.

## Commercial Terms
- [Target: 800-1200 words]
- [Source: templates/commercial-proposal.md]
- [Key messages:
  - Summarize only the key commercial terms procurement and legal need for initial review.
  - Cover structure, payment, duration, renewal, termination, IP, liability, confidentiality, and escrow.
]
- [Visual:
  - Key terms summary table.
]
- [Writer guidance:
  - Keep it compact and scannable.
  - Mark negotiables and client-specific placeholders.
]
- [Do NOT:
  - Try to substitute for full contract language.
]



- Visual elements (use where relevant):
  - Table: contract structure, payment schedule, key terms

**Consistency anchor:** All negotiable terms clearly marked. No binding legal language unless instructed.

> ✅ **Section complete when:** Contract structure, payment, duration, renewal, termination, IP, liability, and confidentiality all addressed.

## TCO Summary
- [Target: 900-1300 words]
- [Source: templates/commercial-proposal.md; content/07-commercial-proposal/main.md]
- [Key messages:
  - Show a 3-year TCO model only.
  - Compare DALP against build and multi-vendor alternatives.
  - Make the economic conclusion obvious in one page of tables plus concise interpretation.
]
- [Visual:
  - 3-year TCO table.
  - Comparison table: DALP vs build vs multi-vendor.
]
- [Writer guidance:
  - Use fewer commentary paragraphs and stronger table notes.
]
- [Do NOT:
  - Add a 5-year model in this variant.
]


**Consistency anchor:** TCO categories identical across proposals. Every figure traces to an assumption source.

> ✅ **Section complete when:** TCO comparison table present. Assumptions documented. Economic conclusion clearly stated.

## References
- [Target: 700-1000 words]
- [Source: reusable/reference-projects.md]
- [Key messages:
  - Include all references in summary-table form.
  - Expand only one most relevant reference in detail.
]
- [Visual:
  - All-reference summary table.
  - One expanded case card.
]
- [Writer guidance:
  - Select the expanded reference based on strongest commercial reassurance value.
]
- [Do NOT:
  - Expand multiple cases unless essential.
]



- Visual elements (use where relevant):
  - Table: joint reference snapshot (client, combined scope, SettleMint role, partner role, outcome)

**Consistency anchor:** Summary table uses identical column structure. Only approved reference names and outcomes.

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
- [Target: 300-500 words]
- [Source: templates/commercial-proposal.md]
- [Key messages:
  - Set out the short path to commercial validation and contract execution.
]
- [Visual:
  - Simple next-steps table with action, owner, output, timing.
]
- [Writer guidance:
  - End with momentum.
]
- [Do NOT:
  - Introduce new assumptions here.
]


- Visual elements (use where relevant):
  - Table: action items with owner, output, and timing

**Consistency anchor:** Action items are time-bound with named owners. No generic closing language.

> ✅ **Section complete when:** Action items listed with owner, output, and timing. Path to contract execution clear.
