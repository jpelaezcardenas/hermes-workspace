---
institution: Deutsche Bank AG
country: Germany
document-type: rfp
asset-class: digital bonds
date: 2026-03-14
version: v1.0
reference: DB-2026-001
---

# Request for Proposal: Digital Bonds Platform

## Section 1: Context, Scope, and Timeline

### 1.1 Issuing Organization
As a globally systemic bank with material capital markets, corporate treasury and securities services franchises, Deutsche Bank is assessing a production-grade platform that can support digitally native issuance and post-trade servicing within a tightly controlled German and EU regulatory perimeter. Our immediate procurement focus is on digital bonds for wholesale and institutional markets, while the associated information request explores tokenized deposit capabilities that may support cash leg innovation in future delivery-versus-payment models. The Bank operates within an environment shaped by MiFID II, MiCA, DORA, ECB expectations for operational resilience, and German electronic securities developments. We therefore require solutions that are conservative in control design, explicit in role segregation, and credible for phased deployment across front office, operations, risk, compliance and finance functions.

The issuing organization expects bidders to understand that this initiative is being run within a bank-wide governance structure rather than as a laboratory exercise. Sponsorship spans business, operations, architecture, security, compliance and procurement stakeholders. The Bank's objective is not simply to tokenize an instrument for demonstration purposes, but to determine whether a vendor platform can sustain production controls across issuance, servicing, reporting and audit. Our operating model already includes mature control functions, global booking and reporting obligations, and non-trivial integration requirements into legacy and strategic platforms. Accordingly, proposals must describe how the solution fits into existing control frameworks, change management practices and model risk, cyber and third-party risk reviews.

From a market standpoint, drivers include shorter settlement expectations, demand for improved transparency over ownership and lifecycle events, pressure to reduce manual reconciliations, and the need to support future delivery-versus-payment or programmable servicing patterns. The selected platform, if any, must prove that these benefits can be realized without compromising legal certainty, investor protection, information security or operational resilience. Priority is regulatory-grade governance, integration to global markets infrastructure, and coexistence with existing issuance agents, custodians and treasury systems. Deutsche Bank will favor vendors with evidence of handling euro-denominated debt instruments, CSD connectivity patterns, and complex entitlement and approval workflows.

### 1.2 Scope and Key Scenarios
This RFP concerns digital bonds as the primary asset class. The Bank is seeking binding proposals for an implementation-capable platform. The in-scope scenarios include Euro and foreign-currency bond issuance for private placements and selected institutional distribution; lifecycle servicing including coupon events, corporate actions, investor reporting and exception handling; and controlled settlement orchestration across cash, custody and registrar workflows.

In scope are platform capabilities for workflow orchestration, data management, entitlements, auditability, business rule configuration, lifecycle event support, integration tooling, reporting and environment management. Where relevant, the Bank also expects support for participant management, rule-based transfer controls, settlement status visibility and full traceability of operational actions. Out of scope at this stage are retail-facing wallet distribution, ungoverned public-network deployment without enterprise controls, speculative cryptoasset trading functionality, and any solution model that relies on bespoke consulting-heavy buildout as the primary method of delivering required capabilities.

Bidders should address realistic user groups: front-office structuring or product teams, operations and settlements staff, compliance analysts, finance and reconciliations teams, platform engineers, support personnel and control functions. Responses should identify which workflows are configuration-driven, which require custom development, and which depend on third-party components. For cross-border scenarios, respondents must also explain how legal entity segregation, data access controls and regional deployment constraints are handled.

### 1.3 Timeline and Submission
The Bank intends to run a disciplined procurement and assessment process in 2026. Indicative dates are provided below and may be amended at the Bank's sole discretion.

| Milestone | Date |
|---|---|
| Document issued | 2026-03-14 |
| Vendor clarification questions due | 2026-04-03 |
| Bank responses to clarifications | 2026-04-17 |
| Response submission deadline | 2026-05-08 |
| Initial compliance screening | 2026-05-11 to 2026-05-22 |
| Evaluation workshops / demos | 2026-06-01 to 2026-06-19 |
| Due diligence and reference checks | 2026-06-22 to 2026-07-10 |
| Down-select / market summary | 2026-07-24 |
| Contracting or next-stage decision | 2026-09-18 |

Responses must be submitted in English in searchable PDF and editable spreadsheet formats. Requirements matrices are to be completed in full, with deviations, assumptions and dependencies clearly identified. Bidders must submit architecture diagrams, a target operating model summary, implementation approach, security and compliance pack, pricing workbook and named client references. For the RFP, the Bank additionally requests a concise executive summary, a list of key constraints, and explicit statements on areas where the product is roadmap-only. For this RFP, commercial terms must be sufficiently complete to support shortlist comparison and contracting discussions.

## Section 2: Requirements Core

### 2.1 Business Requirements
The business requirement set is intended to test whether the platform can support end-to-end lifecycle control for digital bonds without forcing the Bank into parallel manual processes. Bidders should explain how issuance setup, participant onboarding, rule configuration, event management, exceptions, reporting and archival are administered. Workflows must support maker-checker controls, multi-stage approval where appropriate, and the ability to segregate roles across business, operations and control teams. The Bank expects auditability at the record, workflow and configuration levels.

The platform should support both standard processing and non-standard events. This includes scheduled events, ad hoc adjustments, cancellations, corrections and exception routing. Where corporate actions, cashflows, interest, distributions, margin or transfer restrictions are relevant, respondents must explain how these are modelled and triggered. The Bank also requires evidence that entitlement views, participant statements and downstream accounting extracts can be generated consistently from the same controlled data set.

| ID | Requirement | Priority |
|---|---|---|
| DB-BR1 | Support configurable asset lifecycle workflows with maker-checker approval and complete audit trail | Mandatory |
| DB-BR2 | Provide participant, holding and entitlement views suitable for operations, compliance and reporting users | Mandatory |
| DB-BR3 | Handle scheduled and exception-based events, including corrections and reversals | Mandatory |
| DB-BR4 | Allow business users to configure core rules, templates and approval paths without code changes | Scored |
| DB-BR5 | Support multilingual document and notification generation where relevant to operating entities | Desirable |

For the avoidance of doubt, the Bank is not seeking a loosely coupled toolkit requiring extensive vendor engineering to operationalize basic lifecycle functions. Responses should distinguish native product capability from project-specific customization. As this is an RFP, bidders are expected to commit to delivery scope, identify implementation prerequisites and state any material functional gaps.

### 2.2 Technical/Deployment Requirements
The Bank requires an enterprise architecture that can be deployed within a controlled environment and integrated through well-documented interfaces. Solutions may be delivered as SaaS, self-managed or hybrid, but deployment choices must be compatible with the Bank's technology risk, resilience and data governance policies. Architecture descriptions should cover environment segregation, scalability, high availability, backup and recovery, secrets management, observability, release management and infrastructure dependencies.

Integration capabilities must be first-class, not an afterthought. The platform must expose secure APIs, support event-driven integration patterns where useful, and provide reliable batch export/import options for reconciliation or regulatory reporting. Respondents should identify supported authentication methods, encryption controls and any dependencies on specific cloud providers or managed services. The Bank expects clear descriptions of tenancy, key management, data retention and administrative access models.

| ID | Requirement | Priority |
|---|---|---|
| DB-TR1 | Expose versioned APIs and event interfaces for workflow, holdings, transactions and reporting data | Mandatory |
| DB-TR2 | Support segregated environments for development, testing, pre-production and production | Mandatory |
| DB-TR3 | Provide high availability and documented disaster recovery objectives | Mandatory |
| DB-TR4 | Offer deployment options compatible with the Bank's cloud and network security policies | Scored |
| DB-TR5 | Provide infrastructure-as-code or equivalent automated deployment support | Desirable |

The current system landscape includes Murex, Calypso-adjacent capital markets tooling, SWIFT messaging, internal treasury platforms, reference data services, AML/KYC controls, general ledger interfaces, data lakes and enterprise identity services. Bidders must state whether integration accelerators exist for these or equivalent categories, and how they would manage message translation, canonical data modelling and operational monitoring across the interface estate.

### 2.3 Security/Compliance Requirements
Security and compliance requirements are central to evaluation. The solution must support operation in a regulated banking environment subject to BaFin, ECB SSM oversight, Bundesbank, GDPR and German banking secrecy requirements. Respondents should describe how the platform supports segregation of duties, privileged access management, encryption in transit and at rest, immutable or tamper-evident logs, incident response, vulnerability management and evidence generation for internal audit and regulators. The Bank expects alignment with modern control standards, including defensible software development and third-party risk practices.

Data protection obligations must be addressed explicitly. The respondent must identify what personal data, client identifiers or transaction metadata may be processed; where such data is stored; how access is controlled; and what retention, deletion and export mechanisms are available. Cross-border data transfer positions, subprocessors and support access models must be disclosed. Audit reporting should enable reconstruction of operational decisions and lifecycle changes without dependence on informal support intervention.

| ID | Requirement | Priority |
|---|---|---|
| DB-SC1 | Support role-based access control, MFA integration and privileged activity logging | Mandatory |
| DB-SC2 | Provide immutable or tamper-evident audit logs covering configuration and operational events | Mandatory |
| DB-SC3 | Document data residency, retention and deletion controls aligned with applicable privacy laws | Mandatory |
| DB-SC4 | Provide security certifications, penetration test summaries and secure SDLC evidence | Scored |
| DB-SC5 | Support policy-based export of audit evidence for regulator and internal audit requests | Scored |

For shortlisted vendors, the Bank may require completion of detailed security questionnaires and participation in architecture and control deep dives. RFP responses should include contractual commitment positions on notification timelines, vulnerability remediation and support access restrictions.

### 2.4 Integration and Interoperability
The Bank operates a heterogeneous landscape in which no platform can function in isolation. Bidders must explain how their solution interoperates with existing reference data, KYC/AML, payments, custody, accounting, document management, reporting and observability tooling. Support for canonical APIs, webhooks, file-based interchange and standard messaging is expected. Where securities or payment messages are relevant, the Bank prefers alignment with industry standards such as ISO 20022 and SWIFT messaging conventions, while recognizing that some digital lifecycle data elements may require product-specific extensions.

Interoperability also includes portability. The Bank expects clear data extraction capabilities, documented schemas, and a credible approach to migration, archival and exit. Respondents should explain whether the platform can support multiple network or ledger back ends, or if it is constrained to a single proprietary environment. If external custodians, CSDs, depositories, cash systems or market infrastructures are involved, the response should describe how status synchronization, reconciliation and finality are handled.

The Bank will favor solutions that minimize duplicate golden sources and support controllable coexistence with legacy systems during phased rollout. Point-to-point custom interfaces with weak monitoring are viewed unfavorably. Explain operational alerting, replay handling, idempotency and interface version management in practical terms.

### 2.5 Operational Requirements
Any selected platform must support a sustainable production operating model. The Bank requires clear service levels, named support structures, escalation paths, release governance and maintenance communication. At minimum, respondents should specify standard support hours, severity definitions, response and restoration targets, upgrade practices, incident communication processes and customer success or technical account management arrangements. For business-critical processes, the Bank expects transparent support during critical market windows and change freeze coordination.

Training and documentation are also material. The Bank requires role-based training for administrators, operations users, business owners, support teams and control functions. Product documentation should be comprehensive, version-controlled and sufficient for internal runbook creation. The vendor should describe how environment changes are promoted, how operational dashboards are configured and how defects and enhancements are tracked.

| Area | Bank Expectation |
|---|---|
| Availability target | 99.9% minimum for production service components, subject to agreed maintenance windows |
| Severity 1 response | 30 minutes or better |
| Severity 1 restoration target | 4 hours workaround or service restoration target, unless otherwise justified |
| Change notice | Minimum 10 business days for standard releases affecting users or interfaces |
| Training | Administrator, operations and audit-oriented training materials required |
| Documentation | API docs, configuration guides, control guides, DR procedures and release notes |

Responses should differentiate what is standard, premium or unavailable. For the RFP, SLA positions and operating responsibilities must be sufficiently clear to support commercial negotiation.

## Section 3: Qualification, Pricing, and Evaluation

### 3.1 Qualification Gates
The Bank will apply threshold qualification criteria before detailed scoring. Failure on any mandatory gate may result in exclusion from further consideration.

| Gate | Requirement | Assessment |
|---|---|---|
| Q1 | Demonstrated enterprise software product, not a bespoke services-led build proposition | Pass/Fail |
| Q2 | At least two relevant production or late-stage pilot references in regulated financial services | Pass/Fail |
| Q3 | Ability to support the Bank's preferred control model, including segregation of duties and audit logging | Pass/Fail |
| Q4 | Ability to complete security and third-party risk due diligence | Pass/Fail |
| Q5 | Clear product roadmap governance and release management process | Pass/Fail |
| Q6 | No undisclosed material legal, sanctions or insolvency issues affecting viability | Pass/Fail |

Bidders must provide evidence for each gate, including client references, product architecture materials, implementation approach and corporate information. The Bank reserves the right to request demonstrations tailored to the stated use cases, reference calls, proofs of concept or written clarification. Because this is an RFP, qualification gates may be applied strictly before invitation to final commercial discussions.

### 3.2 Pricing Structure
Pricing submissions should be transparent, sufficiently disaggregated and valid for at least 180 days. The Bank expects respondents to separate one-time and recurring charges and to distinguish software, hosting, support, implementation, training and optional module costs. Any dependency on transaction volume, asset count, legal entity count, environment count or named users must be clearly specified. Hidden mandatory services, non-standard infrastructure pass-throughs and proprietary change fees should be called out explicitly.

The pricing template should contain, at minimum, the following categories:

| Category | Description |
|---|---|
| Software / subscription | Core platform fees, by module or metric |
| Environment costs | Development, test, pre-production and production environments |
| Implementation services | Configuration, integration, migration, testing and go-live support |
| Support and maintenance | Standard and premium support options |
| Training | Initial training, refresher training and train-the-trainer costs |
| Optional features | Add-on modules, analytics, reporting, network connectors or advanced workflow packs |
| Exit / transition | Data export, migration support and termination assistance assumptions |

For this RFP, bidders should provide a completed pricing workbook with assumptions, unit economics and multi-year total cost of ownership views. The Bank will normalize submissions for comparison and may adjust scenarios to evaluate scaling effects.

### 3.3 Evaluation Criteria
The Bank intends to evaluate responses using a weighted model combining functional fit, technical quality, control posture, commercial viability and delivery credibility. Indicative weights are shown below.

| Criterion | Weight |
|---|---:|
| Business and functional fit | 30% |
| Technical architecture and interoperability | 20% |
| Security, compliance and resilience | 20% |
| Implementation approach and operating model | 15% |
| Commercial model and total cost of ownership | 10% |
| Vendor viability and references | 5% |

Evaluation will proceed through document review, clarification, workshop/demo sessions, reference validation and due diligence. The Bank may invite selected respondents to scenario-based walkthroughs using anonymized but realistic workflows. Scores will consider not only headline capability, but also control depth, clarity of implementation assumptions and evidence of production readiness. The Bank may also account for the degree to which the solution reduces operational fragmentation rather than shifting complexity elsewhere.

In assigning scores, the Bank will treat unsupported claims, vague roadmap language and missing evidence negatively. Vendors should therefore answer directly, avoid marketing-only responses and identify constraints candidly. The output of this RFP will be a shortlist recommendation and, subject to internal approvals, entry into final negotiations with one or more bidders.



### Expanded Company-Specific Context
Deutsche Bank AG expects bidders to anchor their response in the buyer's actual strategic posture rather than reuse a generic tokenization template. Deutsche Bank has been visibly active in digital assets through institutional custody and servicing initiatives, participation in tokenized deposit and digital money discussions, and partnerships around tokenization infrastructure, including industry work touching Taurus, Partior and DWS-linked stablecoin efforts. The bank frames the topic as institutional infrastructure rather than speculative trading. In practical terms, that means the proposed platform must support bond issuance, bookbuilding support, investor onboarding, settlement, coupon processing, redemption and issuer reporting while fitting into global transaction banking platforms, cash management, custody and safekeeping, capital markets and treasury systems, ISO 20022 connectivity, sanctions screening, reconciliations and enterprise IAM. The bank or fintech will not score a response well if the digital-asset layer becomes a sidecar disconnected from existing books and records, operations controls, treasury workflows, or regulator-facing reporting.

The issuing team also expects bidders to recognize the buyer's governance model. the relevant executive audience includes senior leaders from Corporate Bank, securities services, digital assets, technology, risk and compliance. This has two consequences. First, proposals must explain how the platform supports board-level oversight, architecture review, risk sign-off and third-party control testing before production launch. Second, vendors must show how implementation can proceed without creating a long tail of manual exceptions that move risk into operations rather than remove it.

From a procurement standpoint, Deutsche Bank procurement scrutiny typically focuses on production operability, auditability, model clarity and avoidance of architecture that creates new manual exceptions. Proposals should therefore describe not just target-state functionality but also the migration path from current-state processes, including coexistence with legacy systems, phased onboarding of products or jurisdictions, and rollback or containment measures if external dependencies fail.

### Regulatory and Jurisdictional Context
The regulatory perimeter for this procurement is shaped by BaFin, Bundesbank, ECB supervision, MiCA, DORA and German outsourcing / cloud / data protection rules. Where the proposed operating model involves crypto-asset issuance, trading, custody, settlement or payment functionality in the EEA, respondents must explain how MiCA obligations are allocated across the buyer, the platform provider and any custody, exchange, wallet, payment or reserve-management partners. The buyer does not want hand-waving about regulatory coverage; it wants a control map that identifies which legal and operational obligations remain with the institution and which are facilitated by the proposed platform.

DORA and broader operational-resilience obligations are equally important. Respondents should explain resilience testing, incident classification, third-party ICT dependency oversight, evidentiary logging, vulnerability management, and disaster recovery in a way that would survive review by internal cyber, operational resilience and procurement risk teams. For UK institutions, the answer must also align with the UK's operational-resilience and outsourcing regime. For Swiss or cross-border operating models, respondents must distinguish local supervisory expectations from EU-facing service obligations.

The buyer also expects a precise answer on privacy, data residency and cross-border support access. Proposals should state what personal data or customer-linked metadata is processed, where it resides, how deletion and retention work, how evidentiary records are preserved, and how administrative access is governed during business-as-usual operations and incident response. This is non-negotiable for shortlist consideration.

### Detailed Use Cases and Technical Depth
For this procurement, bidders should assume that the first live use cases will be concrete rather than experimental. At minimum, the target operating model should support bond issuance, bookbuilding support, investor onboarding, settlement, coupon processing, redemption and issuer reporting. The proposed platform should show how configuration, approvals, ledger updates, settlement instructions, exception handling and reporting are orchestrated across those use cases without requiring brittle one-off customization for each product or jurisdiction.

A strong response will explain the buyer journey and the operator journey separately. On the buyer or issuer side, product owners need configuration controls, approval workflows, rule-based restrictions and full visibility into lifecycle status. On the operator side, support and operations teams need reconciliation dashboards, queue and retry transparency, clear exception states, audit evidence, and deterministic recovery procedures. On the control-function side, compliance and risk teams need policy enforcement, exportable records, entitlements visibility and evidence that the system can be supervised without direct vendor intervention.

Respondents should also explain how the platform integrates with external market infrastructure or partner dependencies where relevant. That may include custodians, CSDs, payment systems, correspondent banks, sanctions providers, market-data feeds, wallet / key-management providers, transfer agents, registrar services, digital cash rails or smart-contract monitoring tooling. The buyer will treat dependency transparency as a strength, not a weakness; hidden dependencies are what kill deals.

### Integration Expectations for Existing Infrastructure
The solution must interoperate cleanly with the buyer's established control estate. That includes global transaction banking platforms, cash management, custody and safekeeping, capital markets and treasury systems, ISO 20022 connectivity, sanctions screening, reconciliations and enterprise IAM. Vendors should describe canonical data models, API contracts, event-taxonomy design, idempotency controls, batch and streaming interfaces, and how reconciliation breaks are surfaced and resolved. If the proposed platform maintains its own ledger, respondents must explain how golden-source boundaries are defined and how downstream finance, risk and regulatory systems consume authoritative records.

Where asset servicing or payment finality depends on external rails, the response should describe status synchronization, settlement confirmation, replay handling and cutoff management in practical terms. The buyer expects clear maker-checker and four-eyes patterns for operationally sensitive actions such as asset creation, rule changes, minting or issuance events, investor-permission changes, collateral substitutions, corporate-action execution, and privileged administrative overrides.

Implementation plans should include non-production environment design, test-data strategy, migration sequencing, cutover checkpoints and rollback paths. Sandbox quality matters, but realistic integration testing matters more. The selected vendor will be expected to support SIT, UAT, dress rehearsals and post-go-live stabilization using an evidence-based approach rather than aspirational milestone slides.

### Expanded Evaluation Considerations
In addition to the baseline scoring model already set out in this document, the buyer will place explicit emphasis on five company-specific questions. First, does the proposed platform fit the institution's real control model rather than forcing a parallel digital-only operating structure? Second, can the platform support the immediate use case of bond issuance, bookbuilding support, investor onboarding, settlement, coupon processing, redemption and issuer reporting while creating optionality for adjacent workflows? Third, are regulatory responsibilities and third-party dependencies described with enough precision to withstand compliance and procurement review? Fourth, can the buyer's internal engineering and operations teams own the platform day to day without permanent vendor dependency? Fifth, is the commercial model transparent enough to remain viable after expansion to new products, legal entities or markets?

For scoring purposes, the buyer may use indicative sub-weightings within existing sections. Functional fit may prioritize lifecycle completeness, exception handling and configuration depth. Technical architecture may prioritize API quality, integration traceability, observability and deployment repeatability. Security and compliance may prioritize evidence generation, data-governance clarity, operational resilience and outsourced-service governance. Delivery credibility may prioritize referenceable implementations, realistic staffing, cutover discipline and post-launch support. Commercial assessment will consider not just headline price but cost predictability, scaling economics and exit portability.

Because this is a RFP, respondents should provide binding delivery commitments, implementation sequencing and contractual assumptions. The buyer expects committed pricing and explicit implementation assumptions because this is an RFP.

### Delivery, Migration and Operational Readiness
The buyer expects the selected vendor to provide a practical implementation path consisting of discovery and control mapping, detailed design, integration build, environment hardening, testing, migration or initial onboarding, go-live readiness and hypercare. Responses should identify which activities are product-native, which require configuration, which require partner work and which require buyer-owned engineering or operational change. Any activity that depends on a future roadmap item should be called out plainly.

Operational readiness should cover service ownership, support boundaries, incident escalation, change windows, release governance, configuration promotion, key or secret rotation, reconciliation monitoring and evidence retention. The buyer will favor platforms that can be operated through documented runbooks, role-based access controls and product-native telemetry rather than hidden vendor admin playbooks. Training must be role-specific and should include administrators, operations analysts, control functions, security responders and audit stakeholders.

Finally, the response should describe exit and continuity planning. Data export, configuration portability, audit-log preservation, historical-report retention and dependency transition assistance are part of the procurement discussion from day one. Buyers in this segment are not willing to accept architectural lock-in disguised as innovation.




### Additional Technical Requirement Expansion
To make responses comparable, Deutsche Bank AG expects bidders to address the following detailed capability areas explicitly in narrative form even where no separate spreadsheet row exists. For bond issuance, bookbuilding support, investor onboarding, settlement, coupon processing, redemption and issuer reporting, the platform must demonstrate product setup controls, rule-based participant eligibility, event sequencing, immutable or tamper-evident history, reconciliation between internal and external states, and operational recovery mechanisms that do not depend on undocumented vendor intervention. The buyer expects a precise description of how a transaction moves from initiation to final posting, where approvals occur, how rejected or timed-out events are surfaced, and how downstream records are corrected when upstream events are replayed or canceled.

The bidder should explain how entitlements are represented across customer, omnibus, treasury, custody and reporting views. If the proposed operating model uses token representation, off-chain mirrors or external registries, the response must explain which system is authoritative for each state transition and how breaks are detected. Where smart-contract components are used, the bidder should describe contract upgrade governance, deployment approvals, release testing, parameter-change controls, and emergency pause or kill-switch procedures if legally and operationally relevant.

The buyer also requires clarity on the human operating model. Daily operations should include queue monitoring, exception triage, approval processing, end-of-day controls, reconciliations, incident escalation and evidence retention. Vendors should specify what dashboards are available out of the box, how alerts are configured, what thresholds exist for transaction failures or stale dependencies, and how operations teams distinguish between retryable events, permanently failed events and events requiring manual decision. It is not enough to say the platform is observable; the buyer wants to know how an operations analyst would actually run it on a difficult day.

### Additional Integration and Migration Expansion
Migration and coexistence are critical because the buyer will not switch off incumbent infrastructure on day one. Responses should therefore include a phased integration model covering reference data, identity, treasury, finance, reporting, compliance screening, customer communication and archival. The bidder should state what canonical message or entity model is used, how schema changes are versioned, how historical records are imported or linked, and how the platform supports dual running during controlled rollout.

Where the use case depends on market infrastructure or partner services, the bidder must describe onboarding and certification steps, control handoffs, operational cutoffs and how outages are handled. For example, if issuance confirmation depends on a custodian or registrar, if payment finality depends on an external cash leg, or if distribution depends on a broker or wallet provider, the proposal must explain what happens when the dependency is degraded. Buyers in this segment already know that happy-path architecture diagrams lie by omission. They want the unhappy path.

The implementation plan should identify preconditions for launch, including legal-entity selection, product governance approvals, security sign-off, model validation where applicable, operational-readiness evidence and support mobilization. A credible bidder will describe how many environments are required, how many integration points are on the critical path, what test evidence is produced at each gate, and what objective readiness criteria are used for go-live recommendation.

### Additional Commercial and Evaluation Expansion
Commercially, the buyer expects the bidder to price not just initial implementation but the actual operating footprint of the platform over time. That includes environments, support, release impact, partner connectors, high-availability requirements, audit support and expansion into new products or jurisdictions. Price transparency matters because many digital-asset platforms appear attractive in a small pilot and become expensive or operationally fragile at production scale. The response should therefore include realistic scaling assumptions, named cost drivers and a clear statement of which services are optional versus mandatory for a safe launch.

Evaluation will place particular emphasis on whether the bidder has done this before in a meaningfully similar setting. References do not need to be identical to the buyer's use case, but they should demonstrate that the product can operate in a regulated environment with real money, real controls and real integration complexity. The buyer will treat exaggerated claims, evasive dependency descriptions and generic compliance language as signs that the implementation risk is higher than the proposal suggests.




### Supplemental Buyer Questionnaire and Scenario Detail
To support a realistic comparison, Deutsche Bank AG expects each respondent to address the following scenarios in direct prose rather than one-line matrix answers. Scenario one covers day-one setup: how the platform is configured for bond issuance, bookbuilding support, investor onboarding, settlement, coupon processing, redemption and issuer reporting, how approval policies are established, how roles are assigned, how test and production environments are separated, and how operational evidence is captured from the first transaction onward. Scenario two covers day-two operations: how normal processing, cutoff management, exception queues, break resolution, reconciliations, fee calculations, customer or counterparty communication, and audit-log review are handled. Scenario three covers stress or failure conditions: dependency outages, partial settlement, stale market data, delayed confirmations, duplicate submissions, failed signatures, policy breaches, sanctions hits, rollback events, and emergency change restrictions.

The buyer also expects detailed explanation of governance workflows. Respondents should describe how a new product, issuer, merchant, investor cohort, or legal entity is onboarded; what approvals are required; which controls are configuration-driven versus code-driven; how rule changes are versioned; how those changes are tested; and how the platform proves after the fact that the approved rule set is the rule set that actually ran in production. This is especially important for institutions operating under stringent change-management, model-risk, outsourcing and operational-resilience obligations.

Data architecture should be described with equal care. The buyer wants to know which records are mastered in the platform, which are mirrored from upstream systems, which are derived for analytics or reporting, and how discrepancies are surfaced. Where distributed-ledger or token-state concepts are used, the response should distinguish clearly between legal record, operational record, settlement status, investor entitlement and financial-accounting representation. Vendors that blur those distinctions create downstream reconciliation pain and will score poorly.

The buyer is also assessing how the proposed solution scales organizationally. A platform that requires specialist vendor operators for every configuration change, incident review or product launch is not attractive, even if the underlying technology is clever. Respondents should therefore explain what internal product owners, operations analysts, compliance reviewers and platform engineers can do safely by themselves, what requires elevated permissions, what is blocked by policy, and what remains a vendor-only activity. In other words: who owns the keys to the shop, and how do you stop them from setting it on fire.

### Supplemental Control, Resilience and Evidence Expectations
The buyer expects a platform that behaves like regulated infrastructure, not a perpetual pilot. That means clear backup and recovery design, measured recovery objectives, tested failover or restoration processes, security event triage, dependency-health monitoring, and evidence that administrative actions are logged in a way that supports internal investigations and external regulator review. Responses should describe log retention, export formats, time synchronization, privileged-session monitoring, and how historical configuration state can be reconstructed for a given business date.

Control evidence should extend beyond cyber. The buyer also wants proof of operational controls: maker-checker approvals, dual-control changes, release sign-off, transaction-level audit trail, reconciliation sign-off, exception aging, manual override governance, and periodic user-access review support. For payment and settlement use cases, the platform should support investigation of failed or delayed transfers from initiation through final booking. For issuance and servicing use cases, it should support full reconstruction of lifecycle events and investor-impact analysis. For brokerage or distribution use cases, it should support customer-eligibility tracing, disclosure acknowledgment and execution-status history.

Where third parties are involved, the bidder should explain not just the dependency but the supervisory and contractual implications of that dependency. The buyer will ask whether the provider can be replaced, how service degradation is detected, what the contingency path is, and how the buyer continues meeting its own obligations if the third party underperforms. That question applies equally to custodians, key-management providers, node operators, stablecoin issuers, payment banks, registrar agents, market-data vendors and sanctions-screening utilities.

### Supplemental Implementation Expectations
The implementation section of the response should include a realistic mobilization plan. The buyer expects workstreams covering architecture, security and control mapping, API and event integration, data and reporting integration, non-functional testing, legal and compliance review, operating-model design, training, cutover planning and hypercare. A credible response will identify which workstreams can run in parallel, which are critical path, what buyer resources are needed, and where prior accelerators materially reduce risk.

The bidder should also set out readiness criteria for each implementation gate. Discovery should produce agreed scope, control boundaries, dependency map and success metrics. Design should produce signed-off architecture, data flows, environment pattern and control map. Build should produce working interfaces and test evidence. Pre-production should produce reconciled dry runs, security sign-off, support readiness and documented rollback plans. Go-live should occur only when operational dashboards, support contacts, escalation routes and evidence exports are all proven in practice. Buyers in this segment are tired of slideware programs that declare success before day-two support is actually ready.

Finally, the response should explain the future-state roadmap without overselling it. The buyer does want to know what adjacent capabilities could become available once the initial use case is live, but it values honesty more than a giant roadmap poster. The strongest proposals will draw a bright line between current capability, configuration-led extension, partner-dependent enhancement and true roadmap. That clarity makes procurement, legal, risk and technology teams much more willing to move forward.


### Supplemental RFP Award Criteria Detail
Because this is a live RFP, the buyer will also test contractual and delivery discipline. Respondents should assume that award recommendation will depend on whether the proposed scope can be committed contractually, whether implementation assumptions are explicit, whether service levels are supportable, whether security and resilience claims are evidenced, and whether cost drivers remain predictable after launch. The buyer will compare total launch cost, total operating cost, dependency risk, exit portability, internal ownership model and the quality of actual written commitments. Clever architecture with evasive commercial terms is still a weak bid.

Bidders should therefore provide a detailed responsibility matrix, milestone-based delivery plan, assumptions register, dependencies register, deviations register, and reference-backed proof points for similar regulated implementations. If the platform relies on professional services, respondents must distinguish between one-time setup work and recurring operating dependency. If premium support, managed operations, or a particular deployment pattern is required for a safe launch, that requirement must be disclosed early. Hidden mandatory spend discovered late in the process will count against the bid.




### Supplemental Due-Diligence Checklist
The buyer will use a final due-diligence checklist to validate that written claims can be supported in practice. Respondents should therefore be prepared to supply sample architecture artifacts, control narratives, operating runbooks, release notes, incident templates, escalation matrices, access-control evidence, reconciliation examples and anonymized implementation plans. The purpose of that review is not bureaucracy for its own sake. It is to confirm that the proposed platform can be owned inside a regulated operating model after the sales cycle ends.

In that review, the buyer will test whether documentation is coherent across functions. Procurement will look for explicit assumptions, priced dependencies and contract-ready service boundaries. Security will look for hard evidence on key management, administrative control, vulnerability management, logging, monitoring and incident response. Compliance and legal will look for clean allocation of regulatory duties, support for audit and regulator requests, and clarity on data handling, outsourcing and cross-border servicing. Operations will look for repeatable day-two processes with clear escalation and low manual fragility. Engineering and architecture will look for stable APIs, workable environments, version control over integrations, and a realistic migration path.

The buyer will also ask how the product behaves under real operational pressure. That includes partial dependency failure, delayed confirmations, repeated submissions, stale reference data, invalid instructions, rollback conditions, end-of-day breaks, and user-error scenarios. Respondents should explain not merely that the platform is resilient, but how a controller, operator, platform engineer or on-call responder would detect the problem, triage it, contain customer impact, restore service and produce evidence afterward. The strongest responses make these mechanics obvious.

Another focus area will be internal ownership after launch. Buyers in this segment do not want a vendor-managed black box that only the supplier can understand. They want a platform that internal product, operations, risk, compliance and engineering teams can supervise with confidence. That means configuration should be traceable, permissions should be granular, reports should be exportable, interfaces should be documented, and routine changes should not require a consulting engagement. Where specialist vendor support is required, the response should describe precisely when, why and at what cost.

Finally, the buyer will view transparency as a competitive advantage. If there are constraints on jurisdiction rollout, supported assets, throughput, partner dependencies, settlement patterns, token standards, key-management options, support hours or roadmap timing, say so. Serious institutions can work with clearly stated limits. What they do not tolerate well is discovering late in the process that a supposedly ready platform depends on hidden assumptions, undocumented manual steps or a commercial model that changes once implementation begins.




### Final Delivery Credibility Statement
For shortlist purposes, bidders should provide a final synthesis covering implementation confidence, dependency transparency, support readiness, control completeness and the buyer tasks required for a safe launch. The intent is to force a plain-English answer to the central question: can this platform be deployed for real in a regulated environment without surprise architecture debt, surprise operating cost or surprise control gaps. Responses that answer that question directly will score better than responses that repeat marketing language.

The buyer also expects an explicit statement on long-term maintainability. That includes how new product variants are introduced, how regression risk is controlled, how audit evidence remains accessible over time, how exit and migration would work if strategy changes, and what happens if one of the material third-party dependencies must be replaced. These are not theoretical concerns. They are standard procurement concerns in serious financial institutions and fintechs operating at scale.




### Final Bank-Specific Award Confirmation
The issuing bank expects the bidder to close its response with a concise but evidence-backed confirmation that the proposed solution is suitable for institutional deployment, integrates with existing capital-markets and control infrastructure, and can be governed under the bank's existing risk, compliance, security and procurement framework. This confirmation should not repeat marketing claims. It should summarize what is live now, what is configuration-led, what depends on third parties, what the bank must do internally, and what the main delivery risks are. That summary is important because large-bank procurement decisions are rarely blocked by a single feature gap; they are blocked by ambiguity around ownership, integration, accountability and control durability.

The bank will therefore look favorably on proposals that make implementation risk legible, show respect for regulated change processes and describe a sustainable operating model after go-live. Vendors should assume that the winning response will be the one that feels most executable, most transparent and least likely to create hidden operational debt for the sponsoring business, operations and control teams.




### Closing Procurement Note
The bank expects direct, evidence-based responses and will treat clarity on scope, controls, dependencies, delivery effort and support obligations as a positive differentiator. A proposal that is slightly narrower but operationally credible will outrank a broader response that leaves important ownership, integration or compliance questions unanswered.




### Evaluation Reminder
The bank reserves the right to prefer the proposal that is most controllable, supportable and integration-ready, even where another proposal claims broader future optionality.




The bank's final review will favor responses that demonstrate operational honesty, dependency transparency and strong alignment with institutional governance, because those traits usually matter more in production than presentation polish. Vendors should assume the written response will be tested against architecture review, security review, procurement review and day-two support expectations.




The bank's final review will favor responses that demonstrate operational honesty, dependency transparency and strong alignment with institutional governance, because those traits usually matter more in production than presentation polish. Vendors should assume the written response will be tested against architecture review, security review, procurement review and day-two support expectations.


## Appendices

### Appendix A: Glossary
- **Asset lifecycle**: The full sequence from setup and issuance through transfer, servicing, reconciliation, reporting and retirement.
- **Maker-checker**: A control pattern requiring separate initiation and approval roles.
- **Golden source**: The authoritative system of record for a data element or event.
- **ISO 20022**: Financial messaging standard used for structured data exchange.
- **Operational resilience**: The ability to prevent, adapt, respond to, recover and learn from operational disruptions.
- **Tamper-evident log**: A record design intended to reveal unauthorized modification.

### Appendix B: Response Template
Respondents should structure their submission as follows:
1. Executive summary
2. Company profile and relevant references
3. Response to scope and use cases
4. Completed requirement matrices
5. Architecture and deployment model
6. Security and compliance response pack
7. Implementation and operating model
8. Commercial proposal or indicative pricing
9. Assumptions, dependencies and exclusions
10. Roadmap items clearly marked as non-committed where applicable

### Appendix C: Compliance Checklist
| Item | Vendor Response (Yes/No/Partial) | Comments |
|---|---|---|
| Productized platform offering exists today |  |  |
| Relevant financial services references available |  |  |
| API and integration documentation available |  |  |
| Role-based access controls and audit logs supported |  |  |
| Data residency and privacy controls documented |  |  |
| DR and availability model documented |  |  |
| Pricing assumptions clearly stated |  |  |
| Roadmap items explicitly identified |  |  |
| Exit and data portability approach documented |  |  |
| Support model and SLA position provided |  |  |
