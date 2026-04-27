# SettleMint Response to RemitLink Consortium RFI: Cross-Border Remittance Settlement Infrastructure

---

## Cover Letter

RemitLink Consortium
Procurement Office

**Re: RFI RLC-2026-RFI-003, Cross-Border Remittance Settlement Infrastructure**

SettleMint welcomes the opportunity to respond to the RemitLink Consortium's Request for Information regarding shared settlement infrastructure for the GCC-to-South Asia remittance corridor.

The challenges described in this RFI are familiar territory for SettleMint. Bilateral nostro/vostro arrangements create capital inefficiency because every participant must pre-fund balances with every counterparty, and the resulting T+1 to T+3 settlement windows compound both liquidity cost and counterparty risk. RemitLink's ambition to replace this fragmented settlement topology with a shared, near-real-time layer directly aligns with the capabilities of DALP, SettleMint's Digital Asset Lifecycle Platform.

DALP is purpose-built for regulated financial market infrastructure. It provides atomic Delivery-versus-Payment settlement, multi-currency digital asset management, configurable compliance enforcement across jurisdictions, and the operational tooling that institutional deployments require. SettleMint has operated DALP in production at regulated banks for over seven years, including deployments in the Middle East and Asia where multi-jurisdictional compliance, high availability, and integration with existing payment infrastructure are baseline requirements.

This response addresses each section of the RFI in order, with honest capability assessments and clear identification of where DALP provides native functionality, where integration with external providers is required, and where the Consortium's own operational decisions will shape the solution architecture. SettleMint is a platform company, not a consulting firm or financial operator. DALP provides the infrastructure; the Consortium and its chosen integrators build the business on top.

We look forward to the opportunity to discuss this response in detail and to support RemitLink's evaluation of the shared settlement architecture that can transform this corridor.

[Signatory placeholder]

---

## About DALP

DALP (Digital Asset Lifecycle Platform) is SettleMint's infrastructure for designing, launching, and operating tokenized assets under regulation. Unlike platforms that focus on a single slice of the digital asset stack, DALP covers five integrated lifecycle pillars: **Create** (asset structuring and issuance), **Comply** (ex-ante compliance enforcement through configurable modules), **Custody** (bring-your-own-custodian integration with institutional custody providers), **Settle** (atomic DvP and XvP settlement with deterministic closure), and **Service** (ongoing corporate actions, distributions, monitoring, and operations).

For RemitLink's use case, DALP's stablecoin asset class provides the foundation for multi-currency digital representations, while the compliance module system enforces jurisdiction-specific AML/CFT rules before any settlement executes. The XvP settlement engine handles multi-party, multi-currency settlement with atomicity guarantees, and the platform's API-first architecture enables integration with national payment switches and existing banking rails.

| Lifecycle Pillar | RemitLink Relevance |
| --- | --- |
| Create | Mint fiat-pegged digital currencies for each corridor currency |
| Comply | Enforce six-jurisdiction AML/CFT rules before settlement |
| Custody | Integrate with Consortium-designated custody arrangements |
| Settle | Atomic multi-currency settlement replacing nostro/vostro |
| Service | Ongoing monitoring, reconciliation feeds, regulatory reporting data |

DALP supports seven pre-built asset classes (bonds, equities, funds, stablecoins, deposits, real estate, precious metals) plus a configurable token for custom instruments. The stablecoin asset class, with controlled minting/burning and policy-based compliance, maps directly to RemitLink's requirement for fiat-pegged digital currency representations.

What differentiates DALP from fragmented point-solution stacks is that every operation, from currency minting to compliance verification to settlement execution, flows through a single typed API with consistent authentication, audit trails, and error handling. Institutions do not assemble separate tools and reconcile between them; they operate on a unified platform where compliance, settlement, and operations are architecturally integrated.

---

## Company Overview

### Who SettleMint Is

SettleMint is the digital asset lifecycle platform company for regulated financial markets and sovereign use cases. Founded in 2016, the company has maintained a singular focus on blockchain infrastructure for enterprises and regulated institutions for nearly a decade. SettleMint is not a cryptocurrency platform, not a trading venue, and not a general-purpose blockchain vendor. The company builds and operates DALP for financial institutions, market infrastructure providers, and sovereign entities that require production-grade tokenization infrastructure with compliance and governance built in from the first line of architecture.

### Production Credentials

SettleMint has operated DALP in continuous production at regulated banks in Asia and Europe for over seven years. These are not pilot programs or proof-of-concept deployments. They are business-critical systems running asset issuance, lifecycle management, and high-volume transactional flows under institutional SLAs with uptime requirements. The platform has passed security reviews, penetration testing, and vendor risk assessments typical of tier-1 and tier-2 financial institutions.

Active deployments span bonds, equities, deposits, stablecoins, real estate, funds, and precious metals. National-scale programs in the Middle East, including real estate tokenization and sovereign-backed capital markets infrastructure, demonstrate the platform's capacity for sovereign-grade deployment.

| Metric | Value |
| --- | --- |
| Founded | 2016 |
| Headquarters | Europe |
| Operating Regions | Europe, MENA, Asia-Pacific |
| Production Track Record | 7+ years continuous operation at regulated banks |
| Certifications | ISO 27001, SOC 2 Type II |
| Target Segments | Financial institutions, sovereign entities, market infrastructure |
| Asset Classes Deployed | Bonds, equities, deposits, stablecoins, real estate, funds, precious metals |

### Regulatory Readiness

DALP embeds compliance into the platform architecture rather than treating it as a bolt-on layer. The ERC-3643 standard provides the foundation for compliant token transfers, with OnchainID enabling verifiable on-chain identity for every participant. Configurable compliance modules support rule sets aligned to MiCA (EU), Regulation D/S (US), MAS frameworks (Singapore), FCA requirements (UK), and GCC regulatory environments. For RemitLink's six-jurisdiction corridor, DALP's compliance module system enables distinct rule configurations per jurisdiction, evaluated before every settlement transaction executes.

---

## Section A: Settlement Infrastructure

### A.1: Multi-Currency Settlement

🟢 **Native capability with configuration**

Representing six fiat currencies as digital tokens on a shared settlement layer requires controlled minting, burning, and supply transparency, exactly the capabilities that DALP's stablecoin asset class delivers. Each of the six corridor currencies (USD, AED, SAR, INR, PKR, BDT) would be configured as a separate stablecoin token, each with its own minting authority, burning rules, and compliance module set.

**Minting and burning.** DALP's stablecoin implementation enforces controlled supply management. Designated minting authorities (in this case, the Consortium's treasury function or a designated central counterparty) hold exclusive permission to mint new tokens, while burning occurs when tokens are redeemed against fiat reserves. The minting and burning operations are auditable, with every supply change recorded on-chain and reflected in real-time supply monitoring dashboards. The platform enforces paused-by-default behavior for newly created assets, ensuring that no tokens circulate until all compliance modules are configured and activated.

**Peg maintenance.** DALP does not perform algorithmic peg maintenance (it is not a stablecoin protocol in the DeFi sense). Instead, the peg is maintained through operational discipline: the Consortium's treasury function ensures that fiat reserves match outstanding token supply, and DALP provides the transparency tools to verify this at any time. The platform's collateral verification module can enforce supply caps that prevent minting beyond verified reserve levels, and real-time dashboards display total minted, burned, and circulating supply across all participants. This operational peg model is appropriate for consortium-controlled settlement currencies where the backing is institutional, not algorithmic.

**Multi-currency architecture.** Each currency operates as an independent token with its own compliance configuration, supply controls, and participant access rules. Settlement transactions that cross currencies (the core remittance use case) are handled through the XvP settlement engine, which coordinates atomic multi-currency exchanges. A single DALP deployment can manage all six currencies, with multi-tenancy controls ensuring appropriate access boundaries between Consortium members.

### A.2: Settlement Finality

🟢 **Native capability**

Every settlement on DALP is atomic: the source currency debit and the destination currency credit either both complete or both revert. The XvP (Exchange-versus-Payment) settlement engine enforces this invariant at the smart contract level, eliminating the counterparty risk that arises when one leg settles before the other. For a remittance corridor processing USD 2.8 billion monthly, this guarantee means the Consortium never faces a state where funds have left one participant but not arrived at another.

The V3 net settlement architecture computes each participant's net position across all flows in a settlement batch. Parties that are net receivers of a currency do not need to lock tokens for that currency, reducing capital lockup during the approval window. Settlement execution includes a built-in safety invariant: if any currency's net flows do not sum to zero, the entire settlement reverts, preventing partial or inconsistent execution.

Settlement finality is determined by the underlying blockchain's confirmation model. On a permissioned EVM network (which SettleMint would recommend for this use case), block finality is typically achieved within seconds of transaction inclusion, meaning settlement finality from submission to confirmation is measured in seconds, not hours or days. The exact timing depends on the network's block time and consensus configuration, both of which are configurable in a permissioned deployment.

For cross-border settlements involving participants on different network segments, DALP's V3 settlement retains HTLC (hash time-locked contract) coordination. Once all local parties approve a settlement with external flows, unilateral cancellation is blocked, and cancellation requires unanimous consent. This prevents one party from unwinding a settlement that counterparties on another network segment have already committed to.

### A.3: Liquidity Pool Management

🟡 **Partial: platform provides building blocks; pool management logic requires configuration**

DALP provides the infrastructure components that a liquidity management layer requires, but does not ship a purpose-built liquidity pool management module with pre-funded position tracking, automatic rebalancing, or insufficient-liquidity alerting as an out-of-the-box feature.

**What DALP provides natively.** Each participant's token balance across all six currencies is visible in real time through the platform's dashboards, API, and CLI. The XvP settlement engine verifies sufficient balances before executing settlement, and settlements that would exceed available balances revert atomically. The platform's data feed integration can consume external data (including pool balance thresholds) and the compliance module system can enforce minimum balance requirements per participant.

**What requires configuration or integration.** The liquidity pool management workflow, meaning how participants pre-fund their positions (converting fiat to digital currency via the Consortium's treasury), how rebalancing is triggered when a participant's position in one currency runs low, and how alerts fire when liquidity approaches critical thresholds, would be implemented as operational workflows on top of DALP's API surface. The durable execution engine supports scheduled monitoring tasks and conditional logic, providing the runtime for these workflows. The Consortium would define the liquidity management rules; DALP provides the execution infrastructure and the real-time balance data to drive those rules.

**Insufficient liquidity handling.** If a settlement batch includes flows that exceed a participant's available balance, the settlement reverts atomically. No partial execution occurs. The operational workflow layer would detect approaching insufficiency before settlement submission and trigger pre-funding or rebalancing actions.

### A.4: Throughput Capacity

🟡 **Architecture supports high throughput; specific targets are network-dependent**

The Consortium's requirement of 2,500 sustained transactions per second during peak periods is a function of both the DALP application layer and the underlying blockchain network configuration. These are separate concerns with different scaling characteristics.

**DALP application layer.** DALP's transaction processing pipeline is designed for institutional throughput. The chunked batch orchestration model handles large-scale operations (thousands of settlements in a batch) by splitting them into child transactions, each processed through the durable execution pipeline with idempotency guarantees. The confirmation watcher processes up to 250 transactions per polling cycle at 1-second intervals per chain, and the pipeline's async architecture (with HTTP 202 responses and status polling) prevents API blocking during high-volume periods. The API surface supports rate limits of 10,000 requests per 60-second window per key, with configurable per-key limits for high-volume consumers.

**Blockchain network layer.** On a permissioned EVM network, throughput depends on block gas limits, block time, transaction complexity, and validator node performance. A Hyperledger Besu or Polygon Edge network configured for this use case can be tuned for high throughput by adjusting block gas limits and block intervals. Stablecoin transfer transactions are relatively lightweight in gas terms compared to complex smart contract interactions, which works in the Consortium's favor.

**Honest assessment.** Achieving 2,500 sustained TPS requires careful network sizing, infrastructure specification, and load testing specific to the Consortium's transaction profile. SettleMint would recommend a dedicated performance engineering engagement during the platform deployment phase to validate throughput targets against the actual transaction mix, network configuration, and infrastructure. DALP has been load-tested in institutional environments, but claiming a specific TPS number without knowing the exact network topology, transaction complexity, and infrastructure specification would be misleading.

### A.5: Settlement Reconciliation

🟡 **Partial: DALP provides the data; reconciliation logic requires integration**

DALP maintains a complete, immutable record of every settlement transaction, including all approvals, state transitions, and final execution details. The platform's blockchain event indexer processes all on-chain events into queryable read models with sub-5-second latency, and the API exposes full transaction history, settlement status, and balance data programmatically.

**What DALP provides for reconciliation.** Every settlement is recorded with participant identities, currency amounts, timestamps, and deterministic status (executed, cancelled, or expired-withdrawn). The API surface enables external reconciliation systems to query settlement records by date range, participant, currency, or status. The SDK and webhook integrations enable real-time event-driven feeds to downstream systems. ISO 20022 message compatibility supports structured data exchange with banking rails.

**What requires integration.** Reconciling DALP's on-platform settlement records against participants' existing nostro/vostro accounts and national payment switch records is an integration task. The DALP side of the reconciliation is definitive (the on-chain record is the source of truth for on-platform settlements), but matching those records to off-platform banking system entries requires either middleware or the Consortium's existing reconciliation infrastructure. DALP's API provides the data export surface; the reconciliation engine itself sits outside the platform.

---

## Section B: Foreign Exchange

### B.1: FX Rate Feed Integration

🟡 **Partial: data feed infrastructure exists; FX-specific features require configuration**

DALP includes a data feeds module that can consume external price and rate data. The platform supports configurable feed sources with update frequency controls and staleness detection (the system can alert when a feed has not updated within a defined threshold).

For RemitLink's FX requirements, external FX rate providers (Reuters/Refinitiv, Bloomberg, central bank reference rates, or specialized remittance corridor FX providers) would publish rates to DALP through the feed integration surface. The platform can consume multiple rate sources, and staleness detection would flag feeds that have not updated within a configured interval during market hours.

**What DALP does not provide natively.** DALP is not an FX pricing engine. It does not calculate cross-rates, perform rate arbitrage analysis, or maintain an order book for currency conversion. The FX rate data flows into the platform as external feeds; the business logic for selecting rates, calculating spreads, and managing FX risk would be implemented by the Consortium or its designated FX provider. DALP provides the infrastructure to store, distribute, and timestamp rate data; it does not replace a treasury management system.

### B.2: FX Rate Locking

🟡 **Architecture supports rate locking; requires workflow implementation**

Rate locking for individual remittance transactions is a workflow pattern that DALP's settlement architecture supports but does not ship as a pre-built feature. The pattern works as follows: when a remittance is initiated, the current FX rate is captured from the feed and recorded as a parameter of the settlement transaction. The XvP settlement engine executes the settlement at the locked rate, exchanging the exact amounts specified. Because settlement is atomic, the locked rate is enforced through execution: the source and destination amounts are fixed at the time of settlement creation, and any subsequent rate movement is irrelevant to the already-committed settlement.

The gap is in the orchestration: capturing the rate at initiation time, calculating the converted amounts, and creating the settlement transaction with those fixed amounts. This workflow logic would be implemented on DALP's API surface, using the durable execution engine for reliability.

### B.3: FX Volatility Circuit Breakers

🟡 **Partial: monitoring infrastructure exists; automated circuit breakers require custom orchestration**

DALP's feed module supports staleness detection, which can identify when FX rate feeds are stale or unavailable. Extending this to detect rate divergence between multiple sources or extreme volatility (rate movements exceeding a configured threshold) is architecturally feasible using the platform's scheduled task capabilities and feed comparison logic.

However, automated circuit breakers that pause settlement operations based on FX volatility triggers are not a shipped feature. The platform can be configured to pause operations (the pause/unpause lifecycle control exists at the asset level), but the trigger logic, meaning the decision engine that determines when volatility has crossed a threshold and pauses settlement activity, would be implemented as a custom workflow. DALP provides the control surfaces (pause settlement, alert operators, block new submissions); the volatility detection logic and threshold configuration are operational decisions that sit outside the platform's pre-built capabilities.

---

## Section C: Compliance and Regulatory

### C.1: Multi-Jurisdiction AML/CFT Compliance

🟢 **Native capability**

Compliance enforcement in DALP operates ex-ante: every transaction is validated against eligibility rules, identity claims, and jurisdictional constraints before execution, not reviewed afterward. This distinction matters for regulated remittance operations because a non-compliant transaction that executes and then gets flagged creates an immutable on-chain record of a violation. DALP prevents that scenario entirely by blocking non-compliant transactions before they reach the blockchain.

For RemitLink's six-jurisdiction corridor, the compliance module system enables distinct rule configurations per jurisdiction. DALP's compliance architecture supports 18 compliance module types across six categories: eligibility restrictions, transfer controls, issuance and supply constraints, time-based rules, settlement and collateral rules, and identity verification requirements. These modules compose through fail-closed AND logic, meaning a transaction must pass every active module to proceed.

**Jurisdiction-specific configuration.** Each participant MTO can have jurisdiction-specific compliance modules bound to their operations. A UAE-licensed MTO operates under UAE Central Bank AML requirements; an India-licensed MTO operates under RBI requirements. When a settlement crosses jurisdictions (a UAE-originated remittance settling in India), both the originating and destination jurisdiction compliance modules evaluate the transaction. DALP does not resolve conflicts between jurisdictions; rather, it enforces all applicable rules, and the most restrictive rule prevails (fail-closed design). The Consortium would define the compliance rule mapping for each jurisdiction; DALP enforces the configured rules at execution time.

**Identity-based enforcement.** OnchainID provides verifiable, on-chain identities for every participant, with claim-based verification (KYC/KYB credentials, licensing status, jurisdictional eligibility). Claims are checked at the time of every transaction, not just at onboarding. If a participant's license status changes or a credential expires, the compliance module blocks transactions involving that participant until the credential is renewed.

### C.2: Sanctions Screening

🟡 **Partial: integration architecture, not native screening**

DALP does not perform real-time sanctions list screening (OFAC, EU, UN, or local lists) as a native platform feature. Sanctions screening is a specialized function that requires continuously updated list data, fuzzy name matching, and jurisdictionally calibrated scoring, capabilities that dedicated sanctions screening providers (such as Refinitiv World-Check, Dow Jones Risk & Compliance, or ComplyAdvantage) deliver as their core product.

DALP's role in the sanctions screening workflow is as the enforcement layer. The platform's compliance modules can be configured to require a valid sanctions clearance claim (issued by an external screening provider) before any transaction involving a given participant is executed. The integration pattern is: the external sanctions screening provider evaluates participants and issues clearance claims through DALP's identity system (OnchainID). DALP's compliance module checks for the presence and validity of that claim before permitting settlement. If a claim is revoked or expired, DALP blocks the transaction.

This separation of concerns, screening by a specialist provider and enforcement by the platform, is the correct architecture for regulated financial infrastructure. It ensures that the Consortium uses best-of-breed screening while DALP enforces the screening outcome with on-chain certainty.

### C.3: Transaction Monitoring

🟡 **Partial: audit data provided; pattern detection requires integration**

DALP provides the complete audit trail data that transaction monitoring systems require: every transaction with sender, recipient, amount, currency, timestamp, and settlement context. The platform's event indexer processes all on-chain events into queryable models, and the API exposes this data programmatically for real-time or batch consumption.

However, suspicious transaction pattern detection (structuring, velocity analysis, geographic anomalies, behavioral profiling) is not a native DALP feature. These are capabilities provided by dedicated transaction monitoring platforms (Chainalysis, Elliptic, NICE Actimize, or similar). DALP's integration surface enables these platforms to consume transaction data in real time via webhooks or API polling, perform their analysis, and feed results back into DALP's compliance system as claims or flags.

STR (Suspicious Transaction Report) generation and routing to the appropriate FIU in each jurisdiction is a function of the transaction monitoring provider and the Consortium's compliance operations team, not the settlement platform. DALP provides the evidentiary data; the reporting obligation sits with the licensed MTO and its compliance function.

### C.4: Regulatory Reporting

🟡 **Partial: data export, not jurisdiction-specific report generation**

DALP provides complete audit trail data and full transaction history that forms the basis for regulatory reports. The API surface exposes all settlement records, participant activity, compliance decisions, and identity verification events in structured, queryable formats. The platform's indexer maintains 18+ analytics views providing pre-aggregated reporting data across five domains.

However, DALP does not generate jurisdiction-specific regulatory filing documents. UAE Central Bank suspicious transaction reports, SAMA regulatory filings, RBI reporting formats, SBP compliance returns, and Bangladesh Bank reporting templates are all jurisdiction-specific document formats with their own schemas, submission protocols, and filing deadlines. Generating these documents from DALP's underlying data is a reporting layer task, typically handled by the Consortium's compliance reporting system or a regulatory technology (RegTech) provider.

DALP's value in this chain is providing clean, complete, and timely source data. Every transaction, compliance decision, identity verification, and settlement event is recorded with the granularity and auditability that regulators expect. The last-mile formatting into jurisdiction-specific report templates sits outside the platform scope.

### C.5: Audit Trail

🟢 **Native capability**

DALP provides a complete, immutable audit trail for every operation on the platform. Every token mint, burn, transfer, and settlement is recorded on-chain with full provenance. The platform's event indexer projects this data into queryable read models, and the API provides programmatic access to the full audit history.

The audit trail captures: who initiated the action (authenticated identity), what operation was performed, when it occurred (block timestamp and application timestamp), the compliance modules that evaluated the transaction (and their outcomes), the settlement context (if part of a settlement batch), and the final state. Every state transition in the 11-state transaction pipeline is recorded, providing a complete chain of custody from transaction submission through final confirmation.

For regulatory examination purposes, the Consortium can provide regulators with read-only API access or data exports covering any time period, participant, currency, or transaction type. The blockchain itself serves as an additional source of truth that is independently verifiable, meaning the audit trail is not solely dependent on the platform's database layer.

---

## Section D: Participant Management

### D.1: Participant Onboarding

🟢 **Native capability**

DALP's identity and access management system supports structured participant onboarding with configurable verification requirements. For Consortium MTOs, the onboarding workflow would include:

**Identity registration.** Each MTO is registered as an organization entity in DALP, with its OnchainID populated with verifiable claims: business registration, regulatory license status per jurisdiction, AML/CFT certification, and authorized signatories. The identity registry maps wallet addresses to verified identities, ensuring every on-chain action is traceable to a known, verified participant.

**Tiered verification.** DALP supports configurable KYC/KYB tiers. For MTOs joining the Consortium, the platform can enforce enhanced due diligence requirements (license verification, financial standing, ownership structure, UBO identification) as prerequisites before granting settlement access. The claim issuance and review workflow includes request, review, approve/reject/request-update paths, with full audit trail.

**Role assignment.** DALP's role-based access control system assigns permissions at both the platform and per-asset level. An MTO might receive settlement participant permissions for specific currency pairs while being restricted from minting authority, which remains with the Consortium's central treasury function.

**Invitation-gated enrollment.** Participant onboarding is invitation-gated, meaning new MTOs cannot self-register. The Consortium's governance function controls who is invited, and the platform enforces membership boundaries. Active organization access is membership-gated, so participants can only operate within organizations they belong to.

### D.2: Credit Risk Management

🟡 **Partial: compliance infrastructure supports limits; credit risk logic requires configuration**

DALP's compliance module system can enforce transfer limits and balance requirements per participant, which provides the building blocks for credit risk management. The platform's country restriction and transfer limit modules can be configured to cap individual transaction sizes, daily settlement volumes, or outstanding exposure per participant.

However, a full credit risk management framework with real-time counterparty exposure calculation, dynamic margin calls, and collateral posting workflows is not a shipped feature. The Consortium would need to define its credit risk model (bilateral limits, multilateral netting, collateralization rules) and implement the monitoring and enforcement logic on DALP's API surface. The platform provides the data (real-time balances, settlement history, counterparty activity) and the enforcement controls (compliance modules that block transactions exceeding configured limits); the credit risk calculation engine is an operational layer that the Consortium or its risk management provider would build.

**Net settlement advantage.** DALP's V3 net settlement architecture inherently reduces counterparty exposure by computing net positions across all flows. A participant that is both sending and receiving in a settlement batch only needs to lock their net outflow, reducing the total exposure at any point in time.

### D.3: Governance Model

🟡 **Partial: governance infrastructure at contract level; full governance product not shipped**

DALP has voting power infrastructure at the smart contract level (ERC-5805), providing the cryptographic foundation for on-chain governance. However, a full governance product with proposal creation, quorum tracking, voting period management, and vote tallying through a user interface is not a shipped feature. The smart contract infrastructure exists; the governance application layer requires additional development.

For the Consortium's governance needs (rule changes, fee adjustments, participant disputes), the practical approach would combine DALP's on-chain audit trail and identity system with an off-chain governance process (steering committee, documented decision procedures, majority/supermajority rules) where decisions are recorded on-platform for auditability. As the governance product matures, on-chain voting can be progressively adopted.

The platform's multi-tenancy architecture supports the Consortium's shared governance model: a central system contract defines the governance boundaries, while individual MTO permissions are scoped to their operational role. Changes to system-level parameters (compliance rules, fee structures, participant access) require governance-level authorization, providing separation between day-to-day operations and structural changes.

---

## Section E: Integration

### E.1: National Payment Switch Integration

🟡 **Partial: API architecture supports integration; pre-built connectors do not exist**

DALP does not ship pre-built connectors to specific national payment switches (UAE IPP, India UPI/NEFT/RTGS, Pakistan RAAST, Bangladesh BEFTN). Each of these systems has its own messaging protocol, authentication model, settlement timing, and regulatory requirements. Integration with each payment switch is a project-level effort, not a configuration step.

**What DALP provides.** The platform's API-first architecture (REST API with OpenAPI 3.1 specification, TypeScript SDK, webhook events, and ISO 20022 message support) provides the integration surface that middleware or adapter layers connect to. The API covers all settlement operations, participant management, and transaction status, meaning that an integration layer can orchestrate the full flow: receive a payment instruction from a national switch, create the corresponding DALP settlement, monitor its execution, and confirm back to the originating switch.

**Integration approach.** For each corridor endpoint, the Consortium or its integration partner would build an adapter that translates between the payment switch's native protocol and DALP's API. DALP's ISO 20022 support provides a messaging standard that simplifies this translation for switches that already support ISO 20022 (or are migrating to it). The durable execution engine ensures that integration workflows survive infrastructure failures, preventing message loss between DALP and external systems.

### E.2: API Architecture

🟢 **Native capability**

DALP provides a full-coverage API surface through its Durable API Service (DAPI):

| Interface | Protocol | Authentication | Use Case |
| --- | --- | --- | --- |
| REST API (v2) | HTTPS, RESTful | API keys (HTTP-method-scoped) | Programmatic integration, backend services |
| TypeScript SDK | npm package | API key or CLI credentials | Application development |
| CLI | Command-line | Browser-based device-code flow | Operations, automation, scripting |
| Webhooks | HTTPS callbacks | Configurable | Event-driven integration |
| GraphQL | HTTPS | Session/API key | Complex data queries |

The REST API supports synchronous and asynchronous execution modes negotiated through RFC 7240 Prefer headers. Async operations return HTTP 202 with a status URL for polling, which is the recommended pattern for settlement operations where on-chain confirmation time is non-trivial.

Rate limiting is enforced at 10,000 requests per 60-second window per API key, with configurable per-key limits for high-volume consumers. The error catalog includes 534 structured error codes with severity levels, retryability flags, and translations, providing clear diagnostic information for integration engineers.

The API specification is generated from procedure definitions and available at `/openapi.json`, importable into Postman, Insomnia, or any OpenAPI-compatible tooling. This enables standard API governance workflows and auto-generation of client libraries in any language.

### E.3: ISO 20022 Support

🟢 **Native capability**

DALP supports ISO 20022 messaging for interoperability with banking infrastructure. ISO 20022 is the emerging global standard for financial messaging, and its adoption across SWIFT, SEPA, RTGS systems, and increasingly national payment switches makes it the natural interoperability layer for a cross-border settlement platform.

DALP's integration surface supports ISO 20022 message formats for settlement instructions, confirmations, and status reporting. This means that DALP can receive settlement instructions formatted as ISO 20022 messages from participants' existing banking systems and respond with ISO 20022 confirmations, reducing the translation effort required at integration boundaries.

The practical benefit for RemitLink is reduced middleware complexity: as each corridor country's payment infrastructure migrates toward ISO 20022 (an ongoing process across GCC and South Asian jurisdictions), the integration between DALP and national payment switches becomes progressively simpler because both sides speak the same message format.

---

## Section F: Architecture and Operations

### F.1: Deployment Architecture

🟢 **Native capability with flexible deployment options**

DALP supports multiple deployment models to accommodate varying data residency and operational sovereignty requirements:

| Deployment Model | Description | RemitLink Applicability |
| --- | --- | --- |
| On-premises | Deployed on Consortium-controlled infrastructure | Maximum data sovereignty |
| Cloud (dedicated) | Dedicated cloud infrastructure in specified regions | Operational flexibility with regional control |
| Hybrid | Platform in cloud, blockchain nodes on-premises | Balance of scalability and data control |
| Managed SaaS | SettleMint-managed infrastructure | Fastest deployment, lowest operational burden |

For a multi-jurisdictional consortium, the deployment architecture would likely involve a permissioned EVM network with validator nodes operated by Consortium members (or designated infrastructure providers) in each participating jurisdiction. DALP's platform layer can be deployed centrally or distributed, depending on the Consortium's data residency requirements.

**Data residency.** The Consortium has members in six jurisdictions, each with its own data residency expectations. DALP's deployment flexibility supports region-specific infrastructure placement. Whether participant data for UAE-licensed MTOs resides in UAE infrastructure and Indian MTO data resides in Indian infrastructure is an architectural decision that DALP supports but does not impose. Single-region, multi-region, and split-deployment topologies are all technically feasible, with trade-offs in operational complexity and latency that would be evaluated during the architecture phase.

**Network governance.** For a permissioned deployment, the Consortium defines the validator set (which entities operate network nodes), the consensus parameters (block time, gas limits), and the network governance rules. DALP provides automated blockchain infrastructure monitoring with health collection, timeline aggregation, and summary dashboards, giving operators visibility into network performance.

### F.2: Availability and Disaster Recovery

🟢 **Native capability**

DALP targets 99.9% platform availability for production deployments, with higher targets available under enterprise support tiers. The platform's architecture provides resilience at multiple layers:

**Durable execution.** All stateful operations, including settlement workflows, run through the durable execution engine, which guarantees workflow completion through process restarts and infrastructure failures. A settlement workflow that starts will either complete or reach a deterministic terminal state, regardless of intermediate infrastructure events.

**Blockchain as source of truth.** The on-chain record provides an independent, append-only source of truth that survives platform-layer incidents. If the DALP application layer experiences downtime, the blockchain record remains intact and consistent. The zero-downtime reindexing capability means the data pipeline can be rebuilt from the blockchain without data loss.

**Recovery targets.** For sovereign-tier deployments, RPO (Recovery Point Objective) under 5 minutes and RTO (Recovery Time Objective) under 30 minutes are achievable through standard production deployment patterns including database replication, automated failover, and infrastructure-as-code provisioning. The specific RPO/RTO commitments depend on the deployment topology and infrastructure specification, which would be defined during the architecture phase.

### F.3: Monitoring and Alerting

🟢 **Native capability**

DALP provides three-pillar observability as a native platform feature:

**Metrics.** Pre-built dashboards covering transaction throughput, settlement status, blockchain health, API performance, and system resource utilization. The monitoring system applies threshold-based classification with hysteresis to provide stable operational signals rather than noisy alert storms.

**Logging.** Structured, centralized log aggregation across all platform components. Logs are searchable by time range, component, severity, and transaction context, enabling rapid incident investigation.

**Distributed tracing.** Request-level tracing across the entire middleware chain, from API ingress through compliance evaluation to blockchain submission and confirmation. This enables operators to trace any settlement from initiation to completion, identifying bottlenecks or failure points.

**Blockchain health monitoring.** Automated health collection for the underlying blockchain network with timeline aggregation, summary dashboards, and live streaming. The system monitors block production, validator status, and network performance, alerting operators to degradation before it impacts settlement operations.

For RemitLink, the monitoring stack would be accessible to designated Consortium operators, providing real-time visibility into settlement volumes, compliance module activity, participant balances, and system health. Because observability is built into the platform rather than bolted on through third-party tooling, operators get a single pane of glass across the entire settlement lifecycle rather than stitching together separate monitoring systems for different infrastructure layers.

### F.4: Network Governance

🟢 **Native capability for permissioned EVM deployments**

For a permissioned deployment, DALP supports Consortium-governed network architecture. The Consortium defines the validator set (which member institutions or designated parties operate network nodes), the consensus parameters, and the admission criteria for new validators.

DALP supports any EVM-compatible network, including Hyperledger Besu (which provides IBFT 2.0 and QBFT consensus mechanisms suitable for consortium governance), private Polygon networks, and other permissioned EVM implementations. The choice of consensus mechanism, block time, and gas limits would be determined during the architecture phase based on the Consortium's throughput requirements and governance preferences.

The platform's role in network governance is operational: monitoring network health, managing node connectivity, and providing the infrastructure tooling that keeps the network running. The policy governance (who operates nodes, how consensus changes are approved, how new validators are admitted) is a Consortium decision implemented through the network's consensus rules.

---

## Section G: Commercial

### G.1: Commercial Model

SettleMint's commercial model is based on annual platform licensing. The license covers the DALP platform, all supported asset classes and compliance modules, API access, SDK, CLI, and standard platform updates. The licensing model provides cost predictability: institutions pay a known annual fee rather than variable per-transaction charges that scale unpredictably with volume.

Implementation services (architecture design, deployment, integration, testing, and go-live support) are scoped separately as professional services engagements. These can be delivered by SettleMint directly or through the Consortium's chosen system integrator.

Per-transaction fees are not part of SettleMint's standard commercial model. The Consortium's settlement volume (4.2 million transactions per month) is handled within the platform license, not billed incrementally.

### G.2: Implementation Timeline

An indicative implementation timeline for a deployment of this complexity:

| Phase | Duration | Key Activities |
| --- | --- | --- |
| Discovery and Architecture | 4 to 6 weeks | Requirements validation, network design, integration mapping, compliance rule definition |
| Platform Deployment | 3 to 4 weeks | Infrastructure provisioning, DALP deployment, currency token configuration, compliance module setup |
| Integration and Testing | 6 to 8 weeks | Payment switch adapters, FX feed integration, sanctions screening integration, end-to-end testing |
| Pilot Operations | 4 to 6 weeks | Limited-volume production with subset of participants, monitoring, tuning |
| Full Production | 2 to 4 weeks | Remaining participant onboarding, volume ramp, operational handover |

Total indicative timeline: 19 to 28 weeks from contract to full production. This assumes timely availability of Consortium decisions, integration partner resources, and regulatory approvals. The integration phase (payment switch adapters for six jurisdictions) is typically the longest dependency.

### G.3: Support Model

SettleMint provides tiered support aligned to deployment criticality:

| Tier | Coverage | Response SLA (Critical) | Includes |
| --- | --- | --- | --- |
| Standard | Business hours | 4 hours | Platform updates, bug fixes, email support |
| Premium | Extended hours | 2 hours | Named account manager, priority queue |
| Enterprise | 24/7 | 1 hour | Dedicated support team, on-call escalation, quarterly reviews |

For a production settlement platform processing USD 2.8 billion monthly, SettleMint would recommend Enterprise tier support with 24/7 coverage and defined escalation paths. Severity levels, response times, resolution targets, and service credit mechanics are documented in the support agreement and calibrated to the Consortium's operational requirements.

---

## Coverage and Gaps Summary

### Available Now

| Requirement Area | DALP Coverage | Confidence |
| --- | --- | --- |
| Multi-currency digital representations | Stablecoin asset class with controlled minting/burning | 🟢 Native |
| Atomic settlement | XvP V3 with net settlement and safety invariants | 🟢 Native |
| Multi-jurisdiction compliance | 18 compliance module types with fail-closed AND logic | 🟢 Native |
| Identity and participant management | OnchainID with claim-based verification and RBAC | 🟢 Native |
| Audit trail | Immutable on-chain records with event indexing | 🟢 Native |
| API and integration surface | REST, SDK, CLI, webhooks, ISO 20022 support | 🟢 Native |
| Permissioned network deployment | Any EVM-compatible network with monitoring | 🟢 Native |
| Monitoring and alerting | Three-pillar observability with blockchain health | 🟢 Native |

### Requires Integration

| Requirement Area | Integration Need | Approach |
| --- | --- | --- |
| Sanctions screening | External screening provider (World-Check, Dow Jones) | Claim-based integration via OnchainID |
| Transaction monitoring | External AML monitoring platform | API/webhook data feed to monitoring provider |
| FX rate feeds | External FX data providers | Feed module integration |
| National payment switches | Adapter per jurisdiction | API-based middleware development |
| Regulatory report generation | Reporting/RegTech provider | Data export via API |
| Credit risk engine | Risk management system | API-based monitoring and enforcement |

### Gaps

| Requirement | Gap Description | Alternative |
| --- | --- | --- |
| Purpose-built liquidity pool management | No pre-built pool management module | Build on DALP API with durable execution engine |
| FX rate locking workflow | No native rate-lock feature | Implement as workflow on API surface |
| Automated FX circuit breakers | Feed staleness exists; volatility triggers do not | Custom orchestration using platform controls |
| Full governance product (proposals, voting UI) | Contract infrastructure exists; governance UI not shipped | Off-chain governance with on-chain audit trail |
| Offline payment capability | Not applicable (on-chain platform) | Outside scope |

### Responsibility Split

| Responsibility | Owner |
| --- | --- |
| Settlement platform infrastructure | SettleMint |
| Platform deployment and configuration | SettleMint + Consortium IT |
| Compliance rule definition | Consortium compliance officers |
| Sanctions screening | External provider, selected by Consortium |
| Transaction monitoring | External provider, selected by Consortium |
| National payment switch integration | Integration partner, contracted by Consortium |
| FX rate sourcing | Consortium treasury or FX provider |
| Network node operations | Consortium members or designated operators |
| Regulatory reporting | Consortium compliance function |
| Liquidity management operations | Consortium treasury function |

---

## About SettleMint

SettleMint is the digital asset lifecycle platform company for regulated financial markets and sovereign use cases. Founded in 2016 and headquartered in Europe, the company operates across Europe, MENA, and Asia-Pacific with a team combining deep expertise in banking, capital markets, regulatory compliance, and large-scale blockchain engineering.

| Metric | Value |
| --- | --- |
| Founded | 2016 |
| Headquarters | Europe |
| Operating Regions | Europe, MENA, Asia-Pacific |
| Focus | Regulated digital asset lifecycle management |
| Platform | DALP (Digital Asset Lifecycle Platform) |
| Production Track Record | 7+ years at regulated banks |
| Certifications | ISO 27001, SOC 2 Type II |
| Asset Classes | Bonds, equities, funds, stablecoins, deposits, real estate, precious metals |

SettleMint is a platform company, not a financial operator. The company does not trade, custody, or hold assets on behalf of clients, and does not operate exchanges or trading venues. This eliminates the structural conflicts of interest present in companies that both provide infrastructure and compete with their clients. Each deployment operates within strict tenant boundaries, and client data, configuration, and operational state are never shared across tenants.

---

*Document classification: Confidential*
*Version: 2.0 (Revised Draft)*
*Date: 1 April 2026*
