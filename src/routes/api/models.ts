import fs from 'node:fs'
import path from 'node:path'
import os from 'node:os'
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
import {
  buildPaidLiveProviderFallbackSelections,
  buildTopModelSelections,
  type LiveProviderModelInput,
  readCanonicalModelCatalog,
} from '../../server/model-catalog'
import { getModelAvailability } from '../../server/model-availability'

type ModelEntry = {
  provider?: string
  id?: string
  name?: string
  [key: string]: unknown
}

function modelKey(entry: ModelEntry): string {
  return `${readString(entry.provider)}:${readString(entry.id)}`
}

function asRecord(value: unknown): Record<string, unknown> {
  if (value && typeof value === 'object' && !Array.isArray(value))
    return value as Record<string, unknown>
  return {}
}

function readString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : ''
}

export function normalizeModel(
  entry: unknown,
  runtimeProvider = '',
): ModelEntry | null {
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
  const runtimeModel =
    readString(record.runtime_model) || readString(record.runtimeModel)
  const resolvedId = id === 'hermes-agent' && runtimeModel ? runtimeModel : id
  const providerFromRuntime =
    id === 'hermes-agent' || readString(record.owned_by) === 'runtime'
      ? runtimeProvider
      : ''
  return {
    ...record,
    id: resolvedId,
    name:
      (id === 'hermes-agent' ? runtimeModel : '') ||
      readString(record.name) ||
      readString(record.display_name) ||
      readString(record.label) ||
      resolvedId,
    provider:
      providerFromRuntime ||
      readString(record.provider) ||
      (resolvedId.includes('/') ? resolvedId.split('/')[0] : '') ||
      readString(record.owned_by) ||
      'unknown',
  }
}

export function dedupeModelsByKey(
  entries: Array<ModelEntry>,
): Array<ModelEntry> {
  const seen = new Set<string>()
  return entries.filter((entry) => {
    const key = modelKey(entry)
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

/**
 * Read user-configured models from ~/.hermes/models.json.
 * This is the curated list the user manages via the Hermes CLI or UI.
 * Each entry has: { id, name, provider, model, baseUrl, createdAt }
 */
function readHermesModelsJson(): Array<ModelEntry> {
  const modelsPath = path.join(os.homedir(), '.hermes', 'models.json')
  try {
    if (!fs.existsSync(modelsPath)) return []
    const raw = fs.readFileSync(modelsPath, 'utf-8')
    const entries = JSON.parse(raw)
    if (!Array.isArray(entries)) return []
    return entries
      .map((entry: unknown): ModelEntry | null => {
        const record = asRecord(entry)
        // models.json uses "model" field for the model ID
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
 * Read the default model from ~/.hermes/config.yaml without a YAML parser.
 * Looks for "default: <model-id>" under the "model:" section.
 */
function readHermesDefaultModel(): ModelEntry | null {
  const configPath = path.join(os.homedir(), '.hermes', 'config.yaml')
  try {
    if (!fs.existsSync(configPath)) return null
    const raw = fs.readFileSync(configPath, 'utf-8')
    const defaultMatch = raw.match(/^\s*default:\s*(.+)$/m)
    const providerMatch = raw.match(/^\s*provider:\s*(.+)$/m)
    if (!defaultMatch) return null
    const modelId = defaultMatch[1].trim()
    const provider = providerMatch ? providerMatch[1].trim() : 'unknown'
    return { id: modelId, name: modelId, provider }
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
  const [modelsResponse, configResponse] = await Promise.all([
    fetch(`${HERMES_API}/v1/models`, { headers }),
    fetch(`${HERMES_API}/api/config`, { headers }).catch(() => null),
  ])
  const response = modelsResponse
  if (!response.ok)
    throw new Error(`Hermes models request failed (${response.status})`)
  const configPayload =
    configResponse?.ok === true ? asRecord(await configResponse.json()) : {}
  const configRecord = asRecord(configPayload.config)
  const runtimeProvider =
    readString(configPayload.provider) || readString(configRecord.provider)
  const payload = asRecord(await response.json())
  const rawModels = Array.isArray(payload.data)
    ? payload.data
    : Array.isArray(payload.models)
      ? payload.models
      : []
  return dedupeModelsByKey(
    rawModels
      .map((model) => normalizeModel(model, runtimeProvider))
      .filter((e): e is ModelEntry => e !== null),
  )
}

async function fetchAvailableModelsForProvider(
  provider: string,
): Promise<Array<LiveProviderModelInput>> {
  const headers: Record<string, string> = {}
  if (BEARER_TOKEN) headers['Authorization'] = `Bearer ${BEARER_TOKEN}`
  const response = await fetch(
    `${HERMES_API}/api/available-models?provider=${encodeURIComponent(provider)}`,
    { headers, signal: AbortSignal.timeout(1_500) },
  )
  if (!response.ok) return []
  const payload = asRecord(await response.json())
  return Array.isArray(payload.models)
    ? (payload.models as Array<LiveProviderModelInput>)
    : Array.isArray(payload.data)
      ? (payload.data as Array<LiveProviderModelInput>)
      : []
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
          // Primary: read user-configured models from ~/.hermes/models.json
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
          const liveLocalModelKeys = new Set(
            localModels.map((model) => `${model.provider}:${model.id}`),
          )
          const existingIds = new Set(models.map((m) => readString(m.id)))
          for (const m of localModels) {
            if (!existingIds.has(m.id)) {
              models.push(m)
              existingIds.add(m.id)
              ensureProviderInConfig(m.provider)
            }
          }

          models = dedupeModelsByKey(models)

          const existingModelKeys = new Set(models.map(modelKey))
          const catalogModels = buildTopModelSelections(
            readCanonicalModelCatalog(),
            10,
          )
          for (const catalogModel of catalogModels) {
            const key = modelKey(catalogModel)
            if (existingModelKeys.has(key)) continue
            models.push(catalogModel)
            existingModelKeys.add(key)
          }

          const paidCatalogCount = catalogModels.filter(
            (model) => model.costTier === 'paid',
          ).length
          if (paidCatalogCount < 10) {
            const openrouterModels = await fetchAvailableModelsForProvider(
              'openrouter',
            ).catch(() => [])
            const livePaidModels = buildPaidLiveProviderFallbackSelections({
              provider: 'openrouter',
              models: openrouterModels,
              existingModels: catalogModels,
              limit: 10,
            })
            for (const model of livePaidModels) {
              const key = modelKey(model)
              if (existingModelKeys.has(key)) continue
              models.push(model)
              existingModelKeys.add(key)
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

          const annotatedModels = models.map((model) => {
            const availability = getModelAvailability(
              {
                id: readString(model.id),
                provider: readString(model.provider),
                costTier: readString(model.costTier),
                source: readString(model.source),
              },
              { liveLocalModelKeys },
            )
            return {
              ...model,
              ...availability,
            }
          })

          return json({
            ok: true,
            object: 'list',
            data: annotatedModels,
            models: annotatedModels,
            configuredProviders,
            source,
            catalogSource: 'infra/model-catalog.json',
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
