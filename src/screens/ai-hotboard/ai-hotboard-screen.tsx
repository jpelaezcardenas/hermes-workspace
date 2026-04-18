import { useMemo, useState } from 'react'
import { cn } from '@/lib/utils'
import hotboardData from './ai-hotboard-mock-data.json'

type MockEvent = {
  id: string
  timestamp: string
  source_type: string
  source_name: string
  source_channel: string
  title: string
  summary: string
  tags: string[]
  signal_category: string
  aggregated_sources_count: number
  engagement: {
    likes: number
    dislikes: number
    bookmarks: number
  }
  recommend_reason: string
  suggested_action: string
}

type MockPayload = {
  generated_at: string
  note: string
  events: MockEvent[]
}

type TimelineEvent = MockEvent & {
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

const STRATEGY_LINES = [
  'A线-抓数稳定化',
  'B线-财务报表自动化',
  'C线-AI短视频→投流ROI',
  'D线-自动化有效率',
  'E线-全员Agent协作',
] as const

const SOURCE_ITEMS = [
  '8 bookmarks',
  '24 likes',
  '12 following',
  '6 for_you',
  '公众号',
  '肖恩对谈',
  '小红书',
] as const

const SOURCE_SUBMISSION_ITEMS = ['JC 苹果备忘录日记', '爱马仕战略发现', '小J 执行发现'] as const

const TAG_WEIGHT_MAP: Record<string, number> = {
  Agent: 40,
  多Agent架构: 40,
  skills: 40,
  Anthropic: 30,
  模型发布: 30,
  编码: 20,
  工具: 20,
  API: 20,
  视频生成: 20,
  开源: 10,
  大佬观点: 10,
}

const CATEGORY_WEIGHT_MAP: Record<string, number> = {
  同行动作: 40,
  AI基础设施: 30,
  工具赛道: 20,
  纯新闻: 10,
}

const ACTION_LABELS = ['触发 skill', '派 agent', '更新战略'] as const

function computeSignalScore(event: MockEvent) {
  const tagScore = event.tags.reduce(function accumulate(score, tag) {
    return score + (TAG_WEIGHT_MAP[tag] ?? 10)
  }, 0)
  const categoryScore = CATEGORY_WEIGHT_MAP[event.signal_category] ?? 10
  const engagementScore = Math.round(
    event.engagement.likes * 0.18 + event.engagement.bookmarks * 0.35 - event.engagement.dislikes * 0.4,
  )
  const aggregatedScore = event.aggregated_sources_count * 2
  const rawScore =
    60 +
    Math.round(tagScore / Math.max(event.tags.length, 1) / 3) +
    Math.round(categoryScore / 5) +
    engagementScore +
    aggregatedScore

  return Math.max(60, Math.min(99, rawScore))
}

function normalizeActionLine(action: string) {
  if (ACTION_LABELS.some((label) => action.startsWith(label))) {
    return `→ 建议动作：${action}`
  }
  return `→ 建议动作：更新战略：${action}`
}

function normalizeRecommendReason(reason: string) {
  const trimmedReason = reason.trim() || '待补充'
  if (trimmedReason.startsWith('推荐理由：')) {
    return trimmedReason
  }
  return `推荐理由：${trimmedReason}`
}

function buildCondensedSourceLabel(event: MockEvent) {
  return `${event.source_type} · ${event.source_name} · ${event.source_channel}`
}

function buildAggregatedSourcesLabel(event: MockEvent) {
  if (event.aggregated_sources_count <= 0) return null
  return `另有 ${event.aggregated_sources_count} 个源也报道了此事件`
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

function normalizeTimelineTimestamp(timestamp: string) {
  const trimmed = timestamp.trim()
  const match = trimmed.match(/^(\d{1,2}):(\d{1,2})$/)

  if (!match) return trimmed

  const [, hour, minute] = match
  return `${hour.padStart(2, '0')}:${minute.padStart(2, '0')}`
}

function getTagTone(tag: string) {
  if (tag === 'Agent' || tag === '多Agent架构' || tag === 'skills') {
    return 'border-cyan-400/40 bg-cyan-400/12 text-cyan-100'
  }
  if (tag === '模型发布' || tag === 'Anthropic') {
    return 'border-violet-400/40 bg-violet-400/12 text-violet-100'
  }
  if (tag === '工具' || tag === 'API' || tag === '视频生成') {
    return 'border-amber-400/40 bg-amber-400/12 text-amber-100'
  }
  return 'border-white/10 bg-white/6 text-slate-200'
}

function SidebarBlock({ items, ariaLabel }: { items: readonly string[]; ariaLabel: string }) {
  return (
    <section className="rounded-2xl border border-white/8 bg-white/[0.03] px-3 py-3" aria-label={ariaLabel}>
      <ul className="space-y-2">
        {items.map(function renderItem(item) {
          return (
            <li
              key={item}
              className="list-none rounded-xl border border-transparent px-2 py-2 text-sm text-slate-300 transition hover:border-emerald-400/30 hover:bg-emerald-400/8 hover:text-white"
            >
              {item}
            </li>
          )
        })}
      </ul>
    </section>
  )
}

function SidebarDisclosure({
  title,
  items,
  defaultOpen = false,
}: {
  title: string
  items: readonly string[]
  defaultOpen?: boolean
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <section className="space-y-2" aria-label={`${title}分组`}>
      <button
        type="button"
        data-nav-item={title}
        aria-expanded={isOpen}
        className={cn(
          'flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm font-medium transition',
          isOpen
            ? 'border-emerald-400/40 bg-emerald-400/10 text-white shadow-[0_0_0_1px_rgba(16,185,129,0.2)]'
            : 'border-white/8 bg-white/[0.03] text-slate-300 hover:border-white/15 hover:bg-white/[0.05] hover:text-white',
        )}
        onClick={() => setIsOpen((value) => !value)}
      >
        <span>{title}</span>
        <span className="text-xs text-slate-400">{isOpen ? '−' : '+'}</span>
      </button>

      {isOpen ? (
        <div className="ml-3 border-l border-white/8 pl-3">
          <SidebarBlock items={items} ariaLabel={`${title}列表`} />
        </div>
      ) : null}
    </section>
  )
}

function SidebarExpandedGroup({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <section className="space-y-2" aria-label={`${title}分组`}>
      <div
        data-nav-item={title}
        className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm font-medium text-slate-300"
      >
        <span>{title}</span>
        <span className="text-xs text-slate-400">−</span>
      </div>
      <div className="ml-3 border-l border-white/8 pl-3">
        <StrategyList items={items} />
      </div>
    </section>
  )
}

function StrategyList({ items }: { items: readonly string[] }) {
  return (
    <ul className="space-y-2">
      {items.map(function renderItem(item) {
        return (
          <li
            key={item}
            className="list-none rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2 text-sm text-slate-300"
          >
            {item}
          </li>
        )
      })}
    </ul>
  )
}

function SidebarNavGroup({ items, highlightedItem }: { items: readonly string[]; highlightedItem?: string }) {
  return (
    <section className="space-y-2" aria-label="主导航">
      <ul className="space-y-2">
        {items.map(function renderNavItem(item) {
          const isHighlighted = item === highlightedItem
          const navHref = `#${encodeURIComponent(item)}`

          return (
            <li key={item} className="list-none" data-nav-item={item}>
              <a
                href={navHref}
                aria-current={isHighlighted ? 'page' : undefined}
                className={cn(
                  'block rounded-2xl border px-4 py-3 text-sm font-medium transition',
                  isHighlighted
                    ? 'border-emerald-400/40 bg-emerald-400/10 text-white shadow-[0_0_0_1px_rgba(16,185,129,0.2)]'
                    : 'border-white/8 bg-white/[0.03] text-slate-300 hover:border-white/15 hover:bg-white/[0.05] hover:text-white',
                )}
              >
                {item}
              </a>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export function AiHotboardScreen() {
  const timelineGroups = useMemo<TimelineGroup[]>(function buildTimelineGroups() {
    const enriched = payload.events
      .slice()
      .map(function enrichEvent(event) {
        return {
          ...event,
          timestamp: normalizeTimelineTimestamp(event.timestamp),
          signalScore: computeSignalScore(event),
          actionLine: normalizeActionLine(event.suggested_action),
          recommendReasonLine: normalizeRecommendReason(event.recommend_reason),
          condensedSourceLabel: buildCondensedSourceLabel(event),
          aggregatedSourcesLabel: buildAggregatedSourcesLabel(event),
        }
      })
      .sort(function sortByTimestampDesc(a, b) {
        return b.timestamp.localeCompare(a.timestamp)
      })

    const groups = new Map<string, TimelineGroup>()

    enriched.forEach(function assignGroup(event) {
      const existing = groups.get(event.timestamp)
      if (existing) {
        existing.events.push(event)
        return
      }

      groups.set(event.timestamp, {
        timestamp: event.timestamp,
        events: [event],
      })
    })

    return Array.from(groups.values())
  }, [])

  return (
    <div className="fixed inset-0 z-[120] overflow-y-auto bg-[#050816] text-slate-100">
      <div className="mx-auto flex min-h-screen w-full max-w-[1440px] gap-4 px-3 py-5 sm:gap-5 sm:px-4 lg:gap-6 lg:px-6">
        <aside
          className="w-[240px] shrink-0 rounded-[28px] border border-white/8 bg-[#0b1220] p-4 shadow-[0_30px_80px_rgba(0,0,0,0.45)] sm:w-[260px] sm:p-5 lg:w-[270px]"
          aria-label="AI HOT 左侧导航"
        >
          <div className="mb-6 flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4">
            <div>
              <div className="text-[12px] tracking-[0.36em] text-slate-500">SIGNAL BOARD</div>
              <div className="mt-2 flex items-center gap-2 text-2xl font-semibold tracking-[0.2em] text-white">
                <span>AI</span>
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-emerald-400/60 text-sm text-emerald-300">
                  ○
                </span>
                <span>HOT</span>
              </div>
            </div>
            <div className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-[11px] text-emerald-200">
              Live
            </div>
          </div>

          <nav className="space-y-4" aria-label="AI HOT 导航列表">
            <SidebarNavGroup items={['精选', '全部 AI 动态', '低粉爆文', '收藏']} highlightedItem="精选" />
            <SidebarDisclosure title="信源" items={SOURCE_ITEMS} />
            <SidebarDisclosure title="信源提报" items={SOURCE_SUBMISSION_ITEMS} />
            <SidebarExpandedGroup title="精选策略" items={STRATEGY_LINES} />
            <SidebarExpandedGroup title="策略迭代" items={STRATEGY_LINES} />
            <SidebarNavGroup items={['系统', '用户', '退出']} />
          </nav>
        </aside>

        <main className="min-w-0 flex-1 rounded-[32px] border border-white/8 bg-[#0a1020] p-4 shadow-[0_30px_80px_rgba(0,0,0,0.4)] sm:p-5 lg:p-6">
          <header className="mb-6 flex flex-col gap-4 rounded-[26px] border border-white/8 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.18),_transparent_36%),linear-gradient(135deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))] px-5 py-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-[11px] tracking-[0.35em] text-emerald-300/80">AI HOTBOARD</div>
              <h1 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">AI 热点看板</h1>
            </div>
            <div className="flex flex-col items-start gap-2 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-slate-300 sm:items-end">
              <div>更新时间：{formatGeneratedAt(payload.generated_at)}</div>
              <div>数据来源：ai-hotboard-mock-data.json</div>
            </div>
          </header>

          <div className="space-y-6">
            {timelineGroups.map(function renderGroup(group) {
              return (
                <section key={group.timestamp} className="grid grid-cols-[88px_minmax(0,1fr)] gap-4 lg:gap-6">
                  <div className="sticky top-5 h-fit">
                    <div className="flex gap-3">
                      <div className="flex flex-col items-center pt-1">
                        <span className="h-3.5 w-3.5 rounded-full border-2 border-emerald-300 bg-emerald-400 shadow-[0_0_16px_rgba(16,185,129,0.55)]" />
                        <span className="mt-2 min-h-20 w-px flex-1 bg-gradient-to-b from-emerald-400/60 via-emerald-400/20 to-transparent" />
                      </div>
                      <div className="text-[32px] font-extrabold leading-none tracking-[-0.04em] text-white sm:text-[36px]">
                        {group.timestamp}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {group.events.map(function renderEvent(event) {
                      return (
                        <article
                          key={event.id}
                          className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] px-5 py-4 shadow-[0_22px_60px_rgba(0,0,0,0.24)]"
                        >
                          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent" />
                          <div className="flex flex-col gap-4">
                            <div className="flex items-start justify-between gap-4">
                              <div className="min-w-0 flex-1 space-y-3.5 pr-0 lg:pr-4">
                                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-slate-400 sm:text-sm">
                                  <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_16px_rgba(16,185,129,0.55)]" />
                                  <span className="truncate">{event.condensedSourceLabel}</span>
                                </div>

                                <h2 className="max-w-4xl text-lg font-bold leading-7 text-white sm:text-[22px] sm:leading-8">
                                  {event.title}
                                </h2>

                                <p className="max-w-4xl text-sm leading-6 text-slate-300 sm:text-[15px] sm:leading-7 lg:max-w-[92%]">
                                  {event.summary}
                                </p>
                              </div>

                              <div className="flex shrink-0 items-start gap-2 lg:ml-2">
                                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(96,165,250,0.95),rgba(37,99,235,0.98))] text-[22px] font-bold leading-none text-white shadow-[0_10px_30px_rgba(37,99,235,0.45)] ring-1 ring-white/10">
                                  {event.signalScore}
                                </div>
                                <div className="flex gap-1.5">
                                  <span
                                    className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-2 text-xs text-slate-300"
                                    aria-label={`点赞数 ${event.engagement.likes}`}
                                  >
                                    👍 {event.engagement.likes}
                                  </span>
                                  <span
                                    className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-2 text-xs text-slate-300"
                                    aria-label={`点踩数 ${event.engagement.dislikes}`}
                                  >
                                    👎 {event.engagement.dislikes}
                                  </span>
                                  <span
                                    className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-2 text-xs text-slate-300"
                                    aria-label={`收藏数 ${event.engagement.bookmarks}`}
                                  >
                                    ☆ {event.engagement.bookmarks}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[12px] leading-5 text-slate-500">
                              {event.tags.map(function renderTag(tag) {
                                return (
                                  <span
                                    key={`${event.id}-${tag}`}
                                    className={cn(
                                      'rounded-full border px-2.5 py-0.5 text-[11px] font-medium tracking-[0.01em]',
                                      getTagTone(tag),
                                    )}
                                  >
                                    {tag}
                                  </span>
                                )
                              })}
                              <span className="text-[11px] text-slate-500">· {event.signal_category}</span>
                              {event.aggregatedSourcesLabel ? (
                                <span className="rounded-full border border-white/8 bg-white/[0.03] px-2 py-0.5 text-[11px] text-slate-400">
                                  {event.aggregatedSourcesLabel}
                                </span>
                              ) : null}
                            </div>

                            <div
                              className="rounded-2xl border border-emerald-400/24 bg-emerald-400/[0.08] px-4 py-3 text-sm leading-6 text-emerald-50"
                              data-recommend-banner="true"
                              aria-label="推荐理由绿色条"
                            >
                              <div>{event.recommendReasonLine}</div>
                              <div className="mt-1 text-emerald-100/85">{event.actionLine}</div>
                            </div>
                          </div>
                        </article>
                      )
                    })}
                  </div>
                </section>
              )
            })}
          </div>
        </main>
      </div>
    </div>
  )
}
