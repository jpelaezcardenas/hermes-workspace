# Goal: Hermes Classroom-Ready Pilotpaket v1

Status: approved-for-classroom-smoke
Start: 2026-06-01
Owner: Chris / Neva
Mode: CEO-geführter Unterrichtsnutzen-Slice, keine Tool-Integration

## Leitentscheidung

Hermes soll als naechstes nicht mehr neue Tools, mehr Agenten oder mehr Reports erzeugen. Hermes soll zeigen, dass die vorhandenen Signale in echten Unterrichtsnutzen uebersetzt werden koennen.

Dieses Goal baut deshalb ein `Classroom-Ready Pilotpaket v1`: eine kleine, morgen nutzbare GE-Unterrichtseinheit mit Material, Ablauf, Hilfe, Beobachtung und naechstem Verbesserungsschritt.

## Warum jetzt

Die operative Lage ist sauber genug:

- Die Codex-Inbox ist leer.
- Handoff-Archivierung ist geordnet.
- `codegraph` P2 und agentmemory/Codex P4 sind nicht als neue Baustelle freigegeben.
- Hermes Execution Layer zeigt, dass die naechste Wirkung nicht in neuer Infrastruktur liegt.
- GE-Spielraum-Qualitaet bleibt das naheliegende Produkt-/Unterrichtsfeld.

Jetzt soll Hermes Wirkung beweisen: weniger Systempflege, mehr direkt nutzbarer Unterricht.

## Zielbild

Am Ende gibt es ein kleines Pilotpaket, das eine Lehrkraft in unter 5 Minuten verstehen und in 20-30 Minuten ausprobieren kann.

Das Paket beantwortet:

1. Was liegt auf dem Tisch?
2. Was macht das Kind zuerst?
3. Welche Hilfe gibt es, wenn es stockt?
4. Was beobachtet die Lehrkraft?
5. Woran erkennt Hermes danach, was der naechste kleinste bessere Schritt ist?

## /goal Prompt

/goal Build `Hermes Classroom-Ready Pilotpaket v1` as a small CEO-monitored Unterrichtsnutzen slice. Create one GE-ready pilot package for the next Monday using only existing local Hermes, GE-Lernwerkstatt and LeseWerk reports. The result must be practical enough to use tomorrow: material list, 20-30 minute flow, child action, teacher observation, three UK/help signals, narrow viewport or table-readiness note, observation sheet, and exactly one next improvement slice. Do not add tools, do not install anything, do not start a broad feature, do not use external sources, and do not touch personal student, parent or diagnosis data.

## In Scope

- Choose one GE-friendly mini-context from existing local reports and weekly plans.
- Prefer the already mentioned GE-Minikisten / Mengen-legen / Materialkorb bridge if they fit.
- Produce one compact classroom package.
- Include a teacher-facing observation sheet.
- Include a child-facing action sequence in simple language.
- Include exactly three UK/help signals.
- Include a table/material readiness check.
- Include a narrow viewport note only if digital use is part of the selected package.
- Include one next mini-slice after the pilot.

## Out of Scope

- No new tool integration.
- No `codegraph`.
- No agentmemory/Codex expansion.
- No new cronjob.
- No installs.
- No commits or pushes unless Chris asks after review.
- No code changes in v1 unless a tiny typo or link correction blocks the package.
- No external sources.
- No student, parent, diagnosis, finance or private personal data.
- No new broad GE curriculum.
- No multiple pilot packages in the first pass.

## Success Criteria

The goal succeeds when these files exist and are internally consistent:

- `GOAL.md`
- `EXECUTE_PLAN.md`
- `CEO_MONITORING.md`
- one pilot package report under `reports/hermes-control/`
- one CEO decision report that says `einsetzen`, `kuerzen` or `parken`

The pilot package itself succeeds when:

- a teacher can read it in under 5 minutes;
- it can be run in 20-30 minutes;
- the material list is concrete and small;
- the child path has at most 5 steps;
- the teacher observation sheet has at most 5 questions;
- the three UK/help signals are explicit;
- every claim points to a local source or is marked as a practical design decision;
- the next slice is exactly one action, not a list of ideas.

## CEO Gates

### Gate 1: Scope

Passes only if the package is one pilot, not a product roadmap.

### Gate 2: Safety

Passes only if no sensitive personal data, no external sources and no new tools are used.

### Gate 3: Classroom Use

Passes only if the output can be put on a table tomorrow without more system work.

### Gate 4: Learning Loop

Passes only if observation leads to exactly one next improvement slice.

## Abbruchkriterien

Stop or split if:

- the task becomes a full curriculum;
- it needs code changes before the package exists;
- it starts comparing or installing tools;
- it needs real student information;
- the observation sheet becomes diagnostic or score-like;
- the package is not usable without reading many reports.

## Erwartete Dateien

- `/Users/zondrius/hermes-workspace/memory/goals/2026-06-01-hermes-classroom-ready-pilotpaket-v1/GOAL.md`
- `/Users/zondrius/hermes-workspace/memory/goals/2026-06-01-hermes-classroom-ready-pilotpaket-v1/EXECUTE_PLAN.md`
- `/Users/zondrius/hermes-workspace/memory/goals/2026-06-01-hermes-classroom-ready-pilotpaket-v1/CEO_MONITORING.md`
- `/Users/zondrius/hermes-workspace/reports/hermes-control/hermes-classroom-ready-pilotpaket-v1-2026-06-01.md`
- `/Users/zondrius/hermes-workspace/reports/hermes-control/hermes-classroom-ready-pilotpaket-ceo-decision-2026-06-01.md`
