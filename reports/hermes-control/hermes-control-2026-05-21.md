# Hermes Control Tower — 2026-05-21

## Ampel
Yellow

## Wichtigste Beobachtung
- Hermes Gateway/Workspace wirkt nach Read-only-Checks **Yellow**: grundsätzlich lauffähig, aber Handoff-/Outbox-Review offen; Details aus `hermes status` und Cron-Ausgabe sind unten belegt.
- Codex-Handoff-Hygiene: 3 offene Inbox-Handoffs, 2 Outbox-Rueckgaben, 0 potenziell stale Inbox-Dateien, 1 moegliche erledigt-aber-noch-Inbox-Faelle.
- Aktive Goal-Execute-Stränge: 0 Kandidaten gefunden; GE-Spielraum/Spielraum wurde bei Treffer mitgescannt.
- Aus aktuellen Reports wurden 10 Decision-Inbox-Blöcke eingesammelt.
- Kanban/Tasks: geprüft, Ausgabe vorhanden; keine Änderungen vorgenommen.

## Job-Kontrolle
- active jobs OK / issue: active jobs OK soweit aus hermes cron/list ersichtlich
- suspicious rhythm / prompt issue / none: none aus Kurzcheck

### CLI-Kurzbelege
```text
hermes status:
┌─────────────────────────────────────────────────────────┐
│                 ⚕ Hermes Agent Status                  │
└─────────────────────────────────────────────────────────┘

◆ Environment
  Project:      /Users/zondrius/.hermes/hermes-agent
  Python:       3.11.15
  .env file:    ✓ exists
  Model:        gpt-5.5
  Provider:     OpenAI Codex

◆ API Keys
  OpenRouter    ✗ (not set)
  OpenAI        ✗ (not set)
  Google / Gemini  ✗ (not set)
  DeepSeek      ✗ (not set)
  xAI / Grok    ✗ (not set)
  NVIDIA NIM    ✗ (not set)
  Z.AI / GLM    ✗ (not set)
  Kimi          ✗ (not set)
  StepFun Step Plan  ✗ (not set)
  MiniMax       ✗ (not set)
  MiniMax-CN    ✗ (not set)
  Firecrawl     ✗ (not set)
  Tavily        ✗ (not set)
  Browser Use   ✗ (not set)
  Browserbase   ✗ (not set)
  FAL           ✗ (not set)
  ElevenLabs    ✗ (not set)
  GitHub        ✗ (not set)
  Anthropic     ✗ (not set)

◆ Auth Providers
  Nous Portal   ✓ logged in
    Portal URL: https://portal.nousresearch.com
    A

hermes cron/jobs:
┌─────────────────────────────────────────────────────────────────────────┐
│                         Scheduled Jobs                                  │
└─────────────────────────────────────────────────────────────────────────┘

  7c69d3237db7 [active]
    Name:      GITHUB
    Schedule:  0 10 * * *
    Repeat:    ∞
    Next run:  2026-05-22T10:00:00+02:00
    Deliver:   telegram
    Skills:    github-rising-integration, hermes-decision-inbox
    Last run:  2026-05-21T10:05:07.650410+02:00  ok

  be58fa73efde [active]
    Name:      HERMES_CONTROL_DAILY
    Schedule:  15 10 * * *
    Repeat:    ∞
    Next run:  2026-05-22T10:15:00+02:00
    Deliver:   telegram
    Skills:    hermes-agent-operating-system, hermes-decision-inbox, codex-handoff
    Workdir:   /Users/zondrius/hermes-workspace
    Last run:  2026-05-20T10:16:59.495915+02:00  ok

  8c038d3deba0 [active]
    Name:      LERNWERKSTATT_QUALITY_WEEKLY
    Schedule:  15 10 * * 1
    Repeat:    ∞
    Next run:  2026-05-25T10:15:00+02:00
    Deliver:   telegram
    Skills:    lernwerkstatt-build-loop, lernwerkstatt-ge-sachsen-anhalt, hermes-agent-operating-system, hermes-decision-inbox
    Workdir:   /Users/zondrius/hermes-works

kanban:
✓ t_e02a8539  done      schule                LeseWerk Alpha 29A - GE Learning Check Spec
✓ t_280ab380  done      research              LeseWerk Alpha 29A - Research Learning Check Brief
✓ t_5552baee  done      neva                  LeseWerk Alpha 29B - Mini Learning Check and Individual Daily Path
✓ t_36c92f86  done      schule                LeseWerk Alpha 28A - GE Profile Builder Brief
✓ t_a030eed2  done      neva                  LeseWerk Alpha 28B - Local Profile Builder and Adaptive Next Step
✓ t_472661c3  done      research              LeseWerk Alpha 27A - Nous Research Didactic Brief
✓ t_cf575425  done      schule                LeseWerk Alpha 27A - GE Classroom Symbol Review
✓ t_b3ed9035  done      neva                  LeseWerk Alpha 27B - Deep Didactic Implementation
✓ t_adc73fe1  done      neva                  LeseWerk Alpha 26C - Coverage Inspector
✓ t_98c1cfa0  done      research              LeseWerk Alpha 26A - Nous Curriculum Brief
✓ t_c3f19035  done      schule                LeseWerk Alpha 26A - GE Didaktik Brief
✓ t_6da184b7  done      neva                  LeseWerk Alpha 26B - Massive Profil-Task-Coverage
✓ t_fda82ff1  done      neva                  LeseWerk
```

## Goal-Execute-Stränge
- keine aktiven Goal-Execute-Stränge eindeutig gefunden

## Decision Inbox Heute
- SOFORT_MACHEN: Codex-Outbox prüfen und passenden Inbox-Handoff danach archivieren: codex-result-2026-05-20-gartenpost-prototyp.md
- CHRIS_ENTSCHEIDET: Ob der taegliche Codex-App-Material-Scout langfristig taeglich bleiben soll oder spaeter auf 3x/Woche reduziert wird. (hermes-job-update-2026-05-20.md); 1 Codex-Handoff(s) warten auf Entscheidung/Weitergabe; nichts automatisch starten.; 1 Codex-Outbox-Rückgabe(n) warten auf menschliche Sichtung.; Stale/Blocked/Ready/Triage-Kanban-Zeilen prüfen, falls sie aktive Arbeit blockieren. (hermes-control-2026-05-20.md); Ob `millionco/react-doctor` in einer rein lokalen Wegwerf-Sandbox getestet werden soll; ob `codegraph` P2 in einem nicht-sensiblen Demo-/Throwaway-Repo getestet werden darf; ob lokale lizenzsichere Symbol-/Bildassets später geplant werden. (hermes-control-2026-05-19.md); Ob `codegraph` nach bestandenem P1 in einem mittelgroßen, nicht-sensiblen Demo-/Throwaway-Repo getestet werden soll. Keine echten Hermes-, Lernwerkstatt- oder privaten Projekte indexieren ohne Freigabe. (hermes-control-2026-05-18.md); Ob alte lokale Server-/Codex-Prozesse später gezielt aufgeräumt werden dürfen. Das ist potentiell destruktiv für offene Arbeitsstände und braucht Freigabe. (hermes-control-2026-05-17.md)
- BEOBACHTEN: Echte Tablet-/Mobilansicht und kompletter Symbol-Garten-Durchlauf sind noch nicht geprüft; Ob `CODEX_HANDOFF_SCOUT_DAILY` durch den Queue-Guard weniger Handoff-Stau erzeugt. (hermes-job-update-2026-05-20.md); GE-Lernwerkstatt-Dateien/Reports vorhanden; Fortschritt beobachten, keine große Mission automatisch starten.; Recurring Reports liefern Decision-Inbox-Blöcke; Control-Tower-Sammlung funktioniert grundsätzlich. (hermes-control-2026-05-20.md); Laufender LeseWerk-Task `t_783a3a3c` und Folge-Task `t_daf91551`; offenen Codex-Handoff `lernwerkstatt-mengen-spielraum`; GitHub-Signale `openhuman`, `academic-research-skills`, `CLI-Anything`, `scientific-agent-skills`, `tech-leads-club/agent-skills`, `codegraph`, `agentmemory`. (hermes-control-2026-05-19.md); Montags-Kollision/Parallelität von Control Tower und Lernwerkstatt-Quality; heutiger Quality-Report, falls er nach diesem Kontrolllauf erzeugt wird. (hermes-control-2026-05-18.md); Alpha-7-Kette (`t_dd02e220` → `t_69e046ba` → `t_d3c4d27f`) und ob daraus ein sauberer Abschlussbericht entsteht. (hermes-control-2026-05-17.md)
- SPAETER: Nach zwei Wochen pruefen, ob `LESEWERK_QUALITY_WEEKLY` nuetzliche Folgeprompts liefert. (hermes-job-update-2026-05-20.md); Lernwerkstatt-/Workspace-Verbesserungen nur als kleine Slices, nicht als neue Großmission. (hermes-control-2026-05-20.md); `supertonic` nur prüfen, wenn lokale deutsche TTS wieder Priorität bekommt; `12-factor-agents` bei nächster Hermes-Orchestrierungsüberarbeitung mappen; VDS-GE-Report-Verzeichnis nach dem Freitaglauf erneut prüfen. (hermes-control-2026-05-19.md); VDS-GE-Report-Verzeichnis nach dem Freitaglauf prüfen; echte lokale Symbol-/Bildassets für die Lernwerkstatt später planen. (hermes-control-2026-05-18.md); Prüfen, ob die leeren Report-Verzeichnisse `reports/vds-ge/` und `weekly-plans/` nach den nächsten planmäßigen Läufen sinnvoll befüllt werden. (hermes-control-2026-05-17.md)
- BLOCKIERT: nichts
- NICHT_TUN: Keine weiteren Dauerjobs anlegen, bevor die neuen Rollen zwei Laeufe gezeigt haben. (hermes-job-update-2026-05-20.md); Keine neuen Langläufer, keine automatischen Codex-Ausführungen, keine Commits/Pushes/Deletes/Installs aus diesem Kontrolljob. (hermes-control-2026-05-20.md); Keine Skill-Repos wholesale kopieren; `CloakBrowser` nicht integrieren; keine Trading-/Finance-Agenten produktiv oder mit Echtgeld verbinden; kein Codegraph-Rollout; keine Installs, Commits, Pushes, Deployments, Löschungen oder Veröffentlichung; keine neuen Monsterprompts. (hermes-control-2026-05-19.md); Kein automatischer Codegraph-Rollout, kein globaler Installer, keine produktive MCP-Konfiguration, keine Prozess-Kills, keine neuen Monsterprompts, keine Commits/Pushes, keine Installationen, keine Memory-Änderungen aus diesem Kontrolljob. (hermes-control-2026-05-18.md); Keine automatischen Prozess-Kills, keine neuen großen Lernwerkstatt-Monsterprompts, keine Commits/Pushes, keine Installationen, keine Speicher-/Memory-Änderungen aus diesem Kontrolljob. (hermes-control-2026-05-17.md)

## Naechste 3 Mini-Schritte
1. Codex-Outbox prüfen und passenden Inbox-Handoff danach archivieren: codex-result-2026-05-20-gartenpost-prototyp.md
2. Handoff-Hygiene prüfen: Outbox-Rueckgaben gegen offene Inbox-Handoffs abgleichen und nur nach Review archivieren.
3. Bei aktiven Goal-Dateien den jeweils kleinsten nächsten Schritt explizit in den nächsten Report/Handoff schreiben.

## Codex-Handoff
- Offene Inbox-Handoffs: 3 — codex-handoff-2026-05-20-ge-spielraum-pattern.md, codex-handoff-2026-05-20-gartenpost-prototyp.md, codex-handoff-2026-05-18-lernwerkstatt-mengen-spielraum.md
- Neue Outbox-Rueckgaben: 2 — codex-result-2026-05-20-gartenpost-prototyp.md, codex-result-2026-05-17-codegraph-sandbox.md
- Stale Inbox-Kandidaten >7 Tage: keine
- Completed/Outbox-match noch in Inbox möglich: codex-handoff-2026-05-20-gartenpost-prototyp.md
- Sollte ein neuer Handoff erstellt werden? nein — erst vorhandene Inbox/Outbox prüfen; kein neuer kleiner, freigabefreier Handoff ist klarer als diese Hygiene-Aktion.

## Kein Aktionismus
- Keine neuen Langläufer oder Swarms starten.
- Keine Codeänderungen, Commits, Pushes, Installationen oder Löschungen.
- Keine Veröffentlichung, Mail, Upload oder externe Aktion.
- Keine Verarbeitung echter Schüler-/Eltern-/Diagnosedaten; Lernwerkstatt nur anonymisiert/lokal-first weiterdenken.

## Belege
- /Users/zondrius/Documents/New project 6/hermes-jobs-overview.md
- /Users/zondrius/Documents/New project 6/hermes-integration-cockpit.md
- /Users/zondrius/hermes-workspace/handoff/HANDOFF_OVERVIEW.md
- /Users/zondrius/hermes-workspace/reports/hermes-control/hermes-job-update-2026-05-20.md
- /Users/zondrius/hermes-workspace/reports/hermes-control/hermes-control-2026-05-20.md
- /Users/zondrius/hermes-workspace/reports/hermes-control/hermes-control-2026-05-19.md
- /Users/zondrius/hermes-workspace/reports/decision-inbox/decision-inbox-2026-05-20.md
- /Users/zondrius/hermes-workspace/reports/decision-inbox/decision-inbox-2026-05-19.md
- /Users/zondrius/hermes-workspace/reports/decision-inbox/decision-inbox-2026-05-18.md
- /Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/reports/ge-material-scout-2026-05-20.md
- /Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/reports/lernwerkstatt-quality-2026-05-18.md
- /Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/reports/testpilot-mengen-legen-2026-05-16.md
- /Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/weekly-plans/wochenplan-ge-2026-05-17.md
- /Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/game-lab/gartenpost-prototyp.html
- /Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/game-lab/game-concept-2026-05-20.md

## Decision Inbox
- Signal: Yellow
- SOFORT_MACHEN: Codex-Outbox prüfen und passenden Inbox-Handoff danach archivieren: codex-result-2026-05-20-gartenpost-prototyp.md
- CHRIS_ENTSCHEIDET: Ob der taegliche Codex-App-Material-Scout langfristig taeglich bleiben soll oder spaeter auf 3x/Woche reduziert wird. (hermes-job-update-2026-05-20.md); 1 Codex-Handoff(s) warten auf Entscheidung/Weitergabe; nichts automatisch starten.; 1 Codex-Outbox-Rückgabe(n) warten auf menschliche Sichtung.; Stale/Blocked/Ready/Triage-Kanban-Zeilen prüfen, falls sie aktive Arbeit blockieren. (hermes-control-2026-05-20.md); Ob `millionco/react-doctor` in einer rein lokalen Wegwerf-Sandbox getestet werden soll; ob `codegraph` P2 in einem nicht-sensiblen Demo-/Throwaway-Repo getestet werden darf; ob lokale lizenzsichere Symbol-/Bildassets später geplant werden. (hermes-control-2026-05-19.md)
- BEOBACHTEN: Echte Tablet-/Mobilansicht und kompletter Symbol-Garten-Durchlauf sind noch nicht geprüft; Ob `CODEX_HANDOFF_SCOUT_DAILY` durch den Queue-Guard weniger Handoff-Stau erzeugt. (hermes-job-update-2026-05-20.md); GE-Lernwerkstatt-Dateien/Reports vorhanden; Fortschritt beobachten, keine große Mission automatisch starten.; Recurring Reports liefern Decision-Inbox-Blöcke; Control-Tower-Sammlung funktioniert grundsätzlich. (hermes-control-2026-05-20.md); Laufender LeseWerk-Task `t_783a3a3c` und Folge-Task `t_daf91551`; offenen Codex-Handoff `lernwerkstatt-mengen-spielraum`; GitHub-Signale `openhuman`, `academic-research-skills`, `CLI-Anything`, `scientific-agent-skills`, `tech-leads-club/agent-skills`, `codegraph`, `agentmemory`. (hermes-control-2026-05-19.md)
- SPAETER: Nach zwei Wochen pruefen, ob `LESEWERK_QUALITY_WEEKLY` nuetzliche Folgeprompts liefert. (hermes-job-update-2026-05-20.md); Lernwerkstatt-/Workspace-Verbesserungen nur als kleine Slices, nicht als neue Großmission. (hermes-control-2026-05-20.md); `supertonic` nur prüfen, wenn lokale deutsche TTS wieder Priorität bekommt; `12-factor-agents` bei nächster Hermes-Orchestrierungsüberarbeitung mappen; VDS-GE-Report-Verzeichnis nach dem Freitaglauf erneut prüfen. (hermes-control-2026-05-19.md)
- BLOCKIERT: nichts
- NICHT_TUN: Keine weiteren Dauerjobs anlegen, bevor die neuen Rollen zwei Laeufe gezeigt haben. (hermes-job-update-2026-05-20.md); Keine neuen Langläufer, keine automatischen Codex-Ausführungen, keine Commits/Pushes/Deletes/Installs aus diesem Kontrolljob. (hermes-control-2026-05-20.md); Keine Skill-Repos wholesale kopieren; `CloakBrowser` nicht integrieren; keine Trading-/Finance-Agenten produktiv oder mit Echtgeld verbinden; kein Codegraph-Rollout; keine Installs, Commits, Pushes, Deployments, Löschungen oder Veröffentlichung; keine neuen Monsterprompts. (hermes-control-2026-05-19.md)
- Naechste kleinste Aktion: Codex-Outbox prüfen und passenden Inbox-Handoff danach archivieren: codex-result-2026-05-20-gartenpost-prototyp.md
- Beleg / Datei: /Users/zondrius/hermes-workspace/reports/hermes-control/hermes-control-2026-05-21.md

