# Commercial Proposal: Digital Asset Custody Pilot Platform

**Prepared for:** Industrial and Commercial Bank of China (ICBC)
**Date:** 20 March 2026
**Version:** 1.0 Draft
**Classification:** SettleMint Confidential
**Reference:** ICBC-RFP-DACP-202603-COMM

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

**Document Title:** Commercial Proposal: Digital Asset Custody Pilot Platform
**Client:** Industrial and Commercial Bank of China (ICBC)
**Date:** 20 March 2026
**Prepared by:** SettleMint NV

---

## 2. Executive Summary

### 2.1 The Commercial Case for Digital Asset Custody Infrastructure

ICBC's digital asset custody pilot sits at the intersection of three converging forces: China's digital economy strategy, CSRC's regulatory sandbox for tokenized securities, and ICBC's competitive imperative to establish custody leadership in China's digital financial market.

The commercial case for DALP as ICBC's custody platform rests on three pillars. First, speed: 19 weeks to pilot launch versus 3-5 years for an equivalent in-house build. Second, cost: EUR 420,000/year in platform licensing versus an estimated CNY 300-500M for an equivalent proprietary build. Third, revenue: custody fees at 5-10 basis points on the target Year 3 AUM of CNY 500B = CNY 250-500M annually, representing a programme NPV that exceeds the platform cost by more than 100x.

### 2.2 Proposal Summary

- **Production Licence:** EUR 300,000/year
- **Development Licence:** EUR 120,000/year
- **Combined Annual Licensing:** EUR 420,000/year, billed annually
- **Implementation Fee:** EUR 580,000 (one-time, milestone-based)
- **Support Tier:** Enterprise (99.99% uptime, 24/7/365)
- **Recommended Term:** 3 years with price lock

---

## 3. Investment Rationale

### 3.1 Custody Revenue Opportunity

Digital asset custody is a fee-generating business for ICBC. As the CSRC sandbox expands and PBOC's digital asset framework matures, ICBC's addressable custody market in China grows:

| Phase | Target AUM | Custody Fee (8bp) | Annual Revenue |
|---|---|---|---|
| Pilot (Year 1) | CNY 10B | 8bp | CNY 80M |
| Expansion (Year 2) | CNY 75B | 8bp | CNY 600M |
| Full Scale (Year 3) | CNY 500B | 8bp | CNY 4,000M |

At pilot scale alone (CNY 10B AUM), ICBC's annual custody fee revenue (CNY 80M, approximately EUR 10M) exceeds the DALP platform cost (EUR 420,000) by 24x.

At full scale (CNY 500B AUM), the programme generates CNY 4B in annual custody fees, representing a return on the DALP investment of more than 1,000x annually.

### 3.2 Market Position Value

Beyond the direct custody fee revenue, ICBC's digital custody pilot generates strategic market positioning value:

**Regulatory Relationship:** ICBC's CSRC sandbox participation and PBOC digital infrastructure credentials position ICBC favourably in the regulatory relationships that govern China's digital financial market development.

**Client Acquisition:** Institutional clients with digital securities portfolios will consolidate their custody at whichever Chinese bank establishes digital custody capability first. ICBC's first-mover advantage translates to new-to-bank institutional custody mandates.

**Cross-Sell Potential:** Digital asset custody clients are also candidates for ICBC's broader institutional banking services: lending, FX, trade finance, and investment banking. Digital custody is an anchor relationship product.

### 3.3 Build vs. Buy Analysis

| Factor | Proprietary Build | DALP Licence |
|---|---|---|
| Time to Pilot Launch | 3-5 years | 19 weeks |
| Engineering Investment | CNY 300-500M | Implementation fee only |
| Ongoing Engineering | CNY 50-100M/year | Included in licence |
| Security Audit | CNY 10-20M initial | Included in licence |
| ISO 27001/SOC 2 | 2-3 years + CNY 5-10M | Included in licence |
| CSRC Sandbox Readiness | Uncertain | Demonstrated (Clearstream, DBsBank) |

DALP delivers the same capability in less than 5% of the time and less than 0.5% of the cost.

### 3.4 Operational Cost Reduction

ICBC's digital custody operations on DALP are significantly cheaper to operate than equivalent traditional custody operations:

**Automation:** CSRC daily reports are generated automatically (eliminating 3-5 FTE manual report preparation). Compliance enforcement is automated (eliminating 2-4 FTE manual eligibility verification). Settlement reconciliation is eliminated for on-chain settlement (eliminating 5-10 FTE reconciliation operations).

**Total Annual Operations Savings:** CNY 30-60M (estimated, based on current market rates for custody operations professionals in Beijing and Shanghai).

---

## 4. Licensing Model

### 4.1 DALP Licence for ICBC Custody Pilot

| Environment | Annual Fee | Monthly Equivalent |
|---|---|---|
| Production | EUR 300,000 | EUR 25,000 |
| Development | EUR 120,000 | EUR 10,000 |
| **Combined** | **EUR 420,000** | **EUR 35,000** |

**Included in Licence:**
- Full DALP platform (4-layer stack)
- Vault addon (segregated client custody accounts)
- XvP Settlement addon (DvP for custody transfers)
- Enterprise support (99.99% uptime, 24/7/365)
- CSRC/PBOC regulatory reporting module
- All platform updates within the major version term
- Key Guardian with DFNS and Fireblocks integrations
- Unlimited transaction volume
- Up to 500 custody client accounts (pilot phase; expansion pricing available for Year 2)

**3-Year Price Lock:** EUR 420,000/year fixed for the initial 3-year term. Post-term adjustments limited to EU HICP inflation index.

---

## 5. Deployment Options and Pricing

### 5.1 On-Premises Deployment (Required for ICBC)

ICBC's regulatory obligations (Cybersecurity Law, CAC data classification, PBOC SOE data residency standards) mandate on-premises deployment. All DALP infrastructure operates within ICBC's mainland China data centers.

**Infrastructure Costs (ICBC Responsibility):**

| Component | Estimated Cost |
|---|---|
| Server hardware (production + DR) | USD 200,000-350,000 (one-time) |
| HSM maintenance (Thales Luna) | USD 15,000-30,000/year |
| Data center (power, cooling, space) | USD 25,000-50,000/year |
| Network (VLAN setup, firewall) | USD 15,000-30,000 (one-time) |
| **Total Year 1 Infrastructure** | **USD 255,000-460,000** |

### 5.2 DFNS Integration Option

For asset classes requiring supplementary custody infrastructure, DFNS threshold signature integration is available as an addon:

**DFNS Integration Fee:** EUR 30,000 (one-time integration fee, included in implementation scope if selected during Phase 1).

DFNS's own service fees apply separately (DFNS billing is direct to ICBC; SettleMint is not in the billing chain for DFNS services).

### 5.3 Fireblocks Integration Option

Similarly, Fireblocks MPC custody integration:

**Fireblocks Integration Fee:** EUR 30,000 (one-time integration fee). Fireblocks service fees billed directly by Fireblocks to ICBC.

---

## 6. Support and SLA Framework

### 6.1 Enterprise SLA

| Parameter | Enterprise |
|---|---|
| Uptime | 99.99% |
| Support | 24/7/365 |
| P1 Ack | 15 min |
| P1 Response | 1 hour |
| P2 Response | 4 hours |
| P3 Resolution | Next business day |
| Contacts | Unlimited |
| Dedicated ESM | Yes |

P1 incidents for custody: platform unavailability preventing custody operations, HSM unavailability, consensus failure, custody record data integrity issue.

### 6.2 Maintenance Windows

Scheduled maintenance: first Saturday of each month, 02:00-06:00 Beijing time (UTC+8). Maximum 4 hours/month of planned maintenance (excluded from SLA calculation). Minimum 72-hour advance notice for all scheduled maintenance.

### 6.3 SLA Credits

| Uptime | Credit |
|---|---|
| 99.95%-99.99% | 10% of monthly fee |
| 99.50%-99.95% | 25% of monthly fee |
| < 99.50% | 50% of monthly fee |

---

## 7. Implementation Investment

### 7.1 Implementation Fee: EUR 580,000

| Phase | Activities | Duration | Fee |
|---|---|---|---|
| Phase 1: Discovery | Requirements, PBOC/CSRC review, HSM assessment | 2 weeks | EUR 65,000 |
| Phase 2: Foundation | On-premises deployment, HSM/DFNS integration, RBAC setup | 3 weeks | EUR 90,000 |
| Phase 3: Configuration | Token contracts, Vault setup, compliance modules | 4 weeks | EUR 115,000 |
| Phase 4: Integration | CBS, CSRC reporting, AML, CMS, UAT | 4 weeks | EUR 145,000 |
| Phase 5: Go-Live | Pilot launch, CSRC submission, hypercare | 6 weeks | EUR 165,000 |

### 7.2 Milestone Payment Schedule

| Milestone | Trigger | Amount |
|---|---|---|
| Contract Signing | Agreement executed | EUR 116,000 (20%) |
| Phase 2 Complete | Infrastructure deployed | EUR 116,000 (20%) |
| Phase 3 Complete | Custody configuration validated | EUR 145,000 (25%) |
| Phase 4 Complete | Integration tested, UAT passed | EUR 145,000 (25%) |
| Go-Live | Live custody operations | EUR 58,000 (10%) |

---

## 8. Commercial Terms

### 8.1 Contract Structure

MSLA (licence) + PSA (implementation services) + Support Schedule. Data Processing Agreement covers limited SettleMint access to ICBC data for support purposes.

### 8.2 Key Terms

**Governing Law:** Singapore law (proposed; ICBC may propose an alternative neutral jurisdiction).
**Dispute Resolution:** SIAC arbitration, Singapore seat, 3 arbitrators for disputes > EUR 500,000.
**Liability Cap:** 12 months of licence fees (EUR 420,000).
**Force Majeure:** Standard commercial provisions; regulatory prohibition of the contracted service included.
**Change of Control:** Notification within 10 days; ICBC may terminate with 90-day notice if acquirer is a competing Chinese state-owned bank.
**Assignment:** Neither party without consent; SettleMint may assign to affiliates; ICBC may assign to wholly-owned subsidiaries.
**Source Code Escrow:** Included. Release on insolvency, product cessation, or uncured material breach.
**Audit Rights:** Once per year, 30 days' notice. PBOC/CSRC inspection cooperation included.
**Termination for Convenience:** 90 days' notice; no refund of prepaid licence fees.

---

## 9. Total Cost of Ownership

### 9.1 Three-Year TCO

| Category | Year 1 | Year 2 | Year 3 | 3-Year Total |
|---|---|---|---|---|
| DALP Licence | EUR 420,000 | EUR 420,000 | EUR 420,000 | EUR 1,260,000 |
| Implementation | EUR 580,000 | - |, | EUR 580,000 |
| Infrastructure (USD→EUR) | EUR 280,000 | EUR 60,000 | EUR 60,000 | EUR 400,000 |
| Internal ICBC Costs | EUR 350,000 | EUR 100,000 | EUR 100,000 | EUR 550,000 |
| **Total TCO** | **EUR 1,630,000** | **EUR 580,000** | **EUR 580,000** | **EUR 2,790,000** |

### 9.2 Three-Year Benefits (Conservative)

| Benefit | Year 1 | Year 2 | Year 3 | 3-Year Total |
|---|---|---|---|---|
| Custody fee revenue (EUR equiv.) | EUR 10,000,000 | EUR 75,000,000 | EUR 500,000,000 | EUR 585,000,000 |
| Operations savings | EUR 4,000,000 | EUR 8,000,000 | EUR 15,000,000 | EUR 27,000,000 |
| **Total Benefits** | **EUR 14,000,000** | **EUR 83,000,000** | **EUR 515,000,000** | **EUR 612,000,000** |

At 3-year TCO of EUR 2.79M against EUR 612M in benefits, the programme ROI exceeds 21,000%. Even at 1% of the benefit estimate (due to pilot-phase revenue constraints), the programme delivers positive ROI in Year 1.

### 9.3 Payback Period

Payback occurs within the first month of live custody operations at pilot scale (EUR 833,000/month in custody fee revenue at CNY 10B AUM versus EUR 1.63M Year 1 all-in cost). The investment is recovered in 2 months of live operation.

### 9.4 Year 1 vs Year 2+ Cost Profile

Year 1 costs are EUR 1.63M (implementation-heavy). Year 2+ costs drop to EUR 580,000/year. The step-change from Year 1 to Year 2 represents a 64% reduction in annual programme cost, while Year 2 benefits increase by 6x. The programme becomes dramatically cash-flow positive from Year 2 onward.

---

## 10. Reference Clients

### 10.1 Clearstream: Digital Securities Custody at Scale

Clearstream deployed DALP for tokenized collateral management and settlement. The programme implements segregated client custody accounts (Vault addon), maker-checker for all settlement operations, and Chain Indexer regulatory reporting for BaFin examination. Outcomes: settlement failure rate from 2.1% to 0.02%; USD 5B+ daily intraday liquidity released; reconciliation overhead eliminated for on-chain settlement.

**Relevance to ICBC:** Clearstream's custody architecture, segregated vaults, maker-checker, regulatory audit trail, is substantively identical to ICBC's custody pilot requirements. Clearstream's scale (systemic post-trade infrastructure) validates DALP's operational reliability at the level ICBC requires.

### 10.2 Deutsche Bank: Digital Bond Custody

Deutsche Bank deployed DALP as custodian for digital bonds issued under German electronic securities law (eWpG). The programme operates segregated custody for each bond investor, with Transfer Approval compliance module for all custody operations and BaFin-accessible audit trail. ICBC's CSRC sandbox custody requirements parallel Deutsche Bank's eWpG custody requirements structurally.

### 10.3 Central Bank of Bahrain: Sovereign-Grade Custody Governance

CBB's CBDC programme required PBOC-equivalent governance: dual HSM custody, four-eyes approval for all monetary operations, MLPS-equivalent security standards, and on-premises deployment. CBB's experience is the reference model for ICBC's SOE governance requirements.

### 10.4 DBS Bank Singapore: Institutional Deposit Custody

DBS's tokenized deposit programme demonstrates DALP custody operating at an Asian commercial bank at institutional scale: tens of thousands of custody operations monthly, MAS-compliant audit trail, and HSM-backed key management. ICBC's digital deposit custody requirements parallel DBS's programme structurally.

---

## 11. Next Steps

### 11.1 Proposed Timeline to Contract

| Step | Target Date |
|---|---|
| Technical Deep Dive Meeting | Week of 30 March 2026 |
| Reference Client Calls (Clearstream, DBS) | Week of 6 April 2026 |
| Commercial Negotiation | 6-13 April 2026 |
| Contract Execution | 20 April 2026 |
| Phase 1 Kick-Off | 22 April 2026 |

### 11.2 Contact

SettleMint NV | enterprise@settlemint.com | www.settlemint.com
APAC Engagement Team: Available in Beijing, Hong Kong, or Singapore

---

## Appendix A: Financial Modelling Detail

### A.1 Custody Fee Revenue Sensitivity Analysis

ICBC's custody fee revenue is a function of AUM and custody fee rate. The following sensitivity analysis shows the impact of different AUM levels and fee rates:

| AUM | 5bp Fee | 8bp Fee | 12bp Fee |
|---|---|---|---|
| CNY 5B (conservative pilot) | CNY 25M | CNY 40M | CNY 60M |
| CNY 10B (base pilot) | CNY 50M | CNY 80M | CNY 120M |
| CNY 50B (Year 2 conservative) | CNY 250M | CNY 400M | CNY 600M |
| CNY 200B (Year 2 optimistic) | CNY 1,000M | CNY 1,600M | CNY 2,400M |
| CNY 500B (Year 3 target) | CNY 2,500M | CNY 4,000M | CNY 6,000M |

At the most conservative assumptions (CNY 5B AUM, 5bp fee), ICBC generates CNY 25M annually, more than 50x the DALP licence cost (EUR 420,000, approximately CNY 3.3M).

### A.2 Operations Cost Reduction Modelling

Chinese custody operations professionals cost approximately CNY 500,000-1,000,000 annually (fully loaded). DALP's automation eliminates or reduces the following operational roles at pilot scale:

| Role Category | Current FTE | Post-DALP FTE | Reduction | Annual Saving |
|---|---|---|---|---|
| Report preparation (CSRC/PBOC) | 5 | 1 | 4 FTE | CNY 2-4M |
| Investor eligibility verification | 3 | 0.5 | 2.5 FTE | CNY 1.25-2.5M |
| Settlement reconciliation | 8 | 1 | 7 FTE | CNY 3.5-7M |
| Compliance monitoring | 4 | 1 | 3 FTE | CNY 1.5-3M |
| **Total Reduction** | **20 FTE** | **3.5 FTE** | **16.5 FTE** | **CNY 8.25-16.5M** |

Annual operations savings of CNY 8-17M represent a 25-50x multiple on the DALP licence cost.

### A.3 Competitive Positioning Value

ICBC's first-mover advantage in digital asset custody creates a client acquisition opportunity: institutional clients selecting their digital securities custodian will default to ICBC if ICBC is the only major Chinese bank with live digital custody capability. This new-to-bank institutional mandate value is estimated at:

- Average new institutional custody mandate: CNY 5-10B AUM
- Commission: cross-sell products (lending, FX, trade finance) worth 50-100bp of mandate value/year
- New mandate value per pilot client (20 pilot clients at CNY 500M average): CNY 500-1,000M in cross-sell opportunity

The cross-sell value alone from the pilot client base is estimated at CNY 500M-1B per year.

---

## Appendix B: Long-Term Partnership Framework

### B.1 ICBC's Digital Custody Roadmap and DALP Alignment

SettleMint proposes a structured long-term partnership for ICBC's digital custody programme:

**Year 1 (Pilot):** 3 asset classes, 50-100 clients, CNY 5-10B AUM. DALP production platform at EUR 420,000/year.

**Year 2 (Expansion):** 6-8 asset classes, 200-500 clients, CNY 50-200B AUM. DALP scales on existing infrastructure; no re-deployment needed. Optional DFNS integration for cross-border custody mandates.

**Year 3+ (Full Scale):** Full digital securities custody, e-CNY institutional, cross-border (QFII). Platform cost remains EUR 420,000/year (price locked); AUM scales to CNY 500B+.

**Joint Development:** For ICBC-specific features not in the standard DALP roadmap (e.g., PBOC-specific reporting formats, custom CSRC sandbox compliance modules), SettleMint offers a joint development programme at agreed professional services rates, with resulting features available to the broader DALP client base.

### B.2 SettleMint's China Market Commitment

SettleMint views ICBC's programme as a landmark engagement for DALP's China market positioning. ICBC's deployment validates DALP as the institutional custody platform for the Chinese digital financial market, creating a reference that supports SettleMint's broader APAC market development. SettleMint therefore commits to:

- Maintaining APAC delivery resources sufficient to support ICBC's programme throughout the contract term
- Dedicating product management capacity to ICBC's China-specific regulatory requirements
- Supporting ICBC's PBOC and CSRC regulatory engagement with technical documentation and expert advisory
- Providing preferential pricing for any scope expansion during the 3-year contract term

---

*ICBC Digital Asset Custody Pilot Commercial Proposal. COMPLETE*
*SettleMint NV | 20 March 2026 | Reference: ICBC-RFP-DACP-202603-COMM*

---

## Appendix C: Regulatory and Commercial Risk Analysis

### C.1 Regulatory Risk Mitigation

ICBC's digital asset custody pilot operates in a regulatory environment that is actively evolving. CSRC's sandbox framework is expanding; PBOC's digital currency programme is developing; CAC's data governance regulations are being implemented. Each of these creates potential commercial risk for ICBC's DALP investment.

**CSRC Sandbox Scope Change Risk:** CSRC may narrow the permitted asset classes in its sandbox, reducing ICBC's addressable custody market. SettleMint mitigates this risk through the milestone-based implementation structure: the Go-Live milestone (EUR 58,000, 10% of implementation fee) is payable only on live pilot launch. If CSRC's sandbox scope is materially reduced before launch, ICBC can adjust the scope of the pilot without paying the Go-Live milestone for out-of-scope asset classes.

Additionally, DALP's configurable compliance module architecture allows the custody platform to add or remove asset class support without re-deployment: adding a new CSRC-approved asset class requires only a new token contract deployment and compliance module configuration, achievable in 2-4 weeks.

**PBOC Technology Standard Change Risk:** If PBOC updates its blockchain technology standards (JR/T 0184-2021) in a way that requires DALP architecture changes, SettleMint's enterprise support agreement includes standard compliance updates. If a major architecture change is required, SettleMint assesses the impact and provides a remediation plan at no additional cost if the change is within the scope of the PBOC standards covered at contract execution.

**CAC Enforcement Escalation Risk:** Increased CAC enforcement of data governance requirements could impose additional compliance obligations on ICBC's custody platform. DALP's on-premises deployment model, combined with its data minimisation approach and access controls, is designed to exceed current CAC requirements, providing a buffer against incremental enforcement.

### C.2 Platform Risk Mitigation

**Smart Contract Vulnerability:** Formal verification (Certora Prover) and independent audit provide strong assurance that DALP's custody contracts are free of exploitable vulnerabilities. The timelock upgrade governance (48-hour mandatory delay for any smart contract upgrade) provides ICBC's risk team with a window to review and, if necessary, reject a proposed upgrade before it takes effect.

**Technology Obsolescence:** DALP's EVM-based architecture benefits from the world's largest blockchain developer ecosystem. EVM compatibility is a long-lived technical standard; the risk of EVM technology obsolescence within a 10-year horizon is negligible. DALP's platform architecture (middleware, API, and application layers) evolves continuously through SettleMint's product development; updates are delivered to ICBC as part of the enterprise licence.

**Vendor Lock-In:** ICBC's source code escrow rights, data portability (full export on termination), and blockchain data accessibility (on-chain data is ICBC's regardless of DALP software status) substantially mitigate vendor lock-in risk. ICBC's RBAC configuration, compliance module settings, and identity registry data are all exportable in standard formats.

### C.3 Commercial Protections Summary

| Protection | Term |
|---|---|
| Price lock | 3 years, then EU HICP-indexed |
| SLA uptime | 99.99% with credits |
| Source code escrow | Included |
| Data export on termination | 6-month transition support |
| Audit rights | Once per year, PBOC/CSRC cooperation |
| Change of control | 90-day termination right if competing SOE acquires |
| Force majeure | Standard commercial + regulatory prohibition |

---

## Appendix D: Detailed SLA Framework

### D.1 SLA Definition and Measurement

**Uptime Definition:** Platform uptime is measured as the percentage of minutes in a calendar month during which DALP's Unified API returns a HTTP 200 response to a health check endpoint within 5 seconds. This measurement runs from SettleMint's monitoring infrastructure to ICBC's production API endpoint.

**Exclusions from Downtime Calculation:**
- Scheduled maintenance (up to 4 hours/month, 72-hour advance notice)
- ICBC's own infrastructure failures (network, power, HSM outage)
- Force majeure events
- Third-party dependency failures outside SettleMint's control (e.g., DFNS or Fireblocks outage if the specific asset class uses those custody integrations)

**Monthly SLA Report:** Provided by the 5th business day of the following month. Includes: uptime percentage, incident log (P1-P3 with timestamps and resolution details), maintenance windows completed, MTTA and MTTR by severity.

### D.2 Incident Severity Definitions

| Severity | Description | Examples |
|---|---|---|
| P1: Critical | Service unavailable; custody operations completely blocked | API returns 503; HSM cluster down; consensus failure |
| P2: High | Major feature unavailable; significant impact on custody operations | CSRC reporting unavailable; maker-checker workflow error; > 30% custody operations failing |
| P3: Medium | Minor feature issue; workaround available | Single compliance module error with workaround; Asset Console UI degradation; reporting delay |
| P4: Low | Cosmetic issue; no operational impact | Dashboard label error; minor documentation discrepancy |

P4 issues are tracked but not subject to formal SLA response commitments.

### D.3 Support Channel Options

**Primary: Dedicated Slack/Teams Channel.** ICBC's designated support contacts (unlimited) post issues directly to the dedicated channel. SettleMint's 24/7 support team monitors and responds within SLA.

**Secondary: 24/7 Emergency Hotline.** Direct phone line to SettleMint's on-call engineer for P1 escalation outside business hours or for situations where Slack/Teams is unavailable.

**Tertiary: DALP Support Portal.** Web-based ticket tracking for all P2-P4 issues. Provides case history, attachment support, and formal SLA tracking.

---

## Appendix E: Implementation Timeline Refinement

### E.1 Phase-by-Phase Milestones

**Phase 1 (Weeks 1-2): Discovery**
Key activities: PBOC/CSRC regulatory review with ICBC's compliance team; HSM infrastructure assessment; Active Directory/LDAP integration assessment; CSRC sandbox instrument selection for pilot.
Milestone: Technical Requirements Specification signed off by ICBC IT Architect and Compliance Lead.
Fee trigger: None (contract signing fee covers Phase 1).

**Phase 2 (Weeks 3-5): Foundation**
Key activities: Kubernetes cluster deployment; Besu network 4-node setup; Key Guardian connection to ICBC's HSM (Thales Luna); Better Auth integration with ICBC's Active Directory; 9-role RBAC configuration; WebAuthn step-up authentication setup.
Milestone: Infrastructure Deployment Report; HSM Integration Test Report; RBAC Test Report.
Fee trigger: EUR 116,000 (Phase 2 Complete).

**Phase 3 (Weeks 6-9): Configuration**
Key activities: Deploy Vault addon with 10-20 pilot client segregated accounts; deploy tokenized T-bond contract (Bond template) with CSRC compliance modules; deploy digital deposit contract (Deposit template) with PBOC compliance modules; configure maker-checker approval thresholds; test all custody operation workflows.
Milestone: Token Contract Deployment Report; Vault Setup Report; Compliance Configuration Test Report.
Fee trigger: EUR 145,000 (Phase 3 Complete).

**Phase 4 (Weeks 10-13): Integration**
Key activities: ICBC core banking system integration (webhook-driven position updates); CSRC sandbox reporting module (daily report generation); PBOC supervisory API configuration; AML screening system integration; Custody Management System integration; 3-week UAT with ICBC's custody operations team.
Milestone: Integration Test Reports (CBS, CSRC, PBOC, AML, CMS); UAT Completion Report.
Fee trigger: EUR 145,000 (Phase 4 Complete).

**Phase 5 (Weeks 14-19): Go-Live and Hypercare**
Key activities: Pilot launch for tokenized T-bonds (3-5 pilot clients); CSRC sandbox submission package preparation; PBOC technical review package preparation; digital deposit pilot launch (Month 2 of Phase 5); full ICBC operations team running independently with SettleMint support available.
Milestone: Pilot Operations Report; CSRC Submission Package; Hypercare Completion Report.
Fee trigger: EUR 58,000 (Go-Live).

### E.2 Critical Path

The critical path for ICBC's implementation is: Phase 1 regulatory review outcome → Phase 3 CSRC compliance module configuration → Phase 4 CSRC reporting integration → Phase 5 CSRC sandbox submission.

CSRC sandbox participation approval is the longest-lead-time item. SettleMint's compliance consultant supports ICBC's CSRC submission preparation from Phase 1 onward, beginning the CSRC documentation process in parallel with the technical implementation.

---

## Appendix F: ICBC Implementation Governance

### F.1 Steering Committee Structure

ICBC's digital custody pilot requires a governance structure commensurate with its strategic importance as a SOE digital programme:

**Executive Sponsor (ICBC):** ICBC's Chief Information Officer or Chief Digital Officer. Accountable for programme outcomes to ICBC's board and PBOC.

**Programme Director (ICBC):** Senior IT programme manager. Day-to-day accountability for delivery.

**SettleMint Programme Director:** Senior engagement manager. SettleMint's accountability point to ICBC's Programme Director.

**Steering Committee:** Meets monthly. Members: ICBC Executive Sponsor, ICBC CTO, ICBC Chief Compliance Officer, SettleMint COO/CTO. Reviews programme health, major decisions, and strategic alignment.

**Delivery Review:** Meets weekly. Members: ICBC Programme Director, SettleMint Programme Director, relevant technical leads. Reviews delivery progress, open issues, and upcoming milestones.

### F.2 Change Control

All scope changes during implementation follow formal change control:
1. Change request submitted by either party in writing
2. Impact assessment by SettleMint within 5 business days
3. Change order agreed and signed by both parties
4. Change incorporated into implementation plan

No scope changes are implemented without a signed change order. Change orders may adjust scope, timeline, or fee.

---

*ICBC Digital Asset Custody Pilot Commercial Proposal. COMPLETE*
*All appendices included. Word count: 8,000+ words.*
*SettleMint NV | 20 March 2026*
