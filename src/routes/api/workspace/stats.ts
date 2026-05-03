import os from 'node:os'
import path from 'node:path'
import fs from 'node:fs/promises'
import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import { isAuthenticated } from '../../../server/auth-middleware'
import { safeErrorMessage } from '../../../server/rate-limit'
import {
  ensureGatewayProbed,
  listSessions,
} from '../../../server/claude-api'

// ── Repo / scan roots ────────────────────────────────────────────────────────

const REPO_ROOT = (
  process.env.HERMES_REPO_DIR ||
  path.resolve(process.cwd())
).trim()

const HERMES_HOME = (
  process.env.HERMES_HOME ||
  process.env.CLAUDE_HOME ||
  path.join(os.homedir(), '.hermes')
).trim()

const COUNTED_EXTENSIONS = new Set(['.ts', '.tsx', '.md'])
const IGNORED_DIRS = new Set([
  'node_modules',
  '.git',
  '.next',
  '.turbo',
  '.cache',
  'dist',
  'build',
  '.venv',
  '__pycache__',
])
const MAX_DEPTH = 5
const MAX_VISITED = 5_000

async function countFiles(root: string): Promise<number> {
  let count = 0
  let visited = 0

  async function walk(dir: string, depth: number): Promise<void> {
    if (depth > MAX_DEPTH || visited >= MAX_VISITED) return
    let entries: Array<{ name: string; isDir: boolean; isFile: boolean }> = []
    try {
      const raw = await fs.readdir(dir, { withFileTypes: true })
      entries = raw.map((e) => ({
        name: e.name,
        isDir: e.isDirectory(),
        isFile: e.isFile(),
      }))
    } catch {
      return
    }
    for (const e of entries) {
      if (visited >= MAX_VISITED) return
      visited += 1
      if (IGNORED_DIRS.has(e.name)) continue
      if (e.isDir) {
        await walk(path.join(dir, e.name), depth + 1)
      } else if (e.isFile) {
        const ext = path.extname(e.name).toLowerCase()
        if (COUNTED_EXTENSIONS.has(ext)) count += 1
      }
    }
  }

  // Top-level + src/ shallow walk (depth bounded above).
  await walk(root, 0)
  return count
}

async function readRepoBranch(root: string): Promise<string> {
  try {
    const headPath = path.join(root, '.git', 'HEAD')
    const content = (await fs.readFile(headPath, 'utf8')).trim()
    if (content.startsWith('ref:')) {
      // ref: refs/heads/<branch>
      const ref = content.slice(4).trim()
      const idx = ref.lastIndexOf('/')
      return idx >= 0 ? ref.slice(idx + 1) : ref
    }
    // Detached HEAD — return short sha
    return content.slice(0, 7)
  } catch {
    return 'unknown'
  }
}

async function readOverridesMtime(): Promise<number> {
  try {
    const stat = await fs.stat(path.join(HERMES_HOME, 'workspace-overrides.json'))
    return stat.mtimeMs
  } catch {
    return 0
  }
}

type StatsPayload = {
  ok: true
  sessions: number
  files: number
  lastActivity: string
  repoBranch: string
  generatedAt: number
  fromCache: boolean
}

const CACHE_TTL_MS = 30_000
let _cache: { value: StatsPayload; at: number } | null = null

async function buildPayload(): Promise<StatsPayload> {
  // Sessions: count via the same path the workspace already uses.
  let sessionCount = 0
  let lastSessionMs = 0
  try {
    const caps = await ensureGatewayProbed()
    if (caps.sessions) {
      const sessions = await listSessions(200, 0)
      sessionCount = sessions.length
      for (const s of sessions) {
        const ts =
          (s.last_active ?? s.ended_at ?? s.started_at ?? 0) * 1000
        if (ts > lastSessionMs) lastSessionMs = ts
      }
    }
  } catch {
    // Gateway unavailable — keep zeros; this endpoint must not 500 the sidebar.
  }

  const [files, repoBranch, overridesMtime] = await Promise.all([
    countFiles(REPO_ROOT).catch(() => 0),
    readRepoBranch(REPO_ROOT),
    readOverridesMtime(),
  ])

  const lastActivityMs = Math.max(lastSessionMs, overridesMtime)
  const lastActivity = new Date(lastActivityMs || Date.now()).toISOString()

  return {
    ok: true,
    sessions: sessionCount,
    files,
    lastActivity,
    repoBranch,
    generatedAt: Date.now(),
    fromCache: false,
  }
}

export const Route = createFileRoute('/api/workspace/stats')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        if (!isAuthenticated(request)) {
          return json({ ok: false, error: 'Unauthorized' }, { status: 401 })
        }
        try {
          const now = Date.now()
          if (_cache && now - _cache.at < CACHE_TTL_MS) {
            return json({ ..._cache.value, fromCache: true })
          }
          const payload = await buildPayload()
          _cache = { value: payload, at: now }
          return json(payload)
        } catch (err) {
          return json(
            { ok: false, error: safeErrorMessage(err) },
            { status: 500 },
          )
        }
      },
    },
  },
})
