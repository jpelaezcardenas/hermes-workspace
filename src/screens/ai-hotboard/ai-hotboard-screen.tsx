import { useMemo } from 'react'
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

const PRIMARY_NAV_ITEMS = ['精选', '全部 AI 动态', '低粉爆文', '收藏', '信源', '信源提报'] as const

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

const SOURCE_SUBMISSION_ITEMS = [
  'JC 苹果备忘录日记',
  '爱马仕战略发现',
  '小J 执行发现',
] as const

const TAG_WEIGHT_MAP: Record<string, number> = {
  Agent: 40,
  多Agent架构: 40,
  skills: 40,
  Anthropic: 30,
  '模型发布': 30,
  编码: 20,
  工具: 20,
  API: 20,
  '视频生成': 20,
  开源: 10,
  '大佬观点': 10,
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
  const rawScore = 60 + Math.round(tagScore / Math.max(event.tags.length, 1) / 3) + Math.round(categoryScore / 5) + engagementScore + aggregatedScore

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

function SidebarBlock({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <section className="rounded-2xl border border-white/8 bg-white/[0.03] px-3 py-3" aria-label={title}>
      <div className="mb-2 text-[11px] font-semibold tracking-[0.24em] text-slate-500">
        {title}
      </div>
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

function SidebarNavGroup({
  heading,
  items,
  highlightedItem,
}: {
  heading?: string
  items: readonly string[]
  highlightedItem?: string
}) {
  return (
    <section className="space-y-2" aria-label={heading ?? '主导航'}>
      {heading ? (
        <div className="px-1 text-[11px] font-semibold tracking-[0.24em] text-slate-500">{heading}</div>
      ) : null}
      <ul className="space-y-2">
        {items.map(function renderNavItem(item) {
          const isHighlighted = item === highlightedItem
          return (
            <li
              key={item}
              className={cn(
                'list-none rounded-2xl border px-4 py-3 text-sm font-medium transition',
                isHighlighted
                  ? 'border-emerald-400/40 bg-emerald-400/10 text-white shadow-[0_0_0_1px_rgba(16,185,129,0.2)]'
                  : 'border-white/8 bg-white/[0.03] text-slate-300 hover:border-white/15 hover:bg-white/[0.05] hover:text-white',
              )}
              data-nav-item={item}
            >
              {item}
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

  const highestSignalScore = useMemo(function getHighestSignalScore() {
    return timelineGroups.reduce(function findHighestScore(highestScore, group) {
      const groupHighestScore = group.events.reduce(function findGroupHighestScore(currentHighestScore, event) {
        return Math.max(currentHighestScore, event.signalScore)
      }, 0)

      return Math.max(highestScore, groupHighestScore)
    }, 0)
  }, [timelineGroups])

  return (
    <div className="fixed inset-0 z-[120] overflow-y-auto bg-[#050816] text-slate-100">
      <div className="mx-auto flex min-h-screen w-full max-w-[1660px] gap-4 px-3 py-5 sm:gap-5 sm:px-4 lg:gap-6 lg:px-6">
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
            <SidebarNavGroup items={PRIMARY_NAV_ITEMS} highlightedItem="精选" />
            <SidebarBlock title="信源" items={SOURCE_ITEMS} />
            <SidebarBlock title="信源提报" items={SOURCE_SUBMISSION_ITEMS} />
            <SidebarNavGroup heading="策略" items={['精选策略', '策略迭代']} />
            <SidebarBlock title="精选策略" items={STRATEGY_LINES} />
            <SidebarBlock title="策略迭代" items={STRATEGY_LINES} />
            <SidebarNavGroup heading="后台" items={['系统', '用户', '退出']} />
          </nav>
        </aside>

        <main className="min-w-0 flex-1 rounded-[32px] border border-white/8 bg-[#0a1020] p-4 shadow-[0_30px_80px_rgba(0,0,0,0.4)] sm:p-5 lg:p-6">
          <header className="mb-6 flex flex-col gap-4 rounded-[26px] border border-white/8 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.18),_transparent_36%),linear-gradient(135deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))] px-5 py-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-[11px] tracking-[0.35em] text-emerald-300/80">AI HOTBOARD</div>
              <h1 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">AI 热点看板</h1>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">
                独立路由时间轴骨架，按 mock 数据聚合信号分、推荐理由与建议动作，仅展示 charter 白名单内容。
              </p>
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
                    <div className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-3 py-3 text-center">
                      <div className="text-[11px] uppercase tracking-[0.25em] text-emerald-200/80">TIME</div>
                      <div className="mt-1 text-2xl font-semibold text-white">{group.timestamp}</div>
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
                          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
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
                              <div className="rounded-[18px] border border-white/10 bg-white/[0.04] px-3 py-2 text-center">
                                <div className="text-[10px] tracking-[0.22em] text-slate-400">信号分</div>
                                <div className="mt-1 text-[24px] font-semibold leading-none text-slate-100">{event.signalScore}</div>
                              </div>
                              <div className="flex gap-1.5">
                                <button
                                  type="button"
                                  className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-2 text-xs text-slate-300 hover:border-emerald-400/40 hover:text-white"
                                >
                                  👍 {event.engagement.likes}
                                </button>
                                <button
                                  type="button"
                                  className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-2 text-xs text-slate-300 hover:border-rose-400/40 hover:text-white"
                                >
                                  👎 {event.engagement.dislikes}
                                </button>
                                <button
                                  type="button"
                                  className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-2 text-xs text-slate-300 hover:border-amber-400/40 hover:text-white"
                                >
                                  ☆ {event.engagement.bookmarks}
                                </button>
                              </div>
                            </div>
                          </div>

                          <div className="mt-2 space-y-1.5">
                            <div className="flex flex-wrap items-center gap-1.5 text-[12px] leading-5 text-slate-500">
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
                              <span className="rounded-full border border-white/8 bg-white/[0.02] px-2.5 py-0.5 text-[11px] text-slate-500">
                                {event.signal_category}
                              </span>
                              {event.aggregatedSourcesLabel ? (
                                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/8 bg-white/[0.02] px-2.5 py-0.5 text-[11px] text-slate-500/90">
                                  <span className="h-1 w-1 rounded-full bg-slate-500/70" aria-hidden="true" />
                                  {event.aggregatedSourcesLabel}
                                </span>
                              ) : null}
                            </div>

                            <div
                              className="rounded-lg border border-emerald-400/6 bg-emerald-400/[0.02] px-3 py-1.5 text-[12px] leading-5 text-emerald-50/72 shadow-[inset_0_1px_0_rgba(255,255,255,0.015)]"
                              data-recommend-banner="true"
                              aria-label="推荐理由绿色条"
                            >
                              <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                                <span className="font-medium text-emerald-50/72">{event.recommendReasonLine}</span>
                                <span className="text-emerald-100/36">•</span>
                                <span className="text-emerald-100/56">{event.actionLine}</span>
                              </div>
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

        <aside className="hidden w-[320px] shrink-0 rounded-[28px] border border-white/8 bg-[#0c1323] p-5 xl:block">
          <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-4">
            <div className="text-[11px] tracking-[0.28em] text-slate-500">观察摘要</div>
            <div className="mt-3 space-y-3">
              <div className="rounded-2xl border border-white/8 bg-black/20 px-4 py-3">
                <div className="text-sm text-slate-400">今日事件数</div>
                <div className="mt-1 text-3xl font-semibold text-white">{payload.events.length}</div>
              </div>
              <div className="rounded-2xl border border-white/8 bg-black/20 px-4 py-3">
                <div className="text-sm text-slate-400">最高信号分</div>
                <div className="mt-1 text-3xl font-semibold text-white">{highestSignalScore}</div>
              </div>
              <div className="rounded-2xl border border-white/8 bg-black/20 px-4 py-3 text-sm leading-7 text-slate-300">
                白名单增量已覆盖：信号分算法、建议动作第二行、信源/信源提报静态子项、M2 五条业务主线。
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
