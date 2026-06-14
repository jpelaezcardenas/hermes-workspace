# Hermes Control Tower – 2026-05-25

STATE: Kontroll- und Triage-Lauf abgeschlossen, read-only bis auf diese beiden Reportdateien.  
PROFILE/ROLES_USED: neva als Control Tower; keine Subagents.  
SKILLS_USED: hermes-agent-operating-system, hermes-decision-inbox, codex-handoff.  
FILES_CHANGED: `/Users/zondrius/hermes-workspace/reports/hermes-control/hermes-control-2026-05-25.md`, `/Users/zondrius/hermes-workspace/reports/decision-inbox/decision-inbox-2026-05-25.md`.  
SOURCES_OR_CONTEXT: `hermes status`, `hermes cron list`, `hermes kanban list --status ...`, aktuelle Reports und Handoff-Ordner.  

## Ampel
Yellow

## Wichtigste Beobachtung
- Hermes Gateway/Workspace wirkt grundsätzlich gesund: Gateway läuft per launchd, `hermes status` meldet 12 aktive von 12 geplanten Jobs und 1 aktive Session.
- Ein echter Systempflege-Blocker bleibt bestehen: `HERMES_HANDOFF_JANITOR_DAILY` scheitert weiter, weil `/Users/zondrius/.hermes/profiles/neva/scripts/handoff_janitor.py` fehlt.
- Kanban ist sauber: keine `blocked`, `running`, `ready` oder `triage` Tasks gefunden; der frühere Iterationsbudget-Typ wirkt aktuell nicht als Board-Blocker.
- Codex-Handoff-Queue ist gestaut: 3 offene Inbox-Handoffs, 0 neue Outbox-Rückgaben seit 2026-05-21. Deshalb keinen neuen Handoff erstellen.
- Lernwerkstatt/GE-Spielraum hat klare nächste Praxisrichtung: Gartenpost-Hilfeflow klein prüfen; keine große App-Integration ohne Chris-Entscheidung.

## Job-Kontrolle
- active jobs OK / issue: 12/12 Jobs aktiv; Gateway läuft. Issue: `HERMES_HANDOFF_JANITOR_DAILY` letzter Lauf Fehler: Script nicht gefunden.
- suspicious rhythm / prompt issue / none: täglicher Handoff-Scout ist sinnvoll begrenzt, aber bei 3 offenen Inbox-Handoffs aktuell nur Queue-Wächter. Kein Prompt-Großumbau nötig.
- Cron-Hinweis: `LESEWERK_QUALITY_WEEKLY` hat noch keinen Last-run-Eintrag, nächster Lauf 2026-05-26 11:30; beobachten, noch kein Blocker.

## Decision Inbox Heute

### SOFORT_MACHEN
- Den offenen Codex-Handoff `codex-handoff-2026-05-23-hermes-janitor-script.md` priorisieren/ausführen lassen, weil er den realen Cron-Fehler adressiert. Kein neuer Handoff nötig.

### CHRIS_ENTSCHEIDET
- Ob die versehentlich/generisch erzeugte Datei `codex-handoff-2026-05-23-safe-review-slice.md` archiviert oder gelöscht werden darf.
- Ob `codegraph` P2-Sandbox weiter vorbereitet werden soll.
- Ob Gartenpost nach Hilfeflow-Test Standalone bleibt oder später in die React-Lernwerkstatt integriert wird.
- Ob aus dem VDS-GE-Monitor vom 2026-05-22 eine externe Anfrage/Position entstehen soll; bis dahin intern halten.

### BEOBACHTEN
- Handoff-Scout 10:30 sollte wegen Queue-Guard keinen neuen Handoff erzeugen.
- `LERNWERKSTATT_QUALITY_WEEKLY` läuft heute ebenfalls montags; Ergebnis später gegen GE-Spielraum-Goal prüfen.
- Aktives Goal `2026-05-20-ge-spielraum-qualitaet`: kleinste sichere Aktion ist weiterhin Gartenpost-Hilfeflow-Handoff; Handoff existiert bereits (`codex-handoff-2026-05-22-gartenpost-hilfeflow.md`).
- Aktives Goal `2026-05-21-kleingarten-weltklasse`: kleinste sichere Aktion ist reale Übergabe-/Inventarliste; kein Codex-Handoff nötig.
- VDS-GE: `blogwatcher-cli` fehlt im letzten Monitor als Recherche-Lücke, aber keine akute Control-Tower-Störung.

### SPAETER
- Nach Abarbeitung der offenen Handoffs Handoff-Übersicht aktualisieren und Archiv-Kandidaten bereinigen.
- Lizenzsichere lokale Symbol-/Bildassets für Lernwerkstatt/Gartenpost erst nach Hilfeflow-Validierung.
- Rhythmus von täglichem Handoff-Scout prüfen, wenn die Queue dauerhaft gestaut bleibt.

### BLOCKIERT
- `HERMES_HANDOFF_JANITOR_DAILY`: real blockiert durch fehlendes Script `/Users/zondrius/.hermes/profiles/neva/scripts/handoff_janitor.py`.

### NICHT_TUN
- Keine neuen Handoffs erzeugen, solange 3 offene Inbox-Handoffs existieren.
- Keine Cronjobs deaktivieren, Dateien löschen/archivieren, Commits/Pushes oder Installationen automatisch ausführen.
- Keine private Repo-Indexierung und keine produktive `codegraph`-/Tool-Integration ohne Chris-Entscheidung.
- Keine Gartenpost-React-Integration starten, bevor der kleine Hilfeflow geprüft ist.

## Naechste 3 Mini-Schritte
1. Janitor-Handoff `codex-handoff-2026-05-23-hermes-janitor-script.md` bearbeiten lassen bzw. dessen Outbox-Rückgabe abwarten.
2. Danach Chris um Entscheidung zur generischen Handoff-Datei `codex-handoff-2026-05-23-safe-review-slice.md` bitten: archivieren/löschen/nicht nutzen.
3. Wenn die Systempflege erledigt ist: Gartenpost-Hilfeflow-Handoff als nächsten GE-Spielraum-Slice abarbeiten lassen.

## Codex-Handoff
- Offene Inbox-Handoffs: 3
  - `/Users/zondrius/hermes-workspace/handoff/codex-inbox/codex-handoff-2026-05-22-gartenpost-hilfeflow.md`
  - `/Users/zondrius/hermes-workspace/handoff/codex-inbox/codex-handoff-2026-05-23-hermes-janitor-script.md`
  - `/Users/zondrius/hermes-workspace/handoff/codex-inbox/codex-handoff-2026-05-23-safe-review-slice.md`
- Neue Outbox-Rueckgaben: keine seit 2026-05-21.
- Handoff-Hygiene: keine Inbox-Datei hat aktuell eine passende Outbox-Rückgabe; die generische `safe-review-slice` ist ein Archiv-/Lösch-Kandidat nach Chris-Freigabe.
- Sollte ein neuer Handoff erstellt werden? nein. Queue-Guard greift; bester Schritt ist vorhandenen Janitor-Handoff abarbeiten.

## Aktive Goal-Execute-Stränge
- `2026-05-20-ge-spielraum-qualitaet` – Status active. Kleinste sichere Aktion: Gartenpost-Hilfeflow prüfen. Codex-Handoff vorhanden: ja, `codex-handoff-2026-05-22-gartenpost-hilfeflow.md`.
- `2026-05-21-kleingarten-weltklasse` – Status active. Kleinste sichere Aktion: reale Übergabe/Inventar/Fotos/Beetnummern; kein Codex-Handoff sinnvoll.

## Kein Aktionismus
- Keine automatische Reparatur des Janitor-Jobs in diesem Control-Lauf.
- Keine Löschung/Archivierung der generischen Handoff-Datei ohne Freigabe.
- Keine neue GitHub-Tool-Sandbox, keine Installationen, keine globalen MCP-/Cron-Änderungen.
- Keine Veröffentlichung oder externe VDS-Kommunikation.
- Keine Verarbeitung echter Schüler-, Eltern-, Kollegiums- oder Verbandsdaten.

## Belege
- `hermes status`: Gateway läuft, 12 aktive Jobs, Nous Portal und OpenAI Codex eingeloggt.
- `hermes cron list`: `HERMES_HANDOFF_JANITOR_DAILY` letzter Lauf Fehler wegen fehlendem Script; übrige zuletzt geprüfte Jobs ok bzw. geplant.
- `hermes kanban list --status blocked/running/ready/triage`: jeweils keine passenden Tasks.
- `/Users/zondrius/Documents/New project 6/hermes-jobs-overview.md`
- `/Users/zondrius/Documents/New project 6/hermes-integration-cockpit.md`
- `/Users/zondrius/hermes-workspace/reports/decision-inbox/decision-inbox-2026-05-24.md`
- `/Users/zondrius/hermes-workspace/reports/hermes-control/hermes-control-2026-05-24.md`
- `/Users/zondrius/hermes-workspace/handoff/HANDOFF_OVERVIEW.md`
- `/Users/zondrius/hermes-workspace/handoff/codex-inbox/`
- `/Users/zondrius/hermes-workspace/handoff/codex-outbox/`
- `/Users/zondrius/hermes-workspace/memory/goals/`
- `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/weekly-plans/wochenplan-ge-2026-05-24.md`
- `/Users/zondrius/hermes-workspace/reports/vds-ge/vds-ge-monitor-2026-05-22.md`

## Decision Inbox
- Signal: Yellow
- SOFORT_MACHEN: Offenen Codex-Handoff `codex-handoff-2026-05-23-hermes-janitor-script.md` priorisieren; kein neuer Handoff.
- CHRIS_ENTSCHEIDET: Generische Handoff-Datei `codex-handoff-2026-05-23-safe-review-slice.md` archivieren/löschen ja/nein; `codegraph` P2 ja/nein; Gartenpost später Standalone vs. React-Integration; VDS-GE externe Nutzung ja/nein.
- BEOBACHTEN: Handoff-Scout wegen Queue-Guard; heutiger Lernwerkstatt-Qualitätslauf; GE-Spielraum-Goal; LeseWerk-Quality-Erstlauf 2026-05-26.
- SPAETER: Handoff-Übersicht nach Queue-Abarbeitung aktualisieren; lokale Symbolassets; Scout-Rhythmus bewerten.
- BLOCKIERT: `HERMES_HANDOFF_JANITOR_DAILY` findet `/Users/zondrius/.hermes/profiles/neva/scripts/handoff_janitor.py` nicht.
- NICHT_TUN: Keine neuen Handoffs, keine Installationen, keine Cron-Deaktivierung, keine Löschung/Archivierung, keine App-Großumbauten ohne Freigabe.
- Naechste kleinste Aktion: Janitor-Handoff öffnen und als kleinen Reparatur-/Empfehlungs-Slice bearbeiten lassen.
- Beleg / Datei: `/Users/zondrius/hermes-workspace/reports/hermes-control/hermes-control-2026-05-25.md`
