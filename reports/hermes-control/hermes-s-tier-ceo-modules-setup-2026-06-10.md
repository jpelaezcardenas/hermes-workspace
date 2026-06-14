# Hermes S-Tier CEO Modules Setup - 2026-06-10

## Kurzfazit
Signal: Green after setup.

Hermes wurde um drei Fuehrungsmodule erweitert. Sie bauen keine neuen Produkte. Sie entscheiden, was Proof hat, was gestoppt wird und welche Muster Hermes langfristig lernen darf.

## Neue Module

### STOP_DOING
- Job: `HERMES_STOP_DOING_WEEKLY`
- ID: `4d8a2b6c9f01`
- Rhythmus: Sonntag 19:05
- Sichtbarkeit: lokal
- Report: `/Users/zondrius/hermes-workspace/reports/stop-doing/stop-doing-YYYY-MM-DD.md`
- Zweck: Opportunity Kill Board, Wiederholungen stoppen, unbewiesene V2s parken, Duplikate sichtbar machen.

### PROOF_CEO
- Job: `HERMES_PROOF_CEO_WEEKLY`
- ID: `6f2c9d0a5e81`
- Rhythmus: Sonntag 19:30
- Sichtbarkeit: Telegram
- Report: `/Users/zondrius/hermes-workspace/reports/proof-ceo/proof-ceo-YYYY-MM-DD.md`
- Zweck: weekly board meeting, Proof lesen, V2 Permission vergeben oder verweigern, eine Wochenrichtung setzen.

### PERSONAL_PATTERN_MEMORY
- Job: `HERMES_PERSONAL_PATTERN_MEMORY_MONTHLY`
- ID: `9a7c1e4d2b63`
- Rhythmus: monatlich am 1. um 20:30
- Sichtbarkeit: lokal
- Report: `/Users/zondrius/hermes-workspace/reports/personal-pattern-memory/personal-pattern-memory-YYYY-MM-DD.md`
- Zweck: patterns not feelings; Energie, Reibung und echte Nuetzlichkeit aus Proof und Feedback verdichten.

## Warum diese Architektur
- Stop Doing laeuft zuerst und schreibt lokal, damit Proof CEO nicht nur positive Ideen sieht.
- Proof CEO sendet die einzige neue CEO-Telegrammeldung am Sonntagabend.
- Personal Pattern Memory laeuft nur monatlich, damit keine neue Tageslast entsteht.
- Alle drei Module folgen Hermes Proof Mode.

## Was sie nicht tun
- Keine Jobs automatisch stoppen.
- Keine Dateien loeschen oder archivieren.
- Keine Handoffs erzeugen.
- Keine Apps bauen.
- Keine Deploys, Commits, Pushes oder externen Sends.
- Keine Trades, Broker-, API-Key- oder Finanzaktionen.
- Keine sensiblen Daten.

## Integration
Diese bestehenden Jobs koennen die neuen Reports lesen:

- `HERMES_CONTROL_DAILY`
- `HERMES_MORNING_CEO_DAILY`
- `HERMES_NIGHT_RESULT_TUEV_DAILY`
- `HERMES_ASSET_FORGE_WEEKLY`

## Verifikation
- S-Tier-CEO-Modules-Check: OK.
- Asset-Forge-Check: OK.
- Business-Firework-Light-Check: OK.
- Execution-Quality-Check: OK.
- Goal-Concreteness-Check: OK.
- GPT-5.5-/Closed-Loop-Check: OK.
- Investment-Thesis-Lab-Check: OK.
- Morning-CEO-/Feedback-Check: OK.
- Night-Loop-Check: OK.
- Proof-Mode-Check: OK.
- Cron-JSON: OK.
- Job-Zahl: 30 total, 29 aktiv, 1 pausiert.
- Job-Namen/IDs: keine Duplikate.
- NUL-Byte-Pruefung geaenderter Dateien: 0.

## Befehlskarte
- Chris 5-Minuten-Befehl: Fuehre vor Sonntag eine Proof-Zeile zu einer real genutzten oder bewusst nicht genutzten Hermes-Hilfe ein.
- Proof-Befehl: Ohne Proof gibt es am Sonntag keine V2 Permission.
- Hermes-Pruefbefehl: Nach dem ersten Sonntaglauf pruefen, ob Proof CEO wirklich Stop/Proof/V2 Permission trennt.
- Stop-/Park-Befehl: Wenn ein Modul neue Arbeit erzeugt statt zu stoppen oder zu priorisieren, Prompt schaerfen.
- Nicht-ausfuehren: Keine automatische Job-Loeschung, keine Handoffs, keine Publikation, keine Investment-Aktion.

## Decision Inbox
- Signal: Green
- SOFORT_MACHEN: nichts; Module sind angelegt, erster Beweis kommt am Sonntag.
- CHRIS_ENTSCHEIDET: Ob die neue Sonntag-CEO-Meldung nach dem ersten Lauf dauerhaft bleiben soll.
- BEOBACHTEN: Ob Stop Doing echte Wiederholungen reduziert und Proof CEO weniger Aktionismus erzeugt.
- SPAETER: Proof-Dashboard erst bauen, wenn mehrere echte Proof-Zeilen vorhanden sind.
- BLOCKIERT: Echte Qualitaet erst nach den ersten Laeufen belegbar.
- NICHT_TUN: Keine neuen Tagesjobs, keine V2 ohne Proof, keine Produktisierung aus Reportbegeisterung.
- Naechste kleinste Aktion: Ersten Sonntaglauf pruefen.
- Beleg / Datei: `/Users/zondrius/.hermes/profiles/neva/cron/jobs.json`
