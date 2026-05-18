import type { MultiAgentApproval, MultiAgentApprovalStatus } from '../../../server/multi-agent/types'

type ApprovalDecision = Extract<MultiAgentApprovalStatus, 'approved' | 'denied'>

export function MultiAgentApprovalsPanel({
  approvals,
  resolvingApprovalId,
  error,
  onResolve,
}: {
  approvals: MultiAgentApproval[]
  resolvingApprovalId: string | null
  error: string | null
  onResolve: (approvalId: string, decision: ApprovalDecision) => void
}) {
  return (
    <section className="rounded-3xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--theme-muted)]">Approval Queue</p>
          <h3 className="mt-1 text-lg font-semibold text-[var(--theme-text)]">Pending workspace approvals</h3>
        </div>
        <span className="rounded-full border border-[var(--theme-border)] bg-[var(--theme-bg)] px-2.5 py-1 text-xs text-[var(--theme-muted)]">{approvals.length}</span>
      </div>

      {error ? <p className="mt-3 rounded-xl border border-red-400/35 bg-red-500/10 px-3 py-2 text-sm text-red-300">{error}</p> : null}

      {approvals.length ? (
        <ol className="mt-3 space-y-2">
          {approvals.map((approval) => {
            const resolving = resolvingApprovalId === approval.id
            return (
              <li key={approval.id} className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-bg)] p-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap gap-1.5 text-[10px] uppercase tracking-[0.12em] text-[var(--theme-muted)]">
                      <span>{approval.actionType}</span>
                      <span>·</span>
                      <span>{approval.riskLevel}</span>
                    </div>
                    <h4 className="mt-1 text-sm font-semibold text-[var(--theme-text)]">{approval.title}</h4>
                    <p className="mt-1 text-xs text-[var(--theme-muted-2)]">{approval.description}</p>
                    <p className="mt-2 font-mono text-[10px] text-[var(--theme-muted)]">{approval.taskId}</p>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap justify-end gap-2">
                  <button
                    type="button"
                    disabled={resolving}
                    onClick={() => onResolve(approval.id, 'denied')}
                    className="rounded-lg border border-[var(--theme-border)] px-3 py-1.5 text-xs font-semibold text-[var(--theme-text)] disabled:opacity-40"
                  >
                    {resolving ? 'Resolving…' : 'Deny'}
                  </button>
                  <button
                    type="button"
                    disabled={resolving}
                    onClick={() => onResolve(approval.id, 'approved')}
                    className="rounded-lg bg-[var(--theme-accent)] px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-40"
                  >
                    {resolving ? 'Resolving…' : 'Approve'}
                  </button>
                </div>
              </li>
            )
          })}
        </ol>
      ) : (
        <p className="mt-3 rounded-xl border border-dashed border-[var(--theme-border)] bg-[var(--theme-bg)] px-3 py-3 text-sm text-[var(--theme-muted-2)]">No pending approvals.</p>
      )}
    </section>
  )
}
