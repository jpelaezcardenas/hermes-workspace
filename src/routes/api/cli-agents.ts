/**
 * CLI agents listing — enumerates locally running coding-agent processes
 * (claude-code, codex, opencode) so the gateway sidebar can show them.
 *
 * Implementation: shells out to `pgrep -fl '<pattern>'` then `ps -o ...`
 * via execFile (no shell, no injection vector). Strict 3s timeout — on
 * timeout we return `{ agents: [], degraded: true, reason: 'timeout' }`.
 *
 * Auth: same `requireLocalOrAuth` guard as src/routes/api/files.ts.
 */
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import { requireLocalOrAuth } from '../../server/auth-middleware'

const execFileAsync = promisify(execFile)

const PGREP_PATTERN = 'claude|claude-code|codex|opencode'
const TIMEOUT_MS = 3_000

export type CliAgentKind =
  | 'claude-code'
  | 'codex'
  | 'opencode'
  | 'other'

export type CliAgentEntry = {
  pid: number
  ppid: number
  command: string
  cmd: string
  etime: string
  kind: CliAgentKind
  started: string | null
}

function classify(command: string): CliAgentKind {
  const lower = command.toLowerCase()
  if (lower.includes('claude-code') || lower.includes('claude ')) return 'claude-code'
  if (/(^|\s|\/)claude($|\s)/.test(lower)) return 'claude-code'
  if (lower.includes('codex')) return 'codex'
  if (lower.includes('opencode')) return 'opencode'
  return 'other'
}

function parseEtimeToMs(etime: string): number | null {
  // ps etime format: [[DD-]HH:]MM:SS
  const trimmed = etime.trim()
  if (!trimmed) return null
  let days = 0
  let rest = trimmed
  const dashIndex = rest.indexOf('-')
  if (dashIndex >= 0) {
    days = Number(rest.slice(0, dashIndex)) || 0
    rest = rest.slice(dashIndex + 1)
  }
  const parts = rest.split(':').map((p) => Number(p))
  if (parts.some((n) => !Number.isFinite(n))) return null
  let h = 0,
    m = 0,
    s = 0
  if (parts.length === 3) {
    ;[h, m, s] = parts as [number, number, number]
  } else if (parts.length === 2) {
    ;[m, s] = parts as [number, number]
  } else if (parts.length === 1) {
    ;[s] = parts as [number]
  } else {
    return null
  }
  return ((days * 24 + h) * 3600 + m * 60 + s) * 1000
}

/** Run `pgrep -fl <pattern>` and return [{pid, command}]. */
export async function pgrepCliAgents(
  signal: AbortSignal,
): Promise<Array<{ pid: number; command: string }>> {
  try {
    const { stdout } = await execFileAsync('pgrep', ['-fl', PGREP_PATTERN], {
      signal,
      timeout: TIMEOUT_MS,
      maxBuffer: 1_000_000,
    })
    const ownPid = process.pid
    const lines = stdout.split('\n').map((l) => l.trim()).filter(Boolean)
    const out: Array<{ pid: number; command: string }> = []
    for (const line of lines) {
      const space = line.indexOf(' ')
      if (space < 0) continue
      const pid = Number(line.slice(0, space))
      const command = line.slice(space + 1).trim()
      if (!Number.isInteger(pid) || pid <= 0) continue
      if (pid === ownPid) continue // never list the gateway itself
      // Filter out the pgrep itself if it self-matches via -f.
      if (command.startsWith('pgrep ')) continue
      out.push({ pid, command })
    }
    return out
  } catch {
    return []
  }
}

async function psDetails(
  pid: number,
  signal: AbortSignal,
): Promise<{ ppid: number; etime: string; command: string } | null> {
  try {
    const { stdout } = await execFileAsync(
      'ps',
      ['-o', 'ppid=,etime=,command=', '-p', String(pid)],
      { signal, timeout: TIMEOUT_MS, maxBuffer: 256_000 },
    )
    const line = stdout.trim()
    if (!line) return null
    // "  1234 00:01:23 /path/to/cmd args..."
    const m = line.match(/^\s*(\d+)\s+(\S+)\s+(.+)$/)
    if (!m) return null
    return {
      ppid: Number(m[1]),
      etime: m[2] ?? '',
      command: (m[3] ?? '').trim(),
    }
  } catch {
    return null
  }
}

export const Route = createFileRoute('/api/cli-agents')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        if (!requireLocalOrAuth(request)) {
          return json({ ok: false, error: 'Unauthorized' }, { status: 401 })
        }
        const ac = new AbortController()
        const timer = setTimeout(() => ac.abort(), TIMEOUT_MS)
        try {
          const matches = await pgrepCliAgents(ac.signal)
          if (ac.signal.aborted) {
            return json({ agents: [], degraded: true, reason: 'timeout' })
          }
          const now = Date.now()
          const agents: Array<CliAgentEntry> = []
          for (const m of matches) {
            const details = await psDetails(m.pid, ac.signal)
            if (!details) continue
            const command = details.command || m.command
            const elapsedMs = parseEtimeToMs(details.etime)
            const started =
              elapsedMs !== null
                ? new Date(now - elapsedMs).toISOString()
                : null
            agents.push({
              pid: m.pid,
              ppid: details.ppid,
              command,
              cmd: command,
              etime: details.etime,
              kind: classify(command),
              started,
            })
          }
          return json({ agents })
        } catch {
          return json({ agents: [], degraded: true, reason: 'error' })
        } finally {
          clearTimeout(timer)
        }
      },
    },
  },
})
