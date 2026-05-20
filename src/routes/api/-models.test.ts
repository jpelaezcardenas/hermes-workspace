import { describe, expect, it } from 'vitest'

import { dedupeModelsByKey, normalizeModel } from './models'

describe('normalizeModel', () => {
  it('uses runtime_model for the Hermes alias so native pages show the live model', () => {
    expect(
      normalizeModel(
        {
          id: 'hermes-agent',
          owned_by: 'hermes',
          runtime_model: 'deepseek/deepseek-chat',
        },
        'openrouter',
      ),
    ).toMatchObject({
      id: 'deepseek/deepseek-chat',
      name: 'deepseek/deepseek-chat',
      provider: 'openrouter',
    })
  })

  it('collapses alias and runtime entries once they resolve to the same model', () => {
    const models = dedupeModelsByKey([
      {
        id: 'deepseek/deepseek-chat',
        name: 'deepseek/deepseek-chat',
        provider: 'openrouter',
      },
      {
        id: 'deepseek/deepseek-chat',
        name: 'deepseek/deepseek-chat',
        provider: 'openrouter',
      },
    ])

    expect(models).toHaveLength(1)
  })

  it('does not treat Core metadata owners as model providers', () => {
    const alias = normalizeModel({
      id: 'hermes-agent',
      owned_by: 'hermes',
      runtime_model: 'deepseek/deepseek-chat',
    })
    const runtime = normalizeModel({
      id: 'deepseek/deepseek-chat',
      owned_by: 'runtime',
    })

    expect(alias).toMatchObject({
      id: 'deepseek/deepseek-chat',
      provider: 'deepseek',
    })
    expect(runtime).toMatchObject({
      id: 'deepseek/deepseek-chat',
      provider: 'deepseek',
    })
    expect(dedupeModelsByKey([alias!, runtime!])).toHaveLength(1)
  })
})
