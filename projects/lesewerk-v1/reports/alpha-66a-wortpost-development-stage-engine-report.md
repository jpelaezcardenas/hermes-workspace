# Alpha 66A - Wortpost Entwicklungsstufen-Motor

## Ergebnis

Alpha 66A ist umgesetzt. Die Wortpost hat jetzt einen kleinen, lokalen Entwicklungsstufen-Motor. Aus bekannten Graphemen, bekannten Silben, Hilfen, Bereitschaft und aktuellem Fokus wird eine ruhige Stufe abgeleitet. Diese Stufe steuert eine knappe Orientierung fuer das Kind und eine transparente Einordnung fuer die Lehrkraft.

## Geaendert

- `src/lesewerk-content.mjs`
- `src/App.tsx`
- `src/styles.css`
- `tests/lesewerk-content.test.mjs`

## Umgesetzt

- Neue Funktion `getWortpostDevelopmentStage(profile)`.
- Neue Funktion `getWortpostStageOrientation(stageId)`.
- Vier Stufen:
  - `bildanker`
  - `silbenbruecke`
  - `wortaufbau`
  - `satzbruecke`
- `getProfileSafeWortpostPath(...)` liefert jetzt zusaetzlich `developmentStage`.
- Lehrkraft-Startansicht zeigt Stufe, Grund und naechsten kleinen Schritt.
- Kinderansicht zeigt nur einen kurzen Orientierungssatz, z. B. `Sprich die Silbe leise mit. Dann waehle.`
- Lehrkraftnachweis dokumentiert Entwicklungsstufe und naechsten Stufenschritt.
- Neue Tests pruefen Stufenlogik, Determinismus und druckfreie, kurze Orientierungstexte.

## Verifikation

- `npm test -- --run`: 166/166 Tests bestanden.
- `npm run build`: bestanden.
- Desktop-Smoke: Lehrkraft sieht Stufe `Silbenbruecke`; Kind sieht kurzen Orientierungssatz; Mama-Zuordnung und Satzbruecke funktionieren; kein Overflow.
- Mobile-Smoke 390px: Stufenanzeige und Kindorientierung sichtbar; kein Overflow.
- Screenshots:
  - `reports/smoke/alpha66a-wortpost-desktop.png`
  - `reports/smoke/alpha66a-wortpost-mobile.png`

## Qualitaetseinschaetzung

Das ist ein wichtiger Architektur-Schritt: Die App kann jetzt nicht nur Inhalte zeigen, sondern den Weg der Wortpost didaktisch einordnen. Fuer Schuelerinnen und Schueler im GE-Bereich ist besonders stark, dass die Orientierung kindseitig kurz bleibt und die eigentliche Entwicklungslogik in der Lehrkraftansicht bleibt.

Noch offen fuer S-Tier:

- Die Lehrkraft kann bekannte Grapheme/Silben noch nicht direkt als komfortables Steuerfeld fuer die Wortpost einstellen.
- Die Stufen erzeugen noch keine groesseren Materialpakete pro Stufe.
- Der Uebergang von Silbe zu Wort zu Satz ist sichtbar, aber noch nicht als eigene kleine Uebungsfolge pro Wort ausgebaut.

## Naechster sinnvoller Slice

Alpha 66B sollte ein Lehrkraft-Steuerfeld fuer bekannte Einheiten bauen:

1. Bekannte Grapheme und Silben kompakt auswaehlen.
2. Wortpost-Pfad sofort daraus neu berechnen.
3. Vorschau zeigen: Bildanker, Silbenbruecke, Wortaufbau oder Satzbruecke.
4. Kindmodus weiterhin extrem ruhig halten.
5. Tests fuer Auswahl, Pfadwechsel und kurze Kindtexte erweitern.
