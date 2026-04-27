# Digital Asset Lifecycle Platform for Central Banking

**Prepared for the Central Bank of the United Arab Emirates (CBUAE)**

**Prepared by SettleMint NV**

**Valid until: 15 September 2026**

**Contact:**

Matthew Van Niekerk, Co-founder and President

matthew@settlemint.com

---

# Executive Summary

The Central Bank of the UAE stands at a pivotal moment in the evolution of its monetary infrastructure. As digital currencies move from concept to operational reality across major economies, the CBUAE has the opportunity to establish sovereign digital currency infrastructure that strengthens monetary policy transmission, modernises interbank settlement, and positions the UAE as a leader in regulated digital finance.

The challenge facing the CBUAE is not whether to pursue digital currency infrastructure, but how to build it correctly. Pilot programmes and proofs of concept are straightforward to execute. Production-grade infrastructure that enforces regulatory controls, supports multi-party governance, delivers settlement finality, and operates under the scrutiny of international monetary standards is a fundamentally different undertaking. This is the complexity that separates a successful demonstration from a production system managing real monetary flows.

SettleMint proposes the Digital Asset Lifecycle Platform (DALP) as the foundation for the CBUAE's digital currency and settlement infrastructure. DALP provides production-ready capabilities for digital currency issuance, distribution, interbank settlement, compliance enforcement, and lifecycle management, all within a sovereign deployment model that keeps data and operations entirely within UAE infrastructure.

The proposed solution addresses four core CBUAE objectives:

- **Digital Dirham Infrastructure**: Issuance, distribution, and lifecycle management of a central bank digital currency with programmable monetary policy controls
- **Interbank Settlement Modernisation**: Atomic Delivery-versus-Payment (DvP) and Exchange-versus-Payment (XvP) settlement that eliminates counterparty risk and achieves T+0 finality
- **Regulatory Compliance Framework**: Ex-ante compliance enforcement where every transaction is validated against configurable policy rules before execution, not reviewed after
- **Sovereign Control**: On-premises or sovereign cloud deployment ensuring complete data sovereignty and operational independence

SettleMint brings nearly a decade of production experience deploying digital asset infrastructure for regulated banks, sovereign entities, and market infrastructure providers across Europe, the Middle East, and Asia Pacific. Active programmes include CBDC infrastructure for the State Bank of India, country-scale real estate tokenization for the Kingdom of Saudi Arabia, and FX settlement infrastructure for Maybank. The company holds ISO 27001 and SOC 2 Type II certifications and has passed security reviews at tier-1 financial institutions.

The proposed implementation follows a structured 19-week delivery methodology, phased from discovery through production go-live, with a dedicated hypercare period ensuring operational readiness. DALP can be deployed entirely within UAE-based infrastructure, providing the data sovereignty and operational control that a central bank requires.

---

# About SettleMint

## Company Overview

SettleMint is the production-grade digital asset lifecycle management company for regulated financial markets and sovereign use cases. Founded in 2016 and headquartered in Leuven, Belgium, SettleMint has grown from an early enterprise blockchain infrastructure provider into the platform company enabling financial institutions, market infrastructure providers, and sovereign entities to move real-world value on-chain with compliance, security, and operational reliability.

The company operates across three continents, with active programmes in Europe, the Middle East (including sovereign-scale programmes in the Gulf region), and Asia Pacific (including production deployments in Japan and Singapore).

## Credentials and Delivery Maturity

| Category | Evidence |
| --- | --- |
| Operational History | Nearly a decade of continuous operation in enterprise blockchain infrastructure, building since 2016 |
| Production Deployments | 7+ years of continuous production deployments at regulated banks in Asia and Europe |
| Sovereign Programmes | Active sovereign and national-scale programmes in the Middle East, including Saudi Arabia and Abu Dhabi |
| CBDC Experience | CBDC infrastructure delivery for the State Bank of India (e-Rupee programme) |
| Security Certifications | ISO 27001 certified, SOC 2 Type II certified |
| Institutional Validation | Passed security reviews, penetration testing, and vendor risk assessments at tier-1 financial institutions |

## Regulatory Readiness

SettleMint's platform supports compliance frameworks across multiple jurisdictions, with particular depth in the Gulf Cooperation Council region.

| Jurisdiction | Framework | DALP Support |
| --- | --- | --- |
| UAE / GCC | Regional regulatory frameworks, Islamic finance compatibility | Native support including Shariah-compliant structures |
| European Union | MiCA, MiFID II, GDPR | Pre-built compliance modules |
| Singapore | MAS framework | Production-validated modules |
| Japan | FSA compliance | Production-validated modules |
| United States | Reg D, Reg S, Reg CF | Pre-built compliance modules |

## Relevance to the CBUAE

SettleMint's combination of sovereign programme experience, CBDC delivery track record, Gulf region presence, and institutional security posture makes it uniquely positioned to support the CBUAE's digital infrastructure ambitions. The team brings direct experience with central bank requirements, interbank settlement workflows, and the governance expectations of monetary authorities.

---

# Understanding CBUAE's Requirements

## The Central Bank Digital Transformation Imperative

Central banks worldwide face a convergence of pressures that make digital currency infrastructure a strategic priority rather than an innovation experiment. The CBUAE operates in this context with specific characteristics that shape its requirements.

**Monetary Policy Modernisation.** Traditional monetary policy tools operate through intermediaries with inherent transmission delays. A digital dirham provides the CBUAE with programmable monetary policy instruments that can enforce interest rate corridors, manage liquidity reserves, and implement targeted monetary interventions with precision and speed that paper-based and legacy electronic systems cannot match.

**Interbank Settlement Efficiency.** The UAE's financial system processes significant daily interbank settlement volumes. Current settlement cycles introduce counterparty risk, require reconciliation infrastructure, and create liquidity buffers that tie up capital. Real-time, atomic settlement eliminates these inefficiencies while providing the CBUAE with complete visibility into settlement flows.

**Cross-Border Payment Infrastructure.** The UAE's position as a regional financial hub and its participation in initiatives such as Project mBridge require infrastructure that can support cross-border digital currency settlement with multiple central banks and correspondent banking networks.

**Regulatory and Supervisory Technology.** Digital infrastructure provides the CBUAE with supervisory capabilities that are impossible with legacy systems: real-time transaction monitoring, programmable compliance controls, and deterministic policy enforcement that operates at the transaction level rather than through periodic reporting.

**Financial Inclusion and Innovation.** A digital dirham can extend the reach of the formal financial system, support new payment models, and provide a foundation for private sector innovation under the CBUAE's regulatory oversight.

## Core Requirement Domains

| Domain | Requirements |
| --- | --- |
| Digital Currency Issuance | Sovereign digital currency (digital dirham) issuance, distribution to licensed financial institutions, lifecycle management including supply management, monetary policy controls |
| Interbank Settlement | Real-time gross settlement with atomic finality, DvP for securities settlement, multi-party settlement coordination |
| Compliance and Governance | Configurable policy rules enforced before transaction execution, multi-party governance with separation of duties, full audit trail for regulatory examination |
| Identity and Participant Management | On-chain identity for all participants (banks, financial institutions, approved entities), role-based access with granular permission controls |
| Supervisory Capabilities | Real-time monitoring of system-wide transaction flows, configurable alerts, analytics for monetary policy assessment |
| Data Sovereignty | All data and operations within UAE sovereign infrastructure, no dependency on external cloud services or foreign-controlled systems |
| Integration | Connectivity with existing CBUAE systems including RTGS, payment infrastructure, and regulatory reporting frameworks |

## Design Principles

The following principles guide the proposed solution architecture:

- **Sovereignty first**: The CBUAE retains complete control over infrastructure, data, and operational decisions
- **Compliance by design**: Regulatory controls are embedded in the platform, not applied as an afterthought
- **Institutional governance**: Multi-party governance models reflect the operational reality of central banking, with separation between monetary policy, operations, compliance, and technology functions
- **Interoperability**: The platform integrates with existing CBUAE systems and supports future cross-border connectivity
- **Operational resilience**: The infrastructure meets the availability and disaster recovery requirements of critical national financial infrastructure

---

# DALP Platform Overview

## What DALP Is

DALP, the Digital Asset Lifecycle Platform, is SettleMint's production-grade platform for designing, launching, and operating digital assets across financial instruments and real-world assets. Unlike point solutions that address only issuance, only custody, or only settlement, DALP provides a unified platform covering the full digital asset lifecycle under a single governance model, security posture, and operating framework.

For the CBUAE, DALP serves as the infrastructure layer for digital currency operations: from digital dirham issuance through distribution, interbank settlement, compliance enforcement, supervisory monitoring, and lifecycle management. The platform sits between the CBUAE's existing financial infrastructure and the blockchain network, providing the governance and orchestration layer that enables compliant, auditable digital currency operations.

## Architecture

DALP is built as a four-layer stack with distinct responsibility boundaries:

| Layer | Role | CBUAE Relevance |
| --- | --- | --- |
| Application | Operational interface for administrators, compliance officers, and supervisory staff | Dashboard for CBDC monitoring, participant management, and policy administration |
| API | Programmatic access for external systems via OpenAPI 3.1, TypeScript SDK, and webhooks | Integration with CBUAE's RTGS, payment systems, and regulatory reporting |
| Middleware | Workflow orchestration, key management, transaction signing, event indexing | Durable transaction processing with exactly-once semantics for settlement finality |
| Smart Contract | On-chain compliance, identity, and asset logic built on the ERC-3643 (T-REX) standard | Programmable monetary policy controls, ex-ante compliance enforcement |

Requests flow through these layers sequentially. Each layer independently enforces its own security controls, so no single-layer failure grants unauthorised access to monetary infrastructure.

## Core Capabilities for Central Banking

### Issuance and Supply Management

DALP's Asset Designer enables the CBUAE to configure digital dirham parameters through a guided process: supply limits, distribution rules, denomination structure, and governance permissions. Configuration replaces custom development; the CBUAE defines the monetary instrument's properties and deploys it through a validated, audited deployment pipeline. Supply management operations (minting, burning, reserve management) operate under multi-party governance controls with full audit logging.

### Compliance and Policy Enforcement

Every transaction in DALP passes through a deterministic policy evaluation engine that validates eligibility, identity claims, and policy constraints at the smart contract layer before execution. If a transfer would violate any configured rule, it reverts atomically. There is never a state where a non-compliant transaction exists on the ledger.

DALP provides 18 configurable compliance module types covering eligibility verification, transfer restrictions, supply limits, holding period enforcement, and participant controls. For the CBUAE, these modules can enforce monetary policy parameters such as daily transaction limits, institutional reserve requirements, and cross-border transfer controls.

### Settlement

DALP's atomic Delivery-versus-Payment (DvP) settlement ensures that asset and payment legs complete together or both revert, achieving true T+0 finality with zero counterparty risk. The XvP (Exchange-versus-Payment) settlement module extends this to multi-party, multi-asset atomic settlement, relevant for interbank clearing where multiple institutions participate in coordinated settlement cycles.

Settlement can operate both within a single network (for domestic interbank settlement) and across networks using Hash Time-Locked Contract (HTLC) cryptography for cross-border settlement scenarios.

### Identity and Participant Management

Every participant in DALP, whether a licensed bank, financial institution, or approved entity, is represented by an on-chain identity contract based on the OnchainID protocol. Claims about participants (licensing status, regulatory classification, jurisdictional authorisation) are issued by trusted third parties and verified at execution time, not only at onboarding. This continuous compliance model ensures that a participant's eligibility is a live condition, reflecting the current regulatory status rather than a historical onboarding check.

### Monitoring and Supervisory Tools

DALP includes enterprise-grade monitoring that provides the CBUAE with real-time visibility into system operations. API monitoring tracks request volumes, error rates, and response times. Blockchain monitoring tracks network health, block production, and indexer status with hysteresis-based health classification that prevents false alerts. A complete, colour-coded on-chain audit trail records every action with timestamps, transaction hashes, and operational context.

## Standards and Protocols

| Category | Standards |
| --- | --- |
| Token Standards | ERC-20, ERC-3643 (T-REX) for regulated instruments |
| Identity | OnchainID (ERC-734/735) for verifiable on-chain identities |
| Compliance | 18 module types, ex-ante enforcement |
| Settlement | Atomic DvP/XvP, HTLC for cross-chain settlement |
| Payment Rails | ISO 20022 integration (SWIFT, SEPA, RTGS connectivity) |
| Blockchain | Any EVM-compatible network, including private permissioned networks |

---

# Proposed Solution

## Solution Architecture for CBUAE

The proposed solution positions DALP as the core digital currency infrastructure layer for the CBUAE, deployed on a sovereign permissioned blockchain network within UAE infrastructure.

### Digital Dirham Infrastructure

The digital dirham is implemented as a configurable token on DALP with central bank-specific parameters:

- **Issuance authority**: The CBUAE holds exclusive minting and burning authority through the Supply Management role, with multi-party governance requiring sign-off from designated monetary policy officers
- **Distribution model**: Licensed banks and financial institutions receive digital dirham allocations through controlled distribution channels, with each institution's allocation governed by configurable limits
- **Supply controls**: Programmable supply management enforces total supply limits, distribution quotas, and reserve requirements at the smart contract level
- **Denomination asset**: The digital dirham serves as the settlement currency for all DvP and XvP operations on the platform, establishing the settlement relationship at the infrastructure level

### Interbank Settlement

DALP's XvP settlement module provides the CBUAE with a modernised interbank settlement infrastructure:

- **Atomic settlement**: Both legs of any interbank transaction complete together or both revert, eliminating settlement risk
- **Multi-party coordination**: Settlement involving multiple banks is coordinated through a multi-party approval workflow where each counterparty confirms participation before execution
- **Real-time finality**: T+0 settlement replaces traditional T+1 or T+2 cycles, releasing liquidity and reducing capital buffers
- **Securities settlement**: Tokenized government bonds or sukuk can be settled against digital dirham through atomic DvP, ensuring simultaneous delivery and payment

The settlement infrastructure integrates with the CBUAE's existing RTGS framework through DALP's API layer, enabling a gradual transition from legacy settlement to blockchain-based settlement without requiring wholesale replacement of existing systems.

### Regulatory Reporting and Supervisory Controls

DALP provides the CBUAE with supervisory capabilities embedded directly into the infrastructure:

- **Real-time transaction monitoring**: Every transaction is visible to the CBUAE through the monitoring dashboard and configurable alert rules
- **Policy enforcement**: Monetary policy parameters (transaction limits, reserve ratios, cross-border controls) are enforced programmatically before transaction execution
- **Audit trail**: A complete, immutable record of every action, from participant onboarding to settlement execution, is maintained on-chain with timestamps and operational context
- **Analytics**: Portfolio insights, transaction volume analytics, and participant activity dashboards provide the CBUAE with the data needed for monetary policy assessment

### Configurable Compliance Framework

The compliance framework is configured to reflect the CBUAE's regulatory requirements:

| Control Type | CBUAE Application |
| --- | --- |
| Identity Verification | Mandatory verification of all participating institutions through OnchainID with CBUAE as a trusted issuer |
| Participant Allowlist | Only CBUAE-licensed institutions can hold and transfer digital dirham |
| Transaction Limits | Configurable daily, weekly, and per-transaction limits per participant category |
| Supply Management | Total supply controls with CBUAE-only minting authority |
| Transfer Controls | Cross-border transfer restrictions configurable by counterparty jurisdiction |
| Holding Period | Configurable lock-up periods for specific instrument types (e.g., government securities) |

All compliance controls operate at the smart contract layer and cannot be bypassed by the application layer. Configuration changes require the Governance role and are logged immutably for audit purposes.

### Cross-Border Settlement Readiness

The CBUAE's role in regional and international payment initiatives requires infrastructure that supports cross-border digital currency settlement. DALP's HTLC-based cross-chain settlement enables atomic exchanges between the CBUAE's domestic network and participating foreign central bank networks. The hashlock/secret mechanism ensures that cross-chain execution is secured by cryptography: either both legs execute or neither does.

ISO 20022 message format support enables integration with SWIFT, SEPA, and RTGS payment infrastructure for the cash-leg of cross-border settlements, providing a standards-based bridge between traditional and digital settlement rails.

---

# Security and Compliance

## Defence-in-Depth Security Architecture

DALP enforces security at every layer independently, ensuring that no single-layer failure grants unauthorised access to the CBUAE's monetary infrastructure.

**Layer 1: Authentication.** Support for multiple authentication methods including email/password, passkeys (WebAuthn with hardware security keys), LDAP/Active Directory integration, OAuth 2.0/OIDC, and SAML 2.0. Sessions use HTTP-only cookies with SameSite protection. Every authentication event is logged with timestamp, method, and result.

**Layer 2: Authorisation.** A dual-layer permission model where off-chain platform roles and on-chain smart contract roles must both pass for any operation. 26 distinct roles across four layers enforce separation of duties appropriate to central bank operations, where monetary policy, operations, compliance, and technology functions must operate with clear boundaries.

**Layer 3: Wallet Verification.** Step-up authentication for all blockchain write operations via PIN, TOTP, or backup codes. Even with a valid session, no transaction executes without wallet verification. There is no administrative override that bypasses this control.

**Layer 4: Compliance Enforcement.** ERC-3643 compliance modules validate every transfer against identity, jurisdiction, and policy rules at the smart contract level. Non-compliant states cannot exist on-chain.

**Layer 5: Custody Policy.** External custody providers or HSM-backed signing impose additional approval gates for cryptographic operations.

## Key Management

The Key Guardian service manages cryptographic key material through defence-in-depth with multiple storage backends. For the CBUAE deployment, Hardware Security Module (HSM) integration provides FIPS 140-2 Level 3 protection for all signing keys. Keys never leave the HSM boundary in plaintext. Key rotation, recovery, and revocation procedures are built into the platform with full audit logging.

## Certifications and Assurance

| Certification | Status |
| --- | --- |
| ISO 27001 | Certified |
| SOC 2 Type II | Certified |
| Penetration Testing | Regular independent third-party testing |
| Smart Contract Audits | Independent security review of SMART Protocol contracts |

## Audit Trail and Regulatory Examination Readiness

DALP maintains a complete, immutable audit trail of every action: authentication events, authorisation decisions, configuration changes, transaction execution, compliance enforcement, and key management operations. Audit logs are retained according to regulatory requirements and stored in tamper-evident format. This audit infrastructure is designed to withstand the scrutiny of regulatory examination years after the fact, meeting the evidentiary standards that central bank supervisors require.

---

# Deployment and Infrastructure

## Recommended Deployment Model: On-Premises with Sovereign Control

For the CBUAE, SettleMint recommends an on-premises deployment within the CBUAE's own data centre infrastructure. This model provides maximum control over the entire technology stack, complete data sovereignty, and the ability to operate in an air-gapped configuration if required.

All DALP deployment models deliver identical platform capabilities. The on-premises model is recommended specifically because the CBUAE's requirements for data sovereignty, operational independence, and control over critical national financial infrastructure are best served by infrastructure that resides entirely within the CBUAE's physical and administrative control.

## Infrastructure Architecture

| Component | Specification |
| --- | --- |
| Kubernetes Cluster | Kubernetes 1.29+ or OpenShift 4.16+, minimum 6 nodes distributed across availability zones |
| Compute | 8 vCPU / 32 GB RAM per node (recommended for production workloads) |
| Database | PostgreSQL 17.x with high-availability configuration, point-in-time recovery |
| Cache | Redis 8.x with TLS encryption, AUTH, and persistence |
| Key Management | Hardware Security Module (HSM) for FIPS 140-2 Level 3 key protection |
| Blockchain Network | Private Hyperledger Besu network with IBFT 2.0 or QBFT consensus, 4 validator nodes + 2 RPC nodes |
| Observability | Full monitoring stack (Grafana, VictoriaMetrics, Loki, Tempo) deployed within the cluster |
| Storage | SSD-backed storage for PostgreSQL, S3-compatible object storage for documents and backups |

## Blockchain Network

The proposed blockchain network is a private, permissioned Hyperledger Besu deployment under the CBUAE's sole control. This provides:

- **Configurable consensus**: IBFT 2.0 or QBFT with sub-second finality
- **Zero transaction costs**: Gas fees are configurable or zero on private networks
- **Full privacy**: No transaction visibility outside the CBUAE's authorised participants
- **Complete operational control**: The CBUAE controls consensus parameters, block time, gas limits, and participant access
- **DALP contracts pre-deployed at genesis**: The platform is operational immediately after network provisioning

## High Availability and Disaster Recovery

| Scenario | RTO | RPO |
| --- | --- | --- |
| Cloud-native (multi-AZ) | 2 to 15 minutes | Seconds to 1 minute |
| Hot-warm (geographic redundancy) | 30 to 180 minutes | 5 to 60 minutes |

For critical national infrastructure, SettleMint recommends a hot-warm configuration with a geographically separated standby cluster. Validator keys are pre-staged in the standby cluster, and continuous PostgreSQL replication ensures minimal data loss during failover.

## Environment Strategy

Three environments are provisioned: development (for iterative configuration and testing), staging (for integration testing and pre-production validation), and production (for live operations). Each environment runs the full DALP stack independently.

---

# Implementation Approach

## Delivery Methodology

SettleMint follows a structured, phase-gated implementation methodology refined through production deployments with central banks, regulated banks, and sovereign entities. The standard implementation spans 19 weeks from kickoff to the end of hypercare.

| Phase | Duration | Objective | Key Deliverables |
| --- | --- | --- | --- |
| Discovery and Requirements | 2 weeks | Requirements capture, architecture design, regulatory mapping | Business Requirements Document, Regulatory and Compliance Matrix, Target Architecture, Implementation Roadmap |
| Foundation and Setup | 3 weeks | Environment provisioning, network setup, identity framework | Provisioned environments, blockchain network, RBAC configuration, key management setup |
| Configuration and Compliance | 4 weeks | Digital dirham configuration, compliance modules, operational workflows | Configured digital currency instrument, compliance rules, participant onboarding workflows |
| Integration and Testing | 4 weeks | RTGS integration, functional/security/performance testing, UAT | Integrated system, test reports, security assessment, go-live readiness assessment |
| Go-Live and Hypercare | 6 weeks | Production deployment (2 weeks) + intensive post-go-live support (4 weeks) | Production system, knowledge transfer, support transition |

Each phase concludes with a formal gate review. Progression requires sign-off from both SettleMint and the CBUAE on defined deliverables and acceptance criteria.

## Phased Rollout Strategy

Given the critical nature of central bank infrastructure, SettleMint proposes a phased approach to production deployment:

**Phase A: Core Digital Dirham (Months 1 to 5).** Deploy the foundational digital dirham infrastructure with issuance, distribution to a pilot group of licensed banks, and basic interbank settlement. This phase validates the core monetary operations in a controlled production environment.

**Phase B: Settlement Expansion (Months 6 to 8).** Extend settlement capabilities to include DvP for government securities, multi-party XvP settlement, and integration with the CBUAE's RTGS framework. Onboard additional participating institutions.

**Phase C: Advanced Capabilities (Months 9 to 12).** Deploy cross-border settlement readiness, advanced supervisory analytics, and expanded monetary policy controls. Full production scaling with all licensed institutions participating.

## Governance and Resource Model

| Role | SettleMint | CBUAE |
| --- | --- | --- |
| Delivery Lead | Owns execution, risk tracking, phase gates | Project Manager owns governance, decision flow |
| Solution Architect | Architecture design, compliance module configuration | Technical Lead provides architectural alignment |
| Platform Engineers | Environment provisioning, deployment, integration | DevOps/Infrastructure provides environment access |
| QA/Test Lead | Structured test planning, execution | Compliance/Risk validates policy rules, UAT participation |

## Training and Knowledge Transfer

SettleMint delivers a structured training programme across three tracks: Administrator Training (3 to 4 days covering platform operations, compliance administration, monitoring), Developer Training (4 to 5 days covering API integration, settlement workflows, security practices), and End-User Training (2 days covering dashboard operations, participant management, reporting). Training is integrated into the implementation lifecycle and formalised during the hypercare period.

---

# References

## Reference Portfolio

SettleMint has delivered digital asset infrastructure across 14 engagements spanning banking, sovereign institutions, capital market infrastructure, and specialised finance. The following references are most relevant to the CBUAE's requirements.

| Client | Region | Use Case | Year |
| --- | --- | --- | --- |
| State Bank of India | South Asia | CBDC infrastructure (e-Rupee) | 2024-present |
| Saudi Arabia RER | Middle East | Country-scale real estate tokenization | 2024-present |
| Maybank (Project Photon) | Southeast Asia | FX tokenization and cross-border settlement | 2025-2026 |
| Standard Chartered Bank | Asia, Africa, Middle East | Digital Virtual Exchange, securities tokenization | 2023-2024 |
| Commerzbank | Europe | Exchange-traded products, near real-time settlement | 2024-2025 |
| Sony Bank | Japan | Stablecoin issuance and digital identity | 2024 |
| Islamic Development Bank | Multi-region (57 countries) | Subsidy distribution, market stabilisation | 2023-2024 |

## Key Reference: State Bank of India, CBDC Infrastructure

The State Bank of India, India's largest bank, selected SettleMint to provide CBDC infrastructure for the e-Rupee programme. SettleMint delivers the CBDC infrastructure layer, with DALP managing token issuance, distribution, and lifecycle operations. The architecture is designed for the transaction volumes and security requirements of a national digital currency. The pilot phase completed successfully, and production deployment is underway. This programme directly validates SettleMint's ability to deliver central bank digital currency infrastructure at national scale.

## Key Reference: Saudi Arabia RER, Sovereign-Scale Programme

The Real Estate General Authority (REGA) of the Kingdom of Saudi Arabia selected SettleMint as delivery partner for a national-scale blockchain infrastructure for property registration, fractionalization, and a regulated digital marketplace. Four PropTechs are live in production since January 2026. This programme demonstrates SettleMint's capacity to operate within a sovereign government framework in the Gulf region, integrate with national identity and payment infrastructure, and deliver at country scale.

---

# Support and SLA

## Support Model

SettleMint provides tiered support designed for regulated institutions where uptime and operational continuity are non-negotiable.

For the CBUAE's critical national infrastructure, SettleMint recommends the Enterprise Support tier:

| Attribute | Enterprise Support |
| --- | --- |
| Coverage Hours | 24/7/365 |
| P1 Response Time | 15 minutes |
| P1 Resolution Target | 2 hours |
| Uptime SLA | 99.99% monthly (~4.3 minutes maximum monthly downtime) |
| Support Channels | Email, portal, dedicated Slack/Teams channel, phone, video escalation |
| Designated Team | Named support team with deep familiarity of the CBUAE deployment |
| Architecture Reviews | Quarterly with Solution Architect |
| Release Cadence | Continuous delivery with staged rollouts |

## Severity Levels

| Severity | Classification | Response (Enterprise) | Resolution (Enterprise) |
| --- | --- | --- | --- |
| P1: Critical | Production down, compliance enforcement failure, settlement failure | 15 minutes | 2 hours |
| P2: High | Major degradation, identity verification failure, integration failure | 1 hour | 4 hours |
| P3: Medium | Workaround available, non-critical impact | 4 hours | 2 business days |
| P4: Low | Minor, cosmetic, enhancement request | 1 business day | 3 business days |

## Ongoing Relationship

Beyond incident support, the Enterprise tier includes bi-weekly operational reviews, quarterly architecture reviews with a Solution Architect, proactive monitoring with capacity planning and trend analysis, and continuous platform updates with staged rollouts and preview environments. SettleMint assigns a named Customer Success Manager to the CBUAE engagement, ensuring continuity and strategic alignment throughout the operational relationship.
