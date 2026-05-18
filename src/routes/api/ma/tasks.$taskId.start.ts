import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import { appendTaskEvent } from '../../../server/multi-agent/events'
import { defaultMultiAgentProfiles } from '../../../server/multi-agent/profiles'
import { createRun, getTask, markTaskWorktreeReady } from '../../../server/multi-agent/store'
import { launchHermesWorker } from '../../../server/multi-agent/hermes-worker-runtime'
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
        const eventLog = getRouteEventLog()
        const task = getTask(store, params.taskId)
        if (!task) {
          return json({ ok: false, error: `Task not found: ${params.taskId}` }, { status: 404 })
        }

        try {
          const project = resolveConfiguredProject(task.projectId)
          const worktree = task.worktreePath && task.branchName
            ? { worktreePath: task.worktreePath, branchName: task.branchName }
            : await createTaskWorktree(project, task)
          const readyTask = markTaskWorktreeReady(store, task.id, worktree)
          if (!task.worktreePath || !task.branchName) {
            appendTaskEvent(eventLog, {
              id: `event-${store.id()}`,
              taskId: task.id,
              type: 'worktree.created' as const,
              message: `Created worktree for ${task.title}`,
              payload: worktree,
              createdAt: store.now(),
            })
          }

          const profile =
            defaultMultiAgentProfiles(store.now()).find(
              (candidate) => candidate.id === readyTask.assigneeProfileId,
            ) ?? defaultMultiAgentProfiles(store.now())[0]
          const run = createRun(store, {
            taskId: readyTask.id,
            profileId: profile.id,
            status: 'starting',
          })
          const runningTask = getTask(store, readyTask.id) ?? readyTask
          const workerCommand = process.env.HERMES_MA_WORKER_COMMAND || undefined
          const workerArgs = process.env.HERMES_MA_WORKER_ARGS_JSON
            ? (JSON.parse(process.env.HERMES_MA_WORKER_ARGS_JSON) as string[])
            : undefined
          launchHermesWorker({
            store,
            eventLog,
            task: runningTask,
            run,
            project,
            profile,
            command: workerCommand,
            args: workerArgs,
          })

          return json({ ok: true, task: getTask(store, task.id) ?? runningTask, run })
        } catch (err) {
          return json({ ok: false, error: safeError(err) }, { status: statusForStartTaskError(err) })
        }
      },
    },
  },
})
