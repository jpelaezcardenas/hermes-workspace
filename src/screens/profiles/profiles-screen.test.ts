import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const source = () =>
  readFileSync(resolve(process.cwd(), 'src/screens/profiles/profiles-screen.tsx'), 'utf8')

describe('ProfilesScreen profile activation flow', () => {
  it('shows a visible confirmation dialog before switching profiles', () => {
    const src = source()

    expect(src).toContain('Confirm profile switch')
    expect(src).toContain('Do you want to continue?')
    expect(src).toContain('setActivationTarget(profile)')
    expect(src).toContain('Activated profile')
    expect(src).toContain('Gateway restarted.')
  })
})
