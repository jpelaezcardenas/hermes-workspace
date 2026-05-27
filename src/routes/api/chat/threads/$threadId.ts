import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'

import { requireLocalOrAuth } from '../../../../server/auth-middleware'
import { getChatRuntimeSnapshot } from '../../../../server/chat-runtime-store'

export const Route = createFileRoute('/api/chat/threads/$threadId')({
  server: {
    handlers: {
      GET: async ({ params, request }) => {
        if (!requireLocalOrAuth(request)) {
          return json({ ok: false, error: 'Unauthorized' }, { status: 401 })
        }
        const snapshot = await getChatRuntimeSnapshot(params.threadId, 1)
        return json({
          ok: true,
          thread: {
            threadId: params.threadId,
            cursor: snapshot.cursor,
            updatedAt: snapshot.events.at(-1)?.timestamp ?? null,
          },
        })
      },
    },
  },
})
