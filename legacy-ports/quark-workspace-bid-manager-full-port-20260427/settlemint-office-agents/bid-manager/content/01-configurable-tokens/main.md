# Configurable Token Architecture

## Executive Summary

Issuing a token is no longer the difficult part of digital asset programs. The difficult part is preserving governance, compliance, and servicing flexibility after launch, when the instrument needs to evolve without creating a new contract estate every time requirements change. DALP addresses that problem through a single governed asset foundation aligned with ERC-3643, then extends that foundation through runtime-configurable token features and attached operational add-ons.

That architecture matters because institutions do not launch static instruments. A product may begin as a straightforward issuance, then require maturity handling, fee treatment, historical entitlement tracking, or additional governance controls as the business model matures. DALP is designed for that lifecycle. Instead of replacing the token contract, the platform applies approved feature combinations to the same asset foundation, preserving continuity for governance, wallets, operations, and reporting.

The practical advantage is lower change friction. Institutions get a standards-based token model, a stable control surface, and a clearer path from first issuance to multi-asset expansion. This is the real value of configurable tokens: less reinstrumentation risk, less contract sprawl, and more control over how the instrument evolves in production.

---

## 1. Token Contract Architecture

### 1.1 The DALPAsset Foundation

At the core of DALP's token system is **DALPAsset**: a unified, upgradeable token contract built on the ERC-3643 (T-REX) standard. DALPAsset is not simply an ERC-20 token with compliance bolted on; it is a purpose-built financial instrument contract that integrates identity verification, compliance enforcement, access control, and configurable token economics into a single coherent architecture.

**Core Contract Properties:**

| Property | Implementation |
|----------|---------------|
| Base Standard | ERC-20 (fungible tokens) |
| Compliance Layer | ERC-3643 / SMART Protocol |
| Upgradeability | UUPS proxy pattern |
| Access Control | OpenZeppelin AccessManager with 7 per-asset roles |
| Feature System | ISMARTFeature interface, runtime-configurable extensions |
| Identity Binding | OnchainID integration via Identity Registry |
| Configuration Extension | SMARTConfigurable, attach/remove features post-deployment |

DALPAsset extends the SMART Protocol (ERC-3643) with the `SMARTConfigurable` extension, which allows any combination of token features to be attached and reconfigured at runtime, after the token is deployed. This eliminates the need to commit to a specialized contract type at deployment time. A DALPAsset token can evolve: start as a simple bearer instrument, then have fee features added, governance enabled, or maturity redemption configured, all without redeploying. External systems (wallets, indexers, dashboards) interact via standard ERC-20 and ERC-3643 interfaces, ensuring broad compatibility with existing infrastructure.

DALPAsset contracts are deployed through the **Asset Factory**: a controlled deployment pipeline that ensures every token created on the platform inherits the correct security model, compliance hooks, and access control structure. The factory is not merely a convenience wrapper; it is a security boundary that prevents misconfigured or unauthorized token deployments. The factory deploys UUPS proxy contracts pointing to the DALPAsset implementation, initializes the compliance engine, binds the token to the Identity Registry, configures features in the specified order, and assigns initial roles.

### 1.2 Supported Token Standards

DALP's token architecture is built on established Ethereum token standards, each serving a specific purpose in the financial instrument lifecycle:

**ERC-20 (Fungible Tokens)**
The foundational standard for all DALP tokens. Every DALPAsset implements the full ERC-20 interface, ensuring compatibility with wallets, exchanges, DeFi protocols, and any Ethereum tooling that supports the standard. This includes standard `transfer`, `approve`, `transferFrom` functions, as well as events for transfer tracking and approval management. ERC-20 compatibility means that any existing blockchain infrastructure, from block explorers to custody platforms to accounting systems, can interact with DALP tokens without custom integration work.

**ERC-3643 / T-REX (Token for Regulated EXchanges)**
The compliance layer that transforms a basic ERC-20 into a regulated security token. ERC-3643 is an open Ethereum standard, not a proprietary SettleMint invention, and it mandates four critical additions:

- **Identity Registry**: Every token holder must have a verified on-chain identity. This is not optional, wallets without a registered identity cannot receive tokens.
- **Compliance Engine**: All transfers pass through a modular compliance check before execution. The engine evaluates sender, recipient, and transaction context through a sequence of compliance modules.
- **Trusted Issuers**: Identity claims (KYC status, accreditation, jurisdiction) must originate from pre-approved claim issuers, not self-asserted. A wallet holder cannot declare themselves accredited; a trusted issuer must attest to this fact on-chain.
- **Transfer Restrictions**: The token contract enforces rules that go beyond simple balance checks, investor limits, country restrictions, holding periods, collateral requirements, and more.

DALP implements ERC-3643 through the **SMART Protocol** (SettleMint Asset Regulatory Technology). This implementation follows the ERC-3643 specification while adding features required for institutional deployment: upgradeable compliance modules, RPN expression evaluation for identity claims, multi-jurisdictional regulatory templates, and a three-tier compliance interface hierarchy for incremental migration.

**ERC-1400 Compatibility**
While DALP's primary standard is ERC-3643, the architecture supports ERC-1400-style partitioned securities through compliance module configuration. Partition-like behavior, such as restricting certain tranches of tokens to specific investor classes, is achieved through the compliance module system rather than a separate partition standard. This approach provides the regulatory benefits of partitioned securities (different rules for different holder classes) without the complexity of maintaining multiple token partition states.

**ERC-721 (Non-Fungible Tokens)**
DALP's architecture is primarily oriented toward fungible financial instruments. Non-fungible use cases (such as unique real estate parcels or individual loan certificates) are addressed through the RealEstate asset preset with per-unit tracking, rather than through a full ERC-721 implementation. Each unit in a real estate tokenization can represent a distinct property while maintaining fungibility within the same class.

**ERC-5805 (Voting Power)**
DALP implements the ERC-5805 standard for governance voting power through the Voting Power token feature. This provides ERC20Votes-compatible delegation with historical tracking, timestamp-based clock mode (`CLOCK_MODE() = "mode=timestamp"`), and EIP-712 domain separation for meta-transaction support. Token balances become voting units, and the feature maintains vote checkpoints synchronized through SMART feature hooks on transfer, mint, burn, and redemption operations.

**EIP-2612 (Permit)**
Gasless approval functionality is available through the Permit token feature, implementing EIP-2612. This allows token holders to sign approvals off-chain, and any address can submit the signature on-chain, eliminating the need for a separate approval transaction before a transfer. For institutional workflows where a custodian submits transactions on behalf of clients, this reduces gas costs and operational friction.

### 1.3 The SMART Protocol Integration

DALP's implementation of ERC-3643 is called the **SMART Protocol** (SettleMint Asset Regulatory Technology). This integration provides three critical capabilities that distinguish it from basic ERC-3643 implementations:

**Ex-ante compliance enforcement**: All compliance checks execute *before* a transfer is committed to the blockchain, not after. If a transfer would violate any configured compliance rule, it reverts atomically, there is never a state where non-compliant tokens exist in an unauthorized wallet. This is not a design preference; it is a regulatory necessity. For regulated securities, ex-post compliance (check after transfer) creates immutable on-chain evidence of violations, a reputational and regulatory liability that no institution should accept.

**Modular compliance binding**: Each token is bound to a compliance engine that orchestrates multiple compliance modules. Modules can be added, removed, or reconfigured without redeploying the token contract. The compliance engine evaluates all configured modules in sequence, a single module veto blocks the transfer. This fail-closed design means the default is denial unless all modules explicitly approve.

**Identity-aware transfers**: Every transfer operation resolves the sender's and recipient's on-chain identity before evaluating compliance rules. This means compliance modules can make decisions based on investor attributes (country, accreditation status, KYC level) rather than just wallet addresses. The identity resolution happens through the Identity Registry, which maps wallet addresses to OnchainID contracts containing verified claims from trusted issuers.

**Three-tier compliance interface hierarchy**: DALP's compliance contract layer uses a three-tier interface that separates system-wide, per-token, and standard-compliant concerns:

| Tier | Interface | Scope |
|------|-----------|-------|
| Tier 1 | `IDALPGlobalCompliance` | System-wide bypass list, global modules, token-compliance binding |
| Tier 2 | `IDALPTokenCompliance` | Per-token compliance hooks with dual v1/v2 support |
| Tier 3 | `ISMARTComplianceV2` | ERC-3643 aligned 3-argument hooks for new tokens |

This hierarchy enables incremental migration of individual tokens to the latest compliance hook format without requiring a coordinated platform-wide cutover. The original monolithic interface is preserved for ERC-165 backward compatibility across UUPS proxy upgrades.

---

## Composable by Design: Why DALP's Token Architecture Is Different

Most tokenization platforms take one of two approaches, and both fail at scale.

**Approach 1: Rigid pre-built token types.** The platform ships a "bond token" contract, an "equity token" contract, and a "fund token" contract. Each has its capabilities compiled in. Need a convertible bond with voting rights and AUM fees? That doesn't exist as a pre-built type. You wait for the vendor to build it, or you hack together a workaround.

**Approach 2: Blank-slate smart contract toolkits.** The platform gives you Solidity libraries and says "build what you need." Maximum flexibility, but you're back to months of custom development, security audits at $200-500K per engagement, and ongoing maintenance for every variant.

**DALP takes a third approach: composable configuration.**

At the core is a single, unified, audited token contract, **DALPAsset**: that can represent *any* financial instrument through runtime configuration. This isn't a simplified "low-code" wrapper. It's a genuine composable architecture where:

### Token Features Are Modular and Selectable

DALPAsset supports up to 32 pluggable token features that define the instrument's economic behavior. These aren't abstract capabilities, they are concrete, pre-audited smart contract extensions that integrate through a standardized hook system (`ISMARTFeature`):

| Feature Category | Available Features | What They Control |
|-----------------|-------------------|-------------------|
| **Fees & Charges** | AUM Fee, Transaction Fee, External Transaction Fee, Transaction Fee Accounting | Three fee architectures: net-deduction with per-operation rates, inflationary time-based management fees, cross-currency fixed fees, and accounting-only tracking with exemptions and reconciliation cycles |
| **Governance & Snapshots** | Voting Power (ERC-5805), Historical Balances, Permit (EIP-2612) | Governance rights, point-in-time ownership records, gasless approvals |
| **Lifecycle & Yield** | Maturity Redemption, Fixed Treasury Yield | Bond maturity, coupon payments, redemption mechanics |
| **Transformation** | Conversion (Loan-to-Equity) | Convertible instrument mechanics, debt-to-equity conversion |

Features can be **added, removed, and reordered after deployment** via the `SMARTConfigurable` extension and `setFeatures()`: without redeploying the token contract. A bond can start with yield and maturity features, then later add voting power for governance. An equity token can add AUM fees if it transitions into a managed product. The instrument evolves; the contract stays the same.

### Compliance Modules Are Independently Composable

The 12 compliance module types are not a monolithic compliance engine, they are independently deployable, per-token configurable rule primitives that compose through sequential AND evaluation:

- **Eligibility modules** (Identity Verification, Identity Allow List, Identity Block List), who can participate
- **Restriction modules** (Country Allow List, Country Block List, Address Block List), where transfers can flow
- **Transfer control modules** (Transfer Approval, TimeLock), how transfers execute
- **Issuance and supply modules** (Token Supply Limit, Capped, Investor Count), how much can be created
- **Settlement and collateral modules** (Collateral Compliance), what backing is required

Each module has type-specific parameters validated at configuration time through a discriminated-union schema. Modules can be added, removed, or reconfigured without redeploying the token contract, through governed administrative operations requiring `GOVERNANCE_ROLE`.

### Metadata Schemas Are Customizable

Beyond token features and compliance modules, DALP supports **fully customizable metadata schemas** per instrument template. Each metadata field is configured with:

- **Type**: string, number, enum, or custom types
- **Mutability**: immutable (locked after creation) or restricted-mutable (updatable by authorized parties)
- **Required status**: mandatory or optional

This means a real estate token can carry GPS coordinates, property classification, building specifications, and district codes. A bond can carry ISIN, face value, and denomination asset details. A fund can carry investment category, fund class, and management fee parameters. The metadata model is defined by the institution, not hardcoded by the platform.

### Operational Add-Ons Extend Without Modifying

DALP's add-on system provides standalone operational workflows that attach to tokens without modifying the token contract:

| Add-On | Purpose |
|--------|---------|
| **XvP Settlement** | Atomic Delivery-vs-Payment and Exchange-vs-Payment settlement |
| **Token Sale** | Primary offering with two-phase flow, multi-currency acceptance, vesting |
| **Airdrop** | Merkle tree-based distribution (push, time-bound, vesting variants) |
| **Vault** | Treasury management for payout-oriented features |
| **Fixed Yield Schedule** | Coupon payment automation with treasury integration |
| **Data Feeds** | External price, NAV, and collateral data integration |

Each add-on deploys through its own factory with governance controls, identity binding, and audit trails, independent of the token's core contract.

### What This Composability Means in Practice

A European bank issuing a MiCA-compliant corporate bond configures: Maturity Redemption + Fixed Treasury Yield + Historical Balances as token features, Identity Verification (KYC AND AML) + Country Allow List (EU 27) + Token Supply Limit (EUR 100M rolling) + Investor Count as compliance modules, plus bond-specific metadata (ISIN, face value, maturity date) and a Fixed Yield Schedule add-on for coupon payments.

A Singapore fund manager launching a tokenized investment fund configures: AUM Fee + Voting Power + Historical Balances + Permit as token features, Identity Verification (QII OR KYC+AML) + Country Allow List (Singapore) + Investor Count + TimeLock (180-day hold) as compliance modules, plus fund-specific metadata (investment category, fund class, fee rate).

Both use the same DALPAsset contract. Both are deployed in hours through the Asset Designer. Both are fully auditable, fully compliant, and fully reconfigurable post-deployment. Neither required a single line of custom Solidity.

**That is what composable tokens + configurable compliance means in practice: any instrument, any compliance posture, configured from pre-audited modules, deployed through a controlled pipeline, and adaptable as requirements evolve.**

For proposal writers, this is the default lead when evaluators ask about flexibility, future-proofing, or multi-asset expansion. Do not start with generic claims about customization. Start with the operational consequence of DALP's architecture: one governed asset foundation can absorb new token features, new compliance combinations, and new servicing requirements without forcing the institution into a contract migration project each time the product evolves. That is the practical distinction evaluators care about. It turns flexibility from a vague promise into a governed operating model.

---

## 2. Token Features: The Capability System

### 2.1 Architecture Overview

Token features are **runtime-configurable extensions** to DALPAsset via the `ISMARTFeature` interface. They extend token economics, fees, yield, governance, and lifecycle, without requiring contract redeployment. This is the mechanism that allows a single DALPAsset contract to behave like a bond, an equity share, a fund unit, a stablecoin, or a structured product.

**Important distinction**: Token features are for extending token economics. They are not compliance modules (which restrict, approve, or reject transfers at the legal/compliance level) and not capabilities (standalone operational workflows like airdrops, vaults, or settlement). Before choosing a token feature, confirm the right tool:

| Need | Right Tool |
|------|-----------|
| Restrict, approve, or reject transfers at legal/compliance level | Compliance Modules |
| Standalone operational workflow, distribution, treasury, settlement | Capabilities (Airdrop, Vault, XvP) |
| Extend token economics, fees, yield, governance, lifecycle | Token Features |

Features integrate through six lifecycle hooks:

| Hook | Trigger | Purpose |
|------|---------|---------|
| `canUpdate(from, to, value, ...)` | Pre-check before any operation | View-only gate, reverts to block the operation |
| `onMinted(to, amount)` | After minting | Post-mint processing (e.g., FIFO batch recording) |
| `onBurned(from, amount)` | After burning | Post-burn processing (e.g., balance snapshot update) |
| `onTransferred(from, to, amount)` | After transfers | Post-transfer processing (e.g., fee collection, vote checkpoint updates) |
| `onRedeemed(from, amount)` | After redemptions | Redemption lifecycle processing (e.g., voting-unit burn) |
| `onAttached()` | After feature registration via `setFeatures()` | One-time initialization when feature is enabled |

Features with `supportsRewriting() = true` can modify the transfer amount in-flight, for example, deducting a fee before the amount reaches the recipient. Features execute in the order configured by the caller, making ordering an explicit design decision rather than an implicit assumption.

### 2.2 Available Token Features: Detailed Reference

#### Fees & Charges

**AUM Fee (Assets Under Management Fee)**

A time-based management fee calculated as a percentage of total assets under management. This is an *inflationary* fee model, new tokens are minted to the fee recipient rather than deducted from transfers. The formula is:

```
Fee = AUM × feeBps × elapsedTime / (365 days × 10000)
```

Fee collection is triggered by calling `collectFee()`, which mints the accrued fee amount to the configured `feeRecipient`. This model is standard for managed investment vehicles where the fund manager receives compensation proportional to the fund's total value.

| Parameter | Description |
|-----------|-------------|
| `feeBps` | Fee rate in basis points (e.g., 200 = 2.00% annual) |
| `feeRecipient` | Address receiving minted fee tokens |

*Use cases*: Investment fund management fees, asset management fees, platform revenue from managed portfolios. The AUM fee is the primary revenue mechanism for fund tokens, replicating the traditional fund management fee structure in an on-chain, transparent, and automatically calculated form.

*Rate immutability*: The governance role can call `freezeFeeRate()` to permanently lock the AUM fee rate. Once frozen, the rate cannot be modified. For fund structures where the management fee is contractually fixed at launch, this provides investors with on-chain assurance that the rate will not change unilaterally.

*Operational note*: Because AUM Fee mints new tokens, it affects the total supply. Analytics features (Historical Balances, Voting Power) must run after AUM Fee in the feature ordering to observe post-collection supply accurately.

**Transaction Fee**

A per-operation fee feature that deducts a configurable percentage from every mint, burn, or transfer. Each operation type has its own independent fee rate, giving issuers precise control over the economics of primary issuance, position exits, and secondary trading.

| Parameter | Description |
|-----------|-------------|
| `mintFeeBps` | Fee rate in basis points applied to mint operations (e.g., 100 = 1%) |
| `burnFeeBps` | Fee rate in basis points applied to burn operations |
| `transferFeeBps` | Fee rate in basis points applied to transfer operations |
| `feeRecipient` | Treasury address receiving deducted fees |

This per-operation granularity is uncommon among tokenization platforms, which typically offer a single flat fee rate. DALP's three-rate model lets institutions design fee structures that align with their business logic. A fund platform might charge zero on minting to encourage participation while collecting 2.5% on secondary transfers as its revenue model. An exchange operator might differentiate between creation fees, redemption fees, and trading fees. Each rate is independently configurable through `setFeeRates()`, requiring the `GOVERNANCE_ROLE`.

*Rate immutability*: Calling `freezeFeeRates()` permanently locks all three rates. Once frozen, `isFrozen()` returns true and no rate changes are possible. This matters for instruments where fee certainty is contractually required: investors in a tokenized bond fund need assurance that trading fees will not increase after they have committed capital.

*Technical detail*: This feature supports `supportsRewriting = true`, meaning it modifies the actual transfer amount in-flight. If a user sends 1,000 tokens with a 2.5% transfer fee (250 bps), the recipient receives 975 tokens and 25 tokens go to the fee treasury. Features configured after Transaction Fee in the ordering see the post-fee amount.

*Use cases*: Platform revenue collection with operation-specific pricing, liquidity pool contributions, regulatory levy enforcement, differentiated fee schedules for primary issuance vs secondary trading.

**Transaction Fee Accounting**

DALP offers three fee architectures: net-deduction (Transaction Fee), inflationary (AUM Fee), and cross-currency (External Transaction Fee). Transaction Fee Accounting adds a fourth model: accounting-only tracking that creates an on-chain fee ledger without moving tokens. This serves institutions that calculate fees off-chain but need an immutable, auditable record of what was owed.

Like Transaction Fee, it supports three independent rate configurations (mint, burn, transfer) and per-operation identification. Every qualifying operation emits a `FeeAccrued` event carrying the fee type (MINT, BURN, TRANSFER, or REDEEM), the operation amount, the applicable rate, and the calculated fee amount. External indexing systems can categorize fees by operation type for precise financial reporting.

**Fee exemptions.** Fund operators, exchange platforms, and custodians routinely perform treasury-to-treasury rebalances and internal transfers that should not generate fee records. The governance role can mark specific accounts as fee-exempt via `setFeeExemption(account, exempt)`, preventing those accounts from generating `FeeAccrued` events. This keeps the fee ledger accurate for investor-facing reporting. Without exemptions, every internal operational transfer would pollute the fee record, creating reconciliation overhead for finance teams. Exemption status is queryable through `isFeeExempt(account)`.

**Reconciliation cycle.** Accrued fees accumulate as a running total queryable via `getTotalAccruedFees()`. At accounting period boundaries, the governance role calls `reconcileFees()`, which resets the running total and emits a `FeesReconciled` event with the reconciled amount and period-end timestamp. This creates a clean on-chain marker for each accounting period. The reconciliation is an accounting operation, not a token transfer. It closes the tracking period so external systems can finalize billing or regulatory filings.

**Rate immutability.** As with all fee features, `freezeFeeRates()` permanently locks the configured rates.

*Use cases*: Regulatory fee transparency without on-chain collection, off-chain billing systems that invoice based on on-chain activity, compliance audit trails where fee calculations must be documented, and platforms with periodic off-chain settlement.

**External Transaction Fee**

A fixed fee denominated in a separate ERC-20 token (e.g., USDC, EUROC) charged on every operation. This enables use cases where the fee currency differs from the token being transferred, for example, charging a USDC settlement fee on a bond token transfer, or collecting platform fees in a stablecoin regardless of the asset being traded.

| Parameter | Description |
|-----------|-------------|
| `feeToken` | ERC-20 contract address of the fee currency |
| `feeAmount` | Fixed fee amount per operation (in fee token units) |
| `feeRecipient` | Address receiving the external fee |

*Use cases*: Cross-currency settlement fees, platform service charges in stable denomination, regulatory levies in fiat-pegged stablecoins. This feature is particularly relevant for institutional deployments where fee accounting must be in a specific currency regardless of the underlying asset.

*Rate immutability*: Calling `freezeFees()` permanently locks all fee parameters: the fee amounts, the fee token address, and the fee recipient. `isFrozen()` confirms immutability status. This is important for instruments where fee terms are embedded in the offering documentation and must not change after issuance.

#### Governance & Snapshots

**Voting Power (ERC-5805)**

Implements ERC-5805-compatible delegated voting with historical tracking. Token holders can delegate their voting weight to any address, and the system maintains checkpoint-based history of voting power at any past timestamp. This makes DALPAsset compatible with Governor contracts and on-chain governance frameworks.

*Technical architecture*:
- Voting units are maintained exclusively through SMART feature hooks: `onTransferred`, `onMinted`, `onBurned`, and `onRedeemed` all route through `_transferVotingUnits`, so redemption is treated as a vote-supply burn rather than a special governance path.
- The feature uses timestamp-based clock mode (`CLOCK_MODE() = "mode=timestamp"`) with EIP-712 domain separation for meta-transaction support (ERC-2771).
- The feature is **observational rather than restrictive** at token-operation time: `canUpdate(...)` is a no-op and `supportsRewriting()` returns `false`, so voting power does not itself block or rewrite token lifecycle operations.
- Holder actions: delegate by direct wallet call or EIP-712 signature; query historical votes via `getVotes`, `getPastVotes`, `getPastTotalSupply`, and `getPastDelegate`.

*Current status*: Smart contract implemented and read-only UI exposed. DAPI mutation routes for delegation and vote-related actions are not yet shipped, delegation currently requires direct contract calls. No governance system (proposal/execution module) is shipped alongside voting power; DALP provides the governance-power infrastructure, not a full governance product.

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

Enables gasless approvals, token holders can sign an approval off-chain, and any address can submit the signature on-chain. This removes the need for a separate approval transaction before a transfer.

*Technical detail*: Permit implements no lifecycle hooks (`canUpdate` is a no-op, `supportsRewriting()` returns false). It is a utility feature that adds the `permit(owner, spender, value, deadline, v, r, s)` function to the token interface. Feature ordering is irrelevant for Permit.

*Use cases*: Institutional custody workflows where a custodian submits transactions on behalf of clients (the client signs the approval off-chain, the custodian submits it). Reduces gas costs by eliminating the approve-then-transfer two-transaction pattern. Enables meta-transaction patterns where a relayer submits the transaction and pays gas on behalf of the user.

#### Lifecycle & Yield

**Maturity Redemption**

Implements the full bond maturity lifecycle, the defining characteristic of fixed-income instruments. After the configured maturity date, the token blocks all transfers; holders can only redeem their tokens for the denomination asset (e.g., USDC, EUROC) at the configured face value.

| Parameter | Description |
|-----------|-------------|
| `maturityDate` | Timestamp after which transfers are blocked (immutable after deployment) |
| `faceValue` | Redemption price per token unit in denomination asset |
| `denominationAsset` | ERC-20 token used for redemption payouts (e.g., USDC) |
| `treasury` | Address holding the denomination asset for redemption |

*Lifecycle stages*:
1. **Pre-maturity**: Token transfers normally, subject to all compliance rules. The Maturity Redemption feature's `canUpdate()` gate allows all operations.
2. **At maturity**: `canUpdate()` blocks all transfers, holders can only redeem.
3. **Redemption window**: Holders call `redeem()` to exchange tokens for denomination asset at face value. The mechanism is atomic: tokens are burned and denomination asset is transferred from treasury in a single transaction.
4. **Post-redemption**: Redeemed tokens are burned, reducing circulating supply. If the treasury has insufficient funds, the redemption reverts, no partial redemptions.

*Treasury integration*: Maturity redemption uses the `TreasuryPayoutLib` shared library, which supports both EOA treasuries (via `safeTransferFrom`) and asset/vault-style treasuries (via `ITreasuryPayer.payout()`). This means the treasury can be a simple wallet holding stablecoins or a smart contract vault, the redemption mechanism adapts automatically.

*Use cases*: Government and corporate bonds, structured notes, term deposits, any fixed-income instrument with a defined maturity date and principal obligation.

**Fixed Treasury Yield**

A fixed-rate yield distribution system where the issuer funds a treasury, and token holders claim their accrued yield at configured intervals. The system is **pull-based**: holders (or their custodians) initiate the claim, rather than the issuer pushing payments.

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

Convertible instruments, convertible notes, convertible bonds, and contingent convertible securities (CoCos), are among the most operationally complex structures in capital markets. The conversion event itself requires synchronized actions across two distinct securities: the loan-side instrument must be reduced or retired, and the equity-side instrument must be minted at a price calculated from agreed terms that may include discounts, valuation caps, and accrued interest. Most tokenization platforms either cannot model this at all, or require months of custom Solidity development, a dedicated security audit, and ongoing contract maintenance for each convertible issuance. DALP replaces that custom engineering with a configurable, pre-audited conversion system that handles the full lifecycle, from trigger publication through atomic execution to dual-sided provenance tracking, without writing a single line of custom code.

DALP implements conversion as a cooperative two-contract design. A **Conversion Feature** attaches to the loan-side token and manages the conversion terms, pricing logic, and debt reduction. A **Conversion Minter Feature** attaches to the equity-side token and handles the authorized minting of new equity at the calculated ratio. When a conversion event occurs, both features execute atomically in a single transaction, the loan-side position is reduced and the equity tokens are minted in one indivisible operation. There is never a state where the debt has been extinguished but the equity has not been issued, or vice versa.

The conversion terms are defined at deployment through a comprehensive configuration:

**Pricing and economics.** The configuration specifies a discount rate (in basis points, e.g., 2000 for a 20% discount) and an optional valuation cap price. When a conversion trigger fires, the effective conversion price is calculated as the lower of the discounted round price and the cap price. This is the standard convertible note pricing model used across venture and institutional debt markets: a €5M convertible note with a 20% discount at a €50M equity round converts at €8.00 per share (€10.00 × 0.80), yielding 625,000 equity tokens. If the note also carries a €30M valuation cap and the cap price is €6.00 per share, the holder converts at €6.00 instead, receiving 833,333 tokens. The holder always gets the more favorable price, protecting early investors against dilution.

**Interest integration.** For instruments that accrue yield, a convertible bond paying 5% annual coupon, for example. DALP's conversion system integrates directly with the Fixed Treasury Yield feature through a dedicated `IConversionInterestProvider` interface. When conversion occurs with interest integration enabled, the system queries accrued but unclaimed interest, adds it to the principal for conversion calculation purposes, and marks the interest as consumed to prevent double-claiming. After conversion, accrual stops for the converted position. This three-way coordination between the loan token, the equity token, and the yield feature is precisely the kind of cross-contract orchestration that makes convertible instruments difficult to build from scratch, and precisely what DALP handles through configuration. All pricing and interest amounts use WAD (1e18) precision to prevent decimal mixing bugs across tokens with different decimal configurations.

**Debt reduction flexibility.** Different legal structures require different treatment of the loan-side tokens upon conversion. DALP supports three methods: **burn** (tokens permanently destroyed, clean and final for fully extinguished debt), **lock** (tokens escrowed in the contract, appropriate when conversion may be reversible or locked tokens serve as an audit record), and **mark-converted** (positions flagged as converted without token movement, appropriate for accounting structures where the token record must persist but the position is economically neutralized).

**Conversion windows and controls.** The configuration defines when conversion can occur (start and end timestamps), whether partial conversion is permitted, and the minimum conversion amount to prevent dust positions. These controls map directly to term sheet provisions governing real convertible instruments.

**Triggers.** The governance role publishes conversion triggers that define when and at what terms conversion can occur. Each trigger carries a unique identifier, the equity round price as the basis for conversion pricing, an optional expiry date, and a metadata hash linking to off-chain documentation for audit purposes. Triggers can be disabled after publication.

**Forced conversion.** The custodian role can execute mandatory conversion of specific holder positions, essential for CoCos where regulatory capital triggers require automatic debt-to-equity conversion. Forced conversion follows the same atomic execution path with full provenance tracking.

**Provenance.** Both sides of every conversion maintain detailed records, the loan side tracks principal converted, interest converted, effective price, trigger ID, and timestamp; the equity side independently tracks the same conversion ID with minting details. Every equity token minted through conversion can be traced back to the specific loan position, trigger, and pricing terms that authorized it.

*Current status*: Smart contract implemented with full subgraph indexing. DAPI mutation routes for conversion operations are not yet shipped, conversion currently requires direct smart contract calls. No frontend UI for trigger management or conversion execution. The underlying contract infrastructure is production-ready.

*Use cases*: Convertible bonds (debt-to-equity conversion with discount pricing), convertible notes (startup financing with cap and discount), mandatory convertible instruments, contingent convertible bonds (CoCos) for banking capital requirements.

### 2.3 Feature Ordering and Composition

Feature ordering is explicitly the caller's responsibility. There are no on-chain weights, features execute in the array order specified during configuration via `setFeatures()`. The recommended execution order is:

| Position | Category | Features | Rationale |
|----------|----------|----------|-----------|
| First | Transfer restriction | Maturity Redemption, Conversion (loan-side) | Restriction features should block transfers before fees are collected or analytics recorded |
| After restrictions | Fee collection | AUM Fee, Transaction Fee, Transaction Fee Accounting | Fees are deducted before analytics features record balances |
| After fee collection | External fee hooks | External Transaction Fee | External fees in separate denomination collected after primary fee deduction |
| Last | Analytics & governance | Historical Balances, Voting Power | Governance snapshots reflect post-fee, post-restriction states |
| Order irrelevant | No-hook utilities | Permit, Conversion Minter | These features do not use lifecycle hooks |

This ordering ensures deterministic behavior: restriction features can block transfers before fees are collected, fees are deducted before analytics features record balances, and governance snapshots reflect the final post-fee state.

**Composition rules**: Any combination of token features is valid. DALPAsset is not limited to the seven legacy-equivalent presets, those exist as proven starting points for teams migrating from legacy types, not as exhaustive definitions. A convertible bond with AUM fees, voting power, and gasless approvals is just as valid as a plain equity token with only Historical Balances.

### 2.4 Feature Access Control

| Role | Scope |
|------|-------|
| `GOVERNANCE_ROLE` | Configuration and policy changes, fee rates, triggers, schedules, treasury addresses, feature attachment/removal |
| `CUSTODIAN_ROLE` | Operational actions on behalf of holders, forced conversion, early maturity, freeze/recovery |

All configuration changes (adding/removing features, modifying parameters) require `GOVERNANCE_ROLE`. Multi-sig or timelock governance is recommended for production deployments to prevent unilateral configuration changes.

### 2.5 Asset-as-Treasury Capability

DALPAsset contracts can act as treasury contracts for payout-oriented features. The `IDALPAsset` interface extends `ITreasuryPayer`, and `DALPAssetImplementation` exposes `payout(IERC20 token, address to, uint256 amount)` as a non-reentrant contract-level payout surface.

*Security model*: Asset payout calls are **feature-gated**: `payout()` reverts unless `msg.sender` is a registered feature (`_featureIndices[msg.sender] != 0`). This means only attached token features (like Maturity Redemption or Fixed Treasury Yield) can trigger payouts, not arbitrary callers.

*Fallback mechanism*: The `TreasuryPayoutLib.payoutFrom()` library first checks whether the treasury address supports `ITreasuryPayer` via ERC-165; if so, it calls `payout()`. Otherwise, it falls back to `safeTransferFrom(treasury, to, amount)` for EOA/approval-based treasuries. This dual-path design means the treasury can be the token contract itself, a separate vault contract, or a simple wallet, the payout mechanism adapts automatically.

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
5. Issues class-aware claims (classification, location, pricing, identifier), claim enrichment varies per asset class and fails terminally on partial claim issuance
6. Configures token features in the specified order via `setFeatures()`
7. Materializes a permission plan, defaulting to creator=`governance` when `initialPermissions` is empty
8. Assigns initial roles (admin, governance, supply management, custodian, emergency) via sequential `grantRole` calls
9. Optionally unpauses the token if `unpauseOnCreation=true` (defaults to `false`: paused by default)
10. Registers the token in the token factory registry

This workflow is **durable and idempotent**: if any step fails, the deployment can be resumed from the last successful step. Missing `TokenAssetCreated` receipt events are treated as terminal failure, so issuance cannot complete without deterministic address extraction.

**Step 7: Post-Deployment Activation**

The token deploys in a **paused state by default**. To activate:

1. Verify compliance configuration with the compliance team
2. **Unpause the asset** (requires `EMERGENCY` role)
3. **Add supply managers** and grant roles for minting
4. **Mint initial supply** to designated wallets, minting is subject to all configured compliance rules, even for the initial distribution

### 3.3 Transfer Lifecycle

Every token transfer in DALP follows a deterministic execution path. The compliance transfer flow is the most critical sequence in the system, it determines whether any token movement is permitted.

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
       │ (ALL must pass, first failure reverts with reason)
       │
4. Feature Pre-check
   └── canUpdate() on all features in order ──► PASS/FAIL
       │
5. Transfer Execution
   └── ERC-20 balance update (atomic)
       │
6. Feature Post-hooks
   ├── onTransferred(), fee collection, accounting, amount rewriting
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
- Pre-execution validation (`canTransfer`) completes before any balance changes, failed checks cost only validation gas
- Fail-fast evaluation: first failing module stops all evaluation, no unnecessary gas on subsequent modules
- Atomic state updates: post-transfer hooks must all succeed or the entire transfer reverts
- Module ordering matters: place restrictive checks (country, identity) before expensive checks (supply tracking, investor counting) to optimize gas

If any step fails, the entire transaction reverts atomically. There is never a partial transfer state.

### 3.4 Corporate Actions

DALP supports corporate actions through a combination of token features and operational workflows:

**Dividend/Coupon Distribution**
Using the Fixed Treasury Yield feature, issuers configure yield schedules with rate, frequency, and denomination asset. The system calculates pro-rata entitlements based on Historical Balance snapshots. Holders (or custodians acting on their behalf) claim distributions through the pull-based mechanism. The treasury can be the token contract itself (using the asset-as-treasury capability) or an external wallet/vault.

**Forced Transfers**
The `custodian` role can execute forced transfers that bypass the compliance engine. This is the ERC-3643 `forcedTransfer` mechanism, essential for:
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
The `emergency` role can pause all operations on a token, no transfers, mints, or burns can execute while paused. This is the circuit breaker for:
- Security incident response
- Smart contract vulnerability discovery
- Regulatory emergency orders
- Market disruption events

**Token Conversion**
For convertible instruments, the governance role manages conversion triggers and windows. Holders can optionally convert within defined windows, or the custodian can force mandatory conversion. All conversion operations are atomic: loan tokens are burned and equity tokens are minted in a single transaction.

### 3.5 Redemption

Redemption is the lifecycle endpoint for fixed-income instruments. The Maturity Redemption feature enforces the complete lifecycle:

1. **Pre-maturity**: Token transfers normally, subject to all compliance rules
2. **At maturity**: Maturity Redemption feature's `canUpdate()` blocks all transfers, holders can only redeem
3. **Redemption window**: Holders call `redeem()` to exchange tokens for the denomination asset at face value. The mechanism is atomic: the holder's tokens are burned, and the denomination asset is transferred from the treasury to the holder, in a single transaction
4. **Post-redemption**: Redeemed tokens are burned, reducing circulating supply. If the treasury has insufficient funds, the redemption reverts, no partial redemptions

The redemption mechanism uses the shared `TreasuryPayoutLib` library, supporting both EOA treasuries and smart contract vaults. Burns free up capacity for supply-capped tokens (the cap tracks live circulating supply via `totalSupply()`, not lifetime minted).

---

## 4. Smart Contract Sets: Pre-built vs. Custom

### 4.1 DALPAsset with Legacy-Equivalent Presets

For the most common financial instrument types, DALP provides **legacy-equivalent presets**: pre-configured DALPAsset configurations that replicate the behavior of the legacy specialized contract types while maintaining the flexibility of runtime configuration. These are **starting points, not limits**: any combination of features and modules can be added beyond the baseline.

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

The Fund preset adds AUM-based management fees to the governance and snapshot capabilities. The fee is inflationary, new tokens are minted to the fee recipient, replicating the traditional fund management fee structure transparently on-chain.

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

The Deposit preset is intentionally minimal, a general-purpose deposit token with balance snapshots. Additional features and compliance modules can be added based on the specific instrument requirements.

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
| Compliance Modules | Per jurisdiction (no supply cap, dynamic supply based on vault backing) |
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

**Coexistence**: Legacy types are fully supported, not deprecated, no migration is required. They use the same compliance engine, Identity Registry, access control model, and per-asset role system as DALPAsset. The choice between legacy and DALPAsset is driven by regulatory requirements, not technical limitations.

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

**Example: Sustainability-Linked Bond**
- Features: Fixed Treasury Yield + Maturity Redemption + Historical Balances
- Compliance: Identity Verification + Country Allow List + Investor Count
- Behavior: The instrument uses the same core token mechanics as a conventional bond, while sustainability-specific terms are captured through configurable metadata and governance-controlled servicing parameters. This is the right pattern when an issuer needs a green, social, or sustainability-linked bond structure without pretending the ESG label requires a bespoke smart contract. If a step-up coupon is triggered by KPI performance, the servicing workflow can update the governed payout schedule while preserving the same audited bond contract and compliance posture.

**Example: Private Credit Note**
- Features: Fixed Treasury Yield + Maturity Redemption + Historical Balances
- Compliance: Identity Verification + Country Allow List + Transfer Approval
- Behavior: The instrument behaves like a digitally native private credit note with a fixed repayment date, scheduled yield payments, and controlled secondary transfers. This is useful when an issuer wants the economic profile of a bilateral or club-style credit product, but still needs investor eligibility checks, transfer consent, and a clean on-chain servicing record.

**Example: Tokenized Treasury Bill (Short-Term Government Security)**
- Features: Maturity Redemption + Historical Balances + Permit
- Compliance: Identity Verification + Country Allow List + Transfer Approval + TimeLock (minimum holding period)
- Behavior: A short-dated sovereign debt instrument. T-bills, treasury notes, or equivalent, with a defined maturity and principal redemption at face value. Maturity Redemption blocks all transfers after the maturity date and enables atomic redemption at face value in a denomination stablecoin (USDC, EUROC). Historical Balances provides the record-date snapshot required for pro-rata entitlement tracking. Permit enables institutional custodians to submit transactions gaslessly on behalf of clients. Transfer Approval ensures that every secondary market transfer receives explicit issuer consent before execution, critical for sovereign debt where participant eligibility must be verified at each transfer, not just at initial issuance. TimeLock enforces a minimum holding period (e.g., 24–48 hours) to prevent wash trading while maintaining institutional liquidity. This is the right pattern for asset managers, sovereign wealth funds, and central bank programs bringing short-duration government paper on-chain, it replicates the economic and control characteristics of traditional T-bill infrastructure without requiring custom smart contract development.

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

This model does not scale. A financial institution offering bonds, equities, funds, and structured products needs four separate development tracks, each with its own codebase, audit, and maintenance burden. At $200-500K per audit and 4-12 weeks per cycle, the cost of launching a diverse tokenized product line is measured in millions of dollars and years of calendar time.

### 5.2 The DALP Configuration Model

DALP replaces custom development with configuration:

1. **Select a preset or start from DALPAsset** (minutes): Choose the closest instrument type or start with a blank canvas
2. **Configure token features** (hours): Select and order the capabilities the instrument needs, fees, yield, governance, lifecycle
3. **Configure compliance modules** (hours): Select a regulatory template and customize module parameters for the specific jurisdiction and offering
4. **Deploy through the Asset Factory** (minutes): The factory deploys a pre-audited contract with the selected configuration
5. **Ongoing management** (runtime): Features and compliance modules can be reconfigured without redeployment

**Total timeline: hours to days per instrument type**

### 5.3 What Configuration Means in Practice

Configuration in DALP is not "low-code" or "drag-and-drop." It is a structured selection of pre-audited, formally verified smart contract modules that compose into a coherent financial instrument. The key architectural decisions are:

**Pre-audited components**: Every token feature and compliance module has been independently audited. Composing audited modules does not require re-auditing the composition (unlike custom code that requires auditing every change). The audit scope includes individual module security, inter-module interaction patterns, and the hook/ordering system itself.

**Formal interface contracts**: The ISMARTFeature interface defines exactly how features interact with the token lifecycle. There is no ad-hoc integration, every feature must implement the same hooks, follow the same ordering rules, and respect the same access control model. The `validateParameters` function on compliance modules ensures configuration validity at bind time, not at runtime.

**Deterministic deployment**: The Asset Factory ensures that every token deployed through DALP has identical security properties. There is no variance between deployments, the same configuration always produces the same contract behavior. The durable workflow orchestrated through Restate guarantees idempotent deployment with terminal failure detection.

**Runtime reconfiguration**: Because features are attached at runtime (not compiled in), configuration changes do not require new deployments. Fee rates can be adjusted, compliance modules can be added or removed, and governance parameters can be updated, all through the platform's API or UI, gated by `GOVERNANCE_ROLE`.

**Type-specific parameter encoding**: Each compliance module and token feature has a type-specific parameter encoding validated at configuration time. The DAPI encoding dispatch is explicit, unknown parameter shapes are rejected, not silently accepted. This prevents misconfiguration from reaching on-chain state.

### 5.4 When Custom Development is Still Needed

DALP's configuration model covers the vast majority of regulated financial instruments. However, there are scenarios where the existing feature catalog may not be sufficient:

- **Novel instrument types** that require entirely new on-chain logic (e.g., a new type of derivative settlement mechanism)
- **Regulatory requirements** that mandate compile-time immutability of specific features (addressed by legacy types)
- **Cross-protocol integrations** that require custom smart contract interfaces beyond what DALP's feature system supports

In these cases, the legacy specialized contract types provide a path for custom development within the DALP ecosystem, maintaining compatibility with the compliance engine, identity system, and access control model.

---

## 6. Per-Asset Role-Based Access Control

### 6.1 The Seven Per-Asset Roles

Every token contract. DALPAsset and legacy specialized types, uses the same seven roles defined in `DALPAssetRoles.sol`. Roles are scoped per asset: holding `GOVERNANCE_ROLE` on Token A grants no power over Token B.

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

- **Admin grants roles but has no operational powers**: cannot mint, burn, freeze, pause, or configure. The role-granting authority cannot execute privileged operations.
- **Supply Management cannot freeze; Custodian cannot mint**: operational segregation ensures the entity issuing tokens is not the entity that can freeze or recover them.
- **Emergency is limited to pause and recovery**: cannot mint, configure compliance, or execute forced transfers. The incident-response role can halt the system but cannot alter its state.
- **Governance configures policy; Supply Management executes issuance**: the entity setting compliance rules does not control token supply.
- **Sale Admin configures sales; Funds Manager withdraws proceeds**: separating sale lifecycle management from fund withdrawal prevents a single operator from both launching a sale and extracting its funds.

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
- **Unified Compliance Infrastructure**: Compliance modules are deployed once at the system level and configured per-token. This means a CountryAllowList module deployed for MiCA compliance can be used by every EU-regulated token in the system, a single module instance serves all tokens, each with its own parameter configuration.
- **Shared Identity Registry**: All tokens in a DALP system share the same Identity Registry. An investor verified once can interact with any token that accepts their identity claims, no per-token re-verification. The Identity Registry binding is per-token (a wallet registered for Token A is not automatically registered for Token B), but the underlying identity and claims are reusable.
- **Cross-Token Operations**: The platform's API provides cross-token query capabilities, portfolio balances, aggregate compliance status, and multi-token transaction history.

### 7.2 Portfolio View and Asset Discovery

The platform provides portfolio management capabilities through its read model:

- **User Asset Projection**: For each authenticated user, the platform projects their token holdings across all registered tokens, including balance, value (if price feeds are configured), and compliance status
- **Token Discovery**: Global search capabilities allow finding tokens by name, symbol, address, or metadata, with results scoped to the user's permission level
- **Activity Tracking**: Per-account activity history tracks all blockchain events (transfers, mints, burns, compliance checks, role changes) with time-series aggregation for charting and reporting
- **Account Resolution**: DALP provides address-to-display-name resolution, prioritizing Contact → User (by wallet) → Identity (OnchainID) → Contract name → Address fallback

### 7.3 Cross-Token Settlement

DALP's XvP (Exchange vs. Payment) settlement capability enables atomic cross-token operations:

- **Delivery vs. Payment (DvP)**: Atomic exchange of a security token for a payment token (e.g., bond tokens for USDC). Both legs complete or both revert, there is never a state where one party has delivered but not received payment.
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

The Asset Factory is not a simple contract deployer, it is a multi-step durable workflow orchestrated through Restate (DALP's durable execution engine). The workflow dispatches creation to class-specific handlers and forwards class-only parameters (e.g., bond maturity/face value, fund management fees, real-estate premint) before decoding canonical `TokenAssetCreated` receipt data.

Key architectural properties:

- **Durable and idempotent**: If any step fails, the entire deployment can be resumed from the last successful step without creating orphaned contracts or inconsistent state
- **Terminal failure detection**: Missing `TokenAssetCreated` receipt event is treated as terminal failure, issuance cannot complete without deterministic address extraction
- **Class-aware claim enrichment**: Claim issuance varies per asset class (classification, location, pricing, identifier claims) and fails terminally on partial claim issuance
- **Permission bootstrapping**: The workflow materializes a permission plan, defaulting to creator=`governance` when `initialPermissions` is empty, then extends for optional unpause support

### 8.2 Upgrade Path

DALPAsset uses the UUPS (Universal Upgradeable Proxy Standard) pattern for upgrades:

- **Implementation upgrades**: The underlying DALPAsset implementation can be upgraded to add new capabilities, fix bugs, or optimize gas usage, without changing the token's address or state
- **Feature upgrades**: Individual token features can be upgraded independently of the token contract
- **Compliance module upgrades**: Compliance modules can be replaced or upgraded without touching the token contract
- **Governance controls**: All upgrades require appropriate role authorization (typically `admin` or `governance` roles)
- **Directory-managed upgradeability**: Updating the implementation address in the directory upgrades all tokens simultaneously

### 8.3 Multi-Chain Deployment

DALP supports deployment on any EVM-compatible blockchain network. The platform abstracts the chain-specific details (gas estimation, nonce management, transaction confirmation) while maintaining the same token architecture across chains. Token configuration, compliance rules, and access control work identically regardless of the underlying chain.

---

## 9. Security Model

### 9.1 Contract-Level Security

- **UUPS Proxy Pattern**: Prevents unauthorized upgrades, only the designated admin can point the proxy to a new implementation
- **Access Manager Integration**: OpenZeppelin's AccessManager contract provides the on-chain authorization layer for all privileged operations
- **Reentrancy Protection**: All state-changing operations in DALPAsset and token features are protected against reentrancy attacks. The `payout()` function on DALPAssetImplementation is explicitly non-reentrant.
- **Integer Overflow Protection**: Solidity 0.8+ built-in overflow checks are active throughout the codebase
- **Feature-Gated Payouts**: Treasury payout calls are gated by feature registration, only attached features can trigger payouts, preventing arbitrary withdrawal
- **CEI Pattern**: Critical operations (yield claims, maturity redemption) follow the Checks-Effects-Interactions pattern to prevent reentrancy

### 9.2 Operational Security

- **Role Separation**: The 7 per-asset roles enforce segregation of duties, the same address cannot be both supply manager and compliance manager without explicit dual-role assignment
- **Wallet Verification**: Sensitive mutations require step-up verification (PIN code, secret codes, or OTP) beyond the initial authentication. API-key sessions bypass wallet verification (the key itself serves as the authorization factor).
- **Emergency Controls**: The `emergency` role provides a kill switch (pause) that immediately halts all token operations
- **Audit Trail**: Every operation emits events that are indexed and queryable through the platform's read model, providing a complete and immutable audit trail
- **Hostile Input Validation**: The Asset Designer enforces input validation with regression tests covering SQLi-like, XSS-like payloads, unicode, and boundary inputs

### 9.3 Compliance Security

- **Ex-ante enforcement**: Compliance is checked *before* execution, not after. Non-compliant states cannot exist on-chain.
- **Module veto power**: Any single compliance module can block a transfer. This is a fail-closed design, the default is denial unless all modules explicitly approve.
- **Identity binding**: Compliance operates on verified identities, not wallet addresses. A wallet address alone is insufficient to participate in any regulated token operation.
- **Claim integrity enforcement**: Auto-claim validation enforces topic-specific integrity contracts before trusted-issuer writes reach chain state, boolean topics only accept `"true"`, KYC claims are validated against approved profile content hashes.
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
| Identity Verification | RPN expression: `[ACCREDITED]` (strict, accredited only) |
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

### 10.4 MENA Sukuk Ijarah (UAE SCA)

A UAE-based issuer tokenizes a five-year Sukuk Ijarah on behalf of an infrastructure SPV. Proceeds finance a real asset (an operating facility leased back to the originator); periodic distributions represent rental income rather than interest. This structure is Shariah-compliant by design, the on-chain mechanics enforce economic substance rather than simulate a loan.

The configuration uses DALP's Bond asset type for principal tracking, with the Fixed Treasury Yield feature delivering periodic rental distributions. Transfer Approval enforces the Shariah requirement that each secondary-market sale documents genuine asset transfer intent, preventing short-term speculative flipping that would compromise the ijarah structure. Country Allow List restricts participation to SCA-licensed jurisdictions, and identity claims from a Shariah-certified trusted issuer attest to investor eligibility under the applicable UAE guidelines.

| Configuration | Value |
|--------------|-------|
| Asset Type | Bond |
| Name | "Infrastructure Sukuk Ijarah 2030" |
| Symbol | "SKIJ30" |
| Decimals | 18 |
| Country Code | 784 (United Arab Emirates) |
| Price Currency | AED |
| Base Price | 1000 |
| Cap | 100000 (AED 100M face) |
| **Token Features** | |
| Fixed Treasury Yield | 450 bps annual rental yield, semi-annual distribution, USDC denomination |
| Maturity Redemption | June 2030 maturity, AED 1,000 face redemption, stablecoin payout |
| Historical Balances | Required for pro-rata rental income calculation |
| Transfer Approval | 48-hour expiry, one-time use, enforces documented beneficial ownership transfer |
| **Compliance Modules** | |
| Identity Verification | RPN expression: `[KYC, AML, ACCREDITED, AND]` plus Shariah eligibility claim from certified issuer |
| Country Allow List | UAE, Saudi Arabia, Bahrain, Kuwait, Malaysia (SCA-recognized reciprocal jurisdictions) |
| InvestorCount | Global limit: 200 (SCA Exempt Offer threshold) |
| TimeLock | 90-day minimum holding period, prevents flipping that would undermine ijarah economic substance |

**Why this matters for proposal writers:** DALP's compliance module system separates Shariah structuring concerns (periodic rental yield, asset-transfer documentation, anti-speculation holding period) from standard regulated security mechanics (KYC/AML, country restrictions, investor caps). Proposal writers should not imply that Sukuk support requires custom smart contract development. Every component in this configuration uses existing, audited DALP features applied to Shariah-compliant parameters, the platform's architecture is neutral to the legal label placed on the instrument. For MENA bids, lead with the SCA country code support, the Transfer Approval feature as the mechanism for documented ownership transfer, and the trusted-issuer system as the on-chain home for Shariah certification claims.

### 10.5 European Covered Bond (EU Covered Bond Directive)

A European bank issues a digital covered bond under the EU Covered Bond Directive (CBBD, Directive 2021/2167), a senior secured instrument backed by a dynamic cover pool of mortgage loans or public sector exposures. Covered bonds are the largest debt instrument class in Europe by outstanding volume, and the CBBD's explicit recognition of digital issuance mechanisms is driving multiple pilot programs across German (Pfandbrief), French (Obligation Foncière), and Nordic issuing banks. The instrument carries a dual-recourse structure: investors have a priority claim over the cover pool and an unsecured claim against the issuer if pool assets are insufficient, which DALP supports through its compliance and metadata architecture, not through bespoke contract logic.

The configuration uses DALP's Bond asset type with Maturity Redemption and Fixed Treasury Yield for conventional coupon and principal mechanics. Investor Count enforces the maximum investor threshold typical of institutional-only covered bond programs, while Country Allow List restricts participation to EEA-licensed institutional investors as required under the CBBD's eligible investor framework. The CollateralComplianceModule carries the cover pool over-collateralization ratio (minimum 105% under CBBD Article 15, commonly set to 110–130% in practice), ensuring that no additional bonds can be minted if on-chain attestation of cover pool assets falls below the configured threshold. A trusted issuer, typically the bank's internal compliance function or a certified cover pool monitor, publishes the collateralization attestation claim against the issuer's OnchainID contract. The Transfer Approval module gates secondary-market sales to pre-approved counterparties, consistent with the institutional-only distribution model that characterizes most covered bond programs in the primary phase.

| Configuration | Value |
|--------------|-------|
| Asset Type | Bond |
| Name | "Digital Pfandbrief 2031 Series A" |
| Symbol | "DPFB31A" |
| Decimals | 18 |
| Country Code | 276 (Germany) |
| Price Currency | EUR |
| Base Price | 100000 |
| Cap | 5000 (EUR 500M face at €100K denomination) |
| **Token Features** | |
| Fixed Treasury Yield | 3.40% annual coupon, annual payment, EUROC denomination |
| Maturity Redemption | March 2031 maturity, EUROC principal redemption at par |
| Historical Balances | Required for pro-rata coupon entitlement and record-date compliance |
| **Compliance Modules** | |
| Identity Verification | RPN expression: `[KYC, AML, INSTITUTIONAL, AND]`: institutional-only eligibility |
| Country Allow List | EEA member states + UK, Switzerland (bilateral recognition post-Brexit) |
| CollateralComplianceModule | 11,000 bps (110% overcollateralization), minting blocked if cover pool attestation falls below threshold |
| InvestorCount | 250 (institutional placement cap) |
| Transfer Approval | Issuer consent required for secondary transfers, maintains institutional distribution integrity |

**Why this matters for proposal writers:** European banks exploring digital covered bonds face two specific objections that proposal writers need to address directly. First, evaluators ask whether the platform can enforce the CBBD's overcollateralization requirement on-chain without custom contract development. DALP's CollateralComplianceModule handles this through a configurable basis-point ratio and a trusted-issuer attestation model, the bank's cover pool monitor publishes collateral claims on-chain, and the compliance module evaluates them at every mint. No custom Solidity is required. Second, evaluators ask whether the dual-recourse structure requires special contract logic. It does not, the dual-recourse is a legal characteristic of the instrument governed by the CBBD and national covered bond law; DALP captures the economic mechanics (coupon, maturity redemption, transfer consent, overcollateralization) and connects the on-chain instrument to the legal framework through metadata and trusted-issuer claims. For European bank bids, lead with the CollateralComplianceModule as the overcollateralization enforcement mechanism, the Country Allow List as the EEA-eligible investor control, and the fact that CBBD Article 15 minimum ratios are a configuration parameter, not a feature request.

### 10.6 Tokenized Commercial Paper (Multi-Jurisdictional)

A global bank issues a USD 200M commercial paper program with rolling maturities ranging from 30 to 270 days, distributed to institutional money market investors across multiple jurisdictions. Commercial paper is the backbone of short-term corporate funding markets, with over USD 1 trillion outstanding in the US alone, and institutional treasuries increasingly expect digital issuance as the default channel for new CP programs. The instrument is structurally simple (discount to par, no coupon, fixed maturity) but operationally demanding: rolling maturities mean the issuer continuously issues new tranches as prior ones mature, secondary transfers require issuer consent to maintain the institutional-only distribution model, and compliance must span multiple regulatory regimes simultaneously since CP programs routinely sell across US (SEC Rule 144A / Section 4(a)(2)), EU (MiCA / national exemptions), and APAC (MAS, JFSA) investor bases.

The configuration uses DALP's Bond asset type with Maturity Redemption set to the specific tranche maturity date. No coupon feature is needed because CP is a discount instrument: investors purchase below par and receive full face value at maturity, with the discount representing the yield. Historical Balances provides the record-date snapshots needed for settlement entitlement tracking when CP changes hands before maturity. Permit enables institutional custodians to submit transactions gaslessly on behalf of clients, which is critical for CP programs where a small number of custodians manage positions for dozens of underlying investors. Transfer Approval gates every secondary transfer to issuer or dealer consent, maintaining the closed distribution model that CP programs require. The multi-jurisdictional compliance stack uses Identity Verification with an RPN expression that accepts either accredited-investor status (US) or institutional-qualifying status (EU/APAC), combined with a Country Allow List spanning the target distribution markets.

| Configuration | Value |
|--------------|-------|
| Asset Type | Bond |
| Name | "GlobalBank CP Series 2026-Q2 Tranche A" |
| Symbol | "GBCP26A" |
| Decimals | 18 |
| Country Code | 840 (United States, primary market) |
| Price Currency | USD |
| Base Price | 997.50 (discount price per USD 1,000 face, reflecting 90-day yield) |
| Cap | 200000 (USD 200M at USD 1,000 face value) |
| **Token Features** | |
| Maturity Redemption | 90-day maturity, USD 1,000 face value, USDC payout at par |
| Historical Balances | Required for settlement entitlement and position tracking across custodians |
| Permit | Gasless approvals for multi-custodian submission workflows |
| **Compliance Modules** | |
| Identity Verification | RPN expression: `[ACCREDITED, INSTITUTIONAL, OR, KYC, AML, AND, AND]` (accredited or institutional, plus KYC and AML for all) |
| Country Allow List | US (840), UK (826), Germany (276), France (250), Netherlands (528), Singapore (702), Japan (392), Hong Kong (344) |
| InvestorCount | Global limit: 500 (maintains institutional-only distribution) |
| Transfer Approval | 24-hour expiry, one-time use, issuer or appointed dealer approval required |

**Why this matters for proposal writers:** Commercial paper bids surface two questions that trip up proposal writers who have not handled short-term debt programs before. First, evaluators ask how the platform handles rolling maturities across a multi-tranche CP program. DALP addresses this through the Asset Factory: each tranche is a separate DALPAsset deployment with its own maturity date and cap, sharing the same compliance configuration and identity registry. The issuer deploys a new tranche in minutes when the previous one approaches maturity, and the compliance modules carry over without reconfiguration. This is not a limitation; it mirrors how traditional CP programs operate, where each tranche is a distinct instrument with its own ISIN and settlement date. Second, evaluators from banks with cross-border CP programs ask whether a single platform instance can enforce different investor eligibility rules for different jurisdictions simultaneously. DALP's RPN expression system in the Identity Verification module handles this directly: the `[ACCREDITED, INSTITUTIONAL, OR]` pattern accepts US accredited investors and EU/APAC institutional-qualifying investors through the same compliance check, with the trusted-issuer attestation model providing the jurisdiction-specific claims. For CP bids, lead with the rolling tranche deployment speed (minutes per tranche via Asset Factory), the multi-jurisdictional identity expression, and the Transfer Approval feature as the mechanism that preserves the closed institutional distribution model that CP programs require by regulation and market convention.

### 10.7 Tokenized Bank Deposit (EU Regulated Bank)

A European commercial bank issues tokenized demand deposits denominated in EUR, allowing corporate treasury clients to hold and transfer deposit claims on-chain while the underlying funds remain within the bank's balance sheet and deposit guarantee framework. Tokenized deposits are structurally distinct from stablecoins: they represent a direct claim on the issuing bank (a deposit liability), not a claim on a segregated reserve pool. This distinction matters for regulatory treatment, capital adequacy, and depositor protection. European banks including SocieteGenerale-FORGE, Deutsche Bank, and several Nordic institutions have launched or piloted tokenized deposit programs, and the ECB's wholesale settlement experiments have accelerated institutional interest. Under EU banking regulation, these instruments remain subject to the Capital Requirements Regulation (CRR), the Deposit Guarantee Schemes Directive (DGSD up to EUR 100,000 per depositor per institution), and MiCA's exclusion of deposit-backed instruments from its stablecoin provisions, meaning the issuing bank's existing banking license and prudential supervision apply rather than a separate crypto-asset authorization.

The configuration uses DALP's Deposit asset type, which is intentionally minimal by design. Historical Balances is the only token feature required: it provides the record-date snapshots needed for interest accrual calculations, regulatory reporting, and reconciliation against the bank's core banking ledger. No yield feature is configured on-chain because interest accrual on bank deposits is calculated off-chain by the bank's treasury system and distributed through the bank's existing payment infrastructure, consistent with how traditional deposits operate. The compliance stack enforces the institutional distribution model: Identity Verification with a KYC and AML expression ensures every holder has been onboarded through the bank's existing customer due diligence process, Country Allow List restricts distribution to EEA member states where the bank holds passporting rights, and Transfer Approval requires the bank's explicit consent for every transfer, maintaining the direct bank-depositor relationship that distinguishes deposits from bearer instruments.

| Configuration | Value |
|--------------|-------|
| Asset Type | Deposit |
| Name | "EuroBank Tokenized EUR Deposit" |
| Symbol | "ebEURD" |
| Decimals | 18 |
| Country Code | 276 (Germany, issuing jurisdiction) |
| Price Currency | EUR |
| Base Price | 1.00 (par value, 1:1 with EUR) |
| Cap | No cap (demand deposit, supply reflects outstanding deposit liabilities) |
| **Token Features** | |
| Historical Balances | Record-date snapshots for interest calculations, regulatory reporting, and core banking reconciliation |
| **Compliance Modules** | |
| Identity Verification | RPN expression: `[KYC, AML, INSTITUTIONAL, AND, AND]` (full KYC, AML, and institutional status required) |
| Country Allow List | Germany (276), France (250), Netherlands (528), Belgium (056), Luxembourg (442), Austria (040), Ireland (372), Italy (380). EEA passporting jurisdictions |
| CollateralComplianceModule | 10,000 bps (100%, 1:1 backing, each token minted corresponds to a verified deposit on the bank's balance sheet) |
| Transfer Approval | No expiry, one-time use, issuing bank approval required for every transfer |

**Why this matters for proposal writers:** Tokenized deposit bids from banks surface two questions that require precise answers, and getting either one wrong can disqualify the response. First, evaluators from the bank's treasury and regulatory affairs teams ask how the platform enforces the distinction between a tokenized deposit and a stablecoin, because the regulatory treatment differs fundamentally: deposits sit on the bank's balance sheet under CRR capital requirements and DGSD protection, while stablecoins fall under MiCA Title III/IV with segregated reserve requirements. DALP enforces this distinction structurally: the Deposit asset type combined with the CollateralComplianceModule at 100% ensures that every token minted has a corresponding verified deposit claim, and the Transfer Approval module maintains the direct issuer-holder relationship that regulators require for deposit instruments (no anonymous secondary market trading). The platform does not attempt to replicate interest accrual on-chain because deposit interest is a balance-sheet liability calculated by the bank's core systems; Historical Balances provides the record-date snapshots the bank needs to reconcile on-chain positions against its ledger. Second, bank evaluators ask about integration with existing core banking infrastructure. DALP's API-first architecture means mint and burn operations can be triggered by the bank's core banking system via standard REST APIs: when a corporate client deposits EUR, the core system calls DALP's mint endpoint; when they withdraw, it calls burn. The platform handles the on-chain lifecycle while the bank retains full control of the monetary relationship. For deposit bids, lead with the regulatory distinction (deposit, not stablecoin), the Transfer Approval mechanism that preserves the bank-depositor relationship, and the core banking integration model where DALP operates as the on-chain layer beneath the bank's existing systems rather than replacing them.

### 10.8 Tokenized Money Market Fund (Institutional Treasury)

An institutional treasury team launches a tokenized money market fund that holds short-duration sovereign bills, reverse repo exposure, and cash-equivalent instruments for same-day subscription and redemption workflows. The configuration combines AUM Fee for the fund manager's recurring fee model, Historical Balances for end-of-day NAV entitlement and record-date reporting, and Permit so custodians or treasury operators can submit approved transactions without a separate on-chain approval step. The compliance stack stays institutional and tightly controlled: Identity Verification requires KYC, AML, and institutional status, Country Allow List restricts distribution to the jurisdictions named in the fund documentation, InvestorCount can cap the holder base for private placement structures, and TimeLock can enforce minimum hold periods where the distribution model requires them. For proposal writers, the point is simple: DALP handles money market fund mechanics as a configurable fund product, not as a bespoke stablecoin or a custom-built cash wrapper. Lead with the combination of daily operational flexibility, controlled investor eligibility, and transparent record-date accounting for NAV and fee reporting.

### 10.9 Sustainability-Linked Bond (EU Corporate Treasury)

A European corporate treasury issues a sustainability-linked bond where the financing terms depend on post-issuance KPI performance, such as emissions reduction, renewable-energy share, or supply-chain decarbonization targets. The right DALP pattern is still a standard bond configuration, not a bespoke ESG contract: Fixed Treasury Yield handles scheduled coupon distribution, Maturity Redemption governs principal repayment at term, and Historical Balances preserves the record-date snapshots needed for coupon entitlement and investor reporting. ESG-specific commitments sit in governed metadata and servicing policy, while the compliance layer keeps the distribution institutional and jurisdiction-aware through Identity Verification, Country Allow List, and InvestorCount controls. For proposal writers, this matters because evaluators often assume sustainability-linked issuance requires custom smart contract work. It does not. Lead with the simpler truth: DALP keeps the audited bond infrastructure unchanged, while sustainability conditions are expressed through governed data, reporting, and servicing decisions that can evolve without redeploying the instrument.
