import { randomUUID } from 'node:crypto'
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
  createHotboardVoteStore,
  VOTE_TYPES,
  type VoteType,
} from './hotboard-vote-store'

const VoteSchema = z.object({
  event_id: z.string().min(1).max(500),
  vote_type: z.enum(VOTE_TYPES),
})

export async function handleHotboardVotePost(request: Request): Promise<Response> {
  if (!isAuthenticated(request)) {
    return json({ ok: false, error: 'Unauthorized' }, { status: 401 })
  }

  const sessionUser = getSessionUser(request)
  if (!sessionUser) {
    return json({ ok: false, error: 'Unauthorized' }, { status: 401 })
  }

  const csrfCheck = requireJsonContentType(request)
  if (csrfCheck) return csrfCheck

  const ip = getClientIp(request)
  if (!rateLimit(`hotboard-vote:${ip}`, 120, 60_000)) {
    return rateLimitResponse()
  }

  try {
    const raw = await request.json().catch(() => ({}))
    const parsed = VoteSchema.safeParse(raw)

    if (!parsed.success) {
      return json({ ok: false, error: 'Invalid request' }, { status: 400 })
    }

    const body = parsed.data
    const userId = sessionUser.feishu_open_id || randomUUID()
    const store = createHotboardVoteStore()
    const result = store.toggleVote({
      eventId: body.event_id,
      userId,
      voteType: body.vote_type as VoteType,
    })
    const aggregate = store.getAggregateForUser(userId)

    return json({
      ok: true,
      event_id: body.event_id,
      vote_type: body.vote_type,
      active: result.active,
      user_id: userId,
      aggregate,
    })
  } catch (error) {
    return json(
      { ok: false, error: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    )
  }
}

export async function handleHotboardVoteAggregateGet(request: Request): Promise<Response> {
  if (!isAuthenticated(request)) {
    return json({ ok: false, error: 'Unauthorized' }, { status: 401 })
  }

  const sessionUser = getSessionUser(request)
  if (!sessionUser) {
    return json({ ok: false, error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const userId = sessionUser.feishu_open_id || randomUUID()
    const store = createHotboardVoteStore()
    return json({
      ok: true,
      user_id: userId,
      aggregate: store.getAggregateForUser(userId),
    })
  } catch (error) {
    return json(
      { ok: false, error: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    )
  }
}
