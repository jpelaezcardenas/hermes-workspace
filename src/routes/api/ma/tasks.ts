import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import { createTask, listTasks } from '../../../server/multi-agent/store'
import type { MultiAgentPriority, MultiAgentTaskStatus } from '../../../server/multi-agent/types'
import { getRouteStore, requireAuthenticated, safeError } from './-helpers'

const TASK_STATUSES = new Set<MultiAgentTaskStatus>([
  'backlog',
  'ready',
  'running',
  'needs_approval',
  'review',
  'blocked',
  'done',
  'failed',
  'cancelled',
])

const TASK_PRIORITIES = new Set<MultiAgentPriority>(['low', 'medium', 'high', 'urgent'])

function trimmedString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : ''
}

function optionalStringArray(value: unknown): string[] | undefined {
  if (value === undefined) return undefined
  if (!Array.isArray(value)) throw new Error('acceptanceCriteria must be an array')
  return value.map((item) => trimmedString(item)).filter(Boolean)
}

function parseStatus(value: unknown): MultiAgentTaskStatus | undefined {
  const status = trimmedString(value)
  if (!status) return undefined
  if (!TASK_STATUSES.has(status as MultiAgentTaskStatus)) {
    throw new Error(`Unsupported task status: ${status}`)
  }
  return status as MultiAgentTaskStatus
}

function parsePriority(value: unknown): MultiAgentPriority | undefined {
  const priority = trimmedString(value)
  if (!priority) return undefined
  if (!TASK_PRIORITIES.has(priority as MultiAgentPriority)) {
    throw new Error(`Unsupported task priority: ${priority}`)
  }
  return priority as MultiAgentPriority
}

export const Route = createFileRoute('/api/ma/tasks')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const authFailure = requireAuthenticated(request)
        if (authFailure) return authFailure

        try {
          const url = new URL(request.url)
          const status = parseStatus(url.searchParams.get('status'))
          const projectId = url.searchParams.get('project_id') ?? url.searchParams.get('projectId') ?? undefined
          const tasks = listTasks(getRouteStore(), { projectId, status })
          return json({ ok: true, tasks })
        } catch (err) {
          return json({ ok: false, tasks: [], error: safeError(err) }, { status: 400 })
        }
      },
      POST: async ({ request }) => {
        const authFailure = requireAuthenticated(request)
        if (authFailure) return authFailure

        try {
          const body = (await request.json().catch(() => ({}))) as Record<string, unknown>
          const projectId = trimmedString(body.projectId ?? body.project_id)
          const title = trimmedString(body.title)
          const description = trimmedString(body.description)
          const assigneeProfileId = trimmedString(body.assigneeProfileId ?? body.assignee_profile_id)

          if (!projectId) throw new Error('projectId is required')
          if (!title) throw new Error('title is required')
          if (!assigneeProfileId) throw new Error('assigneeProfileId is required')

          const task = createTask(getRouteStore(), {
            projectId,
            title,
            description,
            assigneeProfileId,
            priority: parsePriority(body.priority),
            status: parseStatus(body.status),
            workPacket: trimmedString(body.workPacket ?? body.work_packet),
            acceptanceCriteria: optionalStringArray(
              body.acceptanceCriteria ?? body.acceptance_criteria,
            ),
          })

          return json({ ok: true, task }, { status: 201 })
        } catch (err) {
          return json({ ok: false, error: safeError(err) }, { status: 400 })
        }
      },
    },
  },
})
