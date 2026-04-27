# TOOLS.md — RFPForge Local Notes

## Purpose

This file describes where RFPForge should look for evidence and context when generating procurement documents, and what output artifacts it produces.

## Knowledge Source Priority

Use sources in this order when designing realistic procurement document content:

### 1. Target Account Dossiers — `../product/dalp/target-accounts/dossiers/`
- **Primary source — always read first**
- Provides institution type, jurisdiction, maturity, strategic signals, procurement posture
- Drives document tone, structure, and sophistication level
- Confidence: highest (institution-specific)

### 2. DALP Capability Mapping — `../product/dalp/capability-mapping/`
- Use to understand which requirement domains are relevant
- Shapes the question set across functional, technical, compliance, and commercial areas
- Helps write realistic requirements buyers would actually ask for
- Confidence: high (domain-specific)

### 3. Competitor Dossiers — `../product/dalp/competitors/`
- Use to understand market landscape and vendor differentiation points
- Informs requirement design that surfaces quality differences between vendors
- Helps set realistic qualification thresholds
- Do NOT name competitors in generated documents
- Confidence: medium (informational, not authoritative)

### 4. DALP Product Documentation — `~/dalp/kit/dapp/content/docs/`
- Architecture, developer guides, user guides, executive overview
- Use to understand what capabilities exist in the market (via this reference platform)
- Helps calibrate requirement ambition and feasibility
- Confidence: high (for market capability reference)

### 5. DALP Narrative — `notion/dalp-narrative.md`
- Use for understanding market positioning and institutional framing
- Useful for understanding buyer concerns and value drivers
- Confidence: medium (positioning, not technical proof)

### 6. Regulatory Research — `../research/`
- Jurisdiction-specific regulatory context
- Critical for realistic compliance requirement sections
- Must be matched to institution and jurisdiction
- Confidence: variable (verify currency of regulatory information)

## Document Generation Tools

### DOCX Output
RFPForge produces professional DOCX documents using the v12 docx base template (shared with bid-manager).

The DOCX output pipeline:
1. Generate structured content in markdown during composition
2. Convert to DOCX with professional formatting
3. Apply consistent styles (headings, tables, requirement blocks)
4. Save to `output/{institution-slug}/`

### Supporting Output
When helpful, generate supporting artifacts alongside the DOCX:
- **Requirement spreadsheet** — CSV or XLSX with all requirements for easy tracking
- **Evaluation matrix template** — standalone scoring workbook for the evaluation panel
- **Pricing workbook template** — structured pricing template for vendor completion
- **Response template** — pre-formatted response document for vendor use

## Reusable Content Libraries

RFPForge can reference content libraries for recurring procurement patterns:

### Procurement Boilerplate
Common procurement language patterns for:
- confidentiality notices
- NDA frameworks
- conflict-of-interest declarations
- code-of-integrity statements
- reservation-of-rights language
- communications protocols
- submission instructions

### Requirement Domain Templates
Standard requirement sets by domain that can be customized per institution:
- asset lifecycle management requirements
- technical architecture requirements
- security and access management requirements
- compliance and regulatory requirements
- integration and interoperability requirements
- implementation and support requirements
- commercial and SLA requirements

### Evaluation Methodology Templates
Reusable evaluation framework components:
- multi-gate evaluation structures
- scoring rubrics with definitions
- weighting templates by procurement context
- two-envelope procedures
- evaluation panel terms of reference

## Related Setup Files

- `setup/knowledge-sources.md` — detailed knowledge source guidance
- `setup/writing-style.md` — writing rules, requirement engineering, evaluation design
- `setup/rfp-structures.md` — document type templates and structures
- `setup/skeleton-definition.md` — skeleton design principles
- `setup/response-format.md` — output formatting standards
