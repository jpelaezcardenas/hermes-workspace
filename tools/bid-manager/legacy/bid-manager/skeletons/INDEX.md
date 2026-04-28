# Skeleton Index

> **Last updated:** 2026-03-19

| ID | Codename | Type | Variant | Version | Target length | Client focus | File |
|---|---|---|---|---|---|---|---|
| BM-TS-00 | COLOSSUS | Technical | Maximum | v1.0 | 70-120 pages / 25k-45k words | Regulated-bank mega-pack: proposal narrative, annexes, evidence index, requirement traceability, operating model, and proof-room structure | 1_technical/markdown/technical-colossus.md |
| BM-TS-01 | TITAN | Technical | Full | v1.0 | 80-100 pages | Deep technical evaluators; architecture, security, operations, delivery | 1_technical/markdown/technical-full.md |
| BM-TS-02 | FALCON | Technical | Medium | v1.0 | 40-60 pages | Balanced technical/commercial review with moderate depth | 1_technical/markdown/technical-medium.md |
| BM-TS-03 | SENTINEL | Technical | Compact | v1.0 | 20-30 pages | Fast technical review; concise but credible | 1_technical/markdown/technical-compact.md |
| BM-CS-01 | ATLAS | Commercial | Full | v1.0 | 60-80 pages | Procurement, sponsors, finance, legal, TCO-heavy review | 2_commercial/markdown/commercial-full.md |
| BM-CS-02 | SPARK | Commercial | Medium | v1.0 | 30-45 pages | Commercial decision-makers needing structured recommendation | 2_commercial/markdown/commercial-medium.md |
| BM-CS-03 | CROWN | Commercial | Compact | v1.0 | 15-25 pages | Executive/procurement fast review | 2_commercial/markdown/commercial-compact.md |
| BM-RS-01 | BEACON | RFI | Full | v1.0 | 80-120 pages | Formal RFI teams across business, technical, security, compliance | 3_rfi/markdown/rfi-full.md |
| BM-RS-02 | ARROW | RFI | Medium | v1.0 | 40-60 pages | Condensed but evaluator-friendly RFI response | 3_rfi/markdown/rfi-medium.md |
| BM-RS-03 | SHIELD | RFI | Compact | v1.0 | 20-30 pages | Executive-friendly RFI with essentials only | 3_rfi/markdown/rfi-compact.md |
| BM-RS-04 | PRISM | Joint Response | Full | v1.0 | 80-120 pages | Large consortium bids; explicit scope split and governance | 4_joint-response/markdown/joint-response-full.md |
| BM-QS-01 | MATRIX | Joint Response | Medium | v1.0 | 40-60 pages | Consortium bids with condensed but explicit ownership | 4_joint-response/markdown/joint-response-medium.md |
| BM-QS-02 | VAULT | Joint Response | Compact | v1.0 | 20-30 pages | Compact consortium response with full responsibility clarity | 4_joint-response/markdown/joint-response-compact.md |
| BM-QS-04 | LENS | Questionnaire | Standard | v1.0 | Excel-primary + markdown reference | Security/procurement questionnaires requiring row-level traceability | 5_questionnaire/markdown/questionnaire-response.md |
| BM-GS-01 | ECHO | Generic | Full | v1.0 | 50-70 pages | Comprehensive proposals that don't fit technical/commercial/RFI categories | 7_generic/markdown/generic-full.md |
| BM-GS-02 | WAVE | Generic | Medium | v1.0 | 25-40 pages | Balanced proposals for non-standard request types | 7_generic/markdown/generic-medium.md |
| BM-GS-03 | DRIFT | Generic | Compact | v1.0 | 12-20 pages | Concise catch-all for requests outside existing categories | 7_generic/markdown/generic-compact.md |

## Visual Element Policy

> **Directive (Gyan, 2026-04-05):** All proposal skeletons now require DALP screenshot minimums by variant, inline screenshot captions, screenshot distribution across multiple sections, and screenshot-category variety. Use `../shared/brand/dalp-screenshots/CATALOG.md` and `setup/screenshot-registry.md` before drafting. `scripts/validate_proposal.py` now checks screenshot count, caption coverage, section spread, and category variety. See the Visual Element Policy block in each skeleton for the section-to-screenshot map.

## Notes

- These are blueprint skeletons, not finished proposal content.
- The visible version block is embedded in each skeleton for copy/paste traceability.
- The repository currently contains 14 markdown skeleton files under the technical/commercial/rfi/joint-response/questionnaire families. The codename map above preserves the requested ID scheme across the files that exist today.
- `BM-QS-03 (GUARDIAN)` is reserved but not mapped because there is no fourth standalone questionnaire-family markdown skeleton in the current tree.
