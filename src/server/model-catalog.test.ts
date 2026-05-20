import { describe, expect, it } from 'vitest'
import {
  buildPaidLiveProviderFallbackSelections,
  buildTopModelSelections,
  toSelectableCatalogModel,
} from './model-catalog'

describe('canonical model catalog selection', () => {
  it('maps canonical provider ids to selectable Hermes model ids', () => {
    expect(
      toSelectableCatalogModel(
        {
          id: 'openrouter:qwen/qwen3-coder:free',
          provider: 'openrouter',
          provider_model_id: 'qwen/qwen3-coder:free',
          display_name: 'Qwen Coder Free',
          source_group: 'openapi_free',
          environment: 'cloud',
          input_price_per_m: 0,
          output_price_per_m: 0,
          enabled: true,
        },
        'free',
        1,
      ),
    ).toMatchObject({
      id: 'qwen/qwen3-coder:free',
      provider: 'openrouter',
      name: 'Qwen Coder Free',
      costTier: 'free',
      catalogId: 'openrouter:qwen/qwen3-coder:free',
    })

    expect(
      toSelectableCatalogModel(
        {
          id: 'local:gemma4',
          provider: 'ollama',
          provider_model_id: 'ollama/gemma4:latest',
          display_name: 'Gemma 4 Local',
          source_group: 'local',
          environment: 'local',
          enabled: true,
        },
        'local',
        1,
      ),
    ).toMatchObject({
      id: 'gemma4:latest',
      provider: 'ollama',
      costTier: 'local',
    })
  })

  it('returns at most ten ranked models for each requested tier', () => {
    const models = buildTopModelSelections(
      [
        ...Array.from({ length: 12 }, (_, index) => ({
          id: `openrouter:test/free-${index}:free`,
          provider: 'openrouter',
          provider_model_id: `test/free-${index}:free`,
          display_name: `Free ${index}`,
          source_group: 'openapi_free',
          environment: 'cloud',
          input_price_per_m: 0,
          output_price_per_m: 0,
          ranking_score: index,
          enabled: true,
        })),
        {
          id: 'openai:gpt-5.5',
          provider: 'openai',
          provider_model_id: 'gpt-5.5',
          display_name: 'GPT-5.5',
          environment: 'cloud',
          input_price_per_m: 5,
          output_price_per_m: 30,
          enabled: true,
        },
        {
          id: 'local:qwen3-coder:30b',
          provider: 'ollama',
          provider_model_id: 'qwen3-coder:30b',
          display_name: 'Qwen3 Coder 30B',
          source_group: 'local',
          environment: 'local',
          enabled: true,
        },
      ],
      10,
    )

    expect(models.filter((model) => model.costTier === 'free')).toHaveLength(10)
    expect(models.some((model) => model.id === 'test/free-11:free')).toBe(true)
    expect(models.some((model) => model.costTier === 'paid')).toBe(true)
    expect(models.some((model) => model.costTier === 'local')).toBe(true)
  })

  it('fills missing paid slots from live provider models without duplicating free or existing ids', () => {
    const existing = buildTopModelSelections(
      Array.from({ length: 7 }, (_, index) => ({
        id: `paid:stable-${index}`,
        provider: 'paid',
        provider_model_id: `stable-${index}`,
        display_name: `Stable Paid ${index}`,
        input_price_per_m: 1,
        output_price_per_m: 2,
        enabled: true,
      })),
      10,
    )

    const fallback = buildPaidLiveProviderFallbackSelections({
      provider: 'openrouter',
      models: [
        { id: 'stable-1', name: 'Duplicate paid' },
        { id: 'qwen/qwen3-coder:free', name: 'Free model' },
        { id: 'anthropic/claude-opus-4.6', description: 'recommended' },
        { id: 'anthropic/claude-sonnet-4.6' },
        { id: 'qwen/qwen3.6-plus' },
        { id: 'moonshotai/kimi-k2.5' },
      ],
      existingModels: existing,
      limit: 10,
    })

    expect(fallback.map((model) => model.id)).toEqual([
      'anthropic/claude-opus-4.6',
      'anthropic/claude-sonnet-4.6',
      'qwen/qwen3.6-plus',
    ])
    expect(fallback.map((model) => model.rank)).toEqual([8, 9, 10])
    expect(fallback.every((model) => model.costTier === 'paid')).toBe(true)
    expect(fallback.every((model) => model.source === 'live-provider-catalog')).toBe(true)
  })
})
