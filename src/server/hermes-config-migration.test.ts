import { describe, expect, it } from 'vitest'
import { normalizeHermesConfigState } from './hermes-config-migration'

const paths = {
  hermesHome: '/tmp/hermes',
  configPath: '/tmp/hermes/config.yaml',
  envPath: '/tmp/hermes/.env',
  authProfilesPath: '/tmp/hermes/auth-profiles.json',
}

describe('normalizeHermesConfigState', () => {
  it('normalizes flat default provider and model config', () => {
    const state = normalizeHermesConfigState({
      paths,
      config: { provider: 'openrouter', model: 'auto' },
      env: { OPENROUTER_API_KEY: 'sk-openrouter-123456' },
      authProfiles: {},
      localProviders: [],
      localModels: [],
    })

    expect(state.activeProvider).toBe('openrouter')
    expect(state.activeModel).toBe('auto')
    expect(state.defaultModel).toEqual({
      provider: 'openrouter',
      model: 'auto',
      source: 'flat',
    })
    const openrouter = state.providers.find((p) => p.id === 'openrouter')
    expect(openrouter?.configured).toBe(true)
    expect(openrouter?.authenticated).toBe(true)
    expect(openrouter?.isDefault).toBe(true)
    expect(openrouter?.authSource).toBe('env')
  })

  it('normalizes nested default provider and model config', () => {
    const state = normalizeHermesConfigState({
      paths,
      config: { model: { provider: 'openai-codex', default: 'gpt-5.4' } },
      env: {},
      authProfiles: {},
      localProviders: [],
      localModels: [],
    })

    expect(state.activeProvider).toBe('openai-codex')
    expect(state.activeModel).toBe('gpt-5.4')
    expect(state.defaultModel).toEqual({
      provider: 'openai-codex',
      model: 'gpt-5.4',
      source: 'nested',
    })
  })

  it('detects OAuth auth profiles without making them default', () => {
    const state = normalizeHermesConfigState({
      paths,
      config: {},
      env: {},
      authProfiles: {
        profiles: {
          'nous:default': { token: 'nous-token-123456' },
          'openai-codex:default': { accessToken: 'codex-token-123456' },
        },
      },
      localProviders: [],
      localModels: [],
    })

    const nous = state.providers.find((p) => p.id === 'nous')
    const codex = state.providers.find((p) => p.id === 'openai-codex')
    expect(nous?.configured).toBe(true)
    expect(nous?.authenticated).toBe(true)
    expect(nous?.isDefault).toBe(false)
    expect(codex?.configured).toBe(true)
    expect(codex?.authenticated).toBe(true)
    expect(codex?.authSource).toBe('auth-profiles')
  })

  it('detects custom providers from custom_providers config', () => {
    const state = normalizeHermesConfigState({
      paths,
      config: {
        custom_providers: [
          {
            name: 'ollama',
            base_url: 'http://127.0.0.1:11434/v1',
            api_key: 'ollama',
            api_mode: 'chat_completions',
          },
          {
            name: 'my-gateway',
            baseUrl: 'https://models.example.test/v1',
            key_env: 'MY_GATEWAY_KEY',
          },
        ],
      },
      env: { MY_GATEWAY_KEY: 'gateway-secret-123456' },
      authProfiles: {},
      localProviders: [{ id: 'ollama', online: true, modelCount: 1 }],
      localModels: [{ id: 'llama3.1:8b', name: 'llama3.1:8b', provider: 'ollama' }],
    })

    const ollama = state.providers.find((p) => p.id === 'ollama')
    expect(ollama?.configured).toBe(true)
    expect(ollama?.available).toBe(true)
    expect(ollama?.models).toEqual([
      { id: 'llama3.1:8b', name: 'llama3.1:8b' },
    ])
    expect(state.customProviders).toEqual([
      {
        id: 'my-gateway',
        name: 'my-gateway',
        baseUrl: 'https://models.example.test/v1',
        apiKeyEnv: 'MY_GATEWAY_KEY',
        apiMode: '',
        configured: true,
        available: true,
      },
    ])
  })
})
