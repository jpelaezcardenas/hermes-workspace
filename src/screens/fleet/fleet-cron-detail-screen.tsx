import { useQuery } from '@tanstack/react-query'
import type { FleetCronDetailPayload } from '@/server/fleet'
import { cn } from '@/lib/utils'

function getSearchParam(name: string) {
  if (typeof window === 'undefined') return ''
  return new URLSearchParams(window.location.search).get(name) || ''
}

async function fetchCronDetail(nodeId: string, jobId: string): Promise<FleetCronDetailPayload> {
  const params = new URLSearchParams({ nodeId, jobId })
  const res = await fetch(`/api/fleet-cron-detail?${params.toString()}`)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

function Badge({ children, tone = 'neutral' }: { children: React.ReactNode; tone?: 'green' | 'amber' | 'red' | 'neutral' }) {
  const tones = {
    green: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300',
    amber: 'border-amber-500/30 bg-amber-500/10 text-amber-300',
    red: 'border-red-500/30 bg-red-500/10 text-red-300',
    neutral: 'border-neutral-500/30 bg-neutral-500/10 text-neutral-300',
  }
  return <span className={cn('rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em]', tones[tone])}>{children}</span>
}

function Field({ label, value, mono = false }: { label: string; value?: string | null; mono?: boolean }) {
  return (
    <div className="rounded-xl bg-[var(--theme-card2)] p-3">
      <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">{label}</div>
      <div className={cn('mt-1 break-words text-sm text-ink', mono && 'font-mono text-xs')}>{value || '—'}</div>
    </div>
  )
}

function CodeBlock({ title, content }: { title: string; content?: string }) {
  return (
    <section className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-5">
      <div className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted">{title}</div>
      <pre className="max-h-[460px] overflow-auto whitespace-pre-wrap rounded-xl bg-black/30 p-4 text-xs leading-relaxed text-ink">
        {content || 'No content available.'}
      </pre>
    </section>
  )
}

export function FleetCronDetailScreen() {
  const nodeId = getSearchParam('nodeId')
  const jobId = getSearchParam('jobId')
  const query = useQuery({
    queryKey: ['fleet-cron-detail', nodeId, jobId],
    queryFn: () => fetchCronDetail(nodeId, jobId),
    enabled: Boolean(nodeId && jobId),
    refetchInterval: 30_000,
    staleTime: 10_000,
  })
  const data = query.data
  const tone = data?.style.tone === 'systemish' ? 'amber' : data?.style.tone === 'human' ? 'green' : 'neutral'

  return (
    <div className="min-h-full bg-[var(--theme-bg)] px-6 py-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <a className="text-sm text-muted hover:text-ink" href="/fleet-cron">← Cron Control</a>
            <div className="mt-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">Cron detail</div>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink">{data?.job.name || 'Cron Job Detail'}</h1>
            <p className="mt-2 max-w-2xl text-sm text-muted">
              Latest run output, delivery target, prompt, and polish diagnosis. Still read-only. The sharp objects remain locked.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {data ? <Badge tone={data.job.lastRunStatus === 'failed' ? 'red' : 'green'}>{data.job.lastRunStatus || data.job.status}</Badge> : null}
            {data ? <Badge tone={tone}>{data.style.tone}</Badge> : null}
          </div>
        </header>

        {query.isError ? (
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
            Cron detail failed: {query.error instanceof Error ? query.error.message : 'unknown error'}
          </div>
        ) : null}

        {!nodeId || !jobId ? (
          <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-200">Missing nodeId or jobId.</div>
        ) : null}

        {query.isLoading ? (
          <div className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-5 text-sm text-muted">Collecting cron detail…</div>
        ) : null}

        {data ? (
          <>
            <section className="grid gap-3 md:grid-cols-4">
              <Field label="Node" value={`${data.node.name} · ${data.node.status}`} />
              <Field label="Schedule" value={data.job.schedule || 'manual'} mono />
              <Field label="Next run" value={data.job.nextRun} />
              <Field label="Delivery" value={data.job.deliveryTarget} />
            </section>

            <section className="grid gap-3 md:grid-cols-3">
              <Field label="Model" value={data.job.model} />
              <Field label="Provider" value={data.job.provider} />
              <Field label="Skills" value={data.job.skills.length ? data.job.skills.join(', ') : 'none'} />
            </section>

            <section className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-5">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Delivery polish</div>
                  <div className="mt-1 text-sm text-ink">Score {data.style.score}</div>
                </div>
                <Badge tone={tone}>{data.style.tone}</Badge>
              </div>
              <div className="mt-3 text-sm text-muted">
                {data.style.reasons.length ? data.style.reasons.join(' · ') : 'Looks clean from the latest output.'}
              </div>
              <div className="mt-4 rounded-xl bg-[var(--theme-card2)] p-4">
                <div className="text-xs font-medium text-ink">Suggested human version</div>
                <p className="mt-2 whitespace-pre-wrap text-sm text-muted">{data.suggestedHumanSummary}</p>
              </div>
            </section>

            <CodeBlock title="Job prompt" content={data.job.prompt} />
            <CodeBlock title={`Latest delivered response${data.latestOutput?.runTime ? ` · ${data.latestOutput.runTime}` : ''}`} content={data.latestOutput?.response} />
            <CodeBlock title="Raw output artifact, redacted" content={data.latestOutput?.raw} />

            <footer className="text-xs text-muted">
              Output file: <span className="font-mono text-ink">{data.latestOutput?.path || 'none'}</span>
              <br />Last refresh: {new Date(data.generatedAt).toLocaleString()}
            </footer>
          </>
        ) : null}
      </div>
    </div>
  )
}
