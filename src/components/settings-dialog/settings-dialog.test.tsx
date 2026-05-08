import { describe, expect, it } from 'vitest'
import {
  getOAuthStartButtonLabel,
  getProviderClickAction,
} from './settings-dialog'

describe('getProviderClickAction', () => {
  it('routes provider cards to the right detail panel', () => {
    expect(getProviderClickAction({ authType: 'oauth', hasKey: true })).toBe('oauth')
    expect(getProviderClickAction({ authType: 'none', hasKey: true })).toBe('local')
    expect(getProviderClickAction({ authType: 'api_key', hasKey: true })).toBe('select')
    expect(getProviderClickAction({ authType: 'api_key', hasKey: false })).toBe('ignore')
    expect(
      getProviderClickAction({ providerId: 'custom', authType: 'api_key', hasKey: true }),
    ).toBe('custom')
  })
})

describe('getOAuthStartButtonLabel', () => {
  it('shows Start OAuth when idle and Waiting... while the flow is active', () => {
    expect(getOAuthStartButtonLabel('idle')).toBe('Start OAuth')
    expect(getOAuthStartButtonLabel('starting')).toBe('Waiting...')
    expect(getOAuthStartButtonLabel('pending')).toBe('Waiting...')
  })
})
