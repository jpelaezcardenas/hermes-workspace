# Morning CEO Teacher-Nextday Bridge Hardening - 2026-06-16

## Anlass

Chris hat eine Morning-CEO-Meldung vom 2026-06-15 zur Pruefung gegeben. Die gepostete Telegram-Meldung war alt; die lokale Datei fuer den 15.06. war bereits korrigiert. Beim Gegencheck des aktuellen 16.06.-Berichts zeigte sich aber ein echtes Restproblem:

- `teacher-nextday-2026-06-15.md` existiert.
- Die Datei enthaelt `Fuer morgen: 2026-06-16`.
- Morning CEO 2026-06-16 schrieb trotzdem, es sei kein aktueller Teacher-Nextday-Dateiname gefunden worden.

## Bewertung

Qualitaet: Yellow.

Die Tagesentscheidung selbst war brauchbar: Gartenpost statt S-Kiste, proof-gated, datensparsam. Der Quellenhinweis war aber falsch. Das ist wichtig, weil Morning CEO sonst Vertrauen verliert und spaeter gute Teacher-Nextday-Arbeit indirekt statt sauber als Quelle nutzt.

## Fix

- `HERMES_MORNING_CEO_DAILY` hat eine harte Teacher-Nextday-Quellenregel erhalten.
- Wenn eine `teacher-nextday-*.md` Datei mit `Fuer morgen: heute` existiert, muss Morning CEO den Pfad in `## Quellenlage` nennen.
- In diesem Fall sind Formulierungen wie `kein aktueller Teacher-Nextday-Beleg gefunden` oder `kein aktueller Teacher-Nextday-Dateiname gefunden` verboten.
- Der lokale Check `hermes_morning_ceo_feedback_check.py` prueft jetzt auch den heutigen Morning-CEO-Bericht gegen diese Regel.
- `morning-ceo-2026-06-16.md` wurde korrigiert und nennt den passenden Teacher-Nextday-Pfad.

## Zusatzfix Wochenplan

Beim breiteren Cron-Check war ein weiterer echter Fehler sichtbar: `WOCHENPLAN_GE_SONNTAG` fand sein Script nicht im Profilpfad. Gleichzeitig enthielt das zentrale Script noch S-Kiste als Wochenfokus. Beides wurde korrigiert:

- Profil-Wrapper angelegt: `/Users/zondrius/.hermes/profiles/neva/scripts/weekly_plan_ge_sonntag.py`
- Zentrales Script entplumpt: `/Users/zondrius/.hermes/scripts/weekly_plan_ge_sonntag.py`
- Test angepasst: `/Users/zondrius/.hermes/scripts/weekly_plan_ge_sonntag_test.py`
- Job-Prompt ergaenzt: keine S-Kiste/S-Gegenstand/S-Bildkarte im Wochenplan.

## Ergebnis

Die S-Kiste-Parkregel bleibt bestehen. Fuer den 16.06. ist die korrekte Schullinie:

- Teacher-Nextday gefunden und gueltig fuer heute.
- Kern: Gartenpost zustellen.
- Proof: noch untested.
- Keine S-Kiste, keine S-Gegenstand/S-Bildkarte, keine flache Buchstabenstation.

## Decision Inbox

- Signal: Green
- SOFORT_MACHEN: nichts
- CHRIS_ENTSCHEIDET: nichts
- BEOBACHTEN: Morgen-CEO 2026-06-17 soll den Teacher-Nextday-Pfad sauber nennen, wenn ein passender Beleg existiert.
- SPAETER: Falls der Fehler wieder auftaucht, Morning CEO auf eine kleine Vorpruefdatei statt freie Quellenlogik umstellen.
- BLOCKIERT: nichts
- NICHT_TUN: Keine alten Teacher-Nextday-Belege als fehlend ausgeben, wenn `Fuer morgen:` auf heute passt.
- Naechste kleinste Aktion: naechsten Morning-CEO-Lauf kontrollieren.
- Beleg / Datei: /Users/zondrius/hermes-workspace/reports/night-loop/morning-ceo-2026-06-16.md
