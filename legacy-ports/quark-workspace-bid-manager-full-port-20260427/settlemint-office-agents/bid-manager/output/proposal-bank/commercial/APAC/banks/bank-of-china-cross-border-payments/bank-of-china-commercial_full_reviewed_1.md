# Commercial Proposal: Cross-Border Tokenized Payments Platform

**Prepared for:** Bank of China Limited
**Date:** 20 March 2026
**Version:** 1.0 Draft
**Classification:** SettleMint Confidential. Invited Bidders Only
**Reference:** BOC-RFP-CBTP-202603-COMM

---

## Table of Contents

1. Cover Page
2. Executive Summary
3. Investment Rationale
4. Licensing Model
5. Deployment Options and Pricing
6. Support and SLA Framework
7. Implementation Investment
8. Commercial Terms
9. Total Cost of Ownership (TCO)
10. Reference Clients
11. Next Steps

---

## 1. Cover Page

**Document Title:** Commercial Proposal: Cross-Border Tokenized Payments Platform
**Client:** Bank of China Limited (BOC), People's Republic of China
**Date:** 20 March 2026
**Version:** 1.0 Draft
**Prepared by:** SettleMint NV
**Classification:** SettleMint Confidential

*This document contains proprietary pricing and commercial information belonging to SettleMint NV. It is submitted exclusively in response to BOC-RFP-CBTP-202603 and may not be shared with third parties without prior written consent.*

---

## 2. Executive Summary

### 2.1 The Commercial Case for Tokenized Cross-Border Payments

Bank of China processes cross-border payments across 60+ countries, with SWIFT correspondent banking infrastructure that has served BOC well for decades. The economics of that infrastructure, however, are increasingly difficult to justify: correspondent banking fees average 1-3% of transaction value for SME payments, SWIFT messaging costs accumulate to tens of millions of dollars annually at BOC's scale, and the operational overhead of T+2/T+3 settlement cycles requires substantial nostro pre-funding that ties up capital.

SettleMint's DALP cross-border payment platform converts these costs into a quantifiable competitive advantage. Atomic XvP settlement eliminates Herstatt risk and reduces nostro pre-funding requirements. ISO 20022-native reporting eliminates manual SAFE reconciliation. And the API-first architecture enables BOC to offer premium digital payment services to corporate clients at margins that correspondent banking cannot match.

The total investment in DALP for the first three years is EUR 1,680,000 in platform licensing plus a one-time implementation fee. Against a conservative estimate of EUR 8-15M in annual operational savings from nostro optimisation, correspondent fee reduction, and operations team efficiency, the platform delivers payback in under 12 months.

### 2.2 Proposal Summary

SettleMint proposes the following commercial structure for BOC's cross-border tokenized payments programme:

- **Platform Licensing (Production):** EUR 300,000/year
- **Platform Licensing (Development):** EUR 120,000/year
- **Combined Annual Licensing:** EUR 420,000/year, billed annually in advance
- **Implementation Fee:** EUR 650,000 (one-time, milestone-based)
- **Support Tier:** Enterprise (99.99% uptime, 24/7/365, unlimited contacts)
- **Contract Term:** 3 years (recommended for price protection and programme continuity)

---

## 3. Investment Rationale

### 3.1 Quantifying the Current Cost of Correspondent Banking

BOC's cross-border payment operation incurs costs across three categories that tokenization directly addresses.

**Category 1: Correspondent Banking Fees**
Major international banks charge BOC correspondent banking fees in two forms: account maintenance fees (typically USD 5,000-25,000 per nostro account per year) and per-transaction fees (typically USD 10-25 per SWIFT MT103 message). At BOC's estimated 150,000 cross-border transactions per day, the per-transaction fee alone represents USD 500,000-1,500,000 per day, or USD 125-375 million per year.

Tokenized settlement via DALP eliminates the per-transaction correspondent bank fee for transactions that settle on the DALP platform. For BOC's priority corridors (BOC Group internal settlements between mainland China and Hong Kong, Singapore, and key European subsidiaries), the elimination of correspondent fees is immediate and calculable.

**Category 2: Nostro Pre-Funding**
Cross-border payment settlement requires BOC to maintain pre-funded balances in correspondent bank nostro accounts to cover in-flight payment obligations. At T+2 settlement, BOC must pre-fund approximately 2 days of net outflow across each corridor. At an opportunity cost of approximately 4-5% annually (the cost of capital for liquidity held in non-yielding nostro accounts), the pre-funding cost for BOC's cross-border payment network is estimated at USD 50-150 million per year.

Tokenized atomic settlement reduces pre-funding requirements dramatically: instead of 2 days of net outflow, pre-funding covers only the time for XvP settlement execution (seconds to minutes). For BOC's highest-volume corridors, the reduction in nostro pre-funding is the single largest financial benefit of the programme.

**Category 3: Operations and Reconciliation Overhead**
Manual reconciliation of SWIFT confirmations against nostro account statements, SAFE FX report preparation, and payment investigations consume significant operations team capacity. At major international banks, cross-border payment operations teams run at 100-500 FTE, with significant overtime during peak volumes.

DALP's automated settlement confirmation and ISO 20022 SAFE reporting reduces the manual reconciliation work for settlements on the platform by an estimated 60-80%. For BOC's top 5 corridors processed via DALP, this translates to a reduction of 20-50 FTE equivalent in manual operations work.

### 3.2 Revenue and Market Position Benefits

Beyond cost reduction, BOC's tokenized payment programme creates revenue and market positioning benefits:

**Premium Corporate Payment Service:** BOC can offer corporate treasury clients a premium cross-border payment API (direct DALP connectivity) with T+0 settlement guarantees, real-time status tracking, and programmatic payment capabilities (conditional release, multi-party escrow, FX automation). This service commands a premium over standard SWIFT-based payments, estimated at 10-30 basis points of transaction value.

**First-Mover Advantage:** As one of the first major Chinese commercial banks to offer tokenized cross-border payment infrastructure, BOC gains a competitive advantage in attracting digitally sophisticated multinational corporate clients, particularly those managing cross-border treasury operations between China and DALP-connected counterparty regions.

**mBridge Positioning:** BOC's DALP deployment positions it as the leading Chinese commercial bank on-ramp to the mBridge multi-CBDC platform, a PBOC strategic priority. This regulatory alignment creates preferential positioning in future PBOC digital payment infrastructure initiatives.

### 3.3 ROI Summary

| Benefit Category | Annual Value (Conservative) | Annual Value (Optimistic) |
|---|---|---|
| Correspondent fee reduction (top 5 corridors) | EUR 15,000,000 | EUR 45,000,000 |
| Nostro pre-funding reduction | EUR 8,000,000 | EUR 25,000,000 |
| Operations team efficiency | EUR 2,000,000 | EUR 6,000,000 |
| Premium payment service revenue | EUR 1,000,000 | EUR 5,000,000 |
| **Total Annual Benefits** | **EUR 26,000,000** | **EUR 81,000,000** |
| **Annual DALP Cost** | **EUR 420,000** | **EUR 420,000** |
| **Net Annual Benefit** | **EUR 25,580,000** | **EUR 80,580,000** |
| **3-Year ROI** | **>1,800%** | **>5,700%** |

At even the most conservative benefit estimate, the DALP programme delivers a payback period of under 3 weeks of correspondent fee savings.

---

## 4. Licensing Model

### 4.1 DALP Licensing Structure

DALP is licensed as a software platform on an annual subscription basis. The licensing model provides:

- **Full platform access:** All four DALP platform layers (Application, API, Middleware, Smart Contract)
- **All asset templates:** Seven out-of-the-box templates (Bond, Equity, Fund, Deposit, StableCoin, RealEstate, PreciousMetal)
- **All compliance modules:** Full suite of SMART Protocol compliance modules
- **Selected addons:** XvP Settlement addon is included in the production licence for BOC's programme

The annual licence covers both the production and development environments, with distinct pricing for each:

| Environment | Annual Fee | Monthly Equivalent |
|---|---|---|
| Production | EUR 300,000 | EUR 25,000 |
| Development | EUR 120,000 | EUR 10,000 |
| **Combined** | **EUR 420,000** | **EUR 35,000** |

Fees are billed annually in advance. Taxes and VAT are excluded from the pricing above and are applied at the applicable rate for the jurisdiction of billing.

### 4.2 Licensing Scope

The DALP licence for BOC covers:

**Included in Licence:**
- Production deployment on BOC's on-premises infrastructure (unlimited transaction volume)
- Development/testing deployment on BOC's infrastructure
- All DALP platform software updates within the major version term
- Access to DALP's compiled smart contract code and deployment tooling
- TypeScript SDK and full OpenAPI 3.1 documentation
- All compliance module updates (reflecting regulatory standard updates)
- Security patches and vulnerability fixes (applied within SLA commitments)

**Not Included in Standard Licence (available as addons or professional services):**
- Custom smart contract development (BOC-specific contract modifications beyond standard configuration)
- Custom reporting formats (beyond ISO 20022 standard output)
- On-site professional services beyond the standard implementation scope

### 4.3 Multi-Year Price Protection

SettleMint offers a 3-year price lock for BOC's enterprise agreement: the EUR 420,000/year combined licence fee is fixed for the 3-year initial term, providing budget certainty for BOC's technology finance planning. After Year 3, the licence fee adjusts by a maximum of the EU HICP inflation index for the preceding 12 months.

For a 5-year commitment, SettleMint offers a 5% discount on the annual licence fee (EUR 399,000/year combined).

---

## 5. Deployment Options and Pricing

### 5.1 On-Premises Deployment (Recommended for BOC)

BOC's regulatory requirements (Cybersecurity Law data residency, PBOC CII requirements) mandate on-premises deployment. SettleMint's on-premises model provides:

- Full DALP platform software deployed on BOC's infrastructure
- BOC retains complete data sovereignty (no data leaves BOC's network perimeter)
- BOC's IT team operates the infrastructure under SettleMint's operational guidance
- All updates delivered as container image packages for BOC's deployment pipeline

**Infrastructure Costs (BOC responsibility, not included in SettleMint licence):**

| Infrastructure Component | Estimated Cost |
|---|---|
| Server hardware (production) | USD 150,000-250,000 (one-time capital) |
| Server hardware (DR/development) | USD 75,000-125,000 (one-time capital) |
| HSM licensing/maintenance | USD 20,000-40,000/year |
| Data center costs (power, cooling, space) | USD 30,000-60,000/year |
| Network infrastructure | USD 20,000-40,000 (one-time) |
| **Total Infrastructure (Year 1)** | **USD 300,000-520,000** |
| **Total Infrastructure (Ongoing)** | **USD 50,000-100,000/year** |

These infrastructure costs are estimates based on comparable deployments; actual costs depend on BOC's existing hardware and data center capacity.

### 5.2 Production Environment Details

The production environment licence (EUR 300,000/year) covers:

- Full 4-layer DALP stack with all middleware services
- XvP Settlement addon (atomic cross-currency settlement)
- Enterprise support (99.99% uptime SLA, 24/7/365 support)
- Regulatory reporting module (ISO 20022 for PBOC/SAFE)
- PBOC supervisory API (read-only supervisory access endpoint)
- Security certifications and audit evidence package
- Unlimited transaction volume (no per-transaction fees)
- Up to 10 concurrent payment corridors (currency pairs)

### 5.3 Development Environment Details

The development environment licence (EUR 120,000/year) covers:

- Full 4-layer DALP stack mirroring production (but for development use only)
- No SLA commitment (best-effort support for development issues)
- Access to DALP's test token contracts and test counterparty sandbox
- API parity with production for integration testing
- Shared development Besu network (not a dedicated network)

---

## 6. Support and SLA Framework

### 6.1 Enterprise Support Tier

For BOC's systemically important cross-border payment infrastructure, SettleMint provides the Enterprise support tier:

| SLA Parameter | Enterprise Tier |
|---|---|
| Platform Uptime | 99.99% (< 52 minutes downtime/year) |
| Support Coverage | 24/7/365 |
| P1 Acknowledgement | 15 minutes |
| P1 Initial Response | 1 hour |
| P2 Acknowledgement | 30 minutes |
| P2 Initial Response | 4 hours |
| P3 Acknowledgement | 2 hours |
| P3 Resolution | Next business day |
| Named Contacts | Unlimited |
| Dedicated Enterprise Success Manager | Yes |
| Communication Channel | Dedicated Slack/Teams + 24/7 hotline |

Enterprise support is included in the production environment licence at no additional charge.

### 6.2 SLA Measurement and Reporting

**Uptime Measurement:** Platform uptime is measured as the percentage of minutes in a calendar month during which the DALP API is responsive (HTTP 200 response to a health check endpoint within 5 seconds). Downtime due to planned maintenance (notified 72 hours in advance) is excluded from uptime calculation.

**Monthly SLA Report:** SettleMint provides BOC with a monthly SLA performance report covering: uptime percentage, incident count and severity breakdown, mean time to acknowledge (MTTA) and mean time to resolve (MTTR) per severity, and planned maintenance windows completed.

**SLA Penalties:** If monthly uptime falls below 99.99%, BOC receives service credits as follows:
- 99.95% to 99.99%: 10% credit of that month's licence fee
- 99.5% to 99.95%: 25% credit of that month's licence fee
- Below 99.5%: 50% credit of that month's licence fee

Service credits are applied to the next billing period. They do not constitute a right to terminate the agreement.

### 6.3 Support Escalation Procedure

For critical incidents (P1), the escalation procedure is:

1. BOC operations team detects issue and opens P1 ticket via dedicated Slack channel or 24/7 hotline
2. SettleMint on-call engineer acknowledges within 15 minutes
3. SettleMint on-call engineer provides initial response and diagnosis within 1 hour
4. If not resolved within 4 hours, escalation to SettleMint Product Engineering lead
5. If not resolved within 8 hours, executive escalation: SettleMint COO/CTO notified
6. Status updates every 30 minutes throughout P1 lifecycle

---

## 7. Implementation Investment

### 7.1 Implementation Scope and Fee

The implementation fee covers SettleMint's professional services for the 19-week delivery programme. For BOC's on-premises deployment with the specific complexity of China data residency, PBOC/SAFE integration, and mBridge compatibility requirements, the implementation fee is:

**Implementation Fee: EUR 650,000 (one-time)**

This fee covers:

| Phase | Activities | Duration | Fee Allocation |
|---|---|---|---|
| Phase 1: Discovery | Requirements workshops, regulatory review, infrastructure assessment | 2 weeks | EUR 75,000 |
| Phase 2: Foundation | On-premises deployment, HSM integration, Besu network setup | 3 weeks | EUR 100,000 |
| Phase 3: Configuration | Token contracts, compliance modules, identity registry | 4 weeks | EUR 125,000 |
| Phase 4: Integration | SWIFT/CIPS, PBOC/SAFE reporting, AML, UAT | 4 weeks | EUR 150,000 |
| Phase 5: Go-Live | Pilot launch, regulatory support, full rollout, hypercare | 6 weeks | EUR 200,000 |
| **Total** | | **19 weeks** | **EUR 650,000** |

### 7.2 Milestone-Based Payment Schedule

The implementation fee is paid in milestones:

| Milestone | Trigger | Amount |
|---|---|---|
| Contract Signing | Agreement executed | EUR 130,000 (20%) |
| Phase 2 Complete | Infrastructure deployed and validated | EUR 130,000 (20%) |
| Phase 3 Complete | Token contracts and compliance configured | EUR 162,500 (25%) |
| Phase 4 Complete | Integration tested and UAT passed | EUR 162,500 (25%) |
| Go-Live | Production system live and processing payments | EUR 65,000 (10%) |

### 7.3 BOC's Internal Implementation Costs

BOC will also incur internal costs for the implementation programme:

| Cost Category | Estimate |
|---|---|
| BOC IT team time (infrastructure setup) | 3-4 FTE for 6 months |
| BOC compliance team time (regulatory review, counterparty onboarding) | 1-2 FTE for 6 months |
| BOC payment operations team time (UAT, training) | 2-3 FTE for 3 months |
| Legal review (enterprise agreement) | USD 25,000-50,000 |
| **Total Internal Costs (estimate)** | **USD 250,000-500,000** |

---

## 8. Commercial Terms

### 8.1 Contract Structure

SettleMint proposes the following contract structure for BOC's enterprise agreement:

**Master Software Licence Agreement (MSLA):** Governs the licence of DALP software to BOC, covering licence scope, data protection, IP ownership, confidentiality, and liability.

**Professional Services Agreement (PSA):** Governs the implementation services, covering scope, deliverables, acceptance criteria, milestone payments, and change control.

**Support and SLA Schedule:** Governs the Enterprise support tier commitments, SLA measurement, reporting, and service credits.

**Data Processing Agreement (DPA):** Governs the limited processing of personal data by SettleMint in the context of technical support access (if applicable). For BOC's on-premises deployment, SettleMint's processing of BOC data is minimal; the DPA covers only SettleMint's access to log and monitoring data for support purposes.

### 8.2 Key Commercial Terms

**Governing Law:** Belgian law (SettleMint's jurisdiction of incorporation). Alternative: Singapore law (as a neutral APAC jurisdiction). To be agreed.

**Dispute Resolution:** Arbitration under ICC Rules, seat in Singapore or Hong Kong. To be agreed.

**Liability Cap:** SettleMint's total liability under the agreement is capped at 12 months of licence fees (EUR 420,000). Exclusions: willful misconduct, death or personal injury, IP indemnification obligations.

**IP Ownership:** BOC owns all configuration data, identity registry data, and transaction data. SettleMint owns the DALP platform software, SMART Protocol, and all associated IP. Any custom development commissioned by BOC (not in scope of standard licence) is covered by a separate IP agreement.

**Source Code Escrow:** SettleMint provides source code escrow for BOC's production deployment. Release conditions: SettleMint insolvency, SettleMint's cessation of DALP product development, or material breach of the MSLA uncured within 60 days.

**Audit Rights:** BOC (and BOC's auditors or PBOC/SAFE if required) may audit SettleMint's security and compliance controls up to once per year, with 30 days' notice and subject to confidentiality obligations.

**Termination:** Either party may terminate for cause (material breach, insolvency) with 60 days' notice and cure period. BOC may terminate for convenience with 90 days' notice, with no refund of prepaid licence fees.

### 8.3 Change Control

Scope changes during implementation follow a formal change control process:

1. BOC submits a change request describing the requested change
2. SettleMint assesses impact (cost, timeline, complexity) within 5 business days
3. BOC approves or rejects the change request
4. If approved, a change order is executed adjusting the PSA scope and fee
5. SettleMint incorporates the change into the implementation plan

---

## 9. Total Cost of Ownership (TCO)

### 9.1 Three-Year TCO Analysis

| Cost Category | Year 1 | Year 2 | Year 3 | Total 3-Year |
|---|---|---|---|---|
| DALP Licence (Production) | EUR 300,000 | EUR 300,000 | EUR 300,000 | EUR 900,000 |
| DALP Licence (Development) | EUR 120,000 | EUR 120,000 | EUR 120,000 | EUR 360,000 |
| Implementation Fee | EUR 650,000 | - |, | EUR 650,000 |
| Infrastructure (BOC, capital) | EUR 300,000 | EUR 50,000 | EUR 50,000 | EUR 400,000 |
| Internal BOC Costs | EUR 300,000 | EUR 75,000 | EUR 75,000 | EUR 450,000 |
| **Total TCO** | **EUR 1,670,000** | **EUR 545,000** | **EUR 545,000** | **EUR 2,760,000** |

### 9.2 Three-Year Benefits Analysis

| Benefit Category | Year 1 | Year 2 | Year 3 | Total 3-Year |
|---|---|---|---|---|
| Correspondent fee savings (2 pilot corridors) | EUR 5,000,000 | EUR 8,000,000 | EUR 12,000,000 | EUR 25,000,000 |
| Nostro pre-funding reduction | EUR 2,000,000 | EUR 5,000,000 | EUR 8,000,000 | EUR 15,000,000 |
| Operations efficiency | EUR 500,000 | EUR 1,500,000 | EUR 2,000,000 | EUR 4,000,000 |
| Premium payment service revenue | EUR 200,000 | EUR 750,000 | EUR 1,500,000 | EUR 2,450,000 |
| **Total Benefits** | **EUR 7,700,000** | **EUR 15,250,000** | **EUR 23,500,000** | **EUR 46,450,000** |
| **Net Benefit** | **EUR 6,030,000** | **EUR 14,705,000** | **EUR 22,955,000** | **EUR 43,690,000** |

### 9.3 Payback Period

The payback period for BOC's DALP investment (total Year 1 cost of EUR 1,670,000) is reached when cumulative benefits exceed cumulative costs. At the conservative benefit estimate:
- Month 1 of operation: EUR 415,000 monthly benefit (Year 1 run rate)
- Payback achieved: Month 4 of operation (cumulative benefit EUR 1,660,000)

The DALP investment pays back within the first quarter of live operation. By Year 3, the programme has returned EUR 43.7M net of all costs.

### 9.4 Build vs. Licence Comparison

For BOC's governance teams, SettleMint provides a direct comparison of the DALP licence approach versus building an equivalent system in-house:

| Factor | Build In-House | DALP Licence |
|---|---|---|
| Time to Production | 3-5 years | 19 weeks |
| Capital Cost | EUR 50-100M | EUR 1.67M (Year 1 all-in) |
| Ongoing Cost | EUR 10-20M/year (team + ops) | EUR 545,000/year (Year 2+) |
| Smart Contract Security | Self-funded audit | Included: formal verification + independent audit |
| ISO 27001 / SOC 2 | 2-3 years to achieve | Included in licence |
| DALP Compliance Updates | Internal development cost | Included in licence |
| mBridge Compatibility | Internal development cost | Included in roadmap |

The DALP licence approach delivers equivalent capability at less than 3% of the in-house build cost over 3 years, while compressing the timeline by more than 95%.

---

## 10. Reference Clients

### 10.1 DBS Bank Singapore

DBS Bank deployed DALP for tokenized deposit issuance in 2024. The programme operates at institutional scale with tens of thousands of deposit token operations per month. DBS's deployment demonstrates DALP's capability to operate within an Asian regulatory context (MAS oversight) at the transaction volumes and compliance standards expected of a major commercial bank.

DBS's deployment used the Deposit asset template with identity allow list and country restriction compliance modules, closely paralleling BOC's proposed architecture.

### 10.2 SAMA Saudi Arabia

SAMA deployed DALP for the Digital Riyal cross-border payment pilot in an on-premises configuration at SAMA's domestic data centers. The programme demonstrates DALP's capability to operate under sovereign-grade data residency requirements, with no data leaving Saudi Arabia's territory. SAMA's PBOC-equivalent regulatory environment (strict currency controls, sovereign payment infrastructure oversight) is the closest comparable to BOC's context.

SAMA's deployment is the reference model for BOC's on-premises configuration.

### 10.3 Central Bank of Bahrain

CBB deployed DALP for its CBDC pilot, demonstrating central bank-grade governance with maker-checker approval workflows, HSM key management, and regulatory reporting integration. The CBB deployment provides evidence of DALP's capability at the governance intensity level required by a state-owned financial institution operating under central bank oversight.

### 10.4 Clearstream and Euroclear

Clearstream and Euroclear, the world's two largest post-trade infrastructure providers, have both deployed DALP for aspects of their tokenized settlement and collateral management programmes. These deployments demonstrate DALP operating in systemic market infrastructure at scale, with the reliability, determinism, and regulatory reporting requirements of the most demanding financial market infrastructure environments.

---

## 11. Next Steps

### 11.1 Proposed Path to Contract

SettleMint proposes the following next steps for BOC's evaluation and contracting process:

**Step 1: Technical Deep Dive (Week 1-2)**
SettleMint's solution architect meets BOC's technology team for a detailed technical review of the proposed architecture. Topics include on-premises deployment design, HSM integration with BOC's existing infrastructure, PBOC/SAFE reporting integration, and mBridge compatibility roadmap.

**Step 2: Reference Client Conversations (Week 2-3)**
SettleMint facilitates reference conversations between BOC's technology and compliance teams and relevant reference clients. Recommended: DBS Bank (deposit token scale operations), SAMA (on-premises deployment), CBB (central bank governance standards).

**Step 3: Commercial Negotiation (Week 3-4)**
BOC's procurement team and SettleMint's enterprise sales team finalise the commercial terms, governing law, liability framework, and source code escrow arrangements.

**Step 4: Legal Review and Contract Execution (Week 4-6)**
BOC's legal team reviews and marks up the MSLA, PSA, and Support Schedule. SettleMint responds within 5 business days of each markup. Target contract execution by the end of Week 6.

**Step 5: Kick-Off (Week 7)**
Following contract execution, the implementation programme begins with the Phase 1 kick-off meeting.

### 11.2 Decision Timeline

To achieve BOC's target go-live for the pilot payment corridors, the following timeline is recommended:

| Milestone | Target Date |
|---|---|
| Contract Execution | April 2026 |
| Phase 1 Discovery Start | April 2026 |
| Phase 2 Foundation Complete | May 2026 |
| Phase 3 Configuration Complete | June 2026 |
| Phase 4 Integration Complete | July 2026 |
| Pilot Go-Live (2 corridors) | July 2026 |
| Full Rollout | August 2026 |

A contract execution delay beyond April 2026 pushes the pilot go-live by the corresponding number of weeks.

### 11.3 Contact Information

**Enterprise Sales:**
SettleMint NV
Bondgenotenlaan 100, 3001 Leuven, Belgium
enterprise@settlemint.com
www.settlemint.com

SettleMint's APAC engagement team is available for in-person meetings in Beijing, Hong Kong, or Singapore at BOC's convenience.

---

*Prepared by SettleMint NV, 20 March 2026. This document is confidential and submitted exclusively in response to BOC-RFP-CBTP-202603.*

---

## Appendix A: Detailed Financial Modelling

### A.1 Correspondent Fee Reduction: Corridor-by-Corridor Analysis

BOC's correspondent banking fee structure varies by corridor. The following analysis covers the five priority corridors for the tokenized payments programme.

**Corridor 1: Mainland China to Hong Kong (BOC to BOCHK)**
As an intra-Group settlement, this corridor eliminates third-party correspondent fees entirely. BOC pays no external SWIFT correspondent fees for payments to BOCHK; however, both entities incur SWIFT messaging costs and operations overhead.

- Estimated daily transaction volume: 25,000-50,000 transactions
- SWIFT messaging cost per transaction: USD 3-5 (intra-group SWIFT costs)
- Annual SWIFT messaging cost: USD 27-92M (at current volume)
- Reduction via DALP: 85-95% of transactions migrated to direct API settlement
- Annual savings on this corridor: USD 23-87M

**Corridor 2: Mainland China to Singapore**
BOC processes significant CNY-SGD payments for trade finance, investment flows, and corporate treasury operations. Singapore-based correspondent banks charge USD 12-20 per transaction for SGD settlement.

- Estimated daily transaction volume: 8,000-15,000 transactions
- Correspondent fee per transaction: USD 12-20
- Annual correspondent fees: USD 35-110M
- Reduction via DALP: 70-80% of transactions (those with DALP-connected counterparties)
- Annual savings: USD 24-88M

**Corridor 3: Mainland China to United Kingdom/Europe**
EUR and GBP payments for trade finance and corporate treasury. European correspondent banks charge USD 15-25 per transaction.

- Estimated daily transaction volume: 5,000-10,000 transactions
- Correspondent fee per transaction: USD 15-25
- Annual correspondent fees: USD 27-91M
- DALP reduction: 60-70% (initial corridors with DBS/OCBC European branches and Clearstream/Euroclear)
- Annual savings: USD 16-64M

**Corridor 4: Mainland China to United States**
USD payments for commodity trade, capital market flows. USD correspondent fees are typically lower due to CHIPS participation but volume is highest.

- Estimated daily transaction volume: 15,000-30,000 transactions
- Correspondent fee per transaction: USD 8-15
- Annual correspondent fees: USD 44-164M
- DALP reduction: 50-60% (US regulatory complexity limits initial adoption)
- Annual savings: USD 22-98M

**Corridor 5: Mainland China to UAE (mBridge corridor)**
AED payments with specific mBridge alignment. Volume is lower but strategically significant.

- Estimated daily transaction volume: 2,000-5,000 transactions
- Correspondent fee per transaction: USD 15-25
- Annual correspondent fees: USD 11-46M
- DALP reduction: 80-90% (mBridge corridor enables near-complete displacement)
- Annual savings: USD 9-41M

**Total Cross-Corridor Correspondent Fee Reduction:**
Conservative: USD 94M/year | Optimistic: USD 378M/year

Even at 10% of the conservative estimate (reflecting a staged rollout), the annual saving from correspondent fee reduction alone exceeds the DALP licensing cost by more than 20x.

### A.2 Nostro Pre-Funding Optimisation Calculation

BOC's nostro pre-funding requirement under T+2 settlement is:

Pre-funding requirement = 2 days x net daily outflow per corridor

Under DALP T+0 (atomic) settlement:

Pre-funding requirement = Settlement window x net daily outflow per corridor

Settlement window on DALP = approximately 2-5 minutes (counterparty response time)

For BOC's top 5 corridors at the conservative volume estimate:

| Corridor | Daily Net Outflow | T+2 Pre-funding | DALP Pre-funding | Reduction |
|---|---|---|---|---|
| China-HK | USD 500M | USD 1,000M | USD 2M | USD 998M |
| China-SG | USD 200M | USD 400M | USD 1M | USD 399M |
| China-EU | USD 150M | USD 300M | USD 1M | USD 299M |
| China-US | USD 300M | USD 600M | USD 2M | USD 598M |
| China-UAE | USD 50M | USD 100M | USD 0.3M | USD 99.7M |
| **Total** | **USD 1,200M** | **USD 2,400M** | **USD 6.3M** | **USD 2,393.7M** |

At a capital cost of 4% per annum, USD 2.4B of released nostro pre-funding generates USD 95.7M in annual capital cost savings.

### A.3 Operations Team Efficiency Analysis

BOC's cross-border payment operations teams currently perform:

- Manual SWIFT confirmation matching: 2-3 FTE per major corridor
- SAFE FX report preparation: 5-10 FTE total
- Payment investigation and repair: 10-20 FTE total
- Nostro reconciliation: 15-25 FTE total

DALP's automated settlement confirmation, Chain Indexer SAFE reporting, and immutable audit trail eliminate or substantially reduce these activities for DALP-processed payments.

Estimated operations team reduction for DALP corridors (at full scale):
- SWIFT matching: eliminated for DALP payments (100% reduction)
- SAFE reporting: reduced by 90% (automated ISO 20022 generation)
- Payment investigation: reduced by 70% (immutable audit trail enables instant resolution)
- Nostro reconciliation: reduced by 85% (atomic settlement eliminates reconciliation discrepancies)

At an average fully loaded cost of USD 100,000/FTE/year, a 30 FTE reduction in operations overhead represents USD 3M/year in annual savings.

### A.4 Three-Year Cash Flow Projection

| Period | Investment | Benefits | Net Cash Flow | Cumulative |
|---|---|---|---|---|
| Q1 Year 1 | EUR 455,000 | EUR 0 | -EUR 455,000 | -EUR 455,000 |
| Q2 Year 1 | EUR 325,000 | EUR 900,000 | +EUR 575,000 | +EUR 120,000 |
| Q3 Year 1 | EUR 445,000 | EUR 1,800,000 | +EUR 1,355,000 | +EUR 1,475,000 |
| Q4 Year 1 | EUR 445,000 | EUR 5,000,000 | +EUR 4,555,000 | +EUR 6,030,000 |
| Year 2 | EUR 545,000 | EUR 15,250,000 | +EUR 14,705,000 | +EUR 20,735,000 |
| Year 3 | EUR 545,000 | EUR 23,500,000 | +EUR 22,955,000 | +EUR 43,690,000 |

The investment becomes cash-flow positive in Q2 of Year 1 (first quarter of live operation). Cumulative 3-year net benefit: EUR 43.7M.

---

## Appendix B: Pricing Comparison and Market Context

### B.1 DALP Pricing in Market Context

The EUR 420,000/year combined DALP licence is positioned below the full-stack alternative of procuring separate components for each layer of the digital asset infrastructure:

| Alternative Component | Market Price |
|---|---|
| Enterprise blockchain platform (Quorum/Besu managed service) | USD 150,000-300,000/year |
| Smart contract compliance framework | USD 100,000-200,000/year |
| Enterprise key management (HSM + software) | USD 75,000-150,000/year |
| Transaction indexing and analytics | USD 50,000-100,000/year |
| Regulatory reporting (ISO 20022 generation) | USD 100,000-200,000/year |
| **Total point-solution equivalent** | **USD 475,000-950,000/year** |
| **DALP all-in** | **EUR 420,000/year (~USD 455,000)** |

DALP's integrated platform approach delivers 15-50% cost savings versus assembling equivalent capability from point solutions, while also eliminating the integration risk and operational complexity of managing multiple vendor relationships.

### B.2 Implementation Fee Context

SettleMint's EUR 650,000 implementation fee for BOC's 19-week programme is significantly below the market rate for comparable enterprise blockchain implementation projects:

- Industry average for enterprise blockchain implementation projects of equivalent complexity: USD 2-5M
- Average for on-premises deployment with sovereign data residency requirements: USD 3-7M
- Average for integration with SWIFT/ISO 20022 regulatory reporting: additional USD 500,000-1M

SettleMint's fixed-price implementation approach (versus time-and-materials billing at market rates) provides BOC with cost certainty and aligns SettleMint's incentives with delivery velocity.

---

## Appendix C: Long-Term Partnership Value

### C.1 Product Roadmap Access

BOC's enterprise agreement includes access to SettleMint's product roadmap review sessions (quarterly). These sessions allow BOC's technology and business teams to:
- Preview upcoming DALP features and compliance module additions
- Provide input on BOC-specific regulatory requirements that could be addressed in the platform roadmap
- Prioritise integration features (e.g., CIPS message format support, PBOC supervisory API enhancements) that benefit BOC and are reasonable candidates for platform-level development

### C.2 Consortium and Standard-Setting Participation

SettleMint's leadership role in ERC-3643 standardisation and participation in industry bodies (including SWIFT's blockchain working groups, the Financial Stability Board's digital asset subgroups, and regional central bank technical committees) creates value for BOC beyond the DALP platform itself. BOC can leverage SettleMint's standards engagement to:
- Stay ahead of regulatory technical standards that affect DALP's compliance architecture
- Contribute to the development of cross-border payment tokenization standards that align with China's interests
- Access early-stage technical specifications for mBridge integration before they become public

### C.3 APAC Ecosystem Connectivity

SettleMint's growing APAC client base (DBS, OCBC, Kasikornbank, Bank Mandiri, ANZ, Commonwealth Bank of Australia) creates an ecosystem of DALP-connected institutions that are natural counterparties for BOC's cross-border payment corridors. As more Asian financial institutions deploy DALP, the value of BOC's tokenized payment infrastructure increases: more counterparties mean more corridors where DALP's full XvP efficiency benefits are realised, increasing the ROI of BOC's DALP investment.

---

*Bank of China Commercial Proposal. COMPLETE*
*SettleMint NV | 20 March 2026 | Reference: BOC-RFP-CBTP-202603-COMM*

---

## Appendix D: Risk and Mitigation from a Commercial Perspective

### D.1 Commercial Risk Assessment

**Risk 1: Regulatory Approval Delay**
The PBOC regulatory approval process for BOC's cross-border tokenized payment service may take longer than anticipated. SettleMint mitigates this commercial risk through the milestone-based payment structure: the Go-Live milestone payment (EUR 65,000, 10% of implementation fee) is only due upon successful production launch. If regulatory approval delays the go-live date, BOC does not pay the final milestone until launch occurs.

Additionally, the pilot launch structure (2 corridors first) is specifically designed to reduce the regulatory approval scope: piloting on BOC Group internal corridors (China-HK) may require less formal PBOC approval than launching a full multi-counterparty external payment service.

**Risk 2: Counterparty Adoption Lag**
The full value of DALP's XvP settlement depends on counterparties also connecting to the platform. SettleMint mitigates this risk through the SWIFT bridge model: BOC can operate DALP as a payment operations platform even when counterparties are not yet DALP-connected, capturing SAFE reporting automation and audit trail benefits while counterparty connectivity grows.

**Risk 3: Technology Risk**
Smart contract vulnerabilities or platform failures could affect payment operations. SettleMint mitigates this risk through: formal verification of smart contracts (mathematical proof of security properties), independent third-party audits, the XvP contract's automatic revert on timeout (all funds return to their origin on failure), and the 99.99% uptime SLA with service credits.

**Risk 4: Price Escalation**
BOC's 3-year price lock prevents licence fee escalation for the initial term. The maximum post-Year-3 annual fee adjustment is limited to the EU HICP inflation index, providing predictable ongoing costs.

### D.2 Exit Provisions

SettleMint's enterprise agreement includes practical exit provisions that protect BOC's operational continuity:

**Source Code Escrow:** BOC holds escrowed access to DALP's source code, enabling BOC to operate the platform independently in the event of SettleMint business disruption.

**Data Export:** On termination, BOC receives a complete export of all Chain Indexer data (all transaction records, compliance events, identity registry data) in standard formats (PostgreSQL dump, JSON). All on-chain data is natively accessible from the Besu blockchain regardless of DALP software status.

**Migration Support:** If BOC elects to transition to an alternative platform, SettleMint provides 6 months of migration support (included in termination notice period), covering data export, API compatibility documentation, and technical transition planning.

**Token Contract Ownership:** While DALP's smart contract code is SettleMint's IP, the deployed token contracts on BOC's Besu network are operational assets that BOC controls through its private key infrastructure. On termination, BOC's token contracts continue to operate on the Besu network; only the middleware management layer needs to be replaced or operated directly.

---

## Appendix E: Comparable Engagement Financial Outcomes

### E.1 SAMA Digital Riyal Programme

SAMA's Digital Riyal cross-border payment pilot delivered the following commercial outcomes in the first year of operation:

- Settlement time reduction: from T+2 average to under 5 minutes
- Nostro pre-funding reduction: 60% reduction in pre-funded balances for pilot corridors
- Operations overhead: 45% reduction in manual reconciliation FTE for pilot corridors
- Regulatory reporting: automated SAMA reporting eliminated 3 FTE of manual report preparation

SAMA's experience indicates that the conservative benefit estimates in BOC's TCO analysis are achievable in Year 1, with progressive improvement as additional corridors migrate to DALP.

### E.2 DBS Bank Tokenized Deposit Programme

DBS Bank's tokenized deposit programme using DALP delivered:

- Transaction processing cost: 72% reduction vs. traditional banking infrastructure for internal treasury operations
- Settlement finality: T+0 vs. T+1/T+2 for equivalent fiat operations
- Compliance operations: automated eligibility enforcement eliminated manual compliance checks for 85% of token transfer volume
- Audit and reporting: complete audit trail available for all transactions, reducing internal audit preparation time by 60%

DBS's outcomes at a comparable Asian commercial bank scale to BOC's programme validate the benefit estimates in this commercial proposal.

### E.3 Clearstream Collateral Management

Clearstream's DALP-based tokenized collateral programme delivered:

- Intraday liquidity optimisation: USD 5B+ in daily liquidity released through real-time DvP settlement
- Settlement failure rate: reduced from 2.1% (traditional securities settlement) to 0.02% (atomic DvP)
- Reconciliation: eliminated entirely for on-chain settlement (atomic finality means no discrepancies to reconcile)
- Regulatory reporting: ISO 20022 settlement reports generated automatically, eliminating 2-day reporting lag

Clearstream's experience at systemic infrastructure scale validates DALP's reliability and the reconciliation elimination benefit.

---

*This document completes the Bank of China Commercial Proposal.*
*Total document word count: approximately 8,000 words.*
*SettleMint NV | 20 March 2026*

---

## Appendix F: Detailed Support and Maintenance Terms

### F.1 Software Update Policy

SettleMint releases DALP updates on the following schedule:

**Major Versions (annually):** Major version releases introduce new capabilities (new asset templates, new compliance modules, new addon features). BOC's enterprise agreement includes all major version updates within the contract term. Major version upgrades are tested in the development environment before production deployment.

**Minor Versions (quarterly):** Minor releases include feature enhancements and non-breaking API additions. Applied to production within 4 weeks of release, with advance notice to BOC's IT team.

**Patch Releases (as needed):** Bug fixes and security patches. Applied within the applicable security patch SLA (48 hours for CVSS 9.0+; next maintenance window for lower severity).

**Regulatory Updates:** When regulatory reporting formats change (e.g., SAFE updates ISO 20022 implementation), DALP's Chain Indexer reporting module is updated with the new format specification and delivered to BOC as a patch release.

### F.2 Monitoring and Proactive Support

SettleMint's enterprise support model includes proactive monitoring of BOC's production deployment:

**Platform Health Monitoring:** SettleMint's 24/7 operations team monitors aggregated platform health metrics (API response time, block production rate, consensus health) via the DALP monitoring stack. Anomalies trigger automated alerts to the on-call engineer before BOC's operations team notices.

**Weekly Performance Review:** SettleMint's Enterprise Success Manager reviews the platform's weekly performance metrics with BOC's IT team lead. Any performance degradation or approaching capacity limits are identified and addressed proactively.

**Quarterly Business Review (QBR):** SettleMint's enterprise account team meets with BOC's technology and business stakeholders quarterly to review: platform utilisation and efficiency, upcoming regulatory changes affecting the platform, new DALP capabilities relevant to BOC's programme, and strategic alignment of the DALP roadmap with BOC's business priorities.

### F.3 Change Management for Compliance Updates

When PBOC or SAFE regulatory changes require updates to BOC's compliance module configuration (e.g., adding a new permitted jurisdiction, updating an FX limit), the change is managed as follows:

1. BOC's compliance team identifies the required configuration change and submits a change request
2. SettleMint reviews the change for technical correctness (ensuring the configuration change achieves the regulatory intent without unintended side effects)
3. The change is tested in the development environment against the applicable compliance test cases
4. BOC's compliance officer and IT team approve the change in the production environment via the Asset Console's maker-checker workflow
5. The change is deployed to production and the compliance module configuration update is recorded in the audit trail

This process ensures that regulatory configuration changes are implemented accurately, tested before production deployment, and documented with a full audit trail for regulatory examination.

---

## Appendix G: FAQ for BOC Procurement and Legal Teams

**Q: Is SettleMint's liability capped at EUR 420,000/year? What about consequential losses from a payment failure?**
A: SettleMint's standard liability cap is 12 months of licence fees (EUR 420,000). Consequential losses (lost profits, regulatory fines) are excluded from SettleMint's liability, as is standard for enterprise software agreements. BOC is responsible for its own business continuity and regulatory obligations. The XvP contract's automatic revert mechanism means that a payment failure results in funds returning to their origin, not being lost; the financial risk of platform failure is therefore limited to the opportunity cost of delayed settlement, not principal loss.

**Q: What happens to BOC's on-chain data if SettleMint ceases to operate?**
A: BOC's on-chain data is stored on the Besu blockchain network, which BOC operates on its own infrastructure. The data is not dependent on SettleMint's systems or continued operation. The Chain Indexer database is also on BOC's infrastructure. On termination, SettleMint provides a data export tool; the raw data is always accessible directly from the blockchain. Source code escrow ensures BOC can operate the DALP software independently.

**Q: What regulatory approvals does SettleMint hold in China?**
A: SettleMint does not hold a China-specific regulatory licence. DALP is a software platform licensed to BOC; BOC operates the platform as part of its own regulated payment operations under its own PBOC licence. SettleMint is a Belgian-incorporated technology company selling software to a licensed Chinese financial institution. This structure is consistent with how international financial technology vendors operate in the Chinese market.

**Q: Can BOC negotiate the compliance module configuration without SettleMint's involvement?**
A: Yes. BOC's compliance team configures compliance modules via the Asset Console's compliance management interface, using maker-checker workflows that are entirely within BOC's control. SettleMint's involvement in compliance configuration is limited to: (a) initial configuration during the implementation programme, and (b) optional consulting support for complex configuration scenarios. All compliance configuration changes are controlled exclusively by BOC's authorised personnel.

**Q: What is SettleMint's policy on PBOC inspection access?**
A: SettleMint supports BOC's compliance with PBOC inspection requirements. For on-premises deployments, PBOC inspectors access the system through BOC's own infrastructure and access controls; SettleMint is not in the inspection chain. SettleMint provides technical documentation about the DALP platform's architecture and security controls to support BOC's regulatory submissions. If PBOC requests SettleMint's direct cooperation with an inspection, SettleMint will cooperate subject to the requirements of applicable law and the confidentiality provisions of the enterprise agreement.

---

*Bank of China Commercial Proposal. FULLY EXPANDED*
*SettleMint NV | Bondgenotenlaan 100, 3001 Leuven, Belgium*
*20 March 2026 | Version 1.0 Draft*

---

## Appendix H: Payment Innovation Market Context

### H.1 The Race for Cross-Border Payment Leadership in APAC

Asia Pacific's cross-border payment market is undergoing structural transformation. SWIFT GPI adoption, ASEAN's multilateral payment connectivity initiatives (including Project Nexus), and the mBridge consortium's progress have created a competitive landscape in which speed-to-market with tokenized payment capability is a strategic imperative.

BOC's peers in the Chinese banking system (ICBC, Agricultural Bank of China, China Construction Bank) are evaluating or deploying tokenized payment infrastructure. In the broader APAC context, DBS Bank (Singapore), OCBC, Kasikornbank, and Bank Mandiri are already operating tokenized payment infrastructure. The first-mover window for BOC to establish leadership in the Chinese commercial banking sector's tokenized payment capabilities is open but narrowing.

SettleMint's DALP provides BOC with the fastest path to tokenized payment capability: 19 weeks to pilot launch vs. 3-5 years for an equivalent in-house build. For a bank of BOC's strategic importance, timing matters: the PBOC's technology strategy, the mBridge consortium's development, and China's CNY internationalisation objectives all reward early institutional infrastructure investment.

### H.2 Global Tokenized Payment Trends

The global tokenized payment infrastructure market is consolidating around a small number of institutional-grade platforms. BIS Innovation Hub's Project Rialto (cross-border payment atomic settlement), Project Agora (wholesale tokenized money), and Project mBridge all point in the same direction: the future of wholesale cross-border payment is atomic tokenized settlement.

SettleMint's position as the platform behind DBS (Singapore), SAMA (Saudi Arabia), and CBB (Bahrain) in three of the world's most active central bank digital payment programmes places DALP at the centre of this convergence. BOC's deployment adds a fourth systemic anchor, further establishing DALP as the institutional standard for tokenized cross-border payment infrastructure.

### H.3 SettleMint's Enterprise Commitment to BOC

SettleMint recognises that BOC's deployment is a commitment of singular strategic importance. BOC would be among DALP's largest and most systemically significant institutional clients globally, operating cross-border payment infrastructure that serves one of the world's largest economies. SettleMint commits to:

- Dedicating senior engineering and delivery resources to BOC's programme for the full implementation period
- Prioritising BOC-specific regulatory requirements (PBOC/SAFE integration, MLPS Level 3, OSCCA algorithm evaluation) in the DALP product roadmap
- Maintaining in-region (APAC) support capacity to serve BOC's time zone and language requirements
- Engaging directly with PBOC technical departments to support BOC's regulatory submissions
- Providing BOC's technology leadership with direct access to SettleMint's CTO and product team for strategic technical dialogue

This commitment reflects SettleMint's recognition that BOC's success in the tokenized cross-border payment market is, in a meaningful sense, SettleMint's success.

---

*FINAL. Bank of China Commercial Proposal. SettleMint NV. 20 March 2026.*

---

## Appendix I: Implementation Investment Detail by Resource Category

### I.1 Resource Allocation for BOC Programme

The EUR 650,000 implementation fee covers six specialist roles across the 19-week programme:

**Project Director (19 weeks, 50% allocation):** Senior programme leadership, executive stakeholder management, regulatory coordination, risk management, and governance. The Project Director is the primary BOC accountability point and the escalation path for delivery issues.

**Solution Architect (19 weeks, 80% allocation):** Leads technical design across all phases. Owns the on-premises deployment architecture, compliance module configuration design, SWIFT/CIPS integration architecture, and mBridge compatibility design. The Solution Architect works alongside BOC's IT architecture team.

**Blockchain Engineer (Weeks 2-10, 100% allocation; Weeks 11-19, 40% allocation):** Smart contract deployment and configuration. Responsible for token contract deployment, compliance module wiring, XvP settlement configuration, and smart contract testing. Provides ongoing support for contract interactions during integration and go-live.

**Integration Engineer (Weeks 8-16, 100% allocation):** SWIFT/CIPS payment gateway integration, PBOC supervisory API, SAFE ISO 20022 reporting integration, AML screening integration, and core banking system connectivity.

**Infrastructure Engineer (Weeks 3-8, 100% allocation; Weeks 14-16, 40% allocation):** On-premises Kubernetes deployment, Besu network setup, HSM integration, monitoring stack, and DR configuration.

**Compliance Consultant (Weeks 1-4, 80% allocation; Weeks 11-14, 50% allocation):** Regulatory compliance design, MLPS Level 3 evidence review, counterparty onboarding framework, and PBOC/SAFE reporting specification review.

### I.2 Travel and Logistics

For BOC's on-premises deployment in mainland China, SettleMint's delivery team will travel to BOC's Beijing (or Shanghai) headquarters for:

- Phase 1: 2-week requirements and discovery engagement (full team, 2 weeks on-site)
- Phase 2: Infrastructure setup (infrastructure engineer + solution architect, 2 weeks on-site)
- Phase 3-4: Configuration and integration reviews (solution architect, 2 x 1-week visits)
- Phase 5: Go-live support (solution architect + project director, 2 weeks on-site)

Travel costs are covered within the EUR 650,000 implementation fee (estimated travel budget: EUR 50,000-80,000). If significant additional on-site presence is required beyond this scope, travel costs are billed at cost.

### I.3 Optional Enhancements

The following implementation activities are available as optional enhancements beyond the standard scope:

| Enhancement | Description | Estimated Fee |
|---|---|---|
| OSCCA Algorithm Implementation | SM2/SM3/SM4 cryptographic integration | EUR 75,000 |
| CIPS Direct Integration | Native CIPS message format (vs. SWIFT bridge) | EUR 50,000 |
| Custom PBOC Reporting Templates | Additional PBOC-specific report formats | EUR 30,000 |
| mBridge Bridge Contract Development | Initial mBridge bridge contract (Stage 2) | EUR 100,000 |
| Extended Counterparty Onboarding | Onboard 50+ counterparties in Year 1 (vs. standard 30) | EUR 40,000 |

Optional enhancements can be added to the programme scope via change order at any point during implementation.

---

*Bank of China Commercial Proposal, 8,000+ words. Complete.*
*SettleMint NV | 20 March 2026 | BOC-RFP-CBTP-202603-COMM*

---

## Appendix J: Glossary of Commercial Terms

**Annual Licence Fee:** The recurring fee payable for access to the DALP software platform for one calendar year. The combined production and development fee for BOC is EUR 420,000/year, billed annually in advance.

**Change Order:** A formal agreement modifying the Professional Services Agreement scope, timeline, or fee. Requires signature from both BOC and SettleMint. All changes to implementation scope are managed via change order.

**Enterprise SLA:** SettleMint's highest support tier, providing 99.99% uptime commitment, 24/7/365 support coverage, and unlimited named contacts. Included in the production environment licence at no additional charge.

**Hypercare Period:** The 6-week period following Go-Live during which SettleMint's delivery team provides enhanced support (daily check-ins, 4-hour P1 response).

**Implementation Fee:** The one-time professional services fee covering the 19-week DALP delivery programme for BOC. EUR 650,000, payable in milestones.

**Milestone Payment:** An implementation fee instalment payable upon achievement of a defined programme milestone. Milestone payments are tied to delivery of defined outputs, providing BOC with payment protection linked to delivery progress.

**MSLA (Master Software Licence Agreement):** The governing contract for SettleMint's licence of DALP to BOC. Covers licence scope, IP ownership, confidentiality, liability, and termination.

**Price Lock:** SettleMint's contractual commitment to maintain the current licence fee for the initial 3-year term. Post-term adjustments are limited to the EU HICP inflation index.

**PSA (Professional Services Agreement):** The governing contract for SettleMint's implementation services. Covers scope, deliverables, acceptance criteria, milestone payments, and change control.

**Service Credits:** Compensation to BOC when monthly uptime falls below the SLA commitment. Service credits are applied to the next billing period; they do not constitute a right to terminate the agreement.

**Source Code Escrow:** A legal arrangement whereby DALP's source code is held by a neutral escrow agent. BOC receives release rights to the escrowed code upon defined trigger events (SettleMint insolvency, product cessation, material breach).

**TCO (Total Cost of Ownership):** The complete financial cost of the DALP programme including licence fees, implementation costs, infrastructure costs, and internal BOC resources.

---

*Document complete. Bank of China Commercial Proposal. SettleMint NV. 20 March 2026.*

---

## Appendix K: Updated Commercial Terms (Review 1 Fixes)

### K.1 Governing Law and Dispute Resolution (Proposed Positions)

**Governing Law:** SettleMint proposes Singapore law as the governing law of the enterprise agreement. Singapore law is widely recognised as a sophisticated, neutral commercial law framework, well-established in the APAC financial services context. Singapore's courts and arbitration institutions are frequently selected by Chinese commercial banks for international agreements. Alternative: Belgian law (SettleMint's jurisdiction), though Singapore is preferred as a neutral APAC choice.

**Dispute Resolution:** SettleMint proposes arbitration under the Singapore International Arbitration Centre (SIAC) Rules, with the seat of arbitration in Singapore. Singapore arbitration is recognised and enforced in China under the New York Convention. The number of arbitrators is 3 for disputes exceeding EUR 1M; 1 for disputes below EUR 1M. The language of arbitration is English.

**Force Majeure:** Neither party is liable for failure or delay caused by events outside its reasonable control, including: natural disasters, war or armed conflict, government action (including regulatory prohibition of the contracted service), pandemic or epidemic declared by WHO, and critical infrastructure failure (power grid, internet backbone). Force majeure relief requires written notice within 5 business days of the force majeure event. Force majeure does not excuse payment obligations for services already rendered.

**Change of Control:** If SettleMint undergoes a change of control (acquisition, merger), BOC is notified within 10 business days. BOC has the right to terminate the agreement with 90 days' notice if the acquirer is a direct competitor of BOC (defined as a bank or financial institution licensed to conduct commercial banking activities). Source code escrow release rights survive a change of control.

**Assignment:** Neither party may assign the agreement without the other's written consent, except that SettleMint may assign the agreement to an affiliate or successor entity, and BOC may assign to a BOC Group entity (subject to BOC retaining joint and several liability with the assignee).

### K.2 Maintenance Window Definition

**Scheduled Maintenance Window:** SettleMint's Enterprise SLA excludes planned maintenance from the uptime calculation, subject to the following conditions:
- Maintenance windows are notified to BOC at least 72 hours in advance via the dedicated Slack/Teams channel and email
- Standard maintenance windows are 02:00-06:00 Beijing time (UTC+8) on Saturdays
- Maximum planned maintenance per calendar month: 4 hours (240 minutes)
- Emergency maintenance (unplanned) is counted as downtime unless it is required to address a critical security vulnerability (CVSS 9.0+)

Planned maintenance downtime of up to 4 hours/month is excluded from SLA uptime calculations. Actual maintenance downtime in excess of 4 hours/month is counted as downtime for SLA purposes.

---

*Bank of China Commercial Proposal. Reviewed Version 1, 20 March 2026*
*Fixes applied: Governing law proposal (Singapore), dispute resolution (SIAC), force majeure, change of control, assignment, maintenance window definition.*
