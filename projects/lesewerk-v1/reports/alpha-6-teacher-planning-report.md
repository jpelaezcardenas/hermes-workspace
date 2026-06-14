# LeseWerk Alpha 6 - Lehrer-Planungsansicht

Stand: 2026-05-17

## Kurzfazit

Slice B wurde umgesetzt. Die Lehreransicht zeigt jetzt oben eine kompakte Planungsuebersicht fuer den Unterricht und verschiebt laengere Begruendungstexte in einen einklappbaren, visuell nachrangigen Bereich.

Ergebnis: bestanden. Die Formulierungen bleiben vorsichtig, tagesbezogen und unterstuetzungsorientiert. Es wurden keine Namen, Logins, Cloud-Funktionen, Scores, Diagnosen, Noten oder Rankings ergaenzt.

## Geaendert

Dateien:

- `src/App.tsx`
- `src/styles.css`
- `tests/lesewerk-content.test.mjs`
- `reports/alpha-6-teacher-planning-report.md`

Korrekturen:

- Der Lehrerbereich heisst jetzt `Planung fuer heute` statt `Foerderverlauf`.
- Der obere Block zeigt vier Unterrichtszeilen:
  - Beobachtung
  - Genutzte Hilfe
  - Heutiger Vorschlag
  - Naechster Schritt
- Die laengere Einordnung liegt in `Laengere Einordnung anzeigen` als einklappbare Detailansicht.
- Der lokale Reset bleibt direkt sichtbar und eindeutig: `Lokalen Demo-Stand zuruecksetzen`.
- CSS trennt die kompakte Planungsuebersicht und den Detailbereich sichtbar, ohne neue Datenlogik einzufuehren.
- Ein Test sichert die neue Struktur gegen versehentliche Rueckentwicklung ab.

## Verifikation

Ausgefuehrt im Projektpfad `/Users/zondrius/hermes-workspace/projects/lesewerk-v1`:

```bash
npm test
npm run build
```

Ergebnis:

- `npm test`: 33/33 Tests bestanden.
- `npm run build`: erfolgreich.

## Browser-Check

Frischer lokaler Build wurde geoeffnet ueber:

```text
http://localhost:4210/index.html?fresh=alpha6b
```

Gepruefter Pfad:

1. Profil Gruen ausgewaehlt.
2. Gebaerden-Hinweis aktiviert.
3. Weniger Auswahl aktiviert.
4. Story lesen gewaehlt.
5. `Der Ball im Garten` angezeigt.
6. Verstaendnisfrage mit `Ball` beantwortet.
7. Lehrerbereich geoeffnet.

Sichtbar in der Lehreransicht:

- Titel: `Planung fuer heute`
- kompakter Block mit `Beobachtung`, `Genutzte Hilfe`, `Heutiger Vorschlag`, `Naechster Schritt`
- Beobachtung: `Geste stuetzte das Lesen als textbasierter Handhinweis.`
- Genutzte Hilfe: `Silbenfarben, Gebaerden-Hinweis, Weniger Auswahl`
- Heutiger Vorschlag: `Heute passt vermutlich Story verstehen mit kurzer Frage.`
- Naechster Schritt: `Eine aehnliche Story mit nur einer neuen Schwierigkeit lesen.`
- einklappbare Detailzeile: `Laengere Einordnung anzeigen`
- sichtbarer Reset: `Lokalen Demo-Stand zuruecksetzen`

Browser-Konsole:

- keine JavaScript-Fehler beobachtet.

Visueller Check:

- oberer Planungsblock ist kompakt und gut lesbar;
- laengere Einordnung ist eindeutig sekundar/einklappbar;
- Reset ist sichtbar, aber nicht dominanter als die Planungsinformation;
- keine sichtbaren Textueberlappungen im geprueften Lehrerpfad.

## Datenschutz- und Sprachcheck

Bestanden:

- keine realen Schuelernamen;
- keine Logins oder Cloud-Funktionen;
- keine Scores, Noten, Rankings oder Diagnosen;
- Vorschlag bleibt mit `Heute passt vermutlich ...` tagesbezogen und vorsichtig;
- Beobachtung beschreibt sichtbare Handlung/Hilfe, keine feste Faehigkeit oder Diagnose.

## Rest-Risiken

1. Kein echter Tablet-Geraetetest, nur lokaler Browsercheck.
2. Detailbereich wurde visuell im eingeklappten Standardzustand geprueft; die Detailinhalte selbst stammen aus der bestehenden, bereits getesteten Lehrerzusammenfassung.
3. Der Header steht weiterhin auf `LeseWerk Alpha 5 · lokale Demo`; das war nicht Teil dieses Slice und wurde nicht geaendert.
