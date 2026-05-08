import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { MessageTimestamp } from '@/screens/chat/components/message-timestamp'
import { MessageContent } from '@/components/prompt-kit/message'
import { cn } from '@/lib/utils'

export type AgentChatMessage = {
  id: string
  role: 'user' | 'agent'
  text: string
  timestamp: number
  status?: 'sending' | 'error'
}

type AgentChatMessagesProps = {
  agentName: string
  messages: Array<AgentChatMessage>
  isLoading: boolean
  isTyping: boolean
}

export function AgentChatMessages({
  agentName,
  messages,
  isLoading,
  isTyping,
}: AgentChatMessagesProps) {
  const endRef = useRef<HTMLDivElement | null>(null)
  const displayAgentName = agentName.trim() || 'Agent'

  useEffect(
    function scrollToLatest() {
      endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
    },
    [isTyping, isLoading, messages.length],
  )

  if (isLoading) {
    return (
      <div className="space-y-2 p-4">
        <div className="h-12 w-[72%] animate-pulse rounded-2xl bg-primary-200/70" />
        <div className="ml-auto h-10 w-[56%] animate-pulse rounded-2xl bg-primary-200/70" />
        <div className="h-11 w-[64%] animate-pulse rounded-2xl bg-primary-200/70" />
      </div>
    )
  }

  if (messages.length === 0) {
    return (
      <div className="grid min-h-40 place-items-center px-6 py-8">
        <p className="text-center text-sm text-pretty text-primary-700">
          Start the conversation with this agent.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-3 p-4">
      <AnimatePresence initial={false}>
        {messages.map(function renderMessage(message) {
          const isUser = message.role === 'user'
          const speakerLabel = isUser ? 'You' : displayAgentName

          return (
            <motion.div
              key={message.id}
              aria-label={`${speakerLabel} message`}
              layout="position"
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className={cn('flex', isUser ? 'justify-end' : 'justify-start')}
            >
              <div className="max-w-[84%] space-y-1">
                <div
                  className={cn(
                    'rounded-xl border px-3 py-2 text-sm leading-relaxed text-pretty shadow-sm backdrop-blur-sm',
                    isUser
                      ? 'border-primary-400/60 bg-primary-300/70 text-primary-900'
                      : 'border-primary-300/70 bg-primary-100/85 text-primary-900',
                    message.status === 'error'
                      ? 'border-red-500/60 bg-red-500/15 text-red-200'
                      : '',
                  )}
                >
                  <div
                    className={cn(
                      'mb-1.5 flex items-center justify-between gap-3 text-[11px] font-semibold uppercase text-primary-700',
                      isUser ? 'text-primary-800' : 'text-primary-700',
                    )}
                  >
                    <span className="min-w-0 truncate">{speakerLabel}</span>
                    <span className="shrink-0 text-[10px] font-medium normal-case text-primary-700/80 tabular-nums">
                      <MessageTimestamp timestamp={message.timestamp} />
                    </span>
                  </div>
                  {isUser ? (
                    <span className="whitespace-pre-wrap">{message.text}</span>
                  ) : (
                    <MessageContent
                      markdown
                      className="text-inherit bg-transparent w-full text-pretty [&_pre]:rounded-lg [&_pre]:bg-primary-200/50 [&_pre]:p-2 [&_code]:text-xs"
                    >
                      {message.text}
                    </MessageContent>
                  )}
                </div>
                {message.status ? (
                  <div
                    className={cn(
                      'flex items-center gap-1 text-xs tabular-nums',
                      isUser
                        ? 'justify-end text-primary-700'
                        : 'justify-start text-primary-700',
                    )}
                  >
                    {message.status === 'sending' ? (
                      <span>sending...</span>
                    ) : null}
                    {message.status === 'error' ? <span>failed</span> : null}
                  </div>
                ) : null}
              </div>
            </motion.div>
          )
        })}
      </AnimatePresence>

      {isTyping ? (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 px-1 text-xs text-primary-700 tabular-nums"
        >
          <span className="relative inline-flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary-500/60" />
            <span className="relative inline-flex size-2 rounded-full bg-primary-600" />
          </span>
          {displayAgentName} is typing...
        </motion.div>
      ) : null}

      <div ref={endRef} />
    </div>
  )
}
