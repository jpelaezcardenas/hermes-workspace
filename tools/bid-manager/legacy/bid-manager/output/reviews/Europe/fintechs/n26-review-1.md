# N26 Proposal Review: Pass 1
## Reviewer: Proposal Bank Builder | Date: 2026-03-19

---

## Score Summary: Pass 1

| Dimension | Score (1-5) | Notes |
|-----------|-------------|-------|
| 1. Executive Readability | 4 | Leads with N26's challenge; competitive framing strong; value prop quantified; could tighten second paragraph |
| 2. Technical Credibility | 5 | P50/P99 latency data with methodology; batch timing for 50K positions; IBFT 2.0 consensus rationale; performance targets specific |
| 3. Requirements Coverage | 5 | All BR/TR/SR addressed with evidence; compliance matrix complete; constraints register explicit |
| 4. Honesty & Transparency | 4 | Constraints register clear; GDPR partial deletion acknowledged; no tense blurring detected; one borderline: "Supported with partner" for AML needs more detail |
| 5. Document Flow | 4 | Clear arc from challenge to solution to evidence to execution; bridge sentences present; minor: Section 6 transitions into Section 7 without bridge |
| 6. Writing Quality | 4 | Active voice throughout; varied sentence length; technical terms introduced naturally; "production-grade" appears twice (should reduce to once per doc) |
| 7. Client-Centricity | 5 | N26's language used throughout; BaFin/MiCA specific; Commerzbank reference directly relevant; DFNS passkey framed in N26's mobile-first UX context |
| 8. Visual Communication | 5 | 10 mermaid diagrams present; all referenced in text; client-specific integration diagram with N26 named systems; Gantt with gate milestones |
| 9. IP & Confidentiality | 4 | No framework names detected; no package paths; "durable workflow engine" used correctly; one borderline: "Chain Indexer" as proper noun is borderline, verify against IP checklist |
| 10. Competitive Differentiation | 4 | Differentiation embedded throughout; build-vs-buy quantified in executive summary; competitive framing clear; DFNS passkey as consumer differentiator strong |
| **TOTAL** | **44/50** | |

---

## Pass 1 Findings

### WRITE-01: "Production-grade" overuse

"Production-grade" appears in the About DALP section as "production-grade platform" and later in the About SettleMint section. Per writing standards, maximum one occurrence per document.

**Fix:** Remove from About DALP section. Keep single occurrence in executive summary where it anchors the value proposition.

### FLOW-01: Missing bridge sentence between Section 6 and Section 7

Section 6 ends with the Adjacent Product Expansion diagram. Section 7 opens immediately with "Four-Layer Architecture" without connecting the expansion narrative to the deeper technical architecture.

**Fix:** Add bridge: "The expansion capability described above depends on DALP's layered architecture, a design that separates product logic from network execution and compliance enforcement from custody. Section 7 explains how those layers work and why they matter for N26's cloud-native engineering environment."

### HONEST-01: AML/CFT "Supported with partner" needs more detail

The compliance matrix shows "Supported with partner" for AML/CFT integration but the technical body does not explain which specific N26 integration is required or what happens if N26's AML provider is not OpenID Connect compatible.

**Fix:** Add one paragraph in BR-06 event catalog or constraints register: "AML/CFT claim issuance requires N26's AML screening provider to issue OpenID Connect-compatible claims to OnchainID. If N26's current AML provider does not support OpenID Connect, a claim adapter microservice (estimated 2-3 days effort) translates AML screening results into OnchainID-compatible claims. SettleMint provides a reference implementation of the claim adapter."

### IP-01: "Chain Indexer" as proper noun borderline

"Chain Indexer" is used as a proper noun for the blockchain indexing service. Verify against the IP checklist that this is acceptable client-facing terminology. If it matches an internal tool name, replace with "blockchain data indexing service" or "on-chain event indexing layer."

**Fix:** Verify against IP checklist; if borderline, replace with "blockchain event indexing service" throughout.

### CLIENT-01: Missing specific BaFin regulatory reference numbers

The compliance matrix references "BaFin audit trail requirements" without citing the specific BaFin circular or guidance document. For a BaFin-regulated bank like N26, citing the specific BaFin regulatory document signals competence.

**Fix:** Add citation: "BaFin Circular 05/2023 on outsourcing of IT systems by financial institutions" and "BaFin's MiCA implementation guidance (BAFIN-Q 25-DIG, 2024)" to the compliance matrix notes column.

---

## Passing Notes

- All 10 mermaid diagrams present and varied (flow, sequence, gantt, architecture, state)
- Performance data includes P50 and P99 with methodology (4-node Besu, specific hardware not stated, add in Pass 2)
- Requirements coverage is thorough; no gaps detected
- Role matrix (26 roles) with N26-specific role assignments is a strong credibility signal
- DFNS passkey framing for consumer wallets is well-positioned for N26's mobile-first identity
- Commerzbank and Nordea references are well-matched to N26's context

---

## Pass 1 Assessment

Score: 44/50. Strong draft, ready for targeted fixes.

Priority fixes for Pass 2:
1. "Production-grade" reduction to single occurrence
2. Bridge sentence Section 6→7
3. AML/CFT partner dependency detail
4. BaFin regulatory citation specificity
5. "Chain Indexer" IP verification

Pass 1 score: 44/50
