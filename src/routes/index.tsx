import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  ssr: false,
  beforeLoad: function redirectToDashboard() {
    throw redirect({
      to: '/dashboard' as string,
      replace: true,
    })
  },
  component: function IndexRoute() {
    return null
  },
})
