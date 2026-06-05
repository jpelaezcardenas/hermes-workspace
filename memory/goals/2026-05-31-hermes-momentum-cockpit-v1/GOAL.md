# Goal: Hermes Momentum Cockpit v1

Status: v1-manual-complete
Start: 2026-05-31
Owner: Chris / Neva
Mode: Direct first, Codex-Handoff only for a small implementation slice

## Leitentscheidung

Hermes braucht als naechstes nicht mehr Agenten, mehr Reports oder mehr Scouting. Hermes braucht eine ruhige Umsetzungsschicht, die jeden Tag aus den vorhandenen Signalen genau die naechsten handhabbaren Schritte macht.

Dieses Goal baut deshalb ein `Hermes Momentum Cockpit v1`: ein lokales, textbasiertes Tages-Cockpit mit spaeterer UI-Option. Es liest nicht alles neu, sondern ordnet vorhandene Artefakte:

- Decision Inbox
- Hermes Control
- Codex-Handoff Inbox/Outbox
- aktive `memory/goals`
- aktuelle Produkt-/Unterrichtsreports
- Risiko-/Nicht-Tun-Regeln

Das Cockpit zeigt jeden Tag in einer kleinen, konsequent begrenzten Form:

1. Heute wirklich tun
2. Wartet auf Chris
3. Codex offen
4. Gewonnen diese Woche
5. Nicht anfassen
6. Naechster kleinster Slice

## Warum dieses Goal perfekt zu Chris' Setup passt

Chris' Hermes ist bereits stark in:

- Ideenfindung;
- GitHub-/Tool-Scouting;
- GE-/Lernwerkstatt-Qualitaet;
- Handoff an Codex;
- Decision Inbox;
- Memory- und Sicherheitsregeln;
- Produktklarheit fuer Schulwerkstatt, LeseWerk, GE-Lernwerkstatt und Spielraum.

Die Luecke ist nicht Erkenntnis. Die Luecke ist Reibung zwischen Erkenntnis und Ausfuehrung:

- Reports entstehen, aber konkurrieren um Aufmerksamkeit.
- Handoffs entstehen, aber offene und erledigte Arbeit muss bewusst verfolgt werden.
- `CHRIS_ENTSCHEIDET` bleibt wichtig, kann aber als Stapel wachsen.
- Produkt- und Unterrichtswirkung wird sichtbar, aber noch nicht als Wochenfortschritt verdichtet.
- Neue Ideen sind stark, aber koennen laufende kleine Slices ueberdecken.

Das Momentum Cockpit loest genau diese Luecke. Es ist der Tagesfilter, der sagt: Das ist heute dran, das braucht Chris, das ist offen, das ist gewonnen, das wird bewusst nicht angefasst.

## /goal Prompt

/goal Build `Hermes Momentum Cockpit v1` as a controlled local execution layer for Chris' Hermes setup. The goal is not to create another broad dashboard, not to add new agents, and not to start a big UI project. The goal is to turn existing Hermes reports, Decision Inbox blocks, handoffs, active goals and product reports into one small daily cockpit that helps Chris move from signal to action.

Context:
- Hermes Workspace: `/Users/zondrius/hermes-workspace`
- Goal folder: `/Users/zondrius/hermes-workspace/memory/goals/2026-05-31-hermes-momentum-cockpit-v1`
- Decision Inbox reports: `/Users/zondrius/hermes-workspace/reports/decision-inbox/`
- Hermes Control reports: `/Users/zondrius/hermes-workspace/reports/hermes-control/`
- Codex handoff overview: `/Users/zondrius/hermes-workspace/handoff/HANDOFF_OVERVIEW.md`
- Codex inbox: `/Users/zondrius/hermes-workspace/handoff/codex-inbox/`
- Codex outbox: `/Users/zondrius/hermes-workspace/handoff/codex-outbox/`
- Codex archive: `/Users/zondrius/hermes-workspace/handoff/archive/`
- Active goals: `/Users/zondrius/hermes-workspace/memory/goals/`
- Product clarity signal: `/Users/zondrius/hermes-workspace/reports/productklarheit-v1-ceo-synthesis-2026-05-31.md`
- Current job map: `/Users/zondrius/Documents/New project 6/hermes-jobs-overview.md`
- Integration cockpit: `/Users/zondrius/Documents/New project 6/hermes-integration-cockpit.md`

Build the smallest useful v1:
1. Define a stable cockpit output format.
2. Create one hand-written baseline cockpit report from the latest available sources.
3. Create a repeatable prompt/template so Hermes can regenerate it daily.
4. Create a narrow Codex implementation handoff only if a script or UI bridge is genuinely needed.
5. Do not create a new permanent cronjob until the manual v1 has been useful at least twice.

The cockpit must always include:
- `Heute wirklich tun`: maximum 3 items, each with owner, timebox, source and acceptance check.
- `Wartet auf Chris`: decisions only Chris can make, grouped by risk.
- `Codex offen`: open inbox handoffs and whether they are ready, blocked or stale.
- `Gewonnen diese Woche`: completed changes or quality wins backed by files.
- `Nicht anfassen`: explicit anti-scope list for today.
- `Naechster kleinster Slice`: exactly one best next action.
- `Belege`: exact source files.

Strict rules:
- No real student names, diagnoses, parent data or sensitive personal data.
- No new external services.
- No installs, commits, pushes, deletes or public sharing.
- No new agent profiles.
- No new long-running cronjob in v1.
- No broad web UI unless the markdown/report v1 proves useful.
- No automatic archiving without explicit rule match or Chris decision.
- No automatic conversion of every idea into a Codex handoff.
- `SOFORT_MACHEN` remains capped: at most one action that Hermes/Codex should execute without Chris.
- Anything with install, purchase, publication, external account, token, deletion, private data or structural workflow change goes to `CHRIS_ENTSCHEIDET`.

Expected final deliverables:
- `GOAL.md` and `EXECUTE_PLAN.md` in this goal folder.
- A first cockpit report at `/Users/zondrius/hermes-workspace/reports/hermes-control/hermes-momentum-cockpit-YYYY-MM-DD.md`.
- A reusable prompt/template at `/Users/zondrius/hermes-workspace/memory/workflows/hermes-momentum-cockpit-template.md` or inside this goal folder if the workflow is not yet stable enough for memory.
- A short validation report proving that the cockpit used real current files and did not invent status.
- Optional: one small Codex handoff for a script only after the manual report format is validated.

## In Scope

### Source reading

Read only the most relevant current files:

- latest Decision Inbox report;
- latest Hermes Control report;
- latest Codex Handoff Scout report;
- `HANDOFF_OVERVIEW.md`;
- current files in `handoff/codex-inbox`;
- current files in `handoff/codex-outbox`;
- active goal `GOAL.md` and `EXECUTE_PLAN.md` files;
- latest Productklarheit / LeseWerk / GE reports only when they are cited by the latest control or decision files.

### Classification

Every candidate signal must be assigned to exactly one bucket:

- `Heute wirklich tun`
- `Wartet auf Chris`
- `Codex offen`
- `Gewonnen diese Woche`
- `Nicht anfassen`
- `Spaeter / Beobachten`
- `Verworfen fuer heute`

No item may appear as both `Heute wirklich tun` and `Wartet auf Chris`.

### Output discipline

The cockpit is intentionally small:

- no more than 3 `Heute wirklich tun` items;
- exactly 1 `Naechster kleinster Slice`;
- no more than 7 `Wartet auf Chris` decisions;
- each action has a timebox;
- every claim has a file path;
- every action has a done condition.

### Wirkungslogbuch

The cockpit must include a small impact section:

- `Unterrichtswirkung`: what helps real GE planning/material/workflow?
- `Produktwirkung`: what improves Schulwerkstatt/LeseWerk/Spielraum clarity?
- `Systemwirkung`: what improves Hermes/Codex reliability?
- `Noch nicht bewiesen`: what sounds good but has no proof yet?

This prevents Hermes from confusing report volume with progress.

## Out of Scope

- No full dashboard application in v1.
- No database.
- No user accounts.
- No cloud sync.
- No analytics.
- No automatic prioritization based on hidden scores.
- No permanent cron change before manual validation.
- No changes to child-facing LeseWerk, GE-Lernwerkstatt or Spielraum code.
- No new agent role.
- No global rewrite of jobs.
- No direct modification of `jobs.json` in v1.

## Success Criteria

The v1 is successful when:

- Chris can read one cockpit report in under 3 minutes.
- The report makes the next action obvious.
- It reduces open-loop anxiety instead of adding another report to check.
- It cites exact source files.
- It does not duplicate Decision Inbox; it compresses it into action.
- It catches open Codex handoffs.
- It separates `Chris decision` from `safe execution`.
- It names at least one real weekly win.
- It contains a clear `Nicht anfassen` list.
- It recommends exactly one next slice.
- It can be regenerated manually with the template.

## Failure Criteria

Stop or revise if:

- the cockpit becomes longer than the reports it summarizes;
- it recommends more than 3 actions for the day;
- it creates new handoffs while older safe handoffs are still open without explanation;
- it hides risk decisions in `SOFORT_MACHEN`;
- it invents status not backed by files;
- it requires a UI before the markdown format is useful;
- it becomes another idea generator instead of an execution filter.

## Cockpit Output Contract

Every cockpit report must use this exact skeleton:

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

## Prioritaetslogik

Use this order:

1. Safety and blocked work first.
2. Open Codex handoffs before new Codex handoffs.
3. Active goals before fresh ideas.
4. Product-/Unterrichtswirkung before tool curiosity.
5. Manual validation before automation.
6. One small execution slice before any broad planning.

## Decision Rules

### Put into `Heute wirklich tun` only if all are true

- locally executable;
- no external account/action;
- no private/sensitive student data;
- no install or dependency change;
- can be completed or checked in 15-45 minutes;
- has a clear done condition;
- does not conflict with an open higher-priority handoff.

### Put into `Wartet auf Chris` if any are true

- requires deletion, archive decision or permanent workflow change;
- requires install, purchase, subscription or external connection;
- touches private/sensitive data;
- changes job schedule or memory policy;
- changes product direction;
- publishes or sends anything externally.

### Put into `Codex offen` if

- a file exists in `handoff/codex-inbox`;
- an outbox result is missing, unmatched or awaiting review;
- a handoff is stale or duplicated.

### Put into `Gewonnen diese Woche` if

- there is a report, outbox result, screenshot, test result or committed local artifact proving it.

### Put into `Nicht anfassen` if

- it is tempting but would broaden scope;
- it is blocked by a Chris decision;
- it competes with open work;
- it is useful later but not needed for today's next slice.

## First v1 Recommendation

For the first cockpit report, use the current known status:

- open Codex inbox contains:
  - `codex-handoff-2026-05-28-ge-spielraum-schmale-viewport.md`
  - `codex-handoff-2026-05-31-ge-minikisten-checkliste.md`
- latest Janitor report says inbox remains Yellow with 2 open handoffs.
- Productklarheit v1 says Schulwerkstatt/LeseWerk integration is stable and tests were green in the cited synthesis.
- Current best product next goals include URL deep-linking, Materialkorb integration, Observation Bridge, Spielraum Generator update and Mini Local Storage.
- Decision Inbox still has Chris decisions around archive candidates, codegraph P2 and agentmemory/Codex P4.

Therefore the first cockpit should not create a new broad implementation project. It should recommend one of:

1. finish/review the open GE-Minikisten handoff;
2. finish/review the open schmale-Viewport handoff;
3. produce a no-code Materialkorb/Observation-Bridge slice spec only if both handoffs are not executable today.

Preferred first next slice:

`Codex offen zuerst`: resolve or complete the two open handoffs before creating a new product slice.

## Stable Name

Use this phrase consistently:

`Hermes Momentum Cockpit`

Avoid alternate names like CEO Dashboard, Action Hub, Control Tower 2, Command Center or Daily Ops unless Chris explicitly renames it. Hermes already has Control Tower language; this goal adds a smaller execution cockpit, not a replacement.
