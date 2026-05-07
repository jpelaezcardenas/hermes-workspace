import { useMemo, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { HugeiconsIcon } from '@hugeicons/react'
import { Add01Icon, BrainIcon, ChartLineData01Icon, GolfHoleIcon, MapsGlobal01Icon, Satellite01Icon } from '@hugeicons/core-free-icons'
import { toast } from '@/components/ui/toast'
import { cn } from '@/lib/utils'

type DomainHub = {
  id: string
  title: string
  tone: string
  icon: typeof BrainIcon
  description: string
  currentTruth: string
  nextAction: string
  agent: string
  sources: Array<string>
}

const DOMAINS: Array<DomainHub> = [
  {
    id: 'finance',
    title: 'Finance Intelligence',
    tone: 'border-emerald-500/30 bg-emerald-500/10',
    icon: ChartLineData01Icon,
    description: 'Bloomberg-style awareness for savings, investing research, risk, watchlists, and money decisions.',
    currentTruth: 'Proposal-only: no trades, brokerage actions, spending, or money movement without Wilson approval.',
    nextAction: 'Build a daily finance brief with source freshness, risks, and watchlist deltas.',
    agent: 'Feynman',
    sources: ['company filings', 'watchlists', 'proof outputs', 'official sources'],
  },
  {
    id: 'research-worldview',
    title: 'Research + Worldview',
    tone: 'border-sky-500/30 bg-sky-500/10',
    icon: Satellite01Icon,
    description: 'NASA/world imagery, news topics, geopolitical signals, and monitored research interests.',
    currentTruth: 'News and imagery are signals until source-backed and freshness-labeled.',
    nextAction: 'Route topics into a daily research radar task with evidence requirements.',
    agent: 'Da Vinci',
    sources: ['NASA Worldview', 'Earthdata', 'official news/source feeds', 'brain topics'],
  },
  {
    id: 'performance',
    title: 'Performance + Golf',
    tone: 'border-lime-500/30 bg-lime-500/10',
    icon: GolfHoleIcon,
    description: 'Practice loops, body/recovery, motivation, accountability, and Wilson performance gains.',
    currentTruth: 'Useful only if it changes practice, recovery, focus, or accountability today.',
    nextAction: 'Create a daily MIQ and practice-accountability rail.',
    agent: 'Waitzkin',
    sources: ['practice notes', 'round data', 'body signals', 'daily agenda'],
  },
  {
    id: 'treasure',
    title: 'Treasure + Field Intel',
    tone: 'border-amber-500/30 bg-amber-500/10',
    icon: MapsGlobal01Icon,
    description: 'Palantir-style map intelligence, provenance, field planning, and research gates.',
    currentTruth: 'Field actions stay gated; provenance and source quality matter before confidence.',
    nextAction: 'Map current leads, missing evidence, and safest next research step.',
    agent: 'Hermes-treasure',
    sources: ['maps', 'local notes', 'provenance files', 'field constraints'],
  },
  {
    id: 'ideas',
    title: 'Ideas + Topics Inbox',
    tone: 'border-violet-500/30 bg-violet-500/10',
    icon: BrainIcon,
    description: 'Capture interests once, route them to the right agent, and turn repeated workflows into skill candidates.',
    currentTruth: 'Ideas become useful when they are routed, sourced, planned, and revisited.',
    nextAction: 'Capture one high-leverage idea and assign a research/planning owner.',
    agent: 'Reddington',
    sources: ['idea inbox', 'brain files', 'agent outputs', 'skill candidates'],
  },
]

async function createIdeaTask(input: { title: string; description: string; domain: DomainHub }) {
  const response = await fetch('/api/hermes-tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: input.title,
      description: [
        input.description,
        `Domain: ${input.domain.title}`,
        `Agent: ${input.domain.agent}`,
        `Source standard: evidence-labeled with source, freshness, confidence, impact, and live/stale/inferred/missing.`,
        `Next action: ${input.domain.nextAction}`,
      ].join('\n\n'),
      column: 'todo',
      priority: 'medium',
      assignee: input.domain.agent,
      tags: ['idea-inbox', input.domain.id, 'source-backed'],
      created_by: 'domains',
    }),
  })
  if (!response.ok) throw new Error(`Failed to create idea task: ${response.status}`)
  return response.json()
}

export function DomainsScreen() {
  const queryClient = useQueryClient()
  const [selectedDomainId, setSelectedDomainId] = useState('ideas')
  const [idea, setIdea] = useState('')
  const [detail, setDetail] = useState('')
  const selectedDomain = useMemo(
    () => DOMAINS.find((domain) => domain.id === selectedDomainId) ?? DOMAINS[0],
    [selectedDomainId],
  )

  const createMutation = useMutation({
    mutationFn: createIdeaTask,
    onSuccess: () => {
      toast('Idea routed to Mission Control')
      setIdea('')
      setDetail('')
      void queryClient.invalidateQueries({ queryKey: ['hermes', 'tasks'] })
    },
    onError: (error) => toast(error instanceof Error ? error.message : 'Failed to route idea', { type: 'error' }),
  })

  function submitIdea() {
    const title = idea.trim()
    if (!title) {
      toast('Add an idea or topic first', { type: 'error' })
      return
    }
    createMutation.mutate({
      title,
      description: detail.trim() || 'Plan how to get the best information daily, then execute systematically inside the safe local loop.',
      domain: selectedDomain,
    })
  }

  return (
    <div className="min-h-full bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.08),transparent_28rem),var(--theme-bg)] text-[var(--theme-text)]">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-5 px-4 py-6 sm:px-6 lg:px-8">
        <header className="rounded-lg border border-[var(--theme-border)] bg-[var(--theme-card)] p-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--theme-muted)]">Domain Hubs</p>
          <h1 className="mt-1 text-xl font-semibold">Wilson Intelligence Domains</h1>
          <p className="mt-1 max-w-3xl text-sm text-[var(--theme-muted)]">
            Finance, research/world imagery, performance, treasure, and ideas are not separate toys; each routes through the same source {'->'} agent {'->'} proof {'->'} bottleneck {'->'} next-move loop.
          </p>
          <div className="mt-3 grid gap-2 text-[11px] sm:grid-cols-3">
            <div className="rounded-md border border-[var(--theme-border)] bg-[var(--theme-card2)] px-3 py-2"><span className="font-semibold text-[var(--theme-text)]">Source standard:</span> evidence, freshness, confidence, impact.</div>
            <div className="rounded-md border border-[var(--theme-border)] bg-[var(--theme-card2)] px-3 py-2"><span className="font-semibold text-[var(--theme-text)]">Truth label:</span> live, stale, inferred, missing, or proposal-only.</div>
            <div className="rounded-md border border-[var(--theme-border)] bg-[var(--theme-card2)] px-3 py-2"><span className="font-semibold text-[var(--theme-text)]">Action gate:</span> external-world changes require Wilson approval.</div>
          </div>
        </header>

        <section className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_420px]">
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {DOMAINS.map((domain) => (
              <button
                key={domain.id}
                type="button"
                onClick={() => setSelectedDomainId(domain.id)}
                className={cn(
                  'min-h-[220px] rounded-lg border p-4 text-left transition-transform hover:-translate-y-0.5',
                  domain.tone,
                  selectedDomain.id === domain.id && 'ring-1 ring-[var(--theme-accent)]',
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="inline-flex size-10 items-center justify-center rounded-md border border-white/10 bg-black/20">
                    <HugeiconsIcon icon={domain.icon} size={22} />
                  </div>
                  <span className="rounded-full border border-white/10 bg-black/20 px-2 py-0.5 text-[10px] uppercase tracking-[0.12em] text-[var(--theme-muted)]">
                    {domain.agent} · proposal rail
                  </span>
                </div>
                <h2 className="mt-4 text-base font-semibold">{domain.title}</h2>
                <p className="mt-2 text-xs leading-5 text-[var(--theme-muted)]">{domain.description}</p>
                <div className="mt-4 rounded-md border border-white/10 bg-black/15 p-2">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--theme-muted)]">Next</p>
                  <p className="mt-1 text-xs">{domain.nextAction}</p>
                </div>
              </button>
            ))}
          </div>

          <aside className="space-y-4">
            <section className={cn('rounded-lg border p-4', selectedDomain.tone)}>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--theme-muted)]">Selected Hub</p>
              <h2 className="mt-2 text-lg font-semibold">{selectedDomain.title}</h2>
              <p className="mt-2 text-sm text-[var(--theme-muted)]">{selectedDomain.currentTruth}</p>
              <div className="mt-3 rounded-md border border-amber-500/20 bg-amber-500/10 px-3 py-2 text-[11px] text-amber-100">
                Planning rail only: this card describes the operating model and source map. It is not claiming a live feed until evidence appears in Company Flow or a proof artifact.
              </div>
              <div className="mt-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--theme-muted)]">Source map</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {selectedDomain.sources.map((source) => (
                    <span key={source} className="rounded-full border border-white/10 bg-black/20 px-2 py-1 text-[10px] text-[var(--theme-muted)]">{source}</span>
                  ))}
                </div>
              </div>
            </section>

            <section className="rounded-lg border border-[var(--theme-border)] bg-[var(--theme-card)] p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--theme-muted)]">Ideas Inbox</p>
              <h2 className="mt-1 text-base font-semibold">Route an idea to Hermes</h2>
              <div className="mt-3 space-y-3">
                <input
                  value={idea}
                  onChange={(event) => setIdea(event.target.value)}
                  placeholder="Topic, idea, lead, question, or opportunity"
                  className="w-full rounded-md border border-[var(--theme-border)] bg-[var(--theme-card2)] px-3 py-2 text-sm outline-none focus:border-[var(--theme-accent)]"
                />
                <textarea
                  value={detail}
                  onChange={(event) => setDetail(event.target.value)}
                  placeholder="What should Hermes learn, monitor, plan, or improve?"
                  rows={5}
                  className="w-full resize-none rounded-md border border-[var(--theme-border)] bg-[var(--theme-card2)] px-3 py-2 text-sm outline-none focus:border-[var(--theme-accent)]"
                />
                <button
                  type="button"
                  disabled={createMutation.isPending}
                  onClick={submitIdea}
                  className="inline-flex w-full items-center justify-center gap-1.5 rounded-md bg-[var(--theme-accent)] px-3 py-2 text-sm font-semibold text-white disabled:opacity-60"
                >
                  <HugeiconsIcon icon={Add01Icon} size={16} />
                  Stage routed planning task
                </button>
              </div>
            </section>
          </aside>
        </section>
      </div>
    </div>
  )
}
