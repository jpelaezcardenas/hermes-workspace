import { spawn } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { homedir } from 'node:os'
import {
  buildHermesAgentLaunchPlan,
  HERMES_GATEWAY_PORT,
  hermesGatewayEnv,
  resolveClaudeAgentDir,
  resolveClaudeBinary,
} from './hermes-agent-startup'

const CLAUDE_HEALTH_TIMEOUT_MS = 2_000
const CLAUDE_START_PORT = HERMES_GATEWAY_PORT

let startPromise: Promise<StartClaudeAgentResult> | null = null

export type StartClaudeAgentResult =
  | {
      ok: true
      message: string
      pid?: number
    }
  | {
      ok: false
      error: string
    }

/**
 * Read ~/.hermes/.env and return key=value pairs as an object.
 * Silently returns {} if the file doesn't exist or can't be parsed.
 */
function readClaudeEnv(): Record<string, string> {
  const envPath = join(
    process.env.HERMES_HOME ?? process.env.CLAUDE_HOME ?? join(homedir(), '.hermes'),
    '.env',
  )
  try {
    const raw = readFileSync(envPath, 'utf-8')
    const result: Record<string, string> = {}
    for (const line of raw.split('\n')) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue
      const eqIdx = trimmed.indexOf('=')
      if (eqIdx <= 0) continue
      const key = trimmed.slice(0, eqIdx).trim()
      let value = trimmed.slice(eqIdx + 1).trim()
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1)
      }
      if (key) result[key] = value
    }
    return result
  } catch {
    return {}
  }
}

export async function isClaudeAgentHealthy(
  port = CLAUDE_START_PORT,
): Promise<boolean> {
  try {
    const response = await fetch(`http://127.0.0.1:${port}/health`, {
      signal: AbortSignal.timeout(CLAUDE_HEALTH_TIMEOUT_MS),
    })
    return response.ok
  } catch {
    return false
  }
}

export async function startClaudeAgent(): Promise<StartClaudeAgentResult> {
  if (await isClaudeAgentHealthy()) {
    return { ok: true, message: 'already running' }
  }

  if (startPromise) {
    return startPromise
  }

  startPromise = (async () => {
    try {
      const claudeEnv = readClaudeEnv()
      const claudeBin = resolveClaudeBinary()
      const agentDir = resolveClaudeAgentDir()

      const plan = buildHermesAgentLaunchPlan({ agentDir, binary: claudeBin })
      if (!plan) {
        return {
          ok: false,
          error:
            "hermes-agent not found. Run the installer: curl -fsSL https://hermes-workspace.com/install.sh | bash",
        }
      }

      const child = spawn(
        plan.command,
        plan.args,
        {
          cwd: plan.cwd,
          detached: true,
          stdio: 'ignore',
          env: {
            ...hermesGatewayEnv(process.env, claudeEnv, CLAUDE_START_PORT),
            PATH: [
              resolve(homedir(), '.claude', 'bin'),
              resolve(homedir(), '.local', 'bin'),
              agentDir ? resolve(agentDir, '.venv', 'bin') : '',
              agentDir ? resolve(agentDir, 'venv', 'bin') : '',
              process.env.PATH || '',
            ].filter(Boolean).join(':'),
          },
        },
      )

      child.unref()

      for (let attempt = 0; attempt < 10; attempt += 1) {
        await new Promise((resolveAttempt) => setTimeout(resolveAttempt, 1_000))
        if (await isClaudeAgentHealthy()) {
          return {
            ok: true,
            pid: child.pid,
            message: 'started',
          }
        }
      }

      return {
        ok: true,
        pid: child.pid,
        message: 'starting',
      }
    } catch (error) {
      return {
        ok: false,
        error: error instanceof Error ? error.message : String(error),
      }
    }
  })()

  try {
    return await startPromise
  } finally {
    startPromise = null
  }
}
