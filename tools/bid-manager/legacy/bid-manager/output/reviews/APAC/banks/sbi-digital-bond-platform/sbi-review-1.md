# Proposal Review: Pass 1

**Institution:** State Bank of India
**Reference:** STATE-BANK-OF-INDIA-RFP-202603
**Review Date:** 20 March 2026
**Reviewer:** Automated Quality Review System
**Documents Reviewed:**
- sbi-technical_full_draft.md
- sbi-commercial_full_draft.md

---

## Scores Table

| Category | Max | Score | Notes |
|---|---|---|---|
| Cover page completeness | 5 | 5 | All fields resolved |
| Executive summary depth | 10 | 10 | SBI existing relationship highlighted; India market context excellent |
| About SettleMint. India relevance | 8 | 8 | SBI CBDC + RBI Innovation Hub both named; Commerzbank bond parallel cited |
| DALP platform overview | 10 | 9 | Strong; G-Sec architecture section is a differentiator |
| Solution architecture, diagrams | 10 | 9 | Main stack + e-Rupee diagrams excellent; government securities dual-mode architecture well explained |
| Asset lifecycle, detail | 10 | 9 | G-Sec, corporate bond, stablecoin/e-Rupee lifecycles covered; repo lifecycle state diagram strong |
| Compliance architecture. India specifics | 12 | 11 | RBI, SEBI, CERT-In all addressed; DPDP Act section present; investor category table good |
| Integration architecture | 10 | 9 | Finacle, RTGS, NDS-OM, CCIL all addressed; sequence diagram in settlement section strong |
| Custody and key management | 8 | 8 | HSM tier clear; SBI-specific maker-checker table excellent |
| Settlement and operations | 8 | 8 | High-volume coupon distribution section is exactly right for SBI |
| Security architecture | 8 | 7 | CERT-In alignment diagram present; 6-hour incident notification covered; could add IS audit considerations |
| Deployment options | 6 | 6 | India-domiciled deployment; on-premises; hybrid, all covered |
| Implementation approach. Gantt | 8 | 8 | Gantt diagram present; SBI governance overhead acknowledged |
| Support and SLA | 6 | 6 | Enterprise Support recommended; IST hours noted |
| Reference projects | 6 | 6 | All 14 present; SBI itself as direct reference is correctly highlighted |
| Regulatory alignment | 8 | 8 | RBI e-Rupee roadmap integration present; SEBI digital securities framework discussed |
| Response matrix | 8 | 8 | TR-01 to TR-20; NDS-OM/CCIL noted as partial (correctly) |
| Appendix A Risk Register | 4 | 4 | 10 risks; India-specific including NDS-OM authorisation risk |
| Appendix B Compliance Catalog | 4 | 4 | All 18 modules with SBI application |
| Commercial, pricing accuracy | 8 | 8 | EUR 300K/120K correct; INR conversion note; GST and withholding tax coverage excellent |
| Commercial. TCO | 6 | 6 | INR crore build vs buy analysis is strong public sector framing |
| Commercial, exit terms | 5 | 5 | Complete |
| Banned language check | 5 | 5 | Clean |
| Third-person voice | 3 | 3 | Consistent |
| **TOTAL** | **180** | **175** | |

**Pass 1 Score: 175 / 180**

---

## Strengths

1. **Existing SBI relationship is the centrepiece.** Positioning the existing SBI CBDC engagement as the primary reference, not a comparable reference but SBI itself, is the right commercial and evaluative move. This should be emphasised further.

2. **India-specific commercial detail is excellent.** The coverage of GST (reverse charge), India-Belgium DTAA withholding tax provisions, and INR/EUR FX risk is more detailed than typical proposals and directly addresses SBI's procurement audit requirements.

3. **NDS-OM and CCIL integration is named and correctly categorised.** Marking TR-13 as 🟡 Partial with the note that NDS-OM/CCIL API access requires RBI/CCIL authorisation is honest and evaluator-appropriate. It shows institutional knowledge without overclaiming.

4. **G-Sec dual-mode architecture is a genuine differentiator.** The Mode 1 (digital twin) / Mode 2 (native digital issuance) design distinction clearly addresses the regulatory reality, that RBI hasn't yet mandated native digital G-Sec issuance, while preserving the future-state vision.

5. **INR crore build vs buy analysis is strong public sector framing.** Expressing costs in INR crore makes the cost comparison immediately legible to SBI's board-level decision makers.

---

## Issues Found

1. **IS Audit / CAG coverage is thin.** SBI operates under scrutiny from India's Comptroller and Auditor General. The security and compliance sections mention internal audit but don't address CAG-specific evidentiary requirements. SBI's evaluators from the audit function will notice this.

2. **CSGL sub-account architecture needs more detail.** The proposal mentions CSGL sub-accounts in passing. SBI's primary business case is managing client G-Sec sub-accounts at scale. A dedicated subsection explaining how DALP maps SBI's CSGL sub-account hierarchy should be added.

3. **Primary Dealer operations depth is thin.** The proposal mentions SBI is a Primary Dealer but doesn't describe how DALP supports PD-specific operations: auction participation workflow, WI (When Issued) securities handling, repo in the LAF (Liquidity Adjustment Facility), and OMO (Open Market Operation) tracking. These are material to SBI's evaluators from the Treasury function.

4. **e-Rupee sequence diagram would strengthen the settlement section.** The e-Rupee integration architecture diagram shows the conceptual flow but a sequence diagram showing exactly how DvP settlement transitions from RTGS to e-Rupee (without re-platforming) would demonstrate the architectural claim more concretely.

---

## Improvements for Pass 2

1. **Add CAG / IS Audit section.** Add a subsection in Section 7 or 11 addressing India's CAG audit requirements: how DALP's immutable audit trail, structured event records, and configuration history support CAG's IT audit methodology and provide the evidence base for CAG review of SBI's digital banking systems.

2. **Add CSGL sub-account architecture subsection.** Add a dedicated subsection in Section 6 describing how DALP represents SBI's CSGL sub-account hierarchy: each client's CSGL sub-account mapped to an on-chain wallet, SBI's custodial authority enforced through RBAC, position reporting at sub-account level, and reconciliation with RBI's SGL record.

3. **Expand Primary Dealer operations.** Add a subsection in Section 6 or 10 covering PD-specific workflows: how DALP handles auction allotments (including WI securities in the pre-auction period), how repo transactions (including LAF repo with RBI) are represented, and how OMO participation is tracked.

4. **Add e-Rupee DvP transition sequence diagram.** Insert a mermaid sequence diagram in Section 5 showing the architectural path from RTGS-based DvP (current) to e-Rupee-based atomic DvP (future), specifically showing which components change (cash leg connector only) and which remain identical (bond token, compliance engine, custody, operational workflows).
