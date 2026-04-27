# Review 1: Bank of China Cross-Border Tokenized Payments Proposals

**Date:** 20 March 2026
**Reviewer:** SettleMint Bid Quality Review
**Reference:** BOC-RFP-CBTP-202603

---

## Technical Proposal Review

### Overall Score: 78/100

### Strengths

1. **China regulatory specificity is strong:** PBOC/SAFE/Cybersecurity Law/Data Security Law/PIPL coverage is accurate and institution-specific. The data residency mandate is correctly identified and addressed through on-premises deployment throughout.

2. **XvP settlement mechanics are clearly explained:** The sequence diagram for cross-currency settlement is accurate and clearly shows how atomicity eliminates settlement risk. BOC's compliance team will understand this.

3. **mBridge compatibility is addressed:** The two-stage mBridge integration roadmap is well-structured. Stage 1 (standalone) vs. Stage 2 (mBridge) distinction is commercially honest and technically accurate.

4. **On-premises deployment architecture is detailed:** The infrastructure specification tables, DR topology, and key ceremony procedure are at the right depth for BOC's infrastructure and security teams.

5. **Compliance matrix is thorough:** The regulatory requirements matrix at Section 15 maps each requirement to a specific DALP capability with confidence tags.

### Issues to Fix

**Issue 1 (Major): Word count at 20,197 is at minimum, sections 3 (About SettleMint) and 4 (About DALP) need expansion.**
Target range: 2,200-2,800 and 3,000-3,800 respectively. Current coverage is thin compared to target word counts. Add: SettleMint's founding story, regulatory engagement history, team depth; DALP's Feeds System and its PBOC FX rate integration more deeply.

**Issue 2 (Major): Customer References section lacks depth.**
DBS, SAMA, CBB references are each 2-3 paragraphs. Target is 2,200-3,000 words across all references. Add quantified outcomes where possible (DBS: volume, latency). Add Euroclear and Clearstream with specific settlement stats.

**Issue 3 (Minor): Mermaid diagram count is 7, target is 10+.**
Missing: data flow diagram (distinct from integration points), security model diagram, full deployment architecture diagram. Add 3 more mermaid diagrams in Sections 8 and 9.

**Issue 4 (Minor): OSCCA algorithm section says "evaluation in progress", needs more specificity.**
Either commit to SM2/SM4 integration in the scope (with caveat about PBOC confirmation), or explain the evaluation criteria. "Evaluation in progress" reads as vague.

**Issue 5 (Minor): Risk Management section (Section 14) is thin at 800 words.**
Target is 800-1,200. Add: smart contract upgrade risk, mBridge specification change risk, and talent/key-person dependency risk.

---

## Commercial Proposal Review

### Overall Score: 75/100

### Strengths

1. **ROI framing is compelling:** The TCO analysis with 3-year projections, payback period calculation, and corridor-by-corridor correspondent fee analysis is specific and credible.

2. **Pricing is accurate and clear:** EUR 420,000/year combined, milestone payment schedule, and 3-year price lock are all correctly stated.

3. **Build vs. buy comparison is well-argued:** The EUR 50-100M in-house build comparison vs. EUR 420,000/year DALP licensing makes the commercial case effectively.

4. **Exit provisions are well-covered:** Source code escrow, data export, and token contract ownership on termination are important for BOC's risk team and are well-explained.

### Issues to Fix

**Issue 1 (Major): Investment Rationale section needs more depth.**
Current target is 2,200-3,000 words; the section with appendices reaches roughly 2,500 but needs better flow and the nostro pre-funding table should be in the main body, not appendix.

**Issue 2 (Major): Commercial Terms section (Section 8) is thin.**
Governing law and dispute resolution are marked "to be agreed", these should propose specific positions (Singapore law, ICC arbitration in Singapore). Also add: force majeure, change of control provisions, and assignment rights.

**Issue 3 (Minor): Reference Clients section (Section 10) needs quantified outcomes.**
Add specific outcome metrics for each reference (DBS: transaction count, latency improvement; SAMA: data residency confirmation; Clearstream: settlement failure rate).

**Issue 4 (Minor): Support and SLA section should specify what constitutes a "maintenance window" and the maximum hours per month allowed for planned downtime.**

---

## Action Items for Reviewed Version 1

1. Expand Technical Sections 3 and 4 by approximately 2,000 words each
2. Add 3 more mermaid diagrams (security model, data flow, deployment topology)
3. Expand Customer References to 2,500+ words with quantified outcomes
4. Strengthen OSCCA algorithm commitment language
5. Move nostro pre-funding table to commercial main body (Investment Rationale)
6. Fix Commercial Terms: propose specific governing law and dispute resolution
7. Add quantified outcomes to commercial Reference Clients section
8. Add maintenance window definition to SLA section
