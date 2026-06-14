# Alpha 36A - Series UI Density Plan

## Kurzdiagnose

Alpha 35B hat die 7 Alpha-34-Beobachtungsaufgaben fachlich sauber zu 4 lokalen Unterrichtsserien gebündelt. Die Lehrkraft-UI ist dadurch besser strukturiert, aber noch nicht wirklich kurz: Im Lehrkraftbereich folgen weiterhin Onboarding, 2-Karten-Pilot, Praxis-Pilotkarte, manuelle Tagesweg-Wahl, Vorschlagskarte, lokaler Profilbuilder, adaptive Vorschau, Serienpanel, Einzelaufgaben-Details, Demo-Profil-Vorschau, Coverage-Check, Pilotprotokoll, Lernstart-Check, Planungsübersicht, Beobachtungskarte und Druckvorschau.

Das Serienpanel selbst ist verständlich, aber noch flächenintensiv: 4 breite Serienbuttons plus Detailkarte mit 6 Summary-Feldern wiederholen Informationen aus Profilbuilder, Vorschlagskarte und Tagesweg-Wahl. Alpha 36B sollte deshalb nicht mehr Inhalte hinzufügen, sondern dieselben Informationen in eine dichtere Lehrkraftsteuerung überführen.

## Gelesene Quellen

- `reports/alpha-35c-watchdog-review.md`
- `reports/alpha-35a-series-ui-plan.md`
- `src/App.tsx`
- `src/styles.css`
- `src/lesewerk-content.mjs`

Ich habe keine Codeänderungen vorgenommen. Dieser Bericht ist die einzige neue Artefakt-Datei.

## Wo die Lehrkraft-UI noch zu lang ist

### 1. Tagesweg, Vorschlag, Profilbuilder und Serien konkurrieren

Aktueller Ablauf im Lehrkraftbereich:

1. `teacher-onboarding-card`: Einführung und Grenzen.
2. `daily-curation-card`: 2-Karten-Pilot, Praxis-Pilotkarte, Tagesweg manuell wählen.
3. `teacher-suggestion-card`: Vorschlag für nächsten Tagesweg mit Übernahme-Button.
4. `local-profile-builder`: lokale Grapheme/Silben/Hilfen/Bereitschaft/Zugang.
5. `adaptive-preview`: 9 Summary-Felder.
6. `SeriesCompactPanel`: 4 Serienbuttons plus Detailkarte mit 6 Summary-Feldern.
7. `curated-observation-tasks`: Einzelaufgaben als Details.
8. weitere sekundäre/tertiäre Karten.

Die Serien sollen eigentlich verdichten, erscheinen aber innerhalb des Profilbuilders nach einer bereits langen Vorschau. Dadurch ist die Hauptentscheidung für die Lehrkraft nicht sofort: "Welche Serie nehme ich heute?", sondern erst nach vielen Einzelchips und Summary-Feldern sichtbar.

### 2. Das Serienpanel zeigt zwei Ebenen statt einer schnellen Übersicht

Aktuell zeigt `SeriesCompactPanel` zuerst 4 Buttons mit nur Titel, Aufgabenanzahl und Empfehlung. Die fachlich wichtigen Felder Start/Wiederholung/Nächster Schritt/Hilfe/Auslassen/Aufgaben erscheinen erst darunter in einer separaten Detailkarte.

Das ist korrekt, aber nicht maximal dicht: Die Lehrkraft muss eine Serie antippen und dann nach unten in die Detailkarte schauen. Auf Desktop erzeugt das 4 gleich große Kacheln plus eine weitere Karte; auf schmalen Screens wird daraus eine längere Buttonliste plus Detailblock.

### 3. Adaptive Vorschau und Serien-Detailkarte doppeln Inhalte

`adaptive-preview` zeigt bereits:

- Heute im Blick
- Hilfe
- Bereitschaft
- Heute passend
- Warum passt das?
- Nächster kleiner Schritt
- Hilfen
- Schreibbrücke
- Heute auslassen

Die Serien-Detailkarte zeigt danach wieder:

- Start
- Wiederholung
- Nächster kleiner Schritt
- Hilfen
- Auslasslogik
- Aufgaben darin

Für eine Lehrkraft im Unterricht ist das fachlich wertvoll, aber zu lang, weil mehrere Felder dasselbe Ziel bedienen: heutiger Start, Hilfe, nächster Schritt, Auslassen.

### 4. Die manuelle Serienübergabe ist fachlich vorbereitet, aber noch nicht UI-klar

Es gibt bereits eine sichere manuelle Tagesweg-Logik über `selectedDailyPathIds`, `toggleDailyPathChoice(...)` und `applyTeacherSuggestion(...)`. Das Serienmodell hat aber nur `taskIds` und `materialLabels`, noch keine sichere Abbildung auf `dailyPathChoices` beziehungsweise `selectedChoiceIds`.

Daher darf Alpha 36B keine automatische Serienumstellung bauen. Sinnvoll ist nur eine vorbereitete manuelle Übernahme, bei der klar sichtbar bleibt:

- Welche 2 bis 4 vorhandenen Tagesweg-Karten würden gesetzt?
- Was bleibt unverändert, solange die Lehrkraft nicht klickt?
- Wie kann die Lehrkraft danach manuell einzelne Karten entfernen/ergänzen?

## Empfohlene UI-Verdichtung für Alpha 36B

### Zielbild

Die Lehrkraft soll im oberen Lehrkraftbereich eine kompakte Entscheidungsfläche sehen:

1. "Heute klein starten" bleibt als sichere Option.
2. Direkt darunter oder daneben: 3 bis 4 Serien als kompakte Zeilen/Karten.
3. Jede Serie zeigt ohne Extra-Detailkarte genau die entscheidenden Felder:
   - Titel
   - Start
   - Wiederholung
   - Nächster Schritt
   - ein kurzer Hilfe-/Auslassen-Hinweis
   - Status: `Vorschau`, `ausgewählt` oder `manuell übernommen`
4. Die volle Detailtiefe wandert in `details` oder bleibt sekundär.

### Konkrete Verdichtungsentscheidung

Alpha 36B sollte das Serienpanel von "4 Buttons + separate Detailkarte" auf "4 kompakte Serienzeilen mit eingebauten Kernfeldern" umstellen.

Empfohlene Struktur je Serie:

```tsx
<article className="series-row">
  <div className="series-row-title">
    <span>Serie 1</span>
    <strong>{series.title}</strong>
    {series.recommendation ? <em>heute naheliegend</em> : null}
  </div>
  <dl className="series-row-steps">
    <div><dt>Start</dt><dd>{series.startLabel}</dd></div>
    <div><dt>Wiederholung</dt><dd>{series.repeatLabel}</dd></div>
    <div><dt>Nächster Schritt</dt><dd>{series.nextStepLabel}</dd></div>
  </dl>
  <p>{series.supportLabel} · {series.omitLabel}</p>
  <button type="button">Serie nur markieren</button>
</article>
```

Wichtig: Für Alpha 36B reicht zunächst `Serie nur markieren` oder `Serie vorbereiten` ohne Tagespfad-Änderung, falls das Mapping auf Tagesweg-Karten nicht stabil ist. Wenn eine Übernahme umgesetzt wird, muss sie explizit manuell sein.

### Konkrete Reihenfolge im Lehrkraftbereich

Minimaler, risikoarmer Umbau:

1. `teacher-onboarding-card` bleibt kurz oben.
2. `SeriesCompactPanel` wandert aus dem unteren Bereich des Profilbuilders nach oben, direkt nach Onboarding oder an den Anfang von `daily-curation-card`.
3. `daily-curation-card` wird sprachlich zu `Tagesweg manuell anpassen` und bleibt unter den Serien.
4. `teacher-suggestion-card` wird sekundär oder in das Serienpanel integriert, weil "heute naheliegend" bereits in `ReadingSeries.recommendation` existiert.
5. `adaptive-preview` wird von 9 Feldern auf 4 Felder gekürzt: `Heute im Blick`, `Hilfe`, `Nächster kleiner Schritt`, `Heute auslassen`. Die übrigen Details können in ein `details`-Element.
6. `coverage-inspector` sollte standardmäßig geschlossen sein, nicht `open`, weil es Prüfinformation und keine Unterrichtsentscheidung ist.

## Manuelle Serienübergabe in den Tagespfad

### Empfehlung

Ja, Alpha 36B sollte eine manuelle Serienübergabe vorbereiten, aber nur, wenn sie transparent, lokal und ohne automatische Umstellung bleibt.

Nicht umsetzen:

- keine automatische Änderung durch Profilchips
- keine automatische Änderung durch Auswahl einer Serie
- keine verdeckte Auswahl im Kinderpfad
- keine Speicherung, kein Login, kein Export, keine Cloud
- keine Diagnose-/Score-/Ranking-Sprache

Sicherer Umsetzungsrahmen:

1. Serien bekommen optional ein Feld `dailyPathChoiceIds` oder `suggestedChoiceIds`.
2. Diese IDs werden aus vorhandenen `dailyPathChoices` abgeleitet, nicht aus neuen Datenquellen.
3. Die Serienkarte zeigt vor dem Button eine klare Vorschau: "Würde vorbereiten: Mama, Wiederholung, Satz".
4. Buttontext ist eindeutig: `Serie in Tagesweg vorbereiten`.
5. Erst der Button setzt `selectedDailyPathIds`.
6. Danach erscheint ein Status: `Manuell vorbereitet. Du kannst den Tagesweg unten weiter anpassen.`
7. Der Kinderpfad zeigt weiterhin nur Tagespfad-Karten, keine Serienbegriffe und keine Begründungen.

Wenn das Mapping nicht in einem kleinen sicheren Slice möglich ist, soll Alpha 36B nur eine nicht-invasive Markierung bauen:

- `Serie markieren`
- Detail/Preview aktualisieren
- kein `selectedDailyPathIds`-Write
- klare Zeile: `Noch nicht in den Tagesweg übernommen.`

### Technische Hinweise zur sicheren Übergabe

Vorhandene Muster, die genutzt werden sollten:

- `applyTeacherSuggestion()` als Vorbild für explizite manuelle Übernahme.
- `selectedDailyPathIds` als einzige Steuerquelle für vorbereitete Tagesweg-Karten.
- `maxDailyPathCards` als harte Obergrenze.
- `resetDailyPathSelection()` bleibt Rückweg zum Standardpfad.
- `toggleDailyPathChoice(...)` bleibt manuelle Feinsteuerung.

Nicht empfohlen:

- Serienauswahl direkt in `chooseDailyPathItem(...)` oder Kinderpfad-Startlogik koppeln.
- `selectedSeriesId` automatisch in `selectedDailyPathIds` spiegeln.
- neue Persistenz in `localStorage` für Serienauswahl.

## Akzeptanzkriterien für Alpha 36B

### UI-Dichte

- Im Lehrkraftbereich ist innerhalb des ersten großen Lehrkraftabschnitts sichtbar, welche Serie heute naheliegend ist.
- Das Serienpanel zeigt 3 bis 4 Serien ohne zusätzliche separate Detailkarte als Pflichtfläche.
- Jede Serie zeigt direkt: Titel, Start, Wiederholung, nächster kleiner Schritt und eine kurze Hilfe-/Auslassen-Zeile.
- Desktop nutzt maximal 2 Serien-Spalten oder kompakte Zeilen; nicht 4 enge Spalten mit langen deutschen Labels.
- Mobile/390px bleibt einspaltig ohne horizontalen Scroll.
- Serienkarten/Serienzeilen haben `min-width: 0` und umbrechbare Texte für lange Labels.
- Die kuratierten Einzelaufgaben bleiben erreichbar, aber sekundär in `details`.

### Lehrkraft-Fluss

- Serien erscheinen vor oder sehr nahe bei der Tagesweg-Wahl, nicht erst nach der langen Profilbuilder-Vorschau.
- `adaptive-preview` ist gekürzt oder in Primär-/Detailsbereich getrennt, sodass nicht mehr 9 Summary-Felder direkt vor dem Serienpanel stehen.
- `coverage-inspector` ist nicht als dauerhaft offener Hauptblock nötig; falls vorhanden, standardmäßig geschlossen oder klar als Prüfdetails markiert.
- `teacher-suggestion-card` konkurriert nicht mit der Serienempfehlung. Entweder sekundär halten oder die Empfehlung ins Serienpanel ziehen.

### Manuelle Serienübergabe

- Keine Serienauswahl ändert den Kinderpfad automatisch.
- Wenn `Serie in Tagesweg vorbereiten` umgesetzt wird, passiert die Änderung erst nach explizitem Buttonklick.
- Der Button schreibt nur auf vorhandene Tagesweg-Auswahl (`selectedDailyPathIds`) und respektiert `maxDailyPathCards`.
- Vor dem Button ist sichtbar, welche Karten vorbereitet würden.
- Nach dem Button ist sichtbar: `Manuell vorbereitet`; darunter bleibt die normale Tagesweg-Wahl zur Kontrolle erreichbar.
- Reset auf sicheren Standardpfad bleibt möglich.
- Wenn kein stabiles Mapping auf Tagesweg-Karten vorhanden ist, wird keine Übernahme gebaut; stattdessen nur Markierung/Vorschau.

### Kinderpfad und Safety

- Kinderpfad bleibt frei von Serienbegriffen, Profilchips, Lehrkraftbegründungen, Beobachtungsaufgaben und Safetytexten.
- Keine neuen echten Namen, Diagnosen, Scores, Rankings, Timer, Logins, Cloud-/Exportfunktionen oder automatische Speicherung.
- Texte bleiben beobachtend und angebotsorientiert: `heute anbieten`, `mit Hilfe`, `ruhig wiederholen`, `nächster kleiner Schritt`.
- Keine Formulierungen wie `Kind kann`, `Niveau`, `Test`, `bestanden`, `schwach/stark`.

### Tests und Browser-Smoke für Alpha 36B

- `npm test` besteht.
- `npm run build` besteht.
- Desktop-Smoke 1280x900: Lehrkraftbereich öffnen; Serien sind früh sichtbar; keine überlange erste Entscheidungsstrecke.
- Tablet-Smoke 768x1024: Serien sind lesbar, Buttons antippbar, keine abgeschnittenen Labels.
- Mobile-Smoke 390x844: keine horizontale Scrollbar; Serieninformationen umbrechen sauber.
- Interaktions-Smoke: Serie markieren/ggf. manuell vorbereiten; Kinderpfad danach prüfen.
- Kinderpfad-Smoke: Kind sieht nur Tagespfad/Schrittkarte/Hilfen/Abschlusslogik, keine Serien- oder Profilinformationen.
- Safety-Textsuche: keine verbotenen Muster zu Diagnose, Score, Ranking, Timer, Login, Cloud, Export, echten Namen.

## Kleinster sicherer Alpha-36B-Slice

1. `SeriesCompactPanel` in `src/App.tsx` so umbauen, dass Serien direkt als kompakte Zeilen/Karten mit Start/Wiederholung/Nächstem Schritt sichtbar sind.
2. Serienpanel im Lehrkraftbereich nach oben verschieben, vor die lange Profilbuilder-/Detailstrecke.
3. `adaptive-preview` auf die wichtigsten 4 Felder kürzen oder Details einklappen.
4. Noch keine automatische Übernahme bauen. Optional nur `Serie markieren` mit klarer Statuszeile.
5. Wenn sehr klein noch möglich: Mapping-Konzept für `dailyPathChoiceIds` vorbereiten, aber erst aktivieren, wenn Test/Smoke die manuelle Übergabe absichert.

## Rest-Risiken

- Eine direkte Serienübergabe ist nur sicher, wenn die Serien stabil auf vorhandene `dailyPathChoices` abgebildet werden können. `taskIds` allein reichen dafür nicht immer, weil Tagesweg-Auswahl zwischen Task-, Repeat- und Story-Karten unterscheidet.
- Zu starke Verdichtung darf nicht dazu führen, dass Auslasslogik und Hilfen verschwinden. Diese beiden Felder sind fachlich relevant und müssen zumindest kurz sichtbar bleiben.
- Wenn das Serienpanel nach oben wandert, muss geprüft werden, ob es die sichere 2-Karten-Pilot-Option verdrängt. Der Pilotstart sollte weiterhin schnell erreichbar bleiben.
