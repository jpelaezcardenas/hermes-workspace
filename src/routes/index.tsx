import { createFileRoute, redirect } from '@tanstack/react-router'

// Host-aware root redirect.
// The same Hermes Workspace server serves multiple domains (e.g. hermes.*
// for the full workspace, aihotboard.tangyuanjc.com for the AI 热点看板
// product surface). When a visitor lands on "/" we send them to the
// landing page that matches the domain they came through — otherwise a
// visitor to aihotboard.tangyuanjc.com sees the Hermes chat by default,
// which is confusing product framing.
const HOTBOARD_HOSTS = new Set(['aihotboard.tangyuanjc.com'])

export function resolveRootLanding(hostname: string | undefined | null): string {
  if (hostname && HOTBOARD_HOSTS.has(hostname)) return '/ai-hotboard'
  return '/chat'
}

export const Route = createFileRoute('/')({
  ssr: false,
  beforeLoad: function redirectRoot() {
    const hostname = typeof window !== 'undefined' ? window.location.hostname : undefined
    throw redirect({
      to: resolveRootLanding(hostname) as string,
      replace: true,
    })
  },
  component: function IndexRoute() {
    return null
  },
})
