import { vi } from 'vitest'

vi.mock('@tanstack/react-router', () => ({
  createFileRoute: () => () => ({}),
  createRootRoute: () => ({}),
  createRootRouteWithContext: () => () => ({}),
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
  notFound: () => ({}),
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
