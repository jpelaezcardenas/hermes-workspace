# Proposal Review: Pass 1

**Institution:** UOB (United Overseas Bank Limited)
**Reference:** UOB-RFP-202603
**Review Date:** 20 March 2026
**Reviewer:** Automated Quality Review System
**Documents Reviewed:**
- uob-technical_full_draft.md
- uob-commercial_full_draft.md

---

## Scores Table

| Category | Max | Score | Notes |
|---|---|---|---|
| Cover page completeness | 5 | 5 | Clean |
| Executive summary. Singapore context | 10 | 10 | Project Guardian, TradeTrust, PSA all integrated; single-original principle well framed |
| About SettleMint. Singapore credentials | 8 | 8 | OCBC, Maybank XvP, RBI LC trade finance all named relevantly |
| DALP platform overview, trade finance | 10 | 9 | Trade finance capability table excellent; could add SWIFT MT700 flow more explicitly |
| Solution architecture, diagrams | 10 | 8 | Main stack diagram comprehensive; TradeTrust integration shown; trade instrument token diagram good |
| Asset lifecycle, trade instruments | 10 | 9 | LC state diagram excellent; BoL single-original enforcement clear; invoice lifecycle solid |
| Compliance architecture. Singapore | 12 | 11 | MAS TRM alignment diagram excellent; PSA coverage present; TBML covered |
| Integration architecture | 10 | 9 | GTB, SWIFT, FAST/PayNow, AML all present; enterprise diagram comprehensive |
| Custody and key management | 8 | 8 | HSM + Fireblocks for governance keys; trade finance maker-checker table relevant |
| Settlement and operations | 8 | 8 | XvP sequence diagram for LC settlement strong; trade finance dashboards described |
| Security architecture | 8 | 7 | TRM-aligned diagram present; could add MAS Notice on Cyber Hygiene alignment |
| Deployment options | 6 | 6 | Singapore ap-southeast-1; deployment diagram present |
| Implementation approach. Gantt | 8 | 8 | Gantt includes TradeTrust integration assessment; GTB architecture review included |
| Support and SLA | 6 | 6 | Premium Support; trade finance P1 examples given |
| Reference projects | 6 | 6 | All 14; RBI LC trade finance and Maybank XvP highlighted correctly |
| Regulatory alignment | 8 | 8 | Project Guardian findings explicitly cited; TradeTrust / ETA / MLETR coverage |
| Response matrix | 8 | 8 | TR-01 to TR-20; GTB correctly marked 🟡 Partial |
| Appendix A Risk Register | 4 | 4 | 10 risks; TradeTrust corridor coverage risk and correspondent bank willingness are good additions |
| Appendix B Compliance Catalog | 4 | 4 | All 18 modules with UOB trade finance application |
| Commercial, pricing accuracy | 8 | 8 | EUR 300K/120K correct; SGD/EUR FX note; Singapore GST provision |
| Commercial. TCO analysis | 6 | 6 | Volume economics table is a strong differentiator (flat cost vs growing volume) |
| Commercial, exit terms | 5 | 5 | TradeTrust continuity point is a valuable addition |
| Banned language check | 5 | 5 | Clean |
| Third-person voice | 3 | 3 | Consistent |
| **TOTAL** | **180** | **174** | |

**Pass 1 Score: 174 / 180**

---

## Strengths

1. **Single-original principle enforcement is clearly explained.** The Whitelist single-holder enforcement mechanism for BoLs, and why it satisfies the legal requirement of the Electronic Transactions Act, is explained with sufficient technical depth to satisfy both UOB's legal team and their IT architects simultaneously.

2. **Volume economics table is a genuine commercial differentiator.** The table showing EUR 420,000/year regardless of whether trade volume is SGD 50M or SGD 5B is exactly the right framing for UOB's trade finance growth ambitions. No other competitor is likely to present this as clearly.

3. **RBI Innovation Hub reference is well-positioned.** The multi-bank LC trade finance blockchain reference is the most directly comparable production reference for UOB's LC use case. Positioning it as "most directly comparable" rather than just listing it in the table shows deliberate relevance mapping.

4. **Project Guardian findings are directly applied.** Citing specific Project Guardian findings (institutional compliance at protocol layer, interoperability, atomic settlement) and mapping them to DALP capabilities demonstrates that SettleMint understands the Singapore regulatory discourse, not just the technology.

5. **TradeTrust integration is architecturally specific.** Describing both document hash anchoring and external token registration as two separate mechanisms, and clarifying that native BoL issuance works without TradeTrust participant requirement, shows architectural depth.

---

## Issues Found

1. **MAS Notice on Cyber Hygiene (MAS TRM Annex B) is not referenced.** UOB's security evaluators will specifically check for alignment with MAS's Cyber Hygiene Notice (MAS Notice 644). The security architecture section should explicitly reference the 10 baseline controls in MAS Notice 644 and map DALP's architecture to each.

2. **Correspondent bank digital onboarding workflow is thin.** The proposal describes how UOB issues LCs to beneficiaries but doesn't describe how correspondent banks (UOB's network of issuing/advising banks) participate in the DALP platform. This is a practical operational question that UOB's trade finance team will ask.

3. **ASEAN cross-border trade corridor design needs expansion.** The proposal mentions ASEAN corridors but doesn't provide an architectural description of how a trade transaction that crosses two jurisdictions (e.g., a Singapore LC covering goods from Vietnam destined for China) is handled, which compliance rules apply, which settlement rails are used, and how jurisdictional eligibility is enforced.

---

## Improvements for Pass 2

1. **Add MAS Notice 644 alignment section.** In Section 11 (Security Architecture), add a table mapping DALP's controls to the 10 MAS Cyber Hygiene baseline controls: (1) restrict administrative privileges, (2) apply software patches, (3) set up malware protection, (4) deploy network perimeter defence, (5) use multi-factor authentication, (6) deploy virtual patching, (7) restrict administrative access, (8) whitelist applications, (9) segment networks, (10) ensure system availability and recovery capability. Use the confidence tag model.

2. **Add correspondent bank participation model.** Add a subsection in Section 8 describing how correspondent banks interact with UOB's DALP platform: correspondent bank staff use DALP's API (authenticated with their institution's API key) or UOB provides a correspondent access portal. Correspondent banks receive LC notifications, submit document presentations, and receive payment confirmations through DALP's event webhook system without requiring the correspondent to deploy DALP themselves.

3. **Add cross-border trade corridor example.** Add a brief worked example in Section 6 or Section 7 showing a Singapore LC covering goods from Vietnam to China: how the LC token is configured (SGD denomination, Vietnamese shipper, Chinese consignee), which compliance modules activate at each jurisdictional boundary, and how SWIFT MT700 handles the Vietnamese bank leg while DALP handles the underlying compliance and settlement.
