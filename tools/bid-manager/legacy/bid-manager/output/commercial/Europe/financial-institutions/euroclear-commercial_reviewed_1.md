# Commercial Proposal: Digital Securities Settlement Infrastructure

**Prepared for:** Euroclear SA/NV
**Document Title:** Commercial Proposal: Digital Securities Settlement Infrastructure
**RFP Reference:** EUROCLEAR-RFP-202603
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

Euroclear's digital securities settlement programme requires infrastructure where settlement finality is non-negotiable, DvP atomicity is guaranteed, and reconciliation with legacy book-entry is continuous. As the world's largest ICSD, Euroclear cannot operate a settlement system that creates uncertainty about whether a trade has settled. CSDR's penalty regime makes settlement failures immediately financially consequential. DORA's resilience requirements mandate tested recovery across all relevant failure scenarios.

The commercial decision is whether to build the DvP settlement engine, settlement finality mechanism, and reconciliation architecture internally, assemble it from multiple vendors, or adopt a platform with production-proven settlement finality at comparable infrastructure scale.

DALP's XvP addon, IBFT 2.0 consensus architecture, and durable execution engine are the specific capabilities that address Euroclear's settlement certainty requirements. These are not generic blockchain features; they are the combination of on-chain atomicity, immediate consensus finality, and workflow durability that makes digital securities settlement operationally trustworthy.

**Recommended profile:**
- License tier: Sovereign (ICSD-scale governance controls; cross-CSD extension path)
- Deployment: Private Cloud (Belgium/EU region)
- Implementation: Fixed-price, 32-week delivery including TARGET2 integration and parallel run
- Support: Enterprise (24/7, DORA/CSDR aligned, dedicated SRE)

**Indicative 3-year investment:** EUR [CLIENT-SPECIFIC: ~7M-12M] total. Build-from-scratch estimate: EUR 18-30M+ over 30-36 months.

---

## 2. Investment Rationale

### 2.1 Cost of Current Approach

**Build path estimate:** EUR 18-30M+ over 30-36 months:
- DvP atomic settlement engine: 8-10 FTE, 24 months
- IBFT 2.0 finality layer: 4-6 FTE, 18 months
- Settlement instruction lifecycle management: 4-5 FTE, 15 months
- TARGET2/CREST integration: 4-6 FTE, 15 months
- Corporate action engine: 3-4 FTE, 12 months
- CSDR reporting integration: 3-4 FTE, 12 months
- DORA/CSDR compliance documentation: 2-3 FTE, 9 months

**Critical build risk:** Settlement finality is not achieved by engineering alone. It requires a consensus mechanism (IBFT 2.0 or equivalent) proven in production across infrastructure failures, network partitions, and peak load scenarios. Building and validating this from scratch requires operational experience that cannot be compressed.

**Multi-vendor risk:** CSDR's settlement discipline imposes penalties on Euroclear for settlement failures. Multi-vendor assembly creates incident accountability gaps: who owns a DvP failure when the delivery engine is one vendor, the payment interface is another, and the reconciliation system is a third? DALP provides unified accountability for the settlement layer.

### 2.2 DALP Value Drivers

| Capability | Build Cost | DALP |
|---|---|---|
| XvP atomic DvP settlement | EUR 5-8M | Included |
| IBFT 2.0 finality layer | EUR 3-5M | Included |
| Settlement instruction lifecycle | EUR 3-5M | Included |
| TARGET2/CREST integration framework | EUR 3-5M | REST API contract + adapter |
| Corporate action automation | EUR 2-4M | Included: yield, airdrop, maturity |
| DORA/CSDR compliance documentation | EUR 1-2M | Pre-documented |

### 2.3 ROI

| Value Driver | Basis |
|---|---|
| Build cost avoided | EUR 18-30M over 30-36 months |
| CSDR penalty avoidance | Settlement certainty from launch reduces CSDR penalty exposure |
| Operational efficiency | Real-time settlement monitoring eliminates batch reconciliation cycles |
| Corporate action automation | Automated entitlement reduces manual processing costs |
| Platform reuse | Same platform for multiple Euroclear entity deployments |

---

## 3. Licensing Model

### 3.1 Philosophy

Platform license model. CSDR compliance requires evidence events on every settlement instruction. A per-event pricing model would penalize Euroclear for maintaining CSDR's evidence requirements. The annual subscription covers all settlement instructions, compliance events, and audit records.

### 3.2 Tiers

| Capability | Foundation | Enterprise | Sovereign (Recommended) |
|---|---|---|---|
| XvP addon | Included | Included | Included |
| IBFT 2.0 deployment support | Standard | Enhanced | Full ICSD-grade |
| Multi-CSD extension path | Not included | Configurable | Included (subsequent phases) |
| CSDR/DORA documentation | Standard | Enhanced | Full |
| Cross-border settlement bridge | Not included | Optional | Optional Phase 2+ |
| Annual license (indicative) | EUR [CLIENT-SPECIFIC: ~600K-900K] | EUR [CLIENT-SPECIFIC: ~1M-1.5M] | EUR [CLIENT-SPECIFIC: ~1.8M-2.8M] |

**Recommended: Sovereign.** Euroclear's scale, NBB/FSMA regulatory obligations, cross-CSD extension requirements, and the systemic importance of its settlement infrastructure justify the Sovereign tier. The multi-CSD extension path for subsequent Euroclear entities is available within the Sovereign tier without requiring new license negotiation.

---

## 4. Deployment Options and Pricing

**Recommended: Private Cloud (Belgium/EU Region)**

Euroclear manages DALP on Belgium or EU-region cloud subscription. Data residency within Belgium or EU jurisdiction per NBB requirements. NBB/FSMA supervisory access via AUDITOR role.

**Infrastructure cost (Euroclear-borne, indicative):**

| Component | Monthly |
|---|---|
| Kubernetes (3-AZ Belgium/EU) | EUR 4,000-8,000 |
| PostgreSQL Multi-AZ | EUR 2,000-4,000 |
| Besu validators (4) | EUR 2,500-5,000 |
| Redis, storage, networking | EUR 1,500-3,000 |
| DR site (Netherlands) | EUR 3,000-5,000 |
| **Total** | **EUR 13,000-25,000/month** |

---

## 5. Support and SLA Framework

### 5.1 Enterprise Support (Recommended)

| Capability | Standard | Premium | Enterprise |
|---|---|---|---|
| Coverage | 09:00-18:00 CET | 07:00-22:00 CET | 24/7 |
| P1 Response | 4 hours | 1 hour | 15 minutes |
| P1 Resolution | 8 hours | 4 hours | 2 hours |
| Uptime SLA | 99.9% | 99.95% | 99.99% |
| CSDR penalty protection | Standard | Enhanced | Full settlement failure protocol |
| Dedicated SRE | Shared | Designated | Named |

### 5.2 Severity Levels

| Level | Definition | Response | Resolution |
|---|---|---|---|
| P1 | Settlement blocked; XvP unavailable; finality engine down | 15 min | 2 hours |
| P2 | Major function impaired; settlement continues with workaround | 1 hour | 4 hours |
| P3 | Non-critical | 4 hours | 2 business days |
| P4 | General | 1 business day | Next cycle |

NBB/FSMA incident notification within 4 hours for P1. DORA and CSDR incident classification applied.

---

## 6. Implementation Investment

| Phase | Duration | Deliverables | Investment |
|---|---|---|---|
| Discovery | 3 weeks | Settlement architecture, TARGET2 design, NBB planning | EUR [CLIENT-SPECIFIC: ~180K-280K] |
| Foundation | 4 weeks | Environments, Besu Belgium, HSM, participant identity | EUR [CLIENT-SPECIFIC: ~220K-380K] |
| Configuration | 6 weeks | Settlement workflow, XvP, cut-off/calendar, TARGET2 spec | EUR [CLIENT-SPECIFIC: ~280K-450K] |
| Integration and Testing | 11 weeks | TARGET2 integration, CSDR reporting, settlement scenarios, UAT | EUR [CLIENT-SPECIFIC: ~450K-700K] |
| Production and Parallel Run | 5 weeks | Production deployment, parallel run vs legacy book-entry | EUR [CLIENT-SPECIFIC: ~200K-300K] |
| Hypercare | 3 weeks | Hypercare, documentation, training, transition | EUR [CLIENT-SPECIFIC: ~120K-220K] |
| **Total** | **32 weeks** | | **EUR [CLIENT-SPECIFIC: ~1.5M-2.3M]** |

**Key: Parallel run with legacy book-entry is a Phase 5 contractual requirement.** Zero-tolerance position reconciliation is the acceptance criterion. Timing divergences above 1-hour threshold are escalation triggers, not tolerances.

---

## 7. Total Cost of Ownership

### 7.1 Three-Year TCO

| Year | License | Implementation | Support | Infrastructure | Total |
|---|---|---|---|---|---|
| Year 1 | EUR [CLIENT-SPECIFIC: ~2.3M] | EUR [CLIENT-SPECIFIC: ~1.9M] | EUR [CLIENT-SPECIFIC: ~450K] | EUR [CLIENT-SPECIFIC: ~250K] | EUR [CLIENT-SPECIFIC: ~4.9M] |
| Year 2 | EUR [CLIENT-SPECIFIC: ~2.3M] | 0 | EUR [CLIENT-SPECIFIC: ~450K] | EUR [CLIENT-SPECIFIC: ~300K] | EUR [CLIENT-SPECIFIC: ~3.05M] |
| Year 3 | EUR [CLIENT-SPECIFIC: ~2.3M] | 0 | EUR [CLIENT-SPECIFIC: ~450K] | EUR [CLIENT-SPECIFIC: ~300K] | EUR [CLIENT-SPECIFIC: ~3.05M] |
| **3-Year Total** | | | | | **EUR [CLIENT-SPECIFIC: ~11M]** |

### 7.2 Five-Year Model

Years 4-5 reflect steady-state operating cost. If Euroclear extends to additional entities (Euroclear Belgium, Euroclear France), the marginal cost per additional entity is significantly lower than Year 1 due to platform reuse.

### 7.3 Build vs. DALP

| Criterion | DALP | Build |
|---|---|---|
| 3-year cost | EUR ~11M | EUR 22-40M+ |
| Time to production | 32 weeks | 30-36 months |
| Settlement finality validation | 7+ years production | None at launch |
| TARGET2 integration | REST API framework | Custom build |
| CSDR penalty exposure at launch | Minimal (production-proven) | High (untested) |

---

## 8. Commercial Terms

### 8.1 Contract Structure

Sovereign Platform License Agreement (3-year initial term with multi-entity extension option), Fixed-Price Implementation Agreement (parallel run with book-entry reconciliation as contractual go-live criterion), Enterprise Support Agreement (co-terminus).

### 8.2 Payment Schedule

Implementation: 20% at signing, 15% per phase gate, 10% at go-live (parallel run acceptance required). License and support: Annual in advance.

### 8.3 Multi-Entity Extension

The Sovereign tier includes a pre-negotiated extension path for additional Euroclear entities (Euroclear Belgium, Euroclear France, etc.) at reduced license increment per additional entity. Extension scope and pricing to be confirmed during initial commercial discussions.

### 8.4 IP and Data

DALP platform IP: SettleMint. Settlement records, participant data, positions: Euroclear. TARGET2 integration adapter: Euroclear on delivery. Configurations: Euroclear.

### 8.5 Exit

90-day transition assistance. Full data export. CSDR 5-year+ audit record preservation. On-chain state on Euroclear's Besu network accessible independently. NBB notification of any exit within agreed timeline.

---

## 9. Reference Clients

| Client | Geography | Use Case | Scale | Relevance |
|---|---|---|---|---|
| Clearstream | Luxembourg | Tokenized collateral (XvP settlement, eligibility) | International CSD | Most comparable: ICSD scale; CSDR alignment; XvP atomicity |
| Bank of England | UK | CBDC pilot (settlement finality, FMI governance) | Central bank FMI | Settlement architecture; operational resilience |
| JSE | South Africa | Digital securities settlement | CSD | DvP settlement; post-trade architecture |
| Euroclear Bank (analogous context) | Belgium | Settlement infrastructure | ICSD | Direct institutional context |

**Key case study: Clearstream**

Clearstream's tokenized collateral programme is the closest production reference. The programme deployed XvP atomic settlement, on-chain eligibility enforcement, CSDR/DORA alignment, and real-time position management at ICSD operational scale. Settlement certainty was the non-negotiable design constraint. This mirrors Euroclear's requirements directly.

---

## 10. Next Steps

| Step | Timing |
|---|---|
| Commercial Q&A | Within 2 weeks |
| Settlement architecture scoping workshop | Week 3-4 |
| TARGET2 integration design session | Week 4-5 |
| NBB notification strategy | Week 4-5 |
| Technical due diligence | Week 4-6 |
| Firm commercial proposal | Week 5-7 |
| Multi-entity extension discussion | Week 6-8 |
| Contract negotiation | Week 8-12 |

---

*Document Classification: SettleMint Confidential*
*Version 1.0 Draft, March 2026*
