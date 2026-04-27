# RFP Skeleton Definition

## What an RFP skeleton is
An RFP skeleton is a **buyer-side structural blueprint** for a procurement document. It does not contain the finished RFP or RFI text. It tells the RFP Forge **what sections the buyer document must contain, what each section is trying to achieve, how detailed it should be, what evaluation logic it should express, and which requirement groups to include**.

Think of it as the procurement team's build plan for a vendor-facing document.

A good RFP skeleton removes ambiguity for the writer. The writer should know:
- what the issuing organization needs to explain
- how scope, requirements, and evaluation criteria should be structured
- where mandatory vs desirable requirements must be separated
- what instructions vendors must follow when responding
- what commercial, legal, security, compliance, integration, and deployment topics must be covered
- what tables, appendices, and response forms should be included
- how formal or exploratory the procurement document should feel
- which evaluation gates apply and how scoring works
- what qualification criteria create pass/fail filters

## How RFP skeletons differ from bid-manager skeletons
Bid-manager skeletons are **vendor-side response blueprints**. They help SettleMint answer a buyer's document.

RFP Forge skeletons are the opposite. They are **buyer-side issuance blueprints**. They help a procurement team publish a document that vendors must answer.

### Core difference in perspective
| Dimension | Bid-manager skeleton | RFP Forge skeleton |
|---|---|---|
| Perspective | Vendor responding to a request | Buyer issuing a request |
| Primary goal | Present a credible answer | Define scope and collect comparable vendor responses |
| Default voice | "Here is how SettleMint meets the requirement" | "Vendors must describe how they meet the requirement" |
| Evidence focus | Proof of capability | Evaluation-ready requirement framing |
| Structure bias | Narrative + evidence + differentiators | Scope + requirements + process + evaluation |
| Primary risk | Overclaiming | Underspecifying or making vendors incomparable |
| Quality test | "Would this win the deal?" | "Would this produce defensible, comparable evaluations?" |

### Practical rule
- **Bid-manager skeleton:** how to answer procurement
- **RFP Forge skeleton:** how to write procurement

## What an RFP skeleton is not
An RFP skeleton is **not**:
- a finished procurement document
- a draft filled with vendor-facing prose
- a content library of reusable answers
- a legal template by itself
- a response pack
- an evaluation scorecard (though it defines how scoring should work)

If the file starts answering requirements instead of instructing how to frame them, it has drifted out of skeleton territory.

## Anatomy of an RFP skeleton entry
Every skeleton section should contain the following elements.

### 1. Section name
Use explicit numbering and section titles.

Example:
- `## Section 4: Technical Requirements`
- `### 4.2 Integration and Interoperability Requirements`

### 2. Target length
Give writers practical guidance in pages and words.

Example:
- `**Target length:** 8-12 pages (4,000-6,000 words)`
- `### 4.2 Integration and Interoperability Requirements (800-1,200 words)`

### 3. Purpose
State why the section exists from the buyer's standpoint.

Example:
- `**Purpose:** Define the technical capabilities vendors must evidence and create an evaluation-ready requirement set that enables scored comparison across bidders.`

### 4. Write-about instructions
Tell the writer what the buyer document must ask for.

Good instruction:
- `Write about platform architecture expectations, supported deployment models, interoperability constraints, resilience requirements, and buyer-owned control points. Frame requirements to distinguish mature platforms from generic capability claims.`

Weak instruction:
- `Write about technology.`

### 5. Requirement engineering guidance
Specify how requirements in this section should be constructed.

Example:
- `Requirements must be atomic (one per statement), testable (clear acceptance criterion), and prioritized (Must/Should/Could).`
- `Mandatory requirements serve as pass/fail qualification gates. Desirable requirements are scored on a 0-5 scale.`
- `Avoid vague adjectives — "scalable", "robust", "user-friendly" — unless quantified with measurable criteria.`

### 6. Format requirement
State the output format vendors will see and answer.

Examples:
- numbered requirements table (Req ID | Requirement | Priority | Response Type | Evidence Requested)
- weighted evaluation matrix
- submission checklist
- commercial pricing workbook appendix
- questionnaire response grid
- comply/non-comply matrix with narrative space

### 7. Required inclusions
Specify tables, diagrams, annexes, or forms that must appear.

Example:
- `Include: Requirement table (Req ID | Requirement | Priority | Vendor Response Type | Evidence Requested)`
- `Include: Procurement timeline table with milestones and buyer/vendor responsibilities`
- `Include: Scoring rubric table defining what each score level (0-5) means for this section`

### 8. Depth guidance
Tell the writer how precise the buyer document should be, calibrated to CLM level.

Example:
- `Depth: Requirements should be specific enough to distinguish mature platforms from generic capability claims. A CLM 3 institution needs moderate depth; a CLM 5 institution needs granular, testable specifications with acceptance criteria.`
- `Depth: At CLM 2, requirements may be framed as questions ("Does the platform support...?"). At CLM 4+, requirements must be framed as specifications ("The platform shall support...").`

### 9. Evaluation integration
Specify how this section connects to the overall evaluation methodology.

Example:
- `Evaluation: This section contributes 25% to the overall technical score (Gate D). Requirements marked Must are pass/fail; requirements marked Should and Could are scored 0-5.`
- `Evaluation: Use two-stage assessment — first check mandatory compliance (pass/fail), then score quality of approach for non-mandatory requirements.`

### 10. Reference sources
Point to the reusable content libraries or source overviews that should shape the requirement set.

Example:
- `Reference: rfp-forge/content/architecture/README.md`
- `Reference: product/dalp/capability-mapping/platform-architecture.md`

### 11. Buyer-side constraints
State what must not happen.

Examples:
- `Do not write vendor-answer content in this section`
- `Do not collapse mandatory and desirable requirements into one undifferentiated list`
- `Do not use vague asks that make vendor scoring subjective`
- `Do not write compound requirements — split into atomic statements`
- `Do not reference specific vendor products or architectures`

### 12. Anti-pattern warnings
Flag common mistakes for this section type.

Examples:
- `Anti-pattern: "The solution must be scalable" — unscorable without quantified metrics`
- `Anti-pattern: Listing 50+ Must requirements in a single section — evaluator fatigue and unrealistic expectations`
- `Anti-pattern: Mixing functional and technical requirements in the same table`

## Standard skeleton section blueprint
Use this pattern consistently:

```md
## Section 4: Technical Requirements
**Target length:** 8-12 pages (4,000-6,000 words)
**Purpose:** Define technical capabilities the vendor platform must demonstrate
**Evaluation weight:** 25% of Gate D score

### 4.1 Platform Architecture Requirements (15-20 requirements)
- Write about: Core architecture expectations — modularity, API-first design, workflow orchestration, scaling, event handling, tenancy, resilience
- Requirement engineering: Atomic, testable, prioritized. Must requirements are pass/fail. Should/Could are scored 0-5.
- Format: Numbered requirements table (Req ID | Requirement | Priority [Must/Should/Could] | Response Type [Comply/Narrative/Evidence/Demonstrate])
- Include: Target-state architecture diagram, buyer integration context note, assumptions list
- Depth: Each requirement should be concrete enough to score across vendors. Avoid "the system should be modern" — specify measurable expectations.
- Evaluation: Must requirements are qualification gates. Should/Could requirements scored per rubric in Section [Evaluation Methodology].
- Reference: `rfp-forge/content/architecture/README.md`
- Anti-patterns: "Must support all protocols" (which ones?), "Should integrate easily" (with what?), compound requirements
```

## Quality criteria for an RFP skeleton
A strong RFP skeleton should score well on:

1. **Coverage** — all buyer requirement domains are addressed
2. **Evaluation clarity** — scoring methodology is unambiguous and published
3. **Scope precision** — clear boundaries between in-scope and out-of-scope
4. **Requirement quality** — all requirements are testable, atomic, and prioritized
5. **Submission quality** — vendor response format is specified and enables comparison
6. **Commercial framing** — pricing structure enables apples-to-apples comparison
7. **Legal completeness** — contractual framework, liability, IP, and data provisions are included
8. **Proportionality** — document depth matches procurement value and complexity
9. **Repeatability** — skeleton can be adapted for similar procurements with minimal rework
10. **Vendor experience** — the document is structured so competent vendors can respond efficiently

## Red flags
Revise the skeleton if it:
- answers requirements instead of framing them
- lacks evaluation criteria or scoring logic
- omits vendor submission instructions
- mixes commercial, legal, and technical asks without structure
- contains vague wishlist statements that cannot be scored
- fails to distinguish mandatory vs desirable requirements
- has no appendices or response templates
- has more than 60% of requirements marked as mandatory (Must)
- includes compound requirements (multiple asks in one statement)
- uses vague adjectives without quantified metrics
- doesn't specify response format for requirements
- lacks pass/fail gates for vendor qualification
- doesn't include conflict-of-interest and NDA provisions
- has unrealistic timelines (less than 3 weeks for complex procurement)

## Skeleton scoring calibration
Use this quick calibration before finalizing any skeleton:
- **Strong (ready to use):** Every major section states purpose, target length, requirement format, evaluation treatment, and at least one anti-pattern to avoid.
- **Adequate (usable with review):** Core sections are present, but one or two sections still need sharper response-format or scoring guidance.
- **Weak (revise before use):** Sections read like topic lists rather than procurement instructions, or they omit pass/fail logic, response templates, or published scoring treatment.

If a skeleton cannot tell a writer exactly how vendors will be compared, it is not procurement-ready yet.

## Minimum standard for every RFP Forge skeleton
Every skeleton in this system must include:
- document metadata block (reference number, version, dates)
- issuing organization context and authority
- procurement objectives and scope
- definitions and glossary
- timeline and process with milestones
- submission instructions with format requirements
- evaluation methodology with published weightings and rubric
- qualification criteria with pass/fail gates
- technical requirements (testable, numbered, prioritized)
- security and compliance requirements where relevant
- commercial framework with pricing template
- legal and contractual requirements
- appendices: response templates, pricing workbook, NDA, COI declaration, glossary
