import { useMemo } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { HugeiconsIcon } from '@hugeicons/react'
import { Add01Icon, Calendar03Icon, RefreshIcon } from '@hugeicons/core-free-icons'
import { toast } from '@/components/ui/toast'
import { cn } from '@/lib/utils'

type StatusItem = {
  id: string
  title: string
  detail: string
  status: 'live' | 'stale' | 'inferred' | 'missing' | 'blocked' | 'ready'
  priority: 'critical' | 'high' | 'medium' | 'low'
  owner?: string
  action?: string
  href?: string
  evidence?: string
}

type CommandStatus = {
  generated_at: string
  health: Record<string, string>
  summary: Record<string, number>
  schedule: Array<StatusItem>
  next_moves: Array<StatusItem>
  needs_wilson: Array<StatusItem>
}

async function createScheduleTask(item: StatusItem) {
  const response = await fetch('/api/hermes-tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: item.title,
      description: [
        item.detail,
        item.action ? `Action: ${item.action}` : '',
        'Apple autonomy policy: this screen stages local tasks only. Real Calendar/Reminder writes are not wired here yet; when enabled, only reversible low-risk local items are allowed without extra approval. Deletions, invites, shared calendars, external attendees, email/messages, and outward-facing actions require Wilson approval.',
      ].filter(Boolean).join('\n\n'),
      column: 'todo',
      priority: item.priority === 'critical' || item.priority === 'high' ? 'high' : 'medium',
      assignee: item.owner || 'Alfred',
      tags: ['schedule', 'apple-reminders', 'daily-os'],
      created_by: 'schedule',
    }),
  })
  if (!response.ok) throw new Error(`Failed to create task: ${response.status}`)
  return response.json()
}

export function ScheduleScreen() {
  const queryClient = useQueryClient()
  const statusQuery = useQuery({
    queryKey: ['command-center-status'],
    queryFn: async () => {
      const response = await fetch('/api/command-center-status?refresh=1')
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      return (await response.json()) as CommandStatus
    },
    refetchInterval: 30_000,
  })

  const createMutation = useMutation({
    mutationFn: createScheduleTask,
    onSuccess: () => {
      toast('Schedule planning task staged')
      void queryClient.invalidateQueries({ queryKey: ['hermes', 'tasks'] })
    },
    onError: (error) => toast(error instanceof Error ? error.message : 'Failed to create schedule task', { type: 'error' }),
  })

  const packet = statusQuery.data
  const jobs = packet?.schedule ?? []
  const scheduleMove = useMemo(
    () => packet?.next_moves.find((item) => item.id === 'daily-apple-rail') ?? {
      id: 'daily-apple-rail',
      title: 'Dial in today and tomorrow schedule rails',
      detail: 'Stage the daily rail from jobs, tasks, and Wilson-needed decisions; do not mutate Apple Calendar/Reminders from this screen.',
      status: 'ready' as const,
      priority: 'high' as const,
      owner: 'Alfred',
      action: 'Prepare the daily rail.',
    },
    [packet],
  )

  return (
    <div className="min-h-full bg-[linear-gradient(180deg,rgba(34,197,94,0.06),transparent_22rem),var(--theme-bg)] text-[var(--theme-text)]">
      <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-5 px-4 py-6 sm:px-6 lg:px-8">
        <header className="rounded-lg border border-[var(--theme-border)] bg-[var(--theme-card)] p-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--theme-muted)]">Daily OS</p>
              <h1 className="mt-1 flex items-center gap-2 text-xl font-semibold">
                <HugeiconsIcon icon={Calendar03Icon} size={22} />
                Schedule
              </h1>
              <p className="mt-1 max-w-3xl text-sm text-[var(--theme-muted)]">
                Apple Calendar and Reminders policy rail for today/tomorrow. Current UI stages local planning tasks only; real Apple writes are intentionally not wired here. When enabled, only reversible low-risk local items are allowed without extra approval.
              </p>
            </div>
            <button
              type="button"
              onClick={() => void statusQuery.refetch()}
              className="inline-flex items-center gap-1.5 rounded-md border border-[var(--theme-border)] px-3 py-2 text-xs text-[var(--theme-muted)] hover:text-[var(--theme-text)]"
            >
              <HugeiconsIcon icon={RefreshIcon} size={14} />
              Refresh
            </button>
          </div>
        </header>

        <section className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="rounded-lg border border-[var(--theme-border)] bg-[var(--theme-card)]">
            <div className="border-b border-[var(--theme-border)] px-4 py-3">
              <h2 className="text-sm font-semibold">Today + Tomorrow Job Rail</h2>
              <p className="mt-1 text-xs text-[var(--theme-muted)]">Hermes jobs that should feed daily planning, reminders, and review loops. This is an evidence rail, not proof of Apple mutation.</p>
            </div>
            <div className="divide-y divide-[var(--theme-border)]">
              {statusQuery.isLoading ? (
                <div className="p-4 text-sm text-[var(--theme-muted)]">Loading schedule...</div>
              ) : statusQuery.isError ? (
                <div className="p-4 text-sm text-red-300">Schedule rail failed to load. No calendar/reminder action was attempted.</div>
              ) : jobs.length === 0 ? (
                <div className="p-4 text-sm text-[var(--theme-muted)]">No scheduled jobs found in the local proof packet.</div>
              ) : jobs.map((item) => (
                <div key={item.id} className="flex flex-wrap items-start justify-between gap-3 px-4 py-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className={cn(
                        'size-2 rounded-full',
                        item.status === 'live' ? 'bg-emerald-500' : item.status === 'blocked' ? 'bg-amber-500' : 'bg-neutral-500',
                      )} />
                      <h3 className="truncate text-sm font-medium">{item.title}</h3>
                    </div>
                    <p className="mt-1 text-xs text-[var(--theme-muted)]">{item.detail}</p>
                    {item.evidence ? <p className="mt-1 truncate font-mono text-[10px] text-[var(--theme-muted)]">{item.evidence}</p> : null}
                  </div>
                  <button
                    type="button"
                    disabled={createMutation.isPending}
                    onClick={() => createMutation.mutate(item)}
                    className="inline-flex items-center gap-1.5 rounded-md border border-[var(--theme-border)] px-2.5 py-1.5 text-[11px] hover:border-[var(--theme-accent)] disabled:opacity-60"
                  >
                    <HugeiconsIcon icon={Add01Icon} size={12} />
                    Stage task
                  </button>
                </div>
              ))}
            </div>
          </div>

          <aside className="space-y-4">
            <section className="rounded-lg border border-[var(--theme-border)] bg-[var(--theme-card)] p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--theme-muted)]">Next Best Move</p>
              <h2 className="mt-2 text-base font-semibold">{scheduleMove.title}</h2>
              <p className="mt-2 text-xs text-[var(--theme-muted)]">{scheduleMove.detail}</p>
              <button
                type="button"
                disabled={createMutation.isPending}
                onClick={() => createMutation.mutate(scheduleMove)}
                className="mt-3 inline-flex items-center gap-1.5 rounded-md bg-[var(--theme-accent)] px-3 py-2 text-xs font-semibold text-white disabled:opacity-60"
              >
                <HugeiconsIcon icon={Add01Icon} size={14} />
                Stage daily rail task
              </button>
            </section>
            <section className="rounded-lg border border-[var(--theme-border)] bg-[var(--theme-card)] p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--theme-muted)]">Apple Safety Contract</p>
              <div className="mt-3 space-y-2 text-xs text-[var(--theme-muted)]">
                <p><span className="font-semibold text-[var(--theme-text)]">Current implementation:</span> stages Hermes tasks only; it does not write Apple Calendar or Reminders.</p>
                <p><span className="font-semibold text-[var(--theme-text)]">Future allowed lane:</span> create/update reversible, low-risk local reminders and calendar blocks only.</p>
                <p><span className="font-semibold text-[var(--theme-text)]">Approval required:</span> deletes, invites, shared calendars, external attendees, messages/email, launchd, exposed ports, secrets, or anything outward-facing.</p>
                <p><span className="font-semibold text-[var(--theme-text)]">Proof:</span> every automatic change should leave a task or output artifact with timestamp and reason.</p>
              </div>
            </section>
          </aside>
        </section>
      </div>
    </div>
  )
}
