# Mermaid Style Guide for DALP Proposal Diagrams

This file is the global visual standard for all Mermaid diagrams used in DALP proposals.

## Design goals

- Clean, boardroom-safe diagrams that still feel technical
- Readable after markdown → DOCX conversion
- Consistent color semantics across all proposals
- Rounded, modern visual treatment aligned to SettleMint brand direction
- Dense enough to be useful, not dense enough to become illegible

## Mandatory rules

### 1. Rounded corners on all nodes

All box-based nodes must render with rounded corners.

Use one of these patterns:

- `class nodeName rounded;`
- combined semantic classes such as `class api dalp,rounded;`
- style overrides where Mermaid classing is limited

Standard rounded definition:

```mermaid
classDef rounded rx:10,ry:10;
```

Target: every rectangular node should visibly read as rounded in exported output.

### 2. Pastel palette with dark text

Use light fills and dark text only. No saturated backgrounds.

### Color palette

| Semantic | Fill | Stroke | Text |
|---|---|---|---|
| DALP platform | `#E8F4FD` | `#5B8DEF` | `#1A1A2E` |
| Client systems | `#E8F5E9` | `#66BB6A` | `#1A1A2E` |
| External / third party | `#FFF3E0` | `#FB8C00` | `#1A1A2E` |
| Compliance / identity | `#F3E5F5` | `#8E63CE` | `#1A1A2E` |
| Infrastructure / hosting | `#F5F5F5` | `#90A4AE` | `#1A1A2E` |
| Alerts / reject / emergency | `#FFEBEE` | `#E57373` | `#1A1A2E` |
| Highlight / timeline milestone | `#FFF8E1` | `#FBC02D` | `#1A1A2E` |

### 3. Font and text treatment

Brand font is **Figtree**.

Mermaid cannot always guarantee font embedding in every renderer, so diagrams should specify:

- primary: `Figtree`
- fallback: `Inter, Arial, sans-serif`

Text color must stay dark:

- use `#1A1A2E` for labels by default
- avoid white text on colored nodes

### 4. Consistent lines and arrows

Use restrained edge styling.

- line color: `#6B7280`
- line width: `1.5px`
- arrow color: same as line
- prefer standard solid arrows for main flows
- use dashed lines only for optional, asynchronous, or governance-triggered relationships
- do not mix many arrow styles in one diagram

### 5. Spacing and padding

Proposal diagrams need breathing room to survive DOCX export.

Recommended defaults:

- node spacing: `40`
- rank spacing: `55`
- padding inside nodes: use Mermaid default plus simple labels
- max nodes per row for full-width page diagrams: `4-6`
- avoid more than `3` line breaks inside a node

### 6. Color semantics

Keep these meanings fixed across all diagrams:

- **Blue** = DALP platform capabilities or DALP-owned logical components
- **Green** = client-owned systems, teams, or environments
- **Orange** = third-party systems, banks, KYC vendors, market utilities, payment rails
- **Purple** = compliance, identity, governance, and regulatory controls
- **Grey** = infrastructure, hosting, network, databases, runtime components
- **Red** = reject paths, emergency controls, freezes, exceptions, or risk-sensitive controls
- **Yellow** = milestones or important implementation checkpoints

### 7. Label conventions

- Use title case for node labels
- Keep labels to **2-4 words** where possible
- Prefer line breaks over long horizontal labels
- Use real DALP terms: `Asset Console`, `Unified API`, `Execution Engine`, `Key Guardian`, `Chain Indexer`, `SMART Protocol`, `OnchainID`, `AccessManager`
- Client placeholders must use the format: `[CLIENT: Core Banking]`
- Avoid vague labels like `Backend`, `Middleware Box`, `Token Module`

### 8. Diagram sizing guidance

For proposal pages:

| Size | Use case | Guidance |
|---|---|---|
| Full width | primary architecture or deployment view | target 10-16 nodes, 3-5 groups |
| Half width | narrow process or role model | target 6-10 nodes |
| Full page portrait | gantt or detailed state diagram | keep labels short; avoid nested overload |
| Full page landscape | deployment topology or layered architecture | preferred for wide diagrams |

If a diagram does not fit on one page at readable size, split it. Do not shrink it into a postage stamp.

## Standard init block

Every diagram should start with this block unless the diagram type requires a minor override.

```mermaid
%%{init: {
  "theme": "base",
  "themeVariables": {
    "fontFamily": "Figtree, Inter, Arial, sans-serif",
    "fontSize": "15px",
    "textColor": "#1A1A2E",
    "primaryColor": "#E8F4FD",
    "primaryBorderColor": "#5B8DEF",
    "primaryTextColor": "#1A1A2E",
    "secondaryColor": "#E8F5E9",
    "secondaryBorderColor": "#66BB6A",
    "secondaryTextColor": "#1A1A2E",
    "tertiaryColor": "#F3E5F5",
    "tertiaryBorderColor": "#8E63CE",
    "tertiaryTextColor": "#1A1A2E",
    "lineColor": "#6B7280",
    "background": "#FFFFFF",
    "mainBkg": "#E8F4FD",
    "secondBkg": "#E8F5E9",
    "tertiaryBkg": "#F3E5F5",
    "clusterBkg": "#FAFAFA",
    "clusterBorder": "#D0D7DE",
    "edgeLabelBackground": "#FFFFFF"
  },
  "flowchart": {
    "curve": "basis",
    "nodeSpacing": 40,
    "rankSpacing": 55,
    "padding": 18,
    "htmlLabels": true,
    "diagramPadding": 8
  },
  "sequence": {
    "mirrorActors": false,
    "showSequenceNumbers": false,
    "diagramMarginX": 40,
    "diagramMarginY": 20,
    "messageMargin": 32,
    "boxMargin": 12,
    "boxTextMargin": 8,
    "noteMargin": 12,
    "actorMargin": 40,
    "width": 170,
    "height": 64
  },
  "gantt": {
    "leftPadding": 90,
    "topPadding": 30,
    "gridLineStartPadding": 140,
    "fontSize": 14
  },
  "securityLevel": "loose"
}}%%
```

## Standard classDef block

Copy this into flowcharts, graphs, class diagrams, and topology diagrams.

```mermaid
classDef rounded rx:10,ry:10;
classDef dalp fill:#E8F4FD,stroke:#5B8DEF,color:#1A1A2E,stroke-width:1.5px;
classDef client fill:#E8F5E9,stroke:#66BB6A,color:#1A1A2E,stroke-width:1.5px;
classDef external fill:#FFF3E0,stroke:#FB8C00,color:#1A1A2E,stroke-width:1.5px;
classDef compliance fill:#F3E5F5,stroke:#8E63CE,color:#1A1A2E,stroke-width:1.5px;
classDef infra fill:#F5F5F5,stroke:#90A4AE,color:#1A1A2E,stroke-width:1.5px;
classDef risk fill:#FFEBEE,stroke:#E57373,color:#1A1A2E,stroke-width:1.5px;
classDef milestone fill:#FFF8E1,stroke:#FBC02D,color:#1A1A2E,stroke-width:1.5px;
```

## Type-specific notes

### Flowchart / Graph
- Apply semantic class plus `rounded`
- Group related nodes with subgraphs only when the grouping adds meaning
- Keep edge labels to 1-3 words

### Sequence diagram
- Mermaid sequence diagrams do not support `classDef` in the same way as flowcharts
- Use actor naming, section comments, and notes for clarity rather than visual overload
- Keep participants ordered left-to-right by flow ownership: user/client → DALP API → middleware → compliance → chain/custody

### Gantt
- Use short phase names
- One row per workstream or milestone family
- Use milestones sparingly so they still stand out

### State diagram
- Keep action labels short
- Use notes for domain detail if needed
- Avoid branching explosion; prefer one main lifecycle plus explicit exception states

### Class diagram
- Use for logical inheritance or role grouping, not infrastructure
- Keep attributes minimal; focus on relationships

## Reuse rule

When in doubt, copy the standard init block and class block exactly, then adapt only:

- node names
- group labels
- flow direction
- optional client placeholders

Do not invent new colors unless there is a compelling reason.


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


