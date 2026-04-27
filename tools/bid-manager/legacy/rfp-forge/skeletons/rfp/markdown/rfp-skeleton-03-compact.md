---
skeleton-family: rfp-forge
perspective: buyer-side issuance blueprint
document-type: rfp
variant: 03-compact
last-updated: 2026-03-14
---

# Request for Proposal Skeleton — Compact

> **Target generated document size:** 20-30 pages / 4,500-8,000 words  
> **Perspective:** Buyer-side procurement issuer  
> **Output style:** Structural drafting instructions, not finished vendor-facing prose

## Global Skeleton Rules

- Buyer-side issuance blueprint only; never answer requirements from the vendor perspective.
- Use published weightings, pass/fail gates, and response templates to force comparable bids.
- Separate scope, requirements, evaluation, pricing, and contract assumptions cleanly.

## Document Metadata Block

- Reference number / procurement ID / version / issue date
- Issuing organization / authority / sponsor / contact point
- Clarification deadline / submission deadline / validity period
- Confidentiality, language, currency, and governing law / policy basis
- Document hierarchy, appendices, and response-template inventory

## Section 1: Context, Scope, and Timeline
**Target length:** 800-1,000 words
**Purpose:** Draft this section so vendors understand exactly what the buyer is asking for and how it will be evaluated.
**Evaluation integration:** Separate pass/fail gates from scored subcriteria and link this section to the published weighting model.

### 1.1 Buyer objective (250-350 words)
- Section purpose: State why the RFP exists.
- Target word count: 250-350 words
- What to write about: State why the RFP exists. Write in buyer language, frame the requirement or prompt clearly, and define the expected vendor response format or completion behavior.
- Requirement engineering / structure: Use atomic statements, clear labels for mandatory vs scored items, and explicit evidence or response-type columns where relevant.
- Tables / diagrams to include: Include at least one structured table, matrix, checklist, or diagram that makes responses comparable and evaluator-friendly.
- Tone guidance: Institutional, precise, neutral, auditable, and free of vendor-answer language.
- Source references: `rfp-forge/setup/skeleton-definition.md`; `bid-manager/skeletons/1_technical/markdown/technical-full.md`; `rfp-forge/content/README.md`

### 1.2 Scope and key scenarios (250-350 words)
- Section purpose: List in-scope domains and core use cases.
- Target word count: 250-350 words
- What to write about: List in-scope domains and core use cases. Write in buyer language, frame the requirement or prompt clearly, and define the expected vendor response format or completion behavior.
- Requirement engineering / structure: Use atomic statements, clear labels for mandatory vs scored items, and explicit evidence or response-type columns where relevant.
- Tables / diagrams to include: Include at least one structured table, matrix, checklist, or diagram that makes responses comparable and evaluator-friendly.
- Tone guidance: Institutional, precise, neutral, auditable, and free of vendor-answer language.
- Source references: `rfp-forge/setup/skeleton-definition.md`; `bid-manager/skeletons/1_technical/markdown/technical-full.md`; `rfp-forge/content/README.md`

### 1.3 Timeline and submission basics (250-350 words)
- Section purpose: Provide key dates and submission checklist.
- Target word count: 250-350 words
- What to write about: Provide key dates and submission checklist. Write in buyer language, frame the requirement or prompt clearly, and define the expected vendor response format or completion behavior.
- Requirement engineering / structure: Use atomic statements, clear labels for mandatory vs scored items, and explicit evidence or response-type columns where relevant.
- Tables / diagrams to include: Include at least one structured table, matrix, checklist, or diagram that makes responses comparable and evaluator-friendly.
- Tone guidance: Institutional, precise, neutral, auditable, and free of vendor-answer language.
- Source references: `rfp-forge/setup/skeleton-definition.md`; `bid-manager/skeletons/1_technical/markdown/technical-full.md`; `rfp-forge/content/README.md`

- Section-level tables / diagrams: Include a section summary table plus any response matrix, checklist, workflow, scoring rubric, or appendix index needed to make the section operational.
- Tone guidance: Keep the section tight, scorable, and administratively usable by procurement, legal, security, and evaluation teams.
- Source references: `rfp-forge/setup/skeleton-definition.md`; `bid-manager/skeletons/1_technical/markdown/technical-full.md`; `rfp-forge/content/README.md`
- Buyer-side constraints: Do not answer the requirement for vendors; do not hide key instructions in narrative prose; do not use vague unscorable adjectives.
- Anti-pattern warnings: Avoid compound requirements, unclear ownership, unlabelled mandatory items, and response formats that make vendor comparison subjective.

## Section 2: Requirements Core
**Target length:** 1,400-1,900 words
**Purpose:** Draft this section so vendors understand exactly what the buyer is asking for and how it will be evaluated.
**Evaluation integration:** Separate pass/fail gates from scored subcriteria and link this section to the published weighting model.

### 2.1 Business requirements (250-350 words)
- Section purpose: Define the minimum functional capabilities the platform must support to meet the buyer's operational model. This section establishes what the platform must do, not how it does it.
- Target word count: 250-350 words
- What to write about: Cover asset lifecycle operations (issuance, servicing, redemption, transfers), user role and workflow requirements, investor/participant onboarding, event processing (distributions, corporate actions, reporting), and any buyer-defined operational SLAs. Separate minimum viable requirements from desirable enhancements.
- Requirement engineering / structure: Frame requirements as the platform shall, not the vendor will. Use a numbered requirements table with columns: Req ID | Requirement | Priority (Must/Should/Could) | Response Type (Comply/Narrative/Demonstrate) | Evidence Requested. All Must requirements are qualification gates. Should/Could requirements are scored 0-5.
- Tables / diagrams to include: Numbered requirements table. Optionally include a use-case summary listing the core asset types and operational scenarios the buyer expects the platform to handle.
- Depth guidance: For a compact RFP, keep to 8-15 business requirements. Prioritize the lifecycle stages and workflow controls that are non-negotiable for go-live. Avoid wishlist scope creep.
- Tone guidance: Institutional, precise, and neutral. State what the buyer needs; do not hint at or describe a preferred vendor's feature set.
- Source references: `rfp-forge/content/procurement/common-question-patterns.md`; `rfp-forge/content/architecture/README.md`; `rfp-forge/setup/skeleton-definition.md`
- Anti-patterns: "The platform should support the full asset lifecycle" (too vague — specify which lifecycle stages and event types); compound requirements that bundle multiple capabilities in one statement; mixing business requirements with UX preferences or vendor experience criteria.

### 2.2 Technical/deployment requirements (250-350 words)
- Section purpose: Specify the technical constraints, deployment expectations, and integration obligations the winning vendor must satisfy. This section is the primary basis for the technical evaluation gate.
- Target word count: 250-350 words
- What to write about: Cover platform architecture expectations (API-first, modularity, event model), supported deployment models (cloud-hosted, self-hosted, hybrid), integration requirements with buyer's existing systems (core banking, custodians, identity providers, payment rails), performance and availability thresholds, infrastructure access and buyer control points, and data residency or tenancy constraints.
- Requirement engineering / structure: Separate deployment model requirements (Must) from integration requirements (Must or Should) and performance targets (Must). Use the same numbered requirements table format as 2.1. Where performance thresholds apply, express them as measurable criteria (e.g., "The platform shall process X transactions per second under Y concurrent users") not adjectives.
- Tables / diagrams to include: Numbered requirements table. Where the buyer has a reference environment or integration landscape, include a brief context note (one paragraph or simple diagram) describing the existing systems vendors must connect to.
- Depth guidance: For compact format, target 8-12 technical requirements. Prioritize the integration points and deployment constraints most likely to disqualify underprepared vendors. Leave exploratory technical questions for the RFI track.
- Tone guidance: Technical precision over breadth. Evaluators should be able to score two vendors against the same requirement without subjectivity.
- Source references: `rfp-forge/content/architecture/README.md`; `rfp-forge/content/deployment/README.md`; `rfp-forge/content/integration/README.md`; `rfp-forge/setup/skeleton-definition.md`
- Anti-patterns: "Must support standard APIs" (which standards, which versions?); "Must be scalable" (to what load, over what period?); mixing deployment expectations with vendor staffing or support requirements in the same table row.

### 2.3 Security/compliance essentials (250-350 words)
- Section purpose: State the non-negotiable security controls and regulatory compliance obligations the platform must demonstrate. Requirements in this section typically serve as hard disqualifiers — vendors who cannot meet them are eliminated before scoring.
- Target word count: 250-350 words
- What to write about: Cover access control and identity requirements (RBAC/ABAC, MFA, privileged access management), cryptographic key management and custody obligations, audit logging standards (what events must be logged, retention period, tamper resistance), certifications and assurance reports the buyer will require (SOC 2 Type II, ISO 27001, penetration testing cadence), applicable regulatory framework compliance (MiCA, FCA, MAS, or other jurisdiction-specific rules), and data handling and privacy obligations (GDPR, local data residency).
- Requirement engineering / structure: Lead with pass/fail Must requirements — certifications, regulatory compliance obligations, and minimum access control standards. Follow with Should requirements for security enhancement areas. For each certification or compliance obligation, specify the evidence type (current certificate, third-party report, self-attestation with supporting documentation) and recency threshold (e.g., "SOC 2 Type II report dated within 18 months of submission deadline").
- Tables / diagrams to include: Numbered requirements table distinguishing Must (pass/fail) from Should (scored). Optionally include a compliance matrix asking vendors to confirm status per regulatory framework relevant to the buyer's jurisdiction.
- Depth guidance: For compact format, target 6-10 requirements. Focus on the controls that a risk or compliance committee would treat as blockers. Avoid duplicating general technical requirements from 2.2.
- Tone guidance: Unambiguous and audit-ready. Evaluators and legal teams will reference this section when challenging award decisions.
- Source references: `rfp-forge/content/security/security-requirements-patterns.md`; `rfp-forge/content/compliance/jurisdiction-compliance-requirements.md`; `rfp-forge/content/compliance/regulatory-change-governance-requirements.md`; `rfp-forge/setup/skeleton-definition.md`
- Anti-patterns: "Must be secure" (unscorable); bundling regulatory compliance obligations with operational security controls in a single requirement; omitting evidence type and recency specifications for certification requirements; listing the same requirement twice under different labels (e.g., audit logging appearing under both technical and security sections).

- Section-level tables / diagrams: Include a section summary table plus any response matrix, checklist, workflow, scoring rubric, or appendix index needed to make the section operational.
- Tone guidance: Keep the section tight, scorable, and administratively usable by procurement, legal, security, and evaluation teams.
- Source references: `rfp-forge/setup/skeleton-definition.md`; `bid-manager/skeletons/1_technical/markdown/technical-full.md`; `rfp-forge/content/README.md`
- Buyer-side constraints: Do not answer the requirement for vendors; do not hide key instructions in narrative prose; do not use vague unscorable adjectives.
- Anti-pattern warnings: Avoid compound requirements, unclear ownership, unlabelled mandatory items, and response formats that make vendor comparison subjective.

## Section 3: Qualification, Pricing, and Evaluation
**Target length:** 800-1,100 words
**Purpose:** Draft this section so vendors understand exactly what the buyer is asking for and how it will be evaluated.
**Evaluation integration:** Separate pass/fail gates from scored subcriteria and link this section to the published weighting model.

### 3.1 Qualification gates (250-350 words)
- Section purpose: Define mandatory bidder thresholds.
- Target word count: 250-350 words
- What to write about: Define mandatory bidder thresholds. Write in buyer language, frame the requirement or prompt clearly, and define the expected vendor response format or completion behavior.
- Requirement engineering / structure: Use atomic statements, clear labels for mandatory vs scored items, and explicit evidence or response-type columns where relevant.
- Tables / diagrams to include: Include at least one structured table, matrix, checklist, or diagram that makes responses comparable and evaluator-friendly.
- Tone guidance: Institutional, precise, neutral, auditable, and free of vendor-answer language.
- Source references: `rfp-forge/setup/skeleton-definition.md`; `bid-manager/skeletons/1_technical/markdown/technical-full.md`; `rfp-forge/content/README.md`

### 3.2 Pricing/legal baseline (250-350 words)
- Section purpose: Provide pricing template and deviation rules.
- Target word count: 250-350 words
- What to write about: Provide pricing template and deviation rules. Write in buyer language, frame the requirement or prompt clearly, and define the expected vendor response format or completion behavior.
- Requirement engineering / structure: Use atomic statements, clear labels for mandatory vs scored items, and explicit evidence or response-type columns where relevant.
- Tables / diagrams to include: Include at least one structured table, matrix, checklist, or diagram that makes responses comparable and evaluator-friendly.
- Tone guidance: Institutional, precise, neutral, auditable, and free of vendor-answer language.
- Source references: `rfp-forge/setup/skeleton-definition.md`; `bid-manager/skeletons/1_technical/markdown/technical-full.md`; `rfp-forge/content/README.md`

### 3.3 Evaluation and annexes (250-350 words)
- Section purpose: Publish weights and appendix list.
- Target word count: 250-350 words
- What to write about: Publish weights and appendix list. Write in buyer language, frame the requirement or prompt clearly, and define the expected vendor response format or completion behavior.
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
