import { createFileRoute } from '@tanstack/react-router'
import { isAuthenticated } from '../../server/auth-middleware'
import { getClaudeTask, moveClaudeTask, updateClaudeTask } from '../../server/claude-tasks-backend'
import type { TaskColumn, TaskPriority } from '../../server/claude-tasks-backend'
import { sanitizeProjectSlug } from '../../server/project-catalog'
import { loadWorkspaceCatalog } from './workspace'

function jsonResponse(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

function isTaskColumn(value: unknown): value is TaskColumn {
  return (
    value === 'backlog' ||
    value === 'todo' ||
    value === 'in_progress' ||
    value === 'review' ||
    value === 'blocked' ||
    value === 'done'
  )
}

function isTaskPriority(value: unknown): value is TaskPriority {
  return value === 'high' || value === 'medium' || value === 'low'
}

function explicitProjectId(request: Request, body?: Record<string, unknown>): string | null {
  const url = new URL(request.url)
  return sanitizeProjectSlug(
    typeof body?.projectId === 'string' ? body.projectId : url.searchParams.get('projectId'),
  )
}

async function requestProjectId(request: Request, body?: Record<string, unknown>): Promise<string | null> {
  const explicit = explicitProjectId(request, body)
  if (explicit) return explicit
  const catalog = await loadWorkspaceCatalog()
  return catalog.projectSlug ?? null
}

function projectIdRequiredResponse() {
  return jsonResponse({ error: 'projectId is required for task writes' }, 400)
}

export const Route = createFileRoute('/api/claude-tasks/$taskId')({
  server: {
    handlers: {
      GET: async ({ request, params }) => {
        if (!isAuthenticated(request)) {
          return jsonResponse({ error: 'Unauthorized' }, 401)
        }

        const task = await getClaudeTask(params.taskId, await requestProjectId(request))
        if (!task) return jsonResponse({ error: 'Task not found' }, 404)
        return jsonResponse({ task })
      },

      PATCH: async ({ request, params }) => {
        if (!isAuthenticated(request)) {
          return jsonResponse({ error: 'Unauthorized' }, 401)
        }

        try {
          const body = (await request.json()) as Record<string, unknown>
          const projectId = explicitProjectId(request, body)
          if (!projectId) return projectIdRequiredResponse()
          const task = await updateClaudeTask(params.taskId, {
            title: typeof body.title === 'string' ? body.title : undefined,
            description: typeof body.description === 'string' ? body.description : undefined,
            column: isTaskColumn(body.column) ? body.column : undefined,
            priority: isTaskPriority(body.priority) ? body.priority : undefined,
            assignee: body.assignee === null || typeof body.assignee === 'string' ? body.assignee : undefined,
            tags: Array.isArray(body.tags) ? body.tags.filter((tag): tag is string => typeof tag === 'string') : undefined,
            due_date: body.due_date === null || typeof body.due_date === 'string' ? body.due_date : undefined,
            projectId,
          })

          if (!task) return jsonResponse({ error: 'Task not found' }, 404)
          return jsonResponse({ task })
        } catch {
          return jsonResponse({ error: 'Invalid request body' }, 400)
        }
      },

      DELETE: async ({ request }) => {
        if (!isAuthenticated(request)) {
          return jsonResponse({ error: 'Unauthorized' }, 401)
        }

        return jsonResponse({ error: 'Delete is not supported by the shared Agent Kanban backend' }, 405)
      },

      POST: async ({ request, params }) => {
        if (!isAuthenticated(request)) {
          return jsonResponse({ error: 'Unauthorized' }, 401)
        }

        const url = new URL(request.url)
        const action = url.searchParams.get('action') || 'move'
        if (action !== 'move') {
          return jsonResponse({ error: `Unsupported action: ${action}` }, 400)
        }

        try {
          const body = (await request.json()) as Record<string, unknown>
          if (!isTaskColumn(body.column)) {
            return jsonResponse({ error: 'column is required' }, 400)
          }
          const projectId = explicitProjectId(request, body)
          if (!projectId) return projectIdRequiredResponse()
          const task = await moveClaudeTask(params.taskId, body.column, projectId)
          if (!task) return jsonResponse({ error: 'Task not found' }, 404)
          return jsonResponse({ task })
        } catch {
          return jsonResponse({ error: 'Invalid request body' }, 400)
        }
      },
    },
  },
})
