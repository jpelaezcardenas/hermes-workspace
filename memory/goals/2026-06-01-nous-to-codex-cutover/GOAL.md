# Nous to Codex Cutover

Date: 2026-06-01
Owner: Chris / Neva / Codex
Status: validated-complete
Deadline: 2026-06-06

## Goal

Remove active Nous billing/routing from Hermes before the Nous subscription ends on 2026-06-06. All active Hermes profiles should use Codex/ChatGPT routing, with GPT-5.5 reserved for premium cases only.

## Success Criteria

- Active profile defaults no longer use `provider: nous`.
- Active auxiliary model routes no longer use Nous/Gemini defaults.
- The remote model catalog does not fetch from the Nous domain during normal use.
- Old Nous credentials are backed up and disabled, not destroyed.
- Auth stores no longer carry `nous` as active provider or credential provider.
- Existing Execution Layer / Swarm work is not touched.
- GPT-5.5 is not made the default everywhere.

## Non-Goals

- No `src/**` edits.
- No cron changes.
- No new profiles.
- No secret deletion.
- No commit/push/deploy.
- No changes to archived historical reports or upstream Hermes docs.

## Target Routing

| Profile | Default | Provider | Reason |
|---|---|---|---|
| `neva` | `gpt-5.4-mini` | `openai-codex` | daily orchestration |
| `memory` | `gpt-5.4-mini` | `openai-codex` | memory hygiene |
| `ideas` | `gpt-5.4-mini` | `openai-codex` | ideation/routine |
| `research` | `gpt-5.4-mini` | `openai-codex` | broad scans |
| `lernwerkstatt` | `gpt-5.4-mini` | `openai-codex` | reserve/routine |
| `coder` | `gpt-5.4` | `openai-codex` | standard coding without GPT-5.5 default |
| `schule` | `gpt-5.4` | `openai-codex` | pedagogical QA |
| `finance` | `gpt-5.4` | `openai-codex` | risk and scenario synthesis |

GPT-5.5 remains allowed only for real build slices, hard triage, final product architecture, CEO synthesis, or complex risk decisions.
