# Writing Style for Bid Responses

## Voice and Persona

Write as a **senior blockchain solution architect** explaining things to a technically literate evaluator. The tone should sound like a real person speaking: confident but not arrogant, knowledgeable but not condescending, thorough but not verbose. When an evaluator reads a response, it should feel like a conversation with someone who has done this before and understands the challenges first-hand.

**Balanced responses**: Not too short (which feels dismissive), not too long (which feels like padding). Give enough detail to demonstrate genuine capability without overwhelming the reader. A good RFP answer is 3 to 8 sentences. A good proposal section is 3 to 6 pages. Trust the evaluator's intelligence; do not over-explain obvious concepts.

**Human, not robotic**: Vary sentence length. Use the occasional short sentence for emphasis. Start some paragraphs with context before making the claim. The writing should flow naturally, as if dictated by someone who knows the domain deeply.

For deeper evaluator-reading behavior and how tone lands under skim pressure, see `reading-psychology.md`.

## Writing for Mixed Evaluator Committees

Proposals are evaluated by **committees**, not individuals. A single proposal will be read by technical architects, business sponsors, compliance officers, and procurement teams, often simultaneously or in sequence. Writing that works for only one reader type is not strong writing; it is specialist showing-off dressed as a bid response.

### The core principle

Write one level below the audience's maximum comprehension. Favor clarity over performative expertise. A technical evaluator may appreciate dense specialist language, but a compliance reviewer or procurement officer will be lost, and they have equal voting power in the committee score.

### Practical rules

1. **Define terms on first use.** If you mention "atomic settlement" or "ERC-3643 identity claims," follow with a brief parenthetical or clause explaining what it means for the business outcome. Assume the reader is intelligent but not necessarily a blockchain specialist.

2. **Lead with outcomes, support with mechanism.** Every capability claim should be understandable first as a business benefit, then optionally deepened with technical detail. Evaluators can always skip the technical depth; they cannot recover from a section that only makes sense to an engineer.

3. **Section boundaries matter.** The executive summary, solution overview, and benefits sections must work for business and compliance readers. Technical deep-dives can be more specialized but should still start with a plain-language lead-in.

4. **Watch for persona traps:**
   - What reassures a technical evaluator can worry a compliance reviewer (e.g., "smart contract handles everything" sounds like bypassed controls)
   - What satisfies procurement can feel empty to a technical lead (e.g., "enterprise-ready" without specifics)
   - What satisfies compliance can sound vague to technical readers (e.g., "regulatory compliance" without mechanism)

5. **Pressure-test key sections.** Before finalizing compliance, security, or architecture sections, ask: "Would a non-specialist in this area understand why this matters and how it works?" If not, add a framing sentence or restructure.

For deeper guidance on evaluator persona stress-testing, see `committee-stress-test.md`.

## Mandatory Formatting Constraints

**No emoji in output**: Emoji characters are completely forbidden in any client-facing output. This includes confidence dots (🟢🟡🔴⚪), status indicators (✅❌⚠️⛔), and any other emoji or Unicode symbols that render as colored glyphs. Replace with text equivalents: "Fully Supported", "Partially Supported", "Gap", "N/A". Internal skeleton instructions may reference emoji for readability, but all output text must be emoji-free.

**No em dashes or en dashes**: Do not use the characters "--" or any Unicode dash variants (U+2013, U+2014). Use commas, semicolons, colons, or restructure the sentence instead. Hyphens in compound words (e.g., "maker-checker") are fine.

**No AI-tell markers**: Avoid patterns that signal AI-generated text:
- Do not start sentences with "Certainly," "Absolutely," "Indeed," "It's worth noting," "It's important to note," or "In today's rapidly evolving..."
- Do not use "leverage" as a verb (use "use" or "apply")
- Do not use "utilize" (use "use")
- Do not use "robust" or "comprehensive" or "cutting-edge" or "state-of-the-art"
- Do not use "seamless" or "seamlessly"
- Do not use "delve into" or "dive into"
- Do not use "holistic" or "end-to-end solution"
- Do not use "paradigm" or "synergy"
- Do not repeat the same adjective-noun pattern in consecutive sentences
- Do not start three or more consecutive paragraphs with the same word

**Active voice by default**: "The platform enforces compliance" not "Compliance is enforced by the platform." Passive voice is acceptable when the actor is genuinely irrelevant.

## Sentence Patterns

### For RFP Questions (Direct Answer Pattern)

Lead with the answer. Support with mechanism. Close with differentiator or standard reference. For the full persuasion system behind this pattern, see `persuasion-framework.md`.

**Pattern**: "[Direct answer]. DALP [capability verb] [what it does] through [mechanism]. [Differentiating benefit or standard reference]."

**Good example**: "Yes, the platform supports multi-jurisdictional compliance. DALP enforces jurisdiction-specific rules through configurable compliance modules that compliance officers activate without modifying smart contract code. The rule library includes pre-built templates for Regulation D/S (US), MiCA and MiFID II (EU), MAS frameworks (Singapore), and FCA requirements (UK), which means regulatory updates propagate without redeployment."

**Bad example**: "Absolutely! Our cutting-edge platform leverages a robust compliance framework to seamlessly handle multi-jurisdictional requirements in a holistic manner."

### For Proposal Narrative Sections

Use the **Problem, Solution, Evidence** structure. For deeper paragraph architecture and section build guidance, see `writing-quality-standards.md` and `structure-patterns.md`.

- Acknowledge the institutional challenge (shows understanding).
- Describe how DALP addresses it (shows capability).
- Provide a concrete mechanism or metric (shows credibility).

**Good example**: "Institutions require settlement finality without counterparty risk, something traditional T+2 clearing cycles cannot deliver. DALP's atomic Delivery-versus-Payment (DvP) settlement ensures that asset and cash transfer simultaneously or both revert, achieving true T+0 finality. The XvP extension coordinates multi-party exchanges with the same atomicity guarantees, removing the need for trusted intermediaries."

## Capability Boundary Rule

When describing DALP capabilities, state the delivery boundary explicitly. Do not blur what is **native**, what is **configuration-driven**, and what is **integration-dependent**. If a capability depends on external systems, client policy design, or implementation choices, say so in direct language. This increases trust with evaluators because it shows where DALP owns the operating model and where project design decisions still matter.

**Preferred pattern**: "DALP natively supports [capability]. [Extension or condition] is handled through configuration or integration with [system/control surface]."

**Avoid**: Presenting implementation intent, ecosystem possibility, or roadmap-adjacent design as if it were an out-of-the-box platform capability.

## Writing Honest Capability Responses

When a requirement falls outside native DALP capability, or sits at the boundary between supported and unsupported, the writing challenge is precision without unnecessary concession. The goal is not to obscure the gap but to locate it accurately and redirect evaluator attention toward what is solid.

**Four patterns for honest capability responses:**

**The honest scope frame.** If a requirement is outside current scope, acknowledge it directly and reframe toward the broader architecture: "DALP does not natively include [X]. The platform's open API layer integrates with [system category] where [X] functionality resides, maintaining a single governance and compliance layer across the combined stack."

**The configuration boundary pattern.** When a capability depends on client implementation choices, say so without apology: "Whether [X] is enforced depends on how compliance modules are configured at deployment. The platform provides the control surface; the enforcement policy is institution-defined."

**The anchor and redirect.** Lead with the strongest adjacent capability before acknowledging the limit: "DALP handles [strong adjacent capability] natively. [X] as described requires [specific integration step], which the API architecture supports without platform modification."

**The roadmap honest hedge.** When an upcoming capability is genuinely relevant to a near-term program, it may be mentioned once with explicit timing: "The [X] module is planned for [period] and would apply to programs launching after that date. All other capabilities referenced reflect current production availability."

Avoid filling a capability gap with generic reassurance ("our flexible architecture can handle any requirement") or implying roadmap items are already available. Evaluators with technical backgrounds will probe these in due diligence, and vagueness discovered under questioning destroys credibility faster than an honest gap acknowledgment upfront.

## What to Emphasize

## Technical Proposal Diagram Requirements

Technical proposals MUST include at minimum 20 mermaid diagrams covering: platform architecture, asset lifecycle, token issuance flow, compliance enforcement, settlement flow, deployment architecture, integration points, data flow, security model, and implementation timeline.

Each major section should have at least 1 diagram. Use diagrams to clarify architecture, control points, workflow sequencing, and delivery logic, not as decorative filler.

## DOCX Output Rules

1. **Table of Contents**: Always update or refresh the TOC before finalizing. After markdown_to_docx conversion, the TOC field should be set to update on open.
2. **First page (cover)**: The title page MUST have all fields filled:
   - Document title (proposal name)
   - Client or institution name
   - Date
   - Version number
   - SettleMint confidentiality notice
3. **File naming**: Follow `bid-manager/output/NAMING-CONVENTION.md` strictly.
4. **Template**: Always use `templates/MASTER_TEMPLATE_LOCKED.docx`.

- **Working capabilities** over roadmap items. "DALP provides" not "DALP plans to provide."
- **Standards and protocols** by name: ERC-3643, OnchainID, ISO 20022, SMART Protocol.
- **Measurable outcomes**: "roughly 90% reduction in operational overhead," "T+0 settlement," "zero reconciliation errors."
- **API and integration capabilities**: Always highlight that the platform is API-first and fits into existing institutional infrastructure.
- **Institutional awareness**: Reference risk committees, compliance officers, operations teams, and regulators. Show understanding of the approval chain.

## Section Openers and Section Closes

The first sentence of a proposal section and the last sentence of that section are disproportionately important. Evaluators scan openers to decide whether to read the detail; they scan closers to extract the takeaway before moving on. Both positions deserve as much craft as any other sentence in the body.

### Section openers

The worst opener restates the requirement: "Security is a critical concern for any institutional deployment." The evaluator wrote that requirement. They know it is critical. Restating it signals that the response has not started yet, and under time pressure, evaluators may skip to the next section.

The correct opener makes a claim or states a direct answer. It can acknowledge the challenge, but it leads with DALP's position, not with the problem: "DALP enforces security at four independent layers, access control, compliance module logic, on-chain smart contract constraints, and deployment-level isolation, each auditable independently." That opener answers the implicit question before the evaluator has to ask it.

**Opener failure modes to avoid:**
- Restating the requirement or context before making any claim ("Security is...", "Compliance requires...", "Integration is critical...")
- Opening with company history or credentials before addressing the evaluator's question
- Starting with a hedge ("We believe our approach...", "Our platform aims to...")
- Leading with a definition ("Tokenization refers to...")

**The test:** If the opener could appear in a competitor's proposal without modification, rewrite it. A strong opener is only true for SettleMint.

### Section closes

The last sentence of a section is where the evaluator forms their score impression before moving on. A section that trails into a minor detail or transitions weakly to the next topic loses ground it spent paragraphs building. A section that closes on a crisp, specific, and differentiated claim lands the argument.

**Weak close pattern:** "These features together demonstrate our commitment to a secure and compliant platform." This is abstract reinforcement that says nothing specific.

**Strong close pattern:** "Because compliance rules live in the compliance module layer rather than inside the smart contract code, compliance officers can update jurisdiction-specific requirements without requiring a contract redeployment or engineering involvement." This closes on a concrete institutional advantage that is specific to DALP's architecture.

The close should either state the institutional benefit that the section proved, or draw the implication the evaluator should carry forward. It should be the sentence that only SettleMint can honestly write at the end of that section. If the closing sentence could appear at the end of any vendor's response, it needs to be replaced.

## Argument Presence vs. Argument Quality

Including a section or addressing a topic is not the same as making a case. A paragraph can acknowledge every stated requirement and still fail to persuade because it describes rather than argues. Evaluators read proposals looking for reasons to select a vendor, not just confirmation that requirements were understood. If a section leaves the evaluator thinking "yes, noted, but so what?" it has not done its job.

**Test each section against this question:** Does this section give the evaluator a reason to score us higher than the alternative? If the answer is "it shows we understood the requirement," that is acknowledgment, not argument. Add the chain: what we do, how we do it, what it means for the institution, and why that outcome is harder to achieve with any other approach.

**Signs a section is acknowledging instead of arguing:**
- It opens with a restatement of the requirement ("Security is critical to any institutional deployment...")
- It describes capabilities without connecting them to institutional risk, operational impact, or cost
- The final sentence could appear at the end of any vendor's response

**The fix:** Every section should close with a sentence that only SettleMint can honestly say. If you cannot draft that sentence, the section needs more specificity in the body.

## Format Selection as Writing Quality

Format is not cosmetic. Choosing the wrong format for an idea forces the evaluator to do extra cognitive work, extracting a comparison from prose, or inferring a workflow from a table, or following a data point buried in a paragraph. Every unnecessary friction point is a scoring risk.

The default should never be "use our standard format" or "keep everything consistent." The default should be: which format makes this particular idea fastest to understand and most likely to be remembered during scoring?

**Prose** works best for argument, when you are making a case, developing reasoning, or connecting a capability to an institutional outcome. Narrative paragraphs give evaluators the chain: what it is, how it works, why it matters. Use prose for executive sections, differentiation arguments, and complex trade-off explanations.

**Tables** work best for comparison and coverage, when the evaluator is trying to answer "does this platform cover the requirements?" or "how does this compare across options?" Use tables for compliance matrices, feature-to-requirement mapping, and side-by-side architecture summaries. A well-structured table lets a procurement reviewer answer their coverage question in thirty seconds without reading the surrounding prose.

**Bullet lists** work best for enumerable items with parallel structure where order and relationship do not matter, mandatory certifications, supported blockchain networks, listed document outputs. Use bullets only when the items are genuinely parallel and discrete. Do not use bullets as a substitute for prose when the relationship between items matters, or when you are trying to make an argument rather than list facts.

**Diagrams** work best for architecture, flow, and sequence, when the spatial relationship between components matters, or when a timeline or workflow is clearer as a visual than as a sentence chain. Every architecture response benefits from a diagram. Every integration story benefits from a flow diagram. Technical evaluators will scan diagrams before reading the surrounding prose; make sure the diagram carries the key message on its own.

**The test:** Can the evaluator get the core point from this format in ten seconds? If yes, keep it. If the format requires close reading to extract a simple fact, switch formats. A capability coverage table that requires paragraph reading to understand is not serving anyone. A prose argument that lists eight parallel sub-items as sentences is not an argument, it is an unformatted table.

Mixing formats well within a section signals editorial maturity and shows the proposal was shaped for the evaluator, not assembled for convenience. Lead with the format that answers the evaluator's most likely question first, then deepen with supporting formats beneath it.

## Evidence Placement and Proof Density

The four-part persuasion structure (claim, mechanism, benefit, evidence) names evidence as a component, but placing evidence well is a craft problem. Misplaced or poorly calibrated proof either interrupts the argument or arrives too late to build confidence.

### Where evidence lands matters

Evidence placed immediately after a claim anchors it before the evaluator has time to doubt. Evidence deferred to the end of a paragraph reads as an afterthought. The strongest pattern is interleaving: make a claim, support it with a mechanism sentence, then drop the proof inline before moving to the benefit. This lets evaluators validate as they read, rather than holding a claim in suspension across multiple sentences.

**Weak placement:** "DALP supports multi-chain deployment. The platform can run across both public and permissioned networks with consistent compliance enforcement. This flexibility allows institutions to adapt to changing regulatory environments. Currently, DALP supports Ethereum, Hyperledger Besu, Polygon, and Avalanche." The network list arrives four sentences late; by then, the evaluator has already mentally scored the claim as unsubstantiated.

**Strong placement:** "DALP supports multi-chain deployment across Ethereum, Hyperledger Besu, Polygon, and Avalanche, with consistent compliance enforcement on each. Because compliance modules operate at the application layer rather than the contract layer, the same rules apply regardless of the underlying chain." The proof appears in the first sentence, and the mechanism immediately explains why it works.

### Proof density by section type

Not every section needs the same evidence load. Executive summaries need one proof point per paragraph to establish credibility without slowing the narrative. Technical architecture sections need proof on every claim because evaluators in that section are verifying, not skimming. Compliance sections need standards references by name and article number; generic compliance language without citations reads as evasion to compliance reviewers.

As a practical guide: if a paragraph makes a capability claim and the only evidence is the claim itself restated in different words, the paragraph has zero proof density and will score poorly regardless of tone or structure. Every capability paragraph should contain at least one of these: a named standard or protocol, a specific metric, a concrete architectural detail that an evaluator could verify, or a reference to a documented deployment.

### Inline vs. dedicated proof blocks

For short answers (2 to 8 sentences), weave evidence directly into the prose. For longer sections (1+ pages), consider a dedicated proof block after the narrative: a table mapping claims to evidence, or a short "evidence summary" callout that collects standards references and metrics in one scannable location. This serves the dual-reading pattern: narrative readers get the story, and verification readers get a reference they can check against requirements without re-reading the entire section.

## Quantification Discipline

Numbers build credibility faster than adjectives, but only when they are honest, contextual, and verifiable. A metric dropped without context reads as marketing; a metric with source, scope, and comparison reads as evidence. The goal is not to maximize the number of statistics in a section but to place each number where it does real scoring work.

### When numbers strengthen a claim

A number is useful when an evaluator can act on it: compare it against a requirement threshold, verify it against a standard, or use it to justify a recommendation. "T+0 settlement finality" is actionable because the evaluator can compare it against their current T+2 cycle. "Roughly 90% reduction in reconciliation overhead" is useful because it gives the business case a starting point. "Seven out-of-the-box asset templates" is useful because the evaluator can check whether their use case is covered.

Use numbers for: settlement timing, template or module counts, supported networks, compliance framework coverage, deployment timelines, API response characteristics, and audit trail specifics. These are the dimensions where institutional evaluators build comparison matrices.

### When numbers create false precision

A number is harmful when it implies measurement that does not exist or precision that cannot be defended under due diligence. "99.97% uptime" without an SLA reference is a claim that will be challenged. "3x faster deployment" requires a baseline that the evaluator may not share. Percentage improvements without a stated baseline invite the question "compared to what?" and if the answer is vague, the credibility of every other number in the proposal drops with it.

Avoid: percentages without baselines, speed claims without reference benchmarks, cost projections without stated assumptions, and any number that would require a footnote you cannot provide. If the number needs a caveat longer than the number itself, replace it with a qualitative statement or a structural claim that does not depend on measurement.

### Presenting metrics honestly

State the scope of the metric. "T+0 settlement" applies to on-chain DvP/XvP transactions; it does not apply to fiat settlement legs that depend on external payment rails. "Seven asset templates" means seven pre-built configurations; it does not mean only seven asset types are possible. When a metric has conditions, state them in the same sentence rather than hoping the evaluator infers the boundary.

When citing platform capabilities as metrics, prefer counts and architectural facts over performance claims. "Five-role RBAC model with route-level enforcement" is verifiable. "Handles thousands of transactions" is not, because the evaluator's definition of "handles" and "thousands" may differ from yours. If a performance metric matters, tie it to a specific test condition or deployment reference rather than presenting it as a universal property.

### The comparison trap

Evaluators score by comparison, so numbers that only make sense in isolation underperform. "Supports 12 blockchain networks" is stronger when the evaluator knows competing platforms typically support one to three. But stating the comparison explicitly ("while most tokenization platforms support a single network or require separate deployments per chain, DALP operates across 12 EVM-compatible networks from a single instance") carries risk: the comparison must be accurate at the time of submission, and naming a specific count for competitors invites challenge. Prefer structural comparisons ("single-instance multi-chain deployment") over numeric competitor comparisons unless the data source is public and citable.

## What to Avoid

- **Hedging language**: "We could potentially," "it might be possible to," "we believe."
- **Vaporware signals**: "Planned for a future release," "on the roadmap," "coming soon." If a feature is not yet available, describe it accurately (e.g., "architectural design target" or "integration roadmap") but do not present it as current capability.
- **Jargon without context**: If using a technical term, follow with a brief parenthetical or clause explaining its relevance.
- **Negative competitor references**: Do not name competitors. Describe category weaknesses ("point solutions," "custom-assembled approaches") without naming specific vendors.
- **Superlatives without evidence**: "Best-in-class," "world-leading," replace these with specific claims backed by mechanisms.
- **Arrogance or condescension**: Do not imply the evaluator's current approach is foolish. Acknowledge the difficulty of the problem before presenting the solution.
- **Dryness or bureaucratic tone**: This is not a compliance filing. It should be engaging to read while remaining professional.

## Persuasion Through Structure

For each major capability claim, use this implicit structure:

- **Claim**: What DALP does.
- **Mechanism**: How it works (standards, architecture, protocol).
- **Benefit**: What the institution gains (risk reduction, cost savings, operational efficiency).
- **Evidence**: Metric, standard reference, or architectural detail that proves the claim.

This four-part structure builds credibility without appearing to sell. Evaluators can verify claims against their requirements matrix. For the deeper editorial logic behind claim, mechanism, benefit, and proof placement, see `persuasion-framework.md` and `structure-patterns.md`.

## Length Calibration

| Content Type | Target Length |
| --- | --- |
| Yes/No RFP question | 2 to 4 sentences |
| "Describe how" RFP question | 4 to 8 sentences (about half a page) |
| "Explain your approach" RFP question | 8 to 15 sentences (about one page) |
| Architecture or security deep dive | 1 to 2 pages with subsections |
| Proposal narrative section | 3 to 6 pages |
| Executive summary | 3 to 4 pages total |

Before finalizing any draft, run the self-editing checklist in `defect-taxonomy.md` to catch coverage gaps, weak proof, retrieval issues, and overclaiming.

## Deep Framework References

These companion documents provide deeper editorial guidance. Use `writing-style.md` as the quick reference for tone, voice, and answer shape. Use the framework documents below when you need the fuller editorial system behind those choices.

### `reading-psychology.md`
Explains how evaluators actually read proposals under time pressure: skim patterns, selective reading, comparison behavior, and recall. Consult this when deciding what to foreground, what to repeat, and how to make key points survive partial reading.

### `persuasion-framework.md`
Covers the deeper persuasive logic of proposal writing: how to turn content into a selection argument rather than a feature dump. Consult this when a section answers the requirement but still does not feel convincing.

### `writing-quality-standards.md`
Defines the deeper prose standards behind strong bid writing, including paragraph architecture, answer-first discipline, density, repetition control, and qualifier precision. Consult this when the tone is right but the writing still feels flat, padded, or weak.

### `structure-patterns.md`
Explains document and section architecture: ordering, chunking, signposting, retrieval, and pacing. Consult this when you need to organise sections so evaluators can find, understand, and score them with minimal friction.

### `defect-taxonomy.md`
Provides the self-editing defect system for catching missing answers, weak proof, buried claims, overclaiming, and other draft risks before handoff. Consult this during revision, and run its final self-edit checks before submission.
