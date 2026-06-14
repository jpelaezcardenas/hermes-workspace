# Alpha 25 - Watchdog Review

Datum: 2026-05-18
Status: Accepted / nicht blockiert

## Entscheidung

`Accepted / nicht blockiert`

Alpha 25 erfüllt den engen Auftrag: Die profil-sichere Tagesweg-Logik aus Alpha 24 ist im Lehrerbereich mit anonymen Demo-Profilen sichtbar. Die Umsetzung bleibt klein, lokal, nicht-diagnostisch und ohne neue Speicherung.

## Geprüfter Scope

Gefordert war:

- Import und Nutzung von `readingProfileExamples`
- Import und Nutzung von `getProfileSafeDailyPath`
- kleine Lehrer-Vorschau „Profil-Vorschau: Was passt heute?“
- drei statische Demo-Profile: `M+A`, `M+A+S+O+F`, `L+A+M`
- Anzeige von Zusammenfassung, Karten, Wort, Moduslabel, sichtbaren Optionen, versteckten Optionen und blockierten Task-IDs
- keine echte Profilverwaltung, keine echten Lernenden, keine Speicherung, kein Login, keine Cloud, keine Bewertung
- Tests, Build und Safety-Scan

Nicht umgesetzt, wie gefordert:

- kein voller Profil-Editor
- keine echten Schülerdaten oder Klassenlisten
- keine Persistenz der neuen Profilvorschau
- keine neuen Aufgaben, Wörter, Stories oder Content-Packs
- keine Export-/Download-/Print-Erweiterung
- keine Claims zu Diagnostik, Validierung, Produktionsreife oder Adaptivität im Echtbetrieb

## Source- und Änderungscheck

Gelesen vor der Umsetzung:

- `reports/alpha-22-watchdog-review.md`
- `reports/alpha-23-watchdog-review.md`
- `reports/alpha-24-watchdog-review.md`
- `reports/alpha-24-profile-safe-daily-path-report.md`
- `src/lesewerk-content.mjs`
- `src/App.tsx`
- `src/styles.css`
- `tests/lesewerk-content.test.mjs`

Geändert/erstellt wurden:

- `src/App.tsx`
- `src/styles.css`
- `tests/lesewerk-content.test.mjs`
- `reports/alpha-25-teacher-preview-report.md`
- `reports/alpha-25-watchdog-review.md`

## Funktionaler Check

Die neue Vorschau:

- liegt im Lehrerbereich und nicht im Kinderpfad
- nutzt nur statische Demo-Profile aus `readingProfileExamples`
- nutzt `getProfileSafeDailyPath(...)` direkt für die sichtbare Vorschau
- verwendet nur React-State für die temporäre Demo-Auswahl
- zeigt je Karte Wort, Moduslabel, sichtbare Optionen und versteckte Optionen
- zeigt blockierte Task-IDs in einer kleinen „Heute auslassen“-Zeile
- formuliert vorsichtig: Demo-Profil, passt heute, kleiner Leseweg, gemeinsam lesen, reduzierte Auswahl

Browserprüfung über `npm run preview`:

- Lehrerbereich lässt sich öffnen.
- Vorschau ist sichtbar.
- Wechsel auf `M+A+S+O+F` aktualisiert die Ausgabe.
- Ergebnis sichtbar: `Mama` und `Sofa`, jeweils `Reduzierte Auswahl`; bei `Mama` sichtbar `Mama, Momo` und versteckt `Mimi`; bei `Sofa` sichtbar `Sofa` und versteckt `Sonne, Salat`; heute auslassen `b-la-ma`.

## Testcheck

Ausgeführt:

- `npm test`

Ergebnis:

- 94 Tests bestanden
- 0 fehlgeschlagen

Neue Alpha-25-Testabdeckung:

- App-Quelle enthält die Vorschau-Überschrift.
- App-Quelle nutzt `readingProfileExamples` und `getProfileSafeDailyPath`.
- App-Quelle enthält die vier Moduslabels.
- Vorschau-Sektion enthält keine neue Storage-, Export-/Download-, Login-/Cloud- oder Netzwerklogik.
- Vorschau-Sektion enthält keine Diagnose-, Score-, Ranking-, Timer-, Noten- oder Prozent-Sprache.
- CSS enthält kompakte und responsive Vorschau-Klassen.

## Buildcheck

Ausgeführt:

- `npm run build`

Ergebnis:

- Build bestanden

## Safety Scan

Ausgeführt:

- fokussierter Scan der neuen `.profile-safe-preview`-Sektion in `src/App.tsx`
- CSS-Präsenzcheck für `.profile-safe-preview`, `.profile-safe-card-list`, `.profile-safe-preview-header`

Ergebnis:

- keine Treffer in der neuen Vorschau für `localStorage`, `sessionStorage`, `indexedDB`, `download`, `export`, `cloud`, `login`, `fetch`, `new Blob`, `URL.createObjectURL`
- keine Treffer in der neuen Vorschau für Schüler-/Klassenlisten-, Diagnose-, Score-, Ranking-, Timer-, Noten- oder Prozent-Sprache

Hinweis:

- Bestehende App-Bereiche enthalten weiterhin lokale Demo-Storage- und Druckvorschau-Funktionalität aus früheren Alphas. Alpha 25 hat diese nicht erweitert.

## Datenschutz- und GE-Prüfung

Bestanden:

- keine echten Schüler-, Eltern- oder Klassendaten
- keine Namen, Diagnosen, Familieninfos oder identifizierbaren Kombinationen
- keine neue Speicherung lokaler Profile
- keine automatische pädagogische Entscheidung
- keine Noten, Scores, Ranking, Prozentwerte oder Timer
- Kinderpfad bleibt unverändert, bis die Lehrkraft andere bestehende Funktionen bewusst nutzt
- Sprache bleibt vorsichtig und handlungsnah

## Risiken / Grenzen

- Das Profilmodell deckt weiterhin nur drei frühe Level-B-Aufgaben ab.
- Die Vorschau zeigt nur Demo-Profile, keine echte Lernverlaufslogik.
- Satzbausteine, Storytexte und weitere Aufgaben sind weiterhin nicht in den Profilfilter einbezogen.
- Ein visueller Test auf mehreren echten Geräten steht noch aus; Browser-Check lokal war unauffällig.

## Kleinster nächster Fix, falls später blockiert

Nicht blockiert. Kleinster sinnvoller nächster Schritt:

- Tablet-/Smartphone-Feinsichtung der neuen Vorschau: Prüfen, ob die drei Profilbuttons und die Kartenzeilen ohne Gedränge lesbar bleiben. Nur bei Bedarf Abstände oder Zeilenumbrüche nachjustieren.

## Endentscheidung

`Accepted / nicht blockiert`
