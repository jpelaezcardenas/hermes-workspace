# Technical Proposal

## 1. Technical architecture overview

SettleMint proposes DALP (Digital Asset Lifecycle Platform) as the core platform for designing, issuing, governing, operating, and scaling regulated digital assets in production. DALP is not a single application tier or a smart-contract package. It is a layered platform architecture that combines operator-facing applications, programmatic integration surfaces, durable workflow orchestration, blockchain execution infrastructure, and on-chain compliance-enforcing asset contracts.

The DALP architecture documentation defines four distinct architectural layers:

1. **Asset Console** as the operator interface,
2. **Unified API** as the programmatic access layer,
3. **DALP Execution Engine** as the durable workflow orchestration layer, and
4. **SMART Protocol / ERC-3643** as the on-chain compliance and token enforcement layer.

These layers communicate through stable interfaces rather than shared internal state, which allows them to scale, evolve, and fail independently. This separation is a material architectural strength for institutional deployments because it preserves clear responsibility boundaries between operator experience, systems integration, execution control, and blockchain-enforced state.

### 1.1 Architectural principles

The DALP architecture is structured around several principles that are consistently reflected across the product documentation and implementation evidence:

- **Separation of concerns across layers** rather than a monolithic application stack.
- **Chain-authoritative operational state** for token balances, token metadata, identity claims, and compliance rules.
- **Durable orchestration for multi-step operations** through the DALP Execution Engine and Restate-backed workflows.
- **Compliance-by-design** through ERC-3643 / SMART Protocol hooks that validate transfers before execution.
- **Deployment flexibility** across managed cloud, client cloud, on-premise Kubernetes/OpenShift, and private EVM networks.
- **Defense in depth** across authentication, authorization, wallet verification, signing controls, custody-provider policies, and audit logging.

### 1.2 Logical platform layers

#### Layer 1 — Experience and access layer

The **Asset Console** provides the primary operator interface for asset lifecycle management, compliance workflows, portfolio views, and administrative operations. The console uses the same DALP APIs and permissions model as programmatic clients, which means operational behavior is consistent across UI-driven and system-driven execution.

The **Unified API** provides type-safe, OpenAPI-documented access to DALP capabilities. The API exposes lifecycle domains such as token operations, user administration, wallet/account operations, contact/investor management, asset metadata, and system administration. This makes DALP suitable for integration into existing banking, custody, registry, settlement, compliance, and reporting ecosystems without requiring custom blockchain-specific adapters at the client layer.

#### Layer 2 — Control and orchestration layer

The **DALP Execution Engine** is the workflow control plane for complex multi-step operations such as asset issuance, identity recovery, transaction submission, and lifecycle operations that cannot be safely handled as simple synchronous request/response calls. DALP documents persistent workflow state, exactly-once semantics, retry handling, and checkpoint-based recovery. This is particularly important in blockchain environments where transactions may take minutes, fail independently, or require resubmission due to gas or nonce conditions.

#### Layer 3 — Infrastructure services layer

The infrastructure layer includes:

- **Transaction Signer** for gas estimation, nonce coordination, signing, and broadcasting;
- **Key Guardian** for secure key storage and backend routing across encrypted database storage, secret managers, HSMs, DFNS, and Fireblocks;
- **Chain Gateway** for RPC load balancing, health-based failover, and multi-node connectivity;
- **Chain Indexer** for translating blockchain state and event logs into queryable read models in PostgreSQL;
- **Feeds system** for trusted reference and market data;
- **PostgreSQL** as the persistent store for application, indexed, workflow, and audit data.

#### Layer 4 — On-chain contract and compliance layer

At the foundation is the **SMART Protocol integration based on ERC-3643**, which DALP uses as its on-chain compliance and transfer-enforcement model. DALP extends SMART with factory deployment, proxy management, access control, token feature attachment, runtime configuration, and system-seeded templates. Each instrument is deployed as its own contract, giving DALP lifecycle isolation, compliance independence, and clear accounting boundaries per asset.

### 1.3 Textual architecture diagram

A proposal-ready logical architecture diagram can be described as follows:

- At the top, **users and client systems** interact with DALP through the **Asset Console** and the **Unified API**.
- Requests then pass into the **authorization and execution boundary**, where authentication, tenant context, permission checks, wallet verification, and transaction queueing are applied.
- Multi-step operations are routed into the **DALP Execution Engine**, which persists workflow state and coordinates downstream actions.
- The execution layer interacts with **Key Guardian**, **Transaction Signer**, **Chain Gateway**, **Chain Indexer**, **Feeds**, and **PostgreSQL**.
- The blockchain-facing side connects to one or more **EVM networks** via RPC nodes.
- On-chain, DALP deploys **asset contracts, identity contracts, and compliance modules** using the SMART / ERC-3643 model, with events flowing back into the indexer and query surfaces.

This architecture is consistent with DALP’s documented separation between operator interface, integration boundary, orchestration layer, infrastructure services, and chain-enforced asset state.

---

## 2. Platform components and how they connect

### 2.1 Asset Console

The Asset Console is the white-label web interface for platform operators. It supports role-based workflows for asset creation, compliance operations, portfolio views, and distribution management. All blockchain-affecting actions pass through wallet verification, and the console relies on the Unified API rather than separate hidden execution paths. This is important in bid terms because it means the client’s operational users and the client’s integrated systems operate against the same governed platform semantics.

### 2.2 Unified API

The Unified API is DALP’s formal integration surface. It provides:

- OpenAPI 3.1 documentation,
- schema-validated request contracts,
- consistent error handling,
- machine-to-machine access through scoped API keys,
- support for browser sessions and passkeys,
- support for meta-transaction patterns through ERC-2771 integration.

The API is organized by capability domains rather than arbitrary REST resource groupings. This reflects business operations more naturally and simplifies integration planning for enterprise clients.

### 2.3 DALP Execution Engine

The DALP Execution Engine orchestrates operations that span multiple calls, systems, or transactions. DALP documentation explicitly describes:

- persistent state machines,
- exactly-once workflow semantics,
- durable workflow state inspection,
- automatic retry and backoff,
- compensating handling for permanent failures,
- dead-letter handling for exhausted retry budgets.

The platform’s workflow model is also visible in capability-mapping evidence for system deployment, token creation, identity recovery, and other durable business operations. For proposal purposes, this means DALP is designed for production operations where workflows must survive restarts, infrastructure failures, and partial execution errors.

### 2.4 Transaction Signer and Key Guardian

DALP separates transaction construction and submission from raw key custody.

- The **Transaction Signer** manages gas estimation, nonce assignment, signing lifecycle, and broadcasting.
- The **Key Guardian** routes signing operations to the appropriate backend: encrypted database storage, secret manager, HSM, DFNS, or Fireblocks.

This separation enables DALP to support different security tiers without changing the operational model presented to users and integrated systems. It also aligns with institutional custody models where clients may already have approved key-management or external custody providers.

### 2.5 Chain Gateway and Chain Indexer

The **Chain Gateway** abstracts blockchain connectivity behind a resilient routing layer with health checks, failover, request routing strategies, and support for public and private EVM networks.

The **Chain Indexer** transforms blockchain events and storage into domain read models optimized for application queries. DALP documents indexed state as a derived read layer, not the source of truth. Indexed data can be reconstructed from on-chain events, which is an important property for auditability and recovery.

### 2.6 Asset contracts, identity, and compliance modules

DALP organizes tokenized instruments as separate contracts per instrument, with independent compliance configuration and lifecycle. On-chain identity claims are handled through OnchainID-based identity contracts, and transfer eligibility is enforced through ERC-3643 / SMART compliance hooks and modular compliance contracts.

This combination provides:

- per-instrument lifecycle isolation,
- per-instrument compliance independence,
- reusable identity claims,
- pre-transfer compliance enforcement,
- runtime configurability for token features and compliance modules.

---

## 3. Deployment architecture

### 3.1 Supported deployment models

DALP’s architecture and self-hosting documentation support three broad deployment patterns relevant to bid responses:

1. **Managed or client-cloud deployment** on Kubernetes/OpenShift with managed platform services,
2. **On-premise or sovereign deployment** on Kubernetes/OpenShift with self-hosted infrastructure components where required,
3. **Hybrid deployment** where front-end and application services run in a client-controlled cloud or datacenter while selected external services such as custody, observability, or blockchain nodes remain managed or externally provided.

The self-hosting guidance explicitly supports deployment on:

- standard Kubernetes distributions,
- Red Hat OpenShift,
- AWS, Azure, and GCP managed infrastructure patterns,
- non-hypercloud environments with self-hosted alternatives where approved.

### 3.2 Runtime zones

DALP documents three runtime zones:

- **Frontend zone** — Asset Console, exposed through CDN or reverse proxy,
- **Backend zone** — Unified API, Execution Engine, Chain Indexer, Feeds, and related services,
- **Data zone** — PostgreSQL, Restate state store, blockchain nodes, and persistent infrastructure.

These zones are separated by explicit trust boundaries:

1. Internet to frontend,
2. frontend to backend,
3. backend to data.

This zoning model is proposal-relevant because it provides a clear deployment blueprint for security review, network segregation, and infrastructure approval.

### 3.3 Environment model

DALP documents a standard three-environment model:

- **Development** with local or Docker-based infrastructure and Anvil as local EVM,
- **Staging** with realistic data and testnet blockchain environments,
- **Production** with mainnet or private-network connectivity.

The architecture documentation states that all environments use identical container images and differ through configuration only. That is a strong operational practice because it reduces environment drift.

### 3.4 Managed-cloud baseline

For AWS, Azure, and GCP, DALP’s self-hosting prerequisites require managed services for PostgreSQL, Redis, object storage, backups, and observability as the preferred baseline. SettleMint explicitly recommends this managed-services approach because it provides strong HA/DR outcomes with lower operational overhead than self-hosting every dependency.

### 3.5 On-premise and sovereign environments

Where a client requires self-hosting for sovereignty, data-residency, or policy reasons, DALP supports self-hosted alternatives for PostgreSQL, Redis, object storage, observability, and backups. This requires additional cluster capacity and operational ownership, but it is documented as a supported option rather than an exceptional workaround.

### 3.6 Textual deployment topology diagram

A deployment topology diagram can be described as follows:

- External users and client systems connect over HTTPS to a reverse proxy / ingress layer.
- The ingress routes traffic to the Asset Console and Unified API in the frontend/backend zones.
- Backend services communicate internally with the Execution Engine, Chain Indexer, signer services, feeds, and authentication/session services.
- PostgreSQL, Redis where applicable, object storage, and observability backends reside in the protected data zone.
- Blockchain connectivity exits through the Chain Gateway to either public EVM RPC providers, self-hosted nodes, or private consortium networks.
- External custody providers such as DFNS or Fireblocks connect at the signing boundary rather than being embedded inside the DALP core runtime.

---

## 4. Infrastructure requirements and scalability

### 4.1 Kubernetes and platform prerequisites

DALP’s self-hosting prerequisites define the baseline cluster requirements:

- Kubernetes 1.27+ recommended 1.29+ or OpenShift 4.14+ recommended 4.16+,
- minimum 3 nodes, recommended 6+,
- minimum node size 4 vCPU / 16 GB RAM, recommended 8 vCPU / 32 GB RAM,
- multi-AZ distribution across at least three availability zones for production,
- StorageClass availability for stateful workloads,
- NetworkPolicy support,
- metrics support for autoscaling,
- HTTPS-only external routes.

For production proposals, the documented recommendation is a multi-AZ cluster with managed database and supporting services.

### 4.2 Database requirements

DALP requires PostgreSQL as the authoritative application data store. The prerequisites documentation specifies PostgreSQL 17.x as the tested baseline, with documented fallback review for version 16.x where required. For managed cloud deployments, the minimum recommended database baseline is 4 vCPU / 16 GB RAM with high availability enabled.

DALP’s architecture also relies on PostgreSQL for:

- application identity and configuration data,
- indexed blockchain state,
- workflow state,
- audit records.

### 4.3 Redis, object storage, and observability requirements

For hypercloud deployments, DALP requires:

- managed Redis with TLS and authentication,
- object storage with versioning enabled,
- metrics, logs, traces, and alerting via approved managed observability services or the in-cluster stack.

These are not cosmetic dependencies. They support platform operations such as caching, backup, object/document storage, and production observability.

### 4.4 Scaling characteristics by component

DALP’s deployment topology documentation provides a clear scaling model:

| Component | Scaling model | State model |
| --- | --- | --- |
| Asset Console | Horizontal | Stateless |
| Unified API | Horizontal | Stateless, session-backed |
| Execution Engine | Workflow-serialized | Durable journal/state |
| Chain Indexer | Per-chain service instance | PostgreSQL checkpoints |
| Key Guardian | Horizontal | Externalized state |
| Chain Gateway | Horizontal | Minimal health state |
| PostgreSQL | Vertical + replicas | Persistent |
| Blockchain nodes | Per network | Persistent / chain state |

This is a useful operational property: DALP does not scale everything in the same way. Stateless interfaces scale horizontally, workflow execution serializes where correctness demands it, and data services scale through HA and read-replica patterns.

### 4.5 Performance bottlenecks and planning considerations

DALP documents the main bottlenecks directly:

- token transfers are bounded by block time and compliance-module gas cost,
- indexer throughput is bounded by RPC rate limits and database write throughput,
- API performance is bounded mainly by database query complexity for aggregate views,
- asset deployment time is bounded by block confirmation time multiplied by the number of blockchain transactions in the issuance workflow.

That is the right kind of answer for evaluators: concrete, operational, and not magical. DALP improves reliability and automation, but it does not remove blockchain confirmation physics.

---

## 5. Blockchain network options

### 5.1 Network compatibility model

DALP operates on any blockchain that implements the **Ethereum JSON-RPC specification**. The supported-networks architecture reference states explicitly that no application changes are required when switching between compatible networks; differences are handled through configuration for consensus, gas models, and confirmation requirements.

This means DALP is an **EVM-compatible platform**, not a multi-protocol platform spanning Solana, Fabric, or non-EVM DLTs. That boundary matters and should be stated clearly in any bid response.

### 5.2 Supported public networks

DALP documents support for public EVM-compatible networks including:

- **Ethereum**,
- **Polygon PoS**,
- **Avalanche C-Chain**,
- **BNB Smart Chain**,
- **Arbitrum One**,
- **Optimism**,
- **Base**,
- **zkSync Era**,
- **Polygon zkEVM**,
- supported testnets such as **Sepolia**, **Amoy**, and **Fuji**.

### 5.3 Supported private and consortium networks

DALP also documents support for private EVM deployments, specifically:

- **Hyperledger Besu** with IBFT 2.0 or QBFT consensus,
- **Go-Ethereum (Geth)** private PoA or PoS configurations,
- **SettleMint-managed private networks** with predeployed DALP infrastructure.

This makes DALP suitable for institutions that require permissioned, client-controlled, or consortium blockchain deployment models while retaining the same application and lifecycle platform semantics.

### 5.4 Multi-chain operation

DALP supports simultaneous operation across multiple chains, with clear architectural constraints:

- identity is chain-specific,
- compliance configuration is per-chain and per-token,
- indexing is per chain,
- custody integrations can support multi-chain wallets.

This is multi-chain in the sense of multiple EVM networks under one DALP operating model. It is not cross-protocol interoperability across non-EVM ledgers.

### 5.5 Deployment recommendations by use case

- **Public network model**: best where liquidity access, external distribution, or public settlement rails are required.
- **Private / consortium model**: best where governance control, permissioning, data locality, and participant control are primary.
- **Hybrid program model**: appropriate where sandbox, pilot, or phased rollout strategies require moving from testnet/private environments into production EVM environments over time.

---

## 6. Smart contract architecture and deployment model

### 6.1 Contract model

DALP uses the SMART Protocol / ERC-3643 as the on-chain compliance and transfer-enforcement foundation, extended with DALP-specific deployment, configuration, access-control, and runtime feature patterns.

Each instrument is deployed as a separate contract, which provides:

- lifecycle isolation,
- compliance independence,
- upgrade independence,
- clear accounting per instrument.

DALP recommends **DALPAsset** as the standard contract type for new deployments. This extends SMART through `SMARTConfigurable`, allowing token features to be attached at runtime.

### 6.2 Factory deployment pattern

DALP documents a shared factory deployment pattern for asset issuance:

1. Factory receives `createAsset(params)`.
2. A proxy is deployed via **CREATE2**, providing deterministic addressing.
3. An **OnchainID identity contract** is registered for the token.
4. The proxy is initialized with identity and implementation references.
5. Required roles are assigned.
6. Deployment events are emitted for indexing.

The factory transaction is documented as atomic. If any part fails, the deployment reverts. DALP explicitly documents invariants such as identity-before-compliance and compliance-before-transfers.

### 6.3 Deterministic addressing and upgradeability

The use of CREATE2 means token addresses are predictable from deployment parameters. This is useful for environment planning, integration pre-configuration, and deterministic issuance workflows.

DALP’s architecture docs also note that upgradeability behavior can vary between upgradeable and immutable deployment patterns, but the factory sequence itself remains consistent. This allows controlled evolution of contract logic while preserving the deployment model.

### 6.4 Runtime token features and asset-class behavior

Capability mapping shows that DALP supports deterministic issuance across seven documented asset classes:

- equity,
- bond,
- fund,
- stablecoin,
- deposit,
- real-estate,
- precious-metal.

The same workflow dispatches class-specific behavior such as bond maturity parameters, fund fee parameters, and class-aware claim issuance. Claims are not a loose post-processing step; the workflow routes claim issuance through shared services with additional validation controls.

### 6.5 Custodian administrative controls

The asset-contract deployment architecture also documents administrative controls available through custody roles, including:

- forced transfers,
- account freezing,
- token recovery,
- batch compliance actions.

These controls are intentionally separated from normal lifecycle functions and are relevant to legal-order handling, recovery operations, and regulated-asset controls.

### 6.6 Related detailed sections

This technical chapter should be read alongside the dedicated **Access Control and Permissions** section for the detailed DALP role model and signing-control boundaries. Where included in the broader proposal pack, companion sections on configurable tokens, configurable compliance, integrations, and verification/claims/feeds should provide deeper treatment of those functional domains.

---

## 7. Data architecture

### 7.1 Source-of-truth model

DALP explicitly documents data-domain ownership and source-of-truth boundaries.

**On-chain authoritative domains:**
- token balances,
- token metadata,
- identity claims,
- compliance rules.

**Off-chain authoritative domains:**
- user accounts,
- organizations,
- wallet bindings,
- API keys,
- audit log records,
- feed data,
- operational configuration.

**Derived/indexed domains:**
- indexed blockchain events,
- query-optimized state projections,
- portfolio and transaction views.

This is the right model for institutional digital-asset platforms: not everything belongs on-chain, and not everything should be off-chain.

### 7.2 On-chain vs off-chain boundary

DALP’s architecture makes the split explicit:

- On-chain data is authoritative for asset state, compliance, and identity, but slower and immutable.
- Off-chain data is authoritative for user and application operations, faster to query, and mutable where appropriate.
- The Chain Indexer bridges the two by translating chain events into query-optimized read models in PostgreSQL.

### 7.3 Database architecture

PostgreSQL is DALP’s core off-chain persistence layer. DALP documents major domain groupings for:

- identity,
- asset configuration,
- indexed state,
- workflow state,
- audit and compliance logging.

The database architecture guidance emphasizes:

- ACID guarantees,
- mature HA/replication support,
- partitioning for high-volume data,
- read replicas for query distribution,
- audit logging,
- encryption in transit and at rest.

### 7.4 Indexing and read performance

Blockchain data structures are not optimized for institutional application queries. DALP addresses this through the Chain Indexer, which maintains domain models such as:

- asset balances,
- investor portfolios,
- transaction history,
- compliance status,
- distribution records.

DALP also documents idempotent processing, checkpoint-based recovery, rollback/reorg handling concepts, and real-time client updates from indexed state.

### 7.5 Document and object storage

Capability mapping confirms DALP has a governed document and artifact storage capability for asset-linked evidence, uploaded files, and exportable document listings. The object-storage abstraction supports multiple providers including AWS, GCP, Azure, S3-compatible backends, RustFS, MinIO aliases, and filesystem mode for development.

This is relevant in proposal terms because asset operations typically require supporting evidence, uploaded documentation, and operational exports in addition to on-chain state.

---

## 8. Security architecture

### 8.1 Authentication and user/session controls

DALP uses Better Auth for identity and session management. The documented active methods include:

- email/password,
- passkeys/WebAuthn,
- scoped API keys.

LDAP/Active Directory, OAuth/OIDC, and SAML are available via plugins rather than enabled by default. Browser clients authenticate using HTTP-only secure session cookies with explicit expiration and refresh behavior.

### 8.2 Authorization architecture

DALP documents a **dual-layer authorization model**:

- off-chain platform roles govern access to the console and API surfaces,
- on-chain roles govern blockchain operations.

The authorization architecture states that the on-chain `AccessManager` contract is the authoritative source for role assignments. The UI/API consume indexed on-chain state rather than a separate permission database. Write operations require both a valid platform context and the correct on-chain role.

The detailed role model is treated in the dedicated **Access Control and Permissions** section, which should be referenced as the primary proposal annex for role structure, segregation of duties, wallet-verification behavior, and custody-provider control boundaries.

### 8.3 Wallet verification and privileged action controls

DALP adds transaction-time wallet verification for sensitive writes. The security documentation distinguishes between:

- session authentication proving identity, and
- wallet verification proving intent/control for blockchain-affecting actions.

DALP documents support for PIN, TOTP, and backup-code-based verification factors, with API-key sessions intentionally bypassing interactive wallet verification for machine-to-machine automation.

### 8.4 Key management tiers

DALP documents a three-tier key management model:

1. encrypted database-managed keys,
2. HSM-backed keys,
3. external custody integration via DFNS or Fireblocks.

The Key Guardian architecture further documents a storage hierarchy that includes secret-manager and HSM options, with FIPS 140-2 Level 3 positioning for HSM-backed deployments. For institutional bids, this matters because DALP can align to different client security-control models without requiring a redesign of the platform itself.

### 8.5 External custody integration

DALP supports **DFNS** and **Fireblocks** as external custody providers. In these models:

- DALP retains workflow, permissions, wallet-verification gates, and execution-state management,
- the custody provider retains key custody and provider-side approval policy,
- provider-native execution paths may own nonce/gas/sign/broadcast lifecycle where supported.

Capability mapping further shows that DFNS supports programmatic approval resolution through DALP integration, while Fireblocks supports approval visibility but not DALP-side programmatic approval resolution.

### 8.6 Compliance-by-design security controls

DALP’s SMART / ERC-3643 foundation enforces transfer rules pre-transaction rather than merely detecting violations afterward. Identity claims, trusted issuers, and modular compliance rules form part of the transaction admissibility boundary. This is a stronger control posture than purely off-chain compliance screening followed by uncontrolled chain execution.

### 8.7 Audit logging

DALP documents audit logging across multiple layers:

- authentication events,
- wallet verification events,
- on-chain role and business events,
- workflow state transitions,
- administrative actions,
- queryable activity history.

The observability architecture explicitly states that audit logs are retained in line with regulatory expectations, typically seven years for financial services, while the capability mapping also honestly notes where some reporting/export auditability remains limited.

---

## 9. Performance, throughput, latency, and capacity planning

### 9.1 Performance model

DALP’s performance profile is shaped by both conventional application concerns and blockchain-specific constraints.

The documented characteristics include:

- **API responses**: sub-second for cached queries,
- **Indexer synchronization**: approximately 2,000 blocks per batch in the documented discovery loop,
- **token transfers**: bounded by block time plus compliance-module gas cost,
- **asset deployment**: multi-transaction workflows typically spanning 5–15 blockchain transactions.

### 9.2 Throughput considerations

DALP throughput depends on the full path, not one component in isolation. Key throughput drivers include:

- chain block times and gas behavior,
- number and complexity of compliance modules attached to a token,
- RPC provider rate limits,
- database write throughput for indexed and workflow data,
- signer or custody-provider execution latency,
- queueing and concurrency behavior in the workflow layer.

The proposal implication is straightforward: capacity planning must be done against expected business volumes and the chosen chain/network profile, not by quoting a single abstract TPS number.

### 9.3 Latency considerations

DALP’s architecture makes a useful distinction between:

- **interactive read latency**, which is optimized through indexed PostgreSQL read models and caching,
- **transaction finality latency**, which is constrained by chain confirmation and provider approval behavior.

This distinction is important for institutional buyers. DALP can provide fast operational interfaces and durable workflow control, but blockchain confirmation and external approval gates still determine end-to-end write completion timing.

### 9.4 Capacity-planning approach

A practical capacity-planning model for DALP should consider at least:

- projected daily and peak transaction volumes,
- number of simultaneously active asset programs,
- number of chains to be indexed,
- expected event ingestion volumes,
- user concurrency for operator and investor surfaces,
- document/object storage volumes,
- retention periods for indexed and audit data,
- custody-provider approval throughput where external signers are used.

DALP’s observability and blockchain-monitoring surfaces are designed to support this planning through metrics such as request rates, error rates, latency, chain lag, block lag, confirmations, and resource utilization.

### 9.5 Monitoring for ongoing optimization

DALP ships with pre-built dashboards covering:

- operations overview,
- transaction monitoring,
- compliance activity,
- security overview,
- infrastructure health.

Alert rules are documented for error spikes, latency degradation, resource exhaustion, chain connectivity loss, and transaction-failure thresholds. This creates a strong operational basis for performance tuning after go-live.

---

## 10. Disaster recovery and business continuity

### 10.1 HA/DR philosophy

DALP’s self-hosting architecture explicitly defines HA/DR as a first-class design area. SettleMint recommends a **cloud-native, single-region, multi-AZ pattern with managed services** as the default for most deployments. This model is documented with typical targets of:

- **RTO**: 2–15 minutes,
- **RPO**: seconds to 1 minute,
- **RTT**: 15–60 minutes including verification.

The HA guidance also defines alternative patterns such as hot-warm, hot-cold, and hot-hot for clients with specific geographic, resilience, or consortium requirements.

### 10.2 Backup architecture

DALP’s documented backup strategy includes:

- continuous PostgreSQL PITR / WAL shipping,
- Velero backups for Kubernetes resources,
- object-storage versioning,
- daily observability backups where self-hosted,
- configuration stored in Git as code.

The backup and recovery documentation also provides default hourly/daily/weekly schedules and retention windows.

### 10.3 Recovery testing

DALP requires DR testing as an operational discipline, including:

- quarterly DR drills,
- annual full DR tests,
- measurement of actual RTO/RPO versus target,
- runbook updates following exercises.

That is the right answer for evaluator scrutiny: resilience is not treated as “we have backups,” but as tested recovery practice.

### 10.4 Runtime failure handling

DALP’s failure-modes documentation describes degradation and recovery behavior across:

- blockchain outages,
- workflow-engine crashes,
- indexer failures,
- API failures,
- custody-provider unavailability.

DALP’s general philosophy is **fail-closed for security-sensitive operations** and graceful degradation for read-only experiences where possible. Examples include blocked transfers when compliance cannot be evaluated, queued transactions when signing or custody paths are unavailable, and stale-data indicators for degraded read paths.

### 10.5 Business continuity interpretation

For a client deployment, the business continuity model should typically include:

- multi-AZ application and data deployment,
- managed HA data services,
- regular restore testing,
- monitored signing and blockchain infrastructure,
- documented cutover/failover procedures,
- clear separation between DALP platform recovery and third-party provider recovery responsibilities.

---

## 11. Technology stack summary

The following table summarizes the DALP technology stack as documented in the architecture and self-hosting sources.

| Layer / concern | Documented technology or pattern | Notes |
| --- | --- | --- |
| Operator interface | Asset Console, React-based web interface | White-label, multi-language, role-based UI |
| Integration surface | Unified API with OpenAPI 3.1 | Type-safe documented API surface |
| Authentication | Better Auth | Sessions, passkeys, API keys; enterprise SSO via plugins |
| Authorization | Dual-layer RBAC | Platform roles + on-chain roles |
| Workflow orchestration | DALP Execution Engine backed by Restate | Durable workflows, retries, checkpointing |
| Smart contracts | SMART / ERC-3643 + DALP extensions | Compliance-enforced token model |
| Token deployment | Factory pattern with CREATE2 proxies | Deterministic addressing |
| On-chain identity | OnchainID (ERC-734/735 model) | Claims-based identity enforcement |
| Database | PostgreSQL | Application, indexed, workflow, audit data |
| Cache / session support | Redis (deployment prerequisite) | Managed baseline in cloud environments |
| Blockchain connectivity | Chain Gateway + EVM RPC nodes | Failover and load-balanced connectivity |
| Indexing | Chain Indexer | Event translation into query models |
| Key management | Key Guardian | Encrypted DB, secret manager, HSM, DFNS, Fireblocks |
| Signing | Transaction Signer | Gas, nonce, signing, broadcast lifecycle |
| Object storage | Multi-provider abstraction | AWS, GCP, Azure, S3-compatible, RustFS/filesystem dev mode |
| Observability | Metrics, logs, traces, dashboards, alerting | Grafana/VictoriaMetrics/Loki/Tempo self-hosted options documented |
| Packaging / runtime | Containers on Kubernetes or OpenShift | Same images across environments |
| Blockchain networks | EVM-compatible networks only | Public, L2, private, consortium EVM |

This table should be treated as a proposal summary. Detailed implementation specifics remain governed by the applicable DALP architecture references and selected deployment pattern.

---

## 12. Recommended proposal diagrams described in text

To support evaluator review, the following diagrams should accompany this chapter in visual form. The textual descriptions below are aligned to the documented DALP architecture.

### 12.1 Logical platform architecture diagram

Show five stacked bands:

1. **Users and client systems**,
2. **Asset Console and Unified API**,
3. **Authentication / authorization / verification / workflow boundary**,
4. **Execution Engine, Signer, Key Guardian, Chain Gateway, Chain Indexer, PostgreSQL, Feeds**,
5. **EVM blockchain networks and on-chain DALP contracts**.

Arrows should show both operational request flow downward and indexed/audit event flow upward.

### 12.2 Deployment topology diagram

Show:

- ingress/load balancer,
- frontend and backend pods across three AZs,
- managed PostgreSQL and object storage,
- optional Redis and observability services,
- Chain Gateway connected to multiple RPC nodes/providers,
- optional external DFNS / Fireblocks boundary.

This diagram should make trust zones explicit.

### 12.3 Asset issuance flow diagram

Show:

- issuer/operator request,
- API validation and permission checks,
- workflow start,
- factory deployment via CREATE2,
- OnchainID registration,
- role assignment,
- compliance configuration,
- event indexing and UI/read-model update.

### 12.4 Compliance transfer flow diagram

Show:

- transfer initiation,
- platform session/API-key authentication,
- permission and wallet verification,
- transaction queueing,
- on-chain compliance evaluation via ERC-3643 modules,
- signing and broadcast,
- confirmation and indexed-state update.

### 12.5 HA/DR architecture diagram

Show:

- multi-AZ cluster,
- managed database HA,
- backup flows to object storage,
- observability stack,
- failover and restore paths,
- quarter/annual test loop as an operational overlay.

---

## 13. Proposal positioning and cross-references

This technical chapter provides the platform-wide architecture and operating model for DALP. It should be used as the anchor section for evaluator review and cross-referenced with the deeper domain sections in the full proposal pack.

Recommended cross-references are:

- **Access Control and Permissions** for the detailed role model, dual-layer RBAC, wallet-verification controls, custody-provider interaction model, and segregation of duties.
- **Configurable Tokens** for asset-class configuration, feature attachment, issuance patterns, and runtime token capabilities.
- **Configurable Compliance** for module catalog, policy design, trusted issuers, identity claims, and jurisdiction-specific compliance modeling.
- **Integrations** for API, custody, external data, and enterprise system integration patterns.
- **Verification, Claims, and Feeds** for trusted data, claims issuance, identity verification, and feed-governance details.

Where those sections are included in the bid response, this chapter should reference them rather than duplicating low-level functional detail.

---

## 14. Conclusion

DALP provides a production-oriented technical architecture for institutional digital-asset programs by combining:

- a governed operator and API access layer,
- durable workflow orchestration for long-running blockchain operations,
- resilient infrastructure services for signing, indexing, and connectivity,
- chain-enforced compliance and identity controls through SMART / ERC-3643,
- flexible deployment across cloud, on-premise, and private-network environments,
- a clear on-chain/off-chain data boundary,
- institutional security controls including HSM and external custody support,
- and a documented HA/DR and observability model suitable for regulated operations.

Just as importantly, the DALP source documentation is internally consistent on these points. The platform does not present architecture as generic marketing abstraction. It documents concrete runtime zones, source-of-truth boundaries, supported network types, contract deployment invariants, backup and failover patterns, and failure behavior. That makes DALP suitable for evaluator-grade technical review in complex procurement processes.

## Source references used for this section

Primary sources used in preparing this chapter:

- `product/dalp/bid-kit/templates/full-proposal-skeleton.md`
- `product/dalp/bid-kit/sections/access-control-permissions.md`
- `notion/dalp-narrative.md`
- `product/dalp/capability-mapping/index.md`
- `product/dalp/capability-mapping/asset-lifecycle.md`
- `product/dalp/capability-mapping/compliance-and-identity.md`
- `product/dalp/capability-mapping/custody-settlement.md`
- `product/dalp/capability-mapping/operations-and-reliability.md`
- `/Users/quark/dalp/kit/dapp/content/docs/architecture/overview/index.mdx`
- `/Users/quark/dalp/kit/dapp/content/docs/architecture/overview/deployment-topology.mdx`
- `/Users/quark/dalp/kit/dapp/content/docs/architecture/overview/data-domains.mdx`
- `/Users/quark/dalp/kit/dapp/content/docs/architecture/overview/quality-attributes.mdx`
- `/Users/quark/dalp/kit/dapp/content/docs/architecture/components/index.mdx`
- `/Users/quark/dalp/kit/dapp/content/docs/architecture/components/platform/asset-console.mdx`
- `/Users/quark/dalp/kit/dapp/content/docs/architecture/components/platform/unified-api.mdx`
- `/Users/quark/dalp/kit/dapp/content/docs/architecture/components/infrastructure/execution-engine.mdx`
- `/Users/quark/dalp/kit/dapp/content/docs/architecture/components/infrastructure/transaction-signer.mdx`
- `/Users/quark/dalp/kit/dapp/content/docs/architecture/components/infrastructure/key-guardian.mdx`
- `/Users/quark/dalp/kit/dapp/content/docs/architecture/components/infrastructure/chain-gateway.mdx`
- `/Users/quark/dalp/kit/dapp/content/docs/architecture/components/infrastructure/chain-indexer.mdx`
- `/Users/quark/dalp/kit/dapp/content/docs/architecture/components/asset-contracts/deployment-architecture.mdx`
- `/Users/quark/dalp/kit/dapp/content/docs/architecture/components/asset-contracts/smart-protocol-integration.mdx`
- `/Users/quark/dalp/kit/dapp/content/docs/architecture/integrations/supported-networks.mdx`
- `/Users/quark/dalp/kit/dapp/content/docs/architecture/security/authentication.mdx`
- `/Users/quark/dalp/kit/dapp/content/docs/architecture/security/authorization.mdx`
- `/Users/quark/dalp/kit/dapp/content/docs/architecture/operability/database.mdx`
- `/Users/quark/dalp/kit/dapp/content/docs/architecture/operability/observability.mdx`
- `/Users/quark/dalp/kit/dapp/content/docs/architecture/operability/failure-modes.mdx`
- `/Users/quark/dalp/kit/dapp/content/docs/architecture/self-hosting/prerequisites.mdx`
- `/Users/quark/dalp/kit/dapp/content/docs/architecture/self-hosting/high-availability/index.mdx`
- `/Users/quark/dalp/kit/dapp/content/docs/architecture/self-hosting/high-availability/cloud-native.mdx`
- `/Users/quark/dalp/kit/dapp/content/docs/architecture/self-hosting/high-availability/backup-recovery.mdx`
