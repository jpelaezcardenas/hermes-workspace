# Daily Decision Inbox – 2026-05-24

Quelle: Hermes Control Tower Tageslauf.

## Gesammelte Signale
- Ampel: Yellow
- Hermes Gateway: läuft laut `hermes status`.
- Cronjobs: 12 aktiv; 1 Job mit Fehler (`HERMES_HANDOFF_JANITOR_DAILY`, fehlendes Script).
- Kanban: keine blockierten/laufenden/bereiten/triage Tasks (`blocked=0`, `running=0`, `ready=0`, `triage=0`).
- Codex-Inbox: 3 Dateien.
- Codex-Outbox: 4 Dateien, keine neue Rückgabe seit 2026-05-21.
- Aktive Goal-Stränge mit Status `active`: 2 (`ge-spielraum-qualitaet`, `kleingarten-weltklasse`).

## Gruppierte Inbox

### SOFORT_MACHEN
- Janitor-Handoff priorisieren: `codex-handoff-2026-05-23-hermes-janitor-script.md` prüfen/bearbeiten lassen. Kein neuer Handoff nötig.

### CHRIS_ENTSCHEIDET
- Generische Handoff-Datei `codex-handoff-2026-05-23-safe-review-slice.md` archivieren/löschen ja/nein.
- `codegraph` P2-Sandbox ja/nein.
- Gartenpost Standalone weiter testen vs. später React-Lernwerkstatt-Integration.
- Ob aus dem VDS-GE-Monitor später eine externe Anfrage/Position entsteht.

### BEOBACHTEN
- Ob der heutige Handoff-Scout wegen offener Queue keinen weiteren Handoff erzeugt.
- GitHub Scout 2026-05-24: `Understand-Anything` nur read-only prüfen; weitere Signale beobachten.
- GE-Lernwerkstatt-Qualitätslauf am 2026-05-25.
- VDS-GE-Recherche: `blogwatcher-cli` fehlt, dadurch Feedscan-Lücke.

### SPAETER
- Skill-Design-Vergleich aus fremden Plugin-/Skill-Repos.
- Lokale lizenzsichere Symbol-/Bildassets.
- Rhythmus von Handoff-Scout und LeseWerk-Qualitätsjob nach weiteren Läufen bewerten.

### BLOCKIERT
- `HERMES_HANDOFF_JANITOR_DAILY` ist real blockiert: Script `/Users/zondrius/.hermes/profiles/neva/scripts/handoff_janitor.py` fehlt.

### NICHT_TUN
- Keine neuen Handoffs erzeugen, solange Janitor-Handoff und generische Handoff-Datei ungeklärt sind.
- Keine GitHub-Trend-Tools installieren.
- Keine privaten Repos scannen/indexieren.
- Keine Cronjob-Deaktivierung, Löschung, Archivierung, Commits, Pushes oder Veröffentlichungen automatisch ausführen.

## Handoff-Hygiene
- Inbox offen: 3.
- Outbox neu: 0.
- Archivkandidaten: `codex-handoff-2026-05-23-safe-review-slice.md` wahrscheinlich, aber nicht automatisch anfassen.
- Doppelte/rauschende Handoffs: wahrscheinlich `safe-review-slice`, da generisch und vom 2026-05-23-Scout bereits als versehentlich beschrieben.
- Handoff mit höchster Priorität: `codex-handoff-2026-05-23-hermes-janitor-script.md`.

## Active Goals
- `2026-05-20-ge-spielraum-qualitaet`: Handoff vorhanden (`codex-handoff-2026-05-22-gartenpost-hilfeflow.md`); nach Janitor-Hygiene weiterführen.
- `2026-05-21-kleingarten-weltklasse`: kein Codex-Handoff gefunden; derzeit kein automatischer Control-Tower-Schritt.

## Decision Inbox
- Signal: Yellow
- SOFORT_MACHEN: Offenen Codex-Handoff `codex-handoff-2026-05-23-hermes-janitor-script.md` bearbeiten lassen bzw. prüfen lassen; kein neuer Handoff.
- CHRIS_ENTSCHEIDET: `codex-handoff-2026-05-23-safe-review-slice.md` archivieren/löschen ja/nein; `codegraph` P2-Sandbox ja/nein; Gartenpost Standalone weiter testen vs. React-Integration; VDS-GE interne Notiz ggf. später extern verwenden ja/nein.
- BEOBACHTEN: Handoff-Scout 10:30; GitHub-Signal `Understand-Anything`; Lernwerkstatt-Qualitätslauf 2026-05-25; VDS-GE-Recherche-Lücke `blogwatcher-cli`.
- SPAETER: Skill-Design-Vergleich, lokale Symbolassets, Rhythmusbewertung LeseWerk/Handoff-Scout.
- BLOCKIERT: `HERMES_HANDOFF_JANITOR_DAILY` scheitert wegen fehlendem Script `/Users/zondrius/.hermes/profiles/neva/scripts/handoff_janitor.py`.
- NICHT_TUN: Keine neuen Handoffs, keine Installationen, keine privaten Repo-Scans, keine Cron-Deaktivierung, keine Lösch-/Archivaktionen ohne Freigabe.
- Naechste kleinste Aktion: Janitor-Handoff öffnen und als kleinen Reparatur-/Empfehlungs-Slice bearbeiten lassen.
- Beleg / Datei: `/Users/zondrius/hermes-workspace/reports/decision-inbox/decision-inbox-2026-05-24.md`
