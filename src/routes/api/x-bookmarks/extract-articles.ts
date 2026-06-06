import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'

import { isAuthenticated } from '../../../server/auth-middleware'
import {
  fetchXArticleExtraction,
  mergeXArticleExtractions,
  readBookmarkCache,
  readXArticleExtractionCache,
  writeXArticleExtractionCache,
  xArticleIdFromUrl,
  xArticleUrl,
} from './-x-bookmarks-utils'

type ExtractRequest = {
  limit?: unknown
  force?: unknown
}

function readLimit(value: unknown): number {
  if (typeof value !== 'number' || !Number.isFinite(value)) return 10
  return Math.min(Math.max(Math.floor(value), 1), 50)
}

export const Route = createFileRoute('/api/x-bookmarks/extract-articles')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        if (!isAuthenticated(request)) {
          return json({ ok: false, error: 'Unauthorized' }, { status: 401 })
        }

        let payload: ExtractRequest = {}
        try {
          payload = (await request.json()) as ExtractRequest
        } catch {
          payload = {}
        }

        const cache = await readBookmarkCache()
        if (!cache) {
          return json(
            { ok: false, error: 'No X bookmark cache exists yet.' },
            { status: 400 },
          )
        }

        const existing = await readXArticleExtractionCache()
        const existingIds = new Set(
          (existing?.items || []).map((item) => item.articleId),
        )
        const limit = readLimit(payload.limit)
        const force = payload.force === true
        const articleCandidates = cache.items
          .map((item) => ({ item, articleUrl: xArticleUrl(item) }))
          .filter(({ articleUrl }) => Boolean(articleUrl))
        const targets = articleCandidates
          .filter(
            ({ articleUrl }) =>
              force || !existingIds.has(xArticleIdFromUrl(articleUrl)),
          )
          .slice(0, limit)

        const extractedAt = new Date().toISOString()
        const extracted = []
        for (const target of targets) {
          extracted.push(
            await fetchXArticleExtraction({
              articleUrl: target.articleUrl,
              sourceTweetId: target.item.id,
              fetchedAt: extractedAt,
            }),
          )
        }

        const merged = mergeXArticleExtractions({
          existing,
          extractedAt,
          items: extracted,
        })
        const cachePath = await writeXArticleExtractionCache(merged)

        return json({
          ok: true,
          extractedAt,
          totalArticleCandidates: articleCandidates.length,
          attempted: extracted.length,
          cachedCount: merged.items.length,
          remaining: Math.max(
            articleCandidates.length - merged.items.length,
            0,
          ),
          counts: {
            extracted: merged.items.filter(
              (item) => item.status === 'extracted',
            ).length,
            unavailable: merged.items.filter(
              (item) => item.status === 'unavailable',
            ).length,
            error: merged.items.filter((item) => item.status === 'error')
              .length,
          },
          cachePath,
          items: extracted,
        })
      },
    },
  },
})
