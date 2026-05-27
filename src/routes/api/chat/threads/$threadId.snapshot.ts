import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'

import { requireLocalOrAuth } from '../../../../server/auth-middleware'
import { getChatRuntimeSnapshot } from '../../../../server/chat-runtime-store'

export const Route = createFileRoute('/api/chat/threads/$threadId/snapshot')({
  server: {
    handlers: {
      GET: async ({ params, request }) => {
        if (!requireLocalOrAuth(request)) {
          return json({ ok: false, error: 'Unauthorized' }, { status: 401 })
        }
        const url = new URL(request.url)
        const limit = Number(url.searchParams.get('limit') || 500)
        const snapshot = await getChatRuntimeSnapshot(params.threadId, limit)
        return json({ ok: true, ...snapshot })
      },
    },
  },
})
