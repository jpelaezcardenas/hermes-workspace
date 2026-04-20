export type HotboardSource = 'x-bookmarks' | 'x-likes' | 'x-following' | 'x-for_you' | 'all'

export type MockEvent = {
  id: string
  event_id?: string
  timestamp: string
  created_at?: string
  source_type: string
  source_name: string
  source_channel: string
  title: string
  summary: string
  tags: string[]
  signal_category: string
  signal_score?: number
  aggregated_sources_count: number
  engagement: {
    likes: number
    dislikes: number
    bookmarks: number
  }
  recommend_reason: string
  suggested_action: string
}

const SUPPORTED_SOURCES: HotboardSource[] = [
  'x-bookmarks',
  'x-likes',
  'x-following',
  'x-for_you',
  'all',
]

export function toSupportedHotboardSource(source: string): HotboardSource {
  if (SUPPORTED_SOURCES.includes(source as HotboardSource)) {
    return source as HotboardSource
  }
  return 'all'
}

export function parseGeneratedAtValue(value: string) {
  const trimmed = value.trim()
  const match = trimmed.match(/^(\d{1,2}):(\d{1,2})$/)
  if (match) {
    const hour = Number(match[1])
    const minute = Number(match[2])
    return hour * 60 + minute
  }

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return 0
  return date.getTime()
}

export function mapFeedEventToMockEvent(
  item: Record<string, unknown>,
  fallbackId: string,
  fallbackSourceChannel: string,
): MockEvent {
  const likes = Number(item.likes ?? 0)
  const signalScore = Number(item.signal_score ?? 0)
  const sourceLine = String(item.source_line ?? 'Signal Feed')
  const sourceNameParts = sourceLine
    .split('·')
    .map((segment) => segment.trim())
    .filter(Boolean)

  const sourceName =
    sourceNameParts.length >= 2 ? sourceNameParts.slice(0, 2).join(' · ') : sourceLine

  return {
    id: String(item.event_id ?? fallbackId),
    event_id: String(item.event_id ?? fallbackId),
    timestamp: String(item.created_at ?? ''),
    created_at: String(item.created_at ?? ''),
    source_type: 'X',
    source_name: sourceName,
    source_channel: String(item.source ?? fallbackSourceChannel),
    title: String(item.title ?? 'X 信号更新'),
    summary: String(item.summary ?? ''),
    tags: ['X', '实时'],
    signal_category: '同行动作',
    signal_score: Number.isFinite(signalScore) ? signalScore : 0,
    aggregated_sources_count: 0,
    engagement: {
      likes: Number.isFinite(likes) ? likes : 0,
      dislikes: 0,
      bookmarks: 0,
    },
    recommend_reason: '推荐理由：来自 X 实时信号同步',
    suggested_action: '触发 skill：x-signal-review（高价值信号二次判断）',
  }
}

export function buildFallbackEventsFromMock(source: string, events: MockEvent[]) {
  return events.map((event) => ({
    ...event,
    created_at: event.timestamp,
    source_channel: source,
  }))
}

export function normalizeTimelineTimestamp(timestamp: string) {
  const trimmed = timestamp.trim()
  const match = trimmed.match(/^(\d{1,2}):(\d{1,2})$/)

  if (!match) {
    const parsed = Date.parse(trimmed)
    if (!Number.isNaN(parsed)) {
      return new Intl.DateTimeFormat('zh-CN', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }).format(new Date(parsed))
    }
    return trimmed
  }

  const [, hour, minute] = match
  return `${hour.padStart(2, '0')}:${minute.padStart(2, '0')}`
}
