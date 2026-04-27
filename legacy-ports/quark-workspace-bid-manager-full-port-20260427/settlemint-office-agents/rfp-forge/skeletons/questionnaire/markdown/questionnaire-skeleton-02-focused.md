---
skeleton-family: rfp-forge
perspective: buyer-side issuance blueprint
document-type: questionnaire
variant: 02-focused
last-updated: 2026-03-14
---

# Procurement Questionnaire Skeleton — Focused

> **Target generated document size:** 40-60 pages / 9,000-14,000 words  
> **Perspective:** Buyer-side procurement issuer  
> **Output style:** Structural drafting instructions, not finished vendor-facing prose

## Global Skeleton Rules

- Use dense, scorable question grids rather than long narrative sections.
- Each row should contain Q ID, topic, question, priority, response type, and evidence requested.
- Require a qualifications register linking caveats back to question IDs.

## Document Metadata Block

- Reference number / procurement ID / version / issue date
- Issuing organization / authority / sponsor / contact point
- Clarification deadline / submission deadline / validity period
- Confidentiality, language, currency, and governing law / policy basis
- Document hierarchy, appendices, and response-template inventory

## Section 1: Questionnaire Setup and Scoring Rules
**Target length:** 1,000-1,300 words
**Purpose:** Draft this section so vendors understand exactly what the buyer is asking for and how it will be evaluated.
**Evaluation integration:** Ensure every question row can be scored or gated with consistent evidence sufficiency rules.

### 1.1 Purpose and audience (350-500 words)
- Section purpose: Explain the decision use.
- Target word count: 350-500 words
- What to write about: Explain the decision use. Write in buyer language, frame the requirement or prompt clearly, and define the expected vendor response format or completion behavior.
- Requirement engineering / structure: Use atomic statements, clear labels for mandatory vs scored items, and explicit evidence or response-type columns where relevant.
- Tables / diagrams to include: Include at least one structured table, matrix, checklist, or diagram that makes responses comparable and evaluator-friendly.
- Tone guidance: Institutional, precise, neutral, auditable, and free of vendor-answer language.
- Source references: `rfp-forge/setup/skeleton-definition.md`; `bid-manager/skeletons/1_technical/markdown/technical-full.md`; `rfp-forge/content/README.md`

### 1.2 Completion rules and response legend (350-500 words)
- Section purpose: Define response types and evidence expectations.
- Target word count: 350-500 words
- What to write about: Define response types and evidence expectations. Write in buyer language, frame the requirement or prompt clearly, and define the expected vendor response format or completion behavior.
- Requirement engineering / structure: Use atomic statements, clear labels for mandatory vs scored items, and explicit evidence or response-type columns where relevant.
- Tables / diagrams to include: Include at least one structured table, matrix, checklist, or diagram that makes responses comparable and evaluator-friendly.
- Tone guidance: Institutional, precise, neutral, auditable, and free of vendor-answer language.
- Source references: `rfp-forge/setup/skeleton-definition.md`; `bid-manager/skeletons/1_technical/markdown/technical-full.md`; `rfp-forge/content/README.md`

### 1.3 Scoring and evidence sufficiency (350-500 words)
- Section purpose: Define weights, mandatory failures, and adequacy rules.
- Target word count: 350-500 words
- What to write about: Define weights, mandatory failures, and adequacy rules. Write in buyer language, frame the requirement or prompt clearly, and define the expected vendor response format or completion behavior.
- Requirement engineering / structure: Use atomic statements, clear labels for mandatory vs scored items, and explicit evidence or response-type columns where relevant.
- Tables / diagrams to include: Include at least one structured table, matrix, checklist, or diagram that makes responses comparable and evaluator-friendly.
- Tone guidance: Institutional, precise, neutral, auditable, and free of vendor-answer language.
- Source references: `rfp-forge/setup/skeleton-definition.md`; `bid-manager/skeletons/1_technical/markdown/technical-full.md`; `rfp-forge/content/README.md`

- Section-level tables / diagrams: Include a section summary table plus any response matrix, checklist, workflow, scoring rubric, or appendix index needed to make the section operational.
- Tone guidance: Keep the section tight, scorable, and administratively usable by procurement, legal, security, and evaluation teams.
- Source references: `rfp-forge/setup/skeleton-definition.md`; `bid-manager/skeletons/1_technical/markdown/technical-full.md`; `rfp-forge/content/README.md`
- Buyer-side constraints: Do not answer the requirement for vendors; do not hide key instructions in narrative prose; do not use vague unscorable adjectives.
- Anti-pattern warnings: Avoid compound requirements, unclear ownership, unlabelled mandatory items, and response formats that make vendor comparison subjective.

## Section 2: Core Question Domains
**Target length:** 1,800-2,300 words
**Purpose:** Draft this section so vendors understand exactly what the buyer is asking for and how it will be evaluated.
**Evaluation integration:** Ensure every question row can be scored or gated with consistent evidence sufficiency rules.

### 2.1 Business and operations questions (350-500 words)
- Section purpose: Elicit how the vendor's platform supports the institution's operational workflows, governance model, reporting obligations, and ongoing support requirements for digital asset operations.
- Target word count: 350-500 words
- What to write about: Draft a question grid covering these operational domains: (a) asset lifecycle workflow coverage (issuance, servicing, corporate actions, maturity/redemption); (b) operational governance (maker-checker approvals, segregation of duties, four-eyes principle for critical operations); (c) reporting and analytics (regulatory reporting outputs, management dashboards, reconciliation with core banking/GL systems, audit trail exports); (d) support and service management (SLA tiers, incident escalation, change request handling, release management cadence). Each question should specify the operational scenario and the evidence the vendor must provide to demonstrate capability.
- Requirement engineering / structure: Use a question grid table with columns: Q ID (BUS-nnn), Topic, Question, Priority (Must/Should/Could), Response Type (Narrative/Evidence/Demonstration), Evidence Requested. Target 8-12 questions. Mark workflow governance and reporting questions as Must; support model questions as Should.
- Tables / diagrams to include: Question grid table as described above. Optionally include a process scope diagram showing which lifecycle stages the questionnaire covers so vendors understand the operational boundary.
- Depth guidance: Focus questions on operational outcomes, not feature lists. Ask "describe how your platform enforces maker-checker approval for bond issuance operations" rather than "does your platform support maker-checker?"
- Anti-patterns to avoid: Asking about "workflow support" without specifying which workflows; combining multiple operational domains into a single question; accepting Yes/No for governance questions that require process evidence; omitting reconciliation and reporting questions (the most common gap in operational questionnaires).
- Tone guidance: Institutional, precise, neutral, auditable, and free of vendor-answer language.
- Source references: `rfp-forge/content/procurement/common-question-patterns.md` (Pattern 13: Implementation Delivery); `rfp-forge/content/architecture/architecture-requirements-patterns.md`; `rfp-forge/setup/skeleton-definition.md`

### 2.2 Technical and integration questions (350-500 words)
- Section purpose: Assess the vendor's platform architecture, deployment model, API integration capability, and operational resilience under the institution's technical constraints.
- Target word count: 350-500 words
- What to write about: Draft a question grid covering these technical domains: (a) platform architecture (layer separation, smart contract modularity, upgrade mechanisms, multi-network support); (b) integration capability (core banking/GL connectivity, custody system and HSM integration, payment rail interfaces including SWIFT/SEPA/RTGS, regulatory reporting system feeds); (c) deployment and infrastructure (cloud-agnostic deployment, on-premises/hybrid support, container orchestration, environment parity between staging and production); (d) resilience and performance (HA/DR architecture, RPO/RTO commitments, horizontal scaling approach, load-tested throughput benchmarks). Each question should define the technical acceptance boundary so evaluators can distinguish compliant from non-compliant responses.
- Requirement engineering / structure: Use a question grid table with columns: Q ID (TECH-nnn), Topic, Question, Priority (Must/Should/Could), Response Type (Architecture Diagram/Narrative/Evidence/Demonstration), Evidence Requested. Target 8-12 questions. Mark architecture and integration questions as Must; deployment flexibility and performance benchmarks as Should.
- Tables / diagrams to include: Question grid table as described above. Include a brief integration scope matrix listing the institution's target systems (core banking, custody, payment rails, compliance) so vendors understand which integration points the questionnaire covers.
- Depth guidance: Ask for architecture diagrams and integration topology evidence, not just narrative descriptions. Questions should reference specific interface standards (REST APIs, ISO 20022, FIX) where the institution's environment requires them. Ask about deployment constraints the institution actually has (e.g., "the institution operates a private cloud environment on Azure; describe how your platform deploys in this context").
- Anti-patterns to avoid: Asking "is your platform scalable?" without defining the target throughput; combining architecture and integration into a single compound question; accepting marketing diagrams as architecture evidence; omitting DR/resilience questions (frequently absent in digital asset questionnaires despite being standard in core banking procurement).
- Tone guidance: Institutional, precise, neutral, auditable, and free of vendor-answer language.
- Source references: `rfp-forge/content/architecture/architecture-requirements-patterns.md`; `rfp-forge/content/integration/integration-requirements-patterns.md`; `rfp-forge/content/security/security-requirements-patterns.md`; `rfp-forge/setup/skeleton-definition.md`

### 2.3 Security, compliance, and legal questions (350-500 words)
- Section purpose: Evaluate the vendor's security posture, regulatory compliance capability, data protection controls, and legal readiness for the institution's jurisdiction and risk framework.
- Target word count: 350-500 words
- What to write about: Draft a question grid covering these domains: (a) identity and access management (RBAC/ABAC model, MFA enforcement, privileged access management, session controls, integration with the institution's IdP); (b) cryptographic and key management (HSM support, key ceremony procedures, key rotation, recovery and backup, FIPS 140-2/3 or equivalent certification); (c) data protection and privacy (encryption at rest and in transit, data classification handling, data residency controls, GDPR/local privacy law compliance, right to erasure in immutable ledger contexts); (d) compliance and certification (SOC 2 Type II, ISO 27001, penetration testing cadence and remediation SLAs, vulnerability disclosure policy); (e) legal and regulatory (regulatory license status, sanctions screening integration, AML/KYC workflow support, jurisdiction-specific regulatory framework alignment). Each question should specify the minimum acceptable evidence and recency threshold for certifications.
- Requirement engineering / structure: Use a question grid table with columns: Q ID (SEC-nnn), Topic, Question, Priority (Must/Should/Could), Response Type (Certificate/Audit Report/Narrative/Evidence/Demonstration), Evidence Requested, Recency Requirement. Target 10-14 questions. Mark IAM, key management, and certification questions as Must; data residency and legal status as Must for regulated institutions; advanced privacy and sanctions screening as Should.
- Tables / diagrams to include: Question grid table as described above. Include a compliance evidence checklist specifying document name, acceptable format, maximum age (e.g., "SOC 2 Type II report, PDF, issued within 12 months"), and whether redaction is permitted.
- Depth guidance: Security questions must require artifact evidence, not just narrative claims. Ask for specific certifications with recency requirements (e.g., "provide SOC 2 Type II report issued within the last 12 months"). For jurisdiction-specific compliance, reference the applicable regulatory framework by name (MiCA, FCA, MAS TRM, SAMA Cybersecurity Framework) rather than asking generically about "regulatory compliance." Key management questions should distinguish between platform-managed and institution-managed HSM scenarios.
- Anti-patterns to avoid: Accepting self-attestation for security capabilities that have independent certification paths; asking "are you compliant?" without naming the specific regulation; combining security controls and legal compliance into one question; omitting recency thresholds for audit evidence (vendors may submit stale reports); treating data residency as optional for jurisdictions with explicit data sovereignty requirements.
- Tone guidance: Institutional, precise, neutral, auditable, and free of vendor-answer language.
- Source references: `rfp-forge/content/security/security-requirements-patterns.md`; `rfp-forge/content/compliance/jurisdiction-compliance-requirements.md`; `rfp-forge/content/compliance/regulatory-change-governance-requirements.md`; `rfp-forge/setup/skeleton-definition.md`

- Section-level tables / diagrams: Include a section summary table plus any response matrix, checklist, workflow, scoring rubric, or appendix index needed to make the section operational.
- Tone guidance: Keep the section tight, scorable, and administratively usable by procurement, legal, security, and evaluation teams.
- Source references: `rfp-forge/setup/skeleton-definition.md`; `bid-manager/skeletons/1_technical/markdown/technical-full.md`; `rfp-forge/content/README.md`
- Buyer-side constraints: Do not answer the requirement for vendors; do not hide key instructions in narrative prose; do not use vague unscorable adjectives.
- Anti-pattern warnings: Avoid compound requirements, unclear ownership, unlabelled mandatory items, and response formats that make vendor comparison subjective.

## Section 3: Exceptions, Evidence Pack, and Appendices
**Target length:** 1,500-2,000 words
**Purpose:** Draft this section so vendors understand exactly what the buyer is asking for and how it will be evaluated.
**Evaluation integration:** Ensure every question row can be scored or gated with consistent evidence sufficiency rules.

### 3.1 Qualifications register (350-500 words)
- Section purpose: Capture dependencies and caveats by Q ID.
- Target word count: 350-500 words
- What to write about: Capture dependencies and caveats by Q ID. Write in buyer language, frame the requirement or prompt clearly, and define the expected vendor response format or completion behavior.
- Requirement engineering / structure: Use atomic statements, clear labels for mandatory vs scored items, and explicit evidence or response-type columns where relevant.
- Tables / diagrams to include: Include at least one structured table, matrix, checklist, or diagram that makes responses comparable and evaluator-friendly.
- Tone guidance: Institutional, precise, neutral, auditable, and free of vendor-answer language.
- Source references: `rfp-forge/setup/skeleton-definition.md`; `bid-manager/skeletons/1_technical/markdown/technical-full.md`; `rfp-forge/content/README.md`

### 3.2 Evidence pack requirements (350-500 words)
- Section purpose: List required artifacts and formats.
- Target word count: 350-500 words
- What to write about: List required artifacts and formats. Write in buyer language, frame the requirement or prompt clearly, and define the expected vendor response format or completion behavior.
- Requirement engineering / structure: Use atomic statements, clear labels for mandatory vs scored items, and explicit evidence or response-type columns where relevant.
- Tables / diagrams to include: Include at least one structured table, matrix, checklist, or diagram that makes responses comparable and evaluator-friendly.
- Tone guidance: Institutional, precise, neutral, auditable, and free of vendor-answer language.
- Source references: `rfp-forge/setup/skeleton-definition.md`; `bid-manager/skeletons/1_technical/markdown/technical-full.md`; `rfp-forge/content/README.md`

### 3.3 Appendices and declarations (350-500 words)
- Section purpose: Index glossary, declarations, and assumptions register.
- Target word count: 350-500 words
- What to write about: Index glossary, declarations, and assumptions register. Write in buyer language, frame the requirement or prompt clearly, and define the expected vendor response format or completion behavior.
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
