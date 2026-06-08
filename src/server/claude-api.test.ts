/**
 * Tests for src/server/claude-api.ts — the server-side HTTP client to the
 * Hermes Agent FastAPI backend.
 *
 * Strategy:
 *  - The real `./gateway-capabilities` module fires `void ensureGatewayProbed()`
 *    at import (which calls fetch) and reads workspace-overrides.json off disk.
 *    We `vi.mock` it entirely so importing claude-api has no side effects, and
 *    so we can flip `getCapabilities().dashboard.available` per test to exercise
 *    both the gateway and the dashboard-delegated branches.
 *  - `./claude-dashboard-api` is mocked so the dashboard branches assert pure
 *    delegation without a second network layer.
 *  - The global `fetch` is stubbed with a typed mock returning real `Response`
 *    objects, and unstubbed in afterEach.
 *
 * Skipped: the live SSE body-reading loop inside `streamChat` (the
 * `for (;;) reader.read()` path) requires a streaming gateway / ReadableStream
 * plumbing; we cover its request construction and error/non-OK branches but not
 * the genuine streaming decode loop. See the `streamChat` describe block.
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import * as api from './claude-api'
import type { GatewayCapabilities } from './gateway-capabilities'

// ── Mock state ────────────────────────────────────────────────────
//
// `vi.mock` factories are hoisted above all module-level code, so every value
// the factory closes over must live in a `vi.hoisted` block (also hoisted).

const CLAUDE_API = 'http://127.0.0.1:8642'

const hoisted = vi.hoisted(() => {
  const state = { dashboardAvailable: false, bearerToken: '' }
  const makeCapabilities = (): GatewayCapabilities => ({
    health: true,
    chatCompletions: true,
    models: true,
    streaming: true,
    probed: true,
    sessions: true,
    enhancedChat: false,
    skills: true,
    memory: true,
    config: true,
    jobs: true,
    mcp: false,
    mcpFallback: false,
    conductor: false,
    kanban: false,
    dashboard: {
      available: state.dashboardAvailable,
      url: 'http://127.0.0.1:9119',
    },
  })
  return {
    state,
    makeCapabilities,
    probeGatewayMock: vi.fn<
      (opts?: { force?: boolean }) => Promise<GatewayCapabilities>
    >(() => Promise.resolve(makeCapabilities())),
    dashboardFetchMock: vi.fn<
      (path: string, init?: RequestInit) => Promise<Response>
    >(() => Promise.resolve(new Response(null, { status: 200 }))),
    ensureGatewayProbedMock: vi.fn<() => Promise<GatewayCapabilities>>(() =>
      Promise.resolve(makeCapabilities()),
    ),
    dash: {
      createSession: vi.fn(),
      deleteSession: vi.fn(),
      forkSession: vi.fn(),
      getSession: vi.fn(),
      getSessionMessages: vi.fn(),
      listSessions: vi.fn(),
      searchSessions: vi.fn(),
      updateSession: vi.fn(),
    },
  }
})

const {
  state,
  probeGatewayMock,
  dashboardFetchMock,
  ensureGatewayProbedMock,
  dash,
} = hoisted

vi.mock('./gateway-capabilities', () => ({
  get BEARER_TOKEN() {
    return hoisted.state.bearerToken
  },
  CLAUDE_API: 'http://127.0.0.1:8642',
  SESSIONS_API_UNAVAILABLE_MESSAGE: 'sessions-unavailable',
  dashboardFetch: (...args: [string, RequestInit?]) =>
    hoisted.dashboardFetchMock(...args),
  ensureGatewayProbed: () => hoisted.ensureGatewayProbedMock(),
  getCapabilities: () => hoisted.makeCapabilities(),
  probeGateway: (opts?: { force?: boolean }) => hoisted.probeGatewayMock(opts),
}))

vi.mock('./claude-dashboard-api', () => ({
  createSession: (...args: Array<unknown>) =>
    hoisted.dash.createSession(...args),
  deleteSession: (...args: Array<unknown>) =>
    hoisted.dash.deleteSession(...args),
  forkSession: (...args: Array<unknown>) => hoisted.dash.forkSession(...args),
  getSession: (...args: Array<unknown>) => hoisted.dash.getSession(...args),
  getSessionMessages: (...args: Array<unknown>) =>
    hoisted.dash.getSessionMessages(...args),
  listSessions: (...args: Array<unknown>) => hoisted.dash.listSessions(...args),
  searchSessions: (...args: Array<unknown>) =>
    hoisted.dash.searchSessions(...args),
  updateSession: (...args: Array<unknown>) =>
    hoisted.dash.updateSession(...args),
}))

// ── fetch stub helpers ────────────────────────────────────────────

type FetchCall = { url: string; init: RequestInit | undefined }

const fetchCalls: Array<FetchCall> = []

type FetchImpl = (
  input: RequestInfo | URL,
  init?: RequestInit,
) => Promise<Response>

/** Install a typed fetch stub backed by `impl`, recording every call. */
function installFetch(impl: FetchImpl): void {
  const stub: FetchImpl = (input, init) => {
    fetchCalls.push({ url: String(input), init })
    return impl(input, init)
  }
  vi.stubGlobal('fetch', stub)
}

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

function textResponse(body: string, status = 200): Response {
  return new Response(body, {
    status,
    headers: { 'Content-Type': 'text/plain' },
  })
}

function lastCall(): FetchCall {
  const c = fetchCalls.at(-1)
  if (!c) throw new Error('no fetch call recorded')
  return c
}

function headerValue(
  init: RequestInit | undefined,
  key: string,
): string | null {
  return new Headers(init?.headers).get(key)
}

beforeEach(() => {
  state.dashboardAvailable = false
  state.bearerToken = ''
  fetchCalls.length = 0
  probeGatewayMock.mockClear()
  dashboardFetchMock.mockReset()
  ensureGatewayProbedMock.mockClear()
  for (const fn of Object.values(dash)) fn.mockReset()
})

afterEach(() => {
  vi.unstubAllGlobals()
})

// ── Re-exports ────────────────────────────────────────────────────

describe('re-exports', () => {
  it('re-exports CLAUDE_API and helpers from gateway-capabilities', () => {
    expect(api.CLAUDE_API).toBe(CLAUDE_API)
    expect(api.SESSIONS_API_UNAVAILABLE_MESSAGE).toBe('sessions-unavailable')
    expect(typeof api.ensureGatewayProbed).toBe('function')
    expect(typeof api.getGatewayCapabilities).toBe('function')
  })

  it('getGatewayCapabilities reflects current dashboard availability', () => {
    state.dashboardAvailable = true
    expect(api.getGatewayCapabilities().dashboard.available).toBe(true)
  })
})

// ── Request construction: GET / health / models / memory / skills ──

describe('GET request construction', () => {
  it('checkHealth GETs /health with no auth header by default', async () => {
    installFetch(() => Promise.resolve(jsonResponse({ status: 'ok' })))
    const res = await api.checkHealth()
    expect(res).toEqual({ status: 'ok' })
    const call = lastCall()
    expect(call.url).toBe(`${CLAUDE_API}/health`)
    // GET helper passes only headers (no method) → defaults to GET.
    expect(call.init?.method).toBeUndefined()
    expect(headerValue(call.init, 'Authorization')).toBeNull()
  })

  it('adds a Bearer auth header when BEARER_TOKEN is set', async () => {
    state.bearerToken = 'secret-token'
    installFetch(() => Promise.resolve(jsonResponse({ status: 'ok' })))
    await api.checkHealth()
    expect(headerValue(lastCall().init, 'Authorization')).toBe(
      'Bearer secret-token',
    )
  })

  it('listModels GETs /v1/models and returns the parsed body', async () => {
    const body = { object: 'list', data: [{ id: 'm1', object: 'model' }] }
    installFetch(() => Promise.resolve(jsonResponse(body)))
    expect(await api.listModels()).toEqual(body)
    expect(lastCall().url).toBe(`${CLAUDE_API}/v1/models`)
  })

  it('getMemory GETs /api/memory', async () => {
    installFetch(() => Promise.resolve(jsonResponse({ md: 'hi' })))
    expect(await api.getMemory()).toEqual({ md: 'hi' })
    expect(lastCall().url).toBe(`${CLAUDE_API}/api/memory`)
  })

  it('listSkills / getSkill / getSkillCategories hit the right paths', async () => {
    installFetch(() => Promise.resolve(jsonResponse([])))
    await api.listSkills()
    expect(lastCall().url).toBe(`${CLAUDE_API}/api/skills`)
    await api.getSkillCategories()
    expect(lastCall().url).toBe(`${CLAUDE_API}/api/skills/categories`)
    await api.getSkill('My Skill/v2')
    expect(lastCall().url).toBe(
      `${CLAUDE_API}/api/skills/${encodeURIComponent('My Skill/v2')}`,
    )
  })
})

// ── Error / non-OK / malformed branches for the GET helper ─────────

describe('GET helper error branches', () => {
  it('throws with status + body text on a non-OK response', async () => {
    installFetch(() => Promise.resolve(textResponse('boom', 500)))
    await expect(api.checkHealth()).rejects.toThrow(
      'Hermes Agent API /health: 500 boom',
    )
  })

  it('swallows a body-read failure and still reports the status', async () => {
    const failingBody = new Response(null, { status: 503 })
    vi.spyOn(failingBody, 'text').mockRejectedValue(new Error('stream broke'))
    installFetch(() => Promise.resolve(failingBody))
    await expect(api.checkHealth()).rejects.toThrow(
      'Hermes Agent API /health: 503',
    )
  })

  it('propagates a fetch rejection (network/abort)', async () => {
    installFetch(() => Promise.reject(new Error('ECONNREFUSED')))
    await expect(api.getMemory()).rejects.toThrow('ECONNREFUSED')
  })
})

// ── listSessions: gateway shape normalization + dashboard branch ───

describe('listSessions', () => {
  it('uses the gateway path with limit/offset and { items }', async () => {
    installFetch(() =>
      Promise.resolve(jsonResponse({ items: [{ id: 's1' }], total: 1 })),
    )
    const out = await api.listSessions(10, 5)
    expect(out).toEqual([{ id: 's1' }])
    expect(lastCall().url).toBe(`${CLAUDE_API}/api/sessions?limit=10&offset=5`)
  })

  it('accepts the OpenAI-compat { data } shape', async () => {
    installFetch(() => Promise.resolve(jsonResponse({ data: [{ id: 's2' }] })))
    expect(await api.listSessions()).toEqual([{ id: 's2' }])
    // default limit/offset
    expect(lastCall().url).toBe(`${CLAUDE_API}/api/sessions?limit=50&offset=0`)
  })

  it('never returns undefined when neither items nor data is present', async () => {
    installFetch(() => Promise.resolve(jsonResponse({ object: 'list' })))
    expect(await api.listSessions()).toEqual([])
  })

  it('delegates to the dashboard client when dashboard.available', async () => {
    state.dashboardAvailable = true
    dash.listSessions.mockResolvedValue({ sessions: [{ id: 'd1' }], total: 1 })
    installFetch(() => Promise.reject(new Error('should not fetch')))
    expect(await api.listSessions(7, 3)).toEqual([{ id: 'd1' }])
    expect(dash.listSessions).toHaveBeenCalledWith(7, 3)
    expect(fetchCalls).toHaveLength(0)
  })
})

// ── getSession / createSession / updateSession / deleteSession ─────

describe('single-session CRUD (gateway branch)', () => {
  it('getSession unwraps { session }', async () => {
    installFetch(() => Promise.resolve(jsonResponse({ session: { id: 'x' } })))
    expect(await api.getSession('x')).toEqual({ id: 'x' })
    expect(lastCall().url).toBe(`${CLAUDE_API}/api/sessions/x`)
  })

  it('createSession POSTs JSON body and unwraps { session }', async () => {
    installFetch(() =>
      Promise.resolve(jsonResponse({ session: { id: 'new' } })),
    )
    const out = await api.createSession({ title: 'T', model: 'm' })
    expect(out).toEqual({ id: 'new' })
    const call = lastCall()
    expect(call.url).toBe(`${CLAUDE_API}/api/sessions`)
    expect(call.init?.method).toBe('POST')
    expect(headerValue(call.init, 'Content-Type')).toBe('application/json')
    expect(call.init?.body).toBe(JSON.stringify({ title: 'T', model: 'm' }))
  })

  it('createSession with no opts still POSTs an empty object body', async () => {
    installFetch(() => Promise.resolve(jsonResponse({ session: { id: 'z' } })))
    await api.createSession()
    expect(lastCall().init?.body).toBe(JSON.stringify({}))
  })

  it('updateSession PATCHes JSON body and unwraps { session }', async () => {
    installFetch(() =>
      Promise.resolve(jsonResponse({ session: { id: 's', title: 'T2' } })),
    )
    const out = await api.updateSession('s', { title: 'T2' })
    expect(out).toEqual({ id: 's', title: 'T2' })
    const call = lastCall()
    expect(call.init?.method).toBe('PATCH')
    expect(call.init?.body).toBe(JSON.stringify({ title: 'T2' }))
  })

  it('deleteSession DELETEs and resolves void; throws on non-OK', async () => {
    installFetch(() => Promise.resolve(new Response(null, { status: 204 })))
    await expect(api.deleteSession('s')).resolves.toBeUndefined()
    expect(lastCall().init?.method).toBe('DELETE')

    installFetch(() => Promise.resolve(textResponse('nope', 404)))
    await expect(api.deleteSession('s')).rejects.toThrow(
      'Hermes Agent API DELETE /api/sessions/s: 404 nope',
    )
  })
})

describe('single-session CRUD (dashboard branch)', () => {
  beforeEach(() => {
    state.dashboardAvailable = true
    installFetch(() => Promise.reject(new Error('should not fetch')))
  })

  it('getSession delegates', async () => {
    dash.getSession.mockResolvedValue({ id: 'dx' })
    expect(await api.getSession('dx')).toEqual({ id: 'dx' })
    expect(dash.getSession).toHaveBeenCalledWith('dx')
  })

  it('createSession delegates and unwraps { session }', async () => {
    dash.createSession.mockResolvedValue({ session: { id: 'dc' } })
    expect(await api.createSession({ id: 'dc' })).toEqual({ id: 'dc' })
    expect(dash.createSession).toHaveBeenCalledWith({ id: 'dc' })
  })

  it('updateSession delegates', async () => {
    dash.updateSession.mockResolvedValue({ session: { id: 'du' } })
    expect(await api.updateSession('du', { title: 'T' })).toEqual({ id: 'du' })
    expect(dash.updateSession).toHaveBeenCalledWith('du', { title: 'T' })
  })

  it('deleteSession delegates and resolves void', async () => {
    dash.deleteSession.mockResolvedValue({ ok: true })
    await expect(api.deleteSession('dd')).resolves.toBeUndefined()
    expect(dash.deleteSession).toHaveBeenCalledWith('dd')
  })
})

// ── getMessages: gateway shape + dashboard delegate ────────────────

describe('getMessages', () => {
  it('returns { items } from the gateway', async () => {
    installFetch(() =>
      Promise.resolve(jsonResponse({ items: [{ id: 1 }], total: 1 })),
    )
    expect(await api.getMessages('s1')).toEqual([{ id: 1 }])
    expect(lastCall().url).toBe(`${CLAUDE_API}/api/sessions/s1/messages`)
  })

  it('falls back to { data } then to []', async () => {
    installFetch(() => Promise.resolve(jsonResponse({ data: [{ id: 2 }] })))
    expect(await api.getMessages('s1')).toEqual([{ id: 2 }])

    installFetch(() => Promise.resolve(jsonResponse({ object: 'list' })))
    expect(await api.getMessages('s1')).toEqual([])
  })

  it('delegates to the dashboard client when available', async () => {
    state.dashboardAvailable = true
    dash.getSessionMessages.mockResolvedValue({ messages: [{ id: 9 }] })
    installFetch(() => Promise.reject(new Error('should not fetch')))
    expect(await api.getMessages('s1')).toEqual([{ id: 9 }])
    expect(dash.getSessionMessages).toHaveBeenCalledWith('s1')
  })
})

// ── searchSessions / forkSession ───────────────────────────────────

describe('searchSessions', () => {
  it('encodes the query and limit on the gateway path', async () => {
    installFetch(() => Promise.resolve(jsonResponse({ results: [], count: 0 })))
    await api.searchSessions('a b/c', 5)
    expect(lastCall().url).toBe(
      `${CLAUDE_API}/api/sessions/search?q=${encodeURIComponent('a b/c')}&limit=5`,
    )
  })

  it('delegates to the dashboard search when available', async () => {
    state.dashboardAvailable = true
    dash.searchSessions.mockResolvedValue({ results: [{ id: 'r' }] })
    installFetch(() => Promise.reject(new Error('should not fetch')))
    expect(await api.searchSessions('q')).toEqual({ results: [{ id: 'r' }] })
    expect(dash.searchSessions).toHaveBeenCalledWith('q')
  })
})

describe('forkSession', () => {
  it('POSTs the fork path on the gateway (no body)', async () => {
    installFetch(() =>
      Promise.resolve(
        jsonResponse({ session: { id: 'f' }, forked_from: 'orig' }),
      ),
    )
    const out = await api.forkSession('orig')
    expect(out).toEqual({ session: { id: 'f' }, forked_from: 'orig' })
    const call = lastCall()
    expect(call.url).toBe(`${CLAUDE_API}/api/sessions/orig/fork`)
    expect(call.init?.method).toBe('POST')
    // No body argument → JSON.stringify is skipped, body stays undefined.
    expect(call.init?.body).toBeUndefined()
  })

  it('delegates to the dashboard fork when available', async () => {
    state.dashboardAvailable = true
    dash.forkSession.mockResolvedValue({
      session: { id: 'df' },
      forked_from: 'o',
    })
    installFetch(() => Promise.reject(new Error('should not fetch')))
    expect(await api.forkSession('o')).toEqual({
      session: { id: 'df' },
      forked_from: 'o',
    })
    expect(dash.forkSession).toHaveBeenCalledWith('o')
  })
})

// ── getConfig / patchConfig: gateway + dashboardFetch branches ─────

describe('getConfig', () => {
  it('uses the gateway claudeGet path when dashboard is unavailable', async () => {
    installFetch(() =>
      Promise.resolve(jsonResponse({ model: 'm', provider: 'p' })),
    )
    expect(await api.getConfig()).toEqual({ model: 'm', provider: 'p' })
    expect(lastCall().url).toBe(`${CLAUDE_API}/api/config`)
    expect(dashboardFetchMock).not.toHaveBeenCalled()
  })

  it('uses dashboardFetch when dashboard is available', async () => {
    state.dashboardAvailable = true
    dashboardFetchMock.mockResolvedValue(jsonResponse({ model: 'dash' }))
    expect(await api.getConfig()).toEqual({ model: 'dash' })
    expect(dashboardFetchMock).toHaveBeenCalledWith('/api/config')
  })

  it('throws on a non-OK dashboardFetch response', async () => {
    state.dashboardAvailable = true
    dashboardFetchMock.mockResolvedValue(textResponse('denied', 403))
    await expect(api.getConfig()).rejects.toThrow(
      'Hermes dashboard /api/config: 403 denied',
    )
  })
})

describe('patchConfig', () => {
  it('PATCHes the gateway config path when dashboard is unavailable', async () => {
    installFetch(() => Promise.resolve(jsonResponse({ ok: true })))
    await api.patchConfig({ model: 'x' })
    const call = lastCall()
    expect(call.url).toBe(`${CLAUDE_API}/api/config`)
    expect(call.init?.method).toBe('PATCH')
    expect(call.init?.body).toBe(JSON.stringify({ model: 'x' }))
  })

  it('PATCHes via dashboardFetch with JSON body when available', async () => {
    state.dashboardAvailable = true
    dashboardFetchMock.mockResolvedValue(jsonResponse({ ok: true }))
    await api.patchConfig({ a: 1 })
    expect(dashboardFetchMock).toHaveBeenCalledTimes(1)
    const firstArg = dashboardFetchMock.mock.calls[0]?.[0]
    const initArg = dashboardFetchMock.mock.calls[0]?.[1]
    expect(firstArg).toBe('/api/config')
    expect(initArg?.method).toBe('PATCH')
    expect(initArg?.body).toBe(JSON.stringify({ a: 1 }))
  })

  it('throws on a non-OK dashboardFetch PATCH', async () => {
    state.dashboardAvailable = true
    dashboardFetchMock.mockResolvedValue(textResponse('bad', 422))
    await expect(api.patchConfig({})).rejects.toThrow(
      'Hermes dashboard PATCH /api/config: 422 bad',
    )
  })
})

// ── sendChat (non-streaming) ──────────────────────────────────────

describe('sendChat', () => {
  it('accepts a string message + model and POSTs the chat path', async () => {
    installFetch(() => Promise.resolve(jsonResponse({ reply: 'hi' })))
    const out = await api.sendChat('sess', 'hello', 'gpt')
    expect(out).toEqual({ reply: 'hi' })
    const call = lastCall()
    expect(call.url).toBe(`${CLAUDE_API}/api/sessions/sess/chat`)
    expect(call.init?.method).toBe('POST')
    expect(call.init?.body).toBe(
      JSON.stringify({ message: 'hello', model: 'gpt' }),
    )
  })

  it('accepts an options object form', async () => {
    installFetch(() => Promise.resolve(jsonResponse({ reply: 'ok' })))
    await api.sendChat('sess', { message: 'yo', model: 'm2' })
    expect(lastCall().init?.body).toBe(
      JSON.stringify({ message: 'yo', model: 'm2' }),
    )
  })

  it('throws on a non-OK chat response', async () => {
    installFetch(() => Promise.resolve(textResponse('rate limited', 429)))
    await expect(api.sendChat('sess', 'hi')).rejects.toThrow(
      'Hermes Agent API POST /api/sessions/sess/chat: 429 rate limited',
    )
  })
})

// ── isClaudeAvailable: capability/probe logic ──────────────────────

describe('isClaudeAvailable', () => {
  it('returns true and force-reprobes when /health is OK', async () => {
    installFetch(() => Promise.resolve(jsonResponse({ status: 'ok' })))
    expect(await api.isClaudeAvailable()).toBe(true)
    expect(lastCall().url).toBe(`${CLAUDE_API}/health`)
    expect(probeGatewayMock).toHaveBeenCalledWith({ force: true })
  })

  it('returns false but still reprobes when /health is non-OK', async () => {
    installFetch(() => Promise.resolve(textResponse('down', 500)))
    expect(await api.isClaudeAvailable()).toBe(false)
    expect(probeGatewayMock).toHaveBeenCalledWith({ force: true })
  })

  it('returns false and tolerates a probe failure when fetch throws', async () => {
    installFetch(() => Promise.reject(new Error('timeout')))
    probeGatewayMock.mockRejectedValueOnce(new Error('probe failed'))
    expect(await api.isClaudeAvailable()).toBe(false)
    expect(probeGatewayMock).toHaveBeenCalledWith({ force: true })
  })

  it('passes an abort signal with a 3s timeout to the health fetch', async () => {
    installFetch(() => Promise.resolve(jsonResponse({ status: 'ok' })))
    await api.isClaudeAvailable()
    const signal = lastCall().init?.signal
    expect(signal).toBeInstanceOf(AbortSignal)
  })
})

// ── toChatMessage: normalization ──────────────────────────────────

describe('toChatMessage', () => {
  it('maps a plain text assistant message', () => {
    const out = api.toChatMessage({
      id: 7,
      session_id: 's',
      role: 'assistant',
      content: 'hello',
      timestamp: 1000,
    })
    expect(out.id).toBe('msg-7')
    expect(out.role).toBe('assistant')
    expect(out.text).toBe('hello')
    expect(out.content).toEqual([{ type: 'text', text: 'hello' }])
    expect(out.timestamp).toBe(1_000_000)
    expect(out.createdAt).toBe(new Date(1_000_000).toISOString())
    expect(out.sessionKey).toBe('s')
    expect(out.streamToolCalls).toBeUndefined()
  })

  it('parses tool_calls supplied as a JSON string and builds blocks', () => {
    const out = api.toChatMessage({
      id: 1,
      session_id: 's',
      role: 'assistant',
      content: null,
      tool_calls: JSON.stringify([
        { id: 'call_1', function: { name: 'search', arguments: { q: 'x' } } },
      ]),
      timestamp: 2,
    })
    const stream = out.streamToolCalls as Array<Record<string, unknown>>
    expect(stream).toHaveLength(1)
    expect(stream[0]).toMatchObject({
      id: 'call_1',
      name: 'search',
      phase: 'complete',
    })
    const content = out.content as Array<Record<string, unknown>>
    expect(content[0]).toMatchObject({
      type: 'toolCall',
      id: 'call_1',
      name: 'search',
      arguments: { q: 'x' },
    })
  })

  it('handles tool_calls as a parsed array with string arguments', () => {
    const out = api.toChatMessage({
      id: 2,
      session_id: 's',
      role: 'assistant',
      content: 'with tools',
      tool_calls: [
        { id: 'c2', function: { name: 'fn', arguments: '{"a":1}' } },
      ],
      timestamp: 3,
    })
    const content = out.content as Array<Record<string, unknown>>
    const toolBlock = content.find((c) => c.type === 'toolCall')
    expect(toolBlock?.partialJson).toBe('{"a":1}')
    expect(toolBlock?.arguments).toBeUndefined()
    // text content follows the tool block.
    expect(
      content.some((c) => c.type === 'text' && c.text === 'with tools'),
    ).toBe(true)
  })

  it('falls back to record.name and a generated id when fn fields are missing', () => {
    const out = api.toChatMessage({
      id: 3,
      session_id: 's',
      role: 'assistant',
      content: null,
      tool_calls: [{ name: 'bare' }],
      timestamp: 4,
    })
    const stream = out.streamToolCalls as Array<Record<string, unknown>>
    expect(stream[0]?.name).toBe('bare')
    expect(typeof stream[0]?.id).toBe('string')
    expect(String(stream[0]?.id)).toMatch(/^tc-/)
  })

  it('drops malformed JSON tool_calls without throwing', () => {
    const out = api.toChatMessage({
      id: 4,
      session_id: 's',
      role: 'assistant',
      content: 'still here',
      tool_calls: '{not json',
      timestamp: 5,
    })
    expect(out.streamToolCalls).toBeUndefined()
    expect(out.content).toEqual([{ type: 'text', text: 'still here' }])
  })

  it('emits a tool_result block for tool-role messages and no text block', () => {
    const out = api.toChatMessage({
      id: 5,
      session_id: 's',
      role: 'tool',
      content: 'result payload',
      tool_call_id: 'tc-9',
      tool_name: 'grep',
      timestamp: 6,
    })
    expect(out.content).toEqual([
      {
        type: 'tool_result',
        toolCallId: 'tc-9',
        toolName: 'grep',
        text: 'result payload',
      },
    ])
  })

  it('includes __historyIndex only when provided as a number', () => {
    const withIdx = api.toChatMessage(
      { id: 6, session_id: 's', role: 'user', content: 'hi', timestamp: 1 },
      { historyIndex: 4 },
    )
    expect(withIdx.__historyIndex).toBe(4)
    const withoutIdx = api.toChatMessage({
      id: 6,
      session_id: 's',
      role: 'user',
      content: 'hi',
      timestamp: 1,
    })
    expect(withoutIdx.__historyIndex).toBeUndefined()
  })

  it('uses Date.now fallbacks when timestamp is absent', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2030-01-01T00:00:00Z'))
    const out = api.toChatMessage({
      id: 8,
      session_id: 's',
      role: 'user',
      content: '',
      timestamp: 0,
    })
    expect(out.timestamp).toBe(Date.parse('2030-01-01T00:00:00Z'))
    expect(out.createdAt).toBeUndefined()
    expect(out.text).toBe('')
    vi.useRealTimers()
  })
})

// ── toSessionSummary: normalization ────────────────────────────────

describe('toSessionSummary', () => {
  it('maps a fully-populated active session', () => {
    const out = api.toSessionSummary({
      id: 'sess-1',
      model: 'gpt',
      title: 'My Chat',
      preview: 'hi there',
      started_at: 100,
      last_active: 200,
      ended_at: null,
      message_count: 3,
      tool_call_count: 2,
      input_tokens: 10,
      output_tokens: 5,
    })
    expect(out.key).toBe('sess-1')
    expect(out.status).toBe('idle')
    expect(out.model).toBe('gpt')
    expect(out.title).toBe('My Chat')
    expect(out.derivedTitle).toBe('My Chat')
    expect(out.tokenCount).toBe(15)
    expect(out.totalTokens).toBe(15)
    expect(out.messageCount).toBe(3)
    expect(out.toolCallCount).toBe(2)
    expect(out.createdAt).toBe(100_000)
    expect(out.startedAt).toBe(100_000)
    expect(out.updatedAt).toBe(200_000)
    expect(out.usage).toEqual({
      promptTokens: 10,
      completionTokens: 5,
      totalTokens: 15,
    })
  })

  it('marks ended sessions and derives title from preview when untitled', () => {
    const out = api.toSessionSummary({
      id: 'sess-2',
      preview: 'snippet',
      started_at: 50,
      ended_at: 80,
    })
    expect(out.status).toBe('ended')
    expect(out.title).toBeUndefined()
    expect(out.label).toBeUndefined()
    expect(out.derivedTitle).toBe('snippet')
    // last_active absent → falls back to ended_at.
    expect(out.updatedAt).toBe(80_000)
  })

  it('defaults token/count fields and timestamps when absent', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2031-06-01T00:00:00Z'))
    const now = Date.parse('2031-06-01T00:00:00Z')
    const out = api.toSessionSummary({ id: 'sess-3' })
    expect(out.tokenCount).toBe(0)
    expect(out.messageCount).toBe(0)
    expect(out.toolCallCount).toBe(0)
    expect(out.model).toBe('')
    expect(out.createdAt).toBe(now)
    expect(out.startedAt).toBe(now)
    expect(out.updatedAt).toBe(now)
    vi.useRealTimers()
  })

  it('falls back updatedAt to started_at when only started_at is set', () => {
    const out = api.toSessionSummary({ id: 'sess-4', started_at: 42 })
    expect(out.updatedAt).toBe(42_000)
  })
})

// ── streamChat: request construction + error branches ──────────────
//
// NOTE: the genuine streaming decode loop (`for (;;) reader.read()` over an
// SSE body, plus the HERMES_TOOL_DEBUG fs dump) needs a real ReadableStream
// from a live gateway. We cover request construction and the non-OK / missing
// body error branches; a single happy-path stream is exercised with a small
// in-memory ReadableStream to verify event parsing without a real gateway.

describe('streamChat', () => {
  const noopOpts = { onEvent: () => undefined }

  it('POSTs the chat/stream path with JSON body, auth header, and signal', async () => {
    state.bearerToken = 'tk'
    const controller = new AbortController()
    // Body present so the reader exists; immediately closed stream → loop exits.
    installFetch(() =>
      Promise.resolve(
        new Response(new ReadableStream({ start: (c) => c.close() }), {
          status: 200,
        }),
      ),
    )
    await api.streamChat(
      'sess',
      { message: 'hi', model: 'm' },
      { ...noopOpts, signal: controller.signal },
    )
    const call = lastCall()
    expect(call.url).toBe(`${CLAUDE_API}/api/sessions/sess/chat/stream`)
    expect(call.init?.method).toBe('POST')
    expect(headerValue(call.init, 'Authorization')).toBe('Bearer tk')
    expect(headerValue(call.init, 'Content-Type')).toBe('application/json')
    expect(call.init?.body).toBe(JSON.stringify({ message: 'hi', model: 'm' }))
    expect(call.init?.signal).toBe(controller.signal)
  })

  it('parses SSE events from a small in-memory stream', async () => {
    const sse =
      'event: token\n' +
      'data: {"text":"hi"}\n' +
      '\n' +
      'data: {"text":"world"}\n' +
      'data: [DONE]\n' +
      'data: {bad json\n'
    installFetch(() =>
      Promise.resolve(
        new Response(
          new ReadableStream({
            start: (c) => {
              c.enqueue(new TextEncoder().encode(sse))
              c.close()
            },
          }),
          { status: 200 },
        ),
      ),
    )
    const events: Array<{ event: string; data: Record<string, unknown> }> = []
    await api.streamChat(
      'sess',
      { message: 'hi' },
      { onEvent: (p) => void events.push(p) },
    )
    // First event keeps the explicit name, second defaults to 'message',
    // [DONE] and malformed JSON are skipped.
    expect(events).toEqual([
      { event: 'token', data: { text: 'hi' } },
      { event: 'token', data: { text: 'world' } },
    ])
  })

  it('throws with status + body on a non-OK stream response', async () => {
    installFetch(() => Promise.resolve(textResponse('upstream 500', 502)))
    await expect(
      api.streamChat('sess', { message: 'hi' }, noopOpts),
    ).rejects.toThrow('Hermes chat stream: 502 upstream 500')
  })

  it('throws when the response has no body to read', async () => {
    installFetch(() => Promise.resolve(new Response(null, { status: 200 })))
    await expect(
      api.streamChat('sess', { message: 'hi' }, noopOpts),
    ).rejects.toThrow('No response body')
  })
})
