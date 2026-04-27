# Loop 1 Draft — Content Refresh: Sections 3 (Integrations) & 4 (Access Control)
## Date: 2026-03-24 | Exercise: Week 2 Tuesday Morning

---

# Section 3: Integration Architecture — Refreshed Content

## Key Changes from Source Review

1. **Supported Networks alignment**: Official docs list Ethereum, Polygon PoS, Avalanche C-Chain, BNB Smart Chain as L1; Arbitrum One, Optimism, Base, zkSync Era, Polygon zkEVM as L2. XDC, Gnosis, Linea, Scroll, ADI Chain, Immutable zkEVM, Worldchain remain in the broader content but are not on the primary supported-networks page. Reconciled below.
2. **Compliance modules expanded**: Source now documents 9 module types with 7 regulatory templates. Updated KYC/compliance integration subsection accordingly.
3. **Prose improvements**: Rewritten sections to lead with institutional value, reduce table density, and strengthen client-centric framing per lessons learned.

---

## Refreshed Prose: Integration Architecture

### Executive Summary

Tokenization platforms do not operate in isolation. The hardest technical challenge in institutional digital-asset operations is rarely the token itself; it is connecting that token infrastructure to existing core banking systems, custody relationships, payment rails, regulatory reporting pipelines, and operational monitoring stacks. DALP is designed to operate within existing institutional technology environments, not replace them.

The platform exposes every capability through a typed, documented API with automatic OpenAPI specification generation. A published TypeScript SDK and a 301-command CLI provide integration surfaces for every consumption pattern, from interactive exploration to CI/CD pipeline automation. Blockchain event indexing transforms on-chain data into queryable domain models within seconds of event emission. Custody integration supports a bring-your-own-custodian model through DFNS and Fireblocks, with a unified signer abstraction that makes providers interchangeable through configuration alone. Network connectivity spans any EVM-compatible chain, from Ethereum mainnet to private Hyperledger Besu deployments, managed through a Chain Gateway that handles failover, load balancing, and network-specific configuration without application-level changes.

This section covers the full integration surface: how external systems connect to DALP, how DALP connects to external infrastructure, and the architectural patterns that make these integrations reliable, auditable, and operationally manageable.

### 1. DAPI: The Unified API Layer

Every programmatic interaction with DALP flows through DAPI, the Durable API Service. DAPI is not a thin wrapper around smart contracts. It is a full middleware stack that transforms authenticated HTTP requests into tenant-scoped, permission-aware, execution-ready operations with durable state management.

DAPI is built on oRPC, a type-safe RPC framework that generates OpenAPI 3.1 specifications directly from procedure definitions. This means documentation stays synchronized with implementation by construction, not by discipline. Integration engineers explore the API through Swagger UI at `/api`, construct requests, authenticate, and execute procedures directly from the documentation interface. The OpenAPI specification at `/openapi.json` can be imported into Postman, Insomnia, Redoc, or any OpenAPI-compatible tooling, enabling standard enterprise API governance workflows where consumers auto-generate client libraries in any language.

The API serves two distinct endpoints with a hard security boundary between them. The RPC endpoint (`/api/rpc`) accepts only browser session cookies and serves the DALP console UI. The REST endpoint (`/api/v2`) accepts API keys and serves SDK, CLI, and backend integrations. API keys are explicitly blocked on the RPC endpoint, and session cookies are not accepted on the REST endpoint. This separation exists because the RPC protocol uses POST for all procedure calls, making HTTP method unreliable for scope enforcement. The REST endpoint maps HTTP methods correctly, enabling proper read-only versus read-write API key scoping.

The REST API at `/api/v2` organizes capabilities across 15 namespaces: `token` (asset lifecycle), `system` (platform infrastructure), `user` (user management), `account` (wallet operations), `transaction` (status tracking), `actions` (scheduled tasks), `addons` (optional features including XvP settlement, fixed yield, token sale, and vault), `contacts` (address book), `exchangeRates` (multi-currency support), `search` (global search across tokens, contacts, and transactions), `settings` (platform configuration), `externalToken` (external asset registration), `admin` (organization management), `identityRecovery` (recovery workflows), and `monitoring` (operational health and streaming).

#### Type Safety and Error Handling

Every endpoint has a typed schema defined at the contract level using Zod. Unknown fields, missing parameters, and type mismatches are caught before business logic executes, preventing malformed requests from consuming gas or triggering unintended side effects. The error system includes 534 auto-generated error codes from Solidity ABIs, each with 4-byte selectors, severity levels, audience targeting, retryability flags, and translations across four locales (en-US, de-DE, ar-SA, ja-JP). Blockchain revert reasons surface as structured DALP contract errors rather than opaque revert blobs.

Error responses follow a consistent JSON structure with machine-readable codes, HTTP status codes, human-readable descriptions, and optional context data. This enables integration consumers to implement precise error-handling logic rather than parsing unstructured error strings.

#### Transaction Queue and Async Operations

Mutations support three execution modes negotiated through RFC 7240 `Prefer` headers: synchronous (blocks until on-chain confirmation), asynchronous (returns HTTP 202 with a status URL for polling), and hybrid (server decides based on expected execution time). All blockchain mutations flow through an 11-state lifecycle managed by Restate durable workflows, providing idempotent execution (enforced via `Idempotency-Key` headers), durability across process restarts, full state-transition audit history, and dead-letter handling for exhausted retry budgets.

#### Middleware Chain

Every request passes through a layered middleware chain that progressively enriches context: session resolution, authentication enforcement, organization role synchronization, system context hydration, token context resolution, wallet verification for sensitive mutations, and transaction queue negotiation. This is not a flat authentication check. It is a progressive context-enrichment pipeline that converts a generic HTTP request into a fully scoped, permission-aware execution context. Read operations require only a valid session. Write operations require both platform permission and the appropriate on-chain role.

API keys are rate-limited at 10,000 requests per 60-second window per key, with configurable per-key limits for high-volume integration consumers.

### 2. TypeScript SDK

DALP ships a public TypeScript SDK (`@settlemint/dalp-sdk`) published to npm as an ESM-only package for Node.js 20+. The SDK provides full type safety with contract-bound types generated from the live DALP v2 route tree, meaning SDK types are always in sync with the running API.

The SDK carries DALP-specific wire-format serializers for blockchain-heavy value types: arbitrary-precision decimals via the `dnum` library (preventing silent truncation of token amounts with 18 decimal places), native JavaScript `bigint` values, and deterministic timestamp serialization. These serializers ensure that precision-critical financial data survives the serialization round-trip without floating-point artifacts.

Three npm entrypoints serve different consumption patterns: the runtime client for standard usage, type-only imports (zero runtime cost) for TypeScript type checking, and plugins for request/response validation and batched requests. The SDK exposes typed operations across all 15 DALP domains.

While the TypeScript SDK is the first-party supported client, the OpenAPI specification enables SDK generation in Python, Go, C#/.NET, Java, and any other language via `openapi-generator-cli`. Generated clients may require manual adjustments for BigInt/BigDecimal serialization; the TypeScript SDK provides reference implementations.

### 3. CLI

DALP's command-line interface provides 301 command registrations across 26 top-level command groups. This is a documented product surface with getting-started guides, command reference, scripting documentation, and AI agent integration guides.

The CLI authenticates through a browser-based device-code flow that preserves the same security guarantees as interactive login: the user approves the CLI session in their browser, benefiting from whatever MFA and session controls are configured on the platform. Credentials store securely in macOS Keychain on Darwin or a permission-checked configuration file on other platforms.

All commands use Zod-backed argument validation and bind directly to DALP client methods. The CLI is documented as an automation surface, enabling CI/CD pipeline integration for token deployment and configuration, automated compliance module setup, batch user creation and identity registration, scripted token lifecycle operations, and real-time operational monitoring through streaming endpoints.

### 4. Blockchain Event Indexing and Data Pipeline

Blockchain storage optimizes for consensus verification, not application queries. Historical data queries can take seconds or fail entirely for complex aggregations. DALP's Chain Indexer bridges this gap by transforming event logs into domain models that serve application needs with millisecond-latency responses.

The indexer is built on PostgreSQL, Drizzle ORM, and Restate durable virtual objects, with one indexer instance per chain ID. It processes events across 8+ domains (token creation and transfer, identity, compliance, addon, and token extensions) and constructs domain models for asset balances, investor portfolios, transaction history, compliance status, and distribution records.

The indexer handles chain reorganizations through configurable confirmation depth tracking (1 block for private networks, 12+ for Ethereum mainnet), automatic reorg detection with state rollback and reprocessing, idempotent event processing for safe recovery from any failure scenario, and zero-downtime reindexing through schema isolation. Event latency from blockchain emission to view availability is under 5 seconds.

DALP exposes 18 PostgreSQL analytics views across identity, compliance, addons, cross-cutting metrics, and actions domains. These views support both type-safe Drizzle ORM queries and raw SQL access for BI tools (Looker, Tableau, Power BI), enabling standard ETL pipelines without requiring integration through the DALP API.

Real-time operational monitoring flows through Server-Sent Events (SSE) for API metrics, blockchain health (with 3-sample hysteresis to prevent alert flapping), and transaction status changes.

### 5. Blockchain Network Connectivity

DALP operates on any blockchain implementing the Ethereum JSON-RPC specification. Network switching requires only environment-variable changes with no code modifications.

The Chain Gateway manages all outbound blockchain connectivity through load balancing (round robin, latency-based, health-weighted, and operation-aware strategies), health monitoring (block height tracking, response latency measurement, error rate monitoring, and periodic connectivity probes), performance optimization (connection pooling, request batching, response caching for immutable data, and retry routing to alternate nodes), and automatic failover that completes in seconds without application awareness.

Supported networks span four categories. Layer 1 mainnets include Ethereum, Polygon PoS, Avalanche C-Chain, and BNB Smart Chain. Layer 2 rollups include Arbitrum One, Optimism, Base, zkSync Era, and Polygon zkEVM. Private and consortium networks include Hyperledger Besu (with IBFT 2.0/QBFT consensus), Go-Ethereum (private PoA or PoS configurations), Nethermind, and Erigon. SettleMint managed networks provide pre-deployed infrastructure with genesis-allocated DALP contracts.

Multi-chain architecture means identity, compliance, and indexer state are isolated per chain. An investor's OnchainID is chain-specific. Compliance module configurations are per-chain, per-token. Custody providers (Fireblocks and DFNS) support multi-chain asset wallets through the same vault or wallet instance.

### 6. Custody Integration

DALP is not a custodian. It orchestrates custody policy across existing custodian relationships through a provider-abstracted signer service. Institutions connect their existing custody infrastructure; DALP handles the lifecycle orchestration.

The Key Guardian service manages cryptographic key material across four storage tiers: encrypted database for development and low-value assets, cloud secret manager for standard production deployments, hardware security modules (FIPS 140-2 Level 3) for regulated financial services, and third-party MPC custody (DFNS or Fireblocks) for the highest security requirements.

DFNS provides delegated MPC custody with fully programmatic approval resolution through its API. When a DFNS policy requires approval, DALP surfaces the pending approval through its own interface, enabling operators to review, approve, or reject without leaving the DALP environment. DFNS audit logs synchronize with DALP audit records for unified compliance reporting.

Fireblocks provides MPC-CMP custody with continuous key refresh through vault accounts. Fireblocks enforces Transaction Authorization Policy (TAP) rules, but unlike DFNS, blocked transactions must be approved through the Fireblocks Console or a Co-Signer appliance. DALP surfaces pending approvals but cannot resolve them programmatically.

The unified signer interface abstracts over all custody backends. Switching between DFNS and Fireblocks requires only configuration changes: no workflow modifications, no code changes, no API contract differences for consumers. The signer supports wallet CRUD, transaction preparation and signing, EIP-191 and EIP-712 message signing, health monitoring, and optional provider-native broadcast.

The Transaction Processor manages nonce coordination, gas estimation, and transaction lifecycle through Restate durable workflows. Nonce allocation is serialized per address per chain with self-healing for `nonce too low` failures and operator repair surfaces for manual intervention. ERC-4337 account abstraction support enables user operations through bundler infrastructure, paymaster integration for sponsored gas fees, and batched execution for gas efficiency.

### 7. KYC/AML Integration

DALP provides the identity infrastructure that KYC/AML verification results flow into, not the verification itself. Institutions choose their own KYC/AML providers (Onfido, Jumio, Sumsub, or similar) and DALP provides the on-chain identity layer that makes verification results enforceable at the protocol level.

The integration flow starts with external verification, translates results into DALP claim topics, records them as signed claims on the investor's OnchainID contract (ERC-734/735), validates claims through the Trusted Issuers Registry, and enforces them through compliance modules at every transfer. Claims have expiry dates and the system fails closed: expired or revoked claims block transfers rather than silently passing.

DALP maintains a full KYC profile lifecycle with states progressing from draft through under_review, approved, rejected, and update_required. When issuing a KYC claim, DALP validates that the target identity exists, an approved KYC profile exists with a content hash, and the submitted claim value exactly matches the approved content hash, preventing claims from being issued against stale or unapproved verification data.

### 8. Payment Rails, Settlement, and Exchange Rates

DALP supports integration with institutional payment infrastructure through ISO 20022 message standards for connectivity with SWIFT, SEPA, and RTGS payment networks.

The XvP (Exchange versus Payment) settlement system provides both local settlement (same-chain atomic execution where both legs complete or revert together) and cross-chain settlement (Hash Time-Locked Contract pattern with hashlock verification and cancellation vote logic). Multi-party settlements support more than two counterparties in a single transaction. All settlement states are terminal and deterministic: executed, cancelled, or expired-withdrawn.

Exchange rate management includes automated synchronization from external providers, historical rate storage, manual operator overrides for institutional pricing, and multi-currency asset valuation through cross-referenced rates. Token sale refunds use a per-currency pull pattern where blacklisted stablecoins cannot weaponize a single refund to lock all other investors.

### 9. Oracle and Data Feed Integration

DALP provides a unified data feed integration layer through the FeedsDirectory, a central on-chain registry that separates feed discovery from feed delivery. Consumers never hard-code feed addresses. Supported feed types include issuer-signed scalar feeds (factory-deployed with configurable history modes, drift allowance, and signature verification) and Chainlink Aggregator adapters that present DALP feeds through the standard `AggregatorV3Interface` consumed by DeFi protocols and external analytics tools.

Feed registration is a privileged operation gated by the Feeds Manager role at the system level or the Governance role at the token level. Schema hash pinning ensures consumers always know the expected data format. Feed mutations support async queue semantics with HTTP 202 and status URL polling.

### 10. Enterprise Observability

DALP ships a full observability stack for enterprise monitoring integration: Grafana with 21 pre-built dashboards, VictoriaMetrics for time-series metrics, Loki for structured logs with secret filtering, Tempo for distributed tracing with OpenTelemetry, and Alloy for Kubernetes node/pod discovery. DALP-specific telemetry includes transaction-phase traces, indexer metrics, and privacy controls that redact sensitive data before persistence. OTLP receivers on standard ports (4317 gRPC, 4318 HTTP) enable external trace and metric ingestion. OpenShift Route support and SSO/IAM integration cover enterprise Kubernetes platforms.

### 11. Integration Security Model

DALP enforces security at every integration layer through a defense-in-depth model. Identity authentication, role-based and resource-level authorization, wallet verification for blockchain writes, on-chain identity claims and compliance modules, and custody provider policy evaluation all operate independently. A compromised session token is blocked by wallet verification. A bypassed API authorization check is blocked by on-chain compliance. Every transaction passes through two independent policy layers: on-chain compliance modules (regulatory enforcement, immutable and auditable) and custodian policies (operational controls, approval workflows).

---

# Section 4: Access Control & Permissions — Refreshed Content

## Key Changes from Source Review

1. **Compliance modules count**: Updated from "12 types" to accurate count of 9 module types across 6 categories, with 7 regulatory templates.
2. **Prose improvements**: Strengthened client-centric framing, reduced reference-manual tone, improved narrative arc per section.
3. **Practical institutional reading**: Tightened the closing section for faster evaluator scanning.

---

## Refreshed Prose: Selected Subsections

### Executive Summary (refreshed)

Institutional digital-asset operations demand governance infrastructure that most organizations underestimate until the first audit. The question is not whether a platform can mint a token; it is whether that platform can prove who authorized the mint, which tenant context they were operating in, what verification they presented, and whether the custody provider approved the signing request. DALP's access-control model answers these questions by design, not by afterthought.

The platform combines organization-scoped tenancy, chain-authoritative role assignment, step-up verification for sensitive actions, durable audit trails, and custody-layer policy enforcement into a single operating model. Authorization is not a flat role table. It is a runtime context-composition pipeline:

**authenticated request → organization scope → system context → token context → verification gates → durable execution → custody approval → blockchain settlement**

That pipeline matters because regulated digital-asset operations contain many actions that should not be performed by the wrong person, in the wrong tenant, with the wrong wallet, or without the right approval evidence. DALP makes each of those constraints enforceable and provable.

### Dual-Layer Authorization (refreshed)

Every blockchain write operation in DALP requires authorization from two independent layers. Off-chain platform roles, managed through Better Auth, control API and console access, organization administration, and membership governance. On-chain roles, defined in Solidity contracts on the AccessManager, govern blockchain operations, identity management, token lifecycle actions, and module-level authority.

The on-chain AccessManager contract is the authoritative source for all role assignments. This is not a convenience pattern; it is a core architectural invariant. Roles granted or revoked on-chain are immediately reflected in the UI through event indexing. There is no separate off-chain permission database that can drift out of sync. If a role is revoked on-chain, the corresponding UI elements disappear without manual synchronization.

Route-level access guards enforce permissions in middleware before any business logic executes. Every API route declares its required permissions as part of the route definition. When a request arrives, middleware resolves the caller's identity, validates organization membership, queries on-chain role assignments, and compares them against the route's declared permissions. Adding a new route requires declaring its permission surface; the middleware handles enforcement uniformly.

The guards also enforce interface-aware constraints. If a route requires a token interface that the asset does not implement, DALP rejects the request even if the caller holds a privileged role. This prevents operators from invoking bond-specific actions on a fund token or stablecoin-specific operations on an equity token, an important safeguard in multi-asset platforms.

### 26-Role Taxonomy (refreshed)

DALP defines 26 distinct roles across four layers. This is not a generic admin/editor/viewer scheme; it is a formal role taxonomy that separates operational duties at the function level.

**Platform roles** (3 roles: owner, admin, member) are organization-scoped and manage off-chain surfaces: user management, invitation handling, platform configuration. These roles are necessary but not sufficient for blockchain operations.

**System people roles** (9 roles) are assigned to human operators and govern system-level blockchain operations. The systemManager bootstraps and upgrades the system. The identityManager handles user onboarding to the blockchain layer. The tokenManager deploys and configures tokens. The complianceManager registers compliance modules and manages global compliance settings. The claimPolicyManager governs trusted issuers and claim topics. Additional specialized roles cover organization identity management, claims issuance, read-only audit access, and feeds directory management.

**Per-asset roles** (7 roles) are scoped per token contract. The admin role grants and revokes other per-asset roles. Governance configures compliance modules, identity registries, and token metadata. Supply management controls minting, burning, and supply caps. The custodian role handles freezes, forced transfers, and wallet recovery. Emergency controls pause and unpause operations. Sale administration and funds management cover token sale lifecycle. Critically, these roles partition duties at the asset level: the person who can mint cannot automatically force-transfer, and the person who can pause cannot automatically withdraw sale funds.

**System module roles** (7 roles) are assigned to contract addresses rather than people, formalizing contract-to-contract authority for system modules, identity registries, token factories, addon factories, and trusted issuer registries.

### Multi-Tenancy (refreshed)

DALP's tenant boundary is the organization, implemented through Better Auth's organization system. Each organization isolates users and memberships, invitations, system context, platform settings, asset classes, external-token registries, and audit trails.

Isolation is enforced at the database query level on every request. The `organizationId` scoping pattern is embedded in query construction throughout the data access layer, meaning that even internal service-to-service calls respect tenant boundaries. Organization-bound API keys inherit permissions and scope from the creating user. Active-organization switching is membership-gated: the platform verifies actual membership before writing the active organization to session state, preventing client-side context spoofing.

The invitation model preserves tenant boundaries through a complete lifecycle: send, accept/reject, with re-invitation behavior that automatically cancels previous pending invitations. Configurable membership limits per organization support licensing models where tenant capacity is contractually capped. When a user accepts an invitation, DALP executes a deterministic sequence that transitions the invitation state, sets the active organization, and registers the user's on-chain identity in the organization's registry.

### Wallet Verification (refreshed)

DALP separates identity authentication from wallet verification. Session authentication proves who the user is. Wallet verification proves intent and control for blockchain write operations. A compromised session cookie alone cannot trigger minting, transfers, burns, or other state-changing operations; the attacker must also possess the wallet verification credential, which never travels in the session token and rotates independently.

Three verification methods are active: PINCODE (6-digit PIN for routine transaction confirmation), TOTP (time-based one-time passwords per RFC 6238 for stronger verification), and backup/secret codes (one-time recovery codes generated during setup). All three include replay protection: TOTP codes are tracked and rejected within the same validity window, and secret codes are consumed on use. Passkey-based wallet verification is architecturally supported through WebAuthn but is not yet the primary active step-up mechanism at runtime.

API key sessions bypass interactive verification by design. API keys are scoped, rate-limited credentials for machine-to-machine flows where an interactive second factor would make automation impractical.

### Compliance Module Integration (refreshed — new subsection reflecting 9 modules and 7 templates)

DALP's compliance engine orchestrates transfer validation through 9 modular rule contract types organized across 6 categories: geographic restrictions (CountryAllowList and CountryBlockList), identity-based access (IdentityAllowList, IdentityBlockList, and AddressBlockList), claim verification (SMARTIdentityVerification with RPN logical expressions supporting AND/OR combinations), supply and investor limits (TokenSupplyLimit and InvestorCount with cross-token counting), transfer approval (pre-authorization workflows with configurable expiry), supply cap and collateral enforcement (CappedComplianceModule and CollateralComplianceModule with ERC-735 collateral proof), and holding period enforcement (TimeLock with FIFO timestamp tracking).

Each module is a global singleton: a single deployed instance serves all tokens, and each token configures its own parameters encoded as ABI-encoded bytes. A single module veto blocks the entire transfer in a fail-fast design.

DALP ships 7 system-seeded regulatory templates as compliance starting points: MiCA EU Standard (8M EUR cap, 365-day rolling window), Regulation D 506(b) (max 2,000 investors, US only), Regulation D 506(c) (accredited investors, 24-hour approval expiry), MAS Singapore Capital Markets (max 50 investors, 180-day holding period), UK FCA Securities (max 150 investors, UK only), Japan FSA Crypto Assets (7-day approval expiry), and Regulation CF Crowdfunding ($5M cap, 365-day rolling window). Templates are system-wide, read-only, and serve as the starting point that operators customize for their specific needs. Organizations can also create custom templates for non-standard jurisdictions or novel instrument structures.

### Audit Trails (refreshed — tighter prose)

DALP's audit infrastructure is not a bolted-on logging concern; it is a structural property of the platform's event-storming design methodology. The verification lifecycle follows a state machine (Disabled → Enabled → Locked → Compromised) with every state transition recorded including timestamp, actor, previous and new state, reason, and correlation ID.

All mutations pass through role-gated middleware that generates audit events for every authorization decision: granted access, denied access, and escalation events where wallet verification was required. Because every write operation flows through this middleware with no backdoor routes, the audit trail provides complete coverage for post-incident forensics.

On-chain events provide governance evidence for token operations, identity registration and claims, role grants and revocations, settlement execution, and feed management. DFNS audit logs synchronize with DALP records. The Chain Indexer transforms these events into queryable domain models accessible through PostgreSQL analytics views, monitoring routes, and CLI commands, making audit evidence exportable into institutional SIEM, compliance, and reporting systems.

---

## Content Update Recommendations

### Section 3 (Integrations)
- The existing content is comprehensive but could benefit from tighter opening paragraphs in subsections 1-3 that lead with institutional value before technical detail.
- The supported networks list should align with the official docs page (4 L1, 5 L2, private networks) while noting additional networks are supported through EVM compatibility.
- The meta-transactions section (Section 12 in current content) should be more prominent given its UX implications for institutional onboarding.

### Section 4 (Access Control)
- Add the 7 regulatory compliance templates as a new subsection or integrate into the compliance discussion.
- Update compliance module count from any references to "12" to the accurate "9 module types across 6 categories."
- The passkey wallet verification status should be clearly stated as architecturally supported but not yet the active runtime factor.
