# Hermes Wochenarchitekt Loop v1 - Execute Plan

## Phase 1 - Check zuerst

- Erstelle `/Users/zondrius/.hermes/scripts/hermes_week_architect_check.py`.
- Der Check muss zuerst fehlschlagen, solange `HERMES_WEEK_ARCHITECT_WEEKLY` nicht existiert.
- Der Check prueft Job, Modell, Provider, Schedule, Prompt-Pflichtsaetze, Morning-CEO-Anbindung, Control-Anbindung, Goal-Dateien, Report-Ordner, Overview und Setup-Report.

## Phase 2 - Goal-Artefakte

- Erstelle diesen Goal-Ordner:
  `/Users/zondrius/hermes-workspace/memory/goals/2026-06-11-hermes-wochenarchitekt-loop-v1/`
- Pflichtdateien:
  - `GOAL.md`
  - `EXECUTE_PLAN.md`
  - `JOB_PROMPT_DRAFT.md`
  - `VALIDATION.md`

## Phase 3 - Cronjob

- Fuege genau einen Job `HERMES_WEEK_ARCHITECT_WEEKLY` in `/Users/zondrius/.hermes/profiles/neva/cron/jobs.json` ein.
- Zeit: Sonntag 20:05 Europe/Berlin, Cron `5 20 * * 0`.
- Modell: `gpt-5.5`
- Provider: `openai-codex`
- Delivery: `telegram`
- Workdir: `/Users/zondrius/hermes-workspace`

## Phase 4 - Loop-Anbindung

- `HERMES_MORNING_CEO_DAILY` liest `/Users/zondrius/hermes-workspace/reports/week-architect/`.
- Morning CEO muss die Wochenkarte als Kontext behandeln, nicht als zweite Tagesaktion.
- `HERMES_CONTROL_DAILY` liest die Wochenarchitekt-Reports fuer Tageskontrolle und Job-Hygiene.
- `hermes-jobs-overview.md` dokumentiert Job, Zweck, Zeit und Reportpfad.

## Phase 5 - Dokumentation

- Schreibe Setup-Report nach:
  `/Users/zondrius/hermes-workspace/reports/hermes-control/hermes-week-architect-setup-2026-06-11.md`

## Phase 6 - Verifikation

- `python3 /Users/zondrius/.hermes/scripts/hermes_week_architect_check.py`
- `python3 -m json.tool /Users/zondrius/.hermes/profiles/neva/cron/jobs.json`
- Bestehende Hermes-Checks erneut ausfuehren.
- `hermes --profile neva cron list` pruefen.
