import { describe, expect, it, vi } from 'vitest'

vi.mock('@tanstack/react-router', () => ({
  createFileRoute: (_path: string) => (opts: unknown) => opts,
}))

vi.mock('../../../server/session-utils', () => ({
  resolveSessionKey: vi.fn(),
}))

vi.mock('../../../server/auth-middleware', () => ({
  isAuthenticated: vi.fn(),
}))

vi.mock('../../../server/rate-limit', () => ({
  requireJsonContentType: vi.fn(),
}))

vi.mock('../../../server/chat-event-bus', () => ({
  publishChatEvent: vi.fn(),
}))

vi.mock('../../../server/send-run-tracker', () => ({
  registerActiveSendRun: vi.fn(),
  unregisterActiveSendRun: vi.fn(),
}))

vi.mock('../../../server/gateway-capabilities', () => ({
  getChatMode: vi.fn(),
}))

vi.mock('../../../server/local-session-store', () => ({
  ensureLocalSession: vi.fn(),
  appendLocalMessage: vi.fn(),
  getLocalMessages: vi.fn(),
}))

vi.mock('../../../server/local-provider-discovery', () => ({
  getLocalProviderDef: vi.fn(),
  getDiscoveredModels: vi.fn(() => []),
}))

vi.mock('../../../server/openai-compat-api', () => ({
  openaiChat: vi.fn(),
}))

vi.mock('../../../server/hermes-api', () => ({
  SESSIONS_API_UNAVAILABLE_MESSAGE: 'sessions unavailable',
  createSession: vi.fn(),
  ensureGatewayProbed: vi.fn(),
  getGatewayCapabilities: vi.fn(() => ({ sessions: true })),
  listSessions: vi.fn(),
  streamChat: vi.fn(),
}))

describe('assignPortableToolCallId', () => {
  it('reuses the id for consecutive identical tool progress events', async () => {
    const {
      assignPortableToolCallId,
      resetPortableToolCallTracker,
    } = await import('../send-stream')

    const tracker = {
      lastSignature: null,
      lastToolCallId: null,
      sequence: 0,
    }

    const first = assignPortableToolCallId(tracker, 'run-1', 'terminal', 'ls -la')
    const second = assignPortableToolCallId(
      tracker,
      'run-1',
      'terminal',
      'ls -la',
    )

    expect(second).toBe(first)

    resetPortableToolCallTracker(tracker)
    const third = assignPortableToolCallId(tracker, 'run-1', 'terminal', 'ls -la')

    expect(third).not.toBe(first)
  })

  it('creates a new id when the tool label changes', async () => {
    const { assignPortableToolCallId } = await import('../send-stream')

    const tracker = {
      lastSignature: null,
      lastToolCallId: null,
      sequence: 0,
    }

    const first = assignPortableToolCallId(tracker, 'run-1', 'terminal', 'pwd')
    const second = assignPortableToolCallId(
      tracker,
      'run-1',
      'terminal',
      'git status',
    )

    expect(second).not.toBe(first)
  })
})
