import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const { existsSyncImpl, execFileSyncImpl } = vi.hoisted(() => ({
  existsSyncImpl: { fn: (_path: string) => false as boolean },
  execFileSyncImpl: { fn: (_command: string, _args?: string[]) => '' as string },
}))

vi.mock('node:fs', () => {
  const existsSync = (path: string) => existsSyncImpl.fn(path)
  const stub = (..._args: unknown[]) => undefined
  const fsApi = {
    existsSync,
    readFileSync: stub,
    writeFileSync: stub,
    mkdirSync: stub,
    rmSync: stub,
    statSync: stub,
    readdirSync: () => [],
  }
  return {
    ...fsApi,
    default: fsApi,
  }
})

vi.mock('node:child_process', () => {
  const execFileSync = (command: string, args?: string[]) => execFileSyncImpl.fn(command, args)
  return {
    execFileSync,
    default: { execFileSync },
  }
})

beforeEach(() => {
  existsSyncImpl.fn = () => false
  execFileSyncImpl.fn = () => ''
  vi.unstubAllEnvs()
  vi.stubEnv('HERMES_HOME', '')
  delete process.env.HERMES_HOME
  delete process.env.CLAUDE_HOME
})

afterEach(() => {
  vi.resetModules()
  vi.unstubAllEnvs()
  vi.clearAllMocks()
})

async function loadKanbanBackend(options?: {
  existsSync?: (path: string) => boolean
  execFileSync?: (command: string, args?: string[]) => string
}) {
  if (options?.existsSync) existsSyncImpl.fn = options.existsSync
  if (options?.execFileSync) execFileSyncImpl.fn = options.execFileSync

  vi.doMock('./swarm-kanban-store', () => ({
    SWARM_KANBAN_FILE: '/tmp/swarm2-kanban.json',
    createSwarmKanbanCard: vi.fn((input) => ({
      id: 'local-1',
      title: input.title,
      spec: input.spec ?? '',
      acceptanceCriteria: input.acceptanceCriteria ?? [],
      assignedWorker: input.assignedWorker ?? null,
      reviewer: input.reviewer ?? null,
      status: input.status ?? 'backlog',
      missionId: input.missionId ?? null,
      reportPath: input.reportPath ?? null,
      createdBy: input.createdBy ?? 'swarm2-kanban',
      createdAt: 1,
      updatedAt: 1,
    })),
    listSwarmKanbanCards: vi.fn(() => [{
      id: 'local-1',
      title: 'Local task',
      spec: '',
      acceptanceCriteria: [],
      assignedWorker: null,
      reviewer: null,
      status: 'backlog',
      missionId: null,
      reportPath: null,
      createdBy: 'local',
      createdAt: 1,
      updatedAt: 1,
    }]),
    updateSwarmKanbanCard: vi.fn((cardId, updates) => ({
      id: cardId,
      title: updates.title ?? 'Local task',
      spec: updates.spec ?? '',
      acceptanceCriteria: [],
      assignedWorker: updates.assignedWorker ?? null,
      reviewer: null,
      status: updates.status ?? 'backlog',
      missionId: null,
      reportPath: null,
      createdBy: 'local',
      createdAt: 1,
      updatedAt: 2,
    })),
  }))

  return import('./kanban-backend')
}

describe('kanban-backend', () => {
  it('auto-detect prefers Hermes backend when Hermes CLI and canonical storage are present', async () => {
    vi.stubEnv('CLAUDE_HOME', '/Users/aurora/.claude/profiles/swarm2')
    const sqliteCalls: Array<{ command: string; args?: string[] }> = []
    const mod = await loadKanbanBackend({
      existsSync: (target) => target === '/Users/aurora/.claude/kanban.db' || target === '/Users/aurora/.claude/kanban',
      execFileSync: (command, args = []) => {
        if (command === 'which' && args[0] === 'claude') return '/Users/aurora/.local/bin/claude\n'
        if (command === '/Users/aurora/.local/bin/claude' && args[0] === '--version') return 'claude 1.0.0\n'
        if (command === 'sqlite3') {
          sqliteCalls.push({ command, args })
          return JSON.stringify([
            {
              id: 't_12345678',
              title: 'Hermes task',
              body: 'Backed by sqlite',
              status: 'running',
              assignee: 'swarm2',
              created_at: 1777527540,
              updated_at: 1777527644,
            },
          ])
        }
        throw new Error(`Unexpected command: ${command} ${args.join(' ')}`)
      },
    })

    expect(mod.getKanbanBackendMeta()).toMatchObject({
      id: 'claude',
      detected: true,
      writable: true,
      path: '/Users/aurora/.claude/kanban.db',
    })

    const cards = mod.listKanbanCards()
    expect(cards).toHaveLength(1)
    expect(cards[0]).toMatchObject({
      id: 't_12345678',
      title: 'Hermes task',
      status: 'running',
      assignedWorker: 'swarm2',
      createdBy: 'claude-kanban',
    })
    expect(sqliteCalls[0]?.args?.[0]).toBe('/Users/aurora/.claude/kanban.db')
  })

  it('auto-detect uses Hermes storage directly when the CLI is unavailable', async () => {
    vi.stubEnv('CLAUDE_HOME', '/Users/aurora/.claude/profiles/swarm2')
    const mod = await loadKanbanBackend({
      existsSync: (target) => target === '/Users/aurora/.claude/kanban.db',
      execFileSync: (command, args = []) => {
        if (command === 'which' && args[0] === 'claude') throw new Error('not found')
        if (command === 'sqlite3') {
          return JSON.stringify([
            {
              id: 't_direct',
              title: 'Direct Hermes task',
              body: '',
              status: 'ready',
              assignee: null,
              created_at: 1777527540,
              updated_at: 1777527644,
            },
          ])
        }
        throw new Error(`Unexpected command: ${command} ${args.join(' ')}`)
      },
    })

    expect(mod.getKanbanBackendMeta()).toMatchObject({
      id: 'claude',
      detected: true,
      writable: true,
      path: '/Users/aurora/.claude/kanban.db',
    })
    expect(mod.getKanbanBackendMeta().details).toContain('direct local storage access')
    expect(mod.listKanbanCards()[0]).toMatchObject({ id: 't_direct', status: 'ready' })
  })

  it('resolves canonical Kanban paths from legacy profile-home env fallback too', async () => {
    vi.stubEnv('CLAUDE_HOME', '/Users/aurora/.claude/profiles/swarm5/home')
    const mod = await loadKanbanBackend({
      existsSync: (target) => target === '/Users/aurora/.claude/kanban.db',
      execFileSync: (command, args = []) => {
        if (command === 'which' && args[0] === 'claude') throw new Error('not found')
        if (command === 'sqlite3') return '[]'
        throw new Error(`Unexpected command: ${command} ${args.join(' ')}`)
      },
    })

    expect(mod.getKanbanBackendMeta()).toMatchObject({
      id: 'claude',
      detected: true,
      path: '/Users/aurora/.claude/kanban.db',
    })
  })

  it('auto-detect falls back to local when canonical Hermes storage is missing', async () => {
    vi.stubEnv('CLAUDE_HOME', '/Users/aurora/.claude/profiles/swarm2')
    const mod = await loadKanbanBackend({
      existsSync: () => false,
      execFileSync: (command, args = []) => {
        if (command === 'which' && args[0] === 'claude') return '/Users/aurora/.local/bin/claude\n'
        if (command === '/Users/aurora/.local/bin/claude' && args[0] === '--version') return 'claude 1.0.0\n'
        throw new Error(`Unexpected command: ${command} ${args.join(' ')}`)
      },
    })

    expect(mod.getKanbanBackendMeta()).toMatchObject({
      id: 'local',
      detected: true,
      writable: true,
      path: '/tmp/swarm2-kanban.json',
    })
    expect(mod.listKanbanCards()[0]?.id).toBe('local-1')
  })

  it('creates and updates Hermes tasks through canonical kanban.db path', async () => {
    vi.stubEnv('CLAUDE_HOME', '/Users/aurora/.claude/profiles/swarm2')
    const sqliteCalls: string[] = []
    let readCount = 0
    const mod = await loadKanbanBackend({
      existsSync: (target) => target === '/Users/aurora/.claude/kanban.db' || target === '/Users/aurora/.claude/kanban',
      execFileSync: (command, args = []) => {
        if (command === 'which' && args[0] === 'claude') return '/Users/aurora/.local/bin/claude\n'
        if (command === '/Users/aurora/.local/bin/claude' && args[0] === '--version') return 'claude 1.0.0\n'
        if (command === 'sqlite3') {
          sqliteCalls.push(args.join(' '))
          const sql = args[2] ?? ''
          if (sql.includes('where id =')) {
            readCount += 1
            return JSON.stringify([
              {
                id: 't_deadbeef',
                title: readCount === 1 ? 'Created Hermes task' : 'Updated Hermes task',
                body: 'Task body',
                status: readCount === 1 ? 'queued' : 'done',
                assignee: 'swarm6',
                created_at: 1777527540,
                updated_at: 1777527644,
              },
            ])
          }
          return '[]'
        }
        throw new Error(`Unexpected command: ${command} ${args.join(' ')}`)
      },
    })

    const created = mod.createKanbanCard({ title: 'Created Hermes task', spec: 'Task body', assignedWorker: 'swarm6', status: 'backlog' })
    const updated = mod.updateKanbanCard('t_deadbeef', { title: 'Updated Hermes task', status: 'done', assignedWorker: 'swarm6' })

    expect(created).toMatchObject({ id: 't_deadbeef', title: 'Created Hermes task', status: 'backlog', assignedWorker: 'swarm6', createdBy: 'claude-kanban' })
    expect(updated).toMatchObject({ id: 't_deadbeef', title: 'Updated Hermes task', status: 'done', assignedWorker: 'swarm6' })
    expect(sqliteCalls.every((call) => call.startsWith('/Users/aurora/.claude/kanban.db '))).toBe(true)
    expect(sqliteCalls.some((call) => call.includes('insert into tasks'))).toBe(true)
    expect(sqliteCalls.some((call) => call.includes('update tasks set'))).toBe(true)
  })

  it('mapRunningCardsToSessions returns only running cards in merged session shape', async () => {
    const mod = await loadKanbanBackend()
    const cards = [
      { id: 't_run1', title: 'Running task', spec: '', acceptanceCriteria: [], assignedWorker: 'coding', reviewer: null, status: 'running' as const, missionId: null, reportPath: null, createdBy: 'claude-kanban', createdAt: 1_700_000_000_000, updatedAt: 1_700_000_500_000, startedAt: 1_700_000_100_000, workspace: '/tmp/ws/t_run1' },
      { id: 't_done1', title: 'Done task', spec: '', acceptanceCriteria: [], assignedWorker: null, reviewer: null, status: 'done' as const, missionId: null, reportPath: null, createdBy: 'claude-kanban', createdAt: 1_700_000_000_000, updatedAt: 1_700_000_400_000 },
      { id: 't_ready1', title: 'Ready task', spec: '', acceptanceCriteria: [], assignedWorker: 'research', reviewer: null, status: 'ready' as const, missionId: null, reportPath: null, createdBy: 'claude-kanban', createdAt: 1_700_000_000_000, updatedAt: 1_700_000_300_000 },
      { id: 't_run2', title: 'Running fallback', spec: '', acceptanceCriteria: [], assignedWorker: null, reviewer: null, status: 'running' as const, missionId: null, reportPath: null, createdBy: 'claude-kanban', createdAt: 1_700_000_200_000, updatedAt: 1_700_000_600_000 },
    ]

    const sessions = mod.mapRunningCardsToSessions(cards)

    expect(sessions).toHaveLength(2)
    expect(sessions.map((s) => s.id)).toEqual(['t_run1', 't_run2'])

    const [first, second] = sessions
    expect(first).toMatchObject({
      key: 't_run1',
      id: 't_run1',
      title: '🤖 Running task',
      startedAt: 1_700_000_100_000,
      updatedAt: 1_700_000_500_000,
      message_count: 0,
      model: 'coding',
      source: 'kanban-worker',
      kanban: {
        taskId: 't_run1',
        assignee: 'coding',
        status: 'running',
        workspace: '/tmp/ws/t_run1',
      },
    })

    // Falls back to createdAt when startedAt absent and workspace null when missing.
    expect(second).toMatchObject({
      key: 't_run2',
      startedAt: 1_700_000_200_000,
      model: null,
      kanban: { workspace: null, assignee: null, status: 'running' },
    })
  })

  it('mapRunningCardsToSessions returns empty array when no running cards', async () => {
    const mod = await loadKanbanBackend()
    const sessions = mod.mapRunningCardsToSessions([
      { id: 't_d', title: 'd', spec: '', acceptanceCriteria: [], assignedWorker: null, reviewer: null, status: 'done', missionId: null, reportPath: null, createdBy: 'x', createdAt: 1, updatedAt: 1 },
      { id: 't_b', title: 'b', spec: '', acceptanceCriteria: [], assignedWorker: null, reviewer: null, status: 'backlog', missionId: null, reportPath: null, createdBy: 'x', createdAt: 1, updatedAt: 1 },
    ])
    expect(sessions).toEqual([])
  })

  it('listRunningKanbanWorkers returns merged-shape sessions, never crashes (local fallback path)', async () => {
    // When the canonical Hermes DB is not detected, listRunningKanbanWorkers
    // falls back to listKanbanCards() (local Swarm board). The default mock
    // returns a single backlog card, so the result must be an empty array of
    // merged-shape sessions — proves the public helper handles the
    // no-running-workers case without throwing and without leaking non-running
    // cards into /api/sessions.
    const mod = await loadKanbanBackend({ existsSync: () => false })
    const sessions = mod.listRunningKanbanWorkers()
    expect(Array.isArray(sessions)).toBe(true)
    expect(sessions).toEqual([])
  })
})
