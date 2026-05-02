import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import { isAuthenticated } from '../../server/auth-middleware'
import {
  BEARER_TOKEN,
  CLAUDE_API,
  CLAUDE_UPGRADE_INSTRUCTIONS,
  dashboardFetch,
  ensureGatewayProbed,
  getCapabilities,
} from '../../server/gateway-capabilities'
import { requireJsonContentType, safeErrorMessage } from '../../server/rate-limit'
import {
  maskSecretsInPlace,
  normalizeMcpList,
  normalizeMcpServer,
} from '../../server/mcp-normalize'
import type { McpServerInput } from '../../types/mcp-input'
import { createCapabilityUnavailablePayload } from '@/lib/feature-gates'

const KNOWN_CATEGORIES = ['All', 'Connected', 'Failed', 'Disabled'] as const
const REQUEST_TIMEOUT_MS = 30_000

async function mcpFetch(path: string, init: RequestInit = {}): Promise<Response> {
  const capabilities = getCapabilities()
  if (capabilities.dashboard.available) {
    return dashboardFetch(path, init)
  }
  const headers = new Headers(init.headers)
  if (BEARER_TOKEN && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${BEARER_TOKEN}`)
  }
  return fetch(`${CLAUDE_API}${path}`, { ...init, headers })
}

function unavailableListPayload() {
  return {
    ...createCapabilityUnavailablePayload('mcp'),
    servers: [],
    total: 0,
    categories: [...KNOWN_CATEGORIES],
  }
}

function readInput(raw: unknown): McpServerInput | null {
  if (!raw || typeof raw !== 'object') return null
  const r = raw as Record<string, unknown>
  const name = typeof r.name === 'string' ? r.name.trim() : ''
  if (!name) return null
  const transport = r.transportType === 'stdio' ? 'stdio' : 'http'
  const out: McpServerInput = { name, transportType: transport }
  if (typeof r.enabled === 'boolean') out.enabled = r.enabled
  if (typeof r.url === 'string') out.url = r.url.trim()
  if (typeof r.command === 'string') out.command = r.command.trim()
  if (Array.isArray(r.args)) out.args = r.args.map((a) => String(a))
  if (r.env && typeof r.env === 'object' && !Array.isArray(r.env)) {
    out.env = Object.fromEntries(
      Object.entries(r.env as Record<string, unknown>).map(([k, v]) => [k, String(v ?? '')]),
    )
  }
  if (r.headers && typeof r.headers === 'object' && !Array.isArray(r.headers)) {
    out.headers = Object.fromEntries(
      Object.entries(r.headers as Record<string, unknown>).map(([k, v]) => [k, String(v ?? '')]),
    )
  }
  if (r.authType === 'bearer' || r.authType === 'oauth' || r.authType === 'none') {
    out.authType = r.authType
  }
  if (typeof r.bearerToken === 'string') out.bearerToken = r.bearerToken
  if (r.oauth && typeof r.oauth === 'object') {
    const o = r.oauth as Record<string, unknown>
    if (typeof o.clientId === 'string' && typeof o.clientSecret === 'string') {
      out.oauth = {
        clientId: o.clientId,
        clientSecret: o.clientSecret,
        authorizationUrl: typeof o.authorizationUrl === 'string' ? o.authorizationUrl : undefined,
        tokenUrl: typeof o.tokenUrl === 'string' ? o.tokenUrl : undefined,
        scopes: Array.isArray(o.scopes) ? (o.scopes as Array<string>) : undefined,
      }
    }
  }
  if (r.toolMode === 'all' || r.toolMode === 'include' || r.toolMode === 'exclude') {
    out.toolMode = r.toolMode
  }
  if (Array.isArray(r.includeTools)) {
    out.includeTools = (r.includeTools as Array<unknown>).map((t) => String(t))
  }
  if (Array.isArray(r.excludeTools)) {
    out.excludeTools = (r.excludeTools as Array<unknown>).map((t) => String(t))
  }
  return out
}

export { readInput as parseMcpServerInput, unavailableListPayload }

export const Route = createFileRoute('/api/mcp')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        if (!isAuthenticated(request)) {
          return json({ ok: false, error: 'Unauthorized' }, { status: 401 })
        }
        const capabilities = await ensureGatewayProbed()
        if (!capabilities.mcp) {
          return json(unavailableListPayload())
        }
        try {
          const url = new URL(request.url)
          const search = (url.searchParams.get('search') || '').trim().toLowerCase()
          const category = (url.searchParams.get('category') || 'All').trim()

          const response = await mcpFetch('/api/mcp', {
            signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
          })
          if (!response.ok) {
            return json(
              {
                ...unavailableListPayload(),
                error: `MCP list failed (${response.status})`,
              },
              { status: 502 },
            )
          }
          const body = (await response.json().catch(() => null)) as unknown
          const servers = normalizeMcpList(body).map((s) => maskSecretsInPlace(s))

          const filtered = servers.filter((s) => {
            if (search) {
              const hay = [s.name, s.url || '', s.command || '', ...s.args]
                .join('\n')
                .toLowerCase()
              if (!hay.includes(search)) return false
            }
            if (category === 'Connected' && s.status !== 'connected') return false
            if (category === 'Failed' && s.status !== 'failed') return false
            if (category === 'Disabled' && s.enabled) return false
            return true
          })

          return json({
            servers: filtered,
            total: filtered.length,
            categories: [...KNOWN_CATEGORIES],
          })
        } catch (err) {
          return json(
            { ok: false, error: safeErrorMessage(err), servers: [], total: 0, categories: [...KNOWN_CATEGORIES] },
            { status: 500 },
          )
        }
      },
      POST: async ({ request }) => {
        if (!isAuthenticated(request)) {
          return json({ ok: false, error: 'Unauthorized' }, { status: 401 })
        }
        const csrfCheck = requireJsonContentType(request)
        if (csrfCheck) return csrfCheck
        const capabilities = await ensureGatewayProbed()
        if (!capabilities.mcp) {
          return json(
            createCapabilityUnavailablePayload('mcp', {
              error: `Gateway does not support /api/mcp. ${CLAUDE_UPGRADE_INSTRUCTIONS}`,
            }),
            { status: 503 },
          )
        }
        try {
          const raw = (await request.json()) as unknown
          const input = readInput(raw)
          if (!input) {
            return json({ ok: false, error: 'Invalid MCP server payload' }, { status: 400 })
          }
          const response = await mcpFetch('/api/mcp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(input),
            signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
          })
          const body = (await response.json().catch(() => ({}))) as unknown
          const server = normalizeMcpServer(
            (body as Record<string, unknown>).server ?? body,
          )
          if (!response.ok || !server) {
            const errMsg =
              ((body as Record<string, unknown>).error as string | undefined) ||
              `MCP create failed (${response.status})`
            return json({ ok: false, error: errMsg }, { status: response.status || 502 })
          }
          return json({ ok: true, server: maskSecretsInPlace(server) })
        } catch (err) {
          return json({ ok: false, error: safeErrorMessage(err) }, { status: 500 })
        }
      },
    },
  },
})
