# Alpha 70C - Premium Symbolkarten Report

Datum: 2026-05-21
Status: Gruen mit Browser-Smoke-Einschraenkung

## Ziel

Die Mini-Geschichte-Auswahlkarten fuer Mama, Sofa, Tasse und Lama sollen ohne neue Inhalte und ohne externe Assets weniger wie Emoji-Platzhalter wirken. Die Karten sollen lokale, ruhige CSS-Symbol-/Szenenkarten zeigen und die bestehenden Textpaare unveraendert lassen.

## Umgesetzte kleinste Aenderung

- `src/App.tsx`: Emoji-Icons in `miniJourneyStoryChoices` wurden durch lokale Symbol-Schluessel ersetzt. Eine kleine Render-Hilfe `MiniJourneySymbolScene` gibt nun CSS-Symbolszenen fuer Mama, Sofa, Tasse und Lama aus.
- `src/styles.css`: Auswahlkarten wurden groesser, ruhiger und kartenspezifisch gestaltet. Tasse bekam Dampf-Details, Lama bekam Ohr-Details, die mobile Einspaltigkeit bleibt erhalten.
- `tests/lesewerk-content.test.mjs`: Textpaare, lokale Symbolstruktur und Ausschluss externer Assets/fetch/storage/Drucksprache werden abgesichert.

## Ergebnis

Die Mini-Geschichte-Auswahlkarten wirken jetzt weniger wie Emoji-Platzhalter. Statt einzelner Emoji-Zeichen nutzen sie lokale CSS-Szenen:

- Mama: Haus-/Herz-Symbolik
- Sofa: Sofa mit Sitzflaeche und Kissen
- Tasse: Tasse mit Henkel, Untertasse und Dampf
- Lama: Tierkoerper mit Hals, Kopf und Ohren

Die bestehenden Kartenpaare blieben unveraendert:

- Mama: `Mama ist da.` / `Das Sofa ist da.`
- Sofa: `Das Sofa ist da.` / `Mama ist da.`
- Tasse: `Die Tasse ist da.` / `Das Sofa ist da.`
- Lama: `Das Lama ist da.` / `Mama ist da.`

## Verifikation

- `npm test -- --run`: 208 von 208 Tests bestanden.
- `npm run build`: erfolgreich.
- Browser-Smoke: App lud auf lokalem Ersatzserver `http://127.0.0.1:4182`, Lehrkraftbereich war erreichbar, Mama-Mini-Reise konnte gestartet werden und der Mini-Reise-Fokusmodus wurde sichtbar. Der Weiter-Klick blieb im automatisierten Browser-Smoke auf der ersten Station stehen. Die Handler-Pruefung zeigte, dass `continueMamaFamilyMiniJourney()` den Index grundsaetzlich erhoeht; der Befund wird deshalb als Browser-/Teststeuerungsrisiko dokumentiert, nicht als bewiesener Alpha-70C-App-Fehler.

## Dateien

- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/src/App.tsx`
- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/src/styles.css`
- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/tests/lesewerk-content.test.mjs`
- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/reports/alpha-70c-premium-symbolkarten-report.md`

## GE/Privacy-Check

- Keine echten Namen.
- Keine Diagnostik.
- Keine Punkte, Timer, Rankings oder Schamsprache.
- Keine externen Assets.
- Keine neuen Packages.
- Keine Speicherung oder Cloud-Anbindung.

## Risiko

Die visuelle Verbesserung ist test- und buildseitig stabil, aber der vollautomatische Browserpfad sollte spaeter als eigener QA-Slice robuster gemacht werden. Der naechste sinnvolle technische Schritt ist daher nicht mehr Symbolkarten-Politur, sondern ein stabiler Smoke-Helfer fuer Premium-Lesereisen.

## Naechster Schritt

Alpha 70D sollte die Lehrkraft-Auswahl verstaendlicher machen: Warum erscheint eine Reise, welche Buchstaben/Silben sind vorausgesetzt, welche Stufe wird angesprochen, und welche Hilfe ist sinnvoll? Der Kinderpfad sollte dabei unveraendert bleiben.
