export type AgentSurfaceTone =
  | 'neutral'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'

export type AgentSurfaceAction = {
  id: string
  label: string
  kind: 'approve' | 'hold' | 'draft' | 'run' | 'open' | 'copy'
  description?: string
  href?: string
  command?: string
  requiresApproval?: boolean
}

export type AgentSurfaceDecisionCard = {
  type: 'decision_card'
  id: string
  title: string
  recommendation: string
  why?: string
  owner?: string
  priority?: 'P0' | 'P1' | 'P2' | 'P3'
  risk?: 'Low' | 'Medium' | 'High'
  status?:
    | 'Proposed'
    | 'Approved'
    | 'Queued'
    | 'In Progress'
    | 'Blocked'
    | 'Done'
  actions?: Array<AgentSurfaceAction>
}

export type AgentSurfaceApprovalAction = {
  type: 'approval_action'
  id: string
  title: string
  prompt: string
  actions: Array<AgentSurfaceAction>
  approvalNote?: string
}

export type AgentSurfaceEvidenceLink = {
  type: 'evidence_link'
  id: string
  title: string
  url: string
  source?: string
  excerpt?: string
  confidence?: 'verified' | 'informed_judgment' | 'speculative'
}

export type AgentSurfaceChecklist = {
  type: 'checklist'
  id: string
  title: string
  items: Array<{
    id: string
    label: string
    done?: boolean
    detail?: string
  }>
}

export type AgentSurfaceStatusItem = {
  type: 'status_item'
  id: string
  label: string
  value: string
  tone?: AgentSurfaceTone
  detail?: string
}

export type AgentSurfaceBlock =
  | AgentSurfaceDecisionCard
  | AgentSurfaceApprovalAction
  | AgentSurfaceEvidenceLink
  | AgentSurfaceChecklist
  | AgentSurfaceStatusItem

export type AgentSurface = {
  schema: 'hermes.agent_surface.v1'
  id: string
  title: string
  description?: string
  generatedAt: string
  source: {
    agent: string
    workflow: string
    profile?: string
  }
  blocks: Array<AgentSurfaceBlock>
}
