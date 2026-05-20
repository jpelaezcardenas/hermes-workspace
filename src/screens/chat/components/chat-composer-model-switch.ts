export const MODEL_SWITCH_BLOCKED_TOAST =
  'Model switching requires the enhanced runtime. Set a default via `hermes config set model <id>` — the displayed model reflects your config.'

export type ModelPickerCostTier = 'free' | 'paid' | 'local'
export type ModelPickerBadge = ModelPickerCostTier | 'offline'

export type ModelPickerEntryLike = {
  provider?: string
  costTier?: string
  isLocal?: boolean
  availability?: string
  availabilityReason?: string
  available?: boolean
}

export type ModelPickerGroup = {
  key: string
  label: string
  order: number
}

export type ZeroForkModelInfoFlags = {
  vanillaAgent: boolean
  supportsRuntimeSwitching: boolean
}

function readBoolean(value: unknown): boolean | null {
  return typeof value === 'boolean' ? value : null
}

function readString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : ''
}

function readRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null
}

export function getZeroForkModelInfoFlags(
  payload: unknown,
): ZeroForkModelInfoFlags {
  const record = readRecord(payload)
  const capabilities = readRecord(record?.capabilities)

  const supportsRuntimeSwitching =
    readBoolean(record?.supportsRuntimeSwitching) ??
    readBoolean(record?.supports_runtime_switching) ??
    readBoolean(capabilities?.supportsRuntimeSwitching) ??
    readBoolean(capabilities?.supports_runtime_switching) ??
    false

  const runtime =
    readString(record?.runtime) ||
    readString(record?.agentRuntime) ||
    readString(record?.agent_runtime) ||
    readString(record?.agentType) ||
    readString(record?.agent_type) ||
    readString(record?.backend)

  const vanillaAgent = runtime
    ? /vanilla|upstream|dashboard|hermes-agent/i.test(runtime)
    : !supportsRuntimeSwitching

  return {
    vanillaAgent,
    supportsRuntimeSwitching,
  }
}

export function shouldBlockZeroForkModelSwitch(
  mode: string | null | undefined,
  flags: ZeroForkModelInfoFlags,
): boolean {
  return (
    mode === 'zero-fork' &&
    flags.vanillaAgent &&
    !flags.supportsRuntimeSwitching
  )
}

export function getModelPickerGroup(
  entry: ModelPickerEntryLike,
): ModelPickerGroup {
  if (entry.costTier === 'free') {
    return { key: 'top-free', label: 'Top Free', order: 10 }
  }
  if (entry.costTier === 'paid') {
    return { key: 'top-paid', label: 'Top Paid', order: 20 }
  }
  if (entry.costTier === 'local' || entry.isLocal) {
    return { key: 'top-local', label: 'Local', order: 30 }
  }

  const provider = readString(entry.provider) || 'other'
  return { key: `provider-${provider}`, label: provider, order: 100 }
}

export function compareModelPickerGroups(
  a: ModelPickerGroup,
  b: ModelPickerGroup,
): number {
  if (a.order !== b.order) return a.order - b.order
  return a.label.localeCompare(b.label)
}

export function formatModelPickerGroupLabel(
  group: ModelPickerGroup,
  modelCount: number,
  limit = 10,
): string {
  if (!group.key.startsWith('top-')) return group.label
  const count = Number.isFinite(modelCount) ? Math.max(0, modelCount) : 0
  return `${group.label} (${Math.min(count, limit)}/${limit})`
}

export function getModelPickerBadge(
  entry: ModelPickerEntryLike,
): ModelPickerBadge | null {
  if (!isModelPickerEntryAvailable(entry)) return 'offline'
  if (
    entry.costTier === 'free' ||
    entry.costTier === 'paid' ||
    entry.costTier === 'local'
  ) {
    return entry.costTier
  }
  return entry.isLocal ? 'local' : null
}

export function isModelPickerEntryAvailable(
  entry: ModelPickerEntryLike,
): boolean {
  return entry.available !== false && entry.availability !== 'unavailable'
}
