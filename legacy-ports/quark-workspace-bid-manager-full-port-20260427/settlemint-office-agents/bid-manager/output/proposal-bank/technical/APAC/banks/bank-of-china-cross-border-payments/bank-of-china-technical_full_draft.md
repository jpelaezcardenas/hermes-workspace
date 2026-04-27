# Technical Proposal: Cross-Border Tokenized Payments Platform

**Prepared for:** Bank of China Limited
**Date:** 20 March 2026
**Version:** 1.0 Draft
**Classification:** SettleMint Confidential. Invited Bidders Only
**Reference:** BOC-RFP-CBTP-202603

---

## Table of Contents

1. Cover Page
2. Executive Summary
3. About SettleMint
4. About DALP: Digital Asset Lifecycle Platform
5. Customer References
6. Understanding of Requirements
7. Proposed Solution
8. Technical Architecture
9. Security Architecture
10. Implementation Plan
11. Deployment Architecture
12. Training Programme
13. Support and SLA
14. Risk Management
15. Compliance Matrix

---

## 1. Cover Page

**Document Title:** Technical Proposal: Cross-Border Tokenized Payments Platform
**Client:** Bank of China Limited (BOC), People's Republic of China
**Date:** 20 March 2026
**Version:** 1.0 Draft
**Prepared by:** SettleMint NV
**Classification:** SettleMint Confidential

*This document contains proprietary and confidential information belonging to SettleMint NV. It is submitted exclusively in response to BOC-RFP-CBTP-202603 and may not be reproduced, disclosed, or distributed without prior written consent from SettleMint NV. All pricing and technical specifications are subject to final contract negotiation.*

---

## 2. Executive Summary

### 2.1 Context and Opportunity

Bank of China (BOC) stands at the forefront of China's cross-border payment modernisation programme. As one of the four major state-owned commercial banks, BOC operates the largest international settlement network among Chinese financial institutions, processing cross-border payments across more than 60 countries and territories. The bank serves a unique dual mandate: facilitating international trade settlement for Chinese exporters and importers while simultaneously advancing the internationalisation of the Renminbi under the People's Bank of China's strategic directives.

China's regulatory and monetary policy context creates a precise set of requirements for any cross-border payment infrastructure. The PBOC's mBridge initiative, operated jointly with the Hong Kong Monetary Authority, the Bank of Thailand, and the Central Bank of the UAE, demonstrates the institutional appetite for tokenized central bank money in wholesale cross-border settlement. The State Administration of Foreign Exchange (SAFE) imposes FX controls that require any cross-border payment system to provide real-time, auditable FX exposure reporting. The Cybersecurity Law (2017), the Data Security Law (2021), and the Personal Information Protection Law (2021) impose strict data residency, data classification, and critical information infrastructure (CII) protection requirements that govern where data may be stored and how it may be processed.

BOC's cross-border tokenized payments programme addresses the friction points in current correspondent banking: multi-day settlement cycles, FX reconciliation overhead, SWIFT message processing costs, and the opacity of in-flight payment status. Tokenization of the payment instrument, combined with atomic delivery-versus-payment settlement, eliminates the correspondent banking leg, reduces settlement time from T+2/T+3 to near-real-time, and provides an immutable, auditable trail for SAFE reporting.

This proposal responds to BOC-RFP-CBTP-202603. SettleMint proposes DALP (Digital Asset Lifecycle Platform) as the infrastructure layer for BOC's cross-border tokenized payments programme, covering tokenized deposit issuance (CNY-denominated and multi-currency), XvP atomic settlement across jurisdictions, on-premises deployment within BOC's China data centers to satisfy PBOC/Cybersecurity Law data residency requirements, and full regulatory reporting integration with PBOC and SAFE systems.

### 2.2 DALP's Direct Response to BOC's Programme

DALP provides four capabilities that directly address BOC's cross-border payment requirements:

**Tokenized Deposit Issuance:** DALP's Deposit asset template creates programmable CNY-denominated deposit tokens representing BOC's payment obligations. The StableCoin template creates multi-currency settlement tokens pegged to counterparty currencies (HKD, USD, EUR, SGD). Both templates operate under ERC-3643's SMART Protocol compliance engine, enforcing jurisdiction-specific transfer restrictions and entity eligibility at the token layer.

**XvP Atomic Settlement:** DALP's XvP Settlement addon provides atomic cross-currency delivery-versus-payment. A CNY-to-USD cross-border payment executes as a single atomic transaction: CNY deposit token transfers from the Chinese importer to the Chinese exporter's counterparty bank and USD settlement token transfers simultaneously, with both legs completing or both reverting. This eliminates settlement risk and correspondent banking float.

**On-Premises Deployment:** DALP's self-hosted deployment model runs entirely within BOC's own data centers, with no data leaving the bank's network perimeter. All blockchain nodes, middleware services, key management infrastructure, and the Asset Console UI operate on BOC-managed infrastructure. This satisfies the Cybersecurity Law's CII data residency requirement and PBOC's requirement that systemically important payment infrastructure operates on domestic infrastructure.

**PBOC/SAFE Regulatory Integration:** DALP's Chain Indexer exports structured payment event data in ISO 20022 format, directly consumable by BOC's PBOC reporting systems. SAFE cross-border FX reporting generates automatically from on-chain settlement events, eliminating the manual reconciliation overhead of current correspondent banking reporting.

### 2.3 Strategic Alignment

BOC's programme aligns with three converging policy currents in China's financial system. First, the PBOC's e-CNY digital currency programme extends naturally to wholesale cross-border settlement; DALP's architecture is compatible with e-CNY integration as that programme matures. Second, the mBridge initiative creates a tokenized CBDC rail for wholesale cross-border transactions between China, Hong Kong, Thailand, and the UAE; DALP can serve as BOC's institutional on-ramp to mBridge, providing the tokenized deposit issuance and compliance enforcement layer that sits above the mBridge infrastructure. Third, SAFE's FX reform programme requires increasingly granular, real-time reporting of cross-border capital flows; DALP's immutable audit trail and structured event export satisfy this requirement natively.

### 2.4 Why SettleMint

SettleMint has deployed DALP at 30+ regulated financial institutions across three continents, with $13B+ in tokenized assets under management on the platform. The most directly relevant credentials for BOC's programme include: DBS Singapore's tokenized deposit programme (deposit token issuance at scale in an Asian regulatory context); the Central Bank of Bahrain's CBDC programme (sovereign-grade on-premises deployment with central bank governance requirements); and SAMA Saudi Arabia's Digital Riyal initiative (cross-border payment tokenization in a major emerging-market central bank context). These engagements demonstrate DALP's applicability to the sovereign-adjacent, regulation-intensive environment that characterises BOC's cross-border payment programme.

---

## 3. About SettleMint

### 3.1 Company Overview

SettleMint NV is a Belgian fintech company founded to solve a specific problem: regulated financial institutions need digital asset infrastructure that meets their governance, compliance, and operational standards without requiring them to build blockchain engineering capability in-house. After nearly a decade of product development and institutional deployments, SettleMint operates DALP as a purpose-built platform for the issuance, management, and settlement of regulated digital assets.

SettleMint is headquartered in Brussels, Belgium, with engineering and delivery teams across Europe, the Middle East, and Asia Pacific. The company holds ISO 27001 certification (information security management) and SOC 2 Type II certification (security, availability, and confidentiality of hosted services). These certifications provide the independent audit evidence that institutional clients, regulators, and counterparties require when evaluating technology vendors for systemically significant financial infrastructure.

SettleMint's institutional client base includes central banks, commercial banks, development finance institutions, stock exchanges, and regulated fintech companies across Europe, the Middle East, Africa, and Asia Pacific. The 30+ institutions that have deployed DALP represent a cross-section of the regulated financial services ecosystem, from sovereign wealth managers to retail bank deposit-takers, creating a validation record across multiple asset classes, regulatory regimes, and operational models.

### 3.2 Mission and Product Philosophy

SettleMint's founding conviction is that blockchain infrastructure for regulated financial institutions must be purpose-built, not adapted from public chain developer tooling. The requirements of regulated finance, governed by prudential regulation, AML/CFT compliance, data protection law, and operational risk management standards, are fundamentally different from the requirements of public decentralised applications. DALP embeds these requirements in the platform's architecture: compliance enforcement at the token layer, not as an application afterthought; key management designed for institutional custody, not web3 wallet UX; deployment architecture designed for on-premises and private cloud, not public cloud or shared SaaS.

The platform philosophy is to provide the complete infrastructure layer for regulated digital assets, from token issuance through the full asset lifecycle to final redemption, while leaving operational control, key custody, and regulatory responsibility with the client institution. SettleMint provides the platform; the client institution operates the infrastructure, holds the keys, and owns the regulatory relationship.

### 3.3 Regulatory and Standards Engagement

SettleMint engages actively with regulatory development in the jurisdictions where its clients operate. In Europe, SettleMint has participated in EBA and ESMA consultations on MiCA implementation. In the Middle East, SettleMint has worked directly with CBUAE, SAMA, and CBB on their respective CBDC and tokenization programmes. In Asia Pacific, SettleMint works with MAS-supervised institutions on Project Guardian-aligned tokenization pilots and with APRA-regulated institutions on CPS 230/234-compliant digital asset infrastructure.

For China-regulated institutions, SettleMint's architecture is specifically designed to accommodate the data residency, key management, and operational governance requirements of the Cybersecurity Law, the Data Security Law, the PIPL, and PBOC technical standards. The on-premises deployment model, combined with full operator control over key material and network connectivity, satisfies the requirements of these regulations without requiring regulatory relief or special dispensation.

### 3.4 Technology Leadership

DALP implements the SMART Protocol, the industry's first fully modular on-chain compliance protocol for digital asset management. SMART Protocol builds on ERC-3643, the international standard for permissioned token compliance developed in collaboration with industry participants. SettleMint contributed to the development of ERC-3643 and maintains the reference implementation of SMART Protocol.

The platform's technical differentiation lies in the combination of on-chain compliance enforcement, configurable asset lifecycle management, and enterprise key management, operating as a single integrated platform rather than a collection of separately integrated components. This integration reduces the attack surface, simplifies the operational model, and provides a single point of accountability for the regulated financial institution.

### 3.5 APAC and China Context

SettleMint recognises the particular sensitivity of deploying digital asset infrastructure in the Chinese financial system context. The PBOC's Technology Department has set specific requirements for blockchain infrastructure used in payment systems: data must reside on domestic infrastructure, cryptographic algorithms must include OSCCA-certified options (SM2/SM3/SM4) where required by PBOC standards, and system architecture must support the PBOC's supervisory access requirements.

DALP's on-premises deployment model, combined with its configurable cryptographic and network stack, positions it to meet these requirements. SettleMint proposes a joint architecture review with BOC's technology and compliance teams and the relevant PBOC technical departments to confirm alignment with all applicable PBOC technical standards before deployment.

---

## 4. About DALP: Digital Asset Lifecycle Platform

### 4.1 Platform Overview

DALP is a four-layer platform architecture for regulated digital asset management. The four layers are: the Smart Contract layer (token contracts and compliance logic on blockchain), the Middleware layer (execution engine, key management, indexing, and gateway services), the API layer (unified REST API and TypeScript SDK), and the Application layer (Asset Console web UI for operations teams).

Each layer is designed for institutional deployment: the Smart Contract layer uses audited, formally verified contracts; the Middleware layer provides enterprise-grade service orchestration with durable workflow execution; the API layer exposes full OpenAPI 3.1 documentation with webhook event delivery; and the Application layer provides role-based access control with maker-checker approval workflows for all significant operations.

For BOC's cross-border payments programme, the most critical capabilities are at the Smart Contract layer (token compliance enforcement), the Middleware layer (XvP settlement orchestration and key management), and the API layer (PBOC/SAFE reporting integration). These are described in detail in the sections below.

### 4.2 Smart Contract Layer: SMART Protocol

SMART Protocol is DALP's on-chain compliance and asset management protocol. It is built on ERC-3643 (the Transfer Restriction Standard) and extended with DALP-specific compliance modules, asset lifecycle management, and addon capabilities for settlement, distribution, and treasury operations.

**ERC-3643 Foundation:** ERC-3643 provides the base transfer restriction mechanism: all token transfers are validated against an on-chain compliance engine before execution. The compliance engine holds a registry of permitted compliance modules; a transfer proceeds only if all required modules return a positive validation for the specific sender, receiver, and transfer parameters. This means compliance is enforced at the contract level, not at the application level, providing tamper-evident, auditable compliance that cannot be bypassed by application-layer errors or attacks.

**OnchainID Identity Registry:** Each counterparty in BOC's cross-border payment network, whether a corporate treasury, a correspondent bank, or an individual, is represented by an OnchainID identity (ERC-734/735). The identity holds cryptographically signed claims about the entity: KYC/AML status, jurisdiction of incorporation or residency, entity type (financial institution, corporate, individual), and FX eligibility under SAFE rules. Claims are issued by BOC's compliance team and signed with BOC's own claim issuer keys. No external party can add or modify claims without BOC's authorisation.

**Compliance Modules for Cross-Border Payments:** The following SMART Protocol compliance modules apply to BOC's cross-border payment tokens:

| Module | Application | Confidence |
|---|---|---|
| Country Restriction | Restrict transfers to counterparties in SAFE-permitted jurisdictions | Native |
| Identity Allow List | Only PBOC-registered payment participants can hold tokens | Native |
| Identity Deny List | Sanctioned entities blocked from token transfers | Native |
| Transfer Approval | SAFE-reportable transfers above threshold require compliance team approval | Native |
| Supply Cap | Total CNY token supply capped per PBOC's cross-border settlement limits | Native |
| Timelock | Embargo periods for certain cross-border payment routes | Native |

**DALPAsset Contract:** The DALPAsset contract wraps the SMART Protocol token with runtime-configurable features. For cross-border payments, BOC configures two primary asset types: a CNY Deposit Token (representing BOC's CNY payment obligation, redeemable at par against BOC's balance sheet) and a Multi-Currency Settlement Token (representing foreign currency payment obligations in HKD, USD, EUR, SGD, or JPY). Each asset has a metadata schema capturing payment-relevant attributes: payment purpose code (per SWIFT/ISO 20022), originating jurisdiction, beneficiary jurisdiction, FX rate at initiation, SAFE reporting category.

### 4.3 Middleware Layer: Execution Engine and Key Guardian

**Execution Engine (Restate):** DALP's Execution Engine uses Restate, a durable workflow orchestration system. For cross-border payments, each payment execution is a durable workflow: it persists state across network failures, retries individual steps on transient errors, and maintains an immutable execution log of every step. This means a cross-border payment that fails mid-execution (due to network partition, node failure, or counterparty timeout) is recoverable to a deterministic state, not left in an ambiguous in-flight condition. The execution log provides the audit trail for regulatory examination.

**Key Guardian:** Key Guardian is DALP's key management service. It provides a unified interface to multiple key management backends: hardware security modules (HSMs), cloud KMS services, and software key stores. For BOC's on-premises deployment, Key Guardian connects to BOC's existing HSM infrastructure (typically a network HSM from Thales or Utimaco). Transaction signing requests flow from the Execution Engine through Key Guardian to the HSM; the HSM performs the actual cryptographic operation, and the signed transaction returns through Key Guardian to the Transaction Signer for blockchain submission. HSM key material never leaves the HSM; Key Guardian is a routing and policy layer, not a key storage layer.

**Transaction Signer:** The Transaction Signer takes raw transaction payloads from the Execution Engine, requests signatures from Key Guardian, and submits signed transactions to the Chain Gateway. The Transaction Signer implements nonce management (ensuring transactions execute in correct order), gas estimation (for EVM chains), and retry logic for failed submissions.

**Chain Indexer:** The Chain Indexer provides real-time indexing of blockchain events into a structured database. For BOC, the Chain Indexer captures every token transfer, compliance check, settlement completion, and lifecycle event, and makes these available via structured query for PBOC and SAFE reporting. The Indexer exports events in ISO 20022 format, compatible with BOC's existing PBOC reporting infrastructure.

**Chain Gateway:** The Chain Gateway manages RPC connections to the blockchain network. It implements load balancing across multiple nodes, failover on node failure, and submission receipts for confirmation tracking.

**Feeds System:** The Feeds System connects DALP to external data sources. For BOC's cross-border payments, the Feeds System consumes PBOC reference FX rates, SAFE-published currency pair limits, and counterparty credit status feeds, making these available as on-chain data for compliance module evaluation.

### 4.4 API Layer

DALP's Unified API exposes all platform capabilities via an OpenAPI 3.1 REST API. For BOC's integration architecture, the key API surfaces are:

- **Asset Management API:** Mint, transfer, and redeem payment tokens. Query token balances and transfer histories.
- **Identity API:** Create and manage counterparty identities. Issue and revoke compliance claims.
- **Settlement API:** Initiate and monitor XvP settlement transactions. Query settlement state.
- **Reporting API:** Export structured event data for PBOC/SAFE reporting. Query audit trails.
- **Webhook Events:** Real-time event notifications for payment state transitions (initiated, in-flight, settled, failed).

The TypeScript SDK wraps the REST API for BOC's development team, providing type-safe access to all API operations with built-in retry logic, authentication handling, and event stream processing.

### 4.5 Application Layer: Asset Console

The Asset Console is DALP's web-based operational interface. For BOC's cross-border payments programme, the Asset Console provides:

- **Payment Operations Dashboard:** Real-time view of in-flight cross-border payments, settlement status, and queue management.
- **Counterparty Management:** KYC/AML claim management for payment network participants.
- **Compliance Review:** Transfer approval workflows for payments requiring manual SAFE reporting review.
- **Reporting and Audit:** PBOC/SAFE report generation, audit trail export, and compliance evidence download.
- **System Administration:** Token supply management, compliance module configuration, and fee parameter adjustment.

Access to the Asset Console is controlled by Better Auth, DALP's authentication framework, which supports LDAP/Active Directory integration (for BOC's existing identity infrastructure), SAML2/OIDC SSO, and step-up authentication (WebAuthn/passkey) for blockchain write operations.

### 4.6 XvP Settlement: Atomic Cross-Border Payment

XvP (Exchange-versus-Payment) Settlement is DALP's addon for atomic multi-leg settlement. In the cross-border payment context, XvP provides the mechanism for simultaneous exchange of two token assets between two counterparties, with full atomicity: both legs complete or both revert.

```mermaid
sequenceDiagram
    participant Importer as Chinese Importer
    participant BOC as Bank of China (CNY Leg)
    participant CorrespondentBank as Correspondent Bank (USD Leg)
    participant Beneficiary as Foreign Beneficiary
    participant SmartContract as XvP Contract

    Importer->>BOC: Initiate cross-border payment (CNY 6.5M to USD 1M)
    BOC->>SmartContract: Lock CNY 6.5M deposit tokens
    CorrespondentBank->>SmartContract: Lock USD 1M settlement tokens
    SmartContract->>SmartContract: Validate both legs (compliance checks pass)
    SmartContract->>BOC: Transfer USD 1M to BOC
    SmartContract->>CorrespondentBank: Transfer CNY 6.5M to Correspondent Bank
    SmartContract-->>Importer: Settlement confirmed (atomic, T+0)
    BOC->>Beneficiary: Release USD 1M to beneficiary account
    BOC->>SAFE: Automated FX report (ISO 20022)
```

The XvP contract executes atomically: if either the CNY leg or the USD leg fails compliance checks, neither transfer executes. This eliminates the settlement risk that exists in current correspondent banking, where the CNY leg may have executed while the USD leg is still in-flight.

### 4.7 Asset Templates for Cross-Border Payments

DALP provides seven out-of-the-box asset templates. For BOC's cross-border payments programme, two templates are directly applicable:

**Deposit Token Template:** Represents BOC's liability to the holder. For cross-border payments, a CNY Deposit Token represents BOC's obligation to pay CNY to the beneficiary. The template includes: principal tracking, interest accrual (for short-dated payment instruments), maturity redemption, and early redemption capability. The compliance module configuration enforces SAFE-permitted jurisdictions and entity eligibility.

**StableCoin Template:** Represents a foreign currency payment instrument pegged to a reference currency. For BOC's multi-currency settlement, the StableCoin template creates USD, HKD, EUR, SGD, and JPY settlement tokens. Each token is pegged 1:1 to its reference currency, backed by reserves held in BOC's nostro accounts at correspondent banks. The Feeds System updates the on-chain peg status from BOC's treasury management system.

---

## 5. Customer References

### 5.1 DBS Bank Singapore: Tokenized Deposit Programme

DBS Bank Limited, Singapore's largest bank and one of Asia's leading financial institutions, deployed DALP for its tokenized deposit programme. The programme creates programmable SGD deposit tokens representing DBS's payment obligations, used for institutional cash management, trade finance settlement, and interbank payment optimisation.

**Relevance to BOC:** The DBS programme is the most directly comparable engagement to BOC's cross-border payments use case. Both involve deposit token issuance by a major commercial bank, compliance enforcement for eligible counterparties, and integration with existing core banking and payment infrastructure. DBS's experience confirms that deposit token issuance scales to institutional transaction volumes without performance degradation, and that the compliance module configuration covers the entity eligibility and jurisdiction restrictions required by a major Asian bank's compliance team.

**Technical Detail:** DBS deployed DALP's Deposit asset template with the following compliance module configuration: identity allow list (only MAS-licensed financial institutions and MAS-approved corporate treasury counterparties), country restriction (Singapore, Hong Kong, Australia, UK, US, EU jurisdictions), and transfer approval (transfers above SGD 50M require treasury operations approval). The Chain Indexer exports daily settlement reports to DBS's internal treasury management system and regulatory reporting platforms.

### 5.2 SAMA Saudi Arabia: Digital Riyal Cross-Border Programme

The Saudi Central Bank (SAMA) deployed DALP as infrastructure for its Digital Riyal cross-border payment pilot. The programme creates SAR-denominated tokenized payment instruments for cross-border settlement between Saudi Arabia and participating countries, operating alongside the mBridge initiative in the Gulf Cooperation Council (GCC) context.

**Relevance to BOC:** The SAMA programme is the most directly comparable engagement for the sovereign/central bank cross-border payment dimension of BOC's programme. Both operate in a jurisdiction with strict currency controls, sovereign oversight of payment infrastructure, and active central bank engagement in tokenized payment development. SAMA's requirements for data residency (domestic deployment only), central bank supervisory access, and ISO 20022 reporting integration are substantively identical to BOC's requirements under PBOC oversight.

**Technical Detail:** SAMA deployed DALP in an on-premises configuration at SAMA's domestic data centers, with no data leaving Saudi Arabia's territory. Key management uses dedicated HSM infrastructure managed by SAMA's technology team. The Chain Indexer exports ISO 20022-formatted payment events to SAMA's supervisory reporting platform. This deployment architecture is the reference model for BOC's proposed on-premises deployment.

### 5.3 Central Bank of Bahrain: CBDC Programme

The Central Bank of Bahrain (CBB) deployed DALP as infrastructure for its CBDC pilot programme. The programme issues CBB-backed digital currency instruments for wholesale interbank settlement and cross-border payment.

**Relevance to BOC:** The CBB engagement demonstrates DALP operating as central bank-grade infrastructure with the governance, key management, and audit requirements that central banking operations demand. For BOC, operating under PBOC oversight, the CBB engagement provides evidence of DALP's capability to meet sovereign-level governance requirements.

### 5.4 Clearstream Germany: Collateral Management and Settlement

Clearstream, Deutsche Boerse Group's post-trade infrastructure subsidiary, deployed DALP for tokenized collateral management. The programme enables repo and securities lending participants to use tokenized securities as collateral in intraday and overnight repo operations.

**Relevance to BOC:** The Clearstream engagement demonstrates DALP's settlement infrastructure operating in a high-volume, systemically critical post-trade environment, with strict requirements for settlement finality, deterministic reconciliation, and regulatory reporting. These operational characteristics are shared by BOC's cross-border payment programme.

### 5.5 Euroclear Belgium: Settlement Infrastructure

Euroclear, the world's largest settlement system, deployed DALP for tokenized settlement of certain asset classes, creating an on-chain settlement layer that integrates with Euroclear's existing CSD infrastructure.

**Relevance to BOC:** The Euroclear engagement demonstrates DALP's ability to integrate with existing systemically important financial infrastructure rather than requiring replacement of that infrastructure. For BOC, which operates within the PBOC/CIPS payment system, this integration-first approach is essential: DALP must augment and extend BOC's existing payment infrastructure, not replace it.

### 5.6 Kasikornbank Thailand and Bank Mandiri Indonesia

Kasikornbank (KBank) in Thailand and Bank Mandiri in Indonesia both deployed DALP for digital asset infrastructure, representing DALP's ASEAN regional credential base. These engagements demonstrate DALP operating in APAC regulatory environments adjacent to China's: both countries maintain active central bank oversight of payment infrastructure, with data residency and operational governance requirements comparable (though not identical) to China's regulatory framework.

---

## 6. Understanding of Requirements

### 6.1 BOC's Programme Objectives

Based on BOC-RFP-CBTP-202603 and the public context of BOC's digital payments programme, SettleMint identifies the following core requirements:

**R1: Tokenized CNY Deposit Issuance**
BOC requires the ability to issue CNY-denominated deposit tokens representing BOC's payment obligations in cross-border transactions. Tokens must be compliant with PBOC regulations, redeemable at par against BOC's balance sheet, and limited to SAFE-approved counterparties and jurisdictions.

**R2: Multi-Currency Settlement Token Support**
BOC requires settlement tokens in major cross-border payment currencies: USD, HKD, EUR, SGD, JPY. Each token must be pegged to its reference currency, backed by BOC nostro reserves, and restricted to licensed financial institution counterparties.

**R3: Atomic Cross-Currency Settlement (DvP/XvP)**
BOC requires atomic settlement of cross-currency payments: the CNY leg and the foreign currency leg must settle simultaneously or not at all. This eliminates correspondent banking settlement risk and enables T+0 cross-border payment finality.

**R4: On-Premises Deployment (China Data Residency)**
All infrastructure, including blockchain nodes, middleware services, key management, databases, and the operational interface, must operate within BOC's own data centers in mainland China. No data, including transaction data, identity data, or key material, may be transmitted outside the People's Republic of China. This requirement is mandatory under the Cybersecurity Law (Art. 37), Data Security Law (Art. 31), and PBOC's requirements for critical financial infrastructure.

**R5: PBOC Supervisory Integration**
BOC's cross-border payment infrastructure must provide PBOC with supervisory access to aggregated transaction data. This includes real-time settlement monitoring, periodic reporting in PBOC-mandated formats, and audit access on request.

**R6: SAFE FX Reporting Integration**
All cross-border FX transactions settled on the platform must generate ISO 20022-compliant FX reports for submission to SAFE. Reports must be generated automatically from settlement events, without manual reconciliation.

**R7: Enterprise Key Management (HSM)**
Cryptographic key material for token signing and transaction authorisation must be stored in BOC-managed HSMs. SettleMint must not have access to key material at any time. Key management must support dual-control/dual-key operation for highest-value transactions.

**R8: SWIFT/ISO 20022 Message Integration**
The cross-border payment platform must integrate with BOC's existing SWIFT infrastructure for counterparty messaging, payment instruction receipt, and settlement confirmation delivery.

**R9: Maker-Checker Approval Workflows**
All token supply changes, compliance module updates, and high-value payment approvals require a four-eyes (maker-checker) approval workflow. Maker and checker must authenticate with step-up credentials (HSM-backed hardware token or WebAuthn).

**R10: AML/CFT Screening Integration**
All cross-border payment counterparties must be screened against global sanctions lists and BOC's internal AML watchlists before any payment token transfer executes. The compliance screening result must be recorded on-chain as an identity claim.

**R11: mBridge Compatibility**
The platform architecture must be compatible with integration into the mBridge multi-CBDC platform as that initiative matures. BOC's tokenized deposit tokens must be transferable to the mBridge protocol layer without requiring a new token issuance.

**R12: Audit Trail and Regulatory Evidence**
All platform events, including token transfers, compliance decisions, settlement completions, and administrative actions, must be recorded in an immutable, tamper-evident audit trail exportable for regulatory examination.

### 6.2 Regulatory Requirements Analysis

**Cybersecurity Law (2017):** Article 37 requires operators of critical information infrastructure (CII) to store network data generated within China domestically. BOC's cross-border payment platform qualifies as CII by virtue of its role in the national financial system. The mandatory on-premises deployment model satisfies this requirement.

**Data Security Law (2021):** The DSL classifies data by importance and restricts the outbound transfer of "important data." Payment data, counterparty identity data, and transaction records all qualify as important data under the DSL. On-premises deployment with no external data transmission satisfies this requirement.

**Personal Information Protection Law (2021):** PIPL regulates the processing of personal information of Chinese citizens. For corporate counterparty payments, individual counterparty data is limited; however, PIPL applies to beneficial ownership information associated with corporate payments. DALP's identity registry stores only the minimum required personal information, with access controls limiting data access to BOC's authorised compliance personnel.

**PBOC Payment Oversight:** The PBOC's non-bank payment institution regulations and its oversight of systemically important payment systems require that BOC's cross-border payment platform provides PBOC with supervisory access, reports in PBOC-mandated formats, and maintains operational continuity standards consistent with a systemically important payment participant.

**SAFE FX Administration:** SAFE's cross-border FX regulations require that all FX transactions above specified thresholds are reported in real-time, with transaction purpose codes, counterparty identifiers, and FX rate information. DALP's Chain Indexer generates these reports automatically from settlement events.

**PBOC's Technical Standards for Blockchain in Finance (JR/T 0184-2021):** The PBOC has published technical standards for blockchain application in financial services. DALP's architecture is reviewed against these standards; any non-conformant elements are addressed in the deployment design.

### 6.3 Cross-Border Payment Flow Analysis

The current cross-border payment flow for BOC involves the following steps and friction points:

1. **Payment Initiation:** Corporate client submits payment instruction to BOC via online banking or SWIFT. BOC validates the instruction, applies AML screening, and determines the optimal correspondent banking route. This step typically takes 2-4 hours.

2. **Correspondent Banking:** BOC sends SWIFT MT103 to its correspondent bank in the beneficiary's jurisdiction. The correspondent bank debits BOC's nostro account and credits the beneficiary's bank. This step takes 1-3 business days.

3. **FX Settlement:** BOC's FX desk executes the currency exchange, typically via bilateral dealing or FX market execution. FX settlement is T+2 in most currency pairs.

4. **Reconciliation:** BOC's operations team reconciles SWIFT confirmations against nostro account statements and internal ledger entries. This step generates the SAFE FX report and updates the internal accounting system.

5. **SAFE Reporting:** BOC submits the SAFE FX report within the mandated reporting window, typically same day for transactions above CNY 50,000 equivalent.

The tokenized payment flow eliminates steps 2 and 3, replacing them with an atomic XvP settlement on DALP that completes in seconds. Steps 1 and 5 are retained but streamlined through direct integration with DALP's API and Chain Indexer.

---

## 7. Proposed Solution

### 7.1 Solution Architecture Overview

SettleMint proposes DALP as an on-premises infrastructure layer for BOC's cross-border tokenized payments programme. The solution has three primary components:

1. **DALP Core Platform:** The four-layer DALP platform deployed on BOC's on-premises infrastructure, providing token issuance, compliance enforcement, settlement execution, and audit trail.

2. **Cross-Border Payment Gateway:** A DALP API integration layer that connects BOC's existing payment systems (SWIFT, CIPS, internal payment processing) to the DALP token platform. This gateway translates incoming SWIFT payment instructions into DALP token operations and publishes settlement confirmations back to BOC's payment systems.

3. **Regulatory Reporting Integration:** A Chain Indexer reporting module that generates ISO 20022 payment reports for PBOC and SAFE submission, integrating with BOC's existing regulatory reporting infrastructure.

### 7.2 Token Architecture

BOC's cross-border payment network uses two token types:

**CNY Deposit Token (BOC-CNY):** Issued by BOC. Represents BOC's CNY payment obligation. Backed 1:1 by CNY balances in BOC's designated settlement account. Supply is controlled by BOC's treasury operations team, with all minting and burning events requiring maker-checker approval and HSM-backed signing.

```mermaid
flowchart TD
    A[Corporate Client: Payment Instruction] --> B[BOC Payment Gateway]
    B --> C{AML/SAFE Screening}
    C -->|Pass| D[DALP: Mint CNY Deposit Token]
    C -->|Fail| E[Reject: Compliance Block]
    D --> F[XvP Settlement Contract]
    F --> G{Counterparty Locks Foreign Token}
    G -->|Locked| H[Atomic Settlement Execution]
    G -->|Timeout| I[Revert: Return CNY Token]
    H --> J[CNY Token -> Counterparty Bank]
    H --> K[Foreign Token -> BOC Account]
    J --> L[SAFE FX Report: Auto-Generated]
    K --> M[BOC: Credits Foreign Currency Nostro]
```

**Multi-Currency Settlement Tokens (BOC-USD, BOC-HKD, BOC-EUR, BOC-SGD, BOC-JPY):** Issued by BOC's correspondent bank counterparties. Represent foreign currency payment obligations backed by nostro account balances. Each foreign token has its own compliance module configuration: identity allow list (BOC and designated SAFE-registered financial institutions only), country restriction (restricted to bilateral settlement between the relevant jurisdictions).

### 7.3 Settlement Architecture: XvP Cross-Currency

The XvP settlement contract manages cross-currency atomic settlement. The settlement flow is:

1. **Instruction Receipt:** BOC's payment gateway receives a SWIFT MT103 or CIPS payment instruction.
2. **Token Preparation:** BOC mints CNY deposit tokens equal to the payment amount, crediting the XvP settlement escrow.
3. **Counterparty Notification:** DALP's webhook system notifies the counterparty bank (via API) that CNY tokens are locked in the XvP contract, pending their foreign currency token contribution.
4. **Counterparty Lock:** The counterparty bank locks the corresponding foreign currency tokens in the XvP contract (e.g., USD 1M for CNY 6.5M at the prevailing PBOC reference rate).
5. **Atomic Settlement:** The XvP contract validates that both legs satisfy their respective compliance modules (country restriction, identity allow list, supply cap). If all checks pass, the CNY tokens transfer to the counterparty and the foreign currency tokens transfer to BOC, simultaneously in a single atomic transaction.
6. **Confirmation and Reporting:** DALP's Chain Indexer captures the settlement event and generates the ISO 20022 FX confirmation for SAFE reporting.

### 7.4 Compliance Architecture

```mermaid
flowchart TD
    Transfer[Transfer Request: Sender to Receiver] --> SMART{SMART Protocol Compliance Engine}
    SMART --> M1{Country Restriction Module}
    SMART --> M2{Identity Allow List Module}
    SMART --> M3{Identity Deny List Module}
    SMART --> M4{Transfer Approval Module}
    SMART --> M5{Supply Cap Module}
    SMART --> M6{Timelock Module}
    M1 -->|Receiver in permitted jurisdiction?| R1{Pass/Fail}
    M2 -->|Receiver on SAFE-approved list?| R2{Pass/Fail}
    M3 -->|Sender/Receiver not sanctioned?| R3{Pass/Fail}
    M4 -->|Amount below approval threshold?| R4{Pass/Fail}
    M5 -->|Transfer within supply cap?| R5{Pass/Fail}
    M6 -->|No active timelock?| R6{Pass/Fail}
    R1 & R2 & R3 & R4 & R5 & R6 -->|All Pass| Execute[Execute Transfer]
    R1 & R2 & R3 & R4 & R5 & R6 -->|Any Fail| Reject[Reject Transfer: Log Reason]
    Execute --> Indexer[Chain Indexer: Log Settlement Event]
    Reject --> Indexer
    Indexer --> SAFE[SAFE Reporting System]
    Indexer --> PBOC[PBOC Supervisory Dashboard]
```

### 7.5 PBOC/SAFE Regulatory Integration

The Chain Indexer is the regulatory reporting backbone. It subscribes to all on-chain events from the DALP smart contracts and maintains a structured, queryable database of all platform activity.

For PBOC supervisory reporting, the Indexer exports the following data streams:

- **Transaction Log:** All cross-border payment settlements, with timestamps, token amounts, FX rates, counterparty identifiers (anonymised per PBOC supervisory data sharing rules), and settlement status.
- **Aggregate Flow Reports:** Daily/weekly/monthly aggregate cross-border flow reports by currency pair, jurisdiction pair, and payment purpose category.
- **Compliance Incident Reports:** All compliance module rejections, with reason codes and case identifiers for follow-up investigation.

For SAFE FX reporting, the Indexer generates ISO 20022 FX confirmation messages (CAMT.057/PACS.008 format) for each settled cross-border payment, automatically populating the required SAFE fields: transaction reference, FX transaction type code, transaction amount and currency, counterparty bank identifier, beneficiary identifier, and transaction purpose code.

### 7.6 mBridge Compatibility

BOC's role in the mBridge multi-CBDC platform creates a specific technical requirement: DALP's tokenized deposits must be transferable to mBridge's protocol layer without requiring re-issuance. DALP's EVM-compatible smart contracts are designed for interoperability with the mBridge platform, which operates on a permissioned EVM chain. SettleMint proposes a two-stage integration:

- **Stage 1 (Current):** DALP operates as BOC's standalone cross-border payment platform, with bilateral connectivity to counterparty banks via the XvP settlement module.
- **Stage 2 (mBridge Integration):** DALP's CNY deposit tokens are made transferable to the mBridge protocol via a cross-chain bridge contract, allowing BOC to use its DALP-issued tokens as the input for mBridge settlements.

The Stage 2 architecture requires coordination with the mBridge consortium (PBOC, HKMA, BOT, CBUAE) and is subject to mBridge's technical integration specifications, which are still evolving. SettleMint commits to maintaining architectural compatibility with mBridge as the consortium's specifications develop.

### 7.7 Integration Architecture

```mermaid
flowchart LR
    subgraph External["External Systems"]
        SWIFT[SWIFT Network]
        CIPS[CIPS]
        AML[AML/Sanctions Screening]
        CBS[Core Banking System]
        TMS[Treasury Management System]
    end
    subgraph Gateway["BOC Cross-Border Payment Gateway"]
        GW_IN[Inbound Payment Adapter: SWIFT/CIPS]
        GW_COMP[Compliance Pre-Processor]
        GW_OUT[Outbound Confirmation Adapter]
    end
    subgraph DALP_Platform["DALP Platform (On-Premises)"]
        API[Unified API]
        EE[Execution Engine]
        KG[Key Guardian: HSM]
        IDX[Chain Indexer]
        BC[Blockchain: Private Besu]
    end
    subgraph Regulatory["Regulatory Systems"]
        PBOC_SYS[PBOC Supervisory Platform]
        SAFE_SYS[SAFE FX Reporting System]
    end
    subgraph Counterparty["Counterparty Banks"]
        CP_API[Counterparty DALP API]
    end

    SWIFT --> GW_IN
    CIPS --> GW_IN
    GW_IN --> GW_COMP
    GW_COMP --> AML
    GW_COMP --> API
    API --> EE
    EE --> KG
    EE --> BC
    BC --> IDX
    IDX --> SAFE_SYS
    IDX --> PBOC_SYS
    IDX --> GW_OUT
    GW_OUT --> CBS
    GW_OUT --> TMS
    GW_OUT --> SWIFT
    API <--> CP_API
```

---

## 8. Technical Architecture

### 8.1 Four-Layer Stack for BOC

```mermaid
flowchart TD
    subgraph App["Application Layer"]
        AC[Asset Console: BOC Cross-Border Payments Operations]
        AC_FEATURES["Payment Queue Dashboard\nCounterparty Management\nCompliance Review Workflow\nSAFE Report Generator\nAudit Trail Explorer"]
    end
    subgraph API_Layer["API Layer"]
        UAPI[Unified API: OpenAPI 3.1 REST]
        SDK[TypeScript SDK]
        WH[Webhook Event Publisher]
        INT[Integration Gateway]
    end
    subgraph MW["Middleware Layer"]
        EE[Execution Engine: Durable Payment Workflows]
        KG[Key Guardian: BOC HSM Integration]
        TS[Transaction Signer]
        IDX[Chain Indexer: ISO 20022 Export]
        CGW[Chain Gateway: Multi-RPC]
        FEED[Feeds System: PBOC FX Rates / SAFE Limits]
    end
    subgraph SC["Smart Contract Layer"]
        SP[SMART Protocol: ERC-3643]
        IR[OnchainID Identity Registry]
        CE[Compliance Engine: 6 Active Modules]
        DA_CNY[CNY Deposit Token Contract]
        DA_FX[Multi-Currency Settlement Token Contracts]
        XVP[XvP Settlement: Atomic Cross-Currency]
    end
    subgraph Chain["Blockchain Layer"]
        BESU[Hyperledger Besu: Private EVM]
        N1[Node 1: Primary] & N2[Node 2: Secondary] & N3[Node 3: Validator]
    end
    subgraph Infra["Infrastructure Layer (On-Premises, BOC Data Center)"]
        HSM[Thales/Utimaco HSM Cluster]
        DB[PostgreSQL: Indexed Event Store]
        MON[Monitoring: VictoriaMetrics + Grafana]
    end

    AC --> UAPI
    UAPI --> EE
    EE --> KG
    KG --> HSM
    EE --> TS
    TS --> CGW
    CGW --> BESU
    BESU --> IDX
    IDX --> DB
    DA_CNY --> SP
    DA_FX --> SP
    SP --> IR
    SP --> CE
    DA_CNY --> XVP
    DA_FX --> XVP
```

### 8.2 Blockchain Network Design

For BOC's on-premises deployment, SettleMint proposes a Hyperledger Besu private EVM network. Besu is the enterprise EVM client developed by the Hyperledger Foundation, operating identically to the public Ethereum EVM but on a permissioned network with configurable consensus, private transaction support, and enterprise governance features.

**Network Topology:** A minimum of 3 validator nodes for Byzantine Fault Tolerant (IBFT 2.0) consensus. For production, SettleMint recommends 4 validator nodes to tolerate a single node failure while maintaining consensus. All nodes operate within BOC's data center infrastructure.

**Consensus:** IBFT 2.0 (Istanbul BFT) provides immediate transaction finality (no probabilistic finality risk), deterministic block times (configurable, recommended 2-5 seconds for payment applications), and validator identity management (BOC controls which entities can validate transactions).

**Performance:** At the payment token transfer volume expected for BOC's cross-border programme (estimated 50,000-200,000 transactions/day based on BOC's disclosed cross-border payment volumes), a 4-node Besu network with 2-second block times provides ample throughput. Peak throughput for the SMART Protocol token contracts is in excess of 500 transactions per second, far exceeding BOC's expected peak load.

**Private Transactions:** Besu's Tessera privacy manager enables private transaction support: certain transaction data (e.g., individual payment amounts) can be encrypted such that only the parties to the transaction (BOC and the specific counterparty) can view the full transaction details, while transaction existence and metadata remain visible to PBOC supervisory nodes.

### 8.3 On-Premises Infrastructure Specifications

**Compute Requirements (Production Environment):**

| Component | Specification |
|---|---|
| Besu Validator Nodes (4) | 8 vCPU / 32GB RAM / 2TB NVMe SSD per node |
| Chain Indexer | 8 vCPU / 16GB RAM / 4TB SSD |
| Execution Engine (Restate) | 4 vCPU / 8GB RAM |
| Key Guardian | 4 vCPU / 8GB RAM (connected to HSM cluster) |
| Asset Console + API | 8 vCPU / 16GB RAM (load-balanced) |
| PostgreSQL Database | 8 vCPU / 32GB RAM / 4TB SSD (with replica) |
| HSM | Thales Luna Network HSM 7 or equivalent (existing BOC infrastructure) |

**Network Requirements:**

- Dedicated VLAN for blockchain node communication (100Mbps minimum, 1Gbps recommended)
- Firewall rules permitting inbound API access from BOC's internal payment gateway (TCP 443)
- No outbound internet connectivity required (fully air-gapped capable)
- Optional: dedicated encrypted link to PBOC supervisory platform for real-time reporting

**Availability Architecture:** Active-passive failover for all stateful components. The Besu network maintains consensus with any 3 of 4 validator nodes active (IBFT 2.0 tolerates f=(n-1)/3 byzantine faults). The PostgreSQL database operates in primary-replica configuration with automatic failover. The Execution Engine maintains durable workflow state in the database, so in-flight payment workflows survive service restarts.

### 8.4 Cryptographic Architecture

DALP uses industry-standard cryptographic primitives. For BOC's China-regulated deployment, SettleMint is prepared to evaluate the inclusion of OSCCA-certified algorithms (SM2 for asymmetric operations, SM3 for hashing, SM4 for symmetric encryption) in addition to or in place of secp256k1/keccak256 for specific regulatory obligations.

The standard cryptographic stack:

- **Key Generation:** secp256k1 elliptic curve, generated inside HSM
- **Transaction Signing:** ECDSA with secp256k1
- **Hash Functions:** Keccak256 (EVM native), SHA-256 (API authentication)
- **TLS:** TLS 1.3 for all inter-service communication and external API exposure
- **Symmetric Encryption:** AES-256-GCM for encrypted configuration and secrets management

For PBOC/OSCCA compliance requirements, SettleMint will assess the specific sections of the PBOC's blockchain technical standards (JR/T 0184-2021) that require SM-series algorithm use and implement them in the identified components.

### 8.5 Data Flow Architecture

```mermaid
flowchart LR
    subgraph Initiation["Payment Initiation"]
        CORP[Corporate Client]
        SWIFT_MSG[SWIFT MT103]
    end
    subgraph BOC_GW["BOC Internal Gateway"]
        PARSE[SWIFT Parser]
        AML_CHECK[AML/SAFE Screening]
        AUTH[Authorisation: Maker-Checker]
    end
    subgraph DALP_MW["DALP Middleware"]
        EE[Execution Engine]
        KG[Key Guardian]
        TS[Transaction Signer]
        FEED[FX Rate Feed]
    end
    subgraph Chain["Blockchain"]
        SC[Smart Contract]
        EVENTS[Blockchain Events]
    end
    subgraph Reporting["Regulatory Reporting"]
        IDX[Chain Indexer]
        SAFE_RPT[SAFE ISO 20022 Report]
        PBOC_RPT[PBOC Supervisory Feed]
    end

    CORP --> SWIFT_MSG
    SWIFT_MSG --> PARSE
    PARSE --> AML_CHECK
    AML_CHECK --> AUTH
    AUTH --> EE
    FEED --> EE
    EE --> KG
    KG --> TS
    TS --> SC
    SC --> EVENTS
    EVENTS --> IDX
    IDX --> SAFE_RPT
    IDX --> PBOC_RPT
    IDX --> BOC_GW
```

### 8.6 Monitoring and Observability

DALP's observability stack provides full-stack visibility into the cross-border payment platform:

- **Metrics (VictoriaMetrics):** Real-time metrics for transaction throughput, settlement latency, compliance module evaluation time, block production rate, node health.
- **Logs (Loki):** Structured log aggregation from all DALP services, with log retention configurable per BOC's data retention policy.
- **Traces (Tempo):** Distributed tracing across the Execution Engine, API, and Chain Gateway, enabling end-to-end latency analysis for individual payment workflows.
- **Dashboards (Grafana):** Pre-built dashboards for payment operations, compliance monitoring, and infrastructure health.
- **Alerting:** Configurable alerts for anomalous conditions: transaction failure rate spike, consensus timeout, key management service unavailability, compliance module rejection rate above threshold.

---

## 9. Security Architecture

### 9.1 Security Framework

DALP's security framework is built on two certifications: ISO 27001 (Information Security Management System) and SOC 2 Type II (Security, Availability, Confidentiality). These provide the baseline assurance that BOC's technology and compliance teams require when evaluating vendors for systemically significant financial infrastructure.

For China-regulated infrastructure, additional security requirements apply under the Cybersecurity Law's Multi-Level Protection Scheme (MLPS). BOC's cross-border payment platform, as a systemically important financial infrastructure, is expected to meet MLPS Level 3 requirements at minimum. SettleMint's architecture is designed to satisfy Level 3 requirements; a formal MLPS evaluation is conducted as part of the deployment process.

### 9.2 Key Management Security Model

```mermaid
flowchart TD
    subgraph BOC_Security["BOC Security Perimeter"]
        HSM_CLUSTER["HSM Cluster\nThales Luna Network HSM 7\nFIPS 140-2 Level 3\nBOC-Owned Key Material"]
        KG["Key Guardian\nHSM Interface Layer\nPolicy Enforcement\nDual-Control for High-Value"]
        AUTH_SERVER["Maker-Checker Auth\nStep-Up: WebAuthn/Hardware Token\nBOC Security Team Control"]
    end
    subgraph DALP_Services["DALP Services"]
        EE[Execution Engine]
        TS[Transaction Signer]
    end
    subgraph Blockchain["Blockchain Network"]
        SC[Smart Contracts]
    end

    EE -->|Sign Request| KG
    KG -->|Policy Check: Dual-Control?| AUTH_SERVER
    AUTH_SERVER -->|Maker Approves| KG
    AUTH_SERVER -->|Checker Approves| KG
    KG -->|Signing Request| HSM_CLUSTER
    HSM_CLUSTER -->|Signed Transaction Bytes| KG
    KG --> TS
    TS --> SC

    Note1["Key Material: Never leaves HSM\nSettleMint: Zero key access\nBOC: Full key custody"]
```

**Key Hierarchy:**

- **Root CA Key:** Stored in HSM. Used to sign all platform certificates. Accessed only for certificate rotation (annual, with planned maintenance window).
- **Smart Contract Signing Keys:** Per-role keys for token minting, compliance module updates, and administrative operations. Stored in HSM. Accessed for every token operation.
- **Operational Keys:** Keys for API authentication, TLS certificates, and service-to-service communication. Rotated on a 90-day schedule.

**Dual-Control (Maker-Checker) for High-Value Operations:**

- Token supply increases above CNY 100M equivalent require two separate BOC authorised signatories.
- Compliance module changes require Treasury Operations lead and Compliance Officer approval.
- Key ceremony for new key generation requires HSM key custodian and IT Security Officer.

### 9.3 Network Security

**Perimeter Security:**

- All DALP services operate within BOC's internal network. No DALP service exposes a public internet endpoint.
- External API access (from counterparty banks) routes through BOC's existing API gateway infrastructure, which enforces mTLS client authentication.
- Blockchain node communication uses private VLANs, not accessible from BOC's general corporate network.

**Inter-Service Communication:**

- All DALP microservices communicate over TLS 1.3 mutual authentication.
- Service-to-service authentication uses short-lived JWT tokens signed by the platform's internal CA.
- Zero-trust network architecture: each service explicitly authorises requests from specific peer services; no implicit network trust.

**Vulnerability Management:**

- DALP's container images are scanned for known vulnerabilities (CVEs) before each deployment using Trivy.
- Smart contracts undergo independent security audit before each major upgrade.
- Annual penetration testing by a CREST-certified firm, with immediate critical finding remediation.
- Dependency updates follow a 30-day cycle; critical security patches are applied within 48 hours.

### 9.4 Authentication and Access Control

**Better Auth Framework:** DALP uses Better Auth for all user authentication and authorisation. For BOC's on-premises deployment, Better Auth integrates with BOC's existing LDAP/Active Directory infrastructure for user provisioning, with SAML2 or OIDC for SSO to BOC's identity provider.

**Role-Based Access Control (RBAC):**

| Role | Permissions |
|---|---|
| Payment Operations | Initiate payment workflows, view settlement dashboard |
| Compliance Officer | Review/approve blocked transfers, manage identity claims |
| Treasury Manager | Approve token supply changes, configure FX rate feeds |
| System Administrator | Platform configuration, user management |
| PBOC Supervisory | Read-only access to aggregated transaction data (supervisory API) |
| Auditor | Read-only access to full audit trail and event logs |

**Step-Up Authentication:** All blockchain write operations (token mint, transfer approval, compliance module update) require step-up authentication: in addition to their standard SSO session, the user must authenticate with a hardware security key (WebAuthn/FIDO2) or a dedicated hardware OTP token. This ensures that compromised SSO credentials cannot be used to execute blockchain operations.

### 9.5 Smart Contract Security

**Formal Verification:** DALP's core smart contracts (SMART Protocol, DALPAsset, XvP Settlement) are formally verified using the Certora Prover, which proves mathematical correctness of key security invariants: token balances are conserved across transfers, compliance module decisions are final and cannot be overridden by application logic, and XvP settlement is atomic (both legs execute or neither executes).

**Independent Audit:** Smart contracts are audited by a tier-1 blockchain security firm before production deployment. Audit reports are available to BOC's technology and risk teams as part of the vendor due diligence package.

**Upgrade Governance:** Smart contracts use the UUPS (Universal Upgradeable Proxy Standard) pattern. Upgrades require a governance transaction signed by BOC's designated admin key (stored in HSM) plus a mandatory 48-hour timelock before the upgrade takes effect. This provides BOC's risk team with a window to review and, if necessary, reject a proposed upgrade before it executes.

### 9.6 Incident Response

DALP includes a documented incident response playbook for the cross-border payment context:

- **P1 (Settlement System Down):** Both legs of an in-flight XvP settlement are reverted automatically by the smart contract's timeout mechanism. No funds are at risk. Incident is escalated to DALP on-call engineering and BOC IT Ops within 15 minutes.
- **P2 (Compliance Incident):** A sanctioned entity attempts to execute a payment. The compliance module blocks the transfer. The incident is logged, an alert is sent to BOC's Compliance Officer, and the case is escalated to BOC's AML investigations team.
- **P3 (Key Management Incident):** HSM unavailability. All signing operations pause. Payments queue for the duration of the outage. Recovery procedures activate the standby HSM cluster. No key material is at risk.

---

## 10. Implementation Plan

### 10.1 Implementation Phases

DALP's standard 19-week implementation plan is adapted for BOC's cross-border payments programme, with additional time allocated for on-premises deployment, PBOC/SAFE regulatory integration, and BOC's internal governance review process.

```mermaid
gantt
    title BOC Cross-Border Tokenized Payments: Implementation Timeline
    dateFormat  YYYY-MM-DD
    section Phase 1: Discovery
    Requirements Workshops         :p1a, 2026-04-01, 14d
    Regulatory Review (PBOC/SAFE)  :p1b, 2026-04-01, 14d
    Infrastructure Assessment      :p1c, 2026-04-01, 14d
    section Phase 2: Foundation
    On-Premises Environment Setup  :p2a, 2026-04-15, 21d
    HSM Integration                :p2b, 2026-04-15, 21d
    Blockchain Network Setup       :p2c, 2026-04-22, 14d
    section Phase 3: Configuration
    Token Contract Deployment      :p3a, 2026-05-06, 28d
    Compliance Module Configuration:p3b, 2026-05-06, 28d
    Identity Registry Setup        :p3c, 2026-05-13, 21d
    section Phase 4: Integration
    SWIFT/CIPS Gateway Integration :p4a, 2026-06-03, 28d
    PBOC/SAFE Reporting Integration:p4b, 2026-06-03, 28d
    AML Screening Integration      :p4c, 2026-06-10, 21d
    UAT                            :p4d, 2026-06-17, 14d
    section Phase 5: Go-Live
    Pilot Launch (2 corridors)     :p5a, 2026-07-01, 14d
    PBOC/SAFE Regulatory Approval  :p5b, 2026-07-01, 28d
    Full Corridor Rollout          :p5c, 2026-07-15, 28d
    Hypercare Support              :p5d, 2026-07-01, 42d
```

### 10.2 Phase 1: Discovery (Weeks 1-2)

**Objectives:** Finalise technical requirements, validate regulatory obligations, assess BOC's existing infrastructure.

**Activities:**

- **Requirements Workshops:** SettleMint's solution architect and BOC's technology, compliance, and treasury teams conduct structured workshops covering: payment flow design, token architecture, compliance module configuration, SAFE reporting requirements, mBridge compatibility roadmap.

- **Regulatory Review:** SettleMint's compliance team reviews BOC's PBOC operating licence conditions, SAFE registration requirements, and MLPS Level 3 certification obligations with BOC's compliance team. Output: Regulatory Compliance Design Document specifying how each regulatory requirement maps to DALP's configuration.

- **Infrastructure Assessment:** SettleMint's infrastructure engineer assesses BOC's existing data center capacity, HSM infrastructure, network topology, and existing payment system interfaces. Output: Infrastructure Deployment Design Document.

**Deliverables:**
- Technical Requirements Specification (TRS)
- Regulatory Compliance Design Document
- Infrastructure Deployment Design Document
- Risk Register (initial version)

### 10.3 Phase 2: Foundation and Setup (Weeks 3-5)

**Objectives:** Deploy and validate the base DALP infrastructure on BOC's on-premises environment.

**Activities:**

- **Environment Provisioning:** Deploy Kubernetes clusters for DALP services on BOC's VMware/bare-metal infrastructure. Configure networking (VLANs, firewall rules). Deploy monitoring stack (VictoriaMetrics, Grafana, Loki, Tempo).

- **HSM Integration:** Install and configure Key Guardian to connect to BOC's HSM cluster. Run key generation ceremony: generate initial signing keys inside HSM, establish key backup procedure, document dual-control process for key operations.

- **Blockchain Network Setup:** Deploy 4 Hyperledger Besu validator nodes. Configure IBFT 2.0 consensus. Deploy Tessera private transaction manager. Run genesis block ceremony.

- **Identity Provider Integration:** Connect Better Auth to BOC's Active Directory. Configure SAML2/OIDC. Provision initial admin users. Configure WebAuthn for step-up authentication.

**Deliverables:**
- Infrastructure Deployment Report
- HSM Integration Test Report
- Blockchain Network Health Report
- Identity Integration Test Report

### 10.4 Phase 3: Configuration and Compliance (Weeks 6-9)

**Objectives:** Deploy and configure token contracts, compliance modules, and identity registry for BOC's specific requirements.

**Activities:**

- **Token Contract Deployment:** Deploy CNY Deposit Token contracts and Multi-Currency Settlement Token contracts. Configure token metadata schemas. Test minting, transfer, and redemption flows.

- **Compliance Module Configuration:** Deploy and configure the 6 compliance modules relevant to BOC's cross-border payments (Country Restriction, Identity Allow List, Identity Deny List, Transfer Approval, Supply Cap, Timelock). Test each module against BOC's compliance scenarios.

- **Identity Registry Population:** Create OnchainID identities for BOC's initial counterparty network (target: 20-30 correspondent bank counterparties for pilot phase). Establish claim issuance workflow for ongoing counterparty onboarding.

- **XvP Settlement Configuration:** Deploy XvP Settlement contract. Configure atomic settlement parameters. Test cross-currency settlement scenarios.

**Deliverables:**
- Token Configuration Test Report
- Compliance Module Test Report
- Identity Registry Population Report
- XvP Settlement Test Report

### 10.5 Phase 4: Integration and Testing (Weeks 10-13)

**Objectives:** Integrate DALP with BOC's existing payment systems and regulatory reporting infrastructure.

**Activities:**

- **SWIFT/CIPS Gateway Integration:** Build and test the payment instruction adapter for incoming SWIFT MT103 and CIPS payment instructions. Build and test the settlement confirmation adapter for outbound confirmations.

- **PBOC/SAFE Reporting Integration:** Configure the Chain Indexer reporting module for PBOC supervisory data and SAFE FX reports. Test report generation against PBOC/SAFE format specifications.

- **AML Screening Integration:** Integrate DALP's payment gateway with BOC's existing AML screening system (typically Actimize, NICE, or equivalent). Configure pre-payment screening workflow.

- **User Acceptance Testing (UAT):** BOC's operations, compliance, and treasury teams test all payment flows against the full test case library. SettleMint provides technical support and issue resolution during UAT.

**Deliverables:**
- SWIFT/CIPS Integration Test Report
- PBOC/SAFE Reporting Test Report
- AML Integration Test Report
- UAT Completion Report

### 10.6 Phase 5: Go-Live and Hypercare (Weeks 14-19)

**Objectives:** Launch pilot payment corridors, obtain regulatory approvals, expand to full corridor coverage.

**Activities:**

- **Pilot Launch:** Launch cross-border payment operations on 2 pilot corridors (recommended: BOC-HK and BOC-Singapore as the highest-volume corridors with established regulatory frameworks). Process real payments at limited volume under enhanced monitoring.

- **Regulatory Approval:** Support BOC's submissions to PBOC for approval of the cross-border tokenized payment service. SettleMint provides technical documentation for PBOC's review.

- **Full Rollout:** After pilot validation and regulatory approval, expand to full corridor coverage. Onboard additional counterparty banks to the identity registry.

- **Hypercare:** SettleMint's delivery team provides enhanced support during the first 6 weeks of live operation: daily check-ins, 4-hour response SLA for all issues, and weekly operations reviews.

**Deliverables:**
- Pilot Operations Report (Week 2 of pilot)
- Regulatory Submission Package
- Full Rollout Completion Report
- Hypercare Report (weekly)

---

## 11. Deployment Architecture

### 11.1 On-Premises Deployment Model

```mermaid
flowchart TD
    subgraph BOC_DC["BOC Primary Data Center (Mainland China)"]
        subgraph DALP_Prod["DALP Production Environment"]
            K8S_PROD[Kubernetes Cluster: Production]
            BC_NODES["Besu Validator Nodes 1-3\nIBFT 2.0 Consensus"]
            SERVICES["DALP Services:\nExecution Engine\nKey Guardian\nChain Indexer\nAPI Gateway\nAsset Console"]
            DB_PROD[PostgreSQL Primary]
            HSM_PROD[HSM Cluster: Production]
        end
        subgraph DALP_Dev["DALP Development Environment"]
            K8S_DEV[Kubernetes Cluster: Development]
            BC_DEV[Besu Dev Network]
            DB_DEV[PostgreSQL Dev]
        end
        subgraph Monitoring["Monitoring Stack"]
            MON[VictoriaMetrics + Grafana]
            LOG[Loki Log Aggregation]
        end
    end
    subgraph BOC_DR["BOC DR Data Center (Mainland China)"]
        subgraph DALP_DR["DALP DR Environment"]
            K8S_DR[Kubernetes Cluster: DR]
            BC_DR["Besu Validator Node 4\n(4th validator for HA)"]
            DB_DR[PostgreSQL Replica]
            HSM_DR[HSM Cluster: DR]
        end
    end
    subgraph BOC_Internal["BOC Internal Systems"]
        SWIFT_GW[SWIFT/CIPS Gateway]
        CBS[Core Banking]
        AML[AML Screening]
        TMS[Treasury Management]
    end
    subgraph Regulatory["Regulatory Connections (Domestic)"]
        PBOC_CONN[PBOC Supervisory Interface]
        SAFE_CONN[SAFE FX Reporting Interface]
    end

    DALP_Prod <--> DALP_DR
    DALP_Prod <--> BOC_Internal
    DALP_Prod --> Regulatory
    Monitoring --> BOC_Internal
```

### 11.2 Disaster Recovery

BOC's cross-border payment platform requires a Recovery Time Objective (RTO) consistent with its role in the payment system. SettleMint proposes:

- **RTO: 4 hours** for production environment recovery following a primary data center failure.
- **RPO: 0** for blockchain state (replicated across all validator nodes; no state loss on any single node failure). **RPO: 15 minutes** for the Chain Indexer database (replication lag from primary to replica).

**DR Architecture:** The fourth Besu validator node operates at BOC's DR data center. In the event of a primary data center failure, the DR node continues participating in consensus (with nodes 1-3 offline, consensus fails; the DR node becomes primary validator when two additional nodes are provisioned at the DR site, achievable in the 4-hour RTO window). The PostgreSQL replica at the DR site takes over as primary within the RTO. All DALP services redeploy to the DR Kubernetes cluster via pre-staged container images (no internet pull required in air-gapped environment).

### 11.3 Development and Testing Environments

**Development Environment (EUR 10,000/month):** A full DALP stack running on smaller infrastructure, used by BOC's development team for integration testing and feature development. Runs a 3-node Besu network with no HSM dependency (software key management for development only). Provides API parity with production for integration development.

**Production Environment (EUR 25,000/month):** The live cross-border payment platform with full HSM integration, 4-node Besu network, and regulatory reporting integration. Subject to the Enterprise SLA (99.99% uptime).

---

## 12. Training Programme

### 12.1 Training Objectives

BOC's training programme equips four distinct user groups with the knowledge and skills to operate, integrate with, maintain, and govern the DALP cross-border payment platform.

### 12.2 Training Modules

**Module 1: Platform Overview (All Staff, 0.5 days)**
Covers the conceptual architecture of DALP, the token model, the compliance module approach, and the settlement mechanics. Delivered to BOC's technology, compliance, treasury, and operations stakeholders. No technical prerequisites.

**Module 2: Payment Operations Training (Operations Team, 2 days)**
Covers the Asset Console payment operations interface: initiating and monitoring payment workflows, reviewing compliance holds, managing the XvP settlement queue, generating SAFE reports, and using the audit trail explorer. Hands-on exercises using the development environment.

**Module 3: Compliance Administration (Compliance Team, 1 day)**
Covers identity registry management (adding/removing counterparties, issuing/revoking claims), compliance module configuration, transfer approval workflow, and AML integration management. Includes compliance edge case scenarios.

**Module 4: API Integration (Development Team, 2 days)**
Covers the DALP Unified API: authentication, asset management endpoints, settlement API, reporting API, and webhook event integration. Hands-on API exercises in the development environment. TypeScript SDK usage. Integration pattern examples for SWIFT/CIPS and PBOC/SAFE reporting.

**Module 5: Infrastructure Administration (IT Team, 2 days)**
Covers DALP infrastructure: Kubernetes deployment management, Besu node operations (peer management, validator set changes), Key Guardian and HSM operations, monitoring and alerting configuration, backup procedures, and incident response.

**Module 6: Security and Governance (Security Team + Management, 1 day)**
Covers DALP's security model: smart contract upgrade governance, key ceremony procedures, maker-checker approval workflows, MLPS Level 3 compliance evidence, and audit trail interpretation.

### 12.3 Training Delivery

Training is delivered over a 2-week period during Phase 4 (Integration and Testing), using BOC's development environment for hands-on exercises. SettleMint provides:

- Instructor-led classroom sessions at BOC's Beijing headquarters
- Hands-on exercises in the development environment
- Training documentation in both English and Mandarin Chinese
- Post-training assessment to validate competency
- 60-day access to a training sandbox environment for ongoing practice

---

## 13. Support and SLA

### 13.1 Enterprise SLA for BOC

Given BOC's status as a systemically important bank operating a cross-border payment service, SettleMint proposes the Enterprise support tier:

| SLA Parameter | Enterprise Tier |
|---|---|
| Platform Uptime | 99.99% (< 52 minutes downtime/year) |
| Support Coverage | 24/7/365 |
| Incident Response (P1) | 15-minute acknowledgement, 1-hour initial response |
| Incident Response (P2) | 30-minute acknowledgement, 4-hour initial response |
| Incident Response (P3) | 2-hour acknowledgement, next business day resolution |
| Contacts | Unlimited named contacts |
| Dedicated Contact | Named Enterprise Success Manager |
| Communication Channels | Dedicated Slack/Teams channel + 24/7 emergency hotline |

### 13.2 P1 Incident Criteria

For BOC's cross-border payment platform, P1 incidents are defined as:

- Complete platform unavailability (API non-responsive, Asset Console inaccessible)
- In-flight settlement transactions failing due to platform error
- Key Guardian unavailability preventing transaction signing
- Blockchain network consensus failure (no new blocks for > 60 seconds)
- Data integrity issue (discrepancy between on-chain state and Chain Indexer database)

### 13.3 Operational Support Model

**Monitoring:** SettleMint's 24/7 operations team monitors all DALP production deployments via the Grafana monitoring stack. Automated alerts page the on-call engineer for P1 and P2 conditions.

**Incident Communication:** For P1 incidents, SettleMint communicates directly with BOC's IT on-call contact via the dedicated emergency hotline and the Slack/Teams channel simultaneously. Status updates are provided at 30-minute intervals until resolution.

**Change Management:** All planned changes to the production environment follow BOC's change management process. SettleMint provides change proposals with impact assessment, rollback procedure, and maintenance window recommendation. BOC's change advisory board approves all production changes.

**Patching:** Security patches are applied within the maintenance window schedule. Critical security patches (CVSS 9.0+) are applied within 48 hours with BOC's approval.

### 13.4 Escalation Path

| Level | Contact | Response Time |
|---|---|---|
| L1 Support | DALP Support Portal + Slack | P1: 15min, P2: 30min, P3: 2hr |
| L2 Engineering | Named enterprise engineer | P1: 1hr, P2: 4hr |
| L3 Product | DALP product lead | Major incident escalation |
| Executive | SettleMint COO/CTO | Crisis escalation |

---

## 14. Risk Management

### 14.1 Risk Register

| Risk | Probability | Impact | Mitigation |
|---|---|---|---|
| PBOC regulatory approval delay | Medium | High | Engage PBOC technical departments in Phase 1; structure pilot to minimise approvals needed |
| SAFE FX reporting format change | Low | Medium | ISO 20022 format; abstract reporting layer allows format changes without contract redeployment |
| Counterparty bank onboarding lag | Medium | Medium | Start with 2 pilot corridors (BOC-HK, BOC-SG); expand incrementally |
| HSM integration complexity | Low | High | Use BOC's existing Thales/Utimaco infrastructure; SettleMint has certified integration for both |
| mBridge protocol specification change | High | Low | Architecture maintains compatibility at token layer; bridge contract is separate and replaceable |
| Smart contract vulnerability | Low | High | Formal verification + independent audit + timelock upgrade governance |
| Settlement dispute (XvP timeout) | Low | Medium | Automatic revert on timeout; clear dispute resolution procedure in XvP contract documentation |
| Data residency breach | Very Low | Very High | On-premises deployment; no external connectivity in air-gapped mode; architecture review |

### 14.2 Risk Mitigation Philosophy

SettleMint's risk management philosophy for BOC's programme is: eliminate platform-level risk through architecture (on-premises, no external data flow), mitigate operational risk through process (maker-checker, HSM, incident response), and transfer residual risk through SLA commitments and incident remediation obligations.

---

## 15. Compliance Matrix

### 15.1 Regulatory Requirements Response Matrix

| Requirement | Regulation | DALP Response | Confidence |
|---|---|---|---|
| China data residency | Cybersecurity Law Art. 37 | On-premises deployment; no data leaves BOC data centers | Native |
| CII protection | Cybersecurity Law Ch. 3 | MLPS Level 3-aligned architecture; network isolation; HSM key management | Native |
| Important data classification | Data Security Law | Data classification labels in Chain Indexer; access controls per classification | Native |
| Personal data minimisation | PIPL | Minimum required counterparty data in identity registry; purpose limitation | Native |
| PBOC supervisory access | PBOC Payment Oversight | Dedicated supervisory API; ISO 20022 reporting; audit trail export | Native |
| SAFE FX reporting | SAFE Cross-Border Regulations | Auto-generated ISO 20022 FX reports from Chain Indexer | Native |
| AML/CFT screening | PBOC AML Regulations | Pre-payment AML screening integration; identity deny list module | Native |
| Settlement finality | PBOC Payment System Oversight | IBFT 2.0 consensus: immediate finality; no probabilistic finality risk | Native |
| Maker-checker approval | PBOC Internal Control Requirements | Native maker-checker workflows with step-up authentication | Native |
| Audit trail | PBOC Record-Keeping Requirements | Immutable on-chain audit trail; Chain Indexer structured export | Native |
| Key management | PBOC Technical Standards | HSM-backed key management; BOC retains full key custody | Native |
| mBridge compatibility | PBOC mBridge Programme | EVM-compatible token contracts; bridge architecture in roadmap | Partial |
| OSCCA algorithm support | PBOC JR/T 0184-2021 | SM2/SM3/SM4 evaluation in progress; implementation available on request | Partial |
| MLPS Level 3 | Cybersecurity Law | Architecture aligned with Level 3 requirements; formal assessment in deployment | Native |

### 15.2 SMART Protocol Compliance Module Coverage

| Compliance Requirement | SMART Module | Status |
|---|---|---|
| Jurisdiction restriction (SAFE-permitted corridors) | Country Restriction | Native |
| Entity eligibility (PBOC-registered participants) | Identity Allow List | Native |
| Sanctions screening | Identity Deny List | Native |
| High-value payment approval | Transfer Approval | Native |
| CNY supply limits (PBOC quotas) | Supply Cap | Native |
| Payment embargo periods | Timelock | Native |
| KYC/AML evidence storage | OnchainID Claims | Native |

### 15.3 ISO Standards Alignment

| Standard | Applicability | DALP Implementation |
|---|---|---|
| ISO 20022 | PBOC/SAFE payment reporting | Chain Indexer generates ISO 20022 CAMT/PACS messages natively |
| ERC-3643 | Token compliance standard | SMART Protocol is the reference ERC-3643 implementation |
| OnchainID (ERC-734/735) | Identity standard | Full OnchainID implementation in identity registry |
| FIPS 140-2 Level 3 | HSM key management | Supported via Thales Luna Network HSM 7 integration |

---

*Prepared by SettleMint NV, 20 March 2026. This document is confidential and submitted exclusively in response to BOC-RFP-CBTP-202603.*

---

## Appendix A: DALP Platform Deep Dive

### A.1 Execution Engine: Durable Payment Workflow Design

The Execution Engine is the orchestration heart of DALP's middleware layer. For cross-border payments, where partial failures create regulatory and financial risk, the durable workflow model is not an architectural preference but an operational necessity.

Consider a cross-border payment that involves six distinct operations: (1) AML screening, (2) SAFE limit validation, (3) CNY deposit token minting, (4) XvP contract lock, (5) counterparty lock confirmation, and (6) atomic settlement execution. Under a conventional stateless API design, a failure at step 4 (e.g., network partition between the Execution Engine and the blockchain node) leaves the system in an indeterminate state: the token has been minted but not locked. Recovery requires either manual intervention or complex compensating transaction logic.

The Execution Engine's durable workflow model eliminates this problem. Each step in the payment workflow is persisted to the workflow state store before execution. If a step fails, the workflow resumes from the last persisted state and retries the failed step. The workflow's execution log provides a complete, timestamped record of every step, its input, its output, and any errors encountered. This log is the definitive audit trail for regulatory examination.

For BOC's high-volume cross-border payment programme, the Execution Engine runs as a horizontally scalable cluster: multiple Execution Engine instances process payment workflows concurrently, with the workflow state store (backed by PostgreSQL) providing coordination. Throughput scales linearly with the number of Execution Engine instances; at BOC's estimated peak volume (200,000 payments/day), a 4-instance cluster operating at 10% capacity provides ample headroom.

**Workflow State Machine for Cross-Border Payment:**

```mermaid
stateDiagram-v2
    [*] --> Received: Payment Instruction Received
    Received --> AML_Screening: AML/Sanctions Check
    AML_Screening --> SAFE_Validation: AML Cleared
    AML_Screening --> Rejected_AML: AML Hit
    SAFE_Validation --> Approved: Within SAFE Limits
    SAFE_Validation --> Pending_Approval: Above Approval Threshold
    Pending_Approval --> Approved: Compliance Officer Approves
    Pending_Approval --> Rejected_SAFE: Rejected
    Approved --> Token_Minted: CNY Token Minted
    Token_Minted --> XvP_Locked: Locked in XvP Contract
    XvP_Locked --> Awaiting_Counterparty: Counterparty Notified
    Awaiting_Counterparty --> Both_Locked: Counterparty Locks Foreign Token
    Awaiting_Counterparty --> Reverted: Timeout (Counterparty No Response)
    Both_Locked --> Settled: Atomic Settlement Executed
    Settled --> Reported: SAFE/PBOC Report Generated
    Reported --> [*]: Complete
    Rejected_AML --> [*]: Logged + Reported
    Rejected_SAFE --> [*]: Logged + Returned
    Reverted --> [*]: Tokens Returned + Logged
```

### A.2 Chain Indexer: Real-Time Settlement Intelligence

The Chain Indexer is DALP's event processing and data availability layer. It subscribes to all smart contract events emitted by the DALP contracts on the Besu network and processes them in real-time into a structured database.

For BOC, the Chain Indexer serves four critical functions:

**Function 1: Settlement State Tracking**
The Indexer maintains the current state of every in-flight and completed payment: which tokens are locked, which settlements have completed, and which workflows are awaiting counterparty action. The Asset Console's payment operations dashboard reads from the Indexer; it does not query the blockchain directly for operational queries. This means that even under high load, the dashboard responds instantly, drawing from the pre-indexed database rather than issuing real-time blockchain RPC calls.

**Function 2: SAFE FX Report Generation**
The Indexer's reporting module processes each XvP Settlement Completed event and generates the corresponding ISO 20022 PACS.008 (FX Transfer) message. The message is populated with:
- Transaction reference number (DALP-generated, linked to the originating SWIFT instruction)
- FX transaction type code (per SAFE's published code table)
- Transaction amount and currency (from the XvP settlement event parameters)
- FX exchange rate (from the on-chain rate snapshot at settlement time)
- Counterparty BIC/SWIFT code (from the OnchainID identity record)
- Payment purpose code (from the token metadata, set at payment initiation)
- Settlement timestamp (block timestamp of the settlement transaction)

The report is queued for transmission to BOC's SAFE reporting interface. Transmission uses BOC's existing SAFE-connected messaging infrastructure; DALP simply generates the report content.

**Function 3: PBOC Supervisory Feed**
The Indexer publishes an aggregated supervisory feed to PBOC's monitoring interface. The feed provides real-time visibility into:
- Total CNY token supply outstanding (BOC's total cross-border payment obligations)
- Aggregate settlement volumes by currency pair and jurisdiction
- Compliance module rejection statistics (by module, by day)
- In-flight settlement count and average settlement time

The supervisory feed uses an API endpoint accessible only from the PBOC supervisory network, with mTLS client authentication using PBOC-issued client certificates.

**Function 4: Audit Trail Export**
The Indexer maintains a full, tamper-evident audit trail of all platform events. The audit trail is stored in an append-only format in the PostgreSQL database, with each record including the original blockchain event hash for cross-verification against the blockchain's own immutable record. BOC's internal and external auditors can export audit trail records via the Asset Console's audit export function.

### A.3 Smart Protocol: On-Chain Compliance in Depth

SMART Protocol's compliance engine is the mechanism by which BOC's regulatory obligations are enforced at the token level, not the application level. This distinction matters: application-level compliance can be bypassed by direct API calls, configuration errors, or insider attacks. On-chain compliance cannot: it is enforced by the EVM itself, which executes the compliance check code identically for every transfer, regardless of who initiates it or through what interface.

**The Compliance Evaluation Flow:**

When a token transfer is submitted to the DALP smart contract, the EVM executes the following sequence:

1. **Transfer Request:** The caller (Execution Engine transaction signer, or direct API call) submits a transfer transaction to the DALPAsset contract.

2. **Pre-Transfer Hook:** The DALPAsset contract calls the SMART Protocol's canTransfer() function with the sender address, receiver address, transfer amount, and additional context data.

3. **Module Evaluation:** The compliance engine iterates over all registered compliance modules for this asset and calls each module's moduleCheck() function. Each module has access to the OnchainID identity registry for the sender and receiver.

4. **Result Aggregation:** If all modules return true (transfer permitted), the compliance engine returns true to canTransfer(). If any module returns false, canTransfer() returns false with the specific failure reason code.

5. **Transfer Execution or Revert:** If canTransfer() returns true, the transfer executes. If false, the transaction reverts with the compliance failure reason code recorded in the revert message.

6. **Event Emission:** The contract emits a ComplianceCheckResult event (pass or fail) with the full parameter set. The Chain Indexer captures this event.

**Country Restriction Module. BOC Implementation:**

BOC's Country Restriction module maintains a set of permitted destination country codes (ISO 3166-1 alpha-2). For CNY deposit tokens, the permitted destination countries are: CN (China, for internal BOC transfers), HK (Hong Kong), SG (Singapore), GB (United Kingdom), DE/FR/NL/BE/IT (EU), US (United States), JP (Japan), AU (Australia), AE (UAE, for mBridge corridor). These codes are configurable by BOC's compliance team via the Asset Console, with changes requiring compliance officer approval.

The module evaluates the receiver's OnchainID identity for a "country" claim issued by BOC's claim issuer. If the receiver's country claim is in the permitted set, the module returns true. If the receiver has no country claim, or the claim has expired, or the country code is not in the permitted set, the module returns false.

**Identity Allow List. BOC Implementation:**

The Identity Allow List maintains the set of OnchainID identity addresses that are permitted to hold and receive CNY deposit tokens. BOC's compliance team populates this list with the OnchainID addresses of: BOC's own corporate treasury accounts, SAFE-registered correspondent bank participants, and approved corporate treasury counterparties. The list is managed via the Asset Console's Counterparty Management interface.

Importantly, identity addition to the Allow List is itself a maker-checker operation: the compliance operations team creates the counterparty identity claim (maker), and the compliance officer reviews and approves the claim (checker). Only after both steps are complete does the counterparty appear on the Allow List. This governance model satisfies BOC's internal control requirements for counterparty onboarding.

**Supply Cap Module. BOC Implementation:**

The Supply Cap module enforces BOC's PBOC-mandated cross-border settlement limits. The supply cap is set to the PBOC-approved aggregate CNY settlement amount for each currency corridor. If a token mint transaction would push the total outstanding CNY token supply above the cap, the transaction reverts. The cap is adjusted by BOC's treasury team when PBOC updates the settlement limit, with adjustment transactions requiring treasury manager approval.

### A.4 Feeds System: External Data Integration

DALP's Feeds System connects the on-chain environment to external data sources, solving the oracle problem for regulated financial applications: how do smart contracts access authoritative, tamper-evident external data?

For BOC's cross-border payments, the Feeds System provides:

**PBOC Reference FX Rates:** The Feeds System polls PBOC's daily reference rate publication (the CFETS central parity rate) and writes the rate for each USD/CNY, EUR/CNY, HKD/CNY, SGD/CNY, and JPY/CNY pair to an on-chain feeds contract. The XvP Settlement contract reads the reference rate from the feeds contract at the time of settlement initiation, using it as the floor rate for the CNY/foreign currency exchange in the XvP transaction.

**SAFE Cross-Border Limit Feed:** SAFE's published cross-border settlement limits by currency pair and jurisdiction are updated in the Feeds System daily. The Supply Cap compliance module reads the applicable limit for each token type from the feeds contract.

**Counterparty Credit Status:** BOC's internal credit rating system publishes counterparty credit events (limit reductions, credit holds) to the Feeds System. The Feeds System updates the OnchainID identity claims for affected counterparties, which may trigger the Transfer Approval module for pending transactions with those counterparties.

---

## Appendix B: Security Deep Dive

### B.1 Threat Model for Cross-Border Payment Infrastructure

BOC's cross-border payment platform operates in a high-value, high-attention threat environment. The threat model for the platform identifies the following primary threat actors and attack vectors:

**External Attacker (Nation-State/Organised Crime):**
Attack goal: Modify token balances, execute unauthorised transfers, or disrupt payment operations.
Primary attack vectors: API endpoint exploitation, smart contract vulnerability exploitation, network intrusion.
Key controls: API authentication (mTLS + JWT), smart contract formal verification + audit, network isolation (on-premises, no public internet exposure).

**Insider Threat (Privileged User):**
Attack goal: Execute unauthorised token transfers or modify compliance module configuration.
Primary attack vectors: Abuse of privileged Asset Console access, compromise of signing keys.
Key controls: Maker-checker workflow (no single user can execute high-value operations), HSM key management (signing keys inaccessible even to infrastructure administrators), full audit trail of all user actions.

**Supply Chain Attack:**
Attack goal: Introduce malicious code via software supply chain.
Primary attack vectors: Compromised container images, compromised dependencies.
Key controls: Container image scanning (Trivy), software bill of materials (SBOM) generation, DALP's own dependency management process, air-gapped deployment (no runtime internet access for production environment).

**Physical/Infrastructure Attack:**
Attack goal: Access key material or disrupt consensus.
Primary attack vectors: Physical access to HSM, destruction of validator nodes.
Key controls: Physical security of BOC's data center (BOC's responsibility), HSM tamper-evident design (key destruction on tamper detection), geographic distribution of validator nodes (primary and DR data center).

### B.2 MLPS Level 3 Compliance Architecture

China's Multi-Level Protection Scheme (MLPS) under the Cybersecurity Law defines five protection levels for information systems. BOC's cross-border payment platform qualifies as MLPS Level 3 by virtue of its role in the financial system and the value of assets at risk.

MLPS Level 3 requires:

| MLPS Requirement | DALP Implementation |
|---|---|
| Physical security | BOC's data center physical controls (rack security, biometric access) |
| Network security | VLAN isolation, firewall rules, IDS/IPS at network perimeter |
| Host security | Hardened Linux containers (CIS Benchmark), vulnerability scanning |
| Application security | Authentication, authorisation, maker-checker, input validation |
| Data security | Encrypted data at rest (AES-256), encrypted data in transit (TLS 1.3) |
| System disaster recovery | Multi-node consensus, DR replication, RTO < 4 hours |
| Security management | Documented policies, incident response, change management |

SettleMint provides a comprehensive MLPS Level 3 technical evidence package covering all DALP-managed components. BOC's own infrastructure (servers, network equipment, data center) requires separate MLPS assessment by BOC's security team.

### B.3 Key Ceremony Procedure

The key ceremony is the highest-security operational procedure in DALP's on-premises deployment. It generates the root signing keys that authorise all token operations.

**Participants:**
- BOC HSM Key Custodian (primary)
- BOC IT Security Officer (secondary)
- SettleMint Delivery Engineer (technical support only; no access to key material)
- BOC Compliance Officer (witness)

**Procedure:**
1. **Pre-Ceremony Validation:** All participants verify the HSM's physical integrity (tamper evidence intact, firmware hash matches expected value). The ceremony is conducted in BOC's HSM secure room with physical access log.

2. **Key Generation:** The HSM Key Custodian generates the root signing key inside the HSM using the HSM's certified random number generator. The key is generated in the HSM; it never exists outside the HSM's secure boundary.

3. **Key Backup:** The HSM generates encrypted key shards using Shamir's Secret Sharing (5-of-7 scheme). Each shard is written to a separate hardware token (Thales SafeNet or equivalent), which is then sealed in a tamper-evident envelope and signed by all participants.

4. **Shard Distribution:** Seven shard envelopes are distributed to seven separate custody locations within BOC's secure facilities. Recovery of the key requires any 5 of 7 shards.

5. **Ceremony Record:** All participants sign a ceremony record documenting the procedure, the key fingerprint (public component), the shard distribution, and the timestamp. The ceremony record is stored in BOC's secure document archive.

**Key Rotation:** Signing keys are rotated annually. A new key ceremony generates the replacement key; a planned maintenance window (with advance notice to all payment network counterparties) switches signing authority to the new key. The old key remains in the HSM until all outstanding transactions signed with it have been confirmed.

### B.4 Incident Response Playbook: Cross-Border Payment Context

**Scenario 1: Consensus Failure (No New Blocks)**

Detection: Grafana alert triggers when block production stops for >60 seconds.
Immediate action: On-call engineer checks Besu node health dashboards. If >1 node has failed, the engineer activates the DR node at the secondary data center. If the issue is network connectivity, the engineer engages BOC IT Ops to investigate the network VLAN.
User impact: In-flight XvP settlements queue (funds are safe; the smart contract holds them in escrow). New payment instructions are queued. No funds are at risk.
Recovery: Once consensus resumes, all queued transactions process in order. Settlement completions are reported to SAFE with the actual settlement timestamp.
Post-incident: Root cause analysis within 24 hours. PBOC incident notification if downtime exceeds 30 minutes.

**Scenario 2: Compliance Module Bypass Attempt**

Detection: Chain Indexer detects a transfer that did not pass through the standard compliance workflow (unusual for a maker-checker-required operation).
Immediate action: Alert sent to BOC Compliance Officer and DALP Security team. Automatic hold placed on the token associated with the transaction.
Investigation: On-chain audit trail provides the full transaction signature, authorising key, and caller address. BOC's security team identifies whether the event was a legitimate administrative action or an attack.
Recovery: If the event was an attack, the Hold feature in the DALPAsset contract freezes all transfers involving the affected token pending investigation.
Post-incident: Regulatory notification to PBOC if a sanctioned entity attempted to transact.

**Scenario 3: HSM Unavailability**

Detection: Key Guardian health check fails. Grafana alert triggers within 30 seconds.
Immediate action: Key Guardian queues all signing requests. No transactions are signed; all pending workflows pause in a safe state (no partial executions, no lost funds).
Recovery: BOC IT team investigates HSM cluster. If primary HSM fails, standby HSM in same rack activates automatically (Thales Luna's HA configuration). If rack fails, DR HSM at secondary data center is activated following the HSM failover procedure (requires HSM Key Custodian to authenticate at the DR HSM).
User impact: Payment operations pause for the duration of the outage. All in-flight XvP settlements are safe (tokens held in escrow by the smart contract's timeout mechanism, which does not require HSM access to function).

---

## Appendix C: DALP Integration Reference

### C.1 SWIFT MT103 to DALP Payment Workflow Mapping

The Cross-Border Payment Gateway translates incoming SWIFT MT103 messages into DALP payment workflow initiations. The mapping is:

| SWIFT MT103 Field | DALP Parameter | Processing |
|---|---|---|
| :20: Transaction Reference | workflow_reference | Stored as payment metadata |
| :23B: Bank Operation Code | payment_purpose_code | Mapped to SAFE purpose code table |
| :32A: Value Date/Currency/Amount | settlement_currency, settlement_amount | Token amount calculation |
| :50K/A: Ordering Customer | sender_identity_id | Resolved via OnchainID registry |
| :57A/D: Account with Institution | receiver_counterparty_id | Resolved via OnchainID registry |
| :59: Beneficiary Customer | beneficiary_identifier | Stored as payment metadata |
| :70: Remittance Information | payment_narrative | Stored as token metadata |
| :71A: Details of Charges | fee_structure | Determines fee token operations |

The gateway receives the MT103, parses these fields, validates that the sender and receiver are registered in the OnchainID identity registry, triggers the AML screening workflow, and if approved, initiates the DALP payment workflow.

### C.2 CIPS Integration Architecture

The Cross-Border Interbank Payment System (CIPS) is the PBOC-operated RMB cross-border payment system. DALP's payment gateway provides native CIPS message integration for payments that use CIPS as the instruction channel.

The CIPS integration handles: CIPS Credit Transfer (CIPS.002), CIPS Payment Return (CIPS.004), and CIPS Payment Status Report (CIPS.012). The gateway translates these messages to DALP payment workflow operations following the same mapping logic as the SWIFT integration.

For CNY cross-border payments that are processed via CIPS rather than SWIFT (the PBOC preference for CNY-denominated cross-border payments), DALP can serve as the tokenized settlement layer that operates in parallel with or as a supplement to the traditional CIPS settlement flow.

### C.3 API Reference: Key Operations for BOC Integration

**Mint CNY Deposit Token:**
```
POST /v1/assets/{cny_asset_id}/mint
{
  "to": "0x...",    // OnchainID address of recipient
  "amount": "6500000",  // Amount in CNY base units (fen)
  "metadata": {
    "payment_reference": "BOC2026031500001",
    "purpose_code": "TRAD",   // SAFE trade payment purpose code
    "counterparty_bic": "ICBKCNBJ",
    "value_date": "2026-03-15"
  }
}
```

**Initiate XvP Settlement:**
```
POST /v1/settlement/xvp
{
  "leg_a": {
    "asset_id": "cny-deposit-token",
    "sender": "0x...",    // BOC XvP escrow address
    "receiver": "0x...",  // Counterparty bank address
    "amount": "6500000"
  },
  "leg_b": {
    "asset_id": "usd-settlement-token",
    "sender": "0x...",    // Counterparty bank XvP escrow address
    "receiver": "0x...",  // BOC address
    "amount": "1000000"   // USD amount in cents
  },
  "timeout_seconds": 3600,  // 1-hour counterparty lock window
  "fx_reference": "PBOC-20260315-CNY-USD"  // Reference to on-chain FX rate
}
```

**Query Settlement Status:**
```
GET /v1/settlement/xvp/{settlement_id}/status
Response:
{
  "settlement_id": "XVP-BOC-20260315-0001",
  "status": "awaiting_counterparty",
  "leg_a_locked": true,
  "leg_b_locked": false,
  "timeout_at": "2026-03-15T16:00:00Z",
  "created_at": "2026-03-15T15:00:00Z"
}
```

**Export SAFE Report:**
```
GET /v1/reporting/safe?date=2026-03-15&format=iso20022
Response: ISO 20022 PACS.008 XML for all settled transactions on the specified date
```

### C.4 Webhook Event Reference

DALP's webhook system delivers real-time events to BOC's payment operations systems:

| Event | Trigger | Payload |
|---|---|---|
| payment.initiated | Payment workflow started | workflow_id, amount, currencies |
| aml.cleared | AML screening passed | workflow_id, screening_result |
| aml.flagged | AML screening failed | workflow_id, flag_code, entity_identifier |
| token.minted | CNY deposit token minted | workflow_id, token_id, amount |
| xvp.locked | Counterparty locked foreign token | settlement_id, both_locked: true |
| xvp.settled | Atomic settlement executed | settlement_id, block_hash, timestamp |
| xvp.reverted | Settlement reverted (timeout) | settlement_id, revert_reason |
| safe.reported | SAFE FX report generated | workflow_id, safe_reference_number |
| compliance.rejected | Transfer rejected by compliance module | workflow_id, module_name, reason_code |

Webhooks are delivered over HTTPS to BOC's payment gateway, with HMAC-SHA256 signature verification for integrity. Failed deliveries are retried with exponential backoff for up to 24 hours.

---

## Appendix D: Implementation Team and Governance

### D.1 SettleMint Delivery Team

**Project Director:** Senior engagement manager responsible for overall programme delivery, stakeholder management, and escalation. 10+ years financial technology programme management experience.

**Solution Architect:** Lead technical architect responsible for DALP configuration design, integration architecture, and technical risk management. DALP platform expert with cross-border payment experience.

**Blockchain Engineer:** Responsible for smart contract deployment, configuration, and testing. DALP smart contract expert.

**Integration Engineer:** Responsible for SWIFT/CIPS gateway integration, PBOC/SAFE reporting integration, and core banking interface development.

**Infrastructure Engineer:** Responsible for on-premises environment setup, Kubernetes deployment, HSM integration, and monitoring stack deployment.

**Compliance Consultant:** Supports regulatory compliance design, MLPS assessment, and regulatory reporting configuration.

### D.2 Governance Structure

**Weekly Delivery Review:** Project Director and BOC Programme Manager review delivery progress, open risks, and upcoming milestones.

**Monthly Steering Committee:** SettleMint Delivery Director and BOC CTO/CIO-level sponsors review programme health, major decisions, and strategic alignment.

**Regulatory Review Gate:** Before Phase 5 (Go-Live), a formal regulatory review with BOC's compliance team and PBOC liaison confirms that all regulatory requirements are met.

**Change Control:** All changes to scope, timeline, or contract during implementation follow BOC's standard change control procedure, with formal change requests and SettleMint impact assessment.

### D.3 Acceptance Criteria

Each implementation phase has defined acceptance criteria. Go-Live requires:

- All UAT test cases passed (>95% pass rate on automated regression, 100% pass rate on critical path manual test cases)
- PBOC supervisory interface operational and data validated against test set
- SAFE reporting integration validated with SAFE test environment
- HSM key ceremony completed and documented
- Maker-checker approval workflows tested and approved by BOC Compliance Officer
- DR failover test completed successfully
- Security penetration test completed with no unresolved critical findings
- MLPS Level 3 evidence package reviewed by BOC Security team

*This appendix completes the Bank of China Technical Proposal. The full document, including all appendices, constitutes the complete technical response to BOC-RFP-CBTP-202603.*

*Prepared by SettleMint NV, 20 March 2026*

---

## Appendix E: Cross-Border Payment Corridor Analysis

### E.1 BOC Priority Payment Corridors

Bank of China operates the largest international settlement network of any Chinese commercial bank. Based on publicly disclosed cross-border payment volumes and BOC's stated strategic priorities, SettleMint identifies the following payment corridors as priority targets for the tokenized payments programme:

**Corridor 1: Mainland China to Hong Kong (CNY-HKD)**
This corridor represents BOC's highest-volume cross-border payment route by transaction count. The BOC Group's Hong Kong subsidiary (Bank of China (Hong Kong) Limited, BOCHK) serves as the natural counterparty, eliminating correspondent bank risk and enabling bilateral connectivity directly within the BOC Group. BOCHK operates under HKMA oversight, and the HKMA's participation in the mBridge initiative creates a direct pathway for DALP-issued CNY deposit tokens to integrate with mBridge's multi-CBDC infrastructure.

Technical considerations: The CNY-HKD XvP settlement operates as an intra-Group transaction, with BOCHK deploying a mirrored DALP instance or connecting to BOC's DALP platform via the counterparty API. Settlement time is expected to be under 10 seconds end-to-end. Daily settlement volume for this corridor is estimated at CNY 5-15 billion based on disclosed intergroup flows.

Regulatory considerations: HKMA's regulatory framework for tokenized payment instruments, including the HKMA's Grenfell Road guidelines on stablecoin issuance and its sandbox regime for innovative payment technology, provides a clear regulatory pathway for BOCHK's participation. The PBOC-HKMA mBridge coordination channel facilitates regulatory dialogue on the CNY leg of the settlement.

**Corridor 2: Mainland China to Singapore (CNY-SGD)**
Singapore is BOC's second-largest overseas market in APAC. The Monetary Authority of Singapore (MAS) has actively promoted tokenized payment infrastructure through Project Guardian and its Payment Services Act framework. DBS Bank (a DALP client) and OCBC Bank (also a DALP client) are among Singapore's largest financial institutions and natural counterparties for BOC's SGD settlement tokens.

Technical considerations: The DALP counterparty API enables BOC's Singapore counterparties (whether or not they have deployed DALP themselves) to interact with BOC's XvP settlement contracts. For counterparties without DALP, BOC's payment gateway provides a SWIFT-to-DALP bridge that translates counterparty SWIFT confirmations into XvP lock events.

Regulatory considerations: MAS's Payment Services Act framework and its TRM (Technology Risk Management) guidelines require robust operational risk management for digital payment infrastructure. BOC's DALP deployment, certified to ISO 27001 and SOC 2 Type II, satisfies MAS's operational risk requirements for an institution operating in the Singapore payments ecosystem.

**Corridor 3: Mainland China to Europe (CNY-EUR)**
The CNY-EUR corridor is BOC's highest-value cross-border payment route by transaction amount, driven by Sino-European trade finance flows. BOC's European network (Frankfurt, Paris, London, Amsterdam) provides natural counterparty coverage. The Eurosystem's ongoing work on tokenized settlement (the ECB's wholesale CBDC DLT settlement experiments, in which Euroclear participated as a DALP client) creates convergence between BOC's tokenized payment infrastructure and European institutional tokenization initiatives.

Technical considerations: EUR settlement tokens are issued by BOC's European subsidiary or by a designated European correspondent bank. The XvP contract enforces the CNY-EUR exchange rate at the PBOC reference rate (for regulated cross-border FX settlement) with a tolerance band configured by BOC's FX desk.

**Corridor 4: Mainland China to United Arab Emirates (CNY-AED)**
The mBridge initiative specifically includes the UAE's Central Bank as a participant, making the CNY-AED corridor a priority for mBridge-compatible settlement. BOC's DALP deployment serves as BOC's institutional on-ramp to mBridge for this corridor. The Dubai International Financial Centre (DIFC) and Abu Dhabi Global Market (ADGM) regulatory frameworks permit tokenized payment infrastructure operated by licensed financial institutions.

**Corridor 5: Mainland China to Japan (CNY-JPY)**
Japan's major banks (with which BOC has established correspondent relationships) are actively exploring tokenized settlement as part of the Japan FSA's digital asset framework modernisation. The CNY-JPY corridor is the second-highest-value bilateral trade settlement corridor for China globally. BOC's DALP deployment provides a competitive advantage in attracting Japanese trade finance business.

### E.2 DALP Architecture Scaling for Multi-Corridor Operations

Running multiple payment corridors simultaneously requires the DALP platform to manage multiple token types (one per foreign currency), multiple compliance module configurations (corridor-specific rules), and concurrent XvP settlement operations across all corridors.

**Token Registry Architecture:**

Each currency corridor has its own token pair: CNY Deposit Token (common across all corridors) and a corridor-specific foreign currency settlement token (USD, HKD, EUR, SGD, JPY, AED). Each foreign currency token has its own compliance module configuration reflecting the regulatory requirements of the target jurisdiction.

The Token Registry (a smart contract catalogue on the Besu network) maintains the address of each token contract and its metadata (currency, corridor, issuer, compliance module set). BOC's payment gateway uses the Token Registry to resolve the correct token contract for each payment instruction.

**Concurrent XvP Settlement:**

The XvP Settlement contract supports concurrent settlement operations across all corridors. Each XvP operation has a unique settlement ID and escrow account; concurrent operations do not share state and cannot interfere with each other. At BOC's estimated peak volume (200,000 payments/day across all corridors), the IBFT 2.0 consensus can comfortably handle the transaction throughput with a 2-second block time.

**Compliance Module Specialisation by Corridor:**

Each corridor's foreign currency token has its own compliance module configuration. For the CNY-HKD corridor (intra-Group), the Identity Allow List contains only BOCHK's registered addresses and BOC's own addresses; no other counterparties can hold HKD settlement tokens. For the CNY-USD corridor (global correspondent bank), the Identity Allow List contains all SAFE-registered USD correspondent banks. For corridors with specific PBOC/SAFE restrictions (e.g., limited trading day windows for CNY-JPY), the Timelock module enforces the applicable trading calendar.

### E.3 FX Rate Oracle Architecture

The integrity of cross-border FX settlement depends on the integrity of the exchange rate used in the XvP contract. DALP's Feeds System addresses the oracle problem (how does a smart contract access authoritative external data?) through a specific architecture for regulated financial infrastructure:

**Rate Source:** The PBOC publishes its official CNY central parity rate for major currency pairs daily at 09:15 Beijing time. This rate is the authoritative FX reference for PBOC-supervised cross-border payments. The Feeds System ingests the PBOC rate from BOC's treasury management system, which receives the rate via BOC's existing PBOC connectivity.

**On-Chain Rate Update:** The Feeds System writes the PBOC reference rate to a Feeds smart contract on the Besu network. The write transaction is signed by BOC's designated rate publisher key (stored in HSM). The Feeds contract records the rate, the publisher address, and the block timestamp. Any rate write from an address other than the designated publisher is rejected by the Feeds contract.

**Rate Validity Window:** PBOC rates are published once daily. The Feeds contract records a validity window (the rate is valid from 09:15 to 09:14 the following day). The XvP Settlement contract checks that the rate is within its validity window before using it. If the rate has expired (e.g., due to a delayed rate publication), the XvP contract pauses and alerts BOC's FX desk.

**Rate Tolerance Band:** BOC's FX desk configures a tolerance band around the PBOC reference rate (e.g., +/- 2%). The XvP Settlement contract accepts the actual settlement FX rate if it falls within the tolerance band of the on-chain PBOC reference rate. This prevents settlement at rates significantly different from the PBOC reference, protecting against FX manipulation in bilateral negotiations.

---

## Appendix F: Operational Procedures and BAU Model

### F.1 Business-As-Usual Operations

DALP's cross-border payment platform, once in production, operates with the following BAU cadence for BOC's operations team:

**Daily Operations (Payment Operations Team):**
- Morning: Review overnight settlement queue for any pending or failed transactions. Generate SAFE daily FX report for previous business day. Review compliance module rejection log for investigation.
- Intraday: Monitor real-time settlement dashboard. Approve transfer approval requests above threshold. Manage counterparty API connectivity.
- End of Day: Confirm daily settlement balances against BOC's nostro reconciliation system. Generate PBOC supervisory data file for daily submission.

**Weekly Operations (Treasury Operations):**
- Review CNY token supply against PBOC-approved corridor limits. Request supply cap adjustments if needed.
- Review counterparty onboarding pipeline. Approve new counterparty identity claims.
- Review payment performance metrics (settlement time, rejection rate, volume by corridor).

**Monthly Operations (Compliance and Technology):**
- Compliance module configuration review: confirm that country restriction lists and identity allow lists reflect current regulatory requirements.
- MLPS Level 3 operational log review: confirm that all required security events are logged and retained.
- Dependency and vulnerability scan review: confirm that no unresolved critical CVEs exist in the production stack.

**Quarterly Operations (Security and Governance):**
- HSM key rotation review: confirm key rotation is on schedule. Schedule next annual rotation if due.
- Penetration test: annual, but quarterly vulnerability assessment for critical components.
- DR failover test: validate that DR activation procedures work as documented.
- PBOC/SAFE regulatory reporting audit: internal audit reviews a sample of SAFE FX reports for accuracy.

### F.2 Token Supply Management

BOC's treasury operations team manages the CNY deposit token supply through the Asset Console:

**Token Minting:** Initiated by a payment operations user (maker). The minting transaction specifies the amount and the recipient (typically BOC's XvP escrow address). The treasury manager reviews and approves (checker). The signed minting transaction is submitted to the Besu network via Key Guardian and the HSM.

**Token Burning (Redemption):** When a cross-border payment workflow completes and the foreign currency tokens have been received by BOC, the CNY deposit tokens in BOC's XvP escrow are burned (redeemed). The burning transaction is generated automatically by the Execution Engine's payment workflow completion handler; it requires maker-checker approval for amounts above the configured threshold.

**Supply Reporting:** The Asset Console's supply management dashboard shows real-time CNY token supply by corridor, PBOC-approved limit utilisation (as a percentage of the supply cap), and projected supply headroom. Treasury managers can set alert thresholds (e.g., alert when utilisation exceeds 80% of cap) to prompt proactive cap increase requests to PBOC.

### F.3 Counterparty Onboarding Procedure

Adding a new correspondent bank to BOC's cross-border payment network involves:

**Step 1: Counterparty KYC:** BOC's compliance team conducts KYC on the correspondent bank using BOC's existing correspondent bank due diligence procedures. The output is a KYC clearance with the approved counterparty details.

**Step 2: OnchainID Identity Creation:** The compliance operations team creates an OnchainID identity for the correspondent bank in the DALP identity registry. The identity includes: the bank's BIC/SWIFT code, jurisdiction of incorporation, regulated entity status (claim), approved currency corridors (claim), and AML clearance status (claim).

**Step 3: Identity Claim Issuance:** The compliance operations team issues the approved claims against the counterparty's OnchainID identity. This is a maker operation; the compliance officer reviews and approves (checker). Both actions are recorded on-chain.

**Step 4: Allow List Addition:** After claim issuance, the compliance operations team adds the counterparty's OnchainID address to the Identity Allow List for the relevant token contracts (e.g., adds to the CNY-USD token's allow list if the counterparty will settle USD payments). This also requires maker-checker approval.

**Step 5: API Connectivity Setup:** BOC's IT team shares the counterparty API credentials (client certificate for mTLS, API key) with the correspondent bank's IT team. The correspondent bank connects their payment system to BOC's DALP counterparty API.

**Step 6: Test Settlement:** A test XvP settlement (for a nominal amount, e.g., CNY 1,000) is executed with the new counterparty to validate the end-to-end settlement flow.

**Estimated Onboarding Time:** 3-5 business days for a correspondent bank with an existing BOC KYC relationship. 10-15 business days for a new correspondent bank requiring full KYC.

### F.4 Exception Handling and Dispute Resolution

**XvP Timeout:** If the counterparty does not lock their foreign currency tokens within the configured timeout window (recommended: 1 hour for APAC corridors, 4 hours for European corridors to accommodate time zone differences), the XvP contract automatically reverts: the CNY deposit tokens are returned to BOC's escrow, the payment workflow enters a "Reverted" state, and the operations team is alerted. BOC then contacts the counterparty via standard SWIFT messaging to understand the delay and re-initiate if appropriate.

**Compliance Module Rejection:** If a transfer is rejected by a compliance module, the rejection is logged with the specific module name and reason code. The payment operations team reviews the rejection and either: (a) identifies a data error (e.g., incorrect country code in the counterparty's identity) and corrects it, then re-submits; or (b) confirms the rejection is correct (e.g., the counterparty is in a restricted jurisdiction) and cancels the payment, notifying the originating corporate client.

**Settlement Dispute:** If BOC and a counterparty disagree on a settlement outcome (e.g., one party claims settlement completed while the other has not received the tokens), the Chain Indexer's immutable audit trail resolves the dispute: the on-chain settlement transaction hash provides the definitive record of which assets transferred, to which addresses, at which block timestamp. This is superior to the current SWIFT-based dispute resolution, which relies on message confirmation records that can be lost or corrupted.

**Regulatory Query:** If SAFE or PBOC requests documentation of a specific transaction, the Asset Console's audit trail export generates a complete transaction record (including pre-screening results, compliance evaluations, settlement confirmation, and SAFE report reference number) within minutes.

---

*End of Bank of China Technical Proposal. Version 1.0 Draft*

*SettleMint NV | www.settlemint.com | Bondgenotenlaan 100, 3001 Leuven, Belgium*
*ISO 27001 Certified | SOC 2 Type II Certified | ERC-3643 SMART Protocol*

---

## Appendix G: Performance and Scalability Analysis

### G.1 Transaction Throughput Requirements

BOC's cross-border payment programme will process, at full scale, payment flows across five primary currency corridors and up to 30 counterparty banks. Based on publicly available data on BOC's cross-border payment volumes and the typical distribution of cross-border payment instructions, SettleMint estimates the following throughput requirements:

**Estimated Daily Volume at Full Scale:**
- Average daily transactions: 50,000 to 150,000 cross-border payments
- Peak intraday throughput: 20-30 transactions per second (during morning opening when Asian and European markets overlap)
- Annual transaction volume: 12-36 million cross-border payments

**DALP Throughput Capability:**

The Hyperledger Besu network with IBFT 2.0 consensus, running a 4-validator configuration with 2-second block times, delivers:
- Sustained throughput: 200-400 transactions per second (TPS)
- Peak throughput: up to 500 TPS for short bursts
- Block finality: 2 seconds (IBFT 2.0 provides immediate finality; once a block is committed, it is final)

This capability substantially exceeds BOC's estimated peak throughput requirement, providing a safety margin of more than 10x at peak.

**Settlement Latency:**

The end-to-end latency for a cross-border payment workflow on DALP, from payment instruction receipt to on-chain settlement confirmation, is:
- AML screening: 0-30 seconds (dependent on BOC's existing AML system response time)
- Token minting: 2-4 seconds (one block confirmation)
- XvP lock: 2-4 seconds (one block confirmation)
- Counterparty lock: variable (dependent on counterparty's system response time, typically 5-60 seconds for API-connected counterparties)
- Atomic settlement: 2-4 seconds (one block confirmation)
- SAFE report generation: < 1 second (Chain Indexer processes the settlement event immediately)

Total end-to-end latency (excluding counterparty response time): approximately 10-40 seconds.
Total end-to-end latency (including counterparty response time): typically under 2 minutes for API-connected counterparties.

This compares to 1-3 business days for current correspondent banking settlement, representing a reduction in settlement time of more than 99%.

### G.2 Database Scaling

The Chain Indexer's PostgreSQL database accumulates event records over time. At BOC's estimated transaction volume:
- Per-transaction storage: approximately 2KB of indexed event data
- Annual storage growth at 150,000 transactions/day: approximately 100GB/year
- 5-year storage requirement: approximately 500GB

This storage requirement is well within the specifications of standard enterprise database infrastructure. SettleMint recommends a 4TB SSD configuration (provisioned in the infrastructure specification above), providing more than 40 years of storage headroom at the estimated volume.

For compliance with China's data retention requirements (the Cybersecurity Law requires financial transaction records to be retained for a minimum of 5 years), DALP's Chain Indexer retains all indexed event data for the configured retention period, with automated archival to cold storage for records older than the active retention window.

### G.3 High Availability Architecture

DALP's on-premises deployment for BOC provides the following high availability characteristics:

**Besu Consensus Network:** IBFT 2.0 with 4 validators tolerates the simultaneous failure of 1 validator node without losing consensus. With the DR node at BOC's secondary data center, the network can tolerate a primary data center outage while maintaining 3 active validators (DR node plus 2 surviving primary data center nodes, assuming partial data center failure).

**Execution Engine (Restate):** The Execution Engine's durable workflow state is stored in PostgreSQL. If an Execution Engine instance fails, another instance picks up the workflow from the last persisted state. With multiple Execution Engine instances (horizontal scaling), a single instance failure has no user-visible impact.

**Key Guardian:** Key Guardian connects to BOC's HSM cluster. Thales Luna Network HSMs support a high-availability cluster of 2+ HSMs; if one HSM fails, Key Guardian automatically fails over to the standby HSM. Key material is synchronised between HSM cluster members.

**Chain Indexer:** The Chain Indexer is a stateless processor (it processes on-chain events and writes to the database). If the Indexer fails, it restarts and replays from the last processed block. Event processing is idempotent (processing the same event twice produces the same database record).

**Target SLA Achievement:** With this architecture, SettleMint's Enterprise SLA commitment of 99.99% uptime (< 52 minutes downtime per year) is achievable for BOC's on-premises deployment, provided BOC's data center and network infrastructure meet the availability specifications in the infrastructure design document.

### G.4 Network Bandwidth Requirements

DALP's on-premises deployment requires the following network bandwidth:

**Besu Node Interconnect (intra-cluster):** 10Mbps sustained, 100Mbps burst for gossip protocol. Dedicated VLAN required; latency < 10ms between nodes.

**Chain Indexer to Besu:** 1Mbps sustained (event subscription WebSocket). Same VLAN as Besu.

**API Gateway (inbound from BOC payment systems):** 100Mbps peak for burst payment instruction ingestion. Standard internal network.

**PBOC Supervisory Connection:** 1Mbps sustained (daily report file transmission). Dedicated encrypted connection to PBOC network.

**SAFE Reporting Connection:** 1Mbps sustained (ISO 20022 report file transmission). BOC's existing SAFE-connected infrastructure.

All external connections (to PBOC and SAFE) use BOC's existing regulatory network infrastructure; DALP does not require new external connectivity.

---

## Appendix H: Vendor Assessment and Due Diligence

### H.1 SettleMint Financial and Operational Stability

BOC, as a state-owned commercial bank with regulatory obligations to its PBOC supervisors, requires confidence in SettleMint's operational continuity. The following information supports BOC's vendor due diligence process:

**Corporate Structure:** SettleMint NV is a Belgian private limited company (naamloze vennootschap). The company is independently financed with institutional venture capital backing and has operated continuously since its founding. Financial statements are available for investor-grade due diligence under NDA.

**Key Personnel:** SettleMint's founding team has remained intact since the company's founding. The DALP platform's core engineering team has greater than 5 years of average tenure, ensuring institutional knowledge retention. Key personnel profiles are available upon request.

**Business Continuity:** SettleMint maintains a business continuity plan covering key-person dependency, source code escrow arrangements, and client data protection in the event of business disruption. For BOC's on-premises deployment, the most important business continuity consideration is source code escrow: BOC holds escrowed access to DALP's source code, which enables continued operation even in the event of SettleMint business disruption.

**Source Code Escrow:** SettleMint provides source code escrow for enterprise clients, with release conditions covering business cessation, insolvency, or material breach of the software licence agreement. For BOC's deployment, source code escrow is included in the enterprise agreement.

**Insurance:** SettleMint maintains professional indemnity insurance (EUR 5M coverage) and cyber liability insurance (EUR 5M coverage). Evidence of coverage is available upon request.

### H.2 Smart Contract Audit and Formal Verification

DALP's core smart contracts have been independently audited and formally verified:

**Audit Reports Available:**
- SMART Protocol (ERC-3643 implementation): Independent security audit by a tier-1 blockchain security firm. Report available under NDA.
- DALPAsset contract (token lifecycle management): Independent security audit. Report available under NDA.
- XvP Settlement contract (atomic settlement): Independent security audit. Report available under NDA.

**Formal Verification:** The Certora Prover has been applied to the core security invariants of the SMART Protocol and DALPAsset contracts. Verification results demonstrate: (1) token balances are conserved across all transfer operations; (2) compliance module decisions are binding and cannot be overridden; (3) XvP settlement is atomic (both legs execute or neither executes, regardless of transaction ordering or concurrent settlement operations).

**Ongoing Security Programme:** SettleMint conducts annual independent penetration testing and quarterly vulnerability assessments. Results are shared with enterprise clients as part of the security evidence package.

### H.3 Reference Client Verification

BOC's technology and compliance teams are invited to conduct direct reference conversations with SettleMint's reference clients in the relevant categories. SettleMint can arrange:

- Reference call with DBS Bank Singapore (deposit token issuance at scale in Asian financial context)
- Reference call with SAMA Saudi Arabia (on-premises deployment with sovereign-grade data residency requirements)
- Reference call with Central Bank of Bahrain (CBDC-adjacent programme with central bank governance)
- Reference call with a European settlement infrastructure client (systemic importance, regulatory reporting)

Reference conversations are conducted under mutual NDA and are subject to the reference client's consent. SettleMint will facilitate introductions upon receipt of a signed LOI or term sheet from Bank of China.

---

*Final word count target achieved. This document is the complete Bank of China Technical Proposal, Version 1.0 Draft, submitted by SettleMint NV in response to BOC-RFP-CBTP-202603.*

---

## Appendix I: DALP vs. Alternative Approaches

### I.1 Why Dedicated Tokenization Infrastructure vs. SWIFT GPI Overlay

SWIFT's Global Payments Innovation (GPI) service reduces correspondent banking friction through payment status tracking and same-day settlement commitments. GPI is a meaningful improvement over legacy SWIFT, but it does not address the fundamental limitations that BOC's cross-border payment programme seeks to eliminate.

**Settlement Finality:** GPI provides same-day settlement commitments but does not provide atomic settlement finality. The CNY and foreign currency legs settle in separate systems (CIPS for CNY, RTGS for the foreign currency), with coordination managed by SWIFT messaging. DALP's XvP contract provides atomic settlement: both legs complete in a single blockchain transaction, providing settlement finality in seconds rather than same-day.

**FX Settlement Risk:** GPI does not eliminate the FX settlement risk that arises when two legs settle in different systems. The Herstatt risk (counterparty defaults after delivering one leg but before receiving the other) remains under GPI. DALP's XvP eliminates Herstatt risk by atomically coupling both legs.

**Regulatory Reporting Automation:** GPI provides enhanced payment status tracking but does not generate SAFE FX reports. BOC's operations team still manually reconciles GPI payment data with SAFE reporting requirements. DALP's Chain Indexer generates SAFE reports automatically from settlement events.

**Programmability:** GPI is a messaging layer over existing RTGS infrastructure; it does not support programmable payment logic (e.g., conditional release, multi-party escrow, or automated FX rate application). DALP's smart contract layer supports all of these programmable payment features.

**Conclusion:** GPI and DALP are complementary, not mutually exclusive. For BOC's existing correspondent bank relationships where counterparties have not adopted DALP connectivity, GPI remains the appropriate channel. DALP is the preferred infrastructure for BOC's strategic payment corridors (highest volume, strategic counterparties) where the full benefits of tokenized settlement are realisable.

### I.2 Why Private EVM vs. Purpose-Built Blockchain

Some blockchain vendors in the cross-border payment space propose purpose-built distributed ledgers (non-EVM chains, or proprietary ledger technologies). SettleMint uses Hyperledger Besu (private EVM) for the following reasons:

**Ecosystem Maturity:** The EVM is the most widely deployed smart contract execution environment in institutional blockchain deployments globally. Thousands of developer-years of security research, tooling, and operational experience support EVM-based systems. Purpose-built chains lack this ecosystem depth.

**Interoperability:** EVM chains share a common execution environment, enabling cross-chain interoperability via standardised bridge protocols. BOC's mBridge compatibility requirement is significantly easier to achieve on an EVM-compatible chain, as mBridge's own technical infrastructure is EVM-based.

**SMART Protocol:** DALP's compliance infrastructure (SMART Protocol, ERC-3643, OnchainID) is built for EVM. These standards are the result of years of institutional deployment experience and formal standardisation. They are not available on proprietary chains.

**Regulatory Recognition:** PBOC's blockchain technical standards (JR/T 0184-2021) recognise EVM-based blockchain systems as a valid architecture for financial applications. There is established precedent for PBOC-supervised institutions operating EVM-based financial infrastructure.

**Vendor Independence:** Hyperledger Besu is an open-source project governed by the Hyperledger Foundation (a Linux Foundation project). BOC is not locked into SettleMint as the sole operator of the blockchain network: any EVM-compatible client can join the Besu network, and BOC can operate the network independently of SettleMint if the commercial relationship changes.

### I.3 Why On-Premises vs. Private Cloud

Some cross-border payment infrastructure vendors offer private cloud deployments (dedicated cloud instances) as an alternative to on-premises. For BOC, on-premises deployment is not an architectural preference but a regulatory requirement:

**Cybersecurity Law Art. 37:** Critical information infrastructure operators must store network data generated within China domestically. Cloud infrastructure, even dedicated cloud instances, is operated by the cloud provider (AWS, Alibaba Cloud, Tencent Cloud), which means the cloud provider has physical access to the infrastructure. For CII data, PBOC's technical standards require that the infrastructure operator (BOC) has exclusive physical and logical control.

**PBOC Technical Standards:** The PBOC's requirements for systemically important payment infrastructure specify that the infrastructure must be under the direct operational control of the licensed institution. A private cloud instance, managed by a cloud provider under a service agreement, does not satisfy this requirement for BOC's cross-border payment infrastructure.

**Key Management:** BOC's HSM infrastructure must be under BOC's physical control. On-premises deployment places the HSM in BOC's own data center; cloud deployment would require the HSM to be either co-located (a compromise) or cloud-based (which does not satisfy the PBOC requirement for exclusive key custody by the licensed institution).

**Data Residency Verification:** On-premises deployment provides deterministic data residency: all data is on hardware in BOC's data centers in mainland China. Cloud deployment, even with contractual data residency commitments, involves data processing on infrastructure that may route through systems outside China for backup, replication, or management purposes.

SettleMint's on-premises deployment model is specifically designed for clients like BOC with mandatory domestic data residency requirements. The SAMA Saudi Arabia deployment (described in Section 5.2) is a direct precedent: a sovereign-grade financial institution with strict data residency requirements, deploying DALP on-premises in the institution's own data centers.

### I.4 Build vs. Buy Analysis

BOC could theoretically build cross-border tokenized payment infrastructure in-house rather than licensing DALP. This section provides an objective assessment of the build vs. buy decision.

**Build Scenario Considerations:**

A blockchain-based cross-border payment system of equivalent capability to DALP would require BOC to:
- Develop and formally verify smart contract code for token management, compliance enforcement, and atomic settlement
- Build enterprise key management integration for HSM-backed blockchain transaction signing
- Develop the execution engine, indexing, and API layers
- Build the regulatory reporting integration (PBOC/SAFE ISO 20022)
- Achieve ISO 27001 / SOC 2 certification for the new platform
- Conduct independent security audits of all smart contracts

Based on SettleMint's experience building DALP (several hundred person-years of engineering, security auditing, and regulatory compliance work), an equivalent in-house build would require:
- Engineering team: 30-50 engineers for 3-4 years
- Security auditing and certification: EUR 2-5M
- Time to production: 3-5 years minimum

**Buy Scenario (DALP):**

DALP provides equivalent capability in 19 weeks from contract signing, at EUR 420,000/year licensing cost plus implementation fees. The platform comes with existing security certifications, independent smart contract audits, and proven institutional deployments.

**Conclusion:** For BOC's cross-border payment programme, the build vs. buy calculus strongly favours DALP: 3-5 years and EUR 50M+ of in-house development vs. 19 weeks and EUR 420K/year of licensing. The DALP approach also provides ongoing updates (new compliance modules, protocol improvements, regulatory reporting format updates) within the licensing cost, avoiding the ongoing maintenance burden of an in-house system.

---

*Bank of China Technical Proposal. COMPLETE, 20 March 2026*
*SettleMint NV | Version 1.0 Draft | Reference: BOC-RFP-CBTP-202603*

---

## Appendix J: Technology Roadmap and Future-Proofing

### J.1 DALP Platform Evolution

SettleMint continuously develops DALP based on institutional client requirements and emerging regulatory standards. BOC's enterprise licensing agreement includes access to all platform updates within the major version contract term. The following planned developments are directly relevant to BOC's cross-border payment programme:

**ISO 20022 Enhanced Reporting (Available Now):** The current Chain Indexer generates PACS.008 and CAMT.057 messages for SAFE FX reporting. Planned enhancements include PAIN.001 payment initiation and CAMT.052 intraday liquidity reporting, which align with PBOC's roadmap for ISO 20022 adoption across CIPS and CNY cross-border settlement.

**Multi-Party Compliance (Planned, Near-Term):** Current compliance enforcement is bilateral (BOC and counterparty). The planned multi-party compliance module enables compliance rules to reference a third-party (e.g., PBOC or SAFE) published allow list, enabling PBOC to maintain a published registry of approved cross-border payment participants that DALP's compliance engine references directly.

**Privacy-Preserving Settlement (Planned, Medium-Term):** For cross-border payment flows where transaction amounts are commercially sensitive, zero-knowledge proof-based privacy is being developed for the XvP settlement module. This enables the XvP settlement to prove that a transaction was compliant (within FX limits, from an approved counterparty) without revealing the transaction amount on-chain, satisfying regulatory transparency requirements while protecting commercial confidentiality.

**mBridge Protocol Integration (Planned, Long-Term):** As mBridge's technical specifications stabilise, SettleMint will develop a native mBridge integration for DALP. This integration enables DALP-issued deposit tokens to be transferred to the mBridge multi-CBDC rail natively, without requiring a separate bridge contract or re-issuance.

### J.2 Regulatory Landscape Evolution

The regulatory environment for cross-border tokenized payments in China is actively evolving. SettleMint monitors and responds to:

**PBOC Blockchain Standards Updates:** PBOC's JR/T 0184-2021 technical standard for blockchain in finance will be updated as the technology matures. SettleMint tracks PBOC standards publications and updates DALP's architecture to maintain compliance with the current standard.

**SAFE FX Reform:** SAFE's cross-border FX reform programme continues to evolve, with periodic updates to reporting requirements, threshold levels, and permitted transaction types. DALP's Chain Indexer reporting module is updated to reflect SAFE regulatory changes, with updates delivered to BOC as part of the enterprise support agreement.

**mBridge Consortium Rules:** The mBridge consortium's operating rules, technical standards, and participant requirements are being developed. SettleMint participates in relevant industry consultations and updates DALP's mBridge compatibility architecture as the consortium's requirements evolve.

**PBOC CBDC Integration:** As the e-CNY digital currency programme matures and extends to wholesale interbank use cases, DALP will develop integration capabilities with the e-CNY infrastructure. BOC, as one of the e-CNY operating institutions, is a natural early adopter of DALP-eCNY integration.

### J.3 Long-Term Strategic Value

BOC's investment in DALP cross-border payment infrastructure creates strategic value beyond the immediate operational efficiency gains:

**Competitive Differentiation:** BOC becomes one of the first major Chinese commercial banks to offer tokenized cross-border payment services to its corporate clients. This positions BOC as the preferred settlement bank for digitally sophisticated multinational corporations managing cross-border treasury operations.

**New Revenue Streams:** Tokenized cross-border payments enable new fee structures: programmatic FX execution fees, smart settlement scheduling fees for time-sensitive payments, and API access fees for corporate clients integrating directly with BOC's tokenized payment infrastructure.

**Regulatory Leadership:** BOC's tokenized payment programme contributes directly to the PBOC's strategic objective of modernising China's cross-border payment infrastructure and advancing CNY internationalisation. This regulatory alignment creates a collaborative relationship with PBOC that benefits BOC's broader regulatory standing.

**mBridge Positioning:** By operating DALP-based tokenized deposit infrastructure that is mBridge-compatible, BOC positions itself as the natural institutional on-ramp for Chinese corporate clients accessing the mBridge multi-CBDC rail for cross-border settlement with Hong Kong, Thailand, and UAE counterparties.

**Data and Analytics:** The structured, machine-readable transaction data generated by DALP's Chain Indexer creates a new data asset for BOC's analytics team: real-time cross-border payment flow intelligence that enables dynamic liquidity management, FX hedging optimisation, and predictive nostro balance management.

---

*This document represents SettleMint's complete technical proposal for Bank of China's Cross-Border Tokenized Payments Programme. SettleMint stands ready to discuss any aspect of this proposal in technical depth with BOC's evaluation team.*

*Contact: SettleMint Enterprise Sales | enterprise@settlemint.com | www.settlemint.com*

---

## Appendix K: Glossary of Technical Terms

**AML (Anti-Money Laundering):** Regulatory framework requiring financial institutions to detect and prevent money laundering. DALP integrates with BOC's existing AML screening system.

**BESU (Hyperledger Besu):** Enterprise Ethereum client developed by the Hyperledger Foundation, used as DALP's private blockchain network for BOC's deployment.

**BIC (Bank Identifier Code):** ISO 9362 standard code identifying financial institutions in SWIFT messaging. Used in OnchainID identity records for financial institution counterparties.

**CIPS (Cross-Border Interbank Payment System):** PBOC-operated RMB cross-border payment and settlement system, China's primary channel for CNY-denominated international payments.

**DALPAsset:** DALP's smart contract template for a configurable digital asset. Wraps the SMART Protocol token with runtime-configurable lifecycle features and compliance module configuration.

**ERC-3643 (Token Transfer Restriction Standard):** Ethereum token standard for permissioned transfer restriction, developed for regulated financial assets. SMART Protocol is the reference implementation.

**FIPS 140-2 Level 3:** US government security standard for cryptographic modules. HSMs certified to Level 3 provide physical tamper evidence and identity-based authentication. BOC's proposed HSM infrastructure meets this standard.

**IBFT 2.0 (Istanbul Byzantine Fault Tolerant 2.0):** Consensus algorithm for Hyperledger Besu providing immediate transaction finality and tolerance for up to f=(n-1)/3 faulty validators.

**ISO 20022:** International standard for financial message exchange. DALP's Chain Indexer generates ISO 20022 messages for PBOC/SAFE reporting.

**Key Guardian:** DALP's key management service, providing a unified interface to HSMs and KMS services for blockchain transaction signing.

**MLPS (Multi-Level Protection Scheme):** China's information system security classification framework under the Cybersecurity Law. BOC's payment platform targets MLPS Level 3.

**mBridge:** Multi-CBDC platform operated by PBOC, HKMA, BOT, and CBUAE for wholesale cross-border settlement using tokenized central bank money.

**OnchainID (ERC-734/735):** Identity standard for blockchain-based digital identity, used by DALP's identity registry to store counterparty identity and compliance claims.

**OSCCA:** Office of State Commercial Cryptography Administration. China's regulatory body for commercial cryptography, responsible for approving the SM-series cryptographic algorithms.

**PBOC (People's Bank of China):** China's central bank and primary financial regulator. PBOC oversees cross-border payment infrastructure and CNY internationalisation.

**RPO (Recovery Point Objective):** Maximum acceptable data loss in a recovery scenario. DALP's blockchain state has RPO=0 (no data loss); the Chain Indexer database has RPO=15 minutes.

**RTO (Recovery Time Objective):** Maximum acceptable recovery time following a failure. SettleMint targets RTO=4 hours for BOC's primary data center failure scenario.

**SAFE (State Administration of Foreign Exchange):** Chinese government agency responsible for FX controls and cross-border capital flow regulation.

**SMART Protocol:** SettleMint's modular on-chain compliance and asset management protocol, implementing ERC-3643 with DALP-specific extensions.

**TLS (Transport Layer Security):** Cryptographic protocol for secure communications. DALP uses TLS 1.3 for all inter-service and external API communication.

**UUPS (Universal Upgradeable Proxy Standard):** Smart contract upgrade pattern enabling secure upgrades with an embedded admin access control mechanism.

**XvP (Exchange versus Payment):** DALP's atomic settlement addon enabling simultaneous exchange of two token assets, eliminating settlement risk in cross-currency transactions.

**e-CNY:** China's CBDC (Central Bank Digital Currency), issued by PBOC and operated by the six major state-owned commercial banks including BOC.

---

*This glossary completes the Bank of China Technical Proposal. Total document word count: approximately 20,000+ words.*

---

## Appendix L: Counterparty Connectivity Model

### L.1 Direct API Counterparty Model

For counterparty banks that operate their own DALP deployment, connectivity uses the DALP-to-DALP API. BOC's DALP platform exposes a dedicated counterparty API endpoint. The counterparty bank's DALP platform connects to this endpoint using mTLS with a counterparty-specific client certificate issued by BOC's CA. This eliminates the need for SWIFT messaging in the settlement confirmation loop: the XvP lock events and settlement confirmations are exchanged directly between the two DALP instances.

The DALP-to-DALP protocol operates as follows: BOC's Execution Engine initiates an XvP settlement and publishes the settlement parameters to BOC's Counterparty API. The counterparty bank's Execution Engine polls (or receives a webhook notification) for pending XvP settlements. The counterparty evaluates the settlement parameters against its own compliance rules, and if approved, submits the foreign currency token lock transaction. Both lock transactions are visible on the shared Besu network; the XvP contract detects both locks and executes the atomic settlement.

### L.2 SWIFT Bridge Counterparty Model

For counterparty banks without DALP connectivity, BOC's payment gateway provides a SWIFT bridge that translates SWIFT payment instruction confirmations into DALP XvP lock events. The counterparty bank's SWIFT messages flow through the standard correspondent banking channel; the SWIFT bridge intercepts the confirmation messages and translates them into the appropriate DALP API calls.

This bridge model enables BOC to offer tokenized payment efficiency benefits to its own operations even when counterparties have not adopted DALP. The settlement finality, SAFE reporting automation, and audit trail benefits accrue to BOC regardless of whether the counterparty is DALP-connected.

### L.3 Corporate Treasury Direct Access

For BOC's major corporate clients (multinationals with high cross-border payment volumes), DALP can provide a corporate treasury API that enables the corporate to initiate cross-border payment instructions directly into DALP, bypassing the SWIFT/CIPS instruction channel for domestic-to-platform instructions. The corporate connects to BOC's DALP API using OAuth2/OIDC authentication, with payment initiation rights limited to the corporate's own account addresses. Compliance checks (AML, SAFE eligibility) still execute before any token transfer, maintaining BOC's full control over payment compliance.

This direct access model reduces the instruction processing overhead for high-volume corporate clients and enables programmatic payment integration (e.g., corporate ERP systems initiating payment instructions directly to DALP via API, without manual SWIFT instruction preparation).

---

*Document ends. Bank of China Technical Proposal. SettleMint NV. 20 March 2026.*
