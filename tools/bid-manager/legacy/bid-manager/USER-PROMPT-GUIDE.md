# Bid Manager: Prompt Guide

## What this agent does

Bid Manager produces SettleMint's formal responses to RFPs, RFIs, RFQs, and vendor questionnaires. It extracts requirements from source documents, tags each against DALP capabilities (🟢 Native / 🟡 Partial / 🔴 Gap / ⚪ N/A), selects win themes, assembles a response using reusable content blocks and DALP knowledge, and delivers a polished draft in markdown plus DOCX (proposals) or CSV plus locked XLSX (questionnaires).

## When to use it

- You've received an RFP, RFI, RFQ, or vendor questionnaire and need a full response draft
- You need a compliance or capability matrix prepared for a procurement process
- You want a specific section of a bid rewritten or strengthened (e.g. executive summary, security section)
- You need DOCX or XLSX output from a bid that was previously drafted in markdown

Do **not** use Bid Manager to generate the procurement document itself, that's `rfp-forge`. Do **not** use it for press content, that's `press-manager`.

## Required inputs

| Input | Details |
|-------|---------|
| **Source document** | Drop the RFP / RFI / questionnaire into `input/`. Name it: `{client-slug}_{doc-type}_{YYYY-MM-DD}.{ext}` (e.g. `acme-bank_rfp_2026-03-20.docx`) |
| **Client slug** | Short lowercase identifier for the institution (e.g. `acme-bank`, `isdb`, `mas-sg`) |
| **Document type** | One of: `rfp`, `rfi`, `rfq`, `questionnaire`, `due-diligence` |
| **Submission deadline** | ISO date: `YYYY-MM-DD` |

## Optional / configurable parameters

| Parameter | Default | Notes |
|-----------|---------|-------|
| **Win themes** | Auto-selected from `setup/win-themes.md` | Override with 1–3 of: `complexity`, `platform-not-consulting`, `evm-native`, `enterprise-controls`, `t-rex-compliance`, `rapid-deployment` |
| **Output format** | `docx` for proposals, `xlsx` for questionnaires | Explicitly request `xlsx` if the RFP is a spreadsheet questionnaire |
| **Language** | `en` | Specify `fr`, `de`, `ar`, `ja` etc. if non-English output is required |
| **Emphasis** | Balanced across all DALP pillars | Specify a focus area if the client is clearly oriented toward one: `compliance`, `custody`, `integration`, `deployment`, `security` |
| **Executive summary tone** | Confident, institution-facing | Options: `regulatory-first` (for central banks / regulators), `commercial-first` (for private banks), `technical-first` (for procurement with a heavy technical gate) |
| **Exec summary length** | ~400 words | Specify shorter (`short`) or longer (`long`) if the RFP has a page constraint |
| **IP protection** | Always enforced | No override. Source code, internal architecture names, and confidential client names are never included |

## Full example prompt

```
Please process this RFP from Abu Dhabi Investment Authority.

Source document: input/adia_rfp_2026-03-20.docx
Client slug: adia
Document type: rfp
Deadline: 2026-04-15

Win themes: enterprise-controls, t-rex-compliance, evm-native
Emphasis: security and compliance
Executive summary tone: regulatory-first
Output: docx

Additional context:
- ADIA is evaluating 3 platforms; we know Finastra and R3 are also bidding
- They have a strong MAS/ADGM compliance focus
- Prioritise the reference projects from the GCC and Islamic finance verticals
- Keep the executive summary under 350 words
```

## ⚠️ Important

- **Send everything in ONE message.** Do not drip-feed the source file, the deadline, and the context across separate messages. Give all inputs upfront and wait.
- **Do not send follow-up messages mid-task.** The agent will confirm when the draft is ready. Do not ping it for status updates.
- **GPT 5.4 is the default writing model.** A fallback is used only when operationally necessary.
- **File naming matters.** If the source file is not named `{client-slug}_{doc-type}_{YYYY-MM-DD}.{ext}`, rename it before dropping it into `input/` or specify the correct slug and date explicitly in the prompt.
- **DOCX is the delivery format.** The agent always works in markdown first. Ask for DOCX explicitly if you need it for submission. XLSX is generated for questionnaire-format inputs.
- **Confidence tags are honest.** If DALP does not natively support something, the response will say so using appropriate hedging. Do not ask the agent to over-claim capabilities.
- **Output lives in `bid-manager/output/`**: not in generic folders. Do not route artifacts elsewhere.

---

## Slack Message Template

Copy this message, fill in the `[placeholders]`, and send it in one go. Do not follow up mid-task.

```
@Quark run bid-manager

Client: [client name or slug, e.g. deutsche-bank]
Document type: [RFP / RFI / RFQ / questionnaire / tender]
Source file: [path to file, e.g. bid-manager/input/deutsche-bank_rfp_2026-03-20.pdf, or paste the doc content below]
Deadline: [YYYY-MM-DD or "no deadline"]

Optional:
- Win theme focus: [e.g. "security and compliance" / leave blank for auto-select]
- Section emphasis: [e.g. "expand custody and key management sections"]
- Executive summary: [e.g. "punchy, 200 words max" / leave blank for default]
- Output format: [DOCX + markdown (default) / markdown only]
- Language: [English (default) / other]
```
