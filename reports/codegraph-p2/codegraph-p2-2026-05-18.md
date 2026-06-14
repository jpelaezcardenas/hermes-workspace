# CodeGraph P2 Sandbox Report - 2026-05-18

## Kurzfazit

CodeGraph works as a local codebase map in a safe sandbox and is useful enough to keep as a guarded Hermes skill. It should not be installed globally or wired as an MCP server yet.

## What Was Tested

Public repo:

`https://github.com/colbymchenry/codegraph`

Sandbox:

`/Users/zondrius/hermes-workspace/integration-tests/codegraph-p2`

Commands tested:

```bash
npx -y @colbymchenry/codegraph@0.7.9 init -i codegraph-public
npx -y @colbymchenry/codegraph@0.7.9 status codegraph-public
npx -y @colbymchenry/codegraph@0.7.9 files --path codegraph-public
npx -y @colbymchenry/codegraph@0.7.9 query --path codegraph-public "CodeGraph"
npx -y @colbymchenry/codegraph@0.7.9 context --path codegraph-public --max-nodes 20 --max-code 4 "How does CodeGraph indexing work and where should a developer start reading?"
```

## Result

- Index succeeded.
- 113 files indexed.
- 1,650 nodes.
- 4,292 edges in status output.
- DB size: 3.91 MB.
- Languages: TypeScript and JavaScript.
- Generated context file:
  `/Users/zondrius/hermes-workspace/integration-tests/codegraph-p2/codegraph-context-indexing.md`

## Useful Output

For the indexing question, CodeGraph identified:

- `src/index.ts` with the `CodeGraph` class;
- `src/extraction/index.ts` with `indexAll` and `indexFiles`;
- `IndexResult` and `IndexOptions` as relevant types.

This is exactly the kind of compact orientation Hermes/Codex can use before deeper code reading.

## Problems Found

1. macOS used the WASM SQLite fallback because native `better-sqlite3` could not load.
2. Running multiple CodeGraph commands in parallel against the same repo produced `database is locked`.
3. `npm audit --omit=dev` reports one production vulnerability via `picomatch`.
4. Full audit reports additional dev dependency warnings.

## Integration Decision

Integrated as guarded Hermes skill:

`/Users/zondrius/.hermes/skills/software-development/codegraph-codebase-map/SKILL.md`

Not done:

- no global install;
- no MCP server;
- no private repo test;
- no Codex/Hermes config mutation;
- no `codegraph install`.

## Example Use

For a future public frontend repo:

```bash
mkdir -p /Users/zondrius/hermes-workspace/integration-tests/codegraph-p2
cd /Users/zondrius/hermes-workspace/integration-tests/codegraph-p2
git clone --depth 1 <public-repo-url> repo
npx -y @colbymchenry/codegraph@0.7.9 init -i repo
npx -y @colbymchenry/codegraph@0.7.9 context --path repo --max-nodes 20 --max-code 4 "Where is the main app shell and child-facing route implemented?"
```

## Verdict

Yellow-green. Useful, but keep sandboxed.

Best next step:

Run one more P2 example on a public React/Vite app to see whether it helps with frontend orientation similar to Lernwerkstatt/LeseWerk.

