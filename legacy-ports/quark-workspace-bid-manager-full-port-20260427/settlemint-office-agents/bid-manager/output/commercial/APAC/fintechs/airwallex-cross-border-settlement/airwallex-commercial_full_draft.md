---
title: "Commercial Proposal: Cross-Border Tokenized Settlement Platform"
client: "Airwallex"
reference: "AIRWALLEX-RFP-202603"
date: "March 2026"
version: "v1.0 DRAFT"
classification: "Confidential"
prepared_by: "SettleMint"
---

# Commercial Proposal: Cross-Border Tokenized Settlement Platform

**Prepared for:** Airwallex
**Reference:** AIRWALLEX-RFP-202603
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

Airwallex's cross-border tokenized settlement programme is primarily a unit economics improvement: reduce the cost and capital burden of moving value across borders while maintaining the speed and reliability that Airwallex's customers expect. The commercial case for DALP is direct: faster settlement finality reduces pre-funding requirements, atomic settlement eliminates credit exposure, and automated reconciliation reduces operational overhead.

SettleMint recommends DALP under an Enterprise License with Managed SaaS deployment on AWS Singapore.

**Commercial decision summary:**

| Factor | DALP | Build In-House | Treasury Tech Vendor |
|--------|------|----------------|---------------------|
| Time to first corridors | 6 months | 12-18 months | 8-12 months |
| Atomic multi-currency settlement | Native | Complex engineering | Varies |
| MAS outsourcing documentation | Provided | N/A | Varies |
| Per-corridor scaling | Config only | Engineering cycles | Depends on vendor |
| Managed SaaS option | Yes | N/A | Rarely |

## 2. Investment Rationale

### 2.1 Current Settlement Economics

Airwallex's correspondent banking infrastructure requires pre-funded nostro accounts across multiple currency corridors. The opportunity cost of this pre-funded capital is material. Faster settlement reduces the pre-funding requirement because the same capital can cycle more frequently. Atomic settlement also eliminates the intraday credit exposure that correspondent banking creates: if Airwallex has sent USD but not yet received SGD, that exposure window carries risk and consumes credit lines.

Additionally, reconciliation between Airwallex's internal ledger, correspondent bank statements, and customer-facing balances requires operational resources. Automated settlement confirmation reduces this burden.

### 2.2 Why DALP Changes Economics

- **Pre-funding reduction:** Faster settlement allows capital to cycle more efficiently. Conservative estimate: 15-25% reduction in aggregate nostro pre-funding requirement.
- **Exposure elimination:** Atomic settlement eliminates correspondent banking credit exposure within settled corridors.
- **Reconciliation automation:** Chain Indexer provides single-source-of-truth settlement state; reconciliation against internal ledger is automated.
- **Corridor expansion:** New corridors via configuration, not engineering. Reduces corridor expansion cost from engineering cycles to weeks.

### 2.3 ROI Framework

| Driver | Conservative | Expected | Upside |
|--------|-------------|---------|--------|
| Pre-funding capital reduction | 10% | 20% | 30% |
| Reconciliation FTE reduction | 30% | 50% | 65% |
| Settlement failure cost reduction | 40% | 60% | 75% |
| New corridor time-to-market | 2 months faster | 3 months faster | 4 months faster |

## 3. Licensing Model

### 3.1 Enterprise Tier for Airwallex

Enterprise Tier provides the multi-corridor, multi-currency scope required for Airwallex's global payments operations. Platform-based pricing: no per-settlement fees, no per-corridor fees. Airwallex's settlement volume growth does not trigger additional license costs.

### 3.2 What's Included

Full DALP capability set including XvP settlement extension, compliance module system (per corridor), Key Guardian, OpenAPI 3.1 interface, TypeScript SDK, full observability stack, and platform updates.

### 3.3 What Varies

| Dimension | Note |
|-----------|------|
| Deployment | Managed SaaS (recommended) or private cloud |
| Environment count | Production, DR, UAT, SIT |
| Support tier | Enterprise (24/7) recommended |
| Implementation | 30-week programme |
| Corridor count | Unlimited within platform scope |

## 4. Deployment Options and Pricing

### 4.1 Recommended: Managed SaaS (AWS Singapore)

Fastest deployment, lowest operational overhead, auto-scaling for Airwallex's volume variability, MAS data residency compliance.

### 4.2 Cost Structure

| Category | Type | Notes |
|----------|------|-------|
| Enterprise platform license | Recurring annual | USD [VARIABLE] |
| Managed SaaS infrastructure | Included in license | SettleMint-managed |
| Implementation services | One-time | USD [VARIABLE] |
| Enterprise support | Recurring annual | USD [VARIABLE] |

### 4.3 Cost Drivers

| Driver | Effect |
|--------|--------|
| Number of initial corridors | More corridors = longer configuration phase |
| Counterparty network setup | Each counterparty requires identity onboarding |
| Custom reporting formats | Airwallex's reporting requirements may require custom configuration |

## 5. Support and SLA Framework

| Dimension | Commitment |
|-----------|-----------|
| Coverage | 24/7 |
| P1 response | 15 minutes |
| P2 response | 1 hour |
| Monthly uptime | 99.9% |
| Maintenance | Off-peak APAC hours; 5 business days notice |

## 6. Implementation Investment

### 6.1 Phase Summary

| Phase | Duration | Gate Criteria |
|-------|----------|--------------|
| 1. Discovery | 4 weeks | Corridor priority; compliance requirements mapped |
| 2. Configuration | 6 weeks | First corridors demonstrable in SIT |
| 3. Integration | 6 weeks | Airwallex API integration passing tests |
| 4. Testing | 6 weeks | SIT, UAT, performance signed off |
| 5. Go-Live | 2 weeks | First corridors live |
| 6. Hypercare | 6 weeks | Additional corridors; KPI targets met |

**Total: approximately 30 weeks**

### 6.2 Investment Summary

| Phase | Indicative (USD) |
|-------|-----------------|
| Discovery | [VARIABLE] |
| Configuration | [VARIABLE] |
| Integration | [VARIABLE] |
| Testing | [VARIABLE] |
| Go-Live | [VARIABLE] |
| Hypercare | [VARIABLE] |
| **Total** | **[VARIABLE]** |

### 6.3 Accelerators

| Accelerator | Effect |
|-------------|--------|
| Managed SaaS: no infrastructure provisioning | Saves 4-6 weeks vs. private cloud |
| Pre-built MAS PSA compliance templates | Reduces compliance configuration by 30% |
| OpenAPI SDK for Airwallex integration | Reduces integration development by 25% |

### 6.4 Training

| Role | Duration |
|------|---------|
| Platform administrators | 2 days |
| Settlement operations | 1 day |
| Compliance team | 1 day |
| Integration developers | 1 day |

## 7. Commercial Terms

### 7.1 Contract Structure

MSA, SoW, Support Agreement, DPA (PDPA Singapore, GDPR where applicable), MAS Outsourcing addendum.

### 7.2 Payment Schedule

Implementation milestone-based: 20% at contract execution; 20% Discovery; 25% Configuration and Integration; 25% Testing; 10% Go-Live and Hypercare. Annual license and support invoiced annually in advance.

### 7.3 Duration

Initial term: 2 or 3 years (3-year provides best commercial terms). License activation from production go-live. Auto-renew with 90-day notice to cancel.

### 7.4 IP

DALP platform: SettleMint. Airwallex settlement data and configuration: Airwallex. Integration code: joint ownership (negotiable).

### 7.5 Exit

90-day notice. Complete data export. 60-day transition support at agreed rates.

## 8. Total Cost of Ownership

### 8.1 3-Year DALP TCO

| Category | Year 1 | Year 2 | Year 3 | Total |
|----------|--------|--------|--------|-------|
| Platform license | [VAR] | [VAR] | [VAR] | [VAR] |
| Implementation | [VAR] | 0 | 0 | [VAR] |
| Support | [VAR] | [VAR] | [VAR] | [VAR] |
| **Total** | [VAR] | [VAR] | [VAR] | [VAR] |

Infrastructure costs are included in the Managed SaaS license for Airwallex's deployment model.

### 8.2 Comparative Analysis

| Dimension | DALP | Build In-House | Treasury Tech Vendor |
|-----------|------|----------------|---------------------|
| Time to corridors | 6 months | 12-18 months | 8-12 months |
| Engineering burden | Minimal | High ongoing | Integration maintenance |
| Corridor expansion cost | Config only | Engineering | Depends |
| Year 3 recurring cost | Moderate | High | Moderate-high |

## 9. Reference Clients

| Client | Use Case | Outcome |
|--------|----------|---------|
| DBS Bank (Singapore) | Cross-border settlement, MAS regulated | T+0 settlement; production |
| Flutterwave (Pan-Africa) | Cross-border payments orchestration | Multi-corridor production |
| Interswitch (Nigeria) | Payment settlement and reconciliation | Production |
| M-Pesa Safaricom (Kenya) | Digital asset payment settlement | Production |

## 10. Next Steps

| Step | Target |
|------|--------|
| Proposal review meeting | Week 1 |
| Corridor prioritisation workshop | Week 2 |
| Commercial validation | Week 3 |
| Contract drafting | Week 4 |
| Contract execution | Week 6 |
| Programme mobilisation | Week 7 |
