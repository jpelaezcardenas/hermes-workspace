# Commercial Proposal: Tokenized Commodity Finance Platform

**Prepared for:** ANZ Banking Group Ltd
**Date:** 20 March 2026
**Version:** 1.0 Draft
**Classification:** SettleMint Confidential. Invited Bidders Only
**Reference:** ANZ-RFP-202603

*All prices exclude applicable taxes and VAT, including Australian GST where applicable.*

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

*All prices exclude applicable taxes and VAT, including Australian GST.*

---

## 2. Commercial Summary

ANZ Banking Group's tokenized commodity finance programme requires a commercial model that reflects the institution's scale, its multi-year digital asset investment commitment, and the regulatory requirements of an APRA-regulated deployment. This proposal provides transparent, scalable pricing with no transaction fees, no hidden commercial structures, and explicit treatment of all cost categories.

**Year 1 Platform License Summary:**

| Component | Annual Cost (EUR) |
|-----------|------------------|
| Production License | 300,000 |
| Development License | 120,000 |
| **Total Year 1 Platform License** | **420,000** |

*All prices exclude applicable taxes and VAT including Australian GST. Annual, upfront payment.*

**Three-Year Platform License:**

| Year | Total License (EUR) |
|------|---------------------|
| Year 1 | 420,000 |
| Year 2 | 420,000 |
| Year 3 | 420,000 |
| **3-Year Total** | **1,260,000** |

Implementation services and support fees are scoped per engagement. Indicative ranges are provided in Sections 4 and 6.

---

## 3. Licensing Model

### 3.1 Environment-Based, Transaction-Fee-Free

DALP licensing is per environment, not per transaction, per instrument, or per counterparty. ANZ's tokenized commodity finance programme, regardless of the number of letters of credit issued, receivables financed, or bills of lading processed, pays only the environment licensing fee. Scaling the programme's transaction volume does not scale the platform licensing cost.

This model is particularly important for commodity finance, where transaction volume can be highly variable (tied to commodity market cycles, trade flow seasonality, and counterparty activity) and difficult to predict at contract execution. ANZ is not exposed to commercial upside risk from an active commodity market cycle.

### 3.2 License Rates

| Environment | Monthly Equivalent | Annual Fee (Upfront) |
|-------------|------------------|---------------------|
| Production | EUR 25,000/month | EUR 300,000/year |
| Development | EUR 10,000/month | EUR 120,000/year |

*All prices exclude applicable taxes and VAT. Annual, upfront.*

### 3.3 Expansion Licensing

ANZ's commodity finance programme is likely to expand across legal entities (ANZ Australia, ANZ New Zealand, ANZ Pacific operations) and jurisdictions. The expansion licensing model accommodates this:

| Expansion Scenario | Incremental Annual License (EUR) |
|-------------------|----------------------------------|
| Add ANZ New Zealand (second production environment) | 300,000 |
| Add staging environment | 120,000 |
| Add ANZ Pacific (third production environment) | 300,000 |
| Full ANZ Group deployment (3 production + 2 development) | 900,000 + 240,000 = 1,140,000 |

Each new production environment is configured for its specific regulatory jurisdiction (New Zealand FMA, Pacific regional regulators) through DALP's compliance template system, not through custom development.

---

## 4. Implementation Services Pricing

### 4.1 Implementation Investment

The 19-week implementation is scoped for the full programme including LC, receivables, and BL tokenization, NPP integration, AUSTRAC reporting, and A$DC settlement architecture. Based on comparable APAC bank deployments, the indicative implementation investment is:

| Scope Scenario | Indicative Range (EUR) |
|---------------|----------------------|
| Core: LC + Receivables + NPP + AUSTRAC integration | 380,000 - 550,000 |
| Full: Core + BL/TradeTrust + Project Acacia interoperability | 550,000 - 800,000 |

*Formal scoping in Phase 1 Discovery. Implementation fee fixed in SOW before Phase 2.*

### 4.2 Phase Breakdown

| Phase | Duration | Pricing Model |
|-------|----------|---------------|
| Phase 1: Discovery | 3 weeks | Fixed milestone |
| Phase 2: Configuration | 4 weeks | Fixed milestone |
| Phase 3: Integration | 4 weeks | T&M with ceiling |
| Phase 4: Testing | 3 weeks | Fixed milestone |
| Phase 5: Go-Live | 1 week | Fixed milestone |
| Phase 6: Hypercare | 4 weeks | Fixed milestone |

### 4.3 Optional Work Packages

| Package | Description | Indicative Cost (EUR) |
|---------|-------------|----------------------|
| BL/TradeTrust Integration | Full eBL workflow with TradeTrust document verification | 80,000 - 150,000 |
| Project Acacia Interoperability | Cross-network settlement testing and RBA CBDC alignment | 60,000 - 120,000 |
| ANZ New Zealand Expansion | Configuration and implementation for NZ jurisdiction | 120,000 - 200,000 |
| Commodity Price Feed Integration | LME/CME price data for margin calculation | 30,000 - 60,000 |
| AUSTRAC Advanced Reporting | Custom AUSTRAC reporting templates and automation | 40,000 - 80,000 |

---

## 5. Environment and Infrastructure Costs

### 5.1 AWS ap-southeast-2 (Sydney) Pass-Through

Infrastructure costs for AWS Sydney are passed through at actual AWS pricing without markup:

| Component | Indicative Annual Cost (USD) |
|-----------|------------------------------|
| EKS cluster (compute) | 18,000 - 30,000 |
| Aurora PostgreSQL Multi-AZ | 10,000 - 18,000 |
| CloudHSM (FIPS 140-2 L3) | 15,000 - 20,000 |
| S3, Secrets Manager, networking | 5,000 - 10,000 |
| **Total indicative (production)** | **48,000 - 78,000/year** |

*ANZ's existing AWS agreements and reserved instance commitments may materially reduce these costs.*

### 5.2 Third-Party Pass-Through

| Service | Arrangement |
|---------|-------------|
| Fireblocks | ANZ contracts directly; no SettleMint markup |
| A$DC reserve management | Outside SettleMint scope; ANZ manages |
| TradeTrust | No TradeTrust network membership fees to SettleMint |
| NPP access | Through ANZ's existing NPP membership |

---

## 6. Support and Maintenance Fees

### 6.1 Enterprise Support

Enterprise Support (24/7/365) is required for an APRA-regulated operational risk management programme.

| Metric | Commitment |
|--------|-----------|
| Coverage | 24/7/365 |
| Uptime | 99.99% monthly |
| P1 Response | 15 minutes |
| P1 Resolution | 2 hours |

**Annual Enterprise Support Fee:** [CLIENT-SPECIFIC, indicative range EUR 100,000-150,000/year based on APAC bank scale and programme complexity]

### 6.2 APRA Incident Notification Included

Enterprise Support includes APRA-compatible incident notification procedures: immediate notification, 30-minute status updates, 5-business-day post-incident root cause analysis, consistent with APRA's prudential requirements for material operational incidents.

---

## 7. Total Cost of Ownership Analysis

### 7.1 Three-Year TCO

| Category | Year 1 (EUR) | Year 2 (EUR) | Year 3 (EUR) | 3-Year (EUR) |
|----------|-------------|-------------|-------------|-------------|
| Platform License | 420,000 | 420,000 | 420,000 | 1,260,000 |
| Implementation | 380,000-550,000 | - |, | 380,000-550,000 |
| Enterprise Support | 100,000-150,000 | 100,000-150,000 | 100,000-150,000 | 300,000-450,000 |
| AWS Infrastructure | ~60,000 | ~65,000 | ~70,000 | ~195,000 |
| **Total Range** | | | | **2,135,000-2,455,000** |

### 7.2 Build vs. Buy

Custom development of a comparable commodity finance tokenization platform, including smart contract development, security audits, compliance engine, settlement infrastructure, documentary compliance module, NPP integration, AUSTRAC reporting, and operational tooling, would cost:

| Component | Custom Development (3 years, EUR) |
|-----------|----------------------------------|
| Smart contract and compliance engine | 500,000 - 1,000,000 |
| Settlement infrastructure (DvP, XvP, HTLC) | 400,000 - 800,000 |
| Integration development (NPP, SWIFT, AUSTRAC) | 300,000 - 600,000 |
| Security and operational tooling | 200,000 - 400,000 |
| Ongoing maintenance (3 years) | 600,000 - 1,200,000 |
| **Total custom development** | **2,000,000 - 4,000,000** |

Custom development also carries: 18-24 month development timeline (vs. 19 weeks); no pre-audited smart contract library (each audit costs USD 200,000-500,000); no APRA-validated deployment reference; no production commodity finance track record.

### 7.3 Commodity Finance ROI

**Settlement cost reduction:** Eliminating T+2 correspondent banking settlement cycles for AUD-denominated commodity transactions, replaced by T+0 atomic DvP, reduces intraday funding costs. For AUD 1 billion of daily commodity finance settlement exposure at 4.35% (RBA cash rate equivalent), T+2 reduction saves approximately AUD 24 million/year in funding cost.

**Documentary compliance efficiency:** Automating documentary condition verification and endorsement workflows reduces trade operations staffing requirements. For a commodity finance programme processing 500+ LC transactions monthly, automated documentary compliance replaces substantial manual review effort.

**Cross-border settlement savings:** Eliminating correspondent banking intermediation for cross-border commodity settlements reduces correspondent banking fees. Typical correspondent banking fee for a USD/AUD FX settlement is 0.1-0.5% of transaction value; at scale across ANZ's commodity finance book, this is material.

**Counterparty risk elimination:** Atomic DvP settlement eliminates the counterparty risk associated with T+2 settlement periods. For ANZ's commodity finance portfolio, this has a direct balance sheet impact: reduced credit RWA for settlement exposures.

---

## 8. Payment Terms and Milestones

### 8.1 Platform License

Annual, upfront. First payment due within 30 days of contract execution. Subsequent payments on each anniversary.

### 8.2 Implementation Services Milestones

| Milestone | Trigger | Percentage |
|-----------|---------|-----------|
| Kickoff | Contract signed | 20% |
| Phase 1 Complete | BRD and architecture accepted | 15% |
| Phase 2 Complete | Environments provisioned, configuration accepted | 15% |
| Phase 3 Complete | Integration testing evidence accepted | 20% |
| Phase 4 Complete | UAT sign-off | 20% |
| Phase 5+6 Complete | Go-live and hypercare completion | 10% |

### 8.3 Currency

Invoices in EUR. ANZ's payment currency preference (EUR or AUD equivalent) confirmed at contract execution. AUD equivalent uses EUR/AUD exchange rate at contract execution, fixed for 12 months.

---

## 9. Commercial Assumptions Register

| Assumption | Detail |
|-----------|--------|
| Pricing validity | 90 days from submission (until 19 June 2026) |
| Annual price cap | Lower of 5% or EU HICP for preceding 12 months |
| Minimum term | 3 years |
| Payment structure | Annual, upfront; no monthly option |
| GST | Australian GST applied to services delivered in Australia per applicable tax law |
| A$DC programme | Implementation assumes A$DC is not yet production-ready; NPP-coordinated settlement is initial go-live model |
| APRA vendor risk | ANZ's APRA vendor risk assessment timeline may affect programme start date; Phase 1 can commence under NDA while assessment proceeds |
| Implementation exclusions | APRA regulatory filings, legal classification opinions, Fireblocks enterprise agreement, third-party custody fees, ANZ internal team costs |
| Project Acacia | No hard dependency on RBA CBDC timeline; architecture supports migration to wholesale CBDC when available |

---

## 10. Exit and Transition Terms

### 10.1 Data Portability

Full data portability at all times:
- All instrument event logs exportable via time-windowed API queries
- All compliance module configurations exportable as structured JSON
- All on-chain data immutably accessible from the blockchain network independent of SettleMint contract
- Token contracts and governance roles remain under ANZ control post-termination

### 10.2 Transition Assistance

90-day transition period on contract termination with: data export assistance, configuration documentation, knowledge transfer sessions, and run-state handover support. Transition assistance included in final year's support fee.

### 10.3 APRA Exit Requirements

The transition plan addresses APRA's outsourcing notification requirements: ANZ is notified at least 12 months before any material change to SettleMint's service delivery or corporate structure. On contract termination, SettleMint provides a formal transition support plan consistent with APRA prudential guidance on exit from outsourcing arrangements.

---

## 11. Value Justification

### 11.1 No Transaction Fees at Scale

ANZ's commodity finance book is large and variable. The A$DC stablecoin programme, Project Acacia participation, and commodity trade digitalization create the conditions for significant volume growth over the 3-year contract period. With DALP's environment-based licensing, volume growth costs ANZ nothing in additional platform fees. Every incremental LC, receivable, or BL settled on DALP is economically free from a platform licensing perspective.

This is structurally different from blockchain infrastructure models that charge per-transaction fees, which would create a commercial incentive for ANZ to moderate programme scale rather than expand it.

### 11.2 APRA Compliance Without Custom Development

Building an APRA CPS 230/234-compliant blockchain platform from scratch would require: an APRA-approved service provider framework built from zero; vendor risk assessments completed for new sub-contractors; security audits of custom-built compliance infrastructure; and operational resilience validation against CPS 230 standards.

DALP's existing ISO 27001 and SOC 2 Type II certifications, combined with the documented AWS Sydney deployment architecture and Enterprise SLA, provide ANZ's InfoSec and Risk teams with the compliance foundation for APRA CPS 234 vendor assessment. ANZ pays for DALP's platform; the APRA compliance foundation comes with it.

### 11.3 Project Acacia Positioning at No Additional Cost

SettleMint's ERC-3643-based DALP architecture is Project Acacia-compatible today. When the RBA moves Project Acacia from research to production, ANZ's tokenized commodity finance platform can participate without requiring platform replacement or re-implementation. The compatibility is built into the architecture, not bolted on as an optional module.

For ANZ's strategic positioning in Australian wholesale digital markets, this means the commodity finance investment is also the Project Acacia infrastructure investment, a single commercial commitment, two strategic outcomes.

---

*End of Commercial Proposal: ANZ Banking Group. Tokenized Commodity Finance Platform*
*Document version: 1.0 Draft | Prepared: 20 March 2026 | SettleMint Confidential*
*All prices exclude applicable taxes and VAT including Australian GST.*
