# Configurable Tokens

## Executive Summary

DALP’s configurable token capability is centered on **DALPAsset**, a unified, ERC-20-compatible asset contract built on the **SMART Protocol (ERC-3643)** foundation and extended with a runtime feature system. In code terms, `DALPAssetImplementation` combines the SMART core with always-on operational controls—pausing, burning, custody controls, metadata, access management—and the `SMARTConfigurable` extension that allows feature contracts to be attached in a defined execution order (`~/dalp/kit/contracts/contracts/assets/dalp/DALPAssetImplementation.sol`).

That architecture matters for proposals because it gives DALP two delivery modes:

1. **Purpose-built legacy asset types** such as `DALPBond`, `DALPEquity`, `DALPFund`, `DALPStableCoin`, `DALPDeposit`, `DALPRealEstate`, and `DALPPreciousMetal`, all still supported for cases where capabilities must be fixed at deployment time (`~/dalp/kit/dapp/content/docs/architecture/components/asset-contracts/legacy-types.mdx`).
2. **A recommended configurable path for new projects** via `DALPAsset`, where issuers can compose token behavior from prebuilt feature modules and compliance modules without writing a new smart contract per instrument (`~/dalp/kit/dapp/content/docs/architecture/components/asset-contracts/index.mdx`, `~/dalp/kit/dapp/content/docs/architecture/components/asset-contracts/dalp-asset.mdx`).

The codebase and product documentation reviewed for this section show that DALP currently provides:

- **ERC-20 compatibility** for wallet/tooling interoperability.
- **ERC-3643 alignment** for regulated token behavior, including modular compliance enforcement and OnchainID-based identity checks.
- **Runtime-pluggable token features** including historical balances, maturity redemption, fixed treasury yield, voting power, AUM fee, transaction fee, transaction-fee accounting, external transaction fee, conversion, conversion minter, and permit (`~/dalp/packages/core/validation/src/asset-type-template-features.ts`).
- **Unified per-asset governance and operational controls** through role-scoped minting, burning, pausing, freezing, forced transfer, wallet recovery, metadata updates, and compliance-module configuration (`~/dalp/kit/contracts/contracts/assets/DALPAssetRoles.sol`, `~/dalp/kit/contracts/contracts/assets/dalp/DALPAssetImplementation.sol`).
- **Template-driven issuance** across multiple financial asset classes—bond, equity, fund, stablecoin, deposit, real estate, precious metal, and generic custom asset—through a single factory path (`~/dalp/kit/contracts/contracts/assets/dalp/IDALPAssetFactory.sol`, `~/dalp/packages/dalp/dapi/routes/token/src/workflows/token.create.workflow.ts`).

Just as important: in the material reviewed, DALP’s configurable token implementation is **not** presented as a generic NFT / multi-token engine. The reviewed asset-contract architecture, factory contracts, and product docs consistently describe a **regulated ERC-20 / ERC-3643 asset model**. I did not find first-class DALP asset-contract support for ERC-721 or ERC-1155 in the token architecture reviewed. There are references to ERC-721 error codes in the API error catalog, but not evidence of ERC-721 or ERC-1155 as supported DALP asset standards for configurable issuance (`~/dalp/kit/dapp/content/docs/developer-guides/api-integration/error-code-reference.mdx`).

## 1. Standards Supported by DALP and Why They Matter

### 1.1 Primary standards supported for configurable assets

The reviewed DALP token architecture supports **ERC-20** and builds its compliance model on **ERC-3643**.

The documentation states this directly:

- Asset contracts share a common foundation of **ERC-3643 compliance**, **ERC-20 compatibility**, **OnchainID integration**, **ERC-2771 meta-transactions**, and **ERC-165 introspection** (`~/dalp/kit/dapp/content/docs/architecture/components/asset-contracts/index.mdx`).
- SMART Protocol integration is described as DALP’s on-chain compliance foundation, with SMART itself identified as an **ERC-3643 implementation** (`~/dalp/kit/dapp/content/docs/architecture/components/asset-contracts/smart-protocol-integration.mdx`).

At contract level, `DALPAssetImplementation` inherits from `ERC20Upgradeable` via `SMARTUpgradeable` and exposes standard ERC-20 behaviors such as `transfer`, `decimals`, and allowance-related flows, while routing updates through the SMART compliance and feature hook system (`~/dalp/kit/contracts/contracts/assets/dalp/DALPAssetImplementation.sol`).

### 1.2 Why DALP uses ERC-3643 rather than a generic token standard alone

The rationale is clear in the architecture docs and narrative:

- ERC-20 provides broad wallet and tooling compatibility.
- ERC-3643 adds **regulated-token semantics**, particularly identity-aware transfer controls and modular compliance enforcement.
- SMART Protocol brings three layers DALP relies on: token, compliance, and identity (`~/dalp/kit/dapp/content/docs/architecture/components/asset-contracts/smart-protocol-integration.mdx`).

This is not cosmetic. DALP’s design assumes that transfers are not merely balance movements; they are policy-governed actions evaluated against identity claims, transfer rules, and issuer-defined controls before execution. That model is central to regulated issuance and is repeatedly reinforced in the DALP narrative, which positions DALP around **ex-ante compliance**, not ex-post monitoring (`notion/dalp-narrative.md`).

### 1.3 ERC-721 and ERC-1155 status

The request specifically asked to review ERC-20, ERC-721, ERC-1155, and ERC-3643. Based on the code and docs reviewed for DALP’s configurable token architecture:

- **ERC-20:** clearly supported.
- **ERC-3643:** clearly supported and foundational.
- **ERC-721:** no first-class DALP configurable asset-contract support found in the reviewed token architecture.
- **ERC-1155:** no first-class DALP configurable asset-contract support found in the reviewed token architecture.

The absence matters in bid language. DALP’s configurable asset model is presently a **regulated fungible-asset platform**, not a general-purpose multi-standard token factory. That is consistent with the asset types DALP documents and ships today: bonds, equity, funds, deposits, stablecoins, real estate fractions, precious metals, and bespoke ERC-3643-style custom instruments.

### 1.4 Multi-asset support within the ERC-3643 model

DALP supports multiple asset classes, but it does so using a **separate contract per instrument** approach rather than a shared multi-token ERC-1155 ledger. The SMART Protocol integration doc is explicit: ERC-3643 uses a **separate contract per instrument model**, and DALP preserves that structure because it supports lifecycle isolation, compliance independence, upgrade independence, and clear accounting (`~/dalp/kit/dapp/content/docs/architecture/components/asset-contracts/smart-protocol-integration.mdx`).

That is the right model for institutional issuance. A bond tranche, an equity class, and a fund unit class usually do not want shared lifecycle state. They want isolated compliance, isolated supply, isolated maturity or redemption behavior, and isolated governance.

## 2. DALP’s Configurable Token Architecture

### 2.1 Core architectural components

The configurable token stack is composed of five layers:

1. **DALPAssetFactory** — unified creation entry point for configurable assets.
2. **DALPAssetImplementation** — the token contract implementation.
3. **SMART Protocol foundation** — ERC-3643 token/compliance/identity model.
4. **SMARTConfigurable** — feature attachment and ordered execution framework.
5. **Feature factories and feature contracts** — modular business logic units.

The factory interface, `IDALPAssetFactory`, defines a `DALPAssetConfig` structure containing:

- `name`
- `symbol`
- `decimals`
- `assetTypeName`
- `countryCode`
- `complianceModules`
- `features`
- `initialMetadata`

(`~/dalp/kit/contracts/contracts/assets/dalp/IDALPAssetFactory.sol`)

That single structure is important in proposal terms: DALP does not require a distinct smart contract codebase per asset subtype. It uses a **single creation contract** that accepts the asset category plus feature and compliance configuration.

### 2.2 What DALPAsset includes out of the box

`DALPAssetImplementation` always includes a baseline set of controls, even before any optional feature contracts are attached. Specifically, it initializes:

- SMART core token logic
- access management
- custody controls
- burnability
- pausing
- configurability
- metadata

The initialization path calls:

- `__SMART_init(...)`
- `__SMARTTokenAccessManaged_init(...)`
- `__SMARTCustodian_init()`
- `__SMARTBurnable_init()`
- `__SMARTPausable_init(true)`
- `__SMARTConfigurable_init()`
- `__SMARTMetadata_init(...)`

(`~/dalp/kit/contracts/contracts/assets/dalp/DALPAssetImplementation.sol`)

That means the baseline configurable token already has, without attaching any optional feature:

- ERC-20-compatible balance and transfer behavior
- ERC-3643 compliance and identity hooks
- pause / unpause capability
- mint / burn operations
- custodial freeze and forced-movement controls
- on-chain metadata storage
- role-based access control
- a registry for ordered feature execution

In plain English: DALP starts from an institution-ready asset core, then adds instrument-specific financial behavior modularly.

### 2.3 Asset typing model

Each DALPAsset stores an `assetTypeId` as `bytes32`, computed from `assetTypeName` by hashing the provided string during factory creation (`~/dalp/kit/contracts/contracts/assets/dalp/DALPAssetFactoryImplementation.sol`).

That gives DALP two useful properties:

- **Human-readable issuance inputs** — e.g. `bond`, `equity`, `fund`, or a bespoke type name.
- **Efficient on-chain categorization** — hashed and stored as a compact bytes32 identifier.

The narrative positions this as a way to digitize assets beyond the seven prebuilt templates while staying within the same operational and compliance framework (`notion/dalp-narrative.md`, configurable token section).

## 3. Token Standards and Asset Types Supported in Practice

### 3.1 Prebuilt asset classes

The reviewed docs and capability mapping consistently identify seven major asset classes supported in DALP’s asset model:

- Bond
- Equity
- Fund
- StableCoin
- Deposit
- RealEstate
- PreciousMetal

These are documented both as legacy specialized types and as DALPAsset-equivalent presets (`~/dalp/kit/dapp/content/docs/architecture/components/asset-contracts/instrument-profiles.mdx`, `legacy-types.mdx`).

### 3.2 Configurable asset path beyond prebuilt classes

The configurable token narrative goes further: DALPAsset is intended for any asset category that does not fit neatly into the seven standard templates, including examples such as carbon credits, trade finance instruments, insurance-linked securities, loyalty programs, and bespoke structured products (`notion/dalp-narrative.md`, configurable token section).

That statement is directionally broad, but the code-backed implementation point is narrower and stronger: the factory accepts **arbitrary `assetTypeName` values** and stores the resulting hashed type on-chain (`~/dalp/kit/contracts/contracts/assets/dalp/IDALPAssetFactory.sol`, `DALPAssetFactoryImplementation.sol`).

So the verifiable claim is this:

> DALP supports a configurable custom-asset path in which the same token implementation can represent multiple asset categories, because asset category is an input parameter to the factory and not hard-coded into separate token implementations.

That is proposal-safe and code-backed.

## 4. How Token Configuration Works

### 4.1 Configuration surface at issuance

For DALPAsset creation, the issuer can configure the following at creation time:

- token name
- token symbol
- decimals
- asset type name
- country code / jurisdiction code
- compliance modules with parameters
- ordered feature list with feature-specific config data
- initial on-chain metadata entries

Source: `IDALPAssetFactory.DALPAssetConfig` (`~/dalp/kit/contracts/contracts/assets/dalp/IDALPAssetFactory.sol`).

### 4.2 Feature configuration model

Feature configuration is encoded in a standardized `{ featureType, configData }[]` array. The DAPI helper `encodeFeatureConfigs(...)` builds this array from two sources:

1. **Explicit features** chosen in templates or forms.
2. **Implicit features** derived from type-specific inputs.

For example:

- If maturity-related bond parameters are present, DALP can derive the `maturity-redemption` feature.
- If `managementFeeBps` is present, DALP can derive the `aum-fee` feature.

(`~/dalp/packages/dalp/dapi/routes/token/src/services/create/encode-feature-config.ts`)

This is one of DALP’s strongest practical design choices. It means business-level issuance forms can stay instrument-oriented, while DALP handles the translation into feature attachments and ABI-encoded on-chain config.

### 4.3 Ordered feature execution

Feature order is not incidental. `ISMARTConfigurable` explicitly states that the order supplied to `setFeatures()` defines execution order for:

- `canUpdate`
- `onTransferred`
- `onMinted`
- `onBurned`
- `onRedeemed`
- the rewrite pipeline

The interface also warns that mis-ordering can change compliance, fee, and rewrite semantics, and provides a recommended canonical order:

- transfer restrictions first
- fee collection after restrictions
- external fee hooks after fee collection
- analytics last

(`~/dalp/kit/contracts/contracts/smart/extensions/configurable/ISMARTConfigurable.sol`)

That is more than a technical note. It means DALP exposes a controlled behavioral pipeline where issuers can define **how token logic composes**, not just whether a feature is on or off.

### 4.4 Post-deployment reconfiguration

DALPAsset supports atomic replacement of the feature set through `setFeatures(address[] orderedFeatures)`, gated by `GOVERNANCE_ROLE` (`~/dalp/kit/contracts/contracts/assets/dalp/DALPAssetImplementation.sol`).

Proposal-safe interpretation:

- Feature composition is not frozen at deployment.
- Governance can replace the ordered feature list after issuance.
- Because feature ordering affects semantics, governance changes must be controlled and auditable.

The docs contrast this directly with legacy specialized types, where behavior is compiled into the bytecode and cannot be changed post-issuance (`~/dalp/kit/dapp/content/docs/architecture/components/asset-contracts/legacy-types.mdx`).

## 5. Token Features and Capabilities Available Out of the Box

The canonical registry of supported feature IDs is defined in `~/dalp/packages/core/validation/src/asset-type-template-features.ts`. DALP currently registers 11 feature types.

### 5.1 Historical Balances

**Feature ID:** `historical-balances`

Purpose:

- Track historical balances / checkpoints for reporting, record dates, fee calculations, and downstream historical queries.

Evidence:

- Registered in the canonical feature list.
- Supported by a dedicated upgradeable factory, `DALPHistoricalBalancesFeatureUpgradeableFactory`.
- No configuration data required; factory creates the feature with empty config data.

(`~/dalp/packages/core/validation/src/asset-type-template-features.ts`, `~/dalp/kit/contracts/contracts/addons/token-features/historical-balances/DALPHistoricalBalancesFeatureFactory.sol`)

### 5.2 Voting Power

**Feature ID:** `voting-power`

Purpose:

- Provide governance voting infrastructure using OpenZeppelin `Votes` / `VotesExtended` patterns.
- Maintain vote checkpoints through token lifecycle hooks.
- Support delegation by wallet call or EIP-712 signature.

Evidence:

- Registered in the canonical feature list.
- Capability mapping classifies it as ERC-5805-compatible voting-power infrastructure.
- Factory: `DALPVotingPowerFeatureUpgradeableFactory`.
- Feature hooks synchronize voting units on transfer, mint, burn, and redeem.

(`~/dalp/packages/core/validation/src/asset-type-template-features.ts`, `product/dalp/capability-mapping/asset-lifecycle.md`, `~/dalp/kit/contracts/contracts/addons/token-features/voting-power/DALPVotingPowerFeatureFactory.sol`)

### 5.3 Permit

**Feature ID:** `permit`

Purpose:

- Add EIP-2612 gasless approvals.

Evidence:

- Factory is `DALPPermitFeatureFactory`.
- Contract NatSpec explicitly says it provides EIP-2612 gasless approvals.
- Requires empty config data.

(`~/dalp/kit/contracts/contracts/addons/token-features/permit/DALPPermitFeatureFactory.sol`)

### 5.4 AUM Fee

**Feature ID:** `aum-fee`

Purpose:

- Time-based management-fee accrual for fund-like instruments.

Configuration:

- `feeBps` (uint16)
- `recipient` (address)

Validation / encoding evidence:

- `DALPAUMFeeFeatureFactory.validateConfig()` decodes `(uint16 feeBps, address recipient)` and rejects fee rates above 10,000 bps or zero recipient.
- DAPI encoding helper supports `feeBps`, `managementFeeBps`, and default recipient = sender.

(`~/dalp/kit/contracts/contracts/addons/token-features/aum-fee/DALPAUMFeeFeatureFactory.sol`, `~/dalp/packages/dalp/dapi/routes/token/src/services/create/encode-feature-config.ts`)

### 5.5 Maturity Redemption

**Feature ID:** `maturity-redemption`

Purpose:

- Maturity-based redemption logic for bond-like instruments.
- Supports maturity date, denomination asset, treasury, and face value.

Configuration:

- `maturityDate`
- `denominationAsset`
- `treasury`
- `faceValue`

Validation evidence:

- Factory rejects zero maturity date, zero denomination asset, zero treasury, and zero face value.
- DAPI encoder can derive it implicitly from type-specific bond parameters.

(`~/dalp/kit/contracts/contracts/addons/token-features/maturity-redemption/DALPMaturityRedemptionFeatureFactory.sol`, `~/dalp/packages/dalp/dapi/routes/token/src/services/create/encode-feature-config.ts`)

### 5.6 Fixed Treasury Yield

**Feature ID:** `fixed-treasury-yield`

Purpose:

- Scheduled yield distributions funded from a treasury in a denomination asset.

Configuration:

- `denominationAsset`
- `basisPerUnit`
- `treasury`
- `startDate`
- `endDate`
- `rate`
- `interval`

Validation evidence:

- Factory checks non-zero denomination asset, basis per unit, treasury, start and end dates, positive rate, positive interval, and end date after start date.

(`~/dalp/kit/contracts/contracts/addons/token-features/fixed-treasury-yield/DALPFixedTreasuryYieldFeatureFactory.sol`)

### 5.7 Transaction Fee

**Feature ID:** `transaction-fee`

Purpose:

- Charge fees on mint, burn, and transfer operations, payable in the asset itself.

Configuration:

- `mintFeeBps`
- `burnFeeBps`
- `transferFeeBps`
- `recipient`

Validation evidence:

- Factory decodes `FeeRates` plus recipient and rejects any fee rate above 10,000 bps or zero recipient.

(`~/dalp/kit/contracts/contracts/addons/token-features/transaction-fee/DALPTransactionFeeFeatureFactory.sol`)

### 5.8 Transaction Fee Accounting

**Feature ID:** `transaction-fee-accounting`

Purpose:

- Same encoding path as transaction fee in DAPI helper, indicating fee accounting as a distinct feature ID with the same fee-rate tuple structure.

Configuration handled in encoder as:

- `mintFeeBps`
- `burnFeeBps`
- `transferFeeBps`
- `recipient`

Evidence:

- Feature ID registered in canonical list.
- ABI encoding path handled explicitly in `encode-feature-config.ts`.

(`~/dalp/packages/core/validation/src/asset-type-template-features.ts`, `~/dalp/packages/dalp/dapi/routes/token/src/services/create/encode-feature-config.ts`)

### 5.9 External Transaction Fee

**Feature ID:** `external-transaction-fee`

Purpose:

- Charge operation fees in a separate ERC-20 token rather than in the issued asset itself.

Configuration:

- `feeToken`
- `feeRecipient`
- `mintFee`
- `burnFee`
- `transferFee`

Validation evidence:

- Factory rejects non-zero fees with no fee token, and rejects zero fee recipient.

(`~/dalp/kit/contracts/contracts/addons/token-features/external-transaction-fee/DALPExternalTransactionFeeFeatureFactory.sol`)

### 5.10 Conversion

**Feature ID:** `conversion`

Purpose:

- Convertible mechanics between a source token and target token.
- Capability mapping describes this as enabling debt-to-equity style conversion, including holder-initiated and custodian-initiated flows.

Configuration:

- ABI-encoded `ConversionConfig` plus escrow address, passed through as pre-encoded hex in the DAPI encoder.

Validation evidence:

- Factory validates target token, denomination asset, discount bounds, conversion-window integrity, escrow requirement for lock method, and token decimals <= 18 at deployment time.

(`~/dalp/kit/contracts/contracts/addons/token-features/conversion/DALPConversionFeatureFactory.sol`, `product/dalp/capability-mapping/asset-lifecycle.md`)

### 5.11 Conversion Minter

**Feature ID:** `conversion-minter`

Purpose:

- Target-token-side minting feature used in conversion flows.

Configuration:

- optional array of initial authorized converter addresses.

Validation evidence:

- Factory allows empty config, rejects zero addresses, and rejects duplicates.

(`~/dalp/kit/contracts/contracts/addons/token-features/conversion/DALPConversionMinterFeatureFactory.sol`)

## 6. What Is Configurable vs. What Is Included by Default

### 6.1 Included by default in DALPAsset

Every DALPAsset includes the following without attaching optional feature contracts:

- ERC-20-compatible token core
- ERC-3643 compliance hooks and identity integration
- access manager integration
- custody controls
- pause / unpause
- burn / batch burn
- metadata storage
- feature registry / configurability framework

Evidence: `DALPAssetImplementation.initialize(...)` (`~/dalp/kit/contracts/contracts/assets/dalp/DALPAssetImplementation.sol`).

### 6.2 Configurable at creation time

At token-creation time, DALP can configure:

- business identity of the token (`name`, `symbol`, `decimals`, `assetTypeName`)
- jurisdiction (`countryCode`)
- compliance modules and module parameters
- feature set and feature order
- feature-specific config values
- initial metadata
- initial permissions
- optional `unpauseOnCreation`

Evidence: `IDALPAssetFactory`, token create workflow, and capability mapping (`~/dalp/kit/contracts/contracts/assets/dalp/IDALPAssetFactory.sol`, `~/dalp/packages/dalp/dapi/routes/token/src/workflows/token.create.workflow.ts`, `product/dalp/capability-mapping/asset-lifecycle.md`).

### 6.3 Configurable after deployment

Governance can update:

- feature set and order via `setFeatures(...)`
- metadata via `setMetadata(...)` / `removeMetadata(...)`
- compliance module assignments and parameters via `addComplianceModule`, `removeComplianceModule`, `setParametersForComplianceModule`
- identity registry / onchain identity / compliance contract bindings

All are role-gated in `DALPAssetImplementation` (`~/dalp/kit/contracts/contracts/assets/dalp/DALPAssetImplementation.sol`).

### 6.4 Operational controls rather than token-shape controls

DALP also exposes post-deployment lifecycle controls through roles:

- mint / batch mint
- burn / batch burn
- pause / unpause
- freeze address / freeze partial amounts
- forced transfer
- forced wallet recovery
- recover accidentally sent ERC-20 tokens

These are not “configuration” in the narrow sense, but they are part of the configurable operating model of a regulated asset.

## 7. Role Model and Governance of Token Configuration

DALP uses per-asset roles defined in `DALPAssetRoles.sol`:

- `DEFAULT_ADMIN_ROLE`
- `GOVERNANCE_ROLE`
- `SUPPLY_MANAGEMENT_ROLE`
- `CUSTODIAN_ROLE`
- `EMERGENCY_ROLE`
- `SALE_ADMIN_ROLE`
- `FUNDS_MANAGER_ROLE`

(`~/dalp/kit/contracts/contracts/assets/DALPAssetRoles.sol`)

For configurable tokens, the important separation of duties is:

- **Governance** configures policy, compliance, metadata, and features.
- **Supply Management** handles minting and burning.
- **Custodian** handles freeze, forced transfer, and wallet recovery.
- **Emergency** handles pause/unpause and ERC-20 recovery.

The docs emphasize that these roles are scoped per asset and that admin rights do not automatically grant operational power (`~/dalp/kit/dapp/content/docs/architecture/components/asset-contracts/rbac.mdx`).

That is good bid material because it demonstrates DALP is not just configurable; it is configurable within a **controlled governance model**.

## 8. Token Lifecycle Management

### 8.1 Issuance workflow

DALP’s token creation workflow is implemented as a durable Restate workflow with explicit phases:

1. `creating`
2. `granting-permissions`
3. `issuing-claims`
4. `unpausing` (optional)
5. `completed`

(`~/dalp/packages/dalp/dapi/routes/token/src/workflows/token.create.workflow.ts`)

This is proposal-relevant because it shows DALP treats issuance as an orchestrated lifecycle event, not a single contract call.

### 8.2 Creation phase

In the creation phase, the workflow dispatches to the correct factory path. For configurable assets, it routes to the DALPAsset path, encodes features and metadata, then calls the factory. The token address, token identity, and access manager are decoded from the factory receipt rather than waiting for subgraph indexing (`~/dalp/packages/dalp/dapi/routes/token/src/workflows/token.create.workflow.ts`).

### 8.3 Permission bootstrap

After creation, DALP grants initial roles on the access manager. If no explicit `initialPermissions` are supplied, the workflow defaults to granting the creator `governance`. If `unpauseOnCreation=true`, it also ensures the sender has the `emergency` role required to unpause (`~/dalp/packages/dalp/dapi/routes/token/src/workflows/token.create.workflow.ts`, `product/dalp/capability-mapping/asset-lifecycle.md`).

### 8.4 Claim issuance

The workflow then issues on-chain claims to the token identity, with class-aware claim enrichment and validation. Capability mapping notes that issuance fails terminally on partial claim issuance and that auto-claim validation is enforced server-side (`product/dalp/capability-mapping/asset-lifecycle.md`, `product/dalp/capability-mapping/compliance-and-identity.md`).

### 8.5 Active lifecycle operations

Once issued, the token enters normal managed operations, including:

- issuance of units (mint)
- redemption or burn
- regulated transfers
- fee collection and feature-driven rewrites
- governance / vote checkpointing where applicable
- maturity handling where applicable
- treasury payouts where applicable

### 8.6 Pause / emergency handling

Because `SMARTPausableUpgradeable` is initialized as part of DALPAsset and `pause` / `unpause` are exposed through the `EMERGENCY_ROLE`, the platform supports controlled suspension and resumption of transfers (`~/dalp/kit/contracts/contracts/assets/dalp/DALPAssetImplementation.sol`).

### 8.7 Recovery and forced-movement controls

For lost-wallet or emergency scenarios, the asset supports:

- full address freezing
- partial token freezing
- forced transfer
- forced recover tokens from lost wallet to new wallet

This is contract-native and not speculative (`~/dalp/kit/contracts/contracts/assets/dalp/DALPAssetImplementation.sol`).

## 9. Multi-Asset Support

### 9.1 Multi-class support through one configurable asset contract

The capability mapping explicitly calls out **multi-class asset construction** across:

- equity
- bond
- fund
- stablecoin
- deposit
- real-estate
- precious-metal

with class-specific validation, factory dispatch, and claim enrichment (`product/dalp/capability-mapping/asset-lifecycle.md`).

For DALPAsset specifically, the unified factory accepts the asset type as a parameter rather than binding asset class into contract bytecode (`~/dalp/kit/contracts/contracts/assets/dalp/IDALPAssetFactory.sol`).

### 9.2 Multi-asset organization model

DALP organizes multiple instruments as separate contracts. The SMART integration documentation highlights the benefits:

- lifecycle isolation
- compliance independence
- upgrade independence
- clear accounting

(`~/dalp/kit/dapp/content/docs/architecture/components/asset-contracts/smart-protocol-integration.mdx`)

That means DALP supports multi-asset programs at platform level, but each asset remains operationally self-contained. For regulated finance, that is a feature, not a limitation.

### 9.3 Presets as starting points, not boundaries

The docs are explicit that legacy-equivalent presets are **starting points, not limits**. DALPAsset can attach any supported combination of token features and compliance modules, not only the seven documented baseline presets (`~/dalp/kit/dapp/content/docs/architecture/components/asset-contracts/instrument-profiles.mdx`).

That is one of DALP’s strongest multi-asset propositions: issuers can standardize on one contract architecture while still tailoring behavior per instrument.

## 10. Real Examples from the Codebase

### 10.1 Example: Fund-style token with AUM fee and governance

The Fund preset maps to:

- `aum-fee`
- `voting-power`
- `historical-balances`

with per-jurisdiction compliance modules (`~/dalp/kit/dapp/content/docs/architecture/components/asset-contracts/instrument-profiles.mdx`).

Code-backed configuration details:

- AUM fee config is encoded as `(uint16 feeBps, address recipient)` (`DALPAUMFeeFeatureFactory.sol`).
- Voting power requires no config data and attaches a governance-capable feature instance (`DALPVotingPowerFeatureFactory.sol`).
- Historical balances also requires no config data (`DALPHistoricalBalancesFeatureFactory.sol`).

### 10.2 Example: Bond-style token with maturity and yield

The Bond preset maps to:

- `fixed-treasury-yield`
- `maturity-redemption`
- `historical-balances`

plus a capped compliance module (`~/dalp/kit/dapp/content/docs/architecture/components/asset-contracts/instrument-profiles.mdx`).

Code-backed parameters include:

- Maturity redemption: `maturityDate`, `denominationAsset`, `treasury`, `faceValue`
- Fixed treasury yield: `denominationAsset`, `basisPerUnit`, `treasury`, `startDate`, `endDate`, `rate`, `interval`

(`DALPMaturityRedemptionFeatureFactory.sol`, `DALPFixedTreasuryYieldFeatureFactory.sol`)

### 10.3 Example: Stablecoin-style token with collateralized issuance

The StableCoin preset is documented as:

- `historical-balances`
- `CollateralComplianceModule`

with parameters such as collateral proof topic, collateral ratio, and trusted issuers (`~/dalp/kit/dapp/content/docs/architecture/components/asset-contracts/instrument-profiles.mdx`).

This is a good example of DALP’s architectural split:

- some behavior sits in token features,
- while other behavior sits in compliance modules.

That separation is deliberate and important in proposals because it shows DALP does not overload the token contract with every rule.

### 10.4 Example: Convertible instrument

Conversion capability is implemented in smart contracts and indexed in the subgraph, but the capability mapping clearly notes there are currently **no DAPI routes and no UI** for conversion; execution requires direct contract calls (`product/dalp/capability-mapping/asset-lifecycle.md`).

That should be stated honestly in proposal documents when conversion is in scope.

### 10.5 Example: Permit-enabled token

Attaching the `permit` feature adds EIP-2612 approvals without altering the underlying asset contract implementation. The factory deploys a deterministic `PermitFeature` instance using CREATE2 and empty config data (`~/dalp/kit/contracts/contracts/addons/token-features/permit/DALPPermitFeatureFactory.sol`).

That is a clean example of DALP’s modular philosophy: standards-adjacent functionality can be attached as a feature rather than requiring a new token class.

## 11. Textual Diagram: Token Creation Flow

### Diagram 1 — DALP configurable token creation flow

**Step 1 — Business configuration assembled**  
An issuer or operator selects a template or builds an asset from scratch. Inputs include token name, symbol, decimals, asset type, jurisdiction, metadata, compliance modules, and desired token features.

**Step 2 — DALP encodes business intent into on-chain configuration**  
The DAPI layer translates human-readable issuance inputs into `DALPAssetConfig`, ABI-encodes feature configuration via `encodeFeatureConfigs(...)`, and packages metadata entries for factory deployment.

**Step 3 — Unified factory deploys the asset**  
`DALPAssetFactoryImplementation.create(...)` validates the configuration, computes `assetTypeId = keccak256(bytes(assetTypeName))`, creates the access manager, deploys the token proxy, and creates the token identity.

**Step 4 — Feature contracts are created and attached**  
For each requested feature, the factory resolves the corresponding feature factory from the addon registry, deploys the feature contract, collects feature addresses, and atomically calls `setFeatures(...)` on the new asset.

**Step 5 — Roles are granted**  
The token creation workflow grants initial permissions on the asset’s access manager, defaulting the creator to governance if no explicit permission plan was supplied.

**Step 6 — Claims are issued**  
DALP issues class-aware on-chain claims to the token identity, establishing identity and classification state required by the compliance model.

**Step 7 — Token is optionally unpaused**  
If `unpauseOnCreation=true`, DALP executes an explicit unpause phase after claims are issued.

**Step 8 — Asset enters managed lifecycle**  
The token is now ready for issuance, transfer, redemption, servicing, and ongoing governance under its configured feature and compliance model.

Evidence sources: `IDALPAssetFactory.sol`, `DALPAssetFactoryImplementation.sol`, `token.create.workflow.ts`.

## 12. Textual Diagram: Token Lifecycle Management

### Diagram 2 — DALP token lifecycle

**Design**  
The issuer chooses an asset type, feature composition, compliance rules, and metadata model.

**Deploy**  
DALP creates the token contract, access manager, identity contract, and feature instances.

**Bootstrap governance**  
Roles are distributed across governance, supply management, custodian, and emergency operators.

**Issue**  
Supply-management actors mint units to approved holders, subject to compliance rules.

**Operate**  
Transfers flow through SMART compliance checks and any attached feature pipeline. Fees, vote checkpointing, maturity restrictions, or rewrite logic execute according to configured feature order.

**Service**  
Governance updates metadata or compliance parameters where permitted. Holders may claim yield, redeem at maturity, delegate votes, or execute permit-based approvals when those features are attached.

**Intervene if required**  
Custodians can freeze, force transfer, or recover assets from lost wallets. Emergency operators can pause the token.

**Redeem / Mature / Convert**  
Depending on attached features, the token may support maturity redemption, fixed yield servicing, or conversion mechanics.

**Continue, reconfigure, or retire**  
Governance may recompose the feature set on DALPAsset where post-deployment flexibility is allowed, or keep legacy compile-time types fixed where immutability is required.

## 13. Relationship Between DALPAsset and Legacy Specialized Types

DALP does not force a single answer. The docs are explicit that legacy specialized contract types remain fully supported and are not deprecated (`~/dalp/kit/dapp/content/docs/architecture/components/asset-contracts/legacy-types.mdx`).

The decision boundary is straightforward:

- Choose **legacy specialized types** when the legal, compliance, or investor posture requires compile-time immutability.
- Choose **DALPAsset** when runtime composition and future evolution matter more.

That coexistence is important in large programs. A client can use highly fixed contract forms for one product line and configurable DALPAsset for another, while keeping the same ERC-3643 foundation, identity model, and operational controls.

## 14. Positioning Context from the DALP Narrative

The DALP narrative frames configurable tokens as part of a broader institutional platform, not a standalone token factory. Three positioning themes are especially relevant and consistent with the code reviewed.

### 14.1 Configurability without custom smart contract work

The narrative states that DALP enables institutions to deploy new asset categories without writing new smart contracts, using a unified asset contract plus dynamic feature composition (`notion/dalp-narrative.md`).

That is backed by the factory architecture and the feature registry design.

### 14.2 Same governance and compliance model across all assets

The narrative also claims configurable assets keep the same compliance, custody, and governance controls as standard DALP assets. That is backed by `DALPAssetImplementation`, which always includes SMART compliance, custody controls, pausing, metadata, and RBAC (`~/dalp/kit/contracts/contracts/assets/dalp/DALPAssetImplementation.sol`).

### 14.3 Multi-asset expansion on one platform

The narrative emphasizes expanding across instruments and jurisdictions using one control plane (`notion/dalp-narrative.md`). The code and docs support this because asset category is parameterized, feature attachment is modular, and compliance is modeled through reusable modules rather than per-asset bespoke logic.

## 15. Constraints and Honest Boundaries

Proposal documents are stronger when they clearly separate shipped capability from aspiration.

Based on the reviewed materials, the following boundaries should be stated precisely:

1. **Configurable assets are ERC-20 / ERC-3643-centric.**  
   I did not find evidence in the reviewed token architecture of first-class DALP configurable issuance for ERC-721 or ERC-1155 assets.

2. **Some advanced token features are contract-ready before API/UI-ready.**  
   The capability mapping explicitly says conversion is smart-contract implemented and indexed, but still lacks DAPI routes and UI (`product/dalp/capability-mapping/asset-lifecycle.md`).

3. **Feature ordering is powerful but governance-sensitive.**  
   Because ordering affects semantics, operational discipline matters. DALP exposes that responsibility explicitly in `ISMARTConfigurable`.

4. **Legacy and configurable models coexist for a reason.**  
   DALPAsset is the recommendation for new projects, but specialized types remain valid where immutability is a requirement rather than a limitation.

## 16. Key Differentiators

### 16.1 Unified configurable asset contract, not a contract-per-variation development model

DALP’s `DALPAssetFactory` and `DALPAssetImplementation` allow multiple asset categories to be represented through one configurable contract architecture. Asset type is passed as configuration, not hard-coded into a fresh codebase for every new instrument.

### 16.2 Institution-ready baseline out of the box

DALPAsset is not an empty shell. It ships with regulated-token foundations already in place: ERC-3643 compliance hooks, identity integration, pause/unpause, burn, custody controls, metadata, and RBAC. Optional features extend that baseline rather than replacing it.

### 16.3 Ordered, pluggable feature composition

DALP does not just support feature toggles. It supports an **ordered execution pipeline** where the sequence of restrictions, fee logic, rewrite behavior, and analytics can be explicitly managed. That is materially more capable than a static checklist of extensions.

### 16.4 Separation of token features from compliance modules

DALP cleanly separates financial behavior from policy enforcement. Yield, maturity, permit, voting, and fee logic sit in token features; jurisdictional or supply controls sit in compliance modules. That architecture is more maintainable and more defensible in regulated environments.

### 16.5 Strong lifecycle operations for regulated assets

Minting, burning, pausing, freezing, forced transfer, wallet recovery, role separation, and claim-linked identity are all part of the shipped asset contract model. DALP’s configurable tokens are therefore operational products, not just issuance primitives.

### 16.6 Multi-asset standardization without losing instrument specificity

DALP supports bond, equity, fund, stablecoin, deposit, real-estate, and precious-metal models on one platform, while keeping each instrument isolated as its own contract with its own lifecycle and compliance state.

### 16.7 Honest coexistence model for immutability-sensitive use cases

DALP does not force all clients into runtime configurability. Where post-issuance mutability is inappropriate, legacy specialized contracts remain supported. That gives bidders a more credible answer for clients that need fixed-term legal certainty.

## Source Evidence Used

Primary sources reviewed for this section included:

- `~/dalp/kit/contracts/contracts/assets/dalp/IDALPAssetFactory.sol`
- `~/dalp/kit/contracts/contracts/assets/dalp/DALPAssetFactoryImplementation.sol`
- `~/dalp/kit/contracts/contracts/assets/dalp/DALPAssetImplementation.sol`
- `~/dalp/kit/contracts/contracts/assets/dalp/IDALPAsset.sol`
- `~/dalp/kit/contracts/contracts/assets/DALPAssetRoles.sol`
- `~/dalp/kit/contracts/contracts/smart/extensions/configurable/ISMARTConfigurable.sol`
- `~/dalp/kit/contracts/contracts/smart/extensions/configurable/ISMARTFeature.sol`
- Feature factories under `~/dalp/kit/contracts/contracts/addons/token-features/`
- `~/dalp/packages/core/validation/src/asset-type-template-features.ts`
- `~/dalp/packages/dalp/dapi/routes/token/src/services/create/encode-feature-config.ts`
- `~/dalp/packages/dalp/dapi/routes/token/src/workflows/token.create.workflow.ts`
- `~/dalp/kit/dapp/content/docs/architecture/components/asset-contracts/*.mdx`
- `product/dalp/capability-mapping/asset-lifecycle.md`
- `product/dalp/capability-mapping/compliance-and-identity.md`
- `notion/dalp-narrative.md`
