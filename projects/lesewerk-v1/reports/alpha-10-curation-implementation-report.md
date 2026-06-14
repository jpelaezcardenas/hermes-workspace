# LeseWerk Alpha 10 – Curation Implementation Report

Datum: 2026-05-17
Status: implementiert und nach Hermes-Iteration-Limit durch Codex final verifiziert

## Ziel

Alpha 10 sollte den akzeptierten Alpha-9-Tagesweg lokal durch die Lehrkraft kuratierbar machen, ohne Dashboard, ohne neue Inhaltsmenge und ohne Datenschutzrisiko.

## Ausgangslage

Hermes Slice B hat die Implementierung fast vollständig abgeschlossen, wurde aber durch das Iteration-Limit gestoppt, bevor der Report geschrieben und das Kanban-Task abgeschlossen werden konnte. Codex hat anschließend die offenen Abschlussarbeiten übernommen:

- Diff geprüft;
- Tests erneut ausgeführt;
- Build erneut ausgeführt;
- Browser-/Produktprüfung mit frischem lokalen Server durchgeführt;
- diesen Report geschrieben.

## Geänderte Dateien

- `src/lesewerk-content.mjs`
- `src/App.tsx`
- `src/styles.css`
- `tests/lesewerk-content.test.mjs`
- `reports/alpha-10-curation-implementation-report.md`

## Umsetzung

### Content-Helfer

Ergänzt wurden:

- `maxDailyPathCards = 4`
- `getDailyPathChoices(...)`
- `getCuratedDailyReadingPath(...)`

Die Auswahl nutzt nur vorhandene Aufgaben und Stories. In Alpha 10 werden keine neuen Inhalte erzeugt.

### Lehrkraftbereich

Der Lehrkraftbereich enthält jetzt eine kompakte Sektion:

- `Tagesweg wählen`
- `Auswahl lokal`
- `Maximal vier Karten`
- Button `Sicherer Standardpfad`

Die Lehrkraft kann Karten aus bestehenden Aufgaben und Stories auswählen. Sobald vier Karten ausgewählt sind, werden weitere nicht ausgewählte Karten deaktiviert.

### Kinderpfad

Der Kinderpfad nutzt jetzt:

- den kuratierten Tagesweg, wenn mindestens eine Karte ausgewählt wurde;
- den sicheren Alpha-9-Standardpfad, wenn keine Karte ausgewählt wurde.

Die sichtbare Kinderansicht bleibt `Heute lesen` und zeigt weiterhin eine kleine, ruhige Auswahl.

### Reset

Der lokale Reset leert jetzt auch die Tagesweg-Auswahl und stellt den sicheren Standardpfad wieder her.

## Datenschutz- und GE-Grenze

Die Umsetzung bleibt lokal und anonym.

Nicht ergänzt wurden:

- echte Namen;
- Klassenlisten;
- Login;
- Cloud;
- Backend;
- Upload;
- Export;
- Scores;
- Ranking;
- Timer;
- diagnostische Labels.

Der Lehrkrafttext formuliert: `Lokal und anonym: keine echten Namen, keine Datei, keine Online-Übertragung und keine automatische Speicherung.`

## Automatisierte Prüfung

`npm test`:

- Ergebnis: bestanden
- Umfang: 47/47 Tests bestanden

Neue Tests prüfen unter anderem:

- Auswahlquellen kommen nur aus bestehenden Tasks und Stories;
- Max-vier-Regel greift auch bei mehr übergebenen IDs;
- leere Auswahl fällt auf den sicheren Alpha-9-Standardpfad zurück;
- 1-4 kuratierte Karten werden exakt als Kinderpfad verwendet;
- Lehrkraft-UI enthält lokale Kuratierung, Standardpfad-Reset und Datenschutzsprache.

`npm run build`:

- Ergebnis: bestanden
- Build-Pipeline: `tsc -b && node scripts/build.mjs`

## Browser-/Produktprüfung

Lokaler Server:

- `python3 -m http.server 4402 -d dist`
- URL: `http://127.0.0.1:4402/?codex-alpha10-check=1`

Geprüft:

1. `LeseWerk Alpha 10` ist sichtbar.
2. Lehrkraftbereich öffnet korrekt.
3. `Tagesweg wählen` ist sichtbar.
4. `Maximal vier Karten` ist sichtbar.
5. Es gibt 12 auswählbare Karten aus bestehendem Material.
6. Nach vier ausgewählten Karten wird der Status `4 von 4 Karten vorbereitet.` angezeigt.
7. Nach vier ausgewählten Karten sind acht weitere Karten deaktiviert.
8. Kinderpfad zeigt `4 vorbereitete Karten. Alles in Ruhe.`
9. Kinderpfad enthält genau vier Tageskarten.
10. `Sicherer Standardpfad` setzt die Auswahl zurück.
11. Nach Reset zeigt der Kinderpfad wieder `Vier ruhige Karten. Danach kannst du weiter lesen oder fertig sein.`
12. Fallback-Kinderpfad enthält wieder genau vier Karten.
13. Keine relevanten JavaScript-Konsolenfehler.

Hinweis: Ein generischer 404-Ressourcentrigger wurde ignoriert, weil er nicht aus der App-Logik stammt und keine JavaScript-Funktion beeinträchtigt.

## Ergebnis

Alpha 10 Slice B ist funktional abgeschlossen.

Die ursprüngliche Hermes-Blockade war kein fachlicher Blocker, sondern nur ein Iteration-Limit beim Abschlussreport und bei der vollständigen Dokumentation des Browserchecks.

## Offene Risiken

- Die Auswahl ist lokale React-State-Auswahl innerhalb der Demo. Sie ist bewusst nicht dauerhaft personenbezogen gespeichert.
- Die auswählbaren Karten sind bewusst begrenzt auf die ersten vorhandenen Aufgaben und Stories, damit Alpha 10 klein bleibt und nicht zur Bibliotheksverwaltung wird.
- Die finale Qualität sollte in Slice C noch aus GE-Perspektive bewertet werden.
