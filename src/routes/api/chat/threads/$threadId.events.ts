import { createFileRoute } from '@tanstack/react-router'

import { requireLocalOrAuth } from '../../../../server/auth-middleware'
import {
  ensureBusStarted,
  subscribeToChatEvents,
} from '../../../../server/chat-event-bus'
import { listChatRuntimeEvents } from '../../../../server/chat-runtime-store'

function eventData(record: {
  cursor?: string
  timestamp?: number
  data: Record<string, unknown>
}): Record<string, unknown> {
  return {
    ...record.data,
    ...(record.cursor ? { cursor: record.cursor } : {}),
    ...(record.timestamp ? { timestamp: record.timestamp } : {}),
  }
}

export const Route = createFileRoute('/api/chat/threads/$threadId/events')({
  server: {
    handlers: {
      GET: async ({ params, request }) => {
        if (!requireLocalOrAuth(request)) {
          return new Response(
            JSON.stringify({ ok: false, error: 'Unauthorized' }),
            { status: 401, headers: { 'Content-Type': 'application/json' } },
          )
        }

        const url = new URL(request.url)
        const cursor = url.searchParams.get('cursor')?.trim() || undefined
        const limit = Number(url.searchParams.get('limit') || 500)
        const encoder = new TextEncoder()
        let streamClosed = false
        let unsubscribe: (() => void) | null = null
        let heartbeatTimer: ReturnType<typeof setInterval> | null = null

        const stream = new ReadableStream({
          async start(controller) {
            const sendEvent = (event: string, data: unknown) => {
              if (streamClosed) return
              try {
                controller.enqueue(
                  encoder.encode(
                    `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`,
                  ),
                )
              } catch {
                streamClosed = true
              }
            }

            const closeStream = () => {
              if (streamClosed) return
              streamClosed = true
              if (heartbeatTimer) clearInterval(heartbeatTimer)
              if (unsubscribe) unsubscribe()
              try {
                controller.close()
              } catch {
                /* stream already closed */
              }
            }

            try {
              await ensureBusStarted()

              sendEvent('connected', {
                threadId: params.threadId,
                sessionKey: params.threadId,
                cursor: cursor || null,
                timestamp: Date.now(),
              })

              if (cursor) {
                const replay = await listChatRuntimeEvents(params.threadId, {
                  afterCursor: cursor,
                  limit,
                })
                for (const record of replay) {
                  sendEvent(record.event, eventData(record))
                }
              }

              unsubscribe = subscribeToChatEvents((evt) => {
                if (streamClosed) return
                sendEvent(evt.event, evt.data)
              }, params.threadId)

              heartbeatTimer = setInterval(() => {
                sendEvent('heartbeat', {
                  threadId: params.threadId,
                  sessionKey: params.threadId,
                  timestamp: Date.now(),
                })
              }, 30_000)
            } catch (error) {
              sendEvent('error', {
                threadId: params.threadId,
                sessionKey: params.threadId,
                message: error instanceof Error ? error.message : String(error),
              })
              closeStream()
            }
          },
          cancel() {
            streamClosed = true
            if (heartbeatTimer) clearInterval(heartbeatTimer)
            if (unsubscribe) unsubscribe()
          },
        })

        return new Response(stream, {
          headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache, no-transform',
            Connection: 'keep-alive',
            'X-Accel-Buffering': 'no',
          },
        })
      },
    },
  },
})
