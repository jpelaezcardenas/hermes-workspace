# Alpha 28 Profile Builder Report

## Ergebnis
Alpha 28B ergänzt LeseWerk um einen lokalen, anonymen Teacher-Profile-Builder im Lehrkraftbereich. Lehrkräfte können bekannte Grapheme, bekannte Silben, Hilfen und einen Zugangsschwerpunkt über Chips einstellen. Daraus entsteht sofort eine adaptive Vorschau mit passenden Karten, nächstem kleinen Schritt, Hilfen, optionaler Schreibbrücke und kurzer Auslassen-Stichprobe.

## Geänderte Dateien
- `src/lesewerk-content.mjs`
- `src/App.tsx`
- `src/styles.css`
- `tests/lesewerk-content.test.mjs`
- `reports/alpha-28-profile-builder-report.md`
- `reports/alpha-28-watchdog-review.md`

## Helper-Schicht
Neu ergänzt:
- `profileBuilderOptions`
- `createLocalDidacticProfile(input)`
- `getAdaptiveNextStepForProfile(profile, options?)`

Die Helper arbeiten lokal und anonym. Sie übernehmen nur Auswahlwerte aus erlaubten Graphem-, Silben-, Hilfe- und Zugangsfokus-Listen. Es gibt keine Namen, keine Klassenlisten, keine gespeicherten Lernprofile, keinen Login, keinen Export und keinen Backend-Bezug.

Die adaptive Empfehlung nutzt vorhandene Logik:
- `getProfileSafeDailyPath`
- `getTaskRequirementCoverageSummary`
- `getDevelopmentCoverageSummary`
- `getWritingBridgeForTask`

## Individualisierung
Abgedeckte Fälle:
- M+A: empfiehlt Mama, Bildhilfe/reduzierte Auswahl und eine ruhige Silbenbrücke.
- M+A+S+O+F: empfiehlt Mama + Sofa als kleinen Pfad.
- breiteres Profil: erhält mehr passende Karten und eine Schreibbrücke.
- hilfeintensives Profil: setzt den Schwerpunkt konservativ auf Bild/Symbol und behält Hilfeplan sichtbar.

## UI
Neue Fläche im Lehrkraftbereich:
`Lokales Leseprofil einstellen`

Sichtbar sind:
- bekannte Grapheme
- bekannte Silben
- Hilfen
- Zugangsschwerpunkt
- Heute passend
- Nächster kleiner Schritt
- Hilfen
- Schreibbrücke, falls vorhanden
- Heute auslassen

Der Kinderpfad wird dadurch nicht automatisch verändert.

## Datenschutz / Sicherheit
- Keine echten Namen.
- Keine Texteingabe für Personenangaben.
- Keine Speicherung lokaler Builder-Auswahl.
- Kein Login, keine Cloud, kein Export, kein Upload/Download.
- Keine Diagnose-, Score-, Rang- oder Drucklogik im neuen Builder.
- Keine geschützten Assets eingeführt.

## Verifikation
- `npm test`: bestanden, 115/115 Tests.
- `npm run build`: bestanden.
- Fokussierter Source-Scan auf geschützte Assets und riskante technische Begriffe: keine Treffer in `src/App.tsx`, `src/lesewerk-content.mjs`, `src/styles.css`.

## Grenzen
- Browser-Smoke ist noch als lokale Sichtprüfung sinnvoll, wenn die App im Browser geöffnet ist.
- Die Empfehlung bleibt bewusst eine Planungsstütze. Sie ersetzt keine pädagogische Beobachtung.
