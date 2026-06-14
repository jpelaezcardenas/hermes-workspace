# Hermes Execution Boost v1 - Execute Plan

## Phase 1 - Check zuerst

- Erstelle `/Users/zondrius/.hermes/scripts/hermes_execution_boost_check.py`.
- Der Check muss rot sein, solange `HERMES_EVENING_EXECUTION_SLOT_DAILY` fehlt.

## Phase 2 - Goal-Artefakte

- Erstelle:
  - `GOAL.md`
  - `EXECUTE_PLAN.md`
  - `JOB_PROMPT_DRAFT.md`
  - `VALIDATION.md`
- Erstelle Report-Ordner:
  `/Users/zondrius/hermes-workspace/reports/evening-execution/`

## Phase 3 - Cronjob

- Fuege `HERMES_EVENING_EXECUTION_SLOT_DAILY` in `/Users/zondrius/.hermes/profiles/neva/cron/jobs.json` ein.
- Schedule: `30 18 * * *`.
- Modell: `gpt-5.5`.
- Provider: `openai-codex`.
- Delivery: `telegram`.

## Phase 4 - Bestehende Jobs schaerfen

- `HERMES_MORNING_CEO_DAILY`: Proof-Ledger Komfortkarte und copy-ready proof line.
- `HERMES_CONTROL_DAILY`: Execution Score 0-3 und Evening Execution Reports lesen.
- `HERMES_NIGHT_RESULT_TUEV_DAILY`: Execution Score 0-3 in die Bewertung aufnehmen.

## Phase 5 - Dokumentation

- `hermes-jobs-overview.md` aktualisieren.
- Setup-Report schreiben:
  `/Users/zondrius/hermes-workspace/reports/hermes-control/hermes-execution-boost-setup-2026-06-12.md`

## Phase 6 - Verifikation

- `python3 /Users/zondrius/.hermes/scripts/hermes_execution_boost_check.py`
- `python3 -m json.tool /Users/zondrius/.hermes/profiles/neva/cron/jobs.json`
- Alle bestehenden Hermes-Checks plus neuen Check ausfuehren.
- `hermes --profile neva cron list` pruefen.
