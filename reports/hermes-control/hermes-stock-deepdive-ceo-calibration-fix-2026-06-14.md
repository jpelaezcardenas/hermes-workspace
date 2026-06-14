# AI Stock Deepdive CEO-Kalibrierung - 2026-06-14

## Anlass

Der Lauf `AI_STOCK_DEEPDIVE_WEEKLY` vom 2026-06-14 war als Schutzbericht brauchbar, aber als konkrete Entscheidungsmaschine zu schwach:

- 30 Kandidaten geprueft.
- 27 davon Idea Grade X.
- 0 S-Kandidaten.
- 0 Deep-Dive-Kandidaten.
- Shadow Backtest: 330 pending, 0 assessed.
- Zentrale Datenluecke: freie Price-/Volume-Historie.

Das ist kein Fehler der Vorsicht. Der Fehler war die naechste Aktion: Eine schwache manuelle X-Kandidaten-Pruefung erzeugt wenig Nutzen, solange keine Backtest-Ergebnisse und kein starkes neues Signal vorliegen.

## Entscheidung

`AI_STOCK_DEEPDIVE_WEEKLY` wird ab jetzt als CEO-Kalibrierungsjob behandelt.

Der Job soll klar trennen:

- Pipeline Signal: Lief der technische Prozess sauber?
- Investment Signal: Gibt es ueberhaupt eine research-only starke These?
- Learning Signal: Was hat Hermes diese Woche wirklich gelernt?
- Data / Label Audit: Gibt es ein auffaelliges, widerspruechliches oder moeglicherweise falsches Label?

Pipeline Signal ist kein Investment Signal.

## Neue Regeln

- Bei `Shadow Backtest assessed = 0` ist keine Scoring-Regelaenderung aus Outcomes gerechtfertigt.
- Wenn kein S-/A-/Deep-Dive-Kandidat vorliegt, gibt es keine schwache X-Kandidaten-Pruefung als Hauptaktion.
- In diesem Fall soll die Decision Inbox grundsaetzlich sagen:
  - `SOFORT_MACHEN: nichts`
  - `Naechste kleinste Aktion: keine`
- Ausnahme: Genau ein `Data / Label Audit`, wenn ein Label die Engine-Zuverlaessigkeit fraglich macht.
- Der Report muss Qualitaet getrennt bewerten:
  - Schutzqualitaet
  - Chancenqualitaet
  - Datenqualitaet
  - Handlungsnaehe
  - Lernwert

## Dateien Geaendert

- `/Users/zondrius/.hermes/profiles/neva/cron/jobs.json`
- `/Users/zondrius/hermes-workspace/projects/ai-stock-radar/prompts/weekly.md`
- `/Users/zondrius/Documents/New project 6/hermes-jobs-overview.md`
- `/Users/zondrius/.hermes/scripts/hermes_stock_deepdive_ceo_calibration_check.py`

## Sicherheitsgrenzen

- Keine Trades.
- Kein Brokerzugriff.
- Keine Optionen, Margin, Hebel oder Real-Money-Workflows.
- Keine paid Provider oder API-Keys ohne Chris-Entscheidung.
- Keine Kauf-/Verkauf-/Hold-Sprache.

## Erwarteter Effekt

Der naechste Sonntags-Deepdive soll weniger Schein-Aktion erzeugen und klarer sagen:

- Schutzbericht gut, Chancen schwach.
- Datenlage blockiert echte Research-Hochstufung.
- Lernen erst nach Backtest-Outcomes.
- Bei Zweifel lieber ein konkretes Data / Label Audit als eine schwache Kandidatenpruefung.

## Decision Inbox

- Signal: Green
- SOFORT_MACHEN: nichts
- CHRIS_ENTSCHEIDET: nichts
- BEOBACHTEN: Ob der naechste Deepdive Pipeline Signal, Investment Signal, Learning Signal und Data / Label Audit sauber trennt.
- SPAETER: Falls Backtest-Outcomes vorliegen, echte Regelkalibrierung pruefen.
- BLOCKIERT: Keine unmittelbare Blockade; Datenluecken bleiben im Stock-System sichtbar.
- NICHT_TUN: Keine schwache X-Kandidaten-Pruefung als Hauptaktion; keine Trading- oder Broker-Aktionen.
- Naechste kleinste Aktion: Naechsten Sonntagslauf auswerten.
- Beleg / Datei: `/Users/zondrius/.hermes/profiles/neva/cron/jobs.json`
