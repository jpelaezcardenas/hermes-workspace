# About DALP — Digital Asset Lifecycle Platform

## Platform Overview

Tokenization technology is increasingly accessible, but institutional-grade implementation is not. Running a pilot or minting a token is straightforward — production deployment that meets regulatory requirements, implements proper governance, supports the full asset lifecycle, and scales into real institutional infrastructure is where most institutions get stuck. DALP exists to solve this gap.

DALP is SettleMint's Digital Asset Lifecycle Platform for designing, launching, and operating tokenized assets across financial instruments and real-world assets, including bonds, funds, deposits, stablecoins, real estate, equities, and precious metals. Institutions deploy DALP on day one without building internal blockchain expertise, without lengthy development cycles, and without assembling infrastructure piecemeal from multiple vendors.

Unlike point solutions that address only issuance, only custody, or only trading, DALP provides a unified platform covering the full digital asset lifecycle — from asset design through issuance, compliance enforcement, custody integration, settlement, servicing, and retirement — treated as one continuous lifecycle under a single governance model, security posture, and operating framework.

DALP sits between existing core financial systems and multiple blockchain networks, providing the governance and orchestration layer that enables institutions to build, deploy, and operate compliant digital asset solutions in production. By abstracting the blockchain layer and embedding compliance and governance directly into the platform, DALP enables institutions to move from exploration to execution much faster. The platform is designed to be operated over time, not just deployed — managing every event in an asset's lifetime from creation to retirement.

## Value Proposition

DALP delivers a unified platform for the entire digital asset lifecycle, eliminating the complexity of assembling and operating separate tools, and guaranteeing compliant, atomic operations with full auditability.

By consolidating issuance, compliance, custody, settlement, servicing, and reporting into a single integrated system with a unified registry and control plane, DALP:

- **Removes the integration tax** that comes from assembling separate tools for each lifecycle stage — eliminating operational risk, unclear ownership, and accountability gaps.
- **Enforces compliance ex-ante** in every transaction — eligibility is validated before execution, not reviewed after.
- **Enables atomic DvP/XvP settlement** where asset and cash legs complete together or revert together, eliminating counterparty risk and reconciliation gaps.
- **Delivers T+0 settlement finality** with compliance enforcement built into every transaction.
- **Provides full auditability** with structured logging, complete event traceability, and immutable audit trails across the lifecycle.

### Business Outcomes Enabled

| Outcome | Detail |
|---|---|
| **Faster Launch Timelines** | 60–80% reduction in launch timelines through pre-built asset templates, jurisdictional compliance templates, and modern APIs — weeks vs. months of custom development |
| **Reduced Operational Risk** | Single source of truth eliminates multi-vendor drift and nightly reconciliations; atomic operations keep ownership, compliance, and custody synchronised |
| **Regulatory Confidence** | Compliance-by-design enforces eligibility before execution; auditable evidence of checks and approvals embedded in the system that executes transfers |
| **Scalable Business Models** | Expand across instruments, jurisdictions, and networks using the same control plane, rule engine, and operating model |
| **Strategic Flexibility** | Deploy on-prem, cloud, or managed SaaS; connect to existing custodians and payment rails; operate on public or private chains without lock-in |

## Core Lifecycle Pillars

DALP is structured around five integrated core-lifecycle modules, each deployable independently or as part of a unified platform:

### 1. Issuance

Rapid deployment of tokenized assets across seven asset classes — bonds, equities, funds, deposits, stablecoins, real estate, and precious metals — each with purpose-built lifecycle logic. Features include:

- Configurable business rules, compliance controls, and term structures per asset class
- Asset Designer wizard with validation for enterprise-safe input handling
- Deterministic issuance orchestration with class-specific validation, factory dispatch, and claim enrichment
- Paused-by-default behaviour with explicit unpause control for governance
- Role-based permission bootstrapping (governance role assigned to creator by default)
- Seamless integration into existing core systems and governance frameworks

Additionally, DALP supports a **Configurable Token** type that enables institutions to digitise any asset class beyond the seven pre-built templates — such as carbon credits, trade finance instruments, insurance-linked securities, or loyalty programmes — using a composable, feature-rich token architecture with up to 32 pluggable features per token, added or reordered post-deployment without redeploying the token itself.

### 2. Compliance

Ex-ante enforcement ensures every transfer is validated before execution, not reviewed after. DALP's compliance architecture includes:

- **18 compliance module types** covering country restrictions, investor accreditation, supply limits, holding periods, collateral backing, transfer controls, and more
- **Multi-jurisdictional support** modelling complex requirements across EU MiCA, Singapore MAS, UK FCA, Japan FSA, US Reg D/S/CF, and GCC frameworks
- **ERC-3643 (T-REX) regulated token standard** — the actual open standard DALP implements, not a proprietary compliance mechanism
- **OnchainID** for verifiable, on-chain investor identities with claim-based verification (KYC/KYB credentials, accreditation status, jurisdictional eligibility) reusable across all assets
- **Two-layer policy model**: DALP compliance modules enforce on-platform transfer rules; custodian policies enforce additional rules outside DALP scope
- **Three-tier compliance interface hierarchy** for incremental migration across token versions
- **Real-time monitoring**, automated policy enforcement, role-based access, and audit trails that scale across asset types

### 3. Custody

Institutional key management workflows with bring-your-own-custodian integrations. DALP orchestrates custody policy across existing custodian relationships — it does not act as a custodian itself. Capabilities include:

- **Key Guardian** with multiple storage backends: encrypted database, cloud secret manager, HSM, and third-party custody via Fireblocks and DFNS
- **Maker-checker approval workflows** with configurable multi-signature quorum
- **Role-based access control (RBAC)** with 5 defined roles
- **Emergency pause capability** and formal recovery procedures
- **Provider-delegated transaction broadcast** for DFNS and Fireblocks, where the custodian owns nonce allocation, gas handling, signing, and broadcast while DALP retains permissioning and workflow control
- **Custody vault provisioning** with deterministic registration, directory-based implementation resolution, contract-identity binding, and projection bootstrap for vault telemetry

### 4. Settlement

Atomic Delivery-versus-Payment (DvP) and Exchange-versus-Payment (XvP) settlement for asset and cash legs — both complete together or revert together — eliminating counterparty risk, reconciliation gaps, and operational drift.

- **Local (same-chain) and HTLC (cross-chain) settlement models**
- **Deterministic settlement closure** into auditable end-states (executed, cancelled, or expired-withdrawn) with closure-readiness checks
- **On-chain settlement finality** with compliance enforcement built into every transaction
- **ISO 20022 integration** for SWIFT, SEPA, and RTGS connectivity on payment rails

### 5. Servicing

Automated lifecycle operations — coupon payments, yield distribution, dividend processing, redemptions, maturity handling — executed programmatically across every asset type. This is the operational capability most platforms lack entirely: managing the asset from issuance through every event in its lifecycle to retirement.

- **Automated corporate actions** across the full lifecycle
- **Fixed treasury yield** and **AUM fee** features with configurable schedules
- **Maturity redemption** with treasury payout abstraction (supports both EOA and contract-based treasuries)
- **Distribution mechanisms** including token sale/primary offerings, airdrop systems (push, time-bound, vesting), and claim fulfilment workflows

## Platform Foundations

Beneath the five lifecycle pillars, DALP provides three cross-cutting platform foundations:

### Identity and Access Management

DALP embeds a unified identity layer across the entire platform:

- **OnchainID** provides verifiable, on-chain investor identities
- **Identity Registry** manages verified profiles with claim-based verification — reusable across all assets and transactions
- **RBAC** governs every action with 5 defined roles, from token issuance to transfer approval
- **KYC/KYB profile management** with structured review workflows (approve, reject, request-update) and deterministic remediation loops
- **Invitation-linked onboarding** binding user enrolment to tenant membership boundaries
- **Wallet verification** with multi-factor gates (PIN, OTP, secret codes) for privileged transaction signing
- **Identity recovery** with durable, phase-tracked workflows for wallet loss or compromise scenarios

### Integration and Interoperability

DALP is designed to operate within existing institutional environments, not replace them:

- **Comprehensive APIs**: REST, GraphQL, event webhooks, and oRPC providing programmatic access to every platform capability
- **Typed SDK** (@settlemint/dalp-sdk) for TypeScript integrators with contract-bound REST client, serialisers, and error code system
- **CLI** with 301 commands across 26 groups for system administration, token lifecycle, identity, compliance, monitoring, and addon workflows
- **Payment rail connectivity** supporting ISO 20022 standards (SWIFT, SEPA, RTGS)
- **Bring-your-own-custodian** integrations (Fireblocks, DFNS)
- **Bring-your-own-chain** flexibility (public or private EVM-compatible networks)
- **External token registration** for governed onboarding of tokens from other platforms
- **Multi-provider object storage** supporting AWS S3, GCP, Azure, S3-compatible, MinIO, RustFS, and local filesystem
- Deployable on-prem, in dedicated cloud, or as managed SaaS

### Observability and Operations

DALP ships a full operational tooling stack:

- **Pre-built dashboards** (Grafana) covering operations overview, transaction monitoring, compliance activity, and security events
- **Three-pillar observability**: metrics (VictoriaMetrics), logs (Loki), traces (Tempo/OpenTelemetry)
- **Distributed tracing** across DAPI, external signer integrations, and full transaction lifecycle
- **Automated alerting** with structured Slack notification templates for firing/resolved alert states
- **Blockchain infrastructure monitoring** with health collection, timeline aggregation, and live SSE snapshot streaming
- **Async transaction pipeline** with 11-state lifecycle management, idempotency, retry semantics, dead-letter rescue, and full state-transition audit trail
- **534 structured error codes** (DALP-1001 through DALP-NNNN) with metadata, i18n translations in 4 locales, and SDK mirror
- **Durable workflow orchestration** via Restate — multi-step workflows survive process restarts and infrastructure failures

## Supported Standards and Protocols

| Category | Standards |
|---|---|
| **Token Standards** | ERC-20, ERC-721, ERC-1400, ERC-3643 (T-REX), ERC-5805 (voting power), EIP-2612 (permits) |
| **Identity** | OnchainID, claim-based verification |
| **Account Abstraction** | ERC-4337 smart accounts, ERC-7579 modular validation |
| **Compliance** | 18 module types across eligibility, restrictions, transfer controls, issuance/supply, time-based rules, and settlement/collateral |
| **Settlement** | Atomic DvP/XvP, HTLC cross-chain |
| **Payment Rails** | ISO 20022 (SWIFT, SEPA, RTGS) integration |
| **Regulatory Frameworks** | EU MiCA, US Reg D/S/CF, Singapore MAS, UK FCA, Japan FSA, GCC frameworks |
| **Blockchain Networks** | Any EVM-compatible network (public or private) |

## Supported Asset Classes

DALP provides purpose-built templates with asset-specific lifecycle logic for seven asset classes, plus a configurable token for custom assets:

1. **Bonds** — Automated coupon schedules, maturity logic, call/put options, secondary market connectivity
2. **Equities** — Automated dividend distribution, voting rights, corporate action processing
3. **Funds** — Automated NAV integration, fractional units, fee structures, subscription/redemption
4. **Deposits** — Programmable interest, maturity, withdrawal rules; bridge functionality for external networks
5. **Stablecoins** — Reserve monitoring, attestation integration, multi-currency support, regulatory reporting
6. **Real Estate** — Property title tokenisation, fractional ownership, rental income distribution
7. **Precious Metals** — Asset-backed tokens, provenance tracking, chain-of-custody documentation
8. **Configurable Token** — Composable architecture with up to 32 pluggable features for novel asset classes

## Differentiators vs. Custom Development

The real challenge for financial institutions is not tokenization itself — it is doing tokenization correctly at production scale. Building digital asset infrastructure from scratch requires assembling and integrating multiple point solutions — issuance tools, custody integrations, compliance engines, settlement protocols, and operational monitoring. This approach creates:

- **Coordination overhead**: Every change requires cross-vendor coordination; no single accountable platform
- **Extended timelines**: 18–24 months of custom development vs. weeks with DALP
- **Compliance gaps**: Compliance treated as an afterthought rather than embedded from day one, creating regulatory exposure
- **Operational risk**: No unified registry, no atomic operations, no institutional-level observability or alerting
- **Skills dependency**: Teams must maintain deep blockchain expertise alongside financial domain knowledge

DALP eliminates these challenges by providing:

- **One platform** covering the full lifecycle with a unified registry and control plane
- **Pre-built compliance** with 18 module types and jurisdictional templates, enforced ex-ante
- **Atomic settlement** ensuring both legs complete or both revert
- **Full operational tooling** including monitoring, alerting, distributed tracing, and structured error handling
- **Proven deployment patterns** validated through multi-year production at regulated banks and sovereign entities
- **Multi-asset scalability** — start with one asset class, expand to seven (plus configurable tokens) using the same platform

## Architecture Highlights

DALP's architecture is designed for institutional-level reliability, security, and deployment flexibility:

- **Durable execution engine** (Restate) ensuring multi-step workflows survive process restarts and infrastructure failures — enterprise reliability by design, not best-effort scripting
- **DAPI middleware control plane** converting authenticated API traffic into tenant-scoped, permission-aware, execution-ready operations
- **Custom PostgreSQL indexer** with zero-downtime schema lifecycle using rotating deployment schemas
- **Two-endpoint authentication** model: session-authenticated dApp frontend (RPC) and API-key-authenticated programmatic access (REST), with hard enforcement of auth-method-to-endpoint affinity
- **Async transaction pipeline** with idempotency, optimistic-lock state transitions, dead-letter rescue, and public status polling endpoint
- **Provider-delegated transaction broadcast** enabling institutional custody providers to own the volatile execution mechanics while DALP retains deterministic admission control
- **Multi-chain EVM support** with deployment flexibility across public and private networks
- **Helm-based deployment** with comprehensive chart configuration for cloud, on-premises, and hybrid environments

## Competitive Positioning

The digital asset market has plenty of issuance tools and custody solutions. What it lacks — and what DALP uniquely provides — is the operational lifecycle layer that sits between them.

Competitors typically:

- **Stop at issuance** without lifecycle management (Tokeny, Hedera, Brickken)
- **Focus on custody** without compliance or servicing depth (Fireblocks)
- **Build infrastructure without applications** requiring extensive custom development (R3, Digital Asset)
- **Serve a single regulatory regime** limiting geographic reach (Securitize/US, DTCC/US)

DALP's moat is the combination of multi-asset lifecycle automation, ex-ante compliance, atomic settlement, enterprise deployment flexibility, and multi-jurisdiction coverage — in one platform. No competitor currently offers all five together.
