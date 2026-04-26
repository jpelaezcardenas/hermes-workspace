# Bugbot rules for server integration code

Apply these rules to changes under `src/server/**`.

## Hermes gateway and API clients

Review `hermes-api.ts`, `hermes-dashboard-api.ts`, `gateway.ts`, `gateway-capabilities.ts`, and `openai-compat-api.ts` for:

- Correct capability detection between portable OpenAI-compatible mode and enhanced Hermes mode.
- Safe fallback behavior when optional Hermes endpoints are absent, slow, or return partial payloads.
- SSE parsers that preserve chunk boundaries, multi-line `data:` fields, event names, and final flushes.
- Proper abort/timeout handling that does not leave dangling readers, websocket requests, timers, or active-run markers.
- Auth behavior that does not leak bearer tokens and does not send optional session headers to backends that reject them.

## Session and persistence stores

Review session stores for:

- Durable writes before UI state assumes persistence has succeeded.
- No silent data loss from cache truncation, session-key remapping, or failed JSON parsing.
- Consistent timestamp units between Hermes seconds and browser milliseconds.
- Preservation of tool-call metadata, attachments, user text, and assistant final content.

## Local and portable backends

For local providers and OpenAI-compatible fallback paths, check:

- Model/provider selection does not route a local model to the wrong base URL.
- Multimodal payloads use OpenAI-compatible content parts only when the backend can plausibly accept them.
- Local history avoids duplicate user turns when persisted history is combined with client-sent history.
- Tool-progress compatibility events remain display-only and do not imply real tool execution unless the backend provides it.

## Tests expected by Bugbot

Request focused tests when changes affect:

- SSE parsing or event normalization.
- Capability probing.
- Session-key resolution.
- Local session persistence.
- Auth, CSRF, or rate limiting.
