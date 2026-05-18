import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import type { MultiAgentApproval } from '../../../server/multi-agent/types'
import { MultiAgentApprovalsPanel } from './multi-agent-approvals-panel'

const now = '2026-05-18T13:00:00.000Z'

function approval(overrides: Partial<MultiAgentApproval> = {}): MultiAgentApproval {
  return {
    id: 'approval-1',
    taskId: 'task-1',
    runId: null,
    riskLevel: 'high',
    actionType: 'github.pr_create',
    title: 'Create pull request',
    description: 'Push branch and open PR',
    payload: { branch: 'hermes/task-1' },
    status: 'pending',
    createdAt: now,
    resolvedAt: null,
    ...overrides,
  }
}

describe('MultiAgentApprovalsPanel', () => {
  it('renders pending approvals with approve and deny controls', () => {
    const html = renderToStaticMarkup(
      <MultiAgentApprovalsPanel
        approvals={[approval()]}
        resolvingApprovalId={null}
        error={null}
        onResolve={() => undefined}
      />,
    )

    expect(html).toContain('Approval Queue')
    expect(html).toContain('Create pull request')
    expect(html).toContain('github.pr_create')
    expect(html).toContain('high')
    expect(html).toContain('Push branch and open PR')
    expect(html).toContain('Approve')
    expect(html).toContain('Deny')
  })

  it('renders empty, error, and resolving states', () => {
    const empty = renderToStaticMarkup(<MultiAgentApprovalsPanel approvals={[]} resolvingApprovalId={null} error={null} onResolve={() => undefined} />)
    const error = renderToStaticMarkup(<MultiAgentApprovalsPanel approvals={[]} resolvingApprovalId={null} error="approval API down" onResolve={() => undefined} />)
    const resolving = renderToStaticMarkup(<MultiAgentApprovalsPanel approvals={[approval()]} resolvingApprovalId="approval-1" error={null} onResolve={() => undefined} />)

    expect(empty).toContain('No pending approvals')
    expect(error).toContain('approval API down')
    expect(resolving).toContain('Resolving')
  })
})
