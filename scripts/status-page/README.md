# pve2 Hermes C&C status-page scripts

This directory contains repository snapshots of the Python-backed status-page utilities that run on pve2.

Runtime deployment paths:

- `hermes-backup-status-server.py` -> `/mnt/pve/LocalDir/hermes-critical/pve2/hermes-backup-status-server.py` and `/usr/local/lib/hermes-backup-status-server.py`
- `hermes-subagent-status.py` -> `/usr/local/sbin/hermes-subagent-status.py`
- `hermes-151-subagent` -> `/usr/local/bin/hermes-151-subagent`

The live service is `hermes-backup-status.service` on port `9120`.

The Remote subagent servers panel tracks:

- `219`: `192.168.1.219` / PiBench
- `211`: `192.168.1.211` / Pxvirt
- `151`: `192.168.1.151` / DietPi
- `108`: `192.168.1.108` / DietGTX780Ti

The model selector is intentionally constrained to Ollama Cloud models verified with the active account:

- `qwen3-next:80b`
- `glm-4.6:latest`
- `gpt-oss:20b`

When a user applies a model in the Web UI, `/set-subagent-model` must update the selected remote host's Hermes config and verify the effective config before returning success. See `../../docs/operations/remote-subagent-servers.md` for the full runbook.
