# Alpha 68B - Premium-Referenzeinheit Mama

Datum: 2026-05-21

## Ziel

Aus dem bestehenden Mini-Reise-Pfad `Bild -> Silben -> Wort -> Satz` sollte eine erste hochwertige Referenzeinheit entstehen. Fokus war nicht mehr Content, sondern bessere Orientierung, ein klareres Spielraum-Gefuehl und ein schoeneres kindseitiges Design.

## Umgesetzt

- Die Mini-Reise hat jetzt eine Premium-Spielraum-Buehne:
  - `mini-journey-premium-stage`
  - ruhige Hintergrundkomposition
  - zentrale Lernobjekt-Flaeche
  - klare aktuelle Ebene
- Die aktuelle Handlung wird sehr kurz angezeigt:
  - Bild: `Schau.`
  - Silben: `Lies langsam.`
  - Wort: `Lies ganz.`
  - Satz: `Lies den Satz.`
- Die Silben stehen jetzt als grosse, stabile Touch-/Leseflaechen:
  - `Ma` / `ma`
  - alternierend blau/rot gestaltet
- Das ganze Wort wird zusaetzlich sichtbar als Wortanker angezeigt.
- Die Pfadschritte zeigen neben `Bild`, `Silben`, `Wort`, `Satz` auch die kurze Handlung.
- Die Buttons wurden ruhiger und spielartiger:
  - `Nochmal`
  - `Hilfe`
  - `Weiter` / `Fertig`
  - `Zur Lehrkraft` ist visuell sekundaer
- Mama, Sofa, Tasse und Lama bleiben im vorhandenen Mini-Reise-System gueltig.
- Keine neuen Dependencies, keine externen Assets, keine echten Daten, kein Commit/Push/Deployment.

## Geaenderte Dateien

- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/src/App.tsx`
- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/src/styles.css`
- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/tests/lesewerk-content.test.mjs`

## Verifikation

- `npm test -- --run`: erfolgreich, 201/201 Tests bestanden.
- `npm run build`: erfolgreich.
- Desktop-Smoke unter `http://127.0.0.1:5212/`:
  - Lehrkraft -> `Mama-Mini-Reise starten` -> `Mini-Reise starten`
  - Premium-Stage sichtbar
  - zentrale Lernobjekt-Flaeche sichtbar
  - `Schau.` als Bild-Cue sichtbar
  - Pfad sichtbar: `Bild`, `Silben`, `Wort`, `Satz`
  - Cues sichtbar: `Schau.`, `Lies langsam.`, `Lies ganz.`, `Lies den Satz.`
  - Silben sichtbar: `Ma`, `ma`
  - Wortanker sichtbar: `Mama`
  - Buttons sichtbar: `Nochmal`, `Hilfe`, `Weiter`, `Zur Lehrkraft`
  - Hilfe-Box funktioniert
  - Weiter fuehrt zu `Silben` mit Cue `Lies langsam.`
  - kein horizontaler Overflow
  - keine Timer-/Punkte-/Ranking-/Noten-/Diagnose-/Cloud-/Upload-/Export-Woerter im Kindmodus gefunden
- Mobile-Smoke bei 390 x 844:
  - gleicher Pfad erfolgreich
  - kein horizontaler Overflow

## Screenshots

- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/reports/smoke/alpha68b-premium-mama-desktop-bild.png`
- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/reports/smoke/alpha68b-premium-mama-desktop-silben.png`
- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/reports/smoke/alpha68b-premium-mama-mobile-bild.png`
- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/reports/smoke/alpha68b-premium-mama-mobile-silben.png`

## Bewertung

Gruen fuer diesen Slice. Hermes hat die Umsetzung fachlich gut getroffen und Tests/Build bestanden. Der Abschluss scheiterte erneut am Iterationslimit und Port-/Browser-Smoke. Codex hat die finale Desktop-/Mobile-Pruefung, den Bericht und den Kanban-Abschluss uebernommen.

Naechster sinnvoller Schritt: Die Premium-Referenzeinheit visuell von Chris pruefen lassen. Danach nicht sofort alle Wortfamilien umbauen, sondern zuerst Alpha 68C: eine sehr kurze Premium-Satzszene fuer `Mama ist da.` oder `Das Lama ist da.` bauen und als Satz-Qualitaetsstandard festlegen.
