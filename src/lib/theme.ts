export type ThemeId =
  | 'hermes-nous'
  | 'hermes-nous-light'
  | 'hermes-official'
  | 'hermes-official-light'
  | 'hermes-classic'
  | 'hermes-classic-light'
  | 'hermes-slate'
  | 'hermes-slate-light'
  | 'qclaw'
  | 'qclaw-light'

export type ThemeMode = 'system' | 'light' | 'dark'

export const THEMES: Array<{
  id: ThemeId
  label: string
  description: string
  icon: string
}> = [
  {
    id: 'hermes-nous',
    label: 'Hermes Nous',
    description: 'Deep teal background, cream accent — matches Nous Research chrome',
    icon: '◱',
  },
  {
    id: 'hermes-nous-light',
    label: 'Hermes Nous Light',
    description: 'Cold paper white with restrained cobalt framing',
    icon: '◲',
  },
  {
    id: 'hermes-official',
    label: 'Hermes Official',
    description: 'Navy and indigo flagship theme',
    icon: '⚕',
  },
  {
    id: 'hermes-official-light',
    label: 'Hermes Official Light',
    description: 'Editorial paper white with muted cobalt accents',
    icon: '⚕',
  },
  {
    id: 'hermes-classic',
    label: 'Hermes Classic',
    description: 'Bronze accents on dark charcoal',
    icon: '🔶',
  },
  {
    id: 'hermes-classic-light',
    label: 'Classic Light',
    description: 'Warm parchment with bronze accents',
    icon: '🔶',
  },
  {
    id: 'hermes-slate',
    label: 'Slate',
    description: 'Cool blue developer theme',
    icon: '🔷',
  },
  {
    id: 'hermes-slate-light',
    label: 'Slate Light',
    description: 'GitHub-light palette with blue accents',
    icon: '🔷',
  },
  {
    id: 'qclaw',
    label: 'QClaw Dark',
    description: 'Soft charcoal companion to the QClaw desktop palette',
    icon: '◌',
  },
  {
    id: 'qclaw-light',
    label: 'QClaw Light',
    description: 'Clean white workspace with mist-gray rails and bright blue accents',
    icon: '◌',
  },
]

const STORAGE_KEY = 'hermes-theme'
const DEFAULT_THEME: ThemeId = 'hermes-nous'
const THEME_COLOR_MAP: Record<ThemeId, string> = {
  'hermes-nous': '#031A1A',
  'hermes-nous-light': '#F8FAF8',
  'hermes-official': '#0A0E1A',
  'hermes-official-light': '#F7F7F1',
  'hermes-classic': '#0d0f12',
  'hermes-classic-light': '#F5F2ED',
  'hermes-slate': '#0d1117',
  'hermes-slate-light': '#F6F8FA',
  qclaw: '#17191d',
  'qclaw-light': '#FFFFFF',
}
const THEME_SET = new Set<ThemeId>(THEMES.map((theme) => theme.id))
const LIGHT_THEME_MAP: Record<
  Exclude<ThemeId, `${string}-light`>,
  Extract<ThemeId, `${string}-light`>
> = {
  'hermes-nous': 'hermes-nous-light',
  'hermes-official': 'hermes-official-light',
  'hermes-classic': 'hermes-classic-light',
  'hermes-slate': 'hermes-slate-light',
  qclaw: 'qclaw-light',
}
const DARK_THEME_MAP: Record<
  Extract<ThemeId, `${string}-light`>,
  Exclude<ThemeId, `${string}-light`>
> = {
  'hermes-nous-light': 'hermes-nous',
  'hermes-official-light': 'hermes-official',
  'hermes-classic-light': 'hermes-classic',
  'hermes-slate-light': 'hermes-slate',
  'qclaw-light': 'qclaw',
}

const LIGHT_THEMES = new Set<ThemeId>([
  'hermes-nous-light',
  'hermes-official-light',
  'hermes-classic-light',
  'hermes-slate-light',
  'qclaw-light',
])

export function isValidTheme(
  value: string | null | undefined,
): value is ThemeId {
  return typeof value === 'string' && THEME_SET.has(value as ThemeId)
}

export function isDarkTheme(theme: ThemeId): boolean {
  return !LIGHT_THEMES.has(theme)
}

export function getThemeVariant(
  theme: ThemeId,
  mode: 'light' | 'dark',
): ThemeId {
  if (mode === 'light') {
    return isDarkTheme(theme)
      ? LIGHT_THEME_MAP[theme as keyof typeof LIGHT_THEME_MAP]
      : theme
  }

  return isDarkTheme(theme)
    ? theme
    : DARK_THEME_MAP[theme as keyof typeof DARK_THEME_MAP]
}

export function getThemeMode(theme: ThemeId): 'light' | 'dark' {
  return isDarkTheme(theme) ? 'dark' : 'light'
}

export function getSystemThemeMode(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'dark'
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

export function resolveThemeMode(mode: ThemeMode): 'light' | 'dark' {
  return mode === 'system' ? getSystemThemeMode() : mode
}

export function getThemeForMode(
  mode: ThemeMode,
  baseTheme: ThemeId = getTheme(),
): ThemeId {
  return getThemeVariant(baseTheme, resolveThemeMode(mode))
}

function updateThemeColor(theme: ThemeId): void {
  if (typeof document === 'undefined') return
  let meta = document.querySelector('meta[name="theme-color"]')
  if (!meta) {
    meta = document.createElement('meta')
    meta.setAttribute('name', 'theme-color')
    document.head.appendChild(meta)
  }
  meta.setAttribute('content', THEME_COLOR_MAP[theme])
}

export function getTheme(): ThemeId {
  if (typeof window === 'undefined') return DEFAULT_THEME
  const stored = localStorage.getItem(STORAGE_KEY)
  return isValidTheme(stored) ? stored : DEFAULT_THEME
}

export function setTheme(theme: ThemeId): void {
  const root = document.documentElement
  root.setAttribute('data-theme', theme)
  root.classList.remove('light', 'dark', 'system')
  const nextMode = getThemeMode(theme)
  root.classList.add(nextMode)
  root.style.setProperty('color-scheme', nextMode)
  localStorage.setItem(STORAGE_KEY, theme)
  updateThemeColor(theme)
  window.dispatchEvent(new CustomEvent('hermes-theme-change', { detail: theme }))
}

export function applyThemeMode(
  mode: ThemeMode,
  baseTheme: ThemeId = getTheme(),
): ThemeId {
  const nextTheme = getThemeForMode(mode, baseTheme)
  setTheme(nextTheme)
  return nextTheme
}

export function toggleThemeMode(baseTheme: ThemeId = getTheme()): ThemeId {
  return applyThemeMode(isDarkTheme(baseTheme) ? 'light' : 'dark', baseTheme)
}
