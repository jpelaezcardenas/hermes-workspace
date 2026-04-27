# DTCC — Request for Proposal
## Digital Securities Settlement And Post-Trade Recordkeeping Platform



| Field | Value |
|---|---|
| Institution | DTCC |
| Issuing Entity | The Depository Trust & Clearing Corporation |
| Region | Americas |
| Category | financial-institutions |
| Country / Primary Jurisdiction | United States |
| Use Case | digital securities settlement and post-trade recordkeeping |
| Document Reference | DTCC-RFP-202603-03 |
| Document Type | RFP |
| Issue Date | March 2026 |
| Submission Deadline | May 2026 |
| Version | v1.0 |
| Classification | Confidential |

## 1. Procurement Context

### 1.1 Institutional context

Recent public signals indicate that DTCC is not approaching digital securities settlement and post-trade recordkeeping as a theoretical innovation exercise. Market commentary, public product launches, pilot disclosures and infrastructure announcements point to an organisation that is actively testing how tokenized cash, digital securities, programmable settlement or blockchain-based process redesign could fit within a regulated production environment. For procurement purposes, the buyer therefore expects bidders to understand the difference between a sandbox demonstration and a platform that can survive architecture review, risk committee challenge, supervisory inspection and production incident management.

The institution's practical agenda appears to revolve around three questions. First, how can the in-scope capability improve balance-sheet efficiency, settlement speed, client experience or post-trade control quality without creating a parallel control universe? Second, how can the capability interoperate with the institution's existing infrastructure—specifically DTC, NSCC and post-trade recordkeeping platforms, participant messaging, reconciliation layers, supervisory reporting and synchronized settlement workflows.—without forcing a brittle web of one-off integrations? Third, how can the programme be governed by the business and control functions already accountable for policy, books-and-records integrity, financial crime controls, data governance, model risk and third-party oversight?

The buyer expects bidders to respond with awareness of the internal stakeholder set likely to shape decisions: digital assets strategy and product management leadership. Responses that do not acknowledge the governance burden created by digital assets in a regulated institution will be scored down even if the product feature list is strong. Respondents should assume integration with U.S. payment, securities and reporting infrastructure, including Fedwire-adjacent cash movement, broker-dealer or bank controls, sanctions screening, and evidence packaging suitable for internal audit and supervisors.

### 1.2 Procurement objectives

In addition to baseline functional coverage, the objective of this procurement is to identify a vendor that can help DTCC close specific operational gaps that public market developments have exposed. These include the need for 24x7 yet governed transaction processing, deterministic entitlementing across legal entities and client segments, asset and cash record consistency across multiple systems of record, auditable exception workflows, and configurable policy controls that can change as regulation and business appetite evolve.

The buyer is also using this process to test whether the vendor market can support a phased delivery plan rather than a single 'big bang' rollout. The institution anticipates a progression from controlled internal use cases and limited participant cohorts toward broader productization, additional entities, greater external connectivity and more demanding supervisory scrutiny. Bidders should therefore show how configuration, policy, integration patterns, resiliency design and evidence generation will scale over time without rewriting core workflows.

### 1.3 Assumptions and exclusions

Respondents shall assume that the buyer will keep decision rights over regulated activity, participant eligibility, product policy, legal structuring, accounting treatment and regulatory engagement. The selected vendor will not be permitted to hide core control logic in opaque managed services or proprietary operational processes. The buyer also assumes that any serious implementation will require explicit control mapping against OCC supervisory expectations, Federal Reserve guidance, SEC and CFTC perimeter questions, FinCEN AML/BSA obligations, state money-transmission or trust rules where applicable, privacy/security obligations and model-risk / third-party-risk governance.

The institution further assumes that not all benefits will be captured on day one. Early phases may prioritise control quality, operational transparency and infrastructure interoperability ahead of full revenue-scale volumes. Proposals should therefore separate mandatory capabilities for launch from optional accelerators for later phases, and should distinguish native product capabilities from dependent third-party services, cloud features, market-utility memberships and buyer-operated controls.

## 2. Scope of Work

### 2.1 Scope summary
The requested solution must support an end-to-end operating model for digital securities settlement and post-trade recordkeeping across origination or issuance, approvals, lifecycle events, funding and settlement, reconciliation, case management, reporting, audit evidence and controlled archival retention. The buyer is explicitly not seeking point tooling that only covers wallet orchestration, token minting, reporting or workflow approvals in isolation.

Solutions must also show credible interoperability with the buyer's environment: DTC, NSCC and post-trade recordkeeping platforms, participant messaging, reconciliation layers, supervisory reporting and synchronized settlement workflows. The response should identify authoritative systems of record, event sequencing, ledger synchronisation patterns, exception routing, fallback modes and operator touchpoints. Where the design assumes blockchain components, respondents must explain permissioning, privacy boundaries, smart-contract governance, key management responsibilities and how on-chain state is reconciled with off-chain books and records.

For this institution, the most important design test is whether the platform helps the buyer operationalise the use case in a way that respects existing control ownership. That means workflow evidence must be exportable, manual interventions must be explainable, integration dependencies must be explicit, and changes to business rules must be governable without destabilising production.

### 2.2 Workstreams
| Workstream | Description |
|---|---|
| Workstream 1 | Mobilisation, detailed discovery, business case refinement and target-state design across business, operations, risk, compliance, architecture, information security and procurement stakeholders. |
| Workstream 2 | Configuration of the platform for digital securities settlement and post-trade recordkeeping, including product templates, token or asset models, workflow approvals, entitlement structures, reporting schemas, data retention rules and control checkpoints. |
| Workstream 3 | Integration delivery for buyer systems, internal ledgers, treasury, custody, onboarding, surveillance, data platforms, regulator reporting interfaces and enterprise security tooling. |
| Workstream 4 | Test execution covering functional, integration, resilience, performance, security, failover and operational-readiness validation, including rehearsal of abnormal scenarios and manual fallback procedures. |
| Workstream 5 | Controlled production rollout, hypercare, KPI tracking, governance reporting, knowledge transfer and transition to steady-state operations with documented support ownership. |
| Workstream 6 | Optional later-phase expansion into new entities, jurisdictions, additional asset or cash products, broader participant connectivity and advanced automation once initial control gates have been satisfied. |

### 2.3 Technical requirements
| Req ID | Requirement | Priority | Response Type | Evidence Requested |
|---|---|---|---|---|
| FR-01 | Support end-to-end lifecycle management for the in-scope use case, including onboarding, approval, issuance/origination, servicing, transfer, settlement, reporting, exception handling, and archival retention. | Mandatory | Comply + narrative | Architecture diagram / control evidence / sample output |
| FR-02 | Provide configurable approval workflows, delegated authority models, four-eyes controls, segregation of duties, and maker-checker patterns by entity, desk, product, and control function. | Mandatory | Comply + narrative | Workflow design / entitlement matrix |
| FR-03 | Expose documented APIs, events, batch interfaces and reconciliation exports for ledger, treasury, custody, onboarding, surveillance, reporting and data-warehouse integration. | Mandatory | Comply + narrative | API catalogue / integration architecture |
| FR-04 | Maintain immutable evidence for instructions, approvals, token or asset state transitions, policy overrides, administrative actions and exception-case decisions. | Mandatory | Comply + narrative | Audit export / sample evidence pack |
| FR-05 | Support configurable product templates, policy rules, eligibility controls, settlement windows and lifecycle parameters without source-code changes for normal business updates. | Mandatory | Narrative + evidence | Configuration model / product template example |
| FR-06 | Support resilient environment separation for development, testing, UAT, production and disaster recovery, with release controls and evidentiary deployment logs. | Mandatory | Comply + narrative | Environment diagram / release process |
| FR-07 | Provide operational dashboards, alerts, queue management, SLA/KPI views and drill-down evidence for business, operations, risk, compliance and technology teams. | Mandatory | Narrative + evidence | Dashboard examples / alert taxonomy |
| FR-08 | Export regulator-ready evidence packs and structured data extracts for internal audit, model validation, regulatory review and board / committee reporting. | Mandatory | Narrative + evidence | Sample export / control mapping |
| FR-09 | Integrate with enterprise identity, secrets management, logging, monitoring, SIEM, case management and data retention tooling approved by the buyer. | Mandatory | Narrative + evidence | Security integration architecture |
| FR-10 | Support phased rollout by entity, geography, participant segment, product or workflow while preserving shared control patterns for digital securities settlement and post-trade recordkeeping. | Mandatory | Narrative + evidence | Rollout plan / tenancy model |
| FR-11 | Provide performance, resilience and concurrency characteristics suitable for production transaction volumes, operational peaks, replay scenarios and recovery windows. | Mandatory | Comply + narrative | NFR evidence / performance test summary |
| FR-12 | Identify all external dependencies on networks, custodians, payment rails, exchanges, registries, attestation providers, oracles, data providers or cloud services. | Mandatory | Comply + narrative | Dependency map |
| FR-13 | Support integration patterns specific to the buyer environment, including DTC, NSCC and post-trade recordkeeping platforms, participant messaging, reconciliation layers, supervisory reporting and synchronized settlement workflows. | Mandatory | Narrative + evidence | Target-state integration blueprint |
| FR-14 | Provide configurable controls for the regulatory perimeter relevant to United States, including recordkeeping, privacy, AML/sanctions checkpoints, outsourcing evidence and supervisory-ready reporting. | Mandatory | Narrative + evidence | Jurisdictional control matrix |
| FR-15 | Support controlled fallback from straight-through processing to manual exception workflows, preserving timestamps, user actions, approval provenance and reconciliation status. | Mandatory | Narrative + evidence | Exception workflow evidence |
| FR-16 | Describe smart-contract, rules-engine or workflow-version governance, including approval, regression testing, segregation of duties, emergency rollback and historical traceability. | Mandatory | Narrative + evidence | Change-control procedure |

### 2.4 High-priority spotlight
In demonstrations and written responses, DTCC will focus especially on whether the bidder can support real operating pressure rather than lab conditions. The buyer wants to see concrete treatment of failed settlement attempts, stale reference data, entitlement mismatches, sanctions or screening holds, cash-versus-asset reconciliation breaks, delayed downstream acknowledgements, participant suspension scenarios, and disaster-recovery cutover with no loss of evidentiary integrity.

The buyer will also test how the proposed platform behaves when policy changes arrive mid-programme. Typical scenarios include new jurisdictional restrictions, different approval thresholds for higher-risk counterparties, additional screening requirements, revised data-retention mandates, new reporting templates, or the introduction of another product or legal entity. Bidders should assume that adaptability under governance pressure matters as much as raw throughput.

## 3. Regulatory & Compliance Requirements

### 3.1 Applicable context
The regulatory and compliance perimeter for this programme should be treated as a first-class design input. For DTCC, respondents should assume direct scrutiny under OCC supervisory expectations, Federal Reserve guidance, SEC and CFTC perimeter questions, FinCEN AML/BSA obligations, state money-transmission or trust rules where applicable, privacy/security obligations and model-risk / third-party-risk governance. The platform must therefore support institution-led compliance rather than merely expose generic configuration switches. Required capabilities include traceable approvals, immutable and time-synchronised records, evidence-grade audit exports, privacy-aware data handling, role-based access control, policy-driven participant eligibility, model and rules governance, incident reporting support and third-party dependency transparency.

The buyer expects respondents to discuss not only what controls exist, but how they operate in practice. For example, how are rules changes approved and evidenced? How is regulatory reporting data sourced and reconciled? How are keys or signing authorities governed? How are sanctions and onboarding dependencies inserted into the workflow without breaking straight-through processing? How are cross-border data-transfer or hosting issues handled? Generic references to certifications will not be enough.

### 3.2 Requirement set
| Req ID | Requirement | Priority |
|---|---|---|
| RC-01 | Provide a compliance mapping for the proposed service model against the principal regulatory frameworks and supervisory themes listed in this RFP. | Mandatory |
| RC-02 | Describe support for audit trails, time-stamped records, data lineage, evidentiary export and supervisory review workflows. | Mandatory |
| RC-03 | Explain privacy, confidentiality, retention and cross-border data handling controls. | Mandatory |
| RC-04 | Identify outsourcing, subcontractor, cloud-hosting and material third-party dependencies together with oversight controls and contractual visibility. | Mandatory |
| RC-05 | Describe resilience controls, business continuity design, incident response responsibilities, disaster recovery evidence and regulator-notification support. | Mandatory |
| RC-06 | Explain how participant onboarding, identity, screening, suitability and permissioning can be integrated into the target operating model. | Mandatory |
| RC-07 | Detail support for jurisdiction-specific obligations applicable in United States, including evidence production and buyer-operated policy controls. | Mandatory |
| RC-08 | Explain how model, rules or smart-contract changes are governed, tested, approved and evidenced across environments. | Mandatory |

### 3.3 Evidence expectations
Evidence provided in response to this procurement should be usable by technology architecture, information security, legal, compliance, operational risk and internal audit teams. At minimum, bidders should be prepared to provide architecture diagrams, deployment models, data-flow maps, entitlement matrices, sample audit exports, incident-handling procedures, control narratives, resilience test summaries, change-governance examples, subprocessor and hosting disclosures, and reference implementation materials. Where evidence cannot be shared immediately, respondents should specify what can be provided under NDA and at what stage.

## 4. Commercial Requirements

### 4.1 Response principles
The buyer expects commercial responses to reflect the reality that regulated-market digital asset programmes consume budget across software, integration, operational readiness, assurance, environments, testing and sustained support. Pricing should therefore distinguish clearly between licence or subscription cost, implementation services, environment cost, support tiers, premium modules, third-party infrastructure fees, cloud or data-provider charges, and any specialist services required for migration, onboarding, reporting or control validation.

Commercial proposals should also acknowledge that procurement decisions at DTCC will be shaped by delivery risk and control cost, not just headline licence value. A lower-priced proposal that relies on hidden custom work, vague managed-service assumptions or late-stage partner negotiations will be treated as higher risk than a more transparent proposal with clearer boundaries and evidence. Bidders should present a multi-year total-cost view and identify the major variables that drive scale.

### 4.2 Contractual baseline
The buyer expects the contractual baseline to address service descriptions, scope boundaries, implementation deliverables, acceptance mechanics, service levels, support windows, incident handling, change control, data protection, information security, subcontracting controls, business continuity, exit assistance, audit rights, regulatory cooperation, confidentiality and dispute handling. Contracts must preserve the buyer's ability to access evidence, review third-party dependencies, validate control ownership and recover data and historical records in usable formats.

The preferred structure is one in which software, implementation, support and optional services are separable for evaluation purposes even if awarded together. Bidders should identify any dependencies on proprietary hosting models, specific cloud services, minimum transaction commitments, network memberships or named partner relationships. Proposals that obscure these dependencies will be marked down because the buyer wants a realistic view of commercial and operational lock-in.

### 4.3 Financial stability
Bidders shall provide evidence of long-term supportability, including corporate structure, financial standing, insurance coverage, material litigation or enforcement matters, product-investment discipline, product roadmap governance and availability of suitably experienced implementation and support personnel. The buyer will consider viability, referenceability and the ability to support regulated programmes over multiple years as part of overall delivery risk.

## 5. Evaluation Criteria

### 5.1 Evaluation model
In addition to the published scoring table, the internal evaluation will emphasise institution-specific fit. Bidders will score well if they show a credible understanding of the buyer's present digital-asset trajectory, align the response to the stated use case rather than generic blockchain language, and provide concrete implementation detail for the buyer environment. Responses that reuse undifferentiated templates, gloss over regulatory nuances, or avoid clear statements about native versus partner-delivered capability will be penalised.

The buyer will also look for signs that the bidder understands operational handoff. Evaluation is not limited to product capability; it includes whether the bidder can help the institution move from discovery through design, implementation, testing, cutover, governance review and steady-state service without leaving unresolved accountability gaps.

Responses will be reviewed through administrative compliance, mandatory-gate assessment, detailed scoring, clarification, demonstrations, architecture review, security/risk review and—at the buyer's discretion—reference validation. Missing mandatory evidence, material ambiguity, failure to preserve buyer numbering, or obvious misalignment with the institution's market context may result in elimination before detailed scoring.

### 5.2 Scoring
| Criterion | Weight | Assessment focus |
|---|---|---|
| Functional fit and workflow coverage | 22% | Alignment to the target operating model for digital securities settlement and post-trade recordkeeping and realism of end-to-end lifecycle coverage |
| Technical architecture and integration maturity | 20% | API/event model, deployment patterns, interoperability with buyer systems, resilience and observability |
| Security, risk and compliance credibility | 20% | Control design, evidence quality, jurisdictional fit and supervisory readiness |
| Implementation and service model | 14% | Delivery realism, governance, staffing, testing discipline and knowledge transfer |
| Data, reconciliation and record integrity | 10% | Books-and-records consistency, auditability, exception handling and operational transparency |
| Commercial value and transparency | 9% | Total cost, clarity of assumptions, pricing discipline and avoidance of hidden dependency cost |
| Vendor viability and references | 5% | Financial standing and comparable delivery experience |

Scoring will generally use a 0–5 rubric, where 0 indicates no credible response, 1 indicates material deficiency, 3 indicates acceptable and sufficiently evidenced coverage, and 5 indicates strong alignment with low perceived delivery risk. Mandatory requirements remain pass/fail regardless of narrative quality.

### 5.3 Award path
The buyer may select a single preferred bidder, appoint multiple bidders by lot or phase, negotiate with shortlisted bidders, launch a proof-of-capability stage prior to contract award, or conclude the process without award. Commercial attractiveness alone will not outweigh weaknesses in governance, evidence, integration realism or resilience. The buyer values controllability and supportability as highly as feature breadth.

## 6. Submission Instructions

### 6.1 Administrative requirements
Submissions shall include a signed cover letter, completed response matrix, architecture package, integration blueprint, security/compliance pack, pricing workbook, assumptions register, deviations log, implementation plan, reference forms and required declarations. Proposals shall remain valid for at least 180 days from the submission deadline unless otherwise agreed.

### 6.2 Formatting
The submission package should be structured so that specialist reviewers can assess it independently. Functional, technical, security, compliance, operations and commercial reviewers must be able to trace each claim back to supporting evidence. Respondents should therefore provide cross-references, explicit assumptions, dependency disclosures and a concise explanation of where buyer decisions or third-party approvals are required.

The bidder shall preserve buyer numbering and wording in all matrices and templates. Searchable PDF is required for the packaged submission, with editable spreadsheet and document formats for pricing and requirement matrices. Responses should prioritise clarity, traceability and evidence references over promotional formatting.

### 6.3 Clarifications
All questions shall be submitted through the designated procurement contact. The buyer may issue anonymised answers to all bidders where fairness requires it. Direct contact with business sponsors or control stakeholders outside the stated process may be treated as a breach of protocol. The buyer may request follow-up workshops focused on architecture, security, operating model, jurisdictional control mapping or commercial assumptions.

## 7. Appendices

### 7.1 Required inventory
Bidders shall provide, at a minimum, a completed requirement matrix, executive summary, architecture pack, integration catalogue, implementation plan, operating model description, security and assurance pack, compliance mapping, pricing workbook, assumptions register, deviations log, financial standing information, reference forms and a responsibility assignment matrix. Partner dependencies must be listed explicitly together with the legal, operational and technical implications of using them.

### 7.2 Declarations
The bidder shall provide declarations covering conflicts of interest, sanctions exposure, pending litigation material to service continuity, insolvency events, regulatory findings material to the proposed service, use of subcontractors, export-control limitations, data-processing roles, insurance coverage, known open-source licensing constraints, and any roadmap dependency that would be material to a 2026–2027 delivery plan. Material omissions may result in disqualification.

### 7.3 Standard response templates
The institution expects a line-by-line response template containing requirement ID, bidder status, response narrative, dependency statement, evidence reference, delivery timing and any buyer-side prerequisite. Pricing must separate one-off and recurring charges, mandatory and optional modules, environments, support, third-party fees and professional services.

## 8. Additional Appendices

### 8.1 Indicative programme assumptions
The buyer assumes a phased implementation consisting of mobilisation, target-state design, control mapping, configuration, integration build, data preparation, testing, operational readiness, controlled go-live and hypercare. The bidder should identify which phases are standard, which require tailoring, and which depend on third-party approvals or memberships.

### 8.2 Responsibility assignment expectations
The bidder shall provide a RACI-style breakdown spanning product governance, onboarding policy, reference-data administration, entitlement administration, workflow approvals, infrastructure operations, key management, security monitoring, incident response, release management, reconciliation, report production, regulator support and archive retrieval. Shared-responsibility ambiguity is unacceptable.

### 8.3 Testing and acceptance template
The buyer expects a detailed testing approach covering configuration validation, integration testing, migration or initial-load validation, security testing, performance validation, failover testing, operational runbook rehearsal and user acceptance. Acceptance criteria should be objective, mapped back to requirement IDs and accompanied by sample evidence artefacts.

### 8.4 Exit and portability expectations
The institution requires clarity on termination assistance, data export formats, retention periods, archive retrieval, cutover to a replacement platform, treatment of historical audit evidence and any dependencies on proprietary contracts, schemas, wallets, key stores or workflow models. Any lock-in should be identified and costed.

### 8.5 Pricing and reference templates
The bidder shall complete a pricing schedule showing base licence or subscription, implementation services, environments, support, optional modules, third-party pass-through costs and scaling assumptions. A reference template shall cover programme objective, client type, jurisdiction, scope, deployment model, regulatory context and timeline.

### 8.6 Governance pack expectations
For DTCC, respondents should assume the institution will require a formal governance pack covering scope, controls, stakeholders, escalation paths, evidentiary outputs, operational ownership, release checkpoints, model/rules governance and board- or committee-level reporting before any production release. That pack must be capable of supporting audit and management review over time.

### 8.7 Integration inventory template
| Area | Illustrative scope |
|---|---|
| Internal systems | DTC, NSCC and post-trade recordkeeping platforms, participant messaging, reconciliation layers, supervisory reporting and synchronized settlement workflows. |
| External infrastructures | Networks, custodians, payment rails, registries, exchanges, depositories, attestation providers, data providers, identity services |
| Control evidence | Approval logs, reconciliation outputs, alert feeds, audit exports, support tickets, release records, rules-change evidence |
| Operational dependencies | Batch windows, latency assumptions, retry behaviour, exception routing, fallback procedures, dependency SLAs |

### 8.8 Risk and control questionnaire
The bidder shall explain key risk scenarios, preventive controls, detective controls, residual manual steps and escalation triggers. At a minimum, scenarios should cover failed approvals, duplicate instructions, entitlement mismatches, delayed settlement, missing data, identity errors, interface outages, corrupt reference data, delayed reconciliations, erroneous mint/burn or issuance events where relevant, key compromise scenarios, smart-contract defects where relevant, and post-cutover defects.

### 8.9 Service-transition expectations
The implementation plan shall show how responsibility transitions from programme delivery to business-as-usual support. This includes knowledge transfer, support acceptance criteria, operating procedures, incident taxonomy, service-level baselines, monitoring ownership, release governance and known-error management.

### 8.10 Evidence-retention checklist
| Category | Illustrative contents |
|---|---|
| Transaction evidence | Instruction timestamps, approval records, settlement history, entitlement updates, state transitions |
| Configuration evidence | Template definitions, rules changes, deployment approvals, environment settings, release tickets |
| Security evidence | Access logs, privileged actions, remediation records, key events, secrets rotation evidence |
| Operational evidence | Incident records, support tickets, alert closures, failover rehearsal results, dependency breach logs |
| Compliance evidence | Audit packs, retention policies, screening checkpoints, reporting outputs, supervisory correspondence support |

Public market intelligence that informed this procurement includes the following illustrative signals relevant to DTCC's current digital-asset direction:

        - **Tokenizing Real-World Assets** — The DTCC webpage on "Tokenizing Real-World Assets" discusses recent developments in digital asset tokenization, emphasizing the role of blockchain technology in transforming traditional financial markets. It highlights DTCC's initiatives to facilitate the secure and efficient digitization of assets, aligning with evolving regulatory frame.
- **DTCC Partners With Digital Asset To Tokenize DTC-Custodied U.S. Treasury Securities - Fin Tech - United States** — The DTCC (Depository Trust & Clearing Corporation) has announced a partnership with Digital Asset to tokenize DTC-custodied U.S. Treasury securities using blockchain technology. This initiative aims to modernize the securities settlement process, enhance efficiency, and reduce risks associated with traditional methods. The collaboration r.
- **DTCC and Digital Asset Partner to Tokenize DTC-Custodied U.S. ...** — The DTCC has partnered with Digital Asset to advance the tokenization of DTC-custodied U.S. Treasury securities on the Canton Network, leveraging blockchain technology. This initiative aims to modernize securities processing, enhance efficiency, and reduce settlement times. Recent announcements highlight DTCC's strategic move into digital.
- **Paving the Way to Tokenized DTC-Custodied Assets** — The DTCC (Depository Trust & Clearing Corporation) is actively advancing the tokenization of digital assets, including DTC-custodied assets, leveraging blockchain technology to enhance efficiency and security in post-trade processes. Recent announcements highlight DTCC's initiatives to develop infrastructure for secure, scalable tokenized.

        These references are not incorporated as legal fact statements or binding programme requirements. They are included to show the kinds of initiatives, architecture choices, counterparties, market trends and governance themes that the buyer expects respondents to understand and address explicitly.

The institution also expects a detailed data-flow narrative for digital securities settlement and post-trade recordkeeping, including source systems, reference-data ownership, event sequencing, reconciliation checkpoints, exception states and archive locations. Where external parties contribute data or approvals, the response should describe how those dependencies are monitored and evidenced.

Operational readiness must include training, runbooks, service routing, incident triage, disaster-recovery rehearsal, release governance and post-go-live metrics. The buyer is not interested in a narrow technical deployment that leaves surrounding process ownership undefined.


### 8.11 Institution-specific operating scenarios
Respondents should assume that DTCC will test the proposed solution against realistic operating scenarios rather than abstract architecture claims. At a minimum, the response should explain workflow behaviour for normal processing, stress periods, delayed external acknowledgement, participant suspension, reference-data correction, recovery after a regional outage and audit or supervisory evidence retrieval.

### 8.12 Institution-specific use-case detail
The buyer expects respondents to map their response directly to digital securities settlement and post-trade recordkeeping. The response should describe the product or asset model, relevant cash leg, approval hierarchy, participant population, booking and settlement touchpoints, reporting outputs and likely control friction points in a live programme.

### 8.13 Research and market-intelligence references
- Tokenizing Real-World Assets: The DTCC webpage on "Tokenizing Real-World Assets" discusses recent developments in digital asset tokenization, emphasizing the role of blockchain technology in transforming traditional financial markets. It highlights D
- DTCC Partners With Digital Asset To Tokenize DTC-Custodied U.S. Treasury Securities - Fin Tech - United States: The DTCC (Depository Trust & Clearing Corporation) has announced a partnership with Digital Asset to tokenize DTC-custodied U.S. Treasury securities using blockchain technology. This initiative aims to modernize the secu
- DTCC and Digital Asset Partner to Tokenize DTC-Custodied U.S. ...: The DTCC has partnered with Digital Asset to advance the tokenization of DTC-custodied U.S. Treasury securities on the Canton Network, leveraging blockchain technology. This initiative aims to modernize securities proces
- Paving the Way to Tokenized DTC-Custodied Assets: The DTCC (Depository Trust & Clearing Corporation) is actively advancing the tokenization of digital assets, including DTC-custodied assets, leveraging blockchain technology to enhance efficiency and security in post-tra

### 8.14 Detailed control and evidence expectations
The buyer expects a layered evidence model covering transaction events, policy and configuration changes, infrastructure state, dependency incidents, governance approvals and remediation tracking.


### 8.15 Expanded implementation and integration expectations
The bidder shall provide a detailed implementation plan with milestone-level deliverables, dependency sequencing, control gates and rollback criteria.

### 8.16 Expanded delivery, support and governance expectations
The institution expects the selected bidder to support more than initial deployment, including release planning, defect triage, dependency management, service reporting and scheduled resilience testing.

### 8.17 Additional enterprise-operating-model detail
The buyer expects the selected platform to fit within architecture governance, procurement oversight, security review, compliance monitoring, internal audit access and executive steering routines.

### 8.18 Expanded enterprise integration architecture
The bidder shall provide a company-specific integration architecture for DTCC that goes beyond a generic API list. At minimum, the response shall identify how the proposed platform connects to Fedwire-adjacent cash movement, broker-dealer or bank controls, sanctions screening, and evidence packaging suitable for internal audit and supervisors, how authoritative systems of record are designated, where transformation logic resides, which events are published synchronously versus asynchronously, and how retry, replay and duplicate-prevention logic is controlled. The buyer expects the bidder to distinguish launch-phase integrations from later-phase expansions and to state clearly whether each dependency is native, partner-provided or buyer-built.

The integration narrative shall also explain identity, entitlement and environment-management boundaries. For example, the bidder should describe how enterprise identity and privileged-access tooling governs operator, approver, support and break-glass access; how secrets, certificates and signing authorities are rotated; how environment-specific configuration is versioned; and how operational telemetry is routed into the buyer's existing monitoring and case-management stack. For DTCC, an answer that only states "REST APIs available" is inadequate. The buyer wants to know how upstream reference data, downstream books and records, screening controls and audit exports stay synchronised under real operating pressure.

Specific attention shall be paid to market and treasury data dependencies relevant to digital securities settlement and post-trade recordkeeping. The solution should document how reference data, eligibility data, rate or pricing inputs, participant status, sanctions screening results and settlement confirmations are validated before driving workflow state changes. Where a single business event requires updates across multiple platforms, the bidder shall identify the orchestration pattern, idempotency controls, compensating actions and evidence captured when one downstream leg succeeds and another fails. Because the buyer is itself market infrastructure, exchange or public-sector financial infrastructure, the proposal must show how participant governance, evidence production and systemic-resilience expectations are met at platform level rather than by manual overlays.

### 8.19 Jurisdiction-specific compliance deep dive
For this procurement, respondents shall map platform controls explicitly to SEC, CFTC, FinCEN, OCC, Federal Reserve and relevant state banking, money-transmission or trust authorities. The mapping shall not be limited to a compliance appendix; it must show how the identified obligations influence workflow design, approval evidence, participant eligibility, record retention, incident escalation and third-party oversight across the core sections of the proposal. In particular, the bidder shall explain how the platform supports books-and-records integrity, immutable event history, policy-driven holds, controlled overrides, supervisory evidence retrieval and defensible governance for rules-engine, smart-contract or product-template changes.

The bidder shall also address operational compliance design for digital securities settlement and post-trade recordkeeping. This includes product configuration governance, approval workflows, reference-data quality, reconciliation evidence and controlled exception handling. Where the regulatory perimeter depends on business structure, the bidder shall present configurable options together with the residual responsibilities that remain with DTCC. Responses must identify what evidence is generated natively, what is derived via integration, how timestamps are normalised across components, and how legal-entity, desk or participant segmentation is preserved in both the live operating model and archived records.

Data-protection and confidentiality controls must be mapped to CCPA/CPRA, GLBA expectations, state breach-notification rules and cross-border transfer controls for U.S.-origin records. The response shall explain retention schedules, data-minimisation options, masking or tokenisation for non-production environments, legal-hold handling, privileged-support restrictions and the process for evidencing deletion or archival transfer when retention periods expire. Where data traverses non-U.S. regions, the bidder shall identify lawful-transfer mechanics, encryption boundaries, support-access restrictions and evidence demonstrating that U.S. supervisory retrieval can be performed without dependence on uncontrolled offshore workflows.

### 8.20 Detailed operating-scenario appendix
The following scenarios are intended to test whether the proposed platform can keep DTCC's control environment intact while supporting digital securities settlement and post-trade recordkeeping. Respondents shall describe native product behaviour, configuration points, integration dependencies, operational ownership, evidence outputs and fallback procedures for each scenario.

**Scenario A — Corporate action or lifecycle-event processing under timing pressure.** A material lifecycle event affects in-scope positions shortly before a funding, settlement or client-reporting cut-off. The buyer expects the platform to ingest the event, validate entitlements, apply product-policy rules, pause or continue downstream processing as appropriate, and produce a clear audit trail showing who approved the treatment. The response shall cover timing windows, reference-data correction handling, rebooking or restatement logic, client-notification support and how reconciliations are refreshed after the event is applied.

**Scenario B — Emergency restriction, wallet freeze or participant suspension.** A fraud, sanctions, legal-order or risk event requires immediate restriction of one or more participants, accounts or wallets associated with digital securities settlement and post-trade recordkeeping. The bidder shall explain how emergency controls are invoked, what segregation-of-duties safeguards remain in place, how open instructions are handled, how downstream systems are notified and what evidence is captured for compliance, legal and audit review. The buyer will mark down any response that assumes informal manual intervention without structured logging, approval provenance and post-event reconciliation.

**Scenario C — Cross-border settlement or dependency failure.** A payment, depository, correspondent, exchange or cloud dependency relevant to the transaction flow becomes unavailable after some workflow steps have completed. The response shall describe event correlation, queue management, duplicate suppression, compensating actions, manual intervention thresholds and operational dashboards visible to business and technology teams. The bidder should also show how the platform preserves customer or participant-facing status, prevents silent data divergence across ledgers and supports controlled recovery once the dependency resumes.

**Scenario D — Regulatory reporting edge case and late data correction.** After transactions have been processed, a regulator, internal audit team or market infrastructure requests evidence that reveals a data-quality issue or classification error in previously submitted records. The response shall explain how the platform traces lineage back to source events, identifies affected records, supports correction approval, republishes amended outputs and preserves both original and corrected versions for review. For DTCC, the buyer expects a precise explanation of how this process is governed rather than a generic statement that reports can be regenerated.

### 8.21 Evaluation-weighting narrative and detailed rubrics
The published scoring table should be interpreted as a minimum structure rather than the full evaluation logic. Within each weighted category, the buyer will assign higher scores to responses that combine product capability with implementation realism, evidence quality and transparency on dependency boundaries. A score of 5 will generally require that the bidder provide a clear operating model, native control coverage, explicit integration patterns for Fedwire-adjacent cash movement, broker-dealer or bank controls, sanctions screening, and evidence packaging suitable for internal audit and supervisors, strong abnormal-scenario treatment and documentary evidence that the capability has been exercised in environments of comparable control intensity. A score of 3 may be awarded where the feature exists and the narrative is broadly credible but material evidence, target-state detail or governance clarity is missing.

For technical architecture and integration maturity, evaluators will look beyond interface counts. High-scoring responses will identify authoritative record systems, sequencing logic, reconciliation boundaries, observability patterns, DR design and how configuration changes are promoted safely across environments. For security, risk and compliance credibility, evaluators will look for mapped obligations, evidence packaging, role design, incident-response discipline and transparent treatment of subcontractors and hosting dependencies. For implementation and service model, evaluators will reward named work products, acceptance criteria, resource profiles, knowledge-transfer plans and realistic control-gate sequencing.

Commercial scoring will also be narrative-driven. The buyer will not reward superficially low pricing if it depends on undefined partner work, consumption assumptions that shift risk to the buyer, or late-stage customisation to achieve mandatory controls. Vendor viability scoring will consider not just financial position, but the bidder's ability to sustain audits, incident support, product governance and roadmap discipline through a multi-year regulated programme. Respondents should therefore use this section to make the evaluator's job easy: link each major claim to evidence, state limits openly and show why the delivery model lowers execution risk for DTCC.

### 8.22 Vendor qualification, assurance and resilience requirements
In addition to commercial and functional responses, the bidder shall provide a formal qualification pack covering corporate insurance, control assurance and operational resilience. Minimum disclosure shall include professional indemnity / errors and omissions coverage, cyber-liability coverage, crime or fidelity coverage where relevant, and directors-and-officers coverage if the proposed service model materially depends on vendor governance decisions. Policy amounts, exclusions, insurer rating and territorial scope shall be disclosed. If coverage differs by delivery model, jurisdiction or subcontractor, the bidder shall identify the gap explicitly.

The buyer also requires current assurance evidence, including SOC 1 and SOC 2 status where applicable, independent penetration-testing summaries, vulnerability-management cadence, material findings remediation evidence, disaster-recovery test summaries, business-continuity plans and crisis-management roles. Where the bidder relies on cloud providers, custodians, payment partners or data vendors, the qualification pack shall show how those dependencies are reviewed, what right-to-audit or substitute-control evidence is available, and how concentration risk is monitored. For DTCC, assertions that a major cloud provider is "secure by default" are not enough; the bidder must explain the inherited versus implemented control split.

Resilience disclosures shall cover recovery time objective, recovery point objective, backup strategy, multi-region or multi-zone design, staff escalation coverage, incident-severity taxonomy and customer-notification commitments. The bidder shall explain how failover is tested for the exact workflows relevant to digital securities settlement and post-trade recordkeeping, how evidence is preserved during an incident, and how the buyer can independently verify recovery success before returning to business-as-usual processing. Responses lacking this operational depth will be viewed as immature regardless of feature breadth.

### 8.23 Data governance, residency and cross-border data controls
The bidder shall provide a detailed data-governance model covering source-system ownership, data classification, schema control, retention, access management and cross-border transfer governance. For DTCC, the model must distinguish transaction data, participant identity data, entitlement and position data, surveillance outputs, support metadata, configuration records and audit evidence. The response shall identify which fields are mandatory for straight-through processing, which can be masked or pseudonymised, how non-production data sets are protected, and how lineage is retained from inbound event through downstream reporting and archive.

Data-residency design must be explicit. If the solution stores primary records, analytics replicas, backups, logs or support artefacts in multiple jurisdictions, the bidder shall identify each location, each data class involved, the lawful basis for transfer, encryption standards, key-custody model and operational-access restrictions. The buyer will also expect a clear explanation of how cross-border service desk access is governed, how emergency access is logged, and how regulator or audit retrieval is performed without weakening segregation of duties. Where AI-assisted operations, analytics or monitoring are used, the bidder shall disclose whether any buyer data is retained for model training or vendor product improvement and how that use is contractually restricted.

Finally, the response shall explain how privacy and data-governance obligations are reflected in contract terms, runbooks and steady-state operations. The buyer expects defined owners for data-quality remediation, subject-access or records-access support where applicable, deletion certification, legal-hold suspension of deletion, breach assessment and communication with upstream or downstream counterparties when bad data propagates beyond the platform boundary. The selected bidder must be able to demonstrate that data governance for digital securities settlement and post-trade recordkeeping is not an afterthought but an operationally tested component of the service model.

### 8.24 Programme governance, acceptance and transition detail
The bidder shall include a phase-by-phase governance plan for DTCC's implementation of digital securities settlement and post-trade recordkeeping, covering mobilisation, design authority, control sign-off, configuration approval, integration readiness, test exit, production go/no-go and transition into steady-state support. Each gate should identify required artefacts, named approvers, unresolved-risk thresholds and rollback criteria. The buyer expects technology, operations, compliance, legal, procurement and business owners to review the programme at different points, so the proposed governance model must show how those approvals are sequenced without slowing urgent decision-making or allowing undocumented exceptions.

Acceptance criteria must also be explicit. For launch, the buyer expects measurable conditions for functional completeness, books-and-records integrity, reconciliations, security controls, resilience evidence, user access, reporting outputs and runbook readiness. The bidder shall define what constitutes a critical, major or minor defect; how waived defects are governed; how retesting is evidenced; and how the institution can independently validate that manual fallback procedures work for digital securities settlement and post-trade recordkeeping. It will not be acceptable to rely solely on bidder attestation that a configuration is production-ready.

The transition plan shall cover hypercare staffing, service-hours alignment, incident routing, dependency escalation, known-error management, capacity monitoring and the handoff of configuration knowledge to buyer teams. Where the target operating model spans multiple legal entities, jurisdictions or partner relationships in United States, the response should explain how support ownership, change approvals and evidence retention remain consistent across that footprint. The institution will score highly any response that demonstrates a controlled path from pilot or limited launch into broader production use without re-architecting core controls, data lineage or governance.



### 8.25 Final delivery-risk clarifications
For avoidance of doubt, DTCC will treat unanswered delivery-risk questions as a material weakness even where the product appears functionally strong. The bidder should therefore identify non-standard assumptions, unresolved third-party dependencies, minimum-volume thresholds, jurisdictional constraints, roadmap items, implementation accelerators that require buyer resources, and any feature areas where manual controls remain necessary for digital securities settlement and post-trade recordkeeping. This clarification section should also state what the buyer must provide to keep timeline, budget and control outcomes realistic.

The buyer further expects a short list of day-one reports, dashboards and management information outputs that operations, compliance, technology and executives would need in order to supervise the programme effectively. At minimum, those outputs should cover processing status, exception inventory, unresolved reconciliation breaks, participant restrictions, integration health, security events, release history and evidence-pack retrieval. Responses that make these supervision needs concrete will be scored more favourably than responses that stay at promotional level.


### 8.26 Residual-risk and operating-metrics detail
The bidder should provide a final residual-risk assessment for DTCC's proposed deployment of digital securities settlement and post-trade recordkeeping, explicitly identifying which risks are eliminated by native platform controls, which are reduced through integration and governance, and which remain under buyer ownership after go-live. This assessment should cover data quality, identity and entitlement errors, dependency outages, settlement timing breaks, regulatory reporting defects, privileged-access misuse, configuration drift, release failures and business-continuity gaps. The buyer is not looking for a generic red-amber-green chart; it is looking for a practical explanation of what could still go wrong in production, what early-warning indicators would expose the issue, and what evidence would exist to support remediation and management escalation.

Respondents should also propose an operating-metrics pack suitable for weekly programme governance and monthly executive review. At minimum, the pack should include transaction volumes, straight-through-processing rate, exception inventory, aged reconciliation breaks, dependency incidents, approval turnaround times, access-control exceptions, failed or delayed settlement items, reporting corrections, release defects, recovery-test outcomes and open remediation actions. Each metric should have a named owner, source system, calculation logic and escalation threshold. The buyer expects this management information to be available from day one or to have a clearly defined delivery path in the implementation plan.

Finally, the response should explain how these metrics connect to ongoing service improvement. DTCC will favour bidders that can show how operational telemetry, user feedback, audit findings and regulator observations feed back into product configuration, workflow refinement, staffing decisions and release priorities without creating undocumented control changes. For this use case, the institution wants assurance that steady-state operations will become more disciplined over time rather than slowly accumulating hidden manual workarounds. A strong answer will therefore link metrics to governance forums, corrective-action tracking, control testing and formal sign-off for any material process change.
