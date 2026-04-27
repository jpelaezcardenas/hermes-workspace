# Commercial Proposal: Digital Trade Finance Platform

**Prepared for:** UOB (United Overseas Bank Limited)
**Date:** 20 March 2026
**Version:** 1.0 Draft
**Classification:** SettleMint Confidential. Invited Bidders Only
**Reference:** UOB-RFP-202603

*All prices exclude applicable taxes and VAT. Taxes are added separately based on the client's jurisdiction and applicable tax treaties.*

---

## Table of Contents

1. Cover Page
2. Commercial Summary
3. Licensing Model
4. Implementation Services Pricing
5. Environment and Infrastructure Costs
6. Support and Maintenance Fees
7. Total Cost of Ownership Analysis
8. Payment Terms and Milestones
9. Commercial Assumptions Register
10. Exit and Transition Terms
11. Value Justification

---

## 1. Cover Page

**Document Title:** Commercial Proposal: Digital Trade Finance Platform
**Client:** UOB (United Overseas Bank Limited), Singapore
**Date:** 20 March 2026
**Version:** 1.0 Draft
**Prepared by:** SettleMint NV
**Classification:** SettleMint Confidential

*This document contains proprietary and confidential pricing information belonging to SettleMint NV. It is submitted exclusively in response to UOB-RFP-202603. All prices exclude applicable taxes and VAT.*

---

## 2. Commercial Summary

UOB's digital trade finance platform requires a commercial model that scales with the programme's growth across ASEAN trade corridors, without creating a situation where commercial success in trade volumes drives license cost escalation. SettleMint's environment-based licensing model provides exactly this: costs are fixed per environment, not variable with transaction volume, trade value processed, or number of counterparties onboarded.

**Year 1 Platform License Summary:**

*All prices exclude applicable taxes and VAT.*

| Component | Annual Cost (EUR) |
|---|---|
| Production License (1 environment) | 300,000 |
| Development License (1 environment) | 120,000 |
| Implementation Services (19-week programme) | [CLIENT-SPECIFIC: scoped in Phase 1] |
| Premium Support | [CLIENT-SPECIFIC: scoped per tier] |
| Infrastructure (AWS ap-southeast-1, pass-through) | [Pass-through at cost] |
| **Platform License Total (Year 1)** | **420,000** |

*All prices payable annually and upfront. All prices exclude applicable taxes and VAT.*

**Three-Year Platform License:**

| Year | Production (EUR) | Development (EUR) | Total (EUR) |
|---|---|---|---|
| Year 1 | 300,000 | 120,000 | 420,000 |
| Year 2 | 300,000 | 120,000 | 420,000 |
| Year 3 | 300,000 | 120,000 | 420,000 |
| **3-Year Total** | **900,000** | **360,000** | **1,260,000** |

*All prices exclude applicable taxes and VAT.*

---

## 3. Licensing Model

### 3.1 Principles

**Volume-insensitive pricing:** UOB pays for environments. As UOB's digital trade finance volumes grow, from initial controlled deployment to hundreds of LCs and thousands of BoL transfers monthly, the license cost remains EUR 420,000/year for the two-environment baseline. Commercial success does not create license cost escalation.

**All instruments, one license:** The production license covers all DALP trade finance capabilities: LCs, BoLs, invoice financing, receivables, SGD XvP settlement, TradeTrust integration, SWIFT connectivity, without incremental fees per instrument type or corridor.

**Corridor expansion through configuration:** Adding new ASEAN trade corridors (Thailand, Vietnam, Indonesia, Philippines) or new counterparty relationships is a configuration exercise within the existing license. No additional license fee for corridor or counterparty expansion.

**Entity expansion through additional environments:** A new UOB legal entity (e.g., UOB Thailand using the same platform as UOB Singapore) requires a separate environment license at the standard rate (EUR 300,000/year for production), not a bespoke pricing negotiation.

### 3.2 License Types

**Production License: EUR 300,000 per year**

Live trade finance operations environment. Covers: all LC, BoL, invoice, and receivable lifecycle operations; all compliance enforcement; SGD XvP settlement; TradeTrust integration; all API access; and the full observability stack.

**Development License: EUR 120,000 per year**

Non-production environments for development, integration testing, UAT, and pre-production validation. Full DALP capability; no live customer transactions.

*All prices exclude applicable taxes and VAT. All licenses payable annually and upfront.*

---

## 4. Implementation Services Pricing

**Implementation Services: [CLIENT-SPECIFIC, confirmed in Phase 1]**

Fixed-fee implementation for UOB's 19-week digital trade finance programme. Scope includes:

- Phase 1: Discovery (3 weeks). GTB architecture review, MAS TRM compliance mapping, TradeTrust integration assessment, SWIFT connectivity review
- Phase 2: Configuration (4 weeks). LC/BoL token configuration, compliance modules (MAS PSA, sanctions, TBML), Singapore-domiciled environment provisioning
- Phase 3: Integration (4 weeks). GTB integration, SWIFT/ISO 20022 integration, FAST/PayNow integration, AML/KYB integration, TradeTrust integration
- Phase 4: Testing (3 weeks). Functional SIT, MAS TRM security assessment, UAT, performance testing
- Phase 5: Go-Live (1 week). Singapore production deployment, go-live validation
- Phase 6: Hypercare (4 weeks). Intensive monitoring, optimisation, knowledge transfer

**Out of scope:**
- Legal advisory on MAS PSA licensing for digital trade finance
- Bespoke electronic Bills of Lading legal engineering (TradeTrust framework standards apply)
- Investor-facing mobile or portal application development
- Correspondent bank onboarding (UOB manages counterparty relationships)
- Additional integration points beyond those identified in Section 8 of the technical proposal

---

## 5. Environment and Infrastructure Costs

### 5.1 AWS ap-southeast-1 Infrastructure (Pass-Through)

| Component | Monthly Estimate (USD) | Annual Estimate (USD) |
|---|---|---|
| Compute (EKS + EC2, multi-AZ Singapore) | 3,000–5,000 | 36,000–60,000 |
| Database (RDS PostgreSQL, multi-AZ) | 800–1,500 | 9,600–18,000 |
| Object Storage (S3, trade document archive) | 150–400 | 1,800–4,800 |
| Observability stack | 400–700 | 4,800–8,400 |
| Data transfer + Direct Connect | 300–600 | 3,600–7,200 |
| **Total Estimated Cloud (USD)** | **4,650–8,200** | **56,000–98,400** |

*Pass-through at AWS billing rates, without SettleMint markup. All infrastructure costs exclude applicable taxes.*

### 5.2 Blockchain Network Infrastructure

The private Besu network for UOB's trade finance blockchain operates within the same AWS ap-southeast-1 environment. Node infrastructure costs are included in the compute estimate above. No separate blockchain network costs beyond the infrastructure range.

---

## 6. Support and Maintenance Fees

### 6.1 Premium Support Recommendation

**Premium Support: [CLIENT-SPECIFIC]**

- Extended hours: 07:00–22:00 CET, Monday–Friday; P1 on-call weekends
- Named support engineer familiar with UOB's GTB and SWIFT integration
- P1 (trade finance blocking incident): 1-hour response, 4-hour resolution
- P2 (degraded trade processing): 4-hour response, 8-hour resolution
- 99.95% monthly uptime SLA
- Monthly technical business review
- Escalation path aligned with UOB's trade operations hours (Singapore time)

**Trade Finance P1 Examples:** DALP platform unresponsive during LC examination window; XvP settlement failure in production; sanctions screening integration unavailable preventing new LC issuance; Key Guardian signing failure.

---

## 7. Total Cost of Ownership Analysis

### 7.1 Three-Year TCO

| Component | Year 1 (EUR) | Year 2 (EUR) | Year 3 (EUR) | 3-Year Total (EUR) |
|---|---|---|---|---|
| Production License | 300,000 | 300,000 | 300,000 | 900,000 |
| Development License | 120,000 | 120,000 | 120,000 | 360,000 |
| Implementation (Year 1 only) | [CLIENT-SPECIFIC] | - |, | [CLIENT-SPECIFIC] |
| Premium Support (annual) | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] |
| Cloud Infrastructure (USD indicative) | 56,000–98,000 | 60,000–105,000 | 65,000–112,000 | 181,000–315,000 |
| **Platform License Subtotal** | **420,000** | **420,000** | **420,000** | **1,260,000** |

*All prices exclude applicable taxes and VAT.*

### 7.2 Five-Year TCO

| Component | 5-Year Total (EUR) |
|---|---|
| Platform Licenses (5 years) | 2,100,000 |
| Implementation (Year 1) | [CLIENT-SPECIFIC] |
| Premium Support (5 years) | [CLIENT-SPECIFIC] |
| Cloud Infrastructure (indicative) | 310,000–550,000 |

### 7.3 Trade Finance Volume Economics

One of the most important commercial characteristics of SettleMint's licensing model for a trade finance platform is the decoupling of license cost from transaction volume. UOB's trade finance business is expected to grow significantly as digital instruments become the standard for ASEAN trade. The commercial implications:

| UOB Trade Finance Scale | DALP License Cost |
|---|---|
| 50 LCs/month, SGD 50M in trade volume | EUR 420,000/year |
| 500 LCs/month, SGD 500M in trade volume | EUR 420,000/year |
| 5,000 LCs/month, SGD 5B in trade volume | EUR 420,000/year |

The license cost per SGD of trade processed improves dramatically with volume, a direct commercial incentive for UOB to scale the programme aggressively rather than rationing digital trade finance transactions to manage license costs.

At SGD 500M annual trade volume (a modest target for UOB's trade franchise), the DALP platform license represents 0.084% of trade value, a cost structure that is commercially sustainable even with very thin margins on individual trade transactions.

---

## 8. Payment Terms and Milestones

### 8.1 Platform License

Annual, upfront. Year 1 invoice issued at contract execution; subsequent years at 12-month anniversaries. Payable within 30 days of invoice. All prices in EUR.

### 8.2 Implementation Services

Milestone-based payment:

| Milestone | % of Total | Trigger |
|---|---|---|
| Contract execution | 30% | Signed commercial agreement |
| Phase 1 gate | 20% | Architecture document + MAS TRM compliance matrix delivered |
| Phase 3 gate | 30% | GTB + SWIFT + FAST/PayNow integrations operational |
| Phase 5 go-live | 20% | Production deployment confirmed |

### 8.3 Support

Annual, upfront, concurrent with platform license invoice.

### 8.4 Infrastructure

Monthly in arrears; AWS billing report attached.

---

## 9. Commercial Assumptions Register

| ID | Assumption | Impact if Incorrect |
|---|---|---|
| CA-001 | Initial scope: Production + Development environments | Third environment licensed separately |
| CA-002 | Minimum term: 36 months | Shorter term may affect structure |
| CA-003 | All prices in EUR; SGD/EUR FX risk borne by UOB | No impact on SettleMint invoice |
| CA-004 | Singapore GST (9%) on imported software services. UOB to confirm applicability | UOB's tax team to confirm; excluded from SettleMint invoice |
| CA-005 | GTB API access and documentation provided in Phase 1 | Delayed GTB access extends Phase 3 timeline; fixed-fee unchanged |
| CA-006 | UOB provides SWIFT BIC and test credentials for SWIFT integration | SWIFT access is UOB-managed; SettleMint provides integration capability |
| CA-007 | TradeTrust corridor coverage of initial target trade lanes (ASEAN to China/India) | TradeTrust coverage assessed in Phase 1; native BoL issuance available as fallback for non-TradeTrust counterparties |
| CA-008 | FAST/PayNow API access through UOB's existing payment infrastructure | FAST/PayNow integration uses UOB's existing bank connectivity; SettleMint does not connect to FAST/PayNow directly |
| CA-009 | License is payable regardless of LC or trade volume achieved post-go-live | Commercial risk that programme volumes take time to ramp is UOB's |
| CA-010 | Price hold for 36-month initial term; Year 4/5 subject to CPI review with 6 months' notice | Renewal discussion begins 6 months before initial term expiry |

---

## 10. Exit and Transition Terms

### 10.1 Data Portability

UOB retains full ownership of all trade finance data:

- Complete export of all LC, BoL, invoice, and receivable transaction records in structured JSON/CSV format
- Export of all counterparty registry data, compliance event records, and audit logs
- Trade document metadata and document hash records for TradeTrust verification continuity
- Architecture documentation, integration specifications, runbooks, and operational guides

Data export available via self-service API at any time; managed export on termination within 30 days.

### 10.2 Transition Support

90 days minimum from termination notice:
- Read-only platform access for data extraction
- Assistance with transition of active trade finance positions
- Support for correspondent bank notification and transition
- Knowledge transfer to incoming provider or UOB internal team

### 10.3 Intellectual Property and Blockchain Continuity

Smart contracts deployed on UOB's private Besu network remain accessible after contract termination. UOB owns the network and the deployed contracts. Governance keys are held by UOB under the bring-your-own-custody model. SettleMint retains DALP platform IP; UOB retains all data, configurations, and integration code produced during the engagement.

---

## 11. Value Justification

### 11.1 Build vs. Buy

| Component | Custom Build Estimate (EUR) | Timeline |
|---|---|---|
| LC / BoL configurable token platform | 2,000,000–3,500,000 | 18–24 months |
| TradeTrust / electronic BoL integration | 500,000–1,000,000 | 6–9 months |
| Compliance engine (sanctions, TBML, MAS) | 700,000–1,200,000 | 6–9 months |
| XvP settlement module | 400,000–800,000 | 4–6 months |
| GTB + SWIFT + FAST/PayNow integration | 600,000–1,200,000 | 6–9 months |
| Security (audit, pen testing, MAS TRM) | 250,000–500,000 | 3–4 months |
| **Total Custom Build** | **4,450,000–8,200,000** | **24–36 months** |
| **Annual Maintenance (20%)** | **890,000–1,640,000/year** | Ongoing |

DALP's three-year platform license (EUR 1,260,000) represents approximately 15–28% of the estimated custom build cost, with a 19-week deployment timeline versus 24–36 months. The annual license (EUR 420,000) is less than half the estimated annual maintenance cost of a custom build.

### 11.2 Revenue Opportunity Acceleration

UOB's trade finance digitalisation is both a cost-reduction programme and a revenue opportunity. Digital trade finance enables:

**New Corridor Capture:** ASEAN trade corridors where paper-based LC and BoL processes create friction can be captured with digital instruments, enabling UOB to serve smaller trade transactions that are not economically viable with paper-based processing overhead.

**Financing Revenue:** Digital invoice financing and BoL-backed lending provide fee income streams that paper-based trade finance supports less efficiently. Faster processing (from days to hours) increases throughput per trade finance officer.

**Correspondent Banking Differentiation:** A UOB digital trade finance capability positions UOB as a preferred correspondent bank for ASEAN financial institutions seeking to digitise their trade finance operations, a growing market following Singapore's TradeTrust initiative.

The 19-week deployment timeline versus 24–36 months for a custom build means UOB captures 18–24 months of this revenue opportunity earlier with DALP.

### 11.3 Operational Cost Reduction

**LC Processing Automation:** Automated LC examination support (compliance engine validates presentation conditions; discrepancy workflow automation) reduces manual examination time. Conservative estimate: 30–40% reduction in trade finance officer time per LC examination.

**Reconciliation Elimination:** DALP's atomic XvP settlement eliminates the reconciliation gap between document transfer and payment. No failed settlements to unwind; no counterparty disputes about payment timing. Conservative estimate: 15–20 hours per month in reconciliation overhead eliminated per corridor.

**Audit Evidence Generation:** DALP's immutable audit trail generates the MAS examination evidence pack automatically. Current manual audit evidence assembly for MAS IT examinations can take 2–5 days per examination. DALP reduces this to hours.

---

*All prices exclude applicable taxes and VAT. Platform licenses are payable annually and upfront. This proposal is valid for 90 days from the date above.*
