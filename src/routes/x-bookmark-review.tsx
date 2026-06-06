'use client'

import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useMutation, useQuery } from '@tanstack/react-query'
import { usePageTitle } from '@/hooks/use-page-title'

type ReviewBucket = 'useNow' | 'teach' | 'packageSell' | 'watch' | 'reject'

type ReviewItem = {
  id: string
  url: string
  text: string
  bucket: ReviewBucket
  claim: string
  whyItMatters: string
  recommendedAction: string
  approvalNeeded: boolean
  articleUrl: string
  articleStatus: 'pending' | 'extracted' | 'unavailable' | 'error' | 'none'
  articleTitle: string
  articleExcerpt: string
  articleExtractedAt: string
  matchedSignals: Array<string>
  author: { username: string; name: string }
  metrics: Record<string, number>
}

type RadarItem = {
  title: string
  why: string
  nextAction: string
  count: number
  approvalNeeded: boolean
  sourceIds: Array<string>
}

type ReviewResponse = {
  ok: boolean
  error?: string
  cache: null | { fetchedAt: string; count: number; nextToken: string }
  digest: {
    generatedAt: string
    total: number
    articleWrapperCount: number
    topAuthors: Array<{ username: string; count: number }>
    groups: Record<ReviewBucket, Array<ReviewItem>>
    radar: Array<RadarItem>
    articleCandidates: Array<ReviewItem>
  }
  limitations?: Array<string>
}

async function loadReview(): Promise<ReviewResponse> {
  const response = await fetch('/api/x-bookmarks/review')
  const data = (await response.json()) as ReviewResponse
  if (!response.ok || data.ok === false)
    throw new Error(data.error || `HTTP ${response.status}`)
  return data
}

async function extractArticles(): Promise<{
  ok: boolean
  attempted: number
  counts: { extracted: number; unavailable: number; error: number }
}> {
  const response = await fetch('/api/x-bookmarks/extract-articles', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ limit: 50 }),
  })
  const data = (await response.json()) as {
    ok: boolean
    error?: string
    attempted: number
    counts: { extracted: number; unavailable: number; error: number }
  }
  if (!response.ok || data.ok === false)
    throw new Error(data.error || `HTTP ${response.status}`)
  return data
}

async function importArticle(input: {
  sourceTweetId: string
  articleUrl: string
  title: string
  text: string
}): Promise<{ ok: boolean; item: ReviewItem }> {
  const response = await fetch('/api/x-bookmarks/import-article', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(input),
  })
  const data = (await response.json()) as {
    ok: boolean
    error?: string
    item: ReviewItem
  }
  if (!response.ok || data.ok === false)
    throw new Error(data.error || `HTTP ${response.status}`)
  return data
}

export const Route = createFileRoute('/x-bookmark-review')({
  ssr: false,
  component: XBookmarkReviewRoute,
})

const bucketLabels: Record<ReviewBucket, string> = {
  useNow: 'Use now',
  teach: 'Teach / reproduce',
  packageSell: 'Package / sell',
  watch: 'Watch',
  reject: 'Reject',
}

function XBookmarkReviewRoute() {
  usePageTitle('X Bookmark Review')
  const [selectedArticleId, setSelectedArticleId] = useState('')
  const [manualTitle, setManualTitle] = useState('')
  const [manualText, setManualText] = useState('')
  const [capturedJson, setCapturedJson] = useState('')
  const [captureMessage, setCaptureMessage] = useState('')
  const reviewQuery = useQuery({
    queryKey: ['x-bookmarks', 'review'],
    queryFn: loadReview,
  })
  const extractMutation = useMutation({
    mutationFn: extractArticles,
    onSuccess: () => reviewQuery.refetch(),
  })
  const importMutation = useMutation({
    mutationFn: importArticle,
    onSuccess: () => {
      setManualTitle('')
      setManualText('')
      reviewQuery.refetch()
    },
  })
  const digest = reviewQuery.data?.digest
  const importCandidates = (digest?.articleCandidates || []).filter(
    (item) => item.articleStatus !== 'extracted',
  )
  const selectedArticle =
    importCandidates.find((item) => item.id === selectedArticleId) ||
    ({
      id: '',
      articleUrl: '',
      claim: '',
      articleStatus: 'pending',
      author: { username: '', name: '' },
    } as ReviewItem)

  function submitManualImport() {
    if (!selectedArticle.id) return
    importMutation.mutate({
      sourceTweetId: selectedArticle.id,
      articleUrl: selectedArticle.articleUrl,
      title: manualTitle,
      text: manualText,
    })
  }

  function applyCapturedArticlePayload() {
    setCaptureMessage('')
    let payload: { articleUrl?: unknown; title?: unknown; text?: unknown } = {}
    try {
      payload = JSON.parse(capturedJson) as {
        articleUrl?: unknown
        title?: unknown
        text?: unknown
      }
    } catch {
      setCaptureMessage('Capture payload was not valid JSON.')
      return
    }
    const articleUrl =
      typeof payload.articleUrl === 'string' ? payload.articleUrl.trim() : ''
    const title = typeof payload.title === 'string' ? payload.title.trim() : ''
    const text = typeof payload.text === 'string' ? payload.text.trim() : ''
    if (!articleUrl || text.length < 40) {
      setCaptureMessage(
        'Capture payload needs an articleUrl and at least 40 characters of text.',
      )
      return
    }
    const normalizedArticleUrl = articleUrl
      .replace(/^https?:\/\//, '')
      .replace(/\/$/, '')
    const match = importCandidates.find(
      (item) =>
        item.articleUrl.replace(/^https?:\/\//, '').replace(/\/$/, '') ===
        normalizedArticleUrl,
    )
    if (match) setSelectedArticleId(match.id)
    setManualTitle(title)
    setManualText(text)
    setCaptureMessage(
      match
        ? 'Captured article applied. Review it, then import.'
        : 'Captured text applied. Select the matching article, then import.',
    )
  }

  function copyCaptureBookmarklet() {
    const script = `(() => {
  const clean = (value) => String(value || '').replace(/\\s+$/g, '').trim();
  const lines = clean(document.body.innerText).split('\\n').map((line) => line.trim()).filter(Boolean);
  const skip = new Set(['Home', 'Explore', 'Notifications', 'Messages', 'Grok', 'Bookmarks', 'Jobs', 'Communities', 'Premium', 'Verified Orgs', 'Profile', 'More', 'Post', 'Reply', 'Repost', 'Like', 'Share', 'Terms of Service', 'Privacy Policy']);
  const text = lines.filter((line, index, list) => !skip.has(line) && list.indexOf(line) === index).join('\\n');
  const title = clean(document.querySelector('h1')?.innerText || document.title.replace(/\\s*\\/ X$/, ''));
  const payload = { source: 'x-article-clipboard-v1', capturedAt: new Date().toISOString(), articleUrl: location.href, title, text };
  navigator.clipboard.writeText(JSON.stringify(payload, null, 2)).then(() => alert('X Article text copied. Paste it into Hermes Workspace.'), () => prompt('Copy this X Article payload', JSON.stringify(payload, null, 2)));
})()`
    void navigator.clipboard.writeText(
      `javascript:${encodeURIComponent(script)}`,
    )
    setCaptureMessage(
      'Bookmarklet copied. Save it as a browser bookmark, then run it on an open X Article page.',
    )
  }

  return (
    <div className="min-h-full bg-[var(--theme-bg)] px-4 py-6 text-[var(--theme-fg)] md:px-8 lg:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <header className="rounded-3xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--theme-muted)]">
            AI Dev intake
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-ink">
            X Bookmark Review Digest
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-[var(--theme-muted)]">
            Turns Tim's latest cached X bookmarks into AI setup upgrades,
            teachable workflows, packaging ideas, and watch items. Read-only. No
            publishing, no sending, no new X fetch.
          </p>
        </header>

        <section className="rounded-3xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-ink">
                X Article Extraction
              </h2>
              <p className="mt-1 text-sm text-[var(--theme-muted)]">
                Extracts pending X Article wrapper posts into a local cache.
                This uses X web GraphQL, not a bookmark fetch.
              </p>
              {extractMutation.data ? (
                <p className="mt-2 text-sm text-[var(--theme-muted)]">
                  Last run: {extractMutation.data.attempted} attempted.
                  Extracted {extractMutation.data.counts.extracted}. Unavailable{' '}
                  {extractMutation.data.counts.unavailable}. Errors{' '}
                  {extractMutation.data.counts.error}.
                </p>
              ) : null}
              {extractMutation.isError ? (
                <p className="mt-2 text-sm text-red-200">
                  Extraction failed:{' '}
                  {extractMutation.error instanceof Error
                    ? extractMutation.error.message
                    : 'Unknown error'}
                </p>
              ) : null}
            </div>
            <button
              type="button"
              onClick={() => extractMutation.mutate()}
              disabled={extractMutation.isPending}
              className="rounded-full border border-blue-400/40 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {extractMutation.isPending
                ? 'Extracting…'
                : 'Extract pending articles'}
            </button>
          </div>

          <div className="mt-5 rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-bg)] p-4">
            <h3 className="text-sm font-semibold text-ink">
              Manual logged-in fallback
            </h3>
            <p className="mt-1 text-sm leading-6 text-[var(--theme-muted)]">
              If X blocks guest extraction, open the article while logged in,
              copy the body text, and import it here. This stores article text
              only, not browser cookies, tokens, or passwords.
            </p>
            <div className="mt-4 rounded-2xl border border-amber-400/30 bg-amber-500/10 p-4">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-amber-100">
                    Logged-in capture helper
                  </h4>
                  <p className="mt-1 text-sm leading-6 text-amber-100/80">
                    Copy this bookmarklet, save it as a browser bookmark, open
                    an X Article while logged in, then click the bookmark. It
                    copies the visible full article text as JSON for import
                    here.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={copyCaptureBookmarklet}
                  className="rounded-full border border-amber-300/40 bg-amber-300/10 px-4 py-2 text-sm font-semibold text-amber-100"
                >
                  Copy capture bookmarklet
                </button>
              </div>
              <label className="mt-3 block text-sm text-amber-100/80">
                Captured JSON from X Article page
                <textarea
                  value={capturedJson}
                  onChange={(event) => setCapturedJson(event.target.value)}
                  placeholder='Paste the JSON copied by the bookmarklet, then click "Apply captured text".'
                  rows={4}
                  className="mt-1 w-full rounded-xl border border-amber-300/30 bg-[var(--theme-bg)] px-3 py-2 text-sm leading-6 text-[var(--theme-fg)]"
                />
              </label>
              <div className="mt-3 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <p className="text-xs text-amber-100/70">
                  No X browser credentials are collected. Only visible title,
                  URL, and article text are copied.
                </p>
                <button
                  type="button"
                  onClick={applyCapturedArticlePayload}
                  disabled={!capturedJson.trim()}
                  className="rounded-full border border-amber-300/40 bg-amber-300/10 px-4 py-2 text-sm font-semibold text-amber-100 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Apply captured text
                </button>
              </div>
              {captureMessage ? (
                <p className="mt-2 text-sm text-amber-100">{captureMessage}</p>
              ) : null}
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
              <label className="text-sm text-[var(--theme-muted)]">
                Article
                <select
                  value={selectedArticle.id}
                  onChange={(event) => setSelectedArticleId(event.target.value)}
                  className="mt-1 w-full rounded-xl border border-[var(--theme-border)] bg-[var(--theme-card)] px-3 py-2 text-sm text-[var(--theme-fg)]"
                >
                  {importCandidates.map((item) => (
                    <option key={item.id} value={item.id}>
                      @{item.author.username} · {item.articleStatus} ·{' '}
                      {item.claim.slice(0, 80)}
                    </option>
                  ))}
                </select>
              </label>
              {selectedArticle.id ? (
                <a
                  href={selectedArticle.articleUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-[var(--theme-border)] px-4 py-2 text-center text-sm text-blue-300 hover:underline"
                >
                  Open article
                </a>
              ) : null}
            </div>
            <label className="mt-3 block text-sm text-[var(--theme-muted)]">
              Title, optional
              <input
                value={manualTitle}
                onChange={(event) => setManualTitle(event.target.value)}
                placeholder="Paste the article title"
                className="mt-1 w-full rounded-xl border border-[var(--theme-border)] bg-[var(--theme-card)] px-3 py-2 text-sm text-[var(--theme-fg)]"
              />
            </label>
            <label className="mt-3 block text-sm text-[var(--theme-muted)]">
              Article body
              <textarea
                value={manualText}
                onChange={(event) => setManualText(event.target.value)}
                placeholder="Paste article body text copied from a logged-in X browser session. Minimum 40 characters."
                rows={6}
                className="mt-1 w-full rounded-xl border border-[var(--theme-border)] bg-[var(--theme-card)] px-3 py-2 text-sm leading-6 text-[var(--theme-fg)]"
              />
            </label>
            <div className="mt-3 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <p className="text-xs text-[var(--theme-muted)]">
                Pending/manual candidates: {importCandidates.length}
              </p>
              <button
                type="button"
                onClick={submitManualImport}
                disabled={
                  !selectedArticle.id ||
                  manualText.trim().length < 40 ||
                  importMutation.isPending
                }
                className="rounded-full border border-emerald-400/40 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-100 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {importMutation.isPending
                  ? 'Importing…'
                  : 'Import copied article text'}
              </button>
            </div>
            {importMutation.isSuccess ? (
              <p className="mt-2 text-sm text-emerald-200">
                Manual article text imported and review digest refreshed.
              </p>
            ) : null}
            {importMutation.isError ? (
              <p className="mt-2 text-sm text-red-200">
                Import failed:{' '}
                {importMutation.error instanceof Error
                  ? importMutation.error.message
                  : 'Unknown error'}
              </p>
            ) : null}
          </div>
        </section>

        {reviewQuery.isError ? (
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
            Review failed:{' '}
            {reviewQuery.error instanceof Error
              ? reviewQuery.error.message
              : 'Unknown error'}
          </div>
        ) : null}

        <section className="grid gap-4 md:grid-cols-4">
          <Stat label="Cached bookmarks" value={String(digest?.total ?? '…')} />
          <Stat
            label="X Article wrappers"
            value={String(digest?.articleWrapperCount ?? '…')}
          />
          <Stat
            label="Use now"
            value={String(digest?.groups.useNow.length ?? '…')}
          />
          <Stat
            label="Package / sell"
            value={String(digest?.groups.packageSell.length ?? '…')}
          />
        </section>

        <section className="rounded-3xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-6">
          <h2 className="text-xl font-semibold text-ink">
            AI Ops Upgrade Radar
          </h2>
          <div className="mt-4 grid gap-3">
            {(digest?.radar || []).map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-bg)] p-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-ink">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[var(--theme-muted)]">
                      {item.why}
                    </p>
                    <p className="mt-2 text-sm text-ink">
                      Next: {item.nextAction}
                    </p>
                  </div>
                  <span className="rounded-full border border-[var(--theme-border)] px-3 py-1 text-xs text-[var(--theme-muted)]">
                    {item.count} sources
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>

        {(
          ['useNow', 'packageSell', 'teach', 'watch'] as Array<ReviewBucket>
        ).map((bucket) => (
          <section
            key={bucket}
            className="rounded-3xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-6"
          >
            <h2 className="text-xl font-semibold text-ink">
              {bucketLabels[bucket]}
            </h2>
            <div className="mt-4 grid gap-3">
              {(digest?.groups[bucket] || []).slice(0, 12).map((item) => (
                <ReviewCard key={item.id} item={item} />
              ))}
              {digest && digest.groups[bucket].length === 0 ? (
                <p className="text-sm text-[var(--theme-muted)]">
                  No items in this bucket.
                </p>
              ) : null}
            </div>
          </section>
        ))}

        <section className="rounded-3xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-6">
          <h2 className="text-xl font-semibold text-ink">Known limitations</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[var(--theme-muted)]">
            {(reviewQuery.data?.limitations || []).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-4">
      <div className="text-xs uppercase tracking-[0.18em] text-[var(--theme-muted)]">
        {label}
      </div>
      <div className="mt-2 text-2xl font-semibold text-ink">{value}</div>
    </div>
  )
}

function ReviewCard({ item }: { item: ReviewItem }) {
  return (
    <article className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-bg)] p-4">
      <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="text-sm font-semibold text-ink">
            @{item.author.username}
          </div>
          <p className="mt-2 text-sm leading-6 text-[var(--theme-fg)]">
            {item.claim}
          </p>
        </div>
        <a
          href={item.url}
          target="_blank"
          rel="noreferrer"
          className="text-xs text-blue-300 hover:underline"
        >
          Open source
        </a>
      </div>
      <p className="mt-3 text-sm text-[var(--theme-muted)]">
        Why: {item.whyItMatters}
      </p>
      <p className="mt-2 text-sm text-ink">Action: {item.recommendedAction}</p>
      {item.articleExcerpt ? (
        <p className="mt-3 text-sm leading-6 text-[var(--theme-fg)]">
          Article: {item.articleExcerpt}
        </p>
      ) : null}
      <div className="mt-3 flex flex-wrap gap-2">
        {item.matchedSignals.map((signal) => (
          <span
            key={signal}
            className="rounded-full border border-[var(--theme-border)] px-2 py-1 text-xs text-[var(--theme-muted)]"
          >
            {signal}
          </span>
        ))}
        {item.articleUrl ? <ArticleBadge item={item} /> : null}
      </div>
    </article>
  )
}

function ArticleBadge({ item }: { item: ReviewItem }) {
  const labels: Record<ReviewItem['articleStatus'], string> = {
    extracted: 'X Article extracted',
    pending: 'X Article extraction pending',
    unavailable: 'X Article unavailable',
    error: 'X Article extraction error',
    none: '',
  }
  const classes: Record<ReviewItem['articleStatus'], string> = {
    extracted: 'border-emerald-400/40 text-emerald-200',
    pending: 'border-amber-400/40 text-amber-200',
    unavailable: 'border-zinc-400/40 text-zinc-200',
    error: 'border-red-400/40 text-red-200',
    none: 'border-[var(--theme-border)] text-[var(--theme-muted)]',
  }
  if (item.articleStatus === 'none') return null
  return (
    <span
      className={`rounded-full border px-2 py-1 text-xs ${classes[item.articleStatus]}`}
    >
      {labels[item.articleStatus]}
    </span>
  )
}
