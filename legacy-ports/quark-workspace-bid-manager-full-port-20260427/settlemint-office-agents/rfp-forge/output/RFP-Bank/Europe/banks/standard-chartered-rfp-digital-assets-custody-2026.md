---
institution: Standard Chartered
country: United Kingdom
document-type: rfp
asset-class: digital-assets-custody
date: 2026-03-14
version: v1.0
reference: SCB-2026-001
---

# Request for Proposal: Institutional Digital Asset Custody Platform

## Section 1: Context, Scope, and Timeline

### 1.1 Issuing Organization
Standard Chartered serves corporate, institutional and investor clients across multiple international corridors, with particular strength in cross-border banking, transaction services and trade-related flows. The Bank is evaluating digital asset infrastructure where it can support institutional client business under a robust control framework consistent with UK prudential expectations and the realities of a globally distributed operating model. Core drivers include secure custody and safekeeping of eligible digital assets for institutional use cases, improved control over entitlement records and operational risk, and the ability to support future tokenized trade finance instruments where document, payment and collateral workflows may converge. The Bank requires industrial controls, not innovation theatre.

From the Bank's perspective, any selected solution must fit within existing governance lines across business, operations, risk, information security, legal, compliance and internal audit. The Bank is not seeking an isolated innovation tool. It is seeking a platform or platform-led solution capable of controlled deployment into an institutional environment with clear accountability, evidence retention and operational continuity. Respondents should therefore assume scrutiny not only from business sponsors but also from architecture, resilience, procurement, security and supervisory liaison functions.

Respondents shall address UK PRA/FCA expectations, FCA financial promotions and custody perimeter considerations where relevant, UK GDPR, DORA equivalence considerations for international resilience posture, AML/CFT and sanctions obligations, outsourcing controls, auditability and legal enforceability across jurisdictions typically served by the Bank.

### 1.2 Scope and Key Scenarios
This RFP covers enterprise custody capabilities for eligible digital assets, including secure key management integration patterns, entitlement and ledger record keeping, segregation models, policy-based approvals, transfer workflows, reconciliations, corporate action support where relevant, reporting and audit evidence. The procurement is not for a retail wallet platform or ungoverned access to public crypto venues.

The Bank expects respondents to address realistic operating scenarios. These include primary issuance or onboarding event preparation, eligibility and transfer controls, lifecycle servicing, exception handling, reconciliations across systems of record, regulatory and management reporting, and contingency procedures when dependencies are unavailable. Respondents shall clearly state which scenarios are natively supported, which require configuration, which depend on third-party components and which are not currently supported.

The following items are generally out of scope unless specifically proposed as optional: retail customer-facing wallets, public marketing to consumers, unmanaged use of permissionless infrastructure, speculative trading workflows, and features that would require the Bank to assume undefined legal or operational perimeter risk. Where respondents believe an adjacent use case is strategically relevant, it may be described in a clearly marked optional section.

### 1.3 Timeline and Submission
The Bank intends to run a structured procurement with document review, clarification rounds, demonstrations, security due diligence and final commercial negotiation. This RFP is intended to support vendor selection for a formal implementation programme. Respondents must therefore provide committed answers against mandatory requirements, identify assumptions, and disclose any gaps requiring roadmap, partner or custom development dependencies.

All submissions must be delivered in English; French, German or Italian annexes may be appended where directly relevant to regulatory analysis or local operating procedures. Responses must include a completed requirement matrix, a description of standard product capability versus bespoke work, a delivery and governance model, security and compliance information, and commercial assumptions or indicative pricing. The Bank reserves the right to reject incomplete submissions, request clarifications, shorten or extend timelines, and terminate the process without award.

| Milestone | Date |
| --- | --- |
| Issue date | 2026-03-14 |
| Intent to respond / participation notice | 2026-03-27 |
| Deadline for written questions | 2026-04-10 |
| Bank responses to questions | 2026-04-24 |
| Submission deadline | 2026-05-22 |
| Demonstrations / workshops | 2026-06-08 to 2026-06-26 |
| Evaluation outcome / next-step notice | 2026-07-10 |
| Indicative mobilisation / next phase | 2026-09-01 |

Respondents should submit one consolidated PDF response and one editable spreadsheet containing requirement traceability and pricing. Any assumption affecting legal structure, data location, cryptographic controls, subcontracting, regulated activity boundaries or operational staffing must be stated explicitly. For RFP responses, shortlisted bidders should expect demonstrations aligned to bank-defined scenarios and due-diligence reviews covering security, architecture, resilience, legal terms and referenceability.

## Section 2: Requirements Core

### 2.1 Business Requirements
The Bank requires a solution that supports the full business lifecycle of the target asset class with appropriately controlled workflows, clear status visibility and limited operational friction. At a minimum, respondents should describe how the platform handles initiation, approval, issuance or onboarding, position maintenance, event servicing, exception management and end-of-life or redemption processing. Particular emphasis should be placed on how business users interact with the platform, how approvals are evidenced, how exceptions are escalated and how policy rules are configured without creating uncontrolled technical dependencies.

For this procurement, the Bank expects business process flexibility without loss of control. The solution should support different operating roles, approval layers, internal and external participant interactions, and a disciplined model for legal documentation and product metadata. Respondents should explain whether workflow rules are configurable by trained administrators, what limitations exist, and how changes are governed across test and production environments.

| ID | Requirement description | Priority |
| --- | --- | --- |
| SCB-B1 | Support controlled creation, approval and release of the target asset lifecycle with configurable maker-checker controls. | Mandatory |
| SCB-B2 | Provide investor or participant eligibility rules aligned to jurisdiction, product and distribution constraints. | Mandatory |
| SCB-B3 | Support lifecycle servicing events including distributions, redemptions, transfers, amendments and exceptions. | Mandatory |
| SCB-B4 | Provide operational dashboards, exception queues and status tracking for front-to-back teams. | Scored |
| SCB-B5 | Support configurable metadata and document linkage for legal, operational and reporting artefacts. | Scored |
| SCB-B6 | Enable scenario-based simulation or test workflows before production release of new products. | Desirable |

Responses should identify any assumptions relating to investor classification, participant onboarding, payment rails, transfer rules, registry model, corporate action processing and reporting frequency. For this RFP, respondents must distinguish clearly between standard product capability, implementation configuration and material custom development.

### 2.2 Technical/Deployment Requirements
The Bank expects an architecture suitable for enterprise deployment, with strong environment segregation, repeatable configuration management and well-documented integration patterns. Solutions may be SaaS, managed service or bank-controlled deployment, provided the respondent clearly explains operational boundaries, data handling, resilience design, maintenance responsibilities and any jurisdictional constraints. Preference will be given to solutions that minimise operational complexity while preserving sufficient control for regulated bank operations.

Respondents must describe supported deployment topologies, infrastructure prerequisites, encryption approach, identity and access integration, secrets/key management dependencies, observability, backup and recovery design, release management and test support. The Bank expects compatibility with established technology governance and does not intend to accept opaque black-box dependencies that cannot be adequately assessed by architecture and security teams.

| ID | Requirement description | Priority |
| --- | --- | --- |
| SCB-T1 | Expose documented APIs and event interfaces suitable for enterprise integration and automation. | Mandatory |
| SCB-T2 | Support deployment patterns compatible with bank-controlled hosting and segregated environments. | Mandatory |
| SCB-T3 | Provide comprehensive audit logs, configuration history and environment-specific controls. | Mandatory |
| SCB-T4 | Support integration with IAM, key management, monitoring and enterprise workflow tooling. | Scored |
| SCB-T5 | Provide non-functional evidence for scalability, resilience and performance under peak event loads. | Scored |
| SCB-T6 | Offer migration tooling for reference data, positions, static data or configuration baselines. | Desirable |

Key integrations include custody operations, IAM and privileged access systems, HSM / key management environments, SWIFT and payment engines, sanctions/screening, trade processing systems, collateral platforms, client reporting warehouses, SOC tooling and enterprise workflow/orchestration layers. Where third-party managed components are required, respondents must specify which party operates them, how incidents are handled, and what evidence can be supplied to satisfy internal security review and outsourcing governance.

### 2.3 Security/Compliance Requirements
Security and regulatory suitability are mandatory evaluation domains. The Bank expects respondents to demonstrate how the solution supports least-privilege administration, strong authentication, tamper-evident or immutable audit trails where appropriate, evidence export, incident detection, vulnerability management, retention controls and secure configuration practices. Solutions must support disciplined segregation of duties and provide sufficient transparency for independent review by internal control functions.

Regulatory alignment is not limited to a generic statement of compliance. Respondents should explain how the proposed platform supports obligations arising from the Bank's product perimeter, jurisdiction, outsourcing posture and reporting expectations. This includes data protection, log retention, legal hold, cross-border transfer controls, operational resilience, sanctions or AML/KYC integration points and support for supervisory inquiries or forensic review.

| ID | Requirement description | Priority |
| --- | --- | --- |
| SCB-S1 | Support role-based access control, least privilege and segregation of duties across administration and operations. | Mandatory |
| SCB-S2 | Provide immutable or tamper-evident audit evidence for critical actions and lifecycle events. | Mandatory |
| SCB-S3 | Support data residency, retention and deletion controls aligned to GDPR and local obligations. | Mandatory |
| SCB-S4 | Support security monitoring, incident investigation and evidence export to bank SOC tooling. | Scored |
| SCB-S5 | Demonstrate operational resilience and third-party risk controls consistent with DORA or equivalent expectations. | Scored |
| SCB-S6 | Provide independent assurance artefacts and vulnerability-management processes. | Desirable |

Respondents shall address UK PRA/FCA expectations, FCA financial promotions and custody perimeter considerations where relevant, UK GDPR, DORA equivalence considerations for international resilience posture, AML/CFT and sanctions obligations, outsourcing controls, auditability and legal enforceability across jurisdictions typically served by the Bank. Respondents should disclose any known control gaps, roadmap dependencies or jurisdictional limitations. Evidence such as certifications, assurance reports, penetration testing summaries and secure development lifecycle documentation may be attached as appendices.

### 2.4 Integration and Interoperability
The target solution must coexist with a heterogeneous bank landscape that includes core systems of record, workflow tooling, payments or securities messaging infrastructure, identity services, archives, data warehouses and control-system integrations. The Bank expects open and well-documented interfaces, support for event-driven and batch patterns, clear handling of idempotency and reconciliation, and a transparent approach to message/state versioning across environments.

Respondents should address support for REST or equivalent APIs, file-based interfaces where unavoidable, webhook or event streaming options, reference-data synchronisation, and alignment to standards such as ISO 20022 where relevant to the target use case. Interoperability with established custody, payment, transfer agency, fund accounting or debt capital markets processes shall be explained using realistic end-to-end scenarios rather than generic architecture diagrams alone.

The Bank also requires a clear stance on data portability. Respondents must explain how master data, participant data, configuration, transaction history, position records, event history and audit artefacts can be exported if the Bank elects to migrate or wind down the service. Open standards, documented schemas and reversible operating choices will be viewed favourably.

### 2.5 Operational Requirements
The Bank expects a mature operating model covering implementation, transition to business-as-usual, release governance, support, incident management, problem management, capacity planning and periodic control review. Respondents shall describe standard service levels, support hours, target response and restoration times, release cadence and emergency-change controls. The Bank will prefer vendors that can support predictable change without requiring frequent high-risk interventions.

We require follow-the-sun support capability, strong release governance, documented break-glass procedures, attestation packages suitable for control functions, and training tailored for custody operations, cyber, risk, legal and client service teams. Respondents shall indicate the level of support available during critical events such as issuance dates, payment windows, maturity events, period-end reporting or contingency recovery exercises. Documentation must be suitable for business users, support teams, architects, security reviewers and auditors.

The Bank also expects a structured training plan including administrator enablement, operational runbooks, control-owner briefings and knowledge transfer for internal support teams. For this RFP, bidders must provide an implementation staffing model, named governance roles and a realistic estimate of Bank-side participation required during delivery and BAU transition.

## Section 3: Qualification, Pricing, and Evaluation

### 3.1 Qualification Gates
The following qualification gates will be used to determine whether a respondent proceeds to detailed evaluation. Failure to satisfy a mandatory gate may result in disqualification at the Bank's sole discretion.

| Gate | Minimum threshold | Assessment |
| --- | --- | --- |
| Corporate standing | Bidder must be a legally established entity with at least three years of audited operations in enterprise software or financial infrastructure. | Pass / Fail |
| Financial capacity | Bidder must provide audited financials or equivalent evidence demonstrating ability to support a multi-year programme. | Pass / Fail |
| Referenceability | Bidder must provide at least two relevant institutional references or explain why references are unavailable in this market segment. | Pass / Fail |
| Control environment | Bidder must evidence information security governance, vulnerability management and incident response processes. | Pass / Fail |
| Regulatory awareness | Bidder must demonstrate familiarity with the regulatory perimeter described in this document. | Pass / Fail |

The Bank may request additional information, clarifications or evidence for any qualification gate. Reference calls, architecture workshops, security questionnaires and financial due-diligence checks may be conducted for shortlisted respondents. For consortium or prime-subcontractor arrangements, the Bank expects clear contractual accountability and transparent disclosure of delivery boundaries.

### 3.2 Pricing Structure
Shortlisted bidders must provide firm pricing valid for at least 180 days from submission and structured to support total-cost-of-ownership comparison across a five-year horizon.

| Cost Category | Bidder Pricing Instruction |
| --- | --- |
| Software / subscription | Recurring license or subscription fees, metrics used, environment assumptions and minimum commitments. |
| Implementation services | Configuration, integration, testing, documentation, migration and project management costs. |
| Third-party components | Hosting, key management, data services, messaging or subcontractor costs where applicable. |
| Support and maintenance | Business-as-usual support tiers, premium support options and change-window assumptions. |
| Optional items | Training packages, accelerators, reporting packs, disaster-recovery services or managed operations. |

Pricing responses must distinguish mandatory scope from optional components and identify any costs dependent on transaction volume, number of entities, environments, asset classes, participants, integrations, premium support or third-party services. The Bank reserves the right to normalise pricing for evaluation purposes where bids use materially different commercial assumptions.

### 3.3 Evaluation Criteria
Detailed evaluation will combine written response scoring, scenario-based review, demonstrations, due diligence and commercial assessment.

| Criterion | Weight | Assessment focus |
| --- | --- | --- |
| Functional fit | 30% | Coverage of business scenarios, lifecycle support and control model. |
| Technical architecture and integration | 20% | Alignment to enterprise architecture, interoperability and implementation practicality. |
| Security, compliance and resilience | 20% | Evidence of control design, assurance and regulatory suitability. |
| Delivery model and operating support | 15% | Implementation approach, support model, training and long-term viability. |
| Commercials / indicative economics | 15% | Total cost clarity, pricing logic and value relative to scope. |
| Market insight and innovation practicality | — | For RFI responses, quality of insight and realism of proposed operating model. |

The Bank's evaluation process is expected to include: (i) completeness screening; (ii) pass/fail qualification review; (iii) weighted scoring of the written submission; (iv) clarification rounds; (v) scenario demonstrations or workshops for shortlisted respondents; and (vi) final recommendation or market-assessment summary. The Bank may adjust the process to reflect response quality, internal priorities or supervisory developments.

Respondents should note that the Bank values realism over marketing claims. Unsupported statements, ambiguous answers, or excessive reliance on future roadmap commitments may reduce scores even where feature descriptions appear attractive on paper. The preferred respondent will be the one that best combines control, practicality, implementation credibility and long-term operating fit.



### Expanded Company-Specific Context
Standard Chartered expects bidders to anchor their response in the buyer's actual strategic posture rather than reuse a generic tokenization template. Standard Chartered has significant digital asset exposure through ventures and partnerships such as Zodia and Libeara, along with broader work in tokenized trade finance, custody and institutional digital market infrastructure. A realistic buyer would expect respondents to know that Standard Chartered cares about cross-border network effects, institutional custody, regulated market access and disciplined risk segregation. In practical terms, that means the proposed platform must support institutional-grade digital-asset issuance, servicing, settlement, reporting and control workflows while fitting into trade finance systems, custody and safekeeping, correspondent banking and payments, treasury, corporate channels, screening and surveillance tools, and global support operations. The bank or fintech will not score a response well if the digital-asset layer becomes a sidecar disconnected from existing books and records, operations controls, treasury workflows, or regulator-facing reporting.

The issuing team also expects bidders to recognize the buyer's governance model. relevant leaders include transaction banking, custody, innovation, digital assets, risk, cyber and operations stakeholders. This has two consequences. First, proposals must explain how the platform supports board-level oversight, architecture review, risk sign-off and third-party control testing before production launch. Second, vendors must show how implementation can proceed without creating a long tail of manual exceptions that move risk into operations rather than remove it.

From a procurement standpoint, evaluation will likely emphasize multi-jurisdiction control design, partner risk management and ability to support global client franchises. Proposals should therefore describe not just target-state functionality but also the migration path from current-state processes, including coexistence with legacy systems, phased onboarding of products or jurisdictions, and rollback or containment measures if external dependencies fail.

### Regulatory and Jurisdictional Context
The regulatory perimeter for this procurement is shaped by FCA, PRA and multiple cross-border regulators; EEA service extension must align with MiCA and DORA where relevant. Where the proposed operating model involves crypto-asset issuance, trading, custody, settlement or payment functionality in the EEA, respondents must explain how MiCA obligations are allocated across the buyer, the platform provider and any custody, exchange, wallet, payment or reserve-management partners. The buyer does not want hand-waving about regulatory coverage; it wants a control map that identifies which legal and operational obligations remain with the institution and which are facilitated by the proposed platform.

DORA and broader operational-resilience obligations are equally important. Respondents should explain resilience testing, incident classification, third-party ICT dependency oversight, evidentiary logging, vulnerability management, and disaster recovery in a way that would survive review by internal cyber, operational resilience and procurement risk teams. For UK institutions, the answer must also align with the UK's operational-resilience and outsourcing regime. For Swiss or cross-border operating models, respondents must distinguish local supervisory expectations from EU-facing service obligations.

The buyer also expects a precise answer on privacy, data residency and cross-border support access. Proposals should state what personal data or customer-linked metadata is processed, where it resides, how deletion and retention work, how evidentiary records are preserved, and how administrative access is governed during business-as-usual operations and incident response. This is non-negotiable for shortlist consideration.

### Detailed Use Cases and Technical Depth
For this procurement, bidders should assume that the first live use cases will be concrete rather than experimental. At minimum, the target operating model should support institutional-grade digital-asset issuance, servicing, settlement, reporting and control workflows. The proposed platform should show how configuration, approvals, ledger updates, settlement instructions, exception handling and reporting are orchestrated across those use cases without requiring brittle one-off customization for each product or jurisdiction.

A strong response will explain the buyer journey and the operator journey separately. On the buyer or issuer side, product owners need configuration controls, approval workflows, rule-based restrictions and full visibility into lifecycle status. On the operator side, support and operations teams need reconciliation dashboards, queue and retry transparency, clear exception states, audit evidence, and deterministic recovery procedures. On the control-function side, compliance and risk teams need policy enforcement, exportable records, entitlements visibility and evidence that the system can be supervised without direct vendor intervention.

Respondents should also explain how the platform integrates with external market infrastructure or partner dependencies where relevant. That may include custodians, CSDs, payment systems, correspondent banks, sanctions providers, market-data feeds, wallet / key-management providers, transfer agents, registrar services, digital cash rails or smart-contract monitoring tooling. The buyer will treat dependency transparency as a strength, not a weakness; hidden dependencies are what kill deals.

### Integration Expectations for Existing Infrastructure
The solution must interoperate cleanly with the buyer's established control estate. That includes trade finance systems, custody and safekeeping, correspondent banking and payments, treasury, corporate channels, screening and surveillance tools, and global support operations. Vendors should describe canonical data models, API contracts, event-taxonomy design, idempotency controls, batch and streaming interfaces, and how reconciliation breaks are surfaced and resolved. If the proposed platform maintains its own ledger, respondents must explain how golden-source boundaries are defined and how downstream finance, risk and regulatory systems consume authoritative records.

Where asset servicing or payment finality depends on external rails, the response should describe status synchronization, settlement confirmation, replay handling and cutoff management in practical terms. The buyer expects clear maker-checker and four-eyes patterns for operationally sensitive actions such as asset creation, rule changes, minting or issuance events, investor-permission changes, collateral substitutions, corporate-action execution, and privileged administrative overrides.

Implementation plans should include non-production environment design, test-data strategy, migration sequencing, cutover checkpoints and rollback paths. Sandbox quality matters, but realistic integration testing matters more. The selected vendor will be expected to support SIT, UAT, dress rehearsals and post-go-live stabilization using an evidence-based approach rather than aspirational milestone slides.

### Expanded Evaluation Considerations
In addition to the baseline scoring model already set out in this document, the buyer will place explicit emphasis on five company-specific questions. First, does the proposed platform fit the institution's real control model rather than forcing a parallel digital-only operating structure? Second, can the platform support the immediate use case of institutional-grade digital-asset issuance, servicing, settlement, reporting and control workflows while creating optionality for adjacent workflows? Third, are regulatory responsibilities and third-party dependencies described with enough precision to withstand compliance and procurement review? Fourth, can the buyer's internal engineering and operations teams own the platform day to day without permanent vendor dependency? Fifth, is the commercial model transparent enough to remain viable after expansion to new products, legal entities or markets?

For scoring purposes, the buyer may use indicative sub-weightings within existing sections. Functional fit may prioritize lifecycle completeness, exception handling and configuration depth. Technical architecture may prioritize API quality, integration traceability, observability and deployment repeatability. Security and compliance may prioritize evidence generation, data-governance clarity, operational resilience and outsourced-service governance. Delivery credibility may prioritize referenceable implementations, realistic staffing, cutover discipline and post-launch support. Commercial assessment will consider not just headline price but cost predictability, scaling economics and exit portability.

Because this is a RFP, respondents should provide binding delivery commitments, implementation sequencing and contractual assumptions. The buyer expects committed pricing and explicit implementation assumptions because this is an RFP.

### Delivery, Migration and Operational Readiness
The buyer expects the selected vendor to provide a practical implementation path consisting of discovery and control mapping, detailed design, integration build, environment hardening, testing, migration or initial onboarding, go-live readiness and hypercare. Responses should identify which activities are product-native, which require configuration, which require partner work and which require buyer-owned engineering or operational change. Any activity that depends on a future roadmap item should be called out plainly.

Operational readiness should cover service ownership, support boundaries, incident escalation, change windows, release governance, configuration promotion, key or secret rotation, reconciliation monitoring and evidence retention. The buyer will favor platforms that can be operated through documented runbooks, role-based access controls and product-native telemetry rather than hidden vendor admin playbooks. Training must be role-specific and should include administrators, operations analysts, control functions, security responders and audit stakeholders.

Finally, the response should describe exit and continuity planning. Data export, configuration portability, audit-log preservation, historical-report retention and dependency transition assistance are part of the procurement discussion from day one. Buyers in this segment are not willing to accept architectural lock-in disguised as innovation.




### Additional Technical Requirement Expansion
To make responses comparable, Standard Chartered expects bidders to address the following detailed capability areas explicitly in narrative form even where no separate spreadsheet row exists. For institutional-grade digital-asset issuance, servicing, settlement, reporting and control workflows, the platform must demonstrate product setup controls, rule-based participant eligibility, event sequencing, immutable or tamper-evident history, reconciliation between internal and external states, and operational recovery mechanisms that do not depend on undocumented vendor intervention. The buyer expects a precise description of how a transaction moves from initiation to final posting, where approvals occur, how rejected or timed-out events are surfaced, and how downstream records are corrected when upstream events are replayed or canceled.

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
To support a realistic comparison, Standard Chartered expects each respondent to address the following scenarios in direct prose rather than one-line matrix answers. Scenario one covers day-one setup: how the platform is configured for institutional-grade digital-asset issuance, servicing, settlement, reporting and control workflows, how approval policies are established, how roles are assigned, how test and production environments are separated, and how operational evidence is captured from the first transaction onward. Scenario two covers day-two operations: how normal processing, cutoff management, exception queues, break resolution, reconciliations, fee calculations, customer or counterparty communication, and audit-log review are handled. Scenario three covers stress or failure conditions: dependency outages, partial settlement, stale market data, delayed confirmations, duplicate submissions, failed signatures, policy breaches, sanctions hits, rollback events, and emergency change restrictions.

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




The bank's final review will favor responses that demonstrate operational honesty, dependency transparency and strong alignment with institutional governance, because those traits usually matter more in production than presentation polish. Vendors should assume the written response will be tested against architecture review, security review, procurement review and day-two support expectations.


## Appendices

### Appendix A: Glossary
| Term | Definition |
| --- | --- |
| AML/CFT | Anti-money laundering and counter-terrorist financing controls. |
| DORA | EU Digital Operational Resilience Act. |
| GDPR | General Data Protection Regulation. |
| ISO 20022 | Financial messaging standard used across payments and securities processes. |
| KYC | Know-your-customer due diligence and ongoing review. |
| SLA | Service-level agreement for availability, support and restoration obligations. |

### Appendix B: Response Template
| Response Section | Bidder Instruction |
| --- | --- |
| Vendor profile | Corporate structure, regulated entities, delivery locations, subcontractors. |
| Solution overview | Description of product, deployment model, functional modules and roadmap dependencies. |
| Control mapping | Response against each requirement, including evidence references and assumptions. |
| Implementation view | Indicative plan, dependencies, roles, migration and test approach. |
| Commercials | Pricing template, commercial assumptions, license metrics and professional service boundaries. |

### Appendix C: Compliance Checklist
| Checklist Item | Bidder Response | Notes |
| --- | --- | --- |
| Provide full response to mandatory requirements | Yes / No / Partial | Responses marked Partial shall identify gap closure approach and timeline. |
| Identify all subcontractors and hosting dependencies | Yes / No | Material subcontractors must be disclosed. |
| Disclose information security certifications or equivalent assurance | Yes / No | Attach latest reports or attestations where available. |
| Provide regulatory and legal assumptions | Yes / No | Highlight jurisdictional limitations explicitly. |
| Confirm acceptance of bank due diligence and audit rights | Yes / No | Required for contract stage. |

