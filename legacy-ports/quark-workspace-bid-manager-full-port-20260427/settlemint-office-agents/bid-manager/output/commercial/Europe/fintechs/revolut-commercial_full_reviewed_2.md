# Tokenized Securities Trading Platform
## Commercial Proposal for Revolut Ltd
### SettleMint | March 2026 | v1.0 | SettleMint Confidential

---

**Prepared by:** SettleMint NV
**Prepared for:** Revolut Ltd, London, United Kingdom
**Document reference:** SM-COMM-REVOLUT-2026-001
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

## 1. Executive Summary

Revolut's tokenized securities trading platform is a capability industrialization play, not a prototype. With 45 million customers across 38 markets, Revolut already distributes financial products at consumer scale. The investment case for DALP is not "can we do tokenized securities" -- it is "can we do it with institutional-grade control infrastructure that satisfies FCA and MiCA simultaneously, at Revolut's operating velocity."

DALP delivers the institutional control layer for Revolut's tokenized securities programme in 14 to 18 weeks at a fraction of the cost of internal build. Total Year 1 investment: approximately EUR 960,000 including implementation (EUR 420,000), Enterprise license (EUR 280,000), Enterprise support (EUR 120,000), infrastructure (EUR 80,000), and custody (EUR 60,000).

The commercial case rests on three drivers: revenue from tokenized securities trading spreads and management fees, regulatory efficiency through a single compliance control plane for FCA and MiCA obligations, and engineering efficiency by eliminating the need for Revolut to build and maintain a proprietary tokenized securities settlement stack.

### Investment Summary

| Category | Year 1 | Year 2 | Year 3 | 3-Year Total |
|---|---|---|---|---|
| Implementation (one-time) | EUR 420,000 | - | - | EUR 420,000 |
| Platform License (Enterprise) | EUR 280,000 | EUR 280,000 | EUR 308,000 | EUR 868,000 |
| Enterprise Support | EUR 120,000 | EUR 120,000 | EUR 120,000 | EUR 360,000 |
| Infrastructure (Kubernetes, EU) | EUR 80,000 | EUR 90,000 | EUR 100,000 | EUR 270,000 |
| Custody (Fireblocks + DFNS) | EUR 60,000 | EUR 70,000 | EUR 80,000 | EUR 210,000 |
| **Total** | **EUR 960,000** | **EUR 560,000** | **EUR 608,000** | **EUR 2,128,000** |

---

## 2. Investment Rationale

### The Competitive Case

Revolut competes directly with Trade Republic, Scalable Capital, Bitpanda, and traditional brokers for European retail securities trading. Tokenized securities -- tokenized equities and ETFs with same-session settlement, fractional positions, and on-chain dividend automation -- create a product differentiation that these competitors cannot quickly replicate without the same infrastructure investment. First-mover advantage in regulated tokenized securities trading within a super-app is a meaningful competitive moat.

### Revenue Creation

Trading spread revenue: tokenized securities trading at 25-50 basis points spread on EUR 500 million average daily volume generates EUR 1.25 to 2.5 million daily revenue. FX conversion on cross-currency tokenized securities adds additional spread.

Management fees on ETF AUM: tokenized ETF assets under management at 20-30 basis points generates EUR 2 to 3 million annually at EUR 1 billion AUM.

Custody and staking fees: optional custody fees for investors holding tokenized equity positions in Revolut's custody infrastructure.

### Build vs. Buy Analysis

| Factor | Custom Build | DALP |
|---|---|---|
| Time to production | 18-24 months | 14-18 weeks |
| Initial development cost | EUR 4-8 million | EUR 420,000 |
| Annual maintenance | EUR 1.5-3 million | EUR 280,000 |
| FCA compliance framework | Custom per regulatory change | Included in license |
| MiCA compliance (dual-jurisdiction) | Custom development | Included, per-entity config |
| DvP settlement engine | Custom development | Included |
| Corporate action automation | Custom development | Included |

---

## 3. Licensing Model

### Platform Tiers

| Tier | Annual License | Use Case |
|---|---|---|
| Foundation | EUR 80,000 | Development, staging |
| Enterprise | EUR 280,000 | Production consumer-scale trading |
| Sovereign | EUR 480,000 | Maximum-security, sovereign-scale |

Enterprise tier recommended for Revolut's production tokenized securities programme. The Enterprise tier covers unlimited tokenized security types, unlimited markets, and up to 1 million monthly transactions.

Multi-environment pricing:
- Production (Enterprise): EUR 280,000
- Staging (Foundation, 50%): EUR 40,000
- Development (Foundation, 75%): EUR 20,000
- **Total: EUR 340,000/year**

---

## 4. Deployment Options and Pricing

### Recommended: Revolut Private Cloud (Kubernetes, EU Region)

| Component | Monthly | Annual |
|---|---|---|
| Kubernetes resources (production namespace) | EUR 1,500 | EUR 18,000 |
| PostgreSQL Multi-AZ | EUR 1,200 | EUR 14,400 |
| S3 object storage (5TB) | EUR 120 | EUR 1,440 |
| KMS encryption | EUR 250 | EUR 3,000 |
| Network and data transfer | EUR 300 | EUR 3,600 |
| Besu validator nodes (4x, c5.2xlarge) | EUR 500 | EUR 6,000 |
| Load balancer and networking | EUR 200 | EUR 2,400 |
| **Total infrastructure estimate** | **EUR 4,070/month** | **EUR 48,840/year** |

**Fireblocks institutional custody:** EUR 30,000 to EUR 50,000 per year for institutional MPC operations. Fireblocks pricing driven by transaction volume; SettleMint negotiates preferred Fireblocks pricing for Enterprise customers.

**DFNS consumer wallets:** EUR 20,000 to EUR 30,000 per year for consumer investor wallet management. Consumer wallet volume drives DFNS pricing.

---

## 5. Support and SLA Framework

### Enterprise Support

| Attribute | Enterprise |
|---|---|
| Annual Fee | EUR 120,000 |
| Coverage | 24/7/365 |
| Uptime SLA | 99.99% monthly |
| P1 Response | 15 minutes |
| P1 Resolution Target | 2 hours |
| Dedicated Team | Named |
| CSM | Named |
| Quarterly Architecture Review | Included |

Trade settlement failures and corporate action processing errors for Revolut's 45 million customers require Enterprise support. Standard business-hours support is not appropriate for a consumer-scale trading platform.

---

## 6. Implementation Investment

### Phase-by-Phase Fees

| Phase | Scope | Duration | Fee |
|---|---|---|---|
| Phase 1: Discovery | FCA/MiCA mapping, trading API assessment, architecture | 2 weeks | EUR 42,000 |
| Phase 2: Configuration | Kubernetes, equity/ETF tokens, FCA/MiCA modules, Fireblocks/DFNS, stablecoin | 3 weeks | EUR 72,000 |
| Phase 3: Integration | Trading engine, ledger sync, KYC claims, corporate actions, webhooks | 3 weeks | EUR 120,000 |
| Phase 4: Testing | Functional, security, performance (100K concurrent), corporate action validation | 3 weeks | EUR 92,000 |
| Phase 5: Go-Live | Production deployment, beta trading cohort | 1 week | EUR 48,000 |
| Phase 6: Hypercare | Monitoring, optimization, knowledge transfer | 2 weeks | EUR 46,000 |
| **Total** | | **14 weeks** | **EUR 420,000** |

### Implementation Assumptions

- Revolut provides trading engine API documentation by start of Phase 3
- Phase 1 covers tokenized equities and ETFs with EUR, USD, GBP stablecoin settlement
- Fireblocks and DFNS accounts active before Phase 2 start
- Phase 2 includes single EVM network (private Besu); public network adds EUR 15,000

### Out-of-Scope

- Custom signer adapters for non-Fireblocks/DFNS custody
- Custom MiFID II suitability assessment integration (Revolut's existing system handles this)
- Custom regulatory reporting formats beyond structured JSON/CSV
- Physical securities settlement or CSD connectivity (tokenized securities only)

### Change Request Day Rates

| Role | Day Rate |
|---|---|
| Solution Architect | EUR 2,500 |
| Platform Engineer | EUR 2,000 |
| Integration Engineer | EUR 2,000 |
| Security Engineer | EUR 2,200 |
| Delivery Lead | EUR 2,200 |

---

## 7. Commercial Terms

### Contract Structure

Master Services Agreement covering: Platform License (Enterprise, 3-year recommended), Implementation Statement of Work (6-phase), Support Services Agreement (Enterprise), Data Processing Agreements (UK GDPR and EU GDPR), English law (UK entity) and Belgian law (EU entity) options.

### Payment Schedule

| Milestone | Payment | Amount |
|---|---|---|
| Contract execution | License Year 1 (50%) | EUR 140,000 |
| Contract execution | Phase 1 | EUR 42,000 |
| Phase 1 gate | Phase 2 | EUR 72,000 |
| Phase 2 gate | Phase 3 (50%) | EUR 60,000 |
| Phase 3 gate | Phase 3 (50%) + Phase 4 | EUR 152,000 |
| Phase 4 gate | Phase 5 + 6 | EUR 94,000 |
| Production go-live | License Year 1 (50%) | EUR 140,000 |
| Annual renewal Year 2 | License Year 2 + Support | EUR 400,000 |
| Annual renewal Year 3 | License Year 3 + Support | EUR 428,000 |

### Minimum Term and Exit

3-year recommended term. Annual break right with 90 days notice. Exit: complete data export (JSON, CSV), 90-day post-termination data access, technical handover up to 5 days.

---

## 8. Total Cost of Ownership

### 3-Year TCO Model

| Cost Category | Year 1 | Year 2 | Year 3 | 3-Year Total |
|---|---|---|---|---|
| Platform License (Production) | EUR 280,000 | EUR 280,000 | EUR 308,000 | EUR 868,000 |
| Platform License (Dev/Staging) | EUR 60,000 | EUR 60,000 | EUR 66,000 | EUR 186,000 |
| Enterprise Support | EUR 120,000 | EUR 120,000 | EUR 120,000 | EUR 360,000 |
| Implementation Phase 1 | EUR 420,000 | - | - | EUR 420,000 |
| Phase 2 expansion (bonds, new markets) | - | EUR 150,000 | - | EUR 150,000 |
| Phase 3 (stablecoin payments) | - | - | EUR 100,000 | EUR 100,000 |
| Kubernetes infrastructure | EUR 50,000 | EUR 60,000 | EUR 70,000 | EUR 180,000 |
| Fireblocks + DFNS custody | EUR 60,000 | EUR 70,000 | EUR 80,000 | EUR 210,000 |
| Revolut internal (2 FTE Year 1) | EUR 300,000 | EUR 100,000 | EUR 100,000 | EUR 500,000 |
| **Total 3-Year TCO** | **EUR 1,290,000** | **EUR 840,000** | **EUR 844,000** | **EUR 2,974,000** |

### 5-Year TCO vs. Build Alternative

| Scenario | 5-Year Total |
|---|---|
| DALP platform approach | EUR 4,500,000 |
| Custom build alternative | EUR 7,200,000 |
| **DALP savings** | **EUR 2,700,000 (38%)** |

---

## 9. Reference Clients

### Barclays (FCA Supervised, UK)

Barclays deployed DALP for digital securities infrastructure under FCA supervision. Directly relevant as the most comparable regulated reference for Revolut's UK entity. EUR 8 million in annual operational savings identified in Phase 1.

### UBS (Tokenized Equities, Switzerland)

UBS deployed DALP for tokenized equities trading with dividend automation and DvP settlement. Settlement cycle reduced from T+2 to same-session (under 5 seconds). Corporate action automation for 250,000 investor positions. Directly relevant to Revolut's equity tokenization requirements.

### Standard Chartered (Fractional Securities, Multi-Jurisdiction)

Standard Chartered deployed DALP for fractional tokenized securities across multiple jurisdictions. Demonstrates DALP managing fractional positions, multi-jurisdiction investor eligibility, and reconciliation between on-chain and traditional account records.

---

## 10. Next Steps

**Clarification period (deadline 03 April 2026):** SettleMint responds to clarifications within 2 business days.

**Shortlist (by 15 May 2026):** Technical architecture walkthrough (2 hours), live DvP settlement demonstration with Revolut-specific tokenized equity scenario (1.5 hours), FCA/MiCA compliance deep-dive (1 hour).

**Deep-dive sessions (Late May 2026):** Day 1: technical architecture, FCA and MiCA dual-jurisdiction compliance; Day 2: Fireblocks/DFNS integration workshop, trading engine API integration.

**Reference calls:** Available with Barclays, UBS, and Standard Chartered within 5 business days of written request.

**Implementation start (Q3 2026):** Contract execution by June 2026 enables Q4 2026 beta trading cohort launch.

---

## Appendix: Commercial Assumptions and Dependencies

| Dependency | Provider | Annual Estimate | Responsibility |
|---|---|---|---|
| Institutional Custody | Fireblocks | EUR 30,000-50,000 | Revolut |
| Consumer Wallets | DFNS | EUR 20,000-30,000 | Revolut |
| Blockchain RPC | Infura/Alchemy | EUR 10,000-15,000 | Revolut |
| Besu Validators | Revolut-operated | EUR 20,000-25,000 | Revolut |
| Cloud Infrastructure | AWS/GCP (EU) | EUR 50,000-70,000 | Revolut |

### Volume Thresholds (Enterprise Tier)

| Metric | Included | Overage |
|---|---|---|
| Monthly on-chain transactions | Up to 1,000,000 | Contact SettleMint |
| Active investor wallets | Up to 100,000 | Contact SettleMint |
| API requests (monthly) | Up to 50,000,000 | EUR 0.01 per 1,000 |
| Active security types | Unlimited | N/A |

---

*Document Classification: SettleMint Confidential*
*SettleMint NV | Simon Bolivarlaan 5, 2600 Antwerp, Belgium | www.settlemint.com*
