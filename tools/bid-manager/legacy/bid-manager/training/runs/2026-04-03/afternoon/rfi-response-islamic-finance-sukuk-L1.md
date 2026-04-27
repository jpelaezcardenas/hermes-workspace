# Response to Request for Information: Digital Platform for Sharia-Compliant Sukuk Issuance and Lifecycle Management

**Prepared for:** Gulf Development Bank (GDB)
**Reference:** GDB-RFI-2026-041
**Prepared by:** SettleMint NV
**Date:** April 2026
**Classification:** Confidential

---

## Executive Summary

Gulf Development Bank's ambition to issue Sharia-compliant sukuk on a digital platform represents a significant step for multilateral development finance in the GCC. The challenge, however, is not the technology of tokenization itself. The genuine complexity lies in building a production-grade platform that respects the structural and economic requirements of Islamic finance, enforces multi-jurisdictional regulatory compliance before execution rather than after review, manages the full sukuk lifecycle from structuring through periodic distributions to maturity or dissolution, and does so on infrastructure that meets the availability, auditability, and governance standards that a development institution of GDB's standing requires.

DALP, the Digital Asset Lifecycle Platform developed by SettleMint, addresses this complexity directly. DALP is a configurable, compliance-first platform purpose-built for regulated financial instruments. It supports seven asset classes, including fixed income instruments that serve as the foundation for sukuk issuance, with compliance rules enforced at the smart contract level through the ERC-3643 standard and the SMART Protocol. Every transfer, every distribution, and every lifecycle event passes through a deterministic compliance evaluation before it commits to the blockchain. There is never a state where a non-compliant token exists in an unauthorized wallet.

For GDB's sukuk programme, DALP provides the token architecture, compliance enforcement, distribution mechanics, identity verification, and settlement infrastructure needed to issue, service, and manage sukuk instruments across the GCC, Southeast Asia, and European jurisdictions. The platform is configured, not custom-built, which means the first issuance can reach production in weeks rather than the months typically required for bespoke smart contract development.

This response addresses each section of GDB's RFI in sequence, providing specific capability descriptions, honest boundary-setting where requirements extend beyond native platform scope, and architectural evidence that demonstrates production readiness for this programme.

![DALP Dashboard Overview](../../../shared/brand/dalp-screenshots/02 - Dashboard/Dashboard 1.png)
*Figure 1: DALP Dashboard providing a consolidated view of all digital assets, investor activity, and operational status across the platform.*

---

## Section A: Sukuk Structure Support

### A.1 Ijara (Lease-Based) Sukuk

DALP's bond asset class provides the structural foundation for ijara sukuk issuance. The platform represents each ijara instrument as a configurable token where the underlying leased asset is documented through the customisable metadata schema. This schema captures the asset description, lease terms, rental payment schedule, asset location, and any asset-specific identifiers that GDB's Sharia Supervisory Board requires for compliance verification.

The leased asset's relationship to the sukuk token is recorded immutably on-chain through identity claims issued by trusted issuers. DALP's collateral verification module can be configured to require that the underlying asset's existence and status are attested by an approved party before the token can be minted or additional supply created. This mechanism ensures that the tangibility requirement, fundamental to ijara structures, is enforced at the platform level rather than relying on off-chain operational controls alone.

Periodic rental payments are managed through DALP's distribution and claims system. The platform supports scheduled distributions where entitlement is calculated based on token holdings at a specified record date, and distribution claims are created for each holder to collect. The rental amount is determined externally by GDB's treasury team based on the actual lease economics, then executed through DALP's distribution workflow. This separation is important because the rental calculation involves real-world lease terms that the platform does not interpret; DALP provides the execution infrastructure for distributing the determined amounts to the correct holders with full audit trail coverage.

At maturity, the asset return is represented as a redemption event. DALP's maturity redemption feature supports configurable maturity dates with automatic or administered redemption workflows. Token holders receive their principal through the same claims and distribution mechanism, and the tokens are burned upon completion, closing the lifecycle cleanly.

![DALP Bond Design Wizard](../../../shared/brand/dalp-screenshots/new-2026-03-24/Asset Management/1. Asset Designer/01. Fixed Income/Bond Tokenisation/04 Step Instrument Details .jpg)
*Figure 2: DALP Asset Designer showing instrument detail configuration for a fixed income token, including maturity parameters, coupon schedules, and denomination settings.*

### A.2 Murabaha (Cost-Plus Financing) Sukuk

Murabaha sukuk require a different economic structure from lease-based instruments, and DALP's configurable token architecture accommodates this through feature and metadata composition rather than requiring a separate contract type.

The murabaha structure involves a cost-plus sale where the profit margin is agreed at issuance and the total amount (cost plus profit) is repaid over a defined schedule. DALP represents this through the bond asset class with the following configuration: the token's denomination represents the face value of the sukuk; the metadata schema captures the commodity reference, cost price, profit margin, and deferred payment schedule; and the distribution feature is configured to execute periodic profit distributions according to the agreed schedule.

The deferred payment schedule is modelled through DALP's distribution scheduling capability. Each scheduled payment creates a distribution event at the configured date, with the payment amount determined externally by GDB based on the murabaha terms and then executed through the platform. The platform does not perform the profit margin calculation itself, as this is a commercial decision governed by the murabaha agreement and subject to Sharia Supervisory Board oversight. DALP executes the distribution once the amount is provided, ensuring that every payment is recorded on-chain with a complete audit trail linking the distribution to the specific sukuk holders entitled to receive it.

Commodity reference mechanics, where applicable, are documented in the metadata schema. The platform does not manage physical commodity transactions directly; these occur through GDB's existing commodity trading relationships. The metadata record provides an immutable reference point that auditors and the Sharia board can verify against the underlying transaction documentation.

### A.3 Wakala (Agency-Based) Sukuk

Wakala sukuk involve an agency structure where the issuer appoints a wakeel (agent) to manage the underlying assets on behalf of sukuk holders. The economic returns depend on the performance of the managed assets, with an expected profit rate communicated to investors and any excess retained as an incentive fee by the wakeel.

DALP supports wakala structures through a combination of token configuration and operational workflow integration. The wakeel appointment is documented in the token's metadata schema, which records the agent identity, appointment terms, expected profit rate, and incentive fee structure. The agent's identity is registered through DALP's OnchainID system, providing a verifiable on-chain record of the appointment that the Sharia board can reference during periodic reviews.

Distribution of expected profit is handled through the same distribution and claims mechanism described for ijara sukuk. The wakeel determines the actual profit achieved from the managed assets, the expected profit rate is distributed to holders, and any surplus is allocated as the incentive fee. DALP executes each distribution event based on externally provided amounts. The platform's audit trail records every distribution with holder-level detail, creating the evidential basis for both Sharia audit and financial reporting.

The monitoring of the wakeel's performance against the expected profit rate is an operational function that occurs outside the platform. DALP provides the data infrastructure, including historical distribution records, holder registries, and token lifecycle events, that supports this monitoring, but the performance assessment itself is a governance decision made by GDB's investment committee and Sharia board.

### A.4 Profit-Sharing vs. Interest Payment Differentiation

DALP's architecture makes no assumption about whether a distribution represents interest or profit. The platform's distribution mechanism is structurally neutral: it calculates entitlements based on token holdings and executes payment of externally provided amounts. There is no interest rate calculation engine embedded in the smart contract or platform logic.

This structural neutrality is precisely what Sharia compliance requires. The platform does not label distributions as "interest" or "coupon" at the smart contract level. The economic characterisation of each distribution, whether it is rental income from an ijara, profit from a murabaha, or expected return from a wakala, is determined by the sukuk structure and documented in the metadata and distribution records. The platform enforces the distribution schedule and ensures accurate payment to entitled holders; the Sharia characterisation is governed by the instrument's legal structure, not by any embedded financial logic.

The metadata schema for each sukuk type explicitly captures the Sharia classification of the instrument and the nature of periodic payments. This provides auditors and the Sharia Supervisory Board with clear, on-chain evidence that the platform's operations align with the approved structure.

### A.5 Underlying Asset Tracking and Verification

Maintaining verified, tangible asset backing throughout the sukuk lifecycle is a foundational requirement of Sharia-compliant instruments. DALP addresses this through two complementary mechanisms.

First, the collateral verification compliance module can be configured to require that an approved trusted issuer attests to the existence and status of the underlying asset before minting is permitted. This attestation takes the form of an identity claim issued against the token's OnchainID, recorded on-chain and verifiable by any authorised party. If the collateral attestation is absent, expired, or revoked, the module prevents further issuance, enforcing the tangibility requirement at the smart contract level.

Second, DALP's metadata schema provides structured fields for documenting the underlying asset in detail: asset type, location, valuation, ownership structure, encumbrance status, and any reference identifiers (such as title deed numbers for real estate or warehouse receipts for commodities). These fields are configured per instrument template and can be updated through governed operations requiring appropriate role authorisation.

Periodic asset verification, which AAOIFI standards require for ongoing Sharia compliance, is supported through a workflow where the trusted issuer periodically reissues or refreshes the collateral attestation claim. If the claim lapses beyond a configured validity period, the platform can be configured to restrict further transfers or distributions until the attestation is renewed. This mechanism does not replace the physical asset verification process itself, which requires independent inspection or audit, but it ensures that the on-chain compliance state reflects the real-world verification status.

![DALP Compliance Module Configuration](../../../shared/brand/dalp-screenshots/03 - Asset Designer/Asset Designer - Step 6 - Compliance Modules.png)
*Figure 3: DALP Asset Designer showing the compliance module selection interface, where modules for identity verification, country restrictions, collateral requirements, and transfer controls are composed for each instrument.*

---

## Section B: Sharia Governance and Compliance

### B.1 Sharia Board Approval Workflows

DALP provides a governed operations framework where sensitive platform actions, including token issuance, compliance module changes, and distribution execution, require authorisation from holders of specific roles. This governance model maps directly to the Sharia board approval workflow that GDB requires.

The platform's role-based access control (RBAC) model includes a governance role at the per-asset level. For a sukuk issuance, this role can be assigned to a representative of the Sharia Supervisory Board or to an operational proxy who acts only upon documented board approval. No issuance, distribution, or material change to the token's configuration can proceed without the governance role holder's authorisation.

Every governance action is recorded in DALP's immutable audit trail, capturing the identity of the authoriser, the timestamp, the specific action approved, and the resulting on-chain transaction. This creates a verifiable chain of evidence that the Sharia board's approval was obtained before each material operation, satisfying both the board's own governance requirements and external audit expectations.

The platform does not include a native multi-step approval workflow engine with quorum logic (such as requiring three of five board members to approve). GDB would need to integrate an external governance workflow system, or implement an operational protocol where a designated signatory acts on behalf of the board after receiving documented approval through GDB's existing board governance channels. DALP's API architecture supports integration with external workflow engines to orchestrate these approval steps, with the final execution gated by the governance role holder's on-chain authorisation.

### B.2 AAOIFI Standards Compliance

DALP's compliance architecture supports the implementation of AAOIFI-aligned sukuk structures, though it is important to distinguish between what the platform enforces structurally and what requires institutional governance.

For FAS 33 (Investment in Sukuk, Shares, and Similar Instruments) and FAS 34 (Financial Reporting for Sukuk-Holders), DALP provides the underlying data infrastructure. The platform records every issuance, transfer, distribution, and lifecycle event with holder-level granularity. This event history provides the raw data needed for AAOIFI-compliant financial reporting, including the classification of sukuk holdings, profit recognition, and amortisation schedules. The platform does not generate AAOIFI-formatted financial statements directly; this is the domain of GDB's financial reporting system, which can consume DALP's data through the API.

For Sharia Standard SS 17 (Investment Sukuk), the platform's configurable token architecture ensures that the structural requirements, such as tangible asset backing, profit-sharing rather than interest mechanics, and Sharia board governance, can be enforced or documented at the platform level as described throughout this response. SS 9 (Ijara) and SS 8 (Murabaha) requirements are addressed through the instrument-specific configurations described in Section A.

The compliance module framework provides the technical controls that enforce investor eligibility, jurisdictional restrictions, and transfer rules aligned with the regulatory requirements of each target market. The Sharia-specific compliance logic, such as whether a particular transfer violates the prohibition on trading debt-based instruments below par, requires configuration of the platform's compliance modules as described in Section B.3.

### B.3 Sharia-Compliant Transfer Rules

The restriction on trading murabaha sukuk at other than face value is a well-known Sharia requirement that distinguishes debt-based sukuk from asset-backed sukuk in secondary market trading. DALP's compliance module framework provides the mechanism to enforce this restriction.

For murabaha sukuk specifically, the transfer approval compliance module can be configured to require administrative approval for every secondary market transfer. This creates a gate where the issuer or a designated compliance officer verifies that the transfer price meets the Sharia requirement before approving the transaction. Combined with the metadata record documenting the instrument as murabaha-classified, this provides an auditable control point.

For ijara and wakala sukuk, where secondary trading is generally permitted because the underlying assets provide tangible backing, the standard compliance modules (identity verification, country restrictions, investor eligibility) apply without the additional transfer price restriction.

It is important to be transparent about a limitation: DALP does not natively inspect the price of a peer-to-peer transfer at the smart contract level. The platform enforces identity, eligibility, and administrative controls on transfers, but price validation for Sharia compliance requires either an external check integrated through the transfer approval workflow, or an operational protocol where the issuer's compliance team reviews transfer requests against pricing rules before granting approval. The platform provides the control surface and audit trail; the pricing judgement is an institutional decision.

### B.4 Ongoing Asset Compliance Verification

Ensuring that underlying assets remain identified, Sharia-compliant, and unencumbered throughout the sukuk lifecycle is addressed through the collateral verification mechanism described in Section A.5, combined with DALP's metadata and audit trail capabilities.

The platform's metadata schema records the asset status at issuance, and the collateral verification module enforces that an approved trusted issuer has attested to the asset's compliance status. For ongoing verification, the trusted issuer periodically reissues the attestation claim, and the platform records each attestation in the audit trail. If the attestation lapses, the compliance module can be configured to restrict operations until the attestation is renewed.

This mechanism provides an on-chain control point for a fundamentally off-chain process. The actual asset inspection, verification of Sharia compliance, and confirmation that assets are unencumbered requires physical due diligence that occurs outside any digital platform. DALP ensures that the results of that due diligence are recorded, enforced, and auditable, but does not replace the due diligence process itself.

---

## Section C: Distribution and Servicing

### C.1 Periodic Profit Distribution

DALP's distribution system supports the full range of periodic payment schedules that GDB's sukuk programme requires. For fixed-rate distributions, the schedule is defined at token configuration and distributions are created at each scheduled date with the specified amount. For floating-rate distributions, the platform supports event-driven distribution creation where the amount is provided through an external data feed or manual input before each distribution date. Hybrid schedules, combining a fixed base with a variable component, are supported through sequential distribution events.

The distribution workflow operates as follows: at the record date, the platform snapshots the token holder registry; entitlements are calculated proportionally based on each holder's balance at the snapshot; distribution claims are created for each entitled holder; and holders collect their distributions through the claims mechanism. Every step is recorded in the audit trail with holder-level granularity.

For sukuk specifically, the distribution amounts are determined by GDB's treasury team based on the actual economics of the underlying structure (rental income for ijara, profit margin for murabaha, investment returns for wakala). The platform does not perform the economic calculation; it executes the distribution of determined amounts accurately and with full traceability.

![DALP Yield and Distribution](../../../shared/brand/dalp-screenshots/new-2026-03-24/Addons/Yield/Income yield.jpg)
*Figure 4: DALP income yield management interface showing distribution scheduling and yield tracking for fixed income instruments.*

### C.2 Maturity and Dissolution

DALP's maturity redemption feature supports several dissolution scenarios relevant to GDB's sukuk programme.

Standard maturity redemption is configured at token creation with a specified maturity date. At maturity, the platform triggers a redemption workflow where holders exchange their tokens for the face value amount through the claims mechanism, and the tokens are burned. This is an administered process: the issuer initiates the redemption, the platform calculates entitlements, creates claims, and manages the token burn upon collection.

Early dissolution is supported through the same mechanism, triggered by an administrative action rather than a date-based condition. If the sukuk's underlying structure requires early dissolution (for example, if the leased asset in an ijara structure is lost or the Sharia board determines that continued operation would breach Sharia principles), the governance role holder can initiate an early redemption event. The platform calculates pro-rata entitlements and processes the dissolution.

Partial dissolution for amortising structures is handled through periodic partial redemptions. At each amortisation date, a portion of the outstanding principal is redeemed and the corresponding tokens are burned, reducing the total supply proportionally. The distribution system handles the principal repayment component alongside any final profit distribution.

### C.3 External Distribution Calculation

DALP is designed as a distribution execution platform, not a distribution calculation engine. This distinction is particularly relevant for sukuk, where the profit calculation involves real-world economic variables (actual rental income, commodity prices, investment returns) that the platform does not observe directly.

The workflow is straightforward: GDB's treasury or fund administration team calculates the distribution amount per unit based on the underlying sukuk economics; this amount is provided to DALP through the API or administrative interface; the platform creates the distribution event, calculates holder-level entitlements based on the per-unit amount and each holder's balance at the record date, and creates claims for collection.

This separation of calculation from execution is an architectural strength for Sharia compliance. It ensures that the profit calculation methodology, which must be reviewed and approved by the Sharia Supervisory Board, remains under GDB's direct control. The platform's role is to execute the approved distribution accurately and create the audit evidence that the correct amounts were distributed to the correct holders.

### C.4 Primary Issuance Settlement

DALP's XvP (Exchange versus Payment) settlement mechanism provides atomic settlement for primary issuance. In an XvP transaction, the delivery of sukuk tokens and the receipt of payment occur simultaneously or both revert. There is no settlement risk where one party delivers while the other defaults.

For GDB's programme, primary issuance would operate through an XvP workflow: the sukuk tokens are allocated to qualified investors; the cash payment (whether in fiat-referenced stablecoin or through an integrated payment rail) is committed simultaneously; and the exchange executes atomically. If either leg fails, the entire transaction reverts, leaving both parties in their pre-trade state.

The XvP mechanism supports multi-party settlement, which is relevant if GDB distributes through multiple placement agents or lead managers simultaneously. Each party's allocation and payment can be coordinated within the same atomic settlement workflow.

![DALP XvP Settlement Flow](../../../shared/brand/dalp-screenshots/new-2026-03-24/Addons/Exchange XvP/Asset flow step final .jpg)
*Figure 5: DALP XvP settlement completion screen showing atomic delivery-versus-payment finality for a token exchange.*

---

## Section D: Regulatory and Multi-Jurisdictional Compliance

### D.1 Multi-Jurisdictional Investor Eligibility

DALP's compliance module framework is designed for exactly this type of multi-jurisdictional enforcement. The platform composes compliance rules from 12 module types, each independently configurable per token. For GDB's sukuk programme, the relevant modules include:

**Country allow list:** Restricts token holdings to investors domiciled in approved jurisdictions. GDB can configure the allow list to include the six GCC states, target Southeast Asian markets, and the three European jurisdictions (Luxembourg, UK, Germany) specified in the RFI.

**Identity verification:** Requires that every investor has a verified OnchainID with claims attesting to their qualified institutional investor status. The claim requirements can be expressed as boolean logic (for example, requiring both a KYC claim AND a qualified investor claim AND a jurisdiction-specific regulatory status claim).

**Investor count limits:** If any jurisdiction imposes limits on the number of holders (for example, private placement exemptions), the module can enforce global and per-country caps.

These modules compose through sequential AND evaluation. Every module must approve a transfer before it executes. A single module veto blocks the transaction. This fail-closed design ensures that GDB's multi-jurisdictional compliance posture is enforced at the smart contract level, not just at the application layer where it could theoretically be bypassed through direct blockchain interaction.

The specific regulatory requirements of each target jurisdiction, including CBB regulations in Bahrain, CMA requirements in Saudi Arabia, DFSA and ADGM frameworks in the UAE, FCA requirements in the UK, CSSF rules in Luxembourg, and BaFin regulations in Germany, are mapped to compliance module configurations. The platform does not interpret regulations; it provides the enforcement tools that GDB's compliance team configures based on their legal analysis of each jurisdiction's requirements.

### D.2 Identity Verification and KYC

DALP implements identity verification through the OnchainID protocol, an open standard for on-chain verifiable credentials. Every investor must have a registered OnchainID before receiving sukuk tokens. This identity record contains claims issued by trusted issuers, which are pre-approved claim authorities that GDB designates.

For qualified institutional investors, the KYC workflow operates as follows: the investor completes KYC through GDB's chosen identity verification provider or through GDB's existing institutional onboarding process; upon successful verification, a trusted issuer creates on-chain claims attesting to the investor's identity, jurisdiction, and qualification status; these claims are bound to the investor's OnchainID; and the compliance module checks these claims before every transfer.

DALP does not perform KYC itself. The platform provides the identity infrastructure that records, enforces, and makes auditable the results of KYC processes conducted by GDB or its appointed verification providers. This separation ensures that GDB retains full control over its investor due diligence standards while the platform enforces the resulting eligibility determinations.

![DALP Identity and Verification](../../../shared/brand/dalp-screenshots/12 - Identity and Verification/Onchain Identity.png)
*Figure 6: DALP OnchainID interface showing verified investor identity with associated claims from trusted issuers.*

### D.3 Regulatory Reporting

DALP provides the data foundation for regulatory reporting across all target jurisdictions. Every platform event, including issuance, transfer, distribution, compliance decision, and administrative action, is recorded in the audit trail with timestamp, actor identity, and full transaction detail.

The platform exposes this data through its API, enabling GDB's reporting systems to extract the information needed for each jurisdiction's specific reporting requirements. Whether the requirement is transaction reporting to the CBB, investor registry maintenance for CSSF, or distribution reporting for BaFin, the underlying data is available through a consistent API surface.

DALP does not generate jurisdiction-specific regulatory filing documents. Regulatory report formatting, filing procedures, and submission timelines are specific to each regulator and typically require dedicated regulatory reporting systems or processes. The platform provides complete, auditable, machine-readable data; the report generation and filing is outside platform scope and would be handled by GDB's regulatory compliance function or a specialised reporting service provider.

### D.4 Data Residency

DALP supports multiple deployment models, including on-premises, private cloud, and dedicated managed SaaS, with deployment in specific cloud regions. For GDB's multi-jurisdictional programme, the platform can be deployed in a region that satisfies the primary data residency requirements.

Maintaining separate data residency per jurisdiction within a single deployment, where GCC investor data resides in a GCC data centre and European investor data resides in an EU data centre, requires a multi-deployment architecture. This is technically feasible with DALP, as separate platform instances can be deployed in different regions with cross-instance coordination, but it adds architectural complexity beyond standard single-instance deployment. GDB should consider whether the regulatory requirements of each jurisdiction strictly mandate physical data separation, or whether a single deployment in a compliant region with appropriate data protection controls (encryption, access controls, contractual safeguards) satisfies the requirements.

SettleMint's team can assist in designing the optimal deployment topology during the implementation phase, based on GDB's detailed data residency analysis for each jurisdiction.

---

## Section E: Integration and Technical Architecture

### E.1 API Architecture and Integration

DALP is an API-first platform. Every capability available through the user interface is also available through typed REST APIs, enabling deep integration with GDB's existing infrastructure. The API surface covers token operations (creation, issuance, transfer, redemption), compliance management (module configuration, identity registration, claim issuance), distribution execution, settlement, and administrative functions.

Integration with GDB's treasury management system would operate through the API layer, with GDB's system providing distribution amounts, redemption triggers, and operational instructions, and consuming transaction confirmations, holder registry updates, and audit data from DALP. The platform also supports event-driven integration through webhooks and server-sent events (SSE), enabling real-time notification when on-chain events occur.

For integration with Islamic banking core systems, the approach depends on the specific system's interface capabilities. DALP's API accepts standard JSON payloads and can be integrated through middleware or direct API-to-API connections. ISO 20022 messaging alignment is supported at the data model level, enabling financial message translation between DALP's event format and ISO 20022 structures.

### E.2 Deployment Options and Blockchain Networks

DALP supports three deployment models:

| Deployment Model | Description | Data Residency |
| --- | --- | --- |
| On-premises | Full platform deployed in GDB's own data centre | Complete control |
| Private cloud | Dedicated cloud deployment in GDB's chosen region | Region-specific |
| Managed SaaS | SettleMint-operated dedicated instance | Region selected at provisioning |

All three models deliver identical platform functionality. The choice depends on GDB's infrastructure preferences, data residency requirements, and operational model.

The platform operates on EVM-compatible blockchain networks, including public networks (Ethereum, Polygon, Avalanche) and private permissioned networks (Hyperledger Besu, Quorum). For GDB's sukuk programme, a private permissioned network (such as Hyperledger Besu) deployed within GDB's infrastructure would likely be the appropriate choice, providing GDB with full control over network participants, consensus configuration, and data access.

DALP operates exclusively on EVM-compatible chains. Non-EVM blockchain networks are not supported. If GDB's requirements include non-EVM chain support, this should be discussed during the implementation scoping phase, though the architectural approach would require EVM adapter or connector integration rather than native support.

### E.3 High Availability and Business Continuity

DALP's architecture is built for continuous operation. The platform deploys on container orchestration infrastructure with automated failover, horizontal scaling, and health monitoring. Target availability is 99.9% for the application layer, with the underlying blockchain network's availability depending on the consensus configuration and node deployment topology.

The blockchain itself serves as an immutable source of truth. If the application layer experiences a failure, no data is lost because the on-chain state is preserved across all network nodes. Upon recovery, the platform re-indexes the blockchain state and resumes operation from the point of interruption.

For disaster recovery, the platform supports multi-zone and multi-region deployment configurations. RPO (Recovery Point Objective) for on-chain data is effectively zero because blockchain state is replicated across all nodes in real time. RPO for off-chain platform data depends on the backup configuration but targets under five minutes. RTO (Recovery Time Objective) depends on the deployment architecture but targets under thirty minutes for the application layer.

### E.4 Security Architecture

DALP implements a defence-in-depth security model with controls at every layer:

**Authentication:** The platform supports enterprise identity federation through OpenID Connect (OIDC) and SAML, enabling GDB to use its existing identity provider. API access is authenticated through scoped API keys with configurable permissions.

**Authorisation:** A five-role platform RBAC model controls access to platform functions, and a separate seven-role per-asset RBAC model controls operations on individual tokens. This dual-layer model ensures separation of duties between platform administration and asset-level operations.

**Encryption:** All data in transit is encrypted via TLS. Data at rest uses encryption provided by the underlying infrastructure (database-level and storage-level encryption). Key management integrates with enterprise-grade secret management backends, with HSM integration available for key custody.

**Audit:** Every platform action and on-chain transaction is recorded in an immutable audit trail. The trail captures actor identity, timestamp, action type, affected resources, and outcome. Audit data is accessible through the API and the platform's administrative interface.

![DALP Monitoring Dashboard](../../../shared/brand/dalp-screenshots/15 - Monitoring/Blockchain Monitoring.png)
*Figure 7: DALP blockchain monitoring dashboard showing network health, node status, and transaction throughput in real time.*

---

## Section F: Audit Trail and Reporting

### F.1 Audit Trail Capabilities

DALP records every material platform event in an immutable audit trail. The categories of recorded events include:

| Event Category | Examples |
| --- | --- |
| Token lifecycle | Creation, minting, burning, pause, unpause |
| Transfers | All token transfers with sender, recipient, amount, compliance check results |
| Distributions | Distribution creation, entitlement calculation, claim creation, claim collection |
| Compliance | Module configuration changes, identity registration, claim issuance and revocation |
| Administrative | Role assignments, governance actions, configuration changes |
| Authentication | Login events, API key usage, session management |

Audit data is stored both on-chain (transaction-level events recorded immutably on the blockchain) and off-chain (platform-level operational events recorded in the application's audit log). Both layers are accessible through the API, providing internal audit teams, external auditors, and regulators with a complete operational history.

For regulatory access, DALP supports the configuration of read-only roles that can be assigned to auditors or regulatory representatives, providing them with direct access to the audit trail and holder registry without the ability to modify any platform state.

### F.2 Sukuk Holder Reporting

DALP provides holder-level reporting capabilities through its API and administrative interface. Each sukuk holder can access their current holdings, complete distribution history (every profit payment received, with date, amount, and sukuk reference), transaction history (all transfers involving their account), and current compliance status.

For GDB's operational reporting, the platform provides registry-level views showing all current holders, their balances, jurisdiction distribution, and compliance status. These views support the periodic investor statements that institutional investors typically require, though the formatting and delivery of those statements would be handled by GDB's investor relations function consuming DALP's data through the API.

### F.3 Sharia Audit Support

The combination of DALP's audit trail, metadata schema, and collateral verification mechanism provides the evidentiary basis for Sharia audit. Specifically, the Sharia auditor can verify that:

Every sukuk issuance was preceded by asset attestation (collateral verification records). Every distribution was classified as profit, not interest, in the instrument metadata. Every governance action, including issuance, distribution, and material changes, received the required authorisation from the governance role holder (representing the Sharia board's approval). All transfers complied with configured transfer rules (compliance module evaluation records). The underlying asset documentation was maintained and periodically refreshed (trusted issuer attestation history).

This data provides a continuous, verifiable record that the platform's operations conformed to the approved Sharia structure. The Sharia auditor can trace any specific event back to its authorisation, compliance evaluation, and underlying asset status at the time of the event.

![DALP Activity Log](../../../shared/brand/dalp-screenshots/14 - Settings and Admin/Activity Log.png)
*Figure 8: DALP activity log providing a complete audit trail of all platform operations, accessible to auditors and compliance teams.*

---

## Implementation Approach

SettleMint proposes a phased implementation approach for GDB's sukuk programme:

**Phase 1: Discovery and Architecture (3 to 4 weeks)**
Joint workshops to map GDB's sukuk structures to DALP's token configuration model; integration architecture design for treasury management and core banking connectivity; compliance module configuration design for each target jurisdiction; Sharia Supervisory Board review and approval of the platform operating model.

**Phase 2: Platform Deployment and Configuration (3 to 4 weeks)**
Infrastructure deployment in GDB's chosen environment; blockchain network provisioning and configuration; sukuk instrument template creation for ijara, murabaha, and wakala structures; compliance module deployment and testing; identity verification workflow integration.

**Phase 3: Integration and Testing (4 to 6 weeks)**
Treasury management system integration; distribution workflow end-to-end testing; KYC provider integration and investor onboarding testing; Sharia board approval workflow validation; regulatory reporting data extraction testing; user acceptance testing with GDB's operations and compliance teams.

**Phase 4: Go-Live and Stabilisation (2 to 3 weeks)**
Production deployment of first sukuk instrument; monitored operation period with enhanced support; operational runbook handover; training for GDB's operations, compliance, and technology teams.

**Phase 5: Ongoing Operations**
Continuous platform support per selected support tier; additional sukuk instrument configurations as the programme expands; compliance module updates as regulatory requirements evolve; periodic Sharia audit data extraction support.

The total indicative timeline from project initiation to first sukuk issuance is 12 to 17 weeks, depending on the complexity of integrations and the pace of Sharia board review cycles. This timeline reflects DALP's configuration-driven deployment model, where the platform's pre-built capabilities compress what would otherwise be a multi-month custom development programme.

---

## Coverage and Gaps Summary

Transparency builds trust, and GDB should have a clear view of where DALP provides native capability, where configuration and integration deliver the requirement, and where gaps exist.

| Requirement Area | DALP Coverage | Notes |
| --- | --- | --- |
| Ijara sukuk structure | Native (bond asset class + metadata + collateral) | Underlying asset tracking through metadata and collateral module |
| Murabaha sukuk structure | Native (bond asset class + metadata + distribution) | Profit margin calculation is external to the platform |
| Wakala sukuk structure | Native (bond asset class + metadata + distribution) | Wakeel performance monitoring is external |
| Profit-sharing distributions | Native (distribution and claims system) | Distribution amounts determined externally by GDB |
| Sharia board approval workflow | Partial (governance role + audit trail) | Multi-step quorum-based approval requires external workflow integration |
| AAOIFI standards data | Native (audit trail + event data) | AAOIFI-formatted reports require external reporting system |
| Sharia-compliant transfer rules | Partial (transfer approval module) | Price validation for murabaha secondary trading is not native |
| Asset-backing verification | Native (collateral module + trusted issuer attestation) | Physical asset inspection is external |
| Multi-jurisdictional compliance | Native (composable compliance modules) | Regulatory interpretation is GDB's responsibility |
| Identity verification / KYC | Native (OnchainID + trusted issuer framework) | KYC process execution through external provider |
| Regulatory reporting | Partial (data available through API) | Report formatting and filing are external |
| Data residency | Configurable (deployment model selection) | Per-jurisdiction data separation requires multi-deployment architecture |
| Primary issuance settlement | Native (XvP atomic settlement) | Cash leg depends on payment rail integration |
| Maturity and dissolution | Native (maturity redemption feature) | Early dissolution triggers are administrative |
| Audit trail | Native (on-chain + off-chain event logging) | Complete coverage of all platform operations |
| Sharia audit support | Native (combined audit trail + metadata + attestation) | Provides evidential basis; does not replace audit process |

---

## About SettleMint

SettleMint is a technology company focused on production-grade digital asset lifecycle management for regulated financial markets. Founded in 2016, the company has evolved from enterprise blockchain infrastructure through institutional adoption to its current platform era with DALP.

| Fact | Detail |
| --- | --- |
| Founded | 2016 |
| Headquarters | Leuven, Belgium |
| Operating regions | Europe, GCC, Southeast Asia |
| Platform | DALP (Digital Asset Lifecycle Platform) |
| Target markets | Banking, capital markets, sovereign finance, development finance |
| Certifications | ISO 27001, SOC 2 Type II (deployment-dependent) |
| Token standard | ERC-3643 / SMART Protocol |
| Deployment models | On-premises, private cloud, managed SaaS |

SettleMint's experience spans multiple GCC deployments, capital markets infrastructure, and sovereign-grade programmes. The company operates as a platform provider, not as a custodian, exchange operator, or legal advisor. The platform is the product; the institution operates it.

---

**Document Classification:** Confidential
**Prepared by:** SettleMint NV
**Date:** April 2026
**Valid until:** July 2026
