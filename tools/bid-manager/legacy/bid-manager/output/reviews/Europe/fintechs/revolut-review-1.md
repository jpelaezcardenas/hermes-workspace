# Revolut Proposal Review: Pass 1
## Reviewer: Proposal Bank Builder | Date: 2026-03-19

---

## Score Summary: Pass 1

| Dimension | Score (1-5) | Notes |
|-----------|-------------|-------|
| 1. Executive Readability | 5 | Opens with Revolut's specific challenge (industrializing control layer); value prop clear; FCA/MiCA dual framing strong |
| 2. Technical Credibility | 4 | P50/P99 provided; corporate action batch timing for 500K; missing hardware methodology for benchmark |
| 3. Requirements Coverage | 4 | All BR/TR addressed; compliance matrix present; FCA regulatory references need specificity |
| 4. Honesty & Transparency | 4 | MiFID II constraint correctly noted as "supported with controls"; AML "supported with partner" -- needs detail |
| 5. Document Flow | 4 | Clear arc; Section 7 opens cleanly after Section 6; missing bridge between architecture explanation and security |
| 6. Writing Quality | 4 | Active voice throughout; no banned phrases detected; technical terms introduced; "production-grade" not present |
| 7. Client-Centricity | 4 | Revolut's "super-app" terminology used; FCA/MiCA dual-entity framing; Barclays reference well-placed |
| 8. Visual Communication | 5 | 10 mermaid diagrams; DvP sequence, multi-jurisdiction flow, stablecoin architecture all present |
| 9. IP & Confidentiality | 4 | No IP issues; "blockchain event indexing" used correctly; one borderline: "SMART Protocol" used as proper noun -- verify |
| 10. Competitive Differentiation | 4 | Consumer-scale architecture differentiation clear; per-entity compliance differentiation strong |
| **TOTAL** | **42/50** | |

---

## Pass 1 Findings

### TECH-01: Benchmark methodology missing

Performance claims (P99 4.2 seconds) lack test conditions. Add hardware specification and load profile.

**Fix:** Add methodology note: "Performance benchmarks: 4-node Besu IBFT 2.0 cluster (AWS c6g.xlarge, eu-central-1), 500 concurrent settlement requests, median 50-token DvP transactions."

### FCA-01: FCA regulatory citations need specificity

The compliance matrix references "FCA COBS investor categorization" and "FCA SYSC 8.1" but could be more specific for an FCA-supervised entity.

**Fix:** Add FCA reference: "FCA COBS 3.5 (categorization), FCA SYSC 8.1.1R (outsourcing), PS22/10 operational resilience, UK Digital Securities Sandbox (DSS) alignment where applicable."

### HONEST-01: AML/CFT "Supported with partner" needs operational detail

Same pattern as N26: AML claim integration needs specificity about what happens if Revolut's AML provider is not OIDC-compatible.

**Fix:** Add: "If Revolut's AML screening provider does not support OpenID Connect claim issuance, SettleMint provides a claim adapter reference implementation (2-3 days integration effort)."

### IP-02: "SMART Protocol" as proper noun

"SMART Protocol" appears as a product name. Verify against IP checklist. If this is the public-facing name for DALP's token standard, it is acceptable. If it is an internal code name, replace with "ERC-3643 regulated token standard."

**Fix:** Confirm SMART Protocol is the external-facing product name; if not, replace with "ERC-3643 regulated token infrastructure."

---

## Passing Notes

- Dual-entity compliance framing (Revolut UK vs Revolut EU) is a strong differentiator
- DvP settlement sequence diagram is clear and Revolut-specific
- Barclays reference for FCA context is well-placed
- Consumer-scale architecture (500 pods) is credible for Revolut's 45M customer base
- No "production-grade" overuse detected

---

## Pass 1 Assessment

Score: 42/50. Strong draft with targeted fixes needed on benchmark methodology and regulatory citation specificity.

Pass 1 score: 42/50
