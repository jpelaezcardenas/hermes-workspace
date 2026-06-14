# Alpha 70D - Lehrkraftauswahl transparent machen

Datum: 2026-05-21
Status: Gruen mit begrenztem Browser-Smoke

## Ziel

Die Lehrkraftansicht sollte bei Mama, Sofa, Tasse und Lama nicht nur Bereitschaft anzeigen, sondern ruhig erklaeren:

- warum diese Reise erscheint,
- welche bekannte Einheit genutzt wird,
- welche Stufe angesprochen ist,
- welche Hilfe sinnvoll ist,
- was der naechste kleine Schritt ist.

Der Kindermodus sollte dadurch nicht belastet werden.

## Umgesetzte kleinste Aenderung

- `src/lesewerk-content.mjs`: neue zentrale Funktion `getMiniJourneyTeacherRationales()` mit je einer Lehrkraftbegruendung fuer Mama, Sofa, Tasse und Lama.
- `src/App.tsx`: neue kompakte Lehrkraft-Erklaerungsebene im bestehenden Wortpost-/Mini-Reisen-Bereich. Sie zeigt Fokus, bekannte Einheit, Stufe, Grund, Hilfe und naechsten kleinen Schritt.
- `src/styles.css`: ruhige, kleine Karten fuer die neue rationale Ebene, ohne Redesign des Kinderpfads.
- `tests/lesewerk-content.test.mjs`: neuer Alpha-70D-Test fuer rationale Struktur, sichere Sprache und Trennung vom Kind-Mini-Reise-Bereich.

## TDD-Nachweis

- RED: `npm test -- --run` schlug zuerst erwartbar fehl, weil `getMiniJourneyTeacherRationales` noch nicht exportiert war.
- GREEN: Nach minimaler Implementierung laufen alle Tests gruen.

## Inhaltliche Entscheidungen

- Die Begruendung ist teacher-only und statisch aus den bestehenden vier Mini-Reisen abgeleitet, nicht aus personenbezogenen Daten.
- Formulierungen nutzen ruhige Lehrkraftsprache: `Passt, weil ...`, `Hilft bei ...`, `Nächster kleiner Schritt ...`.
- Es wurden keine neuen Kinderaufgaben, Woerter, Assets, Speicherwege oder automatischen Einstufungen ergaenzt.

## Verifikation

- `npm test -- --run`: 209 von 209 Tests bestanden.
- `npm run build`: erfolgreich.
- Browser-Smoke lokal auf `http://127.0.0.1:53512`:
  - App laedt.
  - Lehrkraftbereich oeffnet.
  - Rationale Ebene ist sichtbar: `Warum diese Reise?`, `Hilft bei`, `Zielwort Mama`, `Nächster kleiner Schritt` wurden im DOM gefunden.
  - Rueckwechsel in den Kinderpfad: keine Teacher-Rationale-Sprache sichtbar (`Warum diese Reise?`, `Zielwort Mama`, `Passt, weil`, `Hilft bei` nicht im sichtbaren Bodytext).

## GE/Privacy-Check

- Keine echten Namen.
- Keine neuen Diagnosen oder automatischen Einstufungen.
- Keine Punkte, Timer, Rankings oder Drucksprache im Kindermodus.
- Keine externen Assets.
- Keine neuen Dependencies.
- Keine neue Speicherung oder Cloud-Anbindung.

## Staerken

- Lehrkraefte sehen jetzt sofort eine kurze Begruendung je Reise statt nur Status/Startknopf.
- Die Begruendung bleibt nahe an den vorhandenen Einheiten und am fuenfstufigen Lesepfad.
- Der Kindermodus bleibt laut Test und Smoke frei von dieser Lehrkraft-Erklaerung.

## Schwaechen

- Die Rationale-Texte sind statisch pro Ankerwort; sie erklaeren die Reise, nicht jede moegliche Profilvariante dynamisch.
- Der Browser-Smoke war bewusst repraesentativ und nicht als Vollpruefung aller vier Reise-Starts angelegt.

## Risiken

- Die Lehrkraftansicht wird durch eine weitere Infoebene etwas dichter. Die CSS-Karten sind deshalb kompakt gehalten, sollten aber spaeter visuell in einem breiteren Teacher-UI-Slice mitgeprueft werden.
- Der lokale Standard-Preview-Port 4173 war bereits belegt; Smoke lief deshalb ueber einen freien lokalen Ersatzport.

## Naechster kleinster Schritt

Alpha 70E als reine Inhaltsmatrix vorbereiten: vorhandene Buchstaben, Silben, Woerter, Saetze, Mini-Geschichten und naechster Ausbau, ohne neue Woerter direkt zu implementieren.
