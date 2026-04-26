# Chat UI Bugbot Rules

Apply these rules when reviewing files under `src/screens/chat/**`.

## Streaming UX and Cursor-like agent experience

Flag changes that:

- Cause streaming assistant text, reasoning, tool calls, file diffs, or final
  responses to flicker, disappear, duplicate, or reorder incorrectly.
- Clear streaming state before the final message has copied reasoning/tool
  metadata into durable history/realtime state.
- Break mobile/cloud chat flows, including phone composer behavior, viewport
  sizing, scroll anchoring, keyboard-safe spacing, and reconnect recovery.
- Regress desktop agent-window behavior, including smooth streaming, terminal
  panel coexistence, message actions, and diff/tool-call visibility.

## Optimistic messages and session handoff

Check that:

- New sends create optimistic user messages with stable `clientId` /
  `idempotencyKey` data.
- Session resolution from `/chat/new`, `main`, or portable mode moves or
  reconciles optimistic messages instead of losing them.
- Retried sends do not duplicate confirmed user messages.
- Pending sends survive refresh/navigation until the server confirms or fails
  them.

## History and realtime merge behavior

Flag bugs where:

- `useRealtimeChatHistory`, `useChatHistory`, or query-cache updates trust stale
  history over fresher realtime messages.
- Refetches during active streaming overwrite optimistic or partial content.
- Display filters hide legitimate assistant messages, tool-only status cards, or
  execution notifications that should be visible.
- Deduplication compares only text when attachments, tool calls, timestamps, or
  client IDs are needed.

## UI review expectations

Prefer actionable findings for:

- Accessibility regressions in composer, message actions, and keyboard flows.
- Hidden failure states that only show console warnings.
- Loading spinners with no timeout, reconnect path, or user-visible recovery.
- Components that assume enhanced Hermes APIs are available when portable mode
  must still work.

## Tests to expect

For meaningful chat UI changes, expect targeted tests around:

- `chat-queries` cache updates and optimistic-message reconciliation.
- `use-streaming-message` SSE parsing and done/error/close behavior.
- `chat-store` realtime/streaming merge logic.
- Component-level rendering for tool calls, reasoning, diffs, and mobile layout
  when the change affects visible behavior.
