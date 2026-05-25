import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import { requireLocalOrAuth } from '../../../../server/auth-middleware'
import { recordAgentSessionState } from '../../../../server/knowledge-memory-fabric'
import { requireJsonContentType } from '../../../../server/rate-limit'

export const Route = createFileRoute('/api/knowledge/fabric/session-state')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        if (!requireLocalOrAuth(request)) {
          return json({ ok: false, error: 'Unauthorized' }, { status: 401 })
        }
        const contentTypeCheck = requireJsonContentType(request)
        if (contentTypeCheck) return contentTypeCheck
        try {
          const body = (await request.json()) as Record<string, unknown>
          return json(await recordAgentSessionState({
            summary: body.summary,
            memoryScope: body.memoryScope ?? body.memory_scope,
            agentSource: body.agentSource ?? body.agent_source,
            sessionId: body.sessionId ?? body.session_id,
            project: body.project,
            metadata: body.metadata,
          }))
        } catch (error) {
          return json({ ok: false, error: error instanceof Error ? error.message : 'Session state recording failed' }, { status: 400 })
        }
      },
    },
  },
})
