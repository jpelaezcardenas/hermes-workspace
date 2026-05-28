// Stub — connection overlay (not used in Hermes Workspace)
export function useConnectionRestart() {
  return {
    triggerRestart: async (fn: () =>{t('promise')}<void>) => {
      await fn()
    },
  }
}

export function ConnectionProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
