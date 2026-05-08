import fs from 'node:fs'
import path from 'node:path'
import YAML from 'yaml'

import { createCapabilityUnavailablePayload } from '@/lib/feature-gates'

import { isAuthenticated } from './auth-middleware'
import {
  ensureGatewayProbed,
  getCapabilities,
} from './gateway-capabilities'
import { normalizeHermesConfigState } from './hermes-config-migration'
import {
  applyHermesConfigPatch,
  parseEnvFile,
  readHermesConfigFiles,
  resolveHermesConfigPaths,
  stringifyEnv,
  type HermesConfigPatch,
} from './hermes-config-store'
import {
  ensureDiscovery,
  getDiscoveredModels,
  getDiscoveryStatus,
} from './local-provider-discovery'

type AuthResult = Response | true

const ACTION_MESSAGES: Record<string, string> = {
  'set-default-model': 'Default model updated.',
  'set-api-key': 'API key saved.',
  'remove-api-key': 'API key removed.',
  'set-custom-provider': 'Custom provider saved.',
  'remove-custom-provider': 'Custom provider removed.',
}

const LEGACY_SAVE_MESSAGE = 'Saved.'

async function authorize(request: Request): Promise<AuthResult> {
  const result = isAuthenticated(request) as AuthResult
  if (result !== true) return result
  await ensureGatewayProbed()
  return true
}

function unavailablePayload(extra: Record<string, unknown> = {}): Response {
  return Response.json({
    ...createCapabilityUnavailablePayload('config'),
    config: {},
    providers: [],
    customProviders: [],
    activeProvider: '',
    activeModel: '',
    ...extra,
  })
}

export async function handleHermesConfigGet({
  request,
}: {
  request: Request
}): Promise<Response> {
  const auth = await authorize(request)
  if (auth !== true) return auth

  const paths = resolveHermesConfigPaths()
  if (!getCapabilities().config) {
    return unavailablePayload({ paths, claudeHome: paths.hermesHome })
  }

  await ensureDiscovery()
  const files = readHermesConfigFiles(paths)
  const state = normalizeHermesConfigState({
    paths,
    config: files.config,
    env: files.env,
    authProfiles: files.authProfiles,
    localProviders: getDiscoveryStatus(),
    localModels: getDiscoveredModels(),
  })

  // Legacy /api/claude-config consumers read provider.maskedKeys; alias it.
  const providers = state.providers.map((p) => ({
    ...p,
    maskedKeys: p.maskedCredentials,
  }))

  return Response.json({
    ...state,
    providers,
    claudeHome: paths.hermesHome,
  })
}

function deepMerge(
  target: Record<string, unknown>,
  source: Record<string, unknown>,
): void {
  for (const [key, value] of Object.entries(source)) {
    if (
      value &&
      typeof value === 'object' &&
      !Array.isArray(value) &&
      target[key] &&
      typeof target[key] === 'object' &&
      !Array.isArray(target[key])
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

function applyLegacyConfigBody(
  configPath: string,
  updates: Record<string, unknown>,
): void {
  let current: Record<string, unknown> = {}
  try {
    const raw = fs.readFileSync(configPath, 'utf-8')
    const parsed = YAML.parse(raw)
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      current = parsed as Record<string, unknown>
    }
  } catch {}

  for (const [key, value] of Object.entries(updates)) {
    if (value === null) {
      delete current[key]
      delete updates[key]
    }
  }
  deepMerge(current, updates)
  fs.mkdirSync(path.dirname(configPath), { recursive: true })
  fs.writeFileSync(configPath, YAML.stringify(current), 'utf-8')
}

function applyLegacyEnvBody(
  envPath: string,
  envUpdates: Record<string, string | null>,
): void {
  let current: Record<string, string> = {}
  try {
    current = parseEnvFile(fs.readFileSync(envPath, 'utf-8'))
  } catch {}

  for (const [key, value] of Object.entries(envUpdates)) {
    if (value === '' || value === null) delete current[key]
    else current[key] = value
  }
  fs.mkdirSync(path.dirname(envPath), { recursive: true })
  fs.writeFileSync(envPath, stringifyEnv(current), 'utf-8')
}

export async function handleHermesConfigPatch({
  request,
}: {
  request: Request
}): Promise<Response> {
  const auth = await authorize(request)
  if (auth !== true) return auth

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

  const paths = resolveHermesConfigPaths()
  const body = (await request.json()) as Record<string, unknown>

  if (typeof body.action === 'string') {
    const result = applyHermesConfigPatch(paths, body as unknown as HermesConfigPatch)
    const message = ACTION_MESSAGES[body.action] || LEGACY_SAVE_MESSAGE
    return Response.json({ ...result, message })
  }

  if (body.config && typeof body.config === 'object' && !Array.isArray(body.config)) {
    applyLegacyConfigBody(paths.configPath, body.config as Record<string, unknown>)
  }

  if (body.env && typeof body.env === 'object' && !Array.isArray(body.env)) {
    applyLegacyEnvBody(
      paths.envPath,
      body.env as Record<string, string | null>,
    )
  }

  return Response.json({ ok: true, message: LEGACY_SAVE_MESSAGE })
}
