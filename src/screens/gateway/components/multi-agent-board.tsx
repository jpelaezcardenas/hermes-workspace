import { useMemo, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  Add01Icon,
  ArrowRight01Icon,
  GitBranchIcon,
  PlayIcon,
  RefreshIcon,
} from '@hugeicons/core-free-icons'
import { cn } from '@/lib/utils'
import type { TaskDiffResult } from '../../../server/multi-agent/diff-manager'
import type {
  MultiAgentMission,
  MultiAgentPriority,
  MultiAgentProfile,
  MultiAgentProject,
  MultiAgentTask,
  MultiAgentRun,
  MultiAgentEvent,
  MultiAgentValidation,
  MultiAgentApproval,
  MultiAgentApprovalStatus,
  MultiAgentArtifact,
  MultiAgentValidationType,
} from '../../../server/multi-agent/types'
import {
  buildMultiAgentBoardColumns,
  buildMultiAgentTaskMeta,
  parseAcceptanceCriteriaDraft,
} from './multi-agent-board-model'
import { MultiAgentApprovalsPanel } from './multi-agent-approvals-panel'
import { MultiAgentPrPanel } from './multi-agent-pr-panel'
import { MultiAgentTaskDetail } from './multi-agent-task-detail'

type ProjectsResponse = { ok?: boolean; projects?: MultiAgentProject[]; error?: string }
type ProfilesResponse = { ok?: boolean; profiles?: MultiAgentProfile[]; error?: string }
type MissionsResponse = { ok?: boolean; missions?: MultiAgentMission[]; error?: string }
type MissionResponse = { ok?: boolean; mission?: MultiAgentMission; error?: string }
type TasksResponse = { ok?: boolean; tasks?: MultiAgentTask[]; error?: string }
type TaskResponse = { ok?: boolean; task?: MultiAgentTask; error?: string }
type TaskEventsResponse = { ok?: boolean; events?: MultiAgentEvent[]; error?: string }
type TaskDiffResponse = { ok?: boolean; diff?: TaskDiffResult; error?: string }
type TaskValidationsResponse = { ok?: boolean; validations?: MultiAgentValidation[]; error?: string }
type TaskValidationResponse = { ok?: boolean; validation?: MultiAgentValidation; error?: string }
type ApprovalsResponse = { ok?: boolean; approvals?: MultiAgentApproval[]; error?: string }
type ApprovalResponse = { ok?: boolean; approval?: MultiAgentApproval; error?: string }
type TaskPrResponse = { ok?: boolean; pr?: { url: string; artifactId: string }; approval?: MultiAgentApproval; artifact?: MultiAgentArtifact; error?: string }
type SaveSummaryResponse = { ok?: boolean; task?: MultiAgentTask; run?: MultiAgentRun; obsidian?: { path: string }; error?: string }

type CreateMissionDraft = {
  projectId: string
  title: string
  productGoal: string
  userStory: string
  successMetrics: string
  nonGoals: string
  constraints: string
  desiredOutput: string
}

type CreateTaskDraft = {
  projectId: string
  missionId: string
  title: string
  description: string
  assigneeProfileId: string
  priority: MultiAgentPriority
  workPacket: string
  productGoal: string
  userStory: string
  successMetrics: string
  nonGoals: string
  acceptanceCriteria: string
}

const emptyMissionDraft: CreateMissionDraft = {
  projectId: '',
  title: '',
  productGoal: '',
  userStory: '',
  successMetrics: '',
  nonGoals: '',
  constraints: '',
  desiredOutput: '',
}

const emptyDraft: CreateTaskDraft = {
  projectId: '',
  missionId: '',
  title: '',
  description: '',
  assigneeProfileId: 'backend-engineer',
  priority: 'medium',
  workPacket: '',
  productGoal: '',
  userStory: '',
  successMetrics: '',
  nonGoals: '',
  acceptanceCriteria: '',
}

async function readJson<T>(response: Response): Promise<T> {
  const data = (await response.json().catch(() => ({}))) as T & { error?: string }
  if (!response.ok) {
    throw new Error(data.error || `Request failed: ${response.status}`)
  }
  return data
}

async function fetchMultiAgentProjects(): Promise<MultiAgentProject[]> {
  const data = await readJson<ProjectsResponse>(await fetch('/api/ma/projects', { cache: 'no-store' }))
  return data.projects ?? []
}

async function fetchMultiAgentProfiles(): Promise<MultiAgentProfile[]> {
  const data = await readJson<ProfilesResponse>(await fetch('/api/ma/profiles', { cache: 'no-store' }))
  return data.profiles ?? []
}

async function fetchMultiAgentMissions(): Promise<MultiAgentMission[]> {
  const data = await readJson<MissionsResponse>(await fetch('/api/ma/missions', { cache: 'no-store' }))
  return data.missions ?? []
}

async function createMultiAgentMission(draft: CreateMissionDraft): Promise<MultiAgentMission> {
  const data = await readJson<MissionResponse>(
    await fetch('/api/ma/missions', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        projectId: draft.projectId,
        title: draft.title,
        productBrief: {
          goal: draft.productGoal.trim(),
          userStory: draft.userStory.trim(),
          successMetrics: parseAcceptanceCriteriaDraft(draft.successMetrics),
          nonGoals: parseAcceptanceCriteriaDraft(draft.nonGoals),
        },
        constraints: parseAcceptanceCriteriaDraft(draft.constraints),
        desiredOutput: draft.desiredOutput,
      }),
    }),
  )
  if (!data.mission) throw new Error('Mission was not returned')
  return data.mission
}

async function fetchMultiAgentTasks(): Promise<MultiAgentTask[]> {
  const data = await readJson<TasksResponse>(await fetch('/api/ma/tasks', { cache: 'no-store' }))
  return data.tasks ?? []
}

async function createMultiAgentTask(draft: CreateTaskDraft): Promise<MultiAgentTask> {
  const data = await readJson<TaskResponse>(
    await fetch('/api/ma/tasks', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        projectId: draft.projectId,
        missionId: draft.missionId || undefined,
        title: draft.title,
        description: draft.description,
        assigneeProfileId: draft.assigneeProfileId,
        priority: draft.priority,
        workPacket: draft.workPacket,
        productBrief: {
          goal: draft.productGoal.trim(),
          userStory: draft.userStory.trim(),
          successMetrics: parseAcceptanceCriteriaDraft(draft.successMetrics),
          nonGoals: parseAcceptanceCriteriaDraft(draft.nonGoals),
        },
        acceptanceCriteria: parseAcceptanceCriteriaDraft(draft.acceptanceCriteria),
      }),
    }),
  )
  if (!data.task) throw new Error('Task was not returned')
  return data.task
}

async function startMultiAgentTask(taskId: string): Promise<MultiAgentTask> {
  const data = await readJson<TaskResponse>(
    await fetch(`/api/ma/tasks/${encodeURIComponent(taskId)}/start`, { method: 'POST' }),
  )
  if (!data.task) throw new Error('Updated task was not returned')
  return data.task
}

async function fetchMultiAgentTaskEvents(taskId: string): Promise<MultiAgentEvent[]> {
  const data = await readJson<TaskEventsResponse>(
    await fetch(`/api/ma/tasks/${encodeURIComponent(taskId)}/events`, { cache: 'no-store' }),
  )
  return data.events ?? []
}

async function fetchMultiAgentTaskDiff(taskId: string): Promise<TaskDiffResult> {
  const data = await readJson<TaskDiffResponse>(
    await fetch(`/api/ma/tasks/${encodeURIComponent(taskId)}/diff`, { cache: 'no-store' }),
  )
  if (!data.diff) throw new Error('Task diff was not returned')
  return data.diff
}

async function fetchMultiAgentTaskValidations(taskId: string): Promise<MultiAgentValidation[]> {
  const data = await readJson<TaskValidationsResponse>(
    await fetch(`/api/ma/tasks/${encodeURIComponent(taskId)}/validate`, { cache: 'no-store' }),
  )
  return data.validations ?? []
}

async function runMultiAgentTaskValidation(input: { taskId: string; type: MultiAgentValidationType }): Promise<MultiAgentValidation> {
  const data = await readJson<TaskValidationResponse>(
    await fetch(`/api/ma/tasks/${encodeURIComponent(input.taskId)}/validate`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ type: input.type }),
    }),
  )
  if (!data.validation) throw new Error('Task validation was not returned')
  return data.validation
}

async function fetchMultiAgentApprovals(): Promise<MultiAgentApproval[]> {
  const data = await readJson<ApprovalsResponse>(await fetch('/api/ma/approvals', { cache: 'no-store' }))
  return data.approvals ?? []
}

async function resolveMultiAgentApproval(input: {
  approvalId: string
  decision: Extract<MultiAgentApprovalStatus, 'approved' | 'denied'>
}): Promise<MultiAgentApproval> {
  const data = await readJson<ApprovalResponse>(
    await fetch(`/api/ma/approvals/${encodeURIComponent(input.approvalId)}/resolve`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ decision: input.decision }),
    }),
  )
  if (!data.approval) throw new Error('Approval was not returned')
  return data.approval
}

async function createMultiAgentTaskPr(input: { taskId: string; title: string; body: string }): Promise<TaskPrResponse> {
  return readJson<TaskPrResponse>(
    await fetch(`/api/ma/tasks/${encodeURIComponent(input.taskId)}/pr`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ title: input.title, body: input.body }),
    }),
  )
}

async function saveMultiAgentTaskSummary(input: { taskId: string; summary: string; saveToObsidian: boolean }): Promise<SaveSummaryResponse> {
  return readJson<SaveSummaryResponse>(
    await fetch(`/api/ma/tasks/${encodeURIComponent(input.taskId)}/save-summary`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ summary: input.summary, saveToObsidian: input.saveToObsidian }),
    }),
  )
}

function priorityClass(priority: MultiAgentPriority): string {
  if (priority === 'urgent') return 'border-red-400/40 bg-red-500/10 text-red-300'
  if (priority === 'high') return 'border-amber-400/40 bg-amber-500/10 text-amber-300'
  if (priority === 'low') return 'border-slate-400/30 bg-slate-500/10 text-slate-300'
  return 'border-sky-400/35 bg-sky-500/10 text-sky-300'
}

function loadedSkillsFromEvents(events: MultiAgentEvent[]): string[] {
  const started = [...events].reverse().find((event) => event.type === 'run.started')
  const payload = started?.payload
  if (!payload || typeof payload !== 'object' || !('loadedSkills' in payload)) return []
  const loadedSkills = (payload as { loadedSkills?: unknown }).loadedSkills
  return Array.isArray(loadedSkills) ? loadedSkills.filter((skill): skill is string => typeof skill === 'string') : []
}

export function MultiAgentMissionPanel({
  missions,
  projects,
  selectedMissionId,
  loading,
  error,
  onSelect,
  onCreateMission,
}: {
  missions: MultiAgentMission[]
  projects: MultiAgentProject[]
  selectedMissionId: string | null
  loading: boolean
  error: string | null
  onSelect: (missionId: string | null) => void
  onCreateMission: () => void
}) {
  return (
    <aside className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-bg)] p-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--theme-muted)]">Mission Control</p>
          <h3 className="mt-1 text-sm font-semibold text-[var(--theme-text)]">Missions</h3>
        </div>
        <button
          type="button"
          onClick={onCreateMission}
          className="inline-flex items-center gap-1 rounded-xl bg-[var(--theme-accent)] px-2.5 py-1.5 text-[11px] font-semibold text-white hover:bg-[var(--theme-accent-strong)]"
        >
          <HugeiconsIcon icon={Add01Icon} size={12} strokeWidth={1.8} /> Create Mission
        </button>
      </div>
      {error ? <p className="mt-3 rounded-xl border border-red-400/35 bg-red-500/10 px-3 py-2 text-xs text-red-300">{error}</p> : null}
      {loading ? <p className="mt-3 text-xs text-[var(--theme-muted)]">Loading missions…</p> : null}
      <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
        <button
          type="button"
          onClick={() => onSelect(null)}
          className={cn(
            'min-w-[150px] rounded-xl border px-3 py-2 text-left text-xs transition-colors',
            selectedMissionId === null ? 'border-[var(--theme-accent)] bg-[var(--theme-accent-soft)] text-[var(--theme-text)]' : 'border-[var(--theme-border)] bg-[var(--theme-card)] text-[var(--theme-muted-2)]',
          )}
        >
          <span className="block font-semibold">All tasks</span>
          <span className="mt-1 block text-[10px] text-[var(--theme-muted)]">Show every mission/task</span>
        </button>
        {missions.length ? missions.map((mission) => {
          const projectName = projects.find((project) => project.id === mission.projectId)?.name ?? mission.projectId
          return (
            <button
              key={mission.id}
              type="button"
              onClick={() => onSelect(mission.id)}
              className={cn(
                'min-w-[240px] rounded-xl border px-3 py-2 text-left text-xs transition-colors hover:border-[var(--theme-accent)]',
                selectedMissionId === mission.id ? 'border-[var(--theme-accent)] bg-[var(--theme-accent-soft)]' : 'border-[var(--theme-border)] bg-[var(--theme-card)]',
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <span className="line-clamp-1 font-semibold text-[var(--theme-text)]">{mission.title}</span>
                <span className="shrink-0 rounded-full border border-[var(--theme-border)] px-1.5 py-0.5 text-[9px] uppercase tracking-[0.12em] text-[var(--theme-muted)]">{mission.status}</span>
              </div>
              <p className="mt-1 line-clamp-2 text-[11px] text-[var(--theme-muted-2)]">{mission.productBrief.goal}</p>
              <div className="mt-2 flex flex-wrap gap-1.5 text-[10px] text-[var(--theme-muted)]">
                <span className="rounded-full border border-[var(--theme-border)] px-2 py-0.5">{projectName}</span>
                <span className="rounded-full border border-[var(--theme-border)] px-2 py-0.5">{mission.taskIds.length} tasks</span>
              </div>
            </button>
          )
        }) : (
          <div className="min-w-[240px] rounded-xl border border-dashed border-[var(--theme-border)] px-3 py-4 text-xs text-[var(--theme-muted)]">No missions yet. Create one to group autonomous work.</div>
        )}
      </div>
    </aside>
  )
}

export function MultiAgentCreateMissionDialog({
  projects,
  creating,
  error,
  onCancel,
  onCreate,
}: {
  projects: MultiAgentProject[]
  creating: boolean
  error: string | null
  onCancel: () => void
  onCreate: (draft: CreateMissionDraft) => void
}) {
  const [draft, setDraft] = useState<CreateMissionDraft>(() => ({
    ...emptyMissionDraft,
    projectId: projects[0]?.id ?? '',
  }))
  const canSubmit = draft.projectId && draft.title.trim() && draft.productGoal.trim()

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-[color-mix(in_srgb,var(--theme-bg)_48%,transparent)] px-4 py-6 backdrop-blur-md sm:items-center" onClick={onCancel}>
      <form
        className="my-auto max-h-[calc(100dvh-3rem)] w-full max-w-2xl overflow-y-auto rounded-3xl border border-[var(--theme-border2)] bg-[var(--theme-card)] p-5 shadow-[0_24px_80px_var(--theme-shadow)]"
        onClick={(event) => event.stopPropagation()}
        onSubmit={(event) => {
          event.preventDefault()
          if (canSubmit) onCreate(draft)
        }}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--theme-muted)]">Mission Control</p>
            <h3 className="mt-1 text-lg font-semibold text-[var(--theme-text)]">Create Mission</h3>
            <p className="mt-1 text-sm text-[var(--theme-muted-2)]">Define a product goal before splitting work across Hermes agents.</p>
          </div>
          <button type="button" onClick={onCancel} className="rounded-xl border border-[var(--theme-border)] px-3 py-1.5 text-sm text-[var(--theme-muted)]">×</button>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-medium text-[var(--theme-text)]">Project
            <select value={draft.projectId} onChange={(event) => setDraft({ ...draft, projectId: event.target.value })} className="mt-1 w-full rounded-xl border border-[var(--theme-border)] bg-[var(--theme-bg)] px-3 py-2 text-sm">
              {projects.map((project) => <option key={project.id} value={project.id}>{project.name}</option>)}
            </select>
          </label>
          <label className="text-sm font-medium text-[var(--theme-text)]">Mission Title
            <input value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} className="mt-1 w-full rounded-xl border border-[var(--theme-border)] bg-[var(--theme-bg)] px-3 py-2 text-sm" placeholder="Ship autonomous planning loop" />
          </label>
          <label className="sm:col-span-2 text-sm font-medium text-[var(--theme-text)]">Product Goal
            <input value={draft.productGoal} onChange={(event) => setDraft({ ...draft, productGoal: event.target.value })} className="mt-1 w-full rounded-xl border border-[var(--theme-border)] bg-[var(--theme-bg)] px-3 py-2 text-sm" placeholder="What outcome should this mission deliver?" />
          </label>
          <label className="sm:col-span-2 text-sm font-medium text-[var(--theme-text)]">User Story
            <input value={draft.userStory} onChange={(event) => setDraft({ ...draft, userStory: event.target.value })} className="mt-1 w-full rounded-xl border border-[var(--theme-border)] bg-[var(--theme-bg)] px-3 py-2 text-sm" placeholder="As an operator, I can..." />
          </label>
          <label className="text-sm font-medium text-[var(--theme-text)]">Success Metrics
            <textarea value={draft.successMetrics} onChange={(event) => setDraft({ ...draft, successMetrics: event.target.value })} rows={3} className="mt-1 w-full rounded-xl border border-[var(--theme-border)] bg-[var(--theme-bg)] px-3 py-2 text-sm" placeholder="One metric per line" />
          </label>
          <label className="text-sm font-medium text-[var(--theme-text)]">Non-goals
            <textarea value={draft.nonGoals} onChange={(event) => setDraft({ ...draft, nonGoals: event.target.value })} rows={3} className="mt-1 w-full rounded-xl border border-[var(--theme-border)] bg-[var(--theme-bg)] px-3 py-2 text-sm" placeholder="One non-goal per line" />
          </label>
          <label className="text-sm font-medium text-[var(--theme-text)]">Constraints
            <textarea value={draft.constraints} onChange={(event) => setDraft({ ...draft, constraints: event.target.value })} rows={3} className="mt-1 w-full rounded-xl border border-[var(--theme-border)] bg-[var(--theme-bg)] px-3 py-2 text-sm" placeholder="One constraint per line" />
          </label>
          <label className="text-sm font-medium text-[var(--theme-text)]">Desired Output
            <textarea value={draft.desiredOutput} onChange={(event) => setDraft({ ...draft, desiredOutput: event.target.value })} rows={3} className="mt-1 w-full rounded-xl border border-[var(--theme-border)] bg-[var(--theme-bg)] px-3 py-2 text-sm" placeholder="Definition of mission output" />
          </label>
        </div>
        {error ? <p className="mt-4 rounded-xl border border-red-400/35 bg-red-500/10 px-3 py-2 text-sm text-red-300">{error}</p> : null}
        <div className="mt-5 flex justify-end gap-2">
          <button type="button" onClick={onCancel} className="rounded-xl border border-[var(--theme-border)] px-4 py-2 text-sm font-medium text-[var(--theme-text)]">Cancel</button>
          <button type="submit" disabled={!canSubmit || creating} className="rounded-xl bg-[var(--theme-accent)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--theme-accent-strong)] disabled:opacity-40">
            {creating ? 'Creating…' : 'Create mission'}
          </button>
        </div>
      </form>
    </div>
  )
}

function MultiAgentTaskCard({
  task,
  projects,
  profiles,
  selected,
  starting,
  onSelect,
  onStart,
}: {
  task: MultiAgentTask
  projects: MultiAgentProject[]
  profiles: MultiAgentProfile[]
  selected: boolean
  starting: boolean
  onSelect: () => void
  onStart: () => void
}) {
  const meta = buildMultiAgentTaskMeta(task)
  return (
    <article
      className={cn(
        'group rounded-2xl border bg-[var(--theme-card)] p-3 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-[var(--theme-accent)] hover:shadow-md',
        selected ? 'border-[var(--theme-accent)] ring-2 ring-[var(--theme-accent-soft)]' : 'border-[var(--theme-border)]',
      )}
    >
      <button type="button" onClick={onSelect} className="block w-full text-left">
        <div className="flex items-start justify-between gap-2">
          <h4 className="line-clamp-2 text-sm font-semibold text-[var(--theme-text)]">{task.title}</h4>
          <span className={cn('shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em]', priorityClass(task.priority))}>
            {meta.priorityLabel}
          </span>
        </div>
        <p className="mt-2 line-clamp-2 text-xs text-[var(--theme-muted-2)]">{task.description || task.workPacket || 'No description yet.'}</p>
        <div className="mt-3 flex flex-wrap gap-1.5 text-[10px] text-[var(--theme-muted)]">
          <span className="rounded-full border border-[var(--theme-border)] bg-[var(--theme-bg)] px-2 py-0.5">{projects.find((project) => project.id === task.projectId)?.name ?? task.projectId}</span>
          <span className="rounded-full border border-[var(--theme-border)] bg-[var(--theme-bg)] px-2 py-0.5">{profiles.find((profile) => profile.id === task.assigneeProfileId)?.name ?? task.assigneeProfileId}</span>
        </div>
        <div className="mt-3 flex min-w-0 items-center gap-1.5 text-[11px] text-[var(--theme-muted-2)]">
          <HugeiconsIcon icon={GitBranchIcon} size={13} strokeWidth={1.7} />
          <span className="truncate">{meta.branchLabel}</span>
        </div>
      </button>
      <div className="mt-3 flex items-center justify-between gap-2 border-t border-[var(--theme-border)] pt-3">
        <span className="truncate text-[10px] text-[var(--theme-muted)]">{meta.worktreeLabel}</span>
        <button
          type="button"
          disabled={!meta.canStart || starting}
          onClick={onStart}
          className="inline-flex items-center gap-1 rounded-lg bg-[var(--theme-accent)] px-2.5 py-1.5 text-[11px] font-semibold text-white transition-colors hover:bg-[var(--theme-accent-strong)] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <HugeiconsIcon icon={PlayIcon} size={12} strokeWidth={1.8} />
          {starting ? 'Starting…' : 'Start'}
        </button>
      </div>
    </article>
  )
}

function MultiAgentCreateTaskDialog({
  projects,
  profiles,
  missions,
  selectedMission,
  creating,
  error,
  onCancel,
  onCreate,
}: {
  projects: MultiAgentProject[]
  profiles: MultiAgentProfile[]
  missions: MultiAgentMission[]
  selectedMission: MultiAgentMission | null
  creating: boolean
  error: string | null
  onCancel: () => void
  onCreate: (draft: CreateTaskDraft) => void
}) {
  const [draft, setDraft] = useState<CreateTaskDraft>(() => ({
    ...emptyDraft,
    projectId: selectedMission?.projectId ?? projects[0]?.id ?? '',
    missionId: selectedMission?.id ?? '',
    assigneeProfileId: profiles[0]?.id ?? 'backend-engineer',
  }))
  const canSubmit = draft.projectId && draft.assigneeProfileId && draft.title.trim()

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-[color-mix(in_srgb,var(--theme-bg)_48%,transparent)] px-4 py-6 backdrop-blur-md sm:items-center" onClick={onCancel}>
      <form
        className="my-auto max-h-[calc(100dvh-3rem)] w-full max-w-2xl overflow-y-auto rounded-3xl border border-[var(--theme-border2)] bg-[var(--theme-card)] p-5 shadow-[0_24px_80px_var(--theme-shadow)]"
        onClick={(event) => event.stopPropagation()}
        onSubmit={(event) => {
          event.preventDefault()
          if (canSubmit) onCreate(draft)
        }}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--theme-muted)]">Agent Board</p>
            <h3 className="mt-1 text-lg font-semibold text-[var(--theme-text)]">Create Task</h3>
            <p className="mt-1 text-sm text-[var(--theme-muted-2)]">Capture a work packet before creating an isolated worktree.</p>
          </div>
          <button type="button" onClick={onCancel} className="rounded-xl border border-[var(--theme-border)] px-3 py-1.5 text-sm text-[var(--theme-muted)]">×</button>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-medium text-[var(--theme-text)]">Project
            <select value={draft.projectId} onChange={(event) => setDraft({ ...draft, projectId: event.target.value })} className="mt-1 w-full rounded-xl border border-[var(--theme-border)] bg-[var(--theme-bg)] px-3 py-2 text-sm">
              {projects.map((project) => <option key={project.id} value={project.id}>{project.name}</option>)}
            </select>
          </label>
          <label className="text-sm font-medium text-[var(--theme-text)]">Mission
            <select
              value={draft.missionId}
              onChange={(event) => {
                const missionId = event.target.value
                const mission = missions.find((item) => item.id === missionId)
                setDraft({ ...draft, missionId, projectId: mission?.projectId ?? draft.projectId })
              }}
              className="mt-1 w-full rounded-xl border border-[var(--theme-border)] bg-[var(--theme-bg)] px-3 py-2 text-sm"
            >
              <option value="">No mission</option>
              {missions.map((mission) => <option key={mission.id} value={mission.id}>{mission.title}</option>)}
            </select>
          </label>
          <label className="text-sm font-medium text-[var(--theme-text)]">Profile
            <select value={draft.assigneeProfileId} onChange={(event) => setDraft({ ...draft, assigneeProfileId: event.target.value })} className="mt-1 w-full rounded-xl border border-[var(--theme-border)] bg-[var(--theme-bg)] px-3 py-2 text-sm">
              {profiles.map((profile) => <option key={profile.id} value={profile.id}>{profile.name}</option>)}
            </select>
          </label>
          <label className="sm:col-span-2 text-sm font-medium text-[var(--theme-text)]">Title
            <input value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} className="mt-1 w-full rounded-xl border border-[var(--theme-border)] bg-[var(--theme-bg)] px-3 py-2 text-sm" placeholder="Add validation runner UI" />
          </label>
          <label className="text-sm font-medium text-[var(--theme-text)]">Priority
            <select value={draft.priority} onChange={(event) => setDraft({ ...draft, priority: event.target.value as MultiAgentPriority })} className="mt-1 w-full rounded-xl border border-[var(--theme-border)] bg-[var(--theme-bg)] px-3 py-2 text-sm">
              <option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option><option value="urgent">Urgent</option>
            </select>
          </label>
          <label className="text-sm font-medium text-[var(--theme-text)]">Description
            <input value={draft.description} onChange={(event) => setDraft({ ...draft, description: event.target.value })} className="mt-1 w-full rounded-xl border border-[var(--theme-border)] bg-[var(--theme-bg)] px-3 py-2 text-sm" />
          </label>
          <label className="sm:col-span-2 text-sm font-medium text-[var(--theme-text)]">Product Goal
            <input value={draft.productGoal} onChange={(event) => setDraft({ ...draft, productGoal: event.target.value })} className="mt-1 w-full rounded-xl border border-[var(--theme-border)] bg-[var(--theme-bg)] px-3 py-2 text-sm" placeholder="What product outcome should this task unlock?" />
          </label>
          <label className="sm:col-span-2 text-sm font-medium text-[var(--theme-text)]">User Story
            <input value={draft.userStory} onChange={(event) => setDraft({ ...draft, userStory: event.target.value })} className="mt-1 w-full rounded-xl border border-[var(--theme-border)] bg-[var(--theme-bg)] px-3 py-2 text-sm" placeholder="As a user/operator, I can..." />
          </label>
          <label className="text-sm font-medium text-[var(--theme-text)]">Success Metrics
            <textarea value={draft.successMetrics} onChange={(event) => setDraft({ ...draft, successMetrics: event.target.value })} rows={3} className="mt-1 w-full rounded-xl border border-[var(--theme-border)] bg-[var(--theme-bg)] px-3 py-2 text-sm" placeholder="One success metric per line" />
          </label>
          <label className="text-sm font-medium text-[var(--theme-text)]">Non-goals
            <textarea value={draft.nonGoals} onChange={(event) => setDraft({ ...draft, nonGoals: event.target.value })} rows={3} className="mt-1 w-full rounded-xl border border-[var(--theme-border)] bg-[var(--theme-bg)] px-3 py-2 text-sm" placeholder="One explicit non-goal per line" />
          </label>
          <label className="sm:col-span-2 text-sm font-medium text-[var(--theme-text)]">Work Packet
            <textarea value={draft.workPacket} onChange={(event) => setDraft({ ...draft, workPacket: event.target.value })} rows={4} className="mt-1 w-full rounded-xl border border-[var(--theme-border)] bg-[var(--theme-bg)] px-3 py-2 text-sm" />
          </label>
          <label className="sm:col-span-2 text-sm font-medium text-[var(--theme-text)]">Acceptance Criteria
            <textarea value={draft.acceptanceCriteria} onChange={(event) => setDraft({ ...draft, acceptanceCriteria: event.target.value })} rows={3} className="mt-1 w-full rounded-xl border border-[var(--theme-border)] bg-[var(--theme-bg)] px-3 py-2 text-sm" placeholder="One criterion per line" />
          </label>
        </div>
        {error ? <p className="mt-4 rounded-xl border border-red-400/35 bg-red-500/10 px-3 py-2 text-sm text-red-300">{error}</p> : null}
        <div className="mt-5 flex justify-end gap-2">
          <button type="button" onClick={onCancel} className="rounded-xl border border-[var(--theme-border)] px-4 py-2 text-sm font-medium text-[var(--theme-text)]">Cancel</button>
          <button type="submit" disabled={!canSubmit || creating} className="rounded-xl bg-[var(--theme-accent)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--theme-accent-strong)] disabled:opacity-40">
            {creating ? 'Creating…' : 'Create task'}
          </button>
        </div>
      </form>
    </div>
  )
}

export function MultiAgentBoard() {
  const queryClient = useQueryClient()
  const [createOpen, setCreateOpen] = useState(false)
  const [createMissionOpen, setCreateMissionOpen] = useState(false)
  const [selectedMissionId, setSelectedMissionId] = useState<string | null>(null)
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null)
  const [startingTaskId, setStartingTaskId] = useState<string | null>(null)
  const [validationRunningType, setValidationRunningType] = useState<MultiAgentValidationType | null>(null)
  const [validationError, setValidationError] = useState<string | null>(null)
  const [resolvingApprovalId, setResolvingApprovalId] = useState<string | null>(null)
  const [approvalError, setApprovalError] = useState<string | null>(null)
  const [creatingPr, setCreatingPr] = useState(false)
  const [prError, setPrError] = useState<string | null>(null)
  const [prArtifactsByTaskId, setPrArtifactsByTaskId] = useState<Record<string, MultiAgentArtifact[]>>({})
  const [summarySaving, setSummarySaving] = useState(false)
  const [summarySaveError, setSummarySaveError] = useState<string | null>(null)
  const [summarySavedPathByTaskId, setSummarySavedPathByTaskId] = useState<Record<string, string>>({})
  const [runSummariesByTaskId, setRunSummariesByTaskId] = useState<Record<string, string>>({})
  const [mutationError, setMutationError] = useState<string | null>(null)

  const projectsQuery = useQuery({ queryKey: ['ma', 'projects'], queryFn: fetchMultiAgentProjects, staleTime: 30_000 })
  const profilesQuery = useQuery({ queryKey: ['ma', 'profiles'], queryFn: fetchMultiAgentProfiles, staleTime: 60_000 })
  const missionsQuery = useQuery({ queryKey: ['ma', 'missions'], queryFn: fetchMultiAgentMissions, staleTime: 5_000 })
  const tasksQuery = useQuery({ queryKey: ['ma', 'tasks'], queryFn: fetchMultiAgentTasks, staleTime: 5_000 })
  const approvalsQuery = useQuery({ queryKey: ['ma', 'approvals'], queryFn: fetchMultiAgentApprovals, staleTime: 2_000, refetchInterval: 5_000 })

  const projects = projectsQuery.data ?? []
  const profiles = profilesQuery.data ?? []
  const missions = missionsQuery.data ?? []
  const tasks = tasksQuery.data ?? []
  const visibleTasks = selectedMissionId ? tasks.filter((task) => task.missionId === selectedMissionId) : tasks
  const approvals = approvalsQuery.data ?? []
  const columns = useMemo(() => buildMultiAgentBoardColumns(visibleTasks), [visibleTasks])
  const selectedMission = selectedMissionId ? missions.find((mission) => mission.id === selectedMissionId) ?? null : null
  const selectedTask = visibleTasks.find((task) => task.id === selectedTaskId) ?? visibleTasks[0] ?? null
  const selectedTaskEventsQuery = useQuery({
    queryKey: ['ma', 'tasks', selectedTask?.id, 'events'],
    queryFn: () => fetchMultiAgentTaskEvents(selectedTask?.id ?? ''),
    enabled: Boolean(selectedTask?.id),
    refetchInterval: selectedTask?.status === 'running' ? 2_000 : false,
    staleTime: 1_000,
  })
  const selectedTaskDiffQuery = useQuery({
    queryKey: ['ma', 'tasks', selectedTask?.id, 'diff'],
    queryFn: () => fetchMultiAgentTaskDiff(selectedTask?.id ?? ''),
    enabled: Boolean(selectedTask?.id && selectedTask?.worktreePath),
    refetchInterval: selectedTask?.status === 'running' ? 3_000 : false,
    staleTime: 1_000,
    retry: false,
  })
  const selectedTaskValidationsQuery = useQuery({
    queryKey: ['ma', 'tasks', selectedTask?.id, 'validations'],
    queryFn: () => fetchMultiAgentTaskValidations(selectedTask?.id ?? ''),
    enabled: Boolean(selectedTask?.id),
    staleTime: 1_000,
    retry: false,
  })
  const selectedTaskEvents = selectedTaskEventsQuery.data ?? []
  const selectedTaskLoadedSkills = loadedSkillsFromEvents(selectedTaskEvents)
  const selectedTaskValidations = selectedTaskValidationsQuery.data ?? []
  const selectedTaskPrArtifacts = selectedTask ? (prArtifactsByTaskId[selectedTask.id] ?? []) : []
  const selectedTaskFinalSummary = selectedTask
    ? (runSummariesByTaskId[selectedTask.id] ?? selectedTask.finalSummary ?? null)
    : null
  const selectedTaskSummarySavedPath = selectedTask ? (summarySavedPathByTaskId[selectedTask.id] ?? null) : null

  const createMissionMutation = useMutation({
    mutationFn: createMultiAgentMission,
    onSuccess: (mission) => {
      setCreateMissionOpen(false)
      setSelectedMissionId(mission.id)
      setSelectedTaskId(null)
      setMutationError(null)
      void queryClient.invalidateQueries({ queryKey: ['ma', 'missions'] })
    },
    onError: (error) => setMutationError(error instanceof Error ? error.message : 'Failed to create mission'),
  })

  const createMutation = useMutation({
    mutationFn: createMultiAgentTask,
    onSuccess: (task) => {
      setCreateOpen(false)
      setSelectedTaskId(task.id)
      if (task.missionId) setSelectedMissionId(task.missionId)
      setMutationError(null)
      void queryClient.invalidateQueries({ queryKey: ['ma', 'tasks'] })
      void queryClient.invalidateQueries({ queryKey: ['ma', 'missions'] })
      void queryClient.invalidateQueries({ queryKey: ['ma', 'tasks', task.id, 'events'] })
    },
    onError: (error) => setMutationError(error instanceof Error ? error.message : 'Failed to create task'),
  })

  const startMutation = useMutation({
    mutationFn: startMultiAgentTask,
    onMutate: (taskId) => setStartingTaskId(taskId),
    onSuccess: (task) => {
      setSelectedTaskId(task.id)
      setMutationError(null)
      void queryClient.invalidateQueries({ queryKey: ['ma', 'tasks'] })
      void queryClient.invalidateQueries({ queryKey: ['ma', 'tasks', task.id, 'events'] })
    },
    onError: (error) => setMutationError(error instanceof Error ? error.message : 'Failed to start task'),
    onSettled: () => setStartingTaskId(null),
  })

  const validationMutation = useMutation({
    mutationFn: runMultiAgentTaskValidation,
    onMutate: ({ type }) => {
      setValidationRunningType(type)
      setValidationError(null)
    },
    onSuccess: (validation) => {
      void queryClient.invalidateQueries({ queryKey: ['ma', 'tasks', validation.taskId, 'validations'] })
      void queryClient.invalidateQueries({ queryKey: ['ma', 'tasks', validation.taskId, 'events'] })
    },
    onError: (error) => setValidationError(error instanceof Error ? error.message : 'Failed to run validation'),
    onSettled: () => setValidationRunningType(null),
  })

  const approvalMutation = useMutation({
    mutationFn: resolveMultiAgentApproval,
    onMutate: ({ approvalId }) => {
      setResolvingApprovalId(approvalId)
      setApprovalError(null)
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['ma', 'approvals'] })
    },
    onError: (error) => setApprovalError(error instanceof Error ? error.message : 'Failed to resolve approval'),
    onSettled: () => setResolvingApprovalId(null),
  })


  const prMutation = useMutation({
    mutationFn: createMultiAgentTaskPr,
    onMutate: () => {
      setCreatingPr(true)
      setPrError(null)
    },
    onSuccess: (response, input) => {
      if (response.error) setPrError(response.error)
      if (response.approval) setPrError('Approval required before push/PR. Review it in the approvals queue.')
      if (response.artifact) {
        setPrError(null)
        setPrArtifactsByTaskId((prev) => ({
          ...prev,
          [input.taskId]: [response.artifact!, ...(prev[input.taskId] ?? [])],
        }))
      }
      void queryClient.invalidateQueries({ queryKey: ['ma', 'approvals'] })
      void queryClient.invalidateQueries({ queryKey: ['ma', 'tasks'] })
      void queryClient.invalidateQueries({ queryKey: ['ma', 'tasks', input.taskId, 'validations'] })
    },
    onError: (error) => setPrError(error instanceof Error ? error.message : 'Failed to create PR'),
    onSettled: () => setCreatingPr(false),
  })

  const summaryMutation = useMutation({
    mutationFn: saveMultiAgentTaskSummary,
    onMutate: () => {
      setSummarySaving(true)
      setSummarySaveError(null)
    },
    onSuccess: (response, input) => {
      if (response.error) setSummarySaveError(response.error)
      if (response.run?.summary) {
        setRunSummariesByTaskId((prev) => ({ ...prev, [input.taskId]: response.run!.summary ?? input.summary }))
      }
      if (response.obsidian?.path) {
        setSummarySavedPathByTaskId((prev) => ({ ...prev, [input.taskId]: response.obsidian!.path }))
      }
      void queryClient.invalidateQueries({ queryKey: ['ma', 'tasks'] })
      void queryClient.invalidateQueries({ queryKey: ['ma', 'tasks', input.taskId, 'events'] })
    },
    onError: (error) => setSummarySaveError(error instanceof Error ? error.message : 'Failed to save summary'),
    onSettled: () => setSummarySaving(false),
  })

  const loading = projectsQuery.isLoading || profilesQuery.isLoading || missionsQuery.isLoading || tasksQuery.isLoading
  const loadError = projectsQuery.error ?? profilesQuery.error ?? missionsQuery.error ?? tasksQuery.error

  return (
    <section className="rounded-3xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-4 shadow-[0_24px_80px_var(--theme-shadow)] sm:p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--theme-muted)]">Agent Board</p>
          <h2 className="mt-1 text-xl font-semibold text-[var(--theme-text)]">Multi-Agent Control Plane</h2>
          <p className="mt-1 max-w-2xl text-sm text-[var(--theme-muted-2)]">Create a task, mint an isolated worktree, and keep the first MVP slice visible from one board.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => void tasksQuery.refetch()} className="inline-flex items-center gap-2 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-card2)] px-3 py-2 text-xs font-medium text-[var(--theme-text)] hover:border-[var(--theme-accent)]">
            <HugeiconsIcon icon={RefreshIcon} size={14} strokeWidth={1.7} /> Refresh
          </button>
          <button type="button" onClick={() => { setMutationError(null); setCreateOpen(true) }} className="inline-flex items-center gap-2 rounded-xl bg-[var(--theme-accent)] px-3 py-2 text-xs font-semibold text-white hover:bg-[var(--theme-accent-strong)]">
            <HugeiconsIcon icon={Add01Icon} size={14} strokeWidth={1.8} /> Create task
          </button>
        </div>
      </div>

      {loadError ? <p className="mt-4 rounded-xl border border-red-400/35 bg-red-500/10 px-3 py-2 text-sm text-red-300">{loadError instanceof Error ? loadError.message : 'Failed to load Agent Board data'}</p> : null}
      {mutationError ? <p className="mt-4 rounded-xl border border-amber-400/35 bg-amber-500/10 px-3 py-2 text-sm text-amber-200">{mutationError}</p> : null}
      {loading ? <p className="mt-6 text-sm text-[var(--theme-muted)]">Loading Agent Board…</p> : null}

      <div className="mt-5">
        <MultiAgentMissionPanel
          missions={missions}
          projects={projects}
          selectedMissionId={selectedMissionId}
          loading={missionsQuery.isLoading || missionsQuery.isFetching}
          error={missionsQuery.error instanceof Error ? missionsQuery.error.message : null}
          onSelect={(missionId) => { setSelectedMissionId(missionId); setSelectedTaskId(null) }}
          onCreateMission={() => { setMutationError(null); setCreateMissionOpen(true) }}
        />
      </div>

      <div className="mt-5 grid gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-4">
          <MultiAgentApprovalsPanel
            approvals={approvals}
            resolvingApprovalId={resolvingApprovalId}
            error={approvalError ?? (approvalsQuery.error instanceof Error ? approvalsQuery.error.message : null)}
            onResolve={(approvalId, decision) => approvalMutation.mutate({ approvalId, decision })}
          />
          {selectedTask ? (
            <MultiAgentPrPanel
              task={selectedTask}
              validations={selectedTaskValidations}
              prArtifacts={selectedTaskPrArtifacts}
              creating={creatingPr}
              error={prError}
              onCreatePr={() => prMutation.mutate({ taskId: selectedTask.id, title: selectedTask.title, body: selectedTask.workPacket || selectedTask.description })}
            />
          ) : null}
          <div className="overflow-x-auto pb-2">
            <div className="grid min-w-[1120px] grid-cols-8 gap-3">
            {columns.map((column) => (
              <div key={column.status} className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-bg)] p-2">
                <div className="mb-2 px-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--theme-text)]">{column.label}</h3>
                    <span className="rounded-full bg-[var(--theme-card2)] px-2 py-0.5 text-[10px] text-[var(--theme-muted)]">{column.tasks.length}</span>
                  </div>
                  <p className="mt-1 text-[10px] text-[var(--theme-muted-2)]">{column.hint}</p>
                </div>
                <div className="space-y-2">
                  {column.tasks.length ? column.tasks.map((task) => (
                    <MultiAgentTaskCard
                      key={task.id}
                      task={task}
                      projects={projects}
                      profiles={profiles}
                      selected={selectedTask?.id === task.id}
                      starting={startingTaskId === task.id}
                      onSelect={() => setSelectedTaskId(task.id)}
                      onStart={() => startMutation.mutate(task.id)}
                    />
                  )) : (
                    <div className="rounded-xl border border-dashed border-[var(--theme-border)] px-2 py-5 text-center text-[11px] text-[var(--theme-muted)]">No tasks</div>
                  )}
                </div>
              </div>
            ))}
            </div>
          </div>
        </div>
        <MultiAgentTaskDetail
          task={selectedTask}
          projects={projects}
          profiles={profiles}
          events={selectedTaskEvents}
          diff={selectedTaskDiffQuery.data ?? null}
          diffLoading={selectedTaskDiffQuery.isLoading || selectedTaskDiffQuery.isFetching}
          diffError={selectedTaskDiffQuery.error instanceof Error ? selectedTaskDiffQuery.error.message : null}
          validations={selectedTaskValidations}
          validationRunningType={validationRunningType}
          validationError={validationError ?? (selectedTaskValidationsQuery.error instanceof Error ? selectedTaskValidationsQuery.error.message : null)}
          onValidate={(type) => selectedTask ? validationMutation.mutate({ taskId: selectedTask.id, type }) : undefined}
          finalSummary={selectedTaskFinalSummary}
          summarySaving={summarySaving}
          summarySaveError={summarySaveError}
          summarySavedPath={selectedTaskSummarySavedPath}
          onSaveSummary={() => selectedTask && selectedTaskFinalSummary ? summaryMutation.mutate({ taskId: selectedTask.id, summary: selectedTaskFinalSummary, saveToObsidian: true }) : undefined}
          loadedSkills={selectedTaskLoadedSkills}
        />
      </div>

      <div className="mt-4 flex items-center gap-2 rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-bg)] px-3 py-2 text-xs text-[var(--theme-muted-2)]">
        <HugeiconsIcon icon={ArrowRight01Icon} size={14} strokeWidth={1.7} />
        Mission scope: select a mission to focus the board; new tasks are linked to the selected mission automatically.
      </div>

      {createOpen ? (
        <MultiAgentCreateTaskDialog
          projects={projects}
          profiles={profiles}
          missions={missions}
          selectedMission={selectedMission}
          creating={createMutation.isPending}
          error={mutationError}
          onCancel={() => setCreateOpen(false)}
          onCreate={(draft) => createMutation.mutate(draft)}
        />
      ) : null}

      {createMissionOpen ? (
        <MultiAgentCreateMissionDialog
          projects={projects}
          creating={createMissionMutation.isPending}
          error={mutationError}
          onCancel={() => setCreateMissionOpen(false)}
          onCreate={(draft) => createMissionMutation.mutate(draft)}
        />
      ) : null}
    </section>
  )
}
