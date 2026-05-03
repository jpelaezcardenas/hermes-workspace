/**
 * Provider Validation API — `/api/validate-provider` (POST)
 *
 * Body shape (accepts both `provider` and the onboarding caller's
 * `providerId` — see provider-select-step.tsx:158):
 *   {
 *     provider?: string,    // canonical provider id
 *     providerId?: string,  // legacy alias used by onboarding
 *     apiKey: string,
 *     baseUrl?: string,
 *     model?: string,
 *   }
 *
 * Response:
 *   { ok: true, models?: string[] }
 *   { ok: false, error: string }
 *
 * Security: NEVER logs the raw apiKey. We log only `len=N suffix=XXXX`.
 *
 * Auth: same `isAuthenticated` guard used elsewhere.
 *
 * Phase 3D Lane A.
 */
import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import { isAuthenticated } from '../../server/auth-middleware'
import {
  requireJsonContentType,
  safeErrorMessage,
} from '../../server/rate-limit'

const TIMEOUT_MS = 5_000

type ValidateBody = {
  provider?: unknown
  providerId?: unknown
  apiKey?: unknown
  baseUrl?: unknown
  model?: unknown
}

type ProbeResult = {
  ok: boolean
  status?: number
  error?: string
  models?: string[]
}

function maskInfo(apiKey: string): string {
  const len = apiKey.length
  const suffix = len >= 4 ? apiKey.slice(-4) : '****'
  return `len=${len} suffix=${suffix}`
}

function trimSlash(u: string): string {
  return u.replace(/\/+$/, '')
}

async function probe(
  url: string,
  init: RequestInit,
): Promise<{ status: number; body: unknown; aborted?: boolean }> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
  try {
    const res = await fetch(url, { ...init, signal: controller.signal })
    let parsed: unknown = null
    try {
      const text = await res.text()
      parsed = text ? JSON.parse(text) : null
    } catch {
      parsed = null
    }
    return { status: res.status, body: parsed }
  } catch (err) {
    const aborted =
      err instanceof Error &&
      (err.name === 'AbortError' || /aborted/i.test(err.message))
    throw Object.assign(new Error(aborted ? 'timeout' : safeErrorMessage(err)), {
      aborted,
    })
  } finally {
    clearTimeout(timer)
  }
}

function extractModels(body: unknown): string[] | undefined {
  if (!body || typeof body !== 'object') return undefined
  const o = body as Record<string, unknown>
  // OpenAI / Anthropic / NVIDIA / Nous: { data: [{ id }] }
  if (Array.isArray(o.data)) {
    const ids = o.data
      .map((m) => (m && typeof m === 'object' ? (m as Record<string, unknown>).id : null))
      .filter((x): x is string => typeof x === 'string')
    if (ids.length > 0) return ids
  }
  // Anthropic alt: { models: [...] }
  if (Array.isArray(o.models)) {
    const ids = o.models
      .map((m) =>
        typeof m === 'string'
          ? m
          : m && typeof m === 'object'
            ? ((m as Record<string, unknown>).id as string | undefined) ??
              ((m as Record<string, unknown>).name as string | undefined)
            : undefined,
      )
      .filter((x): x is string => typeof x === 'string')
    if (ids.length > 0) return ids
  }
  return undefined
}

async function validateAnthropic(
  apiKey: string,
  baseUrl?: string,
): Promise<ProbeResult> {
  const url = `${trimSlash(baseUrl || 'https://api.anthropic.com')}/v1/models`
  const r = await probe(url, {
    method: 'GET',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      accept: 'application/json',
    },
  })
  if (r.status >= 200 && r.status < 300) {
    return { ok: true, status: r.status, models: extractModels(r.body) }
  }
  return {
    ok: false,
    status: r.status,
    error: `Anthropic returned HTTP ${r.status}`,
  }
}

async function validateOpenAILike(
  apiKey: string,
  baseUrl: string,
  label: string,
): Promise<ProbeResult> {
  const url = `${trimSlash(baseUrl)}/v1/models`
  const r = await probe(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      accept: 'application/json',
    },
  })
  if (r.status >= 200 && r.status < 300) {
    return { ok: true, status: r.status, models: extractModels(r.body) }
  }
  return {
    ok: false,
    status: r.status,
    error: `${label} returned HTTP ${r.status}`,
  }
}

async function validateGoogle(
  apiKey: string,
  baseUrl?: string,
): Promise<ProbeResult> {
  const url = `${trimSlash(baseUrl || 'https://generativelanguage.googleapis.com')}/v1beta/models`
  const r = await probe(url, {
    method: 'GET',
    headers: {
      'x-goog-api-key': apiKey,
      accept: 'application/json',
    },
  })
  if (r.status >= 200 && r.status < 300) {
    return { ok: true, status: r.status, models: extractModels(r.body) }
  }
  return {
    ok: false,
    status: r.status,
    error: `Google returned HTTP ${r.status}`,
  }
}

async function validate(
  provider: string,
  apiKey: string,
  baseUrl: string | undefined,
): Promise<ProbeResult> {
  const id = provider.toLowerCase()
  switch (id) {
    case 'anthropic':
      return validateAnthropic(apiKey, baseUrl)
    case 'openai':
    case 'openai-codex':
    case 'openrouter':
      return validateOpenAILike(
        apiKey,
        baseUrl ||
          (id === 'openrouter'
            ? 'https://openrouter.ai/api'
            : 'https://api.openai.com'),
        id,
      )
    case 'nvidia':
      return validateOpenAILike(
        apiKey,
        baseUrl || 'https://integrate.api.nvidia.com',
        'NVIDIA',
      )
    case 'nous':
      return validateOpenAILike(
        apiKey,
        baseUrl || 'https://inference-api.nousresearch.com',
        'Nous',
      )
    case 'google':
    case 'gemini':
      return validateGoogle(apiKey, baseUrl)
    case 'zai':
    case 'glm':
      return validateOpenAILike(
        apiKey,
        baseUrl || 'https://api.z.ai/api/paas',
        'Z.AI',
      )
    case 'kimi':
    case 'kimi-coding':
    case 'moonshot':
      return validateOpenAILike(
        apiKey,
        baseUrl || 'https://api.moonshot.ai',
        'Moonshot',
      )
    case 'minimax':
      return validateOpenAILike(
        apiKey,
        baseUrl || 'https://api.minimax.io',
        'MiniMax',
      )
    case 'minimax-cn':
      return validateOpenAILike(
        apiKey,
        baseUrl || 'https://api.minimax.chat',
        'MiniMax-CN',
      )
    case 'xiaomi':
      return validateOpenAILike(
        apiKey,
        baseUrl || 'https://api.mimo.xiaomi.com',
        'Xiaomi',
      )
    case 'custom':
      if (!baseUrl) {
        return { ok: false, error: 'custom provider requires baseUrl' }
      }
      return validateOpenAILike(apiKey, baseUrl, 'custom')
    default:
      return { ok: false, error: `Unsupported provider: ${provider}` }
  }
}

export const Route = createFileRoute('/api/validate-provider')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        if (!isAuthenticated(request)) {
          return json({ ok: false, error: 'Unauthorized' }, { status: 401 })
        }
        const csrf = requireJsonContentType(request)
        if (csrf) return csrf

        let body: ValidateBody
        try {
          body = (await request.json()) as ValidateBody
        } catch {
          return json({ ok: false, error: 'Invalid JSON body' }, { status: 400 })
        }

        const provider =
          typeof body.provider === 'string' && body.provider.trim()
            ? body.provider.trim()
            : typeof body.providerId === 'string'
              ? body.providerId.trim()
              : ''
        const apiKey =
          typeof body.apiKey === 'string' ? body.apiKey.trim() : ''
        const baseUrl =
          typeof body.baseUrl === 'string' && body.baseUrl.trim()
            ? body.baseUrl.trim()
            : undefined

        if (!provider) {
          return json(
            { ok: false, error: 'provider is required' },
            { status: 400 },
          )
        }
        if (!apiKey) {
          return json(
            { ok: false, error: 'apiKey is required' },
            { status: 400 },
          )
        }

        // Safe log line — never include the raw key.
        console.log(
          `[validate-provider] provider=${provider} ${maskInfo(apiKey)}`,
        )

        try {
          const result = await validate(provider, apiKey, baseUrl)
          if (result.ok) {
            return json({ ok: true, models: result.models })
          }
          return json(
            { ok: false, error: result.error || 'Validation failed' },
            { status: 200 }, // 200 + ok:false matches caller expectations
          )
        } catch (err) {
          const aborted =
            err && typeof err === 'object' && (err as { aborted?: boolean }).aborted
          return json(
            {
              ok: false,
              error: aborted
                ? 'Validation timed out'
                : safeErrorMessage(err),
            },
            { status: 200 },
          )
        }
      },
    },
  },
})
