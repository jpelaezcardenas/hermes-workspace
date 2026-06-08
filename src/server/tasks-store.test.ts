import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'

// tasks-store resolves CLAUDE_HOME / TASKS_FILE from process.env at module-load
// time, so HERMES_HOME must be set before the module is imported. A dedicated
// temp dir for the whole suite is created here and exported via the env var.
const HOME_DIR = mkdtempSync(join(tmpdir(), 'hermes-tasks-'))
const TASKS_FILE = join(HOME_DIR, 'tasks.json')
const originalHermesHome = process.env.HERMES_HOME
const originalClaudeHome = process.env.CLAUDE_HOME
process.env.HERMES_HOME = HOME_DIR
delete process.env.CLAUDE_HOME

// Imported after the env override above so the module's top-level path
// resolution picks up the temp dir.
const tasksStore = await import('./tasks-store')
const {
  createTask,
  deleteTask,
  getTask,
  linkTaskSession,
  listTasks,
  moveTask,
  updateTask,
} = tasksStore
type TaskRecord = ReturnType<typeof tasksStore.createTask>

function readRawFile(): unknown {
  return JSON.parse(readFileSync(TASKS_FILE, 'utf-8')) as unknown
}

function writeRawFile(contents: string): void {
  writeFileSync(TASKS_FILE, contents, 'utf-8')
}

beforeAll(() => {
  mkdirSync(HOME_DIR, { recursive: true })
})

afterAll(() => {
  if (originalHermesHome === undefined) delete process.env.HERMES_HOME
  else process.env.HERMES_HOME = originalHermesHome
  if (originalClaudeHome === undefined) delete process.env.CLAUDE_HOME
  else process.env.CLAUDE_HOME = originalClaudeHome
  rmSync(HOME_DIR, { recursive: true, force: true })
})

beforeEach(() => {
  // Reset to a clean, empty store before each test.
  rmSync(TASKS_FILE, { force: true })
})

describe('ensureTasksFile / path resolution', () => {
  it('creates the tasks file under HERMES_HOME on first read', () => {
    expect(existsSync(TASKS_FILE)).toBe(false)
    const tasks = listTasks()
    expect(tasks).toEqual([])
    expect(existsSync(TASKS_FILE)).toBe(true)
    expect(readRawFile()).toEqual({ tasks: [] })
  })

  it('does not overwrite an existing tasks file', () => {
    const seeded = createTask({ title: 'Seed' })
    // Reading again must preserve the previously written record.
    const tasks = listTasks({ includeDone: true })
    expect(tasks.map((t) => t.id)).toEqual([seeded.id])
  })
})

describe('createTask', () => {
  it('creates a task with normalized defaults', () => {
    const task = createTask({ title: 'My task' })
    expect(task.title).toBe('My task')
    expect(task.description).toBe('')
    expect(task.column).toBe('backlog')
    expect(task.priority).toBe('medium')
    expect(task.assignee).toBeNull()
    expect(task.tags).toEqual([])
    expect(task.due_date).toBeNull()
    expect(task.position).toBe(0)
    expect(task.created_by).toBe('user')
    expect(task.session_id).toBeNull()
    expect(task.id).toMatch(/[0-9a-f-]{36}/)
    expect(task.created_at).toBe(task.updated_at)
  })

  it('honors provided id and created_by', () => {
    const task = createTask({
      title: 'Custom',
      id: 'fixed-id',
      created_by: 'agent-7',
    })
    expect(task.id).toBe('fixed-id')
    expect(task.created_by).toBe('agent-7')
  })

  it('falls back to a generated id when id is an empty string', () => {
    const task = createTask({ title: 'Empty id', id: '' })
    expect(task.id).not.toBe('')
    expect(task.id).toMatch(/[0-9a-f-]{36}/)
  })

  it('falls back to "user" when created_by is an empty string', () => {
    const task = createTask({ title: 'Empty creator', created_by: '' })
    expect(task.created_by).toBe('user')
  })

  it('keeps explicit non-default field values', () => {
    const task = createTask({
      title: 'Full',
      description: 'desc',
      column: 'todo',
      priority: 'high',
      assignee: 'dave',
      tags: ['a', 'b'],
      due_date: '2026-01-01',
      position: 5,
    })
    expect(task.description).toBe('desc')
    expect(task.column).toBe('todo')
    expect(task.priority).toBe('high')
    expect(task.assignee).toBe('dave')
    expect(task.tags).toEqual(['a', 'b'])
    expect(task.due_date).toBe('2026-01-01')
    expect(task.position).toBe(5)
  })

  it('defaults position to 0 when position is omitted', () => {
    const task = createTask({ title: 'No position' })
    expect(task.position).toBe(0)
  })

  it('persists the created task to disk', () => {
    const task = createTask({ title: 'Persisted' })
    const raw = readRawFile()
    expect(raw).toMatchObject({ tasks: [{ id: task.id, title: 'Persisted' }] })
  })
})

describe('listTasks', () => {
  it('excludes done tasks by default', () => {
    createTask({ title: 'A', column: 'todo' })
    createTask({ title: 'B', column: 'done' })
    const tasks = listTasks()
    expect(tasks.map((t) => t.title)).toEqual(['A'])
  })

  it('includes done tasks when includeDone is true', () => {
    createTask({ title: 'A', column: 'todo' })
    createTask({ title: 'B', column: 'done' })
    const tasks = listTasks({ includeDone: true })
    expect(tasks.map((t) => t.title).sort()).toEqual(['A', 'B'])
  })

  it('filters by column', () => {
    createTask({ title: 'A', column: 'todo' })
    createTask({ title: 'B', column: 'in_progress' })
    const tasks = listTasks({ column: 'in_progress' })
    expect(tasks.map((t) => t.title)).toEqual(['B'])
  })

  it('filters by assignee', () => {
    createTask({ title: 'A', assignee: 'dave' })
    createTask({ title: 'B', assignee: 'sam' })
    const tasks = listTasks({ assignee: 'sam' })
    expect(tasks.map((t) => t.title)).toEqual(['B'])
  })

  it('filters by priority', () => {
    createTask({ title: 'A', priority: 'low' })
    createTask({ title: 'B', priority: 'high' })
    const tasks = listTasks({ priority: 'high' })
    expect(tasks.map((t) => t.title)).toEqual(['B'])
  })

  it('combines multiple filters', () => {
    createTask({
      title: 'match',
      column: 'todo',
      assignee: 'dave',
      priority: 'high',
    })
    createTask({
      title: 'wrong-col',
      column: 'review',
      assignee: 'dave',
      priority: 'high',
    })
    createTask({
      title: 'wrong-assignee',
      column: 'todo',
      assignee: 'sam',
      priority: 'high',
    })
    const tasks = listTasks({
      column: 'todo',
      assignee: 'dave',
      priority: 'high',
    })
    expect(tasks.map((t) => t.title)).toEqual(['match'])
  })

  it('treats null/empty filter values as no filter', () => {
    createTask({ title: 'A', column: 'todo' })
    createTask({ title: 'B', column: 'review' })
    const tasks = listTasks({ column: null, assignee: null, priority: null })
    expect(tasks.map((t) => t.title).sort()).toEqual(['A', 'B'])
  })

  it('sorts by position then created_at', () => {
    const second = createTask({ title: 'second', position: 1 })
    const first = createTask({ title: 'first', position: 0 })
    const tasks = listTasks()
    expect(tasks.map((t) => t.id)).toEqual([first.id, second.id])
  })

  it('breaks position ties by created_at ascending', () => {
    writeRawFile(
      JSON.stringify({
        tasks: [
          buildStored({
            id: 'late',
            position: 0,
            created_at: '2026-01-02T00:00:00.000Z',
          }),
          buildStored({
            id: 'early',
            position: 0,
            created_at: '2026-01-01T00:00:00.000Z',
          }),
        ],
      }),
    )
    const tasks = listTasks({ includeDone: true })
    expect(tasks.map((t) => t.id)).toEqual(['early', 'late'])
  })
})

describe('getTask', () => {
  it('returns a normalized task by id', () => {
    const created = createTask({ title: 'Find me' })
    const found = getTask(created.id)
    expect(found?.id).toBe(created.id)
    expect(found?.title).toBe('Find me')
  })

  it('returns null for an unknown id', () => {
    createTask({ title: 'Other' })
    expect(getTask('nope')).toBeNull()
  })
})

describe('updateTask', () => {
  it('updates fields and bumps updated_at', async () => {
    const created = createTask({ title: 'Original', id: 'u1' })
    await delay(2)
    const updated = updateTask('u1', { title: 'Renamed', priority: 'high' })
    expect(updated?.title).toBe('Renamed')
    expect(updated?.priority).toBe('high')
    expect(updated?.updated_at).not.toBe(created.updated_at)
  })

  it('preserves immutable fields (id, created_at, created_by) across updates', async () => {
    const created = createTask({ title: 'X', id: 'u2', created_by: 'agent' })
    await delay(2)
    const updated = updateTask('u2', { title: 'Y', column: 'review' })
    expect(updated?.id).toBe('u2')
    expect(updated?.created_by).toBe('agent')
    expect(updated?.created_at).toBe(created.created_at)
  })

  it('keeps the current title when an update omits a string title', () => {
    createTask({ title: 'Keep', id: 'u3' })
    const updated = updateTask('u3', { priority: 'low' })
    expect(updated?.title).toBe('Keep')
  })

  it('returns null for an unknown id', () => {
    expect(updateTask('missing', { title: 'X' })).toBeNull()
  })

  it('persists the update to disk', () => {
    createTask({ title: 'Old', id: 'u4' })
    updateTask('u4', { description: 'new desc' })
    const found = getTask('u4')
    expect(found?.description).toBe('new desc')
  })
})

describe('moveTask', () => {
  it('moves a task to a new column', () => {
    createTask({ title: 'X', id: 'm1', column: 'todo' })
    const moved = moveTask('m1', 'done')
    expect(moved?.column).toBe('done')
    expect(getTask('m1')?.column).toBe('done')
  })

  it('returns null for an unknown id', () => {
    expect(moveTask('missing', 'done')).toBeNull()
  })
})

describe('deleteTask', () => {
  it('removes a task and returns true', () => {
    createTask({ title: 'X', id: 'd1' })
    expect(deleteTask('d1')).toBe(true)
    expect(getTask('d1')).toBeNull()
  })

  it('returns false when the id does not exist', () => {
    createTask({ title: 'X', id: 'd2' })
    expect(deleteTask('missing')).toBe(false)
    expect(getTask('d2')).not.toBeNull()
  })

  it('persists the deletion', () => {
    createTask({ title: 'A', id: 'd3' })
    createTask({ title: 'B', id: 'd4' })
    deleteTask('d3')
    const raw = readRawFile()
    expect(raw).toMatchObject({ tasks: [{ id: 'd4' }] })
  })
})

describe('linkTaskSession', () => {
  it('links a session id', () => {
    createTask({ title: 'X', id: 'l1' })
    const linked = linkTaskSession('l1', 'sess-42')
    expect(linked?.session_id).toBe('sess-42')
    expect(getTask('l1')?.session_id).toBe('sess-42')
  })

  it('unlinks when passed null', () => {
    createTask({ title: 'X', id: 'l2', session_id: 'sess-1' })
    const linked = linkTaskSession('l2', null)
    expect(linked?.session_id).toBeNull()
  })

  it('returns null for an unknown id', () => {
    expect(linkTaskSession('missing', 'sess')).toBeNull()
  })
})

describe('readTaskFile error/empty/malformed branches', () => {
  it('returns an empty list for an empty file', () => {
    writeRawFile('')
    expect(listTasks({ includeDone: true })).toEqual([])
  })

  it('returns an empty list for whitespace-only content', () => {
    writeRawFile('   \n  ')
    expect(listTasks({ includeDone: true })).toEqual([])
  })

  it('returns an empty list for malformed JSON', () => {
    writeRawFile('{not valid json')
    expect(listTasks({ includeDone: true })).toEqual([])
  })

  it('returns an empty list when tasks is not an array', () => {
    writeRawFile(JSON.stringify({ tasks: 'oops' }))
    expect(listTasks({ includeDone: true })).toEqual([])
  })

  it('returns an empty list when the JSON root has no tasks key', () => {
    writeRawFile(JSON.stringify({ other: true }))
    expect(listTasks({ includeDone: true })).toEqual([])
  })

  it('normalizes partial/legacy records on read', () => {
    // A stored record missing optional fields and with non-string tags must be
    // normalized: defaults applied and bad tags filtered out.
    writeRawFile(
      JSON.stringify({
        tasks: [
          {
            id: 'legacy',
            title: 'Legacy',
            created_at: '2026-01-01T00:00:00.000Z',
            updated_at: '2026-01-01T00:00:00.000Z',
            created_by: 'user',
            tags: ['keep', 42, null, 'also'],
          },
        ],
      }),
    )
    const task = getTask('legacy')
    expect(task?.column).toBe('backlog')
    expect(task?.priority).toBe('medium')
    expect(task?.assignee).toBeNull()
    expect(task?.tags).toEqual(['keep', 'also'])
    expect(task?.position).toBe(0)
    expect(task?.session_id).toBeNull()
  })
})

// ─── helpers ──────────────────────────────────────────────────────────

function buildStored(
  overrides: Partial<TaskRecord> &
    Pick<TaskRecord, 'id' | 'position' | 'created_at'>,
): TaskRecord {
  return {
    id: overrides.id,
    title: overrides.title ?? 'stored',
    description: overrides.description ?? '',
    column: overrides.column ?? 'backlog',
    priority: overrides.priority ?? 'medium',
    assignee: overrides.assignee ?? null,
    tags: overrides.tags ?? [],
    due_date: overrides.due_date ?? null,
    position: overrides.position,
    created_by: overrides.created_by ?? 'user',
    created_at: overrides.created_at,
    updated_at: overrides.updated_at ?? overrides.created_at,
    session_id: overrides.session_id ?? null,
  }
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
