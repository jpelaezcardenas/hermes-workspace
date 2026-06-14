# Archiviert: Codex Handoff

Status: abgeschlossen und archiviert am 2026-05-26
Ergebnis: `/Users/zondrius/hermes-workspace/handoff/codex-outbox/codex-result-2026-05-23-hermes-janitor-script.md`

## Ziel

Fehlenden Hermes-Handoff-Janitor lokal prüfen und eine kleine, sichere Reparatur oder klare Deaktivierungs-Empfehlung vorbereiten, damit `HERMES_HANDOFF_JANITOR_DAILY` nicht weiter ins Leere läuft.

## Kontext

Auslöser ist die Daily Decision Inbox vom 2026-05-23:

- `/Users/zondrius/hermes-workspace/reports/decision-inbox/decision-inbox-2026-05-23.md`
- Dort steht in `SOFORT_MACHEN`: `Fehlendes Janitor-Script prüfen/reparieren oder Cronjob deaktivieren lassen: HERMES_HANDOFF_JANITOR_DAILY findet /Users/zondrius/.hermes/profiles/neva/scripts/handoff_janitor.py nicht.`
- Beleg im Report: `/Users/zondrius/hermes-workspace/reports/hermes-control/hermes-control-2026-05-23.md`

Das ist ein kleiner Hermes-Systempflege-Slice. Er betrifft keine App-Funktion, keine Schülerdaten und keine externe Veröffentlichung.

## Dateien

Primär prüfen:

- `/Users/zondrius/hermes-workspace/reports/decision-inbox/decision-inbox-2026-05-23.md`
- `/Users/zondrius/hermes-workspace/reports/hermes-control/hermes-control-2026-05-23.md`
- `/Users/zondrius/.hermes/profiles/neva/scripts/`
- Hermes-Cron-Konfiguration/Jobliste für `HERMES_HANDOFF_JANITOR_DAILY` über lokale Hermes-CLI oder relevante Profil-Dateien, nur lesend soweit möglich.

Optionaler Kontext, nur lesend:

- `/Users/zondrius/hermes-workspace/handoff/HANDOFF_OVERVIEW.md`
- `/Users/zondrius/hermes-workspace/handoff/codex-inbox/`
- `/Users/zondrius/hermes-workspace/handoff/codex-outbox/`
- `/Users/zondrius/hermes-workspace/reports/codex-handoff-scout/codex-handoff-scout-2026-05-23.md`

## Was Hermes schon gemacht hat

- Decision Inbox, Control-Reports, Lernwerkstatt-/VdS-Reports und Codex-Queues gesichtet.
- Queue-Guard geprüft: vor Erstellung waren weniger als 3 offene Codex-Inbox-Handoffs vorhanden.
- Diesen Punkt ausgewählt, weil er in `SOFORT_MACHEN` steht, klein ist, lokal prüfbar ist und keine Chris-Entscheidung vor der Analyse erfordert.

## Was Codex tun soll

1. Prüfen, ob `/Users/zondrius/.hermes/profiles/neva/scripts/handoff_janitor.py` wirklich fehlt oder nur falsch referenziert ist.
2. Prüfen, wie `HERMES_HANDOFF_JANITOR_DAILY` definiert ist und welchen Aufruf/Arbeitsordner es verwendet.
3. Nach ähnlichen vorhandenen Janitor-/Handoff-Aufräumskripten suchen, aber nichts breit refactoren.
4. Wenn eine kleine sichere Reparatur möglich ist, entweder:
   - das fehlende Script als minimalen Wrapper/kleines Janitor-Script unter dem erwarteten Pfad anlegen, **oder**
   - den konkreten falschen Pfad im Job/Script-Kontext identifizieren und eine präzise Empfehlung dokumentieren.
5. Eine ungefährliche lokale Prüfung ausführen, z. B. Syntaxcheck oder Dry-Run/Help-Modus, falls vorhanden. Keine Lösch-/Archivierungsaktion ausführen.
6. Ergebnis in die Codex-Outbox schreiben.

## Akzeptanzkriterien

- Ergebnisdatei existiert unter `/Users/zondrius/hermes-workspace/handoff/codex-outbox/codex-result-2026-05-23-hermes-janitor-script.md`.
- Ergebnis nennt klar, ob das Script fehlte, falsch referenziert war oder der Cronjob falsch konfiguriert ist.
- Falls Dateien geändert wurden: nur kleine, nicht-destruktive Hermes-Systempflege-Dateien; alle Pfade sind genannt.
- Ein sicherer Check wurde dokumentiert, z. B. `python -m py_compile ...`, ein Dry-Run oder eine lokale Job-/CLI-Prüfung.
- Keine Handoff-Dateien wurden gelöscht, archiviert oder verschoben.
- Keine Commits, Pushes, Deployments, externen Sends, Installationen oder Käufe wurden ausgeführt.
- Keine echten Schüler-, Eltern-, Kollegiums- oder Verbandsdaten wurden verarbeitet.

## Risiken

- Der Janitor könnte eigentlich archivieren/löschen; daher keine produktive Aufräumaktion ausführen.
- Cron-Job-Änderungen können laufende Automationen beeinflussen; wenn eine Deaktivierung nötig scheint, nur als Empfehlung für Chris dokumentieren, nicht selbst dauerhaft deaktivieren.
- Falls das erwartete Script komplexer als ein minimaler sicherer Janitor wäre, abbrechen und nächste kleine Aktion empfehlen.

## Nicht tun

- Keine Handoff-Inbox/Outbox-Dateien löschen, verschieben oder archivieren.
- Kein `hermes cron remove`, keine dauerhafte Cron-Deaktivierung ohne Chris-Freigabe.
- Keine breiten Änderungen an Hermes-Agent-Code, Profilstruktur oder Cron-System.
- Keine Installationen, Commits, Pushes, Deployments oder externen Nachrichten.
- Keine sensiblen personenbezogenen Daten verwenden.

## Rueckgabe erwartet

Schreibe den Ergebnisbericht nach:

`/Users/zondrius/hermes-workspace/handoff/codex-outbox/codex-result-2026-05-23-hermes-janitor-script.md`

Der Bericht soll enthalten:

- was getan wurde;
- Dateien gelesen/geändert;
- Checks und Ergebnisse;
- verbleibende Risiken;
- ob Hermes etwas dauerhaft merken soll oder nicht;
- nächste kleine Aktion.
