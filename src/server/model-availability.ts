export type ModelAvailability = 'available' | 'unavailable'

export type ModelAvailabilityEntry = {
  id?: string
  provider?: string
  costTier?: string
  source?: string
}

export type ModelAvailabilityContext = {
  env?: Record<string, string | undefined>
  liveLocalModelKeys?: Set<string>
}

export type ModelAvailabilityResult = {
  availability: ModelAvailability
  availabilityReason?: string
}

const PROVIDER_ENV_KEYS: Record<string, string[]> = {
  anthropic: ['ANTHROPIC_API_KEY'],
  deepseek: ['DEEPSEEK_API_KEY'],
  moonshot: ['MOONSHOT_API_KEY', 'KIMI_API_KEY'],
  nvidia: ['NVIDIA_API_KEY'],
  openai: ['OPENAI_API_KEY'],
  openrouter: ['OPENROUTER_API_KEY'],
  zai: ['ZAI_API_KEY', 'GLM_API_KEY'],
}

function readString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : ''
}

function isPlaceholderCredential(value: string): boolean {
  return (
    /x{8,}/i.test(value) ||
    /placeholder|dummy|changeme|your[_-]?api[_-]?key/i.test(value)
  )
}

export function hasUsableProviderCredential(
  provider: string,
  env: Record<string, string | undefined> = process.env,
): boolean {
  const envKeys = PROVIDER_ENV_KEYS[provider]
  if (!envKeys) return true
  return envKeys.some((key) => {
    const value = readString(env[key])
    return value.length > 0 && !isPlaceholderCredential(value)
  })
}

function getMissingCredentialReason(provider: string): string {
  const envKeys = PROVIDER_ENV_KEYS[provider] || []
  if (envKeys.length === 0) return 'Provider is not configured'
  return `Missing ${envKeys.join(' or ')}`
}

export function getModelAvailability(
  entry: ModelAvailabilityEntry,
  context: ModelAvailabilityContext = {},
): ModelAvailabilityResult {
  const provider = readString(entry.provider)
  const modelId = readString(entry.id)
  const source = readString(entry.source)

  if ((provider === 'hermes' || provider === 'runtime') && !entry.costTier) {
    return {
      availability: 'unavailable',
      availabilityReason: 'Gateway runtime marker is not directly selectable',
    }
  }

  if (entry.costTier === 'local' || provider === 'ollama' || provider === 'atomic-chat') {
    const liveKey = `${provider}:${modelId}`
    const liveLocalModelKeys = context.liveLocalModelKeys || new Set<string>()
    if (source === 'local-discovery' || liveLocalModelKeys.has(liveKey)) {
      return { availability: 'available' }
    }
    const providerName = provider === 'atomic-chat' ? 'Atomic Chat' : 'Ollama'
    return {
      availability: 'unavailable',
      availabilityReason: `Not found in live ${providerName} discovery`,
    }
  }

  if (provider && !hasUsableProviderCredential(provider, context.env)) {
    return {
      availability: 'unavailable',
      availabilityReason: getMissingCredentialReason(provider),
    }
  }

  return { availability: 'available' }
}
