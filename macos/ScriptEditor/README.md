# Native Script Editor

Standalone SwiftUI macOS app for developing short-form video scripts from research through human revision. The app is independent from Hermes and defaults to a local OpenAI-compatible Qwen endpoint.

## Run

From the Hermes Workspace repo root:

```sh
pnpm script-editor:mac
```

If the local Swift toolchain is unavailable, use the built-in Hermes Workspace
web section instead:

```text
http://127.0.0.1:3000/script-editor
```

Or launch the script directly:

```sh
./scripts/start-script-editor-mac.sh
```

From the app package directory:

```sh
cd macos/ScriptEditor
swift run ScriptEditorApp
```

Default AI backend:

- Base URL: `http://127.0.0.1:8081/v1`
- Model: `mlx-community/Qwen3-1.7B-4bit`

Project data is stored locally in Application Support at `NativeScriptEditor/script-editor-db.json`.

## Workflow

1. Create a project with topic, audience, platform, tone, goals, and constraints.
2. Add research from notes, URLs, local `.txt`/`.md`/`.csv`/`.json` files, or search snippets.
3. Build a structured research brief with insights, claims, angles, tensions, and citations.
4. Generate 20-40 short-form script candidates.
5. Score every candidate with the idea and execution rubric.
6. Review only the top 10 candidates.
7. Edit the selected script manually with side-agent revision assistance.
8. Approve a final script and render a local Markdown export.

V1 intentionally stops at approved scripts. Posting automation stays out of scope until the research, writing, and revision workflow feels strong.

## Current v1 Build-Out

- `Rubric` centralizes score dimensions and non-slop flags.
- `PromptLibrary` centralizes versioned prompts for research, generation, scoring, and revision.
- `SourceIngestionService` imports local notes and text-like files with heuristic fact extraction.
- `BackendHealthService` checks the configured OpenAI-compatible backend before generation.
- `ApprovalService` creates immutable approved script snapshots.
- `ExportService` renders approved scripts to Markdown without posting anywhere.

## Verification Note

`swift test` is currently blocked on this machine by a Command Line Tools SwiftPM/SDK mismatch before package code compiles. A lightweight syntax parse has been used as the local guard:

```sh
swiftc -parse Sources/ScriptEditorCore/*.swift Sources/ScriptEditorApp/*.swift Tests/ScriptEditorCoreTests/*.swift
```
