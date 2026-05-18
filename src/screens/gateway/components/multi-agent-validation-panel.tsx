import type {
  MultiAgentTask,
  MultiAgentValidation,
  MultiAgentValidationType,
} from '../../../server/multi-agent/types'

const VALIDATION_COMMANDS: Array<{ type: MultiAgentValidationType; label: string }> = [
  { type: 'lint', label: 'Run lint' },
  { type: 'typecheck', label: 'Run typecheck' },
  { type: 'test', label: 'Run test' },
  { type: 'build', label: 'Run build' },
]

export function MultiAgentValidationPanel({
  task,
  validations,
  runningType,
  error,
  onValidate,
}: {
  task: MultiAgentTask
  validations: MultiAgentValidation[]
  runningType: MultiAgentValidationType | null
  error: string | null
  onValidate: (type: MultiAgentValidationType) => void
}) {
  const disabled = !task.worktreePath || Boolean(runningType)
  return (
    <div className="mt-2 space-y-3">
      <div className="flex flex-wrap gap-2">
        {VALIDATION_COMMANDS.map((command) => (
          <button
            key={command.type}
            type="button"
            disabled={disabled}
            onClick={() => onValidate(command.type)}
            className="rounded-lg border border-[var(--theme-border)] bg-[var(--theme-card2)] px-2.5 py-1.5 text-[11px] font-semibold text-[var(--theme-text)] hover:border-[var(--theme-accent)] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {runningType === command.type ? `Running ${command.type}…` : command.label}
          </button>
        ))}
      </div>
      {!task.worktreePath ? (
        <p className="rounded-xl border border-dashed border-[var(--theme-border)] bg-[var(--theme-bg)] px-3 py-3 text-sm text-[var(--theme-muted-2)]">Create or start a worktree before validation.</p>
      ) : null}
      {error ? <p className="rounded-xl border border-red-400/35 bg-red-500/10 px-3 py-3 text-sm text-red-300">{error}</p> : null}
      {validations.length ? (
        <ol className="space-y-2">
          {validations.slice(0, 5).map((validation) => (
            <li key={validation.id} className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-bg)] px-3 py-2">
              <div className="flex items-center justify-between gap-2 text-[10px] uppercase tracking-[0.12em] text-[var(--theme-muted)]">
                <span>{validation.type}</span>
                <span>{validation.status}{typeof validation.exitCode === 'number' ? ` · exit ${validation.exitCode}` : ''}</span>
              </div>
              <p className="mt-1 font-mono text-[10px] text-[var(--theme-muted-2)]">{validation.command}</p>
              {validation.outputSummary ? <p className="mt-1 whitespace-pre-wrap text-xs text-[var(--theme-text)]">{validation.outputSummary}</p> : null}
            </li>
          ))}
        </ol>
      ) : (
        <p className="rounded-xl border border-dashed border-[var(--theme-border)] bg-[var(--theme-bg)] px-3 py-3 text-sm text-[var(--theme-muted-2)]">No validations run yet.</p>
      )}
    </div>
  )
}
