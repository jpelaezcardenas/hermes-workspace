import { json } from '@tanstack/react-start'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import {
  listRecentArticles,
} from '../../../../server/hotboard-wechat-store'
import {
  getSessionUser,
  isAuthenticated,
} from '../../../../server/auth-middleware'

const LimitSchema = z.coerce.number().int().min(1).max(200).default(50)

export async function handleHotboardWechatFeedGet(request: Request): Promise<Response> {
  if (!isAuthenticated(request)) {
    return json({ ok: false, error: 'Unauthorized' }, { status: 401 })
  }

  const sessionUser = getSessionUser(request)
  if (!sessionUser) {
    return json({ ok: false, error: 'Unauthorized' }, { status: 401 })
  }

  const url = new URL(request.url)
  const limitParam = url.searchParams.get('limit') ?? '50'
  const parsedLimit = LimitSchema.safeParse(limitParam)

  if (!parsedLimit.success) {
    return json({ ok: false, error: 'Invalid limit query parameter' }, { status: 400 })
  }

  return json({
    items: listRecentArticles(parsedLimit.data),
  })
}

export const Route = createFileRoute('/api/hotboard/wechat/feed')({
  server: {
    handlers: {
      GET: async ({ request }) => handleHotboardWechatFeedGet(request),
    },
  },
})
