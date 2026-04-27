# Proposal Review: Pass 1

**Institution:** Kasikornbank PCL
**Reference:** KASIKORNBANK-RFP-202603
**Review Date:** 20 March 2026
**Reviewer:** Automated Quality Review System
**Documents Reviewed:**
- kasikornbank-technical_full_draft.md
- kasikornbank-commercial_full_draft.md

---

## Scores Table

| Category | Max | Score | Notes |
|---|---|---|---|
| Cover page completeness (no placeholders) | 5 | 5 | All fields resolved; classification correct |
| Executive summary depth and specificity | 10 | 9 | Strong context; Thailand-specific; could expand Project Inthanon operational lessons |
| About SettleMint. APAC relevance | 8 | 8 | All APAC references named; Maybank highlighted correctly |
| DALP platform overview, completeness | 10 | 9 | Full 5-pillar coverage; asset class table strong |
| Solution architecture, diagram quality | 10 | 8 | Main stack diagram excellent; multi-asset architecture diagram solid |
| Asset lifecycle, depth per asset class | 10 | 9 | Three state diagrams; bond lifecycle most detailed; fund lifecycle could expand cut-off mechanics |
| Compliance architecture. Thai regulatory specificity | 12 | 11 | BOT, SEC Thailand, PDPA all addressed; investor category mapping table strong |
| Integration architecture, enterprise realism | 10 | 8 | BAHTNET and PromptPay integration described; enterprise diagram comprehensive |
| Custody and key management, operational detail | 8 | 8 | Tier architecture clear; maker-checker table complete; break-glass procedure documented |
| Settlement and operations, detail | 8 | 7 | Three settlement models covered; exception handling section strong; could add DvP timing sequence |
| Security architecture, depth | 8 | 8 | Defense-in-depth diagram; IAM table; penetration testing policy stated |
| Deployment options. Thailand context | 6 | 6 | All three options described; Thailand data residency discussion present |
| Implementation approach. Gantt and RAID | 8 | 8 | Gantt diagram included; Phase descriptions thorough; RACI clear |
| Support and SLA, quantified commitments | 6 | 6 | P1–P4 table present; RTO/RPO stated; service credit model described |
| Reference projects, all 14 present | 6 | 6 | All 14 in table; three expanded with Thailand relevance analysis |
| Regulatory alignment, country-specific mapping | 8 | 8 | BOT, SEC Thailand, PDPA all addressed; mapping table with confidence ratings |
| Response matrix, all 20 requirements | 8 | 8 | TR-01 to TR-20 all addressed; assumptions stated; confidence ratings present |
| Appendix A Risk Register | 4 | 4 | 10 risks; Thailand-specific; KBTG risk included |
| Appendix B Compliance Module Catalog | 4 | 4 | All 18 modules; Kasikornbank application column |
| Commercial, pricing accuracy | 8 | 8 | EUR 300K/120K correct; VAT statement prominent; no discount language |
| Commercial. TCO analysis | 6 | 6 | 3-year and 5-year tables present; build vs buy analysis strong |
| Commercial, exit and transition terms | 5 | 5 | Data portability, IP, smart contract continuity all covered |
| Banned language check | 5 | 5 | No banned phrases detected |
| Third-person voice consistency | 3 | 3 | Consistent throughout |
| **TOTAL** | **180** | **172** | |

**Pass 1 Score: 172 / 180**

---

## Strengths

1. **Thailand regulatory specificity is excellent.** The BOT, SEC Thailand, and PDPA sections go well beyond generic compliance claims, the investor category mapping table (QII, UHNW, HNW, retail with claim types) is directly actionable and demonstrates that the author understands Thailand's actual regulatory structure.

2. **Project Inthanon context is well-integrated.** The executive summary references Project Inthanon lessons credibly, connecting the Bank of Thailand's wholesale settlement work to Kasikornbank's procurement rationale without overclaiming SettleMint's involvement.

3. **Multi-asset architecture is clear.** The unified platform diagram showing bonds, equities, and fund units on one platform with a shared Identity Registry and Compliance Engine is a strong differentiator and answers Kasikornbank's concern about fragmentation.

4. **RAID register is Thailand-specific.** The KBTG integration risk, PDPA hosting risk, and BAHTNET connectivity risk are all institution-specific rather than generic boilerplate.

5. **Commercial model is clean.** EUR 300K/120K pricing stated correctly; VAT statement prominent; no discount language; build vs. buy analysis is realistic and uses credible cost ranges.

6. **Maker-checker table is operational.** The table in Section 9.2 listing maker/checker roles per operation type is exactly what a Bank of Thailand examiner would want to see documented.

---

## Issues Found

1. **Project Inthanon operational specifics are thin.** The RFP appendices specifically require bidders to explain how Project Inthanon lessons inform their proposed design. The current text acknowledges Inthanon but doesn't explicitly describe what architectural or governance lessons it represents (e.g., multi-party netting, liquidity savings mechanisms, regulatory involvement in network governance). This is a scored evaluation criterion.

2. **DvP timing sequence missing.** Settlement and Operations describes three models but lacks a sequence diagram showing the timing of DvP steps, lock, confirm, execute, settle, release, which would answer the "what happens when things go sideways" question the RFP scores heavily.

3. **Retail investor channel (PromptPay) compliance context needs expansion.** The proposal mentions PromptPay for retail distribution but doesn't address SEC Thailand's suitability and disclosure obligations for retail access to tokenised securities, an area where the SEC has specific requirements that the compliance section should address.

4. **KBTG coexistence design is acknowledged but not detailed.** The RAID register notes it but the integration architecture section doesn't describe the coexistence model even briefly. Evaluators from KBTG will want to see this addressed.

5. **Fund NAV Oracle feed provider is not named.** The fund lifecycle section describes NAV integration but doesn't name whether this is via a Kasikornbank-internal feed or an external oracle, an important third-party dependency the RFP requires to be disclosed.

---

## Improvements Required for Pass 2

1. **Add Project Inthanon lesson mapping.** Add a 2–3 paragraph section in the Regulatory Alignment chapter explicitly mapping Project Inthanon's published design lessons (multi-party settlement, atomic DvP netting, programmable liquidity facilities, regulatory oversight nodes) to DALP's architecture. Cite specific Inthanon design elements and show how DALP aligns or improves on them.

2. **Add DvP settlement sequence diagram.** Insert a mermaid sequence diagram in Section 10 showing the end-to-end DvP settlement flow: settlement initiation → compliance pre-check → settlement contract lock → counterparty confirmation → atomic execution → GL notification → settlement event recording → exception path (timeout/rejection).

3. **Expand retail investor SEC Thailand compliance.** Add a subsection in Section 7 addressing SEC Thailand's suitability obligation for retail investors accessing tokenised securities: how DALP captures and enforces suitability outcomes from Kasikornbank's advisory function, how disclosure acknowledgement is recorded, and how retail-specific transfer restrictions differ from institutional restrictions.

4. **Add KBTG coexistence design note.** Add a brief subsection in Section 8 describing the coexistence model between DALP's EVM network and KBTG's existing blockchain infrastructure, even if specific details are confirmed in Phase 1. At minimum: DALP deploys on its own EVM network; any KBTG network bridge is assessed in Phase 1; DALP can operate independently or in parallel with existing infrastructure.

5. **Clarify NAV feed dependency.** In the fund lifecycle section, explicitly state that NAV data is sourced from Kasikornbank's fund management system (or an approved external data vendor) through a defined API integration, and list this as a third-party dependency in the compliance assumptions register.
