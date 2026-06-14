# LeseWerk Alpha 10 – Final Watchdog Review

Datum: 2026-05-17
Status: ACCEPT
Rolle: Neva Final Watchdog nach Slice C

## Kurzfazit

Alpha 10 ist als kleine, lokale Lehrkraft-Kuratierung für den bestehenden Alpha-9-Tagesweg akzeptiert. Die Umsetzung bleibt datensparsam, kinderseitig ruhig und begrenzt die tägliche Auswahl sichtbar auf maximal vier Karten. Die vollständige Bibliothek bleibt erreichbar, aber sekundär.

## Geprüfte Grundlage

Gelesen/geprüft:

- `reports/product-spec.md`
- `reports/alpha-10-goal-prompt.md`
- `reports/alpha-10-curation-blueprint.md`
- `reports/alpha-10-curation-implementation-report.md`
- `reports/alpha-10-ge-usability-review.md`
- `src/App.tsx`
- `src/lesewerk-content.mjs`
- `src/styles.css`
- `tests/lesewerk-content.test.mjs`

Hinweis: Die Slice-Reports und Tests beschreiben und belegen die Alpha-10-Zielgrenze: lokale Auswahl aus vorhandenen Aufgaben/Stories, maximal vier Karten, Fallback auf sicheren Standardpfad, keine neue Inhaltsausweitung.

## Automatisierte Checks

### `npm test`

Ergebnis: bestanden.

- 47 Tests ausgeführt
- 47 bestanden
- 0 fehlgeschlagen

Relevante Testabdeckung laut Ausgabe:

- Alpha-10-Tagesweg zuerst, vollständige Bibliothek sekundär
- Lehrkraft-Kuratierung nur aus vorhandenen Tasks und Stories
- Max-vier-Regel
- leerer Kuratierungszustand fällt auf sicheren Alpha-9-Standardpfad zurück
- kuratierter Kinderpfad nutzt exakt ein bis vier ausgewählte Karten
- lokale Kuratierung, Reset-Fallback und Datenschutzsprache in der Lehrkraft-UI
- keine Timer-, Noten-/Ranking- oder Diagnose-Sprache in kinderseitiger App-Kopie

### `npm run build`

Ergebnis: bestanden.

Pipeline: `tsc -b && node scripts/build.mjs`

## Browser-Check

Frischer lokaler Server:

- `python3 -m http.server 4410 -d dist`
- URL: `http://127.0.0.1:4410/?alpha10-watchdog=1`

Geprüft im Browser:

1. Alpha-10-Header sichtbar: `LESEWERK ALPHA 10 · LOKALE DEMO`.
2. Lehrkraftbereich sichtbar und erreichbar.
3. Sektion `Tagesweg wählen` sichtbar.
4. Hinweis `Maximal vier Karten aus vorhandenen Aufgaben und Stories` sichtbar.
5. Ohne Auswahl wird der sichere Standardpfad angezeigt: `Heute nutzt der Kinderpfad den sicheren Alpha-9-Standard.`
6. Nach vier ausgewählten Karten erscheint `4 von 4 Karten vorbereitet.`
7. Nicht ausgewählte weitere Karten werden danach deaktiviert; vier ausgewählte Karten bleiben aktiv.
8. Wechsel in den Kinderpfad zeigt die kuratierte Auswahl: `4 vorbereitete Karten. Alles in Ruhe.`
9. Kindlicher Tagesweg enthält die vier ausgewählten Karten, z. B. `Bild und Wort Mond`, `Bild und Wort Ball`, `Kurze Story Der Ball im Garten`, `Kurze Story Die Tasse auf dem Tisch`.
10. Die vollständige Bibliothek bleibt sekundär über `Alle Wörter und Geschichten öffnen`.
11. Eine Wortaufgabe öffnet korrekt, z. B. `Bild und Wort – Mond`, mit ruhiger Aufgabenstellung `Schau. Wähle Mond.`
12. Eine Story-Aufgabe öffnet korrekt, z. B. `Mini-Story – Der Ball im Garten`.
13. Eine Story-Antwort erreicht Feedback: `Gut gelesen. Du hast ruhig gearbeitet.` plus sachlicher Hinweis `Du hast die wichtige Sache erkannt.`
14. Reset stellt den sicheren Standardzustand wieder her; danach zeigt die Lehrkraftsektion wieder den Standardpfad-Hinweis.
15. Lokale Druckvorschau/Datenschutztext bleibt sicher: nur aktueller anonymer Demo-Stand, keine echten Namen, keine diagnostische Einordnung, keine Fotos, keine Cloud, keine Datei, keine Online-Übertragung und keine automatische Speicherung.

## Forbidden-Pattern-Check

Aktive Produktdateien geprüft:

- `src/App.tsx`
- `src/lesewerk-content.mjs`
- `src/styles.css`
- `tests/lesewerk-content.test.mjs`

Gesucht nach Mustern zu:

- echten Namen
- Diagnosen
- Noten, Scores, Ranking
- Timer, Geschwindigkeit, Zeitdruck
- Login, Cloud, Backend, Upload, Auth, Export
- beschämender Fehler-/Scham-Sprache

Ergebnis:

- Keine produktive problematische Nutzung gefunden.
- Treffer in App/Texten wie `keine diagnostische Einordnung`, `keine Cloud`, `keine Online-Übertragung` sind Schutz- und Datenschutzformulierungen, keine Funktionsversprechen in riskante Richtung.
- Treffer in Tests sind überwiegend Negativprüfungen gegen unsichere Sprache/Funktionen.
- `export`-Treffer in `src/lesewerk-content.mjs` sind JavaScript-Modul-Exports, keine Exportfunktion für Daten.

## Datenschutz- und GE-Check

Bestanden.

- Keine echten Schülernamen.
- Keine Diagnosen oder medizinischen Festlegungen.
- Kein Login, keine Cloud, kein Backend, kein Upload.
- Keine automatische Speicherung personenbezogener Daten.
- Farbprofile bleiben anonym.
- Lehrkraftsprache bleibt vorsichtig: Vorschlag, Beobachtung, nächster kleiner Schritt.
- Kindersicht bleibt ohne Noten, Ranking, Timer oder Tempo-Druck.

## Stärken

- Die Kuratierung löst ein echtes Unterrichtsproblem: die Lehrkraft kann den Tagesweg vorbereiten, ohne die Kinder mit der ganzen Bibliothek zu konfrontieren.
- Maximal vier Karten ist sichtbar, technisch begrenzt und kinderseitig nachvollziehbar.
- Der Fallback ist sicher: Ohne Auswahl bleibt der Alpha-9-Standardpfad aktiv.
- Die vollständige Bibliothek ist nicht entfernt, aber klar sekundär.
- Reset ist sinnvoll: lokaler Demo-Zustand kann ohne Risiko zurückgesetzt werden.

## Schwächen / verbleibende Hinweise

- Der Lehrkraftbereich ist funktional, aber durch Planungsübersicht, Beobachtungskarte und Druckvorschau weiterhin relativ informationsdicht.
- Die Kuratierung ist lokal im Demo-Zustand; das ist datenschutzfreundlich, aber im echten Alltag noch keine persistente Wochenplanung.
- Die Inhaltsqualität wächst nicht durch Alpha 10; Alpha 10 verbessert Auswahl und Steuerung, nicht die Breite der Aufgaben.

Diese Punkte blockieren Alpha 10 nicht.

## Entscheidung

Alpha 10 wird akzeptiert.

Begründung:

- Tests bestanden.
- Build bestanden.
- Browser-Kernflüsse bestanden.
- Max-vier-Verhalten sichtbar und wirksam.
- Kuratierter Tagesweg erscheint kinderseitig.
- Fallback und Reset funktionieren.
- Datenschutz- und GE-Grenzen bleiben eingehalten.

## Empfehlung Alpha 11

Alpha 11 sollte klein bleiben und nicht als breite Content-Erweiterung starten.

Empfohlener nächster Slice:

`Alpha 11: Adaptive Vorschläge im Lehrkraftbereich sichtbarer und nutzbarer machen`

Ziel:

- Aus den bestehenden anonymen Beobachtungssignalen einen sehr kleinen, vorsichtigen Vorschlag für den nächsten Tagesweg ableiten.
- Keine automatische Entscheidung, keine Diagnose, kein Scoring.
- Die Lehrkraft sieht: `Vorschlag`, `Begründung aus sichtbarer Beobachtung`, `Alternative`, `manuell übernehmen`.

Akzeptanzgrenze:

- maximal ein kleiner Vorschlagsblock;
- Vorschlag bleibt manuell und lokal;
- keine neuen Inhalte nötig;
- keine Schülerdaten;
- keine Statistik, Ranking oder Verlaufsauswertung;
- Browser-Test: Vorschlag kann in Tagesweg-Auswahl übernommen oder ignoriert werden.

Nicht empfohlen für Alpha 11:

- breite Inhaltsausweitung;
- Klassenverwaltung;
- Speicherung über Sitzungen hinweg;
- Export-/Upload-Funktionen;
- automatische Förderdiagnostik.
