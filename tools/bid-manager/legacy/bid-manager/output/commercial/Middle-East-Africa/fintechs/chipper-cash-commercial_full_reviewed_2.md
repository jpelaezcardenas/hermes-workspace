---
title: "Commercial Proposal: Cross-Border Tokenized Remittance Settlement"
client: "Chipper Cash"
date: "2026-03-19"
version: "1.2"
confidentiality: "Restricted. Commercial-Sensitive"
prepared-by: "SettleMint NV"
document-type: "Commercial Proposal"
rfp-reference: "CHIPPER-CASH-RFP-CROSS-BORDER-TOKENIZED-REMITTANCE-202603"
---

# Commercial Proposal

## Cross-Border Tokenized Remittance Settlement

---

**Document Title:** Commercial Proposal. Cross-Border Tokenized Remittance Settlement

**Client:** Chipper Cash

**Submission Date:** 2026-03-19

**Version:** 1.2 (Final)

**Confidentiality:** Restricted. Commercial-Sensitive

**Prepared by:** SettleMint NV

---

> This document contains confidential and proprietary information of SettleMint NV. Distribution or reproduction without prior written consent is prohibited.

---

# Table of Contents

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

# 1. Executive Summary

## 1.1 Commercial Decision Summary

Chipper Cash's cross-border tokenized remittance programme is a competitive infrastructure play. The platform choice determines: settlement speed (minutes vs hours vs days), corridor unit economics (correspondent banking cost vs tokenized settlement cost), regulatory compliance scalability (manual per-corridor updates vs configurable platform), and the ability to benefit from PAPSS as an emerging African settlement rail.

The commercial decision comes down to whether to build a bespoke multi-currency tokenized settlement layer (expensive, slow, high ongoing maintenance) or license a production-grade platform purpose-built for regulated multi-currency token settlement (faster, lower TCO, inherently configurable per corridor).

SettleMint recommends DALP Enterprise tier on managed SaaS with Enterprise 24/7 support. This is the fastest, lowest-overhead path to production for Chipper Cash's use case.

| Cost Category | Year 1 | Year 2 | Year 3 | 3-Year Total |
|--------------|--------|--------|--------|-------------|
| Platform Licence (Enterprise) | $480,000 | $480,000 | $480,000 | $1,440,000 |
| Implementation Services | $180,000 | - |, | $180,000 |
| Managed SaaS Infrastructure | Included in licence | Included | Included | Included |
| Enterprise Support | $144,000 | $144,000 | $144,000 | $432,000 |
| Training | $20,000 | - | $10,000 | $30,000 |
| **Total** | **$824,000** | **$624,000** | **$634,000** | **$2,082,000** |

> Indicative USD amounts. Managed SaaS infrastructure is included in the Enterprise licence, no separate infrastructure cost. Implementation covers 16-week delivery for 6+ initial corridors.

**Key commercial advantage for Chipper Cash:** Managed SaaS eliminates infrastructure management overhead. Chipper Cash's engineering team focuses on the API integration and product experience. SettleMint manages the platform infrastructure, blockchain nodes, and database operations.

## 1.2 Commercial Recommendation

- **Licence tier:** Enterprise
- **Deployment model:** Managed SaaS (fastest time-to-production, zero infrastructure overhead)
- **Support:** Enterprise 24/7
- **Initial corridors:** 6 (NG, GH, KE, ZA, UG, UK), additional corridors at no extra licence cost
- **Contract:** 3-year initial term (volume stability allows platform cost optimization)

---

# 2. Investment Rationale

## 2.1 Cost of Current Approach

Chipper Cash's current cross-border settlement relies on correspondent banking relationships and manual FX operations. The hidden costs of the current approach include:

**Correspondent banking cost:** Industry estimates for cross-border remittance via correspondent banking: 4-7% of transaction value in combined FX spread, correspondent fees, and SWIFT messaging costs. For Chipper Cash's volume, this represents a significant per-transaction cost that tokenized settlement can reduce.

**Settlement speed:** Correspondent banking settlement: 1-3 business days. Tokenized settlement: < 5 seconds confirmation. The settlement speed differential creates both user experience advantages and capital efficiency gains (faster corridor rebalancing).

**Liquidity management overhead:** Manual liquidity management across 8+ corridors requires treasury staff time, frequent wire transfers for rebalancing, and suboptimal corridor pre-funding levels. DALP's real-time position visibility reduces both staff overhead and pre-funding requirements.

**Regulatory compliance overhead:** Per-corridor compliance management with manual rule updates when jurisdictions change requirements. DALP's configurable modules eliminate engineering changes for compliance parameter updates.

## 2.2 Why DALP Changes Chipper Cash's Economics

**Settlement cost reduction:** Tokenized settlement between corridor pools eliminates correspondent banking fees for intra-Chipper-Cash settlement. The corridor token swap cost is the blockchain transaction fee (minimal) plus the platform licence. For high-volume corridors, this represents a significant per-transaction cost reduction.

**Capital efficiency:** Real-time liquidity visibility enables more precise corridor pre-funding, reducing the capital tied up in over-funded corridors. Based on comparable deployments, 15-25% reduction in corridor pre-funding requirements is achievable through better liquidity visibility.

**PAPSS access:** DALP's PAPSS-ready architecture positions Chipper Cash to benefit from PAPSS as it expands to additional African currency corridors. PAPSS aims to reduce cross-border settlement costs for African intra-continental payments by eliminating USD intermediation.

**New corridor speed:** Adding a new country corridor currently requires: legal setup, correspondent banking relationship establishment, and compliance framework development. With DALP, the platform configuration for a new corridor takes approximately 2 weeks. The legal and banking setup remains; the technology setup is accelerated dramatically.

## 2.3 ROI Framework

| Value Driver | Estimated Impact | Basis |
|-------------|-----------------|-------|
| Correspondent banking fee reduction | 40-60% per-transaction reduction for tokenized corridors | Comparable tokenized remittance deployments |
| Capital efficiency improvement | 15-25% reduction in pre-funding requirements | Real-time liquidity visibility |
| Compliance staff efficiency | 30-50% reduction in per-corridor compliance management time | Configurable rules vs manual updates |
| New corridor time-to-launch | 2 weeks vs 3-6 months (technology component) | Platform configuration vs development |
| PAPSS readiness | PAPSS integration-ready without rework | Forward-compatible architecture |

> ROI quantification depends on Chipper Cash's specific corridor volumes, FX spreads, and current operational costs. SettleMint recommends a joint ROI workshop in Phase 1 to develop corridor-specific models.

## 2.4 Payback Period Analysis

Based on comparable cross-border remittance deployments and publicly available corridor cost data:

| Scenario | Assumption | Annual Saving | Payback on Implementation ($180K) | Payback on Year 1 Total ($824K) |
|----------|------------|---------------|-----------------------------------|----------------------------------|
| Conservative | 2% correspondent fee reduction on $50M annual corridor volume | $1,000,000 | 2 months | 10 months |
| Moderate | 3% fee reduction on $75M volume + 20% liquidity efficiency | $2,750,000 | < 1 month | 4 months |
| Aggressive | 4% fee reduction on $100M+ volume + PAPSS savings | $4,500,000+ | < 1 month | 3 months |

**Key insight:** Even under the most conservative scenario, the implementation investment ($180,000) pays back within the first quarter. The full Year 1 investment ($824,000) pays back within 10 months from correspondent banking fee reduction alone, before accounting for capital efficiency gains, compliance staff savings, or new corridor revenue enablement.

The payback analysis assumes Chipper Cash's total cross-border settlement volume exceeds $50M annually across all corridors. If actual corridor volumes are significantly lower, the payback timeline extends proportionally. SettleMint recommends validating these assumptions during Phase 1 discovery with actual corridor data.

---

# 3. Licensing Model

## 3.1 Enterprise Licence: What's Included

For Chipper Cash's use case, the Enterprise licence includes all capabilities needed:

| Included | Notes |
|---------|-------|
| All stablecoin/deposit asset types | Multi-currency corridor tokens |
| Per-corridor compliance modules (unlimited) | Per-instrument configuration |
| XvP Settlement addon | Atomic cross-corridor swaps |
| Airdrop module | Liquidity injection to corridor pools |
| Managed SaaS infrastructure | Included, no separate cloud cost |
| OpenAPI 3.1 + webhook events | Mobile money integration |
| ISO 20022 adapter | PAPSS and RTGS connectivity |
| Operations dashboard | Liquidity management view |
| Compliance alert dashboard | AML case management |
| Audit log export | Per-corridor regulatory evidence |

**No per-transaction fee.** Chipper Cash's transaction volume growth does not increase platform costs. The licence covers all settlement volume within the platform.

## 3.2 Platform Tiers

| Feature | Foundation | Enterprise (Recommended) | Sovereign |
|---------|-----------|--------------------------|-----------|
| Corridor tokens | Up to 3 | Unlimited | Unlimited |
| Environments | 2 | 4 | Unlimited |
| Managed SaaS | Yes | Yes | No (private cloud required) |
| Per-corridor compliance | Basic | Full (all modules) | Full + custom |
| PAPSS adapter | No | Yes | Yes |
| Mobile money hooks | Basic | Full | Full |
| Annual licence | $240,000 | $480,000 | $720,000+ |

**Recommendation:** Enterprise. Unlimited corridors, full compliance module access, PAPSS adapter, and managed SaaS infrastructure included. Foundation tier is insufficient for 6+ corridors with full compliance configuration.

---

# 4. Deployment Options and Pricing

## 4.1 Recommended: Managed SaaS

For Chipper Cash as a fintech, managed SaaS is the correct deployment model:
- **Infrastructure included in licence:** No additional cloud cost, $0 additional infrastructure
- **Fastest time-to-production:** 16-week implementation vs 20+ weeks for private cloud
- **Zero infrastructure management:** Chipper Cash's engineering team focuses on API integration
- **Same platform capabilities:** All DALP capabilities available in managed SaaS

**Data residency consideration:** Chipper Cash does not store end-user PII in DALP. Settlement records are operational data. EU-region managed SaaS satisfies Chipper Cash's processing requirements.

## 4.2 Cost Structure

| Category | Year 1 | Year 2 | Year 3 | 3-Year Total |
|----------|--------|--------|--------|-------------|
| Enterprise Licence (incl. SaaS infra) | $480,000 | $480,000 | $480,000 | $1,440,000 |
| Implementation Services | $180,000 | - |, | $180,000 |
| Enterprise Support | $144,000 | $144,000 | $144,000 | $432,000 |
| Training | $20,000 | - | $10,000 | $30,000 |
| **Total** | **$824,000** | **$624,000** | **$634,000** | **$2,082,000** |

## 4.3 Cost Drivers

| Driver | Impact |
|--------|--------|
| Additional corridors beyond initial 6 | No additional licence cost |
| Private cloud option (if required by regulator) | +$72,000-$96,000/year infrastructure |
| PAPSS integration (Phase 2) | $20,000-$40,000 integration services |
| Additional mobile money providers | $5,000-$15,000/provider one-time |
| 3-year committed discount | -10% on licence ($144,000 saving) |

---

# 5. Support and SLA Framework

| Feature | Standard | Premium | Enterprise (Recommended) |
|---------|---------|---------|--------------------------|
| Coverage | Business hours | Extended | 24/7 |
| P1 response | 4h | 2h | 1h |
| Settlement P1 | Cross-corridor settlement failing | Same | Same |
| Channels | Email | Email + phone | All + Slack |
| Annual cost | $72,000 | $108,000 | $144,000 |

**Why 24/7 for Chipper Cash:** Cross-border remittance operates 24/7 across African time zones. Settlement failures at 2 AM Lagos time need 1-hour response, not 4-hour.

## 5.1 Uptime

| Environment | Target |
|-------------|--------|
| Production (Settlement) | 99.9% |
| UAT | 99.5% |

Service credits: 99.5%-99.9%: 25% monthly support fee; below 99.5%: 50%.

---

# 6. Implementation Investment

## 6.1 Phase Pricing (16-Week Managed SaaS)

| Phase | Duration | Investment |
|-------|---------|-----------|
| Phase 1. Discovery | 2 weeks | $18,000 |
| Phase 2. Foundation | 2 weeks | $24,000 |
| Phase 3. Configuration (6 corridors) | 4 weeks | $60,000 |
| Phase 4. Integration (mobile money, FX, PAPSS) | 4 weeks | $54,000 |
| Phase 5. Go-Live | 2 weeks | $18,000 |
| Phase 6. Hypercare | 1 week | $6,000 |
| **Total** | **16 weeks** | **$180,000** |

## 6.2 Payment Schedule

| Milestone | Amount |
|-----------|--------|
| Contract execution (Licence Y1 + Support Y1) | $624,000 |
| Phase 1 gate | $27,000 (15% implementation) |
| Phase 3 gate | $54,000 (30%) |
| Phase 4 gate | $36,000 (20%) |
| Phase 6 completion | $63,000 (35%) |

## 6.3 Accelerators and Risks

| Factor | Effect |
|--------|--------|
| REST API AML provider | Accelerates Phase 3 |
| Standard mobile money APIs | Accelerates Phase 4 |
| Existing Chipper Cash API team | Accelerates Phase 2 |
| Non-standard local RTGS interface | +$15,000-$30,000 per corridor |
| Complex PAPSS integration at launch | +$20,000-$40,000, extend Phase 4 |

---

# 7. Commercial Terms

## 7.1 Contract Structure

| Agreement | Scope |
|-----------|-------|
| Platform Licence | DALP software, managed SaaS service, IP boundaries |
| Professional Services | Implementation, training |
| Support Services | Enterprise 24/7, SLA, service credits |

## 7.2 Payment and Duration

- **Licence term:** 3 years from contract execution
- **Currency:** USD
- **Payment:** Annual licence + support in advance; implementation milestone-based
- **Multi-year discount:** 10% on licence fees, applied as annual credit against each year's licence invoice

### Discounted Pricing (3-Year Commitment)

| Category | Undiscounted Annual | Discount | Discounted Annual | 3-Year Discounted Total |
|----------|-------------------|----------|-------------------|------------------------|
| Enterprise Licence | $480,000 | 10% ($48,000/yr) | $432,000 | $1,296,000 |
| Enterprise Support | $144,000 | - | $144,000 | $432,000 |
| Implementation | $180,000 (Year 1) | - | $180,000 | $180,000 |
| Training | $20,000 (Year 1) + $10,000 (Year 3) | - |, | $30,000 |
| **Total (Discounted)** | | | | **$1,938,000** |
| **Savings vs. Undiscounted** | | | | **$144,000** |

The 10% multi-year discount is credited annually against the licence invoice. Year 1 total: $776,000 (vs. $824,000 undiscounted). Year 2: $576,000 (vs. $624,000). Year 3: $586,000 (vs. $634,000).

## 7.3 Key Terms

- **IP:** DALP platform remains SettleMint's. Chipper Cash's settlement records and configurations remain Chipper Cash's.
- **Liability:** Capped at 12 months of licence fees.
- **Confidentiality:** Mutual, 3 years post-term.
- **Termination for cause:** 30-day cure period; data export 90-day window.
- **Data Processing Agreement (DPA):** A GDPR-compliant Data Processing Agreement is included as a standard annex to the Platform Licence agreement. The DPA covers SettleMint's obligations as data processor for settlement records processed in the EU-region managed SaaS environment, including sub-processor disclosure, data breach notification (72-hour), and data subject access request support. DALP does not process end-user PII (which remains in Chipper Cash's own systems), but the DPA covers any operational or transactional data that may qualify as personal data under GDPR.
- **New corridors:** Adding new corridors within the licence term requires no additional licence or commercial amendment, it is a configuration activity.
- **PAPSS integration:** If PAPSS integration is required before Phase 2, it can be incorporated into Phase 4 for an additional services fee (see Section 6.3).

---

# 8. Total Cost of Ownership

## 8.1 Three-Year TCO: DALP vs Build vs Multi-Vendor

| Category | DALP Managed SaaS | Internal Build | Multi-Vendor Assembly |
|----------|-----------------|--------------|----------------------|
| Year 1 | $824,000 | $2,800,000-$4,200,000 | $1,800,000-$2,800,000 |
| Year 2 | $624,000 | $1,200,000-$1,800,000 | $1,200,000-$1,800,000 |
| Year 3 | $634,000 | $1,200,000-$1,800,000 | $1,200,000-$1,800,000 |
| **3-Year Total** | **$2,082,000** | **$5,200,000-$7,800,000** | **$4,200,000-$6,400,000** |
| Time to 6 corridors | 16 weeks | 18-24 months | 12-18 months |
| New corridor add | 2 weeks | 3-6 months (dev) | 2-4 months |
| PAPSS readiness | Phase 2 extension | Requires development | Uncertain |
| Per-corridor compliance | Configuration | Code + legal | Multiple vendor patches |

## 8.2 Five-Year Projection

| Year | DALP | Internal Build |
|------|------|---------------|
| 1 | $824,000 | $3,500,000 |
| 2 | $624,000 | $1,400,000 |
| 3 | $634,000 | $1,500,000 |
| 4 | $634,000 | $1,600,000 |
| 5 | $634,000 | $1,700,000 |
| **5-Year** | **$3,350,000** | **$9,700,000** |

5-year DALP advantage: $6,350,000 vs internal build; $5,200,000+ vs multi-vendor. The managed SaaS infrastructure inclusion is a major contributor, no separate cloud cost across 5 years.

---

# 9. Reference Clients

| Client | Use Case | Relevance to Chipper Cash |
|--------|---------|--------------------------|
| Standard Bank Africa | Pan-African digital payments | Multi-corridor African market, local regulatory experience |
| Standard Chartered Africa | Cross-border digital assets | Multi-jurisdiction AML/CFT, African corridor management |
| Walmart/GoHenry context | Consumer fintech + compliance | High-volume consumer financial platform |
| Central Bank of UAE | CBDC settlement | Settlement determinism; compliance enforcement model |
| NGEX Digital Post-Trade | Settlement infrastructure | DvP patterns applicable to corridor settlement |

---

# 10. Next Steps

| Step | Owner | Timing |
|------|-------|--------|
| Commercial acknowledgment | Chipper Cash Procurement | Week 1 |
| Technical presentation | SettleMint | Week 2 |
| Corridor ROI workshop | Both | Week 2-3 |
| AML provider discussion | Chipper Cash Compliance + SettleMint | Week 3 |
| Mobile money API compatibility check | Both | Week 3 |
| PAPSS strategy alignment | Both | Week 3-4 |
| Commercial terms | Both | Week 3-4 |
| Contract signature | Both | Week 4-5 |
| Programme kickoff | Both | Within 1 week of contract |

SettleMint can accelerate to a 12-week implementation timeline if Chipper Cash prioritizes a phased corridor launch (Nigeria-Ghana first, then additional corridors).

---

*End of Commercial Proposal. Chipper Cash*

*Document Version: 1.0 | Date: 2026-03-19 | Classification: Restricted. Commercial-Sensitive*

*SettleMint NV | Rue Montoyer 39, 1000 Brussels, Belgium | www.settlemint.com*
