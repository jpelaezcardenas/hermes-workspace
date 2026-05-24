import { createFileRoute } from '@tanstack/react-router'
import { requireLocalOrAuth } from '@/server/auth-middleware'
import { getProviderUsage } from '@/server/provider-usage'
import type { ProviderStatus, ProviderUsageResult, UsageLine } from '@/server/provider-usage'

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

type UsageBadge = {
  label: string
  value: string
  color?: string
}

type UsageProviderCard = {
  id: string
  label: string
  status: ProviderStatus
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
  primary: UsageWindow | null
  secondary: UsageWindow | null
  tertiary: UsageWindow | null
  usageRows: UsageWindow[]
  badges: UsageBadge[]
  creditsRemaining: number | null
  codeReviewRemainingPercent: number | null
  tokenUsage: {
    sessionCostUSD: number | null
    sessionTokens: number | null
    last30DaysCostUSD: number | null
    last30DaysTokens: number | null
  }
  dailyUsage: Array<{ dayKey: string; totalTokens: number | null; costUSD: number | null }>
}

type UsageLimitsResponse = {
  ok: boolean
  generatedAt: string
  enabledProviders: string[]
  providers: UsageProviderCard[]
}

function slug(input: string): string {
  return input.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'usage'
}

function toNumber(value: unknown): number | null {
  if (typeof value === 'number' && Number.isFinite(value)) return value
  if (typeof value === 'string') {
    const parsed = Number(value.replace(/[$,\s]/g, ''))
    if (Number.isFinite(parsed)) return parsed
  }
  return null
}

function unitFor(line: UsageLine): UsageWindow['unit'] {
  if (line.format === 'dollars') return 'dollars'
  if (line.format === 'tokens') return 'tokens'
  if (line.format === 'percent') return 'percent'
  return 'count'
}

function toWindow(line: UsageLine, index: number): UsageWindow | null {
  if (line.type !== 'progress') return null
  const used = toNumber(line.used)
  const limit = toNumber(line.limit)
  if (used === null || limit === null || limit <= 0) return null

  const usedPercent = line.format === 'percent'
    ? Math.max(0, Math.min(100, used))
    : Math.max(0, Math.min(100, (used / limit) * 100))

  return {
    id: `${slug(line.label)}-${index}`,
    label: line.label,
    used,
    limit,
    unit: unitFor(line),
    usedPercent,
    remainingPercent: Math.max(0, Math.min(100, 100 - usedPercent)),
    ...(line.resetsAt ? { resetsAt: line.resetsAt } : {}),
  }
}

function toBadge(line: UsageLine): UsageBadge | null {
  if (line.type === 'progress') return null
  if (!line.value) return null
  return { label: line.label, value: line.value, ...(line.color ? { color: line.color } : {}) }
}

function confidence(status: ProviderStatus): UsageProviderCard['confidence'] {
  if (status === 'ok') return 'live'
  if (status === 'missing_credentials') return 'missing'
  if (status === 'auth_expired' || status === 'error') return 'error'
  return 'configured'
}

function extractCredits(windows: UsageWindow[], badges: UsageBadge[]): number | null {
  const creditWindow = windows.find((window) => /credit/i.test(window.label))
  if (creditWindow) return Math.max(0, creditWindow.limit - creditWindow.used)
  const creditBadge = badges.find((badge) => /credit/i.test(`${badge.label} ${badge.value}`))
  return creditBadge ? toNumber(creditBadge.value) : null
}

function extractCodeReviewRemaining(windows: UsageWindow[]): number | null {
  const review = windows.find((window) => /review/i.test(window.label))
  return review ? review.remainingPercent : null
}

function toProviderCard(provider: ProviderUsageResult): UsageProviderCard {
  const windows = provider.lines
    .map((line, index) => toWindow(line, index))
    .filter((window): window is UsageWindow => Boolean(window))
  const badges = provider.lines
    .map(toBadge)
    .filter((badge): badge is UsageBadge => Boolean(badge))

  return {
    id: provider.provider,
    label: provider.displayName,
    status: provider.status,
    ...(provider.plan ? { plan: provider.plan } : {}),
    ...(provider.message ? { message: provider.message } : {}),
    ...(provider.caelConfigured !== undefined ? { caelConfigured: provider.caelConfigured } : {}),
    ...(provider.caelDefault !== undefined ? { caelDefault: provider.caelDefault } : {}),
    ...(provider.caelModel ? { caelModel: provider.caelModel } : {}),
    ...(provider.caelModels ? { caelModels: provider.caelModels } : {}),
    ...(provider.monitorKind ? { monitorKind: provider.monitorKind } : {}),
    updatedAt: new Date(provider.updatedAt).toISOString(),
    source: provider.caelDefault
      ? `Active Cael model: ${provider.caelModel ?? provider.provider}`
      : provider.caelConfigured
        ? `Configured Cael provider${provider.caelModel ? `: ${provider.caelModel}` : ''}`
        : 'External provider monitor',
    confidence: confidence(provider.status),
    primary: windows[0] ?? null,
    secondary: windows[1] ?? null,
    tertiary: windows[2] ?? null,
    usageRows: windows,
    badges,
    creditsRemaining: extractCredits(windows, badges),
    codeReviewRemainingPercent: extractCodeReviewRemaining(windows),
    tokenUsage: {
      sessionCostUSD: null,
      sessionTokens: null,
      last30DaysCostUSD: null,
      last30DaysTokens: null,
    },
    dailyUsage: [],
  }
}

export const Route = createFileRoute('/api/usage/limits')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        if (!requireLocalOrAuth(request)) {
          return Response.json({ ok: false, error: 'Authentication required' }, { status: 401 })
        }

        const url = new URL(request.url)
        const force = url.searchParams.get('force') === '1'
        const usage = await getProviderUsage(force)
        const providers = usage.providers.map(toProviderCard)

        return Response.json(
          {
            ok: usage.ok,
            generatedAt: new Date(usage.updatedAt).toISOString(),
            enabledProviders: providers
              .filter((provider) => provider.status === 'ok' && provider.caelConfigured !== false)
              .map((provider) => provider.id),
            providers,
          } satisfies UsageLimitsResponse,
          { status: 200 },
        )
      },
    },
  },
})
