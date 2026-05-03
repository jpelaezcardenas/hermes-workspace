import { describe, expect, it } from 'vitest'
import { MOBILE_HAMBURGER_NAV_ITEMS } from './mobile-hamburger-menu'
import { MOBILE_NAV_TABS } from './mobile-tab-bar'
import { DESKTOP_SIDEBAR_BACKDROP_CLASS } from './workspace-shell'

describe('workspace shell sidebar backdrop', () => {
  it('only spans the desktop sidebar width, not the full viewport', () => {
    expect(DESKTOP_SIDEBAR_BACKDROP_CLASS).toContain('w-[300px]')
    expect(DESKTOP_SIDEBAR_BACKDROP_CLASS).not.toContain('inset-0')
  })
})

describe('missions navigation', () => {
  it('keeps /missions as the only user-visible missions entry in the mobile hamburger menu', () => {
    const missions = MOBILE_HAMBURGER_NAV_ITEMS.find((item) => item.id === 'missions')
    const swarm = MOBILE_HAMBURGER_NAV_ITEMS.find((item) => item.id === 'swarm')
    const swarm2 = MOBILE_HAMBURGER_NAV_ITEMS.find((item) => item.id === 'swarm2')

    expect(missions?.to).toBe('/missions')
    expect(swarm).toBeUndefined()
    expect(swarm2).toBeUndefined()
  })

  it('keeps /missions as the only user-visible missions tab', () => {
    const missions = MOBILE_NAV_TABS.find((item) => item.id === 'missions')
    const swarm = MOBILE_NAV_TABS.find((item) => item.id === 'swarm')
    const swarm2 = MOBILE_NAV_TABS.find((item) => item.id === 'swarm2')

    expect(missions?.to).toBe('/missions')
    expect(swarm).toBeUndefined()
    expect(swarm2).toBeUndefined()
  })
})
