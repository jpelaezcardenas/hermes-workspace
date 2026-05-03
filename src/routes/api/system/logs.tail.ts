/**
 * GET /api/system/logs/tail?file=gateway|dashboard
 *
 * Server-Sent Events stream that tails a Hermes log file:
 *   - gateway  -> ~/.hermes/logs/gateway.log
 *   - dashboard -> ~/.hermes/logs/dashboard.log
 *
 * Strategy: open the file at (size - TAIL_BYTES), stream that initial
 * window, then watch with fs.watch for 'change' events and emit only
 * the bytes appended since the last read position. Sends a `heartbeat`
 * comment every 15s to keep proxies and the browser alive. Auth-gated
 * with isAuthenticated() (cookie-only, same as /api/files).
 */
import os from 'node:os'
import path from 'node:path'
import fs from 'node:fs'
import fsp from 'node:fs/promises'
import { createFileRoute } from '@tanstack/react-router'
import { isAuthenticated } from '../../../server/auth-middleware'

const LOG_DIR = path.join(
  process.env.HERMES_HOME || process.env.CLAUDE_HOME || path.join(os.homedir(), '.hermes'),
  'logs',
)

const FILES: Record<string, string> = {
  gateway: path.join(LOG_DIR, 'gateway.log'),
  dashboard: path.join(LOG_DIR, 'dashboard.log'),
}

const TAIL_BYTES = 16 * 1024 // initial backlog
const HEARTBEAT_MS = 15_000

function unauthorized(): Response {
  return new Response(JSON.stringify({ ok: false, error: 'Unauthorized' }), {
    status: 401,
    headers: { 'Content-Type': 'application/json' },
  })
}

function badRequest(message: string): Response {
  return new Response(JSON.stringify({ ok: false, error: message }), {
    status: 400,
    headers: { 'Content-Type': 'application/json' },
  })
}

async function readRange(
  filePath: string,
  start: number,
  end: number,
): Promise<string> {
  if (end <= start) return ''
  const handle = await fsp.open(filePath, 'r')
  try {
    const len = end - start
    const buf = Buffer.alloc(len)
    await handle.read(buf, 0, len, start)
    return buf.toString('utf8')
  } finally {
    await handle.close()
  }
}

export const Route = createFileRoute('/api/system/logs/tail')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        if (!isAuthenticated(request)) return unauthorized()

        const url = new URL(request.url)
        const fileKey = (url.searchParams.get('file') || '').trim()
        const filePath = FILES[fileKey]
        if (!filePath) {
          return badRequest(
            `Unknown file. Use one of: ${Object.keys(FILES).join(', ')}`,
          )
        }

        const encoder = new TextEncoder()
        let streamClosed = false
        let watcher: fs.FSWatcher | null = null
        let heartbeat: ReturnType<typeof setInterval> | null = null
        let position = 0
        let reading = false

        const stream = new ReadableStream({
          async start(controller) {
            const send = (event: string, data: unknown) => {
              if (streamClosed) return
              try {
                const payload = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`
                controller.enqueue(encoder.encode(payload))
              } catch {
                /* ignore */
              }
            }

            const sendComment = (line: string) => {
              if (streamClosed) return
              try {
                controller.enqueue(encoder.encode(`: ${line}\n\n`))
              } catch {
                /* ignore */
              }
            }

            const close = () => {
              if (streamClosed) return
              streamClosed = true
              if (heartbeat) {
                clearInterval(heartbeat)
                heartbeat = null
              }
              if (watcher) {
                try {
                  watcher.close()
                } catch {
                  /* ignore */
                }
                watcher = null
              }
              try {
                controller.close()
              } catch {
                /* ignore */
              }
            }

            const drain = async () => {
              if (reading || streamClosed) return
              reading = true
              try {
                const stat = await fsp.stat(filePath).catch(() => null)
                if (!stat) return
                if (stat.size < position) {
                  // truncated / rotated — restart from beginning
                  position = 0
                }
                if (stat.size > position) {
                  const chunk = await readRange(filePath, position, stat.size)
                  position = stat.size
                  if (chunk.length > 0) {
                    send('log', { file: fileKey, chunk })
                  }
                }
              } catch (err) {
                send('error', {
                  message: err instanceof Error ? err.message : String(err),
                })
              } finally {
                reading = false
              }
            }

            try {
              const stat = await fsp.stat(filePath).catch(() => null)
              if (!stat) {
                send('error', { message: `Log file not found: ${filePath}` })
                close()
                return
              }
              const startAt = Math.max(0, stat.size - TAIL_BYTES)
              position = startAt
              send('connected', {
                file: fileKey,
                path: filePath,
                size: stat.size,
                startedAt: position,
              })
              await drain()

              try {
                watcher = fs.watch(filePath, { persistent: false }, (event) => {
                  if (event === 'change' || event === 'rename') {
                    void drain()
                  }
                })
                watcher.on('error', (err) => {
                  send('error', { message: `watch error: ${err.message}` })
                })
              } catch (err) {
                send('error', {
                  message:
                    err instanceof Error
                      ? `watch failed: ${err.message}`
                      : 'watch failed',
                })
              }

              heartbeat = setInterval(() => {
                sendComment(`heartbeat ${Date.now()}`)
              }, HEARTBEAT_MS)
            } catch (err) {
              send('error', {
                message: err instanceof Error ? err.message : String(err),
              })
              close()
            }
          },
          cancel() {
            streamClosed = true
            if (heartbeat) {
              clearInterval(heartbeat)
              heartbeat = null
            }
            if (watcher) {
              try {
                watcher.close()
              } catch {
                /* ignore */
              }
              watcher = null
            }
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
