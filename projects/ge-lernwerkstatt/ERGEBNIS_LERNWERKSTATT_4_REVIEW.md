# Review – Lernwerkstatt 4.0 Ist-Stand und Build-Baseline

Zeitpunkt: 2026-05-16 08:26:57 CEST

## Auftrag und Grenze

Dieser Review prüft den aktuellen Ist-Stand ohne Feature-Änderungen. Es wurden keine neuen App-Funktionen gebaut und keine Änderungen an `src/main.jsx`, `src/styles.css` oder `package.json` vorgenommen.

Gelesene Kontextdateien:

- `ERGEBNIS_LERNWERKSTATT_4.md`
- `README.md`
- `APP_KONZEPT.md`
- `LERNKREISLAUF_MODELL.md`
- `src/main.jsx`
- `src/styles.css`
- `package.json`
- ergänzend: `build-esbuild.mjs`

## Projektstruktur kurz

- React/Vite-App ohne Backend im Projektordner `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt`.
- Haupteinstieg: `src/main.jsx` mit App-Logik, Datenmodell, Views, Übungen, Export/Import und LocalStorage-Zugriff.
- Styling: `src/styles.css` mit Layout, Druckansicht, responsiven Regeln und Schüler:innen-/Übungsstyles.
- Build-Skripte in `package.json`:
  - `npm run start`: Vite Devserver auf `127.0.0.1`
  - `npm run build`: Vite/Rolldown Build
  - `npm run preview`: Vite Preview
  - `npm run build:esbuild`: vorhandener esbuild-Fallback
- `dist/` ist Build-Ausgabe und wurde durch den esbuild-Fallback neu erzeugt.
- Zusätzlich existiert ein Standalone-Prototyp unter `silben-werkstatt/`.

## Aktuelle Hauptfunktionen

Aus Code und Dokumentation ergeben sich aktuell diese Hauptbereiche:

1. Lehrkraft-Dashboard
   - heutige Beobachtungen, letzte Beobachtungen, offene Transferprüfungen, direkte Navigation zu Kernbereichen.

2. Beobachtungsformular
   - Erfassung pseudonymer Beobachtungen mit Kürzel/Farbe, Lernbereich, Kompetenz, 1–10-Einschätzung, Sicherheit, Hilfegrad, Transfer, konkreter Beobachtung und nächstem Lernschritt.
   - Warnlogik für potenziell sensible Freitexte.

3. Kompetenzraster
   - zehn GE-relevante Lernbereiche mit Kompetenzen, Indikatoren und Beobachtungsfragen.
   - Skala 1–10 ausdrücklich als pädagogische Einschätzung, nicht als Note/Diagnose/Testwert.

4. Auswertung, Verlauf, Druck und Export
   - pädagogische Einordnung, nächste Beobachtungsfrage, Förderplan-Formulierung, Teamgespräch, Wochenplanung, Markdown-/JSON-Export und Druckvorlagen.

5. Schüler:innenmodus Beta
   - alltagsnahe Stationen mit einfachen Schritten, Hilfe-/Pause-/Nochmal-Karten und sichtbarer Lernspur ohne Speicherung, ohne Punkte, ohne Ranking und ohne 1–10-Anzeige.

6. Übungsbibliothek
   - filterbare Übersicht direkt startbarer GE-Übungen mit Lernbereich, Niveau, Material, Lernhandlung und Beobachtungsfrage.

7. Interaktive Übungen
   - `Symbol-Sortiergarten 2.0`: Karten antippen, Ziel-Garten antippen, Niveau A/B/C, ruhiges Feedback, Lehrkraft-Lernspur ohne Speicherung.
   - `Mengen bis 5 legen`: Steine legen/wegnehmen, Menge wählen, Niveau A/B/C, Hilfeauswahl, keine Punkte/Timer/Ranking.

8. Eigene Stationen lokal ergänzen
   - lokale Ergänzung von Stationen über App-Zustand/LocalStorage.

## Build-Ergebnis

### Primärer Build

Befehl:

```bash
npm run build
```

Ergebnis: fehlgeschlagen.

Relevante Fehlermeldung:

```text
Error: Cannot find native binding. npm has a bug related to optional dependencies (https://github.com/npm/cli/issues/4828). Please try `npm i` again after removing both package-lock.json and node_modules directory.
...
Error: dlopen(.../node_modules/rolldown/node_modules/@rolldown/binding-darwin-arm64/rolldown-binding.darwin-arm64.node, 0x0001): ... code signature ... not valid for use in process: mapping process and mapped file (non-platform) have different Team IDs
...
Node.js v24.14.0
```

Einordnung: Der Fehler entsteht vor dem App-Bundling beim Laden des nativen Rolldown-Bindings für macOS/arm64. Der Befund spricht nicht für einen Syntax- oder React-Fehler im Lernwerkstatt-Code, sondern für ein lokales Tooling-/Native-Binding-Problem.

### Vorhandener Fallback-Build

Befehl:

```bash
npm run build:esbuild
```

Ergebnis: erfolgreich.

Ausgabe:

```text
dist/assets/main.js   283.8kb
dist/assets/main.css   12.3kb
Done in 120ms
esbuild fallback build complete: dist/
```

Damit existiert weiterhin eine lokale Build-Baseline über den bereits vorhandenen esbuild-Fallback.

## Kleinster Fix-Vorschlag bei primärem Buildfehler

Minimaler technischer Ansatz ohne App-Code-Änderung:

1. Zuerst bewusst keine Feature- oder Codeänderung vornehmen.
2. Lokale Dependencies sauber neu installieren, weil der Fehler im nativen Rolldown-Binding liegt:
   - `node_modules` entfernen und `npm install` neu ausführen.
   - Falls nötig zusätzlich `package-lock.json` erneuern.
3. Danach erneut `npm run build` testen.
4. Bis der Rolldown/macOS-Bindingfehler behoben ist, für lokale Prüfungen den vorhandenen Fallback `npm run build:esbuild` verwenden.

Hinweis: Das Entfernen von `node_modules` oder das Neuschreiben von `package-lock.json` wurde in diesem Task nicht ausgeführt, weil der Auftrag nur Prüfung/Bericht vorsah und keine Dependency-Reparatur freigegeben war.

## Risiken und offene Punkte

- `npm run build` ist aktuell nicht grün, solange das native Rolldown-Binding lokal nicht sauber geladen werden kann.
- Der erfolgreiche esbuild-Fallback bestätigt eine lokale Bundle-Baseline, ersetzt aber nicht vollständig den vorgesehenen Vite/Rolldown-Produktionsbuild.
- Browser-Interaktion wurde in diesem Slice nicht erneut ausgeführt; der Auftrag fokussierte Build-Baseline und Ist-Stand-Dokumentation.
- `dist/` wurde durch `npm run build:esbuild` neu geschrieben. Das ist Build-Ausgabe, keine Feature-Änderung.
- `src/main.jsx` ist sehr groß und bündelt Datenmodell, Views und Übungen in einer Datei. Das ist kein akuter Buildfehler, aber ein Wartbarkeitsrisiko für spätere Slices.
- Emoji/Icon-Nutzung bleibt Platzhalter-Charakter und ist nicht gleichzusetzen mit validierten UK-Symbolen.
- Pseudonyme LocalStorage-Daten bleiben sensible pädagogische Daten; echte Namen, Diagnosen und familiäre/medizinische Angaben müssen weiterhin vermieden werden.

## GE-/Datenschutz-Kurzcheck

- Keine neuen personenbezogenen Daten ergänzt.
- Keine Cloud, kein Login und kein Backend laut App-Konzept/README.
- Schüler:innenbereiche vermeiden sichtbar 1–10, Punkte, Timer und Ranking.
- 1–10 bleibt im Lehrkraft-/Beobachtungskontext und ist mehrfach als pädagogische Einschätzung ohne Diagnose-/Notenlogik markiert.

## Fazit

Der aktuelle Lernwerkstatt-4.0-Stand enthält eine lokale React-App mit Lehrkraft-Beobachtung, Kompetenzraster, Auswertung/Export, Schüler:innenmodus Beta, Übungsbibliothek sowie zwei interaktiven Übungen. Der primäre `npm run build` scheitert aktuell an einem lokalen nativen Rolldown/macOS-Bindingproblem. Die vorhandene esbuild-Fallback-Buildstrecke ist erfolgreich und erzeugt `dist/`.
