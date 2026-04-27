# Digital Asset Payment Processing
## Commercial Proposal for Checkout.com
### SettleMint | March 2026 | v1.0 | SettleMint Confidential

---

**Prepared by:** SettleMint NV
**Prepared for:** Checkout.com, London, United Kingdom
**Document reference:** SM-COMM-CHECKOUT-2026-001
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

Checkout.com's digital asset payment processing programme represents a strategic investment in the merchant settlement infrastructure that will define competitive differentiation in global payment processing over the next decade. The question is not whether to build this capability, but whether to build it through custom development, historically 18 to 24 months and EUR 3 to 8 million before a production-capable service is live, or through DALP, SettleMint's production-grade Digital Asset Lifecycle Platform, which delivers the same capability in 14 to 18 weeks with a fraction of the ongoing operational overhead.

This commercial proposal structures the investment for Checkout.com's digital asset payment processing programme transparently, scalably, and predictably. The total investment to reach production-capable EUR stablecoin merchant settlement is EUR 360,000 to EUR 420,000 in implementation fees, plus annual platform licensing of EUR 280,000 for the Enterprise tier. Over a 3-year period, the total cost of ownership for DALP compares favourably against the build alternative at every volume level above pilot scale and creates a significantly lower operational risk profile.

The commercial structure reflects SettleMint's operating model as a platform company. Implementation fees cover the defined 6-phase delivery programme. Platform licensing provides access to DALP's full capability set, ongoing development, and compliance module updates as regulatory requirements evolve. Support fees provide the 24/7/365 Enterprise support that payment infrastructure requires. No hidden professional services dependencies, no mandatory managed operations, and no pricing structures that penalize Checkout.com for growing transaction volumes within the licensed tier.

### Investment Summary

| Investment Category | Year 1 | Year 2 | Year 3 | 3-Year Total |
|---|---|---|---|---|
| Implementation (one-time) | EUR 390,000 | - | - | EUR 390,000 |
| Platform License (Enterprise) | EUR 280,000 | EUR 280,000 | EUR 308,000 | EUR 868,000 |
| Enterprise Support | EUR 120,000 | EUR 120,000 | EUR 120,000 | EUR 360,000 |
| Infrastructure (Private Cloud estimate) | EUR 50,000 | EUR 55,000 | EUR 60,000 | EUR 165,000 |
| Custody (Fireblocks/DFNS, estimated) | EUR 50,000 | EUR 55,000 | EUR 60,000 | EUR 165,000 |
| **Total** | **EUR 890,000** | **EUR 510,000** | **EUR 548,000** | **EUR 1,948,000** |

The Year 1 figure includes the one-time implementation investment. From Year 2, the annual operating cost is approximately EUR 510,000 to EUR 548,000 for a production digital asset payment processing service. This represents a predictable, fixed operating cost for payment infrastructure that, once live, provides competitive differentiation in merchant settlement. Note: this summary table shows direct SettleMint costs plus estimated third-party infrastructure and custody. Section 8 (Total Cost of Ownership) provides the complete 3-year model including Foundation tier dev/staging licenses and internal Checkout.com engineering resources.

---

## Investment Rationale

### The Cost of the Current Approach

Checkout.com's current payment settlement model operates on traditional card network and correspondent banking rails with structural costs that are treated as fixed infrastructure rather than addressable efficiency opportunities.

Cross-border settlement costs for international payment acquiring typically run to 1.0 to 2.5 percent of transaction value in correspondent banking fees, FX spread, and intermediary charges. For merchants settling EUR 10 million monthly in cross-border transactions, this represents EUR 100,000 to EUR 250,000 in annual settlement friction.

Settlement delay creates working capital inefficiency. T+1 to T+2 settlement on card networks means merchants are effectively extending unsecured short-term credit on every transaction cycle. For a merchant with EUR 1 million monthly volume, approximately EUR 30,000 to EUR 65,000 in working capital is permanently deployed in settlement float.

FX intermediation costs for multi-currency merchant settlements erode margins on international transactions. Each currency conversion involves spread, fees, and counterparty risk that DALP's atomic XvP settlement eliminates.

### Why DALP Changes the Economics

Settlement finality in seconds eliminates working capital inefficiency of T+1 to T+2 settlement. Merchants receiving stablecoin settlement have confirmed access to funds within seconds of payment authorization.

Atomic XvP settlement eliminates correspondent banking intermediation for cross-border payments. When both legs of a cross-currency payment settle simultaneously, correspondent banking chains are bypassed. The Maybank Project Photon reference demonstrated this model in production for cross-currency settlement.

Compliance automation reduces the operational cost of maintaining AML/CFT and MiCA compliance at scale. DALP's ex-ante enforcement eliminates post-trade review overhead, producing an auditable evidence trail without additional compliance operations cost.

### ROI Framework

**Cost reduction (Year 2-3 annualized):**

Cross-border settlement cost reduction through correspondent banking bypass: assumes 5 percent of Checkout.com's cross-border volume migrates to tokenized settlement in Year 2. At 1.5 percent average correspondent banking cost, 5 percent migration produces material addressable cost reduction.

Reconciliation overhead reduction: T+0 atomic settlement eliminates the 1 to 2 day settlement window that creates most reconciliation breaks. Estimate 30 to 40 percent reduction in reconciliation operations overhead for migrated volume.

**Revenue creation (Year 2-3 annualized):**

Premium T+0 settlement service: Checkout.com can charge a service premium for guaranteed T+0 stablecoin settlement. An additional 10 to 20 basis points on premium settlement volume creates direct revenue.

Stablecoin reserve yield: reserve assets held to back stablecoin supply generate yield. Sharing a portion of this yield with merchants creates a retention mechanism while generating reserve yield revenue.

### Build vs. Buy Analysis

| Factor | Custom Build | DALP |
|---|---|---|
| Time to production | 18-24 months | 14-18 weeks |
| Initial development cost | EUR 3-8 million | EUR 390,000 |
| Ongoing maintenance cost | EUR 1-2 million per year | EUR 280,000 per year |
| Compliance module updates | Custom per regulatory change | Included in license |
| Security certifications | Client responsibility | Included (ISO 27001, SOC 2) |
| Custody integration | Custom development | Included (Fireblocks, DFNS) |

---

## Licensing Model

### Philosophy

SettleMint licenses DALP as a platform. The license fee covers access to the full platform capability set, ongoing development, platform releases, compliance module updates, and the operational tooling Checkout.com's teams need to run the service. No hidden dependency on SettleMint professional services for routine platform operations.

The licensing model is structured to be predictable as Checkout.com's programme scales. Currency expansion (adding GBP and USD stablecoins), merchant segment expansion, and volume growth within the licensed tier do not trigger incremental license fees.

### What Is Included in the Platform License

All tiers include the complete DALP platform: Asset Console, DAPI, Execution Engine, Key Guardian, Chain Indexer, Chain Gateway, Feeds System, and observability stack. All seven asset class templates plus the configurable token. All 18 compliance module types. XvP settlement contracts. OnchainID identity system. REST API (OpenAPI 3.1), TypeScript SDK, CLI, and event webhooks. Multi-chain EVM support. Helm-based deployment tooling. Release updates per contracted cadence. Standard compliance module updates when regulatory requirements change.

### Platform Tiers and Annual License Fees

| Tier | Annual License | Target Use Case |
|---|---|---|
| Foundation | EUR 80,000 | Development, staging, non-critical |
| Enterprise | EUR 280,000 | Production payment infrastructure |
| Sovereign | EUR 480,000 | Maximum-security, sovereign-scale |

Enterprise tier is appropriate for Checkout.com's production digital asset payment processing. The license includes production-grade deployment, HSM key management, Fireblocks and DFNS custody integration, ISO 20022 connectivity, and Enterprise support eligibility.

Multi-environment license:
- Production: Enterprise EUR 280,000
- Staging: Foundation EUR 40,000 (50% discount)
- Development: Foundation EUR 20,000 (75% discount)
- **Total multi-environment: EUR 340,000 per year**

---

## Deployment Options and Pricing

### Recommended: Hybrid (Managed SaaS Dev/Staging + Private Cloud Production)

**Private Cloud Production (recommended):**

| Component | Monthly Estimate | Annual |
|---|---|---|
| EKS cluster (3x m5.2xlarge, multi-AZ) | EUR 1,200 | EUR 14,400 |
| RDS PostgreSQL Multi-AZ | EUR 800 | EUR 9,600 |
| S3 object storage (5TB) | EUR 120 | EUR 1,440 |
| Secrets Manager / KMS | EUR 200 | EUR 2,400 |
| Network and data transfer | EUR 300 | EUR 3,600 |
| Besu validator nodes (2x t3.xlarge) | EUR 400 | EUR 4,800 |
| **Total infrastructure** | **EUR 3,020/month** | **EUR 36,240/year** |

Managed SaaS development and staging: EUR 40,000 per year included in Foundation tier license.

**Third-party costs:**

Fireblocks or DFNS institutional MPC custody: EUR 30,000 to EUR 80,000 per year (third-party pass-through, charged directly by custody provider).

Blockchain RPC endpoints (secondary): EUR 5,000 to EUR 15,000 per year.

---

## Support and SLA Framework

### Recommended: Enterprise Support

| Attribute | Enterprise Support |
|---|---|
| Annual Fee | EUR 120,000 |
| Coverage | 24/7/365 |
| Uptime SLA | 99.99% monthly |
| P1 Response | 15 minutes |
| P1 Resolution Target | 2 hours |
| P2 Response | 1 hour |
| Dedicated Support Team | Named team |
| Customer Success Manager | Named CSM |
| Quarterly Architecture Reviews | Included |

### Support Tier Comparison

| Feature | Standard | Premium | Enterprise |
|---|---|---|---|
| Annual fee | EUR 40,000 | EUR 72,000 | EUR 120,000 |
| Coverage | Business hours | Extended hours | 24/7/365 |
| Uptime SLA | 99.9% | 99.95% | 99.99% |
| P1 response | 4 hours | 1 hour | 15 minutes |
| Dedicated engineer | No | Named individual | Named team |

For Checkout.com's payment infrastructure, Standard or Premium support is not recommended. A 4-hour P1 response window is incompatible with the operational requirements of merchant-facing settlement infrastructure.

### Service Credits

| Monthly Uptime | Credit |
|---|---|
| Below 99.99% but above 99.0% | 10% of monthly support fees |
| Below 99.0% but above 98.0% | 25% of monthly support fees |
| Below 98.0% | 50% of monthly support fees |

---

## Implementation Investment

### Phase-by-Phase Implementation Fees

| Phase | Scope | Duration | Fee |
|---|---|---|---|
| Phase 1: Discovery | Stakeholder interviews, regulatory mapping, architecture design | 2 weeks | EUR 40,000 |
| Phase 2: Configuration | Environment provisioning, token configuration, compliance setup, identity framework | 3 weeks | EUR 65,000 |
| Phase 3: Integration | Gateway API, custody connector, KYC/AML, webhooks, treasury reconciliation | 3 weeks | EUR 110,000 |
| Phase 4: Testing | Functional, security, performance, compliance validation, UAT | 3 weeks | EUR 85,000 |
| Phase 5: Go-Live | Production deployment, validation, support handover | 1 week | EUR 45,000 |
| Phase 6: Hypercare | Intensive monitoring, optimization, knowledge transfer | 3 weeks | EUR 45,000 |
| **Total** | | **15 weeks** | **EUR 390,000** |

### Implementation Assumptions

Technology readiness: Checkout.com provides access to existing gateway and treasury APIs with documentation within 1 week of Phase 2 start.

Blockchain network: pricing assumes private Hyperledger Besu or Polygon PoS. Ethereum mainnet deployment increases Phases 2-4 fees by approximately EUR 20,000.

Custody provider: pricing assumes Fireblocks or DFNS integration. Custom signer adapter required if existing custody provider not supported.

Asset scope: Phase 1 implementation covers EUR stablecoin merchant settlement. GBP and USD stablecoin expansion requires separate engagement quoted on Phase 1 scope.

### Out-of-Scope Items

- Custom signer adapter for unsupported custody provider
- Custom compliance module development
- Data migration from legacy systems
- Phase 2 multi-currency expansion
- Phase 3 adjacent services (tokenized receivables, merchant bonds)
- Regulatory advisory services

### Change Request Day Rates

| Role | Day Rate (EUR) |
|---|---|
| Solution Architect | 2,500 |
| Platform Engineer | 2,000 |
| Integration Engineer | 2,000 |
| Security Engineer | 2,200 |
| Delivery Lead | 2,200 |

---

## Commercial Terms

### Contract Structure

Master Services Agreement (MSA) with: Platform License Agreement (Enterprise tier, 3-year recommended term); Implementation Statement of Work (6-phase programme, milestone-based payment); Support Services Agreement (Enterprise Support for license term); Data Processing Agreement (GDPR).

### Payment Schedule

| Milestone | Payment | Amount (EUR) |
|---|---|---|
| Contract execution | Platform license Year 1 (50%) | 140,000 |
| Contract execution | Phase 1: Discovery | 40,000 |
| Phase 1 gate review | Phase 2: Configuration | 65,000 |
| Phase 2 gate review | Phase 3 commencement | 55,000 |
| Phase 3 gate review | Phase 4 commencement | 55,000 |
| Phase 4 gate review | Phase 5 and 6 balance | 85,000 |
| Production go-live | Platform license Year 1 (50%) | 140,000 |
| Annual renewal (Year 2) | Platform license Year 2 | 280,000 |
| Annual renewal (Year 2) | Support Year 2 | 120,000 |
| Annual renewal (Year 3) | Platform license Year 3 | 308,000 |
| Annual renewal (Year 3) | Support Year 3 | 120,000 |

Support fees invoiced annually in advance from contract execution.

### Minimum Contract Term

Recommended minimum: 3 years. Annual break right at each renewal with 90 days written notice.

### Representations and Warranties

SettleMint warrants that DALP will perform materially in accordance with documentation. ISO 27001 and SOC 2 Type II certifications maintained throughout contract term. Material changes to certification status or ownership disclosed within 30 days.

### Intellectual Property

Checkout.com retains ownership of all data in DALP's systems. DALP platform software licensed, not transferred. Configurations developed specifically for Checkout.com remain Checkout.com's property.

### Exit Assistance

Complete data export in JSON/CSV/structured database format. 90-day post-termination data access. Technical handover session (up to 3 days). Audit log preservation and export for the required retention period.

---

## Total Cost of Ownership

### 3-Year TCO Model

| Cost Category | Year 1 | Year 2 | Year 3 | 3-Year Total |
|---|---|---|---|---|
| Platform License (Enterprise Production) | EUR 280,000 | EUR 280,000 | EUR 308,000 | EUR 868,000 |
| Platform License (Foundation Dev/Staging) | EUR 60,000 | EUR 60,000 | EUR 66,000 | EUR 186,000 |
| Enterprise Support | EUR 120,000 | EUR 120,000 | EUR 120,000 | EUR 360,000 |
| Implementation Phase 1 scope | EUR 390,000 | - | - | EUR 390,000 |
| Phase 2 (multi-currency expansion) | - | EUR 140,000 | - | EUR 140,000 |
| Phase 3 (adjacent services) | - | - | EUR 110,000 | EUR 110,000 |
| Checkout.com Private Cloud | EUR 45,000 | EUR 50,000 | EUR 55,000 | EUR 150,000 |
| Fireblocks/DFNS custody | EUR 50,000 | EUR 55,000 | EUR 60,000 | EUR 165,000 |
| Checkout.com internal (1.5 FTE Year 1) | EUR 225,000 | EUR 75,000 | EUR 75,000 | EUR 375,000 |
| **Total 3-Year TCO** | **EUR 1,170,000** | **EUR 780,000** | **EUR 794,000** | **EUR 2,744,000** |

### 5-Year TCO vs. Build Alternative

| Scenario | 5-Year Total |
|---|---|
| DALP platform approach | EUR 4,200,000 |
| Custom build alternative | EUR 6,100,000 |
| **DALP savings** | **EUR 1,900,000 (31%)** |

Custom build assumptions: 6-8 engineer team at EUR 200,000 fully loaded annually, 24-month development, 4 FTE ongoing maintenance team.

---

## Reference Clients

### Adyen

SettleMint implemented tokenized payment infrastructure for Adyen N.V. including EUR stablecoin merchant settlement with MiCA Article 55 compliance, atomic XvP cross-currency settlement, and gateway API integration. The Adyen engagement is the closest published reference for Checkout.com's use case. Commercial structure: milestone-based implementation with annual Enterprise platform license.

### Maybank Project Photon

Maybank implemented tokenized FX settlement with atomic cross-currency exchange in production under Bank Negara Malaysia's regulatory framework. Programme expanded from Phase 1 (single currency) to Phase 2 (cross-currency XvP) on the same DALP instance without additional platform licensing. Direct reference for Checkout.com's cross-border payment settlement goals.

### Commerzbank

Commerzbank deployed DALP for ETP issuance and management, achieving settlement under 10 seconds and identifying EUR 7 million in annual operational savings. First major European production deployment of DALP at institutional scale. Demonstrates DALP's ability to satisfy European institutional security review and change control processes. Reference calls available subject to confidentiality constraints.

---

## Next Steps

### Immediate Actions

SettleMint has submitted this proposal by the 24 April 2026 deadline. Following submission:

**Clarification period (deadline 03 April 2026):**
SettleMint is available for clarification questions within 2 business days. Contact: bids@settlemint.com.

**Shortlist notification (by 15 May 2026):**
SettleMint arranges within 5 business days: architecture walkthrough (2 hours), control deep-dive for security and compliance teams (1.5 hours), and live platform demonstration with Checkout.com-specific scenarios.

**Deep-dive sessions (Late May 2026):**
Day 1: technical architecture and API demonstration; security and compliance session. Day 2: implementation programme review; commercial discussion.

**Reference calls:**
Available with Adyen, Maybank, and Commerzbank within 5 business days of written request.

**Implementation start (Q3 2026):**
Contract execution by end of June 2026 enables Q4 2026 go-live. SettleMint mobilizes delivery team within 5 business days of contract execution.

### Primary Contacts

**Executive Sponsor:** Available for escalation and executive engagement.
**Bid Lead:** Primary contact for clarifications, evaluation, and contract negotiation. Contact: bids@settlemint.com.
**Solution Architect:** Available for technical deep-dive sessions.

---

## Appendix: Commercial Assumptions and Dependencies Register

### Implementation Scope Assumptions

Phase 1 covers EUR stablecoin merchant settlement on private Besu or Polygon PoS. GBP and USD stablecoin expansion is Phase 2 (separately scoped). Adjacent services (tokenized receivables, merchant bonds) are Phase 3 (separately scoped).

Gateway API integration assumes documented REST API interface. Message queue integration (Kafka, RabbitMQ) increases effort and may require change request.

Custody integration assumes Fireblocks or DFNS. Custom signer adapter required for unsupported custody provider.

KYC/AML integration assumes OpenID Connect-compatible claim issuance API.

Phase 1 merchant onboarding scope: batch workflow covers up to 10,000 merchants. Migration from existing merchant registry not included.

### Third-Party Dependencies Register

| Dependency | Provider | Annual Cost Estimate | Responsibility | Risk |
|---|---|---|---|---|
| MPC Custody | Fireblocks or DFNS | EUR 30,000-80,000 | Checkout.com | Medium |
| Blockchain RPC | Infura/Alchemy/QuickNode | EUR 5,000-15,000 | Checkout.com (prod) | Low |
| Blockchain Validators | Checkout.com-operated Besu | EUR 10,000-20,000 | Checkout.com | Low |
| KYC/AML Provider | Checkout.com's existing | Existing contract | Checkout.com | Low |
| Cloud Infrastructure | AWS/Azure/GCP | EUR 36,000-50,000 | Checkout.com | Low |

### Volume Thresholds (Enterprise Tier)

| Metric | Included | Overage |
|---|---|---|
| Active token types | Unlimited | N/A |
| Monthly on-chain transactions | Up to 1,000,000 | Contact SettleMint |
| Active merchant wallets | Up to 100,000 | Contact SettleMint |
| API requests (monthly) | Up to 50,000,000 | EUR 0.01 per 1,000 |
| Data storage (indexed PostgreSQL) | Up to 500 GB | EUR 0.10 per GB/month |

---

*Document Classification: SettleMint Confidential*
*SettleMint NV | Simon Bolivarlaan 5, 2600 Antwerp, Belgium | www.settlemint.com*
