import { describe, expect, it } from 'vitest'
import { mkdtempSync, readFileSync, rmSync, statSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import * as yaml from 'yaml'
import { DEFAULT_SWARM_AGENT_TEAM } from './swarm-roster'
import {
  ensureDefaultSwarmLiveWorkers,
  planDefaultSwarmLiveWorkers,
} from './swarm-live-workers'

describe('Swarm live workers bootstrap', () => {
  it('plans one live worker asset set for each default specialist agent', () => {
    const root = mkdtempSync(join(tmpdir(), 'swarm-live-workers-'))
    try {
      const plan = planDefaultSwarmLiveWorkers({
        profilesDir: join(root, 'profiles'),
        localBinDir: join(root, 'bin'),
        workspaceRoot: '/workspace/hermes',
        hermesBin: '/usr/local/bin/hermes',
      })

      expect(plan).toHaveLength(15)
      expect(plan.map((worker) => worker.id)).toEqual(DEFAULT_SWARM_AGENT_TEAM.map((agent) => agent.id))
      expect(plan[0]).toMatchObject({
        id: 'swarm1',
        name: 'Conductor',
        role: 'CTO / Conductor',
        sessionName: 'swarm-swarm1',
      })
      expect(plan[14]).toMatchObject({
        id: 'swarm15',
        name: 'Data Analyst',
        role: 'Data Analyst',
        sessionName: 'swarm-swarm15',
      })
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  })

  it('creates profile config, runtime metadata, and executable wrappers for all 15 agents', () => {
    const root = mkdtempSync(join(tmpdir(), 'swarm-live-workers-'))
    try {
      const result = ensureDefaultSwarmLiveWorkers({
        profilesDir: join(root, 'profiles'),
        localBinDir: join(root, 'bin'),
        workspaceRoot: '/workspace/hermes',
        hermesBin: '/usr/local/bin/hermes',
      })

      expect(result.ok).toBe(true)
      expect(result.workers).toHaveLength(15)
      expect(result.createdProfiles).toBe(15)
      expect(result.createdWrappers).toBe(15)

      const conductorConfig = yaml.parse(
        readFileSync(join(root, 'profiles', 'swarm1', 'config.yaml'), 'utf8'),
      ) as Record<string, unknown>
      expect(conductorConfig.profile?.['id']).toBe('swarm1')
      expect(conductorConfig.profile?.['role']).toBe('CTO / Conductor')
      expect(conductorConfig.system_prompt).toContain('CTO / Conductor')
      expect(conductorConfig.system_prompt).toContain('protocol-driven-orchestrator')

      const backendRuntime = JSON.parse(
        readFileSync(join(root, 'profiles', 'swarm4', 'runtime.json'), 'utf8'),
      ) as Record<string, unknown>
      expect(backendRuntime.workerId).toBe('swarm4')
      expect(backendRuntime.role).toBe('Backend Coder')
      expect(backendRuntime.state).toBe('idle')
      expect(backendRuntime.phase).toBe('live-worker-ready')

      const wrapperPath = join(root, 'bin', 'swarm6')
      const wrapper = readFileSync(wrapperPath, 'utf8')
      expect(wrapper).toContain("cd '/workspace/hermes'")
      expect(wrapper).toContain("HERMES_HOME='")
      expect(wrapper).toContain("exec '/usr/local/bin/hermes' chat --tui")
      expect(statSync(wrapperPath).mode & 0o111).toBeGreaterThan(0)
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  })
})
