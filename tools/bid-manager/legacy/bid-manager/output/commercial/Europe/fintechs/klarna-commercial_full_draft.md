# Tokenized Lending Infrastructure
## Commercial Proposal for Klarna Bank AB
### SettleMint | March 2026 | v1.0 | SettleMint Confidential

---

**Prepared by:** SettleMint NV
**Prepared for:** Klarna Bank AB, Stockholm, Sweden
**Document reference:** SM-COMM-KLARNA-2026-001
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

Klarna's tokenized lending infrastructure programme creates a foundation for programmable credit servicing, receivables funding optimization, and real-time portfolio transparency that traditional balance sheet management cannot match. The investment decision is whether to build this infrastructure through custom blockchain development, historically 18 to 24 months and EUR 3 to 7 million before a production service is operational, or through DALP, SettleMint's production-grade platform, which delivers the same capability in 15 to 19 weeks at a fraction of the development and ongoing operating cost.

This commercial proposal structures the investment for Klarna's tokenized lending programme transparently. Total implementation investment: EUR 400,000 for the 15 to 19 week Phase 1 programme. Annual platform license: EUR 280,000 (Enterprise tier). Annual Enterprise support: EUR 120,000. Total Year 1 investment approximately EUR 800,000 including infrastructure and custody.

The investment case is anchored in three value drivers: receivables funding cost reduction through programmatic capital markets access, servicing operations cost reduction through automated yield distribution and lifecycle management, and regulatory evidence improvement through real-time portfolio data and tamper-evident audit trails.

### Investment Summary

| Investment Category | Year 1 | Year 2 | Year 3 | 3-Year Total |
|---|---|---|---|---|
| Implementation (one-time) | EUR 400,000 | - | - | EUR 400,000 |
| Platform License (Enterprise) | EUR 280,000 | EUR 280,000 | EUR 308,000 | EUR 868,000 |
| Enterprise Support | EUR 120,000 | EUR 120,000 | EUR 120,000 | EUR 360,000 |
| Infrastructure (Private Cloud, EU) | EUR 50,000 | EUR 55,000 | EUR 60,000 | EUR 165,000 |
| Custody (Fireblocks/DFNS) | EUR 50,000 | EUR 55,000 | EUR 60,000 | EUR 165,000 |
| **Total** | **EUR 900,000** | **EUR 510,000** | **EUR 548,000** | **EUR 1,958,000** |

---

## Investment Rationale

### The Funding and Operations Cost Case

BNPL receivables management through traditional processes involves periodic reconciliation, intermediated capital markets access, and manual servicing operations. The cost components that tokenized infrastructure addresses:

Capital markets intermediation: selling BNPL receivables to investors through traditional securitization structures involves legal, rating, and distribution costs of 50 to 150 basis points on deal size. Tokenized receivables with programmatic investor distribution reduce intermediation cost by eliminating several layers of manual documentation and processing.

Servicing operations overhead: distributing interest payments, managing maturity events, processing defaults, and maintaining audit records for a large receivable portfolio requires operations headcount that scales with portfolio size. DALP's automated yield distribution and lifecycle management reduces operations cost per loan.

Regulatory reporting overhead: Finansinspektionen consumer credit reporting requires granular portfolio data. DALP's event system provides this data automatically, reducing the manual extraction and reporting effort that off-chain systems require.

### ROI Framework

**Cost reduction (Year 2-3 annualized):**

Capital markets intermediation reduction: tokenized receivables distribution reduces distribution cost by 20 to 40 basis points on distributed volume. For EUR 500 million in tokenized receivable pools, savings range from EUR 1 million to EUR 2 million per year.

Servicing operations efficiency: automated yield distribution and lifecycle management reduces servicing operations cost per loan. Estimate 20 to 30 percent reduction in servicing operations overhead for tokenized portfolio.

Regulatory reporting efficiency: automated event-driven reporting reduces manual extraction effort. Estimate 0.3 to 0.5 FTE savings in compliance reporting operations.

**Revenue creation:**

Premium yield instruments for institutional investors: tokenized credit notes issued directly to institutional investors can carry higher yields than equivalent traditional structured products, reflecting the lower intermediation cost. Klarna captures a portion of the intermediation savings as additional funding spread.

### Build vs. Buy Analysis

| Factor | Custom Build | DALP |
|---|---|---|
| Time to production | 18-24 months | 15-19 weeks |
| Initial development cost | EUR 3-7 million | EUR 400,000 |
| Ongoing maintenance | EUR 1-2 million per year | EUR 280,000 per year |
| Compliance module updates | Custom per regulatory change | Included in license |
| Security certifications | Client responsibility | Included |
| Yield automation | Custom development | Included in platform |

---

## Licensing Model

### Philosophy

DALP is licensed as a platform. The license fee covers the full capability set: bond and deposit token templates, 18 compliance module types, yield schedule automation, DvP settlement, OnchainID identity system, REST API, TypeScript SDK, CLI, and observability stack. No hidden dependency on SettleMint professional services for routine lending operations.

The licensing model remains predictable as Klarna's programme scales. Adding GBP or SEK credit instruments, expanding investor jurisdictions, or increasing origination volume within the licensed tier does not trigger incremental fees.

### Platform Tiers and Annual License Fees

| Tier | Annual License | Target Use Case |
|---|---|---|
| Foundation | EUR 80,000 | Development, staging, non-critical |
| Enterprise | EUR 280,000 | Production lending infrastructure |
| Sovereign | EUR 480,000 | Maximum-security, sovereign-scale |

Enterprise tier recommended for Klarna's production tokenized lending infrastructure.

Multi-environment license:
- Production (Enterprise): EUR 280,000
- Staging (Foundation, 50% discount): EUR 40,000
- Development (Foundation, 75% discount): EUR 20,000
- **Total multi-environment: EUR 340,000 per year**

---

## Deployment Options and Pricing

### Recommended: Private Cloud (EU Region)

Production in Klarna's private cloud with EU data residency (Stockholm or Frankfurt) for Finansinspektionen and GDPR compliance.

| Component | Monthly Estimate | Annual |
|---|---|---|
| EKS cluster (3x m5.2xlarge, multi-AZ) | EUR 1,200 | EUR 14,400 |
| RDS PostgreSQL Multi-AZ | EUR 800 | EUR 9,600 |
| S3 object storage (5TB) | EUR 120 | EUR 1,440 |
| Secrets Manager / KMS (EU region) | EUR 200 | EUR 2,400 |
| Network and data transfer | EUR 300 | EUR 3,600 |
| Besu validator nodes (2x t3.xlarge) | EUR 400 | EUR 4,800 |
| **Total infrastructure** | **EUR 3,020/month** | **EUR 36,240/year** |

**Third-party costs:**
- Fireblocks or DFNS institutional MPC custody: EUR 30,000 to EUR 80,000 per year
- Blockchain RPC endpoints: EUR 5,000 to EUR 15,000 per year

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

Enterprise support is required for credit infrastructure where yield distribution failures or portfolio reconciliation errors have direct financial impact on investors and Klarna's regulatory obligations.

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
| Phase 1: Discovery | Regulatory mapping, lending stack assessment, architecture design | 2 weeks | EUR 42,000 |
| Phase 2: Configuration | Environments, bond token configuration, compliance setup, identity, yield schedule | 4 weeks | EUR 70,000 |
| Phase 3: Integration | Lending API, treasury, collections, custody, investor KYC, webhooks | 4 weeks | EUR 120,000 |
| Phase 4: Testing | Functional, security, performance, compliance validation, UAT | 3 weeks | EUR 88,000 |
| Phase 5: Go-Live | Production deployment, initial receivable pool launch | 1 week | EUR 45,000 |
| Phase 6: Hypercare | Monitoring, optimization, knowledge transfer | 4 weeks | EUR 35,000 |
| **Total** | | **18 weeks** | **EUR 400,000** |

### Implementation Assumptions

Technology readiness: Klarna provides access to lending system APIs, treasury APIs, and investor KYC system with documentation within 1 week of Phase 2 start.

Asset scope: Phase 1 covers EUR BNPL receivables tokenization and EUR credit note issuance. GBP and SEK instruments require Phase 2 engagement (separately scoped). Adjacent services (savings notes, merchant credit instruments) require Phase 3 (separately scoped).

Custody provider: Fireblocks or DFNS. Custom signer adapter required for unsupported custody provider.

Investor KYC: OnchainID integration assumes institutional investor KYC provider with OpenID Connect-compatible claim issuance.

Blockchain network: private Besu or Polygon PoS. Ethereum mainnet increases Phases 2-4 fees by approximately EUR 20,000.

### Out-of-Scope Items

- Custom signer adapter for unsupported custody provider
- Custom compliance module development
- Consumer data migration
- GBP and SEK instrument expansion (Phase 2, separately scoped)
- Savings notes and merchant credit instruments (Phase 3, separately scoped)
- Regulatory advisory services or legal review

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

Master Services Agreement with: Platform License Agreement (Enterprise tier, 3-year recommended); Implementation Statement of Work (6-phase, milestone-based payment); Support Services Agreement (Enterprise Support); Data Processing Agreement (GDPR); Swedish law governing law option available.

### Payment Schedule

| Milestone | Payment | Amount (EUR) |
|---|---|---|
| Contract execution | Platform license Year 1 (50%) | 140,000 |
| Contract execution | Phase 1: Discovery | 42,000 |
| Phase 1 gate review | Phase 2: Configuration | 70,000 |
| Phase 2 gate review | Phase 3 commencement | 60,000 |
| Phase 3 gate review | Phase 4 commencement | 60,000 |
| Phase 4 gate review | Phase 5 and 6 balance | 68,000 |
| Production go-live | Platform license Year 1 (50%) | 140,000 |
| Annual renewal (Year 2) | Platform license Year 2 | 280,000 |
| Annual renewal (Year 2) | Support Year 2 | 120,000 |
| Annual renewal (Year 3) | Platform license Year 3 | 308,000 |
| Annual renewal (Year 3) | Support Year 3 | 120,000 |

### Minimum Contract Term

Recommended 3 years. Annual break right at each renewal with 90 days written notice.

### Intellectual Property and Data

Klarna retains ownership of all data in DALP's systems. Consumer data stored off-chain in Klarna's systems; DALP stores only hashed references. Platform software licensed, not transferred. Configurations developed for Klarna remain Klarna's property.

### Exit Assistance

Complete data export (JSON, CSV, structured database). 90-day post-termination access. Technical handover (up to 3 days). Audit log preservation for required retention period.

---

## Total Cost of Ownership

### 3-Year TCO Model

| Cost Category | Year 1 | Year 2 | Year 3 | 3-Year Total |
|---|---|---|---|---|
| Platform License (Enterprise Production) | EUR 280,000 | EUR 280,000 | EUR 308,000 | EUR 868,000 |
| Platform License (Foundation Dev/Staging) | EUR 60,000 | EUR 60,000 | EUR 66,000 | EUR 186,000 |
| Enterprise Support | EUR 120,000 | EUR 120,000 | EUR 120,000 | EUR 360,000 |
| Implementation Phase 1 | EUR 400,000 | - | - | EUR 400,000 |
| Phase 2 (GBP/SEK instruments) | - | EUR 120,000 | - | EUR 120,000 |
| Phase 3 (adjacent services) | - | - | EUR 100,000 | EUR 100,000 |
| Private Cloud (EU, Klarna) | EUR 45,000 | EUR 50,000 | EUR 55,000 | EUR 150,000 |
| Fireblocks/DFNS custody | EUR 50,000 | EUR 55,000 | EUR 60,000 | EUR 165,000 |
| Klarna internal (1.5 FTE Year 1) | EUR 225,000 | EUR 75,000 | EUR 75,000 | EUR 375,000 |
| **Total 3-Year TCO** | **EUR 1,180,000** | **EUR 760,000** | **EUR 784,000** | **EUR 2,724,000** |

### 5-Year TCO vs. Build Alternative

| Scenario | 5-Year Total |
|---|---|
| DALP platform approach | EUR 4,100,000 |
| Custom build alternative | EUR 6,000,000 |
| **DALP savings** | **EUR 1,900,000 (32%)** |

---

## Reference Clients

### Commerzbank

Commerzbank deployed DALP for bond token lifecycle management in production, achieving settlement under 10 seconds and identifying EUR 7 million in annual operational savings. The Commerzbank reference demonstrates European institutional bond lifecycle management directly relevant to Klarna's tokenized credit note programme.

### National Bank of Egypt

National Bank of Egypt deployed DALP for tokenized fixed income origination and investor servicing. The programme covers credit instrument issuance, investor eligibility verification, yield distribution, and maturity redemption. This reference demonstrates the full credit instrument lifecycle that Klarna's receivables programme requires.

### Nordea

Nordea deployed DALP for tokenized funds distribution under Nordic regulatory frameworks. The Nordea reference is particularly relevant to Klarna's Swedish Finansinspektionen and EEA regulatory context. DALP's compliance modules addressed Nordic investor eligibility and transfer restriction requirements. Reference calls available subject to confidentiality constraints.

---

## Next Steps

**Clarification period (deadline 03 April 2026):** SettleMint responds to clarification questions within 2 business days. Contact: bids@settlemint.com.

**Shortlist notification (by 15 May 2026):** Architecture walkthrough (2 hours), credit operations deep-dive (1.5 hours), live platform demonstration with Klarna-specific scenarios.

**Deep-dive sessions (Late May 2026):** Day 1: technical architecture; compliance and risk framework. Day 2: implementation programme; commercial discussion.

**Reference calls:** Available with Commerzbank, National Bank of Egypt, and Nordea within 5 business days of written request.

**Implementation start (Q3 2026):** Contract execution by end of June 2026 enables Q4 2026 go-live for initial receivable pool.

---

## Appendix: Commercial Assumptions and Dependencies Register

### Third-Party Dependencies

| Dependency | Provider | Annual Estimate | Responsibility | Risk |
|---|---|---|---|---|
| MPC Custody | Fireblocks or DFNS | EUR 30,000-80,000 | Klarna | Medium |
| Blockchain RPC | Infura/Alchemy (EU) | EUR 5,000-15,000 | Klarna (prod) | Low |
| Blockchain Validators | Klarna-operated Besu | EUR 10,000-20,000 | Klarna | Low |
| Institutional KYC Provider | Klarna's existing | Existing contract | Klarna | Low |
| Cloud Infrastructure | AWS/Azure/GCP (EU) | EUR 36,000-50,000 | Klarna | Low |

### Volume Thresholds (Enterprise Tier)

| Metric | Included | Overage |
|---|---|---|
| Active token types | Unlimited | N/A |
| Monthly on-chain transactions | Up to 1,000,000 | Contact SettleMint |
| Active investor wallets | Up to 100,000 | Contact SettleMint |
| API requests (monthly) | Up to 50,000,000 | EUR 0.01 per 1,000 |

---

*Document Classification: SettleMint Confidential*
*SettleMint NV | Simon Bolivarlaan 5, 2600 Antwerp, Belgium | www.settlemint.com*
