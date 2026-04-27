# Proposal Review 1: Swiss National Bank (PB-040)

**RFP Reference:** SNB-RFP-WHOLESALE-CBDC-SETTLEMENT-INFRASTRUCTURE-202603
**Review Date:** March 2026
**Reviewer:** SettleMint Bid Quality Review
**Documents Reviewed:**
- swiss-national-bank-technical_full_draft.md (1204 lines)
- swiss-national-bank-commercial_full_draft.md (421 lines)

---

## 1. TR Matrix Assessment

**Total Requirements:** TR-001 to TR-046 (46 requirements)
**Comply:** 46/46 (100%)
**Partially Comply:** 0
**Non-Comply:** 0

**Quality of responses:** This is the strongest TR matrix of the three proposals. The responses are highly specific to wCBDC requirements, with precise feature references (3-of-5 multi-sig, FIPS 140-2 Level 3, XvP ADMITTED state, IBFT 2.0 finality). The settlement-focused TR requirements (TR-001 through TR-019) are appropriate for an SNB evaluation.

**Gaps identified:**
- TR-019 (SIC integration) mentions "API integration" but does not specify the interface protocol (SWIFT ISO 20022 or SIC-proprietary). Revision should note that the integration protocol is determined during Discovery based on SNB's current SIC interface specification.
- TR-028 (BIS observer access) is correct but could note that the observer access is configurable: the SNB controls which data the BIS observers can see, consistent with Swiss bank secrecy obligations.

---

## 2. Mermaid Diagram Assessment

**Diagrams included:** 11 (exceeds mandatory 10)

| # | Diagram | Present | Quality |
|---|---|---|---|
| 1 | Platform architecture (4-layer) | Yes | Good - SNB Control Panel highlighted |
| 2 | Smart contract architecture (5-layer) | Yes | Good - wCBDC extension noted |
| 3 | wCBDC lifecycle flow | Yes | Strong - covers mint to archive |
| 4 | wCBDC issuance flow (sequence) | Yes | Strong - HSM signing shown |
| 5 | Finality state machine | Yes | Excellent - unique to wCBDC context |
| 6 | XvP settlement flow (sequence) | Yes | Strong - FMIA Art 51 ADMITTED noted |
| 7 | HA deployment architecture | Yes | Good - Berne/Zurich dual site |
| 8 | Integration architecture | Yes | Good - SIC, SDX, BIS, banks shown |
| 9 | Security framework | Yes | Good - SNB-specific controls |
| 10 | 19-week Gantt | Yes | Good - key ceremony in Phase 2 |
| 11 | Participant lifecycle | Yes | Good - default management flow |

**Issues:**
- Diagram 8 (integration architecture) has a syntax error (`="base"` instead of `'base'`) which was caught and fixed; verify in final file.
- Diagram 5 (finality state machine) is excellent and unique. Consider adding the PFMI Article references to each state transition for the SNB's compliance team.

---

## 3. Regulatory Accuracy Assessment

**National Bank Act (NBG):** Correctly cited. Issuance authority and payment system mandate accurately described. The "reliable payment systems" mandate is the correct legal basis.

**FMIA Article 51:** Settlement finality analysis is accurate. The distinction between LOCKED (not yet admitted) and ADMITTED (FMIA protected) is critical and correctly drawn.

**nDSG:** Data residency and bank secrecy approach is correct. The permissioned network argument for bank secrecy is sound.

**AMLA:** Correctly mapped to compliance modules.

**CPMI-IOSCO PFMI:** The most thorough PFMI mapping of the three proposals. PFMI P13 (participant default) is correctly included, which is particularly relevant for a wCBDC system. P20 (FMI links) is included, which is relevant for SIC integration.

**BIS expectations:** Section 1.5 (BIS CPMI-IOSCO PFMI) correctly frames BIS's expectations for central bank wCBDC under the PFMI framework.

**Issue:** The proposal references "Project Helvetia III" as demonstrating "settlement of real digital bonds with real Swiss franc wCBDC." This is accurate, but the proposal should be careful not to imply that DALP was used in Project Helvetia (it was not). Revision should clarify: "Project Helvetia III demonstrated the concept; SettleMint's architecture is aligned with the Helvetia conclusions but is an independent implementation."

---

## 4. Style and Tone Assessment

**Writing rules compliance:**
- No em dashes: Pass
- No prohibited words: Pass
- Active voice: Strong throughout
- Problem-Solution-Evidence: Excellent in Executive Summary (Sections 1.1-1.5a)
- Jargon defined: Good. wCBDC, IBFT 2.0, XvP, FIPS 140-2, GOVERNANCE_ROLE all defined.

**Length:** 1204 lines (meets 1200+ requirement).

**Distinctive elements:**
- Section 1.5a (Why DALP's Architecture Is Different for Central Bank wCBDC) is the best explanatory writing in any of the three proposals. The vendor compromise threat model argument is sophisticated and will resonate with an SNB audience.
- Appendix D (Monetary Control Response Times) is a useful technical specification that differentiates SettleMint's response from vague capability claims.
- Section 4.3 (Finality State Machine) with the state diagram is unique and directly addresses a core SNB requirement.

**Issues:**
- Section 1.5a uses the phrase "DALP's permissioned blockchain provides this", the word "this" is vague. Revision should specify what "this" refers to (the immutable audit record of wCBDC transactions).

---

## 5. Commercial Proposal Assessment

**Structure:** All 15 sections present.
**Length:** 421 lines (exceeds 350 minimum).
**[CLIENT-SPECIFIC] placeholders:** All pricing correctly marked.
**No "About SettleMint" or "About DALP" sections:** Confirmed.

**Strengths:**
- Monetary authority separation clause (Section 2.3 and Section 13.3): This is a significant differentiator. No other vendor will include a contractual prohibition on seeking monetary authority access. This clause will resonate strongly with an SNB legal team.
- Key ceremony included in implementation fee: Correctly positioned as a mandatory Phase 2 deliverable, not a separately priced item.
- SNB-specific ROI framing: The systemic risk reduction approach to ROI is appropriate for a central bank; commercial revenue framing would be inappropriate.
- Phase 3 monetary control validation gate: Excellent addition. The SNB will appreciate the explicit contractual confirmation that monetary tools are validated before production go-live.

**Issues:**
- Section 8.2 ROI illustration uses "CHF 10 billion daily Swiss interbank settlement volume" as an assumption. This should be labelled as a publicly available estimate, not a SettleMint assumption, to avoid appearing to speculate on non-public SNB data.
- Section 10 (Optional Items) includes "Cross-currency XvP extension." The feasibility and scope of cross-currency settlement should be discussed in the technical proposal before being offered commercially. Revision should either add a technical section on cross-currency capability or remove from optional items.

---

## 6. Overall Assessment

| Dimension | Score (0-50) | Notes |
|---|---|---|
| TR matrix completeness | 10/10 | All 46 complete and highly specific |
| Diagram quality | 10/10 | 11 diagrams; finality state machine is excellent |
| Regulatory accuracy | 9/10 | Project Helvetia clarification needed |
| Writing quality | 10/10 | Best writing of the three proposals |
| Commercial structure | 8/10 | Monetary authority clause is excellent; ROI assumption note needed |
| **Total** | **47/50** | **Strongest of the three proposals** |

---

## 7. Required Revisions for Reviewed Draft 1

1. **Clarify Project Helvetia relationship:** Section 1.1 - clarify DALP is aligned with but independent from Project Helvetia
2. **Fix TR-019:** Note that SIC integration protocol is determined during Discovery
3. **Clarify TR-028:** Note SNB controls BIS observer data scope; bank secrecy preserved
4. **Fix Section 1.5a vague reference:** Replace "this" with specific referent
5. **Commercial ROI assumption:** Label CHF 10B daily volume as publicly available estimate
6. **Commercial optional items:** Either add cross-currency technical basis or remove from optional items
7. **Diagram 5 enhancement:** Add PFMI article references to state transitions (optional improvement)
8. **Diagram 8 syntax:** Confirm syntax error corrected in final file
