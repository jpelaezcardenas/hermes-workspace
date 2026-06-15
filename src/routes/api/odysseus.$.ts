import { createFileRoute } from '@tanstack/react-router'
import { isAuthenticated } from '../../server/auth-middleware'

const ODYSSEUS_BASE = 'http://127.0.0.1:7100'

export const Route = createFileRoute('/api/odysseus/$')({
  server: {
    handlers: {
      GET: handler,
      POST: handler,
      PUT: handler,
      PATCH: handler,
      DELETE: handler,
    },
  },
})

async function handler({ request }: { request: Request }): Promise<Response> {
  if (!isAuthenticated(request)) {
    return new Response(JSON.stringify({ ok: false, error: 'Unauthorized' }), {
      status: 401,
      headers: { 'content-type': 'application/json' },
    })
  }

  const url = new URL(request.url)
  // Strip /api/odysseus prefix; forward the rest as /api/<rest>
  const rest = url.pathname.replace(/^\/api\/odysseus/, '')
  const target = `${ODYSSEUS_BASE}/api${rest}${url.search}`

  const upstreamHeaders = new Headers(request.headers)
  // Don't forward host header — let the HTTP client set it correctly
  upstreamHeaders.delete('host')

  let body: BodyInit | null = null
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    body = await request.arrayBuffer()
  }

  try {
    const upstream = await fetch(target, {
      method: request.method,
      headers: upstreamHeaders,
      body: body ?? undefined,
      // @ts-expect-error -- Node 18+ fetch supports this
      duplex: 'half',
    })

    const responseHeaders = new Headers(upstream.headers)
    // Remove hop-by-hop headers that must not be forwarded
    responseHeaders.delete('transfer-encoding')
    responseHeaders.delete('connection')

    return new Response(upstream.body, {
      status: upstream.status,
      statusText: upstream.statusText,
      headers: responseHeaders,
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Odysseus unreachable'
    return new Response(
      JSON.stringify({ ok: false, error: message }),
      {
        status: 502,
        headers: { 'content-type': 'application/json' },
      },
    )
  }
}
