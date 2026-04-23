import { describe, expect, it } from 'vitest'
import { resolveRootLanding } from './index'

describe('resolveRootLanding', () => {
  it('routes aihotboard.tangyuanjc.com to the AI hotboard landing', () => {
    expect(resolveRootLanding('aihotboard.tangyuanjc.com')).toBe('/ai-hotboard')
  })

  it('defaults to the Hermes chat landing for any other host', () => {
    expect(resolveRootLanding('hermes.tangyuanjc.com')).toBe('/chat')
    expect(resolveRootLanding('localhost')).toBe('/chat')
    expect(resolveRootLanding('192.168.100.81')).toBe('/chat')
  })

  it('defaults to chat when the hostname is missing (SSR / non-browser)', () => {
    expect(resolveRootLanding(undefined)).toBe('/chat')
    expect(resolveRootLanding(null)).toBe('/chat')
    expect(resolveRootLanding('')).toBe('/chat')
  })
})
