# Safe Second Brain file API and UI plan

## Goal

Surface configured Second Brain Markdown files in Cael Workspace for safe browse, read, create, and edit without widening the existing workspace file API. Keep `/api/files` workspace-only. Add a separate, boundary-aware Second Brain API that reuses the existing knowledge source config and memory browser concepts.

## Current code anchors

- Workspace file manager: `src/routes/api/files.ts`, `src/screens/files/files-screen.tsx`, `src/routes/files.tsx`.
- Knowledge browser APIs: `src/routes/api/knowledge/list.ts`, `read.ts`, `search.ts`, `config.ts`, `sync.ts`.
- Knowledge source/root logic: `src/server/knowledge-config.ts`, `src/server/knowledge-browser.ts`.
- Existing safety precedent: `/api/files` resolves against the selected workspace root with `path.relative`; knowledge reads currently restrict paths to relative `.md` files.

## Source registry

Add `src/server/second-brain-sources.ts` as the single registry/resolver for file-capable knowledge sources.

Source shape:

```ts
type SecondBrainSource = {
  id: string
  label: string
  kind: 'local' | 'github-cache'
  effectiveRoot: string
  readonly: boolean
  markdownOnly: true
  configuredFrom: 'knowledge-config' | 'legacy-fallback'
}
```

Rules:

- Derive sources from `readKnowledgeBaseConfig()` only; do not scan arbitrary home directories beyond existing legacy fallback.
- Local knowledge source: read/write only when explicitly configured or legacy fallback exists under the resolved knowledge root.
- GitHub source: expose cached Markdown as read-only unless a later explicit Git commit/writeback flow is designed.
- Never register the workspace root as a Second Brain source; `/api/files` remains the only workspace file surface.
- Return source metadata to UI with redacted/root-display fields. Do not expose env vars, tokens, hidden absolute paths beyond a clearly labeled local path when already shown by config UI.

## Path safety and secret boundary

Implement a shared resolver:

```ts
resolveSecondBrainPath(sourceId, inputPath, { requireFile, allowCreate })
```

Mandatory checks:

- `sourceId` must exist in the registry; no raw root/path parameters from clients.
- Normalize separators to `/`; reject empty path except list root.
- Reject absolute paths, `..` segments, NUL bytes, URL-encoded traversal after decoding, and Windows drive/UNC forms.
- Resolve with `path.resolve(source.effectiveRoot, safeRelative)` and verify containment using `path.relative(root, resolved)` not prefix checks.
- Use `lstat` and reject symlinks by default for files and each traversed directory, or resolve `realpath` for both root and target and require target stays under the real root.
- Allow only `.md`, `.mdx`, `.txt`, and asset reads needed by Markdown rendering if explicitly desired; for first iteration keep edit/write Markdown-only.
- Deny known secret/config files even if extension matches: `.env*`, `*secret*`, `*token*`, private keys, `.ssh`, `.gnupg`, `.aws`, `.config`, `.claude/settings*`, `.hermes/secrets*`.
- Cap reads/writes, e.g. max 1 MiB text file, max 20k directory entries, max depth 8.
- Return generic 400/403/404 errors without echoing absolute resolved paths.

Business/personal boundary:

- Treat Second Brain as personal by default. The UI must label it separately from workspace/business files.
- Do not include Second Brain content in global workspace search, command palette, agent context, screenshots, telemetry, or logs unless the user explicitly opens it.
- Log only action, sourceId, relative path, and status; never log file content.
- Keep create/edit/delete disabled for read-only or non-local sources.

## API design

Add separate routes under `src/routes/api/second-brain/files/*` or a single action route `src/routes/api/second-brain/files.ts`. Prefer separate routes for testability:

- `GET /api/second-brain/files/sources`
  - Returns registered sources with `id`, `label`, `kind`, `readonly`, `exists`, `displayRoot`.
- `GET /api/second-brain/files/list?sourceId=...&path=...&maxDepth=...`
  - Returns folders and Markdown files only: `{ sourceId, root, entries }`.
- `GET /api/second-brain/files/read?sourceId=...&path=...`
  - Returns `{ sourceId, path, content, meta, etag, modifiedAt }`.
  - For compatibility, meta can reuse `buildPageMeta`/frontmatter parsing from `knowledge-browser.ts` after extracting those helpers.
- `POST /api/second-brain/files/write`
  - JSON only, CSRF/content-type checked, authenticated, rate limited.
  - Body: `{ sourceId, path, content, expectedEtag? }`.
  - Writes atomically via temp file + rename. Reject if readonly. Use optimistic concurrency with etag/mtime.
- `POST /api/second-brain/files/create`
  - Body: `{ sourceId, path, content? }`; Markdown-only; fails if exists unless `overwrite: true` is later added.
- `POST /api/second-brain/files/rename`
  - Optional phase 2. Same source only, Markdown-only.
- No delete in first iteration. If added later, require a local-only confirmation and trash-first behavior.

Security middleware:

- Use `isAuthenticated` for all routes.
- Use `requireJsonContentType` on mutating routes.
- Rate limit reads/lists moderately and writes strictly.
- Keep response schema stable and avoid raw stack traces via `safeErrorMessage` or a Second Brain-specific safe error mapper.

Refactor work:

- Extract knowledge path validation/frontmatter parsing into `src/server/knowledge-files.ts` or keep new resolver isolated and have `knowledge-browser.ts` consume it for reads later.
- Do not alter `/api/files` behavior except perhaps shared test helpers; it should continue resolving only from `loadWorkspaceCatalog()`.

## UI plan

Navigation and layout:

- Add a Second Brain tab/section inside `/memory` first, not `/files`, to avoid mixing personal knowledge with workspace files.
- Optionally add a clear link from `/files`: “Looking for personal Second Brain notes? Open Memory → Second Brain.”
- Use a three-pane layout reusing `knowledge-browser-screen.tsx` patterns: source selector/config status, folder tree/file list, editor/preview.

Core UI tasks:

- Add source selector showing local vs GitHub cache and readonly badge.
- Add file tree from `/api/second-brain/files/list`, filtered to Markdown files and safe folders.
- Add open/read view with preview/edit split for Markdown.
- Add edit mode with dirty-state indicator, Save, Revert, and “readonly source” disabled state.
- Add create note action with safe path/name validation client-side and server-side.
- Add conflict handling when `expectedEtag` mismatches: show reload/overwrite choices; default to reload.
- Preserve wikilink rendering/navigation by resolving opened paths through existing knowledge APIs or a shared client resolver.
- Add explicit visual boundary copy: “Personal Second Brain — not workspace files.”

Avoid:

- Do not merge Second Brain nodes into `/files` tree.
- Do not auto-open arbitrary absolute paths from knowledge config.
- Do not show hidden directories by default.
- Do not allow bulk upload/download/delete in v1.

## Tests

Server unit tests:

- Registry derives local configured source, GitHub cache readonly source, and legacy fallback deterministically.
- Resolver accepts nested Markdown inside root.
- Rejects absolute paths, `../`, encoded traversal, sibling-prefix escape, Windows drive paths, NUL bytes.
- Rejects symlink escape and symlinked directories.
- Rejects denied secret-looking paths and non-Markdown writes.
- GitHub/cache source returns readonly and write attempts fail 403.
- Atomic write preserves containment and returns new etag.
- Etag conflict returns 409.

Route tests:

- Unauthenticated list/read/write return 401.
- Mutating routes require JSON content type and rate limit.
- Read missing note returns 404 without absolute path leak.
- List respects maxDepth/maxEntries and skips ignored dirs.
- `/api/files` tests remain green and confirm workspace-only behavior.

UI tests:

- Source selector displays readonly/local labels.
- Tree loads and opens a note.
- Save disabled for readonly source.
- Dirty state, save success, revert, and conflict banner behavior.
- Boundary label is visible and `/files` still says Server workspace.

Manual QA:

- Configure local Second Brain temp dir; create/edit/read a note.
- Configure GitHub knowledge source; sync/cache; verify read-only browse.
- Attempt traversal and secret file paths from browser devtools; verify rejection.
- Verify no Second Brain content appears in workspace search unless explicitly opened.

## Acceptance criteria

- `/api/files` remains workspace-only and unchanged in purpose.
- Second Brain file access is available only through `/api/second-brain/files/*` with authenticated, sourceId-based requests.
- All filesystem operations are contained inside registered source roots using `path.relative`/realpath checks and reject traversal/symlink escapes.
- Local sources can read/create/edit Markdown notes with atomic writes and conflict detection.
- GitHub/cache sources are clearly read-only.
- UI clearly separates personal Second Brain from workspace/business files.
- Secret-looking files and hidden sensitive directories are not surfaced or editable.
- Tests cover registry, path safety, route auth/errors, and UI boundary/edit states.
