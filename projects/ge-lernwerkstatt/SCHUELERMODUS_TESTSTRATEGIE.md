# Schüler:innenmodus Beta – sichere Teststrategie

Stand: lokale Arbeitsfassung. Keine Veröffentlichung, kein Commit, keine echten Schüler:innendaten.

## Kurzantwort

Die sicherste Variante für dieses Projekt ist eine neue, klar abgegrenzte Ansicht in der bestehenden App: `Schüler:innenmodus Beta`.

Warum diese Variante:
- Die vorhandene Lehrkraft-App bleibt erhalten.
- Es werden keine bestehenden Beobachtungsdaten verändert.
- Der Modus nutzt keinen Namen, keine Fotos, keine Diagnosen und keine 1–10-Skala.
- Der Test ist lokal, sichtbar als Beta gekennzeichnet und über wenige Dateien rückbaubar.
- Chris kann direkt im bestehenden UI prüfen, ob Bedienung, Sprache, Kacheln, Hilfeauswahl und Lernspur für Schüler:innen verständlich sind.

## Bewertete Optionen

| Option | Bewertung | Risiko | Empfehlung |
|---|---|---|---|
| A separater Branch/Kopie | sehr sicher für Experiment, aber mehr Verwaltungsaufwand | gering | gut für größere Umbauten |
| B Feature-Flag | technisch sauber, aber aktuell unnötig komplex | mittel | später sinnvoll |
| C neue Route/Ansicht in der App | guter Kompromiss aus sicher und testbar | gering-mittel | jetzt empfohlen |
| D statischer Prototyp als eigene Komponente | sehr sicher, aber weniger integriert | gering | als Teil von C umgesetzt |
| E nur Konzept/Klickdummy | maximal sicher, aber weniger prüfbar | sehr gering | reicht allein nicht aus |

Umgesetzt wurde C + D: eine neue Ansicht `Schüler:innenmodus Beta` als statischer React-Prototyp innerhalb der App.

## Qualitätsdiagnose bestehende App

### Top 5 Stärken
1. Die App ist bereits lokal, ohne Login und ohne Cloud angelegt.
2. Pseudonyme Farbcodes statt Namen sind fest im Konzept verankert.
3. Beobachtung, Hilfegrad, Transfer und nächster Lernschritt werden getrennt betrachtet.
4. Die 1–10-Skala wird mehrfach als pädagogische Momentaufnahme, nicht als Note oder Diagnose markiert.
5. Druck, Export, Teamgespräch und Kompetenzraster sind für Lehrkräfte und Förderplanung anschlussfähig.

### Top 5 Schwächen für direkte Schüler:innen-Nutzung
1. Die Lehrkraft-App ist textlastig und fachsprachlicher als ein Schüler:innenmodus sein darf.
2. Die 1–10-Skala wäre für Schüler:innen riskant, weil sie als Note, Ranking oder Leistungswert missverstanden werden kann.
3. Viele Formulare und Exportfunktionen sind für Schüler:innen nicht relevant und können überfordern.
4. Es gibt noch keine konsequente Schrittführung mit sichtbarem Anfang, wenigen Handlungsschritten und Fertig-Signal.
5. Hilfe-, Pause- und Reflexionswahl waren bisher eher Dokumentationsfelder als aktive Schüler:innen-Handlung.

## Datenschutzrisiken

- 1–10-Kompetenzeinschätzungen sind sensible pädagogische Daten und gehören nicht sichtbar in den Schüler:innenmodus.
- Keine echten Namen, Fotos, Diagnosen, Familieninfos, Gesundheitsdaten oder individuellen Förderplandetails verwenden.
- Lernspuren im Schüler:innenmodus dürfen nur neutral sein: Symbol, Station, Hilfe, Reflexion, nächster Schritt.
- Wenn später echte Fotos/Symbole genutzt werden, müssen Schulvorgaben, Einwilligungen und Lizenzen geprüft werden.
- Die Beta-Ansicht speichert aktuell keine Schüler:innen-Daten in localStorage.

## Technische Risiken

- Die bestehende App ist in einer sehr großen `src/main.jsx` gebündelt; das macht punktuelle Änderungen fehleranfälliger.
- `npm run build` ist aktuell durch ein lokales macOS/Rolldown-Code-Signature-Problem blockiert, nicht durch den neuen Schüler:innenmodus.
- Ein Syntax-/Bundle-Check mit esbuild war erfolgreich.
- Die vorhandene `dist/` bleibt als altes Build erhalten, solange kein erfolgreicher Vite-Build darübergeschrieben wird.

## Pädagogische rote Linien

Nicht in den Schüler:innenmodus aufnehmen:
- sichtbare 1–10-Werte, Noten, Level, Sterne, Bestenlisten oder Ampeln für Schüler:innenleistung,
- Diagnosen oder diagnostische Sprache,
- öffentlich vergleichende Rückmeldungen,
- Fehlerzählen, Zeitdruck, Rankings,
- Fotos echter Kinder oder sensible persönliche Lernspuren,
- Aufgaben ohne Pause-, Hilfe- oder Fertig-Möglichkeit.

## Was im Testmodus enthalten ist

Die Ansicht `Schüler:innenmodus Beta` enthält:
1. Station wählen mit Kacheln: Mengen, Sortieren, Kommunikation, Alltag, Wahrnehmung.
2. `Heute übe ich …` in einfacher Sprache.
3. Aufgabe mit sichtbarem Start, 2–4 Handlungsschritten und Fertig-Signal.
4. Hilfe wählen: Warten, Zeigen, Vormachen, Bild, Talker, Pause.
5. Reflexion: nochmal, fertig, Pause, leicht, schwer, Hilfe war gut.
6. Lernspur ohne Namen: Symbol, Station, Hilfe, Antwort, nächster Schritt und symbolischer Lernzustand.

Symbolische Lernzustände statt Skala:
- Ich entdecke
- Ich mache mit Hilfe
- Ich mache es wieder
- Ich mache es fast allein
- Ich probiere es woanders

## Triage der Beispielübungen

| Übung | Status | Begründung / Hinweis |
|---|---|---|
| Ich wähle mein Getränk | sofort geeignet | sehr alltagsnah; echte Wahl muss respektiert werden; Lebensmittel/Allergien beachten |
| Bild sagt Auftrag | überarbeiten | Fotos aus dem Klassenalltag nur mit Freigabe; besser neutrale Symbole/Gegenstände nutzen |
| Fühlbeutel: Was ist gleich? | sofort geeignet | handlungsnah und basal gut anpassbar; Kleinteile/Hygiene prüfen |
| Geräusch finden | überarbeiten | Reizbelastung, Lautstärke und Rückzug/Pause klären |
| Ein Teller, ein Löffel | sofort geeignet | alltagsnah, beobachtbar, guter Bezug zu 1:1-Zuordnung |
| Baue das Muster weiter | später | für einige Kinder zu abstrakt; erst nach handelnden Sortier-/Reihen-Erfahrungen |
| Meine Jacke an den Platz | sofort geeignet | alltagspraktisch; keine Fotos/Namen am Platz digital übernehmen |
| Wir bauen zusammen einen Turm | überarbeiten | sozial gut, aber Warte-/Frustrationsschutz und Partnerdynamik vorher sichern |

## Lokale Prüfschritte

1. Projekt öffnen:

```bash
cd /Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt
```

2. Abhängigkeiten bei Bedarf lokal reparieren, falls Vite wegen Rolldown-Code-Signature blockiert:

```bash
npm rebuild rolldown @rolldown/binding-darwin-arm64 --offline
```

Hinweis: In dieser Prüfung blieb `npm run build` trotz Rebuild durch macOS-Code-Signature/Rolldown blockiert. Der Quellcode wurde deshalb zusätzlich mit esbuild geprüft.

3. App starten, wenn Vite auf deinem System läuft:

```bash
npm run start
```

4. Browser öffnen:

```text
http://127.0.0.1:5173
```

5. Testmodus öffnen:

In der Navigation auf `Schüler:innenmodus Beta` klicken.

6. Erkennen, dass du im Testmodus bist:

Oben steht `Schüler:innenmodus Beta · lokal · Prototyp` und `Lernkreislauf testen`.

7. Zur alten Lehrkraft-App zurück:

In der Navigation auf `Dashboard`, `Neue Beobachtung`, `Kompetenzraster`, `Auswertung / Export` oder andere bestehende Bereiche klicken.

## Rückbau-Strategie

Schnellster Rückbau:
1. In `src/main.jsx` die Funktion `StudentModeBeta` entfernen.
2. In `src/main.jsx` den Navigationsbutton `Schüler:innenmodus Beta` entfernen.
3. In `src/main.jsx` die Render-Bedingung `{view==='student-beta' && <StudentModeBeta/>}` entfernen.
4. In `src/styles.css` den CSS-Block ab `/* Schüler:innenmodus Beta... */` entfernen.
5. Diese Datei `SCHUELERMODUS_TESTSTRATEGIE.md` bei Bedarf löschen.

Bestehende Lehrkraft-Datenstrukturen werden dadurch nicht berührt.

## Geänderte Dateien

- `src/main.jsx`
- `src/styles.css`
- `SCHUELERMODUS_TESTSTRATEGIE.md`

## Verifikation

Durchgeführt:
- Projektstruktur und zentrale Dokumente gelesen.
- Hermes-Zuarbeiten aus `t_39f54331` berücksichtigt.
- Neuer Testmodus als abgegrenzter Prototyp eingebaut.
- `./node_modules/.bin/esbuild src/main.jsx --bundle --outfile=/tmp/ge-lernwerkstatt-check.js --loader:.jsx=jsx --format=esm` erfolgreich.

Nicht erfolgreich:
- `npm run build` scheitert aktuell an lokalem Rolldown/macOS-Code-Signature-Problem in `node_modules`, nicht an einer JSX-Syntaxmeldung.

## Nächste sinnvolle Schritte

1. Vite/Rolldown-Abhängigkeiten lokal sauber reparieren, ohne Projektlogik zu verändern.
2. Schüler:innenmodus Beta auf 13–14 Zoll Windows-Schullaptop und Tabletgröße testen.
3. Mit 1–2 anonymisierten Unterrichtsszenarien prüfen: Sind Kacheln, Hilfeauswahl, Pause und Fertig-Signal verständlich?
4. Danach entscheiden, ob der Modus nur Klickdummy bleibt oder echte lokale Lernspuren als separate, datensparsame Struktur bekommen soll.
