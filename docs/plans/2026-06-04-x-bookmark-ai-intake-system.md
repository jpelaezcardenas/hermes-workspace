# X Bookmark AI Intake System Implementation Plan

> **For Hermes:** Use test-driven-development and workspace repo verification for implementation.

**Goal:** Turn Tim's X bookmarks into an actionable AI-development intake system with review digest, article extraction metadata, AI Ops upgrade radar, capture inbox prototype, and Travel Multiplier AI Search audit artifact.

**Architecture:** Keep this local and read-only. Build deterministic Workspace APIs over the existing X bookmark cache first, using keyword/source classification and review-state files. Avoid new paid services, publishing, Notion writes, cross-profile writes, or automatic high-credit pagination.

**Tech Stack:** Hermes Workspace, TanStack Start route APIs, TypeScript utilities, Vitest, local JSON stores under `~/.hermes/profiles/ai-dev/workspace/x-bookmark-intake/`.

---

## Safe autonomous scope

Allowed without more approval:

- Read existing X bookmark cache.
- Add local Workspace APIs and read-only UI surfaces.
- Create local artifacts under the ai-dev profile and Workspace repo.
- Run tests, lint, build, restart Workspace.
- Perform at most one small verification fetch if needed.

Blocked without explicit approval:

- Spending money or intentionally burning large X API credits.
- Sending/publishing content.
- Writing Notion source-of-truth pages.
- Modifying other Hermes profiles' identity, memory, crons, tools, or gateway setup.
- Installing paid tools or exposing public network routes.
- Pushing git commits remote.

## Tasks

### Task 1: Add deterministic review utility

**Objective:** Classify cached bookmarks into Tim-actionable buckets and produce a digest/radar summary.

**Files:**

- Modify: `src/routes/api/x-bookmarks/-x-bookmarks-utils.ts`
- Modify test: `src/routes/api/x-bookmarks/-x-bookmarks-utils.test.ts`

**Behavior:**

- Input: cached bookmark records.
- Output: `useNow`, `teach`, `packageSell`, `watch`, `reject`, plus upgrade radar items.
- Include source URL, author, claim, rationale, recommended action, approval needed.
- Prefer deterministic classification. No LLM dependency.

**Verification:**

- `pnpm vitest run src/routes/api/x-bookmarks/-x-bookmarks-utils.test.ts`

### Task 2: Add review API

**Objective:** Serve the digest from Workspace.

**Files:**

- Create: `src/routes/api/x-bookmarks/review.ts`

**Behavior:**

- Requires Workspace auth.
- Reads cache.
- Returns digest, source counts, article-wrapper count, reviewed-state summary.

### Task 3: Add article extraction metadata

**Objective:** Detect X Article wrappers and mark which need full extraction.

**Files:**

- Modify utilities and review API.

**Behavior:**

- Detect `x.com/i/article/*` links.
- Include `articleUrl`, `articleStatus: pending/extracted/unavailable`.
- Do not claim full article text unless extracted.

### Task 4: Add AI Ops Upgrade Radar UI

**Objective:** Make the digest visible in Workspace.

**Files:**

- Create: `src/routes/x-bookmark-review.tsx`

**Behavior:**

- Shows top recommendations and grouped bookmark items.
- Labels verified vs partial article-wrapper items.
- Shows approval gates.

### Task 5: Add review-state guardrails

**Objective:** Prevent the same bookmark from resurfacing forever.

**Files:**

- Utility functions in `-x-bookmarks-utils.ts`
- API route for marking reviewed can be read-only/design-only unless approval is given for mutating controls.

**Behavior:**

- Store state locally in `bookmark-review-state.json`.
- For now, surface counts and IDs. Actual UI mutation can stay disabled if not needed.

### Task 6: Create Tim Capture Inbox prototype artifact

**Objective:** Local prototype spec and starter JSON schema for voice/text capture routing.

**Files:**

- Create local artifact under `~/.hermes/profiles/ai-dev/workspace/x-bookmark-intake/tim-capture-inbox-prototype.md`

**Behavior:**

- Defines capture categories, routing rules, and approval gates.

### Task 7: Create Travel Multiplier AI Search audit artifact

**Objective:** Local, ready-to-use audit template based on bookmark signals.

**Files:**

- Create local artifact under `~/.hermes/profiles/ai-dev/workspace/x-bookmark-intake/travel-multiplier-ai-search-audit-template.md`

**Behavior:**

- One-page audit workflow for a Travel Multiplier page.
- Uses public/page inputs when available.
- Does not publish or edit live content.

### Task 8: Verify and restart

**Commands:**

- `pnpm vitest run src/routes/api/x-bookmarks/-x-bookmarks-utils.test.ts`
- `pnpm exec eslint src/routes/api/x-bookmarks/-x-bookmarks-utils.ts src/routes/api/x-bookmarks/review.ts src/routes/x-bookmark-review.tsx`
- `pnpm build`
- `launchctl kickstart -k gui/$(id -u)/ai.hermes.workspace`
- Smoke test `/x-bookmark-review` locally and over Tailscale.

## Done criteria

- Review digest API works from current cache without spending more X credits.
- Workspace review route loads.
- Local capture inbox and AI search audit artifacts exist.
- Tests/lint/build pass for touched files.
- Final report names remaining blockers, especially full X Article extraction limitations.
