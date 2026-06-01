# Execute Plan: Hermes Momentum Cockpit v1

> Purpose: Build the smallest useful execution layer for Hermes. Start with a manual markdown cockpit and a reusable template. Only automate after the format proves useful.

## File Map

Create:

- `/Users/zondrius/hermes-workspace/memory/goals/2026-05-31-hermes-momentum-cockpit-v1/GOAL.md`
- `/Users/zondrius/hermes-workspace/memory/goals/2026-05-31-hermes-momentum-cockpit-v1/EXECUTE_PLAN.md`
- `/Users/zondrius/hermes-workspace/reports/hermes-control/hermes-momentum-cockpit-2026-05-31.md`
- `/Users/zondrius/hermes-workspace/memory/goals/2026-05-31-hermes-momentum-cockpit-v1/hermes-momentum-cockpit-template.md`
- `/Users/zondrius/hermes-workspace/memory/goals/2026-05-31-hermes-momentum-cockpit-v1/VALIDATION.md`

Do not modify in v1:

- `/Users/zondrius/.hermes/profiles/neva/cron/jobs.json`
- `/Users/zondrius/hermes-workspace/src/**`
- `/Users/zondrius/hermes-workspace/projects/**`
- `/Users/zondrius/hermes-workspace/handoff/archive/**`
- `/Users/zondrius/hermes-workspace/handoff/codex-inbox/**`
- `/Users/zondrius/hermes-workspace/handoff/codex-outbox/**`

Potential v2 only:

- `/Users/zondrius/hermes-workspace/scripts/hermes-momentum-cockpit.mjs`
- `/Users/zondrius/hermes-workspace/scripts/hermes-momentum-cockpit.test.mjs`
- a small WebUI card in the Hermes workspace

## Task 0: Guardrail Before Any Work

- [ ] Confirm the task is v1 manual/report only.
- [ ] Confirm no code, cron, archive, install, delete, push or deploy will happen.
- [ ] Confirm the output should be a cockpit report and reusable template.
- [ ] If the worker feels tempted to build a dashboard UI, stop and write the UI idea under `Spaeter`.

Expected result:

```text
Proceed with manual Momentum Cockpit v1. No automation or UI in this iteration.
```

## Task 1: Read Current Source Files

Read these files first:

- `/Users/zondrius/hermes-workspace/reports/decision-inbox/decision-inbox-2026-05-28.md`
- `/Users/zondrius/hermes-workspace/reports/codex-handoff-scout/codex-handoff-scout-2026-05-31.md`
- `/Users/zondrius/hermes-workspace/reports/hermes-control/handoff-janitor-2026-05-31.md`
- `/Users/zondrius/hermes-workspace/reports/productklarheit-v1-ceo-synthesis-2026-05-31.md`
- `/Users/zondrius/hermes-workspace/handoff/HANDOFF_OVERVIEW.md`
- every file currently in `/Users/zondrius/hermes-workspace/handoff/codex-inbox/`

Then read only if needed:

- latest matching outbox result for any open handoff;
- active goal `GOAL.md` and `EXECUTE_PLAN.md` files;
- latest project report cited by a source above.

- [ ] Record the exact source files in `VALIDATION.md`.
- [ ] For each source, extract only:
  - action candidates;
  - Chris decisions;
  - open handoffs;
  - completed wins;
  - explicit no-go/safety rules;
  - proof paths.

Do not summarize whole reports. The cockpit is an execution filter, not another long digest.

## Task 2: Build the Candidate Table

Create a scratch table inside `VALIDATION.md` with this structure:

```markdown
| Candidate | Bucket | Source | Why | Risk | Done condition |
|---|---|---|---|---|---|
| Finish GE-Minikisten checklist handoff | Codex offen | handoff/codex-inbox/codex-handoff-2026-05-31-ge-minikisten-checkliste.md | Open inbox item from latest scout | Low | Outbox result exists and report is reviewable |
| Review schmale viewport handoff | Codex offen | handoff/codex-inbox/codex-handoff-2026-05-28-ge-spielraum-schmale-viewport.md | Open inbox item from Janitor | Low | Outbox result exists or blocker is explicit |
| Decide archive candidates | Wartet auf Chris | decision-inbox-2026-05-28.md | Archive is a deliberate decision | Medium | Chris says archive yes/no |
| codegraph P2 | Wartet auf Chris | decision-inbox-2026-05-28.md | Tool integration/risk gate | Medium | Chris approves or declines P2 |
| agentmemory/Codex P4 | Wartet auf Chris | decision-inbox-2026-05-28.md | Durable integration policy | Medium | Chris approves or keeps MCP-only |
| Productklarheit v1 integrated | Gewonnen diese Woche | productklarheit-v1-ceo-synthesis-2026-05-31.md | Schulwerkstatt/LeseWerk clarity improved | Low | Recorded as win, not new action |
| Start new UI dashboard | Nicht anfassen | this goal | Too broad for v1 | High | Parked until manual report proves useful |
```

- [ ] Add any missing current candidates from the actual files.
- [ ] Remove candidates that are not backed by a file.
- [ ] Ensure each candidate appears in only one bucket.

## Task 3: Select Today's Actions

Use this exact selection filter:

1. Are there open Codex inbox handoffs?
2. Is any open handoff safe, local and small?
3. Is there a Chris decision blocking progress?
4. Is there a product/unterricht action that is smaller than resolving open handoffs?
5. Would starting a new thing increase open-loop load?

Expected first decision for 2026-05-31:

```text
Do not create a new product implementation slice today.
First resolve or review the two open Codex inbox handoffs.
```

For `Heute wirklich tun`, choose at most 3 items. Recommended v1:

1. Review/complete `ge-minikisten-checkliste` handoff.
2. Review/complete `ge-spielraum-schmale-viewport` handoff.
3. Draft first Momentum Cockpit report from current files.

If only one item should be executed, choose:

```text
Draft first Momentum Cockpit report from current files, because it clarifies whether the two open handoffs should be worked before new slices.
```

## Task 4: Write First Cockpit Report

Create:

`/Users/zondrius/hermes-workspace/reports/hermes-control/hermes-momentum-cockpit-2026-05-31.md`

Use this exact content structure:

```markdown
# Hermes Momentum Cockpit - 2026-05-31

Signal: Yellow
Fokus: Offene Codex-Handoffs klaeren, bevor neue Produkt-Slices gestartet werden.

## Heute wirklich tun
1. Action: Ersten Momentum-Cockpit-Bericht finalisieren.
   Owner: Hermes/Neva
   Timebox: 20 Minuten
   Source: `/Users/zondrius/hermes-workspace/memory/goals/2026-05-31-hermes-momentum-cockpit-v1/GOAL.md`
   Done when: Bericht liegt unter `reports/hermes-control/` und nennt genau einen naechsten kleinsten Slice.

2. Action: Offenen Handoff `ge-minikisten-checkliste` pruefen oder bearbeiten lassen.
   Owner: Codex oder Chris zur Freigabe
   Timebox: 30-45 Minuten
   Source: `/Users/zondrius/hermes-workspace/handoff/codex-inbox/codex-handoff-2026-05-31-ge-minikisten-checkliste.md`
   Done when: Eine Outbox-Rueckgabe existiert oder ein konkreter Blocker steht im Cockpit.

3. Action: Offenen Handoff `ge-spielraum-schmale-viewport` pruefen oder bearbeiten lassen.
   Owner: Codex oder Chris zur Freigabe
   Timebox: 30-45 Minuten
   Source: `/Users/zondrius/hermes-workspace/handoff/codex-inbox/codex-handoff-2026-05-28-ge-spielraum-schmale-viewport.md`
   Done when: Eine Outbox-Rueckgabe existiert oder ein konkreter Blocker steht im Cockpit.

## Wartet auf Chris
- Decision: Archivierung bereits abgeschlossener Handoff-Paare.
  Why Chris: Archivierung ist eine bewusste Ordnungsentscheidung.
  Risk: Low/Medium
  Source: `/Users/zondrius/hermes-workspace/reports/decision-inbox/decision-inbox-2026-05-28.md`

- Decision: codegraph P2-Sandbox.
  Why Chris: Tool-Integration mit RiskGate.
  Risk: Medium
  Source: `/Users/zondrius/hermes-workspace/reports/decision-inbox/decision-inbox-2026-05-28.md`

- Decision: agentmemory/Codex P4 dauerhaft freigeben oder MCP-only behalten.
  Why Chris: Dauerhafte Memory-/Codex-Policy.
  Risk: Medium
  Source: `/Users/zondrius/hermes-workspace/reports/decision-inbox/decision-inbox-2026-05-28.md`

## Codex offen
- Handoff: `codex-handoff-2026-05-28-ge-spielraum-schmale-viewport.md`
  Status: Open
  Next: Bearbeiten oder explizit blockieren.
  Source: `/Users/zondrius/hermes-workspace/reports/hermes-control/handoff-janitor-2026-05-31.md`

- Handoff: `codex-handoff-2026-05-31-ge-minikisten-checkliste.md`
  Status: Open
  Next: Bearbeiten oder explizit blockieren.
  Source: `/Users/zondrius/hermes-workspace/reports/codex-handoff-scout/codex-handoff-scout-2026-05-31.md`

## Gewonnen diese Woche
- Win: Productklarheit v1 verbindet Schulwerkstatt und LeseWerk klarer.
  Why it matters: Lehrkraft erkennt Start, Modulrolle und naechsten Schritt schneller.
  Proof: `/Users/zondrius/hermes-workspace/reports/productklarheit-v1-ceo-synthesis-2026-05-31.md`

- Win: Handoff-Janitor meldet keine automatische Archivierung und zwei klar offene Handoffs.
  Why it matters: Offene Arbeit ist sichtbar statt diffus.
  Proof: `/Users/zondrius/hermes-workspace/reports/hermes-control/handoff-janitor-2026-05-31.md`

## Nicht anfassen
- Item: Neues grosses Dashboard/UI fuer Momentum Cockpit.
  Reason: Erst muss das Markdown-Cockpit zweimal nuetzlich sein.

- Item: Neue Cronjobs fuer Momentum Cockpit.
  Reason: V1 ist manuell; Automatisierung erst nach Validierung.

- Item: Neue GitHub-/Tool-Integrationen.
  Reason: codegraph P2 und agentmemory/Codex P4 warten auf Chris.

- Item: Neue Produkt-Slices parallel zu offenen Handoffs.
  Reason: Open-loop load zuerst senken.

## Wirkungslogbuch
- Unterrichtswirkung: GE-Minikisten koennen Wochenplan und Materialvorbereitung direkt verbessern.
- Produktwirkung: Productklarheit v1 hat Schulwerkstatt/LeseWerk-Verbindung gestaerkt; neue Produkt-Slices warten.
- Systemwirkung: Momentum Cockpit macht offene Handoffs und Chris-Entscheidungen sichtbar.
- Noch nicht bewiesen: Ob ein automatisches Cockpit-Script noetig ist.

## Naechster kleinster Slice
Action: Einen der zwei offenen Codex-Handoffs abschliessen oder sauber blockieren, bevorzugt `ge-minikisten-checkliste`.
Why this: Er ist aktuell, lokal, klein und direkt unterrichtsnah.
Acceptance: Outbox-Ergebnis oder expliziter Blocker liegt vor; Cockpit wird danach aktualisiert.
Should become Codex handoff: no, already exists.

## Belege
- `/Users/zondrius/hermes-workspace/reports/decision-inbox/decision-inbox-2026-05-28.md`
- `/Users/zondrius/hermes-workspace/reports/codex-handoff-scout/codex-handoff-scout-2026-05-31.md`
- `/Users/zondrius/hermes-workspace/reports/hermes-control/handoff-janitor-2026-05-31.md`
- `/Users/zondrius/hermes-workspace/reports/productklarheit-v1-ceo-synthesis-2026-05-31.md`
- `/Users/zondrius/hermes-workspace/handoff/codex-inbox/codex-handoff-2026-05-28-ge-spielraum-schmale-viewport.md`
- `/Users/zondrius/hermes-workspace/handoff/codex-inbox/codex-handoff-2026-05-31-ge-minikisten-checkliste.md`
```

- [ ] Adjust the report only where actual source files prove a different status.
- [ ] Do not add uncited claims.

## Task 5: Create Reusable Template

Create:

`/Users/zondrius/hermes-workspace/memory/goals/2026-05-31-hermes-momentum-cockpit-v1/hermes-momentum-cockpit-template.md`

Template content:

```markdown
# Hermes Momentum Cockpit Template

Use this when Chris asks "was ist heute dran?", "was soll Hermes als naechstes machen?", "was ist offen?" or when `HERMES_CONTROL_DAILY` needs a compact execution layer.

## Inputs

Read:
1. latest `/reports/decision-inbox/decision-inbox-YYYY-MM-DD.md`
2. latest `/reports/hermes-control/hermes-control-YYYY-MM-DD.md` if present
3. latest `/reports/hermes-control/handoff-janitor-YYYY-MM-DD.md` if present
4. latest `/reports/codex-handoff-scout/codex-handoff-scout-YYYY-MM-DD.md` if present
5. `/handoff/HANDOFF_OVERVIEW.md`
6. current `/handoff/codex-inbox/*.md`
7. current active `/memory/goals/*/GOAL.md`
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

## Output

[Use the Cockpit Output Contract from GOAL.md.]
```

- [ ] Keep the template in the goal folder for now.
- [ ] Do not copy it into global memory until the first two cockpit reports are useful.

## Task 6: Validation Report

Create:

`/Users/zondrius/hermes-workspace/memory/goals/2026-05-31-hermes-momentum-cockpit-v1/VALIDATION.md`

Include:

```markdown
# Validation - Hermes Momentum Cockpit v1

Date: 2026-05-31

## Source Files Read
- path

## Claims Checked
| Claim | Source | Result |
|---|---|---|

## Scope Check
- No code changed: yes/no
- No cron changed: yes/no
- No archive changed: yes/no
- No handoff moved/deleted: yes/no
- No external action: yes/no

## Output Check
- At most 3 Heute wirklich tun: yes/no
- Exactly 1 Naechster kleinster Slice: yes/no
- Chris decisions separated: yes/no
- Open handoffs visible: yes/no
- Nicht anfassen included: yes/no
- Belege included: yes/no

## Recommendation
- Keep manual only / create script / create UI card / revise format
```

- [ ] Fill every yes/no with actual result.
- [ ] If any answer is no, do not promote template.

## Task 7: Decide Whether to Automate

After two manual cockpit reports:

- [ ] Compare whether Chris actually used them.
- [ ] If they are too long, shorten before automating.
- [ ] If they are useful but repetitive, create a Codex handoff for a script.
- [ ] If they are not useful, stop the goal and keep only the Decision Inbox.

Automation criteria:

- report can be generated from file paths without guessing;
- buckets are stable;
- no private data is needed;
- output stays short;
- Chris confirms it reduces friction.

If automation is approved, create a separate Codex handoff:

```text
Build a local `scripts/hermes-momentum-cockpit.mjs` that reads latest existing reports and generates a markdown cockpit. No UI, no cron, no deletes, no external calls. Include tests for bucket classification and source-path citation.
```

Do not implement this script inside v1 unless Chris explicitly asks.

## Task 8: Acceptance Gate

The goal is complete for v1 when all are true:

- [ ] `GOAL.md` exists.
- [ ] `EXECUTE_PLAN.md` exists.
- [ ] first cockpit report exists.
- [ ] reusable template exists.
- [ ] validation report exists.
- [ ] no code changed.
- [ ] no cron changed.
- [ ] no handoff archived, deleted or moved.
- [ ] report names exactly one next smallest slice.
- [ ] report is short enough for Chris to read in under 3 minutes.

## Final Message Template

When done, report:

```text
Hermes Momentum Cockpit v1 is drafted.

Created:
- GOAL.md
- EXECUTE_PLAN.md
- first cockpit report
- template
- validation

Recommended next action:
Finish or block the open GE-Minikisten handoff before starting new product slices.
```
