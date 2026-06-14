# Alpha 25 - Kleine Lehrer-Profilvorschau

Datum: 2026-05-18
Status: Implementiert und lokal verifiziert

## Kurzfazit

Alpha 25 ergänzt im Lehrerbereich eine kompakte, anonyme Profil-Vorschau: „Profil-Vorschau: Was passt heute?“. Sie nutzt die vorhandenen Demo-Profile aus Alpha 22/24 und zeigt sichtbar, wie `getProfileSafeDailyPath(...)` den kleinen Leseweg abhängig von bekannten Graphemen reduziert.

Die Vorschau ist rein lokal, teacher-facing und nicht diagnostisch. Sie verändert den Kinderpfad nicht automatisch und speichert keine neue Profilauswahl.

## Geänderte Dateien

- `src/App.tsx`
- `src/styles.css`
- `tests/lesewerk-content.test.mjs`
- `reports/alpha-25-teacher-preview-report.md`
- `reports/alpha-25-watchdog-review.md`

## Umsetzung

Ergänzt wurde im Lehrerbereich nach dem vorsichtigen Tagesweg-Vorschlag ein kleiner Kontroll-/Checkblock mit:

- statischen Demo-Profil-Schaltern: `M+A`, `M+A+S+O+F`, `L+A+M`
- React-Komponentenstatus nur im Speicher der laufenden App-Instanz
- Nutzung von `readingProfileExamples[teacherPreviewProfileKey]`
- Nutzung von `getProfileSafeDailyPath(teacherPreviewProfile, { minimumChoices: 1 })`
- kurzer Zusammenfassung aus der Tagesweg-Logik
- sichtbaren Karten mit Wort, Moduslabel, sichtbaren Optionen und versteckten Optionen
- kleiner „Heute auslassen“-Zeile für blockierte Task-IDs

Die Moduslabels sind bewusst lehrkraft-/kindnah formuliert:

- `teacher-led` → „Gemeinsam lesen“
- `reduced-choice` → „Reduzierte Auswahl“
- `full-choice` → „Freie Auswahl“
- `blocked` → „Heute auslassen“

## Datenschutz- und Scope-Entscheidungen

Bestanden:

- keine echten Schülerdaten
- keine Namen, Fotos, Diagnosen, Familieninfos oder Klassenlisten
- keine neue Speicherung für die Profilvorschau
- kein `localStorage`, `sessionStorage` oder `indexedDB` in der neuen Vorschau
- kein Login, keine Cloud, kein Export, kein Download
- keine Bewertung, kein Ranking, keine Noten, keine Prozentwerte, kein Timer
- keine automatische Änderung des Kinderpfads

Wichtig: In `src/App.tsx` existiert aus früheren Alphas weiterhin lokale Demo-Storage- und Druckvorschau-Logik. Alpha 25 hat diese Bereiche nicht erweitert; der fokussierte Scan der neuen `.profile-safe-preview`-Sektion hat keine Treffer für die verbotenen Muster ergeben.

## Verifikation

Ausgeführt:

- `npm test` → 94/94 Tests bestanden
- `npm run build` → bestanden
- fokussierter Safety-Scan der neuen Profilvorschau → keine Treffer für Storage, Export/Download, Login/Cloud oder Bewertungs-/Diagnosesprache
- lokale Browserprüfung über `npm run preview` auf `http://localhost:4173`

Browserprüfung:

- Wechsel in den Lehrerbereich funktioniert.
- Die Vorschau erscheint nicht im Kinderpfad, sondern im Lehrerbereich.
- Profilschalter `M+A+S+O+F` aktualisiert die Vorschau sichtbar.
- Beispielausgabe nach Wechsel auf `M+A+S+O+F`: `Mama` und `Sofa`, jeweils Modus `Reduzierte Auswahl`; bei `Mama` sichtbar `Mama, Momo` und versteckt `Mimi`; bei `Sofa` sichtbar `Sofa` und versteckt `Sonne, Salat`; auslassen `b-la-ma`.

## Tests

Neue Alpha-25-Tests prüfen:

- App-Quelle enthält die Vorschau-Überschrift.
- App-Quelle importiert/nutzt `getProfileSafeDailyPath` und `readingProfileExamples`.
- App-Quelle enthält die Moduslabels „Gemeinsam lesen“, „Reduzierte Auswahl“, „Freie Auswahl“, „Heute auslassen“.
- die neue Vorschau-Sektion enthält keine neue Storage-/Export-/Cloud-/Login-Logik.
- CSS enthält kompakte und responsive Klassen für die Vorschau.

## Grenzen

- Die Vorschau nutzt weiterhin nur die drei profilierten Alpha-22-Aufgaben `b-ma-ma`, `b-so-fa`, `b-la-ma`.
- Die Vorschau ist kein Profil-Editor und keine Diagnostik.
- Es gibt keine Persistenz der Demo-Profilwahl.
- Eine breitere Profilierung weiterer Aufgaben und Stories bleibt eine spätere, separate Scheibe.

## Kleinster nächster Schritt

Wenn Alpha 26 anschließt, sollte zuerst geprüft werden, ob die Vorschau im Tablet-Querformat und auf kleinem Smartphone visuell ruhig genug bleibt. Erst danach wäre eine sehr kleine Erklärung der Demo-Profile sinnvoll; kein echter Profil-Editor.
