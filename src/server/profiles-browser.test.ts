import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { listProfiles, renameProfile } from './profiles-browser'

describe('profiles-browser integration', () => {
  let tempHome: string

  beforeEach(() => {
    tempHome = fs.mkdtempSync(
      path.join(os.tmpdir(), 'hermes-workspace-profiles-'),
    )
    vi.spyOn(os, 'homedir').mockReturnValue(tempHome)
  })

  afterEach(() => {
    vi.restoreAllMocks()
    fs.rmSync(tempHome, { recursive: true, force: true })
  })

  it('always includes the default profile even when a named profile is active', () => {
    const hermesRoot = path.join(tempHome, '.hermes')
    const profilesRoot = path.join(hermesRoot, 'profiles')
    const namedProfileRoot = path.join(profilesRoot, 'jarvis')

    fs.mkdirSync(namedProfileRoot, { recursive: true })
    fs.writeFileSync(
      path.join(hermesRoot, 'active_profile'),
      'jarvis\n',
      'utf-8',
    )
    fs.writeFileSync(
      path.join(hermesRoot, 'config.yaml'),
      'model: default-model\n',
      'utf-8',
    )
    fs.writeFileSync(
      path.join(namedProfileRoot, 'config.yaml'),
      'model: named-model\n',
      'utf-8',
    )

    const profiles = listProfiles()
    const names = profiles.map((profile) => profile.name)

    expect(names).toContain('default')
    expect(names).toContain('jarvis')
    expect(profiles.find((profile) => profile.name === 'default')?.active).toBe(
      false,
    )
    expect(profiles.find((profile) => profile.name === 'jarvis')?.active).toBe(
      true,
    )
  })

  it('renames a profile and rewrites local/global stale references', () => {
    const hermesRoot = path.join(tempHome, '.hermes')
    const profilesRoot = path.join(hermesRoot, 'profiles')
    const oldProfileRoot = path.join(profilesRoot, 'alan')
    const newProfileRoot = path.join(profilesRoot, 'dr_kwon')

    fs.mkdirSync(path.join(oldProfileRoot, 'skills', 'demo-skill'), {
      recursive: true,
    })
    fs.mkdirSync(path.join(hermesRoot, 'team', 'handoffs'), {
      recursive: true,
    })
    fs.writeFileSync(
      path.join(hermesRoot, 'active_profile'),
      'alan\n',
      'utf-8',
    )
    fs.writeFileSync(
      path.join(oldProfileRoot, 'SOUL.md'),
      '<!-- Profile: alan (Primary: gpt-5.4) -->\n',
      'utf-8',
    )
    fs.writeFileSync(
      path.join(oldProfileRoot, 'config.yaml'),
      'mcp:\n  command: ~/.hermes/profiles/alan/openbb-env/bin/openbb-mcp\n',
      'utf-8',
    )
    fs.writeFileSync(
      path.join(oldProfileRoot, 'skills', 'demo-skill', 'SKILL.md'),
      `Path: ${hermesRoot}/profiles/alan/data\n`,
      'utf-8',
    )
    fs.writeFileSync(
      path.join(hermesRoot, 'config.yaml'),
      'sharedPath: ~/.hermes/profiles/alan/shared\n',
      'utf-8',
    )
    fs.writeFileSync(
      path.join(hermesRoot, 'team-agents.md'),
      'Agent alan owns this lane\n',
      'utf-8',
    )
    fs.writeFileSync(
      path.join(hermesRoot, 'team', 'handoffs', 'alan-to-mira.md'),
      'handoff from alan with ~/.hermes/profiles/alan/path\n',
      'utf-8',
    )

    const renamed = renameProfile('alan', 'dr_kwon')

    expect(renamed.name).toBe('dr_kwon')
    expect(fs.existsSync(oldProfileRoot)).toBe(false)
    expect(fs.existsSync(newProfileRoot)).toBe(true)
    expect(
      fs.readFileSync(path.join(hermesRoot, 'active_profile'), 'utf-8'),
    ).toBe('dr_kwon\n')
    expect(
      fs.readFileSync(path.join(newProfileRoot, 'SOUL.md'), 'utf-8'),
    ).toContain('Profile: dr_kwon')
    expect(
      fs.readFileSync(path.join(newProfileRoot, 'config.yaml'), 'utf-8'),
    ).toContain('~/.hermes/profiles/dr_kwon/openbb-env/bin/openbb-mcp')
    expect(
      fs.readFileSync(
        path.join(newProfileRoot, 'skills', 'demo-skill', 'SKILL.md'),
        'utf-8',
      ),
    ).toContain(`${hermesRoot}/profiles/dr_kwon/data`)
    expect(fs.readFileSync(path.join(hermesRoot, 'config.yaml'), 'utf-8')).toContain(
      '~/.hermes/profiles/dr_kwon/shared',
    )
    expect(
      fs.readFileSync(path.join(hermesRoot, 'team-agents.md'), 'utf-8'),
    ).toContain('Agent alan owns this lane')
    expect(
      fs.readFileSync(
        path.join(hermesRoot, 'team', 'handoffs', 'alan-to-mira.md'),
        'utf-8',
      ),
    ).toContain('~/.hermes/profiles/dr_kwon/path')
  })

  it('rejects new profile names that the Hermes CLI would reject', () => {
    const hermesRoot = path.join(tempHome, '.hermes')
    const profilesRoot = path.join(hermesRoot, 'profiles')
    const oldProfileRoot = path.join(profilesRoot, 'alan')

    fs.mkdirSync(oldProfileRoot, { recursive: true })

    expect(() => renameProfile('alan', 'Dr_Kwon')).toThrow(
      /Invalid profile name/i,
    )
  })
})
