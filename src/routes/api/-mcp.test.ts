import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { requireJsonContentType } from '../../server/rate-limit'
import {
  maskSecretsInPlace,
  normalizeMcpServer,
  payloadContainsString,
} from '../../server/mcp-normalize'
import { parseMcpServerInput, unavailableListPayload } from './mcp'

beforeEach(() => {
  vi.resetModules()
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('parseMcpServerInput (POST validation)', () => {
  it('rejects payloads without a name', () => {
    expect(parseMcpServerInput({})).toBeNull()
    expect(parseMcpServerInput({ name: '   ' })).toBeNull()
    expect(parseMcpServerInput(null)).toBeNull()
  })

  it('preserves http transport with url + bearer secret on the input', () => {
    const input = parseMcpServerInput({
      name: 'linear',
      transportType: 'http',
      url: 'https://mcp.linear.app/sse',
      authType: 'bearer',
      bearerToken: 'sk-INPUT-SENTINEL',
    })
    expect(input).not.toBeNull()
    expect(input!.transportType).toBe('http')
    expect(input!.bearerToken).toBe('sk-INPUT-SENTINEL')
  })

  it('coerces stdio transport with args + env strings', () => {
    const input = parseMcpServerInput({
      name: 'fs',
      transportType: 'stdio',
      command: 'npx',
      args: ['-y', '@modelcontextprotocol/server-filesystem'],
      env: { ROOT: '/tmp', NUMERIC: 42 },
    })
    expect(input!.transportType).toBe('stdio')
    expect(input!.args).toEqual(['-y', '@modelcontextprotocol/server-filesystem'])
    expect(input!.env).toEqual({ ROOT: '/tmp', NUMERIC: '42' })
  })
})

describe('unavailableListPayload (capability fall-open)', () => {
  it('matches the createCapabilityUnavailablePayload shape with empty list', () => {
    const payload = unavailableListPayload()
    expect(payload).toMatchObject({
      ok: false,
      code: 'capability_unavailable',
      capability: 'mcp',
      servers: [],
      total: 0,
    })
    expect(payload.categories).toContain('All')
  })
})

describe('CSRF gate (requireJsonContentType)', () => {
  it('rejects POST without application/json Content-Type', () => {
    const req = new Request('http://localhost/api/mcp', {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: 'name=evil',
    })
    const res = requireJsonContentType(req)
    expect(res).not.toBeNull()
    expect(res!.status).toBe(415)
  })

  it('passes POST with application/json', () => {
    const req = new Request('http://localhost/api/mcp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: '{}',
    })
    expect(requireJsonContentType(req)).toBeNull()
  })

  it('passes GET regardless of Content-Type', () => {
    const req = new Request('http://localhost/api/mcp', { method: 'GET' })
    expect(requireJsonContentType(req)).toBeNull()
  })
})

describe('secret echo guard (PR4 acceptance contract)', () => {
  it('round-trip server payload never echoes the submitted bearerToken', () => {
    // 1. User submits an input with a bearer token.
    const input = parseMcpServerInput({
      name: 'linear',
      transportType: 'http',
      url: 'https://mcp.linear.app/sse',
      authType: 'bearer',
      bearerToken: 'sk-DO-NOT-LEAK-2026',
    })!
    expect(input.bearerToken).toBe('sk-DO-NOT-LEAK-2026')

    // 2. Agent stores it and returns its read shape (with secret presence flag,
    //    NOT the raw secret). We simulate that and run it through the pipeline
    //    the route uses before json(...).
    const agentEcho = {
      name: input.name,
      transportType: input.transportType,
      url: input.url,
      authType: input.authType,
      hasBearerToken: true,
      // Worst case: agent erroneously echoes secret. Normalizer must strip it.
      bearerToken: input.bearerToken,
      env: { LEAK: input.bearerToken },
      headers: { Authorization: `Bearer ${input.bearerToken}` },
    }
    const normalized = normalizeMcpServer(agentEcho)
    expect(normalized).not.toBeNull()
    maskSecretsInPlace(normalized!)

    // 3. The string the user submitted must NOT appear anywhere in the
    //    response object the workspace returns to the browser.
    expect(payloadContainsString(normalized, 'sk-DO-NOT-LEAK-2026')).toBe(false)
    expect(normalized!.hasBearerToken).toBe(true)
  })
})
