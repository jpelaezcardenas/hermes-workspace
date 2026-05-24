import type { CommandCenterContract } from './command-center-contract'
import { listRecentPersistedRuns, type PersistedRunState } from './run-store'

export type CommandCenterEnvelope<T> = {
  ok: boolean
  generatedAt: string
  source: string
  scope: 'personal' | 'business' | 'mixed' | 'system'
  data: T | null
  warnings: string[]
  errors: string[]
  links?: Array<{
    label: string
    href: string
    kind: 'local' | 'tailscale' | 'external'
  }>
}

export type CommandCenterSummarySystem = {
  id: string
  label: string
  ok: boolean
  lane: string
  owner: string
  detail: string
  latencyMs: number | null
}

export type CommandCenterSummaryIntegration = {
  id: string
  label: string
  status: string
  detail: string
  safeMode: string
}

export type CommandCenterSummaryUsageProvider = {
  id: string
  label: string
  status: string
  confidence: string
  monitorKind: string | null
  caelDefault: boolean
  caelModel: string | null
  primary: {
    label: string
    usedPercent: number
    remainingPercent: number
    resetsAt: string | null
  } | null
}

export type CommandCenterSummaryUsage = {
  enabledProviders: string[]
  providers: CommandCenterSummaryUsageProvider[]
}

export type CommandCenterSummaryAutomation = {
  id: string
  label: string
  ok: boolean
  scope: string
  boundary: string
  failures: number
}

export type CommandCenterSummaryActionGate = {
  id: string
  label: string
  source: string
  status: string
  riskLevel: string
  approvalRequired: boolean
  dryRunSupported: boolean
  detail: string
}

export type CommandCenterSummaryAgentRun = {
  id: string
  title: string
  status: string
  updatedAt: string
  source: string
  path: string | null
}

export type CommandCenterSummaryBrainSource = {
  id: string
  label: string
  category: string
  status: string
  writable: boolean
}

export type CommandCenterSummaryNowNextItem = {
  id: string
  label: string
  detail: string
  tone: 'info' | 'success' | 'warning' | 'danger'
  href: string | null
}

export type CommandCenterSummaryHomebaseRecords = {
  status: 'planned' | 'degraded' | 'available'
  detail: string
  records: Array<{
    id: string
    label: string
    kind: string
    updatedAt: string | null
  }>
}

export type CommandCenterSummary = {
  version: string
  generatedAt: string
  contract: CommandCenterContract | null
  posture: {
    host: string
    bind: string
    remoteAccess: string
    auth: string
    publicInternet: string
  } | null
  systems: CommandCenterSummarySystem[]
  integrations: CommandCenterSummaryIntegration[]
  usage: CommandCenterSummaryUsage | null
  automations: {
    boundary: string
    instances: CommandCenterSummaryAutomation[]
  } | null
  brain: {
    sources: CommandCenterSummaryBrainSource[]
  } | null
  actionGates: CommandCenterSummaryActionGate[]
  agentRuns: CommandCenterSummaryAgentRun[]
  nowNext: CommandCenterSummaryNowNextItem[]
  homebaseRecords: CommandCenterSummaryHomebaseRecords
}

type JsonFetcher = (input: string | URL, init?: RequestInit) => Promise<Response>

type EndpointResult<T> = {
  data: T | null
  warnings: string[]
  errors: string[]
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value)
}

function readString(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback
}

function readNumber(value: unknown): number | null {
  return typeof value === 'number' && Number.isFinite(value) ? value : null
}

function readBoolean(value: unknown): boolean {
  return typeof value === 'boolean' ? value : false
}

function readArray(value: unknown): unknown[] {
  return Array.isArray(value) ? value : []
}

function linkKind(href: string): 'local' | 'tailscale' | 'external' {
  if (href.startsWith('/')) return 'local'
  if (href.includes('100.97.216.111') || href.includes('.ts.net')) return 'tailscale'
  return 'external'
}

async function fetchJson<T>(options: {
  baseUrl: string
  path: string
  label: string
  cookie?: string | null
  fetcher: JsonFetcher
  required?: boolean
  timeoutMs?: number
}): Promise<EndpointResult<T>> {
  const url = new URL(options.path, options.baseUrl)
  const controller = new AbortController()
  const timeout = setTimeout(
    () => controller.abort(),
    options.timeoutMs ?? 8000,
  )

  try {
    const headers: HeadersInit = { accept: 'application/json' }
    if (options.cookie) headers.cookie = options.cookie
    const response = await options.fetcher(url, {
      headers,
      signal: controller.signal,
      cache: 'no-store',
    })
    if (!response.ok) {
      const message = `${options.label}: HTTP ${response.status}`
      return {
        data: null,
        warnings: options.required ? [] : [message],
        errors: options.required ? [message] : [],
      }
    }
    return {
      data: (await response.json()) as T,
      warnings: [],
      errors: [],
    }
  } catch (error) {
    const message = `${options.label}: ${error instanceof Error ? error.message : String(error)}`
    return {
      data: null,
      warnings: options.required ? [] : [message],
      errors: options.required ? [message] : [],
    }
  } finally {
    clearTimeout(timeout)
  }
}

function normalizeSystems(status: unknown): CommandCenterSummarySystem[] {
  if (!isRecord(status)) return []
  return readArray(status.services)
    .filter(isRecord)
    .map((service) => ({
      id: readString(service.id, 'system'),
      label: readString(service.label, 'System'),
      ok: readBoolean(service.ok),
      lane: readString(service.lane, 'unknown'),
      owner: readString(service.owner, 'unknown'),
      detail: readString(service.detail, ''),
      latencyMs: readNumber(service.latencyMs),
    }))
}

function normalizeIntegrations(raw: unknown): CommandCenterSummaryIntegration[] {
  if (!isRecord(raw)) return []
  return readArray(raw.integrations)
    .filter(isRecord)
    .map((integration) => ({
      id: readString(integration.id, 'integration'),
      label: readString(integration.label, 'Integration'),
      status: readString(integration.status, 'unknown'),
      detail: readString(integration.detail, ''),
      safeMode: readString(integration.safeMode, ''),
    }))
}

function normalizeUsage(raw: unknown): CommandCenterSummaryUsage | null {
  if (!isRecord(raw)) return null
  const providers = readArray(raw.providers)
    .filter(isRecord)
    .map((provider) => {
      const primary = isRecord(provider.primary) ? provider.primary : null
      return {
        id: readString(provider.id, 'provider'),
        label: readString(provider.label, 'Provider'),
        status: readString(provider.status, 'unknown'),
        confidence: readString(provider.confidence, 'unknown'),
        monitorKind: readString(provider.monitorKind) || null,
        caelDefault: readBoolean(provider.caelDefault),
        caelModel: readString(provider.caelModel) || null,
        primary: primary
          ? {
              label: readString(primary.label, 'Usage'),
              usedPercent: readNumber(primary.usedPercent) ?? 0,
              remainingPercent: readNumber(primary.remainingPercent) ?? 0,
              resetsAt: readString(primary.resetsAt) || null,
            }
          : null,
      }
    })
  return {
    enabledProviders: readArray(raw.enabledProviders).filter(
      (value): value is string => typeof value === 'string',
    ),
    providers,
  }
}

function normalizeAutomations(raw: unknown): {
  boundary: string
  instances: CommandCenterSummaryAutomation[]
} | null {
  if (!isRecord(raw)) return null
  return {
    boundary: readString(raw.boundary),
    instances: readArray(raw.instances)
      .filter(isRecord)
      .map((instance) => {
        const health = isRecord(instance.health) ? instance.health : {}
        return {
          id: readString(instance.id, 'automation'),
          label: readString(instance.label, 'Automation'),
          ok: readBoolean(health.ok),
          scope: readString(instance.scope),
          boundary: readString(instance.boundary),
          failures: readArray(instance.failures).length,
        }
      }),
  }
}

function normalizeActionGates(raw: unknown): CommandCenterSummaryActionGate[] {
  if (!isRecord(raw)) return []
  return readArray(raw.safeWorkflowCommands)
    .filter(isRecord)
    .filter((command) => readBoolean(command.approvalRequired))
    .map((command) => ({
      id: readString(command.id, 'action-gate'),
      label: readString(command.label, 'Action gate'),
      source: 'n8n-governance',
      status: readString(command.status, 'approval_gated'),
      riskLevel: readString(command.riskLevel, 'unknown'),
      approvalRequired: readBoolean(command.approvalRequired),
      dryRunSupported: readBoolean(command.dryRunSupported),
      detail: readString(command.description),
    }))
}

function normalizeAgentRuns(raw: unknown): CommandCenterSummaryAgentRun[] {
  if (!isRecord(raw)) return []
  return readArray(raw.promotionReceipts)
    .filter(isRecord)
    .slice(0, 8)
    .map((receipt) => ({
      id: readString(receipt.path, readString(receipt.title, 'receipt')),
      title: readString(receipt.title, 'Receipt'),
      status: readString(receipt.instance, 'unknown'),
      updatedAt: readString(receipt.updatedAt),
      source: 'receipt',
      path: readString(receipt.path) || null,
    }))
}

function persistedRunToSummaryRun(
  run: PersistedRunState,
): CommandCenterSummaryAgentRun {
  return {
    id: `cael-chat:${run.runId}`,
    title: `Chat run ${run.friendlyId || run.sessionKey}`,
    status: run.status,
    updatedAt: new Date(
      run.updatedAt || run.lastEventAt || run.createdAt,
    ).toISOString(),
    source: 'cael-chat',
    path: null,
  }
}

function normalizeBrainSources(raw: unknown): CommandCenterSummaryBrainSource[] {
  if (!isRecord(raw)) return []
  return readArray(raw.sources)
    .filter(isRecord)
    .map((source) => ({
      id: readString(source.id, 'source'),
      label: readString(source.label, 'Source'),
      category: readString(source.category, 'unknown'),
      status: readString(source.status, 'unknown'),
      writable: readBoolean(source.writable),
    }))
}

function buildNowNext(input: {
  status: unknown
  usage: CommandCenterSummaryUsage | null
  actionGates: CommandCenterSummaryActionGate[]
  automations: ReturnType<typeof normalizeAutomations>
  brainSources: CommandCenterSummaryBrainSource[]
}): CommandCenterSummaryNowNextItem[] {
  const items: CommandCenterSummaryNowNextItem[] = []
  const statusOk = isRecord(input.status) ? readBoolean(input.status.ok) : false
  items.push({
    id: 'runtime-posture',
    label: statusOk ? 'Runtime ready' : 'Runtime needs attention',
    detail: statusOk
      ? 'Core Cael workspace checks are currently online.'
      : 'One or more Cael workspace checks require review.',
    tone: statusOk ? 'success' : 'warning',
    href: '/cael-home',
  })

  const activeProvider = input.usage?.providers.find(
    (provider) => provider.caelDefault,
  )
  if (activeProvider) {
    items.push({
      id: 'active-provider',
      label: 'Active model monitor',
      detail: `${activeProvider.label}${activeProvider.caelModel ? ` / ${activeProvider.caelModel}` : ''}`,
      tone: activeProvider.status === 'ok' ? 'success' : 'warning',
      href: '/usage',
    })
  }

  items.push({
    id: 'action-gates',
    label: `${input.actionGates.length} approval gate${input.actionGates.length === 1 ? '' : 's'}`,
    detail: input.actionGates.length
      ? 'Review gated workflow actions before mutation.'
      : 'No approval-gated workflow commands are currently pending in the registry.',
    tone: input.actionGates.length ? 'warning' : 'success',
    href: '/cael-home',
  })

  const unhealthyAutomations =
    input.automations?.instances.filter((instance) => !instance.ok).length ?? 0
  items.push({
    id: 'automation-health',
    label: unhealthyAutomations
      ? `${unhealthyAutomations} automation lane${unhealthyAutomations === 1 ? '' : 's'} down`
      : 'Automation lanes checked',
    detail: input.automations?.boundary || 'n8n governance snapshot unavailable.',
    tone: unhealthyAutomations ? 'warning' : 'info',
    href: '/cael-home',
  })

  const availableBrainSources = input.brainSources.filter(
    (source) => source.status === 'available',
  ).length
  items.push({
    id: 'brain-sources',
    label: `${availableBrainSources} brain source${availableBrainSources === 1 ? '' : 's'} available`,
    detail: 'Second-brain sources are exposed as references, not raw secret stores.',
    tone: availableBrainSources ? 'success' : 'warning',
    href: '/memory',
  })

  return items
}

export async function buildCommandCenterSummary(options: {
  requestUrl: string
  cookie?: string | null
  fetcher?: JsonFetcher
  includeChatRuns?: boolean
}): Promise<CommandCenterEnvelope<CommandCenterSummary>> {
  const generatedAt = new Date().toISOString()
  const fetcher = options.fetcher ?? fetch
  const baseUrl = new URL(options.requestUrl).origin

  const [status, usageRaw, integrationsRaw, n8nRaw, brainRaw] =
    await Promise.all([
      fetchJson<Record<string, unknown>>({
        baseUrl,
        path: '/api/cael-status',
        label: 'Cael status',
        cookie: options.cookie,
        fetcher,
        timeoutMs: 2500,
      }),
      fetchJson<Record<string, unknown>>({
        baseUrl,
        path: '/api/usage/limits',
        label: 'Usage limits',
        cookie: options.cookie,
        fetcher,
      }),
      fetchJson<Record<string, unknown>>({
        baseUrl,
        path: '/api/integrations/status',
        label: 'Integrations',
        cookie: options.cookie,
        fetcher,
      }),
      fetchJson<Record<string, unknown>>({
        baseUrl,
        path: '/api/cael-n8n-governance',
        label: 'n8n governance',
        cookie: options.cookie,
        fetcher,
        timeoutMs: 2500,
      }),
      fetchJson<Record<string, unknown>>({
        baseUrl,
        path: '/api/second-brain/sources',
        label: 'Second brain sources',
        cookie: options.cookie,
        fetcher,
      }),
    ])

  const warnings = [
    ...status.warnings,
    ...usageRaw.warnings,
    ...integrationsRaw.warnings,
    ...n8nRaw.warnings,
    ...brainRaw.warnings,
  ]
  const errors = [
    ...status.errors,
    ...usageRaw.errors,
    ...integrationsRaw.errors,
    ...n8nRaw.errors,
    ...brainRaw.errors,
  ]

  const usage = normalizeUsage(usageRaw.data)
  const automations = normalizeAutomations(n8nRaw.data)
  const actionGates = normalizeActionGates(n8nRaw.data)
  const chatRuns =
    options.includeChatRuns === false
      ? []
      : (await listRecentPersistedRuns(8)).map(persistedRunToSummaryRun)
  const agentRuns = [...chatRuns, ...normalizeAgentRuns(n8nRaw.data)]
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    .slice(0, 12)
  const brainSources = normalizeBrainSources(brainRaw.data)
  const statusData = status.data
  const posture = isRecord(statusData)
    ? {
        host: readString(statusData.host, 'unknown'),
        bind: readString(isRecord(statusData.posture) ? statusData.posture.bind : ''),
        remoteAccess: readString(
          isRecord(statusData.posture) ? statusData.posture.remoteAccess : '',
        ),
        auth: readString(isRecord(statusData.posture) ? statusData.posture.auth : ''),
        publicInternet: readString(
          isRecord(statusData.posture)
            ? statusData.posture.publicInternet
            : '',
        ),
      }
    : null

  if (isRecord(integrationsRaw.data) && !readBoolean(integrationsRaw.data.ok)) {
    warnings.push('Integrations reported setup-needed or degraded providers.')
  }
  if (isRecord(n8nRaw.data) && !readBoolean(n8nRaw.data.ok)) {
    warnings.push('One or more n8n automation lanes reported degraded health.')
  }

  const links = isRecord(statusData)
    ? readArray(statusData.links)
        .filter(isRecord)
        .map((link) => ({
          label: readString(link.label, 'Link'),
          href: readString(link.href, '#'),
          kind: linkKind(readString(link.href, '#')),
        }))
    : []

  const summary: CommandCenterSummary = {
    version: '2026-05-24.phase1',
    generatedAt,
    contract: isRecord(statusData)
      ? ((statusData.contract ?? null) as CommandCenterContract | null)
      : null,
    posture,
    systems: normalizeSystems(statusData),
    integrations: normalizeIntegrations(integrationsRaw.data),
    usage,
    automations,
    brain: { sources: brainSources },
    actionGates,
    agentRuns,
    nowNext: buildNowNext({
      status: statusData,
      usage,
      actionGates,
      automations,
      brainSources,
    }),
    homebaseRecords: {
      status: 'planned',
      detail:
        'Twenty/Homebase records remain legacy migration inputs until the safe server-side adapter is folded into this contract.',
      records: [],
    },
  }

  return {
    ok: errors.length === 0 && warnings.length === 0,
    generatedAt,
    source: 'cael-workspace:3077',
    scope: 'mixed',
    // A command-center response is a state snapshot, not an all-or-nothing
    // transport contract. Keep partial summaries renderable so Desktop/Web can
    // show degraded subsystems instead of failing the whole command center.
    data: summary,
    warnings,
    errors,
    links,
  }
}
