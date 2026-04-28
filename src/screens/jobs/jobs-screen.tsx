'use client'

import type { TFunction } from 'i18next'
import { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AnimatePresence, motion } from 'motion/react'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  Add01Icon,
  ArrowDown01Icon,
  ArrowUp01Icon,
  Clock01Icon,
  Delete01Icon,
  PauseIcon,
  PencilEdit02Icon,
  PlayIcon,
  RefreshIcon,
  Search01Icon,
} from '@hugeicons/core-free-icons'
import { CreateJobDialog } from './create-job-dialog'
import { EditJobDialog } from './edit-job-dialog'
import type { HermesJob } from '@/lib/jobs-api'
import { toast } from '@/components/ui/toast'
import { cn } from '@/lib/utils'
import {
  createJob,
  deleteJob,
  fetchJobOutput,
  fetchJobs,
  pauseJob,
  resumeJob,
  triggerJob,
  updateJob,
} from '@/lib/jobs-api'

const QUERY_KEY = ['hermes', 'jobs'] as const

function formatNextRun(
  nextRun: string | null | undefined,
  t: TFunction<'jobs'>,
): string {
  if (!nextRun) return '—'
  try {
    const d = new Date(nextRun)
    const now = new Date()
    const diffMs = d.getTime() - now.getTime()
    if (diffMs < 0) return t('nextOverdue', { defaultValue: 'overdue' })
    if (diffMs < 60_000)
      return t('nextInUnderOneMinute', { defaultValue: 'in < 1m' })
    if (diffMs < 3_600_000) {
      const m = Math.round(diffMs / 60_000)
      return t('nextInMinutes', {
        count: m,
        defaultValue: `in ${m}m`,
      })
    }
    if (diffMs < 86_400_000) {
      const h = Math.round(diffMs / 3_600_000)
      return t('nextInHours', {
        count: h,
        defaultValue: `in ${h}h`,
      })
    }
    return d.toLocaleDateString()
  } catch {
    return nextRun
  }
}

function formatRunTimestamp(
  value: string | null | undefined,
  t: TFunction<'jobs'>,
): string {
  if (!value) return t('lastRunNever', { defaultValue: 'Never run' })
  try {
    return new Date(value).toLocaleString()
  } catch {
    return value
  }
}

function getOutputPreview(content: string): string {
  const normalized = content.replace(/\s+/g, ' ').trim()
  if (normalized.length <= 200) return normalized
  return `${normalized.slice(0, 200).trimEnd()}…`
}

function getLastRunStatus(
  job: HermesJob,
  t: TFunction<'jobs'>,
): {
  label: string
  color: string
} {
  if (!job.last_run_at) {
    return {
      label: t('lastRunNever', { defaultValue: 'Never run' }),
      color: 'var(--theme-muted)',
    }
  }
  if (job.last_run_success === true) {
    return {
      label: t('lastRunSucceeded', { defaultValue: 'Last run succeeded' }),
      color: 'var(--theme-success)',
    }
  }
  if (job.last_run_success === false) {
    return {
      label: t('lastRunFailed', { defaultValue: 'Last run failed' }),
      color: 'var(--theme-danger)',
    }
  }
  return {
    label: t('lastRunUnknown', { defaultValue: 'Last run unknown' }),
    color: 'var(--theme-muted)',
  }
}

function JobCard({
  job,
  t,
  onPause,
  onResume,
  onTrigger,
  onDelete,
  onEdit,
}: {
  job: HermesJob
  t: TFunction<'jobs'>
  onPause: (id: string) => void
  onResume: (id: string) => void
  onTrigger: (id: string) => void
  onDelete: (id: string) => void
  onEdit: (job: HermesJob) => void
}) {
  const [expanded, setExpanded] = useState(false)
  const isPaused = job.state === 'paused' || !job.enabled
  const isCompleted = job.state === 'completed'
  const lastRunStatus = getLastRunStatus(job, t)
  const outputQuery = useQuery({
    queryKey: ['hermes', 'jobs', job.id, 'output'],
    queryFn: () => fetchJobOutput(job.id),
    enabled: expanded,
    staleTime: 30_000,
  })

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className={cn(
        'rounded-xl border p-4 transition-colors',
        'bg-[var(--theme-card)] border-[var(--theme-border)]',
        isPaused && 'opacity-60',
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center gap-2">
            <span
              className="inline-block h-2 w-2 shrink-0 rounded-full"
              style={{
                background: isPaused
                  ? 'var(--theme-muted)'
                  : isCompleted
                    ? 'var(--theme-accent)'
                    : 'var(--theme-text)',
              }}
            />
            <h3 className="truncate text-sm font-medium text-[var(--theme-text)]">
              {job.name || t('unnamed', { defaultValue: '(unnamed)' })}
            </h3>
          </div>
          <p className="mb-2 line-clamp-2 text-xs text-[var(--theme-muted)]">
            {job.prompt}
          </p>
          <div className="mb-2 flex flex-wrap items-center gap-3 text-[10px] text-[var(--theme-muted)]">
            <span>
              {job.schedule_display ||
                t('scheduleCustom', { defaultValue: 'custom' })}
            </span>
            <span>·</span>
            <span>
              {t('nextLabel', {
                when: formatNextRun(job.next_run_at, t),
                defaultValue: 'Next: {{when}}',
              })}
            </span>
            <span>·</span>
            <span>
              {t('lastLabel', {
                when: formatRunTimestamp(job.last_run_at, t),
                defaultValue: 'Last: {{when}}',
              })}
            </span>
            {job.skills && job.skills.length > 0 && (
              <>
                <span>·</span>
                <span>
                  {t('skillCount', {
                    count: job.skills.length,
                    defaultValue:
                      job.skills.length === 1
                        ? '{{count}} skill'
                        : '{{count}} skills',
                  })}
                </span>
              </>
            )}
          </div>
          <div className="flex items-center gap-2 text-[11px] text-[var(--theme-muted)]">
            <span
              className="inline-block h-2.5 w-2.5 rounded-full"
              style={{ background: lastRunStatus.color }}
            />
            <span>{lastRunStatus.label}</span>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <button
            onClick={() => onTrigger(job.id)}
            className="rounded-lg p-1.5 transition-colors hover:bg-[var(--theme-hover)]"
            title={t('runNow', { defaultValue: 'Run now' })}
          >
            <HugeiconsIcon
              icon={PlayIcon}
              size={14}
              className="text-[var(--theme-accent)]"
            />
          </button>
          <button
            onClick={() => (isPaused ? onResume(job.id) : onPause(job.id))}
            className="rounded-lg p-1.5 transition-colors hover:bg-[var(--theme-hover)]"
            title={
              isPaused
                ? t('resume', { defaultValue: 'Resume' })
                : t('pause', { defaultValue: 'Pause' })
            }
          >
            <HugeiconsIcon
              icon={isPaused ? PlayIcon : PauseIcon}
              size={14}
              className="text-[var(--theme-muted)]"
            />
          </button>
          <button
            onClick={() => onEdit(job)}
            className="rounded-lg p-1.5 transition-colors hover:bg-[var(--theme-hover)]"
            title={t('edit', { defaultValue: 'Edit' })}
          >
            <HugeiconsIcon
              icon={PencilEdit02Icon}
              size={14}
              className="text-[var(--theme-muted)]"
            />
          </button>
          <button
            onClick={() => setExpanded((current) => !current)}
            className="rounded-lg p-1.5 transition-colors hover:bg-[var(--theme-hover)]"
            title={
              expanded
                ? t('hideRunHistory', { defaultValue: 'Hide run history' })
                : t('showRunHistory', { defaultValue: 'Show run history' })
            }
          >
            <HugeiconsIcon
              icon={expanded ? ArrowUp01Icon : ArrowDown01Icon}
              size={14}
              className="text-[var(--theme-muted)]"
            />
          </button>
          <button
            onClick={() => onDelete(job.id)}
            className="rounded-lg p-1.5 transition-colors hover:bg-[var(--theme-hover)]"
            title={t('delete', { defaultValue: 'Delete' })}
          >
            <HugeiconsIcon
              icon={Delete01Icon}
              size={14}
              style={{ color: 'var(--theme-danger)' }}
            />
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {expanded ? (
          <motion.div
            layout
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-3 border-t border-[var(--theme-border)] pt-3">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-xs font-medium text-[var(--theme-text)]">
                  {t('runHistory', { defaultValue: 'Run history' })}
                </p>
                <p className="text-[10px] text-[var(--theme-muted)]">
                  {t('showingRecentOutputs', {
                    defaultValue: 'Showing recent outputs',
                  })}
                </p>
              </div>
              {outputQuery.isLoading ? (
                <div className="rounded-lg border border-[var(--theme-border)] bg-[var(--theme-bg)] px-3 py-3 text-xs text-[var(--theme-muted)]">
                  {t('loadingOutputs', { defaultValue: 'Loading outputs...' })}
                </div>
              ) : outputQuery.isError ? (
                <div className="rounded-lg border border-[var(--theme-border)] bg-[var(--theme-bg)] px-3 py-3 text-xs text-[var(--theme-muted)]">
                  {t('failedOutputs', {
                    defaultValue: 'Failed to load outputs.',
                  })}
                </div>
              ) : outputQuery.data && outputQuery.data.length > 0 ? (
                <div className="space-y-2">
                  {outputQuery.data.map((output) => (
                    <div
                      key={`${output.filename}-${output.timestamp}`}
                      className="rounded-lg border border-[var(--theme-border)] bg-[var(--theme-bg)] px-3 py-3"
                    >
                      <div className="mb-1 flex items-center justify-between gap-2 text-[10px] text-[var(--theme-muted)]">
                        <span>
                          {formatRunTimestamp(output.timestamp, t)}
                        </span>
                        <span className="truncate">{output.filename}</span>
                      </div>
                      <p className="text-xs leading-5 text-[var(--theme-text)]">
                        {getOutputPreview(output.content) ||
                          t('noOutputContent', {
                            defaultValue: 'No output content',
                          })}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-lg border border-[var(--theme-border)] bg-[var(--theme-bg)] px-3 py-3 text-xs text-[var(--theme-muted)]">
                  {t('noRunOutputsYet', {
                    defaultValue: 'No run outputs yet.',
                  })}
                </div>
              )}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  )
}

export function JobsScreen() {
  const { t } = useTranslation('jobs')
  const { t: tNav } = useTranslation('nav')
  const queryClient = useQueryClient()
  const [search, setSearch] = useState('')
  const [showCreate, setShowCreate] = useState(false)
  const [editingJob, setEditingJob] = useState<HermesJob | null>(null)

  const jobsQuery = useQuery({
    queryKey: QUERY_KEY,
    queryFn: fetchJobs,
    refetchInterval: 30_000,
  })

  const pauseMutation = useMutation({
    mutationFn: pauseJob,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: QUERY_KEY })
      toast(t('toastPaused', { defaultValue: 'Job paused' }))
    },
  })
  const resumeMutation = useMutation({
    mutationFn: resumeJob,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: QUERY_KEY })
      toast(t('toastResumed', { defaultValue: 'Job resumed' }))
    },
  })
  const triggerMutation = useMutation({
    mutationFn: triggerJob,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: QUERY_KEY })
      toast(t('toastTriggered', { defaultValue: 'Job triggered' }))
    },
  })
  const deleteMutation = useMutation({
    mutationFn: deleteJob,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: QUERY_KEY })
      toast(t('toastDeleted', { defaultValue: 'Job deleted' }))
    },
  })
  const createMutation = useMutation({
    mutationFn: createJob,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: QUERY_KEY })
      toast(t('toastCreated', { defaultValue: 'Job created' }))
      setShowCreate(false)
    },
    onError: (error) => {
      toast(
        error instanceof Error
          ? error.message
          : t('failedCreate', { defaultValue: 'Failed to create job' }),
        {
          type: 'error',
        },
      )
    },
  })
  const updateMutation = useMutation({
    mutationFn: async (payload: {
      jobId: string
      updates: {
        name: string
        schedule: string
        prompt: string
        deliver?: Array<string>
        skills?: Array<string>
        repeat?: number
      }
    }) => updateJob(payload.jobId, payload.updates),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: QUERY_KEY })
      toast(t('toastUpdated', { defaultValue: 'Job updated' }))
      setEditingJob(null)
    },
    onError: (error) => {
      toast(
        error instanceof Error
          ? error.message
          : t('failedUpdate', { defaultValue: 'Failed to update job' }),
        {
          type: 'error',
        },
      )
    },
  })

  const filteredJobs = useMemo(() => {
    const jobs = jobsQuery.data ?? []
    if (!search.trim()) return jobs
    const q = search.toLowerCase()
    return jobs.filter(
      (j) =>
        j.name?.toLowerCase().includes(q) ||
        j.prompt?.toLowerCase().includes(q),
    )
  }, [jobsQuery.data, search])

  const handleCreate = useCallback(
    async (input: {
      name: string
      schedule: string
      prompt: string
      deliver?: Array<string>
      skills?: Array<string>
      repeat?: number
    }) => {
      await createMutation.mutateAsync(input)
    },
    [createMutation],
  )

  return (
    <div className="min-h-full overflow-y-auto bg-surface text-ink">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-5 px-4 py-6 pb-[calc(var(--tabbar-h,80px)+1.5rem)] sm:px-6 lg:px-8">
      <header className="rounded-2xl border border-primary-200 bg-primary-50/85 p-4 backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <HugeiconsIcon
            icon={Clock01Icon}
            size={18}
            className="text-[var(--theme-accent)]"
          />
          <h1 className="text-base font-semibold text-[var(--theme-text)]">
            {tNav('jobs', { defaultValue: 'Jobs' })}
          </h1>
          {jobsQuery.data && (
            <span className="ml-1 text-xs text-[var(--theme-muted)]">
              ({jobsQuery.data.length})
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() =>
              void queryClient.invalidateQueries({ queryKey: QUERY_KEY })
            }
            className="rounded-lg p-1.5 transition-colors hover:bg-[var(--theme-hover)]"
            title={t('refresh', { defaultValue: 'Refresh' })}
          >
            <HugeiconsIcon
              icon={RefreshIcon}
              size={16}
              className="text-[var(--theme-muted)]"
            />
          </button>
          <button
            onClick={() => setShowCreate(true)}
            className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-90"
            style={{ background: 'var(--theme-accent)' }}
          >
            <HugeiconsIcon icon={Add01Icon} size={14} />
            {t('newJob', { defaultValue: 'New Job' })}
          </button>
        </div>
      </div>
      </header>

      <div className="rounded-2xl border border-primary-200 bg-primary-50/85 p-4 backdrop-blur-xl">
        <div className="relative">
          <HugeiconsIcon
            icon={Search01Icon}
            size={14}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--theme-muted)]"
          />
          <input
            type="text"
            placeholder={t('searchPlaceholder', {
              defaultValue: 'Search jobs...',
            })}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-[var(--theme-border)] bg-[var(--theme-input)] py-1.5 pl-8 pr-3 text-xs text-[var(--theme-text)] placeholder:text-[var(--theme-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--theme-accent)]"
          />
        </div>
      </div>

      <div className="flex-1 space-y-2 overflow-y-auto px-4 py-3">
        {jobsQuery.isLoading ? (
          <div className="flex items-center justify-center py-12 text-sm text-[var(--theme-muted)]">
            {t('loadingJobs', { defaultValue: 'Loading jobs...' })}
          </div>
        ) : jobsQuery.isError ? (
          <div
            className="flex items-center justify-center py-12 text-sm"
            style={{ color: 'var(--theme-danger)' }}
          >
            {t('loadFailedPrefix', { defaultValue: 'Failed to load jobs:' })}{' '}
            {jobsQuery.error instanceof Error
              ? jobsQuery.error.message
              : t('unknownError', { defaultValue: 'Unknown error' })}
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-[var(--theme-muted)]">
            <HugeiconsIcon
              icon={Clock01Icon}
              size={32}
              className="mb-3 opacity-40"
            />
            <p className="text-sm font-medium">
              {t('emptyTitle', { defaultValue: 'No scheduled jobs' })}
            </p>
            <p className="mt-1 text-xs">
              {t('emptyHint', { defaultValue: 'Create one to get started' })}
            </p>
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            {filteredJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                t={t}
                onPause={(id) => pauseMutation.mutate(id)}
                onResume={(id) => resumeMutation.mutate(id)}
                onTrigger={(id) => triggerMutation.mutate(id)}
                onEdit={(job) => setEditingJob(job)}
                onDelete={(id) => {
                  const name =
                    job.name || t('unnamed', { defaultValue: '(unnamed)' })
                  if (
                    confirm(
                      t('deleteConfirm', {
                        name,
                        defaultValue: 'Delete job "{{name}}"?',
                      }),
                    )
                  ) {
                    deleteMutation.mutate(id)
                  }
                }}
              />
            ))}
          </AnimatePresence>
        )}
      </div>

      <CreateJobDialog
        open={showCreate}
        onOpenChange={setShowCreate}
        onSubmit={handleCreate}
        isSubmitting={createMutation.isPending}
      />
      <EditJobDialog
        job={editingJob}
        open={editingJob !== null}
        onOpenChange={(open) => {
          if (!open) setEditingJob(null)
        }}
        onSubmit={async (updates) => {
          if (!editingJob) return
          await updateMutation.mutateAsync({
            jobId: editingJob.id,
            updates,
          })
        }}
        isSubmitting={updateMutation.isPending}
      />
    </div>
    </div>
  )
}
