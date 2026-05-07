import { describe, expect, it } from 'vitest'
import { getRootLayoutMode } from './__root'

describe('getRootLayoutMode', () => {
  it('shows fullscreen onboarding only when explicitly requested', () => {
    expect(getRootLayoutMode('false')).toBe('onboarding')
  })

  it('shows the workspace shell by default', () => {
    expect(getRootLayoutMode(null)).toBe('workspace')
    expect(getRootLayoutMode('')).toBe('workspace')
  })

  it('shows the workspace shell after onboarding is complete', () => {
    expect(getRootLayoutMode('true')).toBe('workspace')
  })
})
