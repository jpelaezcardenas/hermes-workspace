/**
 * Runtime normalization layer for MCP server payloads from the agent.
 *
 * Mirrors the Skills `asRecord`/`readString`/`normalizeSkill` defense pattern.
 * Strips any field not in the read shape, coerces types, and replaces all
 * secret values with the masked sentinel BEFORE any `json(...)` response.
 *
 * The TypeScript shape disappears at build — never trust agent payload shape.
 */
import type {
  McpAuth,
  McpDiscoveredTool,
  McpMaskedValue,
  McpServer,
  McpSource,
  McpStatus,
  McpToolMode,
  McpTransport,
} from '../types/mcp'

export const MASK_SENTINEL = '••••' as McpMaskedValue

const MASKED_KEY_HINTS = [
  'token',
  'secret',
  'password',
  'pass',
  'apikey',
  'api_key',
  'auth',
  'bearer',
  'key',
  'credential',
]

function asRecord(value: unknown): Record<string, unknown> {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return value as Record<string, unknown>
  }
  return {}
}

function readString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : ''
}

function readStringArray(value: unknown): Array<string> {
  if (!Array.isArray(value)) return []
  return value.map((entry) => readString(entry)).filter(Boolean)
}

function readBool(value: unknown, fallback = false): boolean {
  if (typeof value === 'boolean') return value
  if (typeof value === 'string') {
    const v = value.trim().toLowerCase()
    if (v === 'true' || v === '1' || v === 'yes') return true
    if (v === 'false' || v === '0' || v === 'no') return false
  }
  return fallback
}

function readNumber(value: unknown, fallback = 0): number {
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback
}

function readTransport(value: unknown): McpTransport {
  const v = readString(value).toLowerCase()
  return v === 'stdio' ? 'stdio' : 'http'
}

function readAuth(value: unknown): McpAuth {
  const v = readString(value).toLowerCase()
  if (v === 'bearer' || v === 'oauth' || v === 'none') return v
  return 'none'
}

function readToolMode(value: unknown): McpToolMode {
  const v = readString(value).toLowerCase()
  if (v === 'include' || v === 'exclude') return v
  return 'all'
}

function readStatus(value: unknown): McpStatus {
  const v = readString(value).toLowerCase()
  if (v === 'connected' || v === 'failed') return v
  return 'unknown'
}

function readSource(value: unknown): McpSource {
  const v = readString(value).toLowerCase()
  return v === 'preset' ? 'preset' : 'configured'
}

/** Replace all string values with the mask sentinel; preserve keys for UI render. */
function maskRecord(value: unknown): Record<string, McpMaskedValue> {
  const record = asRecord(value)
  const out: Record<string, McpMaskedValue> = {}
  for (const [key, raw] of Object.entries(record)) {
    if (typeof raw !== 'string') continue
    const trimmedKey = key.trim()
    if (!trimmedKey) continue
    out[trimmedKey] = raw.length === 0 ? ('' as McpMaskedValue) : MASK_SENTINEL
  }
  return out
}

function isSecretKey(key: string): boolean {
  const k = key.toLowerCase()
  return MASKED_KEY_HINTS.some((hint) => k.includes(hint))
}

function readDiscoveredTools(value: unknown): Array<McpDiscoveredTool> {
  if (!Array.isArray(value)) return []
  return value
    .map((entry) => {
      const r = asRecord(entry)
      const name = readString(r.name)
      if (!name) return null
      const tool: McpDiscoveredTool = { name }
      const description = readString(r.description)
      if (description) tool.description = description
      const ref = readString(r.inputSchemaRef) || readString(r.schemaRef)
      if (ref) tool.inputSchemaRef = ref
      return tool
    })
    .filter((entry): entry is McpDiscoveredTool => entry !== null)
}

/**
 * Normalize one server payload from the agent. Returns null if id/name missing.
 * Secrets are NEVER copied through — read-only presence flags only.
 */
export function normalizeMcpServer(raw: unknown): McpServer | null {
  const record = asRecord(raw)
  const name = readString(record.name) || readString(record.id)
  if (!name) return null

  const id = readString(record.id) || name
  const transportType = readTransport(record.transportType ?? record.transport)
  const authType = readAuth(record.authType ?? record.auth)

  // Presence flags from various agent payload conventions.
  const hasBearerToken =
    readBool(record.hasBearerToken) ||
    Boolean(readString(record.bearerToken)) ||
    Boolean(asRecord(record.auth).bearerToken)
  const hasOAuthClientSecret =
    readBool(record.hasOAuthClientSecret) ||
    Boolean(asRecord(record.oauth).clientSecret)

  const discoveredTools = readDiscoveredTools(
    record.discoveredTools ?? record.tools,
  )
  const discoveredToolsCount =
    readNumber(record.discoveredToolsCount, discoveredTools.length) ||
    discoveredTools.length

  const lastTestedAt = readString(record.lastTestedAt) || readString(record.testedAt)
  const lastError = readString(record.lastError) || readString(record.error)

  const server: McpServer = {
    id,
    name,
    enabled: readBool(record.enabled, true),
    transportType,
    url: readString(record.url) || undefined,
    command: readString(record.command) || undefined,
    args: readStringArray(record.args),
    env: maskRecord(record.env),
    headers: maskRecord(record.headers),
    authType,
    hasBearerToken,
    hasOAuthClientSecret,
    toolMode: readToolMode(record.toolMode),
    includeTools: readStringArray(record.includeTools),
    excludeTools: readStringArray(record.excludeTools),
    discoveredToolsCount,
    discoveredTools,
    status: readStatus(record.status),
    source: readSource(record.source),
  }
  if (lastTestedAt) server.lastTestedAt = lastTestedAt
  if (lastError) server.lastError = lastError

  return server
}

export function normalizeMcpList(raw: unknown): Array<McpServer> {
  const record = asRecord(raw)
  const items: Array<unknown> = Array.isArray(raw)
    ? raw
    : Array.isArray(record.servers)
      ? (record.servers as Array<unknown>)
      : Array.isArray(record.items)
        ? (record.items as Array<unknown>)
        : Array.isArray(record.mcpServers)
          ? (record.mcpServers as Array<unknown>)
          : []
  const out: Array<McpServer> = []
  for (const entry of items) {
    const normalized = normalizeMcpServer(entry)
    if (normalized) out.push(normalized)
    else if (entry) {
      console.warn('[mcp] dropped malformed server entry')
    }
  }
  return out
}

/**
 * Defense-in-depth: re-mask any secret-shaped key on the server before serialize.
 * Idempotent. Call as the LAST step before `json(...)`.
 */
export function maskSecretsInPlace(server: McpServer): McpServer {
  for (const key of Object.keys(server.env)) {
    server.env[key] = (server.env[key] && server.env[key].length > 0
      ? MASK_SENTINEL
      : ('' as McpMaskedValue))
  }
  for (const key of Object.keys(server.headers)) {
    if (isSecretKey(key)) {
      server.headers[key] = MASK_SENTINEL
    } else if (server.headers[key].length > 0) {
      server.headers[key] = MASK_SENTINEL
    }
  }
  return server
}

export function normalizeTestResult(raw: unknown): {
  ok: boolean
  status: McpStatus
  latencyMs?: number
  discoveredTools: Array<McpDiscoveredTool>
  error?: string
} {
  const record = asRecord(raw)
  const status = readStatus(record.status)
  const ok = readBool(record.ok, status === 'connected')
  const latency = readNumber(record.latencyMs, NaN)
  const error = readString(record.error)
  const result: {
    ok: boolean
    status: McpStatus
    latencyMs?: number
    discoveredTools: Array<McpDiscoveredTool>
    error?: string
  } = {
    ok,
    status,
    discoveredTools: readDiscoveredTools(record.discoveredTools ?? record.tools),
  }
  if (Number.isFinite(latency)) result.latencyMs = latency
  if (error) result.error = error
  return result
}

/**
 * Recursively scan an arbitrary payload for any string equal to `sentinel`.
 * Used by tests to prove no submitted secret is ever echoed back.
 */
export function payloadContainsString(payload: unknown, sentinel: string): boolean {
  if (typeof payload === 'string') return payload.includes(sentinel)
  if (Array.isArray(payload)) {
    return payload.some((entry) => payloadContainsString(entry, sentinel))
  }
  if (payload && typeof payload === 'object') {
    return Object.values(payload).some((value) =>
      payloadContainsString(value, sentinel),
    )
  }
  return false
}
