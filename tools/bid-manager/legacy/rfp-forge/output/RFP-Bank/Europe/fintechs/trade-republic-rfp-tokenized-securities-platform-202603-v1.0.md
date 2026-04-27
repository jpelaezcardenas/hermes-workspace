# Request for Proposal (RFP)

| Field | Value |
| --- | --- |
| Reference | `TRADE-REPUBLIC-RFP-TOKENIZED-SECURITIES-PLATFORM-202603` |
| Version | v1.0 |
| Issue date | March 2026 |
| Issuing organization | Trade Republic (Germany) |
| Procurement subject | Tokenized Securities Platform |
| Clarification deadline | 03 April 2026, 17:00 CET |
| Submission deadline | 24 April 2026, 17:00 CET |
| Response validity | 180 calendar days |
| Language | English |
| Currency | EUR unless otherwise stated |
| Contact point | trade-republic-procurement@issuer.example |
| Confidentiality | Confidential buyer-side procurement document |

## 1. Procurement Context

Trade Republic is running this procurement to select a platform and delivery partner for **tokenized securities platform**. The goal is not to buy a vague innovation story. The goal is to shortlist vendors that can get a production-grade service live quickly, integrate cleanly into an existing fintech estate, and operate under a regulatory model that can stand up to board, regulator, audit, and customer scrutiny.

The issuing team expects direct answers. Vendors should assume that evaluation will be driven by implementation realism, integration quality, control maturity, and credible time-to-market. Marketing language without evidence will not help. Responses should be written so product, engineering, compliance, and procurement reviewers can all score the same answer the same way.

Trade Republic operates as a retail investment platform centered on simple customer journeys, low-cost operations, and scalable brokerage infrastructure. That operating model shapes this RFP in practical ways: API quality matters more than slideware, operating overhead matters more than broad but shallow feature lists, and support for controlled expansion matters more than jurisdiction-agnostic claims. The selected vendor must fit into an environment where customer experience, automation, and resilience are all expected at the same time.

The initial business case centers on tokenized securities platform, but the evaluation will also consider whether the proposed architecture creates a reusable foundation for adjacent digital asset services. Vendors should therefore distinguish between the minimum production scope, near-term extension options, and capabilities that require substantial roadmap or partner dependency.
### 1.1 Objectives and success measures

- Deliver a production-ready capability for tokenized securities platform with measurable readiness for launch within 6-12 months of contract signature.
- Reduce integration friction by using documented APIs, eventing, webhooks, SDKs, and environment controls that can be adopted by internal engineering teams without bespoke workarounds.
- Establish a control framework that supports MiCA, DORA, GDPR, AML/CFT, internal risk governance, and audit evidence production.
- Provide a service model that internal product and operations teams can run day to day without a large permanent vendor dependency footprint.
- Support phased rollout by market, customer segment, asset class, and operating model while keeping ledgers, entitlements, and reporting consistent.

| Priority | Why it matters to buyer | Evidence expected from bidder |
| --- | --- | --- |
| Time to market | Competitive launch pressure and internal roadmap commitments | Delivery plan, reference architecture, sample implementation timeline |
| Developer experience | Internal teams need to own integration and operations quickly | API docs, webhook specs, SDK list, sandbox details |
| Control maturity | Launch cannot rely on control promises that collapse under audit | Policies, certifications, control mappings, sample evidence artifacts |
| Scalability | Retail fintech traffic and lifecycle volume can spike quickly | Performance benchmarks, scaling approach, SLOs, known limits |
| Commercial clarity | Total cost and operating model must be predictable | Pricing workbook, dependency disclosures, staffing assumptions |

### 1.2 In-scope domains and key scenarios

The solution must support the end-to-end business and operational scenarios required for tokenized securities platform. At minimum, the buyer expects support for customer onboarding hooks, asset setup and governance, transaction or order processing, ledger and entitlement updates, reconciliation, reporting, exception handling, and controlled rollout into new jurisdictions or customer segments.

The procurement scope includes application-layer services, workflow orchestration, ledger and entitlement logic, lifecycle event handling, APIs, security controls, deployment model, operational tooling, reporting, and implementation support. The scope also includes required dependencies on custody, wallet providers, chain infrastructure, market data, issuer workflows, and cash or treasury integrations where those dependencies are necessary for the target operating model.

The scope is not limited to a single screen or pilot workflow. Vendors should assume this will be reviewed as a platform decision with consequences for adjacent services. Proposals should therefore explain how the solution handles tokenized bonds, portfolio ledgers, order routing, investor reporting without fragmenting the operating model or creating separate manual back offices.
| Scenario | Minimum expectation | Response format |
| --- | --- | --- |
| Customer and account onboarding | Integration with KYC, eligibility, suitability, and customer account context | Describe current API/event support and configuration options |
| Asset and product setup | Controlled creation and governance of new products, parameters, and lifecycle rules | Provide workflow description and role model |
| Transaction processing | Deterministic handling of orders, transfers, subscriptions, redemptions, or settlement flows | Map processing stages and failure states |
| Reconciliation and reporting | Operational, finance, and compliance reporting with audit trail | Provide sample outputs and data extract options |
| Expansion path | Ability to extend beyond initial launch scope without full re-platforming | Explain supported patterns and known boundaries |

### 1.3 Timeline and submission basics

| Milestone | Date / expectation |
| --- | --- |
| RFP issue date | March 2026 |
| Deadline for clarifications | 03 April 2026, 17:00 CET |
| Buyer response to clarifications | 10 April 2026 |
| Submission deadline | 24 April 2026, 17:00 CET |
| Shortlist notification | 15 May 2026 |
| Deep-dive sessions and demos | Late May 2026 |
| Target award recommendation | June 2026 |
| Target implementation start | Q3 2026 |

- Submit one response package in searchable PDF plus native spreadsheet formats for pricing and response matrices.
- Label each requirement response as Supported, Supported with Configuration, Supported with Partner Dependency, Roadmap, or Not Supported.
- For any item marked Roadmap, state target release timing, dependency assumptions, and whether the capability is contractually commit-able.
- Include only material exceptions in a single deviations register. Hidden assumptions buried in narrative sections may be treated as non-compliant.
- Use the appendix templates in this document to keep answers comparable across bidders.
## 2. Scope

The selected vendor will be expected to deliver a production-capable solution aligned to the target operating model of Trade Republic. This means the bidder must cover both the visible product workflows and the underlying operational mechanics. A slick demo without ledger integrity, reconciliation, entitlement handling, environment controls, and evidence production is out of scope.

The buyer expects a phased approach. Phase 1 should establish the minimum viable production stack for tokenized securities platform. Phase 2 should harden and expand the service across additional customer cohorts, jurisdictions, or asset variants. Phase 3 should make reuse practical for adjacent products. Vendors should explain what is shipped in the product today, what is configured for this use case, and what requires partner augmentation.
### 2.1 Delivery scope and work packages

| Work package | Buyer expectation | Mandatory / scored |
| --- | --- | --- |
| Solution design | Target-state architecture, dependency map, environment plan, integration sequencing | Mandatory |
| Core platform capability | Native support for tokenized securities platform, including lifecycle and control workflows | Mandatory |
| Integration delivery | APIs, events, webhook handling, identity hooks, treasury/ledger connectivity, observability | Mandatory |
| Security and compliance setup | Role model, approvals, segregation of duties, logging, evidence, data controls | Mandatory |
| Testing and readiness | Sandbox, SIT/UAT support, performance testing, cutover support, rollback planning | Mandatory |
| Operational enablement | Runbooks, training, support model, incident handling, KPI/SLA framework | Scored |
| Expansion options | Path to adjacent asset types, new markets, or partner channels | Scored |

### 2.2 Business requirements

| ID | Requirement | Bidder response evidence |
| --- | --- | --- |
| BR-01 | Buyer requires configurable product and account workflows aligned to internal approval and release processes. | Narrative + config screenshots / examples |
| BR-02 | Buyer requires deterministic state transitions for each lifecycle event, with clear reversal and exception handling. | Process map + exception register |
| BR-03 | Buyer requires entitlement and balance accuracy across customer, omnibus, treasury, and reporting views. | Ledger model description |
| BR-04 | Buyer requires role-based operations with segregation between maker, checker, approver, and support roles. | Role matrix |
| BR-05 | Buyer requires configurable limits, risk controls, and customer eligibility rules per market and segment. | Rules engine description |
| BR-06 | Buyer requires automated notifications, event emission, and downstream integration triggers for material state changes. | Event catalog |
| BR-07 | Buyer requires business continuity processes for failed transactions, partial completion, and dependency outage scenarios. | Recovery workflow |
| BR-08 | Buyer requires audit-ready reporting covering activity, balances, entitlements, fees, and operational actions. | Sample report pack |
| BR-09 | Buyer requires phased rollout controls including feature flags, cohorting, and jurisdiction activation controls. | Release control description |
| BR-10 | Buyer requires support for adjacent services where reasonably reusable, without duplicating ledgers or control stacks. | Reuse and boundary statement |

### 2.3 Technical requirements

| ID | Requirement | Bidder response evidence |
| --- | --- | --- |
| TR-01 | REST and/or event-driven APIs must be fully documented, versioned, and suitable for internal developer onboarding. | API docs and versioning policy |
| TR-02 | Sandbox and non-production environments must support realistic testing with stable endpoints and seeded workflows. | Environment overview |
| TR-03 | Solution must expose webhook or event-stream patterns for business and operational events with retry logic. | Event delivery model |
| TR-04 | Identity and access integration must support SSO, RBAC, MFA, service accounts, and scoped credentials. | IAM architecture |
| TR-05 | Deployment model must disclose hosting pattern, region support, tenant isolation, and change-management process. | Deployment topology |
| TR-06 | Solution must provide observability across transactions, integrations, admin actions, and dependency health. | Monitoring and logging approach |
| TR-07 | Performance design must support peak retail traffic, background processing, and batch/reporting workloads. | Sizing assumptions and benchmark data |
| TR-08 | Data export and reporting interfaces must support downstream finance, compliance, and data platform use. | Data extract formats and latency |
| TR-09 | Platform upgrade process must allow controlled releases, rollback, and client communication for breaking changes. | Release management policy |
| TR-10 | Known limits, rate limits, chain or custody dependencies, and unsupported scenarios must be explicitly stated. | Constraints register |
| TR-11 | Buyer prefers infrastructure-as-code, environment automation, and repeatable configuration deployment. | Automation tooling description |
| TR-12 | Buyer requires documented incident and support interfaces, including status communication and escalation. | Support operations model |

### 2.4 Delivery and operating model requirements

- Implementation plan must identify buyer-owned tasks, bidder-owned tasks, third-party dependencies, and critical-path assumptions.
- Resource plan must include named or role-based staffing for architecture, implementation, testing, security, and post-go-live support.
- Operating model must clarify which day-two activities are self-service, which are vendor-assisted, and which are not supported.
- Support model must include severity definitions, response targets, escalation path, and planned maintenance communication practices.
- Training package must cover administrators, engineering teams, operations teams, and compliance reviewers.
- Change governance must define how new asset variants, new markets, or new partners are onboarded without destabilizing the live estate.
## 3. Technical Requirements

Trade Republic expects a solution architecture that can be integrated by an experienced product and engineering organization without turning every release into a bespoke consulting project. The chosen platform should expose stable primitives, keep domain boundaries understandable, and avoid hiding material operating assumptions behind service wrappers.

The bidder should assume that the buyer will test not only the existence of APIs and controls, but also how coherent they are. An architecture that technically supports the target use case but requires multiple operational consoles, manual reconciliations, or undocumented support intervention will score poorly. The point is to get a reliable service live fast and keep it operable when volume grows.
### 3.1 Architecture principles

- Composable services over opaque monoliths where that improves integration and operating clarity.
- Stable APIs and event contracts with explicit versioning, deprecation, and backward-compatibility guidance.
- Clear separation between customer-facing orchestration, control services, ledger state, and external dependencies.
- Operational transparency across processing state, queues, retries, reconciliation status, and dependency health.
- Support for buyer-controlled rollout, staged activation, and reversible changes where production safety requires it.
### 3.2 Detailed technical response matrix

| Topic | Required bidder explanation | Evidence standard |
| --- | --- | --- |
| API design | Describe endpoint organization, auth methods, pagination, idempotency, and error handling | Current capability only |
| Events and webhooks | Describe event taxonomy, delivery guarantees, replay support, and dead-letter handling | Current capability only |
| Ledger model | Describe ownership model, balance states, reservation/hold logic, and reconciliation mechanics | Current or configured |
| Wallet/custody dependencies | Describe native support and third-party dependencies, including failover boundaries | Current + dependency disclosure |
| Data model | Describe transaction, account, entitlement, and reporting entities and export formats | Current capability only |
| Identity/security | Describe SSO, RBAC, MFA, secret handling, and administrative action logging | Current capability only |
| Performance | State tested throughput, latency envelopes, and volume assumptions | Benchmarks required |
| Environments | Describe sandbox, UAT, performance, and production separation | Current capability only |
| Release management | Explain release frequency, maintenance windows, rollback, and client notice process | Current capability only |
| Support tooling | Explain runbooks, dashboards, alerting, and incident interface | Current capability only |

### 3.3 Security and resilience requirements

| ID | Requirement | Expected evidence |
| --- | --- | --- |
| SR-01 | MiCA readiness for crypto-asset services delivered in the EEA, including governance, disclosures, outsourcing, complaints, and conduct obligations where applicable. | Policy / control description / sample evidence |
| SR-02 | DORA-aligned ICT risk management, third-party risk handling, incident escalation, resilience testing support, and operational reporting. | Policy / control description / sample evidence |
| SR-03 | GDPR compliance for personal data processing, cross-border transfer controls, retention, deletion, and subject-rights support. | Policy / control description / sample evidence |
| SR-04 | AML/CFT and sanctions workflow integration, including travel rule capability where relevant to the proposed operating model. | Policy / control description / sample evidence |
| SR-05 | Auditability for internal control, external assurance, and regulator review across configuration, transaction history, entitlements, and administrative actions. | Policy / control description / sample evidence |
| SR-06 | Bidder must document key management, secret handling, administrative access control, and privileged session monitoring. | Security architecture |
| SR-07 | Bidder must document incident detection, triage, customer communication, regulatory escalation support, and post-incident review. | Incident response runbook |
| SR-08 | Bidder must provide business continuity and disaster recovery targets, dependency assumptions, and test frequency. | BCP/DR summary |
| SR-09 | Bidder must provide vulnerability management, patching, penetration testing, and remediation governance details. | Security operations summary |
| SR-10 | Bidder must provide data lineage and evidence support for transaction reconstruction and audit review. | Audit evidence examples |

## 4. Regulatory

MiCA compliance is a core evaluation theme for this procurement. The buyer is not asking bidders to recycle generic legal disclaimers. The bidder should map the proposed operating model to the relevant regulatory perimeter, identify which controls are delivered by the platform, which controls remain with the buyer, and which controls require third-party service providers. Where the answer differs by jurisdiction or product structure, that difference must be made explicit.

The buyer also expects the proposal to explain how the service supports internal governance. That includes product approval, change control, incident escalation, complaints handling, outsourcing oversight, audit support, and regulator-facing evidence. A vendor that can only describe control intent in high-level terms will not meet the standard for shortlist consideration.
| Regulatory area | Buyer question to bidder | Required answer style |
| --- | --- | --- |
| MiCA | How does the proposed model align with crypto-asset service and issuance obligations relevant to the scope? | Control map + dependency statement |
| DORA | How are ICT risk, third-party risk, operational resilience, and major incident support handled? | Operating model + evidence list |
| AML/CFT | How do screening, monitoring, travel rule support, and case management integrate into the flow? | Workflow and integration narrative |
| Data protection | How are data minimization, residency, retention, deletion, and access requests supported? | Data handling summary |
| Audit and assurance | What logs, reports, approvals, and configuration history are available for review? | Evidence examples |
| Consumer protection | How can disclosures, approvals, product restrictions, and complaints workflows be supported? | Feature / workflow explanation |

### 4.1 Mandatory qualification gates

- Bidder must confirm current production support for the proposed service domain or provide clear evidence of a live equivalent deployment.
- Bidder must provide named implementation and support ownership, including escalation contacts and target service levels.
- Bidder must disclose subcontractors, hosted dependencies, wallet or custody dependencies, and critical third-party concentration points.
- Bidder must support documented API integration and provide sandbox or equivalent non-production environment access during evaluation.
- Bidder must accept that unqualified roadmap claims will be scored as not available for award purposes.
## 5. Commercial

The buyer wants commercial clarity early. Vendors should not hide major cost drivers in service descriptions or assume that implementation change requests will quietly absorb foreseeable scope. Pricing should reflect the complete minimum production scope, with explicit breakouts for one-time implementation, recurring platform or service charges, volume-based charges, third-party pass-throughs, environment charges, premium support, and optional modules.

The buyer will compare bids on total cost to launch and total cost to operate. Commercial flexibility is useful, but only if the price structure stays legible when volumes grow, new markets are added, or adjacent products are introduced. Pricing models that look cheap in a pilot but explode under live usage will be scored accordingly.
| Commercial topic | Bidder instruction |
| --- | --- |
| Implementation fees | Provide fixed-price or milestone-based pricing with assumptions and exclusions |
| Recurring fees | Provide annual or monthly charges by module, environment, user, tenant, or volume driver |
| Usage fees | Provide transaction, wallet, chain, custody, reporting, or support overage charges where applicable |
| Third-party costs | Identify any custody, market data, node, cloud, or messaging pass-through charges |
| Support levels | Price standard and premium support separately |
| Change requests | State day rates and governance for out-of-scope work |
| Contracting assumptions | State minimum term, notice, renewal, and exit assistance assumptions |

## 6. Evaluation

| Area | Weight | Scoring notes |
| --- | --- | --- |
| Functional and business fit | 25% | Coverage of scope, lifecycle completeness, and operational coherence |
| Technical architecture and developer experience | 25% | API quality, integration realism, environment quality, observability |
| Security, resilience, and regulatory readiness | 20% | MiCA, DORA, security operations, auditability, governance |
| Implementation and operating model | 15% | Delivery credibility, staffing, support, training, ownership clarity |
| Commercial model | 10% | Cost clarity, scalability, and value for scope |
| Strategic extension potential | 5% | Reuse potential for adjacent services without major rework |

Evaluation will be performed by a cross-functional team spanning Investment Platform, Operations, Product, Compliance, Engineering, Security. The buyer may request clarification sessions, architecture walkthroughs, control deep-dives, or reference calls. Scores may be adjusted where written responses are contradicted by demo evidence, undocumented dependencies, or unclear operating assumptions.

The buyer reserves the right to shortlist fewer than three bidders, to request a best-and-final offer, or to terminate the process if responses do not meet the minimum threshold. This RFP does not commit the buyer to award. That said, this is a live procurement. Vendors should assume the evaluation is serious and that unsupported claims will be noticed quickly.
## 7. Submission

- Submit one master response document using the section order of this RFP.
- Complete Appendix A response matrix and Appendix B pricing workbook in editable format.
- Include architecture diagrams, dependency maps, control mappings, and sample reporting artifacts.
- Include at least two relevant client references or equivalent live deployment examples, subject to confidentiality constraints.
- Identify one executive sponsor and one day-to-day bid lead for all clarification interactions.
- Do not submit alternate proposal structures that force the buyer to re-map your response manually.
| Submission component | Format |
| --- | --- |
| Master response | Searchable PDF |
| Requirement matrix | XLSX or CSV + PDF |
| Pricing workbook | XLSX + PDF |
| Architecture and security annexes | PDF |
| Reference list | PDF |
| Deviations register | Spreadsheet or appendix table |



### Expanded Company-Specific Context
Trade Republic expects bidders to anchor their response in the buyer's actual strategic posture rather than reuse a generic tokenization template. Trade Republic has built a large-scale retail investment platform and already offers crypto access. A tokenized securities or digital bond distribution procurement would realistically focus on extending low-cost retail distribution with stronger issuance connectivity, settlement efficiency, fractional access and controlled customer protections. In practical terms, that means the proposed platform must support institutional-grade digital-asset issuance, servicing, settlement, reporting and control workflows while fitting into brokerage platform, custody and settlement partner interfaces, customer experience systems, market data, AML/KYC, reporting and analytics. The bank or fintech will not score a response well if the digital-asset layer becomes a sidecar disconnected from existing books and records, operations controls, treasury workflows, or regulator-facing reporting.

The issuing team also expects bidders to recognize the buyer's governance model. brokerage product, operations, compliance, security and platform engineering leaders would influence the decision. This has two consequences. First, proposals must explain how the platform supports board-level oversight, architecture review, risk sign-off and third-party control testing before production launch. Second, vendors must show how implementation can proceed without creating a long tail of manual exceptions that move risk into operations rather than remove it.

From a procurement standpoint, the buyer will score against retail-scale performance, cost efficiency, clean partner integrations and product-governance transparency. Proposals should therefore describe not just target-state functionality but also the migration path from current-state processes, including coexistence with legacy systems, phased onboarding of products or jurisdictions, and rollback or containment measures if external dependencies fail.

### Regulatory and Jurisdictional Context
The regulatory perimeter for this procurement is shaped by BaFin, MiCA where applicable, DORA, investor-protection and custody rules. Where the proposed operating model involves crypto-asset issuance, trading, custody, settlement or payment functionality in the EEA, respondents must explain how MiCA obligations are allocated across the buyer, the platform provider and any custody, exchange, wallet, payment or reserve-management partners. The buyer does not want hand-waving about regulatory coverage; it wants a control map that identifies which legal and operational obligations remain with the institution and which are facilitated by the proposed platform.

DORA and broader operational-resilience obligations are equally important. Respondents should explain resilience testing, incident classification, third-party ICT dependency oversight, evidentiary logging, vulnerability management, and disaster recovery in a way that would survive review by internal cyber, operational resilience and procurement risk teams. For UK institutions, the answer must also align with the UK's operational-resilience and outsourcing regime. For Swiss or cross-border operating models, respondents must distinguish local supervisory expectations from EU-facing service obligations.

The buyer also expects a precise answer on privacy, data residency and cross-border support access. Proposals should state what personal data or customer-linked metadata is processed, where it resides, how deletion and retention work, how evidentiary records are preserved, and how administrative access is governed during business-as-usual operations and incident response. This is non-negotiable for shortlist consideration.

### Detailed Use Cases and Technical Depth
For this procurement, bidders should assume that the first live use cases will be concrete rather than experimental. At minimum, the target operating model should support institutional-grade digital-asset issuance, servicing, settlement, reporting and control workflows. The proposed platform should show how configuration, approvals, ledger updates, settlement instructions, exception handling and reporting are orchestrated across those use cases without requiring brittle one-off customization for each product or jurisdiction.

A strong response will explain the buyer journey and the operator journey separately. On the buyer or issuer side, product owners need configuration controls, approval workflows, rule-based restrictions and full visibility into lifecycle status. On the operator side, support and operations teams need reconciliation dashboards, queue and retry transparency, clear exception states, audit evidence, and deterministic recovery procedures. On the control-function side, compliance and risk teams need policy enforcement, exportable records, entitlements visibility and evidence that the system can be supervised without direct vendor intervention.

Respondents should also explain how the platform integrates with external market infrastructure or partner dependencies where relevant. That may include custodians, CSDs, payment systems, correspondent banks, sanctions providers, market-data feeds, wallet / key-management providers, transfer agents, registrar services, digital cash rails or smart-contract monitoring tooling. The buyer will treat dependency transparency as a strength, not a weakness; hidden dependencies are what kill deals.

### Integration Expectations for Existing Infrastructure
The solution must interoperate cleanly with the buyer's established control estate. That includes brokerage platform, custody and settlement partner interfaces, customer experience systems, market data, AML/KYC, reporting and analytics. Vendors should describe canonical data models, API contracts, event-taxonomy design, idempotency controls, batch and streaming interfaces, and how reconciliation breaks are surfaced and resolved. If the proposed platform maintains its own ledger, respondents must explain how golden-source boundaries are defined and how downstream finance, risk and regulatory systems consume authoritative records.

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
To make responses comparable, Trade Republic expects bidders to address the following detailed capability areas explicitly in narrative form even where no separate spreadsheet row exists. For institutional-grade digital-asset issuance, servicing, settlement, reporting and control workflows, the platform must demonstrate product setup controls, rule-based participant eligibility, event sequencing, immutable or tamper-evident history, reconciliation between internal and external states, and operational recovery mechanisms that do not depend on undocumented vendor intervention. The buyer expects a precise description of how a transaction moves from initiation to final posting, where approvals occur, how rejected or timed-out events are surfaced, and how downstream records are corrected when upstream events are replayed or canceled.

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
To support a realistic comparison, Trade Republic expects each respondent to address the following scenarios in direct prose rather than one-line matrix answers. Scenario one covers day-one setup: how the platform is configured for institutional-grade digital-asset issuance, servicing, settlement, reporting and control workflows, how approval policies are established, how roles are assigned, how test and production environments are separated, and how operational evidence is captured from the first transaction onward. Scenario two covers day-two operations: how normal processing, cutoff management, exception queues, break resolution, reconciliations, fee calculations, customer or counterparty communication, and audit-log review are handled. Scenario three covers stress or failure conditions: dependency outages, partial settlement, stale market data, delayed confirmations, duplicate submissions, failed signatures, policy breaches, sanctions hits, rollback events, and emergency change restrictions.

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


## 8. Appendices

### Appendix A. Response matrix template

| Column | Instruction |
| --- | --- |
| Requirement ID | Repeat the buyer requirement identifier exactly |
| Support status | Supported / Configured / Partner dependency / Roadmap / Not supported |
| Response summary | Short direct answer, max 150 words per row unless stated otherwise |
| Evidence reference | Document name, link, or appendix section |
| Dependencies | List product, service, partner, or buyer dependency |
| Notes / exceptions | State limitations, assumptions, or constraints clearly |

### Appendix B. Pricing workbook structure

| Tab | Purpose |
| --- | --- |
| Implementation | One-time setup and delivery fees |
| Recurring | Subscription, platform, and environment fees |
| Usage | Volume-based charges and scaling assumptions |
| Third-party | Pass-through or optional dependency costs |
| Support | Support packages and SLAs |
| Assumptions | Commercial assumptions, exclusions, and validity |

### Appendix C. Assumptions and dependencies register

| Category | Examples bidder should disclose |
| --- | --- |
| Buyer dependencies | Internal APIs, IAM systems, treasury systems, compliance tooling |
| Third-party dependencies | Custody, chain access, market data, sanctions, messaging |
| Jurisdiction constraints | Country-specific availability or licensing assumptions |
| Volume assumptions | Customer counts, transactions, concurrent sessions, reporting frequency |
| Operational assumptions | Support hours, staffing model, change windows |

### Appendix D. Clarification log

The buyer will maintain a clarification log and circulate material answers to all participating bidders.
