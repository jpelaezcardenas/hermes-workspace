# Bugbot PR Review Rules

Bugbot reviews for Hermes Workspace should focus on defects that can break real
users across browser, phone/cloud sessions, and desktop agent-window workflows.
Prefer concrete, reproducible findings over style commentary.

## Review priorities

1. **Streaming correctness**
   - Check whether SSE/event-stream parsing handles chunk boundaries, multiline
     `data:` fields, `[DONE]`, aborts, reconnects, and late events.
   - Ensure direct send streams and background chat-event streams do not double
     render or suppress each other incorrectly.
   - Verify final messages preserve reasoning, tool calls, artifacts, usage, and
     interrupted/failed state when streaming state clears.

2. **Session and message durability**
   - Look for places where optimistic user messages can disappear after session
     resolution, navigation, refetch, mobile refresh, reconnect, or route changes.
   - Check that `sessionKey`, `friendlyId`, `runId`, `clientId`, and
     `idempotencyKey` are preserved across API routes, stores, query caches, and
     UI callbacks.
   - Flag changes that make local/portable mode diverge from enhanced Hermes mode
     without an explicit fallback.

3. **Tool-call and diff visibility**
   - Verify tool IDs, names, args, previews, results, artifacts, file paths, and
     edit/diff metadata are not dropped while translating between Hermes agent
     payloads and workspace UI payloads.
   - Check whether completed tool calls remain visible after the streaming
     placeholder is replaced by persisted history.
   - Treat missing or mismatched tool-call IDs as high risk because they can merge
     separate tool executions or overwrite details.

4. **Cross-device UX**
   - Review behavior for phone/cloud usage and desktop agent-window usage:
     reconnects, background tabs, narrow screens, touch input, keyboard safe
     areas, and long-running agent sessions.
   - Watch for loaders, timers, or polling fallbacks that can get stuck forever or
     clear too aggressively.

5. **Security and data safety**
   - Check authentication/CSRF handling on API routes.
   - Flag leakage of tokens, bearer headers, local file contents, attachment
     base64 payloads, or absolute host paths in logs or UI.
   - Validate file, terminal, memory, and profile APIs do not allow path traversal
     or unintended mutation.

6. **Compatibility**
   - Hermes Workspace supports portable OpenAI-compatible backends and enhanced
     Hermes APIs. Changes should preserve graceful degradation when optional
     Hermes endpoints are unavailable.
   - Capability detection should not convert optional APIs into startup blockers.

## Findings standard

- Lead with bugs, regressions, missing tests, or unclear invariants.
- Include file and line references.
- Explain the user-visible failure mode and why the code path can reach it.
- Prefer one finding per distinct root cause.
- Do not report pure formatting preferences unless they hide a real defect.

## Test expectations

For changed code, check for focused tests near the affected behavior:

- stream adapter tests for SSE/event translation
- chat store tests for dedup, ordering, and persistence behavior
- component/hook tests for optimistic send and streaming UI behavior
- server tests for capability detection, auth, path handling, and persistence

If tests are absent, report that only when the changed behavior has meaningful
risk or previously regressed.
