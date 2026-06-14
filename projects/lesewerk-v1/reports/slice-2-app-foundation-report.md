# LeseWerk Slice 2 – App-Fundament und Silben-Demo

Stand: 2026-05-16

## Kurzdiagnose

Slice 2 baut die erste eigenständige LeseWerk-App-Grundlage unter `/Users/zondrius/hermes-workspace/projects/lesewerk-v1`. Die App ist lokal, deutschsprachig, anonym und getrennt vom bestehenden `ge-lernwerkstatt`-Projekt umgesetzt.

## Umgesetzt

- React-/TypeScript-App-Grundlage mit statischem Build über esbuild.
- Startscreen mit kindzentrierter, ruhiger Sprache.
- Anonyme Profilwahl: `Profil Blau`, `Profil Grün`, `Profil Sonne`.
- Diagnostischer Einstieg als Supportwahl statt Test-/Notenlogik.
- Silbenlesen-Demo mit Karten `Mama`, `Sofa`, `Lama` und blau-roter Silbenstruktur.
- Supportpanel:
  - Bildhilfe;
  - Silbenfarben;
  - Vorlesen-Platzhalter;
  - Gebärden-Hinweis `Schau mal meine Haende an`;
  - Weniger Auswahl;
  - Nochmal.
- Lehrerzusammenfassung mit neutralem Leseprofil, beobachteten Hilfen und nächstem Schritt.
- README mit lokaler Run-Anleitung.

## Build- und Test-Ergebnis

Ausgeführt in `/Users/zondrius/hermes-workspace/projects/lesewerk-v1`:

```bash
npm install
npm test
npm run build
```

Ergebnis:

- `npm install`: erfolgreich, 0 gemeldete Vulnerabilities.
- `npm test`: erfolgreich, 4/4 Node-Testfälle grün.
- `npm run build`: erfolgreich; Ausgabe in `dist/`.

TDD-Notiz:

- Vor der Implementation wurde `tests/lesewerk-content.test.mjs` geschrieben und gegen das noch fehlende Modul ausgeführt.
- Der erste Testlauf schlug erwartungsgemäß mit `ERR_MODULE_NOT_FOUND` fehl.
- Danach wurde die minimale Inhalts-/Supportlogik implementiert und die Tests auf grün gebracht.

## Lokal getestete Pfade

Lokaler Server für den geprüften Build:

```bash
python3 -u -m http.server 4174 --bind 127.0.0.1 --directory dist
```

Geöffnet:

```text
http://127.0.0.1:4174/
```

Geprüft:

1. Kinderpfad:
   - Startscreen geladen.
   - Anonymes Profil `Profil Grün` gewählt.
   - Bildhilfe aktiviert.
   - Silbenlesen-Demo zeigt Silbenwort `Mama` mit Silbenstruktur.
2. Lehrerpfad:
   - Wechsel in Bereich `Lehrkraft` funktioniert.
   - Zusammenfassung zeigt `Profil Grün`, beobachtete Hilfen `Bildhilfe, Silbenfarben`, neutrales Leseprofil und nächsten Schritt.
3. Visuelle Prüfung:
   - Seite lädt vollständig.
   - Keine offensichtliche Textüberlappung im Desktop-Viewport.
   - Hauptbereiche sind lesbar: Startscreen, Profilwahl, Lehrerzusammenfassung.

## Datenschutz- und GE-Check

- Keine echten Schülernamen, Diagnosen, Logins, Passwörter oder Cloud-Anbindung.
- Browser-localStorage speichert nur die anonyme Demo-Profil-ID.
- Student-facing Sprache vermeidet Noten, Ranglisten, Zeitdruck und Schamfeedback.
- Lehrerbereich formuliert beobachtend und ressourcenorientiert.
- Bildhilfe nutzt nur Textplatzhalter, keine geschützten Assets.

## Technische Entscheidung

Die App enthält React + TypeScript. Der Build läuft in diesem Slice über `scripts/build.mjs` mit esbuild statt über Vite, weil der lokale Vite/Rolldown-Build auf macOS hier an einem nativen Binding-Signaturproblem scheiterte. Dadurch bleibt der Prototyp lokal baubar und testbar, ohne riskante System- oder Dependency-Eingriffe.

## Risiken und Grenzen

- Noch kein echter Audio-/Vorlesemodus; nur Platzhaltertext.
- Keine echten Bild-/Symbolassets; nur sichere Platzhalter.
- Keine vollständige Diagnostik A–F; nur ein Support-orientierter Einstieg.
- Narrow-/Tablet-Layout ist per CSS vorbereitet, aber in diesem Lauf nicht mit echtem Gerät geprüft.
- Vite/Rolldown bleibt als späteres Technikthema offen, falls die App wieder auf einen Standard-Vite-Build wechseln soll.

## Nächste kleinste Änderungen

1. Slice 3: Supportzustände sichtbarer machen und für Kinderpfad ein klares Ende/Weiter-Feedback ergänzen.
2. Slice 4: Erste echte Übungspakete für weitere Silbenwörter mit gleicher Struktur ergänzen.
3. Slice 5: Lehrerzusammenfassung um eine bewusst auslösbare lokale Export-/Kopieransicht erweitern, weiterhin anonym.
