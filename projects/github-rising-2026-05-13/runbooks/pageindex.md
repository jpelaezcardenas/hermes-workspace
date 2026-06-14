# Runbook: PageIndex

Status: Entwurf, nicht ausgeführt.
Ziel: lokales Indexing/RAG über synthetische Seiten/Dokumente evaluieren.
Sandbox: `/Users/zondrius/hermes-workspace/projects/github-rising-2026-05-13/sandbox/pageindex`
Ports: App `127.0.0.1:8741`, optional lokaler Vektorservice `127.0.0.1:8742`

## Vorbedingungen
- Keine internen URLs, keine privaten Dokumente, keine Schülerdaten.
- Crawling nur über synthetische lokale HTML-Dateien oder explizit freigegebene öffentliche Beispiele.
- Index- und Embedding-Verzeichnisse sind Wegwerf-Daten unter `sandbox/pageindex/index/`.

## Nicht ausgeführte Sandbox-Schritte

```bash
cd /Users/zondrius/hermes-workspace/projects/github-rising-2026-05-13
mkdir -p sandbox/pageindex/{repo,index,site} sandbox/_logs sandbox/_reports
cd sandbox/pageindex

# Synthetische lokale Testseiten erzeugen/ablegen, keine echten privaten Inhalte.
# cp ../../synthetic-data/demo-page-*.html site/

# Quelle nur nach manueller Prüfung klonen; URL hier bewusst Platzhalter.
git clone --depth 1 <PUBLIC_REPO_URL_FOR_PAGEINDEX> repo
cd repo

# Vor Ausführung lesen.
python - <<'PY'
from pathlib import Path
for name in ['README.md','LICENSE','pyproject.toml','setup.py','requirements.txt','package.json','Makefile','Dockerfile','.env.example']:
    p=Path(name)
    if p.exists():
        print(f'--- {name} ---')
        print(p.read_text(errors='replace')[:4000])
PY

# Optional lokale synthetische Site nur auf localhost bereitstellen.
# cd ../site
# python3 -m http.server 8741 --bind 127.0.0.1 \
#   2>&1 | tee ../_logs/pageindex-site.log

# Indexlauf nur mit explizitem Scope und Wegwerf-Index.
# cd ../repo
# PAGEINDEX_API_KEY=DUMMY_NOT_A_SECRET \
# PAGEINDEX_INDEX_DIR=../index \
# python -m <module_or_entrypoint> \
#   --input http://127.0.0.1:8741/ \
#   --scope http://127.0.0.1:8741/ \
#   --output ../index \
#   2>&1 | tee ../_logs/pageindex-run.log
```

## Checks
- Crawl-Scope ist exakt auf `http://127.0.0.1:8741/` oder konkrete öffentliche Test-URLs begrenzt.
- Keine interne Netzadresse, kein Dateisystem-Crawl außerhalb `sandbox/pageindex/site`.
- Index, Cache und Embeddings liegen unter `sandbox/pageindex/index/`.
- Keine personenbezogenen Daten in Index oder Logs.
- Bei öffentlichen Beispielseiten robots.txt/ToS beachten und Rate begrenzen.

## Abbruchregeln kandidatenspezifisch
- Abbruch bei unbeschränktem Crawl, Sitemap-Follow ohne Limit oder internem Netzscan.
- Abbruch, wenn Cloud-Vektor-DB oder API-Key zwingend erforderlich ist.
- Abbruch, wenn Embeddings/Index nicht lokal oder nicht löschbar gespeichert werden.
