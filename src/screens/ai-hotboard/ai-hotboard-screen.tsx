import { Link } from '@tanstack/react-router'
import { useEffect, useMemo, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import hotboardData from './ai_hotboard_mock_events.json'
import {
  buildFallbackEventsFromMock,
  mapFeedEventToMockEvent,
  normalizeTimelineTimestamp,
  parseGeneratedAtValue,
  toSupportedHotboardSource,
  type MockEvent,
} from './ai-hotboard-feed-adapter'

type MockPayload = {
  generated_at: string
  note: string
  events: MockEvent[]
}

type TimelineEvent = MockEvent & {
  id: string
  signalScore: number
  actionLine: string
  recommendReasonLine: string
  condensedSourceLabel: string
  aggregatedSourcesLabel: string | null
}

type TimelineGroup = {
  timestamp: string
  events: TimelineEvent[]
}

const payload = hotboardData as MockPayload
const DATA_SOURCE_LABEL = 'ai_hotboard_mock_events.json'
const HOTBOARD_USER_ID_KEY = 'ai-hotboard-user-id'

type VoteType = 'like' | 'dislike' | 'bookmark'

type VoteAggregateEntry = {
  like_count: number
  dislike_count: number
  bookmark_count: number
  my_vote: VoteType[]
}

type VoteAggregateByEvent = Record<string, VoteAggregateEntry>

export const SOURCE_ITEMS = [
  'X bookmarks',
  'X likes',
  'X following',
  'X for_you',
  '公众号',
  '肖恩对谈',
  '小红书',
] as const

export const SOURCE_SUBMISSION_ITEMS = ['JC 苹果备忘录日记', '爱马仕战略发现', '小J 执行发现'] as const

export const X_SOURCE_ROUTE_ITEMS = [
  { key: 'x-bookmarks', label: 'X bookmarks', to: '/ai-hotboard/source/x-bookmarks' },
  { key: 'x-likes', label: 'X likes', to: '/ai-hotboard/source/x-likes' },
  { key: 'x-following', label: 'X following', to: '/ai-hotboard/source/x-following' },
  { key: 'x-for_you', label: 'X for_you', to: '/ai-hotboard/source/x-for_you' },
] as const

export const STRATEGY_LINES = [
  'M2 A线 | 抓数稳定化',
  'M2 B线 | 财务报表自动化',
  'M2 C线 | AI短视频→投流ROI',
  'M2 D线 | 自动化有效率',
  'M2 E线 | 全员Agent协作',
] as const

export const STRATEGY_ITERATION_ITEMS = [
  'v1 产品化交接（CSO 验收中）',
  'adversarial-v3 45 轮迭代已归档',
  '两周稳定运行后评估黑板架构收编',
] as const

const PRIMARY_NAV_ITEMS = ['精选', '全部 AI 动态', '低粉爆文', '收藏'] as const
const SYSTEM_NAV_ITEMS = ['系统', '用户', '退出'] as const

export const SIDEBAR_NAV_SEQUENCE = [
  ...PRIMARY_NAV_ITEMS,
  '信源',
  '信源提报',
  '精选策略',
  '策略迭代',
  ...SYSTEM_NAV_ITEMS,
] as const

const CATEGORY_WEIGHT_MAP: Record<string, number> = {
  同行动作: 40,
  AI基础设施: 30,
  工具赛道: 20,
  纯新闻: 10,
}

const TAG_SIGNAL_BUCKET_MAP: Record<string, keyof typeof CATEGORY_WEIGHT_MAP> = {
  Agent: '同行动作',
  多Agent架构: '同行动作',
  skills: '同行动作',
  对抗式监督: '同行动作',
  Anthropic: 'AI基础设施',
  模型发布: 'AI基础设施',
  编码: '工具赛道',
  工具: '工具赛道',
  API: '工具赛道',
  视频生成: '工具赛道',
  开源: '纯新闻',
  大佬观点: '纯新闻',
}

const ACTION_PREFIXES = ['触发 skill', '派 agent', '更新战略'] as const

export const SIGNAL_BADGE_CLASS =
  'inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#2a2f3e] text-[12px] font-semibold leading-none text-white'

export const RECOMMEND_BANNER_CLASS = 'rounded-xl bg-emerald-950/70 px-3 py-2 text-sm leading-6 text-emerald-200'

function computeSignalScore(event: MockEvent) {
  const tagBuckets = event.tags.map((tag) => TAG_SIGNAL_BUCKET_MAP[tag] ?? '纯新闻')
  const tagWeightTotal = tagBuckets.reduce((score, bucket) => score + CATEGORY_WEIGHT_MAP[bucket], 0)
  const tagWeightAverage = Math.round(tagWeightTotal / Math.max(tagBuckets.length, 1))
  const categoryWeight = CATEGORY_WEIGHT_MAP[event.signal_category] ?? 10

  const engagementScore = Math.round(
    event.engagement.likes * 0.16 + event.engagement.bookmarks * 0.32 - event.engagement.dislikes * 0.48,
  )
  const sourceResonanceScore = Math.min(event.aggregated_sources_count * 2, 12)

  const rawScore =
    58 +
    Math.round(tagWeightAverage / 3.2) +
    Math.round(categoryWeight / 4.5) +
    engagementScore +
    sourceResonanceScore

  return Math.max(60, Math.min(99, rawScore))
}

function normalizeActionLine(action: string) {
  const normalized = action.trim()
  if (ACTION_PREFIXES.some((prefix) => normalized.startsWith(prefix))) {
    return `→ 建议动作：${normalized}`
  }
  return `→ 建议动作：更新战略：${normalized}`
}

function normalizeRecommendReason(reason: string) {
  const normalized = reason.trim() || '待补充'
  if (normalized.startsWith('推荐理由：')) {
    return normalized
  }
  return `推荐理由：${normalized}`
}

function buildCondensedSourceLabel(event: MockEvent) {
  return `${event.source_type} · ${event.source_name} · ${event.source_channel}`
}

function buildAggregatedSourcesLabel(event: MockEvent) {
  if (event.aggregated_sources_count <= 0) return null
  return `另有 ${event.aggregated_sources_count} 个源也报道了此事件`
}

function getOrCreateHotboardUserId() {
  if (typeof window === 'undefined') return `hotboard-${Date.now()}`
  const existing = window.localStorage.getItem(HOTBOARD_USER_ID_KEY)?.trim()
  if (existing) {
    return existing
  }
  const next = window.crypto?.randomUUID
    ? window.crypto.randomUUID()
    : `hotboard-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
  window.localStorage.setItem(HOTBOARD_USER_ID_KEY, next)
  return next
}

function formatGeneratedAt(value: string) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return new Intl.DateTimeFormat('zh-CN', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date)
}

function getTagTone(tag: string) {
  if (tag === 'Agent' || tag === '多Agent架构' || tag === 'skills' || tag === '对抗式监督') {
    return 'border-cyan-300/25 bg-cyan-300/10 text-cyan-100'
  }

  if (tag === '模型发布' || tag === 'Anthropic') {
    return 'border-emerald-300/25 bg-emerald-300/10 text-emerald-100'
  }

  if (tag === '工具' || tag === 'API' || tag === '视频生成' || tag === '编码') {
    return 'border-amber-300/25 bg-amber-300/10 text-amber-100'
  }

  return 'border-slate-400/25 bg-slate-400/10 text-slate-200'
}

function SidebarItems({ items }: { items: readonly string[] }) {
  return (
    <ul className="space-y-1.5">
      {items.map((item) => (
        <li key={item} className="list-none">
          <div className="rounded-xl border border-slate-700/70 bg-slate-900/50 px-3 py-2 text-sm text-slate-200">{item}</div>
        </li>
      ))}
    </ul>
  )
}

function SidebarNavItems({ items, highlightedItem }: { items: readonly string[]; highlightedItem?: string }) {
  return (
    <ul className="space-y-1.5">
      {items.map((item) => {
        const highlighted = item === highlightedItem

        return (
          <li key={item} className="list-none" data-nav-item={item}>
            <div
              className={cn(
                'rounded-xl border px-3 py-2 text-sm',
                highlighted
                  ? 'border-cyan-400/45 bg-cyan-400/15 font-medium text-cyan-100'
                  : 'border-slate-700/70 bg-slate-900/50 text-slate-300',
              )}
            >
              {item}
            </div>
          </li>
        )
      })}
    </ul>
  )
}

function SidebarSection({
  title,
  items,
  testId,
}: {
  title: string
  items: readonly string[]
  testId?: string
}) {
  return (
    <section className="space-y-1.5" aria-label={`${title}导航`} data-testid={testId}>
      <ul className="space-y-1.5">
        <li className="list-none" data-nav-item={title}>
          <div className="rounded-xl border border-slate-700/70 bg-slate-900/50 px-3 py-2 text-sm text-slate-200">{title}</div>
        </li>
      </ul>
      <div className="pl-2">
        <SidebarItems items={items} />
      </div>
    </section>
  )
}

function SourceRouteItems({
  highlightedItem,
}: {
  highlightedItem: string
}) {
  return (
    <ul className="space-y-1.5">
      <li className="list-none" data-nav-item="信源">
        <div className="rounded-xl border border-slate-700/70 bg-slate-900/50 px-3 py-2 text-sm text-slate-200">信源</div>
      </li>
      <li className="list-none">
        <div className="pl-2 space-y-1.5">
          {X_SOURCE_ROUTE_ITEMS.map((item) => {
            const highlighted = highlightedItem === item.key
            return (
              <Link key={item.key} to={item.to} className="block rounded-xl focus-visible:outline-none">
                <div
                  className={cn(
                    'rounded-xl border px-3 py-2 text-sm transition-colors',
                    highlighted
                      ? 'border-cyan-400/45 bg-cyan-400/15 font-medium text-cyan-100'
                      : 'border-slate-700/70 bg-slate-900/50 text-slate-300 hover:border-slate-500/80 hover:text-slate-100',
                  )}
                >
                  {item.label}
                </div>
              </Link>
            )
          })}
        </div>
      </li>
    </ul>
  )
}

export function AiHotboardScreen({ source = 'all' }: { source?: string }) {
  const normalizedSource = toSupportedHotboardSource(source)
  const userIdRef = useRef<string>('')
  if (!userIdRef.current) {
    userIdRef.current = getOrCreateHotboardUserId()
  }

  const [remotePayload, setRemotePayload] = useState<MockPayload>(payload)
  const [remoteSourceLabel, setRemoteSourceLabel] = useState(DATA_SOURCE_LABEL)
  const [remoteGeneratedAt, setRemoteGeneratedAt] = useState(payload.generated_at)
  const [voteAggregateByEvent, setVoteAggregateByEvent] = useState<VoteAggregateByEvent>({})

  useEffect(() => {
    let cancelled = false

    async function loadFeed() {
      try {
        const response = await fetch(
          `/api/hotboard/feed?source=${encodeURIComponent(normalizedSource)}`,
        )
        if (!response.ok) throw new Error('feed request failed')

        const body = (await response.json().catch(() => ({}))) as {
          generated_at?: string
          data_source?: string
          events?: Array<Record<string, unknown>>
        }

        const list = Array.isArray(body.events) ? body.events : []
        const normalizedEvents: MockEvent[] = list.map((item, index) =>
          mapFeedEventToMockEvent(item, `api-${normalizedSource}-${index}`, normalizedSource),
        )

        if (cancelled) return

        if (normalizedEvents.length > 0) {
          setRemotePayload({
            generated_at: String(body.generated_at ?? new Date().toISOString()),
            note: `source=${normalizedSource}`,
            events: normalizedEvents,
          })
          setRemoteSourceLabel(String(body.data_source ?? DATA_SOURCE_LABEL))
          setRemoteGeneratedAt(String(body.generated_at ?? new Date().toISOString()))
          return
        }
      } catch {
        // Keep fallback payload when feed API fails.
      }

      if (!cancelled) {
          setRemotePayload({
            generated_at: payload.generated_at,
            note: payload.note,
            events: buildFallbackEventsFromMock(normalizedSource, payload.events),
          })
        setRemoteSourceLabel(DATA_SOURCE_LABEL)
        setRemoteGeneratedAt(payload.generated_at)
      }
    }

    loadFeed()
    return () => {
      cancelled = true
    }
  }, [normalizedSource])

  const timelineGroups = useMemo<TimelineGroup[]>(() => {
    const enriched = remotePayload.events
      .slice()
      .map((event) => ({
        ...event,
        id: event.event_id?.trim() || event.id,
        timestamp: normalizeTimelineTimestamp(event.timestamp),
        signalScore: event.signal_score ?? computeSignalScore(event),
        actionLine: normalizeActionLine(event.suggested_action),
        recommendReasonLine: normalizeRecommendReason(event.recommend_reason),
        condensedSourceLabel: buildCondensedSourceLabel(event),
        aggregatedSourcesLabel: buildAggregatedSourcesLabel(event),
      }))
      .sort(
        (a, b) =>
          parseGeneratedAtValue(b.created_at ?? b.timestamp) -
          parseGeneratedAtValue(a.created_at ?? a.timestamp),
      )

    const groups = new Map<string, TimelineGroup>()

    enriched.forEach((event) => {
      const current = groups.get(event.timestamp)
      if (current) {
        current.events.push(event)
        return
      }

      groups.set(event.timestamp, {
        timestamp: event.timestamp,
        events: [event],
      })
    })

    return Array.from(groups.values())
  }, [remotePayload])

  useEffect(() => {
    let cancelled = false

    async function loadAggregate() {
      try {
        const response = await fetch(
          `/api/hotboard/vote/aggregate?user_id=${encodeURIComponent(userIdRef.current)}`,
        )
        if (!response.ok) return
        const payload = (await response.json().catch(() => ({}))) as {
          aggregate?: VoteAggregateByEvent
          user_id?: string
        }
        if (cancelled) return
        if (payload.user_id && payload.user_id.trim()) {
          userIdRef.current = payload.user_id
          window.localStorage.setItem(HOTBOARD_USER_ID_KEY, payload.user_id)
        }
        setVoteAggregateByEvent(
          payload.aggregate && typeof payload.aggregate === 'object' ? payload.aggregate : {},
        )
      } catch {
        // Keep default UI state on network errors.
      }
    }

    loadAggregate()
    return () => {
      cancelled = true
    }
  }, [])

  function resolveVoteAggregate(event: TimelineEvent): VoteAggregateEntry {
    const existing = voteAggregateByEvent[event.id]
    if (existing) return existing
    return {
      like_count: event.engagement.likes,
      dislike_count: event.engagement.dislikes,
      bookmark_count: event.engagement.bookmarks,
      my_vote: [],
    }
  }

  async function handleVoteClick(eventId: string, voteType: VoteType, baseline?: VoteAggregateEntry) {
    const previous = voteAggregateByEvent[eventId] ?? baseline ?? {
      like_count: 0,
      dislike_count: 0,
      bookmark_count: 0,
      my_vote: [],
    }

    const wasActive = previous.my_vote.includes(voteType)
    const nextCountDelta = wasActive ? -1 : 1
    const optimisticNext: VoteAggregateEntry = {
      like_count: previous.like_count,
      dislike_count: previous.dislike_count,
      bookmark_count: previous.bookmark_count,
      my_vote: wasActive ? previous.my_vote.filter((vote) => vote !== voteType) : [...previous.my_vote, voteType].sort(),
    }

    if (voteType === 'like') optimisticNext.like_count = Math.max(0, previous.like_count + nextCountDelta)
    if (voteType === 'dislike') optimisticNext.dislike_count = Math.max(0, previous.dislike_count + nextCountDelta)
    if (voteType === 'bookmark') optimisticNext.bookmark_count = Math.max(0, previous.bookmark_count + nextCountDelta)

    setVoteAggregateByEvent((current) => ({
      ...current,
      [eventId]: optimisticNext,
    }))

    try {
      const response = await fetch('/api/hotboard/vote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event_id: eventId,
          vote_type: voteType,
          user_id: userIdRef.current,
        }),
      })

      if (!response.ok) {
        throw new Error('vote request failed')
      }

      const payload = (await response.json().catch(() => ({}))) as {
        aggregate?: VoteAggregateByEvent
        user_id?: string
      }

      if (payload.user_id && payload.user_id.trim()) {
        userIdRef.current = payload.user_id
        window.localStorage.setItem(HOTBOARD_USER_ID_KEY, payload.user_id)
      }

      if (payload.aggregate && typeof payload.aggregate === 'object') {
        setVoteAggregateByEvent(payload.aggregate)
      }
    } catch {
      setVoteAggregateByEvent((current) => ({
        ...current,
        [eventId]: previous,
      }))
    }
  }

  return (
    <div className="fixed inset-0 z-[120] overflow-y-auto bg-slate-950 text-slate-100">
      <div className="mx-auto flex min-h-screen w-full max-w-[1440px] gap-4 px-3 py-4 sm:gap-5 sm:px-4 lg:px-6">
        <aside
          className="w-[252px] shrink-0 rounded-3xl border border-slate-700/60 bg-slate-950/95 p-4 shadow-[0_30px_80px_rgba(2,6,23,0.6)]"
          aria-label="AI HOT 左侧导航"
        >
          <div className="mb-4 rounded-2xl border border-slate-700/70 bg-slate-900/70 px-4 py-3">
            <div className="text-[11px] tracking-[0.34em] text-slate-500">SIGNAL BOARD</div>
            <div className="mt-2 flex items-center gap-2 text-[31px] font-semibold tracking-[0.18em] text-cyan-300">
              <span className="text-slate-100">AI</span>
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-cyan-300/65 text-base leading-none text-cyan-300">
                ○
              </span>
              <span>HOT</span>
            </div>
          </div>

          <nav className="space-y-3" aria-label="AI HOT 导航列表">
            <SidebarNavItems items={PRIMARY_NAV_ITEMS} highlightedItem="精选" />
            <SourceRouteItems highlightedItem={normalizedSource} />
            <SidebarSection title="信源提报" items={SOURCE_SUBMISSION_ITEMS} />

            <div className="px-1 text-xs tracking-[0.24em] text-slate-500">策略</div>
            <SidebarSection title="精选策略" items={STRATEGY_LINES} testId="featured-strategy-section" />
            <SidebarSection title="策略迭代" items={STRATEGY_ITERATION_ITEMS} testId="strategy-iteration-section" />

            <div className="px-1 text-xs tracking-[0.24em] text-slate-500">后台</div>
            <SidebarNavItems items={SYSTEM_NAV_ITEMS} />
          </nav>
        </aside>

        <main className="min-w-0 flex-1 rounded-3xl border border-slate-700/60 bg-slate-900/65 p-4 shadow-[0_30px_80px_rgba(2,6,23,0.5)] sm:p-5 lg:p-6">
          <header className="mb-5 flex flex-col gap-3 rounded-2xl border border-slate-700/60 bg-slate-900/80 px-5 py-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-[11px] tracking-[0.32em] text-cyan-300/80">AI HOTBOARD</div>
              <h1 className="mt-2 text-2xl font-semibold text-slate-100 sm:text-3xl">AI 热点看板</h1>
            </div>
            <div className="rounded-xl border border-slate-700/60 bg-slate-950/45 px-3 py-2 text-sm text-slate-300">
              <div>更新时间：{formatGeneratedAt(remoteGeneratedAt)}</div>
              <div>数据来源：{remoteSourceLabel}</div>
            </div>
          </header>

          <div className="space-y-5">
            {timelineGroups.map((group) => (
              <section key={group.timestamp} className="grid grid-cols-[84px_minmax(0,1fr)] gap-3 sm:gap-4">
                <div className="pt-0.5">
                  <div className="flex gap-2">
                    <div className="flex flex-col items-center">
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                      <span className="mt-1 w-px flex-1 bg-gradient-to-b from-emerald-400/70 to-transparent" />
                    </div>
                    <div className="text-[36px] font-extrabold leading-none tracking-[-0.03em] text-slate-100">{group.timestamp}</div>
                  </div>
                </div>

                <div className="space-y-3">
                  {group.events.map((event) => (
                    <article
                      key={event.id}
                      className="rounded-3xl border border-slate-700/65 bg-slate-900/70 px-4 py-4 shadow-[0_16px_36px_rgba(2,6,23,0.45)]"
                    >
                      {(() => {
                        const voteState = resolveVoteAggregate(event)
                        return (
                          <>
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1 space-y-2">
                          <div className="flex flex-wrap items-center gap-2 text-sm text-slate-400">
                            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                            <span className="truncate">{event.condensedSourceLabel}</span>
                          </div>

                          <h2 className="text-xl font-bold leading-7 text-slate-100">{event.title}</h2>

                          <p className="text-[15px] leading-7 text-slate-300">{event.summary}</p>
                        </div>

                        <div className="flex shrink-0 items-start gap-2 pl-2">
                          <span className={SIGNAL_BADGE_CLASS} data-testid="signal-score-badge" aria-label={`信号分 ${event.signalScore}`}>
                            {event.signalScore}
                          </span>
                          <div className="flex gap-1 text-xs text-slate-400">
                            <button
                              type="button"
                              onClick={() => handleVoteClick(event.id, 'like', voteState)}
                              className={cn(
                                'cursor-pointer rounded-full border px-2 py-1 transition-colors',
                                voteState.my_vote.includes('like')
                                  ? 'border-emerald-300/70 bg-emerald-300/25 text-emerald-100'
                                  : 'border-slate-700/70 bg-slate-900/50 text-slate-400 hover:border-slate-500/80 hover:text-slate-200',
                              )}
                              aria-pressed={voteState.my_vote.includes('like')}
                              aria-label={`点赞 ${event.title}`}
                            >
                              👍 {voteState.like_count}
                            </button>
                            <button
                              type="button"
                              onClick={() => handleVoteClick(event.id, 'dislike', voteState)}
                              className={cn(
                                'cursor-pointer rounded-full border px-2 py-1 transition-colors',
                                voteState.my_vote.includes('dislike')
                                  ? 'border-rose-300/70 bg-rose-300/25 text-rose-100'
                                  : 'border-slate-700/70 bg-slate-900/50 text-slate-400 hover:border-slate-500/80 hover:text-slate-200',
                              )}
                              aria-pressed={voteState.my_vote.includes('dislike')}
                              aria-label={`点踩 ${event.title}`}
                            >
                              👎 {voteState.dislike_count}
                            </button>
                            <button
                              type="button"
                              onClick={() => handleVoteClick(event.id, 'bookmark', voteState)}
                              className={cn(
                                'cursor-pointer rounded-full border px-2 py-1 transition-colors',
                                voteState.my_vote.includes('bookmark')
                                  ? 'border-amber-300/70 bg-amber-300/25 text-amber-100'
                                  : 'border-slate-700/70 bg-slate-900/50 text-slate-400 hover:border-slate-500/80 hover:text-slate-200',
                              )}
                              aria-pressed={voteState.my_vote.includes('bookmark')}
                              aria-label={`收藏 ${event.title}`}
                            >
                              ☆ {voteState.bookmark_count}
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 flex flex-wrap items-center gap-1.5 text-xs text-slate-400">
                        {event.tags.map((tag) => (
                          <span key={`${event.id}-${tag}`} className={cn('rounded-full border px-2 py-0.5 text-[11px]', getTagTone(tag))}>
                            {tag}
                          </span>
                        ))}
                        <span>· {event.signal_category}</span>
                        {event.aggregatedSourcesLabel ? (
                          <span className="rounded-full border border-slate-700/65 bg-slate-900/50 px-2 py-0.5 text-[11px] text-slate-300">
                            {event.aggregatedSourcesLabel}
                          </span>
                        ) : null}
                      </div>

                      <div className="mt-3" data-testid="recommend-reason-banner">
                        <div className={RECOMMEND_BANNER_CLASS} data-recommend-banner="true" aria-label="推荐理由绿色条">
                          <div>{event.recommendReasonLine}</div>
                          <div className="mt-1 text-emerald-200/90">{event.actionLine}</div>
                        </div>
                      </div>
                          </>
                        )
                      })()}
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
