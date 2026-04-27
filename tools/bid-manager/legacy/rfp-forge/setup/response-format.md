# Response Format — Document Creation Output

This file defines the output format for generated procurement documents.

RFPForge produces buyer-side procurement documents, with the primary deliverable prepared as a professional DOCX.

## Primary Output

- **Format:** DOCX (using v12 docx base template, same as bid-manager)
- **Purpose:** institution-grade RFP, RFI, or tender document suitable for internal review or external issuance
- **Tone:** formal procurement formatting, not plain notes or chat output

## Formatting Requirements

### 1. Professional document structure

The output should be formatted like a real institutional procurement document, including:
- cover page with institution branding placeholder
- clearly separated sections with consistent hierarchy
- headers and subheaders using standard heading styles
- consistent spacing, fonts, and typography
- page numbering
- document reference number and version
- footer with confidentiality notice

### 2. Cover page elements

Every document cover page should include:
- institution name (or placeholder)
- institution logo area (placeholder)
- document title (e.g., "Request for Proposal: Digital Asset Lifecycle Platform")
- document reference number
- version number
- issue date
- submission deadline
- confidentiality classification (e.g., "CONFIDENTIAL — For Invited Respondents Only")

If branding details are unknown from the dossier, use a neutral, professional layout.

### 3. Table of contents

Include a table of contents for all documents over 15 pages. Use Word's built-in TOC field so it can be updated by the recipient.

### 4. Section numbering

Use clear, consistent hierarchical numbering:
- 1. Section Title
- 1.1 Subsection
- 1.1.1 Sub-subsection

Do not go deeper than three levels unless absolutely necessary.

### 5. Requirement numbering

Number requirements consistently by domain using standardized prefixes:

| Prefix | Domain |
|---|---|
| FR- | Functional Requirement |
| TR- | Technical Requirement |
| CR- | Compliance Requirement |
| SR- | Security Requirement |
| IR- | Implementation Requirement |
| CM- | Commercial Requirement |
| OR- | Operational Requirement |

Use sequential numbering within each prefix: FR-001, FR-002, FR-003.

### 6. Requirement presentation format

Present requirements in tables for clarity and scoreability:

| Req ID | Requirement | Priority | Response Type |
|---|---|---|---|
| FR-001 | The platform shall support the issuance of multiple digital asset types including equity tokens, debt instruments, and fund units. | Must | Comply with narrative |
| FR-002 | The platform should support configurable lifecycle event workflows including corporate actions, distributions, and redemptions. | Should | Narrative with examples |
| FR-003 | The platform may support automated regulatory reporting generation for [jurisdiction-specific authority]. | Could | Comply/Non-comply |

### 7. Evaluation methodology presentation

Present evaluation criteria in structured tables:

**Gate structure:**
```
Gate 1: Administrative Compliance — Pass/Fail
Gate 2: Financial Standing — Pass/Fail  
Gate 3: Capability Assessment — Pass/Fail
Gate 4: Technical and Commercial Evaluation — Scored (weighted)
```

**Scoring matrix:**

| Category | Weight | Maximum Score |
|---|---|---|
| Functional fit | 35% | 175 |
| Technical architecture | 25% | 125 |
| Security and compliance | 20% | 100 |
| Implementation approach | 10% | 50 |
| Commercial model | 10% | 50 |
| **Total** | **100%** | **500** |

### 8. Appendix structure

Appendices should be clearly labeled and referenced from the main document:
- Appendix A: Glossary of Terms
- Appendix B: Response Template
- Appendix C: Pricing Workbook
- Appendix D: Reference Questionnaire
- Appendix E: NDA Template
- Appendix F: Conflict of Interest Declaration
- Appendix G: Code of Integrity Declaration (if applicable)
- Appendix H: Draft Contract Terms (if applicable)

### 9. Response templates

Include structured response templates in appendices that vendors must complete. This ensures:
- comparable responses across all bidders
- no critical requirement is missed
- evaluators can score efficiently

Response template format example:

| Req ID | Requirement Summary | Comply (Y/N) | Response Narrative | Evidence Attached (Y/N) | Evidence Reference |
|---|---|---|---|---|---|
| FR-001 | Multiple digital asset type support | | | | |
| FR-002 | Configurable lifecycle workflows | | | | |

## Document Metadata

Every generated document should include metadata in the document properties:
- Title
- Subject
- Author (institution name, not personal name)
- Category (RFP / RFI / ITT / PQQ / Framework)
- Version
- Status (Draft / For Review / Issued)

## Output Location

Primary deliverable path:
- `output/{institution-slug}/<document-name>.docx`

Optional working artifacts (markdown drafts, requirement spreadsheets, notes) may live alongside the DOCX, but the DOCX is the canonical deliverable.

## File Naming Convention

Use descriptive, consistent naming:
- `{institution-slug}-rfp-digital-asset-platform-v1.0.docx`
- `{institution-slug}-rfi-digital-asset-capabilities-v1.0.docx`
- `{institution-slug}-itt-blockchain-infrastructure-v1.0.docx`
- `{institution-slug}-pqq-digital-asset-vendors-v1.0.docx`
