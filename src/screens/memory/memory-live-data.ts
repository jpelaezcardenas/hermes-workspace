export type LiveMemoryTargetInput = {
  target?: unknown
  entries?: unknown
  usage?: unknown
  entry_count?: unknown
}

export type LiveMemoryResponseInput = {
  targets?: unknown
}

export type NormalizedLiveMemoryTarget = {
  key: string
  label: string
  entryCount: number
  usage: string
  entries: Array<unknown>
}

export function getTodayMemoryPath(now = new Date()): string {
  return `memories/${now.toISOString().slice(0, 10)}.md`
}

export function getDefaultMemoryFileContent(pathValue: string): string {
  if (pathValue === 'MEMORY.md') return '# Memory\n\n'
  const title = pathValue.replace(/^memories?\//, '').replace(/\.md$/, '')
  return `# ${title}\n\n`
}

function readString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : ''
}

function readNumber(value: unknown): number | null {
  return typeof value === 'number' && Number.isFinite(value) ? value : null
}

function readRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null
}

export function normalizeLiveMemoryTargets(
  payload: LiveMemoryResponseInput | null | undefined,
): Array<NormalizedLiveMemoryTarget> {
  const rawTargets = Array.isArray(payload?.targets) ? payload.targets : []

  return rawTargets
    .map((rawTarget, index): NormalizedLiveMemoryTarget | null => {
      const record = readRecord(rawTarget)
      if (!record) return null

      const label = readString(record.target) || `target-${index + 1}`
      const entries = Array.isArray(record.entries) ? record.entries : []
      const explicitCount = readNumber(record.entry_count)

      return {
        key: label,
        label,
        entryCount: explicitCount ?? entries.length,
        usage: readString(record.usage),
        entries,
      }
    })
    .filter((target): target is NormalizedLiveMemoryTarget => target !== null)
}

export function getLiveMemoryTargetPreview(entry: unknown): string {
  if (typeof entry === 'string') return entry
  const record = readRecord(entry)
  if (!record) return String(entry ?? '')

  return (
    readString(record.text) ||
    readString(record.value) ||
    readString(record.content) ||
    JSON.stringify(record)
  )
}
