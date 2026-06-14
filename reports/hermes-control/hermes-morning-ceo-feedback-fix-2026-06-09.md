# Hermes Morning CEO + Feedback-Inbox Fix - 2026-06-09

## Kurzfazit
Signal: Green.

Der Morgen-CEO wurde geschaerft und eine kleine Feedback-Inbox wurde angelegt. Es gibt keinen neuen Dauerjob. Stattdessen lesen die relevanten bestehenden Jobs eine einfache Rueckmeldequelle.

## Was geaendert wurde
- Feedback-Inbox angelegt:
  - `/Users/zondrius/hermes-workspace/inbox/chris-feedback/README.md`
  - `/Users/zondrius/hermes-workspace/inbox/chris-feedback/feedback-log.md`
- `HERMES_MORNING_CEO_DAILY` geschaerft:
  - Life Move ist kuenftig der Standard fuer `Heute zaehlt`.
  - Konkrete Life Card darf nicht durch generische Tagesklarheit ersetzt werden.
  - Keine langen Quellenauszuege mehr im Morgenbericht.
  - Feedback status wird sichtbar.
- Diese Jobs lesen nun die Feedback-Inbox:
  - `HERMES_NIGHT_RESULT_TUEV_DAILY`
  - `HERMES_LIFE_BUILDER_NIGHTLY`
  - `HERMES_MORNING_CEO_DAILY`
  - `TEACHER_NEXTDAY_DAILY`
  - `NIGHT_APP_STUDIO_BUILD_DAILY`

## Warum kein neuer Job
Ein neuer Feedback-Cronjob waere mehr Systemrauschen. Besser ist: bestehende Nacht- und Schuljobs lesen dieselbe kleine Feedback-Quelle und passen ihre Entscheidung an.

## Feedback-Format
Eine Zeile reicht:

```text
YYYY-MM-DD | Bereich | genutzt? | Wirkung | zu viel/fehlte | naechster Mini-Schritt
```

Beispiel:

```text
2026-06-09 | Schule | S-Kiste getestet | half beim Start | zu viele Gegenstaende | morgen nur 2 Karten
```

## Erwartete Wirkung
- Hermes darf fehlende echte Nutzung nicht mehr als Erfolg behandeln.
- Night App baut keine V2, wenn kein Test stattfand.
- Teacher Nextday kann kuerzen, wenn Chris sagt: zu lang oder zu viel Material.
- Morgen-CEO zieht den konkretesten Life Move nach vorne.

## Backup
Vor der Aenderung:
`/Users/zondrius/.hermes/backups/2026-06-09-morning-ceo-feedback/`

## Pruefung
Pruefscript:
`/Users/zondrius/.hermes/scripts/hermes_morning_ceo_feedback_check.py`

## Decision Inbox
- Signal: Green
- SOFORT_MACHEN: nichts; beim naechsten echten Test optional eine Zeile in `feedback-log.md` schreiben.
- CHRIS_ENTSCHEIDET: Ob Feedback spaeter per Telegram/Formular bequemer eingesammelt werden soll.
- BEOBACHTEN: Ob Morgen-CEO morgen wirklich den Life Move nach vorne zieht.
- SPAETER: Feedback-Inbox nur ausbauen, wenn eine Zeile manuell nicht reicht.
- BLOCKIERT: echte Resonanz bleibt leer, solange keine Rueckmeldung eingetragen wird.
- NICHT_TUN: Kein neues Feedback-Portal, keine personenbezogenen Daten, keine Fotos, keine Diagnosen.
- Naechste kleinste Aktion: Nach Nutzung einer Hermes-Karte eine kurze Feedback-Zeile eintragen.
- Beleg / Datei: `/Users/zondrius/hermes-workspace/reports/hermes-control/hermes-morning-ceo-feedback-fix-2026-06-09.md`
