# Hermes Execution Boost v1

## Ziel

Hermes soll mehr konkrete Ergebnisse erzeugen, ohne neue Baustellen zu starten. Dazu werden drei Hebel verbunden:

1. Proof-Ledger Komfortkarte: morgens/abends eine copy-ready proof line statt freier Formulierarbeit.
2. Evening Execution Slot: taeglich 18:30 genau ein kleines Ergebnis vorbereiten, erzeugen oder sauber stoppen.
3. Execution Score: Control und Night Result TUEV bewerten Jobs nach Ausfuehrungsnaehe statt nur nach inhaltlicher Qualitaet.

## Definition of Done

- `HERMES_EVENING_EXECUTION_SLOT_DAILY` existiert genau einmal und laeuft taeglich 18:30.
- Der Job schreibt nach `/Users/zondrius/hermes-workspace/reports/evening-execution/evening-execution-YYYY-MM-DD.md`.
- Der Job liefert genau einen Status: `ARTEFAKT_ERSTELLT`, `PROOF_ERFORDERLICH`, `ENTSCHEIDUNG_ERFORDERLICH` oder `STOP`.
- Morning CEO enthaelt eine Proof-Ledger Komfortkarte mit einer copy-ready proof line.
- Control Daily und Night Result TUEV nutzen Execution Score 0-3.
- Der neue Check `/Users/zondrius/.hermes/scripts/hermes_execution_boost_check.py` ist gruen.

## Nicht-Ziele

- Keine App-V2 erzwingen.
- Keine Teacher-Nextday-Arbeit doppeln.
- Keine Codex-Handoffs automatisch erstellen.
- Keine Deploys, Commits, Pushes, Installationen, Kaeufe oder externen Sends.
- Keine Trades, Broker-Aktionen oder Investment-Handlungsempfehlungen.
- Keine echten Schueler-, Diagnose-, Familien-, Account-, Broker- oder Finanzdaten.

## Loop

1. Lies Morning CEO, Life Card, Proof Ledger und aktuelle Decision Inbox.
2. Waehle genau eine kleine Execution-Chance.
3. Wenn sicher lokal moeglich: erzeuge ein Mini-Artefakt oder eine copy-ready proof line.
4. Wenn menschlicher Test noetig: schreibe `PROOF_ERFORDERLICH`.
5. Wenn Chris entscheiden muss: schreibe `ENTSCHEIDUNG_ERFORDERLICH`.
6. Wenn es nur Rauschen waere: schreibe `STOP`.

## Eval-Gate

- [ ] Genau ein Ergebnis?
- [ ] Keine Konkurrenz zum Morgen-CEO?
- [ ] Keine Konkurrenz zu `TEACHER_NEXTDAY_DAILY`?
- [ ] Kein externer oder irreversibler Schritt?
- [ ] Proof-Zeile kopierfertig, kurz und datensparsam?
- [ ] Execution Score sichtbar?
