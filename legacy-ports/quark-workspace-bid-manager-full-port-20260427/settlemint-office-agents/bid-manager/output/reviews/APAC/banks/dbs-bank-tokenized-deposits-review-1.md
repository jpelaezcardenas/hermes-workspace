# Proposal Review: Pass 1
**Institution:** DBS Bank
**RFP Reference:** DBS-BANK-RFP-202603
**Subject:** Tokenized Deposits and Trade Finance
**Review Date:** 20 March 2026
**Reviewer:** Proposal Bank Builder (automated review)

---

## Overall Score: 87/100

## Evaluation Criteria Scores

| Category | Weight | Raw Score (0-5) | Weighted Score |
|----------|--------|-----------------|----------------|
| Strategic and use-case fit | 18% | 4.5 | 8.1 |
| Functional and lifecycle coverage | 18% | 4.5 | 8.1 |
| Technical architecture and integration | 17% | 4.3 | 7.3 |
| Security, regulatory, and control maturity | 17% | 4.5 | 7.7 |
| Delivery credibility and references | 12% | 4.5 | 5.4 |
| Operating model and support | 8% | 4.3 | 3.4 |
| Commercial model and TCO | 10% | 4.2 | 4.2 |
| **Total** | **100%** | | **44.2/50 → 88/100** |

## Strengths

### Strategic and Use-Case Fit (Score: 4.5/5)
- Executive summary directly addresses DBS Bank's stated objectives with specificity: controlled reusable operating model, MAS regulatory alignment, Project Guardian and TradeTrust connectivity
- RFP signals clearly understood: this is a production platform procurement, not a pilot
- OCBC Bank Singapore reference directly establishes MAS regulatory credibility
- The "why this is hard" section is well-constructed and demonstrates genuine understanding of institutional complexity

### Functional and Lifecycle Coverage (Score: 4.5/5)
- Full tokenized deposit lifecycle covered from design through retirement with concrete mechanisms described
- Trade finance instrument coverage via configurable token is well-explained with appropriate state diagram
- Corporate actions (yield distribution, freeze, pause) mapped to specific DALP capabilities
- XvP settlement mechanism clearly described with sequence diagram
- Minor gap: conversion workflow for convertible trade instruments not explicitly addressed. This is a gap in DALP capabilities but should be acknowledged rather than omitted.

### Technical Architecture and Integration (Score: 4.3/5)
- Four-layer architecture well documented with mermaid diagrams
- Integration architecture covers all enterprise system categories named in the RFP (TR-13)
- TradeTrust and Project Guardian integration described with appropriate specificity about what is native vs. integration-dependent
- Weakness: ISO 20022 integration described as available but without specific MAS SORA/FAST connectivity detail for Singapore domestic payment rails. This is a gap for a Singapore-specific proposal.

### Security, Regulatory, and Control Maturity (Score: 4.5/5)
- Five-layer defense-in-depth clearly articulated with diagram
- MAS, PSA, TRM Guidelines control mapping table is comprehensive and traceable
- ISO 27001 and SOC 2 Type II certifications cited
- Weakness: Smart contract audit firm names and report availability should be included; currently noted as [TO VERIFY]

### Delivery Credibility and References (Score: 4.5/5)
- All 14 references included in summary table
- OCBC Bank (Singapore, MAS-regulated) is excellent primary reference with appropriate detail
- Maybank Project Photon (XvP settlement) is directly relevant secondary reference
- RBI trade finance reference appropriate for trade finance use case
- Reference letters should be offered explicitly in the submission

### Operating Model and Support (Score: 4.3/5)
- Enterprise Support tier with 99.99% SLA and 24/7 coverage well documented
- Incident severity classification with P1 15-minute response appropriate
- Weakness: BAU operating model post-hypercare is not explicitly described. RFP Appendix M requests this specifically. A dedicated "Target Operating Model" section should be added.

### Commercial Model and TCO (Score: 4.2/5)
- Pricing transparent with exact EUR figures (EUR 25,000/month production, EUR 10,000/month development)
- Build vs. buy comparison credible
- T+0 settlement economics are a compelling value argument
- Weakness: Implementation services fee is left as [CLIENT-SPECIFIC] throughout. For a complete commercial proposal, at least indicative ranges should be provided to give DBS Bank's procurement team a complete picture of expected total spend.

---

## Issues Requiring Correction in Review 1

### Critical Issues (must fix)
1. **BAU Operating Model Missing:** RFP Appendix M specifically requests a target operating model for business-as-usual run state. No dedicated section exists covering first-line operations, daily start-of-day/end-of-day checks, reconciliation sign-off, approval queue management, and knowledge continuity. Add Section 13.10 or a new Section 14 "Target Operating Model."

2. **Smart Contract Audit Information Incomplete:** Security architecture notes "[TO VERIFY]" for smart contract audit details. For an MAS-regulated institution, this is a compliance-sensitive gap. Either confirm audit details or explicitly state what assurance is available and reference SettleMint's process for providing this under NDA.

3. **ISO 20022 Singapore Specificity:** The integration section mentions ISO 20022 but does not address MAS SORA (Singapore's RTGS system) or PayNow/FAST for SGD settlement specifically. Add a paragraph addressing Singapore domestic payment rail connectivity explicitly.

### Recommended Improvements (should fix)
4. **Scenario Responses:** RFP Appendix P requests specific scenario responses: normal day, peak day, control event. Add brief scenario narratives (1 paragraph each) to demonstrate operational thinking beyond happy-path.

5. **Compliance Fiction vs. Reality:** The section on Transfer Approval module correctly describes the pre-trade screening integration pattern. However, it should more explicitly state the timing: DALP holds the transfer in the approval queue pending external screening response. The latency implication (screening response time adds to settlement time) should be acknowledged honestly.

6. **Change Management Detail:** RFP Appendix L requests RAID categories tailored to this procurement. Appendix A provides good risk categories but does not include the full dependency log or assumption log that the RFP requests. Expand Appendix A to include assumptions log and dependency log.

7. **Implementation Services Ranges:** Commercial proposal should include at least indicative ranges for implementation services based on comparable engagements to give DBS Bank a complete picture of Year 1 total spend.

---

## Quality Rules Compliance Check

| Rule | Status | Notes |
|------|--------|-------|
| No em dashes | PASS | Document uses commas and semicolons |
| No banned words (robust, seamless, etc.) | PASS | None found |
| Third person voice | PASS | Consistent throughout |
| Present tense for capabilities | PASS | |
| Future tense for delivery phases | PASS | |
| Confidence tags on claims | PARTIAL | Some capability claims lack explicit confidence tags; most are clearly stated as native |
| No invented capabilities | PASS | All claims map to documented DALP capabilities |
| No roadmap claims without [ROADMAP] tag | PASS | TR-20 response appropriately distinguishes |
| OCBC Bank reference prominence | PASS | Used as primary Singapore reference |
| Cover page complete | PASS | All required fields present |
| 10+ mermaid diagrams | PASS | 10 diagrams across technical sections |
| 20K+ word target | PASS | Technical proposal is approximately 20,000+ words |

---

## Recommended Changes for Reviewed_1

1. Add Section "Target Operating Model (BAU)" covering:
   - First-line operations daily workflows
   - Reconciliation procedures and sign-off
   - Monitoring and alerting procedures
   - Approval queue management
   - Change management procedures
   - Knowledge transfer and continuity approach

2. Update Security Architecture section with smart contract audit language:
   - State available assurance under NDA
   - Reference SMART Protocol audit basis
   - Commit to providing audit report details during due diligence

3. Add Singapore domestic payment rail detail to Integration Architecture:
   - MAS SORA RTGS connectivity
   - PayNow/FAST integration pattern for SGD settlement
   - Explicit data residency confirmation for payment rail integration

4. Add Scenario Narratives (Appendix C):
   - Normal day scenario
   - Peak day scenario
   - Control event scenario (sanctions alert, failed settlement)

5. Update Appendix A to include:
   - Assumptions log (10+ material assumptions)
   - Dependency log (external dependencies with owner and mitigation)
   - Full RAID register with ownership assignments

6. Commercial: Add indicative implementation services range based on comparable APAC bank engagements

---

*Review 1 complete. Proceed to reviewed_1 file with corrections applied.*
