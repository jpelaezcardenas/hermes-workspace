# RFP Skeleton v3 — Digital Custody and Settlement Infrastructure

**Document ID:** RB-RFP-03-v1.0
**Codename:** VAULT
**Category:** Full RFP
**Buyer type:** Custodian bank, trust bank, or asset servicer
**Primary intent:** Formal procurement for custody, settlement, and operational control infrastructure for digital assets
**Default response model:** Structured vendor response with explicit evidence requests
**Tailoring variables:** custody model, asset coverage, sub-custodian model, settlement rails, regulatory perimeter

## Skeleton Use Notes
- Perspective: Buyer issuing a procurement document to vendors
- Use this skeleton to generate the structure and instructions of the procurement document, not the vendor's answers
- Keep mandatory, important, and desirable items distinct
- Ask for evidence that supports scoring, not marketing claims
- Where regional regulation matters, tailor terminology, appendices, and legal schedules accordingly

## Section 1: Issuing Organization and Procurement Context
**Target length:** 2-3 pages (900-1,400 words)
**Purpose:** Explain who the issuing organization is, why it is conducting the procurement, and what institutional problem the procurement is intended to solve.

### 1.1 Issuing Organization Overview
- Write about: Institutional role, market position, mandate, current-state operating environment, and why digital asset or tokenized market capability is being considered
- Format: Narrative with short buyer profile table
- Include: Table (Attribute | Description) covering organization type, geography, regulatory perimeter, target participants, and current operating constraints
- Depth: Enough for vendors to understand context, not a corporate history essay
- Reference: `rfp-forge/content/README.md`

### 1.2 Procurement Objectives and Drivers
- Write about: Business outcomes, operating model change sought, control objectives, efficiency goals, and strategic rationale
- Format: Bullet list of 6-10 objectives plus short narrative
- Include: Objectives table (Objective | Why it matters | Success indicator)
- Depth: Make objectives concrete enough to shape vendor response priorities
- Reference: `rfp-forge/content/README.md`

### 1.3 Background and Current-State Constraints
- Write about: Legacy systems, regulatory constraints, market structure, stakeholder complexity, pain points, and any prior pilots or programs
- Format: Narrative + current-state constraints list
- Include: Assumptions and constraints box
- Depth: Frame procurement boundaries clearly
- Reference: `rfp-forge/content/README.md`


## Section 2: Scope of Work and Procurement Boundaries
**Target length:** 3-4 pages (1,400-2,000 words)
**Purpose:** Define what is in scope, out of scope, and expected from vendors.

### 2.1 Scope Statement
- Write about: The requested platform, services, environments, interfaces, governance touchpoints, and implementation outcomes
- Format: Structured scope narrative
- Include: Scope table (Domain | In Scope | Out of Scope | Notes)
- Depth: Eliminate ambiguity around what the buyer is procuring
- Reference: `rfp-forge/content/README.md`

### 2.2 Required Use Cases and Operating Scenarios
- Write about: The key issuance, servicing, settlement, compliance, and reporting scenarios the solution must support
- Format: Numbered scenario list with acceptance intent
- Include: Use-case matrix (Scenario | Actors | Frequency | Criticality | Required Outcome)
- Depth: Each scenario should be testable and mappable to requirements
- Reference: `rfp-forge/content/architecture/README.md`, `rfp-forge/content/compliance/README.md`, `rfp-forge/content/integration/README.md`

### 2.3 Buyer Assumptions, Dependencies, and Exclusions
- Write about: Assumed buyer responsibilities, external dependencies, transition constraints, and items excluded from vendor scope
- Format: Bullet list + dependency table
- Include: Table (Dependency | Owner | Impact if unmet)
- Depth: Specific enough to avoid future commercial or delivery disputes
- Reference: `rfp-forge/content/deployment/README.md`


## Section 3: Procurement Process, Timeline, and Submission Rules
**Target length:** 2-3 pages (900-1,300 words)
**Purpose:** Tell vendors how the process works and how responses must be submitted.

### 3.1 Procurement Timeline and Milestones
- Write about: Issue date, clarification period, bidder conference, submission deadline, evaluation window, shortlist stage, demos, BAFO if used, and award target
- Format: Timeline table
- Include: Table (Milestone | Date | Buyer action | Vendor action)
- Depth: Make the process operational
- Reference: `rfp-forge/content/README.md`

### 3.2 Clarification, Communication, and Governance Process
- Write about: Question submission rules, single point of contact, bidder conference rules, confidentiality expectations, and fairness controls
- Format: Policy bullets
- Include: Clarification process box
- Depth: Prevent informal side-channel engagement
- Reference: `rfp-forge/content/README.md`

### 3.3 Submission Format Requirements
- Write about: Required document structure, page limits, workbook/templates, evidence attachments, pricing schedules, redline rules, and response type conventions
- Format: Mandatory checklist
- Include: Submission checklist (Item | Mandatory? | Format | Notes)
- Depth: Strong enough to force comparable responses
- Reference: `bid-manager/templates/rfi-questionnaire.csv`


## Section 4: Technical Requirements
**Target length:** 8-12 pages (4,000-6,000 words)
**Purpose:** Define technical capabilities the vendor platform must demonstrate.

### 4.1 Platform Architecture Requirements (15-20 requirements)
- Write about: Core architecture expectations for custody account administration, settlement orchestration, role segregation, approvals, external custodian connectivity, and high-assurance operational traceability
- Format: Numbered requirements table (Req ID | Requirement | Priority [Mandatory/Important/Desirable] | Response Type [Yes/No/Describe/Attach])
- Include: Target-state architecture diagram showing buyer systems, external parties, and platform boundaries
- Depth: Each requirement should be specific enough to evaluate platform maturity rather than collect generic claims
- Reference: `rfp-forge/content/architecture/README.md`

### 4.2 Integration and Interoperability Requirements (12-18 requirements)
- Write about: APIs, events, core system integration, reporting feeds, identity sources, and settlement/payment connectivity
- Format: Numbered requirements table
- Include: Integration inventory table (Interface | Direction | Protocol | Frequency | Owner)
- Depth: Specify integration expectations without prescribing one vendor implementation path unless necessary
- Reference: `rfp-forge/content/integration/README.md`

### 4.3 Deployment, Environment, and Operability Requirements (10-15 requirements)
- Write about: Hosting models, environment separation, resilience, observability, backup/recovery, and operational control points
- Format: Numbered requirements table
- Include: Environment model table and operational readiness evidence list
- Depth: Define what must be controllable, supportable, and auditable in production
- Reference: `rfp-forge/content/deployment/README.md`


## Section 5: Security, Risk, and Control Requirements
**Target length:** 5-7 pages (2,500-3,500 words)
**Purpose:** Define the control environment the vendor must evidence.

### 5.1 Security Architecture and Access Control Requirements (12-18 requirements)
- Write about: IAM, role segregation, privileged access control, logging, secrets handling, environment isolation, and secure integration patterns
- Format: Numbered requirements table
- Include: Control matrix (Control Area | Buyer Expectation | Evidence Requested)
- Depth: Ask for control evidence categories without demanding disclosure of security-sensitive internals
- Reference: `rfp-forge/content/security/README.md`

### 5.2 Operational Risk, Resilience, and Incident Readiness (8-12 requirements)
- Write about: Monitoring, alerting, DR, BCP, vulnerability management, incident response, testing cadence, and support escalation
- Format: Numbered requirements table
- Include: Resilience expectations table and evidentiary artifact list
- Depth: Focus on buyer assurance and operational recoverability
- Reference: `rfp-forge/content/security/README.md`, `rfp-forge/content/deployment/README.md`


## Section 6: Compliance, Legal, and Regulatory Requirements
**Target length:** 5-7 pages (2,500-3,500 words)
**Purpose:** Define the regulatory, control, and legal framework vendors must support.

### 6.1 Regulatory and Compliance Capability Requirements (12-18 requirements)
- Write about: Eligibility controls, transfer restrictions, investor onboarding dependencies, auditability, regulatory reporting support, and jurisdiction-sensitive controls
- Format: Numbered requirements table
- Include: Regulatory coverage matrix (Regime/Policy | Required Capability | Response Type | Evidence Requested)
- Depth: Separate platform control requirements from legal advice obligations
- Reference: `rfp-forge/content/compliance/README.md`

### 6.2 Contractual, Data, and Governance Requirements (8-12 requirements)
- Write about: confidentiality, data handling, data residency, IP boundaries, subcontractor rules, audit rights, change control, and governance expectations
- Format: Numbered requirements table plus contractual schedule summary
- Include: Legal schedules checklist
- Depth: Make contractual assumptions explicit so vendors can price and qualify accurately
- Reference: `rfp-forge/content/compliance/README.md`, `rfp-forge/content/security/README.md`


## Section 7: Commercial Response Framework
**Target length:** 3-4 pages (1,300-1,900 words)
**Purpose:** Define how vendors must present pricing, commercials, support, and delivery assumptions.

### 7.1 Pricing and Commercial Model Requirements
- Write about: licensing, implementation fees, environments, transaction or volume assumptions, optional components, support tiers, and professional services boundaries if applicable
- Format: Pricing schedule instructions
- Include: Commercial workbook structure (Line Item | Basis | Quantity Assumption | One-Time/Recurring | Currency)
- Depth: Force transparent, comparable commercial submissions
- Reference: `bid-manager/templates/rfi-questionnaire.csv`

### 7.2 Support, SLA, and Vendor Commitments
- Write about: support model, service windows, severity definitions, response/resolution expectations, release management, and vendor governance commitments
- Format: Structured requirements + required SLA schedule
- Include: SLA response matrix
- Depth: Make operational commitments measurable
- Reference: `rfp-forge/content/deployment/README.md`, `rfp-forge/content/security/README.md`


## Section 8: Evaluation Methodology and Award Logic
**Target length:** 2-3 pages (900-1,300 words)
**Purpose:** Tell vendors how responses will be scored and what gates apply.

### 8.1 Pass/Fail Gates
- Write about: Eligibility rules, minimum submission completeness, regulatory acceptability, mandatory requirements threshold, and conflict/disclosure rules
- Format: Gate table
- Include: Table (Gate | Description | Evidence/Condition)
- Depth: Use objective gates where possible
- Reference: `rfp-forge/content/README.md`

### 8.2 Weighted Evaluation Criteria
- Write about: Scoring categories, weights, demo/reference checks, commercial evaluation, risk review, and final negotiation logic
- Format: Weighted matrix
- Include: Table (Criterion | Weight | What evaluators look for)
- Depth: Make the scoring model auditable and defensible
- Reference: `rfp-forge/setup/skeleton-scoring-rubric.md`


## Section 9: Appendices, Forms, and Response Templates
**Target length:** 2-4 pages of instructions plus appendices
**Purpose:** Provide reusable response forms and buyer-controlled annexes.

### 9.1 Required Appendices
- Write about: Glossary, acronyms, response declaration, pricing schedule, compliance matrix, architecture assumptions, reference request form, and deviations log
- Format: Appendix index
- Include: Appendix table (Appendix | Purpose | Mandatory? | Completion Party)
- Depth: Appendices should reduce ambiguity and accelerate evaluation
- Reference: `bid-manager/templates/rfi-questionnaire.csv`

### 9.2 Vendor Completion Templates
- Write about: Requirement response grid, assumptions/dependencies register, issue log, implementation plan template, and exceptions register
- Format: Template pack instructions
- Include: Response-type legend and completion rules
- Depth: Ensure structured comparability across responses
- Reference: `bid-manager/templates/rfi-questionnaire.csv`


## Use-Case Specific Tailoring Notes
- Increase emphasis on access control, signing governance, segregation of duties, reconciliation, settlement exceptions, and external custodian connectivity
- Require a dedicated appendix for custody workflow diagrams, approval patterns, and recovery scenarios
- Ask vendors to specify which controls are native to the platform and which depend on third-party custody providers
