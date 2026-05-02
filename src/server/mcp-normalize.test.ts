import { describe, expect, it } from 'vitest'
import {
  MASK_SENTINEL,
  maskSecretsInPlace,
  normalizeMcpList,
  normalizeMcpServer,
  normalizeTestResult,
  payloadContainsString,
} from './mcp-normalize'

describe('normalizeMcpServer', () => {
  it('returns null for missing name/id', () => {
    expect(normalizeMcpServer({})).toBeNull()
    expect(normalizeMcpServer(null)).toBeNull()
    expect(normalizeMcpServer('not-an-object')).toBeNull()
  })

  it('coerces transport, auth, status with safe defaults', () => {
    const s = normalizeMcpServer({ name: 'github' })!
    expect(s.transportType).toBe('http')
    expect(s.authType).toBe('none')
    expect(s.status).toBe('unknown')
    expect(s.toolMode).toBe('all')
    expect(s.enabled).toBe(true)
    expect(s.source).toBe('configured')
  })

  it('preserves legitimate stdio + http shapes', () => {
    const stdio = normalizeMcpServer({
      name: 'fs',
      transportType: 'stdio',
      command: 'npx',
      args: ['-y', '@modelcontextprotocol/server-filesystem'],
    })!
    expect(stdio.transportType).toBe('stdio')
    expect(stdio.command).toBe('npx')
    expect(stdio.args).toEqual(['-y', '@modelcontextprotocol/server-filesystem'])

    const http = normalizeMcpServer({
      name: 'linear',
      transportType: 'http',
      url: 'https://mcp.linear.app/sse',
      authType: 'oauth',
    })!
    expect(http.url).toBe('https://mcp.linear.app/sse')
    expect(http.authType).toBe('oauth')
  })

  it('drops malformed entries from a list with a warn log', () => {
    const list = normalizeMcpList({
      servers: [
        { name: 'good' },
        { id: '' },
        { totally: 'invalid' },
        { name: 'good2' },
      ],
    })
    expect(list.map((s) => s.name).sort()).toEqual(['good', 'good2'])
  })

  it('accepts top-level array, items, mcpServers shapes', () => {
    expect(normalizeMcpList([{ name: 'a' }]).length).toBe(1)
    expect(normalizeMcpList({ items: [{ name: 'b' }] }).length).toBe(1)
    expect(normalizeMcpList({ mcpServers: [{ name: 'c' }] }).length).toBe(1)
  })

  it('reports presence flags for secrets without echoing values', () => {
    const s = normalizeMcpServer({
      name: 'x',
      bearerToken: 'sk-secret-sentinel',
      oauth: { clientId: 'id', clientSecret: 'shh' },
    })!
    expect(s.hasBearerToken).toBe(true)
    expect(s.hasOAuthClientSecret).toBe(true)
    // Make sure the secret didn't leak into the output object anywhere.
    expect(payloadContainsString(s, 'sk-secret-sentinel')).toBe(false)
    expect(payloadContainsString(s, 'shh')).toBe(false)
  })
})

describe('maskSecretsInPlace (secret echo guard)', () => {
  it('replaces all env values with the mask sentinel', () => {
    const s = normalizeMcpServer({
      name: 'gh',
      env: { GITHUB_PERSONAL_ACCESS_TOKEN: 'ghp_DO_NOT_LEAK', NON_SECRET: 'ok' },
    })!
    // Normalizer already masks env at read time.
    expect(Object.values(s.env)).toEqual([MASK_SENTINEL, MASK_SENTINEL])
    maskSecretsInPlace(s)
    expect(payloadContainsString(s, 'ghp_DO_NOT_LEAK')).toBe(false)
    expect(payloadContainsString(s, 'ok')).toBe(false)
  })

  it('masks header values that look like secrets by key hint', () => {
    const s = normalizeMcpServer({
      name: 'h',
      headers: { Authorization: 'Bearer X', 'X-Trace-Id': 'abc' },
    })!
    maskSecretsInPlace(s)
    expect(payloadContainsString(s, 'Bearer X')).toBe(false)
    expect(payloadContainsString(s, 'abc')).toBe(false)
  })

  it('is idempotent', () => {
    const s = normalizeMcpServer({ name: 'x', env: { K: 'v' } })!
    const first = JSON.stringify(maskSecretsInPlace(s))
    const second = JSON.stringify(maskSecretsInPlace(s))
    expect(first).toBe(second)
  })
})

describe('normalizeTestResult', () => {
  it('infers ok from status when ok flag missing', () => {
    expect(normalizeTestResult({ status: 'connected' }).ok).toBe(true)
    expect(normalizeTestResult({ status: 'failed' }).ok).toBe(false)
  })

  it('returns latencyMs only when finite', () => {
    expect(normalizeTestResult({ status: 'connected', latencyMs: 42 }).latencyMs).toBe(42)
    expect(normalizeTestResult({ status: 'connected', latencyMs: 'fast' }).latencyMs).toBeUndefined()
  })

  it('normalizes discovered tools (drops empty names)', () => {
    const r = normalizeTestResult({
      status: 'connected',
      discoveredTools: [{ name: 'list_repos' }, { name: '' }, 'invalid'],
    })
    expect(r.discoveredTools.map((t) => t.name)).toEqual(['list_repos'])
  })
})

describe('payloadContainsString', () => {
  it('finds nested matches', () => {
    expect(payloadContainsString({ a: { b: ['x', 'sentinel'] } }, 'sentinel')).toBe(true)
    expect(payloadContainsString({ a: { b: ['x'] } }, 'sentinel')).toBe(false)
  })
})
