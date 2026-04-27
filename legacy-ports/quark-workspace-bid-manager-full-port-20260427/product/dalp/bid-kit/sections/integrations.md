# DALP Integration Capabilities

## Executive Summary

DALP is built as an integration platform, not as an isolated application stack. The codebase shows a clear pattern: external dependencies are abstracted behind internal service boundaries, the primary application surface is exposed through versioned HTTP APIs, blockchain data is normalized into queryable infrastructure through dedicated indexing layers, and custody, feed, and identity workflows are routed through platform-controlled middleware rather than being embedded directly in business logic.

In practical terms, DALP gives implementation teams three integration planes:

1. **Transactional integration plane** via versioned REST/oRPC APIs under `/api/v1`, `/api/v2`, and `/api/rpc`
2. **Data access integration plane** via GraphQL-backed subgraph infrastructure and the PostgreSQL-based Indexer V2
3. **External service abstraction plane** for custody, feeds/oracles, blockchain network connectivity, and identity/compliance claims

The strongest code-backed differentiators are:

- a **provider-agnostic signer abstraction** supporting local signing, DFNS, and Fireblocks
- an **API-first server** with explicit versioning, OpenAPI generation, idempotency headers, async transaction handling, and API-key security
- a **durable event/indexing architecture** built on Restate and PostgreSQL, with subgraph support still present in parallel
- a **claim-based identity and trusted issuer model** that integrates external KYC/KYB outcomes into on-chain enforcement, rather than hard-coding a specific KYC vendor
- a **feed abstraction layer** supporting issuer-signed feeds and Chainlink-compatible adapters for external consumption

Just as important, the current codebase also puts boundaries around what should *not* be overstated in proposals:

- DALP **does integrate with custody providers**, but it is **not itself a custodian**
- DALP **enforces identity claims from external verification sources**, but the codebase does **not** currently show a native adapter for a specific KYC/AML vendor such as Sumsub, Onfido, Trulioo, Persona, or Jumio
- DALP documentation positions the platform as **ISO 20022 integration-ready**, but I did **not** find native SWIFT/SEPA/RTGS message adapter code in the current repository; that should therefore be described as an integration target or reference architecture capability, not as shipped protocol-native functionality
- DALP narrative and executive docs reference **event webhooks**, but I did **not** find a generic DALP webhook subscription subsystem in the application routes; webhook-related code found in the repository is primarily tied to DFNS integration and documentation references to outbound contracts

That distinction matters in bid work. DALP is strongest when positioned as the lifecycle and orchestration layer between enterprise systems, custody, identity, and blockchain networks — not as a monolithic replacement for those systems.

---

## 1. Integration Architecture Overview

### 1.1 Architectural posture

The repository’s integration architecture is explicit in the documentation and corroborated by implementation structure. The architecture documentation states that DALP “isolates external dependencies behind internal abstraction boundaries,” naming:

- **Key Guardian** for custody abstraction
- **Chain Gateway** for blockchain network abstraction
- **Feeds system** for market data abstraction

**Code and documentation evidence**

- `~/dalp/kit/dapp/content/docs/architecture/integrations/index.mdx`
- `~/dalp/kit/dapp/content/docs/architecture/components/infrastructure/key-guardian.mdx`
- `~/dalp/kit/dapp/content/docs/architecture/components/infrastructure/chain-gateway.mdx`
- `~/dalp/kit/dapp/content/docs/architecture/components/infrastructure/feeds-system.mdx`
- `product/dalp/capability-mapping/dapi-middleware-architecture.md`

This is not just documentation language. The implementation mirrors it:

- signing providers are created through a common factory in `packages/services/signer/src/providers/factory.ts`
- external signers conform to a shared `ExternalSigner` interface in `packages/services/signer/src/types.ts`
- DAPI routes consistently layer permissions, wallet verification, transaction queueing, and optional Restate/database middleware before executing domain actions

That gives DALP a classic enterprise integration property: **external systems can change without requiring core business workflows to be rewritten**.

### 1.2 API-first design

The DALP HTTP server is organized around explicit route families:

- `/health`
- `/api/object-storage/presigned`
- `/api/auth/*`
- `/api/theme.css`
- `/api/rpc/*`
- `/api/v2/*`
- `/api/v1/*`
- backward-compatible non-versioned `/api/*` routing to v1

**Code evidence**

- `~/dalp/kit/dapi/src/http-server.ts`

The server behavior is important for proposals because it shows production integration discipline:

- health and routing are centralized in one server entrypoint
- v1 and v2 coexist, enabling controlled interface evolution
- non-versioned `/api/*` is explicitly redirected or routed for backward compatibility
- API responses are finalized with metadata and transaction context
- monitoring routes are handled specially to avoid self-generated feedback loops in telemetry

This is a real API platform, not a thin wrapper around contract calls.

### 1.3 Middleware-driven orchestration

DALP’s middleware model is one of the most proposal-relevant parts of the architecture because it shows how external integration controls are enforced uniformly.

Representative route handlers show middleware chains such as:

- `blockchainPermissionsMiddleware(...)`
- `walletVerificationMiddleware()`
- `transactionQueueMiddleware`
- `databaseMiddleware`
- `trustedIssuerMiddleware(...)`
- `restateMiddleware`

**Code evidence**

- `packages/dalp/dapi/routes/system/src/trusted-issuers/routes/trusted-issuer.v2.create.ts`
- `packages/dalp/dapi/routes/system/src/identity/claim/routes/claim.v2.issue.ts`
- `packages/dalp/dapi/routes/system/src/identity/routes/identity.v2.create.ts`
- `packages/dalp/dapi/routes/feeds/src/routes/feeds.v1.register-external.ts`
- `packages/dalp/dapi/routes/feeds/src/routes/adapters.v1.create.ts`

This matters because DALP does not rely on downstream integrators to “remember” security, policy, and queueing concerns. Those are embedded in the route execution path.

### 1.4 Integration Architecture Diagram (text description)

**Textual architecture diagram for bid documents**

1. **Enterprise systems layer**: core banking, custody, identity verification, risk/reporting, treasury, payment operations, and external analytics tools interact with DALP through APIs and query endpoints.
2. **DALP API and middleware layer**: DAPI receives authenticated requests via `/api/v1`, `/api/v2`, and `/api/rpc`; route middleware enforces API key/session auth, organization context, role/permission checks, wallet verification, trusted issuer validation, and async queue behavior.
3. **Workflow and execution layer**: DALP routes business operations into Restate-backed durable workflows, contract runtime services, and transaction processing services.
4. **External abstraction services**:
   - **Key Guardian / signer services** connect to DFNS, Fireblocks, or local key storage
   - **Chain Gateway** connects to public or private EVM RPC infrastructure
   - **Feeds system** resolves price/FX data from issuer-signed feeds or Chainlink-compatible adapters
5. **Blockchain and data layer**:
   - smart contracts on supported EVM networks execute lifecycle logic
   - **Subgraph/The Graph** and **Indexer V2** transform on-chain events into queryable data models
   - PostgreSQL stores indexer state, sync state, views, and event records
6. **Consumer query layer**: DALP applications, external tools, and integration services consume normalized data through REST/oRPC, GraphQL/subgraph endpoints, and indexed relational views.

---

## 2. REST and RPC API Surface

## 2.1 Versioned API structure

DALP’s API surface is versioned and intentionally split between:

- **REST/OpenAPI-style endpoints** under `/api/v1` and `/api/v2`
- **RPC endpoints** under `/api/rpc`
- **Authentication endpoints** under `/api/auth`

**Code evidence**

- `~/dalp/kit/dapi/src/http-server.ts`
- `~/dalp/packages/dalp/dapi/server/src/api-handler.ts`
- `~/dalp/docs/adr/006-orpc-for-type-safe-api.md`

The ADR on API design is particularly useful in proposals because it directly explains why DALP chose oRPC plus OpenAPI generation instead of GraphQL for workflow-heavy mutations. The repository explicitly rejects GraphQL as the primary mutation interface because DALP operations are workflow-oriented and often span multiple transactions.

### 2.2 OpenAPI generation and documentation

DALP’s API handler generates an OpenAPI description from the router tree and enriches the spec with:

- security schemes
- idempotency header definitions
- `Prefer` and `X-Transaction-Speed` semantics on mutation operations
- response headers such as `X-Transaction-Hash`, `X-Retry-After`, `Preference-Applied`, `Location`, and `X-Powered-By`
- `x-contract-errors` extensions based on router metadata

**Code evidence**

- `~/dalp/packages/dalp/dapi/server/src/api-handler.ts`

The code shows a professional developer-consumption pattern:

- the shared security scheme is `apiKey` in header `X-Api-Key`
- mutation methods automatically receive `Idempotency-Key` support
- asynchronous processing semantics are formalized via `Prefer: respond-async`
- accepted async responses can return `202` and a polling location

This is bid-grade evidence of a mature API product surface.

### 2.3 Authentication and API-key model

The DALP authentication package uses Better Auth and enables:

- email/password
- passkeys
- API keys
- device authorization
- two-factor authentication
- wallet-linked controls
- organization/multi-tenant support

**Code evidence**

- `~/dalp/packages/dalp/auth/src/index.ts`

The API-key implementation is concrete and proposal-worthy:

- header: `x-api-key`
- default key prefix: `sm_dalp_`
- metadata enabled
- API keys can establish sessions (`enableSessionForAPIKeys: true`)
- default rate limit: `10,000` requests per `60` seconds
- default permissions are derived from the user’s role and active organization membership

Relevant code excerpts in `packages/dalp/auth/src/index.ts` show:

- `apiKeyHeaders: ["x-api-key"]`
- `defaultPrefix: "sm_dalp_"`
- `rateLimit: { enabled: true, timeWindow: 1000 * 60, maxRequests: 10_000 }`

The SDK also enforces the security headers from the client side:

- `x-api-key`
- optional `x-organization-id`
- optional `Idempotency-Key`

**Code evidence**

- `~/dalp/kit/sdk/src/client.ts`
- `~/dalp/kit/sdk/src/types.ts`

### 2.4 Organization scoping and multi-tenant access

DALP’s API surface is not just authenticated; it is tenant-aware.

The SDK sends `x-organization-id` when provided, and the auth layer derives default API-key permissions from the active organization membership, distinguishing admin, owner, and member roles.

**Code evidence**

- `~/dalp/kit/sdk/src/client.ts`
- `~/dalp/packages/dalp/auth/src/index.ts`

That is useful for institutions implementing DALP across multiple legal entities, desks, or operational environments.

### 2.5 Async transaction handling and idempotency

DALP’s API is designed for blockchain-backed operations where completion may be synchronous or queued.

The codebase supports:

- `Idempotency-Key` on mutation requests
- `Prefer: respond-async`
- `X-Transaction-Hash` response headers
- `Location` for status polling on accepted requests
- `X-Retry-After` in responses

**Code evidence**

- `~/dalp/packages/dalp/dapi/server/src/api-handler.ts`
- `~/dalp/kit/dapi/src/http-server.ts`
- `~/dalp/kit/dapp/content/docs/developer-guides/api-integration/api-reference.mdx`
- `~/dalp/kit/dapp/content/docs/developer-guides/api-integration/error-handling.mdx`
- `~/dalp/kit/dapp/content/docs/developer-guides/operations/transaction-tracking.mdx`

This is precisely the sort of detail procurement teams look for when assessing whether a blockchain platform is suitable for enterprise orchestration rather than just contract deployment.

### 2.6 Representative API operations from the codebase

The route tree shows DALP exposing substantial lifecycle operations, including but not limited to:

- system creation and resume
- identity creation, registration, update, and deletion
- claim issuance and revocation
- trusted issuer creation, update, and deletion
- token factory and addon factory creation
- external token registration
- token sale operations
- feed registration and adapter creation

**Code evidence**

Representative route files include:

- `packages/dalp/dapi/routes/system/src/routes/system.v2.create.ts`
- `packages/dalp/dapi/routes/system/src/routes/system.v2.resume.ts`
- `packages/dalp/dapi/routes/system/src/identity/routes/identity.v2.create.ts`
- `packages/dalp/dapi/routes/system/src/identity/claim/routes/claim.v2.issue.ts`
- `packages/dalp/dapi/routes/system/src/trusted-issuers/routes/trusted-issuer.v2.create.ts`
- `packages/dalp/dapi/routes/external-token/src/routes/external-token.v2.register.ts`
- `packages/dalp/dapi/routes/feeds/src/routes/feeds.v1.register-external.ts`
- `packages/dalp/dapi/routes/feeds/src/routes/adapters.v1.create.ts`

For proposals, the correct framing is that DALP exposes **operational lifecycle endpoints**, not only CRUD-style data services.

---

## 3. GraphQL, Subgraphs, and Query Infrastructure

## 3.1 Current state: GraphQL exists, but not as the primary transactional API

The repository is very clear on this point. DALP does not position GraphQL as the primary workflow API. The ADR explicitly rejects GraphQL for the main mutation layer because DALP’s operations are workflow-heavy and span multiple steps/transactions.

**Code evidence**

- `~/dalp/docs/adr/006-orpc-for-type-safe-api.md`

That said, GraphQL is present and important in the data/query plane.

### 3.2 The Graph / subgraph infrastructure

DALP maintains a full subgraph package under `kit/subgraph`, including:

- schema files
- deployment tooling
- GraphQL code generation
- typed GraphQL tests
- query endpoint tooling

**Code evidence**

- `~/dalp/kit/subgraph/subgraph.yaml`
- `~/dalp/kit/subgraph/codegen.schema.yml`
- `~/dalp/kit/subgraph/tools/graph-deploy.ts`
- `~/dalp/kit/subgraph/test/...`
- `~/dalp/packages/integrations/the-graph/src/client.ts`

The deployment tooling logs the query endpoint in the form:

- `${queryNode}/subgraphs/name/${graphName}`

and explicitly notes that the GraphQL endpoint is queried via POST.

The Helm chart documentation also references a default GraphQL readiness URL of:

- `http://dalp-graph-node-query:8000/subgraphs/name/kit`

**Code evidence**

- `~/dalp/kit/charts/dalp/README.md`

### 3.3 GraphQL client abstraction

DALP includes an internal GraphQL client wrapper for The Graph that reads an `indexer.endpoint` URL from configuration and wraps the client with pagination support.

**Code evidence**

- `~/dalp/packages/integrations/the-graph/src/client.ts`

This shows that GraphQL is a supported internal and integration-facing query mechanism for indexed blockchain data.

### 3.4 Hasura status

I found references to Hasura in operational and packaging material, including AWS Marketplace automation descriptions and Helm chart helper references. However, the strongest code-backed query path in the current repository is The Graph/subgraph plus the PostgreSQL-backed Indexer V2.

**Evidence found**

- `kit/charts/tools/aws-marketplace-automation.ts` mentions “Hasura GraphQL engine”
- `packages/services/indexer/README.md` references a PostgreSQL database named `hasura`

**Important bid-safe wording:**

- It is valid to say DALP’s deployment architecture includes GraphQL-oriented query infrastructure and packaging references to Hasura.
- It would be too strong to claim, from the current evidence alone, a fully documented, current, first-class Hasura application surface equivalent to the DAPI surface.

### 3.5 Bid positioning for GraphQL

The right proposal positioning is:

- **REST/oRPC** for operational, authenticated, workflow-driven lifecycle actions
- **GraphQL/subgraph** for indexed blockchain data retrieval and flexible data access patterns
- **PostgreSQL Indexer V2** as the strategic direction for richer, DALP-native indexed data services

That is consistent with both the repository and the DALP narrative.

---

## 4. Webhooks and Event Notification Model

## 4.1 What the documentation says

The DALP narrative and executive docs refer to:

- “standard APIs and webhooks”
- “event webhooks”
- outbound integration contracts including “webhook payloads, callback URLs, status formats”

**Documentation evidence**

- `notion/dalp-narrative.md`
- `~/dalp/kit/dapp/content/docs/architecture/integrations/index.mdx`
- `~/dalp/kit/dapp/content/docs/executive-overview/dalp-solution.mdx`
- `~/dalp/kit/dapp/content/docs/executive-overview/dalp-overview.mdx`

### 4.2 What the codebase currently proves

I did **not** find a generic DALP webhook subscription or webhook management subsystem under the DAPI routes or SDK. A targeted search across `packages/dalp`, `packages/services`, `kit/dapi`, and architecture docs did not surface generic webhook routes or subscriber management.

What I **did** find is:

1. **DFNS webhook management support** in the DFNS integration package, including methods such as:
   - `deleteWebhook`
   - `pingWebhook`
   - `listWebhookEvents`

   **Code evidence**
   - `~/dalp/packages/integrations/dfns/src/index.ts`

2. **Webhook secret validation references** in validation utilities

   **Code evidence**
   - `~/dalp/packages/core/validation/src/secret-code.ts`

3. **Event-driven alternatives** that are strongly implemented and likely serve many notification use cases:
   - async API responses with status polling
   - chain indexer events and event tables
   - GraphQL/subgraph queries
   - indexed relational views over blockchain events

### 4.3 Bid-safe conclusion on webhooks

For proposals, the defensible wording is:

- DALP is architected to support outbound integration contracts, and the platform narrative positions event webhooks as part of the integration model.
- In the current repository, the most concrete webhook-related implementation is in **custody-provider integration (DFNS)** rather than a generic DALP-wide webhook subscription service.
- For event-driven external notification, the codebase today is most strongly evidenced by **queued API workflows, transaction status endpoints, and indexed event/query infrastructure**.

Do **not** present DALP as already having a fully proven, generic enterprise webhook bus unless that is verified elsewhere outside this repository.

---

## 5. Blockchain Data Query Infrastructure: Subgraphs and Indexer V2

## 5.1 Strategic architecture

DALP currently runs with two query/indexing patterns in parallel:

1. **The Graph / subgraph infrastructure** for GraphQL-based indexed queries
2. **Indexer V2**, a DALP-native event indexing system built on PostgreSQL, Drizzle ORM, and Restate

This coexistence is explicitly documented in the capability mapping, which states that The Graph is still used in parallel for some legacy query paths while not all subgraph queries have yet been migrated to the new indexer views.

**Evidence**

- `product/dalp/capability-mapping/indexer-v2.md`

### 5.2 Indexer V2 architecture

Indexer V2 is one of the strongest differentiators in the repository.

The architecture document describes the indexer as:

- a blockchain event processing system
- built on **Restate** for durable execution
- using **PostgreSQL** for persistence
- decoding raw logs into typed events
- routing them to domain-specific handlers
- checkpointing progress and supporting replay/recovery semantics

**Code evidence**

- `~/dalp/packages/services/indexer/ARCHITECTURE.md`

Core services include:

- `ChainIndexer`
- `LiveWatcher`
- `GenesisInitializer`
- `ContractRegistry`
- `BlockProcessor`

The architecture also documents:

- journaled replay steps via `ctx.run(...)`
- idempotent processing
- conflict-safe writes (`onConflictDoNothing`, `onConflictDoUpdate`)
- checkpointing and convergence loops

This is exactly the kind of operationally resilient indexing architecture institutional buyers expect.

### 5.3 Genesis discovery and contract registration

The capability mapping records that the indexer bootstraps from the on-chain DALP Directory, discovers registered factories, and then discovers deployed contracts via factory event logs.

**Evidence**

- `product/dalp/capability-mapping/indexer-v2.md`

That matters because DALP does not require each integrated consumer to hard-code all contract addresses. The platform can discover and register the relevant estate from chain state.

### 5.4 Reorg handling and zero-downtime reindexing

The capability mapping also records support for:

- **reorg detection and rollback**
- **zero-downtime reindexing with schema isolation**

**Evidence**

- `product/dalp/capability-mapping/indexer-v2.md`

Those are serious production features. Most “tokenization platforms” never get this far.

### 5.5 Query outputs and analytics

The capability mapping ties Indexer V2 to:

- domain-specific tables
- cross-cutting analytics views
- token statistics views
- subgraph schema parity views
- unified event log via `idxr_events`
- fiat value projections and feed/claim-based price indexing

**Evidence**

- `product/dalp/capability-mapping/indexer-v2.md`

That gives DALP a strong answer to institutional reporting, auditability, and operational query requirements.

---

## 6. Custody Provider Integration Patterns

## 6.1 Provider abstraction model

DALP’s custody integration model is explicitly abstraction-driven. The signer service exposes a shared `ExternalSigner` contract supporting:

- wallet creation/listing/retrieval
- wallet client creation
- transaction preparation
- transaction signing
- message signing
- EIP-712 typed data signing
- optional approval operations
- optional provider-native broadcasting

**Code evidence**

- `~/dalp/packages/services/signer/src/types.ts`

Supported provider types are currently:

- `local`
- `dfns`
- `fireblocks`

**Code evidence**

- `~/dalp/packages/services/signer/src/types.ts`
- `~/dalp/packages/services/signer/src/providers/factory.ts`

### 6.2 Provider selection and configuration

The signer provider factory instantiates providers according to configuration and validates the required credentials:

- **DFNS** requires `authToken`, `credId`, `privateKey`, and `orgId`
- **Fireblocks** requires `apiKey` and `privateKey`
- optional base URLs are supported for both

**Code evidence**

- `~/dalp/packages/services/signer/src/providers/factory.ts`

That supports a classic enterprise deployment pattern: DALP can be deployed into institutions that already have a preferred custody relationship, instead of forcing a custody migration.

### 6.3 DFNS integration

The DFNS signer implementation includes concrete support for:

- wallet creation and listing
- wallet retrieval
- viem wallet client integration
- message signing
- transaction signing
- typed data signing
- external call tracing with OpenTelemetry
- webhook operations (`deleteWebhook`, `pingWebhook`, `listWebhookEvents`)

**Code evidence**

- `~/dalp/packages/integrations/dfns/src/index.ts`

The architecture docs additionally state that DFNS policy enforcement acts as a second control layer after DALP’s own compliance controls, and that pending approvals are surfaced through DALP’s API.

**Documentation evidence**

- `~/dalp/kit/dapp/content/docs/architecture/components/infrastructure/key-guardian.mdx`
- `~/dalp/docs/adr/008-pluggable-custody-provider.md`
- `product/dalp/capability-mapping/custody-settlement.md`

### 6.4 Fireblocks integration

The Fireblocks signer implementation includes concrete support for:

- Fireblocks SDK connectivity
- vault account asset address retrieval
- message signing via Fireblocks web3 provider (`personal_sign`)
- transaction signing
- typed data signing
- rate-limit retry handling
- provider-native wallet/address resolution

**Code evidence**

- `~/dalp/packages/integrations/fireblocks/src/index.ts`

The architecture documentation adds two proposal-relevant distinctions:

- Fireblocks uses a vault → asset hierarchy
- blocked transactions surface via DALP, but approval resolution is not programmatic in the same way as DFNS; approvals must go through the Fireblocks Console or API Co-Signer path

**Documentation evidence**

- `~/dalp/kit/dapp/content/docs/architecture/components/infrastructure/key-guardian.mdx`

### 6.5 Bid-safe custody positioning

The correct proposal language is:

- DALP provides **bring-your-own-custodian orchestration** through pluggable signer backends
- DALP supports **DFNS and Fireblocks** in the current codebase
- DALP handles **wallet operations, signing, approvals, and broadcast orchestration** through a common abstraction layer
- DALP is **not a custodian**; it orchestrates custody workflows across existing custody relationships

That is fully aligned with both the code and the DALP narrative.

---

## 7. Core Banking System Integration Patterns

## 7.1 What is code-backed

The current repository does not expose a named “core banking connector” package for specific banks or core systems. There is no native adapter in the codebase for a particular core banking platform analogous to the DFNS/Fireblocks integrations.

What *is* strongly evidenced is the architectural pattern for core banking integration:

- DALP is API-first
- API keys, org scoping, and workflow controls make it suitable as a system-of-orchestration layer
- asynchronous processing and transaction tracking support long-running operational workflows
- indexed data layers provide query/reporting integration surfaces
- object-storage presigning exists for document/file workflow integration

**Code evidence**

- `~/dalp/kit/dapi/src/http-server.ts` (`/api/object-storage/presigned`, versioned API routing)
- `~/dalp/packages/dalp/dapi/server/src/api-handler.ts`
- `~/dalp/kit/sdk/src/client.ts`
- `product/dalp/capability-mapping/developer-surface.md`
- `notion/dalp-narrative.md`

### 7.2 Practical integration pattern

Based on the implemented surfaces, the core banking integration pattern is:

1. **Inbound orchestration from bank systems into DALP** via authenticated APIs for issuance, onboarding, identity, claims, token servicing, and settlement-related workflows.
2. **Outbound retrieval from DALP into bank systems** via indexed query services, GraphQL/subgraph access, status polling, and data warehouse/reporting reads.
3. **Operational reconciliation** through transaction hashes, event logs, indexed event tables, and durable workflow state.
4. **Document and evidence attachment** through presigned object storage handling where required.

This is the right way to position DALP with banks: as an orchestration layer that sits between bank operations and blockchain execution, rather than as a direct replacement for the core ledger.

### 7.3 Bid wording recommendation

Use language such as:

> DALP integrates with core banking environments through authenticated APIs, durable workflow processing, indexed event/query services, and organization-aware access control. In the current codebase, this pattern is exposed as a configurable API and middleware layer rather than as hard-coded connectors to a single banking vendor.

That is honest and still strong.

---

## 8. KYC/AML and Identity Verification Integration Patterns

## 8.1 Current integration model

The strongest code-backed statement is that DALP implements **claim-based identity orchestration**, not native KYC vendor execution.

The identity/compliance flow includes:

- identity creation and registration routes
- trusted issuer management
- claim issuance and revocation
- topic-based trusted issuer validation via middleware
- on-chain enforcement through identity and compliance modules

**Code evidence**

- `packages/dalp/dapi/routes/system/src/identity/routes/identity.v2.create.ts`
- `packages/dalp/dapi/routes/system/src/identity/claim/routes/claim.v2.issue.ts`
- `packages/dalp/dapi/routes/system/src/trusted-issuers/routes/trusted-issuer.v2.create.ts`
- `product/dalp/capability-mapping/compliance-and-identity.md`

The repository also contains a relevant architectural note in ADR `001-erc3643-over-erc1400.md` referencing coexistence of multiple KYC/AML providers as trusted issuers.

**Evidence**

- `~/dalp/docs/adr/001-erc3643-over-erc1400.md`

### 8.2 What DALP actually does here

DALP’s model is:

- third-party verification occurs outside DALP
- the outcome is represented as identity claims
- trusted issuers are managed as authoritative sources
- middleware validates that claim issuance is being done by an authorized issuer for the relevant topic
- downstream token/compliance logic consumes those claims for ex-ante enforcement

That is consistent with the DALP narrative, which explicitly states DALP relies on third-party KYC/KYB providers for initial verification and uses OnchainID / claim-based identity to enforce eligibility.

**Evidence**

- `notion/dalp-narrative.md`

### 8.3 What was not found

I did **not** find repository-native adapters for specific KYC/AML vendors such as:

- Sumsub
- Onfido
- Persona
- Trulioo
- Jumio
- Veriff

A targeted search did not surface those providers as actual integration packages.

### 8.4 Bid-safe positioning

Use language such as:

> DALP is designed to integrate external KYC/KYB/AML verification results into its claim-based identity model. The current codebase implements trusted issuer administration, claim issuance workflows, and on-chain identity enforcement. This provides the integration pattern for third-party verification providers without coupling DALP to a single vendor.

That is accurate and defensible.

---

## 9. Oracle and Data Feed Integration

## 9.1 Feed architecture

DALP has a real and well-structured feed/oracle integration model.

The Feeds system documentation and route code show:

- a centralized **FeedsDirectory** as the discovery layer
- support for **issuer-signed scalar feeds**
- support for **Chainlink aggregator adapters**
- feed registration and adapter creation routes in the API
- indexed processing of feed events into data infrastructure

**Code and documentation evidence**

- `~/dalp/kit/dapp/content/docs/architecture/components/infrastructure/feeds-system.mdx`
- `~/dalp/kit/dapp/content/docs/architecture/components/capabilities/issuer-signed-scalar-feed.mdx`
- `~/dalp/kit/dapp/content/docs/architecture/flows/feeds-update-flow.mdx`
- `packages/dalp/dapi/routes/feeds/src/routes/feeds.v1.register-external.ts`
- `packages/dalp/dapi/routes/feeds/src/routes/adapters.v1.create.ts`

### 9.2 Supported feed patterns

The code-backed supported patterns are:

1. **Issuer-signed scalar feeds**
   - asset issuer signs and publishes price data
   - supports history modes, drift control, signature verification, and fixed-point numeric values

2. **Chainlink-compatible adapters**
   - wrapper contracts expose `AggregatorV3Interface`
   - adapter address remains stable even if the underlying feed changes
   - external consumers can query standard methods like `latestRoundData`, `decimals`, and `description`

**Documentation evidence**

- `~/dalp/kit/dapp/content/docs/architecture/components/infrastructure/feeds-system.mdx`

### 9.3 Integration significance

This is a particularly valuable enterprise integration feature because it bridges three worlds:

- internal DALP workflows needing valuation and FX data
- on-chain consumers needing standardized feed contracts
- external DeFi or analytics consumers expecting Chainlink-style interfaces

### 9.4 What DALP is not claiming here

The DALP narrative explicitly says DALP integrates with external price feeds but does **not** operate oracle networks itself.

**Evidence**

- `notion/dalp-narrative.md`

That distinction should remain in the bid text.

---

## 10. SWIFT / ISO 20022 Compatibility

## 10.1 What the narrative says

The DALP narrative and executive docs contain strong positioning around payment rail integration and ISO 20022 compatibility, including references to:

- SWIFT
- SEPA
- RTGS
- ISO 20022 message translation / compatibility

**Documentation evidence**

- `notion/dalp-narrative.md`
- `~/dalp/kit/dapp/content/docs/executive-overview/dalp-solution.mdx`
- `~/dalp/kit/dapp/content/docs/executive-overview/compliance-security.mdx`
- `~/dalp/kit/dapp/content/docs/executive-overview/dalp-overview.mdx`

### 10.2 What the codebase currently proves

I did **not** find native application code implementing:

- SWIFT messaging adapters
- ISO 20022 message parsing/serialization libraries specific to payment operations
- SEPA or RTGS connector packages

A targeted code search did not surface those as implemented integration packages.

### 10.3 Bid-safe position

The narrative itself already gives the right qualification: `dalp-overview.mdx` describes SWIFT/SEPA connectivity as a **planned integration path** and ISO 20022 translation as an **architectural design target**.

So the correct proposal wording is:

> DALP is architected to integrate with payment rail environments using ISO 20022-aligned integration patterns, and the platform narrative explicitly positions SWIFT/SEPA/RTGS interoperability as an intended institutional integration capability. The current repository does not evidence a native, shipped SWIFT/ISO 20022 adapter module; this should therefore be represented as integration-ready architecture and deployment pattern support rather than as protocol-native functionality already embedded in the product.

That wording is accurate, credible, and avoids the kind of oversell that creates problems later.

---

## 11. SDK and Developer Tooling

## 11.1 DALP SDK

DALP ships a dedicated SDK package with a typed client factory.

The SDK:

- creates a typed DALP client from the OpenAPI/oRPC contract
- targets `${baseUrl}/api/v2`
- requires `apiKey`
- supports `organizationId`
- supports a shared `Idempotency-Key`
- applies a DALP SDK user agent
- supports request/response validation plugins
- serializes BigInt, BigDecimal, and timestamps appropriately

**Code evidence**

- `~/dalp/kit/sdk/src/client.ts`
- `~/dalp/kit/sdk/src/types.ts`
- `~/dalp/kit/sdk/README.md`

This is real developer tooling, not just docs.

### 11.2 OpenAPI and Scalar docs

The API handler bundles OpenAPI generation and Scalar documentation serving from the live router contract.

**Code evidence**

- `~/dalp/packages/dalp/dapi/server/src/api-handler.ts`

That reduces contract drift and improves partner onboarding.

### 11.3 Subgraph tooling

The subgraph package includes:

- schema generation
- deployment automation
- local deployment flows
- typed test clients
- GraphQL code generation

**Code evidence**

- `~/dalp/kit/subgraph/tools/graph-deploy.ts`
- `~/dalp/kit/subgraph/codegen.schema.yml`
- `~/dalp/kit/subgraph/test/utils/create-thegraph-client.ts`

### 11.4 Deployment tooling and Helm packaging

The repository also includes substantial packaging/tooling for deployment:

- Helm chart configuration for GraphQL readiness checks
- eRPC gateway configuration references
- separated graph/query services

**Evidence**

- `~/dalp/kit/charts/dalp/README.md`
- `~/dalp/kit/charts/dalp/values.yaml`

This supports institutional deployment models where integration environments, lower environments, and air-gapped or private deployments matter.

---

## 12. Key Differentiators

### 12.1 Integration differentiators that are strongly code-backed

#### 1. Provider-agnostic custody orchestration

DALP does not hard-wire business logic to a single custody vendor. It exposes a shared signer contract and ships concrete DFNS and Fireblocks adapters.

**Evidence**

- `packages/services/signer/src/types.ts`
- `packages/services/signer/src/providers/factory.ts`
- `packages/integrations/dfns/src/index.ts`
- `packages/integrations/fireblocks/src/index.ts`

#### 2. API-first operational surface rather than contract-only access

DALP exposes versioned APIs, auth endpoints, SDKs, OpenAPI generation, and async transaction semantics. That is a production integration layer, not just a smart-contract toolkit.

**Evidence**

- `kit/dapi/src/http-server.ts`
- `packages/dalp/dapi/server/src/api-handler.ts`
- `kit/sdk/src/client.ts`

#### 3. Durable, DALP-native indexing architecture

Indexer V2 is a serious operational asset: Restate-backed, PostgreSQL-based, reorg-aware, zero-downtime reindex capable, and aligned to DALP domain models.

**Evidence**

- `packages/services/indexer/ARCHITECTURE.md`
- `product/dalp/capability-mapping/indexer-v2.md`

#### 4. Claim-based compliance integration model

DALP does not trap identity verification inside a proprietary black box. It integrates external verification outcomes into a trusted issuer + claim model that can be enforced on-chain across assets.

**Evidence**

- `packages/dalp/dapi/routes/system/src/identity/...`
- `packages/dalp/dapi/routes/system/src/trusted-issuers/...`
- `packages/dalp/dapi/routes/system/src/identity/claim/...`
- `product/dalp/capability-mapping/compliance-and-identity.md`

#### 5. Feed interoperability through Chainlink-compatible adapters

DALP’s feed layer supports both internal valuation workflows and external-consumer compatibility through `AggregatorV3Interface` adapters.

**Evidence**

- `kit/dapp/content/docs/architecture/components/infrastructure/feeds-system.mdx`
- `packages/dalp/dapi/routes/feeds/src/routes/adapters.v1.create.ts`

### 12.2 Differentiators that must be qualified

#### 6. Event webhooks

Position as an architectural integration pattern and narrative capability, but qualify that the repository currently shows stronger evidence for custody-specific webhooks and event/query-driven integration than for a generic DALP-wide webhook subsystem.

#### 7. ISO 20022 / SWIFT / SEPA

Position as **integration-ready architecture** and institutional interoperability target, not as a native adapter already proven by application code in this repository.

#### 8. KYC/AML provider integrations

Position as **provider-agnostic external verification integration pattern** via trusted issuers and claims, not as a currently shipped native connector library for named vendors.

---

## 13. Recommended Bid Language

The following language is safe and aligned to the codebase:

> DALP is designed as an API-first digital asset lifecycle platform that sits between enterprise systems, custody providers, identity/compliance services, and blockchain networks. Its integration architecture abstracts external dependencies behind dedicated components for custody, chain connectivity, feeds, and indexed data access, enabling institutions to integrate DALP into existing operating environments without re-architecting those environments around a single vendor stack.

> The platform exposes versioned REST/oRPC APIs with API-key security, organization-aware access control, idempotent transaction handling, and asynchronous workflow support. For indexed blockchain data access, DALP supports GraphQL/subgraph infrastructure and a DALP-native PostgreSQL-based indexer architecture built for durable execution, reorg handling, and analytics-grade query models.

> DALP currently ships pluggable custody integrations for DFNS and Fireblocks, claim-based identity and trusted issuer workflows for integrating external KYC/KYB verification outcomes, and a feed architecture supporting issuer-signed values and Chainlink-compatible adapters. Where institutional payment-rail or webhook integration patterns are referenced, DALP should be positioned as integration-ready and architected for those environments, with implementation specifics governed by deployment scope and target-system requirements.

---

## 14. Real Endpoints, Headers, and Configuration References

The following repository-backed references may be cited directly in technical appendices.

### 14.1 HTTP paths

From `kit/dapi/src/http-server.ts`:

- `/health`
- `/api/object-storage/presigned`
- `/api/auth/*`
- `/api/rpc/*`
- `/api/v2/*`
- `/api/v1/*`
- `/api` → redirects to `/api/v1`

### 14.2 API security headers

From `packages/dalp/auth/src/index.ts` and `kit/sdk/src/client.ts`:

- `x-api-key`
- `x-organization-id`
- `Idempotency-Key`

### 14.3 API key configuration

From `packages/dalp/auth/src/index.ts`:

- key prefix: `sm_dalp_`
- API-key rate limit: `10,000` requests / `60` seconds

### 14.4 Response headers and async semantics

From `packages/dalp/dapi/server/src/api-handler.ts` and `kit/dapi/src/http-server.ts`:

- `X-Transaction-Hash`
- `X-Retry-After`
- `Preference-Applied`
- `Location`
- `X-Powered-By`
- `Prefer: respond-async`
- `X-Transaction-Speed`

### 14.5 GraphQL / subgraph endpoint reference

From chart/tooling references:

- `http://dalp-graph-node-query:8000/subgraphs/name/kit`
- deployment query format: `${queryNode}/subgraphs/name/${graphName}`

### 14.6 Custody provider configuration requirements

From `packages/services/signer/src/providers/factory.ts`:

- **DFNS**: `orgId`, `authToken`, `credId`, `privateKey`, optional `baseUrl`
- **Fireblocks**: `apiKey`, `privateKey`, optional `baseUrl`

---

## 15. Final Assessment

DALP’s integration story is strongest when described as **institutional orchestration infrastructure**.

The codebase proves that DALP already provides:

- a real API platform with versioning, auth, idempotency, and async transaction handling
- a real abstraction layer for custody and blockchain connectivity
- a real feed/oracle interoperability model
- a real indexed data architecture spanning GraphQL/subgraphs and a DALP-native indexer
- a real claim-based model for integrating external identity/compliance verification outcomes

It does **not** currently prove, from this repository alone:

- a generic DALP-wide webhook subscription product surface
- native SWIFT/SEPA/RTGS/ISO 20022 adapter code
- named out-of-the-box connectors to specific KYC/AML verification vendors
- a clearly documented, first-class Hasura query surface equivalent to the DAPI surface

That is not a weakness if positioned properly. In fact, it leads to the most credible bid position:

> DALP is the lifecycle control plane that integrates with institutional systems through APIs, indexed data services, custody abstractions, and standards-aligned extension points. It is deliberately designed to fit into existing banking, custody, and compliance ecosystems rather than attempting to replace them.
