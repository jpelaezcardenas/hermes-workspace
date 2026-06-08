#!/usr/bin/env python3
import argparse
import json
import os
import pathlib
import subprocess
import shlex
import tempfile
import time
from datetime import datetime, timezone

MODEL_STATE_PATH = pathlib.Path('/etc/hermes-subagent-models.json')
DEFAULT_MODEL = 'qwen3-next:80b'
SERVERS = {
    '219': {
        'host': '192.168.1.219',
        'name': 'PiBench',
        'env_path': '/mnt/pve/LocalDir/hermes-critical/pve2/hermes-home/private/PiBench.env',
        'out_dir': '/var/lib/hermes-subagent-219',
        'env_prefix': 'PIBENCH',
        'sudo_root': True,
    },
    '151': {
        'host': '192.168.1.151',
        'name': 'DietPi',
        'env_path': '/mnt/pve/LocalDir/hermes-critical/pve2/hermes-home/private/dietpi.env',
        'out_dir': '/var/lib/hermes-subagent-151',
        'env_prefix': 'DIETPI',
    },
    '108': {
        'host': '192.168.1.108',
        'name': 'DietGTX780Ti',
        'env_path': '/mnt/pve/LocalDir/hermes-critical/pve2/hermes-home/private/hermes_slave.env',
        'out_dir': '/var/lib/hermes-subagent-108',
        'env_prefix': 'DIETPI',
    },
}


def load_env(path):
    vals = {}
    p = pathlib.Path(path)
    if not p.exists():
        return vals
    for line in p.read_text(errors='ignore').splitlines():
        s = line.strip()
        if not s or s.startswith('#') or '=' not in s:
            continue
        k, v = s.split('=', 1)
        vals[k.strip()] = v.strip().strip('"\'')
    return vals


def desired_model(server_id):
    env_key = f'HERMES_{server_id}_OLLAMA_MODEL'
    if os.environ.get(env_key):
        return os.environ[env_key]
    try:
        data = json.loads(MODEL_STATE_PATH.read_text())
        return str(data.get(server_id) or data.get('default') or DEFAULT_MODEL)
    except Exception:
        return DEFAULT_MODEL


def run(cmd, timeout=20):
    started = time.time()
    try:
        p = subprocess.run(cmd, capture_output=True, text=True, timeout=timeout)
        return {
            'ok': p.returncode == 0,
            'returncode': p.returncode,
            'stdout': (p.stdout or '').strip()[-4000:],
            'stderr': (p.stderr or '').strip()[-1200:],
            'elapsed_seconds': round(time.time() - started, 2),
        }
    except Exception as e:
        return {'ok': False, 'returncode': None, 'stdout': '', 'stderr': str(e), 'elapsed_seconds': round(time.time() - started, 2)}


def env_value(env, prefix, name, *fallback_keys):
    if prefix:
        val = env.get(f'{prefix}_{name}')
        if val:
            return val
    for key in fallback_keys:
        val = env.get(key)
        if val:
            return val
    return ''


def ssh_cmd(env, remote_script, default_host, cfg=None):
    cfg = cfg or {}
    prefix = cfg.get('env_prefix', '')
    host = env_value(env, prefix, 'HOST', 'DIETPI_HOST', 'HERMES_MASTER_HOST') or default_host
    user = env_value(env, prefix, 'USER', 'DIETPI_USER', 'HERMES_MASTER_USER') or 'root'
    port = env_value(env, prefix, 'PORT', 'DIETPI_PORT', 'HERMES_MASTER_PORT') or '22'
    strict = env.get('HERMES_MASTER_STRICT_HOST_KEY_CHECKING', 'accept-new')
    key = env.get('HERMES_MASTER_SSH_KEY', '')
    password = env_value(env, prefix, 'PASSWORD', 'DIETPI_PASSWORD', 'HERMES_MASTER_PASSWORD')
    if cfg.get('sudo_root') and user != 'root':
        remote_script = 'sudo -H bash -lc ' + shlex.quote(remote_script)
    cmd = ['sshpass', '-p', password, 'ssh', '-o', 'ConnectTimeout=8', '-o', 'BatchMode=no', '-o', f'StrictHostKeyChecking={strict}', '-p', port]
    if key and pathlib.Path(key).exists():
        cmd += ['-i', key]
    cmd += [f'{user}@{host}', remote_script]
    return cmd, bool(password), host


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--server', default='108', choices=list(SERVERS))
    args = ap.parse_args()
    cfg = SERVERS[args.server]
    model = desired_model(args.server)
    env = load_env(cfg['env_path'])
    cmd_dummy, has_password, host = ssh_cmd(env, 'true', cfg['host'], cfg)
    out_dir = pathlib.Path(cfg['out_dir'])
    out_path = out_dir / 'status.json'
    status = {
        'checked_at': datetime.now(timezone.utc).isoformat(),
        'server_id': args.server,
        'server': host,
        'name': cfg['name'],
        'role': 'Hermes remote subagent host',
        'desired_provider': 'ollama-cloud',
        'desired_model': model,
        'up': False,
        'ssh_ok': False,
        'hermes_ok': False,
        'ollama_cloud_ok': False,
        'ready': False,
        'summary': 'not checked',
    }

    ping = run(['ping', '-c', '1', '-W', '1', host], timeout=4)
    status['ping_ok'] = ping['ok']
    status['up'] = ping['ok']

    if not has_password:
        status['summary'] = f'{host} ping={ping["ok"]}; missing SSH credentials on 192.168.1.140'
    else:
        remote_probe = r'''
set -o pipefail
printf 'hostname='; hostname -f 2>/dev/null || hostname
printf 'whoami='; whoami
printf 'hermes='; command -v hermes || command -v /root/.local/bin/hermes || true
printf 'hermes_version='; (/root/.local/bin/hermes --version 2>/dev/null || hermes --version 2>/dev/null || true) | head -1
printf 'delegation='; grep -A6 '^delegation:' /root/.hermes/config.yaml 2>/dev/null | sed -n '1,7p' | tr '\n' ';' | sed -E 's/api_key: .*/api_key: [REDACTED]/'
printf '\nmodel='; grep -A5 '^model:' /root/.hermes/config.yaml 2>/dev/null | sed -n '1,6p' | tr '\n' ';'
printf '\n'
'''
        ssh, _, _ = ssh_cmd(env, remote_probe, cfg['host'], cfg)
        ssh_result = run(ssh, timeout=25)
        status['ssh_ok'] = ssh_result['ok']
        status['remote_probe'] = ssh_result['stdout'] if ssh_result['ok'] else ssh_result['stderr']
        status['hermes_ok'] = ssh_result['ok'] and 'hermes=' in ssh_result['stdout'] and ('/hermes' in ssh_result['stdout'] or 'hermes_version=' in ssh_result['stdout'])

        remote_llm = f'''
set -a; . /root/.hermes/.env 2>/dev/null || true; set +a
python3 - <<'PY'
import os,json,urllib.request,urllib.error,time
model={model!r}
body=json.dumps({{"model":model,"messages":[{{"role":"system","content":"Answer only the exact requested token."}},{{"role":"user","content":"Reply exactly OK"}}],"stream":False,"max_tokens":16}}).encode()
req=urllib.request.Request("https://ollama.com/v1/chat/completions",data=body,headers={{"Authorization":"Bearer "+os.environ.get("OLLAMA_API_KEY",""),"Content-Type":"application/json"}})
try:
    t=time.time()
    with urllib.request.urlopen(req,timeout=45) as r:
        txt=r.read().decode("utf-8","replace")
        http_status=r.status
    data=json.loads(txt)
    choices=data.get("choices",[])
    msg=choices[0].get("message",{{}}) if choices else {{}}
    content=(msg.get("content") or "").strip()
    reasoning=(msg.get("reasoning") or msg.get("thinking") or "").strip()
    ok = bool(http_status == 200 and choices and msg)
    print(json.dumps({{"ok": ok, "model": model, "http_status": http_status, "content": content[:80], "reasoning_present": bool(reasoning), "elapsed_seconds": round(time.time()-t,2)}}))
except urllib.error.HTTPError as e:
    print(json.dumps({{"ok": False, "model": model, "http_status": e.code, "error": e.read().decode("utf-8","replace")[:240]}}))
except Exception as e:
    print(json.dumps({{"ok": False, "model": model, "error": str(e)}}))
PY
'''
        llm_cmd, _, _ = ssh_cmd(env, remote_llm, cfg['host'], cfg)
        llm = run(llm_cmd, timeout=70)
        try:
            llm_json = json.loads((llm['stdout'] or '{}').splitlines()[-1]) if llm['stdout'] else {}
        except Exception:
            llm_json = {'ok': False, 'error': llm['stdout'] or llm['stderr']}
        status['ollama_cloud'] = llm_json
        status['ollama_cloud_ok'] = bool(llm_json.get('ok'))
        status['ready'] = bool(status['up'] and status['ssh_ok'] and status['hermes_ok'] and status['ollama_cloud_ok'])
        status['summary'] = 'ready' if status['ready'] else 'not ready: ' + ', '.join(k for k in ['up','ssh_ok','hermes_ok','ollama_cloud_ok'] if not status.get(k))

    out_dir.mkdir(parents=True, exist_ok=True)
    fd, tmp = tempfile.mkstemp(prefix='status.', suffix='.json', dir=str(out_dir))
    with os.fdopen(fd, 'w') as f:
        json.dump(status, f, indent=2)
        f.write('\n')
    os.replace(tmp, out_path)
    print(json.dumps({k: status[k] for k in ['server','ready','summary','desired_provider','desired_model']}, indent=2))


if __name__ == '__main__':
    main()
