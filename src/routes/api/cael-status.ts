import { createFileRoute } from '@tanstack/react-router'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { requireLocalOrAuth } from '../../server/auth-middleware'
import {
  buildCommandCenterContract,
  type CommandCenterContract,
} from '../../server/command-center-contract'

const execFileAsync = promisify(execFile)

type ServiceLane = 'personal' | 'local' | 'business' | 'legacy'

type ServiceCheck = {
  id: string
  label: string
  kind: 'http' | 'tcp' | 'command' | 'path'
  target: string
  ok: boolean
  detail: string
  lane: ServiceLane
  owner: string
  description: string
  latencyMs?: number
}

type ContextSurface = {
  surface: string
  owner: string
  context: string
  access: string
  boundary: string
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
  contextSurfaces: ContextSurface[]
  links: Array<{ label: string; href: string; description: string }>
  contract: CommandCenterContract
}

type CheckOptions = {
  lane: ServiceLane
  owner: string
  description: string
  timeoutMs?: number
}

function collapseDetail(value: string): string {
  return value
    .replace(
      /(password|passwd|token|secret|service[_-]?key|api[_-]?key|bearer)\s*[:=]\s*[^\s'";,]+/gi,
      '$1=REDACTED',
    )
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(0, 3)
    .join(' · ')
    .slice(0, 420)
}

async function checkHttp(
  id: string,
  label: string,
  target: string,
  options: CheckOptions,
): Promise<ServiceCheck> {
  const start = Date.now()
  try {
    const controller = new AbortController()
    const timeout = setTimeout(
      () => controller.abort(),
      options.timeoutMs ?? 2500,
    )
    const response = await fetch(target, {
      method: 'GET',
      signal: controller.signal,
    })
    clearTimeout(timeout)
    return {
      id,
      label,
      kind: 'http',
      target,
      ok: response.ok,
      detail: `HTTP ${response.status}`,
      lane: options.lane,
      owner: options.owner,
      description: options.description,
      latencyMs: Date.now() - start,
    }
  } catch (error) {
    return {
      id,
      label,
      kind: 'http',
      target,
      ok: false,
      detail: collapseDetail(
        error instanceof Error ? error.message : String(error),
      ),
      lane: options.lane,
      owner: options.owner,
      description: options.description,
      latencyMs: Date.now() - start,
    }
  }
}

async function checkCommand(
  id: string,
  label: string,
  command: string,
  args: string[] = [],
  options: CheckOptions,
): Promise<ServiceCheck> {
  const start = Date.now()
  try {
    const { stdout } = await execFileAsync(command, args, {
      timeout: options.timeoutMs ?? 4000,
      maxBuffer: 16_384,
    })
    return {
      id,
      label,
      kind: 'command',
      target: [command, ...args].join(' '),
      ok: true,
      detail: collapseDetail(stdout) || 'ok',
      lane: options.lane,
      owner: options.owner,
      description: options.description,
      latencyMs: Date.now() - start,
    }
  } catch (error) {
    return {
      id,
      label,
      kind: 'command',
      target: [command, ...args].join(' '),
      ok: false,
      detail: collapseDetail(
        error instanceof Error ? error.message : String(error),
      ),
      lane: options.lane,
      owner: options.owner,
      description: options.description,
      latencyMs: Date.now() - start,
    }
  }
}

const contextSurfaces: ContextSurface[] = [
  {
    surface: 'Cael Workspace / PWA',
    owner: 'BigMac personal lane',
    context:
      'Christian-facing cockpit for chat, status, tasks, receipts, memory, workflows, and approvals.',
    access:
      'Tailscale browser surface on 100.97.216.111:3077 with workspace auth.',
    boundary:
      'UI can be remote over Tailscale; execution APIs stay local unless explicitly bridged.',
  },
  {
    surface: 'Hermes Dashboard local API',
    owner: 'BigMac local-only agent lane',
    context:
      'Sessions, skills, config, jobs, kanban, and enhanced Hermes metadata.',
    access: '127.0.0.1:9119 from Workspace/desktop on the host.',
    boundary:
      'Not a public or broad mesh surface; status only shows reachability, never tokens.',
  },
  {
    surface: 'Personal device mesh',
    owner: 'Tailscale',
    context:
      'BigMac and MBP reachability for personal Cael operations and native/SSH support.',
    access:
      'MagicDNS/IP checks plus the dedicated mbp SSH alias when the MBP is awake.',
    boundary:
      'Personal lane only; sleep/offline MBP is a physical availability boundary.',
  },
  {
    surface: 'Business/dev-server lane',
    owner: 'Twingate + devserver-tg',
    context:
      'Visual Graphx/dev-server access, including business n8n and protected ops services.',
    access: 'Headless Twingate in Colima and scoped SSH alias devserver-tg.',
    boundary:
      'Business lane stays separate from personal Tailscale; service keys and secrets are never displayed.',
  },
]

export const Route = createFileRoute('/api/cael-status')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        if (!requireLocalOrAuth(request)) {
          return Response.json(
            { ok: false, error: 'Authentication required' },
            { status: 401 },
          )
        }

        const services = await Promise.all([
          checkHttp(
            'workspace',
            'Cael Workspace :3077',
            'http://100.97.216.111:3077/cael-home',
            {
              lane: 'personal',
              owner: 'Cael Workspace / BigMac',
              description:
                'Primary cockpit exposed only on the personal Tailscale mesh.',
            },
          ),
          checkHttp(
            'hermes-gateway',
            'Hermes Gateway API',
            'http://127.0.0.1:8642/health',
            {
              lane: 'local',
              owner: 'Hermes Agent on BigMac',
              description:
                'Local execution/chat gateway used by Workspace and Desktop.',
            },
          ),
          checkHttp(
            'hermes-dashboard',
            'Hermes Dashboard local API',
            'http://127.0.0.1:9119/api/status',
            {
              lane: 'local',
              owner: 'Hermes Agent on BigMac',
              description:
                'Local-only dashboard APIs for sessions, skills, config, jobs, and kanban.',
            },
          ),
          checkHttp(
            'knowledge-vault',
            'Personal Knowledge Vault',
            'http://127.0.0.1:8767/health',
            {
              lane: 'local',
              owner: 'BigMac personal memory lane',
              description:
                'Durable personal memory/receipts backend; not the business source of truth.',
            },
          ),
          checkHttp(
            'personal-n8n',
            'Personal n8n',
            'http://127.0.0.1:5681/healthz',
            {
              lane: 'local',
              owner: 'BigMac personal automation lane',
              description:
                'Personal automation dispatcher, separate from dev-server/business n8n.',
            },
          ),
          checkHttp(
            'kb-dashboard',
            'KB Brain Dashboard',
            'http://127.0.0.1:3720',
            {
              lane: 'local',
              owner: 'BigMac read-first brain cockpit',
              description:
                'Read-first dashboard over Personal Brain, Business Brain, n8n health, and receipts.',
            },
          ),
          checkHttp(
            'twenty-homebase',
            'Legacy Twenty Homebase',
            'http://127.0.0.1:3020',
            {
              lane: 'legacy',
              owner: 'Legacy migration lane',
              description:
                'Kept online only for export/inventory until intentionally archived.',
            },
          ),
          checkCommand(
            'tailscale-self',
            'BigMac Tailscale node',
            '/Applications/Tailscale.app/Contents/MacOS/Tailscale',
            ['ip', '-4'],
            {
              lane: 'personal',
              owner: 'Tailscale personal mesh',
              description:
                'Confirms BigMac has a personal Tailscale IPv4 address without listing peer devices.',
            },
          ),
          checkCommand(
            'tailscale-mbp',
            'MBP Tailscale/SSH alias',
            '/usr/bin/ssh',
            [
              '-o',
              'BatchMode=yes',
              '-o',
              'ConnectTimeout=4',
              'mbp',
              'hostname; whoami',
            ],
            {
              lane: 'personal',
              owner: 'Tailscale personal mesh',
              description:
                'Confirms the MBP is awake/reachable through the dedicated mbp SSH alias.',
              timeoutMs: 6500,
            },
          ),
          checkCommand(
            'devserver-twingate',
            'Dev-server Twingate SSH lane',
            '/usr/bin/ssh',
            [
              '-o',
              'BatchMode=yes',
              '-o',
              'ConnectTimeout=5',
              'devserver-tg',
              'hostname; whoami; curl -fsS --max-time 4 http://127.0.0.1:5678/healthz',
            ],
            {
              lane: 'business',
              owner: 'Twingate business/dev-server lane',
              description:
                'Confirms scoped business access to dev-server and its local n8n health endpoint.',
              timeoutMs: 9000,
            },
          ),
          checkCommand(
            'twingate-status-script',
            'Twingate lane status script',
            '/bin/test',
            [
              '-x',
              '/Users/cderamos/.hermes/twingate-devserver-access/bin/status.sh',
            ],
            {
              lane: 'business',
              owner: 'Twingate business/dev-server lane',
              description:
                'Confirms the non-secret operational status script is installed and executable.',
            },
          ),
        ])

        const host = await checkCommand(
          'hostname',
          'Host',
          '/bin/hostname',
          [],
          {
            lane: 'local',
            owner: 'BigMac',
            description: 'Host identity for this status snapshot.',
          },
        )

        const generatedAt = new Date().toISOString()

        return Response.json(
          {
            ok: services.every((service) => service.ok),
            generatedAt,
            host: host.detail || 'BigMac',
            posture: {
              bind: '100.97.216.111:3077',
              remoteAccess:
                'Tailscale-only browser/PWA access; Screen Sharing remains available for native desktop.',
              auth: 'Workspace password + local Hermes API credentials; raw secrets are never exposed here.',
              publicInternet: 'disabled',
            },
            services,
            contextSurfaces,
            links: [
              {
                label: 'Desktop App',
                href: '/desktop',
                description:
                  'Download/install the native macOS Cael companion.',
              },
              {
                label: 'Usage',
                href: '/usage',
                description:
                  'Provider remaining limits, reset windows, credits, and freshness.',
              },
              {
                label: 'Mail',
                href: '/mail',
                description:
                  'Read/search inbox, summarize threads, and draft replies safely.',
              },
              {
                label: 'Contacts',
                href: '/contacts',
                description:
                  'Manage Twenty legacy + Google People contacts read-only first.',
              },
              {
                label: 'Calendar',
                href: '/calendar',
                description:
                  'Agenda, daily brief, and approval-gated scheduling.',
              },
              {
                label: 'Integrations',
                href: '/integrations',
                description:
                  'Check Google, Vaultwarden, and Twenty migration readiness.',
              },
              {
                label: 'Chat',
                href: '/chat',
                description: 'Talk to Cael through Hermes Agent.',
              },
              {
                label: 'Conductor',
                href: '/conductor',
                description: 'Dispatch mission-style autonomous work.',
              },
              {
                label: 'Operations',
                href: '/operations',
                description: 'Inspect agent/worker operations.',
              },
              {
                label: 'Memory',
                href: '/memory',
                description:
                  'Browse Hermes memory and Knowledge Vault surfaces.',
              },
              {
                label: 'Terminal',
                href: '/terminal',
                description: 'Operate BigMac from the browser.',
              },
              {
                label: 'Tasks',
                href: '/tasks',
                description: 'Track autonomous work lanes.',
              },
            ],
            contract: buildCommandCenterContract(generatedAt),
          } satisfies CaelStatusResponse,
          { status: 200 },
        )
      },
    },
  },
})
