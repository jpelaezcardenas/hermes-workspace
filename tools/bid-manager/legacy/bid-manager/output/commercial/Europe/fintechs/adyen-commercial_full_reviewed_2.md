# Tokenized Payment Infrastructure
## Commercial Proposal for Adyen N.V.
### SettleMint | March 2026 | v1.0 | SettleMint Confidential

---

**Prepared by:** SettleMint NV
**Prepared for:** Adyen N.V., Amsterdam, Netherlands
**Document reference:** SM-COMM-ADYEN-2026-001
**Classification:** Strictly Confidential
**Version:** 1.0
**Date:** March 2026

---

## Table of Contents

1. Executive Summary
2. Investment Rationale
3. Licensing Model
4. Deployment Options and Pricing
5. Support and SLA Framework
6. Implementation Investment
7. Commercial Terms
8. Total Cost of Ownership
9. Reference Clients
10. Next Steps

---

## Executive Summary

Adyen's tokenized payment infrastructure programme represents a strategic investment in the payment rails that will define competitive differentiation in European merchant acquiring over the next decade. The question is not whether to build this capability, but whether to build it through custom development, which historically costs 18 to 24 months and EUR 3 to 8 million before a production-capable service is live, or through DALP, SettleMint's production-grade Digital Asset Lifecycle Platform, which delivers the same capability in 15 to 19 weeks with a fraction of the ongoing operational overhead.

This commercial proposal structures the investment for Adyen's tokenized payment programme in a way that is transparent, scalable, and predictable. The total investment to reach production-capable EUR stablecoin merchant settlement is EUR 395,000 to EUR 465,000 in implementation fees, plus annual platform licensing of EUR 280,000 to EUR 350,000 for the Enterprise tier. Over a 3-year period, the total cost of ownership for DALP compares favourably against the build alternative at every volume level above pilot scale, and creates a significantly lower operational risk profile.

The commercial structure reflects SettleMint's operating model as a platform company, not a consulting firm. Implementation fees cover the defined 6-phase delivery programme. Platform licensing provides access to DALP's full capability set, ongoing development, and compliance module updates as regulatory requirements evolve. Support fees provide the 24/7/365 Enterprise support that payment infrastructure requires. There are no hidden professional services dependencies, no mandatory managed operations, and no pricing structures that penalize Adyen for growing transaction volumes within the licensed tier.

SettleMint is committed to transparent commercial terms that support Adyen's procurement, legal, risk, and finance teams. Pricing in this proposal is fixed for the contract term with defined cost drivers for expansion. Implementation assumptions are explicitly stated. Out-of-scope work is defined rather than discovered. Exit assistance is included rather than negotiated at end of term.

### Investment Summary

| Investment Category | Year 1 | Year 2 | Year 3 | 3-Year Total |
|---|---|---|---|---|
| Implementation (one-time) | EUR 430,000 | - | - | EUR 430,000 |
| Platform License (Enterprise) | EUR 280,000 | EUR 280,000 | EUR 308,000 | EUR 868,000 |
| Enterprise Support | EUR 120,000 | EUR 120,000 | EUR 120,000 | EUR 360,000 |
| Infrastructure (Private Cloud estimate) | EUR 60,000 | EUR 65,000 | EUR 70,000 | EUR 195,000 |
| **Total** | **EUR 890,000** | **EUR 465,000** | **EUR 498,000** | **EUR 1,853,000** |

The Year 1 figure includes the one-time implementation investment. From Year 2, the annual operating cost is approximately EUR 465,000 to EUR 498,000 for a production EUR stablecoin merchant settlement service. This represents a predictable, fixed operating cost for payment infrastructure that, once live, provides competitive differentiation in merchant settlement and treasury management.

---

## Investment Rationale

### The Cost of the Current Approach

Adyen's current payment settlement model operates on traditional card network and correspondent banking rails that were designed for a different era. The costs are embedded in the operational model and often underestimated precisely because they are treated as fixed infrastructure costs rather than efficiency opportunities.

Cross-border settlement costs for international merchant acquiring typically run to 1.0 to 2.5 percent of transaction value in correspondent banking fees, FX spread, and intermediary charges. For a merchant settling EUR 10 million monthly in cross-border transactions, this represents EUR 100,000 to EUR 250,000 in annual settlement friction. At Adyen's scale of hundreds of billions in payment volume, the aggregate cost is material.

Settlement delay creates working capital inefficiency for merchants. T+2 settlement on card networks means merchants are effectively providing Adyen (and the card networks) with unsecured short-term credit of approximately 1 to 2 days of their payment volume. For a mid-market merchant with EUR 1 million monthly card volume, this represents approximately EUR 65,000 to EUR 130,000 in permanently deployed working capital that generates no return.

Operational overhead for cross-border reconciliation: managing settlement discrepancies, investigating failed transfers, reconciling multi-currency positions, and handling chargeback flows across different settlement windows creates significant operations team cost. The industry estimate for reconciliation overhead in multi-currency payment operations runs to 0.5 to 1.0 FTE per EUR 500 million in annual payment volume.

These costs are structural in traditional payment rails. They are not addressable through operational efficiency improvements; they require infrastructure change.

### Why DALP Changes the Economics

DALP's tokenized payment infrastructure addresses each of these cost drivers through architectural change rather than process optimization.

Settlement finality in seconds versus days eliminates the working capital inefficiency of T+2 settlement. Merchants receiving stablecoin settlement have confirmed access to funds within seconds of payment authorization, eliminating the settlement delay entirely. For Adyen, this creates a new value proposition: guaranteed T+0 settlement as a premium service offering to merchants willing to operate with stablecoin balances.

Atomic XvP settlement eliminates correspondent banking intermediation for cross-border payments. When both legs of a cross-currency payment settle simultaneously in a single atomic transaction, correspondent banking chains are bypassed. The direct settlement path reduces FX settlement costs by eliminating intermediary margins and reducing the number of settlement hops. The Maybank Project Photon implementation demonstrated this model in production for MYR/USD cross-currency settlement.

Programmable treasury management creates new revenue opportunities for Adyen. Merchant treasury balances held in stablecoins can generate yield through DALP's fixed treasury yield feature, creating a revenue-sharing opportunity that traditional correspondent accounts cannot support. Programmable hedging at the smart contract level eliminates manual FX management for multi-currency merchant positions.

Compliance automation reduces the operational cost of maintaining AML/CFT and MiCA compliance at scale. DALP's ex-ante compliance enforcement eliminates the post-trade review overhead that manual compliance monitoring requires. Every transfer is compliance-validated before execution, producing an auditable evidence trail without additional compliance operations cost.

### ROI Framework

The return on investment for Adyen's tokenized payment infrastructure programme operates across three value drivers: cost reduction, revenue creation, and competitive positioning.

**Cost reduction (Year 2-3 annualized):**

Cross-border settlement cost reduction through correspondent banking bypass: assumes 10 percent of Adyen's cross-border volume migrates to tokenized settlement in Year 2. At 1.5 percent average correspondent banking cost and EUR 50 billion in relevant volume, 10 percent migration produces EUR 75 million in addressable cost reduction, with DALP enabling Adyen to capture a portion of this through margin improvement and merchant value sharing.

Reconciliation overhead reduction: T+0 atomic settlement eliminates the 1 to 2 day settlement window that creates most reconciliation breaks. Estimate 30 to 50 percent reduction in reconciliation operations overhead for migrated volume.

**Revenue creation (Year 2-3 annualized):**

Premium T+0 settlement service: Adyen can charge a service premium for guaranteed T+0 stablecoin settlement. An additional 10 to 20 basis points on premium settlement volume creates direct revenue. For EUR 5 billion in premium settlement volume, this is EUR 5 to EUR 10 million in additional annual revenue.

Treasury yield sharing on stablecoin balances: reserve assets held to back stablecoin supply generate yield in the current rate environment. Sharing a portion of this yield with merchants creates a merchant retention mechanism while generating reserve yield revenue for Adyen.

**Competitive positioning (strategic value):**

Early mover advantage in MiCA-compliant stablecoin infrastructure: Adyen is positioned to be the first major European payment infrastructure provider with a production-grade MiCA-compliant tokenized settlement service. This creates a multi-year competitive lead over acquirers who wait for the capability to become commodity.

### Build vs. Buy Analysis

| Factor | Custom Build | DALP |
|---|---|---|
| Time to production | 18-24 months | 15-19 weeks |
| Initial development cost | EUR 3-8 million | EUR 430,000 (implementation) |
| Ongoing maintenance cost | EUR 1-2 million per year (engineering team) | EUR 280,000 per year (platform license) |
| Compliance module updates | Custom development per regulatory change | Included in platform license |
| Security certifications | Client responsibility (ISO 27001, SOC 2) | Included (SettleMint certified) |
| Multi-asset expansion | Additional development per asset class | Included in platform license |
| Regulatory risk | Client owns compliance architecture | SettleMint maintains compliance currency |
| Custody provider integration | Custom development | Included (Fireblocks, DFNS) |

The build alternative requires Adyen to hire and maintain a team of 5 to 8 blockchain engineers, smart contract developers, and compliance architects in addition to the implementation cost. At EUR 150,000 to EUR 250,000 fully loaded cost per engineer in the current market, the ongoing team cost alone exceeds DALP's total annual operating cost.

---

## Licensing Model

### Philosophy

SettleMint licenses DALP as a platform, not as a professional services engagement. The license fee covers access to the full platform capability set, ongoing development and platform releases, compliance module updates as regulatory requirements evolve, and the operational tooling that Adyen's teams need to run the service day to day. There is no hidden dependency on SettleMint professional services for routine platform operations.

The licensing model is structured to be predictable as Adyen's programme scales. Asset class expansion (adding GBP and USD stablecoins to the initial EUR stablecoin), merchant segment expansion (adding new merchant categories or jurisdictions), and volume growth within the licensed tier do not trigger incremental license fees. Adyen pays for the platform capability level, not per transaction, per merchant, or per asset class within the licensed tier.

### What Is Included in the Platform License

All tiers include the complete DALP platform capability set: the Asset Console, DAPI (Durable API), Execution Engine (Restate), Key Guardian (encrypted database and cloud KMS tiers), Chain Indexer, Chain Gateway, Feeds System, and observability stack (Grafana, VictoriaMetrics, Loki, Tempo). All seven asset class templates plus the configurable token. All 18 compliance module types. XvP settlement contracts. OnchainID identity system. REST API (OpenAPI 3.1), TypeScript SDK, CLI, and event webhooks. Multi-chain EVM support. Helm-based deployment tooling and deployment documentation. Release updates per the contracted update cadence. Standard compliance module updates when regulatory requirements mandate changes.

### What Varies by Tier

Foundation tier: standard deployment with encrypted database key storage, standard support (business hours, 99.9% SLA), quarterly release cadence. Appropriate for development, staging, and non-critical production environments.

Enterprise tier: production-grade deployment with cloud KMS or HSM key storage, Premium or Enterprise support (extended or 24/7 coverage, 99.95% or 99.99% SLA), monthly or continuous release cadence, HSM key management integration, Fireblocks and DFNS custody connectors, ISO 20022 payment rail connectivity. Recommended for Adyen's production payment infrastructure.

Sovereign tier: maximum security and operational control, on-premises deployment support, HSM key management mandatory, dedicated support team with 99.99% SLA, custom release coordination, air-gap deployment capability. Appropriate for sovereign and national-scale programmes.

### Platform Tiers and Annual License Fees

| Tier | Annual License | Target Use Case |
|---|---|---|
| Foundation | EUR 80,000 | Development, staging, non-critical environments |
| Enterprise | EUR 280,000 | Production payment infrastructure; SettleMint recommendation for Adyen |
| Sovereign | EUR 480,000 | Sovereign-scale or maximum-security environments |

The Enterprise tier is appropriate for Adyen's production tokenized payment infrastructure. The license includes production-grade deployment, HSM key management, Fireblocks and DFNS custody integration, ISO 20022 connectivity, and Enterprise support eligibility.

For Adyen's full programme (development, staging, and production environments), a multi-environment license is available:

- Production: Enterprise tier EUR 280,000
- Staging: Foundation tier EUR 40,000 (50% discount on non-production)
- Development: Foundation tier EUR 20,000 (75% discount on development)
- **Total multi-environment: EUR 340,000 per year**

### License Term and Conditions

Minimum license term: 3 years (recommended for production payment infrastructure programmes requiring stability and investment protection). Annual payment in advance. Annual license escalation: CPI-based escalation capped at 5 percent per year. Multi-year prepayment discount: 5 percent discount for 3-year prepayment; 10 percent for 5-year prepayment.

---

## Deployment Options and Pricing

### Managed SaaS

SettleMint operates and manages the full DALP platform on dedicated cloud infrastructure. Included in the Enterprise license for development and staging environments. Available for production deployment at no additional infrastructure management fee (Adyen pays only for underlying cloud infrastructure costs).

Recommended for: development and staging environments; initial production deployment where fastest time-to-production is the priority.

Infrastructure cost estimate (included in Enterprise license or passed through at cost): approximately EUR 25,000 to EUR 40,000 per year for development and staging combined. Production Managed SaaS infrastructure: approximately EUR 60,000 to EUR 80,000 per year depending on transaction volume and data retention requirements.

### Private Cloud (Recommended for Production)

DALP deployed in Adyen's own cloud environment (AWS, Azure, or GCP) using Helm charts. Adyen manages the infrastructure layer; SettleMint provides deployment tooling, configuration guidance, and platform-level support.

Infrastructure cost estimate for Adyen's production deployment:

| Component | Monthly Cost (AWS estimate) | Annual |
|---|---|---|
| EKS cluster (3x m5.2xlarge, multi-AZ) | EUR 1,200 | EUR 14,400 |
| RDS PostgreSQL (db.r5.xlarge Multi-AZ) | EUR 800 | EUR 9,600 |
| S3 object storage (5TB) | EUR 120 | EUR 1,440 |
| Secrets Manager, Key Management | EUR 200 | EUR 2,400 |
| Network and data transfer | EUR 300 | EUR 3,600 |
| Besu validator nodes (2x t3.xlarge) | EUR 400 | EUR 4,800 |
| **Total infrastructure estimate** | **EUR 3,020/month** | **EUR 36,240/year** |

Production infrastructure costs are owned by Adyen as part of their cloud account. SettleMint does not mark up cloud infrastructure costs.

### Hybrid (Recommended)

Development and staging environments in Managed SaaS; production in Adyen's Private Cloud. This provides the fastest path to development and testing while meeting Adyen's production infrastructure governance requirements.

Total infrastructure investment under the hybrid model:

- Managed SaaS development and staging: EUR 40,000 per year (included in Foundation tier license)
- Adyen Private Cloud production: EUR 36,000 to EUR 60,000 per year (Adyen's cloud account)

### Additional Deployment Considerations

Blockchain node infrastructure: for a private Hyperledger Besu network, additional validator node infrastructure within Adyen's cloud environment. Estimated EUR 10,000 to EUR 20,000 per year for 3 to 5 validator nodes on appropriately sized cloud instances.

Fireblocks or DFNS custody: institutional MPC custody fees are charged directly by the custody provider, not through SettleMint. Typical institutional MPC pricing runs to EUR 30,000 to EUR 80,000 per year depending on signing volume and tier. These costs are third-party pass-through costs disclosed separately per the RFP requirements.

---

## Support and SLA Framework

### Recommended Support Tier: Enterprise

Enterprise Support is required for payment infrastructure operating under DNB supervision and MiCA obligations with 24/7/365 merchant-facing availability expectations.

| Attribute | Enterprise Support |
|---|---|
| Annual Fee | EUR 120,000 |
| Coverage Hours | 24/7/365 |
| Uptime SLA | 99.99% monthly |
| P1 Response Time | 15 minutes |
| P1 Resolution Target | 2 hours |
| P2 Response Time | 1 hour |
| P2 Resolution Target | 4 hours |
| Dedicated Support Team | Named team |
| Customer Success Manager | Named CSM |
| Quarterly Architecture Reviews | Included |
| Bi-weekly Operational Reviews | Included |

### Support Tier Comparison

| Feature | Standard | Premium | Enterprise |
|---|---|---|---|
| Annual fee | EUR 40,000 | EUR 72,000 | EUR 120,000 |
| Coverage | Business hours | Extended hours | 24/7/365 |
| Uptime SLA | 99.9% | 99.95% | 99.99% |
| P1 response | 4 hours | 1 hour | 15 minutes |
| P1 resolution | 8 hours | 4 hours | 2 hours |
| Dedicated engineer | No | Named individual | Named team |
| CSM | No | No | Named CSM |

For Adyen's payment infrastructure, Standard or Premium support is not recommended. The P1 response target of 4 hours (Standard) or 1 hour (Premium) is incompatible with the operational availability requirements of merchant-facing payment infrastructure. A 4-hour P1 response window during a settlement processing failure would represent a material incident affecting merchant cash flow and Adyen's service commitments.

### Service Credits

Service credits are available when SettleMint fails to meet the contracted uptime SLA:

| Monthly Uptime Achieved | Credit |
|---|---|
| Below 99.99% but at or above 99.0% | 10% of monthly support fees |
| Below 99.0% but at or above 98.0% | 25% of monthly support fees |
| Below 98.0% | 50% of monthly support fees |

Credits are applied to the following month's invoice and are the sole remedy for SLA breaches. Maximum credit is 50% of monthly support fees.

---

## Implementation Investment

### Implementation Philosophy

SettleMint prices implementation on a milestone-based structure with defined scope, explicit assumptions, and clear exclusions. Implementation fees cover the defined 6-phase delivery programme for Adyen's tokenized payment infrastructure, from discovery through hypercare. They do not include ongoing professional services, managed operations, or advisory work beyond the implementation programme.

Out-of-scope changes are managed through a formal change request process with impact assessment (timeline, cost, risk) before implementation. Scope changes discovered during discovery are priced in the Phase 1 deliverables; scope changes after Phase 1 gate review follow change control.

### Phase-by-Phase Implementation Fees

| Phase | Scope | Duration | Fee |
|---|---|---|---|
| Phase 1: Discovery and Requirements | Stakeholder interviews, current state assessment, regulatory mapping, network selection analysis, architecture design, risk assessment | 3 weeks | EUR 45,000 |
| Phase 2: Configuration and Setup | Environment provisioning (3 environments), stablecoin token configuration, compliance module setup, identity framework, custody integration design, API integration design | 4 weeks | EUR 75,000 |
| Phase 3: Integration | Payout engine integration, custody connector, KYC/AML integration, ISO 20022 cash leg, observability integration, IAM integration | 4 weeks | EUR 120,000 |
| Phase 4: Testing and UAT | Functional testing, security testing, performance testing, compliance validation, UAT support, go-live readiness assessment | 3 weeks | EUR 90,000 |
| Phase 5: Go-Live | Production deployment, configuration migration, go-live validation, dedicated go-live support | 1 week | EUR 50,000 |
| Phase 6: Hypercare | Intensive monitoring, performance optimization, knowledge transfer (all roles), support transition | 4 weeks | EUR 50,000 |
| **Total Implementation Investment** | | **19 weeks** | **EUR 430,000** |

### Implementation Assumptions

The following assumptions are incorporated in the implementation pricing. Scope items that fall outside these assumptions are subject to change request pricing.

Technology readiness: Adyen provides access to existing systems APIs (payout engine, treasury, IAM) and sandbox/test environments for integration development. API documentation and access credentials are available within 1 week of Phase 2 start.

Blockchain network: implementation pricing assumes a private Hyperledger Besu network or Polygon PoS as the target blockchain. Ethereum mainnet deployment would increase Phase 2 through Phase 4 fees by approximately EUR 20,000 due to mainnet-specific testing and gas management complexity.

Custody provider: implementation pricing assumes Fireblocks or DFNS integration. If Adyen has an existing enterprise custody provider not currently supported by DALP's unified signer abstraction, a custom signer adapter may be required (scoped separately as a change request if applicable).

Asset scope: Phase 1 implementation covers EUR stablecoin merchant settlement. Phase 2 (GBP and USD stablecoins, cross-currency XvP) and Phase 3 (adjacent services) require a separate implementation engagement quoted on the scope defined in Phase 1 discovery.

Adyen resource availability: Adyen makes designated stakeholders available per the resource requirements defined in the Technical Proposal. Delays caused by Adyen resource unavailability may extend timelines and trigger timeline change requests.

### Out-of-Scope Items

The following items are not included in the implementation investment and would be scoped separately if required:

- Custom signer adapter for a custody provider not currently supported by DALP
- Custom compliance module development for rules not covered by DALP's 18 module types
- Data migration from legacy systems (Adyen's existing merchant registry, historical transaction data)
- Custom reporting development beyond DALP's standard Grafana dashboards and data export APIs
- Phase 2 or Phase 3 implementation (multi-currency, adjacent services)
- Regulatory advisory services or legal review of MiCA compliance posture

### Change Request Day Rate

Post-Phase 1 scope changes are quoted using SettleMint's published day rate structure:

| Role | Day Rate (EUR) |
|---|---|
| Solution Architect | 2,500 |
| Platform Engineer | 2,000 |
| Integration Engineer | 2,000 |
| Security Engineer | 2,200 |
| Delivery Lead | 2,200 |

Change requests are quoted with defined scope, effort estimate, timeline impact, and risk assessment before implementation begins.

---

## Commercial Terms

### Contract Structure

SettleMint proposes a Master Services Agreement (MSA) with:

Platform License Agreement covering the Enterprise tier DALP license for the contracted term (recommended 3 years).

Implementation Statement of Work (SOW) covering the defined 6-phase implementation programme with milestone-based payment schedule.

Support Services Agreement covering Enterprise Support for the license term.

Data Processing Agreement (DPA) under GDPR covering SettleMint's role as data processor for personal data processed in DALP's identity management system.

### Payment Schedule

| Milestone | Payment | Amount (EUR) |
|---|---|---|
| Contract execution | Platform license Year 1 (50% advance) | 140,000 |
| Contract execution | Phase 1: Discovery commencement | 45,000 |
| Phase 1 gate review sign-off | Phase 2: Configuration commencement | 75,000 |
| Phase 2 gate review sign-off | Phase 3: Integration commencement | 60,000 |
| Phase 3 gate review sign-off | Phase 4: Testing commencement | 60,000 |
| Phase 4 gate review sign-off | Phase 5 and 6 balance | 90,000 |
| Production go-live | Platform license Year 1 (50% balance) | 140,000 |
| Annual renewal (Year 2) | Platform license Year 2 | 280,000 |
| Annual renewal (Year 2) | Support Year 2 | 120,000 |
| Annual renewal (Year 3) | Platform license Year 3 | 308,000 |
| Annual renewal (Year 3) | Support Year 3 | 120,000 |

Support fees are invoiced annually in advance from contract execution.

### Minimum Contract Term

Recommended minimum term: 3 years. Rationale: payment infrastructure programmes require investment stability. A 3-year term provides Adyen with pricing certainty and SettleMint with the relationship duration required to deliver full programme value.

Annual break right: Adyen retains the right to terminate at each annual renewal with 90 days written notice, subject to payment of any outstanding fees and triggering exit assistance obligations.

### Renewal Terms

Renewal at contract expiry: automatic renewal for 1-year terms unless 90 days written notice of non-renewal. License fees at renewal are subject to the annual escalation cap (CPI-based, maximum 5 percent per year). SettleMint provides a renewal pricing proposal 120 days before expiry.

### Representations and Warranties

SettleMint warrants that DALP will perform materially in accordance with the documentation for the license term. Platform security certifications (ISO 27001, SOC 2 Type II) are maintained throughout the contract term. SettleMint discloses material changes to custody provider relationships, certification status, or ownership structure within 30 days.

### Limitation of Liability

SettleMint's total liability to Adyen under the agreement is limited to the fees paid in the 12 months preceding the claim. Consequential, indirect, and punitive damages are excluded. Service credit provisions are the sole remedy for SLA breaches.

### Intellectual Property

Adyen retains ownership of all data stored in DALP's systems (token positions, transaction history, identity records, audit logs). DALP platform software and SettleMint IP are licensed, not transferred. Configuration and customization developed specifically for Adyen (custom claim types, custom webhook configurations, custom Grafana dashboards) remains Adyen's property.

### Exit Assistance and Data Portability

SettleMint provides exit assistance on notice of termination or non-renewal:

Complete data export in machine-readable format (JSON, CSV, structured database dumps) for all token positions, transaction history, compliance events, identity records, and configuration. 90-day post-termination data access period for extraction completion. Configuration documentation in human-readable and machine-readable formats. Technical handover session (up to 3 days) with successor vendor or Adyen internal team. Audit log preservation and export for the contractually required retention period beyond contract term.

Exit assistance fees: included for standard exit scenarios. Extended transition support (more than 3 days of technical handover) billed at standard day rates.

---

## Total Cost of Ownership

### 3-Year Total Cost of Ownership Model

The 3-year TCO model assumes: Enterprise tier production license, Foundation tier development/staging license, Enterprise Support, Private Cloud deployment (Adyen manages infrastructure), EUR stablecoin Phase 1 scope in Year 1, multi-currency expansion in Year 2, and adjacent services in Year 3.

| Cost Category | Year 1 | Year 2 | Year 3 | 3-Year Total |
|---|---|---|---|---|
| **SettleMint Fees** | | | | |
| Platform License (Enterprise Production) | EUR 280,000 | EUR 280,000 | EUR 308,000 | EUR 868,000 |
| Platform License (Foundation Dev/Staging) | EUR 60,000 | EUR 60,000 | EUR 66,000 | EUR 186,000 |
| Enterprise Support | EUR 120,000 | EUR 120,000 | EUR 120,000 | EUR 360,000 |
| Implementation (Phase 1-3 scope) | EUR 430,000 | - | - | EUR 430,000 |
| Phase 2 Implementation (multi-currency) | - | EUR 150,000 | - | EUR 150,000 |
| Phase 3 Implementation (adjacent services) | - | - | EUR 120,000 | EUR 120,000 |
| **SettleMint Fees Subtotal** | **EUR 890,000** | **EUR 610,000** | **EUR 614,000** | **EUR 2,114,000** |
| **Third-Party Infrastructure** | | | | |
| Adyen Private Cloud (AWS/Azure/GCP) | EUR 50,000 | EUR 55,000 | EUR 60,000 | EUR 165,000 |
| Blockchain node infrastructure | EUR 15,000 | EUR 15,000 | EUR 15,000 | EUR 45,000 |
| Fireblocks/DFNS custody fees | EUR 50,000 | EUR 55,000 | EUR 60,000 | EUR 165,000 |
| **Third-Party Subtotal** | **EUR 115,000** | **EUR 125,000** | **EUR 135,000** | **EUR 375,000** |
| **Internal Adyen Costs** | | | | |
| Adyen engineering team (integration, 1.5 FTE) | EUR 225,000 | EUR 75,000 | EUR 75,000 | EUR 375,000 |
| Adyen operations and compliance setup | EUR 50,000 | EUR 25,000 | EUR 25,000 | EUR 100,000 |
| **Internal Costs Subtotal** | **EUR 275,000** | **EUR 100,000** | **EUR 100,000** | **EUR 475,000** |
| **Total 3-Year TCO** | **EUR 1,280,000** | **EUR 835,000** | **EUR 849,000** | **EUR 2,964,000** |

### 5-Year Total Cost of Ownership Model

Extending to 5 years with Year 4 and Year 5 representing steady-state operations with no additional implementation investment:

| Cost Category | Years 1-3 | Year 4 | Year 5 | 5-Year Total |
|---|---|---|---|---|
| SettleMint Fees (platform + support) | EUR 2,114,000 | EUR 455,000 | EUR 478,000 | EUR 3,047,000 |
| Third-Party Infrastructure | EUR 375,000 | EUR 145,000 | EUR 150,000 | EUR 670,000 |
| Internal Adyen Costs | EUR 475,000 | EUR 100,000 | EUR 100,000 | EUR 675,000 |
| **5-Year Total TCO** | **EUR 2,964,000** | **EUR 700,000** | **EUR 728,000** | **EUR 4,392,000** |

Annualized steady-state cost from Year 2: approximately EUR 700,000 to EUR 730,000 per year for a production multi-currency tokenized payment infrastructure with adjacent services.

### Build vs. Buy TCO Comparison

For comparison, the estimated TCO for custom development of equivalent capability:

| Cost Category | Years 1-3 | Year 4 | Year 5 | 5-Year Total |
|---|---|---|---|---|
| Initial development (6-8 engineer team, 24 months) | EUR 3,600,000 | - | - | EUR 3,600,000 |
| Ongoing engineering team (4 FTE, maintenance + enhancements) | - | EUR 800,000 | EUR 800,000 | EUR 1,600,000 |
| Security certifications and compliance (ongoing) | EUR 150,000 | EUR 80,000 | EUR 80,000 | EUR 310,000 |
| Infrastructure | EUR 200,000 | EUR 80,000 | EUR 90,000 | EUR 370,000 |
| Custody integration and management | EUR 150,000 | EUR 60,000 | EUR 60,000 | EUR 270,000 |
| **Custom Build 5-Year TCO** | | | | **EUR 6,150,000** |

DALP's 5-year TCO of EUR 4.4 million compares to the custom build alternative of EUR 6.2 million, a 29 percent cost advantage. More significantly, the DALP route delivers production capability in under 5 months versus 18 to 24 months for custom development, representing 13 to 19 months of earlier revenue and competitive differentiation.

### Risk-Adjusted Comparison

The build alternative carries implementation risk not reflected in the headline cost comparison. Blockchain infrastructure development projects consistently encounter delays of 30 to 60 percent over initial estimates. At the median overrun, the custom build cost rises to EUR 7 to EUR 9 million. DALP's implementation risk is bounded by SettleMint's milestone-based pricing and reference deployments demonstrating the timeline.

---

## Reference Clients

### Maybank Project Photon

Maybank engaged SettleMint to implement FX tokenization and cross-border settlement using the Exchange-versus-Payment (XvP) model, directly analogous to Adyen's cross-border payment settlement requirements. The programme implemented the MYRT tokenized Malaysian Ringgit with atomic cross-currency swaps, eliminating correspondent banking intermediation for cross-border settlement flows. The implementation operated under Bank Negara Malaysia's Digital Asset Innovation Hub regulatory framework, demonstrating the regulatory engagement model applicable to Adyen's DNB context.

Commercial context: The Maybank engagement was structured similarly to the Adyen proposal, with milestone-based implementation fees and an annual platform license. The programme expanded from Phase 1 (single currency stablecoin) to Phase 2 (cross-currency XvP) within the same DALP instance without requiring new infrastructure or additional platform licensing.

### Commerzbank

Commerzbank deployed DALP for hybrid on/off-chain ETP issuance and management with Boerse Stuttgart listing service integration, achieving settlement under 10 seconds and identifying EUR 7 million in annual operational savings. The engagement demonstrated DALP's ability to satisfy the security review, vendor risk assessment, and change control processes of a major European regulated institution.

Commercial context: The Commerzbank engagement was the first European production deployment of DALP at institutional scale. The implementation timeline was comparable to the proposal for Adyen. The EUR 7 million annual savings identification was produced during Phase 1 discovery as part of the investment rationale analysis.

### OCBC Bank

OCBC Bank deployed DALP as a security token engine for structured financial products, integrating with off-chain securities registries, cash settlement systems, and core banking through DALP's API layer. The deployment demonstrated DALP's ability to operate as an integration middleware layer within an existing institutional payment and investment product infrastructure.

Commercial context: The OCBC engagement demonstrated the multi-product expansion model: initial deployment for a single investment product expanded to multiple asset classes using the same DALP instance and platform license. This expansion pattern is directly relevant to Adyen's Phase 1 through Phase 3 roadmap.

### Commercial Reference Availability

SettleMint can arrange reference calls with commercial and technical stakeholders from the above engagements, subject to confidentiality constraints. Reference calls typically cover implementation experience, commercial model satisfaction, support quality, and platform capability assessment. Reference call arrangements are made within 5 business days of written request from the shortlisted evaluation committee.

---

## Next Steps

### Immediate Actions Following Submission

SettleMint has submitted this proposal by the 24 April 2026 deadline per the RFP requirements. Following submission, we propose the following engagement sequence aligned with Adyen's evaluation timeline.

**Clarification Period (by 03 April 2026 for clarifications; Adyen response 10 April 2026)**

SettleMint is available to respond to clarification questions on any aspect of this technical or commercial proposal. Clarification questions can be directed to the SettleMint bid lead. SettleMint commits to responding to clarification questions within 2 business days.

**Shortlist Notification (by 15 May 2026)**

On shortlist notification, SettleMint is prepared to arrange the following within 5 business days: architecture walkthrough session (2 hours) with Adyen's technical evaluation team, demonstrating DALP's API surface, compliance enforcement model, and settlement workflow; control deep-dive session (1.5 hours) with Adyen's security and compliance teams, covering security architecture, DORA compliance, and audit evidence; live platform demonstration with Adyen-specific scenarios including EUR stablecoin configuration, merchant onboarding, XvP settlement execution, and compliance module testing.

**Deep-Dive Sessions and Demos (Late May 2026)**

SettleMint proposes the following agenda for Adyen's deep-dive sessions: Day 1 morning: technical architecture deep-dive and API demonstration. Day 1 afternoon: security, compliance, and regulatory framework session. Day 2 morning: implementation programme review with Adyen's project management and engineering team. Day 2 afternoon: commercial discussion and contract framework review.

**Reference Calls**

SettleMint will arrange reference calls with Commerzbank, Maybank, and/or OCBC within 5 business days of written request from Adyen's shortlist evaluation committee.

**Target Award Recommendation (June 2026)**

Following deep-dive sessions and reference calls, SettleMint is prepared to support Adyen's award recommendation process by providing: binding implementation timeline and milestone confirmation; contract-ready term sheet incorporating agreed commercial terms; detailed assumptions register confirming all scope and dependency assumptions; security assessment artefacts for Adyen's vendor risk assessment process (ISO 27001 certificate, SOC 2 Type II report summary, penetration test attestation).

**Implementation Start (Q3 2026)**

On contract execution, SettleMint mobilizes the delivery team within 5 business days. Phase 1 kickoff workshop is scheduled within 10 business days of contract execution. The proposed production go-live date of mid-October 2026 is achievable with contract execution by end of June 2026.

### Primary Contacts

**Executive Sponsor (SettleMint):** Available for escalation and executive engagement throughout the procurement process.

**Bid Lead (SettleMint):** Primary point of contact for all clarifications, evaluation engagement, and contract negotiation. Contact: bids@settlemint.com.

**Solution Architect (SettleMint):** Available for technical deep-dive sessions, architecture walkthrough, and control review.

SettleMint views this procurement as the beginning of a long-term partnership to build and operate tokenized payment infrastructure that positions Adyen at the forefront of European payment innovation. We are committed to the evaluation process and confident that this proposal demonstrates the capability, credibility, and commercial transparency that Adyen requires.

---

*Document Classification: SettleMint Confidential*
*This proposal contains commercially sensitive and proprietary information. Distribution is restricted to authorized Adyen procurement and evaluation personnel.*
*SettleMint NV | Simon Bolivarlaan 5, 2600 Antwerp, Belgium | www.settlemint.com*

---

## Appendix: Commercial Assumptions and Dependencies Register

### Assumptions

This section states explicitly all assumptions incorporated in the pricing and implementation scope. Adyen's evaluation team should review these assumptions and flag any discrepancies before contract execution.

**Implementation Scope Assumptions**

The Phase 1 implementation covers the EUR stablecoin merchant settlement use case on a single blockchain network (private Besu or Polygon PoS). GBP and USD stablecoin tokens are addressed in Phase 2 (separately scoped). Adjacent services (merchant bonds, loyalty tokens, treasury products) are addressed in Phase 3 (separately scoped).

API integration with Adyen's payout engine is based on a documented REST API interface. If Adyen's payout engine requires message queue integration (e.g., Kafka, RabbitMQ) rather than REST/webhook, integration effort increases and a change request may be required.

Custody integration assumes Fireblocks or DFNS. If Adyen has an existing institutional custody provider not currently supported by DALP's unified signer abstraction, custom signer adapter development is required (estimated 3 to 5 weeks, change request).

KYC/AML provider integration assumes an OpenID Connect-compatible claim issuance API or equivalent structured API output. If Adyen's KYC provider requires custom integration development, this is scoped as a change request.

Phase 1 merchant onboarding scope: batch onboarding workflow covers up to 10,000 merchants using the DALP batch API (100 per call, sequential processing). Merchant data migration from Adyen's existing systems is not included and would be scoped separately.

**Timeline Assumptions**

The 15 to 19 week implementation timeline assumes Adyen makes designated stakeholders available per the resource requirements in the Technical Proposal. Delay caused by Adyen resource unavailability or decision-making delays at gate reviews will result in timeline extension on a day-for-day basis.

Regulatory engagement with DNB is Adyen's responsibility. SettleMint provides compliance evidence and documentation to support DNB engagement but does not conduct regulatory negotiations on Adyen's behalf.

Security review by Adyen's InfoSec team during Phase 4 is expected to complete within the 3-week Phase 4 window. Extended security review requirements may require timeline extension.

**Commercial Assumptions**

Pricing is in EUR and valid for 180 days from proposal submission (24 April 2026). All fees are exclusive of applicable taxes (VAT). SettleMint is registered in Belgium; VAT treatment depends on Adyen's VAT registration status and applicable B2B rules.

Infrastructure costs for Adyen's Private Cloud deployment are estimates based on current AWS pricing and standard DALP sizing guidelines. Actual costs may vary based on Adyen's cloud provider pricing, reserved instance discounts, and actual transaction volumes.

Fireblocks and DFNS custody fees are third-party costs estimated from published pricing. Actual fees depend on Adyen's negotiated custody agreement.

### Third-Party Dependencies Register

| Dependency | Provider | Cost (Estimated Annual) | Adyen or SettleMint Responsibility | Risk |
|---|---|---|---|---|
| MPC Custody | Fireblocks or DFNS | EUR 30,000-80,000 | Adyen procurement | Medium: Adyen must have enterprise custody contract; switching between providers requires only configuration change |
| Blockchain RPC Endpoints | Infura, Alchemy, QuickNode, or equivalent | EUR 5,000-15,000 | Adyen for production; SettleMint for Managed SaaS | Low: multiple providers available; Chain Gateway manages failover |
| Blockchain Validator Infrastructure | Adyen-operated Besu nodes or public L2 | EUR 10,000-20,000 | Adyen for private Besu; network-native for public L2 | Low: managed by DALP deployment tooling |
| KYC/AML Provider | Adyen's existing provider | Existing contract | Adyen | Low: DALP integrates with any OpenID Connect-compatible claim issuer |
| Sanctions Screening | Adyen's existing provider | Existing contract | Adyen | Low: integrates through claim issuance model |
| Cloud Infrastructure | AWS, Azure, or GCP | EUR 36,000-60,000 | Adyen | Low: standard managed cloud |

### Volume and Scalability Thresholds

The Enterprise license covers the following operational volume thresholds:

| Metric | Enterprise Tier Included | Overage |
|---|---|---|
| Active token types | Unlimited | N/A |
| Monthly on-chain transactions | Up to 1,000,000 | Contact SettleMint for pricing above this volume |
| Active merchant wallets | Up to 100,000 | Contact SettleMint for pricing above this volume |
| API requests (monthly) | Up to 50,000,000 | EUR 0.01 per 1,000 requests above threshold |
| Data storage (indexed PostgreSQL) | Up to 500 GB | EUR 0.10 per GB per month above threshold |

For Adyen's Phase 1 deployment, these thresholds are unlikely to be reached in Year 1. Phase 2 and Phase 3 expansion may approach the wallet threshold as merchant onboarding scales. SettleMint will proactively monitor usage and provide 60-day advance notice if volume approaches threshold.

### Risk Assessment: Commercial Risks

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Implementation timeline overrun affecting Year 1 production go-live | Medium | Medium | Milestone-based payment schedule means delayed milestones do not accelerate payment; SettleMint absorbs staffing cost for reasonable delays within Phase scope |
| Custody provider pricing increase | Low | Low | Multiple custody providers available; switching is a configuration change |
| Cloud infrastructure cost increase | Low | Low | Adyen controls cloud provider relationship and pricing; SettleMint not in cost chain |
| Regulatory changes requiring platform modifications | Medium | Medium | Compliance module architecture supports regulatory updates through configuration rather than code changes; MiCA implementing acts may require platform updates included in license |
| Scope expansion creating change requests | Medium | Medium | Phase 1 scope is clearly defined; change control process manages expansion; Phase 2 and Phase 3 are separately scoped and priced |

---

## Appendix: Glossary of Commercial Terms

**Annual License Fee:** The fixed annual fee for the contracted DALP platform tier, payable in advance. Covers platform capability access, release updates, and standard compliance module updates.

**Implementation Fee:** One-time fee for the defined 6-phase implementation programme, payable in milestone-linked installments per the payment schedule.

**Enterprise Support Fee:** Annual fee for Enterprise tier support covering 24/7/365 coverage, 15-minute P1 response, named support team, and Customer Success Manager.

**Third-Party Pass-Through:** Costs charged by third-party providers (custody, blockchain infrastructure, cloud) that are not included in SettleMint's fees and are payable directly by Adyen to the relevant provider.

**Change Request:** A formal scope change request following the Phase 1 gate review, including impact assessment (timeline, cost, risk) and requiring Adyen sign-off before implementation.

**Gate Review:** A formal review at the conclusion of each implementation phase. Progression to the next phase requires sign-off by designated stakeholders from both Adyen and SettleMint. Unsatisfactory gate review outcomes trigger remediation before progression.

**Service Credit:** A credit applied to the following month's invoice when SettleMint fails to meet the contracted uptime SLA. Credits are the sole remedy for SLA breaches and are capped at 50% of monthly support fees.

**Exit Assistance:** The services SettleMint provides on termination or non-renewal to support Adyen's transition, including data export, configuration documentation, and technical handover. Included in standard commercial terms for up to 3 days of technical handover.

**Platform Tier:** The capability level of the DALP license: Foundation (development/non-critical), Enterprise (production payment infrastructure), or Sovereign (maximum security, sovereign-scale).

---

## Appendix: Detailed Investment Rationale Analysis

### Quantifying the Settlement Friction Cost

The working capital cost of T+2 settlement in card networks is a concrete, calculable inefficiency that Adyen's merchant customers bear today. A merchant processing EUR 100,000 per day has approximately EUR 200,000 perpetually locked in the settlement float, representing the 2 days of revenue that has been authorized but not yet transferred. At a cost of capital of 5 percent annually, this represents a working capital cost of EUR 10,000 per year for this merchant, arising purely from settlement delay.

For Adyen's merchant portfolio at scale, the aggregate working capital impact across all merchants is substantial. If Adyen facilitates EUR 500 billion in annual transaction volume with an average T+2 settlement cycle, the aggregate merchant working capital deployed in settlement float approaches EUR 2.7 billion. The annual cost of this float to Adyen's merchant ecosystem, at 5 percent cost of capital, is approximately EUR 135 million. Stablecoin T+0 settlement eliminates this float entirely for participating merchants, creating a quantifiable value proposition that traditional payment infrastructure cannot match.

Adyen can capture a portion of this value through a premium settlement service. Merchants paying an additional 5 to 10 basis points on settled volume for T+0 finality creates direct revenue at minimal marginal cost once the infrastructure is live.

### The Regulatory Compliance Cost Trajectory

MiCA implementation creates a new regulatory compliance cost for any European payment institution offering crypto-asset services. The compliance cost of operating without purpose-built compliance infrastructure grows non-linearly with the number of asset types, jurisdictions, and investor categories under management.

Manual compliance review models, where compliance officers review individual transactions against regulatory criteria, are economically unsustainable at payment scale. DALP's ex-ante automated compliance enforcement scales compliance operations without requiring proportional compliance headcount growth. The fixed platform license cost covers compliance enforcement for any volume of transactions within the licensed tier, creating a favourable cost curve compared to manual compliance operations.

### Revenue Creation Through Treasury Innovation

Adyen's reserve assets backing stablecoin supply represent a new treasury management opportunity. In a EUR 5 percent rate environment, EUR 500 million in stablecoin reserve assets generates EUR 25 million in annual interest income. DALP's fixed treasury yield feature enables programmatic distribution of a portion of this yield to merchants holding stablecoin balances, creating a merchant retention mechanism funded by reserve yield.

This model, sometimes called "yield-bearing stablecoin" in industry discussion, creates a competitive advantage for Adyen over payment processors that offer only fiat settlement. Merchants holding EUR stablecoin balances with Adyen earn a yield return on their working capital, effectively being paid to hold stablecoin rather than requesting immediate withdrawal. This reduces settlement pressure on Adyen's treasury operations and increases merchant stickiness.

### The Platform Expansion Economics

DALP's multi-asset architecture means that the governance, compliance, and operational infrastructure established for EUR stablecoin merchant settlement extends to adjacent services at minimal incremental cost. The platform license covers all seven asset class templates plus the configurable token. Adding a GBP stablecoin to Adyen's Phase 2 scope uses the same DALP instance, the same compliance engine, the same identity registry, and the same operational tooling established in Phase 1.

The incremental cost of Phase 2 multi-currency expansion is approximately EUR 150,000 in implementation fees (as opposed to EUR 430,000 for Phase 1, which establishes the infrastructure). Phase 3 adjacent services are similarly incremental. This is the platform economics model: fixed infrastructure investment with declining marginal cost for each additional use case deployed on top.

### Competitive Positioning Value

First-mover advantage in MiCA-compliant tokenized payment infrastructure is difficult to quantify precisely but is strategically significant. Adyen's competitors in European merchant acquiring, including Worldline, Nexi, Stripe, and Mollie, are all evaluating tokenized payment capabilities but none have deployed production-grade MiCA-compliant infrastructure at scale.

A production deployment by Q4 2026, the target go-live date in this proposal, positions Adyen 12 to 18 months ahead of competitors who begin similar programmes in 2026. This lead time translates to: established regulatory relationships with DNB before competitors have submitted their MiCA CASP applications; operational experience at scale before competitors have passed testing; merchant reference customers demonstrating real-world T+0 settlement benefit before competitors have proposals; and technical team expertise in tokenized payment operations that cannot be quickly replicated.

The strategic value of this competitive position is not captured in the 3-year or 5-year TCO models. It is the reason that the right time to invest in tokenized payment infrastructure is now, not after the capability becomes commodity.

---

## Appendix: Frequently Asked Questions

### Commercial Questions

**Q: Is the implementation pricing fixed or time-and-materials?**

The Phase 1 through Phase 6 implementation fees are fixed per the milestone-based schedule in this proposal. Fixed pricing applies to the defined scope as documented in the implementation assumptions. Out-of-scope changes are subject to change requests using the published day rates.

**Q: Can Adyen reduce the contract term if the programme does not meet expectations?**

Yes. The proposed contract includes an annual break right at each annual renewal with 90 days written notice. Adyen is not locked into a 3-year term without exit options. The recommended 3-year minimum is a pricing and stability commitment, not a lock-in without exit.

**Q: What happens to our data if we terminate the contract?**

DALP's on-chain state (token positions, transaction history, compliance events) is permanent on the blockchain and is not affected by contract termination. Off-chain indexed data (PostgreSQL projection, audit logs) is exported in machine-readable format as part of SettleMint's exit assistance. Adyen owns all data stored in DALP's systems and retains access for the exit assistance period.

**Q: Are there volume-based pricing tiers that penalize growth?**

No. The Enterprise tier includes volume thresholds that cover Adyen's expected Phase 1 through Phase 3 volumes. SettleMint provides 60-day advance notice if usage approaches threshold and proactively works with Adyen to agree commercial terms before threshold is reached.

**Q: How does the pricing compare to other vendors in this space?**

SettleMint does not publish competitive pricing comparisons. However, SettleMint's proposal structure, fixed implementation fees with annual platform license, is designed to be directly comparable to other institutional tokenization platform proposals. Adyen's evaluation team should compare total cost of ownership (implementation plus annual operating cost) over the contract term rather than headline license fees.

**Q: What is included in the Enterprise Support fee?**

Enterprise Support at EUR 120,000 per year includes: 24/7/365 coverage, 15-minute P1 response, 2-hour P1 resolution target, dedicated named support team, named Customer Success Manager, bi-weekly operational reviews, quarterly architecture reviews, war-room escalation for P1 incidents, continuous delivery with client approval gates, full-stack SettleMint-managed observability, and proactive capacity planning. All other support activities beyond standard support operations are included.

**Q: Are there additional fees for compliance module updates when MiCA implementing acts are published?**

Standard compliance module updates required by regulatory changes are included in the platform license. Custom compliance module development for novel regulatory requirements not addressable through DALP's existing 18 module types would be scoped as a change request. SettleMint's assessment is that MiCA's current framework is fully addressable through existing DALP compliance modules.

