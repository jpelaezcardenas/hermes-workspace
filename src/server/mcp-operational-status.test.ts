import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import {
  buildProfileMcpStatus,
  readLastMcpLedgerEntry,
} from './mcp-operational-status'

describe('buildProfileMcpStatus', () => {
  it('does not claim MCP success when a profile has no James MCP server configured', () => {
    const status = buildProfileMcpStatus('default', {})

    expect(status.mcpAvailable).toBe(false)
    expect(status.layers.sensor.status).toBe('disabled')
    expect(status.layers.sensor.reason).toBe('mcp_not_configured_for_profile')
    expect(status.layers.planner.status).toBe('disabled')
    expect(status.layers.operator.status).toBe('disabled')
    expect(status.lastLedgerEntry).toBeNull()
  })

  it('shows Sensor only for hermes-ops-readonly with a configured James MCP server', () => {
    const status = buildProfileMcpStatus('hermes-ops-readonly', {
      mcp_servers: {
        'james-readonly-v0': { command: 'python', args: ['server.py'] },
      },
    })

    expect(status.mcpAvailable).toBe(true)
    expect(status.layers.sensor.status).toBe('enabled')
    expect(status.layers.sensor.riskClass).toBe('R0')
    expect(status.layers.planner.status).toBe('disabled')
    expect(status.layers.planner.reason).toBe('read_only_profile_policy')
    expect(status.layers.operator.status).toBe('disabled')
    expect(JSON.stringify(status.blockedGates)).toContain('whatsapp-real')
  })

  it('shows Sensor, Planner, and restricted Operator for hermes-ops-exec with a configured James MCP server', () => {
    const status = buildProfileMcpStatus('hermes-ops-exec', {
      mcp_servers: {
        'james-ops-v0': { command: 'python', args: ['server.py'] },
      },
    })

    expect(status.mcpAvailable).toBe(true)
    expect(status.layers.sensor.status).toBe('enabled')
    expect(status.layers.planner.status).toBe('enabled')
    expect(status.layers.operator.status).toBe('enabled')
    expect(status.layers.operator.riskClass).toBe('R2')
    expect(status.blockedGates.length).toBeGreaterThan(0)
    expect(JSON.stringify(status.blockedGates)).toContain('t29')
  })

  it('does not claim MCP success when James MCP server is explicitly disabled (enabled:false)', () => {
    const status = buildProfileMcpStatus('hermes-ops-exec', {
      mcp_servers: {
        'james-ops-v0': { command: 'python', args: ['server.py'], enabled: false },
      },
    })

    expect(status.mcpAvailable).toBe(false)
    expect(status.source).toBe('not-configured')
    expect(status.layers.sensor.status).toBe('disabled')
    expect(status.layers.planner.status).toBe('disabled')
    expect(status.layers.operator.status).toBe('disabled')
    expect(status.lastLedgerEntry).toBeNull()
  })
})

describe('readLastMcpLedgerEntry', () => {
  let tempHome: string

  beforeEach(() => {
    tempHome = fs.mkdtempSync(path.join(os.tmpdir(), 'mcp-ledger-'))
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-06-07T12:00:00Z'))
  })

  afterEach(() => {
    vi.useRealTimers()
    fs.rmSync(tempHome, { recursive: true, force: true })
  })

  it('returns null when no ledger exists instead of fabricating success', () => {
    expect(readLastMcpLedgerEntry(path.join(tempHome, 'missing.jsonl'))).toBeNull()
  })

  it('returns the newest valid ledger entry summary without exposing inputs', () => {
    const ledgerPath = path.join(tempHome, 'ledger.jsonl')
    fs.writeFileSync(
      ledgerPath,
      [
        JSON.stringify({ sequence: 1, tool: 'old_tool', result: { ok: true }, inputs: { secret: 'hidden' } }),
        'not-json',
        JSON.stringify({
          sequence: 2,
          timestamp: '2026-06-07T11:00:00Z',
          actor: 'hermes-ops-exec',
          tool: 'james_kanban_plan_tasks',
          risk_class: 'R1',
          dry_run: true,
          result: { ok: true },
          inputs: { task: 'do not return raw inputs' },
        }),
      ].join('\n') + '\n',
      'utf-8',
    )

    expect(readLastMcpLedgerEntry(ledgerPath)).toEqual({
      sequence: 2,
      timestamp: '2026-06-07T11:00:00Z',
      actor: 'hermes-ops-exec',
      tool: 'james_kanban_plan_tasks',
      riskClass: 'R1',
      dryRun: true,
      ok: true,
    })
  })

  it('does not leak global ledger entry into profiles without James MCP configured', () => {
    const ledgerPath = path.join(tempHome, 'cross-profile-ledger.jsonl')
    fs.writeFileSync(
      ledgerPath,
      JSON.stringify({ sequence: 99, tool: 'james_kanban_plan_tasks', result: { ok: true } }) + '\n',
      'utf-8',
    )

    const status = buildProfileMcpStatus('default', {}, { ledgerPath })

    expect(status.mcpAvailable).toBe(false)
    expect(status.lastLedgerEntry).toBeNull()
  })
})
