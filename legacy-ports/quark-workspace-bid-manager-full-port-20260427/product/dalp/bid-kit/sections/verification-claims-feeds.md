# Verification Topics, Identity Claims, Trusted Issuers, and Data Feeds

## Executive Summary

DALP implements a code-backed verification and data-attestation architecture built on three layers:

1. **Topic schemes** define what may be asserted and the exact ABI schema of each assertion.
2. **On-chain identities and trusted issuer registries** govern who may issue those assertions and how they are validated at runtime.
3. **Compliance and feeds infrastructure** consumes those attestations to gate transfers, minting, and valuation workflows.

This is not a loose metadata system. In the DALP codebase, verification topics are registered in the Topic Scheme Registry, claims are stored on ERC-735-compatible identity contracts, trusted issuers are resolved through a subject → system → global meta-registry, and feed values are validated on-chain before they are accepted. Transfer and minting logic then re-checks those claims or feed-backed conditions at execution time.

The result is a platform where identity verification, issuer authorization, collateral evidence, and price/NAV-style data can all be anchored to enforceable on-chain rules rather than off-chain policy alone.

---

## 1. Verification Topics Architecture

### 1.1 What DALP means by a “verification topic”

In DALP, a verification topic is the canonical name of a claim domain together with its schema. The authoritative source is `kit/contracts/contracts/system/DALPTopics.sol`, which defines the standard topic names and the exact claim signatures DALP registers in the topic scheme registry. DALP batches these into the registry during bootstrap through `kit/contracts/scripts/hardhat/actions/register-topics.ts`.

Two design choices matter:

- **Topic names are human-readable** for operator workflows and API usage.
- **Topic IDs are deterministic** on-chain identifiers computed as `keccak256(abi.encodePacked(name))` / `keccak256(toBytes(name))`, as shown in `kit/contracts/scripts/hardhat/constants/topics.ts`.

That gives DALP both operator readability and machine-stable identifiers.

### 1.2 Standard topic catalog in the codebase

DALP currently defines **23 standard verification topics** in `DALPTopics.sol`.

#### Investor-level topics

| Topic name | Topic ID (keccak256 of name) | Schema in code | Purpose |
|---|---:|---|---|
| `knowYourCustomer` | `0x3ba8daeb7aacd3c0dd9341756886e4c774cf9f1654ceed6368843e124185ef92` | `string claim` | KYC verification |
| `antiMoneyLaundering` | `0x933fcaf82a6a7e0e90ddc16dff8f0496b23cc52e1e57dbfb9a4b29f2bad68a7e` | `string claim` | AML/CTF screening |
| `qualifiedInstitutionalInvestor` | `0x57633c7b147fdd74b1bb190ed35abfb8ff132e20c9349b81d1f7be1de60f1819` | `string claim` | QII status |
| `professionalInvestor` | `0xb5b0ae93bed193d50e6bd3ea9324b7cabb0b7480719c484656be961164bea85a` | `string claim` | Professional investor status |
| `accreditedInvestor` | `0x22c894797d8644a88124935ff295f21d07a2379ddd21ecf65a360dfc3e47cfeb` | `string claim` | Accredited investor status |
| `accreditedInvestorVerified` | `0x84523e609eb6b3c5d9505b8227112711492f9b1976fb0c48cedb3749d2f35e01` | `string claim` | Document-verified accredited status |
| `regulationS` | `0xf44c35845ebce5d0dbb0f33b3cc9895d98628e5a6e363ff61e1249ab6fa7f489` | `string claim` | Reg S / non-US person status |

#### Issuer-level topics

| Topic name | Topic ID | Schema in code | Purpose |
|---|---:|---|---|
| `issuerProspectusFiled` | `0x91f8a8ef0b3d6fcae9aaf4f89287e2197ec878428f384f3edb65fc8fb92dbda5` | `string prospectusReference` | Filed prospectus evidence |
| `issuerProspectusExempt` | `0xef1db2789e231d765e231808ce137d5abeeb7aab2ddb4e07c7e834043f2f749a` | `string exemptionReference` | Prospectus exemption evidence |
| `issuerLicensed` | `0x093246cfe55f171f1fceda74ce2ecf6d6b03be9bf82e917fccbe5ef982060020` | `string licenseType, string licenseNumber, string jurisdiction, uint256 validUntil` | Regulatory license data |
| `issuerReportingCompliant` | `0x8d7007526873ebf4193a77097fbf9c854e2da31a71b734ce459506e1462b0dce` | `bool compliant, uint256 lastUpdated` | Ongoing reporting status |
| `issuerJurisdiction` | `0x32bac87a0444e547b64665a03fa234cabbb1f0ba5e8f1415fdc0675a2546f4ac` | `string jurisdiction` | Issuer domicile / regulatory jurisdiction |

#### Asset-level topics

| Topic name | Topic ID | Schema in code | Purpose |
|---|---:|---|---|
| `collateral` | `0x7d1dc38e60930664f8cbf495da6556ca091d2f92d6550877750c049864b18230` | `uint256 amount, uint256 expiryTimestamp` | Proof of reserves / collateral evidence |
| `uniqueIdentifier` | `0xfdad5e94cd0a71d5835c70ee72ad64dbf735562038f120eaffb983783e044daa` | `string identifier` | ISIN / REN / official identifier |
| `assetClassification` | `0x360e4241e9f271cba2fd4e4a3f4da2cbcf9421d1dd524a1cbb7363dbd7cbf72a` | `string class, string category` | Asset class / subtype |
| `basePrice` | `0x7f774c63e5508831c93ac868b7e0b69aba906515c7cb6e15ab588ef8998c6785` | `uint256 amount, string currencyCode, uint8 decimals` | Asset valuation claim |
| `assetIssuer` | `0x82de9a3e11437f1f65d357db9fa0344f210e691d637ad17d0540cc208eb9395a` | `address issuerAddress` | Legal issuer reference |
| `assetLocation` | `0x12a49286d08271e94808ee61c14fca82a8b8b346286327ca46e76462814b2253` | `string city, string districtCode, string areaId` | Privacy-preserving location reference |
| `assetCoordinates` | `0xa65adc5cafe19fb7c560c202f4b15d10317f7ca5fc0312257bca5f963980ef0c` | `int256 latitude, int256 longitude` | GPS coordinates |
| `assetPhysicalDetails` | `0x449814a0ddfa206815e56ba64293a3a983886cf45ff6caea20e4be2df4b29516` | `uint256 propertyArea, uint256 buildingYear, uint256 numberOfUnits` | Physical asset details |
| `documentHash` | `0xa2337af9c0c983d244fe5901fbd8591e34918612fb5a46d3a9da3a6306987c70` | `string sha256Hash, string documentType, string fileName` | Document integrity anchor |

#### General topics

| Topic name | Topic ID | Schema in code | Purpose |
|---|---:|---|---|
| `contractIdentity` | `0x60ed81e5fd50d39a8eda96677e0972f73e8e3c947846dc0577c30a0ec222a91c` | `address contractAddress` | Smart contract identity binding |
| `dalpWallet` | `0x565af1c669b98806f0c093136e8997d263c1787c5a4c8a6b3e55c6a5dbb39623` | `address accountAddress` | DALP-managed wallet attestation |

### 1.3 Feed topics are also first-class verification topics

DALP extends the same topic-scheme mechanism to data feeds. `register-topics.ts` adds two scalar feed topics beyond the 23 standard topics in `DALPTopics.sol`:

| Feed topic name | Topic ID | Schema |
|---|---:|---|
| `FEED:BASE_PRICE:EUR:v1` | `0xd1125e77baa2d1a83e0e961475a166da306fcfcf3f4710dc9b1c74131efecbcf` | `int256 value` |
| `FEED:FX:EUR/USD:v1` | `0x2931652be62a562672fff7fb51f6f44bc1040460b43739ed6a6d28d6e7fada02` | `int256 value` |

That is architecturally important: DALP does not treat feeds as a separate, ad hoc data plane. Feed schemas are anchored in the same topic scheme registry used for identity and compliance claims.

### 1.4 Why topic schemes matter

The topic scheme registry is used to enforce schema integrity before claims or feeds are relied upon. On the feeds side, `DALPFeedsDirectoryImplementation.sol` checks:

- the topic exists,
- the feed kind is supported,
- the topic schema hash matches the expected scalar schema, and
- the feed implements the required interface.

This prevents a subject/topic pair from silently changing meaning underneath consuming contracts.

---

## 2. Identity Claims System

### 2.1 Identity model

DALP’s identity and compliance architecture is documented in `kit/dapp/content/docs/architecture/security/identity-compliance.mdx` and implemented in the contracts under `kit/contracts/contracts/global/identity-factory/identities/` and `kit/contracts/contracts/onchainid/extensions/`.

The model combines:

- **ERC-734** key management,
- **ERC-735** claim management,
- DALP identity implementations with revocation support, and
- identity registries that map wallets to on-chain identities.

Per the architecture docs, every holder is resolved through an identity registry before compliance is evaluated, and claims live on the associated OnchainID contract rather than directly on the token.

### 2.2 Claim structure and storage

The claim structure follows the ERC-735 shape described both in docs and code:

- `topic`
- `scheme`
- `issuer`
- `signature`
- `data`
- `uri`

`DALPIdentityImplementation.sol` exposes `addClaim`, `removeClaim`, and claim retrieval on top of ERC-735. The platform’s claim issue route (`packages/dalp/dapi/routes/system/src/identity/claim/routes/claim.issue.shared.ts`) creates the signature off-chain, encodes an `addClaim` call against `IDALPIdentity`, and queues it for on-chain execution.

The call DALP ultimately encodes is:

- `addClaim(topicId, 1, issuerIdentity, signature, claimData, "")`

That shows three things clearly:

1. the claim is added to the **target identity contract**;
2. the **issuer recorded on-chain is the issuer identity**, not merely an EOA; and
3. the claim payload is ABI-encoded claim data derived from the registered topic scheme.

### 2.3 Who can issue claims

DALP distinguishes between technical ability to create a claim and platform-recognized authority to have that claim trusted.

The docs in `user-guides/compliance/overview.mdx` state that any on-chain identity can technically issue verifications, but only **trusted issuers** are recognized automatically by compliance modules. The enforcement side is in the trusted issuer registries and claim validation flow.

For feed updates, the same pattern appears in `IssuerSignedScalarFeed.sol`: the submitting issuer must be authorized for the topic, and the recovered signer must have **CLAIM purpose (3)** on the issuer identity. DALP is therefore consistently using identity-bound issuer authority rather than trusting arbitrary EOAs.

### 2.4 On-chain storage and privacy posture

DALP’s docs emphasize minimal on-chain disclosure for KYC and related compliance data. The best concrete implementation evidence is in `claim.issue.shared.ts`: for the `knowYourCustomer` topic, DALP validates that the claim value matches the approved KYC profile’s **content hash** from the database before allowing issuance.

That means DALP is not writing raw KYC documents on-chain; it is anchoring the approved off-chain record by hash and then binding that hash to the identity claim.

This is proposal-relevant for regulated workflows because it gives:

- auditable proof that a specific approved KYC dossier existed,
- privacy-preserving on-chain storage, and
- deterministic linkage between off-chain review and on-chain enforcement.

---

## 3. Trusted Issuer Registry Architecture

### 3.1 Registry model

DALP implements a **tiered trusted issuer architecture** rather than a single flat allowlist.

The key contract is `DALPTrustedIssuersMetaRegistryImplementationV2.sol`, which explicitly documents the resolution order as:

**subject → system → global**

This means a claim issuer can be trusted:

- for a specific subject (for example, a token or identity scope),
- at system level, or
- platform-wide through the global trusted issuers registry.

The meta-registry merges and de-duplicates issuers across these tiers.

### 3.2 Global registry

`DALPGlobalTrustedIssuersRegistryImplementation.sol` is the platform-wide registry. It stores, per issuer:

- whether the issuer exists,
- the issuer address, and
- the set of claim topics that issuer is trusted for.

It also maintains topic-to-issuer indexes for efficient lookup.

The CRUD surface includes:

- `addTrustedIssuer`
- `removeTrustedIssuer`
- `updateIssuerClaimTopics`
- `addContractAsTrustedIssuer`

Access is restricted to directory admins. In operational terms, this is the broadest trust layer in DALP.

### 3.3 Token/subject-level registry

`TokenTrustedIssuersRegistry.sol` provides a subject-aware registry scoped to a specific token. It is governed by the token’s `GOVERNANCE_ROLE`, not by a system-wide admin role. This is a critical separation-of-duties feature:

- system operators can maintain global trusted issuers,
- while individual asset governance can add or remove issuer trust at token scope.

The contract emits subject-aware events and validates the subject against the token’s own OnchainID context.

### 3.4 Runtime lookup behavior

The V2 meta-registry overrides the lookup functions so that DALP can answer, for a given issuer/topic/subject combination:

- is this issuer trusted at all,
- is this issuer trusted for this claim topic,
- which issuers are trusted for this topic, and
- which topics this issuer is trusted for.

That matters because downstream compliance modules and feed contracts do not need to know where trust was configured. They query the meta-registry, which resolves the effective trust set across all applicable tiers.

### 3.5 Operational consequence of issuer removal

DALP’s docs are explicit here. `architecture/security/compliance/identity-verification.mdx` states that if a trusted issuer is removed after claims were issued, existing claims from that issuer are no longer accepted. That is stronger than a simple “no new claims” rule.

So the trusted issuer registry is not just an issuance permission list. It is part of the **runtime validation surface**.

---

## 4. Claim Lifecycle: Issuance, Verification, Revocation, and Removal

### 4.1 Issuance lifecycle

The documented and implemented lifecycle is:

1. **Off-chain review** occurs first (for example KYC dossier review).
2. DALP determines the topic scheme and validates claim content.
3. DALP creates the claim signature off-chain.
4. DALP queues an on-chain `addClaim` transaction to the target identity.
5. The claim is stored on the identity contract.
6. Compliance modules use it at transfer or mint time.

The strongest code-backed example is KYC issuance:

- `manage-kyc-data.mdx` documents approval of KYC submissions.
- `verify-kyc.mdx` documents the later issuance of an on-chain verification.
- `claim.issue.shared.ts` enforces that for `knowYourCustomer`, the claim value must match the approved KYC content hash.

That is a robust issuance chain: approved off-chain evidence → deterministic hash check → on-chain claim.

### 4.2 Verification at transaction time

Claims are not merely displayed in the UI; they are evaluated during on-chain execution.

`identity-compliance.mdx` and `identity-verification.mdx` describe the runtime flow:

- the token resolves sender and recipient identities through the identity registry,
- compliance orchestrates module evaluation,
- the identity verification module evaluates logical expressions over claims, and
- invalid, missing, expired, or untrusted claims cause the transfer to fail.

The docs are explicit that claims must be valid and non-expired. For collateral claims, the expiry field is built into the topic schema itself (`uint256 amount, uint256 expiryTimestamp`), and `supply-cap-collateral.mdx` states that expired collateral claims are rejected.

### 4.3 Revocation model

DALP supports claim revocation at the identity layer.

`OnChainIdentityWithRevocation.sol` adds:

- `revokedClaims` mapping keyed by `keccak256(signature)`,
- `isClaimRevoked`, and
- internal revocation functions emitting `ClaimRevoked`.

`DALPIdentityImplementation.sol` exposes manager-only:

- `revokeClaimBySignature(bytes)`
- `revokeClaim(bytes32,address)`

Most importantly, `OnChainIdentityWithRevocation.isClaimValid(...)` first checks base claim validity and then returns false if the signature has been revoked.

That means a revoked claim remains historically visible but becomes invalid for enforcement.

### 4.4 Removal model

DALP also supports full removal of claims from identities. `DALPIdentityImplementation.sol` exposes `removeClaim(bytes32)` with action-key access control, and the underlying ERC-735 implementation emits `ClaimRemoved`.

From an operational perspective:

- **revocation** preserves the claim record but marks it invalid;
- **removal** deletes the stored claim entry from the identity contract.

Both are indexed. `packages/dalp/indexer/src/handlers/identity-keys-claims.ts` processes `ClaimRemoved`, and DALP’s indexer data model tracks active vs revoked claims.

### 4.5 Lifecycle governance and controls

The platform docs and contracts together show a clean role split:

- **Verification issuer** issues claims,
- **Verification policy manager / claim policy manager** manages verification topics and trusted issuers,
- **Identity manager** reviews KYC source data before claim issuance,
- **Token governance** can manage subject-level trusted issuers.

That separation is proposal-grade because it supports governance and audit controls rather than concentrating issuance and policy in one account.

---

## 5. How Verification Integrates with Compliance Enforcement

### 5.1 Identity verification module

DALP’s most expressive compliance module is the identity verification module documented in `architecture/security/compliance/identity-verification.mdx`.

It evaluates **Reverse Polish Notation (RPN)** expressions over claim topics. Examples from the docs include:

- `[KYC, AML, AND]`
- `[ACCREDITED]`
- `[CONTRACT, KYC, AML, AND, OR]`

The point is not the example syntax alone. The point is that DALP’s transfer logic is claim-aware at runtime and can express multi-topic regulatory conditions rather than a binary KYC flag.

### 5.2 Runtime characteristics

The architecture docs state the following invariants:

- both sender and recipient can be checked,
- claims must be non-expired,
- malformed expressions are rejected at configuration time,
- trusted issuer validation is part of the effective check.

This is significant for proposals because DALP is not enforcing compliance via UI workflows or operator habits. It is enforcing compliance in the token execution path.

### 5.3 Collateral enforcement as a claim-based compliance module

The collateral module is the clearest non-KYC example of claims driving token behavior.

`supply-cap-collateral.mdx` and `user-guides/compliance/collateral.mdx` show that minting can be conditioned on a valid collateral claim carrying:

- a collateral amount, and
- an expiry timestamp.

The module parameters include:

- `proofTopic`
- `ratioBps`
- optional `trustedIssuers[]`

At mint time, DALP checks that post-mint supply does not exceed available collateral given the configured ratio. Expired claims are rejected. This is direct evidence that DALP uses the same verification framework not only for investor eligibility but also for reserve-backed issuance controls.

### 5.4 Consequence for transfer restrictions

For bid purposes, the practical answer is straightforward:

- **Investor transfer eligibility** can be gated on KYC / AML / accredited / jurisdiction-style claims.
- **Minting eligibility** can be gated on collateral claims.
- **Issuer trust changes** can immediately affect whether existing claims remain acceptable.

That is a materially stronger design than static allowlists because it supports ongoing re-validation.

---

## 6. Data Feeds Architecture

### 6.1 Core architecture

DALP’s feed system is documented in `architecture/components/infrastructure/feeds-system.mdx` and implemented in:

- `DALPFeedsDirectoryImplementation.sol`
- `IssuerSignedScalarFeed.sol`
- `ScalarFeedAggregatorAdapter.sol`
- corresponding factory contracts

The design separates:

- **discovery** through the FeedsDirectory, and
- **delivery** through individual feed contracts.

The key registry key is a `(subject, topicId)` pair.

### 6.2 Feed scopes

The user docs define three scopes:

- **Global** — `address(0)` subject for market-wide data such as FX rates
- **Asset-scoped** — token address subject for asset-specific metrics such as NAV
- **Identity-scoped** — identity contract subject for entity-specific metrics such as risk ratings

This is an important differentiator: the feed plane is not limited to token prices.

### 6.3 Feed types supported in current code

Current code supports:

1. **Issuer-signed scalar feeds**
2. **External scalar feeds registered in the directory**
3. **Chainlink-compatible aggregator adapters** that present a stable address over DALP-managed or external scalar feeds

The `FeedsDirectory` currently restricts registration to **SCALAR** feeds in the MVP. `DALPFeedsDirectoryImplementation.sol` explicitly rejects `BYTES` feeds with `BytesFeedsNotSupported()`.

So today’s verified implementation is numeric scalar feeds, not arbitrary structured feed payloads.

### 6.4 Schema enforcement for feeds

`DALPFeedsDirectoryImplementation.sol` pins the scalar schema hash to:

- `keccak256("(int256 value)")`

It resolves the topic signature from the topic scheme registry and normalizes the schema before hashing. That means feed topics are schema-checked before registration and replacement.

In practical terms, DALP prevents a “topic drift” scenario where a feed registered under a known topic could silently change payload shape.

### 6.5 Immutable feed configuration

`IssuerSignedScalarFeed.sol` makes the following feed configuration immutable at deployment:

- subject
- topicId
- expectedSchemaHash
- decimals
- description
- history mode
- history size
- positive-value requirement
- drift allowance

If a parameter needs to change materially, the feed must be replaced and the directory updated. That is operationally conservative and audit-friendly.

---

## 7. Oracle and Feed Update Validation

### 7.1 Issuer-signed feed update path

The on-chain validation sequence is directly documented in `IssuerSignedScalarFeed.sol` and mirrored in `feeds-update-flow.mdx`.

A submitted update must pass all of the following:

1. `topicId` matches the pinned topic
2. `schemaHash` matches the pinned schema
3. issuer is trusted for the topic and subject
4. recovered signer is a CLAIM-purpose key on the issuer identity
5. nonce is strictly sequential per issuer
6. deadline has not expired
7. if configured, value must be positive
8. `observedAt` must be non-zero
9. `observedAt` cannot be older than current latest observation
10. `observedAt` cannot exceed current block time plus drift allowance

This is not a loose “oracle push” pattern. It is an identity-governed, replay-resistant, schema-checked submission model.

### 7.2 History modes

`IssuerSignedScalarFeed.sol` supports three history modes:

- `LATEST_ONLY`
- `BOUNDED`
- `FULL`

The docs map these to operational needs:

- latest-only for current pricing,
- bounded for sliding windows,
- full for permanent audit trails.

This matters for regulated environments where some data points must remain historically auditable.

### 7.3 Chainlink-compatible adapter pattern

`ScalarFeedAggregatorAdapter.sol` provides a stable Chainlink-style `AggregatorV3Interface` address for a pinned `(subject, topicId)` pair.

Every call:

- resolves the current feed from the directory,
- checks it exists and is scalar,
- forwards `decimals`, `description`, `getRoundData`, and `latestRoundData`.

This is a strong integration pattern because consumer contracts and external protocols can point to a stable adapter address even if the underlying feed contract is replaced.

### 7.4 External feed registration

DALP also supports registering an existing external scalar feed contract directly in the directory. The developer guide `create-feeds.mdx` explicitly names Chainlink as an example. The directory stores the mapping and validates interface compatibility; it does not manage the external feed’s lifecycle.

That gives DALP two oracle integration patterns:

- **native DALP issuer-signed feeds**, and
- **directory-registered external oracle feeds**.

---

## 8. Real Feed Topics and Real Feed Configurations from the Codebase

### 8.1 Real feed topics

The codebase includes two concrete feed topics in `scripts/hardhat/constants/topics.ts` and `register-topics.ts`:

| Topic | Topic ID | Schema |
|---|---:|---|
| `FEED:BASE_PRICE:EUR:v1` | `0xd1125e77baa2d1a83e0e961475a166da306fcfcf3f4710dc9b1c74131efecbcf` | `int256 value` |
| `FEED:FX:EUR/USD:v1` | `0x2931652be62a562672fff7fb51f6f44bc1040460b43739ed6a6d28d6e7fada02` | `int256 value` |

### 8.2 Real factory defaults

The helper `scripts/hardhat/system-addons/feeds/issuer-signed-scalar-feed.ts` shows DALP’s default creation parameters when not overridden:

- `historyMode = LATEST_ONLY`
- `historySize = 0`
- `requirePositive = true`
- `driftAllowance = 300`

These are not documentation examples; they are the actual helper defaults in the contracts deployment tooling.

### 8.3 Real deployed example in DALP bootstrap/demo script

`scripts/hardhat/main.ts` includes a concrete feed creation example:

- subject: `stableCoin.address`
- topic: `DALPTopic.basePriceFeed` (`FEED:BASE_PRICE:EUR:v1`)
- decimals: `8`
- description: `"BASE_PRICE:EUR:v1"`
- `requirePositive: true`
- `driftAllowance: 300`

That is the cleanest code-backed feed configuration example currently present in the repository.

### 8.4 Real API/feed configuration examples in docs

The developer docs `developer-guides/feeds/create-feeds.mdx` also show concrete feed configurations such as:

- `decimals: 8`
- `historyMode: "BOUNDED"`
- `historySize: 100`
- `requirePositive: true`
- `driftAllowance: 0`

Those are documentation examples rather than deployment defaults, but they are aligned with the feed contract’s actual parameter surface and DALP API routes.

### 8.5 NAV, price, and related metric support

DALP’s docs explicitly list supported use cases for scalar feeds including:

- **price feeds**
- **NAV reporting**
- **interest rates**
- **custom oracle data**
- **identity-scoped metrics such as credit score or risk rating**

This is documented in `developer-guides/feeds/overview.mdx`, `user-guides/data-feeds/overview.mdx`, and `user-guides/data-feeds/create-feed.mdx`.

### 8.6 Corporate action feeds: what the code does and does not show

The repository evidence supports price, FX, NAV-style, rate, and custom scalar metric feeds. It does **not** show a dedicated built-in “corporate action feed” contract or named corporate-action topic in the current codebase reviewed here.

Accordingly, the accurate proposal statement is:

- DALP’s current verified implementation supports scalar attestation feeds that can carry asset or entity metrics such as price, NAV, rates, and other numeric observables.
- A dedicated pre-defined corporate-action feed topic or specialized corporate-action feed contract was **not found** in the reviewed code.

That distinction matters. DALP clearly has feed infrastructure broad enough to carry many numeric business events, but the code reviewed does not justify claiming a first-class corporate-action feed module out of the box.

---

## 9. Oracle Integration Patterns

### 9.1 Pattern A — Issuer-signed oracle

Use when the data owner or appointed calculation agent is the authoritative source.

**How it works in DALP:**

- register a scalar topic,
- register the publisher identity as a trusted issuer for that topic,
- create the issuer-signed scalar feed,
- publish EIP-712 signed updates,
- let smart contracts and APIs consume the latest or historical values.

This pattern is especially suited to NAV, fund accounting marks, internal benchmark rates, reserve attestations, and issuer-operated valuation services.

### 9.2 Pattern B — External oracle registration

Use when a trusted third-party feed already exists.

**How it works in DALP:**

- register the external feed address in `FeedsDirectory`,
- validate the interface and schema compatibility,
- resolve it using the same subject/topic discovery model as native feeds.

This supports Chainlink-style market data ingestion without changing DALP’s consumer model.

### 9.3 Pattern C — Stable-address adapter for external consumers

Use when downstream consumers need a fixed integration endpoint.

**How it works in DALP:**

- create a `ScalarFeedAggregatorAdapter` pinned to `(subject, topicId)`,
- point external integrations to the adapter,
- replace underlying feeds in the directory over time without changing the adapter address.

This is particularly useful where DeFi protocols, analytics engines, or external valuation stacks expect Chainlink-compatible interfaces.

---

## 10. Key Differentiators

### 10.1 Unified topic architecture across claims and feeds

DALP uses the same topic-scheme infrastructure for both compliance claims and data feeds. That is cleaner and more governable than maintaining one registry for identity attestations and another unrelated registry for pricing data.

### 10.2 Tiered issuer trust resolution

The subject → system → global trusted issuer meta-registry is materially stronger than a flat allowlist. It supports local override, portfolio-level policy, and platform-wide trust simultaneously.

### 10.3 Runtime enforcement, not document storage theater

Claims are not merely recorded; they are re-validated during transfer and mint execution. If claims expire, are revoked, or come from no-longer-trusted issuers, DALP can block the action on-chain.

### 10.4 Privacy-aware KYC anchoring

The KYC issuance flow validates against an approved content hash rather than writing raw PII on-chain. That balances auditability with data minimization.

### 10.5 Identity-bound oracle authorization

Issuer-signed feeds are not just EOA-signed messages. DALP verifies that the recovered signer is a CLAIM-purpose key on the issuer identity and that the issuer identity is trusted for the topic. That creates a much stronger authorization chain than bare signer allowlists.

### 10.6 Stable integration endpoint via adapters

The Chainlink-compatible adapter pattern decouples consumer endpoints from underlying feed replacement. That reduces operational risk during feed migration or provider change.

### 10.7 Compliance beyond investor KYC

DALP reuses the claim system for collateral and asset evidence as well as investor eligibility. That expands the compliance framework from “who can hold” into “under what proof-backed conditions can issuance occur.”

---

## 11. Proposal-Relevant Conclusion

The reviewed DALP codebase demonstrates a mature and coherent verification architecture built around deterministic topic schemes, on-chain identity claims, trusted issuer resolution, and feed-backed data attestation.

What can be stated with confidence from the code reviewed:

- DALP has a standard topic catalog for investor, issuer, asset, and contract claims.
- Claims are stored on ERC-735-compatible identities and can be added, revoked, or removed.
- Trusted issuers are governed through a three-tier meta-registry with subject, system, and global scope.
- Compliance modules consume claims at execution time to enforce transfer and mint restrictions.
- The collateral module uses claim-based evidence with expiry to gate minting.
- The feeds architecture supports issuer-signed scalar feeds, registered external scalar feeds, and Chainlink-compatible adapters.
- Real feed topics and configurations exist in the codebase, including `FEED:BASE_PRICE:EUR:v1` and `FEED:FX:EUR/USD:v1`.

What should be stated carefully:

- The current verified feed implementation is scalar-only in the reviewed code.
- The repository supports price, FX, NAV-style, rate, and custom numeric feeds.
- A dedicated prebuilt corporate-action feed type or topic was not evidenced in the reviewed code and should not be claimed as shipped without further code confirmation.

That combination of rigor and restraint is the right story for a bid response: DALP already provides a strong, enforceable foundation for identity verification, trusted attestations, collateralized issuance controls, and oracle-fed valuation data, while remaining precise about which capabilities are explicitly present in the current codebase.

---

## Code and Documentation Sources Reviewed

### Core contracts

- `~/dalp/kit/contracts/contracts/system/DALPTopics.sol`
- `~/dalp/kit/contracts/contracts/system/trusted-issuers-registry/DALPTrustedIssuersMetaRegistryImplementationV2.sol`
- `~/dalp/kit/contracts/contracts/global/trusted-issuers-registry/DALPGlobalTrustedIssuersRegistryImplementation.sol`
- `~/dalp/kit/contracts/contracts/system/tokens/trusted-issuers-registry/TokenTrustedIssuersRegistry.sol`
- `~/dalp/kit/contracts/contracts/global/identity-factory/identities/DALPIdentityImplementation.sol`
- `~/dalp/kit/contracts/contracts/onchainid/extensions/OnChainIdentityWithRevocation.sol`
- `~/dalp/kit/contracts/contracts/system/feeds/DALPFeedsDirectoryImplementation.sol`
- `~/dalp/kit/contracts/contracts/addons/feeds/issuer-signed-scalar/IssuerSignedScalarFeed.sol`
- `~/dalp/kit/contracts/contracts/addons/feeds/aggregator-adapter/ScalarFeedAggregatorAdapter.sol`

### Scripts and API routes

- `~/dalp/kit/contracts/scripts/hardhat/constants/topics.ts`
- `~/dalp/kit/contracts/scripts/hardhat/actions/register-topics.ts`
- `~/dalp/kit/contracts/scripts/hardhat/system-addons/feeds/issuer-signed-scalar-feed.ts`
- `~/dalp/kit/contracts/scripts/hardhat/main.ts`
- `~/dalp/packages/dalp/dapi/routes/system/src/identity/claim/routes/claim.issue.shared.ts`

### Documentation

- `~/dalp/kit/dapp/content/docs/architecture/security/identity-compliance.mdx`
- `~/dalp/kit/dapp/content/docs/architecture/security/compliance/identity-verification.mdx`
- `~/dalp/kit/dapp/content/docs/architecture/security/compliance/supply-cap-collateral.mdx`
- `~/dalp/kit/dapp/content/docs/architecture/components/infrastructure/feeds-system.mdx`
- `~/dalp/kit/dapp/content/docs/architecture/flows/feeds-update-flow.mdx`
- `~/dalp/kit/dapp/content/docs/user-guides/compliance/overview.mdx`
- `~/dalp/kit/dapp/content/docs/user-guides/compliance/configure-trusted-issuers.mdx`
- `~/dalp/kit/dapp/content/docs/user-guides/compliance/verify-kyc.mdx`
- `~/dalp/kit/dapp/content/docs/user-guides/compliance/manage-kyc-data.mdx`
- `~/dalp/kit/dapp/content/docs/user-guides/compliance/collateral.mdx`
- `~/dalp/kit/dapp/content/docs/user-guides/data-feeds/overview.mdx`
- `~/dalp/kit/dapp/content/docs/user-guides/data-feeds/create-feed.mdx`
- `~/dalp/kit/dapp/content/docs/user-guides/data-feeds/publish-feed-update.mdx`
- `~/dalp/kit/dapp/content/docs/developer-guides/feeds/overview.mdx`
- `~/dalp/kit/dapp/content/docs/developer-guides/feeds/create-feeds.mdx`
