# Request for Information (RFI)

| Field | Value |
| --- | --- |
| Reference | STANDARD-BANK-RFI-TOKENIZED-SECURITIES-202603 |
| Version | v1.0 |
| Issue date | March 2026 |
| Issuing organization | Standard Bank (South Africa) |
| Document type | RFI |
| Subject | Tokenized Securities Issuance And Settlement Platform |
| Programme | Middle East & Africa RFP Bank |
| Language | English |
| Response currency | USD unless otherwise stated |
| Confidentiality | Restricted |
| Status | Issued |

## 1. Procurement Context

### 1.1 Purpose

Standard Bank is treating tokenized securities issuance and settlement platform as a business-
critical capability that must be implemented with the same discipline applied to core regulated
systems. The solution under consideration will be expected to operate inside a control environment
shaped by business ownership, architecture standards, security review, legal interpretation,
compliance sign-off, and internal audit expectations. This is not a speculative innovation exercise.
It is a procurement intended to test whether the market can supply a dependable platform and
implementation model for the target operating state.

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

### 1.2 Discovery Objectives

This RFI is intended to establish market maturity for tokenized securities issuance and settlement
platform, compare delivery models, and understand which suppliers can support a credible route to
production in the relevant regulatory environment.

The buyer will use responses to decide whether to proceed to a formal RFP, a targeted proof of
concept, a build-versus-buy analysis, or continued market monitoring. It therefore values honesty
about current limitations as much as breadth of vision.

Respondents should assume that business, architecture, operations, risk, security, compliance, and
procurement stakeholders will all review the submission. Answers should therefore be concise but
evidence-based.

### 1.3 Response Rules

| Status label | Meaning |
| --- | --- |
| Current capability | Available in production today and supportable for live clients |
| Configured capability | Available by product configuration without bespoke development |
| Partner-enabled capability | Depends on named third party or managed dependency |
| Roadmap | Planned but not currently supportable in production |
| Not supported | Outside current capability |

Use the response legend consistently. Where availability differs by country, legal entity, hosting
model, or volume tier, state that explicitly.

Indicative commercials and timelines should be realistic but are not binding. The buyer wants
directional planning input, not polished sales positioning.

## 2. Scope of Work

### 2.1 Functional Discovery

Respondents should describe how their platform supports the end-to-end functional lifecycle for
tokenized securities issuance and settlement platform, including onboarding, policy setup, role
assignment, transaction or issuance initiation, approval routing, settlement or servicing,
reporting, monitoring, exception handling, and closure or maturity events where relevant.

The buyer is particularly interested in the operational model. If some steps depend on manual
operator actions, external reconciliations, partner platforms, offline legal processes, or periodic
controls, that should be stated directly.

### 2.2 Technical Info Requests

| Question ID | Information requested | Expected answer format |
| --- | --- | --- |
| DQ-01 | Architecture must support segregated dev, test, UAT, DR, and production environments. | Status label + explanation + evidence reference |
| DQ-02 | Provide API-first interfaces, eventing, and version governance suitable for enterprise integration. | Status label + explanation + evidence reference |
| DQ-03 | Support RBAC, segregation of duties, maker-checker controls, and complete audit logs. | Status label + explanation + evidence reference |
| DQ-04 | Support configurable lifecycle states, policy controls, limits, exceptions, and reconciliations. | Status label + explanation + evidence reference |
| DQ-05 | Disclose all third-party dependencies and operational responsibilities. | Status label + explanation + evidence reference |
| DQ-06 | Evidence resilience, recovery, backup, monitoring, and incident-management capability. | Status label + explanation + evidence reference |
| DQ-07 | Provide delivery method, client effort assumptions, and phased implementation plan. | Status label + explanation + evidence reference |
| DQ-08 | Support evidence extraction for audit, supervisory review, and board reporting. | Status label + explanation + evidence reference |
| DQ-09 | Support issuance, registry, transfer controls, and settlement data for regulated securities. | Status label + explanation + evidence reference |
| DQ-10 | Support market infrastructure interfaces and surveillance-grade audit exports. | Status label + explanation + evidence reference |

Responses should also address API style, identity and access controls, eventing, environment model,
tenancy, reporting, observability, reconciliation approach, and dependency management. If the
platform supports multiple deployment patterns, state which one is most appropriate for Standard
Bank and why.

Where architecture choices influence compliance posture, latency, throughput, or service continuity,
respondents should describe those trade-offs rather than presenting all deployment options as
equivalent.

### 2.3 Priority Themes

The review will focus on three themes: control integrity, implementation credibility, and extension
potential. The buyer wants to know whether the same foundation can support adjacent use cases later
without requiring a rewrite or a fresh governance model.

Respondents should frame their answers to show how the platform behaves under real operating
conditions, including exceptions, dependency outages, late approvals, jurisdictional restrictions,
and evidence requests.

## 3. Regulatory & Compliance

### 3.1 Jurisdiction

Address the practical regulatory context for South Africa, including FSCA conduct expectations, SARB
oversight, Financial Markets Act requirements, POPIA and cyber controls, FIC Act AML/CFT,
operational resilience expectations. If the target use case would require specific licences, partner
structures, or buyer legal interpretation, say so. The buyer values clear perimeter statements over
broad claims of universal compliance.

Where Sharia governance, securities law, payment law, custody rules, or market-infrastructure
obligations are relevant, explain how your platform supports the required control evidence and
operating responsibilities.

### 3.2 Discovery Questions

| Question ID | Requested information |
| --- | --- |
| RQ-01 | Which jurisdictions and client types do you support today for comparable use cases? |
| RQ-02 | How does your platform support AML/CFT, sanctions, monitoring, and case management integration? |
| RQ-03 | How do you handle data protection, retention, residency, deletion, and access logging? |
| RQ-04 | How do you manage resilience, DR, incidents, and third-party risk? |
| RQ-05 | What regulatory or policy assumptions are necessary for this use case? |
| RQ-06 | What evidence can you provide for audit, assurance, and supervisory review? |

The buyer does not expect the RFI to resolve every policy question. It does expect respondents to
identify where those questions arise and what assumptions underpin the proposed operating model.

### 3.3 Evidence

Respondents should supply or reference documentation proportionate to the maturity they claim:
architecture diagrams, control matrices, sample reports, assurance statements, runbooks,
screenshots, logs, or anonymised client examples. The buyer will use evidence quality to separate
mature offerings from conceptual ones.

Where evidence cannot be shared at this stage, respondents should explain the restriction and state
whether the material could be provided later under NDA.

## 4. Commercial Requirements

### 4.1 Indicative Info

Provide indicative commercial information for implementation, subscription or platform pricing,
usage drivers, support tiers, and major third-party costs. The buyer wants to understand cost shape,
scaling drivers, and the likely split between one-time and recurring expenditure.

State the assumptions behind indicative pricing, including environments, user counts, volume
estimates, partner dependencies, and support windows. Hidden assumptions reduce the value of the
response.

### 4.2 Delivery Model

Describe a realistic delivery model for a programme comparable to tokenized securities issuance and
settlement platform, covering discovery, design, configuration, integration, testing, training,
cutover, and day-two support. Identify client-side roles normally required and where specialist
partner support is typical.

If timeline depends on data migration, regulator engagement, partner onboarding, or non-trivial
operating-model change, say so. The buyer is explicitly testing implementation realism.

## 5. Evaluation Criteria

### 5.1 Review Model

RFI responses will be reviewed for clarity, completeness, relevance to tokenized securities issuance
and settlement platform, evidence quality, dependency transparency, and credibility of the implied
delivery model. Because this is not yet a formal sourcing event, directness is more useful than
polished brochure language.

The outcome may be no further action, a request for follow-up questions, invitation to a workshop or
demonstration, or launch of a formal RFP.

### 5.2 Process

| Review dimension | Indicative weighting |
| --- | --- |
| Capability relevance | 30% |
| Technical and integration maturity | 25% |
| Regulatory and control credibility | 20% |
| Delivery realism | 15% |
| Indicative commercial fit | 10% |

The buyer may invite a subset of respondents to clarify assumptions or demonstrate selected
workflows. Participation in this RFI does not guarantee participation in any future procurement, but
high-quality responses will inform that decision.

## 6. Submission Instructions

Submit one searchable PDF response and one editable response matrix. Label confidential sections
clearly. Identify primary commercial and technical contacts for follow-up.

Use the numbering in this RFI so the buyer can compare responses efficiently. Submit questions in
writing during the clarification period. Late or incomplete submissions may be set aside.

## 7. Appendices

| Appendix | Purpose |
| --- | --- |
| Appendix A | Response matrix |
| Appendix B | Indicative pricing schedule |
| Appendix C | Delivery and dependency questionnaire |
| Appendix D | Security and compliance evidence checklist |

Respondents may attach supplementary appendices if they materially improve understanding of
architecture, controls, or delivery approach. Generic marketing collateral should be minimised.

## 8. Additional Appendices

### 8.1 Deployment assumptions

State cloud, tenancy, environment, latency, throughput, and region assumptions shaping your answer.

Use this appendix to make the operating reality of tokenized securities issuance and settlement
platform clear to Standard Bank. The buyer is particularly interested in evidence quality,
dependency transparency, and the line between product capability and client responsibility.

### 8.2 Role and access model

Describe user roles, admin roles, separation-of-duty controls, approval patterns, and break-glass
handling.

Use this appendix to make the operating reality of tokenized securities issuance and settlement
platform clear to Standard Bank. The buyer is particularly interested in evidence quality,
dependency transparency, and the line between product capability and client responsibility.

### 8.3 Partner dependency notes

List any exchange, bank, custody, sanctions, data, wallet, or messaging partners that are required.

Use this appendix to make the operating reality of tokenized securities issuance and settlement
platform clear to Standard Bank. The buyer is particularly interested in evidence quality,
dependency transparency, and the line between product capability and client responsibility.

### 8.4 Evidence inventory

Index artifacts, screenshots, reports, logs, or reference deployments supplied with the response.

Use this appendix to make the operating reality of tokenized securities issuance and settlement
platform clear to Standard Bank. The buyer is particularly interested in evidence quality,
dependency transparency, and the line between product capability and client responsibility.

### 8.5 Roadmap and limitations

State clearly what is not supported, what is partner-enabled, and what remains roadmap only.

Use this appendix to make the operating reality of tokenized securities issuance and settlement
platform clear to Standard Bank. The buyer is particularly interested in evidence quality,
dependency transparency, and the line between product capability and client responsibility.


### 8.5 Market maturity interpretation

Respondents should interpret market maturity carefully. For Standard Bank, the question is not
simply whether Tokenized Securities Issuance And Settlement Platform can be demonstrated, but
whether it can be governed, integrated, supported, and evidenced in a way that survives
institutional scrutiny. The buyer therefore values clear descriptions of production boundaries,
operational burdens, and partner dependencies. A crisp description of what is not yet mature is more
useful than an aspirational claim.

The buyer is also interested in how respondents distinguish between platform capability and project-
specific services. If comparable deployments required extensive custom engineering, hand-crafted
integrations, or ongoing vendor-run operations, the response should explain that. The RFI is
intended to reveal the repeatable product core, not to hide it inside bespoke effort.

### 8.6 Integration and controls interpretation

In reviewing responses, Standard Bank will focus on how data and control travel together.
Respondents should therefore explain how transactions, approvals, identity attributes, risk checks,
and reporting evidence remain linked over time. Where control decisions rely on external systems,
respondents should identify those systems and describe how state synchronisation and exception
management work.

The buyer is particularly interested in coexistence with existing enterprise architecture. Answers
should address whether the platform is intended to be system of record, control layer, orchestration
layer, or specialist subsystem for Tokenized Securities Issuance And Settlement Platform, and what
that means for reconciliation and support.

### 8.7 Implementation realism interpretation

Implementation timelines should reflect actual delivery conditions in South Africa. If readiness
depends on partner onboarding, legal structuring, policy approval, cloud approval, penetration
testing, non-functional testing, or regulator dialogue, respondents should acknowledge that openly.
The buyer uses this RFI to test whether vendors understand institutional delivery reality, not just
product demos.

Useful responses will distinguish between best-case pilot timing and realistic production timing.
They will also identify the skills expected from the buyer, such as product ownership, compliance
input, architecture review, service management, support operations, and test coordination.

### 8.8 Commercial interpretation

Indicative pricing should help the buyer understand how costs behave under different adoption
scenarios. For Standard Bank, this includes not only implementation and subscription levels, but
also dependency costs, premium support, data or network fees, and any commercial triggers that apply
once usage scales. Respondents should identify what is known, what is estimated, and what would
still require scoping.

The buyer is not asking respondents to lock pricing at RFI stage. It is asking for transparency
sufficient to avoid internal planning based on unrealistic headline numbers.


Respondents should also indicate which parts of their answer are based on referenceable production
deployments versus adjacent experience extrapolated to the requested use case. The buyer uses this
distinction to judge practical maturity. A capability may be technically plausible yet still impose
unacceptable implementation risk if it has not been exercised under comparable controls.

Answers should describe the minimum enterprise building blocks needed for a credible deployment,
including identity, ledger integration, compliance tooling, reporting, service management, and
operational support. This helps the buyer distinguish between a self-contained product and a
platform that assumes a large amount of client-side assembly work.

Where respondents suggest phased adoption, they should outline what typically sits in phase one,
what expands in later phases, and which architecture or governance choices must be made early to
avoid rework. The buyer is not asking for a full project plan, but it is trying to understand
whether early choices constrain later scale.

The buyer also values frank disclosure of customer responsibilities. Responses should state whether
the client needs specialist administrators, 24x7 support staff, compliance analysts, treasury
operators, or partner-management functions beyond what might be assumed at first glance.


### 8.11 Company-specific strategic context

Standard Bank (South Africa) is not approaching **tokenized securities issuance and settlement platform** as a generic blockchain exercise. Standard Bank has been publicly active in digital assets and tokenization, including work around carbon markets, custody-adjacent themes, and digital securities exploration. In the South African context, tokenized securities procurement is less about novelty than about selecting institutional plumbing that can survive audit, regulatory review, and cross-border African operating complexity. The implication for bidders is simple: responses must explain how a controlled production programme would be governed from initial launch through scale, how policy and entitlement decisions are evidenced, and how the platform avoids creating a parallel operating stack that business, risk, and audit teams cannot actually supervise.

The buyer expects the proposed solution to align with the institution's current operating reality. Likely ecosystem dependencies include exchange and CSD processes, custody and nominee models, treasury books, sanctions/KYC, and trade/capital-markets client channels across multiple African jurisdictions. A strong response will therefore identify authoritative systems of record, describe event sequencing between the platform and adjacent enterprise systems, and explain how breaks are detected before they become unresolved ledger differences or customer-impacting incidents.

Executive sponsorship is also expected to be multidisciplinary. Corporate and investment banking, innovation, securities services, risk, and technology leaders would likely sponsor the programme. This matters because the selected supplier will not be evaluated by innovation staff alone. It will be tested by people who care about booking-model integrity, operational resilience, information security, regulatory defensibility, and board-quality reporting.

Finally, the buyer wants commercial and sourcing realism. Public announcements and pilots suggest an active evaluation posture even when formal sourcing details are not public. Bidders should assume that any hidden dependency, vague implementation assumption, or roadmap-led answer will be surfaced quickly during architecture review and clarification sessions.

### 8.12 Company-specific use-case and technical depth

For Standard Bank (South Africa), the most relevant workload pattern is **tokenized securities issuance and servicing, custody/control, investor lifecycle management, and reconciliation across jurisdictions**. Bidders should therefore address at least five operating layers in detail. First, origination and onboarding: how clients, issuers, investors, counterparties, merchants, or participating institutions are onboarded; how eligibility rules are applied; how documentation is stored and versioned; and how approvals are routed when records are incomplete or contradictory. Second, lifecycle execution: how assets, payment obligations, investor entitlements, receivables, or tokenized instruments are created; which fields are configurable; which actions require human approval; and how rules differ by entity, corridor, investor class, or instrument type.

Third, settlement and post-event servicing. The buyer wants to know how the platform handles cut-off times, failed settlement, partial settlement, reversals, corrections, coupon or profit-distribution events, maturity processing, collections, or funding-limit updates as applicable to the use case. A credible response will explain how downstream systems are updated, which identifiers remain stable across systems, and how the buyer can reconstruct the full lifecycle of a record from onboarding through closure.

Fourth, control evidence. The platform must support tamper-evident audit logs, entitlement history, maker-checker enforcement, exception queues, reconciliations, and exportable evidence packs for line-one operations, compliance, risk, internal audit, and if required external supervisors. Fifth, scale and change management. Bidders should explain how new jurisdictions, products, participant classes, currencies, networks, or operating entities are introduced without breaking control assumptions already approved by the buyer.

The buyer also expects bidders to describe concrete integration patterns rather than generic statements about API availability. At minimum, responses should identify synchronous APIs, asynchronous event streams, batch interfaces, document ingestion patterns, reporting extracts, reference-data ownership, and failure-handling approaches. Where partner-operated services are needed for custody, identity, exchange connectivity, sanctions screening, market data, payment messaging, or node infrastructure, the bidder must explain who owns the incident, who owns the SLA, and how evidence is preserved when a third party fails.

### 8.13 Jurisdiction-specific regulatory and governance detail

The regulatory perimeter for Standard Bank (South Africa) is shaped by South African Reserve Bank (SARB), Financial Sector Conduct Authority (FSCA), Prudential Authority, Financial Intelligence Centre Act (FIC Act), Financial Markets Act, POPIA, Joint Standard on Cybersecurity and Cyber Resilience. Bidders must not treat that list as a box-ticking reference. They need to translate the perimeter into platform behaviour: data-location choices, audit-log retention periods, approval routing, customer classification, reporting outputs, outsourcing controls, incident escalation, access recertification, and evidentiary support during supervisory review.

Where the requested use case intersects capital-markets activity, payments, custody, digital-asset exchange operations, or tokenized deposit analogues, respondents should explain the assumed legal characterisation and the resulting control posture. If a proposed architecture depends on a regulated partner, foreign booking model, special-purpose issuer, bankruptcy-remote vehicle, or external wallet/custodian, that structure must be declared explicitly together with the residual obligations that remain with Standard Bank (South Africa). If Sharia governance is relevant, the bidder should explain how product rules, approval lineage, prohibited activity restrictions, and board or committee evidence are captured and reported.

Data governance deserves special treatment. The buyer expects explicit statements on residency, encryption, privileged-access management, break-glass procedures, backup integrity, retention and deletion controls, and the handling of sensitive customer or transaction data in lower environments. Platform logging should make it possible to answer not only what happened, but who approved it, which rule set applied at that time, and what changed when a record was later corrected. If that evidence depends on external SIEM, data lake, or workflow tools, the dependency should be named.

Operational resilience is equally important. Responses should specify recovery-time and recovery-point targets, restoration testing frequency, dependency mapping, degraded-mode behaviour, and the operational plan for third-party outages, network partition, failed screening calls, stuck workflows, delayed settlement confirmations, or inconsistent state across ledgers. The strongest responses will show how Standard Bank (South Africa) could take the platform through architecture review, information-security review, business-continuity review, and internal-audit walkthrough without rewriting the story for each audience.

### 8.14 Company-specific evaluation overlay

In addition to the standard scoring model already defined in this document, Standard Bank (South Africa) expects evaluators to apply the following company-specific weighting overlay when distinguishing between suppliers:

| Criterion | Weight | Why it matters in this procurement |
| --- | --- | --- |
| Strategic business fit | 22% | Scored against tokenized securities issuance and settlement platform in the specific context of Standard Bank (South Africa). |
| Technical architecture and integration fit | 18% | Scored against tokenized securities issuance and settlement platform in the specific context of Standard Bank (South Africa). |
| Regulatory, compliance, and control evidence | 20% | Scored against tokenized securities issuance and settlement platform in the specific context of Standard Bank (South Africa). |
| Security, resilience, and operational readiness | 15% | Scored against tokenized securities issuance and settlement platform in the specific context of Standard Bank (South Africa). |
| Delivery credibility and partner model | 12% | Scored against tokenized securities issuance and settlement platform in the specific context of Standard Bank (South Africa). |
| Commercial transparency and TCO | 8% | Scored against tokenized securities issuance and settlement platform in the specific context of Standard Bank (South Africa). |
| Supplier viability and roadmap discipline | 5% | Scored against tokenized securities issuance and settlement platform in the specific context of Standard Bank (South Africa). |


These weightings are intentionally practical. A bidder can only score strongly if it shows how the solution will work inside the target institution's real control environment, with named integration boundaries, clear ownership, and current-state capability rather than roadmap theatre.

### 8.15 Procurement signals, deployment assumptions, and realism checks

Bidders should assume that clarifications and shortlisted workshops will focus on matters that typically derail programmes late in the cycle: undocumented partner dependency, over-optimistic migration assumptions, weak entitlement design, incomplete reconciliation logic, ambiguous responsibility for key management, vague data-residency answers, and unsupported claims about regulator acceptance. The buyer is explicitly trying to identify those weaknesses before contract award.

A realistic proposal for Standard Bank (South Africa) should therefore provide a phased deployment hypothesis. Phase one should describe the minimum safe production scope, the volumes and participant types supported at launch, required client-side roles, major control gates, and objective acceptance criteria. Phase two should describe how the scope expands once controls, throughput, and reporting have been proven. If the bidder believes the requested use case should be sequenced differently, that is acceptable, but the answer must still show a credible route from contained launch to scaled operations.

The buyer also expects honest disclosure of implementation effort. Responses should call out where data remediation is likely, where legal documentation or policy decisions are prerequisites, where non-functional testing may take longer than feature configuration, and where operations teams will need new runbooks or specialist skills. The aim of this section is not to lengthen the proposal for its own sake. It is to make sure the selected platform can be implemented without nasty surprises once the project leaves the innovation deck and enters production governance.


### 8.16 Integration blueprint and target operating model detail

For Standard Bank (South Africa), bidders should assume that the selected platform will sit inside a layered target operating model rather than replace every surrounding system. The buyer expects a clear description of front-door channels, orchestration services, policy engines, digital-asset or token lifecycle components, settlement connectors, books-and-record interfaces, data and reporting layers, observability tooling, and support workflows. Each layer should have named responsibilities and clearly defined failure domains. If the proposed platform bundles multiple layers, the bidder must still show how those responsibilities are separated for operational control and change approval.

The integration blueprint should identify authoritative records for customer and participant identity, instrument or obligation master data, balances and positions, cash or token movement, pricing or reference data, approvals, and regulatory evidence. The buyer specifically wants to avoid a situation where the platform becomes authoritative for some fields in production but cannot prove that status to downstream control teams. Responses should therefore explain master-data synchronisation, event ordering, clock and timestamp treatment, duplicate-event handling, replay support, and the management of late-arriving messages.

Bidders should also explain the interaction between online and batch processes. In many institutions, the most acute production risk does not arise in the real-time path but in overnight reconciliations, settlement file preparation, exception reprocessing, report generation, and end-of-day close. A convincing response for tokenized securities issuance and settlement platform will therefore describe how the platform handles cut-off windows, resubmissions, backdated corrections, cancelled instructions, and manual operational interventions without corrupting the audit trail. If out-of-band corrections are ever required, the platform should be able to record who performed them, why they were needed, which approvals were obtained, and how the before-and-after state can be reconstructed.

The buyer expects detailed treatment of security administration as part of the operating model. User provisioning should distinguish between business initiators, approvers, supervisors, administrators, support engineers, auditors, and read-only oversight roles. Privileged access should be controlled through approval workflow, strong authentication, session logging where appropriate, and time-bounded elevation. Break-glass access must be exceptional, observable, and retrospectively reviewable. Where the platform integrates with enterprise identity providers, the bidder should explain how group membership, role mapping, emergency revocation, and periodic recertification are handled.

Service management matters just as much as technical design. Responses should describe how incidents are detected, triaged, escalated, resolved, and closed across both the buyer and the supplier. The buyer wants to know who owns first-line diagnosis, what telemetry is available to client support teams, which alerts indicate customer-impacting degradation, and how supplier teams participate in root-cause analysis. If the proposed service model depends on the supplier operating core production components, the bidder must explain handoffs, on-call coverage, maintenance windows, forensic support, and evidence sharing in the event of an incident or audit request.

### 8.17 Data migration, testing, controls assurance, and rollout detail

A realistic deployment for Standard Bank (South Africa) must include a disciplined treatment of migration and controlled rollout. Bidders should state whether the proposed launch assumes greenfield onboarding only, partial migration of legacy records, back-book synchronisation, or coexistence between legacy and tokenized workflows. Where migration is required, the response should identify the source systems, expected data-quality issues, transformation rules, reconciliation checkpoints, and sign-off criteria before production use. The buyer is specifically looking for honesty on data-preparation effort because migration defects often surface only when operational teams begin processing real transactions.

Testing should be described as a full assurance programme, not merely a functional sprint activity. The buyer expects unit and integration testing, non-functional performance testing, resiliency and failover testing, security testing, role/entitlement validation, operational workflow testing, and structured user acceptance. For the requested use case, testing should include negative and boundary scenarios: duplicate submissions, stale approvals, blocked sanctions outcomes, partner timeouts, invalid reference data, settlement failure, partial servicing events, and post-event correction workflows. Bidders should also explain what evidence from testing can be retained to support architecture approval, information-security review, and internal-audit comfort.

Control assurance is an explicit selection criterion for Standard Bank (South Africa). The selected supplier will be expected to support walkthroughs with architecture, security, legal, compliance, operations, risk, and procurement stakeholders. Responses should therefore describe the artefacts available before contract signature and the deeper evidence available during implementation. Useful artefacts include configuration snapshots, role matrices, sample audit logs, example reconciliation outputs, incident-process documentation, environment diagrams, API specifications, backup/restore evidence, and sample operational reports. If these artefacts exist only in vendor-internal formats and cannot be shared with clients, that limitation should be declared clearly.

The rollout plan should distinguish between pilot value and production readiness. A pilot may validate that tokenized securities issuance and servicing, custody/control, investor lifecycle management, and reconciliation across jurisdictions is technically feasible, but the buyer is making a sourcing decision for a programme that will need governance, support, and repeatability. Bidders should therefore outline the minimum controls needed before first live processing, the metrics that would indicate the platform is ready for broader rollout, and the dependencies that must be closed before additional products, entities, markets, or participant groups are added. Where later phases depend on external partner readiness, regulatory comfort, or contract expansion, that dependency should be made visible in the plan rather than left implicit.

Finally, respondents should explain how the programme remains governable after go-live. The buyer expects structured release management, formal change approval, regression testing, periodic entitlement review, exception governance, and management reporting that tracks the real health of the service rather than vanity metrics. Examples of meaningful indicators include exception ageing, reconciliation break volumes, failed-settlement rates, approval turnaround, security incident trends, backlog of unresolved defects, accuracy of regulatory reporting, and frequency of manual overrides. The suppliers that score best will be the ones that show how tokenized securities issuance and settlement platform becomes an owned institutional capability rather than a clever but fragile technology deployment.



### 8.18 Institution-specific market signals and supplier-readiness questions

Standard Bank has publicly engaged in multiple innovation and market-modernization efforts and has one of the continent’s broadest corporate and investment-banking footprints. That profile makes tokenized securities interesting only if they improve issuance, distribution, collateral use, or post-trade servicing in a way that survives scrutiny from operations and risk teams across several jurisdictions. Standard Bank operates in the South African regulatory context and across numerous African jurisdictions, so any tokenized securities platform must be designed for multi-market policy variation, exchange-control awareness, and high-quality reconciliation into existing institutional infrastructure. Domestic lessons from Project Khokha and related wholesale market experiments will shape how seriously evaluators treat settlement and control claims.

For market-discovery purposes, this means respondents should not answer as though they were pitching a generic digital-asset stack. They should explain what must already be true inside Standard Bank (South Africa) for the use case to be governable: which enterprise systems need to remain authoritative, which policies must be finalized up front, which external partners would be mandatory, and which controls would need to be proven before any live processing. Responses that blur those prerequisites will be read as immature even if the underlying product is technically capable.

The buyer is also likely to probe whether comparable deployments exist in adjacent markets, what delivery effort was required to make them work, and where the repeatable product boundary ends. In other words, Standard Bank (South Africa) is using this RFI to separate scalable institutional platforms from bespoke project assemblages. Respondents should be candid about the difference.

### 8.19 Institution-specific evaluation scenarios and rollout signals

A useful RFI response for Standard Bank (South Africa) should describe how the platform would behave in three evaluation scenarios: a straightforward happy-path transaction or issuance; an exception path involving incomplete data, stale approvals, or unresolved compliance outcomes; and a dependency failure involving external settlement, custody, identity, or messaging services. For each scenario, the buyer wants to understand visible system state, operational alerts, user actions, approval controls, and exported evidence. That is the level at which institutional readiness becomes clear.

Respondents should also indicate what a sensible phase-one deployment would look like, what metrics would determine whether phase two is justified, and which dependencies most often extend timelines in real institutions. The strongest RFI submissions will help Standard Bank (South Africa) calibrate not only feature fit but also the hidden operating effort implied by the chosen model.
