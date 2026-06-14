# Alpha 70A - Premium Lesereisen Qualitätsmatrix

Datum: 2026-05-21

Status: Gruen

## Kurzfazit

Die vier Premium-Lesereisen Mama, Sofa, Tasse und Lama sind technisch stabil und didaktisch deutlich konsistenter als vorher. Der Ablauf ist jetzt bei allen Reisen gleich lesbar: Bild, Silben, Wort, Satz, Mini-Geschichte. Das ist fuer Kinder im GE-Bereich wichtig, weil die Orientierung nicht jedes Mal neu gelernt werden muss.

Hermes hat den Audit vorbereitet, ist aber im Browser-/Iterationsbudget haengen geblieben. Codex hat den Abschluss danach uebernommen, Tests gebaut, den Server frisch gestartet und alle vier Reisen visuell per Desktop- und Mobile-Smoke geprueft.

## Verifikation

- `npm test -- --run`: 206 von 206 Tests bestanden.
- `npm run build`: erfolgreich abgeschlossen.
- Voller Smoke-Test auf Desktop und Mobile: Mama, Sofa, Tasse, Lama jeweils erfolgreich.
- Keine Layout-Overflows in der Smoke-Pruefung.
- Keine kritischen Kindertexte wie Punkte, Timer oder Diagnostik im Kindermodus gefunden.
- Alle Reisen landen korrekt bei `Jetzt: Mini-Geschichte`.

Smoke-Ergebnisse:

`/Users/zondrius/hermes-workspace/projects/lesewerk-v1/reports/smoke/alpha70a-premium-journeys-smoke-results.json`

## Qualitätsmatrix

| Reise | Didaktik | Design | Gating | Mobile | Content-Risiko | Bewertung |
| --- | --- | --- | --- | --- | --- | --- |
| Mama | 5/5 | 4/5 | sicher | gruen | niedrig | Referenzreise; klar, ruhig, gut fuehrend. |
| Sofa | 5/5 | 4/5 | sicher ueber M/A/S/O/F | gruen | niedrig | Sehr sauber, weil der Satz einfach bleibt: `Das Sofa ist da.` |
| Tasse | 4/5 | 4/5 | sicher ueber `Satz bereit` und `Tas-se` | gruen | mittel-niedrig | Gut nutzbar, aber wegen Artikel und zweisilbigem Wort etwas anspruchsvoller. |
| Lama | 5/5 | 4/5 | sicher ueber `L` und `la` | gruen | niedrig | Didaktisch stark, Tiermotiv ist attraktiv und gut erweiterbar. |

## Was schon stark ist

- Der 5-Schritt-Pfad ist jetzt bei allen Premium-Reisen stabil.
- Die Kinder bekommen erst Orientierung, dann einen klaren naechsten Schritt.
- Die Satzebene bleibt sprachlich einfach und nicht ueberladen.
- Die Mini-Geschichte wirkt als kleine Belohnung, ohne Punkte- oder Timerdruck.
- Desktop und Mobile bleiben ruhig und ohne sichtbares Layout-Chaos.

## Was noch nicht S-Tier ist

1. Die Bild-/Symbolqualitaet ist noch nicht auf dem Niveau einer wirklich verkaufbaren Premium-App. Es funktioniert, aber es fuehlt sich noch nicht durchgehend magisch, eigenstaendig und visuell reich an.
2. Die Mini-Geschichten sind noch zu generisch. Der zweite Auswahltext `Da ist Licht` ist sicher, aber nicht immer inhaltlich elegant. Hier braucht es bessere, sinnvolle, aber einfache Ablenker pro Wortfamilie.
3. Die Lehrkraft-Steuerung funktioniert technisch, ist aber noch nicht schoen genug erklaert. Besonders der Weg zu Lama ueber `L` und `la` ist funktional, aber fuer Erwachsene noch nicht sofort transparent.
4. Es fehlt noch eine kleine systematische Inhaltsmatrix: Welche Buchstaben, Silben, Woerter und Saetze sind bereits vorhanden, welche Entwicklungsstufe bedienen sie, und was fehlt als naechstes?

## Naechste drei sinnvolle Slices

1. Alpha 70B - Mini-Geschichten und Ablenker verbessern: pro Reise bessere, bedeutungsvolle Auswahlkarten mit einfacher Sprache und GE-tauglicher Klarheit.
2. Alpha 70C - Visuelle Symbol- und Szenenqualitaet erhoehen: Mama, Sofa, Tasse und Lama sollen mehr Premium-Spielgefuehl bekommen, ohne die Oberflaeche unruhig zu machen.
3. Alpha 70D - Lehrkraft-Auswahl verstaendlicher machen: sichtbare Entwicklungsstufen, freigeschaltete Buchstaben und klare Begruendung, warum eine Reise erscheint.

## Empfehlung

Der beste naechste Schritt ist Alpha 70B. Nicht sofort mehr neue Woerter, sondern zuerst die bestehende Mini-Geschichte qualitativ staerker machen. Das verbessert direkt den Lernwert, ohne die App unuebersichtlicher zu machen.
