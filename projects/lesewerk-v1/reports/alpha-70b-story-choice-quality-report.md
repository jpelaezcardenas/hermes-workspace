# Alpha 70B - Mini-Geschichten S-Tier Auswahlkarten

Datum: 2026-05-21

Status: Gruen mit Browser-Smoke-Einschraenkung

## Kurzfazit

Die Mini-Geschichte-Stufe ist jetzt inhaltlich bewusster. Die generische zweite Auswahlkarte `Da ist Licht` wurde aus dem Premium-Journey-UI entfernt. Mama, Sofa, Tasse und Lama haben nun jeweils ein festes Kartenpaar: eine Zielkarte und eine ruhige, alltagsnahe Ablenkerkarte.

Hermes hat den Kernauftrag umgesetzt, Tests ergaenzt und Build/Test erfolgreich ausgefuehrt. Hermes ist danach im Browser-/Iterationsbudget haengen geblieben, bevor dieser Report geschrieben und der Kanban-Task abgeschlossen werden konnte. Codex hat den Abschluss kontrolliert.

## Geaenderte Dateien

- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/src/App.tsx`
- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/tests/lesewerk-content.test.mjs`

## Neue Kartenlogik

| Reise | Richtige Karte | Ablenkerkarte | Begruendung | Risiko |
| --- | --- | --- | --- | --- |
| Mama | `Mama ist da.` | `Das Sofa ist da.` | Beide Saetze sind sehr kurz und alltagsnah. Sofa ist konkret und ruhig. | Sofa kann je nach Profil noch nicht ausdruecklich vorbereitet sein, bleibt aber einfach. |
| Sofa | `Das Sofa ist da.` | `Mama ist da.` | Beide Karten stammen aus bekannten Premium-Reisen. | Mama ist sozial stark, aber semantisch klar getrennt. |
| Tasse | `Die Tasse ist da.` | `Das Sofa ist da.` | Zwei konkrete Gegenstaende, keine abstrakte Filler-Karte. | Artikelwechsel `Die/Das` ist etwas anspruchsvoller, aber kurz und sinnvoll. |
| Lama | `Das Lama ist da.` | `Mama ist da.` | Lama bleibt Zielwort, Mama ist ein bekannter ruhiger Kontrast. | `Lama` und `Mama` teilen `ma`; phonologisch nah, aber im Satz und Bildkontext klar. |

## Verifikation

- `npm test -- --run`: 207 von 207 Tests bestanden.
- `npm run build`: erfolgreich.
- Neuer Test: `Alpha 70B premium mini story choices are intentional for Mama Sofa Tasse and Lama`.
- Der Test sichert ab, dass `Da ist Licht` im Journey-Abschnitt nicht mehr vorkommt.
- Kindermodus bleibt frei von Score-, Timer-, Diagnose-, Ranking- und Drucksprache.
- Keine externen Assets, kein Fetch, kein Storage, kein Push, kein Commit.

## Browser-Smoke

Hermes konnte einen Teil-Smoke durchfuehren:

- Ersatzserver auf `http://localhost:4181` startete.
- App war erreichbar.
- Lehrkraftbereich war erreichbar.
- Tasse-Mini-Reise konnte bis zur Mini-Geschichte gefuehrt werden.
- Tasse zeigte die neuen Karten `Die Tasse ist da.` und `Das Sofa ist da.`
- `Da ist Licht` erschien im sichtbaren Bodytext nicht mehr.

Ein kompletter automatischer Smoke fuer alle vier Reisen wurde nicht als harte Freigabe gewertet, weil die Browser-Auswahl zeitweise in UI-Zustaende lief, die nicht eindeutig genug fuer einen stabilen Test waren. Codex hat zusaetzlich einen eigenen Smoke versucht; dieser scheiterte an der Teststeuerung, nicht an einem nachgewiesenen App-Fehler. Darum gilt fuer Alpha 70B: Tests und Build sind hart gruen, visueller Voll-Smoke sollte im naechsten Kontrollslice sauberer als eigenes Ziel laufen.

## Bewertung

Das ist ein sinnvoller Fortschritt. Die App wirkt weniger wie ein Platzhalter und mehr wie ein bewusst gebautes Lesespiel. Besonders wichtig: Die Mini-Geschichte ist jetzt nicht mehr nur eine generische Belohnungsstation, sondern verbindet Zielwort und Vergleichskarte.

Noch nicht S-Tier ist die visuelle Ebene der Auswahlkarten. Die kleinen Symbolzeichen funktionieren, wirken aber noch nicht wie eine eigene hochwertige Bildsprache. Das gehoert in einen getrennten Design-Slice, damit wir nicht Inhalt, Testlogik und visuelle Politur gleichzeitig riskieren.

## Naechster sinnvoller Schritt

Alpha 70C sollte die visuelle Qualitaet der Mini-Geschichte-Auswahlkarten verbessern: keine neuen Inhalte, sondern bessere lokale CSS-Symbol-/Szenenkarten fuer Mama, Sofa, Tasse und Lama. Ziel: weniger Emoji-/Platzhalter-Gefuehl, mehr eigenstaendiges Premium-Spielgefuehl bei gleicher Ruhe und gleicher didaktischer Klarheit.
