# Evaluator Personas & Scoring Calibration

This file models the main reader archetypes who influence procurement outcomes.
A proposal is rarely read by one generic “evaluator.”
It is read by different people with different fears, different shortcuts, and different standards of proof.

Use this file to pressure-test the proposal through multiple lenses before scoring.

Primary scoring impact:
- **Executive Readability**
- **Technical Credibility**
- **Requirement Coverage**
- **Honesty & Transparency**
- **Document Flow & Structure**
- **Client-Centricity**
- **IP & Confidentiality**
- **Competitive Differentiation**

Cross-reference:
- `setup/reading-psychology.md`
- `setup/persuasion-framework.md`
- `setup/structure-patterns.md`
- `setup/defect-taxonomy.md`
- `setup/scoring-rubric.md`

---

## 1. Why persona-based review matters

A proposal can look solid from one angle and weak from another.
Examples:
- technically strong, but unreadable for the business sponsor
- commercially appealing, but alarming for risk and compliance
- beautifully written, but incomplete against process requirements
- honest and clear, but legally loose in its commitments

Procurement outcomes are shaped by committee dynamics, not by one abstract average reader.
That means the reviewer should ask:
- who is likely to read this first?
- who is likely to become skeptical?
- whose objections will carry disproportionate weight?
- which sections will each persona actually read versus skip?
- what kind of evidence satisfies each persona?

### The core operating rule
Do not review as a single generic judge.
Review as a rotating panel.

---

## 2. The five evaluator archetypes

This framework defines five common procurement personas:
1. **Technical Assessor**
2. **Business Sponsor**
3. **Risk / Compliance Officer**
4. **Procurement Manager**
5. **Legal Counsel**

Real committees may combine or split these roles, but the underlying evaluative behaviors recur reliably.

---

## 3. Persona 1 — Technical Assessor

### Identity
This reader is responsible for determining whether the proposal is technically credible, implementable, and internally coherent.
They are often the hardest person to bluff and the easiest person to lose with generic language.

### What they care about most
- mechanism, not slogans
- architecture realism
- integration boundaries
- operational viability
- current capability vs roadmap clarity
- benchmarks with conditions
- design trade-offs
- failure handling and controls

### What they read first
- technical architecture sections
- diagrams
- integration details
- requirement matrix entries tied to technical scope
- proof sections
- security and operational controls if technically framed

### What they often skip or skim
- generic corporate overview
- inflated executive summary language
- broad “why us” claims without evidence
- superficial case studies

### What triggers suspicion
- buzzword density
- architectural abstractions with no interfaces or flows
- impossible universals (“fully supports all...”) 
- benchmarks without methodology
- present tense used for roadmap items
- security claims with no control detail
- diagrams that look like marketing wallpaper

### What builds trust
- controlled specificity
- well-labelled solution diagrams
- explicit design decisions and trade-offs
- honest statement of partial coverage
- relevant deployment context
- precise control language
- clear separation of what exists today versus what requires configuration or extension

### How they score harshly
They penalise:
- **Technical Credibility** first
- **Honesty & Transparency** second
- **Document Flow & Structure** when technical content is hard to retrieve
- **Requirement Coverage** if technical answers are vague or evasive

### Typical internal reaction
“Show me how this actually works.”

### Review questions to ask from this persona
- could I draw the architecture from what is written?
- are the integration points explicit?
- are claims appropriately qualified?
- does the proposal show the system under realistic conditions?
- where are the hidden implementation assumptions?

### Strong example for this persona
“The architecture section explains system boundaries, data flows, failure controls, and the specific conditions attached to performance numbers.”

### Weak example for this persona
“The architecture section describes an ‘enterprise-grade event-driven platform’ with no integration detail and no benchmarks tied to methodology.”

---

## 4. Persona 2 — Business Sponsor

### Identity
This reader wants to know whether the proposal solves the business problem in a way that can be justified internally.
They are often time-poor and unlikely to read the full document deeply.
They depend heavily on summary quality and visible confidence signals.

### What they care about most
- strategic fit
- clarity of business value
- confidence that the vendor understands the client context
- feasibility without operational chaos
- ability to explain the case to other stakeholders
- decision safety: “Will choosing this vendor create headaches?”

### What they read first
- executive summary
- client challenge framing
- implementation summary
- proof of relevant experience
- differentiation framing
- high-level risks and mitigations

### What they often skip or skim
- detailed architecture internals
- dense compliance matrices
- long tables unless clearly summarised
- technical benchmark detail

### What triggers suspicion
- summary that opens with vendor biography
- jargon without translation
- product-centric rather than client-centric framing
- no clear articulation of what is distinctive or safer
- implementation timeline that feels detached from business realities
- empty “partnership” language

### What builds trust
- immediate client alignment
- calm, strategic framing
- concise articulation of the proposal's case
- clear business implications of technical choices
- visible awareness of organisational constraints and stakeholder complexity
- selective, relevant proof

### How they score harshly
They penalise:
- **Executive Readability** first
- **Client-Centricity** second
- **Competitive Differentiation** third
- **Document Flow & Structure** when the case is hard to grasp quickly

### Typical internal reaction
“Can I defend this choice in a steering committee?”

### Review questions to ask from this persona
- could I explain this proposal in three sentences after one skim?
- does the summary make a business case or just describe a product?
- are the client's stakes and constraints visible?
- is the value proposition concrete enough to repeat internally?
- what would I remember tomorrow?

### Strong example for this persona
“The executive summary frames the client's challenge, solution fit, key controls, and the shortlist rationale in plain but serious language.”

### Weak example for this persona
“The summary is a feature tour that assumes the reader will do the translation from platform detail to business impact themselves.”

---

## 5. Persona 3 — Risk / Compliance Officer

### Identity
This reader is not there to be impressed.
They are there to avoid embarrassment, exposure, and governance failure.
They often become decisive when the proposal sounds loose, vague, or operationally naive.

### What they care about most
- control model
- governance clarity
- auditability
- segregation of duties
- operational risk management
- resilience and incident handling
- compliance realism
- honesty about limits

### What they read first
- security and governance sections
- control and approval workflows
- operational model descriptions
- gap disclosures
- risk sections
- any statements about regulatory support or reporting

### What they often skip or skim
- brand narrative
- generic transformation language
- product capability lists with no control implication

### What triggers suspicion
- “fully compliant” without specifics
- broad security claims without control detail
- no distinction between technical capability and governed operation
- no mention of roles, approvals, auditability, or exceptions
- roadmap ambiguity in regulated areas
- hidden limitations

### What builds trust
- explicit controls
- precise governance language
- clear accountabilities
- qualified compliance statements
- operationally literate implementation plans
- honest articulation of residual risk or partial support

### How they score harshly
They penalise:
- **Honesty & Transparency** first
- **Technical Credibility** where control mechanisms are vague
- **Requirement Coverage** for compliance items
- **Client-Centricity** when regulatory context is generic
- **IP & Confidentiality** if internal artifacts leak, because that signals control weakness

### Typical internal reaction
“Where are the controls, and can I defend them?”

### Review questions to ask from this persona
- where are critical actions governed and logged?
- what is the approval model?
- what limits or residual risks are openly acknowledged?
- does the proposal understand control, not just capability?
- would a regulator-facing internal stakeholder find this reassuring or loose?

### Strong example for this persona
“The proposal distinguishes product functionality from operational governance and names the approval and audit model around key actions.”

### Weak example for this persona
“It claims compliance support in broad terms but never explains who approves what, how exceptions are handled, or what evidence exists.”

---

## 6. Persona 4 — Procurement Manager

### Identity
This reader safeguards process integrity, completeness, comparability, and submission discipline.
They may not be the deepest technical or legal reader, but they can damage a proposal severely if it feels sloppy, incomplete, or non-compliant with instructions.

### What they care about most
- did the vendor answer the actual questions?
- is the document complete, ordered, and easy to score?
- are page limits, templates, and instructions respected?
- are statuses clear and comparable?
- is the proposal professionally assembled?

### What they read first
- table of contents
- compliance matrix
- response format adherence
- executive summary skim
- key requirement sections
- appendices only when needed to verify completeness

### What they often skip or skim
- deep technical explanation unless tied to requirement scoring
- long strategic narrative not anchored to criteria

### What triggers suspicion
- missing requirement responses
- wrong numbering or broken TOC
- vague headings
- evasive yes/no/partial treatment
- page-limit abuse or formatting indiscipline
- obvious template residue or client-name errors

### What builds trust
- clean requirement mapping
- parallel response structure
- visible completeness
- accurate numbering and references
- headings that match scoring needs
- controlled formatting and assembly discipline

### How they score harshly
They penalise:
- **Requirement Coverage** first
- **Document Flow & Structure** second
- **Executive Readability** when format gets in the way of scoring
- **IP & Confidentiality** if accidental leaks suggest poor quality control

### Typical internal reaction
“Did they make my evaluation easier or harder?”

### Review questions to ask from this persona
- can I locate every answer fast?
- is response structure consistent enough for fair comparison?
- is anything missing, mislabeled, or hidden?
- are page and format rules respected?
- does the document feel controlled?

### Strong example for this persona
“Each requirement is answered in a stable pattern with status, explanation, evidence reference, and qualifier where needed.”

### Weak example for this persona
“Some requirements get full narratives, some get one-line yeses, some are scattered across unrelated sections.”

---

## 7. Persona 5 — Legal Counsel

### Identity
This reader examines risk hidden inside language.
They focus on what the proposal commits to, implies, exposes, or leaves dangerously vague.
They do not care whether the prose is inspiring. They care whether it is safe, enforceable, and internally coherent.

### What they care about most
- commitment precision
- liability exposure
- terminology discipline
- IP protection
- contract-sensitive wording
- service-level and support statements
- roadmap vs current capability clarity
- ambiguity that could become dispute later

### What they read first
- legal/commercial terms if included
- security, compliance, and support statements
- IP-sensitive sections
- roadmap and qualification language
- availability / SLA / support descriptions
- data handling or regulatory responsibility wording

### What they often skip or skim
- broad strategic framing
- long architecture discussion unless it implies commitments or exposure
- generic value proposition language

### What triggers suspicion
- absolute words: “always,” “guaranteed,” “fully compliant,” “seamless,” “all”
- vague statements that could be interpreted expansively
- unqualified future commitments
- hidden assumptions
- internal tool or implementation leakage
- confusing distinctions between product, services, and custom work

### What builds trust
- carefully bounded commitments
- precise qualifiers
- clear separation between current capability, roadmap, and implementation activity
- IP-clean terminology
- disciplined use of obligation words
- absence of accidental legal overreach

### How they score harshly
They penalise:
- **IP & Confidentiality** first
- **Honesty & Transparency** second
- **Technical Credibility** where language overstates support
- **Requirement Coverage** if legal/compliance requirements are vague

### Typical internal reaction
“What exactly are they promising, and what unintended exposure sits in this wording?”

### Review questions to ask from this persona
- is any wording broader than the actual product can support?
- are roadmap items clearly non-committal where appropriate?
- are internal terms or artifacts leaking?
- are support, SLA, or compliance references carefully bounded?
- where could ambiguity become a dispute later?

### Strong example for this persona
“The proposal uses explicit qualification language and keeps internal implementation detail fully abstracted behind client-facing terminology.”

### Weak example for this persona
“It promises full support and compliance outcomes in absolute language while blurring what is product, configuration, and future development.”

---

## 8. What each persona reads first, skips, doubts, and trusts — summary table

| Persona | Reads First | Skips/Skims | Triggers Suspicion | Builds Trust |
|---|---|---|---|---|
| Technical Assessor | architecture, proof, integration, controls | generic overview, fluffy why-us | buzzwords, no method, vague diagrams | mechanism, trade-offs, clear status |
| Business Sponsor | executive summary, value case, implementation summary | deep technical detail, dense tables | jargon, vendor-first framing, weak summary | clear case, strategic fit, relevant proof |
| Risk/Compliance Officer | controls, governance, auditability, gaps | hype, generic feature lists | “fully compliant,” no control model, hidden limits | explicit governance, candid limits |
| Procurement Manager | TOC, response format, compliance matrix | deep technical internals not tied to criteria | missing sections, bad numbering, inconsistency | completeness, parallel structure, easy retrieval |
| Legal Counsel | commitments, IP-sensitive wording, SLAs, support statements | broad narrative, non-binding fluff | absolutes, roadmap blur, internal leaks | precise qualification, bounded claims |

---

## 9. Persona-weighted emphasis across the 10 dimensions

The proposal is still scored on the standard 10 dimensions.
But different personas implicitly weight them differently.
Use the following as a calibration tool, not as a rigid mathematical system.

### Technical Assessor weighting tendency
| Dimension | Relative Weight |
|---|---|
| Executive Readability | Medium |
| Technical Credibility | Very High |
| Requirement Coverage | High |
| Honesty & Transparency | High |
| Document Flow & Structure | Medium-High |
| Writing Quality | Medium |
| Client-Centricity | Medium |
| Visual Communication | Medium-High |
| IP & Confidentiality | Medium |
| Competitive Differentiation | Medium |

### Business Sponsor weighting tendency
| Dimension | Relative Weight |
|---|---|
| Executive Readability | Very High |
| Technical Credibility | Medium-High |
| Requirement Coverage | Medium |
| Honesty & Transparency | High |
| Document Flow & Structure | High |
| Writing Quality | High |
| Client-Centricity | Very High |
| Visual Communication | Medium |
| IP & Confidentiality | Low-Medium |
| Competitive Differentiation | High |

### Risk / Compliance Officer weighting tendency
| Dimension | Relative Weight |
|---|---|
| Executive Readability | Medium |
| Technical Credibility | High |
| Requirement Coverage | High |
| Honesty & Transparency | Very High |
| Document Flow & Structure | Medium |
| Writing Quality | Low-Medium |
| Client-Centricity | Medium-High |
| Visual Communication | Low-Medium |
| IP & Confidentiality | High |
| Competitive Differentiation | Low-Medium |

### Procurement Manager weighting tendency
| Dimension | Relative Weight |
|---|---|
| Executive Readability | Medium-High |
| Technical Credibility | Medium |
| Requirement Coverage | Very High |
| Honesty & Transparency | Medium-High |
| Document Flow & Structure | Very High |
| Writing Quality | Medium |
| Client-Centricity | Medium |
| Visual Communication | Medium |
| IP & Confidentiality | Medium |
| Competitive Differentiation | Low-Medium |

### Legal Counsel weighting tendency
| Dimension | Relative Weight |
|---|---|
| Executive Readability | Medium |
| Technical Credibility | Medium-High |
| Requirement Coverage | High |
| Honesty & Transparency | Very High |
| Document Flow & Structure | Medium |
| Writing Quality | Medium |
| Client-Centricity | Medium |
| Visual Communication | Low |
| IP & Confidentiality | Very High |
| Competitive Differentiation | Low |

---

## 10. Using persona-weighting without breaking the core rubric

Do not create five separate scorecards unless explicitly needed.
Instead:
1. score using the core 10-dimension rubric
2. sense-check whether one persona would strongly disagree with the current score
3. if yes, adjust the rationale and often the score

### Example
A document is beautifully summarised and visually clean, so initial enthusiasm pushes **Executive Readability** and **Document Flow & Structure** high.
But the procurement manager lens reveals broken numbering and inconsistent requirement handling.
That should pull structure down.

### Another example
A technically detailed document may initially seem strong on **Technical Credibility**.
But the legal and risk lenses reveal that roadmap items are blurred into current support.
That should pull down **Technical Credibility** and **Honesty & Transparency**.

---

## 11. Committee dynamics: how different scores interact

Proposal evaluation does not end with individual reading.
It continues in committee discussion, explicit or implicit.

### Common committee patterns

#### Pattern A: technical confidence, business hesitation
Technical assessor likes the architecture.
Business sponsor finds the summary unreadable.
Outcome: proposal stays alive but loses momentum.

#### Pattern B: business enthusiasm, risk veto
Business sponsor loves the vision.
Risk/compliance officer finds governance vague or overclaimed.
Outcome: shortlist risk increases sharply.

#### Pattern C: procurement drag
Technical and business readers are broadly positive.
Procurement manager finds the response hard to score, incomplete, or structurally sloppy.
Outcome: proposal underperforms in formal scoring despite good substance.

#### Pattern D: legal chill effect
The proposal looks strong overall.
Legal counsel spots broad commitments, internal leaks, or liability-sensitive ambiguity.
Outcome: internal caution rises; the proposal feels less safe.

### Reviewer implication
The right question is not “Would one reader like this?”
It is “Where would committee friction emerge?”

---

## 12. Persona conflict zones to watch closely

These are high-risk areas where persona priorities often collide.

### Conflict zone 1: technical detail vs executive clarity
Too little detail loses the technical assessor.
Too much unresolved detail loses the business sponsor.

**Reviewer task:** determine whether the document uses layering well enough that both personas can succeed.

### Conflict zone 2: persuasive differentiation vs legal precision
Strong competitive language can drift into unsupported or overbroad claims.

**Reviewer task:** test whether differentiators are bounded and evidenced.

### Conflict zone 3: completeness vs readability
Procurement wants complete coverage.
Business readers want digestibility.

**Reviewer task:** see whether structure and chunking reconcile both needs.

### Conflict zone 4: optimism vs compliance realism
Commercial teams want confidence.
Risk/legal readers want qualification.

**Reviewer task:** detect where the proposal slips from confidence into dangerous vagueness.

---

## 13. Multi-perspective evaluation method for the reviewer

Use this short method when scoring any serious proposal.

### Step 1: default reader pass
Read as the whole committee's first impression.
What is immediately clear?
What feels tailored, sloppy, credible, or generic?

### Step 2: persona stress tests
Run at least these quick tests:
- **technical** — where would they say “prove it”?
- **business** — what would they remember after one skim?
- **risk/legal** — where is wording too loose or too absolute?
- **procurement** — where is retrieval, completeness, or comparability weak?

### Step 3: friction forecast
Ask:
- who would champion this proposal?
- who would be skeptical?
- what objections would emerge in committee?
- which objections are fatal, and which are survivable?

### Step 4: score with committee reality in mind
Adjust dimension scores and rationales based on likely committee interaction, not isolated reading comfort.

---

## 14. Persona-based downgrade triggers

### Trigger: strong summary, thin proof
- business sponsor may stay positive
- technical assessor will drag the score down

### Trigger: rich technical detail, weak business framing
- technical assessor may be satisfied
- business sponsor will struggle to defend selection

### Trigger: honest architecture, blurry roadmap language
- technical assessor may give partial credit
- legal and risk readers will punish credibility and transparency

### Trigger: good content, bad formatting and response structure
- business and technical readers may forgive
- procurement manager may not

### Trigger: compelling claims, internal terms exposed
- some readers may not notice
- legal and risk readers will see process control weakness

---

## 15. Good and bad examples through persona lenses

### Example A: executive summary

**Text**
“Our cloud-native, enterprise-grade platform supports end-to-end digital asset capabilities across issuance, settlement, custody, and compliance.”

**Business sponsor reaction:** generic, vendor-centered, no clear value  
**Technical assessor reaction:** vague category statement, no mechanism  
**Risk/legal reaction:** “supports” what, exactly?  
**Procurement reaction:** not useful for scoring  

**Result:** broad weakness despite sounding polished.

### Example B: qualified capability statement

**Text**
“The current release supports issuance control, participant approval workflows, and deterministic settlement on EVM-compatible networks. MAS-specific reporting templates are not part of the standard release today; they would require configuration using the reporting layer and are planned for native packaging in Q3 2026.”

**Business sponsor reaction:** clear enough, honest  
**Technical assessor reaction:** bounded claim, credible  
**Risk/legal reaction:** likes qualification  
**Procurement reaction:** useful for scoring  

**Result:** strong multi-persona performance.

---

## 16. Reviewer phrasing for persona-based feedback

Use feedback language that names the stakeholder lens.
This makes comments more actionable and more realistic.

Examples:
- “A technical assessor will not accept this architecture description because the interfaces and control flows remain implicit.”
- “A business sponsor reading only the first two pages will not understand why this proposal is safer or more suitable than alternatives.”
- “A risk and compliance reviewer will see the governance language as under-specified because critical approvals and auditability are not described.”
- “A procurement manager will struggle to score this fairly because similar requirements are answered in different formats.”
- “Legal review would likely push back on this wording because it implies a broader commitment than the document actually demonstrates.”

This is much stronger than saying “needs more detail” or “tighten language.”

---

## 17. Reviewer checklist by persona

### Technical Assessor checklist
- [ ] Are key mechanisms explained?
- [ ] Are diagrams specific enough to test?
- [ ] Are benchmarks qualified with method?
- [ ] Are current vs future capabilities separated?
- [ ] Are trade-offs or assumptions visible?

### Business Sponsor checklist
- [ ] Can the case be understood from the summary?
- [ ] Is the value framed in client terms?
- [ ] Are the stakes and constraints understood?
- [ ] Is the proposal easy to repeat internally?
- [ ] Does the document leave a confident overall impression?

### Risk / Compliance checklist
- [ ] Are governance and approval controls explicit?
- [ ] Are compliance statements qualified and credible?
- [ ] Are limitations candid?
- [ ] Is operational risk treatment visible?
- [ ] Are auditability and accountability clear?

### Procurement checklist
- [ ] Can all requirements be located and compared?
- [ ] Is numbering and structure controlled?
- [ ] Are answers complete and consistent?
- [ ] Does the format respect the client's likely scoring workflow?
- [ ] Is the document obviously tailored and professionally assembled?

### Legal checklist
- [ ] Are commitments bounded and precise?
- [ ] Are absolutes avoided unless justified?
- [ ] Are roadmap items clearly labelled?
- [ ] Is the document IP-clean?
- [ ] Where could ambiguity create future dispute?

---

## 18. Secondary influencer personas

Formal evaluation committees rarely work alone. In regulated financial services procurement, three shadow personas often shape outcomes without holding a formal scoring role.

### IT Security / CISO-adjacent reviewer
Not always on the scoring panel, but frequently consulted before a vendor reaches shortlist. Primary concern: attack surface, access model, key management, incident disclosure practices, and third-party dependency chain. A proposal that does not give this reader something concrete on security architecture invites informal veto. Red flag: security framing borrowed from generic marketing language ("bank-grade security"). Trust signal: specific control types named — HSM integration, RBAC model, audit event log scope, key ceremony practices.

### Finance / Budget Controller
Often only sees the commercials and the risk summary. Their concern is cost predictability, hidden integration costs, and whether the proposed scope maps cleanly to the licensing model. Red flag: capability descriptions that blur what is platform, what is implementation services, and what is customisation. Trust signal: clear scope boundary and explicit "not included" statements.

### Change Management / Operations Lead
Responsible for internal adoption and continuity of operations. Concerned with onboarding complexity, support model, and whether the vendor will still be engaged when things go wrong operationally. Red flag: support commitments that rely on generic SLA language with no named escalation path. Trust signal: a realistic implementation phasing narrative and explicit statement of vendor operational involvement post-go-live.

### Reviewer implication
A proposal that satisfies only the formal panel may stall when informal gatekeepers push back. Ask whether the security, finance, and operational readability of the document is strong enough to survive secondary review.

---

## 19. DALP-specific evaluator concerns

When reviewing proposals for the Digital Asset Lifecycle Platform, evaluators in regulated financial institutions bring specific concerns that differ from generic enterprise software procurement.

### What financial services evaluators care about beyond generic criteria

**Regulatory alignment**
- Does the proposal distinguish between "supports compliance" versus "provides evidence of compliance"?
- Are specific regulatory frameworks named (MiCA, DLT Pilot Regime, MAS, FATF Travel Rule) with honest coverage statements?
- Does the proposal understand that compliance is client responsibility, not vendor guarantee?

**Custody and settlement integrity**
- Does the proposal clarify what the platform controls versus what sits outside (external custodians, settlement agents)?
- Are there honest statements about deterministic vs probabilistic settlement?
- Is there awareness that digital asset infrastructure involves multiple external dependencies?

**Operational continuity**
- Does the proposal acknowledge that digital asset operations require 24/7 capability and specific incident response?
- Is there realistic discussion of key management, backup, and recovery?
- Does the proposal understand that token management involves client-controlled keys, not vendor-held assets?

**Multi-jurisdictional complexity**
- Does the proposal acknowledge that tokenisation involves different regulatory regimes in issuance vs circulation?
- Is there realistic framing of passporting, licensing, and local regulatory approval?
- Does the proposal avoid promising "global compliance" without qualification?

### Persona-specific DALP red flags

| Persona | DALP-specific red flag |
|---|---|
| Technical Assessor | Claims "custody" without clarifying external-custodian model; present tense for roadmap token standards |
| Business Sponsor | Vague "regulatory support" without naming frameworks; no discussion of operational model |
| Risk/Compliance | "Fully compliant" without specifying which regulations; no mention of audit trails or governance controls |
| Procurement | Generic capability responses without mapping to specific regulatory requirements |
| Legal | Unqualified commitments on jurisdictional reach; unclear distinction between platform and implementation services |

### What reassurance each persona needs in a DALP proposal

- **Technical Assessor:** Explicit system boundaries, integration points, and a clean split between native capability, configuration, and external dependency.
- **Business Sponsor:** A plain-language explanation of why DALP reduces delivery risk and governance complexity compared with stitching multiple tools together.
- **Risk/Compliance:** Named controls, approval workflows, auditability, and precise wording that separates compliance support from compliance responsibility.
- **Procurement:** Requirement-by-requirement traceability, especially where jurisdiction, custody, reporting, or deployment model constraints affect the answer.
- **Legal:** Carefully bounded language on jurisdictions, counterparties, support obligations, and implementation scope, with roadmap items clearly labelled as non-current.

### Why this matters for scoring

A DALP proposal that scores well on generic criteria may still fail under financial services evaluator scrutiny if it:
- overclaims regulatory support
- blurs platform capability with implementation work
- ignores the external-dependency reality of digital asset infrastructure
- treats tokenisation as a single regulatory problem rather than a multi-jurisdictional one

When these patterns appear, they should pull down scores on Technical Credibility, Honesty & Transparency, and Requirement Coverage specifically for regulated procurement contexts.

---

## 20. Decision-stage persona shifts

Evaluation is not a single reading event. Real procurement moves through at least three stages, and the dominant persona — and therefore the dominant failure mode — shifts between them.

### Stage 1: Initial filter (longlist to shortlist)
**Dominant persona:** Business Sponsor + Procurement Manager.
The committee is screening for surface fit and response completeness. Most technical detail is unread at this stage. A weak executive summary or structural failure (missing requirements, broken numbering) eliminates proposals before deeper readers engage.

**What this means for scoring:** Executive Readability, Requirement Coverage, and Document Flow defects are disproportionately fatal at this stage. A technically brilliant document that fails basic completeness and clarity can be cut before anyone who could evaluate its quality has read it.

### Stage 2: Shortlist deep review
**Dominant persona:** Technical Assessor + Risk/Compliance Officer.
The shortlist review is where substance is pressure-tested. Claims need mechanism. Governance needs specifics. Roadmap vs current capability distinctions become critical. Technical assessors and risk reviewers do their full read here.

**What this means for scoring:** Technical Credibility, Honesty & Transparency, and Competitive Differentiation defects become decisive at this stage. A proposal that passed Stage 1 on confidence and structure can fail Stage 2 when the technical and compliance reviewers apply scrutiny.

### Stage 3: Clarification and negotiation
**Dominant persona:** Legal Counsel + Finance/Budget Controller.
Final-stage scrutiny focuses on what exactly the vendor is committing to, what the commercial terms mean, and where liability exposure sits. Legal and finance reviewers are most active here.

**What this means for scoring:** Overcommitted language, unqualified roadmap references, and blurry scope boundaries are highest-risk at this stage. A proposal can survive shortlist and then stall in clarification because the legal team finds wording that creates unacceptable exposure.

### Reviewer implication
When scoring a proposal, consider which stage it is entering. A pre-submission check should prioritise Stage 1 failure modes (completeness, clarity) first, then Stage 2 (credibility, transparency), then Stage 3 (precision, commitment language). A proposal that fails Stage 1 filters will never benefit from its Stage 2 strengths.

---

## 21. Persona-specific evidence standards

Each persona has a different threshold for what counts as "proof." A claim that satisfies one persona may read as unsubstantiated to another. When a proposal presents evidence, test whether it meets the standard of the most skeptical relevant reader, not the most forgiving one.

### Technical Assessor evidence standard
Accepts: architecture diagrams with labelled interfaces, benchmark results with methodology and conditions, configuration screenshots or API references, deployment logs or environment specifications, named protocols and standards with version numbers.
Rejects: testimonials, analyst endorsements, marketing collateral, benchmarks without methodology, architecture diagrams that show only boxes and arrows without data flows or failure paths.
Minimum threshold: mechanism must be traceable from claim to implementation. "We support X" requires showing how X works, not that X exists as a feature name.

### Business Sponsor evidence standard
Accepts: named client references with comparable context, quantified outcomes with timeframes, industry analyst positioning (if specific), executive-level case narratives, clear before/after comparisons.
Rejects: technical specifications without business translation, generic logos-on-a-slide, unquantified "success" stories, self-reported metrics without external validation.
Minimum threshold: a business sponsor must be able to retell the proof point in a steering committee without technical translation.

### Risk / Compliance Officer evidence standard
Accepts: audit reports or certifications with scope and date, named control frameworks with mapping, penetration test summaries (scope, date, remediation status), regulatory filing references, incident response procedure summaries.
Rejects: "We take security seriously" language, certifications cited without scope boundaries, compliance claims without naming the specific regulation, controls described in marketing language rather than operational language.
Minimum threshold: every compliance or security claim must reference a verifiable artifact, a named standard, or a specific operational procedure.

### Procurement Manager evidence standard
Accepts: requirement-by-requirement traceability, reference project lists with scope and date, clear status labels (supported / configurable / roadmap / not supported), completion percentages backed by itemised counts.
Rejects: narrative answers that force the evaluator to infer compliance status, partial evidence scattered across multiple sections, references to appendices that do not exist.
Minimum threshold: every requirement response must be independently scoreable without cross-referencing other sections.

### Legal Counsel evidence standard
Accepts: precise contractual language, defined terms with bounded scope, explicitly qualified commitments, referenced SLA frameworks with measurable thresholds, clear delineation of vendor vs client responsibility.
Rejects: aspirational language presented as commitment, absolute guarantees without carve-outs, implied obligations with no explicit boundary, roadmap items described in present tense.
Minimum threshold: every commitment-bearing statement must be enforceable as written without requiring interpretation.

### Reviewer implication
When a proposal presents evidence, ask: which persona's standard does this satisfy, and which persona would still find it insufficient? A proof point that works for the business sponsor but fails the technical assessor creates a predictable committee friction point. Flag the gap and name the persona who will object.

---

## 22. Persona veto thresholds

Most evaluation dimensions are scored and averaged. But each persona has a small set of hard conditions that operate outside the scoring model: conditions severe enough that, if triggered, the persona will effectively block selection regardless of how well the proposal scores elsewhere. These are not simply "things that lower the score." They are conditions that produce an internal veto — a refusal to endorse, a request for clarification that stalls the process, or a recommendation not to proceed that carries disproportionate weight in committee.

Knowing these thresholds helps the reviewer identify not just what is weak, but what is potentially fatal.

### Technical Assessor veto conditions
1. **Critical capability claimed that is demonstrably absent.** If the proposal asserts functionality (a protocol, integration, or control) that the technical reviewer can verify does not exist in the current release, the document loses credibility that no other section can recover.
2. **No mechanism for a requirement the technical assessor considers core.** Narrative confidence without traceable implementation for a technically mandatory requirement. The assessor cannot recommend a vendor they cannot explain.
3. **Roadmap item presented as current capability.** This is not just a transparency failure — it tells the technical assessor the vendor is either careless or deceptive. Both interpretations lead to the same outcome.

### Business Sponsor veto conditions
1. **No coherent business case after the summary.** If the sponsor cannot articulate why this proposal is the right choice in three sentences after reading, they will not champion it. A champion who cannot explain the case will not go to bat.
2. **Implementation risk framed in a way that feels unmanageable.** If the timeline, organisational impact, or delivery model triggers concern about internal disruption, the sponsor will look for reasons to delay or derisk. A technically strong proposal that reads as operationally dangerous will stall.

### Risk / Compliance Officer veto conditions
1. **Compliance claim without any named regulatory framework or control.** A proposal that says "we support compliance" without specifying what compliance means in the client's jurisdiction gives the risk officer nothing to test and everything to fear. This triggers an informal hold.
2. **Evidence of undisclosed internal detail.** If the proposal leaks internal vendor terminology, draft artefacts, or implementation notes that should never have reached a client document, the risk officer reads this as a signal of inadequate quality control — a governance risk in itself.
3. **No auditability or approval model described for critical actions.** In regulated financial services, a vendor who cannot explain who approves what and how it is logged signals that the operational model is ungoverned.

### Procurement Manager veto conditions
1. **Non-compliance with submission format.** Wrong template, exceeded page limits, missing required sections, or ignored formatting instructions. These are not scoring deductions — they are grounds for disqualification before scoring begins.
2. **Requirement response so inconsistent that fair scoring is impossible.** A procurement manager who cannot compare this proposal's answers to a competitor's on the same criteria cannot recommend it to a mixed committee. The document becomes unscoreable and therefore undefendable.

### Legal Counsel veto conditions
1. **Absolute warranty language in a scope the vendor cannot guarantee.** "Guaranteed uptime," "full regulatory compliance," "we ensure...": wording that creates legal exposure for the client organisation if relied upon. Legal counsel will request removal or clarification before signing off on selection.
2. **Scope boundary so blurred that contractual risk cannot be assessed.** If the proposal does not clearly separate platform capability, implementation services, configuration scope, and roadmap intent, legal counsel cannot advise on what the contract would actually govern. This creates an internal hold.
3. **Internal artefacts or third-party confidential information visible in the document.** Not just an IP risk for the vendor — a signal that the client would inherit process risk by working with this organisation.

### Reviewer implication
When scoring, ask whether any of these veto thresholds are triggered. A proposal that crosses a veto threshold for even one persona should be flagged as high-risk for selection failure regardless of its aggregate dimension score. Flag the specific condition, name the persona, and treat it as a P0 or P1 issue in the Top Issues block.

The existence of a veto threshold does not mean the overall score should collapse — a strong proposal that has one legal veto risk might score 38/50 and be entirely fixable. But the veto condition must be named explicitly, because a strong dimension score on nine areas does not protect against a blocking condition in the tenth.

---

## 23. Persona objection language in committee

Reviewers catch defects. Committees decide outcomes. The gap between an identified weakness and a committee-level objection is the language a persona uses when pushing back. If the reviewer can anticipate the specific phrasing a persona would use in committee, the review becomes more actionable: the proposal team can pre-empt the objection rather than simply fixing a defect.

This section catalogues the characteristic objection patterns each persona deploys in evaluation meetings. These are not abstract concerns. They are the phrases that appear in committee minutes, clarification requests, and internal recommendation memos.

### Technical Assessor objection language
- "How does this actually work?" — triggered by narrative claims with no mechanism or architecture detail.
- "This doesn't match what I've seen in practice." — triggered by performance claims, benchmarks, or deployment descriptions that contradict the assessor's operational experience.
- "They're describing what the product does, not how it integrates with us." — triggered by vendor-centric architecture that ignores the client's existing landscape.
- "I can't verify this." — triggered by claims that provide no testable artifact: no API reference, no configuration path, no deployment evidence.
- "This is a feature list, not a solution." — triggered by capability enumerations with no design rationale connecting them to the client's requirements.

### Business Sponsor objection language
- "I still don't understand why we'd pick them over [competitor]." — triggered by proposals that describe capability without articulating differentiation in business terms.
- "This reads like a product brochure." — triggered by vendor-first framing where the client's challenge, context, or constraints are absent from the argument.
- "I couldn't explain this to the board." — triggered by proposals where the value proposition is buried in technical detail or spread across disconnected sections.
- "What happens if this goes wrong?" — triggered by implementation plans that project confidence without acknowledging delivery risk or organisational impact.
- "They don't seem to understand our situation." — triggered by generic framing that could apply to any client in any jurisdiction.

### Risk / Compliance Officer objection language
- "Where are the controls?" — triggered by operational descriptions that explain what happens but not who approves, who audits, and how exceptions are handled.
- "They say 'compliant' but compliant with what?" — triggered by unqualified compliance claims that name no specific regulation, standard, or framework.
- "This creates exposure for us." — triggered by vendor commitments broad enough that reliance on them would shift risk to the client if they prove inaccurate.
- "I'd need to see evidence before I'm comfortable." — triggered by security, governance, or audit claims presented as assertions rather than referenced to artifacts (certifications, pen test reports, audit logs).
- "The operational model isn't clear." — triggered by proposals that describe the platform but not the ongoing operating procedures, support boundaries, or incident escalation path.

### Procurement Manager objection language
- "I can't score this fairly." — triggered by inconsistent response structure that makes cross-vendor comparison impossible on the same requirement.
- "They didn't answer the question." — triggered by narrative responses that discuss a topic area without directly addressing the specific requirement as stated.
- "Half of this is in the wrong section." — triggered by content placement that forces the evaluator to hunt across the document to assemble a complete answer.
- "This doesn't match the format we asked for." — triggered by template violations, numbering mismatches, or structural deviations from the issued RFP instructions.
- "Are they even taking this seriously?" — triggered by visible template residue, client-name errors, watermarks, or draft artifacts that signal assembly carelessness.

### Legal Counsel objection language
- "What exactly are they committing to here?" — triggered by statements that read as obligations but lack the precision to be contractually enforceable or bounded.
- "This wording is too broad." — triggered by absolute guarantees, universal claims, or unbounded scope statements that would create liability exposure if relied upon.
- "Is this current capability or a promise?" — triggered by present-tense descriptions of features that are roadmap items, creating implied warranty risk.
- "We'd need to negotiate this out before signing." — triggered by language that pre-empts or constrains the client's contractual position without explicit agreement.
- "There's internal material in here that shouldn't be." — triggered by leaked vendor artifacts, third-party references, or confidential information that signals weak document control.

### Reviewer implication
When flagging a defect in the review, consider which objection phrase it would produce in committee. Framing feedback as "A risk/compliance officer will say 'They say compliant but compliant with what?' because Section 7 claims regulatory support without naming MiCA, DLT Pilot Regime, or any specific framework" is more actionable than "compliance claims need more specificity." The proposal team can then address the exact committee objection rather than interpreting an abstract improvement suggestion.

When multiple personas would raise objections about the same section, note the convergence: overlapping objections from two or more personas signal a structural weakness, not a cosmetic one, and should escalate to P1 or higher in the Revision Priority table.

---

## 24. Cross-proposal comparison effects

Evaluators never read a proposal in isolation. They read it in a stack of two to six competing submissions, and impressions from earlier documents reshape how they score later ones. This creates systematic comparison bias that a reviewer should anticipate and flag.

### How comparison distorts scoring by persona

**Technical Assessor:** Anchors on the most architecturally specific proposal they have read. If a competitor provides labelled data flow diagrams, named protocols, and environment specifications, a proposal that describes "flexible integration capabilities" scores lower than it would in isolation, even if the underlying capability is equivalent. The assessor's internal benchmark shifts from "is this credible?" to "why is this less detailed than the other one?"

**Business Sponsor:** Anchors on the clearest value articulation. If one proposal opens with the client's challenge and builds to a quantified outcome, every subsequent proposal that opens with vendor biography feels weaker by contrast. The sponsor's patience for vendor-first framing drops with each proposal read.

**Risk / Compliance Officer:** Anchors on the most transparent disclosure. A proposal that proactively names limitations and residual risk raises the bar for every subsequent proposal. When the next submission claims "full compliance" without qualification, the contrast makes the overclaim more visible than it would have been alone.

**Procurement Manager:** Anchors on the most structured response. The first proposal with clean requirement-by-requirement traceability makes every subsequent narrative-style response feel harder to score. Comparison creates a fairness frustration: the procurement manager resents having to work harder for one vendor than another.

**Legal Counsel:** Anchors on the most precisely bounded commitment language. After reading carefully qualified obligations in one proposal, absolute or unbounded language in the next reads as either reckless or deceptive, not merely imprecise.

### Common comparison traps

**The "good enough in isolation" trap:** A section that would score 3.5/5 on its own drops to 3/5 when a competitor's equivalent section is visibly stronger. The absolute quality has not changed, but the evaluator's reference frame has.

**The halo competitor effect:** When one proposal is clearly strongest, evaluators unconsciously compare all others to it rather than to the scoring criteria. Second-place proposals lose ground not because they fail the rubric but because they fail the comparison.

**The recency anchor:** The last proposal read before scoring discussion carries disproportionate weight. Its strengths are fresher and its weaknesses are more salient. A proposal evaluated early in the stack must be more memorable to survive this effect.

### Reviewer implication

When reviewing a proposal, ask: "If a competitor provides a stronger version of this section, does our version still hold up?" Sections that are adequate in isolation but vulnerable to comparison should be flagged with a note: "Adequate on absolute criteria but likely to lose ground in a competitive stack if a competitor provides [specific stronger alternative]." This gives the proposal team a concrete revision target that goes beyond meeting the minimum standard.

---

A proposal is not reviewed by a mythical average reader.
It is reviewed by people with different incentives, fears, and thresholds of proof.

The best proposals make life easier for all five personas.
The weak ones satisfy one and alarm two others.

When in doubt, ask:
- who would love this?
- who would distrust it?
- who could block it?
- can the document survive that room?

If not, the score should show it.

---

## 25. Clarification-question triggers by persona

Not every weakness produces an immediate score penalty. Some weaknesses first produce a clarification question. In real procurement, clarification questions are not neutral. They signal where confidence is thin and where a competitor may already be ahead.

- **Technical Assessor:** asks for interface detail, deployment assumptions, performance conditions, and failure handling. A clarification here means the proposal did not make the mechanism legible enough on first read.
- **Business Sponsor:** asks who owns outcomes, how disruption is contained, and why this option is safer than alternatives. A clarification here means the business case did not travel cleanly.
- **Risk / Compliance Officer:** asks which control, which framework, which approver, and what evidence exists. A clarification here means the proposal sounds exposed, not governed.
- **Procurement Manager:** asks where a requirement is answered, whether a status is full or conditional, and which appendix proves it. A clarification here means the response is costly to score.
- **Legal Counsel:** asks whether wording is current capability, roadmap intent, or contractual commitment. A clarification here means the language boundary is too loose.

### Reviewer implication
If a section would predictably trigger a clarification from more than one persona, treat that as a pre-loss signal, not a harmless follow-up. The proposal is making evaluators work too hard to reach confidence.

---

## 26. What each persona needs before they will defend the proposal internally

A realistic buyer lens is not just "would they like this?" but "would they put their name behind it in a committee room?"

- **Technical Assessor:** will defend the proposal only if the mechanism is legible enough that they can answer follow-up questions without improvising. If they would have to guess at interfaces, environments, or failure handling, they will stay cautious.
- **Business Sponsor:** will defend it only if the proposal gives them a simple, repeatable case for business value, delivery safety, and why this choice is better than waiting or choosing a larger incumbent.
- **Risk / Compliance Officer:** will defend it only if the control model sounds governed, not merely capable. Residual risk can be acceptable, unexplained risk is not.
- **Procurement Manager:** will defend it only if the document is easy to score, cross-reference, and compare. Friction in navigation feels like vendor immaturity.
- **Legal Counsel:** will defend it only if commitments are bounded tightly enough that approval does not create hidden contractual exposure.

### Reviewer implication
When a section is technically acceptable but still hard for the relevant persona to champion, score more cautiously. Internal defendability is often the difference between a proposal that survives discussion and one that quietly slips down the ranking.
