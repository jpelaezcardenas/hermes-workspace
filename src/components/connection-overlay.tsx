// Stub — connection overlay (not used in Agent-e1)
export function useConnectionRestart() {
  return {
    triggerRestart: async (fn: () => Promise<void>) => {
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
