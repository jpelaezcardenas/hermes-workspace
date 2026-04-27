# Request for Information: Post-Trade Modernization Program

**Issuing Authority:** Meridian Stock Exchange (MSX)
**RFI Reference:** MSX-OPS-2026-014
**Issued:** March 18, 2026
**Response Deadline:** April 11, 2026

---

## Background

Meridian Stock Exchange (MSX) is the national securities exchange for the Republic of Meridia, operating under the regulatory oversight of the Meridia Securities Authority (MSA). MSX lists 412 equities, 85 corporate bonds, and 23 exchange-traded funds, with average daily trading volume of approximately EUR 1.4 billion. Settlement is currently processed through a legacy central securities depository (CSD) using a T+2 settlement cycle, with net clearing handled by an associated clearing house.

MSX's current post-trade infrastructure dates from 2009. The system processes settlement through a batch-based model, running overnight cycles that produce settlement instructions for the following business day. Counterparty risk accumulates during the T+2 window, requiring market participants to maintain capital buffers that constrain liquidity. Corporate action processing is largely manual, involving spreadsheet-based entitlement calculations and manual notification to participants.

MSX intends to issue a Request for Proposal in Q3 2026 for a complete replacement of its CSD and clearing infrastructure. This RFI is the discovery phase, intended to assess vendor capabilities and market readiness before formal procurement.

---

## Program Objectives

MSX seeks a modern post-trade platform capable of the following:

1. **T+0 (atomic) settlement** that eliminates counterparty risk and frees participant capital from the T+2 window
2. **Integration with existing order matching engines** (MSX operates the Meridia Trading System, a FIX 4.4-compliant order management system) to receive confirmed trade messages and initiate settlement without manual intervention
3. **Automated corporate action processing** covering dividends, rights issues, stock splits, reverse splits, and bonus share distributions
4. **Participant onboarding** for brokers, custodians, and institutional counterparties, with granular access control and role-based permission management
5. **Regulatory reporting** to the Meridia Securities Authority, including trade reporting, settlement reporting, and position reporting in ISO 20022 format
6. **Migration pathway** for 412 existing listed equities and their associated dematerialized holdings records, with zero disruption to market operations during migration
7. **Operational resilience** meeting a minimum uptime target of 99.99% with documented disaster recovery procedures and a Recovery Time Objective (RTO) of 30 minutes or less

---

## Technical Questions

Respondents are invited to address the following questions. Detailed, evidence-based responses are preferred over general statements of capability.

**Q1 — Settlement Architecture**
Describe how your platform achieves atomic (T+0) settlement. Explain the technical mechanism by which simultaneous transfer of securities and cash is guaranteed, and what happens in the event one leg of the settlement fails.

**Q2 — Order Management Integration**
How does your platform receive trade confirmations from an external order matching engine? Describe the integration model, messaging protocol support, and how trade lifecycle events (confirmed, cancelled, amended) are reflected on-platform.

**Q3 — Corporate Actions**
Describe your platform's capability to process: (a) cash dividend distributions to all current holders at the record date, (b) stock splits with automatic proportional adjustment of all holding positions, (c) rights issue subscription management with entitlement calculation, and (d) bonus share distributions. For each, indicate whether the processing is automated or requires manual operator steps.

**Q4 — Participant Onboarding and Access Control**
Describe the participant onboarding process for brokers and custodians. What access control mechanisms exist to enforce separation of duties? How are permissions managed as participant relationships change over time?

**Q5 — Regulatory Reporting**
Describe your platform's regulatory reporting capabilities. Which ISO 20022 message types does the platform generate natively? How does your platform ensure reporting completeness and accuracy for regulatory examinations?

**Q6 — Migration Strategy**
How would you approach migration of 412 existing instruments and their associated dematerialized holdings onto your platform? What is the risk model for migration, and how do you ensure continuity of market operations during the migration period?

**Q7 — High Availability and Disaster Recovery**
Describe the availability architecture of your platform. How does the system achieve 99.99% uptime? Describe your disaster recovery model, including RTO, RPO, and failover mechanism.

**Q8 — Security and Audit Trail**
Describe the audit trail and security model of your platform. How are settlement events, access events, and corporate action processing recorded? Who can access audit records, and under what conditions?

---

## Response Instructions

Responses should be submitted in PDF or Word format, with a maximum length of 30 pages excluding appendices. Respondents may include solution diagrams, architecture overviews, and relevant reference implementations.

Responses will be evaluated against the following criteria, weighted equally:

- Technical capability alignment with MSX requirements
- Evidence of prior deployment in comparable institutional contexts
- Clarity of migration approach
- Platform maturity and operational track record
- Regulatory reporting coverage

Questions regarding this RFI may be directed to: ops-modernization@msx-meridia.eu

---

*This RFI is issued for information and planning purposes only. It does not constitute a commitment to procure, and MSX reserves the right to modify or withdraw this process at any time.*
