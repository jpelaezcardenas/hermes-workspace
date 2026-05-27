import { afterEach, describe, expect, it, vi } from 'vitest'

import {
  buildRequestBody,
  openaiChat,
  parseOpenAIStream,
} from './openai-compat-api'
import { appendAssistantStreamDelta } from './assistant-stream-text'

function createStreamResponse(chunks: string[]): Response {
  const encoder = new TextEncoder()
  return new Response(
    new ReadableStream({
      start(controller) {
        for (const chunk of chunks) {
          controller.enqueue(encoder.encode(chunk))
        }
        controller.close()
      },
    }),
    {
      headers: {
        'Content-Type': 'text/event-stream',
      },
    },
  )
}

const ORIGINAL_HOME = process.env.HOME

afterEach(() => {
  vi.restoreAllMocks()
  delete process.env.HERMES_API_TOKEN
  delete process.env.CLAUDE_API_TOKEN
  delete process.env.HERMES_DEFAULT_MODEL
  delete process.env.CLAUDE_DEFAULT_MODEL
  if (ORIGINAL_HOME === undefined) delete process.env.HOME
  else process.env.HOME = ORIGINAL_HOME
})

describe('buildRequestBody', () => {
  it('rewrites stale Anthropic and Claude model requests to the Hermes default', async () => {
    process.env.HERMES_DEFAULT_MODEL = 'gpt-5.3-codex-spark'

    const body = await buildRequestBody([{ role: 'user', content: 'hello' }], {
      model: 'anthropic-oauth/claude-opus-4-7',
      stream: true,
    })

    expect(body.model).toBe('gpt-5.3-codex-spark')
  })
})

describe('openaiChat', () => {
  it('sends Hermes session continuity headers with authentication when available', async () => {
    process.env.HERMES_API_TOKEN = 'test-token'
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(
        JSON.stringify({ choices: [{ message: { content: 'ok' } }] }),
        { status: 200, headers: { 'Content-Type': 'application/json' } },
      ),
    )
    vi.stubGlobal('fetch', fetchMock)

    await openaiChat([{ role: 'user', content: 'hello' }], {
      model: 'hermes-agent',
      sessionId: 'workspace-session-1',
    })

    const headers = fetchMock.mock.calls[0]?.[1]?.headers as Record<string, string>
    expect(headers.Authorization).toBe('Bearer test-token')
    expect(headers['X-Hermes-Session-Id']).toBe('workspace-session-1')
    expect(headers['X-Claude-Session-Id']).toBe('workspace-session-1')
  })

  it('sends Hermes session continuity headers even without a bearer token', async () => {
    process.env.HOME = '/tmp/hermes-workspace-test-no-codex-auth'
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(
        JSON.stringify({ choices: [{ message: { content: 'ok' } }] }),
        { status: 200, headers: { 'Content-Type': 'application/json' } },
      ),
    )
    vi.stubGlobal('fetch', fetchMock)

    await openaiChat([{ role: 'user', content: 'hello' }], {
      model: 'hermes-agent',
      sessionId: 'workspace-session-2',
    })

    const headers = fetchMock.mock.calls[0]?.[1]?.headers as Record<string, string>
    expect(headers.Authorization).toBeUndefined()
    expect(headers['X-Hermes-Session-Id']).toBe('workspace-session-2')
    expect(headers['X-Claude-Session-Id']).toBe('workspace-session-2')
  })
})

describe('parseOpenAIStream', () => {
  it('passes through ordinary content chunks', async () => {
    const response = createStreamResponse([
      'data: {"choices":[{"delta":{"content":"Hello"}}]}\n\n',
      'data: {"choices":[{"delta":{"content":" world"}}]}\n\n',
      'data: [DONE]\n\n',
    ])

    const chunks = []
    for await (const chunk of parseOpenAIStream(response)) {
      chunks.push(chunk)
    }

    expect(chunks).toEqual([
      { type: 'content', text: 'Hello' },
      { type: 'content', text: ' world' },
    ])
  })

  it('emits synthetic tool events for Hermes tool progress frames', async () => {
    const response = createStreamResponse([
      'event: claude.tool.progress\n',
      'data: {"tool":"terminal","emoji":"💻","label":"ls -la"}\n\n',
      'data: [DONE]\n\n',
    ])

    const chunks = []
    for await (const chunk of parseOpenAIStream(response)) {
      chunks.push(chunk)
    }

    expect(chunks).toEqual([
      {
        type: 'tool',
        name: 'terminal',
        label: '💻 ls -la',
      },
    ])
  })

  it('handles multiple tool events even when frames are split across transport chunks', async () => {
    const response = createStreamResponse([
      'event: claude.tool.progress\ndata: {"tool":"browser_get_images","emoji":"📖","la',
      'bel":"scan page"}\n\n',
      'event: claude.tool.progress\ndata: {"tool":"browser_console","emoji":"🔎","label":"inspect DOM"}\n\n',
      'data: {"choices":[{"delta":{"content":"done"}}]}\n\n',
      'data: [DONE]\n\n',
    ])

    const chunks = []
    for await (const chunk of parseOpenAIStream(response)) {
      chunks.push(chunk)
    }

    expect(chunks).toEqual([
      {
        type: 'tool',
        name: 'browser_get_images',
        label: '📖 scan page',
      },
      {
        type: 'tool',
        name: 'browser_console',
        label: '🔎 inspect DOM',
      },
      { type: 'content', text: 'done' },
    ])
  })
})

describe('appendAssistantStreamDelta', () => {
  it('replaces a completed partial reply when the gateway restarts on fallback', () => {
    const first =
      'Yo, Cael here and online. Testing channel works on my end. What do you want me to run first?'

    expect(appendAssistantStreamDelta(first, 'Hey', 1_000, 2_000)).toBe('Hey')
  })

  it('keeps ordinary adjacent deltas in the same stream', () => {
    expect(appendAssistantStreamDelta('Hello', ' world', 1_000, 1_050)).toBe(
      'Hello world',
    )
  })
})
