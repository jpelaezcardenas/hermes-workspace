import { execFileSync } from 'node:child_process'
import * as fs from 'node:fs'
import * as os from 'node:os'
import * as path from 'node:path'

export type CliStatus = {
  installed: boolean
  path: string | null
  version: string | null
  authenticated: boolean
  authMethod: string | null
  status: 'ready' | 'missing' | 'auth_required' | 'error'
  detail: string | null
}

export type CliReadiness = {
  ok: boolean
  checkedAt: number
  cli: {
    claude: CliStatus
    codex: CliStatus
  }
  secrets: {
    codexAuthFilePresent: boolean
    codexTokenPresent: boolean
    hermesAuthFilePresent: boolean
    hermesOpenAiCodexProviderPresent: boolean
  }
}

export type SanitizedCliReadiness = Omit<CliReadiness, 'cli'> & {
  cli: {
    claude: Omit<CliStatus, 'detail'>
    codex: Omit<CliStatus, 'detail'>
  }
}

const REDACTION_PATTERNS = [
  /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/giu,
  /sk-[A-Za-z0-9_-]{6,}/gu,
  /gh[pousr]_[A-Za-z0-9_]{10,}/gu,
  /(token|api[_-]?key|access[_-]?token|refresh[_-]?token)\s*[:=]\s*[^\s,;}]+/giu,
]

export function redactSecrets(input: string): string {
  return REDACTION_PATTERNS.reduce((text, pattern) => text.replace(pattern, '[REDACTED]'), input)
}

function safeExec(command: string, args: string[], timeout = 5_000): { ok: true; output: string } | { ok: false; output: string } {
  try {
    return {
      ok: true,
      output: execFileSync(command, args, {
        encoding: 'utf8',
        timeout,
        env: process.env,
      }).trim(),
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    return { ok: false, output: message }
  }
}

function which(binary: string): string | null {
  const result = safeExec('which', [binary], 2_000)
  return result.ok && result.output ? result.output.split(/\r?\n/u)[0] : null
}

function parseVersion(output: string): string | null {
  return redactSecrets(output).split(/\r?\n/u)[0]?.trim() || null
}

function statusFromOutput(output: string): { authenticated: boolean; authMethod: string | null; detail: string | null } {
  const redacted = redactSecrets(output)
  const lower = redacted.toLowerCase()
  const authenticated = lower.includes('logged in') || lower.includes('authenticated') || lower.includes('login status: ok')
  const authMethod = lower.includes('chatgpt') ? 'chatgpt' : lower.includes('claude') ? 'claude.ai' : authenticated ? 'cli' : null
  return { authenticated, authMethod, detail: redacted || null }
}

function checkCli(binary: 'claude' | 'codex'): CliStatus {
  const pathValue = process.env[`${binary.toUpperCase()}_CLI_BIN`] || which(binary)
  if (!pathValue) {
    return {
      installed: false,
      path: null,
      version: null,
      authenticated: false,
      authMethod: null,
      status: 'missing',
      detail: `${binary} CLI not found`,
    }
  }

  const version = safeExec(pathValue, ['--version'])
  const auth = binary === 'claude'
    ? safeExec(pathValue, ['auth', 'status'])
    : safeExec(pathValue, ['login', 'status'])
  const parsedAuth = statusFromOutput(auth.output)
  const ready = version.ok && auth.ok && parsedAuth.authenticated

  return {
    installed: true,
    path: pathValue,
    version: version.ok ? parseVersion(version.output) : null,
    authenticated: ready,
    authMethod: ready ? parsedAuth.authMethod : null,
    status: ready ? 'ready' : auth.ok ? 'auth_required' : 'error',
    detail: auth.ok ? parsedAuth.detail : redactSecrets(auth.output),
  }
}

function readJsonObject(filePath: string): Record<string, unknown> | null {
  try {
    const parsed = JSON.parse(fs.readFileSync(filePath, 'utf-8')) as unknown
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed as Record<string, unknown> : null
  } catch {
    return null
  }
}

function hasTokenLikeValue(value: unknown): boolean {
  if (typeof value === 'string') return value.length > 10
  if (Array.isArray(value)) return value.some(hasTokenLikeValue)
  if (value && typeof value === 'object') return Object.values(value as Record<string, unknown>).some(hasTokenLikeValue)
  return false
}

function secretPresence() {
  const codexAuthPath = path.join(os.homedir(), '.codex', 'auth.json')
  const hermesAuthPath = path.join(process.env.HERMES_HOME ?? path.join(os.homedir(), '.hermes'), 'auth.json')
  const codexAuth = readJsonObject(codexAuthPath)
  const hermesAuth = readJsonObject(hermesAuthPath)
  return {
    codexAuthFilePresent: fs.existsSync(codexAuthPath),
    codexTokenPresent: hasTokenLikeValue(codexAuth),
    hermesAuthFilePresent: fs.existsSync(hermesAuthPath),
    hermesOpenAiCodexProviderPresent: Boolean(JSON.stringify(hermesAuth ?? {}).includes('openai-codex')),
  }
}

export function getCliReadiness(): CliReadiness {
  const claude = checkCli('claude')
  const codex = checkCli('codex')
  return {
    ok: claude.status === 'ready' && codex.status === 'ready',
    checkedAt: Date.now(),
    cli: { claude, codex },
    secrets: secretPresence(),
  }
}

function sanitizeCliStatus(status: CliStatus): Omit<CliStatus, 'detail'> {
  const { detail: _detail, ...safe } = status
  return safe
}

export function sanitizeCliReadiness(readiness: CliReadiness): SanitizedCliReadiness {
  return {
    ...readiness,
    cli: {
      claude: sanitizeCliStatus(readiness.cli.claude),
      codex: sanitizeCliStatus(readiness.cli.codex),
    },
  }
}
