# Request for Information (RFI)

| Field | Value |
| --- | --- |
| Document type | Request for Information |
| Institution | Airwallex |
| Region | APAC |
| Country / market | Singapore |
| Information request theme | Cross-Border Tokenized Settlement |
| Reference | AIRWALLEX-RFI-202603 |
| Version | v1.0 |
| Issue month | March 2026 |
| Indicative currency | USD |
| Primary regulatory context | MAS, APRA expectations where relevant, global payments compliance |
| Relevant market initiatives | cross-border treasury automation |
| Classification | Confidential – market sounding only |

## 1. Procurement Context

Airwallex is conducting a structured market-sounding exercise in relation to **cross-border tokenized settlement**. This Request for Information is issued for information-gathering purposes only. It does **not** constitute a commitment to procure, a binding tender, or an obligation to issue a subsequent RFP. That said, the institution is not looking for airy thought leadership either. It wants grounded information that can support internal option analysis, control design, sequencing decisions, and eventual investment cases.

The institution is seeking to understand current market maturity, viable operating models, regulatory implications, integration patterns, and delivery risks relevant to the target use case in Singapore. Publicly visible market material reviewed during pre-RFI shaping suggests that the environment around Airwallex is being shaped by cross-border payments, treasury orchestration, stablecoin settlement adjacency, global API-led infrastructure. Directional research considered includes the following:



The institution has also reviewed public executive and governance signals, because successful programmes in this area live or die on sponsorship alignment, risk ownership, and operational accountability. In practical terms, senior sponsorship is expected across business, operations, risk, compliance, treasury/markets, and technology leadership. Publicly visible references reviewed include:



Finally, the institution has looked at public procurement, sourcing, and modernization signals relevant to the target use case:



This RFI is therefore intended to separate serious institutional suppliers from vendors who only know how to talk about pilots. Where capability is not yet live, respondents shall say so plainly. Where regulatory treatment depends on further legal analysis or market-infrastructure approval, say that plainly too.

## 2. Scope of Work / Scope of Information Requested

Respondents are invited to provide information on platform capability, implementation experience, control architecture, deployment options, operating model support, roadmap discipline, and indicative commercial structure. The institution is particularly interested in how vendors separate standard product capability from bespoke work, and how they manage the risk boundaries around custody, integrations, network connectivity, compliance tooling, and regulated operational responsibilities.

Areas of interest include:

- functional scope for cross-border tokenized settlement;
- enterprise integration and API design;
- security architecture, key management, and operational controls;
- regulatory reporting and audit evidence support;
- local market deployment options and data handling;
- delivery methodology, support model, and reference experience;
- scaling path from controlled pilot or first deployment to broader institutional reuse.

### 2.1 Information request table

| Req ID | Information requested | Response Type |
| --- | --- | --- |
| IR-01 | End-to-end lifecycle support for cross-border tokenized settlement, including initiation, approval, issuance/origination, servicing, reporting, exception handling, and closure. | Narrative |
| IR-02 | Workflow orchestration with maker-checker controls, delegated authority, segregation of duties, and evidential approval logs. | Narrative + evidence |
| IR-03 | Documented APIs, events, batch interfaces, and message standards for integration with core systems, settlement rails, sanctions screening, data lakes, and reporting stacks. | Attachment |
| IR-04 | Alignment with MAS regulatory framework, Payment Services Act, MAS Technology Risk Management Guidelines, MAS outsourcing and cyber hygiene requirements including audit evidence and control mapping. | Narrative + control mapping |
| IR-05 | Identity, wallet, account and participant onboarding controls, including KYC/KYB, policy enforcement, and jurisdictional eligibility checks. | Narrative |
| IR-06 | Key management, HSM/KMS integration, signing policy, break-glass procedures, wallet administration, and privileged access controls. | Narrative + metrics |
| IR-07 | Reconciliation across digital asset events, cash movement, general ledger, sub-ledgers, nostro/vostro or depository positions, and external network confirmations. | Evidence |
| IR-08 | Operational dashboards, alerting, case management, and evidence export for first-line operations, second-line risk, audit, and regulator inspection. | Narrative |
| IR-09 | Deployment flexibility across cloud, private cloud, and controlled on-premises patterns with environment separation and data residency controls. | Pricing narrative |
| IR-10 | Reference delivery experience with regulated financial institutions, capital markets infrastructures, or large-scale fintechs in APAC or comparable jurisdictions. | Narrative |
| IR-11 | Support for programmable controls specific to the target use case, including entitlement rules, transfer restrictions, pricing or margin triggers, and settlement conditions. | Narrative + evidence |
| IR-12 | Support for testing strategy across SIT, UAT, performance, failover, cyber tabletop, data migration rehearsal, and production cutover. | Attachment |
| IR-13 | Integration approach for institution-specific infrastructure, including ERP/GL, treasury, CRM, case management, observability stack, and domestic payment or market infrastructure in Singapore. | Attachment |
| IR-14 | Data model extensibility for legal entity, branch, product, counterparty, collateral, and jurisdiction attributes without custom code for every new rollout. | Narrative |
| IR-15 | Records retention, evidentiary integrity, and exportability for disputes, audit, regulatory review, and exit transition. | Narrative + evidence |
| IR-16 | Third-party risk transparency covering custodians, node operators, cloud services, analytics vendors, oracle providers, and managed security services. | Narrative |
| IR-17 | Business continuity objectives, RTO/RPO commitments, region failover design, backup restore testing, and crisis governance. | Attachment |
| IR-18 | Commercial scaling logic for additional entities, jurisdictions, products, and transaction volumes without a full re-platform. | Pricing schedule |
| IR-19 | Model for release management, regression testing, policy change approvals, and smart-contract or workflow change governance. | Narrative + evidence |
| IR-20 | Approach for a future-state roadmap aligned to Airwallex strategic direction, while clearly distinguishing live capability from roadmap-only functionality. | Narrative |

Respondents should assume integration into the institution's existing enterprise landscape, including finance ledgers, payment and settlement systems, data warehouses or lakes, risk and compliance tooling, identity and access management, and service management / observability platforms. For Airwallex, the integration pattern must also reflect current modernization priorities around cross-border tokenized settlement and the public-market direction signalled through cross-border treasury automation.

## 3. Regulatory and Compliance Context

Respondents shall explain how their solution and delivery model align with the relevant legal and supervisory environment for Singapore, including **MAS, APRA expectations where relevant, global payments compliance**. The institution is interested not only in headline compliance statements but in the practical machinery behind them: approval controls, audit trails, data governance, resilience practices, third-party oversight, evidence production, and governance over configuration or smart-contract change.

The response should address whether existing deployments have been reviewed by internal audit, external auditors, regulators, or equivalent control functions. Respondents should identify any areas where local legal advice, market infrastructure approvals, tax analysis, or further product structuring would be required before a production launch could proceed. The institution would rather hear an honest limitation now than discover it after six months of design work.

For this RFI, respondents should also explain how they support policy-driven onboarding and transfer restrictions, sanctions and AML workflows, privacy and data residency obligations, operational resilience, incident management, exit planning, and segregation of responsibilities between product vendor, cloud provider, institution, and any managed-service partners.

## 4. Commercial Information Requested

This RFI does not request binding pricing. However, respondents shall provide an indicative view of commercial structure sufficient to inform internal option analysis. The institution would like to understand pricing basis, implementation effort drivers, support model expectations, third-party cost exposure, and likely cost drivers associated with expansion to more products, entities, or jurisdictions.

Indicative commercial information should cover:

- licence or subscription logic;
- implementation fee basis and staffing assumptions;
- support tiers and service windows;
- third-party or pass-through costs;
- commercial implications of scaling to more products, entities, or jurisdictions;
- cost impacts of deployment model choice, resilience requirements, HSMs/KMS, and reporting obligations;
- exit and transition assumptions.

## 5. Evaluation Criteria for RFI Review

The institution will review responses qualitatively rather than through a formal award methodology. Nevertheless, responses will be compared using common criteria:

| Review dimension | Indicative weight | Review focus |
|---|---|---|
| Strategic relevance to target use case | 20% | Degree to which the response addresses cross-border tokenized settlement specifically in the context of Airwallex and Singapore. |
| Control maturity | 18% | Practical strength of compliance, security, audit, governance, and change-control arrangements. |
| Technical maturity | 18% | Integration quality, deployment realism, observability, resilience, and supportability. |
| Operating model credibility | 16% | Clarity on roles, responsibilities, target operating model, and run-state ownership. |
| Delivery evidence and references | 16% | Comparable deployments, institutional readiness, and realism of implementation posture. |
| Commercial and dependency clarity | 12% | Plausibility of indicative pricing and transparency of third-party dependencies. |

Reviewers will place particular weight on candour, evidence, and control clarity. A response that says “not currently supported” with a sensible mitigation path may be more valuable than a response that gestures vaguely at future capability.

## 6. Submission Instructions

Responses should be submitted electronically in searchable PDF or editable document format and should follow the numbering used in this RFI. The institution may invite selected respondents to participate in follow-up workshops, architecture reviews, operating model sessions, or clarification meetings. Participation in this RFI does not create any entitlement to future procurement participation.

Respondents shall identify a primary contact and provide separate contacts for product, security/compliance, commercial, and implementation matters. If any part of the response is confidential, the respondent should mark it accordingly; however, the institution may still circulate materials internally for evaluation, governance, and planning purposes.

The institution encourages respondents to include architecture diagrams, control mappings, sample implementation deliverables, dependency maps, and honest explanations of where external providers or legal assumptions are required. Concision is welcome. Vagueness is not.

## 7. Appendices

### Appendix A – Requested supporting materials

Respondents are encouraged to provide the following where available:

- architecture diagrams;
- sample control mappings;
- anonymised implementation plans or runbooks;
- audit or certification summaries;
- client case studies;
- sample reporting outputs;
- dependency and responsibility matrices;
- example RACI for production operations.

### Appendix B – Response guidance

The institution prefers concise, direct, and evidence-backed responses. Unsupported claims, especially around regulatory approval or production readiness, should be avoided. Where a feature is roadmap-only, state the expected timing and dependency assumptions. Do not try to bluff the boring details. The boring details are the whole game.

## 8. Additional Appendices

### Appendix C – Possible next steps

Following review of RFI responses, the institution may choose to take no further action, conduct additional market engagement, issue a targeted RFP, run a proof-of-concept or design workshop, or ask selected respondents for deeper architecture and control material. No commitment is implied by the issuance of this document.

### Appendix D – Buyer reservations and disclaimer

The institution reserves the right to amend or withdraw this RFI, decline to respond to individual submissions, and use the information received solely for internal analysis and planning. All response costs remain the sole responsibility of respondents.

### Appendix E – Market context note

The institution expects respondents to show awareness of market developments such as **cross-border treasury automation**, but it does not require respondents to have participated directly in those programmes. What matters is whether the respondent can connect market learning to a credible control and operating model for cross-border tokenized settlement in Singapore.

### Appendix F – Public market intelligence summary used in market sounding

The following public information themes were considered in preparing this RFI and may be relevant to respondent answers:





These references are directional, not exhaustive. They are included to make clear that the institution expects responses anchored in actual market conditions rather than a generic global platform pitch.


### Appendix G – Expanded operating model considerations

Airwallex expects respondents to describe, in detail, how their platform would handle cross-border tokenized settlement under real production conditions in Singapore. This includes governance intake, change approval, environment promotion, release testing, participant support, exception handling, financial reconciliation, and regulator-facing evidence production. Respondents should explain who performs each task, which evidence is generated automatically, what remains manual, and what control breaks have been observed in similar deployments.

For cross-border tokenized settlement, the institution is specifically interested in how vendors sequence rollout from initial controlled scope toward broader reuse. That means explaining configuration strategy, product-variant management, legal-entity setup, counterparty segmentation, permissions design, wallet or account governance, key rotation, and decommissioning procedures. It also means being honest about where a second implementation becomes easier because the platform is genuinely reusable, versus where every new product still needs fresh bespoke engineering.

Operational resilience is not a side note. Responses should therefore describe alert thresholds, runbook ownership, failover invocation, incident severity classification, reconciliation restart procedures, and communication flows into risk, legal, compliance, operations, and executive stakeholders. If the platform uses multiple networks, managed services, or external providers, respondents should explain how outage diagnosis works in practice and how the institution would retain enough visibility to satisfy internal and supervisory scrutiny.

Integration realism will be assessed hard. The institution expects APIs, batch interfaces, message queues, and event streams to be versioned, documented, observable, and testable. Respondents should explain how they manage retries, idempotency, partial failure, duplicate events, reconciliation mismatch, and data lineage. They should also describe how implementation teams avoid contaminating production controls with lab shortcuts during rapid pilot cycles, because that is how institutional programmes usually accumulate dangerous debt.

Finally, commercial transparency and exit readiness are part of procurement quality. Vendors should describe what data can be exported, how configuration can be documented, what intellectual property restrictions apply, how long transition support would be available, and what happens if the institution changes deployment model, cloud provider, custody partner, or regulatory interpretation. A platform that is easy to buy but painful to exit is not a mature institutional platform.

### Appendix G – Expanded operating model information requested

The institution requests more detailed information on how respondents design and support the business-as-usual operating model for cross-border tokenized settlement. Responses should describe first-line operations, exception management, user and participant support, control monitoring, reconciliation sign-off, reporting production, and escalation into compliance, risk, legal, or technology teams. Airwallex wants to understand whether respondents have a repeatable institutional model or whether every deployment still depends on a handful of specialist engineers hovering in the background.

Respondents should also describe how roles are separated across platform administration, business operations, compliance review, information security, and change management. For example, who approves configuration changes, who monitors failed transactions or stale instructions, who validates data-quality exceptions, who communicates with external market infrastructures or payment providers, and who is accountable for restoring service during incidents? These are not edge questions. They are the centre of whether the platform can be trusted in production.

The institution is also interested in how vendors train client teams, validate runbooks, and support post-go-live transition. Please provide examples of role-based training, tabletop exercises, operational readiness criteria, and support models used for comparable regulated clients.

### Appendix H – Expanded integration and architecture information requested

Respondents are asked to explain their target integration architecture in greater detail. This should include connectivity to onboarding and identity systems, payment or settlement rails, finance ledgers, reporting stacks, case management, observability tooling, and enterprise data platforms. The institution would like to understand which interfaces are API-driven, which rely on event streaming or batch exchange, how retries and idempotency are handled, how secrets and certificates are managed, and how interface changes are governed over time.

Please explain how your platform handles partial failure, duplicate events, network interruption, stale market or pricing data, and reconciliation mismatch across internal and external records. If external node operators, custodians, payment providers, or data vendors are involved, describe the dependency boundary and how a client institution retains sufficient visibility and control. Responses should be specific to Singapore deployment realities and to the control needs implied by MAS, APRA expectations where relevant, global payments compliance.

Respondents should also provide information on environment separation, promotion controls, data masking, non-production data handling, and release rollback. Institutions evaluating this market do not want to inherit fragile lab patterns disguised as architecture.

### Appendix I – Expanded security, resilience, and compliance information requested

Please provide more detail on security operations, privileged access management, key management, HSM/KMS support, logging integrity, backup protection, vulnerability management, and incident response. The institution is particularly interested in who performs these tasks operationally, what evidence is generated, and how responsibility is divided between vendor, cloud provider, institution, and any managed-service partners.

In addition, explain how your solution supports alignment with MAS, APRA expectations where relevant, global payments compliance in practice. This includes audit evidence, retention controls, privacy and data residency, sanctions and AML workflow integration, change management, resilience testing, and third-party oversight. If certain compliance obligations depend on configuration choices, deployment model, or additional modules, say so explicitly.

The institution would also value examples of how similar deployments have been reviewed by audit, regulators, or equivalent control functions, even if anonymised. Honest discussion of control limitations or design trade-offs is preferable to generic assurances.

### Appendix J – Expanded commercial and scaling information requested

Please provide more detail on how pricing scales as scope expands from an initial controlled deployment to broader production use. The institution would like to understand the commercial impact of additional legal entities, jurisdictions, products, transaction volumes, users, environments, reporting requirements, and resilience objectives. It is also useful to understand what costs are truly platform fees versus implementation effort versus pass-through third-party cost.

Respondents should describe the likely commercial impact of deployment-model choice, support window expansion, premium SLA requirements, HSM or key-management options, additional compliance integrations, and data-retention requirements. If certain commercial assumptions commonly cause confusion or later change orders, highlight them now.

Finally, please explain what exit and transition support normally looks like, what data can be exported in a usable format, and what contractual or technical dependencies might make migration harder than expected. Buyers value suppliers who are candid about lock-in dynamics.

### Appendix K – Jurisdiction and market context information requested

The institution expects respondents to show awareness of how Singapore market structure affects implementation choices for cross-border tokenized settlement. Please explain how local regulatory treatment, domestic infrastructure, data-location expectations, outsourcing scrutiny, and the practical role of internal control functions influence your recommended architecture and delivery model.

The response should also connect, where relevant, to market initiatives such as cross-border treasury automation. The point is not whether your firm participated directly in every initiative. The point is whether you understand what those initiatives have changed in buyer expectations around interoperability, programmability, governance, and operational transition.

Please also identify key compliance or execution friction points early, such as licensing boundaries, legal characterization questions, distribution or suitability constraints, tax considerations, reporting obligations, or approval dependencies on third parties. That information helps the institution distinguish platform capability from implementation optimism.


### Appendix L – Detailed scenario information requested

Please explain how your platform and delivery model would handle several scenario families relevant to cross-border tokenized settlement. The institution is interested in ordinary-day processing, peak-volume periods, control events such as sanctions hits or failed settlement, and post-incident recovery. For each scenario, describe system behaviour, human workflow, approval points, evidence generation, and the practical role of operations, risk, compliance, and technology teams. Generic references to “alerts” or “dashboards” are not enough; the institution wants to understand who does what when a real issue lands.

Respondents should also describe future-state scenarios such as expansion to additional entities, products, or jurisdictions, and whether the platform accommodates that via governed configuration or requires fresh bespoke engineering. This is particularly relevant where market evolution linked to cross-border treasury automation may alter buyer expectations over time.

The institution would also value candid comments on scenarios that remain difficult, high risk, or dependent on external legal or infrastructure changes. Honest constraint mapping is useful procurement input.

### Appendix M – Detailed documentation, testing, and transition information requested

Please provide more detail on how implementation documentation is produced, versioned, approved, and maintained. The institution is interested in architecture decision records, interface specifications, control narratives, support runbooks, release notes, training packs, and known-issue logs. A mature vendor should be able to explain how those artefacts remain usable after the initial project team rotates out.

In addition, describe your usual approach to testing, migration or data seeding, cutover rehearsal, go/no-go governance, hypercare, and transition into BAU support. For regulated buyers in Singapore, this matters as much as the software itself. The institution wants to understand what evidence is normally generated, who signs it off, and what conditions must be met before a deployment is considered stable.

Finally, please explain how maintainability is supported over time: upgrade governance, handling of deprecated features, regression-test discipline, and methods for ensuring that institution-specific configuration remains understandable and supportable under MAS, APRA expectations where relevant, global payments compliance. Buyers are looking for platforms they can live with, not just platforms they can launch.


### Appendix N – Extended control checklist and explanatory notes

The following extended notes are included to make bidder expectations unambiguous. Airwallex expects responses on cross-border tokenized settlement to show how the proposed solution behaves as an institutional control system in Singapore, not merely as a transaction engine. Vendors should therefore explain how policy decisions are represented in configuration, who can alter those policies, how changes are reviewed, how exceptions are surfaced, and what evidence remains available months after the original event. The institution wants to be able to explain its operating model to business owners, auditors, regulators, and incident commanders without resorting to vendor folklore.

First, respondents should explain how product and policy setup is governed. That includes creation of new product variants, change to participant eligibility or transfer rules, updates to settlement windows, modifications to approval thresholds, and emergency suspension or restriction of activity. The institution expects a clean distinction between ordinary configuration, privileged configuration, code change, and emergency override. It also expects every category to have a separate approval path, evidence trail, and post-change review mechanism. If the platform treats all changes as technically equivalent, that is a design weakness and should be declared openly.

Second, respondents should explain how day-to-day control monitoring works. This includes queue monitoring, stale-item detection, sanctions-screening failures, unresolved reconciliation breaks, delayed downstream posting, key-management exceptions, and threshold breaches for transaction values or concentration limits. The institution would like to understand which items appear on dashboards, which create tickets automatically, which require human review, and which can trigger automated restriction or pause logic. A common problem in immature programmes is that all alerts are technically visible but operationally useless because no one knows who owns them. The response should show how that trap is avoided.

Third, vendors should describe the accounting and records implications of the proposed platform. For cross-border tokenized settlement, the institution expects clarity on sub-ledger logic, linkage to finance books and records, treatment of failed or reversed events, timestamp discipline, and the relationship between operational state and financial state. Where accounting policy choices exist, respondents should indicate where platform support ends and client policy decisions begin. The institution is not asking vendors to be accountants; it is asking them not to create accounting ambiguity by design.

Fourth, the response should cover the compliance-operating model in much greater depth than most vendor submissions usually provide. That means onboarding and due-diligence controls, sanctions and AML workflow routing, evidence retention, alert adjudication, case linkages, and reporting support. It also means explaining how compliance teams can challenge or suspend activity without waiting for engineering intervention. In regulated environments, the inability to operationalise a compliance decision quickly is not a minor inconvenience. It is often the moment the entire programme loses credibility.

Fifth, respondents should discuss resilience from the perspective of controlled degradation rather than perfect uptime fantasy. The institution is interested in what happens when a dependency slows down, returns inconsistent data, or becomes unavailable during a critical window. Can transactions be queued safely? Can approval activity continue while settlement is paused? Can the institution distinguish between internal failure, external failure, and data-latency noise? Can it communicate status to internal stakeholders using evidence rather than guesswork? Vendors that have actually supported regulated production environments usually have thoughtful answers here. Everyone else tends to mumble about redundancy and move on.

Sixth, vendors should address data quality governance. Many programmes fail because reference data, participant data, or mapping logic decays over time. The institution therefore expects responses on validation rules, mandatory fields, reconciliation of golden sources, break handling, data correction approvals, and the retention of pre- and post-correction history. Where a user can repair a broken record, the platform should preserve enough context for audit and downstream investigation. Silent mutation is not acceptable.

Seventh, the institution expects meaningful detail on operational reporting. Useful reporting is not limited to counts and charts. It includes age analysis for pending items, break categorisation, SLA adherence, approval backlog, privileged-action logs, late interface runs, concentration indicators, and trend analysis showing whether the operating model is improving or fraying. The response should indicate whether such reporting is standard product output, configurable reporting, or dependent on external BI tooling. Honest boundary definition will be treated as a strength.

Eighth, respondents should describe how their teams behave under pressure. Who joins an incident bridge? Who can make temporary configuration changes? How are emergency decisions documented? When is legal or compliance consulted? How is the line drawn between urgent restoration and controlled change? Institutions do not procure platforms only for the quiet days. They procure them for the ugly days too. A bidder that can explain ugly-day mechanics in a calm, structured way is much more credible than one that only talks about innovation and scale.

Ninth, bidders should explain how future roadmap items are governed. Airwallex does not object to roadmaps; every serious platform has one. What matters is whether roadmap items are separated cleanly from committed deliverables, how client influence is handled, how security and regulatory implications are reviewed before release, and how backwards compatibility is managed. The institution does not want a strategic dependency on promises that are still floating around a product meeting somewhere.

Tenth, respondents should discuss exit readiness and long-horizon maintainability one more time, because this is where weak procurement usually creates expensive regret. The institution expects exportable data, understandable configuration, documented interfaces, transferable runbooks, and enough transparency that another support team or provider could take over if required. A platform that can only be safely operated by its original vendor is not mature enough for a regulated buyer.

Finally, all answers should be read in the context of MAS, APRA expectations where relevant, global payments compliance and the market direction signalled by cross-border treasury automation. The institution is interested in pragmatism: solutions that support real governance, real operations, and real accountability. There is no prize here for sounding the most futuristic. The prize is for showing that the bidder understands what institutional adoption actually demands and can support it without drama.


### Appendix O – Closing institutional considerations

Airwallex expects bidders and respondents to treat cross-border tokenized settlement as an institutional transformation problem rather than a feature sale. The remaining evaluation emphasis will therefore fall on how convincingly the response explains governance ownership, control evidence, operational sustainability, and cross-functional decision-making in Singapore. Strong responses will connect platform capabilities to the practical realities of risk review, legal review, production support, change governance, user training, incident response, and long-term maintainability. Weak responses will keep speaking in abstractions and leave the hard questions to somebody else.

In practical terms, the institution wants to understand whether the proposed approach can survive the moment when the first launch wave is complete and the organization must run the service repeatedly, under scrutiny, with real users and real exceptions. That means explaining how controls hold under stress, how documentation stays current, how staff turnover is handled, how audit questions are answered, and how new use cases are introduced without re-opening foundational design debates. A platform that appears efficient only when the original implementation team is present is not sufficient.

The institution is also conscious that market direction will continue evolving. As regulations, domestic market infrastructure, and initiatives shift, the chosen operating model must adapt without creating policy confusion or technical fragmentation. Respondents should therefore make clear how the solution absorbs regulatory change, how configuration can be reviewed and approved, how backward compatibility is managed, and how future expansion decisions are evidenced. That is the standard expected for a regulated buyer considering cross-border tokenized settlement seriously.


### Appendix P – Additional buyer questions for follow-up workshops

If this market-sounding exercise progresses, Airwallex expects follow-up workshops to probe three things in much greater depth. First, how the proposed platform would be governed once the novelty wears off and cross-border tokenized settlement becomes part of ordinary operating rhythm in Singapore. Second, how the solution behaves when dependencies fail, policies change, or control functions impose restrictions on short notice. Third, how the respondent helps a regulated institution preserve evidence, maintain documentation, and expand scope without turning every new requirement into a bespoke engineering exercise.

Respondents are encouraged to anticipate those workshop questions in their written answer. Specifically, the institution would like clarity on what the first ninety days of production support normally look like, what issues tend to surface after launch, what artefacts internal audit usually requests, and what design decisions most often create regret later if left vague during procurement. This is useful because buyers in this market are trying to distinguish between suppliers who have lived through institutional deployment and suppliers who have only rehearsed it.

The institution would also welcome direct commentary on what should remain out of scope in an initial phase. Credible sequencing is a strength. Responses that try to include every conceivable ambition at once tend to hide risk rather than reduce it. For a future procurement to succeed, the buyer needs suppliers who can help separate what is important from what is merely shiny.
