# Auth Dual-Token API Implementation Plan

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task.

**Goal:** Protect every workspace API route behind authentication, allowing browser users via session cookie and internal container-to-container callers via bearer token.

**Architecture:** Introduce a single authorization helper that accepts either a valid session cookie or a valid internal bearer token. Keep the human login flow (`/api/auth`) for the browser, but make all protected API routes require the new guard. Bootstrap endpoints remain minimal so the UI can establish auth state without exposing the API publicly.

**Tech Stack:** TanStack Start routes, existing `src/server/auth-middleware.ts`, cookie-based session store, `HERMES_PASSWORD`, new `HERMES_API_TOKEN`, Vitest.

**Branching:** Do this work on a dedicated branch, one feature per branch. Suggested name for this topic: `feat/auth-dual-token-api`.

---

## Task 1: Add bearer-token authentication primitives

**Objective:** Teach the auth middleware to validate a bearer token from an environment variable, alongside the existing session cookie.

**Files:**
- Modify: `src/server/auth-middleware.ts`
- Test: `src/server/auth-middleware.test.ts` (create if missing)

**Step 1: Write failing tests**

Add tests that prove:
- `Authorization: Bearer <token>` authenticates when the token matches `HERMES_API_TOKEN`.
- A wrong bearer token does not authenticate.
- A request with no bearer token still uses the existing session-cookie logic.

**Step 2: Run tests to verify failure**

Run:
```bash
CI=true pnpm vitest run src/server/auth-middleware.test.ts
```
Expected: fail until the bearer-token helper exists.

**Step 3: Write minimal implementation**

Add helpers similar to:
```ts
function getConfiguredApiToken(): string {
  return process.env.HERMES_API_TOKEN?.trim() ?? ''
}

export function isBearerTokenAuthenticated(request: Request): boolean {
  const token = getConfiguredApiToken()
  if (!token) return false

  const auth = request.headers.get('authorization')?.trim() ?? ''
  if (!auth.toLowerCase().startsWith('bearer ')) return false

  const presented = auth.slice('bearer '.length).trim()
  return presented.length > 0 && presented === token
}
```

Then update the existing auth check to return true when either session auth or bearer auth succeeds.

**Step 4: Run tests to verify pass**

Run:
```bash
CI=true pnpm vitest run src/server/auth-middleware.test.ts
```
Expected: pass.

**Step 5: Commit**

```bash
git add src/server/auth-middleware.ts src/server/auth-middleware.test.ts
git commit -m "feat(auth): accept internal bearer token"
```

---

## Task 2: Unify protected-route authorization

**Objective:** Replace route-by-route ad hoc checks with a single authorization guard that every protected API route uses.

**Files:**
- Modify: `src/server/auth-middleware.ts`
- Modify: `src/routes/api/*.ts` for protected routes
- Modify: `src/routes/api/profiles/list.ts`
- Modify: `src/routes/api/auth-check.ts`

**Step 1: Add failing tests for route guards**

Create tests that assert the following behaviors:
- `/api/profiles/list` returns data when bearer token auth is present.
- `/api/profiles/list` returns 401 when both session and bearer auth are absent.
- `/api/auth-check` reports authenticated when bearer token auth is present.
- A protected mutating route continues to reject unauthenticated requests.

**Step 2: Run the targeted tests**

Run:
```bash
CI=true pnpm vitest run src/routes/api/profiles/list.test.ts src/routes/api/auth-check.test.ts
```
Expected: fail until the guard is wired.

**Step 3: Implement the shared guard**

Add a helper such as:
```ts
export function isAuthenticated(request: Request): boolean {
  return isSessionAuthenticated(request) || isBearerTokenAuthenticated(request)
}

export function requireAuth(request: Request): boolean {
  return isAuthenticated(request)
}
```

Use that helper in all protected API routes that currently call `isAuthenticated(request)` directly.

**Step 4: Run tests to verify pass**

Run the targeted tests again.
Expected: pass.

**Step 5: Commit**

```bash
git add src/server/auth-middleware.ts src/routes/api/*.ts
git commit -m "feat(auth): protect workspace api with session or token"
```

---

## Task 3: Keep bootstrap endpoints minimal

**Objective:** Preserve the UI bootstrap flow without exposing the rest of the API.

**Files:**
- Modify: `src/routes/api/auth.ts`
- Modify: `src/routes/api/auth-check.ts`
- Modify: `src/components/auth/login-screen.tsx` if needed
- Modify: `src/lib/claude-auth.ts` if needed

**Step 1: Confirm bootstrap responsibilities**

Ensure:
- `POST /api/auth` remains the login entry point for browser users.
- `GET /api/auth-check` can tell the UI whether the user is logged in.
- Neither endpoint leaks the bearer token.

**Step 2: Add tests for auth-check semantics**

Add tests to prove:
- password-only browser login still works
- bearer-token auth is reported as authenticated
- unauthenticated callers still get the expected unauthenticated response

**Step 3: Implement only the minimal UI changes needed**

If the UI needs no change, keep this task limited to route logic and tests.
If the UI needs a small tweak to avoid confusion, make it explicit and minimal.

**Step 4: Run the relevant tests**

Run:
```bash
CI=true pnpm vitest run src/routes/api/auth-check.test.ts src/routes/api/auth.test.ts
```
Expected: pass.

**Step 5: Commit**

```bash
git add src/routes/api/auth.ts src/routes/api/auth-check.ts src/lib/claude-auth.ts
git commit -m "feat(auth): keep bootstrap flow while securing api"
```

---

## Task 4: Update deployment configuration

**Objective:** Make the new API token available in containerized deployments and keep the workspace/agent configuration aligned.

**Files:**
- Modify: `docker-compose.yml`
- Modify: `.env.example`
- Modify: README or deployment docs if present

**Step 1: Add configuration entries**

Document:
- `HERMES_API_TOKEN` for the workspace API bearer token
- retain `HERMES_PASSWORD` for browser login

**Step 2: Wire compose through the environment**

Pass `HERMES_API_TOKEN` into the workspace container.
Keep the current auth cookie/password flow unchanged.

**Step 3: Verify compose config**

Run:
```bash
docker compose config
```
Expected: rendered config includes the new env var wiring.

**Step 4: Commit**

```bash
git add docker-compose.yml .env.example README.md
git commit -m "docs: document workspace api token auth"
```

---

## Task 5: Verify the whole flow end to end

**Objective:** Prove that the API is locked down and still usable from authorized clients.

**Files:**
- No new files unless tests require fixtures

**Step 1: Run unit tests**

Run the full affected test set:
```bash
CI=true pnpm vitest run src/server/auth-middleware.test.ts src/routes/api/auth-check.test.ts src/routes/api/profiles/list.test.ts
```

**Step 2: Verify runtime behavior locally**

Check that:
- unauthenticated requests get 401
- browser login still issues the session cookie
- bearer token works for internal calls

**Step 3: Verify no accidental public access**

Confirm that protected routes do not regress to loopback-only assumptions.

**Step 4: Final commit / PR prep**

```bash
git status --short
git log --oneline --max-count=5
```

---

## Notes and cautions

- Do not store the bearer token in frontend JavaScript or localStorage.
- Do not weaken route protection by relying on IP heuristics alone.
- Keep the bearer-token path and the session-cookie path both explicit and tested.
- If a route is protected, it should be protected the same way everywhere.
- Branch per topic: keep auth work isolated from profile-discovery cleanup work.
