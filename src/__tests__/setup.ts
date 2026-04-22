import { vi } from 'vitest'

vi.mock('@tanstack/react-router', () => ({
  createFileRoute: () => () => ({}),
  getRouteApi: () => ({ useLoaderData: () => ({}), useParams: () => ({}) }),
  Link: () => null,
  useNavigate: () => () => {},
  useLocation: () => ({ pathname: '/' }),
  useSearch: () => ({}),
  Outlet: () => null,
  redirect: () => ({}),
  createRoute: () => ({}),
  createRouter: () => ({}),
  RouterProvider: () => null,
  rootRouteId: '__root__',
  useRouter: () => ({}),
  useRouteContext: () => ({}),
  useParams: () => ({}),
  useLoaderData: () => ({}),
}))

vi.mock('@tanstack/react-start', () => ({
  json: (data: unknown, opts?: object) => new Response(JSON.stringify(data), opts as ResponseInit),
  createServerFn: () => () => ({}),
  getRequestUrl: () => new URL('http://localhost:3000'),
  getRequestHeaders: () => ({}),
  getEvent: () => ({}),
  serialize: (x: unknown) => x,
  redirect: () => ({}),
  startSerializer: () => ({ serialize: (x: unknown) => x, deserialize: (x: unknown) => x }),
}))

vi.mock('../server/gateway-capabilities', () => ({
  ensureGatewayProbed: async () => {},
  getCapabilities: () => ({ config: true }),
  HERMES_API: 'http://127.0.0.1:8642',
  BEARER_TOKEN: '',
}))

vi.mock('../server/auth-middleware', () => ({
  isAuthenticated: () => true,
}))

vi.mock('../server/hermes-api', () => ({
  ensureGatewayProbed: async () => {},
  getGatewayCapabilities: () => ({ models: false }),
}))

vi.mock('../server/local-provider-discovery', () => ({
  ensureDiscovery: async () => {},
  getDiscoveredModels: () => [],
  ensureProviderInConfig: () => false,
}))

vi.mock('@/lib/feature-gates', () => ({
  createCapabilityUnavailablePayload: (cap: string, extra?: object) => ({ unavailable: cap, ...extra }),
}))
