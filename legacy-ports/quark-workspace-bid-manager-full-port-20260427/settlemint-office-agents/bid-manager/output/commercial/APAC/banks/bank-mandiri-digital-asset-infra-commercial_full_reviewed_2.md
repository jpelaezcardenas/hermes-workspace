# Commercial Proposal: Digital Asset Infrastructure Platform

**Prepared for:** PT Bank Mandiri (Persero) Tbk
**Date:** 20 March 2026
**Version:** 2.0 Reviewed
**Classification:** SettleMint Confidential. Invited Bidders Only
**Reference:** BANK-MANDIRI-RFP-202603

*All prices exclude applicable taxes and VAT, including Indonesian PPN (VAT at 11%) where applicable.*

---

## Table of Contents

1. Cover Page
2. Commercial Summary
3. Licensing Model
4. Implementation Services Pricing
5. Environment and Infrastructure Costs
6. Support and Maintenance Fees
7. Total Cost of Ownership Analysis
8. ROI Analysis
9. Payment Terms and Milestones
10. Commercial Assumptions Register
11. Exit and Transition Terms
12. Scaling Economics
13. Risk Allocation Matrix
14. Value Justification

---

## 1. Cover Page

**Document Title:** Commercial Proposal: Digital Asset Infrastructure Platform
**Client:** PT Bank Mandiri (Persero) Tbk, Indonesia
**Date:** 20 March 2026
**Version:** 2.0 Reviewed
**Prepared by:** SettleMint NV

---

## 2. Commercial Summary

PT Bank Mandiri (Persero) Tbk is Indonesia's largest state-owned bank and a systemically important financial institution. The commercial model for this programme reflects that institutional reality: transparent, auditable pricing consistent with BUMN procurement standards, with no volume-linked fees that create unpredictable cost growth as the programme scales across Indonesia's banking system.

SettleMint's pricing model is environment-based rather than transaction-based. This matters for Bank Mandiri because the programme's value proposition depends on digital assets becoming a mainstream operating model for Indonesia's wholesale banking ecosystem. A transaction-fee-based platform would impose costs that grow linearly with adoption, creating a perverse incentive to restrict digital asset usage. An environment-based model means that scaling from 100 to 10,000 digital asset transactions per day costs Bank Mandiri nothing in additional platform fees.

**Year 1 Platform License Summary:**

| Component | Annual Cost (EUR) |
|-----------|------------------|
| Production License | 300,000 |
| Development License | 120,000 |
| **Total Year 1 Platform License** | **420,000** |

*All prices exclude applicable taxes and VAT including Indonesian PPN. Annual, upfront.*

**Programme Investment Summary (3-Year Baseline):**

| Category | Year 1 (EUR) | Year 2 (EUR) | Year 3 (EUR) | 3-Year Total (EUR) |
|----------|-------------|-------------|-------------|-------------------|
| Platform License | 420,000 | 420,000 | 420,000 | 1,260,000 |
| Implementation | 500,000-650,000 | - |, | 500,000-650,000 |
| Enterprise Support | 120,000-150,000 | 120,000-150,000 | 120,000-150,000 | 360,000-450,000 |
| AWS Jakarta Infrastructure | ~55,000 | ~60,000 | ~65,000 | ~180,000 |
| **Total Range** | | | | **2,300,000-2,540,000** |

IDR equivalent at EUR 1 = IDR 17,000 (indicative): IDR 39.1 billion to IDR 43.2 billion over three years.

---

## 3. Licensing Model

### 3.1 BUMN-Compatible Pricing Structure

Bank Mandiri's procurement operates under BUMN (Badan Usaha Milik Negara) governance requirements. SettleMint's pricing model is designed to be transparent and auditable for BUMN procurement review.

**Environment-based, not usage-based:** License fees are per environment, not per transaction, per token, or per counterparty. The programme price is predictable regardless of the scale of Bank Mandiri's digital asset activity. This is particularly important for BUMN budget planning: the budget committee can commit to a fixed annual platform cost without modelling transaction volume scenarios.

**No hidden commercial traps:** All pricing, minimum commitments, and expansion costs are stated explicitly in this proposal. There are no volume thresholds, no tier-up provisions, and no transaction fees that emerge as the programme scales.

**Annual, upfront:** All license payments are annual and paid upfront, consistent with BUMN's preference for annual budget commitments rather than monthly variable costs.

### 3.2 License Rates

| Environment | Monthly Equivalent | Annual Fee (Upfront) |
|-------------|------------------|---------------------|
| Production | EUR 25,000/month | EUR 300,000/year |
| Development | EUR 10,000/month | EUR 120,000/year |

*All prices exclude applicable taxes and VAT including Indonesian PPN.*

### 3.3 Value-Based Justification for License Rates

The EUR 25,000/month production license represents the core infrastructure investment for Bank Mandiri's digital asset programme. The value this enables:

**SBN settlement efficiency:** Bank Mandiri handles approximately IDR 50-100 trillion in SBN trading annually as a primary dealer. The current T+2 settlement cycle means Bank Mandiri carries settlement exposure of approximately IDR 274-548 billion per trading day (total annual volume divided by 250 trading days). T+0 atomic settlement through DALP eliminates this exposure. Even at a conservative 1 basis point capital charge on unsettled positions, this represents IDR 2.7-5.5 billion in annual capital relief, equivalent to EUR 160,000-325,000 at current exchange rates. The platform license pays for itself from settlement efficiency alone.

**Operational automation:** Manual SBN coupon distribution across hundreds of institutional investors requires dedicated operations staffing. DALP's automated yield distribution eliminates the per-event manual calculation, verification, and distribution overhead. At Bank Mandiri's scale, this represents 2-4 operations FTE equivalent savings per major bond issuance lifecycle event.

**OJK compliance overhead reduction:** Currently, Bank Mandiri's compliance team manually verifies investor eligibility for each digital securities transaction. DALP's on-chain eligibility verification eliminates this manual step, reducing compliance operations overhead for digital securities to exception-only management.

### 3.4 IDR Equivalent Reference Pricing

For BUMN budget planning purposes, the EUR/IDR equivalent at reference exchange rate (EUR 1 = IDR 17,000, indicative):

| Environment | Annual Fee (IDR equivalent, indicative) |
|-------------|----------------------------------------|
| Production | IDR 5,100,000,000 (IDR 5.1 billion) |
| Development | IDR 2,040,000,000 (IDR 2.04 billion) |
| **Combined Annual Platform License** | **IDR 7,140,000,000 (IDR 7.14 billion)** |

*IDR equivalent provided for planning only. Actual invoicing in EUR. Exchange rate fixed at contract execution for 12-month periods per Section 10.*

### 3.5 Multi-Environment Economics

Bank Mandiri's programme requires at minimum two environments (development and production). The development environment at EUR 10,000/month provides a persistent non-production environment for:

- Integration development for BI-FAST, KSEI, OJK reporting, and core banking connections
- Compliance module configuration testing before production deployment
- New instrument type development (corporate bonds, new sukuk structures)
- Regression testing for platform updates before production rollout
- Training environment for Bank Mandiri's operations and compliance teams

The development environment is essential infrastructure for a programme of this complexity. Attempting to use production as a development environment creates unacceptable operational risk for a SIFI.

### 3.6 Expansion Licensing

| Scenario | Incremental Annual License (EUR) |
|----------|----------------------------------|
| Add Bank Syariah Indonesia (BSI) separate production environment | 300,000 (production) + 120,000 (development) |
| Add staging/UAT environment | 120,000 |
| Add BTPN (Bank Mandiri subsidiary) production environment | 300,000 |
| Add pre-production environment for enhanced release management | 120,000 |

### 3.7 Minimum Commitment and Price Hold

- **Minimum term:** 3 years from production go-live
- **Price hold:** 90 days from proposal submission (until 19 June 2026)
- **Annual price increase cap:** Lower of 5% or EU HICP for years 2 onwards
- **Multi-year discount:** Available on request for 5-year commitment

---

## 4. Implementation Services Pricing

### 4.1 Implementation Investment

The 23-week implementation timeline (extended from the standard 19-week timeline for private network setup, Indonesia-specific regulatory alignment, and BUMN governance) generates an implementation investment that reflects the genuine complexity of Bank Mandiri's programme.

**Implementation Scope Scenarios:**

| Scenario | Description | Indicative Range (EUR) |
|----------|-------------|----------------------|
| Core Programme | IDR deposits + SBN + BI-FAST + OJK reporting + private Besu network | 450,000-600,000 |
| Full Programme | Core + Sukuk + BSI Islamic finance + KSEI integration | 600,000-850,000 |
| Full Programme + BI observer node + Government banking | Full + BI observer setup + Ministry of Finance integration | 700,000-950,000 |

*Formal scoping in Phase 1. SOW signed before Phase 2 commences.*

### 4.2 Phase-by-Phase Cost Breakdown

| Phase | Duration | Billing Model | Indicative Cost (EUR, Core Programme) |
|-------|----------|---------------|--------------------------------------|
| Phase 1: Discovery and Requirements | 3 weeks | Fixed milestone | 60,000-80,000 |
| Phase 2: Network and Platform Setup | 4 weeks | Fixed milestone | 90,000-120,000 |
| Phase 3: Asset Configuration and Compliance | 4 weeks | Fixed milestone | 70,000-100,000 |
| Phase 4: Integration Development | 4 weeks | T&M with ceiling | 100,000-150,000 |
| Phase 5-6: Testing, UAT, and Go-Live | 4 weeks | Fixed milestone | 70,000-90,000 |
| Phase 7: Hypercare | 4 weeks | Fixed milestone | 60,000-70,000 |

*Phase 4 is T&M with ceiling because integration complexity with BI-FAST, KSEI, and OJK reporting systems depends on third-party cooperation and API readiness outside SettleMint's control. The ceiling protects Bank Mandiri from cost overrun.*

### 4.3 Resource Model

**SettleMint Delivery Team:**

| Role | Allocation | Day Rate (EUR) |
|------|-----------|---------------|
| Delivery Lead | Full-time for phases 1-6, part-time hypercare | Included in fixed milestone |
| Solution Architect | Full-time phases 1-2, part-time phases 3-4 | Included in fixed milestone |
| Platform Engineer (2 FTE) | Full-time phases 2-5 | Included in fixed milestone |
| QA/Test Lead | Part-time phase 3, full-time phase 4 | Included in fixed milestone |

The fixed milestone billing model means Bank Mandiri's implementation cost is predictable and not subject to SettleMint's internal effort variability. SettleMint bears the efficiency risk.

### 4.4 BUMN Documentation (Included in Scope)

Implementation includes BUMN governance documentation at no additional charge:
- Detailed technical documentation in English and Bahasa Indonesia
- OJK vendor assessment package (ISO 27001, SOC 2 Type II, data residency evidence)
- BI information security assessment materials (SPIBE alignment)
- BUMN-standard due diligence package
- Programme governance documentation for BUMN review

This documentation preparation is included within the implementation scope. Bank Mandiri's BUMN procurement process must complete before Phase 2 commencement; Phase 1 delivers the documentation Bank Mandiri's procurement team needs.

### 4.5 Optional Scope Packages

| Package | Description | Cost (EUR) |
|---------|-------------|-----------|
| BSI Islamic Finance Module | Full sukuk tokenization with Sharia Advisory Board integration and AAOIFI reporting | 80,000-150,000 |
| KSEI Deep Integration | Full mirror ledger synchronization with KSEI depository API | 60,000-120,000 |
| BI Observer Node Setup | Technical setup for Bank Indonesia observer node on private Besu network | 30,000-60,000 |
| Government Banking Pack | Ministry of Finance and government treasury integration | 50,000-100,000 |
| Corporate Bond Module | Full corporate bond instrument template with credit monitoring | 40,000-80,000 |

Optional packages can be scoped during Phase 1 or added post-go-live. Post-go-live additions are lower risk because the core platform is already stable.

---

## 5. Environment and Infrastructure Costs

### 5.1 AWS Jakarta (ap-southeast-3): Pass-Through at Actual Cost

AWS Jakarta infrastructure costs are passed through at actual AWS pricing without markup. Bank Mandiri's existing AWS enterprise agreement (if applicable) may reduce these costs.

| Component | Indicative Annual Cost (USD) |
|-----------|------------------------------|
| EKS cluster (compute: 6 nodes, 8 vCPU/32GB each) | 28,000-40,000 |
| Aurora PostgreSQL Multi-AZ (db.r6g.xlarge) | 14,000-20,000 |
| ElastiCache Redis (r6g.large, Multi-AZ) | 5,000-8,000 |
| AWS KMS (Jakarta): key operations | 2,000-4,000 |
| S3 (Jakarta): storage and data transfer | 3,000-6,000 |
| Network (load balancer, data transfer) | 4,000-8,000 |
| **AWS Jakarta total** | **56,000-86,000/year USD** |

*EUR equivalent at USD 1 = EUR 0.92 (indicative): EUR 52,000-79,000/year. Bank Mandiri bills AWS directly; SettleMint reconciles pass-through costs quarterly.*

### 5.2 On-Premises Infrastructure (Besu Validators): Bank Mandiri Owned

Bank Mandiri provides the server infrastructure for four Hyperledger Besu validators within its Indonesian data centers. SettleMint provides:
- Kubernetes deployment configurations for Besu validators
- Network configuration specifications (genesis block, consensus parameters, permissioned node management)
- Operational runbooks for validator management and monitoring

Bank Mandiri's infrastructure operations team manages the validator hardware. These are Bank Mandiri's internal infrastructure costs and are not part of SettleMint's commercial scope. Indicative validator hardware requirement: 4 servers, minimum 8 vCPU / 32GB RAM each, 2TB SSD storage each.

### 5.3 Third-Party Pass-Through

| Service | Commercial Arrangement |
|---------|------------------------|
| HSM hardware | Bank Mandiri provides on-premises HSM (existing or new purchase); SettleMint supports integration at no additional charge |
| KSEI interface | KSEI membership fees managed by Bank Mandiri; SettleMint integrates to KSEI API |
| BI-FAST access | Through Bank Mandiri's existing BI-FAST membership; no new fees |
| DFNS or Fireblocks MPC custody (optional) | Bank Mandiri negotiates directly with custody provider; SettleMint integration included in implementation scope |

---

## 6. Support and Maintenance Fees

### 6.1 Support Tier Comparison

| Attribute | Standard | Premium | Enterprise |
|---|---|---|---|
| Coverage Hours | 09:00-18:00 CET, Mon-Fri | 07:00-22:00 CET + P1 weekends | 24/7/365 |
| P1 Response | 4 hours | 1 hour | 15 minutes |
| P1 Resolution | 8 hours | 4 hours | 2 hours |
| P2 Response | 8 hours | 4 hours | 1 hour |
| P3 Response | 2 business days | 1 business day | 4 hours |
| Uptime SLA | 99.9% | 99.95% | 99.99% |
| Named Contacts | 3 | 8 | Unlimited |
| Designated Engineer | Shared pool | Named individual | Named team |
| Business Reviews | Quarterly | Monthly | Bi-weekly |
| Architecture Reviews | None | None | Quarterly |
| Channels | Email, portal | + Slack/Teams, phone | + Video escalation |
| Release Cadence | Quarterly | Monthly | Continuous |

### 6.2 Enterprise Support: Required for Bank Mandiri

Enterprise Support (24/7/365) is required for Bank Mandiri's digital asset infrastructure programme. As a systemically important financial institution operating critical digital asset infrastructure for wholesale banking operations, Bank Mandiri cannot accept Standard or Premium support levels for the following reasons:

**Regulatory expectation:** Bank Indonesia's SPIBE standards create specific operational resilience requirements for Indonesian banks. A 4-hour P1 response time (Standard support) is inconsistent with SPIBE's requirements for systemically important financial infrastructure. Enterprise support's 15-minute P1 response satisfies BI's operational resilience expectations.

**Time zone coverage:** Bank Mandiri's operations run in WIB (UTC+7). Standard support (09:00-18:00 CET) covers only 14:00-23:00 WIB, leaving Bank Mandiri's business hours (08:00-17:00 WIB) without coverage. Enterprise's 24/7/365 coverage ensures support is always available during Bank Mandiri's trading day.

**Settlement criticality:** A P1 incident (DALP DvP settlement failure) during Bank Mandiri's wholesale trading hours has immediate financial consequences. Enterprise's 2-hour P1 resolution target limits settlement disruption to an operationally acceptable window.

**Enterprise Support Annual Fee:** [CLIENT-SPECIFIC] Indicative range EUR 120,000-150,000/year based on programme scope, number of authorized contacts, and operational complexity.

*Support fees are in EUR, paid annually in advance.*

### 6.3 Support Scope for Bank Mandiri

Enterprise Support covers:
- Platform-level incidents (DAPI, dApp, Execution Engine, Key Guardian, Chain Indexer, Chain Gateway)
- Smart contract layer issues (compliance module behavior, token feature malfunctions)
- Besu network issues (consensus failures, RPC connectivity degradation) in coordination with Bank Mandiri's Technology team
- Integration issues at the DALP boundary (webhook delivery failures, API rate limiting)
- Release management (coordinating platform updates with Bank Mandiri's change management process)

Support does not cover: Bank Mandiri's internal infrastructure (AWS account management, Besu validator hardware), third-party integrations (BI-FAST, KSEI, OJK reporting systems) beyond the DALP API boundary, or business process issues unrelated to platform behavior.

---

## 7. Total Cost of Ownership Analysis

### 7.1 Five-Year TCO Projection

| Category | Year 1 (EUR) | Year 2 (EUR) | Year 3 (EUR) | Year 4 (EUR) | Year 5 (EUR) | 5-Year Total (EUR) |
|----------|-------------|-------------|-------------|-------------|-------------|-------------------|
| Platform License | 420,000 | 420,000 | 420,000 | 441,000 | 441,000 | 2,142,000 |
| Implementation | 575,000 | - |, | - |, | 575,000 |
| Enterprise Support | 135,000 | 135,000 | 135,000 | 141,750 | 141,750 | 688,500 |
| AWS Jakarta Infrastructure | 62,000 | 67,000 | 72,000 | 77,000 | 82,000 | 360,000 |
| Optional packages (BSI sukuk, KSEI, BI observer) | 200,000 | - |, | - |, | 200,000 |
| **Total Range** | **~1,392,000** | **~622,000** | **~627,000** | **~660,000** | **~665,000** | **~3,966,000** |

*Year 4 and 5 include a 5% annual increase applied to License and Support from Year 3.*
*Optional packages assumed implemented in Year 1 alongside core programme. Adjust as scope is confirmed.*

### 7.2 TCO Sensitivity Analysis

**Scenario A: Core Programme Only (SBN + IDR deposits)**
5-year TCO: approximately EUR 3.2 million. Excludes BSI sukuk, KSEI deep integration, BI observer node, and government banking optional packages.

**Scenario B: Full Programme (Core + BSI + KSEI + All optionals)**
5-year TCO: approximately EUR 3.97 million as shown above.

**Scenario C: Expansion to BSI as Separate Environment (Year 2)**
Add EUR 420,000/year from Year 2 onwards (BSI production + development environments). 5-year TCO: approximately EUR 5.6 million. Appropriate if BSI requires regulatory separation of its digital asset operations from Bank Mandiri's wholesale banking programme.

**Scenario D: No AWS Jakarta (Fully On-Premises)**
Eliminates AWS pass-through costs. Bank Mandiri's internal infrastructure costs replace AWS charges. Typically more expensive when Bank Mandiri's full infrastructure capex and operations overhead is accounted, but may be required for maximum data sovereignty compliance.

### 7.3 SBI Reference: Investment Level for State-Owned Bank Digital Infrastructure

For BUMN budget committee context: the State Bank of India CBDC infrastructure engagement with SettleMint is the closest comparable programme. SBI's engagement, also a systemically important state-owned bank implementing digital currency infrastructure under central bank oversight, demonstrates that the investment level proposed in this commercial proposal is appropriate for the scale and institutional complexity of Bank Mandiri's programme.

---

## 8. ROI Analysis

### 8.1 ROI Framework for Bank Mandiri

Return on investment for Bank Mandiri's digital asset infrastructure programme comes from three sources: operational cost reduction (immediate), capital efficiency improvement (immediate), and revenue expansion opportunity (medium-term, beyond scope of this commercial proposal).

### 8.2 Settlement Efficiency ROI

**Current state:** Bank Mandiri's SBN primary dealer and secondary market operations operate on T+2 settlement through KSEI. Settlement exposure accumulates over the 2-day window.

**Quantified settlement exposure:** At IDR 100 trillion in annual SBN trading (conservative estimate for Bank Mandiri's primary dealer and institutional client flow), the average daily unsettled position is:
- IDR 100 trillion / 250 trading days = IDR 400 billion average daily flow
- T+2 settlement means 2 days of exposure: IDR 800 billion in average unsettled position at any time

**Capital cost of settlement exposure:** Bank Indonesia's minimum capital requirements for settlement risk require capital allocation against unsettled positions. At a conservative 8% capital charge and Bank Indonesia's cost of capital (approximately 6-8% for a SIFI), the annual capital cost of IDR 800 billion settlement exposure is:
- Capital required: IDR 800 billion × 8% = IDR 64 billion
- Annual cost of capital at 7%: IDR 64 billion × 7% = IDR 4.48 billion (approximately EUR 264,000/year at IDR 17,000/EUR)

**DALP impact:** T+0 atomic DvP settlement eliminates the 2-day unsettled position for transactions settled on-chain. Even capturing 20% of Bank Mandiri's SBN flow through tokenized settlement in Year 2 of the programme generates IDR 896 million in annual capital cost savings, equivalent to EUR 53,000/year, covering approximately 18% of the annual development environment license fee.

At full programme maturity (50% of SBN flow through tokenized settlement by Year 3), capital cost savings reach EUR 132,000/year, covering approximately 31% of the annual production platform license.

### 8.3 Operational Cost Reduction ROI

**Current state:** Bank Mandiri's Operations team manually processes SBN coupon distributions, conducting investor-by-investor calculation, verification, and payment instruction generation. For a 150-investor SBN with semi-annual coupons, this requires approximately 3 FTE-days per distribution event.

**DALP impact:** Automated yield distribution reduces the distribution event to: pre-fund treasury (1 hour), activate distribution (5 minutes), review distribution report (1 hour). Total: approximately 2 hours of operations time versus 3 FTE-days.

**Quantified savings:** At Bank Mandiri's operations team blended cost of approximately IDR 800,000/person-day (including oncosts), the saving per distribution event is:
- Current: 3 FTE × 3 days × IDR 800,000 = IDR 7.2 million per event
- DALP: 2 person-hours × IDR 800,000/day ÷ 8 = IDR 200,000 per event
- Saving: IDR 7.0 million per event

At 10 distribution events per year (combining SBN coupons, sukuk profit distributions, and corporate bond coupons), annual operational savings: IDR 70 million (approximately EUR 4,100/year).

Over 5 years, compounding across more instruments as the programme matures, total operational savings in distribution processing alone reach IDR 500-700 million (EUR 29,000-41,000). This is a secondary benefit; the capital efficiency and compliance overhead reductions are more material.

### 8.4 Compliance Operations ROI

**Current state:** OJK investor eligibility verification for digital securities transfers is manual: compliance officers review each investor's documentation before approving transfers. For wholesale transactions with institutional clients, this typically takes 1-2 business days.

**DALP impact:** On-chain eligibility enforcement eliminates the manual verification step for already-KYC'd counterparties. Bank Mandiri's compliance team manages exceptions only, investors with expiring claims or new counterparties requiring onboarding.

**Quantified savings:** If Bank Mandiri processes 500 digital securities transfers annually requiring eligibility verification (conservative for a wholesale programme), and each manual verification costs 2 hours of compliance officer time at IDR 1.2 million/day:
- Current: 500 transfers × 2 hours × IDR 1.2M/day ÷ 8 = IDR 150 million/year
- DALP: 500 transfers × 5 minutes (exception review only, assuming 5% exception rate) = IDR 7.5 million/year
- Saving: IDR 142.5 million/year (approximately EUR 8,400/year)

Over 5 years with programme scale-up: IDR 1.5-2 billion in compliance operations savings.

### 8.5 Strategic Positioning Value

Indonesia's digital asset market is at an inflection point. OJK's progressive regulatory approach, Bank Indonesia's CBDC exploration, and BI-FAST's real-time payment infrastructure create conditions for significant digital asset growth. Bank Mandiri, as Indonesia's largest state-owned bank, is naturally positioned to be the anchor institution for Indonesia's wholesale digital asset ecosystem.

The programme's strategic value cannot be reduced to a line item in an ROI model. The institution that builds institutional-grade digital asset infrastructure first, and builds it correctly, captures a structural advantage in Indonesia's emerging wholesale digital market. Bank Mandiri's BUMN governance obligations, regulatory relationships, and primary dealer status create a defensible position that a commercial bank entrant cannot easily replicate.

SettleMint's references include institutions that have achieved first-mover advantage in their respective markets through early DALP deployment: OCBC Bank in Singapore's wealth management tokenization market, Commerzbank in Germany's Exchange-Traded Product issuance market, and Sony Bank in Japan's digital identity-enabled banking segment.

---

## 9. Payment Terms and Milestones

### 9.1 BUMN Payment Compliance

SettleMint's payment terms are designed to be compatible with BUMN procurement payment cycles. Platform license payments may be structured to align with Bank Mandiri's fiscal year budget cycle (January-December) with appropriate annual advance payment provisions.

### 9.2 Platform License Payment Terms

**Annual, upfront.** Invoiced in EUR (IDR equivalent provided for BUMN planning purposes). Payment within 30 days of invoice. First invoice issued upon contract execution.

**Exchange rate:** EUR/IDR exchange rate fixed at contract execution for the 12-month period. Rate source: Bank Indonesia mid-market rate on contract execution date. Rate locked at the start of each subsequent annual period.

### 9.3 Implementation Milestone Payment Schedule

| Milestone | Description | Trigger | Percentage |
|-----------|-------------|---------|-----------|
| M1: Contract Execution | Signed contract and BUMN documentation complete | Contract signed by both parties | 15% |
| M2: Phase 1 Complete | BRD, Regulatory Matrix, Target Architecture, BUMN documentation delivered and accepted | Bank Mandiri Project Manager acceptance sign-off | 15% |
| M3: Phase 2 Complete | All three environments operational, Besu network running, identity framework deployed | Environment validation report accepted by Bank Mandiri Technical Lead | 15% |
| M4: Phase 3 Complete | All four asset types configured, compliance modules deployed, test evidence accepted | Compliance team sign-off on OJK compliance module tests | 15% |
| M5: Phase 4 Complete | All integrations operational in staging, integration testing evidence accepted | Bank Mandiri Technical Lead acceptance | 20% |
| M6: UAT Sign-Off | UAT sign-off received from all designated stakeholder groups | UAT sign-off documents received | 10% |
| M7: Go-Live + Hypercare Complete | Production go-live and 4-week hypercare completed | Operational readiness assessment passed | 10% |

**Total: 100% of implementation fee.**

Milestone payment terms: 30 days from acceptance of each deliverable. If a milestone acceptance is delayed by Bank Mandiri by more than 10 business days beyond the planned completion date with no material defect identified, payment falls due at the planned completion date.

### 9.4 Support Fee Payment Terms

Annual Enterprise Support fee invoiced at the start of each support year (coinciding with the production go-live anniversary). Payment within 30 days of invoice.

---

## 10. Commercial Assumptions Register

| Assumption | Detail |
|-----------|--------|
| Currency | EUR invoicing; IDR equivalent provided for BUMN planning at contract-execution rate |
| PPN (VAT) | Indonesian PPN (11%) applied to services delivered in Indonesia per applicable tax law; Bank Mandiri responsible for PPN remittance on imported services |
| Minimum term | 3 years from production go-live |
| Payment | Annual, upfront for platform license; milestone-based for implementation |
| Exchange rate lock | EUR/IDR rate locked at contract execution for 12-month periods; reset at start of each annual period |
| Price hold | 90 days from proposal submission (until 19 June 2026) |
| Annual increase cap | Lower of 5% or EU HICP from Year 2 onwards |
| BUMN procurement | Implementation assumes BUMN procurement process completes within Phase 1 timeline (Weeks 1-3); SettleMint provides full BUMN due diligence package in Phase 1 |
| Bank Mandiri infrastructure | Hyperledger Besu validator hardware (4 servers) provided by Bank Mandiri within its data centers; hardware specification to be confirmed in Phase 1 |
| BI-FAST access | Through Bank Mandiri's existing BI-FAST membership; no new BI-FAST membership fees anticipated |
| Sharia Advisory Board | BSI's Sharia Advisory Board review of sukuk token structures is Bank Mandiri's responsibility; SettleMint provides technical design documentation and configures the trusted issuer mechanism |
| OJK regulatory approval | Any new OJK regulatory approvals required for tokenized securities are Bank Mandiri's responsibility; SettleMint provides technical platform compliance documentation |
| KSEI interface | KSEI technical cooperation for mirror ledger integration is outside SettleMint's control; phased scope accommodates KSEI readiness, internal DALP ledger first, KSEI integration when KSEI API is available |
| AWS Jakarta pass-through | AWS Jakarta costs passed through at actual AWS billing without markup; Bank Mandiri's existing AWS agreements may reduce costs |
| DFNS/Fireblocks (optional) | If Bank Mandiri elects MPC custody, Bank Mandiri negotiates directly with custody provider; SettleMint integration of custody provider included in implementation scope |
| Phases are sequential | Implementation phases 1-7 are sequential. Parallel phase execution is not supported by default; phasing can be discussed during Phase 1 if Bank Mandiri has compelling timeline requirements |

---

## 11. Exit and Transition Terms

### 11.1 BUMN Exit Documentation Requirements

On contract termination or non-renewal, SettleMint provides the following within 30 days of termination notice:

**Complete documentation package:**
- Full platform configuration documentation in English and Bahasa Indonesia
- All technical documentation (API specifications, integration design, deployment architecture, compliance module configuration)
- Operational runbooks sufficient for Bank Mandiri's IT team to manage and operate the platform independently
- Formal knowledge transfer certification confirming Bank Mandiri's operational team competency

**90-day technical transition support:** SettleMint provides 90 days of technical support post-termination to assist Bank Mandiri's team in managing the platform, resolving issues, and planning migration to an alternative solution. Transition support is provided at Enterprise Support terms.

### 11.2 Data Sovereignty on Exit

**Blockchain data:** On-chain data (SBN transaction history, sukuk distribution records, investor registry, compliance events) remains on the private Besu network validators within Bank Mandiri's data centers. Contract termination with SettleMint does not affect the on-chain data or Bank Mandiri's control over the blockchain network it operates. Bank Mandiri owns the Besu validators; the blockchain persists indefinitely regardless of the commercial relationship.

**Platform data (off-chain):** DALP platform data (PostgreSQL indexed data, transaction records, compliance state) is exportable through the API in standard JSON formats and directly from the PostgreSQL database. No proprietary format lock-in applies. Bank Mandiri can export all off-chain data before contract termination.

**Container images:** DALP container images used by Bank Mandiri are provided as part of the license. On termination, Bank Mandiri retains access to the container images of the version running at the time of termination for 24 months, enabling continued operation of the existing platform during any migration period.

**Configuration:** All Bank Mandiri-specific configuration (Helm values, compliance module parameters, instrument templates) is exported in standard YAML format. Configuration files are Bank Mandiri's intellectual property and are not subject to SettleMint licensing restrictions.

### 11.3 OJK Transition Requirements

Bank Mandiri's OJK obligations continue regardless of the technology vendor relationship. The transition plan includes:

**Regulatory notification:** Any change in digital asset infrastructure vendor requires notification to OJK consistent with OJK's technology outsourcing regulations. SettleMint provides regulatory notification documentation templates and supports Bank Mandiri in preparing OJK-required disclosures.

**Operational continuity:** DALP's open API and standard data export ensure that a successor platform can consume historical transaction data, investor registry records, and compliance event logs. No proprietary format prevents migration.

**OJK reporting continuity:** During the transition period, OJK reporting obligations continue. SettleMint ensures that all OJK reporting data pipelines operate until the transition is complete, not merely until the commercial contract expires.

### 11.4 Transition Scenarios

**Scenario 1: Migration to alternative platform.** Bank Mandiri selects a replacement digital asset platform. SettleMint supports: data export in standard formats, integration documentation for the replacement platform's team, API specification sharing, and 90-day technical transition support. No platform lock-in prevents migration.

**Scenario 2: In-house operation of DALP.** Bank Mandiri elects to operate the DALP platform independently using open-source components and their own engineering team. SettleMint provides: complete Helm chart configurations, container images, operational documentation, and 90-day technical handover support.

**Scenario 3: Contract non-renewal with extended wind-down.** Bank Mandiri requires more than 90 days for transition. Extended transition support is available at agreed professional services day rates. SettleMint supports Bank Mandiri's transition timeline without imposing artificial urgency.

---

## 12. Scaling Economics

### 12.1 From Pilot to Programme to Platform

The commercial model is designed to support Bank Mandiri's journey from initial pilot (SBN + IDR deposits) through full programme (sukuk, corporate bonds, Islamic finance) to platform (BSI separate environment, BTPN integration, government banking expansion) without requiring commercial renegotiation at each stage.

**Pilot scope (Year 1):** Production environment (EUR 300,000/year) + development environment (EUR 120,000/year) = EUR 420,000/year. This supports SBN tokenization, IDR deposit tokens, BI-FAST integration, and OJK reporting at any transaction volume.

**Full programme scope (Year 2-3):** Same environment pricing (EUR 420,000/year) regardless of whether Bank Mandiri has 100 or 10,000 investors, 10 or 100 bond instruments, or IDR 100 billion or IDR 10 trillion in tokenized assets under management. The incremental cost of programme scale is zero in platform licensing terms.

**Platform scope (Year 3+):** Adding Bank Syariah Indonesia as a separate production environment costs EUR 300,000/year (production) + EUR 120,000/year (development) = EUR 420,000/year incremental. Adding BTPN adds another EUR 300,000/year (production-only if development is shared). Each subsidiary adds a predictable, budgetable incremental cost, not an open-ended commercial discussion.

### 12.2 Transaction Volume: No Cost Scaling

The most important scaling characteristic of DALP's commercial model is that transaction volume does not affect platform cost. There is no per-transaction fee, no volume tier, and no usage-based pricing component. Bank Mandiri can scale from:

- 10 digital asset transfers per day to 10,000 per day: zero incremental license cost
- 10 tokenized bonds outstanding to 100: zero incremental license cost
- 50 institutional investors to 5,000: zero incremental license cost
- IDR 100 billion AUM to IDR 10 trillion AUM: zero incremental license cost

This is a fundamental difference from transaction-fee-based platforms, where success (higher adoption, higher volumes) creates higher costs, making the business case for digital assets harder to sustain as the programme grows.

### 12.3 Geographic Expansion

If Bank Mandiri pursues regional expansion (for example, tokenized cross-border settlement with Malaysian or Singaporean counterparties), the commercial model accommodates:

**Single deployment with multi-jurisdiction compliance:** DALP's compliance engine supports per-token, per-jurisdiction compliance module configuration. A single production environment can serve both Indonesian domestic operations and cross-border operations with different compliance rules per instrument. No additional environment is required for cross-border functionality.

**Additional jurisdiction environment (if required):** If Bank Mandiri or its regulators require a separate production environment for cross-border operations (for example, a Singapore-based environment for MAS-regulated activity), the incremental cost is EUR 300,000/year (additional production environment). This is a governed, predictable expansion cost, not an open-ended commercial renegotiation.

### 12.4 Technology Refresh Cycle

DALP's continuous delivery (Enterprise tier) means Bank Mandiri receives platform improvements throughout the contract period at no additional cost. This includes:

- New compliance module types (as DALP's module library expands to cover additional OJK/BI requirements)
- New token features (as the DALP feature catalog grows)
- Performance improvements (reducing Besu transaction processing latency, improving indexer throughput)
- Security updates (addressing CVEs, updating dependencies, patching vulnerabilities)
- Integration improvements (ISO 20022 message format updates, BI-FAST API version upgrades)

Bank Mandiri does not pay for platform improvements separately. The enterprise license includes the full product roadmap.

---

## 13. Risk Allocation Matrix

### 13.1 Commercial Risk Allocation

| Risk | Bank Mandiri Responsibility | SettleMint Responsibility | Shared |
|------|---------------------------|--------------------------|--------|
| Platform software quality (bugs, performance) | None | Full: SLA credits, root cause analysis, fix delivery | - |
| Platform uptime (99.99% SLA) | None | Full: SLA monitoring, service credits for breach | - |
| AWS Jakarta infrastructure availability | None | Full: infrastructure management, failover, DR | - |
| Besu validator node operations | Full: hardware, network, datacenter | Support: monitoring visibility, runbooks, P1 response | - |
| BI-FAST integration availability | Full: BI-FAST membership, BI cooperation | Support: DALP API integration, troubleshooting | - |
| KSEI integration availability | Full: KSEI membership, KSEI cooperation | Support: DALP API integration, troubleshooting | - |
| OJK regulatory approval for tokenized instruments | Full: regulatory engagement, approval applications | Support: technical compliance documentation | - |
| BUMN procurement completion timeline | Full | Support: documentation preparation in Phase 1 | - |
| Sharia Advisory Board review of sukuk tokens | Full: SAB engagement, SAB approval | Support: technical design documentation | - |
| Key material custody (on-premises HSM) | Full: HSM hardware, physical security | Integration: Key Guardian integration, procedures | - |
| Exchange rate movements (EUR/IDR) | Full: IDR budget planning | Partial: annual rate lock per contract terms | Rate lock mechanism |
| Implementation timeline (SettleMint causes) | Escalation rights, milestone payment holdback | Full: timeline recovery at SettleMint cost | - |
| Implementation timeline (Bank Mandiri causes) | Full: decision latency, resource availability | Extension: scope and timeline adjustment, no cost | - |
| Scope changes post-Phase 1 | Change control participation, decision rights | Change impact assessment within 5 business days | Change control process |
| Bank Mandiri staff turnover during implementation | Continuity planning, backup stakeholder designation | Documentation quality, onboarding support | - |

### 13.2 Liability Cap

SettleMint's liability to Bank Mandiri is capped at 12 months of the total fees paid by Bank Mandiri to SettleMint in the 12 months preceding the claim. This cap applies to all claims arising from or related to the agreement, excluding death or personal injury caused by negligence, fraud, or fraudulent misrepresentation.

Service credits (for SLA breaches) are the exclusive remedy for uptime failures and are capped at 50% of monthly support fees for the affected period. Credits do not count toward the liability cap.

### 13.3 Force Majeure and Extraordinary Events

In the event of force majeure (natural disaster, national emergency, regulatory action, pandemic) that prevents SettleMint from delivering services for more than 30 days, Bank Mandiri may suspend license payments for the duration without penalty. SettleMint will use commercially reasonable efforts to restore services as quickly as practicable.

For Bank Mandiri-specific force majeure events (Indonesian regulatory action, BUMN directive, national security event), SettleMint will continue to maintain the platform in a ready state and resume service delivery when Bank Mandiri's operations normalize.

---

## 14. Value Justification

### 14.1 Indonesia's Digital Asset Market Opportunity

Indonesia's digital asset market is at an inflection point. OJK's progressive regulatory approach, Bank Indonesia's CBDC exploration, and BI-FAST's real-time payment infrastructure create the conditions for significant digital asset growth. Bank Mandiri, as Indonesia's largest state-owned bank, is naturally positioned to be the anchor institution for Indonesia's wholesale digital asset ecosystem.

The commercial investment in DALP is therefore not just a technology cost, it is a strategic market positioning investment. The institution that builds institutional-grade digital asset infrastructure first, and builds it correctly, captures a structural advantage in Indonesia's emerging wholesale digital market.

**OJK regulatory window:** OJK's digital asset regulatory framework is actively developing. Banks that establish compliant digital asset infrastructure early gain regulatory familiarity and goodwill that late entrants cannot easily replicate. Bank Mandiri's BUMN status means it operates with OJK's heightened scrutiny but also its heightened interest in seeing Indonesia's largest bank succeed in digital asset leadership.

**BI strategic alignment:** Bank Indonesia's Project Garuda and CBDC research creates a natural partnership opportunity for an institution that has already built wholesale digital asset infrastructure. Bank Mandiri's private Besu network with BI observer access positions it as a credible partner for BI's digital currency infrastructure evolution.

### 14.2 No Transaction Fees at National Scale

Indonesia's payment system processes billions of transactions annually. If Bank Mandiri's digital asset infrastructure scales to process even a fraction of this volume, a transaction-fee-based platform would generate prohibitive costs. DALP's environment-based licensing means that scaling from thousands to millions of digital asset transactions annually costs Bank Mandiri nothing in additional platform fees.

This pricing structure is essential for Bank Mandiri's ability to offer competitive digital asset services to institutional clients without the platform cost becoming a barrier to adoption.

### 14.3 Total Programme Value over 5 Years

Combining quantified financial benefits over a 5-year programme horizon:

| Benefit Category | 5-Year Value (IDR) | 5-Year Value (EUR) |
|-----------------|-------------------|-------------------|
| Capital cost savings (settlement exposure reduction, 50% capture by Year 3) | IDR 6.7 billion | EUR 394,000 |
| Operational cost savings (distribution automation) | IDR 700 million | EUR 41,000 |
| Compliance operations savings (eligibility automation) | IDR 1.5 billion | EUR 88,000 |
| **Total Quantified Benefits** | **IDR 8.9 billion** | **EUR 523,000** |
| **5-Year Programme Cost** | **IDR 67.4 billion** | **EUR 3,966,000** |
| **Net Cost (Cost minus Quantified Benefits)** | **IDR 58.5 billion** | **EUR 3,443,000** |

The quantified benefits cover approximately 13% of the 5-year programme cost. The remaining programme investment is justified by strategic positioning value, first-mover advantage in Indonesia's wholesale digital asset market, regulatory relationship enhancement with OJK and BI, and the infrastructure platform enabling revenue-generating digital asset products (sukuk tokenization for BSI, government bond distribution, corporate bond issuance services) whose revenue potential exceeds the programme cost.

---

*End of Commercial Proposal: Bank Mandiri. Digital Asset Infrastructure Platform*
*Document version: 1.0 Reviewed | Prepared: 20 March 2026 | SettleMint Confidential*
*All prices exclude applicable taxes and VAT including Indonesian PPN.*
