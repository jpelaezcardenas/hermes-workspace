import { execFileSync } from 'node:child_process'

export type HermesHealthcheckComponentInput = {
  name?: unknown
  ok?: unknown
  required?: unknown
  detail?: unknown
}

export type HermesHealthcheckInput = {
  overall_ok?: unknown
  components?: unknown
}

export type HermesStatusComponent = {
  name: string
  ok: boolean
  required: boolean
  severity: 'ok' | 'warn' | 'fail'
  detail: string
}

export type HermesStatusPayload = {
  overallOk: boolean
  checkedAt: number
  source: string
  components: HermesStatusComponent[]
  summary: {
    ok: number
    warn: number
    fail: number
    total: number
  }
}

const DEFAULT_HEALTHCHECK_BIN = process.env.HERMES_HEALTHCHECK_BIN || '/home/kaan/dev/scripts/hermes-healthcheck'

const REDACTION_PATTERNS = [
  /sk-[A-Za-z0-9_-]{6,}/gu,
  /(?<key>api[_-]?key|token|secret|password)\s*=\s*[^\s,;}]+/giu,
  /authorization:\s*bearer\s+[^\s,;}]+/giu,
]

export function sanitizeHermesStatusText(input: string): string {
  return REDACTION_PATTERNS.reduce((text, pattern) => {
    return text.replace(pattern, (match: string, ...args: unknown[]) => {
      const groups = args.at(-1) as { key?: string } | undefined
      if (groups?.key) return `${groups.key}=[REDACTED]`
      if (match.toLowerCase().startsWith('authorization:')) return 'Authorization: Bearer ***'
      return '[REDACTED]'
    })
  }, input)
}

function normalizeComponent(input: HermesHealthcheckComponentInput): HermesStatusComponent {
  const ok = input.ok === true
  const required = input.required !== false
  const severity: HermesStatusComponent['severity'] = ok ? 'ok' : required ? 'fail' : 'warn'
  return {
    name: typeof input.name === 'string' ? input.name : 'unknown',
    ok,
    required,
    severity,
    detail: sanitizeHermesStatusText(typeof input.detail === 'string' ? input.detail : ''),
  }
}

export function normalizeHermesStatusPayload(
  payload: HermesHealthcheckInput,
  options: { checkedAt?: number; source?: string } = {},
): HermesStatusPayload {
  const components = Array.isArray(payload.components)
    ? payload.components.map((item) => normalizeComponent(item as HermesHealthcheckComponentInput))
    : []
  const summary = components.reduce(
    (acc, component) => {
      acc[component.severity] += 1
      acc.total += 1
      return acc
    },
    { ok: 0, warn: 0, fail: 0, total: 0 },
  )
  const requiredOk = components.every((component) => component.ok || !component.required)
  return {
    overallOk: payload.overall_ok === true && requiredOk,
    checkedAt: options.checkedAt ?? Date.now(),
    source: options.source ?? DEFAULT_HEALTHCHECK_BIN,
    components,
    summary,
  }
}

export function getHermesStatus(): HermesStatusPayload {
  try {
    const raw = execFileSync(DEFAULT_HEALTHCHECK_BIN, ['--json'], {
      encoding: 'utf8',
      timeout: 12_000,
      env: {
        ...process.env,
        HERMES_HEALTHCHECK_SKIP_WORKSPACE_HTTP: '1',
      },
    })
    const parsed = JSON.parse(raw) as HermesHealthcheckInput
    return normalizeHermesStatusPayload(parsed, { source: DEFAULT_HEALTHCHECK_BIN })
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error)
    return normalizeHermesStatusPayload(
      {
        overall_ok: false,
        components: [
          {
            name: 'hermes_healthcheck',
            ok: false,
            required: true,
            detail,
          },
        ],
      },
      { source: DEFAULT_HEALTHCHECK_BIN },
    )
  }
}
