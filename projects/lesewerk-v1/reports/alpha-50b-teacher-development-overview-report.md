# Alpha 50B – Kleine Lehrer Entwicklungsübersicht

## Ergebnis
Alpha 50B ergänzt eine kleine teacher-side Karte: `Arbeitsstand und nächster möglicher Anschluss`.
Die Karte bleibt lokal, manuell und nicht-diagnostisch. Sie zeigt bekannte Einheiten, aktuelle Hilfe, Orientierung und einen möglichen Anschluss, ohne den Kinderpfad automatisch zu verändern.

## Geänderte Dateien
- `src/lesewerk-content.mjs`
  - Neue Funktion `getTeacherDevelopmentOverview(...)`.
  - Liefert nur generische, lokale Orientierungsdaten.
- `src/App.tsx`
  - Neue kompakte Karte im Lehrerbereich, direkt nach der Tagesweg-Auswahl.
  - Keine Buttons, keine Speicherung, keine automatische Übernahme.
- `src/styles.css`
  - Kleine Styles für `.teacher-development-overview` und `.teacher-development-grid`.
- `tests/lesewerk-content.test.mjs`
  - Zwei fokussierte Alpha-50B-Tests für Helper und UI-Safety.

## TDD
- RED: Zuerst wurden Tests für `getTeacherDevelopmentOverview(...)` und die neue Teacher-Card ergänzt. Der Lauf scheiterte erwartungsgemäß, weil der Helper und die UI noch fehlten.
- GREEN: Danach wurden Helper, Teacher-Card und minimale Styles ergänzt.
- Die Tests prüfen, dass die Übersicht lokal, manuell, nicht persistent und nicht-diagnostisch bleibt und den Kinderpfad nicht verändert.

## Verifikation
- `npm test`: bestanden, 152/152 Tests grün.
- `npm run build`: bestanden.
- Unabhängiger Browser-Smoke mit Chrome/Playwright über `http://127.0.0.1:4382/`: Desktop `1280x900` und Mobile `390x844` bestanden.
- Ablauf im Smoke: App öffnen, auf `Lehrkraft` wechseln, `.teacher-development-overview` prüfen.
- Sichtbar waren: `Arbeitsstand und nächster möglicher Anschluss`, `Bekannte Einheiten`, `Aktuelle Hilfe`, `Orientierung`, `Nächster möglicher Anschluss`, `Nur Orientierung, keine Bewertung`.
- Kein horizontaler Overflow, keine JavaScript-Fehler, keine relevanten HTTP-Fehler. Der temporäre Preview-Server wurde beendet.

## Safety
- Keine realen Lernenden-, Eltern-, Klassen- oder Diagnosedaten.
- Keine Namen, keine Speicherung, kein Export, kein Upload, keine Cloud, kein Login, kein Fetch.
- Keine Score-, Ranking-, Punkte-, Prozent-, Testwert-, Lesealter- oder Defizitlogik.
- Keine automatische Änderung des Kinderpfads.
- Keine externen oder geschützten Assets.

## Bewertung
Die Karte ist ein sinnvoller erster Schritt zur Lehrkraftsteuerung: Sie hilft beim Planen, ohne eine Diagnose oder ein Leistungsetikett zu erzeugen. Für GE ist das passend, weil die Lehrkraft eine ruhige Orientierung bekommt, während die Kinderansicht unverändert und reizarm bleibt.

## Grenzen
- Die Karte ist bewusst klein und ersetzt keine vollständige Förderplanung.
- Es gibt noch keine zweite Wortfamilie im gleichen Qualitätsformat wie die Tasse-Reihe.
- Spätere Erweiterungen müssen weiter streng zwischen Orientierung und Bewertung trennen.
