import { json } from '@tanstack/react-start'
import { z } from 'zod'
import { getSessionUser, isAuthenticated } from './auth-middleware'
import {
  getClientIp,
  rateLimit,
  rateLimitResponse,
  requireJsonContentType,
} from './rate-limit'
import {
  createHotboardIntakeStore,
  INTAKE_AGENT_KEYS,
  type IntakeAgentKey,
} from './hotboard-intake-store'

const AgentSchema = z.enum(INTAKE_AGENT_KEYS)

const IntakeCreateSchema = z.object({
  author_agent: AgentSchema,
  title: z.string().min(1).max(200),
  body: z.string().min(1).max(4_000),
  tags: z.array(z.string().trim().min(1).max(32)).max(16),
})

function ensureAuthenticated(request: Request) {
  if (!isAuthenticated(request)) {
    return { error: json({ ok: false, error: 'Unauthorized' }, { status: 401 }) }
  }

  const sessionUser = getSessionUser(request)
  if (!sessionUser) {
    return { error: json({ ok: false, error: 'Unauthorized' }, { status: 401 }) }
  }

  return { sessionUser }
}

function canWriteIntake(sessionRole: string, authorAgent: IntakeAgentKey) {
  if (sessionRole === 'owner') return true

  if (sessionRole === 'member') {
    return false
  }

  if (authorAgent === 'hermes') {
    return true
  }

  return false
}

function resolveSubmittedById(sessionUser: NonNullable<ReturnType<typeof getSessionUser>>) {
  return sessionUser.feishu_open_id || sessionUser.email || sessionUser.id
}

export async function handleHotboardIntakePost(request: Request): Promise<Response> {
  const authResult = ensureAuthenticated(request)
  if (authResult.error) return authResult.error

  const csrfCheck = requireJsonContentType(request)
  if (csrfCheck) return csrfCheck

  const ip = getClientIp(request)
  if (!rateLimit(`hotboard-intake-post:${ip}`, 60, 60_000)) {
    return rateLimitResponse()
  }

  try {
    const raw = await request.json().catch(() => ({}))
    const parsed = IntakeCreateSchema.safeParse(raw)

    if (!parsed.success) {
      return json({ ok: false, error: 'Invalid request' }, { status: 400 })
    }

    const body = parsed.data
    if (!canWriteIntake(authResult.sessionUser.role, body.author_agent)) {
      return json({ ok: false, error: 'Forbidden: intake write is agent-only' }, { status: 403 })
    }

    const store = createHotboardIntakeStore()
    const item = store.createItem({
      authorAgent: body.author_agent,
      title: body.title,
      body: body.body,
      tags: body.tags,
      submittedByOpenId: resolveSubmittedById(authResult.sessionUser),
      submittedByName: authResult.sessionUser.display_name,
    })

    return json(
      {
        ok: true,
        item,
      },
      { status: 201 },
    )
  } catch (error) {
    return json(
      { ok: false, error: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    )
  }
}

export async function handleHotboardIntakeGet(request: Request): Promise<Response> {
  const authResult = ensureAuthenticated(request)
  if (authResult.error) return authResult.error

  const ip = getClientIp(request)
  if (!rateLimit(`hotboard-intake-get:${ip}`, 240, 60_000)) {
    return rateLimitResponse()
  }

  const url = new URL(request.url)
  const authorAgentParam = url.searchParams.get('author_agent') ?? 'hermes'
  const parsedAgent = AgentSchema.safeParse(authorAgentParam)

  if (!parsedAgent.success) {
    return json({ ok: false, error: 'Invalid author_agent query parameter' }, { status: 400 })
  }

  try {
    const store = createHotboardIntakeStore()
    const items = store.listItems(parsedAgent.data as IntakeAgentKey)

    return json({
      ok: true,
      author_agent: parsedAgent.data,
      items,
    })
  } catch (error) {
    return json(
      { ok: false, error: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    )
  }
}
