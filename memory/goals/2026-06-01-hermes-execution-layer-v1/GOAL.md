# Goal: Hermes Execution Layer v1

Status: draft-ready-for-review
Start: 2026-06-01
Owner: Chris / Neva / Codex
Mode: Plan first, then small local implementation slices

## Leitentscheidung

Hermes soll nicht noch mehr parallele Jobs, Agenten oder Reports bekommen. Hermes soll die Dinge, die bereits laufen, zu einer ruhigen Umsetzungsschicht verbinden.

Der Zweck dieses Goals ist:

```text
Aus vorhandenen Hermes-Signalen wird jeden Tag ein klares Arbeitsbild:
Was ist heute dran?
Was wartet auf Chris?
Was ist bei Codex offen?
Was wurde gewonnen?
Was wird bewusst nicht angefasst?
Was ist genau der naechste kleinste Slice?
```

## Warum dieses Goal jetzt richtig ist

Hermes hat bereits starke Bausteine:

- Decision Inbox fuer Entscheidungsbloecke.
- Hermes Control Daily als Tagesuebersicht.
- Codex Handoff Scout fuer sichere Codex-Aufgaben.
- Handoff Janitor fuer offene und erledigte Handoffs.
- Momentum Cockpit v1 als manuelles Tages-Cockpit.
- Teacher Nextday, Wochenplan GE, Testpilot, Material Scout und LeseWerk Quality fuer Schule/GE.
- GitHub Scout und RiskGate fuer Tool-Ideen.
- Memory Curator fuer dauerhaftes Wissen.
- Dashboard, Jobs, Memory Browser, Skills Browser, Files und Terminal im Hermes Workspace.

Die Luecke ist nicht Funktion. Die Luecke ist Verbindung:

- Reports entstehen, aber Chris muss sie geistig zusammenhalten.
- Offene Handoffs koennen neue Ideen blockieren.
- `CHRIS_ENTSCHEIDET` braucht eine klare, kurze Liste.
- Memory soll wachsen, aber nicht zugemuellt werden.
- Produkt-, Schul- und Systemarbeit konkurrieren um Aufmerksamkeit.

Dieses Goal baut deshalb eine Execution Layer, die vorhandene Signale sortiert, aber keine neue Agentenlogik erfindet.

## Was Dieses Goal Baut

### 1. Lokaler Execution Snapshot

Ein lokaler Snapshot liest vorhandene Dateien aus dem Hermes Workspace und baut ein kleines Datenmodell:

- `today`: maximal 3 Handlungen fuer heute.
- `waitingForChris`: Entscheidungen, die nur Chris treffen soll.
- `codexOpen`: offene Handoffs aus `handoff/codex-inbox`.
- `wins`: belegte Fortschritte der Woche.
- `dontTouch`: klare Nicht-Tun-Liste.
- `memoryCandidates`: Dinge, die eventuell dauerhaft ins Memory duerfen.
- `proofLog`: Quellen und Belege.
- `nextSmallestSlice`: genau eine naechste beste Aktion.

### 2. Markdown Report

Der Snapshot kann als Markdown-Bericht geschrieben werden:

`/Users/zondrius/hermes-workspace/reports/hermes-control/hermes-execution-layer-YYYY-MM-DD.md`

Der Bericht ist nicht laenger als noetig und soll in unter 3 Minuten lesbar sein.

### 3. API fuer den Workspace

Eine lokale API liefert den Snapshot als JSON:

`GET /api/execution-layer`

Spaeter kann die UI daraus eine kleine Karte bauen, ohne dieselben Dateien nochmal im Browser zu lesen.

### 4. Kleine UI-Karte

Nach erfolgreicher Report/API-Schicht bekommt Hermes eine kleine UI:

- entweder auf `/operations`;
- oder als neue Route `/execution`;
- oder als kleine Dashboard-Karte, falls das bestehende Dashboard nicht ueberladen wird.

Die UI zeigt nur:

1. Heute wirklich tun
2. Wartet auf Chris
3. Codex offen
4. Naechster kleinster Slice
5. Nicht anfassen

### 5. Memory Graduation

Memory wird nicht automatisch beschrieben. Die Execution Layer markiert nur Kandidaten:

- stabile Regel
- Projektstand
- kurzlebige Beobachtung
- nicht speichern

Erst Chris oder der Memory Curator entscheidet, ob etwas dauerhaft gespeichert wird.

## Nicht Ueberschneiden

Dieses Goal ersetzt keine bestehenden Jobs.

| Bestehender Baustein | Bleibt zustaendig fuer | Execution Layer macht nur |
|---|---|---|
| `GITHUB` | GitHub-Trends bewerten | Ergebnisse als Signal lesen |
| `HERMES_CONTROL_DAILY` | Tages-Control und Decision Inbox sammeln | daraus Prioritaet ableiten |
| `CODEX_HANDOFF_SCOUT_DAILY` | hoechstens einen sicheren Handoff erzeugen | offene Handoffs anzeigen |
| `HERMES_HANDOFF_JANITOR_DAILY` | Handoff-Hygiene pruefen | Status sichtbar machen |
| `TEACHER_NEXTDAY_DAILY` | Morgenplanung GE | wichtigste Unterrichtsaktion zitieren |
| `WOCHENPLAN_GE_SONNTAG` | Wochenplan GE | Wochenbezug zitieren |
| `LERNWERKSTATT_TESTPILOT_WEEKLY` | Uebung testen | naechsten Testpilot-Slice anzeigen |
| `HERMES_MEMORY_CURATOR_MONTHLY` | Memory verdichten | Kandidaten vorbereiten |
| Momentum Cockpit v1 | manuelle Arbeitsuebersicht | wird zur Quelle und spaeter automatisiert |

## Harte Grenzen

- Keine neuen Agentenprofile.
- Kein neuer Cronjob in v1.
- Keine automatische Archivierung.
- Keine automatische Memory-Schreibung.
- Keine Installationen.
- Keine externen Services.
- Keine Tokens oder Account-Aktionen.
- Keine echten Schuelerdaten, Diagnosen, Elterninfos oder personenbezogenen Unterrichtsdaten.
- Keine private Repo-Indexierung.
- Keine Veraenderung von `jobs.json`, bevor Chris ausdruecklich zustimmt.
- Keine neue Produktarbeit, wenn sichere offene Handoffs zuerst abgeschlossen werden sollten.

## Erfolgskriterien

Das Goal ist erfolgreich, wenn:

- Chris in unter 3 Minuten sieht, was heute wichtig ist.
- offene Codex-Handoffs nicht uebersehen werden.
- `CHRIS_ENTSCHEIDET` klar von sicherer Ausfuehrung getrennt ist.
- jede Empfehlung eine Quelle hat.
- genau ein naechster kleinster Slice genannt wird.
- keine bestehende Hermes-Automatik doppelt gebaut wird.
- Memory nur Kandidaten bekommt, keine automatische Dauerablage.
- eine UI erst kommt, nachdem der lokale Snapshot und der Markdown-Bericht stabil sind.

## Abbruchkriterien

Stoppen oder verkleinern, wenn:

- die Execution Layer laenger wird als die Reports, die sie zusammenfasst;
- mehr als 3 Tagesaktionen empfohlen werden;
- riskante Entscheidungen in `SOFORT_MACHEN` rutschen;
- Status ohne Datei-Beleg erfunden wird;
- neue Cronjobs oder neue Agenten noetig wirken;
- die UI vor dem Datenmodell gebaut werden soll;
- offene Handoffs ignoriert werden, um neue Ideen zu starten.

## Erwartete Dateien

Goal-Dateien:

- `/Users/zondrius/hermes-workspace/memory/goals/2026-06-01-hermes-execution-layer-v1/GOAL.md`
- `/Users/zondrius/hermes-workspace/memory/goals/2026-06-01-hermes-execution-layer-v1/EXECUTE_PLAN.md`
- `/Users/zondrius/hermes-workspace/memory/goals/2026-06-01-hermes-execution-layer-v1/VALIDATION.md`

Geplante Implementierungsdateien:

- `/Users/zondrius/hermes-workspace/src/server/execution-layer.ts`
- `/Users/zondrius/hermes-workspace/src/server/execution-layer.test.ts`
- `/Users/zondrius/hermes-workspace/src/routes/api/execution-layer.ts`
- `/Users/zondrius/hermes-workspace/src/routes/execution.tsx`
- `/Users/zondrius/hermes-workspace/src/screens/execution/execution-screen.tsx`
- `/Users/zondrius/hermes-workspace/src/screens/execution/execution-screen.test.tsx`
- `/Users/zondrius/hermes-workspace/reports/hermes-control/hermes-execution-layer-YYYY-MM-DD.md`

## /goal Prompt

/goal Build Hermes Execution Layer v1 as a non-overlapping local execution layer for Chris' existing Hermes setup. Do not add new agents, new cronjobs, external services, installations, automatic archive actions, automatic memory writes, or product feature work. First create a local snapshot builder that reads existing Hermes files, then render a short markdown report, then expose it through a local API, and only after that add a small UI card. The layer must combine Decision Inbox, Hermes Control, Codex Handoff status, active goals, weekly wins, non-do rules, and Memory candidates into one short daily execution view. It must always cite source files, recommend at most 3 actions, separate Chris decisions from safe execution, show open Codex handoffs, and name exactly one next smallest slice.
