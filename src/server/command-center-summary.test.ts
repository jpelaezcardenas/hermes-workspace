import { describe, expect, it } from 'vitest'
import { buildCommandCenterSummary } from './command-center-summary'

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  })
}

describe('command center summary', () => {
  it('fans in safe command-center sources into the shared envelope', async () => {
    const fetcher = async (input: string | URL): Promise<Response> => {
      const path = new URL(input).pathname
      if (path === '/api/cael-status') {
        return jsonResponse({
          ok: true,
          generatedAt: '2026-05-24T00:00:00.000Z',
          host: 'BigMac',
          posture: {
            bind: '100.97.216.111:3077',
            remoteAccess: 'Tailscale-only',
            auth: 'enabled',
            publicInternet: 'disabled',
          },
          services: [
            {
              id: 'workspace',
              label: 'Workspace',
              ok: true,
              lane: 'personal',
              owner: 'Cael',
              detail: 'HTTP 200',
              latencyMs: 12,
            },
          ],
          links: [{ label: 'Usage', href: '/usage' }],
          contract: { id: 'cael-command-center' },
        })
      }
      if (path === '/api/usage/limits') {
        return jsonResponse({
          ok: true,
          enabledProviders: ['codex'],
          providers: [
            {
              id: 'codex',
              label: 'Codex',
              status: 'ok',
              confidence: 'live',
              monitorKind: 'cael',
              caelDefault: true,
              caelModel: 'gpt-5.5',
              primary: {
                label: 'weekly',
                usedPercent: 25,
                remainingPercent: 75,
                resetsAt: null,
              },
            },
          ],
        })
      }
      if (path === '/api/integrations/status') {
        return jsonResponse({
          ok: true,
          integrations: [
            {
              id: 'vaultwarden',
              label: 'Vaultwarden',
              status: 'ready',
              detail: 'unlocked',
              safeMode: 'reference-only',
            },
          ],
        })
      }
      if (path === '/api/cael-n8n-governance') {
        return jsonResponse({
          ok: true,
          boundary: 'personal and business lanes stay separate',
          instances: [
            {
              id: 'personal-bigmac',
              label: 'Personal n8n',
              scope: 'personal',
              boundary: 'personal only',
              health: { ok: true },
              failures: [],
            },
          ],
          safeWorkflowCommands: [
            {
              id: 'business-dry-run-smoke',
              label: 'Business dry run',
              status: 'approval_gated',
              riskLevel: 'production_mutation',
              approvalRequired: true,
              dryRunSupported: true,
              description: 'requires approval',
            },
          ],
          promotionReceipts: [
            {
              title: 'chat recovery receipt',
              path: '/Users/cderamos/.hermes/receipts/chat.md',
              updatedAt: '2026-05-24T01:00:00.000Z',
              instance: 'personal-bigmac',
            },
          ],
        })
      }
      if (path === '/api/second-brain/sources') {
        return jsonResponse({
          ok: true,
          sources: [
            {
              id: 'personal-kv',
              label: 'Personal Knowledge Vault',
              category: 'personal',
              status: 'available',
              writable: false,
            },
          ],
        })
      }
      return jsonResponse({ ok: false }, 404)
    }

    const envelope = await buildCommandCenterSummary({
      requestUrl: 'http://100.97.216.111:3077/api/command-center/summary',
      cookie: 'claude-auth=test',
      fetcher,
      includeChatRuns: false,
    })

    expect(envelope.ok).toBe(true)
    expect(envelope.source).toBe('cael-workspace:3077')
    expect(envelope.scope).toBe('mixed')
    expect(envelope.data?.posture?.host).toBe('BigMac')
    expect(envelope.data?.usage?.enabledProviders).toEqual(['codex'])
    expect(envelope.data?.actionGates[0]?.approvalRequired).toBe(true)
    expect(envelope.data?.agentRuns[0]?.title).toBe('chat recovery receipt')
    expect(envelope.links?.[0]).toEqual({
      label: 'Usage',
      href: '/usage',
      kind: 'local',
    })
  })

  it('degrades optional dependencies without failing the required status source', async () => {
    const fetcher = async (input: string | URL): Promise<Response> => {
      const path = new URL(input).pathname
      if (path === '/api/cael-status') {
        return jsonResponse({
          ok: true,
          host: 'BigMac',
          posture: {},
          services: [],
          links: [],
        })
      }
      return jsonResponse({ ok: false }, 503)
    }

    const envelope = await buildCommandCenterSummary({
      requestUrl: 'http://100.97.216.111:3077/api/command-center/summary',
      fetcher,
      includeChatRuns: false,
    })

    expect(envelope.errors).toEqual([])
    expect(envelope.warnings).toEqual(
      expect.arrayContaining([
        'Usage limits: HTTP 503',
        'Integrations: HTTP 503',
        'n8n governance: HTTP 503',
        'Second brain sources: HTTP 503',
      ]),
    )
    expect(envelope.data?.systems).toEqual([])
  })

  it('keeps a partial summary renderable when the status source times out', async () => {
    const fetcher = async (input: string | URL): Promise<Response> => {
      const path = new URL(input).pathname
      if (path === '/api/cael-status') {
        throw new DOMException('The operation was aborted.', 'AbortError')
      }
      return jsonResponse({ ok: false }, 503)
    }

    const envelope = await buildCommandCenterSummary({
      requestUrl: 'http://100.97.216.111:3077/api/command-center/summary',
      fetcher,
      includeChatRuns: false,
    })

    expect(envelope.ok).toBe(false)
    expect(envelope.warnings).toEqual(
      expect.arrayContaining(['Cael status: The operation was aborted.']),
    )
    expect(envelope.errors).toEqual([])
    expect(envelope.data).not.toBeNull()
    expect(envelope.data?.posture).toBeNull()
    expect(envelope.data?.nowNext[0]?.label).toBe('Runtime needs attention')
  })

})
