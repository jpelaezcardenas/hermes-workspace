import { describe, expect, it } from 'vitest'
import {
  resolveHotboardPageFromSource,
  resolveSourceByHotboardPage,
} from './ai-hotboard-route-config'

describe('ai hotboard route config', () => {
  it('maps wechat source route to the dedicated source page', () => {
    expect(resolveHotboardPageFromSource('wechat')).toBe('source-wechat')
  })

  it('keeps source-wechat bound to wechat instead of all', () => {
    expect(resolveSourceByHotboardPage('source-wechat', 'all')).toBe('wechat')
  })

  it('maps zara youtube source route to the dedicated source page', () => {
    expect(resolveHotboardPageFromSource('zara-youtube')).toBe('source-zara-youtube')
    expect(resolveSourceByHotboardPage('source-zara-youtube', 'all')).toBe('zara-youtube')
  })
})
