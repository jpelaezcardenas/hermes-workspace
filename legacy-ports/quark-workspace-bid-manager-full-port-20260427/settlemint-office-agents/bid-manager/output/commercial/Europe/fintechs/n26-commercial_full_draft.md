# Digital Asset Services Integration
## Commercial Proposal for N26 Bank AG
### SettleMint | March 2026 | v1.0 | SettleMint Confidential

---

**Prepared by:** SettleMint NV
**Prepared for:** N26 Bank AG, Berlin, Germany
**Document reference:** SM-COMM-N26-2026-001
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

N26's digital asset services integration programme creates embedded consumer digital asset products for over 8 million customers across 24 markets. The investment decision is whether to build this capability through custom blockchain development, historically 18 to 24 months and EUR 3 to 7 million before a consumer-grade service is operational, or through DALP, SettleMint's production-grade platform, which delivers the same infrastructure capability in 14 to 18 weeks at a fraction of the development and operating cost.

This commercial proposal structures the investment transparently. Total implementation investment: EUR 370,000 for the Phase 1 digital asset services programme. Annual platform license: EUR 280,000 (Enterprise tier). Annual Enterprise support: EUR 120,000. Total Year 1 investment approximately EUR 870,000 including infrastructure and DFNS custody.

The investment case for N26 rests on three value drivers: competitive differentiation through embedded consumer digital asset products, new revenue from savings product management fees, and regulatory compliance readiness for BaFin and MiCA digital asset service obligations.

### Investment Summary

| Investment Category | Year 1 | Year 2 | Year 3 | 3-Year Total |
|---|---|---|---|---|
| Implementation (one-time) | EUR 370,000 | - | - | EUR 370,000 |
| Platform License (Enterprise) | EUR 280,000 | EUR 280,000 | EUR 308,000 | EUR 868,000 |
| Enterprise Support | EUR 120,000 | EUR 120,000 | EUR 120,000 | EUR 360,000 |
| Infrastructure (N26 Kubernetes, EU) | EUR 40,000 | EUR 45,000 | EUR 50,000 | EUR 135,000 |
| DFNS Custody (consumer wallets) | EUR 60,000 | EUR 65,000 | EUR 70,000 | EUR 195,000 |
| **Total** | **EUR 870,000** | **EUR 510,000** | **EUR 548,000** | **EUR 1,928,000** |

---

## Investment Rationale

### The Competitive Case

N26's consumer digital asset opportunity is concrete. Competitors including Revolut (available in N26's markets), Bitpanda (available in Austria and Germany), and dedicated crypto exchanges offer digital asset features embedded in financial applications. N26's differentiation in consumer banking rests on product simplicity and regulatory trust; extending this to digital asset savings products creates a defensible market position before competitors further entrench.

The regulatory environment is improving for German banks. BaFin's digital asset service provider framework under MiCA creates a clear authorization path. N26's existing banking license and BaFin regulatory relationship provide a starting advantage over pure-play crypto exchanges that must build banking-grade customer trust from scratch.

### Revenue Creation

Savings product management: N26 earns management fees on tokenized savings note AUM. For EUR 200 million in tokenized savings AUM at 50 basis points management fee, annual revenue is EUR 1 million. At EUR 500 million AUM, annual revenue is EUR 2.5 million. At N26's 8 million customer base, even 5 percent adoption at EUR 500 average position creates EUR 200 million AUM within 12 to 18 months of launch.

Yield spread: N26 sources savings note yields from institutional-grade backing assets. The spread between backing asset yield and customer-facing yield creates revenue. In a EUR 4.5% rate environment, a 1% yield spread on EUR 200 million AUM generates EUR 2 million annually.

Adjacent product revenue: Phase 2 stablecoin payment features and Phase 3 crypto asset services generate additional fee revenue on customer activity.

### Build vs. Buy Analysis

| Factor | Custom Build | DALP |
|---|---|---|
| Time to production | 18-24 months | 14-18 weeks |
| Initial development cost | EUR 3-7 million | EUR 370,000 |
| Ongoing maintenance | EUR 1-2 million per year | EUR 280,000 per year |
| DFNS passkey integration | Custom development | Included in platform |
| Consumer compliance modules | Custom per regulatory change | Included in license |
| BaFin audit trail | Custom development | Included in platform |

N26's engineering culture values lean development and fast shipping. Custom blockchain development requires specialized expertise outside N26's core mobile banking skill set, creating a permanent dependency on blockchain engineering headcount that DALP's platform model eliminates.

---

## Licensing Model

### Philosophy

DALP is licensed as a platform covering the full capability set: bond and deposit templates, 18 compliance module types, DFNS passkey wallet management, yield automation, DvP settlement, REST API, TypeScript SDK, CLI, and observability stack. No hidden dependencies on SettleMint professional services for consumer savings product operations.

The licensing model stays predictable as N26's programme scales. Adding GBP or SEK savings products, expanding markets, or growing customer AUM within the licensed tier does not trigger incremental fees.

### Platform Tiers and Annual License Fees

| Tier | Annual License | Target Use Case |
|---|---|---|
| Foundation | EUR 80,000 | Development, staging, non-critical |
| Enterprise | EUR 280,000 | Production consumer digital asset services |
| Sovereign | EUR 480,000 | Maximum-security, sovereign-scale |

Enterprise tier recommended for N26's production digital asset services.

Multi-environment license:
- Production (Enterprise): EUR 280,000
- Staging (Foundation, 50% discount): EUR 40,000
- Development (Foundation, 75% discount): EUR 20,000
- **Total multi-environment: EUR 340,000 per year**

---

## Deployment Options and Pricing

### Recommended: N26's Kubernetes Cluster (EU Region)

DALP deploys on N26's existing Kubernetes infrastructure in Frankfurt using Helm charts, compatible with N26's GitOps workflow.

| Component | Monthly Estimate | Annual |
|---|---|---|
| Kubernetes namespace resources (shared cluster) | EUR 800 | EUR 9,600 |
| PostgreSQL (dedicated RDS Multi-AZ) | EUR 800 | EUR 9,600 |
| S3 object storage (3TB) | EUR 80 | EUR 960 |
| AWS KMS (Frankfurt) | EUR 200 | EUR 2,400 |
| Network and data transfer | EUR 200 | EUR 2,400 |
| Besu validator nodes (3x t3.xlarge) | EUR 350 | EUR 4,200 |
| **Total infrastructure estimate** | **EUR 2,430/month** | **EUR 29,160/year** |

**DFNS custody:** EUR 50,000 to EUR 80,000 per year for consumer passkey wallet management. Consumer wallet volume drives DFNS pricing; SettleMint negotiates preferred DFNS pricing for Enterprise customers. Cost scales with number of active consumer wallets.

**Managed SaaS development and staging:** EUR 40,000 per year (included in Foundation tier). Development environment in SettleMint Managed SaaS gives N26's engineering team immediate sandbox access without Kubernetes setup overhead.

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
| Dedicated Support Team | Named team |
| Customer Success Manager | Named CSM |
| Quarterly Architecture Reviews | Included |

Consumer-facing digital asset services require Enterprise support. A savings note subscription failure or yield distribution error affecting N26 customers is a P1 incident requiring immediate response.

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
| Phase 1: Discovery | BaFin regulatory mapping, mobile banking assessment, architecture design | 2 weeks | EUR 38,000 |
| Phase 2: Configuration | Kubernetes deployment, savings product configuration, consumer compliance modules, DFNS passkey setup | 3 weeks | EUR 62,000 |
| Phase 3: Integration | Mobile banking API, DFNS passkey mobile SDK, N26 KYC claims, webhooks, analytics | 3 weeks | EUR 105,000 |
| Phase 4: Testing | Functional, security, performance, compliance validation, consumer UAT | 3 weeks | EUR 82,000 |
| Phase 5: Go-Live | Production deployment, beta cohort launch | 1 week | EUR 43,000 |
| Phase 6: Hypercare | Monitoring, optimization, knowledge transfer | 2 weeks | EUR 40,000 |
| **Total** | | **14 weeks** | **EUR 370,000** |

### Implementation Assumptions

Technology readiness: N26 provides access to mobile banking core APIs and KYC claim issuance documentation within 1 week of Phase 2 start.

Asset scope: Phase 1 covers EUR-denominated tokenized savings notes and deposit products. GBP and SEK products require Phase 2 (separately scoped). Stablecoin payment features require Phase 2 (separately scoped). Crypto asset custody services require Phase 3 (separately scoped).

DFNS integration: pricing assumes DFNS passkey wallet management. Alternative custody provider requires separate assessment.

Blockchain network: private Besu or Polygon PoS. Ethereum mainnet increases Phases 2-4 fees by approximately EUR 15,000.

N26 Kubernetes: pricing assumes deployment on N26's existing Kubernetes cluster. Dedicated cluster provisioning increases infrastructure costs and may extend Phase 2 timeline.

### Out-of-Scope Items

- Custom signer adapter for non-DFNS custody
- Custom compliance module development
- Consumer data migration
- GBP, SEK, and additional currency savings products (Phase 2)
- Stablecoin payment features (Phase 2)
- Crypto asset custody services (Phase 3)
- Regulatory advisory or legal review

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

Master Services Agreement with: Platform License Agreement (Enterprise tier, 3-year recommended); Implementation Statement of Work (6-phase, milestone-based); Support Services Agreement (Enterprise Support); Data Processing Agreement (GDPR); German law governing law option available.

### Payment Schedule

| Milestone | Payment | Amount (EUR) |
|---|---|---|
| Contract execution | Platform license Year 1 (50%) | 140,000 |
| Contract execution | Phase 1: Discovery | 38,000 |
| Phase 1 gate review | Phase 2: Configuration | 62,000 |
| Phase 2 gate review | Phase 3 commencement | 52,500 |
| Phase 3 gate review | Phase 4 commencement | 52,500 |
| Phase 4 gate review | Phase 5 and 6 balance | 85,000 |
| Production go-live | Platform license Year 1 (50%) | 140,000 |
| Annual renewal (Year 2) | Platform license Year 2 | 280,000 |
| Annual renewal (Year 2) | Support Year 2 | 120,000 |
| Annual renewal (Year 3) | Platform license Year 3 | 308,000 |
| Annual renewal (Year 3) | Support Year 3 | 120,000 |

### Minimum Contract Term

Recommended 3 years. Annual break right at each renewal with 90 days written notice.

### Intellectual Property and Data

N26 retains ownership of all customer data and digital asset transaction records. DALP stores hashed customer references; personal data remains in N26's systems. Platform software licensed, not transferred. N26-specific configurations (consumer compliance module parameters, product configurations) remain N26's property.

### Exit Assistance

Complete data export (JSON, CSV, structured database). 90-day post-termination data access. Technical handover (up to 3 days). Audit log preservation for BaFin retention requirements.

---

## Total Cost of Ownership

### 3-Year TCO Model

| Cost Category | Year 1 | Year 2 | Year 3 | 3-Year Total |
|---|---|---|---|---|
| Platform License (Enterprise Production) | EUR 280,000 | EUR 280,000 | EUR 308,000 | EUR 868,000 |
| Platform License (Foundation Dev/Staging) | EUR 60,000 | EUR 60,000 | EUR 66,000 | EUR 186,000 |
| Enterprise Support | EUR 120,000 | EUR 120,000 | EUR 120,000 | EUR 360,000 |
| Implementation Phase 1 | EUR 370,000 | - | - | EUR 370,000 |
| Phase 2 (stablecoin, GBP/SEK savings) | - | EUR 130,000 | - | EUR 130,000 |
| Phase 3 (crypto asset services) | - | - | EUR 110,000 | EUR 110,000 |
| N26 Kubernetes infrastructure | EUR 35,000 | EUR 40,000 | EUR 45,000 | EUR 120,000 |
| DFNS custody (consumer wallets) | EUR 60,000 | EUR 65,000 | EUR 70,000 | EUR 195,000 |
| N26 internal (1.5 FTE Year 1) | EUR 225,000 | EUR 75,000 | EUR 75,000 | EUR 375,000 |
| **Total 3-Year TCO** | **EUR 1,150,000** | **EUR 770,000** | **EUR 794,000** | **EUR 2,714,000** |

### 5-Year TCO vs. Build Alternative

| Scenario | 5-Year Total |
|---|---|
| DALP platform approach | EUR 4,000,000 |
| Custom build alternative | EUR 5,800,000 |
| **DALP savings** | **EUR 1,800,000 (31%)** |

---

## Reference Clients

### Nordea

Nordea deployed DALP for tokenized funds distribution under Nordic regulatory frameworks comparable to Germany's BaFin requirements. The Nordea reference demonstrates DALP's ability to deliver consumer-facing digital asset savings products at a Tier-1 European retail bank with compliance controls, investor eligibility verification, and yield distribution automation.

### Commerzbank

Commerzbank deployed DALP under BaFin supervision in Germany. The Commerzbank reference confirms DALP's BaFin-ready compliance posture and demonstrates DALP's ability to satisfy German institutional security review and vendor risk assessment processes. EUR 7 million in annual operational savings identified during Phase 1.

### ADI Finstreet

ADI Finstreet deployed tokenized equity with DFNS custody integration and embedded mobile financial product features. The ADI reference demonstrates DALP powering mobile-embedded digital asset services through DFNS passkey wallets, directly paralleling N26's requirements for consumer savings products. Reference calls available subject to confidentiality constraints.

---

## Next Steps

**Clarification period (deadline 03 April 2026):** Clarification questions responded to within 2 business days. Contact: bids@settlemint.com.

**Shortlist notification (by 15 May 2026):** Architecture walkthrough (2 hours) with N26's platform engineering team, consumer experience deep-dive demonstrating DFNS passkey flow and N26 app integration pattern (1.5 hours), live platform demonstration with N26-specific scenarios.

**Deep-dive sessions (Late May 2026):** Day 1: technical architecture; BaFin and MiCA compliance framework. Day 2: DFNS passkey integration workshop; commercial discussion.

**Reference calls:** Available with Nordea, Commerzbank, and ADI Finstreet within 5 business days of written request.

**Implementation start (Q3 2026):** Contract execution by end of June 2026 enables Q4 2026 beta cohort launch. SettleMint mobilizes delivery team within 5 business days.

---

## Appendix: Commercial Assumptions and Dependencies Register

### Third-Party Dependencies

| Dependency | Provider | Annual Estimate | Responsibility | Risk |
|---|---|---|---|---|
| Consumer Passkey Wallets | DFNS | EUR 50,000-80,000 | N26 | Medium: volume-dependent |
| Blockchain RPC | Infura/Alchemy (EU) | EUR 5,000-10,000 | N26 (prod) | Low |
| Blockchain Validators | N26-operated Besu | EUR 15,000-20,000 | N26 | Low |
| N26 KYC Provider | N26's existing | Existing contract | N26 | Low |
| Cloud Infrastructure | AWS (Frankfurt) | EUR 30,000-40,000 | N26 | Low |

### Volume Thresholds (Enterprise Tier)

| Metric | Included | Overage |
|---|---|---|
| Active token types | Unlimited | N/A |
| Monthly on-chain transactions | Up to 1,000,000 | Contact SettleMint |
| Active customer wallets | Up to 100,000 | Contact SettleMint |
| API requests (monthly) | Up to 50,000,000 | EUR 0.01 per 1,000 |

Note: at 5% adoption of N26's 8 million customers, active wallets reach 400,000. This exceeds the standard Enterprise threshold. SettleMint provides enterprise volume pricing for N26's scale; wallet threshold is negotiated as part of contract terms based on N26's projected customer adoption curve. 60-day advance notice provided when approaching any volume threshold.

---

*Document Classification: SettleMint Confidential*
*SettleMint NV | Simon Bolivarlaan 5, 2600 Antwerp, Belgium | www.settlemint.com*
