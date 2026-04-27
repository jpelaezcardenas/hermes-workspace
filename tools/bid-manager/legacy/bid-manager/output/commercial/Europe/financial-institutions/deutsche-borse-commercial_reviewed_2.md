# Commercial Proposal: Regulated Digital Asset Trading Venue

**Prepared for:** Deutsche Börse AG
**Document Title:** Commercial Proposal: Regulated Digital Asset Trading Venue
**RFP Reference:** DEUTSCHEBORSE-RFP-202603
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

Deutsche Börse requires a regulated digital asset trading venue infrastructure that satisfies MiFID II's participant admission, market integrity surveillance, and fair and orderly market obligations, while integrating with the existing D3X/Xetra ecosystem. The commercial decision is whether to build the regulated token and compliance layer internally, procure it from multiple specialist vendors, or adopt a production-proven platform.

The build path is particularly costly in this context because Deutsche Börse needs not just a token issuance system but an on-chain participant admission and compliance enforcement layer that can withstand BaFin regulatory scrutiny from day one. Building a production-grade ERC-3643 admission control and settlement orchestration system from scratch requires 18-24 months and carries regulatory implementation risk that DALP's production track record at comparable exchange groups eliminates.

DALP provides the regulated token and compliance layer for Deutsche Börse's D3X/Xetra integration model, proven in production at exchange groups operating under comparable regulatory frameworks.

**Recommended commercial profile:**
- License tier: Enterprise
- Deployment model: Private Cloud (Frankfurt, Germany)
- Implementation: Fixed-price, 32-week delivery
- Support tier: Enterprise (24/7, DORA-aligned, dedicated SRE)

**Indicative 3-year investment:** EUR [CLIENT-SPECIFIC: ~5M-8.5M] total. This compares to EUR 10-18M+ estimated for equivalent in-house build.

---

## 2. Investment Rationale

### 2.1 Cost of Current Approach

**Build path estimate:** EUR 10-18M+ over 24-36 months for on-chain admission control, compliance enforcement, listing workflow, settlement orchestration, and D3X integration layer. Permanent engineering obligation for maintenance.

**Multi-vendor assembly risk:** Separating admission control, token management, and settlement from different vendors creates regulatory accountability fragmentation. BaFin expects a coherent, auditable operating model, not a collection of point solutions with unclear incident ownership.

### 2.2 Why DALP Changes Economics

| Capability | Without DALP | With DALP |
|---|---|---|
| MiFID II admission engine | Custom build, 18+ months | Included: OnchainID + 18 module types |
| Venue state controls | Custom build | Included: role-based control model |
| Listing workflow with disclosure | Custom build | Included: issuance factory + metadata |
| D3X settlement integration | Custom settlement adapter | Included: XvP addon + REST API |
| BaFin audit trail | Custom evidence pipeline | Included: on-chain IBFT 2.0 finality |

### 2.3 ROI

| Value Driver | Basis |
|---|---|
| Admission engine build avoided | EUR 4-8M |
| BaFin readiness from launch | Production-proven admission architecture |
| D3X integration reuse | Standard API contract; lower integration cost |
| Platform reuse for additional instruments | Same platform for equities, bonds, funds |

---

## 3. Licensing Model

### 3.1 Philosophy

Platform license model: no per-transaction fees. Every MiFID II compliance check, participant admission verification, and surveillance event generation is included. Deutsche Börse can scale trading volume without increasing licensing costs.

### 3.2 Tiers

| Capability | Foundation | Enterprise (Recommended) | Sovereign |
|---|---|---|---|
| Compliance modules | All 18 | All 18 | All 18 + custom |
| Environments | 1 | Multiple | Unlimited |
| D3X integration support | Standard | Enhanced | Dedicated |
| DORA documentation | Standard | Full | Full custom |
| Support | Standard | Enterprise | Enterprise |
| Annual license (indicative) | EUR [CLIENT-SPECIFIC: ~400K-600K] | EUR [CLIENT-SPECIFIC: ~700K-1.1M] | EUR [CLIENT-SPECIFIC: ~1.3M-2M] |

**Recommended: Enterprise.** Deutsche Börse's exchange group scale, DORA obligations, and multiple environment requirements (development, testing, production, DR) align with the Enterprise tier.

---

## 4. Deployment Options and Pricing

**Recommended: Private Cloud (Frankfurt, Germany)**

Deutsche Börse manages DALP on its cloud subscription within Germany (AWS eu-central-1 or Azure Germany West Central). Full German data residency. BaFin supervisory access via AUDITOR role.

**Infrastructure cost estimate (Deutsche Börse-borne):**

| Component | Monthly |
|---|---|
| Kubernetes (3-AZ Frankfurt) | EUR 4,000-8,000 |
| PostgreSQL HA | EUR 2,000-4,000 |
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
| Uptime SLA | 99.9% | 99.95% | 99.99% |
| DORA ICT classification | Standard | Enhanced | Full |
| BaFin notification support | Basic | Enhanced | Fully integrated |

### 5.2 Severity Levels

| Level | Definition | Response | Resolution |
|---|---|---|---|
| P1 | Platform down; venue halted unintentionally; admission engine unavailable | 15 min | 2 hours |
| P2 | Major function impaired | 1 hour | 4 hours |
| P3 | Non-critical | 4 hours | 2 business days |
| P4 | General | 1 business day | Next cycle |

---

## 6. Implementation Investment

| Phase | Duration | Investment |
|---|---|---|
| Discovery | 3 weeks | EUR [CLIENT-SPECIFIC: ~150K-250K] |
| Foundation | 4 weeks | EUR [CLIENT-SPECIFIC: ~200K-350K] |
| Configuration | 6 weeks | EUR [CLIENT-SPECIFIC: ~250K-400K] |
| Integration and Testing | 11 weeks | EUR [CLIENT-SPECIFIC: ~400K-600K] |
| Production and Parallel Run | 5 weeks | EUR [CLIENT-SPECIFIC: ~150K-250K] |
| Hypercare | 3 weeks | EUR [CLIENT-SPECIFIC: ~100K-200K] |
| **Total** | **32 weeks** | **EUR [CLIENT-SPECIFIC: ~1.25M-2.05M]** |

**Key accelerators:** D3X integration patterns; ERC-3643 admission modules; IBFT 2.0 deployment templates; BaFin notification framework.

---

## 7. Total Cost of Ownership

### 7.1 Three-Year TCO

| Year | License | Implementation | Support | Infrastructure | Total |
|---|---|---|---|---|---|
| Year 1 | EUR [CLIENT-SPECIFIC: ~900K] | EUR [CLIENT-SPECIFIC: ~1.65M] | EUR [CLIENT-SPECIFIC: ~400K] | EUR [CLIENT-SPECIFIC: ~200K] | EUR [CLIENT-SPECIFIC: ~3.15M] |
| Year 2 | EUR [CLIENT-SPECIFIC: ~900K] | 0 | EUR [CLIENT-SPECIFIC: ~400K] | EUR [CLIENT-SPECIFIC: ~240K] | EUR [CLIENT-SPECIFIC: ~1.54M] |
| Year 3 | EUR [CLIENT-SPECIFIC: ~900K] | 0 | EUR [CLIENT-SPECIFIC: ~400K] | EUR [CLIENT-SPECIFIC: ~240K] | EUR [CLIENT-SPECIFIC: ~1.54M] |
| **3-Year Total** | | | | | **EUR [CLIENT-SPECIFIC: ~6.2M]** |

### 7.2 Build vs. DALP

| Criterion | DALP | Build |
|---|---|---|
| 3-year cost | EUR ~6.2M | EUR 15-25M+ |
| Time to BaFin-ready venue | 32 weeks | 24-36 months |
| Admission engine production validation | 7+ years | None at launch |
| D3X settlement integration | Documented API | Custom |
| DORA ICT documentation | Pre-packaged | Custom |

---

## 8. Commercial Terms

### 8.1 Contract Structure

Platform License Agreement (Enterprise, 3-year initial term), Implementation Services Agreement (fixed-price by phase), Enterprise Support Agreement (co-terminus with license).

### 8.2 Payment Schedule

Implementation: 20% at signing, 15-20% per phase gate, 10% at go-live acceptance.
License and support: Annual in advance, first payment on activation.

### 8.3 IP and Data

DALP platform IP: SettleMint. Participant data and configurations: Deutsche Börse. D3X integration adapters: Deutsche Börse on delivery.

### 8.4 Exit

90-day transition assistance. Full data export. On-chain state on Deutsche Börse's Besu network remains accessible independently. MiFID II 5-year audit record preservation.

---

## 9. Reference Clients

| Client | Geography | Use Case | Relevance |
|---|---|---|---|
| Tadawul | Saudi Arabia | Digital securities listing and trading | Exchange group; listing workflow; participant admission |
| JSE | South Africa | Digital asset trading and settlement | Regulated exchange; market integrity; settlement |
| Deutsche Bank | Germany | Digital bonds | German regulatory context; BaFin |
| Euroclear | Belgium | Digital securities settlement | Post-trade settlement; CSDR/DORA |

---

## 10. Next Steps

| Step | Timing |
|---|---|
| Commercial Q&A | Within 2 weeks |
| D3X integration scoping workshop | Week 3-4 |
| BaFin notification strategy discussion | Week 4-5 |
| Technical due diligence | Week 4-6 |
| Firm commercial proposal | Week 5-7 |
| Contract negotiation | Week 8-12 |

---

*Document Classification: SettleMint Confidential*
*Version 1.0 Draft, March 2026*
