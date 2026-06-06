import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { useMemo } from 'react'
import {
  DOMAIN_ORDER,
  getStartHereQueueState,
  sortQueueItems,
} from './-command-center-utils'
import type { ReactNode } from 'react'
import type {
  ExecutiveQueueItem,
  QueueBoardColumn,
} from '@/routes/api/-executive-queue-utils'
import { cn } from '@/lib/utils'
import { toast } from '@/components/ui/toast'
import { openHamburgerMenu } from '@/components/mobile-hamburger-menu'

type ExecutiveQueueResponse = {
  ok: boolean
  items: Array<ExecutiveQueueItem>
  grouped: Record<QueueBoardColumn, Array<ExecutiveQueueItem>>
  total: number
  error?: string
}

type QueueExecutionMode = 'approve_and_run' | 'draft_only' | 'explain_more'

type QueueMutationResponse = {
  ok: boolean
  item?: ExecutiveQueueItem
  error?: string
}

type QueueExecutionResponse = QueueMutationResponse & {
  execution?: { id: string; sessionKey: string; mode?: QueueExecutionMode }
  runId?: string | null
  sessionKey?: string
}

type GatewayStatusResponse = {
  gateway?: { available?: boolean; url?: string }
  dashboard?: { available?: boolean; url?: string }
  mode?: string
  capabilities?: Record<string, boolean | { available?: boolean }>
  error?: string
}

type JobLike = {
  id?: string
  name?: string
  title?: string
  enabled?: boolean
  last_status?: string
  lastStatus?: string
  status?: string
  next_run?: string
  nextRun?: string
  schedule?: string
}

type JobsResponse = {
  jobs?: Array<JobLike>
  items?: Array<JobLike>
  error?: string
}

type SessionLike = {
  id?: string
  key?: string
  title?: string
  label?: string
  derivedTitle?: string
  startedAt?: number
  started_at?: number
  updatedAt?: number
  updated_at?: number
}

type SessionsResponse = {
  sessions?: Array<SessionLike>
}

type MotionAction = {
  taskId?: string
  name?: string
  workspace?: string
  dueDateET?: string
  scheduledStartET?: string | null
  priority?: string
  deadlineType?: string
  ownership?: string
  riskLevel?: string
  actionType?: string
  safety?: string
  reason?: string
}

type ReaderAction = {
  title?: string
  author?: string
  source?: string
  source_url?: string
  contentType?: string
  score?: number
  actionType?: string
  safety?: string
  reason?: string
  failureReason?: string
  nextAction?: string
  handle?: string
  saves?: number
  examples?: Array<ReaderAction>
}

type GranolaAction = {
  noteId?: string
  noteTitle?: string
  createdAt?: string
  domain?: string
  heading?: string
  text?: string
  actionType?: string
  safety?: string
  reason?: string
}

type AiOpsIntakeQueueItem = {
  id?: string
  source?: string
  sourceType?: string
  sourceId?: string | null
  title?: string
  detail?: string
  actionType?: string
  nextAction?: string
  owner?: string
  domain?: string
  priority?: string
  riskLevel?: string
  gate?: string
  safety?: string
  createdAt?: string | null
  sourceUrl?: string | null
  reason?: string
}

type SourceCoverageSource = {
  available?: boolean
  items_last_30_days_scanned?: number
  estimated_ai_relevant_items?: number
  x_bookmarks_30_days?: number
  reader_action_summary?: {
    readyForAiLearningCount?: number
    freshReadyCount?: number
    xWatchlistCandidateCount?: number
    transcriptFailureCount?: number
  }
  reader_actions?: {
    readyForAiLearning?: Array<ReaderAction>
    freshReady?: Array<ReaderAction>
    xWatchlistCandidates?: Array<ReaderAction>
    transcriptFailures?: Array<ReaderAction>
  }
  content_type_counts?: Record<string, number>
  ai_relevant_type_counts?: Record<string, number>
  task_count?: number
  unscheduled_count?: number
  due_today_count?: number
  tim_owned_count?: number
  teammate_owned_count?: number
  ambiguous_unassigned_count?: number
  tim_owned_unscheduled_count?: number
  ownership_counts?: Record<string, number>
  action_summary?: {
    actionCandidateCount?: number
    needsTimDecisionCount?: number
    followUpCandidateCount?: number
    ownershipClarificationCount?: number
    assignedActionCandidateCount?: number
    safeWriteCount?: number
    approvalRequiredCount?: number
    suppressedCount?: number
  }
  motion_actions?: {
    safeWriteActions?: Array<MotionAction>
    approvalRequired?: Array<MotionAction>
    suppressedItems?: Array<MotionAction>
  }
  recent_notes_scanned?: number
  eligible_notes_parsed?: number
  skipped_confidential_or_sensitive?: number
  fetch_errors?: number
  domain_counts?: Record<string, number>
  granola_actions?: {
    needsTimDecision?: Array<GranolaAction>
    followUpCandidates?: Array<GranolaAction>
    ownershipClarifications?: Array<GranolaAction>
    assignedActionCandidates?: Array<GranolaAction>
  }
  summary?: {
    totalItemCount?: number
    topItemCount?: number
    needsTimDecisionCount?: number
    safeAgentWorkCount?: number
    approvalRequiredCount?: number
    recoveryRequiredCount?: number
    reviewOwnerCount?: number
    learnFromThisCount?: number
    draftFollowUpCount?: number
    suppressedAuditCount?: number
    sourceCounts?: Record<string, number>
    ownerCounts?: Record<string, number>
    actionCounts?: Record<string, number>
    gateCounts?: Record<string, number>
    riskCounts?: Record<string, number>
  }
  topItems?: Array<AiOpsIntakeQueueItem>
  notes_returned_first_page?: number
  recent_notes_36h_first_page?: number
  items_checked?: number
  acceptable_full_transcripts?: number
  unacceptable_transcripts?: number
  tim_notice_required?: boolean
  error?: string
}

type SourceCoverageResponse = {
  ok: boolean
  snapshot?: {
    generated_at?: string
    sources?: Partial<Record<string, SourceCoverageSource>>
  }
  error?: string
}

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url)
  const data = (await response.json().catch(() => ({}))) as T
  if (!response.ok) {
    const maybeError = data as { error?: string }
    throw new Error(maybeError.error ?? `HTTP ${response.status}`)
  }
  return data
}

async function holdQueueItem(
  id: string,
  note: string,
): Promise<ExecutiveQueueItem> {
  const response = await fetch('/api/executive-queue', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id,
      action: 'approval',
      decision: 'hold',
      note,
      actor: 'Tim',
    }),
  })
  const data = (await response
    .json()
    .catch(() => ({}))) as QueueMutationResponse
  if (!response.ok || data.ok === false || !data.item) {
    throw new Error(data.error ?? `HTTP ${response.status}`)
  }
  return data.item
}

async function executeQueueItem(
  id: string,
  mode: QueueExecutionMode,
  note: string,
): Promise<QueueExecutionResponse> {
  const response = await fetch('/api/executive-queue-execution', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id,
      mode,
      note,
      actor: 'Tim',
      sessionKey: 'executive-command-center',
    }),
  })
  const data = (await response
    .json()
    .catch(() => ({}))) as QueueExecutionResponse
  if (!response.ok || data.ok === false) {
    throw new Error(data.error ?? `HTTP ${response.status}`)
  }
  return data
}

function priorityTone(
  priority: string,
): 'neutral' | 'good' | 'warn' | 'danger' | 'accent' {
  if (priority === 'P0') return 'danger'
  if (priority === 'P1') return 'warn'
  if (priority === 'P2') return 'accent'
  return 'neutral'
}

function statusTone(
  status: string,
): 'neutral' | 'good' | 'warn' | 'danger' | 'accent' {
  if (status === 'Blocked') return 'danger'
  if (status === 'Proposed' || status === 'Triage') return 'warn'
  if (status === 'In Progress') return 'accent'
  if (status === 'Queued') return 'good'
  return 'neutral'
}

function formatTimestamp(value?: string | number): string {
  if (!value) return 'No time set'
  const date =
    typeof value === 'number'
      ? new Date(value > 10_000_000_000 ? value : value * 1000)
      : new Date(value)
  if (Number.isNaN(date.getTime())) return 'Unknown'
  return date.toLocaleString([], {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

function getSessionTime(session: SessionLike): number {
  const raw =
    session.updatedAt ??
    session.updated_at ??
    session.startedAt ??
    session.started_at ??
    0
  return raw > 10_000_000_000 ? raw : raw * 1000
}

function Badge({
  children,
  tone = 'neutral',
}: {
  children: ReactNode
  tone?: 'neutral' | 'good' | 'warn' | 'danger' | 'accent'
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium',
        tone === 'good' &&
          'border-emerald-400/30 bg-emerald-400/10 text-emerald-300',
        tone === 'warn' && 'border-amber-400/30 bg-amber-400/10 text-amber-200',
        tone === 'danger' && 'border-red-400/30 bg-red-400/10 text-red-200',
        tone === 'accent' &&
          'border-[var(--theme-accent-border)] bg-[var(--theme-accent)]/10 text-[var(--theme-accent)]',
        tone === 'neutral' &&
          'border-[var(--theme-border)] text-[var(--theme-muted)]',
      )}
    >
      {children}
    </span>
  )
}

function Panel({
  title,
  eyebrow,
  children,
  action,
}: {
  title: string
  eyebrow?: string
  children: ReactNode
  action?: ReactNode
}) {
  return (
    <section className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-card)]/85 p-4 shadow-sm backdrop-blur">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          {eyebrow ? (
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--theme-muted)]">
              {eyebrow}
            </div>
          ) : null}
          <h2 className="mt-1 text-base font-semibold text-ink">{title}</h2>
        </div>
        {action}
      </div>
      {children}
    </section>
  )
}

function ActionButton({
  children,
  onClick,
  primary = false,
  disabled = false,
}: {
  children: ReactNode
  onClick: () => void
  primary?: boolean
  disabled?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'rounded-xl border px-3 py-2 text-sm font-medium transition active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50',
        primary
          ? 'border-[var(--theme-accent-border)] bg-[var(--theme-accent)] text-white hover:brightness-110'
          : 'border-[var(--theme-border)] bg-[var(--theme-card2)] text-ink hover:border-[var(--theme-accent-border)]',
      )}
    >
      {children}
    </button>
  )
}

function QueueRow({
  item,
  onClick,
  dense = false,
}: {
  item: ExecutiveQueueItem
  onClick: () => void
  dense?: boolean
}) {
  const riskTone =
    item.riskLevel === 'High'
      ? 'danger'
      : item.riskLevel === 'Medium'
        ? 'warn'
        : 'good'
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'w-full rounded-xl border border-[var(--theme-border)] bg-[var(--theme-card2)] text-left transition hover:border-[var(--theme-accent-border)]',
        dense ? 'p-2.5' : 'p-3',
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-sm font-semibold leading-snug text-ink">
            {item.title}
          </div>
          <p
            className={cn(
              'mt-1 text-xs leading-relaxed text-[var(--theme-muted)]',
              dense ? 'line-clamp-1' : 'line-clamp-2',
            )}
          >
            {item.nextAction || item.outcome}
          </p>
        </div>
        <Badge tone={priorityTone(item.priority)}>{item.priority}</Badge>
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        <Badge tone={statusTone(item.status)}>{item.status}</Badge>
        <Badge tone={riskTone}>{item.riskLevel} risk</Badge>
        <Badge>{item.owner}</Badge>
      </div>
    </button>
  )
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-xl border border-dashed border-[var(--theme-border)] bg-[var(--theme-card2)] p-4 text-sm text-[var(--theme-muted)]">
      {text}
    </div>
  )
}

export function DashboardScreen() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const queueQuery = useQuery({
    queryKey: ['command-center', 'executive-queue'],
    queryFn: () => fetchJson<ExecutiveQueueResponse>('/api/executive-queue'),
    staleTime: 10_000,
    refetchInterval: 20_000,
  })

  const gatewayQuery = useQuery({
    queryKey: ['command-center', 'gateway-status'],
    queryFn: () => fetchJson<GatewayStatusResponse>('/api/gateway-status'),
    staleTime: 10_000,
    refetchInterval: 30_000,
  })

  const jobsQuery = useQuery({
    queryKey: ['command-center', 'jobs'],
    queryFn: () => fetchJson<JobsResponse>('/api/hermes-jobs'),
    staleTime: 20_000,
    refetchInterval: 60_000,
  })

  const sessionsQuery = useQuery({
    queryKey: ['command-center', 'sessions'],
    queryFn: () =>
      fetchJson<SessionsResponse>('/api/sessions?limit=8&offset=0'),
    staleTime: 20_000,
    refetchInterval: 60_000,
  })

  const sourceCoverageQuery = useQuery({
    queryKey: ['command-center', 'source-coverage'],
    queryFn: () => fetchJson<SourceCoverageResponse>('/api/source-coverage'),
    staleTime: 60_000,
    refetchInterval: 120_000,
  })

  const executionMutation = useMutation({
    mutationFn: ({
      id,
      mode,
      note,
    }: {
      id: string
      mode: QueueExecutionMode
      note: string
    }) => executeQueueItem(id, mode, note),
    onSuccess: async (result) => {
      await queryClient.invalidateQueries({
        queryKey: ['command-center', 'executive-queue'],
      })
      const mode = result.execution?.mode
      if (mode === 'explain_more') {
        toast('Explanation requested. Watch Telegram for the answer.', {
          type: 'success',
        })
        return
      }
      toast(
        result.sessionKey
          ? `Execution dispatched to ${result.sessionKey}.`
          : 'Execution dispatched.',
        { type: 'success' },
      )
    },
    onError: (error) => {
      toast(
        error instanceof Error ? error.message : 'Execution dispatch failed.',
        { type: 'error' },
      )
    },
  })

  const holdMutation = useMutation({
    mutationFn: ({ id, note }: { id: string; note: string }) =>
      holdQueueItem(id, note),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['command-center', 'executive-queue'],
      })
      toast('Queue item held.', { type: 'success' })
    },
    onError: (error) => {
      toast(error instanceof Error ? error.message : 'Hold failed.', {
        type: 'error',
      })
    },
  })

  const items = queueQuery.data?.items ?? []
  const startHereState = useMemo(() => getStartHereQueueState(items), [items])
  const {
    activeItems,
    criticalExceptionItems,
    approvalItems,
    blockedItems,
    blitzItems,
    safeDraftOnlyItem,
    inProgressItems,
    primaryItem,
    primaryMode,
    primaryCta,
    topLine: queueTopLine,
  } = startHereState
  const laneCounts = useMemo(() => {
    const counts = new Map<string, number>()
    for (const item of activeItems)
      counts.set(item.domain, (counts.get(item.domain) ?? 0) + 1)
    return [...counts.entries()].sort((a, b) => {
      const aIndex = DOMAIN_ORDER.indexOf(a[0])
      const bIndex = DOMAIN_ORDER.indexOf(b[0])
      return (
        (aIndex === -1 ? 99 : aIndex) - (bIndex === -1 ? 99 : bIndex) ||
        b[1] - a[1]
      )
    })
  }, [activeItems])
  const jobs = jobsQuery.data?.jobs ?? jobsQuery.data?.items ?? []
  const sourceCoverage = sourceCoverageQuery.data?.snapshot?.sources ?? {}
  const aiOpsIntakeQueue = sourceCoverage.ai_ops_intake_queue
  const aiOpsIntakeSummary = aiOpsIntakeQueue?.summary
  const aiOpsIntakeItems = aiOpsIntakeQueue?.topItems ?? []
  const readerCoverage = sourceCoverage.reader_readwise
  const readerActionSummary = readerCoverage?.reader_action_summary
  const readerActions = readerCoverage?.reader_actions
  const readerReadyActions = readerActions?.readyForAiLearning ?? []
  const readerFreshActions = readerActions?.freshReady ?? []
  const readerXWatchlistCandidates = readerActions?.xWatchlistCandidates ?? []
  const readerTranscriptFailures = readerActions?.transcriptFailures ?? []
  const transcriptCoverage = sourceCoverage.ai_learning_transcripts
  const granolaCoverage = sourceCoverage.granola
  const granolaActionSummary = granolaCoverage?.action_summary
  const granolaActions = granolaCoverage?.granola_actions
  const granolaNeedsDecision = granolaActions?.needsTimDecision ?? []
  const granolaFollowUps = granolaActions?.followUpCandidates ?? []
  const granolaOwnershipClarifications =
    granolaActions?.ownershipClarifications ?? []
  const granolaAssignedActions = granolaActions?.assignedActionCandidates ?? []
  const motionCoverage = sourceCoverage.motion
  const motionActionSummary = motionCoverage?.action_summary
  const motionActions = motionCoverage?.motion_actions
  const motionSafeWriteActions = motionActions?.safeWriteActions ?? []
  const motionApprovalRequiredActions = motionActions?.approvalRequired ?? []
  const motionSuppressedItems = motionActions?.suppressedItems ?? []
  const sourceCoverageGeneratedAt =
    sourceCoverageQuery.data?.snapshot?.generated_at
  const sourceCoverageProblems = [
    readerCoverage && !readerCoverage.available ? 'Reader unavailable' : null,
    readerActionSummary?.readyForAiLearningCount
      ? 'Reader actions ready'
      : null,
    readerActionSummary?.transcriptFailureCount
      ? 'Reader transcript gaps'
      : null,
    transcriptCoverage?.tim_notice_required ? 'Transcript gaps' : null,
    granolaCoverage && !granolaCoverage.available
      ? 'Granola unavailable'
      : null,
    granolaActionSummary?.needsTimDecisionCount
      ? 'Granola Tim decisions'
      : null,
    granolaActionSummary?.followUpCandidateCount ? 'Granola follow-ups' : null,
    motionCoverage && !motionCoverage.available ? 'Motion unavailable' : null,
    motionActionSummary?.safeWriteCount ? 'Motion write actions ready' : null,
    motionActionSummary?.approvalRequiredCount
      ? 'Motion ownership review'
      : null,
    aiOpsIntakeSummary?.needsTimDecisionCount
      ? 'Unified queue Tim decisions'
      : null,
    aiOpsIntakeSummary?.recoveryRequiredCount
      ? 'Unified queue recovery work'
      : null,
    aiOpsIntakeSummary?.approvalRequiredCount
      ? 'Unified queue approvals'
      : null,
  ].filter(Boolean)
  const failedJobs = jobs.filter((job) =>
    String(job.last_status ?? job.lastStatus ?? job.status ?? '')
      .toLowerCase()
      .includes('fail'),
  )
  const enabledJobs = jobs.filter((job) => job.enabled !== false)
  const recentSessions = (sessionsQuery.data?.sessions ?? [])
    .slice()
    .sort((a, b) => getSessionTime(b) - getSessionTime(a))
    .slice(0, 5)

  const gatewayOnline = Boolean(gatewayQuery.data?.gateway?.available)
  const dashboardOnline = Boolean(gatewayQuery.data?.dashboard?.available)
  const gatewayStatusLoaded = Boolean(gatewayQuery.data)
  const systemExceptions = [
    ...(gatewayStatusLoaded && !gatewayOnline
      ? [
          {
            id: 'gateway-offline',
            title: 'Hermes gateway offline',
            detail:
              'Telegram command surface and Workspace backend access may be impaired.',
            target: '/dashboard' as const,
          },
        ]
      : []),
    ...(gatewayStatusLoaded && !dashboardOnline
      ? [
          {
            id: 'dashboard-limited',
            title: 'Dashboard API limited',
            detail:
              'Sessions, skills, config, and Command Center context may be incomplete.',
            target: '/dashboard' as const,
          },
        ]
      : []),
    ...failedJobs.slice(0, 5).map((job, index) => ({
      id: job.id ?? `failed-job-${index}`,
      title: job.name ?? job.title ?? job.id ?? 'Unnamed failed job',
      detail:
        'Scheduled work reported a failure. Inspect before trusting the workflow.',
      target: '/jobs' as const,
    })),
  ]
  const criticalExceptionCount =
    criticalExceptionItems.length + systemExceptions.length
  const needsDecisionCount = approvalItems.length
  const needsUnblockCount = blockedItems.length
  const activeCount = activeItems.length

  const topLine =
    !primaryItem && systemExceptions.length
      ? `${systemExceptions.length} system exception${systemExceptions.length === 1 ? '' : 's'} need repair before the operating picture is trustworthy.`
      : queueTopLine

  const mutationPending = executionMutation.isPending || holdMutation.isPending
  const canRunPrimarySafeDraft =
    primaryMode === 'Blitz' &&
    Boolean(primaryItem) &&
    safeDraftOnlyItem?.id === primaryItem?.id
  const runPrimaryItem = (mode: QueueExecutionMode) => {
    if (!primaryItem || mutationPending) return
    if (mode !== 'explain_more' && !canRunPrimarySafeDraft) {
      toast('This item needs Tim approval before Workspace can run it.', {
        type: 'error',
      })
      return
    }
    const defaultNote =
      mode === 'explain_more'
        ? 'Explain what this is before I approve.'
        : 'Draft only. No external side effects.'
    const promptLabel =
      mode === 'explain_more'
        ? 'Optional question for Executive to answer in Telegram:'
        : 'Optional execution note for Executive:'
    const note = window.prompt(promptLabel, defaultNote)
    if (note === null) return
    executionMutation.mutate({ id: primaryItem.id, mode, note })
  }
  const holdPrimaryItem = () => {
    if (!primaryItem || mutationPending) return
    const note = window.prompt(
      'Why should this be held?',
      primaryItem.blockedReason || 'Held by Tim from Command Center.',
    )
    if (!note?.trim()) return
    holdMutation.mutate({ id: primaryItem.id, note })
  }

  return (
    <div className="min-h-full bg-surface text-ink">
      <div
        className="md:hidden fixed top-0 left-0 right-0 z-50 flex h-12 items-center justify-between px-2"
        style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
      >
        <button
          type="button"
          aria-label="Open navigation menu"
          onClick={openHamburgerMenu}
          className="flex h-11 w-11 items-center justify-center rounded-xl transition active:bg-white/10"
        >
          <svg
            width="20"
            height="16"
            viewBox="0 0 20 16"
            fill="none"
            className="opacity-70"
            style={{ color: 'var(--color-ink, #111)' }}
          >
            <path
              d="M1 1.5H19M1 8H19M1 14.5H13"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </button>
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--theme-muted)]">
          Command Center
        </span>
        <div className="h-11 w-11" />
      </div>

      <div className="mx-auto flex w-full max-w-[1500px] flex-col gap-5 px-4 pb-28 pt-16 md:px-8 md:py-6 lg:px-10">
        <header className="overflow-hidden rounded-3xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-5 md:p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-4xl">
              <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--theme-accent)]">
                Executive Command Center
              </div>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink md:text-5xl">
                What does Tim need to know, decide, or unblock right now?
              </h1>
              <p className="mt-4 text-base leading-relaxed text-[var(--theme-muted)] md:text-lg">
                {topLine}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <ActionButton
                primary
                onClick={() => navigate({ to: '/executive-queue' })}
              >
                Review Queue
              </ActionButton>
              <ActionButton onClick={() => navigate({ to: '/jobs' })}>
                Check Jobs
              </ActionButton>
              <ActionButton
                onClick={() =>
                  navigate({
                    to: '/chat/$sessionKey',
                    params: { sessionKey: 'new' },
                  })
                }
              >
                Start Chat
              </ActionButton>
            </div>
          </div>
        </header>

        <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          <div className="rounded-2xl border border-red-400/30 bg-red-400/10 p-4">
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-red-200">
              Critical exceptions
            </div>
            <div className="mt-2 text-3xl font-semibold text-ink">
              {criticalExceptionCount}
            </div>
            <p className="mt-1 text-xs text-[var(--theme-muted)]">
              Broken access or system failure
            </p>
          </div>
          <div className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-4">
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--theme-muted)]">
              Needs decision
            </div>
            <div className="mt-2 text-3xl font-semibold text-ink">
              {needsDecisionCount}
            </div>
            <p className="mt-1 text-xs text-[var(--theme-muted)]">
              Approval-gated items
            </p>
          </div>
          <div className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-4">
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--theme-muted)]">
              Blocked
            </div>
            <div className="mt-2 text-3xl font-semibold text-ink">
              {needsUnblockCount}
            </div>
            <p className="mt-1 text-xs text-[var(--theme-muted)]">
              Waiting on a constraint
            </p>
          </div>
          <div className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-4">
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--theme-muted)]">
              Blitz-ready
            </div>
            <div className="mt-2 text-3xl font-semibold text-ink">
              {blitzItems.length}
            </div>
            <p className="mt-1 text-xs text-[var(--theme-muted)]">
              Ready to pick up now
            </p>
          </div>
          <div className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-4">
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--theme-muted)]">
              System
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              <Badge tone={gatewayOnline ? 'good' : 'danger'}>
                Gateway {gatewayOnline ? 'online' : 'offline'}
              </Badge>
              <Badge tone={dashboardOnline ? 'good' : 'warn'}>
                Dashboard {dashboardOnline ? 'online' : 'limited'}
              </Badge>
              <Badge tone={failedJobs.length ? 'danger' : 'good'}>
                {failedJobs.length} failed jobs
              </Badge>
            </div>
          </div>
        </section>

        <section className="grid gap-4 rounded-3xl border border-[var(--theme-accent-border)] bg-[var(--theme-accent)]/10 p-4 md:grid-cols-[1fr_auto] md:items-center md:p-5">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge
                tone={
                  primaryMode === 'Repair'
                    ? 'danger'
                    : primaryMode === 'Decide'
                      ? 'warn'
                      : primaryMode === 'Unblock'
                        ? 'danger'
                        : primaryMode === 'Blitz'
                          ? 'accent'
                          : 'neutral'
                }
              >
                Start here: {primaryMode}
              </Badge>
              {primaryItem ? (
                <Badge tone={priorityTone(primaryItem.priority)}>
                  {primaryItem.priority}
                </Badge>
              ) : null}
              {primaryItem ? <Badge>{primaryItem.domain}</Badge> : null}
            </div>
            <h2 className="mt-3 text-xl font-semibold text-ink md:text-2xl">
              {primaryItem
                ? primaryItem.title
                : 'Load or create Executive Queue work'}
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[var(--theme-muted)]">
              {primaryItem
                ? primaryItem.nextAction || primaryItem.outcome
                : 'The Command Center is healthy, but it has no active work loaded. Check the queue source before assuming there is nothing to move.'}
            </p>
          </div>
          <div className="flex flex-wrap gap-2 md:justify-end">
            {primaryItem ? (
              <>
                {canRunPrimarySafeDraft ? (
                  <ActionButton
                    primary
                    disabled={mutationPending}
                    onClick={() => runPrimaryItem('draft_only')}
                  >
                    {mutationPending ? 'Working…' : 'Run Safe Draft'}
                  </ActionButton>
                ) : null}
                <ActionButton
                  disabled={mutationPending}
                  onClick={() => runPrimaryItem('explain_more')}
                >
                  Explain More
                </ActionButton>
                <ActionButton
                  disabled={mutationPending || !canRunPrimarySafeDraft}
                  onClick={() => runPrimaryItem('draft_only')}
                >
                  Draft Only
                </ActionButton>
                <ActionButton
                  disabled={mutationPending}
                  onClick={holdPrimaryItem}
                >
                  Hold
                </ActionButton>
              </>
            ) : null}
            <ActionButton
              disabled={mutationPending}
              onClick={() => navigate({ to: '/executive-queue' })}
            >
              {primaryCta}
            </ActionButton>
            <ActionButton
              disabled={mutationPending}
              onClick={() =>
                navigate({
                  to: '/chat/$sessionKey',
                  params: { sessionKey: 'new' },
                })
              }
            >
              Ask Executive
            </ActionButton>
          </div>
        </section>

        <Panel
          eyebrow="Critical"
          title="Critical exceptions"
          action={
            <Badge tone={criticalExceptionCount ? 'danger' : 'good'}>
              {criticalExceptionCount}
            </Badge>
          }
        >
          <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
            {criticalExceptionCount === 0 ? (
              <EmptyState text="No broken access or system-failure exceptions are elevated right now." />
            ) : null}
            {criticalExceptionItems.slice(0, 6).map((item) => (
              <QueueRow
                key={item.id}
                item={item}
                dense
                onClick={() => navigate({ to: '/executive-queue' })}
              />
            ))}
            {systemExceptions.map((exception) => (
              <button
                key={exception.id}
                type="button"
                onClick={() => navigate({ to: exception.target })}
                className="w-full rounded-xl border border-red-400/25 bg-red-400/10 p-3 text-left transition hover:border-red-300/60"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-sm font-semibold leading-snug text-red-100">
                      {exception.title}
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-red-100/75">
                      {exception.detail}
                    </p>
                  </div>
                  <Badge tone="danger">Repair</Badge>
                </div>
              </button>
            ))}
          </div>
        </Panel>

        <Panel
          eyebrow="Blitz"
          title="Loaded queue: next work waiting for Tim"
          action={
            <Badge tone={blitzItems.length ? 'accent' : 'warn'}>
              {blitzItems.length} ready
            </Badge>
          }
        >
          <div className="mb-3 flex flex-wrap gap-1.5">
            {laneCounts.map(([domain, count]) => (
              <Badge key={domain} tone="neutral">
                {domain}: {count}
              </Badge>
            ))}
          </div>
          <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
            {queueQuery.isLoading ? (
              <EmptyState text="Loading the loaded queue…" />
            ) : null}
            {queueQuery.isError ? (
              <EmptyState
                text={
                  queueQuery.error instanceof Error
                    ? queueQuery.error.message
                    : 'Executive Queue failed to load.'
                }
              />
            ) : null}
            {!queueQuery.isLoading &&
            !queueQuery.isError &&
            blitzItems.length === 0 ? (
              <EmptyState text="No blitz-ready work is loaded. Check the queue source." />
            ) : null}
            {blitzItems.slice(0, 12).map((item) => (
              <QueueRow
                key={item.id}
                item={item}
                dense
                onClick={() => navigate({ to: '/executive-queue' })}
              />
            ))}
          </div>
        </Panel>

        <div className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="flex flex-col gap-5">
            <Panel
              eyebrow="Decide"
              title="Items waiting on Tim"
              action={
                <Badge tone={needsDecisionCount ? 'warn' : 'good'}>
                  {needsDecisionCount}
                </Badge>
              }
            >
              <div className="grid gap-3">
                {queueQuery.isLoading ? (
                  <EmptyState text="Loading Executive Queue…" />
                ) : null}
                {queueQuery.isError ? (
                  <EmptyState
                    text={
                      queueQuery.error instanceof Error
                        ? queueQuery.error.message
                        : 'Executive Queue failed to load.'
                    }
                  />
                ) : null}
                {!queueQuery.isLoading &&
                !queueQuery.isError &&
                approvalItems.length === 0 ? (
                  <EmptyState text="No approval-gated item is waiting. Keep moving." />
                ) : null}
                {approvalItems.slice(0, 4).map((item) => (
                  <QueueRow
                    key={item.id}
                    item={item}
                    onClick={() => navigate({ to: '/executive-queue' })}
                  />
                ))}
              </div>
            </Panel>

            <Panel
              eyebrow="Unblock"
              title="Blocked work"
              action={
                <Badge tone={needsUnblockCount ? 'danger' : 'good'}>
                  {needsUnblockCount}
                </Badge>
              }
            >
              <div className="grid gap-3">
                {blockedItems.length === 0 ? (
                  <EmptyState text="Nothing is blocked in the Executive Queue." />
                ) : null}
                {blockedItems.slice(0, 3).map((item) => (
                  <QueueRow
                    key={item.id}
                    item={item}
                    onClick={() => navigate({ to: '/executive-queue' })}
                  />
                ))}
              </div>
            </Panel>
          </div>

          <div className="flex flex-col gap-5">
            <Panel eyebrow="Know" title="Operating picture">
              <div className="grid gap-3">
                <div className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-card2)] p-3">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-medium text-ink">
                      Source coverage
                    </span>
                    <Badge
                      tone={sourceCoverageProblems.length ? 'warn' : 'good'}
                    >
                      {sourceCoverageProblems.length
                        ? `${sourceCoverageProblems.length} watch`
                        : 'Covered'}
                    </Badge>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-[var(--theme-muted)]">
                    Reader:{' '}
                    {readerCoverage?.items_last_30_days_scanned ?? 'unknown'}{' '}
                    items, {readerActionSummary?.readyForAiLearningCount ?? 0}{' '}
                    ready. Transcripts:{' '}
                    {transcriptCoverage?.acceptable_full_transcripts ?? 0}/
                    {transcriptCoverage?.items_checked ?? 0} full. Granola:{' '}
                    {granolaCoverage?.eligible_notes_parsed ??
                      granolaCoverage?.recent_notes_36h_first_page ??
                      'unknown'}{' '}
                    parsed, {granolaActionSummary?.followUpCandidateCount ?? 0}{' '}
                    follow-ups. Motion:{' '}
                    {motionCoverage?.task_count ?? 'unknown'} tasks,{' '}
                    {motionCoverage?.tim_owned_count ?? 0} Tim-owned,{' '}
                    {motionActionSummary?.safeWriteCount ?? 0} safe writes
                    ready.
                  </p>
                  {sourceCoverageGeneratedAt ? (
                    <p className="mt-1 text-[11px] text-[var(--theme-muted)]">
                      Snapshot: {formatTimestamp(sourceCoverageGeneratedAt)}
                    </p>
                  ) : null}
                  {sourceCoverageProblems.length ? (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {sourceCoverageProblems.map((problem) => (
                        <Badge key={String(problem)} tone="warn">
                          {problem}
                        </Badge>
                      ))}
                    </div>
                  ) : null}
                </div>

                <div className="rounded-xl border border-[var(--theme-accent-border)] bg-[var(--theme-accent)]/10 p-3">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-medium text-ink">
                      Unified AI Ops Intake Queue
                    </span>
                    <Badge
                      tone={
                        aiOpsIntakeSummary?.needsTimDecisionCount
                          ? 'warn'
                          : aiOpsIntakeSummary?.recoveryRequiredCount
                            ? 'danger'
                            : aiOpsIntakeSummary?.safeAgentWorkCount
                              ? 'accent'
                              : 'good'
                      }
                    >
                      {aiOpsIntakeSummary?.totalItemCount ?? 0} items
                    </Badge>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-[var(--theme-muted)]">
                    Tim decisions:{' '}
                    {aiOpsIntakeSummary?.needsTimDecisionCount ?? 0}. Safe agent
                    work: {aiOpsIntakeSummary?.safeAgentWorkCount ?? 0}.
                    Recoveries: {aiOpsIntakeSummary?.recoveryRequiredCount ?? 0}
                    . Owner checks: {aiOpsIntakeSummary?.reviewOwnerCount ?? 0}.
                    Learning intake:{' '}
                    {aiOpsIntakeSummary?.learnFromThisCount ?? 0}.
                  </p>
                  {aiOpsIntakeItems.length ? (
                    <div className="mt-3 grid gap-2">
                      {aiOpsIntakeItems.slice(0, 5).map((queueItem) => (
                        <div
                          key={queueItem.id ?? queueItem.title}
                          className="rounded-lg border border-[var(--theme-border)] bg-[var(--theme-card)] px-3 py-2"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <div className="line-clamp-1 text-xs font-semibold text-ink">
                                {queueItem.title ?? 'AI Ops intake item'}
                              </div>
                              <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-[var(--theme-muted)]">
                                {queueItem.nextAction ?? queueItem.detail}
                              </p>
                            </div>
                            <div className="flex shrink-0 flex-col items-end gap-1">
                              <Badge
                                tone={priorityTone(queueItem.priority ?? 'P3')}
                              >
                                {queueItem.priority ?? 'P3'}
                              </Badge>
                              <Badge tone="neutral">
                                {queueItem.source ?? 'Source'}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <EmptyState text="No unified intake items are loaded. Re-run the AI Ops intake queue script after source scans." />
                  )}
                  <p className="mt-2 text-[11px] text-[var(--theme-muted)]">
                    Read-only. Sending, spending, calendar commitments, people
                    decisions, Motion writes, and subscriptions stay
                    approval-gated.
                  </p>
                </div>

                <div className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-card2)] p-3">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-medium text-ink">
                      Reader action layer
                    </span>
                    <Badge
                      tone={
                        readerTranscriptFailures.length
                          ? 'warn'
                          : readerReadyActions.length
                            ? 'accent'
                            : 'good'
                      }
                    >
                      {readerReadyActions.length
                        ? `${readerReadyActions.length} ready`
                        : 'Clear'}
                    </Badge>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-[var(--theme-muted)]">
                    Scanned:{' '}
                    {readerCoverage?.items_last_30_days_scanned ?? 'unknown'}.
                    AI-relevant:{' '}
                    {readerCoverage?.estimated_ai_relevant_items ?? 0}. Fresh:{' '}
                    {readerActionSummary?.freshReadyCount ?? 0}. X watchlist:{' '}
                    {readerActionSummary?.xWatchlistCandidateCount ?? 0}.
                    Transcript failures:{' '}
                    {readerActionSummary?.transcriptFailureCount ?? 0}.
                  </p>
                  {readerReadyActions.length ? (
                    <div className="mt-3 grid gap-2">
                      {readerReadyActions.slice(0, 3).map((action) => (
                        <div
                          key={action.source_url ?? action.title}
                          className="rounded-lg border border-[var(--theme-accent-border)] bg-[var(--theme-accent)]/10 px-3 py-2"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <div className="line-clamp-1 text-xs font-semibold text-ink">
                                {action.title ?? 'Untitled Reader item'}
                              </div>
                              <p className="mt-1 text-[11px] leading-relaxed text-[var(--theme-muted)]">
                                {action.reason ??
                                  'Ready for AI Learning filter.'}
                              </p>
                            </div>
                            <Badge tone="accent">
                              {action.contentType ?? 'Reader'}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : null}
                  {readerTranscriptFailures.length ? (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {readerTranscriptFailures.slice(0, 4).map((failure) => (
                        <Badge
                          key={failure.source_url ?? failure.title}
                          tone="warn"
                        >
                          Transcript: {failure.title ?? 'Reader item'}
                        </Badge>
                      ))}
                    </div>
                  ) : null}
                  {readerXWatchlistCandidates.length ? (
                    <p className="mt-2 text-[11px] text-[var(--theme-muted)]">
                      {readerXWatchlistCandidates.length} X accounts have enough
                      repeated saves to consider for monitoring. Verify claims
                      before acting.
                    </p>
                  ) : null}
                  {readerFreshActions.length ? (
                    <p className="mt-1 text-[11px] text-[var(--theme-muted)]">
                      {readerFreshActions.length} fresh items are ready from the
                      last 7 days.
                    </p>
                  ) : null}
                </div>

                <div className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-card2)] p-3">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-medium text-ink">
                      Granola action layer
                    </span>
                    <Badge
                      tone={
                        granolaNeedsDecision.length
                          ? 'warn'
                          : granolaFollowUps.length
                            ? 'accent'
                            : 'good'
                      }
                    >
                      {granolaNeedsDecision.length
                        ? `${granolaNeedsDecision.length} decision`
                        : granolaFollowUps.length
                          ? `${granolaFollowUps.length} follow-up`
                          : 'Clear'}
                    </Badge>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-[var(--theme-muted)]">
                    Scanned: {granolaCoverage?.recent_notes_scanned ?? 0}.
                    Parsed: {granolaCoverage?.eligible_notes_parsed ?? 0}.
                    Skipped sensitive:{' '}
                    {granolaCoverage?.skipped_confidential_or_sensitive ?? 0}.
                    Candidates:{' '}
                    {granolaActionSummary?.actionCandidateCount ?? 0}. Ownership
                    checks:{' '}
                    {granolaActionSummary?.ownershipClarificationCount ?? 0}.
                  </p>
                  {granolaNeedsDecision.length ? (
                    <div className="mt-3 grid gap-2">
                      {granolaNeedsDecision.slice(0, 3).map((action) => (
                        <div
                          key={`${action.noteId}-${action.text}`}
                          className="rounded-lg border border-amber-400/30 bg-amber-400/10 px-3 py-2"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <div className="line-clamp-1 text-xs font-semibold text-ink">
                                {action.text ?? 'Granola decision candidate'}
                              </div>
                              <p className="mt-1 text-[11px] leading-relaxed text-[var(--theme-muted)]">
                                {action.noteTitle ?? 'Meeting note'}
                              </p>
                            </div>
                            <Badge tone="warn">Review</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : null}
                  {granolaFollowUps.length ? (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {granolaFollowUps.slice(0, 4).map((action) => (
                        <Badge
                          key={`${action.noteId}-${action.text}`}
                          tone="accent"
                        >
                          Follow-up: {action.noteTitle ?? 'Meeting'}
                        </Badge>
                      ))}
                    </div>
                  ) : null}
                  {granolaAssignedActions.length ? (
                    <p className="mt-2 text-[11px] text-[var(--theme-muted)]">
                      {granolaAssignedActions.length} assigned-action candidates
                      are visible for review before writing tasks.
                    </p>
                  ) : null}
                  {granolaOwnershipClarifications.length ? (
                    <p className="mt-1 text-[11px] text-[var(--theme-muted)]">
                      {granolaOwnershipClarifications.length} items need owner
                      or wording clarification before side effects.
                    </p>
                  ) : null}
                </div>

                <div className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-card2)] p-3">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-medium text-ink">
                      Motion action layer
                    </span>
                    <Badge
                      tone={
                        motionSafeWriteActions.length
                          ? 'accent'
                          : motionApprovalRequiredActions.length
                            ? 'warn'
                            : 'good'
                      }
                    >
                      {motionSafeWriteActions.length
                        ? `${motionSafeWriteActions.length} safe write`
                        : motionApprovalRequiredActions.length
                          ? `${motionApprovalRequiredActions.length} review`
                          : 'Clear'}
                    </Badge>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-[var(--theme-muted)]">
                    Tim-owned: {motionCoverage?.tim_owned_count ?? 0}. Safe
                    writes: {motionActionSummary?.safeWriteCount ?? 0}. Approval
                    required: {motionActionSummary?.approvalRequiredCount ?? 0}.
                    Suppressed teammate/ambiguous:{' '}
                    {motionActionSummary?.suppressedCount ?? 0}.
                  </p>
                  {motionSafeWriteActions.length ? (
                    <div className="mt-3 grid gap-2">
                      {motionSafeWriteActions.slice(0, 3).map((action) => (
                        <div
                          key={action.taskId ?? action.name}
                          className="rounded-lg border border-[var(--theme-accent-border)] bg-[var(--theme-accent)]/10 px-3 py-2"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <div className="line-clamp-1 text-xs font-semibold text-ink">
                                {action.name ?? 'Unnamed Motion task'}
                              </div>
                              <p className="mt-1 text-[11px] leading-relaxed text-[var(--theme-muted)]">
                                {action.reason ?? 'Safe Motion write is ready.'}
                              </p>
                            </div>
                            <Badge tone="accent">Ready</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : null}
                  {motionApprovalRequiredActions.length ? (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {motionApprovalRequiredActions
                        .slice(0, 4)
                        .map((action) => (
                          <Badge key={action.taskId ?? action.name} tone="warn">
                            Review: {action.name ?? 'Motion task'}
                          </Badge>
                        ))}
                    </div>
                  ) : null}
                  {motionSuppressedItems.length ? (
                    <p className="mt-2 text-[11px] text-[var(--theme-muted)]">
                      {motionSuppressedItems.length} teammate-owned items are
                      visible but suppressed from Tim-owned alerts.
                    </p>
                  ) : null}
                </div>

                <div className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-card2)] p-3">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-medium text-ink">
                      Hermes backend
                    </span>
                    <Badge
                      tone={gatewayOnline && dashboardOnline ? 'good' : 'warn'}
                    >
                      {gatewayOnline && dashboardOnline ? 'Ready' : 'Check'}
                    </Badge>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-[var(--theme-muted)]">
                    Gateway: {gatewayOnline ? 'online' : 'offline'}. Dashboard
                    API: {dashboardOnline ? 'online' : 'limited'}. Mode:{' '}
                    {gatewayQuery.data?.mode ?? 'unknown'}.
                  </p>
                </div>

                <div className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-card2)] p-3">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-medium text-ink">
                      Scheduled work
                    </span>
                    <Badge tone={failedJobs.length ? 'danger' : 'good'}>
                      {failedJobs.length
                        ? `${failedJobs.length} failed`
                        : 'Healthy'}
                    </Badge>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-[var(--theme-muted)]">
                    {enabledJobs.length || jobs.length} jobs visible.{' '}
                    {jobsQuery.isError
                      ? jobsQuery.error instanceof Error
                        ? jobsQuery.error.message
                        : 'Jobs failed to load.'
                      : 'Failure count is based on latest reported status.'}
                  </p>
                  {failedJobs.length ? (
                    <div className="mt-3 grid gap-2">
                      {failedJobs.slice(0, 3).map((job, index) => (
                        <button
                          key={job.id ?? index}
                          type="button"
                          onClick={() => navigate({ to: '/jobs' })}
                          className="rounded-lg border border-red-400/20 bg-red-400/10 px-3 py-2 text-left text-xs text-red-100"
                        >
                          {job.name ?? job.title ?? job.id ?? 'Unnamed job'}
                        </button>
                      ))}
                    </div>
                  ) : null}
                </div>

                <div className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-card2)] p-3">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-medium text-ink">
                      In progress
                    </span>
                    <Badge tone={inProgressItems.length ? 'accent' : 'neutral'}>
                      {inProgressItems.length}
                    </Badge>
                  </div>
                  <div className="mt-2 grid gap-2">
                    {inProgressItems.slice(0, 3).map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => navigate({ to: '/executive-queue' })}
                        className="text-left text-xs leading-relaxed text-[var(--theme-muted)] hover:text-ink"
                      >
                        {item.title}
                      </button>
                    ))}
                    {!inProgressItems.length ? (
                      <p className="text-xs text-[var(--theme-muted)]">
                        No queue item is marked In Progress.
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>
            </Panel>

            <Panel eyebrow="Resume" title="Recent threads">
              <div className="grid gap-2">
                {sessionsQuery.isLoading ? (
                  <EmptyState text="Loading recent sessions…" />
                ) : null}
                {!sessionsQuery.isLoading && recentSessions.length === 0 ? (
                  <EmptyState text="No recent sessions found." />
                ) : null}
                {recentSessions.map((session) => {
                  const key = session.key ?? session.id ?? 'main'
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() =>
                        navigate({
                          to: '/chat/$sessionKey',
                          params: { sessionKey: key },
                        })
                      }
                      className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-card2)] p-3 text-left transition hover:border-[var(--theme-accent-border)]"
                    >
                      <div className="line-clamp-1 text-sm font-medium text-ink">
                        {session.title ??
                          session.label ??
                          session.derivedTitle ??
                          key}
                      </div>
                      <div className="mt-1 text-xs text-[var(--theme-muted)]">
                        {formatTimestamp(getSessionTime(session))}
                      </div>
                    </button>
                  )
                })}
              </div>
            </Panel>
          </div>
        </div>
      </div>
    </div>
  )
}
