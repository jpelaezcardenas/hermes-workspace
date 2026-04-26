# Store and Client State Bugbot Rules

Apply these rules to changes under `src/stores/**`.

## Review priorities

- Treat Zustand store changes as shared infrastructure. Verify selector stability, immutable updates, and Map/Set cloning before state writes.
- For chat state, ensure realtime messages, streaming state, waiting state, and restored session state stay consistent across navigation, reloads, and reconnects.
- Check persistence changes for safe storage keys, TTL behavior, corruption handling, and cleanup of stale entries.
- Verify optimistic user messages are reconciled by stable IDs, client IDs, nonce/idempotency keys, or conservative content matching.
- Confirm dedup logic does not drop legitimate repeated messages, repeated tool calls, empty attachment-only messages, or final assistant messages with tool metadata.

## Streaming state expectations

- Active streaming state should survive short component unmounts but must clear after terminal `done`, error, or interruption states.
- Tool-call metadata collected during streaming must be preserved on final messages before streaming state is cleared.
- Waiting-state timers and persisted waiting metadata should fail closed: visible recovery or retry affordances are preferable to silent spinner loss.

## Tests to request

- Store unit tests for dedup, optimistic reconciliation, persisted streaming restoration, and done/error cleanup when shared chat behavior changes.
- Regression tests for any bug involving vanished messages, duplicated responses, missing tool details, or stale waiting indicators.
