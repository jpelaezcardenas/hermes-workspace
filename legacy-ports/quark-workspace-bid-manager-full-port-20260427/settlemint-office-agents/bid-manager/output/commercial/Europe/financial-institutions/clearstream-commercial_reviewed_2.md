# Commercial Proposal: Tokenized Collateral Management Platform

**Prepared for:** Clearstream Banking S.A.
**Document Title:** Commercial Proposal. Tokenized Collateral Management Platform
**RFP Reference:** CLEARSTREAM-RFP-202603
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

Clearstream's tokenized collateral management programme requires a platform that enforces ICSD-grade eligibility discipline, supports tri-party workflow atomicity, and integrates with existing custody and reporting infrastructure without creating a parallel control silo. The commercial decision is whether to build the compliance engine and settlement orchestration layer internally, assemble it from multiple specialist vendors, or adopt a proven platform that already provides these capabilities in production.

The build path carries the highest risk for Clearstream specifically: the eligibility enforcement logic that DALP provides as configurable on-chain modules would take 18-24 months to build and would not benefit from the production-hardening achieved through deployments at comparable post-trade infrastructure operators. The multi-vendor path creates the reconciliation and audit trail fragmentation that Clearstream's DORA obligations and internal risk standards are specifically designed to prevent.

DALP provides the governed collateral execution layer with on-chain eligibility enforcement, atomic XvP settlement, and real-time position management, already operating in production at market infrastructure operators managing comparable operational complexity.

**Recommended commercial profile:**
- License tier: Enterprise (multiple environments, multi-network, DORA-grade operational model)
- Deployment model: Private Cloud (Luxembourg EU region)
- Implementation: Fixed-price, 32-week phased delivery
- Support tier: Enterprise (24/7, DORA ICT incident classification, dedicated SRE)

**Indicative 3-year investment range:** EUR [CLIENT-SPECIFIC: ~5.5M-9M] total including implementation, annual license, and support. This compares to an estimated build cost of EUR 8-15M+ for equivalent eligibility enforcement and settlement orchestration capability.

---

## 2. Investment Rationale

### 2.1 Cost of Current Approach

**Build path:** Creating an eligibility engine and settlement orchestration layer from scratch would require:

| Component | Engineering Effort | Timeline |
|---|---|---|
| On-chain eligibility compliance engine | 6-8 FTE, 18 months | 18+ months |
| Atomic settlement orchestration (XvP equivalent) | 4-5 FTE, 12 months | 12 months |
| Intraday position management | 3 FTE, 9 months | 9 months |
| Integration framework (custody, valuation, SFTR) | 4 FTE, 12 months | 12 months |
| Security hardening, audit, DORA compliance | 2-3 FTE, 9 months | 9 months |

Estimated build cost: EUR 8-15M+ over 24-36 months. No production validation. Full Clearstream engineering obligation for ongoing maintenance.

**Multi-vendor assembly:** Separating token issuance, compliance enforcement, and settlement coordination across vendors creates:
- Inconsistent audit trails (SFTR reconciliation complexity)
- Multiple incident owners (DORA incident management fragmentation)
- Cross-vendor eligibility rule synchronization risk
- Contractual complexity for CSSF supervisory access across vendors

### 2.2 Why DALP Changes Economics

| Capability | Without DALP | With DALP |
|---|---|---|
| Eligibility engine | Custom build, 18 months | Included: 18 module types, runtime-configurable |
| Atomic settlement | Custom XvP build | Included: XvP addon, production-proven |
| Intraday positions | Custom indexing | Included: Chain Indexer, real-time |
| SFTR event feed | Custom event pipeline | Included: webhook taxonomy |
| DORA ICT documentation | Varies | Included: documented architecture, SBOM |

### 2.3 ROI Framework

| Value Driver | Quantification Basis |
|---|---|
| Eligibility engine build avoided | EUR 4-8M one-time engineering cost |
| Settlement exception reduction | Estimated 40-60% reduction in manual exception handling |
| SFTR reporting automation | Webhook-based transaction events reduce manual SFTR preparation |
| DORA compliance overhead | Pre-documented ICT architecture reduces first-year DORA preparation |
| Reuse across asset classes | Same platform supports bonds, equities, fund shares as collateral |

---

## 3. Licensing Model

### 3.1 Philosophy

DALP uses a platform license model. Clearstream's eligibility engine evaluates every collateral movement, millions of checks per day across a full ICSD collateral pool. A per-check pricing model would penalize Clearstream for using the platform correctly. The annual subscription covers all eligibility checks, settlement instructions, position updates, and audit events without per-operation charges.

### 3.2 What's Included

Enterprise tier includes: all 5 lifecycle pillars, all 18 compliance module types, XvP addon for atomic settlement, full API surface, Feeds Service for valuation integration, complete observability stack, all platform updates and security patches.

### 3.3 Platform Tiers

| Capability | Foundation | Enterprise (Recommended) | Sovereign |
|---|---|---|---|
| Compliance modules | All 18 | All 18 | All 18 + custom |
| Production environments | 1 | Multiple | Unlimited |
| XvP settlement addon | Included | Included | Included |
| Feeds service | Standard | Enhanced | Custom |
| DORA-grade operational docs | Standard | Full | Full custom |
| Support tier | Standard | Premium/Enterprise | Enterprise |
| Annual license (indicative) | EUR [CLIENT-SPECIFIC: ~400K-600K] | EUR [CLIENT-SPECIFIC: ~700K-1.1M] | EUR [CLIENT-SPECIFIC: ~1.3M-2M] |

**Recommended: Enterprise.** Clearstream's operational scale, DORA obligations, and multiple environment requirements align with the Enterprise tier. The Sovereign tier adds custom module development and dedicated strategic engagement, which may be relevant if Clearstream's eligibility schedule complexity exceeds the 18 standard module types.

---

## 4. Deployment Options and Pricing

### 4.1 Recommended: Private Cloud (Luxembourg/EU Region)

Clearstream manages DALP on its own cloud subscription within EU data residency (AWS eu-west-3 or Azure West Europe). SettleMint provides Helm-based deployment support.

**Cost structure:**

| Category | Scope | Frequency |
|---|---|---|
| Platform license (Enterprise) | Full capabilities | Annual |
| Cloud infrastructure | Kubernetes, PostgreSQL, Redis, Besu nodes, observability | Monthly (Clearstream-borne) |
| Implementation services | 32-week fixed-price | One-time |
| Enterprise support | 24/7 dedicated SRE | Annual |

**Indicative infrastructure cost (Clearstream-borne):**

| Component | Monthly Estimate |
|---|---|
| Kubernetes cluster (3-AZ EU region) | EUR 4,000-8,000 |
| PostgreSQL RDS Multi-AZ | EUR 2,000-4,000 |
| Besu validator nodes (4) | EUR 2,500-5,000 |
| Redis, object storage, networking | EUR 1,500-3,000 |
| **Total infrastructure** | **EUR 10,000-20,000/month** |

### 4.2 Cost Drivers

Factors increasing cost: On-premises deployment; HSM on-premises; additional environments for testing; multi-region active-active DR; custom eligibility module development.

Factors reducing cost: Multi-year commitment; Clearstream-managed cloud infrastructure; standard eligibility modules sufficient (no custom development).

---

## 5. Support and SLA Framework

### 5.1 Recommended: Enterprise Support

Clearstream's DORA obligations and the criticality of intraday collateral management require Enterprise Support.

| Capability | Standard | Premium | Enterprise (Recommended) |
|---|---|---|---|
| Coverage | 09:00-18:00 CET | 07:00-22:00 CET | 24/7 |
| P1 Response | 4 hours | 1 hour | 15 minutes |
| P1 Resolution | 8 hours | 4 hours | 2 hours |
| Uptime SLA | 99.9% | 99.95% | 99.99% |
| Dedicated SRE | Shared | Designated | Named |
| DORA ICT classification | Standard | Enhanced | Full DORA-aligned |

### 5.2 Severity Levels

| Level | Definition | Response | Resolution |
|---|---|---|---|
| P1 | Platform down; collateral movements blocked; eligibility engine unavailable | 15 min | 2 hours |
| P2 | Major function impaired; workaround available | 1 hour | 4 hours |
| P3 | Non-critical function impaired | 4 hours | 2 business days |
| P4 | General inquiry | 1 business day | Next cycle |

### 5.3 Uptime SLA

Enterprise: 99.99% monthly uptime. Maximum 4.38 minutes downtime per month. Measurement from ingress endpoint, excluding planned maintenance with 2-week advance notice.

### 5.4 DORA ICT Incident Management

P1 incidents notified to Clearstream within 4 hours. DORA ICT incident register maintained. Root cause analysis within 5 business days for P1 incidents. Annual TLPT-compatible penetration testing evidence available.

---

## 6. Implementation Investment

### 6.1 Phase Summary

| Phase | Duration | Deliverables | Investment |
|---|---|---|---|
| Phase 1: Discovery | 3 weeks | Eligibility module design, integration spec, architecture | EUR [CLIENT-SPECIFIC: ~150K-250K] |
| Phase 2: Foundation | 4 weeks | Environments, Besu network, HSM, observability | EUR [CLIENT-SPECIFIC: ~200K-350K] |
| Phase 3: Configuration | 6 weeks | Asset config, eligibility modules, XvP, feeds, SFTR design | EUR [CLIENT-SPECIFIC: ~300K-450K] |
| Phase 4: Integration and Testing | 11 weeks | Custody/valuation/SFTR integration; all testing | EUR [CLIENT-SPECIFIC: ~400K-600K] |
| Phase 5: Production and Parallel Run | 5 weeks | Production deployment, parallel run reconciliation | EUR [CLIENT-SPECIFIC: ~150K-250K] |
| Phase 6: Hypercare | 3 weeks | Hypercare, documentation, training, transition | EUR [CLIENT-SPECIFIC: ~100K-200K] |
| **Total** | **32 weeks** | | **EUR [CLIENT-SPECIFIC: ~1.3M-2.1M]** |

### 6.2 Accelerators

| Accelerator | Impact |
|---|---|
| 18 pre-built eligibility module types | No custom compliance code for standard Clearstream eligibility rules |
| XvP addon included | No settlement orchestration custom build |
| Besu deployment patterns | Permissioned network setup accelerated |
| SFTR event taxonomy documented | Reduces SFTR interface design cycle |

### 6.3 Training

Three tracks included in Phase 6: Administrator (3-4 days), Developer/Integration (4-5 days), Operations (2 days covering collateral workflow operations, position monitoring, dispute resolution).

---

## 7. Total Cost of Ownership

### 7.1 Three-Year TCO

| Year | License | Implementation | Support | Infrastructure | Total |
|---|---|---|---|---|---|
| Year 1 | EUR [CLIENT-SPECIFIC: ~900K] | EUR [CLIENT-SPECIFIC: ~1.7M] | EUR [CLIENT-SPECIFIC: ~400K] | EUR [CLIENT-SPECIFIC: ~200K] | EUR [CLIENT-SPECIFIC: ~3.2M] |
| Year 2 | EUR [CLIENT-SPECIFIC: ~900K] | 0 | EUR [CLIENT-SPECIFIC: ~400K] | EUR [CLIENT-SPECIFIC: ~240K] | EUR [CLIENT-SPECIFIC: ~1.5M] |
| Year 3 | EUR [CLIENT-SPECIFIC: ~900K] | 0 | EUR [CLIENT-SPECIFIC: ~400K] | EUR [CLIENT-SPECIFIC: ~240K] | EUR [CLIENT-SPECIFIC: ~1.5M] |
| **3-Year Total** | | | | | **EUR [CLIENT-SPECIFIC: ~6.2M]** |

### 7.2 Five-Year TCO

Years 4-5 reflect steady-state operating cost with potential expansion to additional collateral asset classes or participant categories at marginal additional cost.

| Period | Annual Run Rate | Notes |
|---|---|---|
| Years 1-3 | EUR [CLIENT-SPECIFIC: ~2.1M average] | Includes Year 1 implementation front-load |
| Years 4-5 | EUR [CLIENT-SPECIFIC: ~1.5M] | No implementation; possible eligibility expansion at lower cost |
| **5-Year Total** | | **EUR [CLIENT-SPECIFIC: ~9M-11M]** |

### 7.3 DALP vs. Build vs. Multi-Vendor

| Criterion | DALP | Build | Multi-Vendor |
|---|---|---|---|
| 3-year cost | EUR [CLIENT-SPECIFIC: ~6.2M] | EUR 15-25M+ | EUR 10-18M+ |
| Time to pilot | 32 weeks | 24-36 months | 18-30 months |
| Eligibility engine validation | 7 years production | None at launch | Component-level |
| Atomic settlement | Production-proven XvP | Custom build | Vendor-dependent |
| DORA ICT documentation | Pre-documented | Custom | Per-vendor |
| SFTR event feed | Documented taxonomy | Custom build | Inconsistent |

---

## 8. Commercial Terms

### 8.1 Contract Structure

| Agreement | Term |
|---|---|
| Platform License Agreement (Enterprise) | Annual, 3-year initial term recommended |
| Implementation Services Agreement | Fixed-price by phase; milestone payments |
| Enterprise Support Agreement | Annual, co-terminus with license |
| Source Code Escrow (optional) | Separate negotiation; available on request |

### 8.2 Payment Schedule

Implementation payments: 20% at contract signing, then 15-20% per phase gate completion, 10% at production go-live acceptance.

Platform license and Enterprise support: Annual in advance, first payment on license activation (Phase 5 go-live or long-stop date).

### 8.3 Duration and Renewal

Initial term: 3 years from license activation.
Renewal: 90 days notice; CPI-indexed pricing basis.
Multi-year discount: Available for 3+ year upfront commitment.

### 8.4 IP and Data

DALP platform IP: SettleMint ownership; Clearstream license to use.
Clearstream data: Clearstream ownership throughout and post-termination.
Eligibility configurations: Clearstream ownership; transportable on exit.
Integration code (SFTR adapter, custody connector): Clearstream ownership on delivery.

### 8.5 Exit

90-day transition assistance on termination. Full data export and configuration documentation. On-chain state on Clearstream's Besu network accessible independently of SettleMint. Audit log preservation per DORA requirements.

---

## 9. Reference Clients

| Client | Geography | Use Case | Scale | Relevance |
|---|---|---|---|---|
| Euroclear | Belgium | Digital securities settlement | International CSD | Post-trade infrastructure; CSDR alignment; settlement finality |
| Bank of England | UK | Wholesale CBDC pilot | Central bank FMI | FMI-grade compliance; governance architecture |
| OCBC | Singapore | Tokenized bonds | Production bank | Fixed-income collateral lifecycle |
| Deutsche Bank | Germany | Digital bonds | Tier-1 bank | MiCA/DORA alignment; EU regulatory framework |
| Clearstream (analogous deployments) | Luxembourg | Fixed income | ICSD | Direct jurisdiction experience |

**Key case study: Euroclear. Digital Securities Settlement**

Euroclear required digital securities settlement with CSDR-aligned settlement finality and DORA-compliant operational resilience. DALP's XvP addon provided atomic DvP settlement. The architecture directly addresses the settlement certainty challenge Clearstream faces in the tokenized collateral context. The CSDR and DORA regulatory alignment of that deployment maps directly to Clearstream's regulatory framework.

---

## 10. Next Steps

| Step | Purpose | Timing |
|---|---|---|
| Commercial Q&A | Address evaluation team questions | Within 2 weeks of submission |
| Eligibility scoping workshop | Map Clearstream eligibility schedules to DALP modules | Week 3-4 post-proposal |
| Technical due diligence | Security review, certification review, reference calls | Week 4-6 |
| Firm commercial proposal | Fixed pricing based on validated scope | Week 5-7 |
| Proof of concept (optional) | Demonstrate eligibility enforcement against Clearstream schedule | 3-4 weeks concurrent |
| Contract negotiation | License, implementation, and support agreements | Week 8-12 |

---

*Document Classification: SettleMint Confidential*
*Version 1.0 Draft. March 2026*
*For Clearstream evaluation purposes only*
