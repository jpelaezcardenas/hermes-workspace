import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import { isAuthenticated } from '../../server/auth-middleware'
import {
  buildProjectRegistry,
  setActiveProjectById,
} from '../../server/project-registry'

export const Route = createFileRoute('/api/projects')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        if (!isAuthenticated(request)) {
          return json({ ok: false, error: 'Unauthorized' }, { status: 401 })
        }
        try {
          return json(await buildProjectRegistry())
        } catch (err) {
          return json(
            {
              activeProjectId: null,
              projects: [],
              fetchedAt: Date.now(),
              error: err instanceof Error ? err.message : String(err),
            },
            { status: 500 },
          )
        }
      },
      POST: async ({ request }) => {
        if (!isAuthenticated(request)) {
          return json({ ok: false, error: 'Unauthorized' }, { status: 401 })
        }
        try {
          const body = (await request.json().catch(() => ({}))) as {
            activeProjectId?: unknown
          }
          const activeProjectId =
            typeof body.activeProjectId === 'string'
              ? body.activeProjectId.trim()
              : ''
          if (!activeProjectId) {
            return json(
              { ok: false, error: 'activeProjectId is required' },
              { status: 400 },
            )
          }
          return json(await setActiveProjectById(activeProjectId))
        } catch (err) {
          const message = err instanceof Error ? err.message : String(err)
          return json(
            {
              activeProjectId: null,
              projects: [],
              fetchedAt: Date.now(),
              error: message,
            },
            { status: message === 'Project not found' ? 404 : 500 },
          )
        }
      },
    },
  },
})
