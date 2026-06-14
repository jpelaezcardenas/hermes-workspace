# Hermes Execution Cards v1 - 2026-06-07

## Ergebnis
Hermes wurde auf mehr konkrete Ausfuehrung geschaerft.

Aktive Jobs mit neuer Befehlskarte:

- `BUSINESS_IDEA_FIREWORK_DAILY`
- `HERMES_CONTROL_DAILY`
- `CODEX_HANDOFF_SCOUT_DAILY`
- `NIGHT_APP_STUDIO_BUILD_DAILY`
- `NIGHT_APP_STUDIO_BRIEFING_DAILY`
- `NAYYAL_HUB_RADAR_DAILY`
- `TEACHER_NEXTDAY_DAILY`

## Was sich aendert
Jeder relevante Job soll nicht nur berichten, sondern am Ende in Handlung uebersetzen:

- Was kann Chris in 5 Minuten tun?
- Was ist ein echter Codex-Befehl?
- Was soll Hermes morgen pruefen?
- Wann wird die Idee gestoppt oder geparkt?
- Was darf nicht passieren?

## Zusaetzlicher Qualitaetsfix
Der Business-Ideen-Job darf keine Codex-Prompts mehr erzeugen, die geparkte Themen als Anker verwenden. Besonders gesperrt:

- Fuenferfeld
- Fünferfeld
- five-frame

Wenn alte Quellen solche Themen nennen, muss Hermes auf nicht geparkte Anker wechseln, zum Beispiel:

- UK-Karten
- GE-Startlogik
- Teacher-Nextday
- Gartenpost/Zuordnung
- Wahrnehmung/Sortieren
- LeseWerk
- VdS-GE

## Konkretes Ergebnis Heute
Der heutige sichere Mini-Slice wurde direkt erstellt:

`/Users/zondrius/hermes-workspace/reports/business-ideas/uk-startkarte-fachfremde-kolleginnen-2026-06-07.md`

## Validierung
- Backup erstellt: `/Users/zondrius/.hermes/profiles/neva/cron/jobs.json.backup-20260607-before-execution-cards`
- Cron JSON gueltig.
- Job-Anzahl unveraendert.
- Bei den betroffenen Jobs wurden nur Prompttexte erweitert.
- Schedule, Delivery, Enabled-Status und andere nicht-Prompt-Felder sind unveraendert.

## Decision Inbox
- Signal: Green
- SOFORT_MACHEN: nichts
- CHRIS_ENTSCHEIDET: ob die UK-Startkarte spaeter als Materialpaket oder Nayyal-/Schulwerkstatt-Baustein weitergefuehrt wird
- BEOBACHTEN: ob morgige Reports eine Befehlskarte liefern und weniger vage bleiben
- SPAETER: bei guter Wirkung eine zentrale Hermes-Execution-Regel in die Memory aufnehmen
- BLOCKIERT: nichts
- NICHT_TUN: keine grossen Missionen nur wegen einer Befehlskarte starten
- Naechste kleinste Aktion: morgigen Business-, Control- und Nayyal-Report auf echte Befehlskarten pruefen
- Beleg / Datei: `/Users/zondrius/.hermes/profiles/neva/cron/jobs.json`
