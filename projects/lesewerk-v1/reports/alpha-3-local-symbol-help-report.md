# LeseWerk Alpha 3 – Lokale Bild- und Symbolhilfe

Stand: 2026-05-16

## Kurzdiagnose

Die bisherige Bildhilfe war im Kinderpfad im Wesentlichen ein Textplatzhalter. Für Alpha 3 wurde daraus eine lokale, rechtssichere Symbolkarten-Hilfe: Jede Aufgabe liefert nun strukturierte Symbolhilfe-Metadaten mit Label, Alt-Text und lokalem Anzeige-Cue. Es werden keine externen Bilddateien, Bilddienste oder geschützten Symbolsets verwendet.

## Umsetzung

Geändert wurden:

- `src/lesewerk-content.mjs`
  - `symbolHelp` pro Aufgabe ergänzt.
  - Jede Symbolhilfe enthält:
    - `label`
    - `altText`
    - `cue.kind = local-symbol-card`
    - lokales Unicode-/Form-Cue über `token`, `shape`, `tone`
  - Bildhilfe-Beschreibung auf lokale Symbolkarte geändert.

- `src/App.tsx`
  - Textplatzhalter im Kinderpfad durch `SymbolHelpCard` ersetzt.
  - Symbolkarte wird nur angezeigt, wenn `Bildhilfe` aktiv ist.
  - Symbolkarte nutzt `role="img"` und den fachlich neutralen Alt-Text aus den Task-Metadaten.
  - sichtbare Demo-Zeile auf `LeseWerk Alpha 3 · lokale Demo` aktualisiert.

- `src/styles.css`
  - ruhige lokale Symbolkarte gestaltet.
  - große lokale Symbolfläche, kurze Beschriftung, keine externen Assets.
  - vorhandene Tablet-/Touch-Logik bleibt erhalten.

- `tests/lesewerk-content.test.mjs`
  - Tests für Symbol-Metadaten ergänzt.
  - Tests für Alt-Text ergänzt.
  - Tests gegen externe URLs, Bilddateireferenzen und geschützte Symbolset-Begriffe ergänzt.

## Entscheidungen

- Keine echten oder fremden Bildassets in Alpha 3.
- Unicode-/Form-Cues bleiben bewusst einfache lokale Platzhalter und wirken nicht wie eine lizenzierte Symbolbibliothek.
- Bildhilfe erscheint im Kinderpfad nur bei aktivierter Hilfe, damit die Lesekarte nicht dauerhaft überladen wird.
- Die bestehende Lernlogik, Profilwahl, Hilfen, Feedbackphase und Lehreransicht wurden nicht strukturell verändert.

## Verifikation

Ausgeführt:

```bash
npm test -- --test-name-pattern="local symbol help|protected assets"
npm test
npm run build
```

Ergebnis:

- gezielter RED-Test schlug vor der Implementierung erwartungsgemäß fehl, weil `symbolHelp` noch nicht existierte.
- gezielter GREEN-Test nach Implementierung: 14/14 Tests bestanden.
- vollständiger Testlauf: 14/14 Tests bestanden.
- Build: erfolgreich.

Zusätzlicher statischer Check:

```text
src durchsucht nach: http(s), data:image, png/jpg/svg/webp/gif, METACOM, Boardmaker, Widgit, ARASAAC, protected asset
Ergebnis: keine Treffer.
```

Browsercheck:

- lokaler Build unter `http://127.0.0.1:4191/` geöffnet.
- Startansicht zeigt `LeseWerk Alpha 3 · lokale Demo`.
- `Bildhilfe` per Tastatur aktiviert.
- aktive Hilfen zeigen `Bildhilfe` und `Silbenfarben`.
- Lesekarte zeigt Symbolhilfe für `Mond` mit Alt-Text `Lokale Symbolhilfe: Mond am Himmel.`.
- Feedbackphase nach `Ich bin fertig` erreichbar.
- keine JavaScript-Fehler in der Browser-Konsole beobachtet.

Hinweis: Der Browser-Automationsklick reagierte in dieser Umgebung nicht zuverlässig auf React-Buttons; die gleiche Bedienung per Tastatur/Enter funktionierte. Das wirkt wie ein Tool-Interaktionsproblem, nicht wie ein App-Fehler, weil Fokus und Enter die Buttons korrekt auslösen.

## GE-/Datenschutzcheck

Bestanden:

- keine echten Schülernamen;
- keine Fotos;
- keine Cloud-/externen Bilddienste;
- keine geschützten Symbolsets;
- keine Diagnosen, Noten, Rankings, Timer oder Scores;
- ruhige Hilfe ohne Drucksprache.

## Rest-Risiken

- Die lokalen Symbolkarten sind Platzhalter, keine geprüfte Unterstützte-Kommunikation-Symbolbibliothek.
- Kein echter Tablet-Gerätetest, nur Build, CSS-Breakpoints und lokaler Browserpfad.
- Symbolqualität muss später pädagogisch mit echten Lernenden/Lehrkraftsituationen geprüft werden.

## Nächster kleinster Schritt

Alpha 3 Slice C sollte die Lehrer-Support-Historie nach Situation -> Hilfe -> Handlung -> Beobachtung -> nächster Schritt strukturieren, ohne Export oder personenbezogene Daten.
