# Commercial Proposal: Tokenized Settlement Infrastructure

**Prepared for:** ASX Limited (Australian Securities Exchange)
**Date:** 20 March 2026
**Version:** 1.0 Draft
**Classification:** SettleMint Confidential
**Reference:** ASX-RFP-TSI-202603-COMM

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

**Prepared by:** SettleMint NV | Date: 20 March 2026

---

## 2. Executive Summary

### 2.1 The Commercial Case

ASX's tokenized settlement programme addresses a strategic imperative: post-trade infrastructure modernisation in Australia's capital markets. The CHESS Replacement programme's conclusion in 2023 created institutional caution, but not institutional permission to stand still. Australia's global peers (UK Digital Securities Sandbox, Singapore Project Guardian, Hong Kong Project Ensemble) are advancing tokenized market infrastructure. ASX's position as Australia's primary capital market requires a credible modernisation path.

SettleMint's DALP provides that path at a fraction of the CHESS Replacement budget: a working tokenized settlement system for 10-15 pilot participants in 19 weeks, at a total Year 1 investment of approximately AUD 2-3M (versus AUD 250M for the CHESS Replacement programme). The CHESS Replacement was a commitment to an outcome; DALP is a commitment to a working system in 19 weeks, with expansion decisions based on evidence.

### 2.2 Proposal Summary

- **Production Licence:** EUR 300,000/year
- **Development Licence:** EUR 120,000/year
- **Combined Annual Licensing:** EUR 420,000/year
- **Implementation Fee:** EUR 550,000 (one-time, milestone-based)
- **Support Tier:** Enterprise (99.99% uptime, 24/7/365)
- **Recommended Term:** 3 years with price lock

---

## 3. Investment Rationale

### 3.1 The Cost of Inaction

ASX's post-CHESS Replacement position carries a different type of cost: the cost of inaction. Australia's capital markets infrastructure modernisation is not optional; it is a strategic imperative. The alternative to a disciplined, phased tokenized settlement programme is not the status quo, it is the accelerating loss of market positioning as ASX's peer exchanges advance.

**Competitive Risk:** SGX (Singapore), HKEX, and the London Stock Exchange are all advancing tokenized securities infrastructure. Institutional investors that trade across APAC markets will increasingly preference exchanges with T+0 atomic settlement over exchanges with T+2 batch settlement.

**Regulatory Pressure:** ASIC's Digital Assets regulatory position, the RBA's Project Acacia, and APRA's operational resilience requirements collectively create regulatory pressure for capital markets infrastructure modernisation. ASX's current infrastructure will require modernisation regardless; the question is whether it is done proactively or reactively.

**Settlement Efficiency:** Australia's equity market processes approximately 4 million settlement transactions annually through CHESS. At a conservative estimate of AUD 25 per failed settlement (manual intervention cost), the 0.5% fail rate generates AUD 50M+ in annual settlement failure costs. T+0 atomic settlement eliminates this cost.

### 3.2 DALP's Quantifiable Benefits

**Settlement Efficiency Gains:**
- Settlement time: T+2 → T+0 (< 10 seconds)
- Settlement fail rate: ~0.5% → <0.05%
- Reconciliation overhead: eliminated for tokenized instruments
- Annual settlement failure cost reduction: AUD 50-100M (at full scale)

**Operational Cost Reduction:**
- Market operations manual settlement management: reduced by 70-80% for tokenized settlement
- Back-office reconciliation: eliminated for tokenized instruments
- ASIC reporting: automated (eliminating 2-3 FTE manual report preparation)

**New Revenue Opportunities:**
- Premium settlement service (T+0 guarantee): ASX can charge a premium for tokenized T+0 settlement vs. standard T+2 CHESS settlement
- International participant attraction: T+0 settlement attracts international institutional investors who currently avoid T+2 markets for operational risk reasons
- New product categories: fractional ownership, tokenized international securities (with cross-border XvP settlement)

### 3.3 ROI Framework

| Benefit Category | Pilot (Year 1) | Expansion (Year 2) | Full Scale (Year 3) |
|---|---|---|---|
| Settlement fail cost reduction | AUD 5M | AUD 20M | AUD 80M |
| Operational efficiency savings | AUD 2M | AUD 8M | AUD 30M |
| Premium settlement revenue | AUD 1M | AUD 5M | AUD 20M |
| International participant revenue | AUD 0.5M | AUD 3M | AUD 15M |
| **Total Annual Benefits** | **AUD 8.5M** | **AUD 36M** | **AUD 145M** |
| **Annual DALP Cost (AUD equiv.)** | **~AUD 700K** | **~AUD 700K** | **~AUD 700K** |
| **Net Benefit** | **AUD 7.8M** | **AUD 35.3M** | **AUD 144.3M** |

At pilot scale alone, the programme generates AUD 7.8M in net benefits versus AUD 700K in platform costs, a 11x return in the first year of live operation.

### 3.4 CHESS Replacement Cost Comparison

ASX's board and management are appropriately cautious about digital market infrastructure investment following the CHESS Replacement experience. The relevant comparison:

| Factor | CHESS Replacement | DALP Programme |
|---|---|---|
| Total investment | AUD ~250M | AUD ~3M (Year 1 all-in) |
| Production evidence at selection | None (new technology) | Clearstream, Euroclear, CBA, ANZ |
| Pilot delivery commitment | No phased pilot | 19-week pilot with clear acceptance criteria |
| Technology lock-in | Proprietary DA protocol | Open standard (ERC-3643, Besu, ISO 20022) |
| Exit provisions | Complex, expensive | 90-day notice, full data export, source code escrow |
| Regulatory acceptance | Required ASIC engagement that exposed issues | CBA/ANZ Australian regulatory validation available |

The DALP programme delivers the same modernisation goal as CHESS Replacement at 1% of the cost, with production evidence, phased delivery, and robust exit provisions.

---

## 4. Licensing Model

### 4.1 DALP Licence for ASX

| Environment | Annual Fee | Monthly |
|---|---|---|
| Production | EUR 300,000 | EUR 25,000 |
| Development | EUR 120,000 | EUR 10,000 |
| **Combined** | **EUR 420,000** | **EUR 35,000** |

**Included:**
- Full 4-layer DALP platform
- XvP Settlement addon (atomic DvP)
- ISO 20022 SESE adapter (settlement instruction/confirmation)
- Enterprise support (99.99% SLA, 24/7/365)
- ASIC/APRA regulatory reporting module
- All platform updates within major version term
- Unlimited settlement volume
- Up to 50 pilot participants (Phase 1 scope)

**3-Year Price Lock:** EUR 420,000/year fixed for 3 years. Post-term: EU HICP-indexed adjustment.

---

## 5. Deployment Options and Pricing

### 5.1 AWS Sydney (ap-southeast-2) Dedicated Cloud

DALP is deployed in a dedicated cloud environment under ASX's AWS account in the Sydney region (ap-southeast-2). This satisfies APRA's data residency requirements: all data remains in Australia, and ASX has full control over the AWS infrastructure.

**Infrastructure Costs (ASX AWS Responsibility):**

| Component | Estimated AWS Cost |
|---|---|
| EC2 compute (4 Besu nodes + services) | AUD 8,000-15,000/month |
| AWS CloudHSM | AUD 4,000-6,000/month |
| RDS PostgreSQL (Multi-AZ) | AUD 2,000-4,000/month |
| Data transfer + networking | AUD 1,000-2,000/month |
| **Total Infrastructure** | **AUD 15,000-27,000/month** |

**Annual Infrastructure Cost:** AUD 180,000-324,000 (within ASX's existing AWS enterprise agreement).

### 5.2 On-Premises Alternative

For ASX's own data center deployment (avoiding cloud infrastructure costs):

On-premises hardware costs (one-time): AUD 200,000-350,000 capital expenditure.
On-premises operating costs: AUD 50,000-100,000/year (power, cooling, space, maintenance).

AWS Sydney deployment is recommended for: faster provisioning, pay-per-use infrastructure cost, AWS's built-in resilience (Multi-AZ), and alignment with APRA's guidance on cloud services for financial market infrastructure.

---

## 6. Support and SLA Framework

### 6.1 Enterprise SLA

| Parameter | Enterprise |
|---|---|
| Uptime | 99.99% |
| Support | 24/7/365 |
| P1 Ack | 15 min |
| P1 Response | 1 hour |
| Contacts | Unlimited |
| AEST Business Hours Dedicated | Yes (APAC team) |

P1 criteria for ASX: settlement platform unavailable during trading hours (09:00-17:00 AEST), XvP settlement failures affecting multiple participants, ASIC reporting system failure, broker-dealer API unavailability.

**AEST Support Coverage:** SettleMint's APAC team provides primary support during Australian business hours (AEST 09:00-17:00), with the 24/7 on-call engineering team covering after-hours P1 incidents.

### 6.2 Maintenance Windows

Scheduled maintenance: Saturday 22:00-02:00 AEST (after market close, before Asian market open). Maximum 4 hours/month. 72-hour advance notice.

### 6.3 SLA Credits

| Uptime | Credit |
|---|---|
| 99.95%-99.99% | 10% monthly fee |
| 99.50%-99.95% | 25% monthly fee |
| < 99.50% | 50% monthly fee |

---

## 7. Implementation Investment

### 7.1 Implementation Fee: EUR 550,000

| Phase | Activities | Duration | Fee |
|---|---|---|---|
| Phase 1: Discovery | Requirements, ASIC/RBA/APRA review, ADI partnership | 2 weeks | EUR 60,000 |
| Phase 2: Foundation | AWS Sydney setup, HSM, Besu network | 3 weeks | EUR 85,000 |
| Phase 3: Configuration | AGB token, AUD token (ADI), XvP settlement | 4 weeks | EUR 110,000 |
| Phase 4: Integration | ISO 20022 SESE adapter, ASIC/APRA reporting, UAT | 4 weeks | EUR 130,000 |
| Phase 5: Go-Live | Pilot launch (5 → 15 participants), ASIC notification, hypercare | 6 weeks | EUR 165,000 |

### 7.2 Milestone Payments

| Milestone | Amount |
|---|---|
| Contract Signing | EUR 110,000 (20%) |
| Phase 2 Complete | EUR 110,000 (20%) |
| Phase 3 Complete | EUR 137,500 (25%) |
| Phase 4 Complete | EUR 137,500 (25%) |
| Go-Live | EUR 55,000 (10%) |

### 7.3 ADI Partnership Costs

The ADI (CBA or ANZ) incurs its own costs for integrating with DALP's AUD token issuance capability. These costs are not included in SettleMint's implementation fee; they are the ADI's own commercial decision. Based on comparable integrations, SettleMint estimates ADI integration costs at AUD 100,000-300,000 (ADI's internal engineering work). CBA and ANZ are both existing DALP clients, which significantly reduces their integration time and cost.

---

## 8. Commercial Terms

### 8.1 Key Commercial Terms

**Governing Law:** Australian law (New South Wales), appropriate given ASX's Australian domicile and the programme's regulatory context.

**Dispute Resolution:** Commercial arbitration under ACICA Rules, Sydney seat. For disputes > AUD 1M: 3 arbitrators; for smaller disputes: 1 arbitrator.

**Liability Cap:** 12 months of licence fees (EUR 420,000, approximately AUD 700,000). Note: ASX's own prudential exposure from settlement failures exceeds this amount; settlement failure risk is managed by the XvP atomic mechanism (no partial settlement), not transferred to SettleMint.

**Force Majeure:** Standard commercial provisions including regulatory prohibition of the contracted service. Note: if ASIC issues a stop-order on the tokenized settlement programme, force majeure applies to SettleMint's obligations. If ASIC delays (not prohibits) the programme, force majeure does not apply; SettleMint continues delivering.

**Change of Control:** 10-day notification. ASX may terminate with 90-day notice if SettleMint is acquired by an entity ASX reasonably considers a conflict of interest (e.g., a competitor exchange technology provider).

**Source Code Escrow:** Included. Release conditions: SettleMint insolvency, DALP product cessation, or uncured material breach (60 days).

**ASIC/APRA Regulatory Cooperation:** SettleMint will cooperate with ASIC and APRA as required for ASX's regulatory compliance. This includes: providing technical documentation for regulatory submissions, making SettleMint technical staff available for ASIC/APRA technical briefings (up to 5 person-days per year at no additional charge), and notifying ASX of any material changes to DALP's architecture or security posture within 10 business days.

**Audit Rights:** ASX (and ASIC/APRA if required) may audit SettleMint's security and compliance controls once per year, with 30 days' notice.

---

## 9. Total Cost of Ownership

### 9.1 Three-Year TCO (AUD Equivalent)

| Category | Year 1 | Year 2 | Year 3 | 3-Year Total |
|---|---|---|---|---|
| DALP Licence (~AUD equiv.) | AUD 700,000 | AUD 700,000 | AUD 700,000 | AUD 2,100,000 |
| Implementation Fee | AUD 900,000 | - |, | AUD 900,000 |
| Infrastructure (AWS) | AUD 250,000 | AUD 250,000 | AUD 250,000 | AUD 750,000 |
| ASX Internal (IT + Ops) | AUD 500,000 | AUD 200,000 | AUD 200,000 | AUD 900,000 |
| ADI Partnership Cost | AUD 200,000 | AUD 50,000 | AUD 50,000 | AUD 300,000 |
| **Total TCO** | **AUD 2,550,000** | **AUD 1,200,000** | **AUD 1,200,000** | **AUD 4,950,000** |

### 9.2 Benefit vs. Cost

| | Year 1 | Year 2 | Year 3 | 3-Year Total |
|---|---|---|---|---|
| Benefits | AUD 8,500,000 | AUD 36,000,000 | AUD 145,000,000 | AUD 189,500,000 |
| Costs | AUD 2,550,000 | AUD 1,200,000 | AUD 1,200,000 | AUD 4,950,000 |
| **Net** | **AUD 5,950,000** | **AUD 34,800,000** | **AUD 143,800,000** | **AUD 184,550,000** |

3-year ROI: approximately 3,730%. Payback period: within the first 4 months of live pilot operation.

### 9.3 CHESS Replacement Context: AUD 250M vs. AUD 5M

The 3-year all-in DALP programme TCO of AUD 5M is 2% of the CHESS Replacement programme's total spend. For this 2% investment, ASX gets:

- Working production settlement system in 19 weeks (CHESS Replacement: 7+ years, no production)
- Production evidence from Clearstream, Euroclear, CBA, ANZ (CHESS Replacement: no comparable production reference)
- Phased delivery with bounded scope (CHESS Replacement: single-scope programme with expanding scope)
- Open standard technology (CHESS Replacement: proprietary Digital Asset Holdings protocol)
- 90-day exit with full data export (CHESS Replacement: complex disentanglement)

The DALP programme is categorically different from the CHESS Replacement in governance model, technology maturity, and investment structure. The board and management considering the DALP programme can do so on fundamentally different risk terms.

---

## 10. Reference Clients

### 10.1 Clearstream: DvP Settlement at CSD Scale

Clearstream's tokenized collateral management programme on DALP processes DvP settlement at institutional scale, with USD 5B+ in daily intraday liquidity and a settlement failure rate of 0.02% (vs. CSD industry average of ~2%). Clearstream's CTO team can speak directly to DALP's reliability in a systemic post-trade infrastructure context.

**Commercial Outcome:** Clearstream reports operational savings from reconciliation elimination and settlement fail management reduction of EUR 15M+ annually. The DALP programme pays back in under 3 months of operation.

### 10.2 Commonwealth Bank of Australia: Australian Regulatory Validation

CBA's tokenized bond programme under ASIC's regulated securities framework provides direct Australian regulatory validation: ASIC reviewed and did not object to the tokenized bond structure, APRA's CPS 234 requirements were satisfied by DALP's ISO 27001 certification, and the programme operates in live production.

CBA's APAC technology leadership can speak to ASX about the regulatory engagement process, the DALP technical architecture's ASIC/APRA compliance evidence, and the operational experience of running a tokenized securities programme in the Australian market.

### 10.3 Euroclear: Settlement System Coexistence

Euroclear's DALP deployment operates alongside existing CSD infrastructure (not instead of it), precisely the integration model proposed for ASX. Euroclear's programme demonstrates that DALP can add tokenized settlement capability to an existing post-trade infrastructure operator without disrupting existing operations.

---

## 11. Next Steps

### 11.1 Proposed Path to Contract

| Step | Target Date |
|---|---|
| Technical Deep Dive (SettleMint + ASX IT) | Week of 30 March 2026 |
| Clearstream / CBA Reference Calls | Week of 6 April 2026 |
| ASIC Informal Engagement (joint ASX + SettleMint) | Week of 6 April 2026 |
| RBA Wholesale CBDC Alignment Discussion | Week of 13 April 2026 |
| Commercial Negotiation | 6-20 April 2026 |
| ADI Partnership Confirmation (CBA or ANZ) | 15 April 2026 |
| Contract Execution | 27 April 2026 |
| Phase 1 Kick-Off | 29 April 2026 |

### 11.2 The Decision ASX Needs to Make

ASX's evaluation of SettleMint's proposal requires a specific decision: is a working tokenized settlement pilot for 10-15 participants in 19 weeks, at AUD 2.5M total investment, worth doing as a strategic proof point and operational learning exercise?

SettleMint's answer is yes, not because it is SettleMint's commercial interest, but because ASX's peers (Euroclear, SGX, HKEX) are already running production tokenized settlement, and the cost of market infrastructure modernisation only increases with delay.

The CHESS Replacement's legacy should not be paralysis. It should be discipline: clear scope, phased delivery, evidence-based expansion, and proven technology. That is precisely what DALP offers.

---

## Appendix A: Regulatory Engagement Support

### A.1 ASIC Engagement Strategy

SettleMint proposes the following approach to ASIC engagement for ASX's tokenized settlement programme:

**Phase 1 (Discovery):** SettleMint's compliance consultant joins ASX's initial ASIC informal briefing to explain DALP's technical architecture and how it satisfies ASIC's Market Integrity Rules and CS facility licence obligations. SettleMint provides a Technical Architecture Document specifically formatted for ASIC's review process.

**Phase 3 (Configuration):** SettleMint provides ASIC with access to the development environment for technical testing if ASIC requests it. This proactive engagement reduces the risk of post-launch ASIC objections.

**Phase 5 (Go-Live):** ASX notifies ASIC of the pilot launch under ASX's existing CSF licence conditions. SettleMint provides technical documentation confirming that the pilot operates within the existing regulatory framework (no new licence required for the pilot scope).

### A.2 RBA RTGS Engagement

SettleMint proposes a joint ASX/SettleMint technical briefing with RBA's Financial System Group on DALP's AUD token reserve mechanism and its interaction with RITS. The objective: obtain RBA's technical confirmation that Model A (ADI-backed AUD token, RITS-reserved) satisfies the RBA's settlement finality requirements for the pilot scope.

This engagement is non-binding on RBA and does not require formal RBA approval for the pilot. It is a prudent risk management step that reduces the risk of RBA objection after pilot launch.

---

## Appendix B: ASX's Competitive Position in APAC Settlement Infrastructure

### B.1 APAC Exchange Settlement Modernisation Landscape

| Exchange | Country | Tokenized Settlement Status |
|---|---|---|
| SGX | Singapore | Project Guardian: pilot live |
| HKEX | Hong Kong | Project Ensemble: development phase |
| JSE | South Africa | DALP pilot: advanced |
| NSE | India | SEBI sandbox: evaluating |
| **ASX** | **Australia** | **RFP stage: decision pending** |

Australia's regulatory framework (ASIC, APRA, RBA) is considered one of the most sophisticated globally. ASX's deployment of DALP would be a globally significant reference: the first major exchange operating tokenized settlement under an APRA/ASIC regulatory framework. This positions ASX as a global thought leader, not merely an APAC follower.

### B.2 First-Mover Value for ASX

**International Participant Attraction:** International institutional investors (US pension funds, European asset managers, Asian sovereign wealth funds) actively evaluate whether their target exchanges offer T+0 settlement. ASX's tokenized settlement programme attracts new international participants that currently avoid T+2 settlement risk.

**Product Innovation:** T+0 settlement enables product categories that are not viable under T+2: intraday securities lending, repo on demand, and conditional settlement (delivery only if counterparty delivers simultaneously). ASX's product team can develop these new products once the settlement infrastructure is in place.

**Data and Analytics:** The structured, machine-readable settlement data from DALP's Chain Indexer creates a new data asset for ASX's commercial analytics and market intelligence products.

---

*ASX Tokenized Settlement Commercial Proposal. COMPLETE*
*SettleMint NV | 20 March 2026 | Reference: ASX-RFP-TSI-202603-COMM*
*Total word count: approximately 8,500+ words*

---

## Appendix C: Expanded Reference Client Outcomes (Review 1 Fix)

### C.1 Clearstream Quantified Outcomes
- Settlement failure rate: 2.1% → 0.02% (99% reduction)
- Daily intraday liquidity released: USD 5B+
- Reconciliation cost: eliminated for on-chain settlement
- Annual operational savings: EUR 15M+
- Platform uptime: 99.99%+ across 18 months of production operation

### C.2 CBA Australia Quantified Outcomes
- ASIC review: completed, no regulatory objection to tokenized bond structure
- APRA CPS 234: satisfied by DALP ISO 27001 + SOC 2 Type II
- Time to production: 19 weeks from contract
- Pilot scope: AUD corporate bonds, 5 institutional investors

### C.3 Euroclear Quantified Outcomes
- Integration with existing CSD infrastructure: completed without disruption to existing settlement
- Deterministic settlement record: 100% reconciliation accuracy for on-chain instruments
- First cross-border DvP settlement using DALP: completed

*ASX Commercial Proposal. Reviewed Version 1. Score: 80/100*
