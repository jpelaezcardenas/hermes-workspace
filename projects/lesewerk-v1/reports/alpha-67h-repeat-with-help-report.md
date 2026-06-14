# Alpha 67H - Nochmal mit Hilfe im Mini-Reise-Fokus

Status: abgeschlossen am 2026-05-20

## Ergebnis

Die Sofa-Mini-Reise hat jetzt im Kind-Fokus neben `Nochmal` eine zweite ruhige Wiederholungsoption: `Nochmal mit Hilfe`.

Der Button bleibt lokal in der aktuellen Station, speichert nichts, bewertet nichts und aktiviert nur eine kleine Hilfeschicht fuer den Moment:

- Hinweis: `Wir schauen langsam. Erst die Silben, dann das Wort.`
- Marker: `erst schauen`, `dann lesen`
- Die Hilfe wird beim Wechsel zur naechsten Station wieder zurueckgesetzt.

## Umsetzung

- Neuer lokaler Zustand `mamaJourneyHelpActive` fuer die aktuelle Mini-Reise.
- Reset beim Start, beim Weitergehen und beim Rueckweg zur Lehrkraft.
- Neue Hilfe-Box im Kind-Fokus der Mini-Reise.
- Ruhige visuelle Hervorhebung des Fokus-Symbols, ohne Punkte, Timer, Diagnose oder Ranglogik.

## Verifikation

- `npm test -- --run`: 184/184 Tests gruen.
- `npm run build`: erfolgreich.
- Browser-Smoke Desktop: erfolgreich.
- Browser-Smoke Mobile: erfolgreich.
- Kein horizontaler Overflow im Hilfezustand oder auf der Abschlusskarte.

## Browser-Smoke

Gepruefter Ablauf:

1. Lehrkraft oeffnen.
2. Sofa-Pfad auswaehlen.
3. Sofa-Mini-Reise starten.
4. Station 1 oeffnen.
5. `Nochmal mit Hilfe` aktivieren.
6. Hilfe-Box sichtbar und inhaltlich korrekt.
7. `Weiter` setzt die Hilfe zurueck.
8. Reise laeuft ueber Silbe, Wort, Satz und Mini-Geschichte bis zur Abschlusskarte.

Screenshots:

- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/reports/smoke/alpha67h-desktop-help.png`
- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/reports/smoke/alpha67h-desktop-finish.png`
- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/reports/smoke/alpha67h-mobile-help.png`
- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/reports/smoke/alpha67h-mobile-finish.png`

## Bewertung

Alpha 67H ist fachlich sinnvoll: Kinder bekommen eine zweite, sichere Wiederholungsform, die nicht nach Fehler klingt. Das passt gut zum GE-Kontext, weil die Hilfe sichtbar, langsam und konkret ist, aber keine Lehrkraft-Diagnostik in den Kindermodus zieht.

Naechster guter Schritt waere ein weiterer Mini-Reise-Slice, zum Beispiel `Tasse`, oder eine kleine Lehrkraft-Ansicht, die zeigt, welche Mini-Reisen schon visuell und didaktisch auf diesem Niveau sind.
