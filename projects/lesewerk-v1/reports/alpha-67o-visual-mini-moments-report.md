# Alpha 67O – Visuelle Mini-Momente für Micro-Prep

## Ergebnis

Alpha 67O ergänzt die bestehenden Micro-Prep-Variationen aus Alpha 67N um zwei lokal gerenderte, kindorientierte visuelle Mini-Momente:

- `listen-point`: ruhiger Hör-/Zeige-Hinweis mit CSS-Ohr, Klangwellen, Zeigepunkt und Fingerform.
- `eye-trace`: ruhige Augen-Folge-Spur mit gepunkteter ovaler Bahn, Markerpunkten und kleinem Folgehinweis.

Die Hinweise werden direkt aus `step.variation` gerendert und bleiben dekorativ (`aria-hidden="true"`), sodass der sichtbare Kinderauftrag weiterhin aus genau einem aktuellen Schritt besteht.

## Geänderte Dateien

- `src/App.tsx`
  - `MiniJourneyPrepStage` rendert jetzt `MiniJourneyPrepVariationCue` passend zu `step.variation`.
  - Neuer lokaler Helper `MiniJourneyPrepVariationCue` für `listen-point` und `eye-trace`.
- `src/styles.css`
  - Lokale CSS-Formen für Hör-/Zeige-Cue und Eye-Trace-Cue ergänzt.
  - Fokus-Text bleibt über der visuellen Spur priorisiert.
- `tests/lesewerk-content.test.mjs`
  - Neuer Alpha-67O-Test prüft Variation-Bindung, lokale Marker, CSS-Klassen, Sofa Schritt 1/2 Texte und Ausschluss von Diagnose-/Dashboard-/Storage-/Upload-Sprache.

## Verifikation

- `npm test -- --run`: bestanden, 196/196 Tests.
- `npm run build`: bestanden.
- Desktop-Smoke im Browser auf lokalem Build über `http://127.0.0.1:57501`:
  - Sofa-Vorbereitung gestartet.
  - Schritt 1 zeigt `Hör: s. Zeig auf s.` mit `data-variation="listen-point"`.
  - Nach `Weiter` zeigt Schritt 2 `Fahr mit den Augen um o.` mit `data-variation="eye-trace"`.
  - Browser-Vision bestätigte für Schritt 2 eine ruhige gepunktete Eye-Trace-Spur um den Fokus `o`, keine Dashboard-Anmutung und kein erkennbares horizontales Überlaufen.
- Mobile-Smoke:
  - Codex-Review nach Hermes-Handoff: echter separater Mobile-Viewport `390x844` wurde nachgezogen und bestanden.
  - Sofa Schritt 1 zeigte `Hör: s. Zeig auf s.` mit `data-variation="listen-point"`, CSS-Ohr und Zeigeform.
  - Sofa Schritt 2 zeigte nach `Weiter` `Fahr mit den Augen um o.` mit `data-variation="eye-trace"`, Eye-Shape und Eye-Dots.
  - Kein horizontales Überlaufen im geprüften Mobile-Viewport.
  - Keine Diagnose-/Punkte-/Timer-/Ranking-/Cloud-/Upload-/Export-Sprache im geprüften Kinderspiel.

Zusätzliche Smoke-Screenshots aus dem Codex-Review:

- `reports/smoke/alpha67o-desktop-listen-point.png`
- `reports/smoke/alpha67o-desktop-eye-trace.png`
- `reports/smoke/alpha67o-mobile-listen-point.png`
- `reports/smoke/alpha67o-mobile-eye-trace.png`

## Datenschutz und Sicherheit

- Keine Speicherung, keine Cloud-Aufrufe, keine externen Assets, keine Audioaufnahme.
- Keine neuen Wortanker eingeführt.
- Keine Diagnostik-, Ranking-, Punkte-, Timer-, Upload- oder Exportlogik ergänzt.
- Die visuellen Cues sind rein lokal aus HTML/CSS gebaut.

## Einschätzung

Stärken:
- Die beiden Prep-Variationen sind jetzt visuell unterscheidbar, ohne zusätzliche Kinderaufgaben einzuführen.
- Die Cues unterstützen Orientierung: hören/zeigen vs. mit den Augen folgen.
- Der Fokus bleibt groß, ruhig und kindnah.

Risiken/offene Punkte:
- Die CSS-Symbolik ist absichtlich generisch und lokal; sie ist kein validiertes Symbolsystem.

## Nächste empfohlene Sequenz nach 67O

1. Alpha 67P: visual polish of full mini-journey.
2. Alpha 67Q: first controlled new word family.
3. Alpha 67R: teacher learning-path editor.
