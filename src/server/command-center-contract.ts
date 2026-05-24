export type CommandCenterContractSurface = {
  id: string
  label: string
  owner: 'shared-api' | 'desktop' | 'web-pwa' | 'legacy'
  desktop: 'native' | 'webview' | 'planned'
  web: 'responsive' | 'planned' | 'retired'
  source: string
  status: 'live' | 'planned' | 'migration-only'
  description: string
}

export type CommandCenterContract = {
  id: 'cael-command-center'
  version: string
  generatedAt: string
  principle: string
  primarySurface: string
  mirrorSurface: string
  privateAccess: string
  surfaces: CommandCenterContractSurface[]
}

const surfaces: CommandCenterContractSurface[] = [
  {
    id: 'dashboard',
    label: 'Dashboard / Homebase',
    owner: 'shared-api',
    desktop: 'webview',
    web: 'responsive',
    source: '/api/dashboard/overview + /api/cael-status',
    status: 'live',
    description:
      'Operating-layer overview, service posture, fast lanes, and command-center health.',
  },
  {
    id: 'sessions-chat',
    label: 'Sessions + Chat',
    owner: 'shared-api',
    desktop: 'native',
    web: 'responsive',
    source: '/api/sessions + Hermes Gateway chat APIs',
    status: 'live',
    description:
      'Desktop uses native transcript/composer affordances; web/PWA mirrors the same sessions and gateway state.',
  },
  {
    id: 'usage',
    label: 'Usage / Remaining Limits',
    owner: 'shared-api',
    desktop: 'native',
    web: 'responsive',
    source: '/api/usage/limits',
    status: 'live',
    description:
      'Secret-free provider limit snapshot shared by Desktop and Workspace.',
  },
  {
    id: 'command-panels',
    label: 'Command Center Panels',
    owner: 'shared-api',
    desktop: 'native',
    web: 'responsive',
    source: 'Hermes Gateway, Dashboard API, and Cael Workspace API routes',
    status: 'live',
    description:
      'Tasks, workflows/watchdogs, terminal, files/artifacts, skills, operations, and conductor panels.',
  },
  {
    id: 'knowledge-receipts',
    label: 'Knowledge Vault + Receipts',
    owner: 'shared-api',
    desktop: 'planned',
    web: 'responsive',
    source: '/api/knowledge/* + receipt/artifact stores',
    status: 'planned',
    description:
      'Knowledge browsing, run receipts, and memory artifacts remain API-owned with no raw secrets exposed.',
  },
  {
    id: 'n8n-health',
    label: 'n8n Health',
    owner: 'shared-api',
    desktop: 'planned',
    web: 'responsive',
    source: '/api/integrations/status + n8n health adapters',
    status: 'planned',
    description:
      'Personal BigMac n8n and business dev-server n8n stay separated; actions remain approval-gated.',
  },
  {
    id: 'approvals',
    label: 'Approvals',
    owner: 'shared-api',
    desktop: 'planned',
    web: 'planned',
    source: 'Hermes Gateway approvals + workflow/action-gate adapters',
    status: 'planned',
    description:
      'Pending external writes, workflow activations, and guarded actions surface from one approval contract.',
  },
  {
    id: 'kb-brain-dashboard',
    label: 'KB Brain Dashboard',
    owner: 'legacy',
    desktop: 'planned',
    web: 'retired',
    source: '/Users/cderamos/projects/KB_Brain_Dashboard',
    status: 'migration-only',
    description:
      'Absorb useful Personal Brain, Business Brain, n8n, Vaultwarden-reference, and receipt surfaces into Cael; keep the old dashboard read-only/migration-only until explicitly retired.',
  },
]

export function buildCommandCenterContract(
  generatedAt = new Date().toISOString(),
): CommandCenterContract {
  return {
    id: 'cael-command-center',
    version: '2026-05-24.si-004',
    generatedAt,
    principle:
      'The shared Cael Workspace API contract owns business logic and state; Swift/Desktop and Web/PWA are clients, not separate sources of truth.',
    primarySurface: 'Cael Desktop native macOS command center',
    mirrorSurface:
      'Cael Workspace :3077 responsive web/PWA mirror for iPhone/iPad and browsers',
    privateAccess:
      'Tailscale-only/private mesh; no public internet exposure by default.',
    surfaces,
  }
}
