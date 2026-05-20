import { describe, expect, it } from 'vitest'
import {
  getModelAvailability,
  hasUsableProviderCredential,
} from './model-availability'

describe('model availability', () => {
  it('enables local discovery entries only when the live provider returned them', () => {
    expect(
      getModelAvailability(
        {
          id: 'qwen3-coder:30b',
          provider: 'ollama',
          source: 'local-discovery',
        },
        { liveLocalModelKeys: new Set(['ollama:qwen3-coder:30b']) },
      ),
    ).toEqual({ availability: 'available' })

    expect(
      getModelAvailability(
        {
          id: 'nemotron3',
          provider: 'ollama',
          costTier: 'local',
          source: 'canonical-model-catalog',
        },
        { liveLocalModelKeys: new Set(['ollama:qwen3-coder:30b']) },
      ),
    ).toEqual({
      availability: 'unavailable',
      availabilityReason: 'Not found in live Ollama discovery',
    })
  })

  it('disables cloud providers with missing or placeholder credentials', () => {
    expect(hasUsableProviderCredential('openai', { OPENAI_API_KEY: '' })).toBe(
      false,
    )
    expect(
      hasUsableProviderCredential('openai', {
        OPENAI_API_KEY: 'sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
      }),
    ).toBe(false)
    expect(
      getModelAvailability(
        { id: 'gpt-5.5', provider: 'openai', costTier: 'paid' },
        { env: { OPENAI_API_KEY: '' } },
      ),
    ).toEqual({
      availability: 'unavailable',
      availabilityReason: 'Missing OPENAI_API_KEY',
    })
  })

  it('disables gateway runtime marker rows that are not direct chat providers', () => {
    expect(
      getModelAvailability({
        id: 'claude-sonnet-4-5',
        provider: 'runtime',
      }),
    ).toEqual({
      availability: 'unavailable',
      availabilityReason: 'Gateway runtime marker is not directly selectable',
    })
  })
})
