# Configurable Compliance Framework

## Executive Summary

The real challenge in tokenization is not minting a token — it is doing it right at production scale. Compliance is where this complexity is most acute: meeting regulatory requirements across jurisdictions, enforcing governance before execution, and maintaining auditability across the full asset lifecycle. DALP's compliance architecture addresses this head-on, enforcing regulatory requirements **before execution, not after review**. Every token transfer, every investor onboarding, and every corporate action passes through a deterministic policy evaluation engine that validates eligibility, identity claims, and jurisdictional constraints at the smart contract layer — atomically. If a transfer would violate any configured rule, it reverts. There is never a state where non-compliant tokens exist in an unauthorized wallet.

This ex-ante enforcement model is built on the **ERC-3643 (T-REX)** standard and implemented through DALP's **SMART Protocol** — a production-hardened framework that combines on-chain identity verification, modular compliance rules, trusted issuer governance, and claim-based eligibility into a unified system. The result is a compliance infrastructure that regulated institutions can configure, audit, and extend without writing custom smart contract code.

The practical implication is simple: DALP turns compliance from a patchwork of legal interpretation, manual review, and off-chain operational controls into a programmable control plane. That does not remove the need for legal analysis or compliance teams. It does something more useful: it gives them an execution environment where approved policy is actually enforced.

DALP's compliance system is fully composable: 12 modules across 6 categories can be mixed, matched, added, and removed at any time, even after deployment. Per-token configuration means each token has its own compliance stack, while system-level global modules apply across all tokens. The RPN (Reverse Polish Notation) expression engine allows arbitrary eligibility logic without custom code. Seven pre-seeded regulatory templates (MiCA EU, Reg D 506(b), Reg D 506(c), MAS Singapore, UK FCA, Japan FSA, Reg CF) provide jurisdiction-ready starting points that organizations can customize or extend.

This document provides a comprehensive technical and operational reference for DALP's compliance capabilities, covering the ERC-3643 framework, identity and claims architecture, all twelve compliance module types organized across six categories, the two-layer policy model that bridges on-chain enforcement with custodian-level controls, the three-tier compliance interface hierarchy, KYC workflows with exception handling and remediation, regulatory framework mappings, and real-world deployment scenarios.

---

## 1. T-REX / ERC-3643 Framework

### 1.1 What ERC-3643 Is and Why It Matters

ERC-3643 — also known as the **Token for Regulated EXchanges (T-REX)** standard — is an open Ethereum standard that transforms basic fungible tokens into regulated security tokens. Unlike ERC-20, which only tracks balances and allows unrestricted transfers, ERC-3643 mandates four critical additions:

1. **Identity Registry**: Every token holder must have a verified on-chain identity before they can receive tokens.
2. **Compliance Engine**: All transfers pass through a modular compliance check that evaluates sender, recipient, and transaction context before execution.
3. **Trusted Issuers**: Identity claims (KYC status, accreditation, jurisdiction) must originate from pre-approved claim issuers — not self-asserted.
4. **Transfer Restrictions**: The token contract enforces rules that go beyond simple balance checks — investor limits, country restrictions, holding periods, and more.

The standard was developed specifically for regulated securities markets, not retrofitted from DeFi primitives. That distinction matters because securities regulation requires deterministic enforcement — not probabilistic monitoring, not advisory flags, not post-trade reconciliation. When a transfer violates policy, it must not execute. Period. ERC-3643 was designed from the ground up with this constraint, which is why it has emerged as the dominant standard for institutional tokenization programs globally.

DALP implements ERC-3643 through the **SMART Protocol** (SettleMint Asset Regulatory Technology). This is not a proprietary departure from the standard; it is a full implementation that follows the ERC-3643 specification while adding features required for institutional deployment: upgradeable compliance modules, multi-jurisdictional regulatory templates, deterministic parameter encoding, and richer claim-expression logic than most vanilla ERC-3643 deployments support.

ERC-3643 matters because it solves the actual problem institutions have. Regulated assets do not fail because teams cannot represent balances on-chain. They fail because the system cannot reliably answer questions like:

- Is this investor eligible to receive this asset?
- Is the transfer permitted in this jurisdiction?
- Has the investor passed KYC and AML?
- Is the issuer still within its issuance limit?
- Is a transfer agent approval required before settlement?
- Is the asset sufficiently collateralized for further minting?

ERC-3643 provides the enforcement hooks. DALP adds the operational and product architecture needed to use those hooks in the real world.

### 1.2 SMART Protocol Architecture

The SMART Protocol integrates with every DALPAsset token at the contract level. When a token is deployed through DALP's Asset Factory, the following compliance infrastructure is automatically wired:

| Component | Role |
|-----------|------|
| **Identity Registry** | Maps wallet addresses to verified on-chain identities (OnchainID) |
| **Global Compliance** | System-wide bypass list, global module orchestration, token-compliance binding |
| **Token Compliance** | Per-token compliance hooks that evaluate transfer eligibility |
| **Compliance Modules** | Individual rule implementations (country checks, investor limits, etc.) |
| **Trusted Issuers Registry** | Governs which entities can issue identity claims |
| **Claim Topic Schemes** | Defines the vocabulary of verifiable attributes |

Every transfer operation — whether initiated by a holder, an operator, or a programmatic API call — flows through this stack:

```
Transfer Request → Identity Resolution → Compliance Module Evaluation → Transfer Execution (or Revert)
```

There is no implicit soft-fail path. There is no warning mode where a token transfer completes but gets flagged later. If the transfer violates policy, it does not happen. This fail-closed design is fundamental to the architecture. Auditors, regulators, and compliance officers can rely on a simple invariant: if a token exists in a wallet, every transfer that placed it there passed every compliance check that was active at the time.

### 1.3 Where Compliance Is Enforced

Compliance is enforced on more than just standard wallet-to-wallet transfers:

| Operation | Identity Lookup | Compliance Check | Result if Failing |
|-----------|-----------------|------------------|-------------------|
| **Transfer** | Sender + recipient | All configured modules | Transaction reverts |
| **Mint** | Recipient | All configured modules | Mint reverts |
| **Burn / Redemption** | Sender | Modules evaluated; recipient checks skip `address(0)` | Burn/redeem reverts |
| **Forced transfer** | Bypassed | Compliance skipped | Executes without compliance checks |

That last row matters. Forced transfer is an issuer-only emergency mechanism under ERC-3643. It exists for reasons like court orders, estate handling, recovery, or regulatory intervention. It is not a convenience feature. Institutions need it, but they also need to treat it as exceptional because it bypasses the standard compliance path. DALP's audit trail records forced transfers distinctly from standard transfers, ensuring that any compliance bypass is visible in the event log.

---

## 2. Two-Layer Policy Model

DALP's compliance architecture operates through a deliberate two-layer enforcement model that separates on-chain programmable rules from off-chain custodial controls. This separation is not a limitation — it reflects the reality of how regulated digital assets operate in production.

### 2.1 Layer 1: DALP On-Chain Compliance

Layer 1 is the on-chain compliance layer. This is where DALP's compliance modules execute — enforcing transfer rules via ERC-3643 hooks and DALP-native compliance contracts. Every module described in this document operates at Layer 1.

Layer 1 enforces:

- **Identity eligibility**: Does the participant have the required claims?
- **Jurisdictional restrictions**: Is the transfer permitted for the relevant countries?
- **Transfer policies**: Is the transfer within amount limits, investor count caps, or supply constraints?
- **Temporal controls**: Has the holding period elapsed? Is the transfer pre-approved?
- **Issuance controls**: Is the minting within cap? Is collateral sufficient?

All Layer 1 rules execute deterministically at the smart contract level. They are transparent, auditable, and immutable once configured (though the configuration itself can be updated through governed administrative operations). Transaction amount limits are enforced at the DALP layer through a dedicated TransferPolicy mechanism, allowing institutions to set per-transfer, per-period, or per-identity amount thresholds.

### 2.2 Layer 2: Custodian Policy Enforcement

Layer 2 covers rules enforced by custodians for assets held in external custody. These are controls that operate outside DALP's on-chain scope but remain part of the overall compliance posture.

Layer 2 covers scenarios like:

- **Custodian-specific KYC/AML requirements** that go beyond what on-chain claims capture
- **Segregation of duties** within custodial operations
- **Regulatory reporting obligations** specific to the custodian's jurisdiction
- **Additional transfer restrictions** that the custodian imposes as part of their license conditions
- **Beneficial ownership registries** maintained off-chain by the custodian
- **Client money rules** and asset segregation requirements

The two-layer model means DALP does not attempt to absorb every possible compliance obligation into smart contracts. Some rules are inherently off-chain — they depend on human judgment, custodial relationships, or regulatory reporting processes that cannot be meaningfully encoded on-chain. By explicitly acknowledging this boundary, DALP avoids the trap of over-promising on-chain enforcement and under-delivering on operational completeness.

### 2.3 How the Layers Interact

In practice, the two layers operate complementarily:

1. **DALP Layer 1** prevents non-compliant transfers from executing on-chain
2. **Custodian Layer 2** adds additional controls for assets within custodial scope
3. **Neither layer can override the other** — both must be satisfied for a transfer to be operationally complete

For a bank deploying tokenized bonds with an external custodian, this means:
- The on-chain compliance modules enforce investor eligibility, jurisdictional rules, and transfer limits
- The custodian enforces their own client onboarding standards, segregation requirements, and regulatory reporting
- The issuer configures Layer 1 through DALP; the custodian configures Layer 2 through their operational policies

This dual enforcement model is what regulators actually expect. No regulator believes that smart contract code alone constitutes a complete compliance framework. They expect layered controls with clear accountability at each level.

---

## 3. Three-Tier Compliance Interface Hierarchy

DALP's compliance contract layer uses a three-tier interface hierarchy that separates system-wide, per-token, and standard-compliant concerns. This architecture, formalized in the platform's contract reorganization, provides clean separation of responsibilities while maintaining backward compatibility with deployed assets.

### 3.1 Tier 1: IDALPGlobalCompliance

System-wide compliance governance. This is the top-level compliance interface that manages:

- **Global bypass list**: Addresses that are exempt from compliance checks across all tokens. Used for system contracts, treasury operations, and controlled exceptions. Bypass list management is exclusively at this tier — per-token compliance cannot independently exempt addresses.
- **Global compliance modules**: Modules that apply across all tokens in the system, not just individual assets
- **Token-compliance binding**: The mapping between token contracts and their compliance engines

Global compliance is administered by platform-level roles, not by individual token issuers. This ensures that system-wide policies (like sanctions list enforcement or platform-level bypass rules) cannot be overridden by asset-level configuration.

### 3.2 Tier 2: IDALPTokenCompliance

Per-token compliance hooks. Each token has its own compliance contract that evaluates transfers against the modules configured for that specific asset. This tier provides:

- **Asset-specific module configuration**: Each token can have a unique combination of compliance modules
- **Dual v1/v2 hook support**: Migration compatibility across protocol versions
- **Per-token administrative control**: Token issuers can manage their asset's compliance modules within the boundaries set by global compliance

The dual v1/v2 support is technically significant. DALP's v1 tokens use 4-argument compliance hooks (`canTransfer(token, from, to, amount)`), while v2 tokens use ERC-3643-aligned 3-argument hooks (`canTransfer(from, to, amount)`). A `tokenIsV2()` accessor determines which hook signature executes at runtime. This means the platform can support both legacy and current token implementations simultaneously — critical for institutions that deployed tokens under earlier versions and cannot force-migrate without disrupting live markets.

### 3.3 Tier 3: ISMARTComplianceV2

The ERC-3643-aligned compliance interface for new tokens. This is the target interface for all new deployments, providing clean 3-argument transfer validation that matches the standard specification. All new compliance modules are written against this interface.

### 3.4 Backward Compatibility and Migration

The original monolithic `IDALPCompliance` interface is preserved for ERC-165 backward compatibility across UUPS proxy upgrades. That matters because migration in regulated systems cannot rely on "everyone upgrades at once." DALP's hierarchy allows incremental migration without breaking deployed assets.

The practical consequence: an institution that deployed a bond token two years ago under v1 can continue operating that token unchanged while deploying new tokens under v2. The compliance infrastructure handles both simultaneously. For regulated markets where continuity of operation is non-negotiable, this is not a nice-to-have — it is essential.

---

## 4. Identity Registry and OnchainID

### 4.1 OnchainID: Verifiable On-Chain Identity

Every participant in a DALP-managed token system — investors, operators, issuers, and sometimes contracts — has an **OnchainID**: a smart contract deployed on-chain that stores verifiable claims about the holder's identity. OnchainID is not a self-sovereign identity wallet in the consumer-Web3 sense. It is a **platform-managed identity contract** that serves as the trust anchor for compliance decisions.

An OnchainID contract stores:

- **Claims**: Signed attestations about the identity holder (e.g., KYC verified, AML cleared, accredited investor, professional investor, issuer licensed)
- **Claim Topics**: Numeric identifiers that categorize claims
- **Management Keys**: Cryptographic keys authorized to manage the identity contract
- **Claim Issuers**: References to the trusted entities that signed each claim

The core design property is that **claims are issued by trusted third parties, not self-asserted**. A wallet holder cannot declare themselves accredited or KYC'd. A registered trusted issuer must attest to that fact by writing a signed claim to the holder's OnchainID contract.

This matters for institutional adoption because it provides a trust model that maps to how financial services actually work. In traditional finance, an investor's eligibility is not determined by the investor — it is determined by regulated intermediaries (KYC providers, compliance officers, regulators). OnchainID preserves that model while making the resulting attestations machine-readable, reusable, and verifiable on-chain.

### 4.2 ERC-734 and ERC-735 Under the Hood

OnchainID in DALP is built on two standards:

- **ERC-734** for key management
- **ERC-735** for claim management

**ERC-734 key types**:

| Purpose | Name | Controls |
|---------|------|----------|
| 1 | Management | Add/remove other keys |
| 2 | Action | Execute on behalf of identity |
| 3 | Claim | Sign and approve claims |
| 4 | Encryption | Decrypt data sent to identity |

**ERC-735 claim structure**:

| Field | Description |
|-------|-------------|
| Topic | What the claim certifies |
| Issuer | Trusted authority address |
| Signature | Cryptographic proof from issuer |
| Data | Verification payload |
| URI | Pointer to off-chain proof or metadata |

This architecture gives DALP something most off-chain KYC systems lack: a reusable, verifiable, machine-readable identity object that multiple assets can rely on without re-running the same review every time. An investor verified once for KYC and AML can have those claims referenced by multiple token compliance engines simultaneously — reducing onboarding friction while maintaining verification integrity.

### 4.3 Identity Registry Operations

The **Identity Registry** maps wallet addresses to OnchainID contracts. Before any token transfer can execute, the compliance engine resolves both sender and recipient through this registry:

1. Lookup sender wallet → sender identity
2. Lookup recipient wallet → recipient identity
3. Read relevant claims from each identity
4. Evaluate compliance modules against those claims
5. Allow or revert the transfer

If either party does not have a registered identity, the transaction fails immediately. That fail-fast behavior is important because it prevents wasted gas on downstream module evaluation.

Identity lifecycle operations include:

- **Identity creation**: Deploying a new OnchainID contract via the Identity Factory
- **Identity registration**: Binding a wallet address to an identity in the registry
- **Identity recovery**: Deterministic, operator-governed recovery workflow after wallet compromise or loss
- **Batch registration**: Administrative registration flows for invitation-based onboarding
- **Multi-wallet binding**: A single identity can be associated with multiple wallet addresses, maintaining claim continuity across operational wallets

### 4.4 Identity Verification Lifecycle

The actual lifecycle from "unknown participant" to "transfer-ready participant" looks like this:

1. **Off-chain verification** — KYC provider verifies identity, beneficial ownership, AML screening, jurisdiction, and any investor classification requirements
2. **Trusted issuer authorization check** — system verifies the issuer is allowed to issue claims for the relevant topic
3. **On-chain claim issuance** — issuer calls `addClaim` on the user's OnchainID
4. **Identity registration** — wallet-to-identity mapping is stored in the Identity Registry
5. **Runtime validation** — every token transfer rechecks the claim set at execution time

This matters because compliance is not "passed once forever." If a claim expires, gets revoked, or the issuer is no longer trusted, future transfers can fail even if historical transfers succeeded. The system enforces a continuous compliance model, not a point-in-time one.

### 4.5 Identity Recovery and Continuity

Operationally, institutions care about wallet loss and recovery as much as initial onboarding. DALP's identity recovery flow is phase-tracked and fail-closed:

`creating-wallet` → `deploying-identity` → `recovering-identity` → `revoking-sessions` → `recovering-tokens` → terminal state

That means identity profile management is not just static profile storage. It includes operational continuity controls for regulated participants. For institutional deployments, that is essential — nobody wants a token program where a lost wallet means unrecoverable regulated assets.

The recovery flow ensures that:
- The new wallet inherits the same identity and claims
- Active sessions on the compromised wallet are revoked
- Token balances can be recovered through governed administrative operations
- The entire process is auditable and phase-gated — no step can be skipped

---

## 5. Claim Topics and Trusted Issuers

### 5.1 Claim Topics: The Compliance Vocabulary

Claim topics define **what can be verified** about an identity. They are large numeric identifiers registered in DALP's topic scheme, and they form the vocabulary that compliance modules use to make decisions.

DALP ships with a broad set of preset verification topics across four domains.

#### Investor verification topics

| Topic | Purpose | Typical Use |
|-------|---------|-------------|
| `knowYourCustomer` | Basic KYC verification | Identity validation and onboarding |
| `antiMoneyLaundering` | AML / CTF screening | Sanctions, PEP, adverse media |
| `accreditedInvestor` | Accredited investor status | US Reg D offerings |
| `accreditedInvestorVerified` | Verified accredited status with documentary support | Reg D 506(c) |
| `qualifiedInstitutionalInvestor` | Institutional investor qualification | Institutional-only offerings |
| `professionalInvestor` | Professional investor classification | MiFID II / regional equivalents |
| `regulationS` | Non-US person status | Regulation S offerings |

#### Issuer verification topics

| Topic | Purpose |
|-------|---------|
| `issuerLicensed` | Regulatory license or authorization |
| `issuerJurisdiction` | Legal domicile / oversight jurisdiction |
| `issuerProspectusFiled` | Prospectus filed |
| `issuerProspectusExempt` | Prospectus exemption claimed |
| `issuerReportingCompliant` | Ongoing reporting compliance |

#### Asset verification topics

| Topic | Purpose |
|-------|---------|
| `collateral` | Reserve or backing attestation |
| `uniqueIdentifier` | ISIN/CUSIP/custom identifier |
| `assetClassification` | Asset type and category |
| `basePrice` | Reference valuation |
| `assetIssuer` | Legal issuer link |
| `assetLocation` | Location metadata for RWA assets |

#### General topics

| Topic | Purpose |
|-------|---------|
| `contractIdentity` | Smart contract identity verification |
| `custom` | Custom organization-defined topic |

These topics are not just labels. They are enforcement inputs. A compliance module evaluates whether an identity has a valid claim under a topic, whether the issuer is trusted for that topic, whether the claim has expired, and whether the expression logic configured for the module is satisfied.

### 5.2 Auto-Claim Integrity Rules

DALP adds important validation at claim issuance time. Claim lifecycle control is not just a transport layer for issuer assertions.

**Auto-claim validation rules include**:

- Boolean investor/compliance topics only accept the literal string `true`
- `knowYourCustomer` claims require a DALP-resolved target identity
- The target identity must have an approved KYC profile with non-null `contentHash`
- The claim value must exactly match the approved KYC content hash before the claim can be issued
- Topic names are resolved against the registered topic-scheme list before dispatching issuance

That design closes a common institutional risk: a "trusted issuer" pushing arbitrary or malformed claims into the system. DALP adds topic-specific integrity contracts before the on-chain write happens. This is a meaningful differentiation from bare ERC-3643 implementations where claim content validation is left entirely to the issuer.

### 5.3 Trusted Issuers: Who Can Assert Claims

Not every entity can write claims that the system will accept. DALP maintains a **Trusted Issuers Registry** that governs which entities are authorized to issue which claim topics.

This is the trust root of the whole compliance system. If the issuer is not trusted for the topic, the claim is treated as invalid for enforcement purposes even if it exists on-chain. The registry is not a simple whitelist — it is a topic-scoped authorization matrix where each issuer is explicitly approved for specific claim types.

### 5.4 Three-Tier Trusted Issuer Resolution

DALP implements a hierarchical trusted issuer resolution model with three levels of specificity:

**Level 1: Subject-scoped** — Issuer trusted for a specific subject or identity context. This is the most specific level. If a subject-scoped trust entry exists for the relevant topic, it takes precedence over broader scopes. Use case: a specific investor has a dedicated compliance provider for their jurisdiction.

**Level 2: System-scoped** — Issuer trusted by a tenant or system deployment. This is the mid-level scope. A KYC provider trusted at the system level can issue claims for all identities within that system. Use case: the institution's primary KYC/AML provider.

**Level 3: Global** — Issuer trusted platform-wide across all systems and tenants. This is the broadest scope. Use case: the identity factory contract itself, which needs to be trusted globally to bootstrap identity creation.

Resolution follows a "most specific wins" model: subject-scoped overrides system-scoped, which overrides global. This hierarchy allows institutions to maintain a general trust framework while accommodating specific exceptions — exactly how trust relationships work in regulated financial services.

The **Global Trusted Issuers Registry** is a platform-wide singleton, deployed once and reused across systems. It is governed by `DIRECTORY_ADMIN_ROLE`, not by per-system roles. That matters operationally because it removes repeated bootstrap configuration for common global issuers like the identity factory. The global registry is feature-flagged as `directoryVNext` — disabled by default in production, enabled in development environments — to allow careful rollout of the consolidated trust model.

### 5.5 Configuring Trusted Issuers in Practice

Operationally, configuring a trusted issuer involves:

1. Resolving the issuer's **identity contract address** — not just their wallet address
2. Retrieving available claim topics from `/api/system/claim-topics`
3. Assigning one or more `claimTopicIds` to that issuer
4. Verifying the issuer appears in the trusted issuer list with the expected topic set

Key point: trust is **topic-specific**. An issuer trusted for KYC is not automatically trusted for collateral attestations or issuer licensing claims. This granularity prevents scope creep in trust relationships — a critical property for audit and governance.

### 5.6 Trusted Issuer Removal and Consequences

If a trusted issuer is removed:

- Existing claims from that issuer are no longer accepted for future compliance evaluation
- New claims from that issuer cannot be issued into the trusted domain
- Transfers relying on those claims can begin failing immediately
- The change takes effect at the next transfer attempt — there is no grace period

That is the right behavior for a regulated system, but it has operational consequences. Removing a trusted issuer is not an abstract directory cleanup task. It can affect live asset transferability. Institutions must plan issuer transitions carefully, ensuring replacement issuers are configured and claims re-issued before revoking trust from an outgoing provider.

---

## 6. OnchainID Claim Verification Flow

### 6.1 What Happens During Claim Verification

When a compliance module requires claim validation, DALP performs a deterministic sequence:

1. Resolve the identity for the relevant wallet
2. Read the claim for the configured topic(s)
3. Validate the issuer against trusted issuer resolution (subject → system → global)
4. Check whether the claim is expired or revoked
5. Validate the payload if module logic depends on specific fields
6. Feed the result into the module's boolean evaluation logic

If the module is configured with a single required topic, this is straightforward. If the module uses logical expressions, each topic evaluation becomes an input into the expression engine.

### 6.2 Expression Logic: RPN / Postfix Evaluation

DALP's SMARTIdentityVerification module uses a logical expression system based on **Reverse Polish Notation (RPN)**, also described in the docs as postfix evaluation. That allows arbitrary logical combinations of claims without hardcoding specific regulatory frameworks into the contract.

**Node types**:

| Node Type | Meaning |
|-----------|---------|
| 0 | TOPIC |
| 1 | AND |
| 2 | OR |
| 3 | NOT |

**Examples**:

| Requirement | Expression | Meaning |
|------------|------------|---------|
| KYC only | `[KYC]` | Single topic check |
| KYC AND AML | `[KYC, AML, AND]` | Both required |
| KYC OR accredited | `[KYC, ACCREDITED, OR]` | Either sufficient |
| (KYC AND AML) OR QII | `[KYC, AML, AND, QII, OR]` | Combined or institutional bypass |
| KYC but NOT sanctioned | `[KYC, SANCTIONED, NOT, AND]` | Inclusion with exclusion |

This is one of DALP's strongest compliance abstractions because it avoids baking every legal regime into custom code. Instead, institutions can encode the actual logical eligibility rule they need. A Reg D 506(b) offering that accepts accredited investors or a limited number of sophisticated non-accredited investors can be expressed as a logical formula rather than a custom contract modification.

### 6.3 Claims Are Checked at Execution Time

A subtle but critical point: claims are checked **when the transfer is attempted**, not only when the investor is onboarded.

That means:

- Expired claims fail
- Revoked claims fail
- Claims from issuers that lost trust fail
- Newly added compliance conditions can start applying to future transfers immediately
- An investor who was eligible yesterday may not be eligible today

This is exactly what regulated institutions need. Eligibility is not a one-time yes/no; it is a live condition. A securities regulator expects continuous compliance, not point-in-time onboarding. DALP's runtime validation model delivers exactly that.

### 6.4 Verification Artifacts and Type-Safe Encoding

DALP's compliance system uses a discriminated-union schema for its 12 concrete module type IDs. Each module type has a specific parameter encoding function (`encodeComplianceParams`) that validates and encodes configuration data for on-chain deployment. Unknown module types are rejected with a hard error — there is no fallback or best-effort encoding.

This type-safe approach means:

- Configuration errors are caught at deployment time, not at runtime
- Each module's parameters are validated against its specific schema
- The encoding is deterministic and auditable
- Invalid module type references fail immediately rather than silently misconfiguring

For institutions, this translates to confidence that their compliance configuration is exactly what they specified — there is no "close enough" in regulated systems.

---

## 7. Compliance Modules: The Complete Catalog

DALP supports **12 concrete compliance module types** organized into **six categories**. These modules represent the enforceable rule primitives that institutions configure when setting up a tokenized asset. Each module type has a specific type ID in the discriminated-union schema, with type-specific parameter encoding and validation.

### Module Quick Reference

The following table lists all 12 modules with their codebase-verified contract names, type identifiers, and primary function. Detailed descriptions follow in the category sections below.

| # | Contract Name | Type ID | Category | What It Does |
|---|--------------|---------|----------|--------------|
| 1 | SMARTIdentityVerificationComplianceModule | `identity-verification` | Eligibility | Evaluates logical expressions (AND/OR/NOT) over identity claims to determine investor eligibility |
| 2 | IdentityAllowListComplianceModule | `identity-allow-list` | Eligibility | Restricts token participation to a named list of approved identities (OnchainID contracts) |
| 3 | IdentityBlockListComplianceModule | `identity-block-list` | Eligibility | Blocks specific identities from receiving or transferring the asset |
| 4 | CountryAllowListComplianceModule | `country-allow-list` | Restriction | Only allows recipients from specified countries (ISO 3166-1 codes) |
| 5 | CountryBlockListComplianceModule | `country-block-list` | Restriction | Blocks recipients from prohibited countries |
| 6 | AddressBlockListComplianceModule | `address-block-list` | Restriction | Blocks specific wallet addresses regardless of identity status |
| 7 | TransferApprovalComplianceModule | `transfer-approval` | Transfer Control | Requires explicit pre-authorization before a transfer can execute; identity-bound, configurable expiry and one-time-use |
| 8 | TimeLockComplianceModule | `time-lock` | Transfer Control / Time-Based | Enforces holding periods using FIFO batch tracking with exemption support |
| 9 | TokenSupplyLimitComplianceModule | `token-supply-limit` | Issuance & Supply | Enforces minting limits (lifetime, fixed-period, or rolling-period) with optional base-currency conversion |
| 10 | CappedComplianceModule | `capped` | Issuance & Supply | Simple circulating supply cap -- `totalSupply() + mintAmount <= maxSupply` |
| 11 | InvestorCountComplianceModule | `investor-count` | Issuance & Supply | Restricts the number of unique holders with global and per-country limits |
| 12 | CollateralComplianceModule | `collateral` | Settlement & Collateral | Requires sufficient collateral proof (via ERC-735 claims) before minting can proceed |

**Proposal context**: In a typical regulated issuance, an institution selects a combination of these modules to match their regulatory requirements. A European bond might use modules 1 + 4 + 8 + 9 + 11. A GCC stablecoin might use modules 1 + 4 + 10 + 12. A private placement in Singapore might use modules 1 + 2 + 8 + 11 + 7. The modules compose through sequential AND evaluation -- every active module must pass for a transfer to succeed.

### Category 1: Eligibility Modules

Eligibility modules determine **who** can participate in transfers based on identity-linked attributes.

#### 7.1 Identity Verification (SMARTIdentityVerification)

The most expressive compliance module in DALP. Evaluates logical expressions over identity claims to determine investor eligibility.

**How it works**:
- Both sender and recipient must satisfy the configured expression
- Claims must exist, be issued by a trusted issuer, and be non-expired
- Expressions are validated at configuration time using RPN syntax
- Empty expression effectively disables the module

**Regulatory examples**:

| Framework | Expression | Meaning |
|-----------|------------|---------|
| MiCA EU Standard | `[KYC, AML, AND]` | Both KYC and AML required |
| Reg D 506(b) | `[ACCREDITED, KYC, AML, AND, OR]` | Accredited or KYC+AML |
| Reg D 506(c) | `[ACCREDITED]` | Only accredited investors |
| Japan FSA / QII carve-out | `[CONTRACT, KYC, AML, AND, OR]` | Corporate entity or KYC+AML |
| Professional investor-only | `[KYC, AML, AND, PROFESSIONAL, AND]` | KYC + AML + professional status |

#### 7.2 Identity Allow List

Only specific identities (OnchainID contracts) may receive the asset. This is a positive-list control that restricts participation to named investors.

**When to use**: Private placements, named-investor whitelists, institutional club deals, invitation-only offerings.

**Key property**: This operates at the identity level, not the wallet level. If an investor has multiple wallets linked to the same identity, all wallets are covered by a single allow-list entry.

#### 7.3 Identity Block List

Specific identities are blocked from receiving the asset. The inverse of the allow list, this is a negative-list control.

**When to use**: Compliance violations, legal disputes, failed re-KYC, restricted counterparties, court-ordered restrictions.

**Important distinction from address blocking**: Identity-level blocking follows the investor across wallet changes. An identity blocked on one wallet remains blocked even if the investor creates a new wallet — because the block is on the identity, not the address.

### Category 2: Restriction Modules

Restriction modules enforce **where** transfers can flow based on geographic or address-level criteria.

#### 7.4 Country Allow List

Only recipients from specified countries may receive the asset. Country is resolved from identity data stored in the identity registry.

**When to use**: Jurisdiction-restricted offerings, single-country offerings, MiCA EU-only distribution, domestic-only launches.

**Key behavior**: An empty allow list blocks all transfers — it does not default to "allow all." This fail-closed behavior ensures that misconfiguration results in blocked transfers rather than unrestricted ones.

#### 7.5 Country Block List

Recipients from blocked countries may not receive the asset. The negative-list counterpart to country allow.

**When to use**: Sanctions controls (OFAC jurisdictions), prohibited jurisdictions, export-control-style restrictions, avoiding markets without regulatory clarity.

**Key behavior**: An empty block list blocks no countries — it defaults to "allow all." This is the expected behavior for a negative list.

#### 7.6 Address Block List

Specific wallet addresses are blocked regardless of identity status. This is the fastest, most granular blocking mechanism.

**When to use**: Sanctioned wallets (OFAC SDN list addresses), compromised wallets, fraud-flagged addresses, addresses identified through chain analysis.

**Distinction from identity blocking**: Address blocking is wallet-specific. It does not follow the investor to other wallets. Use identity blocking for persistent per-investor restrictions; use address blocking for rapid response to specific wallet-level threats.

### Category 3: Transfer Control Modules

Transfer control modules govern **how** transfers execute — requiring approvals, enforcing time-based rules, or limiting transaction parameters.

#### 7.7 Transfer Approval

Requires explicit pre-authorization before a transfer can execute. Approvals are identity-bound, tuple-specific, and configurable.

Approvals are keyed on:
- Sender identity
- Recipient identity
- Amount

They can be:
- **One-time use**: consumed after a single transfer
- **Expiry-based**: valid only within a specified time window
- **Exemption-aware**: investors matching specific claim expressions can be exempted from the approval requirement

**Why this matters**: Many regulated securities workflows still require transfer-agent or compliance-officer review. DALP does not pretend that every market is fully automated. It gives institutions a programmable way to preserve human approval in a deterministic system while allowing exceptions for pre-qualified participants.

#### 7.8 TimeLock

Enforces a holding period using FIFO (First In, First Out) batch tracking. Every incoming transfer creates an acquisition batch with:
- Amount received
- Timestamp of receipt
- Unlock timestamp = received + configured hold period

On transfer, DALP walks the queue oldest-first and checks whether enough unlocked balance exists to satisfy the requested transfer amount.

**Why FIFO matters**: A holder may own a mix of locked and unlocked units acquired at different times. A naive balance-level timelock would be wrong — it could lock tokens that should be transferable or allow transfer of tokens that should still be locked. FIFO preserves acquisition history and enforces the hold period on each batch independently.

**When to use**: Lockup periods for initial investors, vesting schedules, resale restrictions under securities regulations, MAS-style mandatory hold periods for certain asset classes.

**Exemption support**: TimeLock supports exemption expressions, allowing qualified institutional investors or other specified investor classes to bypass the holding period requirement when regulations permit.

### Category 4: Issuance and Supply Modules

Issuance modules control **how much** can be created and under what conditions.

#### 7.9 Token Supply Limit

Enforces minting limits using one of three modes:
- **Lifetime cap**: Total amount that can ever be minted
- **Fixed-period cap**: Maximum minting within a defined calendar period
- **Rolling-period cap**: Maximum minting within a sliding time window

Supports optional **base-price conversion** for monetary cap enforcement. This allows institutions to define caps in currency terms (e.g., EUR 100M) rather than raw token quantities. The base price is referenced from the asset's identity claims, ensuring consistent valuation.

**When to use**: MiCA issuance caps (EUR-denominated), Reg CF dollar limits, crowdfunding program caps, rolling fundraising windows, any regime where total issuance is constrained.

#### 7.10 Capped Compliance Module

Simple circulating supply cap checked on minting: `totalSupply() + mintAmount <= maxSupply`.

**When to use**: Fixed-size bond issues, real estate fractionalization with fixed unit count, fixed-quantity offerings where the cap is a simple maximum.

**Distinction from TokenSupplyLimit**: CappedComplianceModule is a simpler, more efficient check when all you need is a hard cap. TokenSupplyLimit is for more complex scenarios involving time-based windows or currency-denominated limits.

### Category 5: Time-Based Rules

Time-based modules enforce temporal constraints on transfer activity.

The **TimeLock** module (described in Category 3, section 7.8) is the primary time-based rule in DALP. It enforces holding periods with FIFO batch tracking and supports exemption expressions for qualified participants.

Additional time-based capabilities include vesting period enforcement, where tokens are released according to a predetermined schedule, and transfer windows that restrict when transfers can occur (e.g., blackout periods around corporate events or reporting dates).

### Category 6: Settlement and Collateral Modules

Settlement and collateral modules enforce backing requirements and settlement conditions.

#### 7.11 Collateral Compliance Module

Requires sufficient collateral proof before minting can proceed. This module reads ERC-735 collateral claims from the asset's OnchainID identity and validates:

- The collateral claim exists on the asset identity
- The issuer of the collateral claim is trusted (checked against both the standard trusted issuer registry and extra trusted issuers configured specifically for this module)
- The claim is not expired
- The collateral ratio, expressed in basis points, is sufficient relative to the post-mint total supply

**When to use**: Stablecoins (proof of reserve), backed deposit tokens, over-collateralized instruments, any issuance model where minting must be backed by verified reserves.

**Extra trusted issuers**: The collateral module supports additional trusted issuers beyond the global registry. This allows institutions to designate specific auditors or reserve attestation providers without granting them broad claim-issuing authority.

#### 7.12 Settlement Rules

Settlement modules govern how transfers complete in the context of delivery-versus-payment (DvP) workflows, cross-chain settlement, and multi-party settlement scenarios. These rules ensure that asset transfers are coupled with the corresponding payment or consideration, maintaining atomic settlement guarantees.

---

## 8. Transfer Restriction Rules Engine

### 8.1 How Rules Compose

DALP composes rules through sequential module orchestration. Every configured module is evaluated in order. A transfer succeeds **only if all active modules pass**.

That creates an **AND** relationship at the module level.

Inside individual modules, more complex logic can exist:
- IdentityVerification can do `AND`, `OR`, and `NOT` across claims
- InvestorCount can filter who counts through its own expression logic
- TransferApproval and TimeLock can use exemption expressions

So the composition model is:

- **Across modules**: AND / fail-fast
- **Inside some modules**: configurable boolean logic

This two-level composition gives institutions fine-grained control: the overall policy is the conjunction of all active rules, but each rule can incorporate its own internal flexibility.

### 8.2 Precedence and Evaluation Order

Module ordering matters operationally, even though the outcome remains "all must pass." The best practice is to place cheap and restrictive checks first:

1. Identity existence / basic eligibility
2. Country restrictions
3. Identity/address lists
4. Manual approval / timelock
5. Investor counts / supply limits
6. Collateral or advanced issuance controls

Why? Gas and clarity. There is no reason to evaluate rolling-period issuance limits if the recipient doesn't even have a valid identity. Fail-fast ordering reduces gas costs for rejected transfers and provides clearer error messages.

### 8.3 Conflict Resolution

DALP does not try to auto-resolve conflicting rules. It resolves them the right way: **a single veto blocks the transfer**.

Examples:
- Identity verification passes, but country block list fails → transfer blocked
- Country allow list passes, but investor count limit exceeded → transfer blocked
- Transfer approval exists, but timelock still active → transfer blocked
- Investor is exempt from transfer approval, but not from country restrictions → country still blocks

This is the correct institutional model. Compliance conflicts should not be auto-negotiated by the platform. They should fail closed. This ensures that the most restrictive interpretation always prevails — which is what regulators expect.

### 8.4 Post-Transfer State Updates

After a transfer executes, DALP calls module post-hooks so modules can update state:
- Investor counts increment/decrement
- TimeLock records acquisition timestamps and batches
- Transfer approvals are consumed if one-time use
- Rolling windows update accumulated issuance totals

These hooks are part of the same transaction. If a post-hook fails, the whole transfer reverts. That preserves consistency between balances and compliance-state projections. There is never a state where a transfer completed but the compliance accounting is out of sync.

---

## 9. KYC / Verification Workflows

### 9.1 The KYC Lifecycle in DALP

KYC verification in DALP is not a binary on/off flag. It is a lifecycle with distinct states, review outcomes, and remediation workflows. The system supports the full operational reality of investor verification — including the cases where verification is not straightforward.

### 9.2 Review Outcomes

DALP supports three review outcomes for KYC submissions, handled through shared handlers that ensure consistency:

**Approve**: The submission is accepted. The KYC profile transitions to an approved state with a verified `contentHash`. This content hash becomes the claim value for the `knowYourCustomer` topic — the on-chain claim will contain the exact hash of the approved verification data.

**Reject**: The submission is declined. Rejection requires a minimum 10-character reason, ensuring that rejections are documented with sufficient explanation. A terse "no" is not acceptable — the system enforces that compliance decisions carry justification. This is important for audit trails and for the investor's right to understand why they were rejected.

**Request Update**: The submission requires additional information or corrections. This outcome creates an action request with:
- **requiredFields**: Specific data elements the investor must provide
- **dueAt** (optional): A deadline for the investor to respond
- The investor's profile transitions to a pending-update state
- The action request is tracked and visible in the compliance dashboard

### 9.3 Remediation and Fulfillment

When an update is requested, fulfillment is **user-owned and cross-request aware**:

- The investor is responsible for providing the requested information
- If multiple update requests exist, the system tracks each independently
- Fulfillment of one request does not automatically close others
- The pending-update state persists until all open requests are fulfilled
- Once all requests are addressed, the profile can proceed to re-review

This cross-request awareness matters for complex onboarding scenarios. An investor might have a pending document request from the KYC provider and a separate information request from the compliance team. Both must be satisfied before the profile can advance.

### 9.4 Auto-Claim Issuance and KYC Special Handling

For most boolean claim topics (accredited investor, AML screening, professional investor), DALP can auto-issue claims when the underlying verification is approved. The auto-claim system writes a `true` claim to the investor's OnchainID for the relevant topic.

**KYC is the exception.** The `knowYourCustomer` topic requires content hash verification — the claim value must match the approved KYC profile's content hash, not just a boolean `true`. This ensures that the on-chain KYC claim is cryptographically linked to the specific verification data that was reviewed and approved. If the verification data changes (e.g., the investor updates their information), a new claim must be issued with the new content hash.

### 9.5 Wallet Verification

Beyond identity-level KYC, DALP supports wallet-level verification for operational security. Three factor types are supported:

| Factor Type | Description |
|------------|-------------|
| **PINCODE** | User-selected numeric PIN |
| **SECRET_CODES** | Recovery codes for backup access |
| **OTP (TOTP)** | Time-based one-time password (authenticator app) |

**PASSKEY is explicitly unsupported** — the system rejects passkey-based verification attempts with a clear error, preventing silent fallback to an untested authentication path.

Additional security properties:
- **Replay protection**: Unique constraints prevent verification factor reuse
- **API-key session bypass**: Programmatic sessions using API keys can bypass wallet verification, allowing automated workflows (API integrations, batch operations) to function without interactive verification
- These controls ensure that human-facing sessions have strong authentication while machine-to-machine integrations remain functional

---

## 10. Regulatory Framework Mapping

DALP is a platform, not a law firm. It does not "make you compliant" by itself. What it does is provide implementation primitives that map cleanly to major regulatory control requirements. The following mappings show how DALP's modules address specific regulatory frameworks.

### 10.1 MiFID II Mapping

| MiFID II Concern | DALP Mapping |
|------------------|-------------|
| Professional vs retail categorization | Claim topics: `professionalInvestor`, `qualifiedInstitutionalInvestor` |
| Appropriateness / eligibility gating | IdentityVerification expressions combining investor classification claims |
| Jurisdiction-limited distribution | CountryAllowList / CountryBlockList |
| Restricted placement workflows | TransferApproval with compliance officer review |
| Shareholder record dates | Historical Balances feature (point-in-time snapshot) |
| Governance and control visibility | Voting Power + audit trails |
| Transfer agent controls | TransferApproval with one-time-use approvals |

DALP does not replace suitability assessments or best-execution obligations, but it can enforce who is even allowed to hold or receive the instrument. The platform provides the transfer-level controls; the institution's compliance function provides the judgment.

### 10.2 MiCA Mapping

MiCA is where DALP's modularity is especially useful. The regulation introduces specific requirements for crypto-asset issuers, service providers, and stablecoin operators that map directly to DALP's module catalog.

| MiCA Concern | DALP Mapping |
|-------------|-------------|
| KYC / AML gating for all participants | IdentityVerification with `[KYC, AML, AND]` expression |
| EU-only or selected-jurisdiction access | CountryAllowList with EU member state codes |
| Issuer licensing / authorization | `issuerLicensed` claim topic on issuer identity |
| Prospectus / white paper requirements | `issuerProspectusFiled` / `issuerProspectusExempt` claim topics |
| Issuance cap monitoring (EUR-denominated) | TokenSupplyLimit with base-price conversion |
| Reserve / backing enforcement for stablecoins | CollateralComplianceModule with collateral ratio checks |
| Ongoing reporting compliance | `issuerReportingCompliant` claim topic |
| Holder identification | Identity Registry with OnchainID binding |
| Redemption rights enforcement | Compliance modules ensure only eligible holders can redeem |

DALP's shipped MiCA-style template combines identity verification, country allow list, and token supply limits. That is a sane starting point for European regulated issuance programs.

### 10.3 SEC / US Securities Mapping

| US Concern | DALP Mapping |
|-----------|-------------|
| Accredited investor-only distribution | `accreditedInvestor` claim + IdentityVerification |
| Reg D 506(c) strict accredited requirement | IdentityVerification = `[ACCREDITED]` |
| Reg D 506(b) mixed sophistication logic | Expression-based logic: `[ACCREDITED, KYC, AML, AND, OR]` + InvestorCount |
| Reg S offshore restrictions | `regulationS` claim + country restrictions |
| Transfer-agent supervised transfers | TransferApproval |
| Holder count caps / private placement control | InvestorCount with global limits |
| Per-state investor limits | InvestorCount with per-country (per-state) sub-limits |
| Restricted resale / holding periods | TimeLock with FIFO batch tracking |
| Reg CF dollar-amount issuance limits | TokenSupplyLimit with base-price conversion |

DALP does not file Form D for you. It does not automate SEC legal analysis. It gives you the control plane to enforce the transfer rules your counsel approves.

### 10.4 MAS (Singapore) Mapping

The Monetary Authority of Singapore regulates digital asset activities under the Payment Services Act (PSA) and the Securities and Futures Act (SFA). DALP's modules map to MAS requirements as follows:

| MAS Concern | DALP Mapping |
|-------------|-------------|
| Fit-and-proper investor requirements | IdentityVerification with claim expressions matching MAS investor classifications |
| Accredited / institutional investor restrictions | `accreditedInvestor` / `qualifiedInstitutionalInvestor` claim topics |
| KYC / CDD obligations under PSA | IdentityVerification with `[KYC, AML, AND]` expression |
| Jurisdiction-scoped distribution | CountryAllowList restricting to Singapore or approved jurisdictions |
| Holding period requirements for certain asset classes | TimeLock with configurable period and FIFO batch tracking |
| Transfer controls for regulated securities | TransferApproval with compliance officer oversight |
| Investor count restrictions for private placements | InvestorCount with per-offering or per-jurisdiction limits |

### 10.5 VARA (Dubai) and DFSA (DIFC) Mapping

The Virtual Assets Regulatory Authority (VARA) in Dubai and the Dubai Financial Services Authority (DFSA) in DIFC have established digital asset frameworks that DALP's compliance modules can address. While these frameworks continue to evolve, the recurring control requirements map to existing module primitives.

| VARA / DFSA Concern | DALP Mapping |
|---------------------|-------------|
| KYC / AML for all virtual asset participants | IdentityVerification with `[KYC, AML, AND]` expression |
| Jurisdiction-restricted distribution | CountryAllowList / CountryBlockList (restrict to UAE, GCC, or approved markets) |
| Investor classification and suitability | Claim topics for professional / qualified investor status |
| Issuer licensing and authorization requirements | `issuerLicensed` claim topic on issuer identity |
| Reserve and backing requirements for stablecoins | CollateralComplianceModule with ratio enforcement |
| Transfer restrictions and compliance officer oversight | TransferApproval with one-time-use and expiry controls |
| Shariah-compatible structuring requirements | Configurable compliance templates with jurisdiction-specific claim topics [TO VERIFY: no explicit Shariah module in codebase; structuring is handled at the asset-design level] |
| Data residency within UAE / GCC | On-premises and private cloud deployment options (see section 10.7) |

DALP does not provide VARA or DFSA licensing. It provides the enforcement infrastructure that licensed entities need to meet the operational requirements of their license conditions.

### 10.6 FCA, FSA, and Other Jurisdictions

DALP's value is not that it ships a bespoke module for every country. It is that the same primitives cover recurring patterns:

- Jurisdiction restrictions (every regulator)
- Investor classification (professional, institutional, accredited -- every major market)
- Manual approval where required (transfer agent, compliance officer)
- Count limits (holder caps in many private placement regimes)
- Hold periods (common across securities frameworks)
- Collateral / reserve controls (stablecoin regulations globally)

That is why the template model works. Most regulatory regimes differ in parameterization and combinations of controls more than in totally unique blockchain semantics. An institution operating across Singapore (MAS), UK (FCA), Japan (FSA), and Dubai (VARA / DFSA) can use the same module types with different configurations for each jurisdiction.

### 10.7 Data Residency and Sovereignty

Regulated institutions -- particularly in the GCC, EU, and APAC -- face data residency requirements that constrain where investor data, transaction records, and compliance artifacts can be stored and processed. DALP addresses this through deployment flexibility, not through a single global SaaS instance.

**Deployment models supporting data sovereignty**:

| Model | Data Residency Control | Typical Use |
|-------|----------------------|-------------|
| **On-premises** | Full control -- all data remains within the institution's data center | Strict sovereignty requirements, air-gapped environments, central bank deployments |
| **Private cloud** | Client-managed cloud infrastructure in a specific region | Regional data residency (e.g., EU-only, GCC-only) with cloud operational benefits |
| **Managed SaaS** | Configurable by region (EU, MENA, APAC) with dedicated tenant isolation | Institutions that want SettleMint-managed operations with regional data placement |
| **Hybrid** | Component-level control -- compliance data on-premises, other components in cloud | Mixed requirements where some data must stay local while other services can be centralized |

**Key properties**:

- All deployment models deliver the same platform capabilities -- same compliance engine, same modules, same API surface
- On-premises deployments run the complete stack (PostgreSQL via CloudNativePG, Redis, application services) inside the customer's data center with no external data dependencies
- Managed SaaS uses dedicated tenant environments, not multi-tenant shared infrastructure
- Kubernetes and OpenShift support across all deployment models
- Backup and disaster recovery configurations respect the same residency boundaries as primary data

This means an institution in Abu Dhabi can run DALP entirely within UAE infrastructure, an EU bank can ensure all data stays within EU borders, and a Singapore-based fund can deploy within MAS-compliant infrastructure -- all using the same platform version with no feature differences.

### 10.8 Certifications and Security Posture

SettleMint maintains certifications that regulated institutions require during vendor assessment and due diligence processes.

**Current certifications**:

| Certification | Scope | Status |
|---------------|-------|--------|
| **ISO 27001** | Information security management system -- covers the establishment, implementation, maintenance, and continual improvement of information security controls across SettleMint's operations | Certified |
| **SOC 2 Type II** | Independent third-party audit confirming that SettleMint's controls for security, availability, and confidentiality meet AICPA Trust Services Criteria over an extended observation period | Certified |

**Ongoing security practices**:

- Regular penetration testing and security assessments conducted by independent third parties
- Vulnerability disclosure and responsible security practices
- Smart contract security audits by specialized blockchain security firms
- Successful completion of vendor risk assessments at tier-1 and tier-2 financial institutions

**Platform-level security controls**:

- Role-Based Access Control (RBAC) with principle of least privilege
- Multi-signature governance for sensitive operations (minting, burning, emergency freeze, contract upgrades)
- TLS encryption for all API communications
- OAuth 2.0 and OIDC authentication with short-lived tokens
- API rate limiting, IP allowlisting for administrative operations
- Secrets management via HashiCorp Vault or cloud provider secret stores
- SIEM integration for centralized security event monitoring

These certifications and controls are organizational -- they apply to SettleMint's operations and the platform itself. Institutions deploying DALP can reference these certifications in their own compliance documentation and regulatory filings.

### 10.9 Audit Trail and Reporting

Compliance is only as strong as its evidence base. DALP generates structured, immutable audit records for every compliance-relevant action, providing the evidence that regulators, auditors, and compliance officers need during examinations.

**What is recorded**:

| Event Category | Recorded Data |
|----------------|---------------|
| **Transfer compliance decisions** | Module evaluation results (pass/fail per module), identity resolution outcomes, specific error codes for rejections |
| **Claim lifecycle** | Claim issuance, expiration, and revocation events with issuer identity, topic, and timestamp |
| **Trusted issuer changes** | Addition, removal, and scope changes for trusted issuers with the affected topic set |
| **Identity registry updates** | Wallet-to-identity binding changes, identity creation, recovery events |
| **Administrative actions** | Bypass list modifications, module configuration changes, forced transfers with justification |
| **Transfer approvals** | Approval grants, consumption events, and expiration with the authorizing identity |
| **Investor count state** | Count increments, decrements, and limit evaluations by jurisdiction |
| **KYC workflow events** | Profile status transitions (pending, approved, rejected, update-requested), remediation actions, review outcomes |

**Reporting properties**:

- All events are on-chain and immutable -- they cannot be altered or deleted after the fact
- Events are indexed and queryable through DALP's API surface (REST, GraphQL, event webhooks)
- The structured error catalog provides machine-readable failure data with severity, audience, retryability, and suggested remediation actions
- Error messages support i18n (four locales), enabling multi-language compliance reporting
- Historical balance snapshots allow point-in-time ownership verification for record dates, tax reporting, and regulatory examinations
- Observability dashboards provide real-time visibility into compliance metrics: transaction approval rates, common rejection reasons, identity verification throughput, and claim expiration forecasts

**Regulatory examination readiness**:

For institutions subject to regulatory examinations, DALP's audit trail provides something that spreadsheet-based compliance cannot: a cryptographically tamper-proof, automatically generated, complete record of every compliance decision from day one. There is no gap between "what we say happened" and "what actually happened" -- the on-chain record is the record.

This audit infrastructure supports MiCA reporting requirements, MAS inspection protocols, VARA compliance reporting, FCA supervisory reviews, and SEC examination requests -- not because DALP generates jurisdiction-specific reports (it does not), but because the underlying data is complete, structured, and exportable in machine-readable formats that institutions can feed into their regulatory reporting pipelines.

---

## 11. Compliance Workflows in Detail

### 11.1 Pre-Issuance Compliance Setup

Before issuance, institutions typically need to establish:

1. **Who is allowed to invest** — define investor eligibility criteria
2. **What claims are required** — select and configure claim topics
3. **Who is trusted to issue those claims** — configure trusted issuers at appropriate scope
4. **Whether issuer-side claims exist** (license, prospectus, reporting compliance)
5. **Whether minting needs collateral backing or issuance caps** — configure supply and collateral modules
6. **Whether transfer approval, timelocks, or investor limits apply** — configure transfer control modules
7. **Country restrictions** — configure allow or block lists

DALP supports this through:
- Compliance template selection (pre-configured module combinations for common regulatory scenarios)
- Module parameter validation (type-safe encoding prevents misconfiguration)
- Trusted issuer registry configuration (three-tier resolution)
- Claim topic retrieval and configuration
- Class-aware asset claim issuance at creation time

### 11.2 Transfer Compliance Workflow

The transfer workflow is the heart of the system:

1. User initiates transfer
2. Compliance engine resolves identities for sender and recipient
3. Modules are evaluated in configured order
4. First failure reverts the transaction with a specific error code
5. If all modules pass, the transfer executes
6. Module post-hooks update state (investor counts, timelocks, approval consumption)
7. Events are emitted for audit indexing

This gives institutions something auditors actually like: a deterministic sequence with documented failure points and a clear audit trail.

### 11.3 Ongoing Monitoring and Maintenance

Compliance is not static after deployment. DALP enables ongoing monitoring through:

- **On-chain event trails**: Every compliance-relevant action emits indexed events
- **System stats**: Claims issued, trusted issuers configured, module evaluations
- **Dashboard visibility**: Module configuration, state, and effectiveness
- **Open action requests**: KYC remediation workflows with due dates and status tracking
- **Claim expiration monitoring**: Proactive identification of expiring claims that will affect transferability
- **Trusted issuer status**: Tracking of issuer authorization changes

### 11.4 Exception Handling and Appeals

DALP implements operational remediation, not legal adjudication.

For KYC and verification workflows:
- Profiles can be approved, rejected, or returned for updates
- Requested updates create structured action requests with due dates and required fields
- User-owned fulfillment closes requests when remediation is complete
- Pending update state persists until all open requests are fulfilled
- Rejection reasons are documented (minimum 10 characters) for audit and transparency

For transfer failures:
- Each failure returns a specific, decoded error with actionable guidance
- The error catalog includes severity, audience, retryability, and suggested action
- Institutions can use failure data to guide investor remediation

---

## 12. Contract Error Model and Auditability

DALP ships an auto-generated catalog of contract error codes with structured metadata. Compliance failures are not opaque revert blobs; they can be decoded into human-meaningful, auditable errors with:

| Field | Purpose |
|-------|---------|
| Machine-readable selector | Programmatic identification of the error type |
| DALP code | Platform-specific error code for support and diagnostics |
| Severity | Error classification (critical, warning, info) |
| Audience | Who should see this error (investor, operator, admin) |
| Retryability | Whether the operation can be retried after remediation |
| Suggested action | Guidance on how to resolve the issue |
| i18n-ready messages | Localizable error descriptions for multi-language deployments |

For regulated institutions, that matters more than people think. A failed transfer is not just a technical event. It is often a compliance record, a client-support issue, an audit artifact, and sometimes evidence in a regulatory review. Having structured, interpretable error data transforms compliance operations from "something broke" to "this specific rule prevented this specific action for this documented reason."

---

## 13. Real-World Scenario: Regulated Bond Issuance for a European Bank

A bank wants to issue a EUR-denominated regulated bond to professional and institutional investors in Europe under MiCA and MiFID II frameworks.

### 13.1 Business Requirements

- EUR 100M issuance cap
- 5-year term with semi-annual coupon
- Professional and institutional investors only
- EU-only distribution (27 member states)
- KYC and AML required for all participants
- Manual transfer approval for OTC secondary market transfers
- 90-day lock-up period for initial investors
- Maximum 500 holders at any time
- Ongoing proof that issuer is licensed and prospectus status is documented
- Collateral backing required for initial issuance tranches

### 13.2 DALP Configuration

**Identity / claim layer**:
- Investors must hold `knowYourCustomer` (with content hash verification)
- Investors must hold `antiMoneyLaundering`
- Investors must hold either `professionalInvestor` or `qualifiedInstitutionalInvestor`
- Issuer identity holds `issuerLicensed`
- Issuer identity holds either `issuerProspectusFiled` or `issuerProspectusExempt`
- Issuer identity holds `issuerReportingCompliant`

**Trusted issuers** (three-tier configuration):
- **Global**: Identity factory (trusted for `contractIdentity`)
- **System-scoped**: Primary KYC/AML provider (trusted for `knowYourCustomer` and `antiMoneyLaundering`)
- **System-scoped**: Regulated administrator (trusted for `professionalInvestor` and `qualifiedInstitutionalInvestor`)
- **Subject-scoped**: Legal counsel (trusted for issuer-specific topics: `issuerLicensed`, `issuerProspectusFiled`, `issuerReportingCompliant`)

**Compliance modules** (in evaluation order):
1. **IdentityVerification**: Expression `[KYC, AML, AND, PROFESSIONAL, QII, OR, AND]` — requires KYC + AML, plus either professional or QII status
2. **CountryAllowList**: EU 27 member state country codes
3. **InvestorCount**: Global limit of 500 holders
4. **TimeLock**: 90-day hold period with exemption for QII investors
5. **TransferApproval**: Required for secondary market transfers, 48-hour approval window, one-time use
6. **TokenSupplyLimit**: EUR 100M cap using base-price conversion
7. **CollateralComplianceModule**: Collateral ratio requirement for minting tranches

### 13.3 Operational Workflow

**Before launch**:
- Register trusted issuers at appropriate scope levels
- Issue investor claims to pre-qualified buyers (KYC, AML, investor classification)
- Issue issuer-side compliance claims (license, prospectus, reporting)
- Deploy token in paused state
- Review compliance configuration with compliance officer sign-off
- Test module evaluation with sample transfers
- Unpause only after final review

**At issuance**:
- Minting succeeds only to eligible, verified investors within the EU
- Any investor without valid identity claims cannot receive allocation
- Any issuance beyond EUR 100M cap fails on-chain
- Collateral backing is verified before each minting operation
- Investor count is checked — if the 500-holder limit would be exceeded, the mint reverts

**During secondary trading**:
- Investor requests transfer
- Compliance engine checks: identity verification → country allow list → investor count → timelock → transfer approval
- If all pass, transfer executes and post-hooks update investor counts, timelock batches, and consume the approval
- If any check fails, the transaction reverts with a specific error code identifying which module blocked the transfer

**Ongoing compliance events**:
- If an investor's AML claim expires: future transfers fail until re-verified (existing balance remains but is non-transferable)
- If the trusted KYC issuer changes: old claims become invalid, re-verification required through the new issuer
- If a country is added to the block list: investors in that country can no longer receive the token
- If the issuer's license claim expires: depending on configuration, new issuance may be blocked until renewed

### 13.4 Audit and Reporting

Every compliance decision is recorded on-chain through events:
- Module evaluation results (pass/fail with specific module identification)
- Claim issuance and revocation
- Trusted issuer configuration changes
- Bypass list modifications
- Transfer approval grants and consumptions
- Investor count state changes

This creates a complete, immutable audit trail that regulators, auditors, and compliance officers can reference. The structured error catalog provides human-readable explanations for every compliance decision.

---

## 14. Why DALP's Compliance Model Is Different

Most tokenization systems claim "compliance support." Usually that means one of three weak models:

1. A whitelist spreadsheet managed off-chain
2. A custom transfer restriction hardcoded for one use case
3. Manual review before transactions are submitted, with no protocol-level enforcement

DALP is different because it combines:

- **Identity-bound eligibility** rather than wallet-only whitelisting — compliance follows the investor, not just the address
- **Claim-based verification** rather than one-time onboarding flags — eligibility is continuously validated
- **Trusted issuer governance** with three-tier resolution rather than arbitrary attestation acceptance
- **12 concrete module types** across six categories rather than one-off custom contracts
- **Two-layer policy enforcement** that bridges on-chain rules with custodian-level controls
- **Three-tier interface hierarchy** that supports incremental migration without breaking deployed assets
- **Ex-ante enforcement** rather than advisory or post-trade checks — non-compliant transfers never execute
- **Runtime configurability** rather than redeploy-everything custom engineering
- **Structured error model** with audit-grade failure reporting rather than opaque reverts
- **Type-safe module encoding** with discriminated-union schemas that reject invalid configurations

That is what institutions need if they want tokenization to survive contact with real regulation.

---

## 15. Bottom Line

DALP's compliance framework is not a thin "add KYC here" wrapper around ERC-20. It is a full ERC-3643-based control plane with:

- On-chain identity binding through OnchainID with ERC-734/735 key and claim management
- Trusted issuer governance with three-tier resolution (subject, system, global)
- 12 concrete compliance module types organized across six categories: eligibility, restrictions, transfer controls, issuance and supply, time-based rules, and settlement and collateral
- Logical claim expressions using RPN for arbitrary eligibility rules
- Jurisdiction and investor restrictions with both positive and negative lists
- Issuance caps with lifetime, fixed-period, and rolling-period enforcement including currency-denominated limits
- Collateral and reserve controls with trusted auditor support
- Manual approval and hold-period workflows with exemption expressions
- Two-layer policy enforcement bridging on-chain and custodian controls
- Three-tier interface hierarchy supporting live migration across protocol versions
- KYC workflows with approve/reject/request-update outcomes and tracked remediation
- Deterministic execution with structured, audit-grade failure reporting
- Wallet verification with multi-factor authentication and replay protection
- ISO 27001 and SOC 2 Type II certified operations
- Multi-jurisdictional regulatory alignment (MiCA, MiFID II, SEC Reg D/S/CF, MAS, VARA, DFSA, FCA, FSA)
- Flexible deployment models supporting data residency and sovereignty requirements across EU, GCC, and APAC
- Immutable, on-chain audit trails with structured error catalogs, i18n support, and machine-readable export for regulatory reporting

That gives institutions something rare in tokenization: a system where legal policy, operational process, and smart contract enforcement can actually line up.

That alignment is the difference between a proof of concept and a live digital asset program.
