# Sandbox-Test: millionco/react-doctor

Datum: 2026-05-13
Arbeitsbereich: `/Users/zondrius/hermes-workspace/projects/github-rising-2026-05-13`
Sandbox: `sandbox/react-doctor`

## Kurzfazit

React Doctor ist als Idee für Hermes-Reacts-Qualitätsprüfung interessant, aber für Chris' Setup aktuell nur `Watch`, nicht `Go`.

Positiv: README, Lizenz und Quellcode zeigen ein echtes lokales CLI-/Lint-Konzept mit JSON-Ausgabe, Offline-Modus, React-/Next-/Vite-/React-Native-Regeln, Knip/Oxlint-Integration und Agent-Installationsmodus. Das passt grundsätzlich zu Hermes-App-Prototypen.

Einschränkend: Der sichere Sandbox-Lauf auf macOS 15.2 / Node 24.14.0 scheiterte vor der Analyse an einer nativen `oxc-parser`-Binding-/Code-Signature-Problematik. Es wurden dadurch keine echten Diagnostikbefunde gegen das synthetische Demo-Projekt erzeugt. Außerdem ist Telemetrie/Score-API standardmäßig relevant: ohne `--offline` versucht React Doctor laut Quellcode, Diagnostikdaten ohne Dateipfade an `https://www.react.doctor/api/score` zu senden und ggf. einen Share-Link zu erzeugen. Für Schul-/VdS-/Hermes-Projekte darf es daher nur mit `--offline`, sandbox-lokalem npm-cache und ohne Agent-Installationsmodus geprüft werden.

## Start erfolgreich

Teilweise.

Erfolgreich:
- Integrationsplan, Preflight, Abbruchregeln und Runbook gelesen.
- Primärquelle geklont: `https://github.com/millionco/react-doctor.git`
- README, LICENSE, Root-`package.json`, `packages/react-doctor/package.json` und relevante Telemetrie-/Scoring-Dateien geprüft.
- Synthetisches React-Demo-Projekt unter `sandbox/react-doctor/demo-react-app` angelegt.
- React Doctor wurde mit `--offline --json --fail-on none` ausschließlich gegen das synthetische Demo-Projekt gestartet.

Nicht erfolgreich:
- React Doctor erzeugte keinen Diagnosebericht, weil ein natives `@oxc-parser/binding-darwin-arm64` / `oxc-parser` Binding auf diesem macOS/Node-Setup nicht geladen werden konnte.

## Sicherheitsstatus

Status: kontrolliert, aber nicht produktionsreif.

Eingehalten:
- keine produktive Installation
- keine globale npm/pnpm/yarn-Installation
- keine echten API-Keys
- keine privaten Registries
- keine Schülerdaten
- keine privaten Dokumente
- keine Verbandsinterna
- keine bestehenden Projektdateien verändert
- kein Push
- kein Deployment
- keine Analyse von Lernwerkstatt-/Wahren-/Produktivdateien
- Schreibzugriffe nur im vorbereiteten Integrationsordner, konkret unter `sandbox/react-doctor`, `sandbox/_logs`, `sandbox/_reports`

Sicherheitsrelevante Beobachtung:
- React Doctor besitzt laut README/Source einen `--offline` Modus. Ohne Offline-Modus nutzt es laut `packages/react-doctor/src/utils/try-score-from-api.ts` eine Score-API: `https://www.react.doctor/api/score`.
- Dabei werden Dateipfade vor dem Upload entfernt (`stripFilePaths`), aber Diagnoseinhalte/Regeln/Zeilenkontext können trotzdem projektsensible Informationen preisgeben. Für Chris' Schul-/VdS-/Hermes-Projekte ist Offline-Modus verpflichtend.
- README dokumentiert `npx -y react-doctor@latest install`; dieser Agent-Installationsmodus schreibt Agent-Regeldateien ins Projekt. Er wurde nicht ausgeführt und sollte nicht ohne Review in echten Projekten genutzt werden.

## Angelegte Dateien

Manuell angelegt:
- `/Users/zondrius/hermes-workspace/projects/github-rising-2026-05-13/sandbox/react-doctor/demo-react-app/package.json`
- `/Users/zondrius/hermes-workspace/projects/github-rising-2026-05-13/sandbox/react-doctor/demo-react-app/index.html`
- `/Users/zondrius/hermes-workspace/projects/github-rising-2026-05-13/sandbox/react-doctor/demo-react-app/src/main.jsx`
- `/Users/zondrius/hermes-workspace/projects/github-rising-2026-05-13/sandbox/_logs/react-doctor-ls-remote.log`
- `/Users/zondrius/hermes-workspace/projects/github-rising-2026-05-13/sandbox/_logs/react-doctor-stderr.log`
- `/Users/zondrius/hermes-workspace/projects/github-rising-2026-05-13/sandbox/_logs/react-doctor-stderr-2.log`
- `/Users/zondrius/hermes-workspace/projects/github-rising-2026-05-13/sandbox/_reports/react-doctor-output.json` (leer, weil CLI vor JSON-Ausgabe scheiterte)
- `/Users/zondrius/hermes-workspace/projects/github-rising-2026-05-13/sandbox/_reports/react-doctor-2026-05-13.md`

Durch Git-Clone angelegt:
- `/Users/zondrius/hermes-workspace/projects/github-rising-2026-05-13/sandbox/react-doctor/react-doctor-repo/`

Durch `npm exec` mit sandbox-lokalem Cache angelegt:
- `/Users/zondrius/hermes-workspace/projects/github-rising-2026-05-13/sandbox/react-doctor/.npm-cache/`

## Ausgeführte Befehle

```bash
cd /Users/zondrius/hermes-workspace/projects/github-rising-2026-05-13
mkdir -p sandbox/react-doctor sandbox/_logs sandbox/_reports
cd sandbox/react-doctor
pwd
git ls-remote --heads --tags https://github.com/millionco/react-doctor.git | tee ../_logs/react-doctor-ls-remote.log | head -40
```

```bash
cd /Users/zondrius/hermes-workspace/projects/github-rising-2026-05-13/sandbox/react-doctor
if [ ! -d react-doctor-repo/.git ]; then git clone --depth 1 https://github.com/millionco/react-doctor.git react-doctor-repo; fi
cd react-doctor-repo
git rev-parse HEAD
git branch --show-current
python3 - <<'PY'
import os
for name in sorted(os.listdir('.')):
    print(name)
PY
```

```bash
cd /Users/zondrius/hermes-workspace/projects/github-rising-2026-05-13/sandbox/react-doctor
export npm_config_cache="$PWD/.npm-cache"
export npm_config_ignore_scripts=true
export npm_config_audit=false
export npm_config_fund=false
npm exec --yes --package='react-doctor@0.1.6' -- react-doctor ./demo-react-app --offline --json --fail-on none > ../_reports/react-doctor-output.json 2> ../_logs/react-doctor-stderr.log
```

```bash
cd /Users/zondrius/hermes-workspace/projects/github-rising-2026-05-13/sandbox/react-doctor
xattr -dr com.apple.quarantine .npm-cache 2>/dev/null || true
export npm_config_cache="$PWD/.npm-cache"
export npm_config_ignore_scripts=true
export npm_config_audit=false
export npm_config_fund=false
npm exec --yes --package='react-doctor@0.1.6' -- react-doctor ./demo-react-app --offline --json --fail-on none > ../_reports/react-doctor-output.json 2> ../_logs/react-doctor-stderr-2.log
```

```bash
cd /Users/zondrius/hermes-workspace/projects/github-rising-2026-05-13/sandbox/react-doctor
python3 - <<'PY'
from pathlib import Path
root=Path('.')
for p in sorted(root.rglob('*')):
    if '.git' in p.parts or '.npm-cache' in p.parts or 'node_modules' in p.parts:
        continue
    if p.is_file(): print(p)
PY
lsof -nP -iTCP:8721 -sTCP:LISTEN || true
```

## Prozesse und Ports

- Kein Demo-Server gestartet.
- Port 8721 wurde geprüft; kein Listener gefunden.
- Es liefen keine persistenten Hintergrundprozesse.

## Netz-/Upload-/Telemetry-Beobachtung

Beobachtete legitime Netzwerkzugriffe:
- GitHub: `git ls-remote` und `git clone` von `https://github.com/millionco/react-doctor.git`
- npm Registry: `npm exec --package='react-doctor@0.1.6'` zum Laden des CLI-Pakets in einen sandbox-lokalen npm-cache

Keine beobachteten Uploads während des eigentlichen Diagnoseversuchs:
- Der Diagnoseversuch wurde mit `--offline` gestartet.
- Das CLI scheiterte bereits beim Laden des nativen Parser-Bindings, bevor ein Diagnosebericht erzeugt wurde.

Quellcode-/README-Befund zur Telemetrie:
- README CLI-Option: `--offline` = skip telemetry.
- `packages/react-doctor/src/constants.ts`: `SCORE_API_URL = "https://www.react.doctor/api/score"`, `SHARE_BASE_URL = "https://www.react.doctor/share"`.
- `packages/react-doctor/src/utils/try-score-from-api.ts`: sendet bei nicht-offline `POST` an Score API, Body `JSON.stringify({ diagnostics: stripFilePaths(diagnostics) })`.
- `packages/react-doctor/src/scan.ts`: `options.offline ? calculateScoreLocally(diagnostics) : await calculateScore(diagnostics)`; Share-Link nur wenn `!options.offline && options.share`.

Bewertung: Für sensible Kontexte ist `--offline` nicht optional, sondern Pflicht. Zusätzlich sollte `react-doctor.config.json` `"offline": true` und vermutlich `"share": false` setzen, falls später erneut getestet wird.

## Erkannte React-Probleme

Keine echten Tool-Befunde, weil der CLI-Lauf vor der Analyse abgebrochen ist.

Das synthetische Demo-Projekt enthält absichtlich prüfbare Muster:
- abgeleiteter State in `useEffect`
- State-Update-Ketten durch `useEffect`
- instabile Inline-Callbacks im `map`
- instabiles Objekt `unstableOptions` als Prop
- `key={index}`
- relativ große, gemischte Komponente `HugeDashboard`
- unnötiges Kopieren/Neumappen von State
- potenziell teure Berechnung pro Item

Aus README/Regelquellen ist plausibel, dass React Doctor zumindest Teile davon erkennen soll, insbesondere State-&-Effects-, Performance-, Architektur- und Dead-Code-Themen. Mangels erfolgreichem Lauf bleibt diese Aussage aber nicht verifiziert.

## Qualität der Befunde

Nicht praktisch bewertbar, da keine Befunde erzeugt wurden.

Vorläufige Einschätzung aus Quellen:
- Stärker als reines ESLint bei React-spezifischen Architektur-/State-/Effect-Regeln und Score/Report-Aufbereitung.
- Potenziell redundant mit ESLint/Oxlint/TypeScript bei Syntax, allgemeinen Lint-Regeln und Teilen der React-Hooks-Prüfung.
- Potenziell nützlich für Agenten-Reviews, wenn JSON-Ausgabe stabil funktioniert.
- Risiko von False Positives bei bewusst einfachen Lernwerkstatt-Prototypen, One-File-Demos oder pädagogisch bewusst reduzierter Struktur.

## Nutzen für Hermes

Möglicher Nutzen:
- Coder-Check für Hermes-generierte React-Prototypen vor menschlicher Review.
- Reviewer-Check für typische Agentenfehler: zu große Komponenten, ungünstige Effects, schlechte Component-Struktur, State-Ableitungen, Dead Code.
- Lernwerkstatt/Wahren-Playbook: hilfreich als zweiter Blick auf Wartbarkeit und Performance, aber nicht als pädagogische oder UX-Instanz.

Nicht geeignet als:
- alleiniger Qualitätsgate
- Datenschutzprüfung
- Barrierefreiheits-Endprüfung
- pädagogische Prüfung für GE-Materialien
- automatischer CI-Gate in sensiblen Projekten ohne Offline-/No-Upload-Garantie

## Grenzen und Risiken

- Aktueller Sandbox-Lauf auf macOS scheitert an nativem Parser-Binding (`ERR_DLOPEN_FAILED`, Team-ID/Code-Signature-Konflikt).
- Default-Nutzung aus README (`npx -y react-doctor@latest .`) ist für sensible Projekte zu offen, weil Version nicht gepinnt ist und ohne `--offline` die Score-API kontaktiert wird.
- `install`-Modus schreibt Agent-Regeldateien in Projekte; für Hermes nur nach separater Code-/Datei-Review geeignet.
- Native Dependencies (`oxc-parser`, `oxlint`) erhöhen Plattform-/Supply-Chain-Komplexität.
- Diagnostikdaten können auch ohne Dateipfade sensible Code-Strukturen, Texte oder Projektlogik enthalten.
- Score kann Scheinsicherheit erzeugen; ein hoher Score ersetzt keine manuelle Review.

## Vergleich zu ESLint/TypeScript/Vite/React Compiler

- TypeScript: prüft Typen, nicht primär React-Architektur, Effects oder UX-Qualität.
- ESLint/React-Hooks: deckt Hook-Regeln und allgemeine Lints ab, aber weniger kuratierte Hermes-/Agenten-Qualitätsauswertung.
- Vite: Build-/Dev-Tool, keine Qualitätsdiagnose.
- React Compiler / eslint-plugin-react-hooks: relevant für Korrektheit und Optimierbarkeit, aber nicht identisch mit einem zusammengeführten Score-/Diagnosebericht.
- React Doctor: bündelt Oxlint, eigene React-Doctor-Regeln, optional React-Hooks-/Effect-Plugins und Knip/Dead-Code-Erkennung. Das kann für Agentenreviews nützlich sein, muss aber lokal/offline und reproduzierbar funktionieren.

## Entscheidung

Entscheidung: Watch.

Kein `Go`, weil der sichere macOS-Sandboxlauf nicht erfolgreich war und die Default-Telemetrie/Score-API für sensible Kontexte klare Guardrails erfordert.

Kein `No-Go`, weil Lizenz, Quellcode, Offline-Modus und Funktionsumfang grundsätzlich plausibel und potenziell nützlich sind.

## Empfehlung zur Graduation

Aktuell: Watchlist-Notiz plus optionaler späterer Coder-/Reviewer-Check, aber noch kein Hermes-Skill für produktive Nutzung.

Nur graduieren, wenn ein zweiter Test erfolgreich ist mit:
- gepinnter Version, nicht `latest`
- `--offline`
- `--json` oder `--json-compact`
- `--fail-on none` für Diagnosemodus
- sandbox-lokalem npm-cache
- keine Agent-Installation
- keine Produktivprojekte, nur Kopie oder synthetisches Projekt
- reproduzierbare Ergebnisse auf Chris' macOS-Setup oder in einer kontrollierten Linux-Sandbox

## Konkreter nächster Schritt

Nächster sicherer Schritt: Separaten Coder-Task anlegen oder manuell ausführen lassen für einen zweiten technischen Lauf in einer kontrollierten Linux/Node-22-Sandbox oder mit einer anderen Node-Version, weiterhin nur auf `demo-react-app`, mit `--offline --json --fail-on none` und ohne globale Installation.

Falls der zweite Lauf funktioniert: JSON-Befunde gegen das Demo-Projekt bewerten und entscheiden, ob ein kleiner Hermes-Reviewer-Check entsteht: `react-doctor-offline-check` mit klarer Regel "nur Kopie/Sandbox, nie produktiv, nie ohne --offline".
