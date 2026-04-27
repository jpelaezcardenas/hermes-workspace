# Integration Architecture

## Executive Summary

One of the most underestimated aspects of doing tokenization right is integration — connecting digital asset infrastructure to existing core systems, custody relationships, payment rails, and operational workflows. DALP is designed to operate **within** existing institutional environments, not replace them. The platform provides comprehensive integration surfaces — REST APIs, typed SDKs, event indexing, CLI tooling, server-sent event streaming — that enable programmatic access to every platform capability. Payment rail connectivity supports ISO 20022 standards. Bring-your-own-custodian integrations (Fireblocks, DFNS) and bring-your-own-chain flexibility (any EVM-compatible network) mean institutions adopt DALP without disrupting existing vendor relationships.

This section covers the full integration surface: how external systems connect to DALP, how DALP connects to external infrastructure, and the architectural patterns that make these integrations reliable and auditable.

---

## 1. DAPI — The Durable API Service

### 1.1 What DAPI Is

DAPI (Durable API Service) is DALP's unified API layer — the single programmatic surface through which all platform operations are accessed. It is not a thin wrapper around smart contracts; it is a full middleware stack that transforms authenticated HTTP requests into tenant-scoped, permission-aware, execution-ready operations.

DAPI is built on **oRPC**, a type-safe RPC framework that provides automatic OpenAPI documentation, schema validation via Zod, custom serializers for blockchain-specific types (BigInt, BigDecimal, Timestamp), and streaming support for long-running operations. The API follows RESTful conventions with POST for mutations, GET for queries, and standardized error codes.

DAPI serves two distinct endpoints with different authentication models:

| Endpoint | Authentication | Consumer | Scope Enforcement |
|----------|---------------|----------|-------------------|
| `/api/rpc` | Session/cookie only | DALP dApp frontend (browser) | N/A (session-bound) |
| `/api/v2` | API keys (HTTP-method-scoped) | SDK, CLI, backend integrations, CI pipelines | GET/HEAD/OPTIONS for read-only keys; all methods for read-write keys |

This is a **hardened security boundary**: API keys are explicitly blocked on the RPC endpoint. If a programmatic consumer attempts to authenticate with an API key on `/api/rpc`, DAPI returns a `FORBIDDEN` error instructing them to use the REST endpoint instead.

The separation exists because oRPC uses POST for all procedure calls — reads and writes alike — making HTTP method unreliable for scope enforcement on the RPC endpoint. The REST endpoint maps HTTP methods correctly (GET for queries, POST for mutations), enabling proper read-only vs. read-write API key scope enforcement via `assertScopeAllowed(httpMethod, scope)`.

### 1.2 REST API Namespaces and Endpoint Coverage

DAPI exposes a comprehensive REST API at `/api/v2` covering every DALP domain. The API is organized by procedure namespace rather than REST resource conventions, reflecting how operators think about platform capabilities:

| Namespace | Capabilities | Example Procedures |
|-----------|-------------|-------------------|
| `token` | Asset lifecycle operations | `token.create`, `token.mint`, `token.burn`, `token.transfer`, `token.freezeAddress`, `token.pause` |
| `system` | Platform infrastructure | `system.accessManager.grantRole`, `system.identity.register`, `system.trustedIssuers.create` |
| `user` | User management | `user.me`, `user.update`, `user.stats`, `user.statsGrowthOverTime` |
| `account` | Wallet operations | `account.identity`, `account.claims` |
| `transaction` | Transaction status tracking | `transaction.read` |
| `actions` | Scheduled tasks and operations | `actions.list`, `actions.read` |
| `addons` | Optional features | `addons.tokenSale.create`, `addons.fixedYield.configure`, `addons.xvp.*`, `addons.vault.*` |
| `contacts` | Address book management | `contacts.list`, `contacts.create` |
| `exchangeRates` | Multi-currency support | `exchangeRates.list`, `exchangeRates.convert`, `exchangeRates.sync` |
| `search` | Global search | `search.query` (across tokens, contacts, transactions) |
| `settings` | Platform configuration | `settings.get`, `settings.update`, asset class definitions |
| `externalToken` | External asset registration | `externalToken.register`, `externalToken.list` |
| `admin` | Organization management | Organization CRUD, user administration |
| `identityRecovery` | Identity recovery workflows | Recovery preview, execute, status tracking |
| `monitoring` | Operational health | API health, blockchain health, logs, snapshots, streaming |
| `auth` | Better Auth endpoints | `/auth/sign-in`, `/auth/session`, `/auth/passkey/create` |

Each namespace is prefixed in the API path. For example, `token.create` maps to `POST /api/token/create`.

### 1.3 Interactive Documentation and OpenAPI Specification

The Unified API delivers **OpenAPI 3.1 specifications** generated directly from procedure definitions, ensuring documentation stays synchronized with implementation. Interactive exploration is available through Swagger UI at `/api`, enabling integration engineers to authenticate, construct requests, and execute procedures directly from the documentation interface.

The OpenAPI specification includes:
- **Endpoint definitions** — all available routes organized by namespace
- **Request schemas** — parameter types, validation rules, required fields
- **Response schemas** — return types for successful responses and error codes
- **Authentication** — security scheme using the `X-Api-Key` header
- **Examples** — sample requests and responses for common operations

The specification is available at `/openapi.json` and can be imported directly into Postman, Insomnia, Redoc, or any OpenAPI-compatible tooling. This enables standard enterprise API governance workflows where API consumers can auto-generate client libraries in any language.

### 1.4 oRPC Contract Architecture and Type Safety

DAPI's API surface is defined as a typed oRPC contract (`rpcContract = v2Contract`), which means:

- **Every endpoint has a typed schema**: Request parameters, response shapes, and error types are defined at the contract level using Zod schemas. Unknown fields, missing parameters, and type mismatches are caught at the schema layer before business logic executes.
- **Contract errors are structured**: 534 auto-generated error codes from Solidity ABIs, each with 4-byte selectors, severity levels, audience targeting, retryability flags, and i18n translations across 4 locales (en-US, de-DE, ar-SA, ja-JP). Blockchain revert reasons surface as structured DALP contract errors rather than opaque revert blobs.
- **OpenAPI generation is automatic**: The v2 contract generates a full OpenAPI specification. No manual synchronization between implementation and documentation is required.
- **Validation is deterministic**: Schema validation runs before business logic execution, preventing malformed requests from consuming gas or triggering unintended side effects.

Error responses follow a consistent JSON structure across all procedures:

```json
{
  "code": "USER_NOT_AUTHORIZED",
  "status": 403,
  "message": "User does not have the required role to execute this action.",
  "data": {
    "requiredRoles": ["SUPPLY_MANAGEMENT_ROLE"]
  }
}
```

The error reference includes machine-readable codes (SCREAMING_SNAKE_CASE), HTTP status codes, human-readable descriptions, and optional context data. Blockchain-specific errors include transaction details: gas estimation failures, revert reasons, and nonce conflicts surface as structured error responses.

### 1.5 Transaction Queue and Async Operations

DAPI v2 mutations support three execution modes, negotiated through RFC 7240 `Prefer` headers:

| Mode | Header | Behavior |
|------|--------|----------|
| **Synchronous** | `Prefer: respond-sync` | Blocks until transaction confirms on-chain |
| **Asynchronous** | `Prefer: respond-async` | Returns HTTP 202 with `statusUrl` for polling |
| **Hybrid** | Default | Server decides based on expected execution time |

Transaction speed can be further controlled via `X-Transaction-Speed` headers. The server acknowledges the honored mode through a `Preference-Applied` response header.

All v2 blockchain mutations flow through DALP's **async transaction request pipeline** — an 11-state lifecycle managed by Restate durable workflows:

```
created → queued → submitted → broadcasting → pending → confirming →
    confirmed (success) │ failed │ cancelled │ expired │ replaced
```

This means:
- Every mutation is **idempotent** (same request produces the same result, enforced via `Idempotency-Key` headers)
- Every mutation is **durable** (survives process restarts via Restate persistent state machines)
- Every mutation is **auditable** (full state-transition history in `transaction_request` table with BRIN index on `created_at` for efficient time-ordered audit access)
- Transaction status can be polled via the `statusUrl` returned in async responses

Multi-transaction operations (e.g., system creation with compliance modules) return all transaction hashes as a comma-separated list in the `X-Transaction-Hash` header, ordered by execution sequence. If a timeout occurs, it applies to the last hash — all preceding transactions completed successfully.

### 1.6 Retry Strategy and Error Recovery

DAPI provides structured guidance for integration resilience:

| Error Category | HTTP Status | Retry? | Action |
|----------------|-------------|--------|--------|
| Validation errors | 400 | No | Fix request payload |
| Authentication failures | 401 | No | Reauthenticate |
| Authorization denied | 403 | No | Check role permissions |
| Resource not found | 404 | No | Verify identifier |
| Rate limited | 429 | Yes | Retry after delay |
| Server errors | 500 | Yes | Retry with exponential backoff (1s, 2s, 4s) |
| Confirmation timeout | 504 | No | Check transaction status via `X-Transaction-Hash` before retrying |

Key principle: **never retry a `CONFIRMATION_TIMEOUT`** without first checking whether the original transaction succeeded on-chain. Blockchain transactions are not automatically idempotent at the network level, and blind retries can create duplicate transactions. The `transaction.read` endpoint enables status verification before any retry decision.

### 1.7 Middleware Chain

Every DAPI request passes through a layered middleware chain that progressively enriches request context:

1. **Session Resolution** (`sessionMiddleware`): Loads auth from request headers via Better Auth, differentiates browser sessions from API keys, enforces endpoint-level auth-method constraints
2. **Auth Enforcement** (`authMiddleware`): Requires authenticated user, emits `X-User-Id` and optional `X-Organization-Id` response headers for metrics capture
3. **Organization Role Sync** (`orgRoleSyncMiddleware`): Synchronizes on-chain access-control state into organization membership roles at request time
4. **System Context Hydration** (`systemMiddleware`): Resolves tenant system address, checks bootstrap readiness, derives user permissions from on-chain roles, projects identity status and country into context. Caches per `sessionId:systemAddress:userAddress` to prevent redundant queries.
5. **Token Context** (`tokenMiddleware`, for token operations): Resolves token metadata, computes caller actions from roles and trusted-issuer claims, enforces required token interfaces
6. **Wallet Verification** (`walletVerificationMiddleware`, for sensitive mutations): Step-up verification via PIN, OTP, or secret codes. Bypassed for API key sessions.
7. **Transaction Queue** (`transactionQueueMiddleware`): Negotiates execution mode and transaction speed from request headers

This is not a flat authentication check — it is a progressive context-enrichment pipeline that converts a generic HTTP request into a fully scoped, permission-aware execution context. Read operations require only a valid session. Write operations require both platform permission and the appropriate on-chain role — neither alone is sufficient.

### 1.8 Rate Limiting

API keys are rate-limited at **10,000 requests per 60-second window per key**. Rate limit configuration is stored per-key, enabling differentiated limits for high-volume integration consumers. When rate limits are exceeded, the API returns HTTP 429 with standard retry-after headers.

---

## 2. TypeScript SDK

### 2.1 @settlemint/dalp-sdk

DALP ships a public TypeScript SDK published to npm as `@settlemint/dalp-sdk`. The SDK is the recommended integration surface for TypeScript/JavaScript consumers and provides full type safety with contract-bound types generated from the live DALP v2 route tree.

```typescript
import { createDalpClient } from "@settlemint/dalp-sdk";

const client = createDalpClient({
  url: "https://your-dalp-instance.example.com",
  apiKey: "sm_dalp_xxxxxxxxxxxxxxxx",
  organizationId: "optional-org-id",
});

// Typed operations across all DALP domains
const tokens = await client.token.list({ limit: 10 });
const system = await client.system.read();
const me = await client.user.me();
```

**Technical Properties:**

| Property | Detail |
|----------|--------|
| Package | `@settlemint/dalp-sdk` (public npm, `publishConfig.access: "public"`) |
| Module format | ESM-only (`type: "module"`) |
| Runtime | Node.js 20+ |
| Transport | OpenAPI REST client (`/api/v2`) via `OpenAPILink` |
| Type safety | Contract-bound types from `@dalp/dapi-contract` — `DalpClient = JsonifiedClient<ContractRouterClient<typeof rpcContract>>` |
| Auth | API key required (fails fast on blank key or invalid URL) |
| Header security | SDK headers (`x-api-key`, `x-organization-id`, `Idempotency-Key`) applied after user-provided headers — cannot be overridden by callers |
| Serialization | DALP-specific serializers for `Dnum` (arbitrary-precision decimals via `dnum` library), `bigint`, and `Date` |

### 2.2 Blockchain Value Serialization

The SDK carries a DALP-specific wire-format layer for blockchain-heavy value types. Three custom serializers handle precision-critical data:

- **`bigDecimalSerializer`**: Converts `Dnum` tuples like `[1000000n, 6]` to locale-independent decimal strings like `"1.000000"`. Also accepts the legacy JSON tuple wire format for backward compatibility.
- **`bigIntSerializer`**: Handles native JavaScript `bigint` values that exceed `Number.MAX_SAFE_INTEGER` — common in token amounts with 18 decimal places.
- **`timestampSerializer`**: Converts `Date` objects for API transport with deterministic serialization.

These serializers inject into the OpenAPI link through `customJsonSerializers`, ensuring outgoing mutations can safely encode token amounts, timestamps, and other precision-critical values without silent truncation or floating-point artifacts.

### 2.3 SDK Entrypoints and Extension Surface

The SDK publishes three npm entrypoints for different consumption patterns:

| Entrypoint | Purpose | Use Case |
|------------|---------|----------|
| `.` | Runtime client | Standard SDK usage |
| `./types` | Type-only imports (zero runtime cost) | TypeScript type checking without bundling the client |
| `./plugins` | Request/response validation, batch link | Advanced consumers needing validation or batched requests |

Available plugins include `RequestValidationPlugin`, `ResponseValidationPlugin`, and `BatchLinkPlugin` from upstream oRPC packages. Request and response validation can be enabled per-client to catch contract violations during development.

### 2.4 Exposed Namespaces

The SDK exposes typed operations across all DALP domains: `account`, `actions`, `addons`, `admin`, `contacts`, `exchangeRates`, `externalToken`, `identityRecovery`, `monitoring`, `search`, `settings`, `system`, `token`, `transaction`, and `user`. The type surface is anchored to the live v2 route tree via `rpcContract = v2Contract`, so SDK types are always in sync with the running API.

### 2.5 Multi-Language SDK Generation

While the TypeScript SDK is the first-party supported client, DALP's OpenAPI specification enables SDK generation in any language via `openapi-generator-cli`:

| Language | Generator | Command |
|----------|-----------|---------|
| **Python** | `python` | `openapi-generator-cli generate -i /openapi.json -g python -o ./client` |
| **Go** | `go` | `openapi-generator-cli generate -i /openapi.json -g go -o ./client` |
| **C# / .NET** | `csharp-netcore` | `openapi-generator-cli generate -i /openapi.json -g csharp-netcore -o ./client` |
| **Java** | `java` | `openapi-generator-cli generate -i /openapi.json -g java -o ./client` |

Generated clients may require manual adjustments for BigInt/BigDecimal serialization. The TypeScript SDK includes `toBigDecimal()` and `fromBigDecimal()` helpers as reference implementations.

### 2.6 Credential Reuse with CLI

The SDK integrates with DALP CLI credentials. Developers authenticate via `dalp login`, which uses a browser-based device-code flow and stores API keys in macOS Keychain (Darwin) or `~/.config/dalp/credentials.json` (other platforms). These credentials can then be reused in SDK-based applications via `dalp whoami --format json`.

---

## 3. CLI

### 3.1 DALP CLI Overview

DALP ships a full-featured command-line interface with **301 command registrations** across **26 top-level command groups**. This is not a debugging tool — it is a documented product surface with getting-started guides, command reference, scripting documentation, and AI agent integration guides.

**Command Surface:**

| Domain | Groups | Approximate Commands |
|--------|--------|---------------------|
| Core | `token`, `system`, `user` | ~160 |
| Identity & Compliance | `identity`, `kyc` | ~30 |
| Addons | `xvp`, `fixed-yield`, `token-sale` | ~40 |
| Platform | `settings`, `admin`, `monitoring` | ~40 |
| Infrastructure | `login`, `logout`, `whoami`, `config` | ~10 |

All commands use Zod-backed arguments/options and bind directly to DALP client methods rather than shelling out to HTTP manually. The CLI injects DALP auth/config middleware into all non-bootstrap commands and constructs the shared DALP client through `createOrpcClient()`.

### 3.2 Authentication

The CLI uses a browser-based device-code flow:
1. Request device code from `/api/auth/device/code`
2. User approves session in browser
3. CLI polls `/api/auth/device/token` for completion
4. Session is upgraded into a long-lived API key
5. Credentials stored securely: macOS Keychain on Darwin, permission-checked `~/.config/dalp/credentials.json` on other platforms

Logout attempts server-side key revocation, then clears local credentials even if the remote deletion fails — fail-safe credential cleanup.

### 3.3 Monitoring and Streaming

The CLI exposes operational visibility through `monitoring api` and `monitoring blockchain` command trees, including timeline queries, detail/log/service lookups, and streaming accessors (`logs-stream`, `snapshots-stream`). This enables operators to build monitoring pipelines, feed dashboards, and integrate with enterprise SIEM systems without a browser.

### 3.4 Scripting and Automation

The CLI is documented as an automation surface with scripting guides for batch operations. Combined with the 301-command coverage, this enables:
- CI/CD pipeline integration for token deployment and configuration
- Automated compliance module setup and verification
- Batch user creation and identity registration
- Scripted token lifecycle operations (mint, burn, distribute)
- Automated KYC claim issuance and management

---

## 4. Blockchain Event Indexing and Data Pipeline

### 4.1 Chain Indexer Architecture

The Chain Indexer bridges the gap between blockchain data structures and application requirements. Blockchain storage optimizes for consensus verification, not application queries — historical data queries can take seconds or fail entirely for complex aggregations. The indexer transforms event logs into domain models that serve application needs with millisecond-latency responses.

**Architecture:**
- Built on PostgreSQL + Drizzle ORM + Restate durable virtual objects
- One `ChainIndexer` Restate Virtual Object per chain ID
- Processes events across 8+ domains: token creation/transfer, identity, compliance, addon (feeds, token sale, XvP, fixed yield, vault), and token extensions (bonds, funds, capped, pausable)
- Unified event log via `idxr_events` table
- Genesis Directory Discovery: bootstraps by querying the on-chain DALP Directory for registered factories, then discovers all deployed contracts through factory event logs

**Domain Models Constructed:**

| Domain Model | Source Events | Query Patterns |
|--------------|---------------|----------------|
| Asset balances | Transfer, Mint, Burn | Balance by holder, asset totals |
| Investor portfolios | Transfer, Verification | Holdings by investor, portfolio value |
| Transaction history | All events | Filtered by asset, investor, time |
| Compliance status | Verification events | Current status, history |
| Distribution records | Distribution events | Pending, completed, by period |

### 4.2 Consistency and Reorg Handling

Chain reorganizations can reverse confirmed transactions. The indexer maintains rollback capability for configurable block depths:

1. **Block confirmation tracking**: Events from recent blocks marked as provisional based on configurable confirmation depth (1 for private networks, 12+ for Ethereum mainnet)
2. **Reorg detection**: Detected reorgs trigger identification of affected blocks, state rollback to fork point, reprocessing of canonical chain, and notification to connected clients
3. **Idempotent processing**: Event processing is idempotent — reprocessing the same events produces identical state, enabling safe recovery from any failure scenario
4. **Zero-downtime reindexing**: Schema isolation allows new indexer versions to build fresh data alongside the running version, then switch atomically

**Event Freshness:**
- Virtual views: Real-time (query-time execution)
- Materialized views: Configurable refresh (OnWrite, Scheduled, OnDemand)
- Event latency: <5 seconds from blockchain event to view availability

### 4.3 Indexer Health Monitoring

| Metric | Purpose | Alert Threshold |
|--------|---------|-----------------|
| Block lag | Processing currency | Blocks behind > 10 |
| Processing time | Handler performance | P99 > 100ms |
| Error rate | Handler failures | Rate > 0.1% |
| Reorg depth | Chain stability | Depth > 3 blocks |

### 4.4 PostgreSQL Analytics Views

DALP exposes **18 PostgreSQL analytics views** across 5 domains for direct querying by BI tools:

| Domain | Views | Examples |
|--------|-------|---------|
| Identity | 2 | `v_identity_stats`, `v_identity_key_stats` |
| Compliance | 4 | `v_claims_stats`, `v_trusted_issuer_stats`, `v_topic_scheme_stats`, `v_compliance_module_stats` |
| Addons | 4 | `v_vault_activity`, `v_airdrop_stats`, `v_xvp_settlement_stats`, `v_yield_schedule_stats` |
| Cross-Cutting | 7 | `v_transaction_count`, `v_transaction_history_daily`, `v_asset_activity_daily/hourly`, `v_asset_lifecycle_daily`, `v_country_asset_count` |
| Actions | 1 | `v_actions` |

Views support both type-safe Drizzle ORM queries and raw SQL access for BI tools (Looker, Tableau, Power BI, etc.). This enables standard ETL pipelines without requiring integration through the DALP API.

### 4.5 SSE (Server-Sent Events) Streaming

DALP emits real-time events through Server-Sent Events for operational monitoring:

- **API Metrics**: Request rates, latency, error rates published through `EventPublisher`
- **Blockchain Health**: Health status changes published via `globalThis.__blockchainHealthPublisher` with 3-sample hysteresis before state transitions to prevent alert flapping
- **Transaction Status**: Transaction lifecycle state changes available for real-time tracking

### 4.6 Subgraph (TheGraph) — Migration Path

DALP maintains a TheGraph subgraph for complex cross-entity GraphQL queries. This is on a defined deprecation path toward the DALP-native PostgreSQL indexer:

| Phase | Status |
|-------|--------|
| Phase 1: Migrate simple aggregations to PostgreSQL views | ✅ Complete |
| Phase 2: Migrate DAPI analytics routes to PostgreSQL | 🔄 In progress |
| Phase 3: Deprecate subgraph for new deployments | Planned Q2 2026 |
| Phase 4: Full sunset of subgraph dependency | Planned Q3 2026 |

During the transition, both data sources remain available. The subgraph provides end-to-end lifecycle coverage for vault events (creation, balance, signer weights, requirements, approvals, execution, OnchainID), settlement events, and other cross-entity queries that span multiple contract families. Some complex cross-entity queries (e.g., token holders with identity claims across multiple hops) still require the subgraph.

---

## 5. Blockchain Network Connectivity

### 5.1 Chain Gateway Architecture

The Chain Gateway manages all outbound blockchain connectivity. This component load balances across multiple RPC endpoints, handles failover automatically, and optimizes request routing based on operation characteristics. Production blockchain deployments require more than single-node connectivity — node maintenance, network partitions, and capacity limits demand resilient multi-node architectures.

**Load Balancing Strategies:**

| Strategy | Selection Criteria | Optimal For |
|----------|-------------------|-------------|
| Round robin | Sequential distribution | Homogeneous node pools |
| Latency-based | Lowest response time | Geographic distribution |
| Health-weighted | Healthy nodes preferred | Mixed reliability pools |
| Operation-aware | Write to primary, read to replicas | Read-heavy workloads |

**Health Monitoring:**
- **Block height tracking**: Nodes significantly behind chain head marked as degraded
- **Response latency**: Slow nodes receive reduced traffic allocation
- **Error rate monitoring**: High error rates trigger temporary removal from pool
- **Connection testing**: Periodic probes verify connectivity independent of traffic

**Performance Optimization:**
- Connection pooling eliminates connection establishment overhead
- Request batching: multiple read requests targeting the same node batch into single RPC calls
- Response caching: immutable data (block data, transaction receipts, historical state) cached with appropriate TTLs; cache invalidation triggers on chain reorganizations
- Retry optimization: failed requests retry on alternate nodes rather than the same failing node

Failover completes in seconds without application awareness: health checker detects failure, load balancer removes node from active pool, in-flight requests redirect to healthy nodes, recovery probes continue until node returns to health.

### 5.2 Supported Network Categories

DALP operates on any blockchain that implements the **Ethereum JSON-RPC specification**. No application changes are required when switching networks. Configuration handles consensus differences, gas models, and confirmation requirements.

**Layer 1 Mainnets:**

| Network | Gas Model | Block Time | Notes |
|---------|-----------|------------|-------|
| Ethereum | EIP-1559 (base + priority fee) | ~12 seconds | Primary target, full feature support |
| Polygon PoS | EIP-1559 variant | ~2 seconds | Lower gas costs, faster finality |
| Avalanche C-Chain | EIP-1559 | ~2 seconds | Sub-second finality with 3-block confirmation |
| BNB Smart Chain | Legacy gas pricing | ~3 seconds | Higher throughput |
| XDC Network | Enterprise-grade | Variable | Hybrid blockchain |
| Gnosis Chain | EIP-1559 | ~5 seconds | Community-owned (formerly xDai) |

**Layer 2 Rollups:**

| Network | Type | Settlement | Notes |
|---------|------|-----------|-------|
| Arbitrum One | Optimistic rollup | Ethereum L1 | 7-day challenge period for withdrawals |
| Optimism | Optimistic rollup | Ethereum L1 | Bedrock architecture |
| Base | Optimistic rollup | Ethereum L1 | Coinbase-incubated, OP Stack |
| zkSync Era | ZK rollup | Ethereum L1 | Validity proofs, different gas accounting |
| Polygon zkEVM | ZK rollup | Ethereum L1 | EVM-equivalent ZK proofs |
| Linea | ZK rollup | Ethereum L1 | ConsenSys zkEVM with type 2 equivalence |
| Scroll | ZK rollup | Ethereum L1 | Community-driven zkEVM |

**Specialized and Appchains:**

| Network | Description |
|---------|-------------|
| ADI Chain | UAE-based ZK Stack chain for institutional finance and regulated stablecoins |
| Immutable zkEVM | Gaming-focused Polygon zkEVM |
| Worldchain | World ID verified OP Stack chain |

**Private / Consortium Networks:**

| Client | Use Case |
|--------|----------|
| Hyperledger Besu | Enterprise features with IBFT 2.0/QBFT consensus, permissioning |
| Go-Ethereum (Geth) | Reference implementation, private PoA (Clique) or PoS |
| Nethermind | .NET-based client with enterprise plugins |
| Erigon | Archive-optimized client for analytics |
| SettleMint networks | Managed private networks with genesis-allocated DALP contracts |

### 5.3 Multi-Chain Architecture

DALP supports simultaneous operation across multiple chains with key architectural implications:

- **Identity isolation**: Each chain has its own identity registry. An investor's OnchainID is chain-specific.
- **Compliance isolation**: Compliance module configurations are per-chain, per-token.
- **Indexer per chain**: One `ChainIndexer` Restate Virtual Object per chain ID.
- **Custody per chain**: Fireblocks and DFNS support multi-chain asset wallets through the same vault/wallet.
- **Configuration-driven**: Network switching requires only environment-variable changes — no code modifications.

Network-specific configuration parameters include block confirmation count (1 for private to 12+ for Ethereum mainnet), gas price strategy (legacy, EIP-1559, or custom), RPC batch limits (varies by provider), and chain ID for multi-chain identity registry.

---

## 6. Custody Integration

### 6.1 Bring-Your-Own-Custodian Model

DALP is **not a custodian**. It orchestrates custody policy across existing custodian relationships through a provider-abstracted signer service. Institutions connect their existing custody infrastructure; DALP handles the lifecycle orchestration.

The Key Guardian service manages cryptographic key material with strict security controls, routing signing requests to the appropriate backend based on key metadata. Keys never leave secure boundaries in plaintext.

**Storage Hierarchy:**

| Storage Tier | Protection Level | Use Case |
|-------------|-----------------|----------|
| Encrypted database | Application-level encryption | Development, low-value assets |
| Cloud secret manager | Platform-managed encryption | Standard production deployments |
| Hardware security module | FIPS 140-2 Level 3 | Regulated financial services |
| Third-party custody (DFNS/Fireblocks) | Delegated institutional MPC | Highest security requirements |

### 6.2 Custody Provider Comparison

| Capability | DFNS | Fireblocks |
|-----------|------|-----------|
| MPC type | Threshold MPC (distributed key shards) | MPC-CMP (continuous key refresh) |
| Policy engine | DFNS Policy Engine | Transaction Authorization Policy (TAP) |
| Mobile approval | No | Yes (Fireblocks app) |
| Programmatic approval via DALP | Full API resolution | Console / Co-Signer only |
| API model | REST API | REST API |
| Wallet model | Flat wallet list | Vault account hierarchy |
| Multi-chain token registration | — | EVM, Stellar, Algorand, TRON, and more |

Both providers use MPC signing so that no single private key ever exists in one place. The fundamental operational difference is: **DFNS allows fully programmatic approval workflows through its API**, while **Fireblocks requires approvals through its own console or mobile app/Co-Signer appliance**.

### 6.3 DFNS Integration

DFNS provides delegated MPC custody where key shards distribute across DFNS infrastructure. Configuration requires:

| Setting | Description |
|---------|-------------|
| API URL | DFNS service endpoint |
| Organization ID | Tenant identifier |
| Auth token | Service account authentication |
| Credential ID | Identifies the signing credential |
| EC private key | Elliptic curve key for API authentication |

**Policy Enforcement**: The DFNS policy engine evaluates transaction rules before MPC signing proceeds — auto-sign rules, amount thresholds, IP/time restrictions, and multi-party approval requirements. When a policy requires approval, DALP surfaces the pending approval through its API — operators can review, approve, or reject without leaving the DALP interface.

**Audit Integration**: DFNS audit logs synchronize with DALP audit records, providing unified compliance reporting across both the platform and custody layers.

### 6.4 Fireblocks Integration

Fireblocks provides institutional MPC-CMP custody through vault accounts. Key material distributes across Fireblocks infrastructure and the customer's co-signer node, with continuous key refresh eliminating static key shares.

| Setting | Description |
|---------|-------------|
| API key | From the Fireblocks Console |
| RSA private key | PEM format, for API authentication |
| API endpoint | Production or sandbox URL (auto-detected) |

**Vault-Based Wallet Model**: Fireblocks organizes keys into vault accounts, each containing one or more asset wallets. DALP supports creating vault accounts, activating asset wallets, and querying vaults across the organization.

**Transaction Authorization Policy (TAP)**: Enforces transaction amount thresholds, whitelisted destination addresses, velocity limits, and multi-approver requirements. When a TAP rule blocks a transaction, DALP surfaces the pending approval — however, unlike DFNS, Fireblocks does not support programmatic approval resolution through external APIs.

### 6.5 Unified Signer Abstraction

The unified signer interface abstracts over all custody backends. Switching between DFNS and Fireblocks requires only configuration changes — no workflow modifications, no code changes, no API contract differences for consumers.

**Normalized Interface (`ExternalSigner`):**
- Wallet CRUD (create, list, manage)
- viem wallet-client creation
- Transaction prepare/sign
- Message signing (EIP-191, EIP-712)
- Optional approval APIs (list pending, resolve)
- Optional provider-native broadcast
- Health monitoring (`SignerLoader.healthCheck()`)

**Lazy-Loaded, Cached Initialization**: Signer configuration is loaded once and cached behind a shared `initPromise` to prevent concurrent bootstrap races. Provider factory loads local signers from `@core/secrets`; non-local providers are created through the integration-package factory.

### 6.6 Transaction Processing

DALP's **Transaction Processor** is a Restate virtual-object service keyed by `{fromAddress}.{chainId}`, providing partition-level exclusive locking during submission and broadcast:

- **`submit` (exclusive)**: Contract validation, ERC-8021 attribution, provider-native vs. local broadcast branching
- **`checkConfirmation` (shared)**: Transaction receipt polling
- **`processNext` (exclusive)**: Queue drain for pending transactions

**Nonce Management** — the Durable Nonce Coordination Service serializes nonce allocation per `{address}.{chainId}`:
- Cold state initialized from on-chain `getTransactionCount` with `pending` block tag
- Atomic consume-and-broadcast for local signer flows
- Self-healing for `nonce too low` failures: re-reads on-chain nonce, advances to max of current +1 or on-chain nonce, retries up to 3 times
- Operator repair surfaces: `syncWithOnchain`, `resetNonce`, `forceSetNonce`, `getForceHistory`

**Gas Management**: Gas estimation queries the target chain with actual transaction parameters. Configurable strategies support fast (priority fee for quick inclusion), standard (base fee plus moderate priority), and economy (minimum viable fee) modes. Stuck transactions trigger resolution workflows with increased gas prices while maintaining nonce consistency.

### 6.7 Account Abstraction (ERC-4337)

The Transaction Signer supports ERC-4337 account abstraction for enhanced transaction patterns:

- **User operations**: Transactions submit through bundler infrastructure rather than direct RPC calls
- **Paymaster integration**: Gas fees pay from designated accounts rather than transaction signers
- **Batched execution**: Multiple operations execute in single transactions for gas efficiency
- **Signature aggregation**: Compatible wallets aggregate signatures for gas reduction

### 6.8 Custody Vault Operations

DALP provides **custody vault provisioning** as a managed addon:
- Deterministic CREATE2 address prediction and deployment
- Contract identity binding (OnchainID)
- Role-gated factory registration with duplicate suppression
- End-to-end subgraph lifecycle coverage: creation, balance tracking, signer weight management, requirement configuration, approval tracking, execution monitoring
- Directory-based implementation resolution for version management

---

## 7. KYC/AML Integration

### 7.1 Identity Verification Architecture

DALP does not perform identity verification directly. It provides the **identity infrastructure** that KYC/AML verification results flow into. This is an architectural choice: institutions choose their own KYC/AML providers (Onfido, Jumio, Sumsub, or similar) and DALP provides the on-chain identity layer that makes verification results enforceable at the protocol level.

The integration flow:

1. **External KYC/AML provider** verifies the investor off-chain
2. **Verification result** is translated into DALP claim topics (`keccak256("KYC")`, etc.)
3. **Trusted issuer** writes signed claims to the investor's OnchainID contract (ERC-734/735)
4. **Trusted Issuers Registry** validates the issuer is authorized for the relevant claim topics
5. **Compliance modules** read those claims at every transfer to make eligibility decisions
6. **Claims have expiry** — expired claims are rejected at transfer time; the system fails closed

### 7.2 OnchainID Protocol

Built on ERC-734 (key management) and ERC-735 (claim management), each identity contract supports four key types:

| Purpose | Name | Controls |
|---------|------|----------|
| 1 | Management | Add/remove other keys |
| 2 | Action | Execute on behalf of identity |
| 3 | Claim | Sign and approve claims |
| 4 | Encryption | Decrypt data sent to identity |

**Claim Structure:**

| Field | Description |
|-------|-------------|
| Topic | What the claim certifies (`keccak256("KYC")`) |
| Issuer | Trusted authority address |
| Signature | Cryptographic proof from issuer |
| Data | Verification results (arbitrary bytes) |
| URI | Pointer to off-chain proof |

### 7.3 KYC Profile Lifecycle

DALP maintains a full KYC profile lifecycle with version management:

| State | Description |
|-------|-------------|
| `draft` | Initial state, user submitting information |
| `under_review` | Submitted for operator review |
| `approved` | Verified, claims can be issued (content hash recorded) |
| `rejected` | Rejected with mandatory reason (min 10 chars) |
| `update_required` | Requires user action on specific fields with optional deadline |

**KYC Content Hash Verification**: When issuing a `knowYourCustomer` claim, DALP validates that the target identity exists and is resolved, an approved KYC profile exists with a non-null `contentHash`, and the submitted claim value exactly matches the approved content hash. This ensures KYC claims cannot be issued against stale or unapproved verification data.

### 7.4 Identity Registration via API

Users must be registered in the identity registry before they can participate in token operations. The API supports programmatic registration:

```bash
curl -X PUT "https://your-platform.example.com/api/system/identity" \
  -H "X-Api-Key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "wallet": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    "country": "BE",
    "walletVerification": {
      "secretVerificationCode": "YOUR_PINCODE"
    }
  }'
```

Identity states progress from **Pending Registration** (has identity but not in registry — cannot receive assets) to **Registered** (in registry, awaiting verification) to **Verified** (has required verifications — can receive assets based on compliance rules).

### 7.5 Compliance Engine Integration

The compliance engine orchestrates transfer validation through modular rule contracts. Each token has its own `SMARTCompliance` contract that queries all configured modules during `canTransfer` checks:

| Module | Function |
|--------|----------|
| **Country Restrictions** | Allow/block lists per jurisdiction |
| **Identity Verification** | Logical claim expressions (AND/OR combinations) |
| **Supply Limits** | Lifetime and period caps |
| **Investor Count** | Per-country tracking with cross-token counting |
| **Transfer Approval** | Pre-authorization workflows |
| **Time Lock** | Holding period enforcement |

Modules are global singletons — each token configures its own parameters against the shared module contracts. A single module veto blocks the entire transfer (fail-fast design).

---

## 8. Payment Rails and ISO 20022

### 8.1 Payment Connectivity Model

DALP supports integration with institutional payment infrastructure through its API layer and settlement capabilities. The platform's integration architecture supports **ISO 20022** message standards for connectivity with SWIFT, SEPA, and RTGS payment networks, enabling tokenized settlement workflows to interface with traditional payment clearing systems.

### 8.2 Exchange Rate Management

DALP provides comprehensive exchange rate management:

- Rates synchronized from external providers (currently `open.er-api.com`)
- Historical rate storage in `fx_rates` table, latest rates in `fx_rates_latest` table
- Manual operator overrides supported (`provider: "manual"`) for institutional pricing requirements
- Full CRUD API surface: read, list, history, update, delete, sync
- Cache invalidation after mutation/sync operations (namespace: `exchange-rates`)
- Multi-currency asset valuation through cross-referenced exchange rates

### 8.3 Atomic Settlement Integration

DALP's XvP (Exchange versus Payment) settlement system provides the bridge between tokenized assets and payment instruments:

- **Local settlement**: Same-chain atomic execution where both legs complete or revert together
- **Cross-chain settlement**: HTLC (Hash Time-Locked Contract) pattern for settlements spanning multiple chains, with hashlock verification and cancellation vote logic
- **Multi-party**: Supports more than two counterparties in a single settlement
- **Terminal states**: `executed`, `cancelled`, or `expired-withdrawn` — all deterministic and auditable, enforced by `onlyOpen` contract guards
- **Refund protection**: 30-day `REFUND_GRACE_PERIOD` protects investor refund pools during failed sale scenarios

Settlement integrates with payment rails through the token transfer layer — payment tokens (stablecoins, tokenized deposits) serve as the cash leg in DvP/XvP transactions.

### 8.4 Per-Currency Claim Patterns

Token sale refunds use a per-currency pull pattern: `claimRefund(address currency)` accepts a single payment currency rather than iterating all currencies in one transaction. This design ensures a blacklisted stablecoin (e.g., USDC or USDT) cannot weaponize a single investor's refund to lock all others — a critical safety property for multi-currency settlement operations.

---

## 9. Oracle and Data Feed Integration

### 9.1 Feeds System Architecture

DALP provides a unified data feed integration layer through the **FeedsDirectory** — a central on-chain registry that separates discovery (which feed serves a given subject + topic) from delivery (individual feed contracts). Consumers never hard-code feed addresses.

**Feed Registration Fields:**

| Field | Description |
|-------|-------------|
| Subject | Token address or global subject (address zero) for economy-wide data |
| Topic | Data type the feed provides (base price, FX rate) |
| Feed contract | Address applications query for data |
| Feed kind | Scalar (numeric) or bytes (structured) |
| Schema hash | Pins the expected data format for consistency |

### 9.2 Supported Feed Types

**Issuer-Signed Scalar Feed**: A factory-deployed capability where the asset issuer cryptographically signs and publishes price data. Supports history modes (latest-only, bounded, full), drift allowance, positive-value requirement, and signature verification. Deployed through factory pattern — one instance per asset or subject.

**Chainlink Aggregator Adapter**: A wrapper contract that presents any DALP feed through the `AggregatorV3Interface` — the de facto standard consumed by DeFi protocols, lending platforms, and external analytics tools. The adapter address is permanent and survives feed replacement in the directory, resolving the current feed dynamically on every call.

### 9.3 Feed Consumers

| Consumer | Purpose | Failure Impact |
|----------|---------|----------------|
| Compliance modules | Limit checks and valuation requirements | Transfer blocked if feed stale or missing |
| Yield / distribution | Distribution amounts based on current prices | Distribution delayed or calculated on stale values |
| Asset Console | Display portfolio value in preferred currency | UI shows outdated valuations |
| Execution Engine | Feed data in multi-step workflows | Workflow paused pending fresh data |
| External DeFi protocols | Consume via Chainlink-compatible adapter | Integration returns stale round data |

### 9.4 Feed Trust Model

| Action | Who Can Do It | Scope |
|--------|---------------|-------|
| Register / replace / remove feed | Feeds Manager role (system-level) | Any subject, including global feeds |
| Create feed + adapter | GOVERNANCE role holder on a specific token | That token only |
| Read feed data | Any contract or off-chain caller | Unrestricted |

Feed registration is a privileged operation — unauthorized changes to pricing data could affect compliance decisions and valuations. Schema hash pinning ensures consumers always know the expected data format; format changes require explicit feed replacement.

### 9.5 Feed Operations API

Feed v2 mutations declare async queue semantics:
- `register-external`, `replace`, `remove`, `issuer-signed/create`, and `adapters/create` support `Prefer: respond-async` with HTTP 202 and status URL polling
- Feed submission (`submit`) performs identity checks at the HTTP layer, delegates EIP-712 signing to Restate feed service, returns machine-readable output (transaction hash, feed address, value, nonce)
- Feed write failures are transported as structured DALP contract errors (e.g., `BytesFeedsNotSupported()`)

---

## 10. Secrets Management

### 10.1 Provider-Abstracted Secrets

DALP implements unified secrets management with multiple backend support:

| Backend | Use Case | Details |
|---------|----------|---------|
| **Encrypted Database** | Default | PostgreSQL-backed encrypted secrets table with async loader |
| **CyberArk Conjur** | Enterprise/HSM | Available across all DALP Helm subcharts |
| **Environment Variables** | Simple deployments | Standard env-var-based secret resolution |

Wallet secrets are consolidated into the DALP database rather than distributed across services, providing a single point of secret lifecycle management.

---

## 11. ERP and Back-Office Integration Patterns

### 11.1 Integration Architecture

DALP enables ERP and back-office integration through complementary patterns:

**API-First Integration**: Every DALP operation is accessible through the REST API, enabling:
- Point-to-point API calls from ERP/core banking systems
- Middleware/ESB integration via standard REST endpoints
- Batch processing through CLI scripting (301 typed commands)
- SDK-based custom integration applications

**Data Export for Reporting**: PostgreSQL analytics views provide direct database access for BI tools. 18 analytics views cover identity, compliance, addons, and cross-cutting metrics. Direct SQL access enables standard ETL pipelines. CSV export is available through the dApp data-table component.

**Event-Driven Integration**: Blockchain events indexed in real-time (<5s latency), SSE streaming for operational dashboards, transaction lifecycle events for reconciliation systems, compliance events for regulatory reporting pipelines.

**External Token Registration**: DALP supports registering and tracking tokens from external systems through the `externalToken` API. Registration is tenant-scoped, role-gated, and creates full read-model projections — making external tokens first-class DALP citizens for portfolio and compliance tracking.

### 11.2 Multi-Environment Deployment

| Model | Description |
|-------|-------------|
| **Managed SaaS** | SettleMint-hosted, fully managed |
| **Dedicated Cloud** | Customer's cloud account, SettleMint-managed |
| **On-Premises** | Helm/Kubernetes deployment in customer data center |
| **Hybrid** | Combination aligned with data residency requirements |

All deployment models expose the same API surface, ensuring integration code is portable across environments.

### 11.3 Observability Integration

DALP ships a full observability stack for enterprise monitoring integration:

**Stack Components:**
- **Grafana**: Pre-built dashboards (21 dashboard JSONs shipped as code)
- **VictoriaMetrics**: Time-series metrics (request rates, latency, error rates)
- **Loki**: Structured logs with secret filtering
- **Tempo**: Distributed tracing with OpenTelemetry
- **Alloy**: Kubernetes node/pod discovery, Prometheus remote write, OTLP receivers

**DALP-Specific Telemetry:**
- Transaction-phase traces: `tx.submit` → `tx.sign` → `tx.broadcast` → `tx.confirm`
- Indexer metrics: `indexer.blocks_processed`, `indexer.block_lag`, `indexer.events_processed`, `indexer.reorg.detected`
- Privacy controls: API metrics redact cookies, authorization headers, API-key tails, sensitive body keys, and URL query parameters before persistence

**Enterprise Integration Points:**
- OTLP receivers on ports 4317 (gRPC) and 4318 (HTTP) for external trace/metric ingestion
- Cross-navigation between traces, logs, and metrics for incident triage
- OpenShift Route support for enterprise Kubernetes platforms
- SSO/IAM integration for dashboard access
- SIEM integration for security event forwarding

---

## 12. Meta-Transactions and Gasless Operations

The API supports meta-transactions through the underlying ERC-2771 integration. Callers can submit signed transaction payloads without holding native tokens for gas. A configured relayer service sponsors transaction costs while the user's signature authorizes the operation.

This enables:
- **Simplified user experience** — investors interact with tokens without managing cryptocurrency for fees
- **Sponsored operations** — issuers cover transaction costs for their investors
- **Gasless workflows** — automated systems execute transactions without native token management

Meta-transactions work transparently through the API — callers submit signed payloads, and the platform handles relay coordination.

---

## 13. Enterprise Financial Messaging

The API supports integration with enterprise financial messaging systems for institutions requiring connectivity to existing infrastructure:

- **Standards-based messaging** — structured message formats for corporate actions, settlement instructions, and asset servicing aligned with ISO 20022
- **Automated reconciliation** — outbound notifications for completed transactions enable downstream system updates
- **Audit trail synchronization** — transaction events can trigger messages to compliance and reporting systems

These integrations connect blockchain-native operations to traditional financial infrastructure, enabling hybrid workflows where DALP handles tokenization while existing systems manage related processes like clearing, settlement confirmation, and regulatory reporting.

---

## 14. Integration Security Model

### 14.1 Defense-in-Depth

DALP enforces security at every platform layer. No single control failure grants unauthorized access to digital assets:

| Layer | Control | Enforced By |
|-------|---------|-------------|
| Identity | Authentication (session, API key, SSO) | Asset Console, Unified API |
| Access | Role-based and resource-level authorization | Unified API middleware |
| Transaction | Wallet verification (PIN, TOTP, backup codes) | Unified API before blockchain writes |
| On-chain | Identity claims and compliance modules | SMART Protocol (ERC-3643) |
| Custody | Provider policy evaluation and MPC signing | Key Guardian, custody providers |

Each layer operates independently. A compromised session token is blocked by wallet verification. A bypassed API authorization check is blocked by on-chain compliance. Custody provider policies provide the final gate before any transaction reaches the blockchain.

### 14.2 Two-Layer Policy Model

Every transaction passes through two independent policy layers:

**Layer 1 — On-chain (DALP Compliance Modules)**: Identity/KYC claims, country restrictions, supply and issuance caps, holding period locks, investor count caps. Enforced by EVM execution — immutable and auditable in transaction trace.

**Layer 2 — Custodian (DFNS / Fireblocks)**: Transaction amount thresholds, multi-party approval workflows, rolling spend limits, destination allowlists. Enforced by custody provider policy engine — visible in provider dashboard and audit logs.

Layer 1 is authoritative for regulatory enforcement. Layer 2 protects signing infrastructure. Both must pass in sequence — Layer 1 failure prevents Layer 2 from being reached.
