import {
  mkdirSync,
  mkdtempSync,
  rmSync,
  utimesSync,
  writeFileSync,
} from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import type * as CronModuleType from './hermes-cron-profiles'

type CronModule = typeof CronModuleType

let homeDir: string
const execFileSyncMock =
  vi.fn<(command: string, args?: Array<string>) => string>()

/**
 * The read paths use real fs under a temp HERMES_HOME; the mutating paths shell
 * out via execFileSync, which we stub so the tests stay deterministic and never
 * spawn the real hermes CLI.
 */
async function loadCron(): Promise<CronModule> {
  vi.resetModules()
  vi.stubEnv('HERMES_HOME', homeDir)
  vi.stubEnv('CLAUDE_HOME', homeDir)
  vi.stubEnv('HERMES_CLI_BIN', '')
  vi.doMock('node:child_process', () => ({
    execFileSync: (command: string, args?: Array<string>): string =>
      execFileSyncMock(command, args),
  }))
  return import('./hermes-cron-profiles')
}

function defaultJobsPath(): string {
  return join(homeDir, 'cron', 'jobs.json')
}

function profileJobsPath(profile: string): string {
  return join(homeDir, 'profiles', profile, 'cron', 'jobs.json')
}

function writeJobsFile(path: string, contents: string): void {
  mkdirSync(join(path, '..'), { recursive: true })
  writeFileSync(path, contents, 'utf-8')
}

function makeProfile(name: string): void {
  mkdirSync(join(homeDir, 'profiles', name), { recursive: true })
}

beforeEach(() => {
  homeDir = mkdtempSync(join(tmpdir(), 'hermes-cron-'))
  execFileSyncMock.mockReset()
})

afterEach(() => {
  vi.unstubAllEnvs()
  vi.resetModules()
  vi.doUnmock('node:child_process')
  rmSync(homeDir, { recursive: true, force: true })
})

describe('listCronProfiles', () => {
  it('always includes the default profile rooted at HERMES_HOME', async () => {
    const cron = await loadCron()
    const profiles = cron.listCronProfiles()
    expect(profiles[0]).toEqual({ profile: 'default', home: homeDir })
  })

  it('lists profile directories sorted, skipping invalid names', async () => {
    makeProfile('zeta')
    makeProfile('alpha')
    makeProfile('bad name with spaces')
    // A file (not a directory) under profiles must be ignored.
    mkdirSync(join(homeDir, 'profiles'), { recursive: true })
    writeFileSync(join(homeDir, 'profiles', 'not-a-dir'), 'x', 'utf-8')
    const cron = await loadCron()
    const names = cron.listCronProfiles().map((p) => p.profile)
    expect(names).toEqual(['default', 'alpha', 'zeta'])
  })

  it('returns only default when the profiles dir is absent', async () => {
    const cron = await loadCron()
    expect(cron.listCronProfiles().map((p) => p.profile)).toEqual(['default'])
  })
})

describe('parseProfileJobId', () => {
  it('returns the raw value when there is no separator', async () => {
    const cron = await loadCron()
    expect(cron.parseProfileJobId('deadbeef')).toEqual({
      profile: null,
      jobId: 'deadbeef',
    })
  })

  it('treats a leading colon as having no profile', async () => {
    const cron = await loadCron()
    expect(cron.parseProfileJobId(':deadbeef')).toEqual({
      profile: null,
      jobId: ':deadbeef',
    })
  })

  it('splits a valid profile:jobId pair', async () => {
    const cron = await loadCron()
    expect(cron.parseProfileJobId('myprofile:DEADBEEF12')).toEqual({
      profile: 'myprofile',
      jobId: 'DEADBEEF12',
    })
  })

  it('rejects an invalid profile name', async () => {
    const cron = await loadCron()
    expect(cron.parseProfileJobId('bad name:deadbeef')).toEqual({
      profile: null,
      jobId: 'bad name:deadbeef',
    })
  })

  it('rejects an invalid job id', async () => {
    const cron = await loadCron()
    expect(cron.parseProfileJobId('profile:not-hex!')).toEqual({
      profile: null,
      jobId: 'profile:not-hex!',
    })
  })
})

describe('listProfileCronJobs', () => {
  it('returns an empty list when no jobs files exist', async () => {
    const cron = await loadCron()
    expect(cron.listProfileCronJobs()).toEqual([])
  })

  it('reads a jobs.json shaped as { jobs: [...] }', async () => {
    writeJobsFile(
      defaultJobsPath(),
      JSON.stringify({ jobs: [{ id: 'deadbeef', name: 'Nightly' }] }),
    )
    const cron = await loadCron()
    const jobs = cron.listProfileCronJobs()
    expect(jobs).toHaveLength(1)
    expect(jobs[0]?.id).toBe('default:deadbeef')
    expect(jobs[0]?.jobId).toBe('deadbeef')
    expect(jobs[0]?.profile).toBe('default')
    expect(jobs[0]?.name).toBe('Nightly')
  })

  it('reads a jobs.json shaped as a bare array', async () => {
    writeJobsFile(defaultJobsPath(), JSON.stringify([{ id: 'abc123' }]))
    const cron = await loadCron()
    expect(cron.listProfileCronJobs().map((j) => j.jobId)).toEqual(['abc123'])
  })

  it('treats malformed JSON as no jobs', async () => {
    writeJobsFile(defaultJobsPath(), '{not json')
    const cron = await loadCron()
    expect(cron.listProfileCronJobs()).toEqual([])
  })

  it('treats a non-array jobs field as no jobs', async () => {
    writeJobsFile(defaultJobsPath(), JSON.stringify({ jobs: { nope: 1 } }))
    const cron = await loadCron()
    expect(cron.listProfileCronJobs()).toEqual([])
  })

  it('skips jobs without an id or jobId', async () => {
    writeJobsFile(
      defaultJobsPath(),
      JSON.stringify({ jobs: [{ name: 'no id' }, { jobId: 'keepme' }] }),
    )
    const cron = await loadCron()
    expect(cron.listProfileCronJobs().map((j) => j.jobId)).toEqual(['keepme'])
  })

  it('derives schedule_display from the first available source', async () => {
    writeJobsFile(
      defaultJobsPath(),
      JSON.stringify({
        jobs: [
          { id: 'a', schedule: { expr: '0 9 * * *' } },
          { id: 'b', cron: '*/5 * * * *' },
          { id: 'c' },
        ],
      }),
    )
    const cron = await loadCron()
    const byId = new Map(
      cron.listProfileCronJobs().map((j) => [j.jobId, j.schedule_display]),
    )
    expect(byId.get('a')).toBe('0 9 * * *')
    expect(byId.get('b')).toBe('*/5 * * * *')
    expect(byId.get('c')).toBe('* * * * *')
  })

  it('derives state and enabled from explicit and inferred values', async () => {
    writeJobsFile(
      defaultJobsPath(),
      JSON.stringify({
        jobs: [
          { id: 'explicit', state: 'running' },
          { id: 'paused', enabled: false },
          { id: 'default-on' },
        ],
      }),
    )
    const cron = await loadCron()
    const byId = new Map(cron.listProfileCronJobs().map((j) => [j.jobId, j]))
    expect(byId.get('explicit')?.state).toBe('running')
    expect(byId.get('explicit')?.enabled).toBe(true)
    expect(byId.get('paused')?.state).toBe('paused')
    expect(byId.get('paused')?.enabled).toBe(false)
    expect(byId.get('default-on')?.state).toBe('scheduled')
    expect(byId.get('default-on')?.enabled).toBe(true)
  })

  it('maps last-run status text to a success boolean', async () => {
    writeJobsFile(
      defaultJobsPath(),
      JSON.stringify({
        jobs: [
          { id: 'ok', last_status: 'Succeeded' },
          { id: 'bad', last_status: 'FAILED' },
          { id: 'weird', last_status: 'pending' },
          { id: 'none' },
        ],
      }),
    )
    const cron = await loadCron()
    const byId = new Map(cron.listProfileCronJobs().map((j) => [j.jobId, j]))
    expect(byId.get('ok')?.last_run_success).toBe(true)
    expect(byId.get('bad')?.last_run_success).toBe(false)
    expect(byId.get('weird')?.last_run_success).toBeNull()
    expect(byId.get('none')?.last_run_success).toBeNull()
  })

  it('normalizes deliver targets and dedupes via fallbacks', async () => {
    writeJobsFile(
      defaultJobsPath(),
      JSON.stringify({
        jobs: [
          { id: 'arr', deliver: ['a,b', ' c ', 2] },
          { id: 'str', deliver: 'x, y ,,x' },
          { id: 'empty', deliver: 5 },
        ],
      }),
    )
    const cron = await loadCron()
    const byId = new Map(cron.listProfileCronJobs().map((j) => [j.jobId, j]))
    expect(byId.get('arr')?.deliver).toEqual(['a', 'b', 'c'])
    expect(byId.get('str')?.deliver).toEqual(['x', 'y', 'x'])
    expect(byId.get('empty')?.deliver).toEqual([])
  })

  it('falls back through name/prompt/run fields', async () => {
    writeJobsFile(
      defaultJobsPath(),
      JSON.stringify({
        jobs: [
          {
            id: 'deadbeef',
            title: 'Titled',
            input: 'do the thing',
            nextRunAt: '2026-01-01T00:00:00Z',
            lastRunAt: '2025-12-31T00:00:00Z',
            lastRunError: 'boom',
          },
        ],
      }),
    )
    const cron = await loadCron()
    const [job] = cron.listProfileCronJobs()
    expect(job?.name).toBe('Titled')
    expect(job?.prompt).toBe('do the thing')
    expect(job?.next_run_at).toBe('2026-01-01T00:00:00Z')
    expect(job?.last_run_at).toBe('2025-12-31T00:00:00Z')
    expect(job?.last_run_error).toBe('boom')
  })

  it('uses the raw id as the name when no name fields exist', async () => {
    writeJobsFile(
      defaultJobsPath(),
      JSON.stringify({ jobs: [{ id: 'rawid' }] }),
    )
    const cron = await loadCron()
    const [job] = cron.listProfileCronJobs()
    expect(job?.name).toBe('rawid')
    expect(job?.prompt).toBe('')
  })

  it('aggregates and sorts jobs across profiles by profile then name', async () => {
    makeProfile('alpha')
    writeJobsFile(
      defaultJobsPath(),
      JSON.stringify({ jobs: [{ id: 'd1', name: 'zeta' }] }),
    )
    writeJobsFile(
      profileJobsPath('alpha'),
      JSON.stringify({
        jobs: [
          { id: 'a2', name: 'Banana' },
          { id: 'a1', name: 'Apple' },
        ],
      }),
    )
    const cron = await loadCron()
    const rows = cron.listProfileCronJobs().map((j) => j.id)
    expect(rows).toEqual(['alpha:a1', 'alpha:a2', 'default:d1'])
  })
})

describe('readProfileCronOutputs', () => {
  function outputsDir(profile: string, jobId: string): string {
    const base =
      profile === 'default' ? homeDir : join(homeDir, 'profiles', profile)
    return join(base, 'cron', 'output', jobId)
  }

  it('rejects invalid profile or job id without touching fs', async () => {
    const cron = await loadCron()
    expect(cron.readProfileCronOutputs('bad name', 'deadbeef', 5)).toEqual([])
    expect(cron.readProfileCronOutputs('default', 'not-hex!', 5)).toEqual([])
  })

  it('returns an empty list when the output dir is missing', async () => {
    const cron = await loadCron()
    expect(cron.readProfileCronOutputs('default', 'deadbeef', 5)).toEqual([])
  })

  it('reads outputs newest-first, skips dotfiles, and respects the limit', async () => {
    const dir = outputsDir('default', 'deadbeef')
    mkdirSync(dir, { recursive: true })
    writeFileSync(join(dir, '2025-01-01.txt'), 'first', 'utf-8')
    writeFileSync(join(dir, '2025-01-02.txt'), 'second', 'utf-8')
    writeFileSync(join(dir, '2025-01-03.txt'), 'third', 'utf-8')
    writeFileSync(join(dir, '.hidden'), 'nope', 'utf-8')
    const cron = await loadCron()
    const outputs = cron.readProfileCronOutputs('default', 'deadbeef', 2)
    expect(outputs.map((o) => o.filename)).toEqual([
      '2025-01-03.txt',
      '2025-01-02.txt',
    ])
    expect(outputs[0]?.content).toBe('third')
    expect(outputs[0]?.size).toBe('third'.length)
    expect(typeof outputs[0]?.timestamp).toBe('string')
  })

  it('clamps the limit to at least 1 and at most 50', async () => {
    const dir = outputsDir('default', 'deadbeef')
    mkdirSync(dir, { recursive: true })
    writeFileSync(join(dir, 'a.txt'), '1', 'utf-8')
    writeFileSync(join(dir, 'b.txt'), '2', 'utf-8')
    const cron = await loadCron()
    // limit 0 → clamped to 1
    expect(cron.readProfileCronOutputs('default', 'deadbeef', 0)).toHaveLength(
      1,
    )
    // limit 99 → clamped to 50, but only 2 files exist
    expect(cron.readProfileCronOutputs('default', 'deadbeef', 99)).toHaveLength(
      2,
    )
  })

  it('reads outputs from a non-default profile path', async () => {
    makeProfile('alpha')
    const dir = outputsDir('alpha', 'cafe1234')
    mkdirSync(dir, { recursive: true })
    const path = join(dir, 'run.txt')
    writeFileSync(path, 'hello', 'utf-8')
    const fixed = new Date('2025-06-01T12:00:00Z')
    utimesSync(path, fixed, fixed)
    const cron = await loadCron()
    const [out] = cron.readProfileCronOutputs('alpha', 'cafe1234', 5)
    expect(out?.content).toBe('hello')
    expect(out?.timestamp).toBe(fixed.toISOString())
  })
})

describe('createProfileCronJob', () => {
  it('shells out with normalized args and links the created job', async () => {
    makeProfile('alpha')
    writeJobsFile(
      profileJobsPath('alpha'),
      JSON.stringify({ jobs: [{ id: 'abcdef12', name: 'New job' }] }),
    )
    execFileSyncMock.mockReturnValue('Created job: abcdef12\n')
    const cron = await loadCron()
    const result = cron.createProfileCronJob('alpha', {
      schedule: '0 9 * * *',
      prompt: 'do it',
      name: 'New job',
      deliver: ['slack', 'slack', 'email'],
      skills: [' research ', '', 'writing'],
      repeat: 3,
    })
    expect(result.ok).toBe(true)
    expect(result.jobId).toBe('alpha:abcdef12')
    const callArgs = execFileSyncMock.mock.calls[0]?.[1] ?? []
    expect(callArgs).toEqual([
      '--profile',
      'alpha',
      'cron',
      'create',
      '--name',
      'New job',
      '--deliver',
      'slack,email',
      '--skill',
      'research',
      '--skill',
      'writing',
      '--repeat',
      '3',
      '0 9 * * *',
      'do it',
    ])
    expect(result.job).not.toBeNull()
  })

  it('omits optional args and leaves jobId undefined when output lacks an id', async () => {
    makeProfile('alpha')
    execFileSyncMock.mockReturnValue('no id here')
    const cron = await loadCron()
    const result = cron.createProfileCronJob('alpha', {
      schedule: '@daily',
      input: 'fallback prompt',
    })
    expect(result.jobId).toBeUndefined()
    expect(result.job).toBeNull()
    const callArgs = execFileSyncMock.mock.calls[0]?.[1] ?? []
    expect(callArgs).toEqual([
      '--profile',
      'alpha',
      'cron',
      'create',
      '@daily',
      'fallback prompt',
    ])
  })

  it('throws when the schedule is missing', async () => {
    makeProfile('alpha')
    const cron = await loadCron()
    expect(() => cron.createProfileCronJob('alpha', { prompt: 'x' })).toThrow(
      /Schedule is required/,
    )
    expect(execFileSyncMock).not.toHaveBeenCalled()
  })

  it('throws for an unknown profile', async () => {
    const cron = await loadCron()
    expect(() =>
      cron.createProfileCronJob('ghost', { schedule: '@daily' }),
    ).toThrow(/Unknown Hermes profile: ghost/)
  })

  it('throws for an invalid profile name', async () => {
    const cron = await loadCron()
    expect(() =>
      cron.createProfileCronJob('bad name', { schedule: '@daily' }),
    ).toThrow(/Invalid profile or job id/)
  })

  it('ignores a non-finite repeat value', async () => {
    makeProfile('alpha')
    execFileSyncMock.mockReturnValue('')
    const cron = await loadCron()
    cron.createProfileCronJob('alpha', {
      schedule: '@daily',
      repeat: Number.POSITIVE_INFINITY,
    })
    const callArgs = execFileSyncMock.mock.calls[0]?.[1] ?? []
    expect(callArgs).not.toContain('--repeat')
  })
})

describe('runProfileCronAction', () => {
  it('shells out for each action and returns the matching job', async () => {
    makeProfile('alpha')
    writeJobsFile(
      profileJobsPath('alpha'),
      JSON.stringify({ jobs: [{ id: 'abcdef12', name: 'J' }] }),
    )
    execFileSyncMock.mockReturnValue('paused')
    const cron = await loadCron()
    const result = cron.runProfileCronAction('alpha', 'abcdef12', 'pause')
    expect(result.ok).toBe(true)
    expect(result.output).toBe('paused')
    expect(result.job).not.toBeNull()
    expect(execFileSyncMock.mock.calls[0]?.[1]).toEqual([
      '--profile',
      'alpha',
      'cron',
      'pause',
      'abcdef12',
    ])
  })

  it('returns a null job when the action target is not found afterward', async () => {
    makeProfile('alpha')
    execFileSyncMock.mockReturnValue('removed')
    const cron = await loadCron()
    const result = cron.runProfileCronAction('alpha', 'abcdef12', 'remove')
    expect(result.job).toBeNull()
    expect(execFileSyncMock.mock.calls[0]?.[1]?.[3]).toBe('remove')
  })

  it('throws when the job id is invalid', async () => {
    makeProfile('alpha')
    const cron = await loadCron()
    expect(() => cron.runProfileCronAction('alpha', 'not-hex!', 'run')).toThrow(
      /Invalid profile or job id/,
    )
    expect(execFileSyncMock).not.toHaveBeenCalled()
  })

  it('throws when the profile is unknown', async () => {
    const cron = await loadCron()
    expect(() =>
      cron.runProfileCronAction('ghost', 'abcdef12', 'resume'),
    ).toThrow(/Unknown Hermes profile: ghost/)
  })
})

describe('updateProfileCronJob', () => {
  it('builds an edit command from the provided updates', async () => {
    makeProfile('alpha')
    writeJobsFile(
      profileJobsPath('alpha'),
      JSON.stringify({ jobs: [{ id: 'abcdef12', name: 'updated' }] }),
    )
    execFileSyncMock.mockReturnValue('edited')
    const cron = await loadCron()
    const result = cron.updateProfileCronJob('alpha', 'abcdef12', {
      name: 'updated',
      schedule: '@weekly',
      prompt: 'new prompt',
      deliver: 'slack,email',
      repeat: 2,
    })
    expect(result.ok).toBe(true)
    expect(result.job).not.toBeNull()
    expect(execFileSyncMock.mock.calls[0]?.[1]).toEqual([
      '--profile',
      'alpha',
      'cron',
      'edit',
      'abcdef12',
      '--name',
      'updated',
      '--schedule',
      '@weekly',
      '--prompt',
      'new prompt',
      '--deliver',
      'slack,email',
      '--repeat',
      '2',
    ])
  })

  it('omits flags for absent updates but still issues the edit', async () => {
    makeProfile('alpha')
    execFileSyncMock.mockReturnValue('edited')
    const cron = await loadCron()
    cron.updateProfileCronJob('alpha', 'abcdef12', {})
    expect(execFileSyncMock.mock.calls[0]?.[1]).toEqual([
      '--profile',
      'alpha',
      'cron',
      'edit',
      'abcdef12',
    ])
  })

  it('drops a blank prompt (readString trims it to null)', async () => {
    makeProfile('alpha')
    execFileSyncMock.mockReturnValue('edited')
    const cron = await loadCron()
    cron.updateProfileCronJob('alpha', 'abcdef12', { prompt: '   ' })
    const args = execFileSyncMock.mock.calls[0]?.[1] ?? []
    expect(args).not.toContain('--prompt')
  })

  it('trims a non-blank prompt before passing it through', async () => {
    makeProfile('alpha')
    execFileSyncMock.mockReturnValue('edited')
    const cron = await loadCron()
    cron.updateProfileCronJob('alpha', 'abcdef12', { input: '  hi  ' })
    const args = execFileSyncMock.mock.calls[0]?.[1] ?? []
    const promptIndex = args.indexOf('--prompt')
    expect(promptIndex).toBeGreaterThan(-1)
    expect(args[promptIndex + 1]).toBe('hi')
  })

  it('throws for an invalid job id before shelling out', async () => {
    makeProfile('alpha')
    const cron = await loadCron()
    expect(() =>
      cron.updateProfileCronJob('alpha', 'bad!', { name: 'x' }),
    ).toThrow(/Invalid profile or job id/)
    expect(execFileSyncMock).not.toHaveBeenCalled()
  })

  it('throws for an unknown profile', async () => {
    const cron = await loadCron()
    expect(() => cron.updateProfileCronJob('ghost', 'abcdef12', {})).toThrow(
      /Unknown Hermes profile: ghost/,
    )
  })
})
