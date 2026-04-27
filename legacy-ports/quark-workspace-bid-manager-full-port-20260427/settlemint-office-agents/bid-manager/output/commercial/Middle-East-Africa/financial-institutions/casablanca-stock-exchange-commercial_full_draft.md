---
title: "Commercial Proposal: Tokenized Securities Issuance and Trading Framework"
client: "Casablanca Stock Exchange"
date: "2026-03-19"
version: "1.0"
confidentiality: "Restricted. Commercial-Sensitive"
prepared-by: "SettleMint NV"
document-type: "Commercial Proposal"
rfp-reference: "CASABLANCA-STOCK-EXCHANGE-RFP-TOKENIZED-SECURITIES-MOROCCO-202603"
---

# Commercial Proposal

## Tokenized Securities Issuance and Trading Framework

---

**Document Title:** Commercial Proposal. Tokenized Securities Issuance and Trading Framework

**Client:** Casablanca Stock Exchange (Bourse de Casablanca)

**Submission Date:** 2026-03-19

**Version:** 1.0

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

Casablanca Stock Exchange is making a strategic infrastructure decision that will determine Morocco's position at the forefront of African capital markets digitalization. The procurement spans three dimensions: build credibility for tokenized securities under AMMC oversight, integrate cleanly with Maroclear and existing market infrastructure, and operate sustainably within the Moroccan and international regulatory perimeter.

SettleMint recommends DALP Enterprise tier on a private cloud deployment in EU cloud regions (OVHcloud or Azure France Central), with Enterprise 24/7 support including French-language capability.

| Cost Category | Year 1 | Year 2 | Year 3 | 3-Year Total |
|--------------|--------|--------|--------|-------------|
| Platform Licence (Enterprise) | $480,000 | $480,000 | $480,000 | $1,440,000 |
| Implementation Services | $280,000 | - |, | $280,000 |
| Infrastructure (EU Private Cloud) | $72,000 | $72,000 | $72,000 | $216,000 |
| Enterprise Support (FR-capable) | $144,000 | $144,000 | $144,000 | $432,000 |
| Training (FR/AR bilingual) | $28,000 | - | $12,000 | $40,000 |
| **Total** | **$1,004,000** | **$696,000** | **$708,000** | **$2,408,000** |

> Indicative USD amounts. Infrastructure estimated at EU cloud rates (OVHcloud or Azure France Central). Training premium reflects bilingual French/Arabic delivery.

## 1.2 Commercial Recommendation

- **Licence tier:** Enterprise
- **Deployment model:** Private cloud. EU region (OVHcloud Roubaix or Azure France Central)
- **Support tier:** Enterprise 24/7, French-language capability
- **Contract structure:** 3-year initial term
- **Currency:** USD or EUR equivalent at contract signing exchange rate

---

# 2. Investment Rationale

## 2.1 Cost of Current Approach

Casablanca Stock Exchange does not currently have tokenized securities infrastructure. The cost of the current approach is the cost of market position delay plus build cost if the Exchange attempted to develop independently.

**Competitive position:** Exchanges across Africa and the Middle East are investing in digital asset capabilities. Each quarter of delay represents lost first-mover positioning in the Casablanca Finance City context, where being the first African exchange with operational tokenized securities capability carries significant institutional value.

**Build cost (Morocco context):** Smart contract development team (4-5 engineers with French-language capability, 18-24 months): $700,000-$1,000,000. Compliance and regulatory layer development: $200,000-$300,000. Maroclear integration: $150,000-$250,000. French/Arabic UI and operational tooling: $100,000-$200,000. Estimated build total: $1,150,000-$1,750,000 before ongoing maintenance.

## 2.2 Why DALP Changes Economics

DALP's platform economics provide three specific advantages for Casablanca Stock Exchange:

1. **Moroccan regulatory configuration without development:** AMMC compliance rules are configured through the compliance module framework, no custom development required when AMMC guidance evolves.
2. **Maroclear integration via pre-built ISO 20022 adapter:** The settlement integration pattern is pre-built. Custom development is only required for non-standard Maroclear message variations identified during Phase 1.
3. **Sukuk support included:** Islamic finance instrument configuration is available through the existing compliance and yield framework, no additional sukuk-specific development cost.

## 2.3 ROI Framework

| Value Driver | Baseline | DALP-Enabled | Estimated Impact |
|-------------|---------|-------------|-----------------|
| Build cost avoidance | $1.15M-$1.75M build | Platform licence | Year 1 avoidance |
| Maintenance avoidance | 3 FTE maintenance team | Included in licence | $400,000-$600,000/year |
| AMMC compliance cost | Manual evidence assembly | Automated audit packs | $50,000-$100,000/year |
| Market position | No tokenized market | First African exchange platform | Issuer and investor revenue (CSE-specific) |
| Operations efficiency | Manual exception handling | Automated workflows | $100,000-$200,000/year |

---

# 3. Licensing Model

## 3.1 Philosophy

DALP is licensed as a platform with a predictable annual fee independent of transaction volume. Casablanca Stock Exchange's digital securities growth should not create escalating platform costs, the licence includes all lifecycle capabilities from first instrument through scale.

## 3.2 What's Included

All DALP capabilities are included in the Enterprise licence: bond, equity, sukuk-aligned, and fund asset types; all twelve compliance modules including country lists, investor class controls, and AMMC-configured eligibility rules; XvP settlement addon; Yield addon for coupon/profit distribution; document management with cryptographic versioning; French and Arabic UI support; complete OpenAPI 3.1 and webhook access; observability tooling.

## 3.3 Platform Tiers

| Feature | Foundation | Enterprise (Recommended) | Sovereign |
|---------|-----------|--------------------------|-----------|
| Asset types | All | All | All |
| Environments | 2 | 4 | Unlimited |
| Bilingual support (FR/AR) | Documentation | Full UI + Support | Full |
| Islamic finance config | Basic | Full AAOIFI template | Full + custom |
| SLA | 99.5% | 99.9% | 99.95% |
| Support | Standard | Enterprise 24/7 FR | Dedicated team |
| Annual licence | $240,000 | $480,000 | $720,000+ |

**Recommended tier:** Enterprise. Four environments, French/Arabic support, full Islamic finance configuration, 99.9% SLA, and 24/7 FR-capable support align with Casablanca's operational and regulatory requirements.

---

# 4. Deployment Options and Pricing

## 4.1 Recommended: EU Private Cloud (OVHcloud / Azure France Central)

Private cloud deployment in EU (OVHcloud Roubaix, France or Azure France Central) provides:
- EU data protection (GDPR/adequacy agreement with Morocco)
- Strong latency to Casablanca (< 20ms typical)
- French-speaking cloud provider relationship (OVHcloud)
- No data sovereignty risk under Morocco's current regulatory framework

Indicative annual infrastructure cost: $72,000. Basis: 4 Besu validator nodes (OVHcloud iHG-120 or Azure D4s_v3), 2 application tier instances, PostgreSQL managed, Redis, Key Vault, WAF, monitoring, EU region.

## 4.2 Deployment Comparison

| Model | Residency | Time-to-Deploy | Annual Infra Cost | Notes |
|-------|-----------|----------------|-------------------|-------|
| EU Private Cloud (Recommended) | EU/Morocco-compliant | 4-5 weeks | $72,000 | Best latency + cost |
| Managed SaaS | SettleMint-managed | 2 weeks | Included in licence | Less data control |
| Morocco On-Premises | Full Morocco control | 10-14 weeks | CSE hardware cost | Longest deployment |

## 4.3 Cost Structure

| Category | Year 1 | Year 2 | Year 3 | Total |
|----------|--------|--------|--------|-------|
| Enterprise Licence | $480,000 | $480,000 | $480,000 | $1,440,000 |
| Implementation | $280,000 | - |, | $280,000 |
| Infrastructure (EU) | $72,000 | $72,000 | $72,000 | $216,000 |
| Enterprise Support (FR) | $144,000 | $144,000 | $144,000 | $432,000 |
| Training (FR/AR) | $28,000 | - | $12,000 | $40,000 |
| **Total** | **$1,004,000** | **$696,000** | **$708,000** | **$2,408,000** |

## 4.4 Cost Drivers

| Driver | Impact | Notes |
|--------|--------|-------|
| Sukuk documentation management (complex AAOIFI compliance) | +$15,000-$30,000 one-time | If extensive custom workflow required |
| Custom Maroclear message mapping | +$20,000-$40,000 one-time | If non-standard message formats required |
| Morocco on-premises deployment | +$80,000-$150,000 infra | If local data centre required |
| Arabic-only UI customization | +$15,000-$25,000 one-time | If beyond standard Arabic localization |
| 3-year committed discount | -10% on licence | $144,000 total saving |

---

# 5. Support and SLA Framework

## 5.1 Support Tiers

| Feature | Standard | Premium | Enterprise (Recommended) |
|---------|---------|---------|--------------------------|
| Language | English | English | English + French |
| Coverage | Business hours CET | Extended CET | 24/7/365 |
| P1 response | 4h | 2h | 1h |
| Named CSM | No | No | Yes (French-speaking) |
| Annual cost | $72,000 | $108,000 | $144,000 |

## 5.2 Severity Matrix

| Level | Definition | P1 Example for CSE |
|-------|-----------|-------------------|
| P1: Critical | Platform unavailable, settlement blocked | Maroclear integration down, token transfers failing |
| P2: High | Major function impaired, workaround available | Compliance alert processing delayed |
| P3: Medium | Non-critical impact | Report generation slow |
| P4: Low | Minor/informational | Documentation request |

## 5.3 Uptime and Service Credits

| Environment | Target | Max Monthly Downtime |
|-------------|--------|---------------------|
| Production | 99.9% | 43 min/month |
| UAT | 99.5% | 3.6 hours/month |

Service credits: 99.0%-99.5%: 25% monthly support credit; below 99.0%: 50% credit.

## 5.4 Maintenance

| Type | Frequency | Notice |
|------|-----------|--------|
| Planned maintenance | Monthly | 7 calendar days |
| Security patches | As needed | 48 hours |
| Major version | Annual minimum | 12 months |

---

# 6. Implementation Investment

## 6.1 Phase Pricing

| Phase | Duration | Investment |
|-------|---------|-----------|
| Phase 1. Discovery | 2 weeks | $28,000 |
| Phase 2. Foundation | 3 weeks | $42,000 |
| Phase 3. Configuration (incl. sukuk) | 4 weeks | $70,000 |
| Phase 4. Integration (Maroclear + AMMC) | 4 weeks | $84,000 |
| Phase 5. Go-Live | 3 weeks | $42,000 |
| Phase 6. Hypercare | 2 weeks | $14,000 |
| **Total** | **18 weeks** | **$280,000** |

Billing: 20% at contract signature, then milestone-based per phase acceptance.

## 6.2 Training (FR/AR Bilingual)

| Track | Duration | Language | Cost |
|-------|---------|---------|------|
| Platform Administration | 2 days | French | Included |
| Developer/Integration | 3 days | French | Included |
| Operations | 2 days | French + Arabic | $6,000 premium |
| Compliance Management (AMMC) | 1 day | French | Included |

## 6.3 Accelerators and Risks

| Factor | Effect |
|--------|--------|
| ISO 20022 Maroclear standard messages | Accelerates Phase 4 |
| Existing French-language IAM/AD | Accelerates Phase 2 |
| AMMC-aligned compliance template library | Accelerates Phase 3 |
| Non-standard Maroclear custom messages | +$20,000-$40,000, +1-2 weeks |
| Complex sukuk AAOIFI documentation requirements | +$15,000, +1 week in Phase 3 |

---

# 7. Commercial Terms

## 7.1 Contract Structure

| Agreement | Scope | Term |
|-----------|-------|------|
| Platform Licence | DALP software licence, IP, data handling | 3 years |
| Professional Services | Implementation, training | 18 weeks |
| Support Services | Enterprise FR-capable support | Co-terminates with licence |

## 7.2 Payment Schedule

| Milestone | Amount |
|-----------|--------|
| Contract execution (Licence Year 1 + Support Year 1) | $624,000 |
| Phase 1 gate sign-off | $42,000 (15% implementation) |
| Phase 3 gate sign-off | $84,000 (30%) |
| Phase 4 gate sign-off | $56,000 (20%) |
| Phase 6 completion | $98,000 (35% remaining) |

## 7.3 Currency and Duration

- **Currency:** USD or EUR equivalent at contract signing
- **Initial term:** 3 years from contract execution
- **Multi-year discount:** 10% on platform licence fees for 3-year upfront commitment

## 7.4 Key Terms

- **IP:** DALP platform remains SettleMint's. Client data and configurations remain CSE's.
- **Liability cap:** 12 months of licence fees paid.
- **Confidentiality:** Mutual, 3 years post-term.
- **Termination for cause:** 30-day cure period.
- **Data export:** 90-day access post-termination.
- **Escrow:** Available on request; costs borne by CSE.

---

# 8. Total Cost of Ownership

## 8.1 Three-Year TCO Comparison

| Category | DALP Platform | Internal Build | Multi-Vendor |
|----------|-------------|--------------|-------------|
| Year 1 total | $1,004,000 | $1,350,000 | $1,150,000 |
| Year 2 total | $696,000 | $1,000,000 | $1,050,000 |
| Year 3 total | $708,000 | $1,050,000 | $1,080,000 |
| **3-Year Total** | **$2,408,000** | **$3,400,000** | **$3,280,000** |
| Time to production | 18 weeks | 18-24 months | 12-18 months |
| FR/AR support | Native | Must hire/contract | Vendor-dependent |
| AMMC compliance updates | Configuration | Code + legal review | Multiple vendor patches |
| Sukuk support | Included | Requires development | Separate vendor likely |

## 8.2 Five-Year Projection

| Year | DALP | Internal Build |
|------|------|---------------|
| 1 | $1,004,000 | $1,350,000 |
| 2 | $696,000 | $1,000,000 |
| 3 | $708,000 | $1,050,000 |
| 4 | $708,000 | $1,100,000 |
| 5 | $708,000 | $1,150,000 |
| **5-Year** | **$3,824,000** | **$5,650,000** |

DALP's 5-year advantage: $1,826,000 saved versus internal build; $1,700,000+ saved versus multi-vendor assembly.

---

# 9. Reference Clients

| Client | Use Case | Relevance to CSE |
|--------|---------|-----------------|
| Euronext | Digital securities listing (Europe) | Exchange operator, listing controls, CSD integration |
| JSE (Johannesburg Stock Exchange context) | African exchange infrastructure | African market dynamics, local CSD interaction |
| Standard Chartered Bank | Multi-jurisdiction digital assets | Cross-border investor compliance, AML/CFT patterns |
| Central Bank of UAE | Digital Dirham infrastructure | Islamic finance context, Gulf regulatory framework |
| National Bank of Egypt (CIB Egypt context) | Digital fixed income | North/Pan-African institutional context |

---

# 10. Next Steps

| Step | Owner | Timing |
|------|-------|--------|
| Commercial acknowledgment | CSE Procurement | Week 1 |
| Technical presentation (French) | SettleMint | Week 2-3 |
| Maroclear integration workshop | Both | Week 3-4 |
| AMMC compliance alignment session | Both | Week 3-4 |
| Reference client calls | CSE | Concurrent |
| Commercial terms negotiation | Both | Week 4-5 |
| Contract signature | Both | Week 5-6 |
| Programme kickoff | Both | Within 2 weeks of signature |

SettleMint is available for clarification sessions and presentations in French. Named commercial and technical contacts will be provided on request.

---

*End of Commercial Proposal. Casablanca Stock Exchange*

*Document Version: 1.0 | Date: 2026-03-19 | Classification: Restricted. Commercial-Sensitive*

*SettleMint NV | Rue Montoyer 39, 1000 Brussels, Belgium | www.settlemint.com*
