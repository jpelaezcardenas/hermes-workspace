# Proposal Review 2: Swiss National Bank (PB-040)

**RFP Reference:** SNB-RFP-WHOLESALE-CBDC-SETTLEMENT-INFRASTRUCTURE-202603
**Review Date:** March 2026
**Reviewer:** SettleMint Bid Quality Review
**Documents Reviewed:**
- swiss-national-bank-technical_full_reviewed_1.md
- swiss-national-bank-commercial_full_reviewed_1.md

---

## 1. Review 1 Findings: Resolution Check

| Finding | Resolution Status | Notes |
|---|---|---|
| Project Helvetia clarification | Resolved | DALP independence from Helvetia explicitly stated |
| TR-019 SIC protocol note | Resolved | Discovery-based protocol determination added |
| TR-028 BIS observer data scope | Resolved | SNB controls scope; bank secrecy note added |
| Section 1.5a vague "this" | Resolved | Specific referent added |
| Commercial ROI CHF 10B basis | Resolved | BIS 2024 estimate label added |
| Commercial cross-currency scoping note | Resolved | Technical scoping caveat added |
| Diagram 8 syntax error | Confirmed fixed in draft (corrected to 'base') |
| Diagram 5 PFMI references | Not added - acceptable as-is for submission quality |

---

## 2. Final Quality Check

### Technical Proposal

**TR matrix:** 46/46 requirements marked Comply. Responses are the most specific and technically detailed of the three proposals. Settlement-focused TR requirements are appropriately calibrated for a central bank wCBDC evaluation.

**Diagrams:** 11 diagrams. The finality state machine (Diagram 5) is exceptional and unique in the three proposals, it demonstrates genuine understanding of FMIA Article 51 mechanics. The participant lifecycle diagram correctly shows default management as a terminal state.

**Regulatory accuracy:** Fully corrected. Project Helvetia relationship is now unambiguous. NBG, FMIA, PFMI, and nDSG coverage is accurate. No errors detected.

**Writing quality:** The SNB proposal has the highest writing quality of the three. Section 1.5a (vendor compromise threat model) and Section 4.3 (finality state machine explanation) are particularly strong. The executive summary positions DALP as the only architecture that preserves SNB's monetary authority through technical rather than process controls, this is the central value proposition for a central bank evaluation and it is well-articulated.

**Distinctive features that will differentiate this proposal:**
1. Finality state machine diagram with ADMITTED state and FMIA Article 51 mapping
2. GOVERNANCE_ROLE 3-of-5 multi-sig architecture explicitly designed for central bank use
3. Vendor compromise threat model, explicit acknowledgment that SettleMint must be excluded from monetary authority
4. Monetary control response times table (Appendix D), quantified, specific
5. Key ceremony included in Phase 2 deliverables, demonstrates operational understanding

### Commercial Proposal

**Structure:** All 15 sections present. Complete.
**Monetary authority separation clause:** This is the defining commercial differentiator. No other vendor will include this clause. It demonstrates SettleMint's understanding of what a central bank actually needs from a vendor relationship.
**Sovereign engagement structure (Section 13.1):** Correctly acknowledges SNB's sovereign immunity and Swiss public procurement applicability, appropriate for an SNB commercial proposal.
**Phase 3 additional gate (monetary control validation):** The contractual requirement for SNB to sign off on monetary tools before integration testing begins is excellent and will build SNB confidence.

---

## 3. Final Scores

| Dimension | Score (0-50) | Change from Review 1 |
|---|---|---|
| TR matrix completeness | 10/10 | No change |
| Diagram quality | 10/10 | No change |
| Regulatory accuracy | 10/10 | +1 (Helvetia clarification) |
| Writing quality | 10/10 | No change |
| Commercial structure | 9/10 | +1 (ROI labelling, cross-currency note) |
| **Total** | **49/50** | **+2 from Review 1** |

---

## 4. Final Recommendation

The SNB proposal is submission-ready at the reviewed_1 level. This is the highest-scoring proposal of the three, earning 49/50 in the final review.

The proposal correctly identifies the central challenge for a central bank wCBDC evaluation (monetary authority preservation through technical architecture), addresses it with specific DALP features (GOVERNANCE_ROLE 3-of-5 multi-sig, FIPS 140-2 Level 3 HSM, supply cap enforcement), and supports it with the most important commercial differentiator in the package (monetary authority separation clause).

The reviewed_2 version is the final submission copy with version number updated to 1.2 Final.
