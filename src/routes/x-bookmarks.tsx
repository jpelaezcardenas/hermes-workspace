'use client'

import { createFileRoute } from '@tanstack/react-router'
import { useMutation, useQuery } from '@tanstack/react-query'
import { usePageTitle } from '@/hooks/use-page-title'

type XBookmarkStatusResponse = {
  ok: boolean
  error?: string
  status?: {
    configured: boolean
    authenticated: boolean
    mode: 'read-only'
    clientIdConfigured: boolean
    redirectUri: string
    scopes: Array<string>
    token: null | {
      hasAccessToken: boolean
      hasRefreshToken: boolean
      expiresAt: string
      scope: string
      userId: string
      username: string
      updatedAt: string
    }
    missing: Array<string>
    nextStep: string
  }
  cache?: null | {
    fetchedAt: string
    count: number
    nextToken: string
    sample: Array<XBookmarkItem>
  }
}

type XBookmarkItem = {
  id: string
  url: string
  text: string
  createdAt: string
  capturedAt: string
  author: { id: string; username: string; name: string }
  metrics: Record<string, number>
  externalUrls: Array<string>
  media: Array<{ mediaKey: string; type: string; url: string }>
}

type AuthorizeResponse = {
  ok: boolean
  authorizeUrl?: string
  redirectUri?: string
  error?: string
}

type FetchResponse = {
  ok: boolean
  error?: string
  fetchedAt?: string
  count?: number
  cacheCount?: number
  likelyNewCount?: number
  nextToken?: string
  cachePath?: string
  items?: Array<XBookmarkItem>
  likelyNewItems?: Array<XBookmarkItem>
}

async function loadStatus(): Promise<XBookmarkStatusResponse> {
  const response = await fetch('/api/x-bookmarks/status')
  const data = (await response.json()) as XBookmarkStatusResponse
  if (!response.ok || data.ok === false)
    throw new Error(data.error || `HTTP ${response.status}`)
  return data
}

async function startAuthorization(): Promise<AuthorizeResponse> {
  const response = await fetch('/api/x-bookmarks/authorize', { method: 'POST' })
  const data = (await response.json()) as AuthorizeResponse
  if (!response.ok || data.ok === false)
    throw new Error(data.error || `HTTP ${response.status}`)
  return data
}

async function fetchBookmarks(): Promise<FetchResponse> {
  const response = await fetch('/api/x-bookmarks/fetch', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ maxResults: 100 }),
  })
  const data = (await response.json()) as FetchResponse
  if (!response.ok || data.ok === false)
    throw new Error(data.error || `HTTP ${response.status}`)
  return data
}

export const Route = createFileRoute('/x-bookmarks')({
  ssr: false,
  component: XBookmarksRoute,
})

function XBookmarksRoute() {
  usePageTitle('X Bookmark Intake')
  const statusQuery = useQuery({
    queryKey: ['x-bookmarks', 'status'],
    queryFn: loadStatus,
  })
  const authorizeMutation = useMutation({
    mutationFn: startAuthorization,
    onSuccess: (data) => {
      if (data.authorizeUrl) window.location.assign(data.authorizeUrl)
    },
  })
  const fetchMutation = useMutation({
    mutationFn: fetchBookmarks,
    onSuccess: () => statusQuery.refetch(),
  })

  const status = statusQuery.data?.status
  const cache = statusQuery.data?.cache
  const fetchedItems = fetchMutation.data?.items
  const likelyNewItems = fetchMutation.data?.likelyNewItems || []
  const visibleItems =
    likelyNewItems.length > 0
      ? likelyNewItems
      : fetchedItems && fetchedItems.length > 0
        ? fetchedItems
        : cache?.sample || []
  const listTitle =
    likelyNewItems.length > 0
      ? 'Likely-new bookmarks since last fetch'
      : 'Latest cached bookmarks'
  const authorizeUrl = authorizeMutation.data?.authorizeUrl

  return (
    <div className="min-h-full bg-[var(--theme-bg)] px-4 py-6 text-[var(--theme-fg)] md:px-8 lg:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <header className="rounded-3xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-6 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--theme-muted)]">
                AI Learning intake
              </p>
              <h1 className="mt-2 text-3xl font-semibold text-ink">
                X Bookmark Intake
              </h1>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-[var(--theme-muted)]">
                Read-only prototype for pulling Tim's bookmarked X posts into a
                local Workspace cache. No posting, liking, deleting, DMs,
                follows, or public actions.
              </p>
            </div>
            <div className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-bg)] px-4 py-3 text-sm">
              <div className="text-[var(--theme-muted)]">Mode</div>
              <div className="mt-1 font-semibold text-ink">Read-only</div>
            </div>
          </div>
        </header>

        {statusQuery.isError ? (
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
            Status failed:{' '}
            {statusQuery.error instanceof Error
              ? statusQuery.error.message
              : 'Unknown error'}
          </div>
        ) : null}

        <section className="grid gap-4 lg:grid-cols-3">
          <StatusCard
            label="Developer app"
            value={
              status?.clientIdConfigured ? 'Configured' : 'Missing client ID'
            }
            good={Boolean(status?.clientIdConfigured)}
          />
          <StatusCard
            label="OAuth"
            value={status?.authenticated ? 'Connected' : 'Not connected'}
            good={Boolean(status?.authenticated)}
          />
          <StatusCard
            label="Local cache"
            value={cache ? `${cache.count} bookmarks` : 'No cache yet'}
            good={Boolean(cache)}
          />
        </section>

        <section className="rounded-3xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-6">
          <h2 className="text-xl font-semibold text-ink">Setup</h2>
          <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-start">
            <div className="space-y-3 text-sm text-[var(--theme-muted)]">
              <p>{status?.nextStep || 'Loading setup state...'}</p>
              <div className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-bg)] p-4">
                <div className="text-xs uppercase tracking-[0.18em]">
                  Callback URL for X Developer app
                </div>
                <code className="mt-2 block overflow-x-auto text-xs text-ink">
                  {status?.redirectUri || 'Loading...'}
                </code>
              </div>
              <div className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-bg)] p-4">
                <div className="text-xs uppercase tracking-[0.18em]">
                  Requested scopes
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {(
                    status?.scopes || [
                      'bookmark.read',
                      'tweet.read',
                      'users.read',
                    ]
                  ).map((scope) => (
                    <span
                      key={scope}
                      className="rounded-full border border-[var(--theme-border)] px-3 py-1 text-xs text-ink"
                    >
                      {scope}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <button
                type="button"
                disabled={
                  !status?.clientIdConfigured || authorizeMutation.isPending
                }
                onClick={() => authorizeMutation.mutate()}
                className="rounded-xl bg-ink px-5 py-3 text-sm font-semibold text-[var(--theme-bg)] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {authorizeMutation.isPending
                  ? 'Starting OAuth...'
                  : 'Connect X read-only'}
              </button>
              <button
                type="button"
                disabled={!status?.authenticated || fetchMutation.isPending}
                onClick={() => fetchMutation.mutate()}
                className="rounded-xl border border-[var(--theme-border)] px-5 py-3 text-sm font-semibold text-ink disabled:cursor-not-allowed disabled:opacity-50"
              >
                {fetchMutation.isPending
                  ? 'Fetching...'
                  : 'Fetch latest 100 bookmarks'}
              </button>
              <button
                type="button"
                onClick={() => statusQuery.refetch()}
                className="rounded-xl border border-[var(--theme-border)] px-5 py-3 text-sm text-[var(--theme-muted)]"
              >
                Refresh status
              </button>
            </div>
          </div>
          {authorizeMutation.isError ? (
            <ErrorNote error={authorizeMutation.error} />
          ) : null}
          {authorizeUrl ? (
            <div className="mt-4 rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-bg)] p-4 text-sm text-[var(--theme-muted)]">
              <div className="font-semibold text-ink">Manual fallback</div>
              <p className="mt-1">
                If X login loops, copy this authorization URL and paste it into
                a browser where x.com is already logged in.
              </p>
              <code className="mt-2 block max-h-28 overflow-auto break-all rounded-xl border border-[var(--theme-border)] p-3 text-xs text-ink">
                {authorizeUrl}
              </code>
            </div>
          ) : null}
          {fetchMutation.isError ? (
            <ErrorNote error={fetchMutation.error} />
          ) : null}
          {fetchMutation.data ? (
            <div className="mt-4 rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-bg)] p-4 text-sm text-[var(--theme-muted)]">
              <div className="font-semibold text-ink">Fetch summary</div>
              <p className="mt-1">
                Fetched {fetchMutation.data.count ?? 0} bookmarks, found{' '}
                {fetchMutation.data.likelyNewCount ?? 0} likely-new, cache now
                has {fetchMutation.data.cacheCount ?? cache?.count ?? 0} deduped
                bookmarks.
              </p>
            </div>
          ) : null}
          {fetchMutation.data?.cachePath ? (
            <p className="mt-4 text-xs text-[var(--theme-muted)]">
              Cached locally at {fetchMutation.data.cachePath}
            </p>
          ) : null}
        </section>

        <section className="rounded-3xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-6">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-ink">{listTitle}</h2>
              <p className="mt-1 text-sm text-[var(--theme-muted)]">
                {cache?.fetchedAt
                  ? `Last fetched ${cache.fetchedAt}`
                  : 'Nothing fetched yet.'}
              </p>
            </div>
            {cache?.nextToken ? (
              <span className="text-xs text-[var(--theme-muted)]">
                More pages available
              </span>
            ) : null}
          </div>

          <div className="mt-5 grid gap-3">
            {visibleItems.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-[var(--theme-border)] p-6 text-sm text-[var(--theme-muted)]">
                Connect X, then fetch bookmarks to populate the local cache.
              </div>
            ) : (
              visibleItems.map((item) => (
                <BookmarkCard key={item.id} item={item} />
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  )
}

function StatusCard({
  label,
  value,
  good,
}: {
  label: string
  value: string
  good: boolean
}) {
  return (
    <div className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-4">
      <div className="text-xs uppercase tracking-[0.18em] text-[var(--theme-muted)]">
        {label}
      </div>
      <div
        className={
          good
            ? 'mt-2 font-semibold text-emerald-300'
            : 'mt-2 font-semibold text-amber-300'
        }
      >
        {value}
      </div>
    </div>
  )
}

function ErrorNote({ error }: { error: unknown }) {
  return (
    <div className="mt-4 rounded-2xl border border-amber-400/30 bg-amber-400/10 p-4 text-sm text-amber-200">
      {error instanceof Error ? error.message : 'Action failed'}
    </div>
  )
}

function BookmarkCard({ item }: { item: XBookmarkItem }) {
  return (
    <article className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-bg)] p-4">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div className="text-sm font-semibold text-ink">
          @{item.author.username}
        </div>
        <a
          href={item.url}
          target="_blank"
          rel="noreferrer"
          className="text-xs text-blue-300 hover:underline"
        >
          Open on X
        </a>
      </div>
      <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-[var(--theme-fg)]">
        {item.text}
      </p>
      <div className="mt-3 flex flex-wrap gap-2 text-xs text-[var(--theme-muted)]">
        <span>{item.createdAt || 'No date'}</span>
        {item.media.length > 0 ? (
          <span>{item.media.length} media item(s)</span>
        ) : null}
        {item.externalUrls.length > 0 ? (
          <span>{item.externalUrls.length} external link(s)</span>
        ) : null}
      </div>
    </article>
  )
}
