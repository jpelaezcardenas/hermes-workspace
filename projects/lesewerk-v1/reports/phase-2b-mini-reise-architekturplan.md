# Phase 2B - Mini-Reise Architekturplan

## Ampel

Yellow-Green.

## Ausgangslage

Die Mini-Reisen fuer Mama, Sofa, Tasse, Ball, Bus, Buch und Lama funktionieren als Produktidee gut: Bild, Silbe, Wort, Satz und Mini-Geschichte bilden einen kindgerechten Lesepfad. Technisch ist aber bereits sichtbar, dass jede neue Wortfamilie mehrere Stellen beruehrt:

- `src/lesewerk-content.mjs`: Wortfamilie, Mini-Reise-Funktion, Rationale, Readiness, Profil-Gating.
- `src/App.tsx`: Imports, Auswahlkarten, Stationstypen, Symbolszene, Story-Choices, Labels.
- `src/styles.css`: lokale Symbolanker und Spezialillustrationen.
- `tests/lesewerk-content.test.mjs`: Inhalt, Reihenfolge, CSS-Anker, Story-Choices, Gating.

## Risiko

Wenn weitere 20 bis 50 Woerter direkt nach dem aktuellen Muster eingebaut werden, steigt die Fehlergefahr stark: vergessene Imports, falsche Tile-Labels, uneinheitliche Story-Choices, fehlende CSS-Anker oder zu viele Inhalte im Kindmodus.

## Minimaler Refactor-Vorschlag

Noch nicht gross umbauen. Zuerst eine kleine zentrale Datenstruktur fuer neue Wortfamilien vorbereiten:

- `miniJourneyDefinitions`: pro Wortfamilie `anchorWord`, `domain`, `knownUnits`, `syllables`, `sentence`, `storyPrompt`, `correctChoice`, `distractorChoice`, `symbolClass`, `teacherRationale`, `nextSmallStep`.
- Bestehende handgebaute Funktionen bleiben zunaechst erhalten.
- Neue Wortfamilien ab Apfel sollen moeglichst aus dieser Struktur ableitbar sein.
- Erst wenn Apfel stabil ist, kann man Mama/Sofa/Tasse/Ball/Bus/Buch/Lama schrittweise in dieselbe Struktur ueberfuehren.

## Testliste fuer neue Wortfamilien

- Mini-Reise hat genau fuenf Stationen: Bild, Silbe, Wort, Satz, Mini-Geschichte.
- Keine externen Assets.
- Profil-Gating schaltet das Wort nicht zu frueh frei.
- Story-Choice hat eine richtige und eine plausible falsche Option.
- Lokales CSS-Symbol existiert.
- Lehrkraft-Rationale erklaert didaktischen Sinn und Risiko.
- Kindmodus bleibt frei von Score, Diagnose, Timer, Ranking.
- Build und Tests laufen.

## Empfehlung

Phase 2C soll Apfel als naechsten Inhalts-Slice bauen, aber noch ohne grossen Refactor. Danach Phase 2E: zentrale Mini-Reise-Definition fuer neue Wortfamilien einfuehren und erst dann groessere Wortschatzpakete skalieren.
