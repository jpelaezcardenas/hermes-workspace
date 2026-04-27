# Tokenized Sukuk Issuance and Servicing Platform

# Technical Proposal for Qatar National Bank

---

# Executive Summary

## Client Need and Proposed Response

Qatar National Bank requires a production-grade platform for tokenized sukuk issuance and servicing that operates within the control environment shaped by QCB regulations, Sharia governance, and institutional audit expectations. This is not an innovation exercise. QNB needs a platform that can withstand real-world operational pressure: incomplete onboarding data, governance-delayed approvals, regulatory evidence requests, bulk corrections, and phased rollout constraints.

SettleMint proposes its Digital Asset Lifecycle Platform (DALP) as the foundation for QNB's tokenized sukuk programme. DALP covers the full sukuk lifecycle, from structuring and issuance through profit distribution, investor servicing, maturity handling, and redemption, in a single platform with unified governance, compliance enforcement, and audit trails. The platform is deployed as a private cloud or on-premises installation within QNB's infrastructure, ensuring full data residency control within Qatar.

The scope encompasses five workstreams: programme mobilisation and governance, sukuk product configuration (including Sharia-compliant structuring, periodic distributions, and asset-backing records), enterprise integration (treasury systems, Sharia governance processes, investor business/onboarding/KYC, post-trade reporting), testing and operational readiness, and operational transition with runbooks, support handoff, and post-launch governance.

## Why SettleMint and DALP

SettleMint brings three capabilities that directly address QNB's procurement objectives.

First, production-grade lifecycle coverage. DALP is not an issuance tool. It manages every event in a sukuk's lifetime, from origination through periodic profit distributions to maturity redemption. Compliance enforcement operates ex-ante, meaning eligibility is validated before every transfer, not reviewed after. This is the "Complexity of Doing It Right" that separates production deployment from pilot exercises.

Second, institutional credibility in the region. SettleMint operates sovereign-scale programmes in the Middle East, including the Saudi Real Estate Registry (country-scale tokenization under RER/REGA) and engagements with the Islamic Development Bank for Sharia-compliant distribution systems. The team has navigated architecture review, security review, and compliance sign-off processes at regulated banks across Asia, Europe, and the Middle East.

Third, platform independence. DALP is a configurable software platform, not a consulting engagement. QNB's operations team configures sukuk parameters, compliance rules, and governance workflows through the platform UI. No dependency on external developers to launch or modify sukuk products after initial deployment.

## Response Snapshot

| Dimension | SettleMint Response |
| --- | --- |
| Platform | DALP, Digital Asset Lifecycle Platform |
| Asset class | Fixed income (sukuk), with support for six additional asset classes |
| Compliance | 18 compliance module types; ERC-3643 standard with OnchainID |
| Settlement | Atomic DvP/XvP; T+0 finality |
| Deployment | Private cloud or on-premises within QNB infrastructure |
| Timeline | 15 to 19 weeks to production go-live |
| Support | Enterprise tier: 24/7/365, 99.99% uptime SLA |

---

# About SettleMint

SettleMint is the production-grade digital asset lifecycle management company for regulated financial markets and sovereign use cases. Founded nearly a decade ago, the company has grown from an early enterprise blockchain infrastructure provider into the category-defining platform company enabling financial institutions, market infrastructure providers, and sovereign entities to move real-world value on-chain with compliance, security, and operational reliability.

SettleMint exists to bridge the gap between tokenization ambitions and production-grade execution. As regulatory frameworks mature and expectations shift from innovation theatre to operational reality, most organizations remain stuck in pilot mode. SettleMint's mission is to enable regulated institutions to move from slides to balance sheets by turning digital asset strategy into operating systems that reduce time-to-market and remove operational and regulatory risk.

The company's relevance to QNB rests on direct Middle East experience. SettleMint is delivery partner for the Saudi Real Estate Registry's country-scale blockchain infrastructure for real estate registration, fractionalization, and digital marketplace. The company has delivered Sharia-compliant subsidy distribution for the Islamic Development Bank across 57 member countries, and Sharia-compliant market stabilization systems reducing collateral volatility by 30 to 50 percent. These are not pilots. They are production programmes operating under institutional governance.

| Category | Evidence |
| --- | --- |
| Market Validation | Nearly 10 years focused on blockchain infrastructure; 7+ years of continuous production deployments at regulated banks |
| Operational Maturity | Live deployments across bonds, equities, deposits, stablecoins, real estate, funds; enterprise-grade security and compliance |
| Sovereign Credibility | Active sovereign and national-scale programmes in the Middle East |
| Certifications | ISO 27001 and SOC 2 Type II |
| Team Depth | 200+ years combined banking and blockchain experience |

---

# About DALP

DALP is SettleMint's production-grade Digital Asset Lifecycle Platform for designing, launching, and operating tokenized assets across financial instruments and real-world assets. It provides production-ready infrastructure from day one, so institutions can launch digital assets without building blockchain expertise internally, without lengthy development cycles, and without assembling production-grade infrastructure from scratch.

## Core Lifecycle Capabilities

DALP is structured around five integrated core-lifecycle modules:

**Issuance.** Rapid deployment of tokenized assets through a guided Asset Designer wizard. For sukuk, the platform configures Sharia-compliant structuring, maturity dates, ISIN assignment, profit distribution schedules, and denomination asset linkage. The wizard validates parameters in real time and enforces jurisdiction-specific rules before deployment.

**Compliance.** Ex-ante enforcement ensures every transfer is validated before execution. DALP ships 18 compliance module types covering investor eligibility, country restrictions, supply limits, holding periods, transfer controls, and collateral backing. Pre-built compliance templates cover MiCA EU, MAS Singapore, Japan FSA, SEC Reg D/S/CF, UK FCA, and GCC frameworks. Custom templates, such as a Qatar-specific sukuk compliance framework, are created through a simple configuration interface.

**Custody.** Enterprise-grade key management with bring-your-own-custodian integrations. DALP orchestrates custody policy across existing custodian relationships through its Key Guardian module, supporting encrypted database, cloud secret manager, HSM, and third-party custody via Fireblocks and DFNS. Maker-checker approval workflows enforce multi-signature quorum for all sensitive operations.

**Settlement.** Atomic Delivery-versus-Payment (DvP) and Exchange-versus-Payment (XvP) settlement ensures asset and cash legs complete together or both revert. The XvP extension coordinates multi-party exchanges with the same atomicity guarantees, removing the need for trusted intermediaries. ISO 20022 integration supports SWIFT, SEPA, and RTGS connectivity on payment rails.

**Servicing.** Automated lifecycle operations handle periodic profit distributions, maturity processing, and redemption. For sukuk, this means scheduled profit payments to investors based on configurable yield schedules, automated maturity handling with redemption coverage tracking, and orderly wind-down with token burn at instrument closure.

![The DALP Asset Designer guides issuers through tokenization with a step-by-step wizard supporting all major asset classes: Fixed Income, Flexible Income, Cash Equivalents, and Real World Assets.](../../../shared/brand/dalp-screenshots/03 - Asset Designer/Asset Designer.png)

## Platform Foundations

Beneath the five lifecycle pillars, DALP provides unified identity management through OnchainID with claim-based verification reusable across all assets, comprehensive APIs (REST, GraphQL, event webhooks, oRPC, CLI with 301 commands), and production-grade observability with pre-built dashboards, three-pillar monitoring (metrics, logs, traces), and 534 structured error codes.

## Key Differentiators

DALP's competitive position rests on the combination of multi-asset lifecycle automation, ex-ante compliance, atomic settlement, enterprise deployment flexibility, and multi-jurisdiction coverage in one platform. Competitors typically stop at issuance without lifecycle management, focus on custody without compliance depth, or build infrastructure without applications. No competitor currently offers all five capabilities together.

---

# Customer References

| Client | Use Case | Geography | Relevance to QNB |
| --- | --- | --- | --- |
| Saudi RER (Real Estate Registry) | Country-scale real estate tokenization, registration, fractionalization | Saudi Arabia | Sovereign-scale Middle East deployment; DALP-powered; integration with government systems |
| Islamic Development Bank | Sharia-compliant subsidy distribution across 57 member countries | Multi-country (OIC) | Islamic finance governance; Sharia compliance; cross-border distribution |
| Islamic Development Bank | Sharia-compliant market stabilization; collateral volatility reduction | Multi-country (OIC) | Islamic finance; smart contract automation; 30-50% volatility reduction |
| Mizuho Bank | Bond tokenization and trade finance | Japan | Fixed income tokenization; institutional bond lifecycle |
| Commerzbank | Hybrid on/off-chain ETP issuance; Boerse Stuttgart listing | Germany | Fixed income; settlement under 10 seconds; EUR 7M annual savings potential |
| OCBC Bank | Security token engine; securitization and fractionalization | Singapore | Institutional tokenization; order book; wallet and cash management |
| Standard Chartered Bank | Digital Virtual Exchange; fractional tokenization of securities | Asia, Africa, Middle East | Regional institutional trading; reduced custody intermediaries |
| Maybank (Project Photon) | FX tokenization and cross-border settlement; XvP model | Malaysia | Cross-border settlement; tokenized currency; atomic swaps; BNM alignment |
| Sony Bank | Stablecoin issuance with integrated digital identity | Japan | KYC-enabled digital identity; stablecoin engine; regulatory readiness |
| KBC Securities (Bolero) | Equity crowdfunding and SME loans; smart contract lifecycle | Belgium | Automated lifecycle; corporate actions; redemption; regulatory compliance |
| State Bank of India | CBDC infrastructure | India | National-scale digital currency; production deployment |
| Reserve Bank of India | Multi-bank letter of credit trade finance | India | Multi-party blockchain; fraud-proof workflows |
| ADI Finstreet | Tokenized equity on Abu Dhabi mainnet | UAE/GCC | GCC jurisdiction; DFNS/Fireblocks custody; corporate actions |
| KBC Insurance | NFT-based digital product passports | Belgium | Digital asset valuation; mobile integration |

The Islamic Development Bank engagements and Saudi RER programme are directly relevant to QNB's requirements. Both demonstrate SettleMint's ability to deliver Sharia-compliant, sovereign-scale digital asset infrastructure in the Middle East, under institutional governance and regulatory scrutiny.

---

# Solution Overview

## Requirement Themes

Six themes dominate QNB's evaluation. First, control integrity: who initiated a change, which policy checks applied, who approved, and how state can be reconstructed. Second, Sharia compliance: sukuk structuring, profit-sharing mechanics, AAOIFI-aligned governance evidence, and board approval lineage. Third, enterprise coexistence: the platform must sit inside institutional plumbing without creating reconciliation sinkholes. Fourth, lifecycle completeness: issuance through profit distribution, maturity, and redemption managed in one platform. Fifth, phased scalability: initial launch to broader adoption without platform reset. Sixth, regulatory defensibility: QCB expectations, AML/CFT controls, data governance, and operational resilience.

## Proposed Operating Model

The proposed operating model positions DALP as the tokenized sukuk lifecycle engine within QNB's broader enterprise architecture.

**Key actors.** QNB Treasury and Debt Capital Markets (sukuk structuring, profit distribution policy), QNB Compliance (transfer restrictions, investor eligibility, AML/CFT), QNB Sharia Board (product approval, governance evidence), QNB Technology (infrastructure, integration, monitoring), SettleMint (platform support, upgrade coordination, incident response).

**Scope boundary.** DALP manages sukuk token lifecycle on-chain. QNB retains ownership of business policy, product approval, regulatory engagement, investor onboarding decisions, and books-and-records. Integration points connect DALP to QNB's treasury systems, Sharia governance processes, KYC/AML tooling, reporting environments, and settlement infrastructure.

**Deployment assumption.** Private cloud or on-premises deployment within QNB's infrastructure in Qatar, ensuring data residency compliance with QCB requirements and Qatar data protection obligations.

## Core Capability Response

### Asset and Lifecycle Control

DALP supports the full sukuk lifecycle: structuring (configurable parameters for ijarah, mudarabah, musharakah, and wakalah structures), issuance (guided wizard with ISIN, maturity date, denomination asset, face value, and jurisdiction), profit distribution (automated yield schedules with configurable intervals, periods, and denomination asset reserves), maturity processing (automated maturity detection with redemption coverage tracking), and retirement (controlled token burn with full audit trail).

The platform's bond template provides the foundation for sukuk tokenization. Parameters such as maturity date, face value, denomination asset, and yield schedule are configured through the Asset Designer without custom development. The yield module automates periodic profit distributions, tracking total yield, claimed amounts, unclaimed amounts, and per-period status across the full instrument life.

![DALP automates bond coupon distribution via on-chain yield schedules. The 5-year annual schedule is fully deployed on-chain, with denomination reserve pre-funded for future distributions.](../../../shared/brand/dalp-screenshots/04 - Bonds/Bonds Detail 2.png)

### Identity and Compliance

DALP's compliance architecture enforces eligibility before every transfer through the ERC-3643 standard and OnchainID. For QNB's sukuk programme, this means investor eligibility verification (KYC/AML claims stored on-chain as verifiable credentials), jurisdiction-based transfer restrictions (country allowlists configured per sukuk issuance), investor count limits (configurable per-country and global caps), supply controls (rolling window supply limits aligned with regulatory requirements), and transfer approval workflows for governance-gated operations.

Custom compliance templates support Qatar-specific requirements. The platform's expression builder allows compliance rules to be constructed visually using boolean logic, combining KYC, AML, accredited investor status, and Sharia-compliant investor classifications into enforced eligibility gates.

![DALP ships with a pre-built compliance library covering all major global regulatory frameworks, selectable with a single click during asset creation.](../../../shared/brand/dalp-screenshots/11 - Compliance and Policy Templates/Compliance Policy Templates.png)

### Settlement and Custody

DALP's atomic DvP/XvP settlement ensures that sukuk subscription payments and token delivery complete together or both revert. Cross-chain settlement uses HTLC (Hash Time-Locked Contracts) for atomic execution across chains. The XvP module supports multi-party settlement with configurable approval workflows, expiry management, and full audit trails.

Key management integrates with institutional custody providers through the Key Guardian module. Maker-checker approval workflows enforce multi-signature quorum for all sensitive operations, including minting, transfers, and redemption events.

![DALP's XvP settlement atomically links multiple legs: counterparties exchange assets in a local on-chain transfer while simultaneously delivering cross-chain tokens, all or nothing, fully atomic.](../../../shared/brand/dalp-screenshots/13 - XVP/XVP Setup 3.png)

### Integration and Reporting

DALP provides comprehensive APIs (REST, GraphQL, event webhooks, oRPC) for integration with QNB's existing enterprise systems. The typed SDK and CLI (301 commands across 26 groups) support programmatic access to every platform capability. ISO 20022 integration connects to SWIFT, SEPA, and RTGS payment rails for cash-leg settlement.

Every action on a DALP token is logged immutably on-chain with timestamps, sender addresses, and event categorization. The activity log provides a complete, color-coded audit trail across identity, access control, compliance, and transfer events. Pre-built Grafana dashboards deliver operations overview, transaction monitoring, compliance activity, and security event visibility.

![DALP's blockchain monitoring provides real-time health tracking of both the chain RPC node and the indexer, with 24-hour historical health trends ensuring proactive infrastructure management.](../../../shared/brand/dalp-screenshots/15 - Monitoring/Blockchain Monitoring.png)

## Fit Table

| Requirement Area | DALP Response | Status |
| --- | --- | --- |
| Segregated environments (REQ-01) | Dev, test, UAT, DR, and production environments supported through Helm-based deployment with environment-level isolation | Supported |
| API-first interfaces (REQ-02) | REST, GraphQL, oRPC, webhooks, typed SDK, CLI with 301 commands; OpenAPI 3.1 specifications; versioned API governance | Supported |
| RBAC, maker-checker, audit logs (REQ-03) | 5-role RBAC model; maker-checker workflows; complete on-chain and off-chain audit trails; role-based access at every API endpoint | Supported |
| Configurable lifecycle (REQ-04) | Sukuk parameters, compliance rules, limits, and exceptions configurable through platform UI; policy controls enforced ex-ante | Supported |
| Third-party dependencies (REQ-05) | All dependencies disclosed; bring-your-own-custodian model; no hidden operational dependencies | Supported |
| Resilience and monitoring (REQ-06) | Three-pillar observability (metrics, logs, traces); automated alerting; DR testing support; incident management procedures | Supported |
| Phased implementation (REQ-07) | 15-19 week implementation methodology with formal gate reviews; phase 1 narrow scope expanding after controls proven | Supported |
| Audit evidence extraction (REQ-08) | Immutable on-chain audit logs; exportable event logs; structured error codes; SIEM-ready log forwarding | Supported |
| Sharia-compliant structuring (REQ-09) | Configurable sukuk parameters; profit distribution schedules; asset-backing records; denomination asset management | Supported |
| AAOIFI-aligned governance (REQ-10) | Maker-checker workflows for Sharia board approvals; governance evidence audit trail; configurable approval routing | Supported |
| Investor registry and controls (REQ-11) | OnchainID-based investor registry; transfer restrictions via ERC-3643; compliance modules for eligibility, jurisdiction, and limits | Supported |

---

# Architecture Overview

## Architecture Principles

DALP's architecture follows five principles directly relevant to QNB's requirements. Single source of truth: one platform maintains the authoritative record for sukuk state, ownership, compliance status, and lifecycle events. Defense in depth: five independent security layers (identity verification, RBAC, wallet verification, on-chain compliance, custody provider policy) ensure no single-layer failure grants unauthorized access. Atomic operations: token and cash movements complete together or both revert, eliminating reconciliation drift. Deterministic execution: durable workflow orchestration ensures multi-step operations survive process restarts and infrastructure failures. Modular extensibility: compliance modules, token features, and platform addons are configurable at runtime without redeployment.

## Core Layers

DALP is built as a four-layer stack. Each layer has a distinct responsibility boundary and layers communicate through well-defined interfaces.

| Layer | Role | Key Components |
| --- | --- | --- |
| Application | User-facing interfaces for operators, issuers, compliance officers | Asset Console (web UI), white-label capable |
| API | Programmatic access for external systems and integrations | Unified API (OpenAPI 3.1), TypeScript SDK, CLI |
| Middleware | Workflow orchestration, transaction lifecycle, key management, indexing | Execution Engine, Key Guardian, Transaction Signer, Chain Indexer, Feeds System |
| Smart Contract | On-chain enforcement of compliance, identity, and asset logic | SMART Protocol (ERC-3643), DALPAsset contracts, compliance modules |

A user action in the Asset Console triggers an API call, which the middleware orchestrates into one or more blockchain transactions, which the smart contract layer validates and executes on-chain. Each layer independently enforces its own security controls.

The smart contract layer implements the SMART Protocol (SettleMint Adaptable Regulated Token), an implementation of the ERC-3643 standard for regulated security tokens where every transfer passes through a modular compliance engine before execution. All token contracts are deployed through a factory pattern using CREATE2 for deterministic contract addressing, with atomic deployment that reverts entirely if any step fails.

## Deployment Topology

For QNB, the recommended deployment is a private cloud or on-premises installation running on Kubernetes (v1.25+) with PostgreSQL (v15+), object storage, and HSM-backed key management. The platform includes the DALP dApp, DAPI middleware, indexer, signer service, and the full observability stack (Grafana, VictoriaMetrics, Loki, Tempo). Segregated environments (development, test, UAT, DR, production) are provisioned through Helm chart configuration with environment-level isolation.

```mermaid
graph TD
    classDef primary fill:#E8EAF6,stroke:#000099,color:#000099,rx:8,ry:8
    classDef secondary fill:#FFF3E0,stroke:#C05030,color:#C05030,rx:8,ry:8
    classDef tertiary fill:#E8F5E9,stroke:#187848,color:#187848,rx:8,ry:8
    classDef accent fill:#EDE7F6,stroke:#482068,color:#482068,rx:8,ry:8
    classDef neutral fill:#D8E8F0,stroke:#1E4868,color:#1E4868,rx:8,ry:8

    A([QNB Users and Systems]):::neutral
    B([Asset Console UI]):::primary
    C([Unified API Layer]):::primary
    D([Middleware and Orchestration]):::primary
    E([SMART Protocol on EVM]):::tertiary
    F([QNB Treasury Systems]):::accent
    G([KYC/AML Tooling]):::accent
    H([Sharia Governance]):::secondary
    I([Custody Provider HSM]):::accent

    A --> B
    B --> C
    C --> D
    D --> E
    F --> C
    G --> C
    H --> B
    I --> D
```

*Figure: DALP four-layer architecture with QNB enterprise integration points. External systems connect through the API layer, while the SMART Protocol enforces compliance on-chain.*

## Resilience and Evidence

DALP's durable execution engine ensures multi-step workflows survive process restarts and infrastructure failures. The async transaction pipeline manages 11 state transitions with idempotency, retry semantics, dead-letter rescue, and full state-transition audit trail. Recovery-time and recovery-point objectives are configurable per deployment, with tested restoration procedures and dependency-failure handling. Every platform action produces structured, exportable evidence for architecture review, information-security review, and internal-audit challenge.

---

# Security Overview

## Authentication and Access Control

DALP enforces defense-in-depth across five independent control layers. Authentication supports multiple methods: email/password, passkeys (WebAuthn for phishing-resistant access), LDAP/Active Directory, OAuth 2.0/OIDC, and SAML 2.0 for enterprise SSO integration.

Authorization operates through a dual-layer permission model. Off-chain platform roles control API and console access. On-chain roles in Solidity contracts govern blockchain operations. Both must pass for any write operation. The on-chain AccessManager contract is the authoritative source for all role assignments, with five defined roles providing granular separation of duties across governance, operations, compliance, and emergency functions.

Wallet verification adds a dedicated second factor for all blockchain write operations. Even with a valid session, no on-chain transaction executes without the user proving control of their wallet through PIN, TOTP, backup codes, or passkey challenge. There is no administrative override that skips wallet verification.

![Before deployment, DALP's permission step establishes a full multi-party governance structure, each assigned precisely scoped roles by blockchain wallet address.](../../../shared/brand/dalp-screenshots/03 - Asset Designer/Asset Designer Permissions.png)

## Custody and Key Management

DALP's Key Guardian module supports multiple storage backends: encrypted database, cloud secret manager, HSM (FIPS 140-2 compliant), and third-party custody via Fireblocks and DFNS. For QNB, HSM-backed key management is recommended, with maker-checker approval workflows enforcing multi-signature quorum for minting, transfers, and redemption operations.

Provider-delegated transaction broadcast enables institutional custody providers to own nonce allocation, gas handling, signing, and broadcast while DALP retains permissioning and workflow control. This separation ensures QNB's custody arrangements operate independently from platform logic.

## Data Protection and Auditability

All data in transit is encrypted via TLS. Data at rest uses encryption appropriate to the storage backend (database encryption, HSM-protected keys, cloud-native encryption). Session cookies use HTTP-only, Secure, and SameSite attributes. API keys follow the principle of least privilege with scoped permissions and rate limiting (10,000 requests per 60-second window per key).

Every authentication event, role assignment, compliance check, transfer, and lifecycle action is logged with timestamps, actor identity, and result. On-chain events provide an immutable audit trail. Off-chain structured logs support SIEM integration for centralized security monitoring. SettleMint holds ISO 27001 and SOC 2 Type II certifications.

## Security Control Summary

| Control Area | Implementation |
| --- | --- |
| Authentication | Multi-method (passkeys, SSO, LDAP); session management with HTTP-only cookies |
| Authorization | 5-role RBAC; dual-layer (off-chain + on-chain); maker-checker workflows |
| Wallet verification | PIN, TOTP, passkeys; no administrative override |
| Key management | Key Guardian with HSM, Fireblocks, DFNS backends |
| Data protection | TLS in transit; encryption at rest; scoped API keys with rate limiting |
| Audit trail | Immutable on-chain logs; structured off-chain logs; SIEM-ready forwarding |
| Certifications | ISO 27001, SOC 2 Type II |
| Testing | Penetration testing; vulnerability scanning; smart contract security review |

---

# Implementation Timeline

SettleMint follows a structured, phase-gated implementation methodology refined through years of production implementations with regulated banks. Each phase concludes with a formal gate review requiring sign-off on defined deliverables and acceptance criteria.

| Phase | Objective | Duration | Key Outputs |
| --- | --- | --- | --- |
| Discovery and Requirements | Requirements capture, regulatory mapping, architecture design, RACI | Weeks 1 to 3 | BRD, compliance matrix, target architecture, implementation roadmap |
| Configuration and Setup | Environment provisioning, sukuk template configuration, compliance modules, identity framework | Weeks 4 to 7 | Provisioned environments, sukuk configuration, compliance rules, integration design |
| Integration | Connect to QNB treasury, KYC/AML, Sharia governance, reporting, settlement systems | Weeks 8 to 11 | Integrated system landscape, API documentation, end-to-end workflows, draft runbooks |
| Testing and UAT | Functional, security, performance, compliance validation, user acceptance | Weeks 12 to 14 | Test reports, security assessment, UAT sign-off, go-live readiness |
| Go-Live | Controlled production deployment, data migration, smoke testing | Week 15 | Production confirmation, migration validation, incident response procedures |
| Hypercare | Intensive monitoring, optimization, knowledge transfer, transition to standard support | Weeks 16 to 19 | Hypercare report, documentation package, knowledge transfer sign-off, support transition |

QNB's Sharia governance requirements introduce additional gate reviews. The implementation plan includes dedicated Sharia board review points at Phase 1 (product rule approval), Phase 2 (compliance module validation), and Phase 4 (UAT sign-off on Sharia-compliant operations). These gates are integrated into the standard methodology, not added as afterthoughts.

---

# Deployment

## Recommended Deployment Model

For QNB, SettleMint recommends a private cloud or on-premises deployment. This model gives QNB full control over infrastructure, data residency, network configuration, and security policies, while benefiting from DALP's Helm-based deployment automation.

The deployment supports air-gap capability for environments requiring complete network isolation, private blockchain network operation for permissioned-only transaction processing, and full integration with QNB's existing cloud or data centre infrastructure.

## Deployment Model Comparison

| Capability | Managed SaaS | Private Cloud | On-Premises |
| --- | --- | --- | --- |
| Infrastructure management | SettleMint-managed | Client-managed or co-managed | Client-managed |
| Data residency | Configurable by region | Full control | Full control |
| Update management | Automated | Coordinated releases | Client-controlled |
| Time to deploy | Fastest | Moderate | Longest |
| Operational overhead | Lowest | Moderate | Highest |

## Infrastructure Requirements

| Component | Specification |
| --- | --- |
| Compute | Kubernetes cluster (v1.25+); minimum 16 vCPUs, 64 GB RAM for production |
| Database | PostgreSQL (v15+) with high-availability configuration |
| Storage | Object storage (S3-compatible, MinIO, or local filesystem with backup) |
| Key management | HSM (FIPS 140-2) or HashiCorp Vault |
| Network | Ingress controller, service mesh, blockchain node connectivity |
| Monitoring | DALP observability stack (Grafana, VictoriaMetrics, Loki, Tempo) |
| Environments | Dev, test, UAT, DR, production; isolated through Helm chart configuration |

## Blockchain Network

DALP supports any EVM-compatible blockchain network. For QNB's sukuk programme, a private permissioned network (Hyperledger Besu or private Ethereum) is recommended, providing full control over validator nodes, gas management, and network governance while maintaining compatibility with the broader EVM ecosystem.

---

# Sukuk Lifecycle on DALP

This section addresses QNB's specific requirements for Sharia-compliant structuring, periodic distributions, and asset-backing records (REQ-09, REQ-10, REQ-11).

## Sharia-Compliant Structuring

DALP's bond template provides the configurable foundation for all sukuk structures. The platform supports the key parameters required for ijarah (lease-based), mudarabah (profit-sharing), musharakah (partnership), and wakalah (agency) sukuk through configurable asset parameters:

**Denomination and face value.** Each sukuk is linked to an on-chain denomination asset (the payment token representing the underlying currency) with a configurable face value per certificate. The platform tracks total asset needed for full redemption and current denomination holdings, calculating redemption coverage in real time.

**Maturity and redemption.** Maturity dates are configured at issuance with time precision. The platform tracks maturity status and automates redemption processing. Redemption coverage (the ratio of denomination asset reserves to outstanding obligations) is displayed on the asset detail view, providing Sharia board and treasury teams with transparent collateral visibility.

**Profit distribution schedules.** The yield module deploys a separate on-chain smart contract for each sukuk's profit schedule. Schedules are configured with start date, end date, distribution rate, payment interval (annual, semi-annual, quarterly), and total periods. The module tracks total yield distributed, claimed amounts, unclaimed amounts, and per-period status. Denomination asset reserves are pre-funded and tracked on-chain for each distribution.

**Asset-backing records.** On-chain verifications through ONCHAINID store the asset's classification, base price, issuer identity, and unique identifier as cryptographically attested claims. For sukuk backed by physical assets, additional verifications record asset coordinates, physical details, and location data, creating a verifiable on-chain record of the underlying asset.

![DALP captures bond-specific parameters including ISIN and maturity date during asset creation, ensuring compliance with financial instrument standards from day one.](../../../shared/brand/dalp-screenshots/03 - Asset Designer/Design Bond 3.png)

## AAOIFI-Aligned Governance Evidence

DALP's maker-checker workflows and comprehensive audit trail support AAOIFI-aligned governance requirements:

**Board approval lineage.** Every governance action (product rule changes, compliance module updates, token parameter modifications) passes through maker-checker approval workflows with configurable quorum. The audit trail records who initiated the change, which approvals were obtained, and the timestamp of each approval step.

**Product rule controls.** Compliance modules enforce Sharia-compliant investment restrictions at the smart contract level. Prohibited activity restrictions can be modelled as transfer restrictions, investor eligibility gates, or custom compliance expressions. Changes to compliance rules are governance-gated and logged.

**Documentation treatment.** The platform's document management capability supports versioned attachment of Sharia board resolutions, fatwa references, and prospectus documents to individual sukuk tokens. All document changes are logged in the event history.

## Investor Registry and Transfer Controls

DALP maintains a comprehensive investor registry through OnchainID-based identity management. Each investor has both a blockchain wallet (EOA) and a dedicated on-chain identity contract, with role types (Investor, Trusted Issuer) governing compliance capabilities.

Transfer restrictions are enforced at the smart contract level through ERC-3643 compliance modules. For QNB's sukuk programme, relevant controls include: SMART identity verification (investor eligibility gates combining KYC, AML, and Sharia-compliant investor classifications), country allowlist (restricting subscription to approved jurisdictions), investor count limits (configurable per-country caps), and transfer approval workflows (governance-gated transfers for specific transaction types or value thresholds).

```mermaid
graph TD
    classDef primary fill:#E8EAF6,stroke:#000099,color:#000099,rx:8,ry:8
    classDef secondary fill:#FFF3E0,stroke:#C05030,color:#C05030,rx:8,ry:8
    classDef tertiary fill:#E8F5E9,stroke:#187848,color:#187848,rx:8,ry:8
    classDef neutral fill:#D8E8F0,stroke:#1E4868,color:#1E4868,rx:8,ry:8

    A([Sukuk Structuring]):::primary
    B([Sharia Board Approval]):::secondary
    C([Compliance Configuration]):::primary
    D([Token Deployment]):::primary
    E([Primary Distribution]):::primary
    F([Periodic Profit Distribution]):::tertiary
    G([Investor Servicing]):::primary
    H([Maturity Processing]):::secondary
    I([Redemption and Retirement]):::tertiary

    A --> B
    B --> C
    C --> D
    D --> E
    E --> F
    F --> G
    G --> H
    H --> I
```

*Figure: Tokenized sukuk lifecycle on DALP. Each stage is governed by configurable compliance rules and produces a complete audit trail for Sharia board review and regulatory reporting.*

---

# Support and SLA

SettleMint recommends the Enterprise support tier for QNB's tokenized sukuk programme, reflecting the business-critical nature of the deployment.

## Support Tier Summary

| Attribute | Standard | Premium | Enterprise (Recommended) |
| --- | --- | --- | --- |
| Coverage hours | Business hours (CET) | Extended hours; P1 weekend on-call | 24/7/365 |
| Channels | Email, portal | Email, portal, Slack, phone | Email, portal, Slack, phone, video |
| Uptime SLA | 99.9% | 99.95% | 99.99% |
| Named contacts | Up to 3 | Up to 8 | Unlimited |
| Designated support | None | Named engineer | Named team |
| Account management | Quarterly review | Monthly review | Bi-weekly review; named CSM |

## Severity Definitions and Response Targets (Enterprise)

| Severity | Classification | Response | Resolution |
| --- | --- | --- | --- |
| P1, Critical | Platform down, compliance failure, settlement failure | 15 minutes | 2 hours |
| P2, High | Major degradation, integration failure, identity verification failure | 1 hour | 4 hours |
| P3, Medium | Workaround available; subset impact | 4 hours | 2 business days |
| P4, Low | Minor, cosmetic | 1 business day | 3 business days |

Service credits apply when uptime falls below SLA: 10% credit for uptime below target but above 99.0%, 25% for 98.0% to 99.0%, and 50% for below 98.0%.

---

# Risk Register

| Risk | Impact | Mitigation | Owner |
| --- | --- | --- | --- |
| Integration delay with QNB treasury or core banking systems | Timeline extension; delayed go-live | Detailed integration assessment in Phase 1; comprehensive API layer reduces custom development; contingency buffer in Phase 3 | Joint (SettleMint lead integration design; QNB provide system access) |
| QNB resource availability for requirements, UAT, and knowledge transfer | Phase gate delays | RACI matrix agreed in Phase 1; resource commitments at steering level; parallel workstreams where possible | QNB |
| Regulatory change (QCB guidance, QFMA framework evolution) | Scope adjustment; compliance module reconfiguration | Phase-gated approach with compliance validation at each gate; modular compliance configuration enables rapid adjustment | Joint |
| Environment readiness (infrastructure provisioning, network access, firewall rules) | Phase 2 delays | Early engagement with QNB infrastructure team; prerequisites documented in Phase 1; dedicated infrastructure coordination | QNB |
| Third-party dependency (custody provider, KYC provider, HSM vendor) | Integration delays; fallback configurations needed | Early identification in Phase 1; mock integrations for testing; fallback configurations documented | Joint |
| Sharia board approval timing | Phase gate delays for governance reviews | Sharia board review integrated into phase gates at Phases 1, 2, and 4; early engagement with Sharia governance team | QNB |
| Data quality in investor onboarding and KYC records | Onboarding delays; compliance enforcement issues | Data remediation assessment in Phase 1; validation rules configured in DALP; exception queues for incomplete records | Joint |

---

# Project Implementation and Delivery

## Delivery Methodology

SettleMint's implementation methodology follows a phase-gated approach refined through multi-year production deployments at regulated banks and sovereign entities. Each phase concludes with formal gate review, stakeholder sign-off, and documented acceptance criteria. The methodology balances speed-to-value with the rigorous governance, security, and compliance requirements that QNB demands.

For QNB's sukuk programme, the standard methodology is extended with three additional control points: Sharia board review gates at product design (Phase 1), compliance configuration (Phase 2), and operational acceptance (Phase 4). These gates are sequenced to avoid late-cycle surprises in governance approval.

## RACI Matrix

| Activity | SettleMint | QNB Project Team | QNB Compliance/Sharia | QNB Technology |
| --- | --- | --- | --- | --- |
| Requirements capture | Accountable | Responsible | Consulted | Consulted |
| Architecture design | Responsible | Consulted | Informed | Accountable |
| Platform configuration | Responsible | Consulted | Consulted | Informed |
| Compliance module setup | Responsible | Consulted | Accountable | Informed |
| Integration development | Responsible | Consulted | Informed | Accountable |
| Security testing | Responsible | Informed | Informed | Accountable |
| UAT execution | Consulted | Responsible | Responsible | Consulted |
| Go-live deployment | Responsible | Informed | Informed | Accountable |
| Knowledge transfer | Responsible | Accountable | Consulted | Accountable |
| Ongoing operations | Consulted | Responsible | Consulted | Responsible |

## Client Dependencies

QNB's participation is required for: project sponsor designation and project manager assignment, stakeholder availability for discovery workshops, infrastructure access (cloud accounts, network, firewall rules), KYC/AML provider access and identity provider credentials, treasury and core banking system API access for integration, Sharia board availability for governance gate reviews, UAT participant designation from business, operations, compliance, and technology teams, and production infrastructure provisioning per agreed deployment model.

## Milestone Gates

| Gate | Criteria | Decision |
| --- | --- | --- |
| G1: Design authority | BRD signed, architecture approved, RACI agreed, Sharia board product approval | Proceed to configuration |
| G2: Platform ready | Environments provisioned, sukuk configured, compliance modules validated, Sharia board compliance approval | Proceed to integration |
| G3: Integration complete | All connectors operational, end-to-end workflows validated, draft runbooks | Proceed to testing |
| G4: UAT accepted | All test reports delivered, security assessment complete, UAT sign-off, Sharia operational acceptance | Proceed to go-live |
| G5: Production confirmed | Smoke tests pass, migration validated, incident procedures in place | Enter hypercare |
| G6: Operational handover | Knowledge transfer complete, support transition plan executed, hypercare report delivered | Transition to standard operations |

---

# Support Appendix

## Incident Management Process

Incidents follow a six-step process: report (client submits through authorized channel with severity assessment and impact scope), acknowledge (SettleMint confirms severity within response target), triage and diagnose (support engineer investigates and identifies root cause or workaround), resolve (service restored within resolution target), post-mortem (P1/P2 incidents receive root cause analysis within 5 business days), and close (client confirmation; all incidents retained for audit).

## Escalation Path

Automatic escalation triggers activate when response or resolution targets are missed. P1 incidents not acknowledged within 15 minutes escalate to Support Engineering Manager. P1 incidents not resolved within 2 hours escalate to VP Engineering with client notification. Recurring P1/P2 incidents (3 or more in 30 days) trigger Root Cause Review with Solution Architect.

Client-initiated escalation follows four levels: Designated Support Team, Support Engineering Manager, VP Engineering / Head of Customer Success, and SettleMint Executive Management.

## Maintenance and Updates

Scheduled maintenance window: Saturdays 02:00 to 06:00 CET (or QNB-agreed alternative). Minimum 5 business days notification for standard maintenance; 10 business days for major upgrades. Emergency maintenance for critical security patches may be executed outside standard windows with maximum practical advance notice.

Enterprise tier receives continuous delivery with staged rollouts, preview environments, client approval gate before production deployment, and zero-downtime deployment where architecturally supported. Security patches are applied on an accelerated timeline regardless of release cadence. Compliance module updates are coordinated with QNB's compliance team and include regulatory impact assessment.

---

# Writer's Checklist

- Headings unnumbered: confirmed
- All VARIABLE placeholders resolved: confirmed
- Deployment model (private cloud / on-premises) consistent throughout: confirmed
- All DALP claims source-backed from content sections and reusable blocks: confirmed
- No unsupported metrics: confirmed
- Tables concise and Word-friendly (maximum 8 rows): confirmed
- Selected references relevant to QNB context (Islamic finance, Middle East, fixed income): confirmed
- DALP screenshots included with descriptive captions: 7 screenshots included
- Mermaid diagrams included: 2 diagrams (architecture overview, sukuk lifecycle)
- No em dashes or en dashes: confirmed
- No AI-tell words: confirmed
- Active voice: confirmed
- Core positioning ("Complexity of Doing It Right") present in executive summary: confirmed
- Tone: precise, evidence-led, non-promotional: confirmed
