import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { listProfiles } from './profiles-browser'

describe('listProfiles', () => {
  let tempHome: string

  beforeEach(() => {
    tempHome = fs.mkdtempSync(path.join(os.tmpdir(), 'hermes-workspace-profiles-'))
    vi.spyOn(os, 'homedir').mockReturnValue(tempHome)
    delete process.env.HERMES_HOME
  })

  afterEach(() => {
    delete process.env.HERMES_HOME
    vi.restoreAllMocks()
    fs.rmSync(tempHome, { recursive: true, force: true })
  })

  it('always includes the default profile even when a named profile is active', () => {
    const hermesRoot = path.join(tempHome, '.hermes')
    const profilesRoot = path.join(hermesRoot, 'profiles')
    const namedProfileRoot = path.join(profilesRoot, 'jarvis')

    fs.mkdirSync(namedProfileRoot, { recursive: true })
    fs.writeFileSync(path.join(hermesRoot, 'active_profile'), 'jarvis\n', 'utf-8')
    fs.writeFileSync(path.join(hermesRoot, 'config.yaml'), 'model: default-model\n', 'utf-8')
    fs.writeFileSync(path.join(namedProfileRoot, 'config.yaml'), 'model: named-model\n', 'utf-8')

    const profiles = listProfiles()
    const names = profiles.map((profile) => profile.name)

    expect(names).toContain('default')
    expect(names).toContain('jarvis')
    expect(profiles.find((profile) => profile.name === 'default')?.active).toBe(false)
    expect(profiles.find((profile) => profile.name === 'jarvis')?.active).toBe(true)
  })

  it('uses the Hermes root when HERMES_HOME points at an active profile', () => {
    const hermesRoot = path.join(tempHome, '.hermes')
    const profilesRoot = path.join(hermesRoot, 'profiles')
    const nevaProfileRoot = path.join(profilesRoot, 'neva')
    const schoolProfileRoot = path.join(profilesRoot, 'schule')

    fs.mkdirSync(nevaProfileRoot, { recursive: true })
    fs.mkdirSync(schoolProfileRoot, { recursive: true })
    fs.writeFileSync(path.join(hermesRoot, 'active_profile'), 'neva\n', 'utf-8')
    fs.writeFileSync(path.join(nevaProfileRoot, 'config.yaml'), 'model: neva-model\n', 'utf-8')
    fs.writeFileSync(path.join(schoolProfileRoot, 'config.yaml'), 'model: school-model\n', 'utf-8')
    fs.mkdirSync(path.join(nevaProfileRoot, 'profiles', 'nested'), { recursive: true })

    process.env.HERMES_HOME = nevaProfileRoot

    const profiles = listProfiles()
    const names = profiles.map((profile) => profile.name)

    expect(names).toContain('default')
    expect(names).toContain('neva')
    expect(names).toContain('schule')
    expect(names).not.toContain('nested')
    expect(profiles.find((profile) => profile.name === 'neva')?.active).toBe(true)
  })
})
