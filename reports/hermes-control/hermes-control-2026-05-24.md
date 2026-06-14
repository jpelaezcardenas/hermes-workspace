# Hermes Control Tower – 2026-05-24

STATE: abgeschlossen
PROFILE/ROLES_USED: neva / Control Tower
SKILLS_USED: hermes-agent-operating-system, hermes-decision-inbox, codex-handoff
FILES_CHANGED: `/Users/zondrius/hermes-workspace/reports/hermes-control/hermes-control-2026-05-24.md`, `/Users/zondrius/hermes-workspace/reports/decision-inbox/decision-inbox-2026-05-24.md`
SOURCES_OR_CONTEXT: lokale Hermes-CLI, Report-Verzeichnisse, Handoff-Ordner, Goal-Dateien

## Ampel
Yellow

## Wichtigste Beobachtung
- Hermes Gateway/Workspace wirkt grundsätzlich gesund: `hermes status` meldet Gateway running, Nous Portal logged in, 12 aktive Cronjobs.
- Ein echter Systempflege-Fehler bleibt offen: `HERMES_HANDOFF_JANITOR_DAILY` läuft aktiv, scheitert aber zuletzt mit `Script not found: /Users/zondrius/.hermes/profiles/neva/scripts/handoff_janitor.py`.
- Kanban-Board ist sauber: `triage=0`, `todo=0`, `ready=0`, `running=0`, `blocked=0`, `done=279`.
- Codex-Handoff-Queue ist nicht sauber leer: 3 Inbox-Handoffs liegen offen; davon ist mindestens einer generisch/versehentlich (`safe-review-slice`) und einer konkret für den Janitor-Fehler.
- Neuester GitHub-Scout 2026-05-24 empfiehlt nur einen read-only Architekturcheck zu `Lum1104/Understand-Anything`; keine Installation, keine privaten Repos.

## Job-Kontrolle
- active jobs OK / issue: 12 aktive Jobs gefunden. 11 wirken plausibel; 1 aktiver Job hat einen wiederholbaren Fehler: `HERMES_HANDOFF_JANITOR_DAILY`.
- suspicious rhythm / prompt issue / none: Verdächtig ist nicht der Rhythmus, sondern die fehlende Script-Datei beim täglichen Janitor. Außerdem erzeugte der Handoff-Scout am 2026-05-23 offenbar eine generische Zusatzdatei `codex-handoff-2026-05-23-safe-review-slice.md`; das ist Queue-Rauschen.
- Nicht geprüft: tiefe Gateway-Logs, Launchd-Logs, einzelne Cron-Prompts im Volltext.

## Decision Inbox Heute

### SOFORT_MACHEN
- Janitor-Fehler als kleinste sichere Systempflege priorisieren: offenen Codex-Handoff `codex-handoff-2026-05-23-hermes-janitor-script.md` bearbeiten lassen bzw. prüfen lassen. Kein neuer Handoff nötig, weil er bereits existiert.

### CHRIS_ENTSCHEIDET
- Ob die generische/versehentlich erzeugte Handoff-Datei `codex-handoff-2026-05-23-safe-review-slice.md` archiviert oder gelöscht werden darf.
- Ob `codegraph` P2-Sandbox auf einem öffentlichen mittelgroßen Repo vorbereitet werden soll.
- Ob später Gartenpost Standalone weiter getestet oder in die React-Lernwerkstatt integriert werden soll.
- Ob aus dem VDS-GE-Monitor eine externe Anfrage/Position entsteht; bis dahin nur interne Notiz.

### BEOBACHTEN
- Handoff-Scout heute 10:30: sollte wegen bereits offener Queue keinen weiteren Handoff erzeugen.
- GitHub-Signal 2026-05-24: `Lum1104/Understand-Anything` nur read-only mit `codegraph` vergleichen; daneben `claude-plugins-official`, `academic-research-skills`, `openhuman`, `chrome-devtools-mcp`, `dotnet/skills` beobachten.
- GE-Lernwerkstatt: vorhandene mobile/tablet Smoke-Belege vom 2026-05-21 sind da; nächster Qualitätslauf am 2026-05-25.
- VDS-GE: Report vom 2026-05-22 vorhanden; `blogwatcher-cli` dort als fehlend markiert.

### SPAETER
- Skill-Design-Vergleich aus Plugin-/Skill-Repos.
- Lizenzsichere lokale Symbol-/Bildassets für Lernwerkstatt/Gartenpost.
- Nach weiteren Läufen bewerten, ob `LESEWERK_QUALITY_WEEKLY` und täglicher Handoff-Scout weiter im aktuellen Rhythmus sinnvoll sind.

### BLOCKIERT
- `HERMES_HANDOFF_JANITOR_DAILY` ist real blockiert durch fehlendes Script unter `/Users/zondrius/.hermes/profiles/neva/scripts/handoff_janitor.py`.
- VDS-GE Feedscan war am 2026-05-22 teilweise blockiert: `blogwatcher-cli` nicht installiert. Kein akuter Control-Tower-Blocker, aber als Recherche-Lücke merken.

### NICHT_TUN
- Keine neuen Handoffs erzeugen, solange Janitor-Fehler und generische Handoff-Datei ungeklärt sind.
- Keine GitHub-Trend-Tools installieren oder private Hermes-/Lernwerkstatt-/VDS-Repos mit neuen Tools indexieren.
- Keine Cronjobs deaktivieren, Dateien löschen/archivieren, Commits/Pushes oder Veröffentlichungen automatisch ausführen.
- Keine großen Lernwerkstatt-Umbauten starten; nur kleine geprüfte Slices.

## Naechste 3 Mini-Schritte
1. `codex-handoff-2026-05-23-hermes-janitor-script.md` durch Codex bearbeiten lassen oder manuell prüfen: Script wiederherstellen/kleine Reparatur vorschlagen oder Cronjob-Deaktivierung als Entscheidungsvorlage liefern.
2. Danach `codex-handoff-2026-05-23-safe-review-slice.md` menschlich sichten und archivieren/löschen lassen, falls sie wirklich generisch und redundant ist.
3. Nach Janitor-Klärung nur einen nächsten fachlichen Slice wählen: entweder Gartenpost-Hilfeflow-Outbox abwarten oder `Understand-Anything` read-only Architekturcheck machen.

## Codex-Handoff
- Offene Inbox-Handoffs: 3
  - `codex-handoff-2026-05-23-hermes-janitor-script.md` – konkret, aktuell beste nächste Aktion.
  - `codex-handoff-2026-05-23-safe-review-slice.md` – wirkt generisch/versehentlich, menschliche Archiv-/Löschentscheidung nötig.
  - `codex-handoff-2026-05-22-gartenpost-hilfeflow.md` – fachlich sinnvoll, aber hinter Janitor-Hygiene priorisieren.
- Neue Outbox-Rueckgaben: keine neue Outbox seit 2026-05-21 gefunden.
- Handoff-Hygiene: Outbox enthält 4 ältere Rückgaben; laut Übersicht sind ältere Handoffs teils bereits archiviert. Für die drei aktuellen Inbox-Dateien wurde keine passende neue Outbox-Rückgabe gefunden.
- Sollte ein neuer Handoff erstellt werden? nein. Es existiert bereits ein passender Janitor-Handoff; neue Handoffs würden Queue-Rauschen erhöhen.

## Goal-Execute-Stränge
- Aktiv: `2026-05-20-ge-spielraum-qualitaet`.
  - Kleinste sichere nächste Aktion: erst Handoff-Queue/Janitor stabilisieren; danach Gartenpost-Hilfeflow oder GE-Spielraum-Pattern in kleinem Slice weiterführen.
  - Handoff vorhanden: ja, `codex-handoff-2026-05-22-gartenpost-hilfeflow.md`.
- Aktiv: `2026-05-21-kleingarten-weltklasse`.
  - Kleinste sichere nächste Aktion: Übergabe-/Inventar-Checkliste nur als private Planung nutzen; kein Control-Tower- oder Codex-Automatismus nötig.
  - Handoff vorhanden: nicht gefunden.
- Ältere Goal-Ordner ohne klaren Status: `2026-05-03-playground-training-grounds`, `2026-05-05-hermesworld-viral-sprint`; heute nicht aktiv bearbeitet, keine automatische Aktion.

## Kein Aktionismus
- Nicht automatisch löschen/archivieren, auch wenn `safe-review-slice` wahrscheinlich Rauschen ist.
- Janitor-Cron nicht automatisch deaktivieren.
- Kein neuer Codex-Handoff für GitHub-Scout, solange Handoff-Hygiene offen ist.
- Keine Installation von `blogwatcher-cli`, `Understand-Anything`, `codegraph`, Browser-MCP oder anderen Scout-Funden.
- Keine Veröffentlichung oder externe VDS-Kommunikation ohne Chris-Freigabe.

## Belege
- `hermes status`: Gateway running, 12 active jobs, Nous Portal logged in.
- `hermes cron list`: 12 aktive Jobs; `HERMES_HANDOFF_JANITOR_DAILY` zuletzt Fehler `Script not found`.
- `hermes kanban stats`: `blocked=0`, `running=0`, `ready=0`, `triage=0`.
- `/Users/zondrius/hermes-workspace/reports/github-rising-tierlist-2026-05-24.md`.
- `/Users/zondrius/hermes-workspace/reports/codex-handoff-scout/codex-handoff-scout-2026-05-23.md`.
- `/Users/zondrius/hermes-workspace/handoff/codex-inbox/`.
- `/Users/zondrius/hermes-workspace/handoff/codex-outbox/`.
- `/Users/zondrius/hermes-workspace/memory/goals/`.
- `/Users/zondrius/hermes-workspace/reports/vds-ge/vds-ge-monitor-2026-05-22.md`.
- `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/reports/`.

QUALITY_CHECK: read-only eingehalten; keine Code-/Cron-/Memory-Änderungen; keine sensiblen Daten verarbeitet; echte Blocker von normalen Beobachtungen getrennt.
RISKS: Janitor-Fehler kann tägliche Fehlmeldungen/Rauschen erzeugen; Handoff-Queue kann weiter anwachsen, wenn Scout trotz offener Queue neue Handoffs erzeugt.
NEXT_ACTION: Janitor-Handoff bearbeiten lassen, danach Queue bereinigen.

## Decision Inbox
- Signal: Yellow
- SOFORT_MACHEN: Offenen Codex-Handoff `codex-handoff-2026-05-23-hermes-janitor-script.md` bearbeiten lassen bzw. prüfen lassen; kein neuer Handoff.
- CHRIS_ENTSCHEIDET: `codex-handoff-2026-05-23-safe-review-slice.md` archivieren/löschen ja/nein; `codegraph` P2-Sandbox ja/nein; Gartenpost Standalone weiter testen vs. React-Integration; VDS-GE interne Notiz ggf. später extern verwenden ja/nein.
- BEOBACHTEN: Handoff-Scout 10:30; GitHub-Signal `Understand-Anything`; Lernwerkstatt-Qualitätslauf 2026-05-25; VDS-GE-Recherche-Lücke `blogwatcher-cli`.
- SPAETER: Skill-Design-Vergleich, lokale Symbolassets, Rhythmusbewertung LeseWerk/Handoff-Scout.
- BLOCKIERT: `HERMES_HANDOFF_JANITOR_DAILY` scheitert wegen fehlendem Script `/Users/zondrius/.hermes/profiles/neva/scripts/handoff_janitor.py`.
- NICHT_TUN: Keine neuen Handoffs, keine Installationen, keine privaten Repo-Scans, keine Cron-Deaktivierung, keine Lösch-/Archivaktionen ohne Freigabe.
- Naechste kleinste Aktion: Janitor-Handoff öffnen und als kleinen Reparatur-/Empfehlungs-Slice bearbeiten lassen.
- Beleg / Datei: `/Users/zondrius/hermes-workspace/reports/hermes-control/hermes-control-2026-05-24.md`
