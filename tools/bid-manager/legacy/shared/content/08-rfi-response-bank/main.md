# Section 8: RFI Response Bank

## How to Use This Document

This section provides a bank of reusable Q&A responses for common RFI (Request for Information) and RFP (Request for Proposal) questions. Each response is written at proposal grade — suitable for direct inclusion in formal submissions with minimal editing.

**Organization**: Responses are grouped into six categories:
1. Company & Background
2. Platform & Technology
3. Security & Compliance
4. Integration & Interoperability
5. Support & Operations
6. Implementation & Delivery

**Customization guidance**: Responses are written generically. Before submission, replace [CLIENT-SPECIFIC] placeholders, adjust for the specific RFI context, and verify that all capability claims are current against the latest DALP release.

---

## 8.1 Company & Background

### Q1.1: Please provide an overview of your company, including year of establishment, headquarters location, and global presence.

SettleMint was founded in 2016 and is headquartered in Europe. We have maintained a singular focus on blockchain infrastructure for enterprises and regulated institutions for nearly a decade, making us one of the most experienced companies in this space globally.

Our team combines deep expertise across banking, capital markets, regulatory compliance, and large-scale blockchain engineering. We operate across Europe, the Middle East and North Africa (MENA), and Asia-Pacific (JAPAC), with active client engagements, partnerships, and live production deployments in each region.

SettleMint serves financial institutions, market infrastructure providers, and sovereign entities through both direct engagements and partnerships with global consultancies and regional system integrators. Our global presence is supported by strategic investors in Europe and the Middle East, and board-level financial services expertise that ensures our platform development aligns with institutional requirements.

### Q1.2: What is your company's primary business focus and market positioning?

SettleMint is the digital asset lifecycle management company for regulated financial markets and sovereign use cases, with multi-year live deployments at tier-1 banks and national-scale programs. We are not a general-purpose blockchain vendor or a cryptocurrency platform — we focus exclusively on enabling financial institutions, market infrastructure providers, and sovereign entities to design, launch, and operate compliant digital asset programs.

Our positioning is built on a central insight: tokenization technology is increasingly accessible, but institutional-grade implementation is not. The real challenge lies in doing tokenization correctly at production scale — meeting regulatory requirements, implementing proper governance, supporting the full asset lifecycle, and ensuring that early pilots can scale into real institutional infrastructure. DALP addresses this gap by providing production-ready infrastructure from day one.

This positioning is reinforced by three pillars: (1) Technology — DALP provides deployment-ready infrastructure with compliance and governance embedded from day one; (2) Track Record — multi-year live deployments with regulated banks and sovereign entities; and (3) Team — deep, cumulative experience in tokenization, financial infrastructure, banking, capital markets, and regulatory compliance.

We operate in the regulated digital asset and real-world asset (RWA) infrastructure market, at the intersection of traditional financial infrastructure and blockchain technology, where regulation, risk management, and legacy integration are central requirements.

### Q1.3: Describe your company's experience with financial institutions and regulated environments.

SettleMint has 7+ years of continuous production deployments at regulated banks in Asia and Europe. Our platform technology has been battle-tested in real-world conditions across multiple regions and regulatory environments. Specific experience includes:

- **Regulated bank deployments**: Multi-year continuous production operations with tier-1 and tier-2 financial institutions, running asset issuance, lifecycle management (issuance → servicing → redemption), and high-volume transactional flows under institutional SLAs with 24/7 uptime requirements.
- **Sovereign-scale programs**: Active national-scale programs in the Middle East, including real estate tokenization and sovereign-backed capital markets infrastructure.
- **Security and compliance validation**: Our deployments have passed security reviews, penetration testing, and vendor risk assessments typical of large financial institutions.
- **Asset class breadth**: Live and planned deployments across bonds, equities, deposits, stablecoins, real estate, funds, and precious metals.

These deployments have matured from initial innovation pilots into business-critical workflows and long-lived platforms under IT ownership, directly shaping DALP's focus on lifecycle management, integration, and operational sustainability.

### Q1.4: What is your company's financial stability and long-term viability?

SettleMint is backed by leading investors in Europe and the Middle East, with board-level financial services expertise guiding strategic direction. The company has sustained nearly a decade of continuous operation, growing from early enterprise blockchain infrastructure into a focused digital asset lifecycle platform company.

Our business model is based on annual platform licensing with recurring support and maintenance revenue, providing revenue predictability. Multi-year client engagements with regulated institutions demonstrate customer commitment and platform stickiness. [CLIENT-SPECIFIC — add specific financial metrics, funding round details, or revenue indicators as appropriate per the RFI requirements.]

### Q1.5: Describe your partner ecosystem and system integrator relationships.

SettleMint maintains deep partnerships with global consultancies, regional system integrators, and infrastructure providers across Europe, MENA, and JAPAC. These partnerships serve multiple functions:

- **Implementation delivery**: Partners design, build, and operate solutions on top of DALP for their clients, extending SettleMint's delivery capacity without requiring SettleMint to scale consulting headcount.
- **Local market expertise**: Regional partners provide local regulatory and market knowledge combined with a consistent global platform.
- **Technology ecosystem**: Proven integrations with custody platforms (Fireblocks, DFNS), core banking systems, and compliance providers in live production environments.

Our partner model enables institutions to work with their preferred system integrators while leveraging SettleMint's platform and product expertise. [CLIENT-SPECIFIC — name specific partners relevant to the RFI geography or industry.]

### Q1.6: What industry standards and certifications does your company hold?

SettleMint's platform implements industry-recognized standards for digital asset operations:

- **ERC-3643 (T-REX)**: The regulated token standard for compliant digital securities — natively implemented in DALP, not proprietary.
- **OnchainID**: The identity protocol for on-chain verifiable identity, integrated into DALP's identity and access management layer.
- **ISO 20022**: Integration-ready for SWIFT, SEPA, and RTGS payment rail connectivity.
- **OpenTelemetry**: Standard observability protocol for distributed tracing across the DALP service layer.
- **ERC-4337**: Smart account infrastructure for account abstraction (foundation shipped).
- **ERC-5805 / ERC-7579**: Governance voting power and modular account validation standards.

SettleMint holds ISO 27001 and SOC 2 Type II certifications.

### Q1.7: Describe your intellectual property and technology ownership model.

DALP is developed and owned entirely by SettleMint. The platform codebase has been built over nearly a decade of institutional deployment experience, consolidated into a unified product.

Key IP includes:
- Complete digital asset lifecycle platform covering issuance, compliance, custody integration, settlement, and servicing
- Multi-asset smart contract architecture with 7 asset classes and a configurable token system
- Three-tier compliance interface hierarchy (Global → Token → SMART V2) for incremental ERC-3643 migration
- Durable execution framework for reliable workflow orchestration
- 534 auto-generated contract error codes with structured metadata for operational clarity
- Custom PostgreSQL-based blockchain indexer with zero-downtime reindexing

Source code escrow arrangements are available for institutions requiring business continuity assurance. [TO VERIFY — confirm escrow offering details.]

### Q1.8: What is your company's approach to innovation and product roadmap management?

SettleMint manages its product roadmap with direct input from institutional clients and the regulatory environment. Our approach balances innovation with the stability requirements of regulated production deployments:

- **Feature-flagged rollouts**: New capabilities are introduced behind feature flags (e.g., Directory V3.2 upgrade for global trusted issuers), enabling controlled enablement without disrupting production deployments.
- **Standards-based development**: We build on established standards (ERC-3643, OnchainID, ERC-4337) rather than proprietary approaches, ensuring interoperability and reducing vendor lock-in.
- **Client-informed prioritization**: Roadmap priorities are influenced by production client requirements, regulatory developments, and market needs.
- **Continuous delivery**: Regular platform releases with new capabilities, performance improvements, and security patches — not infrequent major version jumps that force disruptive migrations.

### Q1.9: How does your company handle conflicts of interest or competitive client situations?

SettleMint is a platform company, not a financial services operator. We do not trade, custody, or hold assets on behalf of clients, and we do not operate exchanges or trading venues. This eliminates the structural conflicts of interest present in companies that both provide infrastructure and compete with their clients for transaction flow or custody fees.

Each client's DALP deployment is logically and, where required, physically isolated. Multi-tenant configurations enforce strict tenant boundaries through on-chain system contracts and off-chain organization-scoped access controls. Client data, configuration, and operational state are never shared across tenants.

### Q1.10: Describe your company's commitment to the digital asset and tokenization market.

SettleMint has been exclusively focused on blockchain infrastructure for enterprises and regulated institutions for nearly a decade. Unlike companies that have pivoted into tokenization from adjacent markets (cloud platforms, custody, trading), SettleMint's entire existence has been dedicated to this space.

This commitment is demonstrated through sustained R&D investment resulting in a platform with over 300 CLI commands, 534 structured error codes, 18 compliance module types, 7 asset class templates, and comprehensive observability — not proof-of-concept tooling. Our team combines practitioners who have been working in blockchain and distributed systems since the early enterprise adoption wave, with deep financial domain knowledge from banking, capital markets, and regulatory compliance backgrounds.

---

## 8.2 Platform & Technology

### Q2.1: Provide an overview of your platform's architecture and core components.

DALP (Digital Asset Lifecycle Platform) is SettleMint's institutional infrastructure for designing, launching, and operating tokenized assets. The platform covers the full digital asset lifecycle through five integrated core modules: Issuance, Compliance, Custody integration, Settlement, and Servicing — supported by three platform foundations: Identity & Access Management, Integration & Interoperability, and Observability & Operations.

Core architectural components include:
- **DALP dApp**: Full decentralized application (React/TanStack Router) providing the operational console for asset management, compliance operations, identity administration, and monitoring.
- **DAPI (Durable API Service)**: Backend API layer built on oRPC with a two-endpoint architecture — `/api/rpc` for session-authenticated dApp access and `/api/v2` REST for API-key-based programmatic access.
- **Execution Engine (Restate)**: Durable execution engine powering all stateful operations with workflow completion guarantees, idempotent retry, and cron patterns.
- **Blockchain Layer**: ERC-3643-based smart contracts with DALP-specific extensions including 7 asset class contracts, compliance hierarchy, system contracts, and addon factories.
- **Indexer**: Custom PostgreSQL-based blockchain event indexer with zero-downtime reindexing, 18+ analytics views, and reorg detection.
- **Observability Stack**: Pre-built Grafana dashboards with three-pillar observability (VictoriaMetrics for metrics, Loki for logs, Tempo for distributed traces).

### Q2.2: What asset classes does your platform support?

DALP supports seven pre-built asset classes, each with purpose-built lifecycle logic:

1. **Bonds**: Automated issuance with configurable terms, coupon schedules, maturity logic, and redemption handling.
2. **Equities**: Share tokenization with automated dividend distribution, programmable voting rights, and shareholder registry integration.
3. **Funds**: Automated fund unit issuance and redemption with real-time NAV integration and programmable fee structures.
4. **Stablecoins**: Fully compliant issuance with reserve monitoring, attestation integration, and policy controls.
5. **Deposits**: Programmable deposit tokens with configurable interest, maturity, and withdrawal rules.
6. **Real Estate**: Property title tokenization with fractional ownership structures and automated rental income distribution.
7. **Precious Metals**: Asset-backed tokens with verified custody integration and provenance tracking.

Additionally, the **Configurable Token** enables institutions to deploy custom asset types using a composable architecture with up to 32 pluggable features per token — including AUM fees, conversion, transaction fees, fixed treasury yield, historical balances, maturity redemption, EIP-2612 permits, and voting power — without writing new smart contracts.

### Q2.3: Describe your platform's compliance capabilities.

DALP enforces compliance ex-ante — every transfer is validated against eligibility rules, identity claims, and jurisdictional constraints before execution, not checked after the fact. This prevents non-compliant transfers from creating immutable on-chain evidence of violations.

The compliance system includes:
- **18 compliance module types**: Country restrictions (allow/block lists), investor accreditation, supply limits, holding periods, transfer amount limits, collateral backing verification, and more — configurable per asset.
- **Three-tier compliance interface hierarchy**: Global compliance (system-wide bypass list, global modules) → Token compliance (per-token hooks with dual v1/v2 support) → SMART V2 (ERC-3643-aligned 3-argument hooks), enabling incremental migration without platform-wide cutover.
- **Two-layer policy model**: DALP compliance modules enforce on-platform transfer rules, while custodian policies enforce additional rules outside DALP scope — enabling coordinated enforcement between the platform and existing custodian governance.
- **Jurisdictional compliance templates**: Pre-configured module sets for MiCA (EU), Reg D/S/CF (US), MAS (Singapore), FCA (UK), and JFSA (Japan) frameworks.
- **Identity-based enforcement**: OnchainID provides verifiable, on-chain investor identities with claim-based verification (KYC/KYB credentials, accreditation status, jurisdictional eligibility), reusable across all assets.

### Q2.4: How does your platform handle token issuance and lifecycle management?

DALP treats digital assets as having a continuous lifecycle — not a set of disconnected issuance or trading workflows. The asset lifecycle in DALP covers:

- **Asset design and structuring**: Asset Designer wizard with multi-step validation, configurable compliance rules, and class-specific parameters.
- **Issuance orchestration**: Deterministic creation with durable workflow phases (creating → granting-permissions → issuing-claims → unpausing → completed), enforcing paused-by-default behavior for controlled rollout.
- **Lifecycle state control**: Pause, unpause, freeze/unfreeze individual holders, and lifecycle state transitions.
- **Unit operations**: Minting, burning, transferring, forced-transfer (for recovery), and batch operations — all routed through the async transaction pipeline with 11-state lifecycle tracking.
- **Corporate actions**: Automated coupon payments, yield distribution, dividend processing, maturity handling, and redemption — executed programmatically.
- **Servicing**: Ongoing operational events managed through the platform rather than manual processes.

Each operation passes through DALP's middleware chain: authentication → authorization → organization role sync → system context hydration → wallet verification → transaction queue — ensuring consistent governance across all lifecycle events.

### Q2.5: Describe your platform's settlement capabilities.

DALP provides atomic Delivery-versus-Payment (DvP) and Exchange-versus-Payment (XvP) settlement:

- **Atomic settlement**: Both asset and cash legs complete together or both revert — eliminating counterparty risk and reconciliation gaps.
- **XvP settlement addon**: Full settlement lifecycle management with deterministic closure into auditable end-states (executed, cancelled, or expired-withdrawn).
- **Hashlock and approval mechanics**: Settlement contracts enforce approval, hashlock checks, cancellation vote logic, and expiry-withdrawal processing.
- **Secret reveal for settlement**: Deduplication-safe notification dispatch for settlement secret reveals with per-recipient delivery tracking.
- **Settlement observability**: Detection, notification, and escalation of settlement failures or timeouts through the operations stack.

Settlement operations run through DALP's durable execution engine, ensuring settlement workflows survive process restarts and infrastructure failures.

### Q2.6: What blockchain networks does your platform support?

DALP supports any EVM-compatible blockchain network, including:
- **Public networks**: Ethereum mainnet, Polygon, Avalanche, and other public EVM chains
- **Permissioned/private networks**: Private EVM networks deployed and managed via DALP's infrastructure tooling
- **Multi-network**: Simultaneous operation across public and private networks within a single DALP deployment

Network support includes automated blockchain infrastructure monitoring with health collection, timeline aggregation, summary dashboards, and live SSE snapshot streaming. The monitoring system applies threshold-based classification with 3-sample hysteresis before persisting health snapshots, providing stable operational signals rather than noisy alert storms.

DALP's architecture is chain-agnostic within the EVM ecosystem — not "any blockchain." This focused approach ensures deep capability coverage rather than shallow multi-protocol support.

### Q2.7: Describe your platform's API and SDK offerings.

DALP provides comprehensive programmatic access through multiple interfaces:

- **REST API (v2)**: Full CRUD and mutation access to all platform capabilities. API keys with HTTP-method-based scope enforcement (read-only for GET/HEAD/OPTIONS, read-write for POST/PUT/PATCH/DELETE). Async transaction support via `Prefer: respond-async` header with HTTP 202 responses and status polling.
- **oRPC (RPC endpoint)**: Session-authenticated endpoint for the dApp frontend with type-safe procedure calls.
- **SDK (@settlemint/dalp-sdk)**: Typed TypeScript SDK published to npm with contract-bound REST client, blockchain-aware serializers, and zero-dependency contract error mirror (534 error codes with metadata).
- **CLI**: 301 commands across 26 top-level groups covering system administration, token lifecycle, identity/KYC, compliance, monitoring, settings, and all addon domains. Device-based authentication with macOS Keychain credential storage.
- **GraphQL**: Subgraph-based query access to on-chain state and indexed data.
- **Event webhooks**: Configurable event-driven notifications for downstream system integration.

All programmatic interfaces share a consistent security model: API keys are scoped, replay-protected, and blocked from the RPC endpoint by design.

### Q2.8: How does your platform handle data storage and blockchain indexing?

DALP uses a custom PostgreSQL-based blockchain event indexer (Indexer V2) that processes all on-chain events and projects them into queryable read models:

- **Event coverage**: Tokens, identity, compliance, addons, feeds, and system contracts are all indexed.
- **Analytics views**: 18+ PostgreSQL views across 5 domains provide pre-aggregated reporting data.
- **Zero-downtime reindexing**: Rotating deployment schemas (`idxr_d1`, `idxr_d2`) with pass-through views in `public` schema — schema swaps serve reads from the old schema during reindex.
- **Reorg handling**: Detection and rollback capabilities for blockchain reorganizations.
- **Registration-driven schema**: All indexer tables are created from live Drizzle definitions rather than cloned stale structures, ensuring schema consistency.
- **Pricing views**: Dedicated pricing view module for fiat-value reporting projections (system/portfolio value, token-factory breakdowns).

Off-chain data (user profiles, KYC data, organization configuration, transaction requests) is stored in PostgreSQL with tenant-scoped access controls.

### Q2.9: Describe your platform's transaction processing architecture.

DALP implements a durable 11-state async transaction pipeline for all blockchain mutations:

**States**: RECEIVED → QUEUED → PREPARING → PENDING_APPROVAL → SIGNING → BROADCASTING → CONFIRMING → COMPLETED | FAILED | DEAD_LETTER | CANCELLED

Key characteristics:
- **Idempotency**: Composite unique index on `(from_address, chain_id, idempotency_key)` prevents duplicate submissions.
- **State validation**: Explicit valid-transitions map with `isTerminalState()` checks, covering standard, native-broadcast, and approval-required processing paths.
- **20 sub-statuses**: Detailed error classification (REVERTED, INSUFFICIENT_BALANCE, NONCE_CONFLICT, SIGNING_FAILED, BLOCKED_BY_POLICY, APPROVAL_EXPIRED, etc.) for operational diagnostics.
- **Revert decoding**: Solidity Error(string), Panic(uint256), and custom ABI errors decoded into human-readable messages with sub-status classification.
- **Confirmation watcher**: Shared Restate Virtual Object (one per chain) that batch-polls receipts for all active transactions — max 250 per tick, 1-second intervals — replacing per-transaction RPC loops.
- **Dead-letter rescue**: Operators can requeue dead-lettered transactions for retry.
- **Status API**: Public endpoint at `/api/v2/transactions/{transactionId}/status` for polling.

### Q2.10: What smart contract standards does your platform implement?

DALP implements the following smart contract standards:

- **ERC-3643 (T-REX)**: The regulated token standard for compliant digital securities, natively implemented with DALP-specific extensions.
- **ERC-20**: Standard fungible token interface, extended with compliance hooks.
- **OnchainID**: On-chain identity protocol for verifiable investor identities with claim-based verification.
- **ERC-165**: Interface detection for compliance and feature discovery.
- **ERC-4337**: Smart account infrastructure with CREATE2-stable accounts, ERC-7579 modular validation, and DALP identity integration (DALP_WALLET claim). Foundation shipped; bundler and full dApp UI pending.
- **ERC-5805**: Governance voting power infrastructure for SMART tokens using OpenZeppelin Votes/VotesExtended. Smart contract and read-only UI implemented; mutation routes pending.
- **ERC-2612**: Permit-based approvals available as a pluggable token feature.
- **UUPS (ERC-1822)**: Proxy-based upgradeability for all major platform contracts, enabling managed upgrades without redeployment.

All smart contracts undergo automated codegen verification and CI freshness checks to ensure error catalogs and SDK mirrors remain synchronized with Solidity ABI sources.

### Q2.11: How does your platform support multi-tenancy?

DALP implements multi-tenancy at multiple layers:

- **On-chain**: Each tenant operates through a system contract that defines governance boundaries, roles, and compliance policies. The on-chain Directory contract manages implementation references and role-based access.
- **Off-chain**: Organization-scoped data access using Better Auth organization plugin with explicit membership boundaries, invitation-gated enrollment, and role synchronization.
- **API layer**: Middleware chain hydrates tenant context (system address, permissions, organization membership) for every request, ensuring operations execute within tenant boundaries.
- **Indexing**: Subgraph queries filter by system address/tenant scope. External token registry queries are hard-filtered to the current tenant's registry.
- **Identity**: Invitation lifecycle controls tenant onboarding boundaries. Active-organization persistence is membership-gated — users can only activate organizations they belong to.

Logical isolation is enforced throughout the stack. Physical isolation (dedicated infrastructure per tenant) is available for Sovereign/Strategic tier deployments.

### Q2.12: Describe your platform's support for primary offerings and token sales.

DALP includes a full-featured token sale / primary offering addon with complete DAPI and UI support:

- **Two-phase sales**: Optional presale (whitelist-gated with configurable discounts) → public sale.
- **Multi-currency acceptance**: Multiple ERC-20 payment currencies with configurable price ratios.
- **Purchase controls**: Per-investor minimum/maximum purchase limits, hard cap, optional soft cap with refund mechanics.
- **Vesting**: Optional vesting schedules with configurable strategies.
- **Refund safety**: Per-currency pull-pattern refunds (CEI-safe), ensuring a blacklisted stablecoin cannot block refunds in other currencies. 30-day grace period protects investor refund pool.
- **Terms acknowledgement**: Terms-hash acknowledgement with verification/download affordances.
- **Operational console**: Five-tab manager view (overview, purchases, currencies, whitelist, vesting) with separate investor-facing view.
- **Seven sale states**: SETUP → PAUSED → PRESALE → PUBLIC_SALE → ENDED → SUCCESS/FAILED with deterministic transition guards.

### Q2.13: How does your platform handle corporate actions and asset servicing?

DALP automates corporate actions programmatically across the full asset lifecycle:

- **Coupon/yield payments**: Fixed treasury yield feature with automated claim execution using the shared treasury payout library. Supports both contract-as-treasury (feature-gated payouts) and EOA treasuries (approval-based transfers).
- **Maturity and redemption**: Automated maturity detection with programmatic redemption processing. Action management surfaces maturity events as actionable items with temporal constraints and executor authorization.
- **Dividend distribution**: Automated distribution through airdrop system (push, time-bound, and vesting variants) with Merkle proof verification and configurable claim tracking.
- **Lifecycle state management**: Pause, unpause, freeze/unfreeze per holder, forced transfer, and forced recovery — all with full audit trail and compliance enforcement.

The asset-as-treasury capability enables DALP assets to act as treasury contracts for payout-oriented features, with feature-registration gating as the safety boundary — only registered features can trigger payouts.

### Q2.14: Describe your platform's approach to wallet and key management.

DALP provides institutional key management through Key Guardian with multiple storage backends and custody provider integrations:

- **Local key management**: Encrypted database storage with secrets management (local, Vault, GCP, AWS backends).
- **Fireblocks integration**: Full wallet CRUD, transaction signing, approval workflows, and provider-native broadcast delegation. Dedicated tracing (`dalp.integrations.fireblocks`) for operational visibility.
- **DFNS integration**: Full wallet management, transaction signing, approval polling (up to ~24 hours), and provider-native broadcast with programmatic approval resolution. Dedicated tracing (`dalp.integrations.dfns`).
- **Provider-delegated broadcast**: When custody providers support it, DALP delegates nonce allocation, gas handling, signing, and broadcast to the provider while retaining admission control and workflow state management.
- **Wallet verification**: Multi-factor verification gates (PIN, TOTP, backup codes) for privileged transaction signing. Factor lifecycle: Disabled → Enabled → Locked → Compromised.
- **Identity recovery**: Operator-governed recovery coordination for wallet loss with deterministic phase tracking (preview → wallet creation → identity deployment → registry recovery → credential reset → token migration).

DALP is not a custodian itself — it orchestrates custody policy across existing custodian relationships.

### Q2.15: What are the platform's scalability characteristics?

DALP is designed for institutional-scale operations:

- **Transaction throughput**: Async transaction pipeline processes mutations through a shared confirmation watcher (batch-polling 250 transactions per tick per chain), replacing per-transaction RPC loops. Partition-keyed queue ordering prevents nonce contention across concurrent wallet operations.
- **Horizontal scaling**: Kubernetes-based deployment enables horizontal scaling of API services, indexer workers, and observability components independently.
- **Durable execution**: Restate virtual objects provide exclusive partition locks during transaction submission, with configurable retry presets (fast: 5 attempts/10s, standard: 10 attempts/5min, long-running: 20 attempts/30min).
- **Indexer performance**: Zero-downtime reindexing with schema rotation ensures indexer upgrades don't impact read availability.

Production deployments with regulated banks demonstrate sustained operation under institutional SLAs with 24/7 uptime requirements and high-throughput transaction processing. [CLIENT-SPECIFIC — add specific throughput numbers if available from production benchmarks.]

### Q2.16: How does your platform handle data feeds and market data integration?

DALP provides a unified data feed integration layer:

- **Feed aggregation**: Ingest, aggregate, and serve external data (prices, yields, rates) for asset lifecycle operations including valuation and operational reporting.
- **Exchange rates**: Synchronized from external providers with historical and latest rate tables, manual operator overrides, and cache management.
- **External token registry**: Registration and lifecycle management of external tokens with managed discovery and projection.
- **Feed submission**: EIP-712 signed value submission through Restate for tamper-evident feed updates.
- **Async-capable**: V2 feed mutations support async queue semantics with `Prefer: respond-async` and status polling.

DALP integrates with external price feeds for NAV and valuation but does not operate oracle networks — feed providers are external and operator-configured.

---

## 8.3 Security & Compliance

### Q3.1: Describe your platform's authentication and authorization model.

DALP implements a multi-layered authentication and authorization model:

**Authentication**:
- **Two-endpoint architecture**: `/api/rpc` accepts session/cookie authentication only (dApp frontend); `/api/v2` REST accepts API keys with HTTP-method-based scope enforcement. API keys are explicitly blocked on the RPC endpoint — a hardened security boundary.
- **Device-based CLI authentication**: Browser-based device login with API-key issuance and secure credential persistence (macOS Keychain on Darwin, permission-checked config files elsewhere).
- **Multi-factor wallet verification**: PIN, TOTP, and backup code verification gates for privileged operations. PASSKEY verification is explicitly unsupported in runtime middleware to prevent partial enablement.

**Authorization**:
- **Role-based access control (RBAC)**: 5 defined roles with on-chain enforcement via Access Manager contracts.
- **Organization-scoped access**: Better Auth organization plugin with membership boundaries and invitation-gated enrollment.
- **On-chain/off-chain synchronization**: Organization role sync middleware reconciles on-chain access-control state into organization membership roles on every authenticated request.
- **Permission middleware**: Route-level permission enforcement with system permissions (e.g., `SYSTEM_PERMISSIONS.tokenCreate`, `SYSTEM_PERMISSIONS.identityRecover`) checked before handler execution.

### Q3.2: How does your platform protect sensitive data at rest and in transit?

**Data in transit**:
- All API communications are encrypted via TLS.
- Blockchain node communication uses standard Ethereum JSON-RPC over HTTPS.
- Inter-service communication within the Kubernetes cluster follows standard service mesh security practices.

**Data at rest**:
- Secrets management supports multiple provider backends: local encrypted storage, HashiCorp Vault, GCP Secret Manager, and AWS Secrets Manager. Provider factory pattern ensures consistent security interface across backends.
- CLI credentials use macOS Keychain on Darwin for secure storage.
- Object storage supports 7 provider aliases (AWS S3, GCP Cloud Storage, Azure Blob Storage, S3-compatible, MinIO, RustFS, local filesystem) with dual-bucket model (public + private) and HMAC-signed presigned URLs for filesystem mode.
- Production safety checks reject default development signing keys in production environments, preventing accidental deployment of insecure defaults.

[TO VERIFY — confirm specific encryption standards (AES-256, etc.) and whether database-level encryption at rest is configured by default.]

### Q3.3: How does your platform handle identity management and KYC/KYB?

DALP embeds a unified identity layer across the entire platform using OnchainID:

- **On-chain identity**: Verifiable, on-chain investor identities with claim-based verification. The Identity Registry manages verified profiles with claims for KYC/KYB credentials, accreditation status, and jurisdictional eligibility — reusable across all assets and transactions.
- **Claim lifecycle control**: Issuance, storage, and revocation of digital identity claims with topic-specific integrity contracts. Auto-claim validation enforces that boolean investor topics accept only the literal string `true`, and KYC claims must match the approved content hash for the target identity.
- **KYC profile versioning**: Multi-version KYC profiles with explicit review workflow (draft → under_review → approved/rejected). Review outcomes are state-gated with request-update and fulfillment cycles.
- **Trusted Issuers Registry**: Three-tier resolution (subject-scoped → system-scoped → global) for trusted credential issuers. Platform-level global registry consolidates issuers that apply across all systems.
- **Exception handling**: Deterministic remediation for failed compliance decisions, including reject reasons, requested-change actions, and fulfillment closure.

DALP uses OnchainID and integrated claim-based identity but relies on third-party KYC/KYB providers for initial verification — DALP does not perform KYC checks itself.

### Q3.4: How does your platform ensure regulatory compliance across jurisdictions?

DALP provides compliance-by-design with ex-ante enforcement:

- **18 compliance module types** covering eligibility, restrictions, transfer controls, issuance and supply, time-based rules, and settlement/collateral — each configurable per asset type.
- **Jurisdictional templates**: Pre-configured compliance module sets for MiCA (EU), Reg D/S/CF (US), MAS (Singapore), FCA (UK), and JFSA (Japan) regulatory frameworks.
- **Three-tier compliance hierarchy**: Global compliance (system-wide bypass list, modules), Token compliance (per-token hooks), and SMART V2 (ERC-3643 aligned) — enabling incremental migration of individual tokens to new compliance standards without coordinated platform-wide cutover.
- **Verification artifact handling**: Validation and deterministic encoding of compliance module parameters before on-chain policy deployment, with 12 concrete module type IDs in a discriminated-union schema.
- **Full audit trail**: Queryable action history for asset operations, compliance decisions, and identity events. Every transfer, compliance check, and identity event is recorded with immutable evidence.

DALP provides compliance tooling, not compliance guarantees — regulations vary by jurisdiction and evolve over time. The platform enables institutions to encode and enforce their compliance requirements, but legal interpretation remains the institution's responsibility.

### Q3.5: Describe your platform's audit trail and reporting capabilities.

DALP provides comprehensive auditability:

- **End-to-end audit trail**: Queryable action history across asset operations, compliance decisions, and identity events with the full event context (sender, emitter, involved parties, transaction values).
- **Transaction request history**: Dedicated audit trail table with BRIN-indexed timestamps for efficient historical queries. All state transitions are recorded with expected and actual states.
- **Account activity tracking**: Blockchain event history for any account with time-series aggregation for charting. Supports event-level detail and aggregated counts over configurable time ranges.
- **Statistical reporting**: Aggregated metrics for adoption, compliance posture, settlement activity, and system-value history with bounded range/preset query contracts.
- **Document export**: Operator-facing CSV/JSON export of document listings for audits and downstream reporting.
- **Contract error catalog**: 534 structured error codes with per-entry metadata (severity, audience, retryable flag, message, suggested action) enabling operational forensics on any failed transaction.

All audit data is accessible via the DALP API for integration with institutional reporting and SIEM systems.

### Q3.6: How does your platform handle access control for different user roles?

DALP implements role-based access control (RBAC) with 5 defined roles enforced both on-chain and off-chain:

- **On-chain enforcement**: Access Manager contracts manage role grants and revocations on the blockchain, providing immutable role assignment evidence.
- **Off-chain enforcement**: Route-level permission middleware checks user roles before handler execution. Each API route declares required permissions explicitly.
- **Organization-scoped roles**: Users can belong to multiple organizations with different roles in each. Active-organization persistence is membership-gated.
- **System-level vs token-level permissions**: System permissions govern platform-wide operations (identity management, compliance configuration), while token-level permissions govern asset-specific operations (minting, transferring, pausing).
- **Trusted issuer governance**: Registration and lifecycle management of trusted counterpart credential issuers, enabling delegated claim issuance within governed boundaries.

The role model supports separation of duties — for example, the role authorized to configure compliance policies is distinct from the role authorized to issue tokens.

### Q3.7: How does your platform handle emergency situations and incident response?

DALP provides operational controls for emergency situations:

- **Lifecycle state control**: Pause/unpause capability for individual assets, with emergency role authorization.
- **Forced movement recovery**: Governed emergency movement controls combining token-level forced transfer/recover with identity-recovery handoff flows for wallet loss or compromise.
- **Identity recovery**: Operator-governed recovery coordination with deterministic phase tracking, confirmation-gated execution, local credential/session reset, and optional compromised-wallet blocklist intent capture.
- **Dead-letter transaction rescue**: Operators can requeue failed transactions from dead-letter state for retry.
- **Recovery and escalation contacts**: Contact registry for emergency operations and recovery escalation paths.

Infrastructure-level alerting: Production-ready structured alert delivery to Slack with DALP-branded templates (namespace/pod/container/silence link), opt-in scraping discipline, and configurable alert thresholds. [TO VERIFY — confirm whether automated incident management workflows exist beyond signal detection.]

### Q3.8: Describe your approach to smart contract security and upgrades.

DALP's smart contract security approach includes:

- **UUPS proxy upgradeability**: All major contracts use ERC-1822 UUPS proxies, enabling managed upgrades without redeployment or state loss. Directory-managed upgrades allow all instances to be upgraded simultaneously.
- **Audit scope management**: Audit slices are maintained per contract domain (e.g., `account-abstraction`), enabling targeted security reviews.
- **CI-enforced codegen freshness**: Automated checks ensure contract error catalogs, SDK mirrors, and translation files remain synchronized with Solidity ABI sources — preventing silent drift.
- **Revert decoder**: Solidity Error(string), Panic(uint256), and custom ABI errors decoded into human-readable messages with sub-status classification, enabling operational forensics.
- **Comprehensive test coverage**: 3066+ Foundry contract tests, plus unit test suites for state stores, revert decoders, and schema management.
- **Feature-flagged rollouts**: New contract capabilities (e.g., Directory V3.2, Global Trusted Issuers Registry) are deployed behind feature flags, enabling controlled enablement.

[CLIENT-SPECIFIC — add details of third-party audit engagements if applicable.]

### Q3.9: How does your platform handle data residency requirements?

DALP supports flexible deployment models aligned with data residency requirements:

- **On-premises deployment**: Full platform deployment on client-owned Kubernetes infrastructure (standard distributions or Red Hat OpenShift) within the client's data center or preferred cloud region.
- **Cloud deployment**: Deploy in any major cloud provider region (AWS, GCP, Azure) — institution controls the cloud account and data location.
- **Hybrid deployment**: Split architecture with production on-premises and non-production in cloud, or any combination.
- **Multi-provider object storage**: 7 storage provider aliases enable alignment with institutional data governance policies.
- **Filesystem mode**: Development and testing can run entirely on local filesystem without any external storage dependencies.

Network data remains on the selected blockchain network(s). Off-chain data (user profiles, KYC, configuration) resides in the PostgreSQL database within the client's chosen deployment environment.

### Q3.10: What penetration testing and security assessments has your platform undergone?

SettleMint's deployments have gone through security reviews, penetration testing, and vendor risk assessments typical of large financial institutions. These assessments are conducted as part of institutional onboarding processes.

Specific security measures in the platform include:
- Path traversal protection in object storage (resolved file paths validated against base path with cross-drive guards)
- SQL injection and XSS regression testing via hostile-input validation datasets in automated test suites
- Constant-time comparison for presigned URL verification (timing-safe HMAC validation)
- Production safety guards preventing deployment of development-only credentials
- Input validation via Zod schemas across all API endpoints
- Scope enforcement preventing API key escalation across endpoints

[CLIENT-SPECIFIC — provide specific penetration testing dates, firms, and findings summaries as permitted by NDA.]

---

## 8.4 Integration & Interoperability

### Q4.1: How does your platform integrate with core banking systems?

DALP integrates with core banking systems through its comprehensive API surface:

- **REST API (v2)**: Full programmatic access to all platform capabilities with API-key authentication and HTTP-method-based scope enforcement. Supports both synchronous and asynchronous (HTTP 202) transaction modes.
- **SDK (@settlemint/dalp-sdk)**: Typed TypeScript SDK for embedding DALP operations into existing banking middleware and integration layers. Zero-dependency contract error mirror enables error handling without pulling in DALP internals.
- **Event webhooks**: Configurable event notifications for real-time integration with downstream systems — settlement events, compliance decisions, lifecycle state changes.
- **Idempotency**: All mutations support idempotency keys, enabling safe retry from banking systems without duplicate transaction risk.

Integration patterns are deployment-specific and typically defined during the Discovery & Architecture phase. SettleMint provides documented integration specifications and reference architectures for common banking system configurations.

### Q4.2: What custody providers does your platform support?

DALP supports a bring-your-own-custodian model with current integrations for:

- **Local Key Guardian**: Encrypted key management with multiple secrets backends (local, HashiCorp Vault, GCP Secret Manager, AWS Secrets Manager).
- **Fireblocks**: Full integration including vault creation, address listing, wallet discovery, transaction creation/status/signing, approval flows, and provider-native broadcast delegation. 20+ instrumented call sites with dedicated distributed tracing.
- **DFNS**: Full integration including wallet CRUD, transaction signing, policy management, approval flows with long-lived polling (up to ~24 hours), and provider-native broadcast with programmatic approval resolution.

Provider selection is dynamic at runtime: DALP checks `supportsBroadcast()` and routes transactions either to provider-native execution (nonce/gas/sign/broadcast delegated to provider) or local execution (NonceTracker-backed). This abstraction means institutions can switch or combine custody providers without modifying application logic.

DALP does not act as a custodian — it orchestrates custody policy across existing custodian relationships.

### Q4.3: How does your platform integrate with payment rails and settlement systems?

DALP supports integration with institutional payment infrastructure:

- **ISO 20022 integration-ready**: Designed for connectivity with SWIFT, SEPA, and RTGS payment systems. Integration is deployment-specific and configured during implementation.
- **Atomic DvP/XvP settlement**: On-chain settlement with both asset and cash legs completing atomically. For cash settlement against fiat payment rails, integration with external payment systems is required.
- **Exchange rate management**: Automated synchronization from external providers with historical and latest rate tables, manual operator overrides, and cache management — supporting multi-currency operations.
- **External token registry**: Registration and management of external tokens (e.g., stablecoins used as settlement currency) with governed admission and lightweight on-chain anchoring.

DALP provides the settlement coordination layer — actual fiat payment execution requires integration with the institution's existing payment infrastructure.

### Q4.4: Describe your platform's approach to external system notifications and event-driven architecture.

DALP supports event-driven integration through multiple mechanisms:

- **Notification dispatch**: Platform-owned dispatch contract for transactional notifications (invitations, password resets, settlement operations) with explicit provider-configuration checks and per-recipient send results.
- **SMTP integration**: Configurable email delivery with validated SMTP configuration and public capability signaling (`email.enabled`).
- **Blockchain event indexing**: All on-chain events are indexed and projected into queryable read models, enabling downstream systems to query current state or subscribe to state changes.
- **Observability event publishing**: Process-local event publishers for real-time monitoring data (e.g., blockchain health snapshots via SSE).

Webhook-based feed updates for arbitrary external system integration are not yet supported as a first-class platform capability — event integration currently relies on API polling or the indexed read models.

### Q4.5: How does your platform handle external token and asset registration?

DALP provides governed registration and lifecycle management of external tokens:

- **Registration workflow**: Role-gated durable write path with tenant registry resolution, permission enforcement (`SYSTEM_PERMISSIONS.tokenCreate`), idempotency keys, and Restate-backed execution.
- **Registry contract**: Intentionally minimal — rejects zero-address, empty-type, and duplicate registrations. Stores token type and registration membership, with opportunistic ERC-165 interface probing.
- **Post-registration projection**: Subgraph makes external tokens first-class DALP tokens after registration, including ERC-20 metadata extraction, interface detection, and external registration timestamps.
- **Tenant scoping**: External token queries are hard-filtered to the current tenant's registry, ensuring tenant isolation even when the subgraph holds broader data.

This enables institutions to bring existing tokens (e.g., stablecoins for settlement, tokens from partner institutions) into the DALP ecosystem with governed admission controls.

### Q4.6: What observability integrations does your platform support?

DALP ships a full observability stack designed for institutional operations:

- **Metrics**: VictoriaMetrics with pre-built Grafana dashboards covering operations overview, transaction monitoring, compliance activity, and security events.
- **Logs**: Loki for structured log aggregation and querying.
- **Distributed tracing**: Tempo with OpenTelemetry integration. Three-tracer architecture (DAPI core, Fireblocks, DFNS) enables end-to-end request tracing from API entry through workflow orchestration to external custody provider calls.
- **Alerting**: Structured alert delivery via Grafana Alloy with DALP-branded notification templates. Opt-in Prometheus pod scraping with annotation-based discovery.
- **Sampling**: Configurable sampling rates (production default: 10%) with parent-based propagation for full trace capture on sampled requests.

The observability stack integrates with standard enterprise monitoring infrastructure. SIEM integration is supported through structured audit logging and event export — specific SIEM connectors depend on deployment configuration.

### Q4.7: Describe your platform's approach to multi-provider object storage.

DALP implements a pluggable object storage abstraction with unified put/get/delete/presigned-URL interface:

- **7 provider aliases**: AWS S3, GCP Cloud Storage, Azure Blob Storage, S3-compatible, MinIO, RustFS, and local filesystem.
- **Dual-bucket model**: Separate public (assets) and private (sensitive data) buckets per provider.
- **Security**: Path traversal protection, timing-safe HMAC verification for presigned URLs, production safety checks rejecting development credentials.
- **Development mode**: Filesystem provider with DAPI HTTP proxy for presigned URLs — zero external container dependencies for development and testing.

Provider selection is configuration-driven via `config.yml`, enabling infrastructure changes without code modifications.

### Q4.8: How does your platform support automation and CI/CD integration?

DALP provides comprehensive automation support:

- **CLI (301 commands)**: Full platform operations accessible from command line, suitable for scripting and CI/CD pipeline integration. Typed Zod-backed arguments ensure input validation in automated contexts.
- **SDK**: Programmatic access for custom automation tooling.
- **API keys with scope control**: Read-only and read-write API key scopes for different automation use cases.
- **Async transaction pipeline**: Idempotent operations with status polling enable reliable automation without duplicate execution risk.
- **AI agent guides**: Dedicated documentation for AI agent integration with the CLI, enabling LLM-driven operational automation.

The CLI documentation includes getting started, scripting, AI agent integration, and command reference guides.

### Q4.9: Does your platform support white-labeling or branding customization?

DALP supports tenant-level interface customization:

- **Theme and experience configuration**: Tenant-level branding controls for the dApp interface, including visual customization and public configuration for defaults.
- **Asset class definitions**: Organizations can create custom asset classes beyond the 4 system-seeded classes, enabling branded categorization without code changes.

Deep workflow-level branding controls are not currently available — customization focuses on visual theming and organizational taxonomy rather than workflow UX changes.

### Q4.10: How does your platform handle secrets and credential management?

DALP implements a provider-factory pattern for secrets management with multiple backends:

- **Local encrypted storage**: Development and small-deployment credential management.
- **HashiCorp Vault**: Institutional secrets management for production environments.
- **GCP Secret Manager**: Google Cloud-native secrets backend.
- **AWS Secrets Manager**: AWS-native secrets backend.

The provider factory ensures a consistent security interface regardless of backend selection. Secrets provider selection is configuration-driven, enabling infrastructure changes without code modifications.

CLI credentials use platform-native secure storage (macOS Keychain on Darwin) with graceful fallback to permission-checked configuration files on other platforms.

---

## 8.5 Support & Operations

### Q5.1: Describe your support model and service level agreements.

SettleMint offers three support tiers aligned with institutional requirements:

- **Standard**: Business hours support (8:00–18:00 CET), dedicated support portal, email channel, all platform updates and security patches.
- **Premium**: Extended hours (6:00–22:00 CET) with emergency weekend coverage, dedicated communication channel (Slack/Teams), upgrade assistance, quarterly business reviews.
- **Enterprise**: 24/7 support with dedicated on-call SRE, named SRE resource with deep deployment knowledge, managed upgrades, monthly business reviews, custom runbook development.

SLA response times are [CLIENT-SPECIFIC] and defined per priority level (P1 Critical through P4 General inquiry). All tiers include platform updates, security patches, and smart contract upgrades.

### Q5.2: How do you handle platform updates and version management?

DALP uses a continuous delivery model with managed upgrade processes:

- **Regular releases**: New capabilities, performance improvements, and security patches delivered regularly — not infrequent major version jumps requiring disruptive migrations.
- **UUPS proxy upgrades**: Smart contract upgrades via proxy pattern without redeployment or state loss.
- **Zero-downtime indexer upgrades**: Schema rotation ensures read availability during reindexing operations.
- **Feature flags**: New capabilities introduced behind feature flags for controlled enablement per deployment.
- **API versioning**: v1 and v2 API versions maintained simultaneously. V1 routes remain unaffected when v2 capabilities are added — zero regression risk for existing integrators.
- **Backward compatibility**: Dual getter patterns, legacy interface ID preservation (ERC-165), and SDK serializer backward compatibility ensure smooth transitions.

For Premium and Enterprise support tiers, SettleMint provides upgrade assistance including pre-tested deployment in staging environments.

### Q5.3: Describe your platform's monitoring and operational visibility capabilities.

DALP ships a complete operational tooling stack:

- **Pre-built dashboards**: Grafana dashboards covering operations overview, transaction monitoring, compliance activity, and security events.
- **Three-pillar observability**: Metrics (VictoriaMetrics), logs (Loki), distributed traces (Tempo) — full-stack visibility.
- **Blockchain monitoring**: Admin-only operational health monitoring for chain RPC and graph-node services with snapshot history, timeline aggregation, summary cards, and live SSE streaming. Threshold-based classification with 3-sample hysteresis for stable health signaling.
- **API monitoring**: Aggregated API metrics with rollup computation and retention management.
- **Automated alerting**: Configurable alert thresholds for error rate spikes, latency degradation, and chain connectivity issues. DALP-branded Slack notification templates with actionable context.
- **Transaction observability**: End-to-end transaction tracing across API entry, queue processing, signing, broadcast, and confirmation phases. 20 sub-statuses for detailed failure diagnostics.
- **CLI monitoring access**: Operational health data accessible via CLI commands, including streaming log and snapshot access for terminal-based operations.

### Q5.4: How does your platform handle disaster recovery and business continuity?

DALP's architecture supports disaster recovery through several mechanisms:

- **Durable execution**: All stateful operations run through Restate, which guarantees workflow completion through infrastructure failures and process restarts. Multi-phase workflows (e.g., token creation, identity recovery) persist state at each phase transition.
- **Blockchain as source of truth**: On-chain state is inherently replicated across the blockchain network. DALP's indexer can rebuild its entire read model from on-chain events through reindexing.
- **Zero-downtime reindexing**: Schema rotation ensures read availability during indexer reconstruction.
- **Identity recovery**: Deterministic recovery coordination for wallet loss with phase-tracked execution and local credential/session reset.
- **Kubernetes-native**: Helm-based deployment on Kubernetes provides standard infrastructure resilience (pod auto-restart, node failover, rolling updates).

[CLIENT-SPECIFIC — add specific RPO/RTO targets, backup schedules, and geographic redundancy details based on deployment architecture.]

### Q5.5: How do you handle service outages and incident management?

DALP provides operational controls for detecting and responding to service issues:

- **Health monitoring**: Automated blockchain health collection with threshold-based classification and hysteresis-stabilized state transitions (healthy → degraded → critical).
- **Alert delivery**: Structured alert notifications via Grafana Alloy with DALP-branded templates including namespace, pod, container identification, and silence/acknowledge links.
- **Error classification**: 534 structured contract error codes with audience targeting (user/operator/internal), severity classification, and retryable flags — enabling automated triage.
- **Transaction dead-letter**: Failed transactions move to DEAD_LETTER state with operator-accessible rescue capability for requeue.
- **Operational visibility**: Pre-built dashboards and CLI monitoring access provide immediate visibility into platform health.

Application-level incident lifecycle management (open → acknowledge → resolve) remains a design/roadmap capability. Current operational behavior focuses on failure surfacing, structured error delivery, and operator-visible error UX rather than a first-class incident management workflow.

### Q5.6: What documentation and training resources are available?

DALP provides comprehensive documentation through Fumadocs:

- **Architecture documentation**: ADRs, component architecture, flows, integrations, security/compliance, self-hosting/HA.
- **Developer guides**: API integration, asset creation/servicing, CLI (getting started, command reference, scripting, AI agent guides), compliance, feeds, operations, platform setup, runbooks, user management.
- **User guides**: Asset creation/servicing, compliance, data feeds, platform setup, runbooks, system addons.
- **Executive overview**: Use cases and business context.
- **SDK documentation**: Installation, configuration, plugin imports, error handling, and CLI credential reuse.

Training is typically included in implementation engagements, covering platform operations, compliance configuration, integration development, and ongoing administration. Additional training is available as an add-on service.

### Q5.7: How does your platform handle performance monitoring and capacity planning?

DALP provides operational intelligence for performance management:

- **Statistical reporting**: Aggregated metrics for adoption, compliance posture, settlement activity, and system-value history with bounded range/preset query contracts.
- **API metrics rollup**: Aggregated API performance metrics with configurable retention.
- **Transaction pipeline metrics**: Transaction state distribution, completion rates, error classification, and latency attribution across pipeline phases (submit → sign → broadcast → confirm).
- **Distributed tracing**: Per-phase latency attribution with configurable sampling rates (production default: 10%).
- **Blockchain health timelines**: Historical health data for trend analysis and capacity planning.

For Enterprise support tier clients, monthly business reviews include platform health assessment, performance analysis, and capacity planning recommendations.

### Q5.8: Describe your approach to operational runbooks and standard operating procedures.

DALP includes documented operational runbooks covering:

- **Platform setup and configuration**: Environment provisioning, network configuration, custody provider setup.
- **Asset operations**: Issuance workflows, compliance configuration, lifecycle state management.
- **Identity management**: User onboarding, invitation flows, KYC profile management, identity recovery procedures.
- **System administration**: Organization management, role provisioning, API key management.
- **Monitoring and alerting**: Dashboard interpretation, alert response procedures, escalation paths.
- **Recovery procedures**: Identity recovery, transaction rescue from dead-letter state, nonce synchronization/reset/force-set.

Custom runbook development is available for Enterprise support tier clients, tailored to the specific deployment environment and institutional operating procedures.

---

## 8.6 Implementation & Delivery

### Q6.1: Describe your typical implementation methodology and timeline.

DALP implementations follow a four-phase methodology:

1. **Discovery & Architecture (2–4 weeks)**: Use case definition, integration landscape mapping, compliance requirements analysis, network architecture design, deployment model selection, security review, and project planning.
2. **Platform Deployment & Configuration (4–8 weeks)**: Infrastructure provisioning, DALP deployment via Helm charts, network configuration, custody integration, compliance module configuration, identity/access setup, and observability configuration.
3. **Integration & Testing (4–8 weeks)**: Core banking integration, payment rail connectivity, identity provider integration, webhook configuration, end-to-end testing, performance testing, security testing, UAT, and operator training.
4. **Go-Live & Stabilization (2–4 weeks)**: Production cutover, live monitoring, performance optimization, and handover to BAU support.

**Total timeline: 12–24 weeks**, depending on deployment complexity, integration scope, compliance requirements, and institutional change management processes. Cloud-managed deployments are typically faster than on-premises with HSM integration.

### Q6.2: What are the infrastructure requirements for deploying your platform?

DALP requires the following infrastructure:

- **Kubernetes**: Standard Kubernetes distributions or Red Hat OpenShift. DALP is deployed via Helm charts with documented values and configuration options.
- **PostgreSQL**: Database for off-chain data storage, indexer read models, transaction requests, and user/organization management.
- **Blockchain nodes**: EVM-compatible blockchain node(s) — either public network connections or private/permissioned network deployment.
- **Object storage**: One of 7 supported providers (AWS S3, GCP, Azure, S3-compatible, MinIO, RustFS, or local filesystem).
- **Secrets management**: One of 4 supported providers (local, Vault, GCP, AWS) for secure credential storage.

For cloud-managed deployments, SettleMint can provide Helm chart deployment guidance and infrastructure specification documents. For on-premises deployments, detailed infrastructure requirements are provided during the Discovery & Architecture phase.

### Q6.3: How does your platform handle multi-environment deployments?

DALP supports multi-environment deployment as a standard practice:

- **Environment types**: Development, staging/UAT, and production environments with consistent configuration management.
- **Helm-based deployment**: Each environment is deployed via Helm charts with environment-specific values files, ensuring reproducible deployments.
- **Configuration management**: Platform configuration via `config.yml` with environment variable overrides, enabling consistent base configuration with environment-specific tuning.
- **Feature flags**: New capabilities can be selectively enabled per environment, allowing staging validation before production rollout.
- **Indexer isolation**: Each environment maintains its own indexer deployment schemas, preventing cross-environment data contamination.

Non-production environments are included in all licensing tiers (1 non-production for Foundation, multiple for Enterprise and Sovereign/Strategic).

### Q6.4: What is your approach to data migration from existing systems?

Data migration is scoped during the Discovery & Architecture phase and varies by use case:

- **Identity migration**: Existing investor/participant identities can be bulk-onboarded via DAPI APIs or CLI commands with batch identity registration capabilities.
- **Asset migration**: Existing tokenized assets on compatible EVM networks can be registered via the external token registry with governed admission controls.
- **Configuration migration**: Compliance policies, role assignments, and organizational structures are configured via the platform's API and CLI during deployment.
- **Historical data**: DALP's indexer builds its read model from on-chain events. For pre-existing on-chain assets, the indexer can discover and project existing state through its directory-based bootstrap process.

Custom data migration from legacy (non-blockchain) systems is available as an additional service, scoped and priced per engagement.

### Q6.5: Describe your approach to user acceptance testing (UAT).

UAT is a standard phase of every DALP implementation:

- **End-to-end workflow validation**: Issuance, compliance checks, transfers, settlement, and servicing workflows tested against client-specific requirements.
- **Role-based access validation**: Each defined role tested for correct permission boundaries and access controls.
- **Integration validation**: All external system integrations (core banking, custody, payment rails, identity providers) tested with production-representative data.
- **Compliance scenario testing**: Compliance modules validated against jurisdiction-specific rule sets — testing both allowed and blocked scenarios.
- **Performance validation**: Transaction throughput and latency tested under target volumes.

DALP's automated test infrastructure includes Playwright-based UI validation suites with hostile-input regression testing (SQL injection, XSS payloads, unicode/boundary inputs), E2E API test suites, and load testing frameworks — providing a foundation that accelerates UAT execution.

### Q6.6: How do you handle knowledge transfer and operational handover?

Knowledge transfer is structured across the implementation:

- **Operator training**: Hands-on training covering platform administration, asset lifecycle management, compliance configuration, and monitoring operations.
- **Developer training**: API integration patterns, SDK usage, CLI operations, and automation scripting.
- **Documentation**: Comprehensive Fumadocs-based documentation including architecture, developer guides, user guides, and operational runbooks.
- **Operational runbook**: Deployment-specific procedures for routine operations, incident response, and recovery scenarios.
- **Support transition**: Defined handover from implementation team to BAU support team with escalation paths and contact information.

Post-handover, ongoing support is provided through the client's selected support tier (Standard, Premium, or Enterprise).

### Q6.7: What is your approach to change management during implementation?

SettleMint follows a structured change management approach:

- **Documented scope**: Clear scope definition during Discovery & Architecture, with formal change request processes for scope modifications.
- **Milestone-based delivery**: Implementation progress tracked against defined milestones with regular status reporting.
- **Risk management**: Risk register maintained throughout implementation with mitigation plans for identified risks.
- **Stakeholder communication**: Regular status updates to project sponsors and steering committees.
- **Platform versioning**: DALP releases during implementation are managed through the support agreement — platform updates are tested in non-production before production rollout.

### Q6.8: How do you handle post-implementation support and continuous improvement?

Post-implementation support is provided through the client's selected support tier:

- **Standard**: Business hours support, platform updates, security patches.
- **Premium**: Extended hours, dedicated communication channel, upgrade assistance, quarterly business reviews with platform health and optimization recommendations.
- **Enterprise**: 24/7 support, dedicated SRE, managed upgrades, monthly business reviews, custom runbook development.

Continuous improvement is driven by:
- Platform updates with new capabilities and performance improvements
- Quarterly/monthly business reviews (Premium/Enterprise tiers) identifying optimization opportunities
- Client feedback incorporated into product roadmap prioritization
- Proactive monitoring and alerting surfacing operational improvements

### Q6.9: Describe your approach to security testing during implementation.

Security testing is integrated throughout the implementation:

- **Architecture review**: Security architecture alignment with institutional policies during Discovery & Architecture phase.
- **Configuration hardening**: Platform deployed with production-safe defaults, development credentials rejected, and security controls validated.
- **Penetration testing support**: SettleMint provides platform expertise and access support for client-led or third-party penetration testing engagements.
- **Automated security validation**: DALP's CI pipeline includes hostile-input regression testing, input validation enforcement, and production safety guards.
- **Integration security**: API key scope enforcement, TLS configuration, and secrets management validated for all external system integrations.

Security assessment results and remediation plans are documented and tracked to closure before production go-live.

### Q6.10: What project governance structure do you recommend?

SettleMint recommends the following governance structure for DALP implementations:

- **Steering committee**: Quarterly/monthly oversight with executive sponsors from both SettleMint and the client, covering scope, timeline, risk, and strategic alignment.
- **Project management**: Dedicated project manager from SettleMint coordinating with the client's project team. Regular status reporting against milestones.
- **Technical leads**: Named solution architect from SettleMint working with the client's technical leads for architecture decisions and technical issue resolution.
- **Workstream leads**: Dedicated leads for infrastructure, integration, testing, and training workstreams.
- **Escalation path**: Defined escalation path from workstream leads → project management → steering committee for issue resolution.

The specific governance structure is defined during the Discovery & Architecture phase and tailored to the client's existing project management frameworks.

### Q6.11: How does your platform handle regulatory approvals and compliance sign-off during implementation?

DALP implementation includes compliance validation activities, but regulatory approval is the client's responsibility:

- **Compliance requirements analysis**: Mapping regulatory requirements to DALP compliance modules during Discovery & Architecture.
- **Jurisdictional template configuration**: Pre-configured compliance module sets for supported regulatory frameworks (MiCA, Reg D/S/CF, MAS, FCA, JFSA).
- **Compliance scenario testing**: Validation that configured compliance modules enforce the expected rules — testing both allowed and blocked transfer scenarios.
- **Audit evidence**: DALP provides the operational evidence (audit trails, compliance check records, identity verification evidence) that supports regulatory submissions — but DALP is not a legal filing tool.

SettleMint can provide technical input for regulatory submissions, but legal structuring, prospectus preparation, and regulatory filings remain the institution's responsibility.
