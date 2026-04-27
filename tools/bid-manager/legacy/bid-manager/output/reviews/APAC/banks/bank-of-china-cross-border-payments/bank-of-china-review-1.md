# Review Pass 1: Bank of China: Cross-Border Tokenized Payments

**Reviewer:** Proposal Bank Builder (automated)
**Date:** 2026-03-20
**Documents reviewed:**
- Technical: `bank-of-china-technical_full_draft.md`
- Commercial: `bank-of-china-commercial_full_draft.md`

---

## Technical Proposal Review

### Strengths
- Strong alignment to PBOC, SAFE, Cybersecurity Law, Data Security Law, and PIPL, each mapped to specific DALP controls
- mBridge and e-CNY context addressed accurately with honest capability boundary notes (🟡)
- XvP settlement architecture explained clearly with the atomic execution benefit for cross-border payments
- 11 mermaid diagrams covering architecture, compliance mapping, settlement flow, deployment, operations, and implementation timeline
- Maker-checker and break-glass procedures well documented
- TR requirement matrix complete with confidence tags on all 20 items
- Three-stream reconciliation model (token-to-internal, internal-to-GL, nostro/vostro) is a differentiator, keep and expand
- On-premises deployment recommendation appropriately justified against China regulatory context

### Issues Found
1. **Word count concern:** Document is comprehensive but may fall slightly below the 20,000-word target, consider expanding Phase 1 Discovery and the Reconciliation Architecture sections
2. **Operational model needs more depth:** Daily operational procedures table is present but Day/Night shift transitions, handover procedures, and escalation paths need more detail
3. **CIPS gateway boundary note:** TR-13 marked 🟡 is correct but needs a more detailed explanation of the integration contract with Bank of China's existing CIPS gateway
4. **Reference client section:** Mashreq Bank reference is appropriate but lacks enough specificity, add more detail about the cross-border payment rail specifics
5. **Cover page fields:** Ensure all cover page placeholders are resolved in DOCX, check version number and SettleMint confidentiality notice are populated

### Commercial Proposal Review

### Strengths
- Decision snapshot table is clear and punchy
- ROI framework with explicit assumptions is well structured
- Per-tier comparison table is clean
- Payment schedule table is appropriate
- TCO section properly distinguishes DALP vs. build vs. multi-vendor with honest comparison

### Issues Found
1. **All commercial figures are [VARIABLE] placeholders**: this is expected for a draft but the framework for validating these must be explicit in the Next Steps section
2. **IP section needs expansion**: specify what happens to compliance module configuration (JSON/YAML files) at contract end; Bank of China will want this clarified given security of financial rules
3. **Duration section**: should clarify that the 3-year term begins from production go-live, not contract signature

---

## Scores (Pass 1)
- Technical: 78/100
- Commercial: 74/100

## Priority Fixes for reviewed_1
1. Expand operational model section with shift handover and escalation detail
2. Expand CIPS integration boundary explanation in TR-13
3. Add more detail to Mashreq Bank reference case study
4. Strengthen IP section in commercial proposal
5. Clarify license term start date in commercial proposal
