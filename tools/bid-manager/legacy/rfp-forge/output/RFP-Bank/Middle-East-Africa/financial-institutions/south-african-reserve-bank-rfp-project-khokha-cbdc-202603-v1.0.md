# Request for Proposal (RFP)

| Field | Value |
| --- | --- |
| Reference | SOUTH-AFRICAN-RESERVE-BANK-RFP-PROJECT-KHOKHA-CBDC-202603 |
| Version | v1.0 |
| Issue date | March 2026 |
| Issuing organization | South African Reserve Bank (South Africa) |
| Document type | RFP |
| Subject | Project Khokha-Aligned Cbdc And Tokenized Settlement Support |
| Programme | Middle East & Africa RFP Bank |
| Language | English |
| Response currency | USD unless otherwise stated |
| Confidentiality | Restricted |
| Status | Issued |

## 1. Procurement Context

### 1.1 Institutional Context

South African Reserve Bank is treating Project Khokha-aligned CBDC and tokenized settlement support
as a business-critical capability that must be implemented with the same discipline applied to core
regulated systems. The solution under consideration will be expected to operate inside a control
environment shaped by business ownership, architecture standards, security review, legal
interpretation, compliance sign-off, and internal audit expectations. This is not a speculative
innovation exercise. It is a procurement intended to test whether the market can supply a dependable
platform and implementation model for the target operating state.

The buyer's review team will therefore look beyond product feature lists. It will test whether
bidders can explain how the platform behaves when confronted with real-world operational pressure:
incomplete onboarding data, limit breaches, approvals delayed by governance, partner outages,
regulatory evidence requests, bulk corrections, data retention obligations, and phased rollout
constraints. Responses should be written for that audience. The strongest submissions will show
operational self-awareness rather than abstract confidence.

Regional conditions in South Africa also matter. The buyer expects bidders to anchor their response
in actual market infrastructure and supervisory realities, including the pace of domestic policy
development, the role of regulated intermediaries, and the practical limits of cross-border
interoperability. References to initiatives such as Project Aber, Digital Dirham work, Project
Khokha, sandbox programmes, exchange modernisation, or trade digitisation are welcome when they
sharpen the response, but they should not be used as substitutes for explicit control design.

The solution must fit into a broader enterprise stack. That means integration to identity services,
ledger or books-and-record systems, sanctions and AML tooling, reporting environments, service-
management processes, observability layers, and operational runbooks. The buyer is not looking for
an isolated digital-asset island. It wants a platform that can sit inside institutional plumbing
without creating hidden operational debt or unowned responsibilities.

### 1.2 Procurement Objectives

The first objective is to identify a platform and supplier capable of supporting Project Khokha-
aligned CBDC and tokenized settlement support in live operation, not just in a demonstration
setting. The buyer wants confidence that the selected solution can sustain growth in users, volumes,
products, and audit scrutiny without fundamental rework.

The second objective is to understand the operating model implied by each response. South African
Reserve Bank needs to know which activities are automated, which are configurable, which require
manual oversight, and which depend on external partners, regulated intermediaries, or internal
teams. A response that treats those matters as afterthoughts will score poorly because the
implementation burden is part of the procurement decision.

The third objective is commercial and governance clarity. The buyer requires transparent pricing,
defined assumptions, realistic delivery sequencing, and early visibility into contractual
deviations, liability positions, data handling boundaries, and supplier concentration risks.

### 1.3 Assumptions/Exclusions

The buyer assumes it will remain accountable for business policy, product approval, regulatory
engagement, and ultimate control ownership. The selected bidder is expected to supply product
capability, documentation, implementation support, and operational guidance, but not to stand in as
the regulated decision-maker.

This RFP excludes open-ended bespoke development unless expressly identified and priced. If the
bidder believes a critical feature cannot be delivered through current capability or controlled
configuration, that fact must be disclosed directly together with cost, time, and risk consequences.

The buyer also excludes unsupported claims based on future roadmap intent. Roadmap items may be
noted but must be clearly separated from production-ready capability. Hidden dependence on roadmap
features will be treated as a material weakness.

## 2. Scope of Work

### 2.1 Scope Summary

South African Reserve Bank is treating Project Khokha-aligned CBDC and tokenized settlement support
as a business-critical capability that must be implemented with the same discipline applied to core
regulated systems. The solution under consideration will be expected to operate inside a control
environment shaped by business ownership, architecture standards, security review, legal
interpretation, compliance sign-off, and internal audit expectations. This is not a speculative
innovation exercise. It is a procurement intended to test whether the market can supply a dependable
platform and implementation model for the target operating state.

The buyer's review team will therefore look beyond product feature lists. It will test whether
bidders can explain how the platform behaves when confronted with real-world operational pressure:
incomplete onboarding data, limit breaches, approvals delayed by governance, partner outages,
regulatory evidence requests, bulk corrections, data retention obligations, and phased rollout
constraints. Responses should be written for that audience. The strongest submissions will show
operational self-awareness rather than abstract confidence.

Regional conditions in South Africa also matter. The buyer expects bidders to anchor their response
in actual market infrastructure and supervisory realities, including the pace of domestic policy
development, the role of regulated intermediaries, and the practical limits of cross-border
interoperability. References to initiatives such as Project Aber, Digital Dirham work, Project
Khokha, sandbox programmes, exchange modernisation, or trade digitisation are welcome when they
sharpen the response, but they should not be used as substitutes for explicit control design. Scope
covers design mobilisation, product setup, integration, testing, controls, training, and operational
readiness.

The solution must fit into a broader enterprise stack. That means integration to identity services,
ledger or books-and-record systems, sanctions and AML tooling, reporting environments, service-
management processes, observability layers, and operational runbooks. The buyer is not looking for
an isolated digital-asset island. It wants a platform that can sit inside institutional plumbing
without creating hidden operational debt or unowned responsibilities.

### 2.2 Workstreams

| Workstream | Title | Required coverage |
| --- | --- | --- |
| WS-01 | Mobilisation and governance | Programme setup, steering, design authority, RAID management, decision logs, and acceptance governance. |
| WS-02 | Business and product configuration | Configure lifecycle, roles, limits, disclosures, and policy rules for Project Khokha-aligned CBDC and tokenized settlement support. |
| WS-03 | Integration and controls | Connect enterprise systems, identity, compliance, reporting, settlement dependencies, and observability. |
| WS-04 | Testing and readiness | Functional, non-functional, security, resilience, UAT, cutover, training, and go-live support. |
| WS-05 | Operational transition | Runbooks, service desk model, support handoff, KPI definition, and post-launch governance. |

For each workstream, bidders shall describe deliverables, responsibilities, milestone gates,
dependencies, and acceptance criteria. Generic methodology statements are insufficient. The buyer
wants to understand how the work actually lands inside South African Reserve Bank's organisation.

Where specialist partners are involved, bidders must map them to specific workstreams and identify
the party accountable for integration risk, production support, and issue resolution.

### 2.3 Technical Requirements with Table

| Req ID | Requirement | Priority | Response type |
| --- | --- | --- | --- |
| REQ-01 | Architecture must support segregated dev, test, UAT, DR, and production environments. | Mandatory | Narrative + evidence reference |
| REQ-02 | Provide API-first interfaces, eventing, and version governance suitable for enterprise integration. | Mandatory | Narrative + evidence reference |
| REQ-03 | Support RBAC, segregation of duties, maker-checker controls, and complete audit logs. | Mandatory | Narrative + evidence reference |
| REQ-04 | Support configurable lifecycle states, policy controls, limits, exceptions, and reconciliations. | Mandatory | Narrative + evidence reference |
| REQ-05 | Disclose all third-party dependencies and operational responsibilities. | Mandatory | Narrative + evidence reference |
| REQ-06 | Evidence resilience, recovery, backup, monitoring, and incident-management capability. | Mandatory | Narrative + evidence reference |
| REQ-07 | Provide delivery method, client effort assumptions, and phased implementation plan. | Mandatory | Narrative + evidence reference |
| REQ-08 | Support evidence extraction for audit, supervisory review, and board reporting. | Mandatory | Narrative + evidence reference |
| REQ-18 | Support platform-wide configuration governance, observability, and phased environment promotion. | High | Narrative + evidence reference |
| REQ-19 | Support participant supervision, policy analytics, or sandbox/CBDC control requirements as relevant. | High | Narrative + evidence reference |

Every requirement shall be answered directly, with explicit status and evidence reference. Where a
requirement is partially met, the bidder must describe the gap and any compensating control. The
buyer reserves the right to test selected claims in clarification meetings or demonstrations.

The platform should be described as it exists today. If a requirement is met only under a particular
hosting model, jurisdiction, partner arrangement, or volume profile, that condition must be stated.

### 2.4 High-Priority Spotlight

Three issues will dominate this procurement. First is control integrity around Project Khokha-
aligned CBDC and tokenized settlement support; the buyer must be able to identify who initiated a
change or transaction, which policy checks applied, who approved the event, and how the resulting
state can be reconstructed later. Second is coexistence with existing enterprise systems; the
selected solution cannot become a reconciliation sinkhole that generates more manual work than it
removes. Third is phased scalability; the buyer wants to move from initial launch to broader
adoption without a platform reset.

Bidders should use this spotlight section to explain why their architecture, delivery model, and
evidence posture are suitable for a regulated institution in South Africa. The strongest responses
will be specific about operational pain points, implementation realities, and how the proposed
design contains risk rather than moving it elsewhere.

## 3. Regulatory & Compliance Requirements

### 3.1 Applicable Context

Respondents must address the legal and supervisory context relevant to South Africa, including FSCA
conduct expectations, SARB oversight, Financial Markets Act requirements, POPIA and cyber controls,
FIC Act AML/CFT, operational resilience expectations. Applicability may differ by legal entity,
product perimeter, client segment, and whether the target structure is treated as a payment,
security, custody arrangement, deposit analogue, investment product, or supervised market activity.
The bidder must therefore state its assumptions clearly rather than implying universal
applicability.

Where Islamic finance is relevant, responses must address governance and evidence implications,
including board approval lineage, product rule controls, documentation treatment, and AAOIFI
references where applicable. Where multiple jurisdictions may touch the programme, bidders must
explain how conflicting or overlapping requirements would be surfaced and managed in the operating
model.

### 3.2 Requirement Set

| ID | Area | Buyer expectation |
| --- | --- | --- |
| RC-01 | Regulatory mapping | Map platform controls to jurisdictional requirements and identify assumptions or buyer-side interpretation needs. |
| RC-02 | AML/CFT and sanctions | Describe screening, transaction monitoring integration, alerts, and case-management evidence. |
| RC-03 | Data governance | Describe residency, retention, deletion, encryption, export, and access logging. |
| RC-04 | Operational resilience | Describe recovery objectives, DR testing, incident management, and third-party risk oversight. |
| RC-05 | Outsourcing and subcontractors | Disclose cloud, managed-service, or partner arrangements and related governance. |
| RC-06 | Assurance and audit | Describe available logs, reports, attestations, and audit-support artifacts. |

The buyer is not requesting legal advice from bidders. It is requesting operational honesty about
what the platform can evidence, how it supports control execution, and where the regulated entity
retains judgement or policy responsibility.

Bidders should assume they may be asked to walk Risk, Compliance, Information Security,
Architecture, Internal Audit, and Procurement teams through this material in depth.

### 3.3 Evidence Expectations

At proposal stage, bidders shall provide control summaries, architecture references, example logs or
screenshots where possible, assurance artefacts, and explanations of how evidence can be produced
for audit and supervisory review. The buyer is more interested in traceability than in glossy
certification lists.

Shortlisted bidders may be required to provide deeper evidence, including sample entitlement models,
incident reports, backup and recovery evidence, reconciliation outputs, exception registers,
penetration-test summaries, non-functional test results, and role-specific workflow screenshots. A
supplier that cannot produce such evidence in a disciplined way is unlikely to be suitable for this
procurement.

## 4. Commercial Requirements

### 4.1 Response Principles

Commercial responses must be complete enough to support total-cost-of-ownership analysis across
implementation, recurring charges, volume drivers, support levels, environments, and partner pass-
through costs. Each line item should explain what is included and what is excluded.

If pricing depends on number of users, transaction volumes, assets, wallets, nodes, accounts, legal
entities, environments, support windows, or third-party relationships, those dependencies must be
listed explicitly. Hidden scaling assumptions will be treated as a commercial risk.

### 4.2 Contractual Baseline

The buyer expects the final contract to cover scope, service descriptions, milestones, acceptance
criteria, information security, confidentiality, audit rights, subcontracting controls, service
levels, incident escalation, data handling, exit support, change control, and dispute governance.
Major deviations should be identified in the proposal, not surfaced only during negotiation.

Where managed service is proposed, bidders must describe operational boundaries, customer
obligations, and any limitations on audit access, forensic support, data export, or service
continuity.

### 4.3 Financial Stability

Bidders shall provide information on corporate structure, contracting entity, years in operation,
relevant revenue profile, funding posture, insurance, and material litigation or dependency risk
that could affect delivery. The buyer is making a multi-year decision and therefore needs confidence
that the supplier can remain credible through implementation and scaled operations.

Any concentration risk tied to key partners, cloud providers, custodians, exchanges, or strategic
subcontractors must be disclosed. If the bidder is a growth-stage company, it should provide a
direct statement of runway, strategic focus, and contingency planning.

## 5. Evaluation Criteria

### 5.1 Model

Evaluation will be performed by a multidisciplinary panel covering business ownership, architecture,
engineering, security, compliance, operations, procurement, finance, and where relevant Sharia or
market-infrastructure stakeholders. The process will move through completeness review, qualitative
scoring, and shortlist validation.

The buyer may request demonstrations, clarifications, reference calls, or evidence walkthroughs.
Those activities are intended to validate current capability and delivery realism, not to invite
fresh scope invention.

### 5.2 Scoring

| Criterion | Weight | Assessment focus |
| --- | --- | --- |
| Functional fit | 25% | Coverage of required business lifecycle, roles, and operational controls. |
| Technical and integration fit | 20% | API quality, eventing, interoperability, deployment pattern, and enterprise fit. |
| Regulatory, security, resilience | 20% | Control maturity, evidence quality, auditability, and jurisdictional awareness. |
| Delivery credibility | 15% | Method, staffing, dependencies, timeline realism, and readiness approach. |
| Commercial quality | 10% | Transparency, TCO clarity, contractual fit, and scaling economics. |
| Supplier strength | 10% | Financial stability, references, support maturity, and partnership reliability. |

The buyer may apply gating thresholds to mandatory criteria. A response with attractive
functionality but weak security, poor evidence discipline, or unrealistic delivery assumptions may
fail to progress. Conversely, a response that is explicit about limitations and presents credible
mitigation may be scored more strongly than an over-optimistic proposal.

### 5.3 Award Path

This RFP may result in a single award, phased award, reserve shortlist, or no award. The buyer
reserves the right to seek best-and-final offers, clarify scope, or conduct limited validation
exercises before contract signature.

The preferred bidder will likely be the one that combines operational realism, control transparency,
and practical deliverability rather than the one that promises the broadest abstract feature set.

## 6. Submission Instructions

### 6.1 Admin

Submit one searchable PDF proposal, one editable response matrix, one pricing schedule, one
dependency register, and one implementation plan. Late submissions may be rejected.

Identify one commercial contact and one technical/delivery contact authorised to answer
clarification questions. If consortium partners or subcontractors are involved, list each party and
its role.

### 6.2 Formatting

Use the section numbering in this RFP. Reference requirement IDs directly. Clearly label
confidential sections. Architecture diagrams should be legible and attached in a format suitable for
detailed review.

Generic brochures and marketing decks will not be treated as substitutes for direct answers. Claims
about compliance, security, or live capability should point to evidence references or appendices.

### 6.3 Clarifications

Clarification questions must be submitted in writing during the clarification window. The buyer may
share consolidated answers with all bidders where fairness requires.

Oral statements do not amend the RFP unless confirmed in writing by the buyer. Failure to answer
clarification requests precisely and on time may reduce score.

## 7. Appendices

### 7.1 Inventory

| Appendix | Description |
| --- | --- |
| Appendix A | Response matrix |
| Appendix B | Commercial schedule |
| Appendix C | Implementation plan |
| Appendix D | Dependency register |
| Appendix E | Security and resilience pack |
| Appendix F | Reference deployment summaries |

### 7.2 Declarations

The bidder shall declare conflicts of interest, regulatory constraints, sanctions exposure,
unresolved litigation affecting delivery capability, and any material security incidents from the
previous thirty-six months that may affect buyer confidence.

The bidder shall also declare where proposed capabilities rely on beta services, limited-
availability components, or non-final partner arrangements.

### 7.3 Templates

The buyer may provide structured templates for response matrices, implementation milestones, risk
logs, and pricing schedules. Where templates are not supplied, bidders must mirror the identifiers
and structure used in this RFP so responses remain comparable.

## 8. Additional Appendices

### 8.1 Detailed operating model appendix

Provide detailed role ownership across first-line operations, product administration, compliance,
treasury, customer servicing, technology support, and management oversight for the Project Khokha-
aligned CBDC and tokenized settlement support programme.

The buyer expects this appendix to make the delivery reality explicit. It should distinguish
automated capability from manual process, identify accountable roles, and describe what evidence
remains available after the fact.

For South African Reserve Bank, this appendix should be written in a way that supports architecture
review, control review, and implementation planning simultaneously. That means naming interfaces,
documents, checkpoints, and dependencies rather than using generic programme language.

### 8.2 Security and resilience appendix

Describe encryption, secrets handling, key management dependencies, vulnerability management,
recovery testing, backup integrity, incident escalation, and forensic support.

The buyer expects this appendix to make the delivery reality explicit. It should distinguish
automated capability from manual process, identify accountable roles, and describe what evidence
remains available after the fact.

For South African Reserve Bank, this appendix should be written in a way that supports architecture
review, control review, and implementation planning simultaneously. That means naming interfaces,
documents, checkpoints, and dependencies rather than using generic programme language.

### 8.3 Data and integration appendix

Describe data model boundaries, reference data management, event flows, reconciliation points, APIs,
webhooks, batch interfaces, and coexistence with legacy systems.

The buyer expects this appendix to make the delivery reality explicit. It should distinguish
automated capability from manual process, identify accountable roles, and describe what evidence
remains available after the fact.

For South African Reserve Bank, this appendix should be written in a way that supports architecture
review, control review, and implementation planning simultaneously. That means naming interfaces,
documents, checkpoints, and dependencies rather than using generic programme language.

### 8.4 Migration and cutover appendix

Describe migration approach, back-book treatment, parallel run requirements, defect triage, rollback
conditions, and go-live governance.

The buyer expects this appendix to make the delivery reality explicit. It should distinguish
automated capability from manual process, identify accountable roles, and describe what evidence
remains available after the fact.

For South African Reserve Bank, this appendix should be written in a way that supports architecture
review, control review, and implementation planning simultaneously. That means naming interfaces,
documents, checkpoints, and dependencies rather than using generic programme language.

### 8.5 Staffing and plan appendix

Describe staffing assumptions, specialist roles, milestone plan, acceptance gates, critical
dependencies, and buyer-side effort expectations.

The buyer expects this appendix to make the delivery reality explicit. It should distinguish
automated capability from manual process, identify accountable roles, and describe what evidence
remains available after the fact.

For South African Reserve Bank, this appendix should be written in a way that supports architecture
review, control review, and implementation planning simultaneously. That means naming interfaces,
documents, checkpoints, and dependencies rather than using generic programme language.


### 8.6 Operational governance detail

For South African Reserve Bank, operational governance for Project Khokha-Aligned Cbdc And Tokenized
Settlement Support must define named control owners across product management, first-line
operations, compliance oversight, treasury or finance, information security, platform
administration, and executive escalation. The buyer expects the bidder to describe how each role
interacts with the platform, which actions require approvals, how temporary overrides are governed,
and how post-event review is performed. A credible response should explain not only the happy path
but also the boundary conditions: rejected transactions, stale approvals, mismatched data, delayed
settlement, and corrected records.

The bidder should describe daily, weekly, and monthly governance routines. These may include
exception review, entitlement recertification, reconciliation sign-off, threshold monitoring,
incident review, and management reporting. South African Reserve Bank is especially interested in
whether those routines can be supported through native reporting and workflow evidence or whether
they rely on external manual tracking. If offline controls are required, they should be called out
explicitly so the buyer can judge staffing impact.

Where the operating model contemplates multiple legal entities, booking centres, product desks, or
participant types, the bidder must explain how those dimensions are represented in data models,
permissions, workflow states, and reporting outputs. The buyer does not want hidden complexity to
emerge only after mobilisation.

### 8.7 Data, integration, and reconciliation detail

A strong response should explain how data relating to Project Khokha-Aligned Cbdc And Tokenized
Settlement Support moves between channels, orchestration layers, policy engines, ledgers, books-and-
records, reporting stacks, and external participants. South African Reserve Bank expects the bidder
to identify authoritative data sources, event sequencing assumptions, idempotency treatment,
reference data ownership, and how replay or recovery is handled after processing interruptions.

Reconciliation requires particular attention. The buyer expects a clear explanation of how platform
records are matched to internal books, external statements, settlement confirmations, payment
messages, custody evidence, or trade documents as relevant to the use case. Reconciliation breaks,
timing mismatches, and data corrections should be visible through operational tooling with clear
ownership and escalation. If the bidder assumes that reconciliation is an external process, it
should still describe the extracts, identifiers, and audit fields available to support that process.

Integration narratives should also address release management. South African Reserve Bank wants to
know how API changes are versioned, how consumers are notified, whether backward compatibility is
maintained, and how test environments reflect production behaviour. Responses that ignore lifecycle
management of interfaces create avoidable delivery risk.

### 8.8 Security, resilience, and assurance detail

Given the sensitivity of Project Khokha-Aligned Cbdc And Tokenized Settlement Support, the buyer
expects layered security controls rather than a single assertion of secure design. Bidders should
describe identity architecture, privileged access control, secret handling, encryption treatment,
network segmentation, logging, tamper evidence, and how operational staff interact with support or
administrative functions. Where the bidder relies on cloud-native controls, managed services, or
external infrastructure, shared-responsibility boundaries must be described in plain terms.

Resilience discussion should go beyond backup existence. South African Reserve Bank wants evidence
of recovery objectives, tested restoration procedures, incident classification, communications
protocols, dependency-failure handling, and degraded-mode assumptions. For regulated programmes, the
question is not whether outages happen; it is whether the platform and supplier behave predictably
when they do. Bidders should therefore explain how they support event replay, queue draining,
restart discipline, and post-incident evidence gathering.

Assurance support matters just as much as design. The buyer expects the selected supplier to provide
logs, reports, configuration evidence, penetration-test summaries, vulnerability-management context,
and other artifacts that help internal audit, regulators, and external assessors understand the
control environment. A platform that cannot surface its own evidence efficiently will struggle in a
regulated institution.

### 8.9 Implementation and change detail

Implementation planning should explain how discovery, design, backlog shaping, environment setup,
configuration, interface build, testing, training, and cutover fit together. South African Reserve
Bank does not expect a rigid waterfall plan, but it does expect formal acceptance criteria, issue
governance, milestone ownership, and explicit dependency management. If the bidder proposes agile
delivery, the governance model still needs to explain when decisions are frozen and what constitutes
readiness to progress.

Change management also matters after launch. The buyer expects vendors to describe how new product
attributes, participant types, rule changes, or regulatory updates are introduced without
destabilising live operations. This includes release notes, migration scripts or data fixes,
regression testing, approval boards, and rollback disciplines. The more central the platform becomes
to Project Khokha-Aligned Cbdc And Tokenized Settlement Support, the more disciplined post-go-live
change control must be.

Training and knowledge transfer are part of scope. Bidders should state what documentation,
workshops, admin training, operator runbooks, and handover artifacts are provided so that South
African Reserve Bank can build internal capability rather than remain dependent on a small external
delivery team.

### 8.10 Commercial and supplier transparency detail

Commercial transparency extends beyond headline licence fees. The buyer expects bidders to describe
what happens as environments, throughput, legal entities, user populations, support windows, and
third-party services grow. South African Reserve Bank wants to know whether cost scales linearly,
steps at thresholds, or depends on discretionary supplier interpretation. A credible bid gives
procurement and finance enough information to model multiple operating scenarios.

Supplier transparency also includes product strategy, concentration risk, and partner dependency. If
core aspects of Project Khokha-Aligned Cbdc And Tokenized Settlement Support depend on a single
custody, exchange, payments, cloud, or identity partner, that should be disclosed along with
substitution options and contingency plans. Buyers do not object to partnerships; they object to
discovering late that the real operating model lives outside the contract they signed.

Finally, the bidder should explain what ongoing service engagement looks like after implementation.
That includes support channels, escalation paths, named service-management contacts, incident
severity treatment, maintenance windows, upgrade coordination, roadmap communication, and
expectations around customer participation in governance forums.


Detailed bidder responses should further explain governance of reference data, document versions,
exception queues, notification management, and evidence retention. In institutional settings these
supporting mechanics often determine whether a programme remains controllable once volumes increase.
The buyer wants to understand how the platform prevents silent drift between configured rules and
day-to-day operations.

The selected supplier will also be expected to support pre-production assurance activities in a
disciplined way. That includes readiness checkpoints, defect triage, evidence packs for internal
approvals, and structured support during architecture, security, and risk forums. Responses should
indicate whether these are standard delivery components or rely on ad hoc effort. This matters
because last-minute approval surprises are a major source of programme delay.

Where the use case involves participant onboarding or investor, client, or merchant populations, the
buyer expects clarity on onboarding workflow, eligibility checks, status changes, offboarding, and
data correction. The platform should support traceable state transitions and reporting views that
operations and compliance teams can actually use. A technically elegant model that produces poor
operational visibility is not enough.

The buyer is equally interested in how the supplier handles documentation quality. Implementation
guides, admin manuals, operator runbooks, interface specifications, and release notes should be
treated as formal project deliverables rather than side material. Bidders should describe update
discipline, ownership, and how documentation stays aligned with live configuration over time.

Finally, bidders should explain how success would be measured after go-live. Typical measures may
include transaction accuracy, control breach rates, reconciliation timeliness, support response
metrics, user adoption, incident trends, and audit issue closure. The buyer is not looking for
vanity metrics; it is looking for the operating indicators that tell management whether the
programme is under control.


### 8.11 Company-specific strategic context

South African Reserve Bank (South Africa) is not approaching **project khokha-aligned cbdc and tokenized settlement support** as a generic blockchain exercise. SARB has led Project Khokha, Project Khokha 2, and work on wholesale settlement, tokenized securities, and digital money experimentation. That creates a very specific procurement context: SARB would evaluate a platform on its ability to support wholesale-grade resilience, legal-finality analysis, participant segregation, and evidence for central-bank oversight. The implication for bidders is simple: responses must explain how a controlled production programme would be governed from initial launch through scale, how policy and entitlement decisions are evidenced, and how the platform avoids creating a parallel operating stack that business, risk, and audit teams cannot actually supervise.

The buyer expects the proposed solution to align with the institution's current operating reality. Likely dependencies include participating commercial banks, market infrastructures, wholesale payment systems, prudential/surveillance reporting, and cyber-resilience operations. A strong response will therefore identify authoritative systems of record, describe event sequencing between the platform and adjacent enterprise systems, and explain how breaks are detected before they become unresolved ledger differences or customer-impacting incidents.

Executive sponsorship is also expected to be multidisciplinary. Payments, fintech innovation, national payment system oversight, cyber, and research leadership are the likely executive anchors. This matters because the selected supplier will not be evaluated by innovation staff alone. It will be tested by people who care about booking-model integrity, operational resilience, information security, regulatory defensibility, and board-quality reporting.

Finally, the buyer wants commercial and sourcing realism. Project Khokha itself is the strongest public procurement and experimentation signal in the South African market. Bidders should assume that any hidden dependency, vague implementation assumption, or roadmap-led answer will be surfaced quickly during architecture review and clarification sessions.

### 8.12 Company-specific use-case and technical depth

For South African Reserve Bank (South Africa), the most relevant workload pattern is **wholesale CBDC/pilot settlement, tokenized securities settlement, participant controls, and central-bank reporting**. Bidders should therefore address at least five operating layers in detail. First, origination and onboarding: how clients, issuers, investors, counterparties, merchants, or participating institutions are onboarded; how eligibility rules are applied; how documentation is stored and versioned; and how approvals are routed when records are incomplete or contradictory. Second, lifecycle execution: how assets, payment obligations, investor entitlements, receivables, or tokenized instruments are created; which fields are configurable; which actions require human approval; and how rules differ by entity, corridor, investor class, or instrument type.

Third, settlement and post-event servicing. The buyer wants to know how the platform handles cut-off times, failed settlement, partial settlement, reversals, corrections, coupon or profit-distribution events, maturity processing, collections, or funding-limit updates as applicable to the use case. A credible response will explain how downstream systems are updated, which identifiers remain stable across systems, and how the buyer can reconstruct the full lifecycle of a record from onboarding through closure.

Fourth, control evidence. The platform must support tamper-evident audit logs, entitlement history, maker-checker enforcement, exception queues, reconciliations, and exportable evidence packs for line-one operations, compliance, risk, internal audit, and if required external supervisors. Fifth, scale and change management. Bidders should explain how new jurisdictions, products, participant classes, currencies, networks, or operating entities are introduced without breaking control assumptions already approved by the buyer.

The buyer also expects bidders to describe concrete integration patterns rather than generic statements about API availability. At minimum, responses should identify synchronous APIs, asynchronous event streams, batch interfaces, document ingestion patterns, reporting extracts, reference-data ownership, and failure-handling approaches. Where partner-operated services are needed for custody, identity, exchange connectivity, sanctions screening, market data, payment messaging, or node infrastructure, the bidder must explain who owns the incident, who owns the SLA, and how evidence is preserved when a third party fails.

### 8.13 Jurisdiction-specific regulatory and governance detail

The regulatory perimeter for South African Reserve Bank (South Africa) is shaped by South African Reserve Bank (SARB), Financial Sector Conduct Authority (FSCA), Prudential Authority, Financial Intelligence Centre Act (FIC Act), Financial Markets Act, POPIA, Joint Standard on Cybersecurity and Cyber Resilience. Bidders must not treat that list as a box-ticking reference. They need to translate the perimeter into platform behaviour: data-location choices, audit-log retention periods, approval routing, customer classification, reporting outputs, outsourcing controls, incident escalation, access recertification, and evidentiary support during supervisory review.

Where the requested use case intersects capital-markets activity, payments, custody, digital-asset exchange operations, or tokenized deposit analogues, respondents should explain the assumed legal characterisation and the resulting control posture. If a proposed architecture depends on a regulated partner, foreign booking model, special-purpose issuer, bankruptcy-remote vehicle, or external wallet/custodian, that structure must be declared explicitly together with the residual obligations that remain with South African Reserve Bank (South Africa). If Sharia governance is relevant, the bidder should explain how product rules, approval lineage, prohibited activity restrictions, and board or committee evidence are captured and reported.

Data governance deserves special treatment. The buyer expects explicit statements on residency, encryption, privileged-access management, break-glass procedures, backup integrity, retention and deletion controls, and the handling of sensitive customer or transaction data in lower environments. Platform logging should make it possible to answer not only what happened, but who approved it, which rule set applied at that time, and what changed when a record was later corrected. If that evidence depends on external SIEM, data lake, or workflow tools, the dependency should be named.

Operational resilience is equally important. Responses should specify recovery-time and recovery-point targets, restoration testing frequency, dependency mapping, degraded-mode behaviour, and the operational plan for third-party outages, network partition, failed screening calls, stuck workflows, delayed settlement confirmations, or inconsistent state across ledgers. The strongest responses will show how South African Reserve Bank (South Africa) could take the platform through architecture review, information-security review, business-continuity review, and internal-audit walkthrough without rewriting the story for each audience.

### 8.14 Company-specific evaluation overlay

In addition to the standard scoring model already defined in this document, South African Reserve Bank (South Africa) expects evaluators to apply the following company-specific weighting overlay when distinguishing between suppliers:

| Criterion | Weight | Why it matters in this procurement |
| --- | --- | --- |
| Policy and market-infrastructure fit | 22% | Scored against project khokha-aligned cbdc and tokenized settlement support in the specific context of South African Reserve Bank (South Africa). |
| Technical architecture and interoperability | 18% | Scored against project khokha-aligned cbdc and tokenized settlement support in the specific context of South African Reserve Bank (South Africa). |
| Regulatory evidence and supervisory control support | 22% | Scored against project khokha-aligned cbdc and tokenized settlement support in the specific context of South African Reserve Bank (South Africa). |
| Security, resilience, and data-governance posture | 15% | Scored against project khokha-aligned cbdc and tokenized settlement support in the specific context of South African Reserve Bank (South Africa). |
| Delivery and implementation realism | 10% | Scored against project khokha-aligned cbdc and tokenized settlement support in the specific context of South African Reserve Bank (South Africa). |
| Commercial transparency | 6% | Scored against project khokha-aligned cbdc and tokenized settlement support in the specific context of South African Reserve Bank (South Africa). |
| Supplier capability and ecosystem alignment | 7% | Scored against project khokha-aligned cbdc and tokenized settlement support in the specific context of South African Reserve Bank (South Africa). |


These weightings are intentionally practical. A bidder can only score strongly if it shows how the solution will work inside the target institution's real control environment, with named integration boundaries, clear ownership, and current-state capability rather than roadmap theatre.

### 8.15 Procurement signals, deployment assumptions, and realism checks

Bidders should assume that clarifications and shortlisted workshops will focus on matters that typically derail programmes late in the cycle: undocumented partner dependency, over-optimistic migration assumptions, weak entitlement design, incomplete reconciliation logic, ambiguous responsibility for key management, vague data-residency answers, and unsupported claims about regulator acceptance. The buyer is explicitly trying to identify those weaknesses before contract award.

A realistic proposal for South African Reserve Bank (South Africa) should therefore provide a phased deployment hypothesis. Phase one should describe the minimum safe production scope, the volumes and participant types supported at launch, required client-side roles, major control gates, and objective acceptance criteria. Phase two should describe how the scope expands once controls, throughput, and reporting have been proven. If the bidder believes the requested use case should be sequenced differently, that is acceptable, but the answer must still show a credible route from contained launch to scaled operations.

The buyer also expects honest disclosure of implementation effort. Responses should call out where data remediation is likely, where legal documentation or policy decisions are prerequisites, where non-functional testing may take longer than feature configuration, and where operations teams will need new runbooks or specialist skills. The aim of this section is not to lengthen the proposal for its own sake. It is to make sure the selected platform can be implemented without nasty surprises once the project leaves the innovation deck and enters production governance.


### 8.16 Integration blueprint and target operating model detail

For South African Reserve Bank (South Africa), bidders should assume that the selected platform will sit inside a layered target operating model rather than replace every surrounding system. The buyer expects a clear description of front-door channels, orchestration services, policy engines, digital-asset or token lifecycle components, settlement connectors, books-and-record interfaces, data and reporting layers, observability tooling, and support workflows. Each layer should have named responsibilities and clearly defined failure domains. If the proposed platform bundles multiple layers, the bidder must still show how those responsibilities are separated for operational control and change approval.

The integration blueprint should identify authoritative records for customer and participant identity, instrument or obligation master data, balances and positions, cash or token movement, pricing or reference data, approvals, and regulatory evidence. The buyer specifically wants to avoid a situation where the platform becomes authoritative for some fields in production but cannot prove that status to downstream control teams. Responses should therefore explain master-data synchronisation, event ordering, clock and timestamp treatment, duplicate-event handling, replay support, and the management of late-arriving messages.

Bidders should also explain the interaction between online and batch processes. In many institutions, the most acute production risk does not arise in the real-time path but in overnight reconciliations, settlement file preparation, exception reprocessing, report generation, and end-of-day close. A convincing response for project khokha-aligned cbdc and tokenized settlement support will therefore describe how the platform handles cut-off windows, resubmissions, backdated corrections, cancelled instructions, and manual operational interventions without corrupting the audit trail. If out-of-band corrections are ever required, the platform should be able to record who performed them, why they were needed, which approvals were obtained, and how the before-and-after state can be reconstructed.

The buyer expects detailed treatment of security administration as part of the operating model. User provisioning should distinguish between business initiators, approvers, supervisors, administrators, support engineers, auditors, and read-only oversight roles. Privileged access should be controlled through approval workflow, strong authentication, session logging where appropriate, and time-bounded elevation. Break-glass access must be exceptional, observable, and retrospectively reviewable. Where the platform integrates with enterprise identity providers, the bidder should explain how group membership, role mapping, emergency revocation, and periodic recertification are handled.

Service management matters just as much as technical design. Responses should describe how incidents are detected, triaged, escalated, resolved, and closed across both the buyer and the supplier. The buyer wants to know who owns first-line diagnosis, what telemetry is available to client support teams, which alerts indicate customer-impacting degradation, and how supplier teams participate in root-cause analysis. If the proposed service model depends on the supplier operating core production components, the bidder must explain handoffs, on-call coverage, maintenance windows, forensic support, and evidence sharing in the event of an incident or audit request.

### 8.17 Data migration, testing, controls assurance, and rollout detail

A realistic deployment for South African Reserve Bank (South Africa) must include a disciplined treatment of migration and controlled rollout. Bidders should state whether the proposed launch assumes greenfield onboarding only, partial migration of legacy records, back-book synchronisation, or coexistence between legacy and tokenized workflows. Where migration is required, the response should identify the source systems, expected data-quality issues, transformation rules, reconciliation checkpoints, and sign-off criteria before production use. The buyer is specifically looking for honesty on data-preparation effort because migration defects often surface only when operational teams begin processing real transactions.

Testing should be described as a full assurance programme, not merely a functional sprint activity. The buyer expects unit and integration testing, non-functional performance testing, resiliency and failover testing, security testing, role/entitlement validation, operational workflow testing, and structured user acceptance. For the requested use case, testing should include negative and boundary scenarios: duplicate submissions, stale approvals, blocked sanctions outcomes, partner timeouts, invalid reference data, settlement failure, partial servicing events, and post-event correction workflows. Bidders should also explain what evidence from testing can be retained to support architecture approval, information-security review, and internal-audit comfort.

Control assurance is an explicit selection criterion for South African Reserve Bank (South Africa). The selected supplier will be expected to support walkthroughs with architecture, security, legal, compliance, operations, risk, and procurement stakeholders. Responses should therefore describe the artefacts available before contract signature and the deeper evidence available during implementation. Useful artefacts include configuration snapshots, role matrices, sample audit logs, example reconciliation outputs, incident-process documentation, environment diagrams, API specifications, backup/restore evidence, and sample operational reports. If these artefacts exist only in vendor-internal formats and cannot be shared with clients, that limitation should be declared clearly.

The rollout plan should distinguish between pilot value and production readiness. A pilot may validate that wholesale CBDC/pilot settlement, tokenized securities settlement, participant controls, and central-bank reporting is technically feasible, but the buyer is making a sourcing decision for a programme that will need governance, support, and repeatability. Bidders should therefore outline the minimum controls needed before first live processing, the metrics that would indicate the platform is ready for broader rollout, and the dependencies that must be closed before additional products, entities, markets, or participant groups are added. Where later phases depend on external partner readiness, regulatory comfort, or contract expansion, that dependency should be made visible in the plan rather than left implicit.

Finally, respondents should explain how the programme remains governable after go-live. The buyer expects structured release management, formal change approval, regression testing, periodic entitlement review, exception governance, and management reporting that tracks the real health of the service rather than vanity metrics. Examples of meaningful indicators include exception ageing, reconciliation break volumes, failed-settlement rates, approval turnaround, security incident trends, backlog of unresolved defects, accuracy of regulatory reporting, and frequency of manual overrides. The suppliers that score best will be the ones that show how project khokha-aligned cbdc and tokenized settlement support becomes an owned institutional capability rather than a clever but fragile technology deployment.


### 8.18 Institution-specific market research and operating implications

Public market context reinforces that South African Reserve Bank (South Africa) should be treated as a specific institutional
buyer, not as a placeholder for the region. It is a central bank responsible for monetary stability, national payment-system oversight, prudential coordination, and experimentation with modern market and settlement infrastructure. SARB's Project Khokha work has already tested wholesale settlement, tokenized debentures, and broader DLT-enabled market infrastructure concepts. That means the bank is evaluating not whether DLT exists, but whether a design can satisfy settlement-finality, prudential, and interoperability requirements in South Africa's real market structure.

Relevant context includes the National Payment System framework, SARB and Prudential Authority oversight, AML/CFT duties, exchange-control implications where cross-border flows arise, and coordination with market infrastructures such as Strate and commercial-bank participants.

For the target use case of **Project Khokha CBDC platform**, that public context changes the procurement lens.
The buyer is likely to test whether the proposed platform can operate under real supervisory,
market-infrastructure, treasury, compliance, and service-management pressure rather than under a
contained innovation-lab assumption. The selected platform must support controlled experiments that can graduate into real settlement environments, with particular attention to privacy, bank-participant governance, throughput, deterministic settlement, and post-event assurance.

The strongest responses will therefore explain how the proposed solution behaves when approvals are
late, reference data changes mid-cycle, partner infrastructure is unavailable, a regulatory or
policy interpretation changes, or an exception must be corrected after downstream processing has
already started. In practice, the buyer is trying to determine whether the platform can become an
owned institutional capability with defensible evidence and repeatable governance, not merely a
successful pilot.

### 8.19 Institution-specific requirements emphasis

Prospective suppliers should explicitly address at least the following institution-specific requirements in their response:

- Support wholesale participant models with commercial-bank nodes or segregated participant domains, plus clear central-bank override and crisis controls.
- Provide robust evidence for settlement finality, queue management, liquidity usage, and exception handling under stress scenarios.
- Enable interoperability testing with existing payment, securities-settlement, and reporting infrastructure without assuming a greenfield market reset.

These requirements are additive to the baseline sections of this document. They are included because
South African Reserve Bank (South Africa) operates with business, regulatory, and operational constraints that differ from a
conventional greenfield fintech. Bidders that acknowledge those constraints directly will be scored
more strongly than bidders that recycle generic tokenization language without adapting it to the
institution's actual mandate, control environment, and regional operating model.
