# RFI Skeleton v2 — Regulatory and Compliance Capability Assessment

**Document ID:** RB-RFI-02-v1.0
**Codename:** COMPLY
**Category:** RFI
**Buyer type:** Regulated financial institution, regulator-adjacent body, or compliance-heavy issuer
**Primary intent:** Information gathering focused on regulatory controls, auditability, and policy enforcement maturity
**Default response model:** Structured vendor response with explicit evidence requests
**Tailoring variables:** jurisdiction, regulatory regimes, investor types, reporting obligations, policy sensitivity

## Skeleton Use Notes
- Perspective: Buyer issuing a procurement document to vendors
- Use this skeleton to generate the structure and instructions of the procurement document, not the vendor's answers
- Keep mandatory, important, and desirable items distinct
- Ask for evidence that supports scoring, not marketing claims
- Where regional regulation matters, tailor terminology, appendices, and legal schedules accordingly

## Section 1: Request Context and Market Exploration Objective
**Target length:** 1.5-2.5 pages (700-1,100 words)
**Purpose:** Explain why the buyer is gathering information and what vendor capabilities it is trying to understand.

### 1.1 Issuing Organization Context
- Write about: Organization type, current maturity level, target business problems, and why the buyer is exploring the market now
- Format: Short narrative plus buyer profile table
- Include: Table (Attribute | Description)
- Depth: Enough for vendors to tailor their response without converting the RFI into an RFP
- Reference: `rfp-forge/content/README.md`

### 1.2 Objectives of the Information Request
- Write about: Discovery goals, decision support goals, future procurement intent if any, and the specific capability areas under review
- Format: Bullet list + short explanatory narrative
- Include: Objectives table (Question the buyer wants answered | Why it matters)
- Depth: Keep the document exploratory and non-committal
- Reference: `rfp-forge/content/README.md`

## Section 2: Vendor Response Instructions and Timeline
**Target length:** 1.5-2 pages (600-900 words)
**Purpose:** Standardize vendor responses enough to make them comparable.

### 2.1 Timeline and Submission Rules
- Write about: issue date, questions deadline, response deadline, file formats, contact protocol, and whether follow-up workshops may be held
- Format: Timeline + checklist
- Include: Submission checklist (Item | Mandatory? | Format)
- Depth: Clear but lighter than a formal RFP
- Reference: `bid-manager/templates/rfi-questionnaire.csv`

### 2.2 Response Format Expectations
- Write about: how vendors should structure answers, indicate current capability vs roadmap vs partner dependency, and provide supporting artifacts
- Format: Response guidance note
- Include: Response legend (Current capability | Configuration-based | Partner-enabled | Roadmap | Not supported)
- Depth: Prevent fuzzy, non-comparable answers
- Reference: `rfp-forge/setup/response-format.md`

## Section 3: Capability Information Requested
**Target length:** 5-8 pages (2,500-4,000 words)
**Purpose:** Gather structured information on relevant platform capabilities without prescribing a solution.

### 3.1 Core Capability Areas (14-18 topic blocks)
- Write about: regulatory control models, eligibility controls, identity and claims handling, transfer restrictions, audit evidence, reporting support, and governance controls
- Format: Capability questionnaire table (Topic | Buyer question | Response Type | Evidence Requested)
- Include: Capability summary matrix for fast comparison
- Depth: Ask how vendors solve the problem, not just whether they do
- Reference: `rfp-forge/content/architecture/README.md`, `rfp-forge/content/compliance/README.md`, `rfp-forge/content/security/README.md`, `rfp-forge/content/integration/README.md`, `rfp-forge/content/deployment/README.md`

### 3.2 Operating Model, Delivery, and Support Information
- Write about: deployment options, support approach, implementation model, governance, reference architectures, and typical time-to-value
- Format: Structured question set
- Include: Table (Topic | Buyer question | Response Type)
- Depth: Enough to support internal market mapping and shortlist design
- Reference: `rfp-forge/content/deployment/README.md`

## Section 4: Commercial, Legal, and Risk Information
**Target length:** 2-3 pages (900-1,400 words)
**Purpose:** Gather indicative commercial and risk information without forcing a final bid.

### 4.1 Indicative Commercial Model
- Write about: licensing approach, pricing basis, implementation cost drivers, support tiers, and optional modules
- Format: Indicative pricing template
- Include: Table (Commercial dimension | Vendor explanation)
- Depth: Keep this directional, not a binding offer request
- Reference: `bid-manager/templates/rfi-questionnaire.csv`

### 4.2 Legal, Compliance, and Vendor Risk Disclosures
- Write about: regulatory posture, certifications, data handling approach, subcontractor model, and open qualification items
- Format: Structured disclosure table
- Include: Risk disclosure matrix
- Depth: Focus on early fit assessment
- Reference: `rfp-forge/content/compliance/README.md`, `rfp-forge/content/security/README.md`

## Section 5: Evaluation and Next-Step Logic
**Target length:** 1-1.5 pages (450-700 words)
**Purpose:** Explain how the buyer will use the information and what may happen next.

### 5.1 Review Criteria
- Write about: capability fit, maturity, regulatory alignment, operational suitability, and commercial plausibility
- Format: Weighted or semi-weighted comparison matrix
- Include: Table (Criterion | Weight | Review intent)
- Depth: Clear enough to orient vendors without overformalizing the RFI
- Reference: `rfp-forge/setup/skeleton-scoring-rubric.md`

### 5.2 Possible Follow-On Steps
- Write about: shortlist interviews, workshops, proof of concept, or future RFP issuance
- Format: Narrative + process bullets
- Include: Non-commitment statement clarifying that the RFI is exploratory
- Depth: Avoid implying contract award obligations
- Reference: `rfp-forge/content/README.md`

## Section 6: Appendices and Vendor Templates
**Target length:** 1-2 pages plus appendices
**Purpose:** Provide structured completion aids.

### 6.1 Appendix Pack
- Write about: glossary, response matrix, assumptions register, reference client form, and optional architecture attachment instructions
- Format: Appendix index
- Include: Appendix table (Appendix | Purpose | Mandatory?)
- Depth: Keep appendices lightweight but useful
- Reference: `bid-manager/templates/rfi-questionnaire.csv`


## Use-Case Specific Tailoring Notes
- Emphasize regulatory coverage matrixes and evidence categories over raw technical detail
- Ask vendors to distinguish platform-enforced controls from procedural, manual, or partner-dependent controls
- Include a jurisdiction mapping appendix when multiple regimes are in scope
