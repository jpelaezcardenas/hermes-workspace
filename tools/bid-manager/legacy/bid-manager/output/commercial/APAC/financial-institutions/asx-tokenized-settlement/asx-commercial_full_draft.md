---
title: "Commercial Proposal: Tokenized Settlement Platform"
client: "ASX"
reference: "ASX-RFP-202603"
date: "March 2026"
version: "v1.0 DRAFT"
classification: "Confidential"
prepared_by: "SettleMint"
---

# Commercial Proposal: Tokenized Settlement Platform

**Prepared for:** ASX (Australian Securities Exchange)
**Reference:** ASX-RFP-202603
**Date:** March 2026
**Version:** v1.0
**Classification:** Strictly Confidential. Invited Bidders Only
**Prepared by:** SettleMint NV

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

ASX's tokenized settlement programme has a commercial dimension that goes beyond software licensing. It requires a technology partner that understands the regulatory, operational, and reputational stakes of market infrastructure deployment in Australia, and that can structure a commercial relationship appropriate to those stakes.

SettleMint recommends DALP under a Sovereign-grade License structured for market infrastructure requirements, with Australian private cloud deployment and Enterprise Support with market-hours operational commitments.

**Commercial decision summary:**

| Factor | DALP | Build In-House | Point Solution Assembly |
|--------|------|----------------|------------------------|
| Time to controlled pilot | 12 months | 30+ months | 18-24 months |
| Atomic DvP settlement | Native | Custom engineering | Requires multiple components |
| APRA CPS 230/234 compliance documentation | Provided | ASX's burden | Fragmented |
| Participant onboarding scalability | Platform configuration | Engineering per participant type | Integration per participant type |
| Total 3-year cost | Medium-high | Very high | High |

The scale and significance of ASX's programme warrants investment in the right platform. The cost of a second failed post-trade modernisation attempt would be measured not just in project costs but in regulatory credibility and market confidence.

## 2. Investment Rationale

### 2.1 Cost of Existing Settlement Infrastructure

CHESS and its successor infrastructure carry hidden costs that extend beyond their annual operating budgets. Batch settlement cycles create intraday credit exposure. Manual exception handling for settlement failures requires dedicated operations teams. Reconciliation between CHESS positions, broker-dealer records, and custodian records generates FTE costs and introduces data quality risk. Participant communication about settlement failures is manual and slow.

The opportunity cost of delay is also real. Every year that Australian securities settlement operates on batch rather than atomic settlement is a year that Australia's capital markets lag markets that have already moved to real-time settlement finality.

### 2.2 Why DALP Changes the Economics

DALP's atomic DvP model eliminates intraday credit exposure between sellers and buyers. Settlement finality occurs at transaction execution rather than at end-of-day batch. Reconciliation between internal systems is automated through the Chain Indexer's continuous position tracking. Exception handling for settlement failures is structured through the platform's exception queue, reducing manual investigation time.

For ASX's participant community, the economic benefit is a reduction in the collateral they must hold against intraday settlement exposure. For ASX, the economic benefit is reduced operational cost for exception management and a modernised infrastructure that can support new asset classes and market structures.

### 2.3 ROI Framework

| Value Driver | Conservative | Expected | Upside |
|-------------|-------------|---------|--------|
| Exception handling cost reduction | 30% | 50% | 65% |
| Collateral requirement reduction (participant) | 10% | 20% | 30% |
| New asset class time-to-market | 6 months faster | 9 months faster | 12 months faster |
| Settlement failure rate reduction | 40% | 60% | 80% |
| Regulatory evidence cost | 35% reduction | 55% reduction | 70% reduction |

All estimates require validation against ASX's actual operational data during discovery.

## 3. Licensing Model

### 3.1 Sovereign Tier for Market Infrastructure

ASX is market infrastructure for the Australian economy. The Sovereign License Tier is designed for entities of this nature: unlimited environments, dedicated account management, priority engineering access, and commercial terms that reflect the long-term nature of the relationship. The Sovereign Tier is not simply a larger version of the Enterprise Tier; it includes structural commitments about SettleMint's support for ASX's regulatory obligations, including CPS 230 material service provider compliance documentation and ASIC inspection access facilitation.

### 3.2 What's Included

All DALP platform capabilities plus: dedicated customer success engineering, annual security review with SettleMint's security team, CPS 230 service provider documentation package, ASIC inspection facilitation support, and priority access to the DALP product roadmap for market infrastructure requirements.

### 3.3 What Varies

| Dimension | ASX Configuration |
|-----------|------------------|
| Deployment model | Australian private cloud |
| HSM | AWS CloudHSM or physical FIPS HSM at colocation |
| Support tier | Enterprise (24/7) with market-hours SLAs |
| Implementation | 48-week programme |
| Participant capacity | Scalable; no participant count limit |

## 4. Deployment Options and Pricing

### 4.1 Recommended: Australian Private Cloud

AWS Sydney or Azure Australia East. Full APRA data sovereignty compliance. CPS 234 information security capability through AWS/Azure security certifications plus DALP's application-layer controls.

### 4.2 Cost Structure

| Category | Type | Notes |
|----------|------|-------|
| Sovereign platform license | Recurring annual | AUD [VARIABLE] |
| Cloud infrastructure (AWS/Azure) | Recurring | AUD [VARIABLE] estimated; pass-through |
| Cloud HSM (CloudHSM or equivalent) | Recurring | AUD [VARIABLE] |
| Implementation services | One-time | AUD [VARIABLE: scoped at discovery] |
| Sovereign support | Recurring annual | AUD [VARIABLE] |

### 4.3 Cost Drivers

| Driver | Effect |
|--------|--------|
| Pilot phase before full production | Adds 4-week pilot phase to programme |
| Broad participant onboarding scope | Integration with participant management adds complexity |
| Legal finality analysis | External legal advice on settlement finality; client-borne cost |
| Peak volume performance testing | Infrastructure sizing for 5x normal volume |

## 5. Support and SLA Framework

### 5.1 Market Infrastructure Support Tier

| Dimension | Commitment |
|-----------|-----------|
| Coverage | 24/7 with market-hours priority |
| P1 response | 15 minutes |
| P2 response | 30 minutes (market hours); 1 hour (off hours) |
| Monthly uptime | 99.95% |
| Planned maintenance | Market holiday windows only; 10 business days notice |
| Annual security review | Included |
| ASIC inspection support | Included |

## 6. Implementation Investment

### 6.1 Phase Summary

| Phase | Duration | Gate Criteria |
|-------|----------|--------------|
| 1. Discovery | 8 weeks | Legal finality analysis; architecture approval including ASIC team |
| 2. Configuration | 8 weeks | Settlement demonstrable in SIT with test participants |
| 3. Integration | 10 weeks | RBA and ASIC reporting integration validated |
| 4. Testing | 10 weeks | Peak volume performance; CPS 234 security review; UAT signed off |
| 5. Pilot Launch | 4 weeks | Controlled pilot; monitoring intensive; GO/NO-GO for scale |
| 6. Production Scale | 8 weeks | Phased participant onboarding; KPI targets met 20 days |

### 6.2 Investment Summary

| Phase | Indicative Investment (AUD) |
|-------|----------------------------|
| Discovery | [VARIABLE] |
| Configuration | [VARIABLE] |
| Integration | [VARIABLE] |
| Testing | [VARIABLE] |
| Pilot Launch | [VARIABLE] |
| Production Scale | [VARIABLE] |
| **Total** | **[VARIABLE]** |

### 6.3 Accelerators and Risks

| Type | Item |
|------|------|
| Accelerator | Pre-built market infrastructure compliance templates (Clearstream, Deutsche Boerse reference architecture) |
| Accelerator | Automated participant onboarding API templates |
| Risk | Legal settlement finality analysis delay |
| Risk | CHESS-era record migration complexity |
| Risk | Peak volume infrastructure sizing uncertainty |
| Risk | Regulatory approval process timing for pilot launch |

### 6.4 Training

| Role | Duration | Notes |
|------|---------|-------|
| Platform administrators | 3 days | On-site at ASX |
| Settlement operations team | 2 days | Role-based; settlement-specific scenarios |
| Compliance team | 1 day | Compliance module management and exception handling |
| Participant support team | 1 day | Participant onboarding and troubleshooting |
| Internal audit | 0.5 days | Audit trail navigation and evidence export |

## 7. Commercial Terms

### 7.1 CPS 230 Material Service Provider Compliance

As a material technology service provider to ASX, SettleMint will provide:

- Annual assurance report (SOC 2 Type II) for inclusion in ASX's APRA reporting
- Contractual commitments on service continuity, notification, and transition support consistent with CPS 230 requirements
- Audit rights for ASX's internal audit function and APRA-delegated inspectors
- Sub-contractor transparency report covering all material fourth-party dependencies

### 7.2 Contract Structure

MSA with CPS 230 addendum, SoW (implementation), Support Agreement with market-hours SLA, DPA (Australian Privacy Act), CPS 230 Service Provider Agreement.

### 7.3 Payment Schedule

Implementation: milestone-based (20% at execution; 15% Discovery; 20% Configuration; 20% Integration; 15% Testing; 10% Production Scale completion). Annual license and support invoiced annually in advance.

### 7.4 Duration

3-year initial term recommended. License activation from controlled pilot go-live date. Review mechanism at 18 months to adjust scope if programme scale changes materially.

### 7.5 Exit Provisions

90-day notice for termination after initial term. Complete data export. 6-month transition support available at agreed rates. Source code escrow available for additional security assurance.

## 8. Total Cost of Ownership

### 8.1 TCO Framework

For ASX, the relevant comparison is between DALP, in-house build, and the market infrastructure-specific alternative of procuring from legacy financial market infrastructure technology vendors (e.g., SIX Finma, Broadridge, DTCC technology). The comparison must account for the full cost of integration, governance, evidence generation, and regulatory compliance documentation across all options.

### 8.2 3-Year TCO Model (DALP)

| Category | Year 1 | Year 2 | Year 3 | Total |
|----------|--------|--------|--------|-------|
| Platform license (Sovereign) | [VAR] | [VAR] | [VAR] | [VAR] |
| Implementation | [VAR] | 0 | 0 | [VAR] |
| Support (Sovereign) | [VAR] | [VAR] | [VAR] | [VAR] |
| Cloud infrastructure | [VAR] | [VAR] | [VAR] | [VAR] |
| Cloud HSM | [VAR] | [VAR] | [VAR] | [VAR] |
| **Total** | [VAR] | [VAR] | [VAR] | [VAR] |

### 8.3 Comparative Analysis

| Dimension | DALP | In-House Build | Legacy Vendor |
|-----------|------|----------------|---------------|
| Time to pilot | 12 months | 30+ months | 18-24 months |
| Atomic DvP settlement | Native | Custom | Depends on vendor |
| CPS 230 documentation | Included | ASX must produce | Varies |
| Expansion to new asset classes | Config only | Engineering | New procurement |
| Vendor dependency risk | Medium | None (but high engineering risk) | High |
| Year 3 recurring cost | Medium | High (maintenance burden) | Medium-high |

The build-in-house option carries the highest risk given CHESS precedent. Legacy vendor options may offer comparable settlement capability but typically lack the compliance module configurability and observability quality that APRA/ASIC requirements demand.

## 9. Reference Clients

| Client | Region | Use Case | Outcome |
|--------|--------|----------|---------|
| Clearstream | Germany | Tokenized collateral settlement | BaFin compliant; production operations |
| Deutsche Boerse | Germany | Regulated digital asset trading and settlement | MiFID II compliant |
| Euroclear | Belgium | Digital securities settlement infrastructure | ECB-adjacent; production |
| Eurex | Germany | Tokenized derivatives clearing | EMIR compliant |
| Bank of England | UK | Wholesale CBDC settlement pilot | Central bank production |

## 10. Next Steps

| Step | Owner | Target |
|------|-------|--------|
| Proposal review | ASX + SettleMint | Week 1 post-submission |
| CPS 230 service provider assessment briefing | ASX risk + SettleMint | Week 2 |
| Technical architecture and legal finality workshop | Joint teams | Week 3 |
| Commercial validation | ASX procurement + SettleMint | Week 4 |
| CPS 230 agreement draft | Legal teams | Week 5 |
| Best-and-final commercial submission | SettleMint | Week 6 |
| Contract execution | Both parties | Week 8 |
| Programme mobilisation | Joint team | Week 9 |
