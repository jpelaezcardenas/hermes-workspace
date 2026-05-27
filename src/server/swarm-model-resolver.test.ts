import { describe, expect, it } from 'vitest'
import { resolveSwarmModelLabel } from './swarm-model-resolver'

describe('resolveSwarmModelLabel', () => {
  it('returns null for empty / blank / sentinel labels', () => {
    expect(resolveSwarmModelLabel(null)).toBeNull()
    expect(resolveSwarmModelLabel('')).toBeNull()
    expect(resolveSwarmModelLabel('   ')).toBeNull()
    expect(resolveSwarmModelLabel('Worker')).toBeNull()
  })

  it('maps legacy Opus labels to Codex', () => {
    expect(resolveSwarmModelLabel('Opus 4.7')).toEqual({
      provider: 'openai-codex',
      default: 'gpt-5.5',
    })
    expect(resolveSwarmModelLabel('Claude Opus 4.6')).toEqual({
      provider: 'openai-codex',
      default: 'gpt-5.5',
    })
    expect(resolveSwarmModelLabel('opus 4.5')).toEqual({
      provider: 'openai-codex',
      default: 'gpt-5.5',
    })
  })

  it('maps legacy Sonnet labels to Codex or Gemini', () => {
    expect(resolveSwarmModelLabel('Sonnet 4.6')).toEqual({
      provider: 'openai-codex',
      default: 'gpt-5.4',
    })
    expect(resolveSwarmModelLabel('Sonnet 4.5')).toEqual({
      provider: 'google-gemini-cli',
      default: 'gemini-3.1-pro-preview',
      base_url: 'cloudcode-pa://google',
    })
  })

  it('resolves OpenAI Codex labels', () => {
    expect(resolveSwarmModelLabel('GPT-5.5')).toEqual({
      provider: 'openai-codex',
      default: 'gpt-5.5',
    })
    expect(resolveSwarmModelLabel('GPT 5.4')).toEqual({
      provider: 'openai-codex',
      default: 'gpt-5.4',
    })
    expect(resolveSwarmModelLabel('Codex (GPT-5.5)')).toEqual({
      provider: 'openai-codex',
      default: 'gpt-5.5',
    })
    expect(resolveSwarmModelLabel('GPT-5.3 Spark')).toEqual({
      provider: 'openai-codex',
      default: 'gpt-5.3-codex-spark',
    })
    expect(resolveSwarmModelLabel('Spark')).toEqual({
      provider: 'openai-codex',
      default: 'gpt-5.3-codex-spark',
    })
  })

  it('resolves Gemini CLI labels', () => {
    expect(resolveSwarmModelLabel('Gemini 3.1 Pro Preview')).toEqual({
      provider: 'google-gemini-cli',
      default: 'gemini-3.1-pro-preview',
      base_url: 'cloudcode-pa://google',
    })
    expect(resolveSwarmModelLabel('gemini-3.1-pro-preview')).toEqual({
      provider: 'google-gemini-cli',
      default: 'gemini-3.1-pro-preview',
      base_url: 'cloudcode-pa://google',
    })
    expect(resolveSwarmModelLabel('Gemini 3.5 Flash')).toEqual({
      provider: 'google-gemini-cli',
      default: 'gemini-3.5-flash',
      base_url: 'cloudcode-pa://google',
    })
    expect(resolveSwarmModelLabel('gemini-3.5-flash')).toEqual({
      provider: 'google-gemini-cli',
      default: 'gemini-3.5-flash',
      base_url: 'cloudcode-pa://google',
    })
    expect(resolveSwarmModelLabel('Gemini 3 Flash Preview')).toEqual({
      provider: 'google-gemini-cli',
      default: 'gemini-3-flash-preview',
      base_url: 'cloudcode-pa://google',
    })
    expect(resolveSwarmModelLabel('Gemini Flash')).toEqual({
      provider: 'google-gemini-cli',
      default: 'gemini-3-flash-preview',
      base_url: 'cloudcode-pa://google',
    })
  })

  it('resolves PC1 local labels regardless of TPS qualifier', () => {
    expect(resolveSwarmModelLabel('PC1 Coder (97 TPS)')).toEqual({
      provider: 'ollama-pc1',
      default: 'qwen3-coder-30b-fixed:latest',
    })
    expect(resolveSwarmModelLabel('PC1 Planner (175 TPS)')).toEqual({
      provider: 'ollama-pc1',
      default: 'pc1-planner:latest',
    })
    expect(resolveSwarmModelLabel('PC1 Critic')).toEqual({
      provider: 'ollama-pc1',
      default: 'pc1-critic:latest',
    })
  })

  it('passes through fully-qualified provider/model ids', () => {
    expect(resolveSwarmModelLabel('openai-codex/gpt-5.5')).toEqual({
      provider: 'openai-codex',
      default: 'gpt-5.5',
    })
    expect(resolveSwarmModelLabel('anthropic-oauth/claude-opus-4-7')).toEqual({
      provider: 'openai-codex',
      default: 'gpt-5.3-codex-spark',
    })
  })

  it('returns null for unknown labels (so the worker is left alone)', () => {
    expect(resolveSwarmModelLabel('Unknown 9000')).toBeNull()
    expect(resolveSwarmModelLabel('typo opus')).toBeNull()
  })
})
