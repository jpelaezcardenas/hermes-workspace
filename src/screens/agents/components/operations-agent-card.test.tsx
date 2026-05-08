// @vitest-environment jsdom

import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { OperationsInlineChat } from './operations-agent-card'

afterEach(() => {
  cleanup()
})

describe('OperationsInlineChat', () => {
  it.each([
    { agentName: 'mira', displayName: 'Mira' },
    { agentName: 'enrin', displayName: 'Enrin' },
  ])(
    'keeps $displayName and user messages readable while preserving send interaction',
    async ({ agentName, displayName }) => {
      const sendMessage = vi.fn().mockResolvedValue(undefined)

      render(
        <OperationsInlineChat
          agentName={agentName}
          error={null}
          isSending={false}
          messages={[
            {
              id: 'assistant-1',
              role: 'assistant',
              content: 'I found two risks and one small slice.',
              timestamp: 1_714_000_000_000,
            },
            {
              id: 'user-1',
              role: 'user',
              content: 'Start with the small slice.',
              timestamp: 1_714_000_060_000,
            },
          ]}
          sendMessage={sendMessage}
        />,
      )

      const agentMessage = screen.getByLabelText(`${displayName} message`)
      const userMessage = screen.getByLabelText('You message')

      expect(agentMessage.textContent).toContain(displayName)
      expect(agentMessage.textContent).toContain('I found two risks')
      expect(userMessage.textContent).toContain('You')
      expect(userMessage.textContent).toContain('Start with the small slice.')

      fireEvent.change(
        screen.getByPlaceholderText(`Message ${displayName}...`),
        {
          target: { value: '  continue with #141  ' },
        },
      )
      fireEvent.click(screen.getByRole('button', { name: 'Send message' }))

      await waitFor(() => {
        expect(sendMessage).toHaveBeenCalledWith('continue with #141')
      })
    },
  )
})
