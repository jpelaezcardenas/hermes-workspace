# Ball Mini-Reise Source Map und Risikoentscheidung

Datum: 2026-05-26

## Kurzfazit

Go, aber nur als kleiner Patch. `Ball` ist in LeseWerk fachlich bereits stark vorbereitet: Es gibt Ball-Aufgaben, Ball-Stories und Story-Bridges. Was fehlt, ist die Aufnahme von `Ball` in die bestehende Word-Family-Mini-Reise-Engine, die aktuell `Mama`, `Sofa`, `Tasse` und `Lama` unterstützt.

Keine neue Engine nötig. Kein neues Asset nötig. Keine Speicherung nötig.

## Relevante Typen und UI-Stellen

In `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/src/App.tsx`:

- `WordFamilyJourneyAnchor` bei Zeile 105:
  - aktuell: `Mama | Sofa | Tasse | Lama`
  - benötigt: `Ball` ergänzen
- `MiniJourneyPrepAnchor` bei Zeile 106:
  - Ball muss hier nicht zwingend rein, weil eine Vorbereitung optional ist.
- `MiniJourneySymbolScene(...)` ab Zeile 111:
  - aktuell Spezialdarstellungen für Tasse, Sofa, Lama, sonst Mama-Fallback.
  - benötigt: kleiner Ball-Zweig oder Fallback über Mama vermeiden.
- `startWordFamilyMiniJourney(...)` ab Zeile 622:
  - kann Ball nutzen, sobald Typ und Content Ball kennen.
- Startfunktionen ab Zeile 651:
  - `startMamaFamilyMiniJourney`, `startSofaFamilyMiniJourney`, `startTasseFamilyMiniJourney`
  - eigene `startBallFamilyMiniJourney` ist optional, weil die UI über `startWordFamilyMiniJourney(card.anchorWord)` arbeitet.
- Mini-Reise-Auswahl ab ca. Zeile 1568:
  - Buttontext und Symbol-Silben sind aktuell hart für Tasse/Sofa/Lama/Mama verzweigt.
  - benötigt: Ball-Silbe `Ball` und Buttontext `Ball-Mini-Reise starten`.
- `MamaFamilyJourneyStage(...)` ab Zeile 3102:
  - Typunion muss Ball-Stationen akzeptieren.
  - `syllables`-Berechnung ab ca. Zeile 3122 braucht Ball: `['Ball']`.
  - `miniJourneyStoryChoices` ab ca. Zeile 3140 braucht Ball mit korrekter/distraktorischer Auswahl.

## Relevante Content-Stellen

In `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/src/lesewerk-content.mjs`:

- `wordFamilyPackDefinitions` ab ca. Zeile 2527:
  - hier muss `word-family-ball` ergänzt werden.
- `getStageFitLabel(...)` ab ca. Zeile 2568:
  - Ball kann Standard-Stage nutzen; optional `Wortaufbau` für Ball.
- `wordFamilyJourneyTexts` ab ca. Zeile 2600:
  - hier muss `Ball` mit Bild/Silbe/Wort/Satz/Mini-Geschichte ergänzt werden.
- `wordFamilyJourneyFallbacks` ab ca. Zeile 2700:
  - hier muss Ball-Fallbackprofil ergänzt werden.
- `miniJourneyTeacherRationaleDefinitions` ab ca. Zeile 2696:
  - hier Ball-Rationale ergänzen.
- `getMiniJourneyNextSmallStep(...)` ab ca. Zeile 2783:
  - optional Ball-spezifischer Satz: erst `b/a/l` und Wort `Ball` sichern.
- `getAvailableMiniJourneyCards(...)` ab ca. Zeile 2904:
  - sollte Ball automatisch aufnehmen, sobald Pack und JourneyText vorhanden sind.
- Export-Wrapper:
  - `getWordFamilyMiniJourney(...)`
  - `getMamaFamilyMiniJourney(...)`
  - `getSofaFamilyMiniJourney(...)`
  - `getTasseFamilyMiniJourney(...)`
  - optional `getBallFamilyMiniJourney(...)` ergänzen.

## Vorhandene Ball-Inhalte

Ball-Tasks:

- `a-ball` - Level A, Bild-Wort-Match, Prompt `Zeige Ball.`
- `c-ball` - Level C, Wort-Bild-Match, Prompt `Lies Ball. Was passt?`
- `alpha31-c-ball-story` - Satz/Story-Brücke `Der Ball rollt zum Sofa.`
- `alpha73a-a-ball` - Level A, lokale Orientierung, StoryBridge `Der Ball rollt.`

Ball-Stories:

- `story-ball-garten` - `Der Ball im Garten`
- `story-ball-teilen` - `Wir teilen den Ball`

Damit ist Ball als Mini-Reise fachlich gut geeignet.

## CSS / Symbol

In `src/styles.css` wurde keine spezifische Ball-Mini-Reise-Klasse gefunden. Es gibt bestehende Klassen für `mini-journey-symbol--mama`, `--sofa`, `--tasse`, `--lama` und generische Mini-Journey-Strukturen.

Empfehlung:

- Minimalen Ball-Symbolzweig in `MiniJourneySymbolScene` ergänzen.
- Dazu kleine CSS-Klassen:
  - `.mini-journey-symbol--ball`
  - `.mini-journey-ball-core`
  - optional `.mini-journey-ball-shine`
- Keine Bilder, keine externen Assets.

## Patch-Liste für sicheren nächsten Schritt

1. In `lesewerk-content.mjs` `word-family-ball` in `wordFamilyPackDefinitions` ergänzen.
2. In `lesewerk-content.mjs` `Ball` in `wordFamilyJourneyTexts` ergänzen:
   - Bild: `Schau den Ball an.`
   - Silbe: `Lies: Ball.`
   - Wort: `Lege oder wähle Ball.`
   - Satz: `Lies: Der Ball rollt.`
   - Mini-Geschichte: `Der Ball rollt. Was passt?`
3. In `lesewerk-content.mjs` `wordFamilyJourneyFallbacks.Ball` ergänzen.
4. In `lesewerk-content.mjs` Ball-Rationale ergänzen und optional `getBallFamilyMiniJourney(...)` exportieren.
5. In `App.tsx` `WordFamilyJourneyAnchor` um `Ball` erweitern.
6. In `App.tsx` Ball in `MiniJourneySymbolScene`, `syllables`, `miniJourneyStoryChoices`, Buttontext/Silbenkachel ergänzen.
7. In `styles.css` minimalen Ball-Symbolstil ergänzen.
8. Tests/Checks:
   - vorhandene Content-Tests laufen lassen;
   - TypeScript/Build nur, wenn lokale Toolchain stabil ist;
   - Browser-Smoke: Mama/Tasse/Ball erscheinen als Mini-Reise-Karten, keine horizontale mobile Scrollbar.

## Risikoentscheidung

Go für kleinen Patch. Risiko mittel, weil `App.tsx` groß ist und die Mini-Reise-UI mehrere harte Verzweigungen enthält. Risiko wird niedrig, wenn ausschließlich die genannten Stellen angepasst werden und keine neue UI-Engine entsteht.

No-Go für große Fusion, Deep-Link-System, automatische Diagnostik oder neue Speicherlogik.
