# Proposal Review: Pass 1
**Institution:** ANZ Banking Group
**Reference:** ANZ-RFP-202603
**Subject:** Tokenized Commodity Finance
**Review Date:** 20 March 2026

---

## Overall Score: 85/100

| Category | Weight | Score | Weighted |
|----------|--------|-------|---------|
| Strategic/use-case fit | 18% | 4.4 | 7.9 |
| Functional lifecycle coverage | 18% | 4.3 | 7.7 |
| Technical architecture/integration | 17% | 4.4 | 7.5 |
| Security/regulatory/control | 17% | 4.5 | 7.7 |
| Delivery credibility/references | 12% | 4.2 | 5.0 |
| Operating model/support | 8% | 4.0 | 3.2 |
| Commercial/TCO | 10% | 4.2 | 4.2 |
| **Total** | | | **43.2/50 → 86** |

*(Adjusted to 85 reflecting minor gaps)*

## Strengths
- A$DC stablecoin integration architecture is well-constructed and directly responds to ANZ's publicly announced programme
- APRA CPS 230 and CPS 234 mapping is explicit and credible
- RBI trade finance reference is the strongest comparator for multi-bank commodity LC workflows
- Project Acacia alignment is positioned correctly: compatible without hard dependency on RBA CBDC timeline
- Commodity price feed integration for margin calculation is a differentiating capability

## Issues

### Critical
1. **BAU Operating Model absent:** Add Section 14a covering commodity finance daily operations: LC documentary review queue, AUSTRAC reporting schedule, settlement queue monitoring, A$DC reserve reconciliation
2. **Scenario narratives absent:** Add Section 14b with commodity finance scenarios: LC payment on compliant document presentation, cross-border XvP settlement for AUD/USD trade, commodity price margin call trigger

### Recommended
3. ANZ's A$DC programme is explicitly mentioned in the RFP as a market initiative. The proposal should more explicitly frame the A$DC architecture as directly enabling ANZ's own stated stablecoin programme, not just as a technical option
4. NPP PayTo integration could be more specifically described. PayTo is ANZ's primary real-time payment overlay and is directly relevant to commodity finance settlement automation
5. The review score for Pass 2 target: 91+

---

*Review 1 complete.*
