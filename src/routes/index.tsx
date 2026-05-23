import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  ssr: false,
  beforeLoad: function redirectToChat() {
    throw redirect({
      to: '/cael-home' as string,
      replace: true,
    })
  },
  component: function IndexRoute() {
    return null
  },
})
