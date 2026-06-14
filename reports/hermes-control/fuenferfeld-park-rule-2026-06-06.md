# Hermes Control Override - Fuenferfeld geparkt - 2026-06-06

## Entscheidung
Chris hat die Fuenferfeld-/Fuenffeld-Linie am 2026-06-06 geparkt.

## Bedeutung
- Fuenferfeld ist ab jetzt kein Gewinner, keine Sofort-Aktion und kein Codex-Handoff.
- Alte Berichte bleiben als Archiv erhalten, gelten aber nicht mehr als aktuelle Prioritaet.
- Wenn ein Job aus alten Quellen wieder Fuenferfeld empfiehlt, muss er es als `geparkt durch Chris am 2026-06-06` behandeln.

## Betroffene Begriffe
- Fuenferfeld
- Fünferfeld
- five-frame
- Mengen legen auf einem Fuenferfeld
- Fuenferfeld-Startkarte
- Fuenferfeld-Kurzkarte
- GE-Minikiste Fuenferfeld

## Geaenderte aktive Jobs
- BUSINESS_IDEA_FIREWORK_DAILY
- HERMES_CONTROL_DAILY
- CODEX_HANDOFF_SCOUT_DAILY
- TEACHER_NEXTDAY_DAILY
- NIGHT_APP_STUDIO_BUILD_DAILY
- NIGHT_APP_STUDIO_BRIEFING_DAILY

## Neue Ersatzrichtung
Wenn eine Fuenferfeld-Idee hochkommt, soll Hermes stattdessen den besten sicheren Nicht-Fuenferfeld-Schritt waehlen, zum Beispiel:
- Night App Studio Timeout klaeren
- Handoff-Hygiene
- UK-Kommunikation ohne Fuenferfeld
- Lebenspraxis/Gartenpost
- Wahrnehmung/Sortieren
- VdS-GE-Notiz
- Nayyal/Hermes-Integration pruefen

## Validierung
- Backup erstellt: `/Users/zondrius/.hermes/profiles/neva/cron/jobs.json.backup-20260606-before-fuenferfeld-park`
- Live Cron JSON ist gueltig.
- Job-Anzahl unveraendert.
- Schedule, Enabled-Status und nicht-Prompt-Felder der betroffenen Jobs sind unveraendert.
- Jeder betroffene Job enthaelt genau eine neue Sperrregel `Update 2026-06-06 - Fuenferfeld parked`.

## Decision Inbox
- Signal: Green
- SOFORT_MACHEN: nichts
- CHRIS_ENTSCHEIDET: ob Fuenferfeld spaeter wieder aktiviert werden soll
- BEOBACHTEN: ob Business Ideas, Control und Handoff Scout ab morgen keine Fuenferfeld-Aktion mehr empfehlen
- SPAETER: bei Bedarf eine allgemeinere Themen-Sperrliste fuer geparkte Hermes-Linien anlegen
- BLOCKIERT: nichts
- NICHT_TUN: alte Berichte massenhaft umschreiben oder loeschen
- Naechste kleinste Aktion: naechsten Business-/Control-Lauf auf Fuenferfeld-Freiheit pruefen
- Beleg / Datei: `/Users/zondrius/.hermes/profiles/neva/cron/jobs.json`
