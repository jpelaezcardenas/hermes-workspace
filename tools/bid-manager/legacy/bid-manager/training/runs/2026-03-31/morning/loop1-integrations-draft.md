# Integration Architecture

## Executive Summary

Institutional tokenization fails most often at the seams: where digital asset infrastructure meets existing core systems, custody relationships, payment rails, and operational workflows. DALP is designed to operate within existing institutional environments rather than replace them. The platform provides a typed, versioned API surface, native SDKs, event indexing with sub-second latency, CLI tooling with 301 commands, and server-sent event streaming that enable programmatic access to every platform capability. Payment rail connectivity supports ISO 20022 standards. Bring-your-own-custodian integrations and bring-your-own-chain flexibility across any EVM-compatible network mean institutions adopt DALP without disrupting established vendor relationships.

This section covers the full integration surface: how external systems connect to DALP, how DALP connects to external infrastructure, and the architectural patterns that make these integrations reliable and auditable.

---

## DAPI: The Durable API Service

### What DAPI Is

DAPI (Durable API Service) is DALP's unified API layer, the single programmatic surface through which all platform operations are accessed. It is not a thin wrapper around smart contracts. It is a full middleware stack that transforms authenticated HTTP requests into tenant-scoped, permission-aware, execution-ready operations.

DAPI is built on oRPC, a type-safe RPC framework that provides automatic OpenAPI documentation, schema validation, custom serializers for blockchain-specific types (BigInt, BigDecimal, Timestamp), and streaming support for long-running operations. The API follows RESTful conventions with POST for mutations, GET for queries, and standardized error codes.

DAPI serves two distinct endpoints with different authentication models:

| Endpoint | Authentication | Consumer | Scope Enforcement |
| --- | --- | --- | --- |
| `/api/rpc` | Session/cookie only | DALP dApp frontend (browser) | Session-bound |
| `/api/v2` | API keys (HTTP-method-scoped) | SDK, CLI, backend integrations, CI pipelines | GET/HEAD/OPTIONS for read-only keys; all methods for read-write keys |

This is a hardened security boundary. API keys are explicitly blocked on the RPC endpoint. If a programmatic consumer attempts to authenticate with an API key on `/api/rpc`, DAPI returns a `FORBIDDEN` error instructing them to use the REST endpoint instead. The separation exists because oRPC uses POST for all procedure calls, making HTTP method unreliable for scope enforcement on the RPC endpoint. The REST endpoint maps HTTP methods correctly (GET for queries, POST for mutations), enabling proper read-only vs. read-write scope enforcement.

### REST API Namespaces and Endpoint Coverage

DAPI exposes a comprehensive REST API at `/api/v2` covering every DALP domain, organized by procedure namespace:

| Namespace | Capabilities |
| --- | --- |
| `token` | Asset lifecycle operations: create, mint, burn, transfer, freeze, pause |
| `system` | Platform infrastructure: role grants, identity registration, trusted issuer management |
| `user` | User management: profile, stats, growth analytics |
| `account` | Wallet operations: identity lookups, claims |
| `transaction` | Transaction status tracking |
| `actions` | Scheduled tasks and operations |
| `addons` | Optional features: token sale, fixed yield, XvP settlement, custody vaults |
| `contacts` | Address book management |
| `exchangeRates` | Multi-currency support and conversion |
| `search` | Global search across tokens, contacts, and transactions |
| `settings` | Platform configuration and asset class definitions |
| `externalToken` | External asset registration and tracking |
| `admin` | Organization CRUD and user administration |
| `identityRecovery` | Identity recovery workflows with preview, execute, and status tracking |
| `monitoring` | Operational health: API health, blockchain health, logs, snapshots, streaming |
| `auth` | Authentication endpoints: sign-in, session management, passkey creation |

### OpenAPI Specification and Interactive Documentation

The API delivers OpenAPI 3.1 specifications generated directly from procedure definitions, ensuring documentation stays synchronized with implementation. Interactive exploration is available through Swagger UI, enabling integration engineers to authenticate, construct requests, and execute procedures directly from the documentation interface.

The specification is available at `/openapi.json` and can be imported directly into Postman, Insomnia, Redoc, or any OpenAPI-compatible tooling. This enables standard enterprise API governance workflows where API consumers can auto-generate client libraries in any language.

### Type Safety and Error Handling

DAPI's API surface is defined as a typed oRPC contract. Every endpoint has a typed schema where request parameters, response shapes, and error types are defined at the contract level. Unknown fields, missing parameters, and type mismatches are caught at the schema layer before business logic executes.

The error catalog includes 534 auto-generated error codes from Solidity ABIs, each with 4-byte selectors, severity levels, audience targeting, retryability flags, and translations across four locales. Blockchain revert reasons surface as structured DALP contract errors rather than opaque revert data. Error responses follow a consistent JSON structure with machine-readable codes, HTTP status codes, human-readable descriptions, and optional context data.

### Transaction Queue and Async Operations

DAPI v2 mutations support three execution modes, negotiated through RFC 7240 `Prefer` headers:

| Mode | Header | Behavior |
| --- | --- | --- |
| Synchronous | `Prefer: respond-sync` | Blocks until transaction confirms on-chain |
| Asynchronous | `Prefer: respond-async` | Returns HTTP 202 with status URL for polling |
| Hybrid | Default | Server decides based on expected execution time |

All v2 blockchain mutations flow through an async transaction request pipeline managed by durable workflows with an 11-state lifecycle: created, queued, submitted, broadcasting, pending, confirming, confirmed (success), failed, cancelled, expired, or replaced. Every mutation is idempotent (enforced via `Idempotency-Key` headers), durable (survives process restarts), and auditable (full state-transition history with time-indexed audit access). Transaction status can be polled via the status URL returned in async responses.

Multi-transaction operations return all transaction hashes in a comma-separated response header, ordered by execution sequence. If a timeout occurs, it applies to the last hash; all preceding transactions completed successfully.

### Chunked Batch Operations

For large-scale operations such as batch transfers to thousands of recipients, DALP supports a chunked batch orchestration model. When a transfer request exceeds the batch limit, the platform automatically splits the operation into child transaction requests, each processed through the standard transaction execution workflow. A parent-child orchestration workflow tracks progress across all chunks, updating the parent state as children complete or fail. If any chunk fails, remaining children are cancelled, and the parent transaction reflects the failure with references to the specific failed chunk. This architecture ensures that batch operations of any size are durable, resumable, and auditable at the individual chunk level.

### Retry Strategy and Error Recovery

DAPI provides structured guidance for integration resilience. Validation errors (400), authentication failures (401), authorization denials (403), and resource-not-found responses (404) should not be retried. Rate-limited responses (429) should be retried after delay. Server errors (500) should be retried with exponential backoff. Confirmation timeouts (504) require checking transaction status before retrying, because blockchain transactions are not automatically idempotent at the network level.

### Middleware Chain

Every DAPI request passes through a layered middleware chain that progressively enriches request context: session resolution, authentication enforcement, organization role synchronization, system context hydration, token context resolution (for token operations), wallet verification (for sensitive mutations), and transaction queue negotiation. This is not a flat authentication check. It is a progressive context-enrichment pipeline that converts a generic HTTP request into a fully scoped, permission-aware execution context. Read operations require only a valid session. Write operations require both platform permission and the appropriate on-chain role.

### Rate Limiting

API keys are rate-limited at 10,000 requests per 60-second window per key. Rate limit configuration is stored per-key, enabling differentiated limits for high-volume integration consumers. When rate limits are exceeded, the API returns HTTP 429 with standard retry-after headers.

---

## TypeScript SDK

### @settlemint/dalp-sdk

DALP ships a public TypeScript SDK published to npm as `@settlemint/dalp-sdk`. The SDK is the recommended integration surface for TypeScript/JavaScript consumers and provides full type safety with contract-bound types generated from the live DALP v2 route tree.

The SDK uses ESM-only module format, targets Node.js 20+, and communicates over the OpenAPI REST client surface (`/api/v2`). Type safety is contract-bound: types are generated from the DALP API contract, ensuring SDK types are always in sync with the running API. API key authentication is required, with SDK-managed headers that prevent callers from overriding security-critical values.

The SDK includes DALP-specific serializers for blockchain-heavy value types: arbitrary-precision decimals for token amounts, native BigInt support for values exceeding JavaScript safe integer limits, and deterministic timestamp serialization. These serializers ensure that precision-critical values survive wire transport without silent truncation or floating-point artifacts.

Three npm entrypoints serve different consumption patterns: the runtime client for standard usage, type-only imports for zero-runtime-cost TypeScript checking, and a plugins entrypoint for request/response validation and batch request linking.

### Multi-Language SDK Generation

While the TypeScript SDK is the first-party supported client, DALP's OpenAPI specification enables SDK generation in any language via standard tooling. Python, Go, C#/.NET, and Java clients can be generated from the `/openapi.json` specification. Generated clients may require manual adjustments for BigInt/BigDecimal serialization; the TypeScript SDK includes reference implementations.

### Credential Reuse with CLI

The SDK integrates with DALP CLI credentials. Developers authenticate via the CLI's browser-based device-code flow, which stores API keys securely (macOS Keychain on Darwin, configuration file with appropriate permissions on other platforms). These credentials can then be reused in SDK-based applications.

---

## CLI

### Overview and Scale

DALP ships a full-featured command-line interface with 301 command registrations across 26 top-level command groups. This is not a debugging tool. It is a documented product surface with getting-started guides, command reference, scripting documentation, and integration guides.

Command coverage spans core operations (token, system, user with approximately 160 commands), identity and compliance (approximately 30 commands), addons including XvP, fixed yield, and token sale (approximately 40 commands), platform administration (approximately 40 commands), and infrastructure operations (approximately 10 commands).

All commands enforce typed argument validation through Zod schemas, catching invalid inputs at the CLI layer before any API call executes. The CLI binds directly to DALP client methods and injects authentication middleware into all non-bootstrap commands.

### Authentication

The CLI uses a browser-based device-code flow that brings the same security guarantees of interactive login to command-line environments. After browser approval, the session is upgraded into a long-lived API key stored securely based on the operating system. This creates a practical auth path for administrators without encouraging password sharing or manually managed static tokens.

### Monitoring and Streaming

The CLI exposes operational visibility through monitoring command trees, including timeline queries, detail and log lookups, and streaming accessors. This enables operators to build monitoring pipelines, feed dashboards, and integrate with enterprise SIEM systems without a browser.

### Scripting and Automation

The CLI is documented as an automation surface for batch operations. Combined with 301-command coverage, this enables CI/CD pipeline integration, automated compliance module setup, batch user creation, scripted token lifecycle operations, and automated KYC claim management.

---

## Blockchain Event Indexing and Data Pipeline

### Chain Indexer Architecture

DALP's native chain indexer bridges the gap between blockchain data structures and application requirements. Blockchain storage optimizes for consensus verification, not application queries. The indexer transforms event logs into domain models that serve application needs with millisecond-latency responses.

The indexer is built on a relational database with an ORM layer and durable virtual objects, processing events across 8+ domains: token creation and transfer, identity, compliance, addons (feeds, token sale, XvP, fixed yield, vault), and token extensions (bonds, funds, capped, pausable). A unified event log records all processed events, and genesis directory discovery bootstraps the system by querying the on-chain DALP Directory for registered factories.

As of the current release, the native chain indexer is the sole indexing path. All DAPI routes that previously relied on external graph-based indexing have been migrated to the native indexer, including XvP settlement routes, fixed-yield schedule routes, token sale routes, system routes, search, account, and external-token endpoints. This migration eliminates an external runtime dependency and consolidates all data access through a single, internally controlled indexing pipeline.

### Consistency and Reorg Handling

Chain reorganizations can reverse confirmed transactions. The indexer maintains rollback capability for configurable block depths: events from recent blocks are marked as provisional, and detected reorganizations trigger state rollback to the fork point with reprocessing of the canonical chain. Event processing is idempotent, enabling safe recovery from any failure scenario. Zero-downtime reindexing uses schema isolation, allowing new indexer versions to build fresh data alongside the running version and switch atomically.

Event freshness targets sub-5-second latency from blockchain event to view availability. Virtual views execute in real time; materialized views support configurable refresh modes (on-write, scheduled, on-demand).

### Timestamp-Enriched Indexing

In addition to block-height references, the indexer now records timestamp columns alongside all block-reference columns. This enables time-based queries and audit trail reporting without requiring block-to-timestamp lookups, which simplifies integration with BI tools and compliance reporting systems that operate on calendar time rather than block height.

### Analytics Views

DALP exposes 18 analytics views across 5 domains (identity, compliance, addons, cross-cutting metrics, and actions) for direct querying by BI tools. Views support both type-safe ORM queries and raw SQL access for enterprise analytics platforms. This enables standard ETL pipelines without requiring integration through the DALP API.

### SSE (Server-Sent Events) Streaming

DALP emits real-time events through Server-Sent Events for operational monitoring: API metrics (request rates, latency, error rates), blockchain health (with hysteresis-based state transitions to prevent alert flapping), and transaction status lifecycle changes for real-time tracking.

---

## Blockchain Network Connectivity

### Chain Gateway Architecture

The Chain Gateway manages all outbound blockchain connectivity, load-balancing across multiple RPC endpoints with automatic failover. Production blockchain deployments require resilient multi-node architectures to handle node maintenance, network partitions, and capacity limits.

Load balancing strategies include round robin for homogeneous pools, latency-based routing for geographic distribution, health-weighted routing for mixed-reliability pools, and operation-aware routing that directs writes to primary nodes and reads to replicas. Health monitoring tracks block height, response latency, error rates, and connection status. Failover completes in seconds without application awareness.

Performance optimization includes connection pooling, request batching for multiple reads targeting the same node, response caching for immutable data with reorganization-triggered invalidation, and retry optimization that routes failed requests to alternate nodes.

### Supported Network Categories

DALP operates on any blockchain that implements the Ethereum JSON-RPC specification. No application changes are required when switching networks. Configuration handles consensus differences, gas models, and confirmation requirements.

**Layer 1 Mainnets:** Ethereum, Polygon PoS, Avalanche C-Chain, BNB Smart Chain, XDC Network, and Gnosis Chain. Each has distinct gas models and block times, all handled through configuration.

**Layer 2 Rollups:** Arbitrum One, Optimism, Base, zkSync Era, Polygon zkEVM, Linea, and Scroll. These include both optimistic rollups (with 7-day challenge periods for withdrawals) and ZK rollups (with validity proofs).

**Specialized and Appchains:** ADI Chain (UAE-based ZK Stack for institutional finance), Immutable zkEVM, and Worldchain.

**Private and Consortium Networks:** Hyperledger Besu (with IBFT 2.0/QBFT consensus and permissioning), Go-Ethereum, Nethermind, Erigon (archive-optimized), and SettleMint managed private networks.

### Multi-Chain Architecture

DALP supports simultaneous operation across multiple chains. Identity registries, compliance module configurations, and indexer instances are per-chain. Custody providers support multi-chain asset wallets through the same vault or wallet. Switching networks requires only environment-variable changes.

---

## Custody Integration

### Bring-Your-Own-Custodian Model

DALP is not a custodian. It orchestrates custody policy across existing custodian relationships through a provider-abstracted signer service. Institutions connect their existing custody infrastructure; DALP handles the lifecycle orchestration. The Key Guardian service manages cryptographic key material with strict security controls, routing signing requests to the appropriate backend based on key metadata. Keys never leave secure boundaries in plaintext.

The storage hierarchy supports escalating security levels: encrypted database for development, cloud secret manager for standard production, hardware security module (FIPS 140-2 Level 3) for regulated financial services, and third-party MPC custody (DFNS or Fireblocks) for the highest security requirements.

### DFNS Integration

DFNS provides delegated MPC custody where key shards distribute across DFNS infrastructure. The DFNS policy engine evaluates transaction rules before MPC signing proceeds, supporting auto-sign rules, amount thresholds, IP and time restrictions, and multi-party approval requirements. When a policy requires approval, DALP surfaces the pending approval through its API, enabling operators to review, approve, or reject without leaving the DALP interface. DFNS audit logs synchronize with DALP audit records, providing unified compliance reporting.

### Fireblocks Integration

Fireblocks provides institutional MPC-CMP custody through vault accounts, with continuous key refresh eliminating static key shares. The Transaction Authorization Policy (TAP) enforces transaction amount thresholds, whitelisted destination addresses, velocity limits, and multi-approver requirements. Unlike DFNS, Fireblocks does not support programmatic approval resolution through external APIs; approvals occur through the Fireblocks console or mobile app.

### Unified Signer Abstraction

The unified signer interface abstracts over all custody backends. Switching between DFNS and Fireblocks requires only configuration changes: no workflow modifications, no code changes, no API contract differences. The normalized interface covers wallet CRUD, transaction preparation and signing, message signing (EIP-191, EIP-712), optional approval APIs, optional provider-native broadcast, and health monitoring. Signer configuration is loaded once and cached to prevent concurrent bootstrap races.

### Transaction Processing

DALP's transaction processor is a durable virtual-object service keyed by sender address and chain ID, providing partition-level exclusive locking during submission and broadcast. Nonce management serializes allocation per address and chain, with self-healing for nonce conflicts: the system re-reads on-chain nonce, advances to the correct value, and retries up to three times. Gas management supports fast, standard, and economy strategies, with stuck-transaction resolution workflows that increase gas prices while maintaining nonce consistency.

### Account Abstraction (ERC-4337)

The transaction signer supports ERC-4337 account abstraction with user operations submitted through bundler infrastructure, paymaster integration for gas fee sponsorship, batched execution for gas efficiency, and typed paymaster routing that selects between zero-gas and paymaster-funded execution paths based on deployment configuration.

---

## KYC/AML Integration

### Identity Verification Architecture

DALP does not perform identity verification directly. It provides the identity infrastructure that KYC/AML verification results flow into. Institutions choose their own KYC/AML providers, and DALP provides the on-chain identity layer that makes verification results enforceable at the protocol level.

The integration flow: an external KYC/AML provider verifies the investor off-chain; verification results are translated into claim topics; a trusted issuer writes signed claims to the investor's OnchainID contract (ERC-734/735); the trusted issuers registry validates the issuer is authorized for the relevant claim topics; compliance modules read those claims at every transfer to make eligibility decisions; and claims have expiry, with expired claims rejected at transfer time through fail-closed enforcement.

### Chain-of-Trust Identity Architecture

The identity registry now implements a chain-of-trust architecture for trusted issuers, topic schemes, and identity verification. Rather than relying on a flat meta-registry, the system resolves trust in a hierarchical bottom-up pattern: token-level registries check first, then system-level, then global registries. The maximum chain depth is three levels, providing per-token granularity while maintaining global default behavior. Per-token registries are deployed via dedicated factories, enabling asset-specific trusted issuer configurations without modifying system-wide settings.

This architecture supports institutional requirements where different asset classes may need different trusted issuers or different claim topic schemes. A bond token can require a different set of accredited-investor verifiers than a fund token, each with independent configuration that inherits defaults from the system and global levels.

### KYC Profile Lifecycle

DALP maintains a full KYC profile lifecycle with version management. Profiles progress through draft, under review, approved, rejected, and update-required states. When issuing KYC claims, the platform validates that the target identity exists and is resolved, an approved KYC profile exists with a content hash, and the submitted claim value matches the approved content hash. This ensures claims cannot be issued against stale or unapproved verification data.

### Compliance Engine Integration

The compliance engine orchestrates transfer validation through modular rule contracts. With the Compliance V2 architecture, compliance operates at two levels: system-level compliance for global rules and per-token compliance for asset-specific requirements. Each compliance level queries its configured modules during transfer checks.

Available compliance modules include country restrictions, identity verification (with logical AND/OR claim expressions), supply limits, investor count tracking (with cross-token counting), transfer approval workflows with authority-based revocation, and time-lock holding period enforcement. Modules are configurable per token, and a single module veto blocks the entire transfer through fail-fast design.

The V2 architecture introduces a three-tier module lifecycle (add, remove, uninstall) and a module registry that detects and adapts both V1 and V2 module versions through a compatibility adapter layer. This means existing compliance module deployments continue to operate without modification, while new modules can take advantage of the simplified V2 interface with per-engine instances.

---

## Payment Rails and ISO 20022

### Payment Connectivity Model

DALP supports integration with institutional payment infrastructure through its API layer and settlement capabilities. The integration architecture supports ISO 20022 message standards for connectivity with SWIFT, SEPA, and RTGS payment networks, enabling tokenized settlement workflows to interface with traditional payment clearing systems.

### Exchange Rate Management

DALP provides exchange rate management with rates synchronized from external providers, historical rate storage, and manual operator overrides for institutional pricing requirements. Full CRUD API surface supports reading, listing, history queries, updates, deletion, and synchronization. Multi-currency asset valuation uses cross-referenced exchange rates with cache invalidation after mutations.

### Atomic Settlement Integration

DALP's XvP (Exchange versus Payment) settlement system provides the bridge between tokenized assets and payment instruments. Local settlement executes atomically on a single chain where both legs complete or revert together. Cross-chain settlement uses hash time-locked contract patterns for settlements spanning multiple chains. Multi-party settlements support more than two counterparties. Terminal states (executed, cancelled, or expired-withdrawn) are deterministic and auditable, with refund protection through a 30-day grace period that protects investor pools during failed sale scenarios.

The XvP routing layer has been migrated to an indexer-first data access pattern, eliminating the external graph dependency for settlement status queries and improving response latency.

### Per-Currency Claim Patterns

Token sale refunds use a per-currency pull pattern where each refund claim accepts a single payment currency. This design ensures a blacklisted stablecoin cannot weaponize a single investor's refund to lock all others, a critical safety property for multi-currency settlement operations.

---

## Oracle and Data Feed Integration

### Feeds System Architecture

DALP provides a unified data feed integration layer through the FeedsDirectory, a central on-chain registry that separates discovery (which feed serves a given subject and topic) from delivery (individual feed contracts). Consumers never hard-code feed addresses.

Supported feed types include issuer-signed scalar feeds (factory-deployed, with history modes, drift allowance, positive-value requirement, and signature verification) and Chainlink aggregator adapters (presenting any DALP feed through the de facto standard interface consumed by DeFi protocols and external analytics tools).

Feed v2 mutations support async queue semantics with HTTP 202 responses and status URL polling. Feed submissions perform identity checks at the HTTP layer and delegate signing to the durable feed service, returning machine-readable output including transaction hash, feed address, value, and nonce.

---

## Secrets Management

DALP implements unified secrets management with multiple backend support: encrypted database (default, with async loader), enterprise HSM integration (available across all deployment configurations), and environment variables for simple deployments. Wallet secrets are consolidated into the DALP database rather than distributed across services, providing a single point of secret lifecycle management.

---

## ERP and Back-Office Integration Patterns

### Integration Architecture

DALP enables ERP and back-office integration through complementary patterns. API-first integration exposes every operation through REST endpoints for point-to-point calls, middleware integration, batch processing through CLI scripting, and SDK-based custom applications. Data export provides direct database access through 18 analytics views. Event-driven integration delivers blockchain events indexed in real time with sub-5-second latency, SSE streaming for operational dashboards, and compliance events for regulatory reporting pipelines. External token registration makes tokens from external systems first-class DALP citizens for portfolio and compliance tracking.

### Multi-Environment Deployment

All deployment models (managed SaaS, dedicated cloud, on-premises Helm/Kubernetes, and hybrid) expose the same API surface, ensuring integration code is portable across environments.

### Observability Integration

DALP ships a full observability stack for enterprise monitoring integration. Pre-built dashboards (21 shipped as code), time-series metrics, structured logs with secret filtering, and distributed tracing with OpenTelemetry support. DALP-specific telemetry covers transaction-phase traces, indexer metrics (blocks processed, block lag, events processed, reorg detection), and privacy controls that redact sensitive data before persistence. Enterprise integration points include OTLP receivers for external trace and metric ingestion, cross-navigation between traces, logs, and metrics, enterprise Kubernetes platform support, SSO/IAM integration for dashboard access, and SIEM integration for security event forwarding.

Indexer health monitoring has been modernized to track the native chain indexer rather than the previously used external graph infrastructure, providing direct visibility into indexing lag, processing time, error rates, and chain synchronization status.

---

## Meta-Transactions and Gasless Operations

The API supports meta-transactions through ERC-2771 integration. Callers can submit signed transaction payloads without holding native tokens for gas. A configured relayer service sponsors transaction costs while the user's signature authorizes the operation. This enables simplified user experiences where investors interact with tokens without managing cryptocurrency for fees, sponsored operations where issuers cover transaction costs, and gasless workflows for automated systems.

With the addition of typed paymaster routing, the platform can select between zero-gas execution (where the relayer covers all costs) and paymaster-funded execution (where a smart contract paymaster sponsors gas based on configurable policies) based on deployment configuration.

---

## Enterprise Financial Messaging

The API supports integration with enterprise financial messaging systems. Standards-based messaging covers corporate actions, settlement instructions, and asset servicing aligned with ISO 20022. Automated reconciliation delivers outbound notifications for completed transactions, enabling downstream system updates. Audit trail synchronization triggers messages to compliance and reporting systems from transaction events. These integrations connect blockchain-native operations to traditional financial infrastructure, enabling hybrid workflows where DALP handles tokenization while existing systems manage clearing, settlement confirmation, and regulatory reporting.

---

## Integration Security Model

### Defense-in-Depth

DALP enforces security at every platform layer. No single control failure grants unauthorized access to digital assets. Five independent layers operate: identity (authentication via session, API key, SSO), access (role-based and resource-level authorization), transaction (wallet verification with PIN, TOTP, backup codes), on-chain (identity claims and compliance modules via SMART Protocol/ERC-3643), and custody (provider policy evaluation and MPC signing). Each layer operates independently, and a compromise at any single layer is caught by the remaining layers.

### Two-Layer Policy Model

Every transaction passes through two independent policy layers. Layer 1 (on-chain, via DALP compliance modules) enforces identity and KYC claims, country restrictions, supply and issuance caps, holding period locks, and investor count caps. Layer 2 (custodian, via DFNS or Fireblocks) enforces transaction amount thresholds, multi-party approval workflows, rolling spend limits, and destination allowlists. Layer 1 is authoritative for regulatory enforcement. Layer 2 protects signing infrastructure. Both must pass in sequence.
