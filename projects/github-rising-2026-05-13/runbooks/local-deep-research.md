# Runbook: local-deep-research

Status: Entwurf, nicht ausgeführt.
Ziel: lokale Research-Funktion mit synthetischen/public Dokumenten bewerten, ohne produktive Installation.
Sandbox: `/Users/zondrius/hermes-workspace/projects/github-rising-2026-05-13/sandbox/local-deep-research`
Ports: bevorzugt `127.0.0.1:8711`, optional Backend `127.0.0.1:8712`

## Vorbedingungen
- Preflight-Checkliste gelesen: `checks/preflight-checklist.md`
- Abbruchregeln gelesen: `checks/abort-rules.md`
- Keine echten API-Keys in Shell-Umgebung.
- Nur synthetische Daten aus `synthetic-data/`.

## Nicht ausgeführte Sandbox-Schritte

```bash
cd /Users/zondrius/hermes-workspace/projects/github-rising-2026-05-13
mkdir -p sandbox/local-deep-research sandbox/_logs sandbox/_reports
cd sandbox/local-deep-research

# Quelle nur nach manueller Prüfung klonen; URL hier bewusst Platzhalter.
git clone --depth 1 <PUBLIC_REPO_URL_FOR_LOCAL_DEEP_RESEARCH> repo
cd repo

# Vor Ausführung lesen, nicht überspringen.
python - <<'PY'
from pathlib import Path
for name in ['README.md','LICENSE','pyproject.toml','setup.py','requirements.txt','package.json','Makefile','Dockerfile']:
    p=Path(name)
    if p.exists():
        print(f'--- {name} ---')
        print(p.read_text(errors='replace')[:4000])
PY

# Falls Python-Projekt: nur lokale venv in Sandbox, keine globale Installation.
python3 -m venv .venv
. .venv/bin/activate
python -m pip install --upgrade pip
python -m pip install --dry-run -r requirements.txt 2>&1 | tee ../../_logs/local-deep-research-pip-dry-run.log

# Erst nach Prüfung der Dry-Run-Ausgabe optional installieren.
# python -m pip install -r requirements.txt

# Beispielstart nur localhost, Dummy-Credentials, synthetische Daten.
# API_KEY=DUMMY_NOT_A_SECRET \
# LDR_DATA_DIR=../../synthetic-data \
# python -m <module_or_entrypoint> --host 127.0.0.1 --port 8711 \
#   2>&1 | tee ../../_logs/local-deep-research-run.log
```

## Checks
- README/Lizenz und dependency files geprüft.
- Keine `curl | sh`, keine unbekannten Postinstall-Hooks, keine Telemetriepflicht.
- Server bindet ausschließlich an `127.0.0.1`.
- Kein Zugriff auf Home-, Browser-, Cloud- oder produktive Projektverzeichnisse.
- Ergebnisse enthalten nur synthetische Quellen und lokale Pfade.
- Logs enthalten keine Secrets.

## Abbruchregeln kandidatenspezifisch
- Abbruch, wenn echte Such-/LLM-API-Keys verlangt werden.
- Abbruch, wenn Tool private Browserprofile, lokale Indizes oder externe Crawls erzwingt.
- Abbruch, wenn Research-Agent unkontrollierte Websuche ohne Scope-Limit startet.
