# Alpha 46A – Hilfekarte Kürzung und Mobile-Audit

## Kurzbefund
Die Support-Karte ist bereits manuell, optional und funktional klar, aber der Textblock im `details`-Bereich wirkt noch länger als nötig. Auf kleinen Displays ist nicht die Bedienung das Problem, sondern die etwas textlastige Einleitung direkt über den Schaltern.

## Was im Code auffällt
- In `src/App.tsx` steht aktuell: `Hilfen sind freiwillig. Nimm Hilfe, wenn du magst.`
- Die Aussage ist inhaltlich richtig, aber doppelt formuliert und damit für den kleinen Support-Block etwas länger als nötig.
- Die Karte bleibt dadurch verständlich, aber nicht maximal kompakt.
- In `src/styles.css` gibt es bereits eine eigene Support-Hierarchie mit separatem Statusblock und eigener Support-Karte.
- `.support-status-row`, `.support-choice-card` und `.support-details summary` sind schon als klare Blöcke angelegt, also ohne neue Logik gut mobile-tauglich weiter reduzierbar.

## Einschätzung zur Copy
Ja, die Hilfekarten-Formulierung kann kürzer werden, ohne die Freiwilligkeit zu verlieren.

Mögliche Kürzung im gleichen Sinn:
- `Hilfen sind freiwillig.`
- oder noch kompakter: `Hilfe ist freiwillig.`

Beides hält die Freiwilligkeit klar, spart aber Text und erleichtert das schnelle Scannen auf Mobilgeräten.

## Einschätzung zur mobilen Hierarchie
Die vorhandene CSS-Struktur ist schon brauchbar für Mobile, weil Status und Auswahl getrennt sind. Der größte Gewinn liegt daher eher in einer leichteren Textlast als in einer neuen Struktur.

Sinnvoll innerhalb der bestehenden CSS-Logik wären nur kleine Verdichtungen wie:
- etwas weniger vertikaler Abstand im Support-Block auf kleinen Screens
- eine etwas knappere Einleitung vor dem `SupportPanel`

Ohne Verhalten zu ändern, bleibt die Trennung schon ausreichend klar.

## Sicherheit / Nebenbedingungen geprüft
- Keine neuen Inhalte oder Unterstützungen vorgeschlagen.
- Keine Icons, Assets, Login, Cloud, Upload, Export, Timer, Score oder Ranking.
- Unterstützung bleibt manuell und optional.
- Keine personenbezogenen Lernendendaten verwendet.

## Verifikation
- `npm test` → bestanden, 146/146
- `npm run build` → bestanden
- Kein Preview-Server gestartet

## Genau eine Alpha 46B-Empfehlung
Alpha 46B sollte die Einleitung im Support-Block auf `Hilfe ist freiwillig.` kürzen.
