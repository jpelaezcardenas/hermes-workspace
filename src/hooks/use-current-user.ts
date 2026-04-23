import { useQuery } from '@tanstack/react-query'

export type CurrentUser = {
  email: string | null
  isAdmin: boolean
  adminAllowlistConfigured: boolean
}

const DEFAULT_USER: CurrentUser = {
  email: null,
  isAdmin: true,
  adminAllowlistConfigured: false,
}

async function fetchCurrentUser(): Promise<CurrentUser> {
  try {
    const res = await fetch('/api/me', {
      credentials: 'same-origin',
      headers: { Accept: 'application/json' },
    })
    if (!res.ok) return DEFAULT_USER
    const data = (await res.json()) as Partial<CurrentUser>
    return {
      email: typeof data.email === 'string' ? data.email : null,
      isAdmin: typeof data.isAdmin === 'boolean' ? data.isAdmin : true,
      adminAllowlistConfigured: Boolean(data.adminAllowlistConfigured),
    }
  } catch {
    return DEFAULT_USER
  }
}

export function useCurrentUser() {
  const query = useQuery({
    queryKey: ['current-user'],
    queryFn: fetchCurrentUser,
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  })

  const user = query.data ?? DEFAULT_USER
  return {
    ...user,
    isLoading: query.isLoading,
    isReady: query.isFetched,
  }
}
