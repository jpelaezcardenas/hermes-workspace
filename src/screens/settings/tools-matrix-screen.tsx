/**
 * Tools Matrix — Phase 3B
 *
 * Per-platform toolset enable/disable matrix.
 *   Rows    = toolsets reported by the dashboard (`/api/tools/toolsets`)
 *   Columns = platforms: cli, telegram, discord, slack, email, api_server
 *
 * Platform-scoped toolsets (e.g. discord, discord_admin) are greyed out on
 * platforms where they cannot run; per the `hermes-platform-surfaces` skill,
 * the gateway/CLI refuses to enable them cross-platform anyway. We refuse in
 * UI rather than send a doomed write — clearer feedback, no surprise toast.
 */
import { ArrowLeft01Icon, RefreshIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Link } from '@tanstack/react-router'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/toast'
import { cn } from '@/lib/utils'
import {
  SettingsMobilePills,
  SettingsSidebar,
} from '@/components/settings/settings-sidebar'

type DashboardToolset = {
  name: string
  label?: string
  description?: string
  enabled?: boolean
  available?: boolean
  configured?: boolean
  tools?: Array<string>
}

type ConfigGetResponse = {
  ok: boolean
  payload?: Record<string, unknown>
  error?: string
}

type Platform = 'cli' | 'telegram' | 'discord' | 'slack' | 'email' | 'api_server'

const PLATFORMS: ReadonlyArray<{ id: Platform; label: string }> = [
  { id: 'cli', label: 'CLI' },
  { id: 'telegram', label: 'Telegram' },
  { id: 'discord', label: 'Discord' },
  { id: 'slack', label: 'Slack' },
  { id: 'email', label: 'Email' },
  { id: 'api_server', label: 'API Server' },
]

/**
 * Toolsets that only function on a specific home platform (gateway-bound).
 * Per ~/.hermes/skills/devops/hermes-platform-surfaces/SKILL.md:
 *   "discord, discord_admin → only on --platform discord"
 *   "(similar pattern for any future telegram-admin, slack-admin tools)"
 *
 * If a toolset name matches one of these prefixes/exact-names, we restrict
 * it to the listed home platforms. Anything not in this map is universal.
 */
const PLATFORM_SCOPED: Record<string, ReadonlyArray<Platform>> = {
  discord: ['discord'],
  discord_admin: ['discord'],
  telegram_admin: ['telegram'],
  slack_admin: ['slack'],
}

function homePlatforms(toolsetName: string): ReadonlyArray<Platform> | null {
  if (toolsetName in PLATFORM_SCOPED) return PLATFORM_SCOPED[toolsetName]
  return null
}

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return !!v && typeof v === 'object' && !Array.isArray(v)
}

/**
 * Read tool_overrides.platforms.<plat> from the merged config payload.
 * Returns the array of toolset names enabled for that platform, or null if
 * the platform key is unset (which the gateway treats as "use defaults").
 */
function readPlatformList(
  config: Record<string, unknown> | undefined,
  platform: Platform,
): Array<string> | null {
  if (!config) return null
  const overrides = config.tool_overrides
  if (!isPlainObject(overrides)) return null
  const platforms = overrides.platforms
  if (!isPlainObject(platforms)) return null
  const arr = platforms[platform]
  if (!Array.isArray(arr)) return null
  return arr.filter((x): x is string => typeof x === 'string')
}

/**
 * Fall back to `platform_toolsets.<plat>` (the canonical default list the
 * gateway computes at boot) if `tool_overrides.platforms.<plat>` isn't set.
 */
function readDefaultPlatformList(
  config: Record<string, unknown> | undefined,
  platform: Platform,
): Array<string> {
  if (!config) return []
  const defaults = config.platform_toolsets
  if (!isPlainObject(defaults)) return []
  const arr = defaults[platform]
  if (!Array.isArray(arr)) return []
  return arr.filter((x): x is string => typeof x === 'string')
}

export function ToolsMatrixScreen() {
  const [toolsets, setToolsets] = useState<Array<DashboardToolset>>([])
  const [config, setConfig] = useState<Record<string, unknown> | undefined>(
    undefined,
  )
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState<Set<string>>(new Set())

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const [tsRes, cfgRes] = await Promise.all([
        fetch('/api/dashboard-toolsets', { credentials: 'same-origin' }),
        fetch('/api/config-get', { credentials: 'same-origin' }),
      ])
      if (!tsRes.ok) {
        throw new Error(`dashboard-toolsets ${tsRes.status}`)
      }
      const tsBody = (await tsRes.json()) as
        | Array<DashboardToolset>
        | { ok: false; error: string }
      if (!Array.isArray(tsBody)) {
        throw new Error(tsBody.error || 'Bad toolsets payload')
      }
      const cfgBody = (await cfgRes.json()) as ConfigGetResponse
      if (!cfgBody.ok) {
        throw new Error(cfgBody.error || 'config-get failed')
      }
      setToolsets(tsBody)
      setConfig(cfgBody.payload ?? {})
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void load()
  }, [load])

  /**
   * Effective enabled set for a platform: the override list if present,
   * otherwise the defaults list from `platform_toolsets`.
   */
  const enabledByPlatform = useMemo(() => {
    const out: Record<Platform, Set<string>> = {
      cli: new Set(),
      telegram: new Set(),
      discord: new Set(),
      slack: new Set(),
      email: new Set(),
      api_server: new Set(),
    }
    for (const p of PLATFORMS) {
      const override = readPlatformList(config, p.id)
      const list = override ?? readDefaultPlatformList(config, p.id)
      out[p.id] = new Set(list)
    }
    return out
  }, [config])

  const toggle = useCallback(
    async (toolset: string, platform: Platform, currentlyEnabled: boolean) => {
      const cellKey = `${platform}:${toolset}`
      // Compute the next array for that platform: start from the override if
      // set, else from the default list, then add or remove the toolset.
      const baseline =
        readPlatformList(config, platform) ??
        readDefaultPlatformList(config, platform)
      const next = currentlyEnabled
        ? baseline.filter((x) => x !== toolset)
        : Array.from(new Set([...baseline, toolset])).sort()

      setPending((s) => {
        const n = new Set(s)
        n.add(cellKey)
        return n
      })
      try {
        const res = await fetch('/api/config-patch', {
          method: 'POST',
          credentials: 'same-origin',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            path: ['tool_overrides', 'platforms', platform],
            value: next,
          }),
        })
        const body = (await res.json().catch(() => ({}))) as {
          ok?: boolean
          error?: string
        }
        if (!res.ok || body.ok === false) {
          throw new Error(body.error || `config-patch ${res.status}`)
        }
        // Optimistic: rebuild config locally so the matrix updates without a
        // full reload.
        setConfig((prev) => {
          const draft = isPlainObject(prev) ? { ...prev } : {}
          const overrides = isPlainObject(draft.tool_overrides)
            ? { ...(draft.tool_overrides as Record<string, unknown>) }
            : {}
          const platforms = isPlainObject(overrides.platforms)
            ? { ...(overrides.platforms as Record<string, unknown>) }
            : {}
          platforms[platform] = next
          overrides.platforms = platforms
          draft.tool_overrides = overrides
          return draft
        })
        toast(
          `${currentlyEnabled ? 'Disabled' : 'Enabled'} ${toolset} on ${platform}`,
          { type: 'success' },
        )
      } catch (e) {
        toast(e instanceof Error ? e.message : String(e), { type: 'error' })
      } finally {
        setPending((s) => {
          const n = new Set(s)
          n.delete(cellKey)
          return n
        })
      }
    },
    [config],
  )

  return (
    <div className="min-h-screen bg-surface text-primary-900">
      <main className="relative mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 pt-6 pb-24 sm:px-6 md:flex-row md:gap-6 md:pb-8 lg:pt-8">
        <SettingsSidebar activeId="tools" />
        <SettingsMobilePills activeId="tools" />

        <div className="flex-1 min-w-0 space-y-5">
          <header className="rounded-2xl border border-primary-200 bg-primary-50/80 p-5 shadow-sm">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="space-y-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="-ml-2 w-fit"
                  render={
                    <Link to="/settings" search={{}}>
                      <HugeiconsIcon
                        icon={ArrowLeft01Icon}
                        size={16}
                        strokeWidth={1.8}
                      />
                      Back to Settings
                    </Link>
                  }
                />
                <div>
                  <h1 className="text-lg font-semibold text-primary-900">
                    Tools
                  </h1>
                  <p className="mt-1 text-sm text-primary-600">
                    Per-platform toolset enable/disable. Toggling a cell writes
                    <code className="mx-1 rounded border border-primary-200 bg-primary-100 px-1.5 py-0.5 font-mono text-xs">
                      tool_overrides.platforms.&lt;platform&gt;
                    </code>
                    in your config. Platform-scoped tools (Discord, etc.) are
                    locked to their home platform.
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => void load()}
                disabled={loading}
              >
                <HugeiconsIcon
                  icon={RefreshIcon}
                  size={16}
                  strokeWidth={1.8}
                />
                {loading ? 'Loading…' : 'Refresh'}
              </Button>
            </div>
          </header>

          {error ? (
            <div className="rounded-2xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-600 shadow-sm">
              {error}
            </div>
          ) : null}

          {loading ? (
            <div className="rounded-xl border border-primary-200 bg-primary-100 px-4 py-3 text-sm text-primary-600">
              Loading toolsets…
            </div>
          ) : null}

          {!loading && toolsets.length > 0 ? (
            <section className="rounded-2xl border border-primary-200 bg-primary-50/80 p-4 shadow-sm md:p-5">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px] border-separate border-spacing-0 text-sm">
                  <thead>
                    <tr>
                      <th className="sticky left-0 z-10 bg-primary-50/80 px-3 py-2 text-left font-medium text-primary-700">
                        Toolset
                      </th>
                      {PLATFORMS.map((p) => (
                        <th
                          key={p.id}
                          className="px-3 py-2 text-center font-medium text-primary-700"
                        >
                          {p.label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {toolsets.map((ts) => {
                      const home = homePlatforms(ts.name)
                      return (
                        <tr
                          key={ts.name}
                          className="border-t border-primary-200"
                        >
                          <td className="sticky left-0 z-10 max-w-[220px] bg-primary-50/80 px-3 py-2 align-top">
                            <div className="font-medium text-primary-900">
                              {ts.label || ts.name}
                            </div>
                            <div className="font-mono text-[11px] text-primary-500">
                              {ts.name}
                            </div>
                            {ts.description ? (
                              <div className="mt-1 text-xs text-primary-600">
                                {ts.description}
                              </div>
                            ) : null}
                            {home ? (
                              <div className="mt-1 text-[11px] uppercase tracking-wide text-amber-600">
                                platform-scoped → {home.join(', ')}
                              </div>
                            ) : null}
                          </td>
                          {PLATFORMS.map((p) => {
                            const cellKey = `${p.id}:${ts.name}`
                            const allowed = !home || home.includes(p.id)
                            const enabled = enabledByPlatform[p.id].has(ts.name)
                            const isPending = pending.has(cellKey)
                            const tooltip = !allowed
                              ? `'${ts.name}' is gateway-scoped to ${home!.join(', ')} — the gateway refuses cross-platform enable.`
                              : enabled
                                ? `Enabled on ${p.id}. Click to disable.`
                                : `Disabled on ${p.id}. Click to enable.`
                            return (
                              <td
                                key={p.id}
                                className="px-3 py-2 text-center align-middle"
                              >
                                <button
                                  type="button"
                                  title={tooltip}
                                  aria-label={tooltip}
                                  disabled={!allowed || isPending}
                                  onClick={() =>
                                    void toggle(ts.name, p.id, enabled)
                                  }
                                  className={cn(
                                    'inline-flex h-6 w-11 items-center rounded-full border transition-colors',
                                    !allowed
                                      ? 'cursor-not-allowed border-primary-200 bg-primary-100 opacity-40'
                                      : enabled
                                        ? 'border-[var(--theme-accent)] bg-[var(--theme-accent)]'
                                        : 'border-primary-300 bg-primary-200',
                                    isPending && 'opacity-60',
                                  )}
                                >
                                  <span
                                    className={cn(
                                      'inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform',
                                      enabled
                                        ? 'translate-x-5'
                                        : 'translate-x-0.5',
                                    )}
                                  />
                                </button>
                              </td>
                            )
                          })}
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              <p className="mt-4 text-xs text-primary-500">
                Writes go to{' '}
                <code className="rounded border border-primary-200 bg-primary-100 px-1.5 py-0.5 font-mono">
                  ~/.hermes/config.yaml
                </code>{' '}
                under{' '}
                <code className="rounded border border-primary-200 bg-primary-100 px-1.5 py-0.5 font-mono">
                  tool_overrides.platforms.&lt;platform&gt;
                </code>
                . Restart the gateway (
                <code className="rounded border border-primary-200 bg-primary-100 px-1.5 py-0.5 font-mono">
                  hermes gateway restart
                </code>
                ) for non-CLI surfaces to pick up changes.
              </p>
            </section>
          ) : null}

          {!loading && !error && toolsets.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-primary-300 bg-primary-100 px-4 py-8 text-center text-sm text-primary-600">
              No toolsets reported by the dashboard.
            </div>
          ) : null}
        </div>
      </main>
    </div>
  )
}
