# Ergebnis: Symbol-Sortiergarten – gezielte Verbesserung

## Kurzfazit
Der bestehende Prototyp wurde nicht neu erfunden, sondern gezielt unterrichtstauglicher gemacht: Niveau A ist konkreter und basaler, die Karten arbeiten bild-/ikon-näher, die Lehrkraft-Lernspur nutzt überwiegend Auswahlfelder statt freier personenbezogener Notizen, und ein sicherer esbuild-Fallback dokumentiert das lokale Build-Problem mit Rolldown/macOS.

## Geänderte Dateien
- `src/main.jsx`
- `src/styles.css`
- `package.json`
- `build-esbuild.mjs`
- `ERGEBNIS_SYMBOL_SORTIERGARTEN.md`

## Didaktische Verbesserungen
- Niveau A wurde auf zwei sehr einfache Alltagskategorien reduziert: Essen und Anziehen.
- Die Aufgabenlogik verweist ausdrücklich auf echte Gegenstände vor der digitalen Symbolrunde.
- Karten und Zielgärten nutzen ikonische, lokale Emoji-Symbole statt externer Bilder, Fotos oder Bilddienste.
- Option `Bilder statt Wörter betonen` ergänzt: Icons werden in der UI stärker gewichtet, Wörter bleiben unterstützend sichtbar.
- Die Niveaus sind klarer gestuft:
  - A: basale Objekt-/Alltagszuordnung.
  - B: Orte im Alltag.
  - C: abstraktere Merkmalszuordnung.
- Rückmeldungen bleiben ruhig: keine Punkte, kein Timer, keine Sterne, kein Ranking.

## GE- und Datenschutzprüfung
- Keine echten Namen, Diagnosen, Fotos, Familieninformationen oder privaten Rohdaten ergänzt.
- Keine externe Bildquelle, kein Backend, kein Cloud-Sync.
- Spielstatus und Lernspur bleiben React-State; es wurde keine Speicherung für den Symbol-Sortiergarten ergänzt.
- Lehrkraft-Lernspur wurde entschärft:
  - Hilfeform als Auswahlfeld.
  - beobachteter Zugang als Auswahlfeld.
  - Beobachtungsfrage als Auswahlfeld.
  - nächster Schritt als sichere Auswahl.
  - optionales Textfeld mit Warnhinweis: nur kurze sichtbare Handlung/Material/Hilfe, keine personenbezogenen Daten.
- Restrisiko: Auch ein optionales Freitextfeld kann missbraucht werden. Deshalb ist es deutlich als optional und datensparsam markiert; produktive Dokumentation sollte getrennt und anonymisiert erfolgen.

## Technischer Testbericht
### Vite-Standardbuild
- Befehl: `npm run build`
- Ergebnis: fehlgeschlagen.
- Befund: Die Fehlermeldung zeigt `ERR_DLOPEN_FAILED` beim Laden von `@rolldown/binding-darwin-arm64`.
- Relevanter Kern: macOS meldet eine ungültige Code-Signatur beziehungsweise Team-ID-Konflikt beim nativen Rolldown-Binding.
- Einschätzung: Ja, der konkrete Fehler passt zu Rolldown/macOS-Code-Signing beziehungsweise nativer Binding-Ladung. Zusätzlich verweist Rolldown selbst auf optionale npm-Abhängigkeiten; hier ist aber die Code-Signatur der dominante Hinweis.

### Sichere Umgehung ohne Paketexperimente
- Ergänzt: `build-esbuild.mjs`
- Ergänzt: npm-Script `build:esbuild`
- Befehl: `npm run build:esbuild`
- Ergebnis: erfolgreich.
- Ausgabe:
  - `dist/assets/main.js`
  - `dist/assets/main.css`
  - `dist/index.html`
- Keine Neuinstallation, kein Löschen von `node_modules`, kein Paketexperiment, kein Commit/Push.

## Browser-/Touch-Prüfung
- Lokaler Browser-Check über `dist/` mit `python3 -m http.server 4174 --bind 127.0.0.1 --directory dist` durchgeführt.
- Seite lädt ohne Browser-Konsolenfehler.
- Navigation zum `Symbol-Sortiergarten` funktioniert.
- Interaktion geprüft: Karte `Apfel` antippen und im Ziel `Apfel/Essen` ablegen funktioniert; keine JS-Fehler.
- Visuelle Prüfung: große Karten, große Zielbereiche, ruhige Farben, keine offensichtlichen Überlappungen.
- Touch-nahe Kriterien erfüllt:
  - große Buttons und Karten,
  - klare Abstände,
  - responsive CSS-Regeln für einspaltiges Layout unter 980px/640px vorhanden,
  - keine kleinen Drag-only-Ziele; Bedienung per Antippen möglich.

## Tablet-/Touch-Checkliste für echte Hardware
Vor Unterrichtseinsatz auf einem echten Tablet prüfen:
- [ ] Sind Karten und Zielgärten mit Kinderhand sicher antippbar?
- [ ] Bleibt das Layout im Quer- und Hochformat ohne horizontales Scrollen nutzbar?
- [ ] Sind Icons groß genug erkennbar, wenn das Tablet auf dem Tisch liegt?
- [ ] Ist die Checkbox `Bilder statt Wörter betonen` für Lehrkräfte verständlich?
- [ ] Ist die Lehrkraft-Lernspur im Unterricht eher hilfreich oder lenkt sie vom Kind ab?
- [ ] Funktionieren Wiederholen, Pause und Niveauwechsel ohne Stress/Überraschung?
- [ ] Wirkt Niveau A mit echten Gegenständen vorab tatsächlich basal genug?

## Anti-Glaze-Bewertung
### Stärken
- Deutlich konkreter und bildnäher als vorher.
- Niveau A ist alltagsnäher und weniger sprach-/textlastig.
- Keine externen Bilddienste, keine Fotos, keine Speicherung.
- Lehrkraft-Lernspur ist stärker strukturiert und datensparsamer.
- esbuild-Fallback ermöglicht lokalen Build trotz Rolldown-Binding-Problem.

### Schwächen
- Emoji-Icons sind keine fachlich kuratierten UK-Symbole und können je nach Gerät leicht unterschiedlich aussehen.
- Keine echte Tablet-Hardware-Prüfung durchgeführt, nur Browser-/Layoutprüfung.
- Optionales Freitextfeld bleibt ein Datenschutzrisiko, auch wenn es begrenzt und gewarnt ist.
- Kein automatisierter UI-Test vorhanden.

### Risiken
- Kinder mit sehr basalem Symbolverständnis brauchen weiterhin reale Gegenstände; rein digital kann zu abstrakt bleiben.
- C-Level kann für viele GE-Schüler:innen noch deutlich zu abstrakt sein.
- Lehrkräfte könnten die Lernspur trotz Warnung als Dokumentationsersatz nutzen.
- Der Vite/Rolldown-Fehler bleibt im Standardbuild bestehen; der Fallback ist eine Umgehung, keine Ursachenbehebung im Dependency-Stack.

### Fehlende Belege
- Keine Erprobung mit Schüler:innen.
- Keine Rückmeldung aus Kollegium/Team.
- Keine echte iPad-/Android-Tablet-Prüfung.
- Keine Prüfung mit Screenreader oder UK-spezifischen Symbolsystemen.

### Qualitätshebel
- Wichtigster nächster Hebel: Niveau A mit realen Gegenständen im Unterricht testen und danach entscheiden, ob noch weniger Karten oder ein Ein-Karten-Modus nötig ist.
- Zweiter Hebel: Optional kuratierte lokale SVG-Piktogramme statt Emoji, aber nur datenschutzsicher und lizenzklar.

### Nächster Schritt
Chris sollte den Prototyp lokal öffnen, auf einem Tablet im Hoch- und Querformat prüfen und Niveau A einmal mit echten Gegenständen vorentlastet testen. Erst danach lohnt der nächste technische Ausbau.
