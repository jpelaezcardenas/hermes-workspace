import type { QueryClient } from '@tanstack/react-query'
import { appendHistoryMessage, chatQueryKeys } from '../chat-queries'
import type { ChatMessage } from '../types'

/**
 * Snapshot optimistic user messages from the history cache before a refetch,
 * then re-inject them after the refetch completes.
 *
 * The refetch replaces the query cache with server data which won't include
 * the optimistic message yet — without re-injection the user's message
 * disappears until the server echoes it.
 *
 * Usage:
 *   const reInject = snapshotOptimisticUserMessages(queryClient, friendlyId, sessionKey)
 *   await queryClient.invalidateQueries(...)
 *   reInject()
 */
export function snapshotOptimisticUserMessages(
  queryClient: QueryClient,
  friendlyId: string,
  sessionKey: string,
): () => void {
  const key = chatQueryKeys.history(friendlyId, sessionKey)
  const prevData = queryClient.getQueryData<Record<string, unknown>>(key)
  const pending = ((prevData?.messages as Array<unknown> | undefined) ?? []).filter(
    (msg: unknown) => {
      const raw = msg as Record<string, unknown>
      return (
        raw.role === 'user' &&
        (String(raw.__optimisticId ?? '').startsWith('opt-') ||
          String(raw.status) === 'sending' ||
          String(raw.status) === 'queued')
      )
    },
  ) as unknown as Array<ChatMessage>

  return () => {
    for (const msg of pending) {
      appendHistoryMessage(queryClient, friendlyId, sessionKey, msg)
    }
  }
}
