# 6_diagrams

Mermaid diagram skeleton library for DALP proposals.

These files are not finished visuals. They are proposal-ready starting points with DALP terminology, consistent styling, and client placeholder hooks so proposal writers can adapt diagrams quickly without redrawing core platform architecture every time.

## Visual Element Policy

> **Directive (Gyan, 2026-04-03):** Diagrams are a first-class narrative tool. Use them wherever they reinforce the narrative or help the evaluator understand faster than prose alone. There is no upper limit on the number of diagrams per proposal or per section. Use as many as the content warrants.

Additionally, DALP platform screenshots should be included alongside diagrams wherever they reinforce the narrative. Select from the screenshot catalog (`shared/brand/dalp-screenshots/CATALOG.md`) and the screenshot registry (`setup/screenshot-registry.md`).

## Purpose

Use this folder when a proposal needs a visual explanation of:

- DALP platform architecture
- asset lifecycle and servicing flows
- compliance and transfer controls
- integration boundaries
- deployment topology
- security layers and access control
- implementation sequencing
- smart contract stack structure

The goal is simple: reuse the same visual language across proposals, keep diagrams technically accurate, and avoid one-off diagram styles that make the final DOCX feel inconsistent.

## How this library fits into proposal skeletons

The markdown proposal skeletons in `1_technical/` through `5_questionnaire/` reference visuals at section level. This library provides the reusable source diagrams for those sections.

Typical mapping:

| Diagram | Typical proposal sections |
|---|---|
| `platform-architecture-layers.mmd` | Platform architecture, technical overview, solution design |
| `solution-architecture.mmd` | Target solution, integration scope, operating model |
| `token-lifecycle-states.mmd` | Asset lifecycle, servicing model, operational design |
| `compliance-transfer-flow.mmd` | Compliance, transfer controls, regulatory enforcement |
| `integration-architecture.mmd` | Enterprise integration, API strategy, system landscape |
| `deployment-topology-saas.mmd` | SaaS deployment, managed service model, infrastructure |
| `deployment-topology-onprem.mmd` | Self-hosted deployment, on-premises or private cloud architecture |
| `security-layers.mmd` | Security architecture, control model, assurance sections |
| `implementation-timeline.mmd` | Delivery plan, mobilization, phased rollout |
| `identity-access-model.mmd` | IAM, RBAC, tenant isolation, SSO |
| `data-flow-asset-creation.mmd` | Asset onboarding, issuance design, deployment workflow |
| `smart-contract-architecture.mmd` | On-chain design, contract stack, extensibility |
| `bond-issuance-flow.mmd` | Bond issuance lifecycle, maker-checker governance, asset onboarding |
| `deposit-tokenization-flow.mmd` | Tokenized deposit lifecycle, reserve linkage, interest accrual |
| `stablecoin-operations-flow.mmd` | Stablecoin issuance, MiCA compliance, supply cap enforcement |
| `equity-tokenization-flow.mmd` | Equity token lifecycle, Reg D / MiFID II, corporate actions |
| `fund-tokenization-flow.mmd` | Fund unit tokenization, NAV integration, subscription/redemption |
| `real-estate-tokenization-flow.mmd` | Property tokenization, fractional ownership, yield distribution |
| `compliance-module-architecture.mmd` | Compliance module system, modular composition, runtime evaluation |
| `maker-checker-governance.mmd` | Dual-approval governance, audit trail, operational controls |
| `rbac-permission-model.mmd` | Role-based access control, platform to on-chain role cascade |
| `event-driven-architecture.mmd` | Event-driven integration, webhook dispatch, real-time event flow |

## Authoring workflow

1. Choose the diagram closest to the proposal section.
2. Keep the global style from `STYLE-GUIDE.md` intact.
3. Replace only the `[CLIENT: ...]` placeholders that matter.
4. Remove optional nodes that are out of scope rather than inventing new structure.
5. Keep each diagram to a single proposal page when rendered.
6. If a new diagram is needed, copy the standard init block and class definitions from `STYLE-GUIDE.md`.

## When to use which diagram family

- Use **flowcharts** for architecture stacks, process flows, integrations, and deployment relationships.
- Use **sequence diagrams** when timing, handoffs, and approval logic matter.
- Use **state diagrams** for lifecycle states and transitions.
- Use **gantt charts** for implementation phasing.
- Use **class diagrams** for role and permission inheritance.
- Use **graph / topology diagrams** for infrastructure layout.
- Use **mindmaps** only for capability overviews, not technical execution detail.

See `DIAGRAM-TYPES.md` for selection guidance.

## Library conventions

- DALP platform nodes use blue.
- Client-owned systems use green.
- Third-party and external services use orange.
- Compliance and identity controls use purple.
- Infrastructure and hosting components use grey.
- Alerts, rejects, exceptions, and emergency controls use red.
- All nodes use rounded corners and dark text for readability in DOCX exports.

## Proposal writing guidance

These diagrams should support the text, not replace it. Include as many diagrams as needed to communicate effectively. There is no upper cap on visual count.

Good use:
- multiple diagrams per major section when they each communicate distinct information
- architecture visuals paired with process visuals in technical sections
- deployment topology diagrams for each relevant hosting model
- screenshots from the DALP platform alongside diagrams to show real product interfaces

Bad use:
- duplicate diagrams that say the same thing with different styling
- overly dense node maps with tiny unreadable labels
- generic blockchain boxes with no DALP terms

## Recommended integration pattern in markdown skeletons

Reference diagrams in proposal sections with instruction text such as:

- `[Visual: Insert platform-architecture-layers.mmd adapted for client deployment model]`
- `[Visual: Use compliance-transfer-flow.mmd if transfer approval or jurisdiction controls are in scope]`
- `[Visual: Use deployment-topology-onprem.mmd for private cloud or regulated hosting requirements]`

That keeps the skeletons modular while preserving one reusable diagram source library.


## Use Case and DALP Explainer Diagrams

### `bond-issuance-flow.mmd` (sequence diagram)
Full bond issuance user story with maker-checker governance at every critical step. Covers bond design, compliance module selection, RBAC configuration, factory deployment, role assignment, initial mint, and custody notification.

### `deposit-tokenization-flow.mmd` (sequence diagram)
Tokenized deposit lifecycle from definition through maturity redemption. Shows reserve-linkage synchronization, supply cap enforcement, interest accrual mechanics, and fiat settlement on maturity.

### `stablecoin-operations-flow.mmd` (flowchart TD)
Stablecoin issuance and management with MiCA compliance enforcement. Shows 1:1 peg maintenance via reserve attestation, MiCA supply cap checks, rolling window tracking, compliance-gated transfers, and redemption/burn flow.

### `equity-tokenization-flow.mmd` (sequence diagram)
Equity token lifecycle from share class definition through corporate actions. Covers Reg D / MiFID II compliance configuration, primary distribution with investor eligibility checks, secondary transfer with compliance, and dividend/voting mechanics.

### `fund-tokenization-flow.mmd` (flowchart LR)
Fund unit tokenization with NAV feed integration, investor eligibility checks, subscription (mint), redemption (burn) within windows, transfer restrictions, and regulatory reporting. Includes [CLIENT: Fund Administrator] and [CLIENT: Transfer Agent] placeholders.

### `real-estate-tokenization-flow.mmd` (flowchart TD)
Property tokenization user story covering onboarding, legal wrapper establishment, valuation feed, fractional token creation, accredited investor checks, primary sale, secondary trading with compliance, rental yield distribution, and property exit events.

### `compliance-module-architecture.mmd` (flowchart TB)
Deep dive into DALP's modular compliance system. Shows seven configurable compliance modules, how they compose per asset, and the runtime evaluation chain where each module is checked sequentially before an operation is approved or blocked.

### `maker-checker-governance.mmd` (sequence diagram)
How maker-checker dual-approval works across DALP operations. Covers initiation, pending state, reviewer verification, approve/reject paths, on-chain execution, and full audit trail logging at every step. Lists which operations require maker-checker.

### `rbac-permission-model.mmd` (flowchart TB)
DALP role-based access control model showing how platform roles (Admin, Operator, Viewer) map to asset roles (Issuer, Transfer Agent, Compliance Officer) which cascade to smart contract roles via AccessManager (MINTER, BURNER, FREEZER, PAUSER, FORCED_TRANSFER).

### `event-driven-architecture.mmd` (flowchart LR)
DALP event-driven integration architecture. Shows on-chain events flowing through Chain Indexer to Event Store, then dispatched via webhooks in real time to client systems. Covers six event types and four consumer patterns (notifications, reporting, reconciliation, audit).


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


