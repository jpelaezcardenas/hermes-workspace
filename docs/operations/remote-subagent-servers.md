# Remote subagent servers on the Hermes C&C status page

The pve2 Hermes C&C status page at `http://192.168.1.140:9120/` is served by the Python systemd service `hermes-backup-status.service`.
It includes a **Remote subagent servers** section for LAN Hermes helper nodes and Ollama Cloud model switching.

## Runtime files on pve2

- Status page service: `hermes-backup-status.service`
- Runtime server file: `/mnt/pve/LocalDir/hermes-critical/pve2/hermes-backup-status-server.py`
- Installed service path: `/usr/local/lib/hermes-backup-status-server.py`
- Generic status checker: `/usr/local/sbin/hermes-subagent-status.py`
- Model selection state: `/etc/hermes-subagent-models.json`
- Per-host status JSON, in fallback order:
  - `/var/lib/hermes-subagent-219/status.json`
  - `/var/lib/hermes-subagent-211/status.json`
  - `/var/lib/hermes-subagent-151/status.json`
  - `/var/lib/hermes-subagent-108/status.json`

The repository keeps source snapshots in `scripts/status-page/` so changes can be reviewed and pushed instead of living only as ad-hoc host files.

## Registered servers

| ID | Host | Name | Role |
| --- | --- | --- | --- |
| `219` | `192.168.1.219` | `PiBench` | Primary/first fallback Hermes remote subagent host; SSH user `blackscience`, commands run with sudo-root for Hermes config |
| `211` | `192.168.1.211` | `Pxvirt` | Proxmox/Pi5 host running Hermes as root with `RPI5_01_*` SSH credentials |
| `151` | `192.168.1.151` | `DietPi` | Hermes remote subagent host installed on DietPi/Debian 12 |
| `108` | `192.168.1.108` | `DietGTX780Ti` | Existing Hermes remote subagent host |

All servers are configured to use Ollama Cloud:

```yaml
model:
  provider: ollama-cloud
  default: qwen3-next:80b
  base_url: ''

delegation:
  provider: ollama-cloud
  model: qwen3-next:80b
  base_url: ''
  api_key: ''
  api_mode: chat_completions
```

`OLLAMA_API_KEY` lives in each host's `/root/.hermes/.env`; do not copy or print secret values in logs or docs.

## Status timers

Each server has its own status timer. The checker probes ping, SSH, Hermes install/config, and an Ollama Cloud chat-completion smoke test.

```bash
systemctl status hermes-219-subagent-status.timer hermes-211-subagent-status.timer hermes-151-subagent-status.timer hermes-108-subagent-status.timer --no-pager
systemctl start hermes-219-subagent-status.service hermes-211-subagent-status.service hermes-151-subagent-status.service hermes-108-subagent-status.service
```

Expected JSON readiness after a healthy run:

```json
{
  "ready": true,
  "summary": "ready",
  "desired_provider": "ollama-cloud",
  "desired_model": "qwen3-next:80b",
  "ssh_ok": true,
  "hermes_ok": true,
  "ollama_cloud_ok": true
}
```

## HTTP endpoints

- `/remote-subagents.json` returns all registered remote subagent statuses.
- `/subagent-219.json` returns the PiBench primary fallback status.
- `/subagent-211.json` returns the Pxvirt status.
- `/subagent-151.json` returns the DietPi status.
- `/subagent-108.json` returns the DietGTX780Ti status.
- `/subagent-status.json` remains backward compatible with the original 108 status.
- `/set-subagent-model` is a POST endpoint used by the Web UI model selector.

## Verified Ollama Cloud models

The Web UI only offers models that were scanned with the active Ollama Cloud account and verified to answer a Hermes smoke test:

- `qwen3-next:80b`
- `glm-4.6:latest`
- `gpt-oss:20b`

Models such as `qwen3:8b` and `glm-4.5:latest` returned HTTP 404 in this environment and should not be offered unless a future scan verifies them.

## Model switching contract

Changing a model in the Web UI must update the selected remote server's live Hermes config, not just local desired state.

For the selected server, `/set-subagent-model` must SSH to the host and run:

```bash
hermes config set model.provider ollama-cloud
hermes config set model.default '<model>'
hermes config set model.base_url ''
hermes config set delegation.provider ollama-cloud
hermes config set delegation.model '<model>'
hermes config set delegation.base_url ''
hermes config set delegation.api_key ''
hermes config set delegation.api_mode chat_completions
```

After applying, the remote command reads back `hermes config` / `config.yaml` and fails unless the selected model/provider are present in both the `model` and `delegation` blocks. A Web UI success response therefore means the remote Hermes config picked up the change.

## Verification checklist after changes

```bash
python3 -m py_compile /mnt/pve/LocalDir/hermes-critical/pve2/hermes-backup-status-server.py /usr/local/sbin/hermes-subagent-status.py
systemctl restart hermes-backup-status.service
systemctl is-active hermes-backup-status.service
systemctl start hermes-219-subagent-status.service hermes-211-subagent-status.service hermes-151-subagent-status.service hermes-108-subagent-status.service
python3 - <<'PY'
import json, urllib.request
for path in ['/remote-subagents.json', '/subagent-219.json', '/subagent-211.json', '/subagent-151.json', '/subagent-108.json']:
    data = json.load(urllib.request.urlopen('http://127.0.0.1:9120' + path, timeout=10))
    print(path, data if path != '/remote-subagents.json' else data.keys())
PY
```

Also verify the LAN UI contains `Remote subagent servers`, all registered host IPs, all verified model options, and `/set-subagent-model`.

## One-shot helper

`/usr/local/bin/hermes-151-subagent` runs a prompt on the DietPi remote Hermes instance:

```bash
hermes-151-subagent 'Reply exactly OK'
```

The helper uses the private DietPi credential env file and refreshes the 151 status checker after the run.
