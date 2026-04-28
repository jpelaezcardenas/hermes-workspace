# Proposal Skeletons

Blueprint skeletons for SettleMint DALP proposals. Each skeleton is a **structural blueprint**: it contains section hierarchy, word count targets, source file references, writer instructions, and visual specifications. **No prose content.** The writer uses these as instructions to produce the final proposal.

---

## Skeleton Menu & Nicknames

> **Before generating any proposal:** present this table to the requester, confirm their choice, then proceed. Never skip confirmation. Technical and commercial proposals always use separate skeletons, never merge them.

| Codename | Type | Variant | Expected Output | Suggested Usage |
|---|---|---|---|---|
| **COLOSSUS** | Technical | Maximum | **70–120 pages / 25k–45k words** | Regulated-bank mega-pack: narrative + annexes + evidence index + requirement traceability + proof-room structure |
| **TITAN** | Technical | Full | **80–100 pages** | Large RFPs, tier-1 institutions, sovereign programmes, evaluators who want full architecture + security + delivery depth |
| **FALCON** | Technical | Medium | **40–60 pages** | Mid-size technical bids, follow-up proposals, balanced depth without full exhaustive coverage |
| **SENTINEL** | Technical | Compact | **20–30 pages** | Quick-turnaround technical bids, expressions of interest, smaller engagements needing a credible but concise technical story |
| **ATLAS** | Commercial | Full | **60–80 pages** | Procurement-heavy bids, finance/legal/TCO reviews, situations where pricing rationale and commercial terms need full treatment |
| **SPARK** | Commercial | Medium | **30–45 pages** | Commercial decision-maker reviews needing structured recommendation without exhaustive legal/TCO depth |
| **CROWN** | Commercial | Compact | **15–25 pages** | Executive fast-read, early-stage commercial proposals, situations where brevity and clarity matter more than completeness |
| **BEACON** | RFI | Full | **80–120 pages** | Formal RFIs with evaluation panels spanning business, technical, security, and compliance, maximum coverage needed |
| **ARROW** | RFI | Medium | **40–60 pages** | Condensed but evaluator-friendly RFI responses; most common choice for structured RFI questionnaires |
| **SHIELD** | RFI | Compact | **20–30 pages** | Executive-friendly RFI essentials; early-stage information requests or lightweight qualification rounds |
| **PRISM** | Joint Response | Full | **80–120 pages** | Large consortium bids requiring explicit scope split, partner governance, and dual-brand narrative |
| **MATRIX** | Joint Response | Medium | **40–60 pages** | Consortium bids where responsibilities are clear but a condensed treatment is preferred |
| **VAULT** | Joint Response | Compact | **20–30 pages** | Compact consortium responses where full responsibility clarity is needed in a shorter format |
| **LENS** | Questionnaire | Standard | **Excel + markdown** | Security/procurement questionnaires requiring row-level traceability; not a narrative proposal |
| **ECHO** | Generic | Full | **50–70 pages** | Comprehensive proposals that don't fit technical/commercial/RFI categories; maximum flexibility with full coverage |
| **WAVE** | Generic | Medium | **25–40 pages** | Balanced proposals for non-standard request types; moderate depth with adaptable structure |
| **DRIFT** | Generic | Compact | **12–20 pages** | Concise catch-all for requests outside existing categories; flexible but focused |

> **Note:** DOCX skeleton files are 5-page structural blueprints. Expected output = the final generated proposal length when the skeleton is filled with content.

---

## Proposal Generation Workflow (Mandatory)

### When someone asks for a technical proposal:
1. Present the four technical skeleton options: **COLOSSUS** (70–120 pp / 25k–45k words), **TITAN** (80–100 pp), **FALCON** (40–60 pp), **SENTINEL** (20–30 pp)
2. Explain the difference briefly
3. Ask: *"Which skeleton would you like to use?"*
4. Wait for explicit confirmation
5. Only then generate the proposal using the confirmed skeleton
6. Always use a **technical skeleton**: never use a commercial skeleton for a technical proposal

### When someone asks for a commercial proposal:
1. Present the three commercial skeleton options: **ATLAS** (60–80 pp), **SPARK** (30–45 pp), **CROWN** (15–25 pp)
2. Explain the difference briefly
3. Ask: *"Which skeleton would you like to use?"*
4. Wait for explicit confirmation
5. Only then generate the proposal using the confirmed skeleton
6. Always use a **commercial skeleton**: never use a technical skeleton for a commercial proposal

### Key rules:
- **Technical and commercial proposals are always separate documents using separate skeletons**
- **Never merge technical and commercial content into one skeleton**
- **Never skip the confirmation step**: always present options first
- **Any change to this workflow requires explicit approval from Gyan** (`@Gyan` / `URGPRND7Z`)

---

## Folder Structure

```
skeletons/
├── README.md                          ← You are here
├── INDEX.md                           ← Full codename/ID index
├── 1_technical/
│   ├── markdown/
│   │   ├── technical-colossus.md      COLOSSUS, 70-120 pages / 25k-45k words
│   │   ├── technical-full.md          TITAN , 80-100 pages
│   │   ├── technical-medium.md        FALCON, 40-60 pages
│   │   └── technical-compact.md       SENTINEL, 20-30 pages
│   └── docx/
│       ├── technical-colossus.docx
│       ├── technical-full.docx
│       ├── technical-medium.docx
│       └── technical-compact.docx
├── 2_commercial/
│   ├── markdown/
│   │   ├── commercial-full.md         ATLAS , 60-80 pages
│   │   ├── commercial-medium.md       SPARK , 30-45 pages
│   │   └── commercial-compact.md      CROWN , 15-25 pages
│   └── docx/
│       ├── commercial-full.docx
│       ├── commercial-medium.docx
│       └── commercial-compact.docx
├── 3_rfi/
│   ├── markdown/
│   │   ├── rfi-full.md                BEACON, 80-120 pages
│   │   ├── rfi-medium.md              ARROW , 40-60 pages
│   │   └── rfi-compact.md             SHIELD, 20-30 pages
│   └── docx/
│       ├── rfi-full.docx
│       ├── rfi-medium.docx
│       └── rfi-compact.docx
├── 4_joint-response/
│   ├── markdown/
│   │   ├── joint-response-full.md     PRISM , 80-120 pages
│   │   ├── joint-response-medium.md   MATRIX, 40-60 pages
│   │   └── joint-response-compact.md  VAULT , 20-30 pages
│   └── docx/
│       ├── joint-response-full.docx
│       ├── joint-response-medium.docx
│       └── joint-response-compact.docx
├── 5_questionnaire/
│   ├── markdown/
│   │   └── questionnaire-response.md  LENS  . Excel primary
│   └── excel/
│       ├── settlemint-questionnaire-template-v1.0.0.xlsx
│       ├── settlemint-questionnaire-template.xlsx
│       └── settlemint-questionnaire-template.csv
├── 6_diagrams/
    ├── README.md
    ├── STYLE-GUIDE.md
    ├── DIAGRAM-TYPES.md
    └── skeletons/
        ├── platform-architecture-layers.mmd
        ├── solution-architecture.mmd
        ├── token-lifecycle-states.mmd
        ├── compliance-transfer-flow.mmd
        ├── integration-architecture.mmd
        ├── deployment-topology-saas.mmd
        ├── deployment-topology-onprem.mmd
        ├── security-layers.mmd
        ├── implementation-timeline.mmd
        ├── identity-access-model.mmd
        ├── data-flow-asset-creation.mmd
        └── smart-contract-architecture.mmd
└── 7_generic/
    └── markdown/
        ├── generic-full.md            ECHO  , 50-70 pages
        ├── generic-medium.md          WAVE  , 25-40 pages
        └── generic-compact.md         DRIFT , 12-20 pages
```

---

## Variants

| Variant | Purpose | When to Use |
|---|---|---|
| **Full** | Maximum detail, all sections, comprehensive coverage | Large RFPs, tier-1 institutions, sovereign programmes, high-value bids |
| **Medium** | Core sections with moderate detail | Mid-size opportunities, follow-up proposals, time-constrained responses |
| **Compact** | Essential sections only, tight and focused | Quick-turnaround bids, initial expressions of interest, smaller engagements |

### Generic Skeleton Usage

> **When to use the Generic skeleton:** When the request does not fit cleanly into any of the typed categories (technical, commercial, RFI, joint-response, questionnaire). The Generic skeleton provides the same structural rigor and compliance standards while allowing maximum flexibility in content emphasis.

| Codename | Variant | When to Use |
|---|---|---|
| **ECHO** | Full | Comprehensive proposals that don't fit technical/commercial/RFI categories; maximum flexibility with full coverage |
| **WAVE** | Medium | Balanced proposals for non-standard request types; moderate depth with adaptable structure |
| **DRIFT** | Compact | Concise catch-all for requests outside existing categories; flexible but focused |

---

## How to Use

1. Present skeleton options to the requester and confirm their choice (see **Proposal Generation Workflow** above)
2. Pick the skeleton type (technical / commercial / rfi) and variant (full / medium / compact)
3. Copy the markdown file as your working draft
4. Follow the `[Target:]`, `[Source:]`, `[Key messages:]`, `[Visual:]`, and `[Writer guidance:]` instructions in each section
5. Pull content from the referenced source files in `content/`, `reusable/`, and `templates/`
6. Replace all `[VARIABLE: ...]` placeholders with client-specific information
7. Convert to DOCX using the V12 locked template: `python3 scripts/markdown_to_docx.py input.md output.docx`

---

## Visual Element Policy

> **Directive (Gyan, 2026-04-05):** Screenshots are mandatory proof assets across every proposal skeleton.

- **Minimum DALP screenshots by variant:** full = 12, medium = 8, compact = 6
- **Section spread rule:** distribute screenshots across relevant sections instead of clustering them in one section or appendix
- **Category variety rule:** use multiple screenshot categories unless the buyer request is intentionally narrow and asset-class-specific
- **Inline proof rule:** place each screenshot immediately after the paragraph it proves
- **Caption rule:** every screenshot is followed by a `*Figure X: ...*` caption stating what the evaluator is seeing and why it matters
- **Planning rule:** assign screenshots to sections before drafting prose, using `setup/screenshot-registry.md` and `../shared/brand/dalp-screenshots/CATALOG.md`
- **Validation rule:** `scripts/validate_proposal.py` enforces screenshot minimums plus caption coverage, section spread, and category variety
- **Section-to-visual mapping:** each proposal skeleton contains a section-to-screenshot map with catalog file suggestions, plus diagram and table guidance

## Rules

- **Keep this structure clean.** Do not add random files to this folder.
- **Markdown is the source of truth.** DOCX files are generated outputs.
- **No prose in skeletons.** Skeletons are blueprints. Content lives in `content/`, `reusable/`, and `templates/`.
- **No manual numbering.** The V12 Word template handles all heading numbering automatically.
- **Version changes go through review.** Don't modify skeletons without approval.
- **Workflow changes require Gyan's explicit approval.** If any request would alter how proposal generation works, tag `@Gyan` before proceeding.

---

## Source Content Locations

| Content | Location |
|---|---|
| About SettleMint | `reusable/about-settlemint.md` |
| About DALP | `reusable/about-dalp.md` |
| Customer References | `reusable/reference-projects.md` |
| Implementation Plan | `reusable/implementation-plan.md` |
| Deployment Options | `reusable/deployment-options.md` |
| Support & SLA | `reusable/support-sla.md` |
| Training | `reusable/training.md` |
| Technical Proposal Template | `templates/technical-proposal-part1.md`, `templates/technical-proposal-part2.md` |
| Commercial Proposal Template | `templates/commercial-proposal.md` |
| RFI Response Template | `templates/rfi-response.md` |
| Content Sections | `content/01-*` through `content/08-*` |
| Full Content Index | `INDEX.md` |
| Diagram Library | `6_diagrams/README.md`, `6_diagrams/STYLE-GUIDE.md`, `6_diagrams/DIAGRAM-TYPES.md`, `6_diagrams/skeletons/*.mmd` |

_Last updated: 2026-03-18_


## About SettleMint

### About SettleMint (300-400 words, 2-3 paragraphs)

- Write about: company founding (2016), mission, regulated-market focus, team composition, global delivery footprint, and institutional readiness.
- Include: 1 table (`Metric | Value`) with 6-8 approved company facts such as founding year, headquarters, operating regions, certifications, production track record, and target buyer segments.
- Include: a short subsection or bullet group covering leadership/team, offices or regional coverage, and certifications/audits where relevant to the bid.
- Tone: credible, factual, low-hype, procurement-safe.
- Reference: `bid-manager/content/01-company-profile/main.md`, `bid-manager/templates/company-profile.md`.
- Do not: invent headcount, revenue, investor details, office locations, or certification scope beyond approved sources.


## About DALP

### About DALP (350-500 words, 3-4 paragraphs or equivalent table-led structure)

- Write about: DALP as the Digital Asset Lifecycle Platform, its lifecycle coverage, key capabilities, deployment flexibility, and operational differentiators.
- Include: 1 capability matrix or layered table covering lifecycle pillars, integration surfaces, and differentiators most relevant to the bid.
- Cover explicitly: platform overview, supported operating scope, core capabilities, and why DALP is different from fragmented point-solution stacks.
- Tone: platform-led, precise, evaluator-friendly.
- Reference: existing DALP sources already listed in the skeleton, plus `bid-manager/content/01-company-profile/main.md` for narrative consistency where useful.
- Do not: drift into feature-spam, roadmap claims, or generic blockchain education.


## Customer References

### Customer References (700-1100 words total; 3-4 case studies)

- Write about: 3-4 references most relevant to the buyer's geography, asset class, regulatory setting, or operating model.
- Include: 1 summary table covering all approved references (`Client | Geography | Use Case | Deployment Scale | Outcome / Relevance`).
- For expanded examples, use a repeatable structure: context, challenge, DALP solution pattern, deployment scale, measurable outcomes, and transferability to this bid.
- Prefer: 3 expanded references in full variants, 2 in medium variants, compact table-only treatment in compact variants unless the skeleton explicitly requires more.
- Tone: evidence-backed, specific, non-promotional.
- Reference: `bid-manager/content/07-references/main.md`, `bid-manager/templates/case-studies.md`.
- Do not: add unapproved customer names, inferred metrics, or NDA-sensitive detail.


## Project Implementation & Delivery

### Project Implementation & Delivery (900-1400 words depending on variant)

- Write about: delivery methodology, implementation phases, indicative timeline, governance, RACI, milestones, gates, client dependencies, and delivery risks.
- Include: 1 phase table or Gantt-style timeline with phases, objectives, outputs, dependencies, and acceptance gates.
- Include: 1 compact RACI or role matrix showing SettleMint, client, and partner roles if relevant.
- Cover explicitly: methodology, phase objectives, milestone logic, hypercare/transition, and the decisions needed to stay on schedule.
- Tone: disciplined, realistic, execution-focused.
- Reference: `bid-manager/content/06-implementation/main.md`, `bid-manager/templates/implementation-plan.md`.
- Do not: present sample timelines as contractual commitments or hide client responsibilities.


## Deployment

### Deployment (500-900 words depending on variant)

- Write about: recommended deployment model, deployment alternatives considered, cloud/on-prem/hybrid options, infrastructure requirements, environment model, resilience, and data residency implications.
- Include: 1 comparison table covering Managed SaaS, private/dedicated cloud, on-premises, and hybrid where relevant.
- Include: 1 logical topology or environment summary showing how DALP fits the buyer's hosting model.
- Cover explicitly: infrastructure prerequisites (Kubernetes/OpenShift, PostgreSQL, Redis, object storage, ingress/network), DR/backup approach, and hosting responsibility.
- Tone: infrastructure-literate, non-speculative, requirements-driven.
- Reference: `bid-manager/content/04-deployment/main.md`.
- Do not: imply platform capability changes by deployment model or commit to unsupported residency/security claims.


## Support Appendix

### Support Appendix (400-700 words, appendix-style)

- Write about: support tiers, SLA commitments, severity definitions, escalation paths, maintenance/update policy, reporting cadence, and service-credit rules where approved.
- Include: 1 support-tier comparison table and 1 severity/response/resolution table.
- Cover explicitly: named channels, coverage hours, incident escalation path, maintenance windows, and any service credit mechanics approved for proposal use.
- Tone: operational, precise, contract-aware.
- Reference: `bid-manager/content/07-support-sla/main.md`, `bid-manager/templates/sla-framework.md`.
- Do not: change SLA values, uptime targets, or service-credit terms without approval.
