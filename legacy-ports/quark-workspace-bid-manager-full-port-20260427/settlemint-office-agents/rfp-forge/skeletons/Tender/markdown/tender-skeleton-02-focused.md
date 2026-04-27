---
skeleton-family: rfp-forge
perspective: buyer-side issuance blueprint
document-type: tender
variant: 02-focused
last-updated: 2026-03-14
---

# Tender Skeleton — Focused

> **Target generated document size:** 40-60 pages / 9,000-14,000 words  
> **Perspective:** Buyer-side procurement issuer  
> **Output style:** Structural drafting instructions, not finished vendor-facing prose

## Global Skeleton Rules

- Use formal public-sector procurement language and rigid procedural structure.
- Separate selection criteria (threshold) from award criteria (scored).
- Prescribe pricing schedules, declarations, and public-disclosure handling explicitly.

## Document Metadata Block

- Reference number / procurement ID / version / issue date
- Issuing organization / authority / sponsor / contact point
- Clarification deadline / submission deadline / validity period
- Confidentiality, language, currency, and governing law / policy basis
- Document hierarchy, appendices, and response-template inventory

## Section 1: Authority, Procedure, and Tender Administration
**Target length:** 1,000-1,300 words
**Purpose:** Draft this section so vendors understand exactly what the buyer is asking for and how it will be evaluated.
**Evaluation integration:** Keep selection criteria, award criteria, admissibility, and contract conditions procedurally distinct.

### 1.1 Authority and legal basis (350-500 words)
- Section purpose: State authority and procurement route.
- Target word count: 350-500 words
- What to write about: State authority and procurement route. Write in buyer language, frame the requirement or prompt clearly, and define the expected vendor response format or completion behavior.
- Requirement engineering / structure: Use atomic statements, clear labels for mandatory vs scored items, and explicit evidence or response-type columns where relevant.
- Tables / diagrams to include: Include at least one structured table, matrix, checklist, or diagram that makes responses comparable and evaluator-friendly.
- Tone guidance: Institutional, precise, neutral, auditable, and free of vendor-answer language.
- Source references: `rfp-forge/setup/skeleton-definition.md`; `bid-manager/skeletons/1_technical/markdown/technical-full.md`; `rfp-forge/content/README.md`

### 1.2 Timetable and submission compliance (350-500 words)
- Section purpose: Provide admissibility and submission rules.
- Target word count: 350-500 words
- What to write about: Provide admissibility and submission rules. Write in buyer language, frame the requirement or prompt clearly, and define the expected vendor response format or completion behavior.
- Requirement engineering / structure: Use atomic statements, clear labels for mandatory vs scored items, and explicit evidence or response-type columns where relevant.
- Tables / diagrams to include: Include at least one structured table, matrix, checklist, or diagram that makes responses comparable and evaluator-friendly.
- Tone guidance: Institutional, precise, neutral, auditable, and free of vendor-answer language.
- Source references: `rfp-forge/setup/skeleton-definition.md`; `bid-manager/skeletons/1_technical/markdown/technical-full.md`; `rfp-forge/content/README.md`

### 1.3 Clarifications and declarations (350-500 words)
- Section purpose: Require integrity and conflict declarations.
- Target word count: 350-500 words
- What to write about: Require integrity and conflict declarations. Write in buyer language, frame the requirement or prompt clearly, and define the expected vendor response format or completion behavior.
- Requirement engineering / structure: Use atomic statements, clear labels for mandatory vs scored items, and explicit evidence or response-type columns where relevant.
- Tables / diagrams to include: Include at least one structured table, matrix, checklist, or diagram that makes responses comparable and evaluator-friendly.
- Tone guidance: Institutional, precise, neutral, auditable, and free of vendor-answer language.
- Source references: `rfp-forge/setup/skeleton-definition.md`; `bid-manager/skeletons/1_technical/markdown/technical-full.md`; `rfp-forge/content/README.md`

- Section-level tables / diagrams: Include a section summary table plus any response matrix, checklist, workflow, scoring rubric, or appendix index needed to make the section operational.
- Tone guidance: Keep the section tight, scorable, and administratively usable by procurement, legal, security, and evaluation teams.
- Source references: `rfp-forge/setup/skeleton-definition.md`; `bid-manager/skeletons/1_technical/markdown/technical-full.md`; `rfp-forge/content/README.md`
- Buyer-side constraints: Do not answer the requirement for vendors; do not hide key instructions in narrative prose; do not use vague unscorable adjectives.
- Anti-pattern warnings: Avoid compound requirements, unclear ownership, unlabelled mandatory items, and response formats that make vendor comparison subjective.

## Section 2: Requirements, Selection, and Award Criteria
**Target length:** 1,800-2,300 words
**Purpose:** Draft this section so vendors understand exactly what the buyer is asking for and how it will be evaluated.
**Evaluation integration:** Keep selection criteria, award criteria, admissibility, and contract conditions procedurally distinct.

### 2.1 Technical/service specification (350-500 words)
- Section purpose: Set core functional and technical service requirements for the digital asset platform being tendered.
- Target word count: 350-500 words
- What to write about: Define the in-scope digital asset capabilities the Authority requires — for example: asset issuance lifecycle (origination, tokenisation, issuance, servicing, maturity/redemption), custody model (self-custody, third-party custodian, or hybrid), settlement mechanisms (DvP, atomic swap, PvP), compliance controls (KYC/AML integration, regulatory reporting), and deployment model (cloud, on-premise, private cloud, hybrid). Distinguish between functional requirements (what the platform must do) and non-functional requirements (performance, availability, scalability). For digital asset tenders, explicitly specify whether smart contract customisation, multi-chain support, fiat/stablecoin integration, and white-label configuration are in-scope or explicitly excluded.
- Requirement engineering / structure: Number every requirement with a consistent prefix (e.g., TS-001, TS-002). Mark each requirement as Mandatory (Pass/Fail gate) or Scored. For mandatory requirements, state the acceptance criterion: "The Tenderer shall demonstrate [specific capability] by providing [specific evidence type]." For scored requirements, include the scoring weight and the rubric anchor at each score level. Do not combine two distinct requirements in one statement.
- Tables / diagrams to include: A two-column requirement compliance matrix (Requirement ID + Requirement Statement) that vendors complete with a Compliant / Partial / Non-Compliant indicator and a reference to supporting evidence. Include a separate non-functional requirements table (Requirement ID, Category, Metric, Threshold, Evidence Type).
- Depth guidance: Target 8-12 functional requirements covering the core capability areas relevant to the institution's stated scope. Limit non-functional requirements to 4-6 high-priority metrics (availability SLA, RTO/RPO, throughput, latency). Do not pad with generic IT requirements that any software platform would satisfy.
- Tone guidance: Write as a procurement officer specifying what the institution must receive, not as a vendor describing what it offers. Avoid adjectives like "robust," "comprehensive," or "world-class" — use measurable thresholds instead.
- Anti-patterns: Do not include requirements that are implicitly technology-specific (e.g., "the platform must use Ethereum") unless the Authority has a stated mandate for a specific chain. Do not use compound requirements ("The platform shall support issuance and custody and reporting"). Do not list vendor marketing claims as requirements.
- Source references: `rfp-forge/content/security/security-requirements-patterns.md`; `rfp-forge/content/integration/integration-requirements-patterns.md`; `rfp-forge/setup/writing-style.md`; `rfp-forge/setup/skeleton-definition.md`

### 2.2 Selection criteria and exclusions (350-500 words)
- Section purpose: Define the mandatory threshold conditions that bidders must satisfy before their award-stage response is opened or evaluated.
- Target word count: 350-500 words
- What to write about: Selection criteria are pass/fail gates applied before award scoring begins. They cover: (a) legal standing and exclusion grounds — the Tenderer must confirm it is not subject to mandatory or discretionary exclusion grounds under the applicable procurement regime (EU Directive 2014/24/EU Art. 57, UK Procurement Act 2023 s.57, or equivalent); (b) financial standing — minimum annual turnover, net assets, professional indemnity and cyber liability insurance thresholds appropriate to the contract value; (c) technical capability evidence — relevant prior deployments of similar digital asset platforms at regulated financial institutions, naming at least two reference contracts within the last five years; (d) regulatory compliance standing — confirmation that the Tenderer holds or is not required to hold applicable authorisations in the jurisdiction (e.g., VASP registration, DORA compliance attestation, ISO 27001 certification). State exclusion grounds explicitly: automatic disqualification for false declarations, submission after the deadline, or failure to meet a mandatory financial threshold.
- Requirement engineering / structure: Present selection criteria in a table with columns: Criterion Reference | Criterion Description | Evidence Required | Pass/Fail Standard. Separate mandatory exclusions (automatic disqualification) from financial standing (threshold pass/fail) from technical capability (evidence-based assessment). Do not score selection criteria — they are binary gates.
- Tables / diagrams to include: A selection criteria checklist table (Criterion Reference, Description, Required Evidence, Assessed By). Optionally include a minimum financial standing summary table (insurance type, minimum limit, acceptable form of evidence).
- Depth guidance: 4-6 selection criteria are sufficient for a focused tender. Avoid over-specifying selection criteria — overly narrow gates create legal challenge risk and reduce market competition. Each criterion must map to a specific exclusion ground or regulatory requirement, not a general quality aspiration.
- Tone guidance: Use declarative language: "The Tenderer shall confirm…", "The Tenderer shall provide evidence of…". The evaluation is binary — a Tenderer either satisfies the criterion or is excluded. Avoid qualified language ("should be able to demonstrate").
- Anti-patterns: Do not set financial thresholds so high they exclude viable vendors without justification. Do not include award-stage scoring factors (e.g., "quality of past work") in selection criteria — selection is about eligibility, not performance quality. Do not repeat exclusion grounds that are already covered by a statutory declaration form in the annexes.
- Source references: `rfp-forge/content/compliance/jurisdiction-compliance-requirements.md`; `rfp-forge/setup/writing-style.md`; `rfp-forge/setup/skeleton-definition.md`

### 2.3 Award criteria and scoring (350-500 words)
- Section purpose: Publish the full evaluation framework — category weights, subcriteria, scoring rubric, and methodology — so vendors know exactly how their submission will be assessed.
- Target word count: 350-500 words
- What to write about: Award criteria are the scored evaluation factors applied to compliant submissions after selection criteria are passed. For a digital asset platform tender, typical award categories are: Technical Quality (platform capability, architecture, security, integration); Implementation Approach (delivery methodology, risk mitigation, transition plan); Commercial (total cost of ownership, pricing structure, commercial terms); and Sustainability / ESG / Local Content where required. Publish the weighting for each category (must sum to 100%). For each category, define at least two subcriteria with individual weights and a scoring rubric that specifies what a top score, mid score, and minimum passing score looks like. State whether evaluation uses a merit-point method, price-quality ratio, or lowest-price technically acceptable (LPTA) approach. If a two-envelope system is used (technical first, commercial second opened only for technically compliant submissions), state this explicitly.
- Requirement engineering / structure: Present the award framework in a weighted evaluation matrix: Category | Weight (%) | Subcriterion | Subcriterion Weight (%) | Score Range | Rubric Anchor. The rubric anchor for each subcriterion should state the distinguishing characteristic at the top score (e.g., "5 = Evidence of live deployments at two or more regulated financial institutions with demonstrated uptime SLA compliance, validated by reference contact") vs minimum pass (e.g., "1 = General description without specific evidence or reference"). This makes the evaluation legally defensible and reproducible across evaluators.
- Tables / diagrams to include: A full weighted evaluation matrix as the primary output of this sub-section. Optionally include a scoring guide summary table: Score | Label | Definition (5=Excellent, 4=Good, 3=Adequate, 2=Weak, 1=Minimum Pass, 0=Non-Compliant/Excluded).
- Depth guidance: 3-5 award criteria categories, each with 2-3 subcriteria, is the right scope for a focused tender. Do not add subcriteria that cannot be evaluated from the required submission materials — if you cannot score it from the response, do not include it.
- Tone guidance: The award criteria section must be precise enough that two independent evaluators would reach the same score range for the same submission. Avoid qualitative descriptors without anchors. Do not include subjective criteria like "innovation" unless you define specifically what would constitute an innovative response and how it would be scored.
- Anti-patterns: Do not set Technical Quality weight below 40% for a digital asset platform procurement — commercial weighting above 60% in a regulated domain creates vendor-race-to-bottom risk. Do not use a single aggregate score with no subcriteria breakdown — this is legally vulnerable. Do not conflate selection criteria (threshold pass/fail) with award criteria (scored) in the same table.
- Source references: `rfp-forge/setup/skeleton-definition.md`; `rfp-forge/setup/writing-style.md`; `rfp-forge/content/procurement/common-question-patterns.md`

- Section-level tables / diagrams: Include a section summary table plus any response matrix, checklist, workflow, scoring rubric, or appendix index needed to make the section operational.
- Tone guidance: Keep the section tight, scorable, and administratively usable by procurement, legal, security, and evaluation teams.
- Source references: `rfp-forge/setup/skeleton-definition.md`; `bid-manager/skeletons/1_technical/markdown/technical-full.md`; `rfp-forge/content/README.md`
- Buyer-side constraints: Do not answer the requirement for vendors; do not hide key instructions in narrative prose; do not use vague unscorable adjectives.
- Anti-pattern warnings: Avoid compound requirements, unclear ownership, unlabelled mandatory items, and response formats that make vendor comparison subjective.

## Section 3: Commercial Schedule, Contract, and Annexes
**Target length:** 1,500-2,000 words
**Purpose:** Draft this section so vendors understand exactly what the buyer is asking for and how it will be evaluated.
**Evaluation integration:** Keep selection criteria, award criteria, admissibility, and contract conditions procedurally distinct.

### 3.1 Pricing schedule (350-500 words)
- Section purpose: Provide prescribed pricing form.
- Target word count: 350-500 words
- What to write about: Provide prescribed pricing form. Write in buyer language, frame the requirement or prompt clearly, and define the expected vendor response format or completion behavior.
- Requirement engineering / structure: Use atomic statements, clear labels for mandatory vs scored items, and explicit evidence or response-type columns where relevant.
- Tables / diagrams to include: Include at least one structured table, matrix, checklist, or diagram that makes responses comparable and evaluator-friendly.
- Tone guidance: Institutional, precise, neutral, auditable, and free of vendor-answer language.
- Source references: `rfp-forge/setup/skeleton-definition.md`; `bid-manager/skeletons/1_technical/markdown/technical-full.md`; `rfp-forge/content/README.md`

### 3.2 Contract terms and performance (350-500 words)
- Section purpose: Set key legal and KPI baseline.
- Target word count: 350-500 words
- What to write about: Set key legal and KPI baseline. Write in buyer language, frame the requirement or prompt clearly, and define the expected vendor response format or completion behavior.
- Requirement engineering / structure: Use atomic statements, clear labels for mandatory vs scored items, and explicit evidence or response-type columns where relevant.
- Tables / diagrams to include: Include at least one structured table, matrix, checklist, or diagram that makes responses comparable and evaluator-friendly.
- Tone guidance: Institutional, precise, neutral, auditable, and free of vendor-answer language.
- Source references: `rfp-forge/setup/skeleton-definition.md`; `bid-manager/skeletons/1_technical/markdown/technical-full.md`; `rfp-forge/content/README.md`

### 3.3 Mandatory forms and disclosure annexes (350-500 words)
- Section purpose: Index forms and transparency annexes.
- Target word count: 350-500 words
- What to write about: Index forms and transparency annexes. Write in buyer language, frame the requirement or prompt clearly, and define the expected vendor response format or completion behavior.
- Requirement engineering / structure: Use atomic statements, clear labels for mandatory vs scored items, and explicit evidence or response-type columns where relevant.
- Tables / diagrams to include: Include at least one structured table, matrix, checklist, or diagram that makes responses comparable and evaluator-friendly.
- Tone guidance: Institutional, precise, neutral, auditable, and free of vendor-answer language.
- Source references: `rfp-forge/setup/skeleton-definition.md`; `bid-manager/skeletons/1_technical/markdown/technical-full.md`; `rfp-forge/content/README.md`

- Section-level tables / diagrams: Include a section summary table plus any response matrix, checklist, workflow, scoring rubric, or appendix index needed to make the section operational.
- Tone guidance: Keep the section tight, scorable, and administratively usable by procurement, legal, security, and evaluation teams.
- Source references: `rfp-forge/setup/skeleton-definition.md`; `bid-manager/skeletons/1_technical/markdown/technical-full.md`; `rfp-forge/content/README.md`
- Buyer-side constraints: Do not answer the requirement for vendors; do not hide key instructions in narrative prose; do not use vague unscorable adjectives.
- Anti-pattern warnings: Avoid compound requirements, unclear ownership, unlabelled mandatory items, and response formats that make vendor comparison subjective.

## Global Appendix Minimum

- Glossary and definitions
- Response matrix / completion template
- Assumptions and dependencies register
- Exceptions / deviations log
- Pricing workbook or indicative pricing form where relevant
- Mandatory declarations / signatures / public-disclosure notes where relevant

## Global Anti-Patterns

- Writing vendor response content instead of buyer instructions
- Mixing mandatory gates, scoring rules, and contract terms without labels
- Allowing roadmap claims to appear as shipped capability
- Using generic marketing adjectives instead of measurable expectations
- Omitting templates, tables, or appendix instructions needed for comparable responses
