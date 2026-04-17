import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'
import { usePageTitle } from '@/hooks/use-page-title'
import { AiHotboardScreen } from '@/screens/ai-hotboard/ai-hotboard-screen'

const HIDDEN_SELECTOR_PAIRS = [
  ['aside', 'Hermes Workspace'],
  ['nav', 'Dashboard'],
  ['button', 'Collapse navigation sidebar'],
  ['button', 'Open navigation menu'],
]

export const Route = createFileRoute('/ai-hotboard')({
  component: AiHotboardRoute,
})

function AiHotboardRoute() {
  usePageTitle('AI 热点看板')

  useEffect(() => {
    if (typeof window === 'undefined') return
    const hotboardWindow = window as Window & { __dismissSplash?: () => void }

    const onboardingKeys = [
      'hermes-onboarding-complete',
      'hermes-onboarding-completed',
      'hermes-configured',
    ]

    onboardingKeys.forEach(function persistKey(key) {
      window.localStorage.setItem(key, 'true')
    })

    const overlayMatcher = /welcome to hermes workspace|get started/i
    const cleanupEntries: Array<{ node: HTMLElement; display: string }> = []

    function hideElement(node: HTMLElement | null) {
      if (!node || cleanupEntries.some((entry) => entry.node === node)) return
      cleanupEntries.push({ node, display: node.style.display })
      node.style.display = 'none'
      node.setAttribute('aria-hidden', 'true')
    }

    function hideWorkspaceChrome() {
      HIDDEN_SELECTOR_PAIRS.forEach(function hideBySelector([selector, marker]) {
        document.querySelectorAll<HTMLElement>(selector).forEach(function inspect(node) {
          const text = node.innerText?.trim() ?? ''
          const label = node.getAttribute('aria-label') ?? ''
          if (text.includes(marker) || label.includes(marker)) {
            hideElement(node)
          }
        })
      })

      document.querySelectorAll<HTMLElement>('body > *').forEach(function inspectTopLevel(node) {
        const text = node.innerText?.trim() ?? ''
        if (text.includes('Dashboard') && text.includes('Chat') && text.includes('Terminal')) {
          hideElement(node)
        }
      })
    }

    function hideBlockingOverlays() {
      hotboardWindow.__dismissSplash?.()
      hideWorkspaceChrome()

      const splash = document.getElementById('splash-screen')
      if (splash) {
        splash.remove()
      }

      document.querySelectorAll<HTMLElement>('body *').forEach(function scanNode(node) {
        if (!(node instanceof HTMLElement)) return
        const text = node.innerText?.trim() ?? ''
        const style = hotboardWindow.getComputedStyle(node)
        const isViewportOverlay =
          style.position === 'fixed' &&
          Number.parseInt(style.zIndex || '0', 10) >= 9999 &&
          style.inset === '0px'

        if (isViewportOverlay && overlayMatcher.test(text)) {
          node.style.display = 'none'
          node.setAttribute('aria-hidden', 'true')
        }
      })
    }

    hideBlockingOverlays()
    const observer = new MutationObserver(hideBlockingOverlays)
    observer.observe(document.body, { childList: true, subtree: true })

    return function cleanup() {
      observer.disconnect()
      cleanupEntries.forEach(function restore(entry) {
        entry.node.style.display = entry.display
        entry.node.removeAttribute('aria-hidden')
      })
    }
  }, [])

  return <AiHotboardScreen />
}
