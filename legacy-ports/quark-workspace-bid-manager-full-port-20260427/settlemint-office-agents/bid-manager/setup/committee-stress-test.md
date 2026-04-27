# Committee Stress Test

This guide helps writers pressure-test a proposal against the evaluation committee that will actually read it.

Use `setup/buyer-personas.md` to understand who you are selling to. Use this file to understand who your document must survive once the written evaluation starts.

That distinction matters. Buyer personas are about motivation, sponsorship, and value framing. Committee stress-testing is about scrutiny, scoring, vetoes, and friction between readers.

A proposal can be commercially persuasive and still lose because:
- the business sponsor likes it but the technical assessor does not trust it
- procurement cannot score it quickly
- compliance sees loose wording around controls
- legal sees accidental over-commitment
- one skeptical reader cools the whole room

The aim here is simple: write proposals that hold up under mixed committee pressure.

---

## 1. What this file is for

This is a writer-facing review framework. It is not a market segmentation file. It is not a sales discovery template. It is not a generic stakeholder overview.

It answers one practical question:

**If the wrong person reads this section first, does it still hold up?**

That is how enterprise proposals are judged in reality. They are skimmed, sampled, excerpted, forwarded, and challenged. Different readers enter through different sections. Each one is looking for different proof. Each
one has different reasons to slow, score down, or veto.

Writers who optimize only for persuasion usually overplay confidence. Writers who optimize only for compliance usually drain the value story. Writers who optimize only for completeness often produce a document nobody
wants to read.

Committee stress-testing means balancing those pressures deliberately.

---

## 2. How this complements buyer personas

`buyer-personas.md` asks questions like:
- who owns the problem?
- who sponsors the initiative?
- who benefits from success?
- what value story matters to them?
- what objections appear during the sales process?

This file asks different questions:
- who reads the written proposal first?
- what do they read carefully versus skip?
- what triggers trust?
- what triggers suspicion?
- what makes them score down?
- what makes them veto?

Put plainly:
- **buyer personas** help you make the case
- **committee stress-testing** helps the case survive inspection

Example:
- A digital assets lead may like a bold story about fast tokenization rollout.
- A compliance reader may see under-specified governance.
- Procurement may see no clean answer to the requirement.
- Legal may see promises broader than the platform role.

The buyer may still like you. The proposal still loses.

---

## 3. Core operating principle

Do not write for one imaginary average evaluator. Write for a committee with unequal attention, unequal expertise, and unequal veto power.

Every major section should survive five tests:
1. **Would the Technical Assessor find this credible?**
2. **Would the Business Sponsor understand the point quickly?**
3. **Would Risk/Compliance see real controls rather than hopeful wording?**
4. **Would Procurement be able to score this without hunting?**
5. **Would Legal see bounded commitments rather than accidental overreach?**

If a section fails two or more of those tests, it is not ready.

---

## 4. The five evaluator archetypes

For DALP, blockchain, tokenization, compliance, and enterprise platform bids, the most common reader types are:
1. Technical Assessor
2. Business Sponsor
3. Risk / Compliance Officer
4. Procurement Manager
5. Legal Counsel

Real committees may merge or split these roles. The behavior patterns still repeat. Write for the behavior, not just the title.

---

## 5. Persona 1: Technical Assessor

### Mandate
This reader is trying to determine whether the proposal is technically real. Not exciting. Not ambitious. Real.

They test whether the solution can be implemented inside the buyer's environment without hidden heroics, magical integration, or roadmap camouflage.

### What they read first
- architecture overview
- integration design
- requirement answers tied to implementation
- control-heavy security sections
- diagrams
- migration and deployment approach
- operating assumptions

### What they skip
- generic company story
- broad innovation narrative
- inflated transformation language
- long executive prose with no mechanism
- feature lists with no architecture consequence

### What triggers trust
- clear system boundaries
- named interfaces and data flows
- explicit DALP components, orchestration, and dependencies
- separation between current capability and configuration work
- honest roadmap qualification
- credible deployment sequencing
- precise discussion of tokenization, workflow control, and enterprise integration
- examples that sound operational rather than theatrical

### What triggers suspicion
- blockchain buzzwords replacing explanation
- diagrams with labels but no behavior
- claims of seamless integration with no pattern named
- unsupported performance language
- vague compliance references with no control model
- enterprise complexity treated as trivial
- DALP described like custom consulting rather than a platform

### What makes them veto
- architecture they cannot mentally reconstruct
- major requirements answered with slogans instead of mechanics
- hidden dependencies
- roadmap blur presented as shipped capability
- obvious mismatch between promise and likely delivery effort
- control claims that sound impossible in a regulated environment

### Typical inner monologue
"Show me how this actually works."

### Writer guidance
Do not substitute adjectives for design. If you say DALP supports token lifecycle management, show the control points, approval flows, role boundaries, and integration touchpoints. If you claim compliance support, show
where rules are configured, how decisions are logged, and what the operating chain looks like.

### DALP / SettleMint example: good
"DALP separates asset lifecycle orchestration, identity-driven eligibility controls, and workflow approvals so issuance, transfer restrictions, and servicing events can be managed through governed platform workflows
rather than custom smart contract rewrites. ERP, CRM, custody, payment, and reporting systems integrate through documented APIs and event-driven interfaces. Where a client needs jurisdiction-specific reporting packs
outside the standard release, DALP's reporting layer can be configured without altering the core asset model."

Why it works:
- mechanism is visible
- boundaries are clearer
- configuration is distinguished from core capability
- enterprise reality is acknowledged

### DALP / SettleMint example: bad
"SettleMint's next-generation blockchain platform delivers full tokenization, compliance, and interoperability for any use case with rapid integration into existing enterprise systems."

Why it fails:
- nothing is testable
- scope is implausibly broad
- compliance is asserted, not explained
- integration language is empty

### Technical Assessor checklist
- [ ] Could a skeptical architect explain the solution back after reading this section?
- [ ] Are interfaces, control points, and dependencies visible?
- [ ] Is current capability separated from roadmap, extension, and configuration?
- [ ] Are claims about blockchain, tokenization, and compliance operational rather than promotional?
- [ ] Would a technical reviewer find a concrete proof anchor in every major section?
- [ ] Are benchmarks, resilience claims, or scale statements qualified?
- [ ] Have you avoided implying custom development when describing DALP as a platform?

---

## 6. Persona 2: Business Sponsor

### Mandate
This reader is judging whether the proposal solves the business problem in a way they can defend internally. They are not reading for engineering elegance. They are reading for decision confidence.

They need to understand what the buyer gets, why this approach is credible, what risk is controlled, and why choosing SettleMint will not create organizational chaos.

### What they read first
- executive summary
- client challenge framing
- solution summary
- implementation overview
- business outcomes and proof points
- differentiation
- high-level risk and mitigation summary

### What they skip
- dense technical subsections
- appendices unless flagged
- long control matrices with no summary
- detailed procurement instruction text
- boilerplate

### What triggers trust
- immediate recognition of the client's actual problem
- plain explanation of why DALP fits the operating context
- translation of blockchain and tokenization capability into business consequence
- a credible implementation path that sounds manageable
- relevant enterprise proof
- restraint in what is promised
- language they can repeat internally

### What triggers suspicion
- vendor-first opening paragraphs
- an executive summary that feels like a brochure
- jargon without business consequence
- exaggerated innovation rhetoric
- no clear reason this approach is safer or more practical than alternatives
- implementation language that ignores internal complexity
- all confidence, no boundaries

### What makes them veto
- they still do not understand the business case after skimming
- the proposal sounds clever but risky
- the solution feels detached from operational reality
- nothing clearly differentiates the offer
- the document cannot be defended upward or sideways

### Typical inner monologue
"Can I defend this choice without getting burned?"

### Writer guidance
Do not make this reader do translation work. Explain why DALP matters in terms of launch speed, governance, scalability, compliance readiness, operating efficiency, and adaptability across digital asset use cases.

### DALP / SettleMint example: good
"SettleMint's DALP gives the client a controlled path to launch tokenized asset workflows without building and governing a bespoke blockchain stack from scratch. The platform combines asset lifecycle controls,
configurable compliance workflows, and enterprise integration patterns so the organization can move from pilot to production with less implementation risk and clearer governance."

Why it works:
- business consequence is visible
- risk reduction is explicit
- platform position is clear
- the reader can repeat it internally

### DALP / SettleMint example: bad
"DALP uses enterprise blockchain primitives, modular services, and composable digital asset tooling to enable future-ready innovation across issuance and servicing."

Why it fails:
- sounds sophisticated, says little
- no business stakes
- no internal defensibility
- no credible buying reason

### Business Sponsor checklist
- [ ] Would a senior stakeholder understand the core case after reading the first two pages?
- [ ] Does the summary explain the buyer's problem before describing SettleMint?
- [ ] Are blockchain and tokenization described in business terms, not just technical terms?
- [ ] Is the implementation path calming rather than alarming?
- [ ] Could the sponsor use this language in a steering committee without rewriting it?
- [ ] Is differentiation visible without turning into chest-thumping?
- [ ] Does the document help a champion sound smart and safe?

---

## 7. Persona 3: Risk / Compliance Officer

### Mandate
This reader is looking for exposure, not inspiration. Their job is to prevent the institution from endorsing something that creates regulatory, control, governance, audit, or operational trouble.

For DALP proposals they are especially alert to:
- control claims around token issuance and transfer restrictions
- governance over participant onboarding and eligibility
- approvals, segregation of duties, and audit trails
- language around compliance support versus compliance outcomes
- cross-border, regulated, and enterprise operating realities

### What they read first
- governance and control sections
- compliance response tables
- auditability descriptions
- approval workflow descriptions
- security and operational control language
- any section referencing regulation, reporting, or oversight

### What they skip
- generic innovation language
- market hype about digital assets
- company story unless it reveals control maturity
- capability lists with no governance detail

### What triggers trust
- explicit approval and exception-handling logic
- clear distinction between platform capability and client governance responsibility
- precise statements about configurable compliance controls
- visible auditability
- sober risk boundaries
- honest gaps, partial coverage, or assumptions
- operational literacy about how blockchain workflows behave in regulated environments

### What triggers suspicion
- phrases like "fully compliant" without scope
- describing DALP as if software alone guarantees regulatory outcomes
- no description of who approves what
- no mention of logs, evidence, or exception handling
- implying tokenization magically simplifies regulation
- roadmap language in sensitive areas
- collapsing policy, process, and product into one fuzzy promise

### What makes them veto
- control gaps hidden inside aspirational prose
- sloppy compliance wording
- no credible governance model
- auditability not described where it should be
- approval responsibilities left ambiguous
- claims that would be hard to defend to regulators or internal risk committees

### Typical inner monologue
"Where are the controls, who owns them, and what evidence exists if this goes wrong?"

### Writer guidance
Do not sell compliance as magic. DALP can support governed asset workflows, configurable controls, auditability, and structured operating processes. That is strong enough. Do not overstate it.

Be precise about what the platform enables and where client policy or operating-model decisions sit. That precision builds more trust than bigger claims.

### DALP / SettleMint example: good
"DALP supports role-based approval workflows, policy-driven participant controls, and auditable lifecycle events so key actions such as issuance approval, transfer eligibility enforcement, and servicing events can be
executed within a governed operational model. The platform provides control points and evidence trails; the client's regulatory policy and oversight model determine how those controls are configured and operated."

Why it works:
- software capability is clear
- governance responsibility is not blurred
- auditability is visible
- language is defensible

### DALP / SettleMint example: bad
"DALP ensures full regulatory compliance across token issuance, investor onboarding, transfer control, and reporting."

Why it fails:
- impossible scope
- no qualification
- no control model
- invites hard questions the text cannot answer

### Risk / Compliance checklist
- [ ] Have you described controls rather than just outcomes?
- [ ] Is ownership of approvals, monitoring, and oversight clear enough?
- [ ] Are compliance statements qualified to the actual platform role?
- [ ] Can a reader see how tokenization workflows stay governed in practice?
- [ ] Have you shown where evidence and auditability come from?
- [ ] Are residual constraints, assumptions, or client responsibilities stated where needed?
- [ ] Would a skeptical compliance lead see this as mature rather than loose?

---

## 8. Persona 4: Procurement Manager

### Mandate
This reader protects process integrity. They care whether the proposal is complete, comparable, traceable, and easy to score against the buyer's instructions.

Many good bids lose here not because the solution is weak, but because the document is annoying.

### What they read first
- table of contents
- response structure
- requirement-by-requirement compliance mapping
- formatting discipline
- commercial response sections
- appendices only as verification support

### What they skip
- deep architecture detail unless tied to a requirement
- long narrative sections not mapped to evaluation criteria
- philosophical positioning

### What triggers trust
- visible discipline
- headings that mirror the request structure
- stable answer format across requirements
- explicit yes / partial / qualified responses where appropriate
- quick retrieval of evidence
- no template residue
- consistent terminology
- obvious effort to make scoring easy

### What triggers suspicion
- hidden answers
- inconsistent response patterns
- broken numbering
- sloppy tables
- page-limit abuse
- vague references like "see previous section"
- unmarked assumptions or exclusions
- internal codenames or draft artifacts leaking into the final response

### What makes them veto
- missing responses
- instructions ignored
- structure that obstructs scoring
- evidence not retrievable
- quality-control failures that imply unreliable delivery discipline

### Typical inner monologue
"Did they respect the process, and can I score this without reconstructing their intent?"

### Writer guidance
Never make procurement do detective work. If the requirement asks about audit trails for tokenized asset servicing, answer that requirement directly before elaborating. Do not bury the answer three pages later. Make it
scorable.

### DALP / SettleMint example: good
Requirement: "Describe support for compliant transfer restrictions and investor eligibility."

Response pattern:
- Status: Supported in the current platform
- Summary: DALP supports policy-driven transfer restrictions and identity-linked eligibility controls within governed workflow patterns
- Detail: short scorable explanation
- Evidence: reference to architecture or workflow section
- Qualification: only where jurisdiction-specific packaging differs

Why it works:
- scorable
- comparable
- honest
- retrievable

### DALP / SettleMint example: bad
"SettleMint has extensive experience across tokenization, settlement, compliance, and enterprise deployment, as discussed throughout this proposal."

Why it fails:
- not an answer
- impossible to score cleanly
- process-hostile

### Procurement checklist
- [ ] Does every requirement have a clear response, not just nearby content?
- [ ] Is the document structure aligned to the buyer's scoring workflow?
- [ ] Are answers consistent in shape and level of detail?
- [ ] Are qualifications explicit rather than hidden in prose?
- [ ] Can evidence be located fast?
- [ ] Is formatting controlled and free of draft residue?
- [ ] Would a procurement lead describe the document as easy to evaluate?

---

## 9. Persona 5: Legal Counsel

### Mandate
This reader looks for exposure created by language. They care about what the proposal commits to, implies, broadens, or leaves dangerously unclear. They usually have little patience for marketing prose and a strong radar
for absolute wording.

### What they read first
- support and service statements
- compliance language
- IP and confidentiality references
- data handling wording
- roadmap references
- obligations, warranties, and implied commitments
- commercial and contractual appendices where included

### What they skip
- broad strategic narrative
- product marketing language unless it creates liability
- technical depth with no contractual consequence

### What triggers trust
- disciplined qualifiers
- clear separation between current release, configurable capability, planned packaging, and non-standard work
- precise product terminology
- no accidental over-commitment
- clean IP boundaries
- careful statements about compliance, reporting, and support
- language that sounds reviewable rather than salesy

### What triggers suspicion
- absolute terms like "guarantees," "always," "fully compliant," or "all"
- future capability written in present tense
- ambiguous references to customer-specific outcomes
- mixing product functionality with implementation obligations
- leaking internal methods or proprietary artifacts
- unclear ownership language around deliverables or configurations
- support claims broader than the actual service model

### What makes them veto
- language that materially overcommits
- ambiguity that could become dispute later
- product statements that imply regulated outcomes beyond the platform role
- sloppy IP/confidentiality handling
- statements that commercial or product teams will later struggle to honor

### Typical inner monologue
"What exactly are they promising, and where could this come back to bite us?"

### Writer guidance
The goal is not to sound timid. The goal is to sound precise. Good legal-safe writing can still be confident. It usually sounds more professional than overcooked marketing copy.

### DALP / SettleMint example: good
"DALP provides configurable workflow, policy, and audit capabilities that can be used to support the client's governed digital asset operating model. Jurisdiction-specific legal and regulatory implementation remains
subject to the client's policy decisions, legal interpretation, and deployment design."

Why it works:
- bounded and accurate
- strong without pretending software replaces legal judgment
- safer for downstream review

### DALP / SettleMint example: bad
"DALP guarantees compliant operation for all tokenized assets across jurisdictions."

Why it fails:
- legally reckless
- commercially dangerous
- obviously broader than reality

### Legal Counsel checklist
- [ ] Are claims bounded to what DALP actually does?
- [ ] Have you avoided absolute wording unless it is truly supportable?
- [ ] Are roadmap, configuration, and current capability clearly separated?
- [ ] Is language around compliance, reporting, and legal outcomes carefully framed?
- [ ] Are IP and confidentiality references clean and client-safe?
- [ ] Could a lawyer mark this up lightly rather than rewrite half of it?
- [ ] Would a cautious buyer-side legal team feel alarmed by anything here?

---

## 10. Committee dynamics writers must anticipate

A proposal is not judged by simple average opinion. Committee behavior is lumpy. One reader can cool enthusiasm. Another can revive confidence. A third can make scoring harder than it should be.

### 10.1 Technical veto pattern
Common sequence:
- the business case lands well
- the sponsor likes the speed story
- the technical assessor spots vague integration language, architecture gaps, or roadmap blur

What happens next:
- enthusiasm shifts into caution
- technical follow-up multiplies
- earlier confidence gets discounted
- business value claims lose force because feasibility is now in doubt

How to prevent it:
- make the architecture reconstructable
- qualify capability precisely
- show control points and interfaces early
- do not let the technical pass feel like it uncovered the truth behind the summary

### 10.2 Business versus compliance tension
Commercial drafts often try to sound bold, fast, and transformational. That may work on a sponsor. It can trigger compliance anxiety if the same text sounds operationally loose.

Common tension areas:
- "rapid deployment" versus governance setup reality
- "streamlined compliance" versus actual control ownership
- "frictionless onboarding" versus eligibility, KYC, and approvals
- "end-to-end automation" versus exception handling and oversight

How to prevent it:
- keep the value story strong, but anchor it in governed workflows
- translate speed into controlled acceleration, not reckless acceleration
- whenever you promise simplification, show the control model underneath it

### 10.3 Procurement scoring friction
A proposal can be substantively good and still underperform because scoring is harder than it should be. This usually happens when writers fall in love with elegant narrative and forget the evaluation machinery.

Common failure modes:
- responses scattered across sections
- inconsistent answer formats
- qualifiers buried in prose
- requirement mapping left implicit
- section headings that sound clever but not scorable

How to prevent it:
- mirror the buyer's structure
- keep answer patterns consistent
- make qualifications visible
- use summaries before elaboration
- assume evaluators are comparing multiple responses side by side under time pressure

### 10.4 Legal chill effect
Legal does not always hard-veto immediately. Often the effect is colder. They raise enough concerns that confidence drops and the proposal starts feeling heavier, riskier, and harder to approve.

Common triggers:
- broad compliance promises
- undefined support obligations
- vague data handling language
- roadmap language that reads like commitment
- sloppy product-versus-service boundaries

How to prevent it:
- tighten obligation language early
- keep claims bounded
- review every promise for commercial survivability
- never rely on legal to clean up sales writing later

---

## 11. Persona collision zones

These are the places where a section can satisfy one reader and damage confidence with another.

### 11.1 Readability versus specificity
A clean summary helps the sponsor. A stripped-down summary frustrates the technical assessor.

Good pattern:
- short summary first
- sharper technical substantiation immediately after
- layered writing rather than diluted writing

Bad pattern:
- stripping out all mechanism to keep the prose light

### 11.2 Operational realism versus commercial optimism
Commercial language wants momentum. Operations, compliance, and legal want realism.

Good pattern:
- state the benefit clearly
- name the dependencies or governance conditions without apology
- sound in control, not overexcited

Bad pattern:
- using optimism to conceal implementation effort

### 11.3 Innovation claims versus risk comfort
Blockchain and tokenization proposals are especially vulnerable here. Innovation language can sound visionary to sponsors and reckless to control functions.

Good pattern:
- frame innovation as governed capability expansion
- describe control, auditability, and adaptability alongside the new model

Bad pattern:
- using "blockchain" as cover for weak operating detail

### 11.4 Completeness versus cognitive load
Procurement wants complete answers. Business readers want digestibility.

Good pattern:
- answer the requirement directly
- then provide deeper detail in a predictable place
- use summaries and tables as navigation, not as content dumps

Bad pattern:
- one giant paragraph trying to satisfy everyone at once

### 11.5 Precision versus persuasive energy
Legal-safe writing can become lifeless if done badly. Persuasive writing can become dangerous if done lazily.

Good pattern:
- confident verbs
- bounded scope
- specific nouns
- no inflated promises

Bad pattern:
- replacing specificity with dramatic adjectives

---

## 12. Writer-facing stress-test workflow

Use this after drafting any section with real substance: executive summary, solution overview, architecture, compliance response, implementation plan, and major requirement answers.

### Step 1: State the section's job
Ask:
- What must this section achieve?
- Which evaluator is most likely to read it first?
- Which evaluator could damage it most if unconvinced?

If you cannot answer that, the section is probably trying to do too many things badly.

### Step 2: Run the five-lens test
Read the section once through each lens.

**Technical Assessor**
- Would they find this credible?
- Can they see mechanism, scope, and boundaries?
- Where would they write "prove it"?

**Business Sponsor**
- Would they understand the point quickly?
- Does the section explain why this matters to the client?
- Can they repeat the core case without translation?

**Risk / Compliance Officer**
- Would this trigger concern about controls, governance, or auditability?
- Have you confused product capability with compliance outcome?
- Are approval and policy responsibilities visible enough?

**Procurement Manager**
- Could this be scored cleanly?
- Is the answer direct, structured, and retrievable?
- Are qualifications visible rather than hidden?

**Legal Counsel**
- Is any wording broader than the real commitment?
- Are current capability and future packaging separated?
- Would counsel tighten this section or rewrite it?

### Step 3: Mark the failure type
Do not just say "needs work." Name the defect. Typical failure types:
- unclear mechanism
- weak business translation
- hidden qualification
- loose control language
- non-scorable response structure
- legal overreach
- unsupported differentiation
- optimistic sequencing

### Step 4: Fix the highest-risk defect first
Not all defects matter equally. A slightly dry paragraph is survivable. A reckless compliance statement is not. A merely average summary can live. A requirement answer procurement cannot score cleanly will drag the whole
response.

Prioritize in this order:
1. hard-veto risk
2. scoring friction
3. credibility gaps
4. readability issues
5. style polish

### Step 5: Re-test after revision
Run the five-lens pass again. If a revision solved one problem but created another, keep editing. That is normal. That is the work.

---

## 13. Quick stress-test prompts

Use these in review sessions:
- Would the Technical Assessor believe this without rolling their eyes?
- Would the Business Sponsor know why this matters after one pass?
- Would Compliance flag this as vague, overbroad, or under-controlled?
- Would Procurement know exactly how to score this answer?
- Would Legal worry that we just promised too much?
- If this sentence were quoted out of context in committee, would it still hold up?
- If the harshest reader saw this section before the friendliest reader, would we still be okay?
- Does this sound like DALP the platform, or like imaginary custom consulting?
- Are we using blockchain language as explanation, or as camouflage?
- What would make a skeptical enterprise buyer say, "That sounds convenient, but not real"?

---

## 14. Practical red-team checks by section type

### Executive summary
- Does it open on the client problem, not on SettleMint biography?
- Does it explain why DALP is a fit in business terms?
- Does it avoid hiding critical qualifications until later?
- Would a sponsor and a procurement lead both find it useful?

### Solution overview
- Is the platform role clear?
- Are blockchain, tokenization, compliance, and enterprise integration described as connected capabilities rather than buzzword islands?
- Is the value story strong without becoming vague?

### Architecture
- Are components, integrations, and workflow boundaries visible?
- Are diagrams explanatory rather than decorative?
- Can a technical reader find the hard facts fast?

### Compliance / governance
- Are controls, approvals, and auditability explicit?
- Have you avoided claiming regulatory outcomes the platform cannot guarantee?
- Is the relationship between configurable controls and client governance clear?

### Implementation plan
- Does it sound deployable inside a real enterprise?
- Are sequencing, dependencies, and readiness assumptions sane?
- Is speed framed with realism?

### Requirement matrix responses
- Can procurement score them cleanly?
- Are direct answers given before narrative support?
- Are qualifications visible, not buried?

### Commercial / legal sections
- Are commitments bounded?
- Are support and service claims accurate?
- Is anything likely to trigger unnecessary redlines?

---

## 15. Bottom line

A strong proposal does not merely persuade the friendliest evaluator. It survives the hardest room.

For SettleMint and DALP bids, every serious section should be able to stand up to:
- technical scrutiny around architecture, controls, and integration reality
- business scrutiny around value, practicality, and internal defensibility
- compliance scrutiny around governance, evidence, and operational maturity
- procurement scrutiny around completeness, structure, and scorable clarity
- legal scrutiny around bounded commitments and safe wording

When in doubt, ask the only question that matters:

**If this paragraph were read aloud by a skeptic in committee, would it still help us?**

If the answer is no, fix it before the client sees it.
