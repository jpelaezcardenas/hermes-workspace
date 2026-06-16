# Hermes Job-Ausduennung - 2026-06-16

## Ziel

Hermes soll weniger rauschen und mehr Wirkung pro Lauf erzeugen. Die Kernschleife bleibt erhalten, aber doppelte oder schwache Jobs werden pausiert oder seltener ausgefuehrt.

## Geaendert

- `ADMIN_FREITAG_30MIN`: pausiert wegen Timeout und zu breitem Auftrag.
- `NIGHT_APP_STUDIO_BRIEFING_DAILY`: bleibt pausiert, weil Morning CEO die Morgenmeldung uebernimmt.
- `BUSINESS_IDEA_FIREWORK_DAILY`: laeuft nur noch Samstag 09:30.
- `INSTITUTIONAL_SELL_PRESSURE_DAILY`: laeuft nur noch Freitag 09:50 lokal.
- `STOCK_RISK_COMMANDER_DAILY`: laeuft nur noch Freitag 10:00 lokal.
- `CODEX_HANDOFF_SCOUT_DAILY`: laeuft nur noch Montag/Mittwoch/Freitag 10:30 lokal.
- `NAYYAL_HUB_RADAR_DAILY`: laeuft nur noch Montag/Mittwoch/Freitag 04:05 lokal.
- `HERMES_STOP_DOING_WEEKLY`: pausiert.
- `HERMES_PROOF_CEO_WEEKLY`: pausiert.
- `HERMES_WEEK_ARCHITECT_WEEKLY`: laeuft Sonntag 19:30 als kombinierter Weekly CEO Board Job.

## Behalten

- `HERMES_MORNING_CEO_DAILY`
- `TEACHER_NEXTDAY_DAILY`
- `HERMES_NIGHT_RESULT_TUEV_DAILY`
- `HERMES_LIFE_BUILDER_NIGHTLY`
- `HERMES_EVENING_EXECUTION_SLOT_DAILY`
- `AI_STOCK_RADAR_DAILY`
- `AI_STOCK_DEEPDIVE_WEEKLY`
- `HERMES_INVESTMENT_THESIS_LAB_WEEKLY`
- `HERMES_ASSET_FORGE_WEEKLY`
- `HERMES_MISSION_CHAIN_CEO_WEEKLY`

## Bewertung

Signal: Green.

Die wichtigsten Lebens- und Schulfunktionen bleiben aktiv. Reduziert wurden vor allem Jobs mit Wiederholungsrisiko, Telegram-Rauschen oder schwacher Datenlage. Investment bleibt research-only; Nayyal bleibt im Night Loop, aber nicht mehr taeglich.

## Decision Inbox

- Signal: Green
- SOFORT_MACHEN: nichts
- CHRIS_ENTSCHEIDET: Nach einer Woche pruefen, ob weniger Meldungen trotzdem genug Orientierung geben.
- BEOBACHTEN: Ob Morning CEO weiter alle wichtigen Signale ausreichend zusammenfasst.
- SPAETER: Falls etwas fehlt, einzelne Jobs wieder aktivieren oder Frequenz leicht erhoehen.
- BLOCKIERT: nichts
- NICHT_TUN: Keine geloeschten Jobs neu erfinden; erst eine Woche die Ausduennung beobachten.
- Naechste kleinste Aktion: Morgen-CEO der naechsten zwei Tage auf Vollstaendigkeit kontrollieren.
- Beleg / Datei: /Users/zondrius/.hermes/profiles/neva/cron/jobs.json
