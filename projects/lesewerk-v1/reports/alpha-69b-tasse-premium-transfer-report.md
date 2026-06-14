# Alpha 69B - Tasse Premium Mini-Reise

Datum: 2026-05-21

## Ergebnis

Status: grün.

Tasse ist jetzt als dritte Wortfamilie auf dem Premium-Fünf-Schritt-Weg abgesichert:

1. Bild
2. Silben
3. Wort
4. Satz
5. Mini-Geschichte

Hermes hat in diesem Slice keine unnötige neue Geschichte eingebaut. Die Tasse-Reise bleibt didaktisch bewusst einfach:

- Silben: `Tas - se`
- Satz: `Lies: Die Tasse ist da.`
- Mini-Geschichte: `Die Tasse ist da. Was passt?`
- Verstehenskarte: `Die Tasse ist da`

## Änderung

Es wurde eine fokussierte Alpha-69B-Testabsicherung ergänzt:

- Tasse ist im Komponententyp der Mini-Reise enthalten.
- `Tas` und `se` werden als Tasse-Silben abgesichert.
- Die Tasse-Reise nutzt den gleichen Premium-Pfad wie Mama und Sofa.
- Satzszene, Wortkacheln, Ankerwort und Verstehensszene bleiben aktiv.
- Die mobile CSS-Basis bleibt abgedeckt.

## Verifikation

- `npm test -- --run`: 205/205 bestanden
- `npm run build`: erfolgreich
- Desktop-Smoke Tasse: bestanden
- Mobile-Smoke Tasse 390px: bestanden
- kein horizontaler Überlauf
- keine Druck-/Score-/Diagnose-Wörter

## Screenshot-Belege

Desktop:

- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/reports/smoke/alpha69b-tasse-desktop-01-bild.png`
- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/reports/smoke/alpha69b-tasse-desktop-02-silben.png`
- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/reports/smoke/alpha69b-tasse-desktop-03-wort.png`
- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/reports/smoke/alpha69b-tasse-desktop-04-satz.png`
- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/reports/smoke/alpha69b-tasse-desktop-05-verstehen.png`

Mobile:

- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/reports/smoke/alpha69b-tasse-mobile-01-bild.png`
- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/reports/smoke/alpha69b-tasse-mobile-02-silben.png`
- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/reports/smoke/alpha69b-tasse-mobile-03-wort.png`
- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/reports/smoke/alpha69b-tasse-mobile-04-satz.png`
- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/reports/smoke/alpha69b-tasse-mobile-05-verstehen.png`

JSON-Ergebnis:

- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/reports/smoke/alpha69b-tasse-smoke-results.json`

## Qualitätsbewertung

Tasse ist schwerer als Mama und Sofa, weil `Tas` länger ist und der Satz mit `Die` startet. Der aktuelle Stand bleibt aber ruhig, nachvollziehbar und kindseitig geführt. Besonders wichtig: Die App zeigt auf Satzebene weiterhin die Silben `Tas` und `se`, sodass der Übergang von Silbe zu Wort und Satz sichtbar bleibt.

## Nächster sinnvoller Slice

Alpha 69C: Lama als letzte kontrollierte Wortfamilie prüfen. Dabei besonders auf `La-ma`, gating über L+A+M und die Abgrenzung zu Sofa/Tasse achten. Erst danach sollte ein zusammenfassender Qualitätsdurchlauf über Mama, Sofa, Tasse und Lama erfolgen.
