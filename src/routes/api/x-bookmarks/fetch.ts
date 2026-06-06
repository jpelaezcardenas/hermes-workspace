import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'

import { isAuthenticated } from '../../../server/auth-middleware'
import {
  fetchXBookmarks,
  mergeBookmarkCache,
  normalizeXBookmarkTweets,
  readBookmarkCache,
  readTokenState,
  writeBookmarkCache,
} from './-x-bookmarks-utils'

type FetchRequest = {
  maxResults?: unknown
  paginationToken?: unknown
}

function readString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : ''
}

function readMaxResults(value: unknown): number {
  if (typeof value !== 'number' || !Number.isFinite(value)) return 100
  return Math.min(Math.max(Math.floor(value), 5), 100)
}

export const Route = createFileRoute('/api/x-bookmarks/fetch')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        if (!isAuthenticated(request)) {
          return json({ ok: false, error: 'Unauthorized' }, { status: 401 })
        }

        const tokenState = await readTokenState()
        if (!tokenState?.accessToken || !tokenState.userId) {
          return json(
            {
              ok: false,
              error: 'X Bookmark Intake is not authenticated yet.',
            },
            { status: 400 },
          )
        }

        let payload: FetchRequest = {}
        try {
          payload = (await request.json()) as FetchRequest
        } catch {
          payload = {}
        }

        try {
          const capturedAt = new Date().toISOString()
          const existingCache = await readBookmarkCache()
          const response = await fetchXBookmarks({
            userId: tokenState.userId,
            accessToken: tokenState.accessToken,
            maxResults: readMaxResults(payload.maxResults),
            paginationToken: readString(payload.paginationToken),
          })
          const normalized = normalizeXBookmarkTweets(response, capturedAt)
          const merged = mergeBookmarkCache({
            existing: existingCache,
            fetchedAt: capturedAt,
            nextToken: normalized.nextToken,
            fetched: normalized.items,
          })
          const cachePath = await writeBookmarkCache({
            fetchedAt: merged.fetchedAt,
            nextToken: merged.nextToken,
            items: merged.items,
          })

          return json({
            ok: true,
            fetchedAt: capturedAt,
            count: normalized.items.length,
            cacheCount: merged.items.length,
            likelyNewCount: merged.likelyNewItems.length,
            nextToken: normalized.nextToken,
            cachePath,
            items: normalized.items,
            likelyNewItems: merged.likelyNewItems,
          })
        } catch (err) {
          return json(
            {
              ok: false,
              error:
                err instanceof Error
                  ? err.message
                  : 'Failed to fetch X bookmarks',
            },
            { status: 502 },
          )
        }
      },
    },
  },
})
