# Common Defect Patterns in SettleMint Proposals

This file documents frequently observed issues across proposals. Use it as an early detection guide during reviews.

---

## Pattern 1: DALP Reduced to "Blockchain Platform"

**What happens**: The proposal describes DALP as a generic blockchain platform rather than an institutional-grade digital asset lifecycle platform with governance, compliance, and operational controls.

**Why it matters**: This mispositions the product and undermines the core "Complexity of Doing It Right" differentiator. Evaluators at regulated institutions need to see governance maturity, not blockchain enthusiasm.

**Detection**: Check whether the executive summary and opening sections emphasize lifecycle governance and institutional controls, or whether they lead with blockchain/DLT technology.

**Fix**: Reframe around the lifecycle management, compliance, identity, and governance capabilities. Blockchain is the infrastructure layer, not the value proposition.

---

## Pattern 2: Leadership Title Errors

**What happens**: Matthew Van Niekerk is referred to as CEO, or Adam Popat's title is wrong, or titles are inconsistent across sections.

**Correct titles**:
- Matthew Van Niekerk = Co-founder and President
- Adam Popat = CEO

**Detection**: Search the document for all mentions of leadership names and verify titles.

**Fix**: Correct all instances. This is a factual accuracy issue, not a style issue.

---

## Pattern 3: Overclaiming Native Capabilities

**What happens**: Integration-dependent capabilities are presented as native platform features. Configuration-dependent features are presented as out-of-the-box. Roadmap items are described in present tense.

**Common instances**:
- Claiming native SWIFT/ISO 20022 support
- Claiming built-in fiat settlement
- Presenting forced movement recovery as fully mature (it has Emerging maturity)
- Claiming unlimited policy combinatorics

**Detection**: Cross-reference all capability claims against `dalp-claim-verification.md`. Check tense usage around capability descriptions.

**Fix**: Add appropriate qualification: "available through integration," "configurable during implementation," "targeted for Qx 20xx."

---

## Pattern 4: Generic Executive Summary

**What happens**: The executive summary reads like a product brochure rather than a tailored response to the client's specific needs. Opens with company history or feature lists instead of the client's challenge.

**Detection**: Apply the find-and-replace test: could the client name be swapped for any other prospect without changing the text?

**Fix**: Rewrite to open with the client's stated challenge, connect DALP capabilities to their specific requirements, and close with a clear value proposition tied to their evaluation criteria.

---

## Pattern 5: Internal Terminology Leaks

**What happens**: Internal framework names (TheGraph, Restate, oRPC, Drizzle, etc.), package paths, or code patterns appear in client-facing text.

**Most common offenders**: Foundry/Hardhat, TheGraph, Restate, oRPC, Drizzle, OpenTelemetry, package paths.

**Detection**: Run exact-match search against the IP checklist Category 1 terms. Pattern-match for Category 2-4 patterns.

**Fix**: Replace with client-facing abstractions per the IP checklist replacement table.

---

## Pattern 6: Team Size or Internal Process Disclosure

**What happens**: The proposal mentions specific employee counts, team sizes, or describes internal workflows (including AI-assisted processes).

**Detection**: Search for numbers near "team," "employees," "staff," "people." Look for mentions of internal tools or workflows.

**Fix**: Remove all references. Discuss capability and track record, not headcount.

---

## Pattern 7: Voice Fractures Across Sections

**What happens**: Different sections sound like they were written by different authors with different levels of formality, different terminology preferences, and different confidence levels.

**Detection**: Compare opening sentence style, terminology, and qualification language across major sections. Look for shifts between marketing copy, technical notes, and legal hedging.

**Fix**: Perform a full editorial pass to unify voice. Standardize terminology and qualification patterns.

---

## Pattern 8: Competitor Naming Without Need

**What happens**: The proposal names specific competitors when generic positioning would be more appropriate and less risky.

**Detection**: Search for competitor company names. Check whether the naming is required by the RFP or gratuitous.

**Fix**: Replace specific competitor names with generic framing: "Unlike platforms that require..." or "Where some approaches..." unless the RFP explicitly requires comparative analysis.

---

## Pattern 9: Evidence Separation from Claims

**What happens**: Claims appear in one section but the supporting evidence is buried pages later or in a different section entirely. The evaluator reads the claim, finds no proof nearby, and moves on with reduced confidence.

**Detection**: For each major claim, check whether evidence appears within the same section or within 1-2 paragraphs.

**Fix**: Move evidence closer to claims. Use cross-references if evidence must live elsewhere.

---

## Pattern 10: Compliance Matrix Without Depth

**What happens**: The compliance matrix answers requirements with "Yes" or one-line responses, providing no mechanism, evidence, or qualification.

**Detection**: Review the compliance matrix for bare "Yes" entries on complex requirements.

**Fix**: Add mechanism, evidence reference, and qualification for every non-trivial requirement. "Yes -- see Section X for the approval workflow and audit trail implementation" is minimum.

---

## Pattern 11: Missing "Complexity of Doing It Right" Positioning

**What happens**: The proposal fails to convey why institutional-grade digital asset management is complex and why DALP's approach to that complexity is valuable. Instead, it positions DALP like any other technology vendor.

**Detection**: Check whether the proposal explains why the client's requirements are hard to meet at production scale, and how DALP specifically addresses that complexity through governance, compliance, identity, and operational controls.

**Fix**: Weave the positioning theme into the executive summary, solution overview, and differentiation sections. Show that DALP exists because the hard parts -- identity, compliance, governance, auditability -- are where most platforms fall short.

---

## Pattern 12: Unqualified Absolute Language

**What happens**: The proposal uses words like "all," "fully," "always," "seamless," "guaranteed," "complete" without qualification.

**Detection**: Search for absolute terms. Check whether each usage is defensible or creates accidental overcommitment.

**Fix**: Add appropriate qualification or remove the absolute. "Supports all EVM-compatible networks" is defensible. "Fully supports all requirements" almost never is.
