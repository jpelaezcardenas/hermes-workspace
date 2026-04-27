# Bid Draft Defect Taxonomy
This file gives the bid-manager a practical vocabulary for catching and fixing defects while drafting. Use it during writing, not after the document is already “finished.” The point is simple: name the problem early, repair it fast, and keep weak text from reaching bid-checker.
This is a writer-facing guide, not a scoring rubric. It is a self-editing system for turning rough sections into submission-safe sections.
Primary drafting impact: **Requirement Coverage**, **Technical Credibility**, **Writing Quality**, **Document Flow & Structure**, **Honesty & Transparency**, and **IP & Confidentiality**.
Cross-reference: `setup/writing-standards.md`, `setup/structure-patterns.md`, `setup/ip-checklist.md`, `setup/persuasion-framework.md`, `setup/reading-psychology.md`.

---
## 1. How to use this taxonomy while drafting
When you finish any section, run four checks:
1. **Did I answer the actual requirement?**
2. **Did I prove the answer, or only state it?**
3. **Can an evaluator find the answer quickly?**
4. **Did I introduce risk through overclaiming, vagueness, or leakage?**
Every defect entry below uses the same lens:
- **What it looks like**: symptoms in your draft
- **Why it hurts**: how it weakens evaluator trust, scoring, or comprehension
- **How to fix it**: the fastest reliable repair pattern
Use this at three moments:
- **During first draft**: catch missing sections, stop generic filler, make sure each section has a job
- **During expansion**: turn thin answers into persuasive ones, attach evidence close to claims, tighten logic before polish
- **During final self-edit**: remove patchwork voice, surface proof earlier, scrub internal terms and metadata risks
### Severity labels for writers
- **Blocker**: must fix before submission; leaving it in creates material risk
- **Major**: significantly weakens the section or damages trust
- **Minor**: worth fixing; cumulative if repeated
- **Watch**: not automatically wrong, but monitor the pattern closely
### Severity is contextual
A vague sentence in a low-stakes background paragraph may be minor. The same vague sentence in a compliance claim, delivery timeline, or security statement can be a blocker.
### Defects stack
One weak sentence is often survivable. A section that combines vague claims, no evidence, passive voice, and buried proof will feel unconvincing even if every line is technically harmless.

---
## 2. Drafting principles behind the taxonomy
A strong section usually follows this pattern:
1. **State the client issue or requirement**
2. **Answer it clearly**
3. **Explain how DALP / SettleMint addresses it**
4. **Support the claim with evidence or mechanism**
5. **Qualify honestly where needed**
6. **Make the implication easy to score**
Most weak sections fail because one of those moves is missing, buried, or distorted.
### Default repair order
1. **IP / confidentiality / compliance risks**
2. **Honesty and capability clarity defects**
3. **Missing content or missing requirement response**
4. **Logic and evidence problems**
5. **Structure and retrieval problems**
6. **Style and sentence-level polish**
Pretty prose does not save a section that is unsafe, untrue, or incomplete.

---
## 3. Category A: Content defects
Content defects concern what is missing, too thin, unproven, overstated, or badly weighted.
### A1. Missing section
**Severity**
- Usually **Blocker** if the client expects it
- Sometimes **Major** if the section is strategically necessary but not explicitly named
**What it looks like**
- No direct section for a required topic
- A core evaluator question is only half-answered in unrelated paragraphs
- The table of contents skips something obvious: implementation approach, governance, security, migration, support, pricing logic, gap disclosure, or executive summary
**Why it hurts**
- Evaluators read absence as weakness or lack of control
- Procurement readers may score it as non-response
- Technical and risk readers assume you are hiding a gap or do not understand the requirement
**How to fix it**
- Add a dedicated section with a discoverable heading
- Answer the topic directly instead of smuggling it into another section
- If DALP only partially covers the area, state the boundary honestly and explain the workable path
**DALP / SettleMint example**
If the client asks for operational governance and the draft only mentions “enterprise readiness” in a capabilities section, that is still a missing section. Fix it by adding a clear governance section: roles, controls, operating model, auditability, and escalation structure.
### A2. Thin answer
**Severity**
- Usually **Major** in scored sections
- **Minor** only in low-stakes context paragraphs
**What it looks like**
- One short paragraph answers a complex requirement
- The section says “yes” without showing how
- The wording sounds complete, but the reader still has obvious follow-up questions
- The answer is summary without explanation
**Why it hurts**
- Thin answers feel evasive or templated
- Evaluators cannot tell whether the team truly understands the issue
- Weak depth creates doubt even when the underlying capability is real
**How to fix it**
- Expand with this sequence: **answer → mechanism → evidence → qualification → relevance**
- Add one concrete operational detail, one proof item, and one client-relevant implication
- If the requirement is broad, break it into sub-points and answer each explicitly
**DALP / SettleMint example**
Bad:
> DALP supports lifecycle management across complex digital asset workflows.
Better:
> DALP supports lifecycle management through configurable workflows, policy-driven controls, and auditable state transitions across issuance, servicing, transfer, and event handling. In this proposal, that matters because the client needs controlled progression from asset creation through ongoing administration without manual reconciliation across disconnected tools.
### A3. Missing evidence block
**Severity**
- Usually **Major**
- **Blocker** in security, compliance, integration, or performance claims
**What it looks like**
- Strong claims with no proof cluster
- Feature description without architecture, controls, benchmarks, references, case evidence, or operating mechanics
- Assertions carrying the section by themselves
**Why it hurts**
- Readers may accept the words but not believe them
- Technical evaluators downgrade confidence fast when claims travel alone
- Business readers often sense weakness even if they cannot name it
**How to fix it**
- Add proof close to the claim, not three pages later
- Use one of these evidence forms: mechanism explanation, architecture note, benchmark with context, reference or comparable deployment, controls table, worked example
- Make the proof visibly part of the argument, not decorative filler
**DALP / SettleMint example**
If you claim DALP supports configurable compliance controls, do not stop there. Follow with the mechanism: policy configuration, rules enforcement, auditable workflow, and how that maps to the client’s operating model.
### A4. Content imbalance
**Severity**
- Usually **Major**
- **Minor** only if corrected early
**What it looks like**
- Several pages on company background, little on delivery or governance
- Long capability tour, thin treatment of implementation dependencies
- Attractive marketing content gets space; hard proof gets squeezed
**Why it hurts**
- It tells evaluators you misread what matters
- Important sections feel underpowered even if the document is long
- Scoring weight and document emphasis drift apart
**How to fix it**
- Compare section length to client priorities and scoring criteria
- Compress boilerplate aggressively
- Reallocate space to response-critical sections: requirement coverage, delivery model, controls, integration, migration, security, commercial logic
**DALP / SettleMint example**
A bid that spends more space on “who SettleMint is” than on how DALP will be implemented in the client’s environment is badly weighted. That is not a branding issue. It is a scoring issue.

---
## 4. Category B: Logic defects
Logic defects concern whether the section actually holds together. A polished paragraph with broken logic is still broken.
### B1. Non sequitur
**Severity**
- Usually **Major**
**What it looks like**
- The conclusion does not naturally follow from the evidence given
- One fact is used to justify a broader claim than it supports
- The paragraph sounds smooth, but the reasoning jumps
**Why it hurts**
- Analytical readers spot the jump and stop trusting the section
- It creates quiet distrust even when no one comments on it directly
- The draft starts to feel salesy instead of controlled
**How to fix it**
- Add the missing reasoning step
- Narrow the conclusion to match the evidence
- Ask: “If I were skeptical, would this proof actually justify this claim?”
**DALP / SettleMint example**
Weak logic:
> DALP is modular, therefore implementation risk is low.
That does not follow automatically. Fix it by adding the missing warrant:
> DALP’s modular architecture reduces implementation risk here because the client can phase capabilities by workflow, environment, and control boundary rather than forcing a single all-at-once cutover.
### B2. Circular reasoning
**Severity**
- Usually **Major**
**What it looks like**
- The draft uses a restated claim as its own proof
- Adjectives stand in for evidence
- The section sounds polished but empty
**Why it hurts**
- Evaluators hear confidence without substance
- Circular sections collapse under even light scrutiny
- The writing feels like brochure language rather than proposal reasoning
**How to fix it**
- Remove self-validating phrasing
- Replace it with mechanism, evidence, or externally grounded explanation
- If nothing independent supports the claim, either qualify it or cut it
**DALP / SettleMint example**
Weak:
> Our governance model is robust because it follows a robust governance framework.
Fix:
> Our governance model assigns decision rights, escalation paths, approval controls, and audit checkpoints across delivery, platform operations, and client coordination. That structure is what makes it robust.
### B3. Unsupported claim
**Severity**
- **Minor** to **Blocker** depending on the claim
**What it looks like**
- A capability claim appears with no support nearby
- A sentence sounds strong because of certainty, not because of proof
- The section stacks confident statements and moves on
**Why it hurts**
- Trust falls in direct proportion to claim importance
- Unsupported claims invite reviewer pushback later in the process
- Even true claims become liabilities when left ungrounded
**How to fix it**
- Add support immediately after the claim
- If support is unavailable, qualify the statement precisely
- If neither proof nor qualification is possible, remove the claim
**DALP / SettleMint example**
If you write that DALP provides “seamless interoperability across ecosystems,” you need to specify what interoperability means here: APIs, workflow coordination, integration boundary, messaging, data exchange, or network-level interaction. Otherwise it is just air.

---
## 5. Category C: Writing defects
Writing defects concern sentence control, clarity, rhythm, and voice. They are rarely fatal alone. They become dangerous when they weaken confidence or hide weak reasoning.
### C1. Passive voice overload
**Severity**
- Usually **Minor**
- **Major** when it hides responsibility, action, or control
**What it looks like**
- Too many sentences built around “is,” “was,” “will be,” or “can be” + past participle
- Actions happen, but nobody is clearly doing them
- The prose feels inert and bureaucratic
**Why it hurts**
- Agency becomes blurry
- Accountability disappears from delivery and control sections
- The writing loses force and readability
**How to fix it**
- Put the actor back into important sentences
- Use active voice especially for delivery, governance, support, and security controls
- Keep passive only when the actor genuinely does not matter
**DALP / SettleMint example**
Weak:
> Configuration changes will be reviewed and approved before deployment.
Better:
> SettleMint reviews and approves configuration changes before deployment through the agreed change-control path.
### C2. Patchwork voice
**Severity**
- Usually **Major**
- **Minor** only if limited to one small section
**What it looks like**
- Tone shifts sharply between paragraphs
- Some sections sound formal and precise; others sound like notes or website copy
- Terminology varies without reason
- The document feels assembled from different drafts and sources
**Why it hurts**
- Patchwork voice signals poor editorial control
- Evaluators start reading the document as stitched-together template material
- Internal inconsistencies become easier to notice
**How to fix it**
- Standardize terminology, cadence, and level of specificity
- Rewrite transitions and openings so sections sound like one document
- Prefer one stable house style: direct, controlled, client-specific, evidence-led
**DALP / SettleMint example**
If one section says “DALP enables digital asset orchestration across the full lifecycle” and another says “our awesome platform makes token projects easy,” the voice is broken. Pick the precise version and rewrite the rest to match.
### C3. Ambiguity variants
**Severity**
- Usually **Major**
- **Blocker** in capability, legal, security, or timeline claims
**What it looks like**
Common ambiguity patterns include:
- unclear subject: who is doing the action?
- unclear scope: all cases or some cases?
- unclear timing: current capability or future phase?
- unclear condition: always true or true only under assumptions?
- unclear referent: what does “this,” “it,” or “such” refer to?
**Why it hurts**
- Ambiguity forces evaluators to guess
- In proposals, the reader’s guess is often less generous than yours
- It creates avoidable honesty and credibility risk
**How to fix it**
- Replace vague pronouns with named subjects
- Separate current-state capability from future implementation activity
- State assumptions and conditions explicitly
- Use exact nouns instead of floating abstractions
**DALP / SettleMint example**
Weak:
> This can be supported through the platform during rollout.
Questions it creates:
- What is “this”?
- What does “supported” mean?
- Is it available now or only during rollout?
Better:
> DALP supports policy-driven workflow configuration in the current platform. During rollout, SettleMint configures those workflows against the client’s approval model and operating controls.

### C4. Repetition overload
**Severity**
- Usually **Major**
- **Minor** only in isolated low-stakes instances
**What it looks like**
- The same differentiator, claim, or value proposition appears multiple times in the same section or across nearby sections without adding new evidence, mechanism, or implication
- Key phrases recur almost verbatim: "API-first," "lifecycle management," "compliance by design" used as refrains rather than developed arguments
- The reader feels they have already been told this, and wonders whether the writer had anything else to say
- Bullet lists or paragraphs that restate the same point with synonym variation rather than advancing the argument
**Why it hurts**
- Repetition is one of the most visible signals of weak editorial control
- Evaluators experience it as padding, which erodes trust in the entire section
- It makes the document feel assembled from fragments rather than written as a coherent argument
- When the same claim appears without development, each recurrence carries less weight than the one before
**How to fix it**
- State the core point once, clearly and completely
- If the concept must recur, each appearance must do a different job: the first states the differentiator, the second adds mechanism or proof, the third ties it to an evaluator consequence or client-specific implication
- If you cannot identify what new work a repetition is doing, cut it
- Search the section for key differentiator phrases; if any appear three or more times in near-identical form, revise or remove until each instance earns its place
- See writing-quality-standards §10–11 for the full repetition control framework and the 3+ rule
**DALP / SettleMint example**
Weak:
> DALP is API-first and integrates with institutional infrastructure. This API-first architecture enables DALP to fit into institutional environments. Because DALP is API-first, institutions can modernise their infrastructure with less disruption.
Three sentences, one idea, no development.
Better:
> DALP is API-first, which lets institutions connect asset lifecycle workflows to existing identity, custody, payment, and back-office systems through defined interfaces. That matters because most institutional programs fail when integration assumptions collide with operational reality, not when the token model itself is designed.
The second version states the concept once, adds the mechanism, and closes with the institutional implication. No echo chamber.

### C5. Persona-asymmetric framing
**Severity**
- Usually **Major**
- **Blocker** in executive summary, security, governance, or pricing sections where multiple evaluator types converge

**What it looks like**
- A paragraph reassures the technical evaluator but creates unanswered risk questions for the compliance reviewer
- Dense architecture language dominates a section that procurement and business sponsors also score
- Security controls are described in implementation detail but never connected to operational or commercial consequence
- A section reads as if written for one expert reader, leaving other committee members to fill gaps with their own assumptions
- The framing that builds confidence for one persona actively undermines confidence for another: e.g., emphasising flexibility without addressing the control implications that worry risk and compliance readers

**Why it hurts**
- Proposals are scored by mixed committees, not individual specialists
- A section that satisfies one reader while alienating two others nets a lower composite score than a section that works adequately for all three
- The most dangerous form is invisible to the writer: the technical reader nods, so the section feels strong, while the compliance reader quietly downgrades because the control implications were never stated
- Persona-asymmetric sections also invite follow-up questions that consume goodwill and signal that the vendor does not understand the client's internal decision structure

**How to fix it**
- After drafting, run a three-persona check: would a technical reader, a business or procurement reader, and a compliance or risk reader each find what they need in this section without having to infer it from content aimed at someone else?
- If a section is heavy on mechanism, add one sentence connecting that mechanism to an operational or commercial outcome
- If a section is heavy on business outcome, add one sentence grounding it in a specific control, workflow, or architectural feature
- If a section discusses flexibility, configurability, or openness, address the control and governance implications in the same paragraph rather than leaving compliance readers to wonder
- Cross-reference: writing-quality-standards §24 (persona-sensitive writing), §25–28 (persona-specific guidance)

**DALP / SettleMint example**
Weak:
> DALP's modular architecture supports configurable workflow orchestration with API-first service composition, enabling flexible integration patterns across institutional middleware layers.

This satisfies the technical architect. The business sponsor cannot extract the operational benefit. The compliance reviewer sees "flexible" and "configurable" without any mention of controls, audit, or governance boundaries.

Better:
> DALP's modular architecture lets institutions connect asset lifecycle workflows to existing systems through defined API interfaces, which means the platform fits the client's infrastructure without forcing replacement of core banking or custody systems. Every workflow configuration is governed by policy-driven controls with full audit trails, so the flexibility does not come at the cost of operational oversight.

The technical reader gets the architecture. The business reader gets the integration benefit. The compliance reader gets the control assurance. One paragraph, three personas served.

---

### C6. Loose paragraph architecture
**Severity**
- Usually **Major**
- **Blocker** when it appears in executive summary, technical architecture, or differentiator sections where evaluator confidence forms fastest

**What it looks like**
- A paragraph contains four or five sentences that relate to the same topic but do not build toward a single point
- Sentences could be reordered without changing the paragraph's meaning, because no logical progression connects them
- The paragraph opens with context or background instead of a claim, leaving the reader to discover what the paragraph is actually arguing
- Evidence appears but floats disconnected from the claim it is supposed to support, often separated by a restating sentence or a tangential detail
- The paragraph ends by trailing into a minor detail or a vague reinforcement phrase rather than landing on a concrete implication or transition

**Why it hurts**
- Evaluators judge credibility in paragraph-sized chunks, not sentence by sentence. A paragraph that reads like accumulated notes signals weak editorial control even when every individual sentence is technically correct
- Loose paragraphs force the evaluator to do assembly work: extracting the claim, connecting it to the evidence, and inferring the implication. Under time pressure, most evaluators will not do that work and will score the section lower by default
- The defect is invisible to writers who self-review at sentence level, because each sentence is clean. The failure is structural, not grammatical
- In multi-author proposals, loose paragraph architecture is the most common quality defect because contributors draft sentences, not arguments

**How to fix it**
- Apply the four-part paragraph test: does this paragraph have (1) a point stated upfront, (2) supporting evidence or mechanism, (3) an implication or benefit, and (4) a transition to the next paragraph? If any part is missing, add it; if parts appear out of order, restructure
- Read the first sentence of each paragraph in the section. If those sentences alone do not recover the section's argument, the topic sentences are too weak
- If the paragraph reads the same regardless of sentence order, the paragraph has no internal logic. Rewrite so that each sentence depends on the one before it
- Apply the deletion test: remove any sentence and check whether the paragraph's argument weakens. If it does not, the sentence is filler
- Cross-reference: writing-quality-standards §4 (paragraph architecture), §5 (before and after examples), §6 (topic sentence recovery test)

**DALP / SettleMint example**
Weak:
> DALP supports multiple asset types including bonds, equity, and funds. The platform uses smart contracts for lifecycle management. Compliance is enforced through configurable modules. SettleMint has experience with institutional deployments. The architecture is designed for scalability.

Five sentences, zero argument. Every sentence could appear in any order. No claim is advanced, no evidence is connected, no implication is drawn.

Better:
> DALP manages the full lifecycle of tokenized bonds, equity, and funds through a single platform, which means institutions do not need separate systems for issuance, compliance, and servicing. Compliance enforcement happens at the smart contract level through configurable modules that apply jurisdiction-specific rules at every transfer, not as a separate layer that can be bypassed. This architecture has been validated in institutional deployments where mixed asset portfolios required consistent governance across instrument types.

Three sentences that build: what the platform does (claim), how compliance works and why the architecture matters (evidence and mechanism), and where this has been proven (implication with institutional credibility).

---
## 6. Category D: Structure defects
Structure defects concern sequencing, emphasis, retrieval, and how easy the section is to score. A strong answer that cannot be found quickly is still weak in a committee setting.
### D1. Buried proof
**Severity**
- Usually **Major**
**What it looks like**
- The strongest evidence appears late in the paragraph or section
- Important controls, references, or differentiators are hidden in dense prose
- A skim reader would miss the best part
**Why it hurts**
- Evaluators often read selectively
- If proof is buried, the section looks weaker than it is
- The proposal loses points it should have earned
**How to fix it**
- Move proof closer to the top of the section or immediately after the main claim
- Use subheadings, lead sentences, or callout structures to surface the important point
- Put high-signal material in high-attention positions
**DALP / SettleMint example**
If the section’s real strength is that DALP supports auditable workflow progression with policy-driven controls, do not hide that in sentence nine. Lead with it.
### D2. Content imbalance
**Severity**
- Usually **Major**
**What it looks like**
- One subsection is overloaded while another essential subsection gets a few lines
- Background overwhelms answer
- Product tour overwhelms client response
**Why it hurts**
- The section feels poorly judged
- Readers spend time where scores are not won
- Important issues look underdeveloped or evasive
**How to fix it**
- Rebalance within the section, not just across the document
- Cut scene-setting once the reader has enough
- Expand the answer where evaluator decisions actually happen
**Writer note**
This defect can appear both at document level and inside a single section. Treat both as real.
### D3. Heading wallpaper
**Severity**
- **Minor** to **Major** depending on how much it harms retrieval
**What it looks like**
- Headings exist but say almost nothing
- Too many generic labels: “Overview,” “Approach,” “Solution,” “Capabilities”
- Adjacent headings blur together instead of helping the reader navigate
**Why it hurts**
- Evaluators cannot tell where answers live
- Generic headings waste prime scanning real estate
- The document becomes harder to score and easier to forget
**How to fix it**
- Make headings answer-oriented, not decorative
- Use client language and requirement language where possible
- Let headings carry meaning: what is being answered, proved, or decided here?
**DALP / SettleMint example**
Weak heading:
> Platform Overview
Stronger heading:
> DALP Workflow Controls for Asset Lifecycle Governance
The second heading already tells the evaluator why the section matters.

---
## 7. Category E: Credibility defects
Credibility defects specifically damage trust. They often come from trying too hard to sound strong. Sound controlled instead.
### E1. Overclaiming
**Severity**
- Usually **Blocker** in core capability claims
- **Major** elsewhere
**What it looks like**
- Absolute words: “all,” “fully,” “seamless,” “guaranteed,” “complete”
- Present tense used for roadmap items
- Broad claims with narrow proof
- Language that outruns the product, evidence, or delivery plan
**Why it hurts**
- Once readers catch one overclaim, trust damage spreads beyond that sentence
- Risk, legal, and technical evaluators become sharply skeptical
- It creates avoidable correction work later
**How to fix it**
- Narrow the claim to what can be defended
- Distinguish clearly between current capability, configured solution, partner dependency, and future item
- Prefer exact scope over impressive scope
**DALP / SettleMint example**
Bad:
> DALP fully automates every aspect of digital asset operations.
Better:
> DALP provides configurable workflow automation, policy-driven controls, and lifecycle orchestration across defined digital asset operations. The exact coverage in this proposal depends on the scoped operating model, integrations, and approval design.
### E2. Metric ornamentation
**Severity**
- Usually **Major**
**What it looks like**
- Numbers appear without method, context, baseline, or implication
- Precision is used to sound credible, not to communicate something useful
- Benchmarks hang in the air with no explanation
**Why it hurts**
- Smart evaluators distrust unexplained numbers fast
- Metrics start to look like decoration rather than proof
- The section can feel manipulative even when the number is real
**How to fix it**
- For every important metric, add what was measured, under what conditions, against what baseline or context, and why it matters to this client
- If that context is unavailable, remove the number or soften it into a qualified range
**DALP / SettleMint example**
Weak:
> DALP delivers 99.99% reliability.
Better:
> Availability targets depend on deployment model, hosting setup, and operating controls. Where availability figures are referenced, they should be tied to the agreed architecture, support boundaries, and resilience design rather than presented as a floating platform promise.
### E3. Stale proof
**Severity**
- Usually **Major**
- **Minor** only if the age is disclosed and still clearly relevant
**What it looks like**
- Old standards, outdated release references, or aged case examples appear without context
- Legacy proof is used as if nothing has changed
- The draft reads like it was refreshed lazily
**Why it hurts**
- It makes the proposal feel reused instead of current
- Evaluators may question whether the product or delivery model is actually up to date
- In regulated or technical contexts, stale proof can be actively damaging
**How to fix it**
- Refresh the reference if possible
- If older proof is still the best fit, explain why it remains relevant
- Date-check standards, product references, deployment examples, and operational claims
**DALP / SettleMint example**
If you use an older tokenization-era reference without clarifying DALP’s broader current scope, you risk anchoring the evaluator in an outdated product narrative. Use DALP terminology and current positioning.
### E4. Proof mismatch
**Severity**
- Usually **Major**
- Sometimes **Blocker** if the mismatch creates misleading positioning
**What it looks like**
- The evidence is real, but it proves the wrong thing
- A case study from a weakly related context is stretched too far
- Product detail is used to support an operating claim it cannot actually prove
**Why it hurts**
- Mismatched proof can feel more misleading than no proof at all
- Evaluators may read it as padding or strategic blur
- It weakens both credibility and client relevance
**How to fix it**
- Swap in better-matched evidence
- Narrow the claim to what the evidence actually supports
- Explain relevance honestly instead of implying equivalence
**DALP / SettleMint example**
Do not use a generic digital asset workflow example to imply proven sovereign infrastructure fit unless the evidence really maps to the client’s scale, control environment, and regulatory posture.

---
## 8. Category F: IP / security defects
These defects are submission risks, not stylistic quirks. Treat them accordingly.
### F1. Exposed internal term
**Severity**
- Usually **Blocker**
**What it looks like**
- Internal framework names, codenames, package labels, or working terms appear in client-facing text
- Drafting shorthand leaks into final prose
- Terms are meaningful internally but not approved externally
**Why it hurts**
- It exposes internal implementation detail without benefit
- It signals poor content hygiene
- It can create confusion, contractual noise, or IP leakage
**How to fix it**
- Replace internal names with approved client-facing language
- Run exact-match searches against known internal terms
- Check headings, diagrams, footnotes, captions, and copied tables, not just body text
**DALP / SettleMint example**
If internal package names or legacy naming shortcuts appear instead of clean DALP-facing terminology, scrub them. The client should see product language, not workshop residue.
### F2. Code leakage
**Severity**
- Always **Blocker**
**What it looks like**
- Raw code fragments, config snippets, imports, environment variables, interface names, or repository artifacts appear
- Screenshots show code or internal console detail
- The draft includes technical debris that belongs in engineering, not proposal text
**Why it hurts**
- It creates obvious confidentiality and professionalism risk
- It can leak implementation details that should never leave the building
- It distracts evaluators from the business answer
**How to fix it**
- Remove the raw artifact
- Replace it with conceptual explanation or sanitized architecture language
- If an example is truly useful, abstract it to the minimum necessary client-safe level
**DALP / SettleMint example**
Never paste raw contract code, environment variable names, or repository structure into a client proposal to “prove” technical depth. That is not proof. That is leakage.
### F3. Metadata leak
**Severity**
- Usually **Blocker**
**What it looks like**
- Tracked changes remain in the file
- Comments, hidden notes, author metadata, embedded links, screenshot URLs, or export artifacts reveal internal process
- PDF or document properties contain internal names or prior client history
**Why it hurts**
- It signals weak release control immediately
- It can expose confidential information from internal drafting or other opportunities
- It makes the whole submission look careless
**How to fix it**
- Clean the export pipeline
- Strip comments, revisions, and properties before release
- Check screenshots, diagrams, document metadata, and file names, not just visible text
**DALP / SettleMint example**
A beautiful proposal with a leftover comment like “Need to verify if DALP actually does this” is dead on arrival. Scrub everything.

---
## 9. Quick self-edit checklist for any section
Run this before you call a section done:
1. **Can I point to the exact requirement this section answers?**
2. **Does the opening sentence make the answer clear, not merely thematic?**
3. **Have I explained how DALP / SettleMint addresses the issue, not just claimed that it does?**
4. **Is there evidence, mechanism, or control detail near every major claim?**
5. **Have I separated current capability from implementation activity and future state?**
6. **Did I remove absolute language unless I can fully defend it?**
7. **Can a skim reader find the proof quickly?**
8. **Are the headings informative enough to help retrieval?**
9. **Does the section sound like one voice rather than stitched-together source material?**
10. **Have I replaced vague pronouns and floating abstractions with exact terms?**
11. **Did I cut filler background that is crowding out the real answer?**
12. **Is the evidence actually matched to the claim being made?**
13. **Have I checked for internal terms, code fragments, metadata risks, and legacy naming?**
14. **If an evaluator challenged the strongest claim in this section, could I defend it from the text alone?**
15. **If this were the only section they read, would they trust us more or less?**
If you answer “no” to more than two of these, the section is not finished.

---
## 10. Defect density guidance
You do not need a perfectly sterile draft. You do need control.
### Normal density
- **0–1 Minor defects per section**
- A few polish issues remain, but the section is structurally sound and trustworthy
### Watch level
- **2–3 Minor defects** or **1 Major defect** in a section
- The section may still be usable, but it needs deliberate repair before handoff
### Concerning density
- **4+ mixed defects** in a section
- Reader effort rises sharply
- The section will often feel weak even before anyone names the reason
### Red-zone density
- **Any Blocker defect**
- **2+ Major defects in the same section**
- This usually means the section needs rebuilding, not polishing
### Density amplification rules
- repeated defects feel worse than isolated ones
- defects in executive summary, requirement response, security, governance, integration, and pricing areas matter more
- ambiguous capability claims plus missing evidence plus buried proof create much more damage together than separately
- one unsafe IP/security defect outranks a dozen style fixes
### Practical writer rule
If you can name three different defects in a section within thirty seconds, stop line-editing and rebuild the section architecture. You are not polishing anymore. You are repairing.

---
## 11. Fast diagnosis patterns
Use these bundles to diagnose rough sections quickly.
### Bundle A: Sounds impressive, proves nothing
Common defects: thin answer, unsupported claim, metric ornamentation, passive voice overload, buried proof.
Fix move: rebuild around **answer → mechanism → evidence → implication**.
### Bundle B: Feels stitched together
Common defects: patchwork voice, heading wallpaper, content imbalance, ambiguity variants.
Fix move: rewrite the section opening, standardize terminology, and re-sequence around one clear evaluator question.
### Bundle C: Too aggressive to trust
Common defects: overclaiming, unsupported claim, proof mismatch, stale proof.
Fix move: narrow claims, replace weak proof, separate current state from future state, and add honest qualifiers.
### Bundle D: Unsafe draft
Common defects: exposed internal term, code leakage, metadata leak.
Fix move: stop all stylistic editing and sanitize the section immediately.

---
## 12. Drafting examples: weak vs fixed
### Example 1: Thin, vague answer
Weak:
> DALP offers a powerful and flexible platform for end-to-end digital asset lifecycle management.
Problems: thin answer; unsupported claim; ambiguity; overclaiming risk.
Fixed:
> DALP supports digital asset lifecycle management through configurable workflows, policy-based controls, and auditable state transitions across issuance, servicing, and event-driven operations. For this client, that matters because the platform can be aligned to the target operating model without forcing manual handoffs between disconnected lifecycle steps.
### Example 2: Buried proof
Weak structure:
> We begin with a delivery overview, then discuss platform alignment, then describe our approach in more detail, and later in the section note that approval workflows, auditability, and segregation of duties can be configured.
Problem: the actual proof is buried.
Fixed lead:
> DALP’s configurable approval workflows, auditability, and policy-driven controls provide the governance foundation for the proposed delivery model. The implementation approach below explains how those controls are mapped to the client’s operating structure.
### Example 3: Overclaiming
Weak:
> DALP fully eliminates operational risk through automation.
Fixed:
> DALP reduces operational risk by automating defined workflow steps, enforcing policy-driven controls, and preserving auditability across lifecycle actions. Residual risk remains dependent on operating design, integration boundaries, and governance choices.
### Example 4: Proof mismatch
Weak:
> Our experience in digital asset projects proves fit for your national-scale infrastructure programme.
Problem: claim scope exceeds proof scope.
Fixed:
> Our digital asset platform experience demonstrates relevant workflow, control, and lifecycle orchestration capability. Fit for this programme should be assessed specifically against the client’s required scale, governance model, and infrastructure constraints, which we address in the architecture and delivery sections.

---
## 13. What “good enough” looks like before handoff
A section is usually ready for bid-checker when:
- the requirement is directly answered
- no major claim is left unsupported
- the best proof is visible early
- headings help navigation instead of decorating the page
- the voice is consistent
- current capability vs planned implementation is clear
- internal terms and leakage risks are scrubbed
- nothing in the section would embarrass SettleMint if quoted back verbatim
If those conditions are not met, do more drafting. Do not outsource obvious repair work to the reviewer.

---
## 14. Bottom line
Most proposal weakness is not mysterious. It comes from recognizable defects: missing answer, shallow answer, broken reasoning, vague wording, hidden proof, inflated claims, stale or mismatched evidence, and avoidable leakage.
Name the defect.
Fix the defect.
Move on.
That is how the bid-manager turns raw text into a controlled proposal draft before review ever starts.
