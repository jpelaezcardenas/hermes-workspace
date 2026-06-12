# designlang — Design Regression Guard

GitHub Action that runs `designlang` on every pull request, diffs the extracted design tokens against a committed baseline, and comments the changes.

## Example workflow

```yaml
name: Design Regression Guard

on:
  pull_request:
    paths:
      - 'src/**'
      - 'app/**'
      - 'tailwind.config.*'

jobs:
  design-diff:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - uses: Manavarya09/design-extract/github-action@v1
        with:
          url: https://preview-${{ github.event.number }}.yoursite.dev
          baseline: ./design-tokens.baseline.json
          fail-on-change: false
```

## Inputs

| Name | Required | Default | Description |
|------|----------|---------|-------------|
| `url` | ✅ | — | URL to extract from. Typically a PR preview deploy. |
| `baseline` | ✅ | — | Path to the committed baseline tokens file. |
| `comment` | | `true` | Post a PR comment with the diff. |
| `fail-on-change` | | `false` | Fail the job if any token changed. |
| `full` | | `false` | Pass `--full` to `designlang`. |
| `extra-args` | | — | Extra CLI args. |

## Outputs

- `changed` — `true`/`false`
- `changed-count` — number of changed tokens
- `diff-path` — path to the generated diff markdown

## Publishing

```bash
git tag v1 && git push --tags
```

Then list on the GitHub Marketplace via the repo's Actions tab.
