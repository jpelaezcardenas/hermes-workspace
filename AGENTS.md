# Hermes Workspace Agent Guide

## Product direction

Hermes Workspace is a desktop and cloud-friendly workspace for Hermes Agent:
chat, sessions, streaming agent activity, tools, file diffs, edits, approvals,
memory, skills, jobs, and multi-agent workflows. The core product must remain
usable from both phone/cloud sessions and desktop agent windows.

Treat streaming chat as a first-class UX. Users should be able to understand
what the agent is doing in real time: reasoning/status, tool calls, tool
results, file edits, diffs, approvals, final responses, reconnects, and session
handoffs should be visible, ordered, and recoverable.

## Architecture landmarks

- `src/routes/api/send-stream.ts` is the browser-facing send stream adapter.
  It translates Hermes and portable OpenAI-compatible streaming payloads into
  UI events.
- `src/routes/api/chat-events.ts` and `src/server/chat-event-bus.ts` fan out
  background chat events. Avoid double-publishing events already delivered by
  `/api/send-stream`.
- `src/server/hermes-api.ts`, `src/server/openai-compat-api.ts`, and
  `src/server/gateway-capabilities.ts` define backend capability detection and
  Hermes/OpenAI-compatible client behavior.
- `src/screens/chat/**` owns chat UX, optimistic sends, session resolution,
  streaming placeholders, history merging, mobile layout, and composer flows.
- `src/stores/chat-store.ts` owns realtime message buffers, streaming state,
  waiting state, deduplication, and stream-state persistence.
- `src/server/local-session-store.ts` backs portable/local sessions when
  Hermes session APIs are unavailable.

## Engineering principles

- Prefer the existing transport model:
  - `/api/send-stream` is authoritative for active sends.
  - `/api/chat-events` is for background/live events and reconnect backfill.
  - History fetches are the durable backstop.
- Preserve optimistic user messages until the server confirms or history
  backfills them. Do not let refetches make sent messages disappear.
- Preserve tool metadata across streaming and history handoff:
  `toolCallId`, name, phase, args, preview, result, artifacts, and errors.
- Keep Hermes-native APIs as enhancement layers. Core chat should degrade
  gracefully through OpenAI-compatible portable mode when session, memory,
  skills, or config APIs are missing.
- When changing streaming behavior, consider ordering, deduplication,
  reconnects, tab refreshes, mobile viewport changes, and fast tool runs that
  can complete before React renders.
- Keep UI states explicit: sending, queued, accepted, streaming, handoff,
  complete, interrupted, failed, and unavailable should not be conflated.
- Avoid broad rewrites in shared chat/session code unless the behavior and
  tests are updated together.

## Testing expectations

- Add or update focused tests for stream parsing, event translation,
  optimistic-message reconciliation, history merging, and local-session
  persistence when touched.
- For API route stream changes, prefer small helper functions that can be
  unit-tested without opening a real SSE connection.
- Run focused tests first, then lint changed files. Use the package scripts in
  `package.json`:
  - `pnpm test <path>`
  - `pnpm exec eslint <changed files>`
- Note known lint warnings separately from new errors. Do not hide new
  warnings by changing unrelated files.

## UX quality bar

- Streaming should feel Cursor-like: incremental text, clear tool activity,
  visible file/diff actions, durable final messages, and minimal flicker.
- Mobile/cloud and desktop/macbook experiences should share the same session
  truth. A session opened on one surface should not lose user messages, tool
  activity, or final responses on another.
- If backend capabilities are partial, show intentional degraded states instead
  of broken loaders or raw transport errors.

## Large changes

For large or ambiguous work, first gather code context and then share a concise
implementation plan before editing. Keep the plan technical: affected files,
data flow, risks, and verification. Do not estimate calendar time.
