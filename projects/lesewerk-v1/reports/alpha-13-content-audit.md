# Alpha 13 Slice A – Didactic Content Audit

Datum: 2026-05-17
Status: Audit fertig

## Kurzfazit

Die vorhandenen Inhalte sind insgesamt GE-tauglich angelegt: kurze Alltagsszenen, klare Bildstützen, reduzierte Auswahl und ruhige Sprache sind bereits gut erkennbar. Der größte didaktische Gewinn liegt jetzt nicht in mehr Inhalt, sondern in kleinen Präzisierungen bei Wortwahl, Distraktoren, Silbenkontrolle, Feedback und den nächsten Lernschritten.

Mein Urteil für Slice B/C: Ja, die Inhalte sind konkret genug, um jetzt gezielt abgesichert und dann punktuell verfeinert zu werden.

## Überblick nach Bereich

### Level A

Stärken:
- sehr kurze Prompts;
- bekannte Alltagswörter;
- klare Bild-Wort-Zuordnung;
- reduzierte, ruhige Aufgabenform.

Risiken / kleine Schwächen:
- einzelne Distraktoren sind zu nah am Zielwort oder beginnen mit demselben Anlaut;
- einige Prompts wechseln stark im Imperativstil („Schau“, „Zeige“, „Wo ist“, „Wähle“), was die Form etwas unruhig macht;
- vereinzelte Zielwörter sind im GE-Kontext etwas abstrakter als nötig, obwohl sie noch im Rahmen bleiben.

### Level B

Stärken:
- Silbenstruktur ist durchgehend blau-rot angelegt;
- die meisten Wörter sind gut bekannt und kurz genug;
- das Niveau ist nachvollziehbar gestuft.

Risiken / kleine Schwächen:
- bei einzelnen Aufgaben passen Distraktoren zu stark in dieselbe Wortfamilie oder mit ähnlicher Anfangssilbe;
- einige Silbenfolgen sind didaktisch okay, könnten aber noch klarer auf eine einzige Strukturschwierigkeit fokussiert werden;
- die Prompts sind sprachlich noch nicht ganz einheitlich.

### Level C

Stärken:
- kurze satzähnliche Leseprompts;
- Bildbezug bleibt erhalten;
- Wahlmöglichkeiten sind meist klein und übersichtlich.

Risiken / kleine Schwächen:
- einige Prompts sind eher Stichwort-/Halbsatzform („Lies: Das ist Licht.“) und nicht überall gleich klar als Satzleseimpuls erkennbar;
- Distraktoren sind teils semantisch nah, teils orthografisch nah, aber nicht immer eindeutig die „beste falsche Wahl“;
- einzelne Items wirken eher wie Wortlesen mit Satzrahmen als wie bewusst gestufte Satzarbeit.

### Story-Cluster gesamt

Alle drei Cluster sind grundsätzlich tragfähig:
- Alltag – Dinge und Handlungen
- Schule und Klassenalltag
- Sozial und emotional

Stärken:
- kurze Alltagssituationen;
- eine Fokusfrage pro Story;
- reduzierte Antwortauswahl;
- ruhige, unterstützende Rückmeldung.

Risiken / kleine Schwächen:
- supportiveFeedback und nextStep sind oft formal sehr ähnlich und dadurch auf Dauer etwas gleichförmig;
- manche nextStep-Formulierungen sind sehr generisch („mit anderem Gegenstand wiederholen“, „noch einmal lesen“);
- mehrere Geschichten arbeiten stark mit demselben Antwortmuster („Du hast ... erkannt/fgefunden“), wodurch die Rückmeldung didaktisch noch feiner abgestuft werden könnte;
- in einzelnen Stories könnte die Frage noch enger an den eigentlichen Textkern gebunden sein.

## 10 höchste Wertigkeit: kleine Fixes

1. Level-A-Distraktorqualität verbessern
- Typ: distractor
- Ziel: Distraktoren etwas weiter vom Zielwort entfernen, wenn sie zu nah am Anlaut oder in derselben Wortfamilie liegen.
- Beispielhafte Stellen: `a-bus`, `a-hut`, `a-maus`, `a-tasse`, `a-regen`.
- Wahrscheinliche Datei/Funktion: `src/lesewerk-content.mjs` → `learningTasks` → Level A `makeTask(...)`-Einträge.
- Nutzen: klarere Bild-Wort-Entscheidung, weniger Zufall durch Anlautnähe.

2. Prompts in Level A sprachlich vereinheitlichen
- Typ: wording
- Ziel: eine ruhigere, gleichartige Promptlogik statt Wechsel zwischen „Schau“, „Zeige“, „Wo ist“, „Finde“, „Wähle“.
- Beispiele: `a-mond`, `a-ball`, `a-sonne`, `a-fenster`.
- Wahrscheinliche Datei/Funktion: `src/lesewerk-content.mjs` → `learningTasks`.
- Nutzen: mehr Wiedererkennung, weniger sprachliche Nebenlast.

3. Level-B-Silbenfolgen noch konsequenter auf Kernmuster zuschneiden
- Typ: syllable
- Ziel: pro Aufgabe möglichst genau eine Hauptschwierigkeit sichern; bei längeren Wörtern nicht zu viele neue Teilmuster gleichzeitig.
- Beispiele: `b-to-ma-te`, `b-ba-na-ne`, `b-fens-ter`.
- Wahrscheinliche Datei/Funktion: `src/lesewerk-content.mjs` → Level B `makeTask(...)`-Einträge.
- Nutzen: klarere Stufung und bessere didaktische Lesbarkeit.

4. Level-B-Distraktoren stärker trennen
- Typ: distractor
- Ziel: nicht nur ähnliche Wörter, sondern bewusst eindeutige, aber plausible Fehloptionen wählen.
- Beispiele: `b-la-ma`, `b-li-mo`, `b-schu-le`, `b-fens-ter`.
- Wahrscheinliche Datei/Funktion: `src/lesewerk-content.mjs` → Level B `options` in `learningTasks`.
- Nutzen: weniger orthografische „Verwechslungsnähe“, mehr echte Leselogik.

5. Level-C-Prompts klarer als Satz- oder Satzansatz markieren
- Typ: wording
- Ziel: einheitlicheres Satzlesen statt wechselnder Kurzformen.
- Beispiele: `c-licht`, `c-blume`, `c-buch`, `c-tisch`, `c-hof`.
- Wahrscheinliche Datei/Funktion: `src/lesewerk-content.mjs` → Level C `prompt`-Texte.
- Nutzen: besserer Übergang von Wortlesen zu Satzlesen.

6. Level-C-Distraktoren auf „meaningful distractors“ schärfen
- Typ: distractor
- Ziel: die falsche Wahl soll plausibel, aber eindeutig falsch sein; nicht zu oft nur ähnlicher Anlaut.
- Beispiele: `c-haus`, `c-maus`, `c-rose`, `c-nase`, `c-ball`.
- Wahrscheinliche Datei/Funktion: `src/lesewerk-content.mjs` → Level C `options`.
- Nutzen: stärkere Leseleistung statt bloßer Buchstabenvergleich.

7. Story-Feedback variierter und etwas spezifischer machen
- Typ: feedback
- Ziel: weniger Wiederholung derselben Muster wie „Du hast … erkannt/gefunden/verstanden.“
- Beispiele: `story-ball-garten`, `story-tasse-tisch`, `story-kind-hilft`, `story-freude-bauen`.
- Wahrscheinliche Datei/Funktion: `src/lesewerk-content.mjs` → `makeStory(...)`-Einträge, Feld `supportiveFeedback`.
- Nutzen: Rückmeldungen fühlen sich differenzierter und didaktisch sauberer an.

8. Story-Next-Step-Formulierungen konkreter machen
- Typ: next-step
- Ziel: statt allgemeiner Wiederholung eine kleine, nachvollziehbare Progression benennen.
- Beispiele: `story-brot-tasche`, `story-hut-haken`, `story-fenster-offen`, `story-kind-fragt`.
- Wahrscheinliche Datei/Funktion: `src/lesewerk-content.mjs` → `makeStory(...)`-Einträge, Feld `nextStep`.
- Nutzen: der nächste Lernschritt wird für Lehrkraft und Kind sichtbarer.

9. Einzelne Story-Fragen enger an den Textkern binden
- Typ: wording
- Ziel: Fragen so formulieren, dass die Antwort direkt und sicher aus dem Text ableitbar bleibt.
- Beispiele: `story-freude-buch` („Was bekommt das Kind?“ ist gut, könnte aber noch textnäher werden), `story-freude-bauen`, `story-ruhig-warten`.
- Wahrscheinliche Datei/Funktion: `src/lesewerk-content.mjs` → `comprehensionPrompt`.
- Nutzen: bessere Verstehenssicherung, weniger Interpretationsspielraum.

10. Gebärden-Hinweise bei einigen Wörtern noch demonstrativer formulieren
- Typ: gesture-hint
- Ziel: die Geste soll noch klarer als mit dem Körper demonstrierbare Hilfsgeste lesbar sein.
- Beispiele: `Hilfe`, `Ruhe`, `Frage`, `Freude`, `Wind`.
- Wahrscheinliche Datei/Funktion: `src/lesewerk-content.mjs` → `gestureHintTexts` in `makeGestureHint(...)`.
- Nutzen: bessere Lehrkraft-Umsetzbarkeit und mehr Konsistenz zwischen Text und körperlicher Demonstration.

11. Story-Clustern einheitlichere Mini-Sprachmuster geben
- Typ: wording
- Ziel: innerhalb eines Clusters ähnliche Satzrhythmik und ähnliche Fragetypen nutzen.
- Beispiele: Cluster `Alltag – Dinge und Handlungen` und `Schule und Klassenalltag`.
- Wahrscheinliche Datei/Funktion: `src/lesewerk-content.mjs` → gesamte `storyPaths`-Liste.
- Nutzen: Wiederholung wird leichter, ohne langweilig zu werden.

12. Manche Hilfetexte im Aufgabenbereich noch etwas kindgerechter anpassen
- Typ: feedback
- Ziel: die ruhige, unterstützende Tonlage auf Aufgabenebene noch konsequenter machen.
- Beispiele: Level A/C-Prompts und die zugehörigen Supporttexte über `getStudentTaskLabel`, `normalizeSupportState` und `supportOptions`.
- Wahrscheinliche Datei/Funktion: `src/lesewerk-content.mjs` → `supportOptions`, `normalizeSupportState`, `getStudentTaskLabel`.
- Nutzen: einheitlicher Gesamteindruck zwischen Aufgaben, Hilfe und Rückmeldung.

## Priorisierung für Slice B/C

Wenn nur 8 Fixes umgesetzt werden sollen, würde ich diese Reihenfolge nehmen:

1. Level-A-Distraktoren schärfen
2. Level-B-Distraktoren schärfen
3. Level-B-Silbenstufung präzisieren
4. Level-C-Prompts vereinheitlichen
5. Story-Feedback variieren
6. Story-Next-Step konkreter machen
7. Gebärden-Hinweise demonstrativer formulieren
8. Story-Fragen enger an den Textkern binden

## Bewertungsnotiz für Slice B/C

Die Inhalte sind nicht „falsch“, sondern bereits brauchbar. Die nächsten Verbesserungen sollten deshalb klein, gezielt und sammelbar sein. Der größte Qualitätsgewinn liegt in konsistenteren Entscheidungen über Wortwahl, Distraktoren und Feedback-Ton, nicht in größerer inhaltlicher Breite.

## Datei-/Funktionsbereiche mit höchster Relevanz

- `src/lesewerk-content.mjs`
  - `learningTasks` für Level A/B/C
  - `storyPaths` für alle drei Story-Cluster
  - `makeTask(...)`
  - `makeStory(...)`
  - `gestureHintTexts` / `makeGestureHint(...)`
  - `supportOptions`
  - `normalizeSupportState(...)`
  - `getStudentTaskLabel(...)`
  - `getDailyPathChoices(...)` / `getDailyReadingPath(...)` nur indirekt, falls Auswahlkürzungen später didaktisch mitbetroffen sind

- `tests/lesewerk-content.test.mjs`
  - hier später Tests ergänzen, die die kleineren Qualitätsregeln absichern

## Schlussurteil

Die vorhandenen Inhalte sind als Grundlage gut genug für die nächsten kleinen Qualitätsrunden. Für Slice B/C lohnt sich jetzt vor allem eine präzise, kleine Nachsteuerung – keine Erweiterung, sondern bessere Fassung der vorhandenen Aufgaben und Stories.
