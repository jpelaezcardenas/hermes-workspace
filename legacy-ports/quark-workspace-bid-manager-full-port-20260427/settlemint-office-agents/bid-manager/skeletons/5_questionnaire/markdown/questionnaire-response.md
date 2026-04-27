---
skeleton-type: questionnaire
variant: standard
target-format: "Excel (primary) + Markdown (reference)"
version: "BM-QS-04-v2.0"
last-updated: "2026-03-19"
---

# Questionnaire Response Blueprint: Standard

> **Version:** BM-QS-04-v2.0 (LENS)
> **Last updated:** 2026-03-19

## Blueprint Rules: MANDATORY COMPLIANCE

> ⛔ **This skeleton MUST be followed exactly.** No section may be skipped, reordered, merged, or shortened below its stated word-count floor. Deviation requires explicit written approval from Gyan (URGPRND7Z) before proceeding.

### Structural Compliance
- Follow every section in the order listed, no reordering
- Every section with a word target MUST hit its stated floor (minimum word count)
- Every `[VARIABLE: ...]` placeholder MUST be resolved before the draft is considered complete
- Every `[REUSABLE BLOCK: slug]` tag MUST be expanded from the referenced reusable file
- Every visual spec MUST produce an actual diagram, table, or matrix, not a placeholder description

### Consistency Anchors
- Heading hierarchy: H1 = document title, H2 = major section, H3 = subsection, H4 = sub-subsection
- No manual numbering in headings, the DOCX template handles numbering
- Table structure: always include a header row; no merged cells; keep columns consistent throughout
- Confidence tags: 🟢 Native | 🟡 Partial | 🔴 Gap | ⚪ N/A, apply at section level AND at claim level
- Voice: third person ("SettleMint provides", "DALP enables"), never first person
- Tense: present tense for capabilities, future tense for delivery phases

### Pre-Write Checklist (complete before drafting any section)
- [ ] `feedback/lessons.md` read and internalized
- [ ] `setup/core-positioning.md` read
- [ ] `setup/writing-style.md` read
- [ ] `setup/ip-protection.md` read
- [ ] `setup/mermaid-diagram-standards.md` read
- [ ] All source files in "Global Source Priority" confirmed accessible
- [ ] All `[VARIABLE: ...]` placeholders identified and sourced from RFP/brief

### Output Quality Gates (validate before delivery)
- [ ] Cover page: all placeholders resolved, no placeholder text remaining
- [ ] TOC: auto-generated, not hand-typed
- [ ] Word count: total output within target range (±10%; below floor = failure)
- [ ] Visual count: include diagrams, tables, and screenshots wherever they reinforce the narrative or help the evaluator understand faster than prose alone. There is no upper limit; use as many as the section content warrants
- [ ] Confidence tags: present on every substantive DALP capability claim
- [ ] No unsupported claims: every capability assertion maps to a source file
- [ ] No roadmap language: "coming soon", "planned", "will support" prohibited unless marked [ROADMAP]
- [ ] Prose quality: no section >50% bullets, rewrite to prose if needed
- [ ] Final sweep: run 7-sweep copy-editing framework (clarity, voice, structure, persuasion, specificity, rhythm, polish)


## Response Structure

- [Target: 180-320 words]
- [Source: content/05-security/main.md; content/02-configurable-compliance/main.md; content/03-integrations/main.md; reusable/about-dalp.md]
- [Key messages:
  - The default questionnaire response format is row-based and traceable.
  - Every answer must include a response, evidence, and status.
  - Multi-part questions must be decomposed clearly.
]
- [Visual:
  - Optional example response layout table.
]
- [Writer guidance:
  - Use one row per client question unless the question contains multiple discrete requirements that require separate treatment.
  - When a client template already defines columns, map the standard structure below into the provided format.
  - Keep terminology consistent: DALP, SettleMint, client, question, evidence, status.
]
- [Do NOT:
  - Collapse multiple requirements into one vague answer.
  - Omit evidence references.
]


**Consistency anchor:** One row per client question. Status and evidence present for every answer.

> ✅ **Section complete when:** Column layout defined. Multi-part question handling explained. Status definitions consistent.

## Reusable Response Blocks for Common Questionnaire Sections

**Consistency anchor:** Category normalization consistent across the entire workbook.


### About SettleMint
- When the questionnaire asks for vendor profile, write 120-220 words plus a short fact table.
- Cover: founding year (2016), mission, company profile, team/regional footprint, and approved certifications.
- Reference: `bid-manager/content/01-company-profile/main.md`, `bid-manager/templates/company-profile.md`.

### About DALP
- When the questionnaire asks for platform overview, answer in 120-220 words with a concise capability summary.
- Cover: DALP definition, lifecycle scope, key capabilities, and deployment flexibility.
- Reference: DALP sources already mapped in this blueprint, plus `bid-manager/content/01-company-profile/main.md` for narrative consistency.

### Customer References
- When asked for customer references, provide 3-4 approved examples or a compact summary table if the buyer template is row-limited.
- Include: deployment scale, use case, geography, and outcome/relevance.
- Reference: `bid-manager/content/07-references/main.md`, `bid-manager/templates/case-studies.md`.

### Project Implementation & Delivery
- When asked for implementation approach, answer with a phased summary: methodology, timeline, milestones, governance, RACI, and client dependencies.
- Reference: `bid-manager/content/06-implementation/main.md`, `bid-manager/templates/implementation-plan.md`.

### Deployment
- When asked for hosting/infrastructure, cover supported deployment models, infrastructure requirements, residency implications, and operational ownership.
- Reference: `bid-manager/content/04-deployment/main.md`.

### Support Appendix
- When asked for support/SLA, summarize support tiers, severity definitions, escalation paths, maintenance/update policy, and service credits only if approved.
- Reference: `bid-manager/content/07-support-sla/main.md`, `bid-manager/templates/sla-framework.md`.


### Standard Column Layout

- [Target: 120-220 words]
- [Source: bid-manager/skeletons/README.md]
- [Key messages:
  - The standard internal structure is: Question ID | Category | Question Text | SettleMint Response | Evidence/Reference | Status | Notes.
  - The response must remain readable even when exported to Excel.
]
- [Visual:
  - Table with columns: Question ID | Category | Question Text | SettleMint Response | Evidence/Reference | Status | Notes.
]
- [Writer guidance:
  - Define each column as follows:
    - Question ID: client numbering or unique row identifier.
    - Category: normalized internal grouping for sorting and QA.
    - Question Text: verbatim client wording unless the template already stores it elsewhere.
    - SettleMint Response: concise factual answer.
    - Evidence/Reference: specific source file, section, appendix, certification, or document name.
    - Status: Compliant / Partial / Roadmap / Non-Compliant / N/A.
    - Notes: assumptions, scope conditions, dependencies, or escalation notes.
  - If the buyer template has extra columns, keep them and map this structure around them.
]
- [Do NOT:
  - Invent internal IDs that replace client IDs.
  - Put evaluative commentary in the Question Text field.
]

### Handling Multi-Part Questions

- [Target: 140-240 words]
- [Source: content/05-security/main.md; content/02-configurable-compliance/main.md; content/03-integrations/main.md]
- [Key messages:
  - Multi-part questions must be answered component by component.
  - Partial compliance often occurs because one sub-part is covered and another is not.
]
- [Visual:
  - Optional table with columns: Parent ID | Sub-part | Response | Evidence | Status.
]
- [Writer guidance:
  - If one row contains multiple distinct asks, split the logic in one of two ways:
    - Preferred: create sub-rows using the client ID plus suffixes such as a/b/c when the buyer allows it.
    - Fallback: structure the SettleMint Response field as labeled bullet points matching each sub-part.
  - Assign status based on the weakest relevant sub-part unless the buyer template allows separate status per sub-part.
  - Use Notes to explain which sub-parts are fully covered versus conditional or unavailable.
]
- [Do NOT:
  - Answer only the first part of a compound question.
  - Mark the full row Compliant if a material sub-part is only partially met.
]

### Handling Yes/No vs Narrative Questions

- [Target: 140-240 words]
- [Source: reusable/about-dalp.md; content/05-security/main.md; content/02-configurable-compliance/main.md]
- [Key messages:
  - Yes/No questions still require evidence and context.
  - Narrative questions require concise, complete, source-backed answers.
]
- [Visual:
  - Optional two-column guidance table: Question type | Response pattern.
]
- [Writer guidance:
  - For yes/no questions:
    - Start with Yes, No, Partial, N/A, or Roadmap where the buyer format permits.
    - Follow with a short factual qualifier if needed.
    - Always cite evidence.
  - For narrative questions:
    - Answer directly in 1-3 sentences for simple questions.
    - Use 1-2 short paragraphs for complex questions.
    - Lead with the capability statement, then add scope limits or dependencies.
]
- [Do NOT:
  - Leave a yes/no answer unsupported.
  - Turn narrative answers into marketing copy.
]

> ✅ **Section complete when:** All category definitions present. Source references complete.

## Response Writing Guidelines

- [Target: 220-360 words]
- [Source: reusable/about-dalp.md; reusable/about-settlemint.md; content/05-security/main.md; content/02-configurable-compliance/main.md; content/03-integrations/main.md]
- [Key messages:
  - Responses must be factual, specific, concise, and source-backed.
  - Claims about capability must reflect what is available today in DALP.
  - Gaps must be stated honestly.
]
- [Visual:
  - Optional do/don’t comparison table.
]
- [Writer guidance:
  - Tone:
    - Factual.
    - Specific.
    - No marketing fluff.
  - Length:
    - Typically 1-3 sentences for simple questions.
    - Typically 1-2 paragraphs for complex questions.
  - Content rules:
    - Always cite source documentation when claiming a capability.
    - State availability today versus configuration-dependent versus roadmap.
    - Use DALP terminology consistently.
    - Summarize the answer; do not paste large blocks from source content.
    - If the question asks for certifications, standards, RTO/RPO, hosting, or regulatory coverage, verify the exact wording in the cited source before responding.
]
- [Do NOT:
  - Claim capabilities that do not exist.
  - Use vague phrases such as “we can potentially…” or “this should be possible”.
  - Describe roadmap items as current features.
]

## Status Definitions

- [Target: 160-280 words]
- [Source: reusable/about-dalp.md; content/05-security/main.md; content/02-configurable-compliance/main.md; content/03-integrations/main.md]
- [Key messages:
  - Status values must be used consistently across the entire questionnaire.
  - Status is a buyer-facing signal and must align with the detailed answer.
]
- [Visual:
  - Status definition table with columns: Status | Meaning | Writer rule.
]
- [Writer guidance:
  - Use the following definitions:
    - Compliant: fully available today in DALP.
    - Partial: available with configuration, constraints, dependencies, or known limitations; explain what is missing.
    - Roadmap: planned but not available today; include expected timeline if known and verified.
    - Non-Compliant: not available and not planned.
    - N/A: not applicable to SettleMint’s scope or not relevant to the buyer’s requested operating model.
  - Match the answer wording to the selected status.
  - If uncertainty remains after source review, escalate for verification rather than guessing.
]
- [Do NOT:
  - Use Compliant where material caveats exist.
  - Use Roadmap without a verified planning basis.
  - Leave status blank.
]


**Consistency anchor:** Status values used consistently across entire questionnaire. No blank status fields.

> ✅ **Section complete when:** All five status values defined with meaning and writer rule.

## Source Content References

- [Target: 180-320 words]
- [Source: bid-manager/skeletons/README.md]
- [Key messages:
  - Most questionnaire answers can be sourced from the core content and reusable files.
  - The writer must use the most directly relevant source first.
]
- [Visual:
  - Source mapping table.
]
- [Writer guidance:
  - Use this source map:
    - Security questions → `content/05-security/main.md`
    - Compliance questions → `content/02-configurable-compliance/main.md`
    - Architecture questions → `content/02-architecture/main.md` (if exists) or `templates/technical-proposal-part1.md`
    - Token/asset questions → `content/01-configurable-tokens/main.md`
    - Integration questions → `content/03-integrations/main.md`
    - Deployment questions → `reusable/deployment-options.md`
    - Support questions → `reusable/support-sla.md`
    - Company questions → `reusable/about-settlemint.md`
    - Platform overview → `reusable/about-dalp.md`
    - References → `reusable/reference-projects.md`
  - Prefer the narrowest relevant source over broad overview documents.
  - Where answers combine multiple domains, cite multiple sources in a consistent format.
]
- [Do NOT:
  - Cite broad overview documents when a more specific source exists.
  - Reference unsupported oral knowledge.
]


**Consistency anchor:** Narrowest relevant source cited first. No unsupported oral knowledge.

> ✅ **Section complete when:** Source map covers all common question categories. Narrowest source cited first.

## Common Questionnaire Categories

- [Target: 220-360 words]
- [Source: reusable/about-settlemint.md; reusable/about-dalp.md; content/05-security/main.md; content/02-configurable-compliance/main.md; content/03-integrations/main.md; reusable/deployment-options.md; reusable/support-sla.md; reusable/reference-projects.md]
- [Key messages:
  - Category normalization improves consistency, QA, and workbook filtering.
  - Each category has preferred source files and response rules.
]
- [Visual:
  - Category guidance matrix.
]
- [Writer guidance:
  - Normalize client questions into the categories below for internal control, even if the client uses different labels.
  - Keep category naming consistent across the workbook.
]
- [Do NOT:
  - Create overlapping category labels for the same topic.
]

**Consistency anchor:** Category normalization consistent across the entire workbook.


### Company & Financial

- [Target: 100-180 words]
- [Source: reusable/about-settlemint.md]
- [Key messages:
  - Use factual corporate information only.
  - Be precise about company size, funding, revenue, ownership, and legal entity details.
]
- [Visual:
  - Optional company facts table.
]
- [Writer guidance:
  - Use only verified company information from approved source material.
  - If the buyer asks for information not available in the approved content, flag for business input.
]
- [Do NOT:
  - Guess financial figures.
  - Inflate company scale or market position.
]

### Platform & Technology

- [Target: 100-180 words]
- [Source: reusable/about-dalp.md; content/02-architecture/main.md; templates/technical-proposal-part1.md]
- [Key messages:
  - Answer architecture, scalability, performance, and platform model questions with source citations.
]
- [Visual:
  - Optional architecture or capability table.
]
- [Writer guidance:
  - Focus on platform structure, deployment model, runtime capabilities, and verified technical patterns.
]
- [Do NOT:
  - Use generic platform claims without evidence.
]

### Security

- [Target: 100-180 words]
- [Source: content/05-security/main.md]
- [Key messages:
  - Security answers must cover authentication, authorization, encryption, secrets, key management, monitoring, and certifications only as verified.
]
- [Visual:
  - Optional control matrix.
]
- [Writer guidance:
  - Cite the security content directly.
  - If the question asks for a certification, control set, or penetration-testing detail, verify the exact claim before answering.
]
- [Do NOT:
  - State security certifications or controls from memory.
]

### Compliance & Regulatory

- [Target: 100-180 words]
- [Source: content/02-configurable-compliance/main.md]
- [Key messages:
  - Compliance answers must distinguish platform capability from legal advice or customer operating responsibility.
]
- [Visual:
  - Optional compliance module table.
]
- [Writer guidance:
  - Cite configurable compliance modules, identity architecture, and regulatory mappings only as documented.
  - Be clear when DALP enables policy enforcement versus when the client remains responsible for regulatory decisions.
]
- [Do NOT:
  - Present SettleMint as providing legal advice.
]

### Integration & Interoperability

- [Target: 100-180 words]
- [Source: content/03-integrations/main.md]
- [Key messages:
  - Integration answers should cover APIs, standards, protocols, events, and external-system connectivity.
]
- [Visual:
  - Optional interface summary table.
]
- [Writer guidance:
  - Use precise wording on supported interfaces and integration patterns.
]
- [Do NOT:
  - Suggest unsupported connectors or standards.
]

### Deployment & Infrastructure

- [Target: 100-180 words]
- [Source: reusable/deployment-options.md]
- [Key messages:
  - Deployment answers should distinguish cloud, on-prem, hybrid, and residency implications.
]
- [Visual:
  - Optional deployment options table.
]
- [Writer guidance:
  - Tie infrastructure claims to the documented deployment models.
]
- [Do NOT:
  - Assume one deployment mode fits all buyers.
]

### Support & Operations

- [Target: 100-180 words]
- [Source: reusable/support-sla.md]
- [Key messages:
  - Support answers must align with the published support model, SLAs, incident handling, and operating boundaries.
]
- [Visual:
  - Optional SLA table.
]
- [Writer guidance:
  - Keep support, monitoring, and escalation wording aligned with approved support documents.
]
- [Do NOT:
  - Promise support terms not defined in the approved SLA material.
]

### Data & Privacy

- [Target: 100-180 words]
- [Source: content/05-security/main.md; reusable/deployment-options.md]
- [Key messages:
  - Data privacy answers should cover data protection, residency, and GDPR-related handling only as documented.
]
- [Visual:
  - Optional residency/privacy table.
]
- [Writer guidance:
  - Separate platform capabilities from client-controlled deployment choices.
]
- [Do NOT:
  - Make blanket residency or privacy claims without deployment context.
]

### Business Continuity

- [Target: 100-180 words]
- [Source: reusable/deployment-options.md; reusable/support-sla.md]
- [Key messages:
  - Business continuity answers should address backup, disaster recovery, resilience, RTO, and RPO using verified material.
]
- [Visual:
  - Optional continuity matrix.
]
- [Writer guidance:
  - If exact RTO/RPO values are requested, verify them explicitly in source material before answering.
]
- [Do NOT:
  - State unverified continuity metrics.
]

> ✅ **Section complete when:** All category definitions present. Source references complete.

## Excel Output Format

- [Target: 180-300 words]
- [Source: bid-manager/skeletons/README.md]
- [Key messages:
  - The primary output is an Excel workbook or buyer-provided spreadsheet.
  - The workbook should separate responses, evidence, and terminology support.
]
- [Visual:
  - Workbook tab structure table.
]
- [Writer guidance:
  - Use the approved bid-manager questionnaire workbook template unless the buyer explicitly provides their own spreadsheet to fill in place.
  - The locked default workbook structure is:
    - Tab 1: Cover.
    - Tab 2: Response, the actual questionnaire responses.
    - Tab 3: Evidence Index, list of all referenced documents with short descriptions.
    - Tab 4: Glossary. DALP-specific terms, acronyms, and product terminology.
  - In Tab 1, freeze headers and keep status values consistent for filtering.
  - In Tab 2, include document name, description, relevance, and reference label used in Tab 1.
  - In Tab 3, define acronyms on first use and keep definitions short.
]
- [Do NOT:
  - Scatter evidence descriptions across multiple tabs inconsistently.
  - Use different status labels across worksheets.
]


**Consistency anchor:** Workbook tab structure matches approved template. Status labels identical across tabs.

> ✅ **Section complete when:** Workbook structure defined. Tab purposes clear. Status values consistent.

## Quality Checklist

- [Target: 160-260 words]
- [Source: reusable/about-dalp.md; reusable/about-settlemint.md; content/05-security/main.md; content/02-configurable-compliance/main.md; content/03-integrations/main.md; reusable/support-sla.md; reusable/deployment-options.md]
- [Key messages:
  - Questionnaire quality depends on consistency, traceability, and honesty.
]
- [Visual:
  - QA checklist table.
]
- [Writer guidance:
  - Confirm all of the following before finalization:
    - Every Compliant claim has a source reference.
    - Every Partial answer explains what is missing or conditional.
    - Every Roadmap answer includes an estimated timeline if known and verified.
    - No marketing language appears in responses.
    - Terminology is consistent throughout.
    - All acronyms are defined on first use or in the Glossary tab.
    - No client question is left unanswered.
    - Notes fields explain dependencies, assumptions, or buyer-specific caveats where relevant.
]
- [Do NOT:
  - Submit with unresolved placeholders.
  - Leave status and response logic misaligned.
]


**Consistency anchor:** All checklist items verified before finalization. No unresolved placeholders.

> ✅ **Section complete when:** All QA items present. Traceability and consistency verified.

## Do NOT Guidance

- [Target: 140-240 words]
- [Source: reusable/about-dalp.md; bid-manager/skeletons/README.md]
- [Key messages:
  - Questionnaire responses fail when they overclaim, under-explain, or leave gaps.
]
- [Visual:
  - No visual.
]
- [Writer guidance:
  - Apply these prohibitions globally:
    - Do NOT claim features that are on roadmap as available today.
    - Do NOT use vague language such as “we can potentially...” or similar unsupported phrasing.
    - Do NOT leave any question blank; always provide a response, even if N/A.
    - Do NOT copy-paste long content sections as answers; summarize and cite.
    - Do NOT change buyer wording in a way that changes meaning.
    - Do NOT hide limitations in Notes when they materially affect compliance status.
]
- [Do NOT:
  - Turn this blueprint into finished client-facing prose.
  - Use manual numbering in headings.
]