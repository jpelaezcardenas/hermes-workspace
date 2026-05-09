import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import { z } from 'zod'
import { requireLocalOrAuth } from '../../server/auth-middleware'
import { createKanbanCard, getKanbanBackendMeta, listKanbanCards, updateKanbanCard } from '../../server/kanban-backend'
import { sanitizeProjectSlug } from '../../server/project-catalog'
import { loadWorkspaceCatalog } from './workspace'

const CreateCardSchema = z.object({
  title: z.string().trim().min(1).max(200),
  spec: z.string().trim().max(5000).optional().default(''),
  acceptanceCriteria: z.string().trim().max(5000).optional().default(''),
  assignedWorker: z.string().trim().max(120).optional().nullable(),
  reviewer: z.string().trim().max(120).optional().nullable(),
  status: z.enum(['backlog', 'ready', 'running', 'review', 'blocked', 'done']).optional().default('backlog'),
  missionId: z.string().trim().max(200).optional().nullable(),
  reportPath: z.string().trim().max(500).optional().nullable(),
  createdBy: z.string().trim().max(120).optional().default('aurora'),
  projectId: z.string().trim().max(120).optional().nullable(),
})

const UpdateCardSchema = CreateCardSchema.partial().extend({
  id: z.string().trim().min(1),
})

function parseAcceptanceCriteria(value: string | undefined): string[] | undefined {
  if (value === undefined) return undefined
  return value.split('\n').map((item) => item.trim()).filter(Boolean)
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

function unauthorizedResponse() {
  return json({ ok: false, error: 'Unauthorized' }, { status: 401 })
}

function projectIdRequiredResponse() {
  return json({ ok: false, error: 'projectId is required for kanban writes' }, { status: 400 })
}

export async function getSwarmKanbanResponse(request: Request) {
  if (!requireLocalOrAuth(request)) return unauthorizedResponse()
  const projectId = await requestProjectId(request)
  return json({
    ok: true,
    cards: await listKanbanCards(projectId),
    backend: getKanbanBackendMeta(projectId),
  })
}

export async function createSwarmKanbanResponse(request: Request) {
  if (!requireLocalOrAuth(request)) return unauthorizedResponse()
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return json({ ok: false, error: 'Invalid JSON' }, { status: 400 })
  }
  const parsed = CreateCardSchema.safeParse(body)
  if (!parsed.success) {
    return json({ ok: false, error: parsed.error.issues.map((issue) => issue.message).join('; ') }, { status: 400 })
  }
  const projectId = explicitProjectId(request, body as Record<string, unknown>)
  if (!projectId) return projectIdRequiredResponse()
  const { acceptanceCriteria, ...input } = parsed.data
  const card = await createKanbanCard({
    ...input,
    acceptanceCriteria: parseAcceptanceCriteria(acceptanceCriteria) ?? [],
    projectId,
  }, projectId)
  return json({ ok: true, card, backend: getKanbanBackendMeta(projectId) })
}

export async function updateSwarmKanbanResponse(request: Request) {
  if (!requireLocalOrAuth(request)) return unauthorizedResponse()
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return json({ ok: false, error: 'Invalid JSON' }, { status: 400 })
  }
  const parsed = UpdateCardSchema.safeParse(body)
  if (!parsed.success) {
    return json({ ok: false, error: parsed.error.issues.map((issue) => issue.message).join('; ') }, { status: 400 })
  }
  const projectId = explicitProjectId(request, body as Record<string, unknown>)
  if (!projectId) return projectIdRequiredResponse()
  const { id, acceptanceCriteria, createdBy: _createdBy, ...updates } = parsed.data
  const card = await updateKanbanCard(id, {
    ...updates,
    acceptanceCriteria: parseAcceptanceCriteria(acceptanceCriteria),
    projectId,
  }, projectId)
  if (!card) return json({ ok: false, error: 'Card not found' }, { status: 404 })
  return json({ ok: true, card, backend: getKanbanBackendMeta(projectId) })
}

export const Route = createFileRoute('/api/swarm-kanban')({
  server: {
    handlers: {
      GET: async ({ request }) => getSwarmKanbanResponse(request),
      POST: async ({ request }) => createSwarmKanbanResponse(request),
      PATCH: async ({ request }) => updateSwarmKanbanResponse(request),
    },
  },
})
