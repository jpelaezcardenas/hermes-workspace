import { useEffect, useMemo, useRef, useState } from 'react'
import type { KeyboardEvent as ReactKeyboardEvent, ReactNode } from 'react'
import { cn } from '@/lib/utils'

type TimeRange = '24h' | '3d' | '7d'
type EventStatus = '精选' | '共振' | '新增' | '观察'
type EventStage = '待分发' | '验证中' | '可执行' | '已升级'
type ModeKey = 'signal' | 'action' | 'radar'
type RouteLane = '老板晨报' | '实验验证' | '内容投产' | '持续观察'
type ExecutionStatus = '待启动' | '进行中' | '待确认' | '已排期'

type HotEvent = {
  id: string
  title: string
  timestamp: string
  source: string
  score: number
  sourceCount: number
  status: EventStatus
  stage: EventStage
  priority: 'P0' | 'P1' | 'P2'
  confidence: number
  owner: string
  team: string
  deadline: string
  nextStep: string
  routeLane: RouteLane
  businessOutcome: string
  businessWindow: string
  summary: string
  whyItMatters: string
  timelineNote: string
  impact: string
  riskAlert: string
  sourceDigest: string
  recommendedChannels: string[]
  recommendedBrands: string[]
  applicableTeams: string[]
  checklist: string[]
  contentTags: string[]
  businessTags: string[]
  actions: string[]
  executionSlots: Array<{ label: string; owner: string; eta: string; status: ExecutionStatus }>
  scoreBreakdown: {
    热度: number
    新颖度: number
    可执行性: number
    业务相关性: number
    持续跟踪: number
  }
  sources: Array<{ name: string; type: string }>
}

type NavGroup = {
  title: string
  items: Array<{ label: string; count: string; tone?: 'default' | 'accent' | 'warning' }>
}

type Metric = {
  label: string
  value: string
  delta: string
  accent: string
}

type FeedSpotlight = {
  id: string
  kicker: string
  detail: string
}

type QueueBucket = {
  title: string
  hint: string
  lane: RouteLane
  tone: string
}

type RouteAccent = {
  badge: string
  panel: string
  glow: string
  text: string
  signal: string
  beam: string
  dot: string
  wash: string
}

const NAV_GROUPS: NavGroup[] = [
  {
    title: '控制台频道',
    items: [
      { label: '今日精选', count: '17', tone: 'accent' },
      { label: '全部 AI 动态', count: '128' },
      { label: 'AI 视频战情', count: '12', tone: 'accent' },
      { label: '模型发布', count: '21' },
      { label: 'Agent / Workflow', count: '19' },
      { label: '白名单信源', count: '34%' },
      { label: '老板晨报池', count: '04', tone: 'warning' },
    ],
  },
  {
    title: '执行队列',
    items: [
      { label: '待验证', count: '06', tone: 'warning' },
      { label: '待跟进', count: '11' },
      { label: '已转动作', count: '08', tone: 'accent' },
      { label: '指挥台规则', count: '14' },
      { label: '值班 Owner', count: '03' },
      { label: '系统状态', count: 'Live', tone: 'accent' },
    ],
  },
]

const FILTER_GROUPS = [
  {
    title: '平台',
    items: ['X', 'Hacker News', 'Blog', 'GitHub', 'YouTube', 'Newsletter'],
  },
  {
    title: '标签',
    items: ['模型', 'Agent', '视频', '工作流', '编码', '开源'],
  },
  {
    title: '业务',
    items: ['短视频', '投放', '内容', '运营', '品牌', '研发'],
  },
]

const METRICS_BY_RANGE: Record<TimeRange, Metric[]> = {
  '24h': [
    { label: '今日新增事件', value: '128', delta: '+23', accent: '#8b5cf6' },
    { label: '高价值事件', value: '17', delta: '+5', accent: '#22d3ee' },
    { label: 'AI 视频相关', value: '12', delta: '+4', accent: '#22c55e' },
    { label: '多源共振', value: '09', delta: '+2', accent: '#f59e0b' },
    { label: '可转动作', value: '11', delta: '+3', accent: '#ec4899' },
    { label: '白名单命中', value: '34%', delta: '+6%', accent: '#38bdf8' },
  ],
  '3d': [
    { label: '新增事件', value: '302', delta: '+49', accent: '#8b5cf6' },
    { label: '高价值事件', value: '39', delta: '+8', accent: '#22d3ee' },
    { label: 'AI 视频相关', value: '31', delta: '+9', accent: '#22c55e' },
    { label: '多源共振', value: '26', delta: '+6', accent: '#f59e0b' },
    { label: '可转动作', value: '24', delta: '+5', accent: '#ec4899' },
    { label: '白名单命中', value: '37%', delta: '+4%', accent: '#38bdf8' },
  ],
  '7d': [
    { label: '新增事件', value: '718', delta: '+112', accent: '#8b5cf6' },
    { label: '高价值事件', value: '86', delta: '+17', accent: '#22d3ee' },
    { label: 'AI 视频相关', value: '74', delta: '+16', accent: '#22c55e' },
    { label: '多源共振', value: '61', delta: '+14', accent: '#f59e0b' },
    { label: '可转动作', value: '57', delta: '+11', accent: '#ec4899' },
    { label: '白名单命中', value: '41%', delta: '+7%', accent: '#38bdf8' },
  ],
}

const HOT_EVENTS: HotEvent[] = [
  {
    id: 'opus-47',
    title: 'Claude Opus 4.7 正式发布，编码与长上下文稳定性继续拉开差距',
    timestamp: '22:57',
    source: 'Anthropic Newsroom',
    score: 92,
    sourceCount: 12,
    status: '共振',
    stage: '已升级',
    priority: 'P0',
    confidence: 91,
    owner: '小J / 研发策略',
    team: '研发 + 内容',
    deadline: '今天 23:40',
    nextStep: '30 分钟内输出对比测试单，明早给管理层结论版摘要。',
    routeLane: '老板晨报',
    businessOutcome: '给管理层一个“是否升级主力模型”的决策依据，同时圈定高价值链路。',
    businessWindow: '今晚完成评估，明早进入老板晨报与研发评审。',
    summary:
      'Anthropic 发布 Claude Opus 4.7，在复杂软件工程、长上下文推理和图像理解上均有明显提升。讨论焦点已从“更强”转向“哪些链路可以半托管交付”。',
    whyItMatters:
      '这不是普通模型新闻，而是 agent 工作流的授权上限被抬高，复杂内容加工、自动报告和执行链能进一步放权。',
    timelineNote: '22:31 官宣；22:42 HN 热帖；22:55 Builder 圈开始贴实测。',
    impact: '预计影响：代码代理、报告生成、知识库问答、长文拆解全链路。',
    riskAlert: '若成本显著上升，需要限定为高价值链路，不建议默认替换所有模型。',
    sourceDigest: '官网官宣已定性，HN 与 builder 圈同步转向“真实产能提升”视角，信号强且会持续外溢。',
    recommendedChannels: ['老板晨报', '研发评审会', '内容选题群'],
    recommendedBrands: ['Monster Code', 'GIRF', 'Hermes Workspace'],
    applicableTeams: ['研发', '内容', '运营策略'],
    checklist: ['做 3 组 benchmark', '更新模型白名单', '梳理适用任务边界', '同步内容组 demo 角度'],
    contentTags: ['模型发布', '编码', '长上下文', 'Agent'],
    businessTags: ['值得老板关注', '值得测试', '可沉淀 SOP'],
    actions: ['安排测试', '同步内容组', '加入白名单跟踪'],
    executionSlots: [
      { label: '基准测试', owner: '研发策略', eta: '23:20', status: '进行中' },
      { label: '管理层摘要', owner: '小J', eta: '08:30', status: '待确认' },
      { label: '内容 demo', owner: '内容组', eta: '10:00', status: '已排期' },
    ],
    scoreBreakdown: { 热度: 10, 新颖度: 9, 可执行性: 9, 业务相关性: 10, 持续跟踪: 9 },
    sources: [
      { name: 'Anthropic Newsroom', type: '官网' },
      { name: 'X / ClaudeAI', type: 'X' },
      { name: 'Hacker News', type: '社区' },
      { name: '开发者博客', type: 'Blog' },
    ],
  },
  {
    id: 'qwen-agentic',
    title: 'Qwen3.6-35B-A3B 开放，Agentic Coding 能力开始进入更低门槛试用区',
    timestamp: '22:32',
    source: 'Hacker News / buzzing.cc',
    score: 84,
    sourceCount: 4,
    status: '新增',
    stage: '验证中',
    priority: 'P1',
    confidence: 78,
    owner: '阿越 / 模型评测',
    team: '研发 + 运营',
    deadline: '明天 12:00',
    nextStep: '跑低成本替代实验，明确哪些边缘任务可以从高价模型切换。',
    routeLane: '实验验证',
    businessOutcome: '验证是否能把夜间批任务与边缘任务从高价模型切到更低成本路线。',
    businessWindow: '明天中午前给出成本-稳定性结论，决定是否进入灰度路由。',
    summary:
      '阿里发布新一代代码模型，主打 Agentic Coding。重点不只在参数规模，而在于低门槛模型也开始承接规划 + 执行类编程任务。',
    whyItMatters:
      '更适合作为低成本实验池。如果稳定性可接受，可用于边缘任务、草稿生成和批量测试，不必全压高价模型。',
    timelineNote: '22:08 社区首发；22:20 聚合站上榜；22:30 评测贴开始出现。',
    impact: '预计影响：成本优化、模型路由、批量测试、夜间自动任务。',
    riskAlert: '开源模型社区反馈快但波动大，先看稳定性与工具调用表现。',
    sourceDigest: '社区热度上升很快，但一手结论仍偏早期，适合进入灰度验证队列，不宜直接给老板下定论。',
    recommendedChannels: ['模型实验池', '工程周会', '运营机器人需求池'],
    recommendedBrands: ['Hermes Workspace', 'Monster Code'],
    applicableTeams: ['研发', '运营'],
    checklist: ['对比单轮成本', '验证工具调用成功率', '看长任务稳定性', '记录社区异常 case'],
    contentTags: ['模型发布', '开源', '编码', 'Agent'],
    businessTags: ['值得测试', '研发相关', '成本优化'],
    actions: ['做对比测试', '评估成本曲线', '观察社区反馈'],
    executionSlots: [
      { label: '成本实验', owner: '模型评测', eta: '09:30', status: '待启动' },
      { label: '工具调用回归', owner: '研发', eta: '10:40', status: '待确认' },
      { label: '灰度路由建议', owner: '运营策略', eta: '12:00', status: '待确认' },
    ],
    scoreBreakdown: { 热度: 8, 新颖度: 8, 可执行性: 8, 业务相关性: 8, 持续跟踪: 10 },
    sources: [
      { name: 'Hacker News', type: '社区' },
      { name: 'Qwen 团队', type: '官网' },
      { name: 'buzzing.cc', type: '聚合' },
    ],
  },
  {
    id: 'seedance-ugc',
    title: 'Seedance 2.0 工作流开始出现 UGC 自动化批量出片范式',
    timestamp: '21:46',
    source: 'X Builder 圈',
    score: 89,
    sourceCount: 8,
    status: '精选',
    stage: '可执行',
    priority: 'P0',
    confidence: 94,
    owner: '内容实验组',
    team: '内容 + 投放',
    deadline: '今天 18:30',
    nextStep: '本轮优先做 1 个角色一致性短视频 demo，并输出可复用模板。',
    routeLane: '内容投产',
    businessOutcome: '形成可复用短视频模板，直接支撑内容产能和投放素材测试。',
    businessWindow: '今天先产出 1 条 demo，48 小时内决定是否进入素材流水线。',
    summary:
      '多个 builder 展示 Seedance 2.0 结合镜头拆分、脚本模板和角色一致性控制的批量工作流，突破点在于短视频素材工业化可复制。',
    whyItMatters:
      'AI 视频是重点赛道，这条不是工具新闻，而是直接关乎抖音内容产能，值得优先进入实验和 SOP 沉淀。',
    timelineNote: '21:10 第一批案例；21:28 教程 thread；21:44 出现批量 workflow 演示。',
    impact: '预计影响：UGC 产能、投放素材效率、角色一致性、爆款脚本复制。',
    riskAlert: '若镜头稳定性仍不足，需要把它定位在测试池而非正式投放生产。',
    sourceDigest: 'Builder 圈已经从“能不能做”转为“如何批量稳定做”，是真正适合内容和投放团队接手的信号。',
    recommendedChannels: ['内容选题会', '投放创意群', 'AI 视频专区'],
    recommendedBrands: ['GIRF', '短视频矩阵'],
    applicableTeams: ['内容', '投放', '品牌'],
    checklist: ['筛 3 个 builder 案例', '复刻一条 15s demo', '沉淀脚本模板', '标记适合投放的镜头类型'],
    contentTags: ['AI 视频', '工作流', 'Seedance', 'UGC'],
    businessTags: ['可转短视频', '高优先级', '适合内容组'],
    actions: ['进入测试池', '整理脚本模板', '同步投放组'],
    executionSlots: [
      { label: '复刻 demo', owner: '内容实验组', eta: '15:00', status: '进行中' },
      { label: '脚本模板', owner: '内容策略', eta: '17:00', status: '待确认' },
      { label: '投放评审', owner: '投放组', eta: '18:30', status: '已排期' },
    ],
    scoreBreakdown: { 热度: 9, 新颖度: 9, 可执行性: 10, 业务相关性: 10, 持续跟踪: 8 },
    sources: [
      { name: '@servasyy_ai', type: 'X' },
      { name: '@AlexFinn', type: 'X' },
      { name: 'YouTube 教程', type: '视频' },
      { name: 'Builder Newsletter', type: 'Newsletter' },
    ],
  },
  {
    id: 'memory-stack',
    title: 'Memory + Context Layer 再次成为 Agent 产品焦点，持久化编排开始从概念转实操',
    timestamp: '20:58',
    source: '多博客聚合',
    score: 78,
    sourceCount: 6,
    status: '观察',
    stage: '待分发',
    priority: 'P2',
    confidence: 73,
    owner: '平台架构组',
    team: '研发',
    deadline: '本周五',
    nextStep: '做概念整理，不立即转执行，但要沉淀架构启发与案例库。',
    routeLane: '持续观察',
    businessOutcome: '为后续 agent 中台设计储备模式库，避免短期盲目立项。',
    businessWindow: '本周内形成备忘录，继续观察成熟度再决定是否升级。',
    summary:
      '近期围绕 memory layer、context routing、session recovery 的讨论密集上升，关注点从“能不能做”转向“怎样稳态运行并形成 ROI”。',
    whyItMatters:
      '这条与我们自己的中台方向高度一致，虽然不一定马上转业务动作，但会直接影响后续 agent 体系结构设计和成本效率。',
    timelineNote: '过去 72h 内多篇长文与案例串联，趋势性增强。',
    impact: '预计影响：agent 中台设计、记忆持久化、长期任务稳定性。',
    riskAlert: '概念热度高于落地成熟度，容易陷入过度设计。',
    sourceDigest: '适合做架构备忘录，不适合占据主晨报头条；应保持观察，不急于动作化。',
    recommendedChannels: ['架构周报', '技术备忘录'],
    recommendedBrands: ['Hermes Workspace'],
    applicableTeams: ['研发', '平台架构'],
    checklist: ['归档案例', '抽取架构模式', '标记可复用模块', '避免立即立项'],
    contentTags: ['Memory', 'Agent', 'Context Layer'],
    businessTags: ['架构相关', '值得长期跟踪'],
    actions: ['持续观察', '记录案例', '提炼可复用模式'],
    executionSlots: [
      { label: '案例归档', owner: '平台架构组', eta: '周三', status: '待启动' },
      { label: '模式提炼', owner: '架构 owner', eta: '周四', status: '待确认' },
      { label: '立项判断', owner: '研发负责人', eta: '周五', status: '待确认' },
    ],
    scoreBreakdown: { 热度: 7, 新颖度: 8, 可执行性: 7, 业务相关性: 8, 持续跟踪: 9 },
    sources: [
      { name: 'Builder Blogs', type: 'Blog' },
      { name: 'HN 讨论串', type: '社区' },
      { name: 'X threads', type: 'X' },
    ],
  },
]

const MODE_OPTIONS: Array<{ key: ModeKey; label: string; hint: string }> = [
  { key: 'signal', label: 'Signal Desk', hint: '按热点与共振扫描' },
  { key: 'action', label: 'Action Queue', hint: '按业务动作优先级排' },
  { key: 'radar', label: 'Video Radar', hint: '聚焦 AI 视频实验池' },
]

const FLOW_SEGMENTS = ['全部事件', '高优先级', '可执行', 'AI 视频', '白名单']
const FLOW_CONTROLS = ['仅看今日', '多源共振', '附带负责人', '可直接转动作']
const EXECUTION_PULSE = [
  { label: '值班 Owner', value: '小J / 内容实验组', tone: 'text-white' },
  { label: '待升级', value: '4 条', tone: 'text-amber-100' },
  { label: '老板可看', value: '4 条', tone: 'text-cyan-100' },
  { label: 'Demo 状态', value: 'Ready', tone: 'text-emerald-200' },
]
const FEED_SPOTLIGHTS: FeedSpotlight[] = [
  { id: 'sync', kicker: '队列节奏', detail: '首屏优先露出 2~3 条高价值事件，减少概览壳层感。' },
  { id: 'headline', kicker: '扫描重点', detail: '先看标题 / 状态 / 下一步，再决定是否进入右侧详情。' },
  { id: 'owner', kicker: '执行锚点', detail: '所有头部信号都绑定 owner、DDL 与 action cue。' },
]
const QUEUE_BUCKETS: QueueBucket[] = [
  { title: '老板判断', hint: '适合上管理层晨报或升级汇报', lane: '老板晨报', tone: 'border-fuchsia-400/18 bg-fuchsia-400/8 text-fuchsia-100' },
  { title: '立即验证', hint: '进入 benchmark / demo / 成本实验', lane: '实验验证', tone: 'border-cyan-400/18 bg-cyan-400/8 text-cyan-100' },
  { title: '内容投产', hint: '适合内容组或投放组接手', lane: '内容投产', tone: 'border-emerald-400/18 bg-emerald-400/8 text-emerald-100' },
  { title: '继续观察', hint: '先归档，保留后续升级入口', lane: '持续观察', tone: 'border-white/8 bg-white/[0.04] text-slate-200' },
]

const ROUTE_ACCENTS: Record<RouteLane, RouteAccent> = {
  老板晨报: {
    badge: 'border-fuchsia-400/24 bg-fuchsia-400/10 text-fuchsia-100',
    panel: 'border-fuchsia-400/20 bg-fuchsia-400/[0.08]',
    glow: 'shadow-[0_0_0_1px_rgba(217,70,239,0.10),0_16px_36px_rgba(112,26,117,0.18)]',
    text: 'text-fuchsia-100',
    signal: 'rgba(244,114,182,0.96)',
    beam: 'from-fuchsia-200 via-fuchsia-300/85 to-fuchsia-300/18',
    dot: 'border-fuchsia-200/70 bg-[#120913] shadow-[0_0_18px_rgba(217,70,239,0.42)]',
    wash: 'bg-[radial-gradient(circle_at_top_right,rgba(244,114,182,0.18),transparent_42%)]',
  },
  实验验证: {
    badge: 'border-cyan-400/24 bg-cyan-400/10 text-cyan-100',
    panel: 'border-cyan-400/20 bg-cyan-400/[0.08]',
    glow: 'shadow-[0_0_0_1px_rgba(34,211,238,0.10),0_16px_36px_rgba(8,145,178,0.18)]',
    text: 'text-cyan-100',
    signal: 'rgba(34,211,238,0.96)',
    beam: 'from-cyan-100 via-cyan-300/85 to-cyan-300/18',
    dot: 'border-cyan-200/70 bg-[#09101c] shadow-[0_0_18px_rgba(34,211,238,0.45)]',
    wash: 'bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.16),transparent_42%)]',
  },
  内容投产: {
    badge: 'border-emerald-400/24 bg-emerald-400/10 text-emerald-100',
    panel: 'border-emerald-400/20 bg-emerald-400/[0.08]',
    glow: 'shadow-[0_0_0_1px_rgba(52,211,153,0.10),0_16px_36px_rgba(6,95,70,0.18)]',
    text: 'text-emerald-100',
    signal: 'rgba(52,211,153,0.94)',
    beam: 'from-emerald-100 via-emerald-300/80 to-emerald-300/18',
    dot: 'border-emerald-200/70 bg-[#07130f] shadow-[0_0_18px_rgba(16,185,129,0.38)]',
    wash: 'bg-[radial-gradient(circle_at_top_right,rgba(52,211,153,0.16),transparent_42%)]',
  },
  持续观察: {
    badge: 'border-white/10 bg-white/[0.05] text-slate-200',
    panel: 'border-white/8 bg-white/[0.04]',
    glow: 'shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_16px_32px_rgba(15,23,42,0.16)]',
    text: 'text-slate-200',
    signal: 'rgba(226,232,240,0.84)',
    beam: 'from-slate-200 via-slate-300/60 to-transparent',
    dot: 'border-slate-200/40 bg-[#0f172a] shadow-[0_0_18px_rgba(148,163,184,0.22)]',
    wash: 'bg-[radial-gradient(circle_at_top_right,rgba(226,232,240,0.10),transparent_42%)]',
  },
}

function Panel({
  title,
  right,
  children,
  className,
}: {
  title?: string
  right?: ReactNode
  children: ReactNode
  className?: string
}) {
  return (
    <section
      className={cn(
        'rounded-[20px] border border-white/8 bg-[linear-gradient(180deg,rgba(15,21,35,0.98),rgba(10,14,24,0.98))] shadow-[0_0_0_1px_rgba(255,255,255,0.025),0_18px_46px_rgba(0,0,0,0.25)]',
        className,
      )}
    >
      {(title || right) && (
        <div className="flex items-center justify-between border-b border-white/6 px-3 py-2">
          <div>{title ? <h3 className="text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-500">{title}</h3> : null}</div>
          {right}
        </div>
      )}
      <div className="px-3 py-2.5">{children}</div>
    </section>
  )
}

function MetricCard({ label, value, delta, accent }: Metric) {
  return (
    <div className="relative overflow-hidden rounded-[15px] border border-white/8 bg-[linear-gradient(180deg,rgba(21,28,44,0.96),rgba(12,17,29,0.98))] px-3 py-2">
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }} />
      <div className="text-[10px] uppercase tracking-[0.18em] text-slate-500">{label}</div>
      <div className="mt-1 flex items-end justify-between gap-3">
        <div className="text-[22px] font-semibold leading-none tracking-tight text-white">{value}</div>
        <div className="rounded-full border px-2 py-0.5 text-[10px] font-medium" style={{ color: accent, borderColor: `${accent}55`, background: `${accent}14` }}>
          {delta}
        </div>
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: EventStatus }) {
  const tones: Record<EventStatus, { color: string; bg: string; border: string }> = {
    精选: { color: '#d8b4fe', bg: 'rgba(192,132,252,0.12)', border: 'rgba(192,132,252,0.35)' },
    共振: { color: '#67e8f9', bg: 'rgba(34,211,238,0.12)', border: 'rgba(34,211,238,0.35)' },
    新增: { color: '#fcd34d', bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.35)' },
    观察: { color: '#cbd5e1', bg: 'rgba(148,163,184,0.10)', border: 'rgba(148,163,184,0.28)' },
  }

  const tone = tones[status]
  return (
    <span className="inline-flex items-center rounded-full border px-2 py-1 text-[10px] font-medium" style={{ color: tone.color, background: tone.bg, borderColor: tone.border }}>
      {status}
    </span>
  )
}

function StageBadge({ stage }: { stage: EventStage }) {
  const tones: Record<EventStage, string> = {
    待分发: 'border-slate-400/20 bg-slate-400/10 text-slate-200',
    验证中: 'border-amber-400/20 bg-amber-400/10 text-amber-100',
    可执行: 'border-emerald-400/20 bg-emerald-400/10 text-emerald-100',
    已升级: 'border-fuchsia-400/20 bg-fuchsia-400/10 text-fuchsia-100',
  }

  return <span className={cn('inline-flex items-center rounded-full border px-2 py-1 text-[10px] font-medium', tones[stage])}>{stage}</span>
}

function RouteBadge({ lane }: { lane: RouteLane }) {
  const tones: Record<RouteLane, string> = {
    老板晨报: 'border-fuchsia-400/20 bg-fuchsia-400/10 text-fuchsia-100',
    实验验证: 'border-cyan-400/20 bg-cyan-400/10 text-cyan-100',
    内容投产: 'border-emerald-400/20 bg-emerald-400/10 text-emerald-100',
    持续观察: 'border-white/8 bg-white/[0.04] text-slate-200',
  }

  return <span className={cn('inline-flex items-center rounded-full border px-2 py-1 text-[10px] font-medium', tones[lane])}>{lane}</span>
}

function ExecutionStatusBadge({ status }: { status: ExecutionStatus }) {
  const tones: Record<ExecutionStatus, string> = {
    待启动: 'border-slate-400/20 bg-slate-400/10 text-slate-200',
    进行中: 'border-cyan-400/20 bg-cyan-400/10 text-cyan-100',
    待确认: 'border-amber-400/20 bg-amber-400/10 text-amber-100',
    已排期: 'border-emerald-400/20 bg-emerald-400/10 text-emerald-100',
  }

  return <span className={cn('inline-flex items-center rounded-full border px-2 py-1 text-[10px] font-medium', tones[status])}>{status}</span>
}

function BriefSection({
  title,
  right,
  children,
  className,
}: {
  title: string
  right?: ReactNode
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn('rounded-[14px] border border-white/[0.035] bg-white/[0.025] px-2.5 py-2', className)}>
      <div className="mb-1.5 flex items-center justify-between gap-2 border-b border-white/[0.045] pb-1.5">
        <div className="text-[9.5px] font-medium uppercase tracking-[0.22em] text-slate-500/90">{title}</div>
        {right}
      </div>
      {children}
    </div>
  )
}

function Tag({ label, kind = 'default' }: { label: string; kind?: 'default' | 'biz' | 'action' | 'team' | 'muted' }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium',
        kind === 'biz'
          ? 'border-cyan-400/12 bg-cyan-400/[0.045] text-cyan-100/72'
          : kind === 'action'
            ? 'border-fuchsia-400/12 bg-fuchsia-400/[0.05] text-fuchsia-100/74'
            : kind === 'team'
              ? 'border-emerald-400/12 bg-emerald-400/[0.05] text-emerald-100/74'
              : kind === 'muted'
                ? 'border-white/4 bg-white/[0.015] text-slate-500'
                : 'border-white/5 bg-white/[0.02] text-slate-300/84',
      )}
    >
      {label}
    </span>
  )
}

function TinyStat({ label, value, tone = 'text-slate-200' }: { label: string; value: string; tone?: string }) {
  return (
    <div className="rounded-[12px] border border-white/6 bg-white/[0.03] px-2.5 py-1.5">
      <div className="text-[10px] uppercase tracking-[0.18em] text-slate-500">{label}</div>
      <div className={cn('mt-0.5 text-[13px] font-medium leading-5', tone)}>{value}</div>
    </div>
  )
}

function NavItem({ label, count, active, tone = 'default', onClick }: { label: string; count: string; active: boolean; tone?: 'default' | 'accent' | 'warning'; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex w-full items-center gap-2 rounded-[12px] border px-2.5 py-1.5 text-left transition-all',
        active
          ? 'border-cyan-400/30 bg-cyan-400/10 text-white shadow-[0_0_0_1px_rgba(34,211,238,0.10)]'
          : 'border-white/5 bg-white/[0.02] text-slate-300 hover:border-white/10 hover:bg-white/[0.04]',
      )}
    >
      <span className={cn('h-2 w-2 rounded-full', active ? 'bg-cyan-300' : tone === 'accent' ? 'bg-fuchsia-400/80' : tone === 'warning' ? 'bg-amber-400/80' : 'bg-white/15')} />
      <span className="min-w-0 flex-1 truncate text-[13px]">{label}</span>
      <span className={cn('rounded-full px-2 py-0.5 text-[10px]', active ? 'bg-cyan-400/15 text-cyan-100' : 'bg-white/5 text-slate-400')}>{count}</span>
    </button>
  )
}

function EventCard({
  event,
  active,
  onClick,
  onKeyDown,
  cardRef,
  selectionLabel,
}: {
  event: HotEvent
  active: boolean
  onClick: () => void
  onKeyDown?: (event: ReactKeyboardEvent<HTMLButtonElement>) => void
  cardRef?: (node: HTMLButtonElement | null) => void
  selectionLabel?: string
}) {
  const primaryTags = event.contentTags.slice(0, 2)
  const supportTags = event.businessTags.slice(0, 1)
  const activeRouteAccent = ROUTE_ACCENTS[event.routeLane]
  const slotCount = event.executionSlots.length
  const sourcePreview = event.sources
    .slice(0, 2)
    .map((source) => source.name)
    .join(' / ')

  return (
    <button
      ref={cardRef}
      type="button"
      onClick={onClick}
      onKeyDown={onKeyDown}
      aria-pressed={active}
      aria-current={active ? 'true' : undefined}
      data-selected={active ? 'true' : 'false'}
      className={cn(
        'group relative w-full rounded-[16px] border text-left transition-all duration-200 focus-visible:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#070b13]',
        active
          ? cn(
              'bg-[linear-gradient(180deg,rgba(20,34,56,0.998),rgba(11,20,35,0.996))] ring-1',
              activeRouteAccent.panel,
              activeRouteAccent.glow,
            )
          : 'border-white/8 bg-[linear-gradient(180deg,rgba(19,25,40,0.96),rgba(12,17,30,0.98))] hover:-translate-y-0.5 hover:border-cyan-500/35 hover:bg-[linear-gradient(180deg,rgba(22,29,46,0.97),rgba(14,19,32,0.98))] hover:shadow-[0_12px_30px_rgba(8,145,178,0.10)] focus-visible:border-cyan-400/55 focus-visible:bg-[linear-gradient(180deg,rgba(22,29,46,0.99),rgba(14,19,32,0.99))] focus-visible:shadow-[0_16px_36px_rgba(8,145,178,0.14)]',
      )}
    >
      <div
        className={cn(
          'pointer-events-none absolute inset-0 rounded-[16px] opacity-0 transition duration-200 group-hover:opacity-100 group-focus-visible:opacity-100',
          active ? `${activeRouteAccent.wash} opacity-100` : 'bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.12),transparent_42%)]',
        )}
      />
      {active ? <div className={cn('absolute -right-px bottom-2 top-2 w-2 rounded-l-full bg-gradient-to-b shadow-[0_0_30px_rgba(34,211,238,0.72)]', activeRouteAccent.beam)} /> : null}
      {active ? <div className={cn('pointer-events-none absolute bottom-3 top-3 right-3 w-px bg-gradient-to-b shadow-[0_0_18px_rgba(34,211,238,0.4)]', activeRouteAccent.beam)} /> : null}
      {active ? <div className={cn('pointer-events-none absolute inset-x-3 top-0 h-[3px] rounded-b-full', activeRouteAccent.panel, 'shadow-[0_0_18px_rgba(34,211,238,0.28)]')} /> : null}
      {active ? (
        <div className="pointer-events-none absolute inset-y-5 -right-5 hidden w-16 items-center xl:flex" aria-hidden="true">
          <span className={cn('h-px flex-1 rounded-full bg-gradient-to-r shadow-[0_0_16px_rgba(34,211,238,0.34)]', activeRouteAccent.beam)} />
          <span className={cn('mx-1.5 h-2.5 w-2.5 rounded-full border', activeRouteAccent.dot)} />
          <span className={cn('rounded-full border px-2 py-1 text-[9px] font-medium uppercase tracking-[0.16em] shadow-[0_0_0_1px_rgba(34,211,238,0.05)]', activeRouteAccent.badge)}>
            {selectionLabel ?? 'Brief anchor'}
          </span>
        </div>
      ) : null}
      {active ? <div className={cn('pointer-events-none absolute right-3 top-3 hidden items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] shadow-[0_0_0_1px_rgba(34,211,238,0.06),0_10px_24px_rgba(8,145,178,0.14)] lg:flex', activeRouteAccent.badge)}>
        <span className="h-1.5 w-1.5 rounded-full bg-current opacity-90 shadow-[0_0_10px_currentColor]" aria-hidden="true" />
        Brief live
      </div> : null}
      {active ? <div className={cn('pointer-events-none absolute -right-7 top-1/2 hidden h-[2px] w-10 -translate-y-1/2 rounded-full bg-gradient-to-r shadow-[0_0_18px_rgba(34,211,238,0.5)] xl:block', activeRouteAccent.beam)} /> : null}
      {active ? <div className={cn('pointer-events-none absolute -right-11 top-1/2 hidden h-6 w-6 -translate-y-1/2 rounded-full border bg-[radial-gradient(circle,rgba(103,232,249,0.32),rgba(8,13,24,0.08)_62%,transparent_74%)] xl:block', activeRouteAccent.dot)} /> : null}
      {active ? <div className={cn('pointer-events-none absolute -right-4 top-1/2 hidden h-[3px] w-6 -translate-y-1/2 rounded-full bg-gradient-to-r shadow-[0_0_16px_rgba(34,211,238,0.38)] xl:block', activeRouteAccent.beam)} /> : null}
      {active ? <div className={cn('pointer-events-none absolute -right-5 top-1/2 hidden h-2.5 w-2.5 -translate-y-1/2 rounded-full border xl:block', activeRouteAccent.dot)} /> : null}
      {active ? <div className={cn('pointer-events-none absolute -right-6 top-[calc(50%-24px)] hidden h-12 w-px bg-gradient-to-b from-transparent xl:block', activeRouteAccent.beam)} /> : null}
      {active ? <div className={cn('pointer-events-none absolute inset-x-4 top-0 h-[2px] bg-gradient-to-r from-transparent to-transparent', activeRouteAccent.beam)} /> : null}
      <div className={cn('absolute bottom-2 left-2 top-2 w-px bg-[linear-gradient(180deg,rgba(34,211,238,0.42),transparent)]', active && 'bg-[linear-gradient(180deg,rgba(165,243,252,0.96),rgba(34,211,238,0.14))] shadow-[0_0_12px_rgba(34,211,238,0.22)]')} />
      <div className="grid gap-3 px-3 py-3 xl:grid-cols-[minmax(0,1fr)_78px]">
        <div className="min-w-0 pl-3">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[9.5px] text-slate-500">
            <span className="font-medium text-slate-100">{event.timestamp}</span>
            <span>·</span>
            <span>{event.source}</span>
            <span>·</span>
            <span>{event.sourceCount} 源</span>
            <StatusBadge status={event.status} />
            <StageBadge stage={event.stage} />
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-1.5 text-[9.5px] text-slate-500">
            <span className="rounded-full border border-rose-400/16 bg-rose-400/[0.06] px-2 py-0.5 font-semibold text-rose-100/80">{event.priority}</span>
            <RouteBadge lane={event.routeLane} />
            <span className="rounded-full border border-white/5 bg-white/[0.02] px-2 py-0.5 text-slate-400">可信度 {event.confidence}%</span>
            <span className="rounded-full border border-white/5 bg-white/[0.02] px-2 py-0.5 text-slate-500">Owner {event.owner}</span>
            {active ? <span className={cn('rounded-full border px-2 py-0.5 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]', activeRouteAccent.badge)}>{event.status} · Command brief</span> : null}
          </div>

          <div className="mt-2.5 grid gap-3 xl:grid-cols-[minmax(0,2.08fr)_176px]">
            <div className="min-w-0">
              <div className="mb-2 flex flex-wrap items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] text-slate-500">
                <span className={cn('rounded-full border px-2 py-1 transition-colors', active ? 'border-cyan-200/34 bg-cyan-300/14 text-cyan-50 shadow-[0_0_0_1px_rgba(34,211,238,0.06)]' : 'border-white/8 bg-white/[0.03] text-slate-500 group-hover:border-cyan-400/18 group-hover:text-cyan-100 group-focus-visible:border-cyan-400/18 group-focus-visible:text-cyan-100')}>
                  {active ? 'Selected in feed' : 'Ready for brief'}
                </span>
                <span className={cn('rounded-full border px-2 py-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]', active ? `${activeRouteAccent.badge} shadow-[0_0_0_1px_rgba(255,255,255,0.03)]` : 'border-white/8 bg-white/[0.03] text-slate-400')}>
                  {active ? `${event.routeLane} → Right brief` : event.routeLane}
                </span>
                {active ? (
                  <span className="rounded-full border border-cyan-200/24 bg-cyan-300/[0.1] px-2 py-1 text-cyan-50 shadow-[0_0_14px_rgba(34,211,238,0.12)]">
                    Brief focus live
                  </span>
                ) : null}
                {active ? (
                  <span className="rounded-full border border-cyan-200/22 bg-[linear-gradient(90deg,rgba(34,211,238,0.16),rgba(34,211,238,0.05))] px-2 py-1 text-cyan-100/95 shadow-[0_0_0_1px_rgba(34,211,238,0.05)] lg:hidden">
                    {selectionLabel ?? 'Brief live'}
                  </span>
                ) : null}
              </div>
              <h3 className="max-w-[50ch] text-[18px] font-semibold leading-[1.42] tracking-[-0.02em] text-white text-balance xl:text-[19px]">
                {event.title}
              </h3>
              <div className="mt-2.5 max-w-[92ch] space-y-1.5">
                <p className="line-clamp-2 text-[12.5px] leading-[1.72] text-slate-200/90">{event.summary}</p>
                <p className="line-clamp-2 text-[11.5px] leading-[1.62] text-slate-400/92">{event.whyItMatters}</p>
              </div>
            </div>
            <div
              className={cn(
                'rounded-[13px] border px-2.5 py-2 text-[10.5px] leading-[1.6]',
                active
                  ? 'border-cyan-300/22 bg-cyan-300/[0.09] text-cyan-50/88 shadow-[0_0_0_1px_rgba(34,211,238,0.08)]'
                  : 'border-fuchsia-400/14 bg-fuchsia-400/[0.05] text-fuchsia-50/78',
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <span className={cn('text-[10px] uppercase tracking-[0.18em]', active ? 'text-cyan-200/90' : 'text-fuchsia-200/75')}>Next action</span>
                <span className={cn('text-[10px]', active ? 'text-cyan-100/60' : 'text-fuchsia-200/50')}>{event.team}</span>
              </div>
              <div className="mt-1.5 line-clamp-3">{event.nextStep}</div>
            </div>
          </div>

          <div className="mt-2.5 grid gap-2 xl:grid-cols-[minmax(0,1.92fr)_minmax(164px,0.5fr)]">
            <div className={cn('rounded-[13px] border px-2.5 py-1.5 text-[11px] leading-[1.66] shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]', active ? activeRouteAccent.panel : 'border-cyan-400/10 bg-cyan-400/[0.055] text-cyan-50/92', active && activeRouteAccent.text)}>
              <div className="flex items-center justify-between gap-2">
                <span className={cn('text-[10px] uppercase tracking-[0.18em]', active ? activeRouteAccent.text : 'text-cyan-300/80')}>Editorial note</span>
                {active ? <span className={cn('text-[10px] uppercase tracking-[0.16em]', activeRouteAccent.text)}>Mirrors brief opener</span> : null}
              </div>
              <div className={cn('line-clamp-3', active ? 'text-white/92' : '')}>{event.whyItMatters}</div>
            </div>
            <div className="rounded-[13px] border border-amber-400/12 bg-amber-400/[0.05] px-2.5 py-1.5 text-[10.5px] leading-[1.55] text-amber-50/82">
              <div className="text-[10px] uppercase tracking-[0.18em] text-amber-200/80">Decision window</div>
              <div className="mt-1 line-clamp-2">{event.businessWindow}</div>
            </div>
          </div>

          {active ? (
            <div className="mt-2 rounded-[13px] border border-cyan-300/14 bg-[linear-gradient(90deg,rgba(34,211,238,0.08),rgba(34,211,238,0.03)_58%,transparent)] px-2.5 py-2 text-[11px] leading-[1.65] text-cyan-50/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.025)]">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="rounded-full border border-cyan-300/16 bg-cyan-300/[0.08] px-2 py-0.5 text-[10px] uppercase tracking-[0.16em] text-cyan-100/90">
                    Brief tether active
                  </span>
                  <span>{slotCount} 个执行槽位已在右栏延续展开</span>
                </div>
                <span className="text-[10px] text-cyan-100/65">{sourcePreview || event.source}</span>
              </div>
              <div className="mt-1.5 flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-cyan-100/72">
                <span className="h-px flex-1 bg-gradient-to-r from-cyan-300/65 via-cyan-300/18 to-transparent" />
                <span>{event.routeLane} mirrored in brief</span>
              </div>
            </div>
          ) : null}

          <div className="mt-2 grid gap-2 xl:grid-cols-[minmax(0,1.7fr)_minmax(168px,0.48fr)]">
            <div className="rounded-[13px] border border-emerald-400/12 bg-emerald-400/[0.055] px-2.5 py-1.5 text-[10.5px] leading-[1.58] text-emerald-50/82">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] uppercase tracking-[0.18em] text-emerald-300/78">Business outcome</span>
                <RouteBadge lane={event.routeLane} />
              </div>
              <div className="mt-1 line-clamp-2">{event.businessOutcome}</div>
            </div>
            <div className="rounded-[13px] border border-white/6 bg-[#0c1422] px-2.5 py-1.5 text-[10.5px] leading-[1.55] text-slate-400">
              <div className="text-[10px] uppercase tracking-[0.18em] text-slate-500">Source digest</div>
              <div className="mt-1 line-clamp-2 text-slate-300">{event.sourceDigest}</div>
            </div>
          </div>

          <div className="mt-2 flex flex-wrap gap-1.5">
            {primaryTags.map((tag) => (
              <Tag key={tag} label={tag} kind="muted" />
            ))}
            {supportTags.map((tag) => (
              <Tag key={tag} label={tag} kind="biz" />
            ))}
            <Tag label={`DDL ${event.deadline}`} kind="action" />
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-1.5 text-[10px] uppercase tracking-[0.16em] text-slate-500">
            <span
              className={cn(
                'rounded-full border px-2 py-1 transition-colors',
                active
                  ? 'border-cyan-300/34 bg-cyan-300/12 text-cyan-100'
                  : 'border-white/8 bg-white/[0.03] group-hover:border-cyan-400/20 group-hover:text-cyan-100 group-focus-visible:border-cyan-400/20 group-focus-visible:text-cyan-100',
              )}
            >
              {active ? '已连接右侧 Brief' : 'Enter 查看 Brief'}
            </span>
            <span className="rounded-full border border-white/8 bg-white/[0.03] px-2 py-1 group-hover:border-white/12 group-focus-visible:border-white/12">
              ↑↓ 切换事件
            </span>
            {active ? <span className="text-cyan-200">→ Right brief synced</span> : null}
          </div>

          <div className="mt-2 grid gap-2 text-[11px] text-slate-300 md:grid-cols-[minmax(0,1.16fr)_148px_148px]">
            <div className="rounded-[13px] border border-white/6 bg-white/[0.03] px-2.5 py-1.5">
              <div className="text-[10px] uppercase tracking-[0.16em] text-slate-500">Timeline</div>
              <div className="mt-1 line-clamp-2 leading-[1.6]">{event.timelineNote}</div>
            </div>
            <div className="rounded-[13px] border border-white/6 bg-white/[0.03] px-2.5 py-1.5">
              <div className="text-[10px] uppercase tracking-[0.16em] text-slate-500">Teams</div>
              <div className="mt-1 flex flex-wrap gap-1">
                {event.applicableTeams.map((team) => (
                  <Tag key={team} label={team} kind="team" />
                ))}
              </div>
            </div>
            <div className="rounded-[13px] border border-amber-400/15 bg-amber-400/6 px-2.5 py-1.5">
              <div className="text-[10px] uppercase tracking-[0.16em] text-amber-200">风险</div>
              <div className="mt-1 line-clamp-2 leading-[1.6] text-amber-50/90">{event.riskAlert}</div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="rounded-[14px] border border-cyan-400/20 bg-cyan-400/8 px-2.5 py-1.5 text-center">
            <div className="text-[10px] uppercase tracking-[0.18em] text-cyan-300">Score</div>
            <div className="mt-0.5 text-[20px] font-semibold leading-none text-white">{event.score}</div>
          </div>
          <div className="rounded-[14px] border border-white/6 bg-white/[0.03] px-2.5 py-1.5">
            <div className="text-[10px] uppercase tracking-[0.18em] text-slate-500">Impact</div>
            <div className="mt-1 line-clamp-3 text-[11px] leading-[1.6] text-slate-200">{event.impact}</div>
          </div>
        </div>
      </div>
    </button>
  )
}

function RangeButton({ active, label, onClick }: { active: boolean; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'rounded-full border px-3 py-1.5 text-[11px] font-medium transition-colors',
        active
          ? 'border-cyan-400/45 bg-cyan-400/12 text-cyan-200'
          : 'border-white/8 bg-white/5 text-slate-300 hover:border-white/15 hover:bg-white/[0.07]',
      )}
    >
      {label}
    </button>
  )
}

export function DashboardScreen() {
  const [range, setRange] = useState<TimeRange>('24h')
  const [activeNav, setActiveNav] = useState('今日精选')
  const [activeEventId, setActiveEventId] = useState(HOT_EVENTS[0]?.id ?? '')
  const [mode, setMode] = useState<ModeKey>('signal')
  const commandPanelRef = useRef<HTMLDivElement | null>(null)
  const eventCardRefs = useRef<Record<string, HTMLButtonElement | null>>({})

  const metrics = METRICS_BY_RANGE[range]
  const activeEvent = useMemo(() => HOT_EVENTS.find((event) => event.id === activeEventId) ?? HOT_EVENTS[0], [activeEventId])
  const compactMetrics = metrics.slice(0, 4)
  const leadEvents = HOT_EVENTS.slice(0, 3)
  const remainingEvents = HOT_EVENTS.slice(3)
  const queueBuckets = useMemo(
    () =>
      QUEUE_BUCKETS.map((bucket) => ({
        ...bucket,
        items: HOT_EVENTS.filter((event) => event.routeLane === bucket.lane),
      })),
    [],
  )
  const selectedBucket = useMemo(() => queueBuckets.find((bucket) => bucket.lane === activeEvent.routeLane), [activeEvent, queueBuckets])
  const prioritySummary = useMemo(
    () => leadEvents.map((event) => `${event.priority} · ${event.timestamp} · ${event.title}`).join(' / '),
    [leadEvents],
  )
  const activeEventIndex = HOT_EVENTS.findIndex((event) => event.id === activeEvent?.id)
  const activeFeedLabel = activeEventIndex <= 0 ? 'Primary headline' : activeEventIndex === 1 ? 'Secondary momentum' : activeEventIndex === 2 ? 'Third signal' : 'Extended queue'
  const linkedCommandLine = `${activeFeedLabel} · ${activeEvent.routeLane} · ${activeEvent.owner}`
  const activeSelectionHint = `已定位到 Feed #${activeEventIndex + 1} · ${activeFeedLabel}`
  const activeRouteAccent = ROUTE_ACCENTS[activeEvent.routeLane]
  const routeCohort = selectedBucket?.items.slice(0, 3) ?? []
  const briefTailMeta = `${activeEvent.checklist.length} 项执行确认 · ${activeEvent.sources.length} 个信源收束到同一结尾视图`
  const briefTailLead = activeEvent.sources.map((source) => source.name).slice(0, 2).join(' / ')
  const briefTailBridgeLabel = `${activeFeedLabel} · ${activeEvent.routeLane}`
  const briefSyncPulse = `Feed #${activeEventIndex + 1} 正在驱动右栏摘要节奏`
  const briefContinuityLabel = `Selected card continuity · ${activeEvent.routeLane}`
  const briefSurfaceCaption = `${activeEvent.owner} / ${activeEvent.deadline}`
  const activeNarrative = `${activeEvent.summary} ${activeEvent.whyItMatters}`
  const briefTailFlow = [
    {
      key: 'digest',
      eyebrow: '收束说明',
      title: 'Narrative ending',
      tone: 'text-slate-200',
      content: activeEvent.sourceDigest,
    },
    {
      key: 'business-window',
      eyebrow: 'Decision window',
      title: 'Closing pressure',
      tone: 'text-amber-50/90',
      content: activeEvent.businessWindow,
    },
  ]
  const briefTailSections = [
    { key: 'narrative', label: '叙事续接', sublabel: 'Narrative', count: 1 },
    { key: 'execution', label: '执行队列', sublabel: 'Execution queue', count: activeEvent.executionSlots.length },
    { key: 'closing-flow', label: '收束流', sublabel: 'Closing flow', count: briefTailFlow.length },
    { key: 'sources', label: '信源收束', sublabel: 'Sources', count: activeEvent.sources.length },
  ]
  const briefEndingChips = [
    `Route lane · ${activeEvent.routeLane}`,
    `Execution slots · ${activeEvent.executionSlots.length}`,
    `Decision window · live`,
  ]
  const briefTailExecutionLabel = `${activeEvent.executionSlots.length} 个 execution slots 正在承接这条 selected feed card`
  const briefTailSurfaceNote = `Brief ending now carries ${activeEvent.routeLane} 的执行队列、closing flow 与 sources`
  const briefLinkSummary = `Feed #${activeEventIndex + 1} · ${activeEvent.routeLane} · Owner ${activeEvent.owner}`
  const briefLinkAnchor = `Selected card → Command Brief · DDL ${activeEvent.deadline}`
  const stickyBriefCue = `Pinned to ${activeFeedLabel} · ${activeEvent.routeLane}`
  const briefConnectorTrail = [
    { key: 'feed', label: activeFeedLabel, value: `Feed #${activeEventIndex + 1}`, active: true },
    { key: 'route', label: 'Route lane', value: activeEvent.routeLane, active: true },
    { key: 'brief', label: 'Brief surface', value: 'Command brief', active: true },
  ]
  const briefConnectorRhythm = Array.from({ length: 4 }, (_, index) => {
    const connected = index <= Math.min(activeEventIndex, 3)

    return {
      id: `connector-${index}`,
      connected,
      label: index === activeEventIndex ? 'active' : `feed ${index + 1}`,
    }
  })
  const briefBoundaryMetrics = [
    { key: 'owner', label: 'Owner', value: activeEvent.owner, tone: 'text-cyan-50/92' },
    { key: 'deadline', label: 'DDL', value: activeEvent.deadline, tone: 'text-amber-50/92' },
    { key: 'route', label: 'Route lane', value: activeEvent.routeLane, tone: activeRouteAccent.text },
  ]
  const briefBoundaryCaption = `${activeFeedLabel} 的卡片信号在此收束进标题带下沿，并直接落到正文起始区。`
  const activeSelectionRail = {
    label: `${activeFeedLabel} · ${activeEvent.routeLane}`,
    owner: activeEvent.owner,
    deadline: activeEvent.deadline,
    summary: `${activeEvent.routeLane} 路由中的当前选中卡片，正在驱动右栏 Command Brief 的标题与动作区。`,
  }

  useEffect(() => {
    const activeCard = eventCardRefs.current[activeEventId]
    activeCard?.focus()
  }, [activeEventId])

  const handleEventKeyDown = (currentIndex: number) => (event: ReactKeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      commandPanelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      return
    }

    if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return

    event.preventDefault()

    const nextIndex =
      event.key === 'Home'
        ? 0
        : event.key === 'End'
          ? HOT_EVENTS.length - 1
          : event.key === 'ArrowDown'
            ? (currentIndex + 1) % HOT_EVENTS.length
            : (currentIndex - 1 + HOT_EVENTS.length) % HOT_EVENTS.length

    setActiveEventId(HOT_EVENTS[nextIndex]?.id ?? HOT_EVENTS[0]?.id ?? '')
  }

  return (
    <div className="min-h-full bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.09),transparent_24%),radial-gradient(circle_at_right_top,rgba(124,58,237,0.16),transparent_28%),linear-gradient(180deg,#09101c_0%,#070b13_100%)] px-2 py-2 md:px-3 lg:px-4">
      <div className="mx-auto flex max-w-[1840px] flex-col gap-2 pb-7">
        <section className="overflow-hidden rounded-[20px] border border-white/8 bg-[linear-gradient(135deg,rgba(16,23,38,0.99),rgba(10,15,27,0.99))] px-3 py-2 md:px-3.5">
          <div className="grid gap-2 xl:grid-cols-[minmax(0,1fr)_314px]">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-1.5">
                  <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.22em] text-cyan-200">
                    AI HOTBOARD
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                    Live Feed
                  </div>
                  <div className="rounded-full border border-fuchsia-400/20 bg-fuchsia-400/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-fuchsia-100">
                    Middle lane intensified
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {(['24h', '3d', '7d'] as TimeRange[]).map((item) => (
                    <RangeButton key={item} label={item} active={range === item} onClick={() => setRange(item)} />
                  ))}
                  <button type="button" className="rounded-full border border-white/8 bg-white/5 px-3 py-1.5 text-[11px] text-slate-300">
                    Auto refresh 3m
                  </button>
                </div>
              </div>

              <div className="rounded-[17px] border border-white/8 bg-[linear-gradient(180deg,rgba(14,21,36,0.92),rgba(10,14,24,0.98))] px-3 py-2">
                <div className="flex flex-col gap-2 xl:flex-row xl:items-start xl:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-slate-500">
                      <span>AI 热点作战台</span>
                      <span className="text-cyan-300">中栏主战场</span>
                      <span className="text-slate-600">/</span>
                      <span>首屏优先看事件</span>
                    </div>
                    <h1 className="mt-1 max-w-[22ch] text-[22px] font-semibold leading-[1.22] tracking-[-0.022em] text-white text-balance md:max-w-[28ch] md:text-[25px] xl:max-w-[24ch]">热点事件流优先，概览退到辅助层</h1>
                    <p className="mt-1 max-w-3xl text-[12px] leading-[1.55] text-slate-400">
                      顶部保持轻量 command strip + compact KPI，只保留筛选、节奏提示与队列摘要，让首屏扫描更快落到中栏 feed。
                    </p>
                  </div>

                  <div className="grid gap-1.5 sm:grid-cols-2 xl:w-[314px]">
                    <TinyStat label="Last Sync" value="22:57" tone="text-white" />
                    <TinyStat label="Queue Focus" value="Top 3 feed cards" tone="text-cyan-100" />
                    <TinyStat label="Lead Summary" value="P0 + 共振优先" tone="text-fuchsia-100" />
                    <TinyStat label="Execution" value="Owner / DDL visible" tone="text-emerald-300" />
                  </div>
                </div>

                <div className="mt-2 grid gap-2 xl:grid-cols-[minmax(0,1.5fr)_minmax(248px,0.78fr)]">
                  <div className="rounded-[16px] border border-white/8 bg-[#0c1422] px-3 py-2">
                    <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
                      <div className="flex flex-wrap gap-2">
                        {MODE_OPTIONS.map((option) => {
                          const active = option.key === mode
                          return (
                            <button
                              key={option.key}
                              type="button"
                              onClick={() => setMode(option.key)}
                              className={cn(
                                'rounded-[14px] border px-3 py-1.5 text-left transition-all',
                                active ? 'border-cyan-400/35 bg-cyan-400/10 text-white' : 'border-white/8 bg-[#0f1728] text-slate-300 hover:border-white/15',
                              )}
                            >
                              <div className="text-[11px] font-semibold">{option.label}</div>
                              <div className="mt-0.5 text-[10px] text-slate-500">{option.hint}</div>
                            </button>
                          )
                        })}
                      </div>
                      <button type="button" className="rounded-full border border-fuchsia-400/20 bg-fuchsia-400/8 px-3 py-1.5 text-[11px] text-fuchsia-100">
                        导出晨报摘要
                      </button>
                    </div>
                    <div className="mt-2 rounded-[13px] border border-cyan-400/12 bg-cyan-400/[0.06] px-3 py-1.5 text-[11px] leading-[1.55] text-slate-200">
                      <span className="mr-2 text-[10px] uppercase tracking-[0.18em] text-cyan-300">Priority lane</span>
                      {prioritySummary}
                    </div>
                  </div>

                  <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-1">
                    {FEED_SPOTLIGHTS.map((item, index) => (
                      <div key={item.id} className={cn('rounded-[15px] border px-3 py-2', index === 0 ? 'border-cyan-400/14 bg-cyan-400/[0.05]' : 'border-white/6 bg-white/[0.025]')}>
                        <div className="text-[10px] uppercase tracking-[0.18em] text-slate-500">{item.kicker}</div>
                        <div className="mt-0.5 text-[12px] leading-[1.55] text-slate-300">{item.detail}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[17px] border border-cyan-400/14 bg-[linear-gradient(180deg,rgba(12,20,34,0.94),rgba(8,13,24,0.98))] p-2 shadow-[0_0_0_1px_rgba(34,211,238,0.05),0_18px_40px_rgba(8,13,24,0.28)]">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.22em] text-cyan-300">Command brief</div>
                  <div className="mt-1 text-[13px] font-semibold leading-5 text-white">当前选中事件已与右侧指挥面板实时联动</div>
                  <div className="mt-1 text-[11px] text-slate-400">{linkedCommandLine}</div>
                </div>
                <StageBadge stage={activeEvent.stage} />
              </div>
              <div className="mt-2 rounded-[13px] border border-white/6 bg-white/[0.03] p-2">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.18em] text-slate-500">当前最高优先级</div>
                    <div className="mt-1 text-[11px] text-cyan-200">{activeSelectionHint}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => commandPanelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                    className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-cyan-100 transition hover:border-cyan-300/35 hover:bg-cyan-300/15"
                  >
                    跳转右侧 Brief
                  </button>
                </div>
                <div className="mt-1.5 line-clamp-2 text-[13px] font-medium leading-5 text-white">{activeEvent.title}</div>
                <div className="mt-1.5 flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-cyan-100/80">
                  <span className="h-px flex-1 bg-gradient-to-r from-cyan-300/80 via-cyan-300/30 to-transparent" />
                  <span className="rounded-full border border-cyan-300/18 bg-cyan-300/[0.09] px-2 py-1">{briefSyncPulse}</span>
                </div>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  <Tag label={activeEvent.priority} kind="action" />
                  <Tag label={`Owner ${activeEvent.owner}`} />
                  <Tag label={`DDL ${activeEvent.deadline}`} kind="biz" />
                </div>
                <div className="mt-2 rounded-[11px] border border-cyan-400/12 bg-cyan-400/[0.06] px-2 py-1.5 text-[11px] leading-[1.55] text-cyan-50/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
                  选中事件卡可用 <span className="font-semibold text-cyan-100">↑↓ / Home / End</span> 快速切换，按 <span className="font-semibold text-cyan-100">Enter</span> 可平滑跳转到右侧 brief。
                </div>
                <div className="mt-1.5 flex flex-wrap gap-1.5 text-[10px] uppercase tracking-[0.16em] text-slate-400">
                  <span className="rounded-full border border-cyan-300/18 bg-cyan-300/[0.12] px-2 py-1 text-cyan-100 shadow-[0_0_0_1px_rgba(34,211,238,0.08)]">Selected card</span>
                  <span className="text-cyan-200">→</span>
                  <span className="rounded-full border border-white/8 bg-white/[0.04] px-2 py-1 text-slate-200">Command brief synced</span>
                </div>
              </div>
              <div className="mt-2 grid grid-cols-2 gap-1.5">
                {EXECUTION_PULSE.map((item) => (
                  <TinyStat key={item.label} label={item.label} value={item.value} tone={item.tone} />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-2 md:grid-cols-4">
          {compactMetrics.map((metric) => (
            <MetricCard key={metric.label} {...metric} />
          ))}
        </section>

        <section className="grid gap-2 xl:grid-cols-[136px_minmax(0,2.08fr)_292px] 2xl:grid-cols-[148px_minmax(0,2.18fr)_308px]">
          <div className="space-y-1.5">
            <Panel title="控制台导航" right={<span className="text-[10px] text-slate-500">Channel Stack</span>}>
              <div className="space-y-2.5">
                {NAV_GROUPS.map((group) => (
                  <div key={group.title}>
                    <div className="mb-2 text-[10px] uppercase tracking-[0.18em] text-slate-500">{group.title}</div>
                    <div className="space-y-1.5">
                      {group.items.map((item) => (
                        <NavItem
                          key={item.label}
                          label={item.label}
                          count={item.count}
                          tone={item.tone}
                          active={item.label === activeNav}
                          onClick={() => setActiveNav(item.label)}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Panel>

            <Panel title="快速筛选" right={<span className="text-[10px] text-slate-500">Filter Stack</span>}>
              <div className="space-y-2">
                {FILTER_GROUPS.map((group) => (
                  <div key={group.title}>
                    <div className="mb-2 text-[10px] uppercase tracking-[0.18em] text-slate-500">{group.title}</div>
                    <div className="flex flex-wrap gap-1.5">
                      {group.items.map((item) => (
                        <Tag key={item} label={item} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Panel>

            <Panel title="系统观察" right={<span className="text-[10px] text-emerald-300">Signal OK</span>}>
              <div className="space-y-2 text-[12px] text-slate-300">
                <div className="rounded-[13px] border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-2">
                  <div className="text-[10px] uppercase tracking-[0.18em] text-emerald-300">AI 视频优先</div>
                  <div className="mt-1 leading-[1.55]">Seedance 2.0、UGC 自动化、批量出片 workflow 本轮优先级最高。</div>
                </div>
                <div className="rounded-[13px] border border-white/6 bg-white/[0.03] px-2.5 py-2 leading-[1.55]">
                  白名单重点：@servasyy_ai、@AlexFinn、Andrej Karpathy、@claudeai。
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <TinyStat label="Source Health" value="18 / 18 在线" tone="text-emerald-300" />
                  <TinyStat label="Noise Ratio" value="12%" tone="text-amber-100" />
                </div>
              </div>
            </Panel>
          </div>

          <div className="space-y-2">
            <Panel title="事件队列" right={<div className="text-[11px] text-slate-400">频道：{activeNav}</div>} className="overflow-hidden">
              <div className="space-y-2">
                  <div className="grid gap-2 text-[11px] text-slate-300 xl:grid-cols-[minmax(0,1.84fr)_208px]">
                  <div className="rounded-[15px] border border-white/8 bg-[#0c1422] px-3 py-2">
                    <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
                      <div className="flex flex-wrap gap-2">
                        {FLOW_SEGMENTS.map((segment, index) => (
                          <button
                            key={segment}
                            type="button"
                            className={cn(
                              'rounded-full border px-3 py-1 text-[11px]',
                              index === 0 ? 'border-cyan-400/30 bg-cyan-400/10 text-cyan-100' : 'border-white/8 bg-white/[0.03] text-slate-300',
                            )}
                          >
                            {segment}
                          </button>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {FLOW_CONTROLS.map((control) => (
                          <span key={control} className="rounded-full border border-white/8 bg-white/[0.03] px-3 py-1 text-[10px] text-slate-400">
                            {control}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="mt-2 grid gap-2 text-[11px] text-slate-300 sm:grid-cols-2 xl:grid-cols-4">
                      <TinyStat label="排序" value="Score ↓ / 最新" />
                      <TinyStat label="视图" value="主 feed / 时间线" />
                      <TinyStat label="首屏重点" value="Top 3 热点先看" tone="text-cyan-100" />
                      <TinyStat label="队列状态" value="4 条待升级" tone="text-amber-100" />
                    </div>
                  </div>

                  <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-1">
                    {queueBuckets.map((bucket) => {
                      const bucketActive = bucket.lane === activeEvent.routeLane

                      return (
                        <div key={bucket.lane} className={cn('rounded-[15px] border px-3 py-2 transition-all', bucket.tone, bucketActive && 'shadow-[0_0_0_1px_rgba(255,255,255,0.05)] ring-1 ring-inset ring-white/10')}>
                          <div className="flex items-center justify-between gap-2">
                            <div>
                              <div className="text-[10px] uppercase tracking-[0.18em] opacity-70">{bucket.title}</div>
                              <div className="mt-0.5 text-[12px] leading-[1.5]">{bucket.hint}</div>
                            </div>
                            <div className="text-right">
                              <div className="text-[20px] font-semibold leading-none">{bucket.items.length}</div>
                              <div className="mt-1 text-[10px] opacity-70">{bucket.lane}</div>
                            </div>
                          </div>
                          <div className="mt-1.5 flex items-center justify-between gap-2">
                            <div className="line-clamp-2 text-[11px] opacity-80">{bucket.items[0]?.title ?? '暂无事件'}</div>
                            {bucketActive ? <span className="rounded-full border border-white/14 bg-white/10 px-2 py-0.5 text-[10px] uppercase tracking-[0.16em]">Active</span> : null}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-3 px-1">
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.2em] text-cyan-300">Lead feed</div>
                      <div className="mt-0.5 max-w-[66ch] text-[12px] leading-[1.6] text-slate-400">首屏重点放大前 2~3 条高价值事件，先看标题、路由与下一步动作，再决定是否进入右侧详情。</div>
                    </div>
                    <div className="flex flex-wrap items-center justify-end gap-1.5 text-[10px] uppercase tracking-[0.18em] text-slate-500">
                      <span>Top 3 on stage</span>
                      <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-2 py-0.5 text-cyan-100">Selected card drives brief</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {leadEvents.map((event, index) => {
                      const isActive = event.id === activeEvent?.id

                      return (
                        <div key={event.id} className="space-y-1.5">
                          <div className="flex items-center gap-2 px-1">
                            <span
                              className={cn(
                                'inline-flex h-5 min-w-5 items-center justify-center rounded-full border px-1.5 text-[10px] font-semibold transition-colors',
                                isActive ? 'border-cyan-300/60 bg-cyan-300/18 text-cyan-50' : 'border-cyan-400/25 bg-cyan-400/10 text-cyan-100',
                              )}
                            >
                              0{index + 1}
                            </span>
                            <div className={cn('text-[10px] uppercase tracking-[0.18em]', isActive ? 'text-cyan-200' : 'text-slate-500')}>
                              {index === 0 ? 'Primary headline' : index === 1 ? 'Secondary momentum' : 'Third signal'}
                            </div>
                            {isActive ? <div className="ml-auto rounded-full border border-cyan-300/20 bg-cyan-300/10 px-2 py-0.5 text-[10px] uppercase tracking-[0.16em] text-cyan-100">Linked brief</div> : null}
                          </div>
                          <EventCard
                            event={event}
                            active={isActive}
                            selectionLabel={isActive ? `Brief #${activeEventIndex + 1}` : undefined}
                            onClick={() => setActiveEventId(event.id)}
                            onKeyDown={handleEventKeyDown(index)}
                            cardRef={(node) => {
                              eventCardRefs.current[event.id] = node
                            }}
                          />
                        </div>
                      )
                    })}
                  </div>
                </div>

                {remainingEvents.length > 0 ? (
                  <div className="space-y-2 border-t border-white/6 pt-2">
                    <div className="flex items-center justify-between gap-3 px-1">
                      <div>
                        <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Extended queue</div>
                        <div className="mt-1 text-[12px] text-slate-400">其余事件继续保持高密度列表，不抢占主 feed 首屏焦点。</div>
                      </div>
                      <div className="text-[10px] text-slate-500">{remainingEvents.length} 条</div>
                    </div>
                    <div className="space-y-2">
                      {remainingEvents.map((event, index) => {
                        const isActive = event.id === activeEvent?.id

                        return (
                          <div key={event.id} className={cn('rounded-[18px] p-0.5 transition-colors', isActive && 'bg-cyan-300/12')}>
                            <EventCard
                              event={event}
                              active={isActive}
                              selectionLabel={isActive ? `Brief #${activeEventIndex + 1}` : undefined}
                              onClick={() => setActiveEventId(event.id)}
                              onKeyDown={handleEventKeyDown(leadEvents.length + index)}
                              cardRef={(node) => {
                                eventCardRefs.current[event.id] = node
                              }}
                            />
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ) : null}
              </div>
            </Panel>
          </div>

          <div ref={commandPanelRef} className="space-y-2.5 pb-2 xl:sticky xl:top-2.5 xl:self-start xl:max-h-[calc(100vh-1.25rem)] xl:overflow-y-auto xl:pr-2 xl:pb-5">
            <div className={cn('hidden xl:flex items-center justify-between gap-2 rounded-[14px] border px-3 py-2 text-[10px] uppercase tracking-[0.18em] shadow-[0_0_0_1px_rgba(255,255,255,0.03)]', activeRouteAccent.panel, activeRouteAccent.text)}>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-current shadow-[0_0_10px_currentColor]" aria-hidden="true" />
                Sticky brief anchor
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.05] px-2 py-1 text-slate-100">{stickyBriefCue}</span>
            </div>
            <Panel
              title="Command Brief"
              right={activeEvent ? <StatusBadge status={activeEvent.status} /> : null}
              className={cn(
                activeRouteAccent.glow,
                'overflow-hidden border-white/10 bg-[linear-gradient(180deg,rgba(10,15,26,0.995),rgba(7,11,20,0.995))] transition-shadow duration-200',
              )}
            >
              {activeEvent ? (
                <div className="relative overflow-hidden rounded-[18px] border border-white/7 bg-[linear-gradient(180deg,rgba(10,16,28,0.98),rgba(7,11,20,0.995))] shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
                  <div className={cn('pointer-events-none absolute inset-x-0 top-0 h-[3px]', activeRouteAccent.panel, 'shadow-[0_0_18px_rgba(34,211,238,0.22)]')} />
                  <div className={cn('pointer-events-none absolute left-[19px] top-[62px] bottom-[28px] w-px bg-gradient-to-b from-white/35 via-white/12 to-transparent', activeRouteAccent.panel)} />

                  <div className="relative border-b border-white/6 bg-[linear-gradient(180deg,rgba(16,28,44,0.52),rgba(10,16,28,0.16))] px-3 py-3 md:px-3.5 md:py-3.5">
                    <div className="mb-2 flex flex-wrap items-center gap-1.5 pr-8">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-300/22 bg-[linear-gradient(90deg,rgba(34,211,238,0.16),rgba(34,211,238,0.05))] px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-cyan-100 shadow-[0_0_0_1px_rgba(34,211,238,0.05)]">
                        <span className="h-1.5 w-1.5 rounded-full bg-cyan-200 shadow-[0_0_10px_rgba(165,243,252,0.72)]" aria-hidden="true" />
                        Live-linked brief
                      </span>
                      <span className={cn('rounded-full border px-2.5 py-1 text-[10px] uppercase tracking-[0.16em]', activeRouteAccent.badge)}>{briefLinkSummary}</span>
                      <span className="rounded-full border border-white/8 bg-white/[0.04] px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-slate-200">{briefLinkAnchor}</span>
                    </div>
                    <div className={cn('pointer-events-none absolute inset-y-3 right-3 hidden w-1 rounded-full xl:block', activeRouteAccent.panel, 'shadow-[0_0_18px_rgba(34,211,238,0.18)]')} />
                    <div className={cn('pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-b to-transparent', activeRouteAccent.panel)} />
                    <div className={cn('pointer-events-none absolute -left-12 top-1/2 hidden h-px w-12 -translate-y-1/2 bg-gradient-to-r from-transparent xl:block', activeRouteAccent.beam)} />
                    <div className={cn('pointer-events-none absolute -left-3 top-1/2 hidden h-6 w-6 -translate-y-1/2 rounded-full border bg-[radial-gradient(circle,rgba(103,232,249,0.22),rgba(8,13,24,0.02)_66%,transparent_78%)] shadow-[0_0_24px_rgba(34,211,238,0.26)] xl:block', activeRouteAccent.dot)} />
                    <div className={cn('absolute left-4 top-4 h-2.5 w-2.5 rounded-full border shadow-[0_0_18px_rgba(34,211,238,0.45)]', activeRouteAccent.dot)} />
                    <div className="pointer-events-none absolute right-4 top-4 hidden items-center gap-1.5 md:flex">
                      {briefConnectorRhythm.map((item) => (
                        <div key={item.id} className="flex items-center gap-1.5">
                          <span
                            className={cn(
                              'h-1.5 rounded-full transition-all duration-200',
                              item.connected ? 'w-6 bg-cyan-200/88 shadow-[0_0_12px_rgba(34,211,238,0.34)]' : 'w-2 bg-white/12',
                            )}
                            aria-hidden="true"
                          />
                          {item.id !== briefConnectorRhythm[briefConnectorRhythm.length - 1]?.id ? (
                            <span
                              className={cn(
                                'h-[2px] w-5 rounded-full bg-gradient-to-r',
                                item.connected ? 'from-cyan-200/75 via-cyan-300/28 to-transparent' : 'from-white/10 to-transparent',
                              )}
                              aria-hidden="true"
                            />
                          ) : null}
                        </div>
                      ))}
                    </div>
                    <div className="pl-6">
                      <div className="flex flex-col gap-2 md:gap-2.5">
                        <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                          <div>
                            <div className={cn('text-[10px] uppercase tracking-[0.18em]', activeRouteAccent.text)}>Feed → Brief</div>
                            <div className="mt-1 max-w-[40ch] text-[12px] leading-[1.6] text-slate-300">右栏作为单一指挥摘要面，持续镜像中栏当前选中事件的标题、路由与动作。</div>
                          </div>
                          <div className={cn('rounded-full border px-2.5 py-1 text-[10px] uppercase tracking-[0.16em]', activeRouteAccent.badge)}>
                            Feed #{activeEventIndex + 1}
                          </div>
                        </div>
                        <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-2.5">
                          <span className={cn('line-clamp-2 min-w-0 flex-1 rounded-[12px] border px-2.5 py-1.5 text-[11px] shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_0_0_1px_rgba(34,211,238,0.04)]', activeRouteAccent.panel, activeRouteAccent.text)}>
                            <span className={cn('mr-2 text-[10px] uppercase tracking-[0.16em]', activeRouteAccent.text)}>selected feed card</span>
                            {activeEvent.title}
                          </span>
                          <div className={cn('flex items-center gap-2 text-[10px] uppercase tracking-[0.16em]', activeRouteAccent.text)}>
                            <span className={cn('h-[2px] w-8 rounded-full bg-gradient-to-r shadow-[0_0_14px_rgba(34,211,238,0.32)]', activeRouteAccent.beam)} />
                            <span className={cn('rounded-full border px-2.5 py-1 shadow-[0_0_18px_rgba(34,211,238,0.08)]', activeRouteAccent.badge)}>Brief title band</span>
                          </div>
                          <span className={cn('hidden rounded-full border px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] xl:inline-flex', activeRouteAccent.badge)}>
                            {activeEvent.routeLane} · Brief #{activeEventIndex + 1}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-1.5 text-[10px] uppercase tracking-[0.16em] text-slate-400">
                          {briefConnectorTrail.map((item, index) => (
                            <div key={item.key} className="flex items-center gap-1.5">
                              <span
                                className={cn(
                                  'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 transition-colors',
                                  item.active ? 'border-cyan-300/22 bg-cyan-300/[0.1] text-cyan-100 shadow-[0_0_0_1px_rgba(34,211,238,0.05)]' : 'border-white/8 bg-white/[0.03] text-slate-300',
                                )}
                              >
                                <span className="text-slate-500">{item.label}</span>
                                <span>{item.value}</span>
                              </span>
                              {index < briefConnectorTrail.length - 1 ? <span className="h-px w-4 bg-gradient-to-r from-cyan-300/35 to-transparent" aria-hidden="true" /> : null}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="relative border-b border-white/6 px-3 pt-2.5 pb-3 md:px-3.5 md:pt-3 md:pb-3.5">
                    <div className={cn('pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent')} />
                    <div className={cn('pointer-events-none absolute inset-x-4 top-0 h-[3px] rounded-b-full bg-gradient-to-r from-transparent to-transparent shadow-[0_0_16px_rgba(34,211,238,0.24)]', activeRouteAccent.beam)} />
                    <div className={cn('pointer-events-none absolute inset-x-6 top-[10px] h-10 rounded-[14px] bg-gradient-to-b to-transparent blur-md', activeRouteAccent.panel)} />
                    <div className={cn('pointer-events-none absolute left-6 top-0 h-4 w-px bg-gradient-to-b to-transparent shadow-[0_0_12px_rgba(34,211,238,0.24)]', activeRouteAccent.beam)} />
                    <div className={cn('pointer-events-none absolute right-6 top-0 h-4 w-px bg-gradient-to-b to-transparent shadow-[0_0_12px_rgba(34,211,238,0.18)]', activeRouteAccent.beam)} />
                    <div className={cn('relative rounded-[15px] border px-2.5 py-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)] md:px-3', activeRouteAccent.panel)}>
                      <div className="flex flex-col gap-2 lg:flex-row lg:items-start lg:justify-between">
                        <div className="min-w-0">
                          <div className={cn('text-[10px] uppercase tracking-[0.18em]', activeRouteAccent.text)}>Title-band boundary</div>
                          <div className="mt-1 text-[11px] leading-[1.65] text-slate-300">{briefBoundaryCaption}</div>
                        </div>
                        <div className={cn('rounded-full border px-2.5 py-1 text-[10px] uppercase tracking-[0.16em]', activeRouteAccent.badge)}>
                          Command brief body start
                        </div>
                      </div>
                      <div className={cn('mt-2 flex items-center gap-2 text-[10px] uppercase tracking-[0.16em]', activeRouteAccent.text)}>
                        <span className={cn('h-[2px] w-10 rounded-full bg-gradient-to-r shadow-[0_0_16px_rgba(34,211,238,0.3)]', activeRouteAccent.beam)} />
                        <span className={cn('h-[2px] flex-1 rounded-full bg-gradient-to-r', activeRouteAccent.beam)} />
                        <span className={cn('rounded-full border px-2.5 py-1 shadow-[0_0_18px_rgba(34,211,238,0.08)]', activeRouteAccent.badge)}>Selected card is the source of truth</span>
                      </div>
                      <div className="mt-2 grid gap-1.5 md:grid-cols-3">
                        {briefBoundaryMetrics.map((item) => (
                          <div key={item.key} className="rounded-[12px] border border-white/8 bg-white/[0.03] px-2.5 py-2 text-[10.5px] leading-[1.5] shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
                            <div className="text-[10px] uppercase tracking-[0.16em] text-slate-500">{item.label}</div>
                            <div className={cn('mt-1 line-clamp-2', item.tone)}>{item.value}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="relative border-b border-white/6 px-3 py-3">
                    <div className="absolute left-4 top-4 h-2 w-2 rounded-full border border-white/14 bg-white/10" />
                    <div className="pl-6">
                      <div className="flex items-center justify-between gap-2">
                        <div className="text-[10px] uppercase tracking-[0.18em] text-cyan-200">Selected feed card</div>
                        <span className={cn('rounded-full border px-2 py-0.5 text-[10px]', activeRouteAccent.badge)}>
                          {activeEvent.priority} · {activeEvent.score}
                        </span>
                      </div>
                      <div className="mt-1 flex items-center gap-2 text-[11px] text-slate-300">
                        <span className="h-px flex-1 bg-gradient-to-r from-cyan-300/80 via-cyan-300/45 to-transparent" />
                        <span>{activeEvent.routeLane} linked into this brief</span>
                      </div>
                      <div className="mt-1 rounded-[11px] border border-white/7 bg-white/[0.03] px-2.5 py-1.5 text-[10.5px] leading-[1.6] text-slate-300">
                        当前高亮卡片被直接“收束”到右栏摘要面，live demo 时更像同一份 brief 的展开态，而不是另一组卡片。
                      </div>
                      <div className={cn('mt-2 flex flex-wrap items-center gap-1.5 rounded-[12px] border px-2.5 py-2 text-[10px] uppercase tracking-[0.16em] shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]', activeRouteAccent.panel, activeRouteAccent.text)}>
                        <span className={cn('rounded-full border px-2 py-1', activeRouteAccent.badge)}>{activeEvent.routeLane}</span>
                        <span className="text-slate-300/90">mirrors</span>
                        <span className="rounded-full border border-white/8 bg-white/[0.04] px-2 py-1 text-slate-100">{activeEvent.status}</span>
                        <span className="rounded-full border border-white/8 bg-white/[0.04] px-2 py-1 text-slate-100">{activeEvent.owner}</span>
                      </div>
                      <div className="mt-2 rounded-[13px] border border-white/8 bg-[linear-gradient(90deg,rgba(255,255,255,0.035),rgba(255,255,255,0.015))] px-2.5 py-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
                        <div className="flex items-start gap-2.5">
                          <div className="flex flex-col items-center pt-0.5" aria-hidden="true">
                            <span
                              className="h-2.5 w-2.5 rounded-full border shadow-[0_0_16px_rgba(34,211,238,0.28)]"
                              style={{ backgroundColor: activeRouteAccent.signal, borderColor: activeRouteAccent.signal }}
                            />
                            <span className={cn('mt-1 h-10 w-px bg-gradient-to-b', activeRouteAccent.beam)} />
                            <span className={cn('mt-1 h-2.5 w-2.5 rounded-full border', activeRouteAccent.dot)} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-1.5 text-[10px] uppercase tracking-[0.16em] text-slate-400">
                              <span className={cn('rounded-full border px-2 py-1', activeRouteAccent.badge)}>{activeSelectionRail.label}</span>
                              <span className="rounded-full border border-white/8 bg-white/[0.03] px-2 py-1 text-slate-300">Owner {activeSelectionRail.owner}</span>
                              <span className="rounded-full border border-white/8 bg-white/[0.03] px-2 py-1 text-slate-300">DDL {activeSelectionRail.deadline}</span>
                            </div>
                            <div className="mt-2 text-[11px] leading-[1.65] text-slate-200">{activeSelectionRail.summary}</div>
                            <div className="mt-2 flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-slate-400">
                              <span className={cn('h-[2px] w-8 rounded-full bg-gradient-to-r shadow-[0_0_14px_rgba(34,211,238,0.2)]', activeRouteAccent.beam)} />
                              <span className={activeRouteAccent.text}>Selection rail locked</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 rounded-[12px] border border-cyan-300/10 bg-cyan-300/[0.05] px-2.5 py-2 text-[11px] leading-[1.65] text-slate-200">
                        <span className="text-cyan-100">Narrative carry-over：</span>
                        <span className="line-clamp-2">{activeNarrative}</span>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        <Tag label={`Feed #${activeEventIndex + 1}`} />
                        <Tag label={activeFeedLabel} kind="team" />
                        <Tag label="Brief synced" kind="action" />
                      </div>
                    </div>
                  </div>

                  <div className="relative border-b border-white/6 px-3 py-3.5">
                    <div className="absolute left-4 top-4 h-2 w-2 rounded-full border border-white/14 bg-white/10" />
                    <div className="pl-6">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="text-[10px] uppercase tracking-[0.18em] text-slate-500">Brief headline</div>
                          <h2 className="mt-1 max-w-[24ch] text-[19px] font-semibold leading-[1.38] tracking-[-0.022em] text-white text-balance 2xl:max-w-[26ch]">{activeEvent.title}</h2>
                          <div className="mt-1 flex flex-wrap items-center gap-1.5 text-[11px] text-slate-400">
                            <span>
                              {activeEvent.timestamp} · {activeEvent.source} · 另有 {activeEvent.sourceCount} 个源报道
                            </span>
                            <RouteBadge lane={activeEvent.routeLane} />
                          </div>
                        </div>
                        <div className="rounded-[13px] border border-white/6 bg-white/[0.03] px-2.5 py-2 text-right">
                          <div className="text-[10px] uppercase tracking-[0.16em] text-slate-500">Selection state</div>
                          <div className={cn('mt-1 text-[12px] font-medium', activeRouteAccent.text)}>{activeSelectionHint}</div>
                        </div>
                      </div>

                      <div className="mt-2 grid gap-2 xl:grid-cols-[minmax(0,1.1fr)_132px]">
                        <div className="rounded-[13px] border border-cyan-400/14 bg-cyan-400/[0.05] px-2.5 py-2">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[10px] uppercase tracking-[0.16em] text-cyan-300">Next action mirror</span>
                            <span className="text-[10px] text-cyan-100/70">来自中栏卡片</span>
                          </div>
                          <div className="mt-1.5 text-[12px] leading-[1.65] text-cyan-50/90">{activeEvent.nextStep}</div>
                        </div>
                        <div className={cn('rounded-[13px] border px-2.5 py-2', activeRouteAccent.panel)}>
                          <div className="text-[10px] uppercase tracking-[0.16em] text-slate-500">Route cohort</div>
                          <div className={cn('mt-1 text-[20px] font-semibold leading-none', activeRouteAccent.text)}>{selectedBucket?.items.length ?? 0}</div>
                          <div className="mt-1 text-[11px] leading-[1.5] text-slate-400">同路由事件正在共享右侧决策上下文</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="px-3.5 py-3.5">
                    <div className="grid gap-3">
                      <div className="rounded-[16px] border border-cyan-400/16 bg-[linear-gradient(180deg,rgba(10,22,36,0.92),rgba(8,16,28,0.95))] p-3">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="text-[10px] uppercase tracking-[0.18em] text-cyan-300">Primary CTA</div>
                            <div className="mt-1 line-clamp-2 text-[13px] font-medium leading-[1.6] text-white">{activeEvent.nextStep}</div>
                          </div>
                          <div className="flex flex-col items-end gap-1.5">
                            <span className="rounded-full border border-rose-400/20 bg-rose-400/10 px-2 py-1 text-[10px] font-semibold text-rose-100">{activeEvent.priority}</span>
                            <StageBadge stage={activeEvent.stage} />
                          </div>
                        </div>

                        <div className="mt-3 grid gap-2 xl:grid-cols-[minmax(0,1.08fr)_minmax(124px,0.92fr)]">
                          <div className="rounded-[13px] border border-white/8 bg-white/[0.05] px-2.5 py-2.5">
                            <div className="text-[10px] uppercase tracking-[0.16em] text-slate-500">Owner</div>
                            <div className="mt-1 text-[13px] font-medium text-white">{activeEvent.owner}</div>
                            <div className="mt-1 text-[11px] text-slate-400">{activeEvent.team}</div>
                          </div>
                          <div className="rounded-[13px] border border-amber-400/18 bg-amber-400/8 px-2.5 py-2.5">
                            <div className="text-[10px] uppercase tracking-[0.16em] text-amber-200">Deadline</div>
                            <div className="mt-1 text-[13px] font-medium text-amber-50">{activeEvent.deadline}</div>
                            <div className="mt-1 text-[11px] text-amber-100/70">当前窗口需确认动作</div>
                          </div>
                        </div>

                        <div className="mt-2 grid gap-2 xl:grid-cols-[minmax(0,1.16fr)_minmax(118px,0.84fr)]">
                          <div className="rounded-[13px] border border-rose-400/18 bg-rose-400/8 px-2.5 py-2.5">
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <div className="text-[10px] uppercase tracking-[0.16em] text-rose-200">Risk focus</div>
                                <p className="mt-1 line-clamp-2 text-[12px] leading-[1.6] text-rose-50/90">{activeEvent.riskAlert}</p>
                              </div>
                              <div className="text-right">
                                <div className="text-[10px] uppercase tracking-[0.16em] text-slate-500">Confidence</div>
                                <div className="mt-1 text-[18px] font-semibold text-white">{activeEvent.confidence}%</div>
                              </div>
                            </div>
                          </div>
                          <div className="rounded-[13px] border border-white/8 bg-white/[0.04] px-2.5 py-2.5">
                            <div className="text-[10px] uppercase tracking-[0.16em] text-slate-500">Recommended action</div>
                            <div className="mt-1 line-clamp-3 text-[12px] leading-[1.6] text-slate-200">{activeEvent.actions[0]}</div>
                            <div className="mt-1 text-[10px] uppercase tracking-[0.16em] text-slate-500">{linkedCommandLine}</div>
                          </div>
                        </div>

                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {activeEvent.actions.map((action) => (
                            <Tag key={action} label={action} kind="action" />
                          ))}
                        </div>

                        <div className="mt-3 grid grid-cols-2 gap-2">
                          <button type="button" className="rounded-[14px] border border-cyan-300/20 bg-cyan-300/12 px-3 py-2 text-[12px] font-medium text-cyan-50">
                            推送给责任人
                          </button>
                          <button type="button" className="rounded-[14px] border border-white/8 bg-white/[0.05] px-3 py-2 text-[12px] font-medium text-slate-200">
                            加入晨报摘要
                          </button>
                        </div>
                      </div>

                      <div className="rounded-[18px] border border-white/7 bg-[linear-gradient(180deg,rgba(255,255,255,0.032),rgba(255,255,255,0.018))] px-3 py-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.025)]">
                        <div className="grid gap-3">
                          <div className="grid gap-2 md:grid-cols-3 xl:grid-cols-1 2xl:grid-cols-3">
                            <div className={cn('rounded-[14px] border px-2.5 py-2.5', selectedBucket?.tone ?? 'border-white/7 bg-white/[0.035] text-slate-100')}>
                              <div className="flex items-start justify-between gap-3">
                                <div>
                                  <div className="text-[10px] uppercase tracking-[0.18em] opacity-70">Routing lane</div>
                                  <div className="mt-1 text-[14px] font-semibold">{activeEvent.routeLane}</div>
                                  <div className="mt-1 text-[12px] leading-[1.55] opacity-80">{selectedBucket?.hint}</div>
                                </div>
                                <div className="rounded-full border border-white/10 bg-white/10 px-2 py-1 text-[10px]">{selectedBucket?.items.length ?? 0} 条同路由</div>
                              </div>
                              {routeCohort.length > 1 ? (
                                <div className="mt-2 space-y-1.5 border-t border-white/7 pt-2">
                                  {routeCohort.map((event) => {
                                    const mirrored = event.id === activeEvent.id

                                    return (
                                      <div
                                        key={event.id}
                                        className={cn(
                                          'flex items-center justify-between gap-2 rounded-[11px] border px-2 py-1.5 text-[11px]',
                                          mirrored ? 'border-white/14 bg-white/10 text-white' : 'border-white/6 bg-white/[0.03] text-white/75',
                                        )}
                                      >
                                        <div className="min-w-0">
                                          <div className="truncate">{event.title}</div>
                                          <div className="mt-0.5 text-[10px] opacity-70">{event.owner}</div>
                                        </div>
                                        {mirrored ? <span className="text-[10px] uppercase tracking-[0.16em]">当前</span> : null}
                                      </div>
                                    )
                                  })}
                                </div>
                              ) : null}
                            </div>

                            <div className="rounded-[14px] border border-emerald-400/12 bg-emerald-400/[0.06] px-2.5 py-2.5">
                              <div className="text-[10px] uppercase tracking-[0.18em] text-emerald-300">Business outcome</div>
                              <div className="mt-1 line-clamp-3 text-[12px] leading-[1.55] text-emerald-50/90">{activeEvent.businessOutcome}</div>
                            </div>

                            <div className="rounded-[14px] border border-amber-400/12 bg-amber-400/[0.06] px-2.5 py-2.5">
                              <div className="text-[10px] uppercase tracking-[0.18em] text-amber-200">Decision window</div>
                              <div className="mt-1 line-clamp-3 text-[12px] leading-[1.55] text-amber-50/90">{activeEvent.businessWindow}</div>
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-2">
                            <TinyStat label="总分" value={`${activeEvent.score}`} tone="text-white" />
                            <TinyStat label="可信度" value={`${activeEvent.confidence}%`} tone="text-cyan-100" />
                            <TinyStat label="适配品牌" value={`${activeEvent.recommendedBrands.length} 个`} tone="text-fuchsia-100" />
                          </div>

                          <div className="grid gap-2 border-t border-white/6 pt-3">
                            <BriefSection title="事件摘要" className="border-white/[0.03] bg-white/[0.02]">
                              <p className="text-[12px] leading-[1.72] text-slate-300">{activeEvent.summary}</p>
                            </BriefSection>
                            <BriefSection title="Source digest" className="border-white/[0.03] bg-white/[0.02]">
                              <p className="text-[12px] leading-[1.68] text-slate-300">{activeEvent.sourceDigest}</p>
                            </BriefSection>
                            <BriefSection title="为什么重要" className="border-cyan-400/8 bg-cyan-400/[0.035]">
                              <p className="text-[12px] leading-[1.7] text-cyan-100/90">{activeEvent.whyItMatters}</p>
                            </BriefSection>
                            <BriefSection title="业务影响" className="border-white/[0.03] bg-white/[0.02]">
                              <p className="text-[12px] leading-[1.68] text-slate-300">{activeEvent.impact}</p>
                            </BriefSection>
                          </div>

                          <div className="grid gap-3 border-t border-white/6 pt-3 xl:grid-cols-[minmax(0,1.04fr)_minmax(140px,0.96fr)]">
                            <div className="rounded-[14px] border border-white/5 bg-white/[0.02] px-2.5 py-3">
                              <div className="flex items-center justify-between gap-3">
                                <div className="text-[10px] uppercase tracking-[0.18em] text-slate-500">执行排期</div>
                                <div className="text-[10px] text-slate-500">Execution slots</div>
                              </div>
                              <div className="mt-2 space-y-1.5">
                                {activeEvent.executionSlots.map((slot) => (
                                  <div key={`${slot.label}-${slot.eta}`} className="flex items-center justify-between gap-3 rounded-[12px] border border-white/5 bg-[#0c1422]/78 px-2.5 py-2">
                                    <div className="min-w-0">
                                      <div className="text-[12px] font-medium text-white">{slot.label}</div>
                                      <div className="mt-1 text-[11px] text-slate-400">{slot.owner} · ETA {slot.eta}</div>
                                    </div>
                                    <ExecutionStatusBadge status={slot.status} />
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="rounded-[14px] border border-white/5 bg-white/[0.02] px-2.5 py-3">
                              <div className="text-[10px] uppercase tracking-[0.18em] text-slate-500">评分拆解</div>
                              <div className="mt-2 space-y-2">
                                {Object.entries(activeEvent.scoreBreakdown).map(([label, value]) => (
                                  <div key={label}>
                                    <div className="mb-1 flex items-center justify-between text-[11px] text-slate-300">
                                      <span>{label}</span>
                                      <span>{value}/10</span>
                                    </div>
                                    <div className="h-2 overflow-hidden rounded-full bg-white/6">
                                      <div className="h-full rounded-full bg-[linear-gradient(90deg,#22d3ee,#7c3aed)]" style={{ width: `${value * 10}%` }} />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="grid gap-2.5 border-t border-white/6 pt-3">
                            <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
                              <div className="rounded-[14px] border border-white/5 bg-white/[0.018] px-3 py-2.5">
                                <div className="text-[10px] uppercase tracking-[0.18em] text-slate-500">适用团队</div>
                                <div className="mt-2 flex flex-wrap gap-2">
                                  {activeEvent.applicableTeams.map((item) => (
                                    <Tag key={item} label={item} kind="team" />
                                  ))}
                                </div>
                              </div>
                              <div className="rounded-[14px] border border-white/5 bg-white/[0.018] px-3 py-2.5">
                                <div className="text-[10px] uppercase tracking-[0.18em] text-slate-500">适用渠道</div>
                                <div className="mt-2 flex flex-wrap gap-2">
                                  {activeEvent.recommendedChannels.map((item) => (
                                    <Tag key={item} label={item} />
                                  ))}
                                </div>
                              </div>
                            </div>

                            <div className="rounded-[16px] border border-white/6 bg-[linear-gradient(180deg,rgba(255,255,255,0.026),rgba(255,255,255,0.016))] px-3 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
                              <div className="grid gap-3">
                                <div className="rounded-[14px] border border-white/5 bg-white/[0.018] px-3 py-2.5">
                                  <div className="text-[10px] uppercase tracking-[0.18em] text-slate-500">适配品牌</div>
                                  <div className="mt-2 flex flex-wrap gap-2">
                                    {activeEvent.recommendedBrands.map((item) => (
                                      <Tag key={item} label={item} kind="biz" />
                                    ))}
                                  </div>
                                </div>

                                <div className="overflow-hidden rounded-[15px] border border-white/[0.075] bg-[linear-gradient(180deg,rgba(10,16,28,0.9),rgba(10,16,28,0.8))] shadow-[inset_0_1px_0_rgba(255,255,255,0.02),0_18px_36px_rgba(8,13,24,0.18)]">
                                  <div className="border-b border-white/[0.05] bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.014))] px-3 py-2.5">
                                    <div className="flex items-center justify-between gap-3">
                                      <div>
                                        <div className="text-[10px] uppercase tracking-[0.18em] text-slate-500">Brief ending</div>
                                        <div className="mt-1 text-[12px] leading-[1.6] text-slate-300">把执行清单、收束说明与信源列表折成同一段结尾表面，弱化右下角堆叠感。</div>
                                      </div>
                                      <div className="rounded-full border border-cyan-300/14 bg-cyan-300/[0.06] px-2.5 py-1 text-[10px] text-cyan-100/90">{briefTailMeta}</div>
                                    </div>
                                    <div className="mt-2 flex flex-wrap items-center gap-1.5">
                                      {briefTailSections.map((section) => (
                                        <span
                                          key={section.key}
                                          className="inline-flex items-center gap-1.5 rounded-full border border-white/8 bg-white/[0.03] px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-slate-300"
                                        >
                                          <span>{section.label}</span>
                                          <span className="text-slate-500">{section.sublabel}</span>
                                          <span className="rounded-full bg-white/[0.06] px-1.5 py-0.5 text-[9px] text-slate-200">{section.count}</span>
                                        </span>
                                      ))}
                                      {briefEndingChips.map((chip) => (
                                        <span
                                          key={chip}
                                          className="inline-flex items-center rounded-full border border-cyan-300/12 bg-cyan-300/[0.05] px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-cyan-100/88"
                                        >
                                          {chip}
                                        </span>
                                      ))}
                                    </div>
                                  </div>

                                  <div className="relative bg-[linear-gradient(180deg,rgba(255,255,255,0.022),rgba(255,255,255,0.03))] px-3 py-3.5 before:pointer-events-none before:absolute before:inset-x-4 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-cyan-300/16 before:to-transparent after:pointer-events-none after:absolute after:inset-x-6 after:bottom-0 after:h-20 after:bg-[radial-gradient(circle_at_bottom,rgba(34,211,238,0.08),transparent_72%)]">
                                    <div className="pointer-events-none absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/16 to-transparent" />
                                    <div className="pointer-events-none absolute inset-x-5 bottom-0 h-16 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.07),transparent_72%)]" />
                                    <div className="pointer-events-none absolute inset-y-4 left-[17px] w-px bg-gradient-to-b from-cyan-300/28 via-cyan-300/10 to-transparent" />
                                    <div className="pointer-events-none absolute left-[13px] top-[18px] h-2.5 w-2.5 rounded-full border border-cyan-300/34 bg-cyan-300/75 shadow-[0_0_16px_rgba(34,211,238,0.28)]" />
                                    <div className="pointer-events-none absolute right-4 top-4 hidden items-center gap-2 xl:flex">
                                      <span className="h-[2px] w-12 rounded-full bg-gradient-to-r from-cyan-200/80 via-cyan-300/30 to-transparent shadow-[0_0_16px_rgba(34,211,238,0.18)]" />
                                      <span className="rounded-full border border-cyan-300/16 bg-cyan-300/[0.08] px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-cyan-100/88">
                                        {briefContinuityLabel}
                                      </span>
                                    </div>
                                    <div className="relative overflow-hidden rounded-[20px] border border-white/[0.05] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.022))] px-3 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.022),0_18px_40px_rgba(8,13,24,0.14)]">
                                      <div className="pointer-events-none absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-white/14 to-transparent" />
                                      <div className="pointer-events-none absolute inset-x-6 bottom-0 h-16 bg-[radial-gradient(circle_at_bottom,rgba(255,255,255,0.045),transparent_75%)]" />
                                      <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] uppercase tracking-[0.16em] text-slate-500">
                                        <span className="rounded-full border border-cyan-300/16 bg-cyan-300/[0.07] px-2.5 py-1 text-cyan-100/88">{briefTailBridgeLabel}</span>
                                        <span className="text-cyan-100/70">Feed ending mirrored into one continuous brief surface</span>
                                      </div>

                                      <div className="mt-2.5 flex flex-wrap items-center gap-1.5 text-[10px] uppercase tracking-[0.16em] text-slate-400">
                                        <span className="rounded-full border border-cyan-300/18 bg-cyan-300/[0.1] px-2.5 py-1 text-cyan-100 shadow-[0_0_0_1px_rgba(34,211,238,0.05)]">Selected card tail</span>
                                        <span className="h-px w-6 bg-gradient-to-r from-cyan-200/80 to-transparent" aria-hidden="true" />
                                        <span className="rounded-full border border-white/8 bg-white/[0.035] px-2.5 py-1 text-slate-200">Right brief ending</span>
                                        <span className="rounded-full border border-white/8 bg-white/[0.03] px-2.5 py-1 text-slate-300">{briefSurfaceCaption}</span>
                                      </div>

                                      <div className="mt-2.5 rounded-[15px] border border-cyan-300/12 bg-[linear-gradient(180deg,rgba(34,211,238,0.065),rgba(34,211,238,0.028))] px-3 py-2.5 text-[11px] leading-[1.65] text-slate-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
                                        <div className="flex flex-wrap items-center justify-between gap-2">
                                          <span className="text-cyan-100">Narrative carry-over</span>
                                          <span className="text-[10px] uppercase tracking-[0.16em] text-cyan-100/68">from selected card</span>
                                        </div>
                                        <div className="mt-1.5">{activeNarrative}</div>
                                      </div>

                                      <div className="mt-2 rounded-[14px] border border-white/[0.04] bg-white/[0.018] px-3 py-2.5 text-[11px] leading-[1.65] text-slate-200">
                                        <div className="flex flex-wrap items-center justify-between gap-2">
                                          <div className="text-[10px] uppercase tracking-[0.18em] text-slate-500">Execution queue</div>
                                          <div className="text-[10px] uppercase tracking-[0.16em] text-cyan-100/72">{briefTailExecutionLabel}</div>
                                        </div>
                                        <div className="mt-2 space-y-1.5 border-l border-white/[0.045] pl-3">
                                          {activeEvent.executionSlots.map((slot, index) => (
                                            <div
                                              key={`${slot.label}-${slot.eta}-ending`}
                                              className="flex items-center justify-between gap-3 rounded-[12px] border border-white/[0.025] bg-white/[0.024] px-3 py-2 text-[11.5px] transition-colors hover:bg-white/[0.034]"
                                            >
                                              <div className="min-w-0">
                                                <div className="flex items-center gap-2 text-slate-100">
                                                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-cyan-300/18 bg-cyan-300/[0.08] text-[10px] text-cyan-100">
                                                    {index + 1}
                                                  </span>
                                                  <span className="truncate">{slot.label}</span>
                                                </div>
                                                <div className="mt-1 text-[10.5px] text-slate-400">{slot.owner} · ETA {slot.eta}</div>
                                              </div>
                                              <ExecutionStatusBadge status={slot.status} />
                                            </div>
                                          ))}
                                        </div>
                                      </div>

                                      <div className="mt-2 grid gap-0 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] xl:items-start">
                                        <div className="space-y-2 rounded-[14px] border border-white/[0.03] bg-white/[0.012] px-2.5 py-2.5 xl:rounded-r-none xl:border-r-0 xl:pr-3">
                                          <div className="flex items-center justify-between gap-3 text-[10px] uppercase tracking-[0.18em] text-slate-500">
                                            <div>Closing flow</div>
                                            <div>Surface carry-over</div>
                                          </div>
                                          <div className="space-y-2 border-l border-white/[0.045] pl-3 pr-1 xl:border-r xl:border-r-white/[0.045] xl:pr-3">
                                            {briefTailFlow.map((item, index) => (
                                              <div key={item.key} className="relative pl-4">
                                                <span
                                                  className={cn(
                                                    'pointer-events-none absolute left-0 top-[0.42rem] h-2 w-2 rounded-full border',
                                                    index === 0 ? 'border-cyan-300/35 bg-cyan-300/50' : 'border-amber-300/35 bg-amber-300/45',
                                                  )}
                                                  aria-hidden="true"
                                                />
                                                {index < briefTailFlow.length - 1 ? (
                                                  <span
                                                    className="pointer-events-none absolute left-[3px] top-[0.95rem] h-[calc(100%-0.45rem)] w-px bg-gradient-to-b from-white/14 to-transparent"
                                                    aria-hidden="true"
                                                  />
                                                ) : null}
                                                <div className={cn('rounded-[12px] border border-white/[0.02] bg-white/[0.024] px-3 py-2.5 text-[11.5px] leading-[1.65] transition-colors hover:bg-white/[0.034]', item.tone)}>
                                                  <div className="flex items-center justify-between gap-2">
                                                    <span className="text-[10px] uppercase tracking-[0.16em] text-slate-500">{item.eyebrow}</span>
                                                    <span className="text-[10px] uppercase tracking-[0.16em] text-slate-400">{item.title}</span>
                                                  </div>
                                                  <div className="mt-1.5">{item.content}</div>
                                                </div>
                                              </div>
                                            ))}
                                          </div>
                                        </div>

                                        <div className="space-y-2 rounded-[14px] border border-white/[0.03] bg-white/[0.012] px-2.5 py-2.5 xl:-ml-px xl:rounded-l-none xl:border-l-white/[0.05] xl:pl-4">
                                          <div className="rounded-[12px] border border-white/[0.025] bg-white/[0.024] px-3 py-2.5 text-[11px] leading-[1.65] text-slate-200">
                                            <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] uppercase tracking-[0.18em] text-slate-500">
                                              <div>Surface note</div>
                                              <div>Brief ending</div>
                                            </div>
                                            <div className="mt-1.5">{briefTailSurfaceNote}</div>
                                          </div>
                                          <div className="space-y-2 pt-0.5">
                                            <div className="flex items-center justify-between gap-3 text-[10px] uppercase tracking-[0.18em] text-slate-500">
                                              <div>信源收束</div>
                                              <div>Sources</div>
                                            </div>
                                            <div className="flex flex-wrap gap-1.5">
                                              <Tag label={`主源 ${briefTailLead || activeEvent.source}`} kind="action" />
                                              <Tag label={`${activeEvent.sourceCount} 个外部提及`} />
                                            </div>
                                            <div className="space-y-1.5 border-l border-white/[0.045] pl-3">
                                              {activeEvent.sources.map((source) => (
                                                <div
                                                  key={`${source.name}-${source.type}`}
                                                  className="flex items-center justify-between rounded-[12px] border border-white/[0.02] bg-white/[0.024] px-3 py-2 text-[12px] transition-colors hover:bg-white/[0.034]"
                                                >
                                                  <span className="pr-2 text-slate-200">{source.name}</span>
                                                  <span className="shrink-0 text-[11px] text-slate-400">{source.type}</span>
                                                </div>
                                              ))}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </Panel>

            <Panel title="AI 视频雷达" right={<span className="text-[10px] text-fuchsia-200">Hot lane</span>}>
              <div className="space-y-3 text-[13px] text-slate-300">
                <div className="rounded-[16px] border border-fuchsia-400/18 bg-fuchsia-400/10 px-3 py-3">
                  <div className="text-[10px] uppercase tracking-[0.18em] text-fuchsia-200">新工具</div>
                  <div className="mt-2 leading-6">Seedance 2.0、角色一致性链路、自动分镜与批量素材产线。</div>
                </div>
                <div className="rounded-[16px] border border-white/6 bg-white/[0.03] px-3 py-3">
                  <div className="text-[10px] uppercase tracking-[0.18em] text-slate-400">本轮建议</div>
                  <ul className="mt-2 space-y-2 text-[12px] leading-6 text-slate-300">
                    <li>• 把可复用 workflow 沉淀成脚本模板</li>
                    <li>• 跟踪 builder 圈真实出片案例，不只看工具新闻</li>
                    <li>• 直接评价是否适合 Monster Code / GIRF 内容链</li>
                  </ul>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <TinyStat label="Demo Slots" value="03" tone="text-cyan-100" />
                  <TinyStat label="可投放素材" value="02" tone="text-emerald-200" />
                </div>
              </div>
            </Panel>
          </div>
        </section>
      </div>
    </div>
  )
}
