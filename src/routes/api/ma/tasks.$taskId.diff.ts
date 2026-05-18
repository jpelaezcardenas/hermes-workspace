import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import { getTaskDiff } from '../../../server/multi-agent/diff-manager'
import { getTask } from '../../../server/multi-agent/store'
import { getRouteStore, requireAuthenticated, safeError } from './-helpers'

export const Route = createFileRoute('/api/ma/tasks/$taskId/diff')({
  server: {
    handlers: {
      GET: async ({ request, params }) => {
        const authFailure = requireAuthenticated(request)
        if (authFailure) return authFailure

        try {
          const store = getRouteStore()
          const task = getTask(store, params.taskId)
          if (!task) {
            return json({ ok: false, error: `Task not found: ${params.taskId}` }, { status: 404 })
          }
          if (!task.worktreePath) {
            return json({ ok: false, error: `Task has no worktree yet: ${params.taskId}` }, { status: 409 })
          }

          const diff = getTaskDiff(task.worktreePath)
          return json({ ok: true, diff })
        } catch (err) {
          return json({ ok: false, error: safeError(err) }, { status: 400 })
        }
      },
    },
  },
})
