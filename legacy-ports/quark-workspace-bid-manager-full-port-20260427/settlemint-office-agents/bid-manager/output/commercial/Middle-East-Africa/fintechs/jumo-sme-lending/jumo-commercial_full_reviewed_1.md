# Commercial Proposal: Tokenized SME Lending and Servicing Infrastructure

**Prepared for:** JUMO (South Africa / Pan-Africa)
**Prepared by:** SettleMint NV
**Date:** March 2026
**Version:** v1.0
**Reference:** JUMO-RFP-TOKENIZED-SME-LENDING-202603
**Classification:** SettleMint Confidential

---

## Table of Contents

- Executive Summary
- Investment Summary
- Licensing and Subscription Model
- Implementation Investment
- Support and Operational Costs
- Total Cost of Ownership Analysis
- Payment Terms and Commercial Structure
- Value Realisation and ROI Analysis
- Commercial Assumptions and Dependencies
- Contractual Framework Overview
- Appendix A: Detailed Pricing Schedule
- Appendix B: Implementation Milestone and Payment Schedule

---

## Executive Summary

### The Commercial Context

JUMO operates embedded finance and lending infrastructure across multiple African markets, working with bank and telecom partners to originate and service SME credit products. The company's institutional funding model, involving development finance institutions, impact funds, and banking partners, requires increasingly sophisticated governance around capital deployment, income distribution, and regulatory evidence. Manual off-chain processes for investor reporting, waterfall income calculation, and multi-jurisdiction compliance evidence are becoming structurally constrained as the portfolio scales.

The tokenized SME lending infrastructure programme addresses these constraints directly. By placing participation certificates and income distribution mechanics on-chain, JUMO can produce verifiable investor reports from a single on-chain source, automate waterfall calculations, and provide regulators with tamper-evident evidence of compliance with lending obligations across jurisdictions.

### Recommended Structure

| Component | Recommendation | Annual Cost |
|---|---|---|
| Platform license | Enterprise tier | $220,000/year |
| Additional environments (2) | UAT + DR | $50,000/year |
| Premium support | Lending platform requirement | $85,000/year |
| **Annual recurring** | | **$355,000/year** |
| Implementation | Full programme | $320,000 (one-time) |
| **Year 1 total** | | **$675,000** |
| **3-year TCO (base)** | | **$1,300,000** |

JUMO's programme has a focused initial scope (South Africa pools, expanding to Kenya and other markets in Phase 2). The Enterprise tier reflects the multi-jurisdiction deployment requirement and dedicated infrastructure for POPIA compliance.

### Commercial Logic

JUMO's primary commercial justification for DALP is operational efficiency and funder relationship improvement. Currently, investor reporting for institutional funders requires manual data aggregation from JUMO's loan management system, treasury records, and partner bank statements. This process is time-consuming and produces reports that funders cannot independently verify. DALP's on-chain records provide funders with verifiable position and income statements that do not depend on JUMO's manual reporting process.

For development finance institution funders specifically, this matters. DFIs have strict governance requirements around capital deployment transparency, impact measurement data lineage, and audit access to the systems that manage their capital. Tokenized participation records that are independently verifiable reduce the governance overhead DFIs impose on JUMO's operations.

The secondary commercial justification is multi-market regulatory cost reduction. POPIA compliance documentation, FSCA reporting, CBK evidence requests, and equivalent obligations in other markets currently require separate evidence assembly processes. On-chain records with configurable jurisdiction-specific compliance modules provide a single evidence source that satisfies multiple regulatory reporting requirements.

---

## Investment Summary

| Factor | Detail |
|---|---|
| Platform | DALP Enterprise Tier |
| Deployment | AWS af-south-1 (South Africa, POPIA) + Kenya region |
| Initial scope | South Africa pools (3-5 pool types at launch) |
| Phase 2 | Kenya, Ghana, Tanzania pools |
| Environments | Production + UAT + DR + Dev + Test (5 total) |
| Support | Premium (24/7/365) |
| Implementation | 35 weeks to first pool production |
| Year 1 total | $675,000 |
| 3-year TCO | ~$1,300,000 |

---

## Licensing and Subscription Model

### Philosophy

DALP's platform-based licensing means JUMO pays for platform access regardless of pool count, funder count, or distribution volume. As JUMO adds new lending pools, new jurisdictions, and new funders, the platform cost does not increase linearly with portfolio growth.

### What Is Included

| Capability | Included |
|---|---|
| All contract types (Bond, Deposit, and others) | Yes |
| Yield addon (income distribution) | Yes |
| XvP Settlement (atomic redemption) | Yes |
| All compliance modules | Yes |
| All token features including historical balances, yield, permit | Yes |
| Asset Console operations UI | Yes |
| REST API (OpenAPI 3.1) and TypeScript SDK | Yes |
| Webhooks and SSE event streams | Yes |
| Chain Indexer (investor reporting queries) | Yes |
| POPIA-aligned data residency configuration | Yes |
| Platform updates and security patches | Yes |
| One production environment | Yes |

### What Varies

| Variable | Selection | Cost |
|---|---|---|
| Additional environments (UAT + DR) | 2 additional | $25,000/year each |
| Multi-region deployment (SA + Kenya) | Included in Enterprise | - |
| Key management | Cloud KMS (AWS KMS) | Included in Enterprise |
| MPC custody for large pools | Optional (DFNS / Fireblocks) | Separate custody contract |
| Support | Premium | $85,000/year |

### Platform Tier Comparison

| Feature | Foundation | Enterprise | Sovereign |
|---|---|---|---|
| Multi-region deployment | No | Yes | Yes |
| Annual license | $180,000 | $220,000 | $280,000 |
| **Recommended for JUMO** | | **Yes** | |

JUMO's multi-jurisdiction requirement and POPIA-aligned infrastructure make the Enterprise tier appropriate. The license is set at $220,000 (within the $180,000-$280,000 range) reflecting JUMO's growth-stage profile compared to larger financial institutions.

---

## Implementation Investment

### Phase Summary

| Phase | Duration | Objective | Investment |
|---|---|---|---|
| Discovery and Requirements | 5 weeks | Pool architecture, POPIA mapping, funder onboarding design | $45,000 |
| Foundation | 4 weeks | AWS ZA region setup, base platform, KMS | $50,000 |
| Configuration | 5 weeks | SA pool tokens, compliance modules, yield addon | $60,000 |
| Integration | 6 weeks | LMS, investor relations, AML/KYC | $75,000 |
| Testing and UAT | 7 weeks | Full testing + POPIA privacy testing + UAT | $60,000 |
| Go-Live and Hypercare | 8 weeks | Pilot pool, full launch, hypercare | $30,000 |
| **Total** | **35 weeks** | | **$320,000** |

### Implementation Accelerators

- Pre-built POPIA-aligned compliance module templates for SA lending
- Reference pool token configuration for structured lending participation
- Yield addon template for monthly/quarterly distribution schedules
- TypeScript SDK enabling JUMO engineering team to build LMS integration in parallel

### Risk Factors

- Multi-jurisdiction regulatory interpretation (SA vs Kenya vs Ghana pool characterisation)
- POPIA data impact assessment completion may require legal input before production launch
- Funder KYC/onboarding data quality and readiness for all initial funders
- Kenya-region infrastructure provisioning timeline if additional AWS region is required

### Training

| Audience | Content | Duration |
|---|---|---|
| Platform administrators | System configuration, environment management | 2 days |
| Pool operations team | Pool management, servicing events, exception handling | 2 days |
| Investor relations | Chain Indexer queries, investor reporting generation | 1 day |
| Compliance team | Compliance module management, POPIA controls, audit export | 1 day |

---

## Support and Operational Costs

### Support Recommendation

Premium support (24/7) is recommended for a production lending infrastructure platform where yield distribution timing has direct implications for funder obligations.

| Feature | Standard | Premium |
|---|---|---|
| Annual cost | $45,000 | $85,000 |
| Coverage | Business hours | 24/7/365 |
| P1 response | 4 hours | 1 hour |
| P2 response | 8 hours | 4 hours |

### Severity Matrix

| Severity | Definition | Response | Resolution |
|---|---|---|---|
| P1 | Production outage, yield distribution failure | 1 hour | 4 hours |
| P2 | Pool operations blocked, significant degradation | 4 hours | 24 hours |
| P3 | Non-critical, workaround available | 8 hours | 72 hours |
| P4 | Enhancement, documentation | Next business day | Roadmap |

---

## Total Cost of Ownership Analysis

### 3-Year TCO: DALP

| Cost Category | Year 1 | Year 2 | Year 3 | Total |
|---|---|---|---|---|
| Platform license | $220,000 | $209,000 | $209,000 | $638,000 |
| Additional environments (2) | $50,000 | $50,000 | $50,000 | $150,000 |
| Premium support | $85,000 | $85,000 | $85,000 | $255,000 |
| Implementation (one-time) | $320,000 | - | - | $320,000 |
| Post-launch training/expansion | - | $20,000 | $20,000 | $40,000 |
| **Subtotal** | **$675,000** | **$364,000** | **$364,000** | **$1,403,000** |

*Year 2-3 license at 5% multi-year discount. Infrastructure (AWS, Kubernetes) is JUMO-borne, estimated $40,000-60,000/year.*

**3-year TCO including infrastructure: approximately $1,520,000-$1,580,000**

Note: Total base platform cost ($1,403,000) is slightly above the $1,400,000 ceiling in the commercial range. This reflects JUMO's multi-jurisdiction requirement. The adjusted figure with infrastructure is presented as the complete programme cost.

### Comparative Analysis

| Metric | DALP | Internal Build | Multi-Vendor |
|---|---|---|---|
| 3-year cost | ~$1.5M total | ~$2.8-3.5M | ~$2.2M |
| Time to first production pool | 35 weeks | 18-24 months | 12-18 months |
| POPIA compliance architecture | Pre-built | Must be designed | Shared responsibility |
| Funder verification | Immutable on-chain | Build quality dependent | Multi-system |

---

## Payment Terms and Commercial Structure

### Platform License

Annual, invoiced in advance. Year 2-3 at 5% discount with multi-year commitment.

### Implementation Payment Schedule

| Milestone | Payment | Amount | Target |
|---|---|---|---|
| Contract execution | 25% | $80,000 | Week 0 |
| Phase 2 gate (infrastructure ready) | 20% | $64,000 | Week 9 |
| Phase 4 gate (integrations complete) | 30% | $96,000 | Week 20 |
| Phase 6 gate (production go-live) | 25% | $80,000 | Week 35 |
| **Total** | **100%** | **$320,000** | |

### Terms

Net 30 days. USD denomination. Multi-year commitment discount applied at contract signature. 3-year initial term. 90-day renewal notice. Data Processing Agreement (DPA) covering POPIA obligations included as MSA schedule.

---

## Value Realisation and ROI Analysis

### Value Drivers

| Driver | Mechanism | Annual Benefit Estimate |
|---|---|---|
| Investor reporting automation | On-chain records replace manual data assembly | $60,000-$120,000 |
| Waterfall calculation automation | Smart contract distribution replaces manual calculation | $30,000-$80,000 |
| DFI governance overhead reduction | Verifiable records reduce DFI audit requests | $40,000-$100,000 |
| Multi-jurisdiction regulatory evidence | Single API replaces multiple evidence assembly | $30,000-$70,000 |
| New funder acquisition | Improved transparency attracts additional institutional capital | Revenue upside (not quantified) |

**Conservative annual benefit: $160,000-$370,000**

### Payback Analysis

| Scenario | Annual Benefit | 3-Year Net | Payback |
|---|---|---|---|
| Conservative | $160,000 | -$1,020,000 | Beyond programme |
| Expected | $280,000 | -$660,000 | 5+ years |
| Upside | $500,000 | -$180,000 | 3+ years |

The ROI case for JUMO is primarily strategic (improved institutional funder relationships and regulatory defensibility) rather than near-term operational cost recovery. A value workshop with JUMO's treasury and investor relations teams would refine the benefit estimates, particularly around DFI governance overhead and new capital attraction potential.

---

## Commercial Assumptions and Dependencies

- South Africa AWS af-south-1 deployment for POPIA compliance; JUMO provides cloud account or uses SettleMint-managed hosting
- JUMO provides dedicated integration engineers during Phases 3 and 4
- Initial funder KYC data is available and accurate for onboarding to identity registry
- Legal opinion on token characterisation in SA and Kenya is JUMO's responsibility
- Phase 2 (Kenya/Ghana/other markets) scope is a separate expansion change order after Phase 1 completion, estimated at $50,000-$80,000 additional implementation per market group

---

## Contractual Framework Overview

Two agreements: Master Subscription Agreement (platform license, IP, data handling including DPA for POPIA, confidentiality, liability) and Statement of Work (implementation scope, deliverables, milestones).

DALP IP: SettleMint's. All JUMO data, pool records, funder data, and on-chain token state: JUMO's. Data Processing Agreement: JUMO is data controller; SettleMint is data processor. POPIA compliance obligations are defined in the DPA schedule.

Liability cap: 12 months of preceding subscription fees. Mutual consequential damages exclusion.

Source code escrow: available upon request as MSA addendum.

---

## Appendix A: Detailed Pricing Schedule

### Annual Recurring

| Line Item | Unit | Qty | Unit Price | Annual Total |
|---|---|---|---|---|
| DALP Enterprise License | Platform/year | 1 | $220,000 | $220,000 |
| Additional Environment (UAT) | Env/year | 1 | $25,000 | $25,000 |
| Additional Environment (DR) | Env/year | 1 | $25,000 | $25,000 |
| Premium Support | Tier/year | 1 | $85,000 | $85,000 |
| **Total Annual Recurring** | | | | **$355,000** |

### Implementation

| Phase | Description | Price |
|---|---|---|
| Phase 1 | Discovery and Requirements | $45,000 |
| Phase 2 | Foundation and Setup | $50,000 |
| Phase 3 | Configuration | $60,000 |
| Phase 4 | Integration | $75,000 |
| Phase 5 | Testing and UAT | $60,000 |
| Phase 6 | Go-Live and Hypercare | $30,000 |
| **Total** | | **$320,000** |

---

## Appendix B: Implementation Milestone and Payment Schedule

| Milestone | Deliverable | Payment | Amount | Target |
|---|---|---|---|---|
| Contract execution | Signed MSA + SoW + DPA | 25% | $80,000 | Week 0 |
| Phase 2 gate | Infrastructure operational, POPIA architecture validated | 20% | $64,000 | Week 9 |
| Phase 4 gate | All integrations complete, POPIA testing passed | 30% | $96,000 | Week 20 |
| Phase 6 gate | First SA pool production-live | 25% | $80,000 | Week 35 |
| **Total** | | **100%** | **$320,000** | |

---

*This document is classified SettleMint Confidential. Distribution is restricted to authorised JUMO procurement personnel.*
