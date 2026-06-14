# Phase 2G-C - Heft Teacher Start Browser Report

Datum: 2026-05-26

## Ziel

Heft soll nicht automatisch im frühen Kinderpfad auftauchen, aber für die Lehrkraft bewusst prüfbar und startbar sein. Der Heft-Anker bleibt damit kontrolliert: schulnah, aber nicht zu früh freigeschaltet.

## Hermes-Verlauf

Hermes-Task: `t_843a8da1` - LeseWerk Phase 2G-C - Heft Teacher Start Browser

Neva hat den Task gestartet, hing danach aber ohne nutzbaren Fortschritt. Deshalb wurde der Task per CEO-Handoff übernommen, damit keine Blockier-Schleife entsteht.

## Umsetzung

- `h` wurde in die kontrollierten Graphem-Einheiten aufgenommen.
- `heft` wurde in die kontrollierten Silben-/Worteinheiten aufgenommen.
- Neuer Lehrkraft-Preset: `Heft prüfen`.
- Der Preset öffnet gezielt nur die Heft-Mini-Reise.
- Frühe Kinderprofile öffnen Heft weiterhin nicht automatisch.
- Die Startbeschriftung lautet bei Heft gezielt: `Heft-Mini-Reise starten`.

## Browser-Smoke

Geprüfter Pfad auf 390px Breite:

1. Lehrkraft öffnen.
2. `Heft prüfen` wählen.
3. `Heft-Mini-Reise starten` öffnen.
4. Im Vollbild-Fokusspiel `Mini-Reise starten` drücken.

Ergebnis:

- Heft ist sichtbar.
- Reise 1 von 5 ist sichtbar.
- Der Heft-Bildschritt ist erreichbar.
- Keine horizontale Überbreite: `390 / 390`.
- Keine Druckwörter wie Timer, Punkte, Score, falsch oder Fehler gefunden.

Screenshot:

`/Users/zondrius/hermes-workspace/projects/lesewerk-v1/reports/phase-2g-c-heft-stage-390.png`

## Verifikation

- Fokusprüfung: `6 / 6` Tests bestanden.
- Vollständiger Testlauf: `238 / 238` Tests bestanden.
- Build: erfolgreich.

## Nächster sinnvoller Schritt

Heft jetzt nicht sofort mit vielen Varianten aufblasen. Besser ist ein kleiner Qualitäts-Slice:

1. Heft visuell noch deutlicher als Schulmaterial inszenieren.
2. Einen zweiten Satz oder eine zweite Mini-Geschichte nur dann ergänzen, wenn die erste Reise im Kindermodus ruhig bleibt.
3. Danach erst ein weiteres schulnahes Wort prüfen, zum Beispiel `Mappe` oder `Stift`, aber wieder mit konservativer Freischaltung.
