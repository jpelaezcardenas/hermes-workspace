# Hermes Mission Chain CEO v1 - Execute Plan

## Phase 1 - Check zuerst

- Erstelle `/Users/zondrius/.hermes/scripts/hermes_mission_chain_ceo_check.py`.
- Der Check muss rot sein, solange `HERMES_MISSION_CHAIN_CEO_WEEKLY` fehlt.

## Phase 2 - Goal-Artefakte

- Erstelle:
  - `GOAL.md`
  - `EXECUTE_PLAN.md`
  - `JOB_PROMPT_DRAFT.md`
  - `VALIDATION.md`
- Erstelle Report-Ordner:
  `/Users/zondrius/hermes-workspace/reports/mission-chain/`

## Phase 3 - Cronjob

- Fuege `HERMES_MISSION_CHAIN_CEO_WEEKLY` in `/Users/zondrius/.hermes/profiles/neva/cron/jobs.json` ein.
- Schedule: `30 20 * * 6`.
- Modell: `gpt-5.5`.
- Provider: `openai-codex`.
- Delivery: `telegram`.

## Phase 4 - Loop-Anbindung

- `HERMES_CONTROL_DAILY` liest Mission-Chain-Reports.
- `CODEX_HANDOFF_SCOUT_DAILY` liest Mission-Chain-Reports und darf only route Slice 1, wenn es sicher ist.
- `hermes-jobs-overview.md` dokumentiert Job, Zeit und Reportpfad.

## Phase 5 - Setup-Report

- Schreibe:
  `/Users/zondrius/hermes-workspace/reports/hermes-control/hermes-mission-chain-ceo-setup-2026-06-12.md`

## Phase 6 - Verifikation

- `python3 /Users/zondrius/.hermes/scripts/hermes_mission_chain_ceo_check.py`
- `python3 -m json.tool /Users/zondrius/.hermes/profiles/neva/cron/jobs.json`
- Alle bestehenden Hermes-Checks plus neuen Check ausfuehren.
- `hermes --profile neva cron list` pruefen.
