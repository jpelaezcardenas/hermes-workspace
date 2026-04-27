Request for Information (RFI)

## Digital Post-Trade FMI

|  |  |
| --- | --- |
| **Issue Date** | 4 March 2026 |
| **Response Due Date & Time (GMT+4)** | 13 March 2026 (EOD GST) |
| **Issuing Organization** | Next Generation Holding – L.L.C – S.P.C |
| **Procurement Contact** | rfi@qfolio.ae |
| **Confidentiality Classification** | Confidential |

**Confidentiality and permitted use**

This RFI and any related materials provided by NGEX are confidential and are provided solely for the purpose of enabling the recipient to prepare an RFI response.

The recipient may disclose this RFI only to its employees, officers, and professional advisers who have a need to know for this purpose and who are bound by confidentiality obligations at least as protective as those contained herein.

The recipient must not disclose this RFI (or its contents) to any third party, or issue any public

statement regarding this RFI or NGEX’s initiative, without NGEX’s prior written consent.

**Table of Contents**

1. [PURPOSE OF THIS RFI 3](#_bookmark0)
2. [BACKGROUND, SCOPE BOUNDARIES, AND NON-NEGOTIABLES 3](#_bookmark1)
3. [REQUIREMENTS MATRIX (MANDATORY) 5](#_bookmark3)
4. [QUESTIONNAIRE (MANDATORY) 7](#_bookmark5)
5. [MANDATORY “COVERAGE & GAPS” STATEMENT (MANDATORY) 10](#_bookmark6)
6. [VENDOR RESPONSE INSTRUCTIONS (SUBMISSION PACKAGE) 10](#_bookmark7)
7. [REQUIREMENTS MATRIX (SPREADSHEET STRUCTURE) 11](#_bookmark8)
8. [EVIDENCE EXPECTATIONS 11](#_bookmark9)

# Purpose of this RFI

This is a **Request for Information (RFI)** issued by Next Generation Holding – L.L.C – S.P.C (NGEX) to gather market information and assess vendor capabilities relevant to NGEX’s **Digital Post-Trade FMI**.

This RFI is **not**:

* A Request for Proposal (RFP).
* A commitment to procure services.
* A promise of shortlist selection, contract award, or commercial engagement. NGEX may use the information received to:
* Refine requirements and architecture decisions.
* Identify potential solution approaches and delivery models.
* Determine a shortlist for follow-up discussions and technical workshops.
* Inform any future procurement process (if any), which would be handled separately. NGEX is requesting clear, evidence-based information on:
* What the vendor can deliver **today**, what requires **roadmap** (with dates), and what the vendor

**cannot** deliver or would outsource.

* Which third parties or partner roles are required to complete an end-to-end solution.
* The vendor’s approach to covering gaps (including suggested partner types and, where possible,

named firms).

* Delivery approach for an MVP, including critical assumptions, dependencies, and resourcing expectations.
* Vendors are requested to provide information that enables NGEX to:
  + Compare alternative architectures and implementation patterns.
  + Identify integration and operational dependencies.
  + Assess security posture, controls maturity, and regulated-market readiness.
  + Understand what the vendor cannot cover and how gaps can be addressed via recommended partners.

# Background, Scope Boundaries, and Non-Negotiables

### Background and context

NGEX, a 100% subsidiary of ADQ (Abu Dhabi’s sovereign wealth fund), followed by L’IMAD[1,](#_bookmark2) is assessing approaches to establish a **digital securities post-trade and settlement infrastructure** to modernize and enhance capital markets workflows through more automated, auditable, and interoperable digital rails.

NGEX will follow an **MVP-first approach**. The MVP is focused on **tokenized ETF units issued as digital twins**, where **time-to-market is critical**. The MVP is intended to validate a practical and controlled operating model.

While ETFs are the starting point, NGEX’s strategic intent is to build a **reusable foundation** that can be extended to other asset classes over time (including bonds and equities) without a full redesign.

Respondents should therefore describe how their proposed solution:

* + - generalizes beyond ETFs,
    - separates reusable core components from asset-class-specific components, and

1 See [press release by the Abu Dhabi Media Office](https://www.mediaoffice.abudhabi/en/economy/supreme-council-for-financial-and-economic-affairs-issues-resolution-to-consolidate-the-assets-and-investments-of-limad-holding-and-abu-dhabi-developmental-holding-group/).

* + - supports a credible evolution path from digital-twin ETFs to broader asset coverage (including native digital issuances, increased corporate actions complexity, servicing, entitlements, and expanded integration points).

NGEX expects respondents to be explicit about what they provide versus what they assume is provided by banks, custodians, CSD/iCSD, transfer agents/registrars, settlement banks, CCPs, collateral platforms, or other parties.

### Digital Twin

A **digital twin** (under UAE law and for the purpose of this RFI) means a traditional security is held in an immobilised account in conventional infrastructure, and a matching set of tokens is created on a distributed ledger to represent the same investor rights. The digital twin is not intended to be a separate and distinct type of asset from the underlying traditional security (it is still the **same ISIN**).

After the twin is created, holding and transfer of the token happens on the ledger under clear governance and compliance rules, while strict controls ensure the token supply always remains 1:1 aligned with the immobilised underlying security (including defined mint/burn approvals, reconciliation, and break-handling). Under the applicable UAE security token regime, **the distributed ledger record is the operative and definitive record for the Security Token.**

### Scope boundaries (important)

**Trading venue functionality is out of scope** for this RFI. NGEX assumes that trading occurs on an external venue. Respondents must describe how the solution ingests **trade confirmation messages** from external venues and supports downstream processing (settlement instructions, reconciliation, evidencing, exception handling, reporting).

NGEX intends to support multiple operating models for the asset lifecycle, especially:

* + - **Digital twin models**, and
    - **Native digital issuance models** (where the asset is issued and managed natively in digital form).

NGEX also intends to avoid single-ledger lock-in. Over time, the target operating environment should support:

* + - **Public EVM-based networks** (for example Ethereum and EVM L2s)
    - **Alternative L1/L0 networks** (for example Solana, Avalanche, or other non-EVM networks as applicable)
    - **Permissioned networks** (for example Canton Network)

### Non-Negotiables (design principles)

If any item below cannot be met, vendors must state this explicitly and propose mitigations.

#### Avoid single points of dependency (custodians and CSDs)

The design must support a credible path to adding additional custodians and additional CSD/market-infrastructure links over time without requiring a full rebuild.

#### Interoperability and portability

Interfaces should be standards-based where feasible. Data and processes must be portable so NGEX can change service providers without unacceptable cost, downtime, or loss of control.

#### Clear separation of roles

The solution must clearly document which entity performs which role (custodian, CSD-like/depository, transfer-agent/registrar-like functions, settlement agent, technology operator, and any other relevant roles).

#### Segregation of duties and approvals

The solution must support robust role-based permissioning and segregation of duties for critical actions (token issuance, burning, freezes, allowlist changes, corporate action events). It must support maker-checker and configurable multi-approver workflows (for example two-person approval) with complete audit trails.

#### Operational resiliency and auditability

End-to-end audit trails must be available across components. Monitoring, reconciliation, exception handling, and evidence production must be first-class features.

#### Security-by-design

Access controls, key management (where applicable), and incident response must be designed for market-infrastructure grade environments.

#### Multi-ledger compatibility and interoperability

Vendors must describe what is supported today, what is on the roadmap (with dates), and the abstraction approach used to avoid hard-coding to a single ledger.

# Requirements Matrix (Mandatory)

### How to complete the Requirements Matrix (required response format)

For **each requirement row**, provide all fields below:

* + - **Offered:** Yes / Partial / No
    - **Availability:** Available now, or roadmap (include month/year)
    - **How it is delivered:** short, specific description (1 to 3 sentences)
    - **Assumptions:** what must be true in NGEX or third parties for this to work
    - **Dependencies:** named components, partners, infrastructure participants, or roles required
    - **Evidence:** at least one evidence item (doc excerpt, architecture diagram, case study, certification, reference under NDA)
    - **Notes / limitations:** constraints, scale limits, geography/regulatory constraints

#### Response rules (non-negotiable):

* + - If you answer **Yes**, explain *how* and provide evidence.
    - If you answer **Partial**, state *what is missing* and *when* it will be available.
    - If you answer **No**, state whether a partner could cover the gap and what integration pattern would be required.

**Definition of “Partial”:** A requirement is “Partial” if it is only deliverable with material constraints,

missing components, or reliance on third parties that are not included, not contracted, or not proven.

**Non-compliance:** Any requirement row left blank, or answered without the required supporting detail, may result in exclusion from shortlisting.

### Requirements list (to be answered in the Requirements Matrix)

Below requirements must be represented as rows in the Requirements Matrix. Respondents may add additional rows if useful, but must not remove or omit rows.

#### Respondent framing and accountability

* + **R-1 Role declaration:** Respondent can explicitly state which role(s) they are responding as (tokenization platform, custodian, CSD-like/depository, transfer agent/registrar-like, orchestration/integration layer, end-to-end provider, other) and define boundaries.
  + **R-2 Responsibility split:** Respondent can provide an explicit responsibility split across **Vendor / NGEX / Third Parties** for MVP and run-state (including operations, approvals, reconciliation, reporting, evidence production).

#### Operating model and role allocation

* + **R-3 Operating model documentation:** Respondent supports documentation of the end-to-end operating model, including Day-2 operations (monitoring, breaks, incident handling, reconciliations, reporting).
  + **R-4 Workflow ownership mapping:** Respondent supports explicit workflow ownership mapping per process step (who acts, who approves, who operates, who is accountable).

#### Architecture, deployment, and non-functional capabilities

* + **R-5 Deployment model suitability:** Respondent supports deployment model(s) suitable for market-infrastructure environments (SaaS, managed service, on-prem, hybrid) and can state constraints.
  + **R-6 Resilience and recovery:** Respondent can meet stated availability/resilience expectations and provide RTO/RPO, plus known constraints.
  + **R-7 Observability:** Respondent provides observability (metrics, logging, tracing) plus monitoring and alerting suitable for production operations.
  + **R-8 Integration patterns:** Respondent supports integration patterns required for external trade confirmation ingestion and downstream processing triggers (APIs, FIX, file, event streaming, webhooks), and can state performance constraints.

#### Tokenization model coverage (digital twin and native)

* + **R-9 Digital twin support:** Respondent supports a digital twin model with defined controls to maintain 1:1 supply alignment between immobilised underlying and tokens.
  + **R-10 Native issuance support:** Respondent supports native digital issuance model (or provides roadmap with dates), including system-of-record governance.
  + **R-11 Golden record governance:** Respondent supports and can evidence “golden record”

governance and authoritative state design across the involved systems.

#### Token lifecycle controls and governance

* + **R-12 Issuance and burn governance:** Respondent supports issuance and burn governance with defined approvals and auditability.
  + **R-13 Restrictions and enforcement:** Respondent supports transfer restrictions (allowlists, freezes) and compliance hooks with auditability.
  + **R-14 Maker-checker and multi-approver:** Respondent supports maker-checker and configurable multi-approver workflows for critical actions (including N-of-M policies).
  + **R-15 Audit trail and evidence outputs:** Respondent provides end-to-end audit trail and evidence outputs suitable for regulated review.

#### Post-trade, settlement, reconciliation, exception handling

* + **R-16 Settlement processing patterns:** Respondent supports settlement processing patterns (gross and/or net) and can state supported finality model(s) (on-chain, off-chain, hybrid).
  + **R-17 DvP approach:** Respondent supports DvP approach options and clearly states cash-leg assumptions and dependencies (banks, settlement agents, stablecoin rails, or other).
  + **R-18 Reconciliation and break handling:** Respondent supports reconciliation (frequency, automation, controls) including break detection, triage, resolution workflow, and evidencing.
  + **R-19 Exception handling controls:** Respondent supports exception handling workflows (failed/late/duplicated/corrected inputs, overrides, cancellations) with audit evidence.

#### Multi-ledger compatibility, portability, export

* + **R-20 Ledger support (production):** Respondent supports at least one ledger type in production and can list supported ledgers and constraints.
  + **R-21 Multi-ledger abstraction:** Respondent provides an abstraction/interoperability approach to avoid hard dependency on a single ledger.
  + **R-22 Portability and export:** Respondent supports export of data, audit logs, and configuration snapshots in a portable format.

# Questionnaire (Mandatory)

### Questionnaire questions (answer in written response)

#### Company and relevant experience

* 1. Provide a company overview and relevant business lines.
  2. Describe 2 to 5 relevant deployments:
     + Tokenized funds/ETFs/other asset classes.
     + Market infrastructure, post-trade, custody.
     + Regulated environments.
  3. Provide references:
     + Named reference, or
     + Anonymized reference, or
     + References available under NDA.

#### Ecosystem and distribution (issuers & investors)

Describe your ecosystem and how it could help NGEX accelerate adoption. Specifically:

* **Issuer access:** What existing relationships do you have with issuers (corporates, banks, sovereign-related issuers etc.) that are relevant to tokenized securities?
* **Investor access:** What existing distribution reach do you have to investors (institutional, wealth managers, market makers, APs/LPs), and through what channels?
* **Platform-driven connectivity:** Does your solution include an existing network, marketplace, membership model, or participant community that NGEX could join or leverage? Explain *how* onboarding works and who contracts with whom.
* **Evidence:** Provide **quantitative indicators** where possible (number of issuers/investors/participants live, active geographies, asset classes live, typical onboarding time). Provide **2–3 example introductions** you could facilitate (named or anonymized, NDA acceptable).
* **Constraints:** State any exclusivity, jurisdictional limits, conflict considerations, or commercial conditions required to access the ecosystem.

#### Solution positioning statement (narrative)

Provide a short “solution positioning statement”:

* What you provide end-to-end.
* What you integrate.
* What you assume NGEX and third parties provide.

#### Target operating model (narrative detail)

Describe the proposed operating model for NGEX’s MVP and run-state:

* Core workflows and who performs them.
* Governance assumptions.
* Day-2 operations (monitoring, breaks, incident handling, reconciliations, reporting).

#### Tokenization models (design narrative)

Describe supported tokenization models:

* Digital twin structures linked to traditional securities (ETF units).
* Native digital issuance models (where applicable). For each model, describe:
* System-of-record (“golden record”) design and governance.
* Differences in operating model, controls, and auditability.
* Constraints and limitations.
* How the approach generalizes beyond ETFs.

#### Trade confirmation ingestion (from external venues)

* 1. How do you ingest trade confirmations from external venues?
     + Interfaces and formats (API, FIX, file, event streaming, webhooks).
     + Latency and throughput expectations.
  2. How are confirmations mapped into your canonical data/event model?
  3. How is downstream processing triggered (settlement instructions, reconciliation, reporting, evidence)?
  4. What operational controls exist for:
     + Failed confirmations.
     + Late confirmations.
     + Duplicates.
     + Corrections and cancellations.
  5. What audit evidence is produced for changes and overrides?

#### 24/7 operation and trading hours

* 1. Which processes can operate 24/7 today?
     + Issuance, transfers, settlement processing, corporate actions, reporting, monitoring.
  2. Bottlenecks preventing 24/7 end-to-end:
     + Human approvals, batch jobs, cut-offs.
     + Dependencies on custodians/CSDs/CCPs.
     + Cash leg constraints.
     + Trade-confirmation availability.
  3. What is required to achieve 24/7 in practice?
     + Operating model, automation, controls, staffing, SLAs.
  4. What is available now vs on roadmap (with dates)?

#### Blockchain / ledger support and interoperability (narrative detail)

* 1. Supported ledgers (current): which ledgers are supported in production today?
  2. Roadmap: what is planned (with dates)?
  3. Deployment patterns by ledger type:
     + Public EVM networks.
     + Permissioned networks.
     + Alternative L1/L0 networks.
  4. For each ledger type, describe support for:
     + Token issuance and lifecycle controls.
     + Transfer restrictions/allowlists.
     + Identity and compliance hooks.
     + Audit trail and reporting.
     + Reconciliation and operational controls.
  5. Interoperability approach:
     + Bridging/messaging/digital twin patterns or other mechanisms to move between permissioned and public networks.
  6. Limitations and mitigations:
     + What you cannot support and recommended partner types.

#### Security and key management (narrative)

* 1. Security architecture overview (high level and key controls).
  2. Certifications and assurance:
     + ISO 27001, SOC 2, penetration testing cadence, other relevant attestations.
  3. Key management approach:
     + HSM/MPC support.
     + Custody model.
     + Key rotation.
     + Break-glass procedures.
  4. Access controls and incident response:
     + Identity and access model.
     + Privileged access management.
     + Incident response and forensics approach.
  5. Data residency and privacy posture (as applicable).

#### Identity, compliance controls, and regulatory readiness (narrative)

Describe:

* KYC/AML integration patterns and supported providers (if any).
* Sanctions screening hooks and eligibility enforcement.
* Programmable regulatory rules / transfer restrictions design.
* Regulatory reporting approach with immutable audit trails.
* Evidence of operating in regulated environments (examples, control testing approach, compliance implementation/testing).

#### Wallet infrastructure for tokenized securities (narrative)

Describe:

* Wallet/custody options supported (MPC/HSM, self-custody with policy controls, third-party custody integrations).
* Segregation models (omnibus vs segregated).
* Recovery, break-glass, and forced action governance (if applicable).
* What you provide vs integrate vs expect NGEX/third parties to provide.

#### Implementation plan (indicative)

Provide:

* Proposed phases, timeline, and deliverables for an MVP.
* Required NGEX inputs and resource needs.
* Dependencies, critical path, and key risks with mitigations.
* Testing approach and go-live readiness criteria.

#### Commercial model (indicative)

Provide:

* Commercial/pricing model options (indicative only).
* One-time implementation costs and ongoing support approach (indicative).
* SLAs and support model options.

# Mandatory “Coverage & Gaps” Statement (Mandatory)

Vendors must include a complete “Coverage & Gaps” statement containing:

* In-scope capabilities you can deliver (clearly mark “available now” versus “roadmap”).
* Capabilities you cannot deliver (or cannot deliver within the MVP timeline).
* Dependencies you require (other vendors, infrastructure participants, custody partners, CCPs, collateral platforms, cloud providers, ledger networks, trading venues as an upstream trade confirmation source).

Suggested partners to cover gaps:

* Provide 2 to 5 recommended partner types and, where possible, named firms.
* Explain why they are required and what interfaces are needed. Integration responsibility split:
* What you will build.
* What NGEX must build.
* What third parties must build.

**Consistency rule:** Any “Partial” or “No” entries in the Requirements Matrix must be reflected in the

Coverage & Gaps statement with a clear mitigation plan (or explicit non-coverage).

**Non-compliance rule:** Any response that does not include a complete “Coverage & Gaps” statement may

be excluded from shortlisting.

# Vendor Response Instructions (Submission Package)

### Submission package (must include all three)

Respondents must submit:

#### Written RFI response (PDF acceptable)

Must answer the **Questionnaire** in Section [4](#_bookmark5) and include the **Coverage & Gaps** statement in Section [5.](#_bookmark6)

#### Completed Requirements Matrix (Spreadsheet)

Must cover all requirements listed in Section [3.2](#_bookmark4) and follow the structure in Section [7](#_bookmark8).

#### Supporting evidence

Provide supporting evidence per Section 8 where available.

### General response quality rules

Responses should be concise and specific.

* + - Where you answer “Yes,” explain how.
    - Where you answer “Partial,” specify what is missing and when it will be available.
    - Where you answer “No,” state whether a partner could fill the gap and how.

NGEX may exclude responses that:

* + - Omit the matrix, omit questionnaire answers, or omit the Coverage & Gaps statement.
    - Provide “Yes/Partial/No” without required detail and evidence.
    - Are internally inconsistent between the matrix and the narrative response.

# Requirements Matrix (Spreadsheet Structure)

For each requirement, include the following columns (minimum):

* Requirement ID (e.g., R-14)
* Requirement description
* Offered (Yes / Partial / No)
* Available now or roadmap (date)
* How it is delivered (short description)
* Assumptions
* Dependencies (who or what)
* Evidence (case study, reference, documentation)
* Implementation effort estimate (vendor and NGEX)
* Key risks and mitigations
* Notes / limitations

# Evidence Expectations

For any claim that materially affects evaluation, provide at least one of:

* Case study summary.
* Reference architecture from a comparable deployment.
* Product documentation excerpt.
* Certification or audit excerpt (as allowable).
* Named reference (may be provided under NDA).
