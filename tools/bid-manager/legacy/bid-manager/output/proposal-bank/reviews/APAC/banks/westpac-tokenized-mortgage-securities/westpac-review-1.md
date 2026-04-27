# Proposal Review: Westpac Tokenized Mortgage Securities: Review 1

**RFP Reference:** WESTPAC-RFP-202603
**Institution:** Westpac Banking Corporation, Australia
**Subject:** Tokenized Mortgage Securities Platform
**Review Pass:** 1
**Review Date:** 20 March 2026
**Reviewer:** SettleMint Proposal Bank Builder v12
**Documents Reviewed:**
- `westpac-technical_full_reviewed_1.md` (20,024 words)

---

## Review 1 Summary

The reviewed_1 document is a strong first complete pass at 20,024 words. It covers all required sections from the RFP specification and addresses the Australian-specific regulatory context (APRA CPS 230, CPS 234, AUSTRAC, Corporations Act s708, Privacy Act, RITS/RTGS) distinctly from the UOB trade finance proposal. The following gaps are identified for reviewed_2 to address.

---

## Gaps Identified for Reviewed_2

| Gap ID | Section | Gap Description | Priority |
|---|---|---|---|
| G-001 | Section 7.2 | CPS 230 operational risk alignment diagram needs more detail on specific DALP control evidence per CPS 230 paragraph reference | High |
| G-002 | Section 11 | APRA CPS 234 alignment table is present but does not reference specific CPS 234 paragraph numbers; add paragraph-level mapping | High |
| G-003 | Section 13 | Phase 4 testing section is thin on UAT scenario coverage; add specific RMBS test scenarios (issuance, pool factor update, coupon distribution, prepayment, maturity redemption) | High |
| G-004 | Section 6.6 | BBSW floating rate coupon calculation scenario not fully described; add BBSW reset workflow | Medium |
| G-005 | All sections | Confidence tags (green/yellow/red) applied to response matrix but not systematically to all capability claims in body text | Medium |
| G-006 | Section 8 | SWIFT integration section is thin; expand with specific message types for offshore QIB settlement | Medium |
| G-007 | Section 9 | HSM key ceremony procedure is described but not diagrammed; add key hierarchy flowchart | Low |
| G-008 | Section 15 | Reference projects could benefit from an explicit statement on CBA reference call availability | Low |

---

## Scoring: Technical Proposal (reviewed_1)

| Category | Max Score | Score | Notes |
|---|---|---|---|
| Executive Summary and Context | 10 | 9 | Strong regulatory context; APAC market analysis; T+0 value proposition clearly articulated |
| About SettleMint / Credentials | 8 | 7 | CBA reference prominent; Commerzbank structural parallel well explained |
| Platform Overview Accuracy | 12 | 10 | RMBS metadata schema table is valuable; pool factor management well described |
| Solution Architecture | 12 | 10 | All 12 required diagrams present; Westpac-operated node architecture clear |
| Asset Lifecycle Coverage | 10 | 9 | Issuance, coupon, prepayment, maturity all covered; BBSW floating rate thin |
| Compliance Architecture | 15 | 13 | CPS 230, CPS 234, s708, AUSTRAC, Privacy Act all addressed; paragraph-level mapping missing |
| Integration Architecture | 12 | 10 | Hogan, RITS, NPP, SWIFT, AUSTRAC covered; SWIFT section thin |
| Custody and Key Management | 8 | 8 | Full Westpac key custody model; key hierarchy diagram; ceremony procedure |
| Settlement and Operations | 10 | 9 | XvP sequence diagram; T+0 risk analysis; capital impact quantified |
| Security Architecture | 12 | 10 | CPS 234 control mapping; network security diagram; penetration testing scope |
| Deployment Options | 6 | 6 | AWS ap-southeast-2 multi-AZ; Westpac node architecture; sizing |
| Implementation Approach | 12 | 10 | 20-week Gantt; full RAID (15 risks, 5 assumptions, 2 issues, 10 dependencies) |
| Support and SLA | 6 | 6 | AEDT coverage; RMBS-specific P1 definitions; calendar-driven monitoring |
| Reference Projects | 8 | 7 | 8 references with relevance; CBA reference call availability not stated |
| Regulatory Alignment | 10 | 9 | APRA, ASIC, AUSTRAC, Privacy Act all addressed |
| Response Matrix | 10 | 10 | All 20 requirements addressed with confidence ratings |
| Risk Register | 8 | 8 | 15 risks with inherent and residual ratings |
| Compliance Module Catalog | 10 | 10 | All 18 modules with Westpac application and activation status |
| BAU / Operational Run State | 8 | 8 | Monthly operations calendar; BAU team responsibilities |
| Data Architecture / Reporting | 8 | 8 | Data retention table; APRA evidence pack format; event taxonomy |
| Writing Quality / No Forbidden Words | 5 | 5 | Third person maintained; no forbidden words; confidence tags in matrix |
| **Total** | **180** | **172** | |

---

## Issues to Address in Reviewed_2

### G-001 and G-002: APRA CPS 230 and CPS 234 Paragraph-Level Mapping

Westpac's IT Risk team will conduct their APRA CPS 230 and CPS 234 assessment against specific paragraph numbers in the prudential standards. Reviewed_2 should add:

1. A CPS 230 paragraph-level alignment table (key paragraphs: 11-19 for material service providers; 20-30 for BCP; 31-40 for incident management)
2. A CPS 234 paragraph-level alignment table (key paragraphs: 15-23 for information security governance; 24-31 for information security capability; 32-38 for testing; 39-43 for incident notification)

### G-003: UAT Test Scenarios

Add a UAT test scenario matrix with at least 10 specific test cases covering:
- TC-01: New securitization issuance (3 tranches)
- TC-02: s708 investor onboarding (superannuation fund, HNW individual, offshore QIB)
- TC-03: Primary allocation XvP settlement via RITS
- TC-04: Monthly pool factor update (maker-checker workflow)
- TC-05: Coupon distribution (institutional investor, retail investor via NPP)
- TC-06: Prepayment event (partial principal distribution)
- TC-07: Secondary market transfer (s708 eligible buyer)
- TC-08: Secondary market transfer rejection (non-s708 buyer)
- TC-09: Maturity redemption (legal final maturity)
- TC-10: APRA CPS 234 evidence pack export

### G-004: BBSW Floating Rate Workflow

Add a subsection in Section 6 describing the BBSW rate reset workflow for floating rate RMBS tranches:
- BBSW rate observation (ASX or Bloomberg source)
- Coupon rate calculation (BBSW + margin)
- Maker-checker approval for rate reset
- On-chain coupon rate update
- Coupon calculation with updated rate

### G-006: SWIFT Message Types

Expand Section 8.4 with specific SWIFT message types for offshore QIB settlement:
- MT202 COV (cover payment for securities settlement)
- pacs.009 (ISO 20022 financial institution credit transfer)
- MT210 (notice to receive)
- Settlement confirmation handling

---

## Pass/Fail Assessment

Technical Proposal reviewed_1: 172/180 = 95.6% (Pass)

The document exceeds the 80% quality threshold at Review 1. Reviewed_2 should address the identified gaps to achieve a near-perfect score.

**Recommended Review 2 Target:** 176-180/180 (97-100%)
