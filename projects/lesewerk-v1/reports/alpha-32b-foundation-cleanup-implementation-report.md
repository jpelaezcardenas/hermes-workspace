# Alpha 32B - Foundation Cleanup Implementation Report

## Ergebnis
Alpha 32B wurde als kleiner Stabilisierungsslice umgesetzt. Der alte technische UI-Marker rund um `Lesepfad starten` wurde entfernt, die Tests prüfen nun die sichtbare Absicht der aktuellen Oberfläche: `Tagespfad starten` im Header, `Weiter` in der aktiven Schrittkarte und eine sekundäre Bibliothek darunter.

## Geänderte Dateien
- `src/lesewerk-content.mjs`
- `src/App.tsx`
- `tests/lesewerk-content.test.mjs`
- `reports/alpha-32b-foundation-cleanup-implementation-report.md`
- `reports/alpha-32b-watchdog-review.md`

## Umsetzung
- Alte Kommentar-/Quellmarker zur früheren `Lesepfad starten`-Benennung wurden entfernt.
- Der UI-Intent-Test wurde auf die tatsächliche Alpha-31/32-Oberfläche umgestellt.
- Story- und Schreibbrücken-Metadaten wurden vorbereitet, ohne die bestehende Aufgabenstruktur aufzubrechen:
  - `createMiniStoryBridgeMetadata(...)`
  - `createWritingBridgeMetadata(...)`
  - `getTaskBridgeMetadata(taskId)`
- Ausgewählte Alpha-31-Aufgaben tragen jetzt explizite Brückeninformationen:
  - `alpha31-c-sofa-sentence`
  - `alpha31-c-tasse-sentence`
  - `alpha31-c-ball-story`
  - `alpha31-c-sofa-writing`
- Die Packgröße wurde bewusst nicht erhöht. Alpha 32B ist Fundamentpflege, kein neuer Content-Bulk.

## Verifikation
- `npm test`: bestanden, 129/129 Tests.
- `npm run build`: bestanden.
- Browser-Smoke lokal auf `dist`:
  - Desktop 1280x900 lädt ohne horizontalen Overflow.
  - Mobile 390x844 lädt ohne horizontalen Overflow.
  - `Tagespfad starten` ist sichtbar.
  - Die Schrittkarte `Weiter` schaltet von Bild zu Silbe.
  - Die Bibliothek bleibt sekundär unterhalb des Tagespfads.
  - Der Lehrkraftbereich mit `Lernstart: kurzer Check` bleibt erreichbar.

## Grenzen
- Die neuen Brücken-Metadaten sind im Datenmodell verfügbar, aber noch nicht als eigene sichtbare Story-/Schreibbrücken-Komponente ausgebaut.
- Die App braucht weiterhin mehr kuratierte Wort-, Silben-, Satz-, Mini-Geschichten- und Schreibangebote für ein wirklich breites Unterrichtsprodukt.
- Bild-/Symbolqualität bleibt absichtlich placeholder-basiert; keine geschützten Symbolsysteme wurden eingebunden.
