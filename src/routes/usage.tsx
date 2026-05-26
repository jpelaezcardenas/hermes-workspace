import { createFileRoute } from '@tanstack/react-router'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect, useMemo, useState } from 'react'
import { usePageTitle } from '@/hooks/use-page-title'

type UsageWindow = {
  id: string
  label: string
  used: number
  limit: number
  unit: 'percent' | 'dollars' | 'tokens' | 'count'
  usedPercent: number
  remainingPercent: number
  resetsAt?: string
}

type UsageProviderCard = {
  id: string
  label: string
  status: 'ok' | 'missing_credentials' | 'auth_expired' | 'error'
  plan?: string
  message?: string
  caelConfigured?: boolean
  caelDefault?: boolean
  caelModel?: string
  caelModels?: string[]
  monitorKind?: 'cael' | 'external'
  updatedAt: string
  source: string
  confidence: 'live' | 'configured' | 'missing' | 'error'
  usageRows: UsageWindow[]
  badges: Array<{ label: string; value: string; color?: string }>
  creditsRemaining: number | null
  codeReviewRemainingPercent: number | null
}

type UsageLimitsResponse = {
  ok: boolean
  generatedAt: string
  enabledProviders: string[]
  providers: UsageProviderCard[]
}

type ModelCatalogEntry = {
  id?: string
  name?: string
  provider?: string
}

type ModelsResponse = {
  ok?: boolean
  source?: string
  models?: ModelCatalogEntry[]
  data?: ModelCatalogEntry[]
  configuredProviders?: string[]
  error?: string
}

type HermesProviderState = {
  id: string
  name?: string
  configured?: boolean
  isDefault?: boolean
  models?: Array<{ id?: string; name?: string }>
}

type HermesConfigResponse = {
  ok?: boolean
  activeProvider?: string
  activeModel?: string
  providers?: HermesProviderState[]
  error?: string
  message?: string
}

type ModelInfoResponse = {
  model?: string
  provider?: string
  auto_context_length?: number
  config_context_length?: number
  effective_context_length?: number
  capabilities?: Record<string, unknown>
  supportsRuntimeSwitching?: boolean
  mode?: string
  gatewayMode?: string
  error?: string
}

type ContextUsageResponse = {
  ok?: boolean
  contextPercent?: number
  maxTokens?: number
  usedTokens?: number
  model?: string
  staticTokens?: number
  conversationTokens?: number
  error?: string
}

async function fetchUsageLimits(force = false): Promise<UsageLimitsResponse> {
  const response = await fetch(`/api/usage/limits${force ? '?force=1' : ''}`, { cache: 'no-store' })
  if (!response.ok) throw new Error(`Usage limits failed: HTTP ${response.status}`)
  return response.json()
}

async function fetchJson<T>(path: string): Promise<T> {
  const response = await fetch(path, { cache: 'no-store' })
  const payload = (await response.json().catch(() => ({}))) as T & { error?: string }
  if (!response.ok) throw new Error(payload.error || `${path} failed: HTTP ${response.status}`)
  return payload as T
}

async function patchDefaultModel(providerId: string, modelId: string): Promise<HermesConfigResponse> {
  const response = await fetch('/api/hermes-config', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'set-default-model', providerId, modelId }),
  })
  const payload = (await response.json().catch(() => ({}))) as HermesConfigResponse
  if (!response.ok || payload.ok === false) throw new Error(payload.error || `Model config update failed: HTTP ${response.status}`)
  return payload
}

export const Route = createFileRoute('/usage')({
  ssr: false,
  component: UsageRoute,
})

function UsageRoute() {
  usePageTitle('Cael Usage')
  const { data, error, isLoading, refetch, isFetching } = useQuery({
    queryKey: ['cael-usage-limits'],
    queryFn: () => fetchUsageLimits(false),
    refetchInterval: 60_000,
  })

  return (
    <main className="h-full overflow-y-auto bg-[var(--theme-bg)] text-[var(--theme-text)]">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-6 lg:px-8">
        <section className="rounded-3xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-6 shadow-2xl">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--theme-muted)]">Remaining Limits</p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">Provider Usage</h1>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-[var(--theme-muted)]">
                CodexBar-inspired provider cards for remaining limits, resets, credits, and freshness. The UI only displays normalized, secret-free status from Hermes/Cael usage probes.
              </p>
            </div>
            <button
              className="rounded-xl border border-[var(--theme-border)] px-4 py-2 text-sm hover:bg-white/5 disabled:opacity-50"
              disabled={isFetching}
              onClick={() => void refetch()}
            >
              {isFetching ? 'Refreshing…' : 'Refresh'}
            </button>
          </div>
        </section>

        {isLoading ? (
          <Panel>Loading provider usage limits…</Panel>
        ) : error ? (
          <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-6 text-sm text-rose-200">
            {error instanceof Error ? error.message : String(error)}
          </div>
        ) : data ? (
          <>
            <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <InfoCard title="Providers" value={String(data.providers.length)} sub="Configured or discoverable providers." />
              <InfoCard title="Live" value={String(data.enabledProviders.length)} sub="Providers returning live usage now." />
              <InfoCard title="Generated" value={new Date(data.generatedAt).toLocaleTimeString()} sub="Snapshot freshness timestamp." />
              <InfoCard title="Source" value="Hermes" sub="Shared backend JSON for web + desktop." />
            </section>

            <CaelRosterPanel providers={sortedProviders(data.providers)} />

            <section className="grid gap-4 xl:grid-cols-2">
              <ModelConfigPanel onApplied={() => void refetch()} />
              <RuntimeModelPanel />
            </section>

            <section className="grid gap-4 lg:grid-cols-2">
              {sortedProviders(data.providers).map((provider) => (
                <ProviderCard key={provider.id} provider={provider} />
              ))}
            </section>
          </>
        ) : null}
      </div>
    </main>
  )
}


function ModelConfigPanel({ onApplied }: { onApplied: () => void }) {
  const configQuery = useQuery({
    queryKey: ['usage', 'hermes-config'],
    queryFn: () => fetchJson<HermesConfigResponse>('/api/hermes-config'),
  })
  const modelsQuery = useQuery({
    queryKey: ['usage', 'models'],
    queryFn: () => fetchJson<ModelsResponse>('/api/models'),
  })
  const [providerId, setProviderId] = useState('')
  const [modelId, setModelId] = useState('')
  const [manual, setManual] = useState(false)
  const [notice, setNotice] = useState<string | null>(null)

  const catalogModels = useMemo(() => modelsQuery.data?.models ?? modelsQuery.data?.data ?? [], [modelsQuery.data])
  const providerOptions = useMemo(() => {
    const values = new Set<string>()
    for (const model of catalogModels) if (model.provider) values.add(model.provider)
    for (const provider of configQuery.data?.providers ?? []) {
      if (provider.isDefault || provider.configured || (provider.models?.length ?? 0) > 0) values.add(provider.id)
    }
    for (const provider of modelsQuery.data?.configuredProviders ?? []) values.add(provider)
    if (configQuery.data?.activeProvider) values.add(configQuery.data.activeProvider)
    return Array.from(values).filter(Boolean).sort()
  }, [catalogModels, configQuery.data, modelsQuery.data])
  const modelOptions = useMemo(() => {
    if (!providerId) return []
    const values = new Set<string>()
    for (const model of catalogModels) if ((model.provider || 'unknown') === providerId && model.id) values.add(model.id)
    const configProvider = configQuery.data?.providers?.find((provider) => provider.id === providerId)
    for (const model of configProvider?.models ?? []) if (model.id) values.add(model.id)
    if (configQuery.data?.activeProvider === providerId && configQuery.data.activeModel) values.add(configQuery.data.activeModel)
    return Array.from(values).filter(Boolean).sort()
  }, [catalogModels, configQuery.data, providerId])

  useEffect(() => {
    if (!configQuery.data) return
    setProviderId((current) => current || configQuery.data?.activeProvider || providerOptions[0] || '')
    setModelId((current) => current || configQuery.data?.activeModel || modelOptions[0] || '')
  }, [configQuery.data, modelOptions, providerOptions])

  useEffect(() => {
    if (!providerId || modelOptions.includes(modelId)) return
    setModelId(modelOptions[0] || '')
  }, [modelId, modelOptions, providerId])

  const mutation = useMutation({
    mutationFn: () => patchDefaultModel(providerId, modelId),
    onSuccess: (payload) => {
      setNotice(payload.message || 'Default model updated.')
      void configQuery.refetch()
      onApplied()
    },
    onError: (error) => setNotice(error instanceof Error ? error.message : 'Default model update failed.'),
  })

  return (
    <section className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--theme-muted)]">Active Cael model config</p>
          <h2 className="mt-2 text-xl font-semibold">{configQuery.data?.activeProvider || 'unknown'} / {configQuery.data?.activeModel || 'unknown'}</h2>
          <p className="mt-2 text-sm leading-6 text-[var(--theme-muted)]">Hydrated from /api/hermes-config and /api/models; applies through the same server-side config patch as desktop.</p>
        </div>
        <button className="rounded-xl border border-[var(--theme-border)] px-3 py-2 text-sm hover:bg-white/5 disabled:opacity-50" disabled={configQuery.isFetching || modelsQuery.isFetching || mutation.isPending} onClick={() => { void configQuery.refetch(); void modelsQuery.refetch() }}>
          {configQuery.isFetching || modelsQuery.isFetching ? 'Loading...' : 'Reload'}
        </button>
      </div>

      <div className="mt-4 grid gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto]">
        {manual || providerOptions.length === 0 ? (
          <>
            <input value={providerId} onChange={(event) => setProviderId(event.target.value)} placeholder="provider" className="rounded-xl border border-[var(--theme-border)] bg-black/10 px-3 py-2 text-sm outline-none" />
            <input value={modelId} onChange={(event) => setModelId(event.target.value)} placeholder="model" className="rounded-xl border border-[var(--theme-border)] bg-black/10 px-3 py-2 text-sm outline-none" />
          </>
        ) : (
          <>
            <select value={providerId} onChange={(event) => setProviderId(event.target.value)} className="rounded-xl border border-[var(--theme-border)] bg-black/10 px-3 py-2 text-sm outline-none">
              {providerOptions.map((provider) => <option key={provider} value={provider}>{providerLabel(provider, configQuery.data)}</option>)}
            </select>
            <select value={modelId} onChange={(event) => setModelId(event.target.value)} className="rounded-xl border border-[var(--theme-border)] bg-black/10 px-3 py-2 text-sm outline-none">
              {modelOptions.map((model) => <option key={model} value={model}>{modelLabel(model, catalogModels)}</option>)}
            </select>
          </>
        )}
        <button className="rounded-xl bg-sky-500 px-4 py-2 text-sm font-semibold text-sky-950 disabled:opacity-50" disabled={mutation.isPending || !providerId.trim() || !modelId.trim()} onClick={() => mutation.mutate()}>
          {mutation.isPending ? 'Applying...' : 'Apply'}
        </button>
      </div>

      <label className="mt-3 flex items-center gap-2 text-xs text-[var(--theme-muted)]">
        <input type="checkbox" checked={manual} onChange={(event) => setManual(event.target.checked)} />
        Manual provider/model override
      </label>
      <p className="mt-2 text-xs text-[var(--theme-muted)]">{(catalogModels.length || 0).toLocaleString()} models across {providerOptions.length} providers from {modelsQuery.data?.source || 'unknown source'}.</p>
      {notice || configQuery.error || modelsQuery.error ? (
        <p className="mt-3 rounded-xl border border-[var(--theme-border)] bg-black/10 p-3 text-xs text-[var(--theme-muted)]">
          {notice || (configQuery.error instanceof Error ? configQuery.error.message : '') || (modelsQuery.error instanceof Error ? modelsQuery.error.message : '')}
        </p>
      ) : null}
    </section>
  )
}

function RuntimeModelPanel() {
  const modelInfoQuery = useQuery({
    queryKey: ['usage', 'model-info'],
    queryFn: () => fetchJson<ModelInfoResponse>('/api/model/info'),
    refetchInterval: 60_000,
  })
  const contextQuery = useQuery({
    queryKey: ['usage', 'context-usage'],
    queryFn: () => fetchJson<ContextUsageResponse>('/api/context-usage'),
    refetchInterval: 30_000,
  })
  const modelInfo = modelInfoQuery.data
  const context = contextQuery.data
  const contextPercent = Math.max(0, Math.min(100, context?.contextPercent ?? 0))
  const capabilities = Object.entries(modelInfo?.capabilities ?? {}).slice(0, 8)

  return (
    <section className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--theme-muted)]">Runtime model + context</p>
          <h2 className="mt-2 text-xl font-semibold">{modelInfo?.provider || 'unknown'} / {modelInfo?.model || context?.model || 'unknown'}</h2>
          <p className="mt-2 text-sm leading-6 text-[var(--theme-muted)]">Active model capabilities and current context usage from /api/model/info and /api/context-usage.</p>
        </div>
        <button className="rounded-xl border border-[var(--theme-border)] px-3 py-2 text-sm hover:bg-white/5 disabled:opacity-50" disabled={modelInfoQuery.isFetching || contextQuery.isFetching} onClick={() => { void modelInfoQuery.refetch(); void contextQuery.refetch() }}>
          {modelInfoQuery.isFetching || contextQuery.isFetching ? 'Loading...' : 'Refresh'}
        </button>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-3">
        <MiniMetric label="Active runtime" value={`${modelInfo?.mode || 'unknown'} / ${modelInfo?.gatewayMode || 'unknown'}`} />
        <MiniMetric label="Context window" value={formatNumber(modelInfo?.effective_context_length ?? context?.maxTokens ?? 0)} />
        <MiniMetric label="Current context" value={`${Math.round(contextPercent)}%`} />
      </div>
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
        <div className="h-full rounded-full bg-emerald-400" style={{ width: `${contextPercent}%` }} />
      </div>
      <div className="mt-2 flex justify-between gap-3 text-xs text-[var(--theme-muted)]">
        <span>Conversation {formatNumber(context?.conversationTokens ?? 0)}</span>
        <span>Static {formatNumber(context?.staticTokens ?? 0)}</span>
      </div>
      {capabilities.length > 0 ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {capabilities.map(([key, value]) => (
            <span key={key} className="rounded-full border border-[var(--theme-border)] px-3 py-1 text-xs text-[var(--theme-muted)]">{key}: {String(value)}</span>
          ))}
        </div>
      ) : null}
      {modelInfoQuery.error || contextQuery.error ? (
        <p className="mt-3 rounded-xl border border-[var(--theme-border)] bg-black/10 p-3 text-xs text-[var(--theme-muted)]">
          {(modelInfoQuery.error instanceof Error ? modelInfoQuery.error.message : '') || (contextQuery.error instanceof Error ? contextQuery.error.message : '')}
        </p>
      ) : null}
    </section>
  )
}

function providerLabel(providerId: string, config?: HermesConfigResponse): string {
  const provider = config?.providers?.find((entry) => entry.id === providerId)
  const name = provider?.name || providerId
  return provider?.isDefault ? `Default: ${name}` : name
}

function modelLabel(modelId: string, models: ModelCatalogEntry[]): string {
  return models.find((model) => model.id === modelId)?.name || modelId
}


function sortedProviders(providers: UsageProviderCard[]): UsageProviderCard[] {
  return [...providers].sort((left, right) => {
    const leftRank = providerRank(left)
    const rightRank = providerRank(right)
    if (leftRank !== rightRank) return leftRank - rightRank
    return left.label.localeCompare(right.label)
  })
}

function providerRank(provider: UsageProviderCard): number {
  if (provider.caelDefault) return 0
  if (provider.caelConfigured) return 1
  if (provider.monitorKind === 'cael') return 2
  return 3
}

function CaelRosterPanel({ providers }: { providers: UsageProviderCard[] }) {
  const caelProviders = providers.filter((provider) => provider.caelConfigured || provider.monitorKind === 'cael')
  return (
    <section className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--theme-muted)]">Cael model roster</p>
          <h2 className="mt-2 text-xl font-semibold">Active Hermes/Cael models drive these meters</h2>
          <p className="mt-2 text-sm leading-6 text-[var(--theme-muted)]">
            This is sourced from /api/usage/limits and the active Hermes config, not a separate monitor registry.
          </p>
        </div>
        <a className="rounded-xl border border-[var(--theme-border)] px-4 py-2 text-sm hover:bg-white/5" href="/settings/providers">
          Manage model config
        </a>
      </div>
      {caelProviders.length > 0 ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {caelProviders.map((provider) => (
            <span key={provider.id} className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ${provider.caelDefault ? 'bg-sky-500/15 text-sky-200 ring-sky-400/30' : 'bg-white/10 text-[var(--theme-muted)] ring-white/10'}`}>
              {provider.caelDefault ? 'Default: ' : ''}{provider.label} / {provider.caelModel ?? provider.caelModels?.[0] ?? 'configured'}
            </span>
          ))}
        </div>
      ) : (
        <div className="mt-4 rounded-xl border border-[var(--theme-border)] bg-black/10 p-4 text-sm text-[var(--theme-muted)]">
          No Cael-configured model providers were reported by /api/usage/limits.
        </div>
      )}
    </section>
  )
}

function ProviderCard({ provider }: { provider: UsageProviderCard }) {
  const status = statusMeta(provider.status)
  return (
    <article className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold">{provider.label}</h2>
          <p className="mt-1 text-xs text-[var(--theme-muted)]">
            Updated {relativeTime(provider.updatedAt)} · {provider.confidence} · {provider.source}
          </p>
        </div>
        <div className="flex flex-wrap justify-end gap-2">
          {provider.caelDefault ? <span className="rounded-full bg-sky-500/15 px-2.5 py-1 text-xs font-semibold text-sky-200 ring-1 ring-sky-400/30">Cael default</span> : null}
          {!provider.caelDefault && (provider.caelConfigured || provider.monitorKind === 'cael') ? <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-semibold text-[var(--theme-muted)] ring-1 ring-white/10">Cael model</span> : null}
          <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${status.className}`}>{status.label}</span>
        </div>
      </div>

      {provider.plan ? <p className="mt-3 text-sm text-[var(--theme-muted)]">Plan: {provider.plan}</p> : null}
      {provider.caelModel ? <p className="mt-2 text-xs text-[var(--theme-muted)]">Cael model: {provider.caelModel}</p> : null}
      {provider.message ? <p className="mt-3 rounded-xl border border-[var(--theme-border)] bg-black/10 p-3 text-xs leading-5 text-[var(--theme-muted)]">{provider.message}</p> : null}

      {provider.usageRows.length > 0 ? (
        <div className="mt-5 space-y-4">
          {provider.usageRows.map((row) => (
            <UsageRow key={row.id} row={row} />
          ))}
        </div>
      ) : (
        <div className="mt-5 rounded-xl border border-[var(--theme-border)] bg-black/10 p-4 text-sm text-[var(--theme-muted)]">
          No limit rows available yet. Authenticate this provider or refresh after the provider exposes usage data.
        </div>
      )}

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <MiniMetric label="Credits" value={provider.creditsRemaining == null ? '—' : formatNumber(provider.creditsRemaining)} />
        <MiniMetric label="Code review remaining" value={provider.codeReviewRemainingPercent == null ? '—' : `${provider.codeReviewRemainingPercent.toFixed(0)}%`} />
      </div>

      {provider.badges.length > 0 ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {provider.badges.map((badge) => (
            <span key={`${badge.label}-${badge.value}`} className="rounded-full border border-[var(--theme-border)] px-3 py-1 text-xs text-[var(--theme-muted)]">
              {badge.label}: {badge.value}
            </span>
          ))}
        </div>
      ) : null}
    </article>
  )
}

function UsageRow({ row }: { row: UsageWindow }) {
  const remaining = Math.max(0, Math.min(100, row.remainingPercent))
  const fill = `${remaining}%`
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3 text-sm">
        <span className="font-medium">{row.label}</span>
        <span className="font-mono text-xs text-[var(--theme-muted)]">{remaining.toFixed(0)}% left</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <div className="h-full rounded-full bg-emerald-400" style={{ width: fill }} />
      </div>
      <div className="mt-1 flex items-center justify-between text-xs text-[var(--theme-muted)]">
        <span>{formatUsage(row)}</span>
        <span>{row.resetsAt ? `resets ${relativeTime(row.resetsAt)}` : 'reset unavailable'}</span>
      </div>
    </div>
  )
}

function formatUsage(row: UsageWindow): string {
  if (row.unit === 'dollars') return `${formatCurrency(row.used)} / ${formatCurrency(row.limit)} used`
  if (row.unit === 'tokens') return `${formatNumber(row.used)} / ${formatNumber(row.limit)}`
  if (row.unit === 'percent') return `${row.used.toFixed(0)}% used`
  return `${formatNumber(row.used)} / ${formatNumber(row.limit)}`
}

function statusMeta(status: UsageProviderCard['status']) {
  if (status === 'ok') return { label: 'Live', className: 'bg-emerald-500/15 text-emerald-300 ring-emerald-400/30' }
  if (status === 'missing_credentials') return { label: 'Setup needed', className: 'bg-amber-500/15 text-amber-300 ring-amber-400/30' }
  if (status === 'auth_expired') return { label: 'Auth expired', className: 'bg-rose-500/15 text-rose-300 ring-rose-400/30' }
  return { label: 'Error', className: 'bg-rose-500/15 text-rose-300 ring-rose-400/30' }
}

function relativeTime(value: string): string {
  const time = new Date(value).getTime()
  if (!Number.isFinite(time)) return 'unknown'
  const diffSeconds = Math.round((time - Date.now()) / 1000)
  const abs = Math.abs(diffSeconds)
  const formatter = new Intl.RelativeTimeFormat(undefined, { numeric: 'auto', style: 'short' })
  if (abs < 60) return formatter.format(diffSeconds, 'second')
  if (abs < 3600) return formatter.format(Math.round(diffSeconds / 60), 'minute')
  if (abs < 86400) return formatter.format(Math.round(diffSeconds / 3600), 'hour')
  return formatter.format(Math.round(diffSeconds / 86400), 'day')
}

function formatNumber(value: number): string {
  return new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 }).format(value)
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(value)
}

function Panel({ children }: { children: string }) {
  return <div className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-6 text-sm text-[var(--theme-muted)]">{children}</div>
}

function InfoCard({ title, value, sub }: { title: string; value: string; sub: string }) {
  return (
    <div className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-5">
      <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--theme-muted)]">{title}</div>
      <div className="mt-2 break-words text-xl font-semibold">{value}</div>
      <div className="mt-2 text-xs leading-5 text-[var(--theme-muted)]">{sub}</div>
    </div>
  )
}

function MiniMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-[var(--theme-border)] bg-black/10 p-3">
      <div className="text-xs text-[var(--theme-muted)]">{label}</div>
      <div className="mt-1 font-mono text-sm">{value}</div>
    </div>
  )
}
