# Enhancement Log -- 2026-03-15

Summary of 15 enhancement tracks applied to the Proposal Checker agent.
Approved by Gyan (co-founder).
All changes limited to setup/, training/, feedback/, and content/ files plus AGENTS.md and SOUL.md.
No changes to output format, DOCX generation, scripts, or template files.

---

## Track 1: Remove All Emojis

**Files modified:**
- `AGENTS.md` -- Removed lock emoji from Protection Rule heading
- `setup/review-template.md` -- Replaced warning emoji, checkmark emoji, and ballot box emojis with text equivalents

**What changed:** All emoji characters in .md files within the agent directory have been replaced with plain text equivalents. The review output will no longer contain any emojis.

---

## Track 2: Never Comment on DOCX Formatting

**Files modified:**
- `AGENTS.md` -- Added "Rule 1: Never comment on DOCX formatting" to new Fundamental Review Rules section
- `SOUL.md` -- Added to "What You Are Not" list and calibration rules
- `setup/dalp-claim-verification.md` -- Added DOCX Formatting Exclusion section with explicit list of what not to comment on
- `feedback/lessons.md` -- Added lesson entry documenting this rule

**What changed:** The reviewer is now explicitly instructed to never comment on Word template styling, fonts, margins, page layout, header/footer design, table formatting, or color schemes. Focus is exclusively on content quality.

---

## Track 3: Fix Scoring Bias

**Files modified:**
- `AGENTS.md` -- Added "Rule 2: No forced negatives" to Fundamental Review Rules
- `SOUL.md` -- Added two new calibration rules about not forcing negatives on accurate content
- `setup/dalp-claim-verification.md` -- Added "Rule 1: If content accurately reflects DALP capabilities, score it as passing"
- `feedback/lessons.md` -- Added lesson entry: "Accurate DALP claims should score as passing, not be hedged"

**What changed:** The reviewer is now explicitly told that it is not mandatory to find negatives. If content accurately reflects DALP capabilities, it should score as passing. No forced partial scores for valid content. A well-written, factually accurate proposal can legitimately score 4/5 or 5/5 on any dimension.

---

## Track 4: Deepen DALP Knowledge Checks

**Files modified:**
- `setup/dalp-claim-verification.md` -- Created new file with comprehensive verified capability list derived from capability-mapping files

**What changed:** Created a detailed DALP claim verification checklist that documents:
- Verified capabilities organized by domain (Asset Lifecycle, Compliance and Identity, Custody and Settlement, Operations, Platform Administration, Developer Surface)
- Capability maturity verification rules (Managed/Defined/Emerging/Initial)
- Cross-reference requirement with capability-gaps documentation
- Specific evidence-backed capabilities from the codebase

The reviewer now has a concrete reference to verify claims against, rather than relying on general knowledge.

---

## Track 5: Improve Feedback Language

**Files modified:**
- `feedback/lessons.md` -- Added "Review feedback must be specific and actionable" lesson with examples
- `feedback/lessons.md` -- Added "Feedback Language Standards" section with always-include requirements, never-use list, and preferred patterns

**What changed:** The reviewer now has explicit rules for feedback language:
- Every criticism must include: location, problem, impact, and specific fix
- Banned vague phrases: "could be better," "needs more detail," "consider revising," "tighten this up," "strengthen the messaging," "add more proof"
- Provided specific preferred patterns with examples

---

## Track 6: Add Claim Verification Checklist

**Files modified:**
- `setup/dalp-claim-verification.md` -- Created comprehensive claim verification checklist

**What changed:** Added two sections to the new file:
- **Common Overclaims to Flag**: 8 critical overclaims and 6 moderate overclaims with specific descriptions
- **Tense and Status Overclaims**: Rules for detecting roadmap items in present tense, unqualified "supports," and other status blurring

Each overclaim includes what the correct claim should look like and the severity level.

---

## Track 7: Expand Scoring Rubric

**Files modified:**
- `setup/scoring-rubric.md` -- Added "Supplementary Scoring Dimensions" section

**What changed:** Added four cross-cutting quality dimensions that inform existing scores:
1. **Factual Accuracy** -- Verify DALP claims against capability-mapping, with explicit rule that accurate claims should score as passing
2. **Positioning Alignment** -- Check alignment with "Complexity of Doing It Right" positioning
3. **Audience Appropriateness** -- Assess calibration for the specific reader audience
4. **Competitive Differentiation Quality** -- Enhanced checks beyond the existing dimension

Each supplementary dimension explains which primary dimensions it influences.

---

## Track 8: Add Content Guardrails Check

**Files modified:**
- `AGENTS.md` -- Added "Rule 5: Content guardrails are mandatory" to Fundamental Review Rules
- `setup/dalp-claim-verification.md` -- Added Content Guardrails Check section
- `setup/review-template.md` -- Added "Content guardrails respected" row to DALP Factual Accuracy Check table
- `feedback/lessons.md` -- Added lesson entry: "Content guardrails are mandatory"

**What changed:** The reviewer now checks every proposal against a specific list of items that must never be disclosed:
- Team size or headcount
- AI workflow details
- Internal tooling names
- Internal process details
- Revenue or financial details
- Investor information
- Internal organizational structure
- Specific customer names without permission

Note: The bid-manager's content-guardrails.md file does not exist yet. The guardrails have been documented directly in the proposal checker's dalp-claim-verification.md based on organizational knowledge.

---

## Track 9: Improve Tone Assessment Criteria

**Files modified:**
- `setup/tone-assessment.md` -- Created new file

**What changed:** Created comprehensive tone assessment criteria covering:
- What good proposal tone sounds like (7 qualities with "The Trust Test")
- What bad proposal tone sounds like (7 anti-patterns with "The Doubt Test")
- Specific positive indicators (8 items to look for)
- Specific negative indicators (8 items to flag)
- Scoring integration guidance showing which dimensions tone affects
- "Complexity of Doing It Right" tone guidance

---

## Track 10: Add "Complexity of Doing It Right" Positioning Check

**Files modified:**
- `AGENTS.md` -- Added "Rule 7: Positioning alignment is required"
- `setup/dalp-claim-verification.md` -- Core Positioning section at top of file
- `setup/tone-assessment.md` -- "Complexity of Doing It Right" tone section
- `setup/common-defect-patterns.md` -- Pattern 11: Missing "Complexity of Doing It Right" Positioning
- `setup/scoring-rubric.md` -- Positioning Alignment supplementary dimension
- `setup/review-template.md` -- "Positioning alignment" row in DALP Factual Accuracy Check

**What changed:** The reviewer now explicitly checks whether every proposal aligns with the core positioning theme:
- DALP exists because institutional-grade digital asset management is genuinely complex
- The complexity includes identity, compliance, governance, auditability, and multi-asset/multi-network support
- The proposal should not reduce DALP to "a blockchain platform" or oversimplify the domain

---

## Track 11: Add Leadership Title Verification

**Files modified:**
- `AGENTS.md` -- Added "Rule 4: Leadership titles must be exact"
- `setup/dalp-claim-verification.md` -- Leadership Titles section with mandatory verification
- `setup/common-defect-patterns.md` -- Pattern 2: Leadership Title Errors
- `setup/review-template.md` -- "Leadership titles correct" row in DALP Factual Accuracy Check
- `feedback/lessons.md` -- Added lesson entry: "Verify leadership titles in every review"

**What changed:** The reviewer now verifies in every review:
- Matthew Van Niekerk = Co-founder and President
- Adam Popat = CEO
Any deviation is flagged as a Major defect.

---

## Track 12: Expand Review Template

**Files modified:**
- `setup/review-template.md` -- Added two new sections before Top 3 Strengths

**What changed:** Added to the review output template:
1. **DALP Factual Accuracy Check** -- 7-row verification table covering capability claims, roadmap distinction, overclaims, leadership titles, content guardrails, positioning alignment, and competitive claims
2. **Tone Assessment** -- 7-row assessment table covering client-centered opening, calm voice, evidence placement, limitation honesty, voice consistency, hype absence, and forced enthusiasm

Both sections include summary fields for overall assessment. The review output is now more structured and systematic.

---

## Track 13: Add Common Defect Patterns

**Files modified:**
- `setup/common-defect-patterns.md` -- Created new file

**What changed:** Documented 12 frequently observed proposal defect patterns:
1. DALP Reduced to "Blockchain Platform"
2. Leadership Title Errors
3. Overclaiming Native Capabilities
4. Generic Executive Summary
5. Internal Terminology Leaks
6. Team Size or Internal Process Disclosure
7. Voice Fractures Across Sections
8. Competitor Naming Without Need
9. Evidence Separation from Claims
10. Compliance Matrix Without Depth
11. Missing "Complexity of Doing It Right" Positioning
12. Unqualified Absolute Language

Each pattern includes: what happens, why it matters, detection method, and fix guidance.

---

## Track 14: Improve Executive Summary Assessment

**Files modified:**
- `setup/executive-summary-criteria.md` -- Created new file

**What changed:** Created detailed executive summary assessment criteria covering:
- Four jobs an executive summary must do
- Structural requirements (opening, body, closing, length)
- Quality checklist (client alignment, proof signals, honesty, readability, memorability)
- Five common executive summary failure patterns with impact descriptions
- Scoring calibration examples for levels 1-5

---

## Track 15: Add Competitive Positioning Check

**Files modified:**
- `AGENTS.md` -- Added "Rule 6: Competitive positioning must be factual"
- `setup/dalp-claim-verification.md` -- Added Competitive Positioning Rules section
- `setup/common-defect-patterns.md` -- Pattern 8: Competitor Naming Without Need
- `setup/review-template.md` -- "Competitive claims factual" row in DALP Factual Accuracy Check
- `setup/scoring-rubric.md` -- Competitive Differentiation Quality supplementary dimension

**What changed:** The reviewer now checks:
1. Competitors are not named unless the RFP explicitly requires comparison
2. Competitive statements are non-disparaging
3. Differentiation is factual and evidence-backed, not adjective-driven
4. "Industry-leading" and "best-in-class" are banned unless immediately followed by specific evidence
5. Overselling is flagged: if a competitor is stronger in an area, do not claim otherwise

---

## Files Created
- `setup/dalp-claim-verification.md` (new)
- `setup/tone-assessment.md` (new)
- `setup/common-defect-patterns.md` (new)
- `setup/executive-summary-criteria.md` (new)
- `feedback/enhancement-log-20260315.md` (this file)

## Files Modified
- `AGENTS.md` -- Removed emoji, added Fundamental Review Rules section, expanded startup sequence
- `SOUL.md` -- Added scoring bias fixes, DOCX formatting exclusion, "What You Are Not" additions
- `setup/SETUP-INDEX.md` -- Added 4 new file entries, removed emojis from descriptions
- `setup/review-template.md` -- Removed emojis, added DALP Factual Accuracy Check and Tone Assessment sections
- `setup/scoring-rubric.md` -- Added Supplementary Scoring Dimensions section
- `feedback/lessons.md` -- Added 5 new lesson entries and Feedback Language Standards section
