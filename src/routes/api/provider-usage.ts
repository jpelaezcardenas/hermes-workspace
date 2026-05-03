import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import { isAuthenticated } from '../../server/auth-middleware'
import { safeErrorMessage } from '../../server/rate-limit'
import {
  SESSIONS_API_UNAVAILABLE_MESSAGE,
  ensureGatewayProbed,
  listSessions,
} from '../../server/claude-api'
import type { ClaudeSession } from '../../server/claude-api'

// ── Pricing (USD per 1M tokens) ──────────────────────────────────────────────
// Mirrors the table in src/components/usage-meter/usage-meter.tsx so the
// server-derived costs line up with what the UI would compute on its own.
const MODEL_PRICING: Record<string, { input: number; output: number }> = {
  'gpt-4o': { input: 5, output: 15 },
  'gpt-4o-mini': { input: 0.15, output: 0.6 },
  'gpt-4.1': { input: 3, output: 15 },
  'gpt-4.1-mini': { input: 0.3, output: 1.2 },
  'gpt-4.1-nano': { input: 0.1, output: 0.4 },
  o1: { input: 15, output: 60 },
  'o1-mini': { input: 3, output: 12 },
  'o3-mini': { input: 1.1, output: 4.4 },
  'claude-3.5-sonnet': { input: 3, output: 15 },
  'claude-3.5-haiku': { input: 0.8, output: 4 },
  'claude-3-opus': { input: 15, output: 75 },
}

const PROVIDER_DISPLAY: Record<string, string> = {
  openai: 'OpenAI',
  anthropic: 'Anthropic',
  google: 'Google',
  groq: 'Groq',
  ollama: 'Ollama',
  xai: 'xAI',
  mistral: 'Mistral',
  cohere: 'Cohere',
  unknown: 'Unknown',
}

function inferProviderFromModel(rawModel: string): {
  provider: string
  model: string
} {
  const model = (rawModel || '').trim()
  if (!model) return { provider: 'unknown', model: '' }
  const slash = model.indexOf('/')
  if (slash > 0) {
    return {
      provider: model.slice(0, slash).toLowerCase(),
      model: model.slice(slash + 1),
    }
  }
  const lower = model.toLowerCase()
  if (lower.startsWith('gpt-') || lower.startsWith('o1') || lower.startsWith('o3'))
    return { provider: 'openai', model }
  if (lower.startsWith('claude')) return { provider: 'anthropic', model }
  if (lower.startsWith('gemini')) return { provider: 'google', model }
  if (lower.startsWith('llama') || lower.startsWith('mistral') || lower.startsWith('mixtral'))
    return { provider: 'ollama', model }
  if (lower.startsWith('grok')) return { provider: 'xai', model }
  return { provider: 'unknown', model }
}

function calcCost(model: string, inTok: number, outTok: number): number {
  const key = model.trim().toLowerCase()
  const pricing = MODEL_PRICING[key]
  if (!pricing) return 0
  return (inTok / 1_000_000) * pricing.input + (outTok / 1_000_000) * pricing.output
}

// ── Aggregated response shape ────────────────────────────────────────────────
type RawAgg = {
  provider: string
  model: string
  sessions: number
  inputTokens: number
  outputTokens: number
  totalTokens: number
  costUsd: number
  lastUsed: number
}

type ProviderUsageEntry = {
  // Fields consumed by usage-meter.tsx / usage-details-modal.tsx
  provider: string
  displayName: string
  status: 'ok' | 'missing_credentials' | 'auth_expired' | 'error'
  message?: string
  plan?: string
  lines: Array<{
    type: 'progress' | 'text' | 'badge'
    label: string
    used?: number
    limit?: number
    format?: 'percent' | 'dollars' | 'tokens'
    value?: string
    color?: string
    resetsAt?: string
  }>
  updatedAt: number
  // Convenience fields requested in the original spec; harmless extras for the UI.
  model: string
  sessions: number
  totalTokens: number
  costUsd: number
  lastUsed: number
}

type CachedPayload = {
  ok: true
  providers: Array<ProviderUsageEntry>
  totalCostUsd: number
  generatedAt: number
  updatedAt: number
  fromCache: boolean
}

// ── In-memory cache ──────────────────────────────────────────────────────────
const CACHE_TTL_MS = 60_000
let _cache: { value: CachedPayload; at: number } | null = null

async function buildPayload(): Promise<CachedPayload> {
  const capabilities = await ensureGatewayProbed()
  let sessions: Array<ClaudeSession> = []
  if (capabilities.sessions) {
    try {
      sessions = await listSessions(200, 0)
    } catch {
      sessions = []
    }
  }

  const byKey = new Map<string, RawAgg>()
  for (const s of sessions) {
    const { provider, model } = inferProviderFromModel(s.model || '')
    const key = `${provider}::${model}`
    const inTok = s.input_tokens ?? 0
    const outTok = s.output_tokens ?? 0
    const lastTs =
      (s.last_active ?? s.ended_at ?? s.started_at ?? 0) * 1000

    let agg = byKey.get(key)
    if (!agg) {
      agg = {
        provider,
        model,
        sessions: 0,
        inputTokens: 0,
        outputTokens: 0,
        totalTokens: 0,
        costUsd: 0,
        lastUsed: 0,
      }
      byKey.set(key, agg)
    }
    agg.sessions += 1
    agg.inputTokens += inTok
    agg.outputTokens += outTok
    agg.totalTokens += inTok + outTok
    agg.costUsd += calcCost(model, inTok, outTok)
    if (lastTs > agg.lastUsed) agg.lastUsed = lastTs
  }

  const now = Date.now()
  let totalCost = 0
  const providers: Array<ProviderUsageEntry> = Array.from(byKey.values())
    .sort((a, b) => b.totalTokens - a.totalTokens)
    .map((a) => {
      totalCost += a.costUsd
      const displayName =
        PROVIDER_DISPLAY[a.provider] ||
        a.provider.charAt(0).toUpperCase() + a.provider.slice(1)
      return {
        provider: a.provider,
        displayName,
        status: 'ok' as const,
        lines: [
          { type: 'text', label: 'Model', value: a.model || '—' },
          { type: 'text', label: 'Sessions', value: String(a.sessions) },
          {
            type: 'text',
            label: 'Tokens',
            used: a.totalTokens,
            format: 'tokens',
          },
          { type: 'text', label: 'Cost', used: a.costUsd, format: 'dollars' },
        ],
        updatedAt: a.lastUsed || now,
        model: a.model,
        sessions: a.sessions,
        totalTokens: a.totalTokens,
        costUsd: a.costUsd,
        lastUsed: a.lastUsed || now,
      }
    })

  return {
    ok: true,
    providers,
    totalCostUsd: totalCost,
    generatedAt: now,
    updatedAt: now,
    fromCache: false,
  }
}

export const Route = createFileRoute('/api/provider-usage')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        if (!isAuthenticated(request)) {
          return json({ ok: false, error: 'Unauthorized' }, { status: 401 })
        }
        try {
          const url = new URL(request.url)
          const force = url.searchParams.get('force') === '1'
          const now = Date.now()
          if (!force && _cache && now - _cache.at < CACHE_TTL_MS) {
            return json({ ..._cache.value, fromCache: true })
          }
          const payload = await buildPayload()
          _cache = { value: payload, at: now }
          return json(payload)
        } catch (err) {
          // On gateway errors, return an empty (but well-formed) payload so
          // the UI degrades to "no providers connected" rather than blowing up.
          const message = safeErrorMessage(err)
          if (message === SESSIONS_API_UNAVAILABLE_MESSAGE) {
            const fallback: CachedPayload = {
              ok: true,
              providers: [],
              totalCostUsd: 0,
              generatedAt: Date.now(),
              updatedAt: Date.now(),
              fromCache: false,
            }
            return json(fallback)
          }
          return json(
            { ok: false, error: message, providers: [] },
            { status: 500 },
          )
        }
      },
    },
  },
})
