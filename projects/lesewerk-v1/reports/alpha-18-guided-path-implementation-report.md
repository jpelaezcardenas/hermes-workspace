# Alpha 18 - Guided Reading Path Implementation Report

Datum: 2026-05-18
Status: Implementiert, durch Codex nach Hermes-Iteration kontrolliert

## Kurzfazit

Alpha 18 hat den Kinderbereich deutlich stärker als geführten Leseweg sichtbar gemacht. Die App zeigt nun explizit:

`Start -> Wort -> Silben -> Satz -> Mini-Geschichte -> Pause`

Damit wirkt LeseWerk weniger wie eine reine Sammlung und mehr wie eine kleine geführte Lese-App. Der Einstieg ist weiterhin teacher-led, lokal und ohne neue Speicher-, Cloud-, Login-, Export- oder Bewertungslogik.

## Geänderte Dateien

- `src/lesewerk-content.mjs`
- `src/App.tsx`
- `src/styles.css`
- `tests/lesewerk-content.test.mjs`

## Umgesetzt

### Geführte Datenkette

Neu ergänzt:

- `getGuidedReadingChain(...)`

Die Funktion verbindet vorhandenes Material zu einer exemplarischen Lesekette:

- Wort: `Ball`
- Silben: `Ball`
- Satz: `Im Garten liegt ein Ball.`
- Mini-Geschichte: `Der Ball im Garten`
- Abschluss: `Pause`

### Sichtbarer Kinderstart

Im Kinderbereich gibt es jetzt einen klaren Einstieg:

- `Wir gehen einen Leseweg.`
- `Erst Wort, dann Silben, dann Satz, dann Mini-Geschichte. Danach ist Pause.`
- Button: `Lesepfad starten`

### Sichtbare Pfadstruktur

Der Kinderbereich zeigt zusätzlich eine ruhige Pfadleiste:

- Start
- Wort
- Silben
- Satz
- Mini-Geschichte
- Pause

Außerdem wird die konkrete Beispielkette sichtbar:

`Ball -> Ball -> Im Garten liegt ein Ball. -> Der Ball im Garten -> Pause`

### Styling

Neu ergänzt:

- `.guided-entry-card`
- `.guided-path-panel`
- `.guided-step-list`
- `.guided-worked-chain`
- responsive Regeln für schmale Viewports

Das Styling ist ruhig, großflächig, tabletfreundlich und ohne Score-/Spiel-/Timerlogik.

## Tests

Neu ergänzt:

- `Alpha 18 guided reading chain connects word syllables sentence story and pause`
- `Alpha 18 app exposes one clear guided start and visible reading path`

Ergebnis:

- `npm test`: 71 bestanden, 0 fehlgeschlagen
- `npm run build`: bestanden

## Bewertung

Der wichtigste Alpha-18-Schritt ist erreicht: Die App kommuniziert nun sichtbarer, wie man von Wort zu Silben, Satz und Mini-Geschichte kommt. Das löst noch nicht alle Orientierungsfragen, aber es setzt den richtigen Produktkern.

## Grenzen

- Es ist bisher eine exemplarische Lesekette, noch kein vollständiger adaptiver Pfad für alle Wörter.
- Der Wortbestand ist transparent auswertbar, aber noch nicht vollständig als eigene Lehrerübersicht in der Oberfläche ausgebaut.
- Der echte Tablet-/Klassenraumtest bleibt weiterhin nötig.
