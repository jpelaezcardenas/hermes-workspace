# Tokenized Investment Platform
## Commercial Proposal for Scalable Capital GmbH
### SettleMint | March 2026 | v1.0 | SettleMint Confidential

---

**Prepared by:** SettleMint NV
**Prepared for:** Scalable Capital GmbH, Munich, Germany
**Document reference:** SM-COMM-SCALABLE-2026-001
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

Scalable Capital's tokenized investment platform requires an automation-first infrastructure that matches the lean, automated philosophy behind Scalable Capital's existing wealth management and brokerage operations. The investment case is straightforward: DALP delivers tokenized fund subscription, redemption, NAV-linked pricing, and automated distribution in 12 to 16 weeks, eliminating the need for Scalable Capital to build a separate operations team for its tokenized fund products.

Total Year 1 investment: approximately EUR 840,000 (implementation EUR 340,000, Enterprise license EUR 280,000, Enterprise support EUR 120,000, infrastructure EUR 60,000, DFNS custody EUR 40,000).

Revenue drivers: management fee revenue on tokenized fund AUM at Scalable Capital's 7 million customer base; T+0 settlement as a product differentiator over traditional fund distribution; new fund product categories (tokenized ETFs, tokenized UCITS) accessible through Scalable Capital's existing mobile and broker interfaces.

### Investment Summary

| Category | Year 1 | Year 2 | Year 3 | 3-Year Total |
|---|---|---|---|---|
| Implementation (one-time) | EUR 340,000 | - | - | EUR 340,000 |
| Platform License (Enterprise) | EUR 280,000 | EUR 280,000 | EUR 308,000 | EUR 868,000 |
| Enterprise Support | EUR 120,000 | EUR 120,000 | EUR 120,000 | EUR 360,000 |
| Infrastructure (Kubernetes) | EUR 60,000 | EUR 65,000 | EUR 70,000 | EUR 195,000 |
| DFNS Custody (investor wallets) | EUR 40,000 | EUR 45,000 | EUR 50,000 | EUR 135,000 |
| **Total** | **EUR 840,000** | **EUR 510,000** | **EUR 548,000** | **EUR 1,898,000** |

---

## 2. Investment Rationale

### The Competitive Case

Scalable Capital competes for digital wealth customers against Trade Republic, N26, Bitpanda, and traditional asset managers. Tokenized fund products with T+0 settlement, fractional positions from EUR 1, and automated distribution create a product capability that traditional fund distribution cannot match in settlement speed or operational efficiency.

BaFin's KAGB framework and MiCA's fund product provisions create a clear regulatory path for Scalable Capital's tokenized fund programme as a licensed investment firm. Scalable Capital's existing BaFin authorization is a head start over non-bank digital asset providers.

### Revenue Creation

Management fee revenue: EUR 500 million in tokenized fund AUM at 20 basis points generates EUR 1 million annually. EUR 2 billion AUM at 20 basis points generates EUR 4 million annually. At Scalable Capital's 7 million customer base, 5% adoption with EUR 1,500 average position creates EUR 525 million AUM within 18 months.

Settlement efficiency: T+0 settlement reduces Scalable Capital's operational costs for fund settlement from T+2 manual reconciliation to automated on-chain settlement confirmation. Estimated EUR 500,000 annual operations savings at scale.

### Build vs. Buy

| Factor | Custom Build | DALP |
|---|---|---|
| Time to production | 18-24 months | 12-16 weeks |
| Initial development cost | EUR 3-6 million | EUR 340,000 |
| Annual maintenance | EUR 1-2 million | EUR 280,000 |
| NAV feed integration | Custom | Included |
| Distribution automation | Custom | Included |
| BaFin KAGB compliance | Custom per regulation change | Included |

---

## 3. Licensing Model

### Platform Tiers

| Tier | Annual License | Use Case |
|---|---|---|
| Foundation | EUR 80,000 | Development, staging |
| Enterprise | EUR 280,000 | Production tokenized fund operations |
| Sovereign | EUR 480,000 | Maximum-security sovereign scale |

Enterprise tier covers unlimited fund product types, unlimited markets, up to 1 million monthly transactions.

Multi-environment: Production EUR 280,000, Staging EUR 40,000, Development EUR 20,000. Total EUR 340,000/year.

---

## 4. Deployment Options and Pricing

### Recommended: Private Cloud (Frankfurt, Kubernetes)

| Component | Monthly | Annual |
|---|---|---|
| Kubernetes namespace resources | EUR 800 | EUR 9,600 |
| PostgreSQL Multi-AZ (RDS) | EUR 900 | EUR 10,800 |
| S3 (5TB, audit 10yr) | EUR 100 | EUR 1,200 |
| KMS | EUR 180 | EUR 2,160 |
| Network/data transfer | EUR 200 | EUR 2,400 |
| Besu validators (4x) | EUR 350 | EUR 4,200 |
| **Total infrastructure** | **EUR 2,530/month** | **EUR 30,360/year** |

**DFNS investor wallets:** EUR 35,000 to EUR 45,000 per year. Volume-driven; SettleMint negotiates preferred DFNS pricing for Enterprise customers.

---

## 5. Support and SLA Framework

| Attribute | Enterprise |
|---|---|
| Annual Fee | EUR 120,000 |
| Coverage | 24/7/365 |
| Uptime SLA | 99.99% |
| P1 Response | 15 minutes |
| P1 Resolution | 2 hours |
| Dedicated Team | Named |
| CSM | Named |

---

## 6. Implementation Investment

| Phase | Scope | Duration | Fee |
|---|---|---|---|
| Phase 1: Discovery | BaFin/MiCA mapping, portfolio API assessment, NAV architecture | 2 weeks | EUR 34,000 |
| Phase 2: Configuration | Kubernetes, fund tokens, KAGB/MiCA modules, NAV feeds, DFNS | 3.5 weeks | EUR 68,000 |
| Phase 3: Integration | Portfolio management, brokerage settlement, KYC claims, webhooks | 3 weeks | EUR 96,000 |
| Phase 4: Testing | Functional, NAV validation, distribution performance, UAT | 3 weeks | EUR 78,000 |
| Phase 5: Go-Live | Production, beta investor cohort | 1 week | EUR 38,000 |
| Phase 6: Hypercare | Monitoring, knowledge transfer | 1.5 weeks | EUR 26,000 |
| **Total** | | **14 weeks** | **EUR 340,000** |

### Assumptions

- Fund scope: tokenized UCITS and ETF products with EUR denomination and optional GBP for UK market
- NAV feed: Bloomberg or Refinitiv connector (standard adapters); custom feed source adds EUR 8,000
- Scalable Capital provides portfolio management API documentation by Phase 3 start
- DFNS passkey integration for Scalable Capital's mobile app; Phase 2 proof-of-concept included

### Out-of-Scope

- MiFID II suitability assessment (Scalable Capital's existing system)
- Fund prospectus or regulatory filing preparation
- Traditional CSD settlement (tokenized only)
- GBP/CHF denomination (Phase 2, separately scoped)

---

## 7. Commercial Terms

### Payment Schedule

| Milestone | Amount |
|---|---|
| Contract execution: License Year 1 (50%) | EUR 140,000 |
| Contract execution: Phase 1 | EUR 34,000 |
| P1 Gate: Phase 2 | EUR 68,000 |
| P2 Gate: Phase 3 (50%) | EUR 48,000 |
| P3 Gate: Phase 3 (50%) + Phase 4 | EUR 126,000 |
| P4 Gate: Phase 5 + 6 | EUR 64,000 |
| Go-Live: License Year 1 (50%) | EUR 140,000 |
| Year 2 renewal: License + Support | EUR 400,000 |
| Year 3 renewal: License + Support | EUR 428,000 |

3-year minimum recommended; annual break right with 90 days notice. Exit: complete data export, 90-day access, technical handover 3 days.

---

## 8. Total Cost of Ownership

| Cost Category | Year 1 | Year 2 | Year 3 | 3-Year Total |
|---|---|---|---|---|
| Platform License (Production) | EUR 280,000 | EUR 280,000 | EUR 308,000 | EUR 868,000 |
| Platform License (Dev/Staging) | EUR 60,000 | EUR 60,000 | EUR 66,000 | EUR 186,000 |
| Enterprise Support | EUR 120,000 | EUR 120,000 | EUR 120,000 | EUR 360,000 |
| Implementation Phase 1 | EUR 340,000 | - | - | EUR 340,000 |
| Phase 2 (bonds, GBP/CHF markets) | - | EUR 100,000 | - | EUR 100,000 |
| Infrastructure | EUR 35,000 | EUR 40,000 | EUR 45,000 | EUR 120,000 |
| DFNS custody | EUR 40,000 | EUR 45,000 | EUR 50,000 | EUR 135,000 |
| Internal (1 FTE Year 1) | EUR 150,000 | EUR 50,000 | EUR 50,000 | EUR 250,000 |
| **Total 3-Year TCO** | **EUR 1,025,000** | **EUR 695,000** | **EUR 639,000** | **EUR 2,359,000** |

### 5-Year Build vs. Buy

| Scenario | 5-Year Total |
|---|---|
| DALP | EUR 3,500,000 |
| Custom build | EUR 5,900,000 |
| **Savings** | **EUR 2,400,000 (41%)** |

---

## 9. Reference Clients

**BNP Paribas:** Tokenized fund distribution at consumer banking scale. Demonstrates DALP's fund template with NAV integration and automated distribution at millions of investor positions. Reference calls available.

**Commerzbank:** BaFin-supervised Germany. EUR 7 million annual operational savings. Outsourcing compliance for German-regulated financial institution. Reference calls available.

**Nordea:** Tokenized funds in Nordic consumer banking context. Consumer-facing fund product experience under MiCA-adjacent regulatory framework.

---

## 10. Next Steps

Clarification deadline: 03 April 2026. Shortlist by 15 May 2026 with architecture walkthrough (2 hours), live fund subscription demo with NAV integration (1.5 hours), KAGB compliance deep-dive (1 hour). Implementation start Q3 2026; contract execution by June 2026 for Q4 2026 beta investor cohort launch.

---

## Appendix: Commercial Assumptions and Dependencies

| Dependency | Provider | Annual Estimate | Responsibility |
|---|---|---|---|
| Investor Wallets | DFNS | EUR 35,000-45,000 | Scalable Capital |
| Blockchain RPC | Infura/Alchemy | EUR 5,000-8,000 | Scalable Capital |
| Besu Validators | Scalable Capital-operated | EUR 12,000-18,000 | Scalable Capital |
| Cloud Infrastructure | AWS (Frankfurt) | EUR 30,000-40,000 | Scalable Capital |
| NAV Feed | Bloomberg/Refinitiv | Existing contract | Scalable Capital |

---

*Document Classification: SettleMint Confidential*
*SettleMint NV | Simon Bolivarlaan 5, 2600 Antwerp, Belgium | www.settlemint.com*
