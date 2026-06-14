# Alpha 34B - Implementation Report

## Ergebnis
Alpha 34B ist umgesetzt. Der Lehrkraftbereich kann jetzt die lokale Lernbeobachtung klarer steuern: bekannte Grapheme, sichere Silben, Hilfen und Bereitschaften werden zusammengeführt und begründen den nächsten kleinen Lernschritt. Der Kinderpfad bleibt ruhig.

## Umgesetzt
- Lokale Beobachtungszusammenfassung:
  - `getLocalObservationControlSummary(...)`
  - zeigt `Heute im Blick`, `Hilfe`, `Bereitschaft`, `Warum passt das?`, `Heute auslassen`
- Kuratierte Beobachtungsaufgaben:
  - `getCuratedObservationTasksForProfile(...)`
  - 7 Aufgaben, also innerhalb der Vorgabe 6 bis 8
  - deckt Bild/Symbol, Graphem, Silbe, Wort, Satz, Mini-Geschichte und Schreibbrücke ab
- Lehrkraft-UI:
  - neue Bereitschafts-Chips: Satz, Mini-Geschichte, Schreibbrücke
  - adaptive Vorschau zeigt lokale Begründung und ausgelassene Aufgaben
  - kuratierte Beobachtungsaufgaben sind im Lehrkraftbereich sichtbar
- Styles:
  - kleine Ergänzungen für `builder-note` und `curated-observation-tasks`

## Geänderte Dateien
- `src/lesewerk-content.mjs`
- `src/App.tsx`
- `src/styles.css`
- `tests/lesewerk-content.test.mjs`
- `reports/alpha-34b-implementation-report.md`

## Verifikation
- `npm test`: bestanden, 134/134 Tests.
- `npm run build`: bestanden.
- Browser-Smoke Desktop 1280x900:
  - Kinderpfad/Tagespfad sichtbar
  - Lehrkraftbereich erreichbar
  - `Heute im Blick`, `Warum passt das?`, `Bereitschaft` und `Kuratierte Beobachtungsaufgaben` sichtbar
  - kein horizontaler Overflow
- Browser-Smoke Mobile 390x844:
  - dieselben Kernbereiche sichtbar
  - Chip-Gruppen umbrechen ohne horizontalen Overflow

## Safety-Scan
Keine neuen echten Lernendendaten, Namenfelder, Klassenlisten, Diagnosen, Scores, Timer, Rankings, Logins, Cloud-/Upload-/Exportfunktionen oder geschützten Symbolassets. Treffer zu Namen/Diagnose/Export in bestehenden Quellen sind Safety-Hinweise oder Negativformulierungen, keine neuen Funktionen.

## Bewertung
Alpha 34B ist ein echter Individualisierungsschritt. Die App wird nicht nur schöner, sondern didaktisch steuerbarer: Die Lehrkraft sieht, warum eine Aufgabe zu bekannten Buchstaben, Silben und Hilfen passt. Das ist deutlich näher an einem nutzbaren GE-Lesewerkzeug.

## Grenzen
- Die 7 Beobachtungsaufgaben sind noch modellhafte Aufgaben, kein vollständiges Curriculum.
- Die UI im Lehrkraftbereich ist umfangreicher geworden; Alpha 35 sollte weiter verdichten, nicht noch mehr parallele Flächen hinzufügen.
- Bildhafte Unterstützung bleibt lizenzsicher text-/typografiebasiert.

## Nächster sinnvoller Schritt
Alpha 35 sollte die Beobachtungsaufgaben in echte Unterrichtspfade überführen: kleine Serien für bekannte Buchstaben/Silben, Wiederholungsschleifen und gezielte Mini-Geschichten, ohne den Kinderpfad zu überladen.
