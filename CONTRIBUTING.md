# Contributing to Hermes Workspace

Thanks for your interest in contributing! Here's how to get started.

## Quick Start

1. Fork the repo and clone your fork
2. Install dependencies: `pnpm install`
3. Set up environment:
   ```bash
   cp .env.example .env
   # Edit .env — set HERMES_API_URL (default: http://127.0.0.1:8642)
   ```
4. Start [Hermes Agent](https://github.com/NousResearch/hermes-agent) API server
5. Run dev server: `pnpm dev`
6. Make your changes on a feature branch
7. Open a PR against `main`

## Development

```bash
# Install dependencies
pnpm install

# Dev server (default: localhost:3000)
pnpm dev

# Type check
npx tsc --noEmit

# Lint
pnpm lint

# Build for production
pnpm build
```

## Environment Variables

See `.env.example` for all options. Key ones:

- `HERMES_API_URL` — Hermes Agent FastAPI backend (default: `http://127.0.0.1:8642`)
- `HERMES_PASSWORD` — Optional password protection for the web UI
- `HERMES_ALLOWED_HOSTS` — Comma-separated hostnames for non-localhost access

## Troubleshooting & Debugging

### Chat stream errors ("Hermes Stream Error")

When a user reports a chat stream failure, here's the debugging path:

```
1. GET /api/diagnostics  →  shows which Hermes endpoints are reachable
2. Check gateway-capabilities.ts →  did probe succeed? Check console logs
3. Check send-stream.ts  →  which error normalization branch fired?
4. Check hermes-api.ts  →  did the fetch to Hermes succeed?
```

**Key files for stream debugging:**

| File | Role |
|---|---|
| `src/server/gateway-capabilities.ts` | Probes Hermes, caches capabilities. Check `[gateway]` console logs |
| `src/server/hermes-api.ts` | All HTTP calls to Hermes. `streamChat()` is the main entry point |
| `src/routes/api/send-stream.ts` | Workspace route that proxies to Hermes, transforms SSE events |
| `src/screens/chat/hooks/use-streaming-message.ts` | Frontend SSE consumer — handles `chunk`, `tool`, `done`, `error` events |

**To add debug logging for a specific error:**
```typescript
// In src/routes/api/send-stream.ts
// Add before the streamChat() call:
console.debug('[send-stream] Starting stream for sessionKey:', sessionKey)
```

**What to look for in browser DevTools (F12):**
```
# Network tab — filter by /api/send-stream
# Look at the Response for SSE events:
event: error
data: {"message": "Cannot reach Hermes gateway..."}

# Console tab — workspace server logs appear here too
[gateway] http://127.0.0.1:8642 available: health, models, sessions
```

### Connection refused / Hermes unreachable

```
1. Is Hermes running?           →  curl http://localhost:8642/health
2. Is the port right?           →  check HERMES_API_URL in .env
3. Is it a network issue?       →  curl -v http://localhost:8642/health
4. Is the sessions API there?   →  curl http://localhost:8642/api/sessions
```

### Terminal not working

Terminal requires a local PTY. Key file: `src/routes/api/terminal-stream.ts`.

If terminal input doesn't work:
1. Check `requireLocalOrAuth()` in `src/server/auth-middleware.ts`
2. If password auth is OFF, it requires a local request — remote browsers blocked
3. The terminal is NOT designed for fully remote deployments

## Guidelines

- **One PR per feature/fix** — keep them focused
- **Test your changes** — make sure the app builds (`npx tsc --noEmit`) and runs
- **Describe what you changed** — clear PR title + description
- **No secrets** — never commit API keys, tokens, or passwords
- **Follow existing patterns** — match the code style you see
- **Add troubleshooting docs** — if you fix a bug, document it in README troubleshooting
