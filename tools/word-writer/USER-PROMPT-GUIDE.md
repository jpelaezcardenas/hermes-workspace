---
title: "Word Writer — Prompt Guide"
type: page
source: gbrain-metadata-normalizer
metadata_normalized_at: 2026-04-27T12:36:05.911019Z
---

# Word Writer — Prompt Guide

## What this agent does

Word Writer generates professional Microsoft Word (DOCX) documents for any SettleMint use case that is not a bid response, an RFP, or a press/media package. It drafts in Word-compatible markdown and converts to DOCX using the shared SettleMint Word styling pipeline.

Supported document types include:

| Type | Examples |
|------|---------|
| **Report** | Research reports, market analysis, capability assessments |
| **Executive memo** | Board briefings, leadership recommendations, decision memos |
| **Structured briefing** | Platform briefing docs, partner briefings, client onboarding packs |
| **Q&A pack** | Analyst Q&A, investor FAQ, client FAQ |
| **Meeting summary** | Workshop notes, project kickoff summaries, steering committee minutes |
| **Research summary** | Competitor landscape write-ups, market sizing, technology assessments |
| **Internal writeup** | Operating notes, process documentation, team guidance |
| **Status update** | Project status, sprint summary, quarterly update |
| **Questionnaire** | Internal survey or due-diligence questionnaire (for SettleMint to issue, not to answer) |

Do **not** use Word Writer for:
- Bid responses or RFI replies → use `bid-manager`
- Generating an RFP for a client to answer → use `rfp-forge`
- Press releases, interview prep, or media kits → use `press-manager`
- PowerPoint presentations → use `ppt-maker`

## When to use it

Use Word Writer when the document is primarily trying to **inform, align, summarise, recommend, or record** — not to win a deal, run a procurement, or speak to media.

## Required inputs

| Input | Details |
|-------|---------|
| **Document type** | Choose from the table above or describe it plainly. The agent will select the appropriate template. |
| **Title** | The exact document title. This appears on the cover page and in the header. |
| **Audience** | Who will read this. E.g. `SettleMint board`, `prospect CTO`, `internal engineering team`, `MAS regulator`, `strategic partner`. |
| **Outline or content** | Either a section-by-section outline, a set of raw notes / bullet points to be structured and written up, or a request to draft from scratch given the topic and audience. |

## Optional / configurable parameters

| Parameter | Default | Notes |
|-----------|---------|-------|
| **Table of contents** | Included for documents over ~6 sections | Override with `toc: yes` or `toc: no` |
| **Cover page** | Included by default | Provide `cover: company`, `cover: title`, `cover: subtitle`, `cover: date` fields if you want specific wording. Or `cover: no` to omit. |
| **Length** | Appropriate to document type and content | Options: `brief` (executive-readable, minimal sub-sections), `standard` (full treatment), `comprehensive` (detailed, sub-sections and appendix) |
| **Tone** | Formal by default | Options: `formal`, `professional-conversational`, `internal-casual` |
| **Tables** | Included where content calls for it | Request `tables: yes` or `tables: no` if you have a strong preference. Specify individual tables if needed: e.g. `include a comparison table of deployment options`. |
| **Figures / diagrams** | Not included by default | Request `include a process diagram for [topic]` or `include a data table for [section]` explicitly. |
| **Appendix** | Not included by default | Request `include appendix: [content description]` if you want supporting material attached. |
| **Language** | English | Specify `language: fr`, `language: de`, `language: ar`, etc. for non-English output. |
| **DOCX mode** | `simple` (standard business document) | Use `mode: full` for documents that need a formal cover page, title block, and header/footer styling. |

## Full example prompt

```
Please write an executive briefing document with the following spec:

Document type: Structured briefing
Title: DALP Platform Capabilities — Briefing for Potential Framework Partners
Audience: Innovation leads and Head of Digital Assets at tier-1 European banks 
          considering a framework partnership with SettleMint
Tone: formal, authoritative, peer-to-peer (not a sales pitch)
Length: standard
Mode: full (with cover page)

Cover page:
- Company: SettleMint
- Title: DALP Platform Capabilities
- Subtitle: Framework Partner Briefing — Q2 2026
- Date: March 2026

Table of contents: yes

Sections to cover:
1. Executive summary — what DALP is and why it matters for framework partners
2. Platform overview — the five lifecycle pillars (issuance, compliance, settlement, 
   operations, custody)
3. Supported asset classes — the 8 asset types with brief per-class description
4. Integration and deployment options — 4 deployment models, API/SDK/CLI surface
5. Compliance architecture — ERC-3643, 18 compliance modules, jurisdiction examples 
   (MiCA, MAS, JFSA)
6. Reference clients — include the summary table of 14 named projects
7. Partnership model — how a framework partnership works commercially

Tables: yes — include comparison table for deployment models
Appendix: include a glossary of key DALP terms
Output: docx
```

## ⚠️ Important

- **Send everything in ONE message.** Provide the document type, title, audience, outline, and all optional parameters together. Do not send the outline and then follow up with tone preferences.
- **Do not send follow-up messages mid-task.** The agent will confirm when the DOCX is ready.
- **DOCX is the delivery format.** The agent drafts in markdown and converts automatically.
- **GPT 5.4 is the default writing model.** A fallback is used only when operationally necessary.
- **The markdown source is preserved.** Both the `.md` and `.docx` files are saved. Edit the markdown source for any revisions; do not edit the DOCX directly.
- **If in doubt about scope, check the boundary.** If the document is primarily trying to win a deal, run a procurement, or speak to media — it belongs in a different agent.

---

## Slack Message Template

Copy this message, fill in the `[placeholders]`, and send it in one go. Do not follow up mid-task.

```
@Quark run word-writer

Document type: [executive memo / research brief / meeting notes / structured Q&A / internal report / external briefing / other]
Title: [e.g. "DALP Compliance Architecture — Executive Brief"]
Audience: [e.g. "board members" / "client CTO" / "internal engineering team"]
Content / outline:
- [section 1: e.g. Background and context]
- [section 2: e.g. Key findings]
- [section 3: e.g. Recommendations]
- [add as many sections as needed]

Optional:
- Length: [e.g. "3–5 pages" / leave blank for agent to judge]
- Tone: [formal / direct / executive (default: formal)]
- Table of contents: [include / exclude (default: include for long docs)]
- Cover page: [yes — Company: [name], Title: [title], Subtitle: [subtitle], Date: [YYYY-MM-DD] / no]
- Tables or figures: [e.g. "include a comparison table for custody options" / leave blank]
- Appendix: [yes — [describe content] / no]
- Language: [English (default) / other]
- DOCX mode: [simple (no cover) / full (with cover, default if cover page requested)]
```
