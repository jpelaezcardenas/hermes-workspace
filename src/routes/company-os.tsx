import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  ArrowReloadHorizontalIcon,
  Building02Icon,
  CheckListIcon,
  Calendar01Icon,
  DocumentValidationIcon,
  Rocket01Icon,
  Target02Icon,
} from '@hugeicons/core-free-icons'
import { usePageTitle } from '@/hooks/use-page-title'
import { cn } from '@/lib/utils'

type CompanyOsTask = {
  title: string
  description: string
  status: 'active' | 'waiting' | 'someday' | 'done'
  tags: Array<string>
  priority: string | null
}

type CompanyOsDocument = {
  title: string
  filename: string
  body: string
  excerpt: string
}

type CompanyOsInvoice = {
  file: string
  status: 'outstanding' | 'done' | 'needs-proof' | 'review'
  source: string
}

type CompanyOsAsset = {
  id: string
  title: string
  kind: 'pricing' | 'media-kit' | 'proposal' | 'tax' | 'contract' | 'invoice' | 'site' | 'brand'
  file: string
  path: string
  note: string
}

type CompanyOsLead = {
  id: number | string
  title: string
  businessName: string | null
  listId: string | null
  priority: string | null
  estimatedValue: string | null
  draftStatus: string | null
  updatedAt: string | null
}

type CompanyOsKanbanAction = {
  id: number | string
  title: string
  businessName: string | null
  stage: string | null
  priority: string | null
  draftStatus: string | null
  updatedAt: string | null
  lane: string
  urgency: 'p0' | 'p1' | 'p2'
  reason: string
  recommendedAction: string
  publicAsset: string | null
  assetIds: Array<string>
}

type CompanyOsSignal = {
  kind: string
  subject?: string
  from?: string
  title?: string
  url?: string
  threadId?: string
  messageId?: string
  gmailUrl?: string
  timestamp?: string
  updatedAt?: string
  summary: string
  needs?: string
  thread?: {
    status: string
    latestAction: string
    messages: Array<{
      id: string
      from: string
      to?: Array<string>
      cc?: Array<string>
      timestamp?: string
      subject?: string
      body: string
      attachments?: Array<string>
    }>
  }
}

type CompanyOsLiveOps = {
  sources: Array<{
    name: string
    status: 'connected' | 'snapshot' | 'missing' | 'error'
    count: number
    note: string
  }>
  invoices: Array<CompanyOsInvoice>
  invoiceCounts: Record<string, number>
  assets: Array<CompanyOsAsset>
  supabase: {
    ok: boolean
    count: number
    stages: Record<string, number>
    priorities: Record<string, number>
    draftStatuses: Record<string, number>
    hotLeads: Array<CompanyOsLead>
    invoiceLeads: Array<CompanyOsLead>
    kanbanActions: Array<CompanyOsKanbanAction>
    error?: string
  }
  emailSignals: Array<CompanyOsSignal>
  driveSignals: Array<CompanyOsSignal>
}

type CompanyOsSnapshot = {
  slug: string
  name: string
  idea: string
  audience: string
  status: string
  rules: Array<string>
  tasks: Array<CompanyOsTask>
  documents: Array<CompanyOsDocument>
  log: string
  siteHtml: string
  workspacePath: string
  liveOps: CompanyOsLiveOps
  updatedAt: string
}

type TodayQueueItem = {
  id: string
  title: string
  detail: string
  lane: string
  priority: 'p0' | 'p1' | 'p2'
  action: string
}

type LeadReplyPacket = {
  signal: CompanyOsSignal
  item: TodayQueueItem
  status: 'needs-us' | 'needs-robert' | 'waiting-them' | 'money-admin'
  owner: 'Asher' | 'Robert' | 'Sam' | 'Internal'
  urgency: 'today' | 'this-week' | 'parked'
  blocker: string
  nextMove: string
  draft: string
}

type ReplySender = 'asher' | 'robert' | 'sam'

type QueueFilter = 'all' | 'money' | 'leads' | 'email' | 'robert' | 'blocked'
type WorkspaceTab = 'queue' | 'calendar'
type PacketTab =
  | 'summary'
  | 'thread'
  | 'draft'
  | 'assets'
  | 'actions'
type LeadInboxLane = 'new' | 'needsReply' | 'followUp'

type PacketReview = {
  status: string
  operator: string
  dealQuestion: string
  dealSteps: Array<string>
  robertBrief: string
  evidence: Array<string>
  risks: Array<string>
  recommendedAction: string
  draftMessage: string
  checklist: Array<string>
}

type LeadCommand = {
  mode: string
  objective: string
  missing: Array<string>
  robertGate: string
  attachmentNote: string
  proofNote: string
}

type CollabWorkflow = {
  stageIndex: number
  stageLabel: string
  currentTask: string
  operatorRule: string
  invoiceState: string
  paymentState: string
  briefState: string
  doneRule: string
}

type OpsBriefItem = {
  title: string
  chips: Array<string>
  bullets: Array<string>
  tone?: 'action' | 'waiting'
}

const OPS_PREP_ITEMS: Array<OpsBriefItem> = [
  {
    title: 'Kombai QRT via Marketing Guys',
    chips: ['June 2', '$1,895', 'Robert test'],
    bullets: [
      'Launch moved to Tuesday, June 2.',
      'Rate confirmed: $1,895.',
      'Payment should happen 24 hours before post goes live.',
      'Robert needs to test/review kombai.com before QRT.',
      'Need receipt/payment confirmation before posting.',
    ],
  },
  {
    title: 'AhaCreator 3.0 launch',
    chips: ['$2,495', 'June 2?', 'date mismatch'],
    bullets: [
      'Paid X narrative thread.',
      'Budget: $2,495.',
      'Original window was June 8-10; latest follow-up points toward June 2.',
      'Resolve date mismatch, invoice, and whether Robert commentary is included or changes rate.',
    ],
  },
  {
    title: 'NVIDIA Nemotron / NemoClaw briefing',
    chips: ['May 27 8am PT', 'embargo Jun 4', 'access'],
    bullets: [
      'Briefing: Wednesday, May 27 at 8am PT.',
      'Embargo: Thursday, June 4 at 6am PT.',
      'Need NVIDIA NGC login and Google Form completed for model access.',
      'Do not mention Nemotron 3.5 Nano publicly until NVIDIA clears it.',
    ],
  },
  {
    title: 'ACL San Diego / Alibaba via Hockey Stick',
    chips: ['July 5', '$20,000', 'May 27 call'],
    bullets: [
      'Event target: July 5 in San Diego.',
      'Proposed fee: $20,000, with payment split before/on event.',
      'Travel add-on being discussed, roughly $1,000.',
      'Meeting set: Wednesday, May 27, 12:00-12:30pm ET.',
      'Prep max content pieces, quote/forward posts, travel, video deliverables, approval process.',
    ],
  },
  {
    title: 'Life Summit / Bloomstack',
    chips: ['June 11', 'LinkedIn', 'speaker kit'],
    bullets: [
      'Event: June 11.',
      'Robert needs to accept Damini LinkedIn connection/speaker invite so he appears on speaker list.',
      'Resource kit exists; they want speaker posts shared and Bloomstack tagged.',
    ],
  },
  {
    title: 'Riverside / Nadav',
    chips: ['reschedule', 'draft ready'],
    bullets: [
      'Still needs rescheduling.',
      'Draft offers Friday, May 29 after 10am PT; Monday, June 1 9-11am PT; Tuesday, June 2 9am-12pm PT; Wednesday, June 3 after 10am PT.',
      'Send or confirm the reschedule email.',
    ],
  },
]

const OPS_WAITING_ITEMS: Array<OpsBriefItem> = [
  {
    title: 'Anything.com / Leo launch amplification',
    chips: ['rates sent', 'waiting'],
    bullets: [
      'Recurring X + LinkedIn launch posts.',
      'They want Robert rates on file.',
      'Asher sent the rate PDF; waiting on next step/details.',
    ],
    tone: 'waiting',
  },
  {
    title: 'Goodfire / SoCap',
    chips: ['postponed'],
    bullets: ['Was supposed to be May 26-28, but they postponed it. No prep until new dates.'],
    tone: 'waiting',
  },
  {
    title: 'Deel / SoCap',
    chips: ['postponed'],
    bullets: ['Was supposed to be June 2, but also postponed. No prep until new dates.'],
    tone: 'waiting',
  },
  {
    title: 'R3ACH / Declan',
    chips: ['waiting on them'],
    bullets: ['Asher asked for overview/onboarding details. Waiting on them.'],
    tone: 'waiting',
  },
  {
    title: 'IFM / Hector Liu',
    chips: ['scheduling', 'not paid yet'],
    bullets: [
      'Dave Reddy asked what date/time works to meet Hector Liu at IFM Lab in Sunnyvale.',
      'Scheduling needed, but not a paid collab yet.',
    ],
    tone: 'waiting',
  },
]

const COMPANY_OS_OPERATIONS_THEME = {
  colorScheme: 'light',
  '--theme-bg': '#f3f5f2',
  '--theme-sidebar': '#eef1ed',
  '--theme-panel': '#eef1ed',
  '--theme-card': '#fbfcfa',
  '--theme-card2': '#eef2ef',
  '--theme-border': '#d6ddd6',
  '--theme-border-subtle': '#e5ebe5',
  '--theme-text': '#1f2622',
  '--theme-muted': '#5f6b64',
  '--theme-shadow-1': '0 1px 2px rgba(31, 38, 34, 0.04)',
  '--theme-shadow-2': '0 8px 22px rgba(31, 38, 34, 0.08)',
  '--theme-shadow-3': '0 18px 40px rgba(31, 38, 34, 0.10)',
  '--theme-glass': 'rgba(243, 245, 242, 0.92)',
  '--theme-focus': '#1f6f5b',
  '--theme-accent': '#1f6f5b',
  '--theme-accent-secondary': '#2f806d',
  '--theme-accent-subtle': 'rgba(31, 111, 91, 0.10)',
  '--theme-accent-border': 'rgba(31, 111, 91, 0.24)',
  '--theme-active': '#1f6f5b',
  '--theme-link': '#1f6f5b',
  '--theme-success': '#247a4b',
  '--theme-warning': '#9a6216',
  '--theme-danger': '#b23b3b',
  '--theme-stripe': 'rgba(214, 221, 214, 0.48)',
  '--theme-header-bg': '#f3f5f2',
  '--theme-header-border': '#d6ddd6',
  '--theme-input': '#ffffff',
  '--color-primary-50': '#fbfcfa',
  '--color-primary-100': '#eef2ef',
  '--color-primary-200': '#d6ddd6',
  '--color-primary-300': '#c5cec5',
  '--color-primary-400': '#7c887f',
  '--color-primary-500': '#5f6b64',
  '--color-primary-600': '#4d5851',
  '--color-primary-700': '#333d37',
  '--color-primary-800': '#28312c',
  '--color-primary-900': '#1f2622',
  '--color-primary-950': '#151a17',
  '--color-surface': '#f3f5f2',
  '--color-surface-deep': '#eef1ed',
  '--color-ink': '#1f2622',
  '--color-accent-400': '#2f806d',
  '--color-accent-500': '#1f6f5b',
  '--color-accent-600': '#185a49',
} as CSSProperties

export const Route = createFileRoute('/company-os')({
  ssr: false,
  component: CompanyOsRouteView,
})

async function fetchCompanyOs(): Promise<CompanyOsSnapshot> {
  const res = await fetch('/api/company-os?slug=unalignedos')
  const data = await res.json()
  if (!res.ok || !data?.snapshot) {
    throw new Error(data?.error || `Company OS request failed (${res.status})`)
  }
  return data.snapshot as CompanyOsSnapshot
}

export function CompanyOsRouteView() {
  usePageTitle('Company OS Beta')
  const query = useQuery({
    queryKey: ['company-os', 'unalignedos'],
    queryFn: fetchCompanyOs,
    refetchInterval: 15_000,
  })

  if (query.isLoading) {
    return (
      <div className="flex h-full items-center justify-center text-sm text-[var(--theme-muted)]">
        Loading Company OS...
      </div>
    )
  }

  if (query.isError || !query.data) {
    return (
      <div className="flex h-full items-center justify-center px-6">
        <div className="max-w-lg rounded-lg border border-[var(--theme-border)] bg-[var(--theme-card)] p-5">
          <h1 className="text-lg font-semibold text-[var(--theme-text)]">Company OS is empty</h1>
          <p className="mt-2 text-sm text-[var(--theme-muted)]">
            Create a Hermes company workspace, then this dashboard will pick it up.
          </p>
        </div>
      </div>
    )
  }

  return (
    <CompanyOsDashboard
      snapshot={query.data}
      onRefreshSnapshot={async () => {
        await query.refetch()
      }}
    />
  )
}

function CompanyOsDashboard({
  snapshot,
  onRefreshSnapshot,
}: {
  snapshot: CompanyOsSnapshot
  onRefreshSnapshot: () => Promise<void>
}) {
  const [focusedItem, setFocusedItem] = useState<TodayQueueItem | null>(null)
  const [detailItem, setDetailItem] = useState<TodayQueueItem | null>(null)
  const [workspaceTab, setWorkspaceTab] = useState<WorkspaceTab>('queue')
  const [queueFilter, setQueueFilter] = useState<QueueFilter>('all')
  const [gmailRefresh, setGmailRefresh] = useState<{
    status: 'idle' | 'loading' | 'success' | 'error'
    message: string
  }>({ status: 'idle', message: '' })
  const activeTasks = snapshot.tasks.filter((task) => task.status === 'active')
  const waitingTasks = snapshot.tasks.filter((task) => task.status === 'waiting')
  const live = snapshot.liveOps
  const todayQueue = useMemo(() => buildTodayQueue(live), [live])
  const leadInbox = useMemo(() => buildLeadInbox(live), [live])
  const leadReplyDesk = useMemo(() => buildLeadReplyDesk(live), [live])
  const robertCalendar = useMemo(
    () => buildRobertCalendarAgenda(leadReplyDesk, todayQueue),
    [leadReplyDesk, todayQueue],
  )
  const [activeReplyPacketId, setActiveReplyPacketId] = useState<string | null>(
    leadReplyDesk[0]?.item.id || null,
  )
  const filteredQueue = useMemo(
    () => filterQueue(todayQueue, queueFilter),
    [queueFilter, todayQueue],
  )

  async function refreshGmail() {
    setGmailRefresh({ status: 'loading', message: 'Refreshing Gmail...' })
    try {
      const response = await fetch('/api/company-os/gmail-refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: snapshot.slug }),
      })
      const data = await response.json()
      if (!response.ok || !data?.ok) {
        throw new Error(data?.error || `Gmail refresh failed (${response.status})`)
      }

      setGmailRefresh({
        status: 'success',
        message: data.result?.message || 'Gmail refreshed.',
      })
      await onRefreshSnapshot()
      window.setTimeout(() => {
        setGmailRefresh((current) =>
          current.status === 'success' ? { status: 'idle', message: '' } : current,
        )
      }, 2600)
    } catch (error) {
      setGmailRefresh({
        status: 'error',
        message: error instanceof Error ? error.message : String(error),
      })
    }
  }

  const p0Count = todayQueue.filter((item) => item.priority === 'p0').length
  const topQueueItem =
    leadInbox.needsReply[0] || leadInbox.new[0] || leadInbox.followUp[0] || todayQueue[0]
  const leadCount =
    leadInbox.new.length + leadInbox.needsReply.length + leadInbox.followUp.length
  const activeReplyPacket =
    leadReplyDesk.find((packet) => packet.item.id === activeReplyPacketId) ||
    leadReplyDesk[0] ||
    null

  return (
    <div
      className="min-h-screen bg-[var(--theme-bg)] text-[var(--theme-text)]"
      style={COMPANY_OS_OPERATIONS_THEME}
    >
      <div className="flex w-full max-w-none flex-col gap-4 bg-[var(--theme-bg)] px-4 py-4 md:px-6 md:py-5">
        <div className="sticky top-0 z-20 -mx-4 border-b border-[var(--theme-border)] bg-[color-mix(in_srgb,var(--theme-bg)_92%,transparent)] px-4 py-3 backdrop-blur md:-mx-6 md:px-6">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-[var(--theme-border)] bg-[var(--theme-card)] text-[var(--theme-accent)]">
                <HugeiconsIcon icon={Building02Icon} size={24} strokeWidth={1.7} />
              </span>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--theme-muted)]">
                    Company OS Beta
                  </p>
                  <Badge>Live Unaligned demo</Badge>
                </div>
                <h1 className="truncate text-2xl font-semibold text-[var(--theme-text)]">
                  {snapshot.name}
                </h1>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <StatusPill label="P0" value={p0Count} tone="danger" />
              <StatusPill label="Lead inbox" value={leadCount} tone="warning" />
              <StatusPill label="Sources" value={live.sources.length} tone="neutral" />
              <button
                type="button"
                onClick={() => void refreshGmail()}
                disabled={gmailRefresh.status === 'loading'}
                className={cn(
                  'inline-flex h-10 items-center justify-center gap-2 rounded-lg border px-4 text-sm font-semibold transition',
                  gmailRefresh.status === 'loading'
                    ? 'border-[var(--theme-border)] bg-[var(--theme-card2)] text-[var(--theme-muted)]'
                    : 'border-accent-500/35 bg-[var(--theme-accent)]/10 text-[var(--theme-accent)] hover:bg-[var(--theme-accent)]/15',
                )}
              >
                <HugeiconsIcon icon={ArrowReloadHorizontalIcon} size={18} />
                {gmailRefresh.status === 'loading' ? 'Refreshing' : 'Refresh Gmail'}
              </button>
            </div>
          </div>
          {gmailRefresh.message ? (
            <p
              className={cn(
                'mt-2 text-xs leading-5',
                gmailRefresh.status === 'error' ? 'text-[var(--theme-danger)]' : 'text-[var(--theme-muted)]',
              )}
            >
              {gmailRefresh.message}
            </p>
          ) : null}
        </div>

        <OpsBriefPanel />

        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_280px]">
          <div className="space-y-4">
            <LeadReplyDesk
              packets={leadReplyDesk}
              activePacketId={activeReplyPacketId}
              onActivePacketChange={setActiveReplyPacketId}
              onOpen={setDetailItem}
            />

            {!activeReplyPacket ? (
              <FocusPanel item={focusedItem || topQueueItem} onOpen={setDetailItem} />
            ) : null}
          </div>

          <WorkspaceRail
            activeTab={workspaceTab}
            onTabChange={setWorkspaceTab}
            packets={leadReplyDesk}
            activePacketId={activeReplyPacketId}
            onActivePacketChange={setActiveReplyPacketId}
            onFocusChange={setFocusedItem}
            queue={todayQueue}
            calendar={robertCalendar}
          />
        </div>

        <details className="rounded-lg border border-[var(--theme-border)] bg-[var(--theme-card)]">
          <summary className="cursor-pointer px-4 py-3 text-sm font-semibold text-[var(--theme-text)]">
            Reference
          </summary>
          <div className="grid gap-4 border-t border-[var(--theme-border)] p-4 xl:grid-cols-3">
            <Panel title="Money Watchlist" icon={DocumentValidationIcon}>
              <InvoiceList invoices={live.invoices} />
            </Panel>
            <Panel title="Pipeline" icon={Rocket01Icon}>
              <StageBreakdown stages={live.supabase.stages} />
            </Panel>
            <Panel title="Signals" icon={DocumentValidationIcon}>
              <SignalList signals={live.emailSignals} />
            </Panel>
            <Panel title="Assets" icon={DocumentValidationIcon}>
              <AssetList assets={live.assets.slice(0, 6)} />
            </Panel>
            <Panel title="Sources" icon={Target02Icon}>
              <SourceList sources={live.sources} />
            </Panel>
            <Panel title="Tasks" icon={CheckListIcon}>
              <div className="space-y-3">
                {[...activeTasks, ...waitingTasks].slice(0, 5).map((task) => (
                  <TaskCard key={task.title} task={task} />
                ))}
              </div>
            </Panel>
            <Panel title="Ops Queue" icon={CheckListIcon}>
              <QueueFilterTabs
                active={queueFilter}
                items={todayQueue}
                onChange={setQueueFilter}
              />
              <div className="space-y-2">
                {filteredQueue.map((item) => (
                  <QueueItemButton
                    key={item.id}
                    item={item}
                    onSelect={(queueItem) => {
                      setFocusedItem(queueItem)
                      const packetId = findLeadReplyPacketId(queueItem, leadReplyDesk)
                      if (packetId) setActiveReplyPacketId(packetId)
                    }}
                  />
                ))}
              </div>
            </Panel>
          </div>
        </details>

        <div className="hidden">
          <Panel title="Drive Signals" icon={DocumentValidationIcon}>
            <SignalList signals={live.driveSignals} />
          </Panel>
          <Panel title="Invoice / Payment Leads" icon={Target02Icon}>
            <LeadList leads={live.supabase.invoiceLeads} />
          </Panel>
          <Panel title="Sales Asset Library" icon={DocumentValidationIcon}>
            <AssetList assets={live.assets} />
          </Panel>
        </div>
      </div>
      {detailItem ? (
        <QueueDetailDrawer
          item={detailItem}
          live={live}
          onClose={() => setDetailItem(null)}
        />
      ) : null}
    </div>
  )
}

function buildTodayQueue(live: CompanyOsLiveOps): Array<TodayQueueItem> {
  const queue: Array<TodayQueueItem> = []
  const needsProof = live.invoices.find((invoice) => invoice.status === 'needs-proof')
  const outstanding = live.invoices.filter((invoice) => invoice.status === 'outstanding')
  const kanbanActions = live.supabase.kanbanActions.slice(0, 4)
  const emailLead = live.emailSignals.find((signal) => signal.kind === 'lead')
  const handoff = live.emailSignals.find((signal) => signal.kind === 'handoff')

  if (outstanding.length) {
    queue.push({
      id: 'review-outstanding-invoices',
      title: `Review ${outstanding.length} outstanding invoices`,
      detail: `${outstanding.length} invoice file${outstanding.length === 1 ? '' : 's'} need review before any follow-up.`,
      lane: 'finance',
      priority: 'p0',
      action: 'Open each outstanding invoice, confirm client/status, then draft follow-up only after review.',
    })
  }

  if (needsProof) {
    queue.push({
      id: 'find-payment-proof',
      title: 'Find payment proof',
      detail: 'One invoice is waiting on payment proof before it can move on.',
      lane: 'finance',
      priority: 'p0',
      action: 'Search payment evidence before moving this invoice to done or sending any follow-up.',
    })
  }

  for (const action of kanbanActions) {
    queue.push({
      id: `kanban-action-${action.id}`,
      title: action.businessName || action.title,
      detail: action.reason,
      lane: action.lane,
      priority: action.urgency,
      action: action.recommendedAction,
    })
  }

  if (emailLead) {
    queue.push({
      id: `email-${emailLead.subject || 'lead'}`,
      title: emailLead.subject || 'Gmail lead signal',
      detail: emailLead.needs || emailLead.summary,
      lane: 'email',
      priority: 'p1',
      action: 'Turn this Gmail signal into an owner, status, and next reply draft.',
    })
  }

  if (handoff) {
    queue.push({
      id: `handoff-${handoff.subject || 'signal'}`,
      title: handoff.subject || 'Handoff signal',
      detail: handoff.needs || handoff.summary,
      lane: 'Robert handoff',
      priority: 'p2',
      action: 'Add this to the Robert handoff list and clarify whether it needs action or just awareness.',
    })
  }

  return queue.slice(0, 6)
}

function buildLeadInbox(
  live: CompanyOsLiveOps,
): Record<LeadInboxLane, Array<TodayQueueItem>> {
  const newLeads: Array<TodayQueueItem> = []
  const needsReply: Array<TodayQueueItem> = []
  const followUp: Array<TodayQueueItem> = []

  for (const signal of live.emailSignals.filter((item) => item.kind === 'lead')) {
    const title = signal.subject || signal.title || 'New Gmail lead'
    newLeads.push({
      id: `email-lead-${title}`,
      title,
      detail: signal.needs || signal.summary,
      lane: 'new lead',
      priority: 'p1',
      action:
        'Review the inbound lead, identify the ask, choose the right Unaligned asset, and draft a reply for approval.',
    })
    needsReply.push({
      id: `email-reply-${title}`,
      title,
      detail: signal.needs || signal.summary,
      lane: 'needs reply',
      priority: 'p1',
      action:
        'Draft a concise reply that answers the lead, confirms next step, and does not commit pricing or timing without approval.',
    })
  }

  for (const lead of live.supabase.hotLeads) {
    const stage = lead.listId || 'unknown'
    const title = lead.businessName || lead.title
    const item: TodayQueueItem = {
      id: `lead-card-${lead.id}`,
      title,
      detail: `${lead.title} is ${lead.priority || 'unprioritized'} in ${stage}; draft status is ${lead.draftStatus || 'none'}.`,
      lane: stage === 'first-touch' ? 'new lead' : 'needs reply',
      priority: lead.priority === 'hot' ? 'p1' : 'p2',
      action:
        'Review the Supabase card, check whether a reply is waiting, and prepare the next outbound message for approval.',
    }

    if (stage === 'first-touch' || stage === 'engaged') {
      newLeads.push(item)
    }

    if (['pending', 'drafted'].includes(lead.draftStatus || '')) {
      needsReply.push({ ...item, lane: 'needs reply' })
    }
  }

  for (const action of live.supabase.kanbanActions) {
    if (!['rates-sent', 'negotiating', 'engaged', 'first-touch'].includes(action.stage || '')) {
      continue
    }

    followUp.push({
      id: `lead-follow-up-${action.id}`,
      title: action.businessName || action.title,
      detail: `${action.reason} Stage: ${action.stage || 'unknown'}; draft: ${action.draftStatus || 'none'}.`,
      lane: 'follow-up due',
      priority: action.urgency === 'p0' ? 'p1' : action.urgency,
      action:
        'Check the last touch, decide whether this needs a bump, and draft a follow-up for approval.',
    })
  }

  return {
    new: dedupeQueueItems(newLeads).slice(0, 5),
    needsReply: dedupeQueueItems(needsReply).slice(0, 5),
    followUp: dedupeQueueItems(followUp).slice(0, 5),
  }
}

function buildLeadReplyDesk(live: CompanyOsLiveOps): Array<LeadReplyPacket> {
  return live.emailSignals
    .filter((signal) => signal.kind === 'lead')
    .map((signal) => {
      const item = queueItemFromSignal(signal)
      const status = leadReplyStatus(signal)
      const owner = leadReplyOwner(signal, status)
      const urgency = leadReplyUrgency(signal, status)
      const blocker = leadReplyBlocker(signal, status)
      const nextMove = leadReplyNextMove(signal, status, owner)
      const draft = buildPacketDraft(item, [], undefined, signal)

      return {
        signal,
        item,
        status,
        owner,
        urgency,
        blocker,
        nextMove,
        draft,
      }
    })
    .sort((left, right) => replyRank(left) - replyRank(right))
    .slice(0, 6)
}

function findLeadReplyPacketId(
  item: TodayQueueItem,
  packets: Array<LeadReplyPacket>,
): string | null {
  const needle = normalizeQueueTitle(item.title)
  const packet = packets.find((candidate) => {
    const title = normalizeQueueTitle(candidate.item.title)
    const subject = normalizeQueueTitle(candidate.signal.subject || candidate.signal.title || '')
    return title === needle || subject === needle
  })

  return packet?.item.id || null
}

function normalizeQueueTitle(value: string): string {
  return value.toLowerCase().replace(/^re:\s*/, '').replace(/\s+/g, ' ').trim()
}

function queueItemFromSignal(signal: CompanyOsSignal): TodayQueueItem {
  const title = signal.subject || signal.title || 'Gmail lead signal'
  const status = leadReplyStatus(signal)
  const owner = leadReplyOwner(signal, status)
  return {
    id: `reply-desk-${signal.threadId || signal.messageId || title}`,
    title,
    detail: signal.needs || signal.summary,
    lane: 'needs reply',
    priority: /urgent|launch|today|approved|monday|timing|qrt/i.test(
      `${title} ${signal.summary} ${signal.thread?.latestAction || ''}`,
    )
      ? 'p0'
      : 'p1',
    action: leadReplyNextMove(signal, status, owner),
  }
}

function leadReplyStatus(signal: CompanyOsSignal): LeadReplyPacket['status'] {
  const haystack = signalHaystack(signal)
  if (/invoice|payment|paid out|receipt|stripe|w-?9|tax|procurement/.test(haystack)) {
    return 'money-admin'
  }
  if (/robert|scoble|use the product|try the software|test out|approval|reshare/.test(haystack)) {
    return 'needs-robert'
  }
  if (/sent|attached|shared|provided|rate card|sponsorship information/.test(haystack)) {
    return 'waiting-them'
  }
  return 'needs-us'
}

function leadReplyOwner(
  _signal: CompanyOsSignal,
  status: LeadReplyPacket['status'],
): LeadReplyPacket['owner'] {
  if (status === 'money-admin') return 'Internal'
  return 'Asher'
}

function leadReplyUrgency(
  signal: CompanyOsSignal,
  status: LeadReplyPacket['status'],
): LeadReplyPacket['urgency'] {
  const haystack = signalHaystack(signal)
  if (/urgent|launch|today|approved|monday|may 25|within 30 minutes|qrt/.test(haystack)) {
    return 'today'
  }
  if (status === 'waiting-them') return 'parked'
  return 'this-week'
}

function leadReplyBlocker(
  signal: CompanyOsSignal,
  status: LeadReplyPacket['status'],
): string {
  const latest = latestExternalMessage(signal)
  const ask = leadAskLabel(signal)
  const customer = latest?.name || latest?.email || 'the lead'

  if (status === 'needs-robert') {
    return `${customer} is asking about ${ask}. Asher owns the reply and collects the facts; Sam reviews if needed; Robert only gets the one-minute approval brief.`
  }
  if (status === 'waiting-them') {
    return `We already appear to have sent info or rates. This stays visible so ${customer} does not go cold before budget, timing, and deliverables are locked.`
  }
  if (status === 'money-admin') {
    return `This touches payment or admin status. Verify paid vs waiting-for-payment before anyone sends a client-facing note.`
  }
  return signal.thread?.messages.length
    ? `${customer} has an active ${ask} thread. Asher should move the conversation forward and collect the facts Robert will need later. Sam is oversight, not first reply.`
    : 'Thread content is not cached yet; refresh Gmail before drafting.'
}

function leadReplyNextMove(
  signal: CompanyOsSignal,
  status: LeadReplyPacket['status'],
  _owner: LeadReplyPacket['owner'],
): string {
  const sender = 'Asher'
  const ask = leadAskLabel(signal)
  const threadPrefix = signal.thread?.messages.length
    ? `Reply as ${sender} in the existing thread`
    : `Reply as ${sender}`

  if (status === 'needs-robert') {
    return `${threadPrefix}: collect ask, budget, timing, and deliverables; route Robert only when the final public action needs approval.`
  }
  if (status === 'waiting-them') {
    return `Hold unless follow-up is due; then ${sender} nudges for the missing budget/timing/decision and keeps Robert out of it.`
  }
  if (status === 'money-admin') {
    return `Verify paid vs waiting-for-payment before ${sender} sends anything external.`
  }
  return `${threadPrefix}: answer the ${ask} ask, send the sponsorship PDF if pricing is involved, and ask for budget, timing, and deliverables.`
}

function buildLeadCommand(packet: LeadReplyPacket): LeadCommand {
  const ask = leadAskLabel(packet.signal)
  const sender = 'Asher'
  const customer = latestExternalMessage(packet.signal)?.name || 'the lead'

  if (packet.status === 'money-admin') {
    return {
      mode: 'Payment check',
      objective: `Verify ${customer}: paid, waiting for payment, or missing proof. Do not send until the money state is clean.`,
      missing: ['invoice match', 'paid vs waiting', 'proof/status'],
      robertGate: 'Robert only needs this if payment status changes the collaboration or relationship.',
      attachmentNote: 'No pricing PDF on payment checks.',
      proofNote: 'Do not mark paid or request payment until the record is verified.',
    }
  }

  if (packet.status === 'waiting-them') {
    return {
      mode: 'Waiting',
      objective: `${sender} follows up only if due. Otherwise wait for budget, timing, or package confirmation. Sam reviews only.`,
      missing: ['lead reply', 'decision', 'budget/timing'],
      robertGate: 'Robert stays out until the lead agrees on package, objective, and timing.',
      attachmentNote: shouldSendPricingPdf(packet.signal)
        ? 'Pricing PDF was likely already discussed; attach only if it was not actually sent.'
        : 'No attachment needed yet.',
      proofNote: 'Avoid extra pings unless there is a real due date.',
    }
  }

  if (packet.status === 'needs-robert') {
    return {
      mode: 'Deal intake',
      objective: `${sender} replies now, collects package, timing, deliverables, payment path, and the exact Robert ask. Sam stays in oversight.`,
      missing: ['budget', 'timing', 'deliverables', 'payment path', 'Robert ask'],
      robertGate: 'Robert gets one brief when the exact public action and payment state are clear.',
      attachmentNote: shouldSendPricingPdf(packet.signal)
        ? 'Pricing PDF should attach or be referenced in the reply.'
        : 'No pricing attachment detected yet.',
      proofNote: 'Keep Robert out of the middle. Collect the facts first.',
    }
  }

  return {
    mode: 'New lead',
    objective: `${sender} replies in-thread, answers the ${ask} ask, and asks for the missing deal facts. Sam reviews only when needed.`,
    missing: ['budget', 'timing', 'deliverables', 'next step'],
    robertGate: 'Robert only enters after the deal has a clear objective, risk, and payment state.',
    attachmentNote: shouldSendPricingPdf(packet.signal)
      ? 'Pricing PDF should attach or be referenced in the reply.'
      : 'No attachment needed unless pricing comes up.',
    proofNote: 'Keep the thread moving without committing pricing, dates, or claims beyond the package.',
  }
}

function leadAskLabel(signal: CompanyOsSignal): string {
  const haystack = signalHaystack(signal)
  if (/invoice|payment|paid out|receipt|stripe|w-?9|tax|procurement/.test(haystack)) {
    return 'payment/admin'
  }
  if (/rate|rates|pricing|price|sponsor|sponsorship|package|media kit/.test(haystack)) {
    return 'pricing/sponsorship'
  }
  if (/launch|january|monday|today|available|availability|posting|post/.test(haystack)) {
    return 'launch timing and posting availability'
  }
  if (/collab|collaboration|partner|campaign|brief|deliverable/.test(haystack)) {
    return 'paid collaboration'
  }
  if (/use the product|try the software|test out|demo|product/.test(haystack)) {
    return 'product-fit approval'
  }
  return shortenText(signal.needs || signal.summary || signal.subject || 'lead request', 72)
}

function latestExternalMessage(signal: CompanyOsSignal): { name: string; email: string; body: string } | null {
  const internal = new Set([
    'scobleizer@gmail.com',
    'unalignedx@gmail.com',
    'asherunaligned@gmail.com',
  ])

  for (let index = (signal.thread?.messages.length || 0) - 1; index >= 0; index -= 1) {
    const message = signal.thread?.messages[index]
    const email = extractEmail(message?.from)
    if (!email || internal.has(email)) continue
    const name = String(message?.from || '')
      .replace(/<[^>]+>/g, '')
      .replace(/["']/g, '')
      .trim()
    return {
      name: name && !name.includes('@') ? name : email,
      email,
      body: message?.body || '',
    }
  }

  const email = extractEmail(signal.from)
  if (email && !internal.has(email)) {
    const name = String(signal.from || '')
      .replace(/<[^>]+>/g, '')
      .replace(/["']/g, '')
      .trim()
    return {
      name: name && !name.includes('@') ? name : email,
      email,
      body: signal.summary || signal.needs || '',
    }
  }

  return null
}

function signalHaystack(signal: CompanyOsSignal): string {
  return [
    signal.subject,
    signal.title,
    signal.from,
    signal.summary,
    signal.needs,
    signal.thread?.status,
    signal.thread?.latestAction,
    ...(signal.thread?.messages.map((message) => message.body) || []),
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
}

function replyRank(packet: LeadReplyPacket): number {
  const urgency = { today: 0, 'this-week': 10, parked: 20 }[packet.urgency]
  const status = {
    'needs-us': 0,
    'needs-robert': 1,
    'money-admin': 2,
    'waiting-them': 3,
  }[packet.status]
  return urgency + status
}

function defaultReplySender(_packet: LeadReplyPacket): ReplySender {
  return 'asher'
}

function senderName(sender: ReplySender): string {
  if (sender === 'robert') return 'Robert Scoble'
  if (sender === 'sam') return 'Sam Levin'
  return 'Asher'
}

function senderShortName(sender: ReplySender): string {
  if (sender === 'robert') return 'Robert'
  if (sender === 'sam') return 'Sammy'
  return 'Asher'
}

function senderEmail(sender: ReplySender): string {
  if (sender === 'robert') return 'scobleizer@gmail.com'
  if (sender === 'sam') return 'unalignedx@gmail.com'
  return 'asherunaligned@gmail.com'
}

function senderSignature(sender: ReplySender): string {
  if (sender === 'robert') {
    return [
      'Robert Scoble',
      'Founder, Unaligned (media company about how AI is bringing us new things)',
      'Mobile: +1-425-205-1921',
      'X: https://x.com/scobleizer',
      'Web: https://unaligned.io',
      'This message copyright the sender. All rights reserved.',
    ].join('\n')
  }

  if (sender === 'sam') {
    return ['Sam Levin', 'Partnerships, UNALIGNED', 'unalignedx@gmail.com'].join('\n')
  }

  return [
    'Asher Weisberger',
    'Client Services Manager',
    'Unaligned',
    'asherunaligned@gmail.com',
    'unaligned.io | x.com/unalignedx',
  ].join('\n')
}

function ensureSenderSignature(body: string, sender: ReplySender): string {
  const text = body.trim()
  const signature = senderSignature(sender)
  if (!text) return signature
  if (normalizeText(text).includes(normalizeText(signature))) return text
  return `${text}\n\n${signature}`
}

function internalEmails(excludeSender: ReplySender): Array<string> {
  return ['scobleizer@gmail.com', 'UnalignedX@gmail.com', 'asherunaligned@gmail.com'].filter(
    (email) => email.toLowerCase() !== senderEmail(excludeSender),
  )
}

function extractEmail(value: unknown): string {
  const match = String(value || '').match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)
  return match?.[0]?.toLowerCase() || ''
}

function splitEmails(value: unknown): Array<string> {
  return String(value || '')
    .split(/[,\s;]+/)
    .map((email) => extractEmail(email))
    .filter(Boolean)
}

function uniqueEmails(values: Array<string>): Array<string> {
  const seen = new Set<string>()
  return values.filter((email) => {
    const normalized = email.trim().toLowerCase()
    if (!normalized || seen.has(normalized)) return false
    seen.add(normalized)
    return true
  })
}

function emailsFromValue(value: unknown): Array<string> {
  if (!value) return []
  if (Array.isArray(value)) return uniqueEmails(value.flatMap((item) => emailsFromValue(item)))
  if (typeof value === 'object') {
    const record = value as Record<string, unknown>
    return emailsFromValue(
      record.email || record.emails || record.to || record.cc || record.replyTo || record.reply_to,
    )
  }
  return uniqueEmails(splitEmails(value))
}

function threadParticipants(signal: CompanyOsSignal): Array<string> {
  const emails: Array<string> = []
  emails.push(...emailsFromValue(signal.from))

  for (const message of signal.thread?.messages || []) {
    emails.push(...emailsFromValue(message.from))
    emails.push(...emailsFromValue(message.to))
    emails.push(...emailsFromValue(message.cc))
  }

  return uniqueEmails(emails)
}

function leadReplyToEmail(signal: CompanyOsSignal, sender: ReplySender): string {
  const senderAddress = senderEmail(sender)
  const internal = new Set([
    'scobleizer@gmail.com',
    'unalignedx@gmail.com',
    'asherunaligned@gmail.com',
  ])
  const candidates: Array<string> = []

  for (let index = (signal.thread?.messages.length || 0) - 1; index >= 0; index -= 1) {
    const message = signal.thread?.messages[index]
    candidates.push(...emailsFromValue(message?.from))
    candidates.push(...emailsFromValue(message?.to))
    candidates.push(...emailsFromValue(message?.cc))
  }

  candidates.push(...emailsFromValue(signal.from))

  for (const email of uniqueEmails(candidates)) {
    if (email === senderAddress) continue
    if (internal.has(email)) continue
    return email
  }

  return ''
}

function replyRecipients(
  signal: CompanyOsSignal,
  sender: ReplySender,
): { to: Array<string>; cc: Array<string> } {
  const leadEmail = leadReplyToEmail(signal, sender)
  const senderAddress = senderEmail(sender)
  const participants = uniqueEmails([...threadParticipants(signal), ...internalEmails(sender)])
  const to = leadEmail && leadEmail !== senderAddress ? [leadEmail] : []
  const cc = participants.filter(
    (email) => email !== leadEmail && email !== senderAddress,
  )

  return { to: uniqueEmails(to), cc: uniqueEmails(cc) }
}

function subjectForSignal(signal: CompanyOsSignal): string {
  const last = signal.thread?.messages[signal.thread.messages.length - 1]
  const base = signal.subject || last?.subject || signal.title || 'Lead conversation'
  return /^re:/i.test(base) ? base : `Re: ${base}`
}

function fallbackReplyBody(packet: LeadReplyPacket, sender: ReplySender): string {
  const first = leadFirstName(packet.signal)
  const ask = leadAskLabel(packet.signal)
  const pricing = shouldSendPricingPdf(packet.signal)
  const question = pricing
    ? 'Can you confirm budget range, target timing, and the deliverables you want covered?'
    : 'Can you confirm the clean next step, timing, and what you need from us?'

  if (sender === 'robert') {
    return [
      `Hi ${first},`,
      '',
      'Thanks for reaching out.',
      'I am looping this through Asher so he can handle the details and bring me back the clean final brief when needed. Sam is copied for oversight.',
      '',
      'Best,',
    ].join('\n')
  }

  if (sender === 'sam') {
    return [
      `Hi ${first},`,
      '',
      `I'm jumping in on the ${ask} side so we can keep this moving without making you repeat the thread.`,
      pricing
        ? "I'm including the sponsorship package/rates and can help narrow the right fit."
        : "I'll help pin down the practical next step and keep the handoff clean.",
      question,
      '',
      'Best,',
    ].join('\n')
  }

  return [
    `Hi ${first},`,
    '',
    `I'm jumping in on the ${ask} side so we can keep this moving cleanly from here.`,
    pricing
      ? "I'm including the sponsorship package/rates and can help narrow the right fit."
      : "I'll keep the thread organized and make sure the next step is clear.",
    question,
    '',
    'Best,',
  ].join('\n')
}

function shouldSendPricingPdf(signal: CompanyOsSignal): boolean {
  return /rate|rates|pricing|price|sponsor|sponsorship|package|media kit|paid collab|paid collaboration/i.test(
    signalHaystack(signal),
  )
}

function leadFirstName(signal: CompanyOsSignal): string {
  const internal = new Set([
    'scobleizer@gmail.com',
    'unalignedx@gmail.com',
    'asherunaligned@gmail.com',
  ])
  let from = ''

  for (let index = (signal.thread?.messages.length || 0) - 1; index >= 0; index -= 1) {
    const candidate = signal.thread?.messages[index]?.from || ''
    const email = extractEmail(candidate)
    if (email && !internal.has(email)) {
      from = candidate
      break
    }
  }

  if (!from && signal.from && !internal.has(extractEmail(signal.from))) {
    from = signal.from
  }

  const withoutEmail = from.replace(/<[^>]+>/g, '').replace(/["']/g, '').trim()
  const first = withoutEmail.split(/\s+/)[0]
  return first && !first.includes('@') ? first : 'there'
}

function composeReply(packet: LeadReplyPacket, sender: ReplySender) {
  return {
    subject: subjectForSignal(packet.signal),
    body: ensureSenderSignature(fallbackReplyBody(packet, sender), sender),
    recipients: replyRecipients(packet.signal, sender),
  }
}

function buildReplyAsDraft(packet: LeadReplyPacket, sender: ReplySender): string {
  const reply = composeReply(packet, sender)
  return [
    `From: ${senderName(sender)} <${senderEmail(sender)}>`,
    `To: ${reply.recipients.to.join(', ') || '[add lead email]'}`,
    reply.recipients.cc.length ? `Cc: ${reply.recipients.cc.join(', ')}` : '',
    `Subject: ${reply.subject}`,
    '',
    reply.body,
  ]
    .filter((line, index, lines) => line || lines[index - 1] === '')
    .join('\n')
}

function normalizeText(value: string): string {
  return value.toLowerCase().replace(/\s+/g, ' ').trim()
}

function dedupeQueueItems(items: Array<TodayQueueItem>): Array<TodayQueueItem> {
  const seen = new Set<string>()
  return items.filter((item) => {
    const key = item.title.toLowerCase()
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

function queueMatchesFilter(item: TodayQueueItem, filter: QueueFilter): boolean {
  const haystack = `${item.title} ${item.detail} ${item.lane} ${item.action}`.toLowerCase()
  if (filter === 'all') return true
  if (filter === 'money') return /money|finance|invoice|payment|paid|proof/.test(haystack)
  if (filter === 'leads') return /lead|sales|sponsor|rates|kanban/.test(haystack)
  if (filter === 'email') return /email|gmail|reply|draft/.test(haystack)
  if (filter === 'robert') return /robert|scoble|handoff/.test(haystack)
  if (filter === 'blocked') return /proof|blocked|confirm|approval|review/.test(haystack)
  return true
}

function filterQueue(
  items: Array<TodayQueueItem>,
  filter: QueueFilter,
): Array<TodayQueueItem> {
  return items.filter((item) => queueMatchesFilter(item, filter))
}

function OpsBriefPanel() {
  return (
    <section className="space-y-3">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <HugeiconsIcon
              icon={CheckListIcon}
              size={18}
              strokeWidth={1.7}
              className="text-[var(--theme-accent)]"
            />
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--theme-muted)]">
              Daily Operating Brief
            </p>
            <Badge>May 26</Badge>
          </div>
          <h2 className="mt-1 text-2xl font-semibold text-[var(--theme-text)]">What matters right now</h2>
        </div>
        <p className="max-w-2xl text-sm leading-6 text-[var(--theme-muted)]">
          Prep work, payment gates, and waiting items before opening any thread.
        </p>
      </div>

      <div className="grid gap-3 xl:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.75fr)]">
        <BriefSection title="Needs Prep / Action" items={OPS_PREP_ITEMS} />
        <BriefSection title="Watch / Waiting" items={OPS_WAITING_ITEMS} compact />
      </div>
    </section>
  )
}

function BriefSection({
  title,
  items,
  compact = false,
}: {
  title: string
  items: Array<OpsBriefItem>
  compact?: boolean
}) {
  return (
    <section className="min-w-0 rounded-lg border border-[var(--theme-border)] bg-[var(--theme-card)]">
      <div className="flex items-center justify-between gap-3 border-b border-[var(--theme-border)] px-4 py-3">
        <h3 className="text-sm font-semibold text-[var(--theme-text)]">{title}</h3>
        <Badge>{items.length}</Badge>
      </div>
      <div className="divide-y divide-[var(--theme-border)]">
        {items.map((item) => (
          <BriefRow key={item.title} item={item} compact={compact} />
        ))}
      </div>
    </section>
  )
}

function BriefRow({ item, compact }: { item: OpsBriefItem; compact: boolean }) {
  return (
    <article
      className={cn(
        'grid gap-3 px-4 py-3',
        compact ? 'grid-cols-1' : 'md:grid-cols-[220px_minmax(0,1fr)]',
      )}
    >
      <div className="min-w-0">
        <h4 className="break-words text-sm font-semibold leading-5 text-[var(--theme-text)]">{item.title}</h4>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {item.chips.map((chip) => (
            <Badge key={chip}>{chip}</Badge>
          ))}
        </div>
      </div>
      <ul className={cn('space-y-1.5 text-sm leading-6 text-[var(--theme-muted)]', compact && 'text-xs leading-5')}>
        {item.bullets.map((bullet) => (
          <li key={bullet} className="flex gap-2">
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[var(--theme-accent)]" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </article>
  )
}

function QueueFilterTabs({
  active,
  items,
  onChange,
}: {
  active: QueueFilter
  items: Array<TodayQueueItem>
  onChange: (filter: QueueFilter) => void
}) {
  const filters: Array<{ id: QueueFilter; label: string }> = [
    { id: 'all', label: 'All' },
    { id: 'money', label: 'Money' },
    { id: 'leads', label: 'Leads' },
    { id: 'email', label: 'Email' },
    { id: 'robert', label: 'Robert' },
    { id: 'blocked', label: 'Blocked' },
  ]

  return (
    <div className="mb-3 flex flex-wrap gap-2">
      {filters.map((filter) => {
        const count = filterQueue(items, filter.id).length
        const selected = filter.id === active
        return (
          <button
            key={filter.id}
            type="button"
            onClick={() => onChange(filter.id)}
            className={cn(
              'inline-flex h-8 items-center gap-1.5 rounded-md border px-2.5 text-xs font-semibold transition',
              selected
                ? 'border-accent-500/50 bg-[var(--theme-accent)]/15 text-[var(--theme-accent)]'
                : 'border-[var(--theme-border)] bg-[var(--theme-card2)] text-[var(--theme-muted)] hover:border-accent-500/40',
            )}
          >
            {filter.label}
            <span className="tabular-nums text-[var(--theme-muted)]">{count}</span>
          </button>
        )
      })}
    </div>
  )
}

function LeadInbox({
  lanes,
  onSelect,
}: {
  lanes: Record<LeadInboxLane, Array<TodayQueueItem>>
  onSelect: (item: TodayQueueItem) => void
}) {
  const laneMeta: Array<{ id: LeadInboxLane; title: string; empty: string }> = [
    { id: 'new', title: 'New Leads', empty: 'No new leads in the current snapshot.' },
    { id: 'needsReply', title: 'Needs Reply', empty: 'No replies are flagged right now.' },
    { id: 'followUp', title: 'Follow-Up Due', empty: 'No follow-ups are due in this view.' },
  ]

  return (
    <div className="space-y-4 lg:max-h-[calc(100vh-180px)] lg:overflow-y-auto lg:pr-1">
      {laneMeta.map((lane) => (
        <section key={lane.id}>
          <div className="mb-2 flex items-center justify-between gap-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--theme-muted)]">
              {lane.title}
            </p>
            <Badge>{lanes[lane.id].length}</Badge>
          </div>
          <div className="space-y-2">
            {lanes[lane.id].map((item) => (
              <QueueItemButton key={item.id} item={item} onSelect={onSelect} compact />
            ))}
            {!lanes[lane.id].length ? (
              <div className="rounded-lg border border-[var(--theme-border)] bg-[var(--theme-card2)] p-3 text-xs leading-5 text-[var(--theme-muted)]">
                {lane.empty}
              </div>
            ) : null}
          </div>
        </section>
      ))}
    </div>
  )
}

function LeadReplyDesk({
  packets,
  activePacketId,
  onActivePacketChange,
  onOpen,
}: {
  packets: Array<LeadReplyPacket>
  activePacketId: string | null
  onActivePacketChange: (id: string) => void
  onOpen: (item: TodayQueueItem) => void
}) {
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [sendState, setSendState] = useState<
    Record<
      string,
      { status: 'idle' | 'sending' | 'sent' | 'error'; message: string }
    >
  >({})
  const [selectedSenders, setSelectedSenders] = useState<Record<string, ReplySender>>({})
  const activePacket =
    packets.find((packet) => packet.item.id === activePacketId) || packets[0] || null

  function senderFor(packet: LeadReplyPacket): ReplySender {
    return selectedSenders[packet.item.id] || defaultReplySender(packet)
  }

  async function copyDraft(packet: LeadReplyPacket) {
    const sender = senderFor(packet)
    await navigator.clipboard?.writeText(buildReplyAsDraft(packet, sender))
    setCopiedId(packet.item.id)
    window.setTimeout(() => setCopiedId(null), 1400)
  }

  async function sendReply(packet: LeadReplyPacket) {
    const sender = senderFor(packet)
    const reply = composeReply(packet, sender)

    if (!reply.recipients.to.length) {
      setSendState((current) => ({
        ...current,
        [packet.item.id]: {
          status: 'error',
          message: 'Add the lead email before sending.',
        },
      }))
      return
    }

    setSendState((current) => ({
      ...current,
      [packet.item.id]: { status: 'sending', message: 'Sending reply...' },
    }))

    try {
      const endpoint =
        sender === 'asher'
          ? '/api/company-os/send'
          : 'https://us-central1-unaligned-fc556.cloudfunctions.net/sendEmail'
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: reply.recipients.to,
          cc: reply.recipients.cc,
          subject: reply.subject,
          body: reply.body,
          from: sender,
          threadId: packet.signal.threadId || null,
          attachPdf: shouldSendPricingPdf(packet.signal),
        }),
      })
      const data = await response.json()
      if (!response.ok || data?.error) {
        throw new Error(data?.error || `Send failed (${response.status})`)
      }

      setSendState((current) => ({
        ...current,
        [packet.item.id]: {
          status: 'sent',
          message: `Sent as ${senderShortName(sender)} to ${reply.recipients.to.join(', ')}`,
        },
      }))
    } catch (error) {
      setSendState((current) => ({
        ...current,
        [packet.item.id]: {
          status: 'error',
          message: error instanceof Error ? error.message : String(error),
        },
      }))
    }
  }

  if (!packets.length) {
    return (
      <section className="rounded-lg border border-[var(--theme-border)] bg-[var(--theme-card)] p-4">
        <div className="flex items-center gap-2">
          <HugeiconsIcon icon={Rocket01Icon} size={18} strokeWidth={1.7} className="text-[var(--theme-accent)]" />
          <h2 className="text-sm font-semibold text-[var(--theme-text)]">Deal Machine</h2>
        </div>
        <p className="mt-2 text-sm leading-6 text-[var(--theme-muted)]">
          No Gmail lead threads are cached. Refresh Gmail to build reply packets.
        </p>
      </section>
    )
  }

  return (
    <section className="rounded-lg border border-[var(--theme-border)] bg-[var(--theme-card)] p-5">
      <div className="mb-3 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <HugeiconsIcon icon={Rocket01Icon} size={18} strokeWidth={1.7} className="text-[var(--theme-accent)]" />
          <h2 className="text-sm font-semibold text-[var(--theme-text)]">Deal Machine</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge>{packets.filter((packet) => packet.urgency === 'today').length} today</Badge>
          <Badge>{packets.length} leads</Badge>
          <Badge>Asher replies</Badge>
        </div>
      </div>

      {activePacket ? (
        <LeadCommandSurface
          packet={activePacket}
          copied={copiedId === activePacket.item.id}
          sender={senderFor(activePacket)}
          sendState={sendState[activePacket.item.id]}
          onCopy={() => void copyDraft(activePacket)}
          onOpen={() => onOpen(activePacket.item)}
          onSend={() => void sendReply(activePacket)}
          onSenderChange={(sender) =>
            setSelectedSenders((current) => ({
              ...current,
              [activePacket.item.id]: sender,
            }))
          }
        />
      ) : null}
    </section>
  )
}

function LeadCommandSurface({
  packet,
  copied,
  sender,
  sendState,
  onCopy,
  onOpen,
  onSend,
  onSenderChange,
}: {
  packet: LeadReplyPacket
  copied: boolean
  sender: ReplySender
  sendState?: { status: 'idle' | 'sending' | 'sent' | 'error'; message: string }
  onCopy: () => void
  onOpen: () => void
  onSend: () => void
  onSenderChange: (sender: ReplySender) => void
}) {
  const reply = composeReply(packet, sender)
  const command = buildLeadCommand(packet)
  const workflow = buildCollabWorkflow(packet)
  const sendBlocked = packet.status === 'money-admin'
  const targetEmail = reply.recipients.to.join(', ') || 'Lead email missing'

  return (
    <article
      className={cn(
        'overflow-hidden rounded-lg border',
        packet.urgency === 'today'
          ? 'border-amber-500/30 bg-amber-500/[0.05]'
          : 'border-[var(--theme-border)] bg-[var(--theme-card2)]',
      )}
    >
      <div className="grid gap-0 xl:grid-cols-[minmax(0,1fr)_300px]">
        <div className="space-y-4 p-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div className="min-w-0">
              <div className="mb-2 flex flex-wrap gap-2">
                <Badge>{workflow.stageLabel}</Badge>
                <Badge>{replyStatusLabel(packet.status)}</Badge>
                <Badge>{packet.urgency}</Badge>
              </div>
              <h3 className="max-w-4xl break-words text-2xl font-semibold leading-8 text-[var(--theme-text)]">
                {packet.item.title}
              </h3>
            </div>
            <button
              type="button"
              onClick={onOpen}
              className="h-10 shrink-0 rounded-lg border border-[var(--theme-border)] px-3 text-xs font-semibold text-[var(--theme-muted)] transition hover:bg-[var(--theme-card)]"
            >
              Open brief
            </button>
          </div>

          <div className="rounded-lg border border-accent-500/30 bg-[var(--theme-accent)]/[0.08] p-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--theme-muted)]">
              Current job
            </p>
            <p className="mt-2 text-lg font-semibold leading-7 text-[var(--theme-text)]">{workflow.currentTask}</p>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--theme-muted)]">{workflow.operatorRule}</p>
          </div>

          <LeadStageTracker workflow={workflow} />

          <div className="grid gap-3 lg:grid-cols-4">
            <CommandTile title="Client Inputs">
              <div className="flex flex-wrap gap-1.5">
                {command.missing.map((item) => (
                  <Badge key={item}>{item}</Badge>
                ))}
              </div>
            </CommandTile>
            <CommandTile title="Invoice / Pay">
              <p className="text-sm leading-6 text-[var(--theme-muted)]">{workflow.invoiceState}</p>
              <p className="mt-1 text-xs leading-5 text-[var(--theme-muted)]">{workflow.paymentState}</p>
            </CommandTile>
            <CommandTile title="Robert Brief">
              <p className="text-sm leading-6 text-[var(--theme-muted)]">{workflow.briefState}</p>
            </CommandTile>
            <CommandTile title="Done Rule">
              <p className="text-sm leading-6 text-[var(--theme-muted)]">{workflow.doneRule}</p>
            </CommandTile>
          </div>
        </div>

        <aside className="border-t border-[var(--theme-border)] bg-[var(--theme-card)] p-4 xl:border-l xl:border-t-0">
          <div className="space-y-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--theme-muted)]">
                Operator
              </p>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <StatusChip label="Robert" value="Intake + execute" />
                <StatusChip label="Asher" value="Client replies" />
                <StatusChip label="Sammy" value="Oversight" />
                <StatusChip label="Target" value={targetEmail} />
              </div>
            </div>

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--theme-muted)]">
                Send as
              </p>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {(['asher', 'robert', 'sam'] as Array<ReplySender>).map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => onSenderChange(option)}
                    className={cn(
                      'h-10 rounded-lg border px-2 text-xs font-semibold transition',
                      sender === option
                        ? 'border-accent-500/50 bg-[var(--theme-accent)]/[0.12] text-[var(--theme-accent)]'
                        : 'border-[var(--theme-border)] bg-[var(--theme-card)] text-[var(--theme-muted)] hover:border-accent-500/40',
                    )}
                  >
                    {senderShortName(option)}
                  </button>
                ))}
              </div>
              <p className="mt-2 text-xs leading-5 text-[var(--theme-muted)]">
                Default is Asher. Switch only when Robert or Sammy should be the visible sender.
              </p>
            </div>

            <div className="rounded-lg border border-[var(--theme-border)] bg-[var(--theme-card2)] p-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--theme-muted)]">
                Guardrail
              </p>
              <p className="mt-2 text-xs leading-5 text-[var(--theme-muted)]">{command.proofNote}</p>
            </div>

            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={onSend}
                disabled={sendBlocked || sendState?.status === 'sending'}
                className={cn(
                  'h-11 rounded-lg px-3 text-sm font-semibold transition',
                  sendBlocked
                    ? 'bg-[var(--theme-card2)] text-[var(--theme-muted)]'
                    : sendState?.status === 'sent'
                      ? 'bg-emerald-500 text-white hover:opacity-90'
                      : 'bg-[var(--theme-accent)] text-white hover:opacity-90',
                )}
              >
                {sendBlocked
                  ? 'Verify first'
                  : sendState?.status === 'sending'
                    ? 'Sending...'
                    : sendState?.status === 'sent'
                      ? 'Sent'
                      : `Send as ${senderShortName(sender)}`}
              </button>
              <button
                type="button"
                onClick={onCopy}
                className="h-11 rounded-lg border border-[var(--theme-border)] px-3 text-sm font-semibold text-[var(--theme-muted)] transition hover:bg-[var(--theme-card2)]"
              >
                {copied ? 'Copied' : 'Copy draft'}
              </button>
            </div>

            {sendState?.message ? (
              <p
                className={cn(
                  'text-xs leading-5',
                  sendState.status === 'error'
                    ? 'text-[var(--theme-danger)]'
                    : sendState.status === 'sent'
                      ? 'text-[var(--theme-success)]'
                      : 'text-[var(--theme-muted)]',
                )}
              >
                {sendState.message}
              </p>
            ) : null}
          </div>
        </aside>
      </div>
    </article>
  )
}

function buildCollabWorkflow(packet: LeadReplyPacket): CollabWorkflow {
  const operatorInThread = threadParticipants(packet.signal).some((email) =>
    ['asherunaligned@gmail.com', 'unalignedx@gmail.com'].includes(email),
  )

  if (packet.status === 'money-admin') {
    return {
      stageIndex: 3,
      stageLabel: 'Invoice / payment',
      currentTask: 'Verify whether the invoice is paid, waiting, or missing proof.',
      operatorRule:
        'Do not move this to done and do not ask the client for money until the payment record is clean.',
      invoiceState: 'Invoice/admin item needs matching against source records.',
      paymentState: 'Payment is not cleared in this system yet.',
      briefState: 'Robert brief waits until payment status and deliverables are clear.',
      doneRule: 'Done only after execution is complete and payment is cleared or explicitly marked waiting.',
    }
  }

  if (packet.status === 'waiting-them') {
    return {
      stageIndex: 2,
      stageLabel: 'Client work',
      currentTask: 'Wait for the client response; nudge only if the deal is going cold.',
      operatorRule:
        'Asher keeps the thread moving. Sammy watches for risk. Robert stays out until there is a tight brief.',
      invoiceState: 'Invoice is not the active gate unless the client already accepted terms.',
      paymentState: 'Payment not cleared yet.',
      briefState: 'Brief is drafted only after scope, timing, deliverables, and money are understood.',
      doneRule: 'Done requires agreed work, Robert-ready brief, execution, and payment status.',
    }
  }

  if (packet.status === 'needs-robert') {
    return {
      stageIndex: operatorInThread ? 2 : 1,
      stageLabel: operatorInThread ? 'Client work' : 'Team intro',
      currentTask: operatorInThread
        ? 'Asher gets the deal facts before Robert sees anything.'
        : 'Robert brings in Asher and Sammy, then Asher takes over the client thread.',
      operatorRule:
        'Robert is the source of the lead and final executor. Asher handles the back-and-forth. Sammy is oversight.',
      invoiceState: 'Invoice comes after package, scope, deliverables, and timing are agreed.',
      paymentState: 'Payment is not cleared yet.',
      briefState: 'Create or rewrite the company brief into a 60-second Robert brief before execution.',
      doneRule: 'Done means Robert has executed, brief is stored, and payment is cleared or tracked.',
    }
  }

  return {
    stageIndex: operatorInThread ? 2 : 1,
    stageLabel: operatorInThread ? 'Client work' : 'Team intro',
    currentTask: operatorInThread
      ? 'Asher works the client toward a package, deliverables, timing, and payment path.'
      : 'Bring Asher into the thread and let him start the client work.',
    operatorRule:
      'Asher replies first and owns the grunt work. Sammy watches for issues. Robert gets the brief later.',
    invoiceState: 'Invoice not ready until deal terms are confirmed.',
    paymentState: 'Payment is not cleared yet.',
    briefState: 'No Robert brief until the objective, deliverables, and payment state are clear.',
    doneRule: 'Done requires deal terms, invoice/payment status, 60-second brief, and execution.',
  }
}

function LeadStageTracker({ workflow }: { workflow: CollabWorkflow }) {
  const stages = [
    'Robert contacted',
    'Team intro',
    'Client work',
    'Invoice/pay',
    '60-sec brief',
    'Done',
  ]
  const activeIndex = workflow.stageIndex

  return (
    <div className="rounded-lg border border-[var(--theme-border)] bg-[var(--theme-card)] p-4">
      <div className="flex items-center justify-between gap-2">
        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--theme-muted)]">
          Deal Path
        </p>
        <Badge>{workflow.stageLabel}</Badge>
      </div>
      <div className="mt-4 grid grid-cols-6 gap-2">
        {stages.map((stage, index) => (
          <div key={stage} className="min-w-0">
            <div
              className={cn(
                'h-1.5 rounded-full',
                index <= activeIndex ? 'bg-[var(--theme-accent)]' : 'bg-[var(--theme-card2)]',
              )}
            />
            <p
              className={cn(
                'mt-2 truncate text-[11px] font-semibold',
                index === activeIndex ? 'text-[var(--theme-text)]' : 'text-[var(--theme-muted)]',
              )}
            >
              {stage}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

function CommandTile({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-lg border border-[var(--theme-border)] bg-[var(--theme-card)] p-3">
      <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--theme-muted)]">
        {title}
      </p>
      <div className="mt-2">{children}</div>
    </div>
  )
}

function StatusChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 rounded-lg border border-[var(--theme-border)] bg-[var(--theme-card)] p-2">
      <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--theme-muted)]">
        {label}
      </p>
      <p className="mt-1 truncate text-xs font-semibold text-[var(--theme-muted)]">{value}</p>
    </div>
  )
}

function LeadPacketRail({
  packets,
  activePacketId,
  onActivePacketChange,
  onFocusChange,
}: {
  packets: Array<LeadReplyPacket>
  activePacketId: string | null
  onActivePacketChange: (id: string) => void
  onFocusChange: (item: TodayQueueItem) => void
}) {
  if (!packets.length) return null

  return (
    <section className="rounded-lg border border-[var(--theme-border)] bg-[var(--theme-card)] p-3">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <HugeiconsIcon icon={Rocket01Icon} size={18} strokeWidth={1.7} className="text-[var(--theme-accent)]" />
          <h2 className="text-sm font-semibold text-[var(--theme-text)]">Lead Queue</h2>
        </div>
        <Badge>{packets.length}</Badge>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {packets.map((packet) => (
          <button
          key={packet.item.id}
          type="button"
          onClick={() => {
            onActivePacketChange(packet.item.id)
            onFocusChange(packet.item)
          }}
            className={cn(
              'min-w-[220px] rounded-lg border p-3 text-left transition hover:border-accent-500/50',
              activePacketId === packet.item.id
                ? 'border-accent-500/45 bg-[var(--theme-accent)]/[0.08]'
                : 'border-[var(--theme-border)] bg-[var(--theme-card2)]',
            )}
          >
            <div className="flex items-start justify-between gap-2">
              <p className="min-w-0 break-words text-sm font-semibold leading-5 text-[var(--theme-text)]">
                {packet.item.title}
              </p>
              <PriorityBadge priority={packet.item.priority} />
            </div>
            <p className="mt-2 line-clamp-2 text-xs leading-5 text-[var(--theme-muted)]">
              {shortenText(packet.nextMove, 100)}
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              <Badge>{packet.status === 'money-admin' ? 'verify first' : 'Asher'}</Badge>
              <Badge>{replyStatusLabel(packet.status)}</Badge>
            </div>
          </button>
        ))}
      </div>
    </section>
  )
}

function WorkspaceRail({
  activeTab,
  onTabChange,
  packets,
  activePacketId,
  onActivePacketChange,
  onFocusChange,
  queue,
  calendar,
}: {
  activeTab: WorkspaceTab
  onTabChange: (tab: WorkspaceTab) => void
  packets: Array<LeadReplyPacket>
  activePacketId: string | null
  onActivePacketChange: (id: string) => void
  onFocusChange: (item: TodayQueueItem) => void
  queue: Array<TodayQueueItem>
  calendar: Array<RobertCalendarBlock>
}) {
  return (
    <aside className="space-y-3 xl:sticky xl:top-24 xl:max-h-[calc(100vh-120px)] xl:overflow-hidden">
      <section className="rounded-lg border border-[var(--theme-border)] bg-[var(--theme-card)] p-3">
        <div className="flex gap-2">
          <TabPill
            active={activeTab === 'queue'}
            icon={Rocket01Icon}
            label="Queue"
            onClick={() => onTabChange('queue')}
          />
          <TabPill
            active={activeTab === 'calendar'}
            icon={Calendar01Icon}
            label="Calendar"
            onClick={() => onTabChange('calendar')}
          />
        </div>
      </section>

      {activeTab === 'queue' ? (
        <section className="rounded-lg border border-[var(--theme-border)] bg-[var(--theme-card)] p-3 xl:max-h-[calc(100vh-190px)] xl:overflow-hidden">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <HugeiconsIcon icon={Rocket01Icon} size={18} strokeWidth={1.7} className="text-[var(--theme-accent)]" />
              <h2 className="text-sm font-semibold text-[var(--theme-text)]">Next Leads</h2>
            </div>
            <Badge>{packets.length}</Badge>
          </div>
          <div className="space-y-2 xl:max-h-[calc(100vh-250px)] xl:overflow-y-auto xl:pr-1">
            {packets.map((packet) => {
              const workflow = buildCollabWorkflow(packet)
              return (
                <button
                  key={packet.item.id}
                  type="button"
                  onClick={() => {
                    onActivePacketChange(packet.item.id)
                    onFocusChange(packet.item)
                  }}
                  className={cn(
                    'w-full rounded-lg border p-2.5 text-left transition hover:border-accent-500/50',
                    activePacketId === packet.item.id
                      ? 'border-accent-500/45 bg-[var(--theme-accent)]/[0.08]'
                      : 'border-[var(--theme-border)] bg-[var(--theme-card2)]',
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="line-clamp-2 min-w-0 break-words text-xs font-semibold leading-5 text-[var(--theme-text)]">
                        {packet.item.title}
                      </p>
                      <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--theme-muted)]">
                        {workflow.stageLabel}
                      </p>
                    </div>
                    <PriorityBadge priority={packet.item.priority} />
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    <Badge>{packet.status === 'money-admin' ? 'verify first' : 'Asher'}</Badge>
                    <Badge>{workflow.stageIndex + 1}/6</Badge>
                  </div>
                </button>
              )
            })}
            {!packets.length ? (
              <p className="rounded-lg border border-[var(--theme-border)] bg-[var(--theme-card2)] p-3 text-sm leading-6 text-[var(--theme-muted)]">
                No lead packets are cached yet.
              </p>
            ) : null}
          </div>
        </section>
      ) : (
        <RobertCalendarPanel
          calendar={calendar}
          queue={queue}
          packets={packets}
          onSelectItem={(item) => {
            onFocusChange(item)
            const packetId = findLeadReplyPacketId(item, packets)
            if (packetId) onActivePacketChange(packetId)
          }}
        />
      )}
    </aside>
  )
}

function TabPill({
  active,
  icon,
  label,
  onClick,
}: {
  active: boolean
  icon: typeof Rocket01Icon
  label: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex h-9 flex-1 items-center justify-center gap-2 rounded-lg border px-3 text-xs font-semibold transition',
        active
          ? 'border-accent-500/50 bg-[var(--theme-accent)]/15 text-[var(--theme-accent)]'
          : 'border-[var(--theme-border)] bg-[var(--theme-card2)] text-[var(--theme-muted)] hover:border-accent-500/40',
      )}
    >
      <HugeiconsIcon icon={icon} size={16} strokeWidth={1.7} />
      <span className="truncate">{label}</span>
    </button>
  )
}

type RobertCalendarBlock = {
  id: string
  timeLabel: string
  title: string
  detail: string
  badges: Array<string>
  item: TodayQueueItem
}

function buildRobertCalendarAgenda(
  packets: Array<LeadReplyPacket>,
  queue: Array<TodayQueueItem>,
): Array<RobertCalendarBlock> {
  const queueById = new Map(queue.map((item) => [item.id, item]))
  const agenda: Array<{ key: string; title: string; detail: string; badges: Array<string>; item: TodayQueueItem }> = []

  for (const packet of packets) {
    if (packet.status !== 'needs-robert' && packet.owner !== 'Robert') continue
    agenda.push({
      key: `packet-${packet.item.id}`,
      title: packet.item.title,
      detail: shortenText(packet.nextMove, 110),
      badges: [packet.owner, replyStatusLabel(packet.status), packet.urgency],
      item: packet.item,
    })
  }

  for (const item of queue) {
    if (!/robert/i.test(`${item.title} ${item.detail} ${item.lane} ${item.action}`)) continue
    if (queueById.has(item.id) && agenda.some((entry) => entry.item.id === item.id)) continue
    agenda.push({
      key: `queue-${item.id}`,
      title: item.title,
      detail: shortenText(item.action, 110),
      badges: [item.lane, item.priority.toUpperCase()],
      item,
    })
  }

  const slots = ['9:00 AM', '10:30 AM', '12:00 PM', '1:30 PM', '3:00 PM', '4:30 PM']

  return agenda.slice(0, 6).map((entry, index) => ({
    id: entry.key,
    timeLabel: slots[index] || `Slot ${index + 1}`,
    title: entry.title,
    detail: entry.detail,
    badges: entry.badges,
    item: entry.item,
  }))
}

function RobertCalendarPanel({
  calendar,
  queue,
  packets,
  onSelectItem,
}: {
  calendar: Array<RobertCalendarBlock>
  queue: Array<TodayQueueItem>
  packets: Array<LeadReplyPacket>
  onSelectItem: (item: TodayQueueItem) => void
}) {
  const robertCount = calendar.length
  const robertPacketCount = packets.filter(
    (packet) => packet.status === 'needs-robert' || packet.owner === 'Robert',
  ).length
  const totalQueueCount = queue.filter((item) => /robert/i.test(`${item.title} ${item.detail} ${item.lane} ${item.action}`)).length

  return (
    <section className="rounded-lg border border-[var(--theme-border)] bg-[var(--theme-card)] p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <HugeiconsIcon icon={Calendar01Icon} size={18} strokeWidth={1.7} className="text-[var(--theme-accent)]" />
          <h2 className="text-sm font-semibold text-[var(--theme-text)]">Robert Calendar</h2>
        </div>
        <Badge>{robertCount || robertPacketCount || totalQueueCount} items</Badge>
      </div>
      <p className="mb-4 text-sm leading-6 text-[var(--theme-muted)]">
        This tab follows the items that need Robert&apos;s attention so you can scan his day without pulling it into the main reply desk.
      </p>
      <div className="space-y-2">
        {calendar.length ? (
          calendar.map((entry) => (
            <button
              key={entry.id}
              type="button"
              onClick={() => onSelectItem(entry.item)}
              className="w-full rounded-lg border border-[var(--theme-border)] bg-[var(--theme-card2)] p-3 text-left transition hover:border-accent-500/50 hover:bg-[var(--theme-card)]"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--theme-muted)]">
                    {entry.timeLabel}
                  </p>
                  <p className="mt-1 break-words text-sm font-semibold leading-5 text-[var(--theme-text)]">
                    {entry.title}
                  </p>
                </div>
                <PriorityBadge priority={entry.item.priority} />
              </div>
              <p className="mt-2 text-xs leading-5 text-[var(--theme-muted)]">{entry.detail}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {entry.badges.map((badge) => (
                  <Badge key={`${entry.id}-${badge}`}>{badge}</Badge>
                ))}
              </div>
            </button>
          ))
        ) : (
          <div className="rounded-lg border border-[var(--theme-border)] bg-[var(--theme-card2)] p-4 text-sm leading-6 text-[var(--theme-muted)]">
            No Robert-specific blocks are cached yet. Once the calendar feed is wired in, this panel will show his day here.
          </div>
        )}
      </div>
    </section>
  )
}

function replyStatusLabel(status: LeadReplyPacket['status']): string {
  if (status === 'needs-us') return 'needs us'
  if (status === 'needs-robert') return 'needs Robert'
  if (status === 'waiting-them') return 'waiting them'
  return 'money/admin'
}

function QueueItemButton({
  item,
  onSelect,
  compact = false,
}: {
  item: TodayQueueItem
  onSelect: (item: TodayQueueItem) => void
  compact?: boolean
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(item)}
      className={cn(
        'w-full rounded-lg border text-left transition hover:border-accent-500/60 hover:bg-[var(--theme-card)]',
        compact ? 'p-3' : 'p-3',
        item.priority === 'p0'
          ? 'border-red-500/30 bg-red-500/[0.06]'
          : 'border-[var(--theme-border)] bg-[var(--theme-card2)]',
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="min-w-0 break-words text-sm font-semibold leading-5 text-[var(--theme-text)]">
          {item.title}
        </p>
        <PriorityBadge priority={item.priority} />
      </div>
      <p className="mt-2 line-clamp-2 text-xs leading-5 text-[var(--theme-muted)]">{item.detail}</p>
      <div className="mt-3">
        <Badge>{item.lane}</Badge>
      </div>
    </button>
  )
}

function FocusPanel({
  item,
  onOpen,
}: {
  item: TodayQueueItem | null | undefined
  onOpen: (item: TodayQueueItem) => void
}) {
  if (!item) {
    return (
      <section className="min-w-0 rounded-lg border border-[var(--theme-border)] bg-[var(--theme-card)] p-6">
        <p className="text-sm text-[var(--theme-muted)]">No active packet selected.</p>
      </section>
    )
  }

  return (
    <section className="min-w-0 rounded-lg border border-[var(--theme-border)] bg-[var(--theme-card)] p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <div className="mb-3 flex flex-wrap gap-2">
            <PriorityBadge priority={item.priority} />
            <Badge>{item.lane}</Badge>
          </div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--theme-muted)]">
            Focus Packet
          </p>
          <h2 className="mt-2 max-w-3xl break-words text-3xl font-semibold leading-tight text-[var(--theme-text)]">
            {item.title}
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-6 text-[var(--theme-muted)]">
            {shortenText(item.detail, 180)}
          </p>
        </div>
        <button
          type="button"
          onClick={() => onOpen(item)}
          className="inline-flex h-11 shrink-0 items-center justify-center rounded-lg bg-[var(--theme-accent)] px-5 text-sm font-semibold text-white transition hover:opacity-90"
        >
          Open packet
        </button>
      </div>

      <div className="mt-6 rounded-lg border border-accent-500/25 bg-[var(--theme-accent)]/[0.08] p-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--theme-muted)]">
          Recommended next move
        </p>
        <p className="mt-2 text-sm leading-6 text-[var(--theme-muted)]">{item.action}</p>
      </div>

      <div className="mt-4 rounded-lg border border-[var(--theme-border)] bg-[var(--theme-card)] p-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--theme-muted)]">
          Context
        </p>
        <p className="mt-2 text-sm leading-6 text-[var(--theme-muted)]">
          {item.id === 'review-outstanding-invoices'
            ? 'This is a finance review packet. Open the packet for the invoice list and any follow-up draft.'
            : item.id === 'find-payment-proof'
              ? 'This is a proof check packet. Open the packet to inspect the invoice evidence.'
              : shortenText(item.detail, 120)}
        </p>
      </div>

    </section>
  )
}

function QueueDetailDrawer({
  item,
  live,
  onClose,
}: {
  item: TodayQueueItem
  live: CompanyOsLiveOps
  onClose: () => void
}) {
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState<PacketTab>('summary')
  const invoices =
    item.id === 'review-outstanding-invoices'
      ? live.invoices.filter((invoice) => invoice.status === 'outstanding')
      : item.id === 'find-payment-proof'
        ? live.invoices.filter((invoice) => invoice.status === 'needs-proof')
        : []
  const lead = [...live.supabase.hotLeads, ...live.supabase.invoiceLeads].find(
    (candidate) => item.id.endsWith(String(candidate.id)),
  )
  const kanbanAction = live.supabase.kanbanActions.find(
    (candidate) =>
      item.id === `kanban-action-${candidate.id}` ||
      item.id === `lead-follow-up-${candidate.id}`,
  )
  const matchedAssets = kanbanAction
    ? live.assets.filter((asset) => kanbanAction.assetIds.includes(asset.id))
    : packetDomain(item) === 'sales'
      ? live.assets.filter(
        (asset) => asset.id === 'partnership-packages' || asset.kind === 'pricing',
      )
      : []
  const signal = [...live.emailSignals, ...live.driveSignals].find(
    (candidate) => item.title === (candidate.subject || candidate.title),
  )
  const reviewPrompt = buildReviewPrompt(
    item,
    invoices,
    lead,
    signal,
    kanbanAction,
    matchedAssets,
  )
  const draftText = buildPacketDraft(item, invoices, lead, signal, kanbanAction, matchedAssets)
  const packetReview = useMemo(
    () => buildPacketReview(item, invoices, lead, signal, kanbanAction, matchedAssets),
    [item, invoices, lead, signal, kanbanAction, matchedAssets],
  )

  async function copyReviewPrompt() {
    await navigator.clipboard?.writeText(reviewPrompt)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/45">
      <button
        type="button"
        aria-label="Close queue detail"
        className="hidden flex-1 md:block"
        onClick={onClose}
      />
      <aside className="flex h-full w-full max-w-[860px] flex-col border-l border-[var(--theme-border)] bg-[var(--theme-bg)] shadow-2xl">
        <header className="border-b border-[var(--theme-border)] p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="mb-2 flex flex-wrap gap-2">
                <Badge>{item.lane}</Badge>
                <PriorityBadge priority={item.priority} />
              </div>
              <h2 className="break-words text-xl font-semibold leading-7 text-[var(--theme-text)]">
                {item.title}
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-[var(--theme-border)] px-3 py-1.5 text-sm text-[var(--theme-muted)] transition hover:bg-[var(--theme-card)]"
            >
              Close
            </button>
          </div>
          <p className="mt-3 text-sm leading-6 text-[var(--theme-muted)]">{packetReview.dealQuestion}</p>
          <PacketTabs active={activeTab} onChange={setActiveTab} />
        </header>

        <div className="flex-1 space-y-4 overflow-y-auto p-5">
          {activeTab === 'summary' ? (
            <PacketGeneratedReview
              item={item}
              review={packetReview}
              kanbanAction={kanbanAction}
            />
          ) : null}
          {activeTab === 'thread' ? (
            <PacketThread signal={signal} />
          ) : null}
          {activeTab === 'draft' ? (
            <PacketDraft
              draftText={packetReview?.draftMessage || draftText}
              onCopy={() => void navigator.clipboard?.writeText(packetReview?.draftMessage || draftText)}
            />
          ) : null}
          {activeTab === 'assets' ? (
            <PacketAssets assets={matchedAssets} />
          ) : null}
          {activeTab === 'actions' ? (
            <PacketApproval
              copied={copied}
              review={packetReview}
              onCopyReviewPrompt={() => void copyReviewPrompt()}
              onCopyTitle={() => void navigator.clipboard?.writeText(item.title)}
            />
          ) : null}
        </div>
      </aside>
    </div>
  )
}

function PacketTabs({
  active,
  onChange,
}: {
  active: PacketTab
  onChange: (tab: PacketTab) => void
}) {
  const tabs: Array<{ id: PacketTab; label: string }> = [
    { id: 'summary', label: 'Summary' },
    { id: 'thread', label: 'Thread' },
    { id: 'draft', label: 'Draft' },
    { id: 'assets', label: 'Assets' },
    { id: 'actions', label: 'Actions' },
  ]

  return (
    <div className="mt-4 flex gap-1 overflow-x-auto rounded-lg border border-[var(--theme-border)] bg-[var(--theme-card)] p-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onChange(tab.id)}
          className={cn(
            'h-8 shrink-0 rounded-md px-3 text-xs font-semibold transition',
            active === tab.id
              ? 'bg-[var(--theme-accent)] text-white'
              : 'text-[var(--theme-muted)] hover:bg-[var(--theme-card2)]',
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}

function PacketGeneratedReview({
  item,
  review,
  kanbanAction,
}: {
  item: TodayQueueItem
  review: PacketReview
  kanbanAction?: CompanyOsKanbanAction
}) {
  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
      <div className="space-y-4">
        <DetailBlock title="Deal Brief">
          <div className="rounded-lg border border-accent-500/25 bg-[var(--theme-accent)]/[0.08] p-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--theme-muted)]">
              Objective
            </p>
            <p className="mt-2 text-sm leading-6 text-[var(--theme-muted)]">{review.dealQuestion}</p>
            <p className="mt-3 text-sm leading-6 text-[var(--theme-muted)]">{review.status}</p>
          </div>
        </DetailBlock>
        <DetailBlock title="Deal Path">
          <div className="space-y-2">
            {review.dealSteps.map((step, index) => (
              <div
                key={`${step}-${index}`}
                className="flex gap-3 rounded-lg border border-[var(--theme-border)] bg-[var(--theme-card)] p-3"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[var(--theme-accent)]/15 text-xs font-semibold text-[var(--theme-accent)]">
                  {index + 1}
                </span>
                <p className="text-sm leading-6 text-[var(--theme-muted)]">{step}</p>
              </div>
            ))}
          </div>
        </DetailBlock>
      </div>
      <DetailBlock title="Operator Brief">
        <div className="space-y-3 rounded-lg border border-[var(--theme-border)] bg-[var(--theme-card)] p-4">
          <StatusRow label="Operator" value={review.operator === 'Internal' ? 'Verify first' : 'Asher'} />
          <StatusRow label="Priority" value={item.priority.toUpperCase()} />
          <StatusRow label="Stage" value={kanbanAction?.stage || 'Needs review'} />
          <StatusRow label="Draft" value={kanbanAction?.draftStatus || 'Not prepared'} />
          <div className="rounded-lg border border-[var(--theme-border)] bg-[var(--theme-card2)] p-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--theme-muted)]">
              Robert sees this when
            </p>
            <p className="mt-2 text-xs leading-5 text-[var(--theme-muted)]">{review.robertBrief}</p>
          </div>
          <details className="rounded-lg border border-[var(--theme-border)] bg-[var(--theme-card2)] p-3">
            <summary className="cursor-pointer list-none text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--theme-muted)]">
              Evidence and risk
            </summary>
            <div className="mt-3 space-y-3">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--theme-muted)]">
                  Evidence
                </p>
                <div className="mt-2">
                  <BulletList items={review.evidence} />
                </div>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--theme-muted)]">
                  Risks
                </p>
                <div className="mt-2">
                  <BulletList items={review.risks} tone="warning" />
                </div>
              </div>
            </div>
          </details>
        </div>
      </DetailBlock>
    </div>
  )
}

function PacketThread({ signal }: { signal?: CompanyOsSignal }) {
  const thread = signal?.thread
  const messages = thread?.messages || []
  const visibleMessages = messages.slice(-2).reverse()

  if (!messages.length) {
    return (
      <div className="rounded-lg border border-[var(--theme-border)] bg-[var(--theme-card)] p-5">
        <p className="text-sm font-semibold text-[var(--theme-text)]">No email chain cached yet.</p>
        <p className="mt-2 text-sm leading-6 text-[var(--theme-muted)]">
          This packet has a signal, but the actual Gmail messages have not been
          saved into the local snapshot yet.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <DetailBlock title="Thread Status">
        <div className="rounded-lg border border-accent-500/25 bg-[var(--theme-accent)]/[0.08] p-4">
          <p className="text-sm font-semibold text-[var(--theme-text)]">{thread.status}</p>
          <p className="mt-2 text-sm leading-6 text-[var(--theme-muted)]">{thread.latestAction}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <Badge>Latest {visibleMessages.length} of {messages.length}</Badge>
          </div>
          {signal.gmailUrl ? (
            <a
              href={signal.gmailUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex rounded-lg border border-accent-500/35 px-3 py-1.5 text-xs font-semibold text-[var(--theme-accent)] transition hover:bg-[var(--theme-accent)]/10"
            >
              Open in Gmail
            </a>
          ) : null}
        </div>
      </DetailBlock>
      <DetailBlock title="Email Chain">
        <div className="space-y-3">
          {visibleMessages.map((message) => (
            <article
              key={message.id}
              className="rounded-lg border border-[var(--theme-border)] bg-[var(--theme-card)] p-4"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <p className="break-words text-sm font-semibold text-[var(--theme-text)]">{message.from}</p>
                  <p className="mt-1 break-words text-xs text-[var(--theme-muted)]">
                    {message.subject || signal.subject || signal.title || 'Email message'}
                  </p>
                </div>
                {message.timestamp ? (
                  <Badge>{formatTimestamp(message.timestamp)}</Badge>
                ) : null}
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {message.to?.length ? <Badge>To {message.to.length}</Badge> : null}
                {message.cc?.length ? <Badge>Cc {message.cc.length}</Badge> : null}
                {message.attachments?.length ? <Badge>{message.attachments.length} files</Badge> : null}
              </div>
              <details className="mt-3 rounded-lg border border-[var(--theme-border)] bg-[var(--theme-card2)] p-3">
                <summary className="cursor-pointer list-none text-xs font-semibold uppercase tracking-[0.12em] text-[var(--theme-muted)]">
                  Message preview · {shortenText(message.body, 70)}
                </summary>
                <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-[var(--theme-muted)]">
                  {shortenText(message.body, 200)}
                </p>
                {message.attachments?.length ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {message.attachments.map((attachment) => (
                      <Badge key={attachment}>{attachment}</Badge>
                    ))}
                  </div>
                ) : null}
              </details>
            </article>
          ))}
        </div>
      </DetailBlock>
    </div>
  )
}

function PacketDraft({
  draftText,
  onCopy,
}: {
  draftText: string
  onCopy: () => void
}) {
  const [copiedDraft, setCopiedDraft] = useState(false)
  const draft = splitDraftPreview(draftText)

  function copyDraft() {
    onCopy()
    setCopiedDraft(true)
    window.setTimeout(() => setCopiedDraft(false), 1400)
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_240px]">
      <DetailBlock title={draft.blocked ? 'Operator Note' : 'Customer Draft'}>
        <div className="space-y-3">
          {draft.subject ? (
            <div className="rounded-lg border border-[var(--theme-border)] bg-[var(--theme-card)] p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--theme-muted)]">
                Subject
              </p>
              <p className="mt-2 break-words text-sm font-semibold leading-5 text-[var(--theme-text)]">
                {draft.subject}
              </p>
            </div>
          ) : null}
          <div className="max-h-[520px] overflow-y-auto whitespace-pre-wrap rounded-lg border border-[var(--theme-border)] bg-[var(--theme-card)] p-4 text-sm leading-6 text-[var(--theme-muted)]">
            {draft.body}
          </div>
        </div>
      </DetailBlock>
      <DetailBlock title="Draft Controls">
        <div className="space-y-3 rounded-lg border border-[var(--theme-border)] bg-[var(--theme-card)] p-4">
          <button
            type="button"
            onClick={copyDraft}
            className="w-full rounded-lg bg-[var(--theme-accent)] px-3 py-2 text-sm font-semibold text-white transition hover:opacity-90"
          >
            {copiedDraft ? 'Copied' : draft.blocked ? 'Copy note' : 'Copy customer draft'}
          </button>
          <p className="text-xs leading-5 text-[var(--theme-muted)]">
            Clean preview only. It does not send email or update any system.
          </p>
        </div>
      </DetailBlock>
    </div>
  )
}

function splitDraftPreview(text: string): { subject: string; body: string; blocked: boolean } {
  const lines = text.trim().split('\n')
  const subjectLine = lines[0]?.match(/^Subject:\s*(.+)$/i)
  const subject = subjectLine?.[1]?.trim() || ''
  const body = subject ? lines.slice(1).join('\n').trim() : text.trim()
  const blocked = /^(Payment verification required|Robert brief:|Action packet:)/i.test(text.trim())

  return { subject, body, blocked }
}

function PacketAssets({ assets }: { assets: Array<CompanyOsAsset> }) {
  if (!assets.length) {
    return <p className="text-sm text-[var(--theme-muted)]">No matched assets for this packet.</p>
  }

  return (
    <div className="grid gap-3 md:grid-cols-2">
      {assets.map((asset) => (
        <div
          key={asset.id}
          className="rounded-lg border border-[var(--theme-border)] bg-[var(--theme-card)] p-4"
        >
          <div className="flex items-start justify-between gap-2">
            <p className="break-words text-sm font-semibold text-[var(--theme-text)]">{asset.title}</p>
            <Badge>{asset.kind}</Badge>
          </div>
          <p className="mt-2 text-xs leading-5 text-[var(--theme-muted)]">{asset.note}</p>
          <p className="mt-3 break-words rounded-md bg-[var(--theme-card2)] px-2 py-1.5 text-[11px] leading-5 text-[var(--theme-muted)]">
            {asset.file}
          </p>
          <button
            type="button"
            onClick={() => void navigator.clipboard?.writeText(asset.path)}
            className="mt-3 rounded-lg border border-[var(--theme-border)] px-3 py-1.5 text-xs font-semibold text-[var(--theme-muted)] transition hover:bg-[var(--theme-card2)]"
          >
            Copy file path
          </button>
        </div>
      ))}
    </div>
  )
}

function PacketApproval({
  copied,
  review,
  onCopyReviewPrompt,
  onCopyTitle,
}: {
  copied: boolean
  review: PacketReview
  onCopyReviewPrompt: () => void
  onCopyTitle: () => void
}) {
  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_240px]">
      <DetailBlock title="Actions State">
        <div className="rounded-lg border border-amber-500/25 bg-amber-500/[0.06] p-4">
          <p className="text-sm font-semibold text-[var(--theme-text)]">Needs human approval</p>
          <p className="mt-2 text-sm leading-6 text-[var(--theme-muted)]">
            Drafts and context are ready. Human approval still gates sending or record changes.
          </p>
        </div>
      </DetailBlock>
      <DetailBlock title="Safe Actions">
        <div className="space-y-2 rounded-lg border border-[var(--theme-border)] bg-[var(--theme-card)] p-4">
          <button
            type="button"
            onClick={onCopyReviewPrompt}
            className="w-full rounded-lg bg-[var(--theme-accent)] px-3 py-2 text-sm font-semibold text-white transition hover:opacity-90"
          >
            {copied ? 'Brief copied' : 'Copy execution brief'}
          </button>
          <button
            type="button"
            onClick={onCopyTitle}
            className="w-full rounded-lg border border-[var(--theme-border)] px-3 py-2 text-sm font-semibold text-[var(--theme-muted)] transition hover:bg-[var(--theme-card2)]"
          >
            Copy title
          </button>
        </div>
      </DetailBlock>
      <DetailBlock title="Checklist">
        <BulletList items={review.checklist} />
      </DetailBlock>
    </div>
  )
}

function StatusRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 text-sm">
      <span className="text-[var(--theme-muted)]">{label}</span>
      <span className="truncate font-semibold text-[var(--theme-text)]">{value}</span>
    </div>
  )
}

function formatTimestamp(value: string): string {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value

  return new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(date)
}

function shortenText(value: string, limit: number): string {
  const trimmed = value.replace(/\s+/g, ' ').trim()
  if (trimmed.length <= limit) return trimmed
  return `${trimmed.slice(0, Math.max(0, limit - 1)).trimEnd()}…`
}

function BulletList({
  items,
  tone = 'default',
}: {
  items: Array<string>
  tone?: 'default' | 'warning'
}) {
  if (!items.length) return <p className="text-sm text-[var(--theme-muted)]">Nothing flagged.</p>

  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div
          key={item}
          className={cn(
            'rounded-lg border p-3 text-sm leading-6',
            tone === 'warning'
              ? 'border-amber-500/25 bg-amber-500/[0.08] text-[var(--theme-warning)]'
              : 'border-[var(--theme-border)] bg-[var(--theme-card)] text-[var(--theme-muted)]',
          )}
        >
          {item}
        </div>
      ))}
    </div>
  )
}

function DetailBlock({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <section>
      <h3 className="mb-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--theme-muted)]">
        {title}
      </h3>
      {children}
    </section>
  )
}

function buildReviewPrompt(
  item: TodayQueueItem,
  invoices: Array<CompanyOsInvoice>,
  lead?: CompanyOsLead,
  signal?: CompanyOsSignal,
  kanbanAction?: CompanyOsKanbanAction,
  assets: Array<CompanyOsAsset> = [],
): string {
  const evidence = [
    ...invoices.map((invoice) => `- Invoice: ${invoice.file} (${invoice.status})`),
    lead
      ? `- Lead: ${lead.businessName || lead.title}; stage=${lead.listId || 'unknown'}; priority=${lead.priority || 'unknown'}`
      : '',
    signal ? `- Signal: ${signal.subject || signal.title}; ${shortenText(signal.summary, 140)}` : '',
    signal?.thread
      ? `- Email thread: ${signal.thread.status}; ${signal.thread.messages.length} messages; latest=${shortenText(signal.thread.latestAction, 100)}`
      : '',
    kanbanAction
      ? `- Kanban action: ${kanbanAction.businessName || kanbanAction.title}; lane=${kanbanAction.lane}; stage=${kanbanAction.stage || 'unknown'}`
      : '',
    ...assets.map((asset) => `- Matched asset: ${asset.title} (${asset.kind})`),
  ].filter(Boolean)

  return [
    `Review this Unaligned Company OS queue item: ${item.title}`,
    '',
    `Lane: ${item.lane}`,
    `Priority: ${item.priority.toUpperCase()}`,
    `Recommended action: ${item.action}`,
    '',
    'Evidence:',
    evidence.length ? evidence.join('\n') : '- No structured evidence attached.',
    '',
    'Return a concise review with status, risks, next action, and a short draft. Do not send email, edit invoices, spend money, or update Supabase without explicit approval.',
  ].join('\n')
}

function packetDomain(item: TodayQueueItem): 'money' | 'sales' | 'robert' | 'general' {
  const haystack = `${item.title} ${item.detail} ${item.lane} ${item.action}`.toLowerCase()
  if (/invoice|payment|paid|proof|money|finance/.test(haystack)) return 'money'
  if (/lead|sales|sponsor|rates|pricing|collab|collaboration/.test(haystack)) return 'sales'
  if (/robert|scoble/.test(haystack)) return 'robert'
  return 'general'
}

function buildPacketReview(
  item: TodayQueueItem,
  invoices: Array<CompanyOsInvoice>,
  lead?: CompanyOsLead,
  signal?: CompanyOsSignal,
  kanbanAction?: CompanyOsKanbanAction,
  assets: Array<CompanyOsAsset> = [],
): PacketReview {
  const evidence: Array<string> = []
  const risks: Array<string> = []
  const checklist: Array<string> = [
    'Confirm the latest email/thread context before external action.',
    'Confirm owner and next step before sending or updating records.',
  ]
  const domain = packetDomain(item)

  if (invoices.length) {
    evidence.push(`${invoices.length} invoice file${invoices.length === 1 ? '' : 's'} attached.`)
    checklist.push('Open the invoice file(s) and verify client, amount, date, and status.')
  }

  if (lead) {
    evidence.push(
      `Lead card: ${lead.businessName || lead.title}; stage=${lead.listId || 'unknown'}; priority=${lead.priority || 'unknown'}.`,
    )
  }

  if (kanbanAction) {
    evidence.push(
      `Kanban classified this as ${kanbanAction.lane}.`,
    )
    if (kanbanAction.stage) evidence.push(`Current stage: ${kanbanAction.stage}.`)
  }

  if (signal) {
    evidence.push(
      `Signal: ${signal.subject || signal.title || signal.kind}; ${shortenText(signal.needs || signal.summary, 140)}`,
    )
    if (signal.thread) {
      evidence.push(
        `Email thread: ${signal.thread.status}; ${signal.thread.messages.length} messages.`,
      )
      checklist.push('Read the Thread tab before using the draft externally.')
    }
  }

  if (assets.length) {
    evidence.push(`Matched assets: ${assets.map((asset) => asset.title).join(', ')}.`)
    checklist.push('Review matched assets before attaching or referencing them externally.')
  }

  const pricingAsset = assets.find((asset) => asset.id === 'partnership-packages')
  if (domain === 'sales') {
    checklist.push('Send the sponsorship pricing PDF before extra back-and-forth.')
    if (pricingAsset) {
      evidence.push(`Pricing asset ready: ${pricingAsset.title}.`)
    }
  }

  const haystack = `${item.title} ${item.detail} ${item.lane} ${item.action}`.toLowerCase()
  if (/invoice|payment|paid|proof|money|finance/.test(haystack)) {
    risks.push('Money-related item: verify status before marking paid or asking for payment.')
    if (!invoices.length) risks.push('No local invoice file is directly attached to this specific packet.')
    checklist.push('Confirm whether this is a payment follow-up, status check, or internal cleanup.')
  }

  if (/lead|sales|sponsor|rates/.test(haystack)) {
    risks.push('Sales item: confirm the offer before sending pricing or assets.')
    checklist.push('Confirm which Unaligned offer or package applies.')
  }

  if (/robert|scoble/.test(haystack)) {
    risks.push('Robert-related context may need an explicit handoff before messaging.')
    checklist.push('Confirm what Robert must approve; Asher still owns the reply.')
  }

  if (/draft|email|reply/.test(haystack)) {
    risks.push('Draft exists or email action is implied; treat generated copy as review-only.')
  }

  if (!risks.length) {
    risks.push('No blocking risk detected, but external actions still need approval.')
  }

  const status =
    domain === 'sales'
      ? 'Asher owns the deal motion: answer the lead, send the pricing PDF when relevant, collect the brief, then route Robert only at approval time. Sam reviews from oversight.'
      : domain === 'robert'
        ? 'Asher handles the middle. Sam provides oversight. Robert gets a short decision brief only when the collaboration is ready for his public action.'
        : item.priority === 'p0'
          ? 'High-priority operating item. Handle the blocker first, then move the deal or payment state forward.'
          : 'Operating item ready for the next concrete action.'

  const recommendedAction = kanbanAction?.recommendedAction || item.action
  const draftMessage = buildPacketDraft(item, invoices, lead, signal, kanbanAction, assets)
  const ask = signal ? leadAskLabel(signal) : domain === 'money' ? 'payment status' : 'next step'
  const latest = signal ? latestExternalMessage(signal) : null
  const operator = signal
    ? leadReplyOwner(signal, leadReplyStatus(signal))
    : domain === 'money'
      ? 'Internal'
      : 'Asher'
  const target = kanbanAction?.businessName || lead?.businessName || item.title
  const dealQuestion =
    domain === 'money'
      ? `Is ${target} already paid, waiting for payment, or blocked by missing proof?`
      : domain === 'sales'
        ? `Can ${target} become a paid sponsorship by confirming package, timing, deliverables, and payment path?`
        : domain === 'robert'
          ? `What exact public action does Robert need to approve, and can Asher finish the details before he sees it?`
          : `What single next action moves ${target} forward?`
  const dealSteps =
    domain === 'money'
      ? [
        'Verify invoice/payment proof before messaging.',
        'Mark paid, waiting, or blocked in the source record.',
        'Send one clean payment-status follow-up only after verification.',
      ]
      : domain === 'sales'
        ? [
          'Asher replies in the thread and keeps Robert out of the middle.',
          'Send or reference the sponsorship pricing PDF when pricing is part of the ask.',
          'Collect budget, timing, deliverables, assets needed, and payment state.',
          'Sam reviews for oversight when risk or ambiguity shows up.',
          'Package the final objective into a 60-second Robert brief.',
        ]
        : domain === 'robert'
          ? [
            'Asher cleans up the thread and turns the ask into a concrete proposed action.',
            'Confirm what the lead wants Robert to do, when, and what Unaligned gets paid.',
            'Sam reviews the handoff only if it needs a second set of eyes.',
            'Give Robert only the final objective, risk, payment state, and exact approval ask.',
          ]
          : [
            `${operator} owns the next reply or record update.`,
            'Reduce the packet to owner, blocker, next action, and expected outcome.',
            'Escalate only if money, public claims, or Robert approval is required.',
          ]
  const robertBrief =
    domain === 'sales' || domain === 'robert'
      ? `Robert should see this after Asher has the ask, price/package, timing, deliverables, and payment state. ${latest?.body ? `Latest outside note: ${shortenText(latest.body, 120)}` : ''}`.trim()
      : domain === 'money'
        ? 'Robert does not need this unless payment status changes the collaboration or requires his direct relationship.'
        : 'Robert only needs this if the final action requires his approval.'

  return {
    status,
    operator,
    dealQuestion,
    dealSteps,
    robertBrief,
    evidence: evidence.length ? evidence : ['Packet is based on the queue title and recommended action only.'],
    risks,
    recommendedAction,
    draftMessage,
    checklist,
  }
}

function buildPacketDraft(
  item: TodayQueueItem,
  invoices: Array<CompanyOsInvoice>,
  lead?: CompanyOsLead,
  signal?: CompanyOsSignal,
  kanbanAction?: CompanyOsKanbanAction,
  assets: Array<CompanyOsAsset> = [],
): string {
  const target = kanbanAction?.businessName || lead?.businessName || item.title
  const assetLine = assets.length
    ? `Useful files to review first: ${assets.map((asset) => asset.title).join(', ')}.`
    : 'No matched asset is required yet.'
  const invoiceLine = invoices.length
    ? `Invoice evidence to verify: ${invoices.map((invoice) => invoice.file).join(', ')}.`
    : 'No invoice file is attached to this packet.'
  const pricingAssetLine = assets.find((asset) => asset.id === 'partnership-packages')
    ? 'Attach or send the sponsorship pricing PDF with this reply.'
    : 'No pricing PDF is attached to this packet yet.'
  const contextLine =
    kanbanAction?.reason || signal?.needs || signal?.summary || item.detail

  const domain = packetDomain(item)

  if (signal) {
    const status = leadReplyStatus(signal)
    if (status === 'money-admin') {
      return buildPaymentHoldDraft(target, invoices)
    }
    return buildCleanCustomerDraft(signal, assets)
  }

  if (domain === 'money') {
    return buildPaymentHoldDraft(target, invoices)
  }

  if (domain === 'sales') {
    return [
      `Subject: Following up on ${target}`,
      '',
      'Hi,',
      '',
      `Thanks for reaching out about ${target}. I'm jumping in from Unaligned so we can keep this moving cleanly.`,
      '',
      pricingAssetLine,
      '',
      'Can you confirm budget range, target timing, deliverables, and what you need from Robert specifically?',
      '',
      'Best,',
      'Asher',
    ].join('\n')
  }

  if (domain === 'robert') {
    return [
      `Robert brief: ${target}`,
      '',
      `One-minute summary: ${contextLine}`,
      '',
      'Owner: Asher handles the thread and customer back-and-forth. Sam provides oversight.',
      'Decision point: Robert only steps in when the final public move needs approval.',
      '',
      `Payment state: ${invoices.length ? 'invoice follow-up / payment check' : 'waiting on lead or internal handoff'}`,
      assetLine,
      invoiceLine,
      '',
      'Internal note: this is a brief, not a long thread dump.',
    ].join('\n')
  }

  return [
    `Action packet: ${item.title}`,
    '',
    `Recommended move: ${item.action}`,
    '',
    `Context: ${contextLine}`,
    assetLine,
    invoiceLine,
    '',
    'Internal note: decide owner, status, next action, and approval before any external change.',
  ].join('\n')
}

function buildCleanCustomerDraft(
  signal: CompanyOsSignal,
  assets: Array<CompanyOsAsset>,
): string {
  const first = leadFirstName(signal)
  const pricing = shouldSendPricingPdf(signal)
  const hasPricingAsset = assets.some(
    (asset) => asset.id === 'partnership-packages' || asset.kind === 'pricing',
  )

  return [
    `Subject: ${subjectForSignal(signal)}`,
    '',
    `Hi ${first},`,
    '',
    "Thanks for reaching out. I'm jumping in from Unaligned so we can keep this moving cleanly.",
    pricing
      ? hasPricingAsset
        ? "I'll attach the Unaligned sponsorship package so you can review the current options."
        : 'I can send over the sponsorship package and help narrow the right fit.'
      : `I can help coordinate the ${leadAskLabel(signal)} details and keep the next step simple.`,
    '',
    'Can you confirm:',
    '- budget range',
    '- target timing',
    '- deliverables you want covered',
    '- what you need from Robert specifically',
    '',
    'Best,',
    'Asher',
  ].join('\n')
}

function buildPaymentHoldDraft(
  target: string,
  invoices: Array<CompanyOsInvoice>,
): string {
  return [
    'Payment verification required',
    '',
    `No customer email is drafted yet for ${target} because this touches payment/admin status.`,
    '',
    'Verify first:',
    '- invoice match',
    '- paid vs waiting for payment',
    '- proof/status in the source record',
    invoices.length ? `- related invoice files: ${invoices.map((invoice) => invoice.file).join(', ')}` : '',
    '',
    'After verification, Asher can send a short payment-status note if one is actually needed.',
  ]
    .filter(Boolean)
    .join('\n')
}

function Panel({
  title,
  icon,
  className,
  children,
}: {
  title: string
  icon: typeof Building02Icon
  className?: string
  children: ReactNode
}) {
  return (
    <section
      className={cn(
        'min-w-0 overflow-hidden rounded-lg border border-[var(--theme-border)] bg-[var(--theme-card)] p-4',
        className,
      )}
    >
      <div className="mb-3 flex items-center gap-2">
        <HugeiconsIcon icon={icon} size={18} strokeWidth={1.7} className="text-[var(--theme-accent)]" />
        <h2 className="text-sm font-semibold text-[var(--theme-text)]">{title}</h2>
      </div>
      {children}
    </section>
  )
}

function StatusPill({
  label,
  value,
  tone,
}: {
  label: string
  value: number
  tone: 'danger' | 'warning' | 'neutral'
}) {
  const toneClass =
    tone === 'danger'
      ? 'border-[rgba(178,59,59,0.25)] bg-[rgba(178,59,59,0.08)] text-[var(--theme-danger)]'
      : tone === 'warning'
        ? 'border-[rgba(154,98,22,0.28)] bg-[rgba(154,98,22,0.09)] text-[var(--theme-warning)]'
        : 'border-[var(--theme-border)] bg-[var(--theme-card)] text-[var(--theme-muted)]'

  return (
    <div
      className={cn(
        'inline-flex h-10 items-center gap-2 rounded-lg border px-3 text-sm font-semibold',
        toneClass,
      )}
    >
      <span className="tabular-nums">{value}</span>
      <span className="text-xs font-medium">{label}</span>
    </div>
  )
}

function MiniSource({
  label,
  value,
  detail,
}: {
  label: string
  value: number
  detail: string
}) {
  return (
    <div className="rounded-lg bg-[var(--theme-card2)] p-3">
      <div className="flex items-baseline justify-between gap-3">
        <p className="truncate text-sm font-semibold text-[var(--theme-text)]">{label}</p>
        <p className="text-xl font-semibold tabular-nums text-[var(--theme-text)]">{value}</p>
      </div>
      <p className="mt-1 truncate text-xs text-[var(--theme-muted)]">{detail}</p>
    </div>
  )
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg bg-[var(--theme-card2)] px-3 py-3 text-center">
      <p className="text-2xl font-semibold tabular-nums text-[var(--theme-text)]">{value}</p>
      <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--theme-muted)]">
        {label}
      </p>
    </div>
  )
}

function PriorityBadge({ priority }: { priority: TodayQueueItem['priority'] }) {
  const className =
    priority === 'p0'
      ? 'border-[rgba(178,59,59,0.25)] bg-[rgba(178,59,59,0.08)] text-[var(--theme-danger)]'
      : priority === 'p1'
        ? 'border-[rgba(154,98,22,0.28)] bg-[rgba(154,98,22,0.09)] text-[var(--theme-warning)]'
        : 'border-[var(--theme-border)] bg-[var(--theme-card2)] text-[var(--theme-muted)]'

  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center rounded-md border px-2 py-1 text-xs font-semibold',
        className,
      )}
    >
      {priority.toUpperCase()}
    </span>
  )
}

function InvoiceList({ invoices }: { invoices: Array<CompanyOsInvoice> }) {
  if (!invoices.length) return <p className="text-sm text-[var(--theme-muted)]">No invoices found.</p>

  return (
    <div className="space-y-2">
      {invoices.slice(0, 9).map((invoice) => (
        <div
          key={`${invoice.source}-${invoice.file}`}
          className={cn(
            'rounded-lg border p-3',
            invoice.status === 'outstanding'
              ? 'border-red-500/25 bg-red-500/[0.06]'
              : invoice.status === 'needs-proof'
                ? 'border-amber-500/25 bg-amber-500/[0.06]'
                : 'border-[var(--theme-border)] bg-[var(--theme-card2)]',
          )}
        >
          <div className="flex items-start justify-between gap-2">
            <p className="min-w-0 break-words text-xs font-semibold leading-5 text-[var(--theme-text)]">
              {invoice.file}
            </p>
            <Badge>{invoice.status}</Badge>
          </div>
        </div>
      ))}
    </div>
  )
}

function SourceList({
  sources,
}: {
  sources: CompanyOsLiveOps['sources']
}) {
  return (
    <div className="space-y-2">
      {sources.map((source) => (
        <div
          key={source.name}
          className="rounded-lg border border-[var(--theme-border)] bg-[var(--theme-card2)] p-3"
        >
          <div className="flex items-center justify-between gap-3">
            <p className="min-w-0 truncate text-sm font-semibold text-[var(--theme-text)]">
              {source.name}
            </p>
            <Badge>{source.status}</Badge>
          </div>
          <p className="mt-1 text-xs leading-5 text-[var(--theme-muted)]">
            {source.count} items. {source.note}
          </p>
        </div>
      ))}
    </div>
  )
}

function LiveMetric({
  label,
  value,
  sub,
}: {
  label: string
  value: number
  sub: string
}) {
  return (
    <div className="min-w-0 rounded-lg border border-[var(--theme-border)] bg-[var(--theme-card)] p-4">
      <p className="text-2xl font-semibold tabular-nums text-[var(--theme-text)]">{value}</p>
      <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--theme-muted)]">
        {label}
      </p>
      <p className="mt-1 truncate text-xs text-[var(--theme-muted)]">{sub}</p>
    </div>
  )
}

function LeadList({ leads }: { leads: Array<CompanyOsLead> }) {
  if (!leads.length) {
    return <p className="text-sm text-[var(--theme-muted)]">No matching leads found.</p>
  }

  return (
    <div className="space-y-2">
      {leads.map((lead) => (
        <article
          key={lead.id}
          className="rounded-lg border border-[var(--theme-border)] bg-[var(--theme-card2)] p-3"
        >
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="break-words text-sm font-semibold leading-5 text-[var(--theme-text)]">
                {lead.businessName || lead.title}
              </p>
              {lead.businessName ? (
                <p className="mt-1 break-words text-xs leading-5 text-[var(--theme-muted)]">
                  {lead.title}
                </p>
              ) : null}
            </div>
            {lead.estimatedValue ? <Badge>{lead.estimatedValue}</Badge> : null}
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {lead.listId ? <Badge>{lead.listId}</Badge> : null}
            {lead.priority ? <Badge>{lead.priority}</Badge> : null}
            {lead.draftStatus ? <Badge>{lead.draftStatus}</Badge> : null}
          </div>
        </article>
      ))}
    </div>
  )
}

function KanbanActionList({ actions }: { actions: Array<CompanyOsKanbanAction> }) {
  if (!actions.length) {
    return <p className="text-sm text-[var(--theme-muted)]">No Kanban actions matched yet.</p>
  }

  return (
    <div className="space-y-2">
      {actions.slice(0, 8).map((action) => (
        <article
          key={action.id}
          className="rounded-lg border border-[var(--theme-border)] bg-[var(--theme-card2)] p-3"
        >
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="break-words text-sm font-semibold leading-5 text-[var(--theme-text)]">
                {action.businessName || action.title}
              </p>
              {action.businessName ? (
                <p className="mt-1 break-words text-xs leading-5 text-[var(--theme-muted)]">
                  {action.title}
                </p>
              ) : null}
            </div>
            <Badge>{action.urgency.toUpperCase()}</Badge>
          </div>
          <p className="mt-2 text-xs leading-5 text-[var(--theme-muted)]">{action.reason}</p>
          <p className="mt-2 text-xs leading-5 text-[var(--theme-muted)]">
            {action.recommendedAction}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            <Badge>{action.lane}</Badge>
            {action.stage ? <Badge>{action.stage}</Badge> : null}
            {action.priority ? <Badge>{action.priority}</Badge> : null}
            {action.publicAsset ? <Badge>{action.publicAsset}</Badge> : null}
          </div>
        </article>
      ))}
    </div>
  )
}

function AssetList({ assets }: { assets: Array<CompanyOsAsset> }) {
  if (!assets.length) return <p className="text-sm text-[var(--theme-muted)]">No sales assets found.</p>

  return (
    <div className="space-y-2">
      {assets.map((asset) => (
        <article
          key={asset.id}
          className="rounded-lg border border-[var(--theme-border)] bg-[var(--theme-card2)] p-3"
        >
          <div className="flex items-start justify-between gap-2">
            <p className="min-w-0 break-words text-sm font-semibold leading-5 text-[var(--theme-text)]">
              {asset.title}
            </p>
            <Badge>{asset.kind}</Badge>
          </div>
          <p className="mt-1 text-xs leading-5 text-[var(--theme-muted)]">{asset.note}</p>
          <p className="mt-2 break-words text-[11px] leading-5 text-[var(--theme-muted)]">
            {asset.file}
          </p>
        </article>
      ))}
    </div>
  )
}

function SignalList({ signals }: { signals: Array<CompanyOsSignal> }) {
  if (!signals.length) return <p className="text-sm text-[var(--theme-muted)]">No signals yet.</p>

  return (
    <div className="space-y-2">
      {signals.slice(0, 6).map((signal, index) => (
        <article
          key={`${signal.subject || signal.title || signal.kind}-${index}`}
          className="rounded-lg border border-[var(--theme-border)] bg-[var(--theme-card2)] p-3"
        >
          <div className="flex items-start justify-between gap-2">
            <p className="min-w-0 break-words text-sm font-semibold leading-5 text-[var(--theme-text)]">
              {signal.title || signal.subject}
            </p>
            <Badge>{signal.kind}</Badge>
          </div>
          <p className="mt-1 text-xs leading-5 text-[var(--theme-muted)]">{signal.summary}</p>
          {signal.needs ? (
            <p className="mt-2 text-xs leading-5 text-[var(--theme-muted)]">
              {signal.needs}
            </p>
          ) : null}
        </article>
      ))}
    </div>
  )
}

function StageBreakdown({ stages }: { stages: Record<string, number> }) {
  const entries = Object.entries(stages)
    .filter(([, count]) => count > 0)
    .sort((left, right) => right[1] - left[1])

  if (!entries.length) {
    return <p className="text-sm text-[var(--theme-muted)]">No Supabase stages found.</p>
  }

  const max = Math.max(...entries.map(([, count]) => count))

  return (
    <div className="space-y-2">
      {entries.map(([stage, count]) => (
        <div key={stage}>
          <div className="mb-1 flex items-center justify-between gap-3">
            <p className="truncate text-xs font-semibold text-[var(--theme-text)]">{stage}</p>
            <p className="text-xs tabular-nums text-[var(--theme-muted)]">{count}</p>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-[var(--theme-card2)]">
            <div
              className="h-full rounded-full bg-[var(--theme-accent)]"
              style={{ width: `${Math.max(8, (count / max) * 100)}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

function TaskCard({ task }: { task: CompanyOsTask }) {
  return (
    <article className="rounded-lg border border-[var(--theme-border)] bg-[var(--theme-card2)] p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-[var(--theme-text)]">{task.title}</h3>
          <p className="mt-2 text-xs leading-5 text-[var(--theme-muted)]">{task.description}</p>
        </div>
        {task.priority ? <Badge>{task.priority.toUpperCase()}</Badge> : null}
      </div>
      {task.tags.length ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {task.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
      ) : null}
    </article>
  )
}

function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex max-w-full min-w-0 items-center rounded-md border border-[var(--theme-border)] bg-[var(--theme-card2)] px-2 py-1 text-xs font-medium text-[var(--theme-muted)]">
      <span className="truncate">{children}</span>
    </span>
  )
}
