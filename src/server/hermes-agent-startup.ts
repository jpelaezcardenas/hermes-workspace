import { existsSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { homedir } from 'node:os'

export const HERMES_GATEWAY_PORT = 8642

export type HermesLaunchPlan = {
  command: string
  args: string[]
  cwd?: string
}

export function isHermesAgentDir(candidate: string): boolean {
  return (
    existsSync(resolve(candidate, 'gateway', 'run.py')) ||
    existsSync(resolve(candidate, 'run_agent.py')) ||
    existsSync(resolve(candidate, 'webapi'))
  )
}

/** Same directory resolution logic for server runtime and Vite dev startup. */
export function resolveClaudeAgentDir(
  env: Record<string, string | undefined> = process.env,
): string | null {
  const candidates: string[] = []

  const explicitAgentPath = env.HERMES_AGENT_PATH?.trim() || env.CLAUDE_AGENT_PATH?.trim()
  if (explicitAgentPath) candidates.push(explicitAgentPath)

  const workspaceRoot = dirname(resolve('.'))
  candidates.push(
    resolve(workspaceRoot, 'hermes-agent'),
    resolve(workspaceRoot, '..', 'hermes-agent'),
    resolve(homedir(), '.hermes', 'hermes-agent'),
    resolve(homedir(), '.claude', 'hermes-agent'),
    resolve(homedir(), 'hermes-agent'),
  )

  for (const candidate of candidates) {
    if (isHermesAgentDir(candidate)) return candidate
  }
  return null
}

/** Find the Hermes CLI binary, keeping legacy Claude locations as fallbacks. */
export function resolveClaudeBinary(
  env: Record<string, string | undefined> = process.env,
): string | null {
  const candidates = [
    env.HERMES_CLI_BIN || '',
    resolve(homedir(), '.hermes', 'hermes-agent', 'venv', 'bin', 'hermes'),
    resolve(homedir(), '.local', 'bin', 'hermes'),
    env.CLAUDE_CLI_BIN || '',
    resolve(homedir(), '.claude', 'bin', 'claude'),
    resolve(homedir(), '.local', 'bin', 'claude'),
  ]
  for (const candidate of candidates) {
    if (candidate && existsSync(candidate)) return candidate
  }
  return null
}

export function resolveClaudePython(agentDir: string): string {
  const venvPython = resolve(agentDir, '.venv', 'bin', 'python')
  if (existsSync(venvPython)) return venvPython
  const uvVenv = resolve(agentDir, 'venv', 'bin', 'python')
  if (existsSync(uvVenv)) return uvVenv
  const nousPython = resolve(homedir(), '.claude', 'venv', 'bin', 'python')
  if (existsSync(nousPython)) return nousPython
  return 'python3'
}

export function buildHermesAgentLaunchPlan({
  agentDir,
  binary,
  port = HERMES_GATEWAY_PORT,
}: {
  agentDir: string | null
  binary: string | null
  port?: number | string
}): HermesLaunchPlan | null {
  if (binary) {
    return {
      command: binary,
      args: ['gateway', 'run', '--replace'],
      cwd: agentDir ?? undefined,
    }
  }

  if (!agentDir) return null

  if (existsSync(resolve(agentDir, 'gateway', 'run.py')) || existsSync(resolve(agentDir, 'run_agent.py'))) {
    return {
      command: resolveClaudePython(agentDir),
      args: ['-m', 'gateway.run'],
      cwd: agentDir,
    }
  }

  return {
    command: resolveClaudePython(agentDir),
    args: ['-m', 'uvicorn', 'webapi.app:app', '--host', '0.0.0.0', '--port', String(port)],
    cwd: agentDir,
  }
}

export function hermesGatewayEnv(
  baseEnv: Record<string, string | undefined> = process.env,
  fileEnv: Record<string, string | undefined> = {},
  port: string | number = HERMES_GATEWAY_PORT,
): Record<string, string | undefined> {
  return {
    ...baseEnv,
    ...fileEnv,
    API_SERVER_ENABLED: baseEnv.API_SERVER_ENABLED ?? fileEnv.API_SERVER_ENABLED ?? 'true',
    API_SERVER_HOST: baseEnv.API_SERVER_HOST ?? fileEnv.API_SERVER_HOST ?? '127.0.0.1',
    API_SERVER_PORT: baseEnv.API_SERVER_PORT ?? fileEnv.API_SERVER_PORT ?? String(port),
    API_SERVER_CORS_ORIGINS:
      baseEnv.API_SERVER_CORS_ORIGINS ??
      fileEnv.API_SERVER_CORS_ORIGINS ??
      'http://localhost:3000,http://127.0.0.1:3000',
  }
}
