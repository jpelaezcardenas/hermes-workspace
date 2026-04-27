# Detection Keywords

Trigger patterns for recognizing bid-manager work in messages. Used by Quark to decide when to activate the bid-manager pipeline vs. answering a regular DALP question.

---

## RFP / Proposal Triggers

**Keywords:**
- "RFP", "request for proposal", "proposal response", "bid response", "tender response"
- "technical proposal", "commercial proposal", "write a proposal"
- "respond to this RFP", "prepare a proposal", "bid for this"
- "proposal document", "tender submission", "bid submission"

**File signals:**
- `.docx` attachment containing procurement language (scope of work, evaluation criteria, submission deadline, mandatory requirements)
- `.pdf` attachment with "Request for Proposal" in title or first pages

**Context signals:**
- Mention of a specific client + deadline + deliverable
- Reference to evaluation criteria or scoring
- Phrases like "we need to respond by [date]"

---

## RFI Triggers

**Keywords:**
- "RFI", "request for information", "information request"
- "respond to this RFI", "answer these questions"
- "information gathering", "market survey"

**File signals:**
- Document structured as a list of questions about capabilities
- No pricing or commercial terms (distinguishes from RFP)

---

## Questionnaire Triggers

**Keywords:**
- "questionnaire", "fill this out", "answer these questions"
- "security questionnaire", "vendor questionnaire", "due diligence questionnaire"
- "compliance questionnaire", "technical questionnaire"
- "CAIQ", "SIG", "VSA", "HECVAT"

**File signals:**
- `.xlsx` or `.csv` with columns like: Question, Answer, Evidence, Status
- `.docx` with numbered question-and-answer format
- Spreadsheet with multiple tabs organized by domain (Security, Privacy, Compliance, etc.)

**Context signals:**
- "Our security team needs this filled out"
- "Part of our vendor assessment process"
- Reference to procurement or onboarding gates

---

## Negative Triggers: NOT Bid Manager Work

These patterns look similar but should NOT activate the bid-manager pipeline:

- **General DALP questions**: "Can DALP do X?" without procurement context → regular Quark answer
- **Internal team discussions**: "We should include X in our next proposal" → just conversation
- **Demo requests**: "Can we schedule a demo?" → sales follow-up, not bid work
- **Meeting scheduling**: "Let's discuss the RFP on Thursday" → calendar, not content
- **Competitor questions**: "How does DALP compare to X?" without a specific bid → competitor intel, not bid response
- **Pricing questions**: "What's our pricing for X?" → pricing team, unless it's part of a commercial proposal

---

## Decision Logic

```
Message received
  ├─ Contains positive trigger keyword?
  │   ├─ YES + has file attachment → ACTIVATE bid-manager pipeline
  │   ├─ YES + mentions client + deadline → ACTIVATE bid-manager pipeline
  │   ├─ YES + but matches negative trigger → regular Quark response
  │   └─ YES + ambiguous context → ask: "Is this for a specific bid? If so, share the document and I'll spin up the bid pipeline."
  └─ NO → regular Quark response
```
