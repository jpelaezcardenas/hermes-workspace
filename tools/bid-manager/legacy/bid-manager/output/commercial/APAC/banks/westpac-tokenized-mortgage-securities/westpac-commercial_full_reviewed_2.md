# Commercial Proposal: Tokenized Mortgage Securities Platform

**Prepared for:** Westpac Banking Corporation
**Date:** 20 March 2026
**Version:** 2.0 Final
**Classification:** SettleMint Confidential. Invited Bidders Only
**Reference:** WESTPAC-RFP-202603

*All prices exclude applicable taxes and Australian GST. GST treatment is addressed in Section 12. Prices are stated in EUR. AUD/EUR exchange rate treatment is addressed in Section 13.*

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

**Document Title:** Commercial Proposal: Tokenized Mortgage Securities Platform
**Client:** Westpac Banking Corporation, Australia
**Date:** 20 March 2026
**Version:** 2.0 Final
**Prepared by:** SettleMint NV
**Classification:** SettleMint Confidential

*This document contains proprietary and confidential pricing information belonging to SettleMint NV. It is submitted exclusively in response to WESTPAC-RFP-202603. All prices exclude applicable taxes and Australian GST.*

---

## 2. Commercial Summary

Westpac's Tokenized Mortgage Securities programme requires a commercial model that supports a multi-year, mission-critical financial market infrastructure investment. SettleMint's environment-based licensing model provides cost certainty: fees are fixed per environment, not variable with RMBS issuance volume, investor count, or securitization trust count. As Westpac's RMBS tokenization programme scales from the initial RMBS pilot to a broader covered bond programme and potential NZ subsidiary deployment, the marginal cost of adding new instruments within the existing environment is zero.

**Year 1 Total Platform Cost Estimate:**

| Component | Annual Cost (EUR) |
|---|---|
| Production License (1 environment) | 300,000 |
| Development License (1 environment) | 120,000 |
| Implementation Services (20-week programme) | 280,000 to 420,000 |
| Premium Support | 70,000 to 100,000 |
| Infrastructure (AWS ap-southeast-2, pass-through) | 53,000 to 95,000 |
| **Estimated Year 1 Total (EUR)** | **823,000 to 1,035,000** |

**Five-Year Platform License:**

| Year | Production (EUR) | Development (EUR) | Total (EUR) |
|---|---|---|---|
| Year 1 | 300,000 | 120,000 | 420,000 |
| Year 2 | 300,000 | 120,000 | 420,000 |
| Year 3 | 300,000 | 120,000 | 420,000 |
| Year 4 | 309,000 | 123,600 | 432,600 |
| Year 5 | 318,270 | 127,308 | 445,578 |
| **5-Year Total** | **1,527,270** | **610,908** | **2,138,178** |

*Years 4 and 5 include indicative 3% CPI adjustment. All prices exclude applicable taxes and Australian GST.*

**Commercial Headline:** DALP's 5-year total cost of approximately EUR 3.0-3.5 million represents 15-25% of the estimated AUD 8-15 million custom build cost delivering equivalent functionality, with deployment in 20 weeks versus 24-36 months.

---

## 3. Licensing Model and Principles

### 3.1 Core Principles

**Volume-insensitive pricing:** Westpac pays for environments. As the RMBS programme scales from the first securitization trust to 20+ active trusts, from 50 investors to 500, and from AUD 1 billion outstanding to AUD 20 billion, the platform license remains EUR 420,000/year for the two-environment baseline. RMBS operational success does not create license cost escalation.

**All instruments, one license:** The production license covers all DALP RMBS capabilities including Senior, Mezzanine, and Equity tranche management; pool factor management; coupon distribution; prepayment event management; XvP settlement via RITS and NPP; AUSTRAC event export; s708 compliance enforcement; and all 18 compliance modules, without incremental fees per securitization trust, per tranche class, or per investor.

**Instrument expansion through configuration:** Adding covered bond tokenization to the existing RMBS environment (if Westpac wants a single production environment for both) is a configuration exercise within the existing license. However, a second separate production environment (EUR 300,000/year) is recommended for covered bonds to ensure complete regulatory isolation between RMBS (APS 120 Securitization) and covered bond (APS 120 Covered Bonds) regulatory domains.

**Entity expansion through additional environments:** A Westpac NZ subsidiary deployment requires a separate production environment at the standard rate (EUR 300,000/year), not a bespoke pricing negotiation.

**No per-transaction fees:** No fees per RMBS issuance, per XvP settlement executed, per pool factor update, or per coupon distribution processed. Monthly operational volumes have no impact on the license fee.

### 3.2 License Types

**Production License: EUR 300,000 per year**

Live RMBS operations environment. Covers all RMBS lifecycle operations (issuance to maturity); all compliance enforcement (s708, Country Restriction, Holding Period); XvP settlement via RITS/RTGS and NPP; AUSTRAC event export; servicer report automation; APRA CPS 234 audit trail; and full observability stack.

**Development License: EUR 120,000 per year**

Non-production environments for development, integration testing, UAT, and pre-production validation. Full DALP RMBS capability; no live investor transactions.

### 3.3 What Is Not Included

- Implementation services (separate fixed-fee)
- Premium Support (separate annual fee)
- AWS infrastructure (pass-through at cost)
- CloudHSM hardware (included in AWS infrastructure) or on-premise HSM hardware (capital cost at Westpac's expense)
- Westpac-operated Besu node infrastructure (Westpac's own capital and operating expense)
- Third-party systems (Hogan, RITS connectivity, AUSTRAC platform) operated by Westpac or third parties

---

## 4. Implementation Services Pricing

### 4.1 Fixed-Fee 20-Week Programme

Implementation Services are priced as a fixed fee for the 20-week tokenized mortgage securities programme. The fixed-fee model means that scope overruns within the defined programme scope are absorbed by SettleMint.

**Indicative Implementation Fee: EUR 280,000 to EUR 420,000**

The range is confirmed in Phase 1 following architecture review. Lower end assumes: standard Hogan API, straightforward RITS ISO 20022 integration, AWS CloudHSM, no covered bond scope in Phase 1. Upper end reflects: complex Hogan legacy API, RITS and NPP parallel integration complexity, on-premise HSM integration, and extensive AUSTRAC event schema mapping.

### 4.2 Phase Scope and Deliverables

| Phase | Duration | Key Deliverables |
|---|---|---|
| Phase 1: Discovery | 3 weeks | Hogan GL mapping workshop; RITS architecture review; APRA CPS 230/234 mapping; AUSTRAC integration assessment; Westpac Besu node architecture; CloudHSM vs on-premise HSM decision |
| Phase 2: Configuration | 4 weeks | AWS ap-southeast-2 deployment; CloudHSM provisioning and key ceremony; RMBS token configuration (Senior, Mezzanine, Equity); s708 compliance modules; Holding Period and Country Restriction; Westpac Besu node setup |
| Phase 3: Integration | 5 weeks | Hogan GL posting integration; RITS ISO 20022 integration; NPP integration; AUSTRAC event export; KYB/s708 claims provisioning; CPR pool factor feed; Investor Reporting Platform export; SIEM security event integration |
| Phase 4: Testing | 3 weeks | Functional SIT (10 UAT scenarios); APRA CPS 234 security assessment; CPS 230 evidence pack assembly; performance testing at 2x expected volume |
| Phase 5: Go-Live | 1 week | Production deployment in AWS ap-southeast-2; go-live validation; first securitization trust setup |
| Phase 6: Hypercare | 4 weeks | Intensive monitoring; issue resolution; optimisation; training; knowledge transfer |

### 4.2a Implementation Resource Model

SettleMint's implementation team for Westpac's 20-week programme:

| Role | Engagement | Responsibility |
|---|---|---|
| Programme Lead | Full 20 weeks | Programme governance; Westpac senior interface; commercial milestone sign-off |
| APAC Solution Architect | Phases 1-4 (14 weeks) | APRA regulatory alignment; RITS/NPP architecture; RMBS token configuration; security architecture |
| Platform Engineer | Phases 2-5 (13 weeks) | AWS ap-southeast-2 deployment; CloudHSM key ceremony; Besu node setup; RMBS configuration |
| Integration Engineer | Phases 3-4 (8 weeks) | Hogan GL integration; RITS ISO 20022; NPP; AUSTRAC event export; CPR pool factor feed; KYB integration |
| Security Engineer | Phase 4 (3 weeks) | APRA CPS 234 security assessment; evidence pack assembly; penetration test coordination |
| QA / Test Lead | Phases 3-4 (5 weeks) | SIT; UAT scenarios TC-01 to TC-10; performance testing; RITS settlement testing |
| Support Engineer | Phases 5-6 (5 weeks) | Go-live support; hypercare monitoring; knowledge transfer; training delivery |

**SettleMint Total Effort:** Approximately 22-28 person-weeks for the base scope. The implementation fee range (EUR 280,000 to 420,000) reflects: lower end for simple integrations with experienced Westpac counterpart team; upper end for complex Hogan API, parallel RITS/NPP integration, and extensive APRA evidence scope.

**Westpac Team Requirements:** Westpac's programme requires dedicated counterpart availability:
- Programme Sponsor: 20% time (governance and escalation)
- Technical Lead: 50% time (Phases 1-4)
- Hogan Integration Developer: 50% time (Phase 3)
- RITS/Treasury Specialist: 30% time (Phases 1 and 3)
- APRA Compliance Representative: 30% time (Phases 1 and 4)
- UAT Team (Securitization Operations, Investor Services): 100% time in Phase 4 UAT weeks

SettleMint's programme lead meets with Westpac's programme sponsor weekly throughout the 20-week programme. Weekly progress reports are provided in writing covering: completed deliverables, upcoming week plan, open risks and actions, dependency tracker update, and commercial/milestone status.

### 4.3 Out of Scope

- Legal advisory on ASIC MIS classification, APRA APS 120 securitization regulatory treatment for tokenized RMBS, or tax treatment
- Westpac-operated Besu node hardware, network provisioning, and operating costs
- Investor legal documentation (Information Memorandum, subscription agreements)
- AUSTRAC system development (Westpac's AML monitoring rules and SMR filing)
- Hogan system changes or GL account code setup (Westpac's finance team owns GL configuration)
- Additional integration points beyond those defined in Phase 1 architecture review

---

## 5. Environment and Infrastructure Costs

### 5.1 AWS ap-southeast-2 Infrastructure (Pass-Through at Cost)

| Component | Monthly Estimate (AUD) | Annual Estimate (AUD) |
|---|---|---|
| Compute: EKS cluster plus EC2 multi-AZ Sydney | 5,000 to 8,500 | 60,000 to 102,000 |
| Compute: Besu blockchain nodes multi-AZ | 900 to 1,500 | 10,800 to 18,000 |
| Database: RDS PostgreSQL Multi-AZ | 1,200 to 2,000 | 14,400 to 24,000 |
| Object Storage: S3 (audit logs, APRA evidence, document archive) | 300 to 700 | 3,600 to 8,400 |
| AWS CloudHSM (2-unit HA cluster) | 1,400 to 1,600 | 16,800 to 19,200 |
| Observability: VictoriaMetrics, Loki, Tempo, Grafana | 500 to 900 | 6,000 to 10,800 |
| Data Transfer, Direct Connect, Secrets Manager | 400 to 700 | 4,800 to 8,400 |
| **Total Infrastructure (AUD)** | **9,700 to 15,900** | **116,400 to 190,800** |
| **Total Infrastructure (EUR at 1.48 AUD/EUR)** | **6,554 to 10,743** | **78,649 to 128,919** |

*Pass-through at AWS billing rates without SettleMint markup. Note: AWS CloudHSM cost is included above (approximately AUD 16,800 to 19,200/year for 2-unit HA cluster).*

*If Westpac elects on-premise HSM instead of AWS CloudHSM: CloudHSM cost above is replaced by on-premise HSM hosting and network costs; hardware capital of AUD 35,000 to 60,000 (one-time, Westpac's capital) plus AUD 7,000 to 12,000/year maintenance.*

### 5.2 Westpac-Operated Besu Node Costs

Westpac's Besu validator node (operated by Westpac's infrastructure team) is not included in SettleMint's infrastructure cost. Westpac's estimated costs for the Besu node:

| Component | Westpac Cost Estimate |
|---|---|
| Server hardware or VM (t3.xlarge equivalent) | AUD 8,000 to 15,000/year (VM) or capital if bare metal |
| Network connectivity to AWS Direct Connect | Included in Westpac's existing Direct Connect capacity |
| Storage for blockchain data | AUD 1,000 to 3,000/year |
| IT operations (monitoring, patching) | Estimated 0.5 FTE-days/month within existing IT operations scope |

**Total Westpac Besu Node Cost:** Approximately AUD 9,000 to 18,000/year (largely within existing IT infrastructure), with no incremental SettleMint fee.

---

## 6. Support and Maintenance Fees

### 6.1 Premium Support

**Premium Support Fee: EUR 70,000 to EUR 100,000 per year**

Confirmed in Phase 1 based on final scoping of named engineer hours and AEDT coverage extension.

**Premium Support SLA:**

| Metric | Commitment |
|---|---|
| Monthly uptime SLA | 99.95% |
| P1 Response | 1 hour |
| P1 Resolution | 4 hours |
| P2 Response | 4 hours |
| P2 Resolution | 8 hours |
| P3 Response | Next business day |
| Sydney-timezone coverage | 07:00 to 22:00 AEDT, Monday to Friday |
| P1 on-call | 24/7 |
| Named support engineer | Familiar with Westpac RMBS configuration, Hogan, RITS |
| Monthly technical business review | Yes |
| RMBS operations calendar monitoring | Heightened monitoring on pool factor update dates, coupon distribution dates |

**P1 Definition for RMBS:** Platform unavailable during RITS business hours on a scheduled settlement date; pool factor update failure on scheduled update date; XvP settlement failure for active RMBS issuance; RITS integration unavailable preventing settlement; APRA-reportable security incident; monthly servicer report export failure on servicer report due date.

### 6.2 Enterprise Support Upgrade Path

For Westpac's later programme phases (multiple active trusts, covered bond programme live), Enterprise Support provides 24/7 coverage:

**Enterprise Support: EUR 180,000 to EUR 220,000 per year**

- 24/7 dedicated support team
- P1 response reduced to 30 minutes
- Dedicated Slack channel with 24/7 response
- Quarterly on-site review (Sydney)
- Proactive platform health monitoring with weekly health reports

---

## 7. Total Cost of Ownership Analysis

### 7.1 Three-Year TCO

| Component | Year 1 (EUR) | Year 2 (EUR) | Year 3 (EUR) | 3-Year Total (EUR) |
|---|---|---|---|---|
| Production License | 300,000 | 300,000 | 300,000 | 900,000 |
| Development License | 120,000 | 120,000 | 120,000 | 360,000 |
| Implementation (Year 1 only) | 280,000 to 420,000 | 0 | 0 | 280,000 to 420,000 |
| Premium Support | 70,000 to 100,000 | 70,000 to 100,000 | 70,000 to 100,000 | 210,000 to 300,000 |
| Infrastructure (EUR, indicative) | 78,000 to 129,000 | 84,000 to 138,000 | 90,000 to 148,000 | 252,000 to 415,000 |
| **3-Year Total (EUR)** | | | | **2,002,000 to 2,395,000** |

### 7.2 Five-Year TCO

| Component | 5-Year Total (EUR) |
|---|---|
| Platform Licenses (with CPI from Year 4) | 2,138,000 |
| Implementation (Year 1 only) | 280,000 to 420,000 |
| Premium Support (5 years) | 350,000 to 500,000 |
| Infrastructure (5 years, EUR indicative) | 444,000 to 740,000 |
| **5-Year Total (EUR)** | **3,212,000 to 3,798,000** |

### 7.3 Unit Cost Analysis

RMBS tokenization creates operational scale economies through DALP's fixed licensing:

| Westpac RMBS Programme Scale | Annual DALP License | License per AUD 1B Outstanding |
|---|---|---|
| AUD 2B outstanding (initial programme) | EUR 420,000 | EUR 210,000/billion |
| AUD 5B outstanding (Year 2) | EUR 420,000 | EUR 84,000/billion |
| AUD 10B outstanding (Year 3) | EUR 420,000 | EUR 42,000/billion |
| AUD 20B outstanding (Year 5) | EUR 420,000 | EUR 21,000/billion |

At AUD 20B outstanding (a realistic mid-term target for Westpac's digital RMBS programme), the DALP license represents EUR 21,000 per AUD 1B outstanding, or approximately 0.002% of programme value. This is commercially immaterial relative to the operational savings generated at this scale.

---

## 8. Build vs. Buy Analysis

### 8.1 Component-Level Custom Build Estimate

| Component | Custom Build Estimate (AUD) | Timeline | DALP Coverage | Confidence |
|---|---|---|---|---|
| RMBS token contracts (3 tranche classes, pool factor management) | 1,500,000 to 3,000,000 | 12 to 18 months | All 3 tranche classes; pool factor; coupon; partial redemption | 🟢 Native |
| s708 investor compliance architecture | 600,000 to 1,200,000 | 6 to 10 months | Whitelist; OnchainID; s708 claims; pre-transfer enforcement | 🟢 Native |
| XvP settlement module (RITS, NPP, SWIFT) | 700,000 to 1,500,000 | 8 to 12 months | XvP; RITS ISO 20022; NPP; SWIFT payment generation | 🟢 Native |
| Hogan GL integration | 300,000 to 600,000 | 4 to 6 months | GL posting webhooks; GL mapping; reconciliation report | 🟡 Partial |
| AUSTRAC event export integration | 200,000 to 400,000 | 3 to 5 months | Chain Indexer event export; AUSTRAC reporting format | 🟡 Partial |
| CPR pool factor data feed and workflow | 200,000 to 400,000 | 3 to 5 months | Data Feed Connector; maker-checker workflow; Restate durable execution | 🟢 Native |
| Servicer report automation | 300,000 to 600,000 | 4 to 6 months | Chain Indexer servicer report export; investor reporting integration | 🟢 Native |
| HSM key management with Westpac custody | 400,000 to 800,000 | 5 to 8 months | Key Guardian; AWS CloudHSM; Westpac zero-knowledge model | 🟢 Native |
| Identity Registry (ERC-734/735 OnchainID) | 400,000 to 700,000 | 5 to 7 months | Full OnchainID implementation; Trusted Issuer framework | 🟢 Native |
| Compliance engine (18 modules) | 1,000,000 to 2,000,000 | 10 to 15 months | All 18 modules | 🟢 Native |
| Security architecture (APRA CPS 234) | 400,000 to 800,000 | 4 to 6 months | ISO 27001; HSM; pen testing; CPS 234 evidence pack | 🟢 Native |
| APRA CPS 230 MSP compliance framework | 200,000 to 400,000 | 3 to 4 months | BCP; DR; exit plan; audit rights provisions | 🟢 Native |
| Observability and dashboards | 200,000 to 400,000 | 3 to 4 months | VictoriaMetrics, Loki, Tempo, Grafana; RMBS dashboards | 🟢 Native |
| **Total Custom Build (AUD)** | **6,400,000 to 12,800,000** | **24 to 36 months** | | |
| **Annual Maintenance (15-20% of build)** | **960,000 to 2,560,000/year** | Ongoing | | |

### 8.2 5-Year Cost Comparison

| | DALP | Custom Build |
|---|---|---|
| Year 1 capital (implementation / build) | EUR 280,000 to 420,000 (AUD 415,000 to 622,000) | AUD 6,400,000 to 12,800,000 |
| Annual operating (license / maintenance) | EUR 420,000/year (AUD 622,000/year) | AUD 960,000 to 2,560,000/year |
| 5-Year Total (AUD) | AUD 4,525,000 to 5,732,000 | AUD 10,560,000 to 23,600,000 |
| Production live | 20 weeks | 24 to 36 months |
| Revenue and savings acceleration | 18-24 months earlier | Baseline |

*AUD equivalents at 1.48 AUD/EUR planning rate.*

The 5-year DALP advantage over custom build ranges from AUD 6 million to AUD 18 million in direct cost savings, plus the 18-24 month acceleration of operational benefits.

---

## 9. ROI Analysis and Payback Period

### 9.1 Quantified Operational Savings

**Servicer Report Assembly Automation:**

Current process: 2-3 business days per monthly cycle (trust manager, servicer officer, reconciliation team). Estimated cost at AUD 1,500/day senior staff time: AUD 4,500 to 7,500 per month, or AUD 54,000 to 90,000 per year per active securitization trust.

With DALP: automated event export reduces assembly to same-day (approximately 4 hours of staff review time). Saving: AUD 40,000 to 70,000 per active trust per year.

At 10 active trusts (Year 3 scale): AUD 400,000 to 700,000/year in servicer report savings.

**T+0 Settlement: Counterparty Risk Reduction:**

Current T+3 RMBS settlement: 3 days of unhedged counterparty exposure. At AUD 10B outstanding, the Basel III regulatory capital for 3-day counterparty risk (assuming 20% RWA weight for AA-rated RMBS trade receivables, 10.5% capital requirement): AUD 10B x 3/365 x 20% x 10.5% = AUD 17.3 million capital requirement reduction from T+0 settlement.

Cost of capital at 8% ROE: AUD 17.3M x 8% = AUD 1.38 million/year in capital cost savings from T+0 settlement at AUD 10B scale.

**APRA Examination Evidence Preparation:**

Current process: 3-5 days of senior staff time (IT Risk, Compliance, Securitization) per APRA examination. Cost: AUD 200,000 to 350,000 per examination (APRA examines major banks' digital systems every 18-36 months).

DALP automated evidence export: 1-2 days. Saving: AUD 130,000 to 250,000 per examination, or AUD 65,000 to 140,000 annualised.

**Trust Accounting Reconciliation:**

Current manual reconciliation of trust accounting between Hogan and servicer records: estimated 3 days/month (reconciliation team). Cost: AUD 1,000/day x 3 days x 12 months = AUD 36,000/year per trust.

DALP atomic settlement eliminates timing discrepancies (primary reconciliation cause). Saving: AUD 25,000 to 30,000/year per active trust.

**Total Quantified Savings Summary:**

| Savings Category | Year 2 (AUD) | Year 3 (AUD) | Year 4 (AUD) |
|---|---|---|---|
| Servicer report automation (5 trusts, 10 trusts, 15 trusts) | 200,000 to 350,000 | 400,000 to 700,000 | 600,000 to 1,050,000 |
| Capital efficiency (T+0 settlement at AUD 5B, 10B, 15B scale) | 690,000 | 1,380,000 | 2,070,000 |
| APRA examination preparation | 65,000 to 140,000 | 65,000 to 140,000 | 65,000 to 140,000 |
| Trust accounting reconciliation (5, 10, 15 trusts) | 125,000 to 150,000 | 250,000 to 300,000 | 375,000 to 450,000 |
| NPP settlement speed (retail investor coupon, reduced delays) | 50,000 | 100,000 | 150,000 |
| **Total Annual Savings (AUD)** | **1,130,000 to 1,330,000** | **2,195,000 to 2,620,000** | **3,260,000 to 3,860,000** |
| **DALP Annual Cost (AUD at 1.48)** | **622,000** | **622,000** | **640,000** |
| **Net Annual Benefit (AUD)** | **508,000 to 708,000** | **1,573,000 to 1,998,000** | **2,620,000 to 3,220,000** |

### 9.2 Payback Period

| Scenario | Year 1 Total Cost (AUD) | Year 2 Net Savings (AUD) | Payback Period |
|---|---|---|---|
| Conservative (5 trusts by Year 2) | 1,220,000 to 1,530,000 | 1,130,000 to 1,330,000 | 12 to 16 months from go-live |
| Base case (8 trusts by Year 2) | 1,220,000 to 1,530,000 | 1,550,000 to 1,820,000 | Under 12 months from go-live |
| Optimistic (12 trusts by Year 2) | 1,220,000 to 1,530,000 | 2,100,000 to 2,500,000 | Under 9 months from go-live |

DALP's investment pays back within Year 2 under all scenarios.

---

## 10. Scenario Pricing

### 10.1 Scenario A: Covered Bond Programme (Phase 2)

Adding Westpac's covered bond tokenization programme as a separate Phase 2 deployment:

| Component | Additional Annual Cost (EUR) |
|---|---|
| Covered Bond Production Environment | 300,000 |
| Covered Bond Development Environment | 120,000 |
| Phase 2 Implementation (12 weeks, integration reuse) | 150,000 to 220,000 one-time |
| Additional Infrastructure (covered bond environment) | 45,000 to 80,000/year |
| **Additional Annual License (covered bond only)** | **420,000** |

**Volume discount:** 10% discount on the 3rd and subsequent environment licenses when contracted simultaneously. If Phase 2 covered bond is contracted at the same time as Phase 1 RMBS: covered bond license at EUR 378,000/year (10% discount applied to EUR 420,000).

### 10.2 Scenario B: Westpac NZ Subsidiary

Extending the RMBS tokenization programme to Westpac New Zealand:

| Component | Additional Annual Cost (EUR) |
|---|---|
| Westpac NZ Production Environment | 300,000 |
| Westpac NZ Development Environment | 120,000 |
| Westpac NZ Implementation (12 weeks, RMBS template reuse) | 120,000 to 180,000 one-time |
| Westpac NZ Infrastructure (AWS ap-southeast-2 or Melbourne) | 45,000 to 80,000/year |
| **Additional Annual License (NZ only)** | **420,000** |

**Volume discount:** 10% on the 3rd environment. If RMBS (AU), Covered Bond (AU), and NZ are all contracted simultaneously: EUR 378,000/year for each of the 3rd and subsequent environments.

### 10.3 Scenario C: Expanded Investor Registry (Offshore QIB Programme)

If Westpac significantly expands its offshore QIB distribution programme (50+ international institutional investors requiring SWIFT settlement, multi-jurisdiction Country Restriction management, and enhanced AUSTRAC offshore reporting):

| Component | Additional Cost |
|---|---|
| Offshore QIB SWIFT integration services | EUR 40,000 to 80,000 one-time |
| Additional AUSTRAC compliance mapping for offshore events | EUR 20,000 to 40,000 one-time |
| Additional infrastructure (SWIFT gateway capacity) | Included in existing infrastructure estimate |

No additional annual license fee for expanded investor numbers.

---

## 11. Payment Terms and Milestones

### 11.1 Platform License

Annual, upfront. Year 1 invoice issued at contract execution; subsequent years at 12-month anniversaries. Payable within 30 days of invoice. All prices in EUR.

### 11.2 Implementation Services: Milestone Payment Schedule

| Milestone | Payment % | Trigger Event | Estimated Timing |
|---|---|---|---|
| Contract Execution | 25% | Signed MSA and SoW; purchase order issued | Week 0 |
| Phase 1 Gate | 20% | Hogan GL mapping workshop completed; APRA CPS 230/234 mapping documented; RITS integration architecture agreed | Week 3 |
| Phase 3 Gate | 30% | Hogan GL integration operational; RITS ISO 20022 integration tested; AUSTRAC event export delivering to Westpac AUSTRAC platform; CPR pool factor feed operational | Week 13 |
| Phase 5 Go-Live | 20% | Production deployment confirmed; first securitization trust tokens created; go-live validation signed off | Week 21 |
| Phase 6 Close | 5% | Hypercare period completed; training sign-off; knowledge transfer documentation delivered | Week 25 |

**Payment Protection Provisions:**

- If SettleMint fails to deliver a milestone within 2 weeks of the scheduled date for reasons within SettleMint's control: milestone payment deferred until delivery
- If SettleMint fails to deliver a milestone within 4 weeks: Westpac has the option to terminate implementation services with a refund of all unearned milestone payments, retaining rights to the platform license
- If Westpac-side dependencies cause milestone delays: programme timeline extends proportionally; fixed-fee is unchanged

### 11.3 Support and Infrastructure

Support: Annual, upfront, concurrent with platform license invoice. Infrastructure: Monthly in arrears, AWS billing report attached. Westpac receives read-only access to AWS Cost Explorer for the DALP account.

---

## 12. Commercial Assumptions Register

| ID | Assumption | Impact if Incorrect |
|---|---|---|
| CA-001 | Initial scope: 1 Production plus 1 Development environment | Third environment requires additional license at standard rate |
| CA-002 | Minimum contract term: 36 months | Shorter term may require pricing adjustment |
| CA-003 | All SettleMint invoices in EUR; AUD/EUR FX risk managed by Westpac treasury | No impact on SettleMint invoice amount |
| CA-004 | Australian GST (10%): SettleMint is a Belgian entity. Westpac to confirm reverse-charge GST applicability under ATO imported digital services rules. SettleMint does not collect Australian GST. | If reverse-charge GST applies, Westpac self-assesses 10% GST on SettleMint invoices and remits to ATO. Input tax credit may be available for Westpac as GST-registered business. |
| CA-005 | CloudHSM (not on-premise HSM) is selected as the HSM solution | On-premise HSM increases infrastructure cost by AUD 35,000 to 60,000 capital plus AUD 7,000 to 12,000/year maintenance; implementation timeline unchanged |
| CA-006 | Hogan API exposes GL posting capability with documentation and sandbox available in Phase 1 | Hogan batch integration as fallback; implementation timeline extended by up to 2 weeks |
| CA-007 | RITS ISO 20022 test environment accessible through Westpac's existing RITS settlement account | RITS connectivity is Westpac-managed; SettleMint provides ISO 20022 message generation; test environment access is Westpac's to arrange |
| CA-008 | NPP API accessible through Westpac's existing NPP bank connectivity | NPP connectivity is Westpac-managed; SettleMint provides NPP payment instruction generation |
| CA-009 | AUSTRAC reporting platform has an inbound API or SFTP endpoint for event export | SFTP batch export as alternative if API not available |
| CA-010 | CPR model produces monthly pool factor as a standard numeric value in JSON or CSV format | Non-standard format requires data adapter development (Phase 3 scope, change request if required) |
| CA-011 | Investor reporting platform has an inbound API or data feed endpoint for servicer report events | Alternative: DALP generates servicer report data file for manual import |
| CA-012 | Platform license is payable regardless of RMBS issuance volume achieved post-go-live | Volume ramp risk is Westpac's commercial risk; license is not contingent on achieving volume milestones |
| CA-013 | Price hold: Years 1-3 fixed at EUR 420,000/year; Years 4-5 subject to Belgian CPI review with 6 months notice | Belgian CPI adjustment capped at 5% per year |
| CA-014 | Premium Support contracted for minimum 12 months concurrent with production license | Cannot be terminated independently during initial term |
| CA-015 | Westpac-operated Besu node infrastructure (hardware, network, operations) is Westpac's cost | No impact on SettleMint pricing; Westpac node is Westpac's capital expense |
| CA-016 | Key ceremony (Phase 2) requires Westpac CISO and CTO availability for approximately 4 hours in Sydney | Ceremony scheduled during Phase 2 with 4 weeks notice; if key personnel are unavailable, ceremony delays Phase 2 gate |
| CA-017 | SettleMint change request rate for out-of-scope work: AUD 2,200/day (EUR 1,500/day) for SettleMint resources | Change requests require Westpac approval before execution |

---

## 13. Commercial Risk Register

| Risk ID | Risk | Likelihood | Financial Exposure | Mitigation |
|---|---|---|---|---|
| CR-001 | ASIC managed investment scheme classification for tokenized RMBS requires structural changes to token architecture | Low | EUR 100,000 to 200,000 additional implementation | Phase 1 legal assessment; DALP flexible architecture supports multiple classification structures |
| CR-002 | Hogan API complexity requires batch integration as fallback (higher integration cost) | Medium | EUR 20,000 to 50,000 additional scope | Phase 1 Hogan API assessment; fallback approach defined and priced in change request if required |
| CR-003 | RITS ISO 20022 integration requires RBA test environment access that is delayed | Medium | Programme delay (no cost increase); fixed-fee unchanged | RITS test environment access arranged in Phase 1 kickoff; RBA coordination managed by Westpac Treasury |
| CR-004 | AUD/EUR exchange rate deterioration increases Westpac's effective license cost | Low | AUD 40,000 to 160,000/year at extreme rate movements | Westpac treasury hedging; EUR license is fixed; FX risk is Westpac treasury scope |
| CR-005 | SettleMint financial difficulty impacts platform support continuity | Very Low | High (continuity risk) | Source code escrow; Westpac-operated Besu node; smart contracts remain accessible post-termination; governance keys held by Westpac |
| CR-006 | Australian GST reverse-charge applies to SettleMint invoices | Low | 10% of invoice amounts; effectively EUR 42,000/year on base license | Westpac tax team seeks ATO determination before contract execution; input tax credit potentially offsets full GST |
| CR-007 | CPR model data feed format incompatible requires custom adapter | Low | EUR 20,000 to 40,000 one-time (change request) | Phase 1 data feed format assessment; standard formats (JSON, CSV) accepted without customisation |
| CR-008 | APRA examination during programme delivery creates resource conflict | Low | Minimal financial impact; resource distraction risk for Westpac IT Risk | Phase 4 APRA evidence pack pre-assembled to be available at any point during delivery |
| CR-009 | Platform license renewal negotiation in Year 4 results in above-CPI price increase request | Low | EUR 20,000 to 50,000/year incremental | CPI cap terms in contract (Section 14) limit maximum annual increase to 5% |
| CR-010 | Volume ramp slower than projected reduces ROI case timeline | Medium | No financial impact on DALP license; ROI timeline extends | Volume-insensitive pricing means Westpac's cost is the same at low or high volumes |

---

## 14. Exit and Transition Terms

### 14.1 Termination Notice

Minimum 90 days written notice for non-renewal at contract expiry. Minimum 6 months written notice for early termination with early termination fee provisions per the master services agreement.

### 14.2 Data Portability

Westpac retains full ownership of all RMBS data. On termination or expiry, SettleMint provides within 30 days:

- Complete export of all RMBS token transaction records (issuance, transfers, pool factor updates, coupon distributions, redemptions) in JSON and CSV
- Export of all investor identity registry data and s708 accreditation claim records
- Servicer report event history for all active and completed securitization trusts
- Complete audit trail export (cryptographically verifiable, with Besu block hash references)
- APRA CPS 234 evidence pack for the preceding examination period
- All configuration specifications, integration documentation, runbooks, and operational guides

**90-day read-only platform access** following termination for ad hoc data extraction and verification.

### 14.3 Blockchain Continuity

Smart contracts deployed on Westpac's private Besu network remain accessible after contract termination. Westpac's operated Besu validator node continues to operate, giving Westpac independent access to all RMBS token state and transaction history. Smart contracts do not require SettleMint's platform to remain operational: the blockchain continues independently.

### 14.4 Key Management on Termination

Governance keys held by Westpac under the bring-your-own-custody model are fully accessible to Westpac without SettleMint involvement. Operational signing keys in the AWS CloudHSM (under Westpac's control) are migrated to Westpac's alternative key management system during the 90-day transition period. SettleMint provides key migration procedures and transition support.

### 14.5 Source Code Escrow Option

SettleMint offers a source code escrow arrangement with Iron Mountain or an equivalent third-party escrow agent. The escrow contains the DALP platform source code (excluding third-party dependencies that are available under open source licenses). Release events include: SettleMint insolvency; SettleMint's failure to provide DALP platform support for more than 90 days; and SettleMint's cessation of the DALP product line. The escrow arrangement is available at an additional one-time cost of EUR 15,000 to 25,000 (escrow setup) plus EUR 5,000 to 8,000/year (escrow maintenance).

### 14.6 Multi-Year Pricing Protection

**Years 1-3 (Initial Term):** Platform license price fixed at EUR 420,000/year. No escalation.

**Years 4-5 (Renewal):** CPI-linked adjustment based on Belgian CPI (Statbel). Maximum increase: 5% per year. Floor: no reduction. Six months notice before Year 4 invoice.

**Additional Environment Pricing Lock:** Covered bond or NZ environments contracted within the initial 36-month term are locked at the contracted rate for the initial term, with the same CPI mechanism applying from Year 4.

---

## 15. Value Justification

### 15.1 Strategic Value: Wholesale Funding Modernisation

Westpac's RMBS programme is not purely a cost-reduction initiative; it is a strategic component of Westpac's wholesale funding modernisation strategy. Tokenized RMBS creates three strategic capabilities that traditional RMBS administration cannot:

**New Investor Segments:** Australia's superannuation sector (AUD 3 trillion in assets under management) is under increasing regulatory and beneficiary pressure to demonstrate engagement with digital asset investment. Tokenized RMBS provides superannuation funds with a digital asset allocation that is familiar in risk profile (AAA-rated Australian mortgages) but delivered in digital form. Westpac's tokenized RMBS programme is positioned to capture this superannuation digital allocation demand ahead of competitors.

**Offshore Investor Reach:** Digital RMBS tokens are accessible to offshore QIBs without the intermediary infrastructure required for traditional Austraclear-settled RMBS (custody accounts, Austraclear membership, Euroclear/Clearstream settlement bridges). Westpac's tokenized RMBS programme can reach offshore institutional investors in jurisdictions where traditional Austraclear settlement is a barrier.

**NPP Speed Advantage:** For retail investor distributions (where applicable), NPP settlement provides same-day AUD receipt compared to T+1 or T+2 Austraclear settlement. This speed advantage differentiates Westpac's digital RMBS programme for individual s708 investors.

### 15.2 Operational Value: Settlement Risk and Capital

The T+0 settlement value case is the largest single quantified financial benefit. For Westpac's RMBS programme at scale (AUD 10-20 billion outstanding), the combination of: (a) reduced counterparty risk on settlement (T+0 vs T+3); (b) reduced Basel III counterparty risk capital requirement; and (c) reduced failed settlement resolution costs creates a financial benefit of AUD 1.5-3 million per year. This benefit grows proportionally with programme scale.

### 15.3 Regulatory Value: APRA Examination Cost and Risk

APRA examinations of major banks' digital asset systems are increasingly detailed. Westpac's RMBS tokenization programme, as a novel digital financial market infrastructure deployment, will be subject to enhanced APRA scrutiny. DALP's APRA CPS 234 evidence architecture (automated evidence export, structured event taxonomy, cryptographic completeness verification) converts a risk (APRA examination findings) into a competitive advantage (demonstrating best-practice governance to APRA).

The APRA examination preparation cost savings (AUD 130,000-250,000 per examination) are financially significant. More importantly, the quality improvement in examination evidence reduces the probability of examination findings that require remediation, protecting Westpac's regulatory relationship with APRA.

### 15.4 AUD/EUR Exchange Rate Note

SettleMint invoices exclusively in EUR. Westpac's treasury is responsible for managing AUD/EUR exchange rate exposure. For budget planning purposes, Westpac's treasury team should confirm the current 12-month AUD/EUR forward rate and apply it to the EUR license amounts.

**Indicative AUD Equivalents (at 1.48 AUD/EUR planning rate):**

| Component | EUR | AUD (indicative at 1.48) |
|---|---|---|
| Production License | 300,000 | 444,000 |
| Development License | 120,000 | 177,600 |
| Annual Platform License | 420,000 | 621,600 |
| 5-Year Platform License | 2,138,178 | 3,164,503 |

*AUD equivalents are indicative for budget planning only. Actual AUD cost depends on the AUD/EUR rate at the time of EUR payment.*

### 15.5 Australian GST Treatment

SettleMint NV is a Belgian entity registered for Belgian VAT. SettleMint is not registered for Australian GST and does not collect Australian GST on invoices issued to Australian entities.

Under the GST Act, imported digital services from overseas suppliers may be subject to GST under the reverse-charge mechanism for Australian GST-registered businesses. The applicability of reverse-charge GST to SettleMint's platform license and implementation services depends on the classification of these services under the ATO's imported digital services rules.

**Westpac's Responsibility:** Westpac's tax team should obtain an ATO determination or qualified Australian tax advice on the GST treatment before contract execution. If reverse-charge GST applies (10% of invoice amounts), Westpac self-assesses and remits to the ATO. As a GST-registered business, Westpac may be entitled to claim an input tax credit for the GST, effectively making the GST cost neutral from a cash perspective.

**Estimated GST Exposure:** At 10% on the EUR 420,000 annual platform license (AUD 621,600 equivalent), the potential GST exposure is AUD 62,160/year, which may be fully recoverable through input tax credit. SettleMint provides ATO documentation support (Belgian GST registration certificate, service description, confirmation of offshore-only delivery) to support Westpac's GST classification analysis.

---

### 15.6 Commercial Programme Governance

SettleMint's commercial engagement with Westpac is governed through a structured commercial programme governance framework:

**Commercial Account Manager:** A named senior account manager based in the APAC region is responsible for the commercial relationship with Westpac throughout the programme. The account manager participates in all programme governance meetings (monthly business review, quarterly executive review, milestone sign-off sessions) and is Westpac's primary point of contact for commercial issues.

**Commercial Review Cadence:**
- Monthly technical business review: includes a commercial standing item covering invoice status, infrastructure cost review, pending change requests, upcoming milestone payment forecasts, and any commercial issues
- Quarterly executive review: strategic commercial review covering programme ROI trajectory, volume ramp assessment, upcoming renewal or expansion planning, and regulatory change impact on commercial terms

**Change Request Process:** When a requested change falls outside the fixed-fee implementation scope, SettleMint's account manager issues a Change Request document within 3 business days. The Change Request includes: change description, technical approach, estimated effort, cost (at AUD 2,200/day or EUR 1,500/day), and timeline impact. Westpac's programme sponsor approves or declines before any work begins. Approved Change Requests are invoiced at the Phase 5 milestone (for changes during implementation) or as a separate invoice (for post-go-live changes).

**Commercial Escalation:** If commercial disputes arise (e.g., milestone payment disputes, scope interpretation disagreements), the escalation path is: Commercial Account Manager to SettleMint APAC Commercial Director to SettleMint CEO. Westpac's equivalent escalation to their programme sponsor and CFO delegate. Both parties commit to resolving commercial disputes within 30 days of escalation.

### 15.7 RMBS Programme Financial Modeling Support

SettleMint's commercial team provides Westpac's finance team with a Financial Model spreadsheet (Excel format) during Phase 1 that includes:

**Pre-populated Cost Model:** All DALP cost components (license, implementation, support, infrastructure) with editable AUD/EUR rate assumptions, CPI rate assumptions for Years 4-5, and programme scale assumptions (number of active trusts, monthly settlement volume, investor count).

**ROI Model:** The quantified savings model from Section 9, with editable inputs for: Westpac's internal cost rates (staff cost per day, capital cost of equity), programme volume ramp assumptions, current manual process costs (servicer report assembly time, reconciliation time, APRA examination preparation time), and T+0 settlement capital benefit inputs.

**Sensitivity Analysis:** Pre-built sensitivity tables showing the impact of: ±20% volume ramp variation; ±15% AUD/EUR rate movement; ±1 year programme ramp timeline; and ±25% operational savings realisation rate.

The Financial Model is designed to be owned and updated by Westpac's programme finance manager. It is not a SettleMint document; it is provided as a planning tool for Westpac's internal investment case. SettleMint's commercial team is available to review and discuss the Financial Model outputs during Phase 1 to ensure the investment case is robust for Westpac's internal approval process.

### 15.8 Competitor Pricing Benchmarks

Westpac's procurement process will evaluate DALP's commercial terms against alternative approaches. The following benchmarks provide context for the evaluation:

**Custom Build (Internal or Systems Integrator):** AUD 8-15 million capital plus AUD 1.5-3 million/year maintenance. Deployment: 24-36 months. The capital cost alone exceeds DALP's 5-year total cost. The 24-36 month delay represents 18-24 months of forgone operational savings and investor demand capture.

**Generic Blockchain Platform (e.g., Hyperledger, R3 Corda, ConsenSys):** Generic platforms require significant custom development for RMBS-specific functionality (pool factor management, s708 enforcement, servicer report automation, RITS integration). Estimated custom development on top of a generic platform: AUD 4-8 million (lower than full custom build, but still 1-2x DALP's 5-year cost), with deployment in 18-24 months.

**SaaS Trade Finance Platforms (not RMBS-specific):** Trade finance SaaS platforms do not address RMBS tokenization requirements (pool factor management, RITS/RTGS settlement, APRA CPS 234 audit trail, s708 investor compliance). Not a viable substitute for Westpac's programme.

**ASX/Austraclear Digital Infrastructure:** Multi-year market infrastructure initiative with uncertain delivery. DALP provides a commercially available platform today without dependency on market infrastructure transformation timelines.

Against all alternatives, DALP provides the combination of: lowest total cost; fastest deployment; deepest RMBS-specific functionality; and APRA-compliant architecture. The commercial advantage is most pronounced relative to custom build, where DALP's 5-year cost advantage is AUD 6-18 million.

### 15.9 Three-Year vs Five-Year Investment Decision

Westpac's programme team may be evaluating a 36-month initial commitment vs a longer 60-month commitment. The commercial implications of each:

**36-Month Initial Commitment (Years 1-3):**
- License price: EUR 420,000/year (fixed for full initial term)
- Renewal discussion begins 6 months before the 36-month expiry
- Years 4-5 subject to CPI review (capped at 5%/year)
- Option to add covered bond or NZ environments during initial term at standard rate
- Lower commitment risk; appropriate if Westpac wants to validate the programme before committing beyond Year 3

**60-Month Commitment (Years 1-5):**
- License price: EUR 420,000/year for Years 1-3; CPI-adjusted (capped 5%) for Years 4-5
- Price certainty for full 5 years (CPI cap provides maximum cost visibility)
- Programme stability: SettleMint prioritises 60-month clients for platform investment and feature development
- Potential for additional commercial benefits (source code escrow at reduced cost; additional environment discounts; enhanced support SLA at no incremental charge) subject to commercial negotiation at contracting
- Higher initial commitment; appropriate if Westpac's investment case is validated for the full programme lifecycle

SettleMint recommends the 36-month initial commitment for Westpac's RMBS Phase 1 programme, with a structured option to extend to 60 months after 12 months of successful operation. This phased commitment structure aligns SettleMint's commercial interests (programme stability) with Westpac's risk management interests (validation before long-term commitment).

### 15.10 Risk-Adjusted Investment Value

The following risk-adjusted analysis applies conservative probability weights to Westpac's RMBS programme value case, assessing the investment value even under pessimistic assumptions:

| Value Component | 5-Year Base Case (AUD) | Risk Weight | Risk-Adjusted (AUD) |
|---|---|---|---|
| Servicer report automation savings (Year 2-5) | 5,500,000 | 75% probability at base volume | 4,125,000 |
| Capital efficiency from T+0 settlement | 6,900,000 | 80% probability | 5,520,000 |
| APRA examination preparation savings | 500,000 | 90% probability | 450,000 |
| Trust accounting reconciliation savings | 1,500,000 | 80% probability | 1,200,000 |
| New investor segment revenue (superannuation digital mandates) | 3,000,000 | 40% probability | 1,200,000 |
| NPP settlement speed benefits | 500,000 | 80% probability | 400,000 |
| **Total Risk-Adjusted Value (5-Year AUD)** | | | **12,895,000** |
| **DALP 5-Year Cost (AUD at 1.48)** | | | **4,674,000 to 5,625,000** |
| **Risk-Adjusted Net Value (5-Year AUD)** | | | **7,270,000 to 8,221,000** |

Even at conservative probability weights (40-90%), the risk-adjusted 5-year net value exceeds AUD 7 million against a platform investment of AUD 4.7-5.6 million. The investment is justified on a risk-adjusted basis with a net value multiplier of approximately 1.5-1.8x.

The primary value driver (capital efficiency from T+0 settlement) has the highest confidence (80%) because it is derived from a quantifiable regulatory capital calculation, not a speculative estimate. The T+0 settlement capital benefit alone (AUD 5.5 million risk-adjusted over 5 years) nearly covers the entire DALP cost, making the remaining value components (servicer report automation, APRA savings, new investors) almost entirely incremental.

Westpac's programme finance team is encouraged to run their own probability weights and volume assumptions in the Financial Model provided during Phase 1. SettleMint is confident that under any reasonable set of assumptions for a programme at Westpac's scale, the DALP investment generates a substantial positive return.

---

### 15.10a Superannuation Fund Digital Asset Mandate Revenue Potential

A further commercial value dimension that is difficult to quantify precisely but strategically significant is the revenue opportunity from superannuation funds with growing digital asset mandates. Australia's largest superannuation funds (AustralianSuper, Australian Retirement Trust, UniSuper, Aware Super) have collectively announced digital asset investment policies and are actively seeking Australian-domiciled, APRA-regulated digital asset investments within their defensive or fixed income allocation buckets.

Westpac's tokenized AAA-rated RMBS is a natural fit for these mandates: it is a familiar credit instrument (Australian mortgages) in a digital asset form, with full APRA regulatory governance, AUD denomination, and RITS settlement finality. There is no equivalent digital fixed income product currently available from Australian issuers that meets these superannuation fund mandates.

The commercial value of capturing even a modest superannuation fund allocation (AUD 100-500 million per major fund per year) in digital RMBS is material. Westpac's management team is best placed to model this revenue opportunity against the cost of the DALP programme. SettleMint's role is to deliver the infrastructure that makes this revenue opportunity possible; Westpac's capital markets and institutional sales teams capture the revenue.

### 15.11 Commercial Proposal Summary Table

The following table consolidates all commercial components for Westpac's procurement evaluation:

| Commercial Element | DALP Offering | Key Commercial Term |
|---|---|---|
| Production License | EUR 300,000/year | Annual upfront; volume-insensitive; all RMBS instruments included |
| Development License | EUR 120,000/year | Annual upfront; full capability; no live transactions |
| Implementation | EUR 280,000 to 420,000 fixed-fee | 20-week programme; milestone-based payment; scope changes via change request |
| Premium Support | EUR 70,000 to 100,000/year | AEDT timezone; 24/7 P1 on-call; 99.95% SLA; named engineer |
| Infrastructure | Pass-through at cost (AUD 116,000 to 191,000/year) | No markup; monthly invoicing; Westpac Cost Explorer access |
| Year 1 Total | EUR 823,000 to 1,035,000 | All-in estimate for first year |
| 5-Year Total | EUR 3,212,000 to 3,798,000 | Full programme cost including support and infrastructure |
| Covered Bond Phase 2 | EUR 378,000 to 420,000/year additional | 10% volume discount available; 12-week implementation reuse |
| Westpac NZ Extension | EUR 378,000 to 420,000/year additional | Same 10% volume discount; 12-week implementation reuse |
| Contract Term | 36 months minimum | CPI-capped renewal from Year 4; 6 months renewal notice |
| Currency | EUR (Westpac treasury manages AUD/EUR FX) | Fixed EUR amounts; no FX risk to SettleMint |
| GST | Not collected by SettleMint | Westpac tax team to confirm ATO reverse-charge position |
| Termination | 90-day notice (non-renewal); 6 months (early termination) | Full data portability; 90-day read-only access; Westpac node independent access |

This proposal is valid for 90 days from the date stated on the cover page. SettleMint's commercial team is available to discuss any element of this proposal, provide additional commercial modeling, or arrange reference discussions with existing DALP clients. SettleMint's APAC commercial director can be reached directly through the contacts provided in the programme kickoff materials. All commercial terms in this proposal remain open for negotiation within the parameters established by SettleMint's standard commercial framework. Westpac's procurement team is encouraged to identify any commercial terms that require adjustment and to raise these in the commercial negotiation session, which SettleMint recommends scheduling within 2 weeks of this proposal submission to enable contract execution within the preferred programme start window.

---

*All prices exclude applicable taxes and Australian GST. Platform licenses are payable annually and upfront. This proposal is valid for 90 days from the date above. Document Version 2.0 Final. SettleMint Confidential.*
