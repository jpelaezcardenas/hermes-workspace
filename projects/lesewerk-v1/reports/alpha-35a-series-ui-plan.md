# Alpha 35A - Series UI Plan

## Kurzdiagnose

Der aktuelle Lehrkraftbereich ist fachlich stark, aber fuer den naechsten Schritt zu breit: 2-Karten-Pilot, Tagesweg-Wahl, Vorschlag, lokales Leseprofil, Beobachtungsaufgaben, Profil-Vorschau, Lernstart-Check, Planungsuebersicht, Beobachtungskarte und Druckvorschau stehen als viele einzelne Flaechen untereinander. Alpha 35 sollte deshalb keine weitere Dashboard-Wand ergaenzen, sondern die vorhandenen Bausteine in 3 bis 4 kompakte Unterrichtsserien verdichten.

Ziel: Die Lehrkraft sieht pro Serie sofort Serie, Start, Wiederholung und naechsten Schritt. Das Kind sieht weiterhin nur den ruhigen Tagespfad beziehungsweise die aktuelle Schrittkarte. Serien bleiben lokale Unterrichtsplanung, keine Diagnose, kein Score, keine Speicherung, kein Login und keine Cloud.

## Quellen und aktueller Stand

Gelesene Quellen:
- `reports/alpha-34c-watchdog-review.md`: Alpha 34 ist gruen, aber die 7 Beobachtungsaufgaben sind noch kein Unterrichtsserien-System. Alpha 35 soll kurze Unterrichtspfade bauen und die Oberflaeche verdichten.
- `reports/alpha-34a-teacher-control-ui-plan.md`: vorhandene Struktur weiterverwenden; Kinderpfad nicht anfassen; lokale Beobachtung, bekannte Grapheme/Silben, Hilfen, Bereitschaft und Begruendung sichtbar halten.
- `src/App.tsx`: Lehrkraftbereich beginnt ab `teacher-panel` und enthaelt bereits lokale Curation, Vorschlag, Profilbuilder, kuratierte Beobachtungsaufgaben und Lernstart-Check.
- `src/styles.css`: Karten-/Grid-System ist vorhanden; Risiken liegen vor allem in zu vielen `teacher-secondary-card`-Flaechen, 4-spaltigen Grids und wiederholten Summary-Karten.

## UI-Prinzip fuer Alpha 35B

Nicht eine neue Hauptkarte mit noch mehr Informationen bauen. Stattdessen im Lehrkraftbereich eine kompakte `Serienuebersicht` einfuehren, die vorhandene Daten aus dem lokalen Profil und den kuratierten Aufgaben zusammenfasst.

Empfohlene Struktur:
1. Oben im Lehrkraftbereich nach der kurzen Onboarding-Karte eine kompakte Serienleiste.
2. Jede Serie ist eine kleine Karte oder Zeile mit vier festen Feldern:
   - `Serie`: didaktischer Name, z. B. `Bild -> Silbe -> Wort`.
   - `Start`: erste Aktion oder erste Karte, z. B. `Mama mit Bildhilfe`.
   - `Wiederholung`: was ruhig wiederholt wird, z. B. `Ma-ma klatschen / dieselbe Karte nochmal`.
   - `Naechster Schritt`: nur ein kleiner Folgeschritt, z. B. `Satz mit Hilfe` oder `Schreibbruecke optional`.
3. Pro Serie genau eine primaere Aktion: `Serie in Tagespfad uebernehmen` oder, falls Alpha 35B kleiner bleiben muss, `Serie ansehen` ohne automatische Uebernahme.
4. Die bestehende `Kuratierte Beobachtungsaufgaben`-Liste wird nicht zusaetzlich prominent erweitert. Sie kann in `details` als Materialbasis stehen bleiben oder unter den Serien als sekundäre Liste erscheinen.
5. Der Kinderpfad bekommt keine Serienauswahl, keine Lehrkraftbegruendung und keine Profilchips. Er sieht nur den ausgewaehlten Tagespfad: Schrittkarte, Tagespfad-Karten, Hilfe und Abschluss.

## Komponentenplan

### 1. Datenform: `readingSeries` aus bestehenden Bausteinen ableiten

Keine neue Persistenz und keine echten Lernendendaten. Die Serien koennen aus `localDidacticProfile`, `localAdaptiveNextStep`, `localCuratedObservationTasks`, vorhandenen Tagespfad-Karten und Bereitschaft abgeleitet werden.

Empfohlene Felder:
- `id`: stabile lokale ID, z. B. `picture-syllable-word`.
- `title`: kurzer Serientitel.
- `startLabel`: Startkarte oder Startaktion.
- `repeatLabel`: ruhige Wiederholung.
- `nextStepLabel`: kleiner naechster Schritt.
- `supportLabel`: zentrale Hilfe, z. B. Bildhilfe, reduzierte Auswahl, Vorlesen.
- `choiceIds` oder `taskIds`: nur falls die Serie direkt in den Tagesweg uebernommen wird.
- `safetyNote`: lokal/anonym/keine feste Einordnung.

Kleinster sicherer Ansatz: Eine Helper-Funktion in `lesewerk-content.mjs`, z. B. `getLocalReadingSeriesForProfile(profile, adaptive)`, gibt 3 bis maximal 4 Serien zurueck. Sie verwendet vorhandene Profile-/Taskdaten und erfindet keine neuen Datenquellen.

### 2. Lehrkraft-Komponente: `SeriesCompactPanel`

Position: im Lehrkraftbereich direkt nach `teacher-onboarding-card` oder direkt vor `daily-curation-card`. Damit wird die Serienlogik zum Einstieg und die bestehende manuelle Tagesweg-Wahl bleibt darunter als Detailsteuerung.

Aufgabe der Komponente:
- Zeigt maximal 4 Serien in einem kompakten Grid.
- Nutzt je Serie dieselbe Vier-Felder-Struktur.
- Hebt nicht mehr als eine empfohlene Serie hervor.
- Bietet pro Serie eine klare Aktion.
- Zeigt unterhalb eine kurze Datenschutzzeile: `Lokal, anonym, keine Speicherung. Kinderpfad aendert sich nur nach manueller Uebernahme.`

Skizze:

```tsx
<section className="series-compact-panel teacher-primary-card" aria-labelledby="series-title">
  <div className="series-panel-header">
    <div>
      <p className="section-kicker">Unterrichtsserien</p>
      <h3 id="series-title">3 ruhige Wege fuer heute</h3>
      <p>Start, Wiederholung und naechster kleiner Schritt. Der Kinderpfad bleibt einfach.</p>
    </div>
    <span className="guided-path-badge">lokal</span>
  </div>
  <div className="series-card-grid">
    {readingSeries.map((series) => (
      <article className="series-card" key={series.id}>
        <strong>{series.title}</strong>
        <dl className="series-step-list">
          <div><dt>Start</dt><dd>{series.startLabel}</dd></div>
          <div><dt>Wiederholung</dt><dd>{series.repeatLabel}</dd></div>
          <div><dt>Naechster Schritt</dt><dd>{series.nextStepLabel}</dd></div>
        </dl>
        <button className="secondary-action" type="button">Serie ansehen</button>
      </article>
    ))}
  </div>
</section>
```

Wichtig: Wenn `Serie in Tagespfad uebernehmen` umgesetzt wird, muss sie denselben manuellen Mechanismus nutzen wie `applyTeacherSuggestion`: erst Lehrkraft-Aktion, dann `selectedDailyPathIds`; keine automatische Aenderung durch Profilchips.

### 3. Bestehende Flaechen verdichten statt stapeln

Empfohlene Reduktion fuer Alpha 35B:
- `daily-curation-card` bleibt, wird aber nach der Serienleiste zum Detailbereich: `Tagesweg manuell anpassen`.
- `teacher-suggestion-card` kann mittelfristig in die Serienleiste aufgehen: Vorschlag = hervorgehobene Serie.
- `local-profile-builder` bleibt, aber seine `adaptive-preview` sollte nicht nochmals alle Serieninformationen doppeln. Sie zeigt weiterhin Grundlage: Heute im Blick, Hilfe, Bereitschaft, Warum passt das, Heute auslassen.
- `curated-observation-tasks` wird in ein `details` verschoben oder als kompakte Materialliste unter `local-profile-builder` belassen, damit sie nicht mit den Serienkarten konkurriert.
- `profile-safe-preview`, `coverage-inspector`, `learning-check-card`, Druckvorschau und Protokoll bleiben sekundär. Nicht alle muessen im ersten Viewport sichtbar sein.

### 4. Kinderpfad unveraendert ruhig halten

Im Kinderbereich keine Serienbegriffe einfuehren. Sichtbar bleiben duerfen:
- `Tagespfad starten`.
- Tagespfad-Karten mit Helfer + Label.
- Schrittkarte / Leseleiter.
- Hilfe waehlen.
- `Weiter`, `Nochmal ruhig`, `Heute fertig`.

Wenn eine Serie durch die Lehrkraft uebernommen wurde, erscheint sie fuer das Kind nur als vorbereiteter Tagespfad mit 2 bis 4 Karten. Keine Begruendung, keine Profilinformationen, keine Beobachtungsaufgabenliste.

## Vorgeschlagene 3 bis 4 Serien

Die genaue didaktische Benennung sollte mit dem parallelen GE-Serienmodell abgeglichen werden. UI-seitig passen diese vier kompakten Serienformen zum aktuellen Code:

1. `Bild -> Silbe -> Wort`
   - Start: Bild/Symbol zu `Mama` oder passendem Wort.
   - Wiederholung: bekannte Silbe sprechen, klatschen oder legen.
   - Naechster Schritt: Wort gemeinsam lesen.
   - Quelle im Code: `alpha34b-picture-word`, `alpha34b-syllable`, `alpha34b-word`.

2. `Wort -> Satz mit Hilfe`
   - Start: bekanntes Wort aus `localAdaptiveNextStep.pathCards`.
   - Wiederholung: dieselbe Karte mit Bildhilfe oder reduzierter Auswahl.
   - Naechster Schritt: kurzer Satz nur mit Hilfe.
   - Quelle im Code: Bereitschaft `sentence`, Schreib-/Story-Bereitschaft und `getAdaptiveNextStepForProfile`.

3. `Mini-Geschichte ruhig anschliessen`
   - Start: vertrautes Wort oder Satz.
   - Wiederholung: Bildfolge / zwei Sinnschritte.
   - Naechster Schritt: Mini-Geschichte mit Hilfe, nur wenn `story` heute aktiv ist.
   - Quelle im Code: `alpha34b-mini-story`, `StoryCard`, `localReadiness.story`.

4. `Schreibbruecke optional`
   - Start: vertrautes Wort aus erster passender Karte.
   - Wiederholung: Silben legen / Wort nachfahren.
   - Naechster Schritt: freiwillige Materialhandlung, kein Schreibtest.
   - Quelle im Code: `alpha34b-writing-bridge`, `getWritingBridgeForTask`, `localReadiness.writingBridge`.

Wenn Alpha 35B klein bleiben muss, nur die ersten 3 Serien anzeigen und die Schreibbruecke als optionales Feld innerhalb der passenden Serie ausweisen. Das reduziert UI-Dichte.

## CSS- und Layout-Risiken

1. Neue Kartenwand im Lehrkraftbereich
   - Risiko: Noch eine `teacher-secondary-card` unter vielen verlaengert die Seite ohne Verdichtung.
   - Gegenmassnahme: Serienpanel als Ersatz/Kompression fuer `teacher-suggestion-card` + `curated-observation-tasks` denken, nicht als zusaetzliche gleichwertige Flaeche.

2. Vier Serien x vier Felder koennen auf Desktop wie Tabelle wirken
   - Risiko: Zu viel Text in `grid-template-columns: repeat(4, ...)` fuehrt zu schmalen Karten.
   - Gegenmassnahme: Desktop maximal 2 Spalten fuer Serienkarten; innerhalb der Karte vertikale `dl`-Liste. Nur sehr kurze Labels.

3. Mobile Overflow durch lange deutsche Labels
   - Risiko: `Naechster kleiner Schritt` und Seriennamen umbrechen stark.
   - Gegenmassnahme: bei `max-width: 640px` einspaltig; `min-width: 0`; `overflow-wrap: anywhere` fuer `dd`/`strong`; keine fixen Breiten.

4. Konkurrenz mit vorhandenen 4-spaltigen Grids
   - Risiko: `curation-choice-grid`, `daily-path-grid`, `pilot-protocol-list` und neue Serienkarten erzeugen visuelle Gleichrangigkeit.
   - Gegenmassnahme: Serienkarten ruhiger und dichter gestalten als Tagesweg-Karten: weniger Schatten, kleinere `min-height`, klare Textstruktur, nur ein Button.

5. Details/Disclosure koennen wichtige Informationen verstecken
   - Risiko: Wenn Beobachtungsaufgaben komplett in `details` verschwinden, verliert die Lehrkraft Materialbezug.
   - Gegenmassnahme: Serienkarte zeigt je eine Materialzeile; die volle Aufgabenliste bleibt als `details` mit eindeutigem Summary `Materialbasis anzeigen`.

6. Print-Ansicht
   - Risiko: Neue Serien sind fuer Unterrichtsplanung relevant, aber `@media print` blendet derzeit viele Navigationsbereiche aus.
   - Gegenmassnahme: Wenn Serienplan druckrelevant ist, `series-compact-panel` in Print entweder zeigen oder bewusst ausblenden und in Druckvorschau integrieren. Nicht ungeprueft beides parallel.

## Browser-Smoke-Kriterien fuer Alpha 35B

### Desktop 1280 x 900
- Lehrkraftbereich oeffnen.
- Direkt im oberen Lehrkraftbereich sind 3 bis 4 Serien sichtbar oder mit minimalem Scroll erreichbar.
- Jede Serie zeigt sichtbar: Serientitel, Start, Wiederholung, naechster Schritt.
- Genau eine klare Aktion pro Serie; keine neue Dashboard-Leiste mit mehr als vier gleichwertigen Buttons.
- Wechsel im lokalen Profilbuilder aendert Serien-/Vorschau-Inhalte, ohne den Kinderpfad automatisch umzuschalten.
- Kein horizontaler Overflow, keine ueberlappenden Summary-Karten.

### Tablet / schmal 768 x 1024
- Serienkarten stehen maximal zweispaltig oder einspaltig sauber untereinander.
- Lange Labels umbrechen innerhalb der Karten.
- Primaeraktionen bleiben antippbar und mindestens 44 px hoch.
- Tagesweg-Wahl und Profilbuilder bleiben erreichbar, wirken aber sekundär.

### Mobile 390 x 844
- Serienpanel ist einspaltig.
- Keine abgeschnittenen Buttons, kein horizontaler Scroll.
- `Start`, `Wiederholung`, `Naechster Schritt` bleiben lesbar.
- Lehrkraft kann eine Serie ansehen/uebernehmen, ohne durch die volle Aufgabenliste scrollen zu muessen.

### Kinderpfad-Smoke
- Nach Serienauswahl oder Serienuebernahme auf `Kinderpfad` wechseln.
- Kind sieht nur Tagespfad, Schrittkarte, Hilfen und Abschlusslogik.
- Keine Serienbegriffe, Profilchips, Begruendungen, Beobachtungsaufgaben oder Lehrkraft-Safetytexte im Kinderpfad.
- `Tagespfad starten`, `Weiter`, `Nochmal ruhig` und `Heute fertig` bleiben funktional.

### Safety-Smoke
- Textsuche/Review auf verbotene Muster: keine Diagnose, kein Score, kein Ranking, kein Timer, kein Login, keine Cloud, kein Export, keine echten Namen.
- Serienformulierungen bleiben beobachtend: `heute anbieten`, `mit Hilfe`, `ruhig wiederholen`, `naechster kleiner Schritt`; nicht `Kind kann`, `Niveau`, `Test bestanden`.

## Akzeptanzkriterien fuer die Umsetzung

- Lehrkraft sieht 3 bis 4 kompakte Unterrichtsserien statt weiterer Einzelkarten.
- Jede Serie hat die feste Vier-Felder-Struktur: Serie, Start, Wiederholung, naechster Schritt.
- Serien koennen aus bestehenden lokalen Daten abgeleitet werden; keine neue Speicherung und keine personenbezogenen Felder.
- Kinderpfad bleibt visuell und inhaltlich unveraendert ruhig.
- Bestehende manuelle Tagesweg-Logik wird respektiert: keine automatische Kinderpfad-Aenderung durch Profil- oder Serienvorschau.
- CSS bleibt responsiv: Desktop nicht mehr als 2 Serien-Spalten, Mobile einspaltig.
- Vorhandene Tests werden angepasst/ergaenzt, sodass Safety-Sprache und Kinderpfad-Trennung erhalten bleiben.

## Kleinster sicherer Alpha-35B-Slice

1. In `lesewerk-content.mjs` eine reine Helper-Funktion fuer 3 lokale Serien einfuehren.
2. In `App.tsx` daraus `readingSeries` per `useMemo` ableiten.
3. Eine kompakte `SeriesCompactPanel`-Komponente im Lehrkraftbereich vor der Tagesweg-Wahl rendern.
4. Zunaechst nur `Serie ansehen` oder eine nicht-invasive Hervorhebung bauen. Erst im zweiten Schritt direkte `selectedDailyPathIds`-Uebernahme, wenn passende Choice-IDs sicher abgeleitet sind.
5. `curated-observation-tasks` in ein `details` verschieben oder darunter visuell sekundär machen.
6. CSS fuer `.series-compact-panel`, `.series-card-grid`, `.series-card`, `.series-step-list` ergaenzen; Desktop 2 Spalten, Mobile 1 Spalte.
7. Tests/Smoke: `npm test`, `npm run build`, Desktop/Mobile Browser-Smoke, Safety-Smoke.

## Rest-Risiken

- Die finale didaktische Bezeichnung der Serien sollte mit `reports/alpha-35a-reading-series-model.md` abgeglichen werden, sobald der parallele GE-Report vorliegt.
- Direkte Uebernahme in den Tagespfad ist nur sicher, wenn Serien stabil auf vorhandene `dailyPathChoices` gemappt werden koennen. Sonst zuerst reine Anzeige/Hervorhebung umsetzen.
- Der Lehrkraftbereich bleibt insgesamt lang. Alpha 35B sollte deshalb wirklich verdichten und mindestens eine bestehende Flaeche sekundär machen, nicht nur neue Serien oben drauf setzen.
