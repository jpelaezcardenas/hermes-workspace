import type { MultiAgentArtifact, MultiAgentTask, MultiAgentValidation } from '../../../server/multi-agent/types'

export function MultiAgentPrPanel({
  task,
  validations,
  prArtifacts,
  creating,
  error,
  onCreatePr,
}: {
  task: MultiAgentTask
  validations: MultiAgentValidation[]
  prArtifacts: MultiAgentArtifact[]
  creating: boolean
  error: string | null
  onCreatePr: () => void
}) {
  const hasWorktree = Boolean(task.worktreePath && task.branchName)
  const hasPassedValidation = validations.some((validation) => validation.status === 'passed')
  const canCreate = hasWorktree && hasPassedValidation && !creating

  return (
    <div className="mt-2 space-y-3">
      <div className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-bg)] px-3 py-3">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--theme-muted)]">Pull Request</p>
            <p className="mt-1 font-mono text-[10px] text-[var(--theme-muted-2)]">{task.branchName || 'No branch yet'}</p>
          </div>
          <button
            type="button"
            disabled={!canCreate}
            onClick={onCreatePr}
            className="rounded-lg bg-[var(--theme-accent)] px-3 py-1.5 text-xs font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            {creating ? 'Creating PR…' : 'Create PR'}
          </button>
        </div>
        <div className="mt-2 space-y-1 text-xs text-[var(--theme-muted-2)]">
          <p>{hasWorktree ? 'Worktree and branch ready.' : 'Worktree and branch are required.'}</p>
          <p>{hasPassedValidation ? 'validation passed' : 'No passed validation.'}</p>
        </div>
      </div>

      {error ? <p className="rounded-xl border border-amber-400/35 bg-amber-500/10 px-3 py-3 text-sm text-amber-200">{error}</p> : null}

      {prArtifacts.length ? (
        <ol className="space-y-2">
          {prArtifacts.map((artifact) => (
            <li key={artifact.id} className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-bg)] px-3 py-2">
              <p className="text-xs font-semibold text-[var(--theme-text)]">{artifact.title}</p>
              <a href={artifact.pathOrUrl} className="mt-1 block break-all font-mono text-[10px] text-[var(--theme-accent-strong)]">{artifact.pathOrUrl}</a>
            </li>
          ))}
        </ol>
      ) : (
        <p className="rounded-xl border border-dashed border-[var(--theme-border)] bg-[var(--theme-bg)] px-3 py-3 text-sm text-[var(--theme-muted-2)]">No PR created yet.</p>
      )}
    </div>
  )
}
