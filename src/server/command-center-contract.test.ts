import { describe, expect, it } from 'vitest'
import { buildCommandCenterContract } from './command-center-contract'

describe('command center contract', () => {
  it('keeps Cael Desktop and Web/PWA as clients of the shared API contract', () => {
    const contract = buildCommandCenterContract('2026-05-24T00:00:00.000Z')

    expect(contract.id).toBe('cael-command-center')
    expect(contract.primarySurface).toContain('Desktop')
    expect(contract.mirrorSurface).toContain(':3077')
    expect(contract.principle).toContain(
      'shared Cael Workspace API contract owns business logic',
    )
    expect(contract.privateAccess).toContain('Tailscale-only')
  })

  it('covers required SI-004 surfaces and marks KB Brain Dashboard migration-only', () => {
    const contract = buildCommandCenterContract('2026-05-24T00:00:00.000Z')
    const ids = contract.surfaces.map((surface) => surface.id)

    expect(ids).toEqual(
      expect.arrayContaining([
        'dashboard',
        'sessions-chat',
        'usage',
        'command-panels',
        'knowledge-receipts',
        'n8n-health',
        'approvals',
        'kb-brain-dashboard',
      ]),
    )

    const kbDashboard = contract.surfaces.find(
      (surface) => surface.id === 'kb-brain-dashboard',
    )
    expect(kbDashboard?.status).toBe('migration-only')
    expect(kbDashboard?.owner).toBe('legacy')
    expect(kbDashboard?.web).toBe('retired')
  })
})
