# Alpha 35B - Implementation Report

## Ergebnis
Alpha 35B ist umgesetzt. Die 7 Alpha-34-Beobachtungsaufgaben sind jetzt in 4 kompakte lokale Unterrichtsserien überführt. Die Lehrkraft sieht Serien mit Start, Wiederholung, nächstem kleinen Schritt, Hilfen und Auslasslogik. Der Kinderpfad bleibt unverändert ruhig.

## Umgesetzt
- Neue Ableitung:
  - `getLocalReadingSeriesForProfile(...)`
  - erzeugt 4 Serien aus den vorhandenen Alpha-34-Beobachtungsaufgaben
- Serien:
  - Ankommen und Wiedererkennen
  - Silben tragen
  - Woerter im Satz
  - Mini-Geschichte und Schreibbruecke
- Lehrkraft-UI:
  - `SeriesCompactPanel`
  - 4 Serienkarten
  - Detailkarte mit Start, Wiederholung, nächstem Schritt, Hilfen, Auslasslogik und Aufgaben darin
  - Einzelaufgaben liegen sekundär im Details-Block `Kuratierte Einzelaufgaben anzeigen`
- Kinderpfad:
  - keine neue Serienauswahl
  - keine neue Profilfläche
  - keine automatische Änderung durch Serienauswahl

## Geänderte Dateien
- `src/lesewerk-content.mjs`
- `src/App.tsx`
- `src/styles.css`
- `tests/lesewerk-content.test.mjs`
- `reports/alpha-35b-implementation-report.md`

## Verifikation
- `npm test`: bestanden, 136/136 Tests.
- `npm run build`: bestanden.
- Browser-Smoke Desktop 1280x900:
  - Kinderpfad sichtbar
  - Lehrkraftbereich erreichbar
  - Serienpanel sichtbar
  - 4 Serienkarten sichtbar
  - Serienauswahl aktualisiert die Detailkarte
  - Start, Wiederholung und nächster kleiner Schritt sichtbar
  - Einzelaufgaben-Details vorhanden
  - kein horizontaler Overflow
- Browser-Smoke Mobile 390x844:
  - dieselben Kernpunkte sichtbar
  - Serienkarten umbrechen ohne horizontalen Overflow

## Safety-Scan
Keine neuen echten Lernendendaten, Namenfelder, Klassenlisten, Diagnosen, Scores, Timer, Rankings, Logins, Cloud-/Upload-/Exportfunktionen oder geschützten Symbolassets. Treffer in bestehenden Dateien betreffen Safety-Hinweise oder Negativformulierungen, keine neuen Funktionen.

## Bewertung
Alpha 35B ist ein guter Produkt-Schritt: Die Lehrkraft bekommt nicht noch mehr Einzelkacheln, sondern eine verdichtete Unterrichtslogik. Aus Aufgaben werden kurze Serien. Das bringt LeseWerk näher an ein praxistaugliches GE-Lesewerkzeug.

## Grenzen
- Die Serien wählen noch keinen Kinderpfad automatisch aus.
- Die Serientitel nutzen teilweise ASCII-Schreibweise wie `Woerter`; fachlich ist das unkritisch, visuell könnte Alpha 36 deutsche Typografie glätten.
- Die Serien sind modellhaft und brauchen später mehr echte Inhaltsvarianten.

## Nächster sinnvoller Schritt
Alpha 36 sollte die Serien in noch bessere Unterrichtsqualität übersetzen: passende Serienauswahl für bekannte Grapheme/Silben, optionales manuelles Übernehmen in den Tagespfad und mehr hochwertige Varianten pro Serie, weiterhin ohne automatische Bewertung oder Datenhaltung.
