# Hermes Control Tower – 2026-05-22

STATE: completed
PROFILE/ROLES_USED: neva als Control Tower; keine Subagents
SKILLS_USED: hermes-agent-operating-system, hermes-decision-inbox, codex-handoff
FILES_CHANGED: `/Users/zondrius/hermes-workspace/reports/hermes-control/hermes-control-2026-05-22.md`, `/Users/zondrius/hermes-workspace/reports/decision-inbox/decision-inbox-2026-05-22.md`
SOURCES_OR_CONTEXT: `hermes status`, `hermes cron list`, `hermes kanban list`, aktuelle Reports und Handoff-Ordner

## Ampel
Yellow

## Wichtigste Beobachtung
- Hermes Gateway/Workspace wirkt gesund: Gateway läuft via launchd, Telegram ist konfiguriert, 12/12 Cron-Jobs sind aktiv, der heutige GitHub-Scout lief erfolgreich.
- Kanban zeigt in der geprüften Liste keine offenen Nicht-`done`-Tasks; keine akute Blockade oder `Iteration budget exhausted` sichtbar.
- Codex-Handoff-Hygiene ist stabiler als gestern: `codex-inbox` ist leer, 4 Handoffs liegen archiviert, 4 Outbox-Ergebnisse liegen weiterhin als Belege/Rückgaben vor.
- Neues nutzbares Signal: Der Lernwerkstatt-Testpilot vom 2026-05-21 empfiehlt einen kleinen Gartenpost-Fix: Hilfemodus + Beobachtungsdrawer, ohne neue Spielbibliothek oder Dashboard.
- GitHub-Scout 2026-05-22 bleibt vorsichtig: `codegraph` ist starkes Signal, aber P2-Sandbox bleibt `CHRIS_ENTSCHEIDET`; keine automatische Integration.

## Job-Kontrolle
- active jobs OK / issue: OK. `hermes cron list` zeigt 12 aktive Jobs. Relevante letzte Läufe: `GITHUB` heute OK, `HERMES_CONTROL_DAILY` gestern OK, Lernwerkstatt-Testpilot gestern OK, Game-Lab am 2026-05-20 OK, Wochenplan am 2026-05-17 OK.
- suspicious rhythm / prompt issue / none: keine akute Rhythmus-Störung. Hinweis: `VDS_GE_MONITOR_WEEKLY` hat Freitag 10:15 als nächsten Lauf 2026-05-29, aber im Reports-Ordner `reports/vds-ge/` wurden keine Dateien gefunden; der heutige Freitaglauf ist in den sichtbaren Dateien noch nicht belegt. Das ist Beobachtung, kein harter Blocker.

## Decision Inbox Heute
- SOFORT_MACHEN: Den nächsten kleinen GE-Lernwerkstatt-Slice auf den Gartenpost-Hilfeflow begrenzen: Hilfemodus + Beobachtungsdrawer aus `testpilot-2026-05-21.md` als sichere Codex-/Coder-Aufgabe vormerken bzw. vom 10:30-Handoff-Scout übernehmen lassen.
- CHRIS_ENTSCHEIDET: Ob `codegraph` P2-Sandbox auf einem öffentlichen mittelgroßen Repo vorbereitet werden soll; keine privaten Hermes-/Lernwerkstatt-Repos, kein globaler Installer. Außerdem später: ob Gartenpost nach Hilfeflow-Verbesserung in die React-Lernwerkstatt integriert wird oder zunächst Standalone bleibt.
- BEOBACHTEN: `chrome-devtools-mcp`, `CLI-Anything`, `notebooklm-py`, `forge`, `oh-my-pi`; VDS-GE-Report-Verzeichnis nach dem Freitaglauf; ob der Handoff-Scout heute wirklich keinen Stau erzeugt.
- SPAETER: Skill-Design-Prinzipien aus `anthropics/claude-plugins-official` und `dotnet/skills` statisch vergleichen; lokale lizenzsichere Symbol-/Bildassets planen; LeseWerk-Qualitätsjob nach zwei Läufen bewerten.
- BLOCKIERT: nichts.
- NICHT_TUN: Keine direkte Installation von GitHub-Trends, kein Plugin-/Skill-Wholesale-Import, kein NotebookLM-/Browser-Test mit privaten Daten/Cookies/echten Accounts/Schüler- oder VdS-Inhalten, keine neue große Lernwerkstatt-Mission, keine automatischen Commits/Pushes/Deletes/Installs.

## Naechste 3 Mini-Schritte
1. Gartenpost-Hilfeflow als genau einen kleinen Slice behandeln: Hilfe zuerst, Beobachtungsdrawer zweitens, keine Integration in die Haupt-App im selben Schritt.
2. Nach dem 10:30-`CODEX_HANDOFF_SCOUT_DAILY` prüfen, ob ein neuer Handoff erstellt wurde; wenn ja, später Ergebnis/Outbox sichten statt einen zweiten Handoff zu erzeugen.
3. Beim nächsten Control-Lauf prüfen, ob `reports/vds-ge/` weiterhin leer bleibt; falls ja, Job-Output/Prompt separat prüfen.

## Codex-Handoff
- Offene Inbox-Handoffs: 0 (`/Users/zondrius/hermes-workspace/handoff/codex-inbox/` leer).
- Neue Outbox-Rueckgaben: keine neue seit 2026-05-21 10:41; vorhanden sind 4 Rückgaben: `codex-result-2026-05-18-lernwerkstatt-mengen-spielraum.md`, `codex-result-2026-05-20-ge-spielraum-pattern.md`, `codex-result-2026-05-20-gartenpost-prototyp.md`, `codex-result-2026-05-17-codegraph-sandbox.md`.
- Handoff-Hygiene: 4 archivierte Handoffs; keine sichtbaren Inbox-Duplikate; keine Inbox-Datei mit vorhandener Outbox-Rückgabe.
- Sollte ein neuer Handoff erstellt werden? ja, aber nicht durch diesen read-only Control-Job: sinnvoll wäre genau ein kleiner Handoff zum Gartenpost-Hilfeflow aus `testpilot-2026-05-21.md`, sofern der 10:30-Scout ihn übernimmt. Kein Handoff für `codegraph`, weil das unter `CHRIS_ENTSCHEIDET` steht.

## Aktive Goal-Execute-Stränge
- `2026-05-20-ge-spielraum-qualitaet`: Status active. Kleinste sichere nächste Aktion: Gartenpost-Pattern nicht ausweiten, sondern den konkreten Hilfeflow-Slice prüfen/umsetzen lassen. Handoff-Lage: Pattern-/Mengen-/Gartenpost-Handoffs sind archiviert und Outbox-Ergebnisse vorhanden; neuer Hilfeflow-Handoff wäre möglich, wenn Scout ihn erstellt.
- `2026-05-21-kleingarten-weltklasse`: Status active. Kleinste sichere nächste Aktion: Uebergabe/Inventar/Beetnummern vorbereiten, keine automatischen Käufe oder Vereins-/Pachtentscheidungen. Handoff-Lage: kein Codex-Handoff nötig.
- Ältere Goal-Ordner (`hermesworld`, `playground-training-grounds`) wirken historisch; heute keine Aktion.

## Kein Aktionismus
- `codegraph` trotz starkem GitHub-Signal nicht produktiv aktivieren.
- `ChromeDevTools MCP` nicht ohne lokale Browser-Sicherheitsgrenzen testen.
- Keine neuen Dauerjobs anlegen, bevor die neuen Rollen mehrere saubere Läufe gezeigt haben.
- Keine Lernwerkstatt-Haupt-App-Integration, bevor der kleine Gartenpost-Hilfeflow stabil ist.
- Keine Symbol-/Asset-Entscheidung automatisieren; Lizenz und pädagogische Passung später klären.

## Belege
- `hermes status`: Gateway läuft, Nous Portal und OpenAI Codex angemeldet, 12 aktive Jobs.
- `hermes cron list`: 12 aktive Jobs; heutiger `GITHUB`-Lauf OK.
- `hermes kanban list`: geprüfte Liste zeigt 275 `done`, keine geparsten offenen/blocked Tasks.
- `/Users/zondrius/hermes-workspace/reports/github-rising-projects-2026-05-22.md`
- `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/reports/testpilot-2026-05-21.md`
- `/Users/zondrius/hermes-workspace/handoff/HANDOFF_OVERVIEW.md`
- `/Users/zondrius/hermes-workspace/handoff/codex-inbox/`
- `/Users/zondrius/hermes-workspace/handoff/codex-outbox/`
- `/Users/zondrius/hermes-workspace/memory/goals/2026-05-20-ge-spielraum-qualitaet/`
- `/Users/zondrius/hermes-workspace/memory/goals/2026-05-21-kleingarten-weltklasse/`

QUALITY_CHECK:
- Datenschutz: keine Schüler-/Eltern-/Verbandsdaten verarbeitet; nur Dateipfade und Jobzustände.
- Quellenlage: lokale Hermes-Befehle und vorhandene Reportdateien geprüft; VDS-GE-Inhalt mangels Datei nicht bewertet.
- Umsetzbarkeit: nächste Aktion ist klein und reversibel; keine automatische Ausführung.

RISKS:
- Der VDS-GE-Freitagslauf könnte zeitlich parallel oder noch nicht sichtbar gewesen sein; keine Schlussfolgerung über fachlichen Inhalt.
- `hermes kanban list` wurde als sichtbare Statusliste ausgewertet; falls Kanban weitere Filter hat, wären versteckte Ready/Running/Triage-Zustände separat zu prüfen.

NEXT_ACTION:
Nach 10:30 prüfen, ob der Handoff-Scout einen Gartenpost-Hilfeflow-Handoff erstellt hat; falls ja, keinen zweiten Handoff erzeugen, sondern später Outbox-Ergebnis sichten.

## Decision Inbox
- Signal: Yellow
- SOFORT_MACHEN: Gartenpost-Hilfeflow als genau einen kleinen Codex-/Coder-Slice behandeln: Hilfemodus + Beobachtungsdrawer, keine Haupt-App-Integration.
- CHRIS_ENTSCHEIDET: `codegraph` P2-Sandbox ja/nein; später Gartenpost Standalone weiter testen vs. React-Lernwerkstatt-Integration.
- BEOBACHTEN: VDS-GE-Report-Verzeichnis; heutiger 10:30-Handoff-Scout; GitHub-Signale `chrome-devtools-mcp`, `CLI-Anything`, `notebooklm-py`, `forge`, `oh-my-pi`.
- SPAETER: Skill-Design-Vergleich aus Plugin-/Skill-Repos; lizenzsichere lokale Symbolassets; LeseWerk-Qualitätsjob nach weiteren Läufen bewerten.
- BLOCKIERT: nichts.
- NICHT_TUN: Keine GitHub-Trend-Installationen, keine privaten Browser-/NotebookLM-Tests, keine großen Lernwerkstatt-Umbauten, keine Commits/Pushes/Deletes/Installs.
- Naechste kleinste Aktion: Nach 10:30 prüfen, ob ein neuer Handoff zum Gartenpost-Hilfeflow existiert; sonst als nächsten kleinen Slice vormerken.
- Beleg / Datei: `/Users/zondrius/hermes-workspace/reports/hermes-control/hermes-control-2026-05-22.md`
