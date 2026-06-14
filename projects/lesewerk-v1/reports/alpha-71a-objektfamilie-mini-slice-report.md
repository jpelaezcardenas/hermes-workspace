# Alpha 71A - Objektfamilie Mini-Slice

Datum: 2026-05-21
Status: Gruen mit Codex-Abschluss nach Hermes-Iterationslimit

## Ziel

LeseWerk sollte einen ersten kontrollierten Inhaltsausbau bekommen, ohne Wortflut und ohne neue Diagnostiklogik. Die neue Objektfamilie sollte auf dem vorhandenen Alltagraum aufbauen: Sofa, Tisch, Tasse und Teller.

## Ergebnis

Umgesetzt wurde ein kleiner Objektfamilien-Slice:

- neue zentrale Funktion `getObjectFamilyMiniSlice()`
- Objektwoerter: Sofa, Tisch, Tasse, Teller
- ein einziger kindseitiger Mini-Moment mit dem Ankerwort Teller
- 5-Schritt-Logik: Bild, Silbe, Wort, Satz, Mini-Geschichte
- Satz: `Der Teller ist auf dem Tisch.`
- teacher-only Vorbereitung mit Materialhinweis und naechstem kleinen Schritt
- lokaler CSS-Spielraum mit Sofa, Tisch, Tasse und Teller als einfache Formen

## Geaenderte Dateien

- `src/lesewerk-content.mjs`
- `src/App.tsx`
- `src/styles.css`
- `tests/lesewerk-content.test.mjs`

## Warum dieser Schritt klein genug war

Es wurde keine neue komplette Wortfamilien-Journey gebaut. Stattdessen gibt es eine Lehrkraft-Vorbereitung und genau einen kindseitigen Mini-Moment. Dadurch wird die Objektwelt didaktisch sichtbar, ohne den Kinderpfad mit neuen Menues, vielen Woertern oder einer zweiten Spiellogik zu ueberladen.

## Verifikation

Hermes hat vor dem Iterationslimit bereits ausgefuehrt:

- `npm test -- tests/lesewerk-content.test.mjs`: bestanden
- `npm run build`: bestanden
- begrenzter Browser-Smoke: App geladen, Lehrkraftbereich geoeffnet, Objektfamilien-Karte gefunden, Objekt-Moment gestartet, Teller-Mini-Moment sichtbar, Fertig fuehrt in den Abschlusszustand

Codex hat danach frisch gegenverifiziert:

- `npm test -- --run`: 211 von 211 Tests bestanden
- `npm run build`: erfolgreich

## GE- und Privacy-Check

- Keine echten Namen.
- Keine neue Speicherung.
- Keine Cloud-, Login-, Upload- oder Exportlogik.
- Keine externen Assets.
- Keine neuen Dependencies.
- Keine Punkte, Timer, Rankings, Noten oder Diagnoseformulierungen im Kindermodus.
- Keine Erweiterung der Mama/Lama-Verwechslungsachse.

## Bewertung

Der Slice ist ein guter naechster Inhaltshebel: Er erweitert nicht blind die Wortmenge, sondern macht eine alltagsnahe Objektfamilie als ruhigen Lernanschluss sichtbar. Besonders stark ist, dass Tasse/Tisch/Teller kindlich konkret bleiben und der Ausbau ueber einen einzelnen Teller-Moment kontrolliert wird.

Die groesste Schwaeche ist noch der generische Abschlussscreen. Funktional passt er, aber ein spaeterer Feinschliff koennte die Abschlusskopie spezifischer auf `Teller-Mini-Moment` zuschneiden.

## Empfehlung fuer Alpha 71B

Naechster Schritt sollte kein neues Wortpaket sein. Besser waere ein Qualitaets- und Design-Slice:

- Objekt-Moment visuell auf Tablet/Mobile pruefen
- Abschlusskopie fuer Objekt-Moment spezifischer machen
- die Szene ruhiger und eindeutiger machen, falls Sofa/Tisch/Tasse/Teller visuell konkurrieren
- optional genau eine einfache Auswahlhandlung einbauen: `Was liegt auf dem Tisch?` mit zwei ruhigen Optionen, aber nur wenn der Bildschirm dadurch nicht dichter wird

## Abschluss

Hermes wurde wegen `Iteration budget exhausted (60/60)` blockiert, nachdem Tests, Build und Smoke bereits erfolgreich waren. Codex hat den fehlenden Report ergaenzt und die Verifikation erneut ausgefuehrt.
