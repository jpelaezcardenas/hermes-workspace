# API Route Bugbot Rules

For changes under `src/routes/api/**`, review the route as an adapter between the browser and Hermes/OpenAI-compatible backends.

## Streaming route checks

- SSE responses must preserve event boundaries: `event: ...\ndata: ...\n\n`, handle chunked reads, and avoid buffering that hides progress.
- Verify every upstream event that affects visible chat state is either forwarded to the direct response stream or intentionally ignored with a clear reason.
- For `/api/send-stream`, ensure direct send-stream events remain the authoritative path for active sends; do not reintroduce duplicate publication through `/api/chat-events`.
- Check that `runId`, `sessionKey`, `friendlyId`, and idempotency/client IDs survive translation so optimistic messages reconcile after session resolution.
- Confirm `started`, `user_message`, `chunk`, `thinking`, `tool`, `artifact`, `done`, and `error` events have enough payload for the UI to render and recover.
- If a stream can terminate without `done`, verify the UI gets a fallback event or the route documents why the client handles closure.

## Session and persistence checks

- New chat/session bootstrap logic must not route a user message to an unrelated internal, cron, or operations-agent session.
- Portable/local mode must persist user and assistant messages consistently in `local-session-store` and must not duplicate history when client history is also supplied.
- Enhanced Hermes mode should use Hermes session APIs when available and degrade clearly when session APIs are unavailable.
- Refetch, fallback, and timeout behavior must not remove optimistic messages before Hermes confirms them or history catches up.

## Request, security, and compatibility checks

- Keep auth and JSON content-type checks on mutating routes.
- Treat request bodies and attachment payloads as untrusted; avoid logging raw content, tokens, or base64 payloads.
- Attachment handling must preserve text/file/image compatibility across current Hermes and OpenAI-compatible providers.
- Errors returned to the browser should be actionable but must not leak secrets, auth headers, or local filesystem internals.

## Testing expectations

- Add or update route/helper tests for stream translation changes, especially for alternate Hermes payload shapes.
- Include tests for dedup/idempotency behavior when changing user-message or session-resolution logic.
- When a full integration test is impractical, unit-test pure translation helpers and state the remaining integration risk in the PR.
