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
      action_policy:
        'evidence_only_manager_interprets_core_decides_cross_domain',
    },
    {
      watcher_id: 'watcher_side_effects',
      manager: 'james.core.director',
      evidence: ['outbound_gates', 'T29_CAMP7_status'],
      cadence_seconds: 300,
      risk_class: 'R5',
      action_policy:
        'evidence_only_manager_interprets_core_decides_cross_domain',
    },
  ],
}

const modulesRegistry = {
  registry_version: 'james.organization.modules.v1',
  status: 'review_required_before_runtime_use',
  modules: [
    {
      module: 'workspace_mission_control',
      type: ['ui', 'runtime'],
      ports: [3200],
      dependencies: ['mcp_readonly'],
      visibility: ['ugo', 'hermes'],
      gates: ['local_only'],
      health_status_endpoint: {
        published: ['http://127.0.0.1:3200/api/connection-status'],
        expected: 'HTTP 200',
      },
      source: 'canonical fixture',
    },
    {
      module: 'campaign_center',
      type: ['ui', 'api', 'runtime'],
      ports: [18089],
      dependencies: ['core', 'atendimento_api'],
      visibility: ['ugo', 'hermes'],
      gates: ['CAMP-7 remains blocked', 'T29 remains blocked'],
      possible_side_effects: ['real_campaign_send_if_gates_removed'],
      health_status_endpoint: {
        published: ['http://127.0.0.1:18089/campaign-center/status'],
        expected: 'status endpoint is canonical',
      },
      source: 'canonical fixture',
    },
    {
      module: 'atendimento_cockpit',
      type: ['ui'],
      ports: [18087],
      dependencies: ['atendimento_api'],
      visibility: ['ugo', 'hermes'],
      gates: ['no_auto_send_from_frontend'],
      health_status_endpoint: {
        published: ['http://127.0.0.1:18087/health'],
        expected: 'HTTP 200 body ok',
      },
      source: 'canonical fixture',
    },
    {
      module: 'ocr_nf_worker',
      type: ['worker'],
      ports: [],
      dependencies: ['employee_telegram_gateway', 'core'],
      visibility: ['hermes', 'interno'],
      gates: ['no_dedicated_ui', 'no_external_network'],
      health_status_endpoint: {
        internal_only: ['http://james-ocr-nf:8080/health'],
        host_published: [],
        expected: 'container healthy; no host port',
      },
      source: 'canonical fixture',
    },
  ],
}

describe('buildJamesMissionControlSnapshot', () => {
  it('projects a local-only T29/CAMP-7 decision cockpit with all real actions blocked', () => {
    const snapshot = buildJamesMissionControlSnapshot({
      agentsRegistry,
      watchersRegistry,
      modulesRegistry,
      kanbanCards: [
        {
          id: 't_mcp15',
          title: 'MCP-15 — Workspace mostra Sensor/Planner/Operator',
          spec: 'review-failed: Workspace must not claim mcp success',
          status: 'blocked',
        },
        {
          id: 't_t29',
          title: 'T29 — CAMP-7 piloto real',
          status: 'blocked',
        },
        {
          id: 't_t30',
          title: 'T30 — follow-up gated',
          status: 'todo',
        },
        {
          id: 't_t31',
          title: 'T31 — follow-up gated',
          status: 'todo',
        },
      ],
      now: 1_780_890_000_000,
    })

    expect(snapshot.t29DecisionCockpit).toMatchObject({
      baseline: {
        james2Commit: '8b42392',
        loureiroTechCommit: '07280cd',
        board: 'james-despachante quiet except real gates',
      },
      boardGate: {
        safeBaselineCounts: { running: 0, ready: 0 },
        t29Status: 'blocked',
        t30Status: 'todo/gated',
        t31Status: 'todo/gated',
      },
      campaignCenter: {
        mode: 'local-only/dry-run',
        endpoints: [
          'http://127.0.0.1:18089/health',
          'http://127.0.0.1:18089/campaign-center/status',
        ],
        realSideEffectsEnabled: false,
        whatsappMessagesSent: 0,
      },
      employeeLicenseBot: {
        lastLocalSmokeStatus: 'ok',
        employeeTelegramCheck: 'ok',
        atendimentoCheck: 'ok',
        expectedSanitizedReturn:
          'Licenciamento encontrado. Honorário visível: R$ 30,00. Dados sensíveis ocultos.',
        privacy: 'sensitive identifiers omitted from cockpit snapshot',
      },
      realActionControl: {
        label: 'Enviar campanha real',
        enabled: false,
        blockedBy: 'T29',
      },
    })
    expect(snapshot.t29DecisionCockpit.missingGates.map((gate) => gate.key)).toEqual([
      'approval_ref',
      'lote',
      'allowlist',
      'janela',
      'limite',
      'mensagem_aprovada',
      'kill_switch',
      'rollback',
      'stop_criteria',
      'humano_disponivel',
    ])
    expect(snapshot.statusReasons).toContain('t29:blocked')
  })

  it('uses only canonical T29/T30/T31 gate cards for cockpit gate statuses', () => {
    const snapshot = buildJamesMissionControlSnapshot({
      agentsRegistry,
      watchersRegistry,
      modulesRegistry,
      kanbanCards: [
        {
          id: 't_review_failed',
          title: 'HJ-MC-T29-2 — Review Mission Control T29',
          spec: 'review-failed: body cites T30 and T31 while the review card is running',
          status: 'running',
        },
        {
          id: 't_t29',
          title: 'T29 — CAMP-7 piloto real',
          status: 'blocked',
        },
        {
          id: 't_t30',
          title: 'T30 — follow-up gated',
          status: 'todo',
        },
        {
          id: 't_t31',
          title: 'T31 — follow-up gated',
          status: 'todo',
        },
      ],
      now: 1_780_890_000_000,
    })

    expect(snapshot.t29DecisionCockpit.boardGate).toMatchObject({
      safeBaselineCounts: { running: 1, ready: 0 },
      t29Status: 'blocked',
      t30Status: 'todo/gated',
      t31Status: 'todo/gated',
    })
    expect(snapshot.statusReasons).toContain('t29:blocked')
  })

  it('projects modules registry and dependency graph read-only without mixing declared health with observed health', () => {
    const snapshot = buildJamesMissionControlSnapshot({
      agentsRegistry,
      watchersRegistry,
      modulesRegistry,
      kanbanCards: [
        {
          id: 't_mcp15',
          title: 'MCP-15 — Workspace mostra Sensor/Planner/Operator',
          spec: 'review-failed: Workspace must not claim mcp success',
          status: 'blocked',
        },
      ],
      registryPaths: {
        modules:
          '/home/ugo/ops/james-2/docs/james-organization/registries/james_modules_registry.yaml',
      },
      now: 1_780_890_000_000,
    })

    expect(snapshot.modulesRegistry).toMatchObject({
      source: {
        kind: 'canonical',
        status: 'review_required_before_runtime_use',
        path: '/home/ugo/ops/james-2/docs/james-organization/registries/james_modules_registry.yaml',
      },
      counts: {
        total: 4,
        byKind: expect.objectContaining({
          ui: 3,
          api: 1,
          worker: 1,
          runtime: 2,
        }),
      },
    })
    expect(snapshot.statusReasons).toContain(
      'modules_registry:review_required_before_runtime_use',
    )

    const campaign = snapshot.modulesRegistry?.modules.find(
      (module) => module.module === 'campaign_center',
    )
    const cockpit = snapshot.modulesRegistry?.modules.find(
      (module) => module.module === 'atendimento_cockpit',
    )
    const ocr = snapshot.modulesRegistry?.modules.find(
      (module) => module.module === 'ocr_nf_worker',
    )
    expect(campaign).toMatchObject({
      ports: [18089],
      gates: expect.arrayContaining([
        'CAMP-7 remains blocked',
        'T29 remains blocked',
      ]),
      riskFlags: expect.arrayContaining([
        'gate_blocked',
        'side_effect_sensitive',
      ]),
      registrySource: {
        kind: 'canonical',
        status: 'review_required_before_runtime_use',
      },
    })
    expect(campaign?.healthDeclared).toEqual(
      expect.objectContaining({ expected: 'status endpoint is canonical' }),
    )
    expect(campaign?.observedHealth).toBeUndefined()
    expect(cockpit?.ports).toEqual([18087])
    expect(ocr).toMatchObject({
      kinds: ['worker'],
      visibility: expect.arrayContaining(['interno']),
      riskFlags: expect.arrayContaining(['internal_worker']),
    })

    expect(snapshot.graph.nodes).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 'module:campaign_center',
          kind: 'module',
          label: 'campaign_center',
        }),
        expect.objectContaining({
          id: 'module:ocr_nf_worker',
          kind: 'module',
          label: 'ocr_nf_worker',
        }),
        expect.objectContaining({
          id: 'gate:T29 remains blocked',
          kind: 'gate',
          label: 'T29 remains blocked',
        }),
        expect.objectContaining({
          id: 'gate:CAMP-7 remains blocked',
          kind: 'gate',
          label: 'CAMP-7 remains blocked',
        }),
      ]),
    )
    expect(snapshot.graph.edges).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          from: 'module:campaign_center',
          to: 'module:core',
          kind: 'depends_on',
        }),
        expect.objectContaining({
          from: 'module:campaign_center',
          to: 'gate:T29 remains blocked',
          kind: 'blocked_by',
        }),
        expect.objectContaining({
          from: 'module:campaign_center',
          to: 'port:18089',
          kind: 'exposes',
        }),
        expect.objectContaining({
          from: 'module:ocr_nf_worker',
          to: 'module:core',
          kind: 'depends_on',
        }),
      ]),
    )
    const nodeIds = new Set(snapshot.graph.nodes.map((node) => node.id))
    const danglingEdges = snapshot.graph.edges.filter(
      (edge) => !nodeIds.has(edge.from) || !nodeIds.has(edge.to),
    )
    expect(snapshot.graph.nodes).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 'port:18089',
          kind: 'port',
          label: ':18089',
        }),
        expect.objectContaining({
          id: 'port:18087',
          kind: 'port',
          label: ':18087',
        }),
      ]),
    )
    expect(danglingEdges).toEqual([])
  })

  it('projects manager autonomy from registry, capabilities and trust ledger evidence without false success', () => {
    const snapshot = buildJamesMissionControlSnapshot({
      agentsRegistry: {
        ...agentsRegistry,
        status: 'approved_for_runtime_use',
        defaults: {
          trust_score: 50,
          autonomy_tier: 1,
          risk_ceiling_without_approval: 'R2',
          trust_floor_for_tier_2: 60,
          trust_floor_for_tier_3: 75,
          trust_floor_for_tier_4: 90,
        },
      },
      watchersRegistry: {
        ...watchersRegistry,
        status: 'approved_for_runtime_use',
      },
      capabilitiesRegistry: {
        status: 'approved_for_runtime_use',
        capabilities: [
          {
            capability_id: 'campaign.status.read',
            manager: 'james.campaign.manager',
            risk_class: 'R0',
            tool: 'james_campaign_center_status',
            gate: 'none',
            watcher: 'watcher_campaign_health',
            ledger: 'optional',
            approval_required: false,
          },
          {
            capability_id: 'campaign.plan.dry_run',
            manager: 'james.campaign.manager',
            risk_class: 'R1',
            tool: 'james_campaign_plan_dry_run',
            gate: 'dry_run',
            watcher: 'watcher_campaign_health',
            ledger: 'required',
            approval_required: false,
          },
        ],
      },
      trustLedgerEntries: [
        {
          event: {
            manager: 'james.campaign.manager',
            signal: 'clean_reviews',
            delta: 5,
            capability_id: 'campaign.plan.dry_run',
            evidence_ref: 'pytest://review/clean',
          },
        },
        {
          event: {
            manager: 'james.campaign.manager',
            signal: 'watcher_ok_after_apply',
            delta: 5,
            capability_id: 'campaign.plan.dry_run',
            evidence_ref: 'pytest://watcher/campaign-ok',
          },
        },
      ],
      kanbanCards: [
        {
          id: 't_decision',
          title: 'HJ-AUTO decision ledger',
          spec: [
            'james_room_origin:v0',
            'room_id: room-autonomy',
            'owner_manager: james.campaign.manager',
            'decision_ref: dec-autonomy',
            'risk_class: R2',
          ].join('\n'),
          status: 'done',
        },
      ],
      now: 1_780_890_000_000,
    })

    const campaign = snapshot.autonomy.managers.find(
      (manager) => manager.manager === 'james.campaign.manager',
    )
    expect(campaign).toMatchObject({
      manager: 'james.campaign.manager',
      trustScore: 60,
      defaultTier: 1,
      effectiveTier: 2,
      riskCeilingWithoutApproval: 'R2',
      promotedCapabilities: ['campaign.plan.dry_run'],
      gatesActive: true,
      reviewRequired: false,
      nextStepRecommended: 'maintain_tier_2_with_watcher_and_ledger',
    })
    expect(
      campaign?.permissions.map((permission) => permission.capabilityId),
    ).toEqual(['campaign.status.read', 'campaign.plan.dry_run'])
    expect(campaign?.lastDecisions).toEqual([
      expect.objectContaining({
        decisionRef: 'dec-autonomy',
        taskId: 't_decision',
      }),
    ])
    expect(campaign?.lastFailures).toEqual([])
    expect(snapshot.statusReasons).toContain('autonomy:visible')
  })

  it('keeps autonomy downgraded and recommends review after trust-score failure evidence', () => {
    const snapshot = buildJamesMissionControlSnapshot({
      agentsRegistry: {
        ...agentsRegistry,
        status: 'approved_for_runtime_use',
        defaults: {
          trust_score: 50,
          autonomy_tier: 1,
          risk_ceiling_without_approval: 'R2',
        },
      },
      watchersRegistry: {
        ...watchersRegistry,
        status: 'approved_for_runtime_use',
      },
      capabilitiesRegistry: {
        status: 'approved_for_runtime_use',
        capabilities: [
          {
            capability_id: 'campaign.plan.dry_run',
            manager: 'james.campaign.manager',
            risk_class: 'R1',
            tool: 'james_campaign_plan_dry_run',
            gate: 'dry_run',
            watcher: 'watcher_campaign_health',
            ledger: 'required',
            approval_required: false,
          },
        ],
      },
      trustLedgerEntries: [
        {
          event: {
            manager: 'james.campaign.manager',
            signal: 'clean_reviews',
            delta: 5,
            capability_id: 'campaign.plan.dry_run',
            evidence_ref: 'pytest://review/clean',
          },
        },
        {
          event: {
            manager: 'james.campaign.manager',
            signal: 'failed_watcher_after_apply',
            delta: -15,
            capability_id: 'campaign.plan.dry_run',
            evidence_ref: 'pytest://watcher/fail',
          },
        },
      ],
      kanbanCards: [],
      now: 1_780_890_000_000,
    })

    expect(
      snapshot.autonomy.managers.find(
        (manager) => manager.manager === 'james.campaign.manager',
      ),
    ).toMatchObject({
      trustScore: 40,
      effectiveTier: 1,
      promotedCapabilities: [],
      reviewRequired: true,
      lastFailures: [
        expect.objectContaining({
          signal: 'failed_watcher_after_apply',
          evidenceRef: 'pytest://watcher/fail',
        }),
      ],
      nextStepRecommended: 'open_review_room_before_more_autonomy',
    })
    expect(snapshot.operationalStatus).toBe('review_required')
  })

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
      expect.arrayContaining([
        'real_whatsapp',
        'pix_santander',
        'host_mutation',
      ]),
    )
    expect(snapshot.organization.managers).toHaveLength(1)
    expect(snapshot.watchers.byManager['james.campaign.manager']).toHaveLength(
      1,
    )
    expect(snapshot.rooms).toEqual([
      expect.objectContaining({
        roomId: 'room-20260607-planning-campaign-001',
        ownerManager: 'james.campaign.manager',
        decisionRef: 'decision-20260607-001',
        kanbanTaskId: 't_room',
      }),
    ])
    expect(snapshot.decisions).toEqual([
      expect.objectContaining({
        decisionRef: 'decision-20260607-001',
        source: 'kanban',
      }),
    ])
    expect(snapshot.graph.edges).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          from: 'james.core.director',
          to: 'james.campaign.manager',
          kind: 'directs',
        }),
        expect.objectContaining({
          from: 'james.campaign.manager',
          to: 'watcher_campaign_health',
          kind: 'observed_by',
        }),
        expect.objectContaining({
          from: 'room-20260607-planning-campaign-001',
          to: 't_room',
          kind: 'tracked_by',
        }),
      ]),
    )
  })

  it.each(['review_failed', 'changes_requested', 'fail'])(
    'treats MCP-15 status=%s as not operational even without review-failed prose',
    (status) => {
      const snapshot = buildJamesMissionControlSnapshot({
        agentsRegistry: {
          ...agentsRegistry,
          status: 'approved_for_runtime_use',
        },
        watchersRegistry: {
          ...watchersRegistry,
          status: 'approved_for_runtime_use',
        },
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

  it('extracts the HJ-MC-6 dry-run room from real kanban run metadata/comment evidence', () => {
    const snapshot = buildJamesMissionControlSnapshot({
      agentsRegistry,
      watchersRegistry,
      kanbanCards: [
        {
          id: 't_mcp15',
          title: 'MCP-15 — Workspace mostra Sensor/Planner/Operator',
          spec: 'review-failed: Workspace must not claim mcp success',
          status: 'blocked',
          createdAt: 1,
          updatedAt: 2,
        },
        {
          id: 't_739e89cc',
          title: 'HJ-MC-6 — Primeira room sintetica dry-run',
          spec: 'Room registrada em comentário/run metadata, não em james_room_origin:v0.',
          status: 'done',
          createdAt: 1,
          updatedAt: 3,
          latestRun: {
            status: 'done',
            outcome: 'completed',
            summary:
              'Room sintética de dry-run registrada em comentário com room_id, posições, timeouts, quorum, fallback e decision_ref.',
            metadata: {
              room_id: 'room-20260608-hj-mc-6-campaign-vs-atendimento-dryrun',
              decision_ref: 'dec-20260608-hj-mc-6-room-dryrun-v1',
              risk_class: 'R2',
            },
          },
          comments: [
            [
              'HJ-MC-6 dry-run registrado em modo read-only.',
              'Room proposta:',
              '```yaml',
              'room_id: room-20260608-hj-mc-6-campaign-vs-atendimento-dryrun',
              'opened_by: james.core.director',
              'risk_class: R2',
              'decision:',
              '  owner: james.core.director',
              '  decision_ref: "dec-20260608-hj-mc-6-room-dryrun-v1"',
              'status: closed',
              '```',
            ].join('\n'),
          ],
        },
      ],
      now: 1_780_890_000_000,
    })

    expect(snapshot.rooms).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          roomId: 'room-20260608-hj-mc-6-campaign-vs-atendimento-dryrun',
          decisionRef: 'dec-20260608-hj-mc-6-room-dryrun-v1',
          riskClass: 'R2',
          kanbanTaskId: 't_739e89cc',
          kanbanStatus: 'done',
        }),
      ]),
    )
    expect(snapshot.decisions).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          decisionRef: 'dec-20260608-hj-mc-6-room-dryrun-v1',
          roomId: 'room-20260608-hj-mc-6-campaign-vs-atendimento-dryrun',
          taskId: 't_739e89cc',
        }),
      ]),
    )
  })

  it('does not create rooms from comment-only evidence and does not let partial comments erase metadata fields', () => {
    const snapshot = buildJamesMissionControlSnapshot({
      agentsRegistry,
      watchersRegistry,
      kanbanCards: [
        {
          id: 't_mcp15',
          title: 'MCP-15 — Workspace mostra Sensor/Planner/Operator',
          spec: 'review-failed: Workspace must not claim mcp success',
          status: 'blocked',
          createdAt: 1,
          updatedAt: 2,
        },
        {
          id: 't_trusted',
          title: 'Trusted metadata room',
          spec: 'plain card body',
          status: 'done',
          latestRun: {
            metadata: {
              room_id: 'room-trusted',
              decision_ref: 'dec-trusted',
              risk_class: 'R2',
            },
          },
          comments: ['room_id: room-trusted'],
        },
        {
          id: 't_spoof',
          title: 'Comment-only spoof attempt',
          spec: 'plain card body',
          status: 'done',
          comments: [
            'room_id: room-spoof\ndecision_ref: dec-spoof\nrisk_class: R5',
          ],
        },
      ],
      now: 1_780_890_000_000,
    })

    expect(snapshot.rooms).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          roomId: 'room-trusted',
          decisionRef: 'dec-trusted',
          riskClass: 'R2',
        }),
      ]),
    )
    expect(snapshot.rooms.some((room) => room.roomId === 'room-spoof')).toBe(
      false,
    )
  })
})
