# Alpha 32A - Test UI Intent Cleanup Plan

## Kurzdiagnose

Alpha 31B hat den Kinderpfad sichtbar in Richtung `Tagespfad` entschlackt: der dominante Start sitzt im `today-path-header`, die Schrittkarte nutzt `Weiter`, und die Bibliothek ist als sekundärer Bereich nach unten verschoben. Ein Teil der Source-Tests beschreibt aber noch historische Implementierungsmarker statt die aktuelle sichtbare UI-Absicht. Dadurch bleiben Kommentar-Marker wie `Lesepfad starten` im Produktcode, obwohl sie nicht mehr sichtbares Verhalten sind.

Ziel fuer Alpha 32B: Nur Tests und die damit erzwungenen Fake-/Legacy-Marker bereinigen. Produktverhalten, Content, Safety-Grenzen und sichtbare UI sollen unveraendert bleiben.

## 1. Aktuelle Tests mit historischen Strings oder Kommentar-Markern

### 1.1 `Alpha 18 app exposes one clear guided start and visible reading path`

Datei: `tests/lesewerk-content.test.mjs`, ca. Zeilen 626-638.

Aktuell riskante Assertions:

- `assert.match(appSource, /Lesepfad starten/);`
- doppelte Prüfung auf `Heute lesen wir so`
- `assert.match(css, /\.guided-entry-card/);`
- `assert.match(css, /\.guided-worked-chain/);`

Warum riskant:

- `Lesepfad starten` ist nicht mehr die sichtbare Startaktion. In `src/App.tsx` ist sichtbar `Tagespfad starten` im `today-path-header`.
- Der String `Lesepfad starten` existiert aktuell nur noch in einem Kommentar bei der sekundären Bibliothek: `/* <details className="library-panel"> kept as source marker for legacy secondary-library test. Lesepfad starten is now Tagespfad starten. */`.
- Damit testet der Test nicht UI-Verhalten, sondern konserviert historischen Text im Quellcode. Eine echte Entfernung des Kommentars würde den Test brechen, obwohl die sichtbare UI korrekt bleibt.
- `guided-entry-card` ist inzwischen kein sichtbarer Einstieg mehr, aber CSS-Reste werden durch den Test weiter stabilisiert. Das erhöht die Gefahr, dass alte UI-Schichten aus Angst vor Testbrüchen erhalten bleiben.
- `guided-worked-chain` ist eine zusätzliche Orientierungsebene. Wenn Neva später die Kinderbühne weiter entschlackt, sollte der Test nicht pauschal verlangen, dass diese Ebene dominant bleibt.

### 1.2 `child app shows a current local pilot demo header and keeps the full library secondary`

Datei: `tests/lesewerk-content.test.mjs`, ca. Zeilen 223-236.

Aktuell fragil:

- `assert.match(appSource, /<details className="library-panel">/);`
- `assert.match(appSource, /Alle Wörter und Geschichten öffnen/);`
- `assert.match(css, /\.library-panel/);`

Warum riskant:

- Die Vollbibliothek soll sekundär bleiben, aber der Test erzwingt konkrete Markup-/CSS-Namen statt UI-Absicht.
- In `src/App.tsx` wurde dafür bereits ein Kommentar-Marker eingeführt, um die alte Assertion zu bedienen. Genau diese Art Marker soll Alpha 32 entfernen.
- Die fachliche Absicht ist nicht: "ein `details` mit exakter Klasse muss existieren", sondern: "die Bibliothek darf nicht als primäre Start-/Auswahllast vor der aktiven Tagespfadkarte stehen".

### 1.3 `Alpha 31 child path keeps Tagespfad dominant and library secondary in source`

Datei: `tests/lesewerk-content.test.mjs`, ca. Zeilen 1773-1788.

Dieser Test ist näher an der richtigen Absicht, aber noch source-fragil:

- Er prüft Reihenfolge per `indexOf('today-path-header')`, `indexOf('active-step-card')`, `indexOf('secondary-library-panel')`.
- Er zählt `guided-start-action` global im gesamten `appSource`.
- Er prüft CSS-Implementation `order: 8` für `.secondary-library-panel`.

Warum riskant:

- Die Richtung stimmt: Tagespfad vor aktiver Karte, Bibliothek danach, genau eine Startaktion.
- Aber konkrete CSS-Order-Werte sind Implementierungsdetails. Eine gleichwertige DOM-Reihenfolge oder ein anderes Layout könnte korrekt sein und trotzdem den Test brechen.
- Der Test sollte stärker auf sichtbare Absicht und Branch-Scope begrenzt werden: im Kinderpfad-Abschnitt genau ein Startbutton im Header, aktive Schrittkarte danach, Bibliothek nur sekundär und nicht vor dem Tagespfad.

## 2. Sichtbare UI-Absicht, die stattdessen getestet werden soll

### 2.1 Tagespfad-Header als Einstieg

Testabsicht:

- Im Kinderpfad gibt es einen `today-path-header`.
- Der Header enthält sichtbar `Tagespfad`, `Heute lesen` und die Start-/Reset-Aktion `Tagespfad starten`.
- Der Header steht vor der aktiven Schrittkarte.
- Der alte Starttext `Lesepfad starten` darf im App-Source nicht mehr vorkommen, auch nicht als Kommentar.

Begründung:

Das entspricht Alpha 31B: Der Tagespfad ist die Hauptbühne, nicht die alte Guided-Entry-Karte.

### 2.2 Eine primäre Start-/Reset-Aktion im Kinderpfad

Testabsicht:

- Im Kinderpfad-Startbereich gibt es genau eine `guided-start-action`.
- Diese Aktion ruft `startGuidedReadingPath` auf und ist mit `Tagespfad starten` beschriftet.
- Es gibt keinen zweiten primären Startbutton `Lesepfad starten` und keine historische Startkarte mit eigener Primäraktion.

Begründung:

Das schützt die Orientierung: ein Startort, nicht zwei konkurrierende Einstiege.

### 2.3 Step-Card `Weiter` als aktive Schrittaktion

Testabsicht:

- `MamaStepCard` bleibt an `mamaStepIndex` gekoppelt.
- `GuidedReadingPath` erhält weiter `activeIndex={mamaStepIndex}`.
- In `MamaStepCard` ist `Weiter` die primäre Aktion bis zum letzten Schritt; `Nochmal ruhig` bleibt sekundär.
- Der Test soll `Weiter` im Kontext von `function MamaStepCard` prüfen, nicht global im gesamten App-Source.

Begründung:

Der relevante Fortschritt passiert auf der Schrittkarte. Ein globaler Stringtreffer auf `Weiter` kann auch aus Feedback- oder Pilotbereichen kommen und wäre dann ein falsches Signal.

### 2.4 Sekundäre Bibliothek

Testabsicht:

- Die Bibliothek bleibt verfügbar, aber erst nach Header und aktiver Schrittkarte.
- Der Test darf `secondary-library-panel` als aktuelle Implementierung prüfen, soll aber keine Fake-Kommentare oder historische Marker benötigen.
- Die Bibliothek darf keine primäre Startaktion enthalten.
- Wenn CSS geprüft wird, dann nur grob: `.secondary-library-panel` existiert und wirkt sekundär, nicht zwingend ein exakter `order: 8`-Wert.

Begründung:

Das bewahrt den Alpha-31B-Schutz gegen eine dominante Vollauswahl, ohne die konkrete Markup- oder CSS-Mechanik unnötig einzufrieren.

## 3. Minimaler Implementierungs-Checklist fuer Neva

### 3.1 In `tests/lesewerk-content.test.mjs` ändern

Kleinster sicherer Slice:

1. Test `Alpha 18 app exposes one clear guided start and visible reading path` umbenennen, z. B. in:
   - `child path exposes Tagespfad start and guided step orientation`
2. In diesem Test ersetzen:
   - weg: `/Lesepfad starten/`
   - hin: `/Tagespfad starten/` im Kinderpfad- oder Header-Slice
3. Entfernen oder entschärfen:
   - direkte Pflicht auf `.guided-entry-card`
   - direkte Pflicht auf `.guided-worked-chain`, falls sie nicht Kern der aktuellen UI-Absicht ist
4. Beibehalten, aber genauer scopen:
   - `GuidedReadingPath`
   - `mamaStepIndex`
   - `step-rail`
   - `Heute lesen`
   - sichere Sprache ohne Score/Ranking/Timer/Diagnose usw.
5. Test `child app shows ... library secondary` auf Intent umstellen:
   - Bibliothek nach aktiver Karte, nicht vor dem Tagespfad
   - keine historische Marker-Kommentare
   - keine zweite Primäraktion in der Bibliothek
6. Test `Alpha 31 child path keeps Tagespfad dominant and library secondary in source` leicht robuster machen:
   - child branch sauber slicen (`child-path-shell` bis Teacher-Branch oder bis Ende des Kinderbranches)
   - `guided-start-action` nur im Kinderpfad-Slice zählen
   - `Tagespfad starten` genau einmal im relevanten Startbereich erwarten
   - `Lesepfad starten` im gesamten `appSource` verbieten
   - CSS nicht auf exakten `order: 8` festnageln, wenn DOM-Reihenfolge und sekundäre Klasse reichen

### 3.2 In `src/App.tsx` ändern

Nur nach Testumstellung:

1. Kommentar-Marker bei der sekundären Bibliothek entfernen:
   - `/* <details className="library-panel"> kept as source marker for legacy secondary-library test. Lesepfad starten is now Tagespfad starten. */`
2. Keine sichtbaren Texte ändern, wenn nicht durch die Tests zwingend notwendig.
3. Keine neue State-Logik, keine neue Komponente, kein Routing, keine Persistenz.
4. `today-path-header`, `Tagespfad starten`, `GuidedReadingPath`, `MamaStepCard`, `Weiter`, `Nochmal ruhig`, `secondary-library-panel` sichtbar/strukturell erhalten.

### 3.3 In `src/styles.css` ändern

Nur falls Tests dadurch wieder sinnvoll werden:

1. CSS-Reste wie `.guided-entry-card` nicht im Alpha-32B-Slice aktiv löschen, solange das Produktverhalten nicht bewertet ist.
2. Tests aber nicht mehr von `.guided-entry-card` abhängig machen, wenn die Karte nicht mehr gerendert wird.
3. `.secondary-library-panel`, `.support-strip`, `.active-step-card` und responsive Grundordnung beibehalten.
4. Keine Layout-Neugestaltung in diesem Slice.

### 3.4 In `src/lesewerk-content.mjs` unangetastet lassen

Nicht anfassen:

- Content-Packs
- Profil-Gating
- Story-/Schreibbrücken-Daten
- Safety-Wortlisten und lokale Beobachtungslogik
- Teacher-Daily-Path-Funktionen

Begründung:

Alpha 32A/32B ist ein Test- und UI-Intent-Cleanup. Content- oder Didaktikänderungen wären Scope Creep.

## 4. Was ausdrücklich unverändert bleiben soll

- Keine Produktverhaltensänderung im ersten Cleanup-Slice.
- Keine echten Lernendendaten.
- Kein Login, Backend, Cloud, Upload, Export oder Download.
- Keine Scores, Noten, Ranking, Timer, Prozentfortschritt oder Lesealter.
- Keine klinischen oder diagnostischen Claims.
- Keine geschützten Bild-/Symbolassets und keine METACOM-/ARASAAC-/Boardmaker-/Widgit-Claims.
- Lehrkraftbereich, Profilbuilder, Coverage-Check, Lernstart und Tagesweg-Auswahl nicht umbauen.
- Keine weiteren Alpha-31-Content-Erweiterungen in diesem Slice.

## 5. Acceptance Criteria fuer Alpha 32B

1. Tests beschreiben aktuelle sichtbare UI-Absicht:
   - Tagespfad-Header ist der Startanker.
   - Es gibt eine primäre Start-/Reset-Aktion im Header.
   - Die aktive Schrittkarte nutzt `Weiter` und `Nochmal ruhig` im richtigen Kontext.
   - Die Bibliothek bleibt sekundär.
2. Keine Fake- oder Legacy-Marker:
   - `Lesepfad starten` kommt in `src/App.tsx` nicht mehr vor.
   - Keine Kommentar-Marker, die nur Tests zufriedenstellen.
3. Kein Rückschritt in der Kinderpfad-Orientierung:
   - `today-path-header` vor `active-step-card`.
   - `GuidedReadingPath` mit `activeIndex={mamaStepIndex}`.
   - `MamaStepCard` bleibt sichtbar an `mamaStepIndex` gekoppelt.
   - `secondary-library-panel` bleibt nachgeordnet.
4. Keine Safety-Regression:
   - Keine neuen riskanten Begriffe oder Funktionen aus den Strict Boundaries.
   - Keine neuen Assets, Netzwerk-/Cloud-/Export- oder Speicherpfade.
5. Keine Produktlogik-Änderung:
   - Alpha 32B räumt Tests und Kommentar-Marker auf, baut aber noch keine neue UI.

## 6. Verification Checklist fuer Neva

Nach Alpha-32B-Umsetzung ausführen:

1. `npm test`
   - Erwartung: alle Tests grün.
   - Besonders prüfen: geänderte Source-Tests dürfen keine historischen Marker mehr erzwingen.
2. `npm run build`
   - Erwartung: TypeScript und Build erfolgreich.
3. Browser-Smoke lokal
   - App starten, z. B. nach Build mit Preview/Server.
   - Kinderpfad öffnen.
   - Prüfen: Header `Tagespfad` / `Heute lesen` sichtbar.
   - Prüfen: genau ein sichtbarer primärer Start im Header: `Tagespfad starten`.
   - Klicken: `Tagespfad starten`.
   - Klicken: Schrittkarten-Button `Weiter`.
   - Prüfen: Schrittanzeige und Mama-Schrittkarte wechseln sichtbar weiter.
   - Prüfen: `Nochmal ruhig` bleibt sekundär.
   - Prüfen: Bibliothek ist untergeordnet/sekundär, nicht vor der aktiven Schrittkarte.
   - Prüfen: Lehrkraftmodus bleibt erreichbar.
4. Responsive Smoke
   - Desktop ca. 1280 x 900: keine konkurrierende Startkarte, keine horizontale Überbreite.
   - Narrow/Tablet ca. 768 x 1024: Reihenfolge Header -> Step Rail/aktive Karte -> Hilfen/Bibliothek ruhig.
   - Mobile ca. 390 x 844: kein Textüberlauf, `Weiter` gut erreichbar.
5. Safety Smoke
   - Sichtbaren Kinderpfad auf verbotene Wörter/Funktionen scannen: Diagnose, Score, Punkte, Note, Ranking, Timer, Prozent, Lesealter, Cloud, Upload, Export, Login.
   - Keine neuen externen Asset-URLs oder geschützten Symbolsystem-Claims.

## 7. Kleinster sinnvoller Alpha-32B-Slice in einem Satz

Neva soll zuerst nur die Source-Tests von historischen Markern auf die aktuelle Tagespfad-Absicht umstellen und danach den Kommentar-Marker `Lesepfad starten` aus `src/App.tsx` entfernen; sichtbares Produktverhalten, Content, Lehrkraftbereich und Safety-Grenzen bleiben unverändert.
