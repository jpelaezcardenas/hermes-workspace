# Section 2: Platform Architecture

## 2.1 Architectural Overview

DALP (Digital Asset Lifecycle Platform) is built as a four-layer stack. Each layer has a distinct responsibility boundary, and layers communicate through well-defined interfaces. Lower layers enforce stricter invariants; upper layers provide flexibility and user-facing abstraction.

| Layer | Role | Key Components |
|-------|------|----------------|
| **Application** | User-facing interfaces for operators, issuers, and compliance officers | Asset Console (web UI) |
| **API** | Programmatic access surface for external systems and integrations | Unified API (OpenAPI 3.1), TypeScript SDK (@settlemint/dalp-sdk) |
| **Middleware** | Workflow orchestration, transaction lifecycle, key management, indexing | Execution Engine, Key Guardian, Transaction Signer, Contract Runtime, Chain Indexer, Chain Gateway, Feeds System |
| **Smart Contract** | On-chain enforcement of compliance, identity, and asset logic | SMART Protocol (ERC-3643), DALPAsset contracts, compliance modules, token features, addons |

Requests flow top-down through these layers. A user action in the Asset Console triggers an API call, which the middleware orchestrates into one or more blockchain transactions, which the smart contract layer validates and executes on-chain. Each layer independently enforces its own security controls, so no single-layer failure grants unauthorized access.

---

## 2.2 Smart Contract Layer

### 2.2.1 SMART Protocol Foundation (ERC-3643)

All DALP smart contracts are built on the **SMART Protocol** (SettleMint Adaptable Regulated Token), an implementation of the ERC-3643 standard. ERC-3643 defines a specification for regulated security tokens where every transfer must pass through a modular compliance engine before execution.

SMART Protocol provides three foundational sub-layers:

- **Token**: ERC-20 compatible contracts with compliance hooks and a modular extension system. External systems (wallets, exchanges, indexers) interact through standard ERC-20 and ERC-3643 interfaces.
- **Compliance**: An orchestration engine that evaluates a configurable set of transfer rules before each transaction. Rules are modular and can be added, removed, or reconfigured at runtime without redeploying the token contract.
- **Identity**: On-chain identity management via OnchainID (ERC-734/735), storing verifiable KYC/AML claims. Identity verification is enforced on-chain as a prerequisite for transfers.

ERC-3643 was chosen over ERC-1400 for its modular compliance engine, on-chain identity integration through OnchainID, and active ecosystem support.

### 2.2.2 Five-Layer On-Chain Architecture

The on-chain side of DALP follows a layered architecture where each level builds on the one below it. Lower layers are more stable and shared; upper layers are more asset-specific and change more frequently.

| Layer | Purpose | Key Components |
|-------|---------|----------------|
| **SMART Protocol** | ERC-3643 token framework with modular compliance, identity management, and extension system | Core token interfaces, compliance engine, identity registry |
| **Global** | Platform-wide infrastructure shared across all system instances on a given chain | Central directory, identity factory, identity implementations |
| **System** | Per-system infrastructure managing identity registration, compliance, and access control | Identity registry, compliance orchestration, access manager, factory registries |
| **Assets** | Production-ready tokenized financial instruments | DALPAsset (configurable), plus legacy types: Bond, Equity, Fund, Deposit, StableCoin, RealEstate, PreciousMetal |
| **Addons** | Operational tools extending assets with distribution, settlement, and treasury capabilities | Airdrop (push, merkle-drop, vesting), Vault (multi-sig treasury), XvP Settlement (atomic DvP), Token Sale (DAIO), Yield |

A request flows top-down through this stack: an addon or API call triggers an operation on an asset, the asset delegates identity and compliance checks to the system layer, the system resolves implementations through the global directory, and the SMART Protocol executes the compliant state change.

### 2.2.3 DALPAsset: The Configurable Contract

DALPAsset is the recommended contract type for all new tokenization projects. It extends the SMART Protocol with the SMARTConfigurable extension, allowing token features and compliance modules to be attached and reconfigured at runtime, after deployment.

This design eliminates the need to commit to a specialized contract type at deployment time. A DALPAsset token can evolve: start as a simple bearer instrument, then have fee structures added, governance enabled, or maturity and redemption logic configured, all without redeploying the contract.

**Three-layer composability model:**

```
┌─────────────────────────────────────────────────┐
│                   DALPAsset                      │
│  (SMARTConfigurable + ERC-3643 + ERC-20)        │
│                                                  │
│  ┌──────────────┐  ┌──────────────────────────┐ │
│  │ Token         │  │ Compliance               │ │
│  │ Features      │  │ Modules                  │ │
│  │ (pluggable)   │  │ (pluggable)              │ │
│  │               │  │                          │ │
│  │ 11 features   │  │ 12 modules in            │ │
│  │ Up to 32      │  │ 6 categories             │ │
│  │ per token     │  │                          │ │
│  └──────────────┘  └──────────────────────────┘ │
└─────────────────────────────────────────────────┘
```

**Runtime-pluggable token features** (11 features across 4 categories) integrate through six lifecycle hooks (mint, burn, transfer, redeem, update, attach) via the ISMARTFeature interface. Up to 32 features per token. `setFeatures()` takes an ordered array; execution order = array position. Features with `supportsRewriting()` can modify transfer amounts in-flight (rewriting pipeline). Each feature has a factory registered in the System Addon Registry for CREATE2 deployment.

Available features organized by category:

| Category | Features |
|----------|----------|
| Fees & Charges | Transaction Fee (rewriting), Transaction Fee Accounting, External Transaction Fee, AUM Fee |
| Governance & Snapshots | Historical Balances, Voting Power (ERC-5805), Permit (EIP-2612) |
| Lifecycle & Yield | Maturity Redemption, Fixed Treasury Yield |
| Transformation | Conversion (loan-side), Conversion Minter (equity-side) |

**Compliance modules** (12 modules across 6 categories) enforce transfer and supply rules through the ERC-3643 compliance engine. Modules can be added, removed, or reconfigured at runtime under GOVERNANCE_ROLE. Two-tier architecture: per-token configuration plus system-wide global modules. The SMART Identity Verification module uses an RPN (Reverse Polish Notation) expression engine for arbitrary eligibility logic (AND/OR/NOT over identity claims). Sequential evaluation with single-veto blocking.

Available modules organized by category:

| Category | Modules |
|----------|---------|
| Geographic Restrictions | Country Allow List, Country Block List |
| Identity Access Control | Identity Allow List, Identity Block List, Address Block List |
| Claim-Based Verification | SMART Identity Verification (RPN expression engine) |
| Supply & Investor Limits | Token Supply Limit, Investor Count, Capped |
| Time-Based Rules | Time Lock (FIFO batch tracking) |
| Transfer Controls | Transfer Approval, Collateral |

Seven pre-seeded regulatory compliance templates ship out of the box: MiCA EU, Reg D 506(b), Reg D 506(c), MAS Singapore, UK FCA Securities, Japan FSA, and Reg CF Crowdfunding. Organizations create custom templates via the platform UI.

The DALPAsset factory accepts a free-form `assetTypeName` string (not limited to the 7 presets), any combination of features and compliance modules, and key-value metadata. Organizations can define custom asset classes, custom compliance templates, and custom feature implementations.

All configuration changes require the GOVERNANCE_ROLE. Multi-signature or timelock governance is recommended for production deployments.

### 2.2.4 UUPS Proxy Upgrade Pattern

DALPAsset contracts are deployable as either upgradeable (using the UUPS proxy pattern) or immutable. Under the UUPS (Universal Upgradeable Proxy Standard) pattern:

- The proxy contract holds the state (token balances, compliance configuration, identity data) and delegates all calls to an implementation contract.
- Upgrade logic lives in the implementation contract itself, not in the proxy. This means the implementation must explicitly authorize upgrades, preventing unauthorized contract replacement.
- Upgrades replace the implementation address in the proxy while preserving all on-chain state. Token addresses remain stable across upgrades.
- The choice between upgradeable and immutable deployment is made at factory creation time. Immutable deployment is available for regulatory or legal frameworks that require compile-time guarantees.

Switching between upgradeable and immutable deployment affects proxy behavior but does not change the factory deployment sequence.

### 2.2.5 CREATE2 Deterministic Deployment

All asset types are deployed through a factory pattern using CREATE2, which provides deterministic contract addressing:

1. The factory receives a createAsset call and deploys a proxy via CREATE2 with a deterministic address derived from the deployment parameters.
2. The factory registers an OnchainID identity contract for the token.
3. The proxy is initialized with the identity and delegates to the implementation contract.
4. Required system roles are assigned and a TokenDeployed event is emitted for indexing.

The factory transaction is atomic. If any step fails, the entire deployment reverts. No partially deployed tokens can exist on-chain.

**Key invariants enforced by the factory:**

- CREATE2 determinism: token addresses are predictable from deployment parameters. The same parameters always produce the same address.
- Initialization order: identity must be set before compliance, compliance before transfers are enabled.
- Role completeness: all required roles are assigned atomically. If any assignment fails, the entire deployment reverts.

**Administrative controls** are built into every asset through the Custodian extension, supporting forced transfers (for court orders, inheritance, regulatory seizures), account freezing (full or partial), token recovery (two-step identity recovery for lost keys), and batch operations for operational efficiency. All custodian actions emit events for auditability.

---

## 2.3 Middleware Layer

The middleware layer sits between the API surface and the blockchain networks. It handles the operational complexity of blockchain interaction: workflow orchestration, cryptographic key management, transaction signing, event indexing, and multi-network routing.

These services are internal to the platform. External consumers never interact with them directly.

### 2.3.1 Core Infrastructure Services

| Service | Responsibility |
|---------|---------------|
| **Execution Engine** | Reliable workflow orchestration with persistent state and exactly-once semantics, built on Restate. All stateful operations run through durable workflows that survive infrastructure failures, process restarts, and network partitions. |
| **Key Guardian** | Secure cryptographic key storage with HSM and cloud KMS integration (AWS, Azure, GCP). Manages key generation, storage, and rotation. |
| **Transaction Signer** | Transaction preparation, gas estimation, nonce management, and signing. Supports EIP-1559 gas pricing and meta-transactions (ERC-2771). |
| **Contract Runtime** | Smart contract interaction layer handling ABI encoding/decoding, call routing, and event parsing. |
| **Chain Indexer** | Blockchain event processing, data translation, and queryable state projection. One indexer virtual object per chain ID. |
| **Chain Gateway** | Multi-network connectivity with failover and load balancing across RPC providers. |
| **EVM RPC Node** | Blockchain network access for transaction submission and state queries. |
| **Feeds System** | Trusted market data feeds for pricing, NAV calculations, and reference data with configurable sources. |

### 2.3.2 Transaction Processing Architecture

DALP treats transaction management as a first-class runtime capability with dedicated services:

- **Nonce coordination**: A Restate-backed virtual-object service serializes nonce allocation per address and chain ID. It performs atomic consume-and-broadcast for local signer flows and includes self-healing behavior for nonce conflicts (re-reads on-chain state, advances, and retries up to three times before surfacing a terminal error). Operator repair surfaces are explicit: sync with on-chain state, reset, force-set, and full history.
- **External signer abstraction**: A provider-agnostic service normalizes wallet creation, signing, and approvals across local, DFNS, and Fireblocks custody backends. Provider health is a first-class concern with dedicated health-check APIs.
- **Transaction processor**: A partition-locked Restate virtual-object service that owns queued transaction submission, broadcast branching (local vs. provider-native), confirmation polling, reconciliation, and cancellation via replacement-by-fee. It appends ERC-8021 attribution to transactions for on-chain provenance tracking.

### 2.3.3 Authentication and Authorization Middleware

The middleware chain converts authenticated HTTP requests into tenant-scoped, permission-aware operation contexts:

- **Session and API key resolution**: Supports browser sessions (via Better Auth) and organization-scoped API keys. Endpoints can restrict which authentication methods are accepted. Read-only API keys are scope-enforced.
- **Organization role synchronization**: On-chain access-control state is synchronized into organization membership roles at sign-in time, so off-chain platform permissions stay aligned with chain-authoritative role assignments.
- **System context hydration**: Resolves the active system instance, validates bootstrap readiness, and derives user-specific permissions from on-chain roles into a reusable request-scoped projection.
- **Token context gating**: Resolves token-specific access, derives caller actions from on-chain roles and trusted-issuer claims, and enforces token-interface and role requirements before mutations execute.

### 2.3.4 Monitoring and Observability

A Restate-managed monitoring service suite provides:

- Automated health collection with blockchain-specific polling (RPC and indexer endpoints)
- Hysteresis-based health classification (three-sample threshold before status changes)
- API metrics rollup with hourly aggregation
- Configurable data retention windows
- Real-time SSE event publishing for operational dashboards

---

## 2.4 API Layer

### 2.4.1 Unified API

The Unified API exposes all DALP platform capabilities through a type-safe, documented interface. It provides OpenAPI 3.1 specifications generated directly from procedure definitions, so documentation stays synchronized with implementation. Interactive exploration is available through Swagger UI at the /api endpoint.

Procedures are organized by domain namespace:

| Namespace | Purpose |
|-----------|---------|
| token | Asset lifecycle operations (create, mint, burn, transfer, pause) |
| user | User management (list, assign roles, manage permissions) |
| account | Wallet operations (generate address, check balance, sign) |
| contact | Investor relationships (register, record verifications) |
| asset | Asset metadata (update documents, configure compliance) |
| system | Platform administration (health, configuration, audit logs) |

The API supports three authentication methods: session-based authentication (browser), API keys (system integration), and enterprise SSO. Blockchain-writing operations can additionally require wallet verification through PIN, TOTP, or backup codes.

**Meta-transaction support**: Through ERC-2771 integration, callers can submit signed transaction payloads without holding native tokens for gas. A configured relayer service sponsors transaction costs, enabling gasless workflows for investors and automated systems.

### 2.4.2 TypeScript SDK

DALP ships a public TypeScript SDK (@settlemint/dalp-sdk) as the recommended programmatic integration surface. The SDK provides:

- A typed client factory (createDalpClient) backed by the DALP v2 API contract
- Automatic serialization of blockchain value types (Dnum for arbitrary-precision decimals, BigInt, Date)
- Optional request and response validation through oRPC plugins
- Support for all API namespaces: account, actions, addons, admin, contacts, exchangeRates, externalToken, identityRecovery, monitoring, search, settings, system, token, transaction, and user
- Public npm package (@settlemint/dalp-sdk) targeting Node 20+ with ESM module format

The SDK enforces API key presence, validates base URLs, and applies security headers. It can reuse credentials from the DALP CLI (via dalp login).

### 2.4.3 Integration Points

| Integration Method | Use Case | Authentication |
|-------------------|----------|----------------|
| **REST API** (OpenAPI 3.1) | System-to-system integration, external application connectivity | API keys, session auth, SSO |
| **TypeScript SDK** | TypeScript/Node.js applications, rapid integration development | API keys |
| **Webhooks** | Event-driven notifications for transaction confirmations, compliance state changes, asset lifecycle events | Configured per endpoint |
| **Enterprise messaging** | Standards-based messaging for corporate actions, settlement instructions, and asset servicing integration with existing financial infrastructure | API keys |

---

## 2.5 Application Layer

### 2.5.1 Asset Console

The Asset Console is a full decentralized application built with React, providing the operational interface for:

- Asset lifecycle management (issuance, servicing, corporate actions, retirement)
- Compliance workflows (identity verification, claim management, transfer approvals)
- Portfolio views and holder management
- System monitoring and health dashboards
- Asset Designer wizard for multi-step token configuration
- Global search with role-aware token visibility
- Internationalization with four locales (en-US, de-DE, ar-SA, ja-JP) including right-to-left layout support

The console implements client-side effective-status derivation to compensate for indexer lag, and uses arbitrary-precision arithmetic (dnum library) for financial calculations to avoid floating-point errors in token amounts.

---

## 2.6 Network Support

DALP operates on any blockchain that implements the Ethereum JSON-RPC specification. No application code changes are required when switching networks. Configuration handles consensus differences, gas models, and confirmation requirements.

### 2.6.1 Supported Network Categories

**Layer 1 Mainnets**

| Network | Gas Model | Block Time |
|---------|-----------|------------|
| Ethereum | EIP-1559 (base + priority fee) | ~12 seconds |
| Polygon PoS | EIP-1559 variant | ~2 seconds |
| Avalanche C-Chain | EIP-1559 | ~2 seconds |
| BNB Smart Chain | Legacy gas pricing | ~3 seconds |

**Layer 2 Rollups**

| Network | Type | Settlement Layer |
|---------|------|-----------------|
| Arbitrum One | Optimistic rollup | Ethereum L1 |
| Optimism | Optimistic rollup | Ethereum L1 |
| Base | Optimistic rollup (OP Stack) | Ethereum L1 |
| zkSync Era | ZK rollup | Ethereum L1 |
| Polygon zkEVM | ZK rollup | Ethereum L1 |

**Private and Consortium Networks**

| Network | Consensus |
|---------|-----------|
| Hyperledger Besu | IBFT 2.0 or QBFT |
| Go-Ethereum (Geth) | Private PoA (Clique) or PoS |
| SettleMint managed networks | Managed private networks with genesis-allocated DALP contracts |

### 2.6.2 Multi-Chain Architecture

DALP supports simultaneous operation across multiple chains with the following isolation guarantees:

- **Identity isolation**: Each chain has its own identity registry. An investor's OnchainID is chain-specific.
- **Compliance isolation**: Compliance module configurations are per-chain, per-token.
- **Indexer isolation**: One Chain Indexer virtual object per chain ID.
- **Custody integration**: Fireblocks and DFNS support multi-chain asset wallets through the same vault.

Network-specific configuration is environment-variable driven. Parameters that vary include block confirmation count, gas price strategy, RPC batch limits, and chain ID.

---

## 2.7 Key Architectural Decisions

### Why EVM-Only

DALP targets exclusively EVM-compatible blockchains. This is a deliberate decision, not a limitation:

- **Ecosystem maturity**: The EVM ecosystem provides the most mature tooling, audited contract libraries, and institutional adoption for regulated financial instruments.
- **Standard compliance**: ERC-3643 (the compliance standard DALP builds on), ERC-20, ERC-734/735 (OnchainID), and ERC-2771 (meta-transactions) are all EVM-native standards. Porting these to non-EVM chains would require rewriting the compliance enforcement model from scratch.
- **Developer availability**: EVM/Solidity skills are the most widely available in blockchain development, reducing implementation risk for clients.
- **Interoperability**: EVM compatibility across L1s, L2s, and private networks (Hyperledger Besu) means the same contracts and tooling work everywhere without modification.

### Why Modular Compliance

Rather than hardcoding compliance rules into token contracts, DALP uses the ERC-3643 modular compliance engine where rules are separate contracts that the compliance orchestrator evaluates on every transfer:

- **Regulatory flexibility**: Different jurisdictions require different rules. Modular compliance allows per-token, per-jurisdiction configuration without redeployment.
- **Runtime reconfigurability**: Compliance requirements change. Modules can be added, removed, or reconfigured under governance control without migrating tokens or balances.
- **Composability**: Complex compliance scenarios (e.g., country restrictions AND investor limits AND timelock) are built by stacking independent modules, each testable and auditable in isolation.
- **Separation of concerns**: Token logic (ERC-20 transfers, balances) is cleanly separated from compliance logic (who can transfer, under what conditions), making both easier to audit.

### Why Factory Pattern with CREATE2

DALP deploys all assets through a factory pattern with CREATE2 deterministic addressing rather than direct contract deployment:

- **Predictable addresses**: Token addresses can be computed before deployment, enabling pre-configuration of external systems (custody, compliance, reporting).
- **Atomic deployment**: The factory wraps proxy deployment, identity registration, compliance initialization, and role assignment into a single atomic transaction. No partially deployed tokens can exist.
- **Standardized initialization**: Every token goes through the same factory sequence with enforced invariants (identity before compliance, compliance before transfers), eliminating misconfiguration risk.
- **System registration**: The factory automatically registers new assets with the system's identity registry, compliance orchestration, and access manager, so newly deployed tokens are immediately operational within the platform.
