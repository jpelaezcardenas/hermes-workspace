import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  buildCommandCenterActionGates,
  buildCommandCenterHomebaseRecords,
  buildCommandCenterMemoryArtifacts,
  buildCommandCenterVaultRefs,
} from './command-center-sections'

function requestOptions() {
  return { requestUrl: 'http://100.97.216.111:3077/api/command-center/test' }
}

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  })
}

describe('command center section endpoints', () => {
  const envBackup = { ...process.env }

  afterEach(() => {
    process.env = { ...envBackup }
    vi.restoreAllMocks()
  })

  it('returns Vaultwarden references without raw secret values', async () => {
    const envelope = await buildCommandCenterVaultRefs(requestOptions())

    expect(envelope.ok).toBe(true)
    expect(envelope.data?.refs.length).toBeGreaterThan(0)
    expect(envelope.data?.refs.every((ref) => ref.secretValue === null)).toBe(
      true,
    )
    expect(JSON.stringify(envelope)).not.toMatch(/secretValue":"(?!null)/)
  })

  it('keeps action gates approval-oriented and explicit about side effects', async () => {
    const envelope = await buildCommandCenterActionGates(requestOptions())

    expect(envelope.ok).toBe(true)
    expect(
      envelope.data?.actions.some(
        (action) => action.id === 'vaultwarden-secret-management',
      ),
    ).toBe(true)
    expect(envelope.data?.approvalRequired).toBeGreaterThan(0)
    expect(
      envelope.data?.actions.every((action) => action.sideEffects.length > 0),
    ).toBe(true)
  })

  it('redacts secret-like markdown when listing memory artifacts', async () => {
    const root = fs.mkdtempSync(
      path.join(os.tmpdir(), 'cael-memory-artifacts-'),
    )
    process.env.MEMORY_ARTIFACT_ROOT = root
    fs.writeFileSync(
      path.join(root, 'artifact.md'),
      '# Artifact\n\npassword=do-not-commit\nBearer abcdefghijklmnopqrstuvwxyz\nVisible note.',
      'utf8',
    )

    const envelope = await buildCommandCenterMemoryArtifacts(requestOptions())

    expect(envelope.ok).toBe(true)
    expect(envelope.data?.artifacts[0]?.sensitivity).toBe('secret_ref')
    expect(envelope.data?.artifacts[0]?.excerpt).not.toContain('do-not-commit')
    expect(envelope.data?.artifacts[0]?.excerpt).not.toContain(
      'abcdefghijklmnopqrstuvwxyz',
    )
  })

  it('uses the Twenty bearer token only server-side and returns reduced Homebase records', async () => {
    process.env.TWENTY_API_BEARER_TOKEN = 'unit-token-value'
    process.env.TWENTY_API_BASE_URL = 'http://twenty.test'
    const fetcher = vi.fn(async (_input: string | URL, init?: RequestInit) => {
      expect(init?.headers).toMatchObject({
        authorization: 'Bearer unit-token-value',
      })
      return jsonResponse({
        data: {
          tasks: {
            totalCount: 1,
            edges: [
              {
                node: {
                  id: 'task-1',
                  title: 'Review command center',
                  updatedAt: '2026-05-24T00:00:00.000Z',
                },
              },
            ],
          },
          people: { totalCount: 0, edges: [] },
          meetingRecords: { totalCount: 0, edges: [] },
          messages: { totalCount: 0, edges: [] },
          calendarEvents: { totalCount: 0, edges: [] },
          approvalRequests: { totalCount: 0, edges: [] },
        },
      })
    })

    const envelope = await buildCommandCenterHomebaseRecords({
      ...requestOptions(),
      fetcher,
    })

    expect(envelope.ok).toBe(true)
    expect(envelope.data?.status).toBe('available')
    expect(envelope.data?.records).toEqual([
      {
        id: 'task:task-1',
        label: 'Review command center',
        kind: 'task',
        updatedAt: '2026-05-24T00:00:00.000Z',
      },
    ])
    expect(JSON.stringify(envelope)).not.toContain('unit-token-value')
  })
})
