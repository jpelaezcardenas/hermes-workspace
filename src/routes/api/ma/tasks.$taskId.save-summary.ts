import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import {
  getTask,
  updateRun,
  updateTask,
} from '../../../server/multi-agent/store'
import { saveTaskSummaryToObsidian } from '../../../server/multi-agent/memory-sync'
import { getRouteStore, requireAuthenticated, safeError } from './-helpers'

function envObsidianRunsDir(): string | undefined {
  const value = process.env.HERMES_MA_OBSIDIAN_RUNS_DIR?.trim()
  return value || undefined
}

export const Route = createFileRoute('/api/ma/tasks/$taskId/save-summary')({
  server: {
    handlers: {
      POST: async ({ request, params }) => {
        const authFailure = requireAuthenticated(request)
        if (authFailure) return authFailure

        try {
          const body = (await request.json().catch(() => ({}))) as Record<string, unknown>
          const summary = typeof body.summary === 'string' ? body.summary.trim() : ''
          if (!summary) {
            return json({ ok: false, error: 'Task final summary is required' }, { status: 400 })
          }

          const store = getRouteStore()
          const task = getTask(store, params.taskId)
          if (!task) {
            return json({ ok: false, error: `Task not found: ${params.taskId}` }, { status: 404 })
          }
          if (!task.latestRunId) {
            return json({ ok: false, error: `Task has no run yet: ${params.taskId}` }, { status: 409 })
          }

          let run
          try {
            run = updateRun(store, task.latestRunId, { summary })
          } catch {
            return json({ ok: false, error: `Run not found: ${task.latestRunId}` }, { status: 404 })
          }

          const updatedTask = updateTask(store, task.id, { finalSummary: summary })

          const response: {
            ok: true
            task: typeof updatedTask
            run: typeof run
            obsidian?: { path: string }
          } = { ok: true, task: updatedTask, run }

          if (body.saveToObsidian === true) {
            response.obsidian = saveTaskSummaryToObsidian({
              obsidianRoot: envObsidianRunsDir(),
              task: updatedTask,
              run,
              summary,
              savedAt: store.now(),
            })
          }

          return json(response)
        } catch (err) {
          return json({ ok: false, error: safeError(err) }, { status: 500 })
        }
      },
    },
  },
})
