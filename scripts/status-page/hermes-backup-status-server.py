#!/usr/bin/env python3
import html
import json
import os
import pathlib
import re
import shlex
import shutil
import subprocess
import time
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

STATUS_PATH = pathlib.Path(os.environ.get("HERMES_BACKUP_STATUS", "/var/lib/hermes-backup/status.json"))
BACKUP_ROOT = pathlib.Path(os.environ.get("HERMES_BACKUP_ROOT", "/mnt/qnas-hermes-backups/hermes-pve2"))
PORT = int(os.environ.get("HERMES_BACKUP_STATUS_PORT", "9120"))
HOST = os.environ.get("HERMES_BACKUP_STATUS_HOST", "0.0.0.0")
BACKUP_UNIT = os.environ.get("HERMES_BACKUP_UNIT", "hermes-qnas-backup.service")
HOST_108_IP = os.environ.get("HERMES_108_HOST", "192.168.1.108")
HOST_108_NAME = os.environ.get("HERMES_108_NAME", "DietGTX780Ti")
HOST_108_WAKE_CMD = os.environ.get("HERMES_108_WAKE_CMD", "/usr/local/bin/wake-dietgtx780ti")
HOST_108_CRED_ENV = pathlib.Path(os.environ.get("HERMES_108_CRED_ENV", "/mnt/pve/LocalDir/hermes-critical/pve2/hermes-home/private/hermes_slave.env"))
HOST_108_SLEEP_WAIT_SECONDS = int(os.environ.get("HERMES_108_SLEEP_WAIT_SECONDS", "90"))
HOST_108_FAN_CMD = os.environ.get("HERMES_108_FAN_CMD", "/usr/local/sbin/hermes-fan-control")
SUBAGENT_STATUS_PATH = pathlib.Path(os.environ.get("HERMES_108_SUBAGENT_STATUS", "/var/lib/hermes-subagent-108/status.json"))
CLOUDFLARE_NS_STATUS_PATH = pathlib.Path(os.environ.get("HERMES_CLOUDFLARE_NS_STATUS", "/var/lib/hermes-cloudflare-ns/status.json"))
SETTINGS_PATH = pathlib.Path(os.environ.get("HERMES_BACKUP_SETTINGS", "/etc/hermes-qnas-backup-settings.json"))
ENV_PATH = pathlib.Path(os.environ.get("HERMES_BACKUP_ENV", "/etc/default/hermes-qnas-backup"))
TIMER_PATH = pathlib.Path(os.environ.get("HERMES_BACKUP_TIMER_UNIT", "/etc/systemd/system/hermes-qnas-backup.timer"))
DEFAULT_SETTINGS = {"retention_count": 14, "schedule": "*-*-* 03:20:00", "randomized_delay": "20m", "timer_enabled": True}
APP_TITLE = "Hermes C&C Interface"
GIT_STATUS_REPO = pathlib.Path(os.environ.get("HERMES_STATUS_GIT_REPO", "/root/hermes-workspace"))
HOST_151_IP = os.environ.get("HERMES_151_HOST", "192.168.1.151")
HOST_151_NAME = os.environ.get("HERMES_151_NAME", "DietPi")
HOST_151_CRED_ENV = pathlib.Path(os.environ.get("HERMES_151_CRED_ENV", "/mnt/pve/LocalDir/hermes-critical/pve2/hermes-home/private/dietpi.env"))
SUBAGENT_151_STATUS_PATH = pathlib.Path(os.environ.get("HERMES_151_SUBAGENT_STATUS", "/var/lib/hermes-subagent-151/status.json"))
SUBAGENT_MODEL_STATE_PATH = pathlib.Path(os.environ.get("HERMES_SUBAGENT_MODEL_STATE", "/etc/hermes-subagent-models.json"))
WORKING_OLLAMA_CLOUD_MODELS = [
    {"model": "qwen3-next:80b", "label": "Qwen3 Next 80B (verified OK)"},
    {"model": "glm-4.6:latest", "label": "GLM 4.6 latest (verified OK)"},
    {"model": "gpt-oss:20b", "label": "gpt-oss 20B (verified OK)"},
]
SUBAGENT_SERVERS = {
    "108": {"id": "108", "name": HOST_108_NAME, "ip": HOST_108_IP, "cred_env": HOST_108_CRED_ENV, "status_path": SUBAGENT_STATUS_PATH, "helper": "hermes-108-subagent"},
    "151": {"id": "151", "name": HOST_151_NAME, "ip": HOST_151_IP, "cred_env": HOST_151_CRED_ENV, "status_path": SUBAGENT_151_STATUS_PATH, "helper": "hermes-151-subagent"},
}

CSS = """
body{font-family:system-ui,-apple-system,Segoe UI,sans-serif;background:#0b1020;color:#e5e7eb;margin:0;padding:2rem;}
.card{max-width:960px;margin:auto;background:#111827;border:1px solid #374151;border-radius:16px;padding:1.5rem;box-shadow:0 20px 50px #0008;}
h1{margin-top:0}.ok{color:#34d399}.bad{color:#f87171}.run{color:#fbbf24}.muted{color:#9ca3af}
table{border-collapse:collapse;width:100%;margin-top:1rem}td,th{padding:.55rem;border-bottom:1px solid #374151;text-align:left}code{background:#020617;padding:.15rem .35rem;border-radius:6px}a{color:#93c5fd}
.pill{display:inline-block;padding:.2rem .6rem;border-radius:999px;background:#1f2937}.grid{display:grid;grid-template-columns:180px 1fr;gap:.5rem}.small{font-size:.9rem}
.actions{margin:1rem 0 1.25rem 0;display:flex;gap:.75rem;align-items:center;flex-wrap:wrap}
button{background:#2563eb;color:white;border:0;border-radius:10px;padding:.65rem 1rem;font-weight:700;cursor:pointer}button:hover{background:#1d4ed8}button:disabled{background:#374151;color:#9ca3af;cursor:not-allowed}
button.warn{background:#b45309}button.warn:hover{background:#92400e}
button.danger{background:#991b1b;padding:.4rem .65rem;font-size:.85rem}button.danger:hover{background:#7f1d1d}
.delete-form{margin:0}.path-cell{word-break:break-all}.actions-cell{white-space:nowrap}
.notice{padding:.7rem .9rem;border:1px solid #374151;border-radius:10px;background:#0f172a;margin:.75rem 0}.notice.ok{border-color:#065f46}.notice.bad{border-color:#7f1d1d}
.host-card{border:1px solid #374151;border-radius:14px;background:#0f172a;padding:1rem;margin:1rem 0 1.25rem 0}.host-head{display:flex;justify-content:space-between;gap:1rem;align-items:center;flex-wrap:wrap}.host-state{display:flex;gap:.55rem;align-items:center}.led{display:inline-block;width:.85rem;height:.85rem;border-radius:999px;background:#6b7280;box-shadow:0 0 12px #6b728055}.led.online{background:#34d399;box-shadow:0 0 16px #34d399cc}.led.offline{background:#ef4444;box-shadow:0 0 16px #ef4444aa}.led.checking{background:#fbbf24;box-shadow:0 0 16px #fbbf24aa}
.progress-card{border:1px solid #374151;border-radius:14px;background:#0f172a;padding:1rem;margin:1rem 0 1.25rem 0}
.progress-head{display:flex;justify-content:space-between;gap:1rem;align-items:baseline;margin-bottom:.55rem}
.progress-track{height:18px;background:#020617;border:1px solid #374151;border-radius:999px;overflow:hidden;position:relative}
.progress-fill{height:100%;width:0%;border-radius:999px;background:linear-gradient(90deg,#2563eb,#06b6d4,#34d399);transition:width .7s ease;position:relative;overflow:hidden}
.progress-fill:after{content:"";position:absolute;inset:0;background:linear-gradient(110deg,transparent 0%,rgba(255,255,255,.35) 45%,transparent 70%);animation:shine 1.1s linear infinite}
.progress-fill.indeterminate{width:42%;animation:indeterminate 1.2s ease-in-out infinite}
.progress-meta{margin-top:.6rem;display:flex;justify-content:space-between;gap:1rem;flex-wrap:wrap}
.stage-list{margin:.7rem 0 0 0;padding-left:1.1rem;color:#9ca3af}.stage-list li.done{color:#34d399}.stage-list li.current{color:#fbbf24;font-weight:700}
@keyframes shine{from{transform:translateX(-100%)}to{transform:translateX(100%)}}
@keyframes indeterminate{0%{transform:translateX(-110%)}50%{transform:translateX(80%)}100%{transform:translateX(240%)}}
.nav{display:flex;gap:.75rem;flex-wrap:wrap;margin:.75rem 0 1rem}.nav a{background:#1f2937;border:1px solid #374151;border-radius:10px;padding:.45rem .7rem;text-decoration:none}.settings-form{display:grid;grid-template-columns:220px 1fr;gap:.75rem;align-items:center}.settings-form input,.model-form select{background:#020617;color:#e5e7eb;border:1px solid #374151;border-radius:8px;padding:.45rem}.settings-form .full{grid-column:1 / -1}.model-form{display:flex;gap:.5rem;flex-wrap:wrap;align-items:center;margin-top:.75rem}.model-form select{min-width:260px}.settings-form button{justify-self:start}
.fan-panel{border-top:1px solid #374151;margin-top:1rem;padding-top:1rem}.fan-row{display:grid;grid-template-columns:150px 1fr 70px;gap:.75rem;align-items:center}.fan-row input[type=range]{width:100%;accent-color:#38bdf8}.fan-readout{display:grid;grid-template-columns:150px 1fr;gap:.35rem .75rem;margin-top:.75rem}
details.panel{border:1px solid #374151;border-radius:14px;background:#0f172a;margin:1rem 0 1.25rem 0;overflow:hidden}details.panel>summary{list-style:none;cursor:pointer;padding:.85rem 1rem;font-weight:800;display:flex;justify-content:space-between;align-items:center;background:#111827}details.panel>summary::-webkit-details-marker{display:none}details.panel>summary:after{content:"−";color:#9ca3af;font-size:1.15rem}details.panel:not([open])>summary:after{content:"+"}details.panel>.panel-body{padding:1rem}.git-clean{color:#34d399}.git-dirty{color:#fbbf24}.git-bad{color:#f87171}
"""

SCRIPT = """
<script>
const STAGES = [
  'Starting', 'Mounting QNAS / collecting metadata', 'Backing up SQLite DBs',
  'Archiving Hermes config/state', 'Backing up snapshot metadata',
  'Backing up Honcho/Postgres', 'Writing manifest/checksums',
  'Copying backup set to QNAS', 'Completed'
];
function esc(s){return String(s ?? '').replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));}
function renderStages(currentIndex, state){
  const ol = document.getElementById('stageList');
  if(!ol) return;
  ol.innerHTML = STAGES.map((name, i) => {
    let cls = '';
    if(state === 'success') cls = 'done';
    else if(state === 'running' && i < currentIndex) cls = 'done';
    else if(state === 'running' && i === currentIndex) cls = 'current';
    return `<li class="${cls}">${esc(name)}</li>`;
  }).join('');
}
async function refreshHost108(){
  const led = document.getElementById('host108Led');
  const label = document.getElementById('host108Label');
  const detail = document.getElementById('host108Detail');
  const checked = document.getElementById('host108Checked');
  try{
    if(led){ led.className = 'led checking'; }
    if(label) label.textContent = 'checking…';
    const r = await fetch('/host-108.json?ts=' + Date.now(), {cache:'no-store'});
    const p = await r.json();
    const online = !!p.online;
    if(led){ led.className = 'led ' + (online ? 'online' : 'offline'); }
    if(label){ label.textContent = online ? 'online' : 'offline'; label.className = online ? 'ok' : 'bad'; }
    if(detail) detail.textContent = p.summary || '';
    if(checked) checked.textContent = p.checked_at || '';
  }catch(e){
    if(led){ led.className = 'led offline'; }
    if(label){ label.textContent = 'unknown'; label.className = 'bad'; }
    if(detail) detail.textContent = 'Could not check host: ' + e;
  }
  setTimeout(refreshHost108, 10000);
}
async function refreshFan108(){
  const temp = document.getElementById('fan108Temp');
  const req = document.getElementById('fan108Requested');
  const app = document.getElementById('fan108Applied');
  const rpm = document.getElementById('fan108Rpm');
  const safety = document.getElementById('fan108Safety');
  const slider = document.getElementById('fan108Slider');
  const value = document.getElementById('fan108SliderValue');
  const detail = document.getElementById('fan108Status');
  try{
    const r = await fetch('/fan-108.json?ts=' + Date.now(), {cache:'no-store'});
    const p = await r.json();
    if(!p.ok){ throw new Error(p.error || 'fan status failed'); }
    if(temp) temp.textContent = `${p.cpu_temp_c} °C`;
    if(req) req.textContent = `${p.requested_percent}%`;
    if(app) app.textContent = `${p.applied_percent}%`;
    if(rpm) rpm.textContent = `${p.fan_rpm || 'unknown'} RPM`;
    if(safety){ safety.textContent = p.safety_active ? 'active — raised above requested speed' : 'idle'; safety.className = p.safety_active ? 'run' : 'ok'; }
    if(slider && document.activeElement !== slider) slider.value = p.requested_percent;
    if(value && document.activeElement !== slider) value.textContent = `${p.requested_percent}%`;
    if(detail) detail.textContent = `Last updated: ${p.updated_at || ''}. Guard clamps speed to keep CPU below 70 °C.`;
  }catch(e){
    if(detail) detail.textContent = 'Could not refresh fan status: ' + e;
  }
  setTimeout(refreshFan108, 5000);
}
async function refreshProgress(){
  try{
    const r = await fetch('/progress.json?ts=' + Date.now(), {cache:'no-store'});
    const p = await r.json();
    const fill = document.getElementById('progressFill');
    const pct = document.getElementById('progressPercent');
    const stage = document.getElementById('progressStage');
    const details = document.getElementById('progressDetails');
    const statePill = document.getElementById('statePill');
    const runId = document.getElementById('runId');
    const duration = document.getElementById('duration');
    const size = document.getElementById('size');
    const btn = document.getElementById('backupButton');
    const unit = document.getElementById('unitState');
    const running = p.running || p.state === 'running';
    if(fill){
      fill.classList.toggle('indeterminate', running && (p.progress_percent ?? 0) < 10);
      fill.style.width = Math.max(0, Math.min(100, p.progress_percent || 0)) + '%';
    }
    if(pct) pct.textContent = (p.progress_percent ?? 0) + '%';
    if(stage) stage.textContent = p.stage || p.message || p.state || 'unknown';
    if(details) details.textContent = p.message || '';
    if(statePill){ statePill.textContent = p.state || 'unknown'; statePill.className = 'pill ' + (p.state === 'success' ? 'ok' : (p.state === 'failed' || p.state === 'error') ? 'bad' : 'run'); }
    if(runId) runId.textContent = p.run_id || '';
    if(duration) duration.textContent = (p.duration_seconds ?? '') + ' seconds';
    if(size) size.textContent = p.backup_size_human || 'unknown';
    if(unit) unit.textContent = `${p.unit_active || 'unknown'} / ${p.unit_sub || 'unknown'}`;
    if(btn){ btn.disabled = running; btn.textContent = running ? 'Backup running…' : 'Back up now'; }
    renderStages(p.stage_index || 0, p.state || 'unknown');
    if(running) setTimeout(refreshProgress, 2000);
    else setTimeout(refreshProgress, 10000);
  }catch(e){
    const stage = document.getElementById('progressStage');
    if(stage) stage.textContent = 'Could not refresh progress: ' + e;
    setTimeout(refreshProgress, 10000);
  }
}
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('backupForm');
  if(form){
    form.addEventListener('submit', () => {
      const btn = document.getElementById('backupButton');
      const fill = document.getElementById('progressFill');
      const stage = document.getElementById('progressStage');
      const pct = document.getElementById('progressPercent');
      if(btn){ btn.disabled = true; btn.textContent = 'Starting backup…'; }
      if(fill){ fill.classList.add('indeterminate'); fill.style.width = '12%'; }
      if(stage) stage.textContent = 'Starting backup request…';
      if(pct) pct.textContent = 'starting';
    });
  }
  const wakeForm = document.getElementById('wake108Form');
  if(wakeForm){
    wakeForm.addEventListener('submit', () => {
      const btn = document.getElementById('wake108Button');
      const detail = document.getElementById('host108Detail');
      if(btn){ btn.disabled = true; btn.textContent = 'Trying Wi-Fi wake…'; }
      if(detail) detail.textContent = 'Trying Wi-Fi WoWLAN packets for up to 3 minutes. If it does not wake, press the physical side power button.';
    });
  }
  const sleepForm = document.getElementById('sleepWake108Form');
  if(sleepForm){
    sleepForm.addEventListener('submit', () => {
      const btn = document.getElementById('sleepWake108Button');
      const detail = document.getElementById('host108Detail');
      if(btn){ btn.disabled = true; btn.textContent = 'Sleeping…'; }
      if(detail) detail.textContent = 'Requesting deep suspend. Wake this PC with the physical power button.';
    });
  }
  const fanForm = document.getElementById('fan108Form');
  const fanSlider = document.getElementById('fan108Slider');
  const fanValue = document.getElementById('fan108SliderValue');
  if(fanSlider && fanValue){
    fanSlider.addEventListener('input', () => { fanValue.textContent = `${fanSlider.value}%`; });
  }
  if(fanForm){
    fanForm.addEventListener('submit', () => {
      const btn = document.getElementById('fan108Button');
      const detail = document.getElementById('fan108Status');
      if(btn){ btn.disabled = true; btn.textContent = 'Applying…'; }
      if(detail) detail.textContent = 'Applying guarded fan speed. Safety guard may raise it if CPU is warm.';
    });
  }
  refreshProgress();
  refreshHost108();
  refreshFan108();
});
</script>
"""

STAGE_RULES = [
    ("failed", 100, 8, "Failed"),
    ("success", 100, 8, "Completed"),
    ("copying completed backup set", 88, 7, "Copying backup set to QNAS"),
    ("writing manifest", 76, 6, "Writing manifest/checksums"),
    ("honcho", 62, 5, "Backing up Honcho/Postgres"),
    ("snapshot metadata", 50, 4, "Backing up snapshot metadata"),
    ("creating hermes config", 38, 3, "Archiving Hermes config/state"),
    ("sqlite", 26, 2, "Backing up SQLite DBs"),
    ("qnas mounted", 16, 1, "Mounting QNAS / collecting metadata"),
    ("starting", 6, 0, "Starting"),
]

def read_status():
    if not STATUS_PATH.exists():
        return {"state":"unknown","message":"No backup status file exists yet.","updated_at":"never"}
    try:
        return json.loads(STATUS_PATH.read_text())
    except Exception as e:
        return {"state":"error","message":f"Could not read status: {e}","updated_at":"unknown"}

def read_subagent_status():
    return read_subagent_status_for("108")

def read_subagent_status_for(server_id):
    cfg = SUBAGENT_SERVERS.get(str(server_id))
    if not cfg:
        return {"ready": False, "summary": f"Unknown subagent server {server_id}"}
    path = cfg["status_path"]
    if not path.exists():
        return {"ready": False, "server_id": cfg["id"], "server": cfg["ip"], "name": cfg["name"], "summary": f"No {cfg['ip']} subagent status has been recorded yet."}
    try:
        data = json.loads(path.read_text())
        data.setdefault("server_id", cfg["id"])
        data.setdefault("server", cfg["ip"])
        data.setdefault("name", cfg["name"])
        return data
    except Exception as e:
        return {"ready": False, "server_id": cfg["id"], "server": cfg["ip"], "name": cfg["name"], "summary": f"Could not read subagent status: {e}"}

def all_subagent_statuses():
    return {sid: read_subagent_status_for(sid) for sid in SUBAGENT_SERVERS}

def read_subagent_model_state():
    try:
        data = json.loads(SUBAGENT_MODEL_STATE_PATH.read_text())
        return data if isinstance(data, dict) else {}
    except Exception:
        return {}

def write_subagent_model_state(server_id, model):
    data = read_subagent_model_state()
    data[str(server_id)] = model
    SUBAGENT_MODEL_STATE_PATH.parent.mkdir(parents=True, exist_ok=True)
    SUBAGENT_MODEL_STATE_PATH.write_text(json.dumps(data, indent=2) + "\n")

def _read_env_file(path):
    data = {}
    if not pathlib.Path(path).exists():
        raise RuntimeError(f"Credential env file not found: {path}")
    for line in pathlib.Path(path).read_text(errors="replace").splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        k, v = line.split("=", 1)
        data[k.strip()] = v.strip().strip(chr(34)).strip(chr(39))
    return data

def _ssh_command_for_server(server_id, remote_script):
    cfg = SUBAGENT_SERVERS.get(str(server_id))
    if not cfg:
        raise RuntimeError(f"Unknown subagent server {server_id}")
    creds = _read_env_file(cfg["cred_env"])
    host = creds.get("DIETPI_HOST") or creds.get("HERMES_MASTER_HOST") or cfg["ip"]
    user = creds.get("DIETPI_USER") or creds.get("HERMES_MASTER_USER") or "root"
    port = creds.get("DIETPI_PORT") or creds.get("HERMES_MASTER_PORT") or "22"
    password = creds.get("DIETPI_PASSWORD") or creds.get("HERMES_MASTER_PASSWORD") or ""
    if not password:
        raise RuntimeError(f"No SSH password found in {cfg['cred_env']}")
    env = os.environ.copy()
    env["SSHPASS"] = password
    cmd = ["sshpass", "-e", "ssh", "-o", "BatchMode=no", "-o", "StrictHostKeyChecking=accept-new", "-o", "ConnectTimeout=6", "-p", str(port), f"{user}@{host}", remote_script]
    return cmd, env

def set_subagent_model(server_id, model):
    server_id = str(server_id)
    model = (model or "").strip()
    allowed = {m["model"] for m in WORKING_OLLAMA_CLOUD_MODELS}
    if server_id not in SUBAGENT_SERVERS:
        return False, f"Unknown subagent server {server_id}."
    if model not in allowed:
        return False, f"Model {model!r} is not in the verified Ollama Cloud model list."
    write_subagent_model_state(server_id, model)
    quoted_model = shlex.quote(model)
    remote = f"""
set -e
HERMES_BIN=$(command -v hermes || command -v /root/.local/bin/hermes || true)
if [ -z "$HERMES_BIN" ]; then echo "Hermes is not installed on this server" >&2; exit 20; fi
"$HERMES_BIN" config set model.provider ollama-cloud
"$HERMES_BIN" config set model.default {quoted_model}
"$HERMES_BIN" config set model.base_url ''
"$HERMES_BIN" config set delegation.provider ollama-cloud
"$HERMES_BIN" config set delegation.model {quoted_model}
"$HERMES_BIN" config set delegation.base_url ''
"$HERMES_BIN" config set delegation.api_key ''
"$HERMES_BIN" config set delegation.api_mode chat_completions
CONFIG_PATH=$("$HERMES_BIN" config path)
MODEL_BLOCK=$(sed -n '/^model:/,/^[^[:space:]]/p' "$CONFIG_PATH")
DELEGATION_BLOCK=$(sed -n '/^delegation:/,/^[^[:space:]]/p' "$CONFIG_PATH")
printf '%s\n' "$MODEL_BLOCK" | grep -Fq 'provider: ollama-cloud'
printf '%s\n' "$MODEL_BLOCK" | grep -Fq "default: {model}"
printf '%s\n' "$DELEGATION_BLOCK" | grep -Fq 'provider: ollama-cloud'
printf '%s\n' "$DELEGATION_BLOCK" | grep -Fq "model: {model}"
printf '%s\n' "$DELEGATION_BLOCK" | grep -Fq 'api_mode: chat_completions'
echo HERMES_CONFIG_PICKED_UP
"""
    try:
        cmd, env = _ssh_command_for_server(server_id, remote)
        result = subprocess.run(cmd, capture_output=True, text=True, timeout=60, env=env)
        if result.returncode != 0:
            msg = (result.stderr or result.stdout or f"ssh exited {result.returncode}").strip()
            return False, f"Saved desired model locally, but remote update failed for {SUBAGENT_SERVERS[server_id]['ip']}: {msg}"
        subprocess.run(["systemctl", "start", f"hermes-{server_id}-subagent-status.service"], capture_output=True, text=True, timeout=5)
        return True, f"Set {SUBAGENT_SERVERS[server_id]['name']} ({SUBAGENT_SERVERS[server_id]['ip']}) to ollama-cloud / {model}."
    except Exception as e:
        return False, f"Saved desired model locally, but remote update failed for {SUBAGENT_SERVERS[server_id]['ip']}: {e}"

def read_cloudflare_ns_status():
    if not CLOUDFLARE_NS_STATUS_PATH.exists():
        return {"ok": False, "message": "No Cloudflare/one.com nameserver status has been recorded yet.", "checked_at": "never"}
    try:
        return json.loads(CLOUDFLARE_NS_STATUS_PATH.read_text())
    except Exception as e:
        return {"ok": False, "message": f"Could not read Cloudflare nameserver status: {e}", "checked_at": "unknown", "errors": [str(e)]}

def list_backups():
    bdir = BACKUP_ROOT / "backups"
    rows = []
    if bdir.is_dir():
        for p in sorted([x for x in bdir.iterdir() if x.is_dir()], reverse=True)[:20]:
            try:
                size = sum(f.stat().st_size for f in p.rglob('*') if f.is_file())
                mtime = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(p.stat().st_mtime))
                rows.append((p.name, size, mtime, str(p)))
            except Exception:
                rows.append((p.name, 0, "unknown", str(p)))
    return rows

def fmt_bytes(n):
    try: n = float(n)
    except Exception: return "unknown"
    for unit in ["B","KB","MB","GB","TB"]:
        if n < 1024 or unit == "TB": return f"{n:.1f} {unit}"
        n /= 1024


def collapsible(title, body, open=True):
    open_attr = " open" if open else ""
    return f"<details class='panel'{open_attr}><summary>{html.escape(title)}</summary><div class='panel-body'>{body}</div></details>"

def _git(args, repo=GIT_STATUS_REPO):
    return subprocess.run(["git", *args], cwd=repo, capture_output=True, text=True, timeout=3)

def git_status():
    repo = GIT_STATUS_REPO
    checked_at = time.strftime('%Y-%m-%d %H:%M:%S %Z')
    if not repo.exists():
        return {"ok": False, "repo": str(repo), "checked_at": checked_at, "error": "repository path does not exist"}
    try:
        inside = _git(["rev-parse", "--is-inside-work-tree"], repo)
        if inside.returncode != 0:
            return {"ok": False, "repo": str(repo), "checked_at": checked_at, "error": "not a git repository"}
        def out(args, default=""):
            r = _git(args, repo)
            return r.stdout.strip() if r.returncode == 0 else default
        sha = out(["rev-parse", "HEAD"])
        branch = out(["branch", "--show-current"], "detached") or "detached"
        remote = out(["config", "--get", f"branch.{branch}.remote"], "origin") or "origin"
        upstream = out(["rev-parse", "--abbrev-ref", "--symbolic-full-name", "@{u}"])
        ahead = behind = 0
        if upstream:
            counts = out(["rev-list", "--left-right", "--count", f"HEAD...{upstream}"])
            parts = counts.split()
            if len(parts) >= 2:
                ahead, behind = int(parts[0] or 0), int(parts[1] or 0)
        dirty = bool(out(["status", "--porcelain"]))
        return {
            "ok": True,
            "repo": str(repo),
            "branch": branch,
            "remote": remote,
            "sha": sha,
            "short_sha": sha[:8],
            "subject": out(["log", "-1", "--pretty=%s"]),
            "author": out(["log", "-1", "--pretty=%an"]),
            "committed_at": out(["log", "-1", "--pretty=%cI"]),
            "relative_commit_time": out(["log", "-1", "--pretty=%cr"]),
            "dirty": dirty,
            "ahead": ahead,
            "behind": behind,
            "checked_at": checked_at,
        }
    except Exception as e:
        return {"ok": False, "repo": str(repo), "checked_at": checked_at, "error": str(e)}

def git_status_section():
    g = git_status()
    if not g.get("ok"):
        body = f"<p class='bad'>Git status unavailable: {html.escape(str(g.get('error','unknown')))}</p><p class='muted small'>Repo: <code>{html.escape(str(g.get('repo','')))}</code></p>"
        return collapsible("Git commit status", body, True)
    if g.get("dirty"):
        state, cls = "dirty worktree", "git-dirty"
    elif g.get("ahead") and g.get("behind"):
        state, cls = f"diverged +{g.get('ahead')} / -{g.get('behind')}", "git-dirty"
    elif g.get("ahead"):
        state, cls = f"ahead by {g.get('ahead')}", "git-dirty"
    elif g.get("behind"):
        state, cls = f"behind by {g.get('behind')}", "git-dirty"
    else:
        state, cls = "synced", "git-clean"
    body = f"""
<div class='grid small'>
<div class='muted'>Status</div><div><span class='{cls}'>{html.escape(state)}</span></div>
<div class='muted'>Commit</div><div><code>{html.escape(str(g.get('short_sha','')))}</code> — {html.escape(str(g.get('subject','')))}</div>
<div class='muted'>Branch</div><div>{html.escape(str(g.get('branch','')))} / {html.escape(str(g.get('remote','origin')))}</div>
<div class='muted'>Author</div><div>{html.escape(str(g.get('author','')))}</div>
<div class='muted'>Committed</div><div>{html.escape(str(g.get('relative_commit_time','')))} ({html.escape(str(g.get('committed_at','')))} )</div>
<div class='muted'>Checked</div><div>{html.escape(str(g.get('checked_at','')))}</div>
<div class='muted'>Repo</div><div><code>{html.escape(str(g.get('repo','')))}</code></div>
</div>
<p class='muted small'>JSON endpoint: <a href='/git-status.json'>/git-status.json</a></p>
"""
    return collapsible("Git commit status", body, True)

def backup_unit_state():
    try:
        active = subprocess.run(["systemctl", "is-active", BACKUP_UNIT], capture_output=True, text=True, timeout=5)
        sub = subprocess.run(["systemctl", "show", BACKUP_UNIT, "--property=SubState", "--value"], capture_output=True, text=True, timeout=5)
        return active.stdout.strip() or "unknown", sub.stdout.strip() or "unknown"
    except Exception as e:
        return "unknown", f"systemctl error: {e}"

def progress_info(status=None):
    status = dict(status or read_status())
    unit_active, unit_sub = backup_unit_state()
    state = status.get("state", "unknown")
    message = str(status.get("message", ""))
    running = unit_active in ("active", "activating") or state == "running"
    haystack = f"{state} {message}".lower()
    progress, stage_index, stage = (0, 0, "Idle")
    for needle, pct, idx, label in STAGE_RULES:
        if needle in haystack:
            progress, stage_index, stage = pct, idx, label
            break
    if running and progress in (0, 100):
        progress, stage_index, stage = 10, 0, "Starting / waiting for status update"
    if running and progress < 98:
        try:
            elapsed = int(status.get("duration_seconds") or 0)
            progress = max(progress, min(96, 10 + elapsed // 2))
        except Exception:
            pass
    if state in ("failed", "error"):
        progress, stage_index, stage = 100, 8, "Failed"
    if state == "success" and not running:
        progress, stage_index, stage = 0, 8, "Completed / idle"
    status.update({
        "unit_active": unit_active,
        "unit_sub": unit_sub,
        "running": running,
        "progress_percent": int(progress),
        "stage_index": int(stage_index),
        "stage": stage,
        "backup_size_human": fmt_bytes(status.get("backup_bytes", 0)),
    })
    return status

def trigger_backup():
    active, sub = backup_unit_state()
    if active in ("active", "activating"):
        return False, f"Backup is already running ({sub})."
    try:
        result = subprocess.run(["systemctl", "start", "--no-block", BACKUP_UNIT], capture_output=True, text=True, timeout=10)
        if result.returncode == 0:
            return True, f"Backup requested via {BACKUP_UNIT}. Progress will update below."
        err = (result.stderr or result.stdout or "unknown systemctl error").strip()
        return False, f"Failed to start backup: {err}"
    except Exception as e:
        return False, f"Failed to start backup: {e}"


def host_108_status():
    checked_at = time.strftime('%Y-%m-%d %H:%M:%S %Z')
    try:
        result = subprocess.run(["ping", "-c", "1", "-W", "1", HOST_108_IP], capture_output=True, text=True, timeout=3)
        online = result.returncode == 0
        if online:
            summary = f"{HOST_108_NAME} ({HOST_108_IP}) replied to ping."
        else:
            raw = (result.stderr or result.stdout or "no ping reply").strip().splitlines()
            summary = f"{HOST_108_NAME} ({HOST_108_IP}) did not reply to ping: {raw[-1] if raw else 'offline'}"
        return {"host": HOST_108_NAME, "ip": HOST_108_IP, "online": online, "checked_at": checked_at, "summary": summary}
    except Exception as e:
        return {"host": HOST_108_NAME, "ip": HOST_108_IP, "online": False, "checked_at": checked_at, "summary": f"Host check failed: {e}"}


def trigger_wake_108():
    """Send repeated WoL/WoWLAN packets and wait for a useful result.

    Important edge case: after pressing Sleep, the host can still answer ping for
    a few seconds while the delayed SSH suspend command is pending. If Wake is
    clicked during that window, returning immediately because ping is currently
    online is wrong: the host may go to sleep right after the response. So when
    the host starts online, require it to remain online for a short stable window;
    if it drops offline, keep sending wake packets until it returns.
    """
    outputs = []
    last_error = ""
    try:
        initial = host_108_status()
        initially_online = bool(initial.get("online"))
        saw_offline = not initially_online
        consecutive_online = 0
        detail = f"Wake packet sent to {HOST_108_NAME} ({HOST_108_IP})."

        # About 180 seconds total. Send a packet batch every 3 seconds and poll in
        # between. This covers the common “clicked Wake while Sleep is still
        # settling” Wi-Fi WoWLAN race and gives this flaky Intel Wi-Fi adapter
        # multiple chances. Deep/S3 WoWLAN on this host is still not guaranteed;
        # the physical power button remains the reliable wake path.
        for tick in range(180):
            if tick % 3 == 0:
                result = subprocess.run([HOST_108_WAKE_CMD], capture_output=True, text=True, timeout=15)
                output = (result.stdout or result.stderr or "").strip()
                if output:
                    outputs.append(output)
                    detail = output
                if result.returncode != 0:
                    last_error = output or f"Wake command failed with exit {result.returncode}."

            st = host_108_status()
            if st.get("online"):
                consecutive_online += 1
                if saw_offline:
                    return True, f"Wake packets sent; {HOST_108_NAME} came online. {detail}"
                if initially_online and consecutive_online >= 10:
                    return True, f"{HOST_108_NAME} is already online and stayed online after wake packets. {detail}"
            else:
                saw_offline = True
                consecutive_online = 0
            time.sleep(1)

        if outputs and not last_error:
            return False, f"Wake packets sent for 180s, but {HOST_108_NAME} has not replied to ping yet. Press the physical side power button. Last sender output: {outputs[-1]}"
        return False, last_error or f"Wake packets sent for 180s, but {HOST_108_NAME} did not come online. Press the physical side power button."
    except FileNotFoundError:
        return False, f"Wake command not found: {HOST_108_WAKE_CMD}"
    except Exception as e:
        return False, f"Wake command failed: {e}"


def _read_host_108_creds():
    data = {}
    if not HOST_108_CRED_ENV.exists():
        raise RuntimeError(f"Credential env file not found: {HOST_108_CRED_ENV}")
    for line in HOST_108_CRED_ENV.read_text(errors="replace").splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        k, v = line.split("=", 1)
        data[k.strip()] = v.strip().strip('"').strip("'")
    required = ["DIETPI_HOST", "DIETPI_PORT", "DIETPI_USER", "DIETPI_PASSWORD"]
    missing = [k for k in required if not data.get(k)]
    if missing:
        raise RuntimeError(f"Credential env file missing keys: {', '.join(missing)}")
    return data


def _request_host_108_suspend():
    creds = _read_host_108_creds()
    env = os.environ.copy()
    env["SSHPASS"] = creds["DIETPI_PASSWORD"]
    cmd = [
        "sshpass", "-e", "ssh",
        "-o", "BatchMode=no",
        "-o", "StrictHostKeyChecking=accept-new",
        "-o", "ConnectTimeout=5",
        "-p", str(creds.get("DIETPI_PORT", "22")),
        f"{creds['DIETPI_USER']}@{creds['DIETPI_HOST']}",
        "nohup /usr/local/sbin/hermes-suspend-wifi-wowlan.sh >/dev/null 2>&1 &",
    ]
    result = subprocess.run(cmd, capture_output=True, text=True, timeout=10, env=env)
    if result.returncode != 0:
        msg = (result.stderr or result.stdout or f"ssh exited {result.returncode}").strip()
        raise RuntimeError(msg)
    return True


def _wait_host_108_online(want_online, timeout_seconds, interval=2):
    deadline = time.time() + timeout_seconds
    last = None
    while time.time() < deadline:
        st = host_108_status()
        last = st
        if bool(st.get("online")) == bool(want_online):
            return True, st
        time.sleep(interval)
    return False, last or host_108_status()


def trigger_sleep_108():
    before = host_108_status()
    if not before.get("online"):
        return False, f"Refusing sleep because {HOST_108_NAME} ({HOST_108_IP}) is already offline. Press the physical power button to wake it."
    try:
        _request_host_108_suspend()
    except Exception as e:
        return False, f"Failed to request deep suspend over SSH: {e}"
    return True, f"Deep sleep requested for {HOST_108_NAME} ({HOST_108_IP}). Fans should spin down; wake it with the physical side power button."


def safe_fan_percent(requested_percent, cpu_temp_c):
    try:
        requested = int(round(float(requested_percent)))
    except Exception:
        requested = 100
    requested = max(20, min(100, requested))
    try:
        temp = float(cpu_temp_c)
    except Exception:
        return 100
    if temp >= 70.0:
        floor = 100
    elif temp >= 68.0:
        floor = 90
    elif temp >= 65.0:
        floor = 75
    elif temp >= 60.0:
        floor = 55
    else:
        floor = 20
    return max(requested, floor)


def parse_remote_fan_json(raw):
    raw = raw or ""
    for line in raw.splitlines():
        line = line.strip()
        if line.startswith("{") and line.endswith("}"):
            return json.loads(line)
    return json.loads(raw)


def _run_host_108_command(remote_args, timeout=15):
    creds = _read_host_108_creds()
    env = os.environ.copy()
    env["SSHPASS"] = creds["DIETPI_PASSWORD"]
    cmd = [
        "sshpass", "-e", "ssh",
        "-o", "BatchMode=no",
        "-o", "StrictHostKeyChecking=accept-new",
        "-o", "ConnectTimeout=5",
        "-p", str(creds.get("DIETPI_PORT", "22")),
        f"{creds['DIETPI_USER']}@{creds['DIETPI_HOST']}",
    ] + list(remote_args)
    result = subprocess.run(cmd, capture_output=True, text=True, timeout=timeout, env=env)
    if result.returncode != 0:
        msg = (result.stderr or result.stdout or f"ssh exited {result.returncode}").strip()
        raise RuntimeError(msg)
    return result.stdout


def fan_108_status():
    try:
        raw = _run_host_108_command([HOST_108_FAN_CMD, "status"], timeout=20)
        data = parse_remote_fan_json(raw)
        if isinstance(data, dict):
            data.setdefault("ok", True)
        return data
    except Exception as e:
        return {"ok": False, "error": str(e)}


def set_fan_108(percent):
    try:
        requested = int(round(float(percent)))
    except Exception:
        return False, "Fan speed must be a number between 20 and 100%."
    if requested < 20 or requested > 100:
        return False, "Fan speed must be between 20 and 100%."
    try:
        raw = _run_host_108_command([HOST_108_FAN_CMD, "set", str(requested)], timeout=20)
        data = parse_remote_fan_json(raw)
        if not data.get("ok", False):
            return False, data.get("error", "Remote fan controller failed")
        applied = data.get("applied_percent", requested)
        temp = data.get("cpu_temp_c", "unknown")
        rpm = data.get("fan_rpm", "unknown")
        if data.get("safety_active"):
            return True, f"Requested {requested}% fan, but safety guard applied {applied}% because CPU is {temp} °C. Fan: {rpm} RPM."
        return True, f"Fan set to {applied}% with CPU at {temp} °C. Fan: {rpm} RPM."
    except Exception as e:
        return False, f"Failed to set fan speed: {e}"


def _parse_env_file(path=ENV_PATH):
    data = {}
    if not path.exists():
        return data
    for line in path.read_text(errors="replace").splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        k, v = line.split("=", 1)
        data[k.strip()] = v.strip().strip('"').strip("'")
    return data

def _timer_values_from_unit():
    schedule = DEFAULT_SETTINGS["schedule"]
    randomized = DEFAULT_SETTINGS["randomized_delay"]
    enabled = True
    if TIMER_PATH.exists():
        for line in TIMER_PATH.read_text(errors="replace").splitlines():
            line = line.strip()
            if line.startswith("OnCalendar="):
                schedule = line.split("=", 1)[1].strip()
            elif line.startswith("RandomizedDelaySec="):
                randomized = line.split("=", 1)[1].strip()
    try:
        enabled = subprocess.run(["systemctl", "is-enabled", "hermes-qnas-backup.timer"], capture_output=True, text=True, timeout=5).returncode == 0
    except Exception:
        enabled = True
    return schedule, randomized, enabled

def read_settings():
    settings = dict(DEFAULT_SETTINGS)
    try:
        if SETTINGS_PATH.exists():
            loaded = json.loads(SETTINGS_PATH.read_text())
            if isinstance(loaded, dict):
                settings.update(loaded)
    except Exception:
        pass
    env = _parse_env_file()
    if env.get("RETENTION_COUNT", "").isdigit():
        settings["retention_count"] = int(env["RETENTION_COUNT"])
    schedule, randomized, enabled = _timer_values_from_unit()
    settings.setdefault("schedule", schedule)
    settings.setdefault("randomized_delay", randomized)
    # Keep live timer values authoritative unless the JSON was just written with matching keys absent.
    settings["schedule"] = schedule
    settings["randomized_delay"] = randomized
    settings["timer_enabled"] = enabled
    try:
        settings["retention_count"] = max(1, min(365, int(settings.get("retention_count", 14))))
    except Exception:
        settings["retention_count"] = 14
    return settings

def validate_calendar(expr):
    expr = (expr or "").strip()
    if not expr or len(expr) > 120 or re.search(r"[^A-Za-z0-9*,:/ ._+~=-]", expr):
        return False, "Schedule contains invalid characters."
    result = subprocess.run(["systemd-analyze", "calendar", expr], capture_output=True, text=True, timeout=10)
    if result.returncode != 0:
        return False, (result.stderr or result.stdout or "Invalid OnCalendar expression").strip()
    return True, "ok"

def validate_timespan(expr):
    expr = (expr or "").strip()
    if not expr:
        return True, "ok"
    if len(expr) > 40 or re.search(r"[^A-Za-z0-9 ._-]", expr):
        return False, "Randomized delay contains invalid characters."
    result = subprocess.run(["systemd-analyze", "timespan", expr], capture_output=True, text=True, timeout=10)
    if result.returncode != 0:
        return False, (result.stderr or result.stdout or "Invalid timespan").strip()
    return True, "ok"

def save_settings(fields):
    retention_raw = fields.get("retention_count", [""])[0]
    schedule = fields.get("schedule", [DEFAULT_SETTINGS["schedule"]])[0].strip()
    randomized = fields.get("randomized_delay", [DEFAULT_SETTINGS["randomized_delay"]])[0].strip() or "0"
    timer_enabled = fields.get("timer_enabled", [""])[0] == "1"
    try:
        retention_count = int(retention_raw)
    except Exception:
        return False, "Backups to keep must be a number."
    if retention_count < 1 or retention_count > 365:
        return False, "Backups to keep must be between 1 and 365."
    ok, msg = validate_calendar(schedule)
    if not ok:
        return False, f"Invalid backup schedule: {msg}"
    ok, msg = validate_timespan(randomized)
    if not ok:
        return False, f"Invalid randomized delay: {msg}"
    settings = {"retention_count": retention_count, "schedule": schedule, "randomized_delay": randomized, "timer_enabled": timer_enabled}
    SETTINGS_PATH.write_text(json.dumps(settings, indent=2) + "\n")
    ENV_PATH.write_text(f"RETENTION_COUNT={retention_count}\n")
    TIMER_PATH.write_text(f"""[Unit]\nDescription=Run Hermes/Honcho QNAS backup on configured schedule\n\n[Timer]\nOnCalendar={schedule}\nRandomizedDelaySec={randomized}\nPersistent=true\nUnit=hermes-qnas-backup.service\n\n[Install]\nWantedBy=timers.target\n""")
    subprocess.run(["systemctl", "daemon-reload"], check=True, capture_output=True, text=True, timeout=20)
    if timer_enabled:
        subprocess.run(["systemctl", "enable", "--now", "hermes-qnas-backup.timer"], check=True, capture_output=True, text=True, timeout=20)
        subprocess.run(["systemctl", "restart", "hermes-qnas-backup.timer"], check=True, capture_output=True, text=True, timeout=20)
    else:
        subprocess.run(["systemctl", "disable", "--now", "hermes-qnas-backup.timer"], check=True, capture_output=True, text=True, timeout=20)
    return True, "Settings saved. Backup timer updated."

def timer_status_line():
    try:
        result = subprocess.run(["systemctl", "list-timers", "--all", "hermes-qnas-backup.timer", "--no-pager", "--no-legend"], capture_output=True, text=True, timeout=5)
        return (result.stdout or result.stderr or "Timer status unavailable").strip()
    except Exception as e:
        return f"Timer status unavailable: {e}"

def render_settings_page(notice_msg="", notice_ok=True):
    settings = read_settings()
    checked = " checked" if settings.get("timer_enabled") else ""
    notice = f"<div class='notice {'ok' if notice_ok else 'bad'}'>{html.escape(notice_msg)}</div>" if notice_msg else ""
    body = f"""<!doctype html><html><head><meta charset='utf-8'><meta name='viewport' content='width=device-width,initial-scale=1'><title>{html.escape(APP_TITLE)} Settings</title><style>{CSS}</style></head><body><div class='card'>
<h1>{html.escape(APP_TITLE)} Settings</h1>
<div class='nav'><a href='/'>Status</a><a href='/settings'>Settings</a></div>
{notice}
<form class='settings-form' action='/settings' method='post'>
<label for='retention_count'>Backups to keep</label><input id='retention_count' name='retention_count' type='number' min='1' max='365' value='{html.escape(str(settings.get('retention_count',14)))}' required>
<label for='schedule'>Backup schedule</label><input id='schedule' name='schedule' value='{html.escape(str(settings.get('schedule',DEFAULT_SETTINGS['schedule'])))}' required>
<label for='randomized_delay'>Randomized delay</label><input id='randomized_delay' name='randomized_delay' value='{html.escape(str(settings.get('randomized_delay',DEFAULT_SETTINGS['randomized_delay'])))}'>
<label for='timer_enabled'>Scheduler enabled</label><input id='timer_enabled' name='timer_enabled' type='checkbox' value='1'{checked}>
<div class='full'><button type='submit'>Save settings</button></div>
</form>
<p class='muted small'>Schedule uses systemd OnCalendar syntax, e.g. <code>*-*-* 03:20:00</code> for daily at 03:20 or <code>weekly</code>. Retention keeps the newest N backup folders after each successful backup.</p>
{collapsible('Current timer', f"<pre class='small'><code>{html.escape(timer_status_line())}</code></pre>", True)}
</div></body></html>"""
    out = body.encode()
    return out

def delete_backup_set(run_id):
    active, sub = backup_unit_state()
    if active in ("active", "activating"):
        return False, f"Refusing to delete while backup is running ({sub})."
    run_id = (run_id or "").strip()
    if not re.fullmatch(r"20\d{6}_\d{6}", run_id):
        return False, "Invalid backup set name."
    backups_dir = (BACKUP_ROOT / "backups").resolve()
    target = (backups_dir / run_id).resolve()
    if backups_dir not in target.parents:
        return False, "Invalid backup path."
    if not target.is_dir():
        return False, f"Backup set {run_id} was not found."
    try:
        shutil.rmtree(target)
        return True, f"Deleted backup set {run_id}."
    except Exception as e:
        return False, f"Failed to delete backup set {run_id}: {e}"

class Handler(BaseHTTPRequestHandler):
    def log_message(self, fmt, *args):
        return

    def send_json(self, data):
        body = json.dumps(data, indent=2).encode()
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.send_header("Cache-Control", "no-store")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def redirect_home(self, message=None, ok=True):
        target = "/"
        if message:
            import urllib.parse
            target += "?" + urllib.parse.urlencode({"ok": "1" if ok else "0", "message": message})
        self.send_response(303)
        self.send_header("Location", target)
        self.send_header("Cache-Control", "no-store")
        self.end_headers()

    def read_post_fields(self):
        import urllib.parse
        try:
            length = int(self.headers.get("Content-Length", "0") or "0")
        except ValueError:
            length = 0
        body = self.rfile.read(min(length, 65536)).decode("utf-8", "replace") if length else ""
        return urllib.parse.parse_qs(body, keep_blank_values=True)

    def do_POST(self):
        path = self.path.split("?", 1)[0]
        if path == "/run-backup":
            ok, message = trigger_backup()
            self.redirect_home(message, ok)
            return
        if path == "/wake-108":
            ok, message = trigger_wake_108()
            self.redirect_home(message, ok)
            return
        if path == "/sleep-108":
            ok, message = trigger_sleep_108()
            self.redirect_home(message, ok)
            return
        if path == "/fan-108":
            fields = self.read_post_fields()
            ok, message = set_fan_108(fields.get("percent", [""])[0])
            self.redirect_home(message, ok)
            return
        if path == "/set-subagent-model":
            fields = self.read_post_fields()
            ok, message = set_subagent_model(fields.get("server", [""])[0], fields.get("model", [""])[0])
            self.redirect_home(message, ok)
            return
        if path == "/delete-backup":
            fields = self.read_post_fields()
            run_id = fields.get("run_id", [""])[0]
            ok, message = delete_backup_set(run_id)
            self.redirect_home(message, ok)
            return
        if path == "/settings":
            fields = self.read_post_fields()
            try:
                ok, message = save_settings(fields)
            except Exception as e:
                ok, message = False, f"Failed to save settings: {e}"
            body = render_settings_page(message, ok)
            self.send_response(200)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.send_header("Cache-Control", "no-store")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers(); self.wfile.write(body)
            return
        self.send_error(404)

    def do_GET(self):
        path = self.path.split("?", 1)[0]
        if path == "/status.json":
            self.send_json(read_status())
            return
        if path == "/progress.json":
            self.send_json(progress_info())
            return
        if path == "/subagent-status.json":
            self.send_json(read_subagent_status())
            return
        if path == "/remote-subagents.json":
            self.send_json(all_subagent_statuses())
            return
        if path == "/subagent-108.json":
            self.send_json(read_subagent_status_for("108"))
            return
        if path == "/subagent-151.json":
            self.send_json(read_subagent_status_for("151"))
            return
        if path == "/cloudflare-ns-status.json":
            self.send_json(read_cloudflare_ns_status())
            return
        if path == "/git-status.json":
            self.send_json(git_status())
            return
        if path == "/host-108.json":
            self.send_json(host_108_status())
            return
        if path == "/fan-108.json":
            self.send_json(fan_108_status())
            return
        if path == "/settings":
            body = render_settings_page()
            self.send_response(200)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.send_header("Cache-Control", "no-store")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers(); self.wfile.write(body)
            return
        if path not in ("/", ""):
            self.send_error(404)
            return
        import urllib.parse
        query = urllib.parse.parse_qs(urllib.parse.urlsplit(self.path).query)
        notice_msg = query.get("message", [""])[0]
        notice_ok = query.get("ok", ["1"])[0] == "1"
        status = read_status()
        subagent = read_subagent_status()
        settings = read_settings()
        pinfo = progress_info(status)
        host108 = host_108_status()
        fan108 = fan_108_status()
        cfns = read_cloudflare_ns_status()
        state = pinfo.get("state", "unknown")
        cls = "ok" if state == "success" else "bad" if state in ("failed","error") else "run"
        running = pinfo.get("running")
        rows = list_backups()
        backup_rows = "".join(
            f"<tr><td><code>{html.escape(name)}</code></td><td>{fmt_bytes(size)}</td><td>{html.escape(mtime)}</td>"
            f"<td class='path-cell'><code>{html.escape(path)}</code></td>"
            f"<td class='actions-cell'><form class='delete-form' action='/delete-backup' method='post' "
            f"onsubmit=\"return confirm('Delete backup set {html.escape(name)} from QNAS? This cannot be undone.');\">"
            f"<input type='hidden' name='run_id' value='{html.escape(name)}'>"
            f"<button class='danger' type='submit'>Delete</button></form></td></tr>"
            for name,size,mtime,path in rows
        )
        notice = f"<div class='notice {'ok' if notice_ok else 'bad'}'>{html.escape(notice_msg)}</div>" if notice_msg else ""
        sub_cls = "ok" if subagent.get("ready") else "bad"
        sub_ollama = subagent.get("ollama_cloud", {}) if isinstance(subagent.get("ollama_cloud", {}), dict) else {}
        host_led_cls = "online" if host108.get("online") else "offline"
        host_label_cls = "ok" if host108.get("online") else "bad"
        host_label = "online" if host108.get("online") else "offline"
        def render_model_options(selected):
            selected = selected or ""
            return "".join(
                f"<option value='{html.escape(item['model'])}'{' selected' if item['model'] == selected else ''}>{html.escape(item['label'])}</option>"
                for item in WORKING_OLLAMA_CLOUD_MODELS
            )
        def render_subagent_card(server_id, status_data):
            cfg = SUBAGENT_SERVERS[server_id]
            ready = bool(status_data.get("ready"))
            cls = "ok" if ready else "bad"
            current_model = str(status_data.get("desired_model") or read_subagent_model_state().get(server_id) or WORKING_OLLAMA_CLOUD_MODELS[0]["model"])
            ollama = status_data.get("ollama_cloud", {}) if isinstance(status_data.get("ollama_cloud", {}), dict) else {}
            helper = cfg.get("helper", "")
            helper_line = f"<p class='muted small'>Run remote one-shot tasks from pve2 with: <code>{html.escape(helper)} 'your task'</code>.</p>" if helper and not helper.startswith("pending") else "<p class='muted small'>Remote one-shot helper is pending until this host is reachable and Hermes is installed.</p>"
            extra_controls = ""
            if server_id == "108":
                extra_controls = f"""
  <div class='actions' style='margin:.75rem 0'>
    <form id='wake108Form' action='/wake-108' method='post'><button id='wake108Button' type='submit'>Try Wi-Fi Wake</button></form>
    <form id='sleepWake108Form' action='/sleep-108' method='post' onsubmit=\"return confirm('This will put 192.168.1.108 into deep sleep/S3 so fans go down. Wake it with the physical side power button. Continue?');\"><button id='sleepWake108Button' class='warn' type='submit'>Sleep</button></form>
  </div>
  <div class='fan-panel'>
    <h3>Manual CPU fan control</h3>
    <form id='fan108Form' action='/fan-108' method='post' class='fan-row'>
      <label for='fan108Slider'>Requested fan</label>
      <input id='fan108Slider' name='percent' type='range' min='20' max='100' step='1' value='{html.escape(str(fan108.get('requested_percent',100)))}'>
      <strong id='fan108SliderValue'>{html.escape(str(fan108.get('requested_percent',100)))}%</strong>
      <span></span><button id='fan108Button' type='submit'>Apply fan speed</button><span></span>
    </form>
    <div class='fan-readout small'>
      <div class='muted'>CPU temp</div><div id='fan108Temp'>{html.escape(str(fan108.get('cpu_temp_c','unknown')))} °C</div>
      <div class='muted'>Requested</div><div id='fan108Requested'>{html.escape(str(fan108.get('requested_percent','unknown')))}%</div>
      <div class='muted'>Applied</div><div id='fan108Applied'>{html.escape(str(fan108.get('applied_percent','unknown')))}%</div>
      <div class='muted'>Fan speed</div><div id='fan108Rpm'>{html.escape(str(fan108.get('fan_rpm','unknown')))} RPM</div>
      <div class='muted'>Safety guard</div><div id='fan108Safety' class='{'run' if fan108.get('safety_active') else 'ok'}'>{html.escape('active — raised above requested speed' if fan108.get('safety_active') else 'idle')}</div>
    </div>
    <p id='fan108Status' class='muted small'>Guarded by <code>hermes-fan-control.service</code>: if CPU reaches 70 °C it forces 100%, with rising safety floors before that.</p>
  </div>
"""
            return f"""
<section class='host-card' aria-live='polite'>
  <div class='host-head'>
    <div>
      <strong>{html.escape(str(status_data.get('name') or cfg['name']))} / {html.escape(str(status_data.get('server') or cfg['ip']))}</strong>
      <div class='host-state small'><span class='led {'online' if status_data.get('up') else 'offline'}'></span><span>Status: <span class='{cls}'>{'ready' if ready else 'not ready'}</span></span></div>
    </div>
    <div class='small muted'>Last checked: {html.escape(str(status_data.get('checked_at','unknown')))}</div>
  </div>
  <p class='muted small'>{html.escape(str(status_data.get('summary','unknown')))}</p>
  <div class='grid small'>
    <div class='muted'>Ping</div><div>{html.escape(str(status_data.get('up', False)))}</div>
    <div class='muted'>SSH</div><div>{html.escape(str(status_data.get('ssh_ok', False)))}</div>
    <div class='muted'>Hermes</div><div>{html.escape(str(status_data.get('hermes_ok', False)))}</div>
    <div class='muted'>Ollama Cloud</div><div>{html.escape(str(status_data.get('desired_provider','ollama-cloud')))} / <code>{html.escape(current_model)}</code> usable: {html.escape(str(status_data.get('ollama_cloud_ok', False)))}</div>
    <div class='muted'>LLM test</div><div>{html.escape(str(ollama.get('content') or ollama.get('error') or ''))} in {html.escape(str(ollama.get('elapsed_seconds','?')))}s</div>
  </div>
  <form class='model-form' action='/set-subagent-model' method='post'>
    <input type='hidden' name='server' value='{html.escape(server_id)}'>
    <label for='model-{html.escape(server_id)}'>Change model</label>
    <select id='model-{html.escape(server_id)}' name='model'>{render_model_options(current_model)}</select>
    <button type='submit'>Apply to this server</button>
  </form>
  {helper_line}
  {extra_controls}
</section>
"""
        statuses = all_subagent_statuses()
        subagent_body = "".join(render_subagent_card(sid, statuses[sid]) for sid in sorted(SUBAGENT_SERVERS)) + """
<p class='muted small'>Verified working Ollama Cloud model scan: <code>qwen3-next:80b</code>, <code>glm-4.6:latest</code>, and <code>gpt-oss:20b</code>. JSON endpoints: <a href='/remote-subagents.json'>/remote-subagents.json</a>, <a href='/subagent-108.json'>/subagent-108.json</a>, <a href='/subagent-151.json'>/subagent-151.json</a>.</p>
"""
        subagent_section = collapsible("Remote subagent servers", subagent_body, True)
        def fmt_ns_list(items):
            vals = items if isinstance(items, list) else []
            return ", ".join(f"<code>{html.escape(str(x))}</code>" for x in vals) or "<span class='muted'>none</span>"
        cf_cls = "ok" if cfns.get("ok") else ("run" if cfns.get("onecom_matches_cloudflare_expected") and not cfns.get("cloudflare_zone_active") else "bad")
        cf_state = "healthy" if cfns.get("ok") else ("waiting for propagation" if cfns.get("onecom_matches_cloudflare_expected") else "needs attention")
        cf_body = f"""
<section class='host-card'>
  <div class='host-head'>
    <div>
      <strong>{html.escape(str(cfns.get('domain','nor-soft.no')))}</strong>
      <div class='host-state small'><span class='led {'online' if cfns.get('ok') else 'checking' if cfns.get('onecom_matches_cloudflare_expected') else 'offline'}'></span><span>Status: <span class='{cf_cls}'>{html.escape(cf_state)}</span></span></div>
    </div>
    <div class='small muted'>Last checked: {html.escape(str(cfns.get('checked_at','unknown')))}</div>
  </div>
  <p class='muted small'>{html.escape(str(cfns.get('message','')))}</p>
  <div class='grid small'>
    <div class='muted'>Cloudflare zone</div><div><code>{html.escape(str(cfns.get('cloudflare_zone_id','unknown')))}</code> / {html.escape(str(cfns.get('cloudflare_zone_status','unknown')))}</div>
    <div class='muted'>Expected NS</div><div>{fmt_ns_list(cfns.get('expected_nameservers'))}</div>
    <div class='muted'>one.com NS</div><div>{fmt_ns_list(cfns.get('onecom_nameservers'))}</div>
    <div class='muted'>one.com matches</div><div>{html.escape(str(cfns.get('onecom_matches_cloudflare_expected', False)))}</div>
    <div class='muted'>Public 1.1.1.1 NS</div><div>{fmt_ns_list(cfns.get('public_nameservers_1_1_1_1'))}</div>
    <div class='muted'>Registry trace NS</div><div>{fmt_ns_list(cfns.get('registry_trace_nameservers'))}</div>
    <div class='muted'>Needs confirmation</div><div>{html.escape(str(cfns.get('needs_user_confirmation', False)))} — no automatic one.com update is performed</div>
  </div>
  <p class='muted small'>JSON endpoint: <a href='/cloudflare-ns-status.json'>/cloudflare-ns-status.json</a>. If one.com ever differs from the Cloudflare expected nameservers, the cron watchdog alerts you and waits for explicit confirmation before any update.</p>
</section>
"""
        cf_section = collapsible("Cloudflare / one.com nameserver watchdog", cf_body, True)
        button_text = "Backup running…" if running else "Back up now"
        disabled = " disabled" if running else ""
        body = f"""<!doctype html><html><head><meta charset='utf-8'><meta name='viewport' content='width=device-width,initial-scale=1'><title>{html.escape(APP_TITLE)}</title><style>{CSS}</style></head><body><div class='card'>
<h1>{html.escape(APP_TITLE)}</h1>
<div class='nav'><a href='/'>Status</a><a href='/settings'>Settings</a></div>
{notice}
{git_status_section()}
{collapsible('Backup status', f'''<form id="backupForm" class="actions" action="/run-backup" method="post"><button id="backupButton" type="submit"{disabled}>{html.escape(button_text)}</button><span class="muted small">Manual trigger: <code>{html.escape(BACKUP_UNIT)}</code> is <span id="unitState">{html.escape(pinfo.get('unit_active','unknown'))} / {html.escape(pinfo.get('unit_sub','unknown'))}</span></span></form>
<p class="muted small">Retention: keep newest {html.escape(str(settings.get('retention_count',14)))} backups. Scheduler: {html.escape('enabled' if settings.get('timer_enabled') else 'disabled')} at <code>{html.escape(str(settings.get('schedule','')))}</code> ± <code>{html.escape(str(settings.get('randomized_delay','')))}</code>. <a href="/settings">Change settings</a>.</p>
<section class="progress-card" aria-live="polite">
  <div class="progress-head"><strong>Backup progress</strong><span id="progressPercent">{pinfo.get('progress_percent',0)}%</span></div>
  <div class="progress-track"><div id="progressFill" class="progress-fill{' indeterminate' if running and pinfo.get('progress_percent',0) < 10 else ''}" style="width:{pinfo.get('progress_percent',0)}%"></div></div>
  <div class="progress-meta small"><span id="progressStage">{html.escape(str(pinfo.get('stage','Idle')))}</span><span id="progressDetails" class="muted">{html.escape(str(pinfo.get('message','')))}</span></div>
  <ol id="stageList" class="stage-list small"></ol>
</section>
<p>Status: <span id="statePill" class="pill {cls}">{html.escape(state)}</span></p>
<div class="grid small">
<div class="muted">Message</div><div>{html.escape(str(status.get('message','')))}</div>
<div class="muted">Run ID</div><div><code id="runId">{html.escape(str(status.get('run_id','')))}</code></div>
<div class="muted">Started</div><div>{html.escape(str(status.get('started_at','')))}</div>
<div class="muted">Updated</div><div>{html.escape(str(status.get('updated_at','')))}</div>
<div class="muted">Duration</div><div id="duration">{html.escape(str(status.get('duration_seconds','')))} seconds</div>
<div class="muted">Destination</div><div><code>{html.escape(str(status.get('destination','')))}</code></div>
<div class="muted">Size</div><div id="size">{fmt_bytes(status.get('backup_bytes',0))}</div>
<div class="muted">Log</div><div><code>{html.escape(str(status.get('log_file','')))}</code></div>
</div>''', True)}
{subagent_section}
{cf_section}
{collapsible('Recent backup sets on QNAS', f'''<table><thead><tr><th>Run</th><th>Size</th><th>Modified</th><th>Path</th><th>Actions</th></tr></thead><tbody>{backup_rows or '<tr><td colspan=5>No backup sets found yet.</td></tr>'}</tbody></table>''', True)}
<p class='muted'>Progress polls every 2 seconds while running. JSON endpoints: <a href='/status.json'>/status.json</a> and <a href='/progress.json'>/progress.json</a></p>
</div>{SCRIPT}</body></html>"""
        out = body.encode()
        self.send_response(200)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.send_header("Cache-Control", "no-store")
        self.send_header("Content-Length", str(len(out)))
        self.end_headers(); self.wfile.write(out)

if __name__ == "__main__":
    httpd = ThreadingHTTPServer((HOST, PORT), Handler)
    print(f"Serving Hermes backup status on {HOST}:{PORT}", flush=True)
    httpd.serve_forever()
