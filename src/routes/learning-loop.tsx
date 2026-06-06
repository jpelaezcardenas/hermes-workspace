'use client'

import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type {
  LearningLoopReview,
  LearningLoopReviewItem,
} from '@/features/learning-loop/types'
import { usePageTitle } from '@/hooks/use-page-title'
import { cn } from '@/lib/utils'

type FilterKind = 'all' | 'memory' | 'skill'
type FilterRisk = 'all' | 'high' | 'medium' | 'low'

async function fetchLearningLoopReview(): Promise<LearningLoopReview> {
  const response = await fetch('/api/learning-loop/review?windowHours=168')
  const data = (await response.json()) as LearningLoopReview
  if (!response.ok || data.ok === false) {
    throw new Error(data.error ?? `HTTP ${response.status}`)
  }
  return data
}

export const Route = createFileRoute('/learning-loop')({
  ssr: false,
  component: LearningLoopRoute,
})

function riskClass(risk: LearningLoopReviewItem['risk']) {
  if (risk === 'high') return 'border-red-400/30 bg-red-400/10 text-red-300'
  if (risk === 'medium')
    return 'border-amber-400/30 bg-amber-400/10 text-amber-300'
  return 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300'
}

function kindClass(kind: LearningLoopReviewItem['kind']) {
  return kind === 'memory'
    ? 'border-sky-400/30 bg-sky-400/10 text-sky-300'
    : 'border-violet-400/30 bg-violet-400/10 text-violet-300'
}

function formatAge(ageHours: number) {
  if (ageHours < 1) return 'Just now'
  if (ageHours < 24) return `${ageHours}h ago`
  return `${Math.round(ageHours / 24)}d ago`
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))
}

function Pill({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <span
      className={cn(
        'rounded-full border px-2 py-0.5 text-[11px] font-medium',
        className,
      )}
    >
      {children}
    </span>
  )
}

function MetricCard({
  label,
  value,
  tone,
}: {
  label: string
  value: number | string
  tone?: 'danger' | 'warning' | 'info'
}) {
  const toneClass =
    tone === 'danger'
      ? 'border-red-400/25 bg-red-400/10'
      : tone === 'warning'
        ? 'border-amber-400/25 bg-amber-400/10'
        : tone === 'info'
          ? 'border-sky-400/25 bg-sky-400/10'
          : 'border-[var(--theme-border)] bg-[var(--theme-card)]'

  return (
    <section className={cn('rounded-3xl border p-5', toneClass)}>
      <p className="text-xs uppercase tracking-[0.18em] text-[var(--theme-muted)]">
        {label}
      </p>
      <p className="mt-2 text-3xl font-semibold text-ink">{value}</p>
    </section>
  )
}

function ReviewItemCard({ item }: { item: LearningLoopReviewItem }) {
  return (
    <article className="rounded-3xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-5 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap gap-2">
            <Pill className={kindClass(item.kind)}>{item.kind}</Pill>
            <Pill className={riskClass(item.risk)}>{item.risk} risk</Pill>
            <Pill className="border-[var(--theme-border)] text-[var(--theme-muted)]">
              {item.profile}
            </Pill>
            <Pill className="border-[var(--theme-border)] text-[var(--theme-muted)]">
              {item.status}
            </Pill>
          </div>
          <h2 className="mt-3 break-words text-lg font-semibold text-ink">
            {item.name}
          </h2>
          <p className="mt-1 break-all text-xs text-[var(--theme-muted)]">
            {item.relativePath}
          </p>
        </div>
        <div className="shrink-0 text-right text-xs text-[var(--theme-muted)]">
          <div className="text-ink">{formatAge(item.ageHours)}</div>
          <div>{formatDate(item.updatedAt)}</div>
        </div>
      </div>

      <p className="mt-4 rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-bg)] p-3 text-sm leading-relaxed text-[var(--theme-muted)]">
        {item.summary}
      </p>

      {item.reviewFlags.length ? (
        <div className="mt-4 space-y-2">
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--theme-muted)]">
            Review flags
          </p>
          <ul className="space-y-2">
            {item.reviewFlags.map((flag) => (
              <li
                key={flag}
                className="flex gap-2 text-xs leading-relaxed text-[var(--theme-muted)]"
              >
                <span className="mt-1 size-1.5 shrink-0 rounded-full bg-[var(--theme-accent)]" />
                <span>{flag}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="mt-5 flex flex-wrap gap-2">
        <button
          type="button"
          className="rounded-xl border border-[var(--theme-border)] px-3 py-2 text-xs font-semibold text-[var(--theme-muted)] transition hover:border-[var(--theme-accent)] hover:text-ink"
          onClick={() => {
            void navigator.clipboard.writeText(item.relativePath)
          }}
        >
          Copy path
        </button>
        <button
          type="button"
          className="rounded-xl border border-[var(--theme-border)] px-3 py-2 text-xs font-semibold text-[var(--theme-muted)] opacity-70"
          disabled
          title="Live review actions are intentionally not wired yet"
        >
          Mark reviewed, coming next
        </button>
      </div>
    </article>
  )
}

function EmptyState() {
  return (
    <section className="rounded-3xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-8 text-center">
      <p className="text-lg font-semibold text-ink">
        No recent learning-loop changes found.
      </p>
      <p className="mt-2 text-sm text-[var(--theme-muted)]">
        This read-only pilot watches recent memory and skill file changes across
        Hermes profiles.
      </p>
    </section>
  )
}

function LearningLoopRoute() {
  usePageTitle('Learning Loop')
  const [kindFilter, setKindFilter] = useState<FilterKind>('all')
  const [riskFilter, setRiskFilter] = useState<FilterRisk>('all')
  const reviewQuery = useQuery({
    queryKey: ['learning-loop-review'],
    queryFn: fetchLearningLoopReview,
    refetchInterval: 60_000,
    staleTime: 30_000,
  })

  const review = reviewQuery.data
  const filteredItems = useMemo(() => {
    const items = review?.items ?? []
    return items.filter((item) => {
      if (kindFilter !== 'all' && item.kind !== kindFilter) return false
      if (riskFilter !== 'all' && item.risk !== riskFilter) return false
      return true
    })
  }, [kindFilter, review?.items, riskFilter])

  return (
    <div className="min-h-full bg-[var(--theme-bg)] px-4 py-6 text-ink md:px-8 lg:px-10">
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="rounded-[2rem] border border-[var(--theme-border)] bg-[var(--theme-card)] p-6 shadow-sm md:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--theme-muted)]">
                Hermes learning loop
              </p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink md:text-4xl">
                Memory and Skill Change Review
              </h1>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--theme-muted)] md:text-base">
                Read-only surface for seeing what Hermes recently learned, which
                profile it affects, and what needs human review before learning
                becomes invisible system drift.
              </p>
            </div>
            <div className="rounded-2xl border border-amber-400/25 bg-amber-400/10 p-3 text-xs leading-relaxed text-amber-200">
              Safe pilot: no writes, no undo, no profile changes.
              <br />
              Live controls stay gated until approved.
            </div>
          </div>
        </header>

        {reviewQuery.isError ? (
          <section className="rounded-3xl border border-red-400/25 bg-red-400/10 p-5 text-sm text-red-200">
            Failed to load learning-loop review:{' '}
            {reviewQuery.error instanceof Error
              ? reviewQuery.error.message
              : 'Unknown error'}
          </section>
        ) : null}

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <MetricCard
            label="Recent changes"
            value={review?.counts.total ?? '…'}
            tone="info"
          />
          <MetricCard
            label="Review needed"
            value={review?.counts.reviewNeeded ?? '…'}
            tone="warning"
          />
          <MetricCard
            label="High risk"
            value={review?.counts.highRisk ?? '…'}
            tone="danger"
          />
          <MetricCard label="Memory" value={review?.counts.memory ?? '…'} />
          <MetricCard label="Skills" value={review?.counts.skill ?? '…'} />
        </div>

        <section className="rounded-3xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="text-sm text-[var(--theme-muted)]">
              Window: last {review?.windowHours ?? 168} hours
              {review ? ` across ${review.profiles.length} profiles` : ''}
            </div>
            <div className="flex flex-wrap gap-2">
              {(['all', 'memory', 'skill'] as const).map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setKindFilter(filter)}
                  className={cn(
                    'rounded-xl border px-3 py-2 text-xs font-semibold transition',
                    kindFilter === filter
                      ? 'border-[var(--theme-accent)] bg-[var(--theme-accent)]/10 text-ink'
                      : 'border-[var(--theme-border)] text-[var(--theme-muted)] hover:text-ink',
                  )}
                >
                  {filter}
                </button>
              ))}
              {(['all', 'high', 'medium', 'low'] as const).map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setRiskFilter(filter)}
                  className={cn(
                    'rounded-xl border px-3 py-2 text-xs font-semibold transition',
                    riskFilter === filter
                      ? 'border-[var(--theme-accent)] bg-[var(--theme-accent)]/10 text-ink'
                      : 'border-[var(--theme-border)] text-[var(--theme-muted)] hover:text-ink',
                  )}
                >
                  {filter} risk
                </button>
              ))}
            </div>
          </div>
        </section>

        <div className="space-y-4">
          {reviewQuery.isLoading ? (
            <section className="rounded-3xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-8 text-center text-sm text-[var(--theme-muted)]">
              Loading learning-loop changes…
            </section>
          ) : filteredItems.length ? (
            filteredItems.map((item) => (
              <ReviewItemCard key={item.id} item={item} />
            ))
          ) : (
            <EmptyState />
          )}
        </div>
      </div>
    </div>
  )
}
