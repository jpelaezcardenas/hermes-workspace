# DALP Configurable Compliance

## Executive Summary

DALP’s configurable compliance capability is implemented as a modular enforcement layer on top of its SMART / ERC-3643 token stack. In code, compliance is not a generic off-chain rules engine bolted onto settlement later; it is part of the token transaction path. Every token uses a per-token compliance orchestrator, and that orchestrator can invoke both token-specific modules and platform-wide global modules before mint, transfer, or burn execution proceeds. If any configured module reverts, the token movement fails on-chain. This architecture is implemented in DALP’s compliance contracts (`DALPComplianceImplementation.sol`, `IDALPTokenCompliance.sol`), token contracts (`ISMART.sol`, `_SMARTLogic.sol`), and concrete compliance modules under `kit/contracts/contracts/smart/compliance/`.

The shipped module set covers twelve concrete module type IDs in DALP’s validation and API layer:

- `address-block-list`
- `capped`
- `collateral`
- `country-allow-list`
- `country-block-list`
- `identity-allow-list`
- `identity-block-list`
- `identity-verification`
- `investor-count`
- `time-lock`
- `token-supply-limit`
- `transfer-approval`

That is evidenced in `packages/core/validation/src/compliance.ts`, mirrored in the DAPI encoding switch at `packages/dalp/dapi/routes/core/src/helpers/compliance-encoding/index.ts`, and implemented as concrete contracts including `CountryAllowListComplianceModule.sol`, `SMARTIdentityVerificationComplianceModule.sol`, `TokenSupplyLimitComplianceModule.sol`, `InvestorCountComplianceModule.sol`, `TransferApprovalComplianceModule.sol`, `TimeLockComplianceModule.sol`, `CollateralComplianceModule.sol`, and `CappedComplianceModule.sol`.

The net result is a compliance model with four important characteristics that matter in a bid context:

1. **Enforcement is deterministic and transaction-bound.** Compliance checks happen before state mutation, not as after-the-fact monitoring.
2. **Rules are modular and composable.** A token can combine identity, geography, issuance, holding-period, approval, and collateral controls.
3. **Identity is first-class.** DALP binds wallets to OnchainID identities through an ERC-3643 identity registry and evaluates trusted claims at transfer time.
4. **Jurisdictional alignment is configuration-led, not hard-coded.** DALP ships compliance templates for several frameworks and provides the lower-level controls to assemble jurisdiction-specific policies for others.

## 1. Compliance Architecture

### 1.1 Architectural model

DALP’s compliance architecture separates **orchestration**, **identity**, and **rule execution**:

- **Per-token compliance orchestration**: the token invokes its compliance contract before token state changes.
- **Global compliance orchestration**: DALP can apply platform-wide modules in addition to token-local modules.
- **Identity registry**: wallet addresses resolve to OnchainID contracts through an ERC-3643-compatible identity registry.
- **Trusted issuer and topic registries**: claims are only meaningful when their topic is registered and the issuer is trusted for that topic.
- **Compliance modules**: self-contained rule contracts that receive token, sender, receiver, amount, and ABI-encoded configuration parameters.

This is documented in `kit/dapp/content/docs/architecture/security/identity-compliance.mdx` and `kit/dapp/content/docs/architecture/flows/compliance-transfer.mdx`, and implemented in `kit/contracts/contracts/system/compliance/DALPComplianceImplementation.sol` plus the SMART token interfaces.

The code-level architecture matters because it defines where compliance actually lives:

- `DALPComplianceImplementation.sol` maintains the **global bypass list**, **global module list**, **global module parameters**, and binding to per-token compliance contracts.
- The same implementation executes **token-specific modules first**, then **global modules** for `canTransfer`, `transferred`, `created`, and `destroyed` flows.
- The token stack exposes module management methods such as `addComplianceModule`, `removeComplianceModule`, and `setParametersForComplianceModule` through `ISMART.sol` / `_SMARTLogic.sol`.

### 1.2 Transaction enforcement flow

DALP’s transfer validation flow is explicit in `compliance-transfer.mdx`:

1. User initiates transfer/mint/burn.
2. Token calls compliance `canTransfer` before any balance mutation.
3. Identity registry resolves sender/receiver identities where relevant.
4. Configured modules are evaluated sequentially.
5. First failing module reverts the transaction.
6. If all checks pass, token state mutates.
7. Post-state hooks (`transferred`, `created`, `destroyed`) update module state such as investor counts, rolling issuance windows, or approval consumption.

This is not just documentation language; the global compliance implementation explicitly states in code comments that it first calls token-specific compliance modules and then global compliance modules.

### 1.3 Two-layer policy model

DALP documents and maps a **two-layer policy model**:

- **Layer 1: DALP on-chain compliance modules** enforce transfer eligibility, geography, identity, supply, investor, timelock, approval, and collateral rules.
- **Layer 2: External custodian / signer policies** enforce additional controls outside the DALP smart contract scope, such as MPC approvals, destination allow-lists, or provider-specific transaction controls.

This is documented in `identity-compliance.mdx` and reinforced in the capability mapping file `product/dalp/capability-mapping/compliance-and-identity.md`, which describes DALP-native compliance as the first layer and DFNS / Fireblocks / external signer policy as the second layer.

That distinction is commercially important: DALP provides the protocol-level enforcement layer, but it does not claim that every institution-specific screening or custodian policy is native on-chain functionality.

## 2. Compliance Configuration Model

### 2.1 Global infrastructure, per-token parameters

DALP’s model is reusable by design:

- A module contract is deployed once.
- Multiple tokens can reuse that same contract.
- Each token provides its own ABI-encoded parameter set.
- Modules validate parameters before they are accepted.

This is described in `architecture/security/compliance/index.mdx` and in `smart/README.md`, which states that one deployed module instance serves many tokens with different token-specific parameters.

The DAPI helper `encodeComplianceParams(...)` in `packages/dalp/dapi/routes/core/src/helpers/compliance-encoding/index.ts` shows that DALP explicitly dispatches parameter encoding by `typeId`, not by a permissive catch-all serializer. Unknown types hard-fail.

### 2.2 Supported configuration surface

`packages/core/validation/src/compliance.ts` is the most precise summary of the externally supported configuration model. It defines the discriminated union used across API and UI layers. The configuration parameters are:

| Module typeId | Parameter shape |
|---|---|
| `address-block-list` | `address[]` |
| `country-allow-list` | `uint16[]` ISO numeric country codes |
| `country-block-list` | `uint16[]` ISO numeric country codes |
| `identity-allow-list` | `address[]` identity contract addresses |
| `identity-block-list` | `address[]` identity contract addresses |
| `identity-verification` | `ExpressionNode[]` |
| `token-supply-limit` | `{ maxSupply, periodLength, rolling, useBasePrice, global }` |
| `investor-count` | `{ maxInvestors, global, countryCodes, countryLimits, topicFilter }` |
| `time-lock` | `{ holdPeriod, allowExemptions, exemptionExpression }` |
| `transfer-approval` | `{ approvalAuthorities, allowExemptions, oneTimeUse, exemptionExpression, approvalExpiry }` |
| `collateral` | `{ proofTopic, ratioBps, trustedIssuers }` |
| `capped` | `{ maxSupply }` |

### 2.3 Category model in the DALP application layer

The web application groups these into six stable categories in `kit/dapp/src/lib/compliance/module-categories.ts`:

- `eligibility`: identity allow/block, identity verification
- `restrictions`: country allow/block, address block
- `transferControls`: transfer approval
- `issuanceAndSupply`: capped, token-supply-limit, investor-count
- `timeBasedRules`: time-lock
- `settlementAndCollateral`: collateral

That categorization is useful in a bid because it demonstrates DALP already has a productized mental model for authoring and operating compliance, not just raw smart contracts.

## 3. Available Compliance Modules

## 3.1 Country allow-list and country block-list

**Contracts:**

- `CountryAllowListComplianceModule.sol`
- `CountryBlockListComplianceModule.sol`
- Shared base: `AbstractCountryComplianceModule.sol`

**Parameter format:** ABI-encoded `uint16[]` country codes.

**Identity dependency:** These modules query the token’s identity registry via `_getUserCountry(_token, _user)` and therefore require the investor to be registered and have a known country.

**Enforcement behavior:**

- `CountryAllowListComplianceModule` blocks if the receiver has no identity, has country `0`, or is not in the allowed country list. It reverts with messages including `"Receiver identity unknown"` and `"Receiver country not in allowlist"`.
- `CountryBlockListComplianceModule` blocks if the receiver has no identity, has country `0`, or is in the blocked country list. It reverts with `"Receiver country blocked"`.

**Bid relevance:** These modules provide jurisdictional admission control at token transfer time and are the foundation for country-based offering restrictions.

## 3.2 Address and identity allow/block lists

**Contracts:**

- `AddressBlockListComplianceModule.sol`
- `IdentityAllowListComplianceModule.sol`
- `IdentityBlockListComplianceModule.sol`
- Shared bases: `AbstractAddressListComplianceModule.sol`, `AbstractIdentityComplianceModule.sol`

**Parameter format:** ABI-encoded `address[]`.

**Behavior:**

- `AddressBlockListComplianceModule` blocks when sender or receiver wallet address is explicitly listed.
- `IdentityAllowListComplianceModule` requires the receiver’s registered identity contract address to be in the allowed list; unknown identity fails.
- `IdentityBlockListComplianceModule` blocks when the receiver’s identity contract is in the blocked list.

**Bid relevance:** These modules are useful for bespoke investor whitelisting, sanctions-style operational blocking once a party has been identified off-chain, and restricted distribution patterns.

## 3.3 Identity verification

**Contract:** `SMARTIdentityVerificationComplianceModule.sol`

**Parameter format:** ABI-encoded `ExpressionNode[]`.

This is one of DALP’s strongest compliance primitives. Rather than requiring a flat list of claim topics, DALP supports logical expressions over claims using postfix evaluation with `TOPIC`, `AND`, `OR`, and `NOT` operators.

The module:

- decodes an expression from `_params`
- validates structural correctness in `_validateExpressionStructure(...)`
- rejects zero topic IDs, malformed boolean logic, and overly complex expressions
- calls `identityRegistry.isVerified(_to, expression)`

The developer guide `smart-identity-verification.mdx` documents this directly and gives examples such as:

- KYC only
- KYC AND AML
- alternative claim paths using OR
- exemption-style logic using NOT

DALP documents the platform advantage here explicitly in `smart/README.md`: compared with simpler ERC-3643 patterns, DALP supports **advanced logical expressions** rather than simple AND-only topic checks.

**Bid relevance:** This is the core control for “only verified investors may receive this asset,” but it also supports richer logic such as “KYC and AML, or qualified institutional investor,” provided those claim topics exist and trusted issuers are configured.

## 3.4 Investor count

**Contract:** `InvestorCountComplianceModule.sol`

**Parameter struct:** `InvestorCountConfig`

```solidity
struct InvestorCountConfig {
    uint256 maxInvestors;
    bool global;
    uint16[] countryCodes;
    uint256[] countryLimits;
    ExpressionNode[] topicFilter;
}
```

**Behavior:**

- Tracks unique investors holding a positive balance.
- Maintains current total count and per-country counts.
- Can apply per-token or issuer-wide counting depending on `global`.
- Can count only investors matching a claim-expression filter through `topicFilter`.
- Uses post-transfer hooks (`transferred`, `created`, `destroyed`) to update state.
- Blocks new investors when the global or country-specific limits would be exceeded.

**Bid relevance:** This is directly useful for regimes where the number of holders matters, including private placement-style distributions.

## 3.5 Token supply limit

**Contract:** `TokenSupplyLimitComplianceModule.sol`

**Parameter struct:** `SupplyLimitConfig`

```solidity
struct SupplyLimitConfig {
    uint256 maxSupply;
    uint256 periodLength;
    bool rolling;
    bool useBasePrice;
    bool global;
}
```

This module is more sophisticated than a simple cap.

**What it does:**

- Supports **lifetime caps** when `periodLength == 0`
- Supports **fixed-period caps** when `periodLength > 0` and `rolling == false`
- Supports **rolling-window caps** when `periodLength > 0` and `rolling == true`
- Supports **base-price-normalized issuance limits** using on-chain price claims when `useBasePrice == true`
- Supports **issuer-wide limits across multiple tokens** when `global == true`

The contract documentation explicitly cites MiCA-style issuance caps as a use case, including comments describing “MiCA’s €8M limit.” The validation schema in `compliance.ts` also uses MiCA examples for `maxSupply` in base currency.

**Bid relevance:** This module is DALP’s primary control for periodic issuance ceilings and regulatory issuance windows.

## 3.6 Capped supply

**Contract:** `CappedComplianceModule.sol`

**Parameter struct:** `CappedConfig { uint256 maxSupply; }`

This module is intentionally simple and stateless. It checks current `totalSupply()` plus proposed mint amount against a maximum cap.

Difference from token supply limit:

- `CappedComplianceModule` is a **circulating supply cap**.
- `TokenSupplyLimitComplianceModule` is a **regulatory issuance tracking module** with lifetime/fixed/rolling windows and optional base-price conversion.

That distinction is explicit in `CappedComplianceModule.sol` comments.

## 3.7 Transfer approval

**Contract:** `TransferApprovalComplianceModule.sol`

**Parameter struct:**

```solidity
struct Config {
    address[] approvalAuthorities;
    bool allowExemptions;
    bool oneTimeUse;
    ExpressionNode[] exemptionExpression;
    uint256 approvalExpiry;
}
```

**Behavior:**

- Binds approvals to **identities**, not only wallet addresses.
- Requires both parties to have registered identities.
- Stores approvals by `(token, fromIdentity, toIdentity, value)`.
- Supports configurable expiry.
- Supports single-use approvals via `oneTimeUse`.
- Supports exemptions for identities matching a claim expression.
- Provides explicit approval and revocation events.
- Consumes approvals on `transferred(...)` when one-time use is enabled.

**Bid relevance:** This module supports issuer- or intermediary-controlled secondary transfer models and manual compliance officer approval flows.

## 3.8 Time lock / holding period

**Contract:** `TimeLockComplianceModule.sol`

**Parameter struct:**

```solidity
struct TimeLockParams {
    uint256 holdPeriod;
    bool allowExemptions;
    ExpressionNode[] exemptionExpression;
}
```

**Behavior:**

- Enforces minimum holding periods before transfer.
- Uses FIFO batch tracking of acquisition lots per holder.
- Records acquisition batches on mint and transfer.
- Removes batches on transfer and burn.
- Supports claim-based exemptions.
- Caps per-user batch growth with `MAX_BATCHES_PER_USER = 500`.

**Bid relevance:** This module supports lock-up and seasoning requirements without relying on off-chain operational controls alone.

## 3.9 Collateral

**Contract:** `CollateralComplianceModule.sol`

**Parameter struct:**

```solidity
struct CollateralConfig {
    uint256 proofTopic;
    uint16 ratioBps;
    address[] trustedIssuers;
}
```

**Behavior:**

- Applies to minting only.
- Reads collateral claims from the token’s own OnchainID identity.
- Builds a trusted issuer set from registry issuers plus per-token configured issuers.
- Finds the best valid collateral claim for the configured `proofTopic`.
- Computes required collateral as post-mint supply multiplied by `ratioBps / 10000`, with ceiling division.
- Blocks mint when collateral is insufficient.

The developer guide `collateral.mdx` documents the same configuration model and claim issuance flow.

**Bid relevance:** This provides on-chain enforcement of collateral-backed issuance where reserve or backing attestations are represented as claims.

## 4. Identity Registry and Claim Topics

## 4.1 Identity model

DALP’s identity system follows ERC-3643 plus OnchainID (ERC-734 / ERC-735).

The architectural documentation `identity-compliance.mdx` defines the core components:

- **Identity Registry**: per token, mapping wallet addresses to OnchainID contracts
- **Trusted Issuers Registry**: global/shared trust source for which issuers may attest to which topics
- **OnchainID**: per-identity contract holding keys and claims
- **SMARTCompliance**: per-token orchestrator
- **Compliance Modules**: reusable rule contracts

### 4.2 DALPIdentityRegistryImplementation

The actual system implementation is in `kit/contracts/contracts/system/identity-registry/DALPIdentityRegistryImplementation.sol`.

It holds references to:

- `ISMARTIdentityRegistryStorage`
- `ISMARTTrustedIssuersRegistry`
- `ISMARTTopicSchemeRegistry`

and manages:

- wallet-to-identity registration
- country association
- verification evaluation
- pending identity acceptance
- wallet recovery for pending identities

The companion interface `ISMARTIdentityRegistry.sol` exposes the core operational functions:

- `registerIdentity(address, IIdentity, uint16)`
- `deleteIdentity(address)`
- `updateCountry(address, uint16)`
- `updateIdentity(address, IIdentity)`
- `batchRegisterIdentity(...)`
- `recoverIdentity(address lostWallet, address newWallet, address newOnchainId)`
- `contains(address)`
- `isVerified(address, ExpressionNode[])`
- `identity(address)`
- `investorCountry(address)`

### 4.3 Registration and jurisdiction binding

The user-management guide `register-user.mdx` shows how DALP uses identity registration operationally:

- a user must already have an on-chain identity
- registration associates the wallet with a jurisdiction
- jurisdiction is stored as country code and can be consumed by compliance rules
- non-registered identities cannot receive regulated assets when identity-based modules are active

That matters because DALP’s geographic and claim-based compliance is only as good as the identity registration layer underneath it. DALP does not hand-wave that dependency away; it is explicit in both docs and contract interfaces.

## 4.4 Claim topics system

DALP maintains a central topic catalog in `kit/contracts/contracts/system/DALPTopics.sol`.

Shipped topic families include:

### Investor-level topics

- `knowYourCustomer`
- `antiMoneyLaundering`
- `qualifiedInstitutionalInvestor`
- `professionalInvestor`
- `accreditedInvestor`
- `accreditedInvestorVerified`
- `regulationS`

### Issuer-level topics

- `issuerProspectusFiled`
- `issuerProspectusExempt`
- `issuerLicensed`
- `issuerReportingCompliant`
- `issuerJurisdiction`

### Asset-level topics

- `collateral`
- `uniqueIdentifier`
- `assetClassification`
- `basePrice`
- `assetIssuer`
- `assetLocation`
- `assetCoordinates`
- `assetPhysicalDetails`
- `documentHash`

### General topics

- `contractIdentity`
- `dalpWallet`

`DALPTopics.sol` also defines the topic signatures used for registry registration. That is important in proposal terms because it shows DALP’s claim model is typed, not an unstructured “blob of KYC data.”

## 4.5 Trusted issuers

Trusted issuer configuration is documented in `developer-guides/compliance/configure-trusted-issuers.mdx` and enforced through registry contracts referenced by the identity registry.

DALP supports:

- authorizing specific issuer identities for specific claim topics
- multiple topics per issuer
- retrieving registered claim topics via API
- per-topic trust relationships rather than blanket trust for every claim type

The capability mapping file additionally documents a newer **global trusted issuers registry** direction (`DALPGlobalTrustedIssuersRegistryImplementation` and meta-registry V2 resolution), but the safest proposal language is this: DALP supports trusted issuer governance across topic-scoped claims, and the codebase includes both system-scoped and evolving global-scoped trust registry patterns.

## 5. T-REX / ERC-3643 Implementation Details

DALP’s compliance and identity design is explicitly aligned to ERC-3643 and documented as SMART Protocol integration.

The architecture docs state the following ERC-3643 concepts are implemented:

- identity binding between wallets and OnchainID
- compliance validation through modular contracts
- claim-based permissions
- token transfer gating before execution

In `smart/README.md`, DALP further positions SMART as an opinionated implementation that extends typical ERC-3643 patterns with:

- reusable compliance and identity contracts across tokens
- token-specific module configuration
- advanced logical claim expressions
- full ERC-20 compatibility
- ERC-165 support
- meta-transaction support
- modular extensions

From a proposal standpoint, the critical point is not branding; it is that DALP uses the ERC-3643 identity/compliance pattern and materially extends it in several implementation-backed ways.

### 5.1 What DALP adds beyond a minimal ERC-3643 pattern

Based on `smart/README.md`, `identity-compliance.mdx`, and the compliance module contracts, DALP adds several practical capabilities on top of baseline restricted-token patterns:

1. **Logical claim expressions** rather than simple static topic lists.
2. **Reusable module instances with per-token configuration** rather than one-off monolithic compliance contracts per token.
3. **Token and global compliance layering** through `DALPComplianceImplementation`.
4. **Operational modules beyond identity checks**, including investor count, rolling issuance limits, timelocks, approval workflows, and collateral-backed mint controls.

## 6. Transfer Restriction Enforcement: On-Chain vs Off-Chain

## 6.1 What DALP enforces on-chain

The following are natively enforced by DALP’s smart contract layer when configured:

- country restrictions
- address restrictions
- identity allow/block restrictions
- identity claim verification
- investor count restrictions
- issuance / supply limits
- holding periods
- transfer approvals
- collateral-backed mint gating

This is evidenced by the concrete module contracts and the transfer validation flow documentation.

## 6.2 What DALP expects from off-chain systems

The workaround documents in `product/dalp/workarounds/` are blunt about the boundary:

- **Sanctions screening intelligence** is not natively provided; DALP provides block / allow enforcement mechanisms.
- **Travel Rule messaging** is not implemented; DALP has the identity data and compliance hooks, but not protocol integration.
- **KYT/KYW provider integration** is not implemented; DALP can consume results through claims, block lists, or approval workflows.
- **UAE / DFSA / VARA / CBUAE prebuilt templates** are not shipped; DALP provides composable building blocks.
- **Cryptographic per-transaction reserve linkage** is not shipped; collateral enforcement is available, but not direct proof-of-reserve binding at transaction granularity.

That distinction is exactly the right one for a proposal. DALP enforces what is configured on-chain. It does not pretend to ship every external compliance data feed or regulator-specific reporting workflow out of the box.

## 6.3 Practical enforcement split

A clean way to describe DALP’s enforcement split in proposal language is:

- **DALP on-chain layer**: deterministic eligibility and transfer gating
- **DALP API / workflow layer**: configuration, issuer management, identity registration, claim issuance, approval operations
- **External compliance providers**: source systems for KYC, AML, sanctions, KYT, Travel Rule, or regulator reporting where needed
- **Custodian / signer layer**: independent policy and approval controls for transaction execution

That statement is fully supported by the code/docs set reviewed.

## 7. Regulatory Framework Alignment

## 7.1 Shipped regulatory templates

DALP’s compliance architecture documentation states that the platform ships **seven system-seeded compliance templates**:

1. **MiCA EU Standard**
2. **Reg D 506(b) — Private Placement**
3. **Reg D 506(c) — Accredited Only**
4. **MAS Singapore — Capital Markets**
5. **UK FCA — Securities**
6. **Japan FSA — Crypto Assets**
7. **Reg CF — Crowdfunding**

These are documented in `kit/dapp/content/docs/architecture/security/compliance/index.mdx`.

### 7.2 MiCA alignment

The strongest code-backed MiCA alignment is through:

- `TokenSupplyLimitComplianceModule.sol`, whose comments explicitly cite MiCA-style issuance caps
- the architecture template `MiCA EU Standard`, which documents identity verification + country allow list + token supply limit with an 8M EUR cap and 365-day rolling window

DALP therefore supports MiCA-style issuance controls through shipped templates and a purpose-built rolling supply-limit module.

### 7.3 MAS alignment

The architecture template catalog lists **MAS Singapore — Capital Markets** with:

- identity verification
- country allow list
- investor count
- timelock

and documents a **50 investor** and **180-day holding period** pattern.

That is a real shipped template, not inferred positioning.

### 7.4 DFSA / UAE alignment

DALP does **not** ship UAE-specific prebuilt templates according to `product/dalp/workarounds/enbd/uae-regulatory-alignment.md`.

What it does ship are the building blocks that the workaround file explicitly names:

- country allow / block lists
- identity verification requirements
- investor count limits
- transfer approval
- capped holdings / supply controls
- timelocks
- claim-based identity model

The correct proposal statement is therefore:

> DALP provides a jurisdiction-agnostic compliance framework that can be configured for DFSA / UAE deployment patterns, but the reviewed codebase and documentation do not evidence a DFSA-native out-of-the-box compliance template.

That is accurate and avoids overselling.

## 8. How Compliance Modules Are Composed in Practice

DALP supports module composition at token creation and post-deployment configuration time.

### 8.1 Composition examples evidenced by docs and code

**Example 1: KYC-gated issuance into a permitted geography**

- `CountryAllowListComplianceModule`
- `SMARTIdentityVerificationComplianceModule`

**Example 2: Private placement with investor cap**

- `SMARTIdentityVerificationComplianceModule`
- `CountryAllowListComplianceModule`
- `InvestorCountComplianceModule`

**Example 3: Stablecoin or deposit token with issuance control**

- `CollateralComplianceModule`
- `CappedComplianceModule` or `TokenSupplyLimitComplianceModule`
- `SMARTIdentityVerificationComplianceModule`

**Example 4: Controlled secondary market**

- `SMARTIdentityVerificationComplianceModule`
- `TransferApprovalComplianceModule`
- optional `TimeLockComplianceModule`

Those patterns are directly supported by the module catalog, validation schema, and shipped regulatory templates.

### 8.2 Ordering matters

The compliance transfer flow documentation states that modules are evaluated in configuration order and recommends placing restrictive checks first. In practice that means:

- low-cost eligibility checks first (country / identity / address)
- more expensive stateful checks next (investor count / supply windows)
- operational controls as needed (approval / timelock / collateral)

That is a practical implementation detail bidders will care about when discussing gas efficiency and deterministic transaction behavior.

## 9. How New Compliance Rules Can Be Added

DALP’s compliance framework is explicitly extensible.

Evidence:

- `smart/README.md` describes an extensible framework with support for custom implementations.
- All shipped modules inherit from `AbstractComplianceModule.sol` or a more specialized abstract base.
- The module interface pattern expects support for hooks such as `canTransfer`, `transferred`, `created`, `destroyed`, `validateParameters`, `name`, and `typeId`.
- The global compliance contract validates modules and parameters before registration.

### 9.1 Practical extension path

A new compliance rule in DALP follows the same pattern as shipped modules:

1. Implement a new compliance contract inheriting from `AbstractComplianceModule`.
2. Define a unique `typeId`.
3. Define ABI-encoded configuration parameters and `validateParameters(...)`.
4. Implement `canTransfer(...)` and, if stateful, `created(...)`, `transferred(...)`, `destroyed(...)`.
5. Register the module so it can be discovered and configured by tokens.
6. Add validation schema and encoding support in the API layer.

The DAPI encoding helper is especially relevant here: supporting a new module cleanly means adding an explicit encoder branch rather than bypassing validation.

### 9.2 Important limitation

The reviewed DALP codebase clearly supports **new module development**, but that should not be described as “no-code compliance authoring for entirely new rule types.” The no-code / low-code part applies to configuring the **shipped** module family. A genuinely new rule type still requires adding a new module contract and corresponding API-layer support.

## 10. Capability Mapping and Known Gaps

The internal capability mapping `product/dalp/capability-mapping/compliance-and-identity.md` is broadly consistent with the codebase and docs reviewed.

It correctly describes:

- two-layer policy enforcement
- a managed compliance module registry
- validation-backed compliance parameter handling
- topic- and issuer-governed claim lifecycle control

The same file and the workaround documents also identify the gaps that matter in regulated deployments:

- no universal sanctions intelligence layer
- no Travel Rule integration
- no KYT/KYW provider integration
- no native legal interpretation engine
- some partner-specific module families require ongoing maintenance

That is the honest architecture line: DALP provides the compliance substrate and enforcement engine, not every external regulatory data service.

## 11. Key Differentiators

### 11.1 Compliance is part of the token protocol path

DALP does not treat compliance as a sidecar report. The token checks compliance before state mutation, and failed checks revert the transaction on-chain. That materially reduces the gap between policy intent and execution.

### 11.2 Claim logic is richer than simple whitelist gating

`SMARTIdentityVerificationComplianceModule.sol` supports structured boolean expressions across claims. That enables real policy logic, not just “has topic X.”

### 11.3 DALP separates reusable infrastructure from per-asset policy

A single module can be reused across tokens with different parameters, while DALP also supports global modules. This is operationally cleaner than redeploying bespoke compliance contracts for every instrument.

### 11.4 The module set covers both eligibility and lifecycle controls

DALP’s shipped set spans:

- who may hold the asset
- where they may hold it from
- how many investors may participate
- how much may be issued, and over what period
- whether approvals are required
- whether holding periods apply
- whether collateral evidence is sufficient to mint

That is a more complete compliance toolkit than identity-only restricted token models.

### 11.5 DALP is explicit about the boundary between enforcement and intelligence

The workaround documentation is commercially useful because it is honest. DALP ships enforcement primitives; sanctions, KYT, Travel Rule, and jurisdiction-specific assembly may require external integrations or deployment-specific configuration. That is exactly the kind of clarity serious buyers want.

## 12. Proposal Positioning Summary

Based on the DALP codebase, documentation, capability mapping, and workaround material reviewed, the proposal-safe description is:

> DALP delivers a configurable, modular compliance framework built into its SMART / ERC-3643 token architecture. It combines an identity registry, trusted issuer and claim-topic model, reusable compliance modules, and deterministic pre-transfer enforcement to support jurisdictional eligibility, investor verification, issuance controls, investor-count limits, timelocks, approval workflows, and collateral-backed minting. The platform ships reusable compliance templates for several regulatory patterns, including MiCA and MAS-style configurations, and supports jurisdiction-specific assembly where no prebuilt template exists. DALP provides the enforcement substrate natively; external screening and reporting integrations remain outside the reviewed out-of-the-box scope.

## Source Basis

Primary code and documentation reviewed for this section:

- `~/dalp/kit/contracts/contracts/system/compliance/DALPComplianceImplementation.sol`
- `~/dalp/kit/contracts/contracts/system/compliance/IDALPGlobalCompliance.sol`
- `~/dalp/kit/contracts/contracts/system/compliance/IDALPTokenCompliance.sol`
- `~/dalp/kit/contracts/contracts/system/identity-registry/DALPIdentityRegistryImplementation.sol`
- `~/dalp/kit/contracts/contracts/smart/interface/ISMARTIdentityRegistry.sol`
- `~/dalp/kit/contracts/contracts/system/DALPTopics.sol`
- `~/dalp/kit/contracts/contracts/smart/compliance/*.sol`
- `~/dalp/kit/contracts/contracts/smart/README.md`
- `~/dalp/kit/dapp/content/docs/architecture/security/compliance/index.mdx`
- `~/dalp/kit/dapp/content/docs/architecture/security/identity-compliance.mdx`
- `~/dalp/kit/dapp/content/docs/architecture/flows/compliance-transfer.mdx`
- `~/dalp/kit/dapp/content/docs/developer-guides/compliance/smart-identity-verification.mdx`
- `~/dalp/kit/dapp/content/docs/developer-guides/compliance/configure-trusted-issuers.mdx`
- `~/dalp/kit/dapp/content/docs/developer-guides/compliance/collateral.mdx`
- `~/dalp/kit/dapp/content/docs/developer-guides/user-management/register-user.mdx`
- `~/dalp/packages/core/validation/src/compliance.ts`
- `~/dalp/packages/dalp/dapi/routes/core/src/helpers/compliance-encoding/index.ts`
- `~/dalp/kit/dapp/src/lib/compliance/module-categories.ts`
- `product/dalp/capability-mapping/compliance-and-identity.md`
- `product/dalp/workarounds/enbd/uae-regulatory-alignment.md`
- `product/dalp/workarounds/enbd/sanctions-screening.md`
- `product/dalp/workarounds/enbd/travel-rule-compliance.md`
- `product/dalp/workarounds/enbd/kyt-kyw-integration.md`
- `product/dalp/workarounds/enbd/mint-burn-reserve-linking.md`
