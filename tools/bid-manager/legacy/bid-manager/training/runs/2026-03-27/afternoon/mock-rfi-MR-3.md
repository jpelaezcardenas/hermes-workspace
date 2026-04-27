# Request for Information: Central Securities Depository Digital Twin Platform

**Issuing Authority:** Nordenthal Securities Registry Authority (NSRA)
**Document Reference:** NSRA-RFI-2026-047
**Issue Date:** 27 March 2026
**Response Deadline:** 30 April 2026
**Contact:** procurement@nsra.gov.nt

---

## Background and Context

The Nordenthal Securities Registry Authority (NSRA) operates the national central securities depository (CSD) for the Republic of Nordenthal, maintaining the authoritative book-entry register for all domestically issued securities. The registry currently holds approximately 4,200 active instruments spanning government bonds (EUR 180 billion outstanding), corporate bonds (EUR 64 billion), listed equities (EUR 310 billion market capitalisation across 890 issuers), and money market instruments (EUR 28 billion).

NSRA processes an average of 280,000 settlement instructions per business day, with peak volumes reaching 650,000 during index rebalancing periods. Settlement is conducted on a T+2 basis for equities and T+1 for bonds, with a settlement efficiency rate of 97.4%. NSRA is an authorised CSD under the EU Central Securities Depositories Regulation (CSDR) and operates under direct oversight of the Nordenthal Financial Supervisory Authority (NFSA) and the European Securities and Markets Authority (ESMA).

NSRA has published a five-year Digital Infrastructure Modernisation Programme (DIMP 2025-2030). A core pillar of DIMP is the creation of a distributed ledger-based digital twin of the existing instrument registry, with the following strategic objectives:

1. Provide a real-time, verifiable, tamper-evident parallel record of all securities holdings and movements
2. Enable phased migration toward distributed ledger as the authoritative legal register
3. Offer participants modernised connectivity options alongside existing SWIFT/ISO 20022 rails
4. Support future issuance of natively digital instruments (green bonds, retail government bonds) directly on the distributed ledger
5. Explore T+0 settlement capability for eligible instrument classes

NSRA emphasises that this procurement is exploratory. The book-entry system operated under existing CSD licence conditions remains the **legal record of title** throughout Phase 1 and Phase 2 of DIMP. Any digital twin record is supplementary unless explicitly designated authoritative through a regulatory amendment process that NSRA and NFSA will manage separately from this technology procurement.

---

## Scope of this RFI

This RFI seeks information from technology providers capable of delivering the digital twin infrastructure. NSRA is not issuing an RFP at this stage. Responses will inform the design of a detailed technical specification and subsequent tender.

---

## Section 1: Instrument Coverage

**1.1** Describe your platform's ability to represent the following instrument types as on-chain tokens:
- Government bonds (fixed coupon, floating coupon, inflation-linked, zero coupon)
- Corporate bonds (including callable, puttable, and convertible structures)
- Listed equities (ordinary shares, preference shares, redeemable preference shares)
- Money market instruments (commercial paper, treasury bills, certificates of deposit)

**1.2** How does your platform handle the full instrument lifecycle for each type, including issuance, coupon/dividend events, corporate actions (stock splits, rights issues, tender offers), and maturity or redemption?

**1.3** What is your approach to representing instruments that have no natural "token" lifecycle, such as book-entry treasury bills that are created and extinguished daily in overnight auctions?

---

## Section 2: Hybrid Record Architecture

**2.1** Describe your architecture for operating as a supplementary on-chain record while a legacy book-entry system remains the legal record. How does your platform maintain synchronisation between on-chain state and the authoritative off-chain record?

**2.2** What reconciliation mechanisms does your platform provide to detect and alert on divergence between on-chain token state and the off-chain book-entry record?

**2.3** Describe your approach to the eventual migration from supplementary record to authoritative record. What changes within your platform are required when the on-chain record is designated the legal register?

**2.4** How does your platform handle exception scenarios where on-chain and off-chain records cannot be reconciled in real time (for example, during market stress, connectivity failures, or delayed settlement instructions)?

---

## Section 3: Participant Connectivity

**3.1** What connectivity standards does your platform support for CSD participants (brokers, custodians, commercial banks, clearing houses)? Specifically:
- ISO 20022 message support (settlement instructions, corporate action notifications, account statements)
- SWIFT connectivity (MX messages, SWIFT gpi for bond settlement)
- FIX protocol (for equities trading system integration)
- REST/API-based connectivity for direct system integration

**3.2** Describe your participant onboarding model: how do institutional participants authenticate, receive access rights, and interact with the platform?

**3.3** How does your platform support the concurrent operation of legacy SWIFT connectivity and modern API-based connectivity during the transition period?

---

## Section 4: Governance and Legal Architecture

**4.1** Describe the governance model for the shared ledger infrastructure. Who controls upgrade authority, access control changes, and parameter modifications?

**4.2** How does your platform support NSRA's role as the sole authoritative operator of the CSD, while allowing read access and settlement submission from licensed participants?

**4.3** What mechanisms exist to support the regulatory dual-record framework during Phase 1 and Phase 2, where on-chain records must not be treated as legally authoritative by participants?

**4.4** Describe your approach to on-chain corporate actions governance, including bondholder consent solicitation, voting, and quorum requirements for consent solicitation events.

---

## Section 5: Settlement Architecture

**5.1** Describe your Delivery-versus-Payment (DvP) settlement capability. Does your platform support atomic settlement, and how is the cash leg coordinated?

**5.2** What is your approach to achieving T+0 settlement for eligible instruments, and what constraints or prerequisites apply?

**5.3** How does your platform handle failed settlement instructions, partial fills, and settlement retry logic?

**5.4** Describe your integration approach with NSRA's existing TARGET2 connection for EUR cash settlement.

---

## Section 6: Compliance, Regulatory Access, and Audit

**6.1** How does your platform support NSRA's obligations to provide real-time supervisory access to the NFSA and ESMA, including read-only access to the full instrument registry, holdings, and transaction history?

**6.2** Describe the audit trail capabilities of your platform. What events are recorded, at what granularity, and for how long?

**6.3** How does your platform support the generation of CSDR-mandated reports (settlement efficiency, fails reports, buy-in triggers)?

---

## Section 7: Technical Infrastructure

**7.1** Which distributed ledger networks does your platform support? What is NSRA's degree of network sovereignty (ability to operate as a permissioned network, host nodes at national data centres)?

**7.2** What are the throughput and latency characteristics of your platform? Please provide demonstrated TPS figures and settlement finality times under load.

**7.3** Describe your disaster recovery architecture, including RPO/RTO targets.

---

## Section 8: Vendor Credentials

**8.1** Describe your experience with CSD, post-trade infrastructure, or comparable regulated financial market infrastructure deployments.

**8.2** Provide references from comparable institutional deployments.

---

*Responses should address each numbered question. NSRA reserves the right to follow up with clarifying questions. All information provided will be treated as confidential and used solely for the purpose of informing the DIMP procurement specification.*
