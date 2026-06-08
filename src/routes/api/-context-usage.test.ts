import { afterEach, describe, expect, it, vi } from 'vitest'

import {
  dashboardFetch,
  ensureGatewayProbed,
  getCapabilities,
} from '../../server/gateway-capabilities'
import { listSessions } from '../../server/claude-api'
import {
  getLocalMessages,
  getLocalSession,
} from '../../server/local-session-store'
import {
  estimateContextTokensFromCacheRead,
  estimateContextTokensFromMessages,
  readContextUsage,
} from '../../server/context-usage'
import type { ClaudeSession } from '../../server/claude-api'
import type {
  LocalMessage,
  LocalSession,
} from '../../server/local-session-store'
import type { GatewayCapabilities } from '../../server/gateway-capabilities'

// ─── Typed mock builders (real types — no `any`) ────────────────────────

/** Build a full LocalSession from the fields a given test cares about. */
function mockLocalSession(overrides: Partial<LocalSession>): LocalSession {
  return {
    id: 'local-session',
    title: null,
    model: null,
    createdAt: 0,
    updatedAt: 0,
    messageCount: 0,
    ...overrides,
  }
}

/**
 * Build a LocalMessage. The persisted `content` field is typed as a string,
 * but production messages can carry structured content arrays that the token
 * estimator walks, so we widen the builder input here rather than casting to
 * `any`. `role` is only attached when the caller supplies it: some fixtures
 * deliberately omit it so the mirror-resolution path (which only inspects
 * user/assistant turns) skips them.
 */
function mockLocalMessage(
  overrides: Partial<Omit<LocalMessage, 'content'>> & { content?: unknown },
): LocalMessage {
  return {
    id: 'msg',
    content: '',
    timestamp: 0,
    ...overrides,
  } as LocalMessage
}

/** Build full GatewayCapabilities, overriding only the dashboard flags. */
function mockCapabilities(
  dashboard: Partial<GatewayCapabilities['dashboard']>,
): GatewayCapabilities {
  return {
    health: false,
    chatCompletions: false,
    models: false,
    streaming: false,
    sessions: false,
    enhancedChat: false,
    skills: false,
    memory: false,
    config: false,
    jobs: false,
    mcp: false,
    mcpFallback: false,
    conductor: false,
    kanban: false,
    probed: false,
    dashboard: { available: false, url: '', ...dashboard },
  }
}

vi.mock('../../server/gateway-capabilities', () => ({
  BEARER_TOKEN: '',
  CLAUDE_API: 'http://127.0.0.1:8642',
  dashboardFetch: vi.fn(),
  ensureGatewayProbed: vi.fn(() =>
    Promise.resolve({ dashboard: { available: false } }),
  ),
  getCapabilities: vi.fn(() => ({ dashboard: { available: false } })),
}))

vi.mock('../../server/claude-api', () => ({
  listSessions: vi.fn(() => Promise.resolve([])),
}))

vi.mock('../../server/local-session-store', () => ({
  getLocalMessages: vi.fn(() => []),
  getLocalSession: vi.fn(() => null),
}))

afterEach(() => {
  vi.unstubAllGlobals()
  vi.clearAllMocks()
})

describe('context usage estimation', () => {
  it('prefers live gateway runtime snapshots when the vanilla runtime endpoint is available', async () => {
    const fetchMock = vi.fn(() =>
      Promise.resolve(
        new Response(
          JSON.stringify({
            model: 'anthropic/claude-sonnet-4-20250514',
            context_tokens: 4321,
            context_length: 200000,
            context_percent: 2,
            prompt_tokens: 111,
            completion_tokens: 22,
            total_tokens: 133,
          }),
          { status: 200, headers: { 'Content-Type': 'application/json' } },
        ),
      ),
    )
    vi.stubGlobal('fetch', fetchMock)

    const snapshot = await readContextUsage('session-123')

    expect(fetchMock).toHaveBeenCalledWith(
      'http://127.0.0.1:8642/api/sessions/session-123/runtime',
      expect.objectContaining({ headers: {}, signal: expect.any(AbortSignal) }),
    )
    expect(snapshot).toMatchObject({
      ok: true,
      model: 'anthropic/claude-sonnet-4-20250514',
      usedTokens: 4321,
      maxTokens: 200000,
      contextPercent: 2,
      conversationTokens: 4321,
    })
  })

  it('resolves main to the canonical Hermes session id before reading runtime usage', async () => {
    vi.mocked(listSessions).mockResolvedValue([
      {
        id: 'session-abc',
        title: 'Live chat',
        message_count: 12,
      },
    ])

    const fetchMock = vi.fn((input: RequestInfo | URL) => {
      const url = String(input)
      if (url.includes('/api/sessions/session-abc/runtime')) {
        return Promise.resolve(
          new Response(
            JSON.stringify({
              model: 'gpt-5.4',
              context_tokens: 86397,
              context_length: 512000,
              context_percent: 17,
            }),
            { status: 200, headers: { 'Content-Type': 'application/json' } },
          ),
        )
      }
      return Promise.resolve(new Response('not found', { status: 404 }))
    })
    vi.stubGlobal('fetch', fetchMock)

    const snapshot = await readContextUsage('main')

    expect(listSessions).toHaveBeenCalledWith(30, 0)
    expect(fetchMock).toHaveBeenCalledWith(
      'http://127.0.0.1:8642/api/sessions/session-abc/runtime',
      expect.objectContaining({ headers: {}, signal: expect.any(AbortSignal) }),
    )
    expect(snapshot).toMatchObject({
      ok: true,
      model: 'gpt-5.4',
      usedTokens: 86397,
      maxTokens: 512000,
      contextPercent: 17,
    })
  })

  it('prefers configured dashboard context length for local Workspace-only chats', async () => {
    vi.mocked(getLocalSession).mockReturnValue(
      mockLocalSession({ id: 'local-1', model: null }),
    )
    vi.mocked(getLocalMessages).mockReturnValue([
      mockLocalMessage({ content: 'x'.repeat(700) }),
    ])
    vi.mocked(getCapabilities).mockReturnValue(
      mockCapabilities({ available: true }),
    )
    vi.mocked(ensureGatewayProbed).mockResolvedValue(
      mockCapabilities({ available: true }),
    )

    const fetchMock = vi.fn((input: RequestInfo | URL) => {
      const url = String(input)
      if (url.includes('/api/sessions/local-1/runtime')) {
        return Promise.resolve(new Response('not found', { status: 404 }))
      }
      return Promise.resolve(new Response('unexpected', { status: 500 }))
    })
    vi.stubGlobal('fetch', fetchMock)
    vi.mocked(dashboardFetch).mockResolvedValue(
      new Response(
        JSON.stringify({
          model: 'gpt-5.4',
          effective_context_length: 512000,
          config_context_length: 512000,
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } },
      ),
    )

    const snapshot = await readContextUsage('local-1')

    expect(snapshot).toMatchObject({
      ok: true,
      model: 'gpt-5.4',
      maxTokens: 512000,
      usedTokens: 200,
      contextPercent: 0,
    })
    expect(dashboardFetch).toHaveBeenCalledWith(
      '/api/model/info',
      expect.objectContaining({ signal: expect.any(AbortSignal) }),
    )
  })

  it('maps a mirrored local chat to the nearest real Hermes runtime session even when the runtime session has zero stored messages', async () => {
    vi.mocked(getLocalSession).mockReturnValue(
      mockLocalSession({
        id: 'local-mirror',
        model: null,
        createdAt: 1_000_000,
        updatedAt: 2_000_000,
      }),
    )
    vi.mocked(getLocalMessages).mockReturnValue([
      mockLocalMessage({ role: 'user', content: 'hello' }),
      mockLocalMessage({ role: 'assistant', content: 'world' }),
    ])

    const sessions: Array<ClaudeSession> = [
      {
        id: 'runtime-nearest',
        started_at: 2000.01,
        last_active: 2100,
        message_count: 0,
      },
      {
        id: 'runtime-older',
        started_at: 1800,
        last_active: 1900,
        message_count: 12,
      },
    ]
    vi.mocked(listSessions).mockResolvedValue(sessions)

    const fetchMock = vi.fn((input: RequestInfo | URL) => {
      const url = String(input)
      if (url.includes('/api/sessions/local-mirror/runtime')) {
        return Promise.resolve(new Response('not found', { status: 404 }))
      }
      if (url.includes('/api/sessions/runtime-nearest/runtime')) {
        return Promise.resolve(
          new Response(
            JSON.stringify({
              model: 'gpt-5.4',
              context_tokens: 85028,
              context_length: 512000,
              context_percent: 17,
            }),
            { status: 200, headers: { 'Content-Type': 'application/json' } },
          ),
        )
      }
      if (url.includes('/api/sessions/runtime-older/runtime')) {
        return Promise.resolve(
          new Response(
            JSON.stringify({
              model: 'gpt-5.4',
              context_tokens: 19266,
              context_length: 512000,
              context_percent: 4,
            }),
            { status: 200, headers: { 'Content-Type': 'application/json' } },
          ),
        )
      }
      return Promise.resolve(new Response('not found', { status: 404 }))
    })
    vi.stubGlobal('fetch', fetchMock)

    const snapshot = await readContextUsage('local-mirror')

    expect(snapshot).toMatchObject({
      ok: true,
      model: 'gpt-5.4',
      usedTokens: 85028,
      maxTokens: 512000,
      contextPercent: 17,
    })
  })

  it('keeps configured context length visible for unresolved synthetic sessions like new', async () => {
    vi.mocked(getLocalSession).mockReturnValue(null)
    vi.mocked(getLocalMessages).mockReturnValue([])
    vi.mocked(getCapabilities).mockReturnValue(
      mockCapabilities({ available: true }),
    )
    vi.mocked(ensureGatewayProbed).mockResolvedValue(
      mockCapabilities({ available: true }),
    )

    const fetchMock = vi.fn(() =>
      Promise.resolve(new Response('not found', { status: 404 })),
    )
    vi.stubGlobal('fetch', fetchMock)
    vi.mocked(dashboardFetch).mockResolvedValue(
      new Response(
        JSON.stringify({
          model: 'gpt-5.4',
          effective_context_length: 512000,
          config_context_length: 512000,
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } },
      ),
    )

    const snapshot = await readContextUsage('new')

    expect(snapshot).toMatchObject({
      ok: true,
      model: 'gpt-5.4',
      maxTokens: 512000,
      usedTokens: 0,
      contextPercent: 0,
    })
  })

  it('counts serialized content arrays and tool results instead of only string lengths', () => {
    const tokens = estimateContextTokensFromMessages([
      {
        content: [{ type: 'text', text: 'hello world' }],
      },
      {
        content: [
          {
            type: 'tool_result',
            text: 'x'.repeat(400),
          },
        ],
      },
    ])

    expect(tokens).toBeGreaterThan(100)
  })

  it('uses structured message estimation for local sessions instead of string-only content lengths', async () => {
    vi.mocked(getLocalSession).mockReturnValue(
      mockLocalSession({ id: 'local-structured', model: null }),
    )
    vi.mocked(getLocalMessages).mockReturnValue([
      mockLocalMessage({
        content: [{ type: 'tool_result', text: 'x'.repeat(400) }],
      }),
    ])
    vi.mocked(getCapabilities).mockReturnValue(
      mockCapabilities({ available: true }),
    )
    vi.mocked(ensureGatewayProbed).mockResolvedValue(
      mockCapabilities({ available: true }),
    )

    const fetchMock = vi.fn(() =>
      Promise.resolve(new Response('not found', { status: 404 })),
    )
    vi.stubGlobal('fetch', fetchMock)
    vi.mocked(dashboardFetch).mockResolvedValue(
      new Response(
        JSON.stringify({
          model: 'gpt-5.4',
          effective_context_length: 512000,
          config_context_length: 512000,
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } },
      ),
    )

    const snapshot = await readContextUsage('local-structured')

    expect(snapshot.usedTokens).toBeGreaterThan(0)
    expect(snapshot.maxTokens).toBe(512000)
  })

  it('does not double-count top-level text when it mirrors structured content', () => {
    const mirroredToolOutput = JSON.stringify({ output: 'x'.repeat(4000) })
    const withMirroredText = estimateContextTokensFromMessages([
      {
        content: [{ type: 'tool_result', text: mirroredToolOutput }],
        text: mirroredToolOutput,
      },
    ])
    const contentOnly = estimateContextTokensFromMessages([
      {
        content: [{ type: 'tool_result', text: mirroredToolOutput }],
      },
    ])

    expect(withMirroredText).toBe(contentOnly)
  })

  it('keeps cumulative cache-read totals as a fallback, not the primary estimate', () => {
    const messageEstimate = estimateContextTokensFromMessages([
      { content: 'x'.repeat(4_000) },
    ])
    const cacheEstimate = estimateContextTokensFromCacheRead(14_100_480, 123)

    expect(messageEstimate).toBeLessThan(cacheEstimate)
    expect(messageEstimate).toBeGreaterThan(1000)
    expect(messageEstimate).toBeLessThan(1200)
  })
})
