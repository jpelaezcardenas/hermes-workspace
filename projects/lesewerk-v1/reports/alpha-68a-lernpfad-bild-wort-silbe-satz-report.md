# Alpha 68A - Lernpfad Bild / Silben / Wort / Satz

Datum: 2026-05-21

## Ziel

Die Mini-Reise im Kindmodus sollte noch klarer zeigen, wie ein Kind vom Bildanker ueber Silben und Wort zum einfachen Satz kommt. Der Slice sollte klein bleiben: keine breite Umstrukturierung, keine neuen Inhalte im grossen Stil, keine neuen Abhaengigkeiten.

## Umgesetzt

- Der sichtbare Lernpfad in der Mini-Reise wurde auf vier kindverstaendliche Ebenen verdichtet:
  - Bild
  - Silben
  - Wort
  - Satz
- Die aktuelle Ebene wird jetzt zusaetzlich als ruhige Badge angezeigt, z. B. `Jetzt: Bild`.
- `Silbe` wird im Kindpfad als `Silben` angezeigt.
- `Mini-Geschichte` wird fuer die Kindorientierung in die Ebene `Satz` einsortiert, damit der Pfad nicht zu lang und unruhig wird.
- Der Pfad nutzt vier statt fuenf Steine, passend zur neuen klaren Progression.
- Lama bleibt als eigene Silbenanzeige `La` / `ma` erhalten.
- Es wurden Tests ergaenzt bzw. angepasst, damit Mama, Sofa, Tasse und Lama weiter spielbar bleiben und Lama weiterhin ueber bekannte Einheiten gesteuert bleibt.

## Geaenderte Dateien

- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/src/App.tsx`
- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/src/styles.css`
- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/tests/lesewerk-content.test.mjs`

## Verifikation

- `npm test -- --run`: erfolgreich, 200/200 Tests bestanden.
- `npm run build`: erfolgreich.
- Desktop-Smoke unter `http://127.0.0.1:5212/`:
  - Lehrkraft -> `Mama-Mini-Reise starten` -> `Mini-Reise starten`
  - Lernpfad sichtbar
  - Badge sichtbar: `Jetzt: Bild`
  - Pfadlabels sichtbar: `Bild`, `Silben`, `Wort`, `Satz`
  - keine Timer-/Punkte-/Ranking-/Noten-/Diagnose-Woerter im Kindmodus gefunden
  - kein horizontaler Overflow
- Mobile-Smoke bei 390 x 844:
  - gleicher Pfad erfolgreich
  - kein horizontaler Overflow

## Screenshots

- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/reports/smoke/alpha68a-lernpfad-desktop.png`
- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/reports/smoke/alpha68a-lernpfad-mobile.png`

## Bewertung

Gruen fuer diesen Slice. Hermes hat die fachliche Umsetzung sauber begonnen und Tests/Build geschafft, ist aber erneut am Iterationslimit vor Bericht/Kanban-Abschluss haengen geblieben. Codex hat den finalen Desktop-/Mobile-Smoke, diesen Bericht und den Board-Abschluss uebernommen.

Naechster sinnvoller Schritt: Den Lernpfad nicht sofort weiter verkomplizieren, sondern jetzt eine einzelne hochwertige Uebungsreihe pro Ebene bauen: ein Bildanker, eine Silbenhandlung, eine Wortentscheidung und ein sehr einfacher Satz mit Bildbezug.
