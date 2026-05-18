import { existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { randomUUID } from 'node:crypto'
import type {
  MultiAgentApproval,
  MultiAgentApprovalActionType,
  MultiAgentApprovalStatus,
  MultiAgentArtifact,
  MultiAgentPriority,
  MultiAgentRiskLevel,
  MultiAgentRun,
  MultiAgentRunStatus,
  MultiAgentState,
  MultiAgentValidation,
  MultiAgentTask,
  MultiAgentTaskStatus,
} from './types'

export const DEFAULT_MULTI_AGENT_STATE_FILE = join(
  process.cwd(),
  '.runtime',
  'multi-agent',
  'state.json',
)

type Clock = () => string

type StoreOptions = {
  stateFile?: string
  now?: Clock
  id?: () => string
}

export type MultiAgentStore = {
  stateFile: string
  now: Clock
  id: () => string
}

export type StartTaskWorktreePatch = Required<
  Pick<MultiAgentTask, 'branchName' | 'worktreePath'>
> & {
  status?: MultiAgentTaskStatus
}

type LoadStateOptions = {
  now?: Clock
}

type CreateTaskInput = {
  projectId: string
  title: string
  description: string
  assigneeProfileId: string
  priority?: MultiAgentPriority
  parentIds?: string[]
  childIds?: string[]
  workPacket?: string
  acceptanceCriteria?: string[]
  status?: MultiAgentTaskStatus
}

type CreateRunInput = {
  taskId: string
  profileId: string
  status?: MultiAgentRunStatus
  pid?: number | null
  sessionId?: string | null
}

type CreateApprovalInput = {
  taskId: string
  runId?: string | null
  riskLevel: MultiAgentRiskLevel
  actionType: MultiAgentApprovalActionType
  title: string
  description: string
  payload: unknown
}

type CreateArtifactInput = Omit<MultiAgentArtifact, 'id' | 'createdAt'>

type TaskFilter = {
  projectId?: string
  status?: MultiAgentTaskStatus
}

type ApprovalFilter = {
  taskId?: string
  status?: MultiAgentApprovalStatus
}

function defaultNow(): string {
  return new Date().toISOString()
}

function defaultId(): string {
  return randomUUID()
}

function safeTimestamp(value: string): string {
  return value.replace(/[^0-9A-Za-z-]/g, '-')
}

function ensureParentDir(path: string): void {
  mkdirSync(dirname(path), { recursive: true })
}

export function emptyMultiAgentState(now = defaultNow()): MultiAgentState {
  return {
    projects: {},
    profiles: {},
    tasks: {},
    runs: {},
    approvals: {},
    validations: {},
    artifacts: {},
    schemaVersion: 1,
    updatedAt: now,
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value && typeof value === 'object' && !Array.isArray(value))
}

function normalizeState(value: unknown, now: string): MultiAgentState {
  if (!isRecord(value) || value.schemaVersion !== 1) return emptyMultiAgentState(now)

  return {
    projects: isRecord(value.projects) ? (value.projects as MultiAgentState['projects']) : {},
    profiles: isRecord(value.profiles) ? (value.profiles as MultiAgentState['profiles']) : {},
    tasks: isRecord(value.tasks) ? (value.tasks as MultiAgentState['tasks']) : {},
    runs: isRecord(value.runs) ? (value.runs as MultiAgentState['runs']) : {},
    approvals: isRecord(value.approvals) ? (value.approvals as MultiAgentState['approvals']) : {},
    validations: isRecord(value.validations)
      ? (value.validations as MultiAgentState['validations'])
      : {},
    artifacts: isRecord(value.artifacts) ? (value.artifacts as MultiAgentState['artifacts']) : {},
    schemaVersion: 1,
    updatedAt: typeof value.updatedAt === 'string' ? value.updatedAt : now,
  }
}

export function loadState(
  stateFile = DEFAULT_MULTI_AGENT_STATE_FILE,
  options: LoadStateOptions = {},
): MultiAgentState {
  const now = options.now?.() ?? defaultNow()
  if (!existsSync(stateFile)) return emptyMultiAgentState(now)

  try {
    const raw = readFileSync(stateFile, 'utf-8')
    return normalizeState(JSON.parse(raw), now)
  } catch {
    const corruptPath = `${stateFile}.corrupt-${safeTimestamp(now)}.json`
    try {
      writeFileSync(corruptPath, readFileSync(stateFile, 'utf-8'))
    } catch {
      // Best-effort preservation only. Return a usable empty state even if backup fails.
    }
    return emptyMultiAgentState(now)
  }
}

export function saveState(
  stateFile: string = DEFAULT_MULTI_AGENT_STATE_FILE,
  state: MultiAgentState,
): void {
  ensureParentDir(stateFile)
  const tempFile = `${stateFile}.tmp-${process.pid}-${Date.now()}`
  writeFileSync(tempFile, JSON.stringify(state, null, 2))
  renameSync(tempFile, stateFile)
}

export function createMultiAgentStore(options: StoreOptions = {}): MultiAgentStore {
  return {
    stateFile: options.stateFile ?? DEFAULT_MULTI_AGENT_STATE_FILE,
    now: options.now ?? defaultNow,
    id: options.id ?? defaultId,
  }
}

function mutateState<T>(store: MultiAgentStore, mutator: (state: MultiAgentState, now: string) => T): T {
  const now = store.now()
  const state = loadState(store.stateFile, { now: store.now })
  const result = mutator(state, now)
  state.updatedAt = now
  saveState(store.stateFile, state)
  return result
}

export function createTask(store: MultiAgentStore, input: CreateTaskInput): MultiAgentTask {
  return mutateState(store, (state, now) => {
    const task: MultiAgentTask = {
      id: `task-${store.id()}`,
      projectId: input.projectId,
      title: input.title,
      description: input.description,
      status: input.status ?? 'backlog',
      priority: input.priority ?? 'medium',
      assigneeProfileId: input.assigneeProfileId,
      parentIds: input.parentIds ?? [],
      childIds: input.childIds ?? [],
      workPacket: input.workPacket ?? '',
      acceptanceCriteria: input.acceptanceCriteria ?? [],
      createdAt: now,
      updatedAt: now,
    }
    state.tasks[task.id] = task
    return task
  })
}

export function updateTask(
  store: MultiAgentStore,
  taskId: string,
  patch: Partial<Omit<MultiAgentTask, 'id' | 'createdAt' | 'updatedAt'>>,
): MultiAgentTask {
  return mutateState(store, (state, now) => {
    const existing = state.tasks[taskId]
    if (!existing) throw new Error(`Task not found: ${taskId}`)
    const updated: MultiAgentTask = { ...existing, ...patch, updatedAt: now }
    state.tasks[taskId] = updated
    return updated
  })
}

export function getTask(store: MultiAgentStore, taskId: string): MultiAgentTask | null {
  const state = loadState(store.stateFile, { now: store.now })
  return state.tasks[taskId] ?? null
}

export function listTasks(store: MultiAgentStore, filter: TaskFilter = {}): MultiAgentTask[] {
  const state = loadState(store.stateFile, { now: store.now })
  return Object.values(state.tasks)
    .filter((task) => !filter.projectId || task.projectId === filter.projectId)
    .filter((task) => !filter.status || task.status === filter.status)
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
}

export function markTaskWorktreeReady(
  store: MultiAgentStore,
  taskId: string,
  patch: StartTaskWorktreePatch,
): MultiAgentTask {
  return updateTask(store, taskId, {
    branchName: patch.branchName,
    worktreePath: patch.worktreePath,
    status: patch.status ?? 'ready',
  })
}

export function createRun(store: MultiAgentStore, input: CreateRunInput): MultiAgentRun {
  return mutateState(store, (state, now) => {
    const run: MultiAgentRun = {
      id: `run-${store.id()}`,
      taskId: input.taskId,
      profileId: input.profileId,
      status: input.status ?? 'queued',
      pid: input.pid,
      sessionId: input.sessionId,
      startedAt: null,
      finishedAt: null,
    }
    state.runs[run.id] = run
    const task = state.tasks[run.taskId]
    if (task) {
      state.tasks[run.taskId] = { ...task, latestRunId: run.id, updatedAt: now }
    }
    return run
  })
}

export function updateRun(
  store: MultiAgentStore,
  runId: string,
  patch: Partial<Omit<MultiAgentRun, 'id'>>,
): MultiAgentRun {
  return mutateState(store, (state) => {
    const existing = state.runs[runId]
    if (!existing) throw new Error(`Run not found: ${runId}`)
    const updated: MultiAgentRun = { ...existing, ...patch }
    state.runs[runId] = updated
    return updated
  })
}

export function createApproval(
  store: MultiAgentStore,
  input: CreateApprovalInput,
): MultiAgentApproval {
  return mutateState(store, (state, now) => {
    const approval: MultiAgentApproval = {
      id: `approval-${store.id()}`,
      taskId: input.taskId,
      runId: input.runId,
      riskLevel: input.riskLevel,
      actionType: input.actionType,
      title: input.title,
      description: input.description,
      payload: input.payload,
      status: 'pending',
      createdAt: now,
    }
    state.approvals[approval.id] = approval
    return approval
  })
}

export function resolveApproval(
  store: MultiAgentStore,
  approvalId: string,
  decision: Extract<MultiAgentApprovalStatus, 'approved' | 'denied'>,
): MultiAgentApproval {
  return mutateState(store, (state, now) => {
    const existing = state.approvals[approvalId]
    if (!existing) throw new Error(`Approval not found: ${approvalId}`)
    const resolved: MultiAgentApproval = { ...existing, status: decision, resolvedAt: now }
    state.approvals[approvalId] = resolved
    return resolved
  })
}

export function listApprovals(store: MultiAgentStore, filter: ApprovalFilter = {}): MultiAgentApproval[] {
  const state = loadState(store.stateFile, { now: store.now })
  return Object.values(state.approvals)
    .filter((approval) => !filter.taskId || approval.taskId === filter.taskId)
    .filter((approval) => !filter.status || approval.status === filter.status)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
}

export function saveValidation(store: MultiAgentStore, validation: MultiAgentValidation): MultiAgentValidation {
  return mutateState(store, (state) => {
    state.validations[validation.id] = validation
    return validation
  })
}

export function listTaskValidations(store: MultiAgentStore, taskId: string): MultiAgentValidation[] {
  const state = loadState(store.stateFile, { now: store.now })
  return Object.values(state.validations)
    .filter((validation) => validation.taskId === taskId)
    .sort((a, b) => (b.finishedAt ?? '').localeCompare(a.finishedAt ?? ''))
}

export function createArtifact(store: MultiAgentStore, input: CreateArtifactInput): MultiAgentArtifact {
  return mutateState(store, (state, now) => {
    const artifact: MultiAgentArtifact = {
      id: `artifact-${store.id()}`,
      ...input,
      createdAt: now,
    }
    state.artifacts[artifact.id] = artifact
    return artifact
  })
}
