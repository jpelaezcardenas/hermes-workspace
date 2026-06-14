# LeseWerk Alpha 3 – Vorlesen/Audio-Entscheidung

Stand: 2026-05-16

## Kurzentscheidung

Alpha 3 bleibt bei einem bewussten Lehrkraft-Prompt für Vorlesen. Es wird keine Browser-Speech-Synthesis-Demo eingebaut.

## Begründung

Die aktuelle Alpha-3-Priorität ist ein ruhiger, lokaler Kinderfluss mit stabiler Bild- und Symbolhilfe. Eine Speech-Synthesis-Demo wäre zwar technisch lokal möglich, würde aber neue Bedien-, Geräte- und Qualitätsfragen öffnen, ohne dass für diese Slice ein klarer didaktischer Mehrwert belegt ist.

Für Alpha 3 ist deshalb die sichere Entscheidung:

- keine Cloud-TTS;
- keine API-Keys;
- keine entfernten Audio-Dienste;
- keine Aufnahme oder Speicherung von Stimme;
- keine personenbezogenen Audioinhalte;
- Vorlesen bleibt eine kurze, absichtliche Lehrkraft-Unterstützung.

## Umsetzung

Geändert wurden:

- `src/lesewerk-content.mjs`
  - Die Hilfe `Vorlesen` beschreibt jetzt eindeutig den Lehrkraft-Prompt: „Lehrkraft liest bei Bedarf kurz vor.“
  - Der frühere Platzhalter-/Audio-Text wurde entfernt.

- `src/App.tsx`
  - Die kindseitige Hilfenotiz lautet jetzt: „Lehrkraft liest bei Bedarf kurz vor. Danach liest du in Ruhe.“
  - Der Text wirkt damit wie eine bewusste pädagogische Entscheidung statt wie eine unfertige Audio-Funktion.

- `tests/lesewerk-content.test.mjs`
  - Tests sichern ab, dass `Vorlesen` als Lehrkraft-Prompt formuliert ist.
  - Tests verhindern Platzhalter-, Cloud-, TTS-, API-, Aufnahme- oder Speicher-Wording in der Vorlesen-Hilfe.

## Datenschutz- und GE-Check

Bestanden:

- keine externen Audio-Dienste;
- keine Cloud-Funktion;
- keine API-Keys;
- keine gespeicherten Sprachdaten;
- keine echten Schülerdaten;
- keine Diagnosen, Noten, Rankings, Scores oder Timer;
- ruhige Formulierung ohne Fehler- oder Zeitdruck.

## TDD-Nachweis

Der gezielte RED-Test wurde zuerst ergänzt und schlug erwartungsgemäß fehl, weil die bestehende UI noch `Vorlesen-Platzhalter` und `Audio` erwähnte.

Gezielter GREEN-Check danach:

```bash
npm test -- --test-name-pattern="read-aloud"
```

Ergebnis nach Umsetzung: 16/16 Tests bestanden.

## Verifikation

Ausgeführt:

```bash
npm test
npm run build
```

Ergebnis:

- `npm test`: 16/16 Tests bestanden.
- `npm run build`: erfolgreich.

## Rest-Risiken

- Es wurde bewusst keine echte Sprachausgabe umgesetzt; Alpha 3 prüft damit nicht, ob lokale Browser-Sprachausgabe einzelnen Lernenden später helfen könnte.
- Ein späterer Audio-Slice müsste neu entscheiden und dann separat absichern: lokale Browser-API, optional, deaktivierbar, keine Cloud, keine personenbezogenen Inhalte.
- Kein erneuter Browser-Interaktionstest in diesem Report; die Änderung betrifft nur kurze sichtbare Hilfetexte und wird über Tests/Build abgesichert.

## Nächster kleinster Schritt

Alpha 3 kann mit der Lehrer-Support-Historie fortfahren: Situation -> Hilfe -> Handlung -> Beobachtung -> nächster Schritt, ohne Export und ohne personenbezogene Daten.
