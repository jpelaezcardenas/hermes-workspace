import { HugeiconsIcon } from '@hugeicons/react'
import {
  BrainIcon,
  File01Icon,
  Message01Icon,
  Search01Icon,
} from '@hugeicons/core-free-icons'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useMemo, useState } from 'react'

type MemoryScopeChoice = 'both' | 'business' | 'personal'
type SearchMode = 'knowledge' | 'agent'
type SessionStateScope = 'business' | 'personal'
type CompiledTruthChoice = '' | 'candidate' | 'current' | 'stale' | 'conflict' | 'rejected' | 'superseded'
type CompiledExportChoice = '' | 'pending' | 'exported' | 'failed' | 'blocked' | 'skipped'
type CompiledAction = 'promote' | 'stale' | 'conflict' | 'reject' | 'exported'

type FabricHealth = {
  ok?: boolean
  endpoint?: string
  configured?: boolean
  health?: unknown
  scopes?: Record<string, unknown>
  warning?: string
  error?: string
}

type FabricSearchResponse = {
  ok?: boolean
  memoryScope?: string
  endpoint?: string
  data?: unknown
  route?: unknown
  scopes?: {
    business?: unknown
    personal?: unknown
  }
  error?: string
}

type FabricSessionStateResponse = FabricSearchResponse & {
  data?: string
}

type CompiledMemoryArtifact = Record<string, unknown> & {
  compiled_artifact_id?: string
  title?: string
  memory_scope?: string
  workspace?: string
  truth_status?: string
  freshness_state?: string
  gbrain_export_state?: string
  updated_at?: string
  content?: string
  sources?: unknown[]
}

type SearchItem = {
  scope: string
  title: string
  subtitle: string
  excerpt: string
  payload: unknown
}

async function readJson<T>(url: string): Promise<T> {
  const response = await fetch(url)
  const data = (await response.json().catch(() => ({}))) as T & { error?: string }
  if (!response.ok) throw new Error(data.error || `Request failed (${response.status})`)
  return data as T
}

async function postJson<T>(url: string, body: Record<string, unknown>): Promise<T> {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  })
  const data = (await response.json().catch(() => ({}))) as T & { error?: string }
  if (!response.ok) throw new Error(data.error || `Request failed (${response.status})`)
  return data as T
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === 'object' && !Array.isArray(value) ? value as Record<string, unknown> : null
}

function asString(value: unknown): string {
  if (typeof value === 'string') return value
  if (typeof value === 'number' || typeof value === 'boolean') return String(value)
  return ''
}

function preview(value: unknown, max = 220): string {
  const text = typeof value === 'string' ? value : JSON.stringify(value, null, 2)
  if (!text) return ''
  return text.length > max ? `${text.slice(0, max).trim()}...` : text
}

function firstString(record: Record<string, unknown>, keys: string[]): string {
  for (const key of keys) {
    const value = asString(record[key]).trim()
    if (value) return value
  }
  return ''
}

function extractArray(data: unknown): unknown[] {
  if (Array.isArray(data)) return data
  const record = asRecord(data)
  if (!record) return []
  for (const key of ['results', 'matches', 'documents', 'items', 'evidence', 'records']) {
    if (Array.isArray(record[key])) return record[key] as unknown[]
  }
  return []
}

function collectItems(response: FabricSearchResponse | undefined): SearchItem[] {
  if (!response) return []
  const items: SearchItem[] = []
  const scoped = response.scopes
  const entries: Array<[string, unknown]> = scoped
    ? [['business', scoped.business], ['personal', scoped.personal]]
    : [[response.memoryScope || 'scope', response]]

  for (const [scope, value] of entries) {
    const envelope = asRecord(value)
    if (!envelope) continue
    if (envelope.error) {
      items.push({
        scope,
        title: `${scope} unavailable`,
        subtitle: 'Memory Fabric route failed',
        excerpt: asString(envelope.error),
        payload: envelope,
      })
      continue
    }
    const data = envelope.data ?? value
    const resultItems = extractArray(data)
    if (resultItems.length === 0) {
      items.push({
        scope,
        title: `${scope} returned no structured results`,
        subtitle: 'Raw response available',
        excerpt: preview(data),
        payload: data,
      })
      continue
    }
    for (const result of resultItems) {
      const record = asRecord(result)
      if (!record) {
        items.push({ scope, title: 'Result', subtitle: '', excerpt: preview(result), payload: result })
        continue
      }
      items.push({
        scope,
        title: firstString(record, ['title', 'name', 'doc_title', 'source', 'id']) || 'Memory result',
        subtitle: firstString(record, ['doc_id', 'path', 'source_path', 'memory_id', 'agent_source', 'updated_at']),
        excerpt: firstString(record, ['excerpt', 'snippet', 'text', 'content', 'summary']) || preview(result),
        payload: result,
      })
    }
  }
  return items
}

function collectCompiledArtifacts(response: FabricSearchResponse | undefined): CompiledMemoryArtifact[] {
  if (!response) return []
  const values = response.scopes
    ? [response.scopes.business, response.scopes.personal]
    : [response]
  const artifacts: CompiledMemoryArtifact[] = []
  for (const value of values) {
    const envelope = asRecord(value)
    if (!envelope || envelope.error) continue
    const data = asRecord(envelope.data ?? value)
    const rows = Array.isArray(data?.artifacts) ? data.artifacts : []
    for (const row of rows) {
      if (asRecord(row)) artifacts.push(row as CompiledMemoryArtifact)
    }
  }
  return artifacts
}

function scopeLabel(scope: string): string {
  if (scope === 'business') return 'Business / Dev Server'
  if (scope === 'personal') return 'Personal / BigMac'
  return scope
}

export function KnowledgeFabricScreen() {
  const [query, setQuery] = useState('')
  const [scope, setScope] = useState<MemoryScopeChoice>('both')
  const [mode, setMode] = useState<SearchMode>('knowledge')
  const [agentSource, setAgentSource] = useState('')
  const [docId, setDocId] = useState('93c511d84bac0137bea74aa5c0c87de7')
  const [sessionSummary, setSessionSummary] = useState('')
  const [sessionScope, setSessionScope] = useState<SessionStateScope>('business')
  const [sessionAgentSource, setSessionAgentSource] = useState('Cael Web')
  const [sessionId, setSessionId] = useState('')
  const [sessionProject, setSessionProject] = useState('Hermes/Cael')
  const [compiledScope, setCompiledScope] = useState<MemoryScopeChoice>('business')
  const [compiledTruthStatus, setCompiledTruthStatus] = useState<CompiledTruthChoice>('candidate')
  const [compiledExportState, setCompiledExportState] = useState<CompiledExportChoice>('')

  const healthQuery = useQuery({
    queryKey: ['knowledge-fabric', 'health'],
    queryFn: () => readJson<FabricHealth>('/api/knowledge/fabric/health'),
    refetchInterval: 60_000,
  })

  const searchMutation = useMutation({
    mutationFn: async () => {
      const body = { query, maxResults: 8, mode: 'local', agentSource: agentSource || undefined }
      if (scope === 'both') {
        return await postJson<FabricSearchResponse>('/api/knowledge/fabric/search-all', body)
      }
      const endpoint = mode === 'agent' ? '/api/knowledge/fabric/agent-search' : '/api/knowledge/fabric/search'
      return await postJson<FabricSearchResponse>(endpoint, { ...body, memoryScope: scope })
    },
  })

  const documentMutation = useMutation({
    mutationFn: async () => {
      if (scope === 'both') {
        const [business, personal] = await Promise.allSettled([
          postJson<FabricSearchResponse>('/api/knowledge/fabric/document-record', { docId, memoryScope: 'business' }),
          postJson<FabricSearchResponse>('/api/knowledge/fabric/document-record', { docId, memoryScope: 'personal' }),
        ])
        return {
          ok: business.status === 'fulfilled' || personal.status === 'fulfilled',
          scopes: {
            business: business.status === 'fulfilled' ? business.value : { error: business.reason instanceof Error ? business.reason.message : String(business.reason) },
            personal: personal.status === 'fulfilled' ? personal.value : { error: personal.reason instanceof Error ? personal.reason.message : String(personal.reason) },
          },
        } satisfies FabricSearchResponse
      }
      return await postJson<FabricSearchResponse>('/api/knowledge/fabric/document-record', { docId, memoryScope: scope })
    },
  })

  const sessionStateMutation = useMutation({
    mutationFn: async () => postJson<FabricSessionStateResponse>('/api/knowledge/fabric/session-state', {
      summary: sessionSummary,
      memoryScope: sessionScope,
      agentSource: sessionAgentSource || undefined,
      sessionId: sessionId || undefined,
      project: sessionProject || undefined,
    }),
    onSuccess: () => setSessionSummary(''),
  })

  const compiledQuery = useQuery({
    queryKey: ['knowledge-fabric', 'compiled-memory', compiledScope, compiledTruthStatus, compiledExportState],
    queryFn: async () => {
      const body = {
        action: 'listCompiledMemoryArtifacts',
        truthStatus: compiledTruthStatus || undefined,
        gbrainExportState: compiledExportState || undefined,
        limit: 25,
      }
      if (compiledScope === 'both') {
        const [business, personal] = await Promise.allSettled([
          postJson<FabricSearchResponse>('/api/knowledge/fabric', { ...body, memoryScope: 'business' }),
          postJson<FabricSearchResponse>('/api/knowledge/fabric', { ...body, memoryScope: 'personal' }),
        ])
        return {
          ok: business.status === 'fulfilled' || personal.status === 'fulfilled',
          scopes: {
            business: business.status === 'fulfilled' ? business.value : { error: business.reason instanceof Error ? business.reason.message : String(business.reason) },
            personal: personal.status === 'fulfilled' ? personal.value : { error: personal.reason instanceof Error ? personal.reason.message : String(personal.reason) },
          },
        } satisfies FabricSearchResponse
      }
      return await postJson<FabricSearchResponse>('/api/knowledge/fabric', { ...body, memoryScope: compiledScope })
    },
    refetchInterval: 45_000,
  })

  const compiledActionMutation = useMutation({
    mutationFn: async ({ artifact, action }: { artifact: CompiledMemoryArtifact; action: CompiledAction }) => {
      const compiledArtifactId = asString(artifact.compiled_artifact_id)
      const memoryScope = asString(artifact.memory_scope) || (compiledScope === 'both' ? 'business' : compiledScope)
      if (!compiledArtifactId) throw new Error('compiled artifact id is missing')
      if (action === 'exported') {
        return await postJson<FabricSearchResponse>('/api/knowledge/fabric', {
          action: 'markCompiledMemoryGbrainExported',
          compiledArtifactId,
          memoryScope,
          exportState: 'exported',
        })
      }
      const updates: Record<CompiledAction, Record<string, string>> = {
        promote: { truthStatus: 'current', freshnessState: 'fresh', gbrainExportState: 'pending', reviewNote: 'Promoted by Cael memory-steward for gbrain indexing.' },
        stale: { truthStatus: 'stale', freshnessState: 'stale', gbrainExportState: 'blocked', reviewNote: 'Marked stale by Cael memory-steward.' },
        conflict: { truthStatus: 'conflict', freshnessState: 'conflict', gbrainExportState: 'blocked', reviewNote: 'Marked conflict by Cael memory-steward.' },
        reject: { truthStatus: 'rejected', freshnessState: 'obsolete', gbrainExportState: 'skipped', reviewNote: 'Rejected by Cael memory-steward.' },
        exported: {},
      }
      return await postJson<FabricSearchResponse>('/api/knowledge/fabric', {
        action: 'updateCompiledMemoryArtifactState',
        compiledArtifactId,
        memoryScope,
        ...updates[action],
      })
    },
    onSuccess: () => void compiledQuery.refetch(),
  })

  const items = useMemo(() => collectItems(searchMutation.data), [searchMutation.data])
  const documentItems = useMemo(() => collectItems(documentMutation.data), [documentMutation.data])
  const compiledArtifacts = useMemo(() => collectCompiledArtifacts(compiledQuery.data), [compiledQuery.data])
  const routeScopes = healthQuery.data?.scopes ?? {}

  return (
    <div className="min-h-full overflow-y-auto bg-surface text-ink">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-4 px-4 py-6 sm:px-6 lg:px-8">
        <section className="rounded-2xl border border-primary-200 bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary-500 dark:text-neutral-400">
                <HugeiconsIcon icon={BrainIcon} size={16} /> Knowledge Vault Memory Fabric
              </div>
              <h2 className="text-xl font-semibold">Scoped second brain</h2>
              <p className="mt-2 text-sm text-primary-600 dark:text-neutral-300">
                Hermes routes business memory to Dev Server and personal memory to BigMac. Mixed searches query both scopes separately and keep the source plane attached to every result.
              </p>
            </div>
            <button
              type="button"
              onClick={() => void healthQuery.refetch()}
              className="rounded-lg border border-primary-200 px-3 py-2 text-sm hover:bg-primary-50 dark:border-neutral-700 dark:hover:bg-neutral-900"
            >
              Refresh health
            </button>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <StatusCard title="Endpoint" value={healthQuery.data?.endpoint || 'https://memory.visualgraphx.com'} detail={preview(healthQuery.data?.health, 120)} state={healthQuery.data?.ok ? 'Online' : 'Check'} />
            <StatusCard title="Business scope" value="Dev Server" detail={preview(routeScopes.business, 120)} state={routeScopes.business ? 'Routed' : 'Unknown'} />
            <StatusCard title="Personal scope" value="BigMac" detail={preview(routeScopes.personal, 120)} state={routeScopes.personal ? 'Routed' : 'Unknown'} />
          </div>
          {healthQuery.data?.warning || healthQuery.error ? (
            <div className="mt-3 rounded-xl border border-amber-300/50 bg-amber-100/30 p-3 text-sm text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200">
              {healthQuery.data?.warning || (healthQuery.error instanceof Error ? healthQuery.error.message : 'Memory Fabric health unavailable')}
            </div>
          ) : null}
        </section>

        <section className="rounded-2xl border border-primary-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-950">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
                <HugeiconsIcon icon={BrainIcon} size={18} /> Compiled memory queue
              </div>
              <p className="max-w-2xl text-sm text-primary-600 dark:text-neutral-300">
                Review-gated current-truth artifacts for Cael and gbrain, backed by Knowledge Vault source evidence.
              </p>
            </div>
            <div className="grid gap-2 sm:grid-cols-3">
              <select value={compiledScope} onChange={(event) => setCompiledScope(event.target.value as MemoryScopeChoice)} className="rounded-xl border border-primary-200 bg-white px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900">
                <option value="business">Business</option>
                <option value="personal">Personal</option>
                <option value="both">Both</option>
              </select>
              <select value={compiledTruthStatus} onChange={(event) => setCompiledTruthStatus(event.target.value as CompiledTruthChoice)} className="rounded-xl border border-primary-200 bg-white px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900">
                <option value="candidate">Candidates</option>
                <option value="current">Current</option>
                <option value="stale">Stale</option>
                <option value="conflict">Conflict</option>
                <option value="rejected">Rejected</option>
                <option value="superseded">Superseded</option>
                <option value="">Any truth</option>
              </select>
              <select value={compiledExportState} onChange={(event) => setCompiledExportState(event.target.value as CompiledExportChoice)} className="rounded-xl border border-primary-200 bg-white px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900">
                <option value="">Any export</option>
                <option value="pending">Pending</option>
                <option value="exported">Exported</option>
                <option value="failed">Failed</option>
                <option value="blocked">Blocked</option>
                <option value="skipped">Skipped</option>
              </select>
            </div>
          </div>
          {compiledQuery.isError ? (
            <div className="mt-3 rounded-xl border border-amber-300/50 bg-amber-100/30 p-3 text-sm text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200">
              {compiledQuery.error instanceof Error ? compiledQuery.error.message : 'Compiled memory queue unavailable'}
            </div>
          ) : null}
          <CompiledMemoryQueue
            artifacts={compiledArtifacts}
            loading={compiledQuery.isFetching}
            actionPending={compiledActionMutation.isPending}
            onRefresh={() => void compiledQuery.refetch()}
            onAction={(artifact, action) => compiledActionMutation.mutate({ artifact, action })}
          />
        </section>

        <section className="rounded-2xl border border-primary-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-950">
          <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_180px_180px]">
            <label className="flex min-w-0 flex-col gap-1 text-sm">
              <span className="font-medium">Search</span>
              <div className="flex items-center gap-2 rounded-xl border border-primary-200 px-3 py-2 dark:border-neutral-700">
                <HugeiconsIcon icon={Search01Icon} size={18} className="text-primary-500 dark:text-neutral-400" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' && query.trim()) searchMutation.mutate()
                  }}
                  placeholder="Search Memory Fabric..."
                  className="min-w-0 flex-1 bg-transparent text-sm outline-none"
                />
              </div>
            </label>
            <label className="flex flex-col gap-1 text-sm">
              <span className="font-medium">Scope</span>
              <select value={scope} onChange={(event) => setScope(event.target.value as MemoryScopeChoice)} className="rounded-xl border border-primary-200 bg-white px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900">
                <option value="both">Both scopes</option>
                <option value="business">Business</option>
                <option value="personal">Personal</option>
              </select>
            </label>
            <label className="flex flex-col gap-1 text-sm">
              <span className="font-medium">Mode</span>
              <select value={mode} onChange={(event) => setMode(event.target.value as SearchMode)} disabled={scope === 'both'} className="rounded-xl border border-primary-200 bg-white px-3 py-2 text-sm disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900">
                <option value="knowledge">Knowledge</option>
                <option value="agent">Agent memory</option>
              </select>
            </label>
          </div>
          {mode === 'agent' && scope !== 'both' ? (
            <label className="mt-3 flex max-w-sm flex-col gap-1 text-sm">
              <span className="font-medium">Agent source</span>
              <input value={agentSource} onChange={(event) => setAgentSource(event.target.value)} placeholder="codex, claude, gemini, cael" className="rounded-xl border border-primary-200 bg-white px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900" />
            </label>
          ) : null}
          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" disabled={!query.trim() || searchMutation.isPending} onClick={() => searchMutation.mutate()} className="rounded-lg bg-primary-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-40 dark:bg-primary-100 dark:text-primary-950">
              Search fabric
            </button>
            {searchMutation.isError ? <span className="self-center text-sm text-red-600">{searchMutation.error instanceof Error ? searchMutation.error.message : 'Search failed'}</span> : null}
          </div>
        </section>

        {items.length > 0 ? <ResultGrid title="Results" icon={Message01Icon} items={items} /> : null}

        <section className="rounded-2xl border border-primary-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-950">
          <div className="flex flex-col gap-3 md:flex-row md:items-end">
            <label className="flex min-w-0 flex-1 flex-col gap-1 text-sm">
              <span className="font-medium">Document record</span>
              <input value={docId} onChange={(event) => setDocId(event.target.value)} className="rounded-xl border border-primary-200 bg-white px-3 py-2 font-mono text-sm dark:border-neutral-700 dark:bg-neutral-900" />
            </label>
            <button type="button" disabled={!docId.trim() || documentMutation.isPending} onClick={() => documentMutation.mutate()} className="rounded-lg border border-primary-200 px-4 py-2 text-sm font-medium hover:bg-primary-50 disabled:opacity-40 dark:border-neutral-700 dark:hover:bg-neutral-900">
              Lookup record
            </button>
          </div>
          {documentMutation.isError ? <div className="mt-3 text-sm text-red-600">{documentMutation.error instanceof Error ? documentMutation.error.message : 'Lookup failed'}</div> : null}
        </section>

        {documentItems.length > 0 ? <ResultGrid title="Document" icon={File01Icon} items={documentItems} /> : null}

        <section className="rounded-2xl border border-primary-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-950">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
            <HugeiconsIcon icon={Message01Icon} size={18} /> Record session state
          </div>
          <textarea
            value={sessionSummary}
            onChange={(event) => setSessionSummary(event.target.value)}
            rows={4}
            placeholder="Summarize the agent/session state to persist for future Cael, Codex, Claude, or Gemini work..."
            className="w-full rounded-xl border border-primary-200 bg-white px-3 py-2 text-sm outline-none focus:border-primary-500 dark:border-neutral-700 dark:bg-neutral-900"
          />
          <div className="mt-3 grid gap-3 lg:grid-cols-[160px_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_auto]">
            <label className="flex flex-col gap-1 text-sm">
              <span className="font-medium">Scope</span>
              <select value={sessionScope} onChange={(event) => setSessionScope(event.target.value as SessionStateScope)} className="rounded-xl border border-primary-200 bg-white px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900">
                <option value="business">Business</option>
                <option value="personal">Personal</option>
              </select>
            </label>
            <label className="flex min-w-0 flex-col gap-1 text-sm">
              <span className="font-medium">Agent source</span>
              <input value={sessionAgentSource} onChange={(event) => setSessionAgentSource(event.target.value)} className="rounded-xl border border-primary-200 bg-white px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900" />
            </label>
            <label className="flex min-w-0 flex-col gap-1 text-sm">
              <span className="font-medium">Session id</span>
              <input value={sessionId} onChange={(event) => setSessionId(event.target.value)} placeholder="optional" className="rounded-xl border border-primary-200 bg-white px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900" />
            </label>
            <label className="flex min-w-0 flex-col gap-1 text-sm">
              <span className="font-medium">Project</span>
              <input value={sessionProject} onChange={(event) => setSessionProject(event.target.value)} className="rounded-xl border border-primary-200 bg-white px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900" />
            </label>
            <button type="button" disabled={!sessionSummary.trim() || sessionStateMutation.isPending} onClick={() => sessionStateMutation.mutate()} className="self-end rounded-lg bg-primary-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-40 dark:bg-primary-100 dark:text-primary-950">
              {sessionStateMutation.isPending ? 'Recording...' : 'Record'}
            </button>
          </div>
          {sessionStateMutation.data || sessionStateMutation.isError ? (
            <div className={`mt-3 rounded-xl border p-3 text-sm ${sessionStateMutation.data?.ok === false || sessionStateMutation.isError ? 'border-amber-300/50 bg-amber-100/30 text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200' : 'border-emerald-300/50 bg-emerald-100/30 text-emerald-800 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-200'}`}>
              {sessionStateMutation.isError
                ? sessionStateMutation.error instanceof Error ? sessionStateMutation.error.message : 'Session state write failed'
                : sessionStateMutation.data?.data || sessionStateMutation.data?.error || 'Knowledge Fabric accepted the session-state receipt.'}
            </div>
          ) : null}
        </section>
      </div>
    </div>
  )
}

function StatusCard({ title, value, detail, state }: { title: string; value: string; detail: string; state: string }) {
  return (
    <div className="rounded-xl border border-primary-200 bg-primary-50 p-3 dark:border-neutral-800 dark:bg-neutral-900/70">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-xs uppercase tracking-[0.16em] text-primary-500 dark:text-neutral-500">{title}</div>
          <div className="mt-1 truncate text-sm font-semibold">{value}</div>
        </div>
        <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-300">{state}</span>
      </div>
      <pre className="mt-2 max-h-16 overflow-hidden whitespace-pre-wrap text-xs text-primary-600 dark:text-neutral-400">{detail}</pre>
    </div>
  )
}

function ResultGrid({ title, icon, items }: { title: string; icon: typeof Message01Icon; items: SearchItem[] }) {
  return (
    <section className="rounded-2xl border border-primary-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-950">
      <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
        <HugeiconsIcon icon={icon} size={18} /> {title}
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {items.map((item, index) => (
          <details key={`${item.scope}:${item.title}:${index}`} className="rounded-xl border border-primary-200 bg-primary-50 p-3 dark:border-neutral-800 dark:bg-neutral-900/70">
            <summary className="cursor-pointer list-none">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-xs font-medium uppercase tracking-[0.14em] text-primary-500 dark:text-neutral-500">{scopeLabel(item.scope)}</div>
                  <div className="mt-1 line-clamp-2 text-sm font-semibold">{item.title}</div>
                  {item.subtitle ? <div className="mt-1 truncate font-mono text-xs text-primary-500 dark:text-neutral-500">{item.subtitle}</div> : null}
                </div>
              </div>
              <p className="mt-2 line-clamp-4 text-sm text-primary-600 dark:text-neutral-300">{item.excerpt}</p>
            </summary>
            <pre className="mt-3 max-h-72 overflow-auto rounded-lg bg-white p-3 text-xs dark:bg-neutral-950">{preview(item.payload, 2000)}</pre>
          </details>
        ))}
      </div>
    </section>
  )
}

function statusPill(value: string, fallback: string) {
  return value || fallback
}

function CompiledMemoryQueue({
  artifacts,
  loading,
  actionPending,
  onRefresh,
  onAction,
}: {
  artifacts: CompiledMemoryArtifact[]
  loading: boolean
  actionPending: boolean
  onRefresh: () => void
  onAction: (artifact: CompiledMemoryArtifact, action: CompiledAction) => void
}) {
  return (
    <div className="mt-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="text-sm text-primary-600 dark:text-neutral-400">
          {loading ? 'Refreshing...' : `${artifacts.length} artifacts`}
        </div>
        <button type="button" onClick={onRefresh} className="rounded-lg border border-primary-200 px-3 py-2 text-sm hover:bg-primary-50 dark:border-neutral-700 dark:hover:bg-neutral-900">
          Refresh
        </button>
      </div>
      {artifacts.length === 0 ? (
        <div className="rounded-xl border border-dashed border-primary-200 p-4 text-sm text-primary-500 dark:border-neutral-800 dark:text-neutral-400">
          No compiled memory artifacts match this filter.
        </div>
      ) : (
        <div className="grid gap-3 lg:grid-cols-2">
          {artifacts.map((artifact) => {
            const id = asString(artifact.compiled_artifact_id)
            const sourceCount = Array.isArray(artifact.sources) ? artifact.sources.length : 0
            return (
              <details key={id || `${artifact.title}:${artifact.updated_at}`} className="rounded-xl border border-primary-200 bg-primary-50 p-3 dark:border-neutral-800 dark:bg-neutral-900/70">
                <summary className="cursor-pointer list-none">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-xs font-medium uppercase tracking-[0.14em] text-primary-500 dark:text-neutral-500">
                        {scopeLabel(asString(artifact.memory_scope))} · {asString(artifact.workspace) || 'workspace'}
                      </div>
                      <div className="mt-1 line-clamp-2 text-sm font-semibold">{asString(artifact.title) || id || 'Compiled memory'}</div>
                      <div className="mt-2 flex flex-wrap gap-2 text-xs">
                        <span className="rounded-full bg-white px-2 py-1 text-primary-700 dark:bg-neutral-950 dark:text-neutral-300">{statusPill(asString(artifact.truth_status), 'truth')}</span>
                        <span className="rounded-full bg-white px-2 py-1 text-primary-700 dark:bg-neutral-950 dark:text-neutral-300">{statusPill(asString(artifact.freshness_state), 'freshness')}</span>
                        <span className="rounded-full bg-white px-2 py-1 text-primary-700 dark:bg-neutral-950 dark:text-neutral-300">{statusPill(asString(artifact.gbrain_export_state), 'gbrain')}</span>
                        <span className="rounded-full bg-white px-2 py-1 text-primary-700 dark:bg-neutral-950 dark:text-neutral-300">{sourceCount} sources</span>
                      </div>
                    </div>
                  </div>
                  <p className="mt-2 line-clamp-4 text-sm text-primary-600 dark:text-neutral-300">{preview(artifact.content, 320)}</p>
                </summary>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button type="button" disabled={actionPending} onClick={() => onAction(artifact, 'promote')} className="rounded-lg bg-primary-900 px-3 py-2 text-xs font-medium text-white disabled:opacity-40 dark:bg-primary-100 dark:text-primary-950">
                    Promote
                  </button>
                  <button type="button" disabled={actionPending} onClick={() => onAction(artifact, 'stale')} className="rounded-lg border border-primary-200 px-3 py-2 text-xs font-medium hover:bg-primary-100 disabled:opacity-40 dark:border-neutral-700 dark:hover:bg-neutral-800">
                    Stale
                  </button>
                  <button type="button" disabled={actionPending} onClick={() => onAction(artifact, 'conflict')} className="rounded-lg border border-primary-200 px-3 py-2 text-xs font-medium hover:bg-primary-100 disabled:opacity-40 dark:border-neutral-700 dark:hover:bg-neutral-800">
                    Conflict
                  </button>
                  <button type="button" disabled={actionPending} onClick={() => onAction(artifact, 'reject')} className="rounded-lg border border-primary-200 px-3 py-2 text-xs font-medium hover:bg-primary-100 disabled:opacity-40 dark:border-neutral-700 dark:hover:bg-neutral-800">
                    Reject
                  </button>
                  <button type="button" disabled={actionPending} onClick={() => onAction(artifact, 'exported')} className="rounded-lg border border-emerald-300 px-3 py-2 text-xs font-medium text-emerald-700 hover:bg-emerald-50 disabled:opacity-40 dark:border-emerald-700 dark:text-emerald-300 dark:hover:bg-emerald-950/40">
                    Mark exported
                  </button>
                </div>
                <pre className="mt-3 max-h-72 overflow-auto rounded-lg bg-white p-3 text-xs dark:bg-neutral-950">{preview(artifact, 2400)}</pre>
              </details>
            )
          })}
        </div>
      )}
    </div>
  )
}
