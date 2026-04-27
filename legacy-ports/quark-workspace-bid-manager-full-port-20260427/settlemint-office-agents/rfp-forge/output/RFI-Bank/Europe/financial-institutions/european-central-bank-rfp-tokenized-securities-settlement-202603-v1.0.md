# Request for Information (RFI): Tokenized Securities Settlement

| Field | Value |
| --- | --- |
| Reference number | EUROPEANCENTRALBANK-RFI-202603 |
| Version | v1.0 |
| Issue date | March 2026 |
| Issuing institution | European Central Bank |
| Jurisdiction | European Union |
| Currency reference | EUR |
| Process type | Buyer-side non-binding market inquiry |
| Response deadline | 22 April 2026 17:00 local time |
| Clarification deadline | 08 April 2026 17:00 local time |
| Response validity | 120 calendar days |
| Primary contact | Procurement Secretariat – Digital Assets Programme |

## 1. Procurement Context

### 1.1 Purpose of this RFI
European Central Bank is issuing this procurement document in its capacity as a central bank and Eurosystem authority operating within European Union. The purpose of this exercise is to assess the market’s ability to provide a controlled, production-grade solution for tokenized securities settlement. The buyer is not seeking speculative innovation theatre. It is seeking an auditable platform and delivery approach that can be governed under institutional change control, integrated into existing operating models, and evidenced to internal risk, security, legal, procurement, and oversight stakeholders. Current market and policy developments have increased pressure to support digitally native instruments and tokenized workflows without weakening the disciplines that already govern high-value market infrastructure. The buyer therefore expects vendors to demonstrate not only functional coverage but also the operational maturity needed for critical financial workflows.

The current-state drivers for this procurement include the need to improve processing efficiency, support new digital asset use cases, reduce manual exception handling, create stronger data transparency, and establish a future-ready architecture that can interoperate with incumbent systems. This document should be read as a buyer-side control instrument. Mandatory requirements, evaluation criteria, submission rules, and evidence expectations have been designed to force directly comparable responses. Vendors shall therefore avoid generic marketing language and shall instead provide precise, testable, and institutionally relevant evidence. The drafting style for this document is intentionally formal and control-led. The buyer requires responses that distinguish policy authority from operational responsibility, preserve legal certainty for critical state transitions, and support supervisory review without dependence on proprietary black-box processes.

The buyer’s strategic intent is not to replace governance with technology; it is to make governance executable inside the technology stack. Any proposed solution must therefore support robust segregation of duties, transparent operator actions, well-defined failure handling, and integration into established risk and assurance processes. The buyer expects detailed disclosure of solution boundaries, assumptions, and third-party dependencies. European Central Bank reserves the right to reject any proposal that relies on unclear roadmap commitments, unsupported legal assumptions, or immature operational models. Applicable regulatory reference points include T2/T2S policy alignment, DORA, GDPR, NIS2, AML/CFT framework where relevant, CPMI-IOSCO PFMI, EU data and outsourcing requirements. These references are not exhaustive and vendors remain responsible for identifying any other frameworks relevant to the proposed delivery model.

This RFI is exploratory and non-binding. It is intended to help the buyer understand current market capability, likely delivery models, control maturity, and major commercial drivers for **tokenized securities settlement**. The buyer may use the results to shape a later RFP, pilot, framework procurement, policy recommendation, internal architecture decision, or no further action. Vendors shall therefore answer candidly and distinguish between functionality that exists today and functionality that is merely planned.

### 1.2 Discovery Objectives
The buyer is using this RFI to gather structured insight on the following review themes:

| Theme | Key buyer questions |
| --- | --- |
| Capability maturity | Which workflows are production-proven versus conceptual? |
| Control model | How are approvals, exceptions, logs, and role segregation implemented? |
| Integration | What patterns exist for interoperability with existing infrastructure and control systems? |
| Regulatory posture | How does the offering support evidence, audit, and regulatory access? |
| Commercial model | What are the main pricing drivers and deployment assumptions? |
| Roadmap transparency | Which requested items are not available today and what is the delivery certainty? |

Responses will be used to compare maturity, not to reward the broadest claims. The buyer would rather see a precise answer with clearly bounded limitations than a glossy response that hides operational dependencies. Vendors shall therefore separate product capability, implementation work, partner capability, and roadmap items. Where a requested capability is only available in another jurisdiction, deployment model, or regulatory perimeter, that boundary must be stated explicitly.

### 1.3 Response Rules and Capability Status Legend
Vendors shall complete the response matrices using the status codes below and shall provide explanatory commentary wherever the status is not “Current.”

| Status code | Meaning |
| --- | --- |
| Current | Supported in generally available form at response date |
| Configured | Supported through standard configuration, implementation, or integration work |
| Partner | Supported through a named partner or third-party component |
| Roadmap | Not yet generally available; provide target timing and certainty level |
| Not supported | Capability not offered |

The buyer expects concise but substantive explanations. Responses should describe how a capability works, what configuration or partner dependency is involved, what evidence exists from production use, and which assumptions would apply in the buyer’s environment. Unsupported future-looking statements may be excluded from comparative review.

## 2. Scope of Work

### 2.1 Functional and Operating Model Discovery
The scope of work covers the design, configuration, delivery, testing, and support arrangements necessary to establish a controlled operating capability for tokenized securities settlement. Scope includes business workflow configuration, security architecture, integration design, environment setup, migration support, testing, operational readiness, training, and post-go-live stabilization. Where interfaces to existing market infrastructure, treasury systems, custody platforms, listing workflows, payment rails, risk engines, or supervisory reporting processes are required, bidders shall identify the interface pattern, protocol assumptions, performance dependencies, and control ownership boundaries. The buyer expects a delivery model that is realistic about institutional decision cycles, formal approvals, and evidence needs.

Out of scope unless explicitly proposed as an optional item are broad transformation activities unrelated to the stated use case, legal entity restructuring, unmanaged reliance on experimental public infrastructure, and custom development models that cannot be supported through documented product governance. Bidders must distinguish between standard product capability, configurable implementation components, third-party supplied functions, and bespoke adaptation. Where the proposed solution depends on external components such as custody modules, identity services, HSMs, cloud services, settlement connectors, market data tools, or compliance screening engines, the bidder shall clearly define which party is accountable for procurement, support, incident resolution, and regulatory evidence.

The buyer expects the delivered scope to culminate in an operationally supportable service rather than a demonstration environment. That means tested controls, runbooks, agreed service levels, documented recovery procedures, and a viable long-term maintenance model. The bidder shall explicitly identify all assumptions, exclusions, and buyer-side dependencies. If the bidder proposes phased delivery, each phase shall have a defined scope, measurable outcomes, and entry/exit criteria. No scope assumption may be implied through silence.

The buyer seeks information covering business workflow support, technical architecture, integration patterns, security and compliance controls, data handling, operational support, recovery arrangements, and indicative implementation approach. The buyer is especially interested in how proposed offerings behave under exception conditions, governance changes, volume spikes, participant disputes, and supervisory scrutiny.

### 2.2 Technical Requirements / Information Requests
The information requests below are structured and prioritized to support comparison. **P1** indicates material review importance, though this remains an exploratory exercise rather than an award-stage compliance test.

| ID | Priority | Information request | Evidence requested | Vendor status response |
| --- | --- | --- | --- | --- |
| TR-001 | P1 | Support atomic or tightly controlled delivery-versus-payment workflow orchestration with explicit exception handling. | Detailed narrative, architecture diagram, control description, and client reference evidence | Current / Configured / Partner / Roadmap / Not supported |
| TR-002 | P1 | Provide finality-state management, reconciliation controls, and end-of-day evidence outputs. | Detailed narrative, architecture diagram, control description, and client reference evidence | Current / Configured / Partner / Roadmap / Not supported |
| TR-003 | P1 | Support participant messaging, queue management, and settlement prioritization rules. | Detailed narrative, architecture diagram, control description, and client reference evidence | Current / Configured / Partner / Roadmap / Not supported |
| TR-004 | P1 | Provide integration options for cash leg coordination, liquidity checks, and settlement instruction enrichment. | Detailed narrative, architecture diagram, control description, and client reference evidence | Current / Configured / Partner / Roadmap / Not supported |
| TR-005 | P1 | Support corporate-action, entitlement, and lifecycle-event propagation where applicable. | Detailed narrative, architecture diagram, control description, and client reference evidence | Current / Configured / Partner / Roadmap / Not supported |
| TR-006 | P2 | Provide bilateral and multilateral reconciliation across participant, operator, and ledger views. | Detailed narrative, architecture diagram, control description, and client reference evidence | Current / Configured / Partner / Roadmap / Not supported |
| TR-007 | P2 | Support cut-off management, daylight saving control, and jurisdiction-specific calendar handling. | Detailed narrative, architecture diagram, control description, and client reference evidence | Current / Configured / Partner / Roadmap / Not supported |
| TR-008 | P2 | Provide failover procedures that preserve message integrity and duplicate prevention. | Detailed narrative, architecture diagram, control description, and client reference evidence | Current / Configured / Partner / Roadmap / Not supported |
| TR-009 | P2 | Support intraday monitoring of pending, matched, failed, recycled, and settled instructions. | Detailed narrative, architecture diagram, control description, and client reference evidence | Current / Configured / Partner / Roadmap / Not supported |
| TR-010 | P3 | Provide configurable tolerance rules, break management, and exception evidence packages. | Detailed narrative, architecture diagram, control description, and client reference evidence | Current / Configured / Partner / Roadmap / Not supported |
| TR-011 | P3 | Provide logically segregated environments for development, test, pre-production, and production with controlled promotion paths. | Detailed narrative, architecture diagram, control description, and client reference evidence | Current / Configured / Partner / Roadmap / Not supported |
| TR-012 | P3 | Support infrastructure-as-code, configuration baselining, and repeatable environment reconstruction. | Detailed narrative, architecture diagram, control description, and client reference evidence | Current / Configured / Partner / Roadmap / Not supported |
| TR-013 | P1 | Provide immutable audit logs for privileged actions, configuration changes, and critical operational events. | Detailed narrative, architecture diagram, control description, and client reference evidence | Current / Configured / Partner / Roadmap / Not supported |
| TR-014 | P1 | Support high-availability deployment patterns across independent failure domains with no single point of failure. | Detailed narrative, architecture diagram, control description, and client reference evidence | Current / Configured / Partner / Roadmap / Not supported |
| TR-015 | P1 | Expose comprehensive observability across application, infrastructure, message flow, and business process layers. | Detailed narrative, architecture diagram, control description, and client reference evidence | Current / Configured / Partner / Roadmap / Not supported |
| TR-016 | P1 | Support time synchronization, evidence-grade timestamping, and log correlation across distributed components. | Detailed narrative, architecture diagram, control description, and client reference evidence | Current / Configured / Partner / Roadmap / Not supported |
| TR-017 | P1 | Provide backup, restore, and disaster recovery procedures with documented recovery objectives. | Detailed narrative, architecture diagram, control description, and client reference evidence | Current / Configured / Partner / Roadmap / Not supported |
| TR-018 | P2 | Support secure API access using modern authentication and authorization standards. | Detailed narrative, architecture diagram, control description, and client reference evidence | Current / Configured / Partner / Roadmap / Not supported |
| TR-019 | P2 | Enable controlled software release management including rollback procedures and maintenance windows. | Detailed narrative, architecture diagram, control description, and client reference evidence | Current / Configured / Partner / Roadmap / Not supported |
| TR-020 | P2 | Provide formal runbooks for incident response, capacity management, and operational handover. | Detailed narrative, architecture diagram, control description, and client reference evidence | Current / Configured / Partner / Roadmap / Not supported |
| TR-021 | P2 | Support evidence-based performance testing under representative and stress conditions. | Detailed narrative, architecture diagram, control description, and client reference evidence | Current / Configured / Partner / Roadmap / Not supported |
| TR-022 | P3 | Provide operator controls for configuration freeze, emergency access, and controlled degradation modes. | Detailed narrative, architecture diagram, control description, and client reference evidence | Current / Configured / Partner / Roadmap / Not supported |
| TR-023 | P3 | Implement strong identity and access management with role separation, least privilege, and privileged access monitoring. | Detailed narrative, architecture diagram, control description, and client reference evidence | Current / Configured / Partner / Roadmap / Not supported |
| TR-024 | P3 | Provide encryption for data in transit and at rest with documented key-management controls and segregation of duties. | Detailed narrative, architecture diagram, control description, and client reference evidence | Current / Configured / Partner / Roadmap / Not supported |
| TR-025 | P1 | Support security event monitoring and integration into the institution’s SIEM and case-management tooling. | Detailed narrative, architecture diagram, control description, and client reference evidence | Current / Configured / Partner / Roadmap / Not supported |
| TR-026 | P1 | Provide vulnerability management, patch governance, software bill of materials, and dependency disclosure. | Detailed narrative, architecture diagram, control description, and client reference evidence | Current / Configured / Partner / Roadmap / Not supported |
| TR-027 | P1 | Demonstrate secure development lifecycle controls including code review, testing, and change approval gates. | Detailed narrative, architecture diagram, control description, and client reference evidence | Current / Configured / Partner / Roadmap / Not supported |
| TR-028 | P1 | Support data classification, retention, deletion, and evidencing of data-handling controls. | Detailed narrative, architecture diagram, control description, and client reference evidence | Current / Configured / Partner / Roadmap / Not supported |
| TR-029 | P1 | Provide incident notification procedures aligned to applicable regulatory timelines and institutional escalation paths. | Detailed narrative, architecture diagram, control description, and client reference evidence | Current / Configured / Partner / Roadmap / Not supported |
| TR-030 | P2 | Support network segmentation, API protection, certificate lifecycle control, and secrets management. | Detailed narrative, architecture diagram, control description, and client reference evidence | Current / Configured / Partner / Roadmap / Not supported |
| TR-031 | P2 | Provide resilience against denial-of-service, message replay, duplicate processing, and operator error. | Detailed narrative, architecture diagram, control description, and client reference evidence | Current / Configured / Partner / Roadmap / Not supported |
| TR-032 | P2 | Demonstrate third-party risk management for subcontractors, hosting providers, and critical dependencies. | Detailed narrative, architecture diagram, control description, and client reference evidence | Current / Configured / Partner / Roadmap / Not supported |
| TR-033 | P2 | Provide penetration testing evidence and remediation tracking for identified findings. | Detailed narrative, architecture diagram, control description, and client reference evidence | Current / Configured / Partner / Roadmap / Not supported |
| TR-034 | P3 | Support cryptographic agility and controlled key rotation without service disruption. | Detailed narrative, architecture diagram, control description, and client reference evidence | Current / Configured / Partner / Roadmap / Not supported |
| TR-035 | P3 | Provide a delivery plan with milestones, dependencies, resourcing assumptions, and acceptance criteria. | Detailed narrative, architecture diagram, control description, and client reference evidence | Current / Configured / Partner / Roadmap / Not supported |
| TR-036 | P3 | Identify buyer dependencies requiring timely decisions, data, access, or policy input. | Detailed narrative, architecture diagram, control description, and client reference evidence | Current / Configured / Partner / Roadmap / Not supported |
| TR-037 | P1 | Provide a migration approach for interfaces, data, participant onboarding, and operational cutover. | Detailed narrative, architecture diagram, control description, and client reference evidence | Current / Configured / Partner / Roadmap / Not supported |
| TR-038 | P1 | Support structured testing phases including unit, system, integration, performance, security, and operational readiness. | Detailed narrative, architecture diagram, control description, and client reference evidence | Current / Configured / Partner / Roadmap / Not supported |
| TR-039 | P1 | Provide training materials for operations, support, security, and business administrators. | Detailed narrative, architecture diagram, control description, and client reference evidence | Current / Configured / Partner / Roadmap / Not supported |
| TR-040 | P1 | Define service transition deliverables including runbooks, support model, and knowledge transfer evidence. | Detailed narrative, architecture diagram, control description, and client reference evidence | Current / Configured / Partner / Roadmap / Not supported |
| TR-041 | P1 | Provide governance forums, reporting cadence, issue escalation, and decision control points. | Detailed narrative, architecture diagram, control description, and client reference evidence | Current / Configured / Partner / Roadmap / Not supported |
| TR-042 | P2 | State assumptions relating to third-party connectivity, environment readiness, and institutional approvals. | Detailed narrative, architecture diagram, control description, and client reference evidence | Current / Configured / Partner / Roadmap / Not supported |

### 2.3 Priority Themes for Follow-up Discussion
The buyer expects follow-up discussion to focus particularly on the following items:

- **TR-001 (P1)** — Support atomic or tightly controlled delivery-versus-payment workflow orchestration with explicit exception handling.
- **TR-002 (P1)** — Provide finality-state management, reconciliation controls, and end-of-day evidence outputs.
- **TR-003 (P1)** — Support participant messaging, queue management, and settlement prioritization rules.
- **TR-004 (P1)** — Provide integration options for cash leg coordination, liquidity checks, and settlement instruction enrichment.
- **TR-005 (P1)** — Support corporate-action, entitlement, and lifecycle-event propagation where applicable.
- **TR-006 (P2)** — Provide bilateral and multilateral reconciliation across participant, operator, and ledger views.
- **TR-007 (P2)** — Support cut-off management, daylight saving control, and jurisdiction-specific calendar handling.
- **TR-008 (P2)** — Provide failover procedures that preserve message integrity and duplicate prevention.
- **TR-009 (P2)** — Support intraday monitoring of pending, matched, failed, recycled, and settled instructions.
- **TR-010 (P3)** — Provide configurable tolerance rules, break management, and exception evidence packages.
- **TR-011 (P3)** — Provide logically segregated environments for development, test, pre-production, and production with controlled promotion paths.
- **TR-012 (P3)** — Support infrastructure-as-code, configuration baselining, and repeatable environment reconstruction.
- **TR-013 (P1)** — Provide immutable audit logs for privileged actions, configuration changes, and critical operational events.
- **TR-014 (P1)** — Support high-availability deployment patterns across independent failure domains with no single point of failure.
- **TR-015 (P1)** — Expose comprehensive observability across application, infrastructure, message flow, and business process layers.
- **TR-016 (P1)** — Support time synchronization, evidence-grade timestamping, and log correlation across distributed components.
- **TR-017 (P1)** — Provide backup, restore, and disaster recovery procedures with documented recovery objectives.
- **TR-018 (P2)** — Support secure API access using modern authentication and authorization standards.
- **TR-019 (P2)** — Enable controlled software release management including rollback procedures and maintenance windows.
- **TR-020 (P2)** — Provide formal runbooks for incident response, capacity management, and operational handover.
- **TR-021 (P2)** — Support evidence-based performance testing under representative and stress conditions.
- **TR-022 (P3)** — Provide operator controls for configuration freeze, emergency access, and controlled degradation modes.
- **TR-023 (P3)** — Implement strong identity and access management with role separation, least privilege, and privileged access monitoring.
- **TR-024 (P3)** — Provide encryption for data in transit and at rest with documented key-management controls and segregation of duties.
- **TR-025 (P1)** — Support security event monitoring and integration into the institution’s SIEM and case-management tooling.

Vendors invited to a follow-up stage may be asked to provide architecture walkthroughs, control demonstrations, reference calls, environment screenshots, operational reports, or written elaboration on the way specific functions are implemented. Where a vendor response indicates “Roadmap,” the buyer may require evidence of governance commitment, target release timing, dependency assumptions, and the consequences if the roadmap item does not materialize.

## 3. Regulatory & Compliance Requirements

### 3.1 Jurisdiction and Oversight Context
The buyer operates within a control perimeter shaped by ECB legal and policy framework, Eurosystem oversight, and coordination with EU institutions and national central banks. Responses must therefore address how the offering would fit within the buyer’s oversight, security, audit, and data-governance expectations. A response that simply states “we are compliant” without mapping the relevant controls, evidence sources, and operating assumptions will be treated as weak.

### 3.2 Regulatory and Control Discovery Questions
| ID | Topic | Information requested |
| --- | --- | --- |
| REG-001 | Applicable framework mapping | Bidders shall map the proposed solution and delivery model against T2/T2S policy alignment, DORA, GDPR, NIS2, AML/CFT framework where relevant, CPMI-IOSCO PFMI, EU data and outsourcing requirements and identify any jurisdiction-specific limitations or dependencies. |
| REG-002 | Outsourcing and critical service controls | Bidders shall identify whether the proposed services would be considered critical or important and provide a control model for oversight, audit, subcontracting, and exit. |
| REG-003 | Data governance | Bidders shall identify all categories of operational, participant, transaction, and personal data processed; applicable residency arrangements; and retention/deletion controls. |
| REG-004 | Audit and supervisory access | Bidders shall provide for buyer, internal audit, regulator, and designated third-party access to records, logs, testing evidence, and relevant control documentation. |
| REG-005 | Operational resilience | Bidders shall describe resilience design, incident handling, severe-but-plausible scenario testing, recovery arrangements, and post-incident evidencing. |
| REG-006 | Financial crime controls | Bidders shall state how sanctions, AML/CFT, suspicious activity workflows, and jurisdictional restriction controls are supported where applicable. |
| REG-007 | Legal record and evidentiary integrity | Bidders shall explain how transaction records, approvals, timestamps, and state transitions are preserved in a legally and operationally defensible manner. |
| REG-008 | Change control and model governance | Bidders shall describe governance for platform changes, configuration changes, emergency fixes, and any parameterized risk or policy models. |
| REG-009 | Public policy and monetary control alignment | Bidders shall explain how central-bank operator powers, policy constraints, and governance overrides are implemented without weakening evidence or control separation. |
| REG-010 | Systemic risk containment | Bidders shall identify design measures that reduce contagion risk, concentration risk, and failure propagation across connected infrastructures. |

### 3.3 Evidence Expectations
Vendors shall state what evidence they can make available during a later due-diligence phase, including certifications, independent audit reports, resilience test outputs, penetration testing summaries, architecture documentation, sample runbooks, and reference implementation material. Where evidence is confidential, a redacted or indexed description shall be provided. The buyer is particularly interested in how vendors support audit trails, data lineage, operator accountability, and recoverability in environments handling sensitive financial workflows.

## 4. Commercial Requirements

### 4.1 Indicative Commercial Information Requested
The commercial framework for this procurement is intended to support transparent comparison of whole-of-life cost, not merely initial implementation price. Bidders shall therefore provide an itemized commercial response covering software or subscription charges, implementation services, integration work, testing support, environment costs, managed service components, optional modules, training, hypercare, support tiers, change request rates, and any third-party pass-through costs. All pricing assumptions must state quantity drivers, volume thresholds, environment assumptions, and any conditions that would materially affect the cost base. Where pricing varies by deployment model, the bidder shall provide separate pricing structures and clearly identify the operational implications of each model.

The buyer expects bidders to propose a contractual baseline consistent with institutional procurement discipline. That baseline includes audit rights, subcontractor transparency, security obligations, service levels, incident notification, change management, exit support, intellectual property boundaries, data ownership, regulatory cooperation, and termination assistance. The buyer will not accept contractual structures that obscure accountability for critical services or that limit evidence access needed for risk and oversight review. Bidders shall identify all material commercial dependencies, including minimum term commitments, indexing mechanisms, transaction volume assumptions, or third-party license requirements.

Commercial responses will be evaluated alongside technical and control responses, not in isolation. A low initial price with weak resilience, hidden dependencies, or expensive mandatory add-ons will be scored poorly. Equally, a premium commercial proposal may only be justified if the bidder demonstrates meaningful reduction in implementation risk, operating cost, or control burden. The buyer reserves the right to seek best-and-final offers, clarify commercial positions, and normalize pricing for evaluation comparability.

| Commercial topic | Information requested |
| --- | --- |
| Licensing / subscription basis | State metric, pricing basis, minimum commitments, and renewal assumptions |
| Implementation services | State indicative effort ranges, pricing structure, and dependency assumptions |
| Hosting and infrastructure | State main cost drivers for cloud, on-premises, DR, and non-production environments |
| Support model | State available support tiers, hours, SLA range, and indicative pricing |
| Third-party dependencies | State partner or external component cost assumptions |
| Change requests / enhancements | State how non-standard requests are priced and governed |

### 4.2 Delivery and Support Model Questions
Vendors shall also provide information on likely implementation approach, indicative timeline ranges, client-side resource assumptions, deployment options, operating model choices, support tiers, and named dependencies on partners or infrastructure providers. If a managed service option exists, the vendor shall explain the control boundary between the vendor and the buyer and how oversight, audit access, and incident responsibilities are allocated.

## 5. Evaluation Criteria

### 5.1 Comparative Review Model
The buyer will conduct a structured comparative review using the dimensions below. Weightings support internal analysis only and do not create an award obligation.

| Review dimension | Weight | Use | Assessment basis |
| --- | --- | --- | --- |
| Capability fit and maturity | 30% | Comparative | Current capability depth, deployment maturity, and clarity of supported versus roadmap items. |
| Regulatory and control posture | 20% | Comparative | Strength of security, resilience, oversight, and audit arrangements. |
| Integration and operating model | 15% | Comparative | Feasibility of deployment, interoperability, and support arrangements. |
| Commercial transparency | 10% | Comparative | Clarity of pricing drivers, licensing approach, and support tiers. |
| Institutional relevance | 15% | Comparative | Experience with comparable infrastructures, jurisdictions, or asset classes. |
| Quality of response and evidence | 10% | Comparative | Precision, completeness, and substantiation of response content. |

### 5.2 Review Process
Responses will be reviewed by a cross-functional team representing procurement, business, operations, architecture, security, and compliance interests. The buyer may shortlist a subset of respondents for clarification calls, workshops, demonstrations, or targeted follow-up questions. The buyer may also decide not to proceed further, to segment the opportunity into smaller inquiries, or to issue separate RFPs for different control domains. Participation in this RFI does not guarantee inclusion in any subsequent procurement.

## 6. Submission Instructions

### 6.1 Submission Rules
Submission instructions are designed to ensure administrative completeness and evaluation consistency. Vendors shall submit one complete response pack in English, in searchable digital format, with cross-references matching the buyer’s requirement identifiers and appendix templates. The response shall include an executive summary, detailed response matrices, architecture materials, control evidence, implementation approach, commercial workbook, legal deviations register, and named points of contact for procurement, commercial, security, and solution matters. Claims made in narrative sections must be traceable to evidence. Unsupported statements may be treated as non-responsive.

Clarification questions shall be submitted only through the stated procurement contact point by the published deadline. The buyer may consolidate, anonymize, and distribute responses to all participants where appropriate. Late submissions may be rejected without review. The buyer may request oral presentations, scenario walkthroughs, control deep-dives, reference calls, sandbox demonstrations, or written clarifications. Participation in any such stage does not create an entitlement to award. Vendors shall maintain proposal validity for the period stated in the metadata block and shall promptly notify the buyer of any material change affecting their response.

The buyer may disqualify submissions that fail pass/fail gates, omit mandatory declarations, materially misrepresent capability, or rely on contradictory assumptions. All submitted material shall be treated in accordance with the confidentiality rules set out in this document, subject to legal and regulatory disclosure obligations. The buyer is under no obligation to award and may amend, suspend, or cancel the process at any time.

Vendors shall submit one consolidated response pack with clearly marked sections corresponding to this document. Responses should be concise but complete; massive unstructured marketing decks are not useful. The buyer prefers structured matrices, architecture diagrams, and evidence indices over generic brochures. Where the vendor wishes to include optional supporting collateral, it shall be clearly identified as supplementary and shall not replace the required response matrix.

### 6.2 Response Package Contents
- Cover letter and vendor contact details.
- Completed capability status matrix.
- Architecture and deployment overview.
- Security, compliance, and control summary.
- Indicative commercial response template.
- Assumptions, exclusions, and dependencies register.
- Reference client summaries relevant to the topic.

## 7. Appendices

### 7.1 Appendix Inventory
| Appendix | Purpose |
| --- | --- |
| Appendix A | Capability status response matrix |
| Appendix B | Assumptions and dependencies register |
| Appendix C | Indicative commercials template |
| Appendix D | Reference architecture and deployment template |
| Appendix E | Security and compliance evidence checklist |
| Appendix F | Reference client summary form |

### 7.2 Response Formatting Requirements
All responses shall be submitted in English, in searchable digital format. Tables shall remain editable where completion is required. Each response item shall identify whether the capability is current, configured, partner-enabled, roadmap, or not supported. If roadmap is selected, the vendor shall disclose expected release timing, confidence level, and any prerequisite dependencies. If partner is selected, the vendor shall name the partner and describe the contractual and operational relationship.

### 7.3 Confidentiality and Reliance
The buyer will treat responses as confidential subject to legal and regulatory obligations. Vendors remain responsible for ensuring that submitted materials do not misrepresent current capabilities. The buyer may rely on response content when deciding whom to invite to later stages, so precision matters. If the vendor later changes a material statement, it shall notify the buyer promptly.


## 8. Additional Information Request Appendices

### 8.1 Follow-up Workshop Topics
The buyer may invite selected respondents to participate in structured follow-up discussions. Likely topics include architecture walkthroughs, control-boundary explanation, evidence of production maturity, roadmap governance, data-handling patterns, resiliency design, operational support model, and the way the respondent would approach implementation in the buyer’s environment. Vendors should therefore ensure that any statement made in the written response can be substantiated by solution, delivery, security, and operations personnel.

The buyer is particularly interested in the respondent’s ability to explain non-happy-path behavior. Follow-up sessions may test how the offering behaves during participant disputes, exception processing, interface delays, policy changes, incident scenarios, or supervisory review. Vendors that provide clear, bounded, and operationally honest answers will be viewed more favorably than vendors that rely on generic platform claims.

### 8.2 Evidence Index Template
Respondents should provide an evidence index listing the artifacts that can be made available during a later diligence stage. Useful artifacts include architecture diagrams, certifications, control matrices, independent audit summaries, resilience testing outputs, penetration testing summaries, sample runbooks, user-access reports, sample operational dashboards, redacted client references, and release management materials. Each listed artifact should identify whether it is available immediately, available under NDA, or available only at shortlist stage.

The buyer is not asking respondents to disclose confidential client material in full at this stage. It is asking them to be honest about what evidence exists and how it would be made available. A strong evidence index will make it easier for the buyer to shape a later procurement that tests the right things instead of wasting everyone’s time.
