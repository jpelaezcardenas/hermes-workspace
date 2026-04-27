# Proposal Review: Pass 1
**Institution:** Commonwealth Bank of Australia
**Reference:** COMMONWEALTH-BANK-RFP-202603
**Review Date:** 20 March 2026

---

## Overall Score: 87/100

| Category | Weight | Score | Weighted |
|----------|--------|-------|---------|
| Strategic/use-case fit | 18% | 4.5 | 8.1 |
| Functional lifecycle | 18% | 4.4 | 7.9 |
| Technical architecture | 17% | 4.4 | 7.5 |
| Security/regulatory | 17% | 4.5 | 7.7 |
| Delivery/references | 12% | 4.5 | 5.4 |
| Operating model | 8% | 4.0 | 3.2 |
| Commercial/TCO | 10% | 4.2 | 4.2 |
| **Total** | | | **44.0/50 → 88** *(adj 87)* |

## Strengths
- Commerzbank reference is excellent, directly comparable production case with quantified EUR 7M savings
- Covered bond collateral monitoring (APS 180) is specifically addressed, shows APRA-level depth
- SLB coupon step mechanism with SPT data feed is a sophisticated capability correctly positioned
- Project Atom positioned correctly: compatible without hard dependency
- ASX digital market reform acknowledged with appropriate uncertainty

## Issues

### Critical
1. **BAU Operating Model absent:** Add Section 14a: bond operations daily procedures, coupon distribution calendar management, covered bond collateral monitoring, AUSTRAC reporting, SLB SPT review cycle
2. **Scenario narratives absent:** Add Section 14b: standard bond coupon payment day, SLB SPT determination and coupon step execution, AUSTRAC compliance event (bond investor freeze)

### Recommended
3. Covered bond trustee role clarification: the proposal mentions the covered bond trustee holds the Custodian role, this should be more explicitly described as the enforcement mechanism in distress scenarios (APRA will examine this)
4. AUD stablecoin issuance regulatory risk: the proposal acknowledges this in the risk register but the commercial assumption section should more explicitly state that the NPP-coordinated settlement model is the primary go-live model if AUD stablecoin issuance regulatory characterization is unresolved

---

*Review 1 complete. Target Pass 2 score: 92+*
