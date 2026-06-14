# LeseWerk Startklarheit Kinderpfad

Status: active  
Start: 2026-05-26  
CEO-Entscheidung: Nach bestandenem 390px-Wortpost-Smoke ist der naechste Hebel nicht neuer Wortschatz, sondern ein klarerer erster Kindereindruck.

## Ziel

LeseWerk soll im Kinderpfad schneller wie ein ruhiger Lesespielraum wirken. Das Kind soll auf kleinen Displays frueher erkennen:

- Was ist jetzt die Hauptaktion?
- Wo starte ich?
- Wie bekomme ich Hilfe?
- Wie komme ich ruhig zurueck oder beende?

Die bestehende fachliche Tiefe bleibt erhalten, aber sie darf den ersten Kinderblick nicht dominieren.

## Warum

Der Weekly-Review vom 2026-05-26 hat gezeigt:

- Tests und Build sind stabil.
- Wortpost funktioniert bei 390px inklusive voller Runde.
- Der Einstieg wirkt aber noch dichter als Gartenpost, weil Profil, Tagespfad, Leseleiter, Schrittkarte und Fokusspiel direkt konkurrieren.

Das ist kein technischer Fehler. Es ist ein Produktqualitaets-Thema: weniger sichtbare Verwaltung, klarere erste Handlung.

## Leitentscheidung

Erst **Startklarheit** verbessern, dann neue Inhalte.

Nicht:

- neue Wortfamilien;
- Apfel-Slice;
- grosses Refactoring;
- neue Dependencies;
- Dashboard-Ausbau.

Stattdessen:

- vorhandenen Kinderpfad visuell/strukturell beruhigen;
- Wortpost/Fokusspiel klarer als Hauptaktion zeigen;
- Leseleiter/Tagespfad/Profile so staffeln, dass sie Orientierung geben, aber nicht den Start ueberdecken.

## Scope

In Scope:

- ein kleiner UI-Slice in `projects/lesewerk-v1`;
- maximal `src/App.tsx`, `src/styles.css` und fokussierte Tests/Reports;
- keine Inhaltsausweitung;
- lokaler 390px-Smoke;
- volle Wortpost-Runde nach der Aenderung erneut pruefen.

Out of Scope:

- keine neue Spielbibliothek;
- kein neues Curriculum;
- keine echte Schuelerdatenlogik;
- keine Cloud, kein Login, kein Export;
- kein Commit, Push oder Deployment durch den Handoff.

## Erfolgskriterien

- `npm test` bleibt gruen.
- `npm run build` bleibt gruen.
- Bei 390px gibt es keinen horizontalen Overflow.
- Der Kinderpfad zeigt eine klarere erste Hauptaktion als bisher.
- `Wortpost starten` oder der aktuelle Fokusspiel-Start ist frueher und eindeutiger sichtbar.
- `Nochmal`, `Hilfe`/Hilfen und `Zur Lehrkraft` oder gleichwertige Ausgaenge bleiben erreichbar.
- Keine Punkte, Timer, Rankings, Noten, rote Fehlerdramaturgie oder Diagnosesprache.
- Ergebnisbericht mit Screenshots liegt in `projects/lesewerk-v1/reports/`.

## Quellen

- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/reports/lesewerk-quality-2026-05-26.md`
- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/reports/lesewerk-mobile-smoke-2026-05-26.md`
- `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/game-lab/GE-SPIELRAUM-PATTERN.md`
- `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/game-lab/gartenpost-prototyp.html`
