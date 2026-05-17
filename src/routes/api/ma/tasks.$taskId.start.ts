import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import { appendTaskEvent } from '../../../server/multi-agent/events'
import { getTask, markTaskWorktreeReady } from '../../../server/multi-agent/store'
import { createTaskWorktree } from '../../../server/multi-agent/worktree-manager'
import { getRouteEventLog, getRouteStore, requireAuthenticated, safeError } from './-helpers'
import { MultiAgentProjectNotFoundError, resolveConfiguredProject } from './-project-config'

function statusForStartTaskError(err: unknown): number {
  if (err instanceof MultiAgentProjectNotFoundError) return 404
  if (err instanceof Error && err.message.includes('Worktree path already exists')) return 409
  return 500
}

export const Route = createFileRoute('/api/ma/tasks/$taskId/start')({
  server: {
    handlers: {
      POST: async ({ request, params }) => {
        const authFailure = requireAuthenticated(request)
        if (authFailure) return authFailure

        const store = getRouteStore()
        const task = getTask(store, params.taskId)
        if (!task) {
          return json({ ok: false, error: `Task not found: ${params.taskId}` }, { status: 404 })
        }

        try {
          const project = resolveConfiguredProject(task.projectId)
          const worktree = await createTaskWorktree(project, task)
          const updatedTask = markTaskWorktreeReady(store, task.id, worktree)
          const event = {
            id: `event-${store.id()}`,
            taskId: task.id,
            type: 'worktree.created' as const,
            message: `Created worktree for ${task.title}`,
            payload: worktree,
            createdAt: store.now(),
          }
          appendTaskEvent(getRouteEventLog(), event)

          return json({ ok: true, task: updatedTask, event })
        } catch (err) {
          return json({ ok: false, error: safeError(err) }, { status: statusForStartTaskError(err) })
        }
      },
    },
  },
})
