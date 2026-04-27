# Review 1: ICBC Digital Asset Custody Pilot Proposals

**Date:** 20 March 2026
**Reviewer:** SettleMint Bid Quality Review
**Reference:** ICBC-RFP-DACP-202603

---

## Technical Proposal Review

### Overall Score: 76/100

### Strengths

1. **SOE governance specificity:** Maker-checker configuration table, 9-role RBAC matrix, and key ceremony procedure are precisely calibrated to ICBC's SOE governance requirements.
2. **Custody architecture is accurate:** Vault addon for segregated custody, DFNS/Fireblocks integration options, and the custody workflow state machine are all technically correct and appropriately detailed.
3. **CSRC sandbox requirements are addressed:** Investor eligibility enforcement, segregated custody, transfer restrictions, and CSRC daily reporting are all covered.
4. **Key Guardian coverage is strong:** The three-level key hierarchy, dual-control policies, and DFNS/Fireblocks alternatives are well-explained.

### Issues to Fix

**Issue 1 (Major): Word count is 12,523, needs 20,000+.**
Add: expanded sections on SettleMint's company history, APAC delivery team, and regulatory engagement history (Section 3). Expand Section 4 (About DALP) with detailed Feeds System, Chain Indexer, and Execution Engine descriptions. Expand Customer References with more quantified outcomes.

**Issue 2 (Major): Missing diagrams, only 5 mermaid diagrams present, need 10+.**
Add: token lifecycle state diagram, security model diagram, data flow diagram, deployment topology diagram, and regulatory reporting flow diagram.

**Issue 3 (Minor): OSCCA commitment is still "evaluation underway."**
Commit to SM2/SM3/SM4 implementation in Phase 2 for specific components.

**Issue 4 (Minor): Customer References need quantified outcomes.**
Add metrics for DBS (volume), Clearstream (settlement failure rate), CBB (key management governance).

---

## Commercial Proposal Review

### Overall Score: 72/100

### Strengths

1. **Custody fee ROI is compelling:** The CNY 4B annual fee at full scale vs. EUR 420K licence cost makes an overwhelming case.
2. **Build vs. buy table is well-constructed.**
3. **Phased milestone structure is correctly described.**

### Issues to Fix

**Issue 1 (Major): Word count is low (approximately 4,200 words vs 8,000+ target).**
Expand Investment Rationale with detailed operations savings modelling. Add full TCO narrative. Expand Commercial Terms with governing law proposal, force majeure, change of control. Expand Support section with full maintenance window and SLA credit table.

**Issue 2 (Major): TCO analysis lacks narrative framing.**
The Year 1 vs Year 2+ cost profile step-change is in Appendix B but not in the main body. Move to Section 9 TCO with explicit narrative.

**Issue 3 (Minor): Reference Clients section needs stronger framing of relevance to ICBC's use case.**

---

## Action Items for Reviewed Version 1

1. Add 5 more mermaid diagrams to technical
2. Expand Sections 3 and 4 by ~4,000 words each
3. Add quantified outcomes to all Customer References
4. Expand commercial to full 8,000+ words
5. Add governing law (Singapore) and full commercial terms
6. Move Year 1 vs Year 2+ cost narrative to main TCO section
