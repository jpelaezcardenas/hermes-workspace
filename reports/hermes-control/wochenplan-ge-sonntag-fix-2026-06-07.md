# Wochenplan GE Sonntag Fix - 2026-06-07

## Problem
`WOCHENPLAN_GE_SONNTAG` ist am 2026-06-07 mit `RuntimeError: [Errno 32] Broken pipe` fehlgeschlagen.

## Ursache
Der Job ist nicht an der GE-Fachlogik gescheitert. Die Logs zeigen:

- grosser Kontext mit ca. 34k-38k Tokens,
- mehrfach stale API call,
- TTFB/no-stream-timeout,
- danach Broken pipe nach 3 Versuchen,
- kein neuer Wochenplan wurde geschrieben.

## Fix
Der Job wurde auf ein lokales no-agent Script umgestellt:

- Script: `/Users/zondrius/.hermes/scripts/weekly_plan_ge_sonntag.py`
- Test: `/Users/zondrius/.hermes/scripts/weekly_plan_ge_sonntag_test.py`
- Cron bleibt aktiv: `30 17 * * 0`
- Delivery bleibt Telegram.
- Workdir bleibt `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt`.

Das Script:

- liest die neueste Teacher-Nextday-Karte,
- schreibt einen Wochenplan nach `weekly-plans/wochenplan-ge-YYYY-MM-DD.md`,
- gibt nur eine kurze Telegram-Zusammenfassung aus,
- nutzt keine LLM/API-Runde,
- vermeidet die geparkte Mengenlinie.

## Nachgezogener Output
Direkt erzeugt:

`/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/weekly-plans/wochenplan-ge-2026-06-07.md`

## Validierung
- Test bestanden: `weekly_plan_ge_sonntag_test: pass`
- Direkter Scriptlauf bestanden.
- Wochenplan-Datei existiert.
- Wochenplan enthaelt `## Befehlskarte` und `## Decision Inbox`.
- Kein geparkter Fuenferfeld-/five-frame-Anker im Wochenplan.
- `hermes --profile neva cron list` zeigt `WOCHENPLAN_GE_SONNTAG` jetzt als `Mode: no-agent`.

## Backup
Vor der Cron-Aenderung:

`/Users/zondrius/.hermes/profiles/neva/cron/jobs.json.backup-20260607-before-wochenplan-script`

## Decision Inbox
- Signal: Green
- SOFORT_MACHEN: nichts
- CHRIS_ENTSCHEIDET: ob der Wochenplan spaeter wieder einen kreativeren Agentenaufsatz bekommen soll
- BEOBACHTEN: naechster planmaessiger Lauf am 2026-06-14 um 17:30
- SPAETER: Script bei Bedarf mit weiteren sicheren Wochenankern erweitern
- BLOCKIERT: nichts
- NICHT_TUN: nicht wieder zu einem grossen Agentenlauf machen, solange der no-agent Output reicht
- Naechste kleinste Aktion: Montag die S-Kiste nach Wochenplan vorbereiten
- Beleg / Datei: `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/weekly-plans/wochenplan-ge-2026-06-07.md`
