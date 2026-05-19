export type ThemeId =
  | 'agentone-nous'
  | 'agentone-nous-light'
  | 'matrix'
  | 'matrix-light'
  | 'agentone-official'
  | 'agentone-official-light'
  | 'agentone-classic'
  | 'agentone-classic-light'
  | 'agentone-slate'
  | 'agentone-slate-light'
  | 'scifi'
  | 'scifi-light'

export const THEMES: Array<{
  id: ThemeId
  label: string
  description: string
  icon: string
}> = [
  {
    id: 'agentone-nous',
    label: 'Nous',
    description: 'Deep teal background, cream accent — matches Nous Research chrome',
    icon: '◱',
  },
  {
    id: 'agentone-nous-light',
    label: 'Nous Light',
    description: 'Cold paper white with restrained cobalt framing',
    icon: '◲',
  },
  {
    id: 'matrix',
    label: 'Matrix',
    description: 'Black glass terminal field with phosphor green signal glow',
    icon: '▣',
  },
  {
    id: 'matrix-light',
    label: 'Matrix Light',
    description: 'White terminal paper with green signal accents',
    icon: '▣',
  },
  {
    id: 'agentone-official',
    label: 'Agent-e1',
    description: 'Navy and indigo flagship theme',
    icon: '⚕',
  },
  {
    id: 'agentone-official-light',
    label: 'Agent-e1 Light',
    description: 'Editorial paper white with muted cobalt accents',
    icon: '⚕',
  },
  {
    id: 'agentone-classic',
    label: 'Bronze',
    description: 'Bronze accents on dark charcoal',
    icon: '🔶',
  },
  {
    id: 'agentone-classic-light',
    label: 'Bronze Light',
    description: 'Warm parchment with bronze accents',
    icon: '🔶',
  },
  {
    id: 'agentone-slate',
    label: 'Slate',
    description: 'Cool blue developer theme',
    icon: '🔷',
  },
  {
    id: 'agentone-slate-light',
    label: 'Slate Light',
    description: 'GitHub-light palette with blue accents',
    icon: '🔷',
  },
  {
    id: 'scifi',
    label: 'SciFi',
    description: 'Cyberpunk HUD — deep navy, cyan neon, orange highlights',
    icon: '🌌',
  },
  {
    id: 'scifi-light',
    label: 'SciFi Light',
    description: 'Cold steel and teal — cyberpunk interface in daylight',
    icon: '🌌',
  },
]

const STORAGE_KEY = 'agentone-theme'
const DEFAULT_THEME: ThemeId = 'agentone-nous'
const THEME_SET = new Set<ThemeId>(THEMES.map((theme) => theme.id))
const LIGHT_THEME_MAP: Record<
  Exclude<ThemeId, `${string}-light`>,
  Extract<ThemeId, `${string}-light`>
> = {
  'agentone-nous': 'agentone-nous-light',
  matrix: 'matrix-light',
  'agentone-official': 'agentone-official-light',
  'agentone-classic': 'agentone-classic-light',
  'agentone-slate': 'agentone-slate-light',
  'scifi': 'scifi-light',
}
const DARK_THEME_MAP: Record<
  Extract<ThemeId, `${string}-light`>,
  Exclude<ThemeId, `${string}-light`>
> = {
  'agentone-nous-light': 'agentone-nous',
  'matrix-light': 'matrix',
  'agentone-official-light': 'agentone-official',
  'agentone-classic-light': 'agentone-classic',
  'agentone-slate-light': 'agentone-slate',
  'scifi-light': 'scifi',
}

const LIGHT_THEMES = new Set<ThemeId>([
  'agentone-nous-light',
  'matrix-light',
  'agentone-official-light',
  'agentone-classic-light',
  'agentone-slate-light',
  'scifi-light',
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

export function getTheme(): ThemeId {
  if (typeof window === 'undefined') return DEFAULT_THEME
  const stored = localStorage.getItem(STORAGE_KEY)
  if (isValidTheme(stored)) return stored
  // Migrate old claude-* theme IDs
  if (stored && stored.startsWith('claude-')) {
    const migrated = stored.replace(/^claude-/, 'agentone-') as ThemeId
    if (isValidTheme(migrated)) {
      localStorage.setItem(STORAGE_KEY, migrated)
      return migrated
    }
  }
  return DEFAULT_THEME
}

export function setTheme(theme: ThemeId): void {
  const root = document.documentElement
  root.setAttribute('data-theme', theme)
  root.classList.remove('light', 'dark', 'system')
  const nextMode = isDarkTheme(theme) ? 'dark' : 'light'
  root.classList.add(nextMode)
  root.style.setProperty('color-scheme', nextMode)
  localStorage.setItem(STORAGE_KEY, theme)
}
