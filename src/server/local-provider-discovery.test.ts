import { describe, expect, it } from 'vitest'
import {
  getLocalProviderEndpoint,
  isChatCapableLocalModelId,
  type LocalProviderDef,
} from './local-provider-discovery'

const ollamaProvider: LocalProviderDef = {
  id: 'ollama',
  name: 'Ollama',
  port: 11434,
  modelsPath: '/v1/models',
  baseUrl: 'http://127.0.0.1:11434/v1',
  apiKey: 'ollama',
  apiMode: 'chat_completions',
}

describe('local provider discovery', () => {
  it('uses OLLAMA_BASE_URL for Docker-reachable Ollama endpoints', () => {
    expect(
      getLocalProviderEndpoint(ollamaProvider, {
        OLLAMA_BASE_URL: 'http://host.docker.internal:11434',
      }),
    ).toEqual({
      baseUrl: 'http://host.docker.internal:11434/v1',
      modelsUrl: 'http://host.docker.internal:11434/v1/models',
    })
  })

  it('preserves OpenAI-compatible /v1 base URLs from env', () => {
    expect(
      getLocalProviderEndpoint(ollamaProvider, {
        OLLAMA_BASE_URL: 'http://ollama.internal:11434/v1/',
      }),
    ).toEqual({
      baseUrl: 'http://ollama.internal:11434/v1',
      modelsUrl: 'http://ollama.internal:11434/v1/models',
    })
  })

  it('excludes embedding-only local models from chat selection', () => {
    expect(isChatCapableLocalModelId('qwen3-coder:30b')).toBe(true)
    expect(isChatCapableLocalModelId('gemma4:26b-a4b-it-q4_K_M')).toBe(true)
    expect(isChatCapableLocalModelId('bge-m3:latest')).toBe(false)
    expect(isChatCapableLocalModelId('nomic-embed-text:latest')).toBe(false)
  })
})
