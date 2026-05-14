import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'

type JsonRecord = Record<string, unknown>

const REPOS_ROOT = '/root/hermes-data/repos'
const LAB_PREFIX = 'weatherbot-lab-'
const FALLBACK_ROOTS = ['/root/hermes-data/repos/weatherbot-lab-20260513-214224']
const TRACE_DIR = 'data/trace'
const STATE_FILE = 'data/state.json'
const METRICS_FILE = `${TRACE_DIR}/metrics.json`
const DASHBOARD_FILE = `${TRACE_DIR}/dashboard.txt`
const EVENTS_FILE = `${TRACE_DIR}/events.jsonl`

function pickLatestWeatherbotRoot(): string | null {
  const candidates: Array<{ path: string; mtimeMs: number }> = []

  if (existsSync(REPOS_ROOT)) {
    for (const entry of readdirSync(REPOS_ROOT, { withFileTypes: true })) {
      if (!entry.isDirectory() || !entry.name.startsWith(LAB_PREFIX)) continue
      const candidate = join(REPOS_ROOT, entry.name)
      try {
        candidates.push({ path: candidate, mtimeMs: statSync(candidate).mtimeMs })
      } catch {
        // Ignore unreadable repos and continue scanning.
      }
    }
  }

  candidates.sort((a, b) => b.mtimeMs - a.mtimeMs)
  if (candidates[0]) return candidates[0].path

  for (const fallback of FALLBACK_ROOTS) {
    if (existsSync(fallback)) return fallback
  }

  return null
}

function readJson<T>(path: string, fallback: T): T {
  try {
    return JSON.parse(readFileSync(path, 'utf8')) as T
  } catch {
    return fallback
  }
}

function readText(path: string): string | null {
  try {
    return readFileSync(path, 'utf8')
  } catch {
    return null
  }
}

function tailJsonLines(path: string, limit = 20): Array<JsonRecord> {
  const text = readText(path)
  if (!text) return []

  const lines = text.split(/\r?\n/).filter(Boolean)
  const slice = lines.slice(Math.max(0, lines.length - limit))
  const parsed: Array<JsonRecord> = []

  for (const line of slice) {
    try {
      parsed.push(JSON.parse(line) as JsonRecord)
    } catch {
      parsed.push({ raw: line })
    }
  }

  return parsed
}

function numberOrNull(value: unknown): number | null {
  return typeof value === 'number' && Number.isFinite(value) ? value : null
}

export const Route = createFileRoute('/api/weatherbot')({
  server: {
    handlers: {
      GET: async () => {
        const repoPath = pickLatestWeatherbotRoot()
        if (!repoPath) {
          return json(
            {
              ok: false,
              error: 'weatherbot_root_not_found',
            },
            { status: 404 },
          )
        }

        const statePath = join(repoPath, STATE_FILE)
        const metricsPath = join(repoPath, METRICS_FILE)
        const dashboardPath = join(repoPath, DASHBOARD_FILE)
        const eventsPath = join(repoPath, EVENTS_FILE)

        const state = readJson<Record<string, unknown>>(statePath, {})
        const metrics = readJson<Record<string, unknown>>(metricsPath, {})
        const dashboardText = readText(dashboardPath)
        const recentEvents = tailJsonLines(eventsPath, 20)

        let metricsUpdatedAtMs: number | null = null
        const metricsTs = typeof metrics.ts === 'string' ? metrics.ts : null
        if (metricsTs) {
          const parsed = Date.parse(metricsTs)
          metricsUpdatedAtMs = Number.isFinite(parsed) ? parsed : null
        }

        const statTargets = [statePath, metricsPath, dashboardPath, eventsPath]
          .filter((path) => existsSync(path))
          .map((path) => {
            try {
              return statSync(path).mtimeMs
            } catch {
              return 0
            }
          })
        const fileMtimeMs = statTargets.length > 0 ? Math.max(...statTargets) : null
        const updatedAtMs = metricsUpdatedAtMs ?? fileMtimeMs
        const ageMs = updatedAtMs ? Math.max(0, Date.now() - updatedAtMs) : null

        const capital = (metrics.capital ?? {}) as Record<string, unknown>
        const marketCounts = (metrics.market_counts ?? {}) as Record<string, unknown>
        const resolvedOutcomes = (metrics.resolved_outcomes ?? {}) as Record<string, unknown>

        const payload = {
          ok: true,
          checkedAt: Date.now(),
          source: {
            repoPath,
            statePath,
            metricsPath,
            dashboardPath,
            eventsPath,
          },
          freshness: {
            updatedAt: metricsTs,
            updatedAtMs,
            ageMs,
            stale: ageMs === null ? true : ageMs > 60 * 60 * 1000,
          },
          stats: {
            cashBalance: numberOrNull(capital.cash_balance),
            equityEstimate: numberOrNull(capital.equity_estimate),
            reservedCapital: numberOrNull(capital.reserved_in_open_positions),
            unrealizedPnl: numberOrNull(capital.unrealized_pnl),
            totalTradesOpened: numberOrNull(state.total_trades),
            wins: numberOrNull(state.wins ?? resolvedOutcomes.wins),
            losses: numberOrNull(state.losses ?? resolvedOutcomes.losses),
            openPositions: numberOrNull(marketCounts.open_positions),
            closedPositions: numberOrNull(marketCounts.closed_positions),
            resolvedMarkets: numberOrNull(marketCounts.resolved_markets),
            totalMarkets: numberOrNull(marketCounts.total),
          },
          breakdowns: (metrics.breakdowns ?? {}) as JsonRecord,
          openPositions: Array.isArray(metrics.open_positions) ? (metrics.open_positions as Array<JsonRecord>) : [],
          recentEvents,
          dashboardText,
          files: {
            metricsMtimeMs: existsSync(metricsPath) ? statSync(metricsPath).mtimeMs : null,
            dashboardMtimeMs: existsSync(dashboardPath) ? statSync(dashboardPath).mtimeMs : null,
            eventsMtimeMs: existsSync(eventsPath) ? statSync(eventsPath).mtimeMs : null,
            eventsCountApprox: readText(eventsPath)?.split(/\r?\n/).filter(Boolean).length ?? 0,
          },
        }

        return json(payload)
      },
    },
  },
})
