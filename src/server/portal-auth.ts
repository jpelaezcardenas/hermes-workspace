import {
  chmodSync,
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from 'node:fs'
import { homedir } from 'node:os'
import { dirname, join } from 'node:path'

import { buildWorkforceEnvCatalogLines } from '@/lib/workforce-models'

interface PortalSession {
  email: string
  session_token: string
  portal_url: string
  created_at: string
}

interface WorkforceRuntimeConfig {
  base_url?: string
  model?: string
  model_name?: string
  route_key?: string
  route_manifest?: {
    default?: string
    request_contract?: Record<string, unknown>
    routes?: Array<{
      capability?: string
      route_key?: string
      quality?: string
    }>
  }
  api_key?: string
  account_id?: string
  token_expires_at?: string
  can_use_workforce?: boolean
  credit_required?: boolean
  credit_balance?: number
  credit_balance_usd?: number
  credit_balance_cents?: number
  minimum_credit_cents?: number
  credit_status?: string
}

export interface AppliedWorkforceConfig {
  baseUrl: string
  model: string
  productModel: string
  routeKey: string
  creditStatus?: string
}

const DEFAULT_PORTAL_URL = 'https://app.99pages.uk'
const DEFAULT_WORKFORCE_MODEL = '99pages/fast'
const DEFAULT_EXECUTION_ROUTE = '99pages/fast'
const WORKFORCE_PROVIDER = 'ai-workforce'
const WORKFORCE_API_KEY_ENV = 'P99_WORKFORCE_API_KEY'

function stripTrailingSlash(value: string): string {
  return value.replace(/\/+$/, '')
}

export function getPortalBaseUrl(): string {
  return stripTrailingSlash(
    process.env.AGENTIC_OS_PORTAL_URL ||
      process.env.P99_PORTAL_URL ||
      DEFAULT_PORTAL_URL,
  )
}

function getAgenticHome(): string {
  return (
    process.env.AGENTIC_OS_HOST_HOME ||
    process.env.AGENTIC_OS_HOME ||
    join(homedir(), '.agentic-os')
  )
}

function getHermesHome(): string {
  return (
    process.env.HERMES_HOME ||
    process.env.CLAUDE_HOME ||
    join(homedir(), '.hermes')
  )
}

function getDefaultWorkforceBaseUrl(): string {
  return stripTrailingSlash(
    process.env.P99_WORKFORCE_BASE_URL ||
      process.env.AGENTIC_OS_WORKFORCE_BASE_URL ||
      `${getPortalBaseUrl()}/ai/v1`,
  )
}

function sessionPath(): string {
  return join(getAgenticHome(), 'session.json')
}

function yamlString(value: string): string {
  return JSON.stringify(value)
}

async function readJsonResponse<T>(res: Response): Promise<T> {
  const text = await res.text()
  const data = text ? JSON.parse(text) : {}

  if (!res.ok) {
    const message =
      typeof data?.error === 'string'
        ? data.error
        : typeof data?.message === 'string'
          ? data.message
          : `Portal request failed with HTTP ${res.status}`
    throw new Error(message)
  }

  return data as T
}

export async function requestMagicLink(email: string): Promise<void> {
  const res = await fetch(`${getPortalBaseUrl()}/api/v1/portal/auth/request`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  })
  await readJsonResponse<unknown>(res)
}

export async function verifyMagicLinkToken(
  email: string,
  token: string,
): Promise<PortalSession> {
  const res = await fetch(`${getPortalBaseUrl()}/api/v1/portal/auth/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token }),
  })
  const data = await readJsonResponse<{ session_token?: string }>(res)

  if (!data.session_token) {
    throw new Error('Portal did not return a session token')
  }

  const session: PortalSession = {
    email,
    session_token: data.session_token,
    portal_url: getPortalBaseUrl(),
    created_at: new Date().toISOString(),
  }
  writePortalSession(session)
  return session
}

function writePortalSession(session: PortalSession): void {
  const file = sessionPath()
  mkdirSync(dirname(file), { recursive: true, mode: 0o700 })
  writeFileSync(file, JSON.stringify(session, null, 2), {
    encoding: 'utf8',
    mode: 0o600,
  })
  try {
    chmodSync(file, 0o600)
  } catch {
    // Windows treats chmod as best effort for local developer installs.
  }
}

export async function fetchWorkforceConfig(
  sessionToken: string,
): Promise<WorkforceRuntimeConfig> {
  const res = await fetch(
    `${getPortalBaseUrl()}/api/v1/portal/workforce/config`,
    {
      headers: { Authorization: `Bearer ${sessionToken}` },
    },
  )
  return readJsonResponse<WorkforceRuntimeConfig>(res)
}

function workforceExecutionRoute(config: WorkforceRuntimeConfig): string {
  const direct = config.route_key?.trim()
  if (direct) return direct

  const manifestDefault = config.route_manifest?.default?.trim()
  if (manifestDefault) return manifestDefault

  const mainRoute = config.route_manifest?.routes?.find(
    (route) => route.capability === 'main_agent' && route.route_key?.trim(),
  )?.route_key
  if (mainRoute) return mainRoute

  return DEFAULT_EXECUTION_ROUTE
}

function isCreditBalanceHealthy(config: WorkforceRuntimeConfig): boolean {
  if (config.can_use_workforce === false) return false
  const balanceCents =
    config.credit_balance_cents ??
    Math.round((config.credit_balance_usd ?? config.credit_balance ?? 0) * 100)
  const minimumCents = config.minimum_credit_cents ?? 100
  return balanceCents >= minimumCents
}

function parseErrorPayload(text: string): {
  code?: string
  message?: string
  type?: string
} {
  try {
    const parsed = JSON.parse(text)
    const error = parsed?.error ?? parsed?.detail ?? parsed
    if (typeof error === 'string') return { message: error }
    return {
      code: typeof error?.code === 'string' ? error.code : undefined,
      message:
        typeof error?.message === 'string'
          ? error.message
          : typeof error?.detail === 'string'
            ? error.detail
            : text,
      type: typeof error?.type === 'string' ? error.type : undefined,
    }
  } catch {
    return { message: text }
  }
}

function downstreamConfigErrorMessage(
  status: number,
  bodyText: string,
  config: WorkforceRuntimeConfig,
): string {
  const error = parseErrorPayload(bodyText)
  const message = error.message || `HTTP ${status}`
  const code = (error.code || '').toLowerCase()
  const healthyCredit = isCreditBalanceHealthy(config)

  if (code === 'insufficient_user_quota' && healthyCredit) {
    return [
      'AI Workforce downstream token is bound to a stale NewAPI ledger.',
      'App account credit is healthy, but the AI Workforce endpoint sees insufficient quota.',
      'Re-bind or regenerate the account workforce token before installing.',
    ].join(' ')
  }

  if (code === 'model_not_found' || /under group default/i.test(message)) {
    return [
      'AI Workforce downstream token is not bound to the AI Workforce route group.',
      'NewAPI must expose 99Pages routes such as 99pages/fast, 99pages/pro, or 99pages/think for this token.',
    ].join(' ')
  }

  if (status === 401 || /invalid token/i.test(message)) {
    return 'AI Workforce downstream token is invalid. Reissue the Portal workforce token before installing.'
  }

  return `AI Workforce downstream validation failed: ${message}`
}

export async function validateWorkforceRuntimeConfig(
  config: WorkforceRuntimeConfig,
): Promise<void> {
  if ((process.env.P99_SKIP_WORKFORCE_SMOKE || '').trim() === '1') return

  if (!isCreditBalanceHealthy(config)) {
    throw new Error('AI Workforce credit is not available for this account')
  }

  const apiKey = config.api_key?.trim()
  if (!apiKey) {
    throw new Error('AI Workforce downstream token is missing')
  }

  const routeKey = workforceExecutionRoute(config)
  const baseUrl = normalizeOpenAIBaseUrl(config.base_url)
  const res = await fetch(`${baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'User-Agent': '99Pages-Agentic-OS-Windows/3.1',
      'x-99p-route-key': routeKey,
    },
    body: JSON.stringify({
      model: routeKey,
      messages: [{ role: 'user', content: 'Reply exactly OK.' }],
      max_tokens: 1,
      temperature: 0,
      metadata: {
        route_key: routeKey,
        source: 'windows-desktop-login-smoke',
      },
    }),
  })

  const text = await res.text()
  if (!res.ok) {
    throw new Error(downstreamConfigErrorMessage(res.status, text, config))
  }
}

function normalizeOpenAIBaseUrl(baseUrl?: string): string {
  const raw = stripTrailingSlash(baseUrl || getDefaultWorkforceBaseUrl())
  if (raw.endsWith('/v1')) return raw
  if (raw.endsWith('/v1/chat/completions')) {
    return raw.slice(0, -'/chat/completions'.length)
  }
  return `${raw}/v1`
}

export function applyWorkforceConfig(
  config: WorkforceRuntimeConfig,
): AppliedWorkforceConfig {
  const baseUrl = normalizeOpenAIBaseUrl(config.base_url)
  const productModel = config.model || DEFAULT_WORKFORCE_MODEL
  const routeKey = workforceExecutionRoute(config)
  const model = routeKey
  const apiKey = config.api_key || 'ai-workforce'
  const hermesHome = getHermesHome()
  const envPath = join(hermesHome, '.env')
  const env99Path = join(hermesHome, '.env.99pages')
  const configPath = join(hermesHome, 'config.yaml')

  mkdirSync(hermesHome, { recursive: true, mode: 0o700 })

  const envBody = [
    'API_SERVER_ENABLED=true',
    `OPENAI_API_KEY=${apiKey}`,
    `OPENAI_BASE_URL=${baseUrl}`,
    `OPENAI_MODEL=${model}`,
    `HERMES_INFERENCE_PROVIDER=${WORKFORCE_PROVIDER}`,
    `HERMES_DEFAULT_MODEL=${model}`,
    `HERMES_PROVIDER=${WORKFORCE_PROVIDER}`,
    `HERMES_MODEL=${model}`,
    `HERMES_99PAGES_PROVIDER_LOCK=${WORKFORCE_PROVIDER}`,
    `HERMES_99PAGES_ROUTE_KEY=${routeKey}`,
    `${WORKFORCE_API_KEY_ENV}=${apiKey}`,
    `P99_PROVIDER_LOCK=${WORKFORCE_PROVIDER}`,
    `P99_WORKFORCE_PRODUCT_MODEL=${productModel}`,
    `P99_WORKFORCE_EXECUTION_MODEL=${model}`,
    `P99_WORKFORCE_ROUTE=${routeKey}`,
    `P99_WORKFORCE_BASE_URL=${baseUrl}`,
    `P99_PORTAL_URL=${getPortalBaseUrl()}`,
    `AGENTIC_OS_PORTAL_URL=${getPortalBaseUrl()}`,
    `AGENTIC_OS_WORKFORCE_BASE_URL=${baseUrl}`,
    'P99_LOGIN_METHOD=magic_link',
    '',
    ...buildWorkforceEnvCatalogLines(),
    '',
  ].join('\n')

  const yamlBody = [
    'model:',
    `  default: ${yamlString(model)}`,
    `  provider: ${yamlString(WORKFORCE_PROVIDER)}`,
    `  base_url: ${yamlString(baseUrl)}`,
    `  key_env: ${yamlString(WORKFORCE_API_KEY_ENV)}`,
    '  api_mode: chat_completions',
    'custom_providers:',
    `  - name: ${yamlString(WORKFORCE_PROVIDER)}`,
    `    base_url: ${yamlString(baseUrl)}`,
    `    key_env: ${yamlString(WORKFORCE_API_KEY_ENV)}`,
    `    api_key: ${yamlString(apiKey)}`,
    `    model: ${yamlString(model)}`,
    '    api_mode: chat_completions',
    '',
  ].join('\n')

  writeFileSync(envPath, envBody, { encoding: 'utf8', mode: 0o600 })
  writeFileSync(env99Path, envBody, { encoding: 'utf8', mode: 0o600 })
  writeFileSync(configPath, yamlBody, { encoding: 'utf8', mode: 0o600 })

  for (const file of [envPath, env99Path, configPath]) {
    try {
      chmodSync(file, 0o600)
    } catch {
      // Best effort on Windows.
    }
  }

  return {
    baseUrl,
    model,
    productModel,
    routeKey,
    creditStatus: config.credit_status,
  }
}
