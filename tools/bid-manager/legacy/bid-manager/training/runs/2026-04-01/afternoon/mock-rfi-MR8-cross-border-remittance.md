# Request for Information

## Cross-Border Remittance Settlement Infrastructure

**Issued by:** RemitLink Consortium (on behalf of member institutions)

**RFI Reference:** RLC-2026-RFI-003

**Date of Issue:** 1 April 2026

**Response Deadline:** 30 April 2026

---

## Background

RemitLink Consortium ("the Consortium") is a group of seven licensed money transfer operators (MTOs) operating across the Gulf Cooperation Council (GCC) to South Asia corridor. Current member institutions hold regulatory licenses in the United Arab Emirates (UAE Central Bank), Kingdom of Saudi Arabia (SAMA), State of Qatar (QCB), Republic of India (RBI), Islamic Republic of Pakistan (SBP), and the People's Republic of Bangladesh (Bangladesh Bank).

The Consortium collectively processes approximately 4.2 million remittance transactions per month across this corridor, with a combined monthly settlement value exceeding USD 2.8 billion. Current settlement relies on bilateral nostro/vostro account arrangements with correspondent banks, resulting in high pre-funding requirements, delayed settlement finality (T+1 to T+3), limited operational transparency, and significant reconciliation overhead.

The Consortium seeks to evaluate technology platforms capable of providing a shared settlement layer that reduces pre-funding requirements, achieves near-real-time settlement finality, and satisfies AML/CFT compliance obligations across all six regulatory jurisdictions.

---

## Scope of This RFI

This RFI is an information-gathering exercise. It does not constitute a commitment to procure. Responses will inform the Consortium's evaluation of potential technology partners and will be used to develop a subsequent Request for Proposal (RFP) if the Consortium determines that suitable solutions exist.

---

## Requirements

### Section A: Settlement Infrastructure

**A.1** Describe how your platform supports multi-currency settlement across a minimum of five fiat-pegged digital currencies (USD, AED, SAR, INR, PKR, BDT). Explain the minting, burning, and peg-maintenance mechanisms for each currency representation.

**A.2** Explain how your platform achieves settlement finality. Specify whether settlement is atomic (all-or-nothing) and describe the mechanism that guarantees finality. What is the expected time from transaction submission to confirmed settlement?

**A.3** Describe your platform's approach to liquidity pool management. How do participants pre-fund their positions? How is real-time visibility into pool balances provided? How does the platform handle insufficient liquidity scenarios?

**A.4** Explain your platform's throughput capacity. The Consortium requires sustained processing of at least 2,500 transactions per second during peak periods (month-end salary disbursement windows). Provide evidence of throughput testing and the factors that influence maximum capacity.

**A.5** Describe the settlement reconciliation mechanism. How does your platform reconcile on-platform settlement records with participants' existing banking rails (nostro/vostro accounts, national payment switches)?

### Section B: Foreign Exchange

**B.1** Describe how your platform integrates real-time foreign exchange rate feeds. Specify the number and type of FX data sources supported, update frequency, and staleness detection mechanisms.

**B.2** Explain how FX rate locking works for individual remittance transactions. At what point in the transaction lifecycle is the rate locked, and how is the locked rate enforced through settlement?

**B.3** Describe any circuit breaker or risk management mechanisms that activate during periods of extreme FX volatility.

### Section C: Compliance and Regulatory

**C.1** Describe how your platform enforces AML/CFT compliance across six distinct regulatory jurisdictions simultaneously. Explain how jurisdiction-specific rules are configured and how conflicts between jurisdictions are resolved.

**C.2** Explain your platform's approach to sanctions screening. Does the platform perform real-time screening against OFAC, EU, UN, and local sanctions lists? If not, describe the integration architecture for connecting external sanctions screening providers.

**C.3** Describe the transaction monitoring capabilities. How does the platform detect suspicious transaction patterns (structuring, velocity, geographic anomalies)? How are suspicious transaction reports (STRs) generated and routed to the appropriate financial intelligence unit (FIU) in each jurisdiction?

**C.4** Explain how your platform supports regulatory reporting obligations in each of the six jurisdictions. Provide specific examples of report types generated.

**C.5** Describe the audit trail capabilities. How does the platform ensure that every transaction is traceable from origination through settlement, with evidence sufficient for regulatory examination?

### Section D: Participant Management

**D.1** Describe the participant onboarding process. How are new MTOs added to the consortium network? What identity verification and due diligence requirements are enforced?

**D.2** Explain the credit risk management framework. How does the platform manage counterparty exposure between participants? Are there configurable exposure limits, margin calls, or collateral requirements?

**D.3** Describe the governance model for the shared settlement infrastructure. How are rule changes, fee adjustments, and participant disputes resolved? Is there an on-platform governance mechanism?

### Section E: Integration

**E.1** Describe how your platform integrates with national payment switches at both origination and destination ends of the corridor (e.g., UAE IPP, India UPI/NEFT/RTGS, Pakistan RAAST, Bangladesh BEFTN).

**E.2** Explain the API architecture. Provide details on supported protocols, authentication mechanisms, rate limiting, and documentation.

**E.3** Describe how your platform handles ISO 20022 messaging for interoperability with existing banking infrastructure.

### Section F: Architecture and Operations

**F.1** Describe the deployment architecture. Where is the platform hosted? What are the data residency options? Can the platform be deployed on infrastructure within Consortium member jurisdictions?

**F.2** Specify availability targets and disaster recovery capabilities, including Recovery Point Objective (RPO) and Recovery Time Objective (RTO).

**F.3** Describe the monitoring and alerting capabilities available to consortium operators.

**F.4** Explain your platform's approach to network governance, including consensus mechanism, node operation, and validator selection for a permissioned deployment.

### Section G: Commercial

**G.1** Describe your commercial model at a high level: licensing, per-transaction fees, implementation costs, and ongoing support.

**G.2** Provide an indicative implementation timeline from contract signature to production readiness.

**G.3** Describe your support model, including severity levels, response times, and escalation paths.

---

## Response Format

Respondents should structure their response to address each section (A through G) in order, with clear cross-references to supporting documentation where applicable. Total response length should not exceed 40 pages excluding appendices.

---

## Contact

All queries related to this RFI should be directed to:

**Procurement Office, RemitLink Consortium**
remitlink-procurement@example.com
