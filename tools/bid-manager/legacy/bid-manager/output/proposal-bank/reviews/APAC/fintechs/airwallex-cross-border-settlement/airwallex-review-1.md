# Review Pass 1: Airwallex Cross-Border Tokenized Settlement

**Review Date:** 21 March 2026
**Reviewer:** Proposal Bank Builder (automated review)
**Reference:** AIRWALLEX-RFP-202603-TP-001 / CP-001

---

## Scoring Rubric Assessment (Pass 1)

| Dimension | Score (1-5) | Notes |
|---|---|---|
| 1. Executive Readability | 4 | Strong opening, client-problem-first. Minor: executive summary could be tighter (slightly long) |
| 2. Technical Credibility | 4 | Good architecture specificity; SMART Protocol, XvP, Restate named with function. Missing: benchmark methodology for settlement latency |
| 3. Requirements Coverage | 5 | All 15 TR requirements addressed with compliance matrix. Every requirement has direct DALP response |
| 4. Compliance and Regulatory Fit | 4 | MAS/PSA/TRM alignment section is strong. Could add: explicit PSA licence type implications |
| 5. Commercial Clarity | 4 | Pricing clear, locked rates used correctly, taxes excluded, annual upfront stated. Implementation [CLIENT-SPECIFIC] correctly applied |
| 6. Writing Quality | 4 | Active voice, no banned phrases found, no em dashes, no AI-tell markers. Minor: one section slightly bullet-heavy |
| 7. Visual Quality | 4 | 8 mermaid diagrams present; all major sections have at least one. Diagram 5 render failed (noted in DOCX conversion) |
| 8. Differentiation | 3 | Platform differentiation from custom build articulated; competitor differentiation absent (acceptable for technical proposal) |
| 9. Risk Management | 4 | DR metrics, failover architecture, gate criteria all present |
| 10. Delivery Confidence | 4 | 19-week timeline, RACI structure, named deliverables per phase |

**Pass 1 Total Score: 40/50**

---

## Issues Identified: Pass 1

### Issue 1 (Medium): Settlement latency benchmark lacks methodology
**Section:** Deployment / XvP Settlement
**Finding:** The XvP atomic settlement capability is described well but no settlement latency figure is provided. Airwallex's RFP asks specifically about production realism. A benchmark with test conditions (node count, hardware, network, transaction complexity) would materially strengthen credibility.
**Remediation:** Add a latency benchmark section to the XvP capability section. Include: test profile, node configuration, P50/P99 latency, network conditions. Use verified figures from existing production deployments.

### Issue 2 (Medium): TOC depth: some sections not present in commercial proposal
**Section:** Commercial proposal structure
**Finding:** The commercial proposal TOC lists 10 sections but the TCO section does not include a Year 1 vs Year 2+ narrative callout. The table shows it, but no prose highlights the step-change reduction in cost from Year 1 (implementation-heavy) to Year 2+ (license only).
**Remediation:** Add a paragraph in TCO section explicitly calling out the Year 1 vs Year 2+ cost profile shift and its commercial significance.

### Issue 3 (Minor): Mermaid diagram 5 render failure
**Section:** Technical proposal, compliance enforcement sequence diagram
**Finding:** DOCX converter flagged render failure for diagram 5 after 3 attempts.
**Remediation:** Simplify diagram 5 syntax. Remove any unsupported Mermaid features.

### Issue 4 (Minor): Reference deployment section lacks quantified outcomes
**Section:** Reference Deployments (Section 13)
**Finding:** The reference table describes institution types but does not include outcome metrics. Evaluators who have read the scoring rubric expect: scale metrics, volumes, and deployment context.
**Remediation:** Add outcome rows to reference deployment table (e.g., "EUR Xbn in assets processed, X settlement instructions/day, deployed in X weeks").

---

## Pass 1 Verdict

Both proposals are substantively strong. Issues 1 and 4 are the priority fixes for Pass 2. The compliance requirements matrix is complete and accurate. The commercial pricing is correctly stated. Proceed to reviewed_1 with fixes applied.
