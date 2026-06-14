# Alpha 65 - Wortpost Profilpfad und Satzbruecke

## Ergebnis

Alpha 65 ist umgesetzt. Die Wortpost ist jetzt nicht mehr nur ein Mini-Spiel, sondern nutzt den lokalen Lernstand als Startpunkt: bekannte Einheiten, Profilhinweise und ruhige Unterstuetzung bestimmen den Pfad. Nach einer richtigen Zuordnung entsteht eine erste Satzbruecke, damit das Kind den Uebergang von Bild/Wort zu Satz erkennt.

## Geaendert

- `src/lesewerk-content.mjs`
- `src/App.tsx`
- `src/styles.css`
- `tests/lesewerk-content.test.mjs`

## Umgesetzt

- `getProfileSafeWortpostPath(...)` waehlt bis zu drei ruhige Wortpost-Karten passend zum lokalen Profil.
- `getWortpostSentenceBridge(...)` liefert kurze, konkrete Satzbruecken, z. B. `Mama ist da.`
- Die Lehrkraft sieht vor dem Start, warum ein Pfad gewaehlt wurde.
- Die Kinderansicht bleibt frei von Punkten, Timer, 1-10-Skala und Diagnose-Sprache.
- Die Rueckmeldung zeigt die Satzbruecke erst nach einer richtigen, angekommenen Karte.
- Der Lehrkraftnachweis dokumentiert Pfadgrund, Satzbruecke und sichtbare Leseschichten.
- Ein Ziel-Duplikat im reduzierten Auswahlmodus wurde behoben, wenn Optionen noch keine eigene Task-Datei hatten.

## Verifikation

- `npm test -- --run`: 163/163 Tests bestanden.
- `npm run build`: bestanden.
- Desktop-Smoke: Profilpfad sichtbar, Wortpost startbar, Mama-Zuordnung, Satzbruecke, Lehrkraftnachweis, kein Overflow.
- Mobile-Smoke: Wortpost startbar, Mama-Zuordnung, Satzbruecke, kein Overflow bei 390px Breite.
- Finish-Smoke: drei Wortpost-Runden bis zum Abschluss bestanden, Abschlussszene sichtbar, kein Overflow.
- Regression Alpha 60: Auswahl-Spiel mit Ball/Tasse weiterhin spielbar, Rueckweg zur Geschichte funktioniert.

## Qualitaetseinschaetzung

Das ist ein starker Schritt Richtung individueller Lesefoerderung: Die App fuehlt sich jetzt weniger wie eine lose Uebung an und mehr wie ein gefuehrter Lesepfad. Besonders wertvoll ist der Uebergang von Wort zu Satz, weil genau dort fuer viele Schuelerinnen und Schueler im GE-Bereich Orientierung verloren geht.

Noch nicht S-Tier: Der Pfad ist erst ein sicherer Anfang. Als naechster grosser Hebel fehlen direkt steuerbare Entwicklungsstufen fuer Lehrkraefte, groessere Wort-/Bild-/Satzpakete nach Graphemen, und mehr sichtbare Progression von Bild zu Silbe zu Wort zu Satz.

## Empfohlener naechster Slice

Alpha 66 sollte die Wortpost zu einem echten Entwicklungsstufen-Modul ausbauen:

1. Lehrkraft waehlt oder bestaetigt bekannte Buchstaben/Grapheme.
2. App erzeugt daraus automatisch passende Wort-, Silben- und Satzangebote.
3. Untere Stufen bekommen Bildanker und sehr kurze Sprachmuster.
4. Hohe Stufen bekommen kleine Satz- und Mini-Geschichten-Bruecken.
5. Jeder Schritt wird lokal dokumentiert, ohne das Kind mit Diagnostik zu belasten.
