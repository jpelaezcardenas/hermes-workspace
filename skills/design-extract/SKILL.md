---
name: design-extract
description: Use designlang/design-extract to extract live website design systems, DTCG tokens, Tailwind/shadcn/Figma variables, design reports, prompt packs, and UI reconstruction guidance from explicit URLs.
---

# Design Extract / designlang

Vendored source: `external/design-extract`.
Upstream: https://github.com/Manavarya09/design-extract
NPM package/bin: `designlang`.
License: MIT.

Primary commands from the workspace root:

```bash
pnpm exec designlang https://example.com
pnpm exec designlang --full https://example.com
pnpm exec designlang verify example.com
pnpm exec designlang pack example.com
pnpm exec designlang brand example.com
```

Outputs are written to `design-extract-output/` by default.

Use when the user asks to extract, clone, audit, compare, or translate a visual design system. Use explicit URLs only. For private or authenticated pages, ask for a safe exported/static target or authenticated browser context first.
