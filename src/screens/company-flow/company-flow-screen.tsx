import { useMemo, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { HugeiconsIcon } from '@hugeicons/react'
import { Add01Icon, Alert02Icon, ArrowRight01Icon, RefreshIcon } from '@hugeicons/core-free-icons'
import { toast } from '@/components/ui/toast'
import { cn } from '@/lib/utils'

type FlowNode = {
  id: string
  type: string
  label: string
  column: number
  status: 'live' | 'stale' | 'inferred' | 'missing' | 'blocked' | 'ready'
  priority?: 'critical' | 'high' | 'medium' | 'low'
  detail?: string
  href?: string
}

type FlowEdge = {
  id: string
  source: string
  target: string
  label: string
  status: 'healthy' | 'blocked' | 'attention'
}

type FlowItem = {
  id: string
  title: string
  detail: string
  status: FlowNode['status']
  priority: 'critical' | 'high' | 'medium' | 'low'
  owner?: string
  action?: string
  href?: string
  evidence?: string
}

type CompanyFlowPacket = {
  generated_at: string
  summary: Record<string, number>
  health: Record<string, string>
  nodes: FlowNode[]
  edges: FlowEdge[]
  needs_wilson: FlowItem[]
  bottlenecks: FlowItem[]
  gains: FlowItem[]
  next_moves: FlowItem[]
  skill_candidates: FlowItem[]
  company?: {
    operating_model: string
    primary_drivers: Array<{ id: string; name: string }>
    support_specialists: Array<{ id: string; name: string }>
    skill_inventory: { total: number; mapped_to_hermes: number }
  }
  automation_queue?: FlowItem[]
}

const COLUMN_LABELS = [
  'Brain + Sources',
  'Hermes Drivers',
  'Jobs + Automations',
  'Outputs',
  'Proof',
  'Approvals',
  'Gains',
  'Next Moves',
]

const STATUS_CLASS: Record<FlowNode['status'], string> = {
  live: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-200',
  ready: 'border-sky-500/30 bg-sky-500/10 text-sky-200',
  blocked: 'border-amber-500/40 bg-amber-500/10 text-amber-100 shadow-[0_0_24px_rgba(245,158,11,0.12)]',
  missing: 'border-red-500/40 bg-red-500/10 text-red-100 shadow-[0_0_24px_rgba(239,68,68,0.12)]',
  stale: 'border-orange-500/30 bg-orange-500/10 text-orange-100',
  inferred: 'border-neutral-500/30 bg-neutral-500/10 text-neutral-200',
}

function priorityRank(priority?: FlowItem['priority']) {
  if (priority === 'critical') return 0
  if (priority === 'high') return 1
  if (priority === 'medium') return 2
  return 3
}

async function createTaskFromMove(item: FlowItem) {
  const response = await fetch('/api/hermes-tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: item.title,
      description: [
        item.detail,
        item.action ? `Next action: ${item.action}` : '',
        item.evidence ? `Evidence: ${item.evidence}` : '',
      ].filter(Boolean).join('\n\n'),
      column: 'todo',
      priority: item.priority === 'critical' || item.priority === 'high' ? 'high' : 'medium',
      assignee: item.owner || null,
      tags: ['company-flow', item.status, item.priority],
      created_by: 'company-flow',
    }),
  })
  if (!response.ok) throw new Error(`Failed to create task: ${response.status}`)
  return response.json()
}

export function CompanyFlowScreen() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [filter, setFilter] = useState<'all' | 'blocked' | 'agents' | 'proof' | 'next'>('all')

  const flowQuery = useQuery({
    queryKey: ['company-flow'],
    queryFn: async () => {
      const response = await fetch('/api/company-flow')
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      return (await response.json()) as CompanyFlowPacket
    },
    refetchInterval: 30_000,
  })

  const createTaskMutation = useMutation({
    mutationFn: createTaskFromMove,
    onSuccess: () => {
      toast('Mission task created')
      void queryClient.invalidateQueries({ queryKey: ['hermes', 'tasks'] })
    },
    onError: (error) => toast(error instanceof Error ? error.message : 'Failed to create task', { type: 'error' }),
  })

  const packet = flowQuery.data
  const selectedNode = packet?.nodes.find((node) => node.id === selectedId) ?? packet?.nodes[0]
  const selectedEdges = useMemo(() => {
    if (!packet || !selectedNode) return []
    return packet.edges.filter((edge) => edge.source === selectedNode.id || edge.target === selectedNode.id)
  }, [packet, selectedNode])

  const visibleNodes = useMemo(() => {
    const nodes = packet?.nodes ?? []
    if (filter === 'blocked') return nodes.filter((node) => node.status === 'blocked' || node.status === 'missing')
    if (filter === 'agents') return nodes.filter((node) => node.type === 'agent' || node.type === 'support')
    if (filter === 'proof') return nodes.filter((node) => node.type === 'proof' || node.type === 'approval' || node.type === 'output')
    if (filter === 'next') return nodes.filter((node) => node.type === 'next_move' || node.type === 'skill_candidate')
    return nodes
  }, [filter, packet])

  const nodesByColumn = useMemo(() => {
    const grouped = new Map<number, FlowNode[]>()
    for (const node of visibleNodes) {
      const list = grouped.get(node.column) ?? []
      list.push(node)
      grouped.set(node.column, list)
    }
    for (const list of grouped.values()) {
      list.sort((a, b) => priorityRank(a.priority) - priorityRank(b.priority) || a.label.localeCompare(b.label))
    }
    return grouped
  }, [visibleNodes])

  return (
    <div className="min-h-full bg-[radial-gradient(circle_at_top_left,rgba(20,184,166,0.08),transparent_32rem),var(--theme-bg)] text-[var(--theme-text)]">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-4 px-4 py-5 sm:px-6 lg:px-8">
        <header className="rounded-lg border border-[var(--theme-border)] bg-[var(--theme-card)] px-4 py-3">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--theme-muted)]">Majestic12 Operating System</p>
              <h1 className="mt-1 text-xl font-semibold tracking-tight">Company Flow</h1>
              <p className="mt-1 max-w-3xl text-sm text-[var(--theme-muted)]">
                Hermes-led circuit of sources, primary agents, support specialists, jobs, automations, proof, approvals, gains, and next moves. Broken flow is the work.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => void flowQuery.refetch()}
                className="inline-flex items-center gap-1.5 rounded-md border border-[var(--theme-border)] px-3 py-2 text-xs text-[var(--theme-muted)] hover:text-[var(--theme-text)]"
              >
                <HugeiconsIcon icon={RefreshIcon} size={14} />
                Refresh
              </button>
              <button
                type="button"
                onClick={() => navigate({ to: '/tasks' })}
                className="rounded-md bg-[var(--theme-accent)] px-3 py-2 text-xs font-semibold text-white"
              >
                Work board
              </button>
            </div>
          </div>
          <div className="mt-3 rounded-md border border-teal-500/20 bg-teal-500/5 px-3 py-2 text-[11px] text-[var(--theme-muted)]">
            <span className="font-semibold text-teal-200">Operating model:</span> Hermes agents drive the company. Reddington orchestrates, domain agents execute, Cowork keeps rhythm, and Claude Code handles engineering only when Hermes delegates it. Nothing is treated as proven until the proof stage says so.
          </div>
          <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-6">
            {[
              ['Hermes Drivers', packet?.summary.hermes_primary_drivers ?? packet?.company?.primary_drivers.length ?? 0],
              ['Support', packet?.summary.support_specialists ?? packet?.company?.support_specialists.length ?? 0],
              ['Broken flows', packet?.summary.broken_flows ?? 0],
              ['Automations', packet?.summary.automations_ready ?? packet?.automation_queue?.length ?? 0],
              ['Skills', packet?.summary.skills_total ?? packet?.company?.skill_inventory.total ?? 0],
              ['Identity Issues', packet?.summary.identity_issues ?? 0],
            ].map(([label, value]) => (
              <div key={label} className="rounded-md border border-[var(--theme-border)] bg-[var(--theme-card2)] px-3 py-2">
                <div className="text-lg font-bold tabular-nums">{value}</div>
                <div className="text-[10px] uppercase tracking-[0.14em] text-[var(--theme-muted)]">{label}</div>
              </div>
            ))}
          </div>
        </header>

        <div className="flex flex-wrap gap-2">
          {([
            ['all', 'All'],
            ['blocked', 'Broken'],
            ['agents', 'Agents'],
            ['proof', 'Proof'],
            ['next', 'Next Moves'],
          ] as const).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setFilter(id)}
              className={cn(
                'rounded-md border px-3 py-1.5 text-xs transition-colors',
                filter === id
                  ? 'border-[var(--theme-accent)] bg-[var(--theme-accent)]/15 text-[var(--theme-text)]'
                  : 'border-[var(--theme-border)] text-[var(--theme-muted)] hover:text-[var(--theme-text)]',
              )}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="grid min-h-[680px] gap-4 2xl:grid-cols-[minmax(0,1fr)_340px]">
          <section className="overflow-x-auto rounded-lg border border-[var(--theme-border)] bg-[rgba(8,12,18,0.45)] p-3">
            {flowQuery.isLoading ? (
              <div className="flex h-full min-h-[420px] items-center justify-center text-sm text-[var(--theme-muted)]">Loading company circuit...</div>
            ) : flowQuery.isError ? (
              <div className="flex h-full min-h-[420px] items-center justify-center px-4 text-center text-sm text-red-300">Company Flow failed to load. The circuit is unavailable rather than assumed healthy; refresh after the local API is reachable.</div>
            ) : (
              <div className="grid min-w-[1320px] grid-cols-8 gap-3">
                {COLUMN_LABELS.map((label, column) => (
                  <div key={label} className="min-h-[620px] rounded-md border border-[var(--theme-border)] bg-[var(--theme-card)]/60 p-2">
                    <div className="sticky top-0 z-10 mb-2 rounded border border-[var(--theme-border)] bg-[var(--theme-card)] px-2 py-1.5 text-[10px] font-semibold uppercase tracking-[0.13em] text-[var(--theme-muted)]">
                      {label}
                    </div>
                    <div className="space-y-2">
                      {(nodesByColumn.get(column) ?? []).map((node) => {
                        const outgoing = packet?.edges.filter((edge) => edge.source === node.id) ?? []
                        return (
                          <button
                            key={node.id}
                            type="button"
                            onClick={() => setSelectedId(node.id)}
                            className={cn(
                              'group w-full rounded-md border p-2 text-left transition-transform hover:-translate-y-0.5',
                              STATUS_CLASS[node.status],
                              selectedNode?.id === node.id && 'ring-1 ring-[var(--theme-accent)]',
                            )}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div className="min-w-0">
                                <div className="truncate text-xs font-semibold">{node.label}</div>
                                <div className="mt-0.5 text-[9px] uppercase tracking-[0.12em] opacity-70">{node.type}</div>
                              </div>
                              {(node.status === 'blocked' || node.status === 'missing') ? (
                                <HugeiconsIcon icon={Alert02Icon} size={14} className="shrink-0" />
                              ) : null}
                            </div>
                            {node.detail ? <p className="mt-1 line-clamp-2 text-[10px] opacity-75">{node.detail}</p> : null}
                            {outgoing.length > 0 ? (
                              <div className="mt-2 flex flex-wrap gap-1">
                                {outgoing.slice(0, 2).map((edge) => (
                                  <span key={edge.id} className="inline-flex items-center gap-1 rounded bg-black/20 px-1.5 py-0.5 text-[9px] opacity-80">
                                    {edge.label}
                                    <HugeiconsIcon icon={ArrowRight01Icon} size={10} />
                                  </span>
                                ))}
                              </div>
                            ) : null}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <aside className="rounded-lg border border-[var(--theme-border)] bg-[var(--theme-card)]">
            <div className="border-b border-[var(--theme-border)] px-4 py-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--theme-muted)]">Inspector</p>
              <h2 className="mt-1 text-base font-semibold">{selectedNode?.label ?? 'Select a node'}</h2>
              <p className="mt-1 text-xs text-[var(--theme-muted)]">{selectedNode?.detail ?? 'Click a circuit node to inspect its evidence and next action.'}</p>
            </div>
            <div className="space-y-4 p-4">
              {selectedNode ? (
                <>
                  <div className={cn('rounded-md border px-3 py-2 text-xs', STATUS_CLASS[selectedNode.status])}>
                    {selectedNode.status.toUpperCase()} · {selectedNode.priority ?? 'normal'}
                  </div>
                  {selectedEdges.length > 0 ? (
                    <section>
                      <h3 className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--theme-muted)]">Connected Flow</h3>
                      <div className="space-y-2">
                        {selectedEdges.map((edge) => (
                          <div key={edge.id} className="rounded-md border border-[var(--theme-border)] bg-[var(--theme-card2)] px-3 py-2 text-xs">
                            <div className="font-medium">{edge.label}</div>
                            <div className="mt-1 font-mono text-[10px] text-[var(--theme-muted)]">{edge.source} {'->'} {edge.target}</div>
                          </div>
                        ))}
                      </div>
                    </section>
                  ) : null}
                  {selectedNode.href ? (
                    <button
                      type="button"
                      onClick={() => navigate({ to: selectedNode.href as never })}
                      className="w-full rounded-md border border-[var(--theme-border)] px-3 py-2 text-xs font-semibold hover:border-[var(--theme-accent)]"
                    >
                      Open source surface
                    </button>
                  ) : null}
                </>
              ) : null}

              <section>
                <h3 className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--theme-muted)]">Top Next Moves</h3>
                <div className="space-y-2">
                  {[...(packet?.next_moves ?? [])].sort((a, b) => priorityRank(a.priority) - priorityRank(b.priority)).slice(0, 3).map((item) => (
                    <div key={item.id} className="rounded-md border border-[var(--theme-border)] bg-[var(--theme-card2)] p-3">
                      <div className="text-xs font-semibold">{item.title}</div>
                      <p className="mt-1 text-[11px] text-[var(--theme-muted)]">{item.detail}</p>
                      <button
                        type="button"
                        disabled={createTaskMutation.isPending}
                        onClick={() => createTaskMutation.mutate(item)}
                        className="mt-2 inline-flex items-center gap-1.5 rounded-md bg-[var(--theme-accent)] px-2.5 py-1.5 text-[11px] font-semibold text-white disabled:opacity-60"
                      >
                        <HugeiconsIcon icon={Add01Icon} size={12} />
                        Stage task
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
