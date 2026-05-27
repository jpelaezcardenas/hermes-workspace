import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'

import { requireLocalOrAuth } from '../../../../server/auth-middleware'
import { publishChatEvent } from '../../../../server/chat-event-bus'
import { requireJsonContentType } from '../../../../server/rate-limit'
import { createPersistedRun } from '../../../../server/run-store'
import { startServerSideSessionSend } from '../../../../server/session-send-runner'

export const Route = createFileRoute('/api/chat/threads/$threadId/turns')({
  server: {
    handlers: {
      POST: async ({ params, request }) => {
        if (!requireLocalOrAuth(request)) {
          return json({ ok: false, error: 'Unauthorized' }, { status: 401 })
        }
        const csrfCheck = requireJsonContentType(request)
        if (csrfCheck) return csrfCheck

        const body = (await request.json().catch(() => ({}))) as Record<
          string,
          unknown
        >
        const message = typeof body.message === 'string' ? body.message.trim() : ''
        if (!message) {
          return json({ ok: false, error: 'message is required' }, { status: 400 })
        }

        const runId =
          typeof body.idempotencyKey === 'string' &&
          body.idempotencyKey.trim().length > 0
            ? body.idempotencyKey.trim()
            : crypto.randomUUID()
        const sessionKey = params.threadId
        const friendlyId =
          typeof body.friendlyId === 'string' && body.friendlyId.trim().length > 0
            ? body.friendlyId.trim()
            : sessionKey

        await createPersistedRun({ runId, sessionKey, friendlyId })
        publishChatEvent('turn.accepted', {
          threadId: sessionKey,
          sessionKey,
          friendlyId,
          runId,
          timestamp: Date.now(),
          serverSide: true,
        })

        startServerSideSessionSend({
          requestUrl: request.url,
          cookie: request.headers.get('cookie') || '',
          payload: {
            ...body,
            sessionKey,
            friendlyId,
            message,
            serverSide: true,
            idempotencyKey: runId,
          },
        })

        return json({
          ok: true,
          threadId: sessionKey,
          sessionKey,
          turnId: runId,
          runId,
          acceptedAt: Date.now(),
          serverSide: true,
        })
      },
    },
  },
})
