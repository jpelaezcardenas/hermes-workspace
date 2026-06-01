# Nous to Codex Cutover Execute Plan

## Steps

1. Backup active configs.
   - Copy global `/Users/zondrius/.hermes/config.yaml`.
   - Copy profile configs for `coder`, `finance`, `ideas`, `lernwerkstatt`, `memory`, `neva`, `research`, `schule`.
   - Copy `/Users/zondrius/.hermes/shared/nous_auth.json` if present.

2. Change profile defaults.
   - `coder`, `schule`, `finance`: `openai-codex` + `gpt-5.4`.
   - `ideas`, `research`, `lernwerkstatt`: `openai-codex` + `gpt-5.4-mini`.
   - Keep `neva`, `memory`, global default on `openai-codex` + `gpt-5.4-mini`.

3. Change auxiliary routes.
   - Replace active `provider: nous` + `google/gemini-3-flash-preview` auxiliary routes with `openai-codex` + `gpt-5.4-mini`.

4. Disable Nous catalog fetch.
   - Set `model_catalog.enabled: false`.
   - Set `model_catalog.url: ""`.

5. Disable active Nous credential file without deletion.
   - Move `nous_auth.json` to `nous_auth.json.disabled-2026-06-01`.
   - Keep backup copy in the cutover backup folder.

6. Cut over active auth stores.
   - Backup global and profile `auth.json` files.
   - Remove `nous` from active provider and credential-pool blocks.
   - Set `active_provider` to `openai-codex`.
   - Ensure every profile auth store has an `openai-codex` provider and credential-pool entry.

7. Update Hermes policy docs.
   - Refresh Rollenmatrix model routing policy with the new active defaults.
   - Add cutover report and validation.

8. Validate.
   - YAML parse all modified configs.
   - Search active configs for `provider: nous`, Nous Gemini/Kimi defaults, and Nous remote catalog URLs.
   - Search auth stores for active Nous provider entries.
   - Check Hermes can list profiles.
   - Check global Hermes status without exposing secrets.

## Safety Notes

- No source-code files are part of this cutover.
- Existing dirty Execution Layer work is left alone.
- Historical reports and upstream Hermes documentation may still mention Nous; that is not active billing/routing.
