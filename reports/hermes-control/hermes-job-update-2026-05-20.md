# Hermes Job Update - 2026-05-20

## Kurzfazit

Die Hermes-Job-Landschaft wurde auf die neue Gartenpost-/GE-Spielraum-Erkenntnis ausgerichtet. Es wurden keine Projektdateien der Apps geaendert. Die Cron-Konfiguration wurde vorab gesichert.

## Backup

`/Users/zondrius/.hermes/profiles/neva/cron/jobs.json.backup-20260520-185702-before-job-updates`

## Geaenderte Hermes-Jobs

- `HERMES_CONTROL_DAILY`: liest jetzt aktive `memory/goals/` und bewertet Handoff-Hygiene mit Inbox, Outbox, Archiv-Kandidaten und Duplikaten.
- `CODEX_HANDOFF_SCOUT_DAILY`: erstellt keine neuen Handoffs mehr, wenn die Inbox schon zu voll ist; aktive Goal-Execute-Strenge haben Vorrang.
- `LERNWERKSTATT_GAME_LAB_WEEKLY`: vertieft zuerst aktive Spielraum-/Gartenpost-/Mengen-Threads, bevor neue Spielideen entstehen.
- `LERNWERKSTATT_TESTPILOT_WEEKLY`: priorisiert Pattern, Gartenpost, Mengen-legen und SymbolSortiergarten.
- `GE_MATERIAL_SCOUT_WEEKLY`: wurde zur woechentlichen Synthese fuer Top-Materialien und Wochenplan-Anschluss umgestellt.

## Neuer Hermes-Job

- `LESEWERK_QUALITY_WEEKLY`
- ID: `4a9d2f61b8e3`
- Schedule: Dienstag 11:30
- Workdir: `/Users/zondrius/hermes-workspace/projects/lesewerk-v1`
- Zweck: LeseWerk gegen Gartenpost-/GE-Spielraum-Qualitaet pruefen und genau einen naechsten Lese-Slice empfehlen.

## Codex-App-Automation

Der taegliche `GE Material Scout` wurde neu angelegt/geschaerft:

- 3-5 hochwertige Fundstuecke statt Linkflut;
- taegliche Recherche, keine Wochenplanung;
- woechentliche Hermes-Synthese bleibt bei `GE_MATERIAL_SCOUT_WEEKLY`.

## Verifikation

- `jobs.json` wurde erfolgreich als JSON geparst.
- `hermes cron list` zeigt `LESEWERK_QUALITY_WEEKLY` aktiv mit naechstem Lauf am 2026-05-26 11:30.
- Codex-App-Automation `ge-material-scout` wurde in der App neu angelegt und per App-View bestaetigt. Die App schreibt dafuer nicht dauerhaft eine sichtbare `automation.toml` an der zuvor erwarteten Stelle.

## Decision Inbox

- Signal: Green
- SOFORT_MACHEN: nichts
- CHRIS_ENTSCHEIDET: Ob der taegliche Codex-App-Material-Scout langfristig taeglich bleiben soll oder spaeter auf 3x/Woche reduziert wird.
- BEOBACHTEN: Ob `CODEX_HANDOFF_SCOUT_DAILY` durch den Queue-Guard weniger Handoff-Stau erzeugt.
- SPAETER: Nach zwei Wochen pruefen, ob `LESEWERK_QUALITY_WEEKLY` nuetzliche Folgeprompts liefert.
- BLOCKIERT: nichts
- NICHT_TUN: Keine weiteren Dauerjobs anlegen, bevor die neuen Rollen zwei Laeufe gezeigt haben.
- Naechste kleinste Aktion: Naechsten Control-Tower-Lauf am 2026-05-21 beobachten.
- Beleg / Datei: `/Users/zondrius/hermes-workspace/reports/hermes-control/hermes-job-update-2026-05-20.md`
