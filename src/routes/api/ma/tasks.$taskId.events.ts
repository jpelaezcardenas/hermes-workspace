import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import { listTaskEvents } from '../../../server/multi-agent/events'
import { getTask } from '../../../server/multi-agent/store'
import { getRouteEventLog, getRouteStore, requireAuthenticated, safeError } from './-helpers'

export const Route = createFileRoute('/api/ma/tasks/$taskId/events')({
  server: {
    handlers: {
      GET: async ({ request, params }) => {
        const authFailure = requireAuthenticated(request)
        if (authFailure) return authFailure

        try {
          const store = getRouteStore()
          const task = getTask(store, params.taskId)
          if (!task) {
            return json({ ok: false, events: [], error: `Task not found: ${params.taskId}` }, { status: 404 })
          }

          const events = listTaskEvents(getRouteEventLog(), params.taskId)
          return json({ ok: true, events })
        } catch (err) {
          return json({ ok: false, events: [], error: safeError(err) }, { status: 400 })
        }
      },
    },
  },
})
