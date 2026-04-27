# Proposal Review: UOB Digital Trade Finance Platform: Review 2

**RFP Reference:** UOB-RFP-202603
**Institution:** UOB (United Overseas Bank Limited), Singapore
**Subject:** Digital Trade Finance Platform
**Review Pass:** 2 (Final)
**Review Date:** 20 March 2026
**Reviewer:** SettleMint Proposal Bank Builder v12
**Documents Reviewed:**
- `uob-technical_full_reviewed_2.md` (20,088 words)
- `uob-commercial_full_reviewed_2.md` (8,016 words)

---

## Review 1 Issues Addressed

Review 1 identified the following gaps in the reviewed_1 documents. This review confirms each has been addressed in reviewed_2.

| Review 1 Issue | Reviewed_2 Resolution | Status |
|---|---|---|
| MAS Notice 644 (Cyber Hygiene) 10-control alignment table missing from security section | Full 10-control alignment table added in Section 11.2 with evidence available column and confidence ratings | Resolved |
| Correspondent bank participation model missing from integration section | Full Section 8.6 added covering Model A (SWIFT-only), Model B (API-connected), and Model C (Document Presenter) with diagram | Resolved |
| Vietnam-China cross-border corridor worked example missing from compliance section | Section 7.4 added with complete worked example covering Country Restriction, KYB, HTLC cross-currency, presentation window enforcement, and TBML check | Resolved |
| Section 19 Operational Run State and BAU Model missing | Appendix C (Section 20) added covering BAU operating model, incident response workflow, change management in BAU, and capacity management | Resolved |
| Section 20 Data Architecture and Reporting missing | Appendix D (Section 21) added covering data architecture overview, retention, regulatory reporting, management reporting KPIs, audit trail architecture, and DWH integration | Resolved |
| RAID register incomplete (fewer than 15 items) | Full RAID register in Section 13.2 expanded to 15 Risks, 5 Assumptions, 2 Issues, 10 Dependencies | Resolved |
| Risk register fewer than 15 risks | Appendix A expanded to 15 risks with inherent and residual ratings | Resolved |
| Compliance module catalog incomplete | Appendix B expanded to all 18 modules with full descriptions, UOB Application column, and go-live activation status | Resolved |
| Word count below 20,000 words | Final count: 20,088 words | Resolved |

---

## Scoring: Technical Proposal (reviewed_2)

Scoring categories and weights are identical to Review 1 for comparability.

| Category | Max Score | Review 1 Score | Review 2 Score | Notes |
|---|---|---|---|---|
| Executive Summary and Context | 10 | 8 | 9 | Stronger regulatory context; MAS Notice 644 referenced from outset |
| About SettleMint / Credentials | 8 | 7 | 7 | Unchanged; remains strong |
| Platform Overview Accuracy | 12 | 10 | 11 | DALP capabilities accurately described; Restate durable execution now prominent |
| Solution Architecture | 12 | 9 | 11 | Multi-party network diagram added; key hierarchy diagram added |
| Asset Lifecycle Coverage | 10 | 8 | 9 | LC amendment governance, BoL endorsement chain, secondary market now covered |
| Compliance Architecture | 15 | 11 | 14 | Vietnam-China worked example; full regulatory mapping table; Notice 644 alignment |
| Integration Architecture | 12 | 8 | 11 | Correspondent bank participation model (Section 8.6) with 3 models and diagram |
| Custody and Key Management | 8 | 7 | 8 | Key hierarchy diagram added; governance key management detailed |
| Settlement and Operations | 10 | 8 | 9 | HTLC cross-currency sequence diagram; payment failure handling |
| Security Architecture | 12 | 8 | 12 | Full MAS Notice 644 10-control table with evidence and confidence; all 10 green |
| Deployment Options | 6 | 5 | 5 | Adequate; high availability configuration now documented |
| Implementation Approach | 12 | 7 | 11 | Full RAID (15 risks, 5 assumptions, 2 issues, 10 dependencies); Gantt updated |
| Support and SLA | 6 | 5 | 6 | Severity classification table for trade finance scenarios added |
| Reference Projects | 8 | 7 | 7 | Unchanged; 14 references maintained |
| Regulatory Alignment | 10 | 8 | 9 | Project Guardian and ETA alignment expanded |
| Response Matrix | 10 | 9 | 10 | All 20 requirements addressed; Notice 644 added to TR-04 |
| Risk Register | 8 | 5 | 8 | 15 risks with inherent and residual ratings |
| Compliance Module Catalog | 10 | 6 | 10 | All 18 modules with full descriptions |
| BAU / Operational Run State | 8 | 0 | 8 | New section covers all BAU requirements |
| Data Architecture / Reporting | 8 | 0 | 8 | New section covers data architecture, retention, regulatory reporting, DWH |
| Writing Quality / No Forbidden Words | 5 | 4 | 5 | Third person maintained; no forbidden words; confidence tags throughout |
| **Total** | **180** | **129** | **163** | |

---

## Scoring: Commercial Proposal (reviewed_2)

| Category | Max Score | Review 1 Score | Review 2 Score | Notes |
|---|---|---|---|---|
| Commercial Summary | 8 | 6 | 8 | Year 1 estimate, 5-year table, commercial headline added |
| Licensing Model | 10 | 8 | 9 | Entity expansion pricing, not-included items now explicit |
| Implementation Pricing | 10 | 6 | 8 | Phase-by-phase scope table; out-of-scope items listed |
| Infrastructure Costs | 8 | 6 | 8 | Component-level breakdown; HSM hardware option |
| Support Fees | 6 | 4 | 6 | Enterprise support option; Singapore-timezone coverage |
| 5-Year TCO | 10 | 5 | 9 | Full 5-year table with all components; per-transaction cost analysis |
| Build vs Buy Analysis | 12 | 7 | 12 | 15-line-item component-level build cost; 5-year comparison table |
| ROI Analysis | 12 | 5 | 11 | Quantified savings by category; payback period scenarios |
| Risk-Adjusted Value | 8 | 0 | 8 | New section with probability weights and sensitivity analysis |
| Scenario Pricing | 8 | 0 | 8 | Scenarios A (ASEAN entity), B (Greater China correspondents), C (secondary market) |
| Payment Terms | 8 | 6 | 8 | Milestone table with % and triggers; payment protection provisions |
| Assumptions Register | 8 | 5 | 8 | 17 assumptions covering all material commercial dimensions |
| Commercial Risk Register | 8 | 0 | 8 | 10 risks with likelihood and mitigation |
| Exit and Transition Terms | 8 | 5 | 8 | Source code escrow; key migration; transition support; 90-day access |
| Multi-Year Pricing Protection | 6 | 0 | 6 | CPI cap mechanism; 36-month price hold; additional environment lock |
| SGD/EUR FX Treatment | 4 | 2 | 4 | Full FX treatment section; indicative SGD equivalents |
| Singapore GST | 4 | 2 | 4 | Detailed GST treatment; IRAS documentation commitment |
| Value Justification | 10 | 7 | 10 | Four value dimensions; commercial programme governance |
| Writing Quality | 4 | 3 | 4 | No forbidden words; third person; clear pricing tables |
| **Total** | **152** | **77** | **143** | |

---

## Overall Summary

| Document | Review 1 Score | Review 2 Score | Improvement | Max Score |
|---|---|---|---|---|
| Technical Proposal | 129/180 | 163/180 | +34 points | 180 |
| Commercial Proposal | 77/152 | 143/152 | +66 points | 152 |

**Technical Pass Rate:** 163/180 = 90.6%
**Commercial Pass Rate:** 143/152 = 94.1%

### Remaining Minor Gaps

The following minor items were not addressed in reviewed_2 due to scope constraints, but are noted for any future revision:

1. **Technical Section 12 (Deployment):** The cross-region DR option (AWS ap-east-1 Hong Kong) is mentioned in the Risk Register but not elaborated in the Deployment section. A future revision could add a formal cross-region DR architecture option with pricing.

2. **Technical Integration (Finacle):** The core banking system is referred to generically; a confirmed UOB CBS system name (if Finacle or Oracle) would strengthen the integration specificity.

3. **Commercial Section 4 (Implementation):** Implementation fee range (EUR 250,000 to 400,000) is indicative; Phase 1 confirmation is noted but the final commercial proposal should replace the range with a confirmed fixed fee.

### Pass/Fail Assessment

Both documents pass the SettleMint Proposal Bank quality threshold (80% of maximum score) at this review level.

- Technical: 90.6% (Pass)
- Commercial: 94.1% (Pass)

**PB-072 Status: Complete.**
