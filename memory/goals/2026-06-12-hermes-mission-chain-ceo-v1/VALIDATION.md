# Hermes Mission Chain CEO v1 - Validation

## Pflichtchecks

```bash
python3 /Users/zondrius/.hermes/scripts/hermes_mission_chain_ceo_check.py
python3 -m json.tool /Users/zondrius/.hermes/profiles/neva/cron/jobs.json
hermes --profile neva cron list
```

## Erwartung

- `HERMES_MISSION_CHAIN_CEO_WEEKLY` existiert genau einmal.
- Schedule ist `30 20 * * 6`.
- Modell ist `gpt-5.5`.
- Provider ist `openai-codex`.
- Delivery ist `telegram`.
- Control Daily liest `/Users/zondrius/hermes-workspace/reports/mission-chain/`.
- Codex Handoff Scout liest Mission Chain Reports und darf only route Slice 1.
- Report-Ordner `/Users/zondrius/hermes-workspace/reports/mission-chain/` existiert.

## Erster Lauf Review

- Wurde maximal eine Mission gewaehlt?
- Ist Slice 1 klein genug fuer Codex?
- Sind Acceptance Criteria und QA-Gates konkret?
- Gibt es keine automatische Handoff-Datei?
- Wird Proof vor V2 verlangt?
