# Hermes Morning CEO Teacher-Date-Bridge Fix - 2026-06-10

## Kurzfazit
Signal: Green after fix.

Morning CEO hatte am 2026-06-10 einen falschen Schul-Hinweis: `kein aktueller Teacher-Nextday-Beleg gefunden`. Der Teacher-Nextday-Beleg war aber vorhanden:

`/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/reports/teacher-nextday-2026-06-09.md`

Die Datei wurde am Abend des 2026-06-09 geschrieben und gilt laut Inhalt fuer 2026-06-10.

## Ursache
- Teacher Nextday schreibt abends fuer den naechsten Schultag.
- Der Dateiname traegt das Schreibdatum.
- Morning CEO suchte zu eng nach einem heutigen Beleg und beachtete die Zeile `Fuer morgen:` nicht stark genug.

## Fix
`HERMES_MORNING_CEO_DAILY` wurde geschaerft:

- latest teacher-nextday report from the last 36 hours lesen.
- `Fuer morgen: YYYY-MM-DD` pruefen.
- Wenn diese Zeile auf den heutigen Tag passt, ist das der aktuelle Schule-Beleg.
- Dann darf Morning CEO nicht mehr schreiben: `kein aktueller Teacher-Nextday-Beleg gefunden`.
- Die Schule-Zeile soll Kern, SOFORT_MACHEN und NICHT_TUN aus Teacher Nextday kurz zusammenfassen.

## Konkreter heutiger Wert
Fuer 2026-06-10 haette Morning CEO sagen sollen:

- Schule: Gartenpost/Zustellen mit zwei Zielorten ist vorbereitet; zwei Koerbe und eine Gartenpost-Karte bereitlegen; kein Fuenferfeld und keine digitale Erweiterung.

## Verifikation
- Der Check wurde zuerst rot: `Teacher Nextday date bridge` fehlte.
- Danach wurde der Morning-CEO-Prompt repariert.
- Morning-CEO-/Feedback-Check: OK.
- Cron-JSON: OK.
- GPT-5.5-/Closed-Loop-Check: OK.
- Night-Loop-Check: OK.
- Job-Zahl: 27 total, 26 aktiv.
- Job-Namen/IDs: keine Duplikate.
- NUL-Byte-Pruefung geaenderter Dateien: 0.

## Befehlskarte
- Chris 5-Minuten-Befehl: Heute fuer Schule zwei Koerbe und eine Gartenpost-Karte bereitlegen.
- Hermes-Pruefbefehl: Morgen pruefen, ob Morning CEO den Teacher-Nextday-Beleg korrekt erkennt.
- Stop-/Park-Befehl: Wenn Morning CEO wieder `kein aktueller Teacher-Nextday-Beleg` schreibt, obwohl eine Datei mit passendem `Fuer morgen:` existiert, Prompt erneut pruefen.
- Nicht-ausfuehren: Keine digitale Erweiterung, kein Fuenferfeld, keine neue Schul-Baustelle.

## Decision Inbox
- Signal: Green
- SOFORT_MACHEN: nichts; Prompt-Fix ist eingetragen.
- CHRIS_ENTSCHEIDET: nichts.
- BEOBACHTEN: Morgenlauf von Morning CEO.
- SPAETER: Falls noetig einen no-agent Quellenfinder fuer Teacher Nextday bauen.
- BLOCKIERT: echter Laufbeweis erst am naechsten Morning-CEO-Lauf.
- NICHT_TUN: Den Teacher-Nextday-Job nicht umbauen; er arbeitet richtig.
- Naechste kleinste Aktion: Naechsten Morning-CEO-Report auf Schule-Zeile pruefen.
- Beleg / Datei: `/Users/zondrius/.hermes/profiles/neva/cron/jobs.json`
