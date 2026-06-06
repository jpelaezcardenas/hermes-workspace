'use client'

import { createFileRoute } from '@tanstack/react-router'
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type {
  ExecutiveQueueItem,
  QueueApprovalDecision,
  QueueBoardColumn,
  QueueExecutionMode,
  QueueStatus,
} from './api/-executive-queue-utils'
import type { ExecutiveQueueNotionSyncProposal } from './api/-executive-queue-notion-sync-utils'
import { usePageTitle } from '@/hooks/use-page-title'
import { cn } from '@/lib/utils'
import { toast } from '@/components/ui/toast'

type ExecutiveQueueResponse = {
  ok: boolean
  items: Array<ExecutiveQueueItem>
  grouped: Record<QueueBoardColumn, Array<ExecutiveQueueItem>>
  total: number
  error?: string
}

const BOARD_COLUMNS: Array<QueueBoardColumn> = [
  'Triage',
  'Proposed',
  'Queued',
  'In Progress',
  'Blocked',
  'Done',
]

const COLUMN_HELP: Record<QueueBoardColumn, string> = {
  Triage: 'Needs judgment',
  Proposed: 'Needs approval',
  Queued: 'Ready for owner',
  'In Progress': 'Being worked',
  Blocked: 'Waiting',
  Done: 'Result captured',
}

const RISK_STYLES = {
  Low: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300',
  Medium: 'border-amber-400/30 bg-amber-400/10 text-amber-300',
  High: 'border-red-400/30 bg-red-400/10 text-red-300',
}

type QueueUpdateInput =
  | {
      id: string
      action: 'transition'
      status: QueueStatus
      resultSummary?: string
      blockedReason?: string
    }
  | {
      id: string
      action: 'approval'
      decision: QueueApprovalDecision
      note?: string
    }

type QueueUpdateResponse = {
  ok: boolean
  item?: ExecutiveQueueItem
  error?: string
}

type QueueExecutionInput = {
  id: string
  mode: QueueExecutionMode
  note?: string
}

type QueueExecutionResponse = {
  ok: boolean
  item?: ExecutiveQueueItem
  execution?: { id: string; localPath: string }
  runId?: string | null
  sessionKey?: string
  delivery?: { delivered?: boolean }
  error?: string
}

type NotionApplyResult = {
  mode: 'apply_approved'
  created: Array<unknown>
  updated: Array<unknown>
  skipped: Array<unknown>
  deleted: Array<never>
  persistedPath: string
}

type NotionSyncResponse = {
  ok: boolean
  proposal?: ExecutiveQueueNotionSyncProposal
  result?: NotionApplyResult
  error?: string
}

async function fetchExecutiveQueue(): Promise<ExecutiveQueueResponse> {
  const response = await fetch('/api/executive-queue')
  const data = (await response.json()) as ExecutiveQueueResponse
  if (!response.ok || data.ok === false) {
    throw new Error(data.error ?? `HTTP ${response.status}`)
  }
  return data
}

async function updateExecutiveQueue(
  input: QueueUpdateInput,
): Promise<ExecutiveQueueItem> {
  const response = await fetch('/api/executive-queue', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...input, actor: 'Tim' }),
  })
  const data = (await response.json()) as QueueUpdateResponse
  if (!response.ok || data.ok === false || !data.item) {
    throw new Error(data.error ?? `HTTP ${response.status}`)
  }
  return data.item
}

async function executeExecutiveQueueItem(
  input: QueueExecutionInput,
): Promise<QueueExecutionResponse> {
  const response = await fetch('/api/executive-queue-execution', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...input, actor: 'Tim' }),
  })
  const data = (await response.json()) as QueueExecutionResponse
  if (!response.ok || data.ok === false) {
    throw new Error(data.error ?? `HTTP ${response.status}`)
  }
  return data
}

async function createNotionSyncProposalFromQueue(): Promise<ExecutiveQueueNotionSyncProposal> {
  const response = await fetch('/api/executive-queue-notion-sync', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ actor: 'Tim', mode: 'proposal_only' }),
  })
  const data = (await response.json()) as NotionSyncResponse
  if (!response.ok || data.ok === false || !data.proposal) {
    throw new Error(data.error ?? `HTTP ${response.status}`)
  }
  return data.proposal
}

async function applyApprovedNotionSyncProposal(
  proposal: ExecutiveQueueNotionSyncProposal,
): Promise<NotionApplyResult> {
  const approvalText =
    window.prompt('Type exactly: APPROVE NOTION SYNC')?.trim() ?? ''
  const response = await fetch('/api/executive-queue-notion-sync', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      actor: 'Tim',
      mode: 'apply_approved',
      approval: {
        proposalId: proposal.id,
        proposalPath: proposal.persistedPath,
        approvedBy: 'Tim',
        approvalText,
        expectedCreates: proposal.wouldCreate.length,
        expectedUpdates: proposal.wouldUpdate.length,
      },
    }),
  })
  const data = (await response.json()) as NotionSyncResponse
  if (!response.ok || data.ok === false || !data.result) {
    throw new Error(data.error ?? `HTTP ${response.status}`)
  }
  return data.result
}

function StatCard({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-2xl border border-primary-200 bg-primary-50/70 px-4 py-3">
      <div className="text-xs uppercase tracking-[0.18em] text-[var(--theme-muted)]">
        {label}
      </div>
      <div className="mt-1 text-2xl font-semibold text-ink">{value}</div>
    </div>
  )
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

function QueueCard({
  item,
  selected,
  onSelect,
}: {
  item: ExecutiveQueueItem
  selected: boolean
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        'w-full rounded-2xl border bg-[var(--theme-card)] p-3 text-left transition hover:border-[var(--theme-accent)] hover:bg-[var(--theme-hover)]',
        selected
          ? 'border-[var(--theme-accent)]'
          : 'border-[var(--theme-border)]',
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-sm font-semibold leading-snug text-ink">
          {item.title}
        </h3>
        <Pill className="shrink-0 border-[var(--theme-border)] text-[var(--theme-muted)]">
          {item.priority}
        </Pill>
      </div>
      <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-[var(--theme-muted)]">
        {item.outcome}
      </p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        <Pill className="border-[var(--theme-border)] text-[var(--theme-muted)]">
          {item.owner}
        </Pill>
        <Pill className={RISK_STYLES[item.riskLevel]}>{item.riskLevel}</Pill>
      </div>
      <div className="mt-3 text-xs text-[var(--theme-muted)]">
        Next:{' '}
        <span className="text-ink">{item.nextAction || 'Needs triage'}</span>
      </div>
    </button>
  )
}

function ActionButton({
  children,
  onClick,
  disabled,
}: {
  children: ReactNode
  onClick: () => void
  disabled?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="rounded-xl border border-[var(--theme-border)] px-3 py-2 text-xs font-medium text-[var(--theme-muted)] transition hover:border-[var(--theme-accent)] hover:text-ink disabled:cursor-not-allowed disabled:opacity-50"
    >
      {children}
    </button>
  )
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-3">
      <div className="text-[11px] uppercase tracking-[0.16em] text-[var(--theme-muted)]">
        {label}
      </div>
      <div className="mt-1 text-sm text-ink">{value || 'None'}</div>
    </div>
  )
}

function QueueDetail({
  item,
  onApproval,
  onExecute,
  onTransition,
  updating,
}: {
  item: ExecutiveQueueItem | null
  onApproval: (
    item: ExecutiveQueueItem,
    decision: QueueApprovalDecision,
    note?: string,
  ) => void
  onExecute: (
    item: ExecutiveQueueItem,
    mode: QueueExecutionMode,
    note?: string,
  ) => void
  onTransition: (item: ExecutiveQueueItem, status: QueueStatus) => void
  updating: boolean
}) {
  if (!item) {
    return (
      <aside className="rounded-2xl border border-primary-200 bg-primary-50/70 p-5 text-sm text-[var(--theme-muted)]">
        Select an item to inspect owner, risk, approval gate, source, and next
        action.
      </aside>
    )
  }

  return (
    <aside className="rounded-2xl border border-primary-200 bg-primary-50/80 p-5">
      <div className="flex flex-wrap items-center gap-2">
        <Pill className="border-[var(--theme-border)] text-[var(--theme-muted)]">
          {item.status}
        </Pill>
        <Pill className="border-[var(--theme-border)] text-[var(--theme-muted)]">
          {item.domain}
        </Pill>
        <Pill className={RISK_STYLES[item.riskLevel]}>
          {item.riskLevel} risk
        </Pill>
      </div>
      <h2 className="mt-4 text-xl font-semibold text-ink">{item.title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-[var(--theme-muted)]">
        {item.outcome}
      </p>

      <div className="mt-5 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-3">
        <div className="text-[11px] uppercase tracking-[0.16em] text-[var(--theme-muted)]">
          Execution controls
        </div>
        <p className="mt-1 text-xs leading-relaxed text-[var(--theme-muted)]">
          Approve only changes queue state. Approve and run dispatches this one
          item to Executive.
        </p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <ActionButton
            disabled={updating}
            onClick={() =>
              onApproval(
                item,
                'approve_action',
                'Approved only. Do not run automatically.',
              )
            }
          >
            Approve only
          </ActionButton>
          <ActionButton
            disabled={updating}
            onClick={() =>
              onExecute(
                item,
                'approve_and_run',
                'Approved and run this queue item now.',
              )
            }
          >
            Approve and run
          </ActionButton>
          <ActionButton
            disabled={updating}
            onClick={() =>
              onExecute(
                item,
                'draft_only',
                'Approved local draft-only prep. No external side effects.',
              )
            }
          >
            Draft only
          </ActionButton>
          <ActionButton
            disabled={updating}
            onClick={() =>
              onExecute(
                item,
                'explain_more',
                'Explain this queue item before approval.',
              )
            }
          >
            Explain more
          </ActionButton>
          <ActionButton
            disabled={updating}
            onClick={() => {
              const reason = window
                .prompt('Why are we holding this item?')
                ?.trim()
              if (!reason) return
              onApproval(item, 'hold', reason)
            }}
          >
            Hold
          </ActionButton>
          <ActionButton
            disabled={updating}
            onClick={() =>
              onApproval(item, 'manual_only', 'Manual only mode set by Tim.')
            }
          >
            Manual only
          </ActionButton>
        </div>
        <details className="mt-3">
          <summary className="cursor-pointer text-xs font-medium text-[var(--theme-muted)]">
            Advanced approval
          </summary>
          <div className="mt-2">
            <ActionButton
              disabled={updating}
              onClick={() =>
                onApproval(
                  item,
                  'broader_approval',
                  'Broader approval granted by Tim.',
                )
              }
            >
              Broader approval
            </ActionButton>
          </div>
        </details>
      </div>

      <div className="mt-3 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-3">
        <div className="text-[11px] uppercase tracking-[0.16em] text-[var(--theme-muted)]">
          Status transitions
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {BOARD_COLUMNS.map((status) => (
            <ActionButton
              key={status}
              disabled={updating || item.status === status}
              onClick={() => onTransition(item, status)}
            >
              {status}
            </ActionButton>
          ))}
          <ActionButton
            disabled={updating || item.status === 'Archived'}
            onClick={() => onTransition(item, 'Archived')}
          >
            Archive
          </ActionButton>
        </div>
      </div>

      <div className="mt-5 grid gap-3">
        <DetailRow label="Owner" value={item.owner} />
        <DetailRow label="Approval" value={item.approvalLevel} />
        <DetailRow label="Next action" value={item.nextAction} />
        <DetailRow label="Blocked reason" value={item.blockedReason} />
        <DetailRow label="Result" value={item.resultSummary} />
        <DetailRow
          label="Source"
          value={`${item.source.type}: ${item.source.id}`}
        />
      </div>

      <div className="mt-5 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-3">
        <div className="text-[11px] uppercase tracking-[0.16em] text-[var(--theme-muted)]">
          Source excerpt
        </div>
        <p className="mt-2 text-sm leading-relaxed text-ink">
          {item.source.excerpt || item.context || 'No excerpt captured.'}
        </p>
      </div>
    </aside>
  )
}

function ExecutiveQueueRoute() {
  usePageTitle('Executive Queue')
  const queryClient = useQueryClient()
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [notionProposal, setNotionProposal] =
    useState<ExecutiveQueueNotionSyncProposal | null>(null)
  const [notionApplyResult, setNotionApplyResult] =
    useState<NotionApplyResult | null>(null)

  const queueQuery = useQuery({
    queryKey: ['executive-queue'],
    queryFn: fetchExecutiveQueue,
    refetchInterval: 20_000,
    placeholderData: keepPreviousData,
  })

  const updateMutation = useMutation({
    mutationFn: updateExecutiveQueue,
    onSuccess: (item) => {
      setSelectedId(item.id)
      void queryClient.invalidateQueries({ queryKey: ['executive-queue'] })
      toast('Executive Queue updated')
    },
    onError: (error) => {
      toast(
        error instanceof Error
          ? error.message
          : 'Failed to update Executive Queue',
        { type: 'error' },
      )
    },
  })

  const executionMutation = useMutation({
    mutationFn: executeExecutiveQueueItem,
    onSuccess: (result) => {
      if (result.item?.id) setSelectedId(result.item.id)
      void queryClient.invalidateQueries({ queryKey: ['executive-queue'] })
      if (result.delivery?.delivered) {
        toast('Explanation sent to Telegram')
      } else if (result.execution) {
        const target = result.runId
          ? `run ${result.runId}`
          : (result.sessionKey ?? result.execution.id)
        toast(`Queue item dispatched: ${target}`)
      } else {
        toast('Queue execution requested')
      }
    },
    onError: (error) => {
      toast(
        error instanceof Error
          ? error.message
          : 'Failed to dispatch queue item',
        { type: 'error' },
      )
    },
  })

  const notionSyncMutation = useMutation({
    mutationFn: createNotionSyncProposalFromQueue,
    onSuccess: (proposal) => {
      setNotionProposal(proposal)
      setNotionApplyResult(null)
      toast(
        `Notion proposal created: ${proposal.eligibleCount} eligible item${proposal.eligibleCount === 1 ? '' : 's'}`,
      )
    },
    onError: (error) => {
      toast(
        error instanceof Error
          ? error.message
          : 'Failed to create Notion sync proposal',
        { type: 'error' },
      )
    },
  })

  const notionApplyMutation = useMutation({
    mutationFn: applyApprovedNotionSyncProposal,
    onSuccess: (result) => {
      setNotionApplyResult(result)
      void queryClient.invalidateQueries({ queryKey: ['executive-queue'] })
      toast(
        `Notion sync applied: ${result.created.length} created, ${result.updated.length} updated`,
      )
    },
    onError: (error) => {
      toast(
        error instanceof Error
          ? error.message
          : 'Failed to apply approved Notion sync',
        { type: 'error' },
      )
    },
  })

  const handleApproval = (
    item: ExecutiveQueueItem,
    decision: QueueApprovalDecision,
    note?: string,
  ) => {
    updateMutation.mutate({ id: item.id, action: 'approval', decision, note })
  }

  const handleExecute = (
    item: ExecutiveQueueItem,
    mode: QueueExecutionMode,
    note?: string,
  ) => {
    executionMutation.mutate({ id: item.id, mode, note })
  }

  const handleTransition = (item: ExecutiveQueueItem, status: QueueStatus) => {
    const resultSummary =
      status === 'Done'
        ? window.prompt('Result summary required to mark Done')?.trim()
        : undefined
    if (status === 'Done' && !resultSummary) return
    const blockedReason =
      status === 'Blocked'
        ? window.prompt('Why is this blocked?')?.trim()
        : undefined
    updateMutation.mutate({
      id: item.id,
      action: 'transition',
      status,
      resultSummary,
      blockedReason,
    })
  }

  const items = queueQuery.data?.items ?? []
  const grouped = queueQuery.data?.grouped
  const selectedItem = useMemo(() => {
    if (!items.length) return null
    const activeItems = items.filter(
      (item) => item.status !== 'Done' && item.status !== 'Archived',
    )
    const selectedById = items.find((item) => item.id === selectedId)
    if (selectedById) return selectedById
    if (activeItems.length) return activeItems[0]
    return items[0]
  }, [items, selectedId])

  const activeCount = items.filter(
    (item) => item.status !== 'Done' && item.status !== 'Archived',
  ).length
  const blockedCount = items.filter((item) => item.status === 'Blocked').length
  const approvalCount = items.filter(
    (item) =>
      item.status !== 'Done' &&
      item.status !== 'Archived' &&
      (item.status === 'Proposed' || item.approvalLevel !== 'Auto'),
  ).length

  return (
    <div className="min-h-full overflow-y-auto bg-surface text-ink">
      <div className="mx-auto flex w-full max-w-[1500px] flex-col gap-5 px-4 py-6 pb-[calc(var(--tabbar-h,80px)+1.5rem)] sm:px-6 lg:px-8">
        <header className="rounded-2xl border border-primary-200 bg-primary-50/85 p-5 backdrop-blur-xl">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-ink">
                Executive Queue
              </h1>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[var(--theme-muted)]">
                Control layer for delegated work. Local JSON is the source of
                truth. Notion and Workspace mirror what is safe to operate.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => void queueQuery.refetch()}
                className="rounded-xl border border-[var(--theme-border)] px-3 py-2 text-sm text-[var(--theme-muted)] transition hover:border-[var(--theme-accent)] hover:text-ink"
              >
                Refresh
              </button>
              <button
                type="button"
                disabled={notionSyncMutation.isPending}
                onClick={() => notionSyncMutation.mutate()}
                className="rounded-xl border border-amber-400/40 bg-amber-400/10 px-3 py-2 text-sm font-medium text-amber-200 transition hover:border-amber-300 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {notionSyncMutation.isPending
                  ? 'Preparing…'
                  : 'Prepare Notion sync proposal'}
              </button>
            </div>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard label="Total" value={items.length} />
            <StatCard label="Active" value={activeCount} />
            <StatCard label="Approvals" value={approvalCount} />
            <StatCard label="Blocked" value={blockedCount} />
          </div>
        </header>

        {queueQuery.isError ? (
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
            {queueQuery.error instanceof Error
              ? queueQuery.error.message
              : 'Failed to load Executive Queue'}
          </div>
        ) : null}

        {notionProposal ? (
          <section className="rounded-2xl border border-amber-400/30 bg-amber-400/10 p-4 text-sm text-amber-100">
            <div className="flex flex-col gap-2 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <h2 className="font-semibold text-amber-50">
                  Notion sync proposal
                </h2>
                <p className="mt-1 text-amber-100/80">
                  No Notion pages changed yet. Proposed creates:{' '}
                  {notionProposal.wouldCreate.length}. Proposed updates:{' '}
                  {notionProposal.wouldUpdate.length}. Skipped:{' '}
                  {notionProposal.wouldSkip.length}.
                </p>
                <p className="mt-1 text-xs text-amber-100/70">
                  Saved locally: {notionProposal.persistedPath}
                </p>
                <p className="mt-1 text-xs text-amber-100/70">
                  Live apply requires exact typed phrase plus proposal
                  id/path/count matching on the server.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Pill className="border-amber-300/40 text-amber-100">
                  Approval gated
                </Pill>
                <button
                  type="button"
                  disabled={notionApplyMutation.isPending}
                  onClick={() => notionApplyMutation.mutate(notionProposal)}
                  className="rounded-xl border border-red-400/40 bg-red-400/10 px-3 py-2 text-xs font-semibold text-red-100 transition hover:border-red-300 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {notionApplyMutation.isPending
                    ? 'Applying…'
                    : 'Apply approved sync'}
                </button>
              </div>
            </div>
          </section>
        ) : null}

        {notionApplyResult ? (
          <section className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-4 text-sm text-emerald-100">
            <h2 className="font-semibold text-emerald-50">
              Approved Notion sync applied
            </h2>
            <p className="mt-1 text-emerald-100/80">
              Created: {notionApplyResult.created.length}. Updated:{' '}
              {notionApplyResult.updated.length}. Skipped:{' '}
              {notionApplyResult.skipped.length}. Deleted:{' '}
              {notionApplyResult.deleted.length}.
            </p>
            <p className="mt-1 text-xs text-emerald-100/70">
              Saved result: {notionApplyResult.persistedPath}
            </p>
          </section>
        ) : null}

        <div className="grid gap-5 xl:grid-cols-[1fr_380px]">
          <section className="overflow-x-auto rounded-2xl border border-primary-200 bg-primary-50/40 p-3">
            <div className="grid min-w-[1180px] grid-cols-6 gap-3">
              {BOARD_COLUMNS.map((column) => {
                const columnItems = grouped?.[column] ?? []
                return (
                  <div
                    key={column}
                    className="flex min-h-[480px] flex-col rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-bg)]/60"
                  >
                    <div className="border-b border-[var(--theme-border)] p-3">
                      <div className="flex items-center justify-between gap-2">
                        <h2 className="text-sm font-semibold text-ink">
                          {column}
                        </h2>
                        <Pill className="border-[var(--theme-border)] text-[var(--theme-muted)]">
                          {columnItems.length}
                        </Pill>
                      </div>
                      <p className="mt-1 text-xs text-[var(--theme-muted)]">
                        {COLUMN_HELP[column]}
                      </p>
                    </div>
                    <div className="flex flex-1 flex-col gap-2 p-2">
                      {queueQuery.isLoading ? (
                        <div className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-3 text-xs text-[var(--theme-muted)]">
                          Loading…
                        </div>
                      ) : columnItems.length ? (
                        columnItems.map((item) => (
                          <QueueCard
                            key={item.id}
                            item={item}
                            selected={selectedItem?.id === item.id}
                            onSelect={() => setSelectedId(item.id)}
                          />
                        ))
                      ) : (
                        <div className="rounded-2xl border border-dashed border-[var(--theme-border)] p-3 text-xs text-[var(--theme-muted)]">
                          No items
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          <QueueDetail
            item={selectedItem}
            onApproval={handleApproval}
            onExecute={handleExecute}
            onTransition={handleTransition}
            updating={updateMutation.isPending || executionMutation.isPending}
          />
        </div>
      </div>
    </div>
  )
}

export const Route = createFileRoute('/executive-queue')({
  ssr: false,
  component: ExecutiveQueueRoute,
})
