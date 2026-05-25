import { createFileRoute } from '@tanstack/react-router'
import { requireLocalOrAuth } from '../../server/auth-middleware'
import {
  listTerminalSessions,
  updateTerminalSessionLabel,
} from '../../server/terminal-sessions'
import { requireJsonContentType } from '../../server/rate-limit'

export const Route = createFileRoute('/api/terminal-sessions')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        if (!requireLocalOrAuth(request)) {
          return new Response(
            JSON.stringify({ ok: false, error: 'Unauthorized' }),
            {
              status: 401,
              headers: { 'Content-Type': 'application/json' },
            },
          )
        }

        return new Response(
          JSON.stringify({ ok: true, sessions: listTerminalSessions() }),
          {
            headers: {
              'Content-Type': 'application/json',
              'Cache-Control': 'no-store',
            },
          },
        )
      },
      POST: async ({ request }) => {
        if (!requireLocalOrAuth(request)) {
          return new Response(
            JSON.stringify({ ok: false, error: 'Unauthorized' }),
            {
              status: 401,
              headers: { 'Content-Type': 'application/json' },
            },
          )
        }
        const csrfCheck = requireJsonContentType(request)
        if (csrfCheck) return csrfCheck

        const body = (await request.json().catch(() => ({}))) as Record<
          string,
          unknown
        >
        const action =
          typeof body.action === 'string' ? body.action.trim() : ''
        const sessionId =
          typeof body.sessionId === 'string' ? body.sessionId.trim() : ''
        const label = typeof body.label === 'string' ? body.label : ''

        if (action !== 'rename') {
          return new Response(
            JSON.stringify({ ok: false, error: 'Unsupported action' }),
            {
              status: 400,
              headers: { 'Content-Type': 'application/json' },
            },
          )
        }
        if (!sessionId) {
          return new Response(
            JSON.stringify({ ok: false, error: 'sessionId required' }),
            {
              status: 400,
              headers: { 'Content-Type': 'application/json' },
            },
          )
        }
        if (!label.trim()) {
          return new Response(
            JSON.stringify({ ok: false, error: 'label required' }),
            {
              status: 400,
              headers: { 'Content-Type': 'application/json' },
            },
          )
        }

        const session = updateTerminalSessionLabel(sessionId, label)
        if (!session) {
          return new Response(
            JSON.stringify({
              ok: false,
              error: 'Terminal session not found or label invalid',
            }),
            {
              status: 404,
              headers: { 'Content-Type': 'application/json' },
            },
          )
        }

        return new Response(JSON.stringify({ ok: true, session }), {
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store',
          },
        })
      },
    },
  },
})
