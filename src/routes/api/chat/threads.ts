import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'

import { requireLocalOrAuth } from '../../../server/auth-middleware'
import { listChatRuntimeThreads } from '../../../server/chat-runtime-store'

export const Route = createFileRoute('/api/chat/threads')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        if (!requireLocalOrAuth(request)) {
          return json({ ok: false, error: 'Unauthorized' }, { status: 401 })
        }
        const url = new URL(request.url)
        const limit = Number(url.searchParams.get('limit') || 100)
        const threads = await listChatRuntimeThreads(limit)
        return json({ ok: true, threads })
      },
      POST: async ({ request }) => {
        if (!requireLocalOrAuth(request)) {
          return json({ ok: false, error: 'Unauthorized' }, { status: 401 })
        }
        const body = (await request.json().catch(() => ({}))) as Record<
          string,
          unknown
        >
        const requested =
          typeof body.threadId === 'string' && body.threadId.trim().length > 0
            ? body.threadId.trim()
            : crypto.randomUUID()
        return json({
          ok: true,
          thread: {
            threadId: requested,
            createdAt: Date.now(),
          },
        })
      },
    },
  },
})
