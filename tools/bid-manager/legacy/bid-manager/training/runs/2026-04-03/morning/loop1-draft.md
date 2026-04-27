# Platform Architecture and Security — Proposal Section Draft

## Architecture Overview

DALP (Digital Asset Lifecycle Platform) is built as a four-layer stack where each layer enforces its own security controls independently. A user action in the Asset Console triggers an API call, which the middleware orchestrates into one or more blockchain transactions, which the smart contract layer validates and executes on-chain. No single-layer failure grants unauthorized access.

| Layer | Role | Key Capabilities |
|-------|------|-----------------|
| **Application** | Operator, issuer, and compliance officer interfaces | Asset Console (web UI), Asset Designer wizard, four-locale internationalization |
| **API** | Programmatic access for external systems | Unified API (OpenAPI 3.1), TypeScript SDK, webhooks, enterprise messaging |
| **Middleware** | Workflow orchestration, key management, indexing | Execution Engine, Key Guardian, Transaction Signer, Chain Indexer, Feeds System |
| **Smart Contract** | On-chain enforcement of compliance, identity, and asset logic | SMART Protocol (ERC-3643), DALPAsset contracts, compliance modules, token features, addons |

## Smart Contract Layer — SMART Protocol Foundation

All DALP smart contracts build on the SMART Protocol (SettleMint Adaptable Regulated Token), an implementation of the ERC-3643 standard. ERC-3643 defines a specification for regulated security tokens where every transfer must pass through a modular compliance engine before execution. This is not application-layer validation that can be bypassed; it is enforced by the smart contract itself.

SMART Protocol provides three foundational sub-layers. The token layer implements ERC-20 compatible contracts with compliance hooks and a modular extension system. The compliance layer orchestrates a configurable set of transfer rules evaluated before each transaction — rules can be added, removed, or reconfigured at runtime without redeploying the token contract. The identity layer manages on-chain identity via OnchainID (ERC-734/735), storing verifiable KYC/AML claims enforced as a prerequisite for transfers.

ERC-3643 was chosen over ERC-1400 for its modular compliance engine, on-chain identity integration through OnchainID, and active ecosystem support.

### DALPAsset: The Configurable Contract

DALPAsset is the recommended contract type for all new tokenization projects. It extends the SMART Protocol with the SMARTConfigurable extension, allowing token features and compliance modules to be attached and reconfigured at runtime after deployment. A DALPAsset token can evolve: start as a simple bearer instrument, then have fee structures added, governance enabled, or maturity and redemption logic configured — all without redeploying the contract.

Runtime-pluggable token features integrate through six lifecycle hooks (mint, burn, transfer, redeem, update, attach). Verified features include historical balances, voting power, permit (gasless approvals), AUM fee, maturity and redemption, fixed treasury yield, transaction fees with multiple variants, and conversion mechanisms.

Compliance modules enforce transfer and supply rules through the ERC-3643 compliance engine. Documented module types include identity verification, country restrictions, identity allow/deny lists, supply and investor limits, supply cap and collateral requirements, transfer approval workflows, and timelock restrictions. All configuration changes require the GOVERNANCE_ROLE, with multi-signature or timelock governance recommended for production deployments.

### Deterministic Deployment

All asset types deploy through a factory pattern using CREATE2 deterministic addressing. The factory wraps proxy deployment, identity registration, compliance initialization, and role assignment into a single atomic transaction. Token addresses are predictable from deployment parameters, enabling pre-configuration of external systems. No partially deployed tokens can exist on-chain — if any step fails, the entire deployment reverts.

## Middleware Layer

The middleware handles the operational complexity of blockchain interaction: workflow orchestration, cryptographic key management, transaction signing, event indexing, and multi-network routing. External consumers never interact with these services directly.

### Core Infrastructure

The Execution Engine provides reliable workflow orchestration with persistent state and exactly-once semantics through a durable workflow engine. All stateful operations run as durable workflows that survive infrastructure failures, process restarts, and network partitions.

The Key Guardian manages cryptographic key storage with HSM and cloud KMS integration across AWS, Azure, and GCP. The Transaction Signer handles transaction preparation, gas estimation, nonce management, and signing with EIP-1559 support and meta-transaction capability (ERC-2771).

A blockchain indexer processes on-chain events, translates data, and projects queryable state. The Chain Gateway provides multi-network connectivity with failover and load balancing across RPC providers. A Feeds System delivers trusted market data for pricing, NAV calculations, and reference data.

### Transaction Processing

DALP treats transaction management as a first-class runtime capability. Nonce coordination serializes allocation per address and chain ID through a durable workflow engine, with self-healing behavior for conflicts (re-reads on-chain state, advances, and retries up to three times). An external signer abstraction normalizes wallet creation, signing, and approvals across local, DFNS, and Fireblocks custody backends. A transaction processor manages queued submission, confirmation polling, reconciliation, and cancellation via replacement-by-fee, appending ERC-8021 attribution for on-chain provenance tracking.

### Authentication and Authorization Middleware

The middleware chain converts authenticated HTTP requests into tenant-scoped, permission-aware operation contexts. Session and API key resolution supports browser sessions and organization-scoped API keys. On-chain access-control state synchronizes into organization membership roles at sign-in time. System context hydration resolves the active system instance and derives user-specific permissions from on-chain roles. Token context gating resolves token-specific access and enforces role requirements before mutations execute.

## API Layer

### Unified API

The Unified API exposes all platform capabilities through a type-safe, documented interface with OpenAPI 3.1 specifications generated directly from procedure definitions. Interactive exploration is available through Swagger UI.

Procedures are organized by domain namespace: token operations (create, mint, burn, transfer, pause), user management, wallet operations, investor relationships, asset metadata, and platform administration. Three authentication methods are supported: session-based (browser), API keys (system integration), and enterprise SSO. Blockchain-writing operations can additionally require wallet verification through PIN, TOTP, or backup codes.

Meta-transaction support through ERC-2771 integration allows callers to submit signed transaction payloads without holding native tokens for gas, enabling gasless workflows for investors and automated systems.

### TypeScript SDK

DALP ships a public TypeScript SDK as the recommended programmatic integration surface. The SDK provides a typed client factory, automatic serialization of blockchain value types (arbitrary-precision decimals, BigInt, Date), optional request and response validation, and support for all API namespaces. It targets Node 20+ with ESM module format.

## Security Architecture

### Defense-in-Depth Model

DALP enforces defense-in-depth across five independent control layers: identity verification, role-based access control, transaction-level wallet verification, on-chain compliance enforcement, and custody provider policy evaluation. Each layer operates independently — a compromised session token is blocked by wallet verification, a bypassed API authorization check is blocked by on-chain compliance, and custody provider policies provide the final gate before any transaction reaches the blockchain.

### Authentication

The platform supports multiple authentication methods appropriate to different operational contexts: email and password for standard access, passkeys (WebAuthn/FIDO2) for phishing-resistant hardware-bound authentication, LDAP/Active Directory for corporate directory integration, and OAuth 2.0/OIDC and SAML 2.0 for enterprise SSO.

Browser sessions use HTTP-only cookies with Secure and SameSite attributes, expiring after 7 days with a 24-hour refresh window. Machine-to-machine integrations authenticate with scoped API keys, hashed in storage with cleartext shown once at creation, rate-limited at 10,000 requests per 60-second window.

### Wallet Verification (Step-Up Authentication)

Beyond session authentication, DALP enforces a dedicated second factor for all blockchain write operations. Even with a valid authenticated session, no on-chain transaction executes without the user proving wallet control through PIN, TOTP (RFC 6238), backup codes, or passkey challenge-response. There is no administrative override — recovery requires backup codes or credential re-enrollment.

### Role-Based Access Control

DALP enforces authorization through dual-layer permissions: off-chain platform roles control API and console access, while on-chain Solidity roles govern blockchain operations. The on-chain AccessManager contract is the authoritative source for all role assignments, with 26 distinct roles organized across platform, system, per-asset, and module layers.

Multi-tenant isolation is enforced at the database query level on every API request. Cross-tenant operations are not possible — each tenant has isolated membership, roles, assets, compliance records, and audit trails.

### Key Management

The Key Guardian service manages cryptographic material through defense-in-depth with escalating security tiers: encrypted database for development, cloud secret manager for standard production, HSM (FIPS 140-2 Level 3) for regulated financial services, and third-party MPC custody (DFNS, Fireblocks) for highest security requirements. Organizations select their tier based on regulatory obligations, with mixed deployments supported.

Both DFNS (threshold MPC with distributed key shards) and Fireblocks (MPC-CMP with continuous key refresh) ensure that no single private key ever exists in one place. A unified signer interface abstracts over all custody backends, so adding a new provider requires implementing the signer adapter, not changing platform workflows.

### Observability and Monitoring

The platform includes a three-pillar observability stack: time-series metrics capturing request rates, latencies, error rates, and blockchain-specific data; structured JSON logs with correlation identifiers linking related entries across components; and distributed traces following operations across component boundaries. Pre-built dashboards cover operations overview, transaction monitoring, compliance activity, security events, and infrastructure health.

Alert rules trigger notifications when metrics exceed thresholds, with routing to incident management systems for critical alerts, team channels for warnings, and email for informational notifications.

### Compliance Certifications

SettleMint holds ISO 27001 certification for information security management and SOC 2 Type II certification confirming that security controls operate effectively over extended audit periods. Beyond organizational certifications, DALP enforces regulatory compliance at the protocol layer through ERC-3643, where on-chain compliance modules evaluate every token transfer against configurable rules that cannot be bypassed by the application layer.

### Disaster Recovery

DALP supports multiple high-availability deployment patterns. The recommended cloud-native approach uses managed Kubernetes services with multi-AZ pod distribution, achieving RTO of 2 to 15 minutes and RPO of seconds to 1 minute through synchronous replication. Geographic redundancy via hot-warm active-standby clusters provides failover across regions. All critical operations run as durable, deterministic workflows with configurable retry handling and exponential backoff, ensuring completion even through transient failures.

## Network Support

DALP operates on any blockchain implementing the Ethereum JSON-RPC specification. No application code changes are required when switching networks. Supported networks include Layer 1 mainnets (Ethereum, Polygon PoS, Avalanche C-Chain, BNB Smart Chain), Layer 2 rollups (Arbitrum, Optimism, Base, zkSync Era, Polygon zkEVM), and private/consortium networks (Hyperledger Besu with IBFT 2.0/QBFT, Geth with Clique PoA). Multi-chain operation maintains identity, compliance, and indexer isolation per chain.
