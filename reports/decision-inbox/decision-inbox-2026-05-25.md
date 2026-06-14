# Daily Decision Inbox – 2026-05-25

Quelle: Hermes Control Tower Tageslauf.

## Gesammelte Signale
- Ampel: Yellow
- Gateway/Workspace: grundsätzlich gesund; Gateway läuft.
- Cron: 12/12 aktiv; 1 echter Fehler bei `HERMES_HANDOFF_JANITOR_DAILY` wegen fehlendem Script.
- Kanban: keine `blocked`, `running`, `ready` oder `triage` Tasks.
- Codex-Handoff: 3 offene Inbox-Handoffs; keine neue Outbox seit 2026-05-21; kein neuer Handoff erstellen.
- Aktive Goals: 2 (`GE-Spielraum-Qualitaet`, `Kleingarten Weltklasse`).

## Entscheidungssammlung

### SOFORT_MACHEN
- Offenen Codex-Handoff `codex-handoff-2026-05-23-hermes-janitor-script.md` priorisieren; er adressiert den realen Janitor-Cronfehler.

### CHRIS_ENTSCHEIDET
- `codex-handoff-2026-05-23-safe-review-slice.md` archivieren/löschen/nicht nutzen.
- `codegraph` P2-Sandbox ja/nein.
- Gartenpost: nach Hilfeflow-Test Standalone weiterführen oder später React-Lernwerkstatt-Integration.
- VDS-GE-Monitor 2026-05-22: interne Notiz bleibt intern oder wird später externe Anfrage/Position.

### BEOBACHTEN
- Handoff-Scout 10:30: sollte Queue nicht weiter füllen.
- Lernwerkstatt-Qualitätslauf 2026-05-25.
- LeseWerk-Quality-Erstlauf 2026-05-26.
- VDS-GE-Recherche-Lücke `blogwatcher-cli`.

### SPAETER
- Handoff-Übersicht und Archiv nach Abarbeitung aktualisieren.
- Lizenzsichere lokale Symbole für Lernwerkstatt/Gartenpost.
- Scout-Rhythmus prüfen, falls Queue-Stau bleibt.

### BLOCKIERT
- `HERMES_HANDOFF_JANITOR_DAILY`: fehlendes Script `/Users/zondrius/.hermes/profiles/neva/scripts/handoff_janitor.py`.

### NICHT_TUN
- Keine neuen Handoffs bei 3 offenen Handoffs.
- Keine Cron-Deaktivierung oder Dateiarchivierung ohne Freigabe.
- Keine Installationen, Commits, Pushes, externen Sends oder großen App-Umbauten.

## Decision Inbox
- Signal: Yellow
- SOFORT_MACHEN: Offenen Codex-Handoff `codex-handoff-2026-05-23-hermes-janitor-script.md` priorisieren; kein neuer Handoff.
- CHRIS_ENTSCHEIDET: `codex-handoff-2026-05-23-safe-review-slice.md` archivieren/löschen ja/nein; `codegraph` P2 ja/nein; Gartenpost Standalone vs. React-Integration; VDS-GE externe Nutzung ja/nein.
- BEOBACHTEN: Handoff-Scout Queue-Guard; Lernwerkstatt-Qualitätslauf; LeseWerk-Quality-Erstlauf; VDS-GE Feedscan-Lücke.
- SPAETER: Handoff-Hygiene nach Queue-Abarbeitung; lokale Symbolassets; Scout-Rhythmus bewerten.
- BLOCKIERT: `HERMES_HANDOFF_JANITOR_DAILY` findet `/Users/zondrius/.hermes/profiles/neva/scripts/handoff_janitor.py` nicht.
- NICHT_TUN: Keine neuen Handoffs, keine Lösch-/Archivaktionen, keine Installationen, keine Cron-Deaktivierung, keine großen App-Umbauten ohne Freigabe.
- Naechste kleinste Aktion: Janitor-Handoff als kleinen Reparatur-/Empfehlungs-Slice bearbeiten lassen.
- Beleg / Datei: `/Users/zondrius/hermes-workspace/reports/hermes-control/hermes-control-2026-05-25.md`
