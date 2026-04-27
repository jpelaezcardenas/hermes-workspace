# Commercial Proposal: Digital Bond Platform

**Prepared for:** State Bank of India
**Date:** 20 March 2026
**Version:** 1.0 Final
**Classification:** SettleMint Confidential. Invited Bidders Only
**Reference:** STATE-BANK-OF-INDIA-RFP-202603

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

**Document Title:** Commercial Proposal: Digital Bond Platform
**Client:** State Bank of India, Mumbai, India
**Date:** 20 March 2026
**Version:** 1.0 Final
**Prepared by:** SettleMint NV
**Classification:** SettleMint Confidential

*This document contains proprietary and confidential pricing information belonging to SettleMint NV. It is submitted exclusively in response to STATE-BANK-OF-INDIA-RFP-202603. All prices exclude applicable taxes and VAT.*

---

## 2. Commercial Summary

State Bank of India's digital bond platform requires a commercial model with complete transparency, clear separation between fixed and variable costs, and predictable scaling economics as the programme expands from initial deployment to SBI's full bond portfolio operations. This proposal provides exactly that.

SettleMint's commercial model is structured around three components: platform licensing (annual, upfront), implementation services (fixed-fee, phase-gated), and support (tiered SLA. Enterprise recommended for SBI's operational criticality). The platform licensing model is environment-based and does not scale with transaction volume, number of bond issuances, investor count, or assets under management.

**Summary of Platform Licensing Costs (Year 1):**

*All prices exclude applicable taxes and VAT.*

| Component | Annual Cost (EUR) |
|---|---|
| Production License (1 environment) | 300,000 |
| Development License (1 environment) | 120,000 |
| Implementation Services (19-week programme) | [CLIENT-SPECIFIC: scoped in Phase 1] |
| Enterprise Support and Maintenance | [CLIENT-SPECIFIC: scoped per tier] |
| Infrastructure (AWS ap-south-1 Mumbai, pass-through) | [Pass-through at cost, not marked up] |
| **Platform License Total (Year 1)** | **420,000** |

*All prices payable annually and upfront. Infrastructure costs are pass-through at cost.*

**Three-Year Platform License Summary:**

| Year | Production (EUR) | Development (EUR) | Total (EUR) |
|---|---|---|---|
| Year 1 | 300,000 | 120,000 | 420,000 |
| Year 2 | 300,000 | 120,000 | 420,000 |
| Year 3 | 300,000 | 120,000 | 420,000 |
| **3-Year Total** | **900,000** | **360,000** | **1,260,000** |

*All prices exclude applicable taxes and VAT. Three-year figures represent platform licensing only.*

---

## 3. Licensing Model

### 3.1 Platform Licensing Philosophy

SettleMint licenses DALP on an annual, per-environment basis. Four principles are especially relevant for SBI's procurement:

**Environment-based, not transaction-based:** SBI pays for environments. As SBI's digital bond portfolio grows, adding more G-Sec series, additional corporate bond issuers, and expanding investor sub-accounts, the platform license cost does not change. The economics of SBI's bond programme improve with scale without license cost escalation.

**All asset classes within one license:** The production license covers all DALP asset classes, bonds (G-Sec, SDL, T-Bill, corporate), deposits, stablecoins (including e-Rupee-compatible INR stablecoin), configurable tokens for any additional instrument, without incremental fees per asset class.

**Multi-year cost certainty:** Platform license fees are locked for the minimum term. SBI's treasury and finance functions can model the platform cost with certainty over the contract horizon.

**Public sector scalability:** Additional production environments for new SBI entities (subsidiaries, affiliated institutions) or new regulatory jurisdictions are priced at the standard environment rate. There is no premium for SBI's scale or public sector status.

### 3.2 License Types

**Production License: EUR 300,000 per year (EUR 25,000 per month equivalent)**

Covers SBI's live digital bond platform environment. Includes full DALP capabilities: all bond lifecycle functionality, compliance engine, settlement module (RTGS and e-Rupee readiness), custody integrations, observability, and API access. No per-transaction, per-bond, or per-investor restrictions.

**Development License: EUR 120,000 per year (EUR 10,000 per month equivalent)**

Covers SBI's non-production environments (development, testing, staging, pre-production). Full DALP capability for building, testing, and validating the production environment configuration.

*All prices exclude applicable taxes and VAT.*

### 3.3 India-Specific Pricing Considerations

**Currency:** All SettleMint platform license fees are denominated in EUR. SBI's finance team manages the INR/EUR conversion at prevailing rates at time of payment. SettleMint does not offer INR-denominated pricing due to EUR-based operating costs.

**Withholding Tax:** SBI should seek guidance from its tax advisors on applicable withholding tax obligations for EUR-denominated software license payments to a European entity (SettleMint NV is incorporated in Belgium). The India-Belgium double tax treaty may affect withholding obligations. SettleMint will provide the documentation required for treaty benefit claims as applicable.

**GST:** DALP platform licenses supplied by SettleMint NV (a foreign entity) to SBI (an Indian entity) fall under India's GST framework for import of services. SBI's tax team should confirm applicable IGST obligations (typically 18% on imported software services) and reverse-charge mechanism applicability. All SettleMint invoices exclude GST; GST is SBI's liability under reverse charge.

---

## 4. Implementation Services Pricing

### 4.1 Implementation Model

Implementation services are scoped as a fixed-fee engagement following Phase 1 Discovery. The fixed-fee model provides SBI with complete cost certainty and eliminates time-and-materials overrun risk, appropriate for a public sector bank subject to procurement audit.

**Implementation Services: [CLIENT-SPECIFIC, confirmed after Phase 1 scope validation]**

The implementation scope for SBI's digital bond platform includes:

- Phase 1: Discovery (3 weeks): Stakeholder workshops across Treasury, DCM, Technology, Compliance, Risk, Internal Audit; regulatory mapping; architecture design
- Phase 2: Configuration (4 weeks): Environment provisioning (AWS ap-south-1 or SBI data centre); G-Sec and corporate bond token configuration; compliance module setup; HSM connectivity
- Phase 3: Integration (4 weeks): Finacle CBS integration; RTGS/SFMS integration; NDS-OM API integration; CCIL settlement integration; AML/KYC integration; CERT-In compliant SIEM integration
- Phase 4: Testing (3 weeks): Functional SIT; CERT-In aligned security assessment; performance testing; UAT with Treasury and Compliance teams; DR testing
- Phase 5: Go-Live (1 week): India-domiciled production deployment; go-live validation
- Phase 6: Hypercare (4 weeks): Intensive monitoring; optimisation; knowledge transfer; operational readiness assessment

### 4.2 SBI-Specific Implementation Considerations

**Governance Overhead:** SBI's multi-layered governance structure. Steering Committee, Architecture Review Board, Security Review Committee, Internal Audit involvement, requires additional coordination overhead compared to private sector bank engagements. SettleMint's delivery methodology accounts for this; the fixed-fee scope includes SBI-appropriate governance coordination.

**India-Domiciled Deployment:** On-premises deployment at SBI's data centre (if selected) requires coordination with SBI's infrastructure team for Kubernetes cluster provisioning, HSM hardware integration, and network connectivity configuration. This coordination is included in the implementation scope.

**RBI/CCIL Coordination:** NDS-OM and CCIL integration may require authorisation from RBI and/or CCIL before API access is granted. SettleMint supports SBI in the technical aspects of this authorisation; the commercial timeline accounts for a reasonable authorisation period.

### 4.3 Out-of-Scope Items

- Custom smart contract development beyond DALP's standard configurable architecture
- Investor-facing retail banking application development (DALP provides the API; SBI's digital banking team builds the investor interface)
- Legal advisory on SEBI digital securities licence or RBI regulatory approvals
- Standalone e-Rupee contract development (DALP provides the integration architecture; the e-Rupee contract is RBI's infrastructure)
- Multi-SBI-entity expansion (separate implementation scope per entity)

---

## 5. Environment and Infrastructure Costs

### 5.1 Cloud Infrastructure (AWS ap-south-1 Mumbai, Pass-Through)

Where DALP is deployed on AWS ap-south-1 Mumbai (SettleMint-managed cloud), cloud costs are passed through to SBI at cost without markup:

| Component | Monthly Estimate (USD) | Annual Estimate (USD) |
|---|---|---|
| Compute (EKS + EC2, multi-AZ) | 3,500–5,500 | 42,000–66,000 |
| Database (RDS PostgreSQL, multi-AZ) | 800–1,500 | 9,600–18,000 |
| Object Storage (S3 + Object Lock for audit) | 150–400 | 1,800–4,800 |
| Observability stack | 400–700 | 4,800–8,400 |
| Data transfer + Direct Connect | 300–600 | 3,600–7,200 |
| **Total Estimated Cloud (USD)** | **5,150–8,700** | **62,000–104,400** |

*Infrastructure costs exclude applicable taxes. Pass-through at cost without SettleMint markup.*

### 5.2 On-Premises Infrastructure (SBI-Borne)

For on-premises deployment, key infrastructure requirements and indicative costs:

| Component | Indicative Capital Cost | Notes |
|---|---|---|
| Kubernetes cluster (production) | SBI infrastructure budget | 8+ worker nodes; equivalent to 128 vCPU / 512GB RAM |
| HSM appliance (Thales Luna SA 7) | INR 35–60 lakh per appliance | FIPS 140-2 Level 3; annual maintenance additional |
| PostgreSQL database infrastructure | SBI infrastructure budget | Enterprise HA setup with streaming replication |
| Immutable log storage | SBI infrastructure budget | Write-once storage for CERT-In compliance |

*Capital costs are indicative; SBI's procurement team manages vendor selection and pricing.*

---

## 6. Support and Maintenance Fees

### 6.1 Enterprise Support Recommendation

SettleMint recommends **Enterprise Support** for SBI, given the critical infrastructure status of the digital bond platform and SBI's role in India's public sector capital markets.

**Enterprise Support: [CLIENT-SPECIFIC, confirmed at contract stage]**

Enterprise Support provides:
- 24/7/365 coverage
- P1 response: 15 minutes; resolution target: 2 hours
- P2 response: 1 hour; resolution target: 4 hours
- Named support team with SBI deployment expertise
- War-room escalation for P1 incidents
- 99.99% monthly uptime SLA (~4.3 minutes maximum monthly downtime)
- Continuous delivery with SBI approval gate before production deployment
- Quarterly architecture reviews with Solution Architect
- Bi-weekly operational review with named Customer Success Manager
- Support for RBI examination readiness (pre-examination preparation, audit evidence generation)

---

## 7. Total Cost of Ownership Analysis

### 7.1 Three-Year TCO

| Component | Year 1 (EUR) | Year 2 (EUR) | Year 3 (EUR) | 3-Year Total (EUR) |
|---|---|---|---|---|
| Production License | 300,000 | 300,000 | 300,000 | 900,000 |
| Development License | 120,000 | 120,000 | 120,000 | 360,000 |
| Implementation (Year 1) | [CLIENT-SPECIFIC] | - |, | [CLIENT-SPECIFIC] |
| Enterprise Support | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] | [CLIENT-SPECIFIC] |
| Cloud Infrastructure (USD indicative) | 62,000–104,000 | 67,000–112,000 | 72,000–120,000 | 201,000–336,000 |
| **Platform License Subtotal** | **420,000** | **420,000** | **420,000** | **1,260,000** |

*All prices exclude applicable taxes and VAT.*

### 7.2 Five-Year TCO

| Component | 5-Year Total (EUR) |
|---|---|
| Platform Licenses (Production + Development, 5 years) | 2,100,000 |
| Implementation Services (Year 1) | [CLIENT-SPECIFIC] |
| Enterprise Support (5 years) | [CLIENT-SPECIFIC] |
| Cloud Infrastructure (indicative) | 350,000–590,000 |

### 7.3 Public Sector Value Case

For SBI's context as a public sector bank, the value case extends beyond direct cost savings to include:

**Regulatory Modernisation Value:** India's digital capital markets agenda requires SBI to build and demonstrate digital bond capability. The cost of not investing, regulatory readiness gap, missed primary dealer efficiency gains, competitive disadvantage relative to private sector banks, is a significant but hard-to-quantify cost.

**Operational Efficiency:** Automated coupon distribution for SBI's G-Sec portfolio eliminates manual processing for each semi-annual coupon date. At SBI's portfolio scale (thousands of G-Sec series across hundreds of thousands of sub-account holders), this automation represents material operational cost avoidance. Conservative estimate: 5–10 FTE-weeks per coupon cycle across the portfolio eliminated.

**Settlement Risk Reduction:** Atomic DvP settlement eliminates settlement fails and the associated reconciliation, failed trade penalty, and reputational costs. India's CCIL data shows that even a small percentage reduction in settlement fails at SBI's volume creates significant cost avoidance.

**e-Rupee Readiness Value:** By building a digital bond platform architecturally compatible with RBI's wholesale e-Rupee, SBI positions itself as the first mover when RBI expands the e-Rupee programme to include G-Sec settlement. This architectural investment (no additional cost in the current proposal) creates an option value on India's CBDC-enabled capital markets transformation that competitors without a compatible platform cannot easily replicate.

---

## 8. Payment Terms and Milestones

### 8.1 Platform License

Annual, upfront. Invoiced at contract execution for Year 1; at each subsequent 12-month anniversary thereafter. Payable within 30 days of invoice.

**Currency:** EUR. All prices exclude applicable taxes and VAT.

### 8.2 Implementation Services

Milestone-based payment schedule:

| Milestone | Payment % | Trigger |
|---|---|---|
| Contract execution | 30% | Signed agreement |
| Phase 1 gate | 20% | BRD + compliance matrix + architecture document delivered |
| Phase 3 gate | 30% | All integrations operational (Finacle, RTGS, NDS-OM) |
| Phase 5 go-live | 20% | Production deployment confirmed |

### 8.3 Support

Annual, upfront. Concurrent with platform license invoice.

### 8.4 Infrastructure

Monthly in arrears. AWS billing report attached to each invoice as supporting documentation.

---

## 9. Commercial Assumptions Register

| ID | Assumption | Impact if Incorrect |
|---|---|---|
| CA-001 | Initial scope: Production + Development environments | Third environment (e.g., DR environment) priced as additional production environment |
| CA-002 | Minimum contract term: 36 months | Shorter term may affect commercial structure |
| CA-003 | Prices denominated in EUR; INR/EUR FX risk borne by SBI | No impact on SettleMint invoice |
| CA-004 | GST on imported software services under reverse charge mechanism is SBI's liability | SBI tax team to confirm; SettleMint provides GST documentation |
| CA-005 | Withholding tax per India-Belgium DTAA; SBI confirms applicable rate | SettleMint provides tax residency documentation for treaty benefit |
| CA-006 | NDS-OM API access authorised before Phase 3 commencement | Delay in NDS-OM access extends Phase 3 timeline; fixed-fee scope unchanged |
| CA-007 | Finacle CBS API available and documented for integration | Batch file integration fallback available if real-time API not supported |
| CA-008 | India-domiciled deployment (AWS Mumbai or SBI on-premises) confirmed in Phase 1 | Data residency and DPDP compliance depends on India deployment |
| CA-009 | SBI provides dedicated PM, technology lead, treasury SME, compliance SME | Resource shortfalls delay timeline; fixed-fee unchanged unless scope changes |
| CA-010 | CERT-In security assessment conducted by SBI-approved assessor | If SBI mandates specific assessor, SettleMint coordinates; timing impact assessed |
| CA-011 | e-Rupee wholesale settlement integration is out of scope for initial deployment | e-Rupee integration activatable through configuration change; no additional license fee |
| CA-012 | Platform license fees payable regardless of transaction volumes achieved post-go-live | License is payable from go-live date irrespective of bond issuance volumes |

---

## 10. Exit and Transition Terms

### 10.1 Data Portability

SBI retains full ownership of all data generated within the DALP platform. On request or contract termination:

- Complete export of all bond transaction data, compliance events, coupon distribution records, and audit logs in machine-readable JSON/CSV format
- Export of all investor registry data, configuration records, and operational records
- Full documentation package including architecture records, integration specifications, runbooks, and training materials
- Smart contract ABI and deployment records for independent verification of on-chain positions

Data exports are available through the self-service API at any time during the contract term. Managed export on termination has a 30-day processing period for full historical export.

### 10.2 Transition Support

Minimum 90 days of transition support from termination notice:

- Read-only platform access for data extraction and verification
- Assistance with migration of active bond positions to alternative infrastructure
- RBI examination continuity support during transition
- Knowledge transfer to incoming provider or SBI's internal team

Extended transition support beyond 90 days available at SettleMint's standard rates.

### 10.3 Intellectual Property

SBI retains perpetual rights to all data, configurations, integration code developed during the engagement, and documentation. SettleMint retains DALP platform IP. Smart contracts deployed on-chain remain accessible to SBI through public blockchain infrastructure regardless of the commercial relationship. Governance keys are held by SBI under the bring-your-own-custody model. SBI is never locked out of its own on-chain bond infrastructure.

---

## 11. Value Justification

### 11.1 Build vs. Buy for SBI

SBI has the technical capability to build a digital bond platform internally. The question is whether the investment of time, capital, and management attention required for an internal build is the best use of SBI's resources given India's digital capital markets timeline.

**Internal Build Estimated Costs:**

| Component | Estimated Cost (INR crore) | Timeline |
|---|---|---|
| Core bond tokenisation platform | 15–25 crore | 18–24 months |
| SEBI/RBI compliance engine | 5–10 crore | 6–12 months |
| Key management (HSM integration) | 3–6 crore | 3–6 months |
| Settlement module (DvP/RTGS) | 4–8 crore | 4–6 months |
| Finacle / NDS-OM / CCIL integration | 5–10 crore | 6–9 months |
| Security (smart contract audit + pen testing) | 2–4 crore | 2–4 months |
| **Total Internal Build (Estimated)** | **34–63 crore** | **24–36 months** |
| **Annual Maintenance (20% of build)** | **7–13 crore/year** | Ongoing |

**DALP, 3-Year Platform License Cost:**
- Platform licenses: EUR 1,260,000 (approximately INR 11–12 crore at prevailing rates)
- Implementation services: [CLIENT-SPECIFIC, materially lower than internal build]
- Support: [CLIENT-SPECIFIC]

**Conclusion:** DALP's three-year platform license (approximately INR 11–12 crore) is a fraction of the estimated internal build cost (INR 34–63 crore), with a 19-week deployment timeline versus 24–36 months for internal development. The ongoing maintenance cost of an internal build (INR 7–13 crore per year) significantly exceeds DALP's annual license cost over any reasonable time horizon.

For SBI as a public sector bank, the capital efficiency argument is compelling: the same capability is available at materially lower cost, faster timeline, and with proven production references including SBI's own existing DALP engagement, without consuming SBI's engineering capacity that is needed for core banking modernisation, digital banking product development, and RBI-mandated technology programmes.

### 11.2 Strategic Timing Value

India's digital capital markets transformation timeline is driven by RBI and SEBI policy, not by individual bank readiness. The institutions that build digital bond capability now will have 18–24 months of operational experience when the broader market transitions. The institutions that wait for complete regulatory clarity will be 18–24 months behind.

DALP's 19-week deployment timeline allows SBI to build operational experience, refine the investor base, and demonstrate regulatory compliance capability before the broader digital bond market develops. This first-mover operational advantage, built on a platform that already has SBI as a production reference, is a strategic asset that the DALP commercial model makes achievable at a cost that is verifiably justified relative to alternatives.

### 11.3 Existing SBI Relationship Value

The existing SBI CBDC engagement means that SettleMint is not a new vendor for SBI. DALP has already been through SBI's security review, vendor risk assessment, and technical governance processes. SBI's teams have operational familiarity with DALP's architecture, API model, and operational characteristics. The digital bond platform engagement extends an existing validated relationship, avoiding the full cost and timeline of onboarding a new vendor through SBI's procurement and governance process.

---

*All prices in this proposal exclude applicable taxes and VAT. Platform licenses are payable annually and upfront. Implementation services and support fees are [CLIENT-SPECIFIC] pending Phase 1 scope validation. This proposal is valid for 90 days from the date above.*
