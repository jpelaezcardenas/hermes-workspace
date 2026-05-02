/**
 * MCP server READ shapes — safe for client + server import.
 * Secrets never appear here. Presence flags only.
 */

export type McpTransport = 'http' | 'stdio'
export type McpAuth = 'none' | 'bearer' | 'oauth'
export type McpToolMode = 'all' | 'include' | 'exclude'
export type McpStatus = 'connected' | 'failed' | 'unknown'
export type McpSource = 'configured' | 'preset'

export interface McpDiscoveredTool {
  name: string
  description?: string
  inputSchemaRef?: string
}

/** Distinct nominal type so masked values can never be confused with raw secrets at the type level. */
export type McpMaskedValue = string & { readonly __masked: unique symbol }

export interface McpServer {
  id: string
  name: string
  enabled: boolean
  transportType: McpTransport
  url?: string
  command?: string
  args: Array<string>
  env: Record<string, McpMaskedValue>
  headers: Record<string, McpMaskedValue>
  authType: McpAuth
  hasBearerToken: boolean
  hasOAuthClientSecret: boolean
  toolMode: McpToolMode
  includeTools: Array<string>
  excludeTools: Array<string>
  discoveredToolsCount: number
  discoveredTools: Array<McpDiscoveredTool>
  status: McpStatus
  lastTestedAt?: string
  lastError?: string
  source: McpSource
}

export interface McpTestResult {
  ok: boolean
  status: McpStatus
  latencyMs?: number
  discoveredTools: Array<McpDiscoveredTool>
  error?: string
}

export interface McpListResponse {
  servers: Array<McpServer>
  total: number
  categories: Array<string>
}

/**
 * Browser-safe write shape. Forms collect secrets separately and submit via the
 * workspace's CSRF-protected POST endpoint. The full server-side write shape with
 * `bearerToken` / `oauth.clientSecret` lives in `mcp-input.ts` and is lint-blocked
 * from client paths.
 */
export interface McpClientInput {
  name: string
  enabled?: boolean
  transportType: McpTransport
  url?: string
  command?: string
  args?: Array<string>
  env?: Record<string, string>
  headers?: Record<string, string>
  authType?: McpAuth
  bearerToken?: string
  oauth?: {
    clientId: string
    clientSecret: string
    authorizationUrl?: string
    tokenUrl?: string
    scopes?: Array<string>
  }
  toolMode?: McpToolMode
  includeTools?: Array<string>
  excludeTools?: Array<string>
}
