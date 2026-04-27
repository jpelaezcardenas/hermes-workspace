---
name: bid-manager
description: Respond to RFPs, RFIs, and tenders using DALP codebase knowledge, SettleMint references, past proposals, and competitive positioning. Use when processing procurement documents, drafting bid responses, creating compliance matrices, or preparing proposal sections. Triggers on 'RFP', 'RFI', 'tender', 'bid', 'proposal response', 'procurement', 'compliance matrix', 'scope of work response'.
---

# Bid Manager Agent

Help SettleMint respond to RFPs, RFIs, and tenders by combining DALP platform knowledge with client references, past proposals, and competitive intelligence.

## Quick Start

1. Receive RFX document or bid request
2. Read `setup/README.md` for rules and configuration
3. Read `templates/README.md` for available templates
4. Classify the document type and select the appropriate skeleton
5. Assemble content from reusable blocks, DALP knowledge, and references
6. Generate output: markdown + DOCX (proposals) or CSV + XLSX (questionnaires)

## Key Files

| File | Purpose |
|------|---------|
| `README.md` | Full agent documentation, content index, topic index, RFP question quick-find |
| `scripts/markdown_to_docx.py` | Markdown to DOCX conversion (Figtree font, mermaid diagrams, TOC, master template) |
| `scripts/csv_to_xlsx.py` | CSV to branded questionnaire XLSX (locked template, validation, conditional formatting) |
| `scripts/validate_proposal.py` | Pre-DOCX validation (mermaid count, emoji check, mandatory diagrams) |
| `scripts/generate_questionnaire_template.py` | Generate the branded questionnaire XLSX template |
| `setup/writing-style.md` | Writing voice, formatting, persuasion structure |
| `setup/ip-protection.md` | Allow/deny lists for bid content |
| `setup/win-themes.md` | 6 strategic differentiators with usage guidance |

## Workflow

### 1. Intake
Drop RFX documents into `input/`. Name: `{client-slug}_{document-type}_{YYYY-MM-DD}.{ext}`

### 2. Classification
Identify document type (RFP, RFI, RFQ, questionnaire, tender), client profile, scope, deadline.

### 3. Skeleton Selection
Select from `skeletons/`: technical proposal, commercial proposal, executive summary, compliance matrix, questionnaire.

### 4. Content Assembly
Pull from:
- `reusable/` blocks (about-settlemint, about-dalp, deployment, implementation, support, training, references)
- `content/` sections (8 deep-dive DALP knowledge areas, ~80K words)
- `references/` (9 public-facing RFP-safe narratives)
- DALP codebase (`~/dalp`) for capability verification

### 5. Output Generation
- **Proposals**: Markdown (mother format) then DOCX via `scripts/markdown_to_docx.py`
- **Questionnaires**: CSV (mother format) then XLSX via `scripts/csv_to_xlsx.py`
- **Compliance matrices**: Markdown tables with status tags

### 6. Validation
Run `scripts/validate_proposal.py` before DOCX conversion to verify mermaid diagram counts, emoji absence, and mandatory sections.

## Output Types

| Type | Mother Format | Derived Format | Template |
|------|--------------|----------------|----------|
| Technical Proposal | `.md` | `.docx` | `skeletons/1_technical/` |
| Commercial Proposal | `.md` | `.docx` | `skeletons/2_commercial/` |
| RFI Response | `.md` | `.docx` | `skeletons/3_rfi/` |
| Compliance Matrix | `.md` | `.docx` | `templates/compliance-matrix.md` |
| Questionnaire | `.csv` | `.xlsx` | `skeletons/5_questionnaire/` |
| Executive Summary | `.md` | `.docx` | `templates/executive-summary.md` |

## Mandatory Rules

Before generating any bid content, load and apply:
- `rules/ip-protection.md` or `setup/ip-protection.md`
- `rules/writing-style.md` or `setup/writing-style.md`
- `rules/word-compatible-markdown.md` or `setup/word-compatible-markdown.md`

## Sub-Agents

- **rfp-forge** (`setup/agents/rfp-forge/`): Generates realistic procurement documents from the buyer's perspective for training and testing the bid-manager.
- **bid-checker** (`skills/bid-checker/`): Critiques bid responses against RFP evaluation criteria and scores them.

## Rules

1. Never fabricate capabilities. Verify against `~/dalp` codebase.
2. Never promise custom development. SettleMint sells a platform.
3. Always include gap analysis. Hiding gaps erodes trust.
4. Match the RFP's language and terminology.
5. Markdown and CSV are mother formats. Derived formats are generated, never edited directly.
6. All DOCX conversion goes through `scripts/markdown_to_docx.py`. No inline python-docx.
7. No emoji in client-facing output documents.
