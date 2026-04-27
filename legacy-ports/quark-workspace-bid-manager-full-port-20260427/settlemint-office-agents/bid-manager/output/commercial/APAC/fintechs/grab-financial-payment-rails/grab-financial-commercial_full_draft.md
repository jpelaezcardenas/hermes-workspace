---
title: "Commercial Proposal: Tokenized Payment Rails Platform"
client: "Grab Financial"
reference: "GRAB-FINANCIAL-RFP-202603"
date: "March 2026"
version: "v1.0 DRAFT"
classification: "Confidential"
prepared_by: "SettleMint"
---

# Commercial Proposal: Tokenized Payment Rails Platform

**Prepared for:** Grab Financial Group
**Reference:** GRAB-FINANCIAL-RFP-202603
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

Grab Financial's tokenized payment rails programme is a unit economics and operational control programme. The commercial question is not whether to build tokenized payment infrastructure; it is whether to build it or buy it, and if buying, which platform provides the right combination of consumer payment performance, regulatory compliance, and multi-market scalability.

SettleMint recommends DALP under an Enterprise License with Managed SaaS on AWS Singapore.

**Commercial decision summary:**

| Factor | DALP | Build In-House | Payment Platform Vendor |
|--------|------|----------------|------------------------|
| Time to Singapore pilot | 6-7 months | 15-18 months | 8-10 months |
| Per-wallet, per-market compliance | Config only | Engineering per market | Depends on vendor |
| MAS PSA outsourcing documentation | Provided | N/A | Varies |
| High-frequency consumer payments | Native | Complex engineering | Depends |
| Multi-market SEA expansion | Config only | Engineering per market | Varies |

## 2. Investment Rationale

### 2.1 Current Payment Economics

Grab Financial's current cross-border treasury management requires pre-funded accounts across SEA markets. Settlement between markets relies on correspondent banking infrastructure with T+1 or T+2 cycles. Reconciliation between Grab's internal ledger, merchant settlement accounts, and driver earnings accounts requires dedicated operational resources. Manual AML review queues for threshold-triggered transactions create processing delays.

### 2.2 Why DALP Changes Economics

- **Treasury pre-funding reduction:** Faster cross-currency settlement allows treasury capital to cycle more efficiently. Conservative estimate: 15-20% reduction in aggregate pre-funding requirement.
- **Reconciliation automation:** DALP's Chain Indexer provides single-source-of-truth payment state, reducing reconciliation FTE by 40-60%.
- **AML processing efficiency:** Programmable AML rules reduce manual review queue volume by routing only genuine alerts to compliance officers.
- **Multi-market expansion:** New markets via configuration and governed approval. Eliminates per-market engineering cycles.

### 2.3 ROI Framework

| Driver | Conservative | Expected | Upside |
|--------|-------------|---------|--------|
| Treasury pre-funding reduction | 10% | 18% | 25% |
| Reconciliation FTE reduction | 35% | 50% | 65% |
| AML queue reduction | 20% | 40% | 55% |
| New market launch time | 2 months faster | 3.5 months faster | 5 months faster |

## 3. Licensing Model

### 3.1 Enterprise Tier

Platform-based pricing covering the full DALP capability set across all markets. No per-transaction fees. No per-market fees. Grab Financial's consumer payment volume growth and SEA market expansion do not trigger additional license costs within the agreed scope.

### 3.2 What's Included

Full DALP platform: programmable payment token management, per-market compliance module system, XvP treasury settlement, Key Guardian for custodial wallet management, OpenAPI 3.1, full observability stack, platform updates and security patches.

### 3.3 What Varies

| Dimension | Note |
|-----------|------|
| Deployment | Managed SaaS + regional extensions for data sovereignty |
| Markets | Configured per-market; no additional license per market |
| Support tier | Enterprise (24/7) |
| Implementation | 34-week programme |

## 4. Deployment Options and Pricing

### 4.1 Recommended: Managed SaaS (AWS Singapore) + Regional Extensions

Primary: Managed SaaS on AWS Singapore (SGD operations, treasury). Regional: per-market AWS region for data sovereignty (Indonesia: AWS Jakarta, Vietnam: AWS local when available). SettleMint manages Singapore primary; assists with regional configuration.

### 4.2 Cost Structure

| Category | Type | Notes |
|----------|------|-------|
| Enterprise platform license | Recurring annual | SGD [VARIABLE] |
| Managed SaaS (Singapore + regional) | Included in license / per-region pass-through | [VARIABLE] |
| Implementation services | One-time | SGD [VARIABLE] |
| Enterprise support | Recurring annual | SGD [VARIABLE] |

### 4.3 Cost Drivers

| Driver | Effect |
|--------|--------|
| Multi-market scope (5+ markets) | Extends configuration and integration phase |
| High-frequency performance requirements | Additional performance testing investment |
| Local data residency (Indonesia, Vietnam) | Regional infrastructure add-on |

## 5. Support and SLA Framework

| Dimension | Commitment |
|-----------|-----------|
| Coverage | 24/7 |
| P1 response | 15 minutes |
| P2 response | 30 minutes (Grab peak hours); 1 hour (other) |
| Monthly uptime | 99.95% |
| Maintenance | Weekend low-traffic windows |

## 6. Implementation Investment

### 6.1 Phase Summary

| Phase | Duration | Gate Criteria |
|-------|----------|--------------|
| 1. Discovery | 4 weeks | Market priority; MAS compliance mapping |
| 2. Configuration | 6 weeks | SGD payment rails demonstrable in SIT |
| 3. Integration | 8 weeks | Grab platform integration passing all tests including high-frequency |
| 4. Testing | 6 weeks | Peak volume validated; MAS compliance confirmed; UAT signed off |
| 5. Go-Live | 2 weeks | Singapore pilot with limited scope |
| 6. Hypercare | 8 weeks | Singapore stable; additional markets onboarded |

**Total: approximately 34 weeks**

### 6.2 Investment Summary

| Phase | Indicative (SGD) |
|-------|-----------------|
| Discovery | [VARIABLE] |
| Configuration | [VARIABLE] |
| Integration | [VARIABLE] |
| Testing | [VARIABLE] |
| Go-Live | [VARIABLE] |
| Hypercare | [VARIABLE] |
| **Total** | **[VARIABLE]** |

### 6.3 Accelerators and Risks

| Type | Item |
|------|------|
| Accelerator | Managed SaaS: no infrastructure provisioning time |
| Accelerator | Pre-built MAS PSA compliance templates |
| Accelerator | Consumer payment API templates from M-Pesa and OPay reference deployments |
| Risk | High-frequency performance requirements need careful sizing validation |
| Risk | Multi-market regulatory mapping may require local legal advice per market |
| Risk | Custodial wallet key management for large driver/merchant base |

### 6.4 Training

| Role | Duration |
|------|---------|
| Platform administrators | 2 days |
| Payment operations | 1 day |
| Compliance team | 1 day |
| Treasury team | 0.5 days |
| Integration developers | 1.5 days |

## 7. Commercial Terms

### 7.1 Contract Structure

MSA (with MAS outsourcing addendum), SoW, Support Agreement, DPA (PDPA Singapore + market-specific where required).

### 7.2 Payment Schedule

Implementation: milestone-based (20% contract execution; 20% Discovery; 25% Configuration and Integration; 25% Testing; 10% Go-Live). Annual license and support invoiced annually in advance.

### 7.3 Duration

Initial term: 3 years recommended. License activation from Singapore pilot go-live. Annual renewal thereafter.

### 7.4 IP

DALP platform: SettleMint. Grab Financial payment data, wallet configurations, and compliance rules: Grab Financial. Integration code: joint (negotiable).

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

Managed SaaS infrastructure included in license. Regional market infrastructure passed through at cost.

### 8.2 Comparative Analysis

| Dimension | DALP | Build In-House | Payment Platform Vendor |
|-----------|------|----------------|------------------------|
| Time to Singapore pilot | 6-7 months | 15-18 months | 8-10 months |
| Multi-market expansion | Config only | Engineering per market | Varies |
| Engineering burden | Minimal | Very high | Integration maintenance |
| Year 3 recurring cost | Moderate | Very high (SEA engineering) | Moderate |

## 9. Reference Clients

| Client | Use Case | Outcome |
|--------|----------|---------|
| DBS Bank (Singapore) | Tokenized payment infrastructure, MAS regulated | Production |
| M-Pesa Safaricom (Kenya) | Consumer mobile payment overlay, high volume | Production |
| OPay (Nigeria) | Tokenized wallet and merchant payment ecosystem | Production |
| Flutterwave (Pan-Africa) | Multi-corridor payment settlement | Production |
| Chipper Cash (Pan-Africa) | Consumer cross-border payments | Production |

## 10. Next Steps

| Step | Target |
|------|--------|
| Proposal review | Week 1 |
| Market prioritisation workshop | Week 2 |
| Technical integration review | Week 3 |
| Commercial validation | Week 4 |
| Contract drafting | Week 5 |
| Contract execution | Week 7 |
| Programme mobilisation | Week 8 |
