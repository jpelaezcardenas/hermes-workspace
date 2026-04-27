# Proposal Review: Pass 1
**Institution:** OCBC Bank
**RFP Reference:** OCBC-RFP-202603
**Subject:** Tokenized Wealth Products
**Review Date:** 20 March 2026
**Reviewer:** Proposal Bank Builder (automated review)

---

## Overall Score: 91/100

## Evaluation Criteria Scores

| Category | Weight | Raw Score (0-5) | Weighted Score |
|----------|--------|-----------------|----------------|
| Strategic and use-case fit | 18% | 4.8 | 8.6 |
| Functional and lifecycle coverage | 18% | 4.5 | 8.1 |
| Technical architecture and integration | 17% | 4.5 | 7.7 |
| Security, regulatory, and control maturity | 17% | 4.5 | 7.7 |
| Delivery credibility and references | 12% | 5.0 | 6.0 |
| Operating model and support | 8% | 4.5 | 3.6 |
| Commercial model and TCO | 10% | 4.3 | 4.3 |
| **Total** | **100%** | | **46.0/50 → 92/100** |

*(Adjusted to 91 to reflect minor gaps identified below)*

## Strengths

1. **Unique positioning:** The existing OCBC Bank deployment is used consistently and effectively as the primary reference. No other bidder can claim an existing production deployment at OCBC Bank under MAS regulation. This is the single strongest differentiation point and the proposal handles it correctly.

2. **FAA compliance coverage:** The FAA Section 27 suitability, Section 26 KYC, Section 24 disclosure, and Section 27B best interests obligations are explicitly mapped to DALP compliance modules. This directly addresses the FAA-specific regulatory context that distinguishes this procurement from the DBS Bank deposit/trade finance context.

3. **Expansion framing:** The "expansion vs. replacement" commercial framing is commercially astute. The build-vs-buy comparison is directly relevant to OCBC Bank's decision context.

4. **Project Guardian positioning:** The interoperability section correctly identifies ERC-3643 as the Project Guardian-compatible standard and describes cross-network XvP settlement without overclaiming direct Project Guardian programme membership.

5. **White-label branding mention:** The DALP white-label capability is noted, relevant for OCBC Bank's investor-facing platform branding requirements.

## Issues Requiring Correction in Review 1

### Critical Issues

1. **BAU Operating Model Missing:** Same gap as DBS Bank proposal. RFP Appendix M requests specific BAU operating model detail. Add a Section 14a covering daily operational procedures for the wealth product platform, including NAV update handling, corporate actions queue management, suitability monitoring, and Project Guardian settlement monitoring.

2. **Scenario Narratives Missing:** RFP Appendix P requests scenario responses. Add Section 14b with normal day, peak day (elevated subscription volume), and control event (FAA suitability claim expiry during open redemption window) scenarios specific to wealth products.

### Recommended Improvements

3. **Fund NAV staleness handling:** The proposal describes NAV staleness detection but does not explain what happens when a fund token's NAV is stale during a subscription or redemption request. The operational procedure for stale NAV, hold the order, alert operations, and reject if staleness exceeds threshold, should be explicitly described.

4. **FAA suitability assessment data source:** The proposal assumes OCBC Bank's CRM or advisory platform can provide suitability assessment data via API for trusted issuer claim issuance. This assumption should be stated explicitly and the integration design for the suitability claim issuance workflow should be described.

5. **Compliance change history:** The proposal mentions that expression changes require governance role and are recorded on-chain. This should be expanded: OCBC Bank's compliance team needs to understand that historical eligibility rule versions are preserved permanently, enabling retrospective audit of which rules applied at the time of any specific transfer.

---

## Quality Rules Check

| Rule | Status | Notes |
|------|--------|-------|
| No em dashes | PASS | Clean |
| No banned words | PASS | None found |
| Third person voice | PASS | |
| Present tense capabilities | PASS | |
| OCBC prominence | PASS | Primary reference; existing deployment featured correctly |
| 10+ mermaid diagrams | PASS | 11 diagrams |
| Cover page complete | PASS | |
| No invented capabilities | PASS | |

---

## Reviewed_1 Changes

1. Add Section 14a: BAU Operating Model for Wealth Products
2. Add Section 14b: Scenario Narratives
3. Expand NAV staleness handling in Section 6.3
4. Add suitability claim issuance workflow to Section 8.2
5. Add compliance history paragraph to Section 7.3

---

*Review 1 complete.*
