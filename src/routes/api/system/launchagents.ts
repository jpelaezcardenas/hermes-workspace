/**
 * GET /api/system/launchagents
 *
 * Reports the launchd state for the three Hermes user-agents (gateway,
 * workspace, dashboard) and the LISTEN sockets the user cares about
 * (3000 / 8642 / 8644 / 9119). All shell-outs use execFile (no shell)
 * with strict timeouts.
 */
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import { isAuthenticated } from '../../../server/auth-middleware'
import { safeErrorMessage } from '../../../server/rate-limit'

const execFileAsync = promisify(execFile)

const LABELS = [
  'ai.hermes.gateway',
  'ai.hermes.workspace',
  'ai.hermes.dashboard',
] as const

const PORTS = ['3000', '8642', '8644', '9119'] as const

type AgentState = {
  label: string
  pid: number | null
  state: string | null
  lastExitCode: number | null
  loaded: boolean
  error?: string
}

type PortRow = {
  port: number
  pid: number | null
  command: string | null
  user: string | null
  address: string | null
}

function parseLaunchctlPrint(output: string): {
  pid: number | null
  state: string | null
  lastExitCode: number | null
} {
  // launchctl print emits lines like:
  //   pid = 31076
  //   state = running
  //   last exit code = 0
  const grab = (re: RegExp): string | null => {
    const m = output.match(re)
    return m ? m[1].trim() : null
  }
  const pidStr = grab(/^\s*pid\s*=\s*(\d+)/m)
  const stateStr = grab(/^\s*state\s*=\s*(\S+)/m)
  const exitStr = grab(/^\s*last exit code\s*=\s*(-?\d+)/m)
  return {
    pid: pidStr ? Number(pidStr) : null,
    state: stateStr,
    lastExitCode: exitStr ? Number(exitStr) : null,
  }
}

async function readAgent(uid: number, label: string): Promise<AgentState> {
  try {
    const { stdout } = await execFileAsync(
      'launchctl',
      ['print', `gui/${uid}/${label}`],
      { timeout: 4_000, maxBuffer: 1024 * 1024 },
    )
    const parsed = parseLaunchctlPrint(stdout)
    return {
      label,
      pid: parsed.pid,
      state: parsed.state,
      lastExitCode: parsed.lastExitCode,
      loaded: true,
    }
  } catch (err) {
    const msg = safeErrorMessage(err)
    // launchctl prints "Could not find service" to stderr with non-zero exit
    return {
      label,
      pid: null,
      state: null,
      lastExitCode: null,
      loaded: false,
      error: msg,
    }
  }
}

function parseLsofTcp(output: string): Array<PortRow> {
  // lsof default columns: COMMAND PID USER FD TYPE DEVICE SIZE/OFF NODE NAME
  // We split on whitespace but NAME is the rest. Take last token as NAME.
  const lines = output.split('\n').slice(1) // drop header
  const rows: Array<PortRow> = []
  for (const line of lines) {
    if (!line.trim()) continue
    const parts = line.split(/\s+/)
    if (parts.length < 9) continue
    const command = parts[0]
    const pid = Number(parts[1])
    const user = parts[2]
    const name = parts.slice(8).join(' ')
    // Match patterns like *:9119, 127.0.0.1:8642, [::1]:9119 -> grab last :NUM
    const portMatch = name.match(/:(\d+)(?:\s|\(|$)/)
    if (!portMatch) continue
    const port = Number(portMatch[1])
    if (!PORTS.includes(String(port) as (typeof PORTS)[number])) continue
    rows.push({
      port,
      pid: Number.isFinite(pid) ? pid : null,
      command,
      user,
      address: name,
    })
  }
  return rows
}

async function readListeningPorts(): Promise<{
  rows: Array<PortRow>
  error?: string
}> {
  try {
    const { stdout } = await execFileAsync(
      'lsof',
      ['-nP', '-iTCP', '-sTCP:LISTEN'],
      { timeout: 4_000, maxBuffer: 4 * 1024 * 1024 },
    )
    return { rows: parseLsofTcp(stdout) }
  } catch (err) {
    // lsof exits non-zero when no matches; capture stdout if present
    const e = err as { stdout?: string; message?: string }
    if (typeof e?.stdout === 'string' && e.stdout.length > 0) {
      try {
        return { rows: parseLsofTcp(e.stdout) }
      } catch {
        /* fall through */
      }
    }
    return { rows: [], error: safeErrorMessage(err) }
  }
}

export const Route = createFileRoute('/api/system/launchagents')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        if (!isAuthenticated(request)) {
          return json({ ok: false, error: 'Unauthorized' }, { status: 401 })
        }
        try {
          const uid =
            typeof process.getuid === 'function' ? process.getuid() : 0
          const [agents, ports] = await Promise.all([
            Promise.all(LABELS.map((label) => readAgent(uid, label))),
            readListeningPorts(),
          ])
          return json({
            ok: true,
            uid,
            agents,
            ports: ports.rows,
            portsError: ports.error,
            checkedPorts: PORTS.map(Number),
            generatedAt: new Date().toISOString(),
          })
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
