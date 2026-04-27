# Review Pass 1: Chipper Cash

**Date:** 2026-03-19
**Reviewer:** Proposal Bank Builder
**Proposals reviewed:** chipper-cash-technical_full_draft.md, chipper-cash-commercial_full_draft.md
**Review basis:** bid-manager/setup/skills/bid-checker/scoring-rubric.md

---

## Technical Proposal: Issues Found

### Issue T-01: Performance benchmarks missing test conditions
Section 6.3 cites "200 concurrent settlement instructions: median 2.1s, P99 4.8s" but provides no test conditions (node count, hardware spec, network topology, load generator). A technical evaluator will dismiss this as cherry-picked. **Required fix:** Add 4-node Besu IBFT 2.0 test profile (AWS c6g.xlarge, dedicated validator nodes), confirm 180 TPS throughput ceiling and P99 under sustained load.

### Issue T-02: Nigerian AML/CFT framework reference too generic
Section 8.1 cites "Money Laundering (Prevention) Act" without specifying the current version. The operative framework is the Money Laundering (Prevention and Prohibition) Act 2022 (MLPPA 2022) and the Proceeds of Crime (Recovery and Management) Act 2022. NFIU reporting thresholds should cite NFIU circular figures (NGN 5M cash transaction threshold, NGN 10M wire threshold). This is an evaluator test point.

### Issue T-03: FCA/UK corridor compliance is thin
Section 8.1 covers UK under "MLR 2017, PSRs" but Chipper Cash's UK e-money operations fall under Electronic Money Regulations 2011 (EMR 2011) and Payment Services Regulations 2017 (PSRs 2017). FCA DSAR rules and UK sanctions (OFSI) are not mentioned. For a company with UK FCA EMI registration, this gap signals the proposal was not customized to Chipper Cash's actual licensing profile.

### Issue T-04: SARB Exchange Control reporting threshold missing
Section 8.1 cites FICA and Exchange Control but does not specify the single discretionary allowance (SDA) of R1M/year or the capital transfer allowance (R10M/year) that determines which Chipper Cash ZAR transactions require SARB approval vs. SDA treatment. Compliance evaluators from SARB-background institutions will notice this gap.

### Issue T-05: Security architecture lacks a dedicated diagram
The security section is covered narratively in architectural principles but there is no dedicated security model diagram. The scoring rubric requires 10 diagrams minimum including a security model diagram. The draft has 11 diagrams but none explicitly labeled "Security Model". Rename or add a clear security control plane diagram.

### Issue T-06: REQ-14 and REQ-15 compliance matrix entries are bare
REQ-14 (high-throughput routing, participant onboarding, liquidity monitoring) and REQ-15 (reconciliation between tokenized value movement and fiat settlement legs) receive minimal compliance matrix responses. Both are High priority requirements. Expand to 2-3 sentences each with specific DALP mechanism.

---

## Commercial Proposal: Issues Found

### Issue C-01: No payback period analysis
The ROI framework lists value drivers but gives no payback period estimate. Chipper Cash's CFO/board will ask: when does the platform cost recover against operational savings? Add a simple payback analysis: if correspondent banking fee savings on high-volume corridors (NG-GH, KE-TZ) reach $100K-$200K/year, payback is 12-18 months on implementation investment.

### Issue C-02: Multi-year discount not clearly structured
Section 7.2 mentions "10% multi-year discount ($144,000 total saving)" but this is applied to the full 3-year licence commitment. The discount mechanics (when credited. Year 1 upfront? Annual?) need to be explicit. Add a separate discounted pricing table showing undiscounted vs. discounted totals.

### Issue C-03: Commercial terms missing data processing agreement note
Section 7.3 omits GDPR/data processing agreement (DPA). For a cross-border payments company with EU-resident customer data flowing through DALP's EU-region managed SaaS, procurement will require confirmation that a DPA is included under the platform licence. Add one clause explicitly confirming DPA is included.

---

## Technical Scores: Draft

| Dimension | Score | Notes |
|-----------|-------|-------|
| Executive Readability | 4 | Opens with Chipper Cash context; value proposition clear |
| Technical Credibility | 3 | Benchmarks present but no methodology; needs test conditions |
| Requirements Coverage | 4 | REQ-14/15 thin; others well-covered |
| Solution Design | 4 | Multi-corridor architecture is well-conceived |
| Regulatory Depth | 3 | Nigerian and UK gaps; SARB threshold missing |
| Security | 3 | No dedicated security diagram; coverage is narrative only |
| Implementation Credibility | 4 | 16-week timeline with phase gates is credible for managed SaaS |
| Risk Management | 4 | PAPSS Phase 1 exclusion is honest and appropriate |
| Evidence Discipline | 3 | Performance claims lack methodology |
| Overall Tailoring | 4 | Well-adapted to fintech/Africa context |
| **Total (Technical)** | **36/50** | |

## Commercial Scores: Draft

| Dimension | Score | Notes |
|-----------|-------|-------|
| Executive Summary | 4 | Decision framing is clear; recommendation explicit |
| Investment Rationale | 3 | Missing payback period; ROI framework is directional only |
| Pricing Clarity | 3 | Multi-year discount mechanics ambiguous |
| TCO Analysis | 4 | Build vs DALP comparison is compelling |
| Terms Structure | 3 | No DPA mention; liability cap reasonable |
| **Total (Commercial)** | **17/25** | |

---

## Required Fixes for Reviewed_1

1. Add performance test conditions (T-01)
2. Add MLPPA 2022 reference and NFIU thresholds (T-02)
3. Expand FCA section: EMR 2011, PSRs 2017, OFSI (T-03)
4. Add SARB SDA/CTA thresholds (T-04)
5. Add labeled security model diagram (T-05)
6. Expand REQ-14 and REQ-15 compliance matrix (T-06)
7. Add payback period (C-01)
8. Add discounted pricing table (C-02)
9. Add DPA clause in commercial terms (C-03)
