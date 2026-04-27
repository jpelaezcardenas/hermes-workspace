# Asset Lifecycle Management

## Executive Summary

DALP manages tokenized assets from initial design through retirement, providing out-of-the-box tooling for every stage of the lifecycle. Where traditional tokenization platforms require custom smart contract development for each lifecycle event, DALP treats the entire lifecycle as a configuration and operations problem. Token creation, issuance, transfer, servicing, and retirement are all handled through the platform's API and UI, with compliance enforcement woven into every operation automatically.

This section walks through each lifecycle stage, describes what DALP provides natively, and identifies where external system integration is required.

---

## 1. Token Design and Configuration

The lifecycle begins with token design: selecting an asset type, choosing features, and binding compliance modules.

### Asset Types

DALP supports six asset types organized into four classes:

| Asset Class | Asset Types | Typical Instruments |
|-------------|-------------|---------------------|
| Fixed Income | Bond | Corporate bonds, government bonds, structured notes |
| Flexible Income | Equity, Fund | Common stock, preferred shares, investment fund units |
| Cash Equivalent | Stablecoin, Deposit | Fiat-pegged stablecoins, tokenized bank deposits |
| Real World Asset | Real Estate, Precious Metal | Fractional property ownership, gold-backed tokens |

Each asset type has a corresponding factory contract that must be deployed before tokens of that type can be created. The factory enforces class-specific validation rules and ensures correct feature and compliance configuration.

### Feature Selection

Token features are runtime-configurable extensions that define the token's economic behavior. The operator selects from a catalog of pre-audited features:

- Fees and charges (AUM fee, transaction fee, external transaction fee, transaction fee accounting)
- Governance and snapshots (voting power via ERC-5805, historical balances, permit via EIP-2612)
- Lifecycle and yield (maturity redemption, fixed treasury yield)
- Transformation (loan-to-equity conversion)

Features are ordered explicitly by the operator. Ordering determines execution sequence through lifecycle hooks (pre-check, post-mint, post-burn, post-transfer, post-redemption). Restriction features run first so they can block operations before fees are collected or analytics recorded.

### Compliance Module Binding

Compliance modules are bound at creation time and can be reconfigured after deployment without redeploying the token contract. Available modules include:

- Identity verification (requires verified OnchainID for all transfers)
- Country allow list and block list (jurisdiction restrictions)
- Address block list (explicit wallet blocking)
- Investor count limit (cap on unique holders)
- Time lock (minimum holding period enforcement with FIFO batch tracking)
- Transfer approval (manual approval required for each transfer, with configurable expiry)
- Collateral requirement (on-chain proof of reserves before minting)

Modules evaluate in sequence. A single module veto blocks the transfer. This is a fail-closed design: the default is denial unless all modules explicitly approve.

**Out of the box:** Full asset type catalog, feature selection and ordering, compliance module binding, live validation in the Asset Designer UI, and equivalent API coverage for programmatic configuration.

**Requires integration:** Custom compliance modules for rules not covered by the built-in catalog would require smart contract development. Custom token features beyond the existing catalog similarly require development, though the ISMARTFeature interface provides a standardized extension point.

---

## 2. Token Creation via Factory Pattern

### Deployment Pipeline

Token creation deploys a new smart contract through the Asset Factory, a multi-step durable workflow orchestrated through Restate (DALP's durable execution engine). The factory is not a convenience wrapper; it is a security boundary that prevents misconfigured or unauthorized deployments.

The deployment sequence:

1. Validates configuration against the selected compliance template and class-specific rules
2. Deploys a UUPS proxy contract with the DALPAsset implementation
3. Initializes the compliance engine with selected modules and type-specifically encoded parameters
4. Binds the token to the system's Identity Registry
5. Issues class-aware claims (classification, location, pricing, identifier)
6. Configures token features in the specified order
7. Assigns initial roles (admin, governance, supply management, custodian, emergency)
8. Optionally unpauses the token (defaults to paused)
9. Registers the token in the factory registry

The workflow is durable and idempotent. If any step fails, deployment can resume from the last successful step without creating orphaned contracts. Missing TokenAssetCreated receipt events are treated as terminal failure.

### Post-Deployment State

Newly deployed tokens start in a paused state by default. No transfers, mints, or burns can execute until an operator with the Emergency role explicitly unpauses the asset. This deliberate friction gives the compliance team time to verify the configuration before the token goes live.

**Out of the box:** Complete factory deployment pipeline with durable execution, automatic role assignment, Identity Registry binding, claim issuance, and pause-by-default safety. Available through both the Asset Designer UI and the REST API.

**Requires integration:** Nothing for standard deployments. Custom factory configurations for novel asset classes not covered by the six built-in types would require smart contract development.

---

## 3. Issuance and Minting

### Initial Distribution

Once the token is unpaused and the appropriate roles are assigned, supply managers can mint tokens to investor wallets. Minting creates new units and assigns them to specified wallet addresses.

The platform validates each mint operation:

1. Confirms the caller holds the Supply Management role on this asset
2. Verifies the caller's wallet through PIN, OTP, or secret codes
3. Checks that each recipient has a registered identity with required compliance verifications
4. Validates that minting does not exceed the supply cap (if configured)
5. For stablecoins: verifies that sufficient collateral backing exists on-chain
6. Executes the mint transaction on-chain

### Batch Minting

DALP supports batch minting to multiple wallets in a single API call, with up to 100 recipients per request. If any recipient fails compliance checks, the entire batch is rejected. For larger distributions, callers split into multiple sequential calls.

### Investor Onboarding

Before an investor can receive tokens, they must have a registered on-chain identity (OnchainID) with verified claims from trusted issuers. The identity registration and claim verification process is managed through DALP's identity system. Once verified, an investor's identity is reusable across all tokens in the system that accept their claims. There is no per-token re-verification.

### Alternative Distribution Mechanisms

Beyond direct minting, DALP provides:

- Token sale / primary offering: a configurable sale contract supporting optional presale followed by public sale, multi-currency ERC-20 payment acceptance, per-investor purchase limits, optional vesting, and soft/hard cap mechanics with refund safety. Includes a full API and UI with a five-tab operational console.
- Airdrop distribution: Merkle tree-based distribution in three variants (push airdrop, time-bound self-claim, and vesting airdrop with linear vesting). All variants share Merkle proof verification and 7-day timelocked withdrawal safety.

**Out of the box:** Single and batch minting via API and UI, compliance-checked recipient validation, collateral verification for stablecoins, token sale infrastructure, and airdrop distribution with three variants.

**Requires integration:** Investor KYC/AML verification workflows typically involve external identity providers whose attestations are then published as on-chain claims through DALP's trusted issuer system. The identity verification itself happens off-chain; DALP consumes the resulting claims.

---

## 4. Transfer and Secondary Trading

### Compliance-Checked Transfers

Every token transfer in DALP follows a deterministic compliance path. Before any balance changes occur:

1. The Identity Registry resolves both sender and recipient wallets to their OnchainID contracts. Missing identity causes an immediate revert.
2. All configured compliance modules evaluate in sequence. Country restrictions, identity verification, investor limits, transfer approval, time locks, and any other active modules must all pass. The first failure reverts the transaction with a reason.
3. Token features run their pre-check hooks (canUpdate). Features like Maturity Redemption can block transfers after the maturity date.
4. If all checks pass, the ERC-20 balance update executes atomically.
5. Post-transfer hooks fire in configured order: fee collection, balance checkpoint updates, voting power transfers, FIFO batch recording.

This is ex-ante enforcement. Compliance checks execute before the transfer commits. There is never a state where non-compliant tokens exist in an unauthorized wallet.

### Forced Transfers

The Custodian role can execute forced transfers that bypass the compliance engine entirely. This replicates the authority traditional custodians and transfer agents have under specific legal circumstances:

- Court-ordered asset seizures or forfeiture
- Estate transfers following holder death
- Regulatory enforcement actions
- Wallet recovery for compromised institutional accounts

Forced transfers skip all compliance module pre-checks but still emit on-chain events and update tracking systems (investor count, supply tracking), maintaining the audit trail. They support both single and batch operations (up to 100 per API call). Forced transfers can move assets from frozen sender addresses, but cannot send to frozen recipient addresses.

### Secondary Market Considerations

DALP provides the on-chain compliance enforcement layer for secondary trading. Every peer-to-peer transfer passes through the same compliance pipeline as issuer-initiated distributions. The platform does not include a built-in order book or matching engine.

**Out of the box:** Full compliance-checked transfer pipeline, forced transfers with batch support, on-chain audit trail for all transfers, compliance bypass governance at the global level, and transfer via API, UI, and CLI.

**Requires integration:** Order matching, price discovery, and trading venue infrastructure require external exchange or marketplace integration. DALP enforces compliance on every transfer regardless of how the trade is initiated, so any external marketplace must route settlement through DALP's transfer functions to maintain compliance guarantees.

---

## 5. Corporate Actions

### Dividend and Coupon Distribution

DALP handles yield distribution through two mechanisms:

**Fixed Treasury Yield (token feature):** A fixed-rate yield system where the issuer funds a treasury and token holders claim accrued yield at configured intervals. The system is pull-based: holders (or their custodians) initiate claims rather than the issuer pushing payments. This avoids the gas cost and block gas limit issues of iterating over thousands of holders. Yield calculation uses Historical Balance snapshots to determine each holder's proportional share at each accrual period. The treasury can be the token contract itself or an external wallet or vault.

**Yield Schedule (system addon):** Automates the distribution of returns to token holders with snapshot-based balance capture, flexible schedules (one-time, recurring, or custom), pro-rata calculation, and the option to distribute in the same asset or a different payment token.

Use cases include bond coupon payments, equity dividends, fund distributions, and deposit interest crediting.

### Redemption at Maturity

The Maturity Redemption token feature implements the complete fixed-income lifecycle endpoint. After the configured maturity date, the token blocks all transfers. Holders can only redeem their tokens for the denomination asset (such as USDC or EUROC) at the configured face value. The mechanism is atomic: tokens are burned and the denomination asset transfers from the treasury in a single transaction. If the treasury has insufficient funds, the redemption reverts. No partial redemptions occur.

### Token Conversion

For convertible instruments, DALP provides a cooperative two-contract design. A Conversion feature on the debt-side token manages triggers and initiates conversion, while a Conversion Minter feature on the equity-side token receives requests and mints new equity at the configured ratio. Conversion can be holder-initiated (optional, within defined windows) or custodian-initiated (forced, mandatory). All conversions are atomic: loan tokens burn and equity tokens mint in a single transaction.

Current status: smart contract implemented with subgraph indexing. No DAPI routes or frontend UI exist yet for conversion. Execution currently requires direct smart contract calls.

### Stock Splits and Reverse Splits

[TO VERIFY] DALP does not appear to have a dedicated stock split or reverse split feature in the current token feature catalog. Splits would need to be handled through a combination of minting (for forward splits) or burning and re-minting (for reverse splits) with appropriate compliance and governance coordination. A purpose-built split mechanism is not currently part of the platform.

**Out of the box:** Fixed treasury yield with pull-based claiming, yield schedule addon with automated distribution, maturity redemption with atomic payout, and convertible instrument conversion (smart contract level only, no API routes yet).

**Requires integration:** Stock splits require manual operational coordination. Conversion currently requires direct smart contract interaction until DAPI routes are shipped. Complex corporate actions like rights offerings or tender offers would need custom workflow development on top of DALP's primitives.

---

## 6. Servicing Operations

### Freeze and Unfreeze

The Custodian role can freeze individual investor wallets, preventing all transfers (in and out) while maintaining the frozen balance on record. DALP supports both full address freezes and partial amount freezes:

- Full freeze: blocks all transfers to and from the address for this token
- Partial freeze: locks a specific amount, allowing the holder to transfer only their unfrozen balance

Freeze operations are available through the CLI (dalp token freeze-address, dalp token freeze-partial, dalp token unfreeze-partial) and the API (token.freezeAddress).

Use cases include suspicious activity investigation, regulatory hold orders, dispute resolution, and sanctions enforcement on specific holders.

### Pause and Unpause

The Emergency role can pause all operations on a token. When paused, no transfers, mints, or burns can execute. Read-only operations (viewing balances, checking compliance, querying status) and role management continue to work. Pausing is the circuit breaker for security incidents, smart contract vulnerability discovery, regulatory emergency orders, or market disruption events.

Pause and unpause are available through both the API and UI. The Emergency role is intentionally limited: it can halt the system but cannot alter its state (no minting, no configuration changes, no forced transfers).

### Asset Recovery

The Emergency role can recover stuck ERC-20 tokens from the asset contract. This covers situations where tokens are accidentally sent to the contract address rather than to a holder wallet.

The Custodian role handles broader wallet recovery through forced transfers, moving assets from compromised or inaccessible wallets to secure addresses.

### Role Management

Asset-level roles can be granted and revoked through the API and UI by anyone holding the Admin role on that specific asset. The five operational roles (admin, custodian, emergency, governance, supply management) enforce separation of duties at the smart contract level. Role changes support single and batch operations, with multiple roles grantable to one wallet or the same role grantable to multiple wallets in a single transaction.

**Out of the box:** Full and partial freeze/unfreeze, global pause/unpause, ERC-20 recovery, forced transfers for wallet recovery, and complete role management via API, UI, and CLI.

**Requires integration:** Case management and workflow tracking for freeze/investigation processes are typically handled in external compliance or case management systems. DALP provides the on-chain enforcement; the business process around it (approvals, documentation, escalation) lives in the institution's existing operational tooling.

---

## 7. Burning and Retirement

### Burn Operations

Burning permanently removes units from circulation and reduces total supply. The Supply Management role can burn tokens from holder wallets. Burns are irreversible.

Common use cases:

- Redemptions: canceling units when investors exit a fund or redeem bonds at maturity
- Buybacks: retiring shares after a repurchase program
- Regulatory enforcement: removing assets from non-compliant holders
- Error correction: reversing erroneous issuances (with proper authorization)

Burns require the holder to have sufficient unfrozen balance. If any portion of the holder's balance is frozen by the Custodian, only the unfrozen portion can be burned.

For supply-capped tokens, burning frees up capacity. The cap tracks live circulating supply via totalSupply(), not lifetime minted amount.

### Maturity-Driven Retirement

For fixed-income instruments with Maturity Redemption configured, the retirement path is built into the token's lifecycle. After the maturity date, normal transfers are blocked. Holders redeem tokens for the denomination asset, which atomically burns their tokens and pays out from the treasury. The token supply decreases as holders redeem until all units are retired.

### Real Estate Exception

Real estate tokens have burn disabled at the asset level. The legacy DALPRealEstate type premints the full supply to a recipient, then pauses. Burns are blocked to preserve real estate unit integrity. The full supply represents the property; destroying units would break the fractionalization model.

**Out of the box:** Single and batch burn operations via UI and API, maturity-driven automated retirement with treasury payout, supply cap recalculation after burns, and asset-class-specific burn restrictions (real estate).

**Requires integration:** Off-chain record keeping for redemption payments (tax reporting, investor communications, settlement confirmation) typically lives in the institution's back-office systems. DALP provides the on-chain mechanics; the surrounding business process is external.

---

## 8. Cross-Chain Considerations

### Multi-Chain Deployment

DALP supports deployment on any EVM-compatible blockchain network. The platform abstracts chain-specific details (gas estimation, nonce management, transaction confirmation) while maintaining identical token architecture, compliance rules, and access control across chains. A DALP instance manages tokens on a single chain; multi-chain strategies involve deploying separate DALP instances per chain.

### Cross-Chain Settlement via XvP

DALP's XvP (Exchange vs. Payment) settlement system supports cross-chain operations through HTLC (Hash Time-Locked Contracts). This enables atomic asset exchanges across different blockchains:

- Local settlements: when all assets are on the same chain, settlement executes atomically in a single transaction
- HTLC settlements: when assets are on different chains, a cryptographic hash links the settlements, ensuring coordinated execution. Either all parties receive their assets or no assets change hands.

Settlement types include DvP (delivery vs. payment, such as bonds for stablecoins) and PvP (payment vs. payment, such as EUR stablecoin for USD stablecoin). Multi-party transactions involving three or more parties are supported.

All legs of a cross-chain settlement are subject to the compliance rules of each token involved. If any compliance check fails on any leg, the entire settlement reverts.

### Cross-Chain Token Bridging

[TO VERIFY] DALP does not currently include a native token bridging mechanism for moving the same token across chains. Cross-chain scenarios are handled through the XvP settlement system (exchanging equivalent assets on different chains) rather than through bridge contracts that lock tokens on one chain and mint on another. Native bridging would require integration with external bridge infrastructure.

**Out of the box:** XvP settlement with both local (single-chain atomic) and HTLC (cross-chain) modes, compliance enforcement across all settlement legs, multi-party and multi-asset settlement support, and full settlement lifecycle management (pending, approved, executed, cancelled, expired).

**Requires integration:** Multi-chain identity synchronization (ensuring an investor's verified identity is recognized across DALP instances on different chains) requires coordination between instances. Native token bridging requires external bridge infrastructure. Cross-chain compliance module synchronization (ensuring consistent rule enforcement across chains) is managed per-instance rather than automatically synchronized.

---

## 9. Lifecycle Summary

| Lifecycle Stage | DALP Coverage | Integration Required |
|----------------|---------------|---------------------|
| Token design and configuration | Full: asset types, features, compliance modules, Asset Designer UI and API | Custom modules/features beyond catalog |
| Token creation | Full: factory deployment, durable workflow, role assignment, pause-by-default | Nothing for standard types |
| Issuance and minting | Full: single/batch mint, compliance checks, collateral verification, token sale, airdrop | External KYC/AML providers for identity claims |
| Transfer and trading | Full: compliance-checked transfers, forced transfers, audit trail | Order matching, trading venues |
| Corporate actions | Partial: yield distribution, maturity redemption, conversion (smart contract only) | Stock splits, rights offerings, conversion UI |
| Servicing operations | Full: freeze/unfreeze, pause/unpause, recovery, role management | Case management workflows |
| Burning and retirement | Full: burn, maturity-driven retirement, cap recalculation | Off-chain settlement record keeping |
| Cross-chain | Partial: XvP settlement (local and HTLC) | Token bridging, cross-chain identity sync |

DALP covers the core on-chain mechanics of the complete asset lifecycle. Where gaps exist, they fall into two categories: business process orchestration (case management, investor communications, tax reporting) that belongs in the institution's existing operational systems, and advanced features (stock splits, native bridging, conversion UI) that are either on the roadmap or addressable through the platform's extension points.
