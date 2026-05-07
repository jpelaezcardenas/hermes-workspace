import { execFileSync } from 'node:child_process'
import { existsSync, readFileSync, statSync } from 'node:fs'
import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import { isAuthenticated } from '../../server/auth-middleware'

type ServiceId =
  | 'hermes-workspace'
  | 'hermes-seven'
  | 'hermes-atlas'
  | 'hermes-neo'

const SERVICES: Array<{ id: ServiceId; label: string; role: string }> = [
  {
    id: 'hermes-workspace',
    label: 'Workspace',
    role: 'TanStack Start dashboard',
  },
  { id: 'hermes-seven', label: 'Seven', role: 'Chief of Staff' },
  { id: 'hermes-atlas', label: 'Atlas', role: 'Infra and Security' },
  { id: 'hermes-neo', label: 'Neo', role: 'Finance and Market Intel' },
]

const STATE_FILES = [
  {
    id: 'active-state',
    label: 'LL Empire active state',
    path: '/home/lucas/llempire/ACTIVE_STATE.md',
  },
  {
    id: 'shared-state',
    label: 'Shared state handoff',
    path: '/home/lucas/llempire/SHARED_STATE.md',
  },
  {
    id: 'ops-status',
    label: 'Ops status snapshot',
    path: '/home/lucas/llempire/ops/status.json',
  },
]

function readServiceStatus(service: ServiceId) {
  try {
    const status = execFileSync('systemctl', ['is-active', service], {
      encoding: 'utf-8',
      timeout: 2_000,
    }).trim()

    return {
      id: service,
      active: status === 'active',
      status,
    }
  } catch {
    return {
      id: service,
      active: false,
      status: 'unknown',
    }
  }
}

function readFileMeta(path: string) {
  if (!existsSync(path)) {
    return {
      exists: false,
      modifiedAt: null,
      size: 0,
    }
  }

  const stats = statSync(path)
  return {
    exists: true,
    modifiedAt: stats.mtime.toISOString(),
    size: stats.size,
  }
}

function readTextTail(path: string, maxChars: number) {
  if (!existsSync(path)) return ''
  const text = readFileSync(path, 'utf-8')
  return text.length > maxChars ? text.slice(text.length - maxChars) : text
}

function extractRecentSharedEntries(text: string) {
  const matches = Array.from(text.matchAll(/^## \[([^\]]+)\]\s+(.+)$/gm))
  return matches
    .slice(-4)
    .reverse()
    .map((match) => ({
      timestamp: match[1],
      title: match[2],
    }))
}

function extractActiveWorkspaces(text: string) {
  const rows = text
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.startsWith('|') && line.includes('`~/Projects/'))

  return rows.map((row) => {
    const cells = row
      .split('|')
      .map((cell) => cell.trim())
      .filter(Boolean)
    return {
      workspace: cells[0] ?? 'Unknown',
      path: (cells[1] ?? '').replace(/`/g, ''),
      state: cells[2] ?? 'unknown',
    }
  })
}

function readOpsStatus(path: string) {
  if (!existsSync(path)) return null
  try {
    const raw = JSON.parse(readFileSync(path, 'utf-8')) as Record<
      string,
      unknown
    >
    return {
      generatedAt: raw.generated_at ?? raw.generatedAt ?? raw.timestamp ?? null,
      summary: raw.summary ?? raw.status ?? null,
    }
  } catch {
    return null
  }
}

export const Route = createFileRoute('/api/ll-ops-status')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        if (!isAuthenticated(request)) {
          return json({ error: 'Unauthorized' }, { status: 401 })
        }

        const services = SERVICES.map((service) => ({
          ...service,
          ...readServiceStatus(service.id),
        }))
        const sharedStateText = readTextTail(
          '/home/lucas/llempire/SHARED_STATE.md',
          16_000,
        )
        const activeStateText = readTextTail(
          '/home/lucas/llempire/ACTIVE_STATE.md',
          24_000,
        )

        return json({
          fetchedAt: new Date().toISOString(),
          services,
          stateFiles: STATE_FILES.map((file) => ({
            ...file,
            ...readFileMeta(file.path),
          })),
          recentSharedEntries: extractRecentSharedEntries(sharedStateText),
          activeWorkspaces: extractActiveWorkspaces(activeStateText),
          opsStatus: readOpsStatus('/home/lucas/llempire/ops/status.json'),
        })
      },
    },
  },
})
