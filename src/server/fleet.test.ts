import { describe, expect, it } from 'vitest'
import {
  buildFleetSummary,
  buildCronDetailFromJob,
  buildFleetCronDashboard,
  classifyCronOutputStyle,
  cronSummaryFromRawJobs,
  inferOpenClawRuntime,
  findFleetNode,
  parseDockerPsLines,
  parseHermesCronList,
  redactSensitiveText,
  readFleetRegistryFromText,
} from './fleet'

describe('fleet registry parsing', () => {
  it('normalizes the fleet registry into nodes with safe defaults', () => {
    const registry = readFleetRegistryFromText(`
nodes:
  - id: pierre-local
    name: Pierre
    kind: hermes-local
    host: local
    hermes_home: /Users/clawd/.hermes
  - id: maya-round6
    name: Maya / Round 6
    kind: hermes-container
    parent: morgan-vps
    container: round6-hermes
`)

    expect(registry.nodes).toHaveLength(2)
    expect(registry.nodes[0]).toMatchObject({
      id: 'pierre-local',
      status: 'unknown',
      host: 'local',
    })
    expect(registry.nodes[1]).toMatchObject({
      id: 'maya-round6',
      parent: 'morgan-vps',
      container: 'round6-hermes',
    })
  })
})

describe('fleet collectors', () => {
  it('parses docker ps output into container states', () => {
    const containers = parseDockerPsLines([
      'round6-hermes|Up 4 minutes (healthy)|round6-hermes',
      'morgan-hermes|Exited (1) 2 hours ago|config-hermes',
    ])

    expect(containers.get('round6-hermes')).toMatchObject({
      name: 'round6-hermes',
      healthy: true,
      running: true,
    })
    expect(containers.get('morgan-hermes')).toMatchObject({
      running: false,
      healthy: false,
    })
  })

  it('parses Hermes cron list output without leaking prompt content', () => {
    const cron = parseHermesCronList(`
  8c886b3fed87 [active]
    Name:      Hermes Diary Update — Pierre
    Schedule:  0 */6 * * *
    Next run:  2026-04-29T18:00:00+02:00
    Last run:  2026-04-29T12:01:18.904020+02:00  ok

  deadbeef [paused]
    Name:      Noisy Test
    Last run:  2026-04-28T12:01:18.904020+02:00  failed
`)

    expect(cron.total).toBe(2)
    expect(cron.active).toBe(1)
    expect(cron.failedRecent).toBe(1)
    expect(cron.items[0]).toMatchObject({
      id: '8c886b3fed87',
      name: 'Hermes Diary Update — Pierre',
      status: 'active',
      lastRunStatus: 'ok',
    })
  })

  it('summarizes fleet health at a glance', () => {
    const summary = buildFleetSummary([
      { id: 'pierre', name: 'Pierre', kind: 'hermes-local', status: 'healthy', lastSeen: 'now' },
      { id: 'maya', name: 'Maya', kind: 'hermes-container', status: 'degraded', lastSeen: 'now' },
      { id: 'openclaw', name: 'OpenClaw', kind: 'openclaw', status: 'unknown', lastSeen: null },
    ])

    expect(summary).toEqual({
      total: 3,
      healthy: 1,
      degraded: 1,
      offline: 0,
      unknown: 1,
    })
  })

  it('finds fleet nodes by id without falling back to unsafe partial matches', () => {
    const registry = readFleetRegistryFromText(`
nodes:
  - id: pierre-local
    name: Pierre
    kind: hermes-local
  - id: pierre-local-shadow
    name: Shadow
    kind: hermes-local
`)

    expect(findFleetNode(registry.nodes, 'pierre-local')?.name).toBe('Pierre')
    expect(findFleetNode(registry.nodes, 'pierre')).toBeNull()
  })

  it('redacts tokens, keys, passwords, and bearer headers from logs', () => {
    const redacted = redactSensitiveText(`
OPENAI_API_KEY=abc123
ELEVENLABS_API_KEY: abcdef
password="hunter2"
Authorization: Bearer token-value
normal line stays
`)

    expect(redacted).toContain('OPENAI_API_KEY=[REDACTED]')
    expect(redacted).toContain('ELEVENLABS_API_KEY: [REDACTED]')
    expect(redacted).toContain('password=[REDACTED]')
    expect(redacted).toContain('Authorization: Bearer [REDACTED]')
    expect(redacted).toContain('normal line stays')
    expect(redacted).not.toContain('abc123')
    expect(redacted).not.toContain('hunter2')
    expect(redacted).not.toContain('token-value')
  })

  it('builds a unified cron dashboard from node cron summaries', () => {
    const dashboard = buildFleetCronDashboard([
      {
        id: 'pierre-local',
        name: 'Pierre',
        kind: 'hermes-local',
        host: 'local',
        status: 'healthy',
        lastSeen: 'now',
        recentErrors: [],
        checks: [],
        cron: {
          total: 2,
          active: 1,
          paused: 1,
          failedRecent: 1,
          items: [
            { id: '8c886b3fed87', name: 'Hermes Diary Update — Pierre', status: 'active', schedule: '0 */6 * * *', lastRunStatus: 'ok' },
            { id: 'deadbeef', name: 'Noisy Test', status: 'paused', lastRunStatus: 'failed' },
          ],
        },
      },
      {
        id: 'maya-round6',
        name: 'Maya',
        kind: 'hermes-container',
        host: 'docker',
        status: 'healthy',
        lastSeen: 'now',
        recentErrors: [],
        checks: [],
      },
    ])

    expect(dashboard.summary).toEqual({ total: 2, active: 1, paused: 1, failedRecent: 1 })
    expect(dashboard.jobs.find((job) => job.id === '8c886b3fed87')).toMatchObject({ nodeId: 'pierre-local', nodeName: 'Pierre' })
  })

  it('flags systemish cron output without penalizing short human summaries', () => {
    const systemish = classifyCronOutputStyle(`
Cronjob Response: Hermes Diary Update — Pierre
(job_id: 8c886b3fed87)
-------------
📕 Hermes Diary Update — Pierre
• job_id: 8c886b3fed87
• Diary updated successfully.
`)
    const human = classifyCronOutputStyle('Diary updated.\n\n1 session added to Pierre’s diary.\nMorgan cross-reference updated too.')

    expect(systemish.tone).toBe('systemish')
    expect(systemish.score).toBeGreaterThanOrEqual(4)
    expect(systemish.reasons).toContain('cron wrapper visible')
    expect(human.tone).toBe('human')
  })

  it('builds a cron summary from raw container jobs.json metadata', () => {
    const cron = cronSummaryFromRawJobs([
      {
        id: '7a9ab6b1356a',
        name: 'r6-weather-oracle',
        enabled: true,
        schedule_display: '0 8 * * *',
        next_run_at: '2026-04-30T08:00:00+02:00',
        last_run_at: '2026-04-29T18:18:14+02:00',
        last_status: 'ok',
      },
      {
        id: 'paused123',
        name: 'Paused remote job',
        enabled: false,
        last_status: 'failed',
      },
    ])

    expect(cron).toMatchObject({ total: 2, active: 1, paused: 1, failedRecent: 1 })
    expect(cron.items[0]).toMatchObject({ id: '7a9ab6b1356a', name: 'r6-weather-oracle', status: 'active' })
  })

  it('infers OpenClaw runtime state from launchctl, health, and npm version checks', () => {
    const runtime = inferOpenClawRuntime({
      launchctl: 'state = running\n\tpid = 98782',
      health: '{"ok":true,"status":"live"}',
      npm: '/usr/local/lib\n└── openclaw@2026.4.26',
    })

    expect(runtime.status).toBe('healthy')
    expect(runtime.version).toBe('2026.4.26')
    expect(runtime.checks).toEqual(expect.arrayContaining([
      expect.objectContaining({ label: 'LaunchAgent', ok: true }),
      expect.objectContaining({ label: 'Gateway health', ok: true }),
      expect.objectContaining({ label: 'OpenClaw package', ok: true }),
    ]))
  })

  it('builds cron detail from job metadata and latest output markdown', () => {
    const detail = buildCronDetailFromJob({
      job: {
        id: '8c886b3fed87',
        name: 'Hermes Diary Update — Pierre',
        prompt: 'Run: cd ~/"[ 03 ] CODE"/Hermes/DIARY && python3 -m diary.update_orchestrator --cross-ref',
        skills: ['hermes-diary-system'],
        model: { provider: 'openrouter', model: 'kimi-k2.6:cloud' },
        schedule_display: '0 */6 * * *',
        enabled: true,
        last_status: 'ok',
        deliver: 'origin',
        origin: { platform: 'telegram', chat_id: '1854421', chat_name: 'Rodrigo Bressane' },
      },
      node: {
        id: 'pierre-local',
        name: 'Pierre',
        kind: 'hermes-local',
        host: 'local',
        status: 'healthy',
        lastSeen: 'now',
        recentErrors: [],
        checks: [],
      },
      latestOutput: `# Cron Job: Hermes Diary Update — Pierre

**Job ID:** 8c886b3fed87

## Prompt

Run: something

## Response

Cronjob Response: Hermes Diary Update — Pierre
(job_id: 8c886b3fed87)
-------------
📕 Hermes Diary Update — Pierre
• job_id: 8c886b3fed87
• Diary updated successfully.
API_KEY=secret-value
`,
      outputPath: '/tmp/output.md',
    })

    expect(detail.job.id).toBe('8c886b3fed87')
    expect(detail.job.prompt).toContain('update_orchestrator')
    expect(detail.job.deliveryTarget).toBe('telegram:Rodrigo Bressane')
    expect(detail.latestOutput?.response).toContain('Cronjob Response')
    expect(detail.latestOutput?.response).not.toContain('secret-value')
    expect(detail.style.tone).toBe('systemish')
    expect(detail.style.reasons).toContain('job id exposed')
    expect(detail.suggestedHumanSummary).toContain('Diary updated')
    expect(detail.suggestedHumanSummary).not.toContain('job_id')
  })
})
