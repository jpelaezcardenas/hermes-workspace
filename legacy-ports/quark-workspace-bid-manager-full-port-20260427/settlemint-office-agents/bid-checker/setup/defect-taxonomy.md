# Proposal Defect Taxonomy

This file classifies the defects that commonly weaken proposals before submission.
Use it as a diagnostic system, not a theoretical essay.
A good review should be able to name the defect, explain why it matters, estimate severity, and recommend the fix pattern.

Primary scoring impact:
- all 10 dimensions, with strongest influence on **Document Flow & Structure**, **Writing Quality**, **Technical Credibility**, **Requirement Coverage**, **Honesty & Transparency**, and **IP & Confidentiality**

Cross-reference:
- `setup/reading-psychology.md`
- `setup/persuasion-framework.md`
- `setup/structure-patterns.md`
- `setup/evaluator-personas.md`
- `setup/writing-standards.md`
- `setup/ip-checklist.md`
- `setup/scoring-rubric.md`

---

## 1. How to use this taxonomy

Every defect entry should be interpreted through five questions:
1. **What is the defect?**
2. **How do I detect it?**
3. **How severe is it in context?**
4. **What does it do to evaluator trust or comprehension?**
5. **What is the most efficient fix pattern?**

### Severity labels
- **Minor** — irritating or low-signal; does not materially change shortlist probability on its own
- **Moderate** — visible weakness that lowers confidence or scoring in one or more dimensions
- **Major** — material defect that meaningfully harms shortlist chances or signals lack of control
- **Critical** — blocker-level defect; can trigger non-submission recommendation or severe trust damage

### Severity is contextual
The same defect can change severity depending on location.
Example:
- a vague sentence in a low-stakes background paragraph may be minor
- the same ambiguity in a legal, compliance, or capability claim may be major or critical

### Defect stacking
Multiple moderate defects in one section often produce a major evaluator effect.
Do not under-call “death by accumulation.”

---

## 2. Category A — Content defects

Content defects concern what is present, absent, overclaimed, underdeveloped, or disproportionate.

---

### A1. Missing section

**Definition**
A required or clearly expected section is absent.
Examples:
- no executive summary
- no implementation approach
- no governance/control section
- no gap disclosure despite visible partial capability

**Detection method**
- compare against RFP requirements and expected proposal architecture
- run TOC test
- check whether a core evaluator question is never directly answered anywhere

**Typical severity**
- Moderate to Critical
- Critical when the missing section maps to explicit client criteria or major risk/control concerns

**Evaluator impact**
- procurement sees incompleteness
- business sponsor sees lack of framing
- technical/risk/legal readers assume a hidden weakness or lack of maturity

**Fix pattern**
- add dedicated section with explicit purpose
- do not bury the missing content into an unrelated section
- ensure heading makes the answer discoverable

---

### A2. Thin answer

**Definition**
A section exists, but the substance is too shallow to support confidence.
Often appears as:
- one-paragraph answers to complex requirements
- “yes” with almost no explanation
- summary language standing in for proof

**Detection method**
- compare claim complexity to answer length and evidence density
- ask whether a skeptical evaluator's obvious follow-up is already addressed

**Typical severity**
- Moderate to Major

**Evaluator impact**
- reads as evasive, underprepared, or templated
- drags down credibility even when the underlying capability may be real

**Fix pattern**
- expand using claim → explanation → evidence → qualifier → implication
- add concrete mechanism or relevant proof

---

### A3. Missing evidence block

**Definition**
A section makes meaningful claims but provides no evidence cluster.
The content may describe the response but never proves it.

**Detection method**
- mark each major claim; see whether architecture, benchmark, reference, control, or example follows
- if not, evidence is missing

**Typical severity**
- Moderate to Major

**Evaluator impact**
- technical and risk readers distrust the section
- business readers downgrade confidence even if they cannot diagnose why

**Fix pattern**
- pair claims with proof close to the reading path
- add evidence table, case example, benchmark, or control description as appropriate

---

### A4. Overclaiming

**Definition**
The proposal claims more than the product, team, evidence, or roadmap status can support.

**Detection method**
- absolute language (“all,” “fully,” “seamless,” “guaranteed”)
- present tense for future items
- unsupported superlatives
- claims broader than evidence

**Typical severity**
- Major to Critical

**Evaluator impact**
- once spotted, trust erosion spreads beyond the defective sentence
- risk/legal readers become sharply skeptical

**Fix pattern**
- narrow the claim
- qualify with current scope or condition
- distinguish standard capability, configuration, extension, and roadmap

---

### A5. Underclaiming / buried strength

**Definition**
Real strengths exist but are weakly surfaced, poorly framed, or hidden in low-attention zones.

**Detection method**
- identify strong proof that appears late, deep in paragraphs, or without argumentative framing
- compare visible messaging to actual content quality

**Typical severity**
- Minor to Moderate
- can become Major in competitive situations where visibility is everything

**Evaluator impact**
- proposal loses points it could have earned
- business sponsor and procurement readers may miss real strengths entirely

**Fix pattern**
- elevate the strength into headings, summary language, or early proof blocks
- connect it explicitly to a client criterion

---

### A6. Content imbalance

**Definition**
The proposal allocates disproportionate space to low-value content and too little to high-value content.
Examples:
- three pages on company background, half a page on governance
- long capability tour, thin implementation logic

**Detection method**
- compare section lengths to evaluator importance
- compare client weighting with proposal emphasis

**Typical severity**
- Moderate to Major

**Evaluator impact**
- suggests poor judgment about what matters
- can materially distort scoring outcomes

**Fix pattern**
- reallocate length and prominence
- compress boilerplate; expand decision-critical sections

---

## 3. Category B — Logic defects

Logic defects concern whether the argument holds.
These are among the most dangerous defects because polished prose can hide them.

---

### B1. Non sequitur

**Definition**
The conclusion does not follow from the evidence.

**Detection method**
- ask: if I accept the evidence, does the claim still naturally follow?
- if not, logic is broken

**Typical severity**
- Moderate to Major

**Evaluator impact**
- creates subtle distrust
- technical and analytical readers spot it quickly

**Fix pattern**
- add the missing warrant or remove the overstated conclusion

---

### B2. Circular reasoning

**Definition**
The proposal uses a restatement of the claim as its own support.

**Example**
“Our implementation approach is proven because it follows proven methodology.”

**Detection method**
- strip adjectives and restatements; see whether any independent proof remains

**Typical severity**
- Moderate

**Evaluator impact**
- makes the document sound polished but empty

**Fix pattern**
- replace self-referential language with external evidence or mechanism

---

### B3. Unsupported claim

**Definition**
A claim is made with no evidential support.
Related to A3, but narrower and sentence/claim-focused.

**Detection method**
- highlight every major claim and look for evidence within the same chunk or nearby

**Typical severity**
- Minor to Major depending on the claim

**Evaluator impact**
- trust drops in proportion to claim importance

**Fix pattern**
- add evidence, qualification, or remove the claim

---

### B4. False precision

**Definition**
Specific numbers or commitments are presented without justified certainty.

**Examples**
- exact implementation durations without assumptions
- highly precise performance values with no method
- rigid roadmap timing with no qualifier

**Detection method**
- ask what assumptions, environment, or method would justify the precision
- if absent, the precision is suspect

**Typical severity**
- Moderate to Major

**Evaluator impact**
- sharp readers distrust the number and often the surrounding section too

**Fix pattern**
- widen the range or add conditions and methodology

---

### B5. Evidence mismatch

**Definition**
The proposal provides evidence, but it is not the right evidence for the claim.

**Example**
Using a startup case study to support sovereign-infrastructure fit.

**Detection method**
- compare sector, scale, use case, regulation, and operating model of evidence versus claim

**Typical severity**
- Moderate to Major

**Evaluator impact**
- can feel more misleading than no evidence at all

**Fix pattern**
- swap for comparable evidence or narrow the claim

---

### B6. Hidden assumption

**Definition**
A conclusion depends on an unstated assumption that evaluators may not share.

**Detection method**
- ask what must be true for this recommendation or timeline to hold
- if key conditions are absent, assumptions are hidden

**Typical severity**
- Moderate

**Evaluator impact**
- later review or negotiation surfaces the gap and reduces trust

**Fix pattern**
- state assumptions explicitly and tie them to scope or timeline

---

## 4. Category C — Structure defects

Structure defects concern how content is organised, signposted, retrieved, and sequenced.

---

### C1. Poor hierarchy

**Definition**
The document's heading and section system does not clearly communicate importance or relation.

**Detection method**
- TOC review
- heading depth consistency check
- squint test: can the eye tell what matters?

**Typical severity**
- Moderate to Major

**Evaluator impact**
- navigation slows, confidence drops, and selective reading becomes harder

**Fix pattern**
- redesign heading hierarchy; clarify primary vs secondary sections

---

### C2. No transitions

**Definition**
Sections jump without explanation or connective logic.

**Detection method**
- read section openings and endings only
- if the flow feels abrupt, transitions are missing

**Typical severity**
- Minor to Moderate
- Major when the argument becomes fragmented

**Evaluator impact**
- section island syndrome; document feels stitched together

**Fix pattern**
- add bridging sentences that explain why the next section exists

---

### C3. Section island syndrome

**Definition**
Individual sections read as self-contained artifacts with weak integration into the whole.

**Detection method**
- terminology shifts
- duplicated setup language
- inconsistent tone or formatting
- no cross-references or handoffs

**Typical severity**
- Moderate to Major

**Evaluator impact**
- patchwork feel; lower trust and reduced flow quality

**Fix pattern**
- harmonise terminology, add transitions, redesign section roles

---

### C4. TOC drift

**Definition**
Table of contents and actual document structure no longer align.

**Detection method**
- compare TOC labels, numbering, and order to body text

**Typical severity**
- Moderate

**Evaluator impact**
- signals sloppy final assembly; procurement readers notice fast

**Fix pattern**
- regenerate and verify TOC after final structural edits

---

### C5. Overpacked section

**Definition**
A section tries to do too many jobs at once.

**Detection method**
- identify more than one evaluator question being answered in the same chunk without separation

**Typical severity**
- Moderate

**Evaluator impact**
- high cognitive load; ambiguity around what is actually being claimed

**Fix pattern**
- split into sub-sections with clear roles

---

### C6. Retrieval failure

**Definition**
The document makes it difficult to locate and reuse information.

**Detection method**
- role-play selective reading
- attempt to find proof, gaps, or requirement answers quickly

**Typical severity**
- Moderate to Major

**Evaluator impact**
- procurement and committee readers cannot score efficiently

**Fix pattern**
- improve headings, numbering, cross-references, and content mapping

---

## 5. Category D — Prose defects

Prose defects concern sentence craft, readability, and editorial control.

---

### D1. Passive voice saturation

**Definition**
Passive voice is used so often that agency becomes unclear or the prose becomes inert.

**Detection method**
- sentence scan for “is/was/are/were + past participle” patterns
- ask who is acting and whether the prose hides it

**Typical severity**
- Minor to Moderate

**Evaluator impact**
- lower energy, weaker accountability, more distance from action

**Fix pattern**
- rewrite key sentences in active voice; keep passive only where the actor truly does not matter

---

### D2. Jargon fog

**Definition**
Dense technical or corporate terminology obscures meaning instead of conveying it.

**Detection method**
- count undefined acronyms and abstract nouns
- ask whether a mixed evaluation committee could read the section without fatigue

**Typical severity**
- Moderate to Major

**Evaluator impact**
- business readers disengage; technical readers suspect buzzword padding

**Fix pattern**
- replace with plain precise language; define terms on first use

---

### D3. Bullet dump

**Definition**
Bullets replace reasoning or narrative structure.

**Detection method**
- sections dominated by bullets with little connective prose
- bullets lack informative lead-ins or logical grouping

**Typical severity**
- Minor to Major depending on location

**Evaluator impact**
- proposal feels like notes, not judgment; argument quality drops

**Fix pattern**
- convert high-value bullets into narrative or structured comparison tables

---

### D4. Tense drift

**Definition**
Tense changes unpredictably or strategically blurs current and future capability.

**Detection method**
- inspect sections making capability or roadmap claims
- note present vs future inconsistency

**Typical severity**
- Moderate to Major

**Evaluator impact**
- can trigger honesty concerns, not just style concerns

**Fix pattern**
- standardise tense around current state, planned state, and implementation activity

---

### D5. Tone inconsistency

**Definition**
Voice or level of formality shifts noticeably across sections.

**Detection method**
- compare sentence rhythm, diction, and stance across major sections

**Typical severity**
- Minor to Moderate

**Evaluator impact**
- patchwork feel; reduced trust in editorial control

**Fix pattern**
- line-edit for unified voice; standardise terminology and cadence

---

### D6. Meaningless intensifier

**Definition**
Adverbs or adjectives amplify without adding information.
Examples: “highly robust,” “extremely scalable,” “very seamless.”

**Detection method**
- remove the intensifier; if meaning does not change, it is empty

**Typical severity**
- Minor, but cumulative

**Evaluator impact**
- brochure feel, especially in technical content

**Fix pattern**
- replace with evidence or delete

---

## 6. Category E — Credibility defects

Credibility defects specifically attack trust and proof quality.

---

### E1. No evidence

**Definition**
Important claims appear without any supporting proof.

**Detection method**
- claim audit

**Typical severity**
- Moderate to Major

**Evaluator impact**
- weakens technical and competitive scores rapidly

**Fix pattern**
- add benchmark, reference, architecture detail, or mechanism explanation

---

### E2. Wrong evidence

**Definition**
Evidence exists but proves the wrong thing.
Closely related to B5.

**Detection method**
- compare evidence relevance and claim scope

**Typical severity**
- Moderate

**Evaluator impact**
- looks like deliberate padding or poor judgment

**Fix pattern**
- replace with aligned evidence or narrow the claim

---

### E3. Outdated reference

**Definition**
The proposal uses stale standards, outdated deployments, or old data without context.

**Detection method**
- date-check standards, timelines, release claims, and references

**Typical severity**
- Minor to Moderate
- Major when the outdated reference affects regulatory or capability credibility

**Evaluator impact**
- suggests the proposal was not refreshed for this opportunity

**Fix pattern**
- update references or explain why the older evidence remains relevant

---

### E4. Mismatched case study

**Definition**
A case study does not match the client's sector, scale, regulatory profile, or use case.

**Detection method**
- compare case study characteristics to client context

**Typical severity**
- Moderate to Major

**Evaluator impact**
- weakens client-centricity and technical credibility simultaneously

**Fix pattern**
- replace or qualify the case study; explain relevance honestly

---

### E5. Unexplained benchmark

**Definition**
A performance or operational metric is given with no context, method, or implication.

**Detection method**
- look for numeric claims lacking environment and significance

**Typical severity**
- Moderate

**Evaluator impact**
- numbers become marketing ornaments, not proof

**Fix pattern**
- add test conditions, baseline, percentile, and why it matters

---

## 7. Category F — Tailoring defects

Tailoring defects reveal that the proposal is not genuinely written for this client.

---

### F1. Generic content block

**Definition**
A section could fit any prospect with minimal edits.

**Detection method**
- find-and-replace test: swap client name and see whether it still reads naturally

**Typical severity**
- Moderate to Major

**Evaluator impact**
- buyer feels like one of many; differentiation and relevance drop

**Fix pattern**
- rewrite around client-specific language, constraints, and criteria

---

### F2. Wrong client context

**Definition**
The proposal references irrelevant sector assumptions, jurisdictional details, or operating realities.

**Detection method**
- compare text to actual client profile and RFP language

**Typical severity**
- Major

**Evaluator impact**
- obvious homework failure; confidence collapses

**Fix pattern**
- correct context and rebuild surrounding argument

---

### F3. Search-and-replace artifact

**Definition**
Residual names, pronouns, case-study references, or terminology from another proposal remain.

**Detection method**
- targeted search for old client names, wrong jurisdiction, inconsistent programme labels

**Typical severity**
- Major to Critical

**Evaluator impact**
- humiliating; strongly damages trust

**Fix pattern**
- full terminology scrub and contextual QA pass

---

### F4. Feature-first framing

**Definition**
Content is organised around product features instead of client outcomes and requirements.

**Detection method**
- paragraph openings talk about the platform more than the client
- benefits are left implicit

**Typical severity**
- Moderate

**Evaluator impact**
- business sponsors and procurement readers must do translation work

**Fix pattern**
- rewrite paragraphs to lead with client need and decision relevance

---

## 8. Category G — Compliance defects

Compliance defects concern whether the proposal follows the client's explicit instructions and scoring model.

---

### G1. Missing requirement response

**Definition**
An explicit requirement is ignored or untraceable.

**Detection method**
- crosswalk against RFP/RFI requirements

**Typical severity**
- Major to Critical

**Evaluator impact**
- procurement penalty; may be fatal in formal scoring

**Fix pattern**
- add direct answer with status, evidence, and qualifier as needed

---

### G2. Wrong response format

**Definition**
The proposal ignores requested structure, template, or answer mode.

**Detection method**
- compare document against client instructions

**Typical severity**
- Moderate to Major

**Evaluator impact**
- creates scoring friction; can suggest inability to follow process

**Fix pattern**
- conform structure to requested format without losing clarity

---

### G3. Exceeded page or word limits

**Definition**
Submission length breaches explicit constraints.

**Detection method**
- document count and limit check

**Typical severity**
- Major to Critical depending on procurement rules

**Evaluator impact**
- can cause administrative rejection or silent penalty

**Fix pattern**
- cut aggressively while preserving the scoring core

---

### G4. Evaluation-criteria mismatch

**Definition**
Proposal emphasis does not align with the client's stated scoring criteria or weights.

**Detection method**
- map proposal length and emphasis against evaluation criteria

**Typical severity**
- Major

**Evaluator impact**
- polished proposal still loses because it under-serves the actual scoring model

**Fix pattern**
- rebalance sections to mirror weight and criteria language

---

## 9. Category H — IP / confidentiality defects

IP defects are handled in detail in `setup/ip-checklist.md`.
This taxonomy focuses on how to classify and react to them during review.

---

### H1. Internal term leak

**Definition**
Internal framework, tool, package, or codename appears in client-facing text.

**Detection method**
- exact-match search using the IP checklist

**Typical severity**
- Major
- can cap IP score at 2 automatically depending on category

**Evaluator impact**
- exposes internal implementation detail; signals weak content hygiene

**Fix pattern**
- replace with approved client-facing abstraction

---

### H2. Code or configuration leak

**Definition**
Raw code fragments, interface names, environment variables, imports, or config patterns appear.

**Detection method**
- regex/pattern search; visual inspection

**Typical severity**
- Critical

**Evaluator impact**
- severe IP and professionalism failure

**Fix pattern**
- remove and replace with conceptual explanation or sanitized example

---

### H3. File path / infrastructure leak

**Definition**
Internal file paths, server paths, repo structures, or deployment artifacts appear.

**Detection method**
- pattern search and visual review of screenshots/diagrams

**Typical severity**
- Critical

**Evaluator impact**
- immediate control-failure signal

**Fix pattern**
- scrub and replace with neutral architecture wording

---

### H4. Metadata / artifact leak

**Definition**
Tracked changes, author metadata, screenshot URLs, hidden comments, or diagram artifacts expose internal information.

**Detection method**
- document property review, screenshot inspection, PDF metadata check

**Typical severity**
- Major to Critical

**Evaluator impact**
- signals sloppy release control; possible confidentiality concern

**Fix pattern**
- clean export pipeline and metadata scrub

---

## 10. Defect density guide

Not every proposal is defect-free.
But defect concentration matters.

### Density by section quality

| Defect Density | Meaning | Reviewer Interpretation |
|---|---|---|
| 0–1 minor defects per section | Normal | Controlled writing; likely 4–5 quality if proof is strong |
| 2–3 minor or 1 moderate defect per section | Watchable | Acceptable but clearly improvable; likely around 3 quality |
| 4–5 mixed defects or repeated moderate defects per section | Concerning | Reader effort rises sharply; likely 2–3 quality depending on severity |
| 1 major defect in a key section | Serious | Can drag the entire dimension down even if density elsewhere is low |
| 2+ major defects in one section or any critical defect | Alarming | High shortlist risk; possible “No” verdict depending on defect type |

### Density amplification rules
- repeated defects feel worse than isolated defects
- defects in high-attention zones count more
- defects in compliance, legal, or capability claims count more
- defect combinations often multiply harm:
  - vague claim + no evidence + generic heading
  - roadmap blur + absolute wording + wrong case study
  - missing requirement + broken numbering + weak retrieval

### Section triage guidance
- **green section**: low density, defects mostly polish
- **amber section**: moderate density, real rework needed
- **red section**: major/critical defect presence or stacked moderate failures

---

## 11. Detection methods by reviewer pass

### First pass: skim detection
Best for spotting:
- content imbalance
- generic headings
- TOC drift
- visual monotony
- buried value
- obvious tailoring failures

### Second pass: score detection
Best for spotting:
- thin answers
- unsupported claims
- evidence mismatch
- feature-first framing
- readability and structure defects

### Third pass: IP audit detection
Best for spotting:
- internal terms
- code/config/path leaks
- metadata and artifact issues

### Fourth pass: section-by-section detection
Best for spotting:
- logic defects
- hidden assumptions
- ambiguity
- inconsistency across parallel sections
- defect density concentrations

---

## 12. Severity calibration matrix

| Defect Type | Minor | Moderate | Major | Critical |
|---|---|---|---|---|
| Missing content | small non-core omission | thin treatment of useful topic | missing required or strategic section | missing mandatory criterion / blocker section |
| Logic | low-stakes unsupported sentence | weak warrant on important claim | major overclaim or broken reasoning in core section | logic that creates material misrepresentation |
| Structure | minor transition lapse | generic headings, weak chunking | retrieval failure, severe patchwork | document practically unscorable |
| Prose | occasional awkward phrasing | jargon fog, bullet dump, tense drift | sustained unreadability in key sections | wording creates legal/compliance exposure |
| Credibility | missing context on one claim | sparse proof across a section | evidence mismatch on major case | repeated deceptive proof pattern |
| Tailoring | generic paragraph | multiple generic blocks | wrong context or obvious template reuse | search-and-replace artifact in submission draft |
| Compliance | small formatting miss | weak response mapping | missing requirement / wrong format | page-limit breach or disqualifying miss |
| IP | borderline term | internal framework name | multiple internal terms / metadata leak | code, file path, or infrastructure exposure |

---

## 13. Example diagnostic bundles

### Bundle A: brochure section
Defects:
- D2 jargon fog
- D6 meaningless intensifiers
- A2 thin answer
- B3 unsupported claim
- F4 feature-first framing

Result:
The section sounds impressive but persuades nobody serious.

Fix pattern:
Rebuild around client need, claim, mechanism, evidence, and implication.

### Bundle B: false confidence section
Defects:
- A4 overclaiming
- D4 tense drift
- B4 false precision
- E5 unexplained benchmark
- H1 internal term leak

Result:
Trust collapses fast, especially with technical/risk/legal readers.

Fix pattern:
qualify, separate current from roadmap, sanitize terminology, and add method/context.

### Bundle C: structurally weak requirement response area
Defects:
- C1 poor hierarchy
- C4 TOC drift
- C6 retrieval failure
- G1 missing requirement response
- G4 evaluation-criteria mismatch

Result:
May lose the bid even if underlying product fit is decent.

Fix pattern:
rebuild the response architecture around the client's criteria and numbering.

---

## 14. Fix priority rules

When multiple defects exist, fix in this order:
1. **Critical IP / compliance / legal risk defects**
2. **Major honesty and capability clarity defects**
3. **Major structure and retrieval defects**
4. **Evidence and argument defects in key scoring sections**
5. **Tailoring and differentiation defects**
6. **Prose polish and rhythm defects**

Reason:
Elegant wording cannot rescue an unsafe or structurally broken proposal.

---

## 15. Reviewer language for defect reporting

Prefer precise naming.
Examples:
- “This is an evidence-mismatch defect: the case study does not support the central-bank operating claim being made.”
- “This section has a retrieval failure: requirement answers are scattered across multiple headings with no stable structure.”
- “The problem here is not just awkward wording; it is capability ambiguity created by tense drift.”
- “This is a content-imbalance defect: three pages are spent on vendor background while the implementation dependencies receive half a page.”
- “This paragraph is a claim-stacking pattern with no warrant or backing.”

Avoid generic labels like:
- “weak section”
- “needs clarity”
- “tighten this”

Name the defect. That is how teams learn.

---

## 16. Bottom line

Most bad proposals do not fail because of one dramatic flaw.
They fail because defects are present, unnamed, stacked, and left untreated.

A strong reviewer should be able to say:
- what kind of defect is present
- where it appears
- how severe it is
- what evaluator harm it causes
- what the fix pattern is

That is how you turn criticism into usable quality control.

---

## 17. Category I — DALP-Specific Claim Defects

This category captures defects specific to DALP proposals. Use alongside the general taxonomy above.

Cross-reference: `setup/dalp-claim-verification.md` for the full capability list and verified claims.

### I1. Incorrect leadership titles

**Definition**
The proposal uses incorrect titles for SettleMint leadership.

**Detection method**
- Search for "Matthew" and "Adam" and verify titles
- Correct titles: Matthew Van Niekerk = Co-founder and President; Adam Popat = CEO

**Typical severity**
- Major

**Evaluator impact**
- Signals sloppy quality control; embarrassing in client-facing documents

**Fix pattern**
- Replace with correct titles immediately

---

### I2. Critical overclaim

**Definition**
The proposal claims DALP has capabilities it does not have.

**Common examples to flag:**
- "Native SWIFT/ISO 20022 support" — DALP does not have native SWIFT messaging
- "Built-in fiat settlement" — DALP does not execute fiat transfers
- "Native order book / exchange / matching engine" — DALP is not a trading venue
- "Automated tax calculation" — No guaranteed tax engine
- "Direct regulatory filing" — DALP exposes evidence artifacts only
- "Universal identity provider" — DALP integrates but is not sovereign identity
- "Unlimited policy combinatorics" — DALP provides primitives, not unconstrained logic
- "Cross-chain portability guaranteed" — Not guaranteed for all environments

**Detection method**
- Compare claims against `dalp-claim-verification.md` verified capability list

**Typical severity**
- Major to Critical

**Evaluator impact**
- Once detected, trust collapses across all capability claims
- Technical evaluators will immediately challenge

**Fix pattern**
- Remove the overclaim or qualify it: "integrates with..." rather than "native..."

---

### I3. Positioning misalignment

**Definition**
The proposal reduces DALP to a simple "tokenization tool" or "blockchain platform" rather than emphasizing production-grade infrastructure, governance, and compliance controls.

**Detection method**
- Check whether the proposal emphasizes: identity frameworks, compliance controls, governance models, auditability, multi-asset/multi-network support

**Typical severity**
- Moderate to Major

**Evaluator impact**
- Undermines DALP's core differentiation ("Complexity of Doing It Right")
- Makes the proposal look generic compared to competitors who understand the positioning

**Fix pattern**
- Rewrite to emphasize production-grade features, compliance controls, and governance

---

### I4. Missing DALP proof

**Definition**
The proposal makes capability claims without evidence specific to DALP.

**Detection method**
- Major claims about asset lifecycle, compliance, custody, or operations should have DALP-specific evidence
- Generic blockchain capability claims without DALP mechanism are insufficient

**Typical severity**
- Moderate to Major

**Evaluator impact**
- Technical evaluators need to see DALP-specific mechanism, not generic blockchain claims

**Fix pattern**
- Add DALP-specific architecture details, compliance module references, or operational mechanisms

---

### I5. Timeline ambiguity for roadmap items

**Definition**
Future capabilities are presented in present tense without qualification.

**Detection method**
- Check sections claiming new features, integrations, or expansions
- Look for "is," "does," "supports" without qualification for items not yet shipped

**Typical severity**
- Moderate to Major

**Evaluator impact**
- Creates false expectations; triggers honesty concerns if discovered later

**Fix pattern**
- Qualify with "targeted for," "roadmap," "planned," or "under development"

---

## 18. DALP Defect Quick Reference

| Defect Code | Description | Typical Severity | Fix Priority |
|---|---|---|---|
| I1 | Incorrect leadership titles | Major | 2 |
| I2 | Critical overclaim | Critical | 1 |
| I3 | Positioning misalignment | Moderate-Major | 5 |
| I4 | Missing DALP proof | Moderate-Major | 4 |
| I5 | Timeline ambiguity | Moderate | 3 |

---

## 19. Category J — Competitive Positioning Defects

Competitive positioning defects occur when a proposal fails to establish how the vendor is the better choice relative to alternatives — or actively undermines its own differentiation. These are distinct from tailoring defects (wrong client context) and content defects (what is or is not present). A proposal can be factually complete and well-structured but still lose because it sounds like every other vendor.

---

### J1. Undifferentiated positioning

**Definition**
The proposal does not articulate what makes this vendor the better choice. Strengths are stated but not compared, contextualised, or made competitive.

**Detection method**
- Ask: could a major competitor submit this proposal with their name substituted and it would read the same?
- If yes, differentiation is missing.

**Typical severity**
- Moderate to Major

**Evaluator impact**
- In competitive procurements, evaluators have multiple capable responses. An undifferentiated proposal fails the "why you?" test even when the capability is real.

**Fix pattern**
- Name the actual differentiators: what does this vendor do that alternatives do not, or do significantly better?
- Anchor differentiation to client-specific criteria, not generic claims.

---

### J2. Competitor shadow

**Definition**
The proposal inadvertently reinforces competitor framing by using their language, categories, or positioning logic.

**Examples**
- Describing the platform as "a tokenization tool" when the competitor's narrative owns "tokenization"
- Using evaluation criteria the RFP adapted from the competitor's own marketing
- Adopting neutral language when the competitor has already claimed the positive framing

**Detection method**
- Compare proposal language to known competitor positioning
- Look for framing that is neutral or generic where a more specific, defensible claim is available

**Typical severity**
- Moderate

**Evaluator impact**
- The competitor's frame becomes the reference point; the proposal ends up confirming the competitor's advantage rather than asserting its own

**Fix pattern**
- Reframe using the vendor's own positioning logic and language
- Redefine the evaluation criteria in terms that favour the vendor's real strengths

---

### J3. Strength without contrast

**Definition**
Real strengths are stated but not compared to alternatives. The implication that this is better than something else is left entirely to the reader.

**Detection method**
- Identify strength claims; check whether any statement of contrast, differentiation, or relative advantage follows
- If all strengths are stated in absolute terms with no implicit or explicit comparison, contrast is absent

**Typical severity**
- Minor to Moderate
- Major in sections explicitly evaluating alternatives

**Evaluator impact**
- Evaluators doing cross-vendor scoring cannot find the differentiating signal. Strengths read as table stakes.

**Fix pattern**
- Add contrast language: "Unlike implementations requiring..." / "Where most platforms..." / "This avoids the common pattern of..."
- Does not require naming competitors directly; framing around the problem class is sufficient.

---

### J4. Missing win theme

**Definition**
The proposal lacks a coherent, repeating narrative that explains why this vendor should win.
Win themes are the 2–3 reasons the client should choose this vendor, woven through the document.

**Detection method**
- Try to articulate the proposal's win themes from a first read
- If you cannot state them in 1–2 sentences each, they are absent or too weak to land

**Typical severity**
- Moderate to Major

**Evaluator impact**
- Evaluation committees discuss and debate. A proposal without clear win themes cannot be championed by an internal sponsor. The committee cannot summarise why this vendor won.

**Fix pattern**
- Define 2–3 win themes before writing (or rewriting)
- Ensure each major section contributes to at least one win theme
- Executive summary should make all win themes explicit

---

### J5. Concession without recovery

**Definition**
The proposal acknowledges a gap, limitation, or weakness but does not recover: no mitigation, no alternative, no comparative frame.

**Examples**
- "We do not currently support X" — full stop, no follow-up
- A known weakness is acknowledged without a counter-balance or resolution path
- A gap is mentioned in passing and immediately abandoned

**Detection method**
- Scan all limitation and gap language
- For each: check whether a mitigation, roadmap item, alternative approach, or contextualisation follows

**Typical severity**
- Moderate to Major

**Evaluator impact**
- An unrecovered concession hands the evaluation criterion directly to a competitor
- Worse than not mentioning the gap at all in some cases

**Fix pattern**
- For every acknowledged limitation: provide mitigation, timeline, workaround, or comparative reframe
- The recovery does not have to eliminate the weakness; it must show judgment and honesty about resolution

---

## 20. Competitive Positioning Defect Quick Reference

| Defect Code | Description | Typical Severity | Fix Priority |
|---|---|---|---|
| J1 | Undifferentiated positioning | Moderate-Major | 2 |
| J2 | Competitor shadow | Moderate | 4 |
| J3 | Strength without contrast | Minor-Major | 3 |
| J4 | Missing win theme | Moderate-Major | 1 |
| J5 | Concession without recovery | Moderate-Major | 5 |

---

## 21. Category K — Risk & Mitigation Defects

Risk handling is a dedicated failure class in enterprise and regulated-sector proposals. Evaluators in financial services, infrastructure, and public-sector procurement are trained to read risk sections as signals of vendor maturity and honesty. A proposal can be technically strong and still lose because its risk treatment is absent, evasive, unbalanced, or self-defeating.

Risk defects are distinct from honesty defects (which concern factual overclaiming) and compliance defects (which concern response format). These defects concern how the proposal reasons about uncertainty, ownership, and mitigation.

---

### K1. Absent risk section

**Definition**
The proposal contains no formal treatment of project, technical, operational, or commercial risks.

**Detection method**
- Check TOC and section map for any risk, dependency, assumption, or mitigation content
- Look for risk tables, risk registers, or risk narrative blocks
- If none exist and the engagement involves integration, migration, or regulatory scope, the section is absent

**Typical severity**
- Moderate to Major
- Major in regulated financial services where risk governance is an explicit evaluation criterion

**Evaluator impact**
- Risk and compliance evaluators score this immediately as immaturity or avoidance
- Business sponsors see it as lack of project discipline
- In some regulated contexts, absence of risk treatment is a disqualifying miss

**Fix pattern**
- Add a dedicated risk and mitigation section
- Structure it as: risk class → likelihood → impact → mitigation → residual risk → owner
- Cover at minimum: integration risk, data/security risk, regulatory/compliance risk, timeline risk, dependency risk

---

### K2. Unmitigated risk listing

**Definition**
Risks are acknowledged and listed but no mitigation, owner, or resolution path is provided.

**Detection method**
- Find every risk statement; check whether it is followed by: (a) a specific mitigation action, (b) an owner, or (c) a fallback plan
- A risk list with no mitigations is a K2 defect

**Typical severity**
- Moderate to Major

**Evaluator impact**
- Reads as acknowledgement of danger without a plan
- Worse than no risk section in some cases — it invites the evaluator to focus on the risks without reassurance

**Fix pattern**
- For every stated risk, add: mitigation action, responsible party, and how residual risk will be managed
- If mitigation is a client responsibility, state that explicitly rather than leaving the gap

---

### K3. Risk symmetry failure

**Definition**
The proposal covers only one class of risk while leaving other equally important classes unaddressed.
Common asymmetry patterns:
- Only technical/integration risk, no commercial or timeline risk
- Only implementation risk, no operational or regulatory risk
- Risk section focuses on low-probability edge cases while ignoring high-probability delivery dependencies

**Detection method**
- Review which risk classes are present: technical, integration, data, security, regulatory/compliance, commercial, timeline, operational, dependency
- If two or more major classes are missing, K3 applies

**Typical severity**
- Moderate

**Evaluator impact**
- Suggests the risk analysis was drafted by one function without cross-functional review
- Legal, compliance, and procurement readers see the blind spots immediately

**Fix pattern**
- Map covered risk classes against the full taxonomy above
- Add missing classes; do not need exhaustive treatment — one well-reasoned entry per class is sufficient

---

### K4. Risk deflection

**Definition**
Risks are attributed entirely to the client, third parties, or environmental factors without any vendor ownership or shared accountability.

**Detection method**
- Scan risk text for patterns like "this risk is the client's responsibility," "subject to client readiness," "contingent on third-party timelines"
- If vendor bears no ownership of any risk, deflection is present

**Typical severity**
- Major

**Evaluator impact**
- Evaluators in regulated institutions understand that vendors share project risk
- Blanket deflection reads as an attempt to pre-emptively disclaim accountability
- Procurement and legal readers flag this as a contract and governance concern

**Fix pattern**
- Rewrite risks as shared-ownership items: what the vendor will do, what the client will need to do, and what the shared resolution path looks like
- Vendor may have legitimate dependency risks, but framing should express partnership, not avoidance

---

### K5. Risk overstatement

**Definition**
Risks are framed so heavily, or with such extensive caveats, that the proposal itself undermines confidence in the engagement.

**Detection method**
- Check whether risk language systematically uses the highest severity ratings, hedges every delivery statement, or adds so many qualifications that commitments become unreadable
- Ask: does a business sponsor reading this section come away feeling protected or alarmed?

**Typical severity**
- Moderate

**Evaluator impact**
- Business sponsors and decision-makers are reluctant to champion an engagement that sounds inherently dangerous
- Evaluators may interpret heavy hedging as covering for an internal belief that the engagement is poorly scoped

**Fix pattern**
- Calibrate risk language to actual likelihood and severity
- Use precise conditional language rather than blanket hedges
- Reserve the strongest language for genuinely high-severity items; standard dependency risks do not need catastrophic framing

---

## 22. Risk & Mitigation Defect Quick Reference

| Defect Code | Description | Typical Severity | Fix Priority |
|---|---|---|---|
| K1 | Absent risk section | Moderate-Major | 1 |
| K2 | Unmitigated risk listing | Moderate-Major | 2 |
| K3 | Risk symmetry failure | Moderate | 3 |
| K4 | Risk deflection | Major | 2 |
| K5 | Risk overstatement | Moderate | 4 |

---

## 23. Category L — Commercial & Pricing Defects

Commercial defects concern how the proposal presents cost, pricing rationale, contract scope, and total value. In enterprise financial services procurement, commercial clarity is often scored formally and is always scrutinised by finance and legal reviewers. A technically strong proposal can lose if commercial terms are absent, opaque, misaligned to the client's budget model, or structured to raise legal concern.

Commercial defects are distinct from compliance defects (wrong format) and honesty defects (factual overclaiming). These defects concern how the proposal reasons about cost, value, and commercial commitment.

---

### L1. Absent commercial model

**Definition**
The proposal contains no pricing section, cost estimate, or commercial framework when one is clearly expected.

**Detection method**
- Check whether the RFP requests a commercial response, indicative pricing, or rate card
- Look for any dedicated commercial, pricing, or investment section in the TOC
- If missing where expected, L1 applies

**Typical severity**
- Major to Critical
- Critical when pricing is an explicit RFP section with scoring weight

**Evaluator impact**
- Finance and procurement reviewers cannot complete formal evaluation without commercial input
- Signals poor procurement readiness or avoidance of the commitment question
- Budget sponsors cannot take the proposal to internal approval without a cost reference

**Fix pattern**
- Add a commercial section with: pricing model, indicative scope, basis for estimate, commercial conditions, and how to get to contract-ready pricing
- If exact pricing cannot be provided, explain the model and process for arriving at final numbers

---

### L2. Pricing without basis

**Definition**
A price or cost figure is provided with no explanation of what it covers, how it was calculated, or what assumptions it rests on.

**Detection method**
- Find any number, range, or fee structure in commercial content
- Check whether it is followed by: scope definition, assumption set, basis of calculation, exclusion list, and change-condition logic
- If the number stands alone, L2 applies

**Typical severity**
- Moderate to Major

**Evaluator impact**
- Finance reviewers treat unexplained numbers as negotiating bluffs or signs of poor scoping
- Legal reviewers flag unexplained pricing as a contract risk
- Comparison across vendors is impossible without a common basis

**Fix pattern**
- Add scope definition and explicit assumptions directly adjacent to any price figure
- State what is excluded and what would trigger a price change
- Where ranges are used, explain what drives the variance

---

### L3. Hidden commercial conditions

**Definition**
Material commercial conditions — volume thresholds, minimum contract terms, usage caps, auto-renewal clauses, or third-party licensing costs — are buried, omitted, or implied rather than stated clearly.

**Detection method**
- Scan commercial and scope sections for dependency language ("subject to," "above threshold," "after minimum term")
- Ask: would the client's finance and legal reviewers find anything surprising in a detailed read?
- If yes, conditions are hidden

**Typical severity**
- Major

**Evaluator impact**
- Surfaces late in negotiation as a trust failure
- Legal reviewers may recommend rejection if conditions appear evasive rather than disclosed
- Creates a credibility problem disproportionate to the commercial issue itself

**Fix pattern**
- State all material conditions explicitly in the commercial section
- Frame them honestly: "This pricing applies to the scope defined in Section X. Extensions, integrations with third-party custodians, and additional network deployments are priced separately."
- Transparency about conditions is a trust signal, not a weakness

---

### L4. TCO blindness

**Definition**
The proposal presents only direct licensing or implementation cost and ignores total cost of ownership considerations that the client will evaluate internally: integration effort, operational cost, staff training, ongoing maintenance, upgrade cycles, and compliance overhead.

**Detection method**
- Check whether the commercial section addresses only sticker price or also covers TCO-relevant factors
- Ask whether a client CFO reading this section could estimate the 3-year cost of deployment
- If the answer is no, TCO blindness applies

**Typical severity**
- Moderate to Major
- Major when evaluating against competitors who do address TCO

**Evaluator impact**
- Finance reviewers model full cost regardless; a proposal that helps them do so is easier to approve internally
- Business sponsors prefer vendors who have thought through operational cost — it signals experience with real deployment
- Missing TCO framing often leads to uncomfortable surprises during contract and onboarding

**Fix pattern**
- Add a brief TCO narrative: implementation cost, annual operational cost, estimated integration effort, upgrade model, and training scope
- Does not need to be exhaustive — a structured paragraph covering the main categories is sufficient
- Where costs are client-dependent, explain the factors that drive variance

---

### L5. Commercial misalignment

**Definition**
The pricing model or commercial structure is mismatched to the client's stated budget model, procurement approach, or commercial expectations.

**Examples**
- Offering a SaaS subscription to a client that runs on-premise and has capital budget only
- Proposing per-transaction pricing to a client that expects flat licensing
- Multi-year commitment pricing to a client that has only approved a pilot budget
- Licensing model that conflicts with the client's internal charge-back or cost-centre structure

**Detection method**
- Compare proposed commercial model to client context signals in the RFP: budget language, deployment model, procurement type, term preferences
- Ask whether the pricing structure could be adopted without requiring internal exceptions from the client's finance team

**Typical severity**
- Moderate to Major

**Evaluator impact**
- Finance reviewers flag misaligned models as integration problems, not just preferences
- Procurement teams sometimes disqualify on commercial structure before scoring content
- Business sponsors have to advocate for an exception to their internal budgeting system, which reduces internal championing

**Fix pattern**
- Adapt the commercial model to the client's stated or implied budget structure
- If flexibility is limited, acknowledge the client's model and explain how the proposed structure can accommodate it
- Where the client's commercial preference creates a genuine constraint, address it directly rather than hoping it will not be noticed

---

## 24. Commercial & Pricing Defect Quick Reference

| Defect Code | Description | Typical Severity | Fix Priority |
|---|---|---|---|
| L1 | Absent commercial model | Major-Critical | 1 |
| L2 | Pricing without basis | Moderate-Major | 2 |
| L3 | Hidden commercial conditions | Major | 2 |
| L4 | TCO blindness | Moderate-Major | 3 |
| L5 | Commercial misalignment | Moderate-Major | 2 |

---

## 25. Category M — Governance & Team Credential Defects

In regulated financial services procurement, evaluators do not just buy a product — they buy confidence in the people and governance structure delivering it. Governance and team credential defects are a distinct failure class: the proposal may describe strong capabilities but fails to convince evaluators that a qualified, accountable team with clear authority and controls will actually deliver them.

These defects are common because they require vendors to make commitments that feel exposing (named individuals, specific accountability, escalation paths). But the evaluators who matter most — risk committees, CISOs, COOs — look specifically for these signals.

---

### M1. Anonymous delivery team

**Definition**
The proposal commits to delivery but does not name the individuals who will lead or execute it. Roles may be described abstractly ("senior architect," "compliance lead") without names, seniority detail, or relevant experience.

**Detection method**
- Check whether the proposal names the delivery lead, programme manager, technical lead, and at minimum one subject-matter expert
- Generic role descriptions without names or project-specific CVs are M1 defects

**Typical severity**
- Moderate to Major
- Major in regulated financial services where personal accountability is a governance expectation

**Evaluator impact**
- Risk and compliance reviewers treat anonymous teams as an unverifiable commitment
- Business sponsors cannot due-diligence or reference-check unnamed individuals
- Perceived as hedging: the vendor has not committed anyone, so no one can be held accountable

**Fix pattern**
- Name the delivery lead and at least two other key roles
- Add brief bios focused on relevant project experience, not generic credentials
- If the final team is subject to confirmation, say so explicitly and commit to the governance process for finalising it

---

### M2. Credential mismatch

**Definition**
Team credentials are presented, but they do not match the context of this engagement. A profile may be impressive in isolation but irrelevant to the specific sector, technology, regulatory requirement, or use case being evaluated.

**Examples**
- Capital markets credentials for a retail banking engagement
- Blockchain-general experience cited for a regulated custody deployment
- Academic or research credentials where operational delivery experience is what evaluators need

**Detection method**
- Compare stated credentials against client sector, regulatory scope, and technical requirements
- Ask: would the evaluation committee recognise these credentials as directly relevant?

**Typical severity**
- Moderate

**Evaluator impact**
- Technical and risk evaluators question whether the team genuinely understands regulated operational environments
- Procurement may flag as a misrepresentation risk if credentials appear inflated to fit the opportunity

**Fix pattern**
- Curate credentials specifically for this engagement context
- Lead with the most directly relevant experience; general credentials can follow but should not dominate
- Explicitly connect credentials to the specific challenge or regulatory context the client faces

---

### M3. No governance structure

**Definition**
The proposal commits to delivery but does not describe how governance will be structured: no programme governance model, no decision-making authority, no steering committee, no escalation path.

**Detection method**
- Check whether the proposal describes: governance model (e.g., steering committee, working groups), meeting cadence, reporting structure, decision authority, and escalation chain
- If delivery is described as a process but authority and accountability structure are absent, M3 applies

**Typical severity**
- Moderate to Major
- Major in regulated environments where governance documentation is a formal evaluation criterion

**Evaluator impact**
- Risk and operations reviewers need to understand how decisions are made and who can be held accountable
- Absence of governance suggests the vendor has not thought through the operational reality of managing a complex regulated deployment
- Procurement and legal reviewers use governance structure as a proxy for vendor maturity

**Fix pattern**
- Add a brief governance section: proposed governance model, steering committee composition, escalation path, reporting cadence, and decision authority for scope changes
- Diagrams are useful but not required — a clear prose or table description is sufficient

---

### M4. Key person risk unaddressed

**Definition**
The proposal relies on named individuals in critical roles without acknowledging what happens if those individuals are unavailable during delivery.

**Detection method**
- Identify all named roles with significant delivery responsibility
- Check whether the proposal addresses: backup or coverage planning, knowledge transfer protocols, or how continuity is guaranteed if key personnel change

**Typical severity**
- Minor to Moderate
- Moderate in long-horizon regulated deployments where personnel continuity is a material risk

**Evaluator impact**
- Risk reviewers in financial institutions routinely flag single-point-of-failure dependencies
- For multi-year engagements, absence of key person risk planning signals poor delivery maturity
- Legal may request contractual commitments on personnel continuity if the proposal does not pre-empt this concern

**Fix pattern**
- Acknowledge key person dependency explicitly and describe the coverage model
- Identify backup or shadow roles for delivery-critical positions
- State the knowledge management approach: documentation standards, handover protocols, and minimum team bench depth

---

### M5. Vendor governance authority gap

**Definition**
The proposal implies delivery authority that the vendor does not hold or cannot guarantee in practice. Common examples: commitments that require client-side action to fulfil, integrations that depend on third parties the vendor does not control, or timelines that assume client resources are fully available.

**Detection method**
- Scan for commitments using vendor-controlled language ("we will," "we deliver," "we guarantee") that actually depend on client or third-party action
- Ask: which of these commitments could the vendor fulfil unilaterally, and which require conditions the vendor does not control?

**Typical severity**
- Moderate to Major

**Evaluator impact**
- Risk and legal reviewers challenge commitments that exceed the vendor's actual authority
- Business sponsors feel misled when delivery timelines slip due to dependencies that were not disclosed
- Creates a contract risk: vendor commitments that depend on uncontrollable variables are difficult to enforce and easy to dispute

**Fix pattern**
- Distinguish clearly between vendor-owned commitments and shared-dependency commitments
- For shared dependencies: name the dependency, describe the governance mechanism, and assign joint accountability
- Frame shared risks as a delivery partnership, not a vendor promise with hidden conditions

---

## 26. Governance & Team Credential Defect Quick Reference

| Defect Code | Description | Typical Severity | Fix Priority |
|---|---|---|---|
| M1 | Anonymous delivery team | Moderate-Major | 2 |
| M2 | Credential mismatch | Moderate | 3 |
| M3 | No governance structure | Moderate-Major | 1 |
| M4 | Key person risk unaddressed | Minor-Moderate | 4 |
| M5 | Vendor governance authority gap | Moderate-Major | 2 |

---

## 27. Category N — Delivery Plan & Timeline Defects

Delivery plan defects concern how the implementation timeline, milestone structure, phase sequencing, and delivery dependency logic are presented. This category is distinct from Risk & Mitigation (K) and Governance (M): K covers what could go wrong and how it is handled; M covers accountability and governance structure; N covers whether the proposed delivery plan is credible, complete, and testable.

In regulated financial services deployments — DALP's primary market — implementation timelines receive detailed scrutiny from IT, operations, programme management, and risk reviewers who evaluate whether the plan reflects genuine delivery experience or is a placeholder structure with dates attached.

---

### N1. Milestone-free timeline

**Definition**
The proposal presents a delivery timeline with dates or phases but no defined milestones or deliverables. The reader can see when phases begin and end but cannot determine what is completed at each point.

**Examples**
- A Gantt chart showing Phase 1 (Weeks 1–4), Phase 2 (Weeks 5–8), Phase 3 (Weeks 9–12) with no description of what is produced or verified at each stage boundary
- A timeline narrative that states "implementation will take twelve weeks" without specifying interim delivery points
- Phase labels like "Discovery," "Build," "Test" with no output or exit criterion attached

**Detection method**
- Scan all timeline, Gantt, and phase descriptions for named deliverables at each phase boundary
- Ask: could the client's project team use this timeline to track progress? If not, milestones are absent or insufficient.

**Typical severity**
- Moderate
- Major in regulated environments where programme management offices require milestone-based reporting

**Evaluator impact**
- Operations and programme management reviewers treat milestone-free timelines as a signal that the vendor has not planned delivery in earnest
- Risk reviewers cannot map contingency or escalation triggers to specific delivery events
- Client project leads have no basis for internal resourcing, approval, or communication planning

**Fix pattern**
- Define at least one named deliverable or verifiable output per phase boundary
- For complex implementations, break phases into two-to-four-week milestone increments
- Name the artefact (e.g., "signed design document," "completed UAT sign-off," "go-live report") rather than using activity labels

---

### N2. Dependency blindness

**Definition**
The delivery plan presents phases or milestones as sequential or parallel without acknowledging the dependencies that determine whether sequencing is achievable. Phases are shown as flowing smoothly from one to the next without identifying what must be true before each phase can begin.

**Examples**
- Integration phase scheduled for Week 6 without noting that client API access must be provisioned before it can start
- UAT phase planned for four weeks without noting it requires client acceptance resources to be available
- Go-live date set without specifying what client sign-offs, regulatory notifications, or third-party readiness conditions must be met in advance

**Detection method**
- For each phase transition, ask: what conditions must be satisfied before this phase can begin?
- Check whether the timeline distinguishes between vendor-controlled dependencies and client- or third-party-controlled dependencies
- If all transitions are frictionless, dependency blindness likely applies

**Typical severity**
- Moderate to Major

**Evaluator impact**
- Technical and operations reviewers with delivery experience immediately identify unacknowledged dependencies as a sign that the vendor has not thought through the client's operational context
- Risk reviewers treat hidden dependencies as undisclosed risks that will materialise as timeline slippage
- Legal may flag commitment language ("we will deliver by Week X") as overexposed if the commitment depends on conditions the vendor does not control

**Fix pattern**
- Add an explicit dependency section or annotate phase entry conditions in the timeline
- Distinguish vendor-owned dependencies from shared or client-owned dependencies
- Where critical dependencies exist, state the lead time required and the mechanism for confirming readiness

---

### N3. Phase exit criteria absent

**Definition**
The delivery plan moves between phases without defining what must be completed, accepted, or verified before the next phase begins. Phases flow forward without a named exit gate or acceptance condition.

**Examples**
- "Phase 1 will be followed by Phase 2" with no description of what makes Phase 1 complete
- A UAT phase with no definition of pass criteria, defect thresholds, or sign-off authority
- Go-live described as the end of implementation with no acceptance test, pilot period, or stabilisation gate

**Detection method**
- For each phase boundary, ask: what is the named definition of done?
- Check whether acceptance criteria, sign-off authority, or quality gates are specified at phase transitions
- If the plan describes activity without completion tests, N3 applies

**Typical severity**
- Moderate
- Major in regulated environments where phase acceptance is a compliance or audit requirement

**Evaluator impact**
- Programme management and risk reviewers require phase gates to maintain control of scope and quality
- Absence of exit criteria signals the vendor manages delivery by activity completion, not by outcome verification
- In regulated financial services, unverified phase transitions create audit exposure: if no acceptance record exists, the delivery cannot be formally closed

**Fix pattern**
- Add a named exit criterion to each phase: the specific output, acceptance test, or sign-off that marks completion
- For regulated contexts, align exit criteria to audit requirements (e.g., signed UAT report, formal go-live approval, documented rollback test result)
- Keep criteria brief but testable: "signed design document approved by client technical lead" is sufficient

---

### N4. Client readiness assumption

**Definition**
The proposed timeline is achievable only if the client's resources, infrastructure, data, approvals, or decision processes are fully available from day one. The plan makes no allowance for client preparation time, internal mobilisation, or regulatory pre-notification requirements.

**Examples**
- Week 1 kickoff assumes client project team is fully identified and available, with no mobilisation period
- Integration phase assumes client API documentation is ready and access is provisioned before vendor engagement begins
- Regulatory notification or internal risk approval treated as a background task with no timeline impact
- Data migration phase scheduled without accounting for client data quality assessment or cleansing

**Detection method**
- Identify all activities that require client readiness as a precondition
- Ask: does the timeline include a pre-engagement mobilisation phase or explicitly acknowledge client preparation time?
- Check whether regulatory, legal, or internal approval timelines are reflected in the schedule

**Typical severity**
- Moderate to Major
- Major in complex regulated deployments where client mobilisation and regulatory pre-work typically extend timelines by four to eight weeks

**Evaluator impact**
- Experienced procurement and operations reviewers treat client-readiness-blind timelines as unrealistic and flag them as a commercial risk
- IT and data reviewers know that infrastructure provisioning and data quality assessment have lead times that do not compress to fit a vendor's preferred schedule
- Proposing a timeline that ignores client preparation burden can signal that the vendor is setting up to claim client delays as a reason for slippage

**Fix pattern**
- Add a pre-engagement or mobilisation phase that explicitly accounts for client preparation activities
- Name the client-side prerequisites and provide a realistic time estimate for each
- Frame shared mobilisation as a joint activity with named responsibilities on both sides

---

### N5. Unrealistic phase compression

**Definition**
The proposed timeline compresses phases to a duration that is inconsistent with the known complexity of the work, the size of the technical environment, or the client's regulatory context. The timeline appears designed to win the engagement rather than to reflect delivery reality.

**Examples**
- Full integration with a core banking system scoped to two weeks
- Compliance configuration and testing for a regulated custody product scoped to one sprint
- End-to-end UAT with a large client team scoped to three days
- A twelve-week delivery timeline for a scope that comparable engagements take six to nine months

**Detection method**
- Compare phase durations against known benchmarks for comparable deployments
- Ask: could a delivery team of this size complete this scope in the stated time under normal operating conditions?
- Look for compression signals: phases with no buffer, parallel workstreams with no resourcing explanation, or testing phases shorter than one week for non-trivial systems

**Typical severity**
- Major to Critical
- Critical when the timeline underpins a contractual milestone structure or when the client has a hard regulatory deadline

**Evaluator impact**
- Technical and delivery reviewers with relevant experience identify compressed timelines immediately; they signal that the vendor either lacks experience or has not engaged seriously with scope
- Risk reviewers treat unrealistic timelines as a predictor of delay-related cost overruns and contractual disputes
- Procurement may reduce or eliminate confidence scores for proposals where the timeline cannot be defended under scrutiny

**Fix pattern**
- Ground the timeline in comparable delivery experience: reference a similar engagement and its actual duration
- If the timeline is deliberately aggressive, explain the specific conditions that make it achievable and the contingency mechanism if those conditions are not met
- Avoid compressing buffer and testing phases to hit a headline date; experienced evaluators know where compression lives and will find it

---

## 28. Delivery Plan & Timeline Defect Quick Reference

| Defect Code | Description | Typical Severity | Fix Priority |
|---|---|---|---|
| N1 | Milestone-free timeline | Moderate-Major | 2 |
| N2 | Dependency blindness | Moderate-Major | 1 |
| N3 | Phase exit criteria absent | Moderate-Major | 2 |
| N4 | Client readiness assumption | Moderate-Major | 3 |
| N5 | Unrealistic phase compression | Major-Critical | 1 |

---

## Category O — Integration & Technical Architecture Defects

Integration and technical architecture failures are distinct from general technical credibility (Category E) and delivery timeline (Category N) defects. They concern whether the proposed solution design is credible, complete, and honest about how it connects to the client's existing environment. In regulated financial services, integration is where most deployment friction occurs: core banking interfaces, custody bridges, payment rails, identity providers, and data feeds each carry their own protocol, latency, and failure-mode constraints. A proposal that describes integration as a confident paragraph rather than a testable plan signals that the vendor has not engaged with the client's real technical landscape.

---

### 29. Integration & Technical Architecture Defect Types

---

### O1. Abstract integration claim

**Definition**
The proposal claims integration with one or more client systems but describes the mechanism in generic terms only. No protocol, API type, message format, data mapping approach, or integration pattern is named. The claim reads as a capability statement rather than a design statement.

**Examples**
- "DALP integrates seamlessly with your core banking system" with no mention of API type, data flow direction, or interface contract
- "Our platform connects to existing custody providers" without naming which custody protocols or adapter patterns are used
- "We support standard payment rails" with no reference to specific schemes, message standards (ISO 20022, SWIFT MT), or settlement windows

**Detection method**
- For each integration claim, ask: could an integration architect verify this claim without asking a follow-up question?
- Check whether the description names at least one concrete element: protocol, API version, message format, data mapping, or adapter mechanism
- If the integration is described using only adjectives (seamless, robust, flexible, native) and no nouns (REST API, webhook, SFTP, ISO 20022), O1 applies

**Typical severity**
- Moderate when the integration is peripheral to the core solution
- Major when the integration is a critical path dependency (core banking, custody, payment rails, identity)

**Evaluator impact**
- Technical assessors treat abstract integration claims as unverified assumptions and will flag them during clarification
- IT architecture reviewers need interface specifics to assess operational risk; generic claims force them to score conservatively
- Procurement evaluators who have seen failed integrations weight this heavily: "seamless" is a red flag, not a reassurance

**Fix pattern**
- Replace adjective-driven claims with mechanism-driven descriptions: name the API type, data flow direction, expected message format, and error handling approach
- For critical integrations, include a lightweight interface diagram or table showing: source system, target system, protocol, data payload, frequency, and failure mode
- If integration details depend on client-side discovery, state that explicitly and describe the discovery process

---

### O2. Missing solution architecture view

**Definition**
The proposal describes capabilities and features but provides no architectural view showing how components relate, where data flows, or how the solution maps to the client's environment. The reader cannot form a mental model of how the system works as a whole.

**Examples**
- A proposal that describes DALP's modules (issuance, servicing, custody, compliance) without showing how they interact or depend on each other
- A technical section that lists features per requirement but never provides a component diagram, data flow, or deployment topology
- An architecture section that contains a single marketing diagram copied from the product website rather than a client-specific solution view

**Detection method**
- Ask: does the proposal contain at least one diagram or structured description that shows components, their relationships, and data flow direction?
- Check whether the architecture view is generic (product marketing) or client-specific (shows the client's systems, integration points, and deployment context)
- If the technical section can be understood only by reading each subsection independently with no holistic view, O2 applies

**Typical severity**
- Major in any enterprise proposal
- Critical in complex regulated deployments where architecture review is a formal evaluation criterion

**Evaluator impact**
- Technical assessors cannot score architecture quality without a visual or structured view; they will either score conservatively or defer judgment to clarification
- Risk and compliance reviewers need the architecture view to assess data residency, access control boundaries, and audit trail coverage
- The absence of a solution architecture view is often interpreted as the vendor not having done the design work, regardless of how strong the prose is

**Fix pattern**
- Add a solution architecture diagram showing: DALP components, client systems, integration points, data flow direction, and deployment boundary
- Ensure the diagram is client-specific, not a generic product overview: label the client's named systems and show where they connect
- Supplement the diagram with a brief narrative explaining the design decisions and trade-offs

---

### O3. Environment assumption without validation

**Definition**
The proposed solution assumes a specific client infrastructure, network configuration, cloud provider, or runtime environment without confirming that the assumption holds or describing what happens if it does not.

**Examples**
- A deployment plan that assumes Kubernetes availability without confirming the client operates container orchestration
- A cloud-native architecture proposed to a client whose RFP mentions on-premises requirements or hybrid constraints
- HSM integration described assuming a specific vendor (e.g., Thales Luna) without confirming the client's HSM estate
- Performance claims based on infrastructure specifications that the client has not confirmed

**Detection method**
- List every infrastructure assumption in the proposal: cloud provider, runtime, network topology, HSM, database, identity provider
- For each assumption, ask: does the proposal confirm this against the RFP or state it as an assumption with a validation step?
- If the proposal proceeds as though the environment is known without citing the source of that knowledge, O3 applies

**Typical severity**
- Moderate when the assumption is easily correctable (e.g., a configuration flag)
- Major when the assumption drives architecture decisions that are expensive to reverse (e.g., cloud-native vs on-premises, HSM vendor lock)

**Evaluator impact**
- IT infrastructure reviewers catch environment assumptions immediately because they know their own estate
- Unvalidated assumptions signal that the vendor is proposing a standard deployment rather than a tailored solution
- In regulated contexts, incorrect environment assumptions can create compliance exposure (e.g., data residency, key management jurisdiction)

**Fix pattern**
- State each environment assumption explicitly and label it as "confirmed from RFP" or "assumption pending validation"
- For critical infrastructure assumptions, describe the validation step and what the fallback architecture looks like if the assumption is wrong
- Never present an environment assumption as a fact unless the RFP or client communication confirms it

---

### O4. Security architecture gap

**Definition**
The proposal describes functional capabilities but omits or underspecifies the security architecture: access control model, key management, audit trail, encryption at rest and in transit, or network segmentation. Security is treated as an implicit property of the platform rather than an explicit design element.

**Examples**
- A custody solution described without mentioning key management, HSM integration, or signing ceremony procedures
- RBAC/ABAC mentioned as a feature but no description of how roles map to the client's organisational structure
- Audit trail described as "comprehensive" without specifying what events are logged, retention period, or tamper-evidence mechanism
- No mention of encryption standards, certificate management, or network segmentation in a multi-tenant or hybrid deployment

**Detection method**
- For each major capability, ask: where is the security boundary described?
- Check whether access control, key management, audit, and encryption are described as design elements or merely listed as features
- If a CISO or security architect would need to request a separate security review to understand the proposal's security posture, O4 applies

**Typical severity**
- Major in any financial services proposal
- Critical when the RFP includes explicit security evaluation criteria or when the solution handles key management, custody, or PII

**Evaluator impact**
- CISO and security reviewers will not accept feature-level security claims; they require architecture-level detail to assess risk
- Compliance reviewers need explicit security controls to map against regulatory frameworks (MiCA, DORA, SOC2, ISO 27001)
- A security gap in the proposal creates a perception of security immaturity that is difficult to recover from in clarification

**Fix pattern**
- Add a dedicated security architecture section or embed security design into each capability section
- For key management: name the approach (HSM-backed, software vault, cloud KMS), key hierarchy, and ceremony process
- For access control: describe the model (RBAC, ABAC), how roles are provisioned, and how the model maps to the client's org structure
- For audit: specify logged events, retention, tamper-evidence, and export mechanism

---

### O5. Non-functional requirement silence

**Definition**
The proposal addresses functional requirements but is silent on non-functional requirements: performance, availability, scalability, disaster recovery, monitoring, or SLA commitments. The evaluator cannot determine whether the solution will operate reliably at the client's expected scale and continuity requirements.

**Examples**
- No mention of availability targets, failover mechanism, or RTO/RPO for a platform handling live financial instruments
- Performance described as "high-performance" or "scalable" without throughput numbers, latency targets, or load test evidence
- Monitoring described as "included" without naming the observability stack, alerting thresholds, or escalation procedures
- Disaster recovery absent or described as "standard" without naming the DR strategy, test frequency, or recovery validation

**Detection method**
- Check whether the proposal addresses: availability (SLA, failover), performance (throughput, latency, load), scalability (growth model), DR (strategy, RTO/RPO, test frequency), and monitoring (stack, alerts, dashboards)
- For each non-functional area, ask: does the proposal provide a testable commitment or just an adjective?
- If the client's RFP specifies non-functional requirements and the proposal does not address them explicitly, O5 applies

**Typical severity**
- Moderate when the RFP does not emphasise non-functional requirements
- Major to Critical when the RFP specifies SLA targets, DR requirements, or performance benchmarks

**Evaluator impact**
- Operations and infrastructure reviewers evaluate non-functional requirements as indicators of operational maturity
- Risk reviewers treat the absence of DR and availability commitments as a material risk
- Procurement may treat non-functional silence as non-compliance if the RFP explicitly requested these specifications

**Fix pattern**
- Add a non-functional requirements section or embed NFR responses alongside each functional capability
- Provide specific, testable commitments: "99.9% monthly availability with automated failover in under 60 seconds" rather than "high availability"
- For monitoring: name the stack (e.g., Grafana, VictoriaMetrics, Loki) and describe alerting thresholds and escalation
- For DR: name the strategy, RTO/RPO targets, test frequency, and most recent test result if available

---

## 30. Integration & Technical Architecture Defect Quick Reference

| Defect Code | Description | Typical Severity | Fix Priority |
|---|---|---|---|
| O1 | Abstract integration claim | Moderate-Major | 2 |
| O2 | Missing solution architecture view | Major-Critical | 1 |
| O3 | Environment assumption without validation | Moderate-Major | 2 |
| O4 | Security architecture gap | Major-Critical | 1 |
| O5 | Non-functional requirement silence | Moderate-Critical | 1 |

### Architecture severity escalators

Escalate any Category O defect by one level when one or more of these conditions applies:
- the affected integration touches cash movement, custody, transfer-agent records, or another legally consequential system of record
- the proposal claims straight-through processing, real-time synchronization, or high availability without naming failure handling or recovery behaviour
- a security or environment assumption would force redesign after contract award rather than a configuration change during delivery
- the client RFP explicitly scores architecture, security, resiliency, or deployment topology as a weighted criterion

Why this matters: architecture defects stop being ordinary technical gaps when they affect control boundaries, operating continuity, or evaluable non-functional commitments. These escalators help reviewers distinguish a fixable design omission from a shortlist-threatening credibility failure.

---

## 31. Category P — Transition & Migration Defects

Transition and migration defects concern how the proposal addresses the move from the client's current state to the proposed solution. In regulated financial services, migration is rarely greenfield: the client has live systems, existing data, running processes, regulatory obligations, and contractual commitments that must be preserved, transformed, or decommissioned during transition. A proposal that describes the target state without credibly addressing the journey from the current state signals that the vendor has not engaged with the operational reality of deployment.

These defects are distinct from delivery timeline (N), which concerns whether the plan is realistic and milestone-structured; integration architecture (O), which concerns whether the solution design connects credibly to the client's environment; and risk treatment (K), which concerns how uncertainty is handled. Category P specifically concerns whether the proposal demonstrates a credible, safe, and auditable path from the client's current operations to the proposed solution.

---

### P1. Migration plan absent

**Definition**
The proposal describes the target solution but includes no plan for how the client transitions from their current systems, processes, and data to the new state. Migration is either unmentioned or dismissed with a single sentence ("we will handle migration as part of implementation").

**Detection method**
- Check whether the proposal addresses: data migration scope, system cutover approach, parallel-run period, rollback mechanism, and decommissioning of legacy systems
- Ask: could the client's operations team read this proposal and understand how they get from today to go-live without disruption?
- If migration is absent or compressed into a sub-bullet of the implementation plan, P1 applies

**Typical severity**
- Major in any enterprise deployment involving live systems
- Critical when the client explicitly mentions migration, data continuity, or parallel-run requirements in the RFP

**Evaluator impact**
- Operations and IT reviewers treat migration absence as a signal that the vendor does not understand the client's operational constraints
- Risk reviewers flag the gap as an undisclosed delivery risk: migration is where most deployment failures actually occur
- Business sponsors who manage the current process need to see how continuity is maintained; absence creates anxiety about disruption

**Fix pattern**
- Add a dedicated migration section covering: scope assessment, data mapping and transformation approach, cutover strategy (big-bang vs phased), parallel-run period, rollback plan, and post-migration validation
- Even when full migration planning requires discovery, describe the methodology and the deliverables the migration plan will produce

---

### P2. Data migration without quality assessment

**Definition**
The proposal commits to data migration but does not address data quality, completeness, or transformation requirements. Data is treated as a frictionless transfer rather than a process that requires assessment, cleansing, mapping, and validation.

**Detection method**
- Check whether the data migration section mentions: source data assessment, data quality baseline, transformation rules, field-level mapping, validation criteria, and data reconciliation method
- If data migration is described as "extract, transform, load" without addressing what happens when source data is incomplete, inconsistent, or structurally incompatible, P2 applies

**Typical severity**
- Moderate to Major
- Major in regulated financial services where data accuracy has compliance and audit implications

**Evaluator impact**
- Technical reviewers who have managed data migrations know that data quality is the primary source of delay and defect
- Compliance reviewers need assurance that migrated data will meet regulatory accuracy and completeness requirements
- Operations reviewers treat frictionless data migration claims as a warning sign of inexperience

**Fix pattern**
- Add a data quality assessment phase before migration execution: profiling, gap analysis, cleansing rules, and acceptance criteria
- Describe the reconciliation method: how will the client verify that migrated data is complete and accurate?
- State who owns data quality remediation (vendor, client, or shared) and what the escalation path is for data issues discovered during migration

---

### P3. No parallel-run or cutover strategy

**Definition**
The proposal moves from implementation to go-live without describing how the transition occurs operationally: no parallel-run period, no cutover strategy, no description of how the client switches from old to new without service disruption or regulatory exposure.

**Detection method**
- Check whether the proposal describes: cutover approach (big-bang, phased, parallel-run), duration of any overlap period, criteria for cutting over, and what happens if cutover fails
- If go-live appears as a date on a timeline with no operational transition description, P3 applies

**Typical severity**
- Moderate to Major
- Major in regulated environments where service continuity during transition is a regulatory and contractual obligation

**Evaluator impact**
- Operations reviewers need to plan staff allocation, process changes, and communication for the transition period; without a cutover strategy, internal planning cannot begin
- Risk and compliance reviewers treat the absence of a parallel-run or cutover plan as an undisclosed operational risk
- In regulated financial services, abrupt cutover without a fallback mechanism may violate operational resilience requirements

**Fix pattern**
- Describe the cutover strategy explicitly: big-bang (with rollback plan), phased (with scope per phase), or parallel-run (with duration and exit criteria)
- For regulated deployments, prefer parallel-run with explicit exit criteria over big-bang cutover
- Name the rollback mechanism: what happens if the cutover fails and how quickly can the client revert to the previous state

---

### P4. Legacy decommissioning ignored

**Definition**
The proposal describes the new solution without addressing what happens to the systems, data, and processes it replaces. Legacy decommissioning is treated as out of scope or simply not mentioned, leaving the client with an implicit obligation to manage two environments indefinitely.

**Detection method**
- Ask: does the proposal mention what happens to the client's existing systems after the new solution is live?
- Check whether decommissioning scope, timeline, data archival, and regulatory retention obligations are addressed
- If the proposal describes only the target state and never the retirement of the current state, P4 applies

**Typical severity**
- Minor to Moderate
- Moderate when the client's RFP explicitly asks about transition from existing systems or when dual-running costs are a budget concern

**Evaluator impact**
- Finance reviewers note that dual-running systems incur ongoing cost; a proposal that ignores decommissioning appears to ignore TCO reality
- Compliance reviewers need to understand data retention and archival obligations for the legacy system during and after transition
- Operations reviewers who manage current systems want to understand when they can redirect resources

**Fix pattern**
- Add a brief decommissioning section: scope of legacy retirement, recommended timeline relative to go-live stabilisation, data archival and retention approach, and any regulatory considerations for maintaining access to historical records
- If decommissioning is genuinely out of scope, state that explicitly and recommend the client plan for it as a parallel workstream

---

### P5. Regulatory continuity gap

**Definition**
The proposal does not address how regulatory obligations are maintained during the transition period. In regulated financial services, the client cannot have a gap in regulatory reporting, audit trail continuity, or compliance controls while moving between systems. A transition that creates a regulatory blind spot is not just a delivery risk; it is a compliance failure.

**Detection method**
- Ask: during the transition from old to new system, is there a period where regulatory reporting, audit logging, or compliance controls could be interrupted or degraded?
- Check whether the proposal describes how regulatory obligations are maintained during parallel-run, cutover, and post-migration stabilisation
- If the proposal treats regulatory continuity as an automatic property of the new system rather than an explicit transition concern, P5 applies

**Typical severity**
- Major to Critical in regulated financial services
- Moderate in contexts with lighter regulatory oversight

**Evaluator impact**
- Compliance and risk reviewers treat regulatory continuity gaps as potential non-compliance events, not just operational inconveniences
- Legal reviewers assess whether the transition plan creates contractual exposure under existing regulatory commitments
- Audit reviewers need to verify that the audit trail is continuous across the old and new systems with no gaps or inconsistencies

**Fix pattern**
- Describe explicitly how regulatory reporting, audit trail, and compliance controls are maintained during each transition phase
- For parallel-run periods, specify which system is the regulatory system of record and how reconciliation works
- Address audit trail continuity: how historical records from the old system are accessible alongside new system records, and whether the combined audit trail meets regulatory retention requirements

---

## 32. Transition & Migration Defect Quick Reference

| Defect Code | Description | Typical Severity | Fix Priority |
|---|---|---|---|
| P1 | Migration plan absent | Major-Critical | 1 |
| P2 | Data migration without quality assessment | Moderate-Major | 2 |
| P3 | No parallel-run or cutover strategy | Moderate-Major | 2 |
| P4 | Legacy decommissioning ignored | Minor-Moderate | 4 |
| P5 | Regulatory continuity gap | Major-Critical | 1 |

### Transition severity escalators

Escalate any Category P defect by one level when one or more of these conditions applies:
- the transition changes the system of record for regulated data, transaction history, or investor registers
- cutover involves irreversible data transformation or one-way reconciliation logic
- the client has limited change windows, hard market deadlines, or regulator-visible blackout constraints
- multiple counterparties, custodians, or downstream reporting systems must remain synchronized during the move
- rollback is described as available but no time-to-recover, decision authority, or fallback operating mode is defined

Why this matters: migration defects become materially more dangerous when the transition touches legal books of record, operational continuity, or externally visible reporting. These escalators help reviewers distinguish a normal implementation weakness from a submission-level risk that should push severity to Major or Critical.
