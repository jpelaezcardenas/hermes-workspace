import { beforeEach, describe, expect, it } from 'vitest'
import { useChatStore } from './chat-store'
import type { ChatMessage } from '../screens/chat/types'

function textMessage(
  id: string,
  role: string,
  text: string,
  historyIndex: number,
): ChatMessage {
  return {
    id,
    role,
    timestamp: 1_700_000_000_000,
    __historyIndex: historyIndex,
    content: [{ type: 'text', text }],
  }
}

describe('chat-store history merge ordering', () => {
  beforeEach(() => {
    useChatStore.setState({
      realtimeMessages: new Map(),
      streamingState: new Map(),
      lastEventAt: 0,
      sendStreamRunIds: new Set(),
    })
  })

  it('preserves persisted history order when messages share a timestamp', () => {
    const messages: Array<ChatMessage> = [
      textMessage('m1', 'user', 'first question', 0),
      textMessage('m2', 'assistant', 'first answer', 1),
      textMessage('m3', 'user', 'follow-up', 2),
    ]

    const merged = useChatStore
      .getState()
      .mergeHistoryMessages('history-order-session', messages)

    expect(merged.map((message) => message.id)).toEqual(['m1', 'm2', 'm3'])
  })

  it('accepts local-store historyIndex as a persisted order hint', () => {
    const messages: Array<ChatMessage> = [
      {
        id: 'local-1',
        role: 'user',
        timestamp: 1_700_000_000_000,
        historyIndex: 0,
        content: [{ type: 'text', text: 'local question' }],
      },
      {
        id: 'local-2',
        role: 'assistant',
        timestamp: 1_700_000_000_000,
        historyIndex: 1,
        content: [{ type: 'text', text: 'local answer' }],
      },
      {
        id: 'local-3',
        role: 'user',
        timestamp: 1_700_000_000_000,
        historyIndex: 2,
        content: [{ type: 'text', text: 'local follow-up' }],
      },
    ]

    const merged = useChatStore
      .getState()
      .mergeHistoryMessages('local-history-order-session', messages)

    expect(merged.map((message) => message.id)).toEqual([
      'local-1',
      'local-2',
      'local-3',
    ])
  })
})

describe('chat-store send-stream user messages', () => {
  beforeEach(() => {
    useChatStore.setState({
      realtimeMessages: new Map(),
      streamingState: new Map(),
      lastEventAt: 0,
      sendStreamRunIds: new Set(),
    })
  })

  it('reconciles a direct send-stream user_message with the optimistic message', () => {
    const sessionKey = 'send-stream-user-session'
    const optimistic: ChatMessage = {
      role: 'user',
      timestamp: 1_700_000_000_000,
      clientId: 'client-1',
      __optimisticId: 'opt-client-1',
      status: 'sending',
      content: [{ type: 'text', text: 'hello hermes' }],
    }
    const confirmed: ChatMessage = {
      id: 'msg-1',
      role: 'user',
      timestamp: 1_700_000_000_001,
      clientId: 'client-1',
      client_id: 'client-1',
      idempotencyKey: 'client-1',
      content: [{ type: 'text', text: 'hello hermes' }],
    }

    const store = useChatStore.getState()
    store.processEvent({
      type: 'user_message',
      message: optimistic,
      sessionKey,
      runId: 'run-1',
      transport: 'send-stream',
    })
    store.processEvent({
      type: 'user_message',
      message: confirmed,
      sessionKey,
      source: 'hermes',
      runId: 'run-1',
      transport: 'send-stream',
    })

    const messages = useChatStore.getState().getRealtimeMessages(sessionKey)
    expect(messages).toHaveLength(1)
    expect(messages[0]).toMatchObject({
      id: 'msg-1',
      role: 'user',
      clientId: 'client-1',
      status: undefined,
      __optimisticId: undefined,
    })
  })
})
