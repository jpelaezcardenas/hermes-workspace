# Runbook: react-doctor

Status: Entwurf, nicht ausgeführt.
Ziel: React-Diagnosewerkzeug an einem neu erzeugten synthetischen Mini-Projekt testen.
Sandbox: `/Users/zondrius/hermes-workspace/projects/github-rising-2026-05-13/sandbox/react-doctor`
Port: Demo-App bevorzugt `127.0.0.1:8721`

## Vorbedingungen
- Keine Prüfung an bestehenden privaten React-Repos.
- Keine npm tokens, keine privaten Registries.
- Nur lokales Wegwerf-Demo-Projekt.

## Nicht ausgeführte Sandbox-Schritte

```bash
cd /Users/zondrius/hermes-workspace/projects/github-rising-2026-05-13
mkdir -p sandbox/react-doctor sandbox/_logs sandbox/_reports
cd sandbox/react-doctor

# Quelle nur nach manueller Prüfung klonen; URL hier bewusst Platzhalter.
git clone --depth 1 <PUBLIC_REPO_URL_FOR_REACT_DOCTOR> react-doctor-repo
cd react-doctor-repo

# Vor Ausführung lesen.
node -e "const fs=require('fs'); for (const f of ['README.md','LICENSE','package.json','pnpm-lock.yaml','package-lock.json','yarn.lock']) if (fs.existsSync(f)) console.log('--- '+f+' ---\n'+fs.readFileSync(f,'utf8').slice(0,4000))"

# Separates synthetisches React-Projekt vorbereiten, nicht bestehende Projekte verwenden.
cd ..
mkdir demo-react-app
cd demo-react-app
# npm create vite@latest . -- --template react
# npm install --package-lock-only

# Diagnose nur auf demo-react-app richten, Report sandbox-lokal speichern.
# cd ../react-doctor-repo
# npm ci --ignore-scripts
# npm run <doctor-command> -- ../demo-react-app \
#   --output ../_reports/react-doctor-report.json \
#   2>&1 | tee ../_logs/react-doctor-run.log

# Demo-App falls nötig nur localhost starten.
# cd ../demo-react-app
# npm run dev -- --host 127.0.0.1 --port 8721
```

## Checks
- `package.json` scripts geprüft, besonders `postinstall`, `prepare`, `preinstall`.
- Keine globale Installation (`npm -g`, `pnpm add -g`, `yarn global`) verwendet.
- Keine Analyse bestehender Workspace-Projekte.
- Keine Schreibzugriffe außerhalb `sandbox/react-doctor`.
- Report liegt ausschließlich unter `sandbox/_reports/`.

## Abbruchregeln kandidatenspezifisch
- Abbruch bei privater Registry, npm token, GitHub token oder Login-Anforderung.
- Abbruch bei automatischem Upload von Diagnoseberichten.
- Abbruch, wenn Tool Quellcode außerhalb des angegebenen Demo-Projekts durchsucht.
