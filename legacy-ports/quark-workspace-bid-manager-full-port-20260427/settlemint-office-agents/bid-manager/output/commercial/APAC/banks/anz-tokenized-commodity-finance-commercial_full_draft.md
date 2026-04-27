# Commercial Proposal: Tokenized Commodity Finance Platform

**Prepared for:** ANZ Banking Group Ltd
**Date:** 20 March 2026
**Version:** 1.0 Draft
**Classification:** SettleMint Confidential. Invited Bidders Only
**Reference:** ANZ-RFP-202603

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

**Document Title:** Commercial Proposal: Tokenized Commodity Finance Platform
**Client:** ANZ Banking Group Ltd, Australia
**Date:** 20 March 2026
**Version:** 1.0 Draft
**Prepared by:** SettleMint NV
**Classification:** SettleMint Confidential

*This document contains proprietary and confidential pricing information belonging to SettleMint NV. Submitted exclusively in response to ANZ-RFP-202603. All prices exclude applicable taxes and VAT.*

---

## 2. Commercial Summary

ANZ's tokenized commodity finance programme represents a strategic infrastructure investment in Australia's commodity trading ecosystem. The programme addresses real operational pain points, manual LC workflows, document-intensive financing, correspondent banking settlement risk, with a platform that supports the full lifecycle from instrument origination through settlement and servicing.

SettleMint's commercial model provides transparent, scalable pricing appropriate for an APRA-regulated institution:

**Platform License (Year 1):**

| Environment | Annual Fee (EUR) |
|-------------|-----------------|
| Production License | 300,000 |
| Development License | 120,000 |
| Staging License | 120,000 |
| **Total Year 1** | **540,000** |

*All prices exclude applicable taxes and VAT. Payment is annual, upfront.*

**Three-Year Platform License:**

| Year | Total |
|------|-------|
| Year 1 | 540,000 |
| Year 2 | 540,000 |
| Year 3 | 540,000 |
| **3-Year Total** | **1,620,000** |

Implementation services and support fees are scoped separately below.

---

## 3. Licensing Model

### 3.1 Platform Licensing Philosophy

DALP licensing is environment-based, not transaction-based. ANZ pays for environments, not transaction volumes. This model aligns SettleMint's incentives with ANZ's programme success: SettleMint's revenue is not tied to how many commodity finance transactions ANZ processes, which means there is no commercial pressure to push ANZ toward higher volumes than operationally appropriate.

The licensing model supports ANZ's strategic objective of establishing a "controlled and reusable operating model for tokenized commodity finance that can move from pilot scope to business-as-usual operations without a re-platform." New commodity instrument types, new counterparty segments, and new settlement models are accommodated through platform configuration, not additional license fees.

### 3.2 Environment Licensing Rates

| Environment | Monthly Rate | Annual Rate (Upfront) |
|-------------|-------------|----------------------|
| Production | EUR 25,000/month | EUR 300,000/year |
| Development | EUR 10,000/month | EUR 120,000/year |
| Staging | EUR 10,000/month | EUR 120,000/year |

**Standard configuration for ANZ:** Production (1) + Development (1) + Staging (1) = EUR 540,000/year

### 3.3 Expansion Pricing

| Scenario | Incremental Annual Cost |
|----------|----------------------|
| Add second production environment (new legal entity) | EUR 300,000/year |
| Add regional deployment (e.g., Singapore hub) | EUR 300,000/year |
| Add new jurisdiction environment | EUR 300,000/year |

---

## 4. Implementation Services Pricing

### 4.1 Indicative Implementation Investment

Based on SettleMint's experience with comparable APAC trade finance and commodity finance deployments, the estimated implementation investment for ANZ's 19-week programme:

| Scenario | Indicative Range (EUR) |
|----------|----------------------|
| Standard scope (LC, receivables, A$DC settlement, basic NPP integration) | 400,000 - 550,000 |
| Extended scope (+ BL tokenization, TradeTrust integration, cross-currency XvP) | 550,000 - 750,000 |

*These are indicative ranges for planning. Formal scoped fee confirmed during Phase 1 Discovery.*

### 4.2 Phase Breakdown

| Phase | Duration | Indicative Effort | Pricing Model |
|-------|----------|------------------|---------------|
| Phase 1: Discovery and Requirements | 3 weeks | 8-12 person-weeks | Fixed milestone |
| Phase 2: Configuration and Setup | 4 weeks | 12-16 person-weeks | Fixed milestone |
| Phase 3: Integration Development | 4 weeks | 16-24 person-weeks | T&M with cap |
| Phase 4: Testing and UAT | 3 weeks | 12-16 person-weeks | Fixed milestone |
| Phase 5: Go-Live | 1 week | 6-8 person-weeks | Fixed milestone |
| Phase 6: Hypercare | 4 weeks | 8-12 person-weeks | Fixed milestone |
| **Total** | **19 weeks** | **62-88 person-weeks** | |

### 4.3 Optional Scope Items

| Optional Item | Description | Indicative Cost (EUR) |
|--------------|-------------|----------------------|
| TradeTrust eBL Integration | Full electronic Bill of Lading verification and interoperability | 80,000 - 150,000 |
| Project Acacia CBDC Alignment | Wholesale CBDC settlement preparation for when RBA issues | 60,000 - 100,000 |
| Advanced AML/CTF Reporting | Custom AUSTRAC reporting formats beyond standard event export | 40,000 - 80,000 |
| Additional Commodity Types | Configuration for new commodity categories beyond initial scope | 30,000 - 60,000 per type |

---

## 5. Environment and Infrastructure Costs

### 5.1 AWS Sydney (ap-southeast-2)

ANZ's production deployment in AWS Sydney satisfies APRA data residency requirements.

**Indicative AWS Infrastructure Costs (Annual):**

| Component | Indicative Cost (USD) |
|-----------|---------------------|
| EKS cluster (3x m5.xlarge nodes) | 20,000-30,000 |
| Aurora PostgreSQL Multi-AZ | 12,000-18,000 |
| S3 with versioning | 1,000-3,000 |
| AWS KMS / CloudHSM | 15,000-25,000 |
| Network (ALB, PrivateLink, data transfer) | 5,000-10,000 |
| CloudWatch logging | 3,000-6,000 |
| **Total** | **56,000-92,000/year** |

*Infrastructure is pass-through at cost, not marked up. Costs depend on transaction volumes and storage growth.*

### 5.2 Third-Party Pass-Through

| Third-Party | Cost | Arrangement |
|-------------|------|-------------|
| Fireblocks | Enterprise pricing | Direct client agreement |
| NPP connectivity | ANZ's existing arrangement | No additional cost |
| SWIFT | ANZ's existing arrangement | No additional cost |
| Commodity price feeds (LME, CME) | Provider pricing | Direct client agreement |

---

## 6. Support and Maintenance Fees

### 6.1 Enterprise Support (Recommended)

Given APRA's operational resilience requirements (CPS 230), Enterprise Support is the appropriate tier:

| Attribute | Enterprise |
|-----------|-----------|
| Coverage | 24/7/365 |
| Uptime SLA | 99.99% monthly |
| P1 Response | 15 minutes |
| P1 Resolution | 2 hours |
| Named Support Team | Dedicated team familiar with ANZ deployment |
| Quarterly Architecture Review | Included |

**Enterprise Support Annual Fee:** [CLIENT-SPECIFIC, indicative EUR 120,000-180,000/year]

### 6.2 SLA Credits

| Uptime Achieved | Credit |
|-----------------|--------|
| Below SLA but ≥ 99.0% | 10% of monthly support fees |
| Below 99.0% but ≥ 98.0% | 25% of monthly support fees |
| Below 98.0% | 50% of monthly support fees |

---

## 7. Total Cost of Ownership Analysis

### 7.1 Three-Year TCO Model

| Cost Category | Year 1 (EUR) | Year 2 (EUR) | Year 3 (EUR) | 3-Year Total (EUR) |
|--------------|-------------|-------------|-------------|-------------------|
| Platform License | 540,000 | 540,000 | 540,000 | 1,620,000 |
| Implementation | 400,000-550,000 | - |, | 400,000-550,000 |
| Enterprise Support | 120,000-180,000 | 120,000-180,000 | 120,000-180,000 | 360,000-540,000 |
| Infrastructure (AWS) | ~70,000 | ~75,000 | ~80,000 | ~225,000 |
| **3-Year Total Range** | | | | **2,605,000-3,435,000** |

### 7.2 Build vs. Buy Comparison

Custom development of a comparable commodity finance tokenization platform would cost:
- Smart contract development and audit: EUR 800,000-1,500,000
- Compliance engine: EUR 400,000-800,000
- Settlement infrastructure: EUR 300,000-600,000
- Integration development: EUR 400,000-800,000
- Ongoing maintenance: EUR 400,000-800,000/year
- **3-Year Custom Development Total:** EUR 2,300,000-5,500,000+

DALP provides production-proven capabilities at lower total cost with reduced risk.

---

## 8. Payment Terms

| Payment | Timing |
|---------|--------|
| Year 1 Platform License | Due within 30 days of contract execution |
| Implementation Milestones | 20% at contract, 25% Phase 2, 25% Phase 3, 20% Phase 4, 10% Phase 5+6 |
| Support Fees | Annual, upfront |

---

## 9. Commercial Assumptions

| Assumption | Description |
|------------|-------------|
| A-001 | APRA vendor risk assessment process can accommodate SettleMint's ISO 27001 and SOC 2 Type II certifications |
| A-002 | A$DC stablecoin programme is production-ready or ANP-coordinated settlement is available as interim |
| A-003 | TradeTrust eBL interoperability is phased to subsequent programme stage |
| A-004 | ANZ provides required integration access (Trade Finance Platform, NPP, AML/CTF) during Phase 3 |
| A-005 | No custom smart contract development required; all capabilities achieved through DALP configuration |

---

## 10. Exit and Transition Terms

ANZ retains full ownership of all data generated on its DALP deployment. Data export is available through DALP's API at any time. On-chain data is immutable and accessible directly from the blockchain network regardless of SettleMint relationship.

Transition assistance includes 90 days of data export support, configuration documentation, and up to 10 knowledge transfer sessions.

---

## 11. Value Justification

ANZ's tokenized commodity finance programme delivers value across multiple dimensions:

**Operational efficiency:** Tokenized LC and receivables settlement replaces manual document workflows with automated on-chain execution. The Reserve Bank of India trade finance reference demonstrates this at production scale.

**Settlement risk elimination:** Atomic DvP settlement with A$DC eliminates correspondent banking settlement risk. Maybank Project Photon demonstrates this architecture at production scale.

**Regulatory alignment:** APRA CPS 230/234, ASIC, and AML/CTF compliance built into the platform architecture, not added as an afterthought.

**Strategic positioning:** Project Acacia alignment positions ANZ for the next phase of Australia's digital asset market infrastructure development.

---

*End of Commercial Proposal: ANZ. Tokenized Commodity Finance Platform*

*Document version: 1.0 Draft | Prepared: 20 March 2026 | SettleMint Confidential*
*All prices exclude applicable taxes and VAT.*
