# Tokenized Securities Platform
## Commercial Proposal for Trade Republic Bank GmbH
### SettleMint | March 2026 | v1.0 | SettleMint Confidential

---

**Prepared by:** SettleMint NV
**Prepared for:** Trade Republic Bank GmbH, Berlin, Germany
**Document reference:** SM-COMM-TRADEREPUBLIC-2026-001
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

Trade Republic's tokenized securities platform creates T+0 settlement as a competitive product feature for 8 million retail investors. The commercial case is not primarily about cost avoidance -- it is about enabling a new product category (tokenized bonds) and a new settlement experience (T+0) that deepens Trade Republic's differentiation against traditional brokers and neobank competitors.

DALP delivers the multi-asset tokenized securities infrastructure for Trade Republic in 14 to 18 weeks. Total Year 1 investment: approximately EUR 880,000 (implementation EUR 380,000, Enterprise license EUR 280,000, Enterprise support EUR 120,000, infrastructure EUR 60,000, DFNS custody EUR 40,000).

Revenue drivers: tokenized bond products generate spread income and AUM-based fee revenue; T+0 settlement reduces trade settlement operational costs; multi-asset tokenization expands Trade Republic's product catalogue without requiring a new infrastructure build per asset class.

### Investment Summary

| Category | Year 1 | Year 2 | Year 3 | 3-Year Total |
|---|---|---|---|---|
| Implementation (one-time) | EUR 380,000 | - | - | EUR 380,000 |
| Platform License (Enterprise) | EUR 280,000 | EUR 280,000 | EUR 308,000 | EUR 868,000 |
| Enterprise Support | EUR 120,000 | EUR 120,000 | EUR 120,000 | EUR 360,000 |
| Infrastructure | EUR 60,000 | EUR 65,000 | EUR 70,000 | EUR 195,000 |
| DFNS Custody | EUR 40,000 | EUR 45,000 | EUR 50,000 | EUR 135,000 |
| **Total** | **EUR 880,000** | **EUR 510,000** | **EUR 548,000** | **EUR 1,938,000** |

---

## 2. Investment Rationale

### The Competitive Case

Trade Republic's core value proposition -- low cost, simple, fast -- is further amplified by tokenized securities with T+0 settlement. Traditional brokers settle in T+2 with reconciliation overhead. Revolut and Scalable Capital are pursuing similar initiatives. First-mover advantage in German retail tokenized bonds creates a product differentiation that mass-market investors notice: "your bond settled instantly" versus "your bond settles in two business days."

### Revenue Creation

Tokenized bond spread: Trade Republic earns 25-50 basis points on tokenized bond transactions. At EUR 500 million average daily tokenized bond volume, this generates EUR 1.25 to 2.5 million daily transaction revenue.

AUM-based fees: EUR 1 billion in tokenized bond AUM at 10 basis points generates EUR 1 million annually.

Settlement cost reduction: T+0 eliminates the need for Trade Republic's settlement operations team to manage T+2 counterparty risk exposure for tokenized instruments. Estimated EUR 400,000 annual operations savings at scale.

### Build vs. Buy

| Factor | Custom Build | DALP |
|---|---|---|
| Time to production | 18-24 months | 14-18 weeks |
| Initial development cost | EUR 4-7 million | EUR 380,000 |
| Annual maintenance | EUR 1.5-2.5 million | EUR 280,000 |
| Multi-asset support (bond + equity + ETF) | Requires 3 builds | Single platform |
| BaFin/MiCA compliance | Custom per regulation change | Included |
| T+0 DvP settlement engine | Custom development | Included |

---

## 3. Licensing Model

| Tier | Annual License | Use Case |
|---|---|---|
| Foundation | EUR 80,000 | Development, staging |
| Enterprise | EUR 280,000 | Production retail securities |
| Sovereign | EUR 480,000 | Sovereign scale |

Enterprise covers unlimited security types, up to 1 million monthly transactions, 38 markets.

Multi-environment: Production EUR 280,000, Staging EUR 40,000, Development EUR 20,000. Total EUR 340,000/year.

---

## 4. Deployment Options and Pricing

### Private Cloud (Frankfurt, Kubernetes)

| Component | Monthly | Annual |
|---|---|---|
| Kubernetes resources | EUR 900 | EUR 10,800 |
| PostgreSQL Multi-AZ | EUR 900 | EUR 10,800 |
| S3 (5TB, 10yr audit) | EUR 110 | EUR 1,320 |
| KMS | EUR 200 | EUR 2,400 |
| Network/transfer | EUR 250 | EUR 3,000 |
| Besu validators (4x) | EUR 400 | EUR 4,800 |
| **Total infrastructure** | **EUR 2,760/month** | **EUR 33,120/year** |

**DFNS retail investor wallets:** EUR 35,000 to EUR 45,000 per year. SettleMint negotiates preferred DFNS pricing for Enterprise customers. Consumer wallet volume at 8M investors assumed to scale to 400K-800K active wallets within 18 months; enterprise volume pricing applies above standard 100K threshold.

---

## 5. Support and SLA

Enterprise Support: EUR 120,000/year, 24/7/365, 99.99% uptime SLA, 15-minute P1 response, 2-hour P1 resolution. T+0 settlement failures for retail investors are P1 incidents with immediate response required.

---

## 6. Implementation Investment

| Phase | Scope | Duration | Fee |
|---|---|---|---|
| Phase 1: Discovery | BaFin/MiCA mapping, brokerage API, multi-asset architecture | 2 weeks | EUR 38,000 |
| Phase 2: Configuration | Kubernetes, bond/equity/fund tokens, BaFin/MiCA retail, DFNS, EUR stablecoin | 3 weeks | EUR 72,000 |
| Phase 3: Integration | Brokerage settlement, portfolio management, KYC claims, corporate actions, webhooks | 3 weeks | EUR 110,000 |
| Phase 4: Testing | Functional, T+0 performance, BaFin security review, multi-asset compliance, retail UAT | 3 weeks | EUR 90,000 |
| Phase 5: Go-Live | Production, beta cohort (50K investors) | 1 week | EUR 44,000 |
| Phase 6: Hypercare | Monitoring, optimization, knowledge transfer | 2 weeks | EUR 26,000 |
| **Total** | | **14 weeks** | **EUR 380,000** |

### Assumptions

- Phase 1 scope: tokenized bonds (EUR denomination) and ETFs; tokenized equities in Phase 2
- Trade Republic provides brokerage API documentation by Phase 3 start
- DFNS passkey integration for Trade Republic's mobile app; Phase 2 PoC included
- Private Besu blockchain; public EVM option adds EUR 15,000 to Phase 2-3

### Out-of-Scope

- MiFID II suitability assessment (Trade Republic's existing system)
- Traditional T+2 CSD settlement (tokenized T+0 only)
- Custom regulatory reporting formats
- Fractional sub-EUR position mechanics (Phase 3)

### Day Rates

| Role | Day Rate |
|---|---|
| Solution Architect | EUR 2,500 |
| Platform Engineer | EUR 2,000 |
| Integration Engineer | EUR 2,000 |
| Security Engineer | EUR 2,200 |
| Delivery Lead | EUR 2,200 |

---

## 7. Commercial Terms

### Payment Schedule

| Milestone | Amount |
|---|---|
| Contract execution: License Year 1 (50%) | EUR 140,000 |
| Contract execution: Phase 1 | EUR 38,000 |
| P1 Gate: Phase 2 | EUR 72,000 |
| P2 Gate: Phase 3 (50%) | EUR 55,000 |
| P3 Gate: Phase 3 (50%) + Phase 4 | EUR 145,000 |
| P4 Gate: Phase 5 + 6 | EUR 70,000 |
| Go-Live: License Year 1 (50%) | EUR 140,000 |
| Year 2 renewal | EUR 400,000 |
| Year 3 renewal | EUR 428,000 |

3-year recommended term; annual break right with 90 days notice. German law governing option available.

---

## 8. Total Cost of Ownership

| Cost Category | Year 1 | Year 2 | Year 3 | 3-Year Total |
|---|---|---|---|---|
| Platform License (Production) | EUR 280,000 | EUR 280,000 | EUR 308,000 | EUR 868,000 |
| Platform License (Dev/Staging) | EUR 60,000 | EUR 60,000 | EUR 66,000 | EUR 186,000 |
| Enterprise Support | EUR 120,000 | EUR 120,000 | EUR 120,000 | EUR 360,000 |
| Implementation Phase 1 | EUR 380,000 | - | - | EUR 380,000 |
| Phase 2 (equities, EEA expansion) | - | EUR 120,000 | - | EUR 120,000 |
| Infrastructure | EUR 35,000 | EUR 40,000 | EUR 45,000 | EUR 120,000 |
| DFNS custody | EUR 40,000 | EUR 45,000 | EUR 50,000 | EUR 135,000 |
| Internal (1.5 FTE Year 1) | EUR 225,000 | EUR 75,000 | EUR 75,000 | EUR 375,000 |
| **Total 3-Year TCO** | **EUR 1,140,000** | **EUR 740,000** | **EUR 664,000** | **EUR 2,544,000** |

### 5-Year Build vs. Buy

| Scenario | 5-Year Total |
|---|---|
| DALP | EUR 3,800,000 |
| Custom build (multi-asset) | EUR 7,500,000 |
| **Savings** | **EUR 3,700,000 (49%)** |

---

## 9. Reference Clients

**Commerzbank:** BaFin-supervised Germany. Outsourcing compliance under BaFin Circular 05/2023. EUR 7M annual savings. Direct reference for Trade Republic's German banking licence.

**Deutsche Bank:** BaFin-supervised digital bond issuance. Bond token template at institutional scale. Coupon automation. Directly relevant to Trade Republic's tokenized bond requirement.

**Standard Chartered:** Fractional tokenized securities for retail investors. Multi-jurisdiction eligibility. Direct reference for retail investor distribution model.

---

## 10. Next Steps

Clarification deadline 03 April 2026. Shortlist by 15 May 2026: technical architecture walkthrough (2 hours), live T+0 DvP settlement demonstration with tokenized bond scenario (1.5 hours), BaFin/MiCA retail compliance deep-dive (1 hour). Implementation start Q3 2026; contract execution June 2026 for Q4 2026 beta cohort launch (50K retail investors, tokenized bonds).

---

## Appendix: Dependencies and Volume Thresholds

| Dependency | Provider | Annual Estimate | Responsibility |
|---|---|---|---|
| Retail Investor Wallets | DFNS | EUR 35,000-45,000 | Trade Republic |
| Blockchain RPC | Infura/Alchemy | EUR 8,000-12,000 | Trade Republic |
| Besu Validators | Trade Republic-operated | EUR 15,000-20,000 | Trade Republic |
| Cloud Infrastructure | AWS (Frankfurt) | EUR 35,000-50,000 | Trade Republic |
| Fund Administrator (NAV) | Trade Republic existing | Existing contract | Trade Republic |

| Metric | Enterprise Included | Overage |
|---|---|---|
| Monthly transactions | 1,000,000 | Contact SettleMint |
| Active investor wallets | 100,000 base (negotiated to 8M scale) | Enterprise volume pricing |
| Security types | Unlimited | N/A |
| API requests | 50,000,000/month | EUR 0.01/1,000 |

---

*Document Classification: SettleMint Confidential*
*SettleMint NV | Simon Bolivarlaan 5, 2600 Antwerp, Belgium | www.settlemint.com*
