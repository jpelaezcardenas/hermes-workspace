# Validation - Nous to Codex Cutover

Date: 2026-06-01
Status: validated-complete

## Expected Post-Cutover State

| Profile | Default | Provider |
|---|---|---|
| global | `gpt-5.4-mini` | `openai-codex` |
| `neva` | `gpt-5.4-mini` | `openai-codex` |
| `memory` | `gpt-5.4-mini` | `openai-codex` |
| `ideas` | `gpt-5.4-mini` | `openai-codex` |
| `research` | `gpt-5.4-mini` | `openai-codex` |
| `lernwerkstatt` | `gpt-5.4-mini` | `openai-codex` |
| `coder` | `gpt-5.4` | `openai-codex` |
| `schule` | `gpt-5.4` | `openai-codex` |
| `finance` | `gpt-5.4` | `openai-codex` |

## Validation Checklist

- [x] Backups exist.
- [x] YAML parses for every modified config.
- [x] Active configs contain no `provider: nous`.
- [x] Active configs contain no Nous Gemini/Kimi defaults.
- [x] Active configs do not fetch the model catalog from `hermes-agent.nousresearch.com`.
- [x] Active auth stores use `active_provider: openai-codex`.
- [x] Active auth stores contain no Nous provider or credential-pool entries.
- [x] Nous shared auth is disabled, with backup retained.
- [x] Hermes profile listing still works.
- [x] Hermes status can be read without exposing secrets.

## Fresh Validation Evidence

- YAML/config validation passed for global config plus `coder`, `finance`, `ideas`, `lernwerkstatt`, `memory`, `neva`, `research`, `schule`.
- Active config search returned no hits for `provider: nous`, old Gemini/Kimi defaults, Nous catalog URL, or `use_gateway: true`.
- Auth-store validation passed for global auth plus all eight profile auth stores; active provider is `openai-codex` and provider keys are `copilot, openai-codex`.
- Shared active `/Users/zondrius/.hermes/shared/nous_auth.json` is absent.
- `hermes profile list` returned all profiles with Codex models.
- `hermes status` returned Provider: OpenAI Codex, OpenAI Codex logged in, Nous Portal not logged in.

## Notes

This validation covers active Hermes config files only. Historical reports, archived handoffs and upstream Hermes docs may still mention Nous and are intentionally out of scope.
