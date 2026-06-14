# Hermes Wochenarchitekt Setup - 2026-06-11

## Kurzfazit

Green. `HERMES_WEEK_ARCHITECT_WEEKLY` wurde als woechentlicher CEO-Loop fuer eine konkrete Wochenkarte angelegt.

## Ziel

Hermes soll sonntags aus den vielen Einzelberichten eine ruhige Wochenrichtung fuer Chris bauen:

- maximal drei Wochenprioritaeten
- maximal drei Stop-/Park-Regeln
- eine klare `Nicht diese Woche`-Liste
- keine zweite Tagesaktion neben dem Morgen-CEO

## Loop

1. `HERMES_STOP_DOING_WEEKLY` stoppt oder parkt schwache Themen um 19:05.
2. `HERMES_PROOF_CEO_WEEKLY` entscheidet um 19:30 ueber Proof, V2 Permission und Wochenfokus.
3. `HERMES_WEEK_ARCHITECT_WEEKLY` baut um 20:05 daraus die praktische Wochenkarte.
4. `HERMES_MORNING_CEO_DAILY` liest die Wochenkarte ab Montag als Kontext.
5. `HERMES_CONTROL_DAILY` liest die Wochenkarte fuer Tageskontrolle und Job-Hygiene.

## Dateien

- Goal: `/Users/zondrius/hermes-workspace/memory/goals/2026-06-11-hermes-wochenarchitekt-loop-v1/GOAL.md`
- Execute Plan: `/Users/zondrius/hermes-workspace/memory/goals/2026-06-11-hermes-wochenarchitekt-loop-v1/EXECUTE_PLAN.md`
- Prompt Draft: `/Users/zondrius/hermes-workspace/memory/goals/2026-06-11-hermes-wochenarchitekt-loop-v1/JOB_PROMPT_DRAFT.md`
- Validation: `/Users/zondrius/hermes-workspace/memory/goals/2026-06-11-hermes-wochenarchitekt-loop-v1/VALIDATION.md`
- Reports: `/Users/zondrius/hermes-workspace/reports/week-architect/`
- Check: `/Users/zondrius/.hermes/scripts/hermes_week_architect_check.py`
- Cron config: `/Users/zondrius/.hermes/profiles/neva/cron/jobs.json`
- Overview: `/Users/zondrius/Documents/New project 6/hermes-jobs-overview.md`

## Job

- Name: `HERMES_WEEK_ARCHITECT_WEEKLY`
- ID: `5f8a4c2d91b7`
- Schedule: Sonntag 20:05 Europe/Berlin (`5 20 * * 0`)
- Modell: `gpt-5.5`
- Provider: `openai-codex`
- Delivery: Telegram
- Workdir: `/Users/zondrius/hermes-workspace`

## Grenzen

- Keine App-Builds.
- Keine Codex-Handoffs.
- Keine Deploys, Commits, Pushes, Installationen, Kaeufe oder externen Sends.
- Keine echten Schuelerdaten, Diagnosen, Fotos, privaten Account-/Broker-/Finanzdaten oder Secrets.
- Kein Trading, kein Buy/Sell/Hold, keine Broker-, Options-, Margin- oder Leverage-Logik.
- Keine V2, keine Expansion, kein Handoff und keine Produktisierung ohne Proof.

## Decision Inbox

- Signal: Green
- SOFORT_MACHEN: nichts
- CHRIS_ENTSCHEIDET: nichts
- BEOBACHTEN: Ersten Lauf am 2026-06-14 nach 20:05 gegenlesen.
- SPAETER: Wenn die Wochenkarte zu abstrakt ist, Prompt auf eine Wochenkarte mit genau einem Wochen-5-Minuten-Befehl reduzieren.
- BLOCKIERT: nichts
- NICHT_TUN: Keine zweite Tagesaktion neben dem Morgen-CEO erzeugen.
- Naechste kleinste Aktion: `HERMES_WEEK_ARCHITECT_WEEKLY` beim ersten Sonntag-Lauf pruefen.
- Beleg / Datei: `/Users/zondrius/hermes-workspace/reports/hermes-control/hermes-week-architect-setup-2026-06-11.md`
