# Alpha 13 Slice E – Final Watchdog Review

Datum: 2026-05-17
Status: Accepted

## Kurzfazit

Alpha 13 ist als fokussierte Content-Qualitätsphase akzeptiert. Die Aufgabe wurde nicht breit erweitert, sondern die vorhandenen Leseaufgaben und Story-Pfade wurden didaktisch geprüft, gezielt geschärft und durch Tests abgesichert.

Der finale Watchdog sieht keinen Blocker für Alpha 13. Die verbliebenen Hinweise sind Feinschliff, nicht stabilitäts- oder datenschutzkritisch.

## Geprüfte Grundlagen

Gelesen und gegengeprüft:

- `reports/alpha-13-goal-prompt.md`
- `reports/alpha-13-content-audit.md`
- `reports/alpha-13-content-test-report.md`
- `reports/alpha-13-content-refinement-report.md`
- `reports/alpha-13-ge-content-review.md`
- `src/lesewerk-content.mjs`
- `src/App.tsx`
- `tests/lesewerk-content.test.mjs`

## Verifikation

Ausgeführt:

```bash
npm test
npm run build
```

Ergebnis:

- `npm test`: 63 bestanden, 0 fehlgeschlagen, 0 TODO
- `npm run build`: erfolgreich

## Source-Level Content-Safety Scan

Geprüft wurden `src/` und die relevanten Content-/UI-Texte auf:

- Diagnose-, Noten-, Rang-, Score-, Timer-, Zeitdruck-, Defizit- oder Schamwörter
- externe/protected Asset-Bezüge wie Bild-URLs, METACOM, Boardmaker, Widgit, ARASAAC oder lokale Bilddateien
- personenbezogene Daten, echte Namen, Fotos, Cloud-/Upload-/Export-Risiken

Ergebnis:

- Keine blockierenden Treffer.
- Treffer zu `diagnostische Einordnung`, `Fotos`, `Cloud`, `echte Namen` erscheinen nur in negierenden Datenschutz-Hinweisen der Lehreransicht.
- `localStorage` wird nur für das anonyme Demo-Profil genutzt.
- Keine externen Bildquellen, keine geschützten Symbolreferenzen, keine echten Schülerdaten.

## Browser-Check

Lokaler Check über statischen Server:

- URL: `http://127.0.0.1:55321/`
- App öffnet ohne Blank Screen.
- Browser-Konsole: keine JavaScript-Fehler, keine Konsolenmeldungen.
- Kinderpfad sichtbar mit anonymem Profil, Hilfen, Tagesweg und Lesekarte.
- Kinder-Interaktion geprüft: `Ich bin fertig` führt in die ruhige Feedback-Auswahl mit `Nochmal`, `Leichter`, `Weiter`, `Fertig`.
- Lehrerbereich öffnet und zeigt Tagesweg-Wahl, vorsichtigen Vorschlag, 10–15-Minuten-Pilot, anonyme Beobachtungskarte und lokale Druckvorschau.

Hinweis: Der erste Versuch mit `npm run dev -- --host 127.0.0.1` ist erwartbar fehlgeschlagen, weil das Projektscript intern `python3 -m http.server` nutzt und `--host` dort kein gültiges Argument ist. Zusätzlich waren Ports 5173/5174 belegt. Der Browsercheck wurde deshalb sicher auf Port 55321 mit `python3 -m http.server 55321 -d dist --bind 127.0.0.1` durchgeführt.

## Didaktischer Watchdog

Stärken:

- Level A/B/C bleiben klar gestuft: Bild-Wort, Silben, kurze Satz-/Satzansatz-Impulse.
- Die Inhaltsmengen bleiben stabil: 48 Lernaufgaben, 24 Story-Pfade.
- Story-Feedback ist ruhiger und weniger generisch als vor Slice C.
- Next Steps sind häufiger konkreter und für Lehrkräfte anschlussfähiger.
- Gebärden-Hinweise bleiben text-only und praktisch demonstrierbar.

Minor Notes:

- Einzelne Feedback- und Next-Step-Muster bleiben sprachlich ähnlich. Das ist nicht blockierend, könnte aber später in einer sehr kleinen Feinschliff-Runde weiter variiert werden.
- Der sichtbare Header nennt weiterhin `Alpha 12 · lokale Demo`. Für Alpha 13 ist das nicht blockierend, weil Alpha 13 absichtlich eine Content-Qualitätsphase ohne UI-Ausbau war. Wenn Alpha 14 eine Pilot-Readiness-Slice wird, sollte die Produkt-/Versionssprache einmal bewusst bereinigt werden.

## Datenschutz- und Sicherheitsurteil

Accepted.

- Keine echten Namen.
- Keine Diagnosen oder diagnostischen Gewissheiten.
- Keine Rankings, Scores, Timer oder Leistungssprache im Schülerpfad.
- Keine externen Assets oder geschützten Symbolquellen.
- Keine automatische Datei, kein Upload, keine Cloud.
- Beobachtungssprache bleibt vorsichtig, lokal und anonym.

## Alpha-14-Empfehlung

Empfohlen wird Alpha 14 als enger Pilot-Readiness- oder Diagnostik-Onboarding-Slice, nicht als breite Feature-Erweiterung.

Beste nächste Option:

### Alpha 14 – Pilot-Readiness Checklist und Versionsklarheit

Ziel:

- LeseWerk für einen ersten kleinen, lokalen Unterrichtspilot sauberer vorbereiten, ohne neue große Funktion.

Konkreter Scope:

1. Eine kurze Pilot-Checkliste ergänzen oder schärfen:
   - Gerät vorbereitet
   - anonymes Profil gewählt
   - Hilfen sichtbar
   - zwei Karten gelesen
   - Beobachtung nur lokal und sachlich
   - Abschluss ohne Diagnose

2. Versions-/Produkttext prüfen:
   - `Alpha 12 · lokale Demo` bewusst auf aktuellen Stand oder neutrale Demo-Sprache bringen.
   - Keine Marketingübertreibung.

3. Ein Mini-Onboarding für Lehrkräfte prüfen:
   - Was darf beobachtet werden?
   - Was darf nicht gespeichert werden?
   - Wie wird nach 10–15 Minuten beendet?

4. Tests nur dort ergänzen, wo sie diese Pilotgrenzen absichern.

Nicht empfohlen für Alpha 14:

- keine neuen Aufgabenpakete,
- keine breite Diagnostik,
- keine Export-/Cloud-Funktion,
- keine Schülerverwaltung,
- kein Asset-/Symbolpaket-Ausbau,
- keine Kommerzialisierungsseite.

## Entscheidung

Alpha 13: Accepted.

Nächster sicherer Schritt: Alpha 14 als schmale Pilot-Readiness-Checklist mit Versionsklarheit und Datenschutz-Onboarding planen.
