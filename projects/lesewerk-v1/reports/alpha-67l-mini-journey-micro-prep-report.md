# Alpha 67L - Vorbereitungs-Micro-Uebungen vor Mini-Reisen

Status: abgeschlossen am 2026-05-21

## Ergebnis

Die Mini-Reisen haben jetzt kleine Vorbereitungsuebungen, die aus der Lehrkraft-Bereitschaft heraus gestartet werden koennen.

Umgesetzt:

- `Sofa-Vorbereitung`: s -> o -> f -> so -> fa
- `Tasse-Vorbereitung`: tas -> se -> Die Tasse ist da.

Die Uebungen sind bewusst klein: ein aktueller Schritt, grosse Fokuskarte, kurze Sprache, keine Bewertung.

## Umsetzung

- Neue Helper:
  - `getMiniJourneyPrepActions(...)`
  - `getMiniJourneyPrepSequence(...)`
- Prep-Angebote haengen an der bestehenden `Mini-Reisen Bereitschaft`.
- Sofa und Tasse koennen bei noch fehlenden Einheiten als Vorbereitung gestartet werden.
- Mama zeigt nur ein ruhiges Angebot, keine unnoetige Vorbereitung.
- Neue Kinderszene `MiniJourneyPrepStage` mit:
  - `Nochmal`
  - `Weiter` / `Fertig`
  - `Zur Lehrkraft`
- Reguläre Mama/Sofa/Tasse-Mini-Reisen bleiben getrennt.

## Verifikation

- `npm test -- --run`: 193/193 Tests gruen.
- `npm run build`: erfolgreich.
- Browser-Smoke Desktop: erfolgreich.
- Browser-Smoke Mobile: erfolgreich.
- Kein horizontaler Overflow bei Lehrkraftansicht, Sofa-Prep, Tasse-Prep oder Abschlusskarten.
- Keine Lehrkraft-/Gating-Texte im Kindmodus der Prep-Szenen.

## Browser-Smoke

Gepruefter Ablauf:

1. App oeffnen.
2. Lehrkraftbereich oeffnen.
3. Prep-Angebote in der Bereitschaftsuebersicht sichtbar.
4. `Sofa-Vorbereitung starten`.
5. Schritte `s`, `o`, `f`, `so`, `fa` laufen bis Abschluss.
6. Rueckkehr zur Lehrkraft.
7. `Sofa-Pfad` waehlen.
8. `Tasse-Vorbereitung starten`.
9. Schritte `tas`, `se`, `Die Tasse ist da.` laufen bis Abschluss.
10. Mobile-Layout pruefen.

Screenshots:

- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/reports/smoke/alpha67l-desktop-teacher-prep-actions.png`
- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/reports/smoke/alpha67l-desktop-sofa-prep-start.png`
- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/reports/smoke/alpha67l-desktop-sofa-prep-finish.png`
- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/reports/smoke/alpha67l-desktop-tasse-prep-start.png`
- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/reports/smoke/alpha67l-desktop-tasse-prep-finish.png`
- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/reports/smoke/alpha67l-mobile-teacher-prep-actions.png`
- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/reports/smoke/alpha67l-mobile-sofa-prep-start.png`
- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/reports/smoke/alpha67l-mobile-sofa-prep-finish.png`
- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/reports/smoke/alpha67l-mobile-tasse-prep-start.png`
- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/reports/smoke/alpha67l-mobile-tasse-prep-finish.png`

## Bewertung

Das ist ein starker didaktischer Schritt. Die App kann jetzt nicht nur sagen, dass etwas noch nicht bereit ist, sondern bietet direkt eine kleine Bruecke an. Gerade fuer GE-Schuelerinnen und -Schueler ist das wertvoll: weniger Sprung, mehr gefuehrte Sicherheit.

Naechster sinnvoller Schritt: die Prep-Uebungen visuell noch spielerischer machen, zum Beispiel mit einer kleinen Fortschrittsleiste und einem ruhigen Symbolanker pro Vorbereitung, ohne Punkte oder Druck.
