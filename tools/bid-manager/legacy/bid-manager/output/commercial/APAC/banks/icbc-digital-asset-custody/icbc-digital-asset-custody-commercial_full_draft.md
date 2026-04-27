---
document-title: "Commercial Proposal. Digital Asset Custody Pilot"
client: "ICBC"
date: "March 2026"
version: "1.0"
classification: "SettleMint Confidential"
rfp-reference: "ICBC-RFP-202603"
---

# Commercial Proposal: Digital Asset Custody Pilot

**Prepared for:** Industrial and Commercial Bank of China (ICBC)
**Date:** March 2026
**Version:** 1.0
**Classification:** SettleMint Confidential. Invited Bidders Only
**Reference:** ICBC-RFP-202603

*All prices stated in EUR. CNY/EUR exchange rate treatment addressed in Section 12. All prices exclude applicable taxes.*

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
9. ROI Analysis
10. Scenario Pricing
11. Payment Terms and Milestones
12. Commercial Assumptions Register
13. Commercial Risk Register
14. Exit and Transition Terms
15. Value Justification

---

## 1. Cover Page

**Document Title:** Commercial Proposal. Digital Asset Custody Pilot
**Client:** Industrial and Commercial Bank of China (ICBC)
**Date:** March 2026
**Version:** 1.0
**Prepared by:** SettleMint NV
**Classification:** SettleMint Confidential

*This document contains proprietary and confidential pricing information belonging to SettleMint NV.*

---

## 2. Commercial Summary

**Year 1 Cost Estimate (EUR):**

| Component | Cost (EUR) |
|---|---|
| Production License (Enterprise Tier) | 380,000 |
| Development and SIT License | 120,000 |
| Implementation Services (20-week programme) | 420,000 to 560,000 |
| Premium Support | 76,000 to 114,000 |
| Infrastructure (Private cloud non-prod) | 50,000 to 85,000 |
| **Estimated Year 1 Total** | **1,046,000 to 1,259,000** |

**Commercial Headline:** DALP's 5-year TCO of approximately EUR 3.5 to 4.2 million is estimated at 8 to 15% of custom build cost (estimated CNY 200 to 350 million for institutional digital asset custody at ICBC's scale). The 20-week deployment delivers operational custody capability 24 to 36 months earlier than custom development, capturing first-mover advantage in China's institutional digital asset custody market.

---

## 3. Licensing Model and Principles

### 3.1 Platform Licensing Philosophy

DALP's licensing model is volume-insensitive: no per-client, per-asset, per-transaction, or per-custody-instruction fees. ICBC pays a fixed annual license regardless of:
- Number of custody clients onboarded
- Number of asset types in custody
- Total assets under custody (AUC)
- Number of custody instructions processed
- Number of corporate actions serviced

This model reflects SettleMint's belief that platform adoption should not be penalized by scale. As ICBC's custody programme grows from pilot scope to full commercial custody operations, the licensing cost structure remains predictable.

### 3.2 Recommended License Tier: Enterprise

The Enterprise Tier is recommended for ICBC's digital asset custody pilot, providing:

| Capability | Included |
|---|---|
| Production environment (on-premises) | Yes |
| Non-production environments (up to 3) | Yes |
| All asset classes (bonds, equities, funds, deposits, configurable) | Yes |
| All 18 compliance module types | Yes |
| Custody Vault Module | Yes |
| Pledge Registry Module | Yes |
| Corporate Action Workflow | Yes |
| Full API surface (REST v2, GraphQL, webhooks, CLI) | Yes |
| Key Guardian + HSM integration | Yes |
| Observability stack (Grafana, VictoriaMetrics, Loki, Tempo) | Yes |
| Premium Support (24/7 P1, business hours P2/P3) | Yes |
| Named support engineer | Yes |
| All platform updates during license term | Yes |

### 3.3 License Fee Schedule

| Year | Production License | Development License | Total Annual |
|---|---|---|---|
| Year 1 | EUR 380,000 | EUR 120,000 | EUR 500,000 |
| Year 2 | EUR 380,000 | EUR 120,000 | EUR 500,000 |
| Year 3 | EUR 380,000 | EUR 120,000 | EUR 500,000 |
| Year 4 | EUR 391,400 | EUR 123,600 | EUR 515,000 |
| Year 5 | EUR 403,142 | EUR 127,308 | EUR 530,450 |

Years 4 and 5 reflect 3% annual CPI adjustment (capped).

---

## 4. Implementation Services Pricing

### 4.1 Phase Breakdown

| Phase | Weeks | SettleMint Days | Estimate (EUR) |
|---|---|---|---|
| Phase 1: Architecture and Governance | 1 to 4 | 30 days | 75,000 to 90,000 |
| Phase 2: Platform and Integration | 5 to 10 | 55 days | 137,500 to 165,000 |
| Phase 3: Compliance and Testing | 11 to 16 | 55 days | 137,500 to 165,000 |
| Phase 4: Cutover and Stabilization | 17 to 20 | 30 days | 75,000 to 90,000 |
| Travel and Expenses | - |, | 30,000 to 45,000 |
| **Total Implementation** | **20 weeks** | **170 days** | **455,000 to 555,000** |

Day rate: EUR 2,500 (standard consultants). Key Management Specialist: EUR 3,000/day.

### 4.2 Optional Add-Ons

| Add-On | Indicative Cost (EUR) |
|---|---|
| MLPS Level 3 evidence pack preparation | 30,000 to 50,000 |
| CSRC regulatory submission support | 25,000 to 40,000 |
| Additional custody client onboarding support (beyond 10 initial) | 2,000 per client |
| Chinese-language documentation set | 20,000 to 35,000 |
| Extended hypercare (Weeks 21 to 24) | 15,000 per week |
| Annual security assessment support | 20,000 to 35,000 |

---

## 5. Environment and Infrastructure Costs

### 5.1 On-Premises Production (ICBC CAPEX)

| Component | Quantity | Estimate per Unit (EUR) | Total (EUR) |
|---|---|---|---|
| Application servers | 6 (3 prod + 3 DR) | 15,000 to 25,000 | 90,000 to 150,000 |
| Blockchain validator nodes | 5 (3 prod + 2 DR) | 10,000 to 18,000 | 50,000 to 90,000 |
| Database servers | 4 (2 prod + 2 DR) | 20,000 to 35,000 | 80,000 to 140,000 |
| HSM units | 3 | 30,000 to 50,000 | 90,000 to 150,000 |
| Network equipment | - |, | 40,000 to 80,000 |
| **Total Estimated CAPEX** | | | **350,000 to 610,000** |

### 5.2 Non-Production Cloud (Annual OPEX)

| Environment | Annual (EUR) |
|---|---|
| Development | 24,000 to 36,000 |
| SIT | 30,000 to 48,000 |
| UAT | 30,000 to 48,000 |
| Pre-Production | 36,000 to 60,000 |
| **Total** | **120,000 to 192,000** |

---

## 6. Support and Maintenance

Premium Support is included in the Enterprise License. Additional custody-specific SLA metrics:

| Metric | Target |
|---|---|
| SAL reconciliation break alert | Within 60 seconds of detection |
| Break-glass event notification | Within 30 seconds |
| Corporate action deadline alert | 5 business days advance warning |
| Forced transfer notification | Within 15 minutes of governance approval |

---

## 7. Total Cost of Ownership Analysis

### 7.1 5-Year TCO Model

| Category | Year 1 | Year 2 | Year 3 | Year 4 | Year 5 | 5-Year Total |
|---|---|---|---|---|---|---|
| Platform License | 500,000 | 500,000 | 500,000 | 515,000 | 530,450 | 2,545,450 |
| Implementation (one-off) | 505,000 | - |, | - |, | 505,000 |
| Non-Production Cloud (mid) | 156,000 | 156,000 | 156,000 | 160,680 | 165,500 | 794,180 |
| On-Premises CAPEX (amortized) | 97,000 | 97,000 | 97,000 | 97,000 | 97,000 | 485,000 |
| **Total 5-Year TCO** | **1,258,000** | **753,000** | **753,000** | **772,680** | **792,950** | **4,329,630** |

---

## 8. Build vs. Buy Analysis

Custom digital asset custody platform for ICBC:

| Component | Custom Build Cost (CNY millions) |
|---|---|
| Smart contract development and security audit | 20 to 35 |
| Custody management application | 50 to 80 |
| Key management infrastructure | 15 to 25 |
| Compliance and regulatory framework | 25 to 40 |
| CSDCC integration | 15 to 25 |
| Client portal development | 10 to 20 |
| Observability and reporting | 10 to 20 |
| Testing and QA (36-month programme) | 20 to 35 |
| Regulatory approvals and engagement | 15 to 30 |
| **Total Estimated Custom Build** | **180 to 310 CNY million (EUR 22 to 39 million)** |

DALP 5-year TCO: EUR 4.3 million = 11 to 20% of custom build cost.

---

## 9. ROI Analysis

### 9.1 Value Drivers for ICBC Custody

**Revenue Generation:**
- Digital asset custody fees: 0.05 to 0.15% AUC annually for institutional clients
- At CNY 50 billion AUC (Year 3 target): CNY 25 to 75 million annual custody fee revenue
- At CNY 200 billion AUC (Year 5 target): CNY 100 to 300 million annual custody fee revenue

**Cost Avoidance:**
- Avoid CNY 200 to 310 million custom build cost
- Avoid 3 to 4 years of custom development resource allocation
- Avoid ongoing technology talent acquisition for blockchain engineering

**Strategic Value:**
- First institutional digital asset custody service from a Chinese state-owned bank
- Foundation for e-CNY ecosystem custody services as PBOC framework develops
- Reference programme for CSRC digital asset custody regulatory framework development

### 9.2 ROI Summary

| Metric | Value |
|---|---|
| 5-Year Investment | EUR 4.3 million |
| Year 3 Annual Custody Fee Revenue (estimated) | EUR 3.1 to 9.4 million |
| Simple Payback Period | Year 2 (revenue exceeds cumulative investment) |
| 5-Year Net Benefit (revenue minus investment) | EUR 10 to 40 million |

---

## 10. Scenario Pricing

### Scenario A: Limited Pilot (5 Clients, 3 Asset Classes)

| Component | Year 1 (EUR) | Annual from Year 2 (EUR) |
|---|---|---|
| Foundation License | 340,000 | 340,000 |
| Implementation (16 weeks reduced scope) | 320,000 to 420,000 | - |
| Non-Production Cloud | 90,000 | 90,000 |
| **Pilot Total** | **750,000 to 850,000** | **430,000** |

### Scenario B: Enterprise Custody (50+ Clients, All Asset Classes) - Recommended

As per Section 2 Commercial Summary: Year 1 EUR 1.046 to 1.259 million; Annual from Year 2 EUR 656,000 to 785,000 (license + cloud).

### Scenario C: Full Commercial Custody Launch (200+ Clients)

| Component | Year 1 (EUR) | Annual from Year 2 (EUR) |
|---|---|---|
| Sovereign/Strategic License (unlimited clients) | 550,000 | 550,000 |
| Implementation (20 weeks, full scope) | 505,000 | - |
| Non-Production Cloud (enhanced capacity) | 200,000 | 200,000 |
| Dedicated Solution Architect | 250,000 | 250,000 |
| **Full Commercial Total Year 1** | **1,505,000** | **1,000,000** |

---

## 11. Payment Terms and Milestones

| Milestone | Amount | Trigger |
|---|---|---|
| Contract execution | 50% annual license (EUR 250,000) | Contract effective date |
| Production go-live | 50% annual license (EUR 250,000) | Production cutover confirmed |
| Annual renewal | 100% annual license (EUR 500,000) | Anniversary of go-live |

Implementation services billed monthly in arrears; 10% retention released on Phase 4 completion.

Minimum term: 3 years. Early termination fee: remaining license fees for contracted term, net of 6-month notice credit.

---

## 12. Commercial Assumptions Register

| ID | Assumption | Impact if Wrong |
|---|---|---|
| CA-001 | EUR/CNY exchange rate: 1 EUR = 8.0 CNY (fixed for contract term) | CNY invoicing option available |
| CA-002 | On-premises production infrastructure provided by ICBC | Increased cost if infrastructure not available |
| CA-003 | CSDCC sandbox access at no cost to SettleMint | Integration testing cost may increase |
| CA-004 | Non-production cloud in ICBC's approved Chinese provider tenancy | Cloud cost estimate may vary |
| CA-005 | SOE procurement approval obtained before programme commencement | Timeline may extend |
| CA-006 | Chinese-language documentation limited to operational runbooks; full Chinese translation of technical documentation is an add-on | Additional cost if full Chinese documentation required |
| CA-007 | Prices held for 12 months from proposal date | Prices may be revised after March 2027 |
| CA-008 | MLPS assessment is ICBC's responsibility; SettleMint provides evidence support only | Significant additional cost if SettleMint required to lead MLPS assessment |

---

## 13. Commercial Risk Register

| Risk | Probability | Impact | Mitigation |
|---|---|---|---|
| SOE procurement approval process extends timeline | Medium | Medium | Phase 1 can proceed as professional services engagement pending full approval |
| CSRC guidance on digital securities custody requires unplanned compliance module development | Low | Medium | Modular compliance architecture minimizes development scope; configuration-first approach |
| MLPS assessment requires platform modifications | Low | Medium | MLPS alignment built into initial deployment; self-assessment in Phase 3 |
| HSM procurement delays | Low | High | Order in Phase 1 week 1; escalation to ICBC procurement if delay |
| Chinese-language documentation volume higher than estimated | Low | Low | Add-on pricing available; phased delivery possible |

---

## 14. Exit and Transition Terms

Same terms as Bank of China proposal (Section 14 of BOC commercial proposal). Key points:

- All ICBC custody data remains in ICBC's infrastructure and is fully exportable on request
- DALP platform deployed in ICBC infrastructure: ICBC retains access upon contract termination
- 6-month transition support at standard day rates upon contract notice
- Source code escrow with access on defined trigger conditions
- Client assets held in ICBC's blockchain infrastructure: not affected by contract termination

---

## 15. Value Justification

ICBC's investment in DALP for digital asset custody delivers three strategic outcomes that justify the commercial commitment:

**First: Market Leadership.** ICBC will become the first state-owned bank in China to offer institutional digital asset custody services on a platform with live production references at comparable global institutions. This market leadership position creates competitive advantages in winning institutional custody mandates from domestic and international institutional clients seeking custody in the Chinese market.

**Second: Regulatory Foundation.** ICBC's deployment of an institutional digital asset custody platform with full compliance evidence capabilities positions the bank as a credible partner for PBOC and CSRC as regulatory frameworks for digital asset custody are formalized. Early adopters with operational track records typically have significant influence in shaping the final regulatory framework.

**Third: Platform Extensibility.** The EUR 500,000 annual Enterprise License covers ICBC's custody programme plus any additional digital asset operations ICBC chooses to pursue: tokenized trade finance, digital deposits, supply chain finance, or e-CNY ecosystem services. The platform investment supports a multi-decade digital asset strategy, not just a single pilot programme.

---

*This commercial proposal is prepared by SettleMint NV for ICBC under the terms of RFP reference ICBC-RFP-202603. This document is classified SettleMint Confidential and is intended solely for ICBC's evaluation committee.*
