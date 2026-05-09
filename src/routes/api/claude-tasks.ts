import { createFileRoute } from '@tanstack/react-router'
import { isAuthenticated } from '../../server/auth-middleware'
import { createClaudeTask, listClaudeTasks } from '../../server/claude-tasks-backend'
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

export async function listClaudeTasksResponse(request: Request) {
  if (!isAuthenticated(request)) {
    return jsonResponse({ error: 'Unauthorized' }, 401)
  }

  const url = new URL(request.url)
  const projectId = await requestProjectId(request)
  const tasks = await listClaudeTasks({
    column: url.searchParams.get('column'),
    assignee: url.searchParams.get('assignee'),
    priority: url.searchParams.get('priority'),
    includeDone: url.searchParams.get('include_done') === 'true',
    projectId,
  })

  return jsonResponse({ tasks })
}

export async function createClaudeTasksResponse(request: Request) {
  if (!isAuthenticated(request)) {
    return jsonResponse({ error: 'Unauthorized' }, 401)
  }

  try {
    const body = (await request.json()) as Record<string, unknown>
    if (!body.title || typeof body.title !== 'string') {
      return jsonResponse({ error: 'title is required' }, 400)
    }

    const projectId = explicitProjectId(request, body)
    if (!projectId) return projectIdRequiredResponse()

    const task = await createClaudeTask({
      title: body.title,
      description: typeof body.description === 'string' ? body.description : '',
      column: isTaskColumn(body.column) ? body.column : undefined,
      priority: isTaskPriority(body.priority) ? body.priority : undefined,
      assignee: typeof body.assignee === 'string' ? body.assignee : null,
      tags: Array.isArray(body.tags) ? body.tags.filter((tag): tag is string => typeof tag === 'string') : [],
      due_date: typeof body.due_date === 'string' ? body.due_date : null,
      created_by: typeof body.created_by === 'string' ? body.created_by : 'user',
      projectId,
    })

    return jsonResponse({ task }, 201)
  } catch {
    return jsonResponse({ error: 'Invalid request body' }, 400)
  }
}

export const Route = createFileRoute('/api/claude-tasks')({
  server: {
    handlers: {
      GET: async ({ request }) => listClaudeTasksResponse(request),
      POST: async ({ request }) => createClaudeTasksResponse(request),
    },
  },
})
