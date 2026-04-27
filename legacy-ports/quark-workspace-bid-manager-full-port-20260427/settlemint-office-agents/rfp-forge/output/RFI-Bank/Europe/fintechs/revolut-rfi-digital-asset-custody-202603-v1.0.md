# Request for Information (RFI)

| Field | Value |
| --- | --- |
| Reference | `REVOLUT-RFI-DIGITAL-ASSET-CUSTODY-202603` |
| Version | v1.0 |
| Issue date | March 2026 |
| Issuing organization | Revolut (United Kingdom) |
| Information request subject | Digital Asset Custody |
| Clarification deadline | 03 April 2026, 17:00 CET |
| Response deadline | 24 April 2026, 17:00 CET |
| Response validity | 120 calendar days |
| Language | English |
| Currency | EUR for indicative pricing |
| Contact point | revolut-market-scan@issuer.example |
| Status | Non-binding market inquiry |

## 1. Procurement Context

Revolut is conducting this RFI to understand the current vendor landscape for **digital asset custody**. This is a market and capability scan, not an award-ready procurement. The purpose is to compare what vendors can do today, what can be configured quickly, what depends on partners, and what is still roadmap.

The buyer wants direct, evidence-backed answers. The review team is especially interested in how vendors support fintech operating models where API integration speed, product flexibility, developer self-service, and compliance evidence all matter at once. Responses should help the buyer decide whether to move to a formal RFP, build-vs-buy analysis, or targeted proof-of-concept work.

Revolut operates as a consumer-first financial super-app with strong mobile distribution and cross-border customer base. That matters because the buyer is not looking for a one-off pilot platform with heavy manual support. The buyer wants to understand whether the market offers solutions that can plug into existing product and operational stacks while remaining realistic under MiCA-era controls, internal governance, and customer scale.
### 1.1 Themes under review

| Theme | What the buyer wants to learn |
| --- | --- |
| Capability maturity | How well vendors currently support digital asset custody and adjacent workflows |
| Integration model | How the platform fits into app, ledger, treasury, identity, and compliance stacks |
| Control model | How security, approvals, audit, and regulatory obligations are handled |
| Commercial shape | What indicative pricing, deployment effort, and dependency costs look like |
| Extension path | Whether the same foundation can support tokenized equities, tokenized ETFs, stablecoin funding, cash ledger sync over time |

### 1.2 Response legend

| Status label | Meaning |
| --- | --- |
| Current capability | Available in production today and supportable for live clients |
| Configured capability | Achievable with product configuration but not bespoke development |
| Partner-enabled capability | Requires named third-party solution or managed dependency |
| Roadmap | Planned but not currently available for production use |
| Not supported | Outside current platform capability |

### 1.3 Timeline and response instructions

- Use the response legend consistently across all sections.
- Keep answers concise, but provide enough evidence for a technical and compliance review.
- Where availability differs by region, client type, hosting model, or partner stack, say so clearly.
- Where a capability is partner-enabled, identify the partner type and the operational consequence.
- Indicative pricing should be directional and clearly marked as non-binding.
## 2. Scope

This RFI covers functional capability, technical architecture, operating model, control framework, and indicative commercials for digital asset custody. The buyer is interested in both minimum viable launch support and extension potential. Vendors should answer based on current product reality, not aspiration.

Responses should explain where the proposed approach fits best: direct platform adoption, embedded module use, bank or partner orchestration, or hybrid operating models. The buyer wants to understand not just feature coverage but also how much coordination, customization, and day-two support would realistically be required.
| Area | Questions are intended to discover |
| --- | --- |
| Business fit | Product scope, workflows, lifecycle coverage, user and operator journeys |
| Technical fit | API quality, eventing, hosting, deployment, environments, monitoring |
| Control fit | Security, compliance, evidence, governance, resilience |
| Commercial fit | Indicative pricing, implementation model, support assumptions |
| Strategic fit | Reuse potential, extension boundaries, partner dependencies |

## 3. Technical Requirements

### 3.1 Capability discovery questions

| ID | Question | Expected answer format |
| --- | --- | --- |
| CQ-01 | Describe your current support for digital asset custody. | Status label + 150-word summary |
| CQ-02 | Describe the core lifecycle events and operational workflows supported. | Status label + workflow summary |
| CQ-03 | Describe which customer, operator, compliance, and admin roles are supported. | Status label + role summary |
| CQ-04 | Describe support for limits, approvals, restrictions, and policy enforcement. | Status label + controls summary |
| CQ-05 | Describe support for reporting, audit evidence, and reconciliation workflows. | Status label + artifact list |
| CQ-06 | Describe adjacent capability support that may reuse the same foundation. | Status label + boundary note |

### 3.2 Technical and operating model discovery

| ID | Question | Expected answer format |
| --- | --- | --- |
| TQ-01 | Describe API styles, authentication methods, versioning, and developer onboarding assets. | Status label + docs references |
| TQ-02 | Describe webhook, event-stream, or messaging capabilities and delivery guarantees. | Status label + event model |
| TQ-03 | Describe hosting models, regions, tenant isolation, and environment separation. | Status label + topology summary |
| TQ-04 | Describe identity, access control, MFA, service account, and secret-management support. | Status label + IAM summary |
| TQ-05 | Describe observability, dashboards, incident tooling, and customer support interfaces. | Status label + ops summary |
| TQ-06 | Describe integration dependencies for custody, chains, banking rails, market data, or sanctions providers. | Status label + dependency list |
| TQ-07 | Describe upgrade and release management approach, including breaking-change handling. | Status label + release process |
| TQ-08 | Describe implementation approach, typical timelines, and buyer-side resource expectations. | Status label + delivery summary |

### 3.3 Security, resilience, and commercial discovery

| ID | Question | Expected answer format |
| --- | --- | --- |
| SQ-01 | Describe current MiCA-relevant control support and operating model assumptions. | Status label + control mapping |
| SQ-02 | Describe DORA and operational resilience support, including incident and third-party risk processes. | Status label + resilience summary |
| SQ-03 | Describe data protection, retention, residency, and deletion support. | Status label + data summary |
| SQ-04 | Describe audit evidence available for transactions, entitlements, approvals, and admin actions. | Status label + artifact list |
| SQ-05 | Provide indicative pricing structure for implementation, recurring, and usage-based charges. | Indicative price table |
| SQ-06 | Identify material limitations, unsupported scenarios, and concentration risks. | Risk register entry |

The buyer expects clear separation between what is available now and what still depends on roadmap, custom engineering, or a service partner. If a capability requires non-trivial custom work, describe that directly. The whole point of this RFI is to avoid hand-wavy answers that look fine in a workshop and then collapse when implementation planning starts.
## 4. Regulatory

| Regulatory theme | Specific information requested |
| --- | --- |
| MiCA | Relevant licensing, operating model assumptions, disclosures, governance, outsourcing, complaints, and conduct support |
| AML/CFT | Sanctions, screening, monitoring, travel rule support, case management integration |
| DORA | ICT risk, resilience testing support, incident response, third-party dependency management |
| GDPR | Data categories, retention, deletion, export controls, residency options |
| Audit | Logging depth, evidence extraction, control attestation, external assurance availability |

- MiCA readiness for crypto-asset services delivered in the EEA, including governance, disclosures, outsourcing, complaints, and conduct obligations where applicable.
- DORA-aligned ICT risk management, third-party risk handling, incident escalation, resilience testing support, and operational reporting.
- GDPR compliance for personal data processing, cross-border transfer controls, retention, deletion, and subject-rights support.
- AML/CFT and sanctions workflow integration, including travel rule capability where relevant to the proposed operating model.
- Auditability for internal control, external assurance, and regulator review across configuration, transaction history, entitlements, and administrative actions.
## 5. Commercial

| Commercial question | Why buyer asks |
| --- | --- |
| How is pricing structured? | Buyer needs to understand the real operating cost shape, not just headline platform fees |
| What scales price materially? | Buyer needs visibility into transaction, wallet, account, environment, or support drivers |
| What third-party costs sit outside your price? | Buyer needs total cost transparency across custody, chain, data, and compliance services |
| How much buyer-side effort is typical? | Buyer needs to estimate staffing and implementation impact |
| What support tiers exist? | Buyer needs to understand day-two operating dependency and cost |

## 6. Evaluation

| Review area | Weight for shortlisting insight |
| --- | --- |
| Business and capability fit | 30% |
| Technical integration fit | 25% |
| Security and regulatory readiness | 20% |
| Operating model credibility | 15% |
| Indicative commercial fit | 10% |

Responses will be reviewed by teams covering Product, Engineering, Security, Compliance, Operations, Treasury. The outcome of this RFI may be one or more of the following: no further action, request for targeted follow-up questions, invitation to a proof-of-concept discussion, or launch of a formal RFP. Because this is a market scan, the buyer is more interested in clarity than optimism. A precise “not supported” is more useful than a stretched claim.
## 7. Submission

- Submit one response document in searchable PDF.
- Complete the question matrix in editable spreadsheet format.
- Attach relevant architecture diagrams, sample reporting outputs, or control summaries where helpful.
- Identify whether referenceable production deployments exist and under what confidentiality limits they may be discussed.
- Include one named contact for technical follow-up and one for commercial follow-up.


### Expanded Company-Specific Context
Revolut expects bidders to anchor their response in the buyer's actual strategic posture rather than reuse a generic tokenization template. Revolut already offers broad digital-asset access and has continued expanding its crypto and trading proposition. A realistic procurement for tokenized securities or custody therefore assumes the company wants to industrialize product capability, tighten control boundaries and create a reusable institutional-grade core underneath a consumer-scale distribution engine. In practical terms, that means the proposed platform must support wallet and key-management governance, safekeeping, asset segregation, policy controls, approvals, reconciliations and incident response while fitting into super-app customer platform, trading and brokerage services, treasury and internal ledgers, fraud and AML controls, app telemetry, customer support tooling and cloud-native services. The bank or fintech will not score a response well if the digital-asset layer becomes a sidecar disconnected from existing books and records, operations controls, treasury workflows, or regulator-facing reporting.

The issuing team also expects bidders to recognize the buyer's governance model. wealth, crypto, trading, product engineering, compliance, risk and cyber leadership would all have a view. This has two consequences. First, proposals must explain how the platform supports board-level oversight, architecture review, risk sign-off and third-party control testing before production launch. Second, vendors must show how implementation can proceed without creating a long tail of manual exceptions that move risk into operations rather than remove it.

From a procurement standpoint, Revolut will care about launch speed, mobile-scale operability, configurable jurisdiction controls and low-friction developer integration. Proposals should therefore describe not just target-state functionality but also the migration path from current-state processes, including coexistence with legacy systems, phased onboarding of products or jurisdictions, and rollback or containment measures if external dependencies fail.

### Regulatory and Jurisdictional Context
The regulatory perimeter for this procurement is shaped by FCA, Bank of Lithuania or other relevant EEA authorities depending on entity, MiCA, DORA, AML/CFT and consumer-protection expectations. Where the proposed operating model involves crypto-asset issuance, trading, custody, settlement or payment functionality in the EEA, respondents must explain how MiCA obligations are allocated across the buyer, the platform provider and any custody, exchange, wallet, payment or reserve-management partners. The buyer does not want hand-waving about regulatory coverage; it wants a control map that identifies which legal and operational obligations remain with the institution and which are facilitated by the proposed platform.

DORA and broader operational-resilience obligations are equally important. Respondents should explain resilience testing, incident classification, third-party ICT dependency oversight, evidentiary logging, vulnerability management, and disaster recovery in a way that would survive review by internal cyber, operational resilience and procurement risk teams. For UK institutions, the answer must also align with the UK's operational-resilience and outsourcing regime. For Swiss or cross-border operating models, respondents must distinguish local supervisory expectations from EU-facing service obligations.

The buyer also expects a precise answer on privacy, data residency and cross-border support access. Proposals should state what personal data or customer-linked metadata is processed, where it resides, how deletion and retention work, how evidentiary records are preserved, and how administrative access is governed during business-as-usual operations and incident response. This is non-negotiable for shortlist consideration.

### Detailed Use Cases and Technical Depth
For this procurement, bidders should assume that the first live use cases will be concrete rather than experimental. At minimum, the target operating model should support wallet and key-management governance, safekeeping, asset segregation, policy controls, approvals, reconciliations and incident response. The proposed platform should show how configuration, approvals, ledger updates, settlement instructions, exception handling and reporting are orchestrated across those use cases without requiring brittle one-off customization for each product or jurisdiction.

A strong response will explain the buyer journey and the operator journey separately. On the buyer or issuer side, product owners need configuration controls, approval workflows, rule-based restrictions and full visibility into lifecycle status. On the operator side, support and operations teams need reconciliation dashboards, queue and retry transparency, clear exception states, audit evidence, and deterministic recovery procedures. On the control-function side, compliance and risk teams need policy enforcement, exportable records, entitlements visibility and evidence that the system can be supervised without direct vendor intervention.

Respondents should also explain how the platform integrates with external market infrastructure or partner dependencies where relevant. That may include custodians, CSDs, payment systems, correspondent banks, sanctions providers, market-data feeds, wallet / key-management providers, transfer agents, registrar services, digital cash rails or smart-contract monitoring tooling. The buyer will treat dependency transparency as a strength, not a weakness; hidden dependencies are what kill deals.

### Integration Expectations for Existing Infrastructure
The solution must interoperate cleanly with the buyer's established control estate. That includes super-app customer platform, trading and brokerage services, treasury and internal ledgers, fraud and AML controls, app telemetry, customer support tooling and cloud-native services. Vendors should describe canonical data models, API contracts, event-taxonomy design, idempotency controls, batch and streaming interfaces, and how reconciliation breaks are surfaced and resolved. If the proposed platform maintains its own ledger, respondents must explain how golden-source boundaries are defined and how downstream finance, risk and regulatory systems consume authoritative records.

Where asset servicing or payment finality depends on external rails, the response should describe status synchronization, settlement confirmation, replay handling and cutoff management in practical terms. The buyer expects clear maker-checker and four-eyes patterns for operationally sensitive actions such as asset creation, rule changes, minting or issuance events, investor-permission changes, collateral substitutions, corporate-action execution, and privileged administrative overrides.

Implementation plans should include non-production environment design, test-data strategy, migration sequencing, cutover checkpoints and rollback paths. Sandbox quality matters, but realistic integration testing matters more. The selected vendor will be expected to support SIT, UAT, dress rehearsals and post-go-live stabilization using an evidence-based approach rather than aspirational milestone slides.

### Expanded Evaluation Considerations
In addition to the baseline scoring model already set out in this document, the buyer will place explicit emphasis on five company-specific questions. First, does the proposed platform fit the institution's real control model rather than forcing a parallel digital-only operating structure? Second, can the platform support the immediate use case of wallet and key-management governance, safekeeping, asset segregation, policy controls, approvals, reconciliations and incident response while creating optionality for adjacent workflows? Third, are regulatory responsibilities and third-party dependencies described with enough precision to withstand compliance and procurement review? Fourth, can the buyer's internal engineering and operations teams own the platform day to day without permanent vendor dependency? Fifth, is the commercial model transparent enough to remain viable after expansion to new products, legal entities or markets?

For scoring purposes, the buyer may use indicative sub-weightings within existing sections. Functional fit may prioritize lifecycle completeness, exception handling and configuration depth. Technical architecture may prioritize API quality, integration traceability, observability and deployment repeatability. Security and compliance may prioritize evidence generation, data-governance clarity, operational resilience and outsourced-service governance. Delivery credibility may prioritize referenceable implementations, realistic staffing, cutover discipline and post-launch support. Commercial assessment will consider not just headline price but cost predictability, scaling economics and exit portability.

Because this is a RFI, respondents should provide market-readiness evidence, current-state product maturity and directional commercial / delivery assumptions. Indicative pricing is acceptable, but respondents must clearly separate live capability from roadmap and state how commercial constructs would change between pilot and production.

### Delivery, Migration and Operational Readiness
The buyer expects the selected vendor to provide a practical implementation path consisting of discovery and control mapping, detailed design, integration build, environment hardening, testing, migration or initial onboarding, go-live readiness and hypercare. Responses should identify which activities are product-native, which require configuration, which require partner work and which require buyer-owned engineering or operational change. Any activity that depends on a future roadmap item should be called out plainly.

Operational readiness should cover service ownership, support boundaries, incident escalation, change windows, release governance, configuration promotion, key or secret rotation, reconciliation monitoring and evidence retention. The buyer will favor platforms that can be operated through documented runbooks, role-based access controls and product-native telemetry rather than hidden vendor admin playbooks. Training must be role-specific and should include administrators, operations analysts, control functions, security responders and audit stakeholders.

Finally, the response should describe exit and continuity planning. Data export, configuration portability, audit-log preservation, historical-report retention and dependency transition assistance are part of the procurement discussion from day one. Buyers in this segment are not willing to accept architectural lock-in disguised as innovation.




### Additional Market-Scan Questions
Because this is an RFI rather than a committed award process, Revolut is using this document to separate productized platforms from ambitious slide decks. Respondents should therefore describe the maturity of their solution for wallet and key-management governance, safekeeping, asset segregation, policy controls, approvals, reconciliations and incident response in very concrete terms: what is live today, what is in pilot, what is customer-specific, and what remains roadmap. The buyer is especially interested in evidence that a platform can survive production governance, exception volume, regulator scrutiny and multi-team operating ownership.

The market scan also seeks clarity on deployment patterns, partner dependencies and regulatory posture. Respondents should identify whether they rely on specific custodians, chains, stablecoins, transfer agents, registrars, cash rails or infrastructure operators; whether those dependencies are optional or mandatory; and how portability would work if the buyer changed one of those components later. Solutions that trap the buyer in a proprietary stack without practical exit options will be viewed cautiously even if the short-term demo is compelling.

### Additional Operating-Model Questions
The buyer expects detailed answers on how the platform would fit a regulated day-two environment. That includes role-based administration, change control, approval workflows, entitlement management, operations dashboards, break resolution, incident communication, release governance and evidence production. Respondents should explain what a normal day looks like, what a bad day looks like, and what data internal operations and control teams can access without vendor assistance.

The buyer is also specifically assessing integration realism. Responses should discuss how the platform connects with identity systems, payments or treasury infrastructure, finance ledgers, AML and sanctions tools, client communication systems, regulatory reporting and data platforms. Where the platform introduces a new ledger or registry, respondents must explain how authority boundaries are defined and how downstream reconciliations remain manageable.




### Supplemental Buyer Questionnaire and Scenario Detail
To support a realistic comparison, Revolut expects each respondent to address the following scenarios in direct prose rather than one-line matrix answers. Scenario one covers day-one setup: how the platform is configured for wallet and key-management governance, safekeeping, asset segregation, policy controls, approvals, reconciliations and incident response, how approval policies are established, how roles are assigned, how test and production environments are separated, and how operational evidence is captured from the first transaction onward. Scenario two covers day-two operations: how normal processing, cutoff management, exception queues, break resolution, reconciliations, fee calculations, customer or counterparty communication, and audit-log review are handled. Scenario three covers stress or failure conditions: dependency outages, partial settlement, stale market data, delayed confirmations, duplicate submissions, failed signatures, policy breaches, sanctions hits, rollback events, and emergency change restrictions.

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


### Supplemental RFI Market-Sounding Detail
Because this is an RFI, the buyer is using responses to understand the true state of the market. It wants candid answers on maturity, limitations, pricing logic, dependency concentration, deployment flexibility and regulatory fit. Respondents should not assume that ambitious roadmap language is helpful. The useful answer is the one that tells the buyer whether the platform could survive due diligence and what would need to happen before an eventual RFP or pilot could be run with confidence.

The buyer is particularly interested in evidence that a platform can move beyond proof-of-concept conditions. That includes real support processes, referenceable clients or pilots, evidence of regulatory engagement where relevant, and honest disclosure of where the product category is still immature. Good RFIs save everyone time by identifying what is genuinely ready and what is not.




### Supplemental Due-Diligence Checklist
The buyer will use a final due-diligence checklist to validate that written claims can be supported in practice. Respondents should therefore be prepared to supply sample architecture artifacts, control narratives, operating runbooks, release notes, incident templates, escalation matrices, access-control evidence, reconciliation examples and anonymized implementation plans. The purpose of that review is not bureaucracy for its own sake. It is to confirm that the proposed platform can be owned inside a regulated operating model after the sales cycle ends.

In that review, the buyer will test whether documentation is coherent across functions. Procurement will look for explicit assumptions, priced dependencies and contract-ready service boundaries. Security will look for hard evidence on key management, administrative control, vulnerability management, logging, monitoring and incident response. Compliance and legal will look for clean allocation of regulatory duties, support for audit and regulator requests, and clarity on data handling, outsourcing and cross-border servicing. Operations will look for repeatable day-two processes with clear escalation and low manual fragility. Engineering and architecture will look for stable APIs, workable environments, version control over integrations, and a realistic migration path.

The buyer will also ask how the product behaves under real operational pressure. That includes partial dependency failure, delayed confirmations, repeated submissions, stale reference data, invalid instructions, rollback conditions, end-of-day breaks, and user-error scenarios. Respondents should explain not merely that the platform is resilient, but how a controller, operator, platform engineer or on-call responder would detect the problem, triage it, contain customer impact, restore service and produce evidence afterward. The strongest responses make these mechanics obvious.

Another focus area will be internal ownership after launch. Buyers in this segment do not want a vendor-managed black box that only the supplier can understand. They want a platform that internal product, operations, risk, compliance and engineering teams can supervise with confidence. That means configuration should be traceable, permissions should be granular, reports should be exportable, interfaces should be documented, and routine changes should not require a consulting engagement. Where specialist vendor support is required, the response should describe precisely when, why and at what cost.

Finally, the buyer will view transparency as a competitive advantage. If there are constraints on jurisdiction rollout, supported assets, throughput, partner dependencies, settlement patterns, token standards, key-management options, support hours or roadmap timing, say so. Serious institutions can work with clearly stated limits. What they do not tolerate well is discovering late in the process that a supposedly ready platform depends on hidden assumptions, undocumented manual steps or a commercial model that changes once implementation begins.


## 8. Appendices

### Appendix A. Response matrix

| Column | Instruction |
| --- | --- |
| Question ID | Repeat the buyer identifier exactly |
| Status | Use one response legend label |
| Answer summary | Short direct answer |
| Evidence / reference | Link or appendix reference |
| Dependencies | Partner, product, or buyer dependency |
| Notes | Limitations, regional boundaries, or assumptions |

### Appendix B. Indicative pricing form

| Line item | Indicative content |
| --- | --- |
| Implementation | One-time setup and onboarding cost |
| Recurring platform | Subscription or platform charge |
| Usage | Volume-based processing or wallet costs |
| Third-party | Pass-through dependency costs |
| Support | Standard / premium support cost |
| Assumptions | Key volume and operating assumptions |

### Appendix C. Dependencies and risk register

| Category | What bidder should state |
| --- | --- |
| Partner dependencies | Custody, wallet, chain, bank, data, sanctions, messaging providers |
| Regional constraints | Country, licensing, or hosting limitations |
| Product gaps | Unsupported scenarios or roadmap-only areas |
| Scaling assumptions | Volume or throughput assumptions behind the answer |
| Operating constraints | Support windows, maintenance, staffing, or manual steps |

