# Configurable Token Architecture

## Executive Summary

Running a pilot or minting a token is straightforward. Doing it correctly at production scale — with proper governance, compliance, and lifecycle support — is where most institutions get stuck. DALP's token architecture represents a fundamental shift from the traditional approach to security token engineering. Rather than deploying monolithic, purpose-built smart contracts for each financial instrument — requiring specialized Solidity development, security audits, and deployment cycles — DALP implements a **configuration-driven model** where a single, audited token contract (DALPAsset) can be adapted to represent any financial instrument through runtime configuration.

This approach eliminates the months-long development cycles typically associated with tokenization projects and replaces them with a workflow where compliance officers, product managers, and operations teams select capabilities from a curated catalog. The result is tokens that are deployed in hours rather than months, with the same security guarantees as bespoke smart contract development.

SettleMint calls this **composability**: the ability to create any token configuration from scratch using modular, pluggable components. One contract type can represent any financial instrument by combining runtime-pluggable token features and compliance modules. There are no fixed token types. Features and compliance rules are building blocks that can be mixed, matched, added, and removed at any time, even after deployment.

---

## 1. Token Contract Architecture

### 1.1 The DALPAsset Foundation

At the core of DALP's token system is **DALPAsset** — a unified, upgradeable token contract built on the ERC-3643 (T-REX) standard. DALPAsset is not simply an ERC-20 token with compliance bolted on; it is a purpose-built financial instrument contract that integrates identity verification, compliance enforcement, access control, and configurable token economics into a single coherent architecture.

**Core Contract Properties:**

| Property | Implementation |
|----------|---------------|
| Base Standard | ERC-20 (fungible tokens) |
| Compliance Layer | ERC-3643 / SMART Protocol |
| Upgradeability | UUPS proxy pattern |
| Access Control | OpenZeppelin AccessManager with 7 per-asset roles |
| Feature System | ISMARTFeature interface — runtime-configurable extensions |
| Identity Binding | OnchainID integration via Identity Registry |
| Configuration Extension | SMARTConfigurable — attach/remove features post-deployment |

DALPAsset extends the SMART Protocol (ERC-3643) with the `SMARTConfigurable` extension, which allows any combination of token features to be attached and reconfigured at runtime, after the token is deployed. This eliminates the need to commit to a specialized contract type at deployment time. A DALPAsset token can evolve: start as a simple bearer instrument, then have fee features added, governance enabled, or maturity redemption configured, all without redeploying. External systems (wallets, indexers, dashboards) interact via standard ERC-20 and ERC-3643 interfaces, ensuring broad compatibility with existing infrastructure.

**The three-layer composability model:**

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

1. **DALPAsset**: Single configurable contract replacing 7 legacy specialized types. Built on SMART Protocol (ERC-3643). Supports any `assetTypeName` as a free-form string, not limited to presets.
2. **Token Features**: Runtime-pluggable extensions via `ISMARTFeature` interface. 11 features across 4 categories. Up to 32 per token. Add, remove, reorder post-deployment.
3. **Compliance Modules**: Modular on-chain transfer rules via `ISMARTComplianceModule`. 12 modules across 6 categories. Per-token configuration with post-deployment reconfiguration.

DALPAsset contracts are deployed through the **Asset Factory** — a controlled deployment pipeline that ensures every token created on the platform inherits the correct security model, compliance hooks, and access control structure. The factory is not merely a convenience wrapper; it is a security boundary that prevents misconfigured or unauthorized token deployments. The factory deploys UUPS proxy contracts pointing to the DALPAsset implementation, initializes the compliance engine, binds the token to the Identity Registry, configures features in the specified order, and assigns initial roles.

### 1.2 Supported Token Standards

DALP's token architecture is built on established Ethereum token standards, each serving a specific purpose in the financial instrument lifecycle:

**ERC-20 (Fungible Tokens)**
The foundational standard for all DALP tokens. Every DALPAsset implements the full ERC-20 interface, ensuring compatibility with wallets, exchanges, DeFi protocols, and any Ethereum tooling that supports the standard. This includes standard `transfer`, `approve`, `transferFrom` functions, as well as events for transfer tracking and approval management. ERC-20 compatibility means that any existing blockchain infrastructure — from block explorers to custody platforms to accounting systems — can interact with DALP tokens without custom integration work.

**ERC-3643 / T-REX (Token for Regulated EXchanges)**
The compliance layer that transforms a basic ERC-20 into a regulated security token. ERC-3643 is an open Ethereum standard — not a proprietary SettleMint invention — and it mandates four critical additions:

- **Identity Registry**: Every token holder must have a verified on-chain identity. This is not optional — wallets without a registered identity cannot receive tokens.
- **Compliance Engine**: All transfers pass through a modular compliance check before execution. The engine evaluates sender, recipient, and transaction context through a sequence of compliance modules.
- **Trusted Issuers**: Identity claims (KYC status, accreditation, jurisdiction) must originate from pre-approved claim issuers — not self-asserted. A wallet holder cannot declare themselves accredited; a trusted issuer must attest to this fact on-chain.
- **Transfer Restrictions**: The token contract enforces rules that go beyond simple balance checks — investor limits, country restrictions, holding periods, collateral requirements, and more.

DALP implements ERC-3643 through the **SMART Protocol** (SettleMint Asset Regulatory Technology). This implementation follows the ERC-3643 specification while adding features required for institutional deployment: upgradeable compliance modules, RPN expression evaluation for identity claims, multi-jurisdictional regulatory templates, and a three-tier compliance interface hierarchy for incremental migration.

**ERC-1400 Compatibility**
While DALP's primary standard is ERC-3643, the architecture supports ERC-1400-style partitioned securities through compliance module configuration. Partition-like behavior — such as restricting certain tranches of tokens to specific investor classes — is achieved through the compliance module system rather than a separate partition standard. This approach provides the regulatory benefits of partitioned securities (different rules for different holder classes) without the complexity of maintaining multiple token partition states.

**ERC-721 (Non-Fungible Tokens)**
DALP's architecture is primarily oriented toward fungible financial instruments. Non-fungible use cases (such as unique real estate parcels or individual loan certificates) are addressed through the RealEstate asset preset with per-unit tracking, rather than through a full ERC-721 implementation. Each unit in a real estate tokenization can represent a distinct property while maintaining fungibility within the same class.

**ERC-5805 (Voting Power)**
DALP implements the ERC-5805 standard for governance voting power through the Voting Power token feature. This provides ERC20Votes-compatible delegation with historical tracking, timestamp-based clock mode (`CLOCK_MODE() = "mode=timestamp"`), and EIP-712 domain separation for meta-transaction support. Token balances become voting units, and the feature maintains vote checkpoints synchronized through SMART feature hooks on transfer, mint, burn, and redemption operations.

**EIP-2612 (Permit)**
Gasless approval functionality is available through the Permit token feature, implementing EIP-2612. This allows token holders to sign approvals off-chain, and any address can submit the signature on-chain — eliminating the need for a separate approval transaction before a transfer. For institutional workflows where a custodian submits transactions on behalf of clients, this reduces gas costs and operational friction.

### 1.3 The SMART Protocol Integration

DALP's implementation of ERC-3643 is called the **SMART Protocol** (SettleMint Asset Regulatory Technology). This integration provides three critical capabilities that distinguish it from basic ERC-3643 implementations:

**Ex-ante compliance enforcement**: All compliance checks execute *before* a transfer is committed to the blockchain, not after. If a transfer would violate any configured compliance rule, it reverts atomically — there is never a state where non-compliant tokens exist in an unauthorized wallet. This is not a design preference; it is a regulatory necessity. For regulated securities, ex-post compliance (check after transfer) creates immutable on-chain evidence of violations — a reputational and regulatory liability that no institution should accept.

**Modular compliance binding**: Each token is bound to a compliance engine that orchestrates multiple compliance modules. Modules can be added, removed, or reconfigured without redeploying the token contract. The compliance engine evaluates all configured modules in sequence — a single module veto blocks the transfer. This fail-closed design means the default is denial unless all modules explicitly approve.

**Identity-aware transfers**: Every transfer operation resolves the sender's and recipient's on-chain identity before evaluating compliance rules. This means compliance modules can make decisions based on investor attributes (country, accreditation status, KYC level) rather than just wallet addresses. The identity resolution happens through the Identity Registry, which maps wallet addresses to OnchainID contracts containing verified claims from trusted issuers.

**Three-tier compliance interface hierarchy**: DALP's compliance contract layer uses a three-tier interface that separates system-wide, per-token, and standard-compliant concerns:

| Tier | Interface | Scope |
|------|-----------|-------|
| Tier 1 | `IDALPGlobalCompliance` | System-wide bypass list, global modules, token-compliance binding |
| Tier 2 | `IDALPTokenCompliance` | Per-token compliance hooks with dual v1/v2 support |
| Tier 3 | `ISMARTComplianceV2` | ERC-3643 aligned 3-argument hooks for new tokens |

This hierarchy enables incremental migration of individual tokens to the latest compliance hook format without requiring a coordinated platform-wide cutover. The original monolithic interface is preserved for ERC-165 backward compatibility across UUPS proxy upgrades.

---

## 2. Token Features: The Capability System

### 2.1 Architecture Overview

Token features are **runtime-configurable extensions** to DALPAsset via the `ISMARTFeature` interface. They extend token economics (fees, yield, governance, and lifecycle) without requiring contract redeployment. This is the mechanism that allows a single DALPAsset contract to behave like a bond, an equity share, a fund unit, a stablecoin, or a structured product. Each feature has a factory registered in the System Addon Registry for CREATE2 deployment, ensuring deterministic and standardized feature provisioning.

**Important distinction**: Token features are for extending token economics. They are not compliance modules (which restrict, approve, or reject transfers at the legal/compliance level) and not capabilities (standalone operational workflows like airdrops, vaults, or settlement). Before choosing a token feature, confirm the right tool:

| Need | Right Tool |
|------|-----------|
| Restrict, approve, or reject transfers at legal/compliance level | Compliance Modules |
| Standalone operational workflow — distribution, treasury, settlement | Capabilities (Airdrop, Vault, XvP) |
| Extend token economics — fees, yield, governance, lifecycle | Token Features |

Features integrate through six lifecycle hooks:

| Hook | Trigger | Purpose |
|------|---------|---------|
| `canUpdate(from, to, value, ...)` | Pre-check before any operation | View-only gate — reverts to block the operation |
| `onMinted(to, amount)` | After minting | Post-mint processing (e.g., FIFO batch recording) |
| `onBurned(from, amount)` | After burning | Post-burn processing (e.g., balance snapshot update) |
| `onTransferred(from, to, amount)` | After transfers | Post-transfer processing (e.g., fee collection, vote checkpoint updates) |
| `onRedeemed(from, amount)` | After redemptions | Redemption lifecycle processing (e.g., voting-unit burn) |
| `onAttached()` | After feature registration via `setFeatures()` | One-time initialization when feature is enabled |

Features with `supportsRewriting() = true` can modify the transfer amount in-flight, for example deducting a fee before the amount reaches the recipient. Features execute in the order configured by the caller, making ordering an explicit design decision rather than an implicit assumption.

**Key composability properties:**
- `setFeatures()` takes an ordered array; execution order = array position
- Max 32 features per token (gas-optimized)
- Atomic replacement via `setFeatures()` replaces the entire feature set at once
- Features can be added, removed, and reordered post-deployment under GOVERNANCE_ROLE
- The rewriting pipeline allows features to transform transfer amounts in sequence, with each subsequent feature seeing the output of the previous one

### 2.2 Available Token Features — Detailed Reference

#### Fees & Charges

**AUM Fee (Assets Under Management Fee)**

A time-based management fee calculated as a percentage of total assets under management. This is an *inflationary* fee model — new tokens are minted to the fee recipient rather than deducted from transfers. The formula is:

```
Fee = AUM × feeBps × elapsedTime / (365 days × 10000)
```

Fee collection is triggered by calling `collectFee()`, which mints the accrued fee amount to the configured `feeRecipient`. This model is standard for managed investment vehicles where the fund manager receives compensation proportional to the fund's total value.

| Parameter | Description |
|-----------|-------------|
| `feeBps` | Fee rate in basis points (e.g., 200 = 2.00% annual) |
| `feeRecipient` | Address receiving minted fee tokens |

*Use cases*: Investment fund management fees, asset management fees, platform revenue from managed portfolios. The AUM fee is the primary revenue mechanism for fund tokens, replicating the traditional fund management fee structure in an on-chain, transparent, and automatically calculated form.

*Operational note*: Because AUM Fee mints new tokens, it affects the total supply. Analytics features (Historical Balances, Voting Power) must run after AUM Fee in the feature ordering to observe post-collection supply accurately.

**Transaction Fee**

A per-transaction fee deducted from the transfer amount. This feature supports `supportsRewriting = true`, meaning the actual amount received by the recipient is reduced by the fee percentage. The fee is redirected to a configured treasury address.

| Parameter | Description |
|-----------|-------------|
| `feeBps` | Fee rate in basis points per transaction |
| `feeRecipient` | Treasury address receiving deducted fees |

*Use cases*: Platform revenue collection on every trade, liquidity pool contributions, regulatory levy enforcement, exchange fee modeling. The Transaction Fee is particularly useful for tokens traded on secondary markets where the issuer or platform operator wants to capture a percentage of trading volume.

*Technical detail*: Because `supportsRewriting = true`, the transaction fee modifies the actual amount transferred. If a user sends 1,000 tokens with a 1% fee (100 bps), the recipient receives 990 tokens and the treasury receives 10 tokens. This rewriting behavior means that features configured after Transaction Fee in the ordering will see the post-fee amount.

**Transaction Fee Accounting**

Tracks fees per transaction for off-chain reconciliation without collecting them on-chain. This is a pure accounting feature — no tokens are deducted or minted. It emits events that external systems can index for tax reporting, regulatory filing, or internal accounting.

*Use cases*: Regulatory reporting where fee transparency is required but on-chain collection is not desired, tax jurisdiction compliance where fee records must be maintained, internal accounting reconciliation. This feature is commonly paired with off-chain fee collection systems where the on-chain record serves as the audit trail.

**External Transaction Fee**

A fixed fee denominated in a separate ERC-20 token (e.g., USDC, EUROC) charged on every operation. This enables use cases where the fee currency differs from the token being transferred — for example, charging a USDC settlement fee on a bond token transfer, or collecting platform fees in a stablecoin regardless of the asset being traded.

| Parameter | Description |
|-----------|-------------|
| `feeToken` | ERC-20 contract address of the fee currency |
| `feeAmount` | Fixed fee amount per operation (in fee token units) |
| `feeRecipient` | Address receiving the external fee |

*Use cases*: Cross-currency settlement fees, platform service charges in stable denomination, regulatory levies in fiat-pegged stablecoins. This feature is particularly relevant for institutional deployments where fee accounting must be in a specific currency regardless of the underlying asset.

#### Governance & Snapshots

**Voting Power (ERC-5805)**

Implements ERC-5805-compatible delegated voting with historical tracking. Token holders can delegate their voting weight to any address, and the system maintains checkpoint-based history of voting power at any past timestamp. This makes DALPAsset compatible with Governor contracts and on-chain governance frameworks.

*Technical architecture*:
- Voting units are maintained exclusively through SMART feature hooks: `onTransferred`, `onMinted`, `onBurned`, and `onRedeemed` all route through `_transferVotingUnits`, so redemption is treated as a vote-supply burn rather than a special governance path.
- The feature uses timestamp-based clock mode (`CLOCK_MODE() = "mode=timestamp"`) with EIP-712 domain separation for meta-transaction support (ERC-2771).
- The feature is **observational rather than restrictive** at token-operation time: `canUpdate(...)` is a no-op and `supportsRewriting()` returns `false`, so voting power does not itself block or rewrite token lifecycle operations.
- Holder actions: delegate by direct wallet call or EIP-712 signature; query historical votes via `getVotes`, `getPastVotes`, `getPastTotalSupply`, and `getPastDelegate`.

*Current status*: Smart contract implemented and read-only UI exposed. DAPI mutation routes for delegation and vote-related actions are not yet shipped — delegation currently requires direct contract calls. No governance system (proposal/execution module) is shipped alongside voting power; DALP provides the governance-power infrastructure, not a full governance product.

*Use cases*: Shareholder governance for equity tokens, fund investor governance over investment strategy, regulatory voting requirements for certain security types, integration with external DAO governance frameworks.

**Historical Balances**

Provides point-in-time balance and total supply queries via a checkpoint system. Every transfer, mint, and burn creates a checkpoint, enabling queries like "what was wallet X's balance at block Y?" or "what was the total supply at timestamp T?"

This feature is a **prerequisite** for Fixed Treasury Yield (which needs historical balances to calculate pro-rata accrual entitlements) and is critical for:
- Corporate actions requiring record-date snapshots (dividend distribution, voting)
- Regulatory reporting requiring point-in-time portfolio states
- Tax reporting requiring historical cost basis tracking
- Audit trails requiring demonstrable historical ownership records

*Technical detail*: The checkpoint system creates a new entry on every state-changing operation (transfer, mint, burn). Querying historical data is gas-free (view function), but each checkpoint creation adds gas cost to transactions. For high-frequency trading tokens, this trade-off should be considered.

**Permit (EIP-2612)**

Enables gasless approvals — token holders can sign an approval off-chain, and any address can submit the signature on-chain. This removes the need for a separate approval transaction before a transfer.

*Technical detail*: Permit implements no lifecycle hooks (`canUpdate` is a no-op, `supportsRewriting()` returns false). It is a utility feature that adds the `permit(owner, spender, value, deadline, v, r, s)` function to the token interface. Feature ordering is irrelevant for Permit.

*Use cases*: Institutional custody workflows where a custodian submits transactions on behalf of clients (the client signs the approval off-chain, the custodian submits it). Reduces gas costs by eliminating the approve-then-transfer two-transaction pattern. Enables meta-transaction patterns where a relayer submits the transaction and pays gas on behalf of the user.

#### Lifecycle & Yield

**Maturity Redemption**

Implements the full bond maturity lifecycle — the defining characteristic of fixed-income instruments. After the configured maturity date, the token blocks all transfers; holders can only redeem their tokens for the denomination asset (e.g., USDC, EUROC) at the configured face value.

| Parameter | Description |
|-----------|-------------|
| `maturityDate` | Timestamp after which transfers are blocked (immutable after deployment) |
| `faceValue` | Redemption price per token unit in denomination asset |
| `denominationAsset` | ERC-20 token used for redemption payouts (e.g., USDC) |
| `treasury` | Address holding the denomination asset for redemption |

*Lifecycle stages*:
1. **Pre-maturity**: Token transfers normally, subject to all compliance rules. The Maturity Redemption feature's `canUpdate()` gate allows all operations.
2. **At maturity**: `canUpdate()` blocks all transfers — holders can only redeem.
3. **Redemption window**: Holders call `redeem()` to exchange tokens for denomination asset at face value. The mechanism is atomic: tokens are burned and denomination asset is transferred from treasury in a single transaction.
4. **Post-redemption**: Redeemed tokens are burned, reducing circulating supply. If the treasury has insufficient funds, the redemption reverts — no partial redemptions.

*Treasury integration*: Maturity redemption uses the `TreasuryPayoutLib` shared library, which supports both EOA treasuries (via `safeTransferFrom`) and asset/vault-style treasuries (via `ITreasuryPayer.payout()`). This means the treasury can be a simple wallet holding stablecoins or a smart contract vault — the redemption mechanism adapts automatically.

*Use cases*: Government and corporate bonds, structured notes, term deposits, any fixed-income instrument with a defined maturity date and principal obligation.

**Fixed Treasury Yield**

A fixed-rate yield distribution system where the issuer funds a treasury, and token holders claim their accrued yield at configured intervals. The system is **pull-based** — holders (or their custodians) initiate the claim, rather than the issuer pushing payments.

| Parameter | Description |
|-----------|-------------|
| `yieldRate` | Annual yield rate in basis points |
| `paymentInterval` | Frequency of yield accrual (e.g., quarterly, semi-annually) |
| `denominationAsset` | ERC-20 token used for yield payouts |
| `treasury` | Address holding the denomination asset for yield payments |

*Design rationale*: The pull-based design avoids the gas cost and operational complexity of iterating over potentially thousands of holders. Instead of the issuer executing a single "distribute to all" transaction (which would be prohibitively expensive and potentially exceed block gas limits), each holder claims their individual entitlement. This scales to any number of holders without gas concerns.

*Dependency*: Requires the **Historical Balances** feature to calculate pro-rata yield entitlements. The yield calculation uses historical balance snapshots to determine each holder's proportional share at each accrual period.

*Treasury integration*: Like Maturity Redemption, Fixed Treasury Yield uses the `TreasuryPayoutLib` shared library, supporting both EOA and smart contract treasuries. The payout executes with CEI-style (Checks-Effects-Interactions) state updates before transfer for reentrancy safety.

*Use cases*: Bond coupon payments, preferred share dividends, income fund distributions, any instrument requiring periodic fixed-rate payments to holders.

#### Transformation

**Conversion (Loan-to-Equity)**

A cooperative two-contract design for convertible instruments. This is implemented as two features that work together:

1. **Conversion Feature** (attaches to the loan/debt-side token): Manages triggers, initiates conversion, burns loan tokens
2. **Conversion Minter Feature** (attaches to the equity-side token): Receives conversion requests, mints equity tokens at the configured ratio

*Architecture*:
- **Trigger management**: The governance role publishes conversion triggers that define when conversion can occur (time-based windows, price thresholds, or governance-initiated)
- **Holder-initiated conversion**: Token holders can optionally convert their loan tokens to equity tokens at the configured price within defined windows
- **Custodian-initiated (forced) conversion**: The custodian role can force mandatory conversion of all or specific holder positions
- **Atomic execution**: Conversion burns the specified amount of loan tokens and mints the corresponding amount of equity tokens in a single transaction

*Current status*: Smart contract implemented with subgraph indexing. **No DAPI routes exist** — conversion must currently be done via direct smart contract calls. No frontend UI for trigger management or conversion execution. Subgraph handlers process `TriggerPublished`, `TriggerDisabled`, `ConversionInitiated`, `ConversionFinalized`, and `ForcedConversion` events.

*Use cases*: Convertible bonds (debt-to-equity conversion), convertible notes (startup financing), mandatory convertible instruments, contingent convertible bonds (CoCos) for banking capital requirements.

### 2.3 Feature Ordering and Composition

Feature ordering is explicitly the caller's responsibility. There are no on-chain weights — features execute in the array order specified during configuration via `setFeatures()`. The recommended execution order is:

| Position | Category | Features | Rationale |
|----------|----------|----------|-----------|
| First | Transfer restriction | Maturity Redemption, Conversion (loan-side) | Restriction features should block transfers before fees are collected or analytics recorded |
| After restrictions | Fee collection | AUM Fee, Transaction Fee, Transaction Fee Accounting | Fees are deducted before analytics features record balances |
| After fee collection | External fee hooks | External Transaction Fee | External fees in separate denomination collected after primary fee deduction |
| Last | Analytics & governance | Historical Balances, Voting Power | Governance snapshots reflect post-fee, post-restriction states |
| Order irrelevant | No-hook utilities | Permit, Conversion Minter | These features do not use lifecycle hooks |

This ordering ensures deterministic behavior: restriction features can block transfers before fees are collected, fees are deducted before analytics features record balances, and governance snapshots reflect the final post-fee state.

**Composition rules**: Any combination of token features is valid. DALPAsset is not limited to the seven legacy-equivalent presets — those exist as proven starting points for teams migrating from legacy types, not as exhaustive definitions. A convertible bond with AUM fees, voting power, and gasless approvals is just as valid as a plain equity token with only Historical Balances.

### 2.4 Feature Access Control

| Role | Scope |
|------|-------|
| `GOVERNANCE_ROLE` | Configuration and policy changes — fee rates, triggers, schedules, treasury addresses, feature attachment/removal |
| `CUSTODIAN_ROLE` | Operational actions on behalf of holders — forced conversion, early maturity, freeze/recovery |

All configuration changes (adding/removing features, modifying parameters) require `GOVERNANCE_ROLE`. Multi-sig or timelock governance is recommended for production deployments to prevent unilateral configuration changes.

### 2.5 Asset-as-Treasury Capability

DALPAsset contracts can act as treasury contracts for payout-oriented features. The `IDALPAsset` interface extends `ITreasuryPayer`, and `DALPAssetImplementation` exposes `payout(IERC20 token, address to, uint256 amount)` as a non-reentrant contract-level payout surface.

*Security model*: Asset payout calls are **feature-gated** — `payout()` reverts unless `msg.sender` is a registered feature (`_featureIndices[msg.sender] != 0`). This means only attached token features (like Maturity Redemption or Fixed Treasury Yield) can trigger payouts, not arbitrary callers.

*Fallback mechanism*: The `TreasuryPayoutLib.payoutFrom()` library first checks whether the treasury address supports `ITreasuryPayer` via ERC-165; if so, it calls `payout()`. Otherwise, it falls back to `safeTransferFrom(treasury, to, amount)` for EOA/approval-based treasuries. This dual-path design means the treasury can be the token contract itself, a separate vault contract, or a simple wallet — the payout mechanism adapts automatically.

---

## 3. Token Lifecycle Management

### 3.1 Asset Classes and Types

DALP supports six asset types organized into four asset classes, each representing a distinct category of financial instrument:

| Asset Class | Asset Types | Description | Key Characteristics |
|-------------|-------------|-------------|-------------------|
| **Fixed Income** | Bond | Debt securities with maturity dates and fixed payments | Face value, coupon rate, maturity date, denomination asset |
| **Flexible Income** | Equity, Fund | Variable return assets like shares and investment funds | Voting rights (equity), management fees (fund), NAV tracking |
| **Cash Equivalent** | Stablecoin, Deposit | Stable value assets pegged to fiat currencies | Collateral backing (stablecoin), minimal features (deposit) |
| **Real World Asset** | Real Estate, Precious Metal | Tokenized physical assets | Capped supply, no burn (real estate), dynamic supply (precious metal) |

Each asset type has a corresponding **factory** that must be deployed before tokens of that type can be created. The factory validates class-specific parameters and ensures the correct feature and compliance configuration.

### 3.2 Issuance: The Asset Designer Workflow

Token issuance in DALP follows a controlled pipeline, accessible through both the Asset Designer wizard (UI) and the API:

**Step 1: Asset Class and Type Selection**

The token manager selects an asset class and type. The Asset Designer displays available features and compliance options specific to each type. Common use cases:

- **Bond issuance**: Fixed-income securities with maturity dates and coupon payments
- **Equity tokenization**: Shares with voting rights and dividend distribution
- **Fund launch**: Investment fund units with NAV tracking and management fees
- **Stablecoin creation**: Collateral-backed stable value instruments
- **Deposit certificates**: Tokenized bank deposits or cash equivalents
- **Real estate fractionalization**: Property ownership divided into tradeable fractions

**Step 2: Asset Configuration**

Core properties are configured through structured forms with live validation:

| Parameter | Description | Validation |
|-----------|-------------|------------|
| Name | Full name of the asset (e.g., "Acme Corporate Bond 2025") | 1-255 characters |
| Symbol | Trading symbol (e.g., "ACME25") | 1-24 characters, uppercase recommended |
| Decimals | Decimal precision | 0-18 (0 for whole shares, 18 for fungible assets) |
| Country Code | Jurisdiction for regulatory purposes | ISO 3166-1 numeric code |
| Price Currency | Reference pricing currency | ISO 4217 code (USD, EUR, GBP) |
| Base Price | Price per unit in selected currency | Numeric string |
| Cap | Maximum supply (optional) | Positive integer |
| Unique Identifier | ISIN, CUSIP, or custom identifier | Optional string |

Asset-specific parameters vary by type: bonds require face value and maturity date, funds require fee rates, stablecoins require collateral configuration, real estate includes property metadata.

The Asset Designer enforces input validation including hostile-input regression testing (SQLi-like and XSS-like payloads, unicode/boundary inputs) across the UI validation suite.

**Step 3: Compliance Module Selection**

The operator selects compliance modules organized by category (eligibility, restrictions, transfer controls, issuance and supply, time-based rules, settlement and collateral). Each module has specific parameters that are type-specifically encoded through DALP's discriminated-union validation schema. Unknown module types are rejected via hard error rather than permissive fallback.

**Step 4: Feature Selection and Ordering**

Token features are selected and ordered according to the recommendations in Section 2.3. The Asset Designer validates feature compatibility and dependency requirements (e.g., Fixed Treasury Yield requires Historical Balances).

**Step 5: Review and Deploy**

A summary page displays all configuration details. Deployment requires wallet verification (PIN, OTP, or secret codes) and triggers the Asset Factory pipeline.

**Step 6: Factory Deployment (Durable Workflow)**

The Asset Factory orchestrates deployment through Restate (DALP's durable execution engine):

1. Validates the configuration against selected compliance template and class-specific rules
2. Deploys the UUPS proxy contract with the DALPAsset implementation
3. Initializes the compliance engine with selected modules and type-specifically encoded parameters
4. Binds the token to the system's Identity Registry
5. Issues class-aware claims (classification, location, pricing, identifier) — claim enrichment varies per asset class and fails terminally on partial claim issuance
6. Configures token features in the specified order via `setFeatures()`
7. Materializes a permission plan, defaulting to creator=`governance` when `initialPermissions` is empty
8. Assigns initial roles (admin, governance, supply management, custodian, emergency) via sequential `grantRole` calls
9. Optionally unpauses the token if `unpauseOnCreation=true` (defaults to `false` — paused by default)
10. Registers the token in the token factory registry

This workflow is **durable and idempotent** — if any step fails, the deployment can be resumed from the last successful step. Missing `TokenAssetCreated` receipt events are treated as terminal failure, so issuance cannot complete without deterministic address extraction.

**Step 7: Post-Deployment Activation**

The token deploys in a **paused state by default**. To activate:

1. Verify compliance configuration with the compliance team
2. **Unpause the asset** (requires `EMERGENCY` role)
3. **Add supply managers** and grant roles for minting
4. **Mint initial supply** to designated wallets — minting is subject to all configured compliance rules, even for the initial distribution

### 3.3 Transfer Lifecycle

Every token transfer in DALP follows a deterministic execution path. The compliance transfer flow is the most critical sequence in the system — it determines whether any token movement is permitted.

```
1. Transfer initiated (user/API/custodian)
       │
2. Identity Resolution
   ├── Identity Registry: resolve sender's wallet → OnchainID
   └── Identity Registry: resolve recipient's wallet → OnchainID
   │   (Missing identity → immediate revert: "Identity not registered")
       │
3. Compliance Check (ex-ante, fail-fast)
   ├── Module 1: Country restriction ──► PASS/FAIL
   ├── Module 2: Identity verification ──► PASS/FAIL
   ├── Module 3: Supply/investor limits ──► PASS/FAIL
   ├── Module 4: Transfer approval ──► PASS/FAIL
   ├── Module 5: Time lock ──► PASS/FAIL
   └── Module N: ... ──► PASS/FAIL
       │ (ALL must pass — first failure reverts with reason)
       │
4. Feature Pre-check
   └── canUpdate() on all features in order ──► PASS/FAIL
       │
5. Transfer Execution
   └── ERC-20 balance update (atomic)
       │
6. Feature Post-hooks
   ├── onTransferred() — fee collection, accounting, amount rewriting
   ├── Balance checkpoint updates (Historical Balances)
   ├── Voting unit transfers (Voting Power)
   └── FIFO batch recording (TimeLock)
       │
7. Compliance Post-hooks (transferred())
   ├── Investor count increment/decrement
   ├── Supply tracking accumulation (rolling windows)
   ├── Transfer approval consumption (if one-time use)
   └── TimeLock acquisition timestamp recording
       │
8. Event Emission
   └── Transfer event + feature-specific events + compliance events
```

**Key invariants**:
- Pre-execution validation (`canTransfer`) completes before any balance changes — failed checks cost only validation gas
- Fail-fast evaluation: first failing module stops all evaluation, no unnecessary gas on subsequent modules
- Atomic state updates: post-transfer hooks must all succeed or the entire transfer reverts
- Module ordering matters: place restrictive checks (country, identity) before expensive checks (supply tracking, investor counting) to optimize gas

If any step fails, the entire transaction reverts atomically. There is never a partial transfer state.

### 3.4 Corporate Actions

DALP supports corporate actions through a combination of token features and operational workflows:

**Dividend/Coupon Distribution**
Using the Fixed Treasury Yield feature, issuers configure yield schedules with rate, frequency, and denomination asset. The system calculates pro-rata entitlements based on Historical Balance snapshots. Holders (or custodians acting on their behalf) claim distributions through the pull-based mechanism. The treasury can be the token contract itself (using the asset-as-treasury capability) or an external wallet/vault.

**Forced Transfers**
The `custodian` role can execute forced transfers that bypass the compliance engine. This is the ERC-3643 `forcedTransfer` mechanism — essential for:
- Court-ordered asset seizures
- Estate transfers following holder death
- Regulatory enforcement actions
- Wallet recovery for institutional investors

Forced transfers still emit events and update all tracking systems (investor count, supply tracking), maintaining the audit trail. However, compliance module pre-checks are skipped entirely.

**Freeze/Unfreeze**
The `custodian` role can freeze individual investor wallets or partial amounts, preventing all transfers (in and out) while maintaining the frozen balance on record. This supports:
- Suspicious activity investigation
- Regulatory hold orders
- Dispute resolution periods
- Sanctions enforcement on specific holders

**Pause/Unpause**
The `emergency` role can pause all operations on a token — no transfers, mints, or burns can execute while paused. This is the circuit breaker for:
- Security incident response
- Smart contract vulnerability discovery
- Regulatory emergency orders
- Market disruption events

**Token Conversion**
For convertible instruments, the governance role manages conversion triggers and windows. Holders can optionally convert within defined windows, or the custodian can force mandatory conversion. All conversion operations are atomic: loan tokens are burned and equity tokens are minted in a single transaction.

### 3.5 Redemption

Redemption is the lifecycle endpoint for fixed-income instruments. The Maturity Redemption feature enforces the complete lifecycle:

1. **Pre-maturity**: Token transfers normally, subject to all compliance rules
2. **At maturity**: Maturity Redemption feature's `canUpdate()` blocks all transfers — holders can only redeem
3. **Redemption window**: Holders call `redeem()` to exchange tokens for the denomination asset at face value. The mechanism is atomic: the holder's tokens are burned, and the denomination asset is transferred from the treasury to the holder, in a single transaction
4. **Post-redemption**: Redeemed tokens are burned, reducing circulating supply. If the treasury has insufficient funds, the redemption reverts — no partial redemptions

The redemption mechanism uses the shared `TreasuryPayoutLib` library, supporting both EOA treasuries and smart contract vaults. Burns free up capacity for supply-capped tokens (the cap tracks live circulating supply via `totalSupply()`, not lifetime minted).

---

## 4. Smart Contract Sets: Pre-built vs. Custom

### 4.1 DALPAsset with Legacy-Equivalent Presets

For the most common financial instrument types, DALP provides **legacy-equivalent presets** — pre-configured DALPAsset configurations that replicate the behavior of the legacy specialized contract types while maintaining the flexibility of runtime configuration. These are **starting points, not limits** — any combination of features and modules can be added beyond the baseline.

**Bond Preset**
| Aspect | Configuration |
|--------|--------------|
| Token Features | Fixed Treasury Yield, Maturity Redemption, Historical Balances |
| Compliance Modules | CappedComplianceModule + jurisdiction-specific modules |
| Key Parameters | Face value, maturity date, denomination asset (e.g., USDC), coupon rate/schedule, supply cap |
| Use Case | Corporate bonds, government bonds, structured notes, term deposits |

The Bond preset captures the essential characteristics of fixed-income instruments: periodic yield payments (coupon), a defined maturity date with principal redemption, and a capped issuance size. The Historical Balances feature enables pro-rata coupon calculations based on record-date snapshots.

**Equity Preset**
| Aspect | Configuration |
|--------|--------------|
| Token Features | Voting Power, Historical Balances |
| Compliance Modules | Per jurisdiction (typically Identity Verification + Country Allow List + Investor Count) |
| Key Parameters | Standard token parameters (no equity-specific deployment parameters) |
| Use Case | Common stock, preferred shares, restricted stock units |

The Equity preset provides governance voting rights and historical ownership records. Voting Power implements ERC-5805-compatible delegation, enabling integration with on-chain governance frameworks or serving as the record of voting rights for off-chain governance.

**Fund Preset**
| Aspect | Configuration |
|--------|--------------|
| Token Features | AUM Fee, Voting Power, Historical Balances |
| Compliance Modules | Per jurisdiction (typically Identity Verification + Country Allow List) |
| Key Parameters | Fee rate in basis points |
| Use Case | Investment funds, ETFs, managed portfolios, REIT units |

The Fund preset adds AUM-based management fees to the governance and snapshot capabilities. The fee is inflationary — new tokens are minted to the fee recipient — replicating the traditional fund management fee structure transparently on-chain.

**StableCoin Preset**
| Aspect | Configuration |
|--------|--------------|
| Token Features | Historical Balances, Permit |
| Compliance Modules | CollateralComplianceModule + jurisdiction-specific modules |
| Key Parameters | Collateral proof topic (ERC-735), collateral ratio (basis points), trusted issuers |
| Use Case | Fiat-pegged stablecoins, asset-backed tokens, tokenized deposits |

The StableCoin preset ensures that minting cannot exceed on-chain proof of reserves. The CollateralComplianceModule validates that a valid, non-expired collateral claim exists with sufficient backing before allowing any mint operation. Collateral ratios can be set at 100% (10,000 bps) for 1:1 backing or higher for over-collateralization (e.g., 15,000 bps = 150%).

**Deposit Preset**
| Aspect | Configuration |
|--------|--------------|
| Token Features | Historical Balances |
| Compliance Modules | Per jurisdiction (CollateralComplianceModule optional for backed deposits) |
| Key Parameters | Standard token parameters |
| Use Case | Tokenized bank deposits, cash equivalents, money market instruments |

The Deposit preset is intentionally minimal — a general-purpose deposit token with balance snapshots. Additional features and compliance modules can be added based on the specific instrument requirements.

**Real Estate Preset**
| Aspect | Configuration |
|--------|--------------|
| Token Features | Historical Balances |
| Compliance Modules | CappedComplianceModule + jurisdiction-specific modules |
| Key Parameters | Supply cap (matching property valuation/fractionalization), property metadata |
| Use Case | Fractional property ownership, REIT tokenization, commercial real estate |

The Real Estate preset enforces a fixed supply cap representing the property valuation. The legacy `DALPRealEstate` type includes a premint mechanism: the factory mints the full supply to a recipient then pauses, locking the cap to the preminted amount. Burn is disabled at the asset level, preserving real estate unit integrity.

**Precious Metal Preset**
| Aspect | Configuration |
|--------|--------------|
| Token Features | Historical Balances |
| Compliance Modules | Per jurisdiction (no supply cap — dynamic supply based on vault backing) |
| Key Parameters | Standard token parameters, no supply cap |
| Use Case | Tokenized gold (PAXG-style), silver, platinum, precious metal custody |

The Precious Metal preset follows a pooled custody model where supply grows as vault deposits increase. Unlike Real Estate, there is no supply cap because the token supply should reflect actual vault holdings. This is a PAXG-style model where each token unit represents a claim on a specific weight of metal in custody.

### 4.2 Legacy Specialized Types

DALP maintains seven **legacy specialized contract types** that predate the DALPAsset system. These contracts have their capabilities compiled in at deployment time and cannot be modified after deployment:

| Type | Embedded Capabilities | When to Use |
|------|----------------------|-------------|
| **DALPBond** | SMARTRedeemableUpgradeable, SMARTYieldUpgradeable (legacy), SMARTCappedUpgradeable, SMARTHistoricalBalancesUpgradeable | When regulation requires compile-time immutability for fixed-income features |
| **DALPEquity** | ERC20VotesUpgradeable, SMARTHistoricalBalances | When regulation requires immutable governance mechanics |
| **DALPFund** | Management fee logic (embedded), ERC20VotesUpgradeable, SMARTHistoricalBalancesUpgradeable | When regulation requires immutable fee structures |
| **DALPStableCoin** | SMARTCollateralUpgradeable, SMARTHistoricalBalancesUpgradeable | When collateral proofs must be compile-time guaranteed |
| **DALPDeposit** | SMARTHistoricalBalances | Tokenized bank deposits with minimal features |
| **DALPRealEstate** | SMARTCapped, SMARTHistoricalBalances, premint mechanism | Real estate tokenization where units cannot be destroyed |
| **DALPPreciousMetal** | SMARTHistoricalBalances | Precious metal-backed tokens with dynamic supply |

**Key distinction**: Legacy types exist for regulatory scenarios where an auditor or regulator requires proof that certain capabilities are *immutably embedded* in the contract code and cannot be reconfigured post-deployment. For all other scenarios, DALPAsset with the equivalent preset provides the same functionality with the added flexibility of runtime configuration.

**Coexistence**: Legacy types are fully supported, not deprecated — no migration is required. They use the same compliance engine, Identity Registry, access control model, and per-asset role system as DALPAsset. The choice between legacy and DALPAsset is driven by regulatory requirements, not technical limitations.

### 4.3 Custom Configurations

Beyond the presets, DALPAsset supports **any combination** of token features and compliance modules. This is where the configuration-driven approach truly differentiates:

**Example: Convertible Bond**
- Features: Maturity Redemption + Fixed Treasury Yield + Conversion (loan-side) + Historical Balances
- Compliance: MiCA template + Investor Count limit
- Behavior: Pays coupon until maturity, with conversion option to equity token at configured ratio. If converted before maturity, loan tokens are burned and equity tokens minted atomically.

**Example: Revenue-Sharing Token**
- Features: Transaction Fee + Transaction Fee Accounting + Historical Balances + Voting Power
- Compliance: Reg D 506(c) template (accredited investors only)
- Behavior: Every transfer generates a fee to the treasury; holders have governance rights over fee distribution. Transaction Fee Accounting provides the on-chain audit trail for off-chain reconciliation.

**Example: Money Market Fund Token**
- Features: AUM Fee + Permit + Historical Balances
- Compliance: MAS Singapore template + TimeLock (180-day holding period)
- Behavior: Management fee accrues over time; gasless approvals for institutional custody workflows; 180-day holding period enforced with FIFO batch tracking.

**Example: Over-Collateralized Deposit Token**
- Features: Historical Balances + Permit
- Compliance: CollateralComplianceModule (150% ratio = 15,000 bps) + Identity Verification (KYC + AML expression) + Country Allow List
- Behavior: Every mint requires 150% collateral backing verified via on-chain claims. Permits enable institutional custody workflows. Full KYC/AML identity verification for all holders.

**Example: Tokenized Real Estate Investment Trust (REIT)**
- Features: AUM Fee + Historical Balances + Voting Power
- Compliance: CappedComplianceModule + Identity Verification + Country Allow List + Investor Count
- Behavior: Management fee for REIT operator, governance voting for investor decisions, capped supply representing property portfolio valuation, limited to qualified investors in permitted jurisdictions.

---

## 5. Configuration vs. Coding: The Key Differentiator

### 5.1 The Traditional Approach

In the traditional security token engineering model, creating a new financial instrument requires:

1. **Requirements gathering** (2-4 weeks): Legal, compliance, and technical teams align on the instrument's properties
2. **Smart contract development** (4-8 weeks): Solidity engineers write custom contracts implementing the specific instrument logic
3. **Security audit** (4-12 weeks): External auditors review the custom code for vulnerabilities
4. **Deployment and testing** (2-4 weeks): Deploy to testnet, run integration tests, deploy to mainnet
5. **Ongoing maintenance**: Every change to the instrument's behavior requires a new development-audit-deploy cycle

**Total timeline: 3-7 months per instrument type**

This model does not scale. A financial institution offering bonds, equities, funds, and structured products needs four separate development tracks — each with its own codebase, audit, and maintenance burden. At $200-500K per audit and 4-12 weeks per cycle, the cost of launching a diverse tokenized product line is measured in millions of dollars and years of calendar time.

### 5.2 The DALP Configuration Model

DALP replaces custom development with configuration:

1. **Select a preset or start from DALPAsset** (minutes): Choose the closest instrument type or start with a blank canvas
2. **Configure token features** (hours): Select and order the capabilities the instrument needs — fees, yield, governance, lifecycle
3. **Configure compliance modules** (hours): Select a regulatory template and customize module parameters for the specific jurisdiction and offering
4. **Deploy through the Asset Factory** (minutes): The factory deploys a pre-audited, battle-tested contract with the selected configuration
5. **Ongoing management** (runtime): Features and compliance modules can be reconfigured without redeployment

**Total timeline: hours to days per instrument type**

### 5.3 What Configuration Means in Practice

Configuration in DALP is not "low-code" or "drag-and-drop." It is a structured selection of pre-audited, formally verified smart contract modules that compose into a coherent financial instrument. The key architectural decisions are:

**Pre-audited components**: Every token feature and compliance module has been independently audited. Composing audited modules does not require re-auditing the composition (unlike custom code that requires auditing every change). The audit scope includes individual module security, inter-module interaction patterns, and the hook/ordering system itself.

**Formal interface contracts**: The ISMARTFeature interface defines exactly how features interact with the token lifecycle. There is no ad-hoc integration — every feature must implement the same hooks, follow the same ordering rules, and respect the same access control model. The `validateParameters` function on compliance modules ensures configuration validity at bind time, not at runtime.

**Deterministic deployment**: The Asset Factory ensures that every token deployed through DALP has identical security properties. There is no variance between deployments — the same configuration always produces the same contract behavior. The durable workflow orchestrated through Restate guarantees idempotent deployment with terminal failure detection.

**Runtime reconfiguration**: Because features are attached at runtime (not compiled in), configuration changes do not require new deployments. Fee rates can be adjusted, compliance modules can be added or removed, and governance parameters can be updated — all through the platform's API or UI, gated by `GOVERNANCE_ROLE`.

**Type-specific parameter encoding**: Each compliance module and token feature has a type-specific parameter encoding validated at configuration time. The DAPI encoding dispatch is explicit — unknown parameter shapes are rejected, not silently accepted. This prevents misconfiguration from reaching on-chain state.

### 5.4 When Custom Development is Still Needed

DALP's configuration model covers the vast majority of regulated financial instruments. However, there are scenarios where the existing feature catalog may not be sufficient:

- **Novel instrument types** that require entirely new on-chain logic (e.g., a new type of derivative settlement mechanism)
- **Regulatory requirements** that mandate compile-time immutability of specific features (addressed by legacy types)
- **Cross-protocol integrations** that require custom smart contract interfaces beyond what DALP's feature system supports

In these cases, the legacy specialized contract types provide a path for custom development within the DALP ecosystem, maintaining compatibility with the compliance engine, identity system, and access control model.

---

## 6. Per-Asset Role-Based Access Control

### 6.1 The Seven Per-Asset Roles

Every token contract — DALPAsset and legacy specialized types — uses the same seven roles defined in `DALPAssetRoles.sol`. Roles are scoped per asset: holding `GOVERNANCE_ROLE` on Token A grants no power over Token B.

| Role | Scope | Key Actions |
|------|-------|-------------|
| **Default Admin** | Role management | Grant and revoke all other per-asset roles; no operational powers |
| **Governance** | Configuration and compliance | Set identity contracts, compliance modules, token features (DALPAsset only), metadata |
| **Supply Management** | Minting and burning | Mint, burn, batch operations, set supply cap |
| **Custodian** | Asset protection | Freeze addresses or partial amounts, forced transfers, wallet recovery |
| **Emergency** | Incident response | Pause and unpause operations, recover stuck ERC-20 tokens |
| **Sale Admin** | Token sale (addon only) | Manage token sale configuration and lifecycle |
| **Funds Manager** | Sale funds (addon only) | Withdraw funds from token sales |

### 6.2 Separation-of-Duties Invariants

The role model enforces hard separation-of-duties invariants enforced at the smart contract level via OpenZeppelin `AccessControl` modifiers:

- **Admin grants roles but has no operational powers** — cannot mint, burn, freeze, pause, or configure. The role-granting authority cannot execute privileged operations.
- **Supply Management cannot freeze; Custodian cannot mint** — operational segregation ensures the entity issuing tokens is not the entity that can freeze or recover them.
- **Emergency is limited to pause and recovery** — cannot mint, configure compliance, or execute forced transfers. The incident-response role can halt the system but cannot alter its state.
- **Governance configures policy; Supply Management executes issuance** — the entity setting compliance rules does not control token supply.
- **Sale Admin configures sales; Funds Manager withdraws proceeds** — separating sale lifecycle management from fund withdrawal prevents a single operator from both launching a sale and extracting its funds.

### 6.3 Token Holder Permissions

Any address holding a token balance can perform the following actions (subject to compliance module checks):

- **Transfer tokens**: Standard ERC-20 transfers, validated by compliance modules before execution
- **Redeem at maturity**: If Maturity Redemption is attached, holders redeem tokens after maturity date
- **Vote and delegate**: If Voting Power is attached, holders delegate voting weight and participate in governance
- **Claim yield**: If Fixed Treasury Yield is attached, holders claim accrued yield distributions

Token holder actions require no on-chain role assignment. The holder's address must pass the identity and compliance checks configured by the Governance role.

---

## 7. Multi-Token Support and Portfolio Management

### 7.1 System-Level Token Management

DALP operates at the system level, not the individual token level. A single DALP deployment manages an entire portfolio of token contracts:

- **Token Factory Registry**: All deployed tokens are registered in a system-wide registry, providing a single point of discovery and enumeration. Global compliance contracts maintain storage of bound token-compliance contracts with `TokenComplianceBound`/`TokenComplianceUnbound` events for platform-wide oversight.
- **Unified Compliance Infrastructure**: Compliance modules are deployed once at the system level and configured per-token. This means a CountryAllowList module deployed for MiCA compliance can be used by every EU-regulated token in the system — a single module instance serves all tokens, each with its own parameter configuration.
- **Shared Identity Registry**: All tokens in a DALP system share the same Identity Registry. An investor verified once can interact with any token that accepts their identity claims — no per-token re-verification. The Identity Registry binding is per-token (a wallet registered for Token A is not automatically registered for Token B), but the underlying identity and claims are reusable.
- **Cross-Token Operations**: The platform's API provides cross-token query capabilities — portfolio balances, aggregate compliance status, and multi-token transaction history.

### 7.2 Portfolio View and Asset Discovery

The platform provides portfolio management capabilities through its read model:

- **User Asset Projection**: For each authenticated user, the platform projects their token holdings across all registered tokens, including balance, value (if price feeds are configured), and compliance status
- **Token Discovery**: Global search capabilities allow finding tokens by name, symbol, address, or metadata — with results scoped to the user's permission level
- **Activity Tracking**: Per-account activity history tracks all blockchain events (transfers, mints, burns, compliance checks, role changes) with time-series aggregation for charting and reporting
- **Account Resolution**: DALP provides address-to-display-name resolution, prioritizing Contact → User (by wallet) → Identity (OnchainID) → Contract name → Address fallback

### 7.3 Cross-Token Settlement

DALP's XvP (Exchange vs. Payment) settlement capability enables atomic cross-token operations:

- **Delivery vs. Payment (DvP)**: Atomic exchange of a security token for a payment token (e.g., bond tokens for USDC). Both legs complete or both revert — there is never a state where one party has delivered but not received payment.
- **Exchange vs. Payment (XvP)**: Generalized multi-party, multi-asset atomic settlement. Multiple parties can exchange multiple token types in a single atomic transaction.
- **Compliance Integration**: All legs of a cross-token settlement are subject to the compliance rules of each token involved. If any compliance check fails on any leg, the entire settlement reverts.

### 7.4 Distribution Mechanisms

DALP provides multiple distribution mechanisms beyond standard minting:

**Token Sale / Primary Offering**: A configurable sale contract supporting two-phase flow (optional presale → public sale), multi-currency ERC-20 payment acceptance, per-investor purchase limits, optional vesting, and soft-cap/hard-cap mechanics with refund safety. The token sale has a full DAPI + UI stack with a five-tab operational console (overview, purchases, currencies, whitelist, vesting).

**Airdrop Distribution**: Merkle tree-based token distribution with three variants:
- **Push Airdrop**: Admin-initiated distribution to recipients
- **Time-Bound Airdrop**: Windowed self-claim with start/end time enforcement
- **Vesting Airdrop**: Two-phase (initialize vesting → claim) with pluggable vesting strategies (linear vesting currently implemented)

All airdrop variants share Merkle proof verification, pluggable claim tracking, and 7-day timelocked withdrawal safety.

### 7.5 Data Feed Integration

Tokens can be connected to external data feeds for pricing, NAV calculation, and collateral valuation:

- **Price Feeds**: External price data (from oracles or authorized feed providers) can be published to the platform and used by compliance modules (e.g., TokenSupplyLimit with base-price conversion for EUR/USD-denominated caps)
- **NAV Feeds**: Fund tokens can receive NAV updates that drive AUM fee calculations
- **Collateral Feeds**: StableCoin tokens with CollateralComplianceModule can verify collateral ratios against external proof-of-reserve feeds

Feed submission uses a specialized path with EIP-712 signing for data integrity, delegated through Restate for durable execution.

---

## 8. Deployment Architecture

### 8.1 Asset Factory Pipeline

The Asset Factory is not a simple contract deployer — it is a multi-step durable workflow orchestrated through Restate (DALP's durable execution engine). The workflow dispatches creation to class-specific handlers and forwards class-only parameters (e.g., bond maturity/face value, fund management fees, real-estate premint) before decoding canonical `TokenAssetCreated` receipt data.

Key architectural properties:

- **Durable and idempotent**: If any step fails, the entire deployment can be resumed from the last successful step without creating orphaned contracts or inconsistent state
- **Terminal failure detection**: Missing `TokenAssetCreated` receipt event is treated as terminal failure — issuance cannot complete without deterministic address extraction
- **Class-aware claim enrichment**: Claim issuance varies per asset class (classification, location, pricing, identifier claims) and fails terminally on partial claim issuance
- **Permission bootstrapping**: The workflow materializes a permission plan, defaulting to creator=`governance` when `initialPermissions` is empty, then extends for optional unpause support

### 8.2 Upgrade Path

DALPAsset uses the UUPS (Universal Upgradeable Proxy Standard) pattern for upgrades:

- **Implementation upgrades**: The underlying DALPAsset implementation can be upgraded to add new capabilities, fix bugs, or optimize gas usage — without changing the token's address or state
- **Feature upgrades**: Individual token features can be upgraded independently of the token contract
- **Compliance module upgrades**: Compliance modules can be replaced or upgraded without touching the token contract
- **Governance controls**: All upgrades require appropriate role authorization (typically `admin` or `governance` roles)
- **Directory-managed upgradeability**: Updating the implementation address in the directory upgrades all tokens simultaneously

### 8.3 Multi-Chain Deployment

DALP supports deployment on any EVM-compatible blockchain network. The platform abstracts the chain-specific details (gas estimation, nonce management, transaction confirmation) while maintaining the same token architecture across chains. Token configuration, compliance rules, and access control work identically regardless of the underlying chain.

---

## 9. Security Model

### 9.1 Contract-Level Security

- **UUPS Proxy Pattern**: Prevents unauthorized upgrades — only the designated admin can point the proxy to a new implementation
- **Access Manager Integration**: OpenZeppelin's AccessManager contract provides the on-chain authorization layer for all privileged operations
- **Reentrancy Protection**: All state-changing operations in DALPAsset and token features are protected against reentrancy attacks. The `payout()` function on DALPAssetImplementation is explicitly non-reentrant.
- **Integer Overflow Protection**: Solidity 0.8+ built-in overflow checks are active throughout the codebase
- **Feature-Gated Payouts**: Treasury payout calls are gated by feature registration — only attached features can trigger payouts, preventing arbitrary withdrawal
- **CEI Pattern**: Critical operations (yield claims, maturity redemption) follow the Checks-Effects-Interactions pattern to prevent reentrancy

### 9.2 Operational Security

- **Role Separation**: The 7 per-asset roles enforce segregation of duties — the same address cannot be both supply manager and compliance manager without explicit dual-role assignment
- **Wallet Verification**: Sensitive mutations require step-up verification (PIN code, secret codes, or OTP) beyond the initial authentication. API-key sessions bypass wallet verification (the key itself serves as the authorization factor).
- **Emergency Controls**: The `emergency` role provides a kill switch (pause) that immediately halts all token operations
- **Audit Trail**: Every operation emits events that are indexed and queryable through the platform's read model, providing a complete and immutable audit trail
- **Hostile Input Validation**: The Asset Designer enforces input validation with regression tests covering SQLi-like, XSS-like payloads, unicode, and boundary inputs

### 9.3 Compliance Security

- **Ex-ante enforcement**: Compliance is checked *before* execution, not after. Non-compliant states cannot exist on-chain.
- **Module veto power**: Any single compliance module can block a transfer. This is a fail-closed design — the default is denial unless all modules explicitly approve.
- **Identity binding**: Compliance operates on verified identities, not wallet addresses. A wallet address alone is insufficient to participate in any regulated token operation.
- **Claim integrity enforcement**: Auto-claim validation enforces topic-specific integrity contracts before trusted-issuer writes reach chain state — boolean topics only accept `"true"`, KYC claims are validated against approved profile content hashes.
- **Bypass governance**: Compliance bypass is exclusively managed at the Global Compliance tier with `DIRECTORY_ADMIN_ROLE` authorization, not at the per-token level.

---

## 10. Configuration Examples: Institutional Deployment Scenarios

### 10.1 Regulated Corporate Bond (EU MiCA)

A European bank issues a EUR 50M corporate bond with 3.5% annual coupon, 5-year maturity:

| Configuration | Value |
|--------------|-------|
| Asset Type | Bond |
| Name | "EuroBank Corporate Bond 2031" |
| Symbol | "EURB31" |
| Decimals | 18 |
| Country Code | 276 (Germany) |
| Price Currency | EUR |
| Base Price | 1000 |
| Cap | 50000 (EUR 50M at EUR 1,000 face value) |
| **Token Features** | |
| Fixed Treasury Yield | 350 bps annual, quarterly payment interval, EUROC denomination |
| Maturity Redemption | March 2031 maturity, EUR 1,000 face value, EUROC payout |
| Historical Balances | Required for yield calculation |
| **Compliance Modules** | |
| Identity Verification | RPN expression: `[KYC, AML, AND]` |
| Country Allow List | 27 EU member state codes |
| CappedComplianceModule | maxSupply = 50,000 |
| TokenSupplyLimit | EUR 8M lifetime cap with base-price conversion (MiCA requirement) |

### 10.2 US Equity Offering (Reg D 506(c))

A US fintech company issues tokenized Series B preferred shares to accredited investors:

| Configuration | Value |
|--------------|-------|
| Asset Type | Equity |
| Name | "TechCo Series B Preferred" |
| Symbol | "TCPB" |
| Decimals | 0 (whole shares) |
| Country Code | 840 (United States) |
| Price Currency | USD |
| Base Price | 25.00 |
| Cap | 4000000 (4M shares) |
| **Token Features** | |
| Voting Power | ERC-5805 delegation for governance |
| Historical Balances | Shareholder record snapshots |
| **Compliance Modules** | |
| Identity Verification | RPN expression: `[ACCREDITED]` (strict — accredited only) |
| Country Allow List | `[840]` (US only) |
| InvestorCount | Global limit: 2,000 |
| TransferApproval | 24-hour expiry, one-time use, no exemptions |

### 10.3 Singapore Investment Fund (MAS)

An asset manager launches a tokenized investment fund under Singapore MAS guidelines:

| Configuration | Value |
|--------------|-------|
| Asset Type | Fund |
| Name | "Asia Growth Fund I" |
| Symbol | "AGF1" |
| Decimals | 18 |
| Country Code | 702 (Singapore) |
| Price Currency | SGD |
| Base Price | 100 |
| **Token Features** | |
| AUM Fee | 200 bps annual (2% management fee) |
| Voting Power | Investor governance over fund strategy |
| Historical Balances | NAV calculation snapshots |
| Permit | Gasless approvals for institutional custody |
| **Compliance Modules** | |
| Identity Verification | RPN expression: `[CONTRACT, KYC, AML, AND, OR]` (QII or KYC+AML) |
| Country Allow List | `[702]` (Singapore) |
| InvestorCount | Global limit: 50 |
| TimeLock | 180-day holding period (15,552,000 seconds), no exemptions |
