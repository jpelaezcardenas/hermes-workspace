import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import type { ChatBackend } from './chat-mode'
import type { StreamChunkType } from './openai-compat-api'

// ─── Module mocks ──────────────────────────────────────────────────────
//
// chat-backends imports three collaborators. We mock all three so the tests
// exercise chat-backends' own selection/normalization/streaming logic without
// touching the network or the real gateway.

const resolveChatBackend = vi.fn<() => ChatBackend>()

type StreamChatBody = {
  message: string
  model?: string
  system_message?: string
  attachments?: Array<Record<string, unknown>>
}
type StreamChatEvent = { event: string; data: Record<string, unknown> }
type StreamChatOpts = {
  signal?: AbortSignal
  onEvent: (payload: StreamChatEvent) => void | Promise<void>
}
const streamChat =
  vi.fn<
    (
      sessionId: string,
      body: StreamChatBody,
      opts: StreamChatOpts,
    ) => Promise<void>
  >()

type OpenAIChatOptions = {
  model?: string
  temperature?: number
  signal?: AbortSignal
  stream?: boolean
  sessionId?: string
}
type ChatMessage = { role: string; content: string }
const openaiChat =
  vi.fn<
    (
      messages: Array<ChatMessage>,
      options: OpenAIChatOptions,
    ) => Promise<string | AsyncGenerator<StreamChunkType, void, void>>
  >()

vi.mock('./chat-mode', () => ({ resolveChatBackend }))
vi.mock('./claude-api', () => ({ streamChat }))
vi.mock('./openai-compat-api', () => ({ openaiChat }))

const { sendChatUnified, streamChatUnified } = await import('./chat-backends')

// ─── helpers ───────────────────────────────────────────────────────────

async function collect(
  stream: AsyncGenerator<string, void, void>,
): Promise<Array<string>> {
  const out: Array<string> = []
  for await (const chunk of stream) out.push(chunk)
  return out
}

async function* makeChunkStream(
  chunks: Array<StreamChunkType>,
): AsyncGenerator<StreamChunkType, void, void> {
  await Promise.resolve()
  for (const chunk of chunks) yield chunk
}

const userMessage: ChatMessage = { role: 'user', content: 'hello' }

beforeEach(() => {
  resolveChatBackend.mockReset()
  streamChat.mockReset()
  openaiChat.mockReset()
})

afterEach(() => {
  vi.clearAllMocks()
})

describe('sendChatUnified — backend selection', () => {
  it('throws when no backend is available', async () => {
    resolveChatBackend.mockReturnValue('none')
    await expect(sendChatUnified([userMessage])).rejects.toThrow(
      'No chat backend available',
    )
  })

  it('delegates to openaiChat for the openai-compat backend (non-streaming)', async () => {
    resolveChatBackend.mockReturnValue('openai-compat')
    openaiChat.mockResolvedValue('the answer')
    const result = await sendChatUnified([userMessage], {
      model: 'gpt-x',
      temperature: 0.5,
      sessionId: 'sess-1',
    })
    expect(result).toBe('the answer')
    expect(openaiChat).toHaveBeenCalledWith([userMessage], {
      model: 'gpt-x',
      temperature: 0.5,
      signal: undefined,
      stream: false,
      sessionId: 'sess-1',
    })
  })

  it('uses default empty options when none are provided', async () => {
    resolveChatBackend.mockReturnValue('openai-compat')
    openaiChat.mockResolvedValue('ok')
    await sendChatUnified([userMessage])
    expect(openaiChat).toHaveBeenCalledWith([userMessage], {
      model: undefined,
      temperature: undefined,
      signal: undefined,
      stream: false,
      sessionId: undefined,
    })
  })
})

describe('sendChatUnified — claude-enhanced backend', () => {
  it('aggregates assistant.delta events into a single string', async () => {
    resolveChatBackend.mockReturnValue('claude-enhanced')
    streamChat.mockImplementation(async (_sessionId, _body, opts) => {
      await opts.onEvent({ event: 'assistant.delta', data: { delta: 'Hel' } })
      await opts.onEvent({ event: 'assistant.delta', data: { delta: 'lo!' } })
    })
    const result = await sendChatUnified([userMessage], { sessionId: 'sess-1' })
    expect(result).toBe('Hello!')
  })

  it('passes the last user message and options through to streamChat', async () => {
    resolveChatBackend.mockReturnValue('claude-enhanced')
    streamChat.mockResolvedValue(undefined)
    const attachments = [{ kind: 'image', url: 'x' }]
    await sendChatUnified(
      [
        { role: 'user', content: 'first' },
        { role: 'assistant', content: 'reply' },
        { role: 'user', content: 'second' },
      ],
      {
        sessionId: 'sess-9',
        model: 'claude-x',
        systemMessage: 'be terse',
        attachments,
      },
    )
    expect(streamChat).toHaveBeenCalledTimes(1)
    const call = streamChat.mock.calls[0]
    expect(call).toBeDefined()
    if (!call) throw new Error('expected streamChat call')
    const [sessionId, body] = call
    expect(sessionId).toBe('sess-9')
    expect(body).toEqual({
      message: 'second',
      model: 'claude-x',
      system_message: 'be terse',
      attachments,
    })
  })

  it('throws when sessionId is missing', async () => {
    resolveChatBackend.mockReturnValue('claude-enhanced')
    await expect(sendChatUnified([userMessage])).rejects.toThrow(
      'Hermes enhanced chat requires sessionId',
    )
    expect(streamChat).not.toHaveBeenCalled()
  })

  it('throws when there is no user message', async () => {
    resolveChatBackend.mockReturnValue('claude-enhanced')
    await expect(
      sendChatUnified([{ role: 'assistant', content: 'hi' }], {
        sessionId: 'sess-1',
      }),
    ).rejects.toThrow('Hermes enhanced chat requires a user message')
  })

  it('falls back to assistant.completed content when no deltas arrived', async () => {
    resolveChatBackend.mockReturnValue('claude-enhanced')
    streamChat.mockImplementation(async (_sessionId, _body, opts) => {
      await opts.onEvent({
        event: 'assistant.completed',
        data: { content: 'final answer' },
      })
    })
    const result = await sendChatUnified([userMessage], { sessionId: 'sess-1' })
    expect(result).toBe('final answer')
  })

  it('ignores assistant.completed content when a delta is still buffered', async () => {
    resolveChatBackend.mockReturnValue('claude-enhanced')
    // Emit both events in the same synchronous tick (no await between) so the
    // consumer has not yet drained the delta when 'completed' fires. This
    // exercises the `queue.length === 0` guard that suppresses the duplicate.
    streamChat.mockImplementation((_sessionId, _body, opts) => {
      void opts.onEvent({ event: 'assistant.delta', data: { delta: 'A' } })
      void opts.onEvent({
        event: 'assistant.completed',
        data: { content: 'SHOULD-NOT-APPEAR' },
      })
      return Promise.resolve()
    })
    const result = await sendChatUnified([userMessage], { sessionId: 'sess-1' })
    expect(result).toBe('A')
  })

  it('ignores non-string and empty delta payloads', async () => {
    resolveChatBackend.mockReturnValue('claude-enhanced')
    streamChat.mockImplementation(async (_sessionId, _body, opts) => {
      await opts.onEvent({ event: 'assistant.delta', data: { delta: 123 } })
      await opts.onEvent({ event: 'assistant.delta', data: { delta: '' } })
      await opts.onEvent({ event: 'assistant.delta', data: {} })
      await opts.onEvent({ event: 'assistant.delta', data: { delta: 'real' } })
    })
    const result = await sendChatUnified([userMessage], { sessionId: 'sess-1' })
    expect(result).toBe('real')
  })

  it('propagates errors from streamChat', async () => {
    resolveChatBackend.mockReturnValue('claude-enhanced')
    streamChat.mockRejectedValue(new Error('upstream boom'))
    await expect(
      sendChatUnified([userMessage], { sessionId: 'sess-1' }),
    ).rejects.toThrow('upstream boom')
  })

  it('wraps non-Error rejections into an Error', async () => {
    resolveChatBackend.mockReturnValue('claude-enhanced')
    streamChat.mockRejectedValue('string failure')
    await expect(
      sendChatUnified([userMessage], { sessionId: 'sess-1' }),
    ).rejects.toThrow('string failure')
  })
})

describe('streamChatUnified — backend selection', () => {
  it('throws when no backend is available', async () => {
    resolveChatBackend.mockReturnValue('none')
    await expect(streamChatUnified([userMessage])).rejects.toThrow(
      'No chat backend available',
    )
  })

  it('adapts openai content/reasoning chunks to plain strings', async () => {
    resolveChatBackend.mockReturnValue('openai-compat')
    openaiChat.mockResolvedValue(
      makeChunkStream([
        { type: 'content', text: 'hello ' },
        { type: 'reasoning', text: 'thinking' },
        { type: 'tool', name: 'grep', label: 'Grep' },
        { type: 'content', text: 'world' },
      ]),
    )
    const stream = await streamChatUnified([userMessage])
    expect(await collect(stream)).toEqual(['hello ', 'thinking', 'world'])
  })

  it('requests a streaming openai response', async () => {
    resolveChatBackend.mockReturnValue('openai-compat')
    openaiChat.mockResolvedValue(makeChunkStream([]))
    await streamChatUnified([userMessage], {
      model: 'gpt-x',
      temperature: 0.2,
      sessionId: 'sess-2',
    })
    expect(openaiChat).toHaveBeenCalledWith([userMessage], {
      model: 'gpt-x',
      temperature: 0.2,
      signal: undefined,
      stream: true,
      sessionId: 'sess-2',
    })
  })
})

describe('streamChatUnified — claude-enhanced backend', () => {
  it('yields claude deltas as they arrive', async () => {
    resolveChatBackend.mockReturnValue('claude-enhanced')
    streamChat.mockImplementation(async (_sessionId, _body, opts) => {
      await opts.onEvent({ event: 'assistant.delta', data: { delta: 'one ' } })
      await opts.onEvent({ event: 'assistant.delta', data: { delta: 'two' } })
    })
    const stream = await streamChatUnified([userMessage], {
      sessionId: 'sess-1',
    })
    expect(await collect(stream)).toEqual(['one ', 'two'])
  })

  it('throws when sessionId is missing (eager validation on iteration)', async () => {
    resolveChatBackend.mockReturnValue('claude-enhanced')
    const stream = await streamChatUnified([userMessage])
    await expect(collect(stream)).rejects.toThrow(
      'Hermes enhanced chat requires sessionId',
    )
  })

  it('propagates streamChat failures through the generator', async () => {
    resolveChatBackend.mockReturnValue('claude-enhanced')
    streamChat.mockRejectedValue(new Error('stream failed'))
    const stream = await streamChatUnified([userMessage], {
      sessionId: 'sess-1',
    })
    await expect(collect(stream)).rejects.toThrow('stream failed')
  })
})
