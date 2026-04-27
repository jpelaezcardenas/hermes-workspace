# Request for Proposal (RFP): Digital Securities Listing Platform

| Field | Value |
| --- | --- |
| Reference number | EURONEXT-RFP-202603 |
| Version | v1.0 |
| Issue date | March 2026 |
| Issuing institution | Euronext |
| Jurisdiction | Netherlands |
| Currency | EUR |
| Governing law / policy basis | Dutch law |
| Procurement type | Buyer-side competitive procurement |
| Clarification deadline | 10 April 2026 17:00 local time |
| Submission deadline | 29 April 2026 17:00 local time |
| Proposal validity | 180 calendar days |
| Primary contact | Procurement Secretariat – Digital Assets Programme |

## 1. Procurement Context

### 1.1 Institutional Context
Euronext is issuing this procurement document in its capacity as a pan-European exchange operator and listing venue group operating within Netherlands. The purpose of this exercise is to assess the market’s ability to provide a controlled, production-grade solution for digital securities listing platform. The buyer is not seeking speculative innovation theatre. It is seeking an auditable platform and delivery approach that can be governed under institutional change control, integrated into existing operating models, and evidenced to internal risk, security, legal, procurement, and oversight stakeholders. Current market and policy developments have increased pressure to support digitally native instruments and tokenized workflows without weakening the disciplines that already govern high-value market infrastructure. The buyer therefore expects vendors to demonstrate not only functional coverage but also the operational maturity needed for critical financial workflows.

The current-state drivers for this procurement include the need to improve processing efficiency, support new digital asset use cases, reduce manual exception handling, create stronger data transparency, and establish a future-ready architecture that can interoperate with incumbent systems. This document should be read as a buyer-side control instrument. Mandatory requirements, evaluation criteria, submission rules, and evidence expectations have been designed to force directly comparable responses. Vendors shall therefore avoid generic marketing language and shall instead provide precise, testable, and institutionally relevant evidence. The drafting style for this document is intentionally venue-oriented. The buyer requires responses that address participant admission, latency-sensitive control points, operational transparency, surveillance integration, and procedures that preserve fair and orderly market operation under stress.

The buyer’s strategic intent is not to replace governance with technology; it is to make governance executable inside the technology stack. Any proposed solution must therefore support robust segregation of duties, transparent operator actions, well-defined failure handling, and integration into established risk and assurance processes. The buyer expects detailed disclosure of solution boundaries, assumptions, and third-party dependencies. Euronext reserves the right to reject any proposal that relies on unclear roadmap commitments, unsupported legal assumptions, or immature operational models. Applicable regulatory reference points include MiFID II / MiFIR, Prospectus Regulation, DORA, GDPR, AMLD, MiCA where applicable. These references are not exhaustive and vendors remain responsible for identifying any other frameworks relevant to the proposed delivery model.

### 1.2 Procurement Objectives and Target Outcomes
The buyer is seeking a bidder or consortium capable of delivering a controlled and supportable capability for **digital securities listing platform**. The procurement objectives below are cumulative. Failure to support a mandatory objective may result in rejection.

| Objective | Description | Priority |
| --- | --- | --- |
| Operational resilience | Deliver a production-grade operating model with tested recovery, failover, and evidence controls. | Mandatory |
| Institutional control | Support segregation of duties, transparent approvals, and auditable operator intervention. | Mandatory |
| Interoperability | Integrate with incumbent systems, reporting estates, and control functions. | High |
| Scalable processing | Support issuer onboarding, listing governance, transparency obligations, participant workflow control, and multi-market operating consistency. | High |
| Regulatory alignment | Provide evidence aligned to MiFID II / MiFIR, Prospectus Regulation, DORA, GDPR, AMLD, MiCA where applicable. | Mandatory |
| Commercial transparency | Present a comparable whole-of-life cost and support model. | High |

In addition to the objectives above, bidders shall explain how their proposed solution reduces operational ambiguity for front-office, middle-office, operations, risk, security, and oversight stakeholders. The buyer wants fewer manual breaks, fewer opaque dependencies, and stronger evidence at every material control point. That means the proposed solution must handle normal flow, non-happy path exceptions, maintenance events, rollback conditions, and controlled emergency actions with the same rigor. The buyer is not interested in a thin orchestration layer that leaves critical controls outside the governed platform boundary. It expects a coherent operating model with clear accountability, measurable performance, and explicit evidence generation.

### 1.3 Key Assumptions and Exclusions
The following assumptions apply unless a bidder expressly flags a deviation in its exceptions register:

- The buyer will retain policy, legal, and regulatory accountability for its own institutional decisions.
- The bidder shall remain accountable for the delivered solution, including any subcontracted components within the proposed scope.
- Integration to existing estates is expected; wholesale replacement of incumbent systems is not assumed unless explicitly proposed as an option.
- The production design must support formal change control, release governance, and evidence retention.
- Any blockchain, ledger, messaging, or database component proposed shall be governed as part of an institutional control environment rather than treated as an experimental domain.

Excluded unless explicitly priced as an option are corporate strategy consulting, broad legal advisory services, unrestricted bespoke development, and market adoption programs beyond the direct delivery scope.

## 2. Scope of Work

### 2.1 Scope Summary
The scope of work covers the design, configuration, delivery, testing, and support arrangements necessary to establish a controlled operating capability for digital securities listing platform. Scope includes business workflow configuration, security architecture, integration design, environment setup, migration support, testing, operational readiness, training, and post-go-live stabilization. Where interfaces to existing market infrastructure, treasury systems, custody platforms, listing workflows, payment rails, risk engines, or supervisory reporting processes are required, bidders shall identify the interface pattern, protocol assumptions, performance dependencies, and control ownership boundaries. The buyer expects a delivery model that is realistic about institutional decision cycles, formal approvals, and evidence needs.

Out of scope unless explicitly proposed as an optional item are broad transformation activities unrelated to the stated use case, legal entity restructuring, unmanaged reliance on experimental public infrastructure, and custom development models that cannot be supported through documented product governance. Bidders must distinguish between standard product capability, configurable implementation components, third-party supplied functions, and bespoke adaptation. Where the proposed solution depends on external components such as custody modules, identity services, HSMs, cloud services, settlement connectors, market data tools, or compliance screening engines, the bidder shall clearly define which party is accountable for procurement, support, incident resolution, and regulatory evidence.

The buyer expects the delivered scope to culminate in an operationally supportable service rather than a demonstration environment. That means tested controls, runbooks, agreed service levels, documented recovery procedures, and a viable long-term maintenance model. The bidder shall explicitly identify all assumptions, exclusions, and buyer-side dependencies. If the bidder proposes phased delivery, each phase shall have a defined scope, measurable outcomes, and entry/exit criteria. No scope assumption may be implied through silence.

| Scope domain | Included | Buyer expectation |
| --- | --- | --- |
| Solution architecture | Yes | Reference architecture, deployment model, resilience design, and environment segregation |
| Workflow configuration | Yes | Production support for digital securities listing platform processes, approvals, exceptions, and reporting |
| Integration delivery | Yes | Interface design, adapters, security patterns, reconciliation, and monitoring |
| Migration and testing | Yes | Structured migration, phased testing, and operational readiness evidence |
| Managed operations | Optional / priced separately | State whether offered and under which responsibilities |
| Unbounded custom development | No | Only controlled and supportable productized or governed configuration-based work |

### 2.2 Workstreams
The bidder shall structure its proposed scope using at least the following workstreams:

1. **Programme mobilization and governance** — establish delivery governance, reporting cadence, dependency management, and risk management.
2. **Business and operating model design** — confirm workflow design, actor roles, exception handling, reporting outputs, and control ownership.
3. **Technical architecture and environment setup** — define deployment pattern, network and security architecture, observability, and integration controls.
4. **Configuration and interface implementation** — configure solution components and deliver interfaces to required buyer systems and external dependencies.
5. **Testing and assurance** — execute structured testing with documented entry/exit criteria and defect governance.
6. **Operational readiness and training** — produce runbooks, support model, access governance, and role-based training.
7. **Migration, cutover, and stabilization** — support production activation, contingency readiness, parallel run where relevant, and hypercare.

### 2.3 Technical Requirements
The requirements below are numbered and prioritized to support comparable evaluation. **P1** items are mandatory or near-mandatory control requirements. **P2** items are materially important. **P3** items are desirable but not ordinarily disqualifying unless they affect a P1 outcome.

| ID | Priority | Requirement | Evidence expected | Vendor response |
| --- | --- | --- | --- | --- |
| TR-001 | P1 | Support participant onboarding and entitlement controls for issuers, members, market makers, and operators. | Detailed narrative, architecture diagram, control description, and client reference evidence | Comply / Partially comply / Does not comply |
| TR-002 | P1 | Provide configurable market models, trading sessions, and venue state controls. | Detailed narrative, architecture diagram, control description, and client reference evidence | Comply / Partially comply / Does not comply |
| TR-003 | P1 | Support market surveillance data feeds, alerting hooks, and evidence retention for market integrity review. | Detailed narrative, architecture diagram, control description, and client reference evidence | Comply / Partially comply / Does not comply |
| TR-004 | P1 | Provide deterministic message handling, order/event sequencing, and time-source governance. | Detailed narrative, architecture diagram, control description, and client reference evidence | Comply / Partially comply / Does not comply |
| TR-005 | P1 | Support throttling, kill-switch, circuit-breaker, and participant risk control features. | Detailed narrative, architecture diagram, control description, and client reference evidence | Comply / Partially comply / Does not comply |
| TR-006 | P2 | Provide listing workflow support including admission checks, disclosure capture, and issuer attestations. | Detailed narrative, architecture diagram, control description, and client reference evidence | Comply / Partially comply / Does not comply |
| TR-007 | P2 | Support reference data management, instrument lifecycle events, and venue publication processes. | Detailed narrative, architecture diagram, control description, and client reference evidence | Comply / Partially comply / Does not comply |
| TR-008 | P2 | Provide resilient market data distribution, replay support, and dissemination controls. | Detailed narrative, architecture diagram, control description, and client reference evidence | Comply / Partially comply / Does not comply |
| TR-009 | P2 | Support operator dashboards for latency, throughput, participant behavior, and venue health. | Detailed narrative, architecture diagram, control description, and client reference evidence | Comply / Partially comply / Does not comply |
| TR-010 | P3 | Provide controls for orderly suspension, halt, and resumption procedures. | Detailed narrative, architecture diagram, control description, and client reference evidence | Comply / Partially comply / Does not comply |
| TR-011 | P3 | Support pre-issuance data capture, approval workflow, and disclosure document management. | Detailed narrative, architecture diagram, control description, and client reference evidence | Comply / Partially comply / Does not comply |
| TR-012 | P3 | Provide instrument reference-data validation and issuance calendar control. | Detailed narrative, architecture diagram, control description, and client reference evidence | Comply / Partially comply / Does not comply |
| TR-013 | P1 | Support issuance allocation, investor/admission workflows, and post-issuance lifecycle tracking. | Detailed narrative, architecture diagram, control description, and client reference evidence | Comply / Partially comply / Does not comply |
| TR-014 | P1 | Provide configurable restrictions by investor category, jurisdiction, and transferability condition. | Detailed narrative, architecture diagram, control description, and client reference evidence | Comply / Partially comply / Does not comply |
| TR-015 | P1 | Support coupon, redemption, and event schedule administration. | Detailed narrative, architecture diagram, control description, and client reference evidence | Comply / Partially comply / Does not comply |
| TR-016 | P1 | Provide issuer, registrar, paying-agent, and operator role segregation. | Detailed narrative, architecture diagram, control description, and client reference evidence | Comply / Partially comply / Does not comply |
| TR-017 | P1 | Support document versioning, evidence retention, and legally material notices. | Detailed narrative, architecture diagram, control description, and client reference evidence | Comply / Partially comply / Does not comply |
| TR-018 | P2 | Provide interfaces for listing, settlement, custody, and market data publication. | Detailed narrative, architecture diagram, control description, and client reference evidence | Comply / Partially comply / Does not comply |
| TR-019 | P2 | Support correction handling, cancellation, and controlled re-issuance processes. | Detailed narrative, architecture diagram, control description, and client reference evidence | Comply / Partially comply / Does not comply |
| TR-020 | P2 | Provide audit-ready issuance reports and exception logs. | Detailed narrative, architecture diagram, control description, and client reference evidence | Comply / Partially comply / Does not comply |
| TR-021 | P2 | Provide logically segregated environments for development, test, pre-production, and production with controlled promotion paths. | Detailed narrative, architecture diagram, control description, and client reference evidence | Comply / Partially comply / Does not comply |
| TR-022 | P3 | Support infrastructure-as-code, configuration baselining, and repeatable environment reconstruction. | Detailed narrative, architecture diagram, control description, and client reference evidence | Comply / Partially comply / Does not comply |
| TR-023 | P3 | Provide immutable audit logs for privileged actions, configuration changes, and critical operational events. | Detailed narrative, architecture diagram, control description, and client reference evidence | Comply / Partially comply / Does not comply |
| TR-024 | P3 | Support high-availability deployment patterns across independent failure domains with no single point of failure. | Detailed narrative, architecture diagram, control description, and client reference evidence | Comply / Partially comply / Does not comply |
| TR-025 | P1 | Expose comprehensive observability across application, infrastructure, message flow, and business process layers. | Detailed narrative, architecture diagram, control description, and client reference evidence | Comply / Partially comply / Does not comply |
| TR-026 | P1 | Support time synchronization, evidence-grade timestamping, and log correlation across distributed components. | Detailed narrative, architecture diagram, control description, and client reference evidence | Comply / Partially comply / Does not comply |
| TR-027 | P1 | Provide backup, restore, and disaster recovery procedures with documented recovery objectives. | Detailed narrative, architecture diagram, control description, and client reference evidence | Comply / Partially comply / Does not comply |
| TR-028 | P1 | Support secure API access using modern authentication and authorization standards. | Detailed narrative, architecture diagram, control description, and client reference evidence | Comply / Partially comply / Does not comply |
| TR-029 | P1 | Enable controlled software release management including rollback procedures and maintenance windows. | Detailed narrative, architecture diagram, control description, and client reference evidence | Comply / Partially comply / Does not comply |
| TR-030 | P2 | Provide formal runbooks for incident response, capacity management, and operational handover. | Detailed narrative, architecture diagram, control description, and client reference evidence | Comply / Partially comply / Does not comply |
| TR-031 | P2 | Support evidence-based performance testing under representative and stress conditions. | Detailed narrative, architecture diagram, control description, and client reference evidence | Comply / Partially comply / Does not comply |
| TR-032 | P2 | Provide operator controls for configuration freeze, emergency access, and controlled degradation modes. | Detailed narrative, architecture diagram, control description, and client reference evidence | Comply / Partially comply / Does not comply |
| TR-033 | P2 | Implement strong identity and access management with role separation, least privilege, and privileged access monitoring. | Detailed narrative, architecture diagram, control description, and client reference evidence | Comply / Partially comply / Does not comply |
| TR-034 | P3 | Provide encryption for data in transit and at rest with documented key-management controls and segregation of duties. | Detailed narrative, architecture diagram, control description, and client reference evidence | Comply / Partially comply / Does not comply |
| TR-035 | P3 | Support security event monitoring and integration into the institution’s SIEM and case-management tooling. | Detailed narrative, architecture diagram, control description, and client reference evidence | Comply / Partially comply / Does not comply |
| TR-036 | P3 | Provide vulnerability management, patch governance, software bill of materials, and dependency disclosure. | Detailed narrative, architecture diagram, control description, and client reference evidence | Comply / Partially comply / Does not comply |
| TR-037 | P1 | Demonstrate secure development lifecycle controls including code review, testing, and change approval gates. | Detailed narrative, architecture diagram, control description, and client reference evidence | Comply / Partially comply / Does not comply |
| TR-038 | P1 | Support data classification, retention, deletion, and evidencing of data-handling controls. | Detailed narrative, architecture diagram, control description, and client reference evidence | Comply / Partially comply / Does not comply |
| TR-039 | P1 | Provide incident notification procedures aligned to applicable regulatory timelines and institutional escalation paths. | Detailed narrative, architecture diagram, control description, and client reference evidence | Comply / Partially comply / Does not comply |
| TR-040 | P1 | Support network segmentation, API protection, certificate lifecycle control, and secrets management. | Detailed narrative, architecture diagram, control description, and client reference evidence | Comply / Partially comply / Does not comply |
| TR-041 | P1 | Provide resilience against denial-of-service, message replay, duplicate processing, and operator error. | Detailed narrative, architecture diagram, control description, and client reference evidence | Comply / Partially comply / Does not comply |
| TR-042 | P2 | Demonstrate third-party risk management for subcontractors, hosting providers, and critical dependencies. | Detailed narrative, architecture diagram, control description, and client reference evidence | Comply / Partially comply / Does not comply |
| TR-043 | P2 | Provide penetration testing evidence and remediation tracking for identified findings. | Detailed narrative, architecture diagram, control description, and client reference evidence | Comply / Partially comply / Does not comply |
| TR-044 | P2 | Support cryptographic agility and controlled key rotation without service disruption. | Detailed narrative, architecture diagram, control description, and client reference evidence | Comply / Partially comply / Does not comply |
| TR-045 | P2 | Provide a delivery plan with milestones, dependencies, resourcing assumptions, and acceptance criteria. | Detailed narrative, architecture diagram, control description, and client reference evidence | Comply / Partially comply / Does not comply |
| TR-046 | P3 | Identify buyer dependencies requiring timely decisions, data, access, or policy input. | Detailed narrative, architecture diagram, control description, and client reference evidence | Comply / Partially comply / Does not comply |
| TR-047 | P3 | Provide a migration approach for interfaces, data, participant onboarding, and operational cutover. | Detailed narrative, architecture diagram, control description, and client reference evidence | Comply / Partially comply / Does not comply |
| TR-048 | P3 | Support structured testing phases including unit, system, integration, performance, security, and operational readiness. | Detailed narrative, architecture diagram, control description, and client reference evidence | Comply / Partially comply / Does not comply |
| TR-049 | P1 | Provide training materials for operations, support, security, and business administrators. | Detailed narrative, architecture diagram, control description, and client reference evidence | Comply / Partially comply / Does not comply |
| TR-050 | P1 | Define service transition deliverables including runbooks, support model, and knowledge transfer evidence. | Detailed narrative, architecture diagram, control description, and client reference evidence | Comply / Partially comply / Does not comply |
| TR-051 | P1 | Provide governance forums, reporting cadence, issue escalation, and decision control points. | Detailed narrative, architecture diagram, control description, and client reference evidence | Comply / Partially comply / Does not comply |
| TR-052 | P1 | State assumptions relating to third-party connectivity, environment readiness, and institutional approvals. | Detailed narrative, architecture diagram, control description, and client reference evidence | Comply / Partially comply / Does not comply |
| TR-053 | P1 | Provide rollback and contingency plans for implementation failures or control exceptions. | Detailed narrative, architecture diagram, control description, and client reference evidence | Comply / Partially comply / Does not comply |
| TR-054 | P2 | Support parallel running and controlled coexistence with legacy processes during migration. | Detailed narrative, architecture diagram, control description, and client reference evidence | Comply / Partially comply / Does not comply |
| TR-055 | P2 | Provide post-go-live hypercare and measurable stabilization criteria. | Detailed narrative, architecture diagram, control description, and client reference evidence | Comply / Partially comply / Does not comply |
| TR-056 | P2 | Provide ongoing roadmap governance separating committed functionality from exploratory items. | Detailed narrative, architecture diagram, control description, and client reference evidence | Comply / Partially comply / Does not comply |

To avoid ambiguity, bidders shall address each requirement separately and shall not answer by grouping unrelated items into a single narrative. Where a requirement is only partially met, the bidder shall state the limitation, the operational consequence, and any dependency needed for full compliance. If a requirement depends on third-party technology, custom development, or future release timing, that dependency shall be stated explicitly. The buyer reserves the right to treat vague statements such as “supported through the platform” as non-responsive unless supported by evidence.

### 2.4 High-Priority Requirement Spotlight
The following high-priority requirements illustrate the type of response precision expected:

1. **TR-001 (P1)** — Support participant onboarding and entitlement controls for issuers, members, market makers, and operators.
2. **TR-002 (P1)** — Provide configurable market models, trading sessions, and venue state controls.
3. **TR-003 (P1)** — Support market surveillance data feeds, alerting hooks, and evidence retention for market integrity review.
4. **TR-004 (P1)** — Provide deterministic message handling, order/event sequencing, and time-source governance.
5. **TR-005 (P1)** — Support throttling, kill-switch, circuit-breaker, and participant risk control features.
6. **TR-006 (P2)** — Provide listing workflow support including admission checks, disclosure capture, and issuer attestations.
7. **TR-007 (P2)** — Support reference data management, instrument lifecycle events, and venue publication processes.
8. **TR-008 (P2)** — Provide resilient market data distribution, replay support, and dissemination controls.
9. **TR-009 (P2)** — Support operator dashboards for latency, throughput, participant behavior, and venue health.
10. **TR-010 (P3)** — Provide controls for orderly suspension, halt, and resumption procedures.
11. **TR-011 (P3)** — Support pre-issuance data capture, approval workflow, and disclosure document management.
12. **TR-012 (P3)** — Provide instrument reference-data validation and issuance calendar control.
13. **TR-013 (P1)** — Support issuance allocation, investor/admission workflows, and post-issuance lifecycle tracking.
14. **TR-014 (P1)** — Provide configurable restrictions by investor category, jurisdiction, and transferability condition.
15. **TR-015 (P1)** — Support coupon, redemption, and event schedule administration.
16. **TR-016 (P1)** — Provide issuer, registrar, paying-agent, and operator role segregation.
17. **TR-017 (P1)** — Support document versioning, evidence retention, and legally material notices.
18. **TR-018 (P2)** — Provide interfaces for listing, settlement, custody, and market data publication.
19. **TR-019 (P2)** — Support correction handling, cancellation, and controlled re-issuance processes.
20. **TR-020 (P2)** — Provide audit-ready issuance reports and exception logs.
21. **TR-021 (P2)** — Provide logically segregated environments for development, test, pre-production, and production with controlled promotion paths.
22. **TR-022 (P3)** — Support infrastructure-as-code, configuration baselining, and repeatable environment reconstruction.
23. **TR-023 (P3)** — Provide immutable audit logs for privileged actions, configuration changes, and critical operational events.
24. **TR-024 (P3)** — Support high-availability deployment patterns across independent failure domains with no single point of failure.
25. **TR-025 (P1)** — Expose comprehensive observability across application, infrastructure, message flow, and business process layers.
26. **TR-026 (P1)** — Support time synchronization, evidence-grade timestamping, and log correlation across distributed components.
27. **TR-027 (P1)** — Provide backup, restore, and disaster recovery procedures with documented recovery objectives.
28. **TR-028 (P1)** — Support secure API access using modern authentication and authorization standards.
29. **TR-029 (P1)** — Enable controlled software release management including rollback procedures and maintenance windows.
30. **TR-030 (P2)** — Provide formal runbooks for incident response, capacity management, and operational handover.

## 3. Regulatory & Compliance Requirements

### 3.1 Applicable Regulatory Context
The buyer operates within Netherlands and expects bidder responses to align with the applicable supervisory and policy environment, including engagement with AFM, DNB where relevant, and applicable national competent authorities across Euronext markets. Bidders remain responsible for identifying any additional regulatory, legal, or policy constraints triggered by their proposed architecture, operating model, subcontracting chain, hosting arrangement, or data handling approach. Stating that “compliance is the buyer’s responsibility” will be treated as an inadequate answer where the bidder’s design choices create or increase regulatory exposure.

### 3.2 Regulatory Requirement Set
| ID | Control area | Requirement |
| --- | --- | --- |
| REG-001 | Applicable framework mapping | Bidders shall map the proposed solution and delivery model against MiFID II / MiFIR, Prospectus Regulation, DORA, GDPR, AMLD, MiCA where applicable and identify any jurisdiction-specific limitations or dependencies. |
| REG-002 | Outsourcing and critical service controls | Bidders shall identify whether the proposed services would be considered critical or important and provide a control model for oversight, audit, subcontracting, and exit. |
| REG-003 | Data governance | Bidders shall identify all categories of operational, participant, transaction, and personal data processed; applicable residency arrangements; and retention/deletion controls. |
| REG-004 | Audit and supervisory access | Bidders shall provide for buyer, internal audit, regulator, and designated third-party access to records, logs, testing evidence, and relevant control documentation. |
| REG-005 | Operational resilience | Bidders shall describe resilience design, incident handling, severe-but-plausible scenario testing, recovery arrangements, and post-incident evidencing. |
| REG-006 | Financial crime controls | Bidders shall state how sanctions, AML/CFT, suspicious activity workflows, and jurisdictional restriction controls are supported where applicable. |
| REG-007 | Legal record and evidentiary integrity | Bidders shall explain how transaction records, approvals, timestamps, and state transitions are preserved in a legally and operationally defensible manner. |
| REG-008 | Change control and model governance | Bidders shall describe governance for platform changes, configuration changes, emergency fixes, and any parameterized risk or policy models. |
| REG-009 | Market integrity and abuse controls | Bidders shall explain support for surveillance, alerts, evidence retention, and control outputs relevant to fair and orderly markets. |
| REG-010 | Admission and disclosure governance | Bidders shall explain how issuer/member onboarding, listing/admission controls, and disclosure publication workflows are governed. |

### 3.3 Evidence and Assurance Expectations
Bidders shall provide evidence proportionate to the criticality of the proposed service. Evidence may include control matrices, certifications, audit reports, pen-test summaries, resilience test outputs, architecture diagrams, sample logs, access-control examples, service descriptions, and reference implementations. Where evidence cannot be shared in full at proposal stage, the bidder shall provide a redacted version or an indexed description of the artifact together with the conditions under which the full artifact could be reviewed during due diligence. The buyer may reject claims that are not substantiated in a manner consistent with institutional procurement.

The buyer will pay particular attention to data lineage, transaction traceability, privileged access governance, incident escalation, subcontractor visibility, and exit feasibility. If the bidder proposes a managed or hosted operating model, it shall explain how the buyer, its internal audit function, and relevant supervisors can obtain timely access to records and assurance materials. If the bidder proposes the use of novel ledger or tokenization components, it shall explain how these components are governed, monitored, upgraded, and recovered without undermining legal certainty or evidential integrity.

## 4. Commercial Requirements

### 4.1 Commercial Response Principles
The commercial framework for this procurement is intended to support transparent comparison of whole-of-life cost, not merely initial implementation price. Bidders shall therefore provide an itemized commercial response covering software or subscription charges, implementation services, integration work, testing support, environment costs, managed service components, optional modules, training, hypercare, support tiers, change request rates, and any third-party pass-through costs. All pricing assumptions must state quantity drivers, volume thresholds, environment assumptions, and any conditions that would materially affect the cost base. Where pricing varies by deployment model, the bidder shall provide separate pricing structures and clearly identify the operational implications of each model.

The buyer expects bidders to propose a contractual baseline consistent with institutional procurement discipline. That baseline includes audit rights, subcontractor transparency, security obligations, service levels, incident notification, change management, exit support, intellectual property boundaries, data ownership, regulatory cooperation, and termination assistance. The buyer will not accept contractual structures that obscure accountability for critical services or that limit evidence access needed for risk and oversight review. Bidders shall identify all material commercial dependencies, including minimum term commitments, indexing mechanisms, transaction volume assumptions, or third-party license requirements.

Commercial responses will be evaluated alongside technical and control responses, not in isolation. A low initial price with weak resilience, hidden dependencies, or expensive mandatory add-ons will be scored poorly. Equally, a premium commercial proposal may only be justified if the bidder demonstrates meaningful reduction in implementation risk, operating cost, or control burden. The buyer reserves the right to seek best-and-final offers, clarify commercial positions, and normalize pricing for evaluation comparability.

| Commercial item | Required bidder input |
| --- | --- |
| Implementation pricing | Fixed price by phase, milestone, role mix, assumptions, and exclusions |
| Software / subscription | Annual or term-based pricing with metric definitions and minimum commitments |
| Environment costs | Separate non-production, production, DR, and optional sandbox cost components |
| Support services | Support tiers, hours, SLA commitments, escalation path, and pricing |
| Optional items | Clearly separated options with no bundling into mandatory scope |
| Third-party costs | Named dependencies, procurement assumptions, and pass-through model |
| Exit assistance | Rate card, minimum notice assumptions, and deliverables |
| Change request basis | Unit rates, governance triggers, and approval mechanics |

### 4.2 Contractual Baseline
The buyer expects shortlisted bidders to negotiate against the buyer’s paper or a mutually agreed institutional baseline. At minimum, bidders shall identify positions on the following matters: limitation of liability, service credits, warranties, acceptance, confidentiality, regulatory cooperation, audit rights, information security obligations, subcontracting restrictions, intellectual property ownership, source code escrow where relevant, termination rights, transition assistance, and data return/destruction. Deviations from the buyer’s expected position shall be disclosed in a legal deviations register and cross-referenced to the relevant clause area.

### 4.3 Financial Stability and Referenceability
Bidders shall provide evidence of financial standing, insurance cover, legal entity structure, and the identity of any material subcontractors or affiliates involved in delivery or support. The buyer may require proof of financial capacity, beneficial ownership information, and evidence of experience serving regulated financial institutions or critical infrastructures. Reference cases shall be relevant in scope, control intensity, and operating model complexity. Marketing references without attributable operational substance will not carry much weight.

## 5. Evaluation Criteria

### 5.1 Evaluation Model
The buyer will use a combination of pass/fail gates and weighted scoring. Pass/fail gates include administrative completeness, acceptance of mandatory response rules, absence of material conflicts not capable of mitigation, and adequate response to P1 requirements. Bids passing those gates will then be scored using the model below.

| Criterion | Weight | Type | Evaluation basis |
| --- | --- | --- | --- |
| Technical solution fit | 30% | Scored | Alignment to scope, architecture quality, control completeness, and evidence of delivery at comparable institutions. |
| Security, resilience, and compliance | 20% | Scored | Control maturity, regulatory alignment, auditability, and resilience design. |
| Implementation and operating model | 15% | Scored | Delivery realism, governance, migration quality, and service transition readiness. |
| Commercials and contractual alignment | 15% | Scored | Transparency of pricing, total cost, support model, and contract position. |
| Referenceability and institutional experience | 10% | Scored | Relevant deployments, domain expertise, and operating credibility. |
| Demonstration and clarification quality | 10% | Scored | Ability to substantiate claims, answer control questions, and present an auditable operating model. |

### 5.2 Scoring Logic
The buyer will score proposals on a scale determined by the evaluation panel, with normalization where required to preserve comparability. Technical scores will consider not only whether a function exists, but whether it is delivered through a coherent and supportable control model. Commercial scoring will consider whole-of-life cost and the quality of cost transparency rather than headline discounts alone. The buyer may conduct scenario-based clarifications to test whether claimed capabilities remain credible under realistic exception conditions, regulatory scrutiny, and production-load assumptions.

### 5.3 Award Path
The anticipated process is as follows:

1. Administrative compliance check.
2. Pass/fail review of mandatory bidder qualifications and response completeness.
3. Detailed technical, security, operational, legal, and commercial evaluation.
4. Shortlisting of one or more bidders for clarification, deep-dive sessions, and demonstrations.
5. Optional request for best-and-final offer.
6. Preferred bidder selection, subject to internal approvals and successful due diligence.
7. Contract negotiation and formal award notification.

The buyer reserves the right to modify the process, hold parallel negotiations, or make no award.

## 6. Submission Instructions

### 6.1 Administrative Instructions
Submission instructions are designed to ensure administrative completeness and evaluation consistency. Vendors shall submit one complete response pack in English, in searchable digital format, with cross-references matching the buyer’s requirement identifiers and appendix templates. The response shall include an executive summary, detailed response matrices, architecture materials, control evidence, implementation approach, commercial workbook, legal deviations register, and named points of contact for procurement, commercial, security, and solution matters. Claims made in narrative sections must be traceable to evidence. Unsupported statements may be treated as non-responsive.

Clarification questions shall be submitted only through the stated procurement contact point by the published deadline. The buyer may consolidate, anonymize, and distribute responses to all participants where appropriate. Late submissions may be rejected without review. The buyer may request oral presentations, scenario walkthroughs, control deep-dives, reference calls, sandbox demonstrations, or written clarifications. Participation in any such stage does not create an entitlement to award. Vendors shall maintain proposal validity for the period stated in the metadata block and shall promptly notify the buyer of any material change affecting their response.

The buyer may disqualify submissions that fail pass/fail gates, omit mandatory declarations, materially misrepresent capability, or rely on contradictory assumptions. All submitted material shall be treated in accordance with the confidentiality rules set out in this document, subject to legal and regulatory disclosure obligations. The buyer is under no obligation to award and may amend, suspend, or cancel the process at any time.

| Response package component | Requirement |
| --- | --- |
| Volume 1 – Administrative response | Cover letter, bidder details, declarations, conflicts, and contact matrix |
| Volume 2 – Technical response | Requirement-by-requirement response mapped to buyer identifiers |
| Volume 3 – Security and compliance response | Control matrices, certifications, testing evidence, data handling, and subcontractor disclosures |
| Volume 4 – Delivery and service model | Project plan, governance model, migration approach, and support model |
| Volume 5 – Commercial response | Pricing workbook, assumptions, and legal deviations register |
| Appendices | Architecture diagrams, references, sample reports, and any mandatory supporting evidence |

### 6.2 Formatting and Response Rules
- Submit all materials in searchable PDF and editable spreadsheet/word-processing formats where templates require completion.
- Use the buyer’s identifiers exactly as stated in this document.
- Cross-reference all attachments and appendix materials clearly.
- State all assumptions, exclusions, dependencies, and response limitations in a dedicated register.
- Mark confidential material appropriately, while recognizing that the buyer may be subject to legal disclosure duties.
- Do not include alternative commercial proposals inside the main mandatory response; submit them separately as options.
- Where consortium responses are submitted, identify prime bidder accountability and the role of each member.

### 6.3 Clarifications and Confidentiality
Clarification questions must be submitted by the stated deadline. The buyer may issue clarifications, amendments, or addenda to all participating bidders. All participants are expected to preserve the confidentiality of non-public buyer information, system descriptions, and process details disclosed through this procurement. Nothing in this process creates an exclusive right, a guarantee of award, or an obligation to reimburse bidder costs.

## 7. Appendices

### 7.1 Appendix Inventory
| Appendix | Description |
| --- | --- |
| Appendix A | Definitions and glossary |
| Appendix B | Detailed response matrix |
| Appendix C | Assumptions and dependencies register |
| Appendix D | Exceptions and deviations log |
| Appendix E | Indicative pricing workbook structure |
| Appendix F | Reference client form |
| Appendix G | Security control evidence checklist |
| Appendix H | Implementation milestone template |

### 7.2 Required Declarations
The response package shall include signed declarations covering conflict of interest, anti-bribery and corruption compliance, sanctions and export control compliance where relevant, accuracy of submitted information, beneficial ownership disclosure where requested, and acknowledgement of procurement rules. Where a declaration cannot be signed at proposal stage due to internal governance, the bidder shall identify the approval path and expected timing.

### 7.3 Completion Templates
Bidders shall complete the buyer’s response matrix, pricing workbook, assumptions register, and deviations log in the prescribed formats. Failure to complete these templates may result in the response being marked down or treated as incomplete. Narrative attachments are welcome where needed, but they do not replace the required structured response formats.


## 8. Additional Detailed Appendices

### 8.1 Qualification Questionnaire
Bidders shall provide a structured response to the following qualification prompts. The buyer uses this material to assess whether the bidder has the institutional maturity, financial resilience, domain credibility, and governance discipline needed for a programme of this nature.

1. Describe the bidding entity, parent ownership structure, and the legal entities that would provide software, hosting, managed services, implementation, or support.
2. State the number of production customers for the proposed solution or materially similar solution, segmented by sector and jurisdiction where possible.
3. Identify at least three reference engagements relevant to the requested scope, including the role performed, the operating model, and the principal control domains addressed.
4. Describe the bidder’s delivery governance model, including executive sponsorship, programme assurance, issue escalation, change control, and stakeholder reporting.
5. Describe staff continuity arrangements, succession planning, and the bidder’s approach to preventing critical-key-person dependency.
6. State whether any component of the proposed solution has a planned end-of-life, major re-platforming dependency, or material architecture transition within the next thirty-six months.
7. Explain how the bidder manages subcontractor onboarding, oversight, service review, and replacement where a critical delivery dependency exists.
8. Identify any prior material incidents, regulatory findings, or major delivery disputes relevant to the proposed solution or operating model, together with remediation actions.
9. Provide a concise explanation of how the bidder distinguishes product commitments from exploratory roadmap concepts in executive and delivery governance.
10. State the insurance cover carried for professional indemnity, cyber risk, and other relevant liability categories.

The buyer expects concise answers supported by evidence. Generic statements such as “we have a mature governance model” are not sufficient. If the bidder relies on a consortium structure, the prime contractor shall explain how unified accountability is maintained across all workstreams and service obligations.

### 8.2 Data, Reporting, and Record-Keeping Expectations
The buyer expects the delivered capability to generate and retain a coherent body of operational evidence. That includes transaction records, event histories, approvals, user actions, system state changes, reconciliation outputs, exception records, service incidents, and release history. Bidders shall therefore explain how records are created, timestamped, correlated, stored, queried, exported, retained, and deleted in line with applicable policy and regulation.

The proposal shall distinguish between system-of-record data, operational telemetry, immutable audit trails, business reporting outputs, and derived analytics. Where multiple stores or subsystems are involved, the bidder shall describe how referential integrity is preserved and how investigators or auditors can reconstruct an end-to-end event sequence. If the proposed design uses distributed ledger components, message buses, workflow engines, off-chain data stores, or external reporting tools, the bidder shall identify where authoritative state resides for each major process step.

The buyer also expects flexible reporting support. At minimum, the bidder shall describe standard and configurable reporting for operational monitoring, management reporting, participant reporting, regulatory reporting support, risk review, and post-incident analysis. If data extracts are required for data warehouses, supervisory reporting tools, security analytics, or downstream finance and treasury systems, the bidder shall describe the supported extraction methods, refresh approach, reconciliation controls, and entitlement model. The buyer will score positively where the reporting design reduces manual data manipulation and enables stronger evidence-based oversight.

### 8.3 Testing, Acceptance, and Readiness Scenarios
The bidder shall propose a testing and readiness framework robust enough for a high-control financial environment. That framework shall cover unit, component, system, integration, performance, failover, disaster recovery, security, access-control, business continuity, and operational readiness testing. It shall also identify how defects are classified, how severity is assigned, how workarounds are governed, and what criteria apply before progression to the next stage.

The buyer expects specific scenario coverage, not merely generic testing categories. Bidders shall confirm how they would support test scenarios including normal processing, peak-day volumes, partial infrastructure failure, interface unavailability, duplicate instruction handling, role-based access violations, malformed input, late data arrival, participant offboarding, reference-data correction, emergency release rollback, and controlled recovery from operator error. Where the requested scope includes settlement, collateral, custody, listing, exchange, or CBDC functions, the bidder shall also identify domain-specific scenarios relevant to those workflows.

Acceptance shall be milestone-based and evidence-led. The bidder shall describe the deliverables, artifacts, sign-off inputs, and responsibilities associated with design approval, environment readiness, interface certification, business acceptance, production readiness, and go-live authorization. The buyer does not intend to accept a solution merely because a demonstration succeeds. Acceptance requires documented evidence that the delivered controls, procedures, environments, support arrangements, and recovery processes are fit for the intended level of criticality.

### 8.4 Service Levels and Operational Support Template
Bidders shall provide a proposed service model covering incident management, service request handling, problem management, release management, maintenance windows, patching, vulnerability remediation, access administration, capacity review, and periodic service reporting. The buyer expects support responsibilities to be mapped clearly across first line, second line, third line, and any subcontracted support functions.

At minimum, the bidder shall state: support hours; target response and restoration times by severity; communication expectations during major incidents; named escalation levels; criteria for invoking major incident procedures; planned maintenance rules; security patch timelines; reporting cadence; service review governance; and the level of support available during testing, migration, and hypercare. If different service levels apply across hosted, self-managed, or hybrid deployment models, the bidder shall present them separately.

The buyer will pay close attention to whether service levels are operationally credible in a regulated environment. Aggressive headline SLAs without clear scope boundaries, transparent exclusions, and evidence of operational capability will not score well. The bidder shall therefore explain the staffing, tooling, monitoring, and third-party support assumptions that underpin its proposed service commitments.

### 8.5 Transition, Exit, and Long-Term Maintainability
The buyer must be able to maintain strategic optionality over time. Bidders shall therefore provide a transition and exit approach that enables orderly change of operating model, vendor, hosting environment, or adjacent infrastructure without unreasonable lock-in. This includes the return or transfer of buyer data, configuration assets, interface definitions, operational documentation, keys or certificates where appropriate, and sufficient knowledge transfer to allow an orderly transition.

The bidder shall also explain how ongoing maintainability is preserved as the solution evolves. That explanation should cover release strategy, backward compatibility, deprecation policy, regression testing, configuration management, documentation discipline, and support for controlled upgrades. If the solution depends on fast-moving ecosystem components, open-source elements, or partner products, the bidder shall explain how compatibility risk is assessed and mitigated.

The buyer is not opposed to innovative architecture, but it will reject innovation that creates hidden dependency traps. A good answer here demonstrates that the bidder has thought beyond implementation and can support a stable multi-year operating relationship governed by explicit controls, predictable economics, and defensible change practices.
