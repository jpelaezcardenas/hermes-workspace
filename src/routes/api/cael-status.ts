import { createFileRoute } from '@tanstack/react-router'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { requireLocalOrAuth } from '../../server/auth-middleware'

const execFileAsync = promisify(execFile)

type ServiceCheck = {
  id: string
  label: string
  kind: 'http' | 'tcp' | 'command' | 'path'
  target: string
  ok: boolean
  detail: string
  latencyMs?: number
}

type CaelStatusResponse = {
  ok: boolean
  generatedAt: string
  host: string
  posture: {
    bind: string
    remoteAccess: string
    auth: string
    publicInternet: string
  }
  services: ServiceCheck[]
  links: Array<{ label: string; href: string; description: string }>
}

async function checkHttp(id: string, label: string, target: string): Promise<ServiceCheck> {
  const start = Date.now()
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 2500)
    const response = await fetch(target, { method: 'GET', signal: controller.signal })
    clearTimeout(timeout)
    return {
      id,
      label,
      kind: 'http',
      target,
      ok: response.ok,
      detail: `HTTP ${response.status}`,
      latencyMs: Date.now() - start,
    }
  } catch (error) {
    return {
      id,
      label,
      kind: 'http',
      target,
      ok: false,
      detail: error instanceof Error ? error.message : String(error),
      latencyMs: Date.now() - start,
    }
  }
}

async function checkCommand(id: string, label: string, command: string, args: string[] = []): Promise<ServiceCheck> {
  const start = Date.now()
  try {
    const { stdout } = await execFileAsync(command, args, { timeout: 3500, maxBuffer: 16_384 })
    return {
      id,
      label,
      kind: 'command',
      target: [command, ...args].join(' '),
      ok: true,
      detail: stdout.trim().split('\n').slice(0, 2).join(' · ') || 'ok',
      latencyMs: Date.now() - start,
    }
  } catch (error) {
    return {
      id,
      label,
      kind: 'command',
      target: [command, ...args].join(' '),
      ok: false,
      detail: error instanceof Error ? error.message : String(error),
      latencyMs: Date.now() - start,
    }
  }
}

export const Route = createFileRoute('/api/cael-status')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        if (!requireLocalOrAuth(request)) {
          return Response.json({ ok: false, error: 'Authentication required' }, { status: 401 })
        }

        const services = await Promise.all([
          checkHttp('workspace', 'Cael Workspace', 'http://100.97.216.111:3077'),
          checkHttp('hermes-api', 'Hermes API Server', 'http://127.0.0.1:8642/health'),
          checkHttp('knowledge-vault', 'Personal Knowledge Vault', 'http://127.0.0.1:8767/health'),
          checkHttp('personal-n8n', 'Personal n8n', 'http://127.0.0.1:5681/healthz'),
          checkHttp('kb-dashboard', 'KB Brain Dashboard', 'http://127.0.0.1:3720'),
          checkHttp('twenty-homebase', 'Legacy Twenty Homebase', 'http://127.0.0.1:3020'),
          checkCommand('tailscale', 'Tailscale Mesh', '/Applications/Tailscale.app/Contents/MacOS/Tailscale', ['status', '--self']),
        ])

        const host = await checkCommand('hostname', 'Host', '/bin/hostname')

        return Response.json(
          {
            ok: services.every((service) => service.ok),
            generatedAt: new Date().toISOString(),
            host: host.detail || 'BigMac',
            posture: {
              bind: '100.97.216.111:3077',
              remoteAccess: 'Tailscale-only browser/PWA access; Screen Sharing remains available for native desktop.',
              auth: 'Workspace password + Hermes API bearer key; no public funnel configured.',
              publicInternet: 'disabled',
            },
            services,
            links: [
              { label: 'Desktop App', href: '/desktop', description: 'Download/install the native macOS Cael companion.' },
              { label: 'Chat', href: '/chat', description: 'Talk to Cael through Hermes Agent.' },
              { label: 'Conductor', href: '/conductor', description: 'Dispatch mission-style autonomous work.' },
              { label: 'Operations', href: '/operations', description: 'Inspect agent/worker operations.' },
              { label: 'Memory', href: '/memory', description: 'Browse Hermes memory and Knowledge Vault surfaces.' },
              { label: 'Terminal', href: '/terminal', description: 'Operate BigMac from the browser.' },
              { label: 'Tasks', href: '/tasks', description: 'Track autonomous work lanes.' },
            ],
          } satisfies CaelStatusResponse,
          { status: 200 },
        )
      },
    },
  },
})
