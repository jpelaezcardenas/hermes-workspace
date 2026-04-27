# Commodities: DALP Coverage for Commodity-Backed Digital Assets

## Introduction

Commodity tokenization sits at the intersection of physical asset operations and digital securities infrastructure. Unlike purely financial instruments such as bonds or equities, commodity-backed tokens carry an additional layer of complexity: every token must reference a verifiable, auditable claim on a physical asset stored in a specific location, under specific custody arrangements, with specific quality attestations. The gap between "we can mint a token" and "this token is a credible, regulatory-grade claim on physical gold in a Swiss vault" is where most commodity tokenization projects stall.

DALP addresses this complexity through its precious metals asset class, collateral verification modules, data feeds architecture, and configurable compliance framework. This section details how each component of DALP supports the operational reality of commodity-backed digital assets, from backing verification through custody integration to settlement and delivery.

## Backing Verification

### The Collateral Module

The credibility of any commodity-backed token rests on one question: does the physical backing actually exist, and can it be proven? DALP's collateral compliance module enforces on-chain proof of reserves before minting operations proceed, ensuring that token supply never exceeds verified physical holdings.

The collateral module operates as a compliance module within DALP's ERC-3643 framework. When attached to a token, it enforces a configurable collateral ratio expressed in basis points. A ratio of 10,000 basis points (100%) means every token must be fully backed; higher ratios enforce overcollateralization for risk buffers. The module evaluates collateral sufficiency at mint time: if the collateral backing is insufficient for the requested mint amount, the transaction reverts. There is no soft warning, no grace period, and no manual override path outside of the standard governance controls.

Collateral verification relies on identity claims issued by authorized attestation providers. The module is configured with a collateral claim topic and can reference additional trusted issuers specifically for reserve attestation. This means the institution's vault auditor, for example, can be registered as a trusted issuer authorized to issue collateral attestation claims, while remaining separate from the KYC/AML claim issuers. The separation of trust domains is deliberate: the entity verifying physical reserves should not need the same authorization scope as the entity verifying investor identity.

### Attestation Workflows

Proof-of-reserve attestation in DALP follows a structured pattern. A qualified third-party auditor inspects the physical reserves (vault inventory, warehouse receipts, assay certificates) and issues an attestation claim on-chain through DALP's trusted issuer infrastructure. The claim is cryptographically signed using EIP-712 typed data signatures, creating a tamper-evident record that links the auditor's identity, the attestation timestamp, and the verified reserve value.

The attestation claim is stored on the asset's OnchainID identity contract, making it queryable by any participant or compliance module. Token holders, regulators, and secondary market participants can independently verify that an attestation exists, who issued it, and when it was last updated, without relying on the token issuer's representations.

For ongoing reserve monitoring, DALP's feeds architecture supports continuous collateral valuation. An issuer-signed scalar feed can publish reserve values at configured intervals, with history modes ranging from latest-only (for simple current-state verification) to full history (for complete audit trails of every reserve update). The feed's drift allowance feature flags unexpected changes in reserve values, alerting operators to investigate potential discrepancies before they affect minting operations.

### What Backing Verification Covers and Where It Stops

DALP's collateral module verifies that on-chain attestations meet the configured ratio before allowing minting. It does not independently verify physical reserves; that responsibility belongs to the auditor or vault operator who issues the attestation claim. This is the correct architectural boundary: DALP provides the enforcement mechanism and the trust infrastructure, while physical verification remains with domain-specific experts who have physical access to the reserves.

Institutions deploying commodity-backed tokens should establish audit schedules (quarterly is typical for LBMA-accredited operations), designate trusted issuers for reserve attestation, and configure claim expiry to enforce re-attestation at appropriate intervals. An expired collateral claim will block further minting until a fresh attestation is issued, ensuring that stale reserve data cannot underwrite new token issuance.

## Storage and Custody Integration

### Warehouse Receipt Digitization

Physical commodity operations revolve around warehouse receipts, vault certificates, and chain-of-custody documentation. DALP's metadata schema system provides the infrastructure to digitize these records and bind them to tokenized assets.

Each precious metal token in DALP carries a configurable metadata schema that can capture commodity-specific attributes: bar serial numbers, assay certificate references, vault location identifiers, purity grades, weight specifications, and LBMA Good Delivery status. These metadata fields are defined at the asset template level with field-level mutability controls, meaning some fields (like bar serial number and assay reference) can be set as immutable after initial configuration, while others (like vault location, for transfers between facilities) can be updated through governed operations.

The metadata schema is not merely a label system. It is enforced at the platform level: when an operator creates a precious metal token through the Asset Designer, the wizard presents the metadata fields specific to that asset class, validates inputs in real time, and stores the structured data as part of the token's on-chain identity claims. This means the metadata is verifiable, auditable, and queryable through the same infrastructure that handles investor identity claims.

### Vault Operator API Integration

DALP is an API-first platform with typed REST APIs, webhooks, and SDK support for system integration. For commodity-backed tokens, this integration surface connects DALP to external vault management systems, custodian platforms, and logistics providers.

The integration pattern for vault operators follows DALP's standard approach: the vault management system publishes inventory updates through DALP's data feeds architecture (issuer-signed scalar feeds for reserve values, or direct API calls for discrete inventory events), while DALP's webhook system notifies external systems of on-chain events such as minting, burning, or transfer activity that may require corresponding updates in the vault's records.

DALP does not ship pre-built connectors for specific vault management systems or custodian platforms. Each vault operator integration is a project that uses DALP's API surface, and the integration scope depends on the specific ERP, warehouse management system, or custody platform in use. The platform provides the integration infrastructure (APIs, webhooks, feeds, event streams), but the connector logic between DALP and a specific vault's proprietary system is implementation-specific work.

### Chain-of-Custody Tracking

Every operation on a commodity-backed token in DALP generates an immutable audit trail entry. Minting, transfers, burns (redemptions), compliance checks, feed updates, and administrative changes are all recorded with timestamps, actor identities, and transaction hashes. This audit trail provides the evidential basis for chain-of-custody tracking from the point where a physical asset enters the tokenized ecosystem (minting against a verified reserve attestation) through its lifecycle as a digital asset to its eventual redemption or retirement (burn upon physical delivery or disposition).

The audit trail is indexed by DALP's custom indexer and exposed through PostgreSQL analytics views, enabling compliance officers to reconstruct the complete custody chain for any token at any point in its history. For commodity-backed tokens, this means an auditor can trace every change in ownership, verify that compliance checks passed at each transfer, confirm that collateral attestations were current at each mint event, and validate that the token's metadata has been consistently maintained.

## Delivery Versus Cash Settlement

### Physical Delivery Workflows

When a commodity-backed token holder initiates physical delivery (redemption of tokens for the underlying physical asset), the on-chain portion of the workflow is handled natively by DALP. The token holder initiates a redemption, compliance modules verify eligibility (identity claims, jurisdictional permissions, minimum holding periods if configured), and upon successful compliance verification, the tokens are burned. The burn event generates an auditable record linking the redeemed tokens to the holder's verified identity.

The logistics of physical delivery, however, are outside DALP's scope. Coordinating with the vault operator, arranging shipping and insurance, verifying delivery receipt, and updating warehouse records are operational processes that belong to the issuer's fulfillment workflow, not to the token platform. DALP's role in the delivery process ends at the compliance-verified burn; the platform provides the trigger event and the audit record, but does not manage physical logistics.

This boundary is important to understand clearly. DALP handles the token-side mechanics of redemption with full compliance enforcement and audit trails. The physical-side mechanics (allocation of specific bars, shipping coordination, insurance confirmation, delivery tracking) require integration with vault operations and logistics systems through DALP's API and webhook infrastructure. The issuer designs the end-to-end redemption workflow, with DALP providing the digital asset operations layer and external systems handling the physical operations layer.

### Cash Settlement Against Price Feeds

For commodity-backed tokens that support cash settlement (redemption at current market value rather than physical delivery), DALP's feeds architecture provides the pricing infrastructure. An issuer-signed scalar feed publishes commodity prices from authoritative sources, with EIP-712 signature verification ensuring data integrity. The feed supports multiple history modes: latest-only for real-time settlement pricing, bounded for sliding-window average calculations, and full history for complete price audit trails.

Cash settlement workflows use DALP's distribution and claims delivery mechanisms to calculate and execute payouts based on the feed-provided price at settlement time. The settlement amount is deterministic: token quantity multiplied by the feed price, less any configured fees (DALP's fee features support AUM fees, transaction fees, and external transaction fee accounting). The entire calculation is traceable through the on-chain record and the feed history.

### Mixed Settlement Models

Some commodity programs offer token holders a choice between physical delivery and cash settlement, often with minimum thresholds for physical delivery (for example, minimum one kilogram of gold for physical redemption, with smaller holdings redeemable only in cash). DALP supports this model through its configurable compliance and feature architecture: minimum redemption thresholds can be enforced through compliance module parameters, while the settlement method (physical or cash) is determined by the issuer's operational workflow, triggered by the same on-chain burn event but routed to different fulfillment paths based on the redemption request parameters.

## NAV Feeds and Price Data

### Precious Metals Pricing

DALP's data feeds architecture supports integration with precious metals pricing sources through the issuer-signed scalar feed mechanism. Price data from sources such as LBMA Gold Price fixings, Comex spot prices, or Reuters precious metals quotes can be published on-chain by authorized data providers, with each update cryptographically signed and verified before acceptance.

The feed system enforces data quality through several mechanisms:

**Staleness detection.** Feeds can be configured with expected update frequencies. When a feed has not received an update within its expected window, consumers (including compliance modules that reference pricing data) can detect the staleness and respond according to their configured risk tolerance. The platform does not impose a single staleness threshold across all feeds; instead, each consumer decides how to handle stale data, which reflects the reality that different operations have different freshness requirements.

**Drift allowance.** Each feed can be configured with a maximum permitted change between consecutive updates. If a submitted price exceeds the drift threshold relative to the previous value, the feed flags the submission as an outlier. This does not automatically reject the update (the price may genuinely have moved sharply), but it provides a signal that consumers can use to trigger additional verification before relying on the new value.

**Positive-value enforcement.** Commodity price feeds enforce positive values at the contract level, preventing erroneous negative price submissions from entering the system.

**History preservation.** The three history modes (latest-only, bounded, full) allow institutions to match their audit and reporting requirements to their storage preferences. For regulatory-grade commodity operations, the full history mode provides a complete, immutable record of every price submission, supporting both real-time operations and historical audit requirements.

### Update Frequency and Circuit Breakers

DALP's feed system provides the infrastructure for price monitoring but does not implement automated circuit breakers that pause platform operations based on price feed divergence. If an institution requires circuit breaker logic (pausing transfers when prices from multiple sources diverge beyond a threshold), this would be implemented as a custom compliance module or an orchestration layer that monitors feed values and triggers administrative actions (such as pausing the token) when divergence conditions are met.

The platform provides the building blocks for this pattern: feeds from multiple sources can be registered in the FeedsDirectory, the Chainlink aggregator adapter exposes feed data to external monitoring systems, and the token pause mechanism provides the administrative control to halt transfers when needed. The orchestration logic connecting these components is institution-specific and falls within the integration layer rather than the platform's native feature set.

### NAV Calculation for Commodity Funds

For commodity fund structures (pooled commodity exposure sold as fund units), DALP's NAV feed infrastructure supports the same patterns used for other fund types. The fund administrator calculates the NAV based on the underlying commodity values and publishes it through DALP's feed system. The NAV data flows through to the indexer for portfolio valuation, investor reporting, and cross-currency projections.

DALP does not perform NAV calculations internally. The platform consumes NAV values published by authorized parties and makes them available across the platform for valuation, reporting, and compliance purposes. This is the correct architectural separation: NAV calculation involves domain-specific knowledge (commodity valuation methodologies, storage cost allocation, insurance cost amortization) that belongs with the fund administrator, not the token platform.

## Compliance for Commodity-Backed Tokens

### Multi-Jurisdictional Commodity Regulations

Commodity-backed tokens face regulatory requirements that vary significantly by jurisdiction. DALP's composable compliance framework allows institutions to configure jurisdiction-specific rules without custom smart contract development:

**Country restrictions.** The country allow list and block list modules enforce jurisdictional boundaries. A gold-backed token distributed across Swiss, Singaporean, and UAE markets can configure country allow lists that permit transfers only to investors with identity claims from approved jurisdictions, while blocking transfers to sanctioned or unsupported countries.

**Investor eligibility.** The identity verification module's RPN expression system supports arbitrary combinations of claim checks. For a commodity platform operating under FINMA, MAS, and VARA regulations simultaneously, the compliance expression can require jurisdiction-specific claim combinations: Swiss investors might need KYC and AML and a FINMA-specific qualified investor claim, while Singapore investors need KYC and AML and MAS accredited investor verification.

**Transfer restrictions.** Holding periods (TimeLock module), transfer approval requirements, and investor count limits can all be configured per token. Institutional investors can be exempted from holding periods through the exemption expression system, while retail investors remain subject to the full restriction set.

**Supply controls.** The capped supply and token supply limit modules ensure that token issuance never exceeds the authorized amount, which for commodity-backed tokens should correspond to (or be less than) the verified physical reserves. The collateral module provides the additional enforcement layer that ties supply directly to attested reserves.

### LBMA and Commodity Standards

While DALP does not enforce LBMA Good Delivery standards at the protocol level (those are physical assay and quality standards), the platform's metadata schema system provides the infrastructure to record and verify LBMA-related attributes. Bar serial numbers, refinery marks, assay certificate references, and Good Delivery status can all be captured as structured metadata on the token, making them queryable and verifiable through the standard platform interfaces.

Integration with LBMA databases or other commodity standards bodies would follow DALP's standard API integration pattern: the standards body or its authorized agent publishes verification claims through DALP's trusted issuer infrastructure, creating on-chain attestations that the physical assets meet the relevant quality standards.

## DALP's Precious Metal Asset Class

DALP includes precious metals as a dedicated asset class within its Real World Asset category. The Asset Designer provides a purpose-built wizard for configuring precious metal tokens, with fields specific to this asset class: metal type, purity, weight denomination, vault location, and other commodity-specific parameters.

![DALP's Asset Designer supports Precious Metals as a dedicated asset class, enabling issuers to configure metal-backed tokens with commodity-specific parameters through a guided wizard.](../../shared/brand/dalp-screenshots/09 - Precious Metals/Precious Metal 1.png)

The precious metals listing view provides operators with a consolidated view of all precious metal tokens on the platform, including supply, compliance status, and operational metrics.

![The Precious Metals listing provides operators with a consolidated view of all metal-backed tokens, including supply tracking, compliance status, and key operational data.](../../shared/brand/dalp-screenshots/09 - Precious Metals/Precious Metals Listing.png)

The same lifecycle management capabilities that apply to all DALP asset types (minting, transfers, burns, compliance enforcement, audit trails, distribution scheduling) apply to precious metal tokens, with the addition of commodity-specific metadata and the collateral verification module for reserve backing enforcement.

## What DALP Provides and What Requires Integration

For clarity, the following table summarizes what DALP handles natively for commodity-backed tokens versus what requires external system integration:

| Capability | DALP Native | Integration Required |
|---|---|---|
| Token creation and configuration | Yes, via Asset Designer with precious metals asset class | — |
| Collateral ratio enforcement | Yes, on-chain compliance module | Attestation data from vault auditor |
| On-chain reserve attestation | Yes, via trusted issuer claims and identity infrastructure | Auditor issues claims based on physical verification |
| Price feeds (commodity pricing) | Yes, issuer-signed scalar feeds with signature verification | External price source publishes to DALP feed |
| NAV calculation | — | Fund administrator calculates; DALP consumes NAV feed |
| Compliance enforcement (KYC, AML, jurisdiction) | Yes, composable compliance modules | KYC provider issues identity claims |
| Physical delivery logistics | — | Vault operator, shipping, insurance coordination |
| Warehouse receipt metadata | Yes, configurable metadata schemas with mutability controls | Data sourced from vault management system |
| Audit trail and chain of custody | Yes, immutable on-chain records indexed for analytics | — |
| Automated circuit breakers | — | Custom orchestration monitoring feed divergence |
| Bar-level allocation tracking | — | Custom data structures for individual bar assignment |
| Vault management system integration | API surface available (REST, webhooks, SDKs) | Connector to specific ERP/WMS |
| Multi-source price reconciliation | Multiple feeds registrable in FeedsDirectory | Reconciliation logic is custom |
| Regulatory reporting | Audit trail data exportable via analytics views | Report formatting per jurisdiction |

This boundary clarity is essential for commodity tokenization projects. DALP provides the digital asset operations layer with full compliance enforcement, audit trails, and integration infrastructure. The physical asset operations layer (vault management, logistics, quality assurance) connects through DALP's API and feeds architecture but remains the responsibility of domain-specific operators and systems.
