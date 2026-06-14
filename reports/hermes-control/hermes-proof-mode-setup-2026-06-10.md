# Hermes Proof Mode Setup - 2026-06-10

## Kurzfazit
Signal: Green after implementation.

Hermes wurde als CEO-System geschaerft: Gute Ideen duerfen nicht automatisch zu V2, Handoff, Produkt, App-Ausbau oder Website-Ausbau werden. Ab jetzt zaehlt zuerst der Nutzungsbeweis.

## Neues Prinzip
**No V2, no expansion, no handoff and no productization without proof.**

Das bedeutet:
- Wenn etwas nur gebaut oder berichtet wurde, ist es noch nicht bewiesen.
- Real feedback beats report proof.
- Ohne Proof soll Hermes eine kleine Testkarte, einen 5-20-Minuten-Test oder STOP waehlen.
- `SOFORT_MACHEN` darf nur eine kleine Proof- oder Nutzungsaktion enthalten.

## Proof Ledger
Neue Datei:

`/Users/zondrius/hermes-workspace/inbox/chris-feedback/proof-ledger.md`

Format:

```text
YYYY-MM-DD | area | artifact_or_idea | proof_status | proof_note | next_action
```

Erlaubte Proof-Status:
- `untested`
- `tested_useful`
- `tested_not_useful`
- `parked`

## PROOF_CRITICAL_JOBS
Diese Jobs lesen oder beachten Proof Mode:

- `HERMES_NIGHT_RESULT_TUEV_DAILY`
- `HERMES_LIFE_BUILDER_NIGHTLY`
- `HERMES_MORNING_CEO_DAILY`
- `TEACHER_NEXTDAY_DAILY`
- `NIGHT_APP_STUDIO_BUILD_DAILY`
- `BUSINESS_IDEA_FIREWORK_DAILY`
- `HERMES_CONTROL_DAILY`
- `HERMES_ASSET_FORGE_WEEKLY`
- `NAYYAL_HUB_RADAR_DAILY`
- `HERMES_INVESTMENT_THESIS_LAB_WEEKLY`

## Zusaetzlicher Fix
Der alte `hermes_asset_forge_check.py` war veraltet. Er erwartete noch Telegram, Montag 06:30 und alte No-GPT-Regeln. Der Check wurde auf die aktuelle Architektur angepasst:

- Asset Forge laeuft lokal.
- Asset Forge laeuft Montag 03:15 im Nachtfenster.
- Asset Forge nutzt `gpt-5.5` via `openai-codex`.
- Asset Forge muss jetzt ebenfalls Proof Mode beachten.

## Was sich praktisch aendert
- Night App Studio darf keinen V2-Ausbau als bewiesen behandeln, wenn Chris nicht getestet hat.
- Business Firework bleibt bei Micro-Test oder STOP.
- Nayyal-Radar darf lokale Struktur vorschlagen, aber keine Public-/Deploy-Schritte ohne Proof und Freigabe.
- Investment Thesis Lab lernt aus Thesen, Red Flags und Paper-Simulationen, nicht aus Trading-Aktionen.
- Morning CEO soll den Tag nicht mit neuen Baustellen starten, sondern mit einer kleinen bewiesenen oder beweisbaren Aktion.

## Verifikation
- Proof-Mode-Check: OK.
- Asset-Forge-Check nach Aktualisierung: OK.
- Cron-JSON: OK.
- Job-Zahl: 27 total, 26 aktiv.
- Job-Namen/IDs: keine Duplikate.
- GPT-5.5-/Closed-Loop-Check: OK.
- Night-Loop-Check: OK.
- Morning-CEO-/Feedback-Check: OK.
- Business-Firework-Light-Check: OK.
- Investment-Thesis-Lab-Check: OK.

## Befehlskarte
- Chris 5-Minuten-Befehl: Wenn du heute nur eine Sache pruefst, schreibe eine Proof-Zeile zu Gartenpost, Vertretungs-Notfallkarte oder einer anderen Hermes-Hilfe.
- Hermes-Pruefbefehl: Morgen kontrollieren, ob Jobs unbewiesene V2-/Handoff-/Produktideen parken.
- Stop-/Park-Befehl: Ohne Proof keine Ausweitung.
- Nicht-ausfuehren: Keine V2, keine neuen Handoffs, keine Produktisierung, keine Publikation, keine Trades, keine sensiblen Daten ohne Nutzungsbeweis und Freigabe.

## Decision Inbox
- Signal: Green
- SOFORT_MACHEN: Eine Proof-Zeile eintragen, wenn heute eine Hermes-Hilfe real genutzt oder bewusst nicht genutzt wurde.
- CHRIS_ENTSCHEIDET: Welche Spur zuerst Proof bekommt: Schule, Night App, Nayyal, Alltag oder Investment-Research.
- BEOBACHTEN: Ob Morning CEO und Control ab jetzt Proof statt Outputmenge priorisieren.
- SPAETER: Ein Proof-Dashboard bauen, wenn das Ledger einige echte Eintraege enthaelt.
- BLOCKIERT: Echte Wirksamkeit bleibt blockiert, solange keine Proof-Zeilen entstehen.
- NICHT_TUN: Kein Ausbau aus reiner Reportbegeisterung.
- Naechste kleinste Aktion: Proof-Ledger nach dem naechsten echten Test mit einer Zeile fuellen.
- Beleg / Datei: `/Users/zondrius/.hermes/profiles/neva/cron/jobs.json`
