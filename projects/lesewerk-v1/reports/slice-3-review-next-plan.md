# LeseWerk Slice 3 – Review, Verifikation und nächste Slices

Stand: 2026-05-16

## 1. Kurzfazit

Entscheidung: **weiterbauen, aber klein und korrigierend**.

Die LeseWerk-V1-Grundlage ist als eigenständige lokale App nutzbar genug, um in den nächsten Slices weiterentwickelt zu werden. Build, Tests, Kinderpfad und Lehrerpfad sind grundsätzlich verifiziert. Es gibt keine Blockade durch den V3-Benchmark: Der Benchmark liegt mit transient freigegebenen Beobachtungen vor, ohne gespeicherte Zugangsdaten, Assets oder Schülerdaten.

Wichtig: Der nächste Schritt sollte nicht „mehr Features überall“ sein, sondern zuerst ein stärkerer Kinderabschluss mit sichtbarem Weiter-/Fertig-Moment und danach kleine Aufgabenpakete.

## 2. Geprüfte Quellen und Dateien

Geprüft wurden:

- `reports/product-spec.md`
- `reports/v3-benchmark.md`
- `reports/build-plan.md`
- `reports/slice-1-didaktik-review.md`
- `reports/slice-2-app-foundation-report.md`
- `README.md`
- `package.json`
- `src/App.tsx`
- `src/styles.css`
- `dist/index.html`

## 3. Technische Verifikation

Ausgeführt in `/Users/zondrius/hermes-workspace/projects/lesewerk-v1`:

```bash
npm test && npm run build
```

Ergebnis:

- `npm test`: erfolgreich, 4/4 Tests grün.
- `npm run build`: erfolgreich.
- Build-Ausgabe: `dist/`.

Zusätzliche Unabhängigkeitsprüfung:

```bash
grep -R "ge-lernwerkstatt\|LERNWERKSTATT KREISLAUF" -n --exclude-dir=node_modules --exclude-dir=dist .
```

Ergebnis:

- Keine Code- oder Import-Abhängigkeit zu `ge-lernwerkstatt` gefunden.
- Treffer nur in Reports/Planung als ausdrückliche Abgrenzung.

Lokaler Browsercheck:

- Server: `http://127.0.0.1:4175/`
- App öffnet vollständig.
- Keine JavaScript-Fehler in der Browser-Konsole festgestellt.
- Visuelle Prüfung: Seite geladen, lesbar, keine offensichtliche Textüberlappung im Desktop-Viewport.

Hinweis: Port `4174` war bereits belegt; für diese Verifikation wurde `4175` genutzt.

## 4. Kinderpfad geprüft

Geprüfter Pfad:

1. Startscreen „Willkommen im LeseWerk“ geladen.
2. Anonymes Profil `Profil Grün` gewählt.
3. Kinderpfad sichtbar: „Was hilft dir beim Lesen?“.
4. Unterstützungen geprüft, u. a. `Bildhilfe`, `Silbenfarben`, `Weniger Auswahl`.
5. Silbenlesen-Demo sichtbar mit Wörtern wie `Mama`, `Sofa`, `Lama`.
6. Silbenwort wird als große Lesekarte angezeigt.

Bewertung:

- Positiv: Der Pfad ist ruhig, deutschsprachig, ohne Zeitdruck, Noten, Ranking oder Schamfeedback.
- Positiv: Die Hilfen stehen nah am Lernmoment.
- Positiv: Profilwahl ist anonym und kindgerecht.
- Noch schwach: Es fehlt ein kindgerechter Abschluss-/Weiter-Moment nach dem Lesen. Aktuell bleibt die Aufgabe eher Demo als vollständiger Lernzyklus.
- Noch schwach: „Diagnostischer Einstieg“ ist fachlich korrekt vorsichtig, aber kindseitig noch stark als Hilfe-Auswahl statt als geführter Minipfad spürbar.

## 5. Lehrerpfad geprüft

Geprüfter Pfad:

1. Wechsel zu `Lehrkraft`.
2. Lehrerzusammenfassung sichtbar.
3. Anzeige enthält:
   - anonymes Profil, z. B. `Profil Grün`;
   - neutrale Beobachtung;
   - genutzte Hilfen;
   - nächsten Schritt.

Bewertung:

- Positiv: Sprache bleibt beobachtend und ressourcenorientiert.
- Positiv: Keine Diagnose, keine Note, keine Prozent-/Rankinglogik.
- Positiv: Das Profil bleibt anonym.
- Noch schwach: Die Datenqualität wird noch nicht explizit markiert, z. B. „nur Demo-Beobachtung / noch wenig Daten“.
- Noch schwach: Die Empfehlung ist plausibel, aber noch nicht sichtbar aus mehreren Aufgabenereignissen abgeleitet.

## 6. Datenschutz- und Produktgrenzen

Ergebnis: **kein Blocker gefunden**.

Geprüfte Punkte:

- Keine realen Namen.
- Keine Diagnosen.
- Keine Passwörter oder Zugangsdaten gespeichert.
- Keine Cloud, kein Login, kein Backend.
- Keine geschützten Bild-/Symbolassets.
- Lokale Speicherung nur für anonymes Demo-Profil.
- Keine Verbindung zur bestehenden GE-Lernwerkstatt im Code.
- V3-Benchmark speichert keine Zugangsdaten, keinen Code, keine Screens und keine geschützten Assets.

Risiko bleibt:

- Sobald Export, Verlauf oder mehrere Profile ausgebaut werden, braucht die App eine klarere lokale Datenschutznotiz und eine bewusste Lösch-/Zurücksetzen-Funktion.

## 7. GE-/Lesequalitätscheck

Stärken:

- ruhige, große Touchflächen;
- einfache deutsche Sprache;
- wählbare Hilfen statt Fehlerfokus;
- Silbenfarben als fachliches Kernwerkzeug;
- klare Trennung von Kinder- und Lehrerbereich;
- keine Regelschulnorm, keine Defizitlogik.

Schwächen:

- Silbenlesen ist noch sehr klein: drei Wörter und keine echte Wiederholungs-/Variationslogik.
- Es gibt noch keine basalere Variante, z. B. nur schauen/hören/zeigen statt Wort wählen.
- Es gibt noch keine symbolisch erweiterte Variante, z. B. Wort-Bild-Zuordnung oder erstes Satzlesen.
- Hilfen werden ausgewählt, aber die App macht noch wenig damit außer Anzeige/Reduktion.

## 8. Entscheidung

**Weiterbauen.**

Nicht blockieren, weil:

- Build und Tests laufen;
- ein Kinderpfad und ein Lehrerpfad existieren;
- Datenschutzgrenzen aktuell eingehalten werden;
- V3-Benchmark nicht mehr entscheidend fehlt;
- keine Abhängigkeit zu `ge-lernwerkstatt` sichtbar ist.

Aber: Der nächste Slice muss zuerst die Lernzyklus-Qualität erhöhen, nicht die App breit aufblasen.

## 9. Nächste maximal 3 kleinste Slices

### Slice 4: Kinderabschluss und Lernzyklus schließen

Ziel:

- Nach dem Lesen soll ein kindgerechter Abschluss entstehen: „Geschafft“, „Nochmal“, „Nächstes Wort“, „Hilfe hat geholfen“.

Akzeptanzkriterien:

- Kinderpfad enthält einen sichtbaren Abschluss-/Weiterbereich nach der Silbenkarte.
- Mindestens zwei Aktionen sind möglich: `Nochmal lesen` und `Nächstes Wort`.
- Feedback bleibt ohne Punkte, Timer, rot/grün-Fehlerlogik oder Scham.
- Lehrerzusammenfassung übernimmt eine neutrale Beobachtung wie „Wiederholung genutzt“ oder „Hilfe gewählt“.
- `npm test` und `npm run build` laufen grün.
- Report: `reports/slice-4-child-cycle-report.md`.

### Slice 5: Kleines Aufgabenpaket Silbenlesen A–C

Ziel:

- Aus der Demo wird ein kleines, wiederholbares Silbenpaket mit mehreren Wörtern und drei Zugangsstufen.

Akzeptanzkriterien:

- Mindestens 12 sichere Silbenwörter, alltagsnah und ohne geschützte Assets.
- Drei Zugänge dokumentiert/umgesetzt:
  - basal: schauen/hören/zeigen mit Bildplatzhalter;
  - konkret-handelnd: Silben farbig lesen und wiederholen;
  - symbolisch: Wort auswählen oder Silben verbinden.
- `Weniger Auswahl` reduziert zuverlässig auf eine kleine Auswahl.
- Keine echte Personen-, Diagnose- oder Leistungsdaten.
- `npm test` und `npm run build` laufen grün.
- Report: `reports/slice-5-syllable-pack-report.md`.

### Slice 6: Lehrerbereich mit Datenqualität und Reset

Ziel:

- Lehrerbereich vorsichtiger und praxistauglicher machen: Datenqualität, lokale Speicherung, Zurücksetzen.

Akzeptanzkriterien:

- Lehreransicht unterscheidet klar: `beobachtet`, `vermutet`, `nächster kleiner Schritt`.
- Es gibt einen Hinweis `Demo-Beobachtung / noch wenig Daten`, solange nur wenige Aktionen vorliegen.
- Lokale Demo-Daten können bewusst zurückgesetzt werden.
- Kein Export und keine Cloud in diesem Slice.
- `npm test` und `npm run build` laufen grün.
- Report: `reports/slice-6-teacher-data-quality-report.md`.

## 10. Nächster kleinster Prompt

„Arbeite in `/Users/zondrius/hermes-workspace/projects/lesewerk-v1` an Slice 4: Schließe den Kinderpfad mit einem ruhigen Abschluss-/Weiterbereich nach der Silbenkarte. Implementiere `Nochmal lesen`, `Nächstes Wort` und eine neutrale Lehrerbeobachtung wie `Wiederholung genutzt`. Keine Punkte, keine Fehlerfarben, keine neuen personenbezogenen Daten. Danach `npm test`, `npm run build`, Browsercheck und `reports/slice-4-child-cycle-report.md` schreiben.“
