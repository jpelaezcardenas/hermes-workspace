# React Doctor – zweiter kontrollierter Folgetest

Datum: 2026-05-13
Arbeitsbereich: `/Users/zondrius/hermes-workspace/projects/github-rising-2026-05-13`
Testobjekt: synthetisches Demo-Projekt unter `sandbox/react-doctor/demo-react-app`
Tool: `react-doctor@0.1.6`

## Kurzfazit

Der zweite Test war technisch erfolgreich: React Doctor lief unter einer sandbox-lokalen Node-22-Umgebung mit `--offline --json --fail-on none` gegen das synthetische Demo-Projekt und erzeugte reproduzierbare JSON-Befunde.

Der frühere `oxc-parser`-/Code-Signature-Fehler trat unter Node 22.22.2 nicht mehr auf. React Doctor erkannte zwei plausible Befunde: eine Effect-Kette und `key={index}` in einer gefilterten Liste.

Bewertung: `Watch`, noch kein `Go`. Das Tool ist grundsätzlich brauchbar für einen zusätzlichen React-Reviewer-Blick, aber der praktische Mehrwert gegenüber ESLint/React-Hooks/TypeScript ist im Mini-Test noch begrenzt, die Score-Logik wirkt trotz erkannter Probleme zu optimistisch, und native Dependencies bleiben eine Setup-Fragilität.

## Verwendete Umgebung

Host:
- macOS: Darwin 24.2.0 arm64
- Ausgangs-Node: `/Applications/Codex.app/Contents/Resources/node`, `v24.14.0`
- Ausgangs-npm: `/Users/zondrius/.nvm/versions/node/v24.14.0/bin/npm`, `11.9.0`
- Docker/Linux-Sandbox: nicht verfügbar (`docker` nicht im PATH)

Kontrollierte Wiederholungsumgebung:
- `mise` lokal vorhanden: `2026.5.0 macos-arm64`
- Node 22 wurde ausschließlich mit sandbox-lokalen mise-Verzeichnissen genutzt:
  - `MISE_DATA_DIR=/Users/zondrius/hermes-workspace/projects/github-rising-2026-05-13/sandbox/react-doctor/.mise-data`
  - `MISE_CACHE_DIR=/Users/zondrius/hermes-workspace/projects/github-rising-2026-05-13/sandbox/react-doctor/.mise-cache`
  - `MISE_CONFIG_DIR=/Users/zondrius/hermes-workspace/projects/github-rising-2026-05-13/sandbox/react-doctor/.mise-config`
- Node: `v22.22.2`
- npm: `10.9.7`
- npm-Cache für React Doctor: `sandbox/react-doctor/.npm-cache-node22`

Hinweis: Es gab keine globale Node-Umstellung und keine globale npm-Installation. `mise use --path sandbox/react-doctor node@22` legte eine lokale `sandbox/react-doctor/mise.toml` an.

## Ursache des ersten Fehlers

Der erste Lauf scheiterte nicht an React-Doctor-Regeln selbst, sondern vor der Analyse beim Laden des nativen `oxc-parser`-Bindings.

Beobachtete Erstfehler:
- Node-Version: `v24.14.0`
- Native Binding: `@oxc-parser/binding-darwin-arm64/parser.darwin-arm64.node`
- Fehlerklasse: `ERR_DLOPEN_FAILED`
- macOS-Code-Signature-Meldung: `mapping process and mapped file (non-platform) have different Team IDs`
- Zusätzlich meldete `oxc-parser`: `Cannot find native binding. npm has a bug related to optional dependencies ...`

Einschätzung:
- Hauptursache war die Kombination aus macOS, Node 24.14.0 und nativem `oxc-parser`-Binding/Code-Signature.
- Eine reine npm-optional-dependency-Problematik war nicht ausgeschlossen, aber der prägnante Fehler war `ERR_DLOPEN_FAILED` mit Code-Signature-Konflikt.
- Node 22.22.2 beseitigte diesen konkreten Fehler im zweiten Lauf.

## Wurde der oxc-parser-Fehler behoben?

Ja, für diese kontrollierte Node-22-Wiederholung.

Der Lauf mit Node 22.22.2 beendete sich mit Exit-Code 0. `react-doctor-second-stderr.log` blieb leer. Der Diagnoseoutput wurde unter `sandbox/_reports/react-doctor-second-output.json` erzeugt.

Zusätzlich wurde eine Wiederholung mit demselben Cache erfolgreich ausgeführt. Eine weitere Wiederholung mit `npm_config_offline=true` lief ebenfalls erfolgreich aus dem lokalen npm-Cache.

## Hat React Doctor Diagnosebefunde erzeugt?

Ja.

Output-Datei:
`/Users/zondrius/hermes-workspace/projects/github-rising-2026-05-13/sandbox/_reports/react-doctor-second-output.json`

Zusammenfassung aus JSON:
- `ok: true`
- `schemaVersion: 1`
- `version: 0.1.6`
- `mode: full`
- `sourceFileCount: 1`
- `errorCount: 0`
- `warningCount: 2`
- `affectedFileCount: 1`
- `totalDiagnosticCount: 2`
- Score: `99`, Label: `Great`

## Erkannte Befunde

1. `no-effect-chain`
   - Datei: `src/main.jsx`
   - Zeile: 16, Spalte: 3
   - Kategorie: `State & Effects`
   - Severity: `warning`
   - Inhalt: Ein `useEffect` reagiert auf `copiedItems`, das durch einen anderen `useEffect` gesetzt wird. React Doctor bewertet das als Effect-Kette mit zusätzlichen Render-Schritten und starrer werdender Logik.

2. `no-array-index-as-key`
   - Datei: `src/main.jsx`
   - Zeile: 35, Spalte: 13
   - Kategorie: `Correctness`
   - Severity: `warning`
   - Inhalt: `key={index}` wird in einer Liste verwendet, die gefiltert werden kann. React Doctor empfiehlt einen stabilen Schlüssel wie `item.id`.

## Fachliche Sinnhaftigkeit der Befunde

Beide Befunde sind fachlich sinnvoll.

`no-effect-chain`:
- Im Demo-Code wird `copiedItems` in einem Effect aus `query` neu gesetzt.
- Ein weiterer Effect berechnet daraus `derivedCount`.
- Das ist ein bewusst eingebautes Muster für abgeleiteten State und Effect-Verkettung.
- Die Empfehlung, berechenbare Werte im Render-Pfad oder näher am auslösenden Ereignis zu berechnen, ist plausibel.

`no-array-index-as-key`:
- `visibleItems` entsteht durch Filterung.
- In einer gefilterten/reorderbaren Liste ist `key={index}` tatsächlich riskant.
- Die Empfehlung `key={item.id}` passt zum Demo-Datensatz.

## False Positives / False Negatives

False Positives:
- Keine klaren False Positives im erzeugten Output. Beide Befunde treffen das synthetische Demo-Projekt sinnvoll.

False Negatives / nicht erkannte erwartbare Muster:
- React Doctor erkannte nur 2 der bewusst eingebauten Problemfelder.
- Nicht gemeldet wurden u. a.:
  - instabiles Objekt `unstableOptions` als Prop
  - Inline-Callback in `map`
  - potenziell teure Berechnung pro Item
  - große/gemischte Komponente `HugeDashboard`
  - unnötiges Neumappen/Kopieren von State als eigener Befund
  - fehlende/unklare Memoisierung der gefilterten Liste
- Mögliche Erklärung: React Doctor priorisiert bestimmte Regelmuster; manche erwarteten Punkte sind kontextabhängig oder fallen eher unter ESLint/React Compiler/Performance-Review als unter aktuell aktive React-Doctor-Regeln.

Score-Risiko:
- Trotz absichtlich problematischem Demo-Code vergibt React Doctor `99 / Great`.
- Das kann Scheinsicherheit erzeugen. Der Score sollte daher nicht als Qualitätsfreigabe verwendet werden, sondern nur als ergänzender Hinweis neben den Einzelbefunden.

## Vergleich mit dem ersten Test

Erster Test:
- Umgebung: macOS 15.2 / Node 24.14.0
- Ergebnis: CLI startete, scheiterte aber vor der Analyse am nativen `oxc-parser`-/Code-Signature-Problem.
- Diagnosebefunde: keine.
- Entscheidung: `Watch`.

Zweiter Test:
- Umgebung: macOS 15.2 / sandbox-lokale Node-22-Umgebung via mise
- Ergebnis: CLI läuft mit Exit-Code 0.
- Diagnosebefunde: 2 JSON-Warnings.
- Wiederholbarkeit: erfolgreicher Repeat-Lauf, zusätzlich erfolgreicher Cache-Offline-Lauf mit `npm_config_offline=true`.
- Entscheidung: weiterhin `Watch`, aber deutlich besser begründet als im ersten Test.

## Sicherheitsstatus

Eingehalten:
- keine produktive Installation
- keine globale Installation
- keine globale Node-Umstellung
- keine echten API-Keys
- keine privaten Registries
- keine Schülerdaten
- keine privaten Dokumente
- keine Verbandsinterna
- keine Analyse echter Lernwerkstatt-/Wahren-/Hermes-Projektdateien
- keine Pushes
- keine Deployments
- kein Agent-Installationsmodus von React Doctor
- kein Upload von Diagnoseberichten
- Diagnose nur gegen synthetisches Demo-Projekt
- Logs und Reports ausschließlich unter `sandbox/_logs` und `sandbox/_reports`
- Tool-Arbeitsdaten unter `sandbox/react-doctor`

Einschränkung:
- Für die initiale Bereitstellung von Node 22 und `react-doctor@0.1.6` waren Netzwerkzugriffe zum Download erforderlich. Der eigentliche React-Doctor-Diagnoselauf wurde mit `--offline` ausgeführt. Nach dem Cache-Aufbau war ein zusätzlicher Lauf mit `npm_config_offline=true` erfolgreich.

## Netzwerk-/Telemetry-Beobachtung

Beobachtete/erwartete Netzwerkzugriffe:
- `mise` lud Node `v22.22.2` in die sandbox-lokalen mise-Verzeichnisse.
- `npm exec --package='react-doctor@0.1.6'` nutzte den sandbox-lokalen npm-Cache; beim ersten Node-22-Lauf kann npm die Paketdaten aus Registry/Cache bezogen haben.

Telemetry/Upload:
- React Doctor wurde ausschließlich mit `--offline` gestartet.
- Es wurde kein Share-/Upload-Modus genutzt.
- `react-doctor-second-stderr.log` war leer.
- Der erfolgreiche Zusatzlauf mit `npm_config_offline=true` spricht dafür, dass der Diagnosevorgang selbst ohne Registry-Netzwerk reproduzierbar ist, sobald Tool und Node im lokalen Cache liegen.

Quellcode-Hinweis aus dem ersten Bericht bleibt relevant:
- Ohne `--offline` kann React Doctor die Score-API `https://www.react.doctor/api/score` nutzen.
- Für sensible Projekte bleibt `--offline` verpflichtend.

## Angelegte Dateien

Neue bzw. für den zweiten Test relevante Dateien:
- `/Users/zondrius/hermes-workspace/projects/github-rising-2026-05-13/sandbox/_logs/react-doctor-second-env-check.log`
- `/Users/zondrius/hermes-workspace/projects/github-rising-2026-05-13/sandbox/_logs/react-doctor-second-precheck.log`
- `/Users/zondrius/hermes-workspace/projects/github-rising-2026-05-13/sandbox/_logs/react-doctor-second-node22-setup.log`
- `/Users/zondrius/hermes-workspace/projects/github-rising-2026-05-13/sandbox/_logs/react-doctor-second-stderr.log`
- `/Users/zondrius/hermes-workspace/projects/github-rising-2026-05-13/sandbox/_logs/react-doctor-second-exit.log`
- `/Users/zondrius/hermes-workspace/projects/github-rising-2026-05-13/sandbox/_logs/react-doctor-second-repeat-stderr.log`
- `/Users/zondrius/hermes-workspace/projects/github-rising-2026-05-13/sandbox/_logs/react-doctor-second-repeat-exit.log`
- `/Users/zondrius/hermes-workspace/projects/github-rising-2026-05-13/sandbox/_logs/react-doctor-second-npm-offline-stderr.log`
- `/Users/zondrius/hermes-workspace/projects/github-rising-2026-05-13/sandbox/_logs/react-doctor-second-npm-offline-exit.log`
- `/Users/zondrius/hermes-workspace/projects/github-rising-2026-05-13/sandbox/_reports/react-doctor-second-output.json`
- `/Users/zondrius/hermes-workspace/projects/github-rising-2026-05-13/sandbox/_reports/react-doctor-second-output-repeat.json`
- `/Users/zondrius/hermes-workspace/projects/github-rising-2026-05-13/sandbox/_reports/react-doctor-second-output-npm-offline.json`
- `/Users/zondrius/hermes-workspace/projects/github-rising-2026-05-13/sandbox/_reports/react-doctor-second-test-2026-05-13.md`
- `/Users/zondrius/hermes-workspace/projects/github-rising-2026-05-13/sandbox/react-doctor/mise.toml`
- `/Users/zondrius/hermes-workspace/projects/github-rising-2026-05-13/sandbox/react-doctor/.mise-data/`
- `/Users/zondrius/hermes-workspace/projects/github-rising-2026-05-13/sandbox/react-doctor/.mise-cache/`
- `/Users/zondrius/hermes-workspace/projects/github-rising-2026-05-13/sandbox/react-doctor/.mise-config/`
- `/Users/zondrius/hermes-workspace/projects/github-rising-2026-05-13/sandbox/react-doctor/.npm-cache-node22/`

## Ausgeführte Befehle

```bash
cd /Users/zondrius/hermes-workspace/projects/github-rising-2026-05-13
pwd
uname -a
node -v
npm -v
command -v docker || true
command -v mise || true
```

```bash
cd /Users/zondrius/hermes-workspace/projects/github-rising-2026-05-13
mise --version
mise current node || true
python3 - <<'PY'
from pathlib import Path
allowed=[Path('sandbox/react-doctor'),Path('sandbox/_logs'),Path('sandbox/_reports')]
for root in allowed:
    print('---', root, '---')
    for p in sorted(root.rglob('*')):
        if '.git' in p.parts or '.npm-cache' in p.parts or 'node_modules' in p.parts:
            continue
        if p.is_file(): print(p)
PY
```

```bash
cd /Users/zondrius/hermes-workspace/projects/github-rising-2026-05-13
mkdir -p sandbox/react-doctor/.mise-data sandbox/react-doctor/.mise-cache sandbox/react-doctor/.mise-config sandbox/_logs sandbox/_reports
export MISE_DATA_DIR="$PWD/sandbox/react-doctor/.mise-data"
export MISE_CACHE_DIR="$PWD/sandbox/react-doctor/.mise-cache"
export MISE_CONFIG_DIR="$PWD/sandbox/react-doctor/.mise-config"
mise use --yes --path sandbox/react-doctor node@22
mise exec --cd sandbox/react-doctor node@22 -- node -v
mise exec --cd sandbox/react-doctor node@22 -- npm -v
```

```bash
cd /Users/zondrius/hermes-workspace/projects/github-rising-2026-05-13
export MISE_DATA_DIR="$PWD/sandbox/react-doctor/.mise-data"
export MISE_CACHE_DIR="$PWD/sandbox/react-doctor/.mise-cache"
export MISE_CONFIG_DIR="$PWD/sandbox/react-doctor/.mise-config"
export npm_config_cache="$PWD/sandbox/react-doctor/.npm-cache-node22"
export npm_config_audit=false
export npm_config_fund=false
export npm_config_update_notifier=false
export NO_COLOR=1
export CI=1
mise exec --cd sandbox/react-doctor node@22 -- npm exec --yes --package='react-doctor@0.1.6' -- react-doctor ./demo-react-app --offline --json --fail-on none > sandbox/_reports/react-doctor-second-output.json 2> sandbox/_logs/react-doctor-second-stderr.log
```

```bash
# Wiederholung mit gleichem Cache
cd /Users/zondrius/hermes-workspace/projects/github-rising-2026-05-13
export MISE_DATA_DIR="$PWD/sandbox/react-doctor/.mise-data"
export MISE_CACHE_DIR="$PWD/sandbox/react-doctor/.mise-cache"
export MISE_CONFIG_DIR="$PWD/sandbox/react-doctor/.mise-config"
export npm_config_cache="$PWD/sandbox/react-doctor/.npm-cache-node22"
export npm_config_audit=false
export npm_config_fund=false
export npm_config_update_notifier=false
export NO_COLOR=1
export CI=1
mise exec --cd sandbox/react-doctor node@22 -- npm exec --yes --package='react-doctor@0.1.6' -- react-doctor ./demo-react-app --offline --json --fail-on none > sandbox/_reports/react-doctor-second-output-repeat.json 2> sandbox/_logs/react-doctor-second-repeat-stderr.log
```

```bash
# Cache-Offline-Wiederholung
cd /Users/zondrius/hermes-workspace/projects/github-rising-2026-05-13
export MISE_DATA_DIR="$PWD/sandbox/react-doctor/.mise-data"
export MISE_CACHE_DIR="$PWD/sandbox/react-doctor/.mise-cache"
export MISE_CONFIG_DIR="$PWD/sandbox/react-doctor/.mise-config"
export npm_config_cache="$PWD/sandbox/react-doctor/.npm-cache-node22"
export npm_config_audit=false
export npm_config_fund=false
export npm_config_update_notifier=false
export npm_config_offline=true
export NO_COLOR=1
export CI=1
mise exec --cd sandbox/react-doctor node@22 -- npm exec --yes --package='react-doctor@0.1.6' -- react-doctor ./demo-react-app --offline --json --fail-on none > sandbox/_reports/react-doctor-second-output-npm-offline.json 2> sandbox/_logs/react-doctor-second-npm-offline-stderr.log
```

## Go / Watch / No-Go

Entscheidung: `Watch`.

Warum kein `Go`:
- React Doctor läuft zwar reproduzierbar in der kontrollierten Node-22-Sandbox und erzeugt JSON-Befunde.
- Es wurde aber nur ein kleines synthetisches Projekt getestet.
- Der Mehrwert gegenüber ESLint/React-Hooks/TypeScript ist noch nicht stark genug belegt.
- Der Score `99 / Great` trotz bewusst eingebauter Probleme ist als Qualitätsgate ungeeignet.
- Native Dependencies (`oxc-parser`, `oxlint`) bleiben plattform- und versionssensibel.
- Ohne harte Guardrails wäre die Score-API/Share-Funktion ein Datenschutzrisiko.

Warum kein `No-Go`:
- Offline-Modus funktionierte im Test.
- JSON-Ausgabe funktionierte.
- Keine Uploads/Telemetry wurden im Diagnosemodus beobachtet.
- Die beiden Befunde waren fachlich sinnvoll.
- Der erste native Binding-Fehler war durch Node 22 vermeidbar.

## Empfehlung: Hermes-Reviewer-Skill?

Noch keinen produktiven Hermes-Reviewer-Skill anlegen.

Sinnvoll wäre zunächst ein kleiner Watch-/Pilot-Skill oder Runbook-Abschnitt, aber nur mit engen Leitplanken:
- nur auf synthetischen Projekten oder expliziten Kopien, nie direkt auf sensiblen Produktivdaten
- immer gepinnte Version: `react-doctor@0.1.6` oder bewusst geprüfte Nachfolgeversion
- immer Node 22, solange Node 24 auf macOS native Binding-Probleme zeigt
- immer `--offline`
- immer `--json` oder `--json-compact`
- immer `--fail-on none` für Diagnosemodus
- immer sandbox-lokaler npm-Cache
- nie `react-doctor install` ohne separate Review
- keine Score-/Share-API
- Befunde nur als Ergänzung zu ESLint/TypeScript/Build/Barrierefreiheit/GE-Fachprüfung verwenden

Nächster sicherer Schritt:
- Noch ein dritter Mini-Vergleich gegen ein etwas realistischeres, aber weiterhin synthetisches React-Projekt mit ESLint-Baseline durchführen.
- Erst wenn React Doctor dort wieder stabil läuft und zusätzliche sinnvolle Befunde liefert, kann daraus ein enger `react-doctor-offline-check`-Skill für Coder-/Reviewer-Aufgaben entstehen.
