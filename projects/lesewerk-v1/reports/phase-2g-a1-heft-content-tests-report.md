# Phase 2G-A1 - Heft Content Tests Recovery

## Ergebnis

Heft ist als neuer kontrollierter schulnaher Mini-Reise-Anker eingebaut.

## Umgesetzt

- `src/lesewerk-content.mjs`
  - `Heft-Familie` in die Wortfamilien-Definitionen aufgenommen.
  - `Heft` als zulässige lokale Silbe im Profilmodell ergänzt.
  - Fünf Stationen ergänzt: Bild, Silbe, Wort, Satz, Mini-Geschichte.
  - Satzanker: `Das Heft ist da.`
  - Lehrkraft-Rationale ergänzt: Heft ist schulnah und ruhig zeigbar; Brot und Keks bleiben für später.

- `src/App.tsx`
  - `Heft` als Mini-Reise-Anker typisiert.
  - Heft nutzt die vorhandene lokale Buch/Heft-Symbolstruktur ohne externe Medien.
  - Heft bekommt eigene Story-Auswahl: `Das Heft ist da.` gegen `Das Buch ist da.`

- `tests/lesewerk-content.test.mjs`
  - Neuer Phase-2G-A1-Testblock für Heft.
  - Bestehende Erwartungslisten erweitert, damit Heft bewusst Teil des Mini-Reise-Systems ist.

## Verifikation

- `node --test --test-name-pattern="Phase 2G-A1" tests/lesewerk-content.test.mjs`
  - 3/3 grün
- `npm test`
  - 236/236 grün
- `npm run build`
  - grün

## Bewertung

Grün. Heft ist jetzt fachlich kontrolliert verfügbar, aber nicht im frühesten Default-Pfad. Der Slice bleibt eng und erweitert die vorhandene Struktur statt eine neue Oberfläche aufzubauen.

## Nächster sinnvoller Slice

Phase 2G-B sollte nur die visuelle Qualität von Heft prüfen und verbessern:

- Heft-Symbol im Kindmodus sichtbar gegen Buch/Tisch abgrenzen.
- Schmale Breite prüfen.
- Kein neuer Content, keine neuen Wörter.
- Browser-Smoke mit einem passenden Heft-Profil.
