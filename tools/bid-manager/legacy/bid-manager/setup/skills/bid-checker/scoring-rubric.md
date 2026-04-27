# Scoring Rubric -- 10 Dimensions

Each dimension is scored 1-5. This rubric defines what each score level looks like with specific, observable characteristics. When in doubt between two levels, score the lower one -- proposals should earn their scores.

---

## 1. Executive Readability

| Score | Level | Description |
|-------|-------|-------------|
| **1** | Terrible | No executive summary, or the executive summary is a dense wall of technical jargon that assumes deep domain knowledge. A C-suite reader would stop reading after the first paragraph. The value proposition is buried or absent entirely. |
| **2** | Below Average | Executive summary exists but leads with company history or product features rather than the client's problem. Contains unexplained acronyms. Runs longer than 3 pages. A business sponsor could extract the gist but would struggle. |
| **3** | Acceptable | Executive summary addresses the client's need and is broadly understandable by a non-technical reader. Some jargon remains unexplained. Length is reasonable (1-2 pages). Gets the job done without inspiring confidence. |
| **4** | Good | Executive summary leads with the client's challenge, clearly articulates the value proposition, and is accessible to any senior stakeholder. Well-structured with clear takeaways. Minor polish needed. |
| **5** | Excellent | Executive summary immediately connects to the client's stated problem, builds a compelling case in under 2 pages, and leaves the reader wanting to learn more. Language is precise without being technical. Could be read aloud in a board meeting. |

### Checkpoints for a 5/5
1. **Opens with the client's problem, not the vendor.** First sentence references the client's challenge, regulatory context, or stated objective from the RFI/RFP.
2. **Value proposition is concrete and quantified.** Not "we help you modernise" but "we reduce settlement cycles from T+2 to T+0 with deterministic finality under 3 seconds."
3. **Zero unexplained acronyms.** Every abbreviation is spelled out on first use or is so standard in the client's domain that explaining it would be patronising (e.g., "AML" for a compliance audience).
4. **Fits on 1-2 pages.** Respects the evaluator's time. Every sentence earns its place.
5. **Ends with a clear next step or forward-looking hook.** The reader knows what happens if they shortlist this vendor.

### Common Failure Modes (2/5 territory)
1. **"About Us" opening.** The first paragraph is company founding date, office locations, and employee count. The evaluator has to dig to find what the vendor actually proposes.
2. **Feature dump disguised as a summary.** Lists 15 capabilities without connecting any of them to the client's stated needs.
3. **Acronym soup.** "Our DALP leverages DLT with PBFT consensus for DVP settlement of RWA via SPV structures with full KYC/AML integration" -- all in one sentence, none explained.

### Excellent vs Poor

**Excellent:** "The Central Bank of X has identified the need to modernise its securities settlement infrastructure to support T+0 settlement for digital bonds. Our platform addresses this by providing a regulated-grade settlement engine that has processed over EUR 2B in digital securities across 4 European jurisdictions, with deterministic settlement finality in under 3 seconds."

**Poor:** "SettleMint is a leading blockchain technology company founded in 2016 with offices in Belgium, India, Japan, and the UAE. Our Digital Asset Lifecycle Platform (DALP) leverages cutting-edge distributed ledger technology with a microservices architecture utilising event-driven patterns to deliver next-generation settlement capabilities."

---

## 2. Technical Credibility

| Score | Level | Description |
|-------|-------|-------------|
| **1** | Terrible | Technical claims are entirely unsubstantiated. Heavy use of buzzwords ("AI-powered," "next-generation," "revolutionary") with zero specifics. No architecture details. No performance data. Could be describing any product. |
| **2** | Below Average | Some technical detail exists but claims are vague ("high performance," "enterprise-grade"). Architecture described at a hand-wavy level. No benchmarks, no methodology, no reference deployments cited. |
| **3** | Acceptable | Architecture is described with reasonable specificity. Some performance claims have numbers but without methodology. Standards and protocols are named. A technical assessor can form a basic understanding but would have follow-up questions. |
| **4** | Good | Architecture is clearly described with specific components, protocols, and integration points. Performance claims include numbers and general test conditions. Reference deployments cited. A technical assessor is mostly satisfied. |
| **5** | Excellent | Architecture diagrams with specific components, data flows, and integration points. Performance benchmarks with full methodology (load profile, hardware, network conditions). Specific standards compliance with certification references. Reference deployments with scale and outcomes. A technical assessor could write a technical evaluation from this section alone. |

### Checkpoints for a 5/5
1. **Benchmarks include methodology.** Not just "2.3 seconds latency" but the test conditions: node count, hardware spec, network, load profile, and percentile reported (median vs P99).
2. **Standards referenced with specificity.** Not "compliant with ISO standards" but "implements ISO 20022 pain.001 and pain.002 message types for payment initiation and status reporting."
3. **Architecture descriptions name integration protocols.** REST, gRPC, webhook, message queue -- the evaluator knows how components talk to each other.
4. **Reference deployments include scale and outcomes.** "Deployed at [Bank X] handling 12,000 settlement instructions per day across 3 asset classes" rather than "used by leading financial institutions."
5. **Trade-offs are acknowledged.** Explains why a particular consensus mechanism or database was chosen and what was traded off. This signals genuine engineering depth.

### Common Failure Modes (2/5 territory)
1. **Buzzword stacking.** "Our AI-powered, cloud-native, enterprise-grade, blockchain-enabled platform" -- five adjectives, zero information. Technical evaluators actively penalise this.
2. **Performance claims without test conditions.** "Settlement in under 1 second" means nothing without knowing the network topology, transaction complexity, and load. Evaluators assume the number is cherry-picked.
3. **Architecture described only in abstractions.** "A robust microservices architecture with an event-driven backbone" tells a technical evaluator nothing about what services exist, what events flow between them, or how failures are handled.

### Excellent vs Poor

**Excellent:** "Under a test profile of 500 concurrent settlement instructions on a 4-node validator network (AWS c6g.xlarge, eu-west-1), the platform achieved median settlement latency of 2.3 seconds with P99 at 4.1 seconds. The consensus layer uses Istanbul BFT, chosen for deterministic finality over probabilistic alternatives, which eliminates the need for confirmation-depth waiting in settlement workflows."

**Poor:** "Our platform delivers industry-leading performance with best-in-class throughput, ensuring your settlement operations run smoothly at any scale thanks to our highly optimised and battle-tested infrastructure."

---

## 3. Requirements Coverage

| Score | Level | Description |
|-------|-------|-------------|
| **1** | Terrible | Large sections of the RFI/RFP are ignored. No compliance matrix. The response doesn't even acknowledge half the requirements. |
| **2** | Below Average | Most requirements addressed but several gaps are conspicuous. No systematic tracking (no compliance matrix). Some requirements answered vaguely -- clearly not understood. |
| **3** | Acceptable | All requirements addressed at some level. A compliance matrix exists. Some answers are thin -- "Yes" without elaboration. Gaps exist but are acknowledged. |
| **4** | Good | Every requirement has a clear, direct response. Compliance matrix is complete and accurate. "Partial" answers include timelines. Only minor gaps remain, all acknowledged. |
| **5** | Excellent | Every requirement receives a thorough, specific response. Compliance matrix is detailed with evidence references. "Partial" and "No" answers include mitigations and timelines. Coverage & Gaps section (where required) is honest and complete. Goes beyond minimum -- anticipates follow-up questions. |

### Checkpoints for a 5/5
1. **Every requirement has a status AND evidence.** The compliance matrix doesn't just say "Yes" -- it points to the section, page, or diagram where the capability is demonstrated.
2. **"Partial" answers include three things:** what works today, what's missing, and when the gap closes (with a specific quarter, not "future release").
3. **"No" answers include mitigations.** Not just "No" but "No -- however, the following alternative approach achieves the same outcome via [specific method]."
4. **Requirements are answered in the client's language.** If the RFP asks about "custody arrangements," the response uses "custody arrangements," not "asset safekeeping module." Mirror the client's terminology.
5. **Anticipated follow-ups are pre-answered.** If a requirement naturally raises "but what about X?", the response addresses X without being asked.

### Common Failure Modes (2/5 territory)
1. **The bare "Yes" wall.** A compliance matrix full of "Yes" entries with no elaboration. Evaluators treat this as suspicious, not reassuring.
2. **Answering a different question.** The RFP asks about disaster recovery failover time; the response describes the backup schedule. The requirement wasn't understood.
3. **Invisible gaps.** Requirements that are simply missing from the response, with no acknowledgment. The evaluator notices every one and assumes deliberate evasion.

### Excellent vs Poor

**Excellent:** "Requirement 4.3.2 (Multi-jurisdiction regulatory reporting): Partial. The platform currently generates regulatory reports for MiFID II (RTS 25) and Swiss DLT Act frameworks. MAS-specific reporting templates (referenced in your Section 2.1) are in development, targeted for Q2 2026. In the interim, the reporting engine's configurable template system allows manual creation of MAS-compliant report formats -- see Section 7.4 for the template configuration API."

**Poor:** "Yes." (In response to a multi-part requirement about regulatory reporting across jurisdictions the platform only partially supports.)

---

## 4. Honesty & Transparency

| Score | Level | Description |
|-------|-------|-------------|
| **1** | Terrible | Every answer is "Yes." No limitations acknowledged. Roadmap items presented as current capabilities. Obvious capabilities gaps are glossed over or ignored. The evaluator cannot trust any claim. |
| **2** | Below Average | Mostly "Yes" with rare "Partial." Limitations are downplayed or buried. Roadmap vs. current capability is unclear. The evaluator suspects they're being misled. |
| **3** | Acceptable | Some limitations acknowledged. "Partial" and "Planned" used occasionally. Mitigations exist but are vague ("planned for future release"). The evaluator gives partial credit for trying. |
| **4** | Good | Limitations clearly stated with specific mitigations and timelines. Roadmap items distinguished from current capability. The reader trusts the vendor is being straight with them. |
| **5** | Excellent | Limitations proactively highlighted with detailed mitigation plans and specific delivery timelines. Where competitors are stronger, this is acknowledged gracefully. The reader thinks, "This is a vendor I can have an honest conversation with." |

### Checkpoints for a 5/5
1. **Roadmap vs. production is always explicit.** Every capability is clearly labelled as "generally available," "in beta," "in development (target Qx 20xx)," or "under evaluation." No ambiguity.
2. **Limitations are stated before the evaluator has to ask.** The proposal volunteers gaps rather than hiding them. This reads as confidence, not weakness.
3. **Mitigations are specific and actionable.** Not "we plan to address this" but "Client Y is using [specific workaround] today, documented in our integration guide (Section 8.3)."
4. **Competitor strengths acknowledged where relevant.** "Unlike platforms that offer native SWIFT connectivity, our current approach uses a middleware layer" -- this builds trust because it shows self-awareness.

### Common Failure Modes (2/5 territory)
1. **The suspicious "Yes" pattern.** Answering "Yes" to capabilities the evaluator knows are hard or uncommon. Evaluators test for this -- if everything is "Yes," nothing is believed.
2. **Tense blurring.** "The platform supports..." when the feature is actually in development. Present tense for future capabilities is the most common form of proposal dishonesty.
3. **Buried limitations.** The limitation exists somewhere in the document but is surrounded by positive language designed to distract from it. Evaluators spot this and penalise it harder than a straightforward "No."

### Excellent vs Poor

**Excellent:** "Our platform does not currently support SWIFT ISO 20022 message generation natively. Settlement instructions are exported in our standard format and require a middleware translation layer. We are developing native ISO 20022 support, targeted for Q3 2026 (currently in design phase). In the interim, we provide a documented API and reference implementation for the translation middleware, which two existing clients have deployed successfully."

**Poor:** "Yes, we fully support all messaging standards including ISO 20022." (When the platform doesn't.)

---

## 5. Document Flow & Structure

| Score | Level | Description |
|-------|-------|-------------|
| **1** | Terrible | No discernible structure. Sections appear in random order. No table of contents. Numbering is inconsistent or absent. Reading the document feels like assembling a puzzle. |
| **2** | Below Average | Basic structure exists but sections feel disconnected. Transitions are absent -- the document jumps from topic to topic. Table of contents exists but doesn't match actual content. |
| **3** | Acceptable | Logical structure with a table of contents. Sections follow a reasonable order. Some transitions exist. The reader can navigate but the document doesn't flow naturally. |
| **4** | Good | Clear progression from context to solution to evidence to implementation. Sections build on each other. Transitions are smooth. The reader always knows where they are. Minor structural improvements possible. |
| **5** | Excellent | The document reads like a well-structured argument. Every section connects to the one before it and sets up the one after. The narrative arc is deliberate -- it builds confidence progressively. Navigation is effortless. The reader never feels lost or bored. |

### Checkpoints for a 5/5
1. **The document follows a deliberate arc.** Problem (client context) then solution (approach) then evidence (proof it works) then execution (implementation plan) then partnership (why us). Each stage builds on the last.
2. **Every section opens with a bridging sentence.** Not just a heading and straight into content. A one-sentence connection to what came before and what this section will establish.
3. **Cross-references are specific and useful.** "As described in Section 4.2" rather than "as mentioned earlier." The reader can jump around without losing the thread.
4. **Heading hierarchy is consistent and descriptive.** Headings tell the reader what they'll learn, not just what topic they'll encounter. "How Settlement Finality Is Achieved" rather than "Settlement."
5. **The conclusion ties back to the opening.** The final section returns to the client's challenge from the executive summary and closes the loop.

### Common Failure Modes (2/5 territory)
1. **Section island syndrome.** Each section reads like it was written by a different person with no awareness of the surrounding sections. No transitions, no cross-references, no narrative continuity.
2. **Table of contents drift.** The TOC says one thing but the actual document structure has diverged. Section numbers don't match. This signals sloppy assembly and no final review pass.

### Excellent vs Poor

**Excellent:** "Having established in Section 3 that the platform supports deterministic finality through PBFT consensus, we now turn to how this capability directly enables the T+0 settlement workflow your team described in Requirement 2.4. The settlement process consists of four stages, each designed to provide the transparency and auditability your compliance team requires..."

**Poor:** [Section 3 ends discussing consensus mechanisms. Section 4 begins:] "4. Implementation Timeline. The implementation will take 12 weeks. Phase 1 is discovery..." (No connection to what came before. No bridge. The reader is teleported to a new topic.)

---

## 6. Writing Quality

| Score | Level | Description |
|-------|-------|-------------|
| **1** | Terrible | Grammatical errors throughout. Inconsistent tense and voice. Bullet-point dumps instead of prose. Reads like an internal wiki page that was hastily reformatted. Painful to read. |
| **2** | Below Average | Grammar is mostly correct but the writing is flat. Every sentence follows the same structure. Passive voice dominates. Transitions are absent. Reads like a compliance exercise, not a persuasive document. |
| **3** | Acceptable | Competent professional writing. Grammar is clean. Some sentence variety. Occasional transitions. Reads like a decent corporate document -- not embarrassing, not memorable. |
| **4** | Good | Strong professional prose with sentence variety, good transitions, and a consistent voice. Active voice preferred. Technical concepts explained clearly. A pleasure to read in most sections, with only minor lapses. |
| **5** | Excellent | Polished, flowing prose that balances technical precision with accessibility. Sentence variety creates rhythm. Transitions are seamless. The voice is confident and human -- not robotic, not casual. Every section maintains quality. You'd quote passages in the evaluation meeting. |

### Checkpoints for a 5/5
1. **Active voice is the default.** "The platform settles transactions in under 3 seconds" rather than "Transactions are settled by the platform in under 3 seconds." Passive voice appears only when the actor genuinely doesn't matter.
2. **Sentence length varies intentionally.** A long explanatory sentence followed by a short punchy one. This creates rhythm. Monotonous sentence length is the hallmark of AI-generated or committee-written text.
3. **Technical terms are introduced, not dropped.** The first use of a technical concept includes a brief, natural explanation. "The platform uses PBFT consensus -- a mechanism where all validator nodes must agree before a transaction is confirmed, providing immediate finality."
4. **No more than 40% bullet points in any section.** Bullet points are for lists, not for avoiding the work of writing connected prose. If a section is mostly bullets, it hasn't been properly written.

### Common Failure Modes (2/5 territory)
1. **Passive voice everywhere.** "It was determined that the architecture would be designed to..." -- the reader has no idea who does what. This creates distance and reduces trust.
2. **Copy-paste texture changes.** One section uses British spelling and formal tone, the next uses American spelling and casual tone. Different fonts or heading styles appear mid-document. The proposal was clearly assembled from pieces without a final editing pass.
3. **Meaningless intensifiers.** "Very robust," "highly scalable," "extremely reliable" -- adverbs that add no information and signal that the writer couldn't find real evidence.

### Excellent vs Poor

**Excellent:** "Settlement finality matters because every minute a transaction remains unconfirmed is a minute of counterparty risk. Our platform achieves finality in under three seconds -- not because speed is a feature we market, but because the PBFT consensus mechanism we employ is designed for deterministic finality rather than probabilistic confirmation."

**Poor:** "- Platform supports settlement. - Settlement is fast. - Uses blockchain technology. - Finality is achieved. - Supports multiple asset types."

---

## 7. Client-Centricity

| Score | Level | Description |
|-------|-------|-------------|
| **1** | Terrible | The proposal is entirely about the vendor. The client's name could be replaced with any other name and nothing would change. No reference to specific requirements, regulatory context, or use cases mentioned in the RFI/RFP. |
| **2** | Below Average | Occasional references to the client's situation, but the majority of the document is generic product description. Case studies are from unrelated sectors. The client's specific requirements are acknowledged but not deeply engaged with. |
| **3** | Acceptable | The proposal references the client's requirements and addresses their stated use cases. Some tailoring is evident. Case studies are somewhat relevant. The client feels acknowledged but not prioritised. |
| **4** | Good | The proposal is clearly written for this client. Their requirements are referenced by number. Their regulatory context is reflected. Solution descriptions are framed in terms of client outcomes. The client feels understood. |
| **5** | Excellent | Every section connects back to the client's specific context. The opening demonstrates deep understanding of their challenges. Solution architecture is described in their terms, for their use cases. The reader thinks, "This vendor did their homework." |

### Checkpoints for a 5/5
1. **The client's own language is reflected.** If the RFP uses "digital bond issuance programme," the response uses "digital bond issuance programme" -- not "tokenisation solution" or "asset digitisation platform."
2. **Regulatory context is specific and correct.** Not "relevant regulations" but "MAS Notice SFA 04-N09 on digital payment token services" or "the ECB's settlement finality requirements under CSDR Article 39."
3. **Case studies match the client's profile.** A central bank gets case studies from other central banks or sovereign institutions, not from fintech startups. A Tier 1 bank gets references from regulated financial institutions, not crypto exchanges.
4. **Solution descriptions use client outcomes, not product features.** "Your operations team will see real-time settlement status across all asset classes in a single dashboard" rather than "The platform includes a comprehensive monitoring dashboard."
5. **The client's constraints are acknowledged.** Legacy system integration, regulatory timelines, internal approval processes -- the proposal shows awareness that the client operates in a real-world context with real constraints.

### Common Failure Modes (2/5 territory)
1. **The generic product brochure.** Search-and-replace the client name and the proposal works for any prospect. No reference to their specific RFP requirements, no mention of their jurisdiction, no awareness of their existing systems.
2. **Mismatched case studies.** A central bank evaluating a securities settlement platform is shown a case study about a DeFi protocol or a supply chain tracking project. The evaluator concludes the vendor has no relevant experience.
3. **Feature-first framing.** Every paragraph starts with what the platform does rather than what the client needs. The client has to do the mental translation work of figuring out why each feature matters to them.

### Excellent vs Poor

**Excellent:** "Your team described the challenge of managing securities settlement across three jurisdictions (Singapore, Hong Kong, and Australia) with different regulatory reporting requirements. Our platform's multi-jurisdiction settlement engine is currently deployed in a comparable three-jurisdiction configuration for [Reference Client], where it processes cross-border DVP settlements while generating jurisdiction-specific regulatory reports automatically."

**Poor:** "Our platform is a comprehensive digital asset lifecycle management solution used by leading financial institutions worldwide. It supports tokenisation, settlement, custody, and compliance across multiple blockchain networks."

---

## 8. Visual Communication

| Score | Level | Description |
|-------|-------|-------------|
| **1** | Terrible | Zero visual elements. 20+ pages of unbroken text. No tables, no diagrams, no timeline graphics. The document is a wall. |
| **2** | Below Average | A few tables exist (probably the compliance matrix) but no architecture diagrams, no process flows, no timeline visuals. Visual design is inconsistent -- different fonts, alignment issues. |
| **3** | Acceptable | Architecture diagram present. Compliance table present. One or two additional visuals. Design is functional if not polished. Diagrams are legible and labelled. |
| **4** | Good | Multiple well-designed visuals: architecture diagram, process flows, implementation timeline, comparison tables. Consistent design language. Diagrams are referenced in the text. Visual elements genuinely aid understanding. |
| **5** | Excellent | Visual communication is a first-class element of the proposal. Architecture diagrams are clear and detailed. Process flows show the client's workflow, not just the platform's. Timeline graphics show phases and milestones. Tables compare options clearly. Every visual earns its place and is integrated into the narrative. |

### Checkpoints for a 5/5
1. **Diagrams show the client's context, not just the product.** Architecture diagrams include the client's existing systems (core banking, SWIFT gateway, etc.) and show how the proposed platform integrates with them. Generic product architecture diagrams score lower.
2. **Every diagram is referenced in the text.** "As shown in Figure 3..." -- visuals are part of the argument, not decoration dropped in to break up text.
3. **Implementation timeline is visual, not just a table.** A Gantt-style or phase diagram with milestones, dependencies, and client decision points. The client should be able to see their own role in the timeline.
4. **Consistent visual language throughout.** Same colour palette, same font in diagrams, same level of detail. Not a mix of polished marketing diagrams and rough whiteboard sketches.

### Common Failure Modes (2/5 territory)
1. **The missing architecture diagram.** A technology proposal with no architecture diagram is like a house plan with no floor layout. Technical evaluators will assume the vendor doesn't have a clear architecture to show.
2. **Orphaned visuals.** A diagram appears in the document but is never referenced in the surrounding text. It sits there, unconnected to the argument, and the reader isn't sure what it's trying to show.

### Excellent vs Poor

**Excellent:** A process flow diagram titled "DVP Settlement Flow for [Client Name]'s Digital Bond Programme" showing four swim lanes (Client Operations, Settlement Platform, Custodian, Regulator) with numbered steps, decision points, and annotations explaining where manual intervention is required vs automated.

**Poor:** A single generic box-and-arrow diagram titled "Platform Architecture" with boxes labelled "Blockchain Layer," "Application Layer," "API Layer," and "UI Layer" connected by unlabelled arrows. No integration points, no data flows, no client context.

---

## 9. IP & Confidentiality

| Score | Level | Description |
|-------|-------|-------------|
| **1** | Terrible | Multiple internal tool names, code snippets, file paths, or internal project references exposed. The document reads like it was copy-pasted from internal documentation without review. |
| **2** | Below Average | One or two internal framework names appear (e.g., "TheGraph," "Restate"). No code or file paths, but the leaks are clearly internal implementation details that should have been caught. |
| **3** | Acceptable | No framework names or code exposed, but borderline terms exist (e.g., specific database names in architecture descriptions that could be more generic). Technically clean but not airtight. |
| **4** | Good | No internal terms detected. Architecture descriptions use appropriate client-facing language throughout. One very minor borderline case at most. |
| **5** | Excellent | Completely clean. Every technical reference uses appropriate client-facing terminology. The document demonstrates a clear understanding of the boundary between internal implementation and external communication. No metadata leaks in document properties. |

### Checkpoints for a 5/5
1. **Zero matches against the Category 1 term list.** Every internal framework name from `ip-checklist.md` has been replaced with client-facing language. "Blockchain indexer" not "TheGraph." "Durable workflow engine" not "Restate."
2. **No package paths, route paths, or version control references.** Nothing matching `packages/*`, `@dalp/*`, `PR-1234`, or branch names anywhere in the document.
3. **Architecture descriptions are implementation-agnostic.** Describes what the system does ("a high-precision arithmetic engine handles decimal calculations for financial instruments") rather than how it's built internally ("we use dnum for BigInt-based decimal arithmetic").
4. **Document metadata is clean.** Author fields, comments, track changes, screenshot URLs, and diagram tool artefacts have all been scrubbed. PDF properties don't reveal internal usernames or file paths.
5. **Code samples (if any) are sanitised.** API examples use generic endpoint paths and placeholder credentials. No internal function names, no real environment variable values, no import paths.

### Common Failure Modes (2/5 territory)
1. **Copy-paste from internal docs.** An entire section reads like it was lifted from an internal architecture document or README. Framework names, package references, and internal terminology flow through unedited.
2. **Screenshot leaks.** A screenshot of the platform's monitoring dashboard where the browser URL bar shows an internal domain, or the page title reveals an internal tool name.
3. **Diagram leaks.** An architecture diagram exported from an internal tool where node labels use internal package names or the diagram title includes the internal project codename.

### Excellent vs Poor

**Excellent:** "The platform's data indexing layer continuously processes on-chain events, transforming raw blockchain data into queryable, structured datasets. This indexing service maintains sub-second latency between on-chain events and API availability, enabling real-time portfolio views and settlement status tracking."

**Poor:** "We use TheGraph for blockchain indexing, with Restate handling the workflow orchestration. The indexer code lives in packages/blockchain-indexer and is deployed via our dalp-kit monorepo's CI pipeline."

**Automatic caps:**
- Any Category 1 term from `ip-checklist.md` found: capped at **2**
- Any Category 3 or 4 pattern found (code, file paths): capped at **1**

---

## 10. Competitive Differentiation

| Score | Level | Description |
|-------|-------|-------------|
| **1** | Terrible | No differentiation whatsoever. The proposal could describe any vendor. No positioning, no comparison, no reason to choose this vendor over alternatives. |
| **2** | Below Average | Generic differentiation ("we're the best," "industry-leading"). No specific comparison to alternatives. Differentiators are features, not outcomes. |
| **3** | Acceptable | Some differentiation exists -- a "Why Us" section with 3-5 points. Points are somewhat specific but not compelling. The evaluator understands the positioning but isn't convinced. |
| **4** | Good | Clear, specific differentiators tied to the client's requirements. Positioning acknowledges the competitive landscape without being disparaging. Evidence supports the claims. The evaluator can articulate why this vendor is different. |
| **5** | Excellent | Differentiation is woven throughout the document, not just in one section. Each major capability is positioned against realistic alternatives. Evidence is specific (patents, unique architecture decisions, reference clients in the same sector). The evaluator has clear, defensible reasons to shortlist this vendor. |

### Checkpoints for a 5/5
1. **Differentiators are outcomes, not features.** Not "we support 5 blockchain networks" but "your operations team can issue digital bonds on the network your regulators approve without re-platforming -- we're the only vendor that decouples the asset logic from the ledger layer."
2. **Differentiation is distributed, not siloed.** Instead of a single "Why Us" section at the end (which evaluators often skim), differentiators appear naturally throughout -- in the architecture section, in the implementation plan, in the case studies. The competitive advantage is embedded in the substance.
3. **Competitive positioning is factual, not emotional.** "Unlike platforms that require separate custody integrations, our platform includes native custody workflows" rather than "We are the market leader in custody solutions." Never name competitors directly unless asked.
4. **Evidence backs every differentiator.** If you claim faster time-to-market, cite a specific implementation timeline from a reference client. If you claim broader regulatory coverage, list the specific jurisdictions and frameworks.
5. **The differentiators matter to this client specifically.** A sovereign wealth fund cares about different things than a fintech startup. The differentiators are selected and framed for this evaluator's priorities.

### Common Failure Modes (2/5 territory)
1. **"Industry-leading" with no evidence.** Self-proclaimed superlatives without any supporting data. Evaluators treat unsupported claims as noise -- or worse, as a sign that the vendor has nothing substantive to say.
2. **Feature-based differentiation only.** "We have feature X, Y, and Z" without explaining why those features matter for this client's specific situation. The evaluator can't connect the dots between the feature list and their own needs.
3. **Differentiation confined to one section.** The "Why Choose Us" section at the end is the only place competition is addressed. The rest of the document reads generically. Evaluators who skim (most of them) miss it entirely.

### Excellent vs Poor

**Excellent:** "Most digital asset platforms require you to choose a blockchain network before designing your asset structure, locking you into a technology decision before your regulatory framework is finalised. Our platform inverts this: you define the asset's lifecycle rules (issuance, settlement, corporate actions) in regulatory terms, and deploy to any supported network when ready. For your programme, this means you can begin structuring the digital bond while the MAS regulatory consultation is still ongoing, without risking a re-architecture if the final guidance favours a different ledger technology."

**Poor:** "We are the industry leader in digital asset infrastructure with the most comprehensive platform on the market, trusted by leading financial institutions globally."

---

## Score Interpretation

| Total Score | Interpretation |
|-------------|---------------|
| **40-50** | Strong proposal. Shortlist with confidence. Minor polish only. |
| **30-39** | Competitive proposal. Specific improvements needed but the foundation is solid. |
| **20-29** | Below average. Significant rework required before submission. Multiple structural issues. |
| **10-19** | Poor. Fundamental rethinking needed -- not just editing. |
| **< 10** | Not submittable. Start over or fundamentally restructure the approach. |

---

## Cross-Cutting Red Flags

These issues affect multiple dimensions and should be called out prominently in any review:

1. **The Find-and-Replace Test.** If you can swap the client's name for another prospect and the document still reads correctly, the proposal fails on Client-Centricity and probably Executive Readability too.
2. **The "Who Wrote This?" Test.** If different sections have noticeably different writing quality, tone, or formatting, the proposal wasn't properly edited as a whole. Penalise Document Flow, Writing Quality, and Visual Communication.
3. **The Trust Erosion Pattern.** If the evaluator catches one dishonest or misleading claim, they will scrutinise everything else with suspicion. A single tense-blurred capability ("supports" when it's "developing") can drag Honesty & Transparency down to a 2 and reduce the effective score on every other dimension.
