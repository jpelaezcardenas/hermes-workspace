# Commercial Proposal: Tokenized Derivatives Clearing

**Prepared for:** Eurex Clearing AG
**Document Title:** Commercial Proposal: Tokenized Derivatives Clearing
**RFP Reference:** EUREX-RFP-202603
**Submission Date:** March 2026
**Version:** 1.0 Draft
**Classification:** SettleMint Confidential

---

## Table of Contents

1. Executive Summary
2. Investment Rationale
3. Licensing Model
4. Deployment Options and Pricing
5. Support and SLA Framework
6. Implementation Investment
7. Total Cost of Ownership
8. Commercial Terms
9. Reference Clients
10. Next Steps

---

## 1. Executive Summary

Eurex Clearing requires tokenized derivatives clearing infrastructure that preserves the CCP clearing guarantee, enforces EMIR-mandated margin and segregation requirements, and provides default management capability under time pressure. The commercial decision is whether to build the on-chain account segregation, margin eligibility enforcement, and default management layer internally, assemble it from multiple vendors, or adopt a platform with proven CCP-grade control architecture.

The build path at Eurex is particularly problematic because the margin enforcement and default management capabilities required are operationally critical and time-sensitive. A default management system that has never been stress-tested in production, built by an engineering team with no prior CCP infrastructure experience, and deployed under EMIR regulatory scrutiny from day one, carries implementation and regulatory risk that cannot be mitigated by engineering effort alone.

DALP's CUSTODIAN role, margin eligibility modules, and account segregation architecture have been refined through production deployments at comparable post-trade infrastructure operators. The commercial model reflects this maturity: a governed platform that Eurex can operate, test, and audit without permanent vendor dependency.

**Recommended profile:**
- License tier: Sovereign (CCP-grade governance controls; dedicated SRE)
- Deployment: Private Cloud (Frankfurt, Germany)
- Implementation: Fixed-price, 32-week delivery with default management test programme
- Support: Enterprise (24/7, DORA/EMIR aligned)

**Indicative 3-year investment:** EUR [CLIENT-SPECIFIC: ~6M-10M] total. Build-from-scratch estimate: EUR 15-25M+ over 30-36 months with no production validation.

---

## 2. Investment Rationale

### 2.1 Cost of Current Approach

**Build path estimate:** EUR 15-25M+ over 30-36 months. Components required:
- On-chain account segregation and access control: 6-8 FTE, 18 months
- Margin eligibility enforcement engine: 4-6 FTE, 15 months
- Novation state management: 3-4 FTE, 12 months
- Default management workflow (CUSTODIAN equivalent): 3-4 FTE, 12 months
- PRISMA integration layer: 4-5 FTE, 12 months
- EMIR/DORA compliance documentation: 2-3 FTE, 9 months

**Critical risk of build path:** Default management procedures must be pre-tested and pre-authorized. Building these capabilities internally requires extensive internal governance approvals before testing can begin. DALP's CUSTODIAN model comes with pre-defined governance patterns that Eurex adapts to its procedures rather than designing from scratch.

**Multi-vendor assembly risk:** CCP operations under EMIR require a coherent incident response model. Multi-vendor assembly creates unclear accountability boundaries when a margin enforcement failure coincides with a default management event, precisely the scenario where clarity is most critical.

### 2.2 DALP Value Drivers

| Capability | Build Cost | DALP |
|---|---|---|
| Account segregation at contract layer | EUR 3-5M | Included |
| Margin eligibility enforcement | EUR 4-7M | Included: 18 module types |
| Default management tools (CUSTODIAN) | EUR 3-5M | Included |
| PRISMA integration framework | EUR 3-5M | REST API contract |
| EMIR technical documentation | EUR 1-2M | Pre-documented architecture |

### 2.3 ROI

| Value Driver | Basis |
|---|---|
| Build cost avoided | EUR 15-25M over 30-36 months |
| Regulatory readiness from launch | Pre-defined EMIR control architecture |
| Default management pre-tested | Dress rehearsal programme included in Phase 4 |
| DORA ICT documentation packaged | Reduces DORA preparation overhead |
| Platform reuse for additional instruments | Same platform for equity derivatives, FX clearing |

---

## 3. Licensing Model

### 3.1 Philosophy

Platform license model. EMIR requires margin checks, compliance evaluations, and audit events on every clearing operation. A per-operation pricing model would penalize Eurex for operating within EMIR's compliance requirements. The annual subscription covers all compliance evaluations, margin operations, and audit events.

### 3.2 Tiers

| Capability | Foundation | Enterprise | Sovereign (Recommended) |
|---|---|---|---|
| Compliance modules | All 18 | All 18 | All 18 + custom |
| CUSTODIAN role (default management) | Standard | Enhanced | Full CCP default management |
| EMIR technical documentation | Standard | Enhanced | Full EMIR-aligned |
| Dedicated SRE | Shared | Designated | Named dedicated |
| Custom SLA | Standard | Negotiated | Fully custom |
| Annual license (indicative) | EUR [CLIENT-SPECIFIC: ~500K-700K] | EUR [CLIENT-SPECIFIC: ~800K-1.2M] | EUR [CLIENT-SPECIFIC: ~1.5M-2.5M] |

**Recommended: Sovereign.** Eurex's EMIR authorisation, the systemic importance of its clearing guarantee, and the specific default management control requirements justify the Sovereign tier's additional governance controls and dedicated engagement model.

---

## 4. Deployment Options and Pricing

**Recommended: Private Cloud (Frankfurt, Germany)**

Eurex manages DALP on Frankfurt-region cloud subscription (AWS eu-central-1 or Azure Germany West Central). German data residency. BaFin/ESMA supervisory access via AUDITOR role.

**Infrastructure cost (Eurex-borne, indicative):**

| Component | Monthly |
|---|---|
| Kubernetes (3-AZ Frankfurt) | EUR 4,000-8,000 |
| PostgreSQL Multi-AZ | EUR 2,000-4,000 |
| Besu validators (4) | EUR 2,500-5,000 |
| Redis, storage, networking | EUR 1,500-3,000 |
| **Total** | **EUR 10,000-20,000/month** |

---

## 5. Support and SLA Framework

### 5.1 Enterprise Support (Recommended)

| Capability | Standard | Premium | Enterprise |
|---|---|---|---|
| Coverage | 09:00-18:00 CET | 07:00-22:00 CET | 24/7 |
| P1 Response | 4 hours | 1 hour | 15 minutes |
| P1 Resolution | 8 hours | 4 hours | 2 hours |
| Uptime SLA | 99.9% | 99.95% | 99.99% |
| Dedicated SRE | Shared | Designated | Named |
| Default management on-call | No | Emergency only | Dedicated protocol |

### 5.2 Severity Levels

| Level | Definition | Response | Resolution |
|---|---|---|---|
| P1 | Platform down; default management unavailable; margin engine unavailable | 15 min | 2 hours |
| P2 | Major function impaired | 1 hour | 4 hours |
| P3 | Non-critical | 4 hours | 2 business days |
| P4 | General | 1 business day | Next cycle |

P1 incidents at Eurex are treated as DORA and EMIR critical incidents. ESMA/BaFin notification within 4 hours of confirmed P1. Root cause analysis within 5 business days.

---

## 6. Implementation Investment

| Phase | Duration | Deliverables | Investment |
|---|---|---|---|
| Discovery | 3 weeks | PRISMA integration design, default management procedures, account structure | EUR [CLIENT-SPECIFIC: ~180K-280K] |
| Foundation | 4 weeks | Environments, Besu network, HSM, account structure setup | EUR [CLIENT-SPECIFIC: ~220K-380K] |
| Configuration | 7 weeks | Margin modules, novation config, default tools, PRISMA spec | EUR [CLIENT-SPECIFIC: ~300K-500K] |
| Integration and Testing | 12 weeks | PRISMA integration, C7 integration, default management testing (3 stages), UAT | EUR [CLIENT-SPECIFIC: ~500K-750K] |
| Production and Parallel Run | 3 weeks | Production deployment, parallel run | EUR [CLIENT-SPECIFIC: ~150K-250K] |
| Hypercare | 3 weeks | Hypercare, documentation, training, transition | EUR [CLIENT-SPECIFIC: ~120K-220K] |
| **Total** | **32 weeks** | | **EUR [CLIENT-SPECIFIC: ~1.5M-2.4M]** |

**Default management test programme is included in Phase 4:** tabletop exercise (1 day), technical testing (3 days in staging), and dress rehearsal (1 day full simulation). This is not optional; it is a required deliverable for production go-live acceptance.

---

## 7. Total Cost of Ownership

### 7.1 Three-Year TCO

| Year | License | Implementation | Support | Infrastructure | Total |
|---|---|---|---|---|---|
| Year 1 | EUR [CLIENT-SPECIFIC: ~2M] | EUR [CLIENT-SPECIFIC: ~1.95M] | EUR [CLIENT-SPECIFIC: ~450K] | EUR [CLIENT-SPECIFIC: ~200K] | EUR [CLIENT-SPECIFIC: ~4.6M] |
| Year 2 | EUR [CLIENT-SPECIFIC: ~2M] | 0 | EUR [CLIENT-SPECIFIC: ~450K] | EUR [CLIENT-SPECIFIC: ~240K] | EUR [CLIENT-SPECIFIC: ~2.7M] |
| Year 3 | EUR [CLIENT-SPECIFIC: ~2M] | 0 | EUR [CLIENT-SPECIFIC: ~450K] | EUR [CLIENT-SPECIFIC: ~240K] | EUR [CLIENT-SPECIFIC: ~2.7M] |
| **3-Year Total** | | | | | **EUR [CLIENT-SPECIFIC: ~10M]** |

### 7.2 Build vs. DALP

| Criterion | DALP | Build |
|---|---|---|
| 3-year cost | EUR ~10M | EUR 20-35M+ |
| Time to CCP-ready | 32 weeks | 30-36 months |
| EMIR control architecture | Pre-defined, production-proven | Custom, untested |
| Default management test programme | Included in implementation | Design, build, test from scratch |
| PRISMA integration framework | REST API contract | Custom |

---

## 8. Commercial Terms

### 8.1 Contract Structure

Sovereign Platform License Agreement (3-year initial term), Fixed-Price Implementation Agreement (with default management test programme as contractual deliverable), Enterprise Support Agreement (co-terminus with license).

### 8.2 Payment Schedule

Implementation: 20% at signing, 15% per phase gate, 10% at go-live. Milestone gate for default management dress rehearsal is a go-live prerequisite.

License and support: Annual in advance. First payment on license activation (production go-live).

### 8.3 IP and Data

DALP platform IP: SettleMint. Clearing position data and configurations: Eurex. PRISMA integration adapter: Eurex on delivery. Default management procedures: Eurex.

### 8.4 Exit

90-day transition assistance. Full data export. EMIR 5-year audit record preservation. On-chain state on Eurex's Besu network accessible independently of SettleMint.

---

## 9. Reference Clients

| Client | Geography | Use Case | Relevance |
|---|---|---|---|
| Clearstream | Luxembourg | Tokenized collateral (eligibility enforcement, XvP) | EMIR eligibility requirements; atomic settlement |
| Bank of England | UK | CBDC pilot (FMI governance, DORA resilience) | FMI emergency controls; governance authority model |
| Euroclear | Belgium | Digital securities settlement (settlement finality) | Post-trade finality; CSDR/DORA |
| JSE | South Africa | Digital asset settlement | CCP settlement integration |

---

## 10. Next Steps

| Step | Timing |
|---|---|
| Commercial Q&A | Within 2 weeks |
| PRISMA integration scoping workshop | Week 3-4 |
| Default management procedure review | Week 4-5 |
| Technical due diligence | Week 4-6 |
| Firm commercial proposal | Week 5-7 |
| Default management test programme contract | Week 8 (included in implementation agreement) |
| Contract negotiation | Week 8-12 |

---

*Document Classification: SettleMint Confidential*
*Version 1.0 Draft, March 2026*
