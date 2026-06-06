# Executive Queue Spec v0.1

> **For Hermes:** Use this as the product/spec source for the first Executive Queue implementation. Use `subagent-driven-development` if implementing task-by-task.

**Goal:** Build a cross-domain control layer where delegated work from voice, Telegram, email, meetings, crons, Hermes Workspace, and agents is captured, triaged, approved, executed, and reviewed.

**Architecture:** Local JSON is the execution source of truth. Notion is the human command center after triage. Hermes Workspace is the live cockpit for triage, approvals, queue views, and dispatch. Voice Lab should create the first real queue item locally from its delegation handoff.

**Tech Stack:** Hermes Workspace V2, TypeScript, TanStack Start routes, local JSON under the Executive profile, future Notion sync.

---

## Core Principle

Executive Queue is not a todo list.

It is a decision-and-delegation control layer.

It answers:

- What does Tim want done?
- Who owns it?
- What context is required?
- What can Executive do without approval?
- What needs Tim before action?
- What is the current state?

## Default Posture

- New items start in **Triage**.
- Triage mode is **Judgment**.
- Executive may prepare freely.
- Execution must obey approval gates.
- Every item must be traceable to its source.
- Every item must have exactly one accountable owner.
- Done requires a result summary.

## Storage Model

### Local JSON

Local JSON is the machine source of truth.

It stores:

- raw captures
- triage attempts
- full source transcript/reference
- audit trail
- diagnostics
- execution metadata
- queue item record
- sync state

Recommended path:

```text
~/.hermes/profiles/executive/executive-queue/items/YYYY-MM-DD/{itemId}.json
~/.hermes/profiles/executive/executive-queue/index.jsonl
```

### Notion

Notion is the human command center.

It stores cleaned operating view fields only after triage:

- Proposed
- Queued
- In Progress
- Blocked
- Done

Also sync High-risk Triage items if they need visibility or Tim approval.

Do not sync raw captures to Notion.

### Hermes Workspace

Hermes Workspace is the live cockpit.

It should show:

- Inbox/Triage
- Active Queue
- Approvals
- Blocked
- Done history
- item detail
- source transcript
- audit trail
- dispatch owner controls

## Statuses

### Triage

Captured, but not fully classified.

Needs owner, priority, risk, approval level, confidence, and next action.

### Proposed

Executive knows what should happen, but needs Tim approval before starting.

### Queued

Approved or safe enough to start under standing rules.

### In Progress

An owner is actively working the item.

### Blocked

Cannot move forward without missing info, access, timing, dependency, or approval.

### Done

Outcome delivered and result summary captured.

### Archived

No longer relevant, duplicate, stale, or intentionally dropped.

## Status Transitions

- Triage can move to Proposed, Queued, Blocked, or Archived.
- Proposed can move to Queued, Blocked, or Archived.
- Queued can move to In Progress, Blocked, Done, or Archived.
- In Progress can move to Blocked, Done, or Queued.
- Blocked can move back to Triage, Proposed, Queued, or Archived.
- Done can only move to Archived or reopen to Triage.
- Archived can only reopen to Triage.

## Done Rule

An item cannot move to Done unless it has:

- result summary
- completed timestamp
- completed by
- artifact links or file paths, if relevant

If Notion sets status to Done without result summary, local sync should convert it to Blocked.

Blocked reason:

```text
Done requires result summary.
```

## Priorities

- **P0:** urgent now. Drop other work.
- **P1:** important today.
- **P2:** important this week.
- **P3:** useful someday or backlog.

Rule:

Executive may downgrade priority when confidence is low. Executive should not upgrade priority without clear evidence or Tim instruction.

## Triage Mode

Triage mode is **Judgment**.

Executive moves low-risk items forward automatically, but pauses for high-risk, irreversible, external-facing, financial, system-level, identity-sensitive, or ministry-sensitive actions.

## Risk Levels

### Low

- internal-only
- reversible
- no money
- no external communication
- no system/config changes
- no sensitive personal data

### Medium

- shared docs
- calendar holds
- draft emails
- Notion updates
- categorization decisions
- reversible, but could confuse people if wrong

### High

- external communication
- spending money
- publishing
- production/config changes
- secrets/credentials
- legal or HR implications
- pastoral sensitivity
- financial consequences
- minors
- private family matters

Special rule:

Restored pastoral/staff-sensitive items are High risk by default.

This includes:

- pastoral care
- staff conflict
- HR-like issues
- member discipline
- confidential family details
- minors
- sensitive counseling
- church finances
- public church communication

## Approval Levels

### Auto

Executive can act without asking.

Examples:

- summarize
- classify
- tag
- extract tasks
- draft content
- research public info
- search local non-secret files
- create local notes/specs/plans
- update local queue metadata
- run safe read-only diagnostics
- prepare proposed changes without applying them

### Ask Before External

Executive can prepare, but must ask before:

- sending email/text
- contacting people
- posting
- publishing
- updating shared docs people rely on

### Ask Before Spend

Executive can research or draft, but must ask before:

- purchases
- subscriptions
- paid API usage
- paid transcription
- ad spend
- paid credits

### Ask Before System Change

Executive can inspect and propose, but must ask before:

- config changes
- restarts
- deploys
- permissions
- secrets
- production data changes
- launchd changes
- Docker changes
- cron changes

### Manual Only

Executive should not act directly. It can advise or prepare instructions.

## Prepare vs Execute Rule

Executive may prepare freely.

Executive may research, draft, plan, summarize, classify, and prepare next actions without asking. It must respect approval gates before external, financial, system, sensitive, or irreversible execution.

## Approval Workflow

Default approval is single-action approval.

Executive should present button-style options by default:

- Approve this action
- Hold
- Edit
- Manual only
- Broader approval

Rules:

- Approval applies only to the specific next action shown.
- Broader approval is valid only if Tim explicitly chooses or says it.
- Approval record must capture approved by, approved at, approved scope, approved action, channel, expiration if any, and notes.

## Domains

- AI Ops
- Restored
- Travel Multiplier
- Personal
- Finance
- Code
- Research
- Email
- Calendar
- Meetings
- Home
- Health

Family items go under Personal unless clearly Home, Calendar, Health, or Finance.

Domain decides context. Owner decides accountability.

## Owners

Owners are specific named owners only.

Allowed owners:

- Executive
- Restored COS
- TM COS
- Personal COS
- Coding Agent
- Research Agent
- Finance CFO
- Email Assistant
- Calendar Assistant
- Meeting Notes Agent
- Voice Lab
- Tim
- Human: [Name]

Rule:

Every queue item has exactly one accountable owner.

Supporting agents can be recorded later, but one owner is responsible.

## Owner Reassignment

During Triage, Executive may assign or reassign owner automatically.

No Tim approval needed.

After Triage, owner changes require Tim approval unless there is a clear operational reason:

- agent failure
- blocked access
- wrong domain
- duplicate item
- unavailable owner

Audit trail required:

- original owner
- new owner
- reason
- timestamp
- changed by

## Confidence

Confidence is Low, Medium, or High.

### High

Executive can clearly classify owner, risk, approval, and next action.

### Medium

Reasonable classification, but one or two assumptions.

### Low

Missing context or meaningful ambiguity.

Action rules:

- High confidence + Low risk + Auto approval can move from Triage to Queued automatically.
- High confidence + Medium risk + Ask Before External can move from Triage to Queued when the next action is internal prep.
- Medium confidence can move to Proposed or Blocked, depending on risk.
- Low confidence stays in Triage or Blocked with one clarifying question.

## Auto-Queue Rule

An item may move Triage → Queued automatically when:

- confidence is High
- next action is internal prep
- approval level is Auto or Ask Before External
- no immediate external action, spend, system change, or sensitive Restored/personal issue

Medium risk can auto-queue if the next action is internal prep.

## Source Types

- Voice Lab
- Telegram
- Email
- Calendar
- Meeting Notes
- Cron
- Manual
- Hermes Workspace
- Notion
- GitHub
- Monarch
- Google Drive

Every item stores:

- source type
- source ID
- source timestamp
- short excerpt
- full reference link/path

Queue item stays readable. Full context must be retrievable.

## Notion Sync

Only sync items after triage.

Sync to Notion when item becomes:

- Proposed
- Queued
- In Progress
- Blocked
- Done

Also sync High-risk Triage items if they need visibility or Tim approval.

### Local → Notion

- title
- outcome
- status
- priority
- domain
- owner
- risk level
- approval level
- confidence
- next action
- due date
- source type
- source excerpt
- result summary
- blocked reason
- local reference path

### Notion → Local

Safe fields only:

- status
- priority
- owner
- due date
- notes
- blocked reason

### Notion Display-Only

- risk level
- approval level
- confidence
- source type
- source excerpt
- local reference path

### Local-Only

- full transcript
- diagnostics
- raw logs
- execution internals
- audit trail
- sensitive context

Risk level and approval level are not editable from Notion. They can only be changed through Hermes Workspace or Executive tooling with audit trail.

## Queue Item Schema v0.1

```json
{
  "id": "eq_...",
  "title": "",
  "outcome": "",
  "status": "Triage",
  "priority": "P1",
  "domain": "AI Ops",
  "owner": "Executive",
  "riskLevel": "Low",
  "approvalLevel": "Auto",
  "confidence": "High",
  "source": {
    "type": "Voice Lab",
    "id": "",
    "timestamp": "",
    "excerpt": "",
    "fullReference": ""
  },
  "context": "",
  "constraints": [],
  "nextAction": "",
  "blockedReason": "",
  "resultSummary": "",
  "createdAt": "",
  "updatedAt": "",
  "dueAt": "",
  "completedAt": "",
  "completedBy": "",
  "auditTrail": [],
  "sync": {
    "notionPageId": "",
    "lastSyncedAt": "",
    "lastSyncStatus": "not_synced"
  }
}
```

## Triage Output Contract

Every triage pass must produce:

```json
{
  "title": "",
  "outcome": "",
  "domain": "Travel Multiplier",
  "owner": "TM COS",
  "priority": "P1",
  "riskLevel": "Medium",
  "approvalLevel": "Ask Before External",
  "confidence": "High",
  "nextAction": "Draft the webinar outline and offer bridge.",
  "autoQueue": true,
  "reasoning": "Internal prep only. External sending/publishing still requires approval."
}
```

## First MVP Implementation

Build local JSON first. Do not build Notion first.

MVP scope:

1. Local JSON queue store
   - create item
   - update item
   - list items
   - append audit event

2. Voice Lab → Queue
   - Send to Executive Queue creates a real queue item locally from the delegation object

3. Hermes Workspace Queue page
   - Triage
   - Active
   - Blocked
   - Done
   - item detail

4. Notion sync later
   - after local queue behavior is proven
   - sync only after triage

## Acceptance Criteria for MVP

- Voice Lab can create one real Executive Queue item locally.
- The item starts as Triage unless auto-queue criteria are satisfied.
- The queue item stores source excerpt and full local source reference.
- The queue item has exactly one accountable owner.
- The queue item includes risk, approval level, confidence, priority, next action, and audit trail.
- Hermes Workspace can list queue items by status.
- Moving an item to Done without result summary fails or converts to Blocked with reason.
- High-risk Restored pastoral/staff-sensitive items do not auto-queue.
- Tests cover queue item creation, auto-queue rule, Done rule, and source reference preservation.

## Implementation Notes

Use strict TDD for production code:

1. Write failing tests for schema validation and queue creation.
2. Implement minimal local JSON store.
3. Add Voice Lab queue creation endpoint.
4. Add Workspace queue UI after API behavior is verified.
5. Add Notion sync only after local behavior is stable.
