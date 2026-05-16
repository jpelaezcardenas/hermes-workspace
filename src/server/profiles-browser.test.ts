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
    delete process.env.CLAUDE_HOME
  })

  afterEach(() => {
    vi.restoreAllMocks()
    delete process.env.HERMES_HOME
    delete process.env.CLAUDE_HOME
    fs.rmSync(tempHome, { recursive: true, force: true })
  })

  it('lists sibling profiles when HERMES_HOME points at a profile home', () => {
    const hermesRoot = path.join(tempHome, '.hermes')
    const profilesRoot = path.join(hermesRoot, 'profiles')
    const profileHome = path.join(profilesRoot, 'coferpow', 'home')
    const namedProfileRoot = path.join(profilesRoot, 'jarvis')

    fs.mkdirSync(profileHome, { recursive: true })
    fs.mkdirSync(namedProfileRoot, { recursive: true })
    fs.writeFileSync(path.join(hermesRoot, 'active_profile'), 'jarvis\n', 'utf-8')
    fs.writeFileSync(path.join(hermesRoot, 'config.yaml'), 'model: default-model\n', 'utf-8')
    fs.writeFileSync(path.join(namedProfileRoot, 'config.yaml'), 'model: named-model\n', 'utf-8')

    process.env.HERMES_HOME = profileHome

    const profiles = listProfiles()
    const names = profiles.map((profile) => profile.name)

    expect(names).toContain('default')
    expect(names).toContain('jarvis')
    expect(profiles.find((profile) => profile.name === 'default')?.path).toBe(hermesRoot)
    expect(profiles.find((profile) => profile.name === 'default')?.active).toBe(false)
    expect(profiles.find((profile) => profile.name === 'jarvis')?.active).toBe(true)
  })
})
