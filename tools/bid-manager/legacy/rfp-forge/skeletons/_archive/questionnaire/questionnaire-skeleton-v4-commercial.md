# Questionnaire Skeleton v4 — Commercial Terms and Vendor Viability

**Document ID:** RB-QS-04-v1.0
**Codename:** DEAL
**Category:** Vendor Assessment Questionnaire
**Buyer type:** Procurement, finance, legal, and vendor management teams
**Primary intent:** Structured questionnaire for pricing, terms, support, viability, and contracting risk
**Default response model:** Structured vendor response with explicit evidence requests
**Tailoring variables:** procurement policy, pricing model, legal complexity, vendor tiering, support expectations

## Skeleton Use Notes
- Perspective: Buyer issuing a procurement document to vendors
- Use this skeleton to generate the structure and instructions of the procurement document, not the vendor's answers
- Keep mandatory, important, and desirable items distinct
- Ask for evidence that supports scoring, not marketing claims
- Where regional regulation matters, tailor terminology, appendices, and legal schedules accordingly

## Section 1: Questionnaire Purpose and Completion Rules
**Target length:** 1-2 pages (500-900 words)
**Purpose:** Explain what the questionnaire is for, how vendors must complete it, and how responses will be scored.

### 1.1 Buyer Objective and Assessment Use
- Write about: Why the questionnaire is being issued, what decision it will inform, and whether it is standalone or part of a broader procurement
- Format: Brief narrative
- Include: Assessment context table (Purpose | Audience | Outcome)
- Depth: Clear and procedural
- Reference: `rfp-forge/content/README.md`

### 1.2 Completion Instructions
- Write about: response legends, evidence expectations, attachment naming, assumptions handling, and escalation of exceptions
- Format: Instruction checklist
- Include: Response legend (Yes | Partial | No | Describe | Attach | Review Required)
- Depth: Remove ambiguity from how vendors populate the questionnaire
- Reference: `rfp-forge/setup/response-format.md`, `bid-manager/templates/rfi-questionnaire.csv`

## Section 2: Questionnaire Structure and Scoring Logic
**Target length:** 1-1.5 pages (450-700 words)
**Purpose:** Define the questionnaire sections, scoring, and gating logic.

### 2.1 Section Map
- Write about: Major domains covered and expected question counts by section
- Format: Section inventory table
- Include: Table (Section | Theme | Approx. Questions | Weight)
- Depth: Make the questionnaire navigable
- Reference: `bid-manager/templates/rfi-questionnaire.csv`

### 2.2 Scoring and Pass/Fail Treatment
- Write about: weighted scoring, mandatory failure conditions, treatment of partial responses, and evidence sufficiency rules
- Format: Scoring rules box
- Include: Evidence sufficiency matrix
- Depth: Strong enough for repeatable assessment
- Reference: `rfp-forge/setup/skeleton-scoring-rubric.md`

## Section 3: Structured Question Blocks
**Target length:** 10-18 pages (questionnaire-driven)
**Purpose:** Provide a dense, structured vendor assessment instrument.

### 3.1 Core Question Domains (60-90 questions)
- Write about: licensing, pricing structure, implementation charges, SLA commitments, support model, subcontractors, contract terms, financial viability, references, and governance commitments
- Format: Question grid (Q ID | Topic | Question | Priority | Response Type | Evidence Requested)
- Include: At least one grouped table per domain plus summary counts
- Depth: Questions must be concrete, scorable, and non-overlapping
- Reference: `bid-manager/templates/rfi-questionnaire.csv`

### 3.2 Exceptions, Dependencies, and Qualifications
- Write about: assumptions, partner dependencies, roadmap gaps, manual workarounds, and customer prerequisites
- Format: Exception register
- Include: Table (Q ID | Qualification | Impact | Mitigation)
- Depth: Force disclosure of caveats that would change evaluation outcome
- Reference: `bid-manager/templates/rfi-questionnaire.csv`

## Section 4: Evidence, Attachments, and Appendices
**Target length:** 2-3 pages plus appendices
**Purpose:** Standardize the supporting documentation vendors must attach.

### 4.1 Evidence Pack Requirements
- Write about: policies, certifications, diagrams, sample reports, redlines, test summaries, customer references, and other supporting artifacts
- Format: Attachment checklist
- Include: Table (Artifact | Mandatory? | Acceptable format | Related question blocks)
- Depth: Ask only for evidence that procurement teams can realistically review
- Reference: `rfp-forge/content/security/README.md`, `rfp-forge/content/compliance/README.md`, `rfp-forge/content/deployment/README.md`

### 4.2 Declarations and Appendix Templates
- Write about: officer declaration, accuracy statement, assumptions register, pricing addendum if applicable, and glossary
- Format: Appendix pack instructions
- Include: Appendix list and signature/declaration form
- Depth: Keep administrative structure crisp
- Reference: `bid-manager/templates/rfi-questionnaire.csv`

## Use-Case Specific Tailoring Notes
- Use this skeleton alongside a technical or security questionnaire when the buyer needs a separated commercial workstream
- Include question blocks for pricing assumptions, renewal logic, change control, audit rights, exit terms, and business continuity assurance
- Require vendors to qualify non-standard terms and dependency-based pricing explicitly

