import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { listProfiles, readProfile, updateProfileConfig } from './profiles-browser'

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
    fs.rmSync(tempHome, { recursive: true, force: true })
  })

  it('always includes the default profile even when a named profile is active', () => {
    const hermesRoot = path.join(tempHome, '.hermes')
    const profilesRoot = path.join(hermesRoot, 'profiles')
    const namedProfileRoot = path.join(profilesRoot, 'jarvis')

    fs.mkdirSync(namedProfileRoot, { recursive: true })
    fs.writeFileSync(path.join(hermesRoot, 'active_profile'), 'jarvis\n', 'utf-8')
    fs.writeFileSync(
      path.join(hermesRoot, 'config.yaml'),
      'model: default-model\ndescription: Default operator\n',
      'utf-8',
    )
    fs.writeFileSync(
      path.join(namedProfileRoot, 'config.yaml'),
      'model: named-model\ndescription: Named operator\n',
      'utf-8',
    )

    const profiles = listProfiles()
    const names = profiles.map((profile) => profile.name)

    expect(names).toContain('default')
    expect(names).toContain('jarvis')
    expect(profiles.find((profile) => profile.name === 'default')?.active).toBe(false)
    expect(profiles.find((profile) => profile.name === 'jarvis')?.active).toBe(true)
    expect(profiles.find((profile) => profile.name === 'default')?.description).toBe('Default operator')
    expect(profiles.find((profile) => profile.name === 'jarvis')?.description).toBe('Named operator')
  })

  it('skips profiles/default so only the root-backed default card renders', () => {
    const hermesRoot = path.join(tempHome, '.hermes')
    const defaultDirRoot = path.join(hermesRoot, 'profiles', 'default')
    const namedProfileRoot = path.join(hermesRoot, 'profiles', 'builder')

    fs.mkdirSync(defaultDirRoot, { recursive: true })
    fs.mkdirSync(namedProfileRoot, { recursive: true })
    fs.writeFileSync(
      path.join(hermesRoot, 'config.yaml'),
      'model: root-model\nprovider: openai\ndescription: Root default\n',
      'utf-8',
    )
    fs.writeFileSync(
      path.join(namedProfileRoot, 'config.yaml'),
      'model: named-model\nprovider: anthropic\ndescription: Named operator\n',
      'utf-8',
    )

    const profiles = listProfiles()
    const defaultProfiles = profiles.filter((profile) => profile.name === 'default')

    expect(defaultProfiles).toHaveLength(1)
    expect(defaultProfiles[0]?.path).toBe(hermesRoot)
    expect(defaultProfiles[0]?.model).toBe('root-model')
    expect(defaultProfiles[0]?.provider).toBe('openai')
    expect(defaultProfiles[0]?.description).toBe('Root default')
    expect(profiles.find((profile) => profile.name === 'builder')?.provider).toBe('anthropic')
  })

  it('reads MCP Sensor/Planner/Operator capability status from profile config without false success', () => {
    const hermesRoot = path.join(tempHome, '.hermes')
    const profilesRoot = path.join(hermesRoot, 'profiles')
    const readonlyRoot = path.join(profilesRoot, 'hermes-ops-readonly')
    const execRoot = path.join(profilesRoot, 'hermes-ops-exec')

    fs.mkdirSync(readonlyRoot, { recursive: true })
    fs.mkdirSync(execRoot, { recursive: true })
    fs.writeFileSync(path.join(hermesRoot, 'config.yaml'), 'model: root-model\n', 'utf-8')
    fs.writeFileSync(
      path.join(readonlyRoot, 'config.yaml'),
      'mcp_servers:\n  james-readonly-v0:\n    command: python\n',
      'utf-8',
    )
    fs.writeFileSync(
      path.join(execRoot, 'config.yaml'),
      'mcp_servers:\n  james-ops-v0:\n    command: python\n',
      'utf-8',
    )

    const profiles = listProfiles()
    const root = profiles.find((profile) => profile.name === 'default')
    const readonly = profiles.find((profile) => profile.name === 'hermes-ops-readonly')
    const exec = profiles.find((profile) => profile.name === 'hermes-ops-exec')

    expect(root?.mcp.mcpAvailable).toBe(false)
    expect(readonly?.mcp.layers.sensor.status).toBe('enabled')
    expect(readonly?.mcp.layers.planner.status).toBe('disabled')
    expect(exec?.mcp.layers.operator.status).toBe('enabled')
    expect(exec?.mcp.blockedGates.map((gate) => gate.key)).toContain('camp-7')
  })

  it('reads and updates profile descriptions from config.yaml', () => {
    const hermesRoot = path.join(tempHome, '.hermes')
    const profileRoot = path.join(hermesRoot, 'profiles', 'builder')

    fs.mkdirSync(profileRoot, { recursive: true })
    fs.writeFileSync(
      path.join(profileRoot, 'config.yaml'),
      'model: named-model\ndescription: Initial description\n',
      'utf-8',
    )

    expect(readProfile('builder').description).toBe('Initial description')

    updateProfileConfig('builder', { description: 'Updated description' })
    expect(readProfile('builder').description).toBe('Updated description')

    updateProfileConfig('builder', { description: null })
    expect(readProfile('builder').description).toBe('')
  })

  it('surfaces system prompt from config or SOUL.md in profile summaries', () => {
    const hermesRoot = path.join(tempHome, '.hermes')
    const profilesRoot = path.join(hermesRoot, 'profiles')
    const soulProfileRoot = path.join(profilesRoot, 'leelo')
    const configProfileRoot = path.join(profilesRoot, 'ops')

    fs.mkdirSync(soulProfileRoot, { recursive: true })
    fs.mkdirSync(configProfileRoot, { recursive: true })

    fs.writeFileSync(path.join(hermesRoot, 'config.yaml'), 'model: root-model\n', 'utf-8')
    fs.writeFileSync(path.join(soulProfileRoot, 'config.yaml'), 'model: named-model\n', 'utf-8')
    fs.writeFileSync(
      path.join(soulProfileRoot, 'SOUL.md'),
      'You are Leelo, executive assistant.',
      'utf-8',
    )
    fs.writeFileSync(
      path.join(configProfileRoot, 'config.yaml'),
      'model: named-model\nsystem_prompt: Config prompt wins\n',
      'utf-8',
    )
    fs.writeFileSync(
      path.join(configProfileRoot, 'SOUL.md'),
      'This should not override config',
      'utf-8',
    )

    const profiles = listProfiles()

    expect(profiles.find((profile) => profile.name === 'leelo')?.systemPrompt).toBe(
      'You are Leelo, executive assistant.',
    )
    expect(profiles.find((profile) => profile.name === 'ops')?.systemPrompt).toBe(
      'Config prompt wins',
    )
    expect(readProfile('leelo').systemPrompt).toBe(
      'You are Leelo, executive assistant.',
    )
    expect(readProfile('ops').systemPrompt).toBe('Config prompt wins')
  })
})
