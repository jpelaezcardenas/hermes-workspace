# Response to Request for Information: Tokenized Securities
# Stock Exchange of Thailand
# Reference: STOCK-EXCHANGE-OF-THAILAND-RFI-202603

**Submitted by:** SettleMint NV

**Date:** March 2026

**Classification:** Confidential

---

## 1. Executive Summary

This document responds to the Stock Exchange of Thailand (SET) Request for Information concerning tokenized securities infrastructure. SettleMint presents its Digital Asset Lifecycle Platform (DALP) as a comprehensive solution for SET's ambitions in tokenized securities, covering the full instrument lifecycle from issuance through settlement, servicing, and retirement.

DALP addresses SET's core requirements through five integrated capabilities: asset issuance with configurable templates, ex-ante compliance enforcement aligned with SEC Thailand and Bank of Thailand regulations, custody orchestration with maker-checker approvals, atomic Delivery-versus-Payment (DvP) settlement enabling T+0 finality, and automated lifecycle servicing including dividend processing and corporate actions.

SettleMint brings a decade of institutional blockchain infrastructure experience, with multi-year live deployments at regulated banks across Asia and Europe, sovereign-scale programs in the Middle East, and deep understanding of capital markets infrastructure requirements. DALP is not a prototype or innovation sandbox. It is operating infrastructure, deployed at institutions that face the same regulatory scrutiny, operational demands, and governance expectations that SET requires.

This response is structured to address each area of interest outlined in the RFI, with honest delineation between live capabilities, configuration-dependent features, and areas requiring local legal analysis or additional integration work specific to the Thai market.

---

## 2. About SettleMint

### Company Overview

SettleMint is the digital asset lifecycle management company for regulated financial markets and sovereign use cases. Founded by practitioners with deep experience in distributed systems, financial services, and enterprise delivery, the company has spent nearly a decade building blockchain infrastructure that meets institutional requirements for compliance, governance, and operational reliability.

SettleMint delivers the governance and orchestration layer between existing core financial systems and blockchain networks. The platform covers the full digital asset lifecycle: issuance, compliance controls, custody integration, distribution, settlement, and secondary market activity, with governance and regulatory compliance built in from the architecture level.

### Credentials and Track Record

**Operational history:**

- Nearly 10 years focused on blockchain infrastructure for enterprises and regulated institutions
- 7+ years of continuous production deployments at regulated banks in Asia and Europe
- Active sovereign and national-scale programs in the Middle East, including national real estate tokenization
- Live and planned deployments across bonds, equities, deposits, stablecoins, real estate, funds, and precious metals

**Institutional maturity:**

- Platforms powered by SettleMint have operated under institutional SLAs with 24/7 uptime requirements, high-throughput transaction processing, and robust disaster-recovery expectations
- Deployments have undergone security reviews, penetration testing, and vendor risk assessments typical of large financial institutions
- Role-based access controls, ex-ante compliance enforcement, maker-checker approvals, and full audit logging are built into the platform

**Team composition:**

- Combined expertise spanning transaction banking, capital markets, regulatory compliance, and blockchain engineering
- Dedicated solution architects, delivery leads, and customer success teams with experience navigating security review, vendor onboarding, and change control at large institutions
- Partner ecosystem across Europe, MENA, and APAC, combining local regulatory and market knowledge with a consistent global platform

### Regional Presence

SettleMint operates across Europe, the Middle East, and Asia-Pacific. For the Thai market, SettleMint leverages its APAC delivery experience, including live bank production deployments and regulatory framework alignment with MAS (Singapore) and JFSA (Japan), both of which share structural similarities with the SEC Thailand and Bank of Thailand regulatory environment.

---

## 3. Understanding SET's Requirements

### SET's Strategic Context

The Stock Exchange of Thailand is conducting a structured market-sounding exercise at a moment when tokenized securities are moving from conceptual exploration toward operational infrastructure. SET operates within a regulatory framework shaped by the SEC Thailand's digital asset rules, the Bank of Thailand's oversight of financial infrastructure, and the Personal Data Protection Act (PDPA). Any platform must satisfy all three.

SET's RFI signals several clear priorities:

1. **Institutional control, not innovation theatre.** SET wants grounded information that supports internal option analysis, control design, sequencing decisions, and investment cases. The emphasis on governance, audit evidence, and operational sustainability indicates a buyer that has moved past the experimentation phase.

2. **Full lifecycle coverage.** The information request table (IR-01 through IR-20) spans initiation, approval, issuance, servicing, reporting, exception handling, and closure. SET is evaluating platforms that can manage an asset from creation through every event to retirement.

3. **Integration realism.** SET expects connectivity with existing trading systems, CSD and clearing infrastructure, finance ledgers, payment rails, and observability stacks. APIs must be versioned, documented, observable, and testable.

4. **Regulatory alignment with specificity.** Generic compliance statements are insufficient. SET expects practical alignment with SEC Thailand digital asset rules, Bank of Thailand prudential requirements, and PDPA data governance obligations.

5. **Candour over completeness.** The RFI explicitly values honest limitation disclosure over vague capability claims. Where something is not currently supported, SET wants to hear that plainly.

### Mapping SET's Requirements to DALP

| SET Requirement Area | DALP Capability |
|---|---|
| End-to-end lifecycle (IR-01) | Five integrated pillars: Issuance, Compliance, Custody, Settlement, Servicing |
| Maker-checker controls (IR-02) | Native maker-checker approval workflows with RBAC (5 defined roles) |
| API and integration (IR-03) | REST, GraphQL, oRPC, event webhooks, ISO 20022 integration readiness |
| Regulatory alignment (IR-04) | Ex-ante compliance with 18 module types, configurable for SEC Thailand rules |
| Identity and onboarding (IR-05) | OnchainID with claim-based verification, KYC/KYB credential management |
| Key management (IR-06) | Key Guardian with HSM compatibility, DFNS and Fireblocks integration |
| Reconciliation (IR-07) | Unified on-chain registry, subgraph projections, event-driven sync |
| Operational dashboards (IR-08) | Pre-built Grafana dashboards, three-pillar observability stack |
| Deployment flexibility (IR-09) | Cloud, on-premises, hybrid with Helm/Kubernetes |
| Reference experience (IR-10) | Multi-year regulated bank deployments in Asia, sovereign programs |
| Programmable controls (IR-11) | 18 compliance module types, configurable transfer restrictions |
| Testing strategy (IR-12) | Environment separation, promotion controls, release governance |
| Institution-specific integration (IR-13) | Documented integration patterns for ERP/GL, treasury, payment rails |
| Data model extensibility (IR-14) | Configurable asset types, extensible metadata, no-code variant creation |
| Records retention (IR-15) | Immutable on-chain records, structured audit logging, evidence export |
| Third-party transparency (IR-16) | Clear dependency mapping for custodians, cloud, node operators |
| Business continuity (IR-17) | Multi-region deployment, Kubernetes-native resilience, backup procedures |
| Commercial scaling (IR-18) | Platform licensing with per-entity, per-jurisdiction expansion |
| Release management (IR-19) | Feature-flagged releases, regression testing, change governance |
| Roadmap alignment (IR-20) | Clear separation of live capability from planned features |

---

## 4. Proposed Solution: DALP Platform

### 4.1 Architecture Overview

DALP is an EVM-native Digital Asset Lifecycle Platform built for regulated institutions. It runs on any blockchain implementing the Ethereum JSON-RPC specification, with particular strength on Hyperledger Besu (IBFT 2.0/QBFT consensus) for permissioned deployments suited to SET's requirements.

The architecture follows a clean separation: smart contracts handle on-chain asset logic and compliance enforcement; a durable API service (DAPI) manages business workflows and integration; and an observability layer provides operational visibility across the entire stack.

For SET, this means:

- **Permissioned network deployment** on Hyperledger Besu, providing the transaction privacy, validator governance, and performance characteristics appropriate for a national securities exchange
- **No dependency on public chain economics.** Gas costs, network congestion, and MEV concerns do not apply in a permissioned Besu deployment
- **Compliance enforcement at the protocol layer.** Transfer restrictions, investor eligibility, and jurisdictional rules execute on-chain before any transfer completes

### 4.2 Asset Templates

DALP ships seven pre-built asset templates, each with purpose-built lifecycle logic:

| Asset Template | Relevance to SET |
|---|---|
| **Equity** | Primary focus: tokenized shares with automated dividend distribution, voting rights, corporate action processing |
| **Bonds** | Fixed income instruments with configurable coupon schedules, maturity logic, call/put options |
| **Funds** | Tokenized fund units with real-time NAV integration, automated subscription/redemption |
| **Deposits** | Programmable deposit tokens for settlement cash legs |
| **Stablecoins** | THB-denominated settlement instruments with reserve monitoring |
| **Real Estate** | Fractional property ownership with automated income distribution |
| **Precious Metals** | Asset-backed tokens with verified custody integration |

For SET's tokenized securities initiative, the **equity template** is the primary instrument. It provides:

- Automated issuance with configurable share classes and terms
- Programmable dividend distribution (cash dividends, stock dividends, interim dividends)
- Voting rights management with automated holding verification
- Corporate action processing: stock splits, rights issues, share buybacks
- Transfer restrictions aligned with SEC Thailand investor eligibility rules
- Integration with SET's existing shareholder registry systems

Beyond the seven templates, DALP offers a **Configurable Token** for asset classes that do not fit standard templates, using a composable feature architecture with up to 32 pluggable features per token, added or reordered post-deployment without contract redeployment.

### 4.3 Compliance Engine

DALP enforces compliance ex-ante: every transfer is validated against eligibility rules, identity claims, and jurisdictional constraints before execution, not checked after the fact. This is a fundamental architectural choice. In a tokenized securities environment, a non-compliant transfer that executes creates immutable on-chain evidence of a regulatory violation. DALP prevents that scenario entirely.

**18 compliance module types** are available, organized into six categories:

1. **Eligibility:** Investor accreditation verification, qualified investor checks
2. **Restrictions:** Country allow/block lists, address-level restrictions
3. **Transfer Controls:** Transfer approval workflows, maximum holding limits
4. **Issuance and Supply:** Supply caps, minting restrictions
5. **Time-Based Rules:** Holding period enforcement, transfer window restrictions
6. **Settlement and Collateral:** Collateral backing verification, settlement conditions

**Alignment with SEC Thailand regulations:**

- Investor classification rules can be encoded as compliance modules, distinguishing between institutional investors, high-net-worth individuals, and retail participants per SEC Thailand categories
- Foreign ownership limits on Thai securities can be enforced through country-based compliance modules and maximum holding percentage rules
- Trading restrictions (quiet periods, blackout windows) can be implemented via time-based transfer controls
- SEC Thailand reporting obligations are supported through structured audit logging and evidence export capabilities

**Alignment with Bank of Thailand requirements:**

- Settlement finality controls ensure that completed transactions meet the Bank of Thailand's expectations for payment system integrity
- AML/CFT workflow integration points allow connection to existing screening systems
- Transaction monitoring capabilities support suspicious transaction reporting obligations

**PDPA compliance:**

- Data residency controls through on-premises or Thailand-hosted cloud deployment
- Identity data minimization: DALP uses claim-based verification where only the verification result (not the underlying personal data) is stored on-chain
- Consent management integration points for investor onboarding workflows
- Data export and deletion capabilities aligned with PDPA data subject rights

### 4.4 Settlement

DALP provides atomic Delivery-versus-Payment (DvP) and Exchange-versus-Payment (XvP) settlement. Both the asset leg and the cash leg complete together, or both revert together. There is no scenario where one party delivers an asset without receiving payment, or vice versa.

**Settlement architecture:**

- **Local DvP:** Both asset and payment tokens on the same chain, settled atomically in a single transaction
- **Cross-chain XvP:** Hash Time-Locked Contracts (HTLC) for settlement across different chains or with external payment rails
- **Settlement states:** Open, Executed, Cancelled, Expired-Withdrawn, with deterministic closure semantics and full audit trail
- **Approval workflows:** Multi-party settlement approval with configurable quorum requirements

**T+0 capability:**

For on-chain settlement where both the asset token and a THB-denominated settlement instrument exist on the same network, DALP delivers T+0 settlement finality. The asset transfer and payment execute atomically. This eliminates:

- Counterparty risk during the settlement window
- Reconciliation gaps between trading and settlement systems
- Failed settlement costs and associated margin requirements

**Integration with external settlement:**

Where cash settlement occurs through existing Bank of Thailand payment infrastructure (BAHTNET, PromptPay), DALP coordinates the on-chain asset leg with off-chain payment confirmation through its integration layer. Settlement finality in this model depends on both the on-chain execution and the external payment confirmation.

---

## 5. Technical Architecture

### 5.1 Core Components

DALP's technical architecture consists of three layers:

**DAPI (Durable API Service)**

The DAPI layer is the primary integration surface for all external systems. Built on Restate for durable execution, it provides:

- REST, GraphQL, and oRPC endpoints for programmatic access to every platform capability
- Event webhooks for real-time notification of asset lifecycle events
- Multi-step workflows that survive process restarts and infrastructure failures
- Transaction queue management with idempotency, retry handling, and duplicate suppression
- Middleware chain enforcing permissions, wallet verification, and compliance checks before any mutation

**DIDX (Digital Identity Exchange)**

The identity layer manages verified participant identities across the platform:

- **OnchainID protocol** for verifiable, on-chain investor identities
- **Identity Registry** managing verified profiles with claim-based verification
- **KYC/KYB credential management** with approval workflows (review, approve, reject, request-update)
- **Claim lifecycle control** with issuance, storage, and revocation semantics
- **Global Trusted Issuers Registry** for platform-wide identity governance
- **Three-tier resolution:** subject-scoped, system-scoped, and global trusted issuer resolution

For SET, the identity layer integrates with existing KYC providers in the Thai market. DALP does not perform KYC checks itself; it enforces claims issued by authorized verification providers, ensuring that only verified investors can participate in tokenized securities transactions.

**DDWF (Digital Document Workflow Framework)**

The workflow framework orchestrates multi-step business processes:

- Durable execution ensures workflows complete even through infrastructure failures
- State machine patterns for asset lifecycle events (issuance approval, corporate actions, settlement)
- Audit trail generation at every workflow step
- Integration hooks for external approval systems and governance processes

### 5.2 Identity Layer Deep Dive

The identity architecture deserves specific attention given SET's regulatory context:

**OnchainID and Claim-Based Verification**

Every participant in a DALP deployment has an on-chain identity (OnchainID) that carries verifiable claims. Claims represent verified attributes: KYC completion status, investor accreditation level, jurisdictional eligibility, and institutional classification.

The ERC-3643 token standard, which DALP implements natively, requires identity verification before any transfer can execute. This creates a closed system where:

1. An investor must have a verified on-chain identity
2. That identity must carry the required claims (KYC approved, accreditation verified, jurisdiction eligible)
3. The compliance modules on the target token must validate those claims
4. Only if all checks pass does the transfer execute

This is not a post-trade compliance check. It is a pre-trade enforcement gate. No unverified party can receive tokenized securities. No transfer violating configured rules can complete.

**Role-Based Access Control (RBAC)**

DALP implements five defined roles governing platform operations:

- System administrators managing platform configuration
- Asset managers controlling token lifecycle operations
- Compliance officers managing policy and reviewing exceptions
- Operators handling day-to-day transaction processing
- Viewers with read-only access for audit and reporting

Each role has explicit permission boundaries. The separation ensures that a compliance officer cannot approve their own policy changes, an operator cannot modify compliance rules, and system configuration changes require appropriate authorization levels.

### 5.3 Observability Stack

DALP ships with full operational tooling, not just smart contracts:

**Three-pillar observability:**

| Pillar | Technology | Coverage |
|---|---|---|
| Metrics | VictoriaMetrics | Transaction throughput, error rates, latency, chain connectivity |
| Logs | Loki | Structured application logs, audit events, compliance decisions |
| Traces | Tempo | End-to-end request tracing across DAPI, blockchain, and integrations |

**Pre-built Grafana dashboards:**

- Operations overview: system health, active workflows, pending approvals
- Transaction monitoring: submission rates, confirmation times, failure patterns
- Compliance activity: policy evaluations, rejection reasons, exception trends
- Security events: authentication attempts, privileged operations, configuration changes

**Automated alerting:**

- Error rate spike detection
- Latency degradation warnings
- Chain connectivity loss
- Stale transaction detection
- Compliance module evaluation failures

This observability stack integrates with SET's existing monitoring infrastructure through standard protocols (Prometheus metrics export, syslog forwarding, SIEM-compatible audit log formats).

---

## 6. Integration with SET Infrastructure

### 6.1 Trading System Connectivity

DALP integrates with SET's existing trading infrastructure through its API layer:

**Inbound from trading systems:**

- Order execution notifications triggering on-chain settlement workflows
- Trade matching confirmations initiating DvP settlement sequences
- Market data feeds for NAV calculations and pricing reference

**Outbound to trading systems:**

- Settlement confirmation events
- Corporate action notifications (dividend record dates, rights issue details)
- Compliance status updates (investor eligibility changes, transfer restriction modifications)

**Integration patterns:**

- REST APIs for synchronous operations (balance queries, eligibility checks)
- Event webhooks for asynchronous notifications (settlement completion, compliance events)
- Batch interfaces for end-of-day reconciliation and reporting

### 6.2 CSD and Clearing Integration

For SET's clearing and depository operations (Thailand Securities Depository, TSD):

**Shareholder registry synchronization:**

- On-chain ownership records as the authoritative registry for tokenized securities
- Reconciliation interfaces between DALP's on-chain registry and TSD's existing systems
- Event-driven updates ensuring both systems reflect the same ownership state

**Clearing integration:**

- Pre-settlement position checks against DALP's on-chain balances
- Netting calculation inputs from DALP transaction data
- Failed settlement handling with deterministic retry and escalation workflows

**Corporate action coordination:**

- Record date snapshot capabilities for dividend entitlement calculations
- Rights issue processing with automated allocation based on on-chain holdings
- Voting record extraction for shareholder meetings

### 6.3 Existing Depository Systems

DALP is designed to operate alongside existing depository infrastructure, not replace it immediately:

**Coexistence model:**

- Tokenized securities operate on DALP while traditional securities remain in existing systems
- Cross-reference identifiers link the same investor across both systems
- Unified reporting consolidates positions from both tokenized and traditional holdings

**Migration path:**

- Phased onboarding of securities from traditional to tokenized form
- Dual-running period with reconciliation between systems
- Configurable cutover with rollback capability

### 6.4 Payment Rail Integration

**BAHTNET connectivity:**

- DALP's settlement layer can coordinate with BAHTNET for high-value THB payments
- ISO 20022 message format compatibility for payment instruction generation
- Settlement finality confirmation upon BAHTNET payment completion

**PromptPay integration:**

- For retail investor distributions (dividends, redemptions)
- Batch payment instruction generation from DALP corporate action processing
- Payment status tracking and reconciliation

---

## 7. Implementation Approach

### Phase 1: Foundation (Months 1 through 4)

**Objectives:**

- Deploy DALP infrastructure in a Thailand-hosted environment meeting PDPA requirements
- Configure Hyperledger Besu permissioned network with appropriate validator governance
- Establish identity framework with Thai KYC provider integration
- Deploy equity asset template with SEC Thailand compliance modules configured
- Build integration interfaces with SET's test trading system environment

**Deliverables:**

- Operational DALP platform in controlled test environment
- Configured equity token with Thai regulatory compliance rules
- Identity onboarding workflow connected to existing KYC infrastructure
- API documentation and integration specifications for SET technical teams
- Security architecture review documentation

**Key activities:**

| Activity | Duration | Dependencies |
|---|---|---|
| Infrastructure provisioning | 2 weeks | Thailand hosting environment confirmed |
| Besu network configuration | 2 weeks | Validator governance model agreed |
| Identity framework setup | 3 weeks | KYC provider integration specifications |
| Equity template configuration | 3 weeks | SEC Thailand compliance rules documented |
| Trading system integration (test) | 4 weeks | SET test environment access |
| Security review | 2 weeks | Concurrent with integration |

### Phase 2: Controlled Production (Months 5 through 8)

**Objectives:**

- Move from test to controlled production with limited security types and participants
- Implement DvP settlement with THB cash leg (on-chain settlement token or BAHTNET integration)
- Deploy full observability and operational monitoring
- Conduct user acceptance testing with SET operations teams
- Complete security assessment and penetration testing

**Deliverables:**

- Controlled production environment with live transaction capability
- DvP settlement operational for selected securities
- Operational runbooks and support procedures
- Training completion for SET operations, compliance, and technology teams
- Audit-ready documentation package

**Key activities:**

| Activity | Duration | Dependencies |
|---|---|---|
| Production environment hardening | 3 weeks | Phase 1 security review findings |
| DvP settlement implementation | 4 weeks | Cash leg instrument or payment rail confirmed |
| Observability deployment | 2 weeks | SET monitoring infrastructure access |
| UAT execution | 4 weeks | SET test scenarios defined |
| Penetration testing | 2 weeks | External assessor engagement |
| Operational readiness review | 2 weeks | All preceding activities |

### Phase 3: Expansion (Months 9 through 12)

**Objectives:**

- Expand to additional security types (bonds, funds)
- Increase participant base (additional broker-dealers, institutional investors)
- Implement advanced corporate actions and servicing automation
- Establish production support model for sustained operations
- Document lessons learned and plan further expansion

**Deliverables:**

- Multi-asset tokenized securities platform in production
- Expanded participant onboarding with streamlined verification
- Automated corporate action processing for standard events
- Production support model with defined SLAs
- Expansion roadmap for additional instruments and participants

---

## 8. Security and Compliance

### 8.1 Key Management

DALP's Key Guardian module provides institutional key management:

**Storage backends (tiered by security level):**

| Tier | Backend | Use Case |
|---|---|---|
| Development | Encrypted database | Testing and development environments |
| Standard production | Cloud secret manager (AWS, GCP, Azure) | Standard deployment |
| Regulated financial services | HSM (FIPS 140-2 Level 3 compatible) | SET production environment |
| Highest security | Third-party MPC custody (DFNS, Fireblocks) | Delegated institutional custody |

**Signing controls:**

- Maker-checker approval workflows for all privileged transactions
- Configurable multi-signature quorum requirements
- Emergency pause capability for incident response
- Formal key recovery procedures with audit trail
- Provider-delegated transaction broadcasting for institutional custody integrations

For SET, the recommended configuration combines HSM-backed key storage for platform-critical operations with institutional MPC custody (DFNS or Fireblocks) for asset custodial operations, maintaining clear separation between operational keys and custodial keys.

### 8.2 Security Architecture

**Network security:**

- Permissioned Besu network with validator node access control
- TLS encryption for all API communications
- Network segmentation between DAPI, blockchain nodes, and integration interfaces

**Application security:**

- RBAC enforcement at every API endpoint
- Wallet verification middleware with multi-factor authentication (PIN, OTP, secret codes)
- Input validation and deterministic error handling
- Rate limiting and circuit breaking on external integrations

**Audit and evidence:**

- Immutable on-chain transaction records
- Structured audit logging for all platform operations
- Compliance decision evidence (which rules evaluated, which passed or failed, timestamp)
- Privileged operation logging with operator identification
- Evidence export capabilities for regulatory inspection

### 8.3 Regulatory Compliance Framework

**SEC Thailand alignment:**

| SEC Thailand Requirement | DALP Capability |
|---|---|
| Digital asset business operator licensing | Platform supports licensed operator workflows |
| Investor classification and suitability | Compliance modules enforce investor category restrictions |
| Foreign ownership limits | Country-based and maximum holding compliance modules |
| Disclosure requirements | Event-driven disclosure notifications, audit trail |
| Trading conduct rules | Transfer restriction modules, blackout period enforcement |

**Bank of Thailand alignment:**

| Bank of Thailand Requirement | DALP Capability |
|---|---|
| Payment system oversight | Settlement finality controls, reconciliation capabilities |
| AML/CFT requirements | Integration points for sanctions screening, transaction monitoring |
| Operational resilience | Multi-region deployment, automated failover, RTO/RPO commitments |
| Technology risk management | Security architecture, change governance, incident management |

**PDPA alignment:**

| PDPA Requirement | DALP Capability |
|---|---|
| Data minimization | Claim-based verification (results, not raw data, on-chain) |
| Consent management | Integration hooks for consent capture during onboarding |
| Data residency | On-premises or Thailand-hosted cloud deployment |
| Data subject rights | Identity management with data export and deletion capability |
| Breach notification | Security event detection, incident management workflows |

### 8.4 Honest Limitations

In the spirit of the RFI's emphasis on candour:

- **DALP is not a custodian.** It orchestrates custody policy and integrates with custody providers, but it does not hold assets itself. SET or a licensed custodian must hold that responsibility.
- **DALP does not perform KYC/KYB verification.** It enforces claims issued by authorized verification providers. Integration with Thai KYC providers is required.
- **DALP does not operate a trading venue.** It provides settlement infrastructure and can connect to trading systems, but order matching and price discovery are SET's domain.
- **DALP does not provide legal opinions on SEC Thailand or Bank of Thailand compliance.** The platform provides configurable compliance tools. The specific rules configured require legal review by qualified Thai counsel.
- **HSM integration requires deployment-specific configuration.** While DALP supports HSM backends, the specific HSM hardware and configuration for SET's environment needs joint engineering.
- **ISO 20022 connectivity with BAHTNET requires integration work.** DALP provides ISO 20022 format compatibility, but direct BAHTNET connectivity requires implementation-specific development and testing with the Bank of Thailand's payment infrastructure.

---

## 9. Why SettleMint

### Relevant Experience

SettleMint is one of the few companies globally with live, multi-year production deployments of tokenized asset infrastructure at regulated banks and sovereign entities. This is not a claim about pilot programs or proof-of-concept exercises. It is a statement about operational infrastructure that has been running under institutional SLAs, regulatory scrutiny, and real transaction volumes.

For SET, this experience translates into:

- **Reduced delivery risk.** Reference architectures and integration patterns from comparable deployments accelerate implementation and reduce the probability of encountering novel technical challenges.
- **Regulatory familiarity.** Experience working within multiple APAC regulatory frameworks (MAS Singapore, JFSA Japan) provides understanding of the governance expectations, audit requirements, and compliance structures that SEC Thailand and Bank of Thailand mandate.
- **Operational maturity.** The operational tooling, runbooks, and support models in DALP were shaped by years of running institutional infrastructure, not by theoretical design exercises.

### Platform Completeness

Most vendors in this space offer one piece of the puzzle: an issuance platform, a custody solution, a compliance tool, or a settlement mechanism. SET would need to integrate multiple vendors, manage cross-vendor dependencies, and accept the operational risk of no single party being accountable for the end-to-end lifecycle.

DALP consolidates issuance, compliance, custody orchestration, settlement, and servicing into a single platform with a unified registry and control plane. This means:

- One vendor accountable for the asset lifecycle
- Consistent governance model across all operations
- Atomic operations that keep ownership, compliance, and custody synchronized
- Single audit trail from issuance to retirement

### Deployment Flexibility

SET operates in a jurisdiction with specific data residency and regulatory oversight requirements. DALP supports:

- On-premises deployment on SET's own infrastructure
- Thailand-hosted private cloud deployment
- Hybrid models with on-premises blockchain nodes and cloud-hosted application services
- Helm/Kubernetes-native deployment for operational consistency

This flexibility ensures that SET maintains full control over data location, infrastructure governance, and operational access, meeting both PDPA requirements and Bank of Thailand expectations for technology risk management.

### Standards-Based Architecture

DALP implements ERC-3643, an open, published token standard for regulated securities. This is not a proprietary protocol. It means:

- SET is not locked into SettleMint's token standard
- Interoperability with other ERC-3643 compliant systems is architecturally possible
- The compliance model is transparent and auditable against a published specification
- Ecosystem development can leverage standard tooling and libraries

### Commitment to Candour

This response distinguishes between live capabilities, configuration-dependent features, and areas requiring additional work. Where local legal analysis, market infrastructure approvals, or integration engineering is needed, this document says so. SettleMint's experience is that honest constraint mapping at the RFI stage prevents expensive surprises during implementation and builds the foundation for a productive working relationship.

SET is evaluating platforms for a strategic infrastructure decision. That evaluation is best served by accurate information about what exists, what requires configuration, and what requires additional work, rather than by optimistic claims that collapse under scrutiny during detailed design.

---

## Appendix A: Response to Information Request Table

| Req ID | Summary Response |
|---|---|
| IR-01 | Full lifecycle support through five integrated pillars. Section 4 details each capability. |
| IR-02 | Native maker-checker with RBAC (5 roles), audit logging. Section 5.2 details identity and access. |
| IR-03 | REST, GraphQL, oRPC, event webhooks. Section 5.1 details DAPI architecture. |
| IR-04 | 18 compliance modules configurable for SEC Thailand/BOT/PDPA. Section 8.3 maps alignment. |
| IR-05 | OnchainID with claim-based verification, KYC/KYB integration. Section 5.2 details approach. |
| IR-06 | Key Guardian with HSM, DFNS, Fireblocks. Section 8.1 details key management. |
| IR-07 | Unified on-chain registry, event-driven sync, subgraph projections. Section 6.2 covers reconciliation. |
| IR-08 | Grafana dashboards, three-pillar observability, automated alerting. Section 5.3 details stack. |
| IR-09 | On-premises, cloud, hybrid with Helm/Kubernetes. Section 9 covers deployment flexibility. |
| IR-10 | Multi-year regulated bank deployments in Asia, sovereign programs. Section 2 details credentials. |
| IR-11 | 18 compliance module types, configurable transfer restrictions. Section 4.3 details modules. |
| IR-12 | Environment separation, promotion controls, release governance. Section 7 covers phased approach. |
| IR-13 | API-driven integration with ERP/GL, treasury, payment rails. Section 6 details SET integration. |
| IR-14 | Configurable Token with 32 pluggable features, extensible metadata. Section 4.2 details templates. |
| IR-15 | Immutable on-chain records, audit logging, evidence export. Section 8.2 details audit capabilities. |
| IR-16 | Dependency mapping in Section 8.4 with honest limitation disclosure. |
| IR-17 | Kubernetes-native resilience, multi-region deployment. Detailed in Section 8.2. |
| IR-18 | Platform licensing supporting entity, jurisdiction, and product expansion. |
| IR-19 | Feature-flagged releases, regression testing, change governance. Section 7 covers approach. |
| IR-20 | Clear live vs. roadmap separation throughout this response. Section 8.4 exemplifies candour. |

## Appendix B: Contact Information

| Role | Contact |
|---|---|
| Primary Contact | SettleMint APAC Business Development |
| Product | DALP Product Team |
| Security and Compliance | SettleMint Security and Compliance Office |
| Commercial | SettleMint Commercial Team |
| Implementation | SettleMint Delivery and Architecture Team |

Specific contact details will be provided upon request from SET's procurement team.

## Appendix C: Glossary

| Term | Definition |
|---|---|
| DALP | Digital Asset Lifecycle Platform |
| DAPI | Durable API Service, DALP's integration and workflow layer |
| DvP | Delivery-versus-Payment, atomic settlement of asset and cash legs |
| XvP | Exchange-versus-Payment, multi-party atomic settlement |
| ERC-3643 | Open standard for regulated security tokens on EVM blockchains |
| OnchainID | Protocol for verifiable on-chain identity claims |
| RBAC | Role-Based Access Control |
| HTLC | Hash Time-Locked Contract for cross-chain settlement |
| Besu | Hyperledger Besu, an enterprise Ethereum client |
| Key Guardian | DALP's key management module |
| THB | Thai Baht |
| SET | Stock Exchange of Thailand |
| TSD | Thailand Securities Depository |
| SEC Thailand | Securities and Exchange Commission, Thailand |
| BOT | Bank of Thailand |
| PDPA | Personal Data Protection Act (Thailand) |
