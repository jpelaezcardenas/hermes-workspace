# Commercial Proposal: Digital Trade Finance Platform

**Prepared for:** UOB (United Overseas Bank Limited)
**Date:** 20 March 2026
**Version:** 2.0 Final
**Classification:** SettleMint Confidential. Invited Bidders Only
**Reference:** UOB-RFP-202603

*All prices exclude applicable taxes and GST. Singapore GST treatment is addressed in Section 12. Taxes are added separately based on the client's jurisdiction and applicable tax treaties.*

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
9. ROI Analysis and Operational Savings
10. Risk-Adjusted Value Analysis
11. Scenario Pricing
12. Payment Terms and Milestones
13. Commercial Assumptions Register
14. Commercial Risk Register
15. Exit and Transition Terms
16. Multi-Year Pricing Protection Terms
17. Value Justification

---

## 1. Cover Page

**Document Title:** Commercial Proposal: Digital Trade Finance Platform
**Client:** UOB (United Overseas Bank Limited), Singapore
**Date:** 20 March 2026
**Version:** 2.0 Final
**Prepared by:** SettleMint NV
**Classification:** SettleMint Confidential

*This document contains proprietary and confidential pricing information belonging to SettleMint NV. It is submitted exclusively in response to UOB-RFP-202603. All prices exclude applicable taxes and GST. Prices are stated in EUR. SGD/EUR exchange rate treatment is addressed in Section 13.*

---

## 2. Commercial Summary

UOB's digital trade finance platform requires a commercial model that scales with the programme's growth across ASEAN trade corridors, without creating a situation where commercial success in trade volumes drives license cost escalation. SettleMint's environment-based licensing model provides exactly this: costs are fixed per environment, not variable with transaction volume, trade value processed, or number of counterparties onboarded.

**Year 1 Total Platform Cost Estimate (EUR):**

| Component | Annual Cost (EUR) |
|---|---|
| Production License (1 environment) | 300,000 |
| Development License (1 environment) | 120,000 |
| Implementation Services (19-week programme, scoped in Phase 1) | 250,000 to 400,000 |
| Premium Support | 60,000 to 90,000 |
| Infrastructure (AWS ap-southeast-1, pass-through at cost) | 65,000 to 115,000 |
| **Estimated Year 1 Total** | **795,000 to 1,025,000** |

*All prices exclude applicable taxes and GST. Implementation and support ranges confirmed in Phase 1 based on detailed scoping.*

**Five-Year Platform License:**

| Year | Production (EUR) | Development (EUR) | License Total (EUR) |
|---|---|---|---|
| Year 1 | 300,000 | 120,000 | 420,000 |
| Year 2 | 300,000 | 120,000 | 420,000 |
| Year 3 | 300,000 | 120,000 | 420,000 |
| Year 4 | 300,000 | 120,000 | 420,000 |
| Year 5 | 300,000 | 120,000 | 420,000 |
| **5-Year Total** | **1,500,000** | **600,000** | **2,100,000** |

*All prices exclude applicable taxes and GST. Annual invoicing upfront.*

**Commercial Headline:** DALP's 5-year license cost of EUR 2.1 million (platform license only) represents approximately 14-26% of the estimated cost of a custom build delivering equivalent capability (EUR 8-15 million capital expenditure plus ongoing maintenance). The 19-week deployment timeline versus 24-36 months for a custom build means UOB captures ASEAN corridor revenue 18-24 months earlier with DALP.

---

## 3. Licensing Model and Principles

### 3.1 Core Principles

**Volume-insensitive pricing:** UOB pays for environments. As UOB's digital trade finance volumes grow, from initial controlled deployment to hundreds of LCs and thousands of BoL transfers monthly, the license cost remains EUR 420,000/year for the two-environment baseline. Commercial success does not create license cost escalation.

**All instruments, one license:** The production license covers all DALP trade finance capabilities: LCs, BoLs, invoice financing, receivables, SGD XvP settlement, TradeTrust integration, SWIFT connectivity, and all 18 compliance modules, without incremental fees per instrument type or corridor.

**Corridor expansion through configuration:** Adding new ASEAN trade corridors (Thailand, Vietnam, Indonesia, Philippines) or new counterparty relationships is a configuration exercise within the existing license. No additional license fee applies for corridor or counterparty expansion.

**Entity expansion through additional environments:** A new UOB legal entity (e.g., UOB Thailand using the same platform as UOB Singapore) requires a separate environment license at the standard rate (EUR 300,000/year for production), not a bespoke pricing negotiation. This provides a predictable cost structure for UOB's ASEAN expansion planning.

**No per-transaction fees:** DALP charges no fees per LC issued, per BoL negotiated, per invoice financed, or per XvP settlement executed. As UOB scales its digital trade finance volumes, the license cost per transaction improves dramatically, directly incentivising programme scale rather than constraining it.

### 3.2 License Types

**Production License: EUR 300,000 per year**

Live trade finance operations environment. Covers all LC, BoL, invoice, and receivable lifecycle operations; all compliance enforcement; SGD XvP settlement; TradeTrust integration; all API access; full observability stack; SWIFT integration; FAST/PayNow integration; AML/KYB integration hooks; multi-AZ Singapore deployment; and 99.95% uptime SLA.

**Development License: EUR 120,000 per year**

Non-production environments for development, integration testing, UAT, and pre-production validation. Full DALP capability; no live customer transactions.

*All licenses payable annually and upfront. All prices exclude applicable taxes and GST.*

### 3.3 What Is Not Included in the License

The following items are not included in the platform license and are priced separately:

- Implementation services (Phase 1 through Phase 6)
- Premium or Enterprise Support (separate annual fee)
- AWS infrastructure (pass-through at cost)
- HSM hardware (if UOB elects on-premise HSM rather than cloud HSM)
- Additional environments beyond the standard Production plus Development
- Third-party systems (GTB, SWIFT connectivity, FAST/PayNow, AML platform) operated by UOB or third parties

---

## 4. Implementation Services Pricing

### 4.1 Fixed-Fee Implementation

Implementation Services are priced as a fixed fee for the defined scope of the 19-week digital trade finance programme. The fixed-fee model means that scope overruns within the defined programme scope are absorbed by SettleMint; UOB's exposure is limited to the agreed fixed fee.

**Indicative Implementation Fee Range: EUR 250,000 to EUR 400,000**

The exact fee is confirmed in Phase 1 following the architecture review and integration assessment. The range reflects: lower end assumes standard GTB API access, straightforward SWIFT integration, and limited TradeTrust corridor complexity; upper end reflects complex GTB API, multi-standard SWIFT integration (MT plus ISO 20022 simultaneously), and extensive TradeTrust ecosystem integration.

**Phase Scope and Milestone Alignment:**

| Phase | Duration | Deliverables |
|---|---|---|
| Phase 1: Discovery | 3 weeks | GTB API assessment; MAS TRM mapping; MAS Notice 644 pre-validation; TradeTrust corridor assessment; SWIFT architecture review; correspondent bank participation model design |
| Phase 2: Configuration | 4 weeks | Singapore environment provisioning; LC, BoL, invoice token configuration; 18 compliance module activation and parameterisation; RBAC and maker-checker configuration |
| Phase 3: Integration | 4 weeks | GTB integration; SWIFT MT700/ISO 20022 integration; FAST/PayNow integration; AML/KYB integration; TradeTrust integration; correspondent bank onboarding (Model B and C) |
| Phase 4: Testing | 3 weeks | Functional SIT; MAS TRM security assessment; MAS Notice 644 evidence pack preparation; UAT with UOB trade finance operations team; performance testing at 2x peak volume |
| Phase 5: Go-Live | 1 week | Production deployment to AWS ap-southeast-1; go-live validation; operational team handover |
| Phase 6: Hypercare | 4 weeks | Intensive monitoring; issue resolution; optimisation; knowledge transfer; training delivery |

**Out-of-scope items (additional fees if required):**

- Legal advisory on MAS PSA licensing classification for specific token types
- Bespoke electronic Bills of Lading legal engineering beyond TradeTrust framework standards
- Investor-facing or counterparty-facing portal development (beyond DALP's standard Asset Console)
- Correspondent bank technical integration support beyond DALP API configuration (correspondent bank's own development is their cost)
- Additional integration points beyond those identified in Section 8 of the technical proposal (GTB, SWIFT, FAST/PayNow, AML, KYB, TradeTrust, SIEM)

---

## 5. Environment and Infrastructure Costs

### 5.1 AWS ap-southeast-1 Infrastructure (Pass-Through at Cost)

Infrastructure costs are passed through to UOB at AWS billing rates without SettleMint markup. Estimates reflect current AWS Singapore pricing and typical DALP trade finance deployment sizing.

| Infrastructure Component | Monthly Estimate (USD) | Annual Estimate (USD) |
|---|---|---|
| Compute: EKS cluster plus EC2 (multi-AZ Singapore, application tier) | 2,500 to 4,000 | 30,000 to 48,000 |
| Compute: Besu blockchain nodes (multi-AZ) | 600 to 1,000 | 7,200 to 12,000 |
| Database: RDS PostgreSQL Multi-AZ (application and indexer databases) | 800 to 1,500 | 9,600 to 18,000 |
| Object Storage: S3 (trade document archive, audit logs, compliance evidence) | 200 to 500 | 2,400 to 6,000 |
| Observability: VictoriaMetrics, Loki, Tempo, Grafana | 350 to 650 | 4,200 to 7,800 |
| Data Transfer: Ingress/egress, AWS Direct Connect usage | 250 to 500 | 3,000 to 6,000 |
| Secrets and Key Management: AWS Secrets Manager, KMS | 100 to 200 | 1,200 to 2,400 |
| **Total Infrastructure Estimate (USD)** | **4,800 to 8,350** | **57,600 to 100,200** |
| **Total Infrastructure Estimate (EUR at 1.08 USD/EUR)** | **4,444 to 7,731** | **53,000 to 93,000** |

*Infrastructure costs are estimates based on current AWS Singapore pricing. Actual costs depend on trade finance volume, document storage volumes, and connectivity configuration. Pass-through invoiced monthly based on AWS billing report.*

### 5.2 Optional HSM Hardware

If UOB elects to deploy a physical HSM appliance (rather than cloud HSM) for the production environment, the following additional costs apply:

- HSM hardware (Luna Network HSM or equivalent): EUR 25,000 to 40,000 capital cost (one-time)
- HSM annual maintenance: EUR 5,000 to 8,000/year
- HSM co-location or data centre hosting: UOB's existing data centre (no additional DALP cost)

Cloud HSM (AWS CloudHSM) is included in the standard infrastructure estimate above and is the recommended approach for most deployments. Physical HSM may be preferred by UOB's CISO if on-premise HSM is a security policy requirement.

---

## 6. Support and Maintenance Fees

### 6.1 Premium Support: Recommended

**Premium Support Fee: EUR 60,000 to EUR 90,000 per year**

The range reflects the final scoping of named support engineer hours and Singapore-timezone coverage extension. Confirmed in Phase 1 based on UOB's support requirements.

**Premium Support SLA:**

| Metric | Commitment |
|---|---|
| Monthly uptime SLA | 99.95% |
| P1 Response | 1 hour |
| P1 Resolution | 4 hours |
| P2 Response | 4 hours |
| P2 Resolution | 8 hours |
| P3 Response | Next business day |
| P3 Resolution | 5 business days |
| Planned maintenance window | Monthly, scheduled with 5 business days notice |

**Support Hours:**
- Standard: 07:00 to 22:00 CET, Monday to Friday
- P1 on-call: 24/7 including weekends
- Singapore-timezone extension: 07:00 to 22:00 SGT, Monday to Friday (included in Premium Support for APAC clients)

**Named Support Engineer:** UOB's Premium Support package includes a named senior support engineer who is briefed on UOB's GTB integration, SWIFT configuration, ASEAN corridor setup, and examination workflow specifics. This named engineer provides continuity across all support interactions and reduces time-to-resolution because they have context on UOB's specific deployment.

### 6.2 Enterprise Support: Optional Upgrade

For UOB's later programme phases (when digital trade finance volumes are high and the platform is mission-critical for ASEAN corridor operations), Enterprise Support provides 24/7 coverage with a dedicated support team.

**Enterprise Support Fee: EUR 150,000 to EUR 200,000 per year**

Includes: 24/7 named support team; dedicated Slack channel with 24/7 response; P1 response time reduced to 30 minutes; proactive platform health monitoring; quarterly on-site (Singapore) review.

---

## 7. Total Cost of Ownership Analysis

### 7.1 Three-Year TCO

| Component | Year 1 (EUR) | Year 2 (EUR) | Year 3 (EUR) | 3-Year Total (EUR) |
|---|---|---|---|---|
| Production License | 300,000 | 300,000 | 300,000 | 900,000 |
| Development License | 120,000 | 120,000 | 120,000 | 360,000 |
| Implementation (Year 1 only) | 250,000 to 400,000 | 0 | 0 | 250,000 to 400,000 |
| Premium Support | 60,000 to 90,000 | 60,000 to 90,000 | 60,000 to 90,000 | 180,000 to 270,000 |
| Infrastructure (AWS, EUR equiv.) | 53,000 to 93,000 | 57,000 to 100,000 | 61,000 to 108,000 | 171,000 to 301,000 |
| **3-Year Total (EUR)** | | | | **1,861,000 to 2,231,000** |

*All prices exclude applicable taxes and GST.*

### 7.2 Five-Year TCO

| Component | 5-Year Total (EUR) |
|---|---|
| Platform Licenses | 2,100,000 |
| Implementation (Year 1 only) | 250,000 to 400,000 |
| Premium Support (5 years) | 300,000 to 450,000 |
| Infrastructure (5 years, AWS, EUR equiv.) | 295,000 to 530,000 |
| **5-Year Total (EUR)** | **2,945,000 to 3,480,000** |

*All prices exclude applicable taxes and GST.*

### 7.3 Per-Transaction Cost Analysis

One of the most commercially significant characteristics of DALP's licensing model for a trade finance platform is the decoupling of license cost from transaction volume.

| UOB Digital Trade Finance Scale | DALP Annual License | License Cost per LC (assuming 50% of volume are LCs) |
|---|---|---|
| 100 LCs/month (1,200/year), SGD 50M volume | EUR 420,000 | EUR 350/LC |
| 500 LCs/month (6,000/year), SGD 250M volume | EUR 420,000 | EUR 70/LC |
| 2,000 LCs/month (24,000/year), SGD 1B volume | EUR 420,000 | EUR 17.50/LC |
| 10,000 LCs/month (120,000/year), SGD 5B volume | EUR 420,000 | EUR 3.50/LC |

The unit economics of the license improve dramatically as volumes scale. UOB's digital trade finance programme is designed to grow from hundreds to thousands of digital instruments over a 3-5 year horizon; the DALP license cost per transaction declines commensurately.

At SGD 1 billion annual digital trade volume (a reasonable 3-year target for UOB's digital trade franchise), the DALP platform license represents 0.042% of trade value. This is commercially sustainable even for thin-margin trade finance transactions.

### 7.4 Comparison to Incumbent Trade Finance Costs

UOB's current paper-based and semi-digital trade finance operations incur the following cost categories that DALP directly addresses:

| Cost Category | Current State Estimate | DALP Impact |
|---|---|---|
| LC examination labour (trade finance officers) | SGD 2,000 to 4,000 per LC (manual examination, reconciliation, documentation) | Estimated 30-40% reduction through automated pre-validation and digital workflow |
| Trade reconciliation (treasury, GL posting) | SGD 500 to 1,000 per LC (manual reconciliation of document transfer and payment timing) | Near-elimination through atomic XvP settlement |
| Audit evidence preparation (MAS IT examinations) | SGD 150,000 to 300,000 per examination (2-5 days of senior staff time) | Reduction to hours through automated evidence pack generation |
| Document discrepancy management | SGD 800 to 1,500 per discrepancy (re-examination, waiver processing, document return) | Process unchanged but digital workflow reduces processing time |
| Correspondent bank SWIFT messaging costs | SGD 15 to 50 per MT700/MT760 message | Model B correspondents eliminate SWIFT round-trip; Model A unchanged |

---

## 8. Build vs. Buy Analysis

### 8.1 Component-Level Build Cost Estimate

The following analysis estimates the cost of building equivalent DALP capabilities through in-house development or a systems integrator engagement. Estimates are based on Singapore-market engineering rates and industry benchmarks for comparable banking blockchain infrastructure projects.

| Component | Custom Build Estimate (EUR) | Custom Build Timeline | DALP Coverage | Confidence in DALP |
|---|---|---|---|---|
| LC token architecture and smart contract | 800,000 to 1,500,000 | 9 to 15 months | Full LC lifecycle in configurable token | 🟢 Native |
| BoL token with single-original enforcement | 600,000 to 1,000,000 | 6 to 12 months | Whitelist single-holder enforcement | 🟢 Native |
| Invoice financing token and lifecycle | 500,000 to 900,000 | 6 to 9 months | Full invoice lifecycle | 🟢 Native |
| Compliance engine (18 module types) | 1,200,000 to 2,000,000 | 12 to 18 months | All 18 modules available | 🟢 Native |
| XvP settlement module (DvP plus PvP) | 500,000 to 900,000 | 6 to 9 months | XvP native; HTLC cross-chain | 🟢 Native |
| Identity Registry (OnchainID, ERC-734/735) | 400,000 to 700,000 | 5 to 8 months | Full OnchainID implementation | 🟢 Native |
| GTB integration layer | 300,000 to 600,000 | 4 to 6 months | Integration architecture defined; GTB API confirmed Phase 3 | 🟡 Partial |
| SWIFT integration (MT700/ISO 20022) | 400,000 to 700,000 | 5 to 8 months | Both MT and ISO 20022 supported | 🟢 Native |
| FAST/PayNow integration | 200,000 to 400,000 | 3 to 5 months | PayNow and FAST integration | 🟢 Native |
| AML/KYB integration hooks | 200,000 to 400,000 | 3 to 5 months | Integration hooks; pre-transfer screening | 🟢 Native |
| TradeTrust integration | 300,000 to 600,000 | 4 to 6 months | Document hash anchoring; external token registration | 🟢 Native |
| Key management (HSM, Fireblocks) | 300,000 to 600,000 | 4 to 6 months | Key Guardian; HSM; Fireblocks governance | 🟢 Native |
| Security architecture (MAS TRM, Notice 644) | 400,000 to 700,000 | 4 to 6 months | All 10 Notice 644 controls; TRM alignment | 🟢 Native |
| Observability and dashboards | 200,000 to 350,000 | 3 to 4 months | VictoriaMetrics, Loki, Tempo, Grafana | 🟢 Native |
| MAS regulatory evidence architecture | 150,000 to 300,000 | 2 to 3 months | Structured evidence export for MAS examinations | 🟢 Native |
| **Total Custom Build Estimate** | **6,550,000 to 11,650,000** | **24 to 36 months** | | |
| **Annual Maintenance (15-20% of build)** | **983,000 to 2,330,000/year** | Ongoing | | |

**DALP 5-Year License vs Custom Build 5-Year Cost:**

| | DALP | Custom Build |
|---|---|---|
| Capital (Year 1 build or implementation) | EUR 250,000 to 400,000 | EUR 6,550,000 to 11,650,000 |
| Annual operating (license or maintenance) | EUR 420,000/year | EUR 983,000 to 2,330,000/year |
| 5-Year Total | EUR 2,945,000 to 3,480,000 | EUR 10,470,000 to 21,970,000 |
| Deployment to production | 19 weeks | 24 to 36 months |

The 5-year cost advantage of DALP over custom build ranges from EUR 7.5 million to EUR 18.5 million. The deployment speed advantage (19 weeks vs 24-36 months) represents 18-24 months of revenue-generating digital trade finance operations that UOB would forgo under a custom build approach.

---

## 9. ROI Analysis and Operational Savings

### 9.1 Quantified Operational Savings

The following operational savings estimates are based on UOB's publicly available trade finance scale and industry benchmarks for digital trade finance transformation programmes. UOB should validate these estimates against internal cost data during Phase 1.

**LC Examination Labour Reduction:**

Assumption: UOB processes 500 digital LCs per month in Year 2, growing to 2,000/month by Year 4. Current examination cost: SGD 2,500 per LC (conservative). Digital workflow reduces examination time by 35% (automated pre-validation of compliance conditions eliminates manual screening; digital document presentation eliminates physical document handling).

- Year 2 savings: 500 LCs/month x 12 months x SGD 2,500 x 35% = SGD 5.25 million/year
- Year 4 savings: 2,000 LCs/month x 12 months x SGD 2,500 x 35% = SGD 21 million/year

**Settlement Reconciliation Elimination:**

Assumption: Current trade settlement reconciliation costs SGD 600 per LC on average (treasury time, GL posting reconciliation, counterparty dispute resolution for settlement timing). XvP atomic settlement eliminates reconciliation for all digitally settled LCs.

- Year 2 savings: 500 LCs/month x 12 months x SGD 600 = SGD 3.6 million/year
- Year 4 savings: 2,000 LCs/month x 12 months x SGD 600 = SGD 14.4 million/year

**MAS Audit Evidence Preparation:**

Assumption: MAS conducts an IT examination of UOB's digital trade finance systems every 24-36 months. Current evidence preparation cost: SGD 200,000 per examination (senior staff time across IT Risk, Compliance, and Trade Finance). DALP's automated evidence pack reduces preparation to 2 days (vs 5 days currently), saving SGD 120,000 per examination.

- Annualised savings: SGD 40,000 to 60,000/year (assuming 2-year examination cycle)

**Counterparty Dispute Resolution:**

Assumption: 2% of current LCs result in counterparty disputes about document presentation timing or payment execution. Each dispute costs SGD 5,000 in resolution time. DALP's atomic settlement and immutable audit trail reduce disputes by 80% (clear on-chain record of presentation and payment timing eliminates ambiguity).

- At 500 LCs/month: dispute savings of 500 x 12 x 2% x 80% x SGD 5,000 = SGD 480,000/year

**Total Quantified Savings Summary (Year 2 to Year 4):**

| Savings Category | Year 2 (SGD) | Year 3 (SGD) | Year 4 (SGD) |
|---|---|---|---|
| LC examination labour (35% reduction) | 5,250,000 | 10,500,000 | 21,000,000 |
| Settlement reconciliation | 3,600,000 | 7,200,000 | 14,400,000 |
| MAS audit evidence | 50,000 | 50,000 | 50,000 |
| Counterparty dispute reduction | 480,000 | 960,000 | 1,920,000 |
| **Total Savings (SGD)** | **9,380,000** | **18,710,000** | **37,370,000** |
| **DALP Total Cost (EUR, approx. SGD equiv.)** | **SGD 605,000** | **SGD 605,000** | **SGD 605,000** |
| **Net Benefit (SGD)** | **SGD 8,775,000** | **SGD 18,105,000** | **SGD 36,765,000** |

*SGD/EUR rate applied at 1.45 SGD/EUR for illustrative purposes. UOB treasury to confirm current rate for financial modelling.*

### 9.2 Revenue Opportunity Acceleration

Beyond direct cost savings, DALP's 19-week deployment creates revenue acceleration relative to a custom build:

**New Corridor Capture:** ASEAN trade corridors where paper-based processes create friction can be served with digital instruments, enabling UOB to serve smaller trade transactions (SGD 50,000 to 200,000 LCs) that are not economically viable with paper-based processing overhead. Assumption: 200 additional small-ticket LCs per month at a net margin of SGD 500 per LC = SGD 1.2 million/year in new revenue.

**Financing Revenue Acceleration:** Digital invoice financing (advances disbursed in hours vs days) increases UOB's financing revenue per unit of capital by increasing throughput. Conservative estimate: 10% increase in financing volume from faster processing = SGD 3-5 million/year additional net interest income at scale.

**Correspondent Banking Differentiation:** A UOB digital trade finance capability positions UOB as a preferred correspondent bank for ASEAN financial institutions, potentially attracting new correspondent banking relationships and the associated fee income.

### 9.3 Payback Period

| Scenario | Implementation + Year 1 Cost (EUR) | Year 2 Net Savings (EUR) | Payback |
|---|---|---|---|
| Conservative (500 LCs/month by Year 2) | EUR 795,000 | EUR 6.5 million (SGD equiv.) | Under 18 months |
| Base case (750 LCs/month by Year 2) | EUR 870,000 | EUR 9.7 million (SGD equiv.) | Under 12 months |
| Optimistic (1,000 LCs/month by Year 2) | EUR 950,000 | EUR 13 million (SGD equiv.) | Under 10 months |

The DALP investment pays back within Year 2 under all scenarios, with savings accelerating in Years 3 to 5 as digital trade finance volumes grow.

---

## 10. Risk-Adjusted Value Analysis

### 10.1 Risk-Adjusted NPV

The following analysis adjusts the DALP value case for programme risk, applying conservative probability weights to each value component.

| Value Component | Base Case (EUR 5-Year) | Risk Weight | Risk-Adjusted Value (EUR) |
|---|---|---|---|
| LC examination savings | 45 million (SGD, 5-year) | 70% probability at base case volume | 31.5 million SGD equiv. |
| Settlement reconciliation savings | 31 million (SGD, 5-year) | 80% probability | 24.8 million SGD equiv. |
| MAS audit savings | 250,000 (SGD, 5-year) | 90% probability | 225,000 SGD equiv. |
| Dispute resolution savings | 4 million (SGD, 5-year) | 70% probability | 2.8 million SGD equiv. |
| New corridor revenue | 6 million (SGD, 5-year) | 50% probability | 3 million SGD equiv. |
| **Total Risk-Adjusted Value (5-year, SGD)** | | | **62.3 million SGD** |
| **DALP 5-Year Cost (SGD equiv. at 1.45)** | | | **SGD 4.3 million** |
| **Risk-Adjusted Net Value (5-year, SGD)** | | | **SGD 58 million** |

Even at conservative risk-adjusted probabilities (50-80%), the DALP value case generates a return well in excess of the platform investment.

### 10.2 Risk Sensitivity Analysis

**Volume Sensitivity:** If UOB's digital trade finance volumes grow at half the base case rate (programme ramp slower than expected), the 5-year value case is reduced proportionally. At 50% of base case volume, risk-adjusted net value is approximately SGD 29 million, still well above the SGD 4.3 million DALP cost. The breakeven volume is approximately 25 LCs/month (a very low threshold that would be achieved in the first months of operation).

**FX Sensitivity:** DALP's license is invoiced in EUR. If the SGD depreciates 10% against EUR over the 5-year term, the effective SGD cost of the DALP license increases by approximately SGD 340,000 over 5 years, which is immaterial relative to the SGD 58 million risk-adjusted net value.

**Regulatory Sensitivity:** If MAS introduces new regulatory requirements that require DALP compliance module changes, the configuration-driven compliance engine handles most changes without additional fees. Only structural smart contract changes (which would be driven by fundamental changes to the digital asset regulatory framework) would incur additional professional services fees, which are scoped and priced on a case-by-case basis.

---

## 11. Scenario Pricing

### 11.1 Baseline Scenario: Singapore APAC Hub

The baseline commercial scenario is UOB's Singapore digital trade finance hub covering the ASEAN trade corridors described in the technical proposal. This baseline is reflected in the licensing model above (Production plus Development, EUR 420,000/year).

### 11.2 Scenario A: Additional ASEAN Legal Entity (UOB Thailand)

If UOB Thailand deploys DALP to serve the Thai corridor independently (rather than as a corridor within UOB Singapore's deployment), a second production environment is required.

| Component | Additional Annual Cost (EUR) |
|---|---|
| UOB Thailand Production License | 300,000 |
| UOB Thailand Development License | 120,000 |
| Additional Implementation (Thailand-specific integration, MAS equivalent regulatory mapping for BOT) | 150,000 to 250,000 (one-time) |
| Additional Infrastructure (AWS ap-southeast-1 or equivalent Thailand-accessible region) | 50,000 to 85,000 |
| **Additional Annual Platform Cost (licenses only)** | **420,000** |

For a 5-entity ASEAN expansion (Singapore, Malaysia, Thailand, Indonesia, Vietnam as separate deployments), the platform license scales to EUR 2.1 million/year (5 x EUR 420,000). SettleMint offers a volume discount of 10% on the 4th and 5th environment when all environments are contracted simultaneously.

### 11.3 Scenario B: Greater China Correspondent Bank Network Integration

If UOB elects to integrate a network of 10+ Greater China correspondent banks into the DALP platform (as Model B API-connected participants), additional integration services are required:

| Component | Additional Cost (EUR) |
|---|---|
| Correspondent bank integration programme (10 banks, 2 weeks each) | 200,000 to 350,000 (one-time) |
| Additional API gateway capacity | Included in existing infrastructure estimate |
| Enhanced SWIFT MT-to-DALP translation for China-specific LC formats | 30,000 to 60,000 (one-time) |

The correspondent bank network integration does not increase the annual platform license; it is a one-time implementation fee.

### 11.4 Scenario C: Secondary Market Receivables Trading Platform

If UOB decides to add a secondary market trading function (enabling third-party banks or non-bank financial institutions to purchase invoice financing positions or trade receivables from UOB's DALP portfolio), an additional environment configuration and marketplace module would be required.

| Component | Additional Cost (EUR) |
|---|---|
| Marketplace module configuration and integration | 150,000 to 250,000 (one-time) |
| Additional environment for marketplace participants | EUR 300,000/year production (or shared with existing) |
| Legal/compliance scoping for secondary market | UOB's legal function |

---

## 12. Payment Terms and Milestones

### 12.1 Platform License

Annual, upfront. Year 1 invoice issued at contract execution; subsequent years at 12-month anniversaries. Payable within 30 days of invoice. All prices in EUR. Singapore GST treatment per Section 13.

### 12.2 Implementation Services: Milestone Payment Schedule

| Milestone | Payment % | Trigger Event | Estimated Timing |
|---|---|---|---|
| Contract Execution | 25% | Signed commercial agreement; purchase order issued | Week 0 |
| Phase 1 Gate | 20% | Architecture review document delivered; MAS TRM mapping approved by UOB IT Risk | Week 3 |
| Phase 3 Gate | 30% | GTB, SWIFT, FAST/PayNow, AML/KYB integrations operational in development environment | Week 11 |
| Phase 5 Go-Live | 20% | Production deployment confirmed; go-live validation completed | Week 20 |
| Phase 6 Close | 5% | Hypercare period completed; knowledge transfer sign-off | Week 24 |

**Payment Protection:** If SettleMint fails to deliver a Phase Gate milestone within 2 weeks of the scheduled date for reasons within SettleMint's control, the milestone payment is deferred until delivery. If SettleMint fails to deliver a milestone within 4 weeks of the scheduled date, UOB has the option to terminate the implementation services with a refund of all unearned milestone payments, retaining the right to continue with the platform license.

### 12.3 Support Fees

Annual, upfront, concurrent with platform license invoice. Payable within 30 days of invoice.

### 12.4 Infrastructure

Monthly in arrears. AWS billing report attached to each invoice as evidence. UOB's finance team receives read-only access to the AWS Cost Explorer for the DALP account to verify infrastructure costs independently.

### 12.5 Currency and Payment Method

All SettleMint invoices are issued in EUR. Payment via SWIFT bank transfer to SettleMint's Belgian bank account. SWIFT transfer fees are UOB's responsibility. No credit card or SGD-denominated payments.

---

## 13. Commercial Assumptions Register

| ID | Assumption | Category | Impact if Incorrect |
|---|---|---|---|
| CA-001 | Initial deployment scope: 1 Production environment plus 1 Development environment | Scope | Third environment requires additional license at standard rate |
| CA-002 | Minimum initial contract term: 36 months | Commercial | Shorter term may require pricing adjustment |
| CA-003 | All prices in EUR; SGD/EUR FX risk borne by UOB treasury | FX | No impact on SettleMint invoice amount; UOB's internal hedging is UOB's decision |
| CA-004 | Singapore GST (9%): SettleMint is a Belgian entity invoicing a Singapore entity for digital services. UOB to determine if reverse-charge GST applies under IRAS imported services rules. SettleMint does not collect Singapore GST. | Tax | UOB's tax team to confirm GST treatment; potential 9% addition to invoice amounts if reverse-charge applies to UOB as a GST-registered business |
| CA-005 | GTB API access, documentation, and sandbox provided in Phase 1, Week 1 | Integration | Delayed GTB access extends Phase 3 timeline; fixed-fee unchanged for delays within SettleMint's control; change request required for delays caused by UOB's infrastructure team |
| CA-006 | UOB provides SWIFT BIC and test environment access for SWIFT integration in Phase 3 | Integration | SWIFT access is UOB-managed; delay by UOB extends Phase 3 gate; fixed-fee unchanged |
| CA-007 | TradeTrust corridor coverage of initially targeted ASEAN corridors assessed in Phase 1 | Integration | Native BoL issuance is available as fallback for corridors without TradeTrust coverage |
| CA-008 | FAST/PayNow API access provided through UOB's existing payment infrastructure in Phase 3 | Integration | SettleMint does not connect to FAST/PayNow directly; UOB's payments team provides connectivity |
| CA-009 | Platform license is payable regardless of LC or trade volume achieved post-go-live | Volume | Volume ramp risk is UOB's commercial risk; license is not contingent on achieving volume milestones |
| CA-010 | Price hold: Year 1 to Year 3 fixed at EUR 420,000/year (platform license); Years 4 and 5 subject to CPI-linked review with 6 months notice | Pricing | CPI review applies CPI measured for Belgium (SettleMint's country of incorporation) to license fee; estimated maximum CPI adjustment 2-4% per year |
| CA-011 | Implementation fee is fixed-fee within defined scope; out-of-scope items require a change request with separate pricing | Scope | Change requests priced at EUR 1,500/day for SettleMint resources; approved before execution |
| CA-012 | Premium Support is contracted for minimum 12 months concurrent with production license | Support | Support contract co-terminates with production license; cannot be terminated independently during initial term |
| CA-013 | SettleMint's AWS infrastructure is dedicated to UOB's tenant; no cross-tenant data sharing | Data Isolation | Dedicated tenant is a contractual commitment; verified through architecture review in Phase 1 |
| CA-014 | Smart contract upgrades for regulatory compliance are included in the license; smart contract upgrades for new features are included in the license | License Scope | Bespoke custom features outside DALP's standard feature set would require additional professional services |
| CA-015 | UOB's procurement and contract execution process does not extend beyond 8 weeks from commercial proposal acceptance | Timeline | Programme start date shifts proportionally if contract execution is delayed; implementation fixed-fee is not affected by contract execution delays within 8 weeks |
| CA-016 | SettleMint invoices from Belgium; no Singapore establishment tax obligations apply to SettleMint for this engagement | Tax | UOB's tax and legal team to confirm; SettleMint provides Belgian VAT registration evidence |
| CA-017 | AWS infrastructure pricing is denominated in USD; EUR invoicing uses the USD/EUR rate at the time of AWS billing | FX | USD/EUR FX movement affects infrastructure pass-through cost; estimated infrastructure cost range accounts for reasonable FX variation |

---

## 14. Commercial Risk Register

| Risk ID | Risk Description | Likelihood | Financial Exposure | Mitigation |
|---|---|---|---|---|
| CR-001 | Programme scope expansion beyond Phase 1 defined scope, requiring change requests | Medium | EUR 50,000 to 150,000 additional professional services | Fixed-fee model limits base scope risk; change requests require UOB approval before execution |
| CR-002 | Platform license renewal negotiation in Year 4 results in higher-than-CPI price increase request | Low | EUR 20,000 to 50,000/year incremental | Price hold and CPI cap terms in contract (Section 16) limit maximum increase |
| CR-003 | SGD/EUR exchange rate deterioration increases UOB's effective license cost | Low | SGD 50,000 to 200,000/year at extreme rate movements | UOB treasury hedging; EUR invoicing is fixed; FX risk is UOB's treasury management scope |
| CR-004 | SettleMint financial difficulty impacts platform support continuity | Very Low | High (platform continuity risk) | Contractual source code escrow; blockchain network runs on UOB-accessible nodes; governance keys held by UOB; smart contracts accessible post-termination |
| CR-005 | AWS Singapore pricing increases above estimate | Low | USD 10,000 to 30,000/year | Infrastructure costs are pass-through at cost; UOB has AWS Cost Explorer access to verify; no SettleMint margin on infrastructure |
| CR-006 | Singapore GST ruling imposes retroactive GST liability on SettleMint invoices | Low | 9% of license fees (EUR 37,800/year at baseline) | UOB tax team clarifies before contract execution; IRAS ruling obtained if required |
| CR-007 | Implementation programme delayed by UOB-side dependencies (GTB access, SWIFT credentials) | Medium | Programme delay risk only; fixed-fee unchanged | RAID register tracks dependencies; timeline extension agreed if delay is caused by UOB |
| CR-008 | Volume ramp slower than projected, reducing cost-per-transaction ROI | Medium | No financial impact on DALP license; ROI impact for UOB | Volume-insensitive pricing means UOB's license cost is same at low or high volumes; ROI case is based on conservative volume assumptions |
| CR-009 | Regulatory change requires fundamental smart contract restructuring (not configuration change) | Low | EUR 100,000 to 300,000 additional professional services | Configuration-driven compliance engine handles most regulatory changes; structural changes priced on case-by-case basis |
| CR-010 | Correspondent bank participation rates lower than planned, reducing corridor coverage | Medium | No financial impact on DALP license; coverage impact for UOB | Model A (SWIFT-only) supports all correspondents without API participation; platform coverage not dependent on correspondent upgrade |

---

## 15. Exit and Transition Terms

### 15.1 Termination Notice

Minimum 90 days written notice for non-renewal at contract expiry. Minimum 6 months written notice for early termination (with early termination provisions as defined in the master services agreement).

### 15.2 Data Portability

UOB retains full ownership of all trade finance data. On termination or expiry, SettleMint provides:

**Structured Data Export (within 30 days):**
- Complete export of all LC, BoL, invoice, and receivable transaction records in JSON and CSV formats (structured per the DALP Data Dictionary)
- Export of all counterparty Identity Registry data, compliance event records, and screening decision logs
- Trade document metadata and document hash records for TradeTrust verification continuity
- Complete audit trail export covering all 7 years of retained data (or shorter if within 7 years of first transaction)
- Operational configuration export: all compliance module configurations, RBAC roles, maker-checker configurations, integration parameters

**Read-Only Platform Access (90 days):**
UOB retains read-only access to the DALP platform for 90 days after termination. During this period, UOB's team can complete ad hoc data exports, verify export completeness, and extract any additional records needed for regulatory or litigation purposes.

### 15.3 Blockchain Continuity

Smart contracts deployed on UOB's private Besu network remain accessible after contract termination. UOB owns and operates at least one Besu validator node as part of the programme; this node gives UOB independent access to the blockchain state and transaction history even if SettleMint's nodes are decommissioned. The on-chain record is immutable and does not require SettleMint's platform to remain accessible.

### 15.4 Key Management and Transition

Governance keys held by UOB under the bring-your-own-custody model are fully accessible to UOB without SettleMint involvement. Key Guardian signing keys provisioned to SettleMint's managed HSM service are migrated to UOB's independent HSM or key management system during the 90-day transition period. SettleMint provides key export procedures and supports the migration to UOB's alternative key management infrastructure.

### 15.5 Transition Support

SettleMint provides 90 days of transition support (included in the notice period):
- Read-only platform access for data extraction
- Assistance with active trade finance position resolution and transition
- Support for correspondent bank notification and connectivity transition
- Knowledge transfer documentation for any incoming provider
- Participation in up to 4 transition planning meetings with UOB's technology and operations teams

### 15.6 Intellectual Property

SettleMint retains the DALP platform IP. UOB retains: all trade finance data; all configurations and integration specifications produced during the engagement; all runbooks and operational documentation; the smart contracts deployed on UOB's Besu network (these are deployed artifacts, not the DALP platform source code); and the integration code developed specifically for UOB's GTB, SWIFT, FAST/PayNow, and AML system connections (which connects to UOB's systems, not to DALP's internal systems, and is therefore UOB's property).

---

## 16. Multi-Year Pricing Protection Terms

### 16.1 Initial Term Price Hold

Years 1 to 3 (initial contract term): Platform license price is fixed at EUR 420,000/year (EUR 300,000 Production plus EUR 120,000 Development). No price escalation applies during the initial term.

### 16.2 Renewal Term Price Adjustment

Years 4 and 5 (renewal term): Platform license price is subject to a CPI-linked adjustment, calculated as follows:

- Benchmark: Belgian Consumer Price Index (CPI) as published by Statbel
- Application: Year 4 license = Year 3 license x (1 + Belgian CPI rate for the preceding 12 months)
- Cap: Price increase capped at 5% per year regardless of CPI
- Floor: No price reduction regardless of CPI deflation
- Notice: SettleMint provides 6 months notice of the Year 4 price before the invoice is issued

**Illustrative Renewal Pricing:**

| Year | Belgian CPI (assumed) | License Price (EUR) |
|---|---|---|
| Year 1 to 3 | Fixed | 420,000 |
| Year 4 | 3.5% CPI | 434,700 |
| Year 5 | 3.0% CPI | 447,741 |

### 16.3 Additional Environment Pricing Lock

For additional environments contracted within the initial 36-month term (e.g., UOB Thailand or UOB Malaysia), the standard environment rate at the time of contracting is locked for the life of the agreement (same 36-month term, same CPI adjustment mechanism for renewals).

### 16.4 Support Fee Adjustment

Premium Support annual fee is subject to the same CPI-linked adjustment mechanism as the platform license, effective from Year 4. Support fee adjustment is capped at 5% per year.

---

## 17. Value Justification

### 17.1 Strategic Value: First-Mover Advantage in Singapore Digital Trade Finance

UOB's decision to deploy DALP positions UOB as a first-mover in Singapore's institutional digital trade finance market. Singapore's TradeTrust initiative, MAS's Project Guardian findings on trade finance tokenisation, and the Monetary Authority's direction toward digital-first financial market infrastructure create a market opportunity where early deployment of a compliant, interoperable platform provides durable competitive advantage.

The first-mover advantages are material: correspondent banks prefer to establish digital trade finance relationships with the bank that has demonstrated operational digital infrastructure; ASEAN corporate clients that migrate to digital trade finance instruments prefer a bank that can process digital LCs and BoLs from day one; regulatory goodwill from MAS for proactive digital trade finance infrastructure investment creates a constructive relationship in an environment where MAS actively monitors Singapore banks' digital finance progress.

DALP's 19-week deployment timeline is the enabler of first-mover advantage. A custom build (24-36 months) would deliver UOB's digital trade finance capability 18-24 months later, by which point other Singapore banks may have established digital trade finance relationships with the same ASEAN corridor counterparties.

### 17.2 Operational Value: Risk Reduction through Atomic Settlement

UOB's current trade finance operations carry settlement risk at every LC payment event and BoL negotiation: the period between document acceptance and payment execution (typically 1-3 banking days) is a period of unhedged counterparty exposure. DALP's XvP atomic settlement eliminates this exposure: payment and document transfer complete simultaneously or both revert.

For a trade finance portfolio of SGD 1 billion annual volume, the settlement risk reduction is quantifiable. Assuming an average settlement period of 2 banking days and an average counterparty default probability of 0.01% per settlement event, DALP's XvP settlement reduces UOB's expected settlement loss exposure by SGD 2 million/year at this volume. This credit risk reduction is a Basel III capital benefit: reduced counterparty exposure on trade finance instruments reduces UOB's risk-weighted assets, with a corresponding reduction in capital requirements.

### 17.3 Regulatory Value: MAS Examination Preparedness

MAS IT examinations of Singapore banks' digital asset systems are increasingly rigorous, reflecting MAS's TRM Guidelines and the addition of MAS Notice 644 Cyber Hygiene requirements. Banks that cannot produce coherent, structured evidence of their digital asset system controls face examination findings that create remediation obligations and reputational risk.

DALP's pre-built MAS TRM and Notice 644 evidence architecture converts examination preparation from a multi-week manual exercise to an automated export process. Across a 5-year programme with 2-3 MAS examinations, this saves UOB approximately SGD 400,000 to 600,000 in examination preparation costs and, more importantly, reduces the risk of examination findings by providing structured, verifiable evidence of every control.

---

### 17.4 Commercial Value: Reference Programme for ASEAN Expansion

UOB's Singapore digital trade finance deployment becomes a replicable template for ASEAN market expansion. Once the Singapore programme is operational, adding a new ASEAN corridor or a new UOB legal entity is a configuration and integration exercise, not a new platform build. The configuration, compliance module parameters, RBAC model, and integration architecture developed for UOB Singapore are reused (with jurisdiction-specific adaptations) for UOB Malaysia, UOB Thailand, and other ASEAN entities.

This template reuse dramatically reduces the per-entity cost of ASEAN expansion. The EUR 420,000/year platform license for a new entity includes all the capability developed for Singapore; the implementation for the new entity requires 8-12 weeks rather than 19 weeks (because the Singapore template provides the majority of the configuration). The total cost of a 5-entity ASEAN DALP footprint is approximately EUR 2.1 million/year in platform licenses plus a one-time implementation cost for each new entity, compared to EUR 6-11 million per entity for custom builds, making the total ASEAN expansion cost an order of magnitude lower with DALP than with custom development.

### 17.4a Commercial Programme Governance

SettleMint's commercial engagement with UOB is governed by a defined programme governance structure that ensures commercial commitments are met and issues are escalated appropriately:

**Commercial Account Manager:** A named senior account manager is responsible for the commercial relationship with UOB throughout the programme. The account manager participates in the monthly technical business review and is UOB's primary point of contact for commercial issues (invoice queries, scope change requests, renewal discussions).

**Commercial Review Cadence:** Monthly technical business reviews include a commercial standing item: invoice confirmation, infrastructure cost review, any pending change requests, upcoming milestone payment forecasts, and any commercial issues requiring escalation. Quarterly executive reviews include a strategic commercial review covering programme ROI, volume trajectory, and upcoming renewal or expansion planning.

**Change Request Process:** When a requested change is outside the fixed-fee implementation scope, SettleMint's account manager issues a Change Request document within 3 business days of receiving the request. The Change Request includes: change description, technical approach summary, estimated effort, cost (at EUR 1,500/day for SettleMint resources), and timeline impact. UOB's programme sponsor approves or declines the Change Request before any work begins. Approved Change Requests are invoiced at the Phase 5 (Go-Live) milestone for changes completing within the implementation period, or as a separate invoice for post-go-live changes.

### 17.5 SGD/EUR Foreign Exchange Treatment

SettleMint invoices exclusively in EUR. The following commercial framework applies to SGD/EUR exchange rate management:

**Invoice Currency:** All SettleMint invoices are issued in EUR. The EUR amount is fixed; the SGD equivalent at UOB's treasury rate on the invoice payment date determines the SGD cost.

**Hedging Responsibility:** UOB's treasury is responsible for managing SGD/EUR FX exposure. SettleMint does not provide FX hedging services or fix a SGD equivalent price. UOB's treasury team may choose to hedge the EUR license obligations through forward contracts, currency options, or natural hedging from EUR-denominated revenue or assets.

**Budget Planning Rate:** For UOB's internal budget planning purposes, SettleMint recommends using the 12-month forward EUR/SGD rate published by UOB's treasury as the planning assumption. The DALP commercial team is available to discuss FX assumption alignment for multi-year budget planning.

**Indicative SGD Equivalents (at 1.45 SGD/EUR planning rate):**

| Component | EUR | SGD (indicative at 1.45) |
|---|---|---|
| Production License | 300,000 | 435,000 |
| Development License | 120,000 | 174,000 |
| Annual Platform License | 420,000 | 609,000 |
| 5-Year Platform License | 2,100,000 | 3,045,000 |

*SGD equivalents are indicative only for budget planning. Actual SGD cost depends on the EUR/SGD rate at the time of payment.*

### 17.6 Singapore GST Treatment

SettleMint NV is a Belgian company registered for Belgian VAT. SettleMint is not registered for Singapore GST and does not collect Singapore GST on invoices issued to Singapore-registered entities.

Under Singapore's Goods and Services Tax Act, imported digital services (B2B) may be subject to reverse-charge GST when supplied by an overseas supplier to a GST-registered Singapore business. The applicability of reverse-charge GST to SettleMint's platform license and professional services fees depends on the classification of these services under the IRAS imported services rules.

**UOB's Responsibility:** UOB's tax team should confirm the GST treatment of SettleMint's fees with IRAS or a qualified Singapore tax advisor before contract execution. If reverse-charge GST applies, UOB (as the GST-registered recipient) would self-assess and remit the GST to IRAS directly. SettleMint's EUR invoice amounts would not change.

**Estimated GST Exposure (if applicable):** At the current Singapore GST rate of 9%, the annual reverse-charge GST on the platform license alone would be EUR 37,800 (9% of EUR 420,000). UOB should confirm whether the input tax credit mechanism is available for these services, which would reduce the net GST cost.

SettleMint is available to provide IRAS with any documentation required to support the GST classification analysis, including the Belgian VAT registration certificate, service description documentation, and confirmation that services are delivered remotely from Belgium without any Singapore establishment. SettleMint has previously provided equivalent documentation to regulatory authorities in other jurisdictions and maintains a standard vendor compliance pack for tax classification purposes. UOB's procurement team should request this pack from SettleMint's commercial team at contract negotiation stage so that the GST determination is in place before the first invoice is issued. A delayed GST determination creates a risk of retroactive GST liability for UOB; early resolution during the procurement phase eliminates this risk.

---

*All prices exclude applicable taxes and GST. Platform licenses are payable annually and upfront. This proposal is valid for 90 days from the date above. Document Version 2.0 Final. SettleMint Confidential.*
