# Section 5: Verification, Claims, and Data Feeds — Loop 1 Refresh

## Refresh Focus Areas

After comparing the existing Section 5 content against the latest DALP codebase (identity factory V2, trusted issuers meta registry V2, feeds directory implementation, compliance modules), the following areas need improvement:

1. **Executive Summary** — too internal/technical, needs client-centric reframing
2. **Identity Factory V2 auth model** — not reflected in current content (V2 delegates to directory's DIRECTORY_ADMIN_ROLE)
3. **Compliance modules prose quality** — Section 5.4.4 is too list-heavy, needs narrative
4. **Feeds Directory validation** — schema hash normalization, decimal matching on replacement, topic registration validation not covered
5. **Competitive positioning** — absent throughout
6. **Client-centric framing** — sections read like internal documentation, not proposal prose

---

## Refreshed Executive Summary

Regulated institutions face a fundamental trust problem when moving financial assets to digital infrastructure: how do you ensure that every participant in a transaction is who they claim to be, that every transfer complies with applicable regulations, and that the market data driving valuation and distribution decisions is reliable and auditable?

DALP's verification and data feed architecture addresses this challenge through three integrated capabilities. First, on-chain identity verification through OnchainID provides a persistent, tamper-evident record of every participant's verified credentials, anchored to cryptographically signed claims rather than centralized database entries. Second, a configurable compliance engine evaluates those credentials against regulatory rules before any transaction executes, blocking non-compliant transfers at the protocol level rather than detecting violations after the fact. Third, a purpose-built data feed infrastructure delivers price, NAV, and corporate action data through cryptographically signed, on-chain channels with full audit trails.

These three capabilities converge into what makes DALP fundamentally different from platforms that treat identity and market data as external integrations to be bolted on after deployment. In DALP, verification is not a feature. It is the architectural foundation that every digital asset operation depends on. An investor verified for one asset does not need to re-verify for another. A compliance rule configured for MiCA enforcement can coexist alongside Reg D rules on the same platform without code changes. A price feed consumed by a compliance module uses the same trust infrastructure as the price feed consumed by an external DeFi protocol through a Chainlink-compatible adapter.

This architecture means compliance officers configure regulatory requirements through a single operational surface, auditors trace every decision back to specific claims and feed values through standard SQL queries, and operations teams monitor the compliance posture of the entire platform through real-time analytics views.

---

## Refreshed 5.1.1: The Identity Model (Client-Centric Reframing)

Every participant in a regulated securities ecosystem must be identifiable, verifiable, and auditable. DALP addresses this requirement through OnchainID, an identity protocol based on the ERC-734/ERC-735 standards that provides a fundamentally different approach to identity management compared to traditional centralized databases.

Each participant, whether an individual investor, an institutional entity, or a smart contract, is represented by a dedicated on-chain identity contract. This contract serves as a persistent, tamper-evident identity anchor that cannot be silently modified by a database administrator or compromised through a single application-layer breach. The identity contract is the canonical record of who a participant is and what has been verified about them.

Identity attributes such as KYC completion, accreditation status, jurisdictional eligibility, and AML clearance are represented as cryptographically signed claims attached to the identity contract. Each claim is traceable to the trusted issuer that created it, establishing a verifiable chain of trust that auditors can follow from the claim consumer back to the original verification provider. This traceability is not a reporting feature added after the fact; it is inherent in the data model.

For institutions operating multi-asset programmes, this architecture eliminates a significant operational burden: redundant verification. Once an investor's identity is verified and claims are issued, those credentials apply across all assets and transactions on the platform. An investor verified for a bond issuance does not need to repeat the KYC process for a subsequent fund subscription, provided the claim topics and issuer trust chain remain valid.

Claims include optional expiration timestamps that the compliance engine respects without exception. When a KYC claim expires, the system blocks transfers regardless of previous compliance history. There is no grandfather exception for stale verification, which means re-verification deadlines are architecturally enforced rather than dependent on operational discipline.

This approach contrasts with platforms that store identity data in application-layer databases and enforce compliance through middleware rules that can be bypassed, misconfigured, or inconsistently applied across different asset types. In DALP, identity verification is an on-chain primitive that the compliance engine evaluates at the protocol level, and that evaluation happens before every transaction, not as a batch review after the fact.

---

## Refreshed 5.1.2: Identity Lifecycle (Updated for V2 Auth Model)

The identity lifecycle in DALP follows a structured progression from creation through ongoing verification, with recent architectural improvements that simplify deployment while maintaining security guarantees.

**Identity Creation**: When a participant is onboarded, DALP deploys an OnchainID identity contract through the Identity Factory. The V2 factory implementation delegates authorization to the platform directory's administrative role rather than maintaining a local admin role, which means the deployment infrastructure can bootstrap identity contracts directly without requiring the system factory as an intermediary. This architectural simplification reduces the number of privileged transactions during system setup while maintaining the same security invariants: only authorized platform administrators can create identity contracts.

For smart accounts (ERC-4337), identity creation is atomic with account deployment, and the factory automatically issues a `DALP_WALLET` claim that identifies the identity as a platform-managed smart account. This automation ensures that every wallet participating in the ecosystem has a verifiable identity from the moment it is created.

**Identity Registration**: The created identity is bound to the participant's wallet address through the Identity Registry. DALP supports two registration models to accommodate different onboarding workflows:

Self-service registration allows participants who hold their own wallet management keys to register their identity directly. Admin-initiated registration enables platform administrators to register identities on behalf of invited users through batch operations, supporting bulk onboarding workflows where individual blockchain transactions from each participant would create unacceptable friction.

**Claim Issuance**: Trusted issuers attach verifiable claims to identities through two pathways. Auto-claims are issued programmatically by the platform based on KYC review outcomes, with server-side validation ensuring that claim values match approved profile data. Manual claims are issued by trusted issuers through the API or dApp interface. Both pathways enforce the same validation and queue semantics, preventing inconsistencies between programmatic and manual claim issuance.

**Identity Recovery**: DALP provides a durable, phase-tracked recovery workflow for lost or compromised wallet access. The recovery process proceeds through deterministic phases: creating a new wallet, deploying a replacement identity, executing on-chain recovery, revoking existing sessions and credentials, and migrating token balances. Each phase is persisted through the durable execution engine, which means the workflow survives infrastructure failures and can be monitored at every stage.

The recovery workflow includes preflight recoverability checks that identify blocking conditions before destructive operations begin, a confirmation gate requiring explicit text input for irreversible actions, parallelized pre-checks for efficiency, and per-token balance migration with logging for partial failures. This level of recovery sophistication is critical for institutional deployments where wallet loss cannot mean permanent asset loss.

---

## Refreshed 5.3: Trusted Issuers Registry (Competitive Positioning Added)

### Three-Tier Trust Architecture

Managing trust in a multi-tenant, multi-asset environment requires more than a simple list of authorized identity providers. Different assets may require different verification providers, different tenants may have different compliance requirements, and platform-wide policies must apply consistently without requiring each tenant to independently configure them.

DALP addresses this through a three-tier Trusted Issuers Registry that provides granular control at every level:

**Subject-Scoped Issuers** allow the most precise control: a specific KYC provider authorized to issue claims only for a particular institutional fund, not for the entire platform. This granularity is essential for structured products where different tranches may require different verification standards.

**System-Scoped Issuers** apply across all identities within a specific organization (tenant). When a system is bootstrapped, default trusted issuers are registered at this level, providing a baseline verification infrastructure that applies to all assets within that organization.

**Global Issuers** apply platform-wide across all systems. The Global Trusted Issuers Registry, introduced in the V2 meta-registry implementation, consolidates trusted issuers that must apply universally. The most important example is the Identity Factory itself, which issues `CONTRACT` claims when deploying contract identities. Previously, each system had to independently register the Identity Factory during bootstrap; the global registry eliminates this duplication and ensures consistent trust infrastructure across all tenants.

The resolution order is deterministic: subject-scoped issuers take precedence over system-scoped issuers, which take precedence over global issuers. This cascading lookup ensures that institution-specific verification providers override platform defaults while maintaining a consistent baseline.

This three-tier model is architecturally enforced, not convention-based. The V2 meta-registry validates the global registry address through ERC-165 interface checks during both initialization and runtime updates, preventing misconfiguration. The global registry uses a distinct administrative role (`DIRECTORY_ADMIN_ROLE`) that is separate from per-system management roles, which means a tenant administrator cannot accidentally or intentionally register a trusted issuer whose claims would be accepted across other tenants.

Most competing platforms offer only a flat list of authorized identity providers with no scope differentiation. This means either every provider can issue claims for every asset (too permissive) or each asset must independently configure its trusted providers (operationally expensive and error-prone at scale). DALP's three-tier model eliminates this trade-off by providing scope-appropriate control at every level of the platform hierarchy.

---

## Refreshed 5.4.4: Compliance Modules (Prose Over Bullets)

### Configurable Compliance Module Library

DALP provides 18 configurable compliance module types, each addressing a specific regulatory requirement and operating independently at the smart contract level. These modules compose: multiple modules can be attached to a single token, and every module must pass for a transfer to execute. This composability enables sophisticated multi-jurisdictional compliance configurations without custom smart contract development.

**Identity and eligibility verification** forms the foundation of most compliance configurations. The SMARTIdentityVerification module is the most expressive mechanism in the library, evaluating logical expressions over identity claims using a Reverse Polish Notation (RPN) system that supports arbitrary AND, OR, and NOT combinations. This means a compliance officer can configure a rule such as "accredited investors OR (KYC verified AND AML cleared AND jurisdiction approved)" as a single expression, without writing code. Country-based allow and block lists restrict transfers based on participants' jurisdictional claims, while identity-level allow and block lists provide address-specific control for cases requiring individual approval or restriction, such as court-ordered freezes.

**Transfer control mechanisms** govern how and when assets can move between participants. The transfer approval module requires pre-approval before transfers execute, with configurable exemption expressions that allow institutional investors with verified credentials to trade freely while retail investors require manual approval. Time-lock enforcement imposes minimum holding periods before transfers are permitted, with identity-based exemptions so that qualified institutional investors can be exempt from lock-up periods that apply to retail participants. Transfer amount limits and transaction frequency controls provide rate-limiting at the individual transfer and participant level.

**Supply and participant governance** ensures that token operations respect both regulatory caps and structural requirements. Supply cap enforcement prevents token issuance beyond a configured maximum. Investor count limits cap the number of holders, with topic-based counting that enables sophisticated configurations such as limiting non-accredited investors to 35 (Reg D compliance) while imposing no cap on accredited investor count. The topic filter determines which investors are counted toward the limit rather than which are blocked, providing the flexibility that real regulatory frameworks require.

**Settlement and collateral controls** address the integrity of asset backing. Collateral ratio requirements enforce minimum backing ratios, and collateral backing verification confirms that adequate collateral exists before operations proceed. These modules reference the platform's data feed infrastructure for current collateral valuations, creating a direct link between market data and compliance enforcement.

The power of this module library lies in composition. A European bond issuance might combine identity verification with a MiCA-compliant expression, a country block list excluding sanctioned jurisdictions, an investor count module with a topic filter to cap non-institutional investors, and a time-lock module with exemptions for qualified institutional investors. All four modules evaluate independently during every transfer, and the transaction succeeds only if all four pass. Adding or removing modules does not require redeploying the token contract, which means compliance configurations can evolve with regulatory requirements without disrupting existing asset holders or their balances.

---

## Refreshed 5.5.1: Feeds Directory (Updated with Validation Details)

### The FeedsDirectory: Centralized Discovery, Decentralized Delivery

DALP's data feed system is built around a central registry called the FeedsDirectory. The directory separates discovery (which feed serves a given data request) from delivery (the individual feed contracts), creating an indirection layer that allows feeds to be replaced, upgraded, or rotated without disrupting consumers.

Each feed registration captures the subject (token address for asset-specific feeds, or zero address for global data such as FX rates), the data topic, the feed contract address, the feed kind (currently scalar for numeric values), and a schema hash that pins the expected data format.

The directory enforces strict validation during registration to prevent misconfigurations that could affect compliance decisions and valuations across the platform. Every feed must reference a topic that exists in the platform's Topic Scheme Registry; unregistered topics are rejected. For scalar feeds, the schema hash must match the canonical scalar format (the hash of the normalized tuple signature "(int256 value)"), with automatic normalization that handles both parenthesized and non-parenthesized input formats. The directory also validates that the feed contract actually implements the required interface through an ERC-165 check, preventing registration of contracts that cannot serve data.

Feed replacement follows even stricter rules. When replacing an existing feed, the directory requires that the replacement feed matches the original in kind, schema hash, and decimal precision. This prevents silent format changes that could break downstream consumers. If a feed format genuinely needs to change, the existing feed must be explicitly removed and a new feed registered, making the change visible and auditable rather than hidden within a replacement operation.

Write access to the directory is restricted to the Feeds Manager role at the system level. Global feeds (using the zero address as the subject) can only be managed by the Feeds Manager, not by individual token governance roles. This separation prevents asset-level operators from affecting economy-wide data such as FX rates or benchmark interest rates. Read access is unrestricted, which means any on-chain contract or off-chain consumer can query feed data.

This architecture ensures that feeds are discoverable through a single registry, replaceable without breaking integrations, and validated against a consistent set of integrity rules. Consumers reference the directory rather than hard-coding feed addresses, which means the platform can upgrade, rotate, or replace feed providers without requiring any consumer-side changes.
