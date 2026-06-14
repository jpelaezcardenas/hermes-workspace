# Hermes / Codex Job Value Review

Datum: 2026-05-30

## Kurzfazit
Es gibt aktuell nur wenige wiederkehrende Jobs. Der wichtigste Job ist der neue `Hermes Health Guard`, weil er genau den zuletzt aufgetretenen Fehler verhindert: volle Platte, kaputte Kanban-Backups und beschädigte Kanban-Datenbank.

Der alte Hermes-Job `GITHUB` wirkt dagegen derzeit wenig gewinnbringend: Er ist sehr breit, erzeugt lange Reports, ist auf Telegram-Auslieferung eingestellt und hatte laut Datei zuletzt am 2026-05-11 einen Lauf. Der Codex-Job `AI Power Policy Free Data Review` ist nicht direkt fuer Schulwerkstatt/Hermes wichtig, kann aber sinnvoll bleiben, wenn das Finanz-/Research-Thema weiter verfolgt wird.

## Jobs

### 1. Hermes Health Guard
- Ort: `/Users/zondrius/.codex/automations/hermes-health-guard/automation.toml`
- Status: Active
- Rhythmus: alle 12 Stunden
- Nutzen: sehr hoch
- Behalten: ja
- Grund: Prueft Speicher, Kanban-Integritaet und kaputte Kanban-Backups. Direkt aus dem realen Fehler abgeleitet.

### 2. Hermes GITHUB
- Ort: `/Users/zondrius/.hermes/cron/jobs.json`
- Status: enabled
- Rhythmus: taeglich 10:00 Uhr
- Letzter sichtbarer Lauf: 2026-05-11
- Auslieferung: Telegram
- Nutzen: mittel bis niedrig im aktuellen Schulwerkstatt-Fokus
- Empfehlung: pausieren oder neu zuschneiden
- Grund: Der Prompt ist sehr breit: GitHub Rising, Hermes, OpenAI, MCP, Browser, Agenten, Productivity. Das erzeugt leicht Rauschen und fuehrt oft zu Watchlisten statt konkreter Umsetzung. Fuer die Schulwerkstatt ist der Nutzen nur indirekt.

### 3. AI Power Policy Free Data Review
- Ort: `/Users/zondrius/.codex/automations/ai-power-policy-free-data-review/automation.toml`
- Status: Active
- Rhythmus: Montag und Freitag 15:00 Uhr
- Nutzen: kontextabhaengig
- Empfehlung: behalten, wenn Finanz-/Policy-Research weiter ein aktives Thema ist; sonst pausieren
- Grund: Inhaltlich nicht mit Schulwerkstatt/Lernwerkstatt verbunden. Kann wertvoll sein, wenn das Portfolio-Studio weiter relevant ist, sonst bindet es Aufmerksamkeit.

## Empfehlung
1. `Hermes Health Guard` behalten.
2. Alten Hermes-Job `GITHUB` pausieren oder ersetzen durch einen schlankeren woechentlichen Scout.
3. `AI Power Policy Free Data Review` nur behalten, wenn das Finanzthema aktiv bleibt.

## Besserer Ersatz fuer GITHUB
Statt taeglicher Breitsuche:

Woechentlicher Job: `Agent Tools Scout - Schulwerkstatt Fit`

Fokus:
- nur Tools, die direkt helfen bei Schulwerkstatt, Leseapp, GE-Diagnostik, App-Qualitaet, Browser-QA, Memory, Kanban-Stabilitaet
- maximal 3 Findings
- jedes Finding muss eine konkrete Aktion haben: testen, ignorieren, integrieren, oder als Skill/Memory-Prinzip speichern
- keine Hype-Tierlists ohne Umsetzungsvorschlag

## Nicht empfohlen
- mehrere taegliche GitHub-/AI-News-Jobs parallel
- breite Rising-Star-Scans ohne konkreten Schulwerkstatt-Bezug
- Jobs, die automatisch neue Repos installieren oder private Daten beruehren
- Trading-/Stealth-/Scraping-Jobs ohne klare Risiko-Grenze
