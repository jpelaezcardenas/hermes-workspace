# Runbook: DeepSeek-TUI

Status: Entwurf, nicht ausgeführt.
Ziel: Terminal-UI mit lokalem Mock-LLM-Endpunkt und synthetischen Prompts testen, ohne echte DeepSeek/OpenAI/API-Keys.
Sandbox: `/Users/zondrius/hermes-workspace/projects/github-rising-2026-05-13/sandbox/deepseek-tui`
Port Mock-LLM: `127.0.0.1:8731`

## Vorbedingungen
- Keine echten API-Keys in Umgebung oder `.env`.
- Keine privaten Chat-Historien importieren.
- History/Logging wenn möglich deaktivieren oder sandbox-lokal speichern.

## Nicht ausgeführte Sandbox-Schritte

```bash
cd /Users/zondrius/hermes-workspace/projects/github-rising-2026-05-13
mkdir -p sandbox/deepseek-tui sandbox/_logs sandbox/_reports
cd sandbox/deepseek-tui

# Quelle nur nach manueller Prüfung klonen; URL hier bewusst Platzhalter.
git clone --depth 1 <PUBLIC_REPO_URL_FOR_DEEPSEEK_TUI> repo
cd repo

# Vor Ausführung lesen.
python - <<'PY'
from pathlib import Path
for name in ['README.md','LICENSE','pyproject.toml','setup.py','requirements.txt','package.json','Makefile','.env.example','config.example.toml']:
    p=Path(name)
    if p.exists():
        print(f'--- {name} ---')
        print(p.read_text(errors='replace')[:4000])
PY

# Mock-LLM in separatem Terminal vorbereiten, falls Tool OpenAI-kompatiblen Endpoint unterstützt.
# cd /Users/zondrius/hermes-workspace/projects/github-rising-2026-05-13/sandbox/deepseek-tui
# python3 - <<'PY'
# from http.server import BaseHTTPRequestHandler, HTTPServer
# import json
# class H(BaseHTTPRequestHandler):
#     def do_POST(self):
#         self.send_response(200); self.send_header('Content-Type','application/json'); self.end_headers()
#         self.wfile.write(json.dumps({'choices':[{'message':{'role':'assistant','content':'synthetic mock response'}}]}).encode())
# HTTPServer(('127.0.0.1',8731), H).serve_forever()
# PY

# Tool-Konfiguration nur mit Dummy-Platzhaltern und localhost endpoint.
# Keine echten Provider-Keys setzen.
# Platzhalter-Beispiel: DEEPSEEK_API_KEY -> DUMMY_NOT_A_SECRET
# Platzhalter-Beispiel: OPENAI_API_KEY -> DUMMY_NOT_A_SECRET
# Platzhalter-Beispiel: OPENAI_BASE_URL -> http://127.0.0.1:8731/v1
# export DEEPSEEK_TUI_HISTORY=./history-disabled-or-sandbox.json

# Start erst nach Prüfung der Installationsart, keine globale Installation.
# python3 -m venv .venv && . .venv/bin/activate
# python -m pip install --dry-run -r requirements.txt 2>&1 | tee ../_logs/deepseek-tui-pip-dry-run.log
# python -m <module_or_entrypoint> 2>&1 | tee ../_logs/deepseek-tui-run.log
```

## Checks
- Keine echte Remote-Provider-Konfiguration aktiv.
- Base-URL zeigt auf `http://127.0.0.1:8731` oder äquivalent lokalen Mock.
- Keine persistente History außerhalb der Sandbox.
- TUI zeigt keine Secrets, liest keine Shell-History.
- Logs nach Test auf Prompt-/Secret-Leaks prüfen.

## Abbruchregeln kandidatenspezifisch
- Abbruch, wenn echte DeepSeek/OpenAI/API-Credentials verlangt werden.
- Abbruch, wenn ohne Opt-out externe Provider kontaktiert werden.
- Abbruch, wenn lokale Shell-History, SSH-Keys oder Konfigurationsdateien eingelesen werden.
