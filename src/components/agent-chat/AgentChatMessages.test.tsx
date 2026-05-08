// @vitest-environment jsdom

import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { AgentChatMessages } from './AgentChatMessages'

beforeEach(() => {
  Element.prototype.scrollIntoView = vi.fn()
})

afterEach(() => {
  cleanup()
})

describe('AgentChatMessages', () => {
  it.each(['Mira', 'Enrin'])(
    'labels compact %s messages with the selected agent name',
    (agentName) => {
      render(
        <AgentChatMessages
          agentName={agentName}
          isLoading={false}
          isTyping={false}
          messages={[
            {
              id: 'mira-1',
              role: 'agent',
              text: 'Read-only review is ready.',
              timestamp: 1_714_000_000_000,
            },
            {
              id: 'user-1',
              role: 'user',
              text: 'Apply it.',
              timestamp: 1_714_000_060_000,
            },
          ]}
        />,
      )

      const agentMessage = screen.getByLabelText(`${agentName} message`)
      const userMessage = screen.getByLabelText('You message')

      expect(agentMessage.textContent).toContain(agentName)
      expect(agentMessage.textContent).toContain('Read-only review is ready.')
      expect(userMessage.textContent).toContain('You')
      expect(userMessage.textContent).toContain('Apply it.')
    },
  )
})
