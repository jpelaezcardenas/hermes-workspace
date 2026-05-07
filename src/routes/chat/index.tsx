import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/chat/')({
  ssr: false,
  beforeLoad: () => {
    // Try to restore last active session from localStorage
    let lastSession = 'main'
    try {
      const stored =
        typeof window !== 'undefined'
          ? localStorage.getItem('hermes-last-session')
          : null
      if (stored && stored !== 'main' && stored !== 'new') lastSession = stored
    } catch {}
    throw redirect({
      to: '/chat/$sessionKey',
      params: { sessionKey: lastSession },
      replace: true,
    })
  },
  component: function ChatIndexRoute() {
    return null
  },
})
