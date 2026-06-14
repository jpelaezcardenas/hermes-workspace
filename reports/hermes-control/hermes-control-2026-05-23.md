# Hermes Control Tower – 2026-05-23

## Ampel
Yellow

## Wichtigste Beobachtung
- Cron/Jobs: geprueft; alle Kernjobs aktiv, aber `HERMES_HANDOFF_JANITOR_DAILY` meldet `Script not found` für `/Users/zondrius/.hermes/profiles/neva/scripts/handoff_janitor.py`.
- Codex-Handoff: 1 offene Inbox-Datei(en), 4 Outbox-Rückgabe(n).
- Aktive Goal-Stränge gefunden: 15; GE-Spielraum-Qualität wurde gefunden.
- Recent Decision-Inbox-Blöcke ausgewertet: 16.
- Warnsignal: Cron-Ausgabe enthält Fehlerhinweise.

## Job-Kontrolle
- active jobs OK / issue: geprueft; Details siehe Belege
- suspicious rhythm / prompt issue / none: keine eindeutige Auffälligkeit aus der Kurzprüfung

## Goal-Execute / aktive Stränge
- 001-recherche-verdichtung.md: nächster sicherer Schritt: kleinsten nächsten Schritt im Goal-Dokument prüfen; kein automatischer Start.; Codex-Handoff: nicht erkennbar
- EXECUTE_PLAN.md: nächster sicherer Schritt: kleinsten nächsten Schritt im Goal-Dokument prüfen; kein automatischer Start.; Codex-Handoff: nicht erkennbar
- GOAL.md: nächster sicherer Schritt: kleinsten nächsten Schritt im Goal-Dokument prüfen; kein automatischer Start.; Codex-Handoff: nicht erkennbar
- EXECUTE_PLAN.md: nächster sicherer Schritt: kleinsten nächsten Schritt im Goal-Dokument prüfen; kein automatischer Start.; Codex-Handoff: nicht erkennbar
- 001-goal-setup.md: nächster sicherer Schritt: kleinsten nächsten Schritt im Goal-Dokument prüfen; kein automatischer Start.; Codex-Handoff: nicht erkennbar
- GOAL.md: nächster sicherer Schritt: kleinsten nächsten Schritt im Goal-Dokument prüfen; kein automatischer Start.; Codex-Handoff: nicht erkennbar
- handoff.md: nächster sicherer Schritt: kleinsten nächsten Schritt im Goal-Dokument prüfen; kein automatischer Start.; Codex-Handoff: ja/moeglich
- 009-3002-root-cause-found.md: nächster sicherer Schritt: kleinsten nächsten Schritt im Goal-Dokument prüfen; kein automatischer Start.; Codex-Handoff: nicht erkennbar

## Decision Inbox Heute
- SOFORT_MACHEN: Gartenpost-Hilfeflow als genau einen kleinen Codex-/Coder-Slice behandeln: Hilfemodus + Beobachtungsdrawer, keine Haupt-App-Integration. (decision-inbox-2026-05-22.md)
- CHRIS_ENTSCHEIDET: `codegraph` P2-Sandbox ja/nein; später Gartenpost Standalone weiter testen vs. React-Lernwerkstatt-Integration. (decision-inbox-2026-05-22.md); Ob der taegliche Codex-App-Material-Scout langfristig taeglich bleiben soll oder spaeter auf 3x/Woche reduziert wird. (hermes-job-update-2026-05-20.md); 1 Codex-Handoff(s) warten auf Entscheidung/Weitergabe; nichts automatisch starten.; 1 Codex-Outbox-Rückgabe(n) warten auf menschliche Sichtung.; Stale/Blocked/Ready/Triage-Kanban-Zeilen prüfen, falls sie aktive Arbeit blockieren. (hermes-control-2026-05-20.md); Ob `millionco/react-doctor` in einer rein lokalen Wegwerf-Sandbox getestet werden soll; ob `codegraph` P2 in einem nicht-sensiblen Demo-/Throwaway-Repo getestet werden darf; ob lokale lizenzsichere Symbol-/Bildassets später geplant werden. (hermes-control-2026-05-19.md) (decision-inbox-2026-05-21.md); 1 Codex-Handoff(s) warten auf Entscheidung/Weitergabe; nichts automatisch starten.; 1 Codex-Outbox-Rückgabe(n) warten auf menschliche Sichtung.; Stale/Blocked/Ready/Triage-Kanban-Zeilen prüfen, falls sie aktive Arbeit blockieren. (decision-inbox-2026-05-20.md); Ob `millionco/react-doctor` lokal in einer Wegwerf-Sandbox getestet werden soll; ob `codegraph` P2 in einem nicht-sensiblen Demo-/Throwaway-Repo getestet werden darf; ob lokale lizenzsichere Symbol-/Bildassets später geplant werden. (decision-inbox-2026-05-19.md); Ob `codegraph` als P2 in einem mittelgroßen, nicht-sensiblen Demo-/Throwaway-Repo getestet werden soll. (decision-inbox-2026-05-18.md)
- BEOBACHTEN: VDS-GE-Report-Verzeichnis; heutiger 10:30-Handoff-Scout; GitHub-Signale `chrome-devtools-mcp`, `CLI-Anything`, `notebooklm-py`, `forge`, `oh-my-pi`. (decision-inbox-2026-05-22.md); Echte Tablet-/Mobilansicht und kompletter Symbol-Garten-Durchlauf sind noch nicht geprüft; Ob `CODEX_HANDOFF_SCOUT_DAILY` durch den Queue-Guard weniger Handoff-Stau erzeugt. (hermes-job-update-2026-05-20.md); GE-Lernwerkstatt-Dateien/Reports vorhanden; Fortschritt beobachten, keine große Mission automatisch starten.; Recurring Reports liefern Decision-Inbox-Blöcke; Control-Tower-Sammlung funktioniert grundsätzlich. (hermes-control-2026-05-20.md); Laufender LeseWerk-Task `t_783a3a3c` und Folge-Task `t_daf91551`; offenen Codex-Handoff `lernwerkstatt-mengen-spielraum`; GitHub-Signale `openhuman`, `academic-research-skills`, `CLI-Anything`, `scientific-agent-skills`, `tech-leads-club/agent-skills`, `codegraph`, `agentmemory`. (hermes-control-2026-05-19.md) (decision-inbox-2026-05-21.md); GE-Lernwerkstatt-Dateien/Reports vorhanden; Fortschritt beobachten, keine große Mission automatisch starten.; Recurring Reports liefern Decision-Inbox-Blöcke; Control-Tower-Sammlung funktioniert grundsätzlich. (decision-inbox-2026-05-20.md); Frischer laufender LeseWerk-Task `t_783a3a3c`; offener Codex-Handoff `lernwerkstatt-mengen-spielraum`; GitHub-Watchlist aus dem heutigen Scout. (decision-inbox-2026-05-19.md); Heutigen Lernwerkstatt-Quality-Report nach 10:15 und die Montags-Parallelität der Jobs beobachten. (decision-inbox-2026-05-18.md)
- SPAETER: Skill-Design-Vergleich aus Plugin-/Skill-Repos; lizenzsichere lokale Symbolassets; LeseWerk-Qualitätsjob nach weiteren Läufen bewerten. (decision-inbox-2026-05-22.md); Nach zwei Wochen pruefen, ob `LESEWERK_QUALITY_WEEKLY` nuetzliche Folgeprompts liefert. (hermes-job-update-2026-05-20.md); Lernwerkstatt-/Workspace-Verbesserungen nur als kleine Slices, nicht als neue Großmission. (hermes-control-2026-05-20.md); `supertonic` nur prüfen, wenn lokale deutsche TTS wieder Priorität bekommt; `12-factor-agents` bei nächster Hermes-Orchestrierungsüberarbeitung mappen; VDS-GE-Report-Verzeichnis nach dem Freitaglauf erneut prüfen. (hermes-control-2026-05-19.md) (decision-inbox-2026-05-21.md); Lernwerkstatt-/Workspace-Verbesserungen als spätere kleine Slices. (decision-inbox-2026-05-20.md); `supertonic` nur bei lokaler-TTS-Priorität; `12-factor-agents` später mappen; VDS-GE nach Freitaglauf prüfen. (decision-inbox-2026-05-19.md); VDS-GE-Report-Verzeichnis nach Freitag prüfen; lokale Symbol-/Bildassets später planen. (decision-inbox-2026-05-18.md)
- BLOCKIERT: nichts. (decision-inbox-2026-05-22.md); nichts. (decision-inbox-2026-05-19.md); nichts. (decision-inbox-2026-05-18.md); nichts. (decision-inbox-2026-05-17.md); nichts. (hermes-control-2026-05-22.md)
- NICHT_TUN: Keine GitHub-Trend-Installationen, keine privaten Browser-/NotebookLM-Tests, keine großen Lernwerkstatt-Umbauten, keine Commits/Pushes/Deletes/Installs. (decision-inbox-2026-05-22.md); Keine weiteren Dauerjobs anlegen, bevor die neuen Rollen zwei Laeufe gezeigt haben. (hermes-job-update-2026-05-20.md); Keine neuen Langläufer, keine automatischen Codex-Ausführungen, keine Commits/Pushes/Deletes/Installs aus diesem Kontrolljob. (hermes-control-2026-05-20.md); Keine Skill-Repos wholesale kopieren; (decision-inbox-2026-05-21.md); Keine automatischen Ausführungen, Commits, Pushes, Deletes, Installs oder neue Langläufer. (decision-inbox-2026-05-20.md); Kein Codegraph-/React-Doctor-/Agentmemory-Rollout, keine Wholesale-Skill-Imports, kein CloakBrowser, keine Trading-Agenten, keine Installs/Commits/Pushes/Deployments/Löschungen/Veröffentlichungen. (decision-inbox-2026-05-19.md); Kein Codegraph-Rollout, keine echten privaten/Hermes-/Lernwerkstatt-Repos indexieren, keine Prozess-Kills, keine Monsterprompts, keine Commits/Pushes, keine Installationen, keine Memory-Änderungen. (decision-inbox-2026-05-18.md)

## Naechste 3 Mini-Schritte
1. Codex-Outbox und Inbox kurz prüfen: zurückgegebene Ergebnisse reviewen/archivieren, bevor neue Handoffs entstehen.
2. Bei aktiven Goal-Strängen nur den jeweils kleinsten nächsten Schritt auswählen; keine Mega-Prompts neu starten.
3. Bei GE-/VdS-Themen weiterhin nur anonymisierte, freigegebene Inhalte weiterverarbeiten.

## Codex-Handoff
- Offene Inbox-Handoffs:
  - codex-handoff-2026-05-22-gartenpost-hilfeflow.md
- Neue Outbox-Rueckgaben:
  - codex-result-2026-05-18-lernwerkstatt-mengen-spielraum.md
  - codex-result-2026-05-20-ge-spielraum-pattern.md
  - codex-result-2026-05-20-gartenpost-prototyp.md
  - codex-result-2026-05-17-codegraph-sandbox.md
- Handoff-Hygiene: Inbox=1, Outbox=4, Archivkandidaten=ja, wenn Outbox zu Inbox passt; stale duplicates: nicht tief geprüft.
- Sollte ein neuer Handoff erstellt werden? nein; erst Outbox-Rückgaben prüfen/archivieren.

## Kein Aktionismus
- Keine neuen Long-Run-Missionen starten.
- Keine offenen Codex-Aufgaben doppelt erzeugen.
- Keine externen Veröffentlichungen, Installationen, Käufe, Commits, Pushes oder Löschungen.
- Keine Verarbeitung identifizierbarer Schüler-/Eltern-/Verbandsdaten.

## Belege
- /Users/zondrius/Documents/New project 6/hermes-integration-cockpit.md
- /Users/zondrius/Documents/New project 6/hermes-jobs-overview.md
- /Users/zondrius/hermes-workspace/handoff/HANDOFF_OVERVIEW.md
- /Users/zondrius/hermes-workspace/handoff/codex-inbox
- /Users/zondrius/hermes-workspace/handoff/codex-outbox
- /Users/zondrius/hermes-workspace/memory/goals
- /Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/reports/ge-material-scout-2026-05-20.md
- /Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/reports/lernwerkstatt-quality-2026-05-18.md
- /Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/reports/testpilot-2026-05-21.md
- /Users/zondrius/hermes-workspace/reports/decision-inbox/decision-inbox-2026-05-17.md
- /Users/zondrius/hermes-workspace/reports/decision-inbox/decision-inbox-2026-05-18.md
- /Users/zondrius/hermes-workspace/reports/decision-inbox/decision-inbox-2026-05-19.md
- /Users/zondrius/hermes-workspace/reports/decision-inbox/decision-inbox-2026-05-20.md
- /Users/zondrius/hermes-workspace/reports/decision-inbox/decision-inbox-2026-05-21.md
- /Users/zondrius/hermes-workspace/reports/decision-inbox/decision-inbox-2026-05-22.md
- /Users/zondrius/hermes-workspace/reports/hermes-control/hermes-control-2026-05-18.md
- /Users/zondrius/hermes-workspace/reports/hermes-control/hermes-control-2026-05-19.md
- /Users/zondrius/hermes-workspace/reports/hermes-control/hermes-control-2026-05-20.md
- /Users/zondrius/hermes-workspace/reports/hermes-control/hermes-control-2026-05-21.md
- /Users/zondrius/hermes-workspace/reports/hermes-control/hermes-control-2026-05-22.md
- /Users/zondrius/hermes-workspace/reports/hermes-control/hermes-job-update-2026-05-20.md
- /Users/zondrius/hermes-workspace/reports/vds-ge/vds-ge-monitor-2026-05-22.md

## Rohchecks kurz
- Cron-Ausgabe: vorhanden
- Kanban-Ausgabe: leer/nicht verfügbar
- Letzte Dateien wurden über Verzeichnislisting geprüft.

## Decision Inbox
- Signal: Yellow
- SOFORT_MACHEN: Fehlendes Janitor-Script prüfen/reparieren oder Cronjob deaktivieren lassen: `HERMES_HANDOFF_JANITOR_DAILY` findet `/Users/zondrius/.hermes/profiles/neva/scripts/handoff_janitor.py` nicht.
- CHRIS_ENTSCHEIDET: `codegraph` P2-Sandbox ja/nein; später Gartenpost Standalone weiter testen vs. React-Lernwerkstatt-Integration. (decision-inbox-2026-05-22.md); Ob der taegliche Codex-App-Material-Scout langfristig taeglich bleiben soll oder spaeter auf 3x/Woche reduziert wird. (hermes-job-update-2026-05-20.md); 1 Codex-Handoff(s) warten auf Entscheidung/Weitergabe; nichts automatisch starten.; 1 Codex-Outbox-Rückgabe(n) warten auf menschliche Sichtung.; Stale/Blocked/Ready/Triage-Kanban-Zeilen prüfen, falls sie aktive Arbeit blockieren. (hermes-control-2026-05-20.md); Ob `millionco/react-doctor` in einer rein lokalen Wegwerf-Sandbox getestet werden soll; ob `codegraph` P2 in einem nicht-sensiblen Demo-/Throwaway-Repo getestet werden darf; ob lokale lizenzsichere Symbol-/Bildassets später geplant werden. (hermes-control-2026-05-19.md) (decision-inbox-2026-05-21.md); 1 Codex-Handoff(s) warten auf Entscheidung/Weitergabe; nichts automatisch starten.; 1 Codex-Outbox-Rückgabe(n) warten auf menschliche Sichtung.; Stale/Blocked/Ready/Triage-Kanban-Zeilen prüfen, falls sie aktive Arbeit blockieren. (decision-inbox-2026-05-20.md)
- BEOBACHTEN: VDS-GE-Report-Verzeichnis; heutiger 10:30-Handoff-Scout; GitHub-Signale `chrome-devtools-mcp`, `CLI-Anything`, `notebooklm-py`, `forge`, `oh-my-pi`. (decision-inbox-2026-05-22.md); Echte Tablet-/Mobilansicht und kompletter Symbol-Garten-Durchlauf sind noch nicht geprüft; Ob `CODEX_HANDOFF_SCOUT_DAILY` durch den Queue-Guard weniger Handoff-Stau erzeugt. (hermes-job-update-2026-05-20.md); GE-Lernwerkstatt-Dateien/Reports vorhanden; Fortschritt beobachten, keine große Mission automatisch starten.; Recurring Reports liefern Decision-Inbox-Blöcke; Control-Tower-Sammlung funktioniert grundsätzlich. (hermes-control-2026-05-20.md); Laufender LeseWerk-Task `t_783a3a3c` und Folge-Task `t_daf91551`; offenen Codex-Handoff `lernwerkstatt-mengen-spielraum`; GitHub-Signale `openhuman`, `academic-research-skills`, `CLI-Anything`, `scientific-agent-skills`, `tech-leads-club/agent-skills`, `codegraph`, `agentmemory`. (hermes-control-2026-05-19.md) (decision-inbox-2026-05-21.md); GE-Lernwerkstatt-Dateien/Reports vorhanden; Fortschritt beobachten, keine große Mission automatisch starten.; Recurring Reports liefern Decision-Inbox-Blöcke; Control-Tower-Sammlung funktioniert grundsätzlich. (decision-inbox-2026-05-20.md)
- SPAETER: Skill-Design-Vergleich aus Plugin-/Skill-Repos; lizenzsichere lokale Symbolassets; LeseWerk-Qualitätsjob nach weiteren Läufen bewerten. (decision-inbox-2026-05-22.md); Nach zwei Wochen pruefen, ob `LESEWERK_QUALITY_WEEKLY` nuetzliche Folgeprompts liefert. (hermes-job-update-2026-05-20.md); Lernwerkstatt-/Workspace-Verbesserungen nur als kleine Slices, nicht als neue Großmission. (hermes-control-2026-05-20.md); `supertonic` nur prüfen, wenn lokale deutsche TTS wieder Priorität bekommt; `12-factor-agents` bei nächster Hermes-Orchestrierungsüberarbeitung mappen; VDS-GE-Report-Verzeichnis nach dem Freitaglauf erneut prüfen. (hermes-control-2026-05-19.md) (decision-inbox-2026-05-21.md); Lernwerkstatt-/Workspace-Verbesserungen als spätere kleine Slices. (decision-inbox-2026-05-20.md)
- BLOCKIERT: nichts. (decision-inbox-2026-05-22.md); nichts. (decision-inbox-2026-05-19.md); nichts. (decision-inbox-2026-05-18.md)
- NICHT_TUN: Keine neuen Handoffs erzeugen, solange Outbox/Inbox ungeprüft sind; keine riskanten externen Aktionen.
- Naechste kleinste Aktion: Fehlendes Janitor-Script prüfen/reparieren oder Cronjob deaktivieren lassen; danach Codex-Outbox/Inbox reviewen.
- Beleg / Datei: /Users/zondrius/hermes-workspace/reports/hermes-control/hermes-control-2026-05-23.md
