import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

export type MemoryScope = 'business' | 'personal'
export type MemoryFabricMode = 'local' | 'hybrid' | 'global'

type JsonRecord = Record<string, unknown>

type McpEnvelope = {
  jsonrpc?: string
  id?: number | string
  result?: {
    content?: Array<{ type?: string; text?: string }>
    [key: string]: unknown
  }
  error?: {
    code?: number
    message?: string
    data?: unknown
  }
  [key: string]: unknown
}

export type MemoryFabricToolResult<T = unknown> = {
  ok: boolean
  tool: string
  endpoint: string
  data: T
  raw: McpEnvelope
}

export type RoutedMemoryFabricResult<T = unknown> = MemoryFabricToolResult<T> & {
  memoryScope: MemoryScope
  route: unknown
}

const DEFAULT_MEMORY_FABRIC_URL = 'https://memory.visualgraphx.com'
const DEFAULT_CONFIG_PATH = '~/.omx/memory-vault.json'
const MCP_PROTOCOL_VERSION = '2024-11-05'
const REQUEST_TIMEOUT_MS = 35_000
const VALID_SCOPES = new Set<MemoryScope>(['business', 'personal'])

export function getMemoryFabricBaseUrl(): string {
  const configured =
    process.env.KNOWLEDGE_MEMORY_FABRIC_URL ||
    process.env.MEMORY_FABRIC_URL ||
    process.env.MEMORY_VAULT_URL ||
    DEFAULT_MEMORY_FABRIC_URL
  return configured.replace(/\/+$/, '')
}

function expandHome(input: string): string {
  if (input === '~') return os.homedir()
  if (input.startsWith('~/')) return path.join(os.homedir(), input.slice(2))
  return input
}

function readApiKeyFromConfig(): string | null {
  const configPath = expandHome(
    process.env.MEMORY_VAULT_CONFIG || process.env.KNOWLEDGE_MEMORY_FABRIC_CONFIG || DEFAULT_CONFIG_PATH,
  )
  try {
    const raw = fs.readFileSync(configPath, 'utf8')
    const parsed = JSON.parse(raw) as { api_key?: unknown; apiKey?: unknown; token?: unknown }
    const candidate = parsed.api_key ?? parsed.apiKey ?? parsed.token
    return typeof candidate === 'string' && candidate.trim() ? candidate.trim() : null
  } catch {
    return null
  }
}

function getMemoryFabricApiKey(): string {
  const key =
    process.env.KNOWLEDGE_MEMORY_FABRIC_API_KEY ||
    process.env.MEMORY_FABRIC_API_KEY ||
    process.env.MEMORY_VAULT_API_KEY ||
    readApiKeyFromConfig()
  if (!key) {
    throw new Error('Knowledge Vault Memory Fabric API key is not configured')
  }
  return key
}

export function normalizeMemoryScope(input: unknown): MemoryScope {
  const scope = String(input || '').trim().toLowerCase()
  if (VALID_SCOPES.has(scope as MemoryScope)) return scope as MemoryScope
  throw new Error('memoryScope must be explicitly set to business or personal')
}

function normalizeMode(input: unknown): MemoryFabricMode {
  const mode = String(input || 'local').trim().toLowerCase()
  if (mode === 'hybrid' || mode === 'global') return mode
  return 'local'
}

function parseSseJson(body: string): McpEnvelope {
  for (const line of body.split(/\r?\n/)) {
    if (!line.startsWith('data:')) continue
    const jsonText = line.slice('data:'.length).trim()
    if (!jsonText || jsonText === '[DONE]') continue
    return JSON.parse(jsonText) as McpEnvelope
  }
  throw new Error('Memory Fabric MCP response did not include an SSE data payload')
}

function parseToolContent(envelope: McpEnvelope): unknown {
  if (envelope.error) {
    throw new Error(envelope.error.message || 'Memory Fabric MCP call failed')
  }
  const first = envelope.result?.content?.find((entry) => typeof entry.text === 'string')
  const text = first?.text
  if (!text) return envelope.result ?? null
  try {
    return JSON.parse(text) as unknown
  } catch {
    return text
  }
}

function scrubError(error: unknown): string {
  const key =
    process.env.KNOWLEDGE_MEMORY_FABRIC_API_KEY ||
    process.env.MEMORY_FABRIC_API_KEY ||
    process.env.MEMORY_VAULT_API_KEY ||
    ''
  const raw = error instanceof Error ? error.message : String(error)
  return key ? raw.replaceAll(key, '[redacted]') : raw
}

async function fetchWithTimeout(url: string, init: RequestInit): Promise<Response> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)
  try {
    return await fetch(url, { ...init, signal: controller.signal })
  } finally {
    clearTimeout(timer)
  }
}

async function mcpPost(payload: JsonRecord, sessionId?: string): Promise<{ sessionId: string | null; envelope: McpEnvelope }> {
  const apiKey = getMemoryFabricApiKey()
  const endpoint = `${getMemoryFabricBaseUrl()}/mcp/`
  const headers: Record<string, string> = {
    accept: 'application/json, text/event-stream',
    'content-type': 'application/json',
    'user-agent': 'Hermes-Workspace-Knowledge-Fabric/1.0',
    'x-api-key': apiKey,
  }
  if (sessionId) headers['mcp-session-id'] = sessionId

  const response = await fetchWithTimeout(endpoint, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
  })
  const body = await response.text()
  if (!response.ok) {
    throw new Error(`Memory Fabric MCP HTTP ${response.status}: ${body.slice(0, 240)}`)
  }
  return {
    sessionId: response.headers.get('mcp-session-id') || sessionId || null,
    envelope: parseSseJson(body),
  }
}

async function openMcpSession(): Promise<string | null> {
  const { sessionId, envelope } = await mcpPost({
    jsonrpc: '2.0',
    id: 1,
    method: 'initialize',
    params: {
      protocolVersion: MCP_PROTOCOL_VERSION,
      capabilities: {},
      clientInfo: { name: 'hermes-workspace', version: '1.0' },
    },
  })
  if (envelope.error) {
    throw new Error(envelope.error.message || 'Memory Fabric MCP initialize failed')
  }
  return sessionId
}

export async function callMemoryFabricTool<T = unknown>(
  tool: string,
  args: JsonRecord,
): Promise<MemoryFabricToolResult<T>> {
  try {
    const sessionId = await openMcpSession()
    const { envelope } = await mcpPost(
      {
        jsonrpc: '2.0',
        id: 2,
        method: 'tools/call',
        params: { name: tool, arguments: args },
      },
      sessionId || undefined,
    )
    return {
      ok: true,
      tool,
      endpoint: getMemoryFabricBaseUrl(),
      data: parseToolContent(envelope) as T,
      raw: envelope,
    }
  } catch (error) {
    throw new Error(scrubError(error))
  }
}

export async function routeMemoryRequest({
  memoryScope,
  operation = 'query',
  defaultScope,
}: {
  memoryScope: unknown
  operation?: string
  defaultScope?: unknown
}) {
  const scope = normalizeMemoryScope(memoryScope)
  return await callMemoryFabricTool('route_memory_request', {
    memory_scope: scope,
    operation,
    default_scope: defaultScope ? normalizeMemoryScope(defaultScope) : scope,
  })
}

export async function searchKnowledgeWithEvidence({
  query,
  memoryScope,
  mode,
  maxResults,
}: {
  query: unknown
  memoryScope: unknown
  mode?: unknown
  maxResults?: unknown
}): Promise<RoutedMemoryFabricResult> {
  const scope = normalizeMemoryScope(memoryScope)
  const searchQuery = String(query || '').trim()
  if (!searchQuery) throw new Error('query is required')
  const route = await routeMemoryRequest({ memoryScope: scope, operation: 'query' })
  const result = await callMemoryFabricTool('search_knowledge_with_evidence', {
    query: searchQuery,
    mode: normalizeMode(mode),
    max_results: Math.min(Math.max(Number(maxResults) || 8, 1), 25),
    memory_scope: scope,
  })
  return { ...result, memoryScope: scope, route: route.data }
}

export async function searchAllKnowledgeWithEvidence({
  query,
  mode,
  maxResults,
}: {
  query: unknown
  mode?: unknown
  maxResults?: unknown
}) {
  const [business, personal] = await Promise.allSettled([
    searchKnowledgeWithEvidence({ query, mode, maxResults, memoryScope: 'business' }),
    searchKnowledgeWithEvidence({ query, mode, maxResults, memoryScope: 'personal' }),
  ])
  return {
    ok: business.status === 'fulfilled' || personal.status === 'fulfilled',
    endpoint: getMemoryFabricBaseUrl(),
    scopes: {
      business: business.status === 'fulfilled' ? business.value : { ok: false, error: scrubError(business.reason) },
      personal: personal.status === 'fulfilled' ? personal.value : { ok: false, error: scrubError(personal.reason) },
    },
  }
}

export async function searchAgentMemory({
  query,
  memoryScope,
  maxResults,
  agentSource,
}: {
  query: unknown
  memoryScope: unknown
  maxResults?: unknown
  agentSource?: unknown
}): Promise<RoutedMemoryFabricResult> {
  const scope = normalizeMemoryScope(memoryScope)
  const searchQuery = String(query || '').trim()
  if (!searchQuery) throw new Error('query is required')
  const route = await routeMemoryRequest({ memoryScope: scope, operation: 'query' })
  const args: JsonRecord = {
    query: searchQuery,
    memory_scope: scope,
    max_results: Math.min(Math.max(Number(maxResults) || 8, 1), 25),
  }
  if (typeof agentSource === 'string' && agentSource.trim()) args.agent_source = agentSource.trim()
  const result = await callMemoryFabricTool('search_agent_memory', args)
  return { ...result, memoryScope: scope, route: route.data }
}

export async function getDocumentRecord({
  docId,
  memoryScope,
}: {
  docId: unknown
  memoryScope: unknown
}): Promise<RoutedMemoryFabricResult> {
  const scope = normalizeMemoryScope(memoryScope)
  const id = String(docId || '').trim()
  if (!id) throw new Error('docId is required')
  const route = await routeMemoryRequest({ memoryScope: scope, operation: 'query' })
  const result = await callMemoryFabricTool('get_document_record', {
    doc_id: id,
    memory_scope: scope,
  })
  return { ...result, memoryScope: scope, route: route.data }
}

export async function recordAgentSessionState({
  summary,
  memoryScope,
  agentSource,
  sessionId,
  project,
  metadata,
}: {
  summary: unknown
  memoryScope: unknown
  agentSource?: unknown
  sessionId?: unknown
  project?: unknown
  metadata?: unknown
}): Promise<RoutedMemoryFabricResult> {
  const scope = normalizeMemoryScope(memoryScope)
  const stateSummary = String(summary || '').trim()
  if (!stateSummary) throw new Error('summary is required')
  const route = await routeMemoryRequest({ memoryScope: scope, operation: 'write' })
  const args: JsonRecord = {
    memory_scope: scope,
    summary: stateSummary,
    agent_source: typeof agentSource === 'string' && agentSource.trim() ? agentSource.trim() : 'cael',
  }
  if (typeof sessionId === 'string' && sessionId.trim()) args.session_id = sessionId.trim()
  if (typeof project === 'string' && project.trim()) args.project = project.trim()
  if (metadata && typeof metadata === 'object' && !Array.isArray(metadata)) args.metadata = metadata
  const result = await callMemoryFabricTool('record_agent_session_state', args)
  return { ...result, memoryScope: scope, route: route.data }
}

export async function getMemoryFabricHealth() {
  const endpoint = getMemoryFabricBaseUrl()
  let health: unknown = null
  let healthOk = false
  try {
    const response = await fetchWithTimeout(`${endpoint}/health`, {
      headers: { accept: 'application/json' },
    })
    healthOk = response.ok
    health = await response.json().catch(() => null)
  } catch (error) {
    health = { error: scrubError(error) }
  }

  const configured = Boolean(
    process.env.KNOWLEDGE_MEMORY_FABRIC_API_KEY ||
      process.env.MEMORY_FABRIC_API_KEY ||
      process.env.MEMORY_VAULT_API_KEY ||
      readApiKeyFromConfig(),
  )

  if (!configured) {
    return {
      ok: healthOk,
      endpoint,
      configured,
      health,
      scopes: {},
      warning: 'Knowledge Vault Memory Fabric API key is not configured',
    }
  }

  const [business, personal] = await Promise.allSettled([
    routeMemoryRequest({ memoryScope: 'business', operation: 'query' }),
    routeMemoryRequest({ memoryScope: 'personal', operation: 'query' }),
  ])

  return {
    ok: healthOk && (business.status === 'fulfilled' || personal.status === 'fulfilled'),
    endpoint,
    configured,
    health,
    scopes: {
      business: business.status === 'fulfilled' ? business.value.data : { error: scrubError(business.reason) },
      personal: personal.status === 'fulfilled' ? personal.value.data : { error: scrubError(personal.reason) },
    },
  }
}
