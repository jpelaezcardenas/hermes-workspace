# Proposal Review — Loop 1
**Draft:** loop1-draft.md
**RFI:** NSRA-RFI-2026-047 (CSD Digital Twin, Mock MR-3)
**Reviewer:** Proposal Checker
**Review Date:** 27 March 2026

---

## Dimension Scores

### 1. Completeness — 9/10

All 26 numbered questions across Sections 1-8 receive substantive responses. The instrument coverage in 1.1 addresses all four asset classes with feature-level specificity. Question 1.3 (short-dated overnight instruments) is answered within the money market paragraph using the CREATE2 deployment point and batch operations, which is adequate if slightly compressed. Section 5.4 (TARGET2) is honest about the integration scope. Section 8.2 (references) defers to the formal tender process, which is defensible but thin — evaluators who want reference verification before the tender phase will find this unsatisfying.

One mark deducted: the Q1.3 answer on treasury bill overnight auction lifecycle could be cleaner as a standalone response rather than embedded mid-paragraph in the money market section.

### 2. Honesty/Accuracy — 9/10

This is the draft's strongest dimension. Gaps are disclosed with specific, named language throughout:

- Inflation-linked bonds: "This is a capability boundary that warrants direct acknowledgement" — sets up the limitation before explaining what DALP does provide.
- FIX protocol: "represents a genuine gap in DALP's native capability" — unambiguous.
- Reconciliation: "DALP provides the building blocks for reconciliation rather than a pre-built reconciliation product" — precise and fair.
- Bondholder consent solicitation: "The honest framing is" (see writing quality note below on this phrase) followed by a clear delineation between native ERC-5805 capability and the workflow layer that requires additional build.
- CSDR reporting: Clear on the data/format split.
- Dutch auction: Captured in the summary table as "Not native" with appropriate note.

No overclaiming is detected anywhere. The EVM-only architecture constraint is correctly implied throughout without requiring explicit statement for this use case (all discussion stays EVM-native). One mark deducted only because Section 8.1 does not name a single comparable deployment — "Europe, the Gulf Cooperation Council, and Southeast Asia" is vague enough that a sceptical evaluator may score it as assertion rather than evidence.

### 3. Writing Quality — 7/10

The draft is predominantly flowing prose and avoids bullet dumps, which is the primary requirement. Paragraphs have clear topic sentences and develop a single idea. Tables are used appropriately for structured comparisons rather than as prose substitutes.

Two specific issues reduce the score:

**AI-tell phrases detected:**
- "The honest framing is:" (Section 4, bondholder consent) — this phrase reads as an AI construction. Replace with a direct declarative sentence leading with the substance.
- "Three aspects of this response deserve emphasis upfront" (Executive Summary) — functional but slightly formulaic; a more specific, content-led opener would be stronger.

**Em dashes:** None detected. Clean.

**Manual heading numbers:** Not present in headings themselves. Section headers mirror RFI numbering ("## Section 1: Instrument Coverage") which is appropriate navigation, not a violation.

**Code blocks:** Mermaid only. No raw code blocks appear. Clean.

**Density/rhythm issue:** Several paragraphs in Sections 2 and 3 run long without structural relief. The reconciliation paragraph in Section 2 and the ISO 20022 explanation in Section 3 each make three or four distinct points that would benefit from a sentence-break structure to aid reading pace. Not a rule violation, but prose rhythm weakens in those passages.

### 4. Persuasion/Argument — 7/10

The Executive Summary frames the challenge before the solution, which is the correct approach, and flags gaps proactively rather than burying them — this is a trust-building move that works well for a CSD evaluator who will find the gaps anyway.

Sections 5 (Settlement) and 7 (Infrastructure) carry the strongest persuasive writing. Section 5 explicitly frames the business value: "eliminating the settlement risk that drives counterparty risk in traditional T+2 settlement cycles" is a genuine benefits statement. Section 7 correctly distinguishes deterministic finality from probabilistic finality and frames it as "a critical advantage over probabilistic finality chains for regulated settlement infrastructure."

Weaker areas:

**Section 3 (Connectivity)** reads more as technical description than argument. After describing ISO 20022 support as a translation layer, the draft correctly explains why this is standard practice — but it never completes the benefits case: a participant using NSRA's ISO 20022 gateway would experience no change in their messaging workflow, which is a genuine operational benefit that is not stated.

**Section 4 (Governance)** opens well but the dual-record section (4.3) is largely defensive rather than constructive. The paragraph correctly describes DALP's position but never makes the case for why NSRA's approach — enforcing legal status through participant access agreements — is actually the right design. The section acknowledges the limitation without landing an argument.

**Section 8 (Credentials)** is the weakest section from a persuasion perspective. It consists of four sentences. For a CSD operator making a significant infrastructure investment, two paragraphs noting jurisdiction and asset class count without naming a single client or citing a CSDR-regulated deployment will register as thin. This section needs a stronger deployment narrative, even if specific client names are withheld.

### 5. Structure/Format — 9/10

The structure is well-executed across all standard dimensions.

**Heading hierarchy:** Correct. H2 for section headers, H3 for subsections within sections. Hierarchy is consistent throughout.

**Tables:** Used in two places — the instrument feature matrix in Section 1 and the summary capability table at the end. Both are appropriate and correctly formatted. The summary table is comprehensive, covers every major requirement area, uses a consistent three-column format (Requirement, Capability, Notes), and distinguishes native capability from integration-dependent and gap status cleanly. This is one of the draft's notable strengths.

**Diagrams:** Six Mermaid diagrams are present, each placed inline after the prose they illustrate:
- Figure 1 (instrument lifecycle) — clear, directly relevant to Section 1.
- Figure 2 (hybrid record sync) — the most complex diagram; accurately shows the three-layer architecture and correctly places the integration layer as NSRA's responsibility.
- Figure 3 (participant connectivity) — shows all three connectivity paths; FIX bridge is correctly labelled as "middleware."
- Figure 4 (DvP settlement sequence) — the sequence diagram is technically accurate and shows the revert path, which is the key safety property.
- Figure 5 (network topology) — shows NFSA node participation correctly.
- Figure 6 (three-DC deployment) — supports the disaster recovery discussion.

All diagrams are useful and correctly positioned.

**Screenshots absent:** The draft includes no DALP platform screenshots. For a response of this scope responding to a production-readiness evaluation, the absence of screenshots is a notable gap. Evaluators from a regulated CSD will want evidence that the platform is real and in use, not just described — screenshots of the asset designer, compliance module, and monitoring console would serve this purpose directly.

One mark deducted for the missing screenshots.

---

## Top 3 Improvements Required

### 1. Strengthen Section 8 with deployment evidence

The credentials section is the weakest in the document and represents a missed opportunity. A CSD evaluator assessing finalists will weight implementation track record heavily. The current two paragraphs provide no usable evidence: no jurisdiction, no asset class count, no deployment year, no regulatory regime. Add a brief deployment narrative (sanitised if necessary): number of live deployments, regulatory contexts in which they operate, asset classes currently in production, and the scale of the largest live deployment. If specific clients cannot be named, describe the deployment profile — "a regulated securities exchange operating under [X] regime, managing [Y] asset classes in production since [year]" — to give evaluators something concrete to assess.

### 2. Embed DALP screenshots as visual evidence in key sections

At minimum, two screenshots should be included for an RFI response of this length and complexity. Recommended placements: (a) the compliance module or asset designer immediately following the instrument coverage discussion in Section 1, to show that the feature configuration described is real and configurable in the platform; (b) the monitoring dashboard or XvP settlement interface in Section 5 or Section 7, to show production-ready settlement and audit capability. Screenshots serve as primary evidence for evaluators who cannot yet run a proof of concept — they close the gap between description and demonstration.

### 3. Remove AI-tell phrases and complete the benefits case in Section 3

Two targeted prose edits improve the document materially. First, replace "The honest framing is:" with a direct declarative lead ("DALP provides the cryptographic vote recording substrate...") — the subsequent content is accurate and persuasive, it just needs a stronger entry. Second, complete the connectivity argument in Section 3: after explaining the ISO 20022 translation layer, add one sentence stating the participant experience benefit — that participants using existing SWIFT and ISO 20022 messaging infrastructure will require no changes to their messaging workflows during the transition period. This converts the ISO 20022 section from technical explanation to a business case for minimal disruption.

---

## Summary

| Dimension | Score | Notes |
|-----------|-------|-------|
| Completeness | 9/10 | All 26 questions answered; Q1.3 and 8.2 slightly thin |
| Honesty/Accuracy | 9/10 | Gaps named precisely; credentials section too vague |
| Writing Quality | 7/10 | Mostly good prose; two AI-tell phrases; some dense passages |
| Persuasion/Argument | 7/10 | Strong in Sections 5 and 7; weak in Sections 3, 4, and 8 |
| Structure/Format | 9/10 | Excellent diagrams and tables; screenshots absent |

TOTAL SCORE: 41/50
