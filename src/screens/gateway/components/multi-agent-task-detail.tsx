import type { TaskDiffResult } from '../../../server/multi-agent/diff-manager'
import type {
  MultiAgentEvent,
  MultiAgentProfile,
  MultiAgentProject,
  MultiAgentTask,
  MultiAgentValidation,
  MultiAgentValidationType,
} from '../../../server/multi-agent/types'
import { buildMultiAgentTaskMeta } from './multi-agent-board-model'
import { MultiAgentValidationPanel } from './multi-agent-validation-panel'

type MultiAgentTaskDetailProps = {
  task: MultiAgentTask | null
  projects: MultiAgentProject[]
  profiles: MultiAgentProfile[]
  events: MultiAgentEvent[]
  diff?: TaskDiffResult | null
  diffLoading?: boolean
  diffError?: string | null
  validations?: MultiAgentValidation[]
  validationRunningType?: MultiAgentValidationType | null
  validationError?: string | null
  onValidate?: (type: MultiAgentValidationType) => void
  finalSummary?: string | null
  summarySaving?: boolean
  summarySaveError?: string | null
  summarySavedPath?: string | null
  onSaveSummary?: () => void
  loadedSkills?: string[]
}

function projectLabel(projects: MultiAgentProject[], id: string): string {
  return projects.find((project) => project.id === id)?.name ?? id
}

function profileLabel(profiles: MultiAgentProfile[], id: string): string {
  return profiles.find((profile) => profile.id === id)?.name ?? id
}

export function MultiAgentDiffPanel({
  diff,
  loading,
  error,
}: {
  diff: TaskDiffResult | null
  loading: boolean
  error: string | null
}) {
  if (loading) {
    return <p className="mt-2 rounded-xl border border-dashed border-[var(--theme-border)] bg-[var(--theme-bg)] px-3 py-3 text-sm text-[var(--theme-muted-2)]">Loading diff…</p>
  }
  if (error) {
    return <p className="mt-2 rounded-xl border border-red-400/35 bg-red-500/10 px-3 py-3 text-sm text-red-300">{error}</p>
  }
  if (!diff || diff.clean) {
    return <p className="mt-2 rounded-xl border border-dashed border-[var(--theme-border)] bg-[var(--theme-bg)] px-3 py-3 text-sm text-[var(--theme-muted-2)]">No changes in worktree.</p>
  }

  return (
    <div className="mt-2 space-y-3">
      <div>
        <p className="text-xs font-medium text-[var(--theme-muted)]">Changed files</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {diff.changedFiles.map((file) => (
            <span key={file} className="rounded-full border border-[var(--theme-border)] bg-[var(--theme-bg)] px-2 py-0.5 font-mono text-[10px] text-[var(--theme-text)]">{file}</span>
          ))}
        </div>
      </div>
      {diff.stat ? (
        <pre className="max-h-32 overflow-auto rounded-xl border border-[var(--theme-border)] bg-[var(--theme-bg)] p-3 text-xs text-[var(--theme-muted-2)]">{diff.stat}</pre>
      ) : null}
      {diff.diff ? (
        <pre className="max-h-80 overflow-auto rounded-xl border border-[var(--theme-border)] bg-[var(--theme-bg)] p-3 text-xs text-[var(--theme-text)]">{diff.diff}</pre>
      ) : null}
    </div>
  )
}

export function MultiAgentTaskDetail({
  task,
  projects,
  profiles,
  events,
  diff = null,
  diffLoading = false,
  diffError = null,
  validations = [],
  validationRunningType = null,
  validationError = null,
  onValidate = () => undefined,
  finalSummary = null,
  summarySaving = false,
  summarySaveError = null,
  summarySavedPath = null,
  onSaveSummary = () => undefined,
  loadedSkills = [],
}: MultiAgentTaskDetailProps) {
  if (!task) {
    return (
      <aside className="rounded-3xl border border-dashed border-[var(--theme-border)] bg-[var(--theme-card)] p-5 text-sm text-[var(--theme-muted)]">
        Select a task to inspect its work packet, acceptance criteria, branch, and worktree.
      </aside>
    )
  }

  const meta = buildMultiAgentTaskMeta(task)
  return (
    <aside className="rounded-3xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--theme-muted)]">Task Detail</p>
          <h3 className="mt-2 text-lg font-semibold text-[var(--theme-text)]">{task.title}</h3>
        </div>
        <span className="rounded-full border border-[var(--theme-accent)] bg-[var(--theme-accent-soft)] px-3 py-1 text-xs font-semibold text-[var(--theme-accent-strong)]">
          {meta.statusLabel}
        </span>
      </div>
      <dl className="mt-4 grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
        <div><dt className="text-xs text-[var(--theme-muted)]">Project</dt><dd className="mt-1 font-medium text-[var(--theme-text)]">{projectLabel(projects, task.projectId)}</dd></div>
        <div><dt className="text-xs text-[var(--theme-muted)]">Profile</dt><dd className="mt-1 font-medium text-[var(--theme-text)]">{profileLabel(profiles, task.assigneeProfileId)}</dd></div>
        <div className="sm:col-span-2"><dt className="text-xs text-[var(--theme-muted)]">Branch</dt><dd className="mt-1 truncate font-mono text-xs text-[var(--theme-text)]">{meta.branchLabel}</dd></div>
        <div className="sm:col-span-2"><dt className="text-xs text-[var(--theme-muted)]">Worktree</dt><dd className="mt-1 truncate font-mono text-xs text-[var(--theme-text)]">{task.worktreePath || 'No worktree yet'}</dd></div>
      </dl>
      <div className="mt-5 space-y-4">
        <section>
          <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--theme-muted)]">Work Packet</h4>
          <p className="mt-2 whitespace-pre-wrap rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-bg)] p-3 text-sm text-[var(--theme-text)]">{task.workPacket || task.description || 'No work packet provided.'}</p>
        </section>
        {task.productBrief ? (
          <section>
            <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--theme-muted)]">Product Brief</h4>
            <div className="mt-2 space-y-2 rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-bg)] p-3 text-sm text-[var(--theme-text)]">
              {task.productBrief.goal ? <p><span className="font-semibold">Goal:</span> {task.productBrief.goal}</p> : null}
              {task.productBrief.userStory ? <p><span className="font-semibold">User story:</span> {task.productBrief.userStory}</p> : null}
              {task.productBrief.successMetrics.length ? <p><span className="font-semibold">Success metrics:</span> {task.productBrief.successMetrics.join('; ')}</p> : null}
              {task.productBrief.nonGoals.length ? <p><span className="font-semibold">Non-goals:</span> {task.productBrief.nonGoals.join('; ')}</p> : null}
            </div>
          </section>
        ) : null}
        <section>
          <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--theme-muted)]">Acceptance Criteria</h4>
          {task.acceptanceCriteria.length ? (
            <ul className="mt-2 space-y-1 text-sm text-[var(--theme-text)]">
              {task.acceptanceCriteria.map((criterion) => <li key={criterion} className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-bg)] px-3 py-2">• {criterion}</li>)}
            </ul>
          ) : (
            <p className="mt-2 text-sm text-[var(--theme-muted-2)]">No criteria captured.</p>
          )}
        </section>
        {loadedSkills.length ? (
          <section>
            <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--theme-muted)]">Skills loaded for this run</h4>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {loadedSkills.map((skill) => (
                <span key={skill} className="rounded-full border border-[var(--theme-border)] bg-[var(--theme-bg)] px-2 py-0.5 font-mono text-[10px] text-[var(--theme-text)]">{skill}</span>
              ))}
            </div>
          </section>
        ) : null}
        <section>
          <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--theme-muted)]">Diff</h4>
          <MultiAgentDiffPanel diff={diff} loading={diffLoading} error={diffError} />
        </section>
        <section>
          <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--theme-muted)]">Validation</h4>
          <MultiAgentValidationPanel
            task={task}
            validations={validations}
            runningType={validationRunningType}
            error={validationError}
            onValidate={onValidate}
          />
        </section>
        {finalSummary ? (
          <section>
            <div className="flex items-center justify-between gap-3">
              <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--theme-muted)]">Final Summary</h4>
              <button
                type="button"
                disabled={summarySaving}
                onClick={onSaveSummary}
                className="rounded-lg border border-[var(--theme-border)] bg-[var(--theme-card2)] px-2.5 py-1 text-[11px] font-semibold text-[var(--theme-text)] hover:border-[var(--theme-accent)] disabled:opacity-50"
              >
                {summarySaving ? 'Saving summary…' : 'Save summary to Obsidian'}
              </button>
            </div>
            <p className="mt-2 whitespace-pre-wrap rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-bg)] p-3 text-sm text-[var(--theme-text)]">{finalSummary}</p>
            {summarySavedPath ? <p className="mt-2 rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-3 py-2 text-xs text-emerald-300">Saved to {summarySavedPath}</p> : null}
            {summarySaveError ? <p className="mt-2 rounded-xl border border-red-400/35 bg-red-500/10 px-3 py-2 text-xs text-red-300">{summarySaveError}</p> : null}
          </section>
        ) : null}
        <section>
          <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--theme-muted)]">Events / Live Log</h4>
          {events.length ? (
            <ol className="mt-2 max-h-72 space-y-2 overflow-auto pr-1">
              {events.slice(-12).map((event) => (
                <li key={event.id} className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-bg)] px-3 py-2">
                  <div className="flex items-center justify-between gap-2 text-[10px] uppercase tracking-[0.12em] text-[var(--theme-muted)]">
                    <span>{event.type}</span>
                    <span>{new Date(event.createdAt).toLocaleTimeString()}</span>
                  </div>
                  <p className="mt-1 whitespace-pre-wrap text-xs text-[var(--theme-text)]">{event.message}</p>
                </li>
              ))}
            </ol>
          ) : (
            <p className="mt-2 rounded-xl border border-dashed border-[var(--theme-border)] bg-[var(--theme-bg)] px-3 py-3 text-sm text-[var(--theme-muted-2)]">No events captured yet.</p>
          )}
        </section>
      </div>
    </aside>
  )
}
