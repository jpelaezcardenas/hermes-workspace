# Klarna Proposal Review: Pass 1
## Reviewer: Proposal Bank Builder | Date: 2026-03-19

---

## Score Summary

| Dimension | Score (1-5) | Notes |
|-----------|-------------|-------|
| 1. Executive Readability | 5 | Opens on receivables/funding problem, quantified case, clean arc |
| 2. Technical Credibility | 4 | Credit lifecycle detailed, architecture clear, add P99 latency |
| 3. Requirements Coverage | 5 | All BR/TR requirements addressed, compliance matrix complete |
| 4. Honesty & Transparency | 4 | Constraints clear, Nordic regulatory context acknowledged |
| 5. Document Flow | 4 | Good logical flow, minor bridging gaps |
| 6. Writing Quality | 4 | Active voice, sentence variety, minor repetition |
| 7. Client-Centricity | 4 | Klarna-specific use cases, Nordea reference well-placed |
| 8. Visual Communication | 4 | 7+ mermaid diagrams, architecture and flow diagrams relevant |
| 9. IP & Confidentiality | 2 | **BLOCKED: "Restate" appears 3 times (lines 175, 397, 669), capped at 2** |
| 10. Competitive Differentiation | 4 | Build-vs-buy strong, yield automation as differentiator clear |
| **TOTAL** | **40/50** | |

---

## Critical Issues (Must Fix Before Pass 2)

### IP-01: CRITICAL: Internal Tool Name Exposed (Dimension 9 blocked at 2)

**Three occurrences of "Restate" in the technical draft:**

1. Line 175 (BR-02 section):
   > "Each transition is durable through the Restate execution engine, persisted to PostgreSQL..."

2. Line 397 (architecture diagram node):
   > `restate_kl["Restate: Durable Origination,\nDistribution, Maturity Workflows"]`

3. Line 669 (compliance matrix):
   > `| BR-02 | Supported | Credit instrument state machine, Restate durability |`

**Fix:** Replace all three with "durable workflow engine" terminology.

---

## Improvements (Should Fix)

### TECH-01: Add P99 Latency for Bond Origination and Yield Distribution

The proposal gives settlement finality context (Commerzbank reference, under 10 seconds) but does not provide P99 origination API response time or yield distribution batch timing for Klarna's expected volumes. Add benchmarks for both.

### TECH-02: Clarify Batch Origination Scale

The proposal mentions "10,000+ receivables tokens" but does not give timing for batch portfolio origination. Klarna processes hundreds of millions of BNPL transactions, the evaluator will want to know how long it takes to tokenize a portfolio batch.

### CLIENT-01: Finansinspektionen Regulatory Matrix Specificity

The FCA matrix equivalent for Klarna should reference specific Finansinspektionen FFFS notices for consumer credit reporting and capital adequacy. Currently references "Finansinspektionen requirements" generically.

### FLOW-01: Security-to-Implementation Bridge Missing

Same pattern as Checkout.com: Section 8 (Security) ends, Section 9 (Implementation) begins without transition.

### WRITE-01: "Production-grade" Repetition

Appears in About SettleMint, About DALP, and commercial executive summary. Same fix as Checkout.com: vary with "institutional-grade," specific capability descriptions.

---

## Passing Notes

- Klarna-specific framing around BNPL receivables and capital markets access is strong
- Nordea reference is well-chosen for Nordic regulatory alignment context
- Yield distribution automation section is compelling and specific
- The credit lifecycle state machine (Originated through Retired) is more detailed than competitors typically provide
- Commercial build-vs-buy numbers (intermediation cost reduction 20-40 bps on EUR 500M) are concrete and defensible
- The "phased rollout from Swedish to EEA to global" jurisdictional control narrative is client-specific and good

---

## Actions for Reviewed_1

1. **Replace all 3 Restate occurrences**: CRITICAL
2. Add P99 latency for origination API and yield distribution batch
3. Expand Finansinspektionen compliance section with specific regulation references
4. Add bridging sentence between Security and Implementation sections
5. Reduce "production-grade" repetition

---

*Pass 1 complete. Estimated Pass 2 score: 45-47/50*
