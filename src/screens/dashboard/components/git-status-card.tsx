import { useQuery } from '@tanstack/react-query'

type GitStatusResponse = {
  ok: boolean
  repo: string
  branch: string
  shortSha: string
  sha: string
  subject: string
  author: string
  committedAt: string
  relativeCommitTime: string
  dirty: boolean
  ahead: number
  behind: number
  remote: string | null
  checkedAt: number
  error?: string
}

function statusLabel(data: GitStatusResponse | undefined): string {
  if (!data) return 'Checking'
  if (!data.ok) return 'Unavailable'
  if (data.dirty) return 'Dirty worktree'
  if (data.ahead > 0 && data.behind > 0) return `Diverged +${data.ahead}/-${data.behind}`
  if (data.ahead > 0) return `Ahead by ${data.ahead}`
  if (data.behind > 0) return `Behind by ${data.behind}`
  return 'Synced'
}

function statusColor(data: GitStatusResponse | undefined): string {
  if (!data) return 'var(--theme-muted)'
  if (!data.ok) return 'var(--theme-danger)'
  if (data.dirty || data.ahead > 0 || data.behind > 0) return 'var(--theme-warning)'
  return 'var(--theme-success)'
}

export function GitStatusCard() {
  const query = useQuery<GitStatusResponse>({
    queryKey: ['dashboard', 'git-status'],
    queryFn: async () => {
      const res = await fetch('/api/git-status', { cache: 'no-store' })
      if (!res.ok) throw new Error(`git-status ${res.status}`)
      return (await res.json()) as GitStatusResponse
    },
    staleTime: 10_000,
    refetchInterval: 30_000,
    retry: 1,
  })

  const data = query.data
  const label = query.isError ? 'Unavailable' : statusLabel(data)
  const color = query.isError ? 'var(--theme-danger)' : statusColor(data)

  return (
    <div className="h-full rounded-xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-4">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
            Git Commit
          </p>
          <h3 className="mt-1 text-lg font-semibold text-[var(--theme-text)]">
            {data?.shortSha ?? '—'}
          </h3>
        </div>
        <span
          className="rounded-full border px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em]"
          style={{
            borderColor: `color-mix(in srgb, ${color} 42%, var(--theme-border))`,
            background: `color-mix(in srgb, ${color} 12%, transparent)`,
            color,
          }}
        >
          {label}
        </span>
      </div>

      <div className="space-y-2 text-xs text-muted">
        <p className="line-clamp-2 text-sm text-[var(--theme-text)]">
          {query.isError ? 'Could not read repository status.' : data?.subject ?? 'Loading commit status…'}
        </p>
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-lg bg-[var(--theme-card2)] px-2 py-1.5">
            <div className="text-[10px] uppercase tracking-[0.12em] opacity-70">Branch</div>
            <div className="truncate text-[var(--theme-text)]">{data?.branch ?? '—'}</div>
          </div>
          <div className="rounded-lg bg-[var(--theme-card2)] px-2 py-1.5">
            <div className="text-[10px] uppercase tracking-[0.12em] opacity-70">Remote</div>
            <div className="truncate text-[var(--theme-text)]">{data?.remote ?? 'origin'}</div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 text-[11px]">
          <span>author: {data?.author ?? '—'}</span>
          <span>committed: {data?.relativeCommitTime ?? '—'}</span>
          {data ? <span>checked: {new Date(data.checkedAt).toLocaleTimeString()}</span> : null}
        </div>
      </div>
    </div>
  )
}
