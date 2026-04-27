# Commercial Proposal: Tokenized Bond Issuance Platform

**Prepared for:** Commonwealth Bank of Australia
**Date:** 20 March 2026
**Version:** 1.0 Draft
**Classification:** SettleMint Confidential. Invited Bidders Only
**Reference:** COMMONWEALTH-BANK-RFP-202603

*All prices exclude applicable taxes and VAT, including Australian GST where applicable.*

---

## Table of Contents

1. Cover Page
2. Commercial Summary
3. Licensing Model
4. Implementation Services Pricing
5. Environment and Infrastructure Costs
6. Support and Maintenance Fees
7. Total Cost of Ownership Analysis
8. Payment Terms and Milestones
9. Commercial Assumptions Register
10. Exit and Transition Terms
11. Value Justification

---

## 1. Cover Page

**Document Title:** Commercial Proposal: Tokenized Bond Issuance Platform
**Client:** Commonwealth Bank of Australia
**Date:** 20 March 2026
**Version:** 1.0 Draft
**Prepared by:** SettleMint NV

---

## 2. Commercial Summary

Commonwealth Bank of Australia is one of Australia's systemically important financial institutions and a major issuer in the domestic and international bond markets. The commercial model reflects CBA's procurement requirements: transparent pricing, no transaction fees, and clear expansion economics as the programme grows beyond the initial senior unsecured bond scope.

**Year 1 Platform License:**

| Component | Annual Cost (EUR) |
|-----------|------------------|
| Production License | 300,000 |
| Development License | 120,000 |
| **Total** | **420,000** |

*All prices exclude applicable taxes and VAT including Australian GST. Annual, upfront.*

**Three-Year Summary:**

| Year | Total (EUR) |
|------|-------------|
| Year 1 | 420,000 |
| Year 2 | 420,000 |
| Year 3 | 420,000 |
| **3-Year Total** | **1,260,000** |

---

## 3. Licensing Model

### 3.1 Bond Programme-Appropriate Pricing

DALP's environment-based licensing means CBA pays for deployed environments, not for bonds issued. The platform license covers the full bond programme scope:

- Senior unsecured notes
- Covered bonds (added through compliance configuration, not new licensing)
- Sustainability-linked bonds (added through data feed and yield schedule configuration)
- Subordinated notes
- All future bond series

No additional license fees accrue as CBA adds bond series, increases issuance volumes, or expands investor distribution.

### 3.2 License Rates

| Environment | Annual Fee (EUR) |
|-------------|-----------------|
| Production | 300,000 |
| Development | 120,000 |
| Staging (optional) | 120,000 |

*All prices exclude applicable taxes and VAT. Annual, upfront payment.*

### 3.3 Expansion Licensing

| Expansion Scenario | Incremental Annual License |
|-------------------|--------------------------|
| Add staging environment | EUR 120,000 |
| Add second production environment (New Zealand or Hong Kong) | EUR 300,000 |
| Full trans-Tasman deployment (2 production + 2 development) | EUR 600,000 + EUR 240,000 = EUR 840,000 |

---

## 4. Implementation Services Pricing

### 4.1 Indicative Implementation Investment

Based on comparable Australian bank deployments and bond-focused implementations (Commerzbank, Mizuho, OCBC), the indicative investment for CBA's 19-week programme is:

| Scenario | Indicative Range (EUR) |
|----------|----------------------|
| Core: Senior bonds + ASIC compliance + CHESS + NPP + AUSTRAC | 380,000 - 560,000 |
| Full: Core + Covered bonds + SLB + Project Atom readiness | 560,000 - 800,000 |

*Phase 1 Discovery formalizes scope and fixes the implementation fee in a signed SOW.*

### 4.2 Phase Breakdown

| Phase | Duration | Model |
|-------|----------|-------|
| Phase 1: Discovery | 3 weeks | Fixed milestone |
| Phase 2: Configuration | 4 weeks | Fixed milestone |
| Phase 3: Integration | 4 weeks | T&M with ceiling |
| Phase 4: Testing | 3 weeks | Fixed milestone |
| Phase 5: Go-Live | 1 week | Fixed milestone |
| Phase 6: Hypercare | 4 weeks | Fixed milestone |

### 4.3 Optional Scope

| Package | Indicative Cost (EUR) |
|---------|----------------------|
| Covered Bond Compliance Package (APS 180 controls) | 60,000 - 100,000 |
| Sustainability-Linked Bond (SPT data feed + step mechanism) | 50,000 - 90,000 |
| Project Atom Readiness (wholesale CBDC interoperability testing) | 50,000 - 100,000 |
| International Distribution (USD/EUR denomination + SWIFT) | 40,000 - 80,000 |

---

## 5. Environment and Infrastructure Costs

### 5.1 AWS Sydney (ap-southeast-2): Pass-Through

| Component | Indicative Annual Cost (USD) |
|-----------|------------------------------|
| EKS cluster | 18,000 - 30,000 |
| Aurora PostgreSQL Multi-AZ | 10,000 - 18,000 |
| CloudHSM | 15,000 - 20,000 |
| S3, KMS, networking | 5,000 - 10,000 |
| **Total AWS (production)** | **48,000 - 78,000/year** |

*CBA's existing AWS agreements may reduce these costs significantly.*

### 5.2 Third-Party Pass-Through

| Service | Arrangement |
|---------|-------------|
| Fireblocks | CBA contracts directly; no SettleMint markup |
| AUD stablecoin reserve management | CBA's treasury function; outside SettleMint scope |
| CHESS API access | Through CBA's existing ASX depository participant membership |

---

## 6. Support and Maintenance Fees

### 6.1 Enterprise Support

| Metric | Enterprise Commitment |
|--------|----------------------|
| Coverage | 24/7/365 |
| Uptime | 99.99% monthly |
| P1 Response | 15 minutes |
| P1 Resolution | 2 hours |
| APRA incident notification | Included |

**Enterprise Support Fee:** [CLIENT-SPECIFIC, indicative range EUR 90,000-140,000/year based on programme scope and bond portfolio complexity]

---

## 7. Total Cost of Ownership Analysis

### 7.1 Three-Year TCO

| Category | Year 1 (EUR) | Year 2 (EUR) | Year 3 (EUR) | 3-Year (EUR) |
|----------|-------------|-------------|-------------|-------------|
| Platform License | 420,000 | 420,000 | 420,000 | 1,260,000 |
| Implementation | 380,000-560,000 | - |, | 380,000-560,000 |
| Enterprise Support | 90,000-140,000 | 90,000-140,000 | 90,000-140,000 | 270,000-420,000 |
| AWS Infrastructure | ~55,000 | ~60,000 | ~65,000 | ~180,000 |
| **Total Range** | | | | **2,090,000-2,420,000** |

### 7.2 Commerzbank Reference: EUR 7 Million Annual Savings

The Commerzbank deployment identified EUR 7 million in annual savings potential from: reduced counterparty risk, eliminated listing inefficiencies, and settlement under 10 seconds. Applied to CBA's AUD bond market at comparable scale, the operational savings potential is material.

For CBA's bond programme specifically:
- **Coupon distribution automation:** Eliminating manual coupon payment processing across all bond series
- **Primary allocation audit trail:** Eliminating post-allocation reconciliation between bookbuild records and CHESS registry
- **Counterparty risk reduction:** T+0 atomic DvP versus T+2 settlement exposure
- **Secondary market transparency:** Real-time beneficial ownership visibility for compliance reporting

### 7.3 Build vs. Buy

Custom development of a comparable bond tokenization platform:
- Smart contracts and ASIC compliance engine: EUR 400,000-800,000
- Bond lifecycle automation (coupon, maturity, SLB): EUR 300,000-600,000
- Integration (CHESS, NPP, SWIFT, AUSTRAC): EUR 250,000-500,000
- Security and operational tooling: EUR 150,000-300,000
- Ongoing maintenance (3 years): EUR 500,000-1,000,000
- **Total custom: EUR 1,600,000-3,200,000**

Custom development also carries: 18-24 month timeline (vs. 19 weeks); no pre-audited covered bond collateral ratio module; no APRA-validated deployment reference; no Project Atom-compatible settlement architecture.

---

## 8. Payment Terms and Milestones

### 8.1 Platform License

Annual, upfront. First payment: within 30 days of contract execution.

### 8.2 Implementation Milestones

| Milestone | Percentage |
|-----------|-----------|
| Contract execution | 20% |
| Phase 1 Complete | 15% |
| Phase 2 Complete | 15% |
| Phase 3 Complete | 20% |
| Phase 4 Complete | 20% |
| Phase 5+6 Complete | 10% |

### 8.3 Currency

EUR invoicing. AUD equivalent provided at contract execution rate for CBA budget planning.

---

## 9. Commercial Assumptions Register

| Assumption | Detail |
|-----------|--------|
| GST | Australian GST (10%) applied to services delivered in Australia |
| Price hold | 90 days from submission (until 19 June 2026) |
| Annual increase cap | Lower of 5% or EU HICP |
| Minimum term | 3 years |
| AUD stablecoin | Implementation assumes CBA issues its own AUD stablecoin; NPP-coordinated settlement available if stablecoin issuance is deferred |
| APRA model validation | CBA's APRA regulatory engagement for model validation is outside SettleMint's scope; SettleMint provides technical platform documentation |
| CHESS API | CBA provides CHESS API access through ASX depository participant membership |
| Project Atom | No hard dependency; AUD stablecoin interim model operational from go-live |
| Covered bond cover pool | APS 180 cover pool eligibility determination is CBA's responsibility; DALP enforces collateral ratios based on CBA-provided attestation |

---

## 10. Exit and Transition Terms

### 10.1 Data Portability

Full data portability:
- All bond event logs exportable via time-windowed API queries
- All ISIN-indexed transaction records exportable in standard JSON
- Bond token contracts remain on-chain, independent of SettleMint contract status
- CHESS coordination records maintained in both DALP event log and CHESS registry

### 10.2 Transition Assistance

90-day transition support with data export, configuration documentation, and knowledge transfer on contract termination.

### 10.3 APRA Exit Requirements

Transition plan consistent with APRA's outsourcing exit provisions: 12-month notice for material service changes; operational continuity provisions; documentation for APRA outsourcing review.

---

## 11. Value Justification

### 11.1 Commerzbank Benchmark Applied to Australia

Commerzbank's EUR 7 million annual savings from digital ETP issuance provides a conservative benchmark for CBA's bond programme. Australia's bond market is larger than Germany's ETP market in comparable terms. The savings mechanisms, reduced counterparty risk, eliminated listing inefficiencies, automated coupon distribution, scale with bond market volume.

For CBA's bond programme, which spans AUD billions in annual issuance across multiple bond types, the three-year cost of DALP (EUR 1.26 million in platform licenses plus implementation and support) is a small fraction of the potential savings from operational automation and settlement efficiency.

### 11.2 Project Atom Positioning: First-Mover Advantage

The RBA's Project Atom positions Australia as a leader in wholesale CBDC for tokenized asset settlement. CBA's tokenized bond programme, built on DALP's Project Atom-compatible architecture, positions CBA as the first major Australian bank with production-ready digital bond infrastructure when Project Atom transitions from pilot to production.

This first-mover advantage, being the infrastructure-ready institution when Project Atom production capability becomes available, is a strategic commercial value that does not appear in the cost model but is real.

### 11.3 No Transaction Fees as Volume Scales

CBA's bond issuance volumes will grow as the programme matures and additional bond types are added. With DALP's environment-based licensing, volume growth costs CBA nothing in additional platform fees. The commercial model is designed to scale with CBA's programme without creating a commercial incentive for SettleMint to limit programme growth.

---

*End of Commercial Proposal: Commonwealth Bank of Australia. Tokenized Bond Issuance Platform*
*Document version: 1.0 Draft | Prepared: 20 March 2026 | SettleMint Confidential*
*All prices exclude applicable taxes and VAT including Australian GST.*
