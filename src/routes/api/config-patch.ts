/**
 * Workspace Config Write API — `/api/config-patch` (POST)
 *
 * Accepts two body shapes used by Studio callers (do NOT change without
 * updating gateway-api.ts:setDefaultModel + providers-screen.tsx +
 * provider-wizard.tsx):
 *
 *   1) Legacy "raw" patch (gateway-api.ts:312, provider-wizard.tsx:262):
 *        { raw: string, reason?: string }
 *      where `raw` is itself a JSON-encoded patch object that gets deep-merged
 *      into the workspace config (e.g. {"defaultModel":"gpt-5"} or
 *      {"auth":{"profiles":{"<id>:default":{"provider":"...", "apiKey":"..."}}}}).
 *
 *   2) Path/value setter (providers-screen.tsx:1449):
 *        { path: string | string[], value: unknown, label?: string }
 *      Sets a single dotted/array path in the merged workspace config.
 *
 * Persistence strategy (no gateway admin/config endpoint exists today —
 * curl-probed http://127.0.0.1:8642/api/admin/config and /v1/admin/config
 * both return 404, so we persist locally):
 *
 *   - Workspace-only keys (defaultModel, defaultProvider, modelVisibility,
 *     providerKey, model, provider, ui, etc.) are deep-merged into
 *     ~/.hermes/config.yaml, preserving every existing key.
 *   - auth.profiles.<key>.apiKey writes additionally mirror to ~/.hermes/.env
 *     under the canonical envvar for that provider when known
 *     (atomic temp+rename), and the apiKey field is stripped from the YAML
 *     copy so we never persist a raw secret in config.yaml.
 *   - Any failure short-circuits with a 500 + safe error.
 *
 * Auth: `isAuthenticated` (matches connection-settings.ts / files.ts).
 */
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import YAML from 'yaml'
import { isAuthenticated } from '../../server/auth-middleware'
import {
  requireJsonContentType,
  safeErrorMessage,
} from '../../server/rate-limit'

const HERMES_HOME =
  process.env.HERMES_HOME ??
  process.env.CLAUDE_HOME ??
  path.join(os.homedir(), '.hermes')
const CONFIG_PATH = path.join(HERMES_HOME, 'config.yaml')
const ENV_PATH = path.join(HERMES_HOME, '.env')

const PROVIDER_ENV_KEYS: Record<string, string> = {
  anthropic: 'ANTHROPIC_API_KEY',
  openai: 'OPENAI_API_KEY',
  'openai-codex': 'OPENAI_API_KEY',
  openrouter: 'OPENROUTER_API_KEY',
  zai: 'GLM_API_KEY',
  glm: 'GLM_API_KEY',
  'kimi-coding': 'KIMI_API_KEY',
  kimi: 'KIMI_API_KEY',
  moonshot: 'KIMI_API_KEY',
  minimax: 'MINIMAX_API_KEY',
  'minimax-cn': 'MINIMAX_CN_API_KEY',
  xiaomi: 'XIAOMI_API_KEY',
  nvidia: 'NVIDIA_API_KEY',
  nous: 'NOUS_API_KEY',
  google: 'GOOGLE_API_KEY',
  gemini: 'GOOGLE_API_KEY',
}

function readYamlConfig(): Record<string, unknown> {
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

function writeYamlConfigAtomic(config: Record<string, unknown>): void {
  fs.mkdirSync(HERMES_HOME, { recursive: true, mode: 0o700 })
  const tmp = `${CONFIG_PATH}.tmp.${process.pid}.${Date.now()}`
  fs.writeFileSync(tmp, YAML.stringify(config), { encoding: 'utf-8', mode: 0o600 })
  fs.renameSync(tmp, CONFIG_PATH)
}

function readEnv(): Record<string, string> {
  try {
    const raw = fs.readFileSync(ENV_PATH, 'utf-8')
    const env: Record<string, string> = {}
    for (const line of raw.split('\n')) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue
      const eq = trimmed.indexOf('=')
      if (eq <= 0) continue
      const k = trimmed.slice(0, eq).trim()
      let v = trimmed.slice(eq + 1).trim()
      if (
        (v.startsWith('"') && v.endsWith('"')) ||
        (v.startsWith("'") && v.endsWith("'"))
      ) {
        v = v.slice(1, -1)
      }
      env[k] = v
    }
    return env
  } catch {
    return {}
  }
}

function writeEnvAtomic(env: Record<string, string>): void {
  fs.mkdirSync(HERMES_HOME, { recursive: true, mode: 0o700 })
  const lines = Object.entries(env).map(([k, v]) => `${k}=${v}`)
  const tmp = `${ENV_PATH}.tmp.${process.pid}.${Date.now()}`
  fs.writeFileSync(tmp, lines.join('\n') + '\n', {
    encoding: 'utf-8',
    mode: 0o600,
  })
  fs.renameSync(tmp, ENV_PATH)
}

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return !!v && typeof v === 'object' && !Array.isArray(v)
}

function deepMerge(
  target: Record<string, unknown>,
  source: Record<string, unknown>,
): void {
  for (const [key, value] of Object.entries(source)) {
    // Block prototype pollution via JSON.parse-promoted own properties.
    if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
      continue
    }
    if (value === null) {
      delete target[key]
      continue
    }
    if (isPlainObject(value) && isPlainObject(target[key])) {
      deepMerge(target[key] as Record<string, unknown>, value)
    } else {
      target[key] = value
    }
  }
}

function setByPath(
  target: Record<string, unknown>,
  pathParts: string[],
  value: unknown,
): void {
  let cur: Record<string, unknown> = target
  for (let i = 0; i < pathParts.length - 1; i++) {
    const k = pathParts[i]
    if (k === '__proto__' || k === 'constructor' || k === 'prototype') {
      throw new Error('Reserved path segment')
    }
    if (!isPlainObject(cur[k])) cur[k] = {}
    cur = cur[k] as Record<string, unknown>
  }
  const last = pathParts[pathParts.length - 1]
  if (last === '__proto__' || last === 'constructor' || last === 'prototype') {
    throw new Error('Reserved path segment')
  }
  if (value === null || value === undefined) {
    delete cur[last]
  } else {
    cur[last] = value
  }
}

/**
 * Walk auth.profiles.<id>.apiKey entries, copy the secret to ~/.hermes/.env
 * under the provider's canonical envvar, and strip the secret from the
 * patch so it isn't persisted in plaintext YAML. Returns persisted env keys.
 */
function extractProviderSecrets(patch: Record<string, unknown>): {
  envWrites: Record<string, string>
  unmappedProfiles: string[]
} {
  const envWrites: Record<string, string> = {}
  const unmappedProfiles: string[] = []
  const auth = patch.auth
  if (!isPlainObject(auth)) return { envWrites, unmappedProfiles }
  const profiles = auth.profiles
  if (!isPlainObject(profiles)) return { envWrites, unmappedProfiles }

  for (const [profileKey, profile] of Object.entries(profiles)) {
    if (!isPlainObject(profile)) continue
    const apiKey =
      typeof profile.apiKey === 'string' ? profile.apiKey.trim() : ''
    if (!apiKey) continue
    const provider =
      typeof profile.provider === 'string' && profile.provider.trim().length > 0
        ? profile.provider.trim()
        : profileKey.split(':')[0]
    const envKey = PROVIDER_ENV_KEYS[provider.toLowerCase()]
    if (envKey) {
      envWrites[envKey] = apiKey
      // Drop the raw secret from the YAML-bound copy. Leave a marker so the
      // profile is still recorded.
      delete (profile as Record<string, unknown>).apiKey
      ;(profile as Record<string, unknown>).authSource = 'env'
    } else {
      unmappedProfiles.push(profileKey)
    }
  }
  return { envWrites, unmappedProfiles }
}

type RawPatchBody = { raw: string; reason?: string }
type SetPathBody = {
  path: string | string[]
  value: unknown
  label?: string
}

function isRawPatchBody(b: unknown): b is RawPatchBody {
  return isPlainObject(b) && typeof (b as Record<string, unknown>).raw === 'string'
}
function isSetPathBody(b: unknown): b is SetPathBody {
  if (!isPlainObject(b)) return false
  const o = b as Record<string, unknown>
  return (typeof o.path === 'string' || Array.isArray(o.path)) && 'value' in o
}

export const Route = createFileRoute('/api/config-patch')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        if (!isAuthenticated(request)) {
          return json({ ok: false, error: 'Unauthorized' }, { status: 401 })
        }
        const csrf = requireJsonContentType(request)
        if (csrf) return csrf

        let body: unknown
        try {
          body = await request.json()
        } catch {
          return json({ ok: false, error: 'Invalid JSON body' }, { status: 400 })
        }

        // Build the patch object that will be deep-merged into config.yaml.
        let patch: Record<string, unknown>
        let mode: 'raw' | 'path'
        if (isRawPatchBody(body)) {
          mode = 'raw'
          try {
            const parsed = JSON.parse(body.raw)
            if (!isPlainObject(parsed)) {
              return json(
                { ok: false, error: 'raw must encode a JSON object' },
                { status: 400 },
              )
            }
            patch = parsed
          } catch (error) {
            return json(
              {
                ok: false,
                error: `Invalid raw JSON: ${safeErrorMessage(error)}`,
              },
              { status: 400 },
            )
          }
        } else if (isSetPathBody(body)) {
          mode = 'path'
          const parts = Array.isArray(body.path)
            ? body.path.map((p) => String(p))
            : String(body.path).split('.').filter(Boolean)
          if (parts.length === 0) {
            return json(
              { ok: false, error: 'path must not be empty' },
              { status: 400 },
            )
          }
          patch = {}
          setByPath(patch, parts, body.value)
        } else {
          return json(
            {
              ok: false,
              error: 'Body must be { raw } or { path, value }',
            },
            { status: 400 },
          )
        }

        try {
          const { envWrites, unmappedProfiles } = extractProviderSecrets(patch)

          // Apply env writes first (atomic, preserves existing keys).
          let persistedEnv = false
          if (Object.keys(envWrites).length > 0) {
            const env = readEnv()
            for (const [k, v] of Object.entries(envWrites)) env[k] = v
            writeEnvAtomic(env)
            persistedEnv = true
          }

          // Then deep-merge the (now-secret-free) patch into config.yaml.
          const current = readYamlConfig()
          deepMerge(current, patch)
          writeYamlConfigAtomic(current)

          return json({
            ok: true,
            mode,
            persisted: persistedEnv ? 'env+config' : 'config',
            unmappedProfiles:
              unmappedProfiles.length > 0 ? unmappedProfiles : undefined,
          })
        } catch (error) {
          return json(
            { ok: false, error: safeErrorMessage(error) },
            { status: 500 },
          )
        }
      },
    },
  },
})
