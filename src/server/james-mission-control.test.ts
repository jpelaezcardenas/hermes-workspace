import { describe, expect, it } from 'vitest'

import { buildJamesMissionControlSnapshot } from './james-mission-control'

const agentsRegistry = {
  registry_version: 'james.organization.agents.v0',
  status: 'review_required_before_runtime_use',
  agents: [
    {
      agent_id: 'james.core.director',
      domain: 'core_direction',
      mission: 'Dirigir internamente o James.',
      owns: ['core', 'decision_log'],
      can: ['open_room'],
      cannot: ['bypass_gate'],
      heartbeat_seconds: 300,
    },
    {
      agent_id: 'james.campaign.manager',
      domain: 'campaign',
      mission: 'Defender campanhas seguras.',
      owns: ['campaign'],
      can: ['plan_dry_run'],
      cannot: ['send_real_whatsapp_without_approval'],
      heartbeat_seconds: 900,
    },
  ],
}

const watchersRegistry = {
  registry_version: 'james.organization.watchers.v0',
  status: 'review_required_before_runtime_use',
  watchers: [
    {
      watcher_id: 'watcher_campaign_health',
      manager: 'james.campaign.manager',
      evidence: ['campaign_center_status'],
      cadence_seconds: 900,
      risk_class: 'R3',
      action_policy: 'evidence_only_manager_interprets_core_decides_cross_domain',
    },
    {
      watcher_id: 'watcher_side_effects',
      manager: 'james.core.director',
      evidence: ['outbound_gates', 'T29_CAMP7_status'],
      cadence_seconds: 300,
      risk_class: 'R5',
      action_policy: 'evidence_only_manager_interprets_core_decides_cross_domain',
    },
  ],
}

describe('buildJamesMissionControlSnapshot', () => {
  it('builds an evidence-first Mission Control snapshot without claiming operational OK while MCP-15 is blocked', () => {
    const snapshot = buildJamesMissionControlSnapshot({
      agentsRegistry,
      watchersRegistry,
      kanbanCards: [
        {
          id: 't_mcp15',
          title: 'MCP-15 — Workspace mostra Sensor/Planner/Operator',
          spec: 'review-failed: Workspace must not claim mcp success',
          status: 'blocked',
          assignedWorker: 'hermes-main',
          createdAt: 1,
          updatedAt: 2,
        },
        {
          id: 't_room',
          title: 'Synthetic room card',
          spec: [
            'james_room_origin:v0',
            'room_id: room-20260607-planning-campaign-001',
            'owner_manager: james.campaign.manager',
            'decision_ref: decision-20260607-001',
            'risk_class: R2',
          ].join('\n'),
          status: 'ready',
          assignedWorker: 'hermes-main',
          createdAt: 1,
          updatedAt: 3,
        },
      ],
      now: 1_780_890_000_000,
    })

    expect(snapshot.operationalStatus).toBe('review_required')
    expect(snapshot.mcpHonesty.status).toBe('review_failed')
    expect(snapshot.sideEffects.map((gate) => gate.key)).toEqual(
      expect.arrayContaining(['real_whatsapp', 'pix_santander', 'host_mutation']),
    )
    expect(snapshot.organization.managers).toHaveLength(1)
    expect(snapshot.watchers.byManager['james.campaign.manager']).toHaveLength(1)
    expect(snapshot.rooms).toEqual([
      expect.objectContaining({
        roomId: 'room-20260607-planning-campaign-001',
        ownerManager: 'james.campaign.manager',
        decisionRef: 'decision-20260607-001',
        kanbanTaskId: 't_room',
      }),
    ])
    expect(snapshot.decisions).toEqual([
      expect.objectContaining({ decisionRef: 'decision-20260607-001', source: 'kanban' }),
    ])
    expect(snapshot.graph.edges).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ from: 'james.core.director', to: 'james.campaign.manager', kind: 'directs' }),
        expect.objectContaining({ from: 'james.campaign.manager', to: 'watcher_campaign_health', kind: 'observed_by' }),
        expect.objectContaining({ from: 'room-20260607-planning-campaign-001', to: 't_room', kind: 'tracked_by' }),
      ]),
    )
  })

  it.each(['review_failed', 'changes_requested', 'fail'])(
    'treats MCP-15 status=%s as not operational even without review-failed prose',
    (status) => {
      const snapshot = buildJamesMissionControlSnapshot({
        agentsRegistry: { ...agentsRegistry, status: 'approved_for_runtime_use' },
        watchersRegistry: { ...watchersRegistry, status: 'approved_for_runtime_use' },
        kanbanCards: [
          {
            id: 't_mcp15',
            title: 'MCP-15 — Workspace mostra Sensor/Planner/Operator',
            spec: 'Workspace evidence card',
            status,
            createdAt: 1,
            updatedAt: 2,
          },
        ],
        now: 1_780_890_000_000,
      })

      expect(snapshot.operationalStatus).toBe('review_required')
      expect(snapshot.mcpHonesty.status).toBe('review_failed')
    },
  )
})
