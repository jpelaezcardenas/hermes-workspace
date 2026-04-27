# Commodities: DALP Coverage for Commodity-Backed Digital Assets

## Introduction

Minting a gold-backed token is straightforward. Proving that every token in circulation is backed by verified, audited physical reserves held in a specific vault, under a specific custody arrangement, with a specific quality attestation, and that this proof is enforced programmatically before every mint and transfer — that is where commodity tokenization becomes genuinely difficult. This is the "Complexity of Doing It Right" at its most tangible: the gap between a tokenization demo and a regulatory-grade commodity program that institutional investors, regulators, and auditors will trust.

Commodity-backed tokens carry requirements that purely financial instruments do not. Every token must reference a verifiable, auditable claim on a physical asset. Collateral must be provably sufficient before new tokens can be issued. Price data must flow from authoritative sources with integrity guarantees. Physical delivery and cash settlement must both be supported with clear operational boundaries. And all of this must work across multiple jurisdictions with different commodity trading regulations.

DALP addresses this complexity through its precious metals asset class, collateral verification modules, data feeds architecture, and composable compliance framework. Rather than leaving institutions to assemble these capabilities from point solutions and custom code, the platform provides a coherent infrastructure where backing verification, custody integration, settlement mechanics, and pricing all operate under a single compliance and governance layer.

This section details how each component supports the operational reality of commodity-backed digital assets, with clear boundaries between what the platform handles natively and what requires external integration.

## Backing Verification

### Why Backing Verification Is the Foundation

For a commodity program operator, the single most important question from investors, regulators, and auditors is the same: does the physical backing actually exist? Every other capability — trading, compliance, reporting — is secondary if the token's claim on physical assets cannot be proven. This is why DALP's collateral module sits at the compliance layer, not at the application layer: reserve verification is not an operational convenience, it is a regulatory prerequisite.

### The Collateral Module

The collateral compliance module enforces on-chain proof of reserves before minting operations proceed, ensuring that token supply never exceeds verified physical holdings. Operating within DALP's ERC-3643 framework, the module evaluates collateral sufficiency at mint time and reverts the transaction if backing is insufficient. There is no soft warning, no grace period, and no manual override path outside of the standard governance controls.

The module's configuration is precise and auditable. The collateral ratio is expressed in basis points: 10,000 basis points enforces 100% backing, while higher values enforce overcollateralization for risk buffers. A gold token program requiring 105% collateral coverage would configure 10,500 basis points, ensuring that five percent additional reserves exist before any new tokens can be minted. This configuration is set at deployment time and modifiable only through governed administrative operations requiring the governance role.

Collateral verification relies on identity claims issued by authorized attestation providers. The module is configured with a collateral claim topic and can reference additional trusted issuers specifically for reserve attestation. This architectural separation matters for commodity operations: the vault auditor who verifies physical reserves is registered as a trusted issuer authorized to issue collateral attestation claims, separate from the KYC/AML claim issuers. The entity verifying that gold bars exist in a Zurich vault should not need the same authorization scope as the entity verifying an investor's identity in Singapore.

### Attestation Workflows

The proof-of-reserve workflow connects physical audits to on-chain enforcement through a structured attestation pattern. A qualified third-party auditor inspects the physical reserves — vault inventory, warehouse receipts, assay certificates — and issues an attestation claim on-chain through DALP's trusted issuer infrastructure. The claim is cryptographically signed using EIP-712 typed data signatures, creating a tamper-evident record that links the auditor's identity, the attestation timestamp, and the verified reserve value.

This attestation is stored on the asset's OnchainID identity contract, which means it is not locked inside a proprietary system. Token holders, regulators, and secondary market participants can independently verify that an attestation exists, identify who issued it, and confirm when it was last updated, all without relying on the token issuer's representations. For commodity programs where investor confidence depends on transparent reserve verification, this open attestation model is a meaningful differentiator compared to opaque, issuer-controlled proof-of-reserve reports.

For ongoing reserve monitoring, DALP's issuer-signed scalar feed can publish reserve values at configured intervals. The three history modes serve different operational needs: latest-only for simple current-state verification, bounded for sliding-window analysis required by some regulatory frameworks, and full history for complete audit trails of every reserve update. The feed's drift allowance feature flags unexpected changes in reserve values, alerting operators to investigate potential discrepancies before they affect minting operations.

### The Boundary: Platform Enforcement vs. Physical Verification

DALP's collateral module verifies that on-chain attestations meet the configured ratio before allowing minting. It does not independently verify physical reserves — that responsibility belongs to the auditor or vault operator who issues the attestation claim. This is the correct architectural boundary: the platform provides the enforcement mechanism and the trust infrastructure, while physical verification remains with domain-specific experts who have physical access to the reserves.

Institutions deploying commodity-backed tokens should establish audit schedules (quarterly is typical for LBMA-accredited operations), designate trusted issuers for reserve attestation, and configure claim expiry to enforce re-attestation at appropriate intervals. An expired collateral claim blocks further minting until a fresh attestation is issued, ensuring that stale reserve data cannot underwrite new token issuance. This expiry-driven re-attestation cycle is how the platform keeps backing verification current without requiring real-time vault connectivity.

## Storage and Custody Integration

The backing verification layer proves that reserves exist. The custody integration layer tracks those reserves as they move, change, and are referenced throughout the token's lifecycle. Together, they provide the evidential chain that commodity-backed tokens require.

### Warehouse Receipt Digitization

Physical commodity operations revolve around warehouse receipts, vault certificates, and chain-of-custody documentation. For a commodity program operator, digitizing these records and binding them to tokenized assets eliminates the reconciliation burden that plagues paper-based or spreadsheet-tracked systems.

DALP's metadata schema system captures commodity-specific attributes on each precious metal token: bar serial numbers, assay certificate references, vault location identifiers, purity grades, weight specifications, and LBMA Good Delivery status. These metadata fields are defined at the asset template level with field-level mutability controls. Some fields — bar serial number, assay reference, refinery mark — are set as immutable after initial configuration, creating a permanent, tamper-evident record. Others — vault location, for transfers between facilities — can be updated through governed operations with full audit trail.

This metadata is not merely a label system. When an operator creates a precious metal token through the Asset Designer, the wizard presents metadata fields specific to that asset class, validates inputs in real time, and stores the structured data as part of the token's on-chain identity claims. The metadata is verifiable, auditable, and queryable through the same infrastructure that handles investor identity claims, meaning a single query interface serves both "who holds this token?" and "what physical asset does this token represent?"

### Vault Operator Connectivity

Connecting DALP to external vault management systems, custodian platforms, and logistics providers uses the platform's API-first architecture: typed REST APIs, webhooks, and SDK support for system integration.

The integration pattern for vault operators follows a bidirectional flow. Inbound: the vault management system publishes inventory updates through DALP's data feeds architecture (issuer-signed scalar feeds for reserve values, or direct API calls for discrete inventory events). Outbound: DALP's webhook system notifies external systems of on-chain events — minting, burning, or transfer activity — that may require corresponding updates in the vault's records.

Pre-built connectors for specific vault management systems or custodian platforms are not shipped with the platform. Each vault operator integration uses DALP's API surface, and the integration scope depends on the specific ERP, warehouse management system, or custody platform in use. The platform provides the integration infrastructure; the connector logic between DALP and a specific vault's proprietary system is implementation-specific work. This is a deliberate design choice: the diversity of vault management systems across the precious metals industry makes pre-built connectors impractical, while a well-documented API surface makes custom integration straightforward.

### Chain-of-Custody Audit Trail

Every operation on a commodity-backed token generates an immutable audit trail entry. Minting, transfers, burns, compliance checks, feed updates, and administrative changes are all recorded with timestamps, actor identities, and transaction hashes. This audit trail is indexed by DALP's custom indexer and exposed through PostgreSQL analytics views, enabling compliance officers and auditors to reconstruct the complete custody chain for any token at any point in its history.

For a commodity program, this means an auditor can trace every ownership change from initial minting (against a verified reserve attestation) through each transfer (with compliance verification at every step) to eventual redemption (compliance-verified burn). The audit trail also captures metadata changes, feed value submissions, and compliance module configuration updates, providing the complete operational history that regulated commodity programs require for regulatory examination.

## Delivery Versus Cash Settlement

Backing verification proves the asset exists. Custody integration tracks it. Settlement is how token holders realize the value of their position, either by taking physical delivery of the underlying commodity or by receiving cash equivalent at market price. Both paths carry distinct operational requirements, and the boundary between what DALP handles and what requires external coordination is important to understand clearly.

### Physical Delivery Workflows

When a token holder initiates physical delivery, the on-chain portion of the workflow is handled natively. The holder initiates a redemption, compliance modules verify eligibility (identity claims, jurisdictional permissions, minimum holding periods if configured), and upon successful verification, the tokens are burned. The burn event generates an auditable record linking the redeemed tokens to the holder's verified identity.

The logistics of physical delivery — coordinating with the vault operator, arranging shipping and insurance, verifying delivery receipt, and updating warehouse records — are outside the platform's scope. These operational processes belong to the issuer's fulfillment workflow. The platform provides the trigger event (compliance-verified burn with full audit record) and the integration infrastructure (webhooks to notify vault systems, API endpoints for status updates), but does not manage physical logistics.

This boundary reflects a deliberate architectural decision. Physical delivery logistics vary enormously by commodity type, vault operator, jurisdiction, and client relationship. A platform that attempted to embed logistics coordination would either be too rigid for real-world operations or too complex to maintain. By providing clean trigger events and integration points, DALP allows each commodity program to design fulfillment workflows that match their specific operational reality.

### Cash Settlement Against Price Feeds

For commodity-backed tokens that support cash settlement, DALP's feeds architecture provides the pricing infrastructure. An issuer-signed scalar feed publishes commodity prices from authoritative sources (LBMA fixings, exchange spot prices, dealer quotes) with EIP-712 signature verification ensuring data integrity and provenance.

The settlement workflow uses the feed-provided price at settlement time to calculate the payout: token quantity multiplied by the verified price, less any configured fees. DALP's fee features support multiple fee types (AUM fees, transaction fees, external transaction fee accounting), and the entire calculation is traceable through the on-chain record and the feed history. For an investor redeeming 100 ounces of tokenized gold, the settlement amount is deterministic and auditable: the exact price feed value used, the fee deductions applied, and the net payout are all recorded.

The feed system's history modes are particularly relevant for cash settlement. Institutions that settle at a specific daily fixing (such as the LBMA Gold Price AM or PM fixing) can publish that specific value as the feed update, while the bounded or full history mode preserves the complete record of all published prices for audit purposes.

### Mixed Settlement Models

Some commodity programs offer token holders a choice between physical delivery and cash settlement, typically with minimum thresholds for physical delivery. A gold program might require minimum one kilogram for physical redemption, with smaller holdings redeemable only in cash. DALP supports this through its configurable compliance and feature architecture: minimum redemption thresholds can be enforced through compliance module parameters, while the settlement method is determined by the issuer's operational workflow, triggered by the same on-chain burn event but routed to different fulfillment paths based on the redemption request.

## NAV Feeds and Price Data

### Precious Metals Pricing Infrastructure

Reliable, verifiable price data underpins every aspect of a commodity-backed token program: collateral valuation, settlement calculations, portfolio reporting, and investor communications. For commodity program operators, the critical requirement is not just having a price — it is proving where the price came from, that it was not tampered with, and that it was current when used.

DALP's data feeds architecture addresses this through the issuer-signed scalar feed mechanism. Price data from authoritative commodity sources is published on-chain by authorized data providers, with each update cryptographically signed (EIP-712) and verified at the contract level before acceptance. Invalid signatures are rejected on-chain, and every accepted price update creates an immutable record of the value, the provider, and the timestamp.

The feed system enforces data quality through several mechanisms. **Staleness detection** allows each consumer to assess feed freshness against its own requirements — a compliance module checking collateral adequacy may apply a stricter freshness threshold than a portfolio reporting view. **Drift allowance** flags price movements that exceed a configured percentage change from the previous value, signaling potential data quality issues without automatically rejecting legitimate market movements. **Positive-value enforcement** prevents erroneous negative price submissions at the contract level.

### What About Automated Circuit Breakers?

Some commodity trading platforms implement automated circuit breakers that pause trading when price feeds from multiple sources diverge beyond a threshold. DALP does not ship automated circuit breakers as a native feature. The platform provides the building blocks: feeds from multiple sources can be registered in the FeedsDirectory, the Chainlink aggregator adapter exposes feed data to external monitoring systems, and the token pause mechanism provides the administrative control to halt transfers when needed. The orchestration logic connecting these components — monitoring multiple feeds, detecting divergence, and triggering the pause — is institution-specific and falls within the integration layer.

For institutions that require this capability, the pattern is clear: deploy multiple feeds from independent pricing sources, build monitoring logic that compares their values, and trigger DALP's token pause API when divergence exceeds the institution's risk tolerance. The platform does not prescribe the divergence threshold or the monitoring frequency because these parameters vary by commodity, market conditions, and institutional risk appetite.

### NAV Calculation for Commodity Funds

For commodity fund structures (pooled commodity exposure sold as fund units), the fund administrator calculates the NAV based on underlying commodity values, storage costs, insurance, and management fees, then publishes it through DALP's feed system. The platform does not perform NAV calculations internally — this is the correct architectural separation because NAV calculation involves domain-specific knowledge (commodity valuation methodologies, storage cost allocation, insurance amortization) that belongs with the fund administrator.

Once published, NAV data flows through the indexer for portfolio valuation, investor reporting, and cross-currency projections via DALP's fiat value views. Investors see their holdings valued in their preferred currency without requiring separate valuation infrastructure.

## Compliance for Commodity-Backed Tokens

### Composing a Multi-Jurisdictional Compliance Posture

Commodity-backed tokens distributed across multiple jurisdictions face a compliance challenge that most tokenization platforms handle poorly: different jurisdictions impose different investor eligibility requirements, different reporting obligations, and different transfer restrictions, and all of them must be enforced simultaneously on the same token. Unlike custom-assembled approaches where each regulatory requirement demands new smart contract code, DALP's composable compliance framework allows institutions to configure jurisdiction-specific rules from pre-audited modules.

A gold-backed token distributed across Swiss, Singaporean, and UAE markets illustrates the pattern. Country allow list modules restrict transfers to investors with identity claims from approved jurisdictions. The identity verification module's RPN expression system enforces jurisdiction-specific claim requirements: Swiss investors satisfy FINMA qualified investor criteria, Singapore investors satisfy MAS accredited investor requirements, UAE investors meet VARA compliance standards — all encoded as claim topic expressions without custom development.

Transfer restrictions layer on top of eligibility: holding periods through the TimeLock module, transfer approval requirements for retail investors (with institutional exemptions via the exemption expression system), and investor count limits that exclude institutional investors from retail caps. Supply controls through the capped supply module ensure token issuance stays within the authorized amount, while the collateral module ties supply directly to attested reserves.

This composable approach means adding a fourth jurisdiction does not require a new smart contract. The institution configures additional country codes, defines the claim expression for that jurisdiction's investor eligibility requirements, and the existing compliance infrastructure enforces the new rules alongside the existing ones.

### LBMA and Commodity Standards Integration

DALP does not enforce LBMA Good Delivery standards at the protocol level — those are physical assay and quality standards that require physical inspection. The platform's metadata schema system records and makes queryable LBMA-related attributes: bar serial numbers, refinery marks, assay certificate references, and Good Delivery status. Integration with LBMA databases or other commodity standards bodies follows the standard API integration pattern: the standards body or its authorized agent publishes verification claims through DALP's trusted issuer infrastructure, creating on-chain attestations of quality compliance.

## Visual Evidence: DALP's Precious Metal Capabilities

DALP includes precious metals as a dedicated asset class within its Real World Asset category. The Asset Designer provides a purpose-built wizard for configuring precious metal tokens, with fields specific to this asset class.

![DALP's Asset Designer supports Precious Metals as a dedicated asset class, enabling issuers to configure metal-backed tokens with commodity-specific parameters through a guided configuration wizard.](../../shared/brand/dalp-screenshots/09 - Precious Metals/Precious Metal 1.png)

The precious metals listing view provides operators with a consolidated view of all precious metal tokens on the platform, with supply tracking and compliance status at a glance.

![The Precious Metals listing provides operators with a consolidated view of all metal-backed tokens, including supply tracking, compliance status, and key operational data.](../../shared/brand/dalp-screenshots/09 - Precious Metals/Precious Metals Listing.png)

DALP's compliance and policy template library provides pre-configured compliance module combinations for common regulatory scenarios, reducing the configuration effort for commodity programs operating under recognized frameworks.

![DALP's compliance module library provides configurable policy templates for common regulatory scenarios, enabling commodity program operators to compose multi-jurisdictional compliance postures from pre-audited modules.](../../shared/brand/dalp-screenshots/11 - Compliance and Policy Templates/Compliance and Policy Templates.png)

## Capability Summary

| Capability | DALP Native | Integration Required |
|---|---|---|
| Token creation and configuration | Yes, via Asset Designer with precious metals asset class | — |
| Collateral ratio enforcement | Yes, on-chain compliance module with basis-point precision | Attestation data from vault auditor |
| On-chain reserve attestation | Yes, via trusted issuer claims with EIP-712 signature verification | Auditor issues claims based on physical verification |
| Price feeds (commodity pricing) | Yes, issuer-signed scalar feeds with drift detection and history modes | External price source publishes to DALP feed |
| NAV calculation | — | Fund administrator calculates; DALP consumes NAV feed |
| Compliance enforcement (KYC, AML, jurisdiction) | Yes, composable compliance modules with RPN expressions | KYC provider issues identity claims |
| Physical delivery logistics | — | Vault operator, shipping, insurance coordination |
| Warehouse receipt metadata | Yes, configurable metadata schemas with immutability controls | Data sourced from vault management system |
| Audit trail and chain of custody | Yes, immutable on-chain records indexed for SQL analytics | — |
| Automated circuit breakers | — | Custom orchestration monitoring feed divergence; building blocks provided |
| Bar-level allocation tracking | — | Custom data structures for individual bar-to-holder assignment |
| Vault management system integration | API surface available (REST, webhooks, SDKs) | Connector logic to specific ERP/WMS |
| Multi-source price reconciliation | Multiple feeds registrable in FeedsDirectory | Reconciliation and divergence logic is custom |
| Regulatory reporting | Audit trail data exportable via PostgreSQL analytics views | Report formatting per jurisdiction |

This capability boundary is not a limitation disclosure — it is a trust signal. Institutions evaluating commodity tokenization platforms should be wary of vendors that claim to handle everything from minting to physical delivery from a single platform. The operational reality of commodity-backed tokens requires integration between digital asset operations and physical asset operations. DALP provides the digital asset layer with full compliance enforcement, audit trails, and integration infrastructure. The physical asset layer connects through well-documented APIs and event streams, with the integration scope defined by the institution's specific vault operations and logistics requirements.
