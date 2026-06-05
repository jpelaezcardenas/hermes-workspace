# Nous Cutover Audit

Date: 2026-06-01
Deadline covered: 2026-06-06

## Active Configs Changed

- `/Users/zondrius/.hermes/config.yaml`
- `/Users/zondrius/.hermes/profiles/coder/config.yaml`
- `/Users/zondrius/.hermes/profiles/finance/config.yaml`
- `/Users/zondrius/.hermes/profiles/ideas/config.yaml`
- `/Users/zondrius/.hermes/profiles/lernwerkstatt/config.yaml`
- `/Users/zondrius/.hermes/profiles/memory/config.yaml`
- `/Users/zondrius/.hermes/profiles/neva/config.yaml`
- `/Users/zondrius/.hermes/profiles/research/config.yaml`
- `/Users/zondrius/.hermes/profiles/schule/config.yaml`

## Backup

Backup folder:

`/Users/zondrius/.hermes/backups/2026-06-01-nous-cutover`

Includes:

- global config
- all eight profile configs
- pre-cutover Nous auth file
- global and profile `auth.json` stores under `auth-stores/`

## Changes Made

| Area | Before | After |
|---|---|---|
| main model routing | several profiles on `provider: nous` | all active profiles on `provider: openai-codex` |
| `coder` | Gemini Flash via Nous | `gpt-5.4` via Codex |
| `schule` | Gemini Flash via Nous | `gpt-5.4` via Codex |
| `finance` | Kimi K2.6 via Nous | `gpt-5.4` via Codex |
| `ideas` | Gemini Flash via Nous | `gpt-5.4-mini` via Codex |
| `research` | Gemini Flash via Nous | `gpt-5.4-mini` via Codex |
| `lernwerkstatt` | Gemini Flash via Nous | `gpt-5.4-mini` via Codex |
| auxiliary routes | Nous/Gemini | Codex + `gpt-5.4-mini` |
| model catalog | remote Nous docs fetch enabled | remote fetch disabled |
| Nous auth | active auth file present | moved to disabled file, backup retained |
| auth stores | `active_provider: nous`, Nous provider/pool entries | `active_provider: openai-codex`, Nous entries removed |

## Intentional Non-Changes

- Upstream Hermes docs under `/Users/zondrius/.hermes/hermes-agent/**` still mention Nous because Hermes is originally from Nous Research.
- Historical reports still mention old Nous state.
- Docker image names and repository references are not changed.
- Swarm preset source code is not changed.

## Remaining Watch Items

- Test a real short run for `neva`, `coder`, `schule`, and `research`.
- Later review whether Swarm `Scribe` and `Sage` should default below GPT-5.5 for routine work.
- Keep the disabled Nous auth files and auth-store backups until after 2026-06-06, then delete only if Chris confirms.
