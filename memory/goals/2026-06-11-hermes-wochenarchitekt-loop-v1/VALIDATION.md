# Hermes Wochenarchitekt Loop v1 - Validation

## Pflichtchecks

```bash
python3 /Users/zondrius/.hermes/scripts/hermes_week_architect_check.py
python3 -m json.tool /Users/zondrius/.hermes/profiles/neva/cron/jobs.json
hermes --profile neva cron list
```

## Erwartung

- `HERMES_WEEK_ARCHITECT_WEEKLY` existiert genau einmal.
- Schedule ist `5 20 * * 0`.
- Modell ist `gpt-5.5`.
- Provider ist `openai-codex`.
- Delivery ist `telegram`.
- Report-Ziel ist `/Users/zondrius/hermes-workspace/reports/week-architect/week-architect-YYYY-MM-DD.md`.
- Morning CEO liest Wochenarchitekt-Reports als Kontext.
- Control Daily liest Wochenarchitekt-Reports.
- Alle Goal-Dateien sind vorhanden.
- Setup-Report ist vorhanden.

## Manuelle Review nach erstem Lauf

Nach dem ersten Sonntag-Lauf pruefen:

- Enthalten die Wochenprioritaeten maximal drei Punkte?
- Gibt es wirklich Stop-/Park-Regeln?
- Bleibt Investment research-only?
- Erzeugt der Job keinen zweiten Tagesbefehl neben dem Morgen-CEO?
- Hilft die Wochenkarte am Montagmorgen wirklich, oder ist sie zu abstrakt?
