# Hermes Mission Chain CEO Setup - 2026-06-12

## Kurzfazit

Green. `HERMES_MISSION_CHAIN_CEO_WEEKLY` wurde als woechentlicher Loop fuer grosse Updates, Apps und Website-/Systemmissionen angelegt.

## Zweck

Der Job verhindert Mega-Prompts und zerlegt grosse Vorhaben in eine Mission Chain:

`Spec -> Slices -> Codex Handoff Drafts -> QA -> Proof`

Damit grosse Updates nicht als unkontrollierte Einzelaufgabe starten, sondern als kleine, pruefbare Kette.

## Job

- Name: `HERMES_MISSION_CHAIN_CEO_WEEKLY`
- ID: `1c6f8e2a4d90`
- Schedule: Samstag 20:30 Europe/Berlin (`30 20 * * 6`)
- Modell: `gpt-5.5`
- Provider: `openai-codex`
- Delivery: Telegram
- Workdir: `/Users/zondrius/hermes-workspace`

## Output

- Reportpfad: `/Users/zondrius/hermes-workspace/reports/mission-chain/mission-chain-YYYY-MM-DD.md`
- Pro Lauf maximal eine Mission.
- Mission enthaelt Spec, 3-6 Slices, Slice 1, Acceptance Criteria, QA-Gate und Proof-Gate.
- Codex-Handoff-Dateien werden nicht direkt erstellt.

## Loop-Anbindung

- `HERMES_CONTROL_DAILY` liest Mission-Chain-Reports.
- `CODEX_HANDOFF_SCOUT_DAILY` liest Mission-Chain-Reports und darf only route Slice 1.
- Handoff Scout darf Slice 1 nur routen, wenn der Slice klein, lokal, sicher, file-spezifisch, acceptance-tested und ohne Freigabe-/Deploy-/Install-/Kauf-/Sensitive-Data-Risiko ist.

## Grenzen

- Keine App-Code-Builds in diesem Job.
- Keine Deploys, Commits, Pushes, Kaeufe, Installationen oder externen Sends.
- Keine echten Schuelerdaten, Diagnosen, Fotos, Rankings, Accountdaten, Brokerdaten, Secrets oder privaten Finanzdetails.
- Keine Trading-, Broker-, Options-, Hebel- oder Margin-Workflows.
- Keine V2, keine Expansion, kein Handoff und keine Produktisierung ohne Proof.

## Dateien

- Goal: `/Users/zondrius/hermes-workspace/memory/goals/2026-06-12-hermes-mission-chain-ceo-v1/GOAL.md`
- Prompt: `/Users/zondrius/hermes-workspace/memory/goals/2026-06-12-hermes-mission-chain-ceo-v1/JOB_PROMPT_DRAFT.md`
- Validation: `/Users/zondrius/hermes-workspace/memory/goals/2026-06-12-hermes-mission-chain-ceo-v1/VALIDATION.md`
- Check: `/Users/zondrius/.hermes/scripts/hermes_mission_chain_ceo_check.py`
- Cron config: `/Users/zondrius/.hermes/profiles/neva/cron/jobs.json`

## Decision Inbox

- Signal: Green
- SOFORT_MACHEN: nichts
- CHRIS_ENTSCHEIDET: nichts
- BEOBACHTEN: Ersten Lauf am 2026-06-13 um 20:30 gegenlesen.
- SPAETER: Wenn Mission Chains gut werden, kann Handoff Scout spaeter Slice-1-Routing haerter automatisieren.
- BLOCKIERT: nichts
- NICHT_TUN: Keine grossen App- oder Website-Updates mehr als unzerlegte Mega-Aufgabe starten.
- Naechste kleinste Aktion: Ersten Mission-Chain-Report pruefen.
- Beleg / Datei: `/Users/zondrius/hermes-workspace/reports/hermes-control/hermes-mission-chain-ceo-setup-2026-06-12.md`
