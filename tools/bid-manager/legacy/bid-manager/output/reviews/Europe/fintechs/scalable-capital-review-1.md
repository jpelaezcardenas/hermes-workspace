# Scalable Capital Proposal Review: Pass 1
## Reviewer: Proposal Bank Builder | Date: 2026-03-19

---

## Score Summary: Pass 1

| Dimension | Score (1-5) | Notes |
|-----------|-------------|-------|
| 1. Executive Readability | 5 | Opens with Scalable Capital's automation philosophy; value prop specific (EUR 840K Year 1); T+0 framing strong |
| 2. Technical Credibility | 4 | P50/P99 present; NAV feed architecture described; distribution timing specific; hardware methodology missing |
| 3. Requirements Coverage | 4 | All BR/TR addressed; KAGB regulatory citation needs specific section references |
| 4. Honesty & Transparency | 4 | NAV feed constraint (Trade Republic's admin provides NAV) correctly documented; AML detail needs expansion |
| 5. Document Flow | 4 | Logical arc; NAV feed architecture well-placed; minor: Section 6 to 7 could use bridge sentence |
| 6. Writing Quality | 4 | Active voice; varied sentences; no banned phrases; technical terms introduced |
| 7. Client-Centricity | 5 | "Lean" philosophy mirrored throughout; automation-first framing; BNP Paribas reference excellent match |
| 8. Visual Communication | 5 | 10 mermaid diagrams; NAV feed flow, subscription sequence, distribution sequence, deployment architecture |
| 9. IP & Confidentiality | 5 | No IP issues detected; "blockchain event indexing" used; SMART Protocol correctly labeled |
| 10. Competitive Differentiation | 4 | NAV admin separation as differentiator clear; automation-first framing embedded; build vs buy strong |
| **TOTAL** | **44/50** | |

---

## Pass 1 Findings

### TECH-02: Hardware methodology missing

Performance targets (P99 4.2s settlement) need hardware specification.

**Fix:** Add: "Performance benchmarks: 4-node Besu IBFT 2.0 (AWS c6g.xlarge, eu-central-1), 200 concurrent subscription requests."

### KAGB-01: KAGB citation specificity

"BaFin KAGB fund administration (§ 87)" is a start; add: "KAGB § 87 (record-keeping for fund administration), KAGB § 70 (documentation obligations), and BaFin Auslegungs- und Anwendungshinweise for KVGs (2023)."

### HONEST-02: AML claim adapter detail

Same gap as N26 and Revolut: AML partner integration needs claim adapter documentation.

**Fix:** Add: "If Scalable Capital's AML provider does not natively support OpenID Connect claim issuance, SettleMint provides a reference claim adapter implementation (2-3 days integration effort)."

### FLOW-02: Bridge sentence Section 6 to 7

Section 6 ends with the distribution sequence diagram. Section 7 opens immediately with "Four-Layer Architecture" without connection.

**Fix:** Add bridge: "The distribution automation described above sits within DALP's layered architecture -- an architecture that separates NAV management from token execution and compliance from custody, enabling Scalable Capital to keep its existing fund administrator relationships while adding tokenized product capabilities."

---

## Pass 1 Assessment

Score: 44/50. Strong draft. Targeted fixes on benchmark methodology, KAGB specificity, and bridge sentence.

Pass 1 score: 44/50
