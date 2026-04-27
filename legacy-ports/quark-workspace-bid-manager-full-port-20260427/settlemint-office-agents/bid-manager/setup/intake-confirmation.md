# Intake Confirmation Flow: Mandatory Pre-Generation Gate

> **Rule**: The bid-manager MUST confirm its detection with the requester before spawning any generation agents. No exceptions.

---

## Why This Exists

Misclassifying an RFP wastes hours of agent time and produces the wrong deliverable. A 30-second confirmation step eliminates this risk entirely. The cost of asking is near zero. The cost of getting it wrong is a full re-run.

---

## The Flow

### Step 1: Analyze the Document

After ingesting and classifying the input document (per `setup/rfp-type-detection.md`), the bid-manager assembles a detection summary.

### Step 2: Present the Summary

Post this summary to the requester in the Slack thread **before doing any writing**:

```
📋 RFP Analysis Complete

Document: [document name/title]
Requester: [name]
Deadline: [extracted deadline, or "not specified"]
Client: [extracted client name]
Geography: [extracted geography/jurisdiction]

Detected type(s):
✅ Technical Proposal, [brief reason, e.g. "RFP format, asks for methodology + architecture"]
✅ Commercial Proposal, [brief reason, e.g. "Section 4 requests separate pricing schedule"]
❌ Questionnaire, [brief reason, e.g. "no Q&A format detected"]
❌ Executive Summary, [brief reason, e.g. "full proposal requested"]

Planned outputs:
→ Technical Proposal DOCX (bid-manager proposal track)
→ Commercial Proposal DOCX (bid-manager commercial track)

Skeleton selection:
→ Technical: full (80+ requirements, sovereign-tier client)
→ Commercial: medium (standard pricing framework)

Estimated generation time: ~[X] minutes

Shall I proceed? Reply YES to start, or correct my detection.
```

### Step 3: Wait for Confirmation

- **Do not start generating** until the requester confirms.
- Acceptable confirmations: "yes", "go", "proceed", "looks good", "correct", thumbs-up reaction, or any clear affirmative.
- If the requester says nothing for 30+ minutes, send one follow-up: "Still waiting for your go-ahead on this. Want me to proceed with the detection above?"

### Step 4a: On Confirmation → Execute

1. Spawn separate sub-agents per output type **in parallel** (see "Parallel Output Generation" in `PROCESS.md`)
2. Each agent gets:
   - The full RFP document as input
   - Its specific skeleton template
   - The detection summary for context
   - All mandatory pre-reads (lessons, positioning, style guides)
3. Report progress as agents complete
4. Deliver all outputs together in the thread

### Step 4b: On Correction → Re-Classify

1. Acknowledge the correction
2. Re-run detection with the corrected parameters
3. Present an updated summary
4. Wait for confirmation again
5. Do not start until confirmed

---

## Edge Cases

### Requester says "just do it" or "skip confirmation"
- Treat as confirmation of the current detection. Proceed immediately.
- Log that confirmation was implicit.

### Requester changes the scope mid-generation
- Stop running agents if the scope change invalidates their output
- Re-confirm with updated detection
- Resume or restart as needed

### Document is ambiguous even after analysis
- Present your best guess with explicit uncertainty markers:
  ```
  ⚠️ Uncertain classification:
  🟡 Could be Technical Proposal OR RFI, document has elements of both
  
  My recommendation: Treat as Technical Proposal (it asks for methodology, not just capability answers)
  
  Do you agree, or should I treat this differently?
  ```

### Multiple documents attached
- Analyze each document separately
- Present a combined detection summary showing all documents and their classifications
- Confirm once for the entire batch

---

## What This Does NOT Cover

- **Content quality**: this flow handles classification only, not writing quality
- **Post-generation review**: bid-checker handles that separately
- **Human bid/no-bid decision**: the intake confirmation assumes a "go" decision has already been made
