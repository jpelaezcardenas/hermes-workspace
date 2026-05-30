import { describe, expect, it } from 'vitest'
import {
  isInternalSession,
  resolveMainChatSessionId,
  shouldShowInChatSessionList,
} from './session-utils'

describe('session-utils', () => {
  it('hides cron and generated worker sessions from the chat list', () => {
    expect(
      shouldShowInChatSessionList({
        id: 'cron_a34081ba1f47_20260530_130010',
        title: '[IMPORTANT: The user has invoked the "android-phone-ops" skill',
      }),
    ).toBe(false)

    expect(
      shouldShowInChatSessionList({
        id: '20260530_024814_f6aad2',
        title: 'Distill the key insights from this MCTS exploration: BRIEF',
      }),
    ).toBe(false)

    expect(
      shouldShowInChatSessionList({
        id: '20260530_024657_26d43a',
        preview: 'PLAN — decide next action: Brief: Troubleshoot this error',
      }),
    ).toBe(false)

    expect(
      shouldShowInChatSessionList({
        id: '20260530_094037_441fb9',
        title: 'Return exactly: HERMES_UPDATE_OK',
      }),
    ).toBe(false)
  })

  it('keeps ordinary user sessions visible', () => {
    expect(
      isInternalSession({
        id: '20260530_161000_user_chat',
        title: 'Onderzoek de lokale Hermes agent installatie',
        message_count: 4,
      }),
    ).toBe(false)
  })

  it('does not resolve main chat to internal runtime sessions', () => {
    const id = resolveMainChatSessionId([
      {
        id: 'cron_66fa922a6bb7_20260530_120045',
        title:
          '[IMPORTANT: The user has invoked the "bounty-income-operation" skill',
        message_count: 14,
      },
      {
        id: '20260530_024814_8f0090',
        title: 'Distill the key insights from this MCTS exploration: BRIEF',
        message_count: 2,
      },
      {
        id: 'session-real',
        title: 'Fix the deployment pipeline',
        message_count: 8,
      },
    ])

    expect(id).toBe('session-real')
  })
})
