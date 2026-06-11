// @vitest-environment jsdom

import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import {
  AutonomyDashboardPanel,
  ModulesRegistryPanel,
  T29DecisionCockpitPanel,
} from './james-mission-control-view'

describe('T29DecisionCockpitPanel', () => {
  it('renders dense local-only readiness, missing gates and disabled real-send control', () => {
    render(
      <T29DecisionCockpitPanel
        cockpit={{
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
            quietExceptRealGates: true,
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
          missingGates: [
            { key: 'approval_ref', label: 'approval_ref explícito do Ugo', status: 'missing' },
            { key: 'kill_switch', label: 'kill switch validado', status: 'missing' },
          ],
          realActionControl: {
            label: 'Enviar campanha real',
            enabled: false,
            blockedBy: 'T29',
            reason: 'T29/CAMP-7 remains blocked; Mission Control is local-only/dry-run.',
          },
        }}
      />,
    )

    expect(screen.getByText('T29 / CAMP-7 decision cockpit')).toBeTruthy()
    expect(screen.getByText('james-2 8b42392')).toBeTruthy()
    expect(screen.getByText('loureiro-tech 07280cd')).toBeTruthy()
    expect(screen.getByText('running=0 · ready=0')).toBeTruthy()
    expect(screen.getByText('T29 blocked')).toBeTruthy()
    expect(screen.getByText('T30 todo/gated · T31 todo/gated')).toBeTruthy()
    expect(screen.getByText('local-only/dry-run')).toBeTruthy()
    expect(screen.getByText('real_side_effects_enabled=false')).toBeTruthy()
    expect(screen.getByText('whatsapp_messages_sent=0')).toBeTruthy()
    expect(screen.getByText('employee_telegram_check=ok')).toBeTruthy()
    expect(screen.getByText('atendimento_check=ok')).toBeTruthy()
    expect(screen.getByText(/Honorário visível: R\$ 30,00/)).toBeTruthy()
    expect(screen.getByText('approval_ref explícito do Ugo')).toBeTruthy()
    expect(screen.getByText('kill switch validado')).toBeTruthy()
    expect(
      screen.getByRole('button', { name: /Enviar campanha real bloqueado por T29/i }),
    ).toHaveProperty('disabled', true)
    const sensitiveTextPattern = new RegExp(`${'C'}PF|tok${'en'}`, 'i')
    expect(screen.queryByText(sensitiveTextPattern)).toBeNull()
  })
})

describe('AutonomyDashboardPanel', () => {
  it('renders tier, trust score, permissions, gates, decisions, failures and recommended next step', () => {
    render(
      <AutonomyDashboardPanel
        autonomy={{
          managers: [
            {
              manager: 'james.campaign.manager',
              domain: 'campaign',
              defaultTier: 1,
              effectiveTier: 2,
              trustScore: 60,
              riskCeilingWithoutApproval: 'R2',
              permissions: [
                {
                  capabilityId: 'campaign.status.read',
                  riskClass: 'R0',
                  tool: 'james_campaign_center_status',
                  gate: 'none',
                  watcher: 'watcher_campaign_health',
                  ledger: 'optional',
                  approvalRequired: false,
                  enabled: true,
                  reason: null,
                },
                {
                  capabilityId: 'campaign.plan.dry_run',
                  riskClass: 'R1',
                  tool: 'james_campaign_plan_dry_run',
                  gate: 'dry_run',
                  watcher: 'watcher_campaign_health',
                  ledger: 'required',
                  approvalRequired: false,
                  enabled: true,
                  reason: null,
                },
              ],
              gates: ['dry_run', 'none'],
              promotedCapabilities: ['campaign.plan.dry_run'],
              capabilityTiers: { 'campaign.plan.dry_run': 2 },
              reviewRequired: false,
              gatesActive: true,
              lastSignal: 'watcher_ok_after_apply',
              lastDecisions: [
                {
                  decisionRef: 'dec-autonomy',
                  roomId: 'room-autonomy',
                  taskId: 't_decision',
                  status: 'done',
                },
              ],
              lastFailures: [
                {
                  signal: 'failed_watcher_after_apply',
                  capabilityId: 'campaign.plan.dry_run',
                  evidenceRef: 'pytest://watcher/fail',
                  sequence: 7,
                },
              ],
              nextStepRecommended: 'maintain_tier_2_with_watcher_and_ledger',
            },
          ],
        }}
      />,
    )

    const card = screen.getByTestId('autonomy-manager-james.campaign.manager')
    expect(within(card).getByText('james.campaign.manager')).toBeTruthy()
    expect(within(card).getByText('Tier 2')).toBeTruthy()
    expect(within(card).getByText('trust_score 60')).toBeTruthy()
    expect(within(card).getByText('R2 ceiling')).toBeTruthy()
    expect(within(card).getByText('campaign.plan.dry_run')).toBeTruthy()
    expect(within(card).getByText('dry_run')).toBeTruthy()
    expect(within(card).getByText('dec-autonomy')).toBeTruthy()
    expect(within(card).getByText('failed_watcher_after_apply')).toBeTruthy()
    expect(
      within(card).getByText('maintain_tier_2_with_watcher_and_ledger'),
    ).toBeTruthy()
  })
})

describe('ModulesRegistryPanel', () => {
  it('renders modules, gates and declared-vs-observed health without action buttons', () => {
    render(
      <ModulesRegistryPanel
        modulesRegistry={{
          source: {
            kind: 'canonical',
            status: 'review_required_before_runtime_use',
            path: '/home/ugo/ops/james-2/docs/james-organization/registries/james_modules_registry.yaml',
          },
          counts: {
            total: 3,
            byKind: { ui: 2, api: 1, worker: 1, runtime: 1 },
          },
          warnings: ['declared_registry_is_not_observed_health'],
          modules: [
            {
              module: 'campaign_center',
              kinds: ['ui', 'api', 'runtime'],
              ports: [18089],
              paths: ['apps/james-campaign-center'],
              processes: ['james-campaign-center'],
              dependencies: ['core', 'atendimento_api'],
              visibility: ['ugo', 'hermes'],
              gates: ['CAMP-7 remains blocked', 'T29 remains blocked'],
              possibleSideEffects: ['real_campaign_send_if_gates_removed'],
              healthDeclared: {
                published: ['http://127.0.0.1:18089/campaign-center/status'],
                expected: 'status endpoint is canonical',
              },
              registrySource: {
                kind: 'canonical',
                status: 'review_required_before_runtime_use',
              },
              riskFlags: ['gate_blocked', 'side_effect_sensitive'],
            },
            {
              module: 'atendimento_cockpit',
              kinds: ['ui'],
              ports: [18087],
              paths: ['apps/james-atendimento-cockpit'],
              processes: ['james-atendimento-cockpit'],
              dependencies: ['atendimento_api'],
              visibility: ['ugo', 'hermes'],
              gates: ['no_auto_send_from_frontend'],
              possibleSideEffects: [],
              healthDeclared: {
                published: ['http://127.0.0.1:18087/health'],
                expected: 'HTTP 200 body ok',
              },
              registrySource: {
                kind: 'canonical',
                status: 'review_required_before_runtime_use',
              },
              riskFlags: ['gate_blocked'],
            },
            {
              module: 'ocr_nf_worker',
              kinds: ['worker'],
              ports: [],
              paths: ['packages/james_ocr_nf'],
              processes: ['james-ocr-nf'],
              dependencies: ['core'],
              visibility: ['hermes', 'interno'],
              gates: ['no_dedicated_ui'],
              possibleSideEffects: ['local_file_processing_in_runtime_inbox'],
              healthDeclared: {
                internal_only: ['http://james-ocr-nf:8080/health'],
                host_published: [],
              },
              registrySource: {
                kind: 'canonical',
                status: 'review_required_before_runtime_use',
              },
              riskFlags: ['internal_worker', 'gate_blocked'],
            },
          ],
        }}
      />,
    )

    expect(screen.getByText('Modules registry')).toBeTruthy()
    expect(screen.getByText(/declared registry ≠ observed health/)).toBeTruthy()
    expect(screen.getByText('campaign_center')).toBeTruthy()
    expect(screen.getByText(':18089')).toBeTruthy()
    expect(screen.getByText('atendimento_cockpit')).toBeTruthy()
    expect(screen.getByText(':18087')).toBeTruthy()
    expect(screen.getByText('ocr_nf_worker')).toBeTruthy()
    expect(screen.getByText(/internal only/)).toBeTruthy()
    expect(screen.getByText('T29 remains blocked')).toBeTruthy()
    expect(screen.getByText('CAMP-7 remains blocked')).toBeTruthy()
    expect(
      screen.queryByRole('button', {
        name: /send|restart|deploy|unlock|pix|whatsapp/i,
      }),
    ).toBeNull()
  })
})
