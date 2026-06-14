# Mega Expansion Slice D - Review, Memory und Roadmap

Stand: 2026-05-26

## Kurzbewertung

Slice C ist insgesamt abnahmefähig als erster kontrollierter Ausbaupfad. Bus und Buch wurden nicht als lose Wortliste in den Kindermodus gekippt, sondern als gegatete Mini-Reisen mit Daten, lokaler Symbolik, Lehrkraft-Rationale, Readiness-Logik und Tests ergänzt.

Bewertung: GRUEN mit Beobachtungspunkt.

Beobachtungspunkt: Buch bleibt fachlich sensibler als Bus, weil `ch` nicht als einfache frühe Graphem-Einheit behandelt werden sollte. Die aktuelle Umsetzung markiert Buch konservativ als lehrkraftgeführt/Einheiten-abhängig; das ist richtig und sollte bei weiteren Wörtern beibehalten werden.

## Geprüfte Artefakte

- Code-Report Slice C: `reports/mega-expansion-slice-c-code-report.md`
- App-Quellen:
  - `src/lesewerk-content.mjs`
  - `src/App.tsx`
  - `src/styles.css`
- Build-Artefakt lokal über `dist/`

## Verifikation

### Tests und Build

Ausgeführt im Projektverzeichnis `/Users/zondrius/hermes-workspace/projects/lesewerk-v1`:

```text
npm test && npm run build
```

Ergebnis:

- `npm test`: grün, 228/228 Tests bestanden.
- `npm run build`: grün, Exit Code 0.

### App-Ladecheck

Lokal gestartet über:

```text
python3 -m http.server 4173 -d dist
```

Browser-Check:

- URL: `http://127.0.0.1:4173/`
- Titel: `LeseWerk V1`
- App lädt ohne sichtbaren Blank Screen.
- Browser-Konsole/DOM-Check zeigte keine externen Bilder; nur lokale Assets aus `dist/assets/app.css` und `dist/assets/app.js`.

### Kindermodus-Ruhe

Sichtbarer Einstieg im Kindermodus bleibt ruhig und kindnah:

- `Wir lesen langsam. Du darfst eine Hilfe wählen. Alles in Ruhe.`
- `Schau. Klatsch. Lies.`
- `Du darfst eine Hilfe wählen. Wir lesen ohne Eile.`
- Steuerung bleibt mit wenigen klaren Handlungen: Starten, Weiter, Nochmal ruhig, Fertig.

Keine neue Score-, Timer-, Ranking- oder Notenlogik im getesteten Kinderpfad erkennbar.

### Bus/Buch-Integration

Geprüft über Code- und DOM-Sichtung:

- `src/App.tsx` importiert und nutzt `getBusFamilyMiniJourney` und `getBuchFamilyMiniJourney`.
- `WordFamilyJourneyAnchor` enthält `Bus` und `Buch`.
- Lokale Symbolkomponenten für Bus und Buch sind vorhanden.
- Lehrkraftbereich zeigt Bus/Buch als gegatete Mini-Reisen mit Einheitenhinweis.
- Der zuvor korrigierte Fehler aus Slice C ist nicht mehr sichtbar: Die Kachel benennt `Bus` als eigenes Wort, nicht pauschal `Ball`.

### 390px-/Mobilrisiko

Direkter echter 390px-Viewport konnte in dieser Werkzeugumgebung nicht vollständig emuliert werden. Die Prüfung ist deshalb als Risikoprüfung, nicht als endgültiger Mobile-Smoke zu lesen.

Indizien für geringe Quer-Scroll-Gefahr:

- CSS enthält mehrere enge Breakpoints (`max-width: 560px`, `640px`, `760px`).
- Kartenraster nutzen `minmax(min(100%, ...), 1fr)` und `max-width: 100%`.
- Lange Preview-Texte haben `overflow-wrap: anywhere`.
- Lokale Browserprüfung bei Standardbreite zeigte `documentElement.scrollWidth === innerWidth`.

Offen bleibt: ein echter 390px-Smoke mit DevTools/Playwright oder manuell im Browser. Vor einem größeren UI-Slice sollte dieser Check nachgeholt werden.

### Externe Assets und geschützte Medien

Quellen-/DOM-Check:

- Keine externen Bild-URLs im geladenen DOM.
- Neue Bus/Buch-Symbole sind lokale CSS-/DOM-Formen, keine Metacom-/PCS-/Boardmaker-/Widgit-/ARASAAC-Assets.
- Keine neuen Cloud-, Tracking- oder Upload-Funktionen festgestellt.

### Drucksprache / verbotene Begriffe

Die Quellensuche findet viele Treffer in älteren Reports und in bewusst negierenden Sicherheitsformulierungen, z. B. `keine Diagnose`, `kein Test`, `safetyNote`. Für Slice C selbst ergab die Prüfung keine neu eingeführte Leistungs-/Schamlogik.

Zu beachten: Eine reine Regex-Suche auf `Note` erzeugt viele False Positives durch technische Felder wie `safetyNote`. Für künftige Gates sollte die Suche zwischen sichtbarer Kindersprache, Lehrkraft-Sicherheitsformulierung und technischen Bezeichnern unterscheiden.

## Stärken

1. Der Ausbau ist kontrolliert: zwei neue Mini-Reisen statt ungeordneter Massenliste.
2. Bestehende Reisen Mama, Sofa, Tasse, Ball und Lama bleiben durch Tests abgesichert.
3. Bus ist didaktisch stark: kurz, alltagsnah, bildhaft, gute Handlung.
4. Buch ist schulnah und sinnvoll, aber korrekt vorsichtig wegen `ch` behandelt.
5. Lokale Sicherheit bleibt erhalten: keine externen Assets, kein Speichern, keine echten Schülerdaten.
6. Die Testbasis ist stark genug, um weitere kleine Slices zu tragen.

## Schwächen / Risiken

1. Mobile-390px ist noch nicht endgültig durch echten Viewport belegt.
2. Mini-Reisen sind weiterhin relativ manuell in Daten, UI, CSS und Tests verteilt; weitere Expansion erhöht Duplikationsrisiko.
3. Buch kann fachlich überfordern, wenn `ch` im Unterrichtskontext nicht vorbereitet ist.
4. Der Lehrkraftbereich ist funktional, aber mit wachsender Zahl von Reise-/Readiness-Blöcken potenziell zu dicht.
5. Regex-Sicherheitschecks sind aktuell laut, weil Reports und technische Feldnamen viele False Positives erzeugen.

## Memory-/Handoff-Bewertung

Dauerhaftes Learning ist sinnvoll, aber nicht als personenbezogene Memory. Der Kern ist ein allgemeiner LeseWerk-/GE-App-Workflow:

- Neue Mini-Reisen brauchen immer Daten + UI + CSS-Symbol + Readiness/Rationale + Tests + Build + Browser-/Mobile-Smoke.
- Kleine Slices funktionieren besser als Mega-Prompts.
- Nach jedem Inhalts-Slice keine nächste Wortexpansion starten, bevor Tests, Build, Mobile-Smoke und kurzer Reviewbericht grün sind.

Diese Punkte sind nicht personenbezogen und enthalten keine Schülerdaten. Sie dürfen in Hermes-Memory/Handoff als allgemeine Projektregel geführt werden.

## Nächste 3 Slices

### Slice E - Echter Mobile-Smoke und Selector-Ruhe

Ziel: Bus/Buch auf 390px wirklich prüfen, bevor weitere Inhalte folgen.

Akzeptanz:

- App im echten 390px-Viewport öffnen.
- Kinderpfad starten und eine Mini-Reise-Station prüfen.
- Lehrkraftbereich bis Bus/Buch-Readiness prüfen.
- Nachweis: kein Quer-Scroll, keine abgeschnittenen Buttons, keine Textüberlagerung, Touch-Ziele ausreichend groß.
- Kurzer Report mit Screenshot- oder Messwert-Hinweis.

### Slice F - Kleine zentrale Mini-Reise-Definition

Ziel: Duplikation reduzieren, ohne großen Refactor.

Akzeptanz:

- Eine kleine Source-Struktur für wiederkehrende Mini-Reise-Felder entwerfen oder minimal einführen.
- Nicht automatisieren: didaktische Rationale, komplexe Grapheme, Story-Auswahl und Readiness-Status bleiben fachlich geprüft.
- Bestehende Reisen bleiben unverändert spielbar.
- Tests und Build grün.

### Slice G - Apfel als Essens-Mini-Reise, nur nach Gate

Ziel: Eine weitere alltagsnahe Familie ergänzen, wenn Mobile und Architektur stabil sind.

Akzeptanz:

- Apfel nur aufnehmen, wenn die Matrix/Graphemprüfung bestätigt, wie `pf` oder komplexe Einheiten didaktisch geführt werden.
- Fünf Schritte: Bild, Silbe/Wortmuster, Wort, Satz, Mini-Geschichte.
- Maximal zwei Story-Karten.
- Lokales CSS-Symbol, keine externen Assets.
- Readiness/Rationale im Lehrkraftbereich.
- Tests, Build, Mobile-Smoke.

## Entscheidungsempfehlung

Nicht sofort weitere Wörter ergänzen. Erst Slice E durchführen, dann Slice F klein halten, danach erst Apfel oder eine andere fachlich leichtere Essensreise beginnen.

Für die aktuelle Mega Expansion gilt: Bus/Buch sind als erster großer Inhaltsslice akzeptabel. Der nächste Engpass ist nicht Wortmenge, sondern Mobile-Nachweis und eine etwas robustere Expansionsstruktur.
