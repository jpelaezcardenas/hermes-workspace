
# Standard Chartered — Request for Information
## Tokenized Trade Finance Capability

| Field | Value |
|-------|-------|
| **Document Reference** | SCB-RFI-202603-10 |
| **Version** | v1.0 |
| **Issue Date** | March 2026 |
| **Submission Deadline** | May 2026 |
| **Classification** | Confidential |
| **Issuing Entity** | Standard Chartered Bank |
| **Contact** | Digital Assets Procurement Team |


## 1. Procurement Context

### 1.1 Buyer background and purpose of inquiry
Standard Chartered Bank is conducting this Request for Information to assess market capability and operating-model maturity relevant to tokenized trade finance. The purpose of this RFI is exploratory rather than award-binding. It will inform future procurement design, internal business-case development, control assessment, and potential shortlisting for subsequent proof-of-capability activity or formal RFP issuance.

The buyer's interest sits within its broader strategic ambition to build durable digital asset capabilities aligned to its international banking group needs with emphasis on custody control, regional rollout, and cross-border governance. The institution is seeking structured, comparable input from vendors on what is available today, what can be enabled through standard configuration, what depends on ecosystem partners, what is committed on roadmap, and what is not supported. The buyer specifically wishes to avoid market noise, ambiguous roadmap positioning, or undifferentiated marketing claims.

The inquiry is being issued because the buyer requires clearer visibility on how current platforms can support governance, integration, control evidence, regulatory fit, and implementation feasibility for the requested use case. This is especially important where digital asset capabilities intersect with existing banking infrastructure, legal-entity governance, and supervisory expectations. The custody platform must support operating model segregation across client asset classes, legal entities, and risk frameworks.

### 1.2 Review themes and information objectives
This RFI focuses on five review themes:
- product and workflow maturity for the requested capability;
- technical architecture, deployment, and interoperability options;
- security, resilience, and control model maturity;
- regulatory and jurisdictional alignment;
- indicative commercials, implementation approach, and market credibility.

The buyer expects respondents to describe capability with precision and to identify operating assumptions. Responses should help the buyer understand not only whether a platform can support the requested use case, but also under what conditions, in which jurisdictions, with which dependencies, and through what delivery model. The buyer will use this information to determine whether the market is sufficiently mature, what procurement packaging is appropriate, and which requirement areas require deeper specification in any subsequent formal process.

### 1.3 Timeline, response rules, and capability legend
This RFI is issued in March 2026 with responses requested by May 2026. Clarification questions may be submitted until mid-April 2026. The buyer may invite selected respondents to follow-up workshops or demonstrations but is under no obligation to do so.

Respondents shall use the following status legend in all capability matrices:

| Capability status | Meaning |
|---|---|
| Current capability | Available in production and referenceable today |
| Configured capability | Supported through standard platform configuration without bespoke engineering |
| Partner-enabled capability | Available through a formally supported third-party integration or ecosystem partner |
| Roadmap | Planned but not generally available; include committed release timing and delivery dependencies |
| Not supported | Not available or not aligned to the requested operating model |

All responses shall be submitted in English and in buyer-provided structure where a matrix is supplied. Marketing brochures may be appended for context but shall not replace direct answers.

## 2. Scope of Work

### 2.1 Business and functional discovery questions
| Req ID | Requirement | Priority | Response Type | Evidence Requested |
|---|---|---|---|---|
| BQ-01 | Describe your current capability to support tokenized trade finance capability across origination, onboarding, creation, lifecycle management, reporting, and retirement. | Narrative + status | Narrative response | Workflow diagrams or product notes |
| BQ-02 | Explain which operating-model components are native, configurable, partner-enabled, roadmap, or not supported. | Matrix response | Narrative response | Completed capability legend |
| BQ-03 | State how the solution supports buyer governance, approval controls, entitlements, audit logging, and exception management. | Narrative | Narrative response | Control descriptions |
| BQ-04 | Provide representative use cases from banking or capital-markets institutions most comparable to the buyer context. | Narrative | Narrative response | Reference summaries |
| BQ-05 | Describe post-event servicing, reconciliation, and management reporting options relevant to the requested use case. | Narrative + status | Narrative response | Report catalogue or sample outputs |

### 2.2 Technical and deployment discovery questions
| Req ID | Requirement | Priority | Response Type | Evidence Requested |
|---|---|---|---|---|
| TQ-01 | Describe supported deployment models, environment separation, operational responsibilities, and integration patterns for core banking, payments, custody, AML, and reporting systems. | Narrative + status | Narrative response | Architecture pack |
| TQ-02 | Identify API styles, eventing mechanisms, data export capabilities, and documentation standards available today. | Narrative + evidence | Narrative response | API documentation samples |
| TQ-03 | Explain how your platform handles identity, permissions, key-management dependencies, approval workflows, and shared-responsibility boundaries. | Narrative | Narrative response | Security architecture overview |
| TQ-04 | State any dependencies on specific networks, registries, settlement rails, custodians, or token standards for the requested capability. | Matrix response | Narrative response | Dependency map |
| TQ-05 | Describe implementation approach, indicative duration, buyer resource requirements, and typical accelerators or blockers. | Narrative | Narrative response | Implementation model summary |

### 2.3 Security and compliance discovery questions
| Req ID | Requirement | Priority | Response Type | Evidence Requested |
|---|---|---|---|---|
| SQ-01 | Provide an overview of security governance, relevant certifications or attestations, penetration testing practice, vulnerability management, and incident response. | Narrative + evidence | Narrative response | Assurance artefacts summary |
| SQ-02 | Explain how your solution aligns or can be aligned with the following regulatory themes: UK FCA and PRA expectations, MAS and HKMA considerations for international operations, DORA for EU interactions, GDPR and applicable local privacy laws. | Narrative + status | Narrative response | Compliance mapping |
| SQ-03 | Describe data residency options, logging retention, evidence export, privacy controls, and support for internal audit or supervisory access requests. | Narrative | Narrative response | Data governance summary |
| SQ-04 | Identify any material legal, regulatory, or outsourcing prerequisites that a regulated bank should consider before moving to RFP or implementation. | Narrative | Narrative response | Dependency statement |

The buyer expects candid disclosure of limitations, dependencies, and maturity constraints. Partial support is acceptable in an RFI context provided it is described accurately and supported by clear assumptions.

## 3. Technical Requirements and Market Inquiry Themes

Although this RFI is non-binding, the buyer is particularly interested in the market's ability to support a bank-grade operating model. Responses should therefore discuss the following in depth:

### 3.1 Platform architecture and integration
Respondents should explain core architectural principles, deployment flexibility, environment separation, resilience patterns, workflow orchestration, and integration standards. The buyer is interested in API-first design, event handling, control-plane governance, and whether the requested capability can be adopted incrementally across legal entities or product teams. Solutions that require extensive bespoke engineering for baseline workflows should be identified clearly.

### 3.2 Operational control and service model
The buyer wishes to understand how respondent platforms divide responsibilities across buyer teams, vendor operations, cloud providers, custodians, settlement partners, or other third parties. Respondents should identify support tiers, service windows, administrative access practices, implementation staffing assumptions, and escalation pathways. Where managed services are offered, the buyer expects clarity on evidential transparency and supervisory support.

### 3.3 Security, risk, and regulatory positioning
Responses should map the requested capability against UK FCA and PRA expectations, MAS and HKMA considerations for international operations, DORA for EU interactions, GDPR and applicable local privacy laws. The buyer is not asking vendors to provide legal advice; it is asking them to explain how their platform supports institution-led compliance, recordkeeping, access control, auditability, resilience, and outsourcing oversight. Where the capability is restricted by geography, legal structure, client type, or market infrastructure dependency, that should be stated directly.

## 4. Regulatory & Compliance Requirements

### 4.1 Jurisdiction-specific considerations
The buyer operates in the UK and international regulatory perimeter. Respondents should explain how their current solution positioning fits this regulatory perimeter and which obligations must be addressed through buyer policy, implementation design, or third-party arrangements. Examples include governance approvals, investor eligibility controls, books-and-records integrity, sanctions and AML checkpoints, outsourcing oversight, resiliency testing, and evidence retention.

### 4.2 Compliance artefacts requested
Where available, respondents should provide or describe compliance mappings, control attestations, audit reports, certifications, penetration test summaries, subprocessor disclosures, data location options, and sample evidence packages used in regulated bank engagements. If such artefacts are only available under NDA, respondents should indicate that explicitly.

## 5. Commercial Requirements

### 5.1 Indicative commercial information requested
| Topic | Information requested |
|---|---|
| Pricing drivers | State core pricing basis, implementation charges, support tiers, and major optional cost drivers |
| Service model | State SaaS, managed service, self-hosted, or hybrid options and buyer responsibilities |
| Geographic support | State countries or regions where delivery is currently supported |
| Referenceability | State whether named banking references can be provided under NDA |

Respondents should treat commercial disclosures as indicative and non-binding unless otherwise stated. The buyer is primarily seeking to understand price structure, implementation effort, and likely cost drivers for future planning.

### 5.2 Licensing and implementation considerations
Respondents should explain whether the requested capability is typically sold as a module, full platform, managed service, or bundled proposition. They should also identify whether buyer-side infrastructure, specialist personnel, external custody, or network memberships are likely prerequisites.

## 6. Evaluation Criteria

This RFI is not a contract award process. Responses will nevertheless be assessed for comparative insight using the following review lenses:

| Review lens | Weight |
|---|---:|
| Capability relevance to buyer use case | 30% |
| Technical and integration maturity | 20% |
| Security, risk, and regulatory credibility | 20% |
| Implementation realism and service model | 15% |
| Commercial transparency and market evidence | 15% |

The weighting above is used for internal shortlisting and prioritisation only. The buyer reserves the right to adjust future procurement requirements based on what is learned through this inquiry.

## 7. Submission Instructions

### 7.1 Submission format
Respondents shall provide a concise executive summary, completed capability matrices, architecture overview, security and compliance summary, indicative commercials, and relevant reference examples. Searchable PDF is required; editable spreadsheet or document formats are preferred for matrices.

### 7.2 Buyer process
The buyer may seek clarification, hold market-sounding discussions, request demonstrations, or invite selected respondents to future procurement stages. Participation in this RFI does not create any right to participate in later stages and does not oblige the buyer to issue an RFP.

### 7.3 Confidentiality
Information disclosed by the buyer shall be treated as confidential and used solely for the purpose of responding to this inquiry. Respondents shall clearly mark confidential response sections. The buyer may share responses internally across procurement, legal, technology, risk, and business stakeholders involved in the assessment.



### Expanded Company-Specific Context
Standard Chartered expects bidders to anchor their response in the buyer's actual strategic posture rather than reuse a generic tokenization template. Standard Chartered has significant digital asset exposure through ventures and partnerships such as Zodia and Libeara, along with broader work in tokenized trade finance, custody and institutional digital market infrastructure. A realistic buyer would expect respondents to know that Standard Chartered cares about cross-border network effects, institutional custody, regulated market access and disciplined risk segregation. In practical terms, that means the proposed platform must support trade-document digitization, tokenized receivables or obligations, financing limits, document status, payment triggers and cross-border compliance while fitting into trade finance systems, custody and safekeeping, correspondent banking and payments, treasury, corporate channels, screening and surveillance tools, and global support operations. The bank or fintech will not score a response well if the digital-asset layer becomes a sidecar disconnected from existing books and records, operations controls, treasury workflows, or regulator-facing reporting.

The issuing team also expects bidders to recognize the buyer's governance model. relevant leaders include transaction banking, custody, innovation, digital assets, risk, cyber and operations stakeholders. This has two consequences. First, proposals must explain how the platform supports board-level oversight, architecture review, risk sign-off and third-party control testing before production launch. Second, vendors must show how implementation can proceed without creating a long tail of manual exceptions that move risk into operations rather than remove it.

From a procurement standpoint, evaluation will likely emphasize multi-jurisdiction control design, partner risk management and ability to support global client franchises. Proposals should therefore describe not just target-state functionality but also the migration path from current-state processes, including coexistence with legacy systems, phased onboarding of products or jurisdictions, and rollback or containment measures if external dependencies fail.

### Regulatory and Jurisdictional Context
The regulatory perimeter for this procurement is shaped by FCA, PRA and multiple cross-border regulators; EEA service extension must align with MiCA and DORA where relevant. Where the proposed operating model involves crypto-asset issuance, trading, custody, settlement or payment functionality in the EEA, respondents must explain how MiCA obligations are allocated across the buyer, the platform provider and any custody, exchange, wallet, payment or reserve-management partners. The buyer does not want hand-waving about regulatory coverage; it wants a control map that identifies which legal and operational obligations remain with the institution and which are facilitated by the proposed platform.

DORA and broader operational-resilience obligations are equally important. Respondents should explain resilience testing, incident classification, third-party ICT dependency oversight, evidentiary logging, vulnerability management, and disaster recovery in a way that would survive review by internal cyber, operational resilience and procurement risk teams. For UK institutions, the answer must also align with the UK's operational-resilience and outsourcing regime. For Swiss or cross-border operating models, respondents must distinguish local supervisory expectations from EU-facing service obligations.

The buyer also expects a precise answer on privacy, data residency and cross-border support access. Proposals should state what personal data or customer-linked metadata is processed, where it resides, how deletion and retention work, how evidentiary records are preserved, and how administrative access is governed during business-as-usual operations and incident response. This is non-negotiable for shortlist consideration.

### Detailed Use Cases and Technical Depth
For this procurement, bidders should assume that the first live use cases will be concrete rather than experimental. At minimum, the target operating model should support trade-document digitization, tokenized receivables or obligations, financing limits, document status, payment triggers and cross-border compliance. The proposed platform should show how configuration, approvals, ledger updates, settlement instructions, exception handling and reporting are orchestrated across those use cases without requiring brittle one-off customization for each product or jurisdiction.

A strong response will explain the buyer journey and the operator journey separately. On the buyer or issuer side, product owners need configuration controls, approval workflows, rule-based restrictions and full visibility into lifecycle status. On the operator side, support and operations teams need reconciliation dashboards, queue and retry transparency, clear exception states, audit evidence, and deterministic recovery procedures. On the control-function side, compliance and risk teams need policy enforcement, exportable records, entitlements visibility and evidence that the system can be supervised without direct vendor intervention.

Respondents should also explain how the platform integrates with external market infrastructure or partner dependencies where relevant. That may include custodians, CSDs, payment systems, correspondent banks, sanctions providers, market-data feeds, wallet / key-management providers, transfer agents, registrar services, digital cash rails or smart-contract monitoring tooling. The buyer will treat dependency transparency as a strength, not a weakness; hidden dependencies are what kill deals.

### Integration Expectations for Existing Infrastructure
The solution must interoperate cleanly with the buyer's established control estate. That includes trade finance systems, custody and safekeeping, correspondent banking and payments, treasury, corporate channels, screening and surveillance tools, and global support operations. Vendors should describe canonical data models, API contracts, event-taxonomy design, idempotency controls, batch and streaming interfaces, and how reconciliation breaks are surfaced and resolved. If the proposed platform maintains its own ledger, respondents must explain how golden-source boundaries are defined and how downstream finance, risk and regulatory systems consume authoritative records.

Where asset servicing or payment finality depends on external rails, the response should describe status synchronization, settlement confirmation, replay handling and cutoff management in practical terms. The buyer expects clear maker-checker and four-eyes patterns for operationally sensitive actions such as asset creation, rule changes, minting or issuance events, investor-permission changes, collateral substitutions, corporate-action execution, and privileged administrative overrides.

Implementation plans should include non-production environment design, test-data strategy, migration sequencing, cutover checkpoints and rollback paths. Sandbox quality matters, but realistic integration testing matters more. The selected vendor will be expected to support SIT, UAT, dress rehearsals and post-go-live stabilization using an evidence-based approach rather than aspirational milestone slides.

### Expanded Evaluation Considerations
In addition to the baseline scoring model already set out in this document, the buyer will place explicit emphasis on five company-specific questions. First, does the proposed platform fit the institution's real control model rather than forcing a parallel digital-only operating structure? Second, can the platform support the immediate use case of trade-document digitization, tokenized receivables or obligations, financing limits, document status, payment triggers and cross-border compliance while creating optionality for adjacent workflows? Third, are regulatory responsibilities and third-party dependencies described with enough precision to withstand compliance and procurement review? Fourth, can the buyer's internal engineering and operations teams own the platform day to day without permanent vendor dependency? Fifth, is the commercial model transparent enough to remain viable after expansion to new products, legal entities or markets?

For scoring purposes, the buyer may use indicative sub-weightings within existing sections. Functional fit may prioritize lifecycle completeness, exception handling and configuration depth. Technical architecture may prioritize API quality, integration traceability, observability and deployment repeatability. Security and compliance may prioritize evidence generation, data-governance clarity, operational resilience and outsourced-service governance. Delivery credibility may prioritize referenceable implementations, realistic staffing, cutover discipline and post-launch support. Commercial assessment will consider not just headline price but cost predictability, scaling economics and exit portability.

Because this is a RFI, respondents should provide market-readiness evidence, current-state product maturity and directional commercial / delivery assumptions. Indicative pricing is acceptable, but respondents must clearly separate live capability from roadmap and state how commercial constructs would change between pilot and production.

### Delivery, Migration and Operational Readiness
The buyer expects the selected vendor to provide a practical implementation path consisting of discovery and control mapping, detailed design, integration build, environment hardening, testing, migration or initial onboarding, go-live readiness and hypercare. Responses should identify which activities are product-native, which require configuration, which require partner work and which require buyer-owned engineering or operational change. Any activity that depends on a future roadmap item should be called out plainly.

Operational readiness should cover service ownership, support boundaries, incident escalation, change windows, release governance, configuration promotion, key or secret rotation, reconciliation monitoring and evidence retention. The buyer will favor platforms that can be operated through documented runbooks, role-based access controls and product-native telemetry rather than hidden vendor admin playbooks. Training must be role-specific and should include administrators, operations analysts, control functions, security responders and audit stakeholders.

Finally, the response should describe exit and continuity planning. Data export, configuration portability, audit-log preservation, historical-report retention and dependency transition assistance are part of the procurement discussion from day one. Buyers in this segment are not willing to accept architectural lock-in disguised as innovation.




### Additional Market-Scan Questions
Because this is an RFI rather than a committed award process, Standard Chartered is using this document to separate productized platforms from ambitious slide decks. Respondents should therefore describe the maturity of their solution for trade-document digitization, tokenized receivables or obligations, financing limits, document status, payment triggers and cross-border compliance in very concrete terms: what is live today, what is in pilot, what is customer-specific, and what remains roadmap. The buyer is especially interested in evidence that a platform can survive production governance, exception volume, regulator scrutiny and multi-team operating ownership.

The market scan also seeks clarity on deployment patterns, partner dependencies and regulatory posture. Respondents should identify whether they rely on specific custodians, chains, stablecoins, transfer agents, registrars, cash rails or infrastructure operators; whether those dependencies are optional or mandatory; and how portability would work if the buyer changed one of those components later. Solutions that trap the buyer in a proprietary stack without practical exit options will be viewed cautiously even if the short-term demo is compelling.

### Additional Operating-Model Questions
The buyer expects detailed answers on how the platform would fit a regulated day-two environment. That includes role-based administration, change control, approval workflows, entitlement management, operations dashboards, break resolution, incident communication, release governance and evidence production. Respondents should explain what a normal day looks like, what a bad day looks like, and what data internal operations and control teams can access without vendor assistance.

The buyer is also specifically assessing integration realism. Responses should discuss how the platform connects with identity systems, payments or treasury infrastructure, finance ledgers, AML and sanctions tools, client communication systems, regulatory reporting and data platforms. Where the platform introduces a new ledger or registry, respondents must explain how authority boundaries are defined and how downstream reconciliations remain manageable.




### Supplemental Buyer Questionnaire and Scenario Detail
To support a realistic comparison, Standard Chartered expects each respondent to address the following scenarios in direct prose rather than one-line matrix answers. Scenario one covers day-one setup: how the platform is configured for trade-document digitization, tokenized receivables or obligations, financing limits, document status, payment triggers and cross-border compliance, how approval policies are established, how roles are assigned, how test and production environments are separated, and how operational evidence is captured from the first transaction onward. Scenario two covers day-two operations: how normal processing, cutoff management, exception queues, break resolution, reconciliations, fee calculations, customer or counterparty communication, and audit-log review are handled. Scenario three covers stress or failure conditions: dependency outages, partial settlement, stale market data, delayed confirmations, duplicate submissions, failed signatures, policy breaches, sanctions hits, rollback events, and emergency change restrictions.

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

### Appendix A — Glossary
- **Current capability**: Functionality available in live production with relevant support and evidential backing.
- **Configured capability**: Functionality available through standard setup rather than bespoke build.
- **Partner-enabled capability**: Functionality dependent on an approved third-party component or service.
- **Roadmap**: Planned functionality not yet generally available.

### Appendix B — Response matrix instructions
Each question shall be answered using the buyer's numbering. Respondents should state capability status, concise explanation, dependencies, and evidence reference. Unsupported claims without dependency disclosure may be discounted.

### Appendix C — Assumptions and dependencies register
Respondents shall list relevant legal, operational, technical, regulatory, geographic, and commercial assumptions. Failure to disclose material assumptions may adversely affect internal review.

### Appendix D — NDA basis
Where respondents require reciprocal confidentiality to disclose sensitive material, they should identify that requirement in the covering letter and provide a suitable NDA form for review.
