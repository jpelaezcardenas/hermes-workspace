import { afterEach, describe, expect, it, vi } from 'vitest'

import { drainServerSideSessionSend } from './session-send-runner'

afterEach(() => {
  vi.unstubAllGlobals()
})

function streamResponse(body: string, status = 200): Response {
  return new Response(
    new ReadableStream({
      start(controller) {
        controller.enqueue(new TextEncoder().encode(body))
        controller.close()
      },
    }),
    {
      status,
      headers: { 'content-type': 'text/event-stream' },
    },
  )
}

describe('session-send server runner', () => {
  it('drains send-stream responses so queued server-side sends can complete', async () => {
    const fetchMock = vi.fn(async () =>
      streamResponse(
        'event: started\ndata: {"runId":"run-1"}\n\nevent: done\ndata: {"state":"complete"}\n\n',
      ),
    )
    vi.stubGlobal('fetch', fetchMock)

    await drainServerSideSessionSend({
      requestUrl: 'http://workspace.local/api/session-send',
      cookie: 'claude-auth=redacted',
      payload: { sessionKey: 'session-1', message: 'hello' },
    })

    expect(fetchMock).toHaveBeenCalledTimes(1)
    const [url, init] = fetchMock.mock.calls[0]
    expect(String(url)).toBe('http://workspace.local/api/send-stream')
    expect(init).toMatchObject({ method: 'POST' })
    expect(JSON.parse(String(init?.body))).toEqual({
      sessionKey: 'session-1',
      message: 'hello',
    })
  })

  it('rejects when send-stream emits an error event', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () =>
        streamResponse(
          'event: error\ndata: {"message":"model unavailable"}\n\n',
        ),
      ),
    )

    await expect(
      drainServerSideSessionSend({
        requestUrl: 'http://workspace.local/api/session-send',
        payload: { sessionKey: 'session-1', message: 'hello' },
      }),
    ).rejects.toThrow('model unavailable')
  })
})
