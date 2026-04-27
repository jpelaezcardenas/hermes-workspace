# Structure Patterns, Hierarchy & Information Architecture

This file defines how to evaluate document structure like an expert reader, not like a passive formatter.
A proposal's structure is not packaging around the content.
It is part of the content.
It determines what gets noticed, what gets understood, what gets remembered, and what gets trusted.

Use this file primarily for:
- **Document Flow & Structure**
- **Executive Readability**
- **Visual Communication**
- second-order effects on **Writing Quality**, **Requirement Coverage**, and **Client-Centricity**

Cross-reference:
- `setup/reading-psychology.md`
- `setup/persuasion-framework.md`
- `setup/writing-standards.md`
- `setup/defect-taxonomy.md`
- `setup/scoring-rubric.md`

---

## 1. Structure is how the proposal thinks in public

A proposal's structure exposes the discipline of the team behind it.

Strong structure signals:
- the writers understood evaluator workflow
- the argument was designed, not accumulated
- the document can be navigated under pressure
- the team knows what matters first, second, and third

Weak structure signals:
- sections were added as content became available
- authors wrote in silos
- no one performed a final architectural edit
- the document was organised for internal production convenience, not client reading

### The core reviewer question
Do not just ask whether sections exist.
Ask whether the document architecture helps the evaluator do their job.

That job includes:
- finding relevant material fast
- understanding section purpose immediately
- tracking where proof lives
- comparing vendors efficiently
- recalling key points later in committee discussion

If the document makes those tasks harder, structure is weak even if the content base is acceptable.

---

## 2. Information architecture in proposal terms

Information architecture is the deliberate organisation of content so the reader can:
- predict where information belongs
- retrieve it quickly
- understand relationships between sections
- process complex material with minimal friction

In proposal work, that means:
- logical section ordering
- consistent heading depth
- clean chunking
- explicit cross-references
- strong navigation cues
- visual hierarchy that matches content importance

### What proposal IA must solve
A good proposal architecture should answer:
1. where is the answer to the client's question?
2. where is the proof?
3. what is current capability versus roadmap?
4. where do operational controls live?
5. where are implementation details versus strategic summary?
6. how can a role-specific evaluator jump directly to their concern?

If the architecture does not support those retrieval tasks, it is underperforming.

---

## 3. Hierarchy is the reader's map

Hierarchy tells the eye and brain what matters most.
It answers:
- what is primary
- what is subordinate
- what belongs together
- what is a transition versus a conclusion

Without strong hierarchy, readers experience blur.
They may not say “the hierarchy is weak.”
They say:
- “this feels messy”
- “I can't find anything”
- “I'm not sure what matters here”

### Three layers of hierarchy

#### Structural hierarchy
The order and nesting of sections.
Example:
- Executive Summary
- Client Context
- Proposed Solution
  - Operating Model
  - Technical Architecture
  - Control Framework
- Implementation Approach
- Risks, Gaps, and Mitigations
- Differentiation

#### Typographic hierarchy
How headings, subheadings, labels, captions, and emphasis look on the page.
Example:
- H1 clearly distinct from H2
- caption styles consistent
- bold used selectively for semantic emphasis

#### Conceptual hierarchy
The logic of ideas inside a section.
Example:
- main answer first
- evidence second
- caveats third
- implications fourth

Good proposals align all three.
Weak proposals often have partial typographic hierarchy but poor conceptual hierarchy.
They look structured while reading unstructured.

---

## 4. Heading as signpost vs heading as wallpaper

A heading has a job.
Actually three jobs:
1. orient the reader now
2. act as a retrieval cue later
3. compress the section's purpose into a visible label

### Heading as signpost
A signpost heading says what the section will establish, answer, or explain.

Examples:
- “How the proposed settlement flow meets your T+0 requirement”
- “Current coverage, controlled gaps, and roadmap commitments”
- “Operational approval model for issuance and participant onboarding”
- “Security controls relevant to regulated market infrastructure”

These headings are useful because a skimming evaluator can understand the argument from the outline.

### Heading as wallpaper
Wallpaper headings look professional but communicate almost nothing.

Examples:
- Solution
- Capabilities
- Benefits
- Approach
- Security
- Innovation

These headings force the evaluator to read body text just to know what the section is for.
That is wasted effort.

### Review rule
A proposal with wallpaper headings should not score highly on structure, because headings are part of the structure.

### Heading quality test
For each major heading, ask:
- if I saw this alone in the table of contents, would I know what question it answers?
- if I referenced this in committee later, would the section be easy to find?
- does the heading advance the argument or just label a topic bucket?

If no, the heading is wallpaper.

---

## 5. The table of contents test

The table of contents is a diagnostic instrument.
You should be able to learn a lot from it without reading the full document.

### The test
Read only the TOC and ask:
- Can I understand the proposal's argument from headings alone?
- Does the sequence make evaluator sense?
- Is the document organised around client decisions, or around internal content buckets?
- Can I tell where proof, controls, implementation, and gaps live?

### What a strong TOC reveals
- a coherent progression
- descriptive section names
- sensible granularity
- stable hierarchy depth
- likely major proof points
- visible client orientation

### What a weak TOC reveals
- generic section labels
- arbitrary section order
- hidden logic
- imbalance in section emphasis
- likely duplication or sprawl

### Example

**Weak TOC**
1. About Us  
2. Solution  
3. Features  
4. Security  
5. Implementation  
6. Why SettleMint

**Problems**
- vendor-first
- headings are vague
- no visible handling of client need, requirements, gaps, or controls
- “features” is not a procurement answer

**Stronger TOC**
1. Executive summary: how the proposed platform addresses your digital bond programme objectives  
2. Your stated requirements and the proposed response model  
3. Operating model for issuance, settlement, and participant control  
4. Technical architecture and integration points  
5. Governance, security, and operational assurance controls  
6. Current coverage, qualified gaps, and roadmap commitments  
7. Implementation phases, dependencies, and client decision points  
8. Evidence from comparable regulated deployments  
9. Why this approach is differentiated for your environment

Now the argument is legible.

### Review implication
If the TOC fails the test, **Document Flow & Structure** should be capped or downgraded.
A document whose architecture cannot be read from its outline is usually compensating with too much prose.

---

## 6. Ordering sections by evaluator logic, not writer convenience

Proposal teams often order sections by how they built the document:
- company info first because it is easy
- feature overview next because it exists already
- tailoring later because it was written later
- gaps near the end because they are uncomfortable

That is the wrong logic.

### Better order: evaluator logic
A strong proposal usually follows some version of:
1. client challenge / context
2. response summary
3. core solution architecture or operating model
4. proof and controls
5. implementation realism
6. gaps, qualifications, and mitigations
7. differentiation and close

The exact shape can vary, but the sequence should match decision-making.

### Ordering heuristics
- lead with the client's world, not yours
- answer the main “can they do it?” question before diving into deep detail
- place proof near the claims it supports
- surface limits before they become trust defects
- end on a summarising and confidence-building note, not generic boilerplate

### Review prompts
- Does the section order reduce reader effort?
- Are proof-heavy sections delayed too long?
- Are uncomfortable but important topics hidden late?
- Is the document sequence usable for committee readers with different priorities?

---

## 7. Chunking large documents

Long proposals cannot rely on linear endurance.
They need chunking.
Chunking means breaking complexity into digestible, logically contained units.

### Good chunking principles
- one evaluator question per chunk
- one main answer per chunk
- one concept family per chunk
- visible start and finish to each chunk
- predictable internal pattern where useful

### Signs of over-large chunks
- a section runs many pages with no meaningful subheading relief
- the same section mixes overview, proof, caveat, and implementation detail randomly
- readers must re-orient repeatedly inside the same section

### Signs of over-fragmentation
- headings every paragraph
- tiny sections that destroy rhythm
- a sense that the document has been atomised instead of organised
- concept fragmentation across too many micro-sections

### Practical guidance
These are not rigid rules, but good review benchmarks:
- major sections should usually answer one broad decision question
- sub-sections should usually fit on roughly 0.5 to 2 pages of focused content before another meaningful shift
- paragraphs should usually stay on one thought plus support
- if a sub-section needs more than 3–5 pages, it probably needs internal chunking or a better architecture

### Review implication
A proposal can be complete yet exhausting if chunking is poor.
That should hit **Document Flow & Structure** and often **Executive Readability**.

---

## 8. Page-break logic and reading rhythm

Page breaks are structural moments.
They can support or disrupt reading rhythm.

### Good page-break logic
- new major sections begin cleanly
- diagrams are not split from their explanation
- tables do not break in ways that destroy comparability
- section openings have enough visible content beneath them to anchor the reader
- the start of a new page does not begin mid-list without context

### Bad page-break logic
- headings orphaned at page bottoms
- explanatory paragraphs separated from the graphic they explain
- a “partial / no” qualification pushed to the next page where it is less visible
- sequence diagrams broken at crucial steps

### Reviewer note
Even when you are reading a converted markdown or extracted text, try to infer where visual page logic likely helps or hurts if a PDF or Word version exists.
If the proposal uses diagrams, tables, or phased content, page logic matters.

---

## 9. Cross-reference architecture in long proposals

Cross-references are not optional in complex proposals.
They prevent disorientation and support selective reading.

### Strong cross-reference behavior
- specific section references
- consistent numbering
- references to figures and tables by label
- clear directional language: where proof or detail can be found

Examples:
- “See Section 4.2 for the participant onboarding workflow.”
- “Figure 3 shows the control handoffs between operations and compliance.”
- “Requirement 6.4 is addressed in detail in Section 5.3 and summarised in Appendix A.”

### Weak cross-reference behavior
- “as mentioned earlier”
- “see below”
- “covered elsewhere”
- references with stale numbering after edits

### Why cross-reference architecture matters
Because evaluators do not read linearly.
They jump.
A good document supports the jump.
A weak document punishes it.

### Review implication
A long proposal with no usable cross-reference system should not score as structurally strong.
This is especially important for technical, legal, and compliance readers.

---

## 10. Visual hierarchy and how it guides the eye

Visual hierarchy controls attention.
It tells the reader what to notice first, next, and last.

### Elements of visual hierarchy
- font size
- font weight
- spacing
- indentation
- numbering
- table design
- callouts
- captions
- white space
- position on page

### Strong visual hierarchy
- major headings are visually distinct and consistent
- subheadings clearly subordinate to headings
- bullets are used with purpose, not as default content containers
- tables present decision-relevant comparisons cleanly
- diagrams have titles and labels that can be read fast
- emphasis is sparse and meaningful

### Weak visual hierarchy
- too many things look equally important
- bold is overused
- heading levels are visually ambiguous
- long bullet stacks flatten priority
- dense tables become unreadable walls
- diagrams are visually noisy or generic

### Review prompt
If you squint at the page, can you still tell what matters?
If not, hierarchy is weak.

---

## 11. Numbering systems and their psychology

Evaluators need to reference sections in meetings, notes, and scoring discussions.
A numbering system helps with:
- retrieval
- shared reference
- perceived orderliness
- confidence that the document is controlled

### Good numbering systems
- consistent depth
- stable pattern
- no strange jumps or missing levels
- used where document complexity justifies it

### Weak numbering systems
- no numbering in a long technical proposal
- numbers used inconsistently
- heading depth changes unpredictably
- section labels in TOC do not match body labels

### Psychological effect
A good numbering system makes the document feel tractable.
A weak one makes the document feel slippery.

### Review rule
In short proposals, numbering may be optional.
In longer or more complex proposals, lack of clear numbering reduces retrieval quality and should count against structure.

---

## 12. Parallel structure principle

Parallel structure means similar content is organised in similar ways.
This reduces cognitive load and improves comparison.

### Where parallel structure matters
- requirement responses
- capability subsections
- case study summaries
- risk and mitigation lists
- implementation phases
- persona-relevant sections

### Example of good parallel structure
Each requirement subsection follows:
1. status
2. current capability
3. evidence
4. gap or qualifier
5. mitigation / next step

This lets evaluators compare responses quickly.

### Example of weak non-parallel structure
Requirement 1 gets a narrative paragraph.
Requirement 2 gets bullets.
Requirement 3 gets a table row.
Requirement 4 gets a marketing paragraph plus a screenshot.

Now comparison is harder than it needs to be.

### Review implication
When similar section types are not parallel, readers lose orientation and trust.
That should affect **Document Flow & Structure** and sometimes **Requirement Coverage**.

---

## 13. Transitional architecture: how sections hand off

Transitions are not just sentence-level writing devices.
They are architectural connectors.
They answer:
- why this section now?
- how does it relate to what came before?
- what should the reader carry forward?

### Strong transitions
- bridge from earlier section to current purpose
- explain the reason for the shift
- set reader expectation for what will be established

Example:
“Having outlined the proposed operating model, the next section focuses on the control mechanisms that make that model governable in a regulated environment.”

### Weak transitions
- abrupt topic change
- heading only, no bridge
- repeated opening boilerplate that ignores prior context

### Section-level transition test
At the start of a major section, ask:
- do I know why I am here now?
- do I know how this section serves the larger argument?

If no, structure is leaking coherence.

---

## 14. Section archetypes and what good structure looks like

Different sections have different jobs.
Judge them accordingly.

### Executive summary section
Good structure:
- client challenge
- proposed response
- proof signals
- key qualifiers if critical
- forward-looking close

### Technical architecture section
Good structure:
- framing paragraph
- architecture overview
- components or layers
- data / control flows
- interfaces and dependencies
- operational or security implications

### Requirement response section
Good structure:
- requirement identifier
- direct answer/status
- explanation
- evidence reference
- qualifier / gap if needed

### Implementation section
Good structure:
- assumptions / scope
- phases
- client responsibilities
- dependencies and risks
- governance model
- timeline logic

### Differentiation section
Good structure:
- client-relevant criterion
- comparative logic
- evidence-backed differentiator
- why it matters in this client's context

### Review implication
Do not let sections be judged only on presence.
Judge whether their internal architecture matches their function.

---

## 15. Ambiguity detection: structure's hidden enemy

Ambiguity is not only a prose issue.
It is often structural.
The document's architecture can conceal or create ambiguity.

### Major ambiguity types in proposals

#### Scope ambiguity
The reader cannot tell what is included, excluded, current, optional, or future.

Typical signals:
- mixed treatment of standard features and custom work
- vague nouns like “solution” or “platform” without boundary
- implementation phases described without scope definitions

#### Capability ambiguity
The reader cannot tell whether a capability is live, planned, configurable, manual, partner-delivered, or hypothetical.

Typical signals:
- present tense used for roadmap items
- “supports” used without qualifiers
- feature mentions detached from production status

#### Timeline ambiguity
The reader cannot tell when something happens, what depends on what, or what assumptions shape the schedule.

Typical signals:
- timelines without dependencies
- phase labels with no outcomes
- optimistic durations without caveats

#### Ownership ambiguity
The reader cannot tell who does what.

Typical signals:
- passive voice in implementation plans
- missing client responsibilities
- “the project team” used without role clarity

#### Evidence ambiguity
The reader cannot tell what claim the proof is meant to support.

Typical signals:
- case studies dropped in without explanation
- diagrams not tied to surrounding claims
- numbers with no benchmark context

### How to catch ambiguity structurally
- inspect headings for vague category labels
- check whether each major section answers a clear question
- test whether timelines, requirements, and controls use consistent labels
- look for mixed status language within a single chunk
- ask whether a reader could summarise what is true now versus later

### Scoring implication
Ambiguity should lower **Document Flow & Structure**, and often **Technical Credibility**, **Honesty & Transparency**, and **Requirement Coverage**.

---

## 16. Section islands and TOC drift

### Section island syndrome
A section island is a section that may be locally coherent but is weakly connected to the rest of the document.

Symptoms:
- starts abruptly
- repeats content already covered elsewhere
- uses different terminology or tone
- lacks transitions or cross-references
- feels authored in isolation

### TOC drift
TOC drift happens when:
- heading names changed in body but not TOC
- section order evolved but numbering became inconsistent
- structure in the final document no longer matches the outline logic

Both defects are strong signals of assembly without final architectural control.

### Reviewer note
These are not cosmetic.
They reduce trust because they suggest the same lack of control may exist in the solution or delivery approach.

---

## 17. Visuals as structural tools, not decoration

A visual has structural value only if it helps one or more of the following:
- compress complexity
- clarify sequence
- reveal comparison
- reduce recall burden
- create a reusable reference point during committee discussion

### Strong structural visuals
- architecture diagrams with labelled flows and boundaries
- implementation timelines with milestones and ownership
- decision tables that compare options or statuses clearly
- swimlane diagrams for multi-party operational processes

### Weak structural visuals
- generic product diagrams with no client context
- icon collections pretending to be architecture
- charts inserted without interpretive text
- tables used where a short narrative would be clearer

### Review rule
If removing the visual changes nothing, it was probably decoration.
If removing it would make comprehension harder, it is doing structural work.

---

## 18. Optimal section length and pacing

There is no universal perfect section length.
But there are clear failure modes.

### Too short
- feels fragmented
- no room for development
- too many headings dilute hierarchy

### Too long
- loses topic discipline
- creates hidden subtopics
- increases scan friction and fatigue
- weakens retrieval because a section becomes a content warehouse

### Pacing heuristics
- major sections should feel complete but bounded
- sub-sections should support one sustained idea or process segment
- dense technical sections should offer relief through summary, diagram, or internal segmentation
- a reader should not repeatedly ask “why is this still the same section?”

### Reviewer signal
If you find yourself inventing subheadings mentally while reading, the document probably needs them.

---

## 19. Redundancy and structural repetition

Not all repetition is bad.
Some repetition helps orientation.
The issue is uncontrolled repetition.

### Good repetition
- consistent section template
- recurring language for requirement status
- controlled restatement of core value proposition at strategic points

### Bad repetition
- same claim restated in summary, solution overview, implementation section, and conclusion with no new value
- multiple sections each trying to be the executive summary
- duplicate visuals carrying the same message

### Review implication
Repeated content that adds no new function weakens flow, increases fatigue, and suggests weak editorial governance.

---

## 20. Structural signs of multi-author patchwork

A proposal written by multiple people is normal.
A proposal that reads like it was written by multiple people without integration is a problem.

### Signs
- uneven heading style
- inconsistent section depth
- one section prose-heavy, another bullet-heavy
- terminology drift
- different evidence standards by section
- different ways of answering similar requirement types

### Why it matters
Patchwork structure creates two problems:
1. reading friction
2. trust erosion

If the proposal team did not align the document, evaluators may wonder whether they can align delivery.

---

## 21. Structural score calibration examples

### What a 5/5 structure feels like
- the TOC alone makes sense
- every major section has a clear job
- headings operate as signposts
- transitions maintain continuity
- the reader can jump anywhere and still recover orientation quickly
- similar sections use parallel patterns
- ambiguity is actively reduced, not passively tolerated

### What a 4/5 structure feels like
- overall architecture is strong
- most headings are useful
- a few sections could be tighter or better ordered
- minor patchwork signs exist but do not materially disrupt reading

### What a 3/5 structure feels like
- generally navigable
- major broad sections are present
- some headings are vague
- some sections are overlong or loosely connected
- cross-references and transitions are competent but not strong

### What a 2/5 structure feels like
- the document can be read, but with constant effort
- TOC is weak or generic
- sections feel assembled rather than architected
- repetition, drift, or chunking problems are obvious
- evaluator retrieval is harder than necessary

### What a 1/5 structure feels like
- disorder, random sequencing, or serious navigation failure
- missing or broken hierarchy
- no reliable path through the document
- high ambiguity and low control

---

## 22. Good vs bad examples

### Example A: section opening

**Bad**
“Implementation will be discussed in this section.”

**Why weak**
- no bridge
- no purpose beyond label repetition
- tells the reader nothing about why the section matters

**Better**
“Because the client's evaluation criteria place heavy weight on delivery certainty, this section focuses on implementation sequence, decision dependencies, and the control points required to keep the programme governable.”

Now the section is anchored to evaluator logic.

### Example B: hierarchy

**Bad**
1. Solution  
1.1 Capabilities  
1.1.1 Features  
1.1.2 Benefits  
1.2 Security  
1.3 Operations  
1.3.1 Additional Information

**Problem**
Abstract buckets, uneven logic, unclear relation to client need.

**Better**
3. Proposed operating model  
3.1 Issuance control and approval workflow  
3.2 Settlement flow and finality model  
3.3 Participant onboarding and access governance  
4. Technical architecture and integration boundaries  
4.1 Core system interfaces  
4.2 Data and event flows  
4.3 Security and operational assurance controls

### Example C: ambiguity

**Bad**
“The solution supports reporting needs and can be configured for future requirements.”

**Structural problem**
No sectioning between current reporting coverage and future extensions. Reader cannot tell what is live now.

**Better**
5. Reporting coverage and qualified gaps  
5.1 Reporting capabilities available in the current release  
5.2 Client-specific reporting requirements requiring configuration  
5.3 Roadmap items and interim mitigation approach

This structure itself reduces ambiguity.

---

## 23. Reviewer checklist for structure assessment

### TOC and hierarchy
- [ ] Can I understand the argument from the TOC alone?
- [ ] Are headings descriptive rather than generic?
- [ ] Is the hierarchy depth consistent and useful?
- [ ] Are numbering and labels stable?

### Flow and sequence
- [ ] Does the section order follow evaluator logic?
- [ ] Do sections build on each other?
- [ ] Are transitions doing real connective work?
- [ ] Are proof sections placed near the claims they support?

### Chunking and pacing
- [ ] Are large sections chunked into coherent units?
- [ ] Are similar content types presented in parallel forms?
- [ ] Do any sections feel bloated or fragmented?
- [ ] Does pacing degrade later in the document?

### Ambiguity and retrieval
- [ ] Can I tell what is current vs planned?
- [ ] Can I tell who owns what and when?
- [ ] Are cross-references specific and reliable?
- [ ] Can a role-specific reader find their concerns fast?

### Visual hierarchy
- [ ] Does the page structure guide the eye sensibly?
- [ ] Are visuals structural assets or filler?
- [ ] Is emphasis controlled and meaningful?

---

## 24. How to write feedback on structure defects

Prefer:
- “The heading system labels broad topics but does not tell the evaluator what each section proves, which weakens scanability and retrieval.”
- “Sections 4 through 6 contain the right material but are ordered by internal content type rather than evaluator decision logic.”
- “This section combines current capability, future roadmap, and implementation approach in one block, creating avoidable capability ambiguity.”
- “The table of contents does not reveal a coherent argument. Rewrite headings so a reader can understand the case from the outline alone.”
- “Requirement responses are not parallel in structure, which makes side-by-side evaluation harder than it needs to be.”

Avoid:
- “Could be better organised.”
- “Maybe restructure.”
- “Needs stronger flow.”

Those are soft and useless.

---

## 25. Bottom line

Structure is not a cosmetic layer.
It is the operating system of the proposal.

If the hierarchy is vague, if chunking is weak, if headings are wallpaper, if ambiguity is embedded in section design, or if the TOC cannot carry the argument, the proposal is structurally weak even if it contains good raw material.

The standard is simple:
**Can a busy evaluator find, follow, and later defend the proposal's argument without unnecessary effort?**

If not, score accordingly.
