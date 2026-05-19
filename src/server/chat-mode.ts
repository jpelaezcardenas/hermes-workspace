import { getChatMode } from './gateway-capabilities'

export type { ChatMode } from './gateway-capabilities'

export type ChatBackend = 'agentone-enhanced' | 'openai-compat' | 'none'

export function resolveChatBackend(): ChatBackend {
  const mode = getChatMode()
  if (mode === 'enhanced-agent') return 'agentone-enhanced'
  if (mode === 'portable') return 'openai-compat'
  return 'none'
}
