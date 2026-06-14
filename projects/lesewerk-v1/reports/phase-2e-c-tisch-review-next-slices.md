# Phase 2E-C - Tisch Review und nächste Slices

## Kurzfazit

Ampel: GRÜN mit Beobachtungspunkt.

Die Tisch-Mini-Reise erfüllt das Phase-2E-Ziel: Sie ist lokal, profile-gated, als fünfteilige Mini-Reise vorhanden und hält das `ch`-Risiko sichtbar lehrkraftgeführt. Tests und Build sind grün. Der wichtigste offene Punkt ist kein harter Fehler, sondern Qualitätsarbeit: Die Tisch-Reise sollte vor weiterem Content-Ausbau einmal im echten Browser-/Tablet-Kindfluss sichtbar geprüft werden, weil die bisherige Evidenz überwiegend aus Unit-/Source-Checks und direktem Inhaltscheck kommt.

## Geprüfte Quellen

- Ziel: `reports/phase-2e-execute-goal-2026-05-26.md`
- Spec: `reports/phase-2e-a-tisch-mini-spec.md`
- Code-Handoff: `reports/phase-2e-b-tisch-code-report.md`
- Inhalt/Logik: `src/lesewerk-content.mjs`
- UI-Einbindung: `src/App.tsx`
- Symbolik/Styling: `src/styles.css`
- Tests: `tests/lesewerk-content.test.mjs`

## Verifikation

- `npm test -- --run` bestanden: 232/232 Tests grün.
- `npm run build` bestanden.
- Direkter Node-Inhaltscheck:
  - Profil ohne `t/i/s/ch/tisch` zeigt keine Tisch-Karte.
  - Profil mit `t`, `i`, `s`, `ch` und `tisch` zeigt `Tisch` als verfügbare Mini-Reise.
  - Stationen sind exakt: Bild → Silbe → Wort → Satz → Mini-Geschichte.
  - Kind-Prompts sind:
    - `Schau den Tisch an.`
    - `Lies: Tisch.`
    - `Lege oder wähle Tisch.`
    - `Lies: Der Tisch ist da.`
    - `Der Tisch ist da. Was passt?`
- Source-/Test-Evidenz:
  - Tests prüfen Profile-Gating, fünf lokale Stationen, pressure-free Text, lokale CSS-Symbolik und keine geschützten/externe Asset-Hinweise.
  - `src/styles.css` enthält lokale Tisch-Symbolteile: `.mini-journey-table-top`, `.mini-journey-table-leg`.

## Ampelbewertung

### 1. Tests und Build

Ampel: GRÜN

Bewertung:
- Testbestand ist sauber: 232/232.
- Build ist sauber.
- Tisch-spezifische Tests sind vorhanden und prüfen mehr als nur Existenz: Gating, Reihenfolge, Prompts, Druckfreiheit, Asset-Sicherheit und UI-Symbolik.

Beobachtung:
- Die Testabdeckung ist stark für Daten-/Source-Checks. Ein dokumentierter echter Browser-Kindfluss für Tisch wäre als nächste Absicherung sinnvoll.

### 2. Kindorientierung

Ampel: GRÜN mit kleiner Vorsicht

Stärken:
- Die Prompts sind kurz, ruhig und handlungsnah.
- Die Reise folgt einer nachvollziehbaren Steigerung: anschauen, lesen, wählen, Satz, Mini-Geschichte.
- Keine Punkte, Uhr, Ranking, Diagnose oder Fehlerdruck in den geprüften Tisch-Texten.
- `Tisch` ist im Klassenraum gut zeigbar und unterstützt reale Gegenstandsbezüge.

Vorsicht:
- `Tisch` ist wegen `ch` nicht als frühestes freies Kind-Wort geeignet. Die Umsetzung berücksichtigt das, aber die spätere Nutzung muss lehrkraftgeführt bleiben.
- Die Mini-Geschichte `Der Tisch ist da. Was passt?` ist ruhig, aber noch sehr generisch. Sie ist sicher, aber nicht maximal bildhaft.

### 3. Profil-Gating

Ampel: GRÜN

Bewertung:
- Tisch wird über `t`, `i`, `s`, `ch` und `tisch` freigegeben.
- Ohne diese Einheiten erscheint die Tisch-Karte nicht.
- Readiness-Übersicht nennt die benötigten Einheiten sichtbar: `t · i · s · ch · tisch`.
- Das Risiko wird nicht in den Kindmodus gedrückt, sondern über Lehrkraftlogik kontrolliert.

### 4. Tisch-/ch-Risiko

Ampel: GRÜN mit Beobachtungspunkt

Stärken:
- `ch` wird nicht vereinfacht oder aus dem Wort entfernt.
- Lehrkraft-Hinweise benennen: `Tisch als Wortmuster lesen; ch bewusst gemeinsam führen.`
- Lehrkraft-Rationale nennt `T + I + S + ch, tisch` und `ch bleibt lehrkraftgeführt`.

Beobachtung:
- Es gibt noch keine eigene kleine `Tisch`-Vorbereitung wie bei Sofa/Tasse/Lama. Für spätere Qualität wäre ein Mikro-Prep-Slice sinnvoll: `t`, `i`, `s`, `ch`, `tisch` als lehrkraftgeführte Vorbereitung, ohne das Wort zu drillen.

### 5. Lokale Symbolik

Ampel: GRÜN

Bewertung:
- Tisch wird als lokales CSS-Symbol umgesetzt: Tischplatte plus Beine.
- Keine externen Bildquellen nötig.
- Keine Hinweise auf METACOM, ARASAAC, Boardmaker, Widgit oder geschützte Platzhalter im geprüften Tisch-UI-/CSS-Ausschnitt.

Beobachtung:
- Die Symbolik ist funktional und sicher. Ob sie für Kinder sofort eindeutig genug als Tisch wirkt, sollte visuell im Browser/Tablet geprüft werden.

### 6. Keine verbotenen Assets / kein Pressure-Wording

Ampel: GRÜN

Bewertung:
- Tisch-spezifische Tests prüfen gegen geschützte Asset-Begriffe und externe Bildformate/URLs.
- Geprüfte Kindtexte enthalten keine Drucksprache wie Score, Timer, Ranking, Diagnose, Bewertung oder Fehler-Fokus.
- Die App bleibt lokal und anonym; keine Schülerdaten, keine Fotos, keine Cloud.

## Konkrete Gesamtbewertung

Die Phase 2E-B ist als Code-Slice gelungen. Tisch ist fachlich plausibel, technisch sauber integriert und didaktisch vorsichtig genug. Besonders stark ist, dass `ch` nicht verschwiegen wird, sondern sichtbar lehrkraftgeführt bleibt. Der Slice sollte als stabiler Objektfamilien-Ausbau gelten.

Nicht überziehen: Tisch ist noch kein Beweis dafür, dass beliebige weitere Wörter einfach skaliert werden sollten. Die Qualität kommt gerade daher, dass der Slice klein, sichtbar und profile-gated blieb. Der nächste Schritt sollte deshalb nicht Masse sein, sondern eine kurze Browser-/Tablet-Absicherung und danach ein weiterer sehr kontrollierter Inhaltsslice.

## Nächste 3 beste Slices

### Slice 1: Phase 2F-A - Tisch Browser-/Tablet-Kindfluss-Smoke

Ziel:
- Tisch-Reise im echten UI durchspielen: Karte sichtbar, Start, fünf Stationen, Feedback/Weiter, Mini-Geschichte, schmale Breite.

Akzeptanzkriterien:
- Lokaler Build/Preview oder `dist/`-Server lädt.
- Tisch-Karte erscheint nur mit passendem Profil oder kontrolliertem Fallback.
- Startbutton führt sichtbar in die Tisch-Reise.
- Alle fünf Stationen sind im Kindmodus lesbar, ruhig und ohne Textüberlauf.
- 390px- oder Tablet-Smoke dokumentiert: keine abgeschnittenen Hauptaktionen, Touchflächen ausreichend groß.
- Report unter `reports/phase-2f-a-tisch-browser-smoke.md`.

Warum zuerst:
- Das ist der fehlende Evidenzbaustein, bevor neue Inhalte gebaut werden.

### Slice 2: Phase 2F-B - Tisch Mikro-Prep für `t/i/s/ch/tisch`

Ziel:
- Eine kleine lehrkraftgeführte Vorbereitung ergänzen, analog zu vorhandenen Micro-Prep-Ideen, aber ohne Drill und ohne Kinddruck.

Mögliche Schritte:
- `Hör/zeige: t.`
- `Fahr mit den Augen: i.`
- `Zeige: s.`
- `Schau: ch bleibt zusammen.`
- `Lies gemeinsam: Tisch.`

Akzeptanzkriterien:
- Prep bleibt teacher-facing bzw. klar lehrkraftgeführt.
- `ch` wird als Wortmuster geführt, nicht isoliert abgeprüft.
- Kein Score, keine Uhr, keine Fehlerlogik.
- Tests prüfen Gating, Textsicherheit und Druckfreiheit.
- Report unter `reports/phase-2f-b-tisch-micro-prep.md`.

Warum danach:
- Es adressiert das einzige echte didaktische Risiko aus Phase 2E.

### Slice 3: Phase 2G-A - Nächster Objekt-/Essensanker `Brot` als Mini-Spec, noch nicht Code

Ziel:
- Vor neuem Code prüfen, ob `Brot` der nächste beste Ausbau ist oder ob `Heft`/`Keks` im aktuellen Lernsystem sinnvoller wäre.

Bewertungshypothese:
- `Brot` ist als nächster Slice wahrscheinlich stark, weil es konkret, alltagsnah und gut zeigbar ist. Es sollte aber nicht nur als Tisch-Distraktor auftauchen, sondern eine eigene kleine Essens-/Pausenlogik bekommen.

Akzeptanzkriterien:
- Kurzer Spec mit Entscheidung: Brot vs. Keks vs. Heft.
- Gating, Satzidee, Distraktoren, lokale Symbolidee, Risiken.
- Keine Codeänderung im Spec-Slice.
- Report unter `reports/phase-2g-a-next-word-mini-spec.md`.

Warum als dritter Schritt:
- Erst Evidenz und Risikoabsicherung für Tisch, dann kontrollierte nächste Inhaltsentscheidung.

## Nicht als nächstes tun

- Nicht sofort mehrere neue Wörter einbauen.
- Nicht `ch` im Kindmodus isoliert abprüfen.
- Nicht externe Symbolbibliotheken oder geschützte Assets einführen.
- Nicht Spielpunkte, Timer, Sterne, Rankings oder Diagnose-Sprache ergänzen.
- Nicht die bestehende App-Struktur refactoren, solange der Tisch-Browser-Smoke fehlt.

## Entscheidung

Freigabeempfehlung: Phase 2E-B kann als grün akzeptiert werden. Vor weiterem Content-Ausbau sollte Phase 2F-A den Tisch-Kindfluss im Browser/Tablet sichtbar absichern.
