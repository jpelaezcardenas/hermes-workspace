---
document-title: "Commercial Proposal. Cross-Border Tokenized Payments"
client: "Bank of China"
date: "March 2026"
version: "1.0"
classification: "SettleMint Confidential"
rfp-reference: "BANK-OF-CHINA-RFP-202603"
---

# Commercial Proposal: Cross-Border Tokenized Payments

**Prepared for:** Bank of China
**Date:** March 2026
**Version:** 1.0
**Classification:** SettleMint Confidential. Invited Bidders Only
**Reference:** BANK-OF-CHINA-RFP-202603

*All prices are stated in EUR. CNY/EUR exchange rate treatment is addressed in Section 12. All prices exclude applicable taxes. GST/VAT treatment is addressed in Section 12.*

---

## Table of Contents

1. Cover Page
2. Commercial Summary
3. Licensing Model and Principles
4. Implementation Services Pricing
5. Environment and Infrastructure Costs
6. Support and Maintenance Fees
7. Total Cost of Ownership Analysis
8. Build vs. Buy Analysis
9. ROI Analysis and Payback Period
10. Scenario Pricing
11. Payment Terms and Milestones
12. Commercial Assumptions Register
13. Commercial Risk Register
14. Exit and Transition Terms
15. Value Justification

---

## 1. Cover Page

**Document Title:** Commercial Proposal. Cross-Border Tokenized Payments
**Client:** Bank of China
**Date:** March 2026
**Version:** 1.0
**Prepared by:** SettleMint NV
**Classification:** SettleMint Confidential

*This document contains proprietary and confidential pricing information belonging to SettleMint NV. Distribution is restricted to Bank of China's evaluation committee.*

---

## 2. Commercial Summary

**Year 1 Cost Estimate (EUR):**

| Component | Cost (EUR) |
|---|---|
| Production License (Enterprise Tier) | 360,000 |
| Development and SIT License | 120,000 |
| Implementation Services (22-week programme) | 380,000 to 520,000 |
| Premium Support | 72,000 to 108,000 |
| Infrastructure (Private cloud non-prod; on-premises prod excluded) | 45,000 to 80,000 |
| **Estimated Year 1 Total** | **977,000 to 1,188,000** |

**Commercial Headline:** DALP's 5-year total cost of approximately EUR 3.2 to 4.0 million represents an estimated 12 to 20% of the cost of building equivalent capability from scratch (estimated CNY 180 to 300 million for a bespoke cross-border tokenized payment platform at Bank of China's scale). The 22-week deployment timeline against 24 to 36 months for a custom build captures 2 to 2.5 years of operational benefit earlier and eliminates the technology risk of bespoke development in a rapidly evolving regulatory environment.

---

## 3. Licensing Model and Principles

### 3.1 Platform Licensing Philosophy

DALP is licensed as a platform, not billed per transaction, per payment instruction, per counterparty, or per token operation. This model is fundamental to how Bank of China should evaluate the commercial relationship:

**No per-payment fees.** Bank of China processes thousands of cross-border payments per day. A per-transaction pricing model would make cost proportional to payment volume, creating a perverse incentive to minimize platform usage or to resist scaling the programme. DALP's flat-rate annual license means payment volume growth has zero marginal licensing cost.

**No per-counterparty fees.** Expanding from 10 to 100 to 1,000 registered payment counterparties does not change the license cost. Bank of China can grow the network without commercial friction.

**No per-currency-corridor fees.** Adding a new currency corridor (e.g., CNY/USD, CNY/EUR, CNY/HKD) requires configuration effort, not a license extension. All corridors operate under the same platform license.

**Predictable annual subscription.** Year 1 includes implementation services (one-off) plus annual recurring license and support. Years 2 onwards are annual recurring costs only, providing budget predictability.

### 3.2 License Tiers

DALP is structured across three tiers. Bank of China's cross-border payment programme is recommended for the Enterprise Tier:

| Tier | Annual License | Description |
|---|---|---|
| Foundation | EUR 220,000 | Single production environment, single network, standard support |
| Enterprise (Recommended) | EUR 360,000 | Multiple environments, multi-network support, multi-corridor, Premium support |
| Sovereign / Strategic | EUR 550,000+ | Unlimited environments, dedicated SRE, custom SLA, strategic advisory |

**Enterprise Tier includes:**
- Production environment (on-premises) + up to 3 non-production environments (private cloud)
- All seven DALP asset classes plus Configurable Token (all currency corridors covered)
- All 18 compliance module types (no per-module fees)
- Full API surface: REST v2, GraphQL, webhooks, CLI, SDK
- Observability stack (VictoriaMetrics, Loki, Tempo, Grafana, Alertmanager)
- All platform updates, security patches, and new capabilities during license term
- Premium Support package (24/7 P1, business hours P2/P3, named engineer)

### 3.3 License Fee Schedule

| Year | Production License | Development License | Total Annual License |
|---|---|---|---|
| Year 1 | EUR 360,000 | EUR 120,000 | EUR 480,000 |
| Year 2 | EUR 360,000 | EUR 120,000 | EUR 480,000 |
| Year 3 | EUR 360,000 | EUR 120,000 | EUR 480,000 |
| Year 4 | EUR 360,000 | EUR 120,000 | EUR 480,000 |
| Year 5 | EUR 360,000 | EUR 120,000 | EUR 480,000 |

License fees are fixed for the initial 3-year term. Years 4 and 5 are subject to annual CPI adjustment capped at 3%.

---

## 4. Implementation Services Pricing

### 4.1 Implementation Phases and Costs

Implementation services are priced on a time-and-materials basis within a capped budget. The following estimates are based on the 22-week programme described in the technical proposal:

| Phase | Weeks | SettleMint Days | Est. Cost (EUR) |
|---|---|---|---|
| Phase 1: Architecture and Governance | 1 to 5 | 35 days | 87,500 to 105,000 |
| Phase 2: Platform Deployment and Integration | 6 to 12 | 55 days | 137,500 to 165,000 |
| Phase 3: Compliance Configuration and Testing | 13 to 18 | 50 days | 125,000 to 150,000 |
| Phase 4: Production Cutover and Stabilization | 19 to 22 | 30 days | 75,000 to 90,000 |
| Travel and Expenses (estimated, actuals billed) | - |, | 25,000 to 35,000 |
| **Total Implementation (indicative)** | **22 weeks** | **170 days** | **450,000 to 545,000** |

*Day rate: EUR 2,500 per consultant day (Solution Architect, Programme Manager, Integration Engineer). Key Management Specialist: EUR 3,000 per day. Travel and expenses billed at cost with receipts.*

### 4.2 Bank of China Resource Requirements

Bank of China's implementation resource commitment affects both programme cost and timeline. The following BOC resources are required at no cost to SettleMint's commercial:

| Role | Commitment | Phase |
|---|---|---|
| Technology Lead | Full-time (5 days/week) | All phases |
| Compliance SME | Part-time (3 days/week) | Phases 1, 3 |
| CIPS/SWIFT SME | Part-time (3 days/week) | Phases 1, 2 |
| HSM/Security Lead | Part-time (3 days/week) | Phases 1, 2 |
| Operations Lead | Full-time (5 days/week) | Phases 3, 4 |
| Legal Counsel | Part-time (1 day/week) | Phase 1 |
| Business Sponsor | Part-time (0.5 day/week) | All phases |

Under-resourcing of BOC's implementation team is a material programme risk. SettleMint reserves the right to adjust the timeline and re-price implementation services if BOC resource commitments are not met per the agreed resource plan.

### 4.3 Optional Implementation Add-Ons

| Add-On | Description | Indicative Cost |
|---|---|---|
| Additional UAT Support | Extended UAT execution support (beyond standard 10 days) | EUR 2,500/day |
| Regulatory Evidence Pack | Preparation of PBOC/SAFE-specific evidence documentation | EUR 25,000 to 40,000 |
| Additional Pilot Counterparty Onboarding | Onboarding support for more than 10 initial counterparties | EUR 1,500 per additional counterparty |
| Multi-Currency Corridor Setup | Configuration and testing for each additional currency corridor beyond CNY/USD and CNY/EUR | EUR 30,000 to 50,000 per corridor |
| Advanced Reporting Configuration | Custom Grafana dashboard development beyond pre-built set | EUR 15,000 to 25,000 |

---

## 5. Environment and Infrastructure Costs

### 5.1 Infrastructure Cost Structure

SettleMint does not provide or resell infrastructure. Bank of China provides its own on-premises hardware for production and DR environments, and its own private cloud (Alibaba Cloud, Tencent Cloud, or Huawei Cloud) for non-production environments.

**On-Premises Production Infrastructure (Bank of China CAPEX):**

The following hardware configuration is required for production and DR. Sizing is based on estimated 200 payments per hour sustained throughput at 2x peak headroom:

| Component | Quantity | Specification | Estimated Unit Cost (EUR) |
|---|---|---|---|
| Application servers | 6 (3 prod + 3 DR) | 16-core CPU, 64GB RAM, 500GB SSD | 15,000 to 25,000 each |
| Blockchain validator nodes | 5 (3 prod + 2 DR) | 8-core CPU, 32GB RAM, 1TB NVMe | 10,000 to 18,000 each |
| Database servers | 4 (2 prod + 2 DR) | 16-core CPU, 128GB RAM, 2TB NVMe | 20,000 to 35,000 each |
| HSM units | 3 (2 prod + 1 DR) | Thales Luna or equivalent | 30,000 to 50,000 each |
| Network equipment | - | Load balancers, firewalls, switches | 40,000 to 80,000 total |
| **Total estimated CAPEX** | | | **EUR 385,000 to 660,000** |

*This is a rough estimate for budgeting purposes. Actual hardware costs depend on vendor negotiations, existing hardware inventory, and specific configuration requirements.*

**Non-Production Cloud Infrastructure (Annual OPEX):**

| Environment | Monthly Cost (EUR) | Annual (EUR) |
|---|---|---|
| Development | 2,000 to 3,000 | 24,000 to 36,000 |
| SIT | 2,500 to 4,000 | 30,000 to 48,000 |
| UAT | 2,500 to 4,000 | 30,000 to 48,000 |
| Pre-Production | 3,000 to 5,000 | 36,000 to 60,000 |
| **Total Non-Production Cloud** | **10,000 to 16,000/month** | **120,000 to 192,000/year** |

*Non-production environments can be shut down outside working hours, reducing costs by 60 to 70% outside business hours.*

---

## 6. Support and Maintenance Fees

### 6.1 Support Tiers

Support is included in the Enterprise Tier license for Premium support level. The following table summarizes the support model:

| Support Element | Included in Enterprise License | Optional Upgrade |
|---|---|---|
| P1 Response: 24/7/365, 15-min response | Yes | - |
| P2/P3 Response: Business hours (08:00-20:00 CST) | Yes | - |
| Named Support Engineer | Yes | - |
| Quarterly platform review | Yes | - |
| Security patch management | Yes | - |
| Platform release management | Yes | - |
| Dedicated on-site support (hypercare beyond standard 2 weeks) | No | EUR 2,500/day |
| Extended hypercare (Week 23 to 26) | No | EUR 15,000 flat |
| Annual security assessment support | No | EUR 20,000 to 35,000 |

---

## 7. Total Cost of Ownership Analysis

### 7.1 5-Year TCO Model

| Cost Category | Year 1 | Year 2 | Year 3 | Year 4 | Year 5 | 5-Year Total |
|---|---|---|---|---|---|---|
| Platform License (Production + Dev) | 480,000 | 480,000 | 480,000 | 494,400 | 509,232 | 2,443,632 |
| Implementation Services (one-off) | 500,000 | - |, | - |, | 500,000 |
| Premium Support (included in license) | - |, | - |, | - |, |
| Non-Production Cloud (estimated midpoint) | 156,000 | 156,000 | 156,000 | 160,680 | 165,500 | 794,180 |
| On-Premises Infrastructure CAPEX (amortized 5yr) | 105,000 | 105,000 | 105,000 | 105,000 | 105,000 | 525,000 |
| Internal Resource (BOC staff time - not SettleMint cost) | See note | - |, | - |, | - |
| **Total Estimated 5-Year TCO** | **1,241,000** | **741,000** | **741,000** | **760,080** | **779,732** | **4,262,812** |

*Note: BOC internal resource costs (salaries for operations team, compliance officers, technology team) are excluded from TCO as they represent ongoing business costs that exist regardless of the platform choice.*

*Year 4/5 license and cloud costs reflect 3% CPI adjustment.*

### 7.2 Per-Payment Unit Economics

At an estimated 50,000 cross-border payments per year (Year 3 target), the per-payment platform cost is:

Annual recurring cost (Year 3): EUR 741,000 ÷ 50,000 payments = EUR 14.82 per payment

At 100,000 payments per year: EUR 741,000 ÷ 100,000 = EUR 7.41 per payment

At 200,000 payments per year: EUR 741,000 ÷ 200,000 = EUR 3.71 per payment

The volume-insensitive license model means unit cost decreases as Bank of China scales the programme. This is structurally the opposite of per-transaction pricing, which would hold unit cost constant regardless of economies of scale in Bank of China's operations.

---

## 8. Build vs. Buy Analysis

### 8.1 Custom Build Cost Estimate

A custom-built cross-border tokenized payment platform for Bank of China with equivalent capabilities would require:

| Component | Estimated Cost (CNY millions) | Notes |
|---|---|---|
| Smart contract development and audit | 15 to 25 | ERC-3643 equivalent, multi-jurisdiction compliance |
| Backend platform development | 40 to 60 | APIs, workflow engine, integration layer |
| Compliance module development | 20 to 35 | 12+ compliance rules, governance framework |
| Identity and KYC infrastructure | 15 to 25 | OnchainID equivalent, Trust Anchor model |
| CIPS and SWIFT integration | 10 to 20 | Custom adapter development and testing |
| Observability stack | 5 to 10 | Custom dashboards, alerting |
| Security architecture (HSM, key mgmt) | 10 to 20 | Key Guardian equivalent |
| Testing and QA | 15 to 25 | End-to-end testing programme |
| Regulatory engagement and compliance review | 10 to 20 | PBOC/SAFE engagement support |
| Project management and governance | 10 to 20 | 24 to 36 month programme management |
| **Total Custom Build Estimate** | **150 to 260 CNY million** | **EUR 19 to 33 million at 8:1 CNY/EUR** |

**Custom build risks not captured in cost estimate:**
- Technology obsolescence risk (building to today's standards on a platform that evolves rapidly)
- Talent scarcity risk (blockchain and smart contract engineers command significant salary premiums in China)
- Regulatory uncertainty risk (custom-built compliance logic is harder to update when PBOC or SAFE guidance changes)
- Time-to-market risk (24 to 36 month build cycle versus 22-week DALP deployment)

### 8.2 DALP vs. Custom Build Comparison

| Dimension | DALP | Custom Build |
|---|---|---|
| Time to first production payment | 22 weeks | 24 to 36 months |
| 5-Year TCO | EUR 4.3 million | EUR 19 to 33 million |
| Smart contract audit | Completed (ERC-3643) | Required per build (EUR 500K to 2M) |
| Compliance module updates | Configuration change (days) | Engineering cycle (months) |
| PBOC regulatory flexibility | Module reconfiguration without code | Code change with full re-audit |
| Integration maintenance | SettleMint product maintenance | Internal maintenance responsibility |
| Talent dependency | SettleMint platform expertise | Bank of China internal blockchain team |
| Reference deployments | DBS, OCBC, ANZ, CBA, SAMA (live) | None - new build |

---

## 9. ROI Analysis and Payback Period

### 9.1 Value Drivers

The business case for Bank of China's cross-border tokenized payment programme is driven by three categories of value:

**Category 1: Settlement Efficiency (Quantifiable)**

Traditional cross-border payment settlement involves T+1 to T+3 cycle times, with correspondent banking fees ranging from 0.05% to 0.30% of transaction value. At Bank of China's estimated cross-border payment volume of CNY 50 billion per year (conservative estimate for a major corridor), settlement efficiency gains translate to:

- Reduced settlement latency from T+2 average to same-day (T+0): estimated 1.5% working capital improvement on payment volumes in transit. On CNY 50 billion annual volume, this is CNY 750 million released from float (approximately EUR 94 million of working capital).
- Correspondent banking fee reduction: tokenized settlement reduces the correspondent chain for CIPS-eligible corridors by 1 to 2 banks. Estimated fee saving: 0.05 to 0.10% of transaction value = CNY 25 to 50 million annually on CNY 50 billion volume.

**Category 2: Operational Cost Reduction (Partially Quantifiable)**

- Reconciliation cost reduction: manual cross-border payment reconciliation at Bank of China currently involves significant operations team time (estimated 8 to 15 FTE-equivalent across operations and finance). Automated three-way reconciliation reduces this to exception handling only, estimated at 3 to 5 FTE reduction, saving approximately EUR 400,000 to 700,000 annually.
- Exception handling cost reduction: automated compliance enforcement and workflow routing reduces manual exception processing by an estimated 60%. At an estimated 200 exceptions per month at EUR 150 per exception, this saves EUR 360,000 annually.
- SWIFT messaging cost reduction: CIPS-settled corridors replace higher-cost SWIFT messaging. Estimated SWIFT fee saving: EUR 100,000 to 200,000 annually on high-volume corridors.

**Category 3: Strategic Value (Non-Quantifiable)**

- First-mover positioning in China cross-border digital payment infrastructure
- Regulatory relationship with PBOC demonstrating technological leadership
- Platform foundation for additional digital asset products (trade finance, supply chain finance, digital deposits)
- Improved correspondent banking relationships through faster, more transparent settlement

### 9.2 Indicative Payback Period

| Metric | Year 1 | Year 2 | Year 3 | Year 4 | Year 5 |
|---|---|---|---|---|---|
| Annual Investment (EUR) | 1,241,000 | 741,000 | 741,000 | 760,080 | 779,732 |
| Working Capital Release Benefit (EUR) | - | 47,000,000 | 47,000,000 | 47,000,000 | 47,000,000 |
| Fee Savings Benefit (EUR) | - | 3,125,000 | 3,125,000 | 3,125,000 | 3,125,000 |
| Operational Cost Savings (EUR) | - | 860,000 | 860,000 | 860,000 | 860,000 |
| Net Annual Benefit (EUR) | (1,241,000) | 50,244,000 | 50,244,000 | 50,224,920 | 50,205,268 |
| Cumulative Net Benefit (EUR) | (1,241,000) | 49,003,000 | 99,247,000 | 149,471,920 | 199,677,188 |

*Working capital release benefit is a balance sheet benefit (release of float capital), not a P&L cash benefit. Its value depends on Bank of China's cost of capital. Using a conservative 5% cost of capital, EUR 94M working capital release = EUR 4.7M annual P&L benefit; at 10% cost of capital = EUR 9.4M.*

**Practical payback:** DALP licensing and implementation costs are recovered within Year 2 from operational savings alone (reconciliation, exceptions, SWIFT fees), excluding working capital benefits. The working capital release benefit is orders of magnitude larger than the platform cost, making the TCO conversation economically straightforward for Bank of China's CFO.

---

## 10. Scenario Pricing

### 10.1 Scenario A: Pilot Programme (3 Corridors, 20 Counterparties)

A limited pilot programme covering three cross-border corridors (CNY/USD, CNY/EUR, CNY/HKD) with 20 registered counterparties and 5,000 payments per year.

| Component | Year 1 (EUR) | Annual from Year 2 (EUR) |
|---|---|---|
| Foundation License (Production + Dev) | 340,000 | 340,000 |
| Implementation (reduced scope - 16 weeks) | 320,000 to 420,000 | - |
| Non-production Cloud | 90,000 | 90,000 |
| **Pilot Total** | **750,000 to 850,000** | **430,000** |

### 10.2 Scenario B: Enterprise Programme (10 Corridors, 100 Counterparties) - Recommended

Full enterprise deployment as described in the technical proposal covering 10 cross-border corridors with up to 100 registered counterparties and 50,000 to 200,000 payments per year.

| Component | Year 1 (EUR) | Annual from Year 2 (EUR) |
|---|---|---|
| Enterprise License (Production + Dev) | 480,000 | 480,000 |
| Implementation (22-week programme) | 500,000 | - |
| Non-production Cloud | 156,000 | 156,000 |
| **Enterprise Total** | **1,136,000** | **636,000** |

### 10.3 Scenario C: Multi-Programme (Payments + Trade Finance + Deposits)

Expanded deployment using DALP for cross-border payments plus tokenized trade finance instruments and deposit token management on the same platform infrastructure.

| Component | Year 1 (EUR) | Annual from Year 2 (EUR) |
|---|---|---|
| Enterprise License (covers all programmes) | 480,000 | 480,000 |
| Initial Implementation (22 weeks, payments) | 500,000 | - |
| Trade Finance Programme (10 weeks) | 200,000 to 280,000 | - |
| Deposit Token Programme (8 weeks) | 160,000 to 220,000 | - |
| Non-production Cloud | 156,000 | 156,000 |
| **Multi-Programme Total Year 1** | **1,496,000 to 1,636,000** | **636,000** |

*Multi-programme approach maximizes per-license-dollar return. The EUR 480,000 Enterprise license covers all three programmes simultaneously.*

---

## 11. Payment Terms and Milestones

### 11.1 License Payment Terms

| Milestone | Amount | Trigger |
|---|---|---|
| Contract signature | 50% of annual license (EUR 240,000) | Contract effective date |
| Go-live (production cutover) | 50% of annual license (EUR 240,000) | Production cutover confirmed |
| **Annual renewal** | 100% of annual license (EUR 480,000) | Anniversary of go-live date |

Invoices are payable within 30 days of issue.

### 11.2 Implementation Services Payment Terms

Implementation services are billed monthly in arrears based on actual days worked, with a 10% retention on each invoice released upon Phase 4 completion:

| Month | Estimated Days Worked | Estimated Invoice (EUR) | Retention (EUR) |
|---|---|---|---|
| Month 1-2 (Phase 1) | 35 | 87,500 | 8,750 |
| Month 2-4 (Phase 2) | 55 | 137,500 | 13,750 |
| Month 4-5 (Phase 3) | 50 | 125,000 | 12,500 |
| Month 5-6 (Phase 4) | 30 | 75,000 | 7,500 |
| Retention Release (on Phase 4 completion) | - | 42,500 | - |

### 11.3 Minimum Commitment

The minimum commitment for the Enterprise Tier is a 3-year license term. Early termination within the 3-year term incurs an early termination fee equal to the remaining license fees for the contracted term, net of 6 months' notice period credit.

---

## 12. Commercial Assumptions Register

| ID | Assumption | Impact if Wrong |
|---|---|---|
| CA-001 | Exchange rate for invoicing: 1 EUR = 8.0 CNY (fixed for contract term). Actual CNY invoicing available as an option - contact SettleMint commercial. | License costs in CNY would fluctuate with FX rate |
| CA-002 | On-premises production infrastructure is provided by Bank of China at no charge to SettleMint | Increased programme cost if SettleMint required to provide infrastructure |
| CA-003 | Bank of China provides CIPS sandbox access at no cost to SettleMint | CIPS integration testing may require paid sandbox access |
| CA-004 | Implementation is conducted primarily in English with Chinese documentation available for key compliance and operational materials | Additional translation costs if full Chinese documentation required throughout |
| CA-005 | Implementation travel is primarily to Bank of China's technology centre location; international travel is limited | Travel and expenses increase if additional locations required |
| CA-006 | Non-production cloud infrastructure is provided by Bank of China in an approved Chinese cloud provider tenancy | Infrastructure costs may vary from estimate |
| CA-007 | Prices are held for 12 months from proposal date | Prices may be revised for proposals submitted after March 2027 |
| CA-008 | Standard support covers business hours 08:00-20:00 CST; additional time zones are covered at P1 level only | Additional cost if 24/7 P2/P3 coverage required |

---

## 13. Commercial Risk Register

| Risk | Probability | Impact | Mitigation |
|---|---|---|---|
| Implementation timeline extension due to BOC resource availability | Medium | Medium (additional SettleMint days) | Resource plan agreed at Phase 1; BOC resource commitments documented in contract |
| CIPS integration complexity requires additional SettleMint engineering days | Medium | Low (within contingency) | CIPS specification workshop in Phase 1; contingency of 10 days included in estimate |
| Additional regulatory evidence preparation required beyond standard | Low | Low to Medium | Regulatory evidence pack is an optional add-on priced separately |
| FX rate movement affects CNY-equivalent costs | Medium | Low | Contract can be denominated in CNY at Bank of China's request |
| Expanded programme scope (additional corridors or products) increases cost | High (likely positive) | Positive | Enterprise license covers expansion at no additional license cost; implementation services priced separately |

---

## 14. Exit and Transition Terms

### 14.1 Data Portability

Bank of China owns all data generated by the DALP platform deployed in its infrastructure. Upon contract termination:

- All on-chain transaction data remains in Bank of China's blockchain infrastructure, which Bank of China continues to control
- Off-chain operational data (payment instructions, participant registry, reconciliation records) can be exported in standard formats (JSON, CSV) prior to platform decommissioning
- Configuration files, runbooks, and operational documentation are delivered to Bank of China during implementation and remain Bank of China's property
- SettleMint provides 6 months of transition support at standard day rates upon contract notice to assist data migration or platform handover

### 14.2 Intellectual Property

- DALP platform software remains SettleMint's intellectual property
- Bank of China's configuration, data, and operational documentation are Bank of China's property
- Smart contracts deployed by Bank of China on Bank of China's blockchain remain Bank of China's operational assets
- SettleMint's source code escrow arrangements are disclosed in the contract; access is triggered by defined events (SettleMint insolvency, material platform abandonment)

### 14.3 Post-Termination Access

Upon contract termination with proper notice (minimum 6 months), Bank of China retains access to the deployed DALP platform for a 6-month transition period at no additional license cost, enabling an orderly migration or wind-down. Security patch support continues during the transition period.

---

## 15. Value Justification

Bank of China's cross-border tokenized payment programme is not primarily a cost-reduction exercise: it is a strategic capability investment. The DALP platform provides the following strategic value that should be reflected in Bank of China's investment decision:

**Time-to-market advantage.** The 22-week deployment timeline means Bank of China can have a controlled live cross-border tokenized payment operation before any peer institution completes a comparable custom build. In a market where PBOC is actively engaged with digital currency infrastructure, demonstrating operational capability early positions Bank of China as a preferred partner for regulatory pilots and market-infrastructure initiatives.

**Regulatory optionality.** DALP's modular compliance architecture means that as PBOC, SAFE, and CAC regulatory guidance evolves (and it will evolve), Bank of China can update compliance module configuration without rebuilding the platform. This optionality has real option value: a EUR 4.3M platform that can adapt to regulatory change is worth significantly more than a EUR 25M custom platform that requires significant re-engineering with every regulatory update.

**Platform extensibility.** The EUR 480,000 annual Enterprise license covers Bank of China's cross-border payment programme plus tokenized trade finance, tokenized deposits, and any additional use cases Bank of China decides to pursue. The platform foundation for a multi-product digital asset strategy costs EUR 480,000 per year. That is a structurally different investment decision than a EUR 25M custom build that covers only one use case.

**Reference network effect.** Bank of China joins a network of DALP institutional clients that includes DBS, OCBC, ANZ, CBA, Commerzbank, and SAMA. Reference checks, implementation lessons, and compliance framework sharing across this network reduce Bank of China's implementation and operational risk. No custom build provides this network benefit.

---

*This commercial proposal is prepared by SettleMint NV for Bank of China under the terms of RFP reference BANK-OF-CHINA-RFP-202603. All prices exclude applicable taxes. This document is classified SettleMint Confidential and is intended solely for Bank of China's evaluation committee.*
