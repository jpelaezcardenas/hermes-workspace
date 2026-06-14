# Alpha 13 Slice C – Content Refinement Report

Datum: 2026-05-17
Status: Slice-C-Refinements umgesetzt und verifiziert

## Ziel

Diese Slice setzt kleine, gezielte Inhaltsverbesserungen aus `reports/alpha-13-content-audit.md` und `reports/alpha-13-content-test-report.md` um. Es wurden keine neuen UI-Flächen, Datenquellen oder breiten Inhaltserweiterungen ergänzt.

## Geänderte Bereiche

### 1. Level-A-Distraktoren und Prompts

Mehrere Level-A-Aufgaben wurden ruhiger und eindeutiger gefasst:

- `a-mond`, `a-bus`, `a-hut`, `a-tasse`, `a-maus`, `a-regen`
- Prompts wurden stärker auf das einfache Muster `Zeige ...` vereinheitlicht.
- Sehr nahe Distraktoren mit ähnlichem Anlaut oder ähnlicher Wortfamilie wurden durch klarer unterscheidbare Alltagswörter ersetzt.

Ziel: weniger Nebenlast durch wechselnde Promptformen und weniger Verwechslungsnähe bei Bild-Wort-Zuordnung.

### 2. Level-B-Distraktoren

Einige Silbenaufgaben behalten ihre Silbenstruktur, aber die Auswahl ist klarer getrennt:

- `b-la-ma`
- `b-li-mo`
- `b-schu-le`
- `b-fens-ter`

Ziel: Silbenlesen bleibt der Hauptfokus; falsche Optionen sind weiterhin plausible Wörter, aber weniger orthografisch nah am Zielwort.

### 3. Level-C-Satzimpulse und Distraktoren

Einzelne Level-C-Prompts wurden klarer als kurze Satz- oder Satzansatz-Impulse formuliert:

- `c-licht`
- `c-blume`
- `c-buch`
- `c-tisch`
- `c-hof`

Ziel: der Übergang vom Wortlesen zu kurzem Satzlesen ist sichtbarer, ohne die Länge oder Aufgabenanzahl zu erhöhen.

### 4. Story-Feedback

Die Slice-B-TODO-Lücke wurde geschlossen:

- Wiederholungen des Musters `Du hast ...` wurden stark reduziert.
- Mildes Lob wie `gut` wurde aus Story-Feedback entfernt.
- Feedback bleibt kurz, ruhig, textnah und nicht diagnostisch.

Gemessener Stand nach der Änderung:

- 24 Story-Feedbacks insgesamt
- 2 Feedbacks beginnen noch mit `Du hast`
- kein Feedback enthält `gut`

### 5. Story-Next-Steps

Einige sehr generische nächste Schritte wurden konkreter gemacht, z. B. bei:

- `story-brot-tasche`
- `story-hut-haken`
- `story-fenster-offen`
- `story-kind-hilft`

Ziel: nächste Schritte benennen eine kleine, nachvollziehbare Anschlussaktivität statt nur allgemein zu wiederholen.

### 6. Gebärden-Hinweise

Einzelne Hinweise wurden demonstrativer formuliert:

- `Wind`
- `Frage`
- `Ruhe`
- `Hilfe`
- `Freude`

Die Hinweise bleiben text-only und nutzen nur Körper-/Hand-/Fingerbeschreibungen ohne externe oder geschützte Symbolquellen.

## Stabilität der Inhalte

Die Inhaltsmengen bleiben stabil:

- 48 Lernaufgaben insgesamt
- 16 Aufgaben Level A
- 16 Aufgaben Level B
- 16 Aufgaben Level C
- 24 Story-Pfade insgesamt

Es wurden keine neuen Geschichten, Aufgaben, Assets, Datenquellen oder UI-Funktionen ergänzt.

## Tests und Build

Ausgeführt:

```bash
npm test
npm run build
```

Ergebnis:

- `npm test`: 63 bestanden, 0 fehlgeschlagen, 0 TODO
- `npm run build`: erfolgreich

## Bewertung

Die Änderungen sind klein und gezielt. Der größte Qualitätsgewinn liegt in der geschlossenen Feedback-Lücke aus Slice B sowie in klareren Distraktoren und Satzimpulsen. Datenschutz-, Sicherheits- und No-Protected-Asset-Grenzen bleiben unverändert eingehalten.
