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

describe('buildPortableDoneMessage', () => {
  it('keeps completed tool activity on the final portable message', async () => {
    const { buildPortableDoneMessage } = await import('../send-stream')

    const message = buildPortableDoneMessage('Done', 'Thinking', [
      {
        id: 'tool-1',
        name: 'shell',
        phase: 'complete',
        preview: 'ls -la',
        result: 'file-a',
      },
    ])

    expect(message).toMatchObject({
      role: 'assistant',
      streamToolCalls: [
        {
          id: 'tool-1',
          name: 'shell',
          phase: 'complete',
          preview: 'ls -la',
          result: 'file-a',
        },
      ],
      __streamToolCalls: [
        {
          id: 'tool-1',
          name: 'shell',
          phase: 'complete',
          preview: 'ls -la',
          result: 'file-a',
        },
      ],
    })
  })
})

describe('enhanced stream translation helpers', () => {
  it('builds a user_message event from run.started payloads', async () => {
    const { buildRunStartedUserMessageEvent } = await import('../send-stream')

    const event = buildRunStartedUserMessageEvent(
      {
        user_message: {
          id: 'msg-1',
          role: 'user',
          content: 'hello hermes',
        },
      },
      'session-1',
      'run-1',
      'client-1',
    )

    expect(event).toMatchObject({
      sessionKey: 'session-1',
      source: 'hermes',
      runId: 'run-1',
      message: {
        id: 'msg-1',
        role: 'user',
        text: 'hello hermes',
        clientId: 'client-1',
        client_id: 'client-1',
        idempotencyKey: 'client-1',
        content: [{ type: 'text', text: 'hello hermes' }],
      },
    })
  })

  it('extracts richer Hermes tool metadata shapes', async () => {
    const {
      getToolArgs,
      getToolCallId,
      getToolName,
      getToolResultPreview,
    } = await import('../send-stream')

    const payload = {
      toolCallId: 'call-1',
      toolName: 'workspace_edit',
      toolInput: '{"path":"/tmp/a.txt","newText":"ok"}',
      stdout: 'wrote file',
    }

    expect(getToolName(payload)).toBe('workspace_edit')
    expect(getToolCallId(payload, 'run-1', 'workspace_edit')).toBe('call-1')
    expect(getToolArgs(payload)).toEqual({
      path: '/tmp/a.txt',
      newText: 'ok',
    })
    expect(getToolResultPreview(payload)).toBe('wrote file')
  })
})
