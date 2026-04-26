import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@tanstack/react-router', () => ({
  createFileRoute: (_path: string) => (opts: unknown) => opts,
}))

vi.mock('@tanstack/react-start', () => ({
  json: (body: unknown, init?: ResponseInit) =>
    new Response(JSON.stringify(body), {
      ...(init || {}),
      headers: { 'Content-Type': 'application/json', ...(init?.headers || {}) },
    }),
}))

vi.mock('@/server/auth-middleware', () => ({
  isAuthenticated: vi.fn(() => true),
}))

const ensureGatewayProbed = vi.fn()
const getMessages = vi.fn()
const listSessions = vi.fn()
const getGatewayCapabilities = vi.fn(() => ({ sessions: true }))

vi.mock('../../../server/hermes-api', () => ({
  SESSIONS_API_UNAVAILABLE_MESSAGE: 'sessions unavailable',
  ensureGatewayProbed,
  getGatewayCapabilities,
  getMessages,
  listSessions,
  toChatMessage: vi.fn(),
}))

const resolveSessionKey = vi.fn()
vi.mock('../../../server/session-utils', () => ({
  resolveSessionKey,
}))

const getLocalSession = vi.fn()
const getLocalMessages = vi.fn()
vi.mock('../../../server/local-session-store', () => ({
  getLocalSession,
  getLocalMessages,
}))

beforeEach(() => {
  vi.clearAllMocks()
  getGatewayCapabilities.mockReturnValue({ sessions: true })
  resolveSessionKey.mockResolvedValue({ sessionKey: 'session-1' })
  getMessages.mockResolvedValue([])
})

describe('history route local fallback', () => {
  async function getHandler() {
    vi.resetModules()
    const mod = await import('../history')
    return (mod as any).Route.server.handlers.GET
  }

  it('rehydrates local tool activity without duplicating toolCall content blocks', async () => {
    getLocalSession.mockReturnValue({ id: 'session-1' })
    getLocalMessages.mockReturnValue([
      {
        id: 'msg-1',
        role: 'assistant',
        content: 'Done',
        timestamp: 123,
        toolCalls: [
          {
            id: 'tool-1',
            name: 'shell',
            phase: 'complete',
            preview: 'ls -la',
            result: 'file-a\nfile-b',
            args: { command: 'ls -la' },
          },
        ],
      },
    ])

    const get = await getHandler()
    const res = await get({
      request: new Request('http://localhost/api/history?sessionKey=session-1'),
    })
    expect(res.status).toBe(200)

    const payload = await res.json()
    expect(payload.messages).toHaveLength(1)
    expect(payload.messages[0].content).toEqual([{ type: 'text', text: 'Done' }])
    expect(payload.messages[0].streamToolCalls).toEqual([
      {
        id: 'tool-1',
        name: 'shell',
        phase: 'complete',
        preview: 'ls -la',
        result: 'file-a\nfile-b',
        args: { command: 'ls -la' },
      },
    ])
    expect(payload.messages[0].__streamToolCalls).toEqual(
      payload.messages[0].streamToolCalls,
    )
  })
})
