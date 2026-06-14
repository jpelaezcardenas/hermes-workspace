# Nous to Codex Cutover - 2026-06-01

Signal: Green for configuration cutover. Yellow only for optional live task smoke.

## What Changed

- Nous active model routing removed from Hermes profile configs.
- Global, Neva and Memory remain on `openai-codex/gpt-5.4-mini`.
- `coder`, `schule` and `finance` now use `openai-codex/gpt-5.4`.
- `ideas`, `research` and `lernwerkstatt` now use `openai-codex/gpt-5.4-mini`.
- Auxiliary routes that used Nous/Gemini now use `openai-codex/gpt-5.4-mini`.
- Remote model catalog fetch to the Nous docs domain is disabled.
- Old Nous auth file is disabled, not deleted.
- Global and profile auth stores now use `active_provider: openai-codex`; Nous provider and credential-pool entries were removed from active stores after backup.

## Backup

`/Users/zondrius/.hermes/backups/2026-06-01-nous-cutover`

## Why

Nous subscription ends on 2026-06-06. Hermes should not rely on active Nous billing or gateway routing after that date.

## GPT-5.5 Rule

GPT-5.5 is not the default. It remains reserved for:

- real build slices;
- hard repro/fix triage;
- final product architecture;
- CEO synthesis;
- complex RiskGate decisions.

## Still Open

- Optional: run a tiny real model-prompt smoke for `neva`, `coder`, `schule`, `research` only if Chris explicitly wants the possible billing hit.
- Decide later whether Swarm `Sage` and `Scribe` should be lowered from GPT-5.5 for routine tasks.
- After 2026-06-06, decide whether to delete the disabled Nous auth file permanently.

## Validation

- YAML parse passed for all modified configs.
- Active config/auth search returned no Nous provider, old Gemini/Kimi model defaults, active Nous credential-pool entries, Nous catalog URL, or `use_gateway: true`.
- `hermes profile list` shows global/default, `neva`, `memory`, `ideas`, `research`, `lernwerkstatt` on `gpt-5.4-mini`; `coder`, `schule`, `finance` on `gpt-5.4`.
- `hermes status` shows Provider: OpenAI Codex; OpenAI Codex logged in; Nous Portal not logged in.
- Non-prompt Codex profile smoke completed on 2026-06-01: no active `nous` in active config/auth, no `gpt-5.5` model route, Neva gateway running. See `/Users/zondrius/hermes-workspace/reports/hermes-control/codex-profile-smoke-2026-06-01.md`.

## Not Touched

- No `/Users/zondrius/hermes-workspace/src/**` files.
- No cronjobs.
- No handoff files.
- No external installs, commits, pushes or deletes.
- No model prompt was sent during the non-prompt profile smoke.
