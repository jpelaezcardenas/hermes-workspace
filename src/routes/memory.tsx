import { Suspense, lazy, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import BackendUnavailableState from '@/components/backend-unavailable-state'
import { Tabs, TabsList, TabsPanel, TabsTab } from '@/components/ui/tabs'
import { useFeatureAvailable } from '@/hooks/use-feature-available'
import { usePageTitle } from '@/hooks/use-page-title'
import { getFeatureLabel, getUnavailableReason } from '@/lib/feature-gates'

const MemoryBrowserScreen = lazy(async () => {
  const module = await import('@/screens/memory/memory-browser-screen')
  return { default: module.MemoryBrowserScreen }
})

const KnowledgeBrowserScreen = lazy(async () => {
  const module = await import('@/screens/memory/knowledge-browser-screen')
  return { default: module.KnowledgeBrowserScreen }
})

export const Route = createFileRoute('/memory')({
  ssr: false,
  component: function MemoryRoute() {
    const { t } = useTranslation('memory')
    const [tab, setTab] = useState<'memory' | 'knowledge'>('memory')
    const memoryAvailable = useFeatureAvailable('memory')

    usePageTitle(t('pageTitleMemory', { defaultValue: 'Memory' }))

    return (
      <div className="flex h-full min-h-0 flex-col">
        <Tabs
          value={tab}
          onValueChange={(value) => setTab(value as 'memory' | 'knowledge')}
          className="h-full min-h-0 gap-0"
        >
          <div className="border-b border-primary-200 px-3 pt-3 dark:border-neutral-800 md:px-4 md:pt-4">
            <TabsList
              variant="underline"
              className="w-full justify-start gap-1"
            >
              <TabsTab value="memory">
                {t('tabMemory', { defaultValue: 'Memory' })}
              </TabsTab>
              <TabsTab value="knowledge">
                {t('tabKnowledge', { defaultValue: 'Knowledge' })}
              </TabsTab>
            </TabsList>
          </div>

          <TabsPanel value="memory" className="min-h-0 flex-1">
            {tab === 'memory' ? (
              <Suspense
                fallback={
                  <RouteLoadingState
                    label={t('loadingMemoryBrowser', {
                      defaultValue: 'Loading memory browser...',
                    })}
                  />
                }
              >
                {memoryAvailable ? (
                  <MemoryBrowserScreen />
                ) : (
                  <BackendUnavailableState
                    feature={getFeatureLabel('memory')}
                    description={getUnavailableReason('memory')}
                  />
                )}
              </Suspense>
            ) : null}
          </TabsPanel>

          <TabsPanel value="knowledge" className="min-h-0 flex-1">
            {tab === 'knowledge' ? (
              <Suspense
                fallback={
                  <RouteLoadingState
                    label={t('loadingKnowledgeBrowser', {
                      defaultValue: 'Loading knowledge browser...',
                    })}
                  />
                }
              >
                <KnowledgeBrowserScreen />
              </Suspense>
            ) : null}
          </TabsPanel>
        </Tabs>
      </div>
    )
  },
})

function RouteLoadingState({ label }: { label: string }) {
  return (
    <div className="flex h-full min-h-[240px] items-center justify-center px-4 text-sm text-primary-500 dark:text-neutral-400">
      {label}
    </div>
  )
}
