# Hermes Investment Thesis Lab Setup - 2026-06-09

## Kurzfazit
Signal: Green.

Hermes hat eine neue woechentliche Investment-Lernschicht bekommen: `HERMES_INVESTMENT_THESIS_LAB_WEEKLY`.

Der Job soll keine Trades ausloesen. Er soll Chris helfen, bessere Investment-Ideen zu erkennen, schlechte Muster frueher zu sehen und aus dem Paper-/Research-Verlauf zu lernen.

## Neuer Job
- Name: `HERMES_INVESTMENT_THESIS_LAB_WEEKLY`
- ID: `7b3f6a91c0de`
- Rhythmus: Sonntag 18:15 Europe/Berlin
- Modell: `gpt-5.5`
- Provider: `openai-codex`
- Sichtbarkeit: Telegram-Kurzmeldung plus lokaler Report
- Report-Ordner: `/Users/zondrius/hermes-workspace/reports/investment-thesis-lab/`

## Zweck
Der Job liegt ueber den bestehenden Stock-Jobs:
- `AI_STOCK_RADAR_DAILY`
- `AI_STOCK_DEEPDIVE_WEEKLY`
- `INSTITUTIONAL_SELL_PRESSURE_DAILY`
- `STOCK_RISK_COMMANDER_DAILY`

Er ersetzt diese Jobs nicht. Er verdichtet sie einmal pro Woche zu:
- Thesis Cards
- Red Flag Board
- Paper Portfolio Learning
- Decision Memory
- einer besten naechsten Research-Frage

## Guardrails
- Keine Kauf-/Verkauf-/Hold-Sprache.
- Kein Brokerzugriff.
- Keine automatischen Trades.
- Keine Optionen, Hebel, Margin oder echte Geldaktion.
- Keine privaten Portfolio-, Cash-, Steuer-, Login- oder Accountdaten.
- Fehlende Daten werden als Luecke gewertet, nicht als positives Signal.
- `SOFORT_MACHEN` darf keine Trading-Aktion sein.

## Anbindung
Diese Jobs koennen den neuen Report lesen:
- `HERMES_CONTROL_DAILY`
- `HERMES_MORNING_CEO_DAILY`
- `HERMES_NIGHT_RESULT_TUEV_DAILY`
- `HERMES_LIFE_BUILDER_NIGHTLY`
- `HERMES_ASSET_FORGE_WEEKLY`

## Warum das sinnvoll ist
Die bisherigen Stock-Jobs sind stark bei Radar, Risiko und Tageslage. Was fehlte, war eine woechentliche Meta-Schicht:
- Was lernen wir aus wiederholten X/Avoid-Kandidaten?
- Welche These ist noch offen, aber nicht tot?
- Welche Red Flags wiederholen sich?
- Welche Regel haette schlechte Kandidaten frueher blockiert?
- Welche Frage sollte Chris wirklich anschauen, statt mehr Ticker zu sammeln?

## Naechster Beweis
Der erste geplante Lauf ist:
2026-06-14 um 18:15 Europe/Berlin.

Danach muss geprueft werden:
- Wurde ein Report geschrieben?
- Ist die Telegram-Meldung kurz?
- Bleibt die Sprache research-only?
- Gibt es echte Lernregeln statt weiterer Watchlist-Laerm?

## Verifikation
- Investment-Thesis-Lab-Check: OK.
- GPT-5.5-/Closed-Loop-Check: OK.
- Night-Loop-Check: OK.
- Morning-CEO-/Feedback-Check: OK.
- Business-Firework-Light-Check: OK.
- Cron-JSON: OK.
- Job-Zahl: 27 total, 26 aktiv, 1 pausiert.
- Job-Namen/IDs: keine Duplikate.
- Neue Job-Konfiguration: Sonntag 18:15, naechster Lauf 2026-06-14T18:15:00+02:00.
- NUL-Byte-Pruefung geaenderter Dateien: 0.

## Befehlskarte
- Chris 5-Minuten-Befehl: Nach dem ersten Sonntagslauf nur die beste Research-Frage und die Red-Flag-Regel lesen.
- Hermes-Pruefbefehl: Am Montag kontrollieren, ob der Thesis-Lab-Report in Morning CEO und Control auftaucht.
- Stop-/Park-Befehl: Wenn der Job Kauf-/Verkauf-/Hold-Sprache nutzt oder Ticker-Hype erzeugt, sofort auf Review setzen.
- Nicht-ausfuehren: Keine Broker-, Paid-Provider-, Options-, Margin-, Kauf-, Verkaufs- oder echten Geldaktionen.

## Decision Inbox
- Signal: Green
- SOFORT_MACHEN: nichts; Job ist angelegt, erster echter Beweis kommt am 2026-06-14.
- CHRIS_ENTSCHEIDET: Ob spaeter ein bezahlter Datenprovider fuer bessere Preis-/Volumenqualitaet angebunden werden soll; jetzt nicht noetig.
- BEOBACHTEN: Ob Thesis Cards und Decision Memory wirklich mehr Lernwert liefern als die Tagesreports.
- SPAETER: Bei gutem Ergebnis ein eigenes Investment-Research-Dashboard oder Nayyal-private Research-Seite planen.
- BLOCKIERT: Inhaltlicher Qualitaetsbeweis erst nach erstem Sonntagslauf.
- NICHT_TUN: Keine Investment-Aktionen aus Hermes heraus.
- Naechste kleinste Aktion: Ersten Lauf am 2026-06-14 pruefen.
- Beleg / Datei: `/Users/zondrius/.hermes/profiles/neva/cron/jobs.json`
