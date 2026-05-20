import fs from 'node:fs'
import path from 'node:path'

export type ModelCostTier = 'free' | 'paid' | 'local'

export type CanonicalModelCatalogEntry = {
  id?: string
  source_group?: string
  provider?: string
  provider_model_id?: string
  display_name?: string
  status?: string
  input_price_per_m?: number | null
  output_price_per_m?: number | null
  context_length?: number | null
  max_output_tokens?: number | null
  supports_tools?: boolean
  supports_reasoning?: boolean
  supports_vision?: boolean
  ranking_score?: number | null
  ranking_reason?: string | null
  environment?: string
  enabled?: boolean
}

export type SelectableCatalogModel = {
  id: string
  name: string
  provider: string
  costTier: ModelCostTier
  catalogId: string
  sourceGroup: string
  source: 'canonical-model-catalog' | 'live-provider-catalog'
  rank: number
  description: ModelCostTier
  contextLength?: number
  maxOutputTokens?: number
  supportsTools?: boolean
  supportsReasoning?: boolean
  supportsVision?: boolean
  rankingScore?: number
  rankingReason?: string
}

export type LiveProviderModelInput =
  | string
  | {
      id?: string
      name?: string
      model?: string
      display_name?: string
      displayName?: string
      label?: string
      description?: string
      [key: string]: unknown
    }

function readString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : ''
}

function readNumber(value: unknown): number | undefined {
  return typeof value === 'number' && Number.isFinite(value)
    ? value
    : undefined
}

function isEnabledCatalogEntry(entry: CanonicalModelCatalogEntry): boolean {
  return entry.enabled !== false && entry.status !== 'deprecated'
}

function isFreeCatalogEntry(entry: CanonicalModelCatalogEntry): boolean {
  const id = readString(entry.id)
  const sourceGroup = readString(entry.source_group)
  return (
    entry.provider === 'nvidia' ||
    id.endsWith(':free') ||
    sourceGroup.includes('free') ||
    (entry.input_price_per_m === 0 && entry.output_price_per_m === 0)
  )
}

function classifyCatalogEntry(
  entry: CanonicalModelCatalogEntry,
): ModelCostTier {
  if (
    entry.environment === 'local' ||
    entry.source_group === 'local' ||
    entry.provider === 'ollama'
  ) {
    return 'local'
  }
  return isFreeCatalogEntry(entry) ? 'free' : 'paid'
}

function stripCatalogProviderPrefix(id: string, provider: string): string {
  const colonPrefix = `${provider}:`
  if (id.startsWith(colonPrefix)) return id.slice(colonPrefix.length)
  const localPrefix = 'local:'
  if (id.startsWith(localPrefix)) return id.slice(localPrefix.length)
  return id
}

function normalizeProviderModelId(modelId: string, provider: string): string {
  const providerPrefix = `${provider}/`
  if (
    (provider === 'ollama' || provider === 'atomic-chat') &&
    modelId.startsWith(providerPrefix)
  ) {
    return modelId.slice(providerPrefix.length)
  }
  return modelId
}

export function toSelectableCatalogModel(
  entry: CanonicalModelCatalogEntry,
  costTier = classifyCatalogEntry(entry),
  rank = 1,
): SelectableCatalogModel | null {
  if (!isEnabledCatalogEntry(entry)) return null

  const catalogId = readString(entry.id)
  const provider = readString(entry.provider)
  if (!catalogId || !provider) return null

  const rawModelId =
    readString(entry.provider_model_id) ||
    stripCatalogProviderPrefix(catalogId, provider)
  const modelId = normalizeProviderModelId(rawModelId, provider)
  if (!modelId) return null

  const selectable: SelectableCatalogModel = {
    id: modelId,
    name: readString(entry.display_name) || modelId,
    provider,
    costTier,
    catalogId,
    sourceGroup: readString(entry.source_group),
    source: 'canonical-model-catalog',
    rank,
    description: costTier,
  }

  const contextLength = readNumber(entry.context_length)
  if (contextLength !== undefined) selectable.contextLength = contextLength
  const maxOutputTokens = readNumber(entry.max_output_tokens)
  if (maxOutputTokens !== undefined) selectable.maxOutputTokens = maxOutputTokens
  const rankingScore = readNumber(entry.ranking_score)
  if (rankingScore !== undefined) selectable.rankingScore = rankingScore
  const rankingReason = readString(entry.ranking_reason)
  if (rankingReason) selectable.rankingReason = rankingReason
  if (typeof entry.supports_tools === 'boolean') {
    selectable.supportsTools = entry.supports_tools
  }
  if (typeof entry.supports_reasoning === 'boolean') {
    selectable.supportsReasoning = entry.supports_reasoning
  }
  if (typeof entry.supports_vision === 'boolean') {
    selectable.supportsVision = entry.supports_vision
  }

  return selectable
}

function compareCatalogEntries(
  a: CanonicalModelCatalogEntry,
  b: CanonicalModelCatalogEntry,
): number {
  const aScore = readNumber(a.ranking_score) ?? -1
  const bScore = readNumber(b.ranking_score) ?? -1
  if (aScore !== bScore) return bScore - aScore
  return readString(a.display_name || a.id).localeCompare(
    readString(b.display_name || b.id),
  )
}

export function buildTopModelSelections(
  entries: Array<CanonicalModelCatalogEntry>,
  limit = 10,
): Array<SelectableCatalogModel> {
  const tiers: Array<ModelCostTier> = ['free', 'paid', 'local']
  const selections: Array<SelectableCatalogModel> = []

  for (const tier of tiers) {
    const ranked = entries
      .filter((entry) => isEnabledCatalogEntry(entry))
      .filter((entry) => classifyCatalogEntry(entry) === tier)
      .sort(compareCatalogEntries)
      .slice(0, limit)

    ranked.forEach((entry, index) => {
      const model = toSelectableCatalogModel(entry, tier, index + 1)
      if (model) selections.push(model)
    })
  }

  return selections
}

function normalizeLiveProviderModel(entry: LiveProviderModelInput): {
  id: string
  name: string
} | null {
  if (typeof entry === 'string') {
    const id = readString(entry)
    return id ? { id, name: id } : null
  }
  const id =
    readString(entry.id) ||
    readString(entry.model) ||
    readString(entry.name) ||
    readString(entry.label)
  if (!id) return null
  return {
    id,
    name:
      readString(entry.name) ||
      readString(entry.display_name) ||
      readString(entry.displayName) ||
      readString(entry.label) ||
      id,
  }
}

function isFreeProviderModelId(id: string): boolean {
  return id.endsWith(':free') || id.includes(':free:')
}

export function buildPaidLiveProviderFallbackSelections({
  provider,
  models,
  existingModels,
  limit = 10,
}: {
  provider: string
  models: Array<LiveProviderModelInput>
  existingModels: Array<SelectableCatalogModel>
  limit?: number
}): Array<SelectableCatalogModel> {
  const providerId = readString(provider)
  if (!providerId) return []

  const paidCount = existingModels.filter(
    (model) => model.costTier === 'paid',
  ).length
  const remaining = Math.max(0, limit - paidCount)
  if (remaining === 0) return []

  const existingIds = new Set<string>()
  for (const model of existingModels) {
    existingIds.add(model.id)
    existingIds.add(model.catalogId)
    existingIds.add(`${model.provider}/${model.id}`)
    existingIds.add(`${model.provider}:${model.id}`)
  }

  const selections: Array<SelectableCatalogModel> = []
  for (const entry of models) {
    if (selections.length >= remaining) break
    const normalized = normalizeLiveProviderModel(entry)
    if (!normalized) continue
    if (isFreeProviderModelId(normalized.id)) continue
    if (
      existingIds.has(normalized.id) ||
      existingIds.has(`${providerId}/${normalized.id}`) ||
      existingIds.has(`${providerId}:${normalized.id}`)
    ) {
      continue
    }

    existingIds.add(normalized.id)
    existingIds.add(`${providerId}/${normalized.id}`)
    existingIds.add(`${providerId}:${normalized.id}`)

    const rank = paidCount + selections.length + 1
    selections.push({
      id: normalized.id,
      name: normalized.name,
      provider: providerId,
      costTier: 'paid',
      catalogId: `${providerId}:${normalized.id}`,
      sourceGroup: 'live_provider_paid',
      source: 'live-provider-catalog',
      rank,
      description: 'paid',
    })
  }

  return selections
}

function catalogPathCandidates(): Array<string> {
  const envPath = readString(process.env.HERMES_MODEL_CATALOG_PATH)
  return [
    envPath,
    path.resolve(process.cwd(), 'model-catalog.json'),
    path.resolve(process.cwd(), 'infra/model-catalog.json'),
    path.resolve(process.cwd(), '../../infra/model-catalog.json'),
    path.resolve(process.cwd(), '../../../infra/model-catalog.json'),
  ].filter(Boolean)
}

export function readCanonicalModelCatalog(): Array<CanonicalModelCatalogEntry> {
  for (const candidate of catalogPathCandidates()) {
    try {
      if (!fs.existsSync(candidate)) continue
      const parsed = JSON.parse(fs.readFileSync(candidate, 'utf-8')) as unknown
      if (Array.isArray(parsed)) return parsed as Array<CanonicalModelCatalogEntry>
      if (parsed && typeof parsed === 'object') {
        const record = parsed as Record<string, unknown>
        if (Array.isArray(record.models)) {
          return record.models as Array<CanonicalModelCatalogEntry>
        }
      }
    } catch {
      continue
    }
  }
  return []
}
