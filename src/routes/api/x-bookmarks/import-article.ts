import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'

import { isAuthenticated } from '../../../server/auth-middleware'
import {
  createManualXArticleExtraction,
  mergeXArticleExtractions,
  readBookmarkCache,
  readXArticleExtractionCache,
  writeXArticleExtractionCache,
  xArticleUrl,
} from './-x-bookmarks-utils'

type ImportRequest = {
  sourceTweetId?: unknown
  articleUrl?: unknown
  title?: unknown
  text?: unknown
}

function textValue(value: unknown): string {
  return typeof value === 'string' ? value.trim() : ''
}

export const Route = createFileRoute('/api/x-bookmarks/import-article')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        if (!isAuthenticated(request)) {
          return json({ ok: false, error: 'Unauthorized' }, { status: 401 })
        }

        let payload: ImportRequest = {}
        try {
          payload = (await request.json()) as ImportRequest
        } catch {
          return json(
            { ok: false, error: 'Invalid JSON payload.' },
            { status: 400 },
          )
        }

        const sourceTweetId = textValue(payload.sourceTweetId)
        const bodyText = textValue(payload.text)
        const title = textValue(payload.title)
        if (!sourceTweetId)
          return json(
            { ok: false, error: 'sourceTweetId is required.' },
            { status: 400 },
          )
        if (bodyText.length < 40)
          return json(
            {
              ok: false,
              error: 'Article body text must be at least 40 characters.',
            },
            { status: 400 },
          )

        const cache = await readBookmarkCache()
        if (!cache)
          return json(
            { ok: false, error: 'No X bookmark cache exists yet.' },
            { status: 400 },
          )

        const source = cache.items.find((item) => item.id === sourceTweetId)
        if (!source)
          return json(
            {
              ok: false,
              error: 'sourceTweetId was not found in the bookmark cache.',
            },
            { status: 404 },
          )

        const articleUrl = textValue(payload.articleUrl) || xArticleUrl(source)
        if (!articleUrl)
          return json(
            { ok: false, error: 'No X Article URL found for this source.' },
            { status: 400 },
          )

        const importedAt = new Date().toISOString()
        const extraction = createManualXArticleExtraction({
          articleUrl,
          sourceTweetId,
          title,
          text: bodyText,
          importedAt,
        })
        if (!extraction.articleId)
          return json(
            { ok: false, error: 'Invalid X Article URL.' },
            { status: 400 },
          )

        const existing = await readXArticleExtractionCache()
        const merged = mergeXArticleExtractions({
          existing,
          extractedAt: importedAt,
          items: [extraction],
        })
        const cachePath = await writeXArticleExtractionCache(merged)

        return json({
          ok: true,
          importedAt,
          cachePath,
          item: extraction,
          cachedCount: merged.items.length,
        })
      },
    },
  },
})
