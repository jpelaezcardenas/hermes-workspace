# [Emirates NBD Logo Placeholder]

# Request for Proposal (RFP)
## Digital Asset Lifecycle Management Platform

**RFP Reference:** ENBD-DA-RFP-2026-001  
**Issuing Entity:** Emirates NBD Bank P.J.S.C.  
**Issue Date:** 16 March 2026  
**Response Deadline:** 17 April 2026, 17:00 GST  
**Contact Email:** digitalassets.rfp@emiratesnbd.com  
**Procurement Contact:** Group Procurement - Strategic Technology Sourcing  
**Classification:** Confidential

---

## Confidentiality Notice

This Request for Proposal ("RFP") is issued by Emirates NBD Bank P.J.S.C. ("Emirates NBD", "ENBD", or the "Bank") on a strictly confidential basis to selected recipients for the sole purpose of enabling such recipients to prepare and submit a proposal in response to this RFP.

The information contained herein, including all appendices, annexes, clarifications, and supplemental materials provided by Emirates NBD in connection with this RFP, is proprietary and confidential. Recipients shall:

1. use the information solely for the purpose of evaluating the opportunity and preparing a response to this RFP;
2. not disclose the information to any third party other than employees, advisors, or subcontractors who have a strict need to know for the purpose of preparing the proposal and who are bound by confidentiality obligations no less restrictive than those contained herein;
3. not reproduce, distribute, or otherwise disseminate this RFP in whole or in part without the prior written consent of Emirates NBD;
4. promptly notify Emirates NBD of any unauthorized access, disclosure, or use of the information; and
5. upon request by Emirates NBD, return or securely destroy all copies of this RFP and any related materials, except to the extent retention is required by applicable law or internal compliance obligations.

Submission of a response does not create any contractual obligation on the part of Emirates NBD. Emirates NBD reserves the right, at its sole discretion, to amend, suspend, withdraw, reissue, or terminate this RFP process at any time, and to accept or reject any or all proposals without assigning any reason.

All costs incurred by recipients in connection with the preparation and submission of a proposal, participation in presentations, due diligence, negotiations, or any other aspect of this RFP process shall be borne solely by the recipient.

Any proposed solution, pricing, architecture, product roadmap, implementation plan, or supporting documentation submitted by a respondent shall be treated by Emirates NBD in accordance with applicable confidentiality obligations, provided that Emirates NBD may share such information internally with its affiliates, advisors, auditors, regulators, and relevant governance bodies for the purpose of evaluation and decision-making.

---

## 1. Executive Summary

### 1.1 Background

Emirates NBD is the largest banking group in the MENAT region by assets and a leading financial institution in the United Arab Emirates. The Bank continues to pursue a deliberate and production-oriented strategy in digital assets, focused on regulated issuance, compliant servicing, institutional-grade settlement, and integration with the broader banking and market infrastructure ecosystem.

Over the last several years, Emirates NBD has advanced from exploratory initiatives to production-grade digital asset use cases. Key milestones in this journey include:

- participation in and support for regulated digital asset market development in the UAE;
- the issuance and listing of a Dh1 billion digital bond using Euroclear's digital financial market infrastructure, listed on Nasdaq Dubai;
- strategic investment and market participation in real estate tokenization through Stake and the Dubai property ecosystem;
- collaboration with compliance technology providers, including Chainalysis, to strengthen blockchain analytics and monitoring capabilities;
- engagement with next-generation ledger and interoperability initiatives, including Swift-related blockchain infrastructure programs; and
- continued evaluation of additional tokenized asset classes, including funds, structured products, sukuk, and cross-border investment instruments.

These initiatives have validated demand, internal capability, and market opportunity. They have also highlighted an operational gap: Emirates NBD currently manages digital asset activity across multiple point solutions, market infrastructures, and bespoke workflows. While these arrangements have supported individual use cases, they do not provide a unified operating model for digital asset lifecycle management at scale.

### 1.2 Strategic Rationale for this RFP

Emirates NBD is therefore seeking proposals for a **Digital Asset Lifecycle Management Platform** that can provide a consolidated, enterprise-grade capability for the issuance, servicing, transfer, settlement, custody administration, compliance control, and reporting of tokenized financial assets.

The target state is not a narrow tokenization engine. The Bank requires a platform capable of supporting the full lifecycle of regulated digital assets across multiple asset classes, multiple ledgers or networks, and multiple regulatory contexts. The platform must fit within a Tier 1 banking environment and support production operations with the governance, controls, resilience, security, and auditability expected of a systemically important financial institution.

### 1.3 Objectives

The objectives of this procurement are to identify and select a platform provider that can enable Emirates NBD to:

1. **Consolidate digital asset operations** across current and future use cases into a common control plane.
2. **Scale beyond isolated transactions** toward repeatable issuance and servicing programs.
3. **Support multiple asset classes**, including digital bonds, tokenized real estate interests, fund units, sukuk, and future regulated instruments.
4. **Enable cross-network and cross-market operations** while preserving compliance, governance, and operational transparency.
5. **Integrate with existing banking, custody, payments, compliance, and market infrastructure systems** rather than requiring parallel operating models.
6. **Maintain regulatory readiness** across UAE jurisdictions and selected international markets relevant to the Bank's cross-border ambitions.
7. **Reduce dependency on bespoke workflows and fragmented tooling**, thereby improving operational efficiency, risk control, and speed to market.

### 1.4 Desired Outcome

Emirates NBD intends to appoint a vendor capable of delivering a phased implementation beginning with priority use cases already validated by the Bank's digital asset program, followed by expansion into additional asset classes and market models. The selected platform should provide a durable foundation for the Bank's digital asset business over the medium term and support future extension as market standards and regulation evolve.

---

## 2. RFP Overview and Instructions to Respondents

### 2.1 Purpose

The purpose of this RFP is to solicit detailed proposals from qualified vendors for the provision, implementation, and support of a Digital Asset Lifecycle Management Platform for Emirates NBD.

### 2.2 Respondent Expectations

Respondents are expected to provide:

- a complete and direct response to all sections of this RFP;
- clear identification of standard product capability versus configurable capability versus partner-delivered capability versus roadmap item;
- implementation assumptions and dependencies;
- details of prior delivery experience in regulated financial services environments;
- commercial terms, licensing approach, and support model; and
- sufficient technical and compliance detail to enable Emirates NBD to perform architecture, security, risk, compliance, operations, and procurement assessment.

### 2.3 Response Principles

Responses must be factual, concise, and specific. Emirates NBD will evaluate actual platform capability more favorably than high-level positioning statements. Respondents shall clearly distinguish between:

- available today in production;
- available today but requiring configuration;
- available through integration to third-party products;
- available only through custom development; and
- not currently available but on roadmap.

Any ambiguity in capability statements may negatively affect evaluation.

### 2.4 Definitions of Priority

For requirement responses, use the following priority interpretation:

- **Must** - Mandatory requirement. Non-compliance may result in disqualification.
- **Should** - Strongly preferred requirement. Respondents should provide capability where available or describe a credible alternative.
- **Could** - Desirable requirement. Capability may improve evaluation but is not mandatory.

### 2.5 Expected Response Format

Unless otherwise stated, each requirement response shall include:

- **Compliance Status:** Fully Compliant / Partially Compliant / Not Compliant / Roadmap
- **Response Narrative:** concise explanation of how the requirement is met
- **Delivery Method:** Standard / Configuration / Integration / Customization / Partner Solution
- **Evidence:** client reference, screenshot, architecture diagram, certification, sample report, or production example
- **Notes/Dependencies:** assumptions, prerequisites, limitations, or third-party dependencies

---

## 3. Emirates NBD Digital Asset Context

### 3.1 Current State

Emirates NBD's current digital asset operating model includes a combination of internal capabilities, external market infrastructure connectivity, compliance tooling, and transaction-specific workflows. The Bank has proven that regulated digital asset transactions can be originated and executed in live environments. However, the Bank does not yet operate a single enterprise platform to manage the full asset lifecycle across use cases.

Current-state characteristics include:

- use-case-specific transaction orchestration;
- separate processes for issuance, compliance screening, investor onboarding, servicing, and reporting;
- reliance on market infrastructure and external ecosystem participants for specific transaction stages;
- partial integration with internal systems; and
- limited reuse of controls, templates, and data models across asset types.

### 3.2 Why Consolidation is Required

As transaction volume, asset diversity, and regulatory expectations increase, this fragmented model creates operational risk and scaling constraints. In particular, Emirates NBD seeks to address the following:

- duplicated setup effort across asset classes;
- inconsistent control design across digital asset workflows;
- limited standardization of investor, asset, and transaction data;
- fragmented reporting and audit evidence;
- integration overhead between issuance, payments, custody, and compliance processes; and
- difficulty extending current tooling to additional jurisdictions, instruments, and networks.

### 3.3 Target Operating Model

The Bank's target operating model is a unified digital asset platform integrated with Emirates NBD's enterprise architecture and capable of supporting:

- issuance and lifecycle management of multiple regulated digital asset classes;
- policy-driven investor eligibility and transfer control;
- event-based servicing and settlement automation;
- interoperability with multiple ledger environments and market infrastructures;
- enterprise-grade audit, reporting, security, and resilience controls; and
- a phased expansion path from current anchor use cases into broader capital markets and wealth-related digital asset products.

---

## 4. Scope of Work

### 4.1 In-Scope Capabilities

The selected vendor shall provide a Digital Asset Lifecycle Management Platform and associated implementation services covering, at minimum, the following scope areas:

#### 4.1.1 Asset Issuance and Structuring
- digital bond issuance;
- tokenized real estate interests and property-linked investment structures;
- tokenized fund units and structured investment products;
- sukuk and Shariah-compliant digital instruments;
- private placement and restricted distribution workflows; and
- template-driven creation of new digital asset programs.

#### 4.1.2 Asset Servicing and Administration
- coupon, yield, distribution, and redemption processing;
- maturity and early redemption handling;
- corporate actions and investor event workflows;
- valuation and NAV-related data integration where relevant;
- ledger reconciliation and entitlement tracking; and
- investor communication and reporting support.

#### 4.1.3 Compliance, Identity, and Control
- onboarding and identity-linked eligibility controls;
- investor classification, suitability, and jurisdictional restriction logic;
- AML, sanctions, transaction monitoring, and audit workflows;
- policy-driven transfer restriction enforcement; and
- operational controls for regulated market participation.

#### 4.1.4 Settlement and Cash Integration
- support for delivery-versus-payment (DvP), payment-versus-payment (PvP), and atomic settlement patterns;
- integration with cash legs, payment rails, and relevant market infrastructure;
- reconciliation of asset and cash settlement states; and
- support for secondary transfer and post-trade processing.

#### 4.1.5 Custody Administration and Operational Control
- enterprise-compatible key and vault administration;
- segregation and role-based operational control;
- asset freeze, forced transfer, and exception handling capabilities;
- approval workflows and operator accountability; and
- support for internal governance and regulatory intervention scenarios.

#### 4.1.6 Reporting and Oversight
- regulatory reporting support;
- investor and issuer reporting;
- operational dashboards and exception views;
- immutable audit trails and evidence export;
- portfolio, issuance, servicing, and transaction analytics.

### 4.2 Asset Classes in Scope

Initial and future asset classes in scope include:

1. Digital bonds and notes
2. Tokenized real estate interests
3. Fund units / collective investment interests
4. Sukuk and Islamic investment instruments
5. Structured products and certificates
6. Other tokenized financial instruments as may be approved by Emirates NBD

### 4.3 Networks and Infrastructure in Scope

The platform must support operations across more than one ledger or network environment and must not assume a single-chain operating model. Emirates NBD expects support for:

- permissioned network deployments;
- interoperability with external market infrastructures;
- selected public blockchain connectivity where permitted by policy and regulation; and
- abstraction of business workflows from underlying network-specific implementation details.

### 4.4 Services in Scope

Respondents shall include the following services in their proposal:

- solution design and architecture;
- implementation and configuration;
- integration services;
- migration planning from current point solutions and workflows;
- testing support;
- training and knowledge transfer;
- post-go-live support; and
- ongoing product and regulatory enhancement support.

### 4.5 Out of Scope

Unless expressly proposed as an optional component, the following are not primary scope items under this RFP:

- retail self-custody wallet products;
- unregulated virtual asset trading venue functionality;
- consumer crypto brokerage services; and
- custom blockchain protocol development.

---

## 5. Functional Requirements

**Instructions:** Respondents shall complete all functional requirements using the expected response format defined in Section 2.5.

### 5.1 Asset Issuance Requirements

| ID | Requirement Description | Priority | Expected Response Format |
|---|---|---|---|
| FR-001 | Platform shall support template-driven issuance of digital bonds, including configurable coupon structure, denomination, issuance size, maturity date, investor eligibility rules, and settlement model. | Must | Compliance Status + Response Narrative + Delivery Method + Evidence + Notes/Dependencies |
| FR-002 | Platform shall support primary issuance workflows for private placement and institutional distribution, including allocation, booking, and investor-level entitlement creation. | Must | Same as above |
| FR-003 | Platform shall support tokenization of real estate-linked investment interests, including asset metadata, fractional ownership structure, subscription workflow, and investor cap table maintenance. | Must | Same as above |
| FR-004 | Platform shall support tokenized fund unit issuance, including subscription, creation/redemption events, and integration of NAV-driven unit accounting. | Should | Same as above |
| FR-005 | Platform shall support sukuk or Shariah-compliant instrument issuance structures, including configurable profit distribution mechanics and non-interest-based cash flow models. | Should | Same as above |
| FR-006 | Platform shall enable reusable issuance templates for new programs to reduce setup time for repeat issuances. | Must | Same as above |
| FR-007 | Platform shall support configurable issuance approval workflows involving business, operations, legal, risk, compliance, and treasury stakeholders. | Must | Same as above |
| FR-008 | Platform shall maintain a canonical digital asset register including issuer, instrument, investor, entitlement, event, and status data. | Must | Same as above |

### 5.2 Asset Servicing Requirements

| ID | Requirement Description | Priority | Expected Response Format |
|---|---|---|---|
| FR-009 | Platform shall support scheduled coupon, yield, rental, or profit distribution events, including calculation, approval, execution, and reconciliation. | Must | Compliance Status + Response Narrative + Delivery Method + Evidence + Notes/Dependencies |
| FR-010 | Platform shall support maturity handling, including redemption calculation, payment coordination, entitlement closure, and asset status transition. | Must | Same as above |
| FR-011 | Platform shall support early redemption, buyback, call, and partial cancellation events where permitted by the instrument structure. | Should | Same as above |
| FR-012 | Platform shall support corporate actions and event-driven investor servicing workflows, including notices, elections, and execution records. | Should | Same as above |
| FR-013 | Platform shall support periodic valuation and NAV ingestion for applicable assets, with impact on holdings, reporting, and investor statements. | Should | Same as above |
| FR-014 | Platform shall calculate investor-level entitlements based on record date, holding state, and applicable event rules. | Must | Same as above |
| FR-015 | Platform shall maintain a complete history of asset lifecycle events from issuance to final redemption or retirement. | Must | Same as above |
| FR-016 | Platform shall support exception handling for failed servicing events, including retries, manual overrides, and full operator audit logging. | Must | Same as above |

### 5.3 Compliance and Identity Requirements

| ID | Requirement Description | Priority | Expected Response Format |
|---|---|---|---|
| FR-017 | Platform shall support linkage between investor identity records and wallet/account identifiers used for digital asset holding and transfer. | Must | Compliance Status + Response Narrative + Delivery Method + Evidence + Notes/Dependencies |
| FR-018 | Platform shall support investor classification rules, including retail, professional, accredited, qualified, institutional, or jurisdiction-specific equivalence classes. | Must | Same as above |
| FR-019 | Platform shall enforce transfer restrictions based on investor classification, product eligibility, geographic restrictions, and issuer-defined policies. | Must | Same as above |
| FR-020 | Platform shall support KYC/AML status ingestion from enterprise onboarding systems or approved third-party systems. | Must | Same as above |
| FR-021 | Platform shall support policy-driven restrictions for VARA, DFSA, and CBUAE use cases, including whitelisting, blacklisting, and jurisdictional controls. | Must | Same as above |
| FR-022 | Platform shall support sanctions screening integration for onboarding and transaction-level monitoring. | Must | Same as above |
| FR-023 | Platform shall support configurable holding periods, lock-up periods, and resale restrictions by asset program. | Must | Same as above |
| FR-024 | Platform shall support beneficial ownership and nominee structure recording where applicable. | Should | Same as above |
| FR-025 | Platform shall provide compliance exception queues and case management support for review, escalation, and decision logging. | Should | Same as above |
| FR-026 | Platform shall support evidence retention for investor onboarding, approvals, screening results, and transfer decisions. | Must | Same as above |

### 5.4 Settlement and Transfer Requirements

| ID | Requirement Description | Priority | Expected Response Format |
|---|---|---|---|
| FR-027 | Platform shall support DvP settlement workflows linking asset transfer and cash settlement outcomes. | Must | Compliance Status + Response Narrative + Delivery Method + Evidence + Notes/Dependencies |
| FR-028 | Platform shall support atomic settlement patterns where supported by the underlying infrastructure. | Should | Same as above |
| FR-029 | Platform shall support PvP or synchronized multi-leg settlement patterns for cross-currency or cross-asset transactions where relevant. | Could | Same as above |
| FR-030 | Platform shall support interoperability with Euroclear digital financial market infrastructure for relevant issuance or post-issuance workflows. | Must | Same as above |
| FR-031 | Platform shall support settlement status tracking across asset leg, cash leg, and exception states. | Must | Same as above |
| FR-032 | Platform shall support bilateral and multilateral transfer workflows in permissioned network environments. | Should | Same as above |
| FR-033 | Platform shall support secondary market transfer controls, including pre-trade eligibility checks and post-trade ownership updates. | Must | Same as above |
| FR-034 | Platform shall support failed settlement management including cancellation, resubmission, escalation, and reconciliation. | Must | Same as above |

### 5.5 Custody Administration and Operational Control Requirements

| ID | Requirement Description | Priority | Expected Response Format |
|---|---|---|---|
| FR-035 | Platform shall support integration with enterprise-grade key custody or HSM-backed signing environments and shall not require unmanaged private key handling by Emirates NBD operators. | Must | Compliance Status + Response Narrative + Delivery Method + Evidence + Notes/Dependencies |
| FR-036 | Platform shall support role-based vault or wallet administration, including segregation of duties across initiation, approval, and execution functions. | Must | Same as above |
| FR-037 | Platform shall support asset freeze, hold, or restriction controls at the wallet, account, investor, or instrument level, subject to governing policy. | Must | Same as above |
| FR-038 | Platform shall support forced transfer, clawback, or administrative reassignment events where legally and operationally required. | Should | Same as above |
| FR-039 | Platform shall support threshold approvals and dual or multi-authorization for sensitive actions. | Must | Same as above |
| FR-040 | Platform shall provide full operator accountability, including time-stamped action logs, approval history, and rationale capture. | Must | Same as above |
| FR-041 | Platform shall support operational runbooks for routine and exceptional asset administration processes. | Should | Same as above |

### 5.6 Reporting, Audit, and Management Information Requirements

| ID | Requirement Description | Priority | Expected Response Format |
|---|---|---|---|
| FR-042 | Platform shall provide configurable dashboards for issuance, holdings, transfers, servicing events, compliance exceptions, and operational status. | Must | Compliance Status + Response Narrative + Delivery Method + Evidence + Notes/Dependencies |
| FR-043 | Platform shall provide investor reporting outputs, including statements, transaction histories, entitlements, and event notices. | Must | Same as above |
| FR-044 | Platform shall provide issuer and program reporting outputs, including issuance statistics, holder distribution, settlement status, and lifecycle milestones. | Must | Same as above |
| FR-045 | Platform shall support regulatory reporting data extraction and scheduled report generation in structured and auditable formats. | Must | Same as above |
| FR-046 | Platform shall maintain immutable or tamper-evident audit trails covering configuration changes, user actions, approvals, transactions, and system events. | Must | Same as above |
| FR-047 | Platform shall support export of audit evidence for internal audit, risk, compliance, and regulator review. | Must | Same as above |
| FR-048 | Platform shall support near real-time monitoring and alerting for exceptions, failed events, policy breaches, or integration issues. | Must | Same as above |
| FR-049 | Platform shall support data retention and archival policies aligned to banking regulatory and internal governance requirements. | Must | Same as above |
| FR-050 | Platform shall provide configurable MI and analytics views to support business growth planning across asset classes, investor segments, and networks. | Could | Same as above |

### 5.7 Functional Response Summary

Respondents shall append a consolidated matrix showing all functional requirements, compliance status, and whether the capability is delivered as standard product, product configuration, integration, partner capability, or custom build.

---

## 6. Technical Requirements

**Instructions:** Respondents shall complete all technical requirements using the expected response format defined in Section 2.5.

### 6.1 Architecture and Platform Design

| ID | Requirement Description | Priority | Expected Response Format |
|---|---|---|---|
| TR-001 | Solution shall be API-first, with documented, versioned, and secure APIs for core business functions, administration, and integration. | Must | Compliance Status + Response Narrative + Delivery Method + Evidence + Notes/Dependencies |
| TR-002 | Solution shall support modular or microservices-oriented architecture to allow selective deployment, scaling, and maintenance. | Must | Same as above |
| TR-003 | Solution shall support logical tenant, environment, or business-domain segregation suitable for enterprise deployment and controlled expansion. | Should | Same as above |
| TR-004 | Solution shall maintain separation between business workflow orchestration and ledger/network-specific execution components. | Must | Same as above |
| TR-005 | Solution shall provide full environment support for development, SIT, UAT, pre-production, and production. | Must | Same as above |
| TR-006 | Solution shall support configuration management, release management, and promotion controls across environments. | Must | Same as above |

### 6.2 Integration Requirements

| ID | Requirement Description | Priority | Expected Response Format |
|---|---|---|---|
| TR-007 | Solution shall support integration with Emirates NBD core banking, customer onboarding, payments, treasury, and data/reporting systems through standard interfaces. | Must | Compliance Status + Response Narrative + Delivery Method + Evidence + Notes/Dependencies |
| TR-008 | Solution shall support integration with Swift-related infrastructure or messaging patterns for transaction coordination and settlement messaging where required. | Must | Same as above |
| TR-009 | Solution shall support integration with Euroclear digital financial market infrastructure and adjacent post-trade systems relevant to in-scope use cases. | Must | Same as above |
| TR-010 | Solution shall support integration with market venues or market infrastructure such as Nasdaq Dubai where relevant to issuance lifecycle events and reporting. | Should | Same as above |
| TR-011 | Solution shall support integration with existing blockchain analytics and compliance tooling, including Chainalysis or equivalent. | Must | Same as above |
| TR-012 | Solution shall support event-driven integration patterns and message-based processing in addition to synchronous APIs. | Should | Same as above |
| TR-013 | Solution shall provide standard adapters, SDKs, or integration frameworks to reduce custom integration effort. | Should | Same as above |

### 6.3 Security Requirements

| ID | Requirement Description | Priority | Expected Response Format |
|---|---|---|---|
| TR-014 | Solution shall support encryption of data at rest and in transit using enterprise-standard cryptographic controls. | Must | Compliance Status + Response Narrative + Delivery Method + Evidence + Notes/Dependencies |
| TR-015 | Solution shall support integration with HSMs, enterprise key management services, or approved custody-signing infrastructure. | Must | Same as above |
| TR-016 | Solution shall support SSO and federation with Emirates NBD identity and access management standards, including role-based access controls. | Must | Same as above |
| TR-017 | Vendor shall hold, or be actively certified against, ISO 27001 and provide security governance evidence relevant to banking clients. | Must | Same as above |
| TR-018 | Vendor shall provide independent assurance reports such as SOC 2 Type II, ISAE 3402, or equivalent where available. | Should | Same as above |
| TR-019 | Solution shall support security logging, SIEM integration, and alert forwarding to Emirates NBD security operations tooling. | Must | Same as above |
| TR-020 | Solution shall support vulnerability management, patching, and secure SDLC evidence suitable for due diligence review. | Must | Same as above |

### 6.4 Performance, Resilience, and Scalability Requirements

| ID | Requirement Description | Priority | Expected Response Format |
|---|---|---|---|
| TR-021 | Solution shall provide documented performance benchmarks for transaction throughput, event processing, and concurrent user support under production-like conditions. | Must | Compliance Status + Response Narrative + Delivery Method + Evidence + Notes/Dependencies |
| TR-022 | Solution shall support horizontal or otherwise elastic scaling of core components without material redesign. | Should | Same as above |
| TR-023 | Solution shall provide high-availability deployment options and documented RTO/RPO metrics. | Must | Same as above |
| TR-024 | Solution shall support observability across application, integration, and ledger interaction layers, including logs, metrics, and traces. | Must | Same as above |
| TR-025 | Solution shall support backup, disaster recovery, failover testing, and resilience procedures appropriate for critical financial services workloads. | Must | Same as above |

### 6.5 Deployment and Infrastructure Requirements

| ID | Requirement Description | Priority | Expected Response Format |
|---|---|---|---|
| TR-026 | Solution shall be available for deployment on-premises or in a bank-controlled private environment to satisfy data sovereignty and regulatory requirements. | Must | Compliance Status + Response Narrative + Delivery Method + Evidence + Notes/Dependencies |
| TR-027 | Solution should also support hybrid deployment patterns where selected services or integrations may operate in approved cloud environments. | Should | Same as above |
| TR-028 | Solution shall specify supported infrastructure patterns, container orchestration requirements, third-party runtime dependencies, and operational prerequisites. | Must | Same as above |

### 6.6 Blockchain and Network Support Requirements

| ID | Requirement Description | Priority | Expected Response Format |
|---|---|---|---|
| TR-029 | Solution shall support permissioned ledger/network deployments suitable for regulated institutional use cases. | Must | Compliance Status + Response Narrative + Delivery Method + Evidence + Notes/Dependencies |
| TR-030 | Solution shall support connectivity to selected public blockchains where policy and regulation permit such use. | Should | Same as above |
| TR-031 | Solution shall support multi-chain or multi-network operations through a unified business control layer. | Must | Same as above |
| TR-032 | Solution shall provide mechanisms for network abstraction, portability, or migration to mitigate lock-in to a single protocol or infrastructure provider. | Should | Same as above |

---

## 7. Regulatory and Compliance Requirements

**Instructions:** Respondents shall complete all regulatory and compliance requirements using the expected response format defined in Section 2.5.

| ID | Requirement Description | Priority | Expected Response Format |
|---|---|---|---|
| CR-001 | Solution shall support operation in a manner aligned with applicable UAE regulatory frameworks relevant to tokenized securities, digital assets, and regulated market activity. | Must | Compliance Status + Response Narrative + Delivery Method + Evidence + Notes/Dependencies |
| CR-002 | Solution shall support policy controls and reporting relevant to Dubai Virtual Assets Regulatory Authority (VARA) regulated use cases, where applicable. | Must | Same as above |
| CR-003 | Solution shall support policy controls and reporting relevant to Dubai Financial Services Authority (DFSA) regulated use cases, where applicable. | Must | Same as above |
| CR-004 | Solution shall support requirements arising from Central Bank of the UAE (CBUAE) expectations for banking technology risk, outsourcing governance, data handling, and operational resilience. | Must | Same as above |
| CR-005 | Solution shall support investor eligibility controls, offering restrictions, and resale controls required for private placement, professional investor, or restricted distribution models. | Must | Same as above |
| CR-006 | Solution shall support sanctions screening, PEP screening, adverse media flag integration, and transaction monitoring workflows through integration or native capability. | Must | Same as above |
| CR-007 | Solution shall support retention of full audit trails suitable for internal audit, external audit, and regulator review. | Must | Same as above |
| CR-008 | Solution shall support evidence-based approval workflows and control attestations for key regulated actions. | Must | Same as above |
| CR-009 | Solution shall support data residency, data classification, and access control patterns required by Emirates NBD internal policy and applicable regulation. | Must | Same as above |
| CR-010 | Solution shall support role segregation and privileged access control in line with regulated financial institution expectations. | Must | Same as above |
| CR-011 | Solution should support cross-border regulatory operating models, including selected requirements relevant to MAS Singapore, MiCA Europe, or other target jurisdictions identified by Emirates NBD. | Should | Same as above |
| CR-012 | Solution shall support configurable legal entity, jurisdiction, and product policy rules such that one platform can be used across more than one regulatory perimeter. | Must | Same as above |
| CR-013 | Solution should support Shariah-compliant instrument administration, including rule configuration and evidence outputs relevant to Islamic finance governance. | Should | Same as above |
| CR-014 | Vendor shall disclose any current or historical regulatory actions, material security incidents, or litigation relevant to its platform, services, or regulated financial services implementations. | Must | Same as above |
| CR-015 | Vendor shall provide a model for regulatory change management, including how new rules, policy updates, and market practice changes are reflected in the product and customer deployments. | Must | Same as above |
| CR-016 | Solution shall support recordkeeping and export capabilities sufficient for legal hold, investigations, dispute handling, and supervisory requests. | Must | Same as above |
| CR-017 | Vendor shall support Emirates NBD third-party risk management review, including submission of security, privacy, resilience, subcontractor, and control documentation. | Must | Same as above |
| CR-018 | Solution should support configurable consent, disclosure acknowledgement, and investor communication records where required by offering structure or jurisdiction. | Should | Same as above |

---

## 8. Implementation Requirements

### 8.1 Implementation Approach

Emirates NBD prefers a phased implementation approach rather than a single big-bang rollout. Respondents shall propose an implementation plan structured into clear phases, with each phase containing deliverables, entry/exit criteria, dependencies, and governance checkpoints.

At a minimum, respondents should address:

- discovery and detailed design;
- architecture and security review;
- core platform deployment;
- integration build and validation;
- use-case configuration for Phase 1;
- testing and readiness;
- production cutover;
- hypercare and transition to BAU; and
- expansion roadmap for additional asset classes and networks.

### 8.2 Phase 1 Priority Scope

Emirates NBD expects Phase 1 to prioritize capabilities aligned to validated market demand and current strategic momentum. Respondents should assume that Phase 1 is likely to focus on one or more of the following:

1. Digital bond issuance and servicing
2. Tokenized real estate investment servicing and control framework
3. Compliance-integrated transfer control and reporting foundation
4. Euroclear and enterprise integration baseline

### 8.3 Migration and Transition

Respondents shall describe how they would support migration or controlled transition from current point solutions, bespoke workflows, and existing operating processes. This shall include:

- migration of asset master and program configuration data;
- migration or recreation of investor and entitlement records where applicable;
- integration transition sequencing;
- coexistence strategy during the migration period; and
- cutover risk mitigation and rollback planning.

### 8.4 Training and Knowledge Transfer

Respondents shall include a structured training and knowledge transfer plan for:

- operations teams;
- business and product teams;
- compliance and risk teams;
- technology and support teams; and
- internal audit or oversight functions where relevant.

Training must include both platform usage and operational control concepts, with documented runbooks and administration guides.

### 8.5 Governance

Respondents shall propose a governance model for implementation, including:

- executive steering;
- project management and RAID management;
- architecture governance;
- information security and risk engagement;
- testing governance;
- release governance; and
- post-go-live service review.

### 8.6 Testing Expectations

The proposal shall address approach and responsibilities for:

- unit testing;
- integration testing;
- system integration testing;
- performance testing;
- security testing;
- user acceptance testing;
- operational readiness testing; and
- disaster recovery testing.

---

## 9. Vendor Qualification Requirements

Respondents must demonstrate that they meet the minimum qualification criteria below. Emirates NBD may request supporting evidence at any stage.

### 9.1 Mandatory Qualification Criteria

1. Vendor must have a minimum of **three (3) years** of experience providing digital asset platform capability relevant to regulated financial institutions.
2. Vendor must provide evidence of at least **two (2) production references** with Tier 1 banks, major financial institutions, regulated exchanges, central market infrastructure providers, or equivalent institutions.
3. Vendor must demonstrate experience with **regulated digital securities, tokenized financial instruments, or post-trade/asset servicing workflows** beyond unregulated crypto-native use cases.
4. Vendor must demonstrate the ability to support implementation and ongoing operations in the **Middle East**, either through direct local presence or through a clearly identified and qualified regional delivery partner.
5. Vendor must demonstrate a mature information security and operational risk posture appropriate for engagement by a systemically important banking group.

### 9.2 Requested Qualification Information

Respondents shall provide:

- legal entity details, ownership structure, and principal place of business;
- years in operation and years in digital asset platform delivery;
- audited financial statements or equivalent financial health summary for the last two fiscal years;
- description of product ownership, R&D footprint, and delivery organization;
- list of relevant client references, with contactable references where possible;
- certifications and assurance reports;
- regulator-facing or regulated-market experience summary;
- details of subcontractors, implementation partners, and hosting partners;
- insurance coverage details relevant to professional indemnity, cyber risk, and general liability; and
- disclosure of any material litigation, insolvency risk, or adverse events.

### 9.3 Reference Expectations

Emirates NBD reserves the right to contact customer references directly. Respondents should provide references that are meaningfully comparable in one or more of the following respects:

- banking or capital markets context;
- regulated issuance or servicing use cases;
- multi-system enterprise integration;
- institutional-grade security and control expectations; and
- production deployment rather than pilot-only usage.

---

## 10. Commercial Requirements

### 10.1 Pricing Structure

Respondents shall provide a transparent commercial model, including where applicable:

- software license fees;
- subscription or annual platform fees;
- implementation services fees;
- integration or connector fees;
- hosting fees;
- support and maintenance fees;
- training fees;
- optional module pricing; and
- third-party dependency costs.

### 10.2 Pricing Principles

Pricing should identify:

- one-time versus recurring costs;
- assumptions affecting pricing;
- usage-based components, if any;
- asset-class or network-based pricing dependencies;
- minimum commitments;
- volume tiers;
- change request charging model; and
- pricing validity period.

### 10.3 Commercial Transparency

Respondents must clearly disclose any required third-party products, managed services, or infrastructure components not included in the base platform fee.

### 10.4 Contract Expectations

Emirates NBD expects the final contract to include, at a minimum:

- service levels and support commitments;
- information security and confidentiality obligations;
- audit rights;
- data ownership and return provisions;
- subcontractor controls;
- business continuity obligations;
- regulatory cooperation clauses where applicable;
- change control procedures; and
- termination assistance provisions.

---

## 11. Evaluation Methodology

Proposals will be evaluated using a weighted scoring model. Emirates NBD reserves the right to adjust the process, request clarifications, or conduct additional due diligence as needed.

### 11.1 Evaluation Weighting

| Evaluation Criterion | Weight |
|---|---:|
| Technical capability and product fit | 40% |
| Compliance and regulatory alignment | 20% |
| Implementation approach and delivery confidence | 15% |
| Commercial terms and value for money | 15% |
| References and vendor experience | 10% |

### 11.2 Evaluation Considerations

#### 11.2.1 Technical Capability and Product Fit (40%)
Assessment will include:

- breadth and depth of lifecycle coverage;
- maturity of issuance, servicing, settlement, control, and reporting capabilities;
- architectural fit with Emirates NBD standards;
- integration readiness;
- multi-asset and multi-network support; and
- clarity on standard capability versus custom development.

#### 11.2.2 Compliance and Regulatory Alignment (20%)
Assessment will include:

- UAE regulatory readiness;
- policy-driven control capability;
- auditability and evidence;
- security and governance posture;
- cross-border support potential; and
- operational suitability for regulated banking use cases.

#### 11.2.3 Implementation Approach (15%)
Assessment will include:

- realism of the implementation plan;
- quality of migration and integration approach;
- delivery model and governance;
- resource adequacy;
- training and knowledge transfer; and
- risk identification and mitigation.

#### 11.2.4 Commercial Terms (15%)
Assessment will include:

- total cost of ownership;
- transparency of pricing;
- flexibility of commercial model;
- alignment of price to delivered value; and
- reasonableness of assumptions and optionality.

#### 11.2.5 References and Experience (10%)
Assessment will include:

- relevance and credibility of references;
- production experience in comparable settings;
- regional or regulatory relevance; and
- vendor maturity and financial stability.

### 11.3 Shortlisting and Demonstrations

Emirates NBD may invite shortlisted respondents to:

- present their proposal;
- provide solution demonstrations focused on Emirates NBD use cases;
- participate in architecture, security, and compliance deep-dive sessions;
- submit supplemental documentation; and
- support reference checks and site visits, if required.

---

## 12. Indicative Timeline

The following timeline is provided for planning purposes and may be amended by Emirates NBD.

| Milestone | Indicative Date |
|---|---|
| RFP issued to selected respondents | 16 March 2026 |
| Vendor confirmation of participation | 20 March 2026 |
| Q&A period opens | 16 March 2026 |
| Deadline for submission of questions | 30 March 2026 |
| Consolidated responses to questions issued | 3 April 2026 |
| Proposal submission deadline | 17 April 2026 |
| Initial compliance screening | 20-24 April 2026 |
| Detailed technical/commercial evaluation | 27 April - 22 May 2026 |
| Shortlist presentations and demonstrations | Week of 25 May 2026 |
| Final due diligence and negotiations | Early June 2026 |
| Intended contract award | By 30 June 2026 |
| Phase 1 mobilization | July 2026 |
| Target Phase 1 go-live | Q4 2026 |

Respondents should identify any assumptions or lead times that may affect this timeline.

---

## 13. Submission Instructions

### 13.1 Submission Method

Responses must be submitted electronically in PDF format, with supporting schedules in editable format where applicable, to:

**Email:** digitalassets.rfp@emiratesnbd.com  
**Subject Line:** Response - ENBD-DA-RFP-2026-001 - [Vendor Name]

Emirates NBD may subsequently request delivery through a procurement portal or secure file transfer mechanism.

### 13.2 Response Package

The submission must include the following:

1. Executive cover letter signed by an authorized signatory
2. Completed response to this RFP
3. Requirement response matrices (functional, technical, compliance)
4. Solution architecture overview
5. Implementation plan and indicative project timeline
6. Security and compliance documentation pack
7. Commercial proposal and pricing schedule
8. Reference summary
9. Exceptions and assumptions register
10. Draft contract mark-up or list of key contractual observations

### 13.3 Page Guidance

To support evaluation efficiency, Emirates NBD requests the following indicative limits:

- Executive summary: up to 5 pages
- Core response narrative: up to 60 pages excluding appendices
- Security/compliance appendix: as required
- Commercial appendix: as required
- Reference appendix: up to 10 pages

Concise, evidence-backed responses are preferred over generic marketing material.

### 13.4 Questions and Clarifications

All questions regarding this RFP must be submitted in writing to the contact email above by the date specified in the indicative timeline. Emirates NBD may respond through consolidated clarification notices distributed to all respondents.

Respondents shall not contact other Emirates NBD employees regarding this RFP unless expressly authorized by the procurement contact.

### 13.5 Validity Period

Proposals shall remain valid for a minimum period of **180 calendar days** from the proposal submission deadline.

### 13.6 Language and Currency

Responses shall be submitted in English. Commercial proposals shall be presented in AED unless otherwise agreed, with any non-AED components clearly identified.

---

## 14. Proposal Response Template

To ensure consistent evaluation, respondents should structure their response using the following headings:

1. Respondent Overview
2. Executive Summary of Proposal
3. Product Overview and Architecture
4. Response to Functional Requirements
5. Response to Technical Requirements
6. Response to Regulatory and Compliance Requirements
7. Implementation Approach
8. Support and Operating Model
9. Security, Risk, and Resilience
10. Commercial Proposal
11. References and Relevant Case Studies
12. Assumptions, Dependencies, and Exceptions
13. Appendices

---

## 15. Additional Due Diligence Topics

Emirates NBD expects shortlisted vendors to support further diligence across the following topics:

### 15.1 Security and Privacy Review
- security architecture review;
- penetration testing evidence;
- code security practices;
- privileged access model;
- data handling and privacy controls;
- incident management procedures.

### 15.2 Operational Resilience Review
- support model and coverage windows;
- escalation model;
- disaster recovery testing evidence;
- product release and patch governance;
- dependency management;
- concentration risk and key-person risk.

### 15.3 Product Roadmap Review
- planned enhancements relevant to Emirates NBD;
- approach to customer influence on roadmap;
- backward compatibility and upgrade path;
- deprecation policy;
- support horizon for major releases.

### 15.4 Legal and Contracting Review
- IP ownership and licensing rights;
- subcontractor arrangements;
- hosting and data processing terms;
- financial liability structure;
- termination assistance.

---

## Appendix A - Glossary

| Term | Definition |
|---|---|
| Atomic Settlement | A settlement mechanism in which linked transfers occur simultaneously or not at all. |
| CBUAE | Central Bank of the United Arab Emirates. |
| Chainalysis | Blockchain analytics and compliance tooling provider referenced as part of Emirates NBD's current compliance landscape. |
| DALM Platform | For purposes of this RFP, the Digital Asset Lifecycle Management Platform being procured. |
| DFSA | Dubai Financial Services Authority. |
| DvP | Delivery versus Payment. |
| Euroclear D-FMI | Euroclear's digital financial market infrastructure environment relevant to digital securities processing. |
| HSM | Hardware Security Module. |
| MiCA | Markets in Crypto-Assets Regulation in the European Union. |
| NAV | Net Asset Value. |
| PvP | Payment versus Payment. |
| Shariah Compliance | Adherence to applicable Islamic finance principles and governance requirements. |
| Sukuk | Islamic financial certificates structured to comply with Shariah principles. |
| VARA | Dubai Virtual Assets Regulatory Authority. |

---

## Appendix B - Current Architecture Overview Placeholder

**Note:** The detailed current-state architecture pack will be shared only with shortlisted respondents under additional confidentiality controls.

At a high level, the current Emirates NBD environment relevant to this RFP includes the following architecture domains:

1. **Channel and Front-End Domain**
   - digital banking channels;
   - internal operations user interfaces;
   - issuer/investor reporting touchpoints.

2. **Enterprise Banking Domain**
   - customer onboarding and KYC systems;
   - core banking and account systems;
   - payments and treasury systems;
   - enterprise data and reporting platforms.

3. **Digital Asset Domain**
   - use-case-specific issuance workflows;
   - ledger/network interaction components;
   - compliance analytics tooling;
   - post-trade or market infrastructure connectivity.

4. **Control and Oversight Domain**
   - IAM and access governance;
   - SIEM / SOC monitoring;
   - internal audit evidence repositories;
   - risk and compliance tooling.

5. **External Connectivity Domain**
   - market infrastructure and venue connectivity;
   - blockchain analytics;
   - settlement partners;
   - regional and international counterparties.

Shortlisted vendors may be asked to map their proposed solution against this architecture view and identify all interfaces, data exchanges, security boundaries, and operational ownership points.

---

## Appendix C - SLA Template (Indicative)

The following service levels are indicative only and will be finalized during contract negotiations.

### C.1 Service Coverage
- Business-critical production support: 24x7 for Severity 1 and Severity 2 incidents
- Business-hours support: configurable for lower-severity issues
- Named service manager for Emirates NBD

### C.2 Incident Severity Definitions

| Severity | Description | Target Response | Target Restoration / Workaround |
|---|---|---:|---:|
| Severity 1 | Critical production outage or material inability to process high-priority digital asset activity | 15 minutes | 4 hours |
| Severity 2 | Major degradation affecting important functions with no acceptable workaround | 30 minutes | 8 hours |
| Severity 3 | Partial impairment with workaround available | 4 business hours | 3 business days |
| Severity 4 | Minor issue, query, or cosmetic defect | 1 business day | As agreed in release plan |

### C.3 Availability Targets

| Service Component | Indicative Target |
|---|---:|
| Core production platform availability | 99.9% monthly |
| API availability | 99.9% monthly |
| Reporting and dashboard services | 99.5% monthly |

### C.4 Maintenance Windows
- Planned maintenance to be notified at least 10 business days in advance
- Emergency maintenance to be communicated as soon as reasonably practicable
- Maintenance windows to minimize impact on agreed operating windows and market events

### C.5 Service Reporting
Vendor shall provide monthly service reporting including:

- incident summary;
- SLA performance;
- root cause analysis for major incidents;
- security events relevant to the service;
- capacity and performance trends;
- planned changes and release calendar.

### C.6 Escalation
Vendor shall provide an escalation matrix including operational, management, and executive contacts.

---

## Appendix D - Response Matrices Summary Template

Respondents should reproduce and complete the following summary structure in their submission.

### D.1 Functional Requirements Summary

| Requirement ID | Compliance Status | Delivery Method | Evidence Reference | Notes |
|---|---|---|---|---|
| FR-001 |  |  |  |  |
| FR-002 |  |  |  |  |
| ... |  |  |  |  |

### D.2 Technical Requirements Summary

| Requirement ID | Compliance Status | Delivery Method | Evidence Reference | Notes |
|---|---|---|---|---|
| TR-001 |  |  |  |  |
| TR-002 |  |  |  |  |
| ... |  |  |  |  |

### D.3 Compliance Requirements Summary

| Requirement ID | Compliance Status | Delivery Method | Evidence Reference | Notes |
|---|---|---|---|---|
| CR-001 |  |  |  |  |
| CR-002 |  |  |  |  |
| ... |  |  |  |  |

---

## Appendix E - Emirates NBD Proposal Declaration

The respondent shall include a signed declaration confirming that:

1. the proposal is accurate and complete to the best of its knowledge;
2. all compliance statements distinguish between current capability and roadmap capability;
3. all required third-party dependencies have been disclosed;
4. the respondent accepts the confidentiality conditions of this RFP;
5. the proposal remains valid for the stated validity period; and
6. the signatory is duly authorized to submit the proposal.

---

## Closing Statement

Emirates NBD is seeking a strategic platform partner capable of supporting the Bank's next stage of growth in digital assets with the discipline, control, and operational maturity required of a leading regional banking group.

This procurement is intended to identify a platform that can move Emirates NBD beyond isolated digital asset transactions toward a scalable operating model for regulated issuance, servicing, settlement, and oversight across multiple asset classes and regulatory contexts.

Respondents are encouraged to provide direct, evidence-based, and implementation-oriented proposals.

**End of RFP - ENBD-DA-RFP-2026-001**
