import { createFileRoute } from '@tanstack/react-router'
import { CLAUDE_DASHBOARD_URL, fetchDashboardToken } from '../../../server/gateway-capabilities'
import { isAuthenticated } from '../../../server/auth-middleware'

/**
 * Same-origin proxy to the Hermes Agent dashboard (default 127.0.0.1:9119).
 *
 * Used to embed the dashboard's kanban board (and any other dashboard pages)
 * as same-origin content inside the Workspace UI (e.g. /kanban → iframe). The
 * dashboard bearer token is injected SERVER-SIDE on every request and is
 * NEVER returned to the browser:
 *  - Client request goes to /api/dashboard-proxy/<path>
 *  - Server resolves token via CLAUDE_DASHBOARD_TOKEN / CLAUDE_API_TOKEN env or
 *    the legacy HTML-scrape fallback (see fetchDashboardToken).
 *  - Server forwards to ${CLAUDE_DASHBOARD_URL}/<path> with Authorization: Bearer.
 *  - Token is stripped from the response Set-Cookie/header surface; only
 *    content-type and the upstream body bytes are returned.
 *
 * Mirrors the structure of /api/claude-proxy/$.ts, but targets the dashboard
 * instead of the gateway and uses dashboard token semantics (see #124).
 */

// Headers we never forward upstream — they belong to the inbound HTTP/1.1
// connection or describe the *workspace* request, not the dashboard request.
const HOP_BY_HOP = new Set([
  'host',
  'content-length',
  'connection',
  'keep-alive',
  'transfer-encoding',
  'upgrade',
  'proxy-authorization',
  'proxy-authenticate',
  'te',
  'trailer',
  // Strip incoming auth — we will set our own dashboard-scoped one.
  'authorization',
  'cookie',
])

// Headers we strip from the response before returning to the browser. Anything
// that could leak the dashboard's session cookie / token to the browser tab
// is forbidden — the iframe must talk to /api/dashboard-proxy/* exclusively.
const RESPONSE_STRIP = new Set([
  'set-cookie',
  'authorization',
  'www-authenticate',
  'content-encoding', // upstream may have decoded; let the runtime re-encode
  'content-length',
  'transfer-encoding',
  'connection',
  // Dashboard sometimes restricts framing; we are same-origin via the proxy
  // so the original X-Frame-Options/CSP frame-ancestors values would block
  // the iframe. Drop them and let the workspace's own CSP govern.
  'x-frame-options',
  'content-security-policy',
])

async function proxyRequest(request: Request, splat: string): Promise<Response> {
  const incomingUrl = new URL(request.url)
  const targetPath = splat.startsWith('/') ? splat : `/${splat}`
  const targetUrl = new URL(`${CLAUDE_DASHBOARD_URL}${targetPath}`)
  targetUrl.search = incomingUrl.search

  const headers = new Headers(request.headers)
  for (const h of HOP_BY_HOP) headers.delete(h)

  // Inject dashboard auth server-side. Failures here are non-fatal — many
  // dashboard endpoints (root HTML, /kanban-board) are unauthenticated; only
  // /api/* routes require the bearer.
  try {
    const token = await fetchDashboardToken()
    if (token) headers.set('Authorization', `Bearer ${token}`)
  } catch {
    // Token unavailable — forward without auth and let upstream 401.
  }

  const init: RequestInit = {
    method: request.method,
    headers,
    redirect: 'manual',
  }

  if (!['GET', 'HEAD'].includes(request.method.toUpperCase())) {
    // Use the raw bytes — preserve whatever content-type the client sent
    // (form data, JSON, multipart, etc).
    const buf = await request.arrayBuffer()
    if (buf.byteLength > 0) init.body = buf
  }

  const upstream = await fetch(targetUrl, init)

  const responseHeaders = new Headers(upstream.headers)
  for (const h of RESPONSE_STRIP) responseHeaders.delete(h)
  // Make sure same-origin framing is allowed; the iframe in /kanban relies on
  // the response not declaring a cross-origin frame-ancestors directive.
  responseHeaders.set('X-Frame-Options', 'SAMEORIGIN')

  const contentType = (upstream.headers.get('content-type') || '').toLowerCase()
  const isHtml = contentType.includes('text/html')
  const isCss = contentType.includes('text/css')
  const isJs =
    contentType.includes('javascript') || contentType.includes('ecmascript')

  // For HTML/CSS/JS we need to:
  //   1. Strip the inline dashboard session token so it never reaches the
  //      browser. The proxy injects the token on every sub-request so the
  //      dashboard SPA does not need it client-side.
  //   2. Rewrite absolute root-relative URLs (`/assets/foo`, `/api/foo`,
  //      `href="/..."`) to live under `/api/dashboard-proxy/...`. Otherwise
  //      the browser would fetch them from the Workspace origin and get a
  //      404 / SPA shell.
  if (isHtml || isCss || isJs) {
    let body = await upstream.text()

    // (1) Strip the inline session-token bootstrap. Replace with a no-op so
    // any reference like `window.__HERMES_SESSION_TOKEN__` resolves to a
    // benign empty string instead of leaking the real token.
    body = body.replace(
      /window\.__(?:CLAUDE|HERMES)_SESSION_TOKEN__\s*=\s*["'][^"']*["']\s*;?/g,
      'window.__HERMES_SESSION_TOKEN__="";',
    )

    // (2) Rewrite root-relative URLs. Match `="/..."`, `='/...'` and
    // `url(/...)` forms but skip URLs already prefixed with our proxy or
    // with `//` (protocol-relative).
    if (isHtml) {
      body = body.replace(
        /(\s(?:src|href|action|formaction|poster|data|content)\s*=\s*)(["'])\/(?!\/|api\/dashboard-proxy\/)/gi,
        '$1$2/api/dashboard-proxy/',
      )
      // Inject <base> as a belt-and-suspenders measure for any path we
      // missed above (works only for relative URLs but cheap to add).
      body = body.replace(
        /<head(\s[^>]*)?>/i,
        (m) => `${m}<base href="/api/dashboard-proxy/">`,
      )
    }
    if (isCss || isJs) {
      // Common cases inside CSS / JS bundles: url("/asset"), "/api/foo",
      // fetch('/api/foo'). Conservative: only rewrite quoted strings that
      // start with a single slash + non-slash, to avoid trashing regexes.
      body = body.replace(
        /(["'`])\/(?!\/|api\/dashboard-proxy\/)([a-zA-Z0-9_\-./]+)\1/g,
        '$1/api/dashboard-proxy/$2$1',
      )
    }

    responseHeaders.delete('content-length')
    return new Response(body, {
      status: upstream.status,
      statusText: upstream.statusText,
      headers: responseHeaders,
    })
  }

  // Stream the body through verbatim — do NOT decode or rewrite. This
  // preserves images, JSON, SSE, fonts, etc.
  return new Response(upstream.body, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers: responseHeaders,
  })
}

function unauthorized(): Response {
  return new Response(
    JSON.stringify({ ok: false, error: 'Unauthorized' }),
    { status: 401, headers: { 'content-type': 'application/json' } },
  )
}

export const Route = createFileRoute('/api/dashboard-proxy/$')({
  server: {
    handlers: {
      GET: async ({ request, params }) => {
        if (!isAuthenticated(request)) return unauthorized()
        return proxyRequest(request, params._splat || '')
      },
      POST: async ({ request, params }) => {
        if (!isAuthenticated(request)) return unauthorized()
        return proxyRequest(request, params._splat || '')
      },
      PUT: async ({ request, params }) => {
        if (!isAuthenticated(request)) return unauthorized()
        return proxyRequest(request, params._splat || '')
      },
      PATCH: async ({ request, params }) => {
        if (!isAuthenticated(request)) return unauthorized()
        return proxyRequest(request, params._splat || '')
      },
      DELETE: async ({ request, params }) => {
        if (!isAuthenticated(request)) return unauthorized()
        return proxyRequest(request, params._splat || '')
      },
    },
  },
})
