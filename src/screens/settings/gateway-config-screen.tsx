/**
 * Gateway Config Screen — Phase 3A
 *
 * Comprehensive editor for every gateway-relevant config key in
 * ~/.hermes/config.yaml. All writes go through `/api/config-patch`
 * (path/value form). Reads come from `/api/config-get`.
 *
 * Batches:
 *   A — Models & Routing surface
 *   B — Agent behavior
 *   C — Platforms (enable toggles + read-only allowed-users)
 *   D — Voice / STT / Honcho / Browser / Webhook / API server
 */
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import {
  Tabs,
  TabsList,
  TabsTab,
  TabsContent,
} from '@/components/ui/tabs'
import { toast } from '@/components/ui/toast'
import {
  SettingsMobilePills,
  SettingsSidebar,
} from '@/components/settings/settings-sidebar'
import { cn } from '@/lib/utils'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

type ConfigGetResponse = {
  ok?: boolean
  payload?: Record<string, unknown>
  error?: string
}

type ConfigPatchResponse = {
  ok?: boolean
  error?: string
}

function getByPath(obj: unknown, parts: Array<string>): unknown {
  let cur: unknown = obj
  for (const p of parts) {
    if (cur && typeof cur === 'object' && !Array.isArray(cur)) {
      cur = (cur as Record<string, unknown>)[p]
    } else {
      return undefined
    }
  }
  return cur
}

async function patchConfig(
  path: string,
  value: unknown,
  label: string,
): Promise<boolean> {
  try {
    const res = await fetch('/api/config-patch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path, value, label }),
    })
    const data = (await res.json().catch(() => ({}))) as ConfigPatchResponse
    if (!res.ok || data.ok === false) {
      throw new Error(data.error || `HTTP ${res.status}`)
    }
    toast(`Saved ${label}`, { type: 'success' })
    return true
  } catch (error) {
    toast(
      error instanceof Error ? error.message : `Failed to save ${label}`,
      { type: 'error' },
    )
    return false
  }
}

// ---------------------------------------------------------------------------
// Field primitives
// ---------------------------------------------------------------------------

function FieldShell({
  label,
  description,
  children,
}: {
  label: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-2 rounded-xl border border-primary-200 bg-primary-50/60 p-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-primary-900">{label}</p>
          {description ? (
            <p className="mt-0.5 text-xs text-primary-600">{description}</p>
          ) : null}
        </div>
        <code className="shrink-0 rounded bg-primary-100 px-1.5 py-0.5 text-[10px] text-primary-700">
          {/* path label populated via children container */}
        </code>
      </div>
      <div>{children}</div>
    </div>
  )
}

function TextField({
  label,
  description,
  path,
  current,
  placeholder,
  type = 'text',
  onSaved,
}: {
  label: string
  description?: string
  path: string
  current: string | number | undefined
  placeholder?: string
  type?: 'text' | 'number'
  onSaved?: () => void
}) {
  const [value, setValue] = useState<string>(
    current === undefined || current === null ? '' : String(current),
  )
  const [saving, setSaving] = useState(false)
  useEffect(() => {
    setValue(current === undefined || current === null ? '' : String(current))
  }, [current])

  async function commit() {
    setSaving(true)
    const v: unknown =
      type === 'number'
        ? value.trim() === ''
          ? null
          : Number(value)
        : value
    if (type === 'number' && typeof v === 'number' && Number.isNaN(v)) {
      toast(`${label}: not a valid number`, { type: 'error' })
      setSaving(false)
      return
    }
    const ok = await patchConfig(path, v, label)
    setSaving(false)
    if (ok && onSaved) onSaved()
  }

  return (
    <FieldShell label={label} description={description ?? path}>
      <div className="flex items-center gap-2">
        <Input
          nativeInput
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(e) =>
            setValue((e.target as HTMLInputElement).value)
          }
          onBlur={commit}
        />
        <Button
          size="sm"
          variant="outline"
          disabled={saving}
          onClick={commit}
        >
          {saving ? 'Saving…' : 'Save'}
        </Button>
      </div>
    </FieldShell>
  )
}

function ToggleField({
  label,
  description,
  path,
  current,
  onSaved,
}: {
  label: string
  description?: string
  path: string
  current: unknown
  onSaved?: () => void
}) {
  const checked = current === true
  return (
    <FieldShell label={label} description={description ?? path}>
      <div className="flex items-center justify-between">
        <span className="text-xs text-primary-600">
          {checked ? 'Enabled' : 'Disabled'}
        </span>
        <Switch
          checked={checked}
          onCheckedChange={async (next) => {
            const ok = await patchConfig(path, next === true, label)
            if (ok && onSaved) onSaved()
          }}
        />
      </div>
    </FieldShell>
  )
}

function SelectField({
  label,
  description,
  path,
  current,
  options,
  onSaved,
}: {
  label: string
  description?: string
  path: string
  current: unknown
  options: Array<{ value: string; label: string }>
  onSaved?: () => void
}) {
  const value = typeof current === 'string' ? current : ''
  return (
    <FieldShell label={label} description={description ?? path}>
      <select
        value={value}
        onChange={async (e) => {
          const ok = await patchConfig(path, e.target.value, label)
          if (ok && onSaved) onSaved()
        }}
        className="h-9 w-full rounded-lg border border-primary-200 bg-surface px-3 text-sm text-primary-900 outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
      >
        <option value="">(unset)</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </FieldShell>
  )
}

function JsonTextareaField({
  label,
  description,
  path,
  current,
  rows = 8,
  arrayMode = false,
  onSaved,
}: {
  label: string
  description?: string
  path: string
  current: unknown
  rows?: number
  arrayMode?: boolean
  onSaved?: () => void
}) {
  const initial = useMemo(() => {
    const fallback = arrayMode ? [] : {}
    try {
      return JSON.stringify(current ?? fallback, null, 2)
    } catch {
      return JSON.stringify(fallback, null, 2)
    }
  }, [current, arrayMode])
  const [text, setText] = useState(initial)
  const [saving, setSaving] = useState(false)
  useEffect(() => setText(initial), [initial])

  async function commit() {
    setSaving(true)
    let parsed: unknown
    try {
      parsed = JSON.parse(text)
    } catch (e) {
      toast(`${label}: invalid JSON`, { type: 'error' })
      setSaving(false)
      return
    }
    if (arrayMode && !Array.isArray(parsed)) {
      toast(`${label}: must be a JSON array`, { type: 'error' })
      setSaving(false)
      return
    }
    const ok = await patchConfig(path, parsed, label)
    setSaving(false)
    if (ok && onSaved) onSaved()
  }

  return (
    <FieldShell label={label} description={description ?? path}>
      <textarea
        rows={rows}
        value={text}
        onChange={(e) => setText(e.target.value)}
        spellCheck={false}
        className="w-full rounded-lg border border-primary-200 bg-surface px-3 py-2 font-mono text-xs text-primary-900 outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
      />
      <div className="mt-2 flex justify-end">
        <Button size="sm" variant="outline" onClick={commit} disabled={saving}>
          {saving ? 'Saving…' : 'Save JSON'}
        </Button>
      </div>
    </FieldShell>
  )
}

function ReadOnlyField({
  label,
  description,
  value,
  warn,
}: {
  label: string
  description?: string
  value: unknown
  warn?: string
}) {
  const display =
    value === undefined || value === null
      ? '(unset)'
      : typeof value === 'string'
        ? value
        : JSON.stringify(value)
  return (
    <FieldShell label={label} description={description}>
      <div
        className={cn(
          'rounded-lg border border-primary-200 bg-surface px-3 py-2 font-mono text-xs',
          value === undefined || value === null
            ? 'text-primary-500'
            : 'text-primary-800',
        )}
      >
        {display}
      </div>
      {warn ? (
        <p className="mt-1 text-xs text-amber-600">{warn}</p>
      ) : null}
    </FieldShell>
  )
}

// ---------------------------------------------------------------------------
// Auxiliary surfaces table (Batch A)
// ---------------------------------------------------------------------------

const AUXILIARY_SURFACES = [
  'vision',
  'web_extract',
  'compression',
  'session_search',
  'skills_hub',
  'approval',
  'mcp',
  'title_generation',
  'curator',
  'flush_memories',
] as const

function AuxiliaryTable({
  payload,
  onSaved,
}: {
  payload: Record<string, unknown>
  onSaved: () => void
}) {
  const aux = (payload.auxiliary ?? {}) as Record<string, unknown>
  return (
    <div className="overflow-x-auto rounded-xl border border-primary-200">
      <table className="w-full text-xs">
        <thead className="bg-primary-100 text-left text-primary-700">
          <tr>
            <th className="px-2 py-1.5">Surface</th>
            <th className="px-2 py-1.5">Provider</th>
            <th className="px-2 py-1.5">Model</th>
            <th className="px-2 py-1.5">Timeout (s)</th>
          </tr>
        </thead>
        <tbody>
          {AUXILIARY_SURFACES.map((name) => {
            const row = (aux[name] ?? {}) as Record<string, unknown>
            return (
              <tr
                key={name}
                className="border-t border-primary-200 align-top"
              >
                <td className="px-2 py-1.5 font-medium text-primary-900">
                  {name}
                </td>
                <td className="px-2 py-1.5">
                  <input
                    defaultValue={
                      typeof row.provider === 'string' ? row.provider : ''
                    }
                    placeholder="auto"
                    onBlur={(e) =>
                      void patchConfig(
                        `auxiliary.${name}.provider`,
                        e.target.value,
                        `auxiliary.${name}.provider`,
                      ).then(onSaved)
                    }
                    className="h-7 w-32 rounded border border-primary-200 bg-surface px-2 text-xs"
                  />
                </td>
                <td className="px-2 py-1.5">
                  <input
                    defaultValue={
                      typeof row.model === 'string' ? row.model : ''
                    }
                    placeholder="(provider default)"
                    onBlur={(e) =>
                      void patchConfig(
                        `auxiliary.${name}.model`,
                        e.target.value,
                        `auxiliary.${name}.model`,
                      ).then(onSaved)
                    }
                    className="h-7 w-48 rounded border border-primary-200 bg-surface px-2 text-xs"
                  />
                </td>
                <td className="px-2 py-1.5">
                  <input
                    type="number"
                    defaultValue={
                      typeof row.timeout === 'number'
                        ? String(row.timeout)
                        : ''
                    }
                    onBlur={(e) => {
                      const v = e.target.value.trim()
                      void patchConfig(
                        `auxiliary.${name}.timeout`,
                        v === '' ? null : Number(v),
                        `auxiliary.${name}.timeout`,
                      ).then(onSaved)
                    }}
                    className="h-7 w-20 rounded border border-primary-200 bg-surface px-2 text-xs"
                  />
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Toolset multi-select for agent.disabled_toolsets
// ---------------------------------------------------------------------------

const KNOWN_TOOLSETS = [
  'browser',
  'clarify',
  'code_execution',
  'cronjob',
  'delegation',
  'file',
  'google_meet',
  'homeassistant',
  'image_gen',
  'memory',
  'messaging',
  'moa',
  'rl',
  'session_search',
  'skills',
  'spotify',
  'terminal',
  'todo',
  'tts',
  'vision',
  'web',
] as const

function DisabledToolsetsField({
  current,
  onSaved,
}: {
  current: unknown
  onSaved: () => void
}) {
  const list = Array.isArray(current) ? (current as Array<string>) : []
  async function toggle(name: string) {
    const next = list.includes(name)
      ? list.filter((x) => x !== name)
      : [...list, name]
    const ok = await patchConfig(
      'agent.disabled_toolsets',
      next,
      'agent.disabled_toolsets',
    )
    if (ok) onSaved()
  }
  return (
    <FieldShell
      label="Disabled toolsets"
      description="agent.disabled_toolsets — checked toolsets are turned OFF for the agent."
    >
      <div className="flex flex-wrap gap-1.5">
        {KNOWN_TOOLSETS.map((name) => {
          const off = list.includes(name)
          return (
            <button
              key={name}
              type="button"
              onClick={() => void toggle(name)}
              className={cn(
                'rounded-full border px-2.5 py-1 text-xs',
                off
                  ? 'border-red-400 bg-red-50 text-red-700'
                  : 'border-primary-200 bg-surface text-primary-700 hover:bg-primary-100',
              )}
            >
              {off ? '✕ ' : ''}
              {name}
            </button>
          )
        })}
      </div>
    </FieldShell>
  )
}

// ---------------------------------------------------------------------------
// Platform card (Batch C)
// ---------------------------------------------------------------------------

const PLATFORMS = [
  { id: 'telegram', label: 'Telegram', envUsers: 'TELEGRAM_ALLOWED_USERS' },
  { id: 'discord', label: 'Discord', envUsers: 'DISCORD_ALLOWED_USERS' },
  { id: 'slack', label: 'Slack', envUsers: 'SLACK_ALLOWED_USERS' },
  { id: 'email', label: 'Email', envUsers: 'EMAIL_ALLOWED_USERS' },
  { id: 'sms', label: 'SMS', envUsers: 'SMS_ALLOWED_USERS' },
  { id: 'whatsapp', label: 'WhatsApp', envUsers: undefined },
] as const

function PlatformCard({
  platform,
  payload,
  onSaved,
}: {
  platform: (typeof PLATFORMS)[number]
  payload: Record<string, unknown>
  onSaved: () => void
}) {
  const enabled =
    getByPath(payload, ['platforms', platform.id, 'enabled']) === true
  const allowed =
    getByPath(payload, ['platforms', platform.id, 'allowed_users']) ??
    getByPath(payload, [platform.id, 'allowed_users'])
  const showWarn = enabled && (allowed === undefined || allowed === '')

  return (
    <div className="rounded-xl border border-primary-200 bg-primary-50/60 p-3">
      <div className="mb-2 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-primary-900">
            {platform.label}
          </p>
          <p className="text-xs text-primary-600">
            platforms.{platform.id}.enabled
          </p>
        </div>
        <Switch
          checked={enabled}
          onCheckedChange={async (next) => {
            const ok = await patchConfig(
              `platforms.${platform.id}.enabled`,
              next === true,
              `platforms.${platform.id}.enabled`,
            )
            if (ok) onSaved()
          }}
        />
      </div>
      <div className="text-xs text-primary-600">
        <span className="font-medium">allowed_users:</span>{' '}
        <code className="rounded bg-primary-100 px-1 py-0.5 text-[11px]">
          {allowed === undefined || allowed === ''
            ? '(unset — env-only)'
            : typeof allowed === 'string'
              ? allowed
              : JSON.stringify(allowed)}
        </code>
        {platform.envUsers ? (
          <p className="mt-1 text-[11px] text-primary-500">
            Edit via {platform.envUsers} in ~/.hermes/.env (secret-handling
            stays out of UI).
          </p>
        ) : null}
        {showWarn ? (
          <p className="mt-1 text-[11px] text-amber-600">
            ⚠ Platform is enabled but allowed_users is unset — anyone could
            message the agent.
          </p>
        ) : null}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Main screen
// ---------------------------------------------------------------------------

type SubTab = 'models' | 'agent' | 'platforms' | 'system'

export function GatewayConfigScreen() {
  const [payload, setPayload] = useState<Record<string, unknown>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [tab, setTab] = useState<SubTab>('models')

  const refresh = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/config-get')
      const data = (await res.json().catch(() => ({}))) as ConfigGetResponse
      if (!res.ok || data.ok === false) {
        throw new Error(data.error || `HTTP ${res.status}`)
      }
      setPayload(data.payload ?? {})
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load config')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void refresh()
  }, [refresh])

  const get = useCallback(
    (path: string) => getByPath(payload, path.split('.')),
    [payload],
  )

  return (
    <div className="min-h-screen bg-surface text-primary-900">
      <div className="pointer-events-none fixed inset-0 bg-radial from-primary-400/20 via-transparent to-transparent" />
      <main className="relative mx-auto flex w-full max-w-5xl flex-col gap-4 px-4 pt-6 pb-24 sm:px-6 md:flex-row md:gap-6 md:pb-8 lg:pt-8">
        <SettingsSidebar activeId={'gateway' as never} />
        <SettingsMobilePills activeId={'gateway' as never} />
        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <header className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-semibold text-primary-900">
                Gateway Config
              </h1>
              <p className="text-xs text-primary-600">
                Edits ~/.hermes/config.yaml via /api/config-patch.
                {loading ? ' Loading…' : null}
                {error ? ` Error: ${error}` : null}
              </p>
            </div>
            <Button size="sm" variant="outline" onClick={() => void refresh()}>
              Refresh
            </Button>
          </header>

          <Tabs
            value={tab}
            onValueChange={(v) => setTab(v as SubTab)}
            className="w-full"
          >
            <TabsList>
              <TabsTab value="models">Models &amp; Routing</TabsTab>
              <TabsTab value="agent">Agent</TabsTab>
              <TabsTab value="platforms">Platforms</TabsTab>
              <TabsTab value="system">Voice / Memory / System</TabsTab>
            </TabsList>

            {/* ────────────────────────── Batch A ────────────────────────── */}
            <TabsContent value="models" className="space-y-3 pt-2">
              <TextField
                label="Default model"
                description="model.default — primary model id used when no per-route override fires."
                path="model.default"
                current={get('model.default') as string | undefined}
                placeholder="claude-opus-4-7"
                onSaved={refresh}
              />
              <TextField
                label="Default provider"
                description="model.provider — the credential pool to route through."
                path="model.provider"
                current={get('model.provider') as string | undefined}
                placeholder="anthropic"
                onSaved={refresh}
              />
              <TextField
                label="Default base URL"
                description="model.base_url — leave blank to use the provider default."
                path="model.base_url"
                current={get('model.base_url') as string | undefined}
                placeholder="(provider default)"
                onSaved={refresh}
              />
              <JsonTextareaField
                label="Fallback providers"
                description={'fallback_providers — JSON array. e.g. [{"provider":"nous-research-plan"}]'}
                path="fallback_providers"
                current={get('fallback_providers')}
                arrayMode
                rows={5}
                onSaved={refresh}
              />
              <JsonTextareaField
                label="Smart routing rules"
                description="smart_model_routing.rules — JSON array of routing rules (v0)."
                path="smart_model_routing.rules"
                current={get('smart_model_routing.rules')}
                arrayMode
                rows={10}
                onSaved={refresh}
              />
              <ToggleField
                label="Smart routing enabled"
                description="smart_model_routing.enabled"
                path="smart_model_routing.enabled"
                current={get('smart_model_routing.enabled')}
                onSaved={refresh}
              />
              <div>
                <h3 className="mb-1.5 text-sm font-semibold text-primary-900">
                  Auxiliary surfaces
                </h3>
                <p className="mb-2 text-xs text-primary-600">
                  Per-surface model assignments (auxiliary.&lt;surface&gt;).
                </p>
                <AuxiliaryTable payload={payload} onSaved={refresh} />
              </div>
              <JsonTextareaField
                label="Credential pool strategies"
                description="credential_pool_strategies — object mapping provider → strategy"
                path="credential_pool_strategies"
                current={get('credential_pool_strategies')}
                rows={6}
                onSaved={refresh}
              />
            </TabsContent>

            {/* ────────────────────────── Batch B ────────────────────────── */}
            <TabsContent value="agent" className="space-y-3 pt-2">
              <TextField
                label="Max turns"
                description="agent.max_turns — hard cap on turns per session."
                path="agent.max_turns"
                current={get('agent.max_turns') as number | undefined}
                type="number"
                onSaved={refresh}
              />
              <TextField
                label="Gateway timeout (s)"
                description="agent.gateway_timeout"
                path="agent.gateway_timeout"
                current={get('agent.gateway_timeout') as number | undefined}
                type="number"
                onSaved={refresh}
              />
              <SelectField
                label="Reasoning effort"
                description="agent.reasoning_effort"
                path="agent.reasoning_effort"
                current={get('agent.reasoning_effort')}
                options={[
                  { value: 'minimal', label: 'minimal' },
                  { value: 'low', label: 'low' },
                  { value: 'medium', label: 'medium' },
                  { value: 'high', label: 'high' },
                ]}
                onSaved={refresh}
              />
              <FieldShell
                label="System prompt"
                description="agent.system_prompt"
              >
                <SystemPromptEditor
                  current={get('agent.system_prompt') as string | undefined}
                  onSaved={refresh}
                />
              </FieldShell>
              <DisabledToolsetsField
                current={get('agent.disabled_toolsets')}
                onSaved={refresh}
              />
            </TabsContent>

            {/* ────────────────────────── Batch C ────────────────────────── */}
            <TabsContent value="platforms" className="space-y-3 pt-2">
              <p className="text-xs text-primary-600">
                Toggle gateway-side platform enables. Secret credentials
                (bot tokens, API keys) stay in ~/.hermes/.env and are not
                exposed here.
              </p>
              <div className="grid gap-2 md:grid-cols-2">
                {PLATFORMS.map((p) => (
                  <PlatformCard
                    key={p.id}
                    platform={p}
                    payload={payload}
                    onSaved={refresh}
                  />
                ))}
              </div>
            </TabsContent>

            {/* ────────────────────────── Batch D ────────────────────────── */}
            <TabsContent value="system" className="space-y-3 pt-2">
              <h3 className="text-sm font-semibold text-primary-900">Voice</h3>
              <SelectField
                label="Voice TTS provider"
                description="voice.tts.provider"
                path="voice.tts.provider"
                current={get('voice.tts.provider')}
                options={[
                  { value: 'openai', label: 'openai' },
                  { value: 'edge', label: 'edge' },
                  { value: 'elevenlabs', label: 'elevenlabs' },
                  { value: 'piper', label: 'piper' },
                  { value: 'xai', label: 'xai' },
                  { value: 'mistral', label: 'mistral' },
                  { value: 'neutts', label: 'neutts' },
                ]}
                onSaved={refresh}
              />
              <TextField
                label="Voice OpenAI model"
                description="tts.openai.model"
                path="tts.openai.model"
                current={get('tts.openai.model') as string | undefined}
                placeholder="gpt-4o-mini-tts"
                onSaved={refresh}
              />
              <TextField
                label="Max recording seconds"
                description="voice.max_recording_seconds (latency-related)"
                path="voice.max_recording_seconds"
                current={
                  get('voice.max_recording_seconds') as number | undefined
                }
                type="number"
                onSaved={refresh}
              />
              <ToggleField
                label="Auto TTS"
                description="voice.auto_tts"
                path="voice.auto_tts"
                current={get('voice.auto_tts')}
                onSaved={refresh}
              />

              <h3 className="pt-3 text-sm font-semibold text-primary-900">
                STT
              </h3>
              <SelectField
                label="STT provider"
                description="voice.stt.provider"
                path="voice.stt.provider"
                current={get('voice.stt.provider')}
                options={[
                  { value: 'local', label: 'local (whisper)' },
                  { value: 'openai', label: 'openai' },
                  { value: 'mistral', label: 'mistral' },
                ]}
                onSaved={refresh}
              />
              <SelectField
                label="STT local model"
                description="voice.stt.local.model"
                path="voice.stt.local.model"
                current={get('voice.stt.local.model')}
                options={[
                  { value: 'tiny', label: 'tiny' },
                  { value: 'base', label: 'base' },
                  { value: 'small', label: 'small' },
                  { value: 'medium', label: 'medium' },
                  { value: 'large', label: 'large' },
                ]}
                onSaved={refresh}
              />
              <TextField
                label="STT language"
                description="voice.stt.local.language — empty = auto-detect"
                path="voice.stt.local.language"
                current={get('voice.stt.local.language') as string | undefined}
                placeholder="(auto-detect)"
                onSaved={refresh}
              />

              <h3 className="pt-3 text-sm font-semibold text-primary-900">
                Honcho memory
              </h3>
              <SelectField
                label="Honcho mode"
                description="honcho.mode"
                path="honcho.mode"
                current={get('honcho.mode')}
                options={[
                  { value: 'off', label: 'off' },
                  { value: 'local', label: 'local' },
                  { value: 'cloud', label: 'cloud' },
                ]}
                onSaved={refresh}
              />
              <TextField
                label="Honcho context tokens"
                description="honcho.context_tokens"
                path="honcho.context_tokens"
                current={get('honcho.context_tokens') as number | undefined}
                type="number"
                onSaved={refresh}
              />
              <TextField
                label="Honcho dialectic queries"
                description="honcho.dialectic.queries"
                path="honcho.dialectic.queries"
                current={get('honcho.dialectic.queries') as number | undefined}
                type="number"
                onSaved={refresh}
              />
              <TextField
                label="Honcho dialectic max tokens"
                description="honcho.dialectic.max_tokens"
                path="honcho.dialectic.max_tokens"
                current={
                  get('honcho.dialectic.max_tokens') as number | undefined
                }
                type="number"
                onSaved={refresh}
              />

              <h3 className="pt-3 text-sm font-semibold text-primary-900">
                Browser
              </h3>
              <SelectField
                label="Browser cloud provider"
                description="browser.cloud_provider"
                path="browser.cloud_provider"
                current={get('browser.cloud_provider')}
                options={[
                  { value: 'local', label: 'local' },
                  { value: 'camofox', label: 'camofox' },
                  { value: 'browserbase', label: 'browserbase' },
                ]}
                onSaved={refresh}
              />
              <TextField
                label="Browser inactivity timeout (s)"
                description="browser.inactivity_timeout"
                path="browser.inactivity_timeout"
                current={
                  get('browser.inactivity_timeout') as number | undefined
                }
                type="number"
                onSaved={refresh}
              />
              <TextField
                label="Browser command timeout (s)"
                description="browser.command_timeout"
                path="browser.command_timeout"
                current={get('browser.command_timeout') as number | undefined}
                type="number"
                onSaved={refresh}
              />

              <h3 className="pt-3 text-sm font-semibold text-primary-900">
                Webhook
              </h3>
              <ToggleField
                label="Webhook enabled"
                description="webhook.enabled"
                path="webhook.enabled"
                current={get('webhook.enabled')}
                onSaved={refresh}
              />
              <TextField
                label="Webhook port"
                description="webhook.port"
                path="webhook.port"
                current={get('webhook.port') as number | undefined}
                type="number"
                placeholder="8644"
                onSaved={refresh}
              />

              <h3 className="pt-3 text-sm font-semibold text-primary-900">
                API server (display-only)
              </h3>
              <ReadOnlyField
                label="display.platforms.api_server"
                description="display.platforms.api_server — gateway display config (read-only)"
                value={getByPath(payload, [
                  'display',
                  'platforms',
                  'api_server',
                ])}
              />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

// ---------------------------------------------------------------------------
// System-prompt textarea (multi-line + save button)
// ---------------------------------------------------------------------------

function SystemPromptEditor({
  current,
  onSaved,
}: {
  current: string | undefined
  onSaved: () => void
}) {
  const [text, setText] = useState(current ?? '')
  const [saving, setSaving] = useState(false)
  useEffect(() => setText(current ?? ''), [current])
  return (
    <div>
      <textarea
        rows={5}
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full rounded-lg border border-primary-200 bg-surface px-3 py-2 text-xs text-primary-900 outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
      />
      <div className="mt-2 flex justify-end">
        <Button
          size="sm"
          variant="outline"
          disabled={saving}
          onClick={async () => {
            setSaving(true)
            const ok = await patchConfig(
              'agent.system_prompt',
              text,
              'agent.system_prompt',
            )
            setSaving(false)
            if (ok) onSaved()
          }}
        >
          {saving ? 'Saving…' : 'Save'}
        </Button>
      </div>
    </div>
  )
}

export default GatewayConfigScreen
