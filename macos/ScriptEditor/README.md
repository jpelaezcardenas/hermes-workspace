# Native Script Editor

Standalone SwiftUI macOS app for developing short-form video scripts from research through human revision. The app is independent from Hermes and defaults to a local OpenAI-compatible Qwen endpoint.

## Run

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
2. Add research from notes, URLs, or search snippets.
3. Build a structured research brief with insights, claims, angles, tensions, and citations.
4. Generate 20-40 short-form script candidates.
5. Score every candidate with the idea and execution rubric.
6. Review only the top 10 candidates.
7. Edit the selected script manually with side-agent revision assistance.

V1 intentionally stops at approved scripts. Exporting and posting automation stay out of scope until the research, writing, and revision workflow feels strong.
