import { describe, expect, it } from 'vitest'
import {
  compareModelPickerGroups,
  formatModelPickerGroupLabel,
  getModelPickerBadge,
  getModelPickerGroup,
  isModelPickerEntryAvailable,
  getZeroForkModelInfoFlags,
  MODEL_SWITCH_BLOCKED_TOAST,
  shouldBlockZeroForkModelSwitch,
} from './chat-composer-model-switch'

describe('zero-fork model switch guard', () => {
  it('blocks picker swaps only for zero-fork vanilla agents', () => {
    expect(
      shouldBlockZeroForkModelSwitch('zero-fork', {
        vanillaAgent: true,
        supportsRuntimeSwitching: false,
      }),
    ).toBe(true)

    expect(
      shouldBlockZeroForkModelSwitch('enhanced-fork', {
        vanillaAgent: true,
        supportsRuntimeSwitching: false,
      }),
    ).toBe(false)

    expect(
      shouldBlockZeroForkModelSwitch('zero-fork', {
        vanillaAgent: false,
        supportsRuntimeSwitching: true,
      }),
    ).toBe(false)
  })

  it('infers vanilla zero-fork agents from realistic dashboard payloads', () => {
    const flags = getZeroForkModelInfoFlags({
      model: 'gpt-5.4',
      provider: 'openai-codex',
      capabilities: {
        supports_tools: true,
      },
    })

    expect(flags).toEqual({
      vanillaAgent: true,
      supportsRuntimeSwitching: false,
    })
    expect(shouldBlockZeroForkModelSwitch('zero-fork', flags)).toBe(true)
  })

  it('keeps the toast copy stable', () => {
    expect(MODEL_SWITCH_BLOCKED_TOAST).toBe(
      'Model switching requires the enhanced runtime. Set a default via `hermes config set model <id>` — the displayed model reflects your config.',
    )
  })
})

describe('model picker catalog groups', () => {
  it('groups curated catalog entries before provider fallback groups', () => {
    const groups = [
      getModelPickerGroup({ provider: 'deepseek' }),
      getModelPickerGroup({ provider: 'openrouter', costTier: 'free' }),
      getModelPickerGroup({ provider: 'openai', costTier: 'paid' }),
      getModelPickerGroup({ provider: 'ollama', costTier: 'local' }),
    ].sort(compareModelPickerGroups)

    expect(groups.map((group) => group.label)).toEqual([
      'Top Free',
      'Top Paid',
      'Local',
      'deepseek',
    ])
  })

  it('returns concise badges for free, paid, and local entries', () => {
    expect(getModelPickerBadge({ costTier: 'free' })).toBe('free')
    expect(getModelPickerBadge({ costTier: 'paid' })).toBe('paid')
    expect(getModelPickerBadge({ costTier: 'local' })).toBe('local')
    expect(getModelPickerBadge({ isLocal: true })).toBe('local')
  })

  it('marks unavailable live entries as disabled with an offline badge', () => {
    const unavailable = {
      costTier: 'local',
      availability: 'unavailable',
      availabilityReason: 'Ollama model is not running',
    }

    expect(isModelPickerEntryAvailable(unavailable)).toBe(false)
    expect(getModelPickerBadge(unavailable)).toBe('offline')
  })

  it('formats capped catalog groups with live inventory counts', () => {
    expect(
      formatModelPickerGroupLabel(
        getModelPickerGroup({ provider: 'openrouter', costTier: 'free' }),
        10,
      ),
    ).toBe('Top Free (10/10)')
    expect(
      formatModelPickerGroupLabel(
        getModelPickerGroup({ provider: 'ollama', costTier: 'local' }),
        6,
      ),
    ).toBe('Local (6/10)')
    expect(
      formatModelPickerGroupLabel(getModelPickerGroup({ provider: 'deepseek' }), 2),
    ).toBe('deepseek')
  })
})
