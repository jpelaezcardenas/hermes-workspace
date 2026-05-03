/**
 * POST /api/cli-agents/:pid/kill — safely terminate a CLI agent process.
 *
 * Safety semantics:
 *   - Auth: same `requireLocalOrAuth` guard as the listing route.
 *   - Whitelist: re-runs `pgrep -fl '<cli-agent-pattern>'` inside the
 *     handler and REFUSES to signal any pid that is not in the result.
 *     This blocks the route from being abused to kill arbitrary processes.
 *   - Default signal: SIGTERM. Only escalates to SIGKILL when the body
 *     has `{ force: true }` AND the process is still alive 2s after
 *     SIGTERM. Refuses SIGKILL on PID 1 / negative pids.
 *
 * Response shape: { ok, killedPid, signal, error? }
 */
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import { requireLocalOrAuth } from '../../server/auth-middleware'
import { pgrepCliAgents } from './cli-agents'

const execFileAsync = promisify(execFile)

function processIsAlive(pid: number): boolean {
  try {
    process.kill(pid, 0)
    return true
  } catch (err) {
    const code = (err as NodeJS.ErrnoException).code
    // EPERM means the process exists but we can't signal it — still alive.
    if (code === 'EPERM') return true
    return false
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function isWhitelistedPid(pid: number): Promise<boolean> {
  const ac = new AbortController()
  const timer = setTimeout(() => ac.abort(), 3_000)
  try {
    const matches = await pgrepCliAgents(ac.signal)
    return matches.some((m) => m.pid === pid)
  } finally {
    clearTimeout(timer)
  }
}

async function sendSignal(pid: number, signal: 'TERM' | 'KILL'): Promise<{ ok: boolean; error?: string }> {
  try {
    await execFileAsync('kill', [`-${signal}`, String(pid)], { timeout: 2_000 })
    return { ok: true }
  } catch (err) {
    return { ok: false, error: (err as Error).message }
  }
}

export const Route = createFileRoute('/api/cli-agents/$pid/kill')({
  server: {
    handlers: {
      POST: async ({ request, params }) => {
        if (!requireLocalOrAuth(request)) {
          return json({ ok: false, error: 'Unauthorized' }, { status: 401 })
        }

        const pid = Number(params.pid)
        if (!Number.isInteger(pid) || pid <= 1) {
          return json(
            { ok: false, error: 'Invalid pid', killedPid: pid, signal: 'SIGTERM' },
            { status: 400 },
          )
        }

        const body = (await request.json().catch(() => ({}))) as {
          force?: boolean
        }
        const force = body.force === true

        // Critical safety check — re-run pgrep right now and refuse if the
        // target pid isn't in the cli-agent whitelist. This prevents the
        // route being abused to kill arbitrary processes (e.g. PID 1, sshd,
        // the gateway itself).
        const whitelisted = await isWhitelistedPid(pid)
        if (!whitelisted) {
          return json(
            {
              ok: false,
              error: 'pid is not a known CLI agent process',
              killedPid: pid,
              signal: 'SIGTERM',
            },
            { status: 403 },
          )
        }

        const term = await sendSignal(pid, 'TERM')
        if (!term.ok) {
          return json(
            {
              ok: false,
              error: term.error || 'kill -TERM failed',
              killedPid: pid,
              signal: 'SIGTERM',
            },
            { status: 500 },
          )
        }

        if (!force) {
          return json({ ok: true, killedPid: pid, signal: 'SIGTERM' })
        }

        // Force escalation path — only used when caller explicitly asked.
        await sleep(2_000)
        if (!processIsAlive(pid)) {
          return json({ ok: true, killedPid: pid, signal: 'SIGTERM' })
        }
        // Re-verify whitelist before escalating; never SIGKILL something
        // we no longer recognise (a pid can be reused on a busy host).
        const stillWhitelisted = await isWhitelistedPid(pid)
        if (!stillWhitelisted) {
          return json(
            {
              ok: false,
              error: 'pid disappeared from whitelist before escalation',
              killedPid: pid,
              signal: 'SIGTERM',
            },
            { status: 409 },
          )
        }
        const kill = await sendSignal(pid, 'KILL')
        if (!kill.ok) {
          return json(
            {
              ok: false,
              error: kill.error || 'kill -KILL failed',
              killedPid: pid,
              signal: 'SIGKILL',
            },
            { status: 500 },
          )
        }
        return json({ ok: true, killedPid: pid, signal: 'SIGKILL' })
      },
    },
  },
})
