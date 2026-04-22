import fs from 'node:fs'
import path from 'node:path'
import os from 'node:os'
import YAML from 'yaml'
import { json } from '@tanstack/react-start'
import { createFileRoute } from '@tanstack/react-router'
import { isAuthenticated } from '../../server/auth-middleware'
import {
  ensureGatewayProbed,
  getGatewayCapabilities,
} from '../../server/hermes-api'
import { BEARER_TOKEN, HERMES_API } from '../../server/gateway-capabilities'
import {
  ensureDiscovery,
  getDiscoveredModels,
  ensureProviderInConfig,
} from '../../server/local-provider-discovery'

type ModelEntry = {
  provider?: string
  id?: string
  name?: string
  [key: string]: unknown
}

function getHermesHome(): string {
  return process.env.HERMES_HOME?.trim() || path.join(os.homedir(), '.hermes')
}

function asRecord(value: unknown): Record<string, unknown> {
  if (value && typeof value === 'object' && !Array.isArray(value))
    return value as Record<string, unknown>
  return {}
}

function readString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : ''
}

function normalizeModel(entry: unknown): ModelEntry | null {
  if (typeof entry === 'string') {
    const id = entry.trim()
    if (!id) return null
    return {
      id,
      name: id,
      provider: id.includes('/') ? id.split('/')[0] : 'unknown',
    }
  }
  const record = asRecord(entry)
  const id =
    readString(record.id) || readString(record.name) || readString(record.model)
  if (!id) return null
  return {
    ...record,
    id,
    name:
      readString(record.name) ||
      readString(record.display_name) ||
      readString(record.label) ||
      id,
    provider:
      readString(record.provider) ||
      readString(record.owned_by) ||
      (id.includes('/') ? id.split('/')[0] : 'unknown'),
  }
}

/**
 * Read user-configured models from the active profile's models.json.
 */
function readHermesModelsJson(): Array<ModelEntry> {
  const modelsPath = path.join(getHermesHome(), 'models.json')
  try {
    if (!fs.existsSync(modelsPath)) return []
    const raw = fs.readFileSync(modelsPath, 'utf-8')
    const entries = JSON.parse(raw)
    if (!Array.isArray(entries)) return []
    return entries
      .map((entry: unknown): ModelEntry | null => {
        const record = asRecord(entry)
        const modelId = readString(record.model) || readString(record.id)
        if (!modelId) return null
        return {
          id: modelId,
          name: readString(record.name) || modelId,
          provider: readString(record.provider) || 'unknown',
        }
      })
      .filter((entry): entry is ModelEntry => entry !== null)
  } catch {
    return []
  }
}

/**
 * Read the default model from the active profile's config.yaml using a proper YAML parser.
 */
function readHermesDefaultModel(): ModelEntry | null {
  const configPath = path.join(getHermesHome(), 'config.yaml')
  try {
    if (!fs.existsSync(configPath)) return null
    const raw = fs.readFileSync(configPath, 'utf-8')
    const parsed = asRecord(YAML.parse(raw))

    let modelId = ''
    let provider = ''

    const modelField = parsed.model
    if (typeof modelField === 'string') {
      modelId = modelField
      provider = readString(parsed.provider)
    } else if (modelField && typeof modelField === 'object' && !Array.isArray(modelField)) {
      const modelObj = modelField as Record<string, unknown>
      modelId = readString(modelObj.default)
      provider = readString(modelObj.provider) || readString(parsed.provider)
    }

    if (!modelId) return null
    return { id: modelId, name: modelId, provider: provider || 'unknown' }
  } catch {
    return null
  }
}

/**
 * Fallback: fetch models from the hermes-agent /v1/models endpoint.
 */
async function fetchHermesModels(): Promise<Array<ModelEntry>> {
  const headers: Record<string, string> = {}
  if (BEARER_TOKEN) headers['Authorization'] = `Bearer ${BEARER_TOKEN}`
  const response = await fetch(`${HERMES_API}/v1/models`, { headers })
  if (!response.ok)
    throw new Error(`Hermes models request failed (${response.status})`)
  const payload = asRecord(await response.json())
  const rawModels = Array.isArray(payload.data)
    ? payload.data
    : Array.isArray(payload.models)
      ? payload.models
      : []
  return rawModels
    .map(normalizeModel)
    .filter((e): e is ModelEntry => e !== null)
}

export const Route = createFileRoute('/api/models')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        if (!isAuthenticated(request)) {
          return json({ ok: false, error: 'Unauthorized' }, { status: 401 })
        }
        await ensureGatewayProbed()

        try {
          // Primary: read user-configured models from active profile's models.json
          let models = readHermesModelsJson()
          let source = 'models.json'

          // Ensure the default model from config.yaml is always included
          const defaultModel = readHermesDefaultModel()
          if (defaultModel) {
            const hasDefault = models.some((m) => m.id === defaultModel.id)
            if (!hasDefault) {
              models.unshift(defaultModel)
            }
          }

          // Fallback: if no models.json, fetch from hermes-agent /v1/models
          if (models.length === 0 && getGatewayCapabilities().models) {
            models = await fetchHermesModels()
            source = 'hermes-agent'
          }

          // Merge auto-discovered local models (Ollama, Atomic Chat, etc.)
          await ensureDiscovery()
          const localModels = getDiscoveredModels()
          const existingIds = new Set(models.map((m) => m.id))
          for (const m of localModels) {
            if (!existingIds.has(m.id)) {
              models.push(m)
              existingIds.add(m.id)
              ensureProviderInConfig(m.provider)
            }
          }

          const configuredProviders = Array.from(
            new Set(
              models
                .map((model) =>
                  typeof model.provider === 'string' ? model.provider : '',
                )
                .filter(Boolean),
            ),
          )

          return json({
            ok: true,
            object: 'list',
            data: models,
            models,
            configuredProviders,
            source,
          })
        } catch (err) {
          return json(
            {
              ok: false,
              error: err instanceof Error ? err.message : String(err),
            },
            { status: 503 },
          )
        }
      },
    },
  },
})
