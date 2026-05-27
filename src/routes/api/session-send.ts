/**
 * ControlSuite-compatible session-send adapter.
 *
 * Operations sends { sessionKey, message } and expects { ok: true } quickly.
 * We forward to the local /api/send-stream endpoint and discard the body
 * (the Operations chat panel polls /api/history at 5s intervals to pick up
 * the reply, so we don't need to hold the stream open here).
 */
import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import { requireLocalOrAuth } from '../../server/auth-middleware'
import { publishChatEvent } from '../../server/chat-event-bus'
import { requireJsonContentType } from '../../server/rate-limit'
import { startServerSideSessionSend } from '../../server/session-send-runner'
import { createPersistedRun } from '../../server/run-store'

export const Route = createFileRoute('/api/session-send')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        if (!requireLocalOrAuth(request)) {
          return json({ ok: false, error: 'Unauthorized' }, { status: 401 })
        }
        const csrfCheck = requireJsonContentType(request)
        if (csrfCheck) return csrfCheck
        try {
          const body = (await request.json()) as Record<string, unknown> & {
            sessionKey?: string
            message?: string
          }
          const sessionKey = (body.sessionKey || '').trim()
          const message = (body.message || '').trim()
          if (!sessionKey) {
            return json(
              { ok: false, error: 'sessionKey is required' },
              { status: 400 },
            )
          }
          if (!message) {
            return json(
              { ok: false, error: 'message is required' },
              { status: 400 },
            )
          }
          const idempotencyKey =
            typeof body.idempotencyKey === 'string' &&
            body.idempotencyKey.trim().length > 0
              ? body.idempotencyKey.trim()
              : crypto.randomUUID()

          await createPersistedRun({
            runId: idempotencyKey,
            sessionKey,
            friendlyId:
              typeof body.friendlyId === 'string' &&
              body.friendlyId.trim().length > 0
                ? body.friendlyId.trim()
                : sessionKey,
          })
          publishChatEvent('turn.accepted', {
            sessionKey,
            friendlyId:
              typeof body.friendlyId === 'string' &&
              body.friendlyId.trim().length > 0
                ? body.friendlyId.trim()
                : sessionKey,
            runId: idempotencyKey,
            timestamp: Date.now(),
            serverSide: true,
          })

          // Fire-and-forget from the browser's perspective, but keep the
          // /api/send-stream response drained on the server so mobile/browser
          // focus loss cannot stall the underlying Hermes run.
          const cookie = request.headers.get('cookie') || ''
          startServerSideSessionSend({
            requestUrl: request.url,
            cookie,
            payload: {
              ...body,
              sessionKey,
              message,
              serverSide: true,
              idempotencyKey,
            },
          })
          return json({
            ok: true,
            sessionKey,
            runId: idempotencyKey,
            queued: true,
            serverSide: true,
          })
        } catch (error) {
          return json(
            {
              ok: false,
              error:
                error instanceof Error
                  ? error.message
                  : 'Failed to queue message',
            },
            { status: 500 },
          )
        }
      },
    },
  },
})
