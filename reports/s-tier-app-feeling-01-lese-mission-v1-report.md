# S-Tier App Feeling 01 – Lese-Mission v1

## Ergebnis
- In `src/App.tsx` wurde eine neue child-facing Lese-Mission v1 als Fokusmodus ergänzt.
- Im Alpha-73 Materialkorb gibt es jetzt den Startbutton „Als Lese-Mission starten“; er erscheint nur bei vorhandenen ausgewählten Wörtern.
- Die Mission nutzt deterministisch die ersten bis zu 3 ausgewählten Wörter und reuses den bestehenden `FocusGameShell`-Pfad.

## Verifikation
- `npm test -- --run` ✅
- `npm run build` ✅
- Source checks ✅
  - Lese-Mission vorhanden
  - Materialkorb-Launchbutton vorhanden
  - FocusGameShell-Fokuspfad verwendet
  - Mini-Assistent sichtbar
  - manueller Kartentyp sichtbar
  - keine Score-/Timer-Sprache im neuen Slice

## Hinweise
- Die Mission ist bewusst als vertikale Slice gehalten: Start, Wort, Aktion, Finish.
- Die bestehende App-Struktur, Materialkorb, Presets, Mini-Assistent und Druckkarten bleiben erhalten.

## Codex-Nachprüfung 2026-05-31
- Korrektur ergänzt: Die Mission geht jetzt wirklich durch bis zu 3 ausgewählte Materialkorb-Wörter, statt nur `items[0]` zu zeigen.
- Dafür wurde ein `leseMissionItemIndex` ergänzt; nach jeder Aktion springt die Mission zum nächsten Wort oder in den Abschluss.
- Korrektur ergänzt: Der Vollbild-Start setzt die Mission jetzt direkt auf den ersten Wort-Schritt, damit nach dem FocusGameShell-Start keine falsche Zwischenkarte erscheint.
- Korrektur ergänzt: Die äußere FocusGameShell erkennt den Abschluss der Lese-Mission jetzt über `leseMissionStep === 'finish'`.
- Korrektur ergänzt: Der Start aus dem Materialkorb wechselt jetzt bewusst in den Kinderpfad, damit der FocusGameShell-/Vollbildmodus wirklich sichtbar wird.
- CSS-Formatierung der neuen Lese-Mission-Regeln wurde bereinigt.
- Danach erneut Tests, Build, Source-Checks und Browser-Sichtprüfung geprüft.

## Codex-Sichtprüfung 2026-05-31
- Lokal geöffnet unter `http://127.0.0.1:5174/`.
- Im Lehrkraftbereich drei Wörter vorbereitet: Stift, Heft, Buch.
- `Als Lese-Mission starten` öffnet den Fokusspiel-Start im Kinderpfad.
- Nach `Mission starten` erscheint `Wort 1 von 3 · Anschauen`.
- Ablauf geprüft: Wort 1 Stift → Handlung → Wort 2 Heft → Wort 3 Buch → Abschluss.
- Abschlusskarte `Die Lese-Mission ist fertig.` sichtbar.

## S-Tier App Feeling 02 – Codex-Designslice 2026-05-31
- Fokusmodus visuell verdichtet: Im laufenden Spiel wird die alte Leseleiter/Orientierungsstrecke ausgeblendet, damit die Lese-Mission wie ein eigener Spielraum wirkt.
- Lese-Mission ergänzt um Spielbühne, Neva-Helfer, Fortschrittschips, große Wortkarte, Bild-/Symbolfläche, farbige Silbenchips, Handlungskarte und ruhigere Abschlusskarte.
- Mobile Ansicht nachgearbeitet: kompaktere Kopfzeile, sichtbarer Weiter-Button, weniger Nebentext im ersten Sichtfenster.
- Browser-Sichtprüfung: Start im Lehrkraftbereich → Stift/Heft/Buch vorbereiten → Lese-Mission starten → Wort 1 sichtbar → Handlung → Wort 2 → Wort 3 → Abschluss. Keine Leseleiter mehr im laufenden Fokusmodus.
- Verifikation erneut: `npm test -- --run` mit 240/240 Tests und `npm run build` erfolgreich.

## S-Tier App Feeling 03 – Lokale Symbolkarten 2026-05-31
- Der reine Buchstaben-/Bildplatzhalter wurde durch lokale CSS-Symbolkarten ersetzt.
- Unterstützte Symboltypen u. a.: Stift, Heft, Buch, Ball, Bus, Sofa, Tasse, Tisch, Apfel sowie einfache Fallbacks für Brot, Banane, Wasser, Hand, Schuh und Jacke.
- Keine externen Bilder, keine Uploads, keine geschützten Bilddaten; alles lokal im Code gerendert.
- Browser-Sichtprüfung: Stift zeigt `lese-mission-local-symbol--stift`, Heft zeigt `--heft`, Buch zeigt `--buch`; Abschluss weiterhin erreichbar.
- Verifikation erneut: `npm test -- --run` mit 241/241 Tests und `npm run build` erfolgreich.
