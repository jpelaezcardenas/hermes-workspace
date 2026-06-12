---
name: mythos-research
description: Use the vendored Mythos Research Edition scaffold for authorized, source-available vulnerability self-audits, defensive security review, sink-guided triage, and coordinated-disclosure preparation. Never use for unauthorized targets or mass scanning.
---

# Mythos Research Edition

Vendored source: `external/mythos-research`.
Upstream: https://github.com/Keyvanhardani/mythos-research
License: Apache-2.0.

Use only for authorized defensive review of repositories the user owns or is permitted to audit.
Default to read-only source inspection and coordinated disclosure.

Quick commands from the workspace root:

```bash
bash external/mythos-research/scripts/mythos-v3.sh /path/to/target --skip-exec
bash external/mythos-research/scripts/mythos-v3.sh /path/to/target --max-files 8 --budget 3.00
bash external/mythos-research/scripts/mythos-targeted.sh /path/to/target /path/to/files.txt
```

Operating rules:
1. Confirm authorization and target scope before running any audit.
2. Prefer `--skip-exec` unless the user explicitly authorizes validation beyond static review.
3. Treat targets as read-only; do not patch audited code during the hunt pass.
4. Report HIGH/CRITICAL candidates first, clearly marked as candidates until validated.
5. Follow coordinated-disclosure practice for any real finding.
