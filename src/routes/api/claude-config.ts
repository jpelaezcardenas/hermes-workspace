/**
 * Hermes Config API — read/write ~/.hermes/config.yaml and ~/.hermes/.env
 * Gives the web UI the same config power as `hermes setup`
 */
import fs from 'node:fs'
import path from 'node:path'
import os from 'node:os'
import { createFileRoute } from '@tanstack/react-router'
import YAML from 'yaml'
import { isAuthenticated } from '../../server/auth-middleware'
import {
  ensureGatewayProbed,
  getCapabilities,
} from '../../server/gateway-capabilities'
import { createCapabilityUnavailablePayload } from '@/lib/feature-gates'

type AuthResult = Response | true

const CLAUDE_HOME = process.env.HERMES_HOME ?? process.env.CLAUDE_HOME ?? path.join(os.homedir(), '.hermes')
const CONFIG_PATH = path.join(CLAUDE_HOME, 'config.yaml')
const ENV_PATH = path.join(CLAUDE_HOME, '.env')

// Known Hermes providers
const PROVIDERS = [
  { id: 'nous', name: 'Nous Portal', authType: 'oauth', envKeys: [] },
  { id: 'openai-codex', name: 'OpenAI Codex', authType: 'oauth', envKeys: [] },
  {
    id: 'anthropic',
    name: 'Anthropic',
    authType: 'api_key',
    envKeys: ['ANTHROPIC_API_KEY'],
  },
  {
    id: 'openrouter',
    name: 'OpenRouter',
    authType: 'api_key',
    envKeys: ['OPENROUTER_API_KEY'],
  },
  {
    id: 'zai',
    name: 'Z.AI / GLM',
    authType: 'api_key',
    envKeys: ['GLM_API_KEY'],
  },
  {
    id: 'kimi-coding',
    name: 'Kimi / Moonshot',
    authType: 'api_key',
    envKeys: ['KIMI_API_KEY'],
  },
  {
    id: 'minimax',
    name: 'MiniMax',
    authType: 'api_key',
    envKeys: ['MINIMAX_API_KEY'],
  },
  {
    id: 'minimax-cn',
    name: 'MiniMax (China)',
    authType: 'api_key',
    envKeys: ['MINIMAX_CN_API_KEY'],
  },
  {
    id: 'xiaomi',
    name: 'Xiaomi MiMo',
    authType: 'api_key',
    envKeys: ['XIAOMI_API_KEY'],
  },
  { id: 'ollama', name: 'Ollama (Local)', authType: 'none', envKeys: [] },
  {
    id: 'atomic-chat',
    name: 'Atomic Chat (Local)',
    authType: 'none',
    envKeys: [],
  },
  {
    id: 'custom',
    name: 'Custom OpenAI-compatible',
    authType: 'api_key',
    envKeys: ['CUSTOM_API_KEY'],
  },
]

function readConfig(): Record<string, unknown> {
  try {
    const raw = fs.readFileSync(CONFIG_PATH, 'utf-8')
    const parsed = YAML.parse(raw)
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed)
      ? (parsed as Record<string, unknown>)
      : {}
  } catch {
    return {}
  }
}

function writeConfig(config: Record<string, unknown>): void {
  fs.mkdirSync(CLAUDE_HOME, { recursive: true })
  fs.writeFileSync(CONFIG_PATH, YAML.stringify(config), 'utf-8')
}

function readEnv(): Record<string, string> {
  try {
    const raw = fs.readFileSync(ENV_PATH, 'utf-8')
    const env: Record<string, string> = {}
    for (const line of raw.split('\n')) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue
      const eqIdx = trimmed.indexOf('=')
      if (eqIdx > 0) {
        const key = trimmed.slice(0, eqIdx).trim()
        let value = trimmed.slice(eqIdx + 1).trim()
        // Strip quotes
        if (
          (value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))
        ) {
          value = value.slice(1, -1)
        }
        env[key] = value
      }
    }
    return env
  } catch {
    return {}
  }
}

function writeEnv(env: Record<string, string>): void {
  fs.mkdirSync(CLAUDE_HOME, { recursive: true })
  const lines = Object.entries(env).map(([k, v]) => `${k}=${v}`)
  fs.writeFileSync(ENV_PATH, lines.join('\n') + '\n', 'utf-8')
}

function maskKey(key: string): string {
  if (!key || key.length < 8) return '***'
  return key.slice(0, 4) + '...' + key.slice(-4)
}

function nonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0
}

export function checkAuthStore(providerId: string): {
  hasToken: boolean
  source: string
  maskedKey?: string
} {
  // 1. Legacy ~/.hermes/auth-profiles.json lookup
  const storePath = path.join(CLAUDE_HOME, 'auth-profiles.json')
  try {
    if (fs.existsSync(storePath)) {
      const store = JSON.parse(fs.readFileSync(storePath, 'utf-8'))
      const profiles = store?.profiles || {}
      for (const [key, value] of Object.entries(profiles)) {
        if (!key.startsWith(`${providerId}:`)) continue
        if (typeof value !== 'object' || value === null) continue
        const p = value as Record<string, unknown>
        const token = String(p.token || p.key || p.access || '').trim()
        if (token) {
          return { hasToken: true, source: 'claude-auth-store', maskedKey: maskKey(token) }
        }
      }
    }
  } catch {}

  // 2. Current ~/.hermes/auth.json lookup (OAuth tokens + credential_pool)
  const authJsonPath = path.join(CLAUDE_HOME, 'auth.json')
  try {
    if (fs.existsSync(authJsonPath)) {
      const data = JSON.parse(fs.readFileSync(authJsonPath, 'utf-8')) as Record<string, unknown>

      const providers = (data?.providers ?? {}) as Record<string, unknown>
      const providerEntry = providers[providerId]
      if (providerEntry && typeof providerEntry === 'object') {
        const state = (providerEntry as Record<string, unknown>).state
        if (state && typeof state === 'object') {
          const tokens = (state as Record<string, unknown>).tokens
          if (tokens && typeof tokens === 'object') {
            const t = tokens as Record<string, unknown>
            if (nonEmptyString(t.access_token)) {
              return { hasToken: true, source: 'hermes-auth-json', maskedKey: maskKey(t.access_token) }
            }
            if (nonEmptyString(t.id_token)) {
              return { hasToken: true, source: 'hermes-auth-json', maskedKey: maskKey(t.id_token) }
            }
          }
        }
      }

      const pool = (data?.credential_pool ?? {}) as Record<string, unknown>
      const bucket = pool[providerId]
      if (Array.isArray(bucket) && bucket.length > 0) {
        const first = bucket[0]
        if (first && typeof first === 'object') {
          const f = first as Record<string, unknown>
          if (nonEmptyString(f.access_token)) {
            return { hasToken: true, source: 'hermes-auth-json', maskedKey: maskKey(f.access_token) }
          }
          if (nonEmptyString(f.token)) {
            return { hasToken: true, source: 'hermes-auth-json', maskedKey: maskKey(f.token) }
          }
          if (nonEmptyString(f.key)) {
            return { hasToken: true, source: 'hermes-auth-json', maskedKey: maskKey(f.key) }
          }
        }
      }
    }
  } catch {}

  // 3. Claude Code OAuth — ~/.claude/.credentials.json (anthropic-only).
  // Hardcode path off os.homedir() at call time (NOT process.env.CLAUDE_HOME,
  // which is overloaded in this codebase to mean Hermes home).
  if (providerId === 'anthropic') {
    try {
      const claudeCodePath = path.join(os.homedir(), '.claude', '.credentials.json')
      if (fs.existsSync(claudeCodePath)) {
        const data = JSON.parse(fs.readFileSync(claudeCodePath, 'utf-8')) as Record<string, unknown>
        const candidates: Array<unknown> = []
        const oauth = (data?.claudeAiOauth ?? {}) as Record<string, unknown>
        candidates.push(oauth.accessToken, oauth.access_token)
        const altOauth = (data?.oauth ?? {}) as Record<string, unknown>
        candidates.push(altOauth.accessToken, altOauth.access_token)
        candidates.push((data as Record<string, unknown>).accessToken)
        candidates.push((data as Record<string, unknown>).access_token)
        for (const c of candidates) {
          if (nonEmptyString(c)) {
            return { hasToken: true, source: 'claude-code', maskedKey: maskKey(c) }
          }
        }
      }
    } catch {}
  }

  return { hasToken: false, source: '' }
}

export const Route = createFileRoute('/api/claude-config')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const authResult = isAuthenticated(request) as AuthResult
        if (authResult !== true) return authResult
        await ensureGatewayProbed()
        if (!getCapabilities().config) {
          return Response.json({
            ...createCapabilityUnavailablePayload('config'),
            config: {},
            providers: [],
            activeProvider: '',
            activeModel: '',
            claudeHome: CLAUDE_HOME,
          })
        }

        const config = readConfig()
        const env = readEnv()

        // Build provider status
        const providerStatus = PROVIDERS.map((p) => {
          const hasEnvKey =
            p.envKeys.length === 0 || p.envKeys.some((k) => !!env[k])
          const authStoreCheck = checkAuthStore(p.id)
          const hasKey =
            hasEnvKey || authStoreCheck.hasToken || p.authType === 'none'
          const maskedKeys: Record<string, string> = {}
          for (const k of p.envKeys) {
            if (env[k]) maskedKeys[k] = maskKey(env[k])
          }
          if (authStoreCheck.hasToken && authStoreCheck.maskedKey) {
            maskedKeys['auth-store'] = authStoreCheck.maskedKey
          }
          return {
            ...p,
            configured: hasKey,
            authSource: authStoreCheck.hasToken
              ? authStoreCheck.source
              : hasEnvKey
                ? 'env'
                : 'none',
            maskedKeys,
          }
        })

        // Get active provider/model from config
        // Support both flat keys (model: "gpt-5.4", provider: "openai-codex")
        // and legacy nested format (model: { default: "...", provider: "..." })
        const modelField = config.model
        let activeModel = ''
        let activeProvider = ''
        if (typeof modelField === 'string') {
          activeModel = modelField
          activeProvider = (config.provider as string) || ''
        } else if (modelField && typeof modelField === 'object') {
          const modelObj = modelField as Record<string, unknown>
          activeModel = (modelObj.default as string) || ''
          activeProvider =
            (modelObj.provider as string) || (config.provider as string) || ''
        }

        return Response.json({
          config,
          providers: providerStatus,
          activeProvider,
          activeModel,
          claudeHome: CLAUDE_HOME,
        })
      },

      PATCH: async ({ request }) => {
        const authResult = isAuthenticated(request) as AuthResult
        if (authResult !== true) return authResult
        await ensureGatewayProbed()
        if (!getCapabilities().config) {
          return new Response(
            JSON.stringify(
              createCapabilityUnavailablePayload('config', {
                error: 'Configuration updates are unavailable on this backend.',
              }),
            ),
            { status: 503, headers: { 'Content-Type': 'application/json' } },
          )
        }

        const body = (await request.json()) as Record<string, unknown>

        // Handle config updates
        if (body.config && typeof body.config === 'object') {
          const current = readConfig()
          const updates = body.config as Record<string, unknown>

          // Deep merge
          function deepMerge(
            target: Record<string, unknown>,
            source: Record<string, unknown>,
          ) {
            for (const [key, value] of Object.entries(source)) {
              if (
                value &&
                typeof value === 'object' &&
                !Array.isArray(value) &&
                target[key] &&
                typeof target[key] === 'object'
              ) {
                deepMerge(
                  target[key] as Record<string, unknown>,
                  value as Record<string, unknown>,
                )
              } else {
                target[key] = value
              }
            }
          }

          // Handle null values as explicit removals
          for (const [key, value] of Object.entries(updates)) {
            if (value === null) {
              delete current[key]
              delete updates[key]
            }
          }
          deepMerge(current, updates)
          writeConfig(current)
        }

        // Handle env var updates
        if (body.env && typeof body.env === 'object') {
          const currentEnv = readEnv()
          const envUpdates = body.env as Record<string, string | null>
          for (const [key, value] of Object.entries(envUpdates)) {
            if (value === '' || value === null) {
              delete currentEnv[key]
            } else {
              currentEnv[key] = value
            }
          }
          writeEnv(currentEnv)
        }

        return Response.json({
          ok: true,
          message: 'Config updated. Restart Claude to apply changes.',
        })
      },
    },
  },
})
