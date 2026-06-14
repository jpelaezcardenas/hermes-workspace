# Mega Expansion Slice B - Architektur Source Map

Stand: 2026-05-26
Modus: Bericht-/Analysemodus, keine Codeaenderungen an App-Logik.
Projektpfad: `/Users/zondrius/hermes-workspace/projects/lesewerk-v1`

## Kurzdiagnose

Die Mini-Reisen sind aktuell funktionsfaehig, aber neue Reisen muessen an mehreren Stellen synchron gepflegt werden:

- Inhaltsdaten und Gating in `src/lesewerk-content.mjs`.
- Start-/Zustandslogik, Symbolauswahl und Story-Auswahl in `src/App.tsx`.
- Lokale CSS-Symbolik und responsive Spielraum-Regeln in `src/styles.css`.
- Regex-/Daten-Gates in `tests/lesewerk-content.test.mjs`.

Das bestehende System schuetzt Mama, Sofa, Tasse, Ball und Lama bereits mit vielen Tests. Das groesste technische Risiko fuer Bus/Buch/Apfel ist nicht die einzelne Inhaltsdefinition, sondern Drift zwischen mehrfach duplizierten Ankerwort-Maps in Content, UI und CSS.

## Source Map

### 1. `src/lesewerk-content.mjs`

Wichtige Stellen:

- `wordFamilyPackDefinitions` ca. Zeile 2523-2565
  - Registriert aktuell Mama, Sofa, Tasse, Ball, Lama.
  - Enthaelt `id`, `title`, `anchorWord`, `requiredGraphemes`, `requiredSyllables`, optional `requiresSentenceReadiness`, und `preferredTaskIds`.
  - Das ist der zentrale Gating-Einstieg fuer Materialpakete und Selector-Karten.

- `materialStepOrder` ca. Zeile 2567
  - Globale Reihenfolge: `Bild`, `Silbe`, `Wort`, `Satz`, `Mini-Geschichte`.
  - Diese Reihenfolge wird fuer Materialpakete, Journey-Erzeugung und Tests vorausgesetzt.

- `hasKnownUnits`, `getStageFitLabel`, `buildWordFamilyMaterialSteps` ca. Zeile 2569-2619
  - Prueft bekannte Grapheme/Silben.
  - Baut die sichtbaren Materialschritte aus Tasks.
  - Achtung: Satz und Mini-Geschichte haengen teilweise an Readiness und `storyBridge.shortText`.

- `getProfileWordFamilyMaterialPacks` ca. Zeile 2621-2662
  - Filtert nach Gating, sammelt bevorzugte Tasks und erzeugt `taskRefs`.
  - Gibt maximal `maxPacks` zurueck.
  - Neue Mini-Reisen muessen hier nicht separat verdrahtet werden, wenn `wordFamilyPackDefinitions` korrekt erweitert wird.

- `wordFamilyJourneyTexts` ca. Zeile 2664-2700
  - Enthalten pro Ankerwort und Schritt die Kind-Prompts, Lehrkraft-Hinweise und Erfolgstexte.
  - Dupliziert Satz-/Story-Semantik, die auch in App.tsx fuer Story-Auswahl und Satzdarstellung nochmal vorkommt.

- `wordFamilyJourneyFallbacks` ca. Zeile 2702-2708
  - Fallback-Profile und Fallback-Task fuer direkt spielbare Reise-Erzeugung.
  - Muss bei jedem neuen Ankerwort mitgepflegt werden, sonst faellt `getPlayableWordFamilyJourney` auf Mama zurueck oder liefert leere Reisen.

- `miniJourneyTeacherRationaleDefinitions` ca. Zeile 2710-2751
  - Lehrkraft-Rationale je Reise.
  - Neue Reise braucht hier eine kurze, sichere Begruendung.

- `getPlayableWordFamilyJourney` ca. Zeile 2770-2801
  - Baut die fuenf Stationen fuer Kindermodus.
  - Verlaesst sich auf `wordFamilyJourneyTexts`, `wordFamilyJourneyFallbacks`, Materialpacks und `materialStepOrder`.

- `getMiniJourneyReadinessOverview`, `getMiniJourneyPrepSequence`, `getMiniJourneyPrepActions`, `getAvailableMiniJourneyCards` ca. Zeile 2818-2940
  - Lehrkraft-Readiness, Vorbereitungsschritte und Selector-Karten.
  - Neue Reisen erscheinen im Selector nur, wenn Definitionen und Gating zusammenpassen.
  - Prep existiert aktuell nur fuer Sofa, Tasse, Lama. Fuer Bus/Buch/Apfel muss bewusst entschieden werden: direkt `ready`, mit Prep, oder erstmal `later`.

### 2. `src/App.tsx`

Wichtige Stellen:

- Typen ca. Zeile 100-108
  - `WordFamilyJourneyAnchor = 'Mama' | 'Sofa' | 'Tasse' | 'Ball' | 'Lama'`.
  - `MiniJourneyPrepAnchor = 'Sofa' | 'Tasse' | 'Lama'`.
  - Neue Reisen benoetigen Type-Erweiterung. Ohne diese Erweiterung bleibt UI/Story-Auswahl nicht typsicher.

- `MiniJourneySymbolScene` ca. Zeile 112-165
  - Lokale CSS-Symbole fuer Tasse, Ball, Sofa, Lama, Mama.
  - Neue Anker benoetigen hier ein lokales Symbol aus CSS/HTML-Spans, keine externen Bilder.

- State und Derived Data ca. Zeile 213-353
  - `activeWordFamilyJourneyAnchor`, `availableMiniJourneyCards`, `miniJourneyReadinessOverview`, `miniJourneyPrepActions`, `activeWordFamilyMiniJourney`.
  - Neue Reisen laufen prinzipiell ueber dieselbe aktive Reise, wenn Typen und Content-Daten erweitert sind.

- Startlogik ca. Zeile 632-671
  - `startWordFamilyMiniJourney(anchorWord)` ist generisch.
  - Wrapper existieren nur fuer Mama/Sofa/Tasse; sie werden aktuell kaum benoetigt, weil der Selector generisch `startWordFamilyMiniJourney(card.anchorWord)` nutzt.

- Fokus-Shell ca. Zeile 1097-1119
  - Gemeinsame Shell fuer Spielraeume.
  - Mini-Reise ist schon generisch ueber `activeWordFamilyJourneyTitle`.

- Teacher Selector ca. Zeile 1579-1653
  - Rendert `availableMiniJourneyCards`.
  - Aber Symboltile/Silbenlogik ist mehrfach hart codiert:
    - Ball: `Ball`
    - Tasse: `Tas`/`se`
    - Sofa: `So`/`fa`
    - Lama: `La`/`ma`
    - sonst Mama: `Ma`/`ma`
  - Neue Reisen wuerden ohne Anpassung visuell als Mama-Fallback erscheinen.

- `MamaFamilyJourneyStage` ca. Zeile 3123-3288
  - Trotz Name ist die Komponente inzwischen generisch fuer mehrere Anker.
  - Hart codierte Stellen:
    - `syllables`-Ternary fuer Ball/Tasse/Sofa/Lama/Mama.
    - `miniJourneyStoryChoices` fuer correct/distractor je Ankerwort.
    - CSS-Klassen `mini-journey-focus-symbol--${anchorWord}` und Symbolszene.
  - Die fuenf Schritte, Satzdarstellung, Story-Verstehensszene und Controls sind bereits wiederverwendbar.

- `FinishScreen` ca. Zeile 3290-3302
  - Abschluss ist fuer Mini-Reisen generisch genug.

### 3. `src/styles.css`

Wichtige Stellen:

- Mini-Journey Spielraum ca. Zeile 4432 ff.
  - `.mini-journey-play-scene`, `.mini-journey-premium-stage`, `.mini-journey-orientation-card`, `.mini-journey-scene-panel`, `.mini-journey-current-object`.
  - Diese Basis kann fuer neue Reisen unveraendert bleiben.

- Symbol-/Fokusvarianten ca. Zeile 4560 ff.
  - `.mini-journey-focus-symbol`, `.mini-journey-focus-symbol--sofa`, `--tasse`; Ball/Lama werden ueber andere Symbolregeln weiter unten bzw. im Selector abgedeckt.
  - Neue Reise braucht nur sehr kleine, lokale CSS-Variante, wenn Farbe/Form abweichen soll.

- Satz-/Story-Szenen ca. Zeile 4625 ff.
  - `.mini-journey-sentence-scene`, `.mini-journey-comprehension-scene`, `.mini-journey-comprehension-card`.
  - Bereits generisch; neue Reise braucht vor allem Symbolklassen, nicht neue Layout-Struktur.

- Responsive Regeln
  - Tests erwarten `@media (max-width: 560px)` und stabile einspaltige Layouts fuer enge Breiten.
  - Neue CSS sollte unter bestehende Mini-Journey-Abschnitte und vorhandene Breakpoints fallen, nicht neue Layout-Systeme einfuehren.

### 4. `tests/lesewerk-content.test.mjs`

Wichtige Gates:

- Alpha 67A-67I: Materialpacks, Mama/Sofa/Tasse Journey, Selector, Source-Wiring.
- Alpha 67Q/69C: Lama-Gating, Lama-Reise und Prep.
- Alpha 68A-68D: generischer Kindermodus, fuenf Schritte, Satzlayer, Mini-Geschichte mit zwei Auswahlkarten.
- Alpha 69B/69C: Premium-Qualitaet fuer Tasse/Lama.
- Alpha 71/72: Objektfamilie darf nicht brechen.
- Alpha 73A: kontrollierter Schuelerwortschatz, lokale Domains, Complexity, keine externen Assets.

Diese Tests sind fuer Expansion wertvoll, aber stark source-text/regex-basiert. Bei kleinen Content-Erweiterungen sind sie gute Gates; bei groesserem Refactor wuerden sie viele legitime Strukturveraenderungen blockieren. Deshalb: erst kleine Hilfsstruktur einfuehren und Tests gezielt ergaenzen, nicht grosse Umbenennung.

## Wo Daten doppelt sind

1. Ankerwort-Liste
   - `wordFamilyPackDefinitions` in `lesewerk-content.mjs`.
   - `wordFamilyJourneyTexts` in `lesewerk-content.mjs`.
   - `wordFamilyJourneyFallbacks` in `lesewerk-content.mjs`.
   - `miniJourneyTeacherRationaleDefinitions` in `lesewerk-content.mjs`.
   - `WordFamilyJourneyAnchor` in `App.tsx`.
   - `miniJourneyStoryChoices` in `MamaFamilyJourneyStage`.
   - Symbol-/Silben-Ternaries in Selector und Stage.

2. Silben/Satz/Story
   - Required syllables im Pack.
   - Step-Texte in `wordFamilyJourneyTexts`.
   - UI-Silben fuer Symboltile in `App.tsx`.
   - Story correct/distractor in `App.tsx`.

3. Symbolik
   - `MiniJourneySymbolScene`.
   - Selector-Symbolblock.
   - CSS-Klassen pro Symbol.
   - Stage-Fokusklassen.

4. Readiness und Prep
   - Pack-Gating ueber required units.
   - ReadinessOverview-Statuslogik.
   - PrepDefinitions separat pro Anchor.
   - Teacher-Rationale nochmal als eigener Textblock.

## Minimal sichere Hilfsstruktur

Kein grosser Refactor. Der kleinste sichere Architektur-Slice waere eine zentrale, rein lokale Registry in `src/lesewerk-content.mjs`, z.B. konzeptionell:

```js
const wordFamilyJourneyDefinitions = {
  Mama: {
    syllableTiles: ['Ma', 'ma'],
    pack: { ... },
    journeyTexts: { Bild: ..., Silbe: ..., Wort: ..., Satz: ..., 'Mini-Geschichte': ... },
    fallbackProfile: { ... },
    storyChoice: {
      correct: { text: 'Mama ist da.', symbol: 'Mama' },
      distractor: { text: 'Das Sofa ist da.', symbol: 'Sofa' },
    },
    teacherRationale: { ... },
    symbolKind: 'mama',
  },
};
```

Wichtig: Nicht sofort alle alten Strukturen loeschen. Besser zuerst ableitende Helper einfuehren:

- `getWordFamilyJourneyDefinition(anchorWord)`
- `getWordFamilyJourneySyllableTiles(anchorWord)`
- `getWordFamilyStoryChoices(anchorWord)`
- optional `getWordFamilySymbolKind(anchorWord)`

Dann App.tsx an zwei kleinen Duplikationsstellen auf diese Getter umstellen:

- Selector-Silben/Symbol-Mapping.
- `MamaFamilyJourneyStage`-Syllables und `miniJourneyStoryChoices`.

Die bestehenden Arrays koennen im ersten Slice noch aus der Registry generiert oder parallel bestehen bleiben. Erst nach gruenen Tests sollte man alte Duplikate entfernen.

## Was nicht automatisiert werden darf

- Keine automatische Freigabe neuer Woerter in den Kindermodus nur aufgrund vorhandener Grapheme. GE-Eignung, Handlungsnaehe und Verwechslungsrisiko brauchen menschliche Pruefung.
- Keine externen Bild-/Symbolquellen, keine generierten Asset-URLs, keine geschuetzten Symbolsysteme.
- Keine automatische Story-Distractor-Auswahl ohne didaktische Pruefung. Falscher Distractor kann zu schwer, zu aehnlich oder semantisch verwirrend sein.
- Keine Persistenz, kein Tracking, keine Export-/Cloud-Funktion fuer Kinderdaten.
- Keine neue Reise ohne lokale Tests fuer Gating, fuenf Schritte, zwei Storykarten, verbotene Begriffe und bestehende Familien.

## Empfohlener kleinster Code-Slice nach diesem Bericht

Slice B1: Registry-Getter ohne sichtbare Funktionsaenderung.

Ziel:

1. In `src/lesewerk-content.mjs` kleine Getter fuer vorhandene Anker ergaenzen:
   - `getWordFamilyJourneySyllableTiles(anchorWord)`
   - `getWordFamilyStoryChoices(anchorWord)`
   - optional `getWordFamilySymbolKind(anchorWord)`
2. In `src/App.tsx` nur die zwei hart codierten Maps ersetzen:
   - Selector-Silbenanzeige.
   - `MamaFamilyJourneyStage` Syllables + Story Choices.
3. Keine neue Reise in B1.
4. Tests ergaenzen, die belegen:
   - Mama/Sofa/Tasse/Ball/Lama geben unveraenderte SyllableTiles aus.
   - StoryChoices bleiben unveraendert und enthalten maximal zwei Karten.
   - `getAvailableMiniJourneyCards` fuer bestehende Profile bleibt unveraendert.

Warum dieser Slice:

- Minimiert Risiko, weil keine neue didaktische Entscheidung eingefuehrt wird.
- Reduziert genau die Duplikation, die Bus/Buch/Apfel fehleranfaellig machen wuerde.
- Erhaelt bestehende App-Struktur, CSS und Tests.

Danach Slice C1: genau zwei neue Reisen, nicht drei.

Empfohlene Reihenfolge aus technischer Sicht:

1. `Bus` als Spiel/Orientierung mit sehr kurzer Wortform und vorhandener Alltagsnaehe.
2. `Buch` als Schule/Material, wenn Graphem-/Ch-Gating bewusst lehrkraftgefuehrt bleibt.
3. `Apfel` erst danach, weil Silben-/Lautstruktur und Bild-/Essenskontext etwas mehr Pruefung brauchen.

## Test-Gates fuer jede neue Reise

Pflicht vor Abschluss eines Code-Slices:

1. Daten-Gates
   - Reise erscheint nur bei passenden knownGraphemes/knownSyllables.
   - Ohne notwendige Einheit bleibt sie aus `getAvailableMiniJourneyCards` draussen.
   - `getWordFamilyMiniJourney(...).length === 5`.
   - Stationen exakt: `Bild`, `Silbe`, `Wort`, `Satz`, `Mini-Geschichte`.

2. UI-Source-Gates
   - Selector zeigt lokale Symbolanker und passende SyllableTiles.
   - Kindermodus enthaelt keine Selector-/Dashboard-/Roadmap-Texte.
   - Story-Auswahl hat maximal zwei Karten.

3. Sicherheits-Gates
   - Keine Begriffe: Score, Ranking, Punkte, Timer, Note, Diagnose, falsch, Fehler.
   - Keine externen Medien: `url(`, `http`, `data:image`, `.png`, `.jpg`, `.svg`, `.webp`, `.gif`, Metacom, PCS, Boardmaker, Widgit, ARASAAC.
   - Kein `localStorage`, `sessionStorage`, `fetch(` in Journey-Daten oder Kindermodus-Abschnitten.

4. Regressions-Gates
   - Mama/Sofa/Tasse/Ball/Lama bleiben spielbar.
   - Objektfamilie Sofa/Tisch/Tasse/Teller bleibt unveraendert.
   - Alpha 73A Schuelerwortschatz-Gates bleiben gruen.

5. Build/Runtime
   - `npm test`
   - `npm run build`
   - Optional Browser-Smoke auf 390px: Lehrkraftbereich oeffnen, Reise starten, Weiter/Hilfe/Fertig pruefen, kein Quer-Scroll.

## Konkrete naechste Empfehlung

Nicht direkt Bus/Buch/Apfel implementieren. Zuerst B1 als Mini-Refactor mit unveraendertem Verhalten: Journey-Syllables und StoryChoices aus einer lokalen Content-Registry/Getter-Struktur lesen. Wenn dieser Slice gruen ist, kann Slice C1 zwei neue Reisen mit deutlich weniger UI-Duplikation aufnehmen.

Damit bleibt das Ziel erreichbar: neue Mini-Reisen wiederholbar ergaenzen, ohne Mama/Sofa/Tasse/Ball/Lama oder die Objektfamilie zu gefaehrden.
