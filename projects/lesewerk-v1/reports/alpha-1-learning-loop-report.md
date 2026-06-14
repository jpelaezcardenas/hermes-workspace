# LeseWerk Alpha 1 - Learning Loop Report

Stand: 2026-05-16

## Kurzfazit

LeseWerk Alpha 1 ist als lokaler, eigenständiger App-Stand testbar. Der Hermes-Lauf wurde zwar durch das interne Iterationslimit blockiert, hat aber die wesentlichen Alpha-1-Anforderungen umgesetzt. Die fehlende Abschlusskontrolle wurde anschließend durch Codex nachgeholt.

Entscheidung: **Alpha 1 ist als erster vollständiger Lernkreislauf erreicht. Weiterbauen.**

## Geänderte Dateien

- `src/App.tsx`
- `src/lesewerk-content.mjs`
- `src/styles.css`
- `tests/lesewerk-content.test.mjs`
- `dist/`

## Was als Endprodukt jetzt existiert

Die App enthält jetzt:

- child-first Startscreen;
- anonyme Profilwahl;
- sichtbare aktive Hilfen;
- vollständigen Kinder-Lernkreislauf: Profil -> Hilfe -> Aufgabe -> Feedback -> Nochmal/Leichter/Weiter/Fertig -> Abschluss;
- mindestens 18 strukturierte Placeholder-Aufgaben über Level A, B und C;
- Silben-/Wortdarstellung mit blau-roter Struktur, wo passend;
- Hilfen: Bildhilfe, Silbenfarben, Vorlesen-Platzhalter, Gebärden-Hinweis, Weniger Auswahl, Nochmal;
- Abschlussbildschirm ohne Punkte, Timer, Ranking oder Fehlerdruck;
- Lehrerbereich mit Profil, Aufgabenweg, Hilfen, Beobachtung, grober vorsichtiger Einordnung, Datenqualität, nächstem Schritt und Reset;
- lokale Speicherung nur für anonyme Demo-Daten.

## Tests und Build

Ausgeführt:

```bash
npm test
npm run build
```

Ergebnis:

- `npm test`: erfolgreich, 7/7 Tests bestanden.
- `npm run build`: erfolgreich.

## Lokale visuelle Kontrolle

Frischer lokaler Build geöffnet unter:

```text
http://127.0.0.1:4184/
```

Der Browser zeigte den neuen Alpha-1-Stand mit:

- `LeseWerk Alpha 1 · lokale Demo`;
- 18 Aufgaben im Kinderpfad;
- aktiven Hilfen;
- Button `Ich bin fertig`;
- Feedbackphase;
- Buttons `Nochmal`, `Leichter`, `Weiter`, `Fertig`;
- Abschlussbildschirm;
- Lehrerbereich mit Aufgabenweg, Datenqualität und Reset.

## Verifizierter Kinderpfad

Geprüfter Pfad:

1. App öffnen.
2. `Profil Grün` wählen.
3. `Bildhilfe` aktivieren.
4. Aufgabe starten.
5. `Ich bin fertig` wählen.
6. Feedbackphase erscheint.
7. `Nochmal` wählen.
8. Erneut abschließen.
9. `Weiter` wählen.
10. Erneut abschließen.
11. `Fertig` wählen.
12. Abschlussbildschirm erscheint.

Ergebnis: bestanden.

## Verifizierter Lehrerpfad

Geprüfter Pfad:

1. Nach Kinderpfad in `Lehrkraft` wechseln.
2. Lehrerbereich zeigt anonymes Profil.
3. Aufgabenweg wird sichtbar.
4. Genutzte Hilfen werden sichtbar.
5. Beobachtung bleibt neutral.
6. Datenqualität wird angezeigt.
7. Nächster kleiner Lernschritt wird angezeigt.
8. `Lokalen Demo-Stand zurücksetzen` ausführen.

Ergebnis: bestanden. Nach Reset zeigt die App wieder wenige Beobachtungen und ein anonymes Standardprofil.

## Datenschutz- und Didaktikcheck

Bestanden:

- keine echten Schülernamen;
- keine Diagnosen;
- keine Noten;
- keine Ranglisten;
- kein Timer;
- kein Score;
- kein Login;
- keine Cloud;
- keine geschützten Assets;
- keine gespeicherten Zugangsdaten;
- keine Abhängigkeit zum bestehenden `ge-lernwerkstatt`-Projekt im geprüften Codebereich.

Die Sprache bleibt überwiegend ressourcenorientiert und vorsichtig. Der Lehrerbereich formuliert als Beobachtung und nächsten Lernschritt, nicht als endgültiges Urteil.

## Warum Hermes trotzdem blockierte

Der Kanban-Task blockierte nicht wegen eines fachlichen oder technischen Fehlers, sondern wegen:

```text
Iteration budget exhausted (40/40)
```

Der Lauf hatte bereits Code, Tests und Build erledigt, aber nicht mehr genug interne Schritte für:

- finalen Browsercheck;
- Abschlussbericht;
- Kanban-Abschluss.

## Verbleibende Schwächen

- Die App ist Alpha, noch kein Pilotprodukt.
- Die 18 Aufgaben sind sichere Placeholder, noch kein geprüftes Vollmaterial.
- Audio/Vorlesen ist weiterhin Platzhalter.
- Bild-/Symbolhilfen sind nur Textplatzhalter.
- Tablet-Layout sollte in einem separaten Qualitätsslice geprüft werden.
- Teacher-View ist sinnvoll, aber noch nicht als echter Förderverlaufsbereich ausgebaut.

## Nächste empfohlene Goal-Kette

1. **LeseWerk Alpha 2 - Didaktische Aufgabenqualität**
   - echte Wort-/Silbenpakete systematischer machen;
   - Level A-C fachlich glätten;
   - einfache Sprache und GE-Fit prüfen.

2. **LeseWerk Alpha 3 - Visuelle App-Qualität**
   - Tablet-Layout;
   - Kindermodus auf weniger Reizlast;
   - bessere Kartenhierarchie;
   - Abschluss- und Feedbackscreen hochwertiger gestalten.

3. **LeseWerk Alpha 4 - Erste Mini-Geschichten**
   - 5 bildgestützte Mini-Lesegeschichten mit sicheren Platzhaltern;
   - einfache Verständnisfragen;
   - Lehrerhinweise für nächste Lernschritte.
