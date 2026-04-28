'use client'

import { HugeiconsIcon } from '@hugeicons/react'
import {
  ArrowLeft01Icon,
  Cancel01Icon,
  CheckmarkCircle02Icon,
  CloudIcon,
  ComputerIcon,
  MessageMultiple01Icon,
  Mic01Icon,
  Moon01Icon,
  Notification03Icon,
  PaintBoardIcon,
  Settings02Icon,
  SparklesIcon,
  Sun01Icon,
  VolumeHighIcon,
} from '@hugeicons/core-free-icons'
import { Component, useCallback, useEffect, useState } from 'react'
import type * as React from 'react'
import { useTranslation } from 'react-i18next'
import { t as i18nStaticT } from '@/lib/i18n'
import type { AccentColor, SettingsThemeMode } from '@/hooks/use-settings'
import type { LoaderStyle } from '@/hooks/use-chat-settings'
import type { BrailleSpinnerPreset } from '@/components/ui/braille-spinner'
import type { ThemeId } from '@/lib/theme'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { applyTheme, useSettings } from '@/hooks/use-settings'
import {
  THEMES,
  getTheme,
  getThemeVariant,
  isDarkTheme,
  setTheme,
} from '@/lib/theme'
import { cn } from '@/lib/utils'
import {
  getChatProfileDisplayName,
  useChatSettingsStore,
} from '@/hooks/use-chat-settings'
import { UserAvatar } from '@/components/avatars'
import { Input } from '@/components/ui/input'
import { LogoLoader } from '@/components/logo-loader'
import { BrailleSpinner } from '@/components/ui/braille-spinner'
import { ThreeDotsSpinner } from '@/components/ui/three-dots-spinner'
import BackendUnavailableState from '@/components/backend-unavailable-state'
import { applyAccentColor } from '@/lib/accent-colors'
import { getUnavailableReason } from '@/lib/feature-gates'
import { useFeatureAvailable } from '@/hooks/use-feature-available'
import { ProviderLogo } from '@/components/provider-logo'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogRoot,
  DialogTitle,
} from '@/components/ui/dialog'

// ── Types ───────────────────────────────────────────────────────────────

type SectionId =
  | 'hermes'
  | 'agent'
  | 'routing'
  | 'voice'
  | 'display'
  | 'appearance'
  | 'chat'
  | 'notifications'
  | 'language'

const SECTIONS: Array<{ id: SectionId; icon: any }> = [
  { id: 'hermes', icon: CloudIcon },
  { id: 'agent', icon: Settings02Icon },
  { id: 'routing', icon: SparklesIcon },
  { id: 'voice', icon: VolumeHighIcon },
  { id: 'display', icon: PaintBoardIcon },
  { id: 'appearance', icon: PaintBoardIcon },
  { id: 'chat', icon: MessageMultiple01Icon },
  { id: 'notifications', icon: Notification03Icon },
  { id: 'language', icon: MessageMultiple01Icon },
]

const DARK_ENTERPRISE_THEMES = new Set<ThemeId>([
  'hermes-nous',
  'hermes-official',
  'hermes-classic',
  'hermes-slate',
])

function _isDarkEnterpriseTheme(theme: string | null): theme is ThemeId {
  if (!theme) return false
  return DARK_ENTERPRISE_THEMES.has(theme as ThemeId)
}
void _isDarkEnterpriseTheme

// ── Shared building blocks ──────────────────────────────────────────────

function SectionHeader({
  title,
  description,
}: {
  title: string
  description: string
}) {
  const { t } = useTranslation('settings')
  return (
    <div className="mb-2">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary-500">
        {t('dialogSectionBrand', { defaultValue: 'Settings' })}
      </p>
      <h3 className="text-base font-semibold text-primary-900 dark:text-neutral-100">
        {title}
      </h3>
      <p className="text-xs text-primary-500 dark:text-neutral-400">
        {description}
      </p>
    </div>
  )
}

function Row({
  label,
  description,
  children,
}: {
  label: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 py-1.5">
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-primary-900 dark:text-neutral-100">
          {label}
        </p>
        {description && (
          <p className="text-xs text-primary-500 dark:text-neutral-400">
            {description}
          </p>
        )}
      </div>
      <div className="flex items-center gap-2">{children}</div>
    </div>
  )
}

const SETTINGS_CARD_CLASS =
  'rounded-xl border border-primary-200 bg-primary-50/80 px-4 py-3 shadow-sm'

// ── Section components ──────────────────────────────────────────────────

const PROVIDER_CARDS: Array<{
  id: string
  name: string
  logo: string
  models: Array<string>
  authType: 'oauth' | 'api_key' | 'none'
  envKey?: string
}> = [
  // Local providers first — zero setup
  {
    id: 'ollama',
    name: 'Ollama',
    logo: '/providers/ollama.png',
    models: ['llama3.1:70b', 'qwen3:32b', 'deepseek-r1:32b'],
    authType: 'none',
  },
  {
    id: 'atomic-chat',
    name: 'Atomic Chat',
    logo: '/providers/atomic-chat.png',
    models: ['llama-3.2-3b', 'qwen2.5-7b', 'gemma-3-4b'],
    authType: 'none',
  },
  // Cloud providers
  {
    id: 'anthropic',
    name: 'Anthropic',
    logo: '/providers/anthropic.png',
    models: ['claude-sonnet-4-6', 'claude-opus-4-6', 'claude-haiku-3-5'],
    authType: 'api_key',
    envKey: 'ANTHROPIC_API_KEY',
  },
  {
    id: 'nous',
    name: 'Nous Portal',
    logo: '/providers/nous.png',
    models: ['xiaomi/mimo-v2-pro', 'xiaomi/mimo-v2-omni', 'hermes-3-llama-3.1-405b', 'hermes-3-llama-3.1-70b'],
    authType: 'oauth',
  },
  {
    id: 'openai-codex',
    name: 'OpenAI Codex',
    logo: '/providers/openai.png',
    models: ['gpt-5.4', 'gpt-5.3-codex', 'gpt-4o'],
    authType: 'oauth',
  },
  {
    id: 'openrouter',
    name: 'OpenRouter',
    logo: '/providers/openrouter.png',
    models: ['auto', 'deepseek/deepseek-r1', 'google/gemini-2.5-pro'],
    authType: 'api_key',
    envKey: 'OPENROUTER_API_KEY',
  },
  {
    id: 'zai',
    name: 'Z.AI / GLM',
    logo: '/providers/zhipu.png',
    models: ['glm-4-plus', 'glm-4-air'],
    authType: 'api_key',
    envKey: 'GLM_API_KEY',
  },
  {
    id: 'kimi-coding',
    name: 'Kimi',
    logo: '/providers/kimi.png',
    models: ['kimi-latest', 'moonshot-v1-128k'],
    authType: 'api_key',
    envKey: 'KIMI_API_KEY',
  },
  {
    id: 'minimax',
    name: 'MiniMax',
    logo: '/providers/minimax.png',
    models: ['MiniMax-M2.5', 'MiniMax-M2.5-Lightning'],
    authType: 'api_key',
    envKey: 'MINIMAX_API_KEY',
  },
  {
    id: 'xiaomi',
    name: 'Xiaomi MiMo',
    logo: '/providers/xiaomi.png',
    models: ['mimo-v2-pro', 'mimo-v2-omni', 'mimo-v2-flash'],
    authType: 'api_key',
    envKey: 'XIAOMI_API_KEY',
  },
  { id: 'custom', name: 'Custom', logo: '', models: [], authType: 'api_key' },
]

function HermesContent() {
  const { t } = useTranslation(['settings', 'common'])
  const configAvailable = useFeatureAvailable('config')
  const [activeProvider, setActiveProvider] = useState('')
  const [activeModel, setActiveModel] = useState('')
  const [availableModels, setAvailableModels] = useState<Array<string>>([])
  const [editingKey, setEditingKey] = useState<string | null>(null)
  const [keyInput, setKeyInput] = useState('')
  const [_saving, setSaving] = useState(false)
  const [hermesToast, setHermesToast] = useState<
    { kind: 'success'; detail?: string } | { kind: 'error' } | null
  >(null)
  const [configuredKeys, setConfiguredKeys] = useState<Record<string, string>>(
    {},
  )
  const [memEnabled, setMemEnabled] = useState(true)
  const [userProfileEnabled, setUserProfileEnabled] = useState(true)
  const [localDiscovery, setLocalDiscovery] = useState<{
    providers: Array<{ id: string; name: string; online: boolean; modelCount: number; configured: boolean; needsRestart: boolean }>
    models: Array<{ id: string; name: string; provider: string }>
  } | null>(null)

  const fetchModelsForProvider = useCallback((providerId: string) => {
    // For local providers, prefer auto-discovered models first
    if (localDiscovery) {
      const discovered = localDiscovery.models
        .filter((m) => m.provider === providerId)
        .map((m) => m.id)
      if (discovered.length > 0) {
        setAvailableModels(discovered)
        return
      }
    }
    fetch(
      `/api/hermes-proxy/api/available-models?provider=${encodeURIComponent(providerId)}`,
    )
      .then((r) => r.json())
      .then((d: { models?: Array<{ id: string }> }) => {
        setAvailableModels((d.models || []).map((m) => m.id))
      })
      .catch(() => {
        // Fall back to hardcoded
        const card = PROVIDER_CARDS.find((p) => p.id === providerId)
        setAvailableModels(card?.models || [])
      })
  }, [localDiscovery])

  useEffect(() => {
    fetch('/api/local-providers')
      .then((r) => r.json())
      .then((d: any) => { if (d.ok) setLocalDiscovery(d) })
      .catch(() => {})
  }, [])

  useEffect(() => {
    fetch('/api/hermes-config')
      .then((r) => r.json())
      .then((d: any) => {
        setActiveProvider(d.activeProvider || '')
        setActiveModel(d.activeModel || '')
        if (d.activeProvider) fetchModelsForProvider(d.activeProvider)
        const mem = (d.config?.memory as Record<string, unknown>) || {}
        setMemEnabled(mem.memory_enabled !== false)
        setUserProfileEnabled(mem.user_profile_enabled !== false)
        // Build configured keys map
        const keys: Record<string, string> = {}
        for (const p of d.providers || []) {
          if (p.configured && p.envKeys?.[0])
            keys[p.envKeys[0]] = p.maskedKeys?.[p.envKeys[0]] || '••••'
        }
        setConfiguredKeys(keys)
      })
      .catch(() => {})
  }, [])

  const save = async (updates: {
    config?: Record<string, unknown>
    env?: Record<string, string>
  }) => {
    setSaving(true)
    setHermesToast(null)
    try {
      const res = await fetch('/api/hermes-config', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      })
      const r = (await res.json()) as { message?: string }
      setHermesToast(
        r.message
          ? { kind: 'success', detail: r.message }
          : { kind: 'success' },
      )
      const ref = await fetch('/api/hermes-config')
      const d = await ref.json()
      setActiveProvider(d.activeProvider || '')
      setActiveModel(d.activeModel || '')
      const keys: Record<string, string> = {}
      for (const p of d.providers || []) {
        if (p.configured && p.envKeys?.[0])
          keys[p.envKeys[0]] = p.maskedKeys?.[p.envKeys[0]] || '••••'
      }
      setConfiguredKeys(keys)
      setTimeout(() => setHermesToast(null), 3000)
    } catch {
      setHermesToast({ kind: 'error' })
    }
    setSaving(false)
  }

  const selectProvider = (providerId: string, model?: string) => {
    setActiveProvider(providerId)
    if (model) {
      setActiveModel(model)
      save({ config: { model, provider: providerId } })
    } else {
      // Switching provider without a model — fetch models and pick the first one
      fetchModelsForProvider(providerId)
      save({ config: { provider: providerId } })
    }
  }

  if (!configAvailable) {
    return (
      <BackendUnavailableState
        feature={t('hermesAgentSettingsTitle', {
          defaultValue: 'Hermes Agent Settings',
        })}
        description={getUnavailableReason('config')}
      />
    )
  }

  const cardStyle: React.CSSProperties = {
    backgroundColor: 'var(--theme-card)',
    border: '1px solid var(--theme-border)',
    color: 'var(--theme-text)',
  }
  const mutedStyle: React.CSSProperties = { color: 'var(--theme-muted)' }

  return (
    <div className="space-y-5">
      {hermesToast && (
        <div
          className={cn(
            'rounded-lg px-3 py-2 text-sm font-medium',
            hermesToast.kind === 'error'
              ? 'bg-red-500/15 text-red-400'
              : 'bg-green-500/15 text-green-400',
          )}
        >
          {hermesToast.kind === 'error'
            ? t('hermesSaveFailed', { defaultValue: 'Failed to save' })
            : hermesToast.detail ??
              t('common:saved', { defaultValue: 'Saved' })}
        </div>
      )}

      {/* Provider Selection */}
      <div>
        <p
          className="mb-1 text-xs font-semibold uppercase tracking-wider"
          style={mutedStyle}
        >
          {t('hermesProviderTitle', { defaultValue: 'Provider' })}
        </p>
        <p className="mb-3 text-[11px]" style={mutedStyle}>
          {t('hermesProviderDescription', {
            defaultValue:
              'Select your AI provider. OAuth providers authenticate via browser.',
          })}
        </p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {PROVIDER_CARDS.map((p) => {
            const isActive = activeProvider === p.id
            const hasKey =
              p.authType === 'none' ||
              p.authType === 'oauth' ||
              (p.envKey ? !!configuredKeys[p.envKey] : false)
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => {
                  if (hasKey) selectProvider(p.id)
                }}
                className={cn(
                  'flex flex-col items-start gap-1 rounded-xl px-3 py-2.5 text-left transition-all',
                  isActive
                    ? 'ring-2 ring-accent-500 shadow-md'
                    : 'hover:brightness-110',
                  !hasKey && p.authType === 'api_key' && 'opacity-60',
                )}
                style={cardStyle}
              >
                <div className="flex w-full items-center justify-between">
                  <ProviderLogo provider={p.id} size={32} />
                  {isActive && (
                    <span className="size-2 rounded-full bg-green-500" />
                  )}
                  {!isActive && hasKey && (
                    <span className="size-2 rounded-full bg-green-500/40" />
                  )}
                  {!hasKey && p.authType === 'api_key' && (
                    <span className="size-2 rounded-full bg-red-500/60" />
                  )}
                </div>
                <span className="text-xs font-semibold mt-1">{p.name}</span>
                <span className="text-[9px]" style={mutedStyle}>
                  {(() => {
                    const disc = localDiscovery?.providers.find((lp) => lp.id === p.id)
                    if (disc?.online)
                      return t('hermesStatusDetected', { defaultValue: '🟢 Detected' })
                    if (p.authType === 'oauth')
                      return t('hermesStatusOAuth', { defaultValue: 'OAuth' })
                    if (p.authType === 'none')
                      return t('hermesStatusLocal', { defaultValue: 'Local' })
                    return hasKey
                      ? t('hermesStatusKeySet', { defaultValue: 'Key set' })
                      : t('hermesStatusKeyRequired', { defaultValue: 'Key required' })
                  })()}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Model Selection for active provider */}
      {activeProvider && (
        <div>
          <p
            className="mb-1 text-xs font-semibold uppercase tracking-wider"
            style={mutedStyle}
          >
            {t('hermesModelTitle', { defaultValue: 'Model' })}
          </p>
          <div className="flex flex-wrap gap-2">
            {(() => {
              if (availableModels.length > 0) return availableModels
              // Use auto-discovered models for local providers
              const discovered = localDiscovery?.models
                .filter((m) => m.provider === activeProvider)
                .map((m) => m.id)
              if (discovered && discovered.length > 0) return discovered
              return PROVIDER_CARDS.find((p) => p.id === activeProvider)?.models || []
            })().map((model) => (
              <button
                key={model}
                type="button"
                onClick={() => selectProvider(activeProvider, model)}
                className={cn(
                  'rounded-lg px-3 py-1.5 text-xs font-medium transition-all',
                  activeModel === model
                    ? 'ring-2 ring-accent-500'
                    : 'hover:brightness-110',
                )}
                style={cardStyle}
              >
                {model}
              </button>
            ))}
          </div>
        </div>
      )}

      {(() => {
        const disc = localDiscovery?.providers.find((lp) => lp.id === activeProvider)
        if (!disc || !disc.needsRestart) return null
        return (
          <div className="rounded-lg border border-yellow-500/30 bg-yellow-500/10 px-3 py-2 text-xs text-yellow-200">
            {t('hermesGatewayRestartHint', {
              provider: disc.name,
              defaultValue:
                '⚠️ Gateway restart needed to use {{provider}}. In your terminal, run: hermes gateway restart',
            })}
          </div>
        )
      })()}

      {/* API Keys */}
      <div>
        <p
          className="mb-1 text-xs font-semibold uppercase tracking-wider"
          style={mutedStyle}
        >
          {t('hermesApiKeysTitle', { defaultValue: 'API Keys' })}
        </p>
        <div className="space-y-1.5">
          {PROVIDER_CARDS.filter((p) => p.envKey).map((p) => {
            const key = p.envKey!
            const hasKey = !!configuredKeys[key]
            const isEditing = editingKey === key
            return (
              <div
                key={p.id}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5"
                style={cardStyle}
              >
                <ProviderLogo
                  provider={p.id}
                  size={28}
                  className="rounded-md"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium">{p.name}</div>
                  <div className="text-[11px] font-mono" style={mutedStyle}>
                    {isEditing ? (
                      <input
                        type="password"
                        value={keyInput}
                        onChange={(e) => setKeyInput(e.target.value)}
                        placeholder={t('hermesPasteKey', {
                          key,
                          defaultValue: 'Paste {{key}}',
                        })}
                        className="w-full rounded border-0 bg-transparent py-0.5 text-[11px] outline-none"
                        style={{ color: 'var(--theme-text)' }}
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && keyInput) {
                            save({ env: { [key]: keyInput } })
                            setEditingKey(null)
                            setKeyInput('')
                          }
                          if (e.key === 'Escape') {
                            setEditingKey(null)
                            setKeyInput('')
                          }
                        }}
                      />
                    ) : hasKey ? (
                      configuredKeys[key]
                    ) : (
                      t('hermesKeyNotConfigured', { defaultValue: 'Not configured' })
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      'size-2 rounded-full',
                      hasKey ? 'bg-green-500' : 'bg-neutral-500',
                    )}
                  />
                  {isEditing ? (
                    <>
                      <button
                        type="button"
                        onClick={() => {
                          if (keyInput) {
                            save({ env: { [key]: keyInput } })
                          }
                          setEditingKey(null)
                          setKeyInput('')
                        }}
                        className="rounded-lg px-2 py-1 text-[11px] font-medium bg-accent-500 text-white"
                      >
                        {t('common:save', { defaultValue: 'Save' })}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingKey(null)
                          setKeyInput('')
                        }}
                        className="rounded-lg px-2 py-1 text-[11px] font-medium"
                        style={{ color: 'var(--theme-muted)' }}
                      >
                        {t('common:cancel', { defaultValue: 'Cancel' })}
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingKey(key)
                        setKeyInput('')
                      }}
                      className="rounded-lg px-2.5 py-1 text-[11px] font-medium transition-colors hover:bg-accent-500/10"
                      style={{
                        color: 'var(--theme-accent, var(--theme-text))',
                      }}
                    >
                      {hasKey
                        ? t('hermesKeyUpdate', { defaultValue: 'Update' })
                        : t('hermesKeyAdd', { defaultValue: 'Add' })}
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Memory */}
      <div>
        <p
          className="mb-1 text-xs font-semibold uppercase tracking-wider"
          style={mutedStyle}
        >
          {t('hermesMemorySectionTitle', { defaultValue: 'Memory' })}
        </p>
        <div className="space-y-1.5">
          <div
            className="flex items-center justify-between rounded-xl px-3 py-2.5"
            style={cardStyle}
          >
            <div>
              <div className="text-sm font-medium">
                {t('hermesMemoryEnableTitle', { defaultValue: 'Memory' })}
              </div>
              <div className="text-[11px]" style={mutedStyle}>
                {t('hermesMemoryEnableDesc', {
                  defaultValue: 'Store & recall memories across sessions',
                })}
              </div>
            </div>
            <Switch
              checked={memEnabled}
              onCheckedChange={(c) => {
                setMemEnabled(c)
                save({ config: { memory: { memory_enabled: c } } })
              }}
            />
          </div>
          <div
            className="flex items-center justify-between rounded-xl px-3 py-2.5"
            style={cardStyle}
          >
            <div>
              <div className="text-sm font-medium">
                {t('hermesUserProfileTitle', { defaultValue: 'User Profile' })}
              </div>
              <div className="text-[11px]" style={mutedStyle}>
                {t('hermesUserProfileDesc', {
                  defaultValue: 'Remember preferences & context',
                })}
              </div>
            </div>
            <Switch
              checked={userProfileEnabled}
              onCheckedChange={(c) => {
                setUserProfileEnabled(c)
                save({ config: { memory: { user_profile_enabled: c } } })
              }}
            />
          </div>
        </div>
      </div>

      {/* Runtime Info */}
      <div className="rounded-xl px-3 py-2.5" style={cardStyle}>
        <div className="flex items-center gap-2 mb-2">
          <span className="size-2 rounded-full bg-green-500 animate-pulse" />
          <span
            className="text-xs font-semibold uppercase tracking-wider"
            style={mutedStyle}
          >
            {t('hermesRuntimeTitle', { defaultValue: 'Runtime' })}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[11px]">
          <span style={mutedStyle}>
            {t('hermesRuntimeModel', { defaultValue: 'Model' })}
          </span>
          <span className="font-mono font-medium">{activeModel || '—'}</span>
          <span style={mutedStyle}>
            {t('hermesRuntimeProvider', { defaultValue: 'Provider' })}
          </span>
          <span className="font-mono font-medium">
            {PROVIDER_CARDS.find((p) => p.id === activeProvider)?.name ||
              activeProvider ||
              '—'}
          </span>
          <span style={mutedStyle}>
            {t('hermesRuntimeConfig', { defaultValue: 'Config' })}
          </span>
          <span className="font-mono font-medium">~/.hermes/config.yaml</span>
        </div>
      </div>
    </div>
  )
}

function _ProfileContent() {
  const { settings: cs, updateSettings: updateCS } = useChatSettingsStore()
  const [profileError, setProfileError] = useState<string | null>(null)
  const [processing, setProcessing] = useState(false)
  const displayName = getChatProfileDisplayName(cs.displayName)
  const [nameError, setNameError] = useState<string | null>(null)

  function handleNameChange(value: string) {
    if (value.length > 50) {
      setNameError('Display name too long (max 50 characters)')
      return
    }
    setNameError(null)
    updateCS({ displayName: value })
  }

  async function handleAvatarUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setProfileError('Unsupported file type.')
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      setProfileError('Image too large (max 10MB).')
      return
    }
    setProfileError(null)
    setProcessing(true)
    try {
      const url = URL.createObjectURL(file)
      const img = await new Promise<HTMLImageElement>((resolve, reject) => {
        const i = new Image()
        i.onload = () => resolve(i)
        i.onerror = () => reject(new Error('Failed'))
        i.src = url
      })
      const max = 128,
        scale = Math.min(1, max / Math.max(img.width, img.height))
      const w = Math.round(img.width * scale),
        h = Math.round(img.height * scale)
      const canvas = document.createElement('canvas')
      canvas.width = w
      canvas.height = h
      const ctx = canvas.getContext('2d')!
      ctx.imageSmoothingQuality = 'high'
      ctx.drawImage(img, 0, 0, w, h)
      URL.revokeObjectURL(url)
      updateCS({
        avatarDataUrl: canvas.toDataURL(
          file.type === 'image/png' ? 'image/png' : 'image/jpeg',
          0.82,
        ),
      })
    } catch {
      setProfileError('Failed to process image.')
    } finally {
      setProcessing(false)
    }
  }

  const errorId = 'profile-name-error'

  return (
    <div className="space-y-4">
      <SectionHeader
        title="Profile"
        description="Your display identity in chat."
      />
      <div className={SETTINGS_CARD_CLASS}>
        <div className="flex items-center gap-3">
          <UserAvatar size={44} src={cs.avatarDataUrl} alt={displayName} />
          <div>
            <p className="text-sm font-medium text-primary-900 dark:text-neutral-100">
              {displayName}
            </p>
            <p className="text-xs text-primary-500 dark:text-neutral-400">
              No email connected
            </p>
          </div>
        </div>
      </div>
      <div className={SETTINGS_CARD_CLASS}>
        <Row label="Display name" description="Shown in chat and sidebar">
          <div className="w-full max-w-xs">
            <Input
              value={cs.displayName}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="User"
              className="h-8 w-full rounded-lg border-primary-200 text-sm"
              maxLength={50}
              aria-label="Display name"
              aria-invalid={!!nameError}
              aria-describedby={nameError ? errorId : undefined}
            />
            {nameError && (
              <p
                id={errorId}
                className="mt-1 text-xs text-red-600"
                role="alert"
              >
                {nameError}
              </p>
            )}
          </div>
        </Row>
        <Row label="Avatar">
          <div className="flex items-center gap-2">
            <label className="block">
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                disabled={processing}
                aria-label="Upload profile picture"
                className="block max-w-[13rem] cursor-pointer text-xs text-primary-700 dark:text-neutral-300 file:mr-2 file:cursor-pointer file:rounded-lg file:border file:border-primary-200 file:bg-primary-100 file:px-2.5 file:py-1.5 file:text-xs file:font-medium file:text-primary-900 file:transition-colors hover:file:bg-primary-200 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </label>
            <Button
              variant="outline"
              size="sm"
              onClick={() => updateCS({ avatarDataUrl: null })}
              disabled={!cs.avatarDataUrl || processing}
              className="h-8 rounded-lg border-primary-200 px-3"
            >
              Remove
            </Button>
          </div>
          {profileError && (
            <p className="text-xs text-red-600" role="alert">
              {profileError}
            </p>
          )}
        </Row>
      </div>
    </div>
  )
}

function AppearanceContent() {
  const { t } = useTranslation('settings')
  const { settings, updateSettings } = useSettings()

  function handleThemeChange(value: string) {
    const theme = value as SettingsThemeMode
    applyTheme(theme)
    if (theme === 'light' || theme === 'dark') {
      setTheme(getThemeVariant(getTheme(), theme))
    }
    updateSettings({ theme })
  }

  function _badgeClass(color: AccentColor): string {
    if (color === 'orange') return 'bg-orange-500'
    if (color === 'purple') return 'bg-purple-500'
    if (color === 'blue') return 'bg-blue-500'
    return 'bg-green-500'
  }

  function _handleAccentColorChange(selectedAccent: AccentColor) {
    localStorage.setItem('hermes-accent', selectedAccent)
    document.documentElement.setAttribute('data-accent', selectedAccent)
    applyAccentColor(selectedAccent)
    updateSettings({ accentColor: selectedAccent })
  }

  return (
    <div className="space-y-4">
      <SectionHeader
        title={t('appearanceTitle', { defaultValue: 'Appearance' })}
        description={t('appearanceDesc', {
          defaultValue: 'Choose a workspace theme and accent color.',
        })}
      />
      <div className={SETTINGS_CARD_CLASS}>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary-500">
          {t('dialogThemeMode', { defaultValue: 'Theme mode' })}
        </p>
        <div className="inline-flex rounded-lg border border-primary-200 p-1">
          {[
            {
              value: 'light',
              label: t('dialogThemeLight', { defaultValue: 'Light' }),
              icon: Sun01Icon,
            },
            {
              value: 'dark',
              label: t('dialogThemeDark', { defaultValue: 'Dark' }),
              icon: Moon01Icon,
            },
            {
              value: 'system',
              label: t('dialogThemeSystem', { defaultValue: 'System' }),
              icon: ComputerIcon,
            },
          ].map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleThemeChange(option.value)}
              className={cn(
                'flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm transition-colors',
                settings.theme === option.value
                  ? 'bg-accent-500 text-white'
                  : 'text-primary-600 hover:bg-primary-100',
              )}
            >
              <HugeiconsIcon icon={option.icon} size={16} strokeWidth={1.5} />
              {option.label}
            </button>
          ))}
        </div>
      </div>
      {/* Accent color removed — themes control accent */}
      <div className={SETTINGS_CARD_CLASS}>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary-500">
          {t('dialogEnterpriseThemeSection', { defaultValue: 'Enterprise theme' })}
        </p>
        <EnterpriseThemePicker />
      </div>
      <div className={SETTINGS_CARD_CLASS}>
        <Row
          label={t('dialogSystemMetricsFooterLabel', {
            defaultValue: 'System metrics footer',
          })}
          description={t('dialogSystemMetricsFooterDesc', {
            defaultValue:
              'Show a persistent footer with CPU, RAM, disk, and Hermes status.',
          })}
        >
          <Switch
            checked={settings.showSystemMetricsFooter}
            onCheckedChange={(c) =>
              updateSettings({ showSystemMetricsFooter: c })
            }
            aria-label={t('dialogSystemMetricsFooterAria', {
              defaultValue: 'Show system metrics footer',
            })}
          />
        </Row>

        {/* Mobile chat nav removed — not relevant for Hermes */}
      </div>
    </div>
  )
}

const ENTERPRISE_THEME_FAMILIES: Array<ThemeId> = [
  'hermes-nous',
  'hermes-official',
  'hermes-classic',
  'hermes-slate',
]

const ENTERPRISE_THEMES = THEMES.map((theme) => ({
  ...theme,
  desc: theme.description,
  preview:
    theme.id === 'hermes-nous'
      ? {
          bg: '#041C1C',
          panel: '#06282A',
          border: 'rgba(255,230,203,0.2)',
          accent: '#FFAC02',
          text: '#FFE6CB',
        }
      : theme.id === 'hermes-nous-light'
        ? {
            bg: '#F8FAF8',
            panel: '#FBFDFB',
            border: 'rgba(30,74,92,0.18)',
            accent: '#2557B7',
            text: '#16315F',
          }
      : theme.id === 'hermes-official'
      ? {
          bg: '#0A0E1A',
          panel: '#11182A',
          border: '#24304A',
          accent: '#6366F1',
          text: '#E6EAF2',
        }
      : theme.id === 'hermes-official-light'
        ? {
            bg: '#F7F7F1',
            panel: '#FAFBF6',
            border: '#CDD5DA',
            accent: '#2557B7',
            text: '#16315F',
          }
        : theme.id === 'hermes-classic'
          ? {
              bg: '#0d0f12',
              panel: '#1a1f26',
              border: '#2a313b',
              accent: '#b98a44',
              text: '#eceff4',
            }
          : theme.id === 'hermes-classic-light'
            ? {
                bg: '#F5F2ED',
                panel: '#FCFAF7',
                border: '#D8CCBC',
                accent: '#b98a44',
                text: '#1a1f26',
              }
            : theme.id === 'hermes-slate'
              ? {
                  bg: '#0d1117',
                  panel: '#1c2128',
                  border: '#30363d',
                  accent: '#7eb8f6',
                  text: '#c9d1d9',
                }
              : {
                  bg: '#F6F8FA',
                  panel: '#FFFFFF',
                  border: '#D0D7DE',
                  accent: '#3b82f6',
                  text: '#24292f',
                },
}))

function ThemeSwatch({
  colors,
}: {
  colors: (typeof ENTERPRISE_THEMES)[number]['preview']
}) {
  return (
    <div
      className="flex h-10 w-full overflow-hidden rounded-md border"
      style={{ borderColor: colors.border, backgroundColor: colors.bg }}
    >
      <div
        className="flex h-full w-4 flex-col gap-0.5 p-0.5"
        style={{ backgroundColor: colors.panel }}
      >
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-1.5 w-full rounded-sm"
            style={{ backgroundColor: colors.border }}
          />
        ))}
      </div>
      <div className="flex flex-1 flex-col gap-0.5 p-1">
        <div
          className="h-1.5 w-3/4 rounded"
          style={{ backgroundColor: colors.text, opacity: 0.8 }}
        />
        <div
          className="h-1 w-1/2 rounded"
          style={{ backgroundColor: colors.text, opacity: 0.3 }}
        />
        <div
          className="mt-0.5 h-1.5 w-6 rounded-full"
          style={{ backgroundColor: colors.accent }}
        />
      </div>
    </div>
  )
}

function EnterpriseThemePicker() {
  const { t } = useTranslation('settings')
  const { updateSettings } = useSettings()
  const [current, setCurrent] = useState(() => {
    if (typeof window === 'undefined') return 'hermes-nous'
    return getTheme()
  })
  const currentMode = isDarkTheme(current) ? 'dark' : 'light'

  useEffect(() => {
    setCurrent(getTheme())
  }, [])

  function applyEnterpriseTheme(id: ThemeId) {
    setTheme(id)
    updateSettings({ theme: isDarkTheme(id) ? 'dark' : 'light' })
    setCurrent(id)
  }

  function toggleEnterpriseThemeMode() {
    const nextMode = currentMode === 'dark' ? 'light' : 'dark'
    applyEnterpriseTheme(getThemeVariant(current, nextMode))
  }

  const visibleThemes = ENTERPRISE_THEME_FAMILIES.map((themeId) =>
    ENTERPRISE_THEMES.find(
      (theme) => theme.id === getThemeVariant(themeId, currentMode),
    ),
  ).filter(Boolean) as typeof ENTERPRISE_THEMES

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between rounded-lg border border-primary-200 px-3 py-2">
        <div>
          <p className="text-xs font-semibold text-primary-900 dark:text-neutral-100">
            {currentMode === 'dark'
              ? t('dialogEnterpriseModeDark', { defaultValue: 'Dark mode' })
              : t('dialogEnterpriseModeLight', { defaultValue: 'Light mode' })}
          </p>
          <p className="text-[11px] text-primary-500 dark:text-neutral-400">
            {t('dialogEnterpriseModeToggleDesc', {
              defaultValue:
                'Toggle the current theme family between paired light and dark variants.',
            })}
          </p>
        </div>
        <button
          type="button"
          onClick={toggleEnterpriseThemeMode}
          className="inline-flex items-center gap-2 rounded-lg border border-primary-200 bg-primary-50 px-3 py-1.5 text-xs font-medium text-primary-900 transition-colors hover:bg-primary-100"
          aria-label={
            currentMode === 'dark'
              ? t('dialogEnterpriseAriaToLight', {
                  defaultValue: 'Switch enterprise theme to light mode',
                })
              : t('dialogEnterpriseAriaToDark', {
                  defaultValue: 'Switch enterprise theme to dark mode',
                })
          }
        >
          <HugeiconsIcon
            icon={currentMode === 'dark' ? Sun01Icon : Moon01Icon}
            size={16}
            strokeWidth={1.5}
          />
          {currentMode === 'dark'
            ? t('dialogEnterpriseToggleLight', { defaultValue: 'Light' })
            : t('dialogEnterpriseToggleDark', { defaultValue: 'Dark' })}
        </button>
      </div>
      <div className="grid w-full grid-cols-2 gap-2">
        {visibleThemes.map((themeEntry) => {
          const isActive = current === themeEntry.id
          const slug = themeEntry.id.replace(/-/g, '_')
          const labelKey = `themeCard_${slug}_label`
          const descKey = `themeCard_${slug}_desc`
          return (
            <button
              key={themeEntry.id}
              type="button"
              onClick={() => applyEnterpriseTheme(themeEntry.id)}
              className={cn(
                'flex flex-col gap-1.5 rounded-lg border p-2 text-left transition-colors',
                isActive
                  ? 'border-accent-500 bg-accent-50 text-accent-700'
                  : 'border-primary-200 bg-primary-50/80 hover:bg-primary-100',
              )}
            >
              <ThemeSwatch colors={themeEntry.preview} />
              <div className="flex items-center gap-1">
                <span className="text-xs">{themeEntry.icon}</span>
                <span className="text-xs font-semibold text-primary-900 dark:text-neutral-100">
                  {t(labelKey, { defaultValue: themeEntry.label })}
                </span>
                {isActive && (
                  <span className="ml-auto text-[9px] font-bold text-accent-600 uppercase tracking-wide">
                    {t('themePickerActive', { defaultValue: 'Active' })}
                  </span>
                )}
              </div>
              <p className="text-[10px] text-primary-500 dark:text-neutral-400 leading-tight">
                {t(descKey, { defaultValue: themeEntry.desc })}
              </p>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function _LoaderContent() {
  const { settings: cs, updateSettings: updateCS } = useChatSettingsStore()
  const styles: Array<{ value: LoaderStyle; label: string }> = [
    { value: 'dots', label: 'Dots' },
    { value: 'braille-hermes', label: 'Hermes' },
    { value: 'braille-orbit', label: 'Orbit' },
    { value: 'braille-breathe', label: 'Breathe' },
    { value: 'braille-pulse', label: 'Pulse' },
    { value: 'braille-wave', label: 'Wave' },
    { value: 'lobster', label: 'Lobster' },
    { value: 'logo', label: 'Logo' },
  ]
  function getPreset(s: LoaderStyle): BrailleSpinnerPreset | null {
    const m: Record<string, BrailleSpinnerPreset> = {
      'braille-hermes': 'hermes',
      'braille-orbit': 'orbit',
      'braille-breathe': 'breathe',
      'braille-pulse': 'pulse',
      'braille-wave': 'wave',
    }
    return m[s] ?? null
  }
  function Preview({ style }: { style: LoaderStyle }) {
    if (style === 'dots') return <ThreeDotsSpinner />
    if (style === 'lobster')
      return <span className="inline-block text-sm animate-pulse">🦞</span>
    if (style === 'logo') return <LogoLoader />
    const p = getPreset(style)
    return p ? (
      <BrailleSpinner
        preset={p}
        size={16}
        speed={120}
        className="text-primary-500"
      />
    ) : (
      <ThreeDotsSpinner />
    )
  }
  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary-500">
        Loading animation
      </p>
      <div className="grid grid-cols-4 gap-2">
        {styles.map((o) => (
          <button
            key={o.value}
            type="button"
            onClick={() => updateCS({ loaderStyle: o.value })}
            className={cn(
              'flex min-h-14 flex-col items-center justify-center gap-1.5 rounded-lg border px-1.5 py-1.5 transition-colors',
              cs.loaderStyle === o.value
                ? 'border-accent-500 bg-accent-50 text-accent-700'
                : 'border-primary-200 bg-primary-50/80 text-primary-700 hover:bg-primary-100',
            )}
            aria-pressed={cs.loaderStyle === o.value}
          >
            <span className="flex h-4 items-center justify-center">
              <Preview style={o.value} />
            </span>
            <span className="text-[10px] font-medium leading-3">{o.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

function ChatContent() {
  const { t } = useTranslation('settings')
  const { settings: cs, updateSettings: updateCS } = useChatSettingsStore()
  return (
    <div className="space-y-4">
      <SectionHeader
        title={t('sectionChat', { defaultValue: 'Chat' })}
        description={t('chatDisplaySectionDesc', {
          defaultValue: "Control what's visible in chat messages.",
        })}
      />
      <div className={SETTINGS_CARD_CLASS}>
        <Row
          label={t('chatShowToolMessagesLabel', {
            defaultValue: 'Show tool messages',
          })}
          description={t('chatShowToolMessagesDesc', {
            defaultValue:
              'Display tool call details when the agent uses tools.',
          })}
        >
          <Switch
            checked={cs.showToolMessages}
            onCheckedChange={(c) => updateCS({ showToolMessages: c })}
            aria-label={t('chatShowToolMessagesLabel', {
              defaultValue: 'Show tool messages',
            })}
          />
        </Row>
        <Row
          label={t('chatShowReasoningLabel', {
            defaultValue: 'Show reasoning blocks',
          })}
          description={t('chatShowReasoningDesc', {
            defaultValue: 'Display model thinking and reasoning process.',
          })}
        >
          <Switch
            checked={cs.showReasoningBlocks}
            onCheckedChange={(c) => updateCS({ showReasoningBlocks: c })}
            aria-label={t('chatShowReasoningLabel', {
              defaultValue: 'Show reasoning blocks',
            })}
          />
        </Row>
        <Row
          label={t('chatSoundCompleteLabel', {
            defaultValue: 'Sound on response complete',
          })}
          description={t('chatSoundCompleteDesc', {
            defaultValue:
              'Play a short sound in the browser when the agent finishes replying.',
          })}
        >
          <Switch
            checked={cs.soundOnChatComplete}
            onCheckedChange={(c) => updateCS({ soundOnChatComplete: c })}
            aria-label={t('chatSoundCompleteLabel', {
              defaultValue: 'Sound on response complete',
            })}
          />
        </Row>
        <Row
          label={t('chatEnterBehaviorLabel', {
            defaultValue: 'Enter key behavior',
          })}
          description={
            cs.enterBehavior === 'newline'
              ? t('chatEnterNewlineHint', {
                  defaultValue:
                    'Enter inserts a newline. Use ⌘/Ctrl+Enter to send.',
                })
              : t('chatEnterSendHint', {
                  defaultValue:
                    'Enter sends the message. Use Shift+Enter for a newline.',
                })
          }
        >
          <Switch
            checked={cs.enterBehavior === 'newline'}
            onCheckedChange={(c) =>
              updateCS({ enterBehavior: c ? 'newline' : 'send' })
            }
            aria-label={t('chatEnterBehaviorLabel', {
              defaultValue: 'Enter key behavior',
            })}
          />
        </Row>
        <Row
          label={t('chatWidthLabel', { defaultValue: 'Chat content width' })}
          description={t('chatWidthDesc', {
            defaultValue: 'Controls the max-width of the message column on wide screens.',
          })}
        >
          <select
            value={cs.chatWidth}
            onChange={(e) =>
              updateCS({
                chatWidth: e.target.value as
                  | 'comfortable'
                  | 'wide'
                  | 'full',
              })
            }
            className="h-8 rounded-md border border-primary-200 bg-primary-50 px-2 text-sm text-primary-900 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-primary-400"
            aria-label={t('chatWidthLabel', {
              defaultValue: 'Chat content width',
            })}
          >
            <option value="comfortable">
              {t('chatWidthComfortable', {
                defaultValue: 'Comfortable (900px)',
              })}
            </option>
            <option value="wide">
              {t('chatWidthWide', { defaultValue: 'Wide (1200px)' })}
            </option>
            <option value="full">
              {t('chatWidthFull', { defaultValue: 'Full width' })}
            </option>
          </select>
        </Row>
        <Row
          label={t('chatSidebarHoverLabel', {
            defaultValue: 'Expand sidebar on hover',
          })}
          description={
            cs.sidebarHoverExpand
              ? t('chatSidebarHoverOnHint', {
                  defaultValue:
                    'Collapsed sidebar expands temporarily when you hover over it.',
                })
              : t('chatSidebarHoverOffHint', {
                  defaultValue:
                    'Collapsed sidebar stays at 48px until you click the toggle.',
                })
          }
        >
          <Switch
            checked={cs.sidebarHoverExpand}
            onCheckedChange={(c) => updateCS({ sidebarHoverExpand: c })}
            aria-label={t('chatSidebarHoverLabel', {
              defaultValue: 'Expand sidebar on hover',
            })}
          />
        </Row>
      </div>
      {/* Loading animation removed — not relevant for Hermes */}
    </div>
  )
}

function NotificationsContent() {
  const { t } = useTranslation('settings')
  const { settings, updateSettings } = useSettings()
  return (
    <div className="space-y-4">
      <SectionHeader
        title={t('notificationsSectionTitle', {
          defaultValue: 'Notifications',
        })}
        description={t('notificationsSectionDesc', {
          defaultValue: 'Control alert delivery and usage warning threshold.',
        })}
      />
      <div className={SETTINGS_CARD_CLASS}>
        <Row
          label={t('enableAlertsLabel', { defaultValue: 'Enable alerts' })}
          description={t('enableAlertsDesc', {
            defaultValue: 'Show usage and system alert notifications.',
          })}
        >
          <Switch
            checked={settings.notificationsEnabled}
            onCheckedChange={(c) => updateSettings({ notificationsEnabled: c })}
            aria-label={t('enableAlertsLabel', { defaultValue: 'Enable alerts' })}
          />
        </Row>
        <Row
          label={t('usageThresholdLabel', { defaultValue: 'Usage threshold' })}
          description={t('usageThresholdDesc', {
            defaultValue: 'Set usage warning trigger between 50% and 100%.',
          })}
        >
          <div className="flex w-full max-w-[14rem] items-center gap-2">
            <input
              type="range"
              min={50}
              max={100}
              value={settings.usageThreshold}
              onChange={(e) =>
                updateSettings({ usageThreshold: Number(e.target.value) })
              }
              className="w-full accent-primary-900 dark:accent-primary-400 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={!settings.notificationsEnabled}
              aria-label={t('usageThresholdAria', {
                percent: settings.usageThreshold,
                defaultValue: `Usage threshold: ${settings.usageThreshold} percent`,
              })}
              aria-valuemin={50}
              aria-valuemax={100}
              aria-valuenow={settings.usageThreshold}
            />
            <span className="w-10 text-right text-sm tabular-nums text-primary-700 dark:text-neutral-300">
              {settings.usageThreshold}%
            </span>
          </div>
        </Row>
      </div>
    </div>
  )
}

function _AdvancedContent() {
  const { settings, updateSettings } = useSettings()
  const [connectionStatus, setConnectionStatus] = useState<
    'idle' | 'testing' | 'connected' | 'failed'
  >('idle')
  const [urlError, setUrlError] = useState<string | null>(null)

  function validateAndUpdateUrl(value: string) {
    if (value && value.length > 0) {
      try {
        new URL(value)
        setUrlError(null)
      } catch {
        setUrlError('Invalid URL format')
      }
    } else {
      setUrlError(null)
    }
    updateSettings({ hermesUrl: value })
  }

  async function testConnection() {
    if (urlError) return
    setConnectionStatus('testing')
    try {
      const r = await fetch('/api/ping')
      setConnectionStatus(r.ok ? 'connected' : 'failed')
    } catch {
      setConnectionStatus('failed')
    }
  }

  const urlErrorId = 'hermes-url-error'

  return (
    <div className="space-y-4">
      <SectionHeader
        title="Advanced"
        description="Hermes endpoint and connectivity."
      />
      <div className={SETTINGS_CARD_CLASS}>
        <Row label="Hermes URL" description="Used for API requests from Studio">
          <div className="w-full max-w-sm">
            <Input
              type="url"
              placeholder="https://api.hermesworkspace.app"
              value={settings.hermesUrl}
              onChange={(e) => validateAndUpdateUrl(e.target.value)}
              className="h-8 w-full rounded-lg border-primary-200 text-sm"
              aria-label="Hermes URL"
              aria-invalid={!!urlError}
              aria-describedby={urlError ? urlErrorId : undefined}
            />
            {urlError && (
              <p
                id={urlErrorId}
                className="mt-1 text-xs text-red-600"
                role="alert"
              >
                {urlError}
              </p>
            )}
          </div>
        </Row>
        <Row label="Connection status">
          <span
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-xs font-medium',
              connectionStatus === 'connected' &&
                'border-green-500/35 bg-green-500/10 text-green-600',
              connectionStatus === 'failed' &&
                'border-red-500/35 bg-red-500/10 text-red-600',
              connectionStatus === 'testing' &&
                'border-accent-500/35 bg-accent-500/10 text-accent-600',
              connectionStatus === 'idle' &&
                'border-primary-300 bg-primary-100 text-primary-700',
            )}
          >
            {connectionStatus === 'idle'
              ? 'Not tested'
              : connectionStatus === 'testing'
                ? 'Testing...'
                : connectionStatus === 'connected'
                  ? 'Connected'
                  : 'Failed'}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => void testConnection()}
            disabled={connectionStatus === 'testing' || !!urlError}
            className="h-8 rounded-lg border-primary-200 px-3"
          >
            <HugeiconsIcon
              icon={CheckmarkCircle02Icon}
              size={16}
              strokeWidth={1.5}
            />
            Test
          </Button>
        </Row>
      </div>
    </div>
  )
}

// ── Error Boundary ──────────────────────────────────────────────────────

class SettingsErrorBoundary extends Component<
  { children: React.ReactNode },
  { error: Error | null }
> {
  state = { error: null as Error | null }

  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  render() {
    if (this.state.error) {
      return (
        <div className="flex h-full items-center justify-center p-8 text-center">
          <div>
            <p className="mb-2 text-sm font-medium text-red-500">
              {i18nStaticT('settings:configureFailed')}
            </p>
            <button
              onClick={() => this.setState({ error: null })}
              className="text-xs text-primary-600 underline hover:text-primary-900"
            >
              {i18nStaticT('common:tryAgain')}
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

// ── Agent Behavior ──────────────────────────────────────────────────────

function AgentBehaviorContent() {
  const { t } = useTranslation(['settings', 'common'])
  const [config, setConfig] = useState<Record<string, unknown>>({})
  const [toast, setToast] = useState<'saved' | 'failed' | null>(null)

  useEffect(() => {
    fetch('/api/hermes-config')
      .then((r) => r.json())
      .then((d: any) => {
        setConfig((d.config?.agent as Record<string, unknown>) || {})
      })
      .catch(() => {})
  }, [])

  const save = async (key: string, value: unknown) => {
    setToast(null)
    try {
      await fetch('/api/hermes-config', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ config: { agent: { [key]: value } } }),
      })
      setConfig((prev) => ({ ...prev, [key]: value }))
      setToast('saved')
      setTimeout(() => setToast(null), 2000)
    } catch {
      setToast('failed')
    }
  }

  return (
    <div className="space-y-4">
      <SectionHeader
        title={t('settings:agentBehaviorTitle', {
          defaultValue: 'Agent Behavior',
        })}
        description={t('settings:agentBehaviorDesc', {
          defaultValue: 'Control agent execution limits and tool access.',
        })}
      />
      {toast && (
        <div
          className={cn(
            'rounded-lg px-3 py-1.5 text-xs font-medium',
            toast === 'saved'
              ? 'bg-green-500/15 text-green-400'
              : 'bg-red-500/15 text-red-400',
          )}
        >
          {toast === 'saved'
            ? t('common:saved', { defaultValue: 'Saved' })
            : t('settings:hermesSaveFailed', { defaultValue: 'Failed to save' })}
        </div>
      )}
      <div className={SETTINGS_CARD_CLASS}>
        <Row
          label={t('settings:maxTurnsLabel', { defaultValue: 'Max turns' })}
          description={t('settings:maxTurnsDesc', {
            defaultValue: 'Maximum agent turns per request (1-100).',
          })}
        >
          <input
            type="number"
            min={1}
            max={100}
            value={Number(config.max_turns) || 50}
            onChange={(e) => save('max_turns', Number(e.target.value))}
            className="h-8 w-20 rounded-lg border border-primary-200 bg-primary-50 px-2 text-sm text-center text-primary-900 outline-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
          />
        </Row>
        <Row
          label={t('settings:gatewayTimeoutLabel', {
            defaultValue: 'Gateway timeout',
          })}
          description={t('settings:gatewayTimeoutDesc', {
            defaultValue: 'Seconds before gateway times out a request.',
          })}
        >
          <input
            type="number"
            min={10}
            max={600}
            value={Number(config.gateway_timeout) || 120}
            onChange={(e) => save('gateway_timeout', Number(e.target.value))}
            className="h-8 w-20 rounded-lg border border-primary-200 bg-primary-50 px-2 text-sm text-center text-primary-900 outline-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
          />
        </Row>
        <Row
          label={t('settings:toolUseEnforcementLabel', {
            defaultValue: 'Tool use enforcement',
          })}
          description={t('settings:toolUseEnforcementDesc', {
            defaultValue: 'Whether the agent must use tools when available.',
          })}
        >
          <select
            value={String(config.tool_use_enforcement || 'auto')}
            onChange={(e) => save('tool_use_enforcement', e.target.value)}
            className="h-8 rounded-lg border border-primary-200 bg-primary-50 px-2 text-sm text-primary-900 outline-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
          >
            <option value="auto">
              {t('settings:toolUseAuto', { defaultValue: 'auto' })}
            </option>
            <option value="required">
              {t('settings:toolUseRequired', { defaultValue: 'required' })}
            </option>
            <option value="none">
              {t('settings:toolUseNone', { defaultValue: 'none' })}
            </option>
          </select>
        </Row>
      </div>
    </div>
  )
}

// ── Smart Routing ───────────────────────────────────────────────────────

function SmartRoutingContent() {
  const { t } = useTranslation(['settings', 'common'])
  const [config, setConfig] = useState<Record<string, unknown>>({})
  const [models, setModels] = useState<Array<{ id: string; name?: string }>>([])
  const [toast, setToast] = useState<'saved' | 'failed' | null>(null)

  useEffect(() => {
    fetch('/api/hermes-config')
      .then((r) => r.json())
      .then((d: any) => {
        setConfig(
          (d.config?.smart_model_routing as Record<string, unknown>) || {},
        )
      })
      .catch(() => {})
    fetch('/api/models')
      .then((r) => r.json())
      .then((d: any) => {
        setModels(d.models || [])
      })
      .catch(() => {})
  }, [])

  const save = async (key: string, value: unknown) => {
    setToast(null)
    try {
      await fetch('/api/hermes-config', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          config: { smart_model_routing: { [key]: value } },
        }),
      })
      setConfig((prev) => ({ ...prev, [key]: value }))
      setToast('saved')
      setTimeout(() => setToast(null), 2000)
    } catch {
      setToast('failed')
    }
  }

  return (
    <div className="space-y-4">
      <SectionHeader
        title={t('settings:smartRoutingTitle', {
          defaultValue: 'Smart Model Routing',
        })}
        description={t('settings:smartRoutingDesc', {
          defaultValue: 'Automatically route simple queries to cheaper models.',
        })}
      />
      {toast && (
        <div
          className={cn(
            'rounded-lg px-3 py-1.5 text-xs font-medium',
            toast === 'saved'
              ? 'bg-green-500/15 text-green-400'
              : 'bg-red-500/15 text-red-400',
          )}
        >
          {toast === 'saved'
            ? t('common:saved', { defaultValue: 'Saved' })
            : t('settings:hermesSaveFailed', { defaultValue: 'Failed to save' })}
        </div>
      )}
      <div className={SETTINGS_CARD_CLASS}>
        <Row
          label={t('settings:enableSmartRoutingLabel', {
            defaultValue: 'Enable smart routing',
          })}
          description={t('settings:enableSmartRoutingDesc', {
            defaultValue: 'Route simple queries to a cheaper model automatically.',
          })}
        >
          <Switch
            checked={config.enabled !== false}
            onCheckedChange={(c) => save('enabled', c)}
          />
        </Row>
        <Row
          label={t('settings:cheapModelLabel', { defaultValue: 'Cheap model' })}
          description={t('settings:cheapModelDesc', {
            defaultValue: 'Model to use for simple queries.',
          })}
        >
          <select
            value={String(config.cheap_model || '')}
            onChange={(e) => save('cheap_model', e.target.value)}
            className="h-8 max-w-[12rem] rounded-lg border border-primary-200 bg-primary-50 px-2 text-sm text-primary-900 outline-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
          >
            <option value="">
              {t('settings:autoDetectOption', { defaultValue: 'Auto-detect' })}
            </option>
            {models.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name || m.id}
              </option>
            ))}
          </select>
        </Row>
        <Row
          label={t('settings:maxSimpleCharsLabel', {
            defaultValue: 'Max simple chars',
          })}
          description={t('settings:maxSimpleCharsDesc', {
            defaultValue: 'Messages shorter than this use the cheap model.',
          })}
        >
          <input
            type="number"
            min={10}
            max={2000}
            value={Number(config.max_simple_chars) || 200}
            onChange={(e) => save('max_simple_chars', Number(e.target.value))}
            className="h-8 w-20 rounded-lg border border-primary-200 bg-primary-50 px-2 text-sm text-center text-primary-900 outline-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
          />
        </Row>
        <Row
          label={t('settings:maxSimpleWordsLabel', {
            defaultValue: 'Max simple words',
          })}
          description={t('settings:maxSimpleWordsDesc', {
            defaultValue: 'Messages with fewer words use the cheap model.',
          })}
        >
          <input
            type="number"
            min={1}
            max={500}
            value={Number(config.max_simple_words) || 30}
            onChange={(e) => save('max_simple_words', Number(e.target.value))}
            className="h-8 w-20 rounded-lg border border-primary-200 bg-primary-50 px-2 text-sm text-center text-primary-900 outline-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
          />
        </Row>
      </div>
    </div>
  )
}

// ── Voice (TTS + STT) ──────────────────────────────────────────────────

function VoiceContent() {
  const { t } = useTranslation(['settings', 'common'])
  const [tts, setTts] = useState<Record<string, unknown>>({})
  const [stt, setStt] = useState<Record<string, unknown>>({})
  const [toast, setToast] = useState<'saved' | 'failed' | null>(null)

  useEffect(() => {
    fetch('/api/hermes-config')
      .then((r) => r.json())
      .then((d: any) => {
        setTts((d.config?.tts as Record<string, unknown>) || {})
        setStt((d.config?.stt as Record<string, unknown>) || {})
      })
      .catch(() => {})
  }, [])

  const saveTts = async (key: string, value: unknown) => {
    setToast(null)
    try {
      await fetch('/api/hermes-config', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ config: { tts: { [key]: value } } }),
      })
      setTts((prev) => ({ ...prev, [key]: value }))
      setToast('saved')
      setTimeout(() => setToast(null), 2000)
    } catch {
      setToast('failed')
    }
  }

  const saveStt = async (key: string, value: unknown) => {
    setToast(null)
    try {
      await fetch('/api/hermes-config', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ config: { stt: { [key]: value } } }),
      })
      setStt((prev) => ({ ...prev, [key]: value }))
      setToast('saved')
      setTimeout(() => setToast(null), 2000)
    } catch {
      setToast('failed')
    }
  }

  const ttsProvider = String(tts.provider || 'edge')

  return (
    <div className="space-y-4">
      <SectionHeader
        title={t('settings:sectionVoice', { defaultValue: 'Voice' })}
        description={t('settings:dialogVoiceSectionDesc', {
          defaultValue: 'Text-to-speech and speech-to-text.',
        })}
      />
      {toast && (
        <div
          className={cn(
            'rounded-lg px-3 py-1.5 text-xs font-medium',
            toast === 'saved'
              ? 'bg-green-500/15 text-green-400'
              : 'bg-red-500/15 text-red-400',
          )}
        >
          {toast === 'saved'
            ? t('common:saved', { defaultValue: 'Saved' })
            : t('settings:hermesSaveFailed', { defaultValue: 'Failed to save' })}
        </div>
      )}
      <div className={SETTINGS_CARD_CLASS}>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary-500">
          {t('settings:ttsSectionTitle', { defaultValue: 'Text-to-Speech' })}
        </p>
        <Row
          label={t('settings:ttsProviderLabel', { defaultValue: 'TTS provider' })}
          description={t('settings:ttsProviderDesc', {
            defaultValue: 'Which TTS engine to use.',
          })}
        >
          <select
            value={ttsProvider}
            onChange={(e) => saveTts('provider', e.target.value)}
            className="h-8 rounded-lg border border-primary-200 bg-primary-50 px-2 text-sm text-primary-900 outline-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
          >
            <option value="edge">
              {t('settings:ttsOptionEdge', { defaultValue: 'Edge TTS (free)' })}
            </option>
            <option value="elevenlabs">
              {t('settings:ttsOptionElevenlabs', { defaultValue: 'ElevenLabs' })}
            </option>
            <option value="openai">
              {t('settings:ttsOptionOpenai', { defaultValue: 'OpenAI TTS' })}
            </option>
            <option value="neutts">
              {t('settings:ttsOptionNeutts', { defaultValue: 'NeuTTS' })}
            </option>
          </select>
        </Row>
        {ttsProvider === 'openai' && (
          <Row
            label={t('settings:ttsVoiceLabel', { defaultValue: 'Voice' })}
            description={t('settings:ttsVoiceOpenaiDesc', {
              defaultValue: 'alloy, echo, fable, onyx, nova, shimmer',
            })}
          >
            <select
              value={String(
                (tts.openai as Record<string, unknown>)?.voice || 'nova',
              )}
              onChange={(e) =>
                saveTts('openai', {
                  ...((tts.openai as Record<string, unknown>) || {}),
                  voice: e.target.value,
                })
              }
              className="h-8 rounded-lg border border-primary-200 bg-primary-50 px-2 text-sm text-primary-900 outline-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
            >
              {['alloy', 'echo', 'fable', 'onyx', 'nova', 'shimmer'].map(
                (v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ),
              )}
            </select>
          </Row>
        )}
      </div>
      <div className={SETTINGS_CARD_CLASS}>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary-500">
          {t('settings:sttSectionTitle', { defaultValue: 'Speech-to-Text' })}
        </p>
        <Row
          label={t('settings:sttEnableLabel', { defaultValue: 'Enable STT' })}
          description={t('settings:sttEnableDesc', {
            defaultValue: 'Turn on voice input.',
          })}
        >
          <Switch
            checked={stt.enabled !== false}
            onCheckedChange={(c) => saveStt('enabled', c)}
          />
        </Row>
        <Row
          label={t('settings:sttProviderLabel', { defaultValue: 'STT provider' })}
          description={t('settings:sttProviderDesc', {
            defaultValue: 'Which speech engine to use.',
          })}
        >
          <select
            value={String(stt.provider || 'local')}
            onChange={(e) => saveStt('provider', e.target.value)}
            className="h-8 rounded-lg border border-primary-200 bg-primary-50 px-2 text-sm text-primary-900 outline-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
          >
            <option value="local">
              {t('settings:sttOptionLocal', { defaultValue: 'Local (Whisper)' })}
            </option>
            <option value="openai">
              {t('settings:sttOptionOpenai', {
                defaultValue: 'OpenAI Whisper API',
              })}
            </option>
          </select>
        </Row>
      </div>
    </div>
  )
}

// ── Display ─────────────────────────────────────────────────────────────

function DisplayContent() {
  const { t } = useTranslation(['settings', 'common'])
  const [config, setConfig] = useState<Record<string, unknown>>({})
  const [toast, setToast] = useState<'saved' | 'failed' | null>(null)

  useEffect(() => {
    fetch('/api/hermes-config')
      .then((r) => r.json())
      .then((d: any) => {
        setConfig((d.config?.display as Record<string, unknown>) || {})
      })
      .catch(() => {})
  }, [])

  const save = async (key: string, value: unknown) => {
    setToast(null)
    try {
      await fetch('/api/hermes-config', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ config: { display: { [key]: value } } }),
      })
      setConfig((prev) => ({ ...prev, [key]: value }))
      setToast('saved')
      setTimeout(() => setToast(null), 2000)
    } catch {
      setToast('failed')
    }
  }

  return (
    <div className="space-y-4">
      <SectionHeader
        title={t('settings:sectionDisplay', { defaultValue: 'Display' })}
        description={t('settings:displayDialogSectionDesc', {
          defaultValue: 'Agent response style and output preferences.',
        })}
      />
      {toast && (
        <div
          className={cn(
            'rounded-lg px-3 py-1.5 text-xs font-medium',
            toast === 'saved'
              ? 'bg-green-500/15 text-green-400'
              : 'bg-red-500/15 text-red-400',
          )}
        >
          {toast === 'saved'
            ? t('common:saved', { defaultValue: 'Saved' })
            : t('settings:hermesSaveFailed', { defaultValue: 'Failed to save' })}
        </div>
      )}
      <div className={SETTINGS_CARD_CLASS}>
        <Row
          label={t('settings:displayPersonalityLabel', {
            defaultValue: 'Personality',
          })}
          description={t('settings:displayPersonalityDesc', {
            defaultValue: 'Agent response style.',
          })}
        >
          <select
            value={String(config.personality || 'default')}
            onChange={(e) => save('personality', e.target.value)}
            className="h-8 rounded-lg border border-primary-200 bg-primary-50 px-2 text-sm text-primary-900 outline-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
          >
            <option value="default">
              {t('settings:displayPersonalityOptionDefault', {
                defaultValue: 'Default',
              })}
            </option>
            <option value="concise">
              {t('settings:displayPersonalityOptionConcise', {
                defaultValue: 'Concise',
              })}
            </option>
            <option value="verbose">
              {t('settings:displayPersonalityOptionVerbose', {
                defaultValue: 'Verbose',
              })}
            </option>
            <option value="creative">
              {t('settings:displayPersonalityOptionCreative', {
                defaultValue: 'Creative',
              })}
            </option>
          </select>
        </Row>
        <Row
          label={t('settings:displayStreamingLabel', {
            defaultValue: 'Streaming',
          })}
          description={t('settings:displayStreamingDesc', {
            defaultValue: 'Stream tokens as they arrive.',
          })}
        >
          <Switch
            checked={config.streaming !== false}
            onCheckedChange={(c) => save('streaming', c)}
          />
        </Row>
        <Row
          label={t('settings:displayShowReasoningLabel', {
            defaultValue: 'Show reasoning',
          })}
          description={t('settings:displayShowReasoningDesc', {
            defaultValue: 'Expose model reasoning blocks in the UI.',
          })}
        >
          <Switch
            checked={config.show_reasoning !== false}
            onCheckedChange={(c) => save('show_reasoning', c)}
          />
        </Row>
        <Row
          label={t('settings:displayShowCostLabel', { defaultValue: 'Show cost' })}
          description={t('settings:displayShowCostDesc', {
            defaultValue: 'Display usage cost metadata.',
          })}
        >
          <Switch
            checked={config.show_cost === true}
            onCheckedChange={(c) => save('show_cost', c)}
          />
        </Row>
        <Row
          label={t('settings:displayCompactLabel', {
            defaultValue: 'Compact',
          })}
          description={t('settings:displayCompactDesc', {
            defaultValue: 'Use a denser display layout.',
          })}
        >
          <Switch
            checked={config.compact === true}
            onCheckedChange={(c) => save('compact', c)}
          />
        </Row>
      </div>
    </div>
  )
}

// ── Language ────────────────────────────────────────────────────────────

import { getLocale, setLocale, LOCALE_LABELS, type LocaleId } from '@/lib/i18n'

function LanguageContent() {
  const { t } = useTranslation('settings')
  return (
    <div className="space-y-4">
      <SectionHeader
        title={t('language', { defaultValue: 'Language' })}
        description={t('languageDescription', {
          defaultValue: 'Choose the display language for the workspace UI.',
        })}
      />
      <Row
        label={t('interfaceLanguage', { defaultValue: 'Interface Language' })}
        description={t('languageHint', {
          defaultValue:
            'Translates navigation, labels, and buttons.',
        })}
      >
        <select
          value={getLocale()}
          onChange={(e) => {
            setLocale(e.target.value as LocaleId)
          }}
          className="h-9 w-full rounded-lg border border-primary-200 dark:border-neutral-700 bg-primary-50 dark:bg-neutral-800 px-3 text-sm text-primary-900 dark:text-neutral-100 outline-none md:max-w-xs"
        >
          {(Object.entries(LOCALE_LABELS) as Array<[LocaleId, string]>).map(([id, label]) => (
            <option key={id} value={id}>{label}</option>
          ))}
        </select>
      </Row>
    </div>
  )
}

// ── Main Dialog ─────────────────────────────────────────────────────────

const CONTENT_MAP: Record<SectionId, () => React.JSX.Element> = {
  hermes: HermesContent,
  agent: AgentBehaviorContent,
  routing: SmartRoutingContent,
  voice: VoiceContent,
  display: DisplayContent,
  appearance: AppearanceContent,
  chat: ChatContent,
  notifications: NotificationsContent,
  language: LanguageContent,
}

type SettingsDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialSection?: SectionId
}

export function SettingsDialog({
  open,
  onOpenChange,
  initialSection = 'hermes',
}: SettingsDialogProps) {
  const { t } = useTranslation(['settings', 'common'])
  const [active, setActive] = useState<SectionId>(initialSection)
  const [mobileView, setMobileView] = useState<'nav' | 'content'>('nav')
  const ActiveContent = CONTENT_MAP[active]

  useEffect(() => {
    if (open) {
      setActive(initialSection)
      setMobileView('nav')
    }
  }, [initialSection, open])

  function sectionLabel(sectionId: SectionId): string {
    const map: Record<SectionId, string> = {
      hermes: t('settings:sectionModelProvider', { defaultValue: 'Model & Provider' }),
      agent: t('settings:sectionAgent', { defaultValue: 'Agent' }),
      routing: t('settings:sectionSmartRouting', { defaultValue: 'Smart Routing' }),
      voice: t('settings:sectionVoice', { defaultValue: 'Voice' }),
      display: t('settings:sectionDisplay', { defaultValue: 'Display' }),
      appearance: t('settings:sectionTheme', { defaultValue: 'Theme' }),
      chat: t('settings:sectionChat', { defaultValue: 'Chat' }),
      notifications: t('settings:sectionAlerts', { defaultValue: 'Alerts' }),
      language: t('settings:language', { defaultValue: 'Language' }),
    }
    return map[sectionId]
  }

  function handleSectionSelect(sectionId: SectionId) {
    setActive(sectionId)
    setMobileView('content')
  }

  return (
    <DialogRoot open={open} onOpenChange={onOpenChange}>
      <DialogContent className="inset-0 h-full w-full max-w-none translate-x-0 translate-y-0 overflow-hidden rounded-none border-0 p-0 shadow-xl md:inset-auto md:left-1/2 md:top-1/2 md:h-[min(88dvh,740px)] md:min-h-[520px] md:w-full md:max-w-3xl md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-2xl md:border md:border-primary-200 bg-[var(--theme-bg)]">
        <div className="flex h-full min-h-0 flex-col">
          <div className="flex items-center justify-between border-b border-primary-200 bg-primary-50/80 px-4 py-4 md:rounded-t-2xl md:px-5">
            <div>
              <DialogTitle className="text-base font-semibold text-primary-900 dark:text-neutral-100">
                {t('settings:title', { defaultValue: 'Settings' })}
              </DialogTitle>
              <DialogDescription className="sr-only">
                {t('settings:subtitle', {
                  defaultValue: 'Configure Hermes Workspace',
                })}
              </DialogDescription>
            </div>
            <DialogClose
              render={
                <Button
                  size="icon-sm"
                  variant="ghost"
                  className="rounded-full text-primary-500 hover:bg-primary-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
                  aria-label={t('settings:close', { defaultValue: 'Close' })}
                >
                  <HugeiconsIcon
                    icon={Cancel01Icon}
                    size={18}
                    strokeWidth={1.5}
                  />
                </Button>
              }
            />
          </div>

          <SettingsErrorBoundary>
            <div className="flex min-h-0 flex-1 flex-col md:flex-row">
              <aside
                className={cn(
                  'w-full bg-primary-50/60 p-2 md:w-44 md:shrink-0 md:border-r md:border-primary-200',
                  mobileView === 'content' && 'hidden md:block',
                )}
              >
                <nav className="space-y-1">
                  {SECTIONS.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => handleSectionSelect(s.id)}
                      className={cn(
                        'flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm text-primary-600 transition-colors hover:bg-primary-100',
                        active === s.id &&
                          'bg-accent-50 font-medium text-accent-700',
                      )}
                    >
                      <HugeiconsIcon
                        icon={s.icon}
                        size={16}
                        strokeWidth={1.5}
                      />
                      {sectionLabel(s.id)}
                    </button>
                  ))}
                </nav>
              </aside>
              <div
                className={cn(
                  'min-w-0 flex-1 overflow-y-auto p-4 pb-[calc(env(safe-area-inset-bottom)+1rem)] md:p-5 md:pb-5',
                  mobileView === 'nav' && 'hidden md:block',
                )}
              >
                <div className="mb-3 md:hidden">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setMobileView('nav')}
                    className="h-8 gap-1.5 rounded-lg px-2 text-primary-600 hover:bg-primary-100"
                  >
                    <HugeiconsIcon
                      icon={ArrowLeft01Icon}
                      size={16}
                      strokeWidth={1.5}
                    />
                    {t('settings:back', { defaultValue: 'Back' })}
                  </Button>
                </div>
                <ActiveContent />
              </div>
            </div>
          </SettingsErrorBoundary>

          <div className="sticky bottom-0 z-10 border-t border-primary-200 bg-primary-50/60 px-4 py-3 text-xs text-primary-500 dark:text-neutral-400 md:rounded-b-2xl md:px-5">
            {t('settings:changesSaved', { defaultValue: 'Changes saved automatically.' })}{' '}
            <a
              href="/settings"
              className="ml-2 font-medium underline underline-offset-2 hover:text-primary-700 dark:hover:text-neutral-200"
            >
              {t('settings:allSettings', { defaultValue: 'All settings' })} →
            </a>
          </div>
        </div>
      </DialogContent>
    </DialogRoot>
  )
}
