/**
 * Preview-file endpoint.
 *
 * Serves a file from disk so the Conductor complete-phase panel can embed
 * the mission output (typically /tmp/dispatch-<slug>/index.html) in an
 * iframe. Locks serving to trusted prefixes plus the active Workspace root.
 */
import { statSync, readFileSync } from 'node:fs'
import path, { extname, resolve as resolvePath } from 'node:path'
import os from 'node:os'
import { createHash } from 'node:crypto'
import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import { requireLocalOrAuth } from '../../server/auth-middleware'
import { loadWorkspaceCatalog } from './workspace'

const MAX_BYTES = 5 * 1024 * 1024 // 5MB ceiling for embedded previews
const MIME_BY_EXT: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.htm': 'text/html; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.md': 'text/plain; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
}

function allowedPrefixes(): string[] {
  const home = os.homedir()
  const hermesHome =
    process.env.HERMES_HOME ?? process.env.CLAUDE_HOME ?? resolvePath(home, '.hermes')
  return [
    '/tmp',
    `${home}/tmp`,
    resolvePath(home, 'dispatch'),
    resolvePath(home, 'projects'),
    resolvePath(hermesHome, 'projects'),
    resolvePath(home, '.claude', 'projects'),
    resolvePath(home, '.ocplatform', 'workspace', 'projects'),
  ]
}

function isAllowed(absPath: string): boolean {
  return allowedPrefixes().some(
    (prefix) => absPath === prefix || absPath.startsWith(`${prefix}/`),
  )
}

async function getWorkspaceRoot(): Promise<string | null> {
  try {
    const catalog = await loadWorkspaceCatalog()
    if (catalog.isValid && catalog.path) return resolvePath(catalog.path)
  } catch {
    // Absolute trusted-prefix previews should still work if no workspace is active.
  }
  return null
}

function isWithinWorkspace(absPath: string, workspaceRoot: string | null): boolean {
  if (!workspaceRoot) return false
  if (absPath === workspaceRoot) return true
  const relative = path.relative(workspaceRoot, absPath)
  return Boolean(relative) && !relative.startsWith('..') && relative !== '..' && !path.isAbsolute(relative)
}

async function resolvePreviewPath(input: string): Promise<string> {
  const raw = input.trim()
  const workspaceRoot = await getWorkspaceRoot()
  const abs = path.isAbsolute(raw)
    ? resolvePath(raw)
    : resolvePath(workspaceRoot ?? process.cwd(), raw)

  if (isAllowed(abs) || isWithinWorkspace(abs, workspaceRoot)) {
    return abs
  }

  throw new Error('Forbidden path')
}

function errorResponse(message: string, status: number, asJson: boolean) {
  if (asJson) return json({ ok: false, error: message }, { status })
  return new Response(message, { status })
}

function contentHash(buffer: Buffer) {
  return createHash('sha256').update(buffer).digest('hex')
}

function isTextMime(mime: string) {
  return (
    mime.startsWith('text/') ||
    mime.includes('json') ||
    mime.includes('javascript') ||
    mime.includes('xml') ||
    mime === 'image/svg+xml'
  )
}

function previewKind(mime: string) {
  if (mime.startsWith('image/') && mime !== 'image/svg+xml') return 'image'
  if (isTextMime(mime)) return 'text'
  return 'binary'
}

export const Route = createFileRoute('/api/preview-file')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url)
        const wantsJson = url.searchParams.get('format') === 'json'
        if (!requireLocalOrAuth(request)) {
          return errorResponse('Unauthorized', 401, wantsJson)
        }

        try {
          const rawPath = url.searchParams.get('path') || ''
          if (!rawPath) {
            return errorResponse('path required', 400, wantsJson)
          }

          const abs = await resolvePreviewPath(rawPath)
          let stat
          try {
            stat = statSync(abs)
          } catch {
            return errorResponse('Not found', 404, wantsJson)
          }
          if (!stat.isFile()) {
            return errorResponse('Not a file', 400, wantsJson)
          }
          if (stat.size > MAX_BYTES) {
            return errorResponse('File too large for preview', 413, wantsJson)
          }
          const body = readFileSync(abs)
          const mime = MIME_BY_EXT[extname(abs).toLowerCase()] ?? 'application/octet-stream'
          if (wantsJson) {
            const kind = previewKind(mime)
            return json({
              ok: true,
              path: abs,
              mime,
              kind,
              size: stat.size,
              contentHash: contentHash(body),
              content: kind === 'text' ? body.toString('utf8') : undefined,
              contentBase64: kind === 'image' ? body.toString('base64') : undefined,
            })
          }
          return new Response(body, {
            status: 200,
            headers: {
              'Content-Type': mime,
              'Cache-Control': 'no-store',
              // Restrict referrer so preview content cannot phone home with paths.
              'Referrer-Policy': 'no-referrer',
            },
          })
        } catch (error) {
          return errorResponse(
            error instanceof Error ? error.message : 'Preview failed',
            error instanceof Error && error.message === 'Forbidden path' ? 403 : 500,
            wantsJson,
          )
        }
      },
    },
  },
})
