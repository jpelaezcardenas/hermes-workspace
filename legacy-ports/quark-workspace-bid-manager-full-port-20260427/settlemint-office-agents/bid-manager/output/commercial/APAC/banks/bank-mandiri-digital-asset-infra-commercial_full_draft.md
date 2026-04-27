# Commercial Proposal: Digital Asset Infrastructure Platform

**Prepared for:** PT Bank Mandiri (Persero) Tbk
**Date:** 20 March 2026
**Version:** 1.0 Draft
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
8. Payment Terms and Milestones
9. Commercial Assumptions Register
10. Exit and Transition Terms
11. Value Justification

---

## 1. Cover Page

**Document Title:** Commercial Proposal: Digital Asset Infrastructure Platform
**Client:** PT Bank Mandiri (Persero) Tbk, Indonesia
**Date:** 20 March 2026
**Version:** 1.0 Draft
**Prepared by:** SettleMint NV

---

## 2. Commercial Summary

PT Bank Mandiri (Persero) Tbk is Indonesia's largest state-owned bank and a systemically important financial institution. The commercial model for this programme reflects that institutional reality: transparent, auditable pricing consistent with BUMN procurement standards, with no volume-linked fees that create unpredictable cost growth as the programme scales across Indonesia's banking system.

**Year 1 Platform License Summary:**

| Component | Annual Cost (EUR) |
|-----------|------------------|
| Production License | 300,000 |
| Development License | 120,000 |
| **Total Year 1 Platform License** | **420,000** |

*All prices exclude applicable taxes and VAT including Indonesian PPN. Annual, upfront.*

**Three-Year Summary:**

| Year | License Total (EUR) |
|------|---------------------|
| Year 1 | 420,000 |
| Year 2 | 420,000 |
| Year 3 | 420,000 |
| **3-Year Total** | **1,260,000** |

---

## 3. Licensing Model

### 3.1 BUMN-Compatible Pricing Structure

Bank Mandiri's procurement operates under BUMN (Badan Usaha Milik Negara) governance requirements. SettleMint's pricing model is designed to be transparent and auditable for BUMN procurement review:

**Environment-based, not usage-based:** License fees are per environment, not per transaction, per token, or per counterparty. The programme price is predictable regardless of the scale of Bank Mandiri's digital asset activity.

**No hidden commercial traps:** All pricing, minimum commitments, and expansion costs are stated explicitly in this proposal. There are no volume thresholds, no tier-up provisions, and no transaction fees that emerge as the programme scales.

**Annual, upfront:** All license payments are annual and paid upfront, consistent with BUMN's preference for annual budget commitments rather than monthly variable costs.

### 3.2 License Rates

| Environment | Monthly Equivalent | Annual Fee (Upfront) |
|-------------|------------------|---------------------|
| Production | EUR 25,000/month | EUR 300,000/year |
| Development | EUR 10,000/month | EUR 120,000/year |

*All prices exclude applicable taxes and VAT.*

### 3.3 IDR Equivalent Reference Pricing

For BUMN budget planning purposes, the EUR/IDR equivalent at reference exchange rate (EUR 1 = IDR 17,000, indicative):

| Environment | Annual Fee (IDR equivalent, indicative) |
|-------------|----------------------------------------|
| Production | IDR 5,100,000,000 (IDR 5.1 billion) |
| Development | IDR 2,040,000,000 (IDR 2.04 billion) |
| **Combined** | **IDR 7,140,000,000 (IDR 7.14 billion)** |

*IDR equivalent provided for planning only. Actual invoicing in EUR. Exchange rate fixed at contract execution for 12-month periods.*

### 3.4 Expansion Licensing

| Scenario | Incremental Annual License (EUR) |
|----------|----------------------------------|
| Add Bank Syariah Indonesia (BSI) environment | 300,000 (production) + 120,000 (development) |
| Add staging environment | 120,000 |
| Add BTPN (Bank Mandiri subsidiary) | 300,000 (production) |

---

## 4. Implementation Services Pricing

### 4.1 Implementation Investment

The 23-week implementation timeline (extended from 19 weeks for private network setup and BUMN governance) generates a higher implementation investment than a standard bank deployment:

| Scenario | Indicative Range (EUR) |
|----------|----------------------|
| Core: IDR deposits + SBN + BI-FAST + OJK reporting | 450,000 - 650,000 |
| Full: Core + Sukuk + BSI Islamic finance + KSEI integration | 650,000 - 950,000 |

*Formal scoping in Phase 1. SOW signed before Phase 2.*

### 4.2 Phase Breakdown

| Phase | Duration | Model |
|-------|----------|-------|
| Phase 1: Discovery | 3 weeks | Fixed milestone |
| Phase 2: Network and Platform Setup | 4 weeks | Fixed milestone |
| Phase 3: Asset Configuration | 4 weeks | Fixed milestone |
| Phase 4: Integration Development | 4 weeks | T&M with ceiling |
| Phase 5: Testing and UAT | 3 weeks | Fixed milestone |
| Phase 6: Go-Live | 1 week | Fixed milestone |
| Phase 7: Hypercare | 4 weeks | Fixed milestone |

### 4.3 BUMN Documentation

Implementation includes BUMN governance documentation: detailed technical documentation, OJK vendor assessment package, BI information security assessment materials, and BUMN-standard due diligence package. This documentation preparation is included within the implementation scope, not charged separately.

### 4.4 Optional Scope

| Package | Description | Cost (EUR) |
|---------|-------------|-----------|
| BSI Islamic Finance Module | Full sukuk tokenization with Sharia Advisory Board integration | 80,000 - 150,000 |
| KSEI Deep Integration | Full mirror ledger synchronization with KSEI depository | 60,000 - 120,000 |
| BI Observer Node Setup | Technical setup for Bank Indonesia observer node on private network | 30,000 - 60,000 |
| Government Banking Pack | Ministry of Finance and government treasury integration | 50,000 - 100,000 |

---

## 5. Environment and Infrastructure Costs

### 5.1 AWS Jakarta (ap-southeast-3): Pass-Through

AWS Jakarta infrastructure costs are passed through at actual AWS pricing without markup:

| Component | Indicative Annual Cost (USD) |
|-----------|------------------------------|
| EKS cluster (compute) | 20,000 - 35,000 |
| Aurora PostgreSQL Multi-AZ | 12,000 - 20,000 |
| AWS KMS (Jakarta) | 2,000 - 5,000 |
| S3, networking | 5,000 - 10,000 |
| **AWS Jakarta total** | **39,000 - 70,000/year** |

*Bank Mandiri's existing AWS agreements may reduce these costs.*

### 5.2 On-Premises Infrastructure (Private Network)

Bank Mandiri provides the server infrastructure for Hyperledger Besu validators within its Indonesian data centers. SettleMint provides:
- Kubernetes deployment configurations for Besu validators
- Network configuration specifications
- Operational runbooks for validator management

Bank Mandiri's infrastructure operations team manages the validator hardware. These costs are Bank Mandiri's internal infrastructure costs and are not part of SettleMint's commercial scope.

### 5.3 Third-Party Pass-Through

| Service | Arrangement |
|---------|-------------|
| HSM hardware | Bank Mandiri provides on-premises HSM; SettleMint supports integration |
| KSEI interface | KSEI membership fees managed by Bank Mandiri |
| BI-FAST access | Through Bank Mandiri's existing BI-FAST membership |

---

## 6. Support and Maintenance Fees

### 6.1 Enterprise Support (Required)

Enterprise Support is required for Indonesia's systemically important financial institution, consistent with BI's operational resilience expectations:

| Metric | Enterprise Commitment |
|--------|----------------------|
| Coverage | 24/7/365 |
| Uptime | 99.99% monthly |
| P1 Response | 15 minutes |
| P1 Resolution | 2 hours |
| Indonesia time zone | Business hours priority staffing (WIB) |

**Annual Enterprise Support Fee:** [CLIENT-SPECIFIC, indicative range EUR 100,000-160,000/year based on programme scope and operational complexity]

*Support fees are in EUR, paid annually in advance.*

---

## 7. Total Cost of Ownership Analysis

### 7.1 Three-Year TCO

| Category | Year 1 (EUR) | Year 2 (EUR) | Year 3 (EUR) | 3-Year (EUR) |
|----------|-------------|-------------|-------------|-------------|
| Platform License | 420,000 | 420,000 | 420,000 | 1,260,000 |
| Implementation | 450,000-650,000 | - |, | 450,000-650,000 |
| Enterprise Support | 100,000-160,000 | 100,000-160,000 | 100,000-160,000 | 300,000-480,000 |
| AWS Jakarta Infrastructure | ~55,000 | ~60,000 | ~65,000 | ~180,000 |
| **Total Range** | | | | **2,190,000-2,570,000** |

### 7.2 SBI Reference: State-Owned Bank Scale

For BUMN budget committee context: the State Bank of India CBDC infrastructure engagement with SettleMint is the closest comparable programme. SBI's engagement scope and scale provide a reference for the investment level appropriate for a systemically important state-owned bank implementing digital currency infrastructure.

### 7.3 Indonesia-Specific ROI Indicators

**SBN settlement efficiency:** Indonesia's government securities market (SBN) settles through KSEI with T+2 cycles. Tokenized SBN with T+0 atomic settlement reduces the settlement exposure for Bank Mandiri as primary dealer. At IDR 100 trillion of annual SBN trading activity, each day of settlement acceleration reduces counterparty exposure by IDR 274 billion.

**Cross-border cost reduction:** Bank Mandiri's cross-border operations (SWIFT correspondent banking, FX settlement) cost significantly per transaction. For wholesale cross-border transactions using tokenized deposits with atomic XvP settlement, correspondent banking fees (typically 0.1-0.5% of transaction value) are eliminated for on-chain settlement. At Bank Mandiri's cross-border transaction volumes, this represents material annual savings.

**Islamic finance automation:** BSI's sukuk operations involve significant manual profit calculation and distribution overhead. DALP's automated yield distribution for sukuk products reduces operational staffing requirements for profit payment processing across BSI's product range.

---

## 8. Payment Terms and Milestones

### 8.1 BUMN Payment Compliance

SettleMint's payment terms are designed to be compatible with BUMN procurement payment cycles. Platform license payments may be structured to align with Bank Mandiri's fiscal year budget cycle (January-December) with appropriate annual advance payment provisions.

### 8.2 Platform License

Annual, upfront. Invoiced in EUR (IDR equivalent provided for BUMN planning purposes). Payment within 30 days of invoice.

### 8.3 Implementation Milestones

| Milestone | Trigger | Percentage |
|-----------|---------|-----------|
| Contract execution | Signed contract and BUMN documentation complete | 15% |
| Phase 1 Complete | BRD, regulatory mapping, BUMN documentation accepted | 15% |
| Phase 2 Complete | Private network operational, environments provisioned | 15% |
| Phase 3 Complete | Asset configurations deployed and validated | 15% |
| Phase 4 Complete | Integration testing evidence accepted | 20% |
| Phase 5 Complete | UAT sign-off | 10% |
| Phase 6+7 Complete | Go-live and hypercare completion | 10% |

---

## 9. Commercial Assumptions Register

| Assumption | Detail |
|-----------|--------|
| Currency | EUR invoicing; IDR equivalent provided for BUMN planning at contract-execution rate |
| PPN (VAT) | Indonesian PPN (11%) applied to services delivered in Indonesia per applicable tax law |
| Minimum term | 3 years |
| Payment | Annual, upfront |
| Price hold | 90 days from submission (until 19 June 2026) |
| Annual increase cap | Lower of 5% or EU HICP |
| BUMN procurement | Implementation assumes BUMN procurement process completes within Phase 1 timeline; SettleMint provides full BUMN due diligence package |
| Bank Mandiri infrastructure | Hyperledger Besu validator hardware provided by Bank Mandiri within its data centers |
| BI-FAST access | Through Bank Mandiri's existing BI-FAST membership; no new membership fees |
| Sharia Advisory Board | BSI's Sharia Advisory Board review of sukuk token structures is Bank Mandiri's responsibility; SettleMint provides technical design documentation |
| OJK regulatory approval | Any new OJK regulatory approvals required for tokenized securities are Bank Mandiri's responsibility; SettleMint provides technical platform compliance documentation |
| KSEI interface | KSEI cooperation for mirror ledger integration is outside SettleMint's control; phased scope accommodates KSEI readiness |

---

## 10. Exit and Transition Terms

### 10.1 BUMN Exit Documentation

On contract termination or non-renewal, SettleMint provides:
- Complete platform configuration documentation in Indonesian language (Bahasa Indonesia) where required
- All technical documentation sufficient for Bank Mandiri's IT team to manage and operate the platform
- 90-day technical transition support
- Formal knowledge transfer certification

### 10.2 Data Sovereignty on Exit

On-chain data (SBN transaction history, sukuk distribution records, investor registry) remains on the private Besu network validators within Bank Mandiri's data centers. Contract termination with SettleMint does not affect the on-chain data or Bank Mandiri's control over the blockchain network it operates.

DALP platform data (off-chain indexed data) is exportable through the API in standard JSON formats. No proprietary format lock-in applies.

### 10.3 OJK Transition Requirements

Bank Mandiri's OJK obligations continue regardless of the technology vendor relationship. The transition plan includes: regulatory notification requirements, operational continuity provisions consistent with OJK's outsourcing standards, and documentation supporting Bank Mandiri's OJK reporting obligations during and after transition.

---

## 11. Value Justification

### 11.1 Indonesia's Digital Asset Market Opportunity

Indonesia's digital asset market is at an inflection point. OJK's progressive regulatory approach, Bank Indonesia's CBDC exploration, and BI-FAST's real-time payment infrastructure create the conditions for significant digital asset growth. Bank Mandiri, as Indonesia's largest state-owned bank, is naturally positioned to be the anchor institution for Indonesia's wholesale digital asset ecosystem.

The commercial investment in DALP is therefore not just a technology cost, it is a strategic market positioning investment. The institution that builds institutional-grade digital asset infrastructure first, and builds it correctly, captures a structural advantage in Indonesia's emerging wholesale digital market.

### 11.2 No Transaction Fees at National Scale

Indonesia's payment system processes billions of transactions annually. If Bank Mandiri's digital asset infrastructure scales to process even a fraction of this volume, a transaction-fee-based platform would generate prohibitive costs. DALP's environment-based licensing means that scaling from thousands to millions of digital asset transactions annually costs Bank Mandiri nothing in additional platform fees.

This pricing structure is essential for Bank Mandiri's ability to offer competitive digital asset services to institutional clients without the platform cost becoming a barrier to adoption.

### 11.3 SBI Precedent: Investment Level for State-Owned Bank Digital Infrastructure

The State Bank of India's engagement with SettleMint for CBDC infrastructure provides a relevant commercial precedent. SBI's programme, also a systemically important state-owned bank implementing digital currency infrastructure under central bank oversight, demonstrates that the investment level proposed in this commercial proposal is appropriate for the scale and institutional complexity of Bank Mandiri's programme.

---

*End of Commercial Proposal: Bank Mandiri. Digital Asset Infrastructure Platform*
*Document version: 1.0 Draft | Prepared: 20 March 2026 | SettleMint Confidential*
*All prices exclude applicable taxes and VAT including Indonesian PPN.*
