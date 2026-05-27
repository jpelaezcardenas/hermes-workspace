import { closeSync, mkdtempSync, mkdirSync, openSync, rmSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'

import { afterEach, describe, expect, it } from 'vitest'

import {
  buildHermesAgentLaunchPlan,
  resolveClaudeAgentDir,
  resolveClaudeBinary,
} from './hermes-agent-startup'

const tempDirs: string[] = []

function createAgentDir(prefix: string): string {
  const dir = mkdtempSync(join(tmpdir(), prefix))
  mkdirSync(join(dir, 'webapi'))
  tempDirs.push(dir)
  return dir
}

function createCurrentHermesDir(prefix: string): string {
  const dir = mkdtempSync(join(tmpdir(), prefix))
  mkdirSync(join(dir, 'gateway'), { recursive: true })
  closeSync(openSync(join(dir, 'gateway', 'run.py'), 'w'))
  tempDirs.push(dir)
  return dir
}

afterEach(() => {
  for (const dir of tempDirs.splice(0)) {
    rmSync(dir, { recursive: true, force: true })
  }
})

describe('resolveClaudeAgentDir', () => {
  it('prefers HERMES_AGENT_PATH when it points to a valid hermes-agent checkout', () => {
    const hermesAgentDir = createAgentDir('hermes-agent-')
    const legacyAgentDir = createAgentDir('claude-agent-')

    expect(
      resolveClaudeAgentDir({
        HERMES_AGENT_PATH: hermesAgentDir,
        CLAUDE_AGENT_PATH: legacyAgentDir,
      }),
    ).toBe(hermesAgentDir)
  })

  it('falls back to legacy CLAUDE_AGENT_PATH for backward compatibility', () => {
    const legacyAgentDir = createAgentDir('claude-agent-')

    expect(
      resolveClaudeAgentDir({
        CLAUDE_AGENT_PATH: legacyAgentDir,
      }),
    ).toBe(legacyAgentDir)
  })

  it('accepts current Hermes Agent checkouts without the removed webapi directory', () => {
    const hermesAgentDir = createCurrentHermesDir('hermes-agent-current-')

    expect(
      resolveClaudeAgentDir({
        HERMES_AGENT_PATH: hermesAgentDir,
      }),
    ).toBe(hermesAgentDir)
  })
})

describe('resolveClaudeBinary', () => {
  it('prefers Hermes binaries before legacy Claude binaries', () => {
    const hermesBin = createCurrentHermesDir('hermes-bin-')
    const legacyBin = createCurrentHermesDir('claude-bin-')

    expect(
      resolveClaudeBinary({
        HERMES_CLI_BIN: hermesBin,
        CLAUDE_CLI_BIN: legacyBin,
      }),
    ).toBe(hermesBin)
  })
})

describe('buildHermesAgentLaunchPlan', () => {
  it('launches current Hermes Agent source checkouts with gateway.run instead of legacy webapi', () => {
    const hermesAgentDir = createCurrentHermesDir('hermes-agent-current-launch-')

    const plan = buildHermesAgentLaunchPlan({ agentDir: hermesAgentDir, binary: null })

    expect(plan).toEqual({
      command: 'python3',
      args: ['-m', 'gateway.run'],
      cwd: hermesAgentDir,
    })
  })

  it('uses legacy uvicorn only for legacy webapi checkouts', () => {
    const legacyAgentDir = createAgentDir('claude-agent-launch-')

    const plan = buildHermesAgentLaunchPlan({ agentDir: legacyAgentDir, binary: null })

    expect(plan).toEqual({
      command: 'python3',
      args: ['-m', 'uvicorn', 'webapi.app:app', '--host', '0.0.0.0', '--port', '8642'],
      cwd: legacyAgentDir,
    })
  })
})
