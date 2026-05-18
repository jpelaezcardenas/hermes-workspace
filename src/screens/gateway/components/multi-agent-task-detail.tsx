import type { MultiAgentEvent, MultiAgentProfile, MultiAgentProject, MultiAgentTask } from '../../../server/multi-agent/types'
import { buildMultiAgentTaskMeta } from './multi-agent-board-model'

type MultiAgentTaskDetailProps = {
  task: MultiAgentTask | null
  projects: MultiAgentProject[]
  profiles: MultiAgentProfile[]
  events: MultiAgentEvent[]
}

function projectLabel(projects: MultiAgentProject[], id: string): string {
  return projects.find((project) => project.id === id)?.name ?? id
}

function profileLabel(profiles: MultiAgentProfile[], id: string): string {
  return profiles.find((profile) => profile.id === id)?.name ?? id
}

export function MultiAgentTaskDetail({ task, projects, profiles, events }: MultiAgentTaskDetailProps) {
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
