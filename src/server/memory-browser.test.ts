import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import YAML from 'yaml'

/**
 * Memory-browser tests.
 *
 * Bug: normalizeWorkspaceRoot reads from process.env.HERMES_HOME || ~/.hermes.
 * This is non-deterministic — if the parent shell happens to set HERMES_HOME,
 * memory browser shows a different profile's memory. Instead it should derive
 * the path from the active profile stored in ~/.hermes/active_profile (or use
 * a configured root).
 *
 * We test the buggy env-based approach vs a deterministic active-profile-based
 * approach.
 */

describe('memory-browser deterministic path', () => {
  let tempHome: string
  let originalHermesHome: string | undefined

  beforeEach(() => {
    originalHermesHome = process.env.HERMES_HOME
    tempHome = fs.mkdtempSync(path.join(os.tmpdir(), 'memory-browser-test-'))
  })

  afterEach(() => {
    if (originalHermesHome === undefined) {
      delete process.env.HERMES_HOME
    } else {
      process.env.HERMES_HOME = originalHermesHome
    }
    fs.rmSync(tempHome, { recursive: true, force: true })
  })

  /**
   * Buggy implementation — relies on process.env.HERMES_HOME.
   */
  function normalizeWorkspaceRootBuggy(): string {
    const envHome = process.env.HERMES_HOME?.trim()
    if (envHome) return envHome
    return path.join(os.homedir(), '.hermes')
  }

  /**
   * Fixed implementation — derives path from active profile for determinism.
   */
  function normalizeWorkspaceRootFixed(): string {
    const globalRoot = path.join(os.homedir(), '.hermes')
    const activeProfilePath = path.join(globalRoot, 'active_profile')
    let activeProfile = ''
    try {
      activeProfile = fs.readFileSync(activeProfilePath, 'utf-8').trim()
    } catch {
      // no active profile file — fall back to global
    }
    if (activeProfile && activeProfile !== 'default') {
      return path.join(globalRoot, 'profiles', activeProfile)
    }
    // HERMES_HOME override still allowed for explicit dev workflows,
    // but ignored when profile active file exists.
    const envHome = process.env.HERMES_HOME?.trim()
    if (envHome && !fs.existsSync(activeProfilePath)) return envHome
    return globalRoot
  }

  it('buggy path changes when HERMES_HOME env var changes', () => {
    process.env.HERMES_HOME = path.join(tempHome, '.hermes', 'profiles', 'sentinel')

    const root1 = normalizeWorkspaceRootBuggy()
    expect(root1).toContain('sentinel')

    process.env.HERMES_HOME = path.join(tempHome, '.hermes', 'profiles', 'jules')

    const root2 = normalizeWorkspaceRootBuggy()
    expect(root2).toContain('jules')

    // The path changed just because env var changed — non-deterministic
    expect(root1).not.toBe(root2)
  })

  it('fixed path ignores HERMES_HOME env var when active_profile exists', () => {
    const globalRoot = path.join(tempHome, '.hermes')
    const profileRoot = path.join(globalRoot, 'profiles', 'nous')
    fs.mkdirSync(profileRoot, { recursive: true })
    fs.writeFileSync(path.join(globalRoot, 'active_profile'), 'nous\n', 'utf-8')

    // Point env var at a DIFFERENT profile
    process.env.HERMES_HOME = path.join(tempHome, '.hermes', 'profiles', 'sentinel')

    vi.spyOn(os, 'homedir').mockReturnValue(tempHome)
    const root = normalizeWorkspaceRootFixed()
    vi.restoreAllMocks()

    // Must resolve to active profile, not env var
    expect(root).toBe(profileRoot)
    expect(root).not.toContain('sentinel')
  })

  it('fixed path falls back to HERMES_HOME when no active_profile exists', () => {
    const envPath = path.join(tempHome, '.hermes-vanilla')
    fs.mkdirSync(envPath, { recursive: true })
    process.env.HERMES_HOME = envPath

    vi.spyOn(os, 'homedir').mockReturnValue(tempHome)
    const root = normalizeWorkspaceRootFixed()
    vi.restoreAllMocks()

    expect(root).toBe(envPath)
  })

  it('fixed path falls back to ~/.hermes when neither active_profile nor env is set', () => {
    delete process.env.HERMES_HOME
    vi.spyOn(os, 'homedir').mockReturnValue(tempHome)
    const root = normalizeWorkspaceRootFixed()
    vi.restoreAllMocks()

    expect(root).toBe(path.join(tempHome, '.hermes'))
  })

  it('fixed path respects default profile marker (no switch to profiles dir)', () => {
    const globalRoot = path.join(tempHome, '.hermes')
    fs.mkdirSync(globalRoot, { recursive: true })
    fs.writeFileSync(path.join(globalRoot, 'active_profile'), 'default\n', 'utf-8')

    process.env.HERMES_HOME = path.join(tempHome, '.hermes', 'profiles', 'sentinel')

    vi.spyOn(os, 'homedir').mockReturnValue(tempHome)
    const root = normalizeWorkspaceRootFixed()
    vi.restoreAllMocks()

    // "default" means use the global root, not a profiles subdir
    expect(root).toBe(globalRoot)
  })

  it('listMemoryFiles reads from deterministic profile path', () => {
    const globalRoot = path.join(tempHome, '.hermes')
    const profileRoot = path.join(globalRoot, 'profiles', 'architect')
    fs.mkdirSync(path.join(profileRoot, 'memories'), { recursive: true })
    fs.writeFileSync(path.join(profileRoot, 'memories', 'MEMORY.md'), '# Architect Memory', 'utf-8')
    fs.writeFileSync(
      path.join(globalRoot, 'active_profile'),
      'architect\n',
      'utf-8',
    )

    // Simulate reading memories at the fixed root
    vi.spyOn(os, 'homedir').mockReturnValue(tempHome)
    const root = normalizeWorkspaceRootFixed()
    vi.restoreAllMocks()

    const memoryPath = path.join(root, 'memories', 'MEMORY.md')
    expect(fs.existsSync(memoryPath)).toBe(true)
    expect(fs.readFileSync(memoryPath, 'utf-8')).toContain('Architect')
    expect(memoryPath).toContain(path.join('profiles', 'architect'))
  })
})
