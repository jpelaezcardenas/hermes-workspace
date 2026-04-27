# Response to Mashreq Bank: Digital Asset Lifecycle Management Platform

**Prepared by:** SettleMint NV
**Date:** April 2026
**Classification:** Confidential
**Version:** 1.0

---

## 1. Executive Summary

Mashreq Bank stands at an inflection point. As the UAE's oldest privately owned bank and one of its most digitally progressive financial institutions, Mashreq has consistently demonstrated a commitment to technology-led transformation, from its pioneering NEO digital banking platform to its investments in blockchain infrastructure, AI-driven operations, and platform-based banking strategies. The bank's leadership has publicly articulated a vision where blockchain-based tokenization of real assets becomes a serious financial infrastructure shift, particularly for wealth management, capital markets, and cross-border operations.

The UAE's regulatory environment is accelerating this trajectory. The Central Bank of the UAE (CBUAE) has introduced comprehensive frameworks for digital asset oversight, the Virtual Assets Regulatory Authority (VARA) in Dubai has established one of the world's most detailed licensing regimes for virtual asset service providers, and the Dubai Financial Services Authority (DFSA) has extended its regulatory perimeter to cover security tokens and digital assets within the DIFC. The Securities and Commodities Authority (SCA) continues to refine guidelines for tokenized securities issuance and distribution. Together, these regulatory bodies have created a clear, multi-layered framework that gives institutions like Mashreq Bank the certainty needed to move from strategic evaluation to operational deployment.

SettleMint proposes the **Digital Asset Lifecycle Platform (DALP)** as the foundation for Mashreq Bank's institutional digital asset operations. DALP is not a tokenization toolkit or a point solution for issuance. It is a complete lifecycle platform that unifies asset issuance, compliance enforcement, custody integration, atomic settlement, and ongoing servicing under a single governance model, security posture, and operating framework.

### Key Differentiators for Mashreq Bank

- **Full lifecycle coverage in one platform:** Issuance, compliance, custody orchestration, settlement, and servicing on a single control plane with a unified registry. No vendor sprawl, no integration gaps between issuance and post-trade operations.
- **Ex-ante compliance enforcement:** Every transfer is validated against eligibility rules, identity claims, and jurisdictional constraints before execution. This is not retrospective monitoring; it is deterministic prevention of non-compliant transactions at the smart contract layer.
- **Atomic DvP/XvP settlement:** Both asset and cash legs complete together or revert together, eliminating counterparty risk and reconciliation overhead. Extends to multi-party settlement scenarios.
- **UAE regulatory alignment:** Compliance module architecture supports CBUAE requirements, VARA guidelines, DFSA frameworks, and SCA directives through configurable policy templates, not custom code.
- **On-premises deployment:** Full deployment within Mashreq Bank's UAE data center infrastructure with Kubernetes orchestration, meeting data residency and sovereignty requirements.
- **Institutional custody integration:** Bring-your-own-custodian model with native Fireblocks and DFNS integrations, maker-checker approval workflows, and HSM-compatible key management.

### Engagement Summary

SettleMint proposes a three-phase, twelve-month implementation:

| Phase | Focus | Duration |
|-------|-------|----------|
| Phase 1 | Foundation and Bond Lifecycle | Months 1-4 |
| Phase 2 | Multi-Asset Expansion | Months 5-8 |
| Phase 3 | Advanced Settlement and Cross-Border | Months 9-12 |

This phased approach delivers production value from Phase 1 while building toward Mashreq Bank's full digital asset operating model.

---

## 2. About SettleMint

### Company Overview

SettleMint is the digital asset lifecycle management company for regulated financial markets and sovereign use cases. Founded in 2016 with a singular focus on building blockchain infrastructure for enterprises and regulated institutions, SettleMint has spent nearly a decade refining the technology, processes, and domain expertise required to operate tokenized assets at institutional scale.

The company is headquartered in Belgium with operations spanning Europe, the Middle East, and Asia-Pacific. SettleMint serves financial institutions, market infrastructure providers, and sovereign entities who require compliant, secure, and scalable digital asset infrastructure.

### Focus on Regulated Markets

Unlike blockchain vendors that serve broad markets or focus on retail and DeFi applications, SettleMint has maintained an exclusive focus on regulated environments from its founding. This means every architectural decision, every compliance control, and every operational workflow has been designed for institutions where regulatory scrutiny, audit requirements, and operational resilience are non-negotiable.

This focus is reflected in the platform's core capabilities:

- **Maker-checker custody approvals** aligned with institutional governance requirements
- **Ex-ante compliance enforcement** through ERC-3643 regulated token standards
- **Atomic DvP/XvP settlement** with deterministic finality
- **HSM-compatible key management** across multiple custody providers
- **Full audit logging** with structured, queryable event history

### Client Base and Deployments

SettleMint's client base spans three regions:

- **Europe:** Multi-year continuous production deployments with regulated banks, including live bond issuance and lifecycle management programs. Active engagement with European regulatory frameworks including MiCA.
- **MENA:** Active sovereign-scale programs, including national real estate tokenization initiatives and sovereign-backed digital asset infrastructure. Deep familiarity with GCC regulatory frameworks and deployment requirements.
- **Asia-Pacific:** Live production deployments with tier-1 banks, including bond fractionalization and corporate bond programs. Experience with MAS, JFSA, and regional regulatory diversity.

### Sovereign Programs

SettleMint is one of a very small number of platforms powering country-scale tokenization initiatives. These include national real estate registry tokenization programs and sovereign-backed capital markets infrastructure in the Middle East. This sovereign-scale credibility is directly relevant to Mashreq Bank's ambitions within the UAE's national digital asset strategy.

### Team Expertise

The SettleMint team brings together over 200 years of combined experience across:

- **Transaction banking and capital markets:** Deep understanding of settlement flows, custody models, and post-trade operations
- **Blockchain engineering:** Protocol-level expertise from the early enterprise adoption wave through current institutional-grade architectures
- **Regulatory compliance:** Practical experience navigating MiCA, MAS, JFSA, CBUAE, VARA, and DFSA frameworks
- **Enterprise delivery:** Governance, change management, and integration with legacy infrastructure at tier-1 financial institutions

Dedicated solution architects, delivery leads, and customer success teams have implemented tokenization solutions across multiple jurisdictions, navigating security reviews, vendor onboarding processes, and change control procedures with large institutions.

---

## 3. Understanding Mashreq Bank's Requirements

### Mashreq's Digital Strategy and UAE Market Context

Mashreq Bank's digital transformation strategy is among the most ambitious in the Gulf region. Under the leadership of Group CEO Ahmed Abdelaal, the bank has articulated a clear vision of evolving into a platform-based banking model, embedding financial services across digital customer journeys. The bank's NEO and NeoBiz platforms serve as the consumer-facing expression of this strategy, while investments in blockchain, AI, and fintech partnerships signal a commitment to infrastructure-level transformation.

The bank has identified blockchain-based tokenization as a serious financial infrastructure shift. This is not an innovation exercise; it is a strategic infrastructure investment aligned with the UAE's national objectives:

- **UAE Blockchain Strategy:** Positions the country as a global leader in blockchain adoption across government and financial services
- **Dubai Tokenization Strategy:** Aims to tokenize a significant portion of Dubai's real estate and financial assets
- **CBUAE Digital Currency Initiative:** Central bank digital currency exploration and digital payment infrastructure modernization
- **DIFC Innovation Hub:** Regulatory sandbox and production frameworks for digital asset businesses

Mashreq Bank's position as the UAE's oldest privately owned bank, combined with its digital-first operating model, creates a unique opportunity to lead institutional adoption of digital assets in the region.

### Operational Challenges

As Mashreq Bank evaluates its digital asset infrastructure requirements, several operational challenges must be addressed:

1. **Disconnected workflows across asset types:** Without a unified platform, each new digital asset initiative requires separate tooling, separate compliance configurations, and separate operational procedures. This multiplies cost and risk with each new asset class.

2. **Manual compliance processes:** Retrospective compliance checking creates regulatory exposure. When transfers execute before validation, non-compliant transactions create immutable on-chain evidence of policy violations.

3. **Settlement fragmentation:** Tokens may settle on-chain while cash clears through traditional rails on different timelines. Without atomic settlement, counterparty risk persists and reconciliation overhead grows.

4. **Custody complexity:** Managing institutional key management across multiple providers without unified governance, maker-checker approvals, and recovery procedures introduces operational risk that boards and risk committees will not tolerate.

5. **Scaling constraints:** Point solutions that support individual use cases cannot scale to a multi-asset, multi-jurisdiction operating model without significant re-architecture.

### Regulatory Landscape

Mashreq Bank operates within a multi-layered regulatory environment:

| Regulator | Jurisdiction | Scope |
|-----------|-------------|-------|
| **CBUAE** | UAE-wide | Payment tokens, stored value, deposit tokens, banking supervision |
| **VARA** | Dubai | Virtual asset service provider licensing, comprehensive activity-based regulation |
| **DFSA** | DIFC | Security tokens, investment tokens, regulated digital assets within the DIFC |
| **SCA** | UAE Federal | Securities regulation, tokenized securities issuance and distribution |
| **ADGM/FSRA** | Abu Dhabi Global Market | Digital asset frameworks for ADGM-registered entities |

DALP's compliance architecture is designed to operate across these jurisdictions simultaneously, with configurable policy modules that encode the specific requirements of each regulatory body.

### Strategic Objectives Mapped to Platform Capabilities

| Mashreq Objective | DALP Capability |
|-------------------|-----------------|
| Unified digital asset operating model | Single platform with unified registry, governance, and control plane |
| Multi-asset support (bonds, deposits, funds, sukuk) | Seven pre-built asset templates with configurable lifecycle logic |
| Regulatory compliance across UAE jurisdictions | 18 compliance module types with jurisdictional templates |
| Institutional custody and key management | Bring-your-own-custodian with Fireblocks/DFNS, maker-checker approvals |
| Atomic settlement | DvP/XvP with deterministic finality |
| Integration with existing banking infrastructure | REST, GraphQL, webhooks, ISO 20022 connectivity |
| On-premises deployment | Kubernetes-native with full data residency control |

---

## 4. DALP Platform Overview

### Architecture Overview

DALP is built on three architectural principles that distinguish it from tokenization toolkits and point solutions:

**1. EVM-Native Execution**
All asset logic, compliance enforcement, and settlement operations execute on EVM-compatible blockchain networks. This is not a layer of abstraction over multiple heterogeneous chains; it is deep, native integration with the Ethereum Virtual Machine and its ecosystem of standards, tooling, and institutional adoption. DALP operates on any blockchain implementing the Ethereum JSON-RPC specification: Hyperledger Besu with IBFT 2.0 or QBFT consensus for private networks, Ethereum mainnet, Polygon, Arbitrum, Base, and other public L1/L2 networks.

**2. Gateway Isolation**
Every external dependency is isolated behind internal abstraction boundaries. Three gateway components handle this isolation:

- **Key Guardian:** Abstracts custody providers (Fireblocks, DFNS, local HSM, cloud secret managers) behind a unified signing and key management interface
- **Chain Gateway:** Normalizes blockchain network interactions across public and private chains
- **Feeds System:** Isolates market data, price feeds, and oracle integrations

No business logic makes direct external calls. All external system interactions route through dedicated gateway components with retry handling, circuit breaking, and observability.

**3. Durable Workflow Execution**
All multi-step operations, from asset issuance to corporate actions to settlement, execute as durable workflows powered by Restate. These workflows survive process restarts and infrastructure failures. If a node goes down during a coupon payment distribution, the workflow resumes exactly where it left off when infrastructure recovers. This is not eventual consistency; it is deterministic execution with guaranteed completion.

### Seven Asset Templates

DALP ships with seven purpose-built asset templates, each carrying the operational logic its lifecycle demands:

| Asset Template | Key Lifecycle Features |
|---------------|----------------------|
| **Bonds** | Configurable coupon schedules, maturity processing, call/put options, face value management, automated redemption |
| **Equity** | Dividend distribution, voting rights (ERC-5805), corporate action processing, shareholder registry |
| **Funds** | NAV integration, subscription/redemption automation, management fee calculation, fractional units |
| **Stablecoins** | Reserve monitoring, minting/burning controls, transaction limits, regulatory reporting |
| **Deposits** | Interest calculation, maturity management, withdrawal rules, bridge functionality |
| **Real Estate** | Property title tokenization, rental distribution, fractional ownership, provenance tracking |
| **Precious Metals** | Custody verification, provenance chain, fractional ownership, responsible sourcing compliance |

Beyond these seven templates, a **Configurable Token** template enables digitization of any asset class using a composable, feature-rich architecture. The SMART Configurable extension system supports up to 32 pluggable features per token, added or reordered post-deployment without redeploying the token itself. Eleven pre-built feature types are available: AUM fees, conversion, external transaction fees, fixed treasury yield, historical balances, maturity redemption, EIP-2612 permits, transaction fees, transaction fee accounting, and voting power.

### Compliance Engine

DALP's compliance engine is the most comprehensive in the market for regulated digital assets. It implements **18 compliance module types** organized across **six categories**:

| Category | Module Types |
|----------|-------------|
| **Eligibility** | Country allow/block lists, investor accreditation status, qualified investor verification |
| **Restrictions** | Maximum holder count, conditional transfer restrictions, time-locked restrictions |
| **Transfer Controls** | Transfer amount limits, maximum balance restrictions, address-specific restrictions |
| **Issuance and Supply** | Supply cap enforcement, minting restrictions |
| **Time-Based Rules** | Holding period enforcement, lock-up windows, time-restricted trading |
| **Settlement and Collateral** | Collateral backing verification, settlement condition enforcement |

Compliance enforcement is **ex-ante**: every transfer is validated against active policy sets before the transaction executes on-chain. This is deterministic prevention, not retrospective detection. A non-compliant transfer never reaches the blockchain. The compliance engine uses the ERC-3643 standard for regulated token compliance, with OnchainID providing verifiable, on-chain investor identities.

The platform implements a **three-tier compliance interface hierarchy:**

1. **Global Compliance:** System-wide bypass list, global modules, token-compliance binding
2. **Token Compliance:** Per-token compliance hooks with dual v1/v2 support
3. **SMART Compliance V2:** ERC-3643-aligned three-argument compliance hooks

### Identity and Access Control

DALP embeds a unified identity layer across the entire platform:

- **OnchainID:** Verifiable, on-chain investor identities with claim-based verification. KYC/KYB credentials, accreditation status, and jurisdictional eligibility are recorded as verifiable claims, reusable across all assets and transactions.
- **Identity Registry:** Manages verified profiles with claim lifecycle control, including issuance, storage, and revocation of digital identity claims.
- **Role-Based Access Control (RBAC):** Five defined roles govern every action from token issuance to transfer approval. Four layers of access control ensure separation of duties.
- **Maker-Checker Workflows:** All sensitive operations require multi-party approval before execution.
- **Wallet Verification:** Multi-factor verification gates (PIN code, TOTP, secret codes) for privileged transaction signing and sensitive recovery operations.

A **Global Trusted Issuers Registry** centralizes trusted issuer management at the platform level, with three-tier resolution: subject-scoped, system-scoped, and global (most specific wins, global as broadest fallback).

---

## 5. Asset Lifecycle Management

### Issuance Workflow

DALP's issuance workflow is a controlled, multi-step process designed for institutional governance:

1. **Template Selection:** Choose from seven pre-built asset templates or configure a custom token using the SMART extension system. The Asset Designer wizard guides operators through class selection, with four system asset classes (Fixed Income, Flexible Income, Cash Equivalent, Real World Asset) and support for custom organizational classes.

2. **Term Configuration:** Establish asset-specific economics, distribution parameters, and redemption settings. For bonds: coupon schedules, maturity dates, face value, call/put provisions. For funds: NAV frequency, management fees, subscription windows. Each class carries its own validation rules and lifecycle logic.

3. **Compliance Setup:** Configure compliance modules from the 18 available types. Select country restrictions, investor eligibility requirements, transfer limits, and holding periods. Compliance modules are configured per asset and enforced at the smart contract layer.

4. **Identity and Claims:** Issue classification, location, pricing, and identifier claims specific to the asset class. Claim issuance is class-aware and fails terminally on partial claim issuance, ensuring no asset deploys with incomplete identity metadata.

5. **Permission Assignment:** Define initial role assignments across the five DALP roles. The workflow enforces a minimum creator = governance bootstrap, ensuring every asset has an accountable governance role from deployment.

6. **Deployment:** Durable workflow execution deploys the asset contract, issues all claims, assigns permissions, and optionally unpauses the asset for trading. The entire sequence is atomic in the workflow sense: if any step fails, the deployment does not proceed to a partial state.

### Transfer and Settlement

Every transfer in DALP passes through compliance-gated validation before execution:

- **Pre-transfer compliance check:** The compliance engine evaluates the transfer against all active modules for the asset. Sender eligibility, receiver eligibility, transfer amount limits, holding period restrictions, and jurisdictional rules are all evaluated deterministically.
- **Signing workflow:** Transactions pass through wallet verification, DALP-layer compliance checks, and then external custodian policy evaluation (the two-layer policy model). DALP deterministically gates initiation; the external signer/custodian layer may add provider-specific approval latency.
- **Settlement finality:** On-chain settlement provides deterministic finality. For DvP transactions, both asset and cash legs execute atomically.

**Atomic DvP/XvP Settlement**

The XvP (Exchange-versus-Payment) settlement addon provides:

- Multi-party settlement with configurable approval requirements
- Hashlock-based cross-chain settlement via HTLC
- Same-chain atomic execution for local settlement
- Deterministic closure into one of three auditable end-states: executed, cancelled, or expired-withdrawn
- Cancellation vote logic for multi-party dispute resolution
- Full subgraph projection for settlement state observability

### Corporate Actions

DALP automates corporate actions across all asset types through its feature system:

- **Coupon payments:** Automated coupon calculation and distribution for bonds, executed through the asset-as-treasury capability. The asset contract itself functions as a treasury, with attached features pulling denomination-token payouts directly from the contract.
- **Dividend distribution:** Programmable dividend processing for equity tokens with historical balance snapshots (ERC-5805 voting power infrastructure provides checkpoint capability).
- **Rental distribution:** Automated rental income distribution for real estate tokens.
- **Yield distribution:** Fixed treasury yield features calculate and distribute periodic yield payments through the shared treasury payout library.
- **Maturity redemption:** Automated maturity processing with configurable redemption mechanics. The maturity redemption feature burns holder tokens and pays out through the treasury abstraction.

### Bond Lifecycle Detail

Given the centrality of bonds to UAE capital markets, DALP's bond lifecycle capabilities deserve specific attention:

| Lifecycle Stage | DALP Capability |
|----------------|-----------------|
| Structuring | Configurable term sheets: coupon rate, frequency, day-count convention, maturity date, face value, call/put provisions |
| Primary issuance | Template-driven deployment with compliance modules, investor eligibility checks, and distribution controls |
| Coupon processing | Automated coupon calculation and distribution via treasury payout system |
| Secondary transfer | Compliance-gated transfers with ex-ante validation, atomic DvP settlement |
| Corporate actions | Call/put option exercise, coupon rate adjustments, notification processing |
| Maturity and redemption | Automated maturity detection, redemption calculation, principal return to holders |

For Mashreq Bank's sukuk operations, DALP's configurable token architecture enables Shariah-compliant structures through custom feature composition. Profit-sharing distributions, asset-backed structures, and ijara (lease-based) mechanics can be modeled using the SMART extension system without custom smart contract development.

### Deposit Token and Stablecoin Operations

**Deposit Tokens:**
- Programmable deposit tokens with configurable interest rates, maturity schedules, and withdrawal rules
- Bridge functionality for controlled integration with external blockchain networks
- Real-time reserve monitoring and liquidity management controls
- Regulatory oversight dashboards for supervisory visibility

**Stablecoins:**
- Fully compliant stablecoin issuance with ERC-3643 identity standards
- Policy controls for transaction limits, geography restrictions, and transaction types
- Multi-currency support with configurable minting and burning authorities
- Reserve monitoring integration points for attestation workflows

---

## 6. Compliance and Regulatory Framework

### Three-Tier Compliance Architecture

DALP implements compliance enforcement at three distinct levels, each building on the one below:

**Tier 1: Global Compliance**
Platform-wide compliance rules that apply across all assets and transactions. The Global Compliance contract manages a system-wide bypass list, registers global compliance modules, and binds token-level compliance contracts. This tier handles platform-level policy that transcends individual asset configurations, such as sanctioned-entity blocking or platform-wide transaction velocity limits.

**Tier 2: Token Compliance**
Per-asset compliance hooks that enforce asset-specific rules. Each token deployed through DALP has its own compliance contract with modules configured for that specific instrument. Bond compliance modules may differ significantly from stablecoin compliance modules. Token compliance checks cascade through global compliance for bypass evaluation before applying asset-specific rules.

**Tier 3: Custodian Compliance**
External custody providers (Fireblocks, DFNS) enforce their own transaction authorization policies. DALP's two-layer policy model recognizes that regulated institutions operate with both platform-native compliance and custodian-level governance. Transaction execution bifurcates after DALP-side checks: the external signer/custodian layer may add provider-specific asynchronous approval or manual intervention before broadcast finality.

### 18 Compliance Module Types

DALP's compliance validation currently supports specific module type IDs in a discriminated-union schema. Each module type has deterministic encoding, with unknown module types rejected via hard error rather than permissive fallback:

**Eligibility Modules:**

1. **Country Allow List:** Restrict transfers to investors domiciled in approved countries. Directly supports CBUAE requirements for UAE-resident investor eligibility.
2. **Country Block List:** Prevent transfers to investors in sanctioned or restricted jurisdictions. Aligns with UAE Federal sanctions requirements and VARA's geographic restrictions.
3. **Investor Accreditation:** Verify that investors hold required accreditation claims before transfer. Supports DFSA qualified investor requirements and SCA retail/professional investor classification.

**Restriction Modules:**

4. **Maximum Holder Count:** Cap the number of distinct holders for an asset. Supports private placement exemptions under DFSA rules.
5. **Conditional Transfer Restrictions:** Apply transfer restrictions based on dynamic conditions evaluated at transfer time.
6. **Address-Specific Restrictions:** Block or allow specific wallet addresses, supporting freeze orders, court orders, or regulatory directives.

**Transfer Control Modules:**

7. **Transfer Amount Limits:** Enforce minimum and maximum transfer sizes. Supports CBUAE transaction reporting thresholds and VARA's value transfer rules.
8. **Maximum Balance Restrictions:** Prevent concentration risk by capping individual holder positions.
9. **Transfer Policy:** Comprehensive transfer rule evaluation based on actor, counterparty, and context.

**Issuance and Supply Modules:**

10. **Supply Cap Enforcement:** Hard limit on total token supply, enforced at the smart contract layer.
11. **Minting Restrictions:** Control which roles and under what conditions new tokens can be minted.
12. **Capped Supply:** Dynamic supply management with configurable caps and governance-controlled adjustments.

**Time-Based Rule Modules:**

13. **Holding Period Enforcement:** Require investors to hold tokens for a minimum period before transfer. Supports lock-up requirements under DFSA fund regulations.
14. **Lock-Up Windows:** Time-locked restrictions on transfers during specific periods, such as pre-IPO lock-ups or regulatory cooling periods.
15. **Time-Restricted Trading:** Define windows during which transfers are permitted, supporting market-hours restrictions.

**Settlement and Collateral Modules:**

16. **Collateral Backing Verification:** Verify that stablecoin or deposit token issuance is backed by sufficient collateral.
17. **Settlement Condition Enforcement:** Require specific conditions to be met before settlement can proceed.
18. **Transaction Fee Enforcement:** Apply and collect transaction fees as part of transfer execution.

### UAE Regulatory Alignment

DALP's compliance architecture maps directly to the requirements of UAE regulatory bodies:

**CBUAE Alignment:**

| CBUAE Requirement | DALP Implementation |
|-------------------|---------------------|
| Stored value facility regulation | Stablecoin template with reserve monitoring and minting controls |
| Payment token oversight | Deposit token template with transaction limits and reporting |
| AML/CFT compliance | Identity verification through OnchainID, country restrictions, transaction monitoring |
| Data residency | On-premises deployment in UAE data centers |
| Reporting requirements | Structured audit logging with queryable event history |

**VARA Alignment:**

| VARA Requirement | DALP Implementation |
|------------------|---------------------|
| VASP licensing compliance | Platform governance controls, role-based access, audit trails |
| Transfer rules and restrictions | 18 compliance module types with configurable policies |
| Investor protection | Ex-ante compliance enforcement, maximum holder counts, transfer limits |
| Record keeping | Immutable on-chain event history with off-chain structured logs |
| Risk management | Multi-layer compliance architecture, maker-checker approvals |

**DFSA Alignment:**

| DFSA Requirement | DALP Implementation |
|------------------|---------------------|
| Security token classification | Asset templates with built-in classification claims |
| Qualified investor verification | Investor accreditation compliance modules |
| Prospectus requirements | Document management system with versioning and controlled disclosure |
| Market conduct rules | Transfer restrictions, trading windows, address-specific controls |
| Custody requirements | Institutional custody integration with Fireblocks/DFNS, HSM support |

### Identity Verification and KYC/KYB Integration

DALP's identity system operates as a trust layer, not a verification service:

- **OnchainID** provides the on-chain identity standard. Every investor, issuer, and institutional participant has a verifiable on-chain identity.
- **Claim-based verification** records KYC/KYB credentials as claims on the identity. Claims are issued by trusted issuers (the KYC/KYB provider) and verified by the compliance engine at transfer time.
- **KYC Profile Management** includes full lifecycle control: submission, review (approve/reject/request-update), fulfillment tracking, and content-hash verification for data integrity.
- **Reusable credentials:** An investor onboarded once can participate across all assets and transactions without re-verification. Claims are reusable across the platform.

DALP does not perform KYC checks itself. It integrates with Mashreq Bank's existing KYC/KYB providers and enforces the claims those providers issue.

### Audit Trails and Regulatory Reporting

Every action in DALP generates a queryable audit record:

- **On-chain events:** All token operations, compliance decisions, and settlement actions emit blockchain events indexed by the subgraph layer
- **Off-chain structured logs:** Platform operations, API calls, and administrative actions are logged with structured metadata
- **Activity tracking:** Account-level blockchain event history with time-series aggregation for charting and analysis
- **Permission-aware search:** Global discovery across contacts, users, and token entities with role-based visibility controls
- **Export capability:** Document listings exportable as CSV/JSON for audits and downstream reporting

---

## 7. Technical Architecture

### Component Architecture

DALP's runtime consists of several integrated components, each with a defined responsibility boundary:

**DAPI (Durable API Service)**
The core API layer that exposes all platform capabilities through oRPC endpoints. DAPI implements a middleware control plane that converts authenticated API traffic into tenant-scoped, permission-aware, execution-ready operations. The middleware stack composes: session authentication, organization role synchronization, system context hydration, token context hydration, wallet verification, and durable workflow submission.

Two API surfaces serve different consumers:
- `/api/rpc`: Session/cookie authentication for the DALP dApp frontend
- `/api/v2`: API key authentication with HTTP-method-based scope enforcement for programmatic integrations (read-only GET/HEAD/OPTIONS vs read-write POST/PUT/PATCH/DELETE)

**DIDX (Digital Identity Exchange)**
The identity and claims management layer. Handles OnchainID deployment, claim issuance and revocation, trusted issuer registry management, and identity recovery workflows. Identity recovery is a durable, phase-tracked process: creating-wallet, deploying-identity, recovering-identity, revoking-sessions, recovering-tokens, through to terminal state.

**DDWF (Durable Distributed Workflow Framework)**
Built on Restate, DDWF provides the execution substrate for all multi-step operations. Virtual objects provide partition-level exclusive locking. Workflows survive process restarts and infrastructure failures. The framework handles nonce management, transaction processing, confirmation watching, and settlement orchestration.

**Chain Gateway**
Normalizes blockchain network interactions. Supports any EVM-compatible network through the Ethereum JSON-RPC specification. Per-chain identity isolation, per-chain compliance isolation, and per-chain indexer instances ensure clean separation across network deployments.

**Key Guardian**
The custody abstraction layer supporting multiple storage backends:

| Backend | Protection Level | Use Case |
|---------|-----------------|----------|
| Encrypted database | Application-level encryption | Development and testing |
| AWS Secrets Manager / GCP Secret Manager / Azure Key Vault | Platform-managed encryption | Standard production |
| HSM | FIPS 140-2 Level 3 | Regulated financial services |
| DFNS (MPC) | Threshold MPC with programmatic approval | Institutional custody |
| Fireblocks (MPC-CMP) | MPC with continuous key refresh, TAP policies | Institutional custody |

### Smart Contract Layer

DALP's smart contract architecture builds on established standards:

**ERC-3643 (T-REX):**
The regulated token standard that DALP implements natively. ERC-3643 provides the compliance hooks that enable ex-ante transfer validation. Every token deployed through DALP inherits ERC-3643 compliance infrastructure.

**SMART Protocol:**
SettleMint's extension to ERC-3643 that adds the feature composition system. SMART tokens support up to 32 pluggable features, ordered execution pipelines, and token rewrite capabilities (features can intercept and modify transactions in-flight).

**Feature Factories:**
Each feature type (AUM fees, conversion, fixed treasury yield, maturity redemption, voting power, transaction fees, etc.) is deployed through dedicated factory contracts. Features attach to tokens post-deployment without redeploying the token itself.

**Asset Contracts:**
Each asset template deploys through a dedicated factory with class-specific validation, deployment logic, and claim enrichment. The `DALPAsset` contract implements `ITreasuryPayer`, enabling the asset itself to serve as a treasury for payout-oriented features.

### Blockchain Infrastructure

For Mashreq Bank's deployment, SettleMint recommends **Hyperledger Besu** with **QBFT consensus** as the primary network:

- **Permissioned network:** Full control over validator set, network participants, and transaction visibility
- **EVM compatibility:** All DALP smart contracts, standards, and tooling work without modification
- **QBFT consensus:** Byzantine fault-tolerant consensus with immediate finality, suitable for institutional settlement requirements
- **Performance:** Configurable block time and gas limits for throughput optimization
- **Privacy:** Transaction-level privacy options through private transaction groups

Multi-chain support enables Mashreq Bank to operate across private and public networks simultaneously, with per-chain identity and compliance isolation.

### API Layer

DALP exposes comprehensive programmatic interfaces:

- **oRPC:** Type-safe remote procedure calls with full TypeScript inference, used by the DALP dApp and programmatic clients
- **REST API (v2):** Standard REST endpoints with API key authentication for system-to-system integrations
- **GraphQL:** Query interface backed by TheGraph subgraph indexer for complex data retrieval
- **Event Webhooks:** Real-time event notifications for transaction completions, compliance decisions, settlement state changes, and system events
- **CLI:** Command-line interface for automation, DevOps integration, and operational tasks

### Observability

DALP ships with full operational tooling:

- **Metrics:** VictoriaMetrics for time-series metrics collection and storage. API metrics automatically rolled up into hourly aggregation buckets.
- **Logs:** Loki for centralized log aggregation with structured, queryable logging across all platform components
- **Traces:** Tempo for distributed tracing, providing end-to-end visibility into multi-service request flows
- **Dashboards:** Pre-built Grafana dashboards covering operations overview, transaction monitoring, compliance activity, and security events
- **Alerting:** Automated alerting on error rate spikes, latency degradation, chain connectivity issues, and settlement failures
- **Blockchain health monitoring:** Restate-managed health collection with hysteresis-based status classification, snapshot history, timeline aggregation, and live SSE streaming
- **API metrics:** Per-endpoint request tracking with rollup aggregation for operational analysis

### Data Feeds and Oracle Integration

The Feeds system provides market data integration:

- Exchange rate feeds with configurable refresh intervals
- Batch orchestration for feed updates across multiple data sources
- Token price auto-routing and resolution for multi-currency operations
- Feed indexer projections for queryable historical price data

---

## 8. Integration Architecture

### Core Banking Integration Patterns

DALP integrates with existing core banking infrastructure through standard APIs without requiring a parallel operating model:

**Inbound Integration (Core Banking to DALP):**
- Investor onboarding triggers from CRM/core banking systems via REST API
- Settlement instructions from treasury management systems
- Payment confirmations from payment processing systems
- Account data synchronization for investor verification

**Outbound Integration (DALP to Core Banking):**
- Transaction notifications via webhooks for general ledger updates
- Settlement completion events for reconciliation
- Compliance decision notifications for risk management systems
- Corporate action execution confirmations for entitlement processing

**Integration Design Principles:**
- No direct external calls from business logic
- All external interactions route through dedicated gateway components
- Retry handling, circuit breaking, and observability for all integration points
- Versioned API contracts with backward compatibility commitments

### Custody Integration

DALP implements a bring-your-own-custodian model:

**DFNS Integration:**
- Threshold MPC signing
- REST API integration with flat wallet model
- Full programmatic approval resolution through DFNS Policy Engine
- Operators approve/reject transactions without leaving DALP
- Auto-sign policies, threshold rules, IP/time restrictions, and multi-party approval

**Fireblocks Integration:**
- MPC-CMP with continuous key refresh
- REST API with vault account hierarchy
- Transaction Authorization Policy (TAP) for thresholds, whitelists, velocity limits
- Approval visibility in DALP with resolution through Fireblocks Console or Co-Signer
- Production and sandbox environment auto-detection

**Local Signer:**
- Five secret storage backends: local encrypted DB, AWS Secrets Manager, GCP Secret Manager, Azure Key Vault, HashiCorp Vault
- Synchronous sign-and-broadcast for development and testing scenarios
- HSM integration through cloud secret manager backends

For Mashreq Bank, the recommended approach is **Fireblocks** as the primary institutional custody provider, given Fireblocks' established presence in the UAE banking sector and their comprehensive TAP policy engine. DFNS integration provides a secondary option for specific use cases or future flexibility.

### Payment Rails

DALP supports payment rail integration for the cash leg of digital asset operations:

- **ISO 20022 compatibility:** Integration-ready for SWIFT, SEPA, and RTGS message formats
- **UAE payment infrastructure:** Integration points for UAE payment systems, including IPP (Instant Payments Platform) and UAEDDS (Direct Debit System)
- **Stablecoin cash leg:** On-chain cash instruments (deposit tokens, stablecoins) enable fully atomic DvP settlement without external payment rail dependencies

### Market Infrastructure Connectivity

- **Exchange connectivity:** Settlement connectivity to exchanges and liquidity pools for secondary market activity
- **CSD integration:** Interface capability for connecting with central securities depositories
- **Reporting infrastructure:** Structured data export for regulatory reporting systems

### SSO/IAM and SIEM Integration

- **Authentication:** Better Auth-based authentication with configurable identity providers. SSO integration is deployment-specific and can align with Mashreq Bank's existing identity infrastructure.
- **SIEM-ready:** DALP provides structured audit logging and observability data suitable for integration with Mashreq Bank's SIEM platform. Log formats support standard ingestion patterns.
- **API key management:** Dedicated REST endpoint with HTTP-method-based scope enforcement for system-to-system authentication.

---

## 9. Deployment Model

### On-Premises Deployment in UAE

DALP deploys on-premises within Mashreq Bank's UAE data center infrastructure using Helm charts on Kubernetes. This deployment model provides:

- **Full data residency control:** All data, including identity information, transaction records, compliance decisions, and audit logs, remains within Mashreq Bank's infrastructure
- **Network isolation:** Blockchain nodes, API services, and database systems operate within the bank's network perimeter
- **Sovereign key management:** Cryptographic keys managed within the bank's security boundary
- **Regulatory compliance:** Meets CBUAE and VARA data residency requirements without reliance on external cloud infrastructure

### Infrastructure Requirements

| Component | Specification |
|-----------|--------------|
| **Container Orchestration** | Kubernetes 1.28+ (EKS, AKS, GKE, or on-prem) |
| **Database** | PostgreSQL 15+ with replication for high availability |
| **Blockchain Nodes** | Hyperledger Besu nodes (minimum 4 validators for QBFT consensus) |
| **Workflow Runtime** | Restate runtime for durable workflow execution |
| **Subgraph Indexer** | TheGraph node for blockchain event indexing |
| **Object Storage** | S3-compatible storage for document management |
| **Monitoring Stack** | VictoriaMetrics, Loki, Tempo, Grafana |
| **Secret Management** | HashiCorp Vault or cloud-equivalent KMS |
| **Compute** | Minimum 16 vCPU, 64GB RAM per node (3+ nodes recommended) |
| **Storage** | SSD-backed storage for database and blockchain state |

### High Availability Architecture

DALP's architecture supports high availability at every layer:

- **Application layer:** Multiple DAPI instances behind load balancers with session affinity. Restate workflows provide built-in resilience; operations resume after instance recovery.
- **Database layer:** PostgreSQL primary-replica configuration with automatic failover. Point-in-time recovery capability for disaster scenarios.
- **Blockchain layer:** QBFT consensus tolerates f Byzantine faults with 3f+1 validators. A four-validator network tolerates one node failure while maintaining consensus.
- **Indexer layer:** TheGraph node replication with automated failover. Blockchain health monitoring detects indexer degradation with hysteresis-based alerting.
- **Monitoring layer:** Grafana, VictoriaMetrics, and Loki operate as independent services with their own persistence, providing observability even during partial platform degradation.

### Disaster Recovery and Business Continuity

| Recovery Objective | Target | Implementation |
|-------------------|--------|----------------|
| **RPO (Recovery Point Objective)** | < 1 minute | Synchronous database replication, continuous blockchain state |
| **RTO (Recovery Time Objective)** | < 30 minutes | Automated failover, pre-provisioned standby infrastructure |
| **Data durability** | 99.999% | Multi-zone replication, encrypted backups |
| **Blockchain state** | Immutable | Distributed across validator nodes, recoverable from any node |

Disaster recovery procedures include:

1. Automated database failover to standby replica
2. Blockchain node recovery from peer synchronization
3. Workflow state recovery through Restate's durable execution guarantees
4. Indexer re-synchronization from blockchain event history
5. Monitoring stack independent recovery

### Environment Strategy

| Environment | Purpose | Infrastructure |
|------------|---------|----------------|
| **Development** | Feature development, unit testing | Single-node, local signer, test blockchain |
| **Staging** | Integration testing, UAT | Production-mirror, test custody provider, test blockchain |
| **Production** | Live operations | Full HA, institutional custody, production blockchain |
| **DR** | Disaster recovery standby | Warm standby, synchronized state, automated failover |

---

## 10. Security

### Security Architecture

DALP implements security across five distinct layers:

**Layer 1: Network Security**
- Blockchain node communication encrypted via TLS
- API endpoints served over HTTPS with certificate management
- Network segmentation between application, database, and blockchain tiers
- Firewall rules restricting inter-service communication to required ports and protocols

**Layer 2: Application Security**
- Input validation with hostile-input regression testing (SQLi-like and XSS-like payloads included in test suites)
- DAPI middleware enforces authentication, authorization, and tenant isolation on every request
- API key endpoint affinity: API keys are blocked on the RPC endpoint, preventing authentication method misuse
- Rate limiting and request throttling for API endpoints

**Layer 3: Identity and Access Security**
- OnchainID provides verifiable, on-chain identity for all participants
- RBAC with five defined roles and four layers of access control
- Maker-checker workflows for all sensitive operations
- Wallet verification with multi-factor authentication (PIN code, TOTP, secret codes)
- Session management with organization-scoped membership verification

**Layer 4: Cryptographic Security**
- Private key storage across multiple security tiers (encrypted DB, cloud KMS, HSM, MPC custody)
- ERC-8021 transaction attribution for provenance tracking
- Content-hash verification for KYC data integrity
- Digital signature verification for all on-chain operations

**Layer 5: Operational Security**
- Full audit logging with structured, queryable event history
- Blockchain health monitoring with automated alerting
- Transaction reconciliation and cancellation workflows
- Nonce management with self-healing for stuck transactions
- Emergency pause capability for asset operations

### Key Management

Key Guardian provides unified key management across multiple backend providers:

**Storage Backend Hierarchy:**

| Tier | Backend | Security Level | Use Case |
|------|---------|---------------|----------|
| 1 | HSM (FIPS 140-2 L3) | Hardware-protected | Regulated production |
| 2 | Fireblocks/DFNS MPC | Distributed key shares | Institutional custody |
| 3 | Cloud KMS (AWS/GCP/Azure) | Platform-managed | Standard production |
| 4 | HashiCorp Vault | Software-managed | Hybrid environments |
| 5 | Encrypted database | Application encryption | Development only |

For Mashreq Bank, the recommended configuration is HSM integration for platform signing keys combined with Fireblocks MPC for institutional custody operations.

**Key Operations:**
- Wallet creation and provisioning through provider-agnostic abstraction
- Transaction signing with provider-specific execution paths
- Key recovery through identity recovery workflows (durable, phase-tracked process)
- Forced movement recovery for compromised wallet scenarios
- Nonce management with durable coordination and operator repair surfaces

### Access Control

DALP implements access control across 26 distinct permission scopes organized in four layers:

**Platform Level:** Administrator roles for organization management, system configuration, and platform governance
**System Level:** System manager roles for blockchain operations, compliance configuration, and identity management
**Token Level:** Token manager roles for asset operations, minting, transfer management, and corporate actions
**User Level:** Participant roles for transfer execution, claim management, and portfolio interaction

Separation of duties is enforced through:
- Role exclusivity rules preventing concentration of authority
- Maker-checker approval requirements for sensitive operations
- Wallet verification gates for privileged transaction signing
- Organization-scoped membership verification for tenant isolation

### Data Protection

- **Encryption at rest:** Database encryption, blockchain state encryption on disk, secret storage encryption
- **Encryption in transit:** TLS for all API communications, encrypted blockchain node peering
- **PII handling:** Identity data stored in compliance with data protection requirements. KYC data integrity verified through content-hash comparison.
- **Document management:** Versioned document storage with SHA-256 hash verification, visibility-aware access controls, and controlled disclosure

### Security Certifications

SettleMint maintains:
- **ISO 27001** certification for information security management
- **SOC 2 Type II** compliance for service organization controls
- Regular penetration testing by independent security firms
- Security review processes aligned with tier-1 bank vendor risk assessment requirements

---

## 11. Implementation Approach

### Phase 1: Foundation and Bond Lifecycle (Months 1-4)

**Objective:** Deploy DALP core infrastructure and deliver a production bond lifecycle.

**Month 1: Infrastructure and Platform Setup**
- Provision Kubernetes cluster in Mashreq Bank's UAE data center
- Deploy DALP platform components (DAPI, blockchain nodes, database, monitoring)
- Configure Hyperledger Besu private network with QBFT consensus (4 validators)
- Establish development, staging, and production environments
- Integrate with Mashreq Bank's identity infrastructure for SSO
- Deploy monitoring stack (VictoriaMetrics, Loki, Tempo, Grafana)

**Month 2: Identity and Compliance Foundation**
- Configure OnchainID identity infrastructure
- Integrate with Mashreq Bank's KYC/KYB provider for claim issuance
- Deploy compliance modules for UAE regulatory requirements:
  - Country allow/block lists (CBUAE/VARA alignment)
  - Investor accreditation verification (DFSA qualified investor)
  - Transfer amount limits (regulatory reporting thresholds)
  - Holding period enforcement
- Configure role-based access control aligned with Mashreq Bank's organizational structure
- Establish maker-checker approval workflows

**Month 3: Bond Template and Custody Integration**
- Deploy bond asset template with Mashreq-specific term configurations
- Integrate Fireblocks as primary custody provider
- Configure maker-checker signing workflows
- Implement bond issuance workflow: template selection through deployment
- Configure coupon processing automation
- Set up maturity and redemption logic

**Month 4: Testing, UAT, and Go-Live**
- System integration testing across all components
- Performance testing under expected transaction volumes
- Security testing and penetration testing
- User acceptance testing with Mashreq Bank operations teams
- Operational readiness testing (failover, recovery procedures)
- Production go-live for bond lifecycle

**Phase 1 Deliverables:**
- Production DALP platform in Mashreq Bank's data center
- Bond issuance and lifecycle management
- UAE regulatory compliance configuration
- Institutional custody integration
- Monitoring and observability
- Operations team training

### Phase 2: Multi-Asset Expansion (Months 5-8)

**Objective:** Expand to deposit tokens, stablecoins, and fund tokenization.

**Month 5-6: Deposit Token and Stablecoin Deployment**
- Deploy deposit token template for tokenized bank deposits
- Configure interest calculation and maturity management
- Deploy stablecoin template for AED-pegged or USD-pegged operations
- Configure reserve monitoring and minting/burning controls
- Extend compliance modules for deposit and stablecoin-specific requirements
- Integration with Mashreq Bank's treasury management systems

**Month 7-8: Fund Tokenization and Primary Offering**
- Deploy fund asset template for tokenized investment products
- Configure NAV integration, subscription/redemption automation
- Deploy token sale addon for primary distribution
- Configure presale mechanics, payment currencies, and investor limits
- Extend identity infrastructure for broader investor onboarding
- User acceptance testing and production deployment

**Phase 2 Deliverables:**
- Production deposit token operations
- Production stablecoin operations
- Fund tokenization and primary offering capability
- Extended compliance configuration
- Core banking integration for deposit and payment operations

### Phase 3: Advanced Settlement and Cross-Border (Months 9-12)

**Objective:** Deliver atomic settlement, multi-party settlement, and cross-border capabilities.

**Month 9-10: XvP Settlement and Multi-Party Operations**
- Deploy XvP settlement addon for atomic DvP/XvP operations
- Configure multi-party settlement workflows with approval requirements
- Implement hashlock-based cross-chain settlement capability
- Integration with payment rails for cash leg settlement
- Deploy vault addon for multi-signature custody operations

**Month 11-12: Cross-Border and Advanced Features**
- Configure multi-chain deployment for cross-border operations
- Extend compliance modules for international jurisdictions
- Deploy real estate tokenization template (aligned with Dubai tokenization strategy)
- Deploy configurable token template for sukuk and custom instruments
- Advanced reporting and regulatory export capabilities
- Full platform optimization and performance tuning

**Phase 3 Deliverables:**
- Atomic DvP/XvP settlement capability
- Cross-border digital asset operations
- Real estate tokenization
- Sukuk and custom instrument support
- Full multi-asset operating model

### Governance Model

**Steering Committee:**
- Quarterly executive reviews with Mashreq Bank C-suite and SettleMint leadership
- Strategic direction, budget, and scope governance
- Regulatory change impact assessment

**Project Management Office (PMO):**
- Bi-weekly sprint reviews with delivery status, risk register, and dependency tracking
- Change management and scope control
- Resource allocation and timeline management

**Architecture Board:**
- Monthly technical reviews covering architecture decisions, integration patterns, and security posture
- Performance benchmarking and capacity planning
- Technology roadmap alignment

### Testing Strategy

| Test Type | Scope | Timing |
|-----------|-------|--------|
| **Unit Testing** | Smart contract logic, API endpoints, compliance modules | Continuous during development |
| **Integration Testing** | Inter-service communication, custody integration, payment rail connectivity | Sprint cycles |
| **System Integration Testing (SIT)** | End-to-end workflows across all platform components | Pre-UAT |
| **Performance Testing** | Transaction throughput, latency under load, concurrent user capacity | Pre-UAT |
| **Security Testing** | Penetration testing, vulnerability scanning, smart contract audit | Pre-go-live |
| **User Acceptance Testing (UAT)** | Business workflow validation with Mashreq Bank operations teams | Pre-go-live |
| **Operational Readiness Testing (ORT)** | Failover, recovery, monitoring, alerting, runbook validation | Pre-go-live |
| **Disaster Recovery Testing** | Full DR failover and recovery procedure validation | Post-go-live |

### Training and Knowledge Transfer

SettleMint provides training across five stakeholder groups:

| Stakeholder Group | Training Focus | Format |
|-------------------|---------------|--------|
| **Platform Administrators** | Infrastructure management, Kubernetes operations, monitoring, incident response | Hands-on workshop (5 days) |
| **Operations Teams** | Asset issuance, compliance configuration, custody operations, corporate actions | Hands-on workshop (3 days) |
| **Compliance Officers** | Compliance module configuration, regulatory reporting, audit trail navigation | Workshop + documentation (2 days) |
| **Integration Engineers** | API integration, webhook configuration, core banking connectivity | Technical workshop (3 days) |
| **Business Stakeholders** | Platform capabilities, use case overview, operational dashboards | Executive briefing (1 day) |

All training includes comprehensive documentation, runbooks, and developer guides aligned with DALP's published documentation.

---

## 12. Support and SLA Framework

### SLA Targets

| Severity | Description | Response Time | Resolution Target |
|----------|-------------|---------------|-------------------|
| **Severity 1** | Platform unavailable, settlement blocked, compliance enforcement failure | 30 minutes | 4 hours |
| **Severity 2** | Significant functionality degraded, workaround not available | 2 hours | 8 hours |
| **Severity 3** | Functionality impaired, workaround available | 4 hours | 24 hours |
| **Severity 4** | Minor issue, cosmetic, or enhancement request | 1 business day | Next scheduled release |

### Support Tiers

**Tier 1: Platform Operations Support**
- 24/7 monitoring and alerting through DALP's built-in observability stack
- First-response incident triage and classification
- Known-issue resolution from operational runbooks
- Escalation to Tier 2 for unresolved issues

**Tier 2: Technical Support**
- Platform engineering team with deep DALP expertise
- Root cause analysis for complex issues
- Configuration changes and compliance module adjustments
- Performance optimization and capacity planning

**Tier 3: Engineering Support**
- SettleMint engineering team for platform-level issues
- Smart contract analysis and blockchain-level investigation
- Security incident response and forensics
- Custom feature development and platform enhancements

### Maintenance Windows

- **Standard maintenance:** Weekly, during agreed off-peak hours (e.g., Friday 23:00-02:00 GST)
- **Emergency maintenance:** As required with minimum 2-hour notice for critical security patches
- **Platform updates:** Quarterly release cycles with staging environment validation before production deployment

### Platform Updates and Regulatory Change Management

SettleMint provides ongoing platform evolution:

- Quarterly platform releases with new features, security patches, and performance improvements
- Regulatory change impact assessments when UAE regulatory frameworks are updated
- Compliance module updates to align with new regulatory requirements
- Proactive security patching for identified vulnerabilities
- Backward-compatible API versioning with documented deprecation windows

---

## 13. Commercial Framework

### Platform Licensing

DALP platform licensing follows an AUM/volume tiered model:

| Tier | AUM Range | Description |
|------|-----------|-------------|
| **Foundation** | Up to $500M AUM | Core platform with up to 3 asset templates |
| **Growth** | $500M - $2B AUM | Full platform with all 7 asset templates and XvP settlement |
| **Scale** | $2B+ AUM | Full platform with multi-chain, cross-border, and advanced features |

Licensing is annual, covering the DALP platform, all standard updates, and access to new compliance modules and asset template enhancements released during the license period.

### Implementation Services

| Phase | Scope | Commercial Model |
|-------|-------|-----------------|
| **Phase 1** | Foundation and Bond Lifecycle | Fixed fee |
| **Phase 2** | Multi-Asset Expansion | Fixed fee |
| **Phase 3** | Advanced Settlement and Cross-Border | Fixed fee |

Fixed-fee phases provide cost certainty for Mashreq Bank. Each phase has defined deliverables and acceptance criteria.

### Annual Support

Annual support covers:
- 24/7 Severity 1 incident response
- Business hours Severity 2-4 support
- Quarterly platform updates
- Regulatory change management
- Dedicated customer success manager

### Commercial Principles

- **No vendor lock-in:** DALP uses open standards (ERC-3643, EVM, ISO 20022). Mashreq Bank retains full ownership of deployed smart contracts and on-chain data.
- **Transparent pricing:** No hidden fees for compliance module activation, user counts, or transaction volumes within the licensed tier.
- **Flexible scaling:** Upgrade between tiers as AUM grows without re-implementation.
- **Data ownership:** All data generated on Mashreq Bank's infrastructure belongs to Mashreq Bank.

---

## 14. Why SettleMint

### Summary of Key Advantages

**1. The only complete digital asset lifecycle platform designed for regulated institutions**
DALP covers issuance, compliance, custody, settlement, and servicing in a single platform. No other vendor offers the combination of multi-asset lifecycle automation, ex-ante compliance enforcement, atomic settlement, institutional custody integration, and multi-jurisdiction compliance coverage in one integrated system.

**2. Nearly a decade of institutional blockchain delivery**
SettleMint has been building blockchain infrastructure for regulated institutions since 2016. This is not a startup pivoting to tokenization; it is a company that has spent its entire existence solving the specific challenges of operating digital assets in regulated environments.

**3. Production-proven at bank and sovereign scale**
Multi-year continuous production deployments with regulated banks and sovereign entities demonstrate operational maturity in compliance-heavy environments. DALP is the product of sustained iteration with regulated clients, not a theoretical architecture.

**4. MENA presence and UAE regulatory expertise**
Active sovereign-scale programs in the Middle East, deep familiarity with CBUAE, VARA, DFSA, and SCA requirements, and deployment experience within GCC regulatory frameworks make SettleMint uniquely positioned to support Mashreq Bank's specific regulatory context.

**5. ERC-3643: The open standard for regulated tokens**
DALP implements ERC-3643 natively, not a proprietary token standard. This means Mashreq Bank's digital assets are interoperable with any other system that supports ERC-3643, avoiding vendor lock-in at the token standard level.

**6. Deployment flexibility under Mashreq Bank's control**
On-premises deployment in UAE data centers, bring-your-own-custodian integration, and support for both private and public EVM networks give Mashreq Bank full architectural control.

### Reference Experience Relevant to Mashreq

- **Regulated bank deployments:** Multi-year production deployments with tier-1 and tier-2 banks across Asia, Europe, and MENA, demonstrating the operational maturity Mashreq Bank requires
- **Bond lifecycle programs:** Live bond issuance and lifecycle management, including fractionalization, automated coupon processing, and secondary market settlement
- **Sovereign-scale programs:** National real estate tokenization and sovereign-backed digital asset infrastructure in the Middle East, proving DALP operates at country scale under regulatory scrutiny
- **UAE/GCC regulatory alignment:** Practical experience implementing compliance frameworks aligned with Gulf regulatory requirements, data residency standards, and Islamic finance structures

### Commitment

SettleMint is committed to making Mashreq Bank's digital asset platform a reference deployment in the Middle East. We bring the technology, the regulatory expertise, the delivery capability, and the long-term partnership approach that institutional-scale digital asset operations demand.

We look forward to the opportunity to discuss this proposal in detail and demonstrate DALP's capabilities to Mashreq Bank's technical, compliance, and business teams.

---

## Appendices

### Appendix A: Technical Specifications

| Specification | Detail |
|--------------|--------|
| **Blockchain compatibility** | Any EVM-compatible network (Ethereum JSON-RPC) |
| **Recommended consensus** | QBFT (Hyperledger Besu) for private networks |
| **Token standard** | ERC-3643 (T-REX) with SMART Protocol extensions |
| **Identity standard** | OnchainID with claim-based verification |
| **Compliance modules** | 18 types across 6 categories |
| **Asset templates** | 7 pre-built + configurable token |
| **Custody providers** | DFNS, Fireblocks, local HSM, cloud KMS |
| **API protocols** | oRPC, REST (v2), GraphQL, webhooks, CLI |
| **Workflow runtime** | Restate (durable execution) |
| **Database** | PostgreSQL 15+ |
| **Observability** | VictoriaMetrics, Loki, Tempo, Grafana |
| **Container orchestration** | Kubernetes (Helm charts) |
| **Secret management** | HashiCorp Vault, AWS SM, GCP SM, Azure KV |
| **Deployment model** | On-premises, dedicated cloud, managed SaaS |
| **Feature system** | Up to 32 pluggable features per token (SMART Configurable) |

### Appendix B: Compliance Modules Summary

| # | Module | Category | Description |
|---|--------|----------|-------------|
| 1 | Country Allow List | Eligibility | Restrict to approved jurisdictions |
| 2 | Country Block List | Eligibility | Block sanctioned jurisdictions |
| 3 | Investor Accreditation | Eligibility | Verify accreditation claims |
| 4 | Maximum Holder Count | Restrictions | Cap distinct holders |
| 5 | Conditional Transfer Restrictions | Restrictions | Dynamic condition evaluation |
| 6 | Address-Specific Restrictions | Restrictions | Per-address controls |
| 7 | Transfer Amount Limits | Transfer Controls | Min/max transfer sizes |
| 8 | Maximum Balance | Transfer Controls | Concentration risk limits |
| 9 | Transfer Policy | Transfer Controls | Comprehensive rule evaluation |
| 10 | Supply Cap | Issuance/Supply | Hard supply limit |
| 11 | Minting Restrictions | Issuance/Supply | Controlled minting |
| 12 | Capped Supply | Issuance/Supply | Dynamic supply management |
| 13 | Holding Period | Time-Based | Minimum hold duration |
| 14 | Lock-Up Windows | Time-Based | Period-restricted transfers |
| 15 | Time-Restricted Trading | Time-Based | Trading window enforcement |
| 16 | Collateral Backing | Settlement/Collateral | Reserve verification |
| 17 | Settlement Conditions | Settlement/Collateral | Pre-settlement requirements |
| 18 | Transaction Fee | Settlement/Collateral | Fee collection enforcement |

### Appendix C: Asset Template Capabilities

| Capability | Bonds | Equity | Funds | Stablecoins | Deposits | Real Estate | Precious Metals |
|-----------|-------|--------|-------|-------------|----------|-------------|-----------------|
| Configurable terms | Yes | Yes | Yes | Yes | Yes | Yes | Yes |
| Compliance modules | Yes | Yes | Yes | Yes | Yes | Yes | Yes |
| Automated distributions | Coupon | Dividend | NAV-based | N/A | Interest | Rental | N/A |
| Maturity processing | Yes | N/A | N/A | N/A | Yes | N/A | N/A |
| Fractional units | Yes | Yes | Yes | Yes | Yes | Yes | Yes |
| Secondary transfer | Yes | Yes | Yes | Yes | Yes | Yes | Yes |
| Voting rights | N/A | Yes (ERC-5805) | Yes | N/A | N/A | Yes | N/A |
| Convertible mechanics | Yes | Yes | N/A | N/A | N/A | N/A | N/A |
| Reserve monitoring | N/A | N/A | N/A | Yes | Yes | N/A | Yes |
| Treasury payout | Yes | Yes | Yes | N/A | Yes | Yes | N/A |
| Token sale/primary offering | Yes | Yes | Yes | N/A | N/A | Yes | Yes |
| XvP settlement | Yes | Yes | Yes | Yes | Yes | Yes | Yes |

---

**SettleMint NV**
Confidential. This document contains proprietary information intended solely for Mashreq Bank.
