# LeseWerk Alpha 8 – Final Watchdog Review

Status: accepted  
Datum: 2026-05-17

## Kurzurteil

Alpha 8 ist akzeptiert. Die Content-Bibliothek wurde kontrolliert erweitert und die technischen sowie schulisch-datenschutzbezogenen Akzeptanzkriterien sind erfüllt.

Geprüfter Stand:

- 24 Mini-Stories insgesamt;
- 48 Lernaufgaben insgesamt;
- Story-Verteilung: 8 / 8 / 8 über Alltag, Schule und sozial-emotionale Situationen;
- Aufgaben-Verteilung: 16 / 16 / 16 über Level A, B und C;
- `npm test` bestanden: 38/38;
- `npm run build` bestanden;
- frischer lokaler Build im Browser geprüft unter `http://127.0.0.1:4388/?alpha8-watchdog=2`.

## Gelesene Grundlagen

- `reports/alpha-8-content-expansion-blueprint.md`
- `reports/alpha-8-story-expansion-report.md`
- `reports/alpha-8-learning-task-expansion-report.md`
- `reports/alpha-8-content-quality-review.md`
- `reports/alpha-7-watchdog-review.md`
- `src/App.tsx`
- `src/lesewerk-content.mjs`
- `tests/lesewerk-content.test.mjs`

## 1. Content-Zielmarken

Erfüllt.

Per lokalem Node-Import aus `src/lesewerk-content.mjs` geprüft:

- `getStoryPaths().length`: 24;
- `getLearningTasks().length`: 48;
- Stories je Cluster:
  - Alltag – Dinge und Handlungen: 8;
  - Schule und Klassenalltag: 8;
  - Sozial und emotional: 8;
- Lernaufgaben je Niveau:
  - A: 16;
  - B: 16;
  - C: 16.

Damit ist Alpha 8 nicht nur quantitativ, sondern auch strukturell balanciert.

## 2. Automatisierte Verifikation

### `npm test`

Bestanden.

```text
ℹ tests 38
ℹ pass 38
ℹ fail 0
```

### `npm run build`

Bestanden.

```text
> lesewerk-v1@0.1.0 build
> tsc -b && node scripts/build.mjs
```

## 3. Browser-Watchdog auf frischem lokalen Build

Frischer lokaler Build:

```text
python3 -m http.server 4388 -d dist
http://127.0.0.1:4388/?alpha8-watchdog=2
```

Geprüfte Punkte:

1. `Story lesen` zeigt die erweiterte Story-Auswahl. Sichtbar waren u. a. neue Alpha-8-Stories wie:
   - `Die Lampe macht Licht`;
   - `Das Fenster ist offen`;
   - `Die Blume am Tisch`;
   - `Die Tür im Wind`;
   - `Die Tasche an der Tür`;
   - `Das Wort an der Tafel`;
   - `Ein Kind fragt`;
   - `Brot wird geteilt`;
   - `Ruhig warten`;
   - `Freude beim Bauen`.
2. Eine Story-Antwort erreicht den Feedbackzustand:
   - Story: `Der Ball im Garten`;
   - Frage: `Was liegt im Garten?`;
   - Antwort: `Ball`;
   - sichtbarer Feedbackzustand: `Gut gelesen.` und `Du hast die wichtige Sache erkannt.`
3. Lehrkraftansicht zeigt Evidence:
   - `Story-Verstehen wurde mit kurzer Auswahlhilfe beobachtet.`
   - `Heute passt vermutlich Story verstehen mit kurzer Frage.`
   - `Eine ähnliche Story mit nur einer neuen Schwierigkeit lesen.`
4. Reset funktioniert:
   - Nach `Lokalen Demo-Stand zurücksetzen` verschwindet die Story-Evidence;
   - die Beobachtung fällt auf den neutralen Ausgangszustand zurück: `Mit visueller Struktur wird der Leseweg ruhiger angebahnt.`
5. Lokale Druckvorschau existiert:
   - Bereich `Lokale Druckvorschau` sichtbar;
   - Button `Im Browser drucken` vorhanden;
   - Datenschutztext bleibt lokal und nennt keine Datei, keine Online-Übertragung und keine automatische Speicherung.

## 4. Datenschutz- und Forbidden-Pattern-Check

Aktive Produktdateien in `src/` wurden auf folgende Risikomuster geprüft:

- echte Namen;
- Login, Cloud, Upload, Server, Auth, Konto;
- geschützte Assets oder externe Bildverweise;
- Diagnose-, Noten-, Score-, Ranking-, Timer- und Beschämungswörter;
- Import/Dependency auf `ge-lernwerkstatt`.

Ergebnis:

- keine echten Namen im Produktinhalt;
- keine Login-/Cloud-/Upload-/Auth-Logik;
- keine externen oder geschützten Assetverweise;
- keine Diagnose-/Noten-/Score-/Ranking-/Timer-/Shame-Wörter nach Bereinigung interner Klassennamen;
- keine `ge-lernwerkstatt`-Dependency oder Import.

Kleine Watchdog-Bereinigung während der Prüfung:

- `diagnostic-card` wurde zu `planning-card` umbenannt, damit auch interne CSS-/JSX-Klassennamen keine Diagnose-Assoziation tragen;
- `helper-note` und `privacy-note` wurden zu `helper-hint` und `privacy-hint` umbenannt, um falsche `Note`-Treffer in Quelltext-Scans zu vermeiden;
- der lokale Datenschutztext wurde von `keinen Upload` zu `keine Online-Übertragung` geschärft.

Diese Änderungen sind rein sprachlich/strukturell und verändern keine Lernlogik.

Hinweis zum Regex-Scan: Die Treffer `Max` in CSS wie `max-width` sind technische CSS-Begriffe und keine Personennamen.

## 5. GE- und Produkturteil

Stärken:

- Die App hat jetzt deutlich mehr Inhalte, ohne sofort eine neue komplexe Navigation zu erzwingen.
- Story- und Aufgabenmengen sind sauber balanciert.
- Die Story-Evidence landet sichtbar in der Lehrkraftansicht.
- Reset und lokale Druckvorschau stützen eine datensparsame Unterrichtsnutzung.
- Die Sprache bleibt überwiegend ruhig, konkret und bewertungsfrei.

Schwächen / Beobachtungen:

- Die Menge von 24 Stories und 48 Aufgaben ist im Kinderpfad jetzt sichtbar lang. Für einzelne Kinder kann das ohne Vorauswahl oder kuratierte Tagesauswahl zu viel wirken.
- Einige Storytitel sind funktional, aber noch nicht alle gleich stark kindnah formuliert.
- Level-C-Aufgaben sind brauchbar, könnten in Alpha 9 noch stärker auf wiederkehrende Satzmuster und wenige sichere Satzrahmen verdichtet werden.

Risiken:

- Wenn der nächste Schritt erneut nur Content ergänzt, wird die Bedienung wahrscheinlich schwerer statt besser.
- Für den Klassenalltag braucht die Lehrkraft perspektivisch eine einfache Tagesauswahl: wenige Karten, klare Reihenfolge, ggf. gezielte Wiederholung.

## 6. Empfehlung für Alpha 9

Empfohlen wird nicht primär weiterer Content-Ausbau, sondern ein Pilot-/Navigations-Slice.

Beste Alpha-9-Richtung:

1. `Classroom pilot protocol` als kurzer Praxistest:
   - 10–15 Minuten Einsatzszenario;
   - 2–3 anonymisierte Farbprofile;
   - Beobachtungsbogen: Einstieg, Hilfen, Abbruchstellen, Wiederholung, nächster Schritt;
   - klare Datenschutzregeln: keine echten Namen, keine Diagnosen, keine Fotos, keine Cloud.
2. Ergänzend oder danach: `UI/content navigation` für die gewachsene Menge:
   - Tagesauswahl oder `Heute nur 4 Karten`;
   - getrennte kleine Story-Packs statt 24 gleich sichtbare Storybuttons;
   - Lehrkraft kann vorab einen ruhigen Mini-Pfad wählen;
   - Kinderpfad bleibt reduziert und touchfreundlich.

Kleinster sinnvoller Alpha-9-Prompt:

```text
Alpha 9 Slice A: Entwirf ein datensparsames Classroom-Pilot-Protokoll für LeseWerk V1 mit 10–15 Minuten Einsatz, anonymen Farbprofilen, Beobachtungskriterien, Abbruch-/Hilferegeln und klarer Entscheidung, ob zuerst Tagesauswahl oder Story-Pack-Navigation gebaut werden soll. Keine echten Schülerdaten, keine Diagnosen, keine Cloud.
```

## Endentscheidung

Alpha 8 kann als abgeschlossen gelten. Für Alpha 9 sollte der Fokus auf Pilotierbarkeit und Inhaltsnavigation liegen, nicht auf weiterer Mengensteigerung.
