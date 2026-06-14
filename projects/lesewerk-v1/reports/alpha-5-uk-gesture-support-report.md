# LeseWerk Alpha 5 – UK-/Gebärden-Hinweise

Stand: 2026-05-16

## Ziel

Slice D konkretisiert die bisher generische Gebärden-Hilfe. Die Hinweise bleiben lokal, textbasiert und als kleine Lesestütze formuliert. Es wurden keine externen Bildsets, Symbolbibliotheken oder geschützten Assets eingebunden.

## Umsetzung

Geändert wurden:

- `src/lesewerk-content.mjs`
  - `gestureHintTexts` ergänzt: konkrete kurze Handhinweise für Fokuswörter aus Wort- und Storypfad.
  - `makeGestureHint()` ergänzt und an Lernaufgaben sowie Mini-Storys gehängt.
  - Beschreibung der Hilfe `Gebärden-Hinweis` präzisiert.
  - Lehrerzusammenfassung erweitert: aktive Gebärden-Hilfe wird als verfügbare/benutzte Lesestütze dokumentiert, ohne Diagnose oder Bewertung.

- `src/App.tsx`
  - Neue Komponente `GestureHint` ergänzt.
  - Kinderpfad zeigt den konkreten Hinweis nur bei aktivem Toggle `Gebärden-Hinweis`.
  - Hinweise stehen als eigene kleine Hilfekarte neben/unter den Hilfen und nicht im Lesetext selbst.

- `src/styles.css`
  - Ruhige, kompakte Darstellung für `.gesture-hint` ergänzt.

- `tests/lesewerk-content.test.mjs`
  - Tests für konkrete Hint-Abdeckung, text-only Asset-Sicherheit, Toggle-gebundene Anzeige und Lehrerzusammenfassung ergänzt.

## Sicherheits- und Fachgrenzen

- Keine METACOM-/Boardmaker-/Widgit-/ARASAAC-Kopien.
- Keine Bilddateien, externen URLs oder Symbolbibliotheken.
- Keine Aussage, dass die Geste Lesen ersetzt.
- Die Standardnotiz lautet: „Die Geste stützt das Lesen. Der Text bleibt wichtig.“
- Lehrertext bleibt beobachtend: Hilfe verfügbar/genutzt, keine Diagnose, kein Score, kein Druck.

## TDD-Verlauf

RED:

```bash
npm test -- --test-name-pattern "gesture hints"
```

Erwartet fehlgeschlagen, weil Aufgaben/Storys noch keine konkreten `gestureHint`-Daten hatten, die UI den generischen Hinweis zeigte und die Lehrerzusammenfassung den Gebärden-Hinweis noch nicht konkret dokumentierte.

GREEN / Verifikation:

```bash
npm test -- --test-name-pattern "gesture hints|gesture hint|teacher summary records available|privacy safe|support metadata|app copy"
npm test
npm run build
```

Ergebnis:

- Gezielte Tests: 32/32 bestanden.
- `npm test`: 32/32 bestanden.
- `npm run build`: erfolgreich.

## Browser-Check

Lokal geöffnet über:

```bash
python3 -m http.server 4183 -d dist
```

Geprüft:

- Kinderpfad ohne aktiven Gebärden-Hinweis zeigt keinen konkreten Gestentext.
- Nach Aktivierung von `Gebärden-Hinweis` erscheint im Wortpfad ein konkreter Hinweis, z. B. „Zeige mit der Hand nach oben: Mond am Himmel.“
- Im Storypfad erscheint bei aktiver Hilfe ein storybezogener Hinweis, z. B. „Zeige mit beiden Händen rund: Ball rollen.“
- Nach Storyantwort zeigt der Lehrerbereich, dass der Gebärden-Hinweis verfügbar war und die Geste das Lesen stützte.

## Rest-Risiken

- Die Hinweise sind bewusst einfache Textimpulse; sie ersetzen keine fachlich geprüfte Gebärdensammlung.
- Kein vollständiger Tablet-/Narrow-Width-Durchlauf in diesem Slice, nur funktionaler Browserpfad für Wort, Story und Lehrerzusammenfassung.
- Header nennt weiterhin „Alpha 4“; das war bereits als späterer UX-/Watchdog-Punkt notiert und wurde hier nicht verändert.
