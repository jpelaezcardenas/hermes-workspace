# Hermes Momentum Cockpit Template

Use this when Chris asks "was ist heute dran?", "was soll Hermes als naechstes machen?", "was ist offen?" or when `HERMES_CONTROL_DAILY` needs a compact execution layer.

## Inputs

Read:

1. latest `/Users/zondrius/hermes-workspace/reports/decision-inbox/decision-inbox-YYYY-MM-DD.md`
2. latest `/Users/zondrius/hermes-workspace/reports/hermes-control/hermes-control-YYYY-MM-DD.md` if present
3. latest `/Users/zondrius/hermes-workspace/reports/hermes-control/handoff-janitor-YYYY-MM-DD.md` if present
4. latest `/Users/zondrius/hermes-workspace/reports/codex-handoff-scout/codex-handoff-scout-YYYY-MM-DD.md` if present
5. `/Users/zondrius/hermes-workspace/handoff/HANDOFF_OVERVIEW.md`
6. current `/Users/zondrius/hermes-workspace/handoff/codex-inbox/*.md`
7. current active `/Users/zondrius/hermes-workspace/memory/goals/*/GOAL.md`
8. cited product or project reports only when needed

## Rules

- At most 3 `Heute wirklich tun`.
- Exactly 1 `Naechster kleinster Slice`.
- Put risk, archive, install, publish, delete, job schedule, memory policy and external action into `Wartet auf Chris`.
- Open Codex handoffs beat new handoffs.
- Active goals beat fresh ideas.
- Product-/Unterrichtswirkung beats tool curiosity.
- Every claim needs a source path.
- Do not invent status.
- If sources conflict, prefer the newer file that directly owns the status. Example: `HANDOFF_OVERVIEW.md` and latest Janitor beat an older Hermes Control count for open handoffs.

## Bucket Rules

### Heute wirklich tun

Use only if all are true:

- local and safe;
- no install, publish, delete, purchase, external account or token;
- no private or sensitive student data;
- doable or checkable in 15-45 minutes;
- has a source and done condition;
- does not create a new queue while older open handoffs remain.

### Wartet auf Chris

Use if any are true:

- archive decision;
- permanent workflow or cron change;
- memory/provider policy;
- external tool integration;
- purchase, publish, delete, install or push;
- product direction decision.

### Codex offen

Use for:

- every file in `/Users/zondrius/hermes-workspace/handoff/codex-inbox/`;
- missing or unmatched outbox result;
- stale or duplicated handoff.

### Gewonnen diese Woche

Use only when a report, outbox, screenshot, build/test note or local artifact proves the win.

### Nicht anfassen

Use for tempting work that would widen scope, duplicate an open handoff, or bypass a Chris decision.

## Output Contract

```markdown
# Hermes Momentum Cockpit - YYYY-MM-DD

Signal: Green / Yellow / Red
Fokus: one sentence

## Heute wirklich tun

1. Action:
   Owner:
   Timebox:
   Source:
   Done when:

## Wartet auf Chris

- Decision:
  Why Chris:
  Risk:
  Source:

## Codex offen

- Handoff:
  Status:
  Next:
  Source:

## Gewonnen diese Woche

- Win:
  Why it matters:
  Proof:

## Nicht anfassen

- Item:
  Reason:

## Wirkungslogbuch

- Unterrichtswirkung:
- Produktwirkung:
- Systemwirkung:
- Noch nicht bewiesen:

## Naechster kleinster Slice

Action:
Why this:
Acceptance:
Should become Codex handoff: yes/no

## Belege

- path
```

## Promotion Rule

Keep this template inside the goal folder until two manual cockpit reports are useful. Only then copy or graduate it into durable workflow memory.
