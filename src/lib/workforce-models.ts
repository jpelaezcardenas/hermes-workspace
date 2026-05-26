export type WorkforceModelRole =
  | 'fast'
  | 'pro'
  | 'think'
  | 'coder'
  | 'admin'
  | 'creator'
  | 'copywriter'
  | 'trader'

export type WorkforceModelDefinition = {
  role: WorkforceModelRole
  envSuffix: string
  model: string
  description: string
}

export const WORKFORCE_MODEL_CATALOG: Array<WorkforceModelDefinition> = [
  {
    role: 'fast',
    envSuffix: 'FAST',
    model: '99pages/fast',
    description: 'Fast:DeepSeek-V4-Flash,quick-general-work',
  },
  {
    role: 'pro',
    envSuffix: 'PRO',
    model: '99pages/pro',
    description: 'Pro:MiniMax-M2.5,long-coding-and-complex-orchestration',
  },
  {
    role: 'think',
    envSuffix: 'THINK',
    model: '99pages/think',
    description:
      'Think:Gemini-3.1-Flash-Lite,reasoning-and-fallback-thinking',
  },
  {
    role: 'coder',
    envSuffix: 'CODER',
    model: '99pages/coder',
    description: 'Coder:Llama-4-Maverick,frequent-long-coding-work',
  },
  {
    role: 'admin',
    envSuffix: 'ADMIN',
    model: '99pages/admin',
    description:
      'Admin:DeepSeek-V3.1-Terminus,finance-legal-administration',
  },
  {
    role: 'creator',
    envSuffix: 'CREATOR',
    model: '99pages/creator',
    description: 'Creator:Xiaomi-MiMo-V2.5-Pro,creative-planning',
  },
  {
    role: 'copywriter',
    envSuffix: 'COPYWRITER',
    model: '99pages/copywriter',
    description: 'Copywriter:Kimi-K2.6,copywriting',
  },
  {
    role: 'trader',
    envSuffix: 'TRADER',
    model: '99pages/trader',
    description:
      'Trader:Qwen-3.5-397B-A17B,quant-trading-investment-forecasting',
  },
]

export const WORKFORCE_MODEL_IDS = WORKFORCE_MODEL_CATALOG.map(
  (entry) => entry.model,
)

export function buildWorkforceEnvCatalogLines(): Array<string> {
  return [
    '# 99Pages AI Workforce model catalog for Agentic OS routing',
    `P99_WORKFORCE_MODELS=${WORKFORCE_MODEL_IDS.join(',')}`,
    ...WORKFORCE_MODEL_CATALOG.flatMap((entry) => [
      `P99_WORKFORCE_MODEL_${entry.envSuffix}=${entry.model}`,
      `P99_WORKFORCE_ROUTE_${entry.envSuffix}=${entry.model}`,
      `P99_WORKFORCE_ROLE_${entry.envSuffix}=${entry.description}`,
    ]),
  ]
}
